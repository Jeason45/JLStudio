import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@jlstudio/database';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { pageDraftSchema } from '@/lib/validations';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

function mergeConfig(
  current: unknown,
  patch: Record<string, unknown>,
): Record<string, unknown> {
  const base = current && typeof current === 'object' ? (current as Record<string, unknown>) : {};
  return { ...base, ...patch };
}

// PATCH /api/admin/sites/[id]/pages/[pageId]/draft — auto-save brouillon (merge incrémental)
export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string; pageId: string }> },
) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id: siteId, pageId } = await ctx.params;

  const page = await prisma.page.findFirst({
    where: { id: pageId, siteId },
    select: { id: true, config: true, draftConfig: true },
  });
  if (!page) return NextResponse.json({ error: 'Page introuvable' }, { status: 404 });

  const body = await req.json();
  const parsed = pageDraftSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Si pas de brouillon en cours, on initialise depuis le config live
  const baseDraft = page.draftConfig ?? page.config;
  const merged = mergeConfig(baseDraft, parsed.data.config);

  try {
    const updated = await prisma.page.update({
      where: { id: pageId },
      data: { draftConfig: merged as Prisma.InputJsonValue },
      select: { id: true, draftConfig: true, updatedAt: true },
    });
    return NextResponse.json({ ok: true, draftConfig: updated.draftConfig, savedAt: updated.updatedAt });
  } catch (err) {
    logger.error({ err, pageId }, 'Page draft save failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE /api/admin/sites/[id]/pages/[pageId]/draft — annule modifs en cours
export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ id: string; pageId: string }> },
) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id: siteId, pageId } = await ctx.params;

  const page = await prisma.page.findFirst({
    where: { id: pageId, siteId },
    select: { id: true },
  });
  if (!page) return NextResponse.json({ error: 'Page introuvable' }, { status: 404 });

  try {
    await prisma.page.update({ where: { id: pageId }, data: { draftConfig: Prisma.DbNull } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error({ err, pageId }, 'Page draft discard failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
