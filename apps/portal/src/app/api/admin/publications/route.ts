import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { logger } from '@/lib/logger';
import { postCampaignCreateSchema } from '@/lib/validations';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// GET /api/admin/publications
// Query params : ?status=DRAFT&platform=LINKEDIN&q=keyword
export async function GET(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const site = await getAgencySite();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const platform = searchParams.get('platform');
  const q = searchParams.get('q');
  const includeArchived = searchParams.get('includeArchived') === 'true';

  const where: Record<string, unknown> = {
    siteId: site.id,
    deletedAt: null,
  };
  if (status) where.status = status;
  if (!includeArchived && !status) {
    where.status = { not: 'ARCHIVED' };
  }
  if (q) {
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
    ];
  }
  if (platform) {
    where.targets = { some: { platform } };
  }

  const campaigns = await prisma.postCampaign.findMany({
    where,
    include: {
      targets: {
        select: {
          id: true,
          platform: true,
          status: true,
          scheduledAt: true,
          publishedAt: true,
          publicUrl: true,
        },
      },
      author: { select: { id: true, email: true, name: true } },
      _count: { select: { targets: true } },
    },
    orderBy: { updatedAt: 'desc' },
    take: 200,
  });

  return NextResponse.json(campaigns);
}

// POST /api/admin/publications — create new campaign
export async function POST(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const body = await req.json();
  const parsed = postCampaignCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const site = await getAgencySite();
  // Author ID injecté par le middleware portal (x-builder-user-id) si disponible
  const authorId = req.headers.get('x-portal-super-admin-user-id') || null;

  try {
    const campaign = await prisma.postCampaign.create({
      data: {
        siteId: site.id,
        title: parsed.data.title,
        description: parsed.data.description || null,
        status: parsed.data.status || 'DRAFT',
        isPinnedToCRM: parsed.data.isPinnedToCRM || false,
        authorId,
      },
      include: {
        targets: true,
        author: { select: { id: true, email: true, name: true } },
      },
    });
    return NextResponse.json(campaign, { status: 201 });
  } catch (err) {
    logger.error({ err }, 'PostCampaign create failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
