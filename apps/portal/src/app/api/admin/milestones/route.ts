import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { logger } from '@/lib/logger';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// ─── GET — milestones of a project (or all agency milestones) ───
export async function GET(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const site = await getAgencySite();
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');

  const where: Record<string, unknown> = { project: { siteId: site.id, deletedAt: null } };
  if (projectId) where.projectId = projectId;

  const milestones = await prisma.portalMilestone.findMany({
    where,
    orderBy: { date: 'asc' },
  });
  return NextResponse.json(milestones);
}

// ─── POST — create milestone ───
const createSchema = z.object({
  projectId: z.string().min(1),
  name: z.string().min(1),
  date: z.string().min(1),
  status: z.string().optional().default('pending'),
  color: z.string().nullable().optional(),
});

export async function POST(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const site = await getAgencySite();
  const project = await prisma.portalProject.findFirst({
    where: { id: parsed.data.projectId, siteId: site.id, deletedAt: null },
    select: { id: true },
  });
  if (!project) return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });

  try {
    const milestone = await prisma.portalMilestone.create({
      data: {
        ...parsed.data,
        date: new Date(parsed.data.date),
      },
    });
    return NextResponse.json(milestone, { status: 201 });
  } catch (err) {
    logger.error({ err }, 'Milestone create failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// ─── DELETE — delete milestone ───
export async function DELETE(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });

  const site = await getAgencySite();
  const existing = await prisma.portalMilestone.findFirst({
    where: { id, project: { siteId: site.id } },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'Milestone introuvable' }, { status: 404 });

  await prisma.portalMilestone.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
