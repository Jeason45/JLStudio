import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/emailUtils';

// POST /api/cron/invoice-reminder
// Send overdue invoice reminders at J+7, J+15, J+30
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

    // Find all invoices that have been sent but not paid
    const overdueInvoices = await prisma.document.findMany({
      where: {
        type: 'facture',
        status: 'sent',
        sentAt: { not: null },
      },
      include: { contact: true },
      orderBy: { sentAt: 'asc' },
    });

    if (overdueInvoices.length === 0) {
      return NextResponse.json({ success: true, message: 'No overdue invoices found', count: 0 });
    }

    const now = new Date();
    const reminders: Array<{
      invoice: typeof overdueInvoices[0];
      daysOverdue: number;
      level: 'friendly' | 'firm' | 'formal';
    }> = [];

    for (const invoice of overdueInvoices) {
      if (!invoice.sentAt) continue;

      const diffMs = now.getTime() - invoice.sentAt.getTime();
      const daysOverdue = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      // Determine reminder level based on days since sent
      let level: 'friendly' | 'firm' | 'formal' | null = null;

      if (daysOverdue >= 30) {
        level = 'formal';
      } else if (daysOverdue >= 15) {
        level = 'firm';
      } else if (daysOverdue >= 7) {
        level = 'friendly';
      }

      if (level) {
        reminders.push({ invoice, daysOverdue, level });
      }
    }

    if (reminders.length === 0) {
      return NextResponse.json({ success: true, message: 'No invoices due for reminder yet', count: 0 });
    }

    // Send individual reminder emails to clients
    let clientEmailsSent = 0;
    for (const { invoice, daysOverdue, level } of reminders) {
      const clientEmail = invoice.contact?.email;
      if (!clientEmail) continue;

      const clientName = invoice.contact?.name || 'Client';
      const docNumber = invoice.documentNumber || 'N/A';
      const amount = invoice.amount != null ? `${invoice.amount.toFixed(2)} €` : 'N/A';

      const { subject, htmlContent, textContent } = generateClientReminderEmail({
        clientName,
        documentNumber: docNumber,
        amount,
        daysOverdue,
        level,
      });

      await sendEmail({
        to: clientEmail,
        subject,
        htmlContent,
        textContent,
        type: `invoice_reminder_${level}`,
        contactId: invoice.contactId || undefined,
        documentId: invoice.id,
      });

      clientEmailsSent++;
    }

    // Send admin summary email
    const invoiceRows = reminders.map(({ invoice, daysOverdue, level }) => {
      const clientName = invoice.contact?.name || 'Inconnu';
      const docNumber = invoice.documentNumber || 'N/A';
      const amount = invoice.amount != null ? `${invoice.amount.toFixed(2)} €` : 'N/A';
      const sentDate = invoice.sentAt ? invoice.sentAt.toLocaleDateString('fr-FR') : '-';
      const levelLabel = level === 'friendly' ? 'Relance amicale (J+7)'
        : level === 'firm' ? 'Relance ferme (J+15)'
        : 'Mise en demeure (J+30)';
      const levelColor = level === 'friendly' ? '#f59e0b'
        : level === 'firm' ? '#f97316'
        : '#ef4444';

      return `<tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">${docNumber}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">${clientName}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">${amount}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${sentDate}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: center; font-weight: 600;">${daysOverdue}j</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;"><span style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; color: #fff; background: ${levelColor};">${levelLabel}</span></td>
      </tr>`;
    }).join('');

    const totalOverdue = reminders.reduce((sum, r) => sum + (r.invoice.amount || 0), 0);

    await sendEmail({
      to: adminEmail,
      subject: `Factures en retard : ${reminders.length} relance(s) envoyee(s)`,
      type: 'cron_invoice_reminder',
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 750px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #638BFF, #4a6fd4); color: #fff; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0 0 8px 0; font-size: 22px;">Relances factures en retard</h1>
            <p style="margin: 0; opacity: 0.9; font-size: 14px;">${reminders.length} facture(s) en retard &bull; ${clientEmailsSent} relance(s) client envoyee(s)</p>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: #fff; border-radius: 8px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #638BFF;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p style="margin: 0; font-size: 13px; color: #6b7280;">Montant total en retard</p>
                  <p style="margin: 4px 0 0; font-size: 28px; font-weight: 700; color: #111827;">${totalOverdue.toFixed(2)} €</p>
                </div>
              </div>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: #fff; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: #f3f4f6;">
                  <th style="padding: 12px; text-align: left; font-weight: 600; color: #374151;">N° Facture</th>
                  <th style="padding: 12px; text-align: left; font-weight: 600; color: #374151;">Client</th>
                  <th style="padding: 12px; text-align: right; font-weight: 600; color: #374151;">Montant</th>
                  <th style="padding: 12px; text-align: center; font-weight: 600; color: #374151;">Envoyee le</th>
                  <th style="padding: 12px; text-align: center; font-weight: 600; color: #374151;">Retard</th>
                  <th style="padding: 12px; text-align: left; font-weight: 600; color: #374151;">Niveau</th>
                </tr>
              </thead>
              <tbody>${invoiceRows}</tbody>
            </table>
            <p style="color: #6b7280; margin-top: 24px; font-size: 13px;">Connectez-vous au CRM pour gerer ces factures.</p>
          </div>
        </div>
      `,
      textContent: `${reminders.length} facture(s) en retard (total: ${totalOverdue.toFixed(2)} €):\n${reminders.map(r => `- ${r.invoice.documentNumber || 'N/A'} | ${r.invoice.contact?.name || 'Inconnu'} | ${r.invoice.amount?.toFixed(2) || 'N/A'} € | ${r.daysOverdue}j | ${r.level}`).join('\n')}`,
    });

    return NextResponse.json({
      success: true,
      message: `Invoice reminders processed: ${reminders.length} overdue, ${clientEmailsSent} client emails sent`,
      count: reminders.length,
      clientEmailsSent,
    });
  } catch (error) {
    console.error('Cron invoice-reminder error:', error);
    return NextResponse.json({ error: 'Cron invoice-reminder failed' }, { status: 500 });
  }
}

// ── Helper: generate client reminder email per level ──

function generateClientReminderEmail(params: {
  clientName: string;
  documentNumber: string;
  amount: string;
  daysOverdue: number;
  level: 'friendly' | 'firm' | 'formal';
}): { subject: string; htmlContent: string; textContent: string } {
  const { clientName, documentNumber, amount, daysOverdue, level } = params;

  const configs = {
    friendly: {
      subject: `Rappel : Facture ${documentNumber} en attente de reglement`,
      greeting: `Bonjour ${clientName},`,
      intro: `Nous nous permettons de vous rappeler que la facture <strong>${documentNumber}</strong> d'un montant de <strong>${amount}</strong>, envoyee il y a ${daysOverdue} jours, est toujours en attente de reglement.`,
      body: `Il est possible que ce reglement ait deja ete effectue. Dans ce cas, nous vous prions de ne pas tenir compte de ce message.`,
      closing: `Nous restons a votre disposition pour toute question concernant cette facture.`,
      accentColor: '#f59e0b',
      bannerText: 'Rappel de paiement',
    },
    firm: {
      subject: `Relance : Facture ${documentNumber} - Reglement en retard`,
      greeting: `Bonjour ${clientName},`,
      intro: `Malgre notre precedent rappel, nous constatons que la facture <strong>${documentNumber}</strong> d'un montant de <strong>${amount}</strong> reste impayee depuis ${daysOverdue} jours.`,
      body: `Nous vous prions de bien vouloir proceder au reglement de cette facture dans les plus brefs delais. A defaut, des penalites de retard pourront etre appliquees conformement a nos conditions generales.`,
      closing: `Merci de votre attention. N'hesitez pas a nous contacter si vous rencontrez une difficulte.`,
      accentColor: '#f97316',
      bannerText: 'Relance de paiement',
    },
    formal: {
      subject: `Dernier avis : Facture ${documentNumber} - Mise en demeure`,
      greeting: `${clientName},`,
      intro: `Malgre nos relances precedentes, la facture <strong>${documentNumber}</strong> d'un montant de <strong>${amount}</strong> demeure impayee depuis <strong>${daysOverdue} jours</strong>.`,
      body: `Le present courrier constitue une mise en demeure de proceder au reglement integral de cette somme sous 8 jours. Passe ce delai, nous nous reservons le droit d'engager toute procedure de recouvrement necessaire, entrainant des frais supplementaires a votre charge.`,
      closing: `Nous vous invitons a regulariser votre situation dans les meilleurs delais.`,
      accentColor: '#ef4444',
      bannerText: 'Dernier avis avant recouvrement',
    },
  };

  const config = configs[level];

  const htmlContent = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
  <div style="background: linear-gradient(135deg, #638BFF, #4a6fd4); color: #fff; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0 0 8px 0; font-size: 22px;">JL Studio</h1>
    <p style="margin: 0; opacity: 0.9; font-size: 14px;">${config.bannerText}</p>
  </div>
  <div style="background: #fff; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="margin: 0 0 16px 0;">${config.greeting}</p>
    <p>${config.intro}</p>
    <div style="background: #f9fafb; border-left: 4px solid ${config.accentColor}; padding: 16px 20px; margin: 24px 0; border-radius: 0 6px 6px 0;">
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="padding: 4px 0; color: #6b7280;">Facture n°</td>
          <td style="padding: 4px 0; font-weight: 600; text-align: right;">${documentNumber}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #6b7280;">Montant</td>
          <td style="padding: 4px 0; font-weight: 600; text-align: right;">${amount}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #6b7280;">Retard</td>
          <td style="padding: 4px 0; font-weight: 600; text-align: right; color: ${config.accentColor};">${daysOverdue} jours</td>
        </tr>
      </table>
    </div>
    <p>${config.body}</p>
    <p>${config.closing}</p>
    <p style="margin-top: 30px;">Cordialement,<br><strong>JL Studio</strong></p>
  </div>
  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p style="margin: 0;">JL Studio &mdash; jlstudio.dev</p>
  </div>
</body></html>`;

  const textContent = `${config.greeting}\n\n${config.intro.replace(/<[^>]*>/g, '')}\n\nFacture: ${documentNumber}\nMontant: ${amount}\nRetard: ${daysOverdue} jours\n\n${config.body.replace(/<[^>]*>/g, '')}\n\n${config.closing}\n\nCordialement,\nJL Studio`;

  return { subject: config.subject, htmlContent, textContent };
}
