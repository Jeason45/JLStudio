import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/emailUtils';
import { prisma } from '@/lib/prisma';
import { calculateLeadScore } from '@/lib/scoring/lead-scorer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, selectedType, wantCallback } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Nom et email requis' }, { status: 400 });
    }

    // Create a lead in the CRM
    const score = calculateLeadScore({
      phone,
      projectType: selectedType || undefined,
    });

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        notes: message || null,
        projectType: selectedType || null,
        status: 'new',
        source: 'site',
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
    await sendEmail({
      to: adminEmail,
      subject: `Nouveau lead: ${name} (score: ${score})`,
      type: 'contact_notification',
      contactId: contact.id,
      htmlContent: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #638BFF;">Nouveau lead depuis le site</h2>
          <p style="color: #333; font-size: 14px; margin-bottom: 16px;">Un nouveau contact a ete cree automatiquement dans le CRM avec un score de <strong>${score}/100</strong>.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Nom</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #666;">Telephone</td><td style="padding: 8px 0;">${phone}</td></tr>` : ''}
            ${selectedType ? `<tr><td style="padding: 8px 0; color: #666;">Type de projet</td><td style="padding: 8px 0;">${selectedType}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #666;">Rappel souhaite</td><td style="padding: 8px 0;">${wantCallback ? 'Oui' : 'Non'}</td></tr>
          </table>
          ${message ? `<div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;"><p style="margin: 0; color: #333;">${message}</p></div>` : ''}
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
          <h2 style="color: #638BFF;">Merci ${name} !</h2>
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
