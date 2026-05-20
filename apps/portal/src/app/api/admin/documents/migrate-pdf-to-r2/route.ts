import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { logger } from '@/lib/logger';
import { uploadDocumentPdf, loadDocumentPdf } from '@/lib/documentPdf';
import { getFromStorage, isStorageConfigured } from '@/lib/storage';

// POST /api/admin/documents/migrate-pdf-to-r2
//
// Bloc 4 — migration one-shot des PDF existants (stockés en Bytes Postgres)
// vers R2. Idempotent : ne traite que les documents avec pdfData mais sans
// pdfKey. NE SUPPRIME PAS pdfData (dual-read conservé tant que non validé).
//
// Query :
//   - dryRun=1 : ne fait qu'estimer (compte les docs à migrer), n'écrit rien
//   - limit=N  : nombre max de docs à traiter (défaut 50, max 200)
//
// Vérification : chaque PDF uploadé est relu depuis R2 et sa taille comparée
// avant de valider le pdfKey. Si la vérif échoue, le doc est laissé tel quel.

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

export async function POST(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  if (!isStorageConfigured()) {
    return NextResponse.json({ error: 'Stockage R2 non configuré (env vars S3_*)' }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const dryRun = searchParams.get('dryRun') === '1';
  const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 200);

  const site = await getAgencySite();

  // Docs à migrer : ont un PDF en Postgres mais pas encore de clé R2
  const where = { siteId: site.id, pdfData: { not: null }, pdfKey: null };
  const totalRemaining = await prisma.portalDocument.count({ where });

  if (dryRun) {
    return NextResponse.json({
      dryRun: true,
      totalRemaining,
      message: `${totalRemaining} document(s) à migrer vers R2. Relance sans dryRun pour exécuter (par lots de ${limit}).`,
    });
  }

  const docs = await prisma.portalDocument.findMany({
    where,
    select: { id: true, documentNumber: true, pdfData: true, pdfKey: true },
    take: limit,
  });

  let migrated = 0;
  let failed = 0;
  const errors: Array<{ id: string; error: string }> = [];

  for (const doc of docs) {
    try {
      const buffer = await loadDocumentPdf(doc); // ici = pdfData (pdfKey null)
      if (!buffer) { failed++; errors.push({ id: doc.id, error: 'PDF illisible' }); continue; }

      const key = await uploadDocumentPdf(site.id, buffer);
      if (!key) { failed++; errors.push({ id: doc.id, error: 'Upload R2 échoué' }); continue; }

      // Vérification : relit depuis R2 et compare la taille
      const check = await getFromStorage(key);
      if (check.length !== buffer.length) {
        failed++;
        errors.push({ id: doc.id, error: `Taille R2 (${check.length}) != Postgres (${buffer.length})` });
        continue;
      }

      // OK → on enregistre la clé. pdfData est CONSERVÉ (fallback).
      await prisma.portalDocument.update({ where: { id: doc.id }, data: { pdfKey: key } });
      migrated++;
    } catch (err) {
      failed++;
      errors.push({ id: doc.id, error: err instanceof Error ? err.message : 'Erreur inconnue' });
      logger.error({ err, docId: doc.id }, 'PDF migration to R2 failed');
    }
  }

  const remainingAfter = await prisma.portalDocument.count({ where });

  return NextResponse.json({
    dryRun: false,
    processed: docs.length,
    migrated,
    failed,
    remainingAfter,
    errors: errors.slice(0, 20),
    message: remainingAfter > 0
      ? `${migrated} migré(s), ${failed} échec(s). Il reste ${remainingAfter} doc(s) — relance pour continuer.`
      : `Migration terminée : ${migrated} migré(s), ${failed} échec(s). Tous les PDF sont sur R2.`,
  });
}
