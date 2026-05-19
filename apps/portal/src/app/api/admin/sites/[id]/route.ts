import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { siteUpdateSchema } from '@/lib/validations';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// GET /api/admin/sites/[id]
export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id } = await ctx.params;

  const site = await prisma.site.findUnique({
    where: { id },
    include: {
      _count: { select: { pages: true, contacts: true, leads: true, postCampaigns: true } },
    },
  });
  if (!site) return NextResponse.json({ error: 'Site introuvable' }, { status: 404 });
  return NextResponse.json(site);
}

// PATCH /api/admin/sites/[id] — méta uniquement (name, description, status, deployUrl, thumbnail)
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id } = await ctx.params;

  const existing = await prisma.site.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: 'Site introuvable' }, { status: 404 });

  const body = await req.json();
  const parsed = siteUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const site = await prisma.site.update({ where: { id }, data: parsed.data });
    return NextResponse.json(site);
  } catch (err) {
    logger.error({ err, id }, 'Site update failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE /api/admin/sites/[id] — soft delete (status=ARCHIVED), ne touche pas aux pages
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id } = await ctx.params;

  const existing = await prisma.site.findUnique({ where: { id }, select: { id: true, status: true } });
  if (!existing) return NextResponse.json({ error: 'Site introuvable' }, { status: 404 });

  try {
    await prisma.site.update({ where: { id }, data: { status: 'ARCHIVED' } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error({ err, id }, 'Site archive failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
