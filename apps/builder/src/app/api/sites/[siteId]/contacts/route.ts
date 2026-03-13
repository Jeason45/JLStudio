import { NextRequest, NextResponse } from 'next/server'

const MOCK_CONTACTS = [
  { id: 'contact-1', email: 'alice@example.com', firstName: 'Alice', lastName: 'Dupont', company: 'TechCorp', status: 'active', tags: ['lead', 'intéressé'], createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: 'contact-2', email: 'bob@startup.io', firstName: 'Bob', lastName: 'Martin', company: 'Startup.io', status: 'active', tags: ['lead', 'pro'], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: 'contact-3', email: 'carla@agence.fr', firstName: 'Carla', lastName: 'Bernard', company: 'Agence Design', status: 'active', tags: ['qualifié', 'agence'], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: 'contact-4', email: 'david@freelance.com', firstName: 'David', lastName: 'Leroy', company: null, status: 'active', tags: ['lead'], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  try {
    const { siteId } = await params

    try {
      const { prisma } = await import('@/lib/db')
      const contacts = await prisma.contact.findMany({
        where: { siteId },
        orderBy: { createdAt: 'desc' },
        take: 100,
      })
      return NextResponse.json({ contacts, source: 'db' })
    } catch {
      return NextResponse.json({ contacts: MOCK_CONTACTS, source: 'mock' })
    }
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
