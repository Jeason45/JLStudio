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

    // Use custom robots.txt if configured, otherwise generate default
    const customRobotsTxt = config.robotsTxt
    let robotsTxt: string

    if (customRobotsTxt) {
      robotsTxt = customRobotsTxt
      // Append sitemap if not already present
      if (!robotsTxt.toLowerCase().includes('sitemap:')) {
        robotsTxt += `\n\nSitemap: ${baseUrl.replace(/\/$/, '')}/api/v1/${siteSlug}/sitemap.xml`
      }
    } else {
      robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl.replace(/\/$/, '')}/api/v1/${siteSlug}/sitemap.xml`
    }

    return new NextResponse(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Robots.txt generation error:', error)
    return new NextResponse('Erreur serveur', { status: 500 })
  }
}
