import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/projects/[id]/tasks - Récupérer toutes les tâches d'un projet
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tasks = await prisma.task.findMany({
      where: { projectId: id },
      include: {
        section: true,
        dependsOn: true,
        dependedBy: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'asc' },
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

// POST /api/projects/[id]/tasks - Créer une nouvelle tâche
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const task = await prisma.task.create({
      data: {
        projectId: id,
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
        isCriticalPath: body.isCriticalPath || false,
        order: body.order || 0,
      },
    });

    // Create dependencies if provided
    if (body.dependencies && Array.isArray(body.dependencies)) {
      for (const depId of body.dependencies) {
        await prisma.taskDependency.create({
          data: {
            dependentTaskId: task.id,
            predecessorTaskId: depId,
            type: 'finish_to_start',
            lag: 0,
          },
        });
      }
    }

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
