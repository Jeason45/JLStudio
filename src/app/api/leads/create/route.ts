import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateLeadScore, calculateEstimatedPrice } from '@/lib/scoring/lead-scorer';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const score = calculateLeadScore(data);
    const estimatedPrice = calculateEstimatedPrice(data);

    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        companyName: data.company || null,
        notes: data.message || null,
        projectType: data.projectType || null,
        budget: data.budget || null,
        status: 'new',
        source: data.source || 'site',
        type: data.company ? 'entreprise' : 'particulier',
        score,
        estimatedPrice,
      },
    });

    // Create appointment if requested
    if (data.appointmentDay && data.appointmentSlot) {
      try {
        const [startHour] = data.appointmentSlot.split(' - ');
        const appointmentDate = new Date(data.appointmentDay);
        const [hour, minute] = startHour.split(':');

        const startTime = new Date(appointmentDate);
        startTime.setHours(parseInt(hour), parseInt(minute), 0);

        const endTime = new Date(startTime);
        endTime.setHours(startTime.getHours() + 1);

        await prisma.appointment.create({
          data: {
            contactId: contact.id,
            title: `Appel avec ${data.company || data.name}`,
            startTime,
            endTime,
            status: 'scheduled',
            location: 'phone',
          },
        });
      } catch (err) {
        console.error('Error creating appointment:', err);
      }
    }

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
