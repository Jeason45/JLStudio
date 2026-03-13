import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/prisma';

// GET /api/storage/[...path] - Serve files from storage/ directory or database
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

    // Try filesystem first
    if (fs.existsSync(filePath)) {
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
    }

    // Fallback: serve PDF documents from database
    const fileName = pathSegments[pathSegments.length - 1];
    if (fileName?.endsWith('.pdf')) {
      const document = await prisma.document.findFirst({
        where: { fileName },
        select: { fileData: true, signedFileData: true, fileName: true },
      });

      const data = document?.signedFileData || document?.fileData;
      if (document && data) {
        return new NextResponse(Buffer.from(data), {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Length': data.length.toString(),
            'Cache-Control': 'private, max-age=3600',
          },
        });
      }
    }

    return NextResponse.json({ error: 'Fichier introuvable' }, { status: 404 });
  } catch (error) {
    console.error('Erreur storage:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
