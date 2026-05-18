import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ensureN8nAuth } from '@/lib/n8nAuth';

/**
 * GET /api/n8n/publications/pending
 *
 * Retourne la liste des targets prêtes à être publiées :
 *   - status = SCHEDULED
 *   - scheduledAt <= NOW()
 *   - attempts < MAX_ATTEMPTS (3)
 *   - non soft-deleted (campaign.deletedAt = null)
 *
 * Query params :
 *   - platform=LINKEDIN (optionnel, filtre)
 *   - limit=10 (default 50)
 *
 * Auth : Bearer ${N8N_API_KEY}
 *
 * Format de réponse :
 *   [
 *     {
 *       "targetId": "ckxxx",
 *       "campaignId": "ckyyy",
 *       "campaignTitle": "Annonce v3",
 *       "platform": "LINKEDIN",
 *       "scheduledAt": "2026-05-19T14:00:00Z",
 *       "content": { ... polymorphe selon platform ... },
 *       "media": [{ id, url, mimeType, width, height, alt }],
 *       "priority": 0,
 *       "attempts": 0
 *     }
 *   ]
 */

const MAX_ATTEMPTS = 3;

export async function GET(req: NextRequest) {
  const denied = ensureN8nAuth(req);
  if (denied) return denied;

  const { searchParams } = new URL(req.url);
  const platform = searchParams.get('platform');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100);

  const where: Record<string, unknown> = {
    status: 'SCHEDULED',
    scheduledAt: { lte: new Date() },
    attempts: { lt: MAX_ATTEMPTS },
    campaign: { deletedAt: null },
  };
  if (platform) where.platform = platform;

  const targets = await prisma.postTarget.findMany({
    where,
    orderBy: [{ priority: 'desc' }, { scheduledAt: 'asc' }],
    take: limit,
    include: {
      campaign: { select: { id: true, title: true } },
      media: {
        include: { media: true },
        orderBy: { position: 'asc' },
      },
    },
  });

  const result = targets.map((t) => ({
    targetId: t.id,
    campaignId: t.campaignId,
    campaignTitle: t.campaign.title,
    platform: t.platform,
    scheduledAt: t.scheduledAt,
    content: t.content,
    media: t.media.map((m) => ({
      id: m.media.id,
      url: m.media.url,
      thumbnailUrl: m.media.thumbnailUrl,
      mimeType: m.media.mimeType,
      width: m.media.width,
      height: m.media.height,
      alt: m.media.alt,
      role: m.role,
      position: m.position,
    })),
    priority: t.priority,
    attempts: t.attempts,
  }));

  return NextResponse.json(result);
}
