import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateDocumentPDF } from '@/lib/pdfGenerator';
import { loadDocumentPdf } from '@/lib/documentPdf';
import type { DocumentData, CompanySettingsData } from '@/types/portal';

// GET /api/sign/pdf?token=... — sert le PDF du document à signer.
// Public, sécurisé par le token de signature (pas d'auth). Affiché dans
// l'iframe de la page de signature pour que le client VOIE le devis.

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) return NextResponse.json({ error: 'Token manquant' }, { status: 400 });

  const sigRequest = await prisma.portalSignatureRequest.findUnique({ where: { token } });
  if (!sigRequest) return NextResponse.json({ error: 'Token invalide' }, { status: 404 });
  if (new Date() > sigRequest.expiresAt) return NextResponse.json({ error: 'Lien expiré' }, { status: 410 });

  const document = await prisma.portalDocument.findUnique({
    where: { id: sigRequest.documentId },
    include: { contact: { select: { id: true, firstName: true, lastName: true, email: true, company: true } } },
  });
  if (!document) return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });

  // PDF stocké (R2/Postgres) en priorité, sinon régénération à la volée
  let pdf = await loadDocumentPdf(document);
  if (!pdf) {
    const company = await prisma.portalCompanySettings.findUnique({ where: { siteId: sigRequest.siteId } });
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
    pdf = Buffer.from(await generateDocumentPDF(docData, companyData));
  }

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
      'Cache-Control': 'no-store',
    },
  });
}
