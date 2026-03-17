import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId, extractUserRole, extractContactId } from '@/lib/auth';
import { documentCreateSchema } from '@/lib/validations';
import { logActivity } from '@/lib/activity';

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const role = extractUserRole(req.headers);
  const userContactId = extractContactId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const status = searchParams.get('status');
  const contactId = searchParams.get('contactId');

  const where: Record<string, unknown> = { siteId };
  if (type) where.type = type;
  if (status) where.status = status;
  if (contactId) where.contactId = contactId;

  // CLIENT can only see their own documents
  if (role === 'CLIENT') {
    if (!userContactId) {
      return NextResponse.json([]);
    }
    where.contactId = userContactId;
  }

  const documents = await prisma.portalDocument.findMany({
    where,
    include: {
      contact: { select: { id: true, firstName: true, lastName: true, email: true, company: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(documents);
}

export async function POST(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const role = extractUserRole(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  // CLIENT cannot create documents
  if (role === 'CLIENT') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  const body = await req.json();
  const parsed = documentCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { type, title, contactId, content, amount, taxRate, validUntil, notes } = parsed.data;

  // Compute tax and total
  const taxAmount = amount ? amount * (taxRate / 100) : null;
  const totalAmount = amount ? amount + (taxAmount || 0) : null;

  // Get next document number
  const prefixMap = { DEVIS: 'DEV', FACTURE: 'FAC', CONTRAT: 'CON' } as const;
  const prefix = prefixMap[type];
  const year = new Date().getFullYear();

  const counter = await prisma.portalDocumentCounter.upsert({
    where: { siteId_prefix_year: { siteId, prefix, year } },
    update: { last: { increment: 1 } },
    create: { siteId, prefix, year, last: 1 },
  });

  const documentNumber = `${prefix}-${year}-${String(counter.last).padStart(3, '0')}`;

  const document = await prisma.portalDocument.create({
    data: {
      siteId,
      type,
      title,
      contactId: contactId || null,
      content,
      documentNumber,
      amount,
      taxRate,
      taxAmount,
      totalAmount,
      validUntil: validUntil ? new Date(validUntil) : null,
      notes,
    },
    include: {
      contact: { select: { id: true, firstName: true, lastName: true, email: true, company: true } },
    },
  });

  await logActivity(siteId, userId, 'create', 'document', document.id, { type, documentNumber });
  return NextResponse.json(document, { status: 201 });
}
