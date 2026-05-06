import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getAgencySite, getAgencyManualFormId } from '@/lib/agencySite';
import { logger } from '@/lib/logger';
import type { Prisma } from '@jlstudio/database';

const STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'] as const;

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// GET — list leads
export async function GET(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const site = await getAgencySite();
  const leads = await prisma.lead.findMany({
    where: { siteId: site.id },
    include: {
      contact: { select: { id: true, name: true, firstName: true, lastName: true, email: true, companyName: true, phone: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 500,
  });
  return NextResponse.json(leads);
}

// POST — create lead
const createSchema = z.object({
  contactId: z.string().min(1).optional(),
  // If no contactId, create contact inline
  newContact: z.object({
    name: z.string().min(1),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    companyName: z.string().optional(),
  }).optional(),
  status: z.enum(STATUSES).optional().default('NEW'),
  source: z.string().optional(),
  notes: z.string().optional(),
  data: z.record(z.string(), z.unknown()).optional(),
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
  const data = parsed.data;
  if (!data.contactId && !data.newContact) {
    return NextResponse.json({ error: 'contactId ou newContact requis' }, { status: 400 });
  }

  const site = await getAgencySite();

  try {
    let contactId = data.contactId;

    if (!contactId && data.newContact) {
      const c = data.newContact;
      const contact = await prisma.contact.create({
        data: {
          siteId: site.id,
          name: c.name,
          firstName: c.firstName,
          lastName: c.lastName,
          email: c.email || `lead-${Date.now()}@noreply.local`,
          phone: c.phone,
          companyName: c.companyName,
        },
        select: { id: true },
      });
      contactId = contact.id;
    } else if (contactId) {
      // Verify contact belongs to agency
      const contact = await prisma.contact.findFirst({
        where: { id: contactId, siteId: site.id, deletedAt: null },
        select: { id: true },
      });
      if (!contact) return NextResponse.json({ error: 'Contact introuvable' }, { status: 404 });
    }

    const formId = await getAgencyManualFormId();
    const lead = await prisma.lead.create({
      data: {
        siteId: site.id,
        contactId: contactId!,
        formId,
        status: data.status,
        source: data.source,
        notes: data.notes,
        data: (data.data ?? {}) as Prisma.InputJsonValue,
      },
      include: {
        contact: { select: { id: true, name: true, firstName: true, lastName: true, email: true, companyName: true, phone: true } },
      },
    });
    return NextResponse.json(lead, { status: 201 });
  } catch (err) {
    logger.error({ err }, 'Lead create failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PATCH — update lead (status change, notes…)
const updateSchema = z.object({
  id: z.string().min(1),
  status: z.enum(STATUSES).optional(),
  source: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  data: z.record(z.string(), z.unknown()).optional(),
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
  const existing = await prisma.lead.findFirst({
    where: { id, siteId: site.id },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'Lead introuvable' }, { status: 404 });

  try {
    const lead = await prisma.lead.update({
      where: { id },
      data: {
        ...updates,
        data: updates.data !== undefined ? (updates.data as Prisma.InputJsonValue) : undefined,
      },
      include: {
        contact: { select: { id: true, name: true, firstName: true, lastName: true, email: true, companyName: true, phone: true } },
      },
    });
    return NextResponse.json(lead);
  } catch (err) {
    logger.error({ err, id }, 'Lead update failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE — delete lead
export async function DELETE(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });

  const site = await getAgencySite();
  const existing = await prisma.lead.findFirst({
    where: { id, siteId: site.id },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'Lead introuvable' }, { status: 404 });

  await prisma.lead.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
