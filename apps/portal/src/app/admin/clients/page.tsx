'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Plus, Search, Trash2, X, UserCheck, Mail, Phone, Building2 } from 'lucide-react';
import { useAgencySidebar } from '@/components/admin/SidebarContext';

type ContactStatus = 'NEW' | 'ACTIVE' | 'INACTIVE';

interface Contact {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  companyName: string | null;
  type: string | null;
  status: ContactStatus;
  source: string | null;
  score: number | null;
  projectType: string | null;
  budget: string | null;
  estimatedPrice: number | null;
  paymentStatus: string | null;
  paidAmount: number | null;
  paidAt: string | null;
  city: string | null;
  notes: string | null;
  createdAt: string;
}

const STATUS_CONFIG: Record<ContactStatus, { label: string; color: string }> = {
  NEW: { label: 'Nouveau', color: '#3B82F6' },
  ACTIVE: { label: 'Actif', color: '#22c55e' },
  INACTIVE: { label: 'Inactif', color: '#94a3b8' },
};

export default function AdminClientsPage() {
  const { isMobile } = useAgencySidebar();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreate, setShowCreate] = useState(false);
  const [editTarget, setEditTarget] = useState<Contact | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', firstName: '', lastName: '', email: '', phone: '',
    companyName: '', city: '', projectType: '', budget: '', notes: '',
    status: 'ACTIVE' as ContactStatus,
  });

  const openEdit = (contact: Contact) => {
    setEditTarget(contact);
    setForm({
      name: contact.name || '',
      firstName: contact.firstName || '',
      lastName: contact.lastName || '',
      email: contact.email || '',
      phone: contact.phone || '',
      companyName: contact.companyName || contact.company || '',
      city: contact.city || '',
      projectType: contact.projectType || '',
      budget: contact.budget || '',
      notes: contact.notes || '',
      status: contact.status,
    });
    setError('');
  };

  const closeEdit = () => {
    setEditTarget(null);
    setError('');
  };

  const handleUpdate = async () => {
    if (!editTarget) return;
    if (!form.name.trim() || !form.email.trim()) {
      setError('Nom et email requis');
      return;
    }
    setCreating(true);
    setError('');
    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editTarget.id,
          name: form.name.trim(),
          firstName: form.firstName || null,
          lastName: form.lastName || null,
          email: form.email.trim(),
          phone: form.phone || null,
          companyName: form.companyName || null,
          city: form.city || null,
          projectType: form.projectType || null,
          budget: form.budget || null,
          notes: form.notes || null,
          status: form.status,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Erreur ${res.status}`);
      }
      closeEdit();
      fetchContacts();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setCreating(false);
    }
  };

  const fetchContacts = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (search.trim()) params.set('search', search.trim());
      const res = await fetch(`/api/admin/contacts?${params.toString()}`);
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch {
      setContacts([]);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    setLoading(true);
    fetchContacts().finally(() => setLoading(false));
  }, [fetchContacts]);

  const handleCreate = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError('Nom et email requis');
      return;
    }
    setCreating(true);
    setError('');
    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          firstName: form.firstName || undefined,
          lastName: form.lastName || undefined,
          email: form.email.trim(),
          phone: form.phone || undefined,
          companyName: form.companyName || undefined,
          city: form.city || undefined,
          projectType: form.projectType || undefined,
          budget: form.budget || undefined,
          notes: form.notes || undefined,
          status: form.status,
          type: form.companyName ? 'entreprise' : 'particulier',
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Erreur ${res.status}`);
      }
      setShowCreate(false);
      setForm({
        name: '', firstName: '', lastName: '', email: '', phone: '',
        companyName: '', city: '', projectType: '', budget: '', notes: '',
        status: 'ACTIVE',
      });
      fetchContacts();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer le contact "${name}" ?`)) return;
    await fetch(`/api/admin/contacts?id=${id}`, { method: 'DELETE' });
    fetchContacts();
  };

  const stats = useMemo(() => ({
    total: contacts.length,
    active: contacts.filter((c) => c.status === 'ACTIVE').length,
    new: contacts.filter((c) => c.status === 'NEW').length,
  }), [contacts]);

  return (
    <div>
      <header style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, letterSpacing: '-0.02em' }}>
              Clients
            </h1>
            <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginTop: 4 }}>
              {stats.total} contact{stats.total > 1 ? 's' : ''} · {stats.active} actif{stats.active > 1 ? 's' : ''} · {stats.new} nouveau{stats.new > 1 ? 'x' : ''}
            </p>
          </div>
          <button onClick={() => setShowCreate(true)} style={primaryBtn()}>
            <Plus size={14} />
            Nouveau client
          </button>
        </div>
      </header>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--agency-ink-3)' }} />
          <input
            type="text"
            placeholder="Rechercher nom, email, entreprise…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputStyle(), paddingLeft: 32 }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { key: 'all', label: 'Tous' },
            { key: 'NEW', label: 'Nouveaux' },
            { key: 'ACTIVE', label: 'Actifs' },
            { key: 'INACTIVE', label: 'Inactifs' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              style={{
                padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                border: `1px solid ${statusFilter === f.key ? 'var(--agency-accent)' : 'var(--agency-border)'}`,
                background: statusFilter === f.key ? 'var(--agency-accent-soft)' : 'var(--agency-surface-2)',
                color: statusFilter === f.key ? 'var(--agency-accent)' : 'var(--agency-ink-3)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts table/cards */}
      {loading ? (
        <div style={{ ...cardStyle(), padding: 60, textAlign: 'center' }}>
          <p style={{ color: 'var(--agency-ink-3)', fontSize: 13, margin: 0 }}>Chargement…</p>
        </div>
      ) : contacts.length === 0 ? (
        <div style={{ ...cardStyle(), padding: 60, textAlign: 'center' }}>
          <UserCheck size={28} style={{ color: 'var(--agency-ink-4)', marginBottom: 12 }} />
          <p style={{ color: 'var(--agency-ink-2)', fontSize: 14, fontWeight: 500, margin: 0, marginBottom: 4 }}>
            {search || statusFilter !== 'all' ? 'Aucun contact ne correspond' : 'Aucun client'}
          </p>
          <p style={{ color: 'var(--agency-ink-3)', fontSize: 12, margin: 0, marginBottom: 16 }}>
            {search || statusFilter !== 'all'
              ? 'Modifiez votre recherche ou les filtres.'
              : 'Crée ton premier client pour démarrer.'}
          </p>
          {!search && statusFilter === 'all' && (
            <button onClick={() => setShowCreate(true)} style={primaryBtn()}>
              <Plus size={13} />
              Nouveau client
            </button>
          )}
        </div>
      ) : isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {contacts.map((c) => (
            <div
              key={c.id}
              onClick={() => openEdit(c)}
              style={{ ...cardStyle(), padding: 14, cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--agency-ink-1)' }}>
                    {c.companyName || `${c.firstName || ''} ${c.lastName || ''}`.trim() || c.name}
                  </div>
                  {c.email && (
                    <div style={{ fontSize: 11, color: 'var(--agency-ink-3)' }}>{c.email}</div>
                  )}
                </div>
                <StatusBadge status={c.status} />
              </div>
              {c.projectType && (
                <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', marginTop: 4 }}>
                  {c.projectType}{c.budget ? ` · ${c.budget}` : ''}
                </div>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(c.id, c.name); }}
                style={{
                  marginTop: 8, padding: '5px 10px', borderRadius: 6,
                  background: 'transparent', border: '1px solid var(--agency-border)',
                  color: 'var(--agency-danger)', fontSize: 11, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                }}
              >
                <Trash2 size={11} /> Supprimer
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ ...cardStyle(), padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--agency-surface-2)' }}>
                {['Contact', 'Entreprise', 'Projet', 'Budget', 'Statut', ''].map((h, i) => (
                  <th key={i} style={{
                    padding: '10px 16px', textAlign: 'left',
                    fontSize: 10, fontWeight: 700,
                    color: 'var(--agency-ink-3)',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    borderBottom: '1px solid var(--agency-border)',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => {
                const displayName = `${c.firstName || ''} ${c.lastName || ''}`.trim() || c.name;
                return (
                  <tr key={c.id} style={{ borderTop: '1px solid var(--agency-border-soft)', cursor: 'pointer' }}
                    onClick={() => openEdit(c)}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'var(--agency-surface-2)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--agency-ink-1)' }}>
                        {displayName}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', display: 'flex', gap: 8, marginTop: 2, flexWrap: 'wrap' }}>
                        {c.email && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                            <Mail size={10} /> {c.email}
                          </span>
                        )}
                        {c.phone && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                            <Phone size={10} /> {c.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--agency-ink-2)' }}>
                      {c.companyName ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <Building2 size={11} /> {c.companyName}
                        </span>
                      ) : '—'}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--agency-ink-2)' }}>
                      {c.projectType || '—'}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--agency-ink-2)' }}>
                      {c.budget || (c.estimatedPrice ? `${c.estimatedPrice.toLocaleString('fr-FR')} €` : '—')}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <StatusBadge status={c.status} />
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(c.id, displayName); }}
                        title="Supprimer"
                        style={{
                          background: 'transparent', border: 'none', cursor: 'pointer',
                          color: 'var(--agency-ink-3)', padding: 4, display: 'inline-flex',
                          borderRadius: 4,
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.color = 'var(--agency-danger)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.color = 'var(--agency-ink-3)'; }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <Modal title="Nouveau client" onClose={() => setShowCreate(false)}>
          <Field label="Nom complet *">
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nom complet ou société" style={inputStyle()} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label="Prénom">
              <input type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} style={inputStyle()} />
            </Field>
            <Field label="Nom">
              <input type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} style={inputStyle()} />
            </Field>
          </div>
          <Field label="Email *">
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle()} />
          </Field>
          <Field label="Téléphone">
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle()} />
          </Field>
          <Field label="Entreprise">
            <input type="text" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} style={inputStyle()} />
          </Field>
          <Field label="Ville">
            <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} style={inputStyle()} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label="Type de projet">
              <input type="text" value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })} placeholder="Site vitrine, e-commerce…" style={inputStyle()} />
            </Field>
            <Field label="Budget">
              <input type="text" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="2000-5000 €" style={inputStyle()} />
            </Field>
          </div>
          <Field label="Notes">
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} style={{ ...inputStyle(), resize: 'vertical', minHeight: 70 }} />
          </Field>
          <Field label="Statut">
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ContactStatus })} style={{ ...inputStyle(), cursor: 'pointer' }}>
              <option value="NEW">Nouveau</option>
              <option value="ACTIVE">Actif</option>
              <option value="INACTIVE">Inactif</option>
            </select>
          </Field>
          {error && (
            <p style={{ fontSize: 12, color: 'var(--agency-danger)', margin: 0, marginBottom: 12 }}>
              {error}
            </p>
          )}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
            <button onClick={() => setShowCreate(false)} style={secondaryBtn()}>Annuler</button>
            <button
              onClick={handleCreate}
              disabled={creating || !form.name.trim() || !form.email.trim()}
              style={{ ...primaryBtn(), opacity: creating || !form.name.trim() || !form.email.trim() ? 0.5 : 1 }}
            >
              {creating ? 'Création…' : 'Créer'}
            </button>
          </div>
        </Modal>
      )}

      {/* Edit modal */}
      {editTarget && (
        <Modal title={`Éditer ${editTarget.name}`} onClose={closeEdit}>
          <Field label="Nom complet *">
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle()} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label="Prénom">
              <input type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} style={inputStyle()} />
            </Field>
            <Field label="Nom">
              <input type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} style={inputStyle()} />
            </Field>
          </div>
          <Field label="Email *">
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle()} />
          </Field>
          <Field label="Téléphone">
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle()} />
          </Field>
          <Field label="Entreprise">
            <input type="text" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} style={inputStyle()} />
          </Field>
          <Field label="Ville">
            <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} style={inputStyle()} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label="Type de projet">
              <input type="text" value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })} style={inputStyle()} />
            </Field>
            <Field label="Budget">
              <input type="text" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} style={inputStyle()} />
            </Field>
          </div>
          <Field label="Notes">
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={4} style={{ ...inputStyle(), resize: 'vertical', minHeight: 90 }} />
          </Field>
          <Field label="Statut">
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ContactStatus })} style={{ ...inputStyle(), cursor: 'pointer' }}>
              <option value="NEW">Nouveau</option>
              <option value="ACTIVE">Actif</option>
              <option value="INACTIVE">Inactif</option>
            </select>
          </Field>
          {error && (
            <p style={{ fontSize: 12, color: 'var(--agency-danger)', margin: 0, marginBottom: 12 }}>
              {error}
            </p>
          )}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', marginTop: 12, alignItems: 'center' }}>
            <button
              onClick={() => { closeEdit(); handleDelete(editTarget.id, editTarget.name); }}
              style={{
                padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                background: 'transparent', color: 'var(--agency-danger)',
                border: '1px solid var(--agency-danger)',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
            >
              <Trash2 size={12} /> Supprimer
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={closeEdit} style={secondaryBtn()}>Annuler</button>
              <button
                onClick={handleUpdate}
                disabled={creating || !form.name.trim() || !form.email.trim()}
                style={{ ...primaryBtn(), opacity: creating || !form.name.trim() || !form.email.trim() ? 0.5 : 1 }}
              >
                {creating ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ContactStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 12,
      fontSize: 10, fontWeight: 600,
      color: cfg.color, background: `${cfg.color}20`,
      whiteSpace: 'nowrap', display: 'inline-block',
    }}>
      {cfg.label}
    </span>
  );
}

function inputStyle(): React.CSSProperties {
  return {
    width: '100%', padding: '8px 12px',
    border: '1px solid var(--agency-border)', borderRadius: 8,
    fontSize: 13, outline: 'none',
    background: 'var(--agency-surface-2)',
    color: 'var(--agency-ink-1)',
    fontFamily: 'inherit',
  };
}
function cardStyle(): React.CSSProperties {
  return {
    background: 'var(--agency-surface-1)',
    border: '1px solid var(--agency-border)',
    borderRadius: 12,
  };
}
function primaryBtn(): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '7px 14px', borderRadius: 8,
    fontSize: 12, fontWeight: 500, cursor: 'pointer',
    background: 'var(--agency-accent)', color: 'white', border: 'none',
  };
}
function secondaryBtn(): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '7px 14px', borderRadius: 8,
    fontSize: 12, fontWeight: 500, cursor: 'pointer',
    background: 'var(--agency-surface-2)', color: 'var(--agency-ink-2)',
    border: '1px solid var(--agency-border)',
  };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{
        display: 'block', fontSize: 11, fontWeight: 600,
        color: 'var(--agency-ink-3)', marginBottom: 6,
        textTransform: 'uppercase', letterSpacing: '0.05em',
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Modal({
  title, onClose, children,
}: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: 16,
      }}
    >
      <div style={{
        background: 'var(--agency-surface-1)',
        border: '1px solid var(--agency-border)',
        borderRadius: 12, padding: 24, width: '100%', maxWidth: 480,
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--agency-ink-3)', padding: 4, display: 'flex' }}>
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
