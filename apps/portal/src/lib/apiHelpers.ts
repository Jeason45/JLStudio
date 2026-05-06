// Lightweight helpers to standardize API route patterns.
// Use in NEW routes; existing 28 routes continue to work as-is.

import { NextRequest, NextResponse } from 'next/server';
import type { z } from 'zod';
import { requirePortalAccess, type PortalAccess } from './auth';

// ─── Authorization wrappers ─────────────────────────────────────────────

/** Returns PortalAccess context, or sends a 401/403 error response. */
export function requireSite(
  req: NextRequest,
): { ok: true; auth: PortalAccess } | { ok: false; res: NextResponse } {
  const auth = requirePortalAccess(req.headers);
  if ('error' in auth) {
    return { ok: false, res: NextResponse.json({ error: auth.error }, { status: auth.status }) };
  }
  return { ok: true, auth };
}

/** Same as requireSite but rejects role 'CLIENT' with 403. Use for write endpoints. */
export function requireWriter(
  req: NextRequest,
): { ok: true; auth: PortalAccess } | { ok: false; res: NextResponse } {
  const result = requireSite(req);
  if (!result.ok) return result;
  if (result.auth.role === 'CLIENT') {
    return { ok: false, res: NextResponse.json({ error: 'Acces refuse' }, { status: 403 }) };
  }
  return result;
}

// ─── Body validation ────────────────────────────────────────────────────

/** Parse + validate a JSON body against a Zod schema. */
export async function parseBody<T extends z.ZodType>(
  req: NextRequest,
  schema: T,
): Promise<{ ok: true; data: z.infer<T> } | { ok: false; res: NextResponse }> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return { ok: false, res: NextResponse.json({ error: 'JSON invalide' }, { status: 400 }) };
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      res: NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      ),
    };
  }
  return { ok: true, data: parsed.data };
}

// ─── Error response helpers ─────────────────────────────────────────────

export function notFound(message = 'Introuvable'): NextResponse {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function forbidden(message = 'Acces refuse'): NextResponse {
  return NextResponse.json({ error: message }, { status: 403 });
}

export function conflict(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 409 });
}
