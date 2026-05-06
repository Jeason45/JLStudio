import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requirePortalAccess } from '@/lib/auth';
import { logActivity } from '@/lib/activity';
import { generateDocumentPDF } from '@/lib/pdfGenerator';
import { sendDocumentEmail } from '@/lib/email';
import type { DocumentData, CompanySettingsData } from '@/types/portal';
import { z } from 'zod';

const sendSchema = z.object({
  to: z.string().email('Email invalide'),
  recipientName: z.string().min(1, 'Nom requis'),
  message: z.string().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requirePortalAccess(req.headers);
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  if (auth.role === 'CLIENT') return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  const { siteId, userId } = auth;
  const { id } = await params;

  // Validate body
  const body = await req.json();
  const parsed = sendSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }
  const { to, recipientName, message } = parsed.data;

  // Fetch document
  const document = await prisma.portalDocument.findFirst({
    where: { id, siteId },
    include: {
      contact: { select: { id: true, firstName: true, lastName: true, email: true, company: true } },
    },
  });
  if (!document) return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });

  // Fetch company settings
  const company = await prisma.portalCompanySettings.findUnique({ where: { siteId } });

  // Build DocumentData for PDF generation
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
    id: company.id,
    companyName: company.companyName,
    address: company.address,
    zipCode: company.zipCode,
    city: company.city,
    country: company.country,
    phone: company.phone,
    email: company.email,
    website: company.website,
    siret: company.siret,
    tvaNumber: company.tvaNumber,
    iban: company.iban,
    bic: company.bic,
    logoUrl: company.logoUrl,
  } : null;

  // Generate PDF
  const pdfBytes = await generateDocumentPDF(docData, companyData);
  const pdfBuffer = Buffer.from(pdfBytes);

  const typePrefix = document.type === 'DEVIS' ? 'Devis' : document.type === 'FACTURE' ? 'Facture' : 'Contrat';
  const pdfFilename = `${typePrefix}_${document.documentNumber || document.id}.pdf`;
  const documentName = document.documentNumber || document.title;

  // Send email
  const result = await sendDocumentEmail({
    siteId,
    to,
    recipientName,
    documentName,
    documentType: document.type,
    message,
    pdfBuffer,
    pdfFilename,
    companyName: company?.companyName ?? undefined,
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  // Update document status to SENT if still DRAFT
  if (document.status === 'DRAFT') {
    await prisma.portalDocument.update({
      where: { id, siteId },
      data: { status: 'SENT', sentAt: new Date() },
    });
  }

  await logActivity(siteId, userId, 'send', 'document', id, { to, recipientName });

  return NextResponse.json({ success: true });
}
