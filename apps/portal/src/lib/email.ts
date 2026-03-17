import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
};

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport(SMTP_CONFIG);
  }
  return transporter;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface SendDocumentEmailParams {
  siteId: string;
  to: string;
  recipientName: string;
  documentName: string;
  documentType: string;
  message?: string;
  pdfBuffer: Buffer;
  pdfFilename: string;
  companyName?: string;
}

export async function sendDocumentEmail(params: SendDocumentEmailParams) {
  const { siteId, to, recipientName, documentName, documentType, message, pdfBuffer, pdfFilename, companyName } = params;

  const fromName = companyName || 'JL Studio';
  const typeLabel = documentType === 'DEVIS' ? 'devis' : documentType === 'FACTURE' ? 'facture' : 'contrat';

  if (!SMTP_CONFIG.auth.user || !SMTP_CONFIG.auth.pass) {
    await prisma.portalMailLog.create({
      data: {
        siteId,
        to,
        subject: `Votre ${typeLabel} — ${documentName}`,
        status: 'failed',
        error: 'SMTP not configured',
        metadata: { documentName, documentType },
      },
    });
    return { success: false, error: 'SMTP non configure. Ajoutez SMTP_HOST, SMTP_USER, SMTP_PASSWORD dans .env' };
  }

  const subject = `Votre ${typeLabel} — ${documentName}`;
  const htmlContent = generateDocumentEmailHTML({
    recipientName,
    documentName,
    typeLabel,
    message,
    fromName,
  });

  try {
    const info = await getTransporter().sendMail({
      from: `"${fromName}" <${process.env.SMTP_FROM || SMTP_CONFIG.auth.user}>`,
      to: to.trim(),
      subject,
      html: htmlContent,
      attachments: [{ filename: pdfFilename, content: pdfBuffer, contentType: 'application/pdf' }],
    });

    await prisma.portalMailLog.create({
      data: {
        siteId,
        to,
        subject,
        status: 'sent',
        metadata: { documentName, documentType, messageId: info.messageId },
      },
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await prisma.portalMailLog.create({
      data: {
        siteId,
        to,
        subject,
        status: 'failed',
        error: errorMessage,
        metadata: { documentName, documentType },
      },
    });
    return { success: false, error: errorMessage };
  }
}

function generateDocumentEmailHTML(params: {
  recipientName: string;
  documentName: string;
  typeLabel: string;
  message?: string;
  fromName: string;
}): string {
  const { recipientName, documentName, typeLabel, message, fromName } = params;
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background: #f4f4f4; }
  .wrapper { background: #ffffff; border-radius: 12px; overflow: hidden; margin: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
  .header { background: linear-gradient(135deg, #638BFF, #4a6fd4); color: #fff; padding: 32px 30px; }
  .header h1 { margin: 0 0 4px; font-size: 20px; font-weight: 600; }
  .header p { margin: 0; font-size: 13px; opacity: 0.85; }
  .content { padding: 30px; }
  .content p { margin: 0 0 14px; font-size: 14px; color: #374151; }
  .doc-box { background: #f8fafc; border-left: 4px solid #638BFF; padding: 16px 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
  .doc-box p { margin: 0; font-weight: 600; color: #1e293b; font-size: 14px; }
  .doc-box span { font-size: 12px; color: #64748b; font-weight: 400; }
  .footer { text-align: center; padding: 16px 30px; border-top: 1px solid #f0f0f0; }
  .footer p { margin: 0; font-size: 11px; color: #94a3b8; }
</style></head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>${escapeHtml(fromName)}</h1>
      <p>Nouveau ${escapeHtml(typeLabel)}</p>
    </div>
    <div class="content">
      <p>Bonjour ${escapeHtml(recipientName)},</p>
      ${message ? `<p>${escapeHtml(message)}</p>` : `<p>Veuillez trouver ci-joint votre ${escapeHtml(typeLabel)}.</p>`}
      <div class="doc-box">
        <p>${escapeHtml(documentName)}</p>
        <span>Document en piece jointe (PDF)</span>
      </div>
      <p>N'hesitez pas a nous contacter pour toute question.</p>
      <p>Cordialement,<br><strong>${escapeHtml(fromName)}</strong></p>
    </div>
    <div class="footer"><p>${escapeHtml(fromName)}</p></div>
  </div>
</body></html>`;
}
