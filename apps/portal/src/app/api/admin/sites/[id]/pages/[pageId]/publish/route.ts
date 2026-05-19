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

// POST /api/admin/sites/[id]/pages/[pageId]/publish
// Pousse draftConfig → config, nettoie le brouillon, set publishedAt
export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ id: string; pageId: string }> },
) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id: siteId, pageId } = await ctx.params;

  const page = await prisma.page.findFirst({
    where: { id: pageId, siteId },
    select: { id: true, draftConfig: true },
  });
  if (!page) return NextResponse.json({ error: 'Page introuvable' }, { status: 404 });
  if (!page.draftConfig) {
    return NextResponse.json({ error: 'Aucun brouillon à publier' }, { status: 400 });
  }

  try {
    const updated = await prisma.page.update({
      where: { id: pageId },
      data: {
        config: page.draftConfig as Prisma.InputJsonValue,
        draftConfig: Prisma.DbNull,
        publishedAt: new Date(),
      },
      select: { id: true, config: true, publishedAt: true },
    });
    return NextResponse.json({ ok: true, ...updated });
  } catch (err) {
    logger.error({ err, pageId }, 'Page publish failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
