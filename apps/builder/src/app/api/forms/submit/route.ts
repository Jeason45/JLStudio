import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@example.com'

// --- Captcha verification ---

async function verifyCaptcha(
  captchaType: string,
  token: string
): Promise<{ success: boolean; error?: string }> {
  if (captchaType === 'recaptcha-v2' || captchaType === 'recaptcha-v3') {
    const secret = process.env.RECAPTCHA_SECRET_KEY
    if (!secret) return { success: false, error: 'reCAPTCHA secret key not configured' }

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })
    const data = await res.json()

    if (!data.success) {
      return { success: false, error: 'reCAPTCHA verification failed' }
    }

    // For v3, check score (default threshold 0.5)
    if (captchaType === 'recaptcha-v3' && typeof data.score === 'number' && data.score < 0.5) {
      return { success: false, error: 'reCAPTCHA score too low' }
    }

    return { success: true }
  }

  if (captchaType === 'hcaptcha') {
    const secret = process.env.HCAPTCHA_SECRET_KEY
    if (!secret) return { success: false, error: 'hCaptcha secret key not configured' }

    const res = await fetch('https://api.hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })
    const data = await res.json()

    if (!data.success) {
      return { success: false, error: 'hCaptcha verification failed' }
    }

    return { success: true }
  }

  return { success: false, error: `Unknown captcha type: ${captchaType}` }
}

// --- Email notification ---

function buildFormNotificationHtml(formName: string, data: Record<string, string>): string {
  const rows = Object.entries(data)
    .filter(([key]) => !key.startsWith('_')) // Skip internal fields (_hp_field, _captcha_token, etc.)
    .map(([key, value]) => `<tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">${key}</td><td style="padding:6px 12px;border:1px solid #ddd">${value}</td></tr>`)
    .join('')

  return `
    <h2>Nouvelle soumission : ${formName}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px">
      <thead><tr><th style="padding:6px 12px;border:1px solid #ddd;text-align:left">Champ</th><th style="padding:6px 12px;border:1px solid #ddd;text-align:left">Valeur</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="color:#888;font-size:12px;margin-top:16px">Envoyé le ${new Date().toLocaleString('fr-FR')}</p>
  `
}

async function sendFormNotification(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.log(`[Email] Form notification → To: ${to}, Subject: ${subject}`)
    return
  }
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  }).catch((err) => console.error('[Email] Form notification error:', err))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { siteId, formName, data } = body as {
      siteId?: string
      formName?: string
      data?: Record<string, string>
    }

    if (!siteId || !data) {
      return NextResponse.json({ error: 'siteId et data requis' }, { status: 400 })
    }

    // Find or create form
    let form = await prisma.form.findFirst({
      where: { siteId, name: formName || 'form' },
    })

    if (!form) {
      form = await prisma.form.create({
        data: {
          siteId,
          name: formName || 'form',
          fields: [],
          settings: {},
        },
      })
    }

    // Check honeypot
    if (data._hp_field) {
      return NextResponse.json({ success: true, message: 'Merci !' })
    }

    // Captcha verification
    const settings = (form.settings as Record<string, unknown>) ?? {}
    const captchaType = settings.captchaType as string | undefined

    if (captchaType) {
      const captchaToken = data._captcha_token
      if (!captchaToken) {
        return NextResponse.json({ error: 'Captcha token manquant' }, { status: 400 })
      }

      const captchaResult = await verifyCaptcha(captchaType, captchaToken)
      if (!captchaResult.success) {
        return NextResponse.json(
          { error: captchaResult.error || 'Captcha verification failed' },
          { status: 400 }
        )
      }
    }

    // Extract email for contact creation
    const email = data.email || data.Email || data.EMAIL
    const createContact = settings.createContact as boolean

    let contactId: string | undefined

    if (email && createContact) {
      const existing = await prisma.contact.findUnique({
        where: { siteId_email: { siteId, email } },
      })

      if (existing) {
        contactId = existing.id
      } else {
        const name = data.name || data.Name || data.nom || ''
        const parts = name.split(' ')
        const contact = await prisma.contact.create({
          data: {
            siteId,
            email,
            firstName: parts[0] || undefined,
            lastName: parts.slice(1).join(' ') || undefined,
            phone: data.phone || data.Phone || data.telephone || undefined,
          },
        })
        contactId = contact.id
      }
    }

    // Create lead
    await prisma.lead.create({
      data: {
        siteId,
        formId: form.id,
        contactId: contactId || undefined,
        data,
        source: 'form',
        userAgent: request.headers.get('user-agent') || undefined,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      },
    })

    // Email notification (fire-and-forget)
    const emailNotification = settings.emailNotification as { enabled?: boolean; to?: string; subject?: string } | undefined
    if (emailNotification?.enabled && emailNotification?.to) {
      const notifSubject = emailNotification.subject || `New form submission: ${formName || 'form'}`
      const html = buildFormNotificationHtml(formName || 'form', data)
      sendFormNotification(emailNotification.to, notifSubject, html)
    }

    // Per-form webhook
    const webhookUrl = settings.webhookUrl as string | undefined
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formName, siteId, data, timestamp: new Date().toISOString() }),
      }).catch(() => {})
    }

    // Global site webhooks + Mailchimp/HubSpot integrations
    try {
      const site = await prisma.site.findUnique({ where: { id: siteId } })
      if (site?.config) {
        const siteConfig = site.config as unknown as import('@/types/site').SiteConfig

        // Webhooks (fire-and-forget)
        const { dispatchWebhook } = await import('@/lib/webhookDispatcher')
        dispatchWebhook(siteConfig, 'form.submit', { formName, siteId, data }).catch(() => {})

        const integrations = siteConfig.integrations

        // Mailchimp subscriber sync (fire-and-forget)
        if (email && integrations?.mailchimp?.apiKey && integrations.mailchimp.server && integrations.mailchimp.listId) {
          const { addSubscriber } = await import('@/lib/mailchimp')
          const mc = integrations.mailchimp
          const name = data.name || data.Name || data.nom || ''
          const parts = name.split(' ')
          addSubscriber(mc.apiKey, mc.server, mc.listId, email, parts[0] || undefined, parts.slice(1).join(' ') || undefined)
            .catch((err) => console.error('[Mailchimp] addSubscriber error:', err))
        }

        // HubSpot contact sync (fire-and-forget)
        if (email && integrations?.hubspot?.accessToken) {
          const { createOrUpdateContact } = await import('@/lib/hubspot')
          const name = data.name || data.Name || data.nom || ''
          const parts = name.split(' ')
          const props: Record<string, string> = {}
          if (parts[0]) props.firstname = parts[0]
          if (parts.slice(1).join(' ')) props.lastname = parts.slice(1).join(' ')
          if (data.phone || data.Phone || data.telephone) props.phone = data.phone || data.Phone || data.telephone
          if (data.company || data.Company || data.entreprise) props.company = data.company || data.Company || data.entreprise
          createOrUpdateContact(integrations.hubspot.accessToken, email, props)
            .catch((err) => console.error('[HubSpot] createOrUpdateContact error:', err))
        }
      }
    } catch { /* ignore */ }

    return NextResponse.json({
      success: true,
      message: (settings.successMessage as string) || 'Merci !',
    })
  } catch (error) {
    console.error('Form submit error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
