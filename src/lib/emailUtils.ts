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

interface SendEmailParams {
  to: string;
  subject: string;
  htmlContent?: string;
  textContent?: string;
  type: string;
  contactId?: string;
  documentId?: string;
  attachments?: Array<{ filename: string; path?: string; content?: Buffer }>;
}

export async function sendEmail(params: SendEmailParams) {
  const { to, subject, htmlContent, textContent, type, contactId, documentId, attachments } = params;

  if (!SMTP_CONFIG.auth.user || !SMTP_CONFIG.auth.pass) {
    console.warn('SMTP not configured. Skipping email send.');
    await prisma.mailLog.create({
      data: {
        type, subject, to, htmlContent, textContent,
        ...(contactId ? { contact: { connect: { id: contactId } } } : {}),
        ...(documentId ? { document: { connect: { id: documentId } } } : {}),
        status: 'failed', error: 'SMTP not configured',
      },
    });
    return { success: false, error: 'SMTP not configured' };
  }

  try {
    const info = await getTransporter().sendMail({
      from: `"JL Studio" <${process.env.SMTP_FROM || SMTP_CONFIG.auth.user}>`,
      to, subject,
      html: htmlContent,
      text: textContent,
      attachments: attachments?.map(a => ({
        filename: a.filename,
        ...(a.content ? { content: a.content } : { path: a.path }),
      })),
    });

    await prisma.mailLog.create({
      data: {
        type, subject, to, htmlContent, textContent,
        ...(contactId ? { contact: { connect: { id: contactId } } } : {}),
        ...(documentId ? { document: { connect: { id: documentId } } } : {}),
        status: 'sent', sentAt: new Date(),
      },
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    await prisma.mailLog.create({
      data: {
        type, subject, to, htmlContent, textContent,
        ...(contactId ? { contact: { connect: { id: contactId } } } : {}),
        ...(documentId ? { document: { connect: { id: documentId } } } : {}),
        status: 'failed', error: error instanceof Error ? error.message : 'Unknown error',
      },
    });
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export function generateDocumentEmailHTML(params: {
  recipientName: string;
  documentName: string;
  message?: string;
  signatureLink?: string;
}): string {
  const { recipientName, documentName, message, signatureLink } = params;
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { background: linear-gradient(135deg, #638BFF, #4a6fd4); color: #fff; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
  .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
  .info-box { background: #fff; padding: 20px; border-left: 4px solid #638BFF; margin: 20px 0; }
  .btn { display: inline-block; background: #638BFF; color: #fff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; }
  .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
</style></head>
<body>
  <div class="header"><h1>JL Studio</h1><p>Document</p></div>
  <div class="content">
    <p>Bonjour ${recipientName},</p>
    ${message ? `<p>${message}</p>` : `<p>Veuillez trouver ci-joint le document <strong>${documentName}</strong>.</p>`}
    <div class="info-box"><p style="margin:0;font-weight:bold;">Document : ${documentName}</p></div>
    ${signatureLink ? `
      <p>Ce document requiert votre signature electronique :</p>
      <p style="text-align:center;margin:30px 0;"><a href="${signatureLink}" class="btn">Signer le document</a></p>
      <p style="font-size:12px;color:#94a3b8;">Lien valable 30 jours : ${signatureLink}</p>
    ` : `<p>Le document est en piece jointe.</p>`}
    <p>Cordialement,<br><strong>JL Studio</strong></p>
  </div>
  <div class="footer"><p>JL Studio - jlstudio.dev</p></div>
</body></html>`;
}

export function generateSignatureConfirmationHTML(params: {
  signerName: string;
  documentName: string;
  documentHash: string;
}): string {
  const { signerName, documentName, documentHash } = params;
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
  body { font-family: -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { background: linear-gradient(135deg, #638BFF, #4a6fd4); color: #fff; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
  .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
  .success-box { background: #fff; border-left: 4px solid #22c55e; padding: 15px 20px; margin: 20px 0; }
</style></head>
<body>
  <div class="header"><h1>Document Signe</h1><p>JL Studio</p></div>
  <div class="content">
    <p>Bonjour ${signerName},</p>
    <p>Votre signature electronique a ete enregistree avec succes.</p>
    <div class="success-box">
      <p style="margin:0;color:#059669;font-weight:bold;">Signature Certifiee</p>
      <p style="margin:5px 0 0;font-size:12px;color:#64748b;">Document : ${documentName}<br>Date : ${new Date().toLocaleString('fr-FR')}<br>Hash : ${documentHash.substring(0, 16)}...</p>
    </div>
    <p style="font-size:12px;color:#94a3b8;margin-top:30px;">Signature electronique simple avec preuve cryptographique.</p>
  </div>
</body></html>`;
}

export function generateSignatureAdminNotificationHTML(params: {
  documentName: string;
  signerName: string;
  signerEmail: string;
  ipAddress: string;
  documentHash: string;
}): string {
  const { documentName, signerName, signerEmail, ipAddress, documentHash } = params;
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
  body { font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { background: #1e293b; color: #fff; padding: 20px 30px; border-radius: 10px 10px 0 0; }
  .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
  .info-row { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
  .label { font-weight: bold; color: #475569; }
</style></head>
<body>
  <div class="header"><h2 style="margin:0;">Document Signe</h2></div>
  <div class="content">
    <div class="info-row"><span class="label">Document :</span> ${documentName}</div>
    <div class="info-row"><span class="label">Signe par :</span> ${signerName} (${signerEmail})</div>
    <div class="info-row"><span class="label">Date :</span> ${new Date().toLocaleString('fr-FR')}</div>
    <div class="info-row"><span class="label">IP :</span> ${ipAddress}</div>
    <div class="info-row"><span class="label">Hash :</span> <code style="font-size:11px;word-break:break-all;">${documentHash}</code></div>
    <p style="margin-top:20px;"><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3004'}/admin/documents" style="display:inline-block;background:#638BFF;color:#fff;padding:10px 24px;text-decoration:none;border-radius:5px;font-weight:bold;">Voir les documents</a></p>
  </div>
</body></html>`;
}
