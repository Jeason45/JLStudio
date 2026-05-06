import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export async function GET(req: NextRequest) {
  const isSuperAdmin = req.headers.get('x-portal-super-admin') === 'true';
  if (!isSuperAdmin) {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  try {
    // All sites
    const sites = await prisma.site.findMany({
      select: { id: true, name: true, slug: true, status: true, deployUrl: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });

    const siteIds = sites.map((s) => s.id);

    // Aggregated counts
    const [
      totalContacts,
      totalLeads,
      totalDocuments,
      totalProjects,
    ] = await Promise.all([
      prisma.contact.count({ where: { siteId: { in: siteIds } } }),
      prisma.lead.count({ where: { siteId: { in: siteIds } } }),
      prisma.portalDocument.count({ where: { siteId: { in: siteIds } } }),
      prisma.portalProject.count({ where: { siteId: { in: siteIds } } }),
    ]);

    // Revenue (paid invoices)
    const paidInvoices = await prisma.portalDocument.aggregate({
      where: {
        siteId: { in: siteIds },
        type: 'FACTURE',
        status: 'PAID',
      },
      _sum: { totalAmount: true },
    });
    const totalRevenue = paidInvoices._sum.totalAmount || 0;

    // Unpaid invoices
    const unpaidInvoices = await prisma.portalDocument.aggregate({
      where: {
        siteId: { in: siteIds },
        type: 'FACTURE',
        status: { in: ['SENT', 'SIGNED', 'ACCEPTED'] },
      },
      _sum: { totalAmount: true },
      _count: true,
    });

    // Pending quotes
    const pendingQuotes = await prisma.portalDocument.aggregate({
      where: {
        siteId: { in: siteIds },
        type: 'DEVIS',
        status: { in: ['SENT', 'DRAFT'] },
      },
      _sum: { totalAmount: true },
      _count: true,
    });

    // Per-site stats
    const perSite = await Promise.all(
      sites.map(async (site) => {
        const [contacts, leads, projects, revenue] = await Promise.all([
          prisma.contact.count({ where: { siteId: site.id } }),
          prisma.lead.count({ where: { siteId: site.id } }),
          prisma.portalProject.findMany({
            where: { siteId: site.id },
            select: { id: true, name: true, status: true, dueDate: true, progress: true },
            orderBy: { createdAt: 'desc' },
            take: 5,
          }),
          prisma.portalDocument.aggregate({
            where: { siteId: site.id, type: 'FACTURE', status: 'PAID' },
            _sum: { totalAmount: true },
          }),
        ]);

        return {
          id: site.id,
          name: site.name,
          slug: site.slug,
          status: site.status,
          deployUrl: site.deployUrl,
          createdAt: site.createdAt,
          contacts,
          leads,
          revenue: revenue._sum.totalAmount || 0,
          projects,
        };
      })
    );

    // Recent activity across all sites (last 20)
    const recentActivity = await prisma.activity.findMany({
      where: { siteId: { in: siteIds } },
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: { site: { select: { name: true } } },
    });

    return NextResponse.json({
      global: {
        totalSites: sites.length,
        totalContacts,
        totalLeads,
        totalDocuments,
        totalProjects,
        totalRevenue,
        unpaidAmount: unpaidInvoices._sum.totalAmount || 0,
        unpaidCount: unpaidInvoices._count,
        pendingQuotesAmount: pendingQuotes._sum.totalAmount || 0,
        pendingQuotesCount: pendingQuotes._count,
      },
      sites: perSite,
      recentActivity: recentActivity.map((a) => ({
        id: a.id,
        action: a.action,
        entity: a.entity,
        entityId: a.entityId,
        siteName: (a as Record<string, unknown>).site
          ? ((a as Record<string, unknown>).site as { name: string }).name
          : null,
        createdAt: a.createdAt,
      })),
    });
  } catch (err) {
    logger.error({ err }, 'Admin overview error');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
