'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import LeadDetailModal from '@/components/admin/LeadDetailModal';
import LeadsKanbanView from '@/components/admin/LeadsKanbanView';
import { LayoutGrid, Table as TableIcon } from 'lucide-react';

type ContactStatus = 'new' | 'contacted' | 'qualified' | 'rdv_planned' | 'quote_sent' | 'pending_signature' | 'client' | 'lost';
type ViewMode = 'table' | 'kanban';

interface Contact {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  companyName: string | null;
  type: string;
  projectType: string | null;
  status: ContactStatus;
  source: string | null;
  score: number;
  budget: string | null;
  estimatedPrice: number | null;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  new: { label: 'Nouveau', color: '#6366f1' },
  contacted: { label: 'Contacte', color: '#f59e0b' },
  qualified: { label: 'Qualifie', color: '#8b5cf6' },
  rdv_planned: { label: 'RDV Planifie', color: '#06b6d4' },
  quote_sent: { label: 'Devis Envoye', color: '#3b82f6' },
  pending_signature: { label: 'En attente signature', color: '#f97316' },
  client: { label: 'Client', color: '#10b981' },
  lost: { label: 'Perdu', color: '#ef4444' },
};

export default function LeadsPage() {
  const { sidebarWidth, isMobile } = useSidebar();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const fetchContacts = () => {
    fetch('/api/contacts')
      .then(res => res.ok ? res.json() : [])
      .then(data => { setContacts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchContacts(); }, []);

  const leads = contacts.filter(c => c.status !== 'client');

  const filtered = leads.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return c.name.toLowerCase().includes(q) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.phone && c.phone.includes(q));
    }
    return true;
  });

  const stats = [
    { label: 'Total Leads', value: leads.length, color: '#34d399' },
    { label: 'Nouveaux', value: leads.filter(c => c.status === 'new').length, color: '#818cf8' },
    { label: 'Qualifies', value: leads.filter(c => c.status === 'qualified').length, color: '#8b5cf6' },
    {
      label: 'Taux conversion',
      value: (() => {
        const won = contacts.filter(c => c.status === 'client').length;
        const lost = contacts.filter(c => c.status === 'lost').length;
        return won + lost > 0 ? `${Math.round((won / (won + lost)) * 100)}%` : '0%';
      })(),
      color: '#10b981'
    },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: isMobile ? '0' : `${sidebarWidth}px`, transition: 'margin-left 0.3s ease' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(to right, #0a0e1a, #101d30)', padding: isMobile ? '80px 16px 0 16px' : '32px 40px 0 40px', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)', boxShadow: '0 0 12px rgba(99,139,255,0.4)' }} />
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99,139,255,0.3) 0%, transparent 100%)' }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Leads</span>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{s.label}</span>
                <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px', color: 'white' }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* View Mode Tabs */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            {[
              { mode: 'table' as ViewMode, icon: <TableIcon size={18} />, label: 'Table' },
              { mode: 'kanban' as ViewMode, icon: <LayoutGrid size={18} />, label: 'Kanban' },
            ].map(v => (
              <button key={v.mode} onClick={() => setViewMode(v.mode)} style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
                borderRadius: '10px', border: 'none',
                background: viewMode === v.mode ? 'rgba(99,139,255,0.2)' : 'rgba(255,255,255,0.05)',
                color: viewMode === v.mode ? '#638BFF' : 'rgba(255,255,255,0.7)',
                fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
              }}>
                {v.icon}<span>{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ background: 'linear-gradient(to right, #0a0e1a, #101d30)', minHeight: 'calc(100vh - 280px)', padding: isMobile ? '24px 16px' : '32px 40px' }}>
          {viewMode === 'kanban' ? (
            <LeadsKanbanView
              contacts={filtered}
              onStatusChange={async (contactId, newStatus) => {
                await fetch(`/api/contacts/${contactId}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ status: newStatus }),
                });
                setContacts(prev => prev.map(c => c.id === contactId ? { ...c, status: newStatus as ContactStatus } : c));
              }}
              onContactClick={setSelectedContactId}
            />
          ) : (
            <>
              {/* Filters */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
                <input type="text" placeholder="Rechercher..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  style={{ flex: '1 1 300px', padding: '14px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', outline: 'none', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white' }} />
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={() => setStatusFilter('all')} style={{
                    padding: '10px 18px', borderRadius: '10px', border: '1px solid',
                    borderColor: statusFilter === 'all' ? '#638BFF' : 'rgba(255,255,255,0.1)',
                    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                    backgroundColor: statusFilter === 'all' ? 'rgba(99,139,255,0.2)' : 'rgba(255,255,255,0.05)',
                    color: statusFilter === 'all' ? '#638BFF' : 'rgba(255,255,255,0.7)'
                  }}>Tous</button>
                  {Object.entries(STATUS_CONFIG).filter(([k]) => k !== 'client').map(([key, cfg]) => (
                    <button key={key} onClick={() => setStatusFilter(key)} style={{
                      padding: '10px 18px', borderRadius: '10px', border: '1px solid',
                      borderColor: statusFilter === key ? cfg.color : 'rgba(255,255,255,0.1)',
                      fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                      backgroundColor: statusFilter === key ? `${cfg.color}30` : 'rgba(255,255,255,0.05)',
                      color: statusFilter === key ? cfg.color : 'rgba(255,255,255,0.7)'
                    }}>{cfg.label}</button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                {loading ? (
                  <div style={{ padding: '60px', textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>Chargement...</div>
                ) : filtered.length === 0 ? (
                  <div style={{ padding: '60px', textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>Aucun lead trouve</div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                        {['Nom', 'Contact', 'Score', 'Projet', 'Statut', 'Date'].map(h => (
                          <th key={h} style={{ padding: '16px 24px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(contact => (
                        <tr key={contact.id} onClick={() => setSelectedContactId(contact.id)}
                          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.2s' }}
                          onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                          onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                          <td style={{ padding: '20px 24px', fontSize: '14px', fontWeight: 600, color: 'white' }}>
                            {contact.companyName || contact.name}
                          </td>
                          <td style={{ padding: '20px 24px' }}>
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>{contact.email}</div>
                            {contact.phone && <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{contact.phone}</div>}
                          </td>
                          <td style={{ padding: '20px 24px' }}>
                            <div style={{
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
                              color: contact.score >= 70 ? '#10b981' : contact.score >= 40 ? '#f59e0b' : '#94a3b8',
                              background: contact.score >= 70 ? 'rgba(16,185,129,0.15)' : contact.score >= 40 ? 'rgba(245,158,11,0.15)' : 'rgba(148,163,184,0.15)',
                            }}>
                              {contact.score}
                            </div>
                          </td>
                          <td style={{ padding: '20px 24px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                            {contact.projectType || '-'}
                          </td>
                          <td style={{ padding: '20px 24px' }}>
                            <span style={{
                              padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                              color: STATUS_CONFIG[contact.status]?.color || '#94a3b8',
                              backgroundColor: `${STATUS_CONFIG[contact.status]?.color || '#94a3b8'}20`,
                            }}>
                              {STATUS_CONFIG[contact.status]?.label || contact.status}
                            </span>
                          </td>
                          <td style={{ padding: '20px 24px', fontSize: '13px', color: 'rgba(255,255,255,0.6)', textAlign: 'right' }}>
                            {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {selectedContactId && (
        <LeadDetailModal
          contactId={selectedContactId}
          onClose={() => setSelectedContactId(null)}
          onUpdate={fetchContacts}
        />
      )}
    </div>
  );
}
