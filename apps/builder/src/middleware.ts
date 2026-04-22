import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public paths — no auth required
  if (
    pathname === '/login' ||
    pathname === '/api/auth/login' ||
    pathname === '/api/auth/logout' ||
    pathname === '/api/auth/verify-2fa' ||
    pathname === '/api/auth/reset-password' ||
    pathname.startsWith('/editor/')
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get('builder-token')?.value;

  if (!token) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Block access if 2FA is required but not yet verified
    if (payload.pending2fa) {
      if (pathname.startsWith('/api')) {
        return NextResponse.json({ error: '2FA requis' }, { status: 403 });
      }
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const response = NextResponse.next();
    response.headers.set('x-builder-user-id', payload.sub as string);
    response.headers.set('x-builder-user-email', payload.email as string);
    return response;
  } catch {
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.set('builder-token', '', { path: '/', maxAge: 0 });
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico).*)',
  ],
};
