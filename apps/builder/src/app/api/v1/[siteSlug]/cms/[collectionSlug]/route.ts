import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ siteSlug: string; collectionSlug: string }> }
) {
  try {
    const { siteSlug, collectionSlug } = await params
    const url = request.nextUrl
    const limit = Math.min(Number(url.searchParams.get('limit')) || 50, 100)
    const offset = Number(url.searchParams.get('offset')) || 0
    const sort = url.searchParams.get('sort') || 'createdAt'
    const dir = url.searchParams.get('dir') || 'desc'

    const site = await prisma.site.findUnique({ where: { slug: siteSlug } })
    if (!site) {
      return NextResponse.json({ error: 'Site introuvable' }, { status: 404, headers: CORS_HEADERS })
    }

    const collection = await prisma.cmsCollection.findUnique({
      where: { siteId_slug: { siteId: site.id, slug: collectionSlug } },
    })
    if (!collection) {
      return NextResponse.json({ error: 'Collection introuvable' }, { status: 404, headers: CORS_HEADERS })
    }

    // Auto-publish scheduled
    await prisma.cmsItem.updateMany({
      where: {
        collectionId: collection.id,
        status: 'SCHEDULED',
        scheduledAt: { lte: new Date() },
      },
      data: { status: 'PUBLISHED', publishedAt: new Date() },
    })

    const [items, total] = await Promise.all([
      prisma.cmsItem.findMany({
        where: { collectionId: collection.id, status: 'PUBLISHED' },
        orderBy: { [sort]: dir as 'asc' | 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.cmsItem.count({
        where: { collectionId: collection.id, status: 'PUBLISHED' },
      }),
    ])

    const data = items.map(i => ({
      slug: i.slug,
      data: i.data,
      publishedAt: i.publishedAt,
      updatedAt: i.updatedAt,
    }))

    return NextResponse.json({ data, meta: { total, limit, offset } }, { headers: CORS_HEADERS })
  } catch (error) {
    console.error('Public CMS API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500, headers: CORS_HEADERS })
  }
}
