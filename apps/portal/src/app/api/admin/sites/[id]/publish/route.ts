import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@jlstudio/database';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// Déclenche la revalidation ISR du site public apps/web après publication.
// Best-effort : on ne bloque pas la réponse si le webhook échoue.
async function triggerWebRevalidation() {
  const secret = process.env.INTERNAL_API_SECRET;
  const webUrl = process.env.WEB_PUBLIC_URL || 'https://jlstudio.dev';
  if (!secret) return;
  try {
    await fetch(`${webUrl}/api/revalidate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${secret}` },
    });
  } catch (err) {
    logger.warn({ err }, 'Web revalidation webhook failed (non-bloquant)');
  }
}

// POST /api/admin/sites/[id]/publish — pousse draftConfig → config, nettoie le brouillon
export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id } = await ctx.params;

  const site = await prisma.site.findUnique({
    where: { id },
    select: { id: true, slug: true, draftConfig: true, status: true },
  });
  if (!site) return NextResponse.json({ error: 'Site introuvable' }, { status: 404 });
  if (!site.draftConfig) {
    return NextResponse.json({ error: 'Aucun brouillon à publier' }, { status: 400 });
  }

  try {
    const updated = await prisma.site.update({
      where: { id },
      data: {
        config: site.draftConfig as Prisma.InputJsonValue,
        draftConfig: Prisma.DbNull,
        publishedAt: new Date(),
        status: site.status === 'DRAFT' ? 'PUBLISHED' : site.status,
      },
      select: { id: true, config: true, publishedAt: true, status: true },
    });

    // Rafraîchit le site public immédiatement (seulement pour le site jlstudio)
    if (site.slug === 'jlstudio') {
      await triggerWebRevalidation();
    }

    return NextResponse.json({ ok: true, ...updated });
  } catch (err) {
    logger.error({ err, id }, 'Site publish failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
