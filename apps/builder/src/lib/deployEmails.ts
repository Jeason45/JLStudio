const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@jlstudio.dev'
const NOTIFY_EMAIL = process.env.DEPLOY_NOTIFY_EMAIL || ''

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.log(`[Deploy Email] To: ${to}, Subject: ${subject}`)
    return
  }
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  })
}

export async function sendDeployNotification(
  siteName: string,
  siteSlug: string,
  deployUrl: string,
  pagesExported: number,
  duration: number,
) {
  if (!NOTIFY_EMAIL) return

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f4f4f5; padding: 40px 20px;">
  <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <h1 style="font-size: 20px; color: #18181b; margin: 0 0 8px;">Site publié</h1>
    <p style="color: #71717a; font-size: 14px; margin: 0 0 24px;">Le site <strong>${siteName}</strong> a été déployé avec succès.</p>

    <div style="background: #f4f4f5; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-size: 13px; color: #71717a;">URL</p>
      <a href="${deployUrl}" style="color: #2563eb; font-size: 14px; text-decoration: none;">${deployUrl}</a>
    </div>

    <table style="width: 100%; font-size: 13px; color: #52525b;">
      <tr>
        <td style="padding: 4px 0;">Pages exportées</td>
        <td style="padding: 4px 0; text-align: right; font-weight: 600;">${pagesExported}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0;">Durée</td>
        <td style="padding: 4px 0; text-align: right; font-weight: 600;">${(duration / 1000).toFixed(1)}s</td>
      </tr>
      <tr>
        <td style="padding: 4px 0;">Slug</td>
        <td style="padding: 4px 0; text-align: right; font-weight: 600;">${siteSlug}</td>
      </tr>
    </table>
  </div>
</body>
</html>`

  await sendEmail(NOTIFY_EMAIL, `[JL Studio] ${siteName} publié`, html)
}
