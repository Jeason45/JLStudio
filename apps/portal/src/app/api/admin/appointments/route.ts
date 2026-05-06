import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { logger } from '@/lib/logger';

const STATUSES = ['scheduled', 'confirmed', 'cancelled', 'completed'] as const;

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// GET — agency appointments (linked to jlstudio contacts OR no contact)
export async function GET(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const site = await getAgencySite();
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const where: Record<string, unknown> = {
    OR: [
      { contact: { siteId: site.id } },
      { contactId: null },
    ],
  };
  if (startDate || endDate) {
    where.startTime = {
      ...(startDate ? { gte: new Date(startDate) } : {}),
      ...(endDate ? { lte: new Date(endDate) } : {}),
    };
  }

  const appointments = await prisma.appointment.findMany({
    where,
    include: {
      contact: { select: { id: true, name: true, email: true, phone: true, companyName: true } },
    },
    orderBy: { startTime: 'asc' },
    take: 500,
  });
  return NextResponse.json(appointments);
}

// POST — create
const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  contactId: z.string().optional(),
  location: z.string().optional(),
  status: z.enum(STATUSES).optional().default('scheduled'),
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
  const site = await getAgencySite();

  if (data.contactId) {
    const contact = await prisma.contact.findFirst({
      where: { id: data.contactId, siteId: site.id, deletedAt: null },
      select: { id: true },
    });
    if (!contact) return NextResponse.json({ error: 'Contact introuvable' }, { status: 404 });
  }

  try {
    const appt = await prisma.appointment.create({
      data: {
        title: data.title,
        description: data.description,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        contactId: data.contactId,
        location: data.location,
        status: data.status,
      },
      include: {
        contact: { select: { id: true, name: true, email: true, phone: true, companyName: true } },
      },
    });
    return NextResponse.json(appt, { status: 201 });
  } catch (err) {
    logger.error({ err }, 'Appointment create failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PATCH — update
const updateSchema = z.object({
  id: z.string().min(1),
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  contactId: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  status: z.enum(STATUSES).optional(),
});

export async function PATCH(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
  }
  const { id, ...updates } = parsed.data;
  const site = await getAgencySite();

  // Verify appointment is agency-scoped
  const existing = await prisma.appointment.findFirst({
    where: {
      id,
      OR: [{ contact: { siteId: site.id } }, { contactId: null }],
    },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'RDV introuvable' }, { status: 404 });

  try {
    const appt = await prisma.appointment.update({
      where: { id },
      data: {
        ...updates,
        startTime: updates.startTime ? new Date(updates.startTime) : undefined,
        endTime: updates.endTime ? new Date(updates.endTime) : undefined,
      },
      include: {
        contact: { select: { id: true, name: true, email: true, phone: true, companyName: true } },
      },
    });
    return NextResponse.json(appt);
  } catch (err) {
    logger.error({ err, id }, 'Appointment update failed');
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
  const existing = await prisma.appointment.findFirst({
    where: {
      id,
      OR: [{ contact: { siteId: site.id } }, { contactId: null }],
    },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'RDV introuvable' }, { status: 404 });

  await prisma.appointment.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
