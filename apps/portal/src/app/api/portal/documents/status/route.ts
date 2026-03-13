import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId } from '@/lib/auth';
import { documentStatusUpdateSchema } from '@/lib/validations';
import { logActivity } from '@/lib/activity';

export async function PATCH(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const body = await req.json();
  const { id } = body;
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });

  const parsed = documentStatusUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const data: Record<string, unknown> = { status: parsed.data.status };
  if (parsed.data.status === 'SENT') data.sentAt = new Date();
  if (parsed.data.status === 'SIGNED') data.signedAt = new Date();
  if (parsed.data.status === 'PAID') data.paidAt = new Date();

  const document = await prisma.portalDocument.update({
    where: { id, siteId },
    data,
  });

  await logActivity(siteId, userId, 'update', 'document', id, { status: parsed.data.status });
  return NextResponse.json(document);
}
