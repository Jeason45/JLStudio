import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId } from '@/lib/auth';
import { appointmentUpdateSchema } from '@/lib/validations';
import { logActivity } from '@/lib/activity';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const body = await req.json();
  const parsed = appointmentUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  if (parsed.data.title) data.title = parsed.data.title;
  if (parsed.data.description !== undefined) data.description = parsed.data.description;
  if (parsed.data.startTime) data.startTime = new Date(parsed.data.startTime);
  if (parsed.data.endTime) data.endTime = new Date(parsed.data.endTime);
  if (parsed.data.contactId !== undefined) data.contactId = parsed.data.contactId;
  if (parsed.data.location !== undefined) data.location = parsed.data.location;

  const appointment = await prisma.portalAppointment.update({
    where: { id, siteId },
    data,
    include: {
      contact: { select: { id: true, firstName: true, lastName: true, email: true } },
    },
  });

  await logActivity(siteId, userId, 'update', 'appointment', id);
  return NextResponse.json(appointment);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  await prisma.portalAppointment.delete({ where: { id, siteId } });
  await logActivity(siteId, userId, 'delete', 'appointment', id);
  return NextResponse.json({ success: true });
}
