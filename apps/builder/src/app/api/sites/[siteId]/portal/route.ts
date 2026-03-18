import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const updatePortalConfigSchema = z.object({
  logoUrl: z.string().nullable().optional(),
  primaryColor: z.string().optional(),
  onboardingDone: z.boolean().optional(),
  moduleCRM: z.boolean().optional(),
  moduleDevis: z.boolean().optional(),
  moduleFactures: z.boolean().optional(),
  moduleContrats: z.boolean().optional(),
  moduleProjets: z.boolean().optional(),
  moduleCMS: z.boolean().optional(),
  moduleCalendrier: z.boolean().optional(),
});

// GET portal config + users for a site
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;

  try {
    const [config, users, site] = await Promise.all([
      prisma.portalConfig.findUnique({ where: { siteId } }),
      prisma.portalUser.findMany({ where: { siteId }, orderBy: { createdAt: 'desc' } }),
      prisma.site.findUnique({ where: { id: siteId }, select: { name: true, slug: true } }),
    ]);

    return NextResponse.json({
      config,
      users: users.map((u) => ({ ...u, password: undefined })),
      site,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PUT update portal config (modules, branding)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;
  const body = await req.json();

  const parsed = updatePortalConfigSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Données invalides', details: parsed.error.issues }, { status: 400 });
  }

  try {
    const config = await prisma.portalConfig.upsert({
      where: { siteId },
      create: { siteId, ...parsed.data },
      update: parsed.data,
    });

    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
