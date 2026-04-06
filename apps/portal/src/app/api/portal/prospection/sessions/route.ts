import { NextRequest, NextResponse } from 'next/server'
import { extractSiteId } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { searchBusinesses } from '@/lib/prospection/smartSearch'
import { searchBusinessesWeb } from '@/lib/prospection/webSearch'
import { getProspectCategory } from '@/lib/prospection/categorize'
import {
  analyzeTech,
  checkSeoFiles,
  analyzeObservatory,
  extractEmails,
  detectSocial,
  enrichWithSirene,
  validateHtml,
  analyzeYellowLab,
  findBestEmail,
} from '@/lib/prospection/analyzers'
import {
  checkSSL,
  checkSecurityHeaders,
  checkCarbon,
  analyzePageSpeedFull,
} from '@/lib/prospection/auditExtras'
import { analyzeDesign } from '@/lib/prospection/designAnalyzer'

export const maxDuration = 120

// GET — List sessions for site
export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers)
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 })

  const sessions = await prisma.prospectionSession.findMany({
    where: { siteId },
    orderBy: { createdAt: 'desc' },
    take: 20,
    include: { _count: { select: { prospects: true } } },
  })

  return NextResponse.json(sessions)
}

// POST — Create session + run search or audit
export async function POST(req: NextRequest) {
  const siteId = extractSiteId(req.headers)
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 })

  const body = await req.json()
  const { type } = body

  if (type === 'search') {
    return handleSearch(siteId, body)
  } else if (type === 'audit') {
    return handleAudit(siteId, body)
  }

  return NextResponse.json({ error: 'Type invalide (search ou audit)' }, { status: 400 })
}

async function handleSearch(siteId: string, body: { metier?: string; ville?: string; limit?: number; excludeSirens?: string[]; page?: number; sessionId?: string }) {
  const { metier, ville, limit, excludeSirens, page, sessionId } = body
  if (!metier || !ville) {
    return NextResponse.json({ error: 'metier et ville requis' }, { status: 400 })
  }

  try {
    // Run SIRENE search + Web search (Serper/SearXNG) in parallel
    const [sireneResults, webResults] = await Promise.all([
      searchBusinesses(metier, ville, Math.min(limit ?? 50, 50), excludeSirens || [], page || 1),
      searchBusinessesWeb(metier, ville),
    ])

    // Merge: start with SIRENE results
    const prospectData = sireneResults.map((r) => {
      // Try to find matching website from web search (places or organic)
      let website = r.website || null

      if (!website) {
        // Check Google Maps places results
        const nameNorm = r.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        const matchingPlace = webResults.places.find(p => {
          const placeNorm = p.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          return placeNorm.includes(nameNorm) || nameNorm.includes(placeNorm)
        })
        if (matchingPlace?.website) {
          website = matchingPlace.website
        }
      }

      return {
        name: r.name,
        siret: r.siret || null,
        address: r.address || null,
        city: r.city || null,
        postalCode: r.postalCode || null,
        dateCreation: r.dateCreation || null,
        nafLabel: r.nafLabel || null,
        website,
        phone: null as string | null,
        category: getProspectCategory(website),
      }
    })

    // Add Google Maps places that aren't already in SIRENE results
    for (const place of webResults.places) {
      const nameNorm = place.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      const alreadyExists = prospectData.some(p => {
        const pNorm = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        return pNorm.includes(nameNorm) || nameNorm.includes(pNorm)
      })
      if (!alreadyExists && place.title) {
        prospectData.push({
          name: place.title,
          siret: null,
          address: place.address || null,
          city: ville.toUpperCase(),
          postalCode: null,
          dateCreation: null,
          nafLabel: null,
          website: place.website || null,
          phone: place.phone || null,
          category: getProspectCategory(place.website),
        })
      }
    }

    // If sessionId provided, add to existing session (for "Load more")
    if (sessionId) {
      const existing = await prisma.prospectionSession.findFirst({ where: { id: sessionId, siteId } })
      if (!existing) return NextResponse.json({ error: 'Session introuvable' }, { status: 404 })

      for (const p of prospectData) {
        await prisma.prospectionProspect.create({ data: { sessionId, ...p } })
      }

      const session = await prisma.prospectionSession.findUnique({
        where: { id: sessionId },
        include: { prospects: { orderBy: { createdAt: 'asc' } } },
      })
      return NextResponse.json({ ...session, newCount: prospectData.length })
    }

    // Otherwise create new session
    const session = await prisma.prospectionSession.create({
      data: {
        siteId,
        type: 'search',
        query: `${metier} ${ville}`,
        prospects: { create: prospectData },
      },
      include: { prospects: true },
    })

    return NextResponse.json(session)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: `Erreur recherche: ${msg}` }, { status: 500 })
  }
}

async function handleAudit(siteId: string, body: { url?: string; name?: string }) {
  let { url, name } = body
  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'URL requise' }, { status: 400 })
  }

  if (!url.startsWith('http')) url = `https://${url}`
  try { new URL(url) } catch {
    return NextResponse.json({ error: 'URL invalide' }, { status: 400 })
  }

  try {
    const pageSpeedApiKey = process.env.PAGESPEED_API_KEY || ''

    // Create session with one prospect
    const session = await prisma.prospectionSession.create({
      data: {
        siteId,
        type: 'audit',
        query: url,
        prospects: {
          create: {
            name: name || new URL(url).hostname,
            website: url,
            category: 'refonte',
          },
        },
      },
      include: { prospects: true },
    })

    const prospect = session.prospects[0]

    // Run full audit
    const auditData = await runFullAudit(url, pageSpeedApiKey)

    // Update prospect with audit data
    const updated = await prisma.prospectionProspect.update({
      where: { id: prospect.id },
      data: {
        auditData: auditData as any,
        auditScore: auditData.mobileScore ?? null,
        auditedAt: new Date(),
        email: auditData.primaryEmail || null,
      },
    })

    return NextResponse.json({
      ...session,
      prospects: [updated],
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: `Erreur audit: ${msg}` }, { status: 500 })
  }
}

// Shared audit runner — used here and in the individual prospect audit route
export async function runFullAudit(url: string, pageSpeedApiKey: string) {
  // Phase 1: Tech + SEO (fast)
  const [tech, seo] = await Promise.all([
    analyzeTech(url),
    checkSeoFiles(url),
  ])

  // Phase 2: All external APIs in parallel
  const [emailResult, socialResult, ssl, secHeaders, carbon, w3c, yellowLab, pageSpeed, observatory] = await Promise.all([
    extractEmails(url, tech.html).catch(() => ({ emails: [] as string[], primaryEmail: null })),
    Promise.resolve(detectSocial(tech.html)),
    checkSSL(url).catch(() => null),
    checkSecurityHeaders(url).catch(() => null),
    checkCarbon(url).catch(() => null),
    validateHtml(url).catch(() => ({ errorCount: 0, warningCount: 0, topErrors: [] as string[] })),
    analyzeYellowLab(url).catch(() => ({ globalScore: null, topIssues: [] as string[] })),
    pageSpeedApiKey ? analyzePageSpeedFull(url, pageSpeedApiKey).catch(() => null) : Promise.resolve(null),
    analyzeObservatory(url).catch(() => ({ grade: null })),
  ])

  // Best email
  let domain: string | null = null
  try { domain = new URL(url).hostname.replace('www.', '') } catch {}
  const bestEmail = await findBestEmail(domain, null, emailResult.emails).catch(() => ({ email: '', confidence: 'unknown' as const, method: 'none' }))

  return {
    url: tech.finalUrl || url,
    analyzedAt: new Date().toISOString(),
    mobileScore: pageSpeed?.mobileScore ?? null,
    mobileAccessibility: pageSpeed?.mobileAccessibility ?? null,
    mobileSEO: pageSpeed?.mobileSEO ?? null,
    mobileBestPractices: pageSpeed?.mobileBestPractices ?? null,
    desktopScore: pageSpeed?.desktopScore ?? null,
    mobileFCP: pageSpeed?.mobileFCP ?? null,
    mobileLCP: pageSpeed?.mobileLCP ?? null,
    mobileTBT: pageSpeed?.mobileTBT ?? null,
    mobileCLS: pageSpeed?.mobileCLS ?? null,
    mobileSI: pageSpeed?.mobileSI ?? null,
    mobilePerformanceAudits: pageSpeed?.mobilePerformanceAudits ?? [],
    mobileAccessibilityAudits: pageSpeed?.mobileAccessibilityAudits ?? [],
    mobileSEOAudits: pageSpeed?.mobileSEOAudits ?? [],
    mobileBestPracticesAudits: pageSpeed?.mobileBestPracticesAudits ?? [],
    totalByteWeight: pageSpeed?.totalByteWeight ?? null,
    totalRequestCount: pageSpeed?.totalRequestCount ?? null,
    heaviestResources: pageSpeed?.heaviestResources ?? [],
    mobileScreenshot: pageSpeed?.mobileScreenshot ?? null,
    isHttps: tech.isHttps,
    isResponsive: tech.isResponsive,
    cmsDetected: tech.cmsDetected,
    estimatedAge: tech.estimatedAge,
    loadTimeMs: tech.loadTimeMs,
    hasAnalytics: tech.hasAnalytics,
    hasFavicon: tech.hasFavicon,
    hasMetaDescription: tech.hasMetaDescription,
    hasOpenGraph: tech.hasOpenGraph,
    hasSitemap: seo.hasSitemap,
    hasRobotsTxt: seo.hasRobotsTxt,
    usesJquery: tech.usesJquery,
    usesFlash: tech.usesFlash,
    hasObsoleteTags: tech.hasObsoleteTags,
    usesModernImages: tech.usesModernImages,
    internalLinkCount: tech.internalLinkCount,
    ssl,
    securityHeaders: secHeaders,
    observatoryGrade: observatory?.grade ?? null,
    carbon,
    w3cErrors: w3c.errorCount,
    w3cWarnings: w3c.warningCount,
    w3cTopErrors: w3c.topErrors,
    yellowLabScore: yellowLab.globalScore,
    yellowLabTopIssues: yellowLab.topIssues,
    socialPresence: socialResult,
    primaryEmail: bestEmail.email || emailResult.primaryEmail,
    emailConfidence: bestEmail.confidence,
    emails: emailResult.emails,
    // Design & UX analysis
    design: analyzeDesign(tech.html),
  }
}
