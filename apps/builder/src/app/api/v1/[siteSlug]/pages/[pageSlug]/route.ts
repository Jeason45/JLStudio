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
  request: NextRequest,
  { params }: { params: Promise<{ siteSlug: string; pageSlug: string }> }
) {
  try {
    const { siteSlug, pageSlug } = await params

    const site = await prisma.site.findUnique({ where: { slug: siteSlug } })
    if (!site) {
      return NextResponse.json({ error: 'Site introuvable' }, { status: 404, headers: CORS_HEADERS })
    }

    const config = site.config as unknown as SiteConfig
    const slug = pageSlug === 'home' ? '/' : `/${pageSlug}`
    const page = config.pages.find(p => p.slug === slug || p.slug === pageSlug)

    if (!page) {
      return NextResponse.json({ error: 'Page introuvable' }, { status: 404, headers: CORS_HEADERS })
    }

    // Password protection check
    if (page.password) {
      const url = new URL(request.url)
      const pwd = url.searchParams.get('pwd')
      // Also check cookie for session-based access
      const cookieKey = `page_pwd_${page.id}`
      const cookiePwd = request.cookies.get(cookieKey)?.value

      if (pwd !== page.password && cookiePwd !== page.password) {
        return NextResponse.json(
          { error: 'Password required', passwordProtected: true },
          { status: 401, headers: CORS_HEADERS }
        )
      }

      // If password was provided via query param, set a session cookie
      if (pwd === page.password) {
        const response = NextResponse.json({
          id: page.id,
          slug: page.slug,
          title: page.title,
          seo: page.seo,
          sections: page.sections.filter(s => s.visible).map(s => ({
            id: s.id,
            type: s.type,
            variant: s.variant,
            content: s.content,
            style: s.style,
          })),
        }, { headers: CORS_HEADERS })
        response.cookies.set(cookieKey, page.password, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24, // 24 hours
        })
        return response
      }
    }

    return NextResponse.json({
      id: page.id,
      slug: page.slug,
      title: page.title,
      seo: page.seo,
      sections: page.sections.filter(s => s.visible).map(s => ({
        id: s.id,
        type: s.type,
        variant: s.variant,
        content: s.content,
        style: s.style,
      })),
    }, { headers: CORS_HEADERS })
  } catch (error) {
    console.error('Public page API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500, headers: CORS_HEADERS })
  }
}
