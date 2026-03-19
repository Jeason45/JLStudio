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
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://analytics.jlstudio.dev",
  "frame-src 'none'",
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
