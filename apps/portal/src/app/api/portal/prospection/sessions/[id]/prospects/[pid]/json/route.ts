import { NextRequest, NextResponse } from 'next/server'
import { extractSiteId } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateAuditReport } from '@/lib/prospection/auditJson'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; pid: string }> },
) {
  const siteId = extractSiteId(req.headers)
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 })

  const { id, pid } = await params

  const session = await prisma.prospectionSession.findFirst({ where: { id, siteId } })
  if (!session) return NextResponse.json({ error: 'Session non trouvee' }, { status: 404 })

  const prospect = await prisma.prospectionProspect.findUnique({ where: { id: pid } })
  if (!prospect) return NextResponse.json({ error: 'Prospect non trouve' }, { status: 404 })

  const report = generateAuditReport(prospect, prospect.auditData)

  return NextResponse.json(report)
}
