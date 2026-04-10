import { NextRequest, NextResponse } from 'next/server'
import { extractSiteId } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateAuditReport } from '@/lib/prospection/auditJson'
import { generateAuditPdf } from '@/lib/prospection/pdfGenerator'

export const maxDuration = 60

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

  const report = generateAuditReport(prospect, prospect.auditData, session.query || undefined)
  const buffer = await generateAuditPdf(report)

  const safeName = (prospect.name || 'audit').replace(/[^a-z0-9]+/gi, '_').toLowerCase()
  const filename = `audit-${safeName}.pdf`

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(buffer.length),
    },
  })
}
