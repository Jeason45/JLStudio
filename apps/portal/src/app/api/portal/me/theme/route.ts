import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

const ALLOWED = ['auto', 'light', 'dark'] as const;

/** Reads current user's theme preference (per-user, persisted in DB). */
export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-portal-user-id');
  const isSuperAdmin = req.headers.get('x-portal-super-admin') === 'true';
  if (!userId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  try {
    if (isSuperAdmin) {
      const user = await prisma.builderUser.findUnique({
        where: { id: userId },
        select: { themePreference: true },
      });
      return NextResponse.json({ theme: user?.themePreference ?? 'auto' });
    }
    const user = await prisma.portalUser.findUnique({
      where: { id: userId },
      select: { themePreference: true },
    });
    return NextResponse.json({ theme: user?.themePreference ?? 'auto' });
  } catch (err) {
    // If the column doesn't exist yet (db:push not applied), fall back gracefully.
    logger.warn({ err: err instanceof Error ? err.message : err }, 'Theme read failed (column may not be migrated)');
    return NextResponse.json({ theme: 'auto' });
  }
}

const updateSchema = z.object({
  theme: z.enum(ALLOWED),
});

/** Updates current user's theme preference. */
export async function PUT(req: NextRequest) {
  const userId = req.headers.get('x-portal-user-id');
  const isSuperAdmin = req.headers.get('x-portal-super-admin') === 'true';
  if (!userId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Theme invalide' }, { status: 400 });
  }

  try {
    if (isSuperAdmin) {
      await prisma.builderUser.update({
        where: { id: userId },
        data: { themePreference: parsed.data.theme },
      });
    } else {
      await prisma.portalUser.update({
        where: { id: userId },
        data: { themePreference: parsed.data.theme },
      });
    }
    return NextResponse.json({ ok: true, theme: parsed.data.theme });
  } catch (err) {
    logger.warn({ err: err instanceof Error ? err.message : err }, 'Theme write failed (column may not be migrated)');
    // Soft-fail: client still has localStorage as source of truth
    return NextResponse.json({ ok: true, theme: parsed.data.theme, persisted: false });
  }
}
