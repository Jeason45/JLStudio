import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@jlstudio/database';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { siteDraftSchema } from '@/lib/validations';

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

// PATCH /api/admin/sites/[id]/draft — merge incrémental dans draftConfig
// Body: { config: { ...champs modifiés depuis le dernier auto-save... } }
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id } = await ctx.params;

  const site = await prisma.site.findUnique({
    where: { id },
    select: { id: true, config: true, draftConfig: true },
  });
  if (!site) return NextResponse.json({ error: 'Site introuvable' }, { status: 404 });

  const body = await req.json();
  const parsed = siteDraftSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Si pas encore de brouillon, partir d'un clone du config live (le user édite "à partir de")
  const baseDraft = site.draftConfig ?? site.config;
  const merged = mergeConfig(baseDraft, parsed.data.config);

  try {
    const updated = await prisma.site.update({
      where: { id },
      data: { draftConfig: merged as Prisma.InputJsonValue },
      select: { id: true, draftConfig: true, updatedAt: true },
    });
    return NextResponse.json({ ok: true, draftConfig: updated.draftConfig, savedAt: updated.updatedAt });
  } catch (err) {
    logger.error({ err, id }, 'Site draft save failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE /api/admin/sites/[id]/draft — annule les modifs en cours
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id } = await ctx.params;

  const existing = await prisma.site.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: 'Site introuvable' }, { status: 404 });

  try {
    await prisma.site.update({ where: { id }, data: { draftConfig: Prisma.DbNull } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error({ err, id }, 'Site draft discard failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
