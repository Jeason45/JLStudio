'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Plus, X, Trash2, MoreHorizontal, GitBranch } from 'lucide-react';
import { useAgencySidebar } from '@/components/admin/SidebarContext';

type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'LOST';

interface Lead {
  id: string;
  status: LeadStatus;
  source: string | null;
  notes: string | null;
  createdAt: string;
  contact: {
    id: string;
    name: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    companyName: string | null;
    phone: string | null;
  };
}

const COLUMNS: { status: LeadStatus; label: string; color: string }[] = [
  { status: 'NEW', label: 'Nouveau', color: '#3B82F6' },
  { status: 'CONTACTED', label: 'Contacté', color: '#f59e0b' },
  { status: 'QUALIFIED', label: 'Qualifié', color: '#a78bfa' },
  { status: 'CONVERTED', label: 'Converti', color: '#22c55e' },
  { status: 'LOST', label: 'Perdu', color: '#ef4444' },
];

const NEXT_STATUS: Record<LeadStatus, LeadStatus | null> = {
  NEW: 'CONTACTED',
  CONTACTED: 'QUALIFIED',
  QUALIFIED: 'CONVERTED',
  CONVERTED: null,
  LOST: null,
};

export default function AdminLeadsPage() {
  const { isMobile } = useAgencySidebar();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '', firstName: '', lastName: '', email: '', phone: '',
    companyName: '', source: '', notes: '',
  });

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch {
      setLeads([]);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchLeads().finally(() => setLoading(false));
  }, [fetchLeads]);

  const handleCreate = async () => {
    if (!form.name.trim()) {
      setError('Nom requis');
      return;
    }
    setCreating(true);
    setError('');
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newContact: {
            name: form.name.trim(),
            firstName: form.firstName || undefined,
            lastName: form.lastName || undefined,
            email: form.email || undefined,
            phone: form.phone || undefined,
            companyName: form.companyName || undefined,
          },
          source: form.source || undefined,
          notes: form.notes || undefined,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Erreur ${res.status}`);
      }
      setShowCreate(false);
      setForm({ name: '', firstName: '', lastName: '', email: '', phone: '', companyName: '', source: '', notes: '' });
      fetchLeads();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setCreating(false);
    }
  };

  const moveLead = async (leadId: string, newStatus: LeadStatus) => {
    setOpenMenuId(null);
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
    } catch {
      fetchLeads();
    }
  };

  const deleteLead = async (leadId: string) => {
    setOpenMenuId(null);
    if (!confirm('Supprimer ce lead ?')) return;
    await fetch(`/api/admin/leads?id=${leadId}`, { method: 'DELETE' });
    fetchLeads();
  };

  const stats = useMemo(() => {
    const total = leads.length;
    const converted = leads.filter((l) => l.status === 'CONVERTED').length;
    const lost = leads.filter((l) => l.status === 'LOST').length;
    const closed = converted + lost;
    return {
      total,
      converted,
      conversion: closed > 0 ? Math.round((converted / closed) * 100) : 0,
    };
  }, [leads]);

  return (
    <div>
      <header style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, letterSpacing: '-0.02em' }}>
              Pipeline Leads
            </h1>
            <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginTop: 4 }}>
              {stats.total} lead{stats.total > 1 ? 's' : ''} · {stats.converted} converti{stats.converted > 1 ? 's' : ''} · {stats.conversion}% conversion
            </p>
          </div>
          <button onClick={() => setShowCreate(true)} style={primaryBtn()}>
            <Plus size={14} />
            Nouveau lead
          </button>
        </div>
      </header>

      {/* Pipeline kanban */}
      {loading ? (
        <div style={{ ...cardStyle(), padding: 60, textAlign: 'center' }}>
          <p style={{ color: 'var(--agency-ink-3)', fontSize: 13, margin: 0 }}>Chargement…</p>
        </div>
      ) : leads.length === 0 ? (
        <div style={{ ...cardStyle(), padding: 60, textAlign: 'center' }}>
          <GitBranch size={28} style={{ color: 'var(--agency-ink-4)', marginBottom: 12 }} />
          <p style={{ color: 'var(--agency-ink-2)', fontSize: 14, fontWeight: 500, margin: 0, marginBottom: 4 }}>
            Aucun lead pour l&apos;instant
          </p>
          <p style={{ color: 'var(--agency-ink-3)', fontSize: 12, margin: 0, marginBottom: 16 }}>
            Crée ton premier lead pour démarrer ton pipeline.
          </p>
          <button onClick={() => setShowCreate(true)} style={primaryBtn()}>
            <Plus size={13} />
            Nouveau lead
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : `repeat(${COLUMNS.length}, minmax(220px, 1fr))`,
          gap: 12,
          overflowX: 'auto',
        }}>
          {COLUMNS.map((col) => {
            const colLeads = leads.filter((l) => l.status === col.status);
            return (
              <div key={col.status} style={{
                background: 'var(--agency-surface-1)',
                border: '1px solid var(--agency-border)',
                borderRadius: 10,
                display: 'flex', flexDirection: 'column',
                minHeight: 280,
              }}>
                <div style={{
                  padding: '10px 12px',
                  borderBottom: '1px solid var(--agency-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--agency-ink-1)' }}>{col.label}</span>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    color: 'var(--agency-ink-3)',
                    background: 'var(--agency-surface-2)',
                    padding: '2px 8px', borderRadius: 10,
                  }}>
                    {colLeads.length}
                  </span>
                </div>

                <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                  {colLeads.length === 0 && (
                    <p style={{ fontSize: 11, color: 'var(--agency-ink-4)', textAlign: 'center', padding: '24px 0', margin: 0 }}>
                      Aucun lead
                    </p>
                  )}
                  {colLeads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      isMenuOpen={openMenuId === lead.id}
                      onToggleMenu={() => setOpenMenuId(openMenuId === lead.id ? null : lead.id)}
                      onMove={(s) => moveLead(lead.id, s)}
                      onDelete={() => deleteLead(lead.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <Modal title="Nouveau lead" onClose={() => setShowCreate(false)}>
          <Field label="Nom complet *">
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jean Dupont" style={inputStyle()} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label="Prénom">
              <input type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} style={inputStyle()} />
            </Field>
            <Field label="Nom de famille">
              <input type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} style={inputStyle()} />
            </Field>
          </div>
          <Field label="Email">
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jean@exemple.fr" style={inputStyle()} />
          </Field>
          <Field label="Téléphone">
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="06 12 34 56 78" style={inputStyle()} />
          </Field>
          <Field label="Entreprise">
            <input type="text" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} style={inputStyle()} />
          </Field>
          <Field label="Source">
            <input type="text" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="LinkedIn, recommandation, site web…" style={inputStyle()} />
          </Field>
          <Field label="Notes">
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} style={{ ...inputStyle(), resize: 'vertical', minHeight: 70 }} />
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
              disabled={creating || !form.name.trim()}
              style={{ ...primaryBtn(), opacity: creating || !form.name.trim() ? 0.5 : 1 }}
            >
              {creating ? 'Création…' : 'Créer le lead'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── LeadCard ────────────────────────────────────────────────────────

function LeadCard({
  lead, isMenuOpen, onToggleMenu, onMove, onDelete,
}: {
  lead: Lead;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onMove: (s: LeadStatus) => void;
  onDelete: () => void;
}) {
  const next = NEXT_STATUS[lead.status];
  const nextLabel = next ? COLUMNS.find((c) => c.status === next)?.label : null;
  const contactName = lead.contact.companyName
    || `${lead.contact.firstName || ''} ${lead.contact.lastName || ''}`.trim()
    || lead.contact.name
    || lead.contact.email
    || '?';
  return (
    <div style={{
      background: 'var(--agency-surface-2)',
      border: '1px solid var(--agency-border)',
      borderRadius: 8,
      padding: 10,
      position: 'relative',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--agency-ink-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {contactName}
          </div>
          {lead.contact.email && (
            <div style={{ fontSize: 10, color: 'var(--agency-ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {lead.contact.email}
            </div>
          )}
        </div>
        <button
          onClick={onToggleMenu}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--agency-ink-3)', padding: 2, display: 'flex', flexShrink: 0 }}
        >
          <MoreHorizontal size={14} />
        </button>
      </div>

      {(lead.source || lead.notes) && (
        <div style={{ fontSize: 10, color: 'var(--agency-ink-3)', marginBottom: 6 }}>
          {lead.source && <span>{lead.source}</span>}
          {lead.source && lead.notes && <span> · </span>}
          {lead.notes && <span>{lead.notes.slice(0, 50)}{lead.notes.length > 50 ? '…' : ''}</span>}
        </div>
      )}

      <div style={{ fontSize: 10, color: 'var(--agency-ink-4)' }}>
        {new Date(lead.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
      </div>

      {isMenuOpen && (
        <div style={{
          position: 'absolute', top: 30, right: 8,
          background: 'var(--agency-surface-3)',
          border: '1px solid var(--agency-border-strong)',
          borderRadius: 8,
          padding: 4,
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          zIndex: 10, minWidth: 160,
        }}>
          {next && nextLabel && (
            <button onClick={() => onMove(next)} style={menuItemStyle()}>
              → {nextLabel}
            </button>
          )}
          {lead.status !== 'LOST' && (
            <button onClick={() => onMove('LOST')} style={menuItemStyle('var(--agency-danger)')}>
              Marquer perdu
            </button>
          )}
          <div style={{ height: 1, background: 'var(--agency-border)', margin: '4px 0' }} />
          <button onClick={onDelete} style={menuItemStyle('var(--agency-danger)')}>
            <Trash2 size={11} /> Supprimer
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────

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
function menuItemStyle(color = 'var(--agency-ink-2)'): React.CSSProperties {
  return {
    display: 'flex', alignItems: 'center', gap: 6,
    width: '100%', padding: '7px 10px',
    background: 'transparent', border: 'none', cursor: 'pointer',
    fontSize: 12, color, textAlign: 'left',
    fontFamily: 'inherit',
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
