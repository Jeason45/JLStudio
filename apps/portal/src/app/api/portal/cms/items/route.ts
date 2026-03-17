import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId, extractUserRole } from '@/lib/auth';
import { cmsItemCreateSchema } from '@/lib/validations';
import { logActivity } from '@/lib/activity';
import type { Prisma } from '@/generated/prisma/client';

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const collectionId = searchParams.get('collectionId');
  const status = searchParams.get('status');

  const where: Record<string, unknown> = {
    collection: { siteId },
  };
  if (collectionId) where.collectionId = collectionId;
  if (status) where.status = status;

  const items = await prisma.cmsItem.findMany({
    where,
    include: {
      collection: { select: { id: true, name: true, slug: true, fields: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const role = extractUserRole(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  if (role === 'CLIENT') return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });

  const body = await req.json();
  const parsed = cmsItemCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  // Verify collection belongs to this site
  const collection = await prisma.cmsCollection.findFirst({
    where: { id: parsed.data.collectionId, siteId },
  });
  if (!collection) {
    return NextResponse.json({ error: 'Collection introuvable' }, { status: 404 });
  }

  // Check slug uniqueness within collection
  const existing = await prisma.cmsItem.findUnique({
    where: { collectionId_slug: { collectionId: parsed.data.collectionId, slug: parsed.data.slug } },
  });
  if (existing) {
    return NextResponse.json({ error: 'Ce slug existe deja dans cette collection' }, { status: 409 });
  }

  const publishedAt = parsed.data.status === 'PUBLISHED' ? new Date() : null;
  const scheduledAt = parsed.data.scheduledAt ? new Date(parsed.data.scheduledAt) : null;

  const item = await prisma.cmsItem.create({
    data: {
      collectionId: parsed.data.collectionId,
      slug: parsed.data.slug,
      data: parsed.data.data as Prisma.InputJsonValue,
      status: parsed.data.status,
      publishedAt,
      scheduledAt,
    },
    include: {
      collection: { select: { id: true, name: true, slug: true, fields: true } },
    },
  });

  await logActivity(siteId, userId, 'create', 'cms_item', item.id, { slug: item.slug, collection: collection.name });
  return NextResponse.json(item, { status: 201 });
}
