import { NextRequest, NextResponse } from 'next/server'
import { extractSiteId } from '@/lib/auth'
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

export async function POST(req: NextRequest) {
  const siteId = extractSiteId(req.headers)
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 })

  const body = await req.json()
  const { url, companyName } = body

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'URL requise' }, { status: 400 })
  }

  try { new URL(url) } catch {
    return NextResponse.json({ error: 'URL invalide' }, { status: 400 })
  }

  try {
    const pageSpeedApiKey = process.env.PAGESPEED_API_KEY || ''

    // Phase 1: Tech + SEO (fast)
    const [tech, seo] = await Promise.all([
      analyzeTech(url),
      checkSeoFiles(url),
    ])

    // Phase 2: All external APIs in parallel
    const [emailResult, socialResult, sirene, ssl, secHeaders, carbon, w3c, yellowLab, pageSpeed, observatory] = await Promise.all([
      extractEmails(url, tech.html).catch(() => ({ emails: [] as string[], primaryEmail: null, hasMx: false })),
      Promise.resolve(detectSocial(tech.html)),
      companyName ? enrichWithSirene(companyName, '').catch(() => null) : Promise.resolve(null),
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

    const audit = {
      url: tech.finalUrl || url,
      analyzedAt: new Date().toISOString(),

      // PageSpeed
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

      // Tech
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

      // Security
      ssl,
      securityHeaders: secHeaders,
      observatoryGrade: observatory?.grade ?? null,

      // Carbon
      carbon,

      // W3C
      w3cErrors: w3c.errorCount,
      w3cWarnings: w3c.warningCount,
      w3cTopErrors: w3c.topErrors,

      // Yellow Lab
      yellowLabScore: yellowLab.globalScore,
      yellowLabTopIssues: yellowLab.topIssues,

      // Social
      socialPresence: socialResult,

      // Email
      primaryEmail: bestEmail.email || emailResult.primaryEmail,
      emailConfidence: bestEmail.confidence,
      emails: emailResult.emails,

      // SIRENE
      sirene,
    }

    return NextResponse.json(audit)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: `Erreur d'analyse: ${msg}` }, { status: 500 })
  }
}
