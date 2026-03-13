import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ collectionId: string; itemId: string }> }
) {
  try {
    const { itemId } = await params
    const item = await prisma.cmsItem.findUnique({ where: { id: itemId } })
    if (!item) {
      return NextResponse.json({ error: 'Item introuvable' }, { status: 404 })
    }
    return NextResponse.json(item)
  } catch (error) {
    console.error('CMS item get error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ collectionId: string; itemId: string }> }
) {
  try {
    const { itemId } = await params
    const body = await request.json()
    const { slug, data, status, publishedAt, scheduledAt } = body as {
      slug?: string
      data?: Record<string, unknown>
      status?: string
      publishedAt?: string | null
      scheduledAt?: string | null
    }

    const updateData: Record<string, unknown> = {}
    if (slug !== undefined) updateData.slug = slug
    if (data !== undefined) updateData.data = data
    if (status !== undefined) {
      updateData.status = status
      if (status === 'PUBLISHED' && !publishedAt) updateData.publishedAt = new Date()
    }
    if (publishedAt !== undefined) updateData.publishedAt = publishedAt ? new Date(publishedAt) : null
    if (scheduledAt !== undefined) updateData.scheduledAt = scheduledAt ? new Date(scheduledAt) : null

    const item = await prisma.cmsItem.update({
      where: { id: itemId },
      data: updateData,
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('CMS item update error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ collectionId: string; itemId: string }> }
) {
  try {
    const { itemId } = await params
    await prisma.cmsItem.delete({ where: { id: itemId } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('CMS item delete error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
