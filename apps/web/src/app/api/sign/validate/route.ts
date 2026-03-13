import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/sign/validate?token=xxx - Validate a signature token
export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 400 });
    }

    const signatureRequest = await prisma.signatureRequest.findUnique({
      where: { token },
      include: {
        document: {
          include: {
            contact: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });

    if (!signatureRequest) {
      return NextResponse.json(
        { error: 'Lien de signature invalide' },
        { status: 404 }
      );
    }

    // Check expiration
    if (new Date() > new Date(signatureRequest.expiresAt)) {
      return NextResponse.json(
        { error: 'Ce lien de signature a expire' },
        { status: 410 }
      );
    }

    // Check if already signed
    if (signatureRequest.status === 'completed') {
      return NextResponse.json(
        { error: 'Ce document a deja ete signe' },
        { status: 410 }
      );
    }

    return NextResponse.json({
      success: true,
      signatureRequest: {
        id: signatureRequest.id,
        recipientName: signatureRequest.recipientName,
        recipientEmail: signatureRequest.recipientEmail,
        expiresAt: signatureRequest.expiresAt,
        document: {
          id: signatureRequest.document.id,
          fileName: signatureRequest.document.fileName,
          documentNumber: signatureRequest.document.documentNumber,
        },
      },
    });
  } catch (error) {
    console.error('Erreur validation token:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la validation' },
      { status: 500 }
    );
  }
}
