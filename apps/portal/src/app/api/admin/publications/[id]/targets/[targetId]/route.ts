import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { logger } from '@/lib/logger';
import { postTargetUpdateSchema } from '@/lib/validations';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

async function loadTarget(campaignId: string, targetId: string, siteId: string) {
  return prisma.postTarget.findFirst({
    where: {
      id: targetId,
      campaignId,
      campaign: { siteId, deletedAt: null },
    },
    select: { id: true, status: true, platform: true },
  });
}

// PATCH /api/admin/publications/[id]/targets/[targetId]
export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string; targetId: string }> },
) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id: campaignId, targetId } = await ctx.params;
  const site = await getAgencySite();

  const target = await loadTarget(campaignId, targetId, site.id);
  if (!target) return NextResponse.json({ error: 'Target introuvable' }, { status: 404 });

  // Empêche modification d'une target en cours de publication par n8n
  if (target.status === 'PUBLISHING') {
    return NextResponse.json(
      { error: 'Cette publication est en cours de traitement par n8n, attendez la fin' },
      { status: 409 },
    );
  }

  const body = await req.json();
  const parsed = postTargetUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // Si content fourni, vérifie cohérence avec platform de la target
  if (data.content && data.content.platform !== target.platform) {
    return NextResponse.json(
      { error: 'content.platform doit correspondre à la platform de la target' },
      { status: 400 },
    );
  }

  // Vérifie les mediaIds
  if (data.mediaIds && data.mediaIds.length > 0) {
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
    // Transaction : update target + recréer media join si fourni
    const updated = await prisma.$transaction(async (tx) => {
      const updateData: Record<string, unknown> = {};
      if (data.content !== undefined) updateData.content = data.content;
      if (data.scheduledAt !== undefined) {
        updateData.scheduledAt = data.scheduledAt ? new Date(data.scheduledAt) : null;
      }
      if (data.status !== undefined) updateData.status = data.status;
      if (data.priority !== undefined) updateData.priority = data.priority;

      const t = await tx.postTarget.update({
        where: { id: targetId },
        data: updateData,
      });

      if (data.mediaIds !== undefined) {
        // Replace tout le join (simple et fiable)
        await tx.postTargetMedia.deleteMany({ where: { targetId } });
        if (data.mediaIds.length > 0) {
          await tx.postTargetMedia.createMany({
            data: data.mediaIds.map((mediaId, position) => ({
              targetId,
              mediaId,
              position,
              role: position === 0 ? 'primary' : 'extra',
            })),
          });
        }
      }

      return tx.postTarget.findUnique({
        where: { id: t.id },
        include: { media: { include: { media: true }, orderBy: { position: 'asc' } } },
      });
    });

    return NextResponse.json(updated);
  } catch (err) {
    logger.error({ err, targetId }, 'PostTarget update failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE /api/admin/publications/[id]/targets/[targetId]
export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ id: string; targetId: string }> },
) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id: campaignId, targetId } = await ctx.params;
  const site = await getAgencySite();

  const target = await loadTarget(campaignId, targetId, site.id);
  if (!target) return NextResponse.json({ error: 'Target introuvable' }, { status: 404 });

  // Pas de blocage si PUBLISHING : on supprime quand même.
  // Si n8n callback ensuite, le target n'existera plus → 404, ce qui est OK
  // (la callback échouera silencieusement côté n8n).
  await prisma.postTarget.delete({ where: { id: targetId } });
  return NextResponse.json({ ok: true });
}
