import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/internal/jlstudio-preview
//
// Endpoint INTERNE consommé par le site apps/web (jlstudio.dev/preview)
// pour récupérer le contenu BROUILLON du site JL Studio et le rendre
// avec les vrais composants landing-v3.
//
// Auth : Bearer ${INTERNAL_API_SECRET} (env var configurée Coolify côté
// portal ET côté apps/web — apps/web fait le fetch en server-side).
//
// CORS : non, car l'appel est server-to-server (depuis apps/web SSR).

const AGENCY_SLUG = 'jlstudio';

function ensureInternalAuth(req: NextRequest): NextResponse | null {
  const secret = process.env.INTERNAL_API_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'INTERNAL_API_SECRET non configuré' }, { status: 503 });
  }
  const header = req.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token || token !== secret) {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 401 });
  }
  return null;
}

export async function GET(req: NextRequest) {
  const denied = ensureInternalAuth(req);
  if (denied) return denied;

  const site = await prisma.site.findUnique({
    where: { slug: AGENCY_SLUG },
    select: { id: true, name: true, slug: true, config: true, draftConfig: true, publishedAt: true },
  });
  if (!site) {
    return NextResponse.json({ error: 'Site jlstudio introuvable' }, { status: 404 });
  }

  // Resolver : si un brouillon existe pour la clé jlstudio, le préférer
  type SiteCfg = { jlstudio?: Record<string, unknown> } | null | undefined;
  const draftCfg = site.draftConfig as SiteCfg;
  const liveCfg  = site.config as SiteCfg;
  const draftJL  = draftCfg?.jlstudio;
  const liveJL   = liveCfg?.jlstudio;

  // Quel mode l'appelant demande : "draft" (défaut) ou "live"
  const mode = req.nextUrl.searchParams.get('mode') || 'draft';
  const wantsDraft = mode === 'draft';
  const content = wantsDraft ? (draftJL || liveJL || null) : (liveJL || null);

  return NextResponse.json({
    siteId: site.id,
    slug: site.slug,
    isDraft: wantsDraft && !!draftJL,
    publishedAt: site.publishedAt,
    content: content || {},
  });
}
