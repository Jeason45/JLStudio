import dns from 'dns/promises'
import net from 'net'
import type { SiteAnalysis, SireneData } from './types'
import { YellowLabRunResponseSchema, safeParseJson } from './schemas'

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
const HTTP_TIMEOUT = 15000
const PAGESPEED_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const SIRENE_URL = 'https://recherche-entreprises.api.gouv.fr/search'
const W3C_URL = 'https://validator.w3.org/nu/'
const YELLOWLAB_URL = 'https://yellowlab.tools/api'

// ── CMS patterns ──

const CMS_PATTERNS: Array<{ pattern: RegExp; name: string }> = [
  { pattern: /wp-content|wp-includes|wordpress/i, name: 'WordPress' },
  { pattern: /wix\.com|wixsite\.com|X-Wix-/i, name: 'Wix' },
  { pattern: /jimdo/i, name: 'Jimdo' },
  { pattern: /weebly/i, name: 'Weebly' },
  { pattern: /squarespace/i, name: 'Squarespace' },
  { pattern: /shopify/i, name: 'Shopify' },
  { pattern: /joomla/i, name: 'Joomla' },
  { pattern: /drupal/i, name: 'Drupal' },
  { pattern: /prestashop/i, name: 'PrestaShop' },
  { pattern: /webflow/i, name: 'Webflow' },
  { pattern: /duda/i, name: 'Duda' },
  { pattern: /e-monsite/i, name: 'e-monsite' },
  { pattern: /over-blog|overblog/i, name: 'OverBlog' },
  { pattern: /blogger\.com|blogspot/i, name: 'Blogger' },
  { pattern: /1and1|ionos/i, name: '1&1/IONOS' },
  { pattern: /site123/i, name: 'Site123' },
  { pattern: /strikingly/i, name: 'Strikingly' },
]

// ── Social patterns ──

const SOCIAL_PATTERNS: Array<{ key: string; pattern: RegExp }> = [
  { key: 'facebook', pattern: /href=["'](https?:\/\/(?:www\.)?facebook\.com\/[^"'\s>]+)["']/gi },
  { key: 'instagram', pattern: /href=["'](https?:\/\/(?:www\.)?instagram\.com\/[^"'\s>]+)["']/gi },
  { key: 'linkedin', pattern: /href=["'](https?:\/\/(?:www\.)?linkedin\.com\/(?:company|in)\/[^"'\s>]+)["']/gi },
  { key: 'twitter', pattern: /href=["'](https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/[^"'\s>]+)["']/gi },
  { key: 'youtube', pattern: /href=["'](https?:\/\/(?:www\.)?youtube\.com\/(?:channel|c|@)[^"'\s>]+)["']/gi },
  { key: 'tiktok', pattern: /href=["'](https?:\/\/(?:www\.)?tiktok\.com\/@[^"'\s>]+)["']/gi },
]

// ── Email patterns ──

const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g

const EMAIL_BLACKLIST = [
  'wixpress.com', 'sentry.io', 'example.com', 'domain.com',
  'email.com', 'yoursite.com', 'wordpress.org', 'w3.org',
  'schema.org', 'googleapis.com', 'google.com', 'facebook.com',
  'twitter.com', 'instagram.com', 'jquery.com', 'cloudflare.com',
]

const CONTACT_PATHS = ['/contact', '/nous-contacter', '/contactez-nous', '/mentions-legales', '/a-propos', '/about']

// ═══════════════════════════════════════════════
// Tech analyzer — fetch HTML, detect everything
// ═══════════════════════════════════════════════

export interface TechResult {
  html: string
  finalUrl: string
  isHttps: boolean
  isResponsive: boolean
  cmsDetected: string | null
  estimatedAge: number | null
  loadTimeMs: number | null
  hasAnalytics: boolean
  hasFavicon: boolean
  hasMetaDescription: boolean
  hasOpenGraph: boolean
  usesJquery: boolean
  usesFlash: boolean
  hasObsoleteTags: boolean
  usesModernImages: boolean
  internalLinkCount: number
  // ── New fields (v2) ──
  metaTitle: string | null
  metaTitleLength: number
  metaDescriptionLength: number
  h1Text: string | null
  h1Count: number
  headingHierarchyValid: boolean
  hasCanonical: boolean
  hasLangAttribute: boolean
  langValue: string | null
  hasViewportMeta: boolean
  hasPhoneLink: boolean         // <a href="tel:...">
  phoneNumber: string | null
  hasContactForm: boolean
  hasGoogleMaps: boolean
  hasStructuredData: boolean
  structuredDataTypes: string[]  // e.g. ["LocalBusiness", "Product"]
  hasMentionsLegales: boolean
  hasPrivacyPolicy: boolean
  hasCookieBanner: boolean
  hasReviews: boolean           // testimonials/reviews section detected
  hasCTA: boolean               // clear call-to-action button
  ctaTexts: string[]            // detected CTA texts
  altTextCoverage: number       // 0-100 percentage of images with alt
  totalImages: number
  imagesWithAlt: number
  hasSearchBar: boolean
  hasBreadcrumbs: boolean
  hasCompression: boolean       // gzip/brotli from response headers
  contentFreshness: string | null // last detected date on page
}

export async function analyzeTech(url: string): Promise<TechResult> {
  const defaults: TechResult = {
    html: '',
    finalUrl: url,
    isHttps: url.startsWith('https://'),
    isResponsive: false,
    cmsDetected: null,
    estimatedAge: null,
    loadTimeMs: null,
    hasAnalytics: false,
    hasFavicon: false,
    hasMetaDescription: false,
    hasOpenGraph: false,
    usesJquery: false,
    usesFlash: false,
    hasObsoleteTags: false,
    usesModernImages: false,
    internalLinkCount: 0,
    metaTitle: null,
    metaTitleLength: 0,
    metaDescriptionLength: 0,
    h1Text: null,
    h1Count: 0,
    headingHierarchyValid: true,
    hasCanonical: false,
    hasLangAttribute: false,
    langValue: null,
    hasViewportMeta: false,
    hasPhoneLink: false,
    phoneNumber: null,
    hasContactForm: false,
    hasGoogleMaps: false,
    hasStructuredData: false,
    structuredDataTypes: [],
    hasMentionsLegales: false,
    hasPrivacyPolicy: false,
    hasCookieBanner: false,
    hasReviews: false,
    hasCTA: false,
    ctaTexts: [],
    altTextCoverage: 0,
    totalImages: 0,
    imagesWithAlt: 0,
    hasSearchBar: false,
    hasBreadcrumbs: false,
    hasCompression: false,
    contentFreshness: null,
  }

  const start = Date.now()

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT, 'Accept': 'text/html' },
      redirect: 'follow',
      signal: AbortSignal.timeout(HTTP_TIMEOUT),
    })

    const loadTimeMs = Date.now() - start
    const html = await response.text()
    const finalUrl = response.url || url
    const headersStr = [...response.headers.entries()].map(([k, v]) => `${k}: ${v}`).join('\n')
    const combined = html + '\n' + headersStr

    // HTTPS
    const isHttps = finalUrl.startsWith('https://')

    // Responsive (viewport meta tag)
    const isResponsive = /meta\s[^>]*name=["']viewport["']/i.test(html)

    // CMS detection
    let cmsDetected: string | null = null
    for (const { pattern, name } of CMS_PATTERNS) {
      if (pattern.test(combined)) {
        cmsDetected = name
        break
      }
    }

    // Analytics
    const hasAnalytics = /gtag|googletagmanager|GTM-|analytics\.js|ga\.js|matomo|plausible|umami|hotjar|clarity\.ms/i.test(html)

    // Favicon
    const hasFavicon = /rel=["'](icon|shortcut icon|apple-touch-icon)["']/i.test(html)

    // Meta description
    const hasMetaDescription = /meta\s[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(html)

    // Open Graph
    const hasOpenGraph = /meta\s[^>]*property=["']og:/i.test(html)

    // jQuery
    const usesJquery = /jquery[\.\-]min\.js|jquery[\.\-]\d|\/jquery\.js/i.test(html)

    // Flash / Silverlight
    const usesFlash = /\.swf["']|<embed[^>]*type=["']application\/x-shockwave-flash|silverlight/i.test(html)

    // Obsolete tags
    const hasObsoleteTags = /<font[\s>]|<center[\s>]|<marquee[\s>]|<blink[\s>]|<frameset|<frame[\s>]/i.test(html)

    // Modern images (webp/avif)
    const usesModernImages = /\.webp|\.avif|image\/webp|image\/avif/i.test(html)

    // Internal links count
    let internalLinkCount = 0
    try {
      const hostname = new URL(finalUrl).hostname
      const linkMatches = html.match(/<a\s[^>]*href=["'][^"']*["']/gi) || []
      internalLinkCount = linkMatches.filter(l => {
        const href = l.match(/href=["']([^"']*)["']/)?.[1] || ''
        if (href.startsWith('/') || href.startsWith('#')) return true
        try { return new URL(href).hostname === hostname } catch { return false }
      }).length
    } catch { /* ignore */ }

    // Copyright year
    const estimatedAge = extractCopyrightYear(html)

    // ── V2: New HTML-based checks ──

    // Meta title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const metaTitle = titleMatch ? titleMatch[1].trim() : null
    const metaTitleLength = metaTitle?.length || 0

    // Meta description length
    const descMatch = html.match(/meta\s[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)
    const metaDescriptionLength = descMatch ? descMatch[1].length : 0

    // H1 analysis
    const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || []
    const h1Count = h1Matches.length
    const h1Text = h1Count > 0 ? (h1Matches[0] || '').replace(/<[^>]+>/g, '').trim().slice(0, 200) : null

    // Heading hierarchy (check for skipped levels)
    const headingLevels = (html.match(/<h[1-6][^>]*>/gi) || [])
      .map(h => parseInt(h.match(/h([1-6])/i)?.[1] || '0'))
      .filter(l => l > 0)
    let headingHierarchyValid = true
    for (let i = 1; i < headingLevels.length; i++) {
      if (headingLevels[i] > headingLevels[i - 1] + 1) {
        headingHierarchyValid = false
        break
      }
    }

    // Canonical URL
    const hasCanonical = /rel=["']canonical["']/i.test(html)

    // Lang attribute
    const langMatch = html.match(/<html[^>]*\slang=["']([^"']+)["']/i)
    const hasLangAttribute = !!langMatch
    const langValue = langMatch ? langMatch[1] : null

    // Viewport meta (more specific than isResponsive)
    const hasViewportMeta = isResponsive

    // Phone link (tel:)
    const phoneLink = html.match(/<a[^>]*href=["']tel:([^"']+)["']/i)
    const hasPhoneLink = !!phoneLink
    const phoneNumber = phoneLink ? phoneLink[1].replace(/\s+/g, '') : null

    // Contact form
    const hasContactForm = /<form[\s\S]*?<\/form>/i.test(html) &&
      (/type=["']email["']|type=["']tel["']|name=["'](?:email|message|name|nom|prenom|telephone|phone)["']/i.test(html))

    // Google Maps
    const hasGoogleMaps = /maps\.google|google\.com\/maps|maps\.googleapis/i.test(html) ||
      /<iframe[^>]*(?:maps\.google|google\.com\/maps)/i.test(html)

    // Structured data (JSON-LD)
    const jsonLdBlocks = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || []
    const structuredDataTypes: string[] = []
    for (const block of jsonLdBlocks) {
      const typeMatches = block.match(/"@type"\s*:\s*"([^"]+)"/g) || []
      for (const m of typeMatches) {
        const t = m.match(/"@type"\s*:\s*"([^"]+)"/)?.[1]
        if (t && !structuredDataTypes.includes(t)) structuredDataTypes.push(t)
      }
    }
    const hasStructuredData = structuredDataTypes.length > 0

    // Mentions légales
    const hasMentionsLegales = /mentions[\s-]*l[eé]gales|legal[\s-]*notice/i.test(html)

    // Privacy policy
    const hasPrivacyPolicy = /politique[\s-]*de[\s-]*confidentialit[eé]|privacy[\s-]*policy|donn[eé]es[\s-]*personnelles|rgpd|gdpr/i.test(html)

    // Cookie banner
    const hasCookieBanner = /cookie[\s-]*consent|cookie[\s-]*banner|tarteaucitron|cookiebot|axeptio|onetrust|didomi|cookie[\s-]*notice/i.test(html)

    // Reviews/testimonials
    const hasReviews = /t[eé]moignage|avis[\s-]*client|review|testimonial|google[\s-]*review|elfsight.*review|widget.*avis/i.test(html)

    // CTA buttons
    const ctaPatterns = /(?:prendre|r[eé]server|demander|obtenir|t[eé]l[eé]charger|appeler|contacter|devis|rdv|rendez[\s-]*vous|commander|acheter|s['\u2019]inscrire|essayer|d[eé]couvrir)/i
    const buttonTexts = (html.match(/<(?:a|button)[^>]*>[\s\S]*?<\/(?:a|button)>/gi) || [])
      .map(b => b.replace(/<[^>]+>/g, '').trim())
      .filter(t => t.length > 2 && t.length < 60 && ctaPatterns.test(t))
    const hasCTA = buttonTexts.length > 0
    const ctaTexts = buttonTexts.slice(0, 5)

    // Alt text coverage
    const allImages = html.match(/<img[^>]*>/gi) || []
    const totalImages = allImages.length
    const imagesWithAlt = allImages.filter(img => /alt=["'][^"']+["']/i.test(img)).length
    const altTextCoverage = totalImages > 0 ? Math.round((imagesWithAlt / totalImages) * 100) : 100

    // Search bar
    const hasSearchBar = /type=["']search["']|role=["']search["']|class=["'][^"']*search/i.test(html)

    // Breadcrumbs
    const hasBreadcrumbs = /breadcrumb|fil[\s-]*d[\s'\u2019]ariane|BreadcrumbList/i.test(html)

    // Compression (from response headers)
    const hasCompression = /content-encoding:\s*(gzip|br|deflate)/i.test(headersStr)

    // Content freshness (detect most recent date on page)
    const datePatterns = html.match(/\b(20[2-3]\d[\s/-](?:0[1-9]|1[0-2])[\s/-](?:[0-2]\d|3[01]))\b/g) ||
      html.match(/\b(?:0[1-9]|[12]\d|3[01])[\/\-.](?:0[1-9]|1[0-2])[\/\-.]20[2-3]\d\b/g) || []
    const contentFreshness = datePatterns.length > 0 ? datePatterns[datePatterns.length - 1] : null

    return {
      html,
      finalUrl,
      isHttps,
      isResponsive,
      cmsDetected,
      estimatedAge,
      loadTimeMs,
      hasAnalytics,
      hasFavicon,
      hasMetaDescription,
      hasOpenGraph,
      usesJquery,
      usesFlash,
      hasObsoleteTags,
      usesModernImages,
      internalLinkCount,
      metaTitle,
      metaTitleLength,
      metaDescriptionLength,
      h1Text,
      h1Count,
      headingHierarchyValid,
      hasCanonical,
      hasLangAttribute,
      langValue,
      hasViewportMeta,
      hasPhoneLink,
      phoneNumber,
      hasContactForm,
      hasGoogleMaps,
      hasStructuredData,
      structuredDataTypes,
      hasMentionsLegales,
      hasPrivacyPolicy,
      hasCookieBanner,
      hasReviews,
      hasCTA,
      ctaTexts,
      altTextCoverage,
      totalImages,
      imagesWithAlt,
      hasSearchBar,
      hasBreadcrumbs,
      hasCompression,
      contentFreshness,
    }
  } catch {
    return { ...defaults, loadTimeMs: Date.now() - start }
  }
}

// ═══════════════════════════════════════════════
// SEO files — HEAD requests for sitemap + robots
// ═══════════════════════════════════════════════

export async function checkSeoFiles(url: string): Promise<{ hasSitemap: boolean; hasRobotsTxt: boolean }> {
  let baseUrl: string
  try {
    const u = new URL(url)
    baseUrl = `${u.protocol}//${u.hostname}`
  } catch {
    return { hasSitemap: false, hasRobotsTxt: false }
  }

  const [sitemapRes, robotsRes] = await Promise.allSettled([
    fetch(`${baseUrl}/sitemap.xml`, { method: 'HEAD', signal: AbortSignal.timeout(5000) }),
    fetch(`${baseUrl}/robots.txt`, { method: 'HEAD', signal: AbortSignal.timeout(5000) }),
  ])

  return {
    hasSitemap: sitemapRes.status === 'fulfilled' && sitemapRes.value.ok,
    hasRobotsTxt: robotsRes.status === 'fulfilled' && robotsRes.value.ok,
  }
}

// ═══════════════════════════════════════════════
// PageSpeed Insights — Google API
// ═══════════════════════════════════════════════

export async function analyzePageSpeed(
  url: string,
  apiKey: string | undefined,
): Promise<{ mobileScore: number | null; desktopScore: number | null }> {
  if (!apiKey) return { mobileScore: null, desktopScore: null }

  async function runStrategy(strategy: 'mobile' | 'desktop'): Promise<number | null> {
    try {
      const params = new URLSearchParams({
        url,
        key: apiKey!,
        strategy,
        category: 'performance',
      })

      const response = await fetch(`${PAGESPEED_URL}?${params}`, {
        signal: AbortSignal.timeout(60000),
      })

      if (!response.ok) return null
      const data = await response.json()
      const lighthouse = data?.lighthouseResult
      if (!lighthouse) return null

      return Math.round((lighthouse.categories?.performance?.score ?? 0) * 100)
    } catch {
      return null
    }
  }

  try {
    const mobileScore = await runStrategy('mobile')
    const desktopScore = await runStrategy('desktop')
    return { mobileScore, desktopScore }
  } catch {
    return { mobileScore: null, desktopScore: null }
  }
}

// ═══════════════════════════════════════════════
// Mozilla Observatory — security analysis
// ═══════════════════════════════════════════════

export async function analyzeObservatory(url: string): Promise<{ grade: string | null }> {
  try {
    const hostname = new URL(url).hostname

    const scanResponse = await fetch(
      `https://http-observatory.security.mozilla.org/api/v1/analyze?host=${hostname}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        signal: AbortSignal.timeout(10000),
      },
    )

    const data = await scanResponse.json()

    if (data.state === 'FINISHED' || data.state === 'ABORTED') {
      return { grade: data.grade || null }
    }

    // Wait and retry once if pending
    if (data.state === 'PENDING' || data.state === 'STARTING' || data.state === 'RUNNING') {
      await new Promise(r => setTimeout(r, 8000))

      const retryResponse = await fetch(
        `https://http-observatory.security.mozilla.org/api/v1/analyze?host=${hostname}`,
        { signal: AbortSignal.timeout(10000) },
      )

      const retryData = await retryResponse.json()
      if (retryData.state === 'FINISHED') {
        return { grade: retryData.grade || null }
      }
    }

    return { grade: null }
  } catch {
    return { grade: null }
  }
}

// ═══════════════════════════════════════════════
// SIRENE enrichment — recherche-entreprises API
// ═══════════════════════════════════════════════

export async function enrichWithSirene(companyName: string, city: string): Promise<SireneData | null> {
  try {
    const params = new URLSearchParams({
      q: companyName,
      commune: city,
      etat_administratif: 'A',
      per_page: '1',
    })

    const response = await fetch(`${SIRENE_URL}?${params}`, {
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) return null
    const data = await response.json()

    const results = data?.results
    if (!results || results.length === 0) return null

    const company = results[0]
    const siege = company.siege

    return {
      siret: siege?.siret || null,
      siren: company.siren || null,
      dateCreation: company.date_creation || null,
      statusActif: company.etat_administratif === 'A',
      effectif: company.tranche_effectif_salarie || null,
      codeNAF: company.activite_principale || null,
      libelleNAF: company.libelle_activite_principale || null,
      adresse: siege
        ? [siege.numero_voie, siege.type_voie, siege.libelle_voie, siege.code_postal, siege.libelle_commune]
            .filter(Boolean).join(' ')
        : null,
    }
  } catch {
    return null
  }
}

// ═══════════════════════════════════════════════
// Email extraction — homepage + /contact pages
// ═══════════════════════════════════════════════

export async function extractEmails(
  url: string,
  existingHtml?: string,
): Promise<{ emails: string[]; primaryEmail: string | null }> {
  let domain: string
  try {
    domain = new URL(url).hostname.replace('www.', '')
  } catch {
    return { emails: [], primaryEmail: null }
  }

  const allEmails = new Set<string>()

  // Extract from existing HTML (homepage already fetched by tech analyzer)
  if (existingHtml) {
    extractEmailsFromHtml(existingHtml, allEmails)
  }

  // Try contact pages
  const baseUrl = url.replace(/\/$/, '')
  for (const path of CONTACT_PATHS) {
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        headers: { 'User-Agent': USER_AGENT },
        signal: AbortSignal.timeout(8000),
        redirect: 'follow',
      })
      if (!res.ok) continue
      const html = await res.text()
      extractEmailsFromHtml(html, allEmails)
      if (allEmails.size > 0) break
    } catch { /* page doesn't exist, continue */ }
  }

  // Check MX record
  let hasMx = false
  try {
    const mxRecords = await dns.resolveMx(domain)
    hasMx = mxRecords.length > 0
  } catch { /* no MX */ }

  // Filter and rank
  const validEmails = [...allEmails].filter(email => {
    const emailDomain = email.split('@')[1]?.toLowerCase()
    if (!emailDomain) return false
    return !EMAIL_BLACKLIST.some(bl => emailDomain.includes(bl))
  })

  const sameDomain = validEmails.filter(e => e.endsWith(`@${domain}`))
  const contactEmail = sameDomain.find(e => /^(contact|info|hello|bonjour)@/i.test(e))
  const primaryEmail = contactEmail || sameDomain[0] || validEmails[0] || null

  // If no email found but domain has MX, suggest a generic one
  const finalPrimary = primaryEmail || (hasMx ? `contact@${domain}` : null)

  return { emails: validEmails, primaryEmail: finalPrimary }
}

function extractEmailsFromHtml(html: string, emails: Set<string>) {
  const decoded = html
    .replace(/&#64;/g, '@')
    .replace(/\[at\]/gi, '@')
    .replace(/\(at\)/gi, '@')
    .replace(/&#46;/g, '.')
    .replace(/\[dot\]/gi, '.')
    .replace(/\(dot\)/gi, '.')

  const matches = decoded.match(EMAIL_REGEX) || []
  for (const m of matches) {
    const email = m.toLowerCase().trim()
    if (email.endsWith('.png') || email.endsWith('.jpg') || email.endsWith('.gif') || email.endsWith('.svg')) continue
    if (email.endsWith('.css') || email.endsWith('.js')) continue
    emails.add(email)
  }

  const mailtoMatches = html.match(/mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/gi) || []
  for (const m of mailtoMatches) {
    const email = m.replace('mailto:', '').toLowerCase().trim()
    emails.add(email)
  }
}

// ═══════════════════════════════════════════════
// Social detection — find social links in HTML
// ═══════════════════════════════════════════════

export function detectSocial(html: string): { links: Record<string, string | null>; count: number } {
  const links: Record<string, string | null> = {
    facebook: null,
    instagram: null,
    linkedin: null,
    twitter: null,
    youtube: null,
    tiktok: null,
  }

  for (const { key, pattern } of SOCIAL_PATTERNS) {
    // Reset lastIndex for global regexes
    pattern.lastIndex = 0
    const matches = html.matchAll(pattern)
    for (const match of matches) {
      const link = match[1]
      if (link.includes('sharer') || link.includes('share') || link.includes('intent/tweet')) continue
      links[key] = link.replace(/[?#].*$/, '').replace(/\/+$/, '')
      break
    }
  }

  const count = Object.values(links).filter(Boolean).length
  return { links, count }
}

// ── Email Verification (SMTP) ──

async function checkMx(domain: string): Promise<string | null> {
  try {
    const records = await dns.resolveMx(domain)
    if (records.length === 0) return null
    records.sort((a, b) => a.priority - b.priority)
    return records[0].exchange
  } catch { return null }
}

function smtpVerify(email: string, mxHost: string): Promise<boolean | null> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => { socket.destroy(); resolve(null) }, 8000)
    const socket = net.createConnection(25, mxHost)
    let step = 0
    let buffer = ''
    socket.setEncoding('utf8')
    socket.on('data', (data: string) => {
      buffer += data
      if (!buffer.includes('\r\n')) return
      const lines = buffer.split('\r\n')
      buffer = lines.pop() || ''
      for (const line of lines) {
        const code = parseInt(line.slice(0, 3))
        if (isNaN(code)) continue
        if (step === 0 && code === 220) { socket.write('HELO prospector.local\r\n'); step = 1 }
        else if (step === 1 && code === 250) { socket.write('MAIL FROM:<verify@prospector.local>\r\n'); step = 2 }
        else if (step === 2 && code === 250) { socket.write(`RCPT TO:<${email}>\r\n`); step = 3 }
        else if (step === 3) {
          socket.write('QUIT\r\n'); clearTimeout(timeout); socket.destroy()
          resolve(code === 250 || code === 251 ? true : code >= 550 ? false : null)
          return
        }
      }
    })
    socket.on('error', () => { clearTimeout(timeout); resolve(null) })
  })
}

function generateEmailPatterns(firstName: string, lastName: string, domain: string): string[] {
  const fn = firstName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z]/g, '')
  const ln = lastName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z]/g, '')
  if (!fn || !ln) return [`contact@${domain}`]
  return [`${fn}.${ln}@${domain}`, `${fn[0]}.${ln}@${domain}`, `${fn}@${domain}`, `contact@${domain}`, `info@${domain}`]
}

export async function findBestEmail(
  domain: string | null,
  dirigeantName: string | null,
  extractedEmails: string[],
): Promise<{ email: string; confidence: 'high' | 'medium' | 'low' | 'unknown'; method: string }> {
  // 1. Try extracted emails
  for (const extracted of extractedEmails) {
    const d = extracted.split('@')[1]
    if (d) {
      const mx = await checkMx(d)
      if (mx) {
        const valid = await smtpVerify(extracted, mx)
        if (valid === true) return { email: extracted, confidence: 'high', method: 'extracted_verified' }
      }
    }
  }
  if (extractedEmails.length > 0) {
    const best = extractedEmails.find(e => /^(contact|info|hello)@/i.test(e)) || extractedEmails[0]
    return { email: best, confidence: 'medium', method: 'extracted' }
  }

  // 2. Pattern from dirigeant name
  if (domain && dirigeantName) {
    const parts = dirigeantName.trim().split(/\s+/)
    if (parts.length >= 2) {
      const patterns = generateEmailPatterns(parts[0], parts.slice(1).join(' '), domain)
      for (const p of patterns.slice(0, 3)) {
        const mx = await checkMx(domain)
        if (mx) {
          const valid = await smtpVerify(p, mx)
          if (valid === true) return { email: p, confidence: 'high', method: 'pattern_verified' }
        }
      }
      return { email: patterns[0], confidence: 'low', method: 'pattern_guess' }
    }
  }

  // 3. Fallback
  if (domain) return { email: `contact@${domain}`, confidence: 'low', method: 'fallback' }
  return { email: '', confidence: 'unknown', method: 'none' }
}

// ── W3C HTML Validator ──

export async function validateHtml(url: string): Promise<{ errorCount: number; warningCount: number; topErrors: string[] }> {
  try {
    const res = await fetch(`${W3C_URL}?doc=${encodeURIComponent(url)}&out=json`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JLStudio)' },
      signal: AbortSignal.timeout(20000),
    })
    const data = await res.json() as { messages?: Array<{ type: string; subType?: string; message?: string }> }
    const messages = data.messages || []
    let errorCount = 0, warningCount = 0
    const topErrors: string[] = []
    for (const msg of messages) {
      if (msg.type === 'error') { errorCount++; if (topErrors.length < 5) topErrors.push((msg.message || '').slice(0, 120)) }
      else if (msg.type === 'info' && msg.subType === 'warning') warningCount++
    }
    return { errorCount, warningCount, topErrors }
  } catch { return { errorCount: 0, warningCount: 0, topErrors: [] } }
}

// ── Yellow Lab Tools ──

export async function analyzeYellowLab(url: string): Promise<{ globalScore: number | null; topIssues: string[] }> {
  try {
    const startRes = await fetch(`${YELLOWLAB_URL}/runs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, waitForResponse: false }),
      signal: AbortSignal.timeout(10000),
    })
    const startData = await startRes.json() as { runId?: string }
    if (!startData.runId) return { globalScore: null, topIssues: [] }

    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 4000))
      try {
        const res = await fetch(`${YELLOWLAB_URL}/runs/${startData.runId}`, { signal: AbortSignal.timeout(10000) })
        const data = safeParseJson(YellowLabRunResponseSchema, await res.json())
        if (data?.status?.statusCode === 'running') continue
        if (data?.status?.statusCode === 'failed') return { globalScore: null, topIssues: [] }
        const scores = data?.scoreProfiles?.generic
        if (!scores) return { globalScore: null, topIssues: [] }
        const topIssues: string[] = []
        for (const cat of Object.values(scores.categories || {})) {
          for (const rule of Object.values(cat.rules || {})) {
            if (rule.bad && rule.policy?.label) topIssues.push(rule.policy.label)
          }
        }
        return { globalScore: scores.globalScore ?? null, topIssues: topIssues.slice(0, 5) }
      } catch { continue }
    }
    return { globalScore: null, topIssues: [] }
  } catch { return { globalScore: null, topIssues: [] } }
}

// ── Helpers ──

function extractCopyrightYear(html: string): number | null {
  const footerMatch = html.match(/<footer[\s\S]{0,5000}<\/footer>/i)
  const searchText = footerMatch ? footerMatch[0] : html.slice(-3000)

  const yearMatch = searchText.match(/(?:\u00A9|&copy;|copyright)\s*(\d{4})/i)
  if (yearMatch) {
    const year = parseInt(yearMatch[1], 10)
    if (year >= 2000 && year <= new Date().getFullYear()) return year
  }

  const genericMatch = searchText.match(/(?:\u00A9|&copy;)\s*(\d{4})/i)
  if (genericMatch) {
    const year = parseInt(genericMatch[1], 10)
    if (year >= 2000 && year <= new Date().getFullYear()) return year
  }

  return null
}
