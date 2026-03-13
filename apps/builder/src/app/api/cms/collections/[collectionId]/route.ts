import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> }
) {
  try {
    const { collectionId } = await params
    const collection = await prisma.cmsCollection.findUnique({
      where: { id: collectionId },
      include: { _count: { select: { items: true } } },
    })

    if (!collection) {
      return NextResponse.json({ error: 'Collection introuvable' }, { status: 404 })
    }

    return NextResponse.json(collection)
  } catch (error) {
    console.error('CMS collection get error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> }
) {
  try {
    const { collectionId } = await params
    const body = await request.json()
    const { name, slug, fields, settings } = body as {
      name?: string
      slug?: string
      fields?: unknown[]
      settings?: Record<string, unknown>
    }

    const data: Record<string, unknown> = {}
    if (name !== undefined) data.name = name
    if (slug !== undefined) data.slug = slug
    if (fields !== undefined) data.fields = fields
    if (settings !== undefined) data.settings = settings

    const collection = await prisma.cmsCollection.update({
      where: { id: collectionId },
      data,
      include: { _count: { select: { items: true } } },
    })

    return NextResponse.json(collection)
  } catch (error) {
    console.error('CMS collection update error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> }
) {
  try {
    const { collectionId } = await params
    await prisma.cmsCollection.delete({ where: { id: collectionId } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('CMS collection delete error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
