import axios from 'axios'
import { config } from '../config.js'

const PAGESPEED_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'

export interface PageSpeedAudit {
  id: string
  title: string
  description: string
  score: number | null       // 0-1 (null = informational)
  displayValue: string | null // "1.2 s", "24 KiB", etc.
  numericValue: number | null
}

export interface PageSpeedDetailedResult {
  score: number | null        // 0-100
  fcp: number | null          // ms
  lcp: number | null          // ms
  tbt: number | null          // ms
  cls: number | null          // score
  si: number | null           // ms (Speed Index)
  opportunities: PageSpeedAudit[]  // things to fix (with savings)
  diagnostics: PageSpeedAudit[]    // informational issues
  passedAudits: number             // how many audits passed
  totalAudits: number
}

async function runPageSpeedDetailed(url: string, strategy: 'mobile' | 'desktop'): Promise<PageSpeedDetailedResult> {
  const result: PageSpeedDetailedResult = {
    score: null, fcp: null, lcp: null, tbt: null, cls: null, si: null,
    opportunities: [], diagnostics: [], passedAudits: 0, totalAudits: 0,
  }

  if (!config.pageSpeedApiKey) return result

  const response = await axios.get(PAGESPEED_URL, {
    params: {
      url,
      key: config.pageSpeedApiKey,
      strategy,
      category: 'performance',
    },
    timeout: config.pageSpeedTimeoutMs,
  })

  const lighthouse = response.data?.lighthouseResult
  if (!lighthouse) return result

  // Core scores
  result.score = Math.round((lighthouse.categories?.performance?.score ?? 0) * 100)
  const audits = lighthouse.audits || {}

  // Core Web Vitals
  result.fcp = audits['first-contentful-paint']?.numericValue ?? null
  result.lcp = audits['largest-contentful-paint']?.numericValue ?? null
  result.tbt = audits['total-blocking-time']?.numericValue ?? null
  result.cls = audits['cumulative-layout-shift']?.numericValue ?? null
  result.si = audits['speed-index']?.numericValue ?? null

  // Extract opportunities (things with potential savings)
  const opportunityIds = [
    'render-blocking-resources',
    'unused-css-rules',
    'unused-javascript',
    'modern-image-formats',
    'offscreen-images',
    'unminified-css',
    'unminified-javascript',
    'efficient-animated-content',
    'uses-optimized-images',
    'uses-responsive-images',
    'uses-text-compression',
    'server-response-time',
    'redirects',
    'uses-rel-preconnect',
    'uses-http2',
    'legacy-javascript',
    'total-byte-weight',
    'dom-size',
  ]

  for (const id of opportunityIds) {
    const audit = audits[id]
    if (!audit) continue
    result.totalAudits++
    if (audit.score === 1) { result.passedAudits++; continue }
    if (audit.score === null && !audit.displayValue) continue

    result.opportunities.push({
      id,
      title: audit.title || id,
      description: (audit.description || '').replace(/\[.*?\]\(.*?\)/g, '').trim().slice(0, 200),
      score: audit.score,
      displayValue: audit.displayValue || null,
      numericValue: audit.numericValue ?? null,
    })
  }

  // Extract diagnostics
  const diagnosticIds = [
    'mainthread-work-breakdown',
    'bootup-time',
    'font-display',
    'third-party-summary',
    'largest-contentful-paint-element',
    'layout-shift-elements',
    'long-tasks',
    'non-composited-animations',
    'unsized-images',
    'viewport',
    'uses-passive-event-listeners',
    'no-document-write',
    'js-libraries',
  ]

  for (const id of diagnosticIds) {
    const audit = audits[id]
    if (!audit) continue
    result.totalAudits++
    if (audit.score === 1) { result.passedAudits++; continue }

    result.diagnostics.push({
      id,
      title: audit.title || id,
      description: (audit.description || '').replace(/\[.*?\]\(.*?\)/g, '').trim().slice(0, 200),
      score: audit.score,
      displayValue: audit.displayValue || null,
      numericValue: audit.numericValue ?? null,
    })
  }

  return result
}

export interface FullPageSpeedResult {
  mobileScore: number | null
  desktopScore: number | null
  mobileFCP: number | null
  mobileLCP: number | null
  mobileTBT: number | null
  mobileCLS: number | null
  mobileSI: number | null
  mobileOpportunities: PageSpeedAudit[]
  mobileDiagnostics: PageSpeedAudit[]
  desktopOpportunities: PageSpeedAudit[]
  desktopDiagnostics: PageSpeedAudit[]
  mobilePassedAudits: number
  mobileTotalAudits: number
}

export async function analyzePageSpeed(url: string): Promise<FullPageSpeedResult> {
  const empty: FullPageSpeedResult = {
    mobileScore: null, desktopScore: null,
    mobileFCP: null, mobileLCP: null, mobileTBT: null, mobileCLS: null, mobileSI: null,
    mobileOpportunities: [], mobileDiagnostics: [],
    desktopOpportunities: [], desktopDiagnostics: [],
    mobilePassedAudits: 0, mobileTotalAudits: 0,
  }

  try {
    const mobile = await runPageSpeedDetailed(url, 'mobile')
    const desktop = await runPageSpeedDetailed(url, 'desktop')

    return {
      mobileScore: mobile.score,
      desktopScore: desktop.score,
      mobileFCP: mobile.fcp,
      mobileLCP: mobile.lcp,
      mobileTBT: mobile.tbt,
      mobileCLS: mobile.cls,
      mobileSI: mobile.si,
      mobileOpportunities: mobile.opportunities,
      mobileDiagnostics: mobile.diagnostics,
      desktopOpportunities: desktop.opportunities,
      desktopDiagnostics: desktop.diagnostics,
      mobilePassedAudits: mobile.passedAudits,
      mobileTotalAudits: mobile.totalAudits,
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('429') || msg.includes('quota')) {
      throw new Error('PageSpeed API quota exceeded')
    }
    return empty
  }
}
