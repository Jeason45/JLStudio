import { NextRequest, NextResponse } from 'next/server';
import { prisma, getSiteId, getSiteContactFormId } from '@/lib/prisma';
import { leadCreateSchema } from '@/lib/validations';
import { calculateLeadScore, calculateEstimatedPrice } from '@/lib/scoring/lead-scorer';
import { rateLimit } from '@/lib/rateLimit';
import { sendEmail } from '@/lib/emailUtils';

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

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

    const siteId = await getSiteId();
    const contact = await prisma.contact.create({
      data: {
        siteId,
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

    // Create a Lead in the agency CRM pipeline (status NEW)
    const formId = await getSiteContactFormId();
    await prisma.lead.create({
      data: {
        siteId,
        contactId: contact.id,
        formId,
        status: 'NEW',
        source: data.source || 'site_qualifier',
        notes: data.message || null,
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          company: data.company || null,
          projectType: data.projectType || null,
          budget: data.budget || null,
          appointmentDay: data.appointmentDay || null,
          appointmentSlot: data.appointmentSlot || null,
          message: data.message || null,
          score,
          estimatedPrice,
        },
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

    // Notify admin
    const adminEmail = process.env.ADMIN_EMAIL || 'contact@jlstudio.dev';
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safePhone = data.phone ? escapeHtml(data.phone) : '';
    const safeCompany = data.company ? escapeHtml(data.company) : '';
    const safeType = data.projectType ? escapeHtml(data.projectType) : '';
    const safeBudget = data.budget ? escapeHtml(data.budget) : '';
    const safeMessage = data.message ? escapeHtml(data.message) : '';
    const hasAppointment = !!(data.appointmentDay && data.appointmentSlot);

    try {
      await sendEmail({
        to: adminEmail,
        subject: `${hasAppointment ? '📅 [RDV planifié] ' : ''}Nouveau lead qualifié : ${safeName} (${score}/100)`,
        type: 'lead_notification',
        contactId: contact.id,
        htmlContent: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            ${hasAppointment ? `<div style="background: #d1fae5; border-left: 4px solid #22c55e; padding: 12px 16px; margin-bottom: 16px; border-radius: 4px;">
              <strong style="color: #065f46;">📅 Rendez-vous planifié</strong>
              <div style="font-size: 13px; color: #065f46; margin-top: 4px;">${escapeHtml(data.appointmentDay || '')} — ${escapeHtml(data.appointmentSlot || '')}</div>
            </div>` : ''}
            <h2 style="color: #3B82F6;">Nouveau lead via le qualifier</h2>
            <p style="color: #333; font-size: 14px; margin-bottom: 16px;">
              Score : <strong>${score}/100</strong>${estimatedPrice ? ` · Budget estimé : <strong>${estimatedPrice.toLocaleString('fr-FR')} €</strong>` : ''}
            </p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666;">Nom</td><td style="padding: 8px 0; font-weight: bold;">${safeName}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #3B82F6;">${safeEmail}</a></td></tr>
              ${safePhone ? `<tr><td style="padding: 8px 0; color: #666;">Téléphone</td><td style="padding: 8px 0;"><a href="tel:${safePhone}" style="color: #3B82F6;">${safePhone}</a></td></tr>` : ''}
              ${safeCompany ? `<tr><td style="padding: 8px 0; color: #666;">Entreprise</td><td style="padding: 8px 0;">${safeCompany}</td></tr>` : ''}
              ${safeType ? `<tr><td style="padding: 8px 0; color: #666;">Type de projet</td><td style="padding: 8px 0;">${safeType}</td></tr>` : ''}
              ${safeBudget ? `<tr><td style="padding: 8px 0; color: #666;">Budget</td><td style="padding: 8px 0;">${safeBudget}</td></tr>` : ''}
            </table>
            ${safeMessage ? `<div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;"><p style="margin: 0; color: #333;">${safeMessage}</p></div>` : ''}
          </div>
        `,
        textContent: `Nouveau lead qualifier (score: ${score}/100):\nNom: ${data.name}\nEmail: ${data.email}\nTel: ${data.phone || 'N/A'}\nEntreprise: ${data.company || 'N/A'}\nType: ${data.projectType || 'N/A'}\nBudget: ${data.budget || 'N/A'}\nRDV: ${hasAppointment ? `${data.appointmentDay} ${data.appointmentSlot}` : 'Non'}\nMessage: ${data.message || 'Aucun'}`,
      });
    } catch (mailErr) {
      console.error('Lead notification email failed:', mailErr);
    }

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
