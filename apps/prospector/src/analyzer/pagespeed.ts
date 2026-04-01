import axios from 'axios'
import { config } from '../config.js'

const PAGESPEED_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'

export interface PageSpeedAudit {
  id: string
  title: string
  description: string
  score: number | null
  displayValue: string | null
  numericValue: number | null
}

export interface PageSpeedCategoryResult {
  score: number | null
  audits: PageSpeedAudit[]       // failed/warning audits
  passedCount: number
  totalCount: number
}

export interface PageSpeedDetailedResult {
  // Core Web Vitals
  fcp: number | null
  lcp: number | null
  tbt: number | null
  cls: number | null
  si: number | null

  // 4 category scores
  performance: PageSpeedCategoryResult
  accessibility: PageSpeedCategoryResult
  seo: PageSpeedCategoryResult
  bestPractices: PageSpeedCategoryResult

  // Resources
  totalByteWeight: number | null
  totalRequestCount: number | null
  heaviestResources: Array<{ url: string; size: number }>

  // Screenshot
  screenshotUrl: string | null

  // Security headers from Lighthouse
  securityIssues: PageSpeedAudit[]
}

const PERFORMANCE_AUDIT_IDS = [
  'render-blocking-resources', 'unused-css-rules', 'unused-javascript',
  'modern-image-formats', 'offscreen-images', 'unminified-css', 'unminified-javascript',
  'efficient-animated-content', 'uses-optimized-images', 'uses-responsive-images',
  'uses-text-compression', 'server-response-time', 'redirects', 'uses-rel-preconnect',
  'uses-http2', 'legacy-javascript', 'total-byte-weight', 'dom-size',
  'mainthread-work-breakdown', 'bootup-time', 'font-display', 'third-party-summary',
  'largest-contentful-paint-element', 'layout-shift-elements', 'long-tasks',
  'non-composited-animations', 'unsized-images', 'viewport',
  'uses-passive-event-listeners', 'no-document-write', 'js-libraries',
  'critical-request-chains', 'user-timings', 'network-rtt', 'network-server-latency',
]

const ACCESSIBILITY_AUDIT_IDS = [
  'color-contrast', 'document-title', 'html-has-lang', 'html-lang-valid',
  'image-alt', 'label', 'link-name', 'list', 'listitem', 'meta-viewport',
  'heading-order', 'bypass', 'tabindex', 'aria-allowed-attr', 'aria-hidden-body',
  'aria-required-attr', 'aria-roles', 'button-name', 'duplicate-id-active',
  'frame-title', 'input-image-alt', 'td-headers-attr', 'valid-lang',
]

const SEO_AUDIT_IDS = [
  'meta-description', 'document-title', 'http-status-code', 'link-text',
  'crawlable-anchors', 'is-crawlable', 'robots-txt', 'hreflang',
  'canonical', 'font-size', 'plugins', 'tap-targets', 'structured-data',
]

const BEST_PRACTICES_AUDIT_IDS = [
  'is-on-https', 'geolocation-on-start', 'notification-on-start',
  'deprecations', 'errors-in-console', 'image-aspect-ratio',
  'image-size-responsive', 'doctype', 'charset', 'js-libraries',
  'paste-preventing-inputs', 'inspector-issues',
  'csp-xss',
]

function extractCategory(audits: Record<string, any>, categoryData: any, auditIds: string[]): PageSpeedCategoryResult {
  const result: PageSpeedCategoryResult = {
    score: categoryData?.score != null ? Math.round(categoryData.score * 100) : null,
    audits: [],
    passedCount: 0,
    totalCount: 0,
  }

  for (const id of auditIds) {
    const audit = audits[id]
    if (!audit) continue
    result.totalCount++
    if (audit.score === 1) { result.passedCount++; continue }
    if (audit.score === null && !audit.displayValue && audit.scoreDisplayMode === 'notApplicable') continue

    result.audits.push({
      id,
      title: audit.title || id,
      description: (audit.description || '').replace(/\[.*?\]\(.*?\)/g, '').trim().slice(0, 300),
      score: audit.score,
      displayValue: audit.displayValue || null,
      numericValue: audit.numericValue ?? null,
    })
  }

  return result
}

async function runFullPageSpeed(url: string, strategy: 'mobile' | 'desktop'): Promise<PageSpeedDetailedResult> {
  const empty: PageSpeedDetailedResult = {
    fcp: null, lcp: null, tbt: null, cls: null, si: null,
    performance: { score: null, audits: [], passedCount: 0, totalCount: 0 },
    accessibility: { score: null, audits: [], passedCount: 0, totalCount: 0 },
    seo: { score: null, audits: [], passedCount: 0, totalCount: 0 },
    bestPractices: { score: null, audits: [], passedCount: 0, totalCount: 0 },
    totalByteWeight: null, totalRequestCount: null, heaviestResources: [],
    screenshotUrl: null, securityIssues: [],
  }

  if (!config.pageSpeedApiKey) return empty

  const response = await axios.get(PAGESPEED_URL, {
    params: {
      url,
      key: config.pageSpeedApiKey,
      strategy,
      category: ['performance', 'accessibility', 'seo', 'best-practices'],
    },
    timeout: config.pageSpeedTimeoutMs,
  })

  const lighthouse = response.data?.lighthouseResult
  if (!lighthouse) return empty

  const audits = lighthouse.audits || {}
  const categories = lighthouse.categories || {}

  // Core Web Vitals
  const fcp = audits['first-contentful-paint']?.numericValue ?? null
  const lcp = audits['largest-contentful-paint']?.numericValue ?? null
  const tbt = audits['total-blocking-time']?.numericValue ?? null
  const cls = audits['cumulative-layout-shift']?.numericValue ?? null
  const si = audits['speed-index']?.numericValue ?? null

  // 4 categories
  const performance = extractCategory(audits, categories.performance, PERFORMANCE_AUDIT_IDS)
  const accessibility = extractCategory(audits, categories.accessibility, ACCESSIBILITY_AUDIT_IDS)
  const seo = extractCategory(audits, categories.seo, SEO_AUDIT_IDS)
  const bestPractices = extractCategory(audits, categories['best-practices'], BEST_PRACTICES_AUDIT_IDS)

  // Total byte weight + request count
  const totalByteWeight = audits['total-byte-weight']?.numericValue ?? null
  let totalRequestCount: number | null = null
  let heaviestResources: Array<{ url: string; size: number }> = []

  const networkRequests = audits['network-requests']
  if (networkRequests?.details?.items) {
    totalRequestCount = networkRequests.details.items.length
    heaviestResources = networkRequests.details.items
      .filter((r: any) => r.transferSize > 0)
      .sort((a: any, b: any) => b.transferSize - a.transferSize)
      .slice(0, 10)
      .map((r: any) => ({
        url: (r.url || '').slice(0, 120),
        size: r.transferSize,
      }))
  }

  // If no network-requests, try resource-summary
  if (!totalRequestCount) {
    const resourceSummary = audits['resource-summary']
    if (resourceSummary?.details?.items) {
      totalRequestCount = resourceSummary.details.items.reduce((sum: number, r: any) => sum + (r.requestCount || 0), 0)
    }
  }

  // Screenshot
  const screenshotUrl = audits['final-screenshot']?.details?.data || null

  // Security-related issues
  const securityIssues: PageSpeedAudit[] = []
  const securityAuditIds = ['is-on-https', 'csp-xss', 'inspector-issues']
  for (const id of securityAuditIds) {
    const audit = audits[id]
    if (audit && audit.score !== null && audit.score < 1) {
      securityIssues.push({
        id,
        title: audit.title || id,
        description: (audit.description || '').replace(/\[.*?\]\(.*?\)/g, '').trim().slice(0, 300),
        score: audit.score,
        displayValue: audit.displayValue || null,
        numericValue: null,
      })
    }
  }

  return {
    fcp, lcp, tbt, cls, si,
    performance, accessibility, seo, bestPractices,
    totalByteWeight, totalRequestCount, heaviestResources,
    screenshotUrl, securityIssues,
  }
}

// ─── Public API ───

export interface FullPageSpeedResult {
  // Mobile scores
  mobileScore: number | null
  mobileAccessibility: number | null
  mobileSEO: number | null
  mobileBestPractices: number | null

  // Desktop scores
  desktopScore: number | null
  desktopAccessibility: number | null
  desktopSEO: number | null
  desktopBestPractices: number | null

  // Mobile Core Web Vitals
  mobileFCP: number | null
  mobileLCP: number | null
  mobileTBT: number | null
  mobileCLS: number | null
  mobileSI: number | null

  // Mobile detailed audits by category
  mobilePerformanceAudits: PageSpeedAudit[]
  mobileAccessibilityAudits: PageSpeedAudit[]
  mobileSEOAudits: PageSpeedAudit[]
  mobileBestPracticesAudits: PageSpeedAudit[]

  // Desktop detailed audits
  desktopPerformanceAudits: PageSpeedAudit[]

  // Resources
  totalByteWeight: number | null
  totalRequestCount: number | null
  heaviestResources: Array<{ url: string; size: number }>

  // Screenshot (base64 data URI)
  mobileScreenshot: string | null

  // Security
  securityIssues: PageSpeedAudit[]

  // Stats
  mobilePassedAudits: number
  mobileTotalAudits: number
}

export async function analyzePageSpeed(url: string): Promise<FullPageSpeedResult> {
  const empty: FullPageSpeedResult = {
    mobileScore: null, mobileAccessibility: null, mobileSEO: null, mobileBestPractices: null,
    desktopScore: null, desktopAccessibility: null, desktopSEO: null, desktopBestPractices: null,
    mobileFCP: null, mobileLCP: null, mobileTBT: null, mobileCLS: null, mobileSI: null,
    mobilePerformanceAudits: [], mobileAccessibilityAudits: [],
    mobileSEOAudits: [], mobileBestPracticesAudits: [],
    desktopPerformanceAudits: [],
    totalByteWeight: null, totalRequestCount: null, heaviestResources: [],
    mobileScreenshot: null, securityIssues: [],
    mobilePassedAudits: 0, mobileTotalAudits: 0,
  }

  try {
    const mobile = await runFullPageSpeed(url, 'mobile')
    const desktop = await runFullPageSpeed(url, 'desktop')

    return {
      mobileScore: mobile.performance.score,
      mobileAccessibility: mobile.accessibility.score,
      mobileSEO: mobile.seo.score,
      mobileBestPractices: mobile.bestPractices.score,

      desktopScore: desktop.performance.score,
      desktopAccessibility: desktop.accessibility.score,
      desktopSEO: desktop.seo.score,
      desktopBestPractices: desktop.bestPractices.score,

      mobileFCP: mobile.fcp,
      mobileLCP: mobile.lcp,
      mobileTBT: mobile.tbt,
      mobileCLS: mobile.cls,
      mobileSI: mobile.si,

      mobilePerformanceAudits: mobile.performance.audits,
      mobileAccessibilityAudits: mobile.accessibility.audits,
      mobileSEOAudits: mobile.seo.audits,
      mobileBestPracticesAudits: mobile.bestPractices.audits,
      desktopPerformanceAudits: desktop.performance.audits,

      totalByteWeight: mobile.totalByteWeight,
      totalRequestCount: mobile.totalRequestCount,
      heaviestResources: mobile.heaviestResources,

      mobileScreenshot: mobile.screenshotUrl,
      securityIssues: [...mobile.securityIssues, ...desktop.securityIssues.filter(d => !mobile.securityIssues.some(m => m.id === d.id))],

      mobilePassedAudits: mobile.performance.passedCount + mobile.accessibility.passedCount + mobile.seo.passedCount + mobile.bestPractices.passedCount,
      mobileTotalAudits: mobile.performance.totalCount + mobile.accessibility.totalCount + mobile.seo.totalCount + mobile.bestPractices.totalCount,
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('429') || msg.includes('quota')) {
      throw new Error('PageSpeed API quota exceeded')
    }
    return empty
  }
}
