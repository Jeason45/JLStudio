import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId, extractUserRole } from '@/lib/auth';
import { cmsCollectionCreateSchema } from '@/lib/validations';
import { logActivity } from '@/lib/activity';
import type { Prisma } from '@/generated/prisma/client';

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const collections = await prisma.cmsCollection.findMany({
    where: { siteId },
    include: {
      _count: { select: { items: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(collections);
}

export async function POST(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const role = extractUserRole(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  if (role !== 'ADMIN') return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });

  const body = await req.json();
  const parsed = cmsCollectionCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  // Check slug uniqueness within site
  const existing = await prisma.cmsCollection.findUnique({
    where: { siteId_slug: { siteId, slug: parsed.data.slug } },
  });
  if (existing) {
    return NextResponse.json({ error: 'Ce slug existe deja pour ce site' }, { status: 409 });
  }

  const collection = await prisma.cmsCollection.create({
    data: {
      siteId,
      name: parsed.data.name,
      slug: parsed.data.slug,
      fields: parsed.data.fields as unknown as Prisma.InputJsonValue,
      settings: parsed.data.settings as Prisma.InputJsonValue,
    },
    include: {
      _count: { select: { items: true } },
    },
  });

  await logActivity(siteId, userId, 'create', 'cms_collection', collection.id, { name: collection.name });
  return NextResponse.json(collection, { status: 201 });
}
