import { NextRequest, NextResponse } from 'next/server'
import { extractSiteId } from '@/lib/auth'
import { searchBusinesses } from '@/lib/prospection/smartSearch'

export async function POST(req: NextRequest) {
  const siteId = extractSiteId(req.headers)
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 })

  const body = await req.json()
  const { metier, ville, limit } = body

  if (!metier || !ville) {
    return NextResponse.json({ error: 'Metier et ville requis' }, { status: 400 })
  }

  try {
    const results = await searchBusinesses(metier, ville, Math.min(limit || 20, 50))
    return NextResponse.json({
      results,
      total: results.length,
      withWebsite: results.filter(r => r.website).length,
      withoutWebsite: results.filter(r => !r.website).length,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
