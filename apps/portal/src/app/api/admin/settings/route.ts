import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { logger } from '@/lib/logger';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// GET — agency company settings (creates row if missing)
export async function GET(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const site = await getAgencySite();
  let settings = await prisma.portalCompanySettings.findUnique({
    where: { siteId: site.id },
  });
  if (!settings) {
    settings = await prisma.portalCompanySettings.create({
      data: { siteId: site.id, companyName: site.name, country: 'France' },
    });
  }
  return NextResponse.json(settings);
}

// PUT — update settings (upsert)
const updateSchema = z.object({
  companyName: z.string().optional(),
  address: z.string().nullable().optional(),
  zipCode: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  country: z.string().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().email().nullable().optional().or(z.literal('')),
  website: z.string().nullable().optional(),
  siret: z.string().nullable().optional(),
  tvaNumber: z.string().nullable().optional(),
  iban: z.string().nullable().optional(),
  bic: z.string().nullable().optional(),
  logoUrl: z.string().nullable().optional(),
});

export async function PUT(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const site = await getAgencySite();

  try {
    const settings = await prisma.portalCompanySettings.upsert({
      where: { siteId: site.id },
      update: {
        ...parsed.data,
        email: parsed.data.email === '' ? null : parsed.data.email,
      },
      create: {
        siteId: site.id,
        ...parsed.data,
        email: parsed.data.email === '' ? null : parsed.data.email,
      },
    });
    return NextResponse.json(settings);
  } catch (err) {
    logger.error({ err }, 'Settings update failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
