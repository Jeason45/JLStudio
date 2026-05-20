import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_API_PATHS = [
  '/api/sign',
  '/api/storage',
  '/api/contact',
  '/api/leads/create',
  '/api/cron',
];

const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://analytics.jlstudio.dev",
  "style-src 'self' 'unsafe-inline'",
  // Images externes autorisées (R2 pub-xxx.r2.dev + toute URL HTTPS collée dans l'éditeur)
  "img-src 'self' data: blob: https:",
  "font-src 'self'",
  "connect-src 'self' https://analytics.jlstudio.dev",
  // Autorise l'embed Google Maps de la section Contact
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

export async function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';

  // Redirect www → non-www (301 permanent)
  if (host.startsWith('www.')) {
    const url = req.nextUrl.clone();
    url.host = host.replace(/^www\./, '');
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }

  const { pathname } = req.nextUrl;
  const isApiPath = pathname.startsWith('/api');

  // CORS for public API routes
  if (isApiPath && PUBLIC_API_PATHS.some((p) => pathname.startsWith(p))) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || 'https://jlstudio.dev',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (req.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers: corsHeaders });
    }

    const response = NextResponse.next();
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  // Security headers for all other routes
  const response = NextResponse.next();

  // Route /preview : autorise l'embedding par portal.jlstudio.dev (éditeur CRM)
  // → on remplace frame-ancestors 'none' par 'self' + portal, et on ne met PAS
  // X-Frame-Options DENY (qui aurait priorité sur CSP dans certains navigateurs).
  if (pathname.startsWith('/preview')) {
    const previewCsp = CSP_DIRECTIVES.replace(
      "frame-ancestors 'none'",
      "frame-ancestors 'self' https://portal.jlstudio.dev",
    );
    response.headers.set('Content-Security-Policy', previewCsp);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  response.headers.set('Content-Security-Policy', CSP_DIRECTIVES);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|images/).*)',
  ],
};
