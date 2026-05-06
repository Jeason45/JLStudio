import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ['/login', '/invite', '/api/auth/login', '/api/auth/logout', '/api/auth/accept-invite', '/sign'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  if (isPublic) {
    return NextResponse.next();
  }

  // Allow static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get('portal-token')?.value;

  if (!token) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const siteId = payload.siteId as string;
    const role = payload.role as string;
    const userId = payload.sub as string;
    const contactId = (payload.contactId as string) || '';
    const superAdmin = payload.superAdmin === true;

    // SuperAdmin bypasses all role restrictions
    if (superAdmin) {
      const response = NextResponse.next();
      response.headers.set('x-portal-site-id', siteId);
      response.headers.set('x-portal-user-role', 'ADMIN');
      response.headers.set('x-portal-user-id', userId);
      response.headers.set('x-portal-super-admin', 'true');
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      return response;
    }

    // /admin/* is super-admin only
    if (pathname.startsWith('/admin')) {
      if (pathname.startsWith('/api')) {
        return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
      }
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Admin-only routes
    if (pathname.startsWith('/settings') && role !== 'ADMIN') {
      if (pathname.startsWith('/api')) {
        return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
      }
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // CLIENT role restrictions — can only access dashboard + their documents
    if (role === 'CLIENT') {
      const clientAllowedPages = ['/dashboard', '/devis', '/factures', '/contrats'];
      const clientAllowedApi = ['/api/portal/stats', '/api/portal/documents', '/api/portal/config'];
      const isAllowedPage = clientAllowedPages.some((p) => pathname === p || pathname.startsWith(p + '/'));
      const isAllowedApi = clientAllowedApi.some((p) => pathname.startsWith(p));

      if (!isAllowedPage && !isAllowedApi) {
        if (pathname.startsWith('/api')) {
          return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
        }
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }

    // Inject tenant info into headers for API routes
    const response = NextResponse.next();
    response.headers.set('x-portal-site-id', siteId);
    response.headers.set('x-portal-user-role', role);
    response.headers.set('x-portal-user-id', userId);
    if (contactId) response.headers.set('x-portal-contact-id', contactId);

    // Security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
  } catch {
    // Invalid token
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.set('portal-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
    return response;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
