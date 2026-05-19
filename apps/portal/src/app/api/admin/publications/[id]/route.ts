import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { logger } from '@/lib/logger';
import { postCampaignUpdateSchema } from '@/lib/validations';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// GET /api/admin/publications/[id]
export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id } = await ctx.params;
  const site = await getAgencySite();

  const campaign = await prisma.postCampaign.findFirst({
    where: { id, siteId: site.id, deletedAt: null },
    include: {
      targets: {
        include: {
          media: {
            include: { media: true },
            orderBy: { position: 'asc' },
          },
        },
        orderBy: { createdAt: 'asc' },
      },
      author: { select: { id: true, email: true, name: true } },
    },
  });

  if (!campaign) {
    return NextResponse.json({ error: 'Publication introuvable' }, { status: 404 });
  }
  return NextResponse.json(campaign);
}

// PATCH /api/admin/publications/[id]
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id } = await ctx.params;
  const site = await getAgencySite();

  const existing = await prisma.postCampaign.findFirst({
    where: { id, siteId: site.id, deletedAt: null },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'Publication introuvable' }, { status: 404 });

  const body = await req.json();
  const parsed = postCampaignUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const campaign = await prisma.postCampaign.update({
      where: { id },
      data: parsed.data,
      include: {
        targets: {
          include: { media: { include: { media: true }, orderBy: { position: 'asc' } } },
          orderBy: { createdAt: 'asc' },
        },
        author: { select: { id: true, email: true, name: true } },
      },
    });
    return NextResponse.json(campaign);
  } catch (err) {
    logger.error({ err, id }, 'PostCampaign update failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE /api/admin/publications/[id] — soft-delete
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id } = await ctx.params;
  const site = await getAgencySite();

  const existing = await prisma.postCampaign.findFirst({
    where: { id, siteId: site.id, deletedAt: null },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'Publication introuvable' }, { status: 404 });

  // Soft-delete : on ne bloque PAS si des targets sont en PUBLISHING.
  // Le cron stale-lease libérera les zombies, et les callbacks n8n
  // (/published, /failed) ne renverront plus les targets dans /pending
  // car le filtre exclut deletedAt non null.
  await prisma.postCampaign.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  return NextResponse.json({ ok: true });
}
