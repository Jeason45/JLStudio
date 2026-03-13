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

/**
 * GET /api/v1/[siteSlug]/redirects?path=/old-path
 * Check if a path has a redirect configured.
 * Returns the redirect target and type if found.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ siteSlug: string }> }
) {
  try {
    const { siteSlug } = await params
    const path = request.nextUrl.searchParams.get('path')

    const site = await prisma.site.findUnique({ where: { slug: siteSlug } })
    if (!site) {
      return NextResponse.json({ error: 'Site introuvable' }, { status: 404, headers: CORS_HEADERS })
    }

    const config = site.config as unknown as SiteConfig
    const redirects = config.redirects ?? []

    // If a specific path is requested, find matching redirect
    if (path) {
      const normalizedPath = path.startsWith('/') ? path : `/${path}`
      const match = redirects.find(r => r.from === normalizedPath)
      if (match) {
        return NextResponse.json({
          redirect: true,
          from: match.from,
          to: match.to,
          type: match.type,
          statusCode: parseInt(match.type),
        }, { headers: CORS_HEADERS })
      }
      return NextResponse.json({ redirect: false }, { headers: CORS_HEADERS })
    }

    // Return all redirects
    return NextResponse.json({
      data: redirects.map(r => ({
        id: r.id,
        from: r.from,
        to: r.to,
        type: r.type,
      })),
    }, { headers: CORS_HEADERS })
  } catch (error) {
    console.error('Redirects API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500, headers: CORS_HEADERS })
  }
}
