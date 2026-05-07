import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';

function ensureSuperAdmin(req: NextRequest): NextResponse | null {
  if (req.headers.get('x-portal-super-admin') !== 'true') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

// GET — single document for edit (excludes binary pdfData/signedPdfData)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = ensureSuperAdmin(req);
  if (denied) return denied;

  const site = await getAgencySite();
  const { id } = await params;

  const doc = await prisma.portalDocument.findFirst({
    where: { id, siteId: site.id },
    select: {
      id: true, siteId: true, contactId: true, projectId: true,
      type: true, status: true, documentNumber: true, title: true,
      content: true, amount: true, taxRate: true, taxAmount: true, totalAmount: true,
      validUntil: true, sentAt: true, signedAt: true, paidAt: true,
      notes: true, templateSlug: true, linkedDocumentId: true,
      createdAt: true, updatedAt: true,
      contact: { select: { id: true, name: true, email: true, companyName: true, firstName: true, lastName: true, phone: true } },
      signature: { select: { id: true, signerName: true, signedAt: true } },
    },
  });

  if (!doc) return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });
  return NextResponse.json(doc);
}
