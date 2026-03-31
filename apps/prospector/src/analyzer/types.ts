import type { SocialPresence } from './socialDetector.js'
import type { EmailResult } from './emailExtractor.js'
import type { PageSpeedAudit, FullPageSpeedResult } from './pagespeed.js'
import type { W3CValidationResult } from './w3cValidator.js'
import type { YellowLabResult } from './yellowLab.js'

export interface SiteAnalysis {
  url: string

  // PageSpeed Insights (detailed)
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

  // Basic tech
  isHttps: boolean
  isResponsive: boolean
  cmsDetected: string | null
  estimatedAge: number | null
  loadTimeMs: number | null
  pageSizeKB: number | null

  // Advanced HTML analysis
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

  // Mozilla Observatory
  observatoryGrade: string | null
  observatoryScore: number | null

  // Email extraction
  emailData: EmailResult | null

  // Social media presence
  socialPresence: SocialPresence | null

  // W3C HTML Validation
  w3cErrors: number | null
  w3cWarnings: number | null
  w3cTopErrors: string[]

  // Yellow Lab Tools
  yellowLabScore: number | null
  yellowLabCategories: Array<{ name: string; score: number; issueCount: number }>
  yellowLabTopIssues: string[]

  error: string | null
}
