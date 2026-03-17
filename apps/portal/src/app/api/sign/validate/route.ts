import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/sign/validate?token=xxx — Public, no auth
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Token manquant' }, { status: 400 });
  }

  const signatureRequest = await prisma.portalSignatureRequest.findUnique({
    where: { token },
    include: {
      site: { select: { name: true } },
    },
  });

  if (!signatureRequest) {
    return NextResponse.json({ error: 'Lien de signature invalide' }, { status: 404 });
  }

  if (new Date() > signatureRequest.expiresAt) {
    return NextResponse.json({ error: 'Ce lien de signature a expire' }, { status: 410 });
  }

  if (signatureRequest.signedAt) {
    return NextResponse.json({ error: 'Ce document a deja ete signe' }, { status: 410 });
  }

  // Fetch document info
  const document = await prisma.portalDocument.findUnique({
    where: { id: signatureRequest.documentId },
    select: {
      id: true,
      title: true,
      documentNumber: true,
      type: true,
      totalAmount: true,
      contact: { select: { firstName: true, lastName: true, email: true, company: true } },
    },
  });

  if (!document) {
    return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    signatureRequest: {
      id: signatureRequest.id,
      email: signatureRequest.email,
      expiresAt: signatureRequest.expiresAt,
    },
    document: {
      id: document.id,
      title: document.title,
      documentNumber: document.documentNumber,
      type: document.type,
      totalAmount: document.totalAmount ? Number(document.totalAmount) : null,
      contact: document.contact,
    },
    siteName: signatureRequest.site.name,
  });
}
