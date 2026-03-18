import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { deleteFromStorage, urlToKey } from '@/lib/storage'
import { z } from 'zod'

const updateMediaSchema = z.object({
  alt: z.string().optional(),
  folder: z.string().optional(),
})

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const media = await prisma.media.findUnique({ where: { id } })
    if (!media) {
      return NextResponse.json({ error: 'Média non trouvé' }, { status: 404 })
    }

    // Delete files from S3/MinIO
    const keysToDelete: string[] = []
    const mainKey = urlToKey(media.url)
    if (mainKey) keysToDelete.push(mainKey)
    if (media.thumbnailUrl) {
      const thumbKey = urlToKey(media.thumbnailUrl)
      if (thumbKey) keysToDelete.push(thumbKey)
    }
    await deleteFromStorage(keysToDelete)

    // Delete from database
    await prisma.media.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Media delete error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateMediaSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Données invalides', details: parsed.error.issues }, { status: 400 })
    }

    const media = await prisma.media.update({
      where: { id },
      data: parsed.data,
    })

    return NextResponse.json(media)
  } catch (error) {
    console.error('Media update error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
