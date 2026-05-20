import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';

const CATEGORIES = [
  'OBJET', 'DUREE', 'FINANCIER', 'PROPRIETE_INTELLECTUELLE', 'RGPD',
  'MAINTENANCE', 'CONFIDENTIALITE', 'RESILIATION', 'DROIT_APPLICABLE', 'AUTRE',
] as const;

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

const updateSchema = z.object({
  category: z.enum(CATEGORIES).optional(),
  title: z.string().min(1).optional(),
  body: z.string().min(1).optional(),
  defaultOrder: z.number().int().optional(),
  autoInclude: z.boolean().optional(),
  conditionKey: z.string().nullable().optional(),
  active: z.boolean().optional(),
});

// PATCH — modifier une clause
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const { id } = await params;
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const site = await getAgencySite();
  const existing = await prisma.contractClause.findFirst({ where: { id, siteId: site.id } });
  if (!existing) return NextResponse.json({ error: 'Clause introuvable' }, { status: 404 });

  const clause = await prisma.contractClause.update({
    where: { id },
    data: parsed.data,
  });
  return NextResponse.json(clause);
}

// DELETE — supprimer une clause
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const { id } = await params;
  const site = await getAgencySite();
  const existing = await prisma.contractClause.findFirst({ where: { id, siteId: site.id } });
  if (!existing) return NextResponse.json({ error: 'Clause introuvable' }, { status: 404 });

  await prisma.contractClause.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
