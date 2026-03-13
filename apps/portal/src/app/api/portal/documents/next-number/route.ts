import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  if (!type || !['DEVIS', 'FACTURE', 'CONTRAT'].includes(type)) {
    return NextResponse.json({ error: 'Type invalide' }, { status: 400 });
  }

  const prefixMap: Record<string, string> = { DEVIS: 'DEV', FACTURE: 'FAC', CONTRAT: 'CON' };
  const prefix = prefixMap[type];
  const year = new Date().getFullYear();

  const counter = await prisma.portalDocumentCounter.findUnique({
    where: { siteId_prefix_year: { siteId, prefix, year } },
  });

  const next = (counter?.last ?? 0) + 1;
  return NextResponse.json({ number: `${prefix}-${year}-${String(next).padStart(3, '0')}` });
}
