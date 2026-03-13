import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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

    const forms = await prisma.form.findMany({
      where: { siteId: site.id },
      select: { id: true, name: true, createdAt: true },
    })

    return NextResponse.json({ data: forms }, { headers: CORS_HEADERS })
  } catch (error) {
    console.error('Public forms API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500, headers: CORS_HEADERS })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ siteSlug: string }> }
) {
  try {
    const { siteSlug } = await params

    const site = await prisma.site.findUnique({ where: { slug: siteSlug } })
    if (!site) {
      return NextResponse.json({ error: 'Site introuvable' }, { status: 404, headers: CORS_HEADERS })
    }

    const body = await request.json()
    const { formName, data } = body as { formName?: string; data?: Record<string, string> }

    if (!data) {
      return NextResponse.json({ error: 'data requis' }, { status: 400, headers: CORS_HEADERS })
    }

    // Proxy to internal submit route
    const submitUrl = new URL('/api/forms/submit', request.url)
    const res = await fetch(submitUrl.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteId: site.id, formName, data }),
    })

    const result = await res.json()
    return NextResponse.json(result, { status: res.status, headers: CORS_HEADERS })
  } catch (error) {
    console.error('Public form submit error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500, headers: CORS_HEADERS })
  }
}
