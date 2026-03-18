import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/emailUtils';

// POST /api/cron/follow-up
// Send follow-up reminders for leads that haven't been contacted after 48h
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

    // Find leads with status 'new' created more than 48 hours ago
    const twoDaysAgo = new Date();
    twoDaysAgo.setHours(twoDaysAgo.getHours() - 48);

    const staleLeads = await prisma.contact.findMany({
      where: {
        status: 'NEW',
        deletedAt: null,
        createdAt: { lt: twoDaysAgo },
      },
      orderBy: { score: 'desc' },
      take: 20,
    });

    if (staleLeads.length === 0) {
      return NextResponse.json({ success: true, message: 'No stale leads found', count: 0 });
    }

    // Build a summary email for the admin
    const leadRows = staleLeads.map((lead) => {
      const createdAt = lead.createdAt.toLocaleDateString('fr-FR');
      return `<tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${lead.name}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${lead.email || '-'}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${lead.projectType || '-'}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee; text-align: center; font-weight: bold; color: ${(lead.score ?? 0) >= 70 ? '#10b981' : (lead.score ?? 0) >= 50 ? '#fbbf24' : '#ef4444'};">${lead.score ?? 0}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${createdAt}</td>
      </tr>`;
    }).join('');

    await sendEmail({
      to: adminEmail,
      subject: `Relance: ${staleLeads.length} lead(s) en attente de contact`,
      type: 'cron_followup',
      htmlContent: `
        <div style="font-family: sans-serif; max-width: 700px; margin: 0 auto;">
          <h2 style="color: #638BFF;">Leads en attente de contact</h2>
          <p style="color: #333; margin-bottom: 16px;">Les leads suivants n'ont pas ete contactes depuis plus de 48 heures :</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="background: #f8f9fa;">
                <th style="padding: 10px 12px; text-align: left; font-weight: 600;">Nom</th>
                <th style="padding: 10px 12px; text-align: left; font-weight: 600;">Email</th>
                <th style="padding: 10px 12px; text-align: left; font-weight: 600;">Projet</th>
                <th style="padding: 10px 12px; text-align: center; font-weight: 600;">Score</th>
                <th style="padding: 10px 12px; text-align: left; font-weight: 600;">Date</th>
              </tr>
            </thead>
            <tbody>${leadRows}</tbody>
          </table>
          <p style="color: #666; margin-top: 20px; font-size: 13px;">Connectez-vous au CRM pour traiter ces leads.</p>
        </div>
      `,
      textContent: `${staleLeads.length} lead(s) en attente de contact depuis plus de 48h:\n${staleLeads.map(l => `- ${l.name} (${l.email}, score: ${l.score})`).join('\n')}`,
    });

    return NextResponse.json({
      success: true,
      message: `Follow-up email sent for ${staleLeads.length} stale leads`,
      count: staleLeads.length,
    });
  } catch (error) {
    console.error('Cron follow-up error:', error);
    return NextResponse.json({ error: 'Cron follow-up failed' }, { status: 500 });
  }
}
