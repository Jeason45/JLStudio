import { randomUUID } from 'crypto';
import { putToStorage, getFromStorage, isStorageConfigured } from './storage';

// Stockage/lecture des PDF de documents (devis/factures/contrats) sur R2.
//
// Sécurité : les PDF sont CONFIDENTIELS. Ils sont stockés dans le bucket avec
// une clé non-devinable (UUID) et servis UNIQUEMENT côté serveur (jamais d'URL
// publique r2.dev exposée au client). Les routes de download vérifient l'auth
// puis streament le Buffer.
//
// Transition (dual-write/dual-read) : on garde aussi pdfData (Bytes Postgres)
// tant que la migration n'est pas validée. La lecture préfère R2 si pdfKey
// présent, sinon retombe sur pdfData.

const PDF_PREFIX = 'documents';

/**
 * Upload un PDF de document sur R2 et retourne sa clé (non l'URL publique).
 * Retourne null si le stockage n'est pas configuré (→ on garde le fallback Postgres).
 */
export async function uploadDocumentPdf(siteId: string, buffer: Buffer): Promise<string | null> {
  if (!isStorageConfigured()) return null;
  const key = `${PDF_PREFIX}/${siteId}/${randomUUID()}.pdf`;
  await putToStorage(key, buffer, 'application/pdf');
  return key;
}

/**
 * Charge le PDF d'un document : R2 en priorité (si pdfKey), sinon Bytes Postgres.
 * Retourne null si aucune source disponible.
 */
export async function loadDocumentPdf(doc: {
  pdfKey?: string | null;
  pdfData?: Uint8Array | Buffer | null;
}): Promise<Buffer | null> {
  if (doc.pdfKey) {
    try {
      return await getFromStorage(doc.pdfKey);
    } catch {
      // R2 indisponible / clé invalide → on tente le fallback Postgres
    }
  }
  if (doc.pdfData) {
    return Buffer.from(doc.pdfData);
  }
  return null;
}
