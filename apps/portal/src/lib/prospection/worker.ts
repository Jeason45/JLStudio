import { prisma } from '@/lib/prisma'
import { scrapePagesJaunes } from './scraper'
import {
  analyzeTech,
  checkSeoFiles,
  analyzePageSpeed,
  analyzeObservatory,
  enrichWithSirene,
  extractEmails,
  detectSocial,
  findBestEmail,
} from './analyzers'
import { scoreProspect } from './scorer'
import type { SiteAnalysis, SireneData } from './types'

export async function runProspectionCampaign(campaignId: string) {
  try {
    // 1. Update campaign status to RUNNING
    await prisma.prospectionCampaign.update({
      where: { id: campaignId },
      data: { status: 'RUNNING', startedAt: new Date(), progress: 0 },
    })

    // 2. Load campaign details
    const campaign = await prisma.prospectionCampaign.findUniqueOrThrow({
      where: { id: campaignId },
    })

    // 3. Scrape Pages Jaunes
    const prospects = await scrapePagesJaunes(
      campaign.metier,
      campaign.ville,
      campaign.limit,
      async (pct) => {
        // Scraping is ~30% of total work
        const progress = Math.round(pct * 0.3)
        await prisma.prospectionCampaign.update({
          where: { id: campaignId },
          data: { progress },
        }).catch(() => {})
      },
    )

    if (prospects.length === 0) {
      await prisma.prospectionCampaign.update({
        where: { id: campaignId },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
          progress: 100,
          totalFound: 0,
          withSite: 0,
          withoutSite: 0,
        },
      })
      return
    }

    const pageSpeedApiKey = process.env.PAGESPEED_API_KEY

    // 4. Process each prospect
    let withSite = 0
    let withoutSite = 0

    for (let i = 0; i < prospects.length; i++) {
      const prospect = prospects[i]

      try {
        // a. SIRENE enrichment
        let sirene: SireneData | null = null
        if (prospect.city) {
          sirene = await enrichWithSirene(prospect.name, prospect.city)
        }

        // b. Site analysis (only if URL exists)
        let analysis: SiteAnalysis | null = null

        if (prospect.url) {
          withSite++

          const [tech, seo, pageSpeed, observatory] = await Promise.all([
            analyzeTech(prospect.url),
            checkSeoFiles(prospect.url),
            analyzePageSpeed(prospect.url, pageSpeedApiKey),
            analyzeObservatory(prospect.url),
          ])

          // Email + social reuse the fetched HTML
          const emailResult = await extractEmails(prospect.url, tech.html)
          const socialResult = detectSocial(tech.html)

          analysis = {
            url: tech.finalUrl,
            mobileScore: pageSpeed.mobileScore,
            desktopScore: pageSpeed.desktopScore,
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
            socialPresenceCount: socialResult.count,
            socialLinks: socialResult.links,
            emails: emailResult.emails,
            primaryEmail: emailResult.primaryEmail,
            observatoryGrade: observatory.grade,
            error: null,
          }
        } else {
          withoutSite++
        }

        // c. Email verification & pattern matching
        let bestEmail: string | null = null
        try {
          let domain: string | null = null
          if (prospect.url) { try { domain = new URL(prospect.url).hostname.replace('www.', '') } catch {} }
          const extractedEmails = analysis?.emails || []
          const emailResult = await findBestEmail(domain, null, extractedEmails)
          if (emailResult.email) bestEmail = emailResult.email
        } catch { /* best effort */ }

        // d. Score
        const scored = scoreProspect(prospect, analysis, sirene)

        // e. Save as ProspectionResult
        await prisma.prospectionResult.create({
          data: {
            campaignId,
            name: prospect.name,
            url: prospect.url,
            phone: prospect.phone,
            address: prospect.address,
            city: prospect.city,
            email: bestEmail || scored.primaryEmail,
            category: scored.category,
            priorityScore: scored.priorityScore,
            status: scored.status,
            breakdown: scored.breakdown,
            analysisData: analysis ? (analysis as Record<string, unknown>) : undefined,
            sireneData: sirene ? (sirene as Record<string, unknown>) : undefined,
          },
        })
      } catch (err) {
        // Individual prospect error — log but continue
        console.error(`Prospection: error processing "${prospect.name}":`, err)

        // Save with minimal data
        await prisma.prospectionResult.create({
          data: {
            campaignId,
            name: prospect.name,
            url: prospect.url,
            phone: prospect.phone,
            address: prospect.address,
            city: prospect.city,
            category: prospect.url ? 'refonte' : 'creation',
            priorityScore: 0,
            status: 'Froid',
            breakdown: [],
          },
        }).catch(() => {})
      }

      // e. Update campaign progress (scraping=30%, analysis=70%)
      const analysisProgress = Math.round(((i + 1) / prospects.length) * 70)
      await prisma.prospectionCampaign.update({
        where: { id: campaignId },
        data: { progress: 30 + analysisProgress },
      }).catch(() => {})
    }

    // 5. Mark campaign as COMPLETED
    await prisma.prospectionCampaign.update({
      where: { id: campaignId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        progress: 100,
        totalFound: prospects.length,
        withSite,
        withoutSite,
      },
    })
  } catch (err) {
    // Fatal error — mark campaign as FAILED
    const errorMessage = err instanceof Error ? err.message : String(err)
    console.error(`Prospection campaign ${campaignId} failed:`, errorMessage)

    await prisma.prospectionCampaign.update({
      where: { id: campaignId },
      data: {
        status: 'FAILED',
        error: errorMessage,
        completedAt: new Date(),
      },
    }).catch(() => {})
  }
}
