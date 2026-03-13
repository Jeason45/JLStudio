'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSidebar } from '@/components/portal/SidebarContext';
import ContactDetailPanel from '@/components/portal/ContactDetailPanel';
import { Plus, Search } from 'lucide-react';
import type { ContactData } from '@/types/portal';

export default function CRMPage() {
  const { isMobile } = useSidebar();
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ email: '', firstName: '', lastName: '', phone: '', company: '' });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const fetchContacts = useCallback(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (statusFilter) params.set('status', statusFilter);
    fetch(`/api/portal/contacts?${params}`)
      .then((r) => r.json())
      .then((data) => { setContacts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [search, statusFilter]);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

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

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>CRM</h1>
        <button onClick={() => setShowCreate(!showCreate)} style={{
          display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
          background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
        }}>
          <Plus size={16} /> Nouveau contact
        </button>
      </div>

      {/* Stats / Filter pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { label: 'Total', value: statusCounts.total, filter: '' },
          { label: 'Nouveaux', value: statusCounts.NEW, filter: 'NEW' },
          { label: 'Actifs', value: statusCounts.ACTIVE, filter: 'ACTIVE' },
          { label: 'Inactifs', value: statusCounts.INACTIVE, filter: 'INACTIVE' },
        ].map((s) => (
          <button key={s.label} onClick={() => setStatusFilter(statusFilter === s.filter ? '' : s.filter)} style={{
            padding: '8px 16px', borderRadius: '20px',
            border: 'none',
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
      {loading ? (
        <p style={{ color: 'var(--text-tertiary)' }}>Chargement...</p>
      ) : contacts.length === 0 ? (
        <p style={{ color: 'var(--text-tertiary)' }}>Aucun contact</p>
      ) : (
        <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
          {/* Table header */}
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
                  background: 'var(--accent-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 500, color: 'var(--accent)', flexShrink: 0,
                }}>
                  {(c.firstName?.[0] || c.email[0]).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {c.firstName || ''} {c.lastName || ''} {!c.firstName && !c.lastName ? c.email : ''}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '1px' }}>
                    {c.email}
                  </div>
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

      {/* Detail panel */}
      {selectedId && (
        <>
          <div onClick={() => setSelectedId(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--overlay)', zIndex: 1999 }} />
          <ContactDetailPanel contactId={selectedId} onClose={() => setSelectedId(null)} onUpdate={fetchContacts} />
        </>
      )}
    </div>
  );
}
