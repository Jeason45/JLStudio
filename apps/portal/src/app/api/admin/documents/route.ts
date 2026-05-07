import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { logger } from '@/lib/logger';

const TYPES = ['DEVIS', 'FACTURE', 'CONTRAT'] as const;

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// GET — list agency documents
export async function GET(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const site = await getAgencySite();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  const where: Record<string, unknown> = { siteId: site.id };
  if (type && TYPES.includes(type as typeof TYPES[number])) where.type = type;
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { documentNumber: { contains: search, mode: 'insensitive' } },
    ];
  }

  const documents = await prisma.portalDocument.findMany({
    where,
    select: {
      id: true, siteId: true, contactId: true, projectId: true,
      type: true, status: true, documentNumber: true, title: true,
      content: true, amount: true, taxRate: true, taxAmount: true, totalAmount: true,
      validUntil: true, sentAt: true, signedAt: true, paidAt: true,
      notes: true, templateSlug: true, linkedDocumentId: true,
      createdAt: true, updatedAt: true,
      // pdfData / signedPdfData volontairement exclus (binaires lourds)
      contact: { select: { id: true, name: true, email: true, companyName: true, firstName: true, lastName: true, phone: true } },
      signature: { select: { id: true, signerName: true, signedAt: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 200,
  });
  return NextResponse.json(documents);
}

// PATCH — update status (mark as paid, sent, cancelled)
const updateSchema = z.object({
  id: z.string().min(1),
  status: z.enum(['DRAFT', 'SENT', 'SIGNED', 'ACCEPTED', 'REJECTED', 'PAID', 'CANCELLED']).optional(),
});

export async function PATCH(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
  }
  const { id, status } = parsed.data;

  const site = await getAgencySite();
  const existing = await prisma.portalDocument.findFirst({
    where: { id, siteId: site.id },
    select: { id: true, status: true },
  });
  if (!existing) return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });

  try {
    const update: Record<string, unknown> = {};
    if (status) {
      update.status = status;
      if (status === 'SENT' && existing.status === 'DRAFT') update.sentAt = new Date();
      if (status === 'SIGNED') update.signedAt = new Date();
      if (status === 'PAID') update.paidAt = new Date();
    }
    const doc = await prisma.portalDocument.update({
      where: { id },
      data: update,
    });
    return NextResponse.json(doc);
  } catch (err) {
    logger.error({ err, id }, 'Document update failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });

  const site = await getAgencySite();
  const existing = await prisma.portalDocument.findFirst({
    where: { id, siteId: site.id },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });

  await prisma.portalDocument.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
