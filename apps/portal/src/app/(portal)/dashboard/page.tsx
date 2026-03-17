'use client';

import { useState, useEffect } from 'react';
import { useSidebar } from '@/components/portal/SidebarContext';
import {
  Users, FileText, Receipt, FileSignature, Calendar, Newspaper,
  TrendingUp, Activity, Clock,
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { DashboardStats } from '@/types/portal';

interface ChartData {
  contactsPerMonth: { month: string; value: number }[];
  revenuePerMonth: { month: string; value: number }[];
  documentsPerMonth: { month: string; devis: number; factures: number }[];
  recentActivity: {
    id: string;
    action: string;
    entity: string;
    entityId: string;
    details: Record<string, unknown> | null;
    createdAt: string;
  }[];
}

const ACTIVITY_LABELS: Record<string, string> = {
  CREATE: 'Cree',
  UPDATE: 'Modifie',
  DELETE: 'Supprime',
  STATUS_CHANGE: 'Statut change',
  SEND: 'Envoye',
};

const ENTITY_LABELS: Record<string, string> = {
  CONTACT: 'Contact',
  DOCUMENT: 'Document',
  PROJECT: 'Projet',
  TASK: 'Tache',
  APPOINTMENT: 'RDV',
  CMS_COLLECTION: 'Collection',
  CMS_ITEM: 'Contenu',
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
}

export default function DashboardPage() {
  const { isMobile, config } = useSidebar();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [charts, setCharts] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/portal/stats').then((r) => r.json()),
      fetch('/api/portal/stats/charts').then((r) => r.json()),
    ])
      .then(([statsData, chartsData]) => {
        setStats(statsData);
        setCharts(chartsData);
      })
      .catch((err) => console.error('Erreur chargement dashboard:', err))
      .finally(() => setLoading(false));
  }, []);

  // ── KPI Cards ──

  const heroCards: { label: string; value: string | number; sub: string; icon: React.ReactNode; color?: string }[] = [
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
      label: 'Contenus', value: stats?.totalCmsItems || 0,
      sub: 'Elements publies', icon: <Newspaper size={20} />,
    });
  }

  // ── Chart tooltip style ──

  const tooltipStyle = {
    contentStyle: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      fontSize: '12px',
      color: 'var(--text-primary)',
      boxShadow: 'var(--shadow-md)',
    },
    labelStyle: { color: 'var(--text-secondary)', fontWeight: 600 },
  };

  const hasRevenue = charts?.revenuePerMonth && charts.revenuePerMonth.some((d) => d.value > 0);
  const hasDocuments = charts?.documentsPerMonth && charts.documentsPerMonth.some((d) => d.devis > 0 || d.factures > 0);
  const hasContacts = charts?.contactsPerMonth && charts.contactsPerMonth.some((d) => d.value > 0);

  return (
    <div>
      <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '28px', letterSpacing: '-0.02em' }}>
        Dashboard
      </h1>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px', marginBottom: '24px',
      }}>
        {heroCards.map((card) => (
          <div key={card.label} style={{
            background: 'var(--bg-card)', padding: '20px', borderRadius: '12px',
            border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{card.label}</span>
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

      {/* Charts Row */}
      {!loading && charts && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : (hasRevenue && hasContacts ? '1fr 1fr' : '1fr'),
          gap: '16px', marginBottom: '24px',
        }}>
          {/* Revenue Chart */}
          {config?.moduleFactures && hasRevenue && (
            <div style={{
              background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-card)', padding: '20px',
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Chiffre d&apos;affaires (6 mois)
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={charts.revenuePerMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip {...tooltipStyle} formatter={(value) => [formatCurrency(Number(value)), 'CA']} />
                  <Bar dataKey="value" fill="var(--accent)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Contacts Chart */}
          {hasContacts && (
            <div style={{
              background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-card)', padding: '20px',
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Nouveaux contacts (6 mois)
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={charts.contactsPerMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip {...tooltipStyle} formatter={(value) => [Number(value), 'Contacts']} />
                  <defs>
                    <linearGradient id="contactGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="var(--accent)" fill="url(#contactGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* Documents Chart + Activity */}
      {!loading && charts && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : (hasDocuments ? '1fr 1fr' : '1fr'),
          gap: '16px',
        }}>
          {/* Documents per month */}
          {(config?.moduleDevis || config?.moduleFactures) && hasDocuments && (
            <div style={{
              background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-card)', padding: '20px',
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Documents crees (6 mois)
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={charts.documentsPerMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip {...tooltipStyle} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', color: 'var(--text-tertiary)' }} />
                  {config?.moduleDevis && <Line type="monotone" dataKey="devis" name="Devis" stroke="var(--accent)" strokeWidth={2} dot={{ r: 3, fill: 'var(--accent)' }} />}
                  {config?.moduleFactures && <Line type="monotone" dataKey="factures" name="Factures" stroke="var(--success)" strokeWidth={2} dot={{ r: 3, fill: 'var(--success)' }} />}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Recent Activity */}
          {charts.recentActivity && charts.recentActivity.length > 0 && (
            <div style={{
              background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-card)', padding: '20px', maxHeight: '340px', overflowY: 'auto',
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={15} /> Activite recente
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {charts.recentActivity.map((act) => (
                  <div key={act.id} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '8px 10px', borderRadius: '6px',
                    transition: 'background 0.1s',
                  }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: act.action === 'DELETE' ? 'var(--danger)' : act.action === 'CREATE' ? 'var(--success)' : 'var(--accent)',
                      flexShrink: 0,
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
                        <span style={{ fontWeight: 500 }}>{ACTIVITY_LABELS[act.action] || act.action}</span>
                        {' '}
                        <span style={{ color: 'var(--text-secondary)' }}>{ENTITY_LABELS[act.entity] || act.entity}</span>
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                        <Clock size={10} />
                        {format(new Date(act.createdAt), "dd MMM 'a' HH:mm", { locale: fr })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty state when no charts data */}
      {!loading && (!hasRevenue && !hasContacts && !hasDocuments && (!charts?.recentActivity || charts.recentActivity.length === 0)) && (
        <div style={{
          background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)', padding: '40px 20px', textAlign: 'center',
        }}>
          <Activity size={28} style={{ color: 'var(--text-tertiary)', marginBottom: '8px' }} />
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Pas encore de donnees</p>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Les graphiques apparaitront des que vous ajouterez des contacts et documents.</p>
        </div>
      )}
    </div>
  );
}
