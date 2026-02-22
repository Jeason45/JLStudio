import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { projects: true, interactions: true } },
        projects: {
          select: {
            id: true, name: true, status: true, progress: true,
            priority: true, estimatedBudget: true, projectType: true,
            startDate: true, endDate: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 3,
        },
      },
    });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const contact = await prisma.contact.create({ data });
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}
