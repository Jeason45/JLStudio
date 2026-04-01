import type { SocialPresence } from './socialDetector.js'
import type { EmailResult } from './emailExtractor.js'
import type { PageSpeedAudit, FullPageSpeedResult } from './pagespeed.js'
import type { W3CValidationResult } from './w3cValidator.js'
import type { YellowLabResult } from './yellowLab.js'
import type { SSLResult, SecurityHeadersResult } from './sslChecker.js'
import type { CarbonResult } from './carbonChecker.js'

export interface SiteAnalysis {
  url: string

  // ── PageSpeed (4 categories) ──
  mobileScore: number | null
  mobileAccessibility: number | null
  mobileSEO: number | null
  mobileBestPractices: number | null
  desktopScore: number | null
  desktopAccessibility: number | null
  desktopSEO: number | null
  desktopBestPractices: number | null

  // Core Web Vitals
  mobileFCP: number | null
  mobileLCP: number | null
  mobileTBT: number | null
  mobileCLS: number | null
  mobileSI: number | null

  // PageSpeed audits (failed ones)
  mobilePerformanceAudits: PageSpeedAudit[]
  mobileAccessibilityAudits: PageSpeedAudit[]
  mobileSEOAudits: PageSpeedAudit[]
  mobileBestPracticesAudits: PageSpeedAudit[]
  desktopPerformanceAudits: PageSpeedAudit[]

  // Resources
  totalByteWeight: number | null      // bytes
  totalRequestCount: number | null
  heaviestResources: Array<{ url: string; size: number }>

  // Screenshot
  mobileScreenshot: string | null     // base64 data URI

  // PageSpeed stats
  mobilePassedAudits: number
  mobileTotalAudits: number
  pageSpeedSecurityIssues: PageSpeedAudit[]

  // ── Basic tech detection ──
  isHttps: boolean
  isResponsive: boolean
  cmsDetected: string | null
  estimatedAge: number | null
  loadTimeMs: number | null
  pageSizeKB: number | null

  // Advanced HTML
  hasAnalytics: boolean
  hasFavicon: boolean
  hasMetaDescription: boolean
  hasOpenGraph: boolean
  hasSitemap: boolean
  hasRobotsTxt: boolean
  usesJquery: boolean
  usesFlash: boolean
  hasObsoleteTags: boolean
  usesModernImages: boolean
  internalLinkCount: number
  redirectCount: number

  // ── Mozilla Observatory ──
  observatoryGrade: string | null
  observatoryScore: number | null

  // ── Email ──
  emailData: EmailResult | null

  // ── Social media ──
  socialPresence: SocialPresence | null

  // ── W3C HTML Validation ──
  w3cErrors: number | null
  w3cWarnings: number | null
  w3cTopErrors: string[]

  // ── Yellow Lab Tools ──
  yellowLabScore: number | null
  yellowLabCategories: Array<{ name: string; score: number; issueCount: number }>
  yellowLabTopIssues: string[]

  // ── SSL Certificate ──
  sslResult: SSLResult | null

  // ── Security Headers ──
  securityHeaders: SecurityHeadersResult | null

  // ── Carbon Footprint ──
  carbonResult: CarbonResult | null

  error: string | null
}
