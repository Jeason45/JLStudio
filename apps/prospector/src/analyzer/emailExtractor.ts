import axios from 'axios'
import { config } from '../config.js'
import dns from 'dns/promises'

export interface EmailResult {
  emails: string[]           // emails found on the site
  hasMxRecord: boolean       // domain can receive emails
  primaryEmail: string | null // best guess for contact email
}

const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g

// Common false positives to filter out
const BLACKLIST = [
  'wixpress.com', 'sentry.io', 'example.com', 'domain.com',
  'email.com', 'yoursite.com', 'wordpress.org', 'w3.org',
  'schema.org', 'googleapis.com', 'google.com', 'facebook.com',
  'twitter.com', 'instagram.com', 'jquery.com', 'cloudflare.com',
]

// Pages most likely to contain contact emails
const CONTACT_PATHS = ['/contact', '/nous-contacter', '/contactez-nous', '/mentions-legales', '/a-propos', '/about']

export async function extractEmails(url: string): Promise<EmailResult> {
  const result: EmailResult = { emails: [], hasMxRecord: false, primaryEmail: null }

  let domain: string
  try {
    domain = new URL(url).hostname.replace('www.', '')
  } catch {
    return result
  }

  // 1. Check MX record (can the domain receive emails?)
  try {
    const mxRecords = await dns.resolveMx(domain)
    result.hasMxRecord = mxRecords.length > 0
  } catch {
    result.hasMxRecord = false
  }

  // 2. Extract emails from homepage (we likely already fetched it, but this is separate)
  const allEmails = new Set<string>()

  // Fetch homepage
  try {
    const res = await axios.get(url, {
      timeout: config.httpTimeoutMs,
      maxContentLength: 200_000,
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
    })
    const html = typeof res.data === 'string' ? res.data : ''
    extractEmailsFromHtml(html, allEmails)
  } catch { /* homepage might already be fetched by techDetector */ }

  // 3. Try contact pages
  const baseUrl = url.replace(/\/$/, '')
  for (const path of CONTACT_PATHS) {
    try {
      const res = await axios.get(`${baseUrl}${path}`, {
        timeout: 8000,
        maxContentLength: 200_000,
        maxRedirects: 3,
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
        validateStatus: (s) => s === 200,
      })
      const html = typeof res.data === 'string' ? res.data : ''
      extractEmailsFromHtml(html, allEmails)
      if (allEmails.size > 0) break  // found emails, stop
    } catch { /* page doesn't exist, continue */ }
  }

  // 4. Filter and rank emails
  const validEmails = [...allEmails].filter(email => {
    const emailDomain = email.split('@')[1]?.toLowerCase()
    if (!emailDomain) return false
    if (BLACKLIST.some(bl => emailDomain.includes(bl))) return false
    // Prefer emails from the same domain
    return true
  })

  result.emails = validEmails

  // Pick primary email: prefer contact@, info@, or same-domain emails
  const sameDomain = validEmails.filter(e => e.endsWith(`@${domain}`))
  const contactEmail = sameDomain.find(e => /^(contact|info|hello|bonjour)@/i.test(e))
  result.primaryEmail = contactEmail || sameDomain[0] || validEmails[0] || null

  return result
}

function extractEmailsFromHtml(html: string, emails: Set<string>) {
  // Decode HTML entities
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
    // Skip image filenames and CSS
    if (email.endsWith('.png') || email.endsWith('.jpg') || email.endsWith('.gif') || email.endsWith('.svg')) continue
    if (email.endsWith('.css') || email.endsWith('.js')) continue
    emails.add(email)
  }

  // Also check mailto: links
  const mailtoMatches = html.match(/mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/gi) || []
  for (const m of mailtoMatches) {
    const email = m.replace('mailto:', '').toLowerCase().trim()
    emails.add(email)
  }
}
