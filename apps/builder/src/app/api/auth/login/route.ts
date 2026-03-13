import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { loginSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rateLimit';

function getSecret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const { allowed } = rateLimit(`login:${ip}`, 5, 60_000);
    if (!allowed) {
      return NextResponse.json({ error: 'Trop de tentatives, réessayez plus tard' }, { status: 429 });
    }

    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }
    const { email, password } = parsed.data;

    const user = await prisma.builderUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
    }

    // If 2FA is enabled, issue a temporary token that requires TOTP verification
    if (user.totpEnabled && user.totpSecret) {
      const tempToken = await new SignJWT({
        sub: user.id,
        email: user.email,
        pending2fa: true,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('5m')
        .sign(getSecret());

      return NextResponse.json({ requires2fa: true, tempToken });
    }

    // No 2FA — issue full session token
    const token = await new SignJWT({
      sub: user.id,
      email: user.email,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(getSecret());

    const response = NextResponse.json({
      success: true,
      needsSetup2fa: !user.totpEnabled,
    });
    response.cookies.set('builder-token', token, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_APP_URL?.startsWith('https://') ?? false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
