import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId } from '@/lib/auth';
import { subMonths, startOfMonth, endOfMonth, format } from 'date-fns';
import { fr } from 'date-fns/locale';

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  if (!siteId) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }

  const config = await prisma.portalConfig.findUnique({ where: { siteId } });
  const now = new Date();

  // Generate last 6 months labels
  const months: { start: Date; end: Date; label: string }[] = [];
  for (let i = 5; i >= 0; i--) {
    const date = subMonths(now, i);
    months.push({
      start: startOfMonth(date),
      end: endOfMonth(date),
      label: format(date, 'MMM yy', { locale: fr }),
    });
  }

  // Contacts per month
  const contactsPerMonth = await Promise.all(
    months.map(async (m) => ({
      month: m.label,
      value: await prisma.contact.count({
        where: { siteId, createdAt: { gte: m.start, lte: m.end } },
      }),
    }))
  );

  // Revenue per month (paid invoices)
  let revenuePerMonth: { month: string; value: number }[] = [];
  if (config?.moduleFactures) {
    revenuePerMonth = await Promise.all(
      months.map(async (m) => {
        const agg = await prisma.portalDocument.aggregate({
          where: {
            siteId,
            type: 'FACTURE',
            status: 'PAID',
            paidAt: { gte: m.start, lte: m.end },
          },
          _sum: { totalAmount: true },
        });
        return { month: m.label, value: agg._sum.totalAmount || 0 };
      })
    );
  }

  // Documents created per month (devis + factures)
  let documentsPerMonth: { month: string; devis: number; factures: number }[] = [];
  if (config?.moduleDevis || config?.moduleFactures) {
    documentsPerMonth = await Promise.all(
      months.map(async (m) => {
        const [devis, factures] = await Promise.all([
          config?.moduleDevis
            ? prisma.portalDocument.count({
                where: { siteId, type: 'DEVIS', createdAt: { gte: m.start, lte: m.end } },
              })
            : 0,
          config?.moduleFactures
            ? prisma.portalDocument.count({
                where: { siteId, type: 'FACTURE', createdAt: { gte: m.start, lte: m.end } },
              })
            : 0,
        ]);
        return { month: m.label, devis, factures };
      })
    );
  }

  // Recent activity (last 10)
  const recentActivity = await prisma.activity.findMany({
    where: { siteId },
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: {
      id: true,
      action: true,
      entity: true,
      entityId: true,
      details: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    contactsPerMonth,
    revenuePerMonth,
    documentsPerMonth,
    recentActivity,
  });
}
