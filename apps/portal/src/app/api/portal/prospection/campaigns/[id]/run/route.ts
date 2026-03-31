import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId } from '@/lib/auth';
import { runProspectionCampaign } from '@/lib/prospection/worker';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const campaign = await prisma.prospectionCampaign.findFirst({
    where: { id, siteId },
  });

  if (!campaign) return NextResponse.json({ error: 'Campagne introuvable' }, { status: 404 });

  if (campaign.status === 'RUNNING') {
    return NextResponse.json({ error: 'Campagne deja en cours' }, { status: 409 });
  }

  // Fire and forget — don't block the response
  runProspectionCampaign(campaign.id).catch(err =>
    console.error('Prospection worker error:', err)
  );

  return NextResponse.json({ started: true });
}
