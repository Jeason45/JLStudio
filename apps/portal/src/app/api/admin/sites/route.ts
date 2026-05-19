import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { siteCreateSchema } from '@/lib/validations';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// GET /api/admin/sites — liste tous les sites (super admin = Jeason gère ses clients + le sien)
export async function GET(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const sites = await prisma.site.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      status: true,
      deployUrl: true,
      thumbnail: true,
      publishedAt: true,
      draftConfig: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { pages: true } },
    },
  });

  // On n'envoie pas le payload draftConfig complet dans la liste — juste un flag hasDraft
  const result = sites.map(({ draftConfig, ...rest }) => ({
    ...rest,
    hasDraft: !!draftConfig,
  }));
  return NextResponse.json(result);
}

// POST /api/admin/sites — créer un nouveau site (= onboarder un nouveau client)
export async function POST(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const body = await req.json();
  const parsed = siteCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const existing = await prisma.site.findUnique({
    where: { slug: parsed.data.slug },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json({ error: 'Slug déjà utilisé' }, { status: 409 });
  }

  try {
    const site = await prisma.site.create({
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description,
        config: (parsed.data.config as object) ?? {},
        status: 'DRAFT',
      },
    });
    return NextResponse.json(site, { status: 201 });
  } catch (err) {
    logger.error({ err }, 'Site create failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
