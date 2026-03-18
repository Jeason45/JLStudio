import { NextRequest, NextResponse } from 'next/server';
import { prisma, getSiteId } from '@/lib/prisma';
import { leadCreateSchema } from '@/lib/validations';
import { calculateLeadScore, calculateEstimatedPrice } from '@/lib/scoring/lead-scorer';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const { allowed } = rateLimit(`leads:${ip}`, 10, 60_000);
    if (!allowed) {
      return NextResponse.json({ error: 'Trop de requetes, reessayez plus tard' }, { status: 429 });
    }

    const body = await req.json();

    // Honeypot anti-spam: bots fill hidden fields
    if (body.website) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const parsed = leadCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const data = parsed.data;

    const score = calculateLeadScore({
      phone: data.phone || undefined,
      budget: data.budget || undefined,
      company: data.company || undefined,
      projectType: data.projectType || undefined,
    });
    const estimatedPrice = calculateEstimatedPrice({
      projectType: data.projectType || undefined,
    });

    const contact = await prisma.contact.create({
      data: {
        siteId: getSiteId(),
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        companyName: data.company || null,
        notes: data.message || null,
        projectType: data.projectType || null,
        budget: data.budget || null,
        status: 'NEW',
        source: data.source || 'site_qualifier',
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
