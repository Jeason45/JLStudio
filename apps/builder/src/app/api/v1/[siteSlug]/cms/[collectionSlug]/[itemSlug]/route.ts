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
  _request: NextRequest,
  { params }: { params: Promise<{ siteSlug: string; collectionSlug: string; itemSlug: string }> }
) {
  try {
    const { siteSlug, collectionSlug, itemSlug } = await params

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

    const item = await prisma.cmsItem.findUnique({
      where: {
        collectionId_slug: { collectionId: collection.id, slug: itemSlug },
      },
    })
    if (!item || item.status !== 'PUBLISHED') {
      return NextResponse.json({ error: 'Item introuvable' }, { status: 404, headers: CORS_HEADERS })
    }

    return NextResponse.json({
      data: {
        slug: item.slug,
        data: item.data,
        publishedAt: item.publishedAt,
        updatedAt: item.updatedAt,
      },
    }, { headers: CORS_HEADERS })
  } catch (error) {
    console.error('Public CMS item API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500, headers: CORS_HEADERS })
  }
}
