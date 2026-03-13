import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { taskCreateSchema, taskUpdateSchema } from '@/lib/validations';

// GET - Récupérer les tâches (optionnellement filtrées par projet)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    const where = projectId ? { projectId, deletedAt: null } : { deletedAt: null };

    const tasks = await prisma.task.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        section: true,
        dependsOn: true,
        dependedBy: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST - Créer une tâche
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = taskCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const data = parsed.data;

    const task = await prisma.task.create({
      data: {
        projectId: data.projectId,
        title: data.title,
        description: data.description || null,
        status: data.status || 'todo',
        priority: data.priority || 'medium',
        startDate: data.startDate ? new Date(data.startDate) : null,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        duration: data.duration || null,
        estimatedHours: data.estimatedHours ? parseFloat(String(data.estimatedHours)) : null,
        tags: data.tags || null,
        sectionId: data.sectionId || null,
        parentTaskId: data.parentTaskId || null,
        kanbanColumn: data.kanbanColumn || null,
        order: data.order || 0,
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour une tâche
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = taskUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { id, projectId: _projectId, ...restData } = parsed.data;

    // Build update data with proper types
    const updateData: Record<string, unknown> = { ...restData };

    // Parse dates and numbers
    if (restData.startDate) updateData.startDate = new Date(restData.startDate);
    if (restData.dueDate) updateData.dueDate = new Date(restData.dueDate);
    if (restData.estimatedHours) updateData.estimatedHours = parseFloat(String(restData.estimatedHours));
    if (restData.actualHours) updateData.actualHours = parseFloat(String(restData.actualHours));
    if (restData.duration) updateData.duration = parseInt(String(restData.duration));
    if (restData.order !== undefined) updateData.order = parseInt(String(restData.order));

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        section: true,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une tâche
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Task ID manquant' },
        { status: 400 }
      );
    }

    await prisma.task.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
