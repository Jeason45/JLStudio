import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

const PER_TYPE_LIMIT = 5;

/**
 * Recherche globale agency-scoped : Contacts, Documents, Projets.
 * Retourne des résultats groupés par type, limités à PER_TYPE_LIMIT
 * par catégorie pour garder la dropdown lisible.
 */
export async function GET(req: NextRequest) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').trim();
  if (q.length < 1) {
    return NextResponse.json({ contacts: [], documents: [], projects: [] });
  }

  const site = await getAgencySite();

  const [contacts, documents, projects] = await Promise.all([
    // Contacts
    prisma.contact.findMany({
      where: {
        siteId: site.id,
        deletedAt: null,
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { firstName: { contains: q, mode: 'insensitive' } },
          { lastName: { contains: q, mode: 'insensitive' } },
          { email: { contains: q, mode: 'insensitive' } },
          { companyName: { contains: q, mode: 'insensitive' } },
          { company: { contains: q, mode: 'insensitive' } },
          { phone: { contains: q, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true, name: true, firstName: true, lastName: true,
        email: true, companyName: true, status: true, type: true,
      },
      orderBy: { updatedAt: 'desc' },
      take: PER_TYPE_LIMIT,
    }),

    // Documents (devis, factures, contrats)
    prisma.portalDocument.findMany({
      where: {
        siteId: site.id,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { documentNumber: { contains: q, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true, type: true, status: true, documentNumber: true, title: true,
        totalAmount: true,
        contact: { select: { id: true, name: true, companyName: true } },
      },
      orderBy: { updatedAt: 'desc' },
      take: PER_TYPE_LIMIT,
    }),

    // Projets
    prisma.portalProject.findMany({
      where: {
        siteId: site.id,
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true, name: true, status: true, priority: true,
        contact: { select: { id: true, name: true, companyName: true } },
      },
      orderBy: { updatedAt: 'desc' },
      take: PER_TYPE_LIMIT,
    }),
  ]);

  return NextResponse.json({ contacts, documents, projects });
}
