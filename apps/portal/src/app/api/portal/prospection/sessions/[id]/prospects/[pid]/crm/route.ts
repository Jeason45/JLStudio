import { NextRequest, NextResponse } from 'next/server'
import { extractSiteId } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST — Create Contact from prospect
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

  if (prospect.addedToCRM) {
    return NextResponse.json({ error: 'Deja ajoute au CRM' }, { status: 400 })
  }

  try {
    const contact = await prisma.contact.create({
      data: {
        siteId,
        email: prospect.email || `inconnu+${prospect.id}@prospect.local`,
        firstName: prospect.name,
        companyName: prospect.name,
        city: prospect.city || undefined,
        address: prospect.address || undefined,
        postalCode: prospect.postalCode || undefined,
        source: 'prospector',
        projectType: prospect.category === 'creation' ? 'vitrine' : 'refonte',
        score: prospect.auditScore ?? undefined,
        tags: ['prospect-auto'],
        metadata: prospect.auditData ?? undefined,
      },
    })

    await prisma.prospectionProspect.update({
      where: { id: pid },
      data: {
        addedToCRM: true,
        contactId: contact.id,
      },
    })

    return NextResponse.json(contact)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: `Erreur CRM: ${msg}` }, { status: 500 })
  }
}
