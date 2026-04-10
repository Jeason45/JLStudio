import { NextRequest, NextResponse } from 'next/server'
import { extractSiteId } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers)
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 })

  const url = req.nextUrl.searchParams.get('url')
  if (!url || !url.startsWith('https://image.thum.io/')) {
    return NextResponse.json({ error: 'URL invalide' }, { status: 400 })
  }

  const res = await fetch(url)
  if (!res.ok) {
    return NextResponse.json({ error: 'Erreur capture' }, { status: 502 })
  }

  const buffer = await res.arrayBuffer()
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': res.headers.get('content-type') || 'image/png',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
