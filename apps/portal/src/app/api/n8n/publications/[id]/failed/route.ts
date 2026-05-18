import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { ensureN8nAuth } from '@/lib/n8nAuth';
import { logger } from '@/lib/logger';

const bodySchema = z.object({
  errorMessage: z.string().min(1).max(2000),
  shouldRetry: z.boolean().optional().default(false),
});

const MAX_ATTEMPTS = 3;

/**
 * POST /api/n8n/publications/[id]/failed
 *
 * n8n appelle ça si la publication a échoué.
 *
 * Logique :
 *   - Si shouldRetry=true ET attempts < MAX_ATTEMPTS → repasse à SCHEDULED (sera repris au prochain poll)
 *   - Sinon → status=FAILED, errorMessage enregistré
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
      select: { attempts: true },
    });
    if (!target) {
      return NextResponse.json({ error: 'Target introuvable' }, { status: 404 });
    }

    const canRetry = parsed.data.shouldRetry && target.attempts < MAX_ATTEMPTS;
    const newStatus = canRetry ? 'SCHEDULED' : 'FAILED';

    await prisma.postTarget.update({
      where: { id },
      data: {
        status: newStatus,
        errorMessage: parsed.data.errorMessage,
        processingStartedAt: null,
        // Note : on n'incrémente PAS attempts ici, c'est fait par claim/
      },
    });

    return NextResponse.json({
      ok: true,
      status: newStatus,
      willRetry: canRetry,
      attempts: target.attempts,
    });
  } catch (err) {
    logger.error({ err, id }, 'n8n failed callback failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
