import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId } from '@/lib/auth';
import { contactCreateSchema } from '@/lib/validations';
import { logActivity } from '@/lib/activity';
import { parsePagination, paginatedResponse } from '@/lib/pagination';

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';
  const { page, limit, skip } = parsePagination(searchParams);

  const where: Record<string, unknown> = { siteId };
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { email: { contains: search, mode: 'insensitive' } },
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      { company: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [contacts, total] = await Promise.all([
    prisma.contact.findMany({
      where,
      include: {
        _count: { select: { leads: true, portalDocuments: true, portalInteractions: true, portalAppointments: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.contact.count({ where }),
  ]);

  return NextResponse.json(paginatedResponse(contacts, total, page, limit));
}

export async function POST(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const body = await req.json();
  const parsed = contactCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const existing = await prisma.contact.findUnique({
    where: { siteId_email: { siteId, email: parsed.data.email.toLowerCase() } },
  });
  if (existing) {
    return NextResponse.json({ error: 'Un contact avec cet email existe deja' }, { status: 409 });
  }

  const contact = await prisma.contact.create({
    data: { siteId, ...parsed.data, email: parsed.data.email.toLowerCase() },
  });

  await logActivity(siteId, userId, 'create', 'contact', contact.id);
  return NextResponse.json(contact, { status: 201 });
}
