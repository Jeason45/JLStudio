import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('portal-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (!payload.superAdmin) {
      return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
    }

    const sites = await prisma.site.findMany({
      select: { id: true, name: true, slug: true, status: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(sites);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
