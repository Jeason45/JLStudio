import { NextRequest, NextResponse } from 'next/server';
import { generatePDFFromTemplate } from '@/lib/mustachePdfGenerator';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { logger } from '@/lib/logger';

/**
 * Generate a PDF from a Mustache template + persist it inline in PortalDocument.
 *
 * Body:
 *  - templateSlug: "devis-moderne" | "facture-moderne"
 *  - data: object with template variables
 *  - documentId?: existing PortalDocument id to update (with pdfData)
 *  - documentNumber?: number to embed if creating
 *  - type?: "DEVIS" | "FACTURE" | "CONTRAT"
 *  - contactId?: linked contact
 *  - amount?, taxRate?, taxAmount?, totalAmount?
 *  - linkedDocumentId?: source devis id (for facture from devis)
 *  - title?: document title
 *  - returnPdf?: if true, response is the PDF binary; otherwise JSON {documentId}
 */
export async function POST(req: NextRequest) {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      templateSlug,
      data,
      documentId,
      documentNumber,
      type,
      contactId,
      amount,
      taxRate,
      taxAmount,
      totalAmount,
      linkedDocumentId,
      title,
      returnPdf = false,
    } = body;

    if (!templateSlug || !data) {
      return NextResponse.json({ error: 'templateSlug et data sont requis' }, { status: 400 });
    }

    const result = await generatePDFFromTemplate({ templateSlug, data });
    if (!result.success || !result.buffer) {
      return NextResponse.json(
        { error: result.error || 'Erreur lors de la génération du PDF' },
        { status: 500 },
      );
    }

    const site = await getAgencySite();
    let savedId = documentId as string | undefined;

    if (documentId) {
      // Update existing
      const existing = await prisma.portalDocument.findFirst({
        where: { id: documentId, siteId: site.id },
        select: { id: true },
      });
      if (!existing) return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });

      await prisma.portalDocument.update({
        where: { id: documentId },
        data: {
          content: data,
          templateSlug,
          documentNumber: documentNumber ?? undefined,
          title: title ?? undefined,
          amount: amount != null ? Number(amount) : undefined,
          taxRate: taxRate != null ? Number(taxRate) : undefined,
          taxAmount: taxAmount != null ? Number(taxAmount) : undefined,
          totalAmount: totalAmount != null ? Number(totalAmount) : undefined,
          contactId: contactId ?? undefined,
          linkedDocumentId: linkedDocumentId ?? undefined,
          pdfData: result.buffer,
        },
      });
    } else if (type) {
      // Create new — auto-generate documentNumber atomically via upsert
      if (contactId) {
        const contact = await prisma.contact.findFirst({
          where: { id: contactId, siteId: site.id, deletedAt: null },
          select: { id: true },
        });
        if (!contact) return NextResponse.json({ error: 'Contact introuvable' }, { status: 404 });
      }

      const prefixMap: Record<string, string> = { DEVIS: 'DEV', FACTURE: 'FAC', CONTRAT: 'CON' };
      const prefix = prefixMap[type];
      if (!prefix) return NextResponse.json({ error: 'Type invalide' }, { status: 400 });
      const year = new Date().getFullYear();

      const counter = await prisma.portalDocumentCounter.upsert({
        where: { siteId_prefix_year: { siteId: site.id, prefix, year } },
        update: { last: { increment: 1 } },
        create: { siteId: site.id, prefix, year, last: 1 },
      });
      const docNumber = `${prefix}-${year}-${String(counter.last).padStart(3, '0')}`;

      const created = await prisma.portalDocument.create({
        data: {
          siteId: site.id,
          type,
          status: 'DRAFT',
          documentNumber: docNumber,
          title: title || `${type} ${docNumber}`,
          content: data,
          templateSlug,
          amount: amount != null ? Number(amount) : null,
          taxRate: taxRate != null ? Number(taxRate) : 20,
          taxAmount: taxAmount != null ? Number(taxAmount) : null,
          totalAmount: totalAmount != null ? Number(totalAmount) : null,
          contactId: contactId || null,
          linkedDocumentId: linkedDocumentId || null,
          pdfData: result.buffer,
        },
        select: { id: true },
      });
      savedId = created.id;
    }

    if (returnPdf) {
      return new NextResponse(new Uint8Array(result.buffer), {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="${templateSlug}_${documentNumber || Date.now()}.pdf"`,
          'Content-Length': result.buffer.length.toString(),
          'X-Document-Id': savedId || '',
        },
      });
    }

    return NextResponse.json({ ok: true, documentId: savedId });
  } catch (err) {
    logger.error({ err }, 'Document generate failed');
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erreur serveur' },
      { status: 500 },
    );
  }
}
