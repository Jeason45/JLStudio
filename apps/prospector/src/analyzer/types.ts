import type { SocialPresence } from './socialDetector.js'
import type { EmailResult } from './emailExtractor.js'

export interface SiteAnalysis {
  url: string

  // PageSpeed Insights
  mobileScore: number | null
  desktopScore: number | null
  mobileFCP: number | null
  mobileLCP: number | null

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

  error: string | null
}
