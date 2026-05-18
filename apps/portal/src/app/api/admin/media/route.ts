import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// GET /api/admin/media — liste les médias du site agence
// Utilisé par le MediaPicker de l'éditeur publications.
export async function GET(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const site = await getAgencySite();
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get('folder');
  const mimeFilter = searchParams.get('mime'); // ex. "image" pour filtrer images uniquement

  const where: Record<string, unknown> = { siteId: site.id };
  if (folder) where.folder = folder;
  if (mimeFilter) where.mimeType = { startsWith: mimeFilter };

  const media = await prisma.media.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 500,
    select: {
      id: true,
      filename: true,
      originalName: true,
      mimeType: true,
      size: true,
      width: true,
      height: true,
      url: true,
      thumbnailUrl: true,
      alt: true,
      folder: true,
      createdAt: true,
    },
  });
  return NextResponse.json(media);
}
