import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId } from '@/lib/auth';

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

  // Mark as PENDING — the local agent (npm run agent) will pick it up
  await prisma.prospectionCampaign.update({
    where: { id },
    data: { status: 'PENDING', progress: 0, error: null },
  });

  return NextResponse.json({ started: true, message: 'Campagne en attente — l\'agent local va la détecter' });
}
