import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId, extractUserRole, requirePortalAccess } from '@/lib/auth';
import { logActivity } from '@/lib/activity';
import { isValidTransition, type DocumentStatus } from '@/lib/documentStatus';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requirePortalAccess(req.headers);
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { siteId, role, contactId } = auth;
  const { id } = await params;

  const where: Record<string, unknown> = { id, siteId };
  if (role === 'CLIENT') where.contactId = contactId;

  const document = await prisma.portalDocument.findFirst({
    where,
    include: {
      contact: { select: { id: true, firstName: true, lastName: true, email: true, company: true } },
      signature: true,
    },
  });

  if (!document) return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });
  return NextResponse.json(document);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const role = extractUserRole(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  // CLIENT cannot modify documents
  if (role === 'CLIENT') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  const body = await req.json();

  // Recompute amounts if changed + validate state transition if status changes
  const data: Record<string, unknown> = { ...body };
  if (data.amount !== undefined || data.taxRate !== undefined || data.status !== undefined) {
    const current = await prisma.portalDocument.findFirst({ where: { id, siteId } });
    if (!current) return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });

    if (data.status !== undefined && data.status !== current.status) {
      if (!isValidTransition(current.status as DocumentStatus, data.status as DocumentStatus)) {
        return NextResponse.json(
          { error: `Transition invalide : ${current.status} → ${data.status}` },
          { status: 422 },
        );
      }
    }

    if (data.amount !== undefined || data.taxRate !== undefined) {
      const amount = (data.amount as number) ?? current.amount;
      const taxRate = (data.taxRate as number) ?? current.taxRate;
      if (amount != null) {
        const round2 = (n: number) => Math.round(n * 100) / 100;
        data.taxAmount = round2(amount * (taxRate / 100));
        data.totalAmount = round2(amount + (data.taxAmount as number));
      }
    }
  }

  // Status side effects
  if (data.status === 'SENT' && !data.sentAt) data.sentAt = new Date();
  if (data.status === 'SIGNED' && !data.signedAt) data.signedAt = new Date();
  if (data.status === 'PAID' && !data.paidAt) data.paidAt = new Date();

  const document = await prisma.portalDocument.update({
    where: { id, siteId },
    data,
    include: {
      contact: { select: { id: true, firstName: true, lastName: true, email: true, company: true } },
    },
  });

  await logActivity(siteId, userId, 'update', 'document', id, { status: data.status });
  return NextResponse.json(document);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const role = extractUserRole(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  // CLIENT cannot delete documents
  if (role === 'CLIENT') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  await prisma.portalDocument.delete({ where: { id, siteId } });
  await logActivity(siteId, userId, 'delete', 'document', id);
  return NextResponse.json({ success: true });
}
