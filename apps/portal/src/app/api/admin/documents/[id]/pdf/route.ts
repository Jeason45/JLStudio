import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { loadDocumentPdf } from '@/lib/documentPdf';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

/**
 * Télécharge le PDF d'un document agency-scoped.
 * Sert le pdfData en cache (Phase F1) en priorité.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const site = await getAgencySite();
  const { id } = await params;

  const document = await prisma.portalDocument.findFirst({
    where: { id, siteId: site.id },
    select: {
      id: true,
      type: true,
      documentNumber: true,
      pdfData: true,
      pdfKey: true,
    },
  });

  if (!document) {
    return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });
  }
  const pdf = await loadDocumentPdf(document);
  if (!pdf) {
    return NextResponse.json({ error: 'PDF non généré pour ce document' }, { status: 404 });
  }

  const typePrefix = document.type === 'DEVIS' ? 'Devis' : document.type === 'FACTURE' ? 'Facture' : 'Contrat';
  const filename = `${typePrefix}_${document.documentNumber || document.id}.pdf`;

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(pdf.length),
    },
  });
}
