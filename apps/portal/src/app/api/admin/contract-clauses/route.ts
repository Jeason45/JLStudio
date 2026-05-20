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

const clauseSchema = z.object({
  category: z.enum(CATEGORIES),
  title: z.string().min(1, 'Titre requis'),
  body: z.string().min(1, 'Texte requis'),
  defaultOrder: z.number().int().optional(),
  autoInclude: z.boolean().optional(),
  conditionKey: z.string().nullable().optional(),
  active: z.boolean().optional(),
});

// GET — liste des clauses de l'agence
export async function GET(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const site = await getAgencySite();
  const clauses = await prisma.contractClause.findMany({
    where: { siteId: site.id },
    orderBy: [{ defaultOrder: 'asc' }, { createdAt: 'asc' }],
  });
  return NextResponse.json(clauses);
}

// POST — créer une clause
export async function POST(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const body = await req.json();
  const parsed = clauseSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const site = await getAgencySite();
  const clause = await prisma.contractClause.create({
    data: {
      siteId: site.id,
      category: parsed.data.category,
      title: parsed.data.title,
      body: parsed.data.body,
      defaultOrder: parsed.data.defaultOrder ?? 100,
      autoInclude: parsed.data.autoInclude ?? true,
      conditionKey: parsed.data.conditionKey ?? null,
      active: parsed.data.active ?? true,
    },
  });
  return NextResponse.json(clause, { status: 201 });
}
