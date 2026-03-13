import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserRole } from '@/lib/auth';
import { portalConfigUpdateSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  if (!siteId) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }

  let config = await prisma.portalConfig.findUnique({
    where: { siteId },
  });

  if (!config) {
    config = await prisma.portalConfig.create({
      data: { siteId },
    });
  }

  return NextResponse.json(config);
}

export async function PUT(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const role = extractUserRole(req.headers);

  if (!siteId) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }

  if (role !== 'ADMIN') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  const body = await req.json();
  const parsed = portalConfigUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const config = await prisma.portalConfig.upsert({
    where: { siteId },
    update: parsed.data,
    create: { siteId, ...parsed.data },
  });

  return NextResponse.json(config);
}
