import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3'

const BUCKET = process.env.S3_BUCKET ?? 'media'

export const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT ?? 'http://localhost:9000',
  region: process.env.S3_REGION ?? 'us-east-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY ?? 'minioadmin',
    secretAccessKey: process.env.S3_SECRET_KEY ?? 'minioadmin123',
  },
  forcePathStyle: true, // Required for MinIO
})

export async function uploadToStorage(
  key: string,
  body: Buffer,
  contentType: string
): Promise<string> {
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  )

  // Build public URL
  const endpoint = process.env.S3_PUBLIC_URL ?? process.env.S3_ENDPOINT ?? 'http://localhost:9000'
  return `${endpoint}/${BUCKET}/${key}`
}

export async function deleteFromStorage(keys: string[]): Promise<void> {
  if (keys.length === 0) return
  await s3.send(
    new DeleteObjectsCommand({
      Bucket: BUCKET,
      Delete: {
        Objects: keys.map(Key => ({ Key })),
      },
    })
  )
}

/** Extract the S3 key from a full public URL */
export function urlToKey(url: string): string | null {
  try {
    const u = new URL(url)
    // URL format: http://host:port/bucket/key
    const parts = u.pathname.split(`/${BUCKET}/`)
    return parts.length > 1 ? parts[1] : null
  } catch {
    return null
  }
}
