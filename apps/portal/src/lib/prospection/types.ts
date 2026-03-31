export interface RawProspect {
  name: string
  url: string | null
  phone: string | null
  address: string | null
  city: string | null
}

export interface SiteAnalysis {
  url: string
  mobileScore: number | null
  desktopScore: number | null
  isHttps: boolean
  isResponsive: boolean
  cmsDetected: string | null
  estimatedAge: number | null
  loadTimeMs: number | null
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
  socialPresenceCount: number
  socialLinks: Record<string, string | null>
  emails: string[]
  primaryEmail: string | null
  observatoryGrade: string | null
  error: string | null
}

export interface SireneData {
  siret: string | null
  siren: string | null
  dateCreation: string | null
  statusActif: boolean
  effectif: string | null
  codeNAF: string | null
  libelleNAF: string | null
  adresse: string | null
}

export interface ScoreBreakdown {
  label: string
  points: number
  reason: string
}
