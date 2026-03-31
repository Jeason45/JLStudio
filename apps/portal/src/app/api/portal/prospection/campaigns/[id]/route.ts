import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId } from '@/lib/auth';
import { logActivity } from '@/lib/activity';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || '';
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  const campaign = await prisma.prospectionCampaign.findFirst({
    where: { id, siteId },
  });

  if (!campaign) return NextResponse.json({ error: 'Campagne introuvable' }, { status: 404 });

  // Build results filter
  const resultsWhere: Record<string, unknown> = { campaignId: id };
  if (status) resultsWhere.status = status;
  if (category) resultsWhere.category = category;
  if (search) {
    resultsWhere.name = { contains: search, mode: 'insensitive' };
  }

  const results = await prisma.prospectionResult.findMany({
    where: resultsWhere,
    orderBy: { priorityScore: 'desc' },
  });

  return NextResponse.json({ ...campaign, results });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const campaign = await prisma.prospectionCampaign.findFirst({
    where: { id, siteId },
  });

  if (!campaign) return NextResponse.json({ error: 'Campagne introuvable' }, { status: 404 });

  // Cascade delete is handled by Prisma schema (onDelete: Cascade on results)
  await prisma.prospectionCampaign.delete({ where: { id } });

  await logActivity(siteId, userId, 'delete', 'prospectionCampaign', id);
  return NextResponse.json({ success: true });
}
