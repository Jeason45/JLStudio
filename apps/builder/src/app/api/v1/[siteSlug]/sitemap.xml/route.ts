import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import type { SiteConfig } from '@/types/site'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ siteSlug: string }> }
) {
  try {
    const { siteSlug } = await params

    const site = await prisma.site.findUnique({ where: { slug: siteSlug } })
    if (!site) {
      return new NextResponse('Site introuvable', { status: 404 })
    }

    const config = site.config as unknown as SiteConfig
    const baseUrl = config.meta.url || site.deployUrl || `https://${siteSlug}.example.com`
    const lastmod = site.updatedAt.toISOString().split('T')[0]

    const urls = config.pages
      .filter(p => !p.seo?.noIndex)
      .map(p => {
        const loc = p.slug === '/' ? baseUrl : `${baseUrl.replace(/\/$/, '')}${p.slug.startsWith('/') ? p.slug : '/' + p.slug}`
        return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
      })

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return new NextResponse('Erreur serveur', { status: 500 })
  }
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
