import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId } from '@/lib/auth';
import { startOfMonth, startOfDay, endOfDay } from 'date-fns';

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  if (!siteId) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }

  // Load config to know which modules are active
  const config = await prisma.portalConfig.findUnique({ where: { siteId } });

  const now = new Date();
  const monthStart = startOfMonth(now);
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);

  // Always compute base stats
  const [totalContacts, totalLeads, newLeadsThisMonth] = await Promise.all([
    prisma.contact.count({ where: { siteId } }),
    prisma.lead.count({ where: { siteId } }),
    prisma.lead.count({ where: { siteId, createdAt: { gte: monthStart } } }),
  ]);

  const stats: Record<string, unknown> = {
    totalContacts,
    totalLeads,
    newLeadsThisMonth,
  };

  // Devis stats
  if (config?.moduleDevis) {
    const [totalDevis, devisEnAttente, devisEnAttenteData] = await Promise.all([
      prisma.portalDocument.count({ where: { siteId, type: 'DEVIS' } }),
      prisma.portalDocument.count({ where: { siteId, type: 'DEVIS', status: { in: ['DRAFT', 'SENT'] } } }),
      prisma.portalDocument.aggregate({
        where: { siteId, type: 'DEVIS', status: { in: ['DRAFT', 'SENT'] } },
        _sum: { totalAmount: true },
      }),
    ]);
    stats.totalDevis = totalDevis;
    stats.devisEnAttente = devisEnAttente;
    stats.montantDevisEnAttente = devisEnAttenteData._sum.totalAmount || 0;
  }

  // Factures stats
  if (config?.moduleFactures) {
    const [totalFactures, facturesImpayees, facturesImpayeesData] = await Promise.all([
      prisma.portalDocument.count({ where: { siteId, type: 'FACTURE' } }),
      prisma.portalDocument.count({ where: { siteId, type: 'FACTURE', status: { in: ['SENT', 'DRAFT'] } } }),
      prisma.portalDocument.aggregate({
        where: { siteId, type: 'FACTURE', status: { in: ['SENT', 'DRAFT'] } },
        _sum: { totalAmount: true },
      }),
    ]);
    stats.totalFactures = totalFactures;
    stats.facturesImpayees = facturesImpayees;
    stats.montantFacturesImpayees = facturesImpayeesData._sum.totalAmount || 0;
  }

  // Contrats stats
  if (config?.moduleContrats) {
    stats.totalContrats = await prisma.portalDocument.count({ where: { siteId, type: 'CONTRAT' } });
  }

  // Calendrier stats
  if (config?.moduleCalendrier) {
    stats.rdvAujourdhui = await prisma.portalAppointment.count({
      where: { siteId, startTime: { gte: todayStart, lte: todayEnd } },
    });
  }

  // CMS stats
  if (config?.moduleCMS) {
    stats.totalCmsItems = await prisma.cmsItem.count({
      where: { collection: { siteId } },
    });
  }

  return NextResponse.json(stats);
}
