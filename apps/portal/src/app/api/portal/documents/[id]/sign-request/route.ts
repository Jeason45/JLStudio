import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId, extractUserRole } from '@/lib/auth';
import { logActivity } from '@/lib/activity';
import { generateToken } from '@/lib/signatureUtils';
import { sendDocumentEmail } from '@/lib/email';
import { generateDocumentPDF } from '@/lib/pdfGenerator';
import type { DocumentData, CompanySettingsData } from '@/types/portal';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Email invalide'),
  recipientName: z.string().min(1, 'Nom requis'),
  message: z.string().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const role = extractUserRole(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  if (role === 'CLIENT') return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }
  const { email, recipientName, message } = parsed.data;

  // Fetch document
  const document = await prisma.portalDocument.findFirst({
    where: { id, siteId },
    include: {
      contact: { select: { id: true, firstName: true, lastName: true, email: true, company: true } },
      signature: true,
    },
  });
  if (!document) return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });

  if (document.signature) {
    return NextResponse.json({ error: 'Ce document a deja ete signe' }, { status: 409 });
  }

  // Create signature request (token valid 30 days)
  const token = generateToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await prisma.portalSignatureRequest.create({
    data: {
      siteId,
      documentId: id,
      token,
      email,
      expiresAt,
    },
  });

  // Generate the sign link
  const appUrl = process.env.NEXT_PUBLIC_PORTAL_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002';
  const signLink = `${appUrl}/sign?token=${token}`;

  // Get company settings for email
  const company = await prisma.portalCompanySettings.findUnique({ where: { siteId } });

  // Generate PDF for attachment
  const docData: DocumentData = {
    id: document.id,
    type: document.type as DocumentData['type'],
    status: document.status as DocumentData['status'],
    documentNumber: document.documentNumber,
    title: document.title,
    content: (document.content as Record<string, unknown>) ?? {},
    amount: document.amount ? Number(document.amount) : null,
    taxRate: Number(document.taxRate),
    taxAmount: document.taxAmount ? Number(document.taxAmount) : null,
    totalAmount: document.totalAmount ? Number(document.totalAmount) : null,
    validUntil: document.validUntil?.toISOString() ?? null,
    sentAt: document.sentAt?.toISOString() ?? null,
    signedAt: document.signedAt?.toISOString() ?? null,
    paidAt: document.paidAt?.toISOString() ?? null,
    notes: document.notes,
    createdAt: document.createdAt.toISOString(),
    contact: document.contact,
  };

  const companyData: CompanySettingsData | null = company ? {
    id: company.id, companyName: company.companyName, address: company.address,
    zipCode: company.zipCode, city: company.city, country: company.country,
    phone: company.phone, email: company.email, website: company.website,
    siret: company.siret, tvaNumber: company.tvaNumber, iban: company.iban,
    bic: company.bic, logoUrl: company.logoUrl,
  } : null;

  // Prefer cached PDF (Phase F1/F2) — regen on the fly only for legacy docs
  const pdfBuffer: Buffer = document.pdfData
    ? Buffer.from(document.pdfData)
    : Buffer.from(await generateDocumentPDF(docData, companyData));

  const typePrefix = document.type === 'DEVIS' ? 'Devis' : document.type === 'FACTURE' ? 'Facture' : 'Contrat';
  const pdfFilename = `${typePrefix}_${document.documentNumber || document.id}.pdf`;

  // Send email with signature link
  await sendSignatureRequestEmail({
    siteId,
    to: email,
    recipientName,
    documentName: document.documentNumber || document.title,
    documentType: document.type,
    signLink,
    message,
    pdfBuffer,
    pdfFilename,
    companyName: company?.companyName ?? undefined,
  });

  // Update status to SENT if DRAFT
  if (document.status === 'DRAFT') {
    await prisma.portalDocument.update({
      where: { id, siteId },
      data: { status: 'SENT', sentAt: new Date() },
    });
  }

  await logActivity(siteId, userId, 'send', 'document', id, { signatureRequest: true, to: email });

  return NextResponse.json({ success: true, signLink });
}

// ─── Signature request email ────────────────
async function sendSignatureRequestEmail(params: {
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
}) {
  const { siteId, to, recipientName, documentName, documentType, signLink, message, pdfBuffer, pdfFilename, companyName } = params;
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
    return;
  }

  const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

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
  } catch (error) {
    await prisma.portalMailLog.create({
      data: { siteId, to, subject: `Signature requise — ${documentName}`, status: 'failed', error: error instanceof Error ? error.message : 'Unknown' },
    });
  }
}
