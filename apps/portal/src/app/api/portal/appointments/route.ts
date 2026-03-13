import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId } from '@/lib/auth';
import { appointmentCreateSchema } from '@/lib/validations';
import { logActivity } from '@/lib/activity';

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const where: Record<string, unknown> = { siteId };
  if (startDate && endDate) {
    where.startTime = { gte: new Date(startDate), lte: new Date(endDate) };
  }

  const appointments = await prisma.portalAppointment.findMany({
    where,
    include: {
      contact: { select: { id: true, firstName: true, lastName: true, email: true } },
    },
    orderBy: { startTime: 'asc' },
  });

  return NextResponse.json(appointments);
}

export async function POST(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const body = await req.json();
  const parsed = appointmentCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const appointment = await prisma.portalAppointment.create({
    data: {
      siteId,
      title: parsed.data.title,
      description: parsed.data.description,
      startTime: new Date(parsed.data.startTime),
      endTime: new Date(parsed.data.endTime),
      contactId: parsed.data.contactId || null,
      location: parsed.data.location,
    },
    include: {
      contact: { select: { id: true, firstName: true, lastName: true, email: true } },
    },
  });

  await logActivity(siteId, userId, 'create', 'appointment', appointment.id);
  return NextResponse.json(appointment, { status: 201 });
}
