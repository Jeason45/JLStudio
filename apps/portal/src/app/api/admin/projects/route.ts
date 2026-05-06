import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { logger } from '@/lib/logger';

const STATUSES = ['PLANNING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELLED'] as const;

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// GET — list agency projects
export async function GET(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const site = await getAgencySite();
  const projects = await prisma.portalProject.findMany({
    where: { siteId: site.id, deletedAt: null },
    select: {
      id: true, name: true, description: true, status: true, priority: true,
      projectType: true, contactId: true,
      startDate: true, endDate: true, dueDate: true,
      estimatedBudget: true, actualBudget: true, progress: true,
      notes: true, createdAt: true, updatedAt: true,
      contact: { select: { id: true, name: true, email: true, companyName: true } },
      _count: { select: { tasks: true, milestones: true } },
    },
    orderBy: { updatedAt: 'desc' },
    take: 200,
  });
  return NextResponse.json(projects);
}

// POST — create project
const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(STATUSES).optional().default('PLANNING'),
  priority: z.string().optional().default('medium'),
  projectType: z.string().optional(),
  contactId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  estimatedBudget: z.number().nullable().optional(),
  notes: z.string().optional(),
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
  const data = parsed.data;
  const site = await getAgencySite();

  if (data.contactId) {
    const contact = await prisma.contact.findFirst({
      where: { id: data.contactId, siteId: site.id, deletedAt: null },
      select: { id: true },
    });
    if (!contact) return NextResponse.json({ error: 'Contact introuvable' }, { status: 404 });
  }

  try {
    const project = await prisma.portalProject.create({
      data: {
        siteId: site.id,
        name: data.name,
        description: data.description,
        status: data.status,
        priority: data.priority,
        projectType: data.projectType,
        contactId: data.contactId,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        estimatedBudget: data.estimatedBudget ?? null,
        notes: data.notes,
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    logger.error({ err }, 'Project create failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PATCH — update project
const updateSchema = z.object({
  id: z.string().min(1),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  status: z.enum(STATUSES).optional(),
  priority: z.string().nullable().optional(),
  projectType: z.string().nullable().optional(),
  contactId: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  estimatedBudget: z.number().nullable().optional(),
  actualBudget: z.number().nullable().optional(),
  progress: z.number().int().min(0).max(100).optional(),
  notes: z.string().nullable().optional(),
});

export async function PATCH(req: NextRequest) {
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
  const existing = await prisma.portalProject.findFirst({
    where: { id, siteId: site.id, deletedAt: null },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });

  try {
    const project = await prisma.portalProject.update({
      where: { id },
      data: {
        ...updates,
        startDate: updates.startDate !== undefined ? (updates.startDate ? new Date(updates.startDate) : null) : undefined,
        endDate: updates.endDate !== undefined ? (updates.endDate ? new Date(updates.endDate) : null) : undefined,
      },
    });
    return NextResponse.json(project);
  } catch (err) {
    logger.error({ err, id }, 'Project update failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE — soft delete
export async function DELETE(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });

  const site = await getAgencySite();
  const existing = await prisma.portalProject.findFirst({
    where: { id, siteId: site.id, deletedAt: null },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });

  await prisma.portalProject.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  return NextResponse.json({ ok: true });
}
