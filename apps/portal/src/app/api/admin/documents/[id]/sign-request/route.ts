import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { generateToken } from '@/lib/signatureUtils';
import { sendSignatureRequestEmail } from '@/lib/signatureEmail';
import { logActivity } from '@/lib/activity';
import { logger } from '@/lib/logger';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

const schema = z.object({
  email: z.string().email('Email invalide'),
  recipientName: z.string().min(1, 'Nom requis'),
  message: z.string().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const userId = req.headers.get('x-portal-user-id') || '';
  const site = await getAgencySite();
  const { id } = await params;

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }
  const { email, recipientName, message } = parsed.data;

  const document = await prisma.portalDocument.findFirst({
    where: { id, siteId: site.id },
    include: {
      signature: true,
    },
  });

  if (!document) {
    return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });
  }
  if (document.signature) {
    return NextResponse.json({ error: 'Ce document a deja ete signe' }, { status: 409 });
  }
  if (!document.pdfData) {
    return NextResponse.json({ error: 'PDF non généré — régénère le document avant envoi' }, { status: 400 });
  }

  const token = generateToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await prisma.portalSignatureRequest.create({
    data: {
      siteId: site.id,
      documentId: id,
      token,
      email,
      expiresAt,
    },
  });

  const appUrl = process.env.NEXT_PUBLIC_PORTAL_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002';
  const signLink = `${appUrl}/sign?token=${token}`;

  const company = await prisma.portalCompanySettings.findUnique({ where: { siteId: site.id } });
  const typePrefix = document.type === 'DEVIS' ? 'Devis' : document.type === 'FACTURE' ? 'Facture' : 'Contrat';
  const pdfFilename = `${typePrefix}_${document.documentNumber || document.id}.pdf`;

  try {
    await sendSignatureRequestEmail({
      siteId: site.id,
      to: email,
      recipientName,
      documentName: document.documentNumber || document.title,
      documentType: document.type,
      signLink,
      message,
      pdfBuffer: Buffer.from(document.pdfData),
      pdfFilename,
      companyName: company?.companyName ?? undefined,
    });

    if (document.status === 'DRAFT') {
      await prisma.portalDocument.update({
        where: { id, siteId: site.id },
        data: { status: 'SENT', sentAt: new Date() },
      });
    }

    await logActivity(site.id, userId, 'send', 'document', id, { signatureRequest: true, to: email });
    return NextResponse.json({ success: true, signLink });
  } catch (err) {
    logger.error({ err }, 'Admin signature request failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
