import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId, extractUserRole } from '@/lib/auth';
import { projectCreateSchema } from '@/lib/validations';
import { logActivity } from '@/lib/activity';

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

  const where: Record<string, unknown> = { siteId };
  if (status) {
    where.status = status;
  }

  const projects = await prisma.portalProject.findMany({
    where,
    include: {
      contact: { select: { id: true, firstName: true, lastName: true, email: true } },
      _count: { select: { tasks: true } },
      tasks: { select: { status: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const result = projects.map((p) => {
    const tasksDone = p.tasks.filter((t) => t.status === 'DONE').length;
    return {
      ...p,
      tasks: undefined,
      _tasksDone: tasksDone,
    };
  });

  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const role = extractUserRole(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  if (role === 'CLIENT') return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });

  const body = await req.json();
  const parsed = projectCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const project = await prisma.portalProject.create({
    data: {
      siteId,
      name: parsed.data.name,
      description: parsed.data.description,
      contactId: parsed.data.contactId || null,
      dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
    },
    include: {
      contact: { select: { id: true, firstName: true, lastName: true, email: true } },
      _count: { select: { tasks: true } },
    },
  });

  await logActivity(siteId, userId, 'create', 'project', project.id);
  return NextResponse.json(project, { status: 201 });
}
