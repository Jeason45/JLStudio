import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requirePortalAccess } from '@/lib/auth';
import { generateDocumentPDF } from '@/lib/pdfGenerator';
import type { DocumentData, CompanySettingsData } from '@/types/portal';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requirePortalAccess(req.headers);
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { siteId, role, contactId } = auth;
  const { id } = await params;

  const where: Record<string, unknown> = { id, siteId };
  if (role === 'CLIENT') where.contactId = contactId;

  const document = await prisma.portalDocument.findFirst({
    where,
    include: {
      contact: { select: { id: true, firstName: true, lastName: true, email: true, company: true } },
    },
  });

  if (!document) return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });

  // Get company settings for this site
  const company = await prisma.portalCompanySettings.findUnique({ where: { siteId } });

  // Build DocumentData from Prisma result
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

  const pdfBytes = await generateDocumentPDF(docData, companyData);

  const typePrefix = document.type === 'DEVIS' ? 'Devis' : document.type === 'FACTURE' ? 'Facture' : 'Contrat';
  const filename = `${typePrefix}_${document.documentNumber || document.id}.pdf`;

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(pdfBytes.length),
    },
  });
}
