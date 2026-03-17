import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId, extractUserRole } from '@/lib/auth';
import { projectTaskUpdateSchema } from '@/lib/validations';
import { logActivity } from '@/lib/activity';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; taskId: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const role = extractUserRole(req.headers);
  const { id, taskId } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  if (role === 'CLIENT') return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });

  // Verify project belongs to site
  const project = await prisma.portalProject.findFirst({
    where: { id, siteId },
    select: { id: true },
  });
  if (!project) return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });

  const body = await req.json();
  const parsed = projectTaskUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  if (parsed.data.title !== undefined) data.title = parsed.data.title;
  if (parsed.data.status !== undefined) data.status = parsed.data.status;
  if (parsed.data.order !== undefined) data.order = parsed.data.order;

  const task = await prisma.portalProjectTask.update({
    where: { id: taskId, projectId: id },
    data,
  });

  await logActivity(siteId, userId, 'update', 'project_task', taskId, { projectId: id });
  return NextResponse.json(task);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; taskId: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const role = extractUserRole(req.headers);
  const { id, taskId } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  if (role === 'CLIENT') return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });

  // Verify project belongs to site
  const project = await prisma.portalProject.findFirst({
    where: { id, siteId },
    select: { id: true },
  });
  if (!project) return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });

  await prisma.portalProjectTask.delete({ where: { id: taskId, projectId: id } });
  await logActivity(siteId, userId, 'delete', 'project_task', taskId, { projectId: id });
  return NextResponse.json({ success: true });
}
