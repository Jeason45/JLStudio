import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId, extractUserRole } from '@/lib/auth';
import { cmsCollectionUpdateSchema } from '@/lib/validations';
import { logActivity } from '@/lib/activity';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const collection = await prisma.cmsCollection.findFirst({
    where: { id, siteId },
    include: {
      items: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!collection) {
    return NextResponse.json({ error: 'Collection introuvable' }, { status: 404 });
  }

  return NextResponse.json(collection);
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
  if (role !== 'ADMIN') return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });

  const body = await req.json();
  const parsed = cmsCollectionUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  // Verify collection belongs to this site
  const existing = await prisma.cmsCollection.findFirst({ where: { id, siteId } });
  if (!existing) {
    return NextResponse.json({ error: 'Collection introuvable' }, { status: 404 });
  }

  // If slug changed, check uniqueness
  if (parsed.data.slug && parsed.data.slug !== existing.slug) {
    const slugTaken = await prisma.cmsCollection.findUnique({
      where: { siteId_slug: { siteId, slug: parsed.data.slug } },
    });
    if (slugTaken) {
      return NextResponse.json({ error: 'Ce slug existe deja pour ce site' }, { status: 409 });
    }
  }

  const data: Record<string, unknown> = {};
  if (parsed.data.name !== undefined) data.name = parsed.data.name;
  if (parsed.data.slug !== undefined) data.slug = parsed.data.slug;
  if (parsed.data.fields !== undefined) data.fields = parsed.data.fields;
  if (parsed.data.settings !== undefined) data.settings = parsed.data.settings;

  const collection = await prisma.cmsCollection.update({
    where: { id },
    data,
    include: {
      _count: { select: { items: true } },
    },
  });

  await logActivity(siteId, userId, 'update', 'cms_collection', id, { name: collection.name });
  return NextResponse.json(collection);
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
  if (role !== 'ADMIN') return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });

  const existing = await prisma.cmsCollection.findFirst({ where: { id, siteId } });
  if (!existing) {
    return NextResponse.json({ error: 'Collection introuvable' }, { status: 404 });
  }

  await prisma.cmsCollection.delete({ where: { id } });
  await logActivity(siteId, userId, 'delete', 'cms_collection', id, { name: existing.name });
  return NextResponse.json({ success: true });
}
