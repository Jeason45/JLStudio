#!/usr/bin/env node
import 'dotenv/config'
import { Command } from 'commander'
import ora from 'ora'
import { scrapePagesJaunes } from './scraper/pagesjaunes.js'
import { analyzePageSpeed } from './analyzer/pagespeed.js'
import { analyzeTech, checkSeoFiles } from './analyzer/techDetector.js'
import { analyzeObservatory } from './analyzer/observatory.js'
import { enrichWithSirene, type SireneData } from './analyzer/sirene.js'
import { extractEmails } from './analyzer/emailExtractor.js'
import { detectSocialPresence } from './analyzer/socialDetector.js'
import { findBestEmail } from './analyzer/emailVerifier.js'
import { scoreProspect } from './scorer/scorer.js'
import { exportCSV } from './output/csv.js'
import { injectIntoCRM } from './output/crm.js'
import { delay } from './utils/rateLimiter.js'
import { log } from './utils/logger.js'
import { config } from './config.js'
import type { SiteAnalysis } from './analyzer/types.js'
import type { ScoredProspect } from './scorer/types.js'
import type { RawProspect } from './scraper/types.js'

const program = new Command()

program
  .name('prospector')
  .description('Outil de prospection web — trouve des entreprises sans site ou avec site obsolète')
  .requiredOption('--metier <metier>', 'Métier à chercher (ex: "plombier")')
  .requiredOption('--ville <ville>', 'Ville (ex: "bordeaux")')
  .option('--limit <n>', 'Nombre max de résultats', '20')
  .option('--no-crm', 'Ne pas injecter dans le CRM')
  .option('--no-csv', 'Ne pas générer de CSV')
  .option('--site-only', 'Ne garder que les prospects avec site web')
  .option('--no-site-only', 'Ne garder que les prospects sans site web')
  .option('--verbose', 'Logs détaillés')
  .action(async (opts) => {
    const metier: string = opts.metier
    const ville: string = opts.ville
    const limit = parseInt(opts.limit, 10)
    const useCRM: boolean = opts.crm !== false
    const useCSV: boolean = opts.csv !== false
    const verbose: boolean = opts.verbose || false
    const siteOnly: boolean = opts.siteOnly || false
    const noSiteOnly: boolean = opts.noSiteOnly || false

    console.log()
    log.info(`Prospection : "${metier}" à ${ville} (max ${limit} résultats)`)
    if (!config.pageSpeedApiKey) log.warn('PAGESPEED_API_KEY non configuré — scores PageSpeed désactivés')
    console.log()

    // ─── 1. Scraping ───
    const scrapeSpinner = ora('Scraping Pages Jaunes...').start()
    let prospects: RawProspect[]
    try {
      prospects = await scrapePagesJaunes(metier, ville, limit)
      const withSite = prospects.filter(p => p.url).length
      const withoutSite = prospects.filter(p => !p.url).length
      scrapeSpinner.succeed(`${prospects.length} prospects trouvés (${withSite} avec site, ${withoutSite} sans site)`)
    } catch (err) {
      scrapeSpinner.fail('Erreur scraping')
      log.error(err instanceof Error ? err.message : String(err))
      process.exit(1)
    }

    if (prospects.length === 0) {
      log.warn('Aucun prospect trouvé.')
      process.exit(0)
    }

    // Filters
    if (siteOnly) prospects = prospects.filter(p => p.url)
    if (noSiteOnly) prospects = prospects.filter(p => !p.url)
    prospects = prospects.filter(p => {
      if (!p.url) return true
      try { new URL(p.url); return true } catch { return false }
    })

    // ─── 2. Enrichment & Analysis ───
    const analyzeSpinner = ora('Analyse et enrichissement...').start()
    const scored: ScoredProspect[] = []

    for (let i = 0; i < prospects.length; i++) {
      const p = prospects[i]
      analyzeSpinner.text = `[${i + 1}/${prospects.length}] ${p.name}`

      // INSEE SIRENE enrichment (free, unlimited)
      let sirene: SireneData | null = null
      try {
        sirene = await enrichWithSirene(p.name, p.city || ville)
        if (verbose && sirene) {
          log.dim(`  SIRENE: ${sirene.siret} — ${sirene.libelleNAF || 'N/A'} — Créé ${sirene.dateCreation || 'N/A'}`)
        }
      } catch { /* best effort */ }
      await delay(200)

      // Site analysis (only for prospects with a website)
      let analysis: SiteAnalysis | null = null
      if (p.url) {
        analysis = {
          url: p.url,
          mobileScore: null, desktopScore: null, mobileFCP: null, mobileLCP: null,
          isHttps: false, isResponsive: false, cmsDetected: null, estimatedAge: null,
          loadTimeMs: null, pageSizeKB: null,
          hasAnalytics: false, hasFavicon: false, hasMetaDescription: false, hasOpenGraph: false,
          hasSitemap: false, hasRobotsTxt: false,
          usesJquery: false, usesFlash: false, hasObsoleteTags: false, usesModernImages: false,
          internalLinkCount: 0, redirectCount: 0,
          observatoryGrade: null, observatoryScore: null,
          emailData: null, socialPresence: null,
          error: null,
        }

        try {
          // Tech detection
          const tech = await analyzeTech(p.url)
          Object.assign(analysis, tech)

          // SEO files
          const seo = await checkSeoFiles(p.url)
          analysis.hasSitemap = seo.hasSitemap
          analysis.hasRobotsTxt = seo.hasRobotsTxt

          // Email extraction
          try {
            analysis.emailData = await extractEmails(p.url)
            if (verbose && analysis.emailData.primaryEmail) {
              log.dim(`  📧 Email trouvé: ${analysis.emailData.primaryEmail}`)
            }
          } catch { /* best effort */ }

          // Social media detection
          try {
            analysis.socialPresence = await detectSocialPresence(p.url)
            if (verbose && analysis.socialPresence.count > 0) {
              const networks = ['facebook', 'instagram', 'linkedin', 'twitter', 'youtube', 'tiktok'] as const
              const found = networks.filter(n => analysis!.socialPresence![n])
              log.dim(`  📱 Réseaux sociaux: ${found.join(', ')}`)
            }
          } catch { /* best effort */ }

          // PageSpeed
          if (config.pageSpeedApiKey) {
            try {
              const ps = await analyzePageSpeed(p.url)
              Object.assign(analysis, ps)
            } catch { /* best effort */ }
          }

          // Mozilla Observatory
          try {
            const obs = await analyzeObservatory(p.url)
            analysis.observatoryGrade = obs.grade
            analysis.observatoryScore = obs.score
          } catch { /* best effort */ }
        } catch (err) {
          analysis.error = err instanceof Error ? err.message : String(err)
        }
      }

      // Email verification & pattern matching
      let domain: string | null = null
      if (p.url) {
        try { domain = new URL(p.url).hostname.replace('www.', '') } catch {}
      }
      const extractedEmails = analysis?.emailData?.emails || []
      const dirigeant = sirene ? null : null // SIRENE doesn't give dirigeant name
      let emailResult: { email: string; confidence: string; method: string } | null = null
      try {
        emailResult = await findBestEmail(domain, dirigeant, extractedEmails)
        if (verbose && emailResult.email) {
          const icon = emailResult.confidence === 'high' ? '✅' : emailResult.confidence === 'medium' ? '📧' : '❓'
          log.dim(`  ${icon} Email: ${emailResult.email} (${emailResult.confidence} — ${emailResult.method})`)
        }
      } catch { /* best effort */ }

      const result = scoreProspect(p, analysis, sirene)
      // Override realEmail with verified one
      if (emailResult?.email) {
        result.realEmail = emailResult.email
        ;(result as any).emailConfidence = emailResult.confidence
        ;(result as any).emailMethod = emailResult.method
      }
      scored.push(result)

      if (verbose) {
        const cat = result.category === 'creation' ? '🆕' : '🔄'
        log.prospect(`${cat} ${result.name}`, result.priorityScore, result.status)
        for (const b of result.breakdown.sort((a, b) => b.points - a.points).slice(0, 4)) {
          log.dim(`    +${b.points}pts — ${b.label} (${b.reason})`)
        }
      }

      if (i < prospects.length - 1) {
        await delay(p.url ? config.analysisDelayMs : 200)
      }
    }

    analyzeSpinner.succeed(`${scored.length} prospects analysés`)
    scored.sort((a, b) => b.priorityScore - a.priorityScore)

    // ─── 3. Summary ───
    console.log()
    log.info('Résultats :')
    const hot = scored.filter(s => s.status === 'Chaud').length
    const warm = scored.filter(s => s.status === 'Tiède').length
    const cold = scored.filter(s => s.status === 'Froid').length
    const creations = scored.filter(s => s.category === 'creation').length
    const refontes = scored.filter(s => s.category === 'refonte').length
    log.dim(`🔥 Chaud: ${hot}  |  🟡 Tiède: ${warm}  |  ❄️  Froid: ${cold}`)
    log.dim(`🆕 Création: ${creations}  |  🔄 Refonte: ${refontes}`)
    console.log()

    for (const s of scored) {
      const cat = s.category === 'creation' ? '🆕' : '🔄'
      const email = s.realEmail ? ` — 📧 ${s.realEmail}` : ''
      log.prospect(`${cat} ${s.name}${email}`, s.priorityScore, s.status)
      if (s.sireneData?.siret) {
        log.dim(`    🏢 SIRET ${s.sireneData.siret}${s.sireneData.dateCreation ? ` — Créé ${s.sireneData.dateCreation.slice(0, 4)}` : ''}${s.sireneData.effectif ? ` — ${s.sireneData.effectif} sal.` : ''}`)
      }
      if (s.breakdown.length > 0) {
        const top3 = s.breakdown.sort((a, b) => b.points - a.points).slice(0, 3)
        log.dim(`    ${top3.map(b => `${b.label} (+${b.points})`).join(', ')}`)
      }
    }
    console.log()

    // ─── 4. CSV ───
    if (useCSV) {
      const csvSpinner = ora('Export CSV...').start()
      try {
        const filepath = await exportCSV(scored, metier, ville)
        csvSpinner.succeed(`CSV exporté → ${filepath}`)
      } catch (err) {
        csvSpinner.fail('Erreur export CSV')
        log.error(err instanceof Error ? err.message : String(err))
      }
    }

    // ─── 5. CRM ───
    if (useCRM) {
      const crmSpinner = ora('Injection dans le CRM...').start()
      try {
        const result = await injectIntoCRM(scored, metier, ville)
        crmSpinner.succeed(`CRM : ${result.created} créés, ${result.updated} mis à jour, ${result.errors} erreurs`)
      } catch (err) {
        crmSpinner.fail('Erreur injection CRM')
        log.error(err instanceof Error ? err.message : String(err))
      }
    }

    console.log()
    log.success('Prospection terminée !')
  })

program.parse()
