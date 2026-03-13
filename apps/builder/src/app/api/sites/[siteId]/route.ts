import { NextRequest, NextResponse } from 'next/server'
import { getSiteById, updateSiteConfig, deleteSite } from '@/lib/repositories'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  try {
    const { siteId } = await params
    const site = await getSiteById(siteId)
    if (!site) return NextResponse.json({ error: 'Site non trouvé' }, { status: 404 })
    return NextResponse.json(site)
  } catch (error) {
    console.error('[GET /api/sites/[siteId]]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  try {
    const { siteId } = await params
    const body = await req.json()
    // body may be the full config directly, or wrapped as { name, config }
    const config = body.config && body.name ? body.config : body.config ?? body
    const site = await updateSiteConfig(siteId, config)
    return NextResponse.json(site)
  } catch (error) {
    console.error('[PUT /api/sites/[siteId]]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  try {
    const { siteId } = await params
    await deleteSite(siteId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[DELETE /api/sites/[siteId]]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
