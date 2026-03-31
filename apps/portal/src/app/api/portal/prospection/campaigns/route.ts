import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId } from '@/lib/auth';
import { logActivity } from '@/lib/activity';
import { parsePagination, paginatedResponse } from '@/lib/pagination';

const campaignCreateSchema = z.object({
  metier: z.string().min(1, 'Metier requis'),
  ville: z.string().min(1, 'Ville requise'),
  limit: z.number().int().min(1).max(200).default(20),
});

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const { page, limit, skip } = parsePagination(searchParams);

  const where = { siteId };

  const [campaigns, total] = await Promise.all([
    prisma.prospectionCampaign.findMany({
      where,
      include: {
        _count: { select: { results: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.prospectionCampaign.count({ where }),
  ]);

  return NextResponse.json(paginatedResponse(campaigns, total, page, limit));
}

export async function POST(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const body = await req.json();
  const parsed = campaignCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const campaign = await prisma.prospectionCampaign.create({
    data: {
      siteId,
      metier: parsed.data.metier,
      ville: parsed.data.ville,
      limit: parsed.data.limit,
    },
  });

  await logActivity(siteId, userId, 'create', 'prospectionCampaign', campaign.id, {
    metier: parsed.data.metier,
    ville: parsed.data.ville,
  });

  return NextResponse.json(campaign, { status: 201 });
}
