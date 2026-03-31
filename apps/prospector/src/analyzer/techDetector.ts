import axios from 'axios'
import { config } from '../config.js'
import type { SiteAnalysis } from './types.js'

type TechResult = Pick<SiteAnalysis,
  'isHttps' | 'isResponsive' | 'cmsDetected' | 'estimatedAge' | 'loadTimeMs' | 'pageSizeKB' |
  'hasAnalytics' | 'hasFavicon' | 'hasMetaDescription' | 'hasOpenGraph' |
  'usesJquery' | 'usesFlash' | 'hasObsoleteTags' | 'usesModernImages' |
  'internalLinkCount' | 'redirectCount'
>

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

export async function analyzeTech(url: string): Promise<TechResult> {
  const start = Date.now()
  const defaults: TechResult = {
    isHttps: url.startsWith('https://'),
    isResponsive: false,
    cmsDetected: null,
    estimatedAge: null,
    loadTimeMs: null,
    pageSizeKB: null,
    hasAnalytics: false,
    hasFavicon: false,
    hasMetaDescription: false,
    hasOpenGraph: false,
    usesJquery: false,
    usesFlash: false,
    hasObsoleteTags: false,
    usesModernImages: false,
    internalLinkCount: 0,
    redirectCount: 0,
  }

  try {
    const response = await axios.get(url, {
      timeout: config.httpTimeoutMs,
      maxRedirects: 10,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html',
      },
      maxContentLength: 200_000,
    })

    const loadTimeMs = Date.now() - start
    const html = typeof response.data === 'string' ? response.data : ''
    const headers = response.headers
    const finalUrl = response.request?.res?.responseUrl || url

    // Count redirects
    const redirectCount = response.request?.res?.redirects?.length ?? (finalUrl !== url ? 1 : 0)

    // HTTPS
    const isHttps = finalUrl.startsWith('https://')

    // Page size
    const pageSizeKB = Math.round(Buffer.byteLength(html, 'utf8') / 1024)

    // Responsive (viewport meta tag)
    const isResponsive = /meta\s[^>]*name=["']viewport["']/i.test(html)

    // CMS detection
    const headerStr = Object.entries(headers).map(([k, v]) => `${k}: ${v}`).join('\n')
    const combined = html + '\n' + headerStr
    let cmsDetected: string | null = null
    for (const { pattern, name } of CMS_PATTERNS) {
      if (pattern.test(combined)) {
        cmsDetected = name
        break
      }
    }

    // Analytics detection
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
    try {
      const hostname = new URL(finalUrl).hostname
      const linkMatches = html.match(/<a\s[^>]*href=["'][^"']*["']/gi) || []
      const internalLinkCount = linkMatches.filter(l => {
        const href = l.match(/href=["']([^"']*)["']/)?.[1] || ''
        if (href.startsWith('/') || href.startsWith('#')) return true
        try { return new URL(href).hostname === hostname } catch { return false }
      }).length
      defaults.internalLinkCount = internalLinkCount
    } catch { /* ignore */ }

    // Copyright year
    const estimatedAge = extractCopyrightYear(html)

    return {
      isHttps,
      isResponsive,
      cmsDetected,
      estimatedAge,
      loadTimeMs,
      pageSizeKB,
      hasAnalytics,
      hasFavicon,
      hasMetaDescription,
      hasOpenGraph,
      usesJquery,
      usesFlash,
      hasObsoleteTags,
      usesModernImages,
      internalLinkCount: defaults.internalLinkCount,
      redirectCount,
    }
  } catch {
    return { ...defaults, loadTimeMs: Date.now() - start }
  }
}

// Check sitemap.xml and robots.txt existence
export async function checkSeoFiles(url: string): Promise<{ hasSitemap: boolean; hasRobotsTxt: boolean }> {
  let baseUrl: string
  try {
    const u = new URL(url)
    baseUrl = `${u.protocol}//${u.hostname}`
  } catch {
    return { hasSitemap: false, hasRobotsTxt: false }
  }

  const [sitemapRes, robotsRes] = await Promise.allSettled([
    axios.head(`${baseUrl}/sitemap.xml`, { timeout: 5000, maxRedirects: 3 }),
    axios.head(`${baseUrl}/robots.txt`, { timeout: 5000, maxRedirects: 3 }),
  ])

  return {
    hasSitemap: sitemapRes.status === 'fulfilled' && sitemapRes.value.status === 200,
    hasRobotsTxt: robotsRes.status === 'fulfilled' && robotsRes.value.status === 200,
  }
}

function extractCopyrightYear(html: string): number | null {
  const footerMatch = html.match(/<footer[\s\S]{0,5000}<\/footer>/i)
  const searchText = footerMatch ? footerMatch[0] : html.slice(-3000)

  const yearMatch = searchText.match(/(?:©|&copy;|copyright)\s*(\d{4})/i)
  if (yearMatch) {
    const year = parseInt(yearMatch[1], 10)
    if (year >= 2000 && year <= new Date().getFullYear()) return year
  }

  const genericMatch = searchText.match(/(?:©|&copy;)\s*(\d{4})/i)
  if (genericMatch) {
    const year = parseInt(genericMatch[1], 10)
    if (year >= 2000 && year <= new Date().getFullYear()) return year
  }

  return null
}
