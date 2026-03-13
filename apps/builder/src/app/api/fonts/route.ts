import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { uploadToStorage } from '@/lib/storage'
import { detectFontFormat, FONT_EXTENSIONS } from '@/lib/fonts'

const MAX_FONT_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const siteId = formData.get('siteId') as string | null
    const fontName = formData.get('fontName') as string | null
    const weight = parseInt((formData.get('weight') as string) ?? '400')
    const style = (formData.get('style') as string) ?? 'normal'

    if (!file || !fontName) {
      return NextResponse.json({ error: 'Fichier et nom de police requis' }, { status: 400 })
    }

    // Validate extension
    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!FONT_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: `Extension non supportée: ${ext}. Types acceptés: TTF, OTF, WOFF, WOFF2` },
        { status: 400 }
      )
    }

    if (file.size > MAX_FONT_SIZE) {
      return NextResponse.json(
        { error: `Fichier trop volumineux (max ${MAX_FONT_SIZE / 1024 / 1024}MB)` },
        { status: 400 }
      )
    }

    const format = detectFontFormat(file.type, file.name)
    if (!format) {
      return NextResponse.json({ error: 'Format de police non reconnu' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const filename = `${Date.now()}-${safeName}`
    const storagePath = `fonts/${filename}`

    // Determine content type
    const contentTypeMap: Record<string, string> = {
      woff2: 'font/woff2',
      woff: 'font/woff',
      truetype: 'font/ttf',
      opentype: 'font/otf',
    }

    const url = await uploadToStorage(storagePath, buffer, contentTypeMap[format] ?? 'application/octet-stream')

    // Save to Media table with folder 'fonts'
    const media = await prisma.media.create({
      data: {
        siteId: siteId || null,
        filename,
        originalName: file.name,
        mimeType: contentTypeMap[format] ?? file.type,
        size: buffer.length,
        width: 0,
        height: 0,
        url,
        thumbnailUrl: url,
        alt: fontName,
        folder: 'fonts',
      },
    })

    return NextResponse.json({
      id: media.id,
      url,
      format,
      weight,
      style,
      fontName,
    }, { status: 201 })
  } catch (error) {
    console.error('Font upload error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
