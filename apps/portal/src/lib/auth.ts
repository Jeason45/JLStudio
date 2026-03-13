import { SignJWT, jwtVerify } from 'jose';

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET is not set');
  return new TextEncoder().encode(secret);
}

export interface TokenPayload {
  sub: string;
  email: string;
  siteId: string;
  role: 'ADMIN' | 'CLIENT' | 'EDITOR';
}

export async function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as unknown as TokenPayload;
}

export function extractSiteId(headers: Headers): string | null {
  return headers.get('x-portal-site-id');
}

export function extractUserRole(headers: Headers): string | null {
  return headers.get('x-portal-user-role');
}

export function extractUserId(headers: Headers): string | null {
  return headers.get('x-portal-user-id');
}
