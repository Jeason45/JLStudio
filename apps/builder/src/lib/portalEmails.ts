const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@jlstudio.dev'

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.log(`[Portal Email] To: ${to}, Subject: ${subject}`)
    console.log(`[Portal Email] HTML: ${html}`)
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

export async function sendPortalInvitation(
  to: string,
  siteName: string,
  inviteUrl: string,
) {
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f4f4f5; padding: 40px 20px;">
  <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <h1 style="font-size: 20px; color: #18181b; margin: 0 0 8px;">Bienvenue sur votre espace client</h1>
    <p style="font-size: 14px; color: #71717a; margin: 0 0 24px;">
      Votre portail pour <strong style="color: #18181b;">${siteName}</strong> est pret.
    </p>
    <p style="font-size: 14px; color: #52525b; margin: 0 0 24px;">
      Cliquez sur le bouton ci-dessous pour definir votre mot de passe et acceder a votre espace.
    </p>
    <a href="${inviteUrl}" style="display: inline-block; padding: 12px 24px; background: #4668e5; color: white; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500;">
      Activer mon compte
    </a>
    <p style="font-size: 12px; color: #a1a1aa; margin: 24px 0 0;">
      Ce lien expire dans 7 jours. Si vous n'avez pas demande cet acces, ignorez cet email.
    </p>
  </div>
</body>
</html>`

  await sendEmail(to, `Votre espace client — ${siteName}`, html)
}
