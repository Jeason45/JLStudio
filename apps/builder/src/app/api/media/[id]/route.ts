import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { deleteFromStorage, urlToKey } from '@/lib/storage'

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
    const { alt } = body

    const media = await prisma.media.update({
      where: { id },
      data: { alt },
    })

    return NextResponse.json(media)
  } catch (error) {
    console.error('Media update error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
