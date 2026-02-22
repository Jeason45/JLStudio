import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Récupérer un projet spécifique
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        contact: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            type: true,
            status: true,
          },
        },
        tasks: {
          orderBy: { order: 'asc' },
          include: {
            section: true,
            dependsOn: true,
            dependedBy: true,
          },
        },
        taskSections: {
          orderBy: { order: 'asc' },
          include: {
            tasks: {
              orderBy: { order: 'asc' },
            },
          },
        },
        milestones: {
          orderBy: { date: 'asc' },
        },
        documents: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Projet introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PATCH - Mettre à jour un projet
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    const updateData: Record<string, unknown> = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.progress !== undefined) updateData.progress = parseInt(data.progress);
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.projectType !== undefined) updateData.projectType = data.projectType;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.technologies !== undefined) updateData.technologies = data.technologies;

    if (data.estimatedBudget !== undefined) {
      updateData.estimatedBudget = data.estimatedBudget ? parseFloat(data.estimatedBudget) : null;
    }
    if (data.actualBudget !== undefined) {
      updateData.actualBudget = data.actualBudget ? parseFloat(data.actualBudget) : null;
    }

    if (data.contactId !== undefined) {
      updateData.contactId = data.contactId || null;
    }

    if (data.startDate !== undefined) {
      updateData.startDate = data.startDate ? new Date(data.startDate) : null;
    }
    if (data.endDate !== undefined) {
      updateData.endDate = data.endDate ? new Date(data.endDate) : null;
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
      include: {
        contact: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            type: true,
            status: true,
          },
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un projet
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Projet supprime avec succes' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
