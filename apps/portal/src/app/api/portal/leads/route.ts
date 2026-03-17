import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserRole, extractUserId } from '@/lib/auth';
import { leadCreateSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  if (!siteId) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  const where: Record<string, unknown> = { siteId };
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { source: { contains: search, mode: 'insensitive' } },
      { notes: { contains: search, mode: 'insensitive' } },
      { contact: { email: { contains: search, mode: 'insensitive' } } },
      { contact: { firstName: { contains: search, mode: 'insensitive' } } },
      { contact: { lastName: { contains: search, mode: 'insensitive' } } },
    ];
  }

  const leads = await prisma.lead.findMany({
    where,
    include: {
      contact: {
        select: { id: true, firstName: true, lastName: true, email: true, company: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(leads);
}

export async function POST(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const role = extractUserRole(req.headers);
  const userId = extractUserId(req.headers);

  if (!siteId) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }
  if (role === 'CLIENT') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  const body = await req.json();
  const parsed = leadCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const lead = await prisma.lead.create({
    data: {
      siteId,
      ...parsed.data,
      status: 'NEW',
    },
    include: {
      contact: {
        select: { id: true, firstName: true, lastName: true, email: true, company: true },
      },
    },
  });

  await prisma.activity.create({
    data: { siteId, userId, action: 'CREATE', entity: 'LEAD', entityId: lead.id },
  });

  return NextResponse.json(lead, { status: 201 });
}
