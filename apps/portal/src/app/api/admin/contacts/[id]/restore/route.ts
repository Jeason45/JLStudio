import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// POST /api/admin/contacts/[id]/restore — sort un contact de la corbeille
export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id } = await ctx.params;
  const site = await getAgencySite();

  const existing = await prisma.contact.findFirst({
    where: { id, siteId: site.id },
    select: { id: true, email: true, deletedAt: true },
  });
  if (!existing) return NextResponse.json({ error: 'Contact introuvable' }, { status: 404 });
  if (existing.deletedAt === null) {
    return NextResponse.json({ error: 'Ce contact n\'est pas dans la corbeille' }, { status: 400 });
  }

  // Vérifie qu'aucun contact actif n'a déjà cet email (sinon conflit de contrainte unique)
  const conflict = await prisma.contact.findFirst({
    where: { siteId: site.id, email: existing.email, deletedAt: null, NOT: { id } },
    select: { id: true },
  });
  if (conflict) {
    return NextResponse.json(
      { error: 'Un contact actif utilise déjà cet email. Impossible de restaurer.' },
      { status: 409 },
    );
  }

  const restored = await prisma.contact.update({
    where: { id },
    data: { deletedAt: null },
  });
  return NextResponse.json({ ok: true, contact: restored });
}
