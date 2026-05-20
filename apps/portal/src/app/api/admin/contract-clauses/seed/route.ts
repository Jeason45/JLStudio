import { NextRequest, NextResponse } from 'next/server';
import { getAgencySite } from '@/lib/agencySite';
import { seedDefaultClauses } from '@/lib/contractClauses';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// POST — initialise la bibliothèque avec les clauses par défaut (si vide)
export async function POST(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const site = await getAgencySite();
  const created = await seedDefaultClauses(site.id);
  return NextResponse.json({ created });
}
