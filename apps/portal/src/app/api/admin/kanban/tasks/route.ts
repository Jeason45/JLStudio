import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { logger } from '@/lib/logger';

const STATUSES = ['TODO', 'IN_PROGRESS', 'DONE'] as const;
const PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// ─── GET — list tasks of agency projects ───
export async function GET(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const site = await getAgencySite();
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');
  const priority = searchParams.get('priority');
  const search = searchParams.get('search');

  const where: Record<string, unknown> = {
    project: { siteId: site.id, deletedAt: null },
    deletedAt: null,
  };
  if (projectId && projectId !== 'all') where.projectId = projectId;
  if (priority && priority !== 'all') where.priority = priority;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  const tasks = await prisma.portalProjectTask.findMany({
    where,
    include: {
      project: {
        select: {
          id: true, name: true, status: true,
          contact: { select: { id: true, name: true, email: true } },
        },
      },
    },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json(tasks);
}

// ─── POST — create task ───
const createSchema = z.object({
  projectId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(PRIORITIES).optional().default('medium'),
  status: z.enum(STATUSES).optional().default('TODO'),
  kanbanColumn: z.string().optional().default('backlog'),
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
    const task = await prisma.portalProjectTask.create({
      data: parsed.data,
    });
    return NextResponse.json(task, { status: 201 });
  } catch (err) {
    logger.error({ err }, 'Kanban task create failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// ─── PUT — move/update task ───
const updateSchema = z.object({
  id: z.string().min(1),
  kanbanColumn: z.string().optional(),
  status: z.enum(STATUSES).optional(),
  order: z.number().int().optional(),
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  priority: z.enum(PRIORITIES).optional(),
  dueDate: z.string().nullable().optional(),
});

export async function PUT(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const { id, ...updates } = parsed.data;

  const site = await getAgencySite();
  const existing = await prisma.portalProjectTask.findFirst({
    where: { id, project: { siteId: site.id }, deletedAt: null },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'Tache introuvable' }, { status: 404 });

  try {
    const updated = await prisma.portalProjectTask.update({
      where: { id },
      data: {
        ...updates,
        dueDate: updates.dueDate !== undefined ? (updates.dueDate ? new Date(updates.dueDate) : null) : undefined,
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    logger.error({ err, id }, 'Kanban task update failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// ─── DELETE — soft delete task ───
export async function DELETE(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });

  const site = await getAgencySite();
  const existing = await prisma.portalProjectTask.findFirst({
    where: { id, project: { siteId: site.id }, deletedAt: null },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'Tache introuvable' }, { status: 404 });

  await prisma.portalProjectTask.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  return NextResponse.json({ ok: true });
}
