import { NextRequest, NextResponse } from 'next/server'
import { extractSiteId } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET — Get session with all prospects (supports filter + sort)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const siteId = extractSiteId(req.headers)
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 })

  const { id } = await params
  const { searchParams } = new URL(req.url)
  const filter = searchParams.get('filter') || 'all'
  const sort = searchParams.get('sort') || 'score'

  // Build prospect where clause based on filter
  const prospectWhere: Record<string, unknown> = {}
  switch (filter) {
    case 'withSite': prospectWhere.website = { not: null }; break
    case 'withoutSite': prospectWhere.website = null; break
    case 'audited': prospectWhere.auditedAt = { not: null }; break
    case 'inCRM': prospectWhere.addedToCRM = true; break
  }

  // Build orderBy for prospects
  let orderBy: Record<string, string> = {}
  switch (sort) {
    case 'score': orderBy = { auditScore: 'asc' }; break
    case 'name': orderBy = { name: 'asc' }; break
    case 'date': orderBy = { createdAt: 'desc' }; break
    default: orderBy = { createdAt: 'desc' }
  }

  const session = await prisma.prospectionSession.findFirst({
    where: { id, siteId },
    include: {
      prospects: {
        where: prospectWhere,
        orderBy,
      },
      _count: { select: { prospects: true } },
    },
  })

  if (!session) return NextResponse.json({ error: 'Session non trouvee' }, { status: 404 })

  return NextResponse.json(session)
}

// DELETE — Delete session (cascade deletes prospects)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const siteId = extractSiteId(req.headers)
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 })

  const { id } = await params

  // Verify ownership
  const session = await prisma.prospectionSession.findFirst({
    where: { id, siteId },
  })
  if (!session) return NextResponse.json({ error: 'Session non trouvee' }, { status: 404 })

  await prisma.prospectionSession.delete({ where: { id } })

  return NextResponse.json({ ok: true })
}
