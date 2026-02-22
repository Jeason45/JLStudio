import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Récupérer les tâches (optionnellement filtrées par projet)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    const where = projectId ? { projectId } : {};

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

    if (!body.projectId || !body.title) {
      return NextResponse.json(
        { error: 'projectId et title sont requis' },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        projectId: body.projectId,
        title: body.title,
        description: body.description || null,
        status: body.status || 'todo',
        priority: body.priority || 'medium',
        startDate: body.startDate ? new Date(body.startDate) : null,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        duration: body.duration || null,
        estimatedHours: body.estimatedHours ? parseFloat(body.estimatedHours) : null,
        tags: body.tags || null,
        sectionId: body.sectionId || null,
        parentTaskId: body.parentTaskId || null,
        kanbanColumn: body.kanbanColumn || null,
        order: body.order || 0,
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
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Task ID manquant' },
        { status: 400 }
      );
    }

    // Parse dates
    if (updateData.startDate) updateData.startDate = new Date(updateData.startDate);
    if (updateData.dueDate) updateData.dueDate = new Date(updateData.dueDate);
    if (updateData.estimatedHours) updateData.estimatedHours = parseFloat(updateData.estimatedHours);
    if (updateData.actualHours) updateData.actualHours = parseFloat(updateData.actualHours);
    if (updateData.duration) updateData.duration = parseInt(updateData.duration);
    if (updateData.order !== undefined) updateData.order = parseInt(updateData.order);

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

    await prisma.task.delete({
      where: { id },
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
