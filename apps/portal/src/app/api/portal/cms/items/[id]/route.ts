import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId, extractUserRole } from '@/lib/auth';
import { cmsItemUpdateSchema } from '@/lib/validations';
import { logActivity } from '@/lib/activity';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const item = await prisma.cmsItem.findFirst({
    where: { id, collection: { siteId } },
    include: {
      collection: { select: { id: true, name: true, slug: true, fields: true } },
    },
  });

  if (!item) {
    return NextResponse.json({ error: 'Item introuvable' }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const role = extractUserRole(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  if (role === 'CLIENT') return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });

  const body = await req.json();
  const parsed = cmsItemUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  // Verify item belongs to a collection of this site
  const existing = await prisma.cmsItem.findFirst({
    where: { id, collection: { siteId } },
    include: { collection: { select: { id: true, name: true } } },
  });
  if (!existing) {
    return NextResponse.json({ error: 'Item introuvable' }, { status: 404 });
  }

  // If slug changed, check uniqueness within collection
  if (parsed.data.slug && parsed.data.slug !== existing.slug) {
    const slugTaken = await prisma.cmsItem.findUnique({
      where: { collectionId_slug: { collectionId: existing.collectionId, slug: parsed.data.slug } },
    });
    if (slugTaken) {
      return NextResponse.json({ error: 'Ce slug existe deja dans cette collection' }, { status: 409 });
    }
  }

  const data: Record<string, unknown> = {};
  if (parsed.data.slug !== undefined) data.slug = parsed.data.slug;
  if (parsed.data.data !== undefined) data.data = parsed.data.data;
  if (parsed.data.scheduledAt !== undefined) {
    data.scheduledAt = parsed.data.scheduledAt ? new Date(parsed.data.scheduledAt) : null;
  }

  // Handle status change — set publishedAt when transitioning to PUBLISHED
  if (parsed.data.status !== undefined) {
    data.status = parsed.data.status;
    if (parsed.data.status === 'PUBLISHED' && existing.status !== 'PUBLISHED') {
      data.publishedAt = new Date();
    }
  }

  const item = await prisma.cmsItem.update({
    where: { id },
    data,
    include: {
      collection: { select: { id: true, name: true, slug: true, fields: true } },
    },
  });

  await logActivity(siteId, userId, 'update', 'cms_item', id, { slug: item.slug });
  return NextResponse.json(item);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const role = extractUserRole(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  if (role === 'CLIENT') return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });

  const existing = await prisma.cmsItem.findFirst({
    where: { id, collection: { siteId } },
  });
  if (!existing) {
    return NextResponse.json({ error: 'Item introuvable' }, { status: 404 });
  }

  await prisma.cmsItem.delete({ where: { id } });
  await logActivity(siteId, userId, 'delete', 'cms_item', id, { slug: existing.slug });
  return NextResponse.json({ success: true });
}
