import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { pageCreateSchema } from '@/lib/validations';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// GET /api/admin/sites/[id]/pages
export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id: siteId } = await ctx.params;

  const site = await prisma.site.findUnique({ where: { id: siteId }, select: { id: true } });
  if (!site) return NextResponse.json({ error: 'Site introuvable' }, { status: 404 });

  const pages = await prisma.page.findMany({
    where: { siteId },
    orderBy: [{ isHome: 'desc' }, { order: 'asc' }, { createdAt: 'asc' }],
    select: {
      id: true,
      slug: true,
      title: true,
      order: true,
      isHome: true,
      publishedAt: true,
      draftConfig: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const result = pages.map(({ draftConfig, ...rest }) => ({ ...rest, hasDraft: !!draftConfig }));
  return NextResponse.json(result);
}

// POST /api/admin/sites/[id]/pages — créer page
export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;
  const { id: siteId } = await ctx.params;

  const site = await prisma.site.findUnique({ where: { id: siteId }, select: { id: true } });
  if (!site) return NextResponse.json({ error: 'Site introuvable' }, { status: 404 });

  const body = await req.json();
  const parsed = pageCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const conflict = await prisma.page.findUnique({
    where: { siteId_slug: { siteId, slug: parsed.data.slug } },
    select: { id: true },
  });
  if (conflict) {
    return NextResponse.json({ error: 'Slug déjà utilisé pour ce site' }, { status: 409 });
  }

  try {
    // Si on crée une page isHome, on retire le isHome des autres pages du site
    const data = parsed.data;
    const page = await prisma.$transaction(async (tx) => {
      if (data.isHome) {
        await tx.page.updateMany({ where: { siteId, isHome: true }, data: { isHome: false } });
      }
      return tx.page.create({
        data: {
          siteId,
          slug: data.slug,
          title: data.title,
          config: (data.config as object) ?? {},
          order: data.order ?? 0,
          isHome: data.isHome ?? false,
        },
      });
    });
    return NextResponse.json(page, { status: 201 });
  } catch (err) {
    logger.error({ err, siteId }, 'Page create failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
