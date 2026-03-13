import { NextRequest, NextResponse } from 'next/server'

// Données mock pour développement sans DB
const MOCK_LEADS = [
  {
    id: 'lead-1',
    siteId: 'mock',
    contactId: 'contact-1',
    formId: 'form-contact',
    status: 'new',
    source: 'contact-form',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    data: { prenom: 'Alice', nom: 'Dupont', email: 'alice@example.com', message: 'Bonjour, je souhaite un devis.' },
    contact: { id: 'contact-1', email: 'alice@example.com', firstName: 'Alice', lastName: 'Dupont', company: 'TechCorp' },
  },
  {
    id: 'lead-2',
    siteId: 'mock',
    contactId: 'contact-2',
    formId: 'form-contact',
    status: 'contacted',
    source: 'contact-form',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    data: { prenom: 'Bob', nom: 'Martin', email: 'bob@startup.io', message: 'Intéressé par votre offre Pro.' },
    contact: { id: 'contact-2', email: 'bob@startup.io', firstName: 'Bob', lastName: 'Martin', company: 'Startup.io' },
  },
  {
    id: 'lead-3',
    siteId: 'mock',
    contactId: 'contact-3',
    formId: 'form-contact',
    status: 'qualified',
    source: 'contact-form',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    data: { prenom: 'Carla', nom: 'Bernard', email: 'carla@agence.fr', message: 'Nous avons 5 sites à créer ce trimestre.' },
    contact: { id: 'contact-3', email: 'carla@agence.fr', firstName: 'Carla', lastName: 'Bernard', company: 'Agence Design' },
  },
  {
    id: 'lead-4',
    siteId: 'mock',
    contactId: 'contact-4',
    formId: 'form-contact',
    status: 'new',
    source: 'contact-form',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    data: { prenom: 'David', nom: 'Leroy', email: 'david@freelance.com', message: "Question sur l'export code." },
    contact: { id: 'contact-4', email: 'david@freelance.com', firstName: 'David', lastName: 'Leroy', company: null },
  },
]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  try {
    const { siteId } = await params

    // Tenter de récupérer depuis la DB
    try {
      const { prisma } = await import('@/lib/db')
      const leads = await prisma.lead.findMany({
        where: { siteId },
        include: { contact: true },
        orderBy: { createdAt: 'desc' },
        take: 50,
      })
      return NextResponse.json({ leads, source: 'db' })
    } catch {
      // Fallback mock si DB non connectée
      return NextResponse.json({ leads: MOCK_LEADS, source: 'mock' })
    }
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  try {
    await params
    const body = await request.json()
    const { leadId, status } = body

    try {
      const { prisma } = await import('@/lib/db')
      const lead = await prisma.lead.update({
        where: { id: leadId },
        data: { status },
        include: { contact: true },
      })
      return NextResponse.json({ lead })
    } catch {
      // Mock : retourner succès sans vraie modification
      return NextResponse.json({ lead: { id: leadId, status }, source: 'mock' })
    }
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
