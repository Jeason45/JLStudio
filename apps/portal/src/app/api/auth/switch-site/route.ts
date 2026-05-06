import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
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

    const { siteId } = await req.json();
    if (!siteId) {
      return NextResponse.json({ error: 'siteId requis' }, { status: 400 });
    }

    const site = await prisma.site.findUnique({
      where: { id: siteId },
      select: { id: true, name: true },
    });

    if (!site) {
      return NextResponse.json({ error: 'Site introuvable' }, { status: 404 });
    }

    const newToken = await signToken({
      sub: payload.sub as string,
      email: payload.email as string,
      siteId: site.id,
      role: 'ADMIN',
      superAdmin: true,
    });

    const response = NextResponse.json({ success: true, siteName: site.name });
    response.cookies.set('portal-token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
