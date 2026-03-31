import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const campaign = await prisma.prospectionCampaign.findFirst({
    where: { id, siteId },
    include: {
      _count: { select: { results: true } },
    },
  });

  if (!campaign) return NextResponse.json({ error: 'Campagne introuvable' }, { status: 404 });

  return NextResponse.json({
    status: campaign.status,
    progress: campaign.progress,
    totalFound: campaign.totalFound,
    withSite: campaign.withSite,
    withoutSite: campaign.withoutSite,
    error: campaign.error,
    resultCount: campaign._count.results,
  });
}
