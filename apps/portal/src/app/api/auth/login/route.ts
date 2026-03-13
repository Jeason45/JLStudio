import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import { loginSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const { allowed } = rateLimit(`portal-login:${ip}`, 5, 60_000);
    if (!allowed) {
      return NextResponse.json({ error: 'Trop de requetes, reessayez plus tard' }, { status: 429 });
    }

    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password, siteSlug } = parsed.data;

    // Find the site by slug
    const site = await prisma.site.findUnique({
      where: { slug: siteSlug },
    });

    if (!site) {
      return NextResponse.json({ error: 'Site introuvable' }, { status: 404 });
    }

    // Find the portal user for this site
    const user = await prisma.portalUser.findUnique({
      where: { siteId_email: { siteId: site.id, email: email.toLowerCase() } },
    });

    if (!user || !user.active || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
    }

    const token = await signToken({
      sub: user.id,
      email: user.email,
      siteId: site.id,
      role: user.role,
    });

    const response = NextResponse.json({ success: true, role: user.role });
    response.cookies.set('portal-token', token, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_APP_URL?.startsWith('https://') ?? false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error('Portal login error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
