import { NextRequest, NextResponse } from 'next/server'
import { extractSiteId } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// PATCH — Update prospect (notes, etc.)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; pid: string }> },
) {
  const siteId = extractSiteId(req.headers)
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 })

  const { id, pid } = await params

  // Verify ownership
  const session = await prisma.prospectionSession.findFirst({
    where: { id, siteId },
  })
  if (!session) return NextResponse.json({ error: 'Session non trouvee' }, { status: 404 })

  const body = await req.json()
  const data: Record<string, unknown> = {}
  if (typeof body.notes === 'string') data.notes = body.notes

  const prospect = await prisma.prospectionProspect.update({
    where: { id: pid },
    data,
  })

  return NextResponse.json(prospect)
}

// DELETE — Delete single prospect
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; pid: string }> },
) {
  const siteId = extractSiteId(req.headers)
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 })

  const { id, pid } = await params

  // Verify ownership
  const session = await prisma.prospectionSession.findFirst({
    where: { id, siteId },
  })
  if (!session) return NextResponse.json({ error: 'Session non trouvee' }, { status: 404 })

  await prisma.prospectionProspect.delete({ where: { id: pid } })

  return NextResponse.json({ ok: true })
}
