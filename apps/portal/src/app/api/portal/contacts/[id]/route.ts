import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId } from '@/lib/auth';
import { contactUpdateSchema } from '@/lib/validations';
import { logActivity } from '@/lib/activity';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const contact = await prisma.contact.findFirst({
    where: { id, siteId },
    include: {
      portalInteractions: { orderBy: { date: 'desc' }, take: 50 },
      portalDocuments: { orderBy: { createdAt: 'desc' }, take: 20, select: { id: true, type: true, status: true, documentNumber: true, title: true, totalAmount: true, createdAt: true } },
      portalAppointments: { orderBy: { startTime: 'desc' }, take: 10 },
      _count: { select: { leads: true, portalDocuments: true, portalInteractions: true, portalAppointments: true } },
    },
  });

  if (!contact) return NextResponse.json({ error: 'Contact introuvable' }, { status: 404 });
  return NextResponse.json(contact);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const body = await req.json();
  const parsed = contactUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const data = { ...parsed.data };
  if (data.email) data.email = data.email.toLowerCase();

  const contact = await prisma.contact.update({
    where: { id, siteId },
    data,
  });

  await logActivity(siteId, userId, 'update', 'contact', contact.id);
  return NextResponse.json(contact);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  await prisma.contact.delete({ where: { id, siteId } });
  await logActivity(siteId, userId, 'delete', 'contact', id);
  return NextResponse.json({ success: true });
}
