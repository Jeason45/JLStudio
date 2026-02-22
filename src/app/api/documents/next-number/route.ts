import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/documents/next-number?type=devis|facture|contrat
 * Returns the next sequential document number and increments the counter.
 * Format: DEV-2026-001, FAC-2026-001, or CON-2026-001
 */
export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get('type') || 'devis';

    const prefixes: Record<string, string> = {
      devis: 'DEV',
      facture: 'FAC',
      contrat: 'CON',
    };

    if (!prefixes[type]) {
      return NextResponse.json(
        { error: 'Type invalide. Utilisez "devis", "facture" ou "contrat"' },
        { status: 400 }
      );
    }

    const year = new Date().getFullYear();
    const prefix = prefixes[type];
    const counterId = `${type}_${year}`;

    // Atomic upsert + increment
    const counter = await prisma.documentCounter.upsert({
      where: { id: counterId },
      update: { counter: { increment: 1 } },
      create: { id: counterId, type, year, counter: 1 },
    });

    const number = `${prefix}-${year}-${String(counter.counter).padStart(3, '0')}`;

    return NextResponse.json({ number, counter: counter.counter });
  } catch (error) {
    console.error('Erreur GET /api/documents/next-number:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}
