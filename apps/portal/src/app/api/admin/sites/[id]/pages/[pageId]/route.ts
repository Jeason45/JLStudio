import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { pageUpdateSchema } from '@/lib/validations';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

async function loadPage(siteId: string, pageId: string) {
  return prisma.page.findFirst({
    where: { id: pageId, siteId },
  });
}

// GET /api/admin/sites/[id]/pages/[pageId]
export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ id: string; pageId: string }> },
) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id: siteId, pageId } = await ctx.params;

  const page = await loadPage(siteId, pageId);
  if (!page) return NextResponse.json({ error: 'Page introuvable' }, { status: 404 });
  return NextResponse.json(page);
}

// PATCH /api/admin/sites/[id]/pages/[pageId] — méta (title, order, isHome)
// Note : le slug est figé après création (URLs publiques stables)
export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string; pageId: string }> },
) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id: siteId, pageId } = await ctx.params;

  const page = await loadPage(siteId, pageId);
  if (!page) return NextResponse.json({ error: 'Page introuvable' }, { status: 404 });

  const body = await req.json();
  const parsed = pageUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const data = parsed.data;
    const updated = await prisma.$transaction(async (tx) => {
      // Une seule page isHome par site : si on bascule cette page sur isHome, on retire des autres
      if (data.isHome === true && !page.isHome) {
        await tx.page.updateMany({
          where: { siteId, isHome: true, NOT: { id: pageId } },
          data: { isHome: false },
        });
      }
      return tx.page.update({ where: { id: pageId }, data });
    });
    return NextResponse.json(updated);
  } catch (err) {
    logger.error({ err, pageId }, 'Page update failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE /api/admin/sites/[id]/pages/[pageId] — suppression définitive
export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ id: string; pageId: string }> },
) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id: siteId, pageId } = await ctx.params;

  const page = await loadPage(siteId, pageId);
  if (!page) return NextResponse.json({ error: 'Page introuvable' }, { status: 404 });

  if (page.isHome) {
    return NextResponse.json(
      { error: "Page d'accueil non supprimable. Désigne une autre page comme accueil d'abord." },
      { status: 400 },
    );
  }

  try {
    await prisma.page.delete({ where: { id: pageId } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error({ err, pageId }, 'Page delete failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
