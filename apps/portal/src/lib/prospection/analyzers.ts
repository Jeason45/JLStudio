import dns from 'dns/promises'
import type { SiteAnalysis, SireneData } from './types'

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
const HTTP_TIMEOUT = 15000
const PAGESPEED_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const SIRENE_URL = 'https://recherche-entreprises.api.gouv.fr/search'

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
