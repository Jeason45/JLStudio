import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { logger } from '@/lib/logger';
import { postTargetCreateSchema } from '@/lib/validations';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// POST /api/admin/publications/[id]/targets — add a target (1 plateforme)
export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id: campaignId } = await ctx.params;
  const site = await getAgencySite();

  // Vérifie que la campaign existe et appartient au site
  const campaign = await prisma.postCampaign.findFirst({
    where: { id: campaignId, siteId: site.id, deletedAt: null },
    select: { id: true },
  });
  if (!campaign) {
    return NextResponse.json({ error: 'Publication introuvable' }, { status: 404 });
  }

  const body = await req.json();
  const parsed = postTargetCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // Vérifie que les mediaIds existent et appartiennent au site
  if (data.mediaIds.length > 0) {
    const mediaCount = await prisma.media.count({
      where: { id: { in: data.mediaIds }, siteId: site.id },
    });
    if (mediaCount !== data.mediaIds.length) {
      return NextResponse.json(
        { error: 'Un ou plusieurs médias sont introuvables ou hors site' },
        { status: 400 },
      );
    }
  }

  try {
    const target = await prisma.postTarget.create({
      data: {
        campaignId,
        platform: data.platform,
        content: data.content,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
        status: data.status || 'DRAFT',
        priority: data.priority || 0,
        media: {
          create: data.mediaIds.map((mediaId, position) => ({
            mediaId,
            position,
            role: position === 0 ? 'primary' : 'extra',
          })),
        },
      },
      include: {
        media: { include: { media: true }, orderBy: { position: 'asc' } },
      },
    });
    return NextResponse.json(target, { status: 201 });
  } catch (err) {
    logger.error({ err, campaignId }, 'PostTarget create failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
