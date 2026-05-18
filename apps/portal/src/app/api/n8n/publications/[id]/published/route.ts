import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { ensureN8nAuth } from '@/lib/n8nAuth';
import { logger } from '@/lib/logger';

const bodySchema = z.object({
  externalId: z.string().min(1, 'externalId requis'),
  publicUrl: z.string().url('publicUrl invalide'),
  publishedAt: z.string().datetime().optional(),
});

/**
 * POST /api/n8n/publications/[id]/published
 *
 * n8n appelle ça APRÈS publication réussie sur le réseau.
 * Marque la target PUBLISHED + remplit externalId, publicUrl, publishedAt.
 *
 * Met également à jour le status de la campaign parent :
 *   - toutes targets PUBLISHED → campaign.status = PUBLISHED
 *   - au moins une PUBLISHED, au moins une non publiée → ACTIVE
 *
 * Auth : Bearer ${N8N_API_KEY}
 */
export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = ensureN8nAuth(req);
  if (denied) return denied;
  const { id } = await ctx.params;

  const body = await req.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const target = await prisma.postTarget.findUnique({
      where: { id },
      select: { campaignId: true },
    });
    if (!target) {
      return NextResponse.json({ error: 'Target introuvable' }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.postTarget.update({
        where: { id },
        data: {
          status: 'PUBLISHED',
          externalId: parsed.data.externalId,
          publicUrl: parsed.data.publicUrl,
          publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : new Date(),
          processingStartedAt: null,
          errorMessage: null,
        },
      });

      // Recalcule le status de la campaign
      const targets = await tx.postTarget.findMany({
        where: { campaignId: target.campaignId },
        select: { status: true },
      });
      const allPublished = targets.every((t) => t.status === 'PUBLISHED');
      const anyPublished = targets.some((t) => t.status === 'PUBLISHED');
      const anyUnpublished = targets.some((t) => ['DRAFT', 'SCHEDULED', 'PUBLISHING'].includes(t.status));

      let campaignStatus: 'PUBLISHED' | 'ACTIVE' | undefined;
      if (allPublished) campaignStatus = 'PUBLISHED';
      else if (anyPublished && anyUnpublished) campaignStatus = 'ACTIVE';

      if (campaignStatus) {
        await tx.postCampaign.update({
          where: { id: target.campaignId },
          data: { status: campaignStatus },
        });
      }
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error({ err, id }, 'n8n published callback failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
