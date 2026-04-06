import { NextRequest, NextResponse } from 'next/server'
import { extractSiteId } from '@/lib/auth'
import { searchBusinessesWeb, checkSerperCredits } from '@/lib/prospection/webSearch'

export async function POST(req: NextRequest) {
  const siteId = extractSiteId(req.headers)
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 })

  const body = await req.json()
  const { metier, ville } = body

  if (!metier || !ville) {
    return NextResponse.json({ error: 'metier et ville requis' }, { status: 400 })
  }

  try {
    const result = await searchBusinessesWeb(metier, ville)
    return NextResponse.json(result)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

// GET — Check remaining Serper credits
export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers)
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 })

  const serperKey = process.env.SERPER_API_KEY || ''
  if (!serperKey) {
    return NextResponse.json({ credits: null, source: 'searxng' })
  }

  const credits = await checkSerperCredits(serperKey)
  return NextResponse.json({ credits, source: credits !== null && credits > 0 ? 'serper' : 'searxng' })
}
