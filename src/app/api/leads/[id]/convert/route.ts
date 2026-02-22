import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) {
      return NextResponse.json({ error: 'Lead introuvable' }, { status: 404 });
    }

    const updated = await prisma.contact.update({
      where: { id },
      data: { status: 'client' },
    });

    // Log interaction
    await prisma.interaction.create({
      data: {
        contactId: id,
        type: 'note',
        subject: 'Conversion en client',
        content: 'Lead converti en client',
      },
    });

    return NextResponse.json({ success: true, contact: updated });
  } catch (error) {
    console.error('Error converting lead:', error);
    return NextResponse.json({ error: 'Failed to convert lead' }, { status: 500 });
  }
}
