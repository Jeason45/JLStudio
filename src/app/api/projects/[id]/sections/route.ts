import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { taskSectionCreateSchema } from '@/lib/validations';

// GET - Récupérer toutes les sections d'un projet
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const sections = await prisma.taskSection.findMany({
      where: { projectId: id },
      include: {
        tasks: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error('Erreur lors de la recuperation des sections:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la recuperation des sections' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle section
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = taskSectionCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { name, color, order } = parsed.data;

    const section = await prisma.taskSection.create({
      data: {
        projectId: id,
        name,
        color: color || '#6366f1',
        order: order !== undefined ? order : 0,
      },
      include: {
        tasks: true,
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error('Erreur lors de la creation de la section:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la creation de la section' },
      { status: 500 }
    );
  }
}
