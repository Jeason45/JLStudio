import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non autorise. Formats acceptes : PNG, JPG, SVG' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux. Taille maximum : 2 Mo' },
        { status: 400 }
      );
    }

    // Determine file extension
    const ext = file.type === 'image/svg+xml' ? '.svg'
      : file.type === 'image/png' ? '.png'
      : '.jpg';

    const fileName = `logo${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'storage', 'logo');

    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    // Write file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Public URL path
    const logoPath = `/storage/logo/${fileName}`;

    // Update CompanySettings in database
    await prisma.companySettings.upsert({
      where: { id: 'default' },
      update: { logoPath },
      create: { id: 'default', logoPath },
    });

    return NextResponse.json({ logoPath });
  } catch (error) {
    console.error('Error uploading logo:', error);
    return NextResponse.json(
      { error: 'Erreur lors du telechargement du logo' },
      { status: 500 }
    );
  }
}
