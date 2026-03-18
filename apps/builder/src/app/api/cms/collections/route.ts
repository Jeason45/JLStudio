import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const siteId = request.nextUrl.searchParams.get('siteId')
    if (!siteId) {
      return NextResponse.json({ error: 'siteId requis' }, { status: 400 })
    }

    const collections = await prisma.cmsCollection.findMany({
      where: { siteId },
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { items: true } } },
    })

    return NextResponse.json(collections)
  } catch (error) {
    console.error('CMS collections list error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { siteId, name, slug, fields, settings } = body as {
      siteId: string
      name: string
      slug: string
      fields?: unknown[]
      settings?: Record<string, unknown>
    }

    if (!siteId || !name || !slug) {
      return NextResponse.json({ error: 'siteId, name et slug requis' }, { status: 400 })
    }

    const collection = await prisma.cmsCollection.create({
      data: {
        siteId,
        name,
        slug,
        fields: (fields ?? []) as unknown as import('@jlstudio/database').Prisma.InputJsonValue,
        settings: (settings ?? {}) as unknown as import('@jlstudio/database').Prisma.InputJsonValue,
      },
      include: { _count: { select: { items: true } } },
    })

    return NextResponse.json(collection, { status: 201 })
  } catch (error) {
    console.error('CMS collection create error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
