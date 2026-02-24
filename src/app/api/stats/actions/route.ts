import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const now = new Date();

    // ── Leads a relancer : status "new" et createdAt > 48h ──
    const threshold48h = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    const staleLeads = await prisma.contact.findMany({
      where: {
        status: 'new',
        createdAt: { lt: threshold48h },
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    const staleLeadsWithDays = staleLeads.map(lead => ({
      ...lead,
      daysSinceCreation: Math.floor(
        (now.getTime() - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      ),
    }));

    // ── Factures impayees : type="facture", status="sent", sentAt > 7 jours ──
    const threshold7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const unpaidInvoices = await prisma.document.findMany({
      where: {
        type: 'facture',
        status: 'sent',
        sentAt: { lt: threshold7d },
        deletedAt: null,
      },
      select: {
        id: true,
        documentNumber: true,
        amount: true,
        sentAt: true,
        contact: {
          select: { id: true, name: true },
        },
      },
      orderBy: { sentAt: 'asc' },
    });

    const unpaidInvoicesWithDays = unpaidInvoices.map(inv => ({
      ...inv,
      daysOverdue: Math.floor(
        (now.getTime() - new Date(inv.sentAt!).getTime()) / (1000 * 60 * 60 * 24)
      ),
    }));

    // ── RDV aujourd'hui ──
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
    const todayAppointments = await prisma.appointment.findMany({
      where: {
        startTime: { gte: todayStart, lt: todayEnd },
        status: { not: 'cancelled' },
      },
      select: {
        id: true,
        title: true,
        startTime: true,
        endTime: true,
        contact: {
          select: { id: true, name: true },
        },
      },
      orderBy: { startTime: 'asc' },
    });

    // ── Taches en retard : dueDate < today et status != "completed" ──
    const overdueTasks = await prisma.task.findMany({
      where: {
        dueDate: { lt: todayStart },
        status: { not: 'completed' },
      },
      select: {
        id: true,
        title: true,
        dueDate: true,
        status: true,
        project: {
          select: { id: true, name: true },
        },
      },
      orderBy: { dueDate: 'asc' },
    });

    return NextResponse.json({
      staleLeads: staleLeadsWithDays,
      unpaidInvoices: unpaidInvoicesWithDays,
      todayAppointments,
      overdueTasks,
    });
  } catch (error) {
    console.error('Actions stats error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
