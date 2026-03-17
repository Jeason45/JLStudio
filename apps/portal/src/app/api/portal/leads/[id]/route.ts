import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserRole, extractUserId } from '@/lib/auth';
import { leadUpdateSchema } from '@/lib/validations';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const siteId = extractSiteId(req.headers);
  if (!siteId) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }

  const { id } = await params;
  const lead = await prisma.lead.findFirst({
    where: { id, siteId },
    include: {
      contact: {
        select: { id: true, firstName: true, lastName: true, email: true, company: true },
      },
    },
  });

  if (!lead) {
    return NextResponse.json({ error: 'Lead non trouve' }, { status: 404 });
  }

  return NextResponse.json(lead);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const siteId = extractSiteId(req.headers);
  const role = extractUserRole(req.headers);
  const userId = extractUserId(req.headers);

  if (!siteId) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }
  if (role === 'CLIENT') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const parsed = leadUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const existing = await prisma.lead.findFirst({ where: { id, siteId } });
  if (!existing) {
    return NextResponse.json({ error: 'Lead non trouve' }, { status: 404 });
  }

  const lead = await prisma.lead.update({
    where: { id },
    data: parsed.data,
    include: {
      contact: {
        select: { id: true, firstName: true, lastName: true, email: true, company: true },
      },
    },
  });

  const action = parsed.data.status ? 'STATUS_CHANGE' : 'UPDATE';
  await prisma.activity.create({
    data: {
      siteId, userId, action, entity: 'LEAD', entityId: lead.id,
      details: parsed.data.status ? { from: existing.status, to: parsed.data.status } : undefined,
    },
  });

  return NextResponse.json(lead);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const siteId = extractSiteId(req.headers);
  const role = extractUserRole(req.headers);
  const userId = extractUserId(req.headers);

  if (!siteId) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }
  if (role === 'CLIENT') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  const { id } = await params;
  const existing = await prisma.lead.findFirst({ where: { id, siteId } });
  if (!existing) {
    return NextResponse.json({ error: 'Lead non trouve' }, { status: 404 });
  }

  await prisma.lead.delete({ where: { id } });

  await prisma.activity.create({
    data: { siteId, userId, action: 'DELETE', entity: 'LEAD', entityId: id },
  });

  return NextResponse.json({ ok: true });
}
