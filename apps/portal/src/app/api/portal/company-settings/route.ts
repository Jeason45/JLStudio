import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserRole } from '@/lib/auth';
import { companySettingsUpdateSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  let settings = await prisma.portalCompanySettings.findUnique({ where: { siteId } });
  if (!settings) {
    settings = await prisma.portalCompanySettings.create({ data: { siteId } });
  }
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const role = extractUserRole(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  if (role !== 'ADMIN') return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });

  const body = await req.json();
  const parsed = companySettingsUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const settings = await prisma.portalCompanySettings.upsert({
    where: { siteId },
    update: parsed.data,
    create: { siteId, ...parsed.data },
  });

  return NextResponse.json(settings);
}
