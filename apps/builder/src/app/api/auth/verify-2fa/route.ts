import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, SignJWT } from 'jose';
import * as OTPAuth from 'otpauth';
import { prisma } from '@/lib/db';
import { verifyTotpSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rateLimit';

function getSecret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const { allowed } = rateLimit(`2fa:${ip}`, 10, 60_000);
    if (!allowed) {
      return NextResponse.json({ error: 'Trop de tentatives, réessayez plus tard' }, { status: 429 });
    }

    const body = await req.json();
    const parsed = verifyTotpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Code à 6 chiffres requis' }, { status: 400 });
    }
    const { code, tempToken } = parsed.data;

    // Verify the temporary token
    let payload;
    try {
      const result = await jwtVerify(tempToken, getSecret());
      payload = result.payload;
    } catch {
      return NextResponse.json({ error: 'Session expirée, reconnectez-vous' }, { status: 401 });
    }

    if (!payload.pending2fa) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 400 });
    }

    const user = await prisma.builderUser.findUnique({
      where: { id: payload.sub as string },
    });

    if (!user || !user.totpSecret) {
      return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 });
    }

    // Verify TOTP code
    const totp = new OTPAuth.TOTP({
      issuer: 'JL Studio Builder',
      label: user.email,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(user.totpSecret),
    });

    const delta = totp.validate({ token: code, window: 1 });
    if (delta === null) {
      return NextResponse.json({ error: 'Code invalide' }, { status: 401 });
    }

    // Issue full session token
    const sessionToken = await new SignJWT({
      sub: user.id,
      email: user.email,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(getSecret());

    const response = NextResponse.json({ success: true });
    response.cookies.set('builder-token', sessionToken, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_APP_URL?.startsWith('https://') ?? false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error('2FA verify error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
