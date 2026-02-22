import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { kanbanTaskUpdateSchema } from '@/lib/validations';

// GET /api/kanban/tasks - Récupérer les tâches pour le Kanban avec filtres
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const projectId = searchParams.get('projectId');
    const priority = searchParams.get('priority');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: Record<string, unknown> = {};

    if (projectId && projectId !== 'all') {
      where.projectId = projectId;
    }

    if (priority && priority !== 'all') {
      where.priority = priority;
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            status: true,
            contact: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        section: true,
        dependsOn: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching kanban tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch kanban tasks' },
      { status: 500 }
    );
  }
}

// PUT /api/kanban/tasks - Mettre à jour une tâche (move entre colonnes)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = kanbanTaskUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { id, kanbanColumn, status, order } = parsed.data;

    const updateData: Record<string, unknown> = {};
    if (kanbanColumn !== undefined) updateData.kanbanColumn = kanbanColumn;
    if (status !== undefined) updateData.status = status;
    if (order !== undefined) updateData.order = parseInt(String(order));

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating kanban task:', error);
    return NextResponse.json(
      { error: 'Failed to update kanban task' },
      { status: 500 }
    );
  }
}
