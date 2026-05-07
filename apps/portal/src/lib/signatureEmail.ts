/**
 * Envoie un email de demande de signature avec PDF en pièce jointe.
 * Utilisé par /api/portal/documents/[id]/sign-request et
 * /api/admin/documents/[id]/sign-request.
 */

import { prisma } from '@/lib/prisma';

interface SendSignatureRequestParams {
  siteId: string;
  to: string;
  recipientName: string;
  documentName: string;
  documentType: string;
  signLink: string;
  message?: string;
  pdfBuffer: Buffer;
  pdfFilename: string;
  companyName?: string;
}

const escape = (s: string) =>
  s.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function sendSignatureRequestEmail(params: SendSignatureRequestParams) {
  const {
    siteId, to, recipientName, documentName, documentType,
    signLink, message, pdfBuffer, pdfFilename, companyName,
  } = params;

  const fromName = companyName || 'JL Studio';
  const typeLabel = documentType === 'DEVIS' ? 'devis' : documentType === 'FACTURE' ? 'facture' : 'contrat';

  const nodemailer = await import('nodemailer');
  const SMTP_CONFIG = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER || '', pass: process.env.SMTP_PASSWORD || '' },
  };

  if (!SMTP_CONFIG.auth.user || !SMTP_CONFIG.auth.pass) {
    await prisma.portalMailLog.create({
      data: { siteId, to, subject: `Signature requise — ${documentName}`, status: 'failed', error: 'SMTP not configured' },
    });
    return { success: false, error: 'SMTP non configuré' };
  }

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background: #f4f4f4; }
  .wrapper { background: #fff; border-radius: 12px; overflow: hidden; margin: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
  .header { background: linear-gradient(135deg, #638BFF, #4a6fd4); color: #fff; padding: 32px 30px; }
  .header h1 { margin: 0 0 4px; font-size: 20px; }
  .header p { margin: 0; font-size: 13px; opacity: 0.85; }
  .content { padding: 30px; }
  .content p { margin: 0 0 14px; font-size: 14px; color: #374151; }
  .doc-box { background: #f8fafc; border-left: 4px solid #638BFF; padding: 16px 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
  .btn { display: inline-block; background: #638BFF; color: #fff !important; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; }
  .footer { text-align: center; padding: 16px 30px; border-top: 1px solid #f0f0f0; }
  .footer p { margin: 0; font-size: 11px; color: #94a3b8; }
</style></head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>${escape(fromName)}</h1>
      <p>Signature requise</p>
    </div>
    <div class="content">
      <p>Bonjour ${escape(recipientName)},</p>
      ${message ? `<p>${escape(message)}</p>` : `<p>Un ${escape(typeLabel)} necessitant votre signature vous a ete envoye.</p>`}
      <div class="doc-box">
        <p style="margin:0;font-weight:600;color:#1e293b;">${escape(documentName)}</p>
        <span style="font-size:12px;color:#64748b;">Document en piece jointe (PDF)</span>
      </div>
      <p>Veuillez cliquer sur le bouton ci-dessous pour signer electroniquement ce document :</p>
      <p style="text-align:center;margin:28px 0;"><a href="${signLink}" class="btn">Signer le document</a></p>
      <p style="font-size:12px;color:#94a3b8;">Lien valable 30 jours</p>
      <p>Cordialement,<br><strong>${escape(fromName)}</strong></p>
    </div>
    <div class="footer"><p>${escape(fromName)}</p></div>
  </div>
</body></html>`;

  try {
    const transporter = nodemailer.default.createTransport(SMTP_CONFIG);
    await transporter.sendMail({
      from: `"${fromName}" <${process.env.SMTP_FROM || SMTP_CONFIG.auth.user}>`,
      to: to.trim(),
      subject: `Signature requise — ${documentName}`,
      html,
      attachments: [{ filename: pdfFilename, content: pdfBuffer, contentType: 'application/pdf' }],
    });

    await prisma.portalMailLog.create({
      data: { siteId, to, subject: `Signature requise — ${documentName}`, status: 'sent', metadata: { documentName, signatureRequest: true } },
    });
    return { success: true };
  } catch (error) {
    await prisma.portalMailLog.create({
      data: { siteId, to, subject: `Signature requise — ${documentName}`, status: 'failed', error: error instanceof Error ? error.message : 'Unknown' },
    });
    return { success: false, error: error instanceof Error ? error.message : 'Erreur d\'envoi' };
  }
}
