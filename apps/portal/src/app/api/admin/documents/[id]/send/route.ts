import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { sendDocumentEmail } from '@/lib/email';
import { logActivity } from '@/lib/activity';
import { logger } from '@/lib/logger';
import { loadDocumentPdf } from '@/lib/documentPdf';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

const sendSchema = z.object({
  to: z.string().email('Email invalide'),
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
  const parsed = sendSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }
  const { to, recipientName, message } = parsed.data;

  const document = await prisma.portalDocument.findFirst({
    where: { id, siteId: site.id },
    select: {
      id: true, type: true, status: true, documentNumber: true, title: true, pdfData: true, pdfKey: true,
    },
  });

  if (!document) {
    return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });
  }
  const pdfBuffer = await loadDocumentPdf(document);
  if (!pdfBuffer) {
    return NextResponse.json({ error: 'PDF non généré — régénère le document avant envoi' }, { status: 400 });
  }

  const company = await prisma.portalCompanySettings.findUnique({ where: { siteId: site.id } });
  const typePrefix = document.type === 'DEVIS' ? 'Devis' : document.type === 'FACTURE' ? 'Facture' : 'Contrat';
  const pdfFilename = `${typePrefix}_${document.documentNumber || document.id}.pdf`;
  const documentName = document.documentNumber || document.title;

  try {
    const result = await sendDocumentEmail({
      siteId: site.id,
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
      return NextResponse.json({ error: result.error || 'Erreur d\'envoi' }, { status: 500 });
    }

    if (document.status === 'DRAFT') {
      await prisma.portalDocument.update({
        where: { id, siteId: site.id },
        data: { status: 'SENT', sentAt: new Date() },
      });
    }

    await logActivity(site.id, userId, 'send', 'document', id, { to, recipientName });
    return NextResponse.json({ success: true });
  } catch (err) {
    logger.error({ err }, 'Admin document send failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
