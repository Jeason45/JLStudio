import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/emailUtils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, selectedType, wantCallback } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Nom et email requis' }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      console.error('ADMIN_EMAIL not configured');
      return NextResponse.json({ error: 'Configuration email manquante' }, { status: 500 });
    }

    // Send notification to admin
    await sendEmail({
      to: adminEmail,
      subject: `Nouveau contact: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #638BFF;">Nouvelle demande de contact</h2>
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
      text: `Nouveau contact:\nNom: ${name}\nEmail: ${email}\nTel: ${phone || 'N/A'}\nType: ${selectedType || 'N/A'}\nMessage: ${message || 'Aucun'}\nRappel: ${wantCallback ? 'Oui' : 'Non'}`,
    });

    // Send confirmation to client
    await sendEmail({
      to: email,
      subject: 'Confirmation de votre demande - JL Studio',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #638BFF;">Merci ${name} !</h2>
          <p>Nous avons bien recu votre demande et nous vous recontacterons rapidement.</p>
          ${wantCallback ? '<p>Comme demande, nous vous rappellerons dans les meilleurs delais.</p>' : ''}
          <p style="color: #666; margin-top: 24px;">A bientot,<br><strong>JL Studio</strong></p>
        </div>
      `,
      text: `Bonjour ${name},\n\nNous avons bien recu votre demande.\n${wantCallback ? 'Nous vous rappellerons dans les meilleurs delais.\n' : ''}\nA bientot,\nJL Studio`,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
  }
}
