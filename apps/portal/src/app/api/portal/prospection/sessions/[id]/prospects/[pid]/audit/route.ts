import { NextRequest, NextResponse } from 'next/server'
import { extractSiteId } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { runFullAudit } from '@/app/api/portal/prospection/sessions/route'

export const maxDuration = 60

// POST — Run full audit for one prospect
export async function POST(
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

  const prospect = await prisma.prospectionProspect.findUnique({
    where: { id: pid },
  })
  if (!prospect) return NextResponse.json({ error: 'Prospect non trouve' }, { status: 404 })
  if (!prospect.website) {
    return NextResponse.json({ error: 'Ce prospect n\'a pas de site web' }, { status: 400 })
  }

  try {
    const pageSpeedApiKey = process.env.PAGESPEED_API_KEY || ''
    let url = prospect.website
    if (!url.startsWith('http')) url = `https://${url}`

    const auditData = await runFullAudit(url, pageSpeedApiKey)

    const updated = await prisma.prospectionProspect.update({
      where: { id: pid },
      data: {
        auditData: auditData as any,
        auditScore: auditData.mobileScore ?? null,
        auditedAt: new Date(),
        email: auditData.primaryEmail || prospect.email || null,
      },
    })

    return NextResponse.json(updated)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: `Erreur audit: ${msg}` }, { status: 500 })
  }
}
