import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/emailUtils';

// POST /api/cron/rdv-reminder
// Send appointment reminders at J-1 (24h) and H-1 (1h) before startTime
// Secured by CRON_SECRET header
export async function POST(req: NextRequest) {
  try {
    const cronSecret = req.headers.get('x-cron-secret');
    if (!cronSecret || cronSecret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      return NextResponse.json({ error: 'ADMIN_EMAIL not configured' }, { status: 500 });
    }

    const now = new Date();
    const in1Hour = new Date(now.getTime() + 60 * 60 * 1000);
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Find appointments within the next 1 hour (H-1 reminder)
    const appointmentsH1 = await prisma.appointment.findMany({
      where: {
        status: { in: ['scheduled', 'confirmed'] },
        startTime: { gt: now, lte: in1Hour },
      },
      include: { contact: true },
      orderBy: { startTime: 'asc' },
    });

    // Find appointments between 1h and 24h from now (J-1 reminder)
    const appointmentsJ1 = await prisma.appointment.findMany({
      where: {
        status: { in: ['scheduled', 'confirmed'] },
        startTime: { gt: in1Hour, lte: in24Hours },
      },
      include: { contact: true },
      orderBy: { startTime: 'asc' },
    });

    const totalAppointments = appointmentsH1.length + appointmentsJ1.length;

    if (totalAppointments === 0) {
      return NextResponse.json({ success: true, message: 'No upcoming appointments found', count: 0 });
    }

    // Build appointment rows for H-1
    const h1Rows = appointmentsH1.map((apt) => {
      const time = apt.startTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      const endTime = apt.endTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      const clientName = apt.contact?.name || 'Sans client';
      const location = apt.location || '-';

      return `<tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">
          <span style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; color: #fff; background: #ef4444;">IMMINENT</span>
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${apt.title}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">${clientName}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: center; font-weight: 600; color: #ef4444;">${time} - ${endTime}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">${location}</td>
      </tr>`;
    }).join('');

    // Build appointment rows for J-1
    const j1Rows = appointmentsJ1.map((apt) => {
      const time = apt.startTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      const endTime = apt.endTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      const date = apt.startTime.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
      const clientName = apt.contact?.name || 'Sans client';
      const location = apt.location || '-';

      return `<tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">
          <span style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; color: #fff; background: #f59e0b;">J-1</span>
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${apt.title}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">${clientName}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${date} ${time} - ${endTime}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">${location}</td>
      </tr>`;
    }).join('');

    const allRows = h1Rows + j1Rows;

    // Summary counts for banner
    const h1Count = appointmentsH1.length;
    const j1Count = appointmentsJ1.length;
    const summaryParts: string[] = [];
    if (h1Count > 0) summaryParts.push(`${h1Count} dans moins d'1h`);
    if (j1Count > 0) summaryParts.push(`${j1Count} dans les 24h`);

    await sendEmail({
      to: adminEmail,
      subject: `Rappel RDV : ${totalAppointments} rendez-vous a venir${h1Count > 0 ? ' (dont ' + h1Count + ' imminent' + (h1Count > 1 ? 's' : '') + ')' : ''}`,
      type: 'cron_rdv_reminder',
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 750px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #638BFF, #4a6fd4); color: #fff; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0 0 8px 0; font-size: 22px;">Rappel de rendez-vous</h1>
            <p style="margin: 0; opacity: 0.9; font-size: 14px;">${summaryParts.join(' &bull; ')}</p>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            ${h1Count > 0 ? `
            <div style="background: #fff; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; border-left: 4px solid #ef4444;">
              <p style="margin: 0; font-size: 14px; font-weight: 600; color: #ef4444;">Attention : ${h1Count} rendez-vous dans moins d'une heure</p>
            </div>
            ` : ''}
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: #fff; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: #f3f4f6;">
                  <th style="padding: 12px; text-align: left; font-weight: 600; color: #374151;">Urgence</th>
                  <th style="padding: 12px; text-align: left; font-weight: 600; color: #374151;">Titre</th>
                  <th style="padding: 12px; text-align: left; font-weight: 600; color: #374151;">Client</th>
                  <th style="padding: 12px; text-align: center; font-weight: 600; color: #374151;">Horaire</th>
                  <th style="padding: 12px; text-align: left; font-weight: 600; color: #374151;">Lieu</th>
                </tr>
              </thead>
              <tbody>${allRows}</tbody>
            </table>
            <p style="color: #6b7280; margin-top: 24px; font-size: 13px;">Connectez-vous au CRM pour gerer vos rendez-vous.</p>
          </div>
        </div>
      `,
      textContent: `Rappel : ${totalAppointments} rendez-vous a venir\n\n${h1Count > 0 ? `IMMINENT (moins d'1h) :\n${appointmentsH1.map(a => `- ${a.title} | ${a.contact?.name || 'Sans client'} | ${a.startTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} | ${a.location || '-'}`).join('\n')}\n\n` : ''}${j1Count > 0 ? `Dans les 24h :\n${appointmentsJ1.map(a => `- ${a.title} | ${a.contact?.name || 'Sans client'} | ${a.startTime.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })} ${a.startTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} | ${a.location || '-'}`).join('\n')}` : ''}`,
    });

    return NextResponse.json({
      success: true,
      message: `RDV reminder sent: ${h1Count} imminent, ${j1Count} within 24h`,
      count: totalAppointments,
      h1Count,
      j1Count,
    });
  } catch (error) {
    console.error('Cron rdv-reminder error:', error);
    return NextResponse.json({ error: 'Cron rdv-reminder failed' }, { status: 500 });
  }
}
