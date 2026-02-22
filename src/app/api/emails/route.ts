import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 50;

    const where: Record<string, unknown> = {};
    if (status && ['sent', 'failed', 'pending'].includes(status)) {
      where.status = status;
    }

    const emails = await prisma.mailLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        contact: {
          select: { name: true, email: true },
        },
      },
    });

    return NextResponse.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
  }
}
