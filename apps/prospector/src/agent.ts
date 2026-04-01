#!/usr/bin/env node
import 'dotenv/config'
import { createRequire } from 'module'
import { scrapePagesJaunes } from './scraper/pagesjaunes.js'
import { analyzePageSpeed } from './analyzer/pagespeed.js'
import { analyzeTech, checkSeoFiles } from './analyzer/techDetector.js'
import { analyzeObservatory } from './analyzer/observatory.js'
import { enrichWithSirene, type SireneData } from './analyzer/sirene.js'
import { extractEmails } from './analyzer/emailExtractor.js'
import { detectSocialPresence } from './analyzer/socialDetector.js'
import { findBestEmail } from './analyzer/emailVerifier.js'
import { validateHtml } from './analyzer/w3cValidator.js'
import { analyzeYellowLab } from './analyzer/yellowLab.js'
import { checkSSL, checkSecurityHeaders } from './analyzer/sslChecker.js'
import { checkCarbon } from './analyzer/carbonChecker.js'
import { scoreProspect } from './scorer/scorer.js'
import { generateAuditPdf } from './output/auditPdf.js'
import { config } from './config.js'
import { delay } from './utils/rateLimiter.js'
import { log } from './utils/logger.js'
import type { SiteAnalysis } from './analyzer/types.js'
import type { RawProspect } from './scraper/types.js'

const require_ = createRequire(import.meta.url)
const { PrismaClient } = require_('@jlstudio/database/generated/prisma')
const prisma = new PrismaClient()

const POLL_INTERVAL = 10000  // 10 seconds

async function processCampaign(campaignId: string) {
  log.info(`Campagne ${campaignId} — démarrage`)

  try {
    // Mark as running
    const campaign = await prisma.prospectionCampaign.update({
      where: { id: campaignId },
      data: { status: 'RUNNING', startedAt: new Date(), progress: 0 },
    })

    // Scrape
    log.info(`Scraping "${campaign.metier}" à ${campaign.ville} (limit ${campaign.limit})`)
    const prospects: RawProspect[] = await scrapePagesJaunes(
      campaign.metier,
      campaign.ville,
      campaign.limit,
    )

    const withSite = prospects.filter(p => p.url).length
    const withoutSite = prospects.filter(p => !p.url).length
    log.success(`${prospects.length} prospects trouvés (${withSite} avec site, ${withoutSite} sans)`)

    await prisma.prospectionCampaign.update({
      where: { id: campaignId },
      data: { progress: 20, totalFound: prospects.length, withSite, withoutSite },
    })

    if (prospects.length === 0) {
      await prisma.prospectionCampaign.update({
        where: { id: campaignId },
        data: { status: 'COMPLETED', progress: 100, completedAt: new Date() },
      })
      return
    }

    // Filter valid URLs
    const validProspects = prospects.filter(p => {
      if (!p.url) return true
      try { new URL(p.url); return true } catch { return false }
    })

    // Analyze each prospect
    for (let i = 0; i < validProspects.length; i++) {
      // Check if campaign was cancelled (PAUSE/STOP)
      const current = await prisma.prospectionCampaign.findUnique({ where: { id: campaignId } })
      if (!current || current.status !== 'RUNNING') {
        log.warn('Campagne arrêtée')
        return
      }

      const p = validProspects[i]
      log.dim(`[${i + 1}/${validProspects.length}] ${p.name}`)

      let sirene: SireneData | null = null
      try {
        sirene = await enrichWithSirene(p.name, p.city || campaign.ville)
      } catch { /* best effort */ }
      await delay(200)

      let analysis: SiteAnalysis | null = null
      if (p.url) {
        analysis = {
          url: p.url,
          mobileScore: null, mobileAccessibility: null, mobileSEO: null, mobileBestPractices: null,
          desktopScore: null, desktopAccessibility: null, desktopSEO: null, desktopBestPractices: null,
          mobileFCP: null, mobileLCP: null, mobileTBT: null, mobileCLS: null, mobileSI: null,
          mobilePerformanceAudits: [], mobileAccessibilityAudits: [],
          mobileSEOAudits: [], mobileBestPracticesAudits: [],
          desktopPerformanceAudits: [],
          totalByteWeight: null, totalRequestCount: null, heaviestResources: [],
          mobileScreenshot: null,
          mobilePassedAudits: 0, mobileTotalAudits: 0, pageSpeedSecurityIssues: [],
          isHttps: false, isResponsive: false, cmsDetected: null, estimatedAge: null,
          loadTimeMs: null, pageSizeKB: null,
          hasAnalytics: false, hasFavicon: false, hasMetaDescription: false, hasOpenGraph: false,
          hasSitemap: false, hasRobotsTxt: false,
          usesJquery: false, usesFlash: false, hasObsoleteTags: false, usesModernImages: false,
          internalLinkCount: 0, redirectCount: 0,
          observatoryGrade: null, observatoryScore: null,
          emailData: null, socialPresence: null,
          w3cErrors: null, w3cWarnings: null, w3cTopErrors: [],
          yellowLabScore: null, yellowLabCategories: [], yellowLabTopIssues: [],
          sslResult: null, securityHeaders: null, carbonResult: null,
          error: null,
        }

        try {
          const tech = await analyzeTech(p.url)
          Object.assign(analysis, tech)

          const seo = await checkSeoFiles(p.url)
          analysis.hasSitemap = seo.hasSitemap
          analysis.hasRobotsTxt = seo.hasRobotsTxt

          try { analysis.emailData = await extractEmails(p.url) } catch {}
          try { analysis.socialPresence = await detectSocialPresence(p.url) } catch {}

          if (config.pageSpeedApiKey) {
            try {
              const ps = await analyzePageSpeed(p.url)
              Object.assign(analysis, ps)
            } catch {}
          }

          try { analysis.sslResult = await checkSSL(p.url) } catch {}
          try { analysis.securityHeaders = await checkSecurityHeaders(p.url) } catch {}
          try { analysis.carbonResult = await checkCarbon(p.url) } catch {}

          try {
            const w3c = await validateHtml(p.url)
            analysis.w3cErrors = w3c.errorCount
            analysis.w3cWarnings = w3c.warningCount
            analysis.w3cTopErrors = w3c.topErrors
          } catch {}

          try {
            const ylt = await analyzeYellowLab(p.url)
            analysis.yellowLabScore = ylt.globalScore
            analysis.yellowLabCategories = ylt.categories
            analysis.yellowLabTopIssues = ylt.topIssues
          } catch {}

          try {
            const obs = await analyzeObservatory(p.url)
            analysis.observatoryGrade = obs.grade
            analysis.observatoryScore = obs.score
          } catch {}
        } catch (err) {
          analysis.error = err instanceof Error ? err.message : String(err)
        }
      }

      // Email
      let bestEmail: string | null = null
      try {
        let domain: string | null = null
        if (p.url) { try { domain = new URL(p.url).hostname.replace('www.', '') } catch {} }
        const extractedEmails = analysis?.emailData?.emails || []
        const emailResult = await findBestEmail(domain, null, extractedEmails)
        if (emailResult.email) bestEmail = emailResult.email
      } catch {}

      // Score
      const result = scoreProspect(p, analysis, sirene)
      if (bestEmail) result.realEmail = bestEmail

      // Generate PDF for sites
      let pdfPath: string | null = null
      if (analysis) {
        try { pdfPath = await generateAuditPdf(result) } catch {}
      }

      // Save result
      await prisma.prospectionResult.create({
        data: {
          campaignId,
          name: p.name,
          url: p.url,
          phone: p.phone,
          address: p.address,
          city: p.city,
          email: bestEmail || (p.url ? `contact@${new URL(p.url).hostname.replace('www.', '')}` : null),
          category: result.category,
          priorityScore: result.priorityScore,
          status: result.status,
          breakdown: result.breakdown as any,
          analysisData: analysis as any,
          sireneData: sirene as any,
        },
      })

      log.prospect(result.name, result.priorityScore, result.status)

      // Update progress
      const progress = 20 + Math.round(((i + 1) / validProspects.length) * 80)
      await prisma.prospectionCampaign.update({
        where: { id: campaignId },
        data: { progress },
      }).catch(() => {})

      if (i < validProspects.length - 1) {
        await delay(p.url ? config.analysisDelayMs : 200)
      }
    }

    // Done
    await prisma.prospectionCampaign.update({
      where: { id: campaignId },
      data: { status: 'COMPLETED', progress: 100, completedAt: new Date() },
    })

    log.success(`Campagne terminée — ${validProspects.length} prospects traités`)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    log.error(`Campagne échouée: ${msg}`)
    await prisma.prospectionCampaign.update({
      where: { id: campaignId },
      data: { status: 'FAILED', error: msg, completedAt: new Date() },
    }).catch(() => {})
  }
}

// ─── Main loop ───

async function main() {
  console.log()
  log.info('Agent de prospection démarré')
  log.dim('En attente de campagnes...')
  log.dim(`Poll toutes les ${POLL_INTERVAL / 1000}s | Ctrl+C pour arrêter`)
  console.log()

  while (true) {
    try {
      // Find pending campaign
      const campaign = await prisma.prospectionCampaign.findFirst({
        where: { status: 'PENDING' },
        orderBy: { createdAt: 'asc' },
      })

      if (campaign) {
        await processCampaign(campaign.id)
        console.log()
        log.dim('En attente de campagnes...')
      }
    } catch (err) {
      log.error(`Erreur agent: ${err instanceof Error ? err.message : err}`)
    }

    await delay(POLL_INTERVAL)
  }
}

main().catch(console.error)
