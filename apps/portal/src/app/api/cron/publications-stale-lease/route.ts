import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

const STALE_THRESHOLD_MINUTES = 10;

/**
 * GET /api/cron/publications-stale-lease
 *
 * Repasse à SCHEDULED les targets en PUBLISHING figés depuis > 10 min.
 * Protège contre les crash de n8n entre claim et published/failed.
 *
 * Auth : Bearer ${CRON_SECRET}
 *
 * À planifier via Coolify Cron ou Vercel Cron :
 *   {
 *     "crons": [{
 *       "path": "/api/cron/publications-stale-lease",
 *       "schedule": "* / 5 * * * *" (toutes les 5 min)
 *     }]
 *   }
 */
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const threshold = new Date(Date.now() - STALE_THRESHOLD_MINUTES * 60 * 1000);

  try {
    const result = await prisma.postTarget.updateMany({
      where: {
        status: 'PUBLISHING',
        processingStartedAt: { lt: threshold },
      },
      data: {
        status: 'SCHEDULED',
        processingStartedAt: null,
        errorMessage: 'Lease expirée (n8n crash ou timeout) — repassée en attente',
      },
    });

    if (result.count > 0) {
      logger.warn({ count: result.count }, '[stale-lease] targets ramenées en SCHEDULED');
    }

    return NextResponse.json({
      ok: true,
      releasedCount: result.count,
      thresholdMinutes: STALE_THRESHOLD_MINUTES,
      executedAt: new Date().toISOString(),
    });
  } catch (err) {
    logger.error({ err }, '[stale-lease] failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
