import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';

/** Lists mail logs of agency contacts. Super-admin only — middleware enforced. */
export async function GET(req: NextRequest) {
  const superAdmin = req.headers.get('x-portal-super-admin') === 'true';
  if (!superAdmin) return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });

  const site = await getAgencySite();
  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get('limit') || '200', 10), 500);

  const emails = await prisma.mailLog.findMany({
    where: {
      contact: { siteId: site.id },
    },
    include: {
      contact: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return NextResponse.json(emails);
}
