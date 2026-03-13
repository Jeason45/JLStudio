import sharp from 'sharp'
import { nanoid } from 'nanoid'

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
]

export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
]

export const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES]

export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB (videos can be large)
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10MB
export const THUMB_WIDTH = 400
export const THUMB_HEIGHT = 300

export function generateFilename(originalName: string): string {
  const ext = originalName.split('.').pop()?.toLowerCase() ?? 'jpg'
  return `${nanoid(12)}.${ext}`
}

export function generateThumbFilename(filename: string): string {
  const parts = filename.split('.')
  const ext = parts.pop()
  return `${parts.join('.')}_thumb.${ext}`
}

export async function processImage(buffer: Buffer): Promise<{
  optimized: Buffer
  thumbnail: Buffer
  width: number
  height: number
  mimeType: string
}> {
  const image = sharp(buffer)
  const metadata = await image.metadata()

  const width = metadata.width ?? 0
  const height = metadata.height ?? 0

  // Optimize: resize if too large, convert to WebP for better compression
  let optimized: Buffer
  if (metadata.format === 'svg') {
    // Don't process SVGs
    optimized = buffer
  } else {
    const pipeline = sharp(buffer)
    // Resize if wider than 2400px
    if (width > 2400) {
      pipeline.resize(2400, undefined, { withoutEnlargement: true })
    }
    optimized = await pipeline
      .webp({ quality: 85 })
      .toBuffer()
  }

  // Generate thumbnail
  let thumbnail: Buffer
  if (metadata.format === 'svg') {
    thumbnail = buffer
  } else {
    thumbnail = await sharp(buffer)
      .resize(THUMB_WIDTH, THUMB_HEIGHT, { fit: 'cover' })
      .webp({ quality: 70 })
      .toBuffer()
  }

  const isSvg = metadata.format === 'svg'
  return {
    optimized,
    thumbnail,
    width,
    height,
    mimeType: isSvg ? 'image/svg+xml' : 'image/webp',
  }
}
