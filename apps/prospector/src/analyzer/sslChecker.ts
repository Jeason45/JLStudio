import https from 'https'
import tls from 'tls'

export interface SSLResult {
  isValid: boolean
  issuer: string | null
  expiresAt: string | null          // ISO date
  daysUntilExpiry: number | null
  protocol: string | null           // TLSv1.2, TLSv1.3
  isExpiringSoon: boolean            // < 30 days
}

export interface SecurityHeadersResult {
  strictTransportSecurity: boolean   // HSTS
  contentSecurityPolicy: boolean     // CSP
  xFrameOptions: boolean
  xContentTypeOptions: boolean
  referrerPolicy: boolean
  permissionsPolicy: boolean
  score: number                      // 0-6 (how many headers present)
  total: number
}

export async function checkSSL(url: string): Promise<SSLResult> {
  const result: SSLResult = {
    isValid: false, issuer: null, expiresAt: null,
    daysUntilExpiry: null, protocol: null, isExpiringSoon: false,
  }

  if (!url.startsWith('https://')) return result

  try {
    const hostname = new URL(url).hostname
    const cert = await getCertificate(hostname)
    if (!cert) return result

    result.isValid = true
    result.issuer = cert.issuer || null
    result.expiresAt = cert.validTo || null
    result.protocol = cert.protocol || null

    if (cert.validTo) {
      const expiry = new Date(cert.validTo)
      const now = new Date()
      result.daysUntilExpiry = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      result.isExpiringSoon = result.daysUntilExpiry < 30
    }

    return result
  } catch {
    return result
  }
}

function getCertificate(hostname: string): Promise<{ issuer: string; validTo: string; protocol: string } | null> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(null), 8000)

    try {
      const socket = tls.connect(443, hostname, { servername: hostname, rejectUnauthorized: false }, () => {
        clearTimeout(timeout)
        const cert = socket.getPeerCertificate()
        const protocol = socket.getProtocol() || 'unknown'
        socket.destroy()

        if (!cert || !cert.valid_to) {
          resolve(null)
          return
        }

        const issuerO = cert.issuer?.O
        const issuer = Array.isArray(issuerO) ? issuerO[0] : (issuerO || cert.issuer?.CN || 'Unknown')

        resolve({
          issuer: String(issuer),
          validTo: cert.valid_to,
          protocol,
        })
      })

      socket.on('error', () => { clearTimeout(timeout); resolve(null) })
    } catch {
      clearTimeout(timeout)
      resolve(null)
    }
  })
}

export async function checkSecurityHeaders(url: string): Promise<SecurityHeadersResult> {
  const result: SecurityHeadersResult = {
    strictTransportSecurity: false,
    contentSecurityPolicy: false,
    xFrameOptions: false,
    xContentTypeOptions: false,
    referrerPolicy: false,
    permissionsPolicy: false,
    score: 0,
    total: 6,
  }

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
    })

    const headers = response.headers

    result.strictTransportSecurity = !!headers.get('strict-transport-security')
    result.contentSecurityPolicy = !!headers.get('content-security-policy')
    result.xFrameOptions = !!headers.get('x-frame-options')
    result.xContentTypeOptions = !!headers.get('x-content-type-options')
    result.referrerPolicy = !!headers.get('referrer-policy')
    result.permissionsPolicy = !!headers.get('permissions-policy')

    result.score = [
      result.strictTransportSecurity,
      result.contentSecurityPolicy,
      result.xFrameOptions,
      result.xContentTypeOptions,
      result.referrerPolicy,
      result.permissionsPolicy,
    ].filter(Boolean).length

    return result
  } catch {
    return result
  }
}
