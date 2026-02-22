import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * PATCH /api/documents/status
 * Update document status (e.g. mark facture as paid)
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'id et status requis' }, { status: 400 });
    }

    const validStatuses = ['draft', 'sent', 'pending_signature', 'signed', 'paid', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 });
    }

    const document = await prisma.document.update({
      where: { id },
      data: { status },
    });

    // If marking a facture as paid, update the contact's payment status
    if (status === 'paid' && document.contactId) {
      await prisma.contact.update({
        where: { id: document.contactId },
        data: {
          paymentStatus: 'paid',
          paidAmount: document.amount || 0,
          paidAt: new Date(),
        },
      });
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error('Erreur PATCH /api/documents/status:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}
