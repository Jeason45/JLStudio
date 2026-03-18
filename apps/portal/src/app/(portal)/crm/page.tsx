'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSidebar } from '@/components/portal/SidebarContext';
import ContactDetailPanel from '@/components/portal/ContactDetailPanel';
import { Plus, Search, Users, GitBranch, ChevronRight, MoreHorizontal, Trash2, X } from 'lucide-react';
import type { ContactData, LeadData, LeadStatus } from '@/types/portal';

const LEAD_COLUMNS: { status: LeadStatus; label: string; color: string }[] = [
  { status: 'NEW', label: 'Nouveau', color: 'var(--accent)' },
  { status: 'CONTACTED', label: 'Contacte', color: 'var(--warning, #f59e0b)' },
  { status: 'QUALIFIED', label: 'Qualifie', color: 'var(--info, #3b82f6)' },
  { status: 'CONVERTED', label: 'Converti', color: 'var(--success, #22c55e)' },
  { status: 'LOST', label: 'Perdu', color: 'var(--danger, #ef4444)' },
];

const NEXT_STATUS: Record<LeadStatus, LeadStatus | null> = {
  NEW: 'CONTACTED',
  CONTACTED: 'QUALIFIED',
  QUALIFIED: 'CONVERTED',
  CONVERTED: null,
  LOST: null,
};

export default function CRMPage() {
  const { isMobile } = useSidebar();
  const [tab, setTab] = useState<'contacts' | 'pipeline'>('contacts');

  // ─── Contacts state ───
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ email: '', firstName: '', lastName: '', phone: '', company: '' });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  // ─── Pipeline state ───
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [showCreateLead, setShowCreateLead] = useState(false);
  const [leadForm, setLeadForm] = useState({ contactId: '', source: '', notes: '' });
  const [creatingLead, setCreatingLead] = useState(false);
  const [leadError, setLeadError] = useState('');
  const [leadMenuId, setLeadMenuId] = useState<string | null>(null);

  // ─── Fetch contacts ───
  const fetchContacts = useCallback(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (statusFilter) params.set('status', statusFilter);
    fetch(`/api/portal/contacts?${params}`)
      .then((r) => r.json())
      .then((res) => { setContacts(res.data ?? res); setLoadingContacts(false); })
      .catch(() => setLoadingContacts(false));
  }, [search, statusFilter]);

  // ─── Fetch leads ───
  const fetchLeads = useCallback(() => {
    fetch('/api/portal/leads')
      .then((r) => r.json())
      .then((res) => { setLeads(res.data ?? res); setLoadingLeads(false); })
      .catch(() => setLoadingLeads(false));
  }, []);

  useEffect(() => {
    if (tab === 'contacts') fetchContacts();
    else fetchLeads();
  }, [tab, fetchContacts, fetchLeads]);

  // ─── Create contact ───
  const handleCreate = async () => {
    if (!createForm.email) return;
    setCreating(true);
    setError('');
    const res = await fetch('/api/portal/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createForm),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Erreur');
      setCreating(false);
      return;
    }
    setShowCreate(false);
    setCreateForm({ email: '', firstName: '', lastName: '', phone: '', company: '' });
    setCreating(false);
    fetchContacts();
  };

  // ─── Create lead ───
  const handleCreateLead = async () => {
    setCreatingLead(true);
    setLeadError('');
    const body: Record<string, unknown> = {};
    if (leadForm.contactId) body.contactId = leadForm.contactId;
    if (leadForm.source) body.source = leadForm.source;
    if (leadForm.notes) body.notes = leadForm.notes;
    const res = await fetch('/api/portal/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const data = await res.json();
      setLeadError(data.error || 'Erreur');
      setCreatingLead(false);
      return;
    }
    setShowCreateLead(false);
    setLeadForm({ contactId: '', source: '', notes: '' });
    setCreatingLead(false);
    fetchLeads();
  };

  // ─── Move lead ───
  const moveLead = async (leadId: string, newStatus: LeadStatus) => {
    setLeadMenuId(null);
    const res = await fetch(`/api/portal/leads/${leadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) fetchLeads();
  };

  // ─── Delete lead ───
  const deleteLead = async (leadId: string) => {
    setLeadMenuId(null);
    const res = await fetch(`/api/portal/leads/${leadId}`, { method: 'DELETE' });
    if (res.ok) fetchLeads();
  };

  const statusCounts = {
    total: contacts.length,
    NEW: contacts.filter((c) => c.status === 'NEW').length,
    ACTIVE: contacts.filter((c) => c.status === 'ACTIVE').length,
    INACTIVE: contacts.filter((c) => c.status === 'INACTIVE').length,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', borderRadius: '8px',
    background: 'var(--bg-input)', border: '1px solid var(--border-input)',
    color: 'var(--text-primary)', fontSize: '13px', outline: 'none',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle, appearance: 'none' as const, cursor: 'pointer',
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>CRM</h1>
        {tab === 'contacts' ? (
          <button onClick={() => setShowCreate(!showCreate)} style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
            background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
          }}>
            <Plus size={16} /> Nouveau contact
          </button>
        ) : (
          <button onClick={() => setShowCreateLead(!showCreateLead)} style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
            background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
          }}>
            <Plus size={16} /> Nouveau lead
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', background: 'var(--bg-secondary)', borderRadius: '10px', padding: '3px' }}>
        {[
          { key: 'contacts' as const, label: 'Contacts', icon: <Users size={14} /> },
          { key: 'pipeline' as const, label: 'Pipeline', icon: <GitBranch size={14} /> },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontSize: '13px', fontWeight: 500, transition: 'all 0.15s',
              background: tab === t.key ? 'var(--bg-card)' : 'transparent',
              color: tab === t.key ? 'var(--text-primary)' : 'var(--text-tertiary)',
              boxShadow: tab === t.key ? 'var(--shadow-card)' : 'none',
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════ CONTACTS TAB ═══════════════════ */}
      {tab === 'contacts' && (
        <>
          {/* Stats / Filter pills */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {[
              { label: 'Total', value: statusCounts.total, filter: '' },
              { label: 'Nouveaux', value: statusCounts.NEW, filter: 'NEW' },
              { label: 'Actifs', value: statusCounts.ACTIVE, filter: 'ACTIVE' },
              { label: 'Inactifs', value: statusCounts.INACTIVE, filter: 'INACTIVE' },
            ].map((s) => (
              <button key={s.label} onClick={() => setStatusFilter(statusFilter === s.filter ? '' : s.filter)} style={{
                padding: '8px 16px', borderRadius: '20px', border: 'none',
                background: statusFilter === s.filter ? 'var(--text-primary)' : 'var(--bg-secondary)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 500, color: statusFilter === s.filter ? 'white' : 'var(--text-tertiary)' }}>{s.label}</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: statusFilter === s.filter ? 'white' : 'var(--text-secondary)' }}>{s.value}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input
              placeholder="Rechercher par nom, email, entreprise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: '34px' }}
            />
          </div>

          {/* Create form */}
          {showCreate && (
            <div style={{ background: 'var(--bg-card)', borderRadius: '12px', padding: '16px', marginBottom: '16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <input placeholder="Prenom" value={createForm.firstName} onChange={(e) => setCreateForm({ ...createForm, firstName: e.target.value })} style={inputStyle} />
                <input placeholder="Nom" value={createForm.lastName} onChange={(e) => setCreateForm({ ...createForm, lastName: e.target.value })} style={inputStyle} />
              </div>
              <input placeholder="Email *" type="email" value={createForm.email} onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })} style={{ ...inputStyle, marginBottom: '8px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                <input placeholder="Telephone" value={createForm.phone} onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })} style={inputStyle} />
                <input placeholder="Entreprise" value={createForm.company} onChange={(e) => setCreateForm({ ...createForm, company: e.target.value })} style={inputStyle} />
              </div>
              {error && <p style={{ color: 'var(--danger)', fontSize: '12px', marginBottom: '8px' }}>{error}</p>}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handleCreate} disabled={creating} style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '12px', opacity: creating ? 0.5 : 1 }}>
                  {creating ? 'Creation...' : 'Creer'}
                </button>
                <button onClick={() => setShowCreate(false)} style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '12px' }}>Annuler</button>
              </div>
            </div>
          )}

          {/* Contact list */}
          {loadingContacts ? (
            <p style={{ color: 'var(--text-tertiary)' }}>Chargement...</p>
          ) : contacts.length === 0 ? (
            <p style={{ color: 'var(--text-tertiary)' }}>Aucun contact</p>
          ) : (
            <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 140px 100px',
                padding: '10px 14px', background: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Contact</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Entreprise</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>Statut</span>
              </div>
              {contacts.map((c, idx) => (
                <div key={c.id} onClick={() => setSelectedId(c.id)} style={{
                  display: 'grid', gridTemplateColumns: '1fr 140px 100px',
                  alignItems: 'center', padding: '12px 14px', cursor: 'pointer',
                  background: selectedId === c.id ? 'var(--bg-hover)' : 'transparent',
                  borderBottom: idx < contacts.length - 1 ? '1px solid var(--border-light)' : 'none',
                  transition: 'background 0.1s',
                }}
                  onMouseEnter={(e) => { if (selectedId !== c.id) e.currentTarget.style.background = 'var(--bg-hover)'; }}
                  onMouseLeave={(e) => { if (selectedId !== c.id) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', fontWeight: 500, color: 'var(--accent)', flexShrink: 0,
                    }}>
                      {(c.firstName?.[0] || c.email[0]).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {c.firstName || ''} {c.lastName || ''} {!c.firstName && !c.lastName ? c.email : ''}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '1px' }}>{c.email}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.company || '—'}</span>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{
                      padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500,
                      background: c.status === 'ACTIVE' ? 'var(--success-light)' : c.status === 'NEW' ? 'var(--accent-light)' : 'var(--bg-badge)',
                      color: c.status === 'ACTIVE' ? 'var(--success)' : c.status === 'NEW' ? 'var(--accent)' : 'var(--text-tertiary)',
                    }}>
                      {c.status === 'NEW' ? 'Nouveau' : c.status === 'ACTIVE' ? 'Actif' : 'Inactif'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ═══════════════════ PIPELINE TAB ═══════════════════ */}
      {tab === 'pipeline' && (
        <>
          {/* Create lead form */}
          {showCreateLead && (
            <div style={{ background: 'var(--bg-card)', borderRadius: '12px', padding: '16px', marginBottom: '16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Nouveau lead</span>
                <button onClick={() => setShowCreateLead(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
                  <X size={16} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)', marginBottom: '4px', display: 'block' }}>Contact (optionnel)</label>
                  <select value={leadForm.contactId} onChange={(e) => setLeadForm({ ...leadForm, contactId: e.target.value })} style={selectStyle}>
                    <option value="">Aucun contact</option>
                    {contacts.map((c) => (
                      <option key={c.id} value={c.id}>{c.firstName || ''} {c.lastName || ''} — {c.email}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)', marginBottom: '4px', display: 'block' }}>Source</label>
                  <input placeholder="ex: Site web, LinkedIn, Bouche-a-oreille..." value={leadForm.source} onChange={(e) => setLeadForm({ ...leadForm, source: e.target.value })} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)', marginBottom: '4px', display: 'block' }}>Notes</label>
                <textarea
                  placeholder="Notes sur ce lead..."
                  value={leadForm.notes}
                  onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              {leadError && <p style={{ color: 'var(--danger)', fontSize: '12px', marginBottom: '8px' }}>{leadError}</p>}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handleCreateLead} disabled={creatingLead} style={{
                  padding: '8px 16px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
                  border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '12px', opacity: creatingLead ? 0.5 : 1,
                }}>
                  {creatingLead ? 'Creation...' : 'Creer le lead'}
                </button>
                <button onClick={() => setShowCreateLead(false)} style={{
                  padding: '8px 16px', borderRadius: '8px', background: 'var(--bg-secondary)',
                  color: 'var(--text-secondary)', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '12px',
                }}>Annuler</button>
              </div>
            </div>
          )}

          {/* Kanban board */}
          {loadingLeads ? (
            <p style={{ color: 'var(--text-tertiary)' }}>Chargement...</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : `repeat(${LEAD_COLUMNS.length}, 1fr)`,
              gap: '12px',
              alignItems: 'start',
            }}>
              {LEAD_COLUMNS.map((col) => {
                const colLeads = leads.filter((l) => l.status === col.status);
                return (
                  <div key={col.status} style={{
                    background: 'var(--bg-card)', borderRadius: '12px',
                    border: '1px solid var(--border)', overflow: 'hidden',
                    minHeight: '200px',
                  }}>
                    {/* Column header */}
                    <div style={{
                      padding: '12px 14px', borderBottom: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color }} />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{col.label}</span>
                      </div>
                      <span style={{
                        fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)',
                        background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '10px',
                      }}>
                        {colLeads.length}
                      </span>
                    </div>

                    {/* Lead cards */}
                    <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {colLeads.length === 0 && (
                        <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', textAlign: 'center', padding: '20px 0' }}>
                          Aucun lead
                        </p>
                      )}
                      {colLeads.map((lead) => {
                        const contactName = lead.contact
                          ? `${lead.contact.firstName || ''} ${lead.contact.lastName || ''}`.trim() || lead.contact.email
                          : null;
                        const nextStatus = NEXT_STATUS[lead.status];
                        const nextLabel = nextStatus ? LEAD_COLUMNS.find((c) => c.status === nextStatus)?.label : null;

                        return (
                          <div key={lead.id} style={{
                            background: 'var(--bg-primary)', borderRadius: '8px',
                            border: '1px solid var(--border-light)', padding: '10px 12px',
                            position: 'relative',
                          }}>
                            {/* Contact */}
                            {contactName && (
                              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
                                {contactName}
                              </div>
                            )}
                            {lead.contact?.company && (
                              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                                {lead.contact.company}
                              </div>
                            )}
                            {!contactName && !lead.source && !lead.notes && (
                              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                                Lead sans details
                              </div>
                            )}

                            {/* Source */}
                            {lead.source && (
                              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                Source : {lead.source}
                              </div>
                            )}

                            {/* Notes (truncated) */}
                            {lead.notes && (
                              <div style={{
                                fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '6px',
                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                              }}>
                                {lead.notes}
                              </div>
                            )}

                            {/* Date */}
                            <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                              {new Date(lead.createdAt).toLocaleDateString('fr-FR')}
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              {nextStatus && nextLabel && (
                                <button
                                  onClick={() => moveLead(lead.id, nextStatus)}
                                  style={{
                                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                                    padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 500,
                                    background: 'var(--accent-light)', color: 'var(--accent)',
                                    border: 'none', cursor: 'pointer', transition: 'opacity 0.1s',
                                  }}
                                >
                                  <ChevronRight size={12} /> {nextLabel}
                                </button>
                              )}

                              {/* More menu */}
                              <div style={{ position: 'relative' }}>
                                <button
                                  onClick={() => setLeadMenuId(leadMenuId === lead.id ? null : lead.id)}
                                  style={{
                                    width: '28px', height: '28px', borderRadius: '6px',
                                    background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--text-tertiary)',
                                  }}
                                >
                                  <MoreHorizontal size={14} />
                                </button>

                                {leadMenuId === lead.id && (
                                  <div style={{
                                    position: 'absolute', right: 0, top: '100%', marginTop: '4px',
                                    background: 'var(--bg-card)', borderRadius: '8px',
                                    border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)',
                                    zIndex: 100, minWidth: '160px', overflow: 'hidden',
                                  }}>
                                    {/* Move to any status */}
                                    {LEAD_COLUMNS.filter((c) => c.status !== lead.status).map((c) => (
                                      <button
                                        key={c.status}
                                        onClick={() => moveLead(lead.id, c.status)}
                                        style={{
                                          width: '100%', padding: '8px 12px', border: 'none',
                                          background: 'none', cursor: 'pointer', fontSize: '12px',
                                          color: 'var(--text-secondary)', textAlign: 'left',
                                          display: 'flex', alignItems: 'center', gap: '8px',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                                      >
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: c.color }} />
                                        {c.label}
                                      </button>
                                    ))}
                                    <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />
                                    <button
                                      onClick={() => deleteLead(lead.id)}
                                      style={{
                                        width: '100%', padding: '8px 12px', border: 'none',
                                        background: 'none', cursor: 'pointer', fontSize: '12px',
                                        color: 'var(--danger)', textAlign: 'left',
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                      }}
                                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                                      onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                                    >
                                      <Trash2 size={12} /> Supprimer
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Contact detail panel */}
      {selectedId && (
        <>
          <div onClick={() => setSelectedId(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--overlay)', zIndex: 1999 }} />
          <ContactDetailPanel contactId={selectedId} onClose={() => setSelectedId(null)} onUpdate={fetchContacts} />
        </>
      )}

      {/* Click outside to close lead menu */}
      {leadMenuId && (
        <div onClick={() => setLeadMenuId(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50 }} />
      )}
    </div>
  );
}
