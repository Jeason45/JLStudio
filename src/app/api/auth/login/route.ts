import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

function getSecret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET);
}

function getUsers() {
  return [
    { email: process.env.AUTH_USER_1_EMAIL, password: process.env.AUTH_USER_1_PASSWORD },
    { email: process.env.AUTH_USER_2_EMAIL, password: process.env.AUTH_USER_2_PASSWORD },
  ].filter((u) => u.email && u.password);
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const users = getUsers();

    const user = users.find(
      (u) => u.email!.toLowerCase() === email?.toLowerCase() && u.password === password
    );

    if (!user) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
    }

    const token = await new SignJWT({ email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(getSecret());

    const response = NextResponse.json({ success: true });
    response.cookies.set('auth-token', token, {
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
