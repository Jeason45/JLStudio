import { NextRequest } from 'next/server';

function getAllowedOrigins(): string[] {
  const list = [process.env.NEXT_PUBLIC_PORTAL_URL, process.env.NEXT_PUBLIC_APP_URL];
  if (process.env.NODE_ENV !== 'production') list.push('http://localhost:3002');
  return list.filter((x): x is string => Boolean(x));
}

export function verifyOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const source = origin || referer;
  if (!source) return false;
  const allowed = getAllowedOrigins();
  return allowed.some(o => source.startsWith(o));
}
