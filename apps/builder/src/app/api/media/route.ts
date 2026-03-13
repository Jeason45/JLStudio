import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { uploadToStorage } from '@/lib/storage'
import {
  ALLOWED_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_FILE_SIZE,
  generateFilename,
  generateThumbFilename,
  processImage,
} from '@/lib/media'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const siteId = formData.get('siteId') as string | null
    const alt = (formData.get('alt') as string) ?? ''
    const folder = (formData.get('folder') as string) ?? ''

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Type non supporté: ${file.type}. Types acceptés: JPG, PNG, WebP, GIF, SVG, AVIF, MP4, WebM` },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Fichier trop volumineux (max ${MAX_FILE_SIZE / 1024 / 1024}MB)` },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const originalName = file.name
    const filename = generateFilename(originalName)
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type)

    if (isVideo) {
      // Videos: upload raw, no processing
      const storagePath = folder ? `${folder}/${filename}` : filename
      const url = await uploadToStorage(storagePath, buffer, file.type)

      const media = await prisma.media.create({
        data: {
          siteId: siteId || null,
          filename,
          originalName,
          mimeType: file.type,
          size: buffer.length,
          width: 0,
          height: 0,
          url,
          thumbnailUrl: '',
          alt,
          folder,
        },
      })

      return NextResponse.json(media, { status: 201 })
    }

    // Images: optimize + thumbnail
    const thumbFilename = generateThumbFilename(filename)
    const { optimized, thumbnail, width, height, mimeType } = await processImage(buffer)

    const storagePath = folder ? `${folder}/${filename}` : filename
    const thumbPath = folder ? `${folder}/${thumbFilename}` : thumbFilename

    const isSvg = file.type === 'image/svg+xml'
    const uploadMime = isSvg ? 'image/svg+xml' : 'image/webp'

    const [url, thumbnailUrl] = await Promise.all([
      uploadToStorage(storagePath, optimized, uploadMime),
      uploadToStorage(thumbPath, thumbnail, uploadMime),
    ])

    const media = await prisma.media.create({
      data: {
        siteId: siteId || null,
        filename,
        originalName,
        mimeType,
        size: optimized.length,
        width,
        height,
        url,
        thumbnailUrl,
        alt,
        folder,
      },
    })

    return NextResponse.json(media, { status: 201 })
  } catch (error) {
    console.error('Media upload error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const siteId = searchParams.get('siteId')
    const folder = searchParams.get('folder')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '50')

    const where: Record<string, unknown> = {}
    if (siteId) where.siteId = siteId
    if (folder) where.folder = folder
    if (search) {
      where.OR = [
        { originalName: { contains: search, mode: 'insensitive' } },
        { alt: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [items, total] = await Promise.all([
      prisma.media.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.media.count({ where }),
    ])

    return NextResponse.json({
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Media list error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
