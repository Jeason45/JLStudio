import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { logger } from '@/lib/logger';
import { uploadToStorage, isStorageConfigured } from '@/lib/storage';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

const MAX_BYTES = 10 * 1024 * 1024; // 10 Mo
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];

function slugifyFilename(name: string): string {
  const dot = name.lastIndexOf('.');
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || 'image';
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, '') : 'bin';
  return `${base}.${ext}`;
}

// POST /api/admin/media/upload — multipart form-data, champ "file"
export async function POST(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  if (!isStorageConfigured()) {
    return NextResponse.json(
      { error: 'Stockage R2 non configuré (env vars S3_* manquantes dans Coolify)' },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Requête multipart invalide' }, { status: 400 });
  }

  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Champ "file" manquant' }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: `Type non supporté : ${file.type}` }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Fichier trop lourd (max 10 Mo)' }, { status: 400 });
  }

  const folder = (form.get('folder') as string) || 'sites';
  const site = await getAgencySite();
  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName = slugifyFilename(file.name);
  const key = `${folder}/${site.id}/${Date.now()}-${safeName}`;

  try {
    const url = await uploadToStorage(key, buffer, file.type);
    const media = await prisma.media.create({
      data: {
        siteId: site.id,
        filename: key.split('/').pop() || safeName,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        url,
        folder,
        alt: '',
      },
      select: { id: true, url: true, filename: true, mimeType: true, size: true },
    });
    return NextResponse.json(media, { status: 201 });
  } catch (err) {
    logger.error({ err, key }, 'Media upload to R2 failed');
    return NextResponse.json({ error: 'Échec de l’upload vers R2' }, { status: 500 });
  }
}
