import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_API_PATHS = [
  '/api/auth',
  '/api/sign',
  '/api/signatures',
  '/api/storage',
  '/api/contact',
  '/api/leads/create',
  '/api/cron',
];

const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPath = pathname.startsWith('/admin');
  const isApiPath = pathname.startsWith('/api');

  if (!isAdminPath && !isApiPath) {
    const response = NextResponse.next();
    response.headers.set('Content-Security-Policy', CSP_DIRECTIVES);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    return response;
  }

  const isPublicApi = isApiPath && PUBLIC_API_PATHS.some((p) => pathname.startsWith(p));

  // CORS for public API routes
  if (isPublicApi) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || 'https://jlstudio.dev',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight OPTIONS requests
    if (req.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers: corsHeaders });
    }

    const response = NextResponse.next();
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  const token = req.cookies.get('auth-token')?.value;

  if (!token) {
    if (isAdminPath) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    if (isAdminPath) {
      const response = NextResponse.redirect(new URL('/login', req.url));
      response.cookies.set('auth-token', '', { path: '/', maxAge: 0 });
      return response;
    }
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files and Next.js internals:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, robots.txt, sitemap.xml
     * - image files in /images/
     */
    '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|images/).*)',
  ],
};
