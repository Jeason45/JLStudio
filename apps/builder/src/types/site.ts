// ─────────────────────────────────────────────
// BRAND & DESIGN SYSTEM
// ─────────────────────────────────────────────

export interface BrandColors {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
}

export interface BrandTypography {
  heading: string
  body: string
  size: 'compact' | 'default' | 'large'
}

export interface Brand {
  colors: BrandColors
  typography: BrandTypography
  logo?: string
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full'
  spacing: 'compact' | 'default' | 'relaxed'
}

// ─────────────────────────────────────────────
// NAVIGATION & FOOTER
// ─────────────────────────────────────────────

export interface NavLink {
  label: string
  href: string
}

export interface Navigation {
  links: NavLink[]
  cta?: { label: string; href: string }
  style: 'transparent' | 'solid' | 'blur'
}

export interface FooterColumn {
  title: string
  links: NavLink[]
}

export interface Footer {
  columns: FooterColumn[]
  copyright: string
  showSocials: boolean
  socials?: {
    twitter?: string
    linkedin?: string
    instagram?: string
    facebook?: string
    github?: string
  }
}

// ─────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────

export type SectionBackground = 'white' | 'light' | 'dark' | 'primary' | 'gradient' | 'custom' | 'custom-gradient'
export type SectionPaddingY = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export type SectionTitleSize = 'sm' | 'md' | 'lg' | 'xl'
export type SectionTextAlign = 'left' | 'center' | 'right' | 'justify'
export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type SectionLetterSpacing = 'tight' | 'normal' | 'wide' | 'wider'
export type SectionTextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize'
export type SectionBorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type SectionBoxShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type DividerShape = 'none' | 'wave' | 'angle' | 'curve' | 'triangle'

export interface GradientConfig {
  from: string
  to: string
  direction: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl'
}

export interface BackgroundImageConfig {
  url: string
  overlayColor?: string
  overlayOpacity?: number
  size?: 'cover' | 'contain' | 'auto'
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right'
  attachment?: 'scroll' | 'fixed'
}

export interface DividerConfig {
  shape: DividerShape
  color?: string
}

export interface SectionStyle {
  background: SectionBackground
  paddingY: SectionPaddingY
  fullWidth?: boolean
  titleSize?: SectionTitleSize
  textAlign?: SectionTextAlign
  textColor?: string
  accentColor?: string
  // Typography
  fontFamily?: string
  fontWeight?: number
  letterSpacing?: SectionLetterSpacing
  textTransform?: SectionTextTransform
  // Custom backgrounds
  customBgColor?: string
  customGradient?: GradientConfig
  backgroundImage?: BackgroundImageConfig
  /** Video background (MP4/WebM) */
  videoBackground?: { url: string; poster?: string; loop?: boolean; muted?: boolean }
  // Borders & Effects
  borderRadius?: SectionBorderRadius
  boxShadow?: SectionBoxShadow
  opacity?: number
  // Spacing overrides
  paddingTop?: SectionSpacing
  paddingBottom?: SectionSpacing
  marginTop?: SectionSpacing
  marginBottom?: SectionSpacing
  // Dividers
  dividerTop?: DividerConfig
  dividerBottom?: DividerConfig
}

export interface SectionConfig {
  id: string
  type: string
  variant: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Record<string, any>
  style: SectionStyle
  visible: boolean
  /** Custom elements tree (for 'custom' section type) */
  elements?: import('@/types/elements').CustomElement[]
  /** Component instance link (master/instance system) */
  __componentInstance?: import('@/types/components').ComponentInstanceData
}

// ─────────────────────────────────────────────
// LOCALIZATION
// ─────────────────────────────────────────────

export interface SiteLocale {
  id: string
  code: string // e.g. 'fr', 'en', 'es'
  label: string // e.g. 'Français', 'English'
  isDefault: boolean
  hreflang?: string // e.g. 'fr-FR'
}

// ─────────────────────────────────────────────
// DEPLOY
// ─────────────────────────────────────────────

export interface DeployConfig {
  lastPublishedAt?: string
  stagingUrl?: string
  productionUrl?: string
  autoDeploy?: boolean
}

// ─────────────────────────────────────────────
// PAGES
// ─────────────────────────────────────────────

export interface PageSeo {
  title: string
  description: string
  ogImage?: string
  metaTitle?: string
  metaDescription?: string
  noIndex?: boolean
  canonicalUrl?: string
}

export interface PageConfig {
  id: string
  slug: string
  title: string
  seo: PageSeo
  sections: SectionConfig[]
  /** Linked CMS collection for dynamic collection pages */
  collectionId?: string
  /** Custom code injected in page <head> */
  headCode?: string
  /** Custom code injected before page </body> */
  bodyCode?: string
  /** Password protection for the page */
  password?: string
  /** Folder grouping for pages panel organization */
  folder?: string
  /** Whether this is a utility page (404, password, search) */
  isUtilityPage?: boolean
}

// ─────────────────────────────────────────────
// INTEGRATIONS
// ─────────────────────────────────────────────

export type WebhookEvent = 'form.submit' | 'order.created' | 'order.paid' | 'cms.item.created' | 'cms.item.updated' | 'contact.created'

export interface WebhookConfig {
  id: string
  name: string
  url: string
  events: WebhookEvent[]
  secret?: string
  enabled: boolean
}

export interface SiteIntegrations {
  crm: { enabled: boolean }
  analytics?: {
    provider: 'plausible' | 'gtag' | 'posthog' | 'umami'
    id: string
    /** Umami script host URL */
    host?: string
  }
  email?: {
    provider: 'resend'
    from: string
    replyTo?: string
  }
  gtm?: { containerId: string }
  metaPixel?: { pixelId: string }
  hotjar?: { siteId: string }
  mailchimp?: { apiKey: string; listId: string; server: string }
  hubspot?: { portalId: string; formId?: string; accessToken?: string }
  zapier?: { webhookUrl: string }
  customIntegrations?: Array<{ id: string; name: string; type: 'script' | 'webhook' | 'api'; config: Record<string, string>; enabled: boolean }>
  webhooks?: WebhookConfig[]
}

// ─────────────────────────────────────────────
// REDIRECTS
// ─────────────────────────────────────────────

export interface SiteRedirect {
  id: string
  from: string
  to: string
  type: '301' | '302'
}

// ─────────────────────────────────────────────
// COMPONENTS & VARIABLES
// ─────────────────────────────────────────────

export interface ComponentDefinition {
  id: string
  name: string
  description?: string
  sectionSnapshot: SectionConfig
  instanceCount: number
  createdAt: string
  props?: import('@/types/components').ComponentPropDef[]
  slots?: import('@/types/components').ComponentSlotDef[]
  variants?: import('@/types/components').ComponentVariantDef[]
  category?: string
}

export interface CSSVariable {
  id: string
  name: string
  type: 'color' | 'size' | 'font-family' | 'number' | 'percentage'
  value: string
  group?: string
  modeValues?: Record<string, string>
  description?: string
}

// ─────────────────────────────────────────────
// SITE CONFIG (root)
// ─────────────────────────────────────────────

export interface SiteMeta {
  title: string
  description: string
  lang: 'fr' | 'en' | 'es' | 'de'
  favicon?: string
  url?: string
  seoTitle?: string
  seoDescription?: string
  ogImage?: string
  headCode?: string
  bodyCode?: string
}

export interface AnimationPresetCustom {
  id: string
  name: string
  category: string
  config: Record<string, unknown>
}

export interface SiteConfig {
  id: string
  meta: SiteMeta
  brand: Brand
  pages: PageConfig[]
  navigation: Navigation
  footer: Footer
  integrations: SiteIntegrations
  components?: ComponentDefinition[]
  variables?: CSSVariable[]
  classes?: import('@/types/classes').CSSClass[]
  tagStyles?: import('@/types/classes').TagStyles
  customPresets?: AnimationPresetCustom[]
  customFonts?: import('@/lib/fonts').CustomFontDef[]
  redirects?: SiteRedirect[]
  robotsTxt?: string
  locales?: SiteLocale[]
  activeLocale?: string
  deploy?: DeployConfig
  /** Global JSON-LD structured data (injected as <script type="application/ld+json">) */
  jsonLd?: string
}

// ─────────────────────────────────────────────
// DEFAULTS
// ─────────────────────────────────────────────

export const DEFAULT_BRAND: Brand = {
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#f59e0b',
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#f1f5f9',
  },
  typography: {
    heading: 'Inter',
    body: 'Inter',
    size: 'default',
  },
  borderRadius: 'md',
  spacing: 'default',
}

export const DEFAULT_NAVIGATION: Navigation = {
  links: [],
  style: 'solid',
}

export const DEFAULT_FOOTER: Footer = {
  columns: [],
  copyright: `© ${new Date().getFullYear()} Mon Site. Tous droits réservés.`,
  showSocials: false,
}

export const DEFAULT_SITE_CONFIG = (id: string, name: string): SiteConfig => ({
  id,
  meta: {
    title: name,
    description: '',
    lang: 'fr',
  },
  brand: DEFAULT_BRAND,
  pages: [
    {
      id: 'page-home',
      slug: '/',
      title: 'Accueil',
      seo: { title: name, description: '' },
      sections: [],
    },
  ],
  navigation: DEFAULT_NAVIGATION,
  footer: DEFAULT_FOOTER,
  integrations: {
    crm: { enabled: true },
  },
})
