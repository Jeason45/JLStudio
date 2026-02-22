'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import { Calendar, Users, UserCheck, TrendingUp, DollarSign, Percent, Clock, FolderKanban, FileText } from 'lucide-react';

interface Stats {
  budgetTotalProjets: number;
  projetsActifs: number;
  montantDevisEnAttente: number;
  nombreDevisEnAttente: number;
  CAMoisCourant: number;
  chiffreAffairesTotal: number;
  nombreFactures: number;
  tauxConversion: number;
  totalLeads: number;
  totalClients: number;
  totalAppointments: number;
  tauxConversionLeads: number;
  evolutionMensuelle: { month: string; revenue: number; leads: number; clients: number }[];
}

export default function DashboardPage() {
  const { sidebarWidth, isMobile } = useSidebar();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats/financials')
      .then(res => res.json())
      .then(data => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);

  const heroCards = [
    {
      label: 'Budget Projets Actifs', value: formatCurrency(stats?.budgetTotalProjets || 0),
      sub: `${stats?.projetsActifs || 0} projet(s) en cours`, color: '#6366f1',
      icon: <FolderKanban size={28} />, href: '/admin/projets'
    },
    {
      label: 'Devis en attente', value: formatCurrency(stats?.montantDevisEnAttente || 0),
      sub: `${stats?.nombreDevisEnAttente || 0} devis en attente`, color: '#fbbf24',
      icon: <Clock size={28} />, href: '/admin/documents'
    },
    {
      label: 'CA ce mois', value: formatCurrency(stats?.CAMoisCourant || 0),
      sub: 'Revenus du mois en cours', color: '#10b981',
      icon: <TrendingUp size={28} />, href: undefined
    },
    {
      label: "Chiffre d'affaires total", value: formatCurrency(stats?.chiffreAffairesTotal || 0),
      sub: `${stats?.nombreFactures || 0} facture(s) encaissee(s)`, color: '#638BFF',
      icon: <DollarSign size={28} />, href: '/admin/documents'
    },
  ];

  const secondaryKPIs = [
    { label: 'Rendez-vous', value: stats?.totalAppointments || 0, color: '#fbbf24', icon: <Calendar size={22} />, href: '/admin/calendar', link: 'Calendrier' },
    { label: 'Leads', value: stats?.totalLeads || 0, color: '#f59e0b', icon: <Users size={22} />, href: '/admin/leads', link: 'Gerer les leads' },
    { label: 'Clients', value: stats?.totalClients || 0, color: '#10b981', icon: <UserCheck size={22} />, href: '/admin/clients', link: 'Gerer les clients' },
    { label: 'Conversion', value: `${stats?.tauxConversionLeads || 0}%`, color: '#10b981', icon: <Percent size={22} />, sub: 'Leads → Clients' },
    { label: 'Projets actifs', value: stats?.projetsActifs || 0, color: '#638BFF', icon: <FolderKanban size={22} />, href: '/admin/projets', link: 'Gerer les projets' },
    { label: 'Devis en cours', value: stats?.nombreDevisEnAttente || 0, color: '#fbbf24', icon: <FileText size={22} />, href: '/admin/documents', link: 'Voir les devis' },
    { label: 'Conversion Devis', value: `${stats?.tauxConversion || 0}%`, color: '#6366f1', icon: <Percent size={22} />, sub: 'Devis → Factures' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: isMobile ? '0' : `${sidebarWidth}px`, transition: 'margin-left 0.3s ease', minHeight: '100vh', padding: isMobile ? '80px 16px 24px 16px' : '40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)', boxShadow: '0 0 12px rgba(99, 139, 255, 0.4)' }} />
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99, 139, 255, 0.3) 0%, transparent 100%)' }} />
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Dashboard</span>
        </div>

        {/* Hero KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: isMobile ? '16px' : '24px', marginBottom: isMobile ? '24px' : '40px' }}>
          {heroCards.map((card) => (
            <div key={card.label} onClick={() => card.href && (window.location.href = card.href)} style={{
              background: `linear-gradient(135deg, ${card.color}26 0%, ${card.color}0d 100%)`,
              padding: '32px', borderRadius: '16px', backdropFilter: 'blur(10px)',
              border: `2px solid ${card.color}66`, transition: 'all 0.3s',
              cursor: card.href ? 'pointer' : 'default', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: `radial-gradient(circle, ${card.color}1a 0%, transparent 70%)`, borderRadius: '50%' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ color: card.color }}>{card.icon}</div>
                <span style={{ fontSize: '13px', color: card.color, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{card.label}</span>
              </div>
              <div style={{ fontSize: '42px', fontWeight: 800, marginBottom: '12px', color: card.color, lineHeight: 1 }}>
                {loading ? '...' : card.value}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={14} color={card.color} />{card.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Secondary KPIs + Chart */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '350px 1fr', gap: isMobile ? '16px' : '32px', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {secondaryKPIs.map((kpi) => (
              <div key={kpi.label} onClick={() => kpi.href && (window.location.href = kpi.href)} style={{
                background: 'rgba(255,255,255,0.08)', padding: '24px', borderRadius: '12px',
                backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s', cursor: kpi.href ? 'pointer' : 'default'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ color: kpi.color }}>{kpi.icon}</div>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{kpi.label}</span>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: typeof kpi.value === 'string' ? kpi.color : 'white' }}>
                    {loading ? '...' : kpi.value}
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                  {kpi.link ? `${kpi.link} →` : kpi.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Revenue Chart */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {!loading && stats?.evolutionMensuelle && (
              <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Evolution des revenus</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '200px' }}>
                  {stats.evolutionMensuelle.map((m, i) => {
                    const maxRevenue = Math.max(...stats.evolutionMensuelle.map(x => x.revenue), 1);
                    const height = (m.revenue / maxRevenue) * 180;
                    return (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '10px', color: '#638BFF', fontWeight: 600 }}>
                          {m.revenue > 0 ? formatCurrency(m.revenue) : ''}
                        </span>
                        <div style={{
                          width: '100%', height: `${Math.max(height, 4)}px`,
                          background: `linear-gradient(180deg, #638BFF 0%, #4a6fd4 100%)`,
                          borderRadius: '4px 4px 0 0', transition: 'height 0.5s ease'
                        }} />
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{m.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Leads/Clients Chart */}
            {!loading && stats?.evolutionMensuelle && (
              <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Leads & Clients</h3>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#f59e0b' }} />
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Leads</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#10b981' }} />
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Clients</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '160px' }}>
                  {stats.evolutionMensuelle.map((m, i) => {
                    const maxVal = Math.max(...stats.evolutionMensuelle.map(x => x.leads + x.clients), 1);
                    const leadsH = (m.leads / maxVal) * 140;
                    const clientsH = (m.clients / maxVal) * 140;
                    return (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '140px' }}>
                          <div style={{ width: '45%', height: `${Math.max(leadsH, 2)}px`, background: '#f59e0b', borderRadius: '2px 2px 0 0' }} />
                          <div style={{ width: '45%', height: `${Math.max(clientsH, 2)}px`, background: '#10b981', borderRadius: '2px 2px 0 0' }} />
                        </div>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{m.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
