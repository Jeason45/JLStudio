import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import type { SiteConfig } from '@/types/site'

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
  { params }: { params: Promise<{ siteSlug: string }> }
) {
  try {
    const { siteSlug } = await params

    const site = await prisma.site.findUnique({ where: { slug: siteSlug } })
    if (!site) {
      return NextResponse.json({ error: 'Site introuvable' }, { status: 404, headers: CORS_HEADERS })
    }

    const config = site.config as unknown as SiteConfig

    return NextResponse.json({
      id: site.id,
      slug: site.slug,
      meta: {
        title: config.meta.title,
        description: config.meta.description,
        lang: config.meta.lang,
        favicon: config.meta.favicon,
        url: config.meta.url,
      },
      pages: config.pages.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
      })),
      navigation: config.navigation,
    }, { headers: CORS_HEADERS })
  } catch (error) {
    console.error('Public site API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500, headers: CORS_HEADERS })
  }
}
