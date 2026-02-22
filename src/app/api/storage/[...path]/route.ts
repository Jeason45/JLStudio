import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// GET /api/storage/[...path] - Serve files from storage/ directory
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params;
    const relativePath = pathSegments.join('/');

    // Path traversal protection
    if (relativePath.includes('..') || relativePath.includes('\0')) {
      return NextResponse.json({ error: 'Chemin invalide' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'storage', relativePath);

    // Ensure the resolved path is still within storage/
    const storageDir = path.join(process.cwd(), 'storage');
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(storageDir)) {
      return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Fichier introuvable' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();

    const mimeTypes: Record<string, string> = {
      '.pdf': 'application/pdf',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.json': 'application/json',
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Erreur storage:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
