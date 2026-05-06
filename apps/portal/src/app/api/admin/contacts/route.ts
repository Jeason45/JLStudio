import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { logger } from '@/lib/logger';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// GET — list agency contacts
export async function GET(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const site = await getAgencySite();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  const where: Record<string, unknown> = { siteId: site.id, deletedAt: null };
  if (status && ['NEW', 'ACTIVE', 'INACTIVE'].includes(status)) where.status = status;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { companyName: { contains: search, mode: 'insensitive' } },
      { company: { contains: search, mode: 'insensitive' } },
    ];
  }

  const contacts = await prisma.contact.findMany({
    where,
    select: {
      id: true, name: true, firstName: true, lastName: true,
      email: true, phone: true, company: true, companyName: true,
      type: true, status: true, source: true, score: true,
      projectType: true, budget: true, estimatedPrice: true,
      paymentStatus: true, paidAmount: true, paidAt: true,
      address: true, city: true, postalCode: true,
      notes: true, lostReason: true,
      createdAt: true, updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 500,
  });
  return NextResponse.json(contacts);
}

// POST — create contact
const createSchema = z.object({
  name: z.string().min(1),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  companyName: z.string().optional(),
  type: z.string().optional(),
  source: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  estimatedPrice: z.number().nullable().optional(),
  notes: z.string().optional(),
  status: z.enum(['NEW', 'ACTIVE', 'INACTIVE']).optional().default('NEW'),
});

export async function POST(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const site = await getAgencySite();

  try {
    const contact = await prisma.contact.create({
      data: {
        ...parsed.data,
        siteId: site.id,
      },
    });
    return NextResponse.json(contact, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message.includes('Unique constraint')) {
      return NextResponse.json({ error: 'Un contact avec cet email existe déjà' }, { status: 409 });
    }
    logger.error({ err }, 'Contact create failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PATCH — update contact
const updateSchema = z.object({
  id: z.string().min(1),
  name: z.string().optional(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  email: z.string().email().optional(),
  phone: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  companyName: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  status: z.enum(['NEW', 'ACTIVE', 'INACTIVE']).optional(),
  source: z.string().nullable().optional(),
  score: z.number().nullable().optional(),
  projectType: z.string().nullable().optional(),
  budget: z.string().nullable().optional(),
  estimatedPrice: z.number().nullable().optional(),
  paymentStatus: z.string().optional(),
  paidAmount: z.number().optional(),
  paidAt: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  postalCode: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  lostReason: z.string().nullable().optional(),
});

export async function PATCH(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const { id, ...updates } = parsed.data;

  const site = await getAgencySite();
  const existing = await prisma.contact.findFirst({
    where: { id, siteId: site.id, deletedAt: null },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'Contact introuvable' }, { status: 404 });

  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: {
        ...updates,
        paidAt: updates.paidAt !== undefined ? (updates.paidAt ? new Date(updates.paidAt) : null) : undefined,
      },
    });
    return NextResponse.json(contact);
  } catch (err) {
    logger.error({ err, id }, 'Contact update failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE — soft delete
export async function DELETE(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });

  const site = await getAgencySite();
  const existing = await prisma.contact.findFirst({
    where: { id, siteId: site.id, deletedAt: null },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'Contact introuvable' }, { status: 404 });

  await prisma.contact.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  return NextResponse.json({ ok: true });
}
