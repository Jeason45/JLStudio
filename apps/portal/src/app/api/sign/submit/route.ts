import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateDocumentPDF } from '@/lib/pdfGenerator';
import { generateSignedPDF } from '@/lib/signedPdfGenerator';
import { createSignatureProof, getClientIP, getUserAgent, generateStringHash } from '@/lib/signatureUtils';
import { sendDocumentEmail } from '@/lib/email';
import type { DocumentData, CompanySettingsData } from '@/types/portal';
import { z } from 'zod';
import { verifyOrigin } from '@/lib/csrf';
import { rateLimit } from '@/lib/rateLimit';

const submitSchema = z.object({
  token: z.string().min(1),
  signerName: z.string().min(1, 'Nom requis'),
  signerEmail: z.string().email('Email invalide'),
  signatureImage: z.string().min(1, 'Signature requise').max(500_000, 'Signature trop volumineuse'), // base64 PNG, ~500KB max
});

// POST /api/sign/submit — Public, no auth
export async function POST(request: NextRequest) {
  if (!verifyOrigin(request)) {
    return NextResponse.json({ error: 'Origin invalide' }, { status: 403 });
  }

  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const { allowed } = rateLimit(`portal-sign-submit:${ip}`, 5, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: 'Trop de requetes, reessayez plus tard' }, { status: 429 });
  }

  const body = await request.json();
  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }
  const { token, signerName, signerEmail, signatureImage } = parsed.data;

  // Fetch signature request
  const signatureRequest = await prisma.portalSignatureRequest.findUnique({
    where: { token },
  });

  if (!signatureRequest) {
    return NextResponse.json({ error: 'Token invalide' }, { status: 404 });
  }
  if (new Date() > signatureRequest.expiresAt) {
    return NextResponse.json({ error: 'Ce lien a expire' }, { status: 410 });
  }
  if (signatureRequest.signedAt) {
    return NextResponse.json({ error: 'Ce document a deja ete signe' }, { status: 409 });
  }

  const ipAddress = getClientIP(request);
  const userAgent = getUserAgent(request);
  const signedAt = new Date();

  // Fetch document + company
  const document = await prisma.portalDocument.findUnique({
    where: { id: signatureRequest.documentId },
    include: {
      contact: { select: { id: true, firstName: true, lastName: true, email: true, company: true } },
    },
  });
  if (!document) {
    return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });
  }

  const company = await prisma.portalCompanySettings.findUnique({ where: { siteId: signatureRequest.siteId } });

  // Generate the original PDF to get its hash
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

  const originalPdfBytes = await generateDocumentPDF(docData, companyData);
  const originalPdfBuffer = Buffer.from(originalPdfBytes);
  const documentHash = generateStringHash(originalPdfBuffer.toString('base64'));

  // Create signature proof
  const proofData = createSignatureProof({
    documentId: document.id,
    documentHash,
    signerName,
    signerEmail,
    signedAt,
    ipAddress,
    userAgent,
  });

  // Decode signature image
  const base64Image = signatureImage.replace(/^data:image\/\w+;base64,/, '');
  const signatureImageBuffer = Buffer.from(base64Image, 'base64');

  // Generate signed PDF (overlay signature on original)
  const signedPdfBuffer = await generateSignedPDF(
    originalPdfBuffer,
    signatureImageBuffer,
    { signerName, signerEmail, signedAt, ipAddress, documentHash }
  );

  // Save signature + update request + update document status in transaction
  await prisma.$transaction(async (tx) => {
    await tx.portalSignature.create({
      data: {
        documentId: document.id,
        signerName,
        signerEmail,
        imageData: signatureImage,
        hash: JSON.stringify(proofData),
        ipAddress,
        userAgent,
        signedAt,
      },
    });

    await tx.portalSignatureRequest.update({
      where: { id: signatureRequest.id },
      data: { signedAt },
    });

    await tx.portalDocument.update({
      where: { id: document.id },
      data: { status: 'SIGNED', signedAt },
    });
  });

  // Send confirmation email with signed PDF
  const typePrefix = document.type === 'DEVIS' ? 'Devis' : document.type === 'FACTURE' ? 'Facture' : 'Contrat';
  const signedFilename = `${typePrefix}_${document.documentNumber || document.id}_SIGNE.pdf`;

  await sendDocumentEmail({
    siteId: signatureRequest.siteId,
    to: signerEmail,
    recipientName: signerName,
    documentName: `${document.documentNumber || document.title} (signe)`,
    documentType: document.type,
    message: `Votre ${typePrefix.toLowerCase()} a ete signe avec succes. Vous trouverez ci-joint le document signe.`,
    pdfBuffer: signedPdfBuffer,
    pdfFilename: signedFilename,
    companyName: company?.companyName ?? undefined,
  });

  return NextResponse.json({
    success: true,
    message: 'Document signe avec succes',
    signature: {
      signedAt: signedAt.toISOString(),
      documentHash,
    },
  });
}
