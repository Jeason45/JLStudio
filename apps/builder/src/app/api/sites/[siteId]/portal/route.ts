import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

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

  try {
    const config = await prisma.portalConfig.upsert({
      where: { siteId },
      create: { siteId, ...body },
      update: body,
    });

    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
