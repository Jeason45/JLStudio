import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserRole } from '@/lib/auth';
import { onboardingSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const role = extractUserRole(req.headers);

  if (!siteId) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }

  if (role !== 'ADMIN') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  const body = await req.json();
  const parsed = onboardingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const config = await prisma.portalConfig.upsert({
    where: { siteId },
    update: {
      ...parsed.data,
      onboardingDone: true,
    },
    create: {
      siteId,
      ...parsed.data,
      onboardingDone: true,
    },
  });

  return NextResponse.json(config);
}
