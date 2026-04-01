import tls from 'tls'

// ── PageSpeed Full Audit (4 categories) ──

const PAGESPEED_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'

export interface PageSpeedAudit {
  id: string; title: string; score: number | null; displayValue: string | null
}

export interface FullPageSpeedResult {
  mobileScore: number | null; mobileAccessibility: number | null; mobileSEO: number | null; mobileBestPractices: number | null
  desktopScore: number | null
  mobileFCP: number | null; mobileLCP: number | null; mobileTBT: number | null; mobileCLS: number | null; mobileSI: number | null
  mobilePerformanceAudits: PageSpeedAudit[]; mobileAccessibilityAudits: PageSpeedAudit[]
  mobileSEOAudits: PageSpeedAudit[]; mobileBestPracticesAudits: PageSpeedAudit[]
  totalByteWeight: number | null; totalRequestCount: number | null
  heaviestResources: Array<{ url: string; size: number }>
  mobileScreenshot: string | null
}

export async function analyzePageSpeedFull(url: string, apiKey: string): Promise<FullPageSpeedResult | null> {
  try {
    const [mobileRes, desktopRes] = await Promise.all([
      fetch(`${PAGESPEED_URL}?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=mobile&category=performance&category=accessibility&category=seo&category=best-practices`, { signal: AbortSignal.timeout(45000) }),
      fetch(`${PAGESPEED_URL}?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=desktop&category=performance`, { signal: AbortSignal.timeout(45000) }),
    ])
    const mobile = (await mobileRes.json()) as any
    const desktop = (await desktopRes.json()) as any

    const ml = mobile?.lighthouseResult
    const dl = desktop?.lighthouseResult
    if (!ml) return null

    const ma = ml.audits || {}
    const mc = ml.categories || {}

    function extractFailed(audits: any, ids: string[]): PageSpeedAudit[] {
      return ids.map(id => audits[id]).filter(a => a && a.score !== null && a.score < 1).map(a => ({
        id: a.id, title: a.title || a.id, score: a.score, displayValue: a.displayValue || null,
      }))
    }

    const perfIds = ['render-blocking-resources','unused-css-rules','unused-javascript','modern-image-formats','offscreen-images','uses-optimized-images','uses-text-compression','server-response-time','dom-size','legacy-javascript','total-byte-weight','mainthread-work-breakdown','bootup-time','long-tasks']
    const a11yIds = ['color-contrast','document-title','html-has-lang','image-alt','label','link-name','meta-viewport','heading-order','button-name']
    const seoIds = ['meta-description','document-title','http-status-code','link-text','is-crawlable','robots-txt','canonical','tap-targets','font-size']
    const bpIds = ['is-on-https','errors-in-console','deprecations','image-aspect-ratio','doctype','charset','csp-xss']

    return {
      mobileScore: mc.performance?.score != null ? Math.round(mc.performance.score * 100) : null,
      mobileAccessibility: mc.accessibility?.score != null ? Math.round(mc.accessibility.score * 100) : null,
      mobileSEO: mc.seo?.score != null ? Math.round(mc.seo.score * 100) : null,
      mobileBestPractices: mc['best-practices']?.score != null ? Math.round(mc['best-practices'].score * 100) : null,
      desktopScore: dl?.categories?.performance?.score != null ? Math.round(dl.categories.performance.score * 100) : null,
      mobileFCP: ma['first-contentful-paint']?.numericValue ?? null,
      mobileLCP: ma['largest-contentful-paint']?.numericValue ?? null,
      mobileTBT: ma['total-blocking-time']?.numericValue ?? null,
      mobileCLS: ma['cumulative-layout-shift']?.numericValue ?? null,
      mobileSI: ma['speed-index']?.numericValue ?? null,
      mobilePerformanceAudits: extractFailed(ma, perfIds),
      mobileAccessibilityAudits: extractFailed(ma, a11yIds),
      mobileSEOAudits: extractFailed(ma, seoIds),
      mobileBestPracticesAudits: extractFailed(ma, bpIds),
      totalByteWeight: ma['total-byte-weight']?.numericValue ?? null,
      totalRequestCount: ma['resource-summary']?.details?.items?.reduce((s: number, r: any) => s + (r.requestCount || 0), 0) ?? null,
      heaviestResources: (ma['network-requests']?.details?.items || []).filter((r: any) => r.transferSize > 0).sort((a: any, b: any) => b.transferSize - a.transferSize).slice(0, 10).map((r: any) => ({ url: (r.url || '').slice(0, 120), size: r.transferSize })),
      mobileScreenshot: ma['final-screenshot']?.details?.data || null,
    }
  } catch { return null }
}

// ── SSL Certificate Check ──

export interface SSLResult {
  isValid: boolean
  issuer: string | null
  expiresAt: string | null
  daysUntilExpiry: number | null
  protocol: string | null
  isExpiringSoon: boolean
}

export async function checkSSL(url: string): Promise<SSLResult> {
  const result: SSLResult = { isValid: false, issuer: null, expiresAt: null, daysUntilExpiry: null, protocol: null, isExpiringSoon: false }
  if (!url.startsWith('https://')) return result

  try {
    const hostname = new URL(url).hostname
    const certData = await new Promise<{ issuer: string; validTo: string; protocol: string } | null>((resolve) => {
      const timeout = setTimeout(() => resolve(null), 8000)
      try {
        const socket = tls.connect(443, hostname, { servername: hostname, rejectUnauthorized: false }, () => {
          clearTimeout(timeout)
          const cert = socket.getPeerCertificate()
          const protocol = socket.getProtocol() || 'unknown'
          socket.destroy()
          if (!cert?.valid_to) { resolve(null); return }
          const issuerO = cert.issuer?.O
          const issuer = Array.isArray(issuerO) ? issuerO[0] : (issuerO || cert.issuer?.CN || 'Unknown')
          resolve({ issuer: String(issuer), validTo: cert.valid_to, protocol })
        })
        socket.on('error', () => { clearTimeout(timeout); resolve(null) })
      } catch { clearTimeout(timeout); resolve(null) }
    })

    if (!certData) return result
    result.isValid = true
    result.issuer = certData.issuer
    result.expiresAt = certData.validTo
    result.protocol = certData.protocol
    const expiry = new Date(certData.validTo)
    result.daysUntilExpiry = Math.floor((expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    result.isExpiringSoon = result.daysUntilExpiry < 30
    return result
  } catch { return result }
}

// ── Security Headers ──

export interface SecurityHeadersResult {
  strictTransportSecurity: boolean
  contentSecurityPolicy: boolean
  xFrameOptions: boolean
  xContentTypeOptions: boolean
  referrerPolicy: boolean
  permissionsPolicy: boolean
  score: number
  total: number
}

export async function checkSecurityHeaders(url: string): Promise<SecurityHeadersResult> {
  const result: SecurityHeadersResult = {
    strictTransportSecurity: false, contentSecurityPolicy: false, xFrameOptions: false,
    xContentTypeOptions: false, referrerPolicy: false, permissionsPolicy: false, score: 0, total: 6,
  }
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(10000) })
    const h = res.headers
    result.strictTransportSecurity = !!h.get('strict-transport-security')
    result.contentSecurityPolicy = !!h.get('content-security-policy')
    result.xFrameOptions = !!h.get('x-frame-options')
    result.xContentTypeOptions = !!h.get('x-content-type-options')
    result.referrerPolicy = !!h.get('referrer-policy')
    result.permissionsPolicy = !!h.get('permissions-policy')
    result.score = [result.strictTransportSecurity, result.contentSecurityPolicy, result.xFrameOptions, result.xContentTypeOptions, result.referrerPolicy, result.permissionsPolicy].filter(Boolean).length
    return result
  } catch { return result }
}

// ── Carbon Footprint ──

export interface CarbonResult {
  isGreen: boolean
  co2PerView: number | null
  cleanerThan: number | null
  rating: string | null
}

export async function checkCarbon(url: string): Promise<CarbonResult> {
  const result: CarbonResult = { isGreen: false, co2PerView: null, cleanerThan: null, rating: null }
  try {
    const res = await fetch(`https://api.websitecarbon.com/site?url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(15000) })
    const data = await res.json() as any
    if (!data) return result
    result.isGreen = data.green === true || data.green === 'true'
    result.co2PerView = data.statistics?.co2?.grid?.grams ?? null
    result.cleanerThan = data.cleanerThan != null ? Math.round(data.cleanerThan * 100) : null
    if (result.co2PerView !== null) {
      if (result.co2PerView < 0.15) result.rating = 'A'
      else if (result.co2PerView < 0.34) result.rating = 'B'
      else if (result.co2PerView < 0.73) result.rating = 'C'
      else if (result.co2PerView < 1.17) result.rating = 'D'
      else if (result.co2PerView < 2.0) result.rating = 'E'
      else result.rating = 'F'
    }
    return result
  } catch { return result }
}
