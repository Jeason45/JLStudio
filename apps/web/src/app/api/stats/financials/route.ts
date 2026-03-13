import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        type: true,
        status: true,
        amount: true,
        contactId: true,
        createdAt: true,
        sentAt: true,
      }
    });

    const projects = await prisma.project.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        status: true,
        estimatedBudget: true,
      }
    });

    const contacts = await prisma.contact.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        status: true,
        createdAt: true,
      }
    });

    const appointments = await prisma.appointment.findMany({
      select: {
        id: true,
        status: true,
      }
    });

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Projets actifs
    const projetsActifs = projects.filter(p =>
      p.status === 'en_cours' || p.status === 'planification'
    );
    const budgetTotalProjets = projetsActifs.reduce((sum, p) =>
      sum + (p.estimatedBudget || 0), 0
    );

    // Devis en attente
    const devisEnAttente = documents.filter(d =>
      d.type === 'devis' && (d.status === 'sent' || d.status === 'draft' || d.status === 'pending_signature')
    );
    const montantDevisEnAttente = devisEnAttente.reduce((sum, d) =>
      sum + (d.amount || 0), 0
    );

    // CA mois courant (factures signees/payees)
    const facturesMoisCourant = documents.filter(d => {
      if (d.type !== 'facture' || (d.status !== 'signed' && d.status !== 'paid')) return false;
      const date = new Date(d.createdAt);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
    const CAMoisCourant = facturesMoisCourant.reduce((sum, d) =>
      sum + (d.amount || 0), 0
    );

    // CA total
    const facturesSignees = documents.filter(d =>
      d.type === 'facture' && (d.status === 'signed' || d.status === 'paid')
    );
    const chiffreAffairesTotal = facturesSignees.reduce((sum, d) =>
      sum + (d.amount || 0), 0
    );

    // Taux de conversion Devis -> Factures
    const totalDevis = documents.filter(d => d.type === 'devis').length;
    const devisConverts = documents.filter(d =>
      d.type === 'devis' && d.status === 'signed'
    ).length;
    const tauxConversion = totalDevis > 0
      ? Math.round((devisConverts / totalDevis) * 100) : 0;

    // Leads & clients
    const leads = contacts.filter(c => c.status !== 'client');
    const clients = contacts.filter(c => c.status === 'client');
    const tauxConversionLeads = contacts.length > 0
      ? Math.round((clients.length / contacts.length) * 100) : 0;

    // Panier moyen = CA total / nombre de clients avec au moins une facture payee
    const clientsAvecCA = new Set<string>();
    facturesSignees.forEach(d => {
      if (d.contactId) clientsAvecCA.add(d.contactId);
    });
    const panierMoyen = clientsAvecCA.size > 0
      ? Math.round((chiffreAffairesTotal / clientsAvecCA.size) * 100) / 100
      : 0;

    // Evolution mensuelle (6 derniers mois)
    const evolutionMensuelle = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - i, 1);
      const month = date.getMonth();
      const year = date.getFullYear();
      const monthName = date.toLocaleDateString('fr-FR', { month: 'short' });

      const revenuMois = documents
        .filter(d => {
          if (d.type !== 'facture' || (d.status !== 'signed' && d.status !== 'paid')) return false;
          const dt = new Date(d.createdAt);
          return dt.getMonth() === month && dt.getFullYear() === year;
        })
        .reduce((sum, d) => sum + (d.amount || 0), 0);

      const leadsCount = contacts.filter(c => {
        const dt = new Date(c.createdAt);
        return dt.getMonth() === month && dt.getFullYear() === year && c.status !== 'client';
      }).length;

      const clientsCount = contacts.filter(c => {
        const dt = new Date(c.createdAt);
        return dt.getMonth() === month && dt.getFullYear() === year && c.status === 'client';
      }).length;

      evolutionMensuelle.push({
        month: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        revenue: revenuMois,
        leads: leadsCount,
        clients: clientsCount,
      });
    }

    return NextResponse.json({
      budgetTotalProjets,
      projetsActifs: projetsActifs.length,
      montantDevisEnAttente,
      nombreDevisEnAttente: devisEnAttente.length,
      CAMoisCourant,
      chiffreAffairesTotal,
      nombreFactures: facturesSignees.length,
      tauxConversion,
      totalDevis,
      devisConverts,
      totalLeads: leads.length,
      totalClients: clients.length,
      totalAppointments: appointments.filter(a => a.status !== 'cancelled').length,
      tauxConversionLeads,
      panierMoyen,
      evolutionMensuelle,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
