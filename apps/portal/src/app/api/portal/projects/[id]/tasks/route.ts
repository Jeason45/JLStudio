import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId, extractUserRole } from '@/lib/auth';
import { projectTaskCreateSchema } from '@/lib/validations';
import { logActivity } from '@/lib/activity';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  // Verify project belongs to site
  const project = await prisma.portalProject.findFirst({
    where: { id, siteId },
    select: { id: true },
  });
  if (!project) return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });

  const tasks = await prisma.portalProjectTask.findMany({
    where: { projectId: id },
    orderBy: { order: 'asc' },
  });

  return NextResponse.json(tasks);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const role = extractUserRole(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  if (role === 'CLIENT') return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });

  // Verify project belongs to site
  const project = await prisma.portalProject.findFirst({
    where: { id, siteId },
    select: { id: true },
  });
  if (!project) return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });

  const body = await req.json();
  const parsed = projectTaskCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  // Get max order
  const maxOrder = await prisma.portalProjectTask.aggregate({
    where: { projectId: id },
    _max: { order: true },
  });

  const task = await prisma.portalProjectTask.create({
    data: {
      projectId: id,
      title: parsed.data.title,
      status: parsed.data.status || 'TODO',
      order: parsed.data.order ?? ((maxOrder._max.order ?? -1) + 1),
    },
  });

  await logActivity(siteId, userId, 'create', 'project_task', task.id, { projectId: id });
  return NextResponse.json(task, { status: 201 });
}
