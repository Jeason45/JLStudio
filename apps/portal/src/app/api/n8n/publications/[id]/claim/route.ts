import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ensureN8nAuth } from '@/lib/n8nAuth';
import { logger } from '@/lib/logger';

/**
 * POST /api/n8n/publications/[id]/claim
 *
 * n8n appelle ça AVANT de publier pour marquer la target "en cours" (PUBLISHING).
 * Évite la double publication si plusieurs workers n8n polient en parallèle.
 *
 * Atomicité : updateMany avec where { status: SCHEDULED } → garantit qu'un
 * seul claim réussit (les autres reçoivent 0 updated → 409 Conflict).
 *
 * Auth : Bearer ${N8N_API_KEY}
 */
export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = ensureN8nAuth(req);
  if (denied) return denied;
  const { id } = await ctx.params;

  try {
    const result = await prisma.postTarget.updateMany({
      where: {
        id,
        status: 'SCHEDULED', // claim uniquement si pas déjà claimé
      },
      data: {
        status: 'PUBLISHING',
        processingStartedAt: new Date(),
        lastAttemptAt: new Date(),
        attempts: { increment: 1 },
      },
    });

    if (result.count === 0) {
      const current = await prisma.postTarget.findUnique({
        where: { id },
        select: { status: true },
      });
      if (!current) {
        return NextResponse.json({ error: 'Target introuvable' }, { status: 404 });
      }
      return NextResponse.json(
        { error: `Déjà claimé (status=${current.status})` },
        { status: 409 },
      );
    }

    return NextResponse.json({ ok: true, claimedAt: new Date().toISOString() });
  } catch (err) {
    logger.error({ err, id }, 'n8n claim failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
