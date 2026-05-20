import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

// Stockage S3-compatible (Cloudflare R2 en prod, MinIO en dev local).
// Config via env vars S3_* (cf. .env.example + Coolify).

const BUCKET = process.env.S3_BUCKET ?? 'media';

// R2 : l'URL publique (r2.dev ou domaine custom) sert le bucket à la racine,
// donc on construit `${S3_PUBLIC_URL}/${key}` (sans le bucket dans le chemin).
// MinIO : l'URL publique est l'endpoint, et le chemin inclut le bucket.
const PUBLIC_URL = process.env.S3_PUBLIC_URL ?? process.env.S3_ENDPOINT ?? 'http://localhost:9000';
// Détecte R2 via l'endpoint cloudflarestorage : public URL = racine bucket
const IS_R2 = (process.env.S3_ENDPOINT ?? '').includes('r2.cloudflarestorage.com');

export function isStorageConfigured(): boolean {
  return !!(process.env.S3_ENDPOINT && process.env.S3_ACCESS_KEY && process.env.S3_SECRET_KEY);
}

export const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT ?? 'http://localhost:9000',
  region: process.env.S3_REGION ?? 'auto',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY ?? 'minioadmin',
    secretAccessKey: process.env.S3_SECRET_KEY ?? 'minioadmin123',
  },
  forcePathStyle: true, // requis pour MinIO ; toléré par R2
});

/** Upload un buffer et retourne l'URL publique. */
export async function uploadToStorage(
  key: string,
  body: Buffer,
  contentType: string,
): Promise<string> {
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
  return publicUrlForKey(key);
}

/** Construit l'URL publique d'une clé. */
export function publicUrlForKey(key: string): string {
  if (IS_R2) {
    // r2.dev subdomain → racine du bucket
    return `${PUBLIC_URL.replace(/\/$/, '')}/${key}`;
  }
  // MinIO/S3 path-style → /bucket/key
  return `${PUBLIC_URL.replace(/\/$/, '')}/${BUCKET}/${key}`;
}

/** Lit un objet R2 et retourne son contenu en Buffer (lecture serveur, jamais d'URL publique). */
export async function getFromStorage(key: string): Promise<Buffer> {
  const res = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
  if (!res.Body) throw new Error(`Objet R2 vide : ${key}`);
  const bytes = await res.Body.transformToByteArray();
  return Buffer.from(bytes);
}

/** Upload un buffer sous une clé donnée (sans retourner d'URL publique — usage privé). */
export async function putToStorage(key: string, body: Buffer, contentType: string): Promise<void> {
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: contentType }));
}

/** Supprime des objets par clé. */
export async function deleteFromStorage(keys: string[]): Promise<void> {
  if (keys.length === 0) return;
  await s3.send(
    new DeleteObjectsCommand({
      Bucket: BUCKET,
      Delete: { Objects: keys.map((Key) => ({ Key })) },
    }),
  );
}

/** Extrait la clé S3 depuis une URL publique (R2 ou MinIO). */
export function urlToKey(url: string): string | null {
  try {
    const u = new URL(url);
    if (IS_R2) {
      return u.pathname.replace(/^\//, '') || null;
    }
    const parts = u.pathname.split(`/${BUCKET}/`);
    return parts.length > 1 ? parts[1] : null;
  } catch {
    return null;
  }
}
