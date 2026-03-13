'use client';

import { useState, useEffect } from 'react';
import { useSidebar } from '@/components/portal/SidebarContext';
import { Users, FileText, Receipt, FileSignature, Calendar, Newspaper, TrendingUp } from 'lucide-react';
import type { DashboardStats } from '@/types/portal';

export default function DashboardPage() {
  const { isMobile, config } = useSidebar();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portal/stats')
      .then((res) => res.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);

  const heroCards: { label: string; value: string | number; sub: string; icon: React.ReactNode }[] = [
    { label: 'Contacts', value: stats?.totalContacts || 0, sub: 'Total contacts', icon: <Users size={20} /> },
    { label: 'Leads', value: stats?.totalLeads || 0, sub: `${stats?.newLeadsThisMonth || 0} ce mois`, icon: <TrendingUp size={20} /> },
  ];

  if (config?.moduleDevis) {
    heroCards.push({
      label: 'Devis en attente', value: formatCurrency(stats?.montantDevisEnAttente || 0),
      sub: `${stats?.devisEnAttente || 0} devis`, icon: <FileText size={20} />,
    });
  }

  if (config?.moduleFactures) {
    heroCards.push({
      label: 'Factures impayees', value: formatCurrency(stats?.montantFacturesImpayees || 0),
      sub: `${stats?.facturesImpayees || 0} facture(s)`, icon: <Receipt size={20} />,
    });
  }

  if (config?.moduleContrats) {
    heroCards.push({
      label: 'Contrats', value: stats?.totalContrats || 0,
      sub: 'Total contrats', icon: <FileSignature size={20} />,
    });
  }

  if (config?.moduleCalendrier) {
    heroCards.push({
      label: "RDV aujourd'hui", value: stats?.rdvAujourdhui || 0,
      sub: 'Rendez-vous', icon: <Calendar size={20} />,
    });
  }

  if (config?.moduleCMS) {
    heroCards.push({
      label: 'Contenus CMS', value: stats?.totalCmsItems || 0,
      sub: 'Articles publies', icon: <Newspaper size={20} />,
    });
  }

  return (
    <div>
      <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '28px', letterSpacing: '-0.02em' }}>Dashboard</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        {heroCards.map((card) => (
          <div key={card.label} style={{
            background: 'var(--bg-card)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {card.label}
              </span>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'var(--accent-light)', color: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {card.icon}
              </div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, marginBottom: '4px' }}>
              {loading ? '...' : card.value}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{card.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
