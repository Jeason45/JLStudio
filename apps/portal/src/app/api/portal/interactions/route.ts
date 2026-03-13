import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId } from '@/lib/auth';
import { interactionCreateSchema } from '@/lib/validations';
import { logActivity } from '@/lib/activity';

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const contactId = searchParams.get('contactId');
  if (!contactId) return NextResponse.json({ error: 'contactId requis' }, { status: 400 });

  const interactions = await prisma.portalInteraction.findMany({
    where: { siteId, contactId },
    orderBy: { date: 'desc' },
  });

  return NextResponse.json(interactions);
}

export async function POST(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const body = await req.json();
  const parsed = interactionCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const interaction = await prisma.portalInteraction.create({
    data: {
      siteId,
      contactId: parsed.data.contactId,
      type: parsed.data.type,
      title: parsed.data.title,
      content: parsed.data.content,
      date: parsed.data.date ? new Date(parsed.data.date) : new Date(),
    },
  });

  await logActivity(siteId, userId, 'create', 'interaction', interaction.id);
  return NextResponse.json(interaction, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });

  await prisma.portalInteraction.delete({ where: { id, siteId } });
  await logActivity(siteId, userId, 'delete', 'interaction', id);
  return NextResponse.json({ success: true });
}
