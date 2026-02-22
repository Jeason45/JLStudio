import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { projectCreateSchema } from '@/lib/validations';

// GET - Récupérer tous les projets
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const contactId = searchParams.get('contactId');
    const priority = searchParams.get('priority');

    const where: Record<string, unknown> = { deletedAt: null };
    if (status && status !== 'all') where.status = status;
    if (contactId) where.contactId = contactId;
    if (priority && priority !== 'all') where.priority = priority;

    const projects = await prisma.project.findMany({
      where,
      include: {
        contact: {
          select: {
            id: true,
            name: true,
            email: true,
            type: true,
          },
        },
        _count: {
          select: {
            tasks: true,
            milestones: true,
            documents: true,
          },
        },
        tasks: {
          select: {
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Auto-calculate progress from tasks for each project
    const projectsWithProgress = projects.map(project => {
      const { tasks, ...rest } = project;
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(t => t.status === 'completed').length;
      const calculatedProgress = totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : rest.progress;
      return {
        ...rest,
        progress: calculatedProgress,
        _taskStats: {
          total: totalTasks,
          completed: completedTasks,
        },
      };
    });

    return NextResponse.json(projectsWithProgress);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau projet
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = projectCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const data = parsed.data;

    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description || null,
        status: data.status || 'planification',
        progress: data.progress || 0,
        priority: data.priority || 'medium',
        projectType: data.projectType || null,
        technologies: data.technologies || null,
        estimatedBudget: data.estimatedBudget ? parseFloat(String(data.estimatedBudget)) : null,
        actualBudget: data.actualBudget ? parseFloat(String(data.actualBudget)) : null,
        notes: data.notes || null,
        contactId: data.contactId || null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
      include: {
        contact: {
          select: {
            id: true,
            name: true,
            email: true,
            type: true,
          },
        },
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
