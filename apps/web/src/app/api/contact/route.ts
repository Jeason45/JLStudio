import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/emailUtils';
import { prisma, getSiteId } from '@/lib/prisma';
import { publicContactSchema } from '@/lib/validations';
import { calculateLeadScore } from '@/lib/scoring/lead-scorer';
import { rateLimit } from '@/lib/rateLimit';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const { allowed } = rateLimit(`contact:${ip}`, 10, 60_000);
    if (!allowed) {
      return NextResponse.json({ error: 'Trop de requetes, reessayez plus tard' }, { status: 429 });
    }

    const body = await request.json();

    // Honeypot anti-spam: bots fill hidden fields
    if (body.website) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const parsed = publicContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const { name, email, phone, message, selectedType, wantCallback } = parsed.data;

    // Create a lead in the CRM
    const score = calculateLeadScore({
      phone: phone || undefined,
      projectType: selectedType || undefined,
    });

    const contact = await prisma.contact.create({
      data: {
        siteId: getSiteId(),
        name,
        email,
        phone: phone || null,
        notes: message || null,
        projectType: selectedType || null,
        status: 'NEW',
        source: 'site_contact',
        type: 'particulier',
        score,
      },
    });

    // Log the initial interaction
    await prisma.interaction.create({
      data: {
        contactId: contact.id,
        type: 'note',
        direction: 'inbound',
        subject: 'Formulaire de contact',
        content: `Type de projet: ${selectedType || 'Non specifie'}\nRappel souhaite: ${wantCallback ? 'Oui' : 'Non'}\n\n${message || ''}`,
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      console.error('ADMIN_EMAIL not configured');
      return NextResponse.json({ success: true, contact }, { status: 201 });
    }

    // Send notification to admin
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : '';
    const safeType = selectedType ? escapeHtml(selectedType) : '';
    const safeMessage = message ? escapeHtml(message) : '';

    await sendEmail({
      to: adminEmail,
      subject: `Nouveau lead: ${safeName} (score: ${score})`,
      type: 'contact_notification',
      contactId: contact.id,
      htmlContent: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #638BFF;">Nouveau lead depuis le site</h2>
          <p style="color: #333; font-size: 14px; margin-bottom: 16px;">Un nouveau contact a ete cree automatiquement dans le CRM avec un score de <strong>${score}/100</strong>.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Nom</td><td style="padding: 8px 0; font-weight: bold;">${safeName}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;">${safeEmail}</td></tr>
            ${safePhone ? `<tr><td style="padding: 8px 0; color: #666;">Telephone</td><td style="padding: 8px 0;">${safePhone}</td></tr>` : ''}
            ${safeType ? `<tr><td style="padding: 8px 0; color: #666;">Type de projet</td><td style="padding: 8px 0;">${safeType}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #666;">Rappel souhaite</td><td style="padding: 8px 0;">${wantCallback ? 'Oui' : 'Non'}</td></tr>
          </table>
          ${safeMessage ? `<div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;"><p style="margin: 0; color: #333;">${safeMessage}</p></div>` : ''}
        </div>
      `,
      textContent: `Nouveau lead (score: ${score}/100):\nNom: ${name}\nEmail: ${email}\nTel: ${phone || 'N/A'}\nType: ${selectedType || 'N/A'}\nMessage: ${message || 'Aucun'}\nRappel: ${wantCallback ? 'Oui' : 'Non'}`,
    });

    // Send confirmation to client
    await sendEmail({
      to: email,
      subject: 'Confirmation de votre demande - JL Studio',
      type: 'contact_confirmation',
      contactId: contact.id,
      htmlContent: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #638BFF;">Merci ${safeName} !</h2>
          <p>Nous avons bien recu votre demande et nous vous recontacterons rapidement.</p>
          ${wantCallback ? '<p>Comme demande, nous vous rappellerons dans les meilleurs delais.</p>' : ''}
          <p style="color: #666; margin-top: 24px;">A bientot,<br><strong>JL Studio</strong></p>
        </div>
      `,
      textContent: `Bonjour ${name},\n\nNous avons bien recu votre demande.\n${wantCallback ? 'Nous vous rappellerons dans les meilleurs delais.\n' : ''}\nA bientot,\nJL Studio`,
    });

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
  }
}
