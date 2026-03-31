import dns from 'dns/promises'
import net from 'net'

export interface EmailVerification {
  email: string
  hasMx: boolean
  smtpValid: boolean | null  // null = couldn't verify (timeout, blocked)
  confidence: 'high' | 'medium' | 'low' | 'unknown'
}

// Check if a domain has MX records (can receive emails)
async function checkMx(domain: string): Promise<string | null> {
  try {
    const records = await dns.resolveMx(domain)
    if (records.length === 0) return null
    // Return highest priority MX server
    records.sort((a, b) => a.priority - b.priority)
    return records[0].exchange
  } catch {
    return null
  }
}

// Verify email exists via SMTP RCPT TO (without sending an email)
async function smtpVerify(email: string, mxHost: string): Promise<boolean | null> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      socket.destroy()
      resolve(null) // timeout = can't verify
    }, 8000)

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

        if (step === 0 && code === 220) {
          // Server greeting → send HELO
          socket.write('HELO prospector.local\r\n')
          step = 1
        } else if (step === 1 && code === 250) {
          // HELO accepted → send MAIL FROM
          socket.write('MAIL FROM:<verify@prospector.local>\r\n')
          step = 2
        } else if (step === 2 && code === 250) {
          // MAIL FROM accepted → send RCPT TO (the actual check)
          socket.write(`RCPT TO:<${email}>\r\n`)
          step = 3
        } else if (step === 3) {
          // RCPT TO response
          socket.write('QUIT\r\n')
          clearTimeout(timeout)
          socket.destroy()
          if (code === 250 || code === 251) {
            resolve(true)  // email exists
          } else if (code === 550 || code === 551 || code === 553) {
            resolve(false) // email doesn't exist
          } else {
            resolve(null)  // can't determine (greylisting, catch-all, etc.)
          }
          return
        }
      }
    })

    socket.on('error', () => {
      clearTimeout(timeout)
      resolve(null) // connection error
    })

    socket.on('timeout', () => {
      clearTimeout(timeout)
      socket.destroy()
      resolve(null)
    })
  })
}

// Generate email patterns from name and domain
export function generateEmailPatterns(firstName: string, lastName: string, domain: string): string[] {
  const fn = firstName.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '')
  const ln = lastName.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '')

  if (!fn || !ln) return [`contact@${domain}`]

  return [
    `${fn}.${ln}@${domain}`,        // jean.dupont@
    `${fn[0]}.${ln}@${domain}`,     // j.dupont@
    `${fn}@${domain}`,               // jean@
    `${fn}${ln}@${domain}`,          // jeandupont@
    `${fn[0]}${ln}@${domain}`,       // jdupont@
    `contact@${domain}`,
    `info@${domain}`,
  ]
}

// Parse dirigeant name into first/last name
export function parseDirigeantName(fullName: string): { firstName: string; lastName: string } | null {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length < 2) return null
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  }
}

// Main verification: check email via MX + SMTP
export async function verifyEmail(email: string): Promise<EmailVerification> {
  const domain = email.split('@')[1]
  if (!domain) {
    return { email, hasMx: false, smtpValid: null, confidence: 'unknown' }
  }

  const mxHost = await checkMx(domain)
  if (!mxHost) {
    return { email, hasMx: false, smtpValid: null, confidence: 'low' }
  }

  const smtpValid = await smtpVerify(email, mxHost)

  let confidence: EmailVerification['confidence']
  if (smtpValid === true) confidence = 'high'
  else if (smtpValid === false) confidence = 'low'
  else confidence = 'medium' // has MX but SMTP inconclusive

  return { email, hasMx: true, smtpValid, confidence }
}

// Find the best email for a prospect
export async function findBestEmail(
  domain: string | null,
  dirigeantName: string | null,
  extractedEmails: string[],
): Promise<{ email: string; confidence: EmailVerification['confidence']; method: string }> {
  // 1. Try extracted emails first (from website)
  for (const extracted of extractedEmails) {
    const verification = await verifyEmail(extracted)
    if (verification.confidence === 'high') {
      return { email: extracted, confidence: 'high', method: 'extracted_verified' }
    }
  }

  // Return best extracted email even without SMTP verification
  if (extractedEmails.length > 0) {
    const best = extractedEmails.find(e => /^(contact|info|hello)@/i.test(e)) || extractedEmails[0]
    return { email: best, confidence: 'medium', method: 'extracted' }
  }

  // 2. Generate patterns from dirigeant name + domain
  if (domain && dirigeantName) {
    const parsed = parseDirigeantName(dirigeantName)
    if (parsed) {
      const patterns = generateEmailPatterns(parsed.firstName, parsed.lastName, domain)
      for (const pattern of patterns.slice(0, 3)) { // only check top 3 to avoid spam
        const verification = await verifyEmail(pattern)
        if (verification.confidence === 'high') {
          return { email: pattern, confidence: 'high', method: 'pattern_verified' }
        }
      }
      // Return first pattern as guess
      return { email: patterns[0], confidence: 'low', method: 'pattern_guess' }
    }
  }

  // 3. Fallback to contact@domain
  if (domain) {
    const fallback = `contact@${domain}`
    const verification = await verifyEmail(fallback)
    return { email: fallback, confidence: verification.confidence, method: 'fallback' }
  }

  return { email: '', confidence: 'unknown', method: 'none' }
}
