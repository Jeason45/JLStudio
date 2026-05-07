import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';

const PREFIX_MAP: Record<string, string> = {
  DEVIS: 'DEV',
  FACTURE: 'FAC',
  CONTRAT: 'CON',
};

/**
 * Returns the next available document number for the given type, peeking
 * (without incrementing) the PortalDocumentCounter row for the current year.
 *
 * Format: PREFIX-YYYY-NNN (e.g. DEV-2026-001)
 *
 * The actual increment happens atomically when the document is saved
 * (in /api/admin/documents/generate POST flow).
 */
export async function GET(req: NextRequest) {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const typeRaw = (searchParams.get('type') || 'devis').toUpperCase();
  const type = typeRaw === 'DEV' ? 'DEVIS' : typeRaw === 'FAC' ? 'FACTURE' : typeRaw === 'CON' ? 'CONTRAT' : typeRaw;
  const prefix = PREFIX_MAP[type];
  if (!prefix) return NextResponse.json({ error: 'Type invalide' }, { status: 400 });

  const site = await getAgencySite();
  const year = new Date().getFullYear();

  const counter = await prisma.portalDocumentCounter.findUnique({
    where: { siteId_prefix_year: { siteId: site.id, prefix, year } },
    select: { last: true },
  });

  const next = (counter?.last ?? 0) + 1;
  const number = `${prefix}-${year}-${String(next).padStart(3, '0')}`;
  return NextResponse.json({ number, prefix, year, next });
}
