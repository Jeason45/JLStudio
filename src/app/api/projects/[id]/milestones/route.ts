import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Récupérer tous les jalons d'un projet
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const milestones = await prisma.milestone.findMany({
      where: { projectId: id },
      orderBy: { date: 'asc' },
    });

    return NextResponse.json(milestones);
  } catch (error) {
    console.error('Erreur lors de la recuperation des jalons:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la recuperation des jalons' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau jalon
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, date, color } = body;

    if (!name || !date) {
      return NextResponse.json(
        { error: 'Le nom et la date sont requis' },
        { status: 400 }
      );
    }

    const milestone = await prisma.milestone.create({
      data: {
        projectId: id,
        name,
        date: new Date(date),
        color: color || '#EF4444',
      },
    });

    return NextResponse.json(milestone);
  } catch (error) {
    console.error('Erreur lors de la creation du jalon:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la creation du jalon' },
      { status: 500 }
    );
  }
}
