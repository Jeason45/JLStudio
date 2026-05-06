'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Plus, Search, Trash2, X, FolderKanban, Clock, CheckCircle2, Pause, Ban, Calendar } from 'lucide-react';
import { useAgencySidebar } from '@/components/admin/SidebarContext';

type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  priority: string | null;
  projectType: string | null;
  contactId: string | null;
  startDate: string | null;
  endDate: string | null;
  dueDate: string | null;
  estimatedBudget: number | null;
  actualBudget: number | null;
  progress: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  contact: { id: string; name: string; email: string | null; companyName: string | null } | null;
  _count: { tasks: number; milestones: number };
}

interface Contact {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  companyName: string | null;
}

const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; icon: React.ReactNode }> = {
  PLANNING: { label: 'Planification', color: '#94a3b8', icon: <Clock size={11} /> },
  IN_PROGRESS: { label: 'En cours', color: '#3B82F6', icon: <Clock size={11} /> },
  COMPLETED: { label: 'Terminé', color: '#22c55e', icon: <CheckCircle2 size={11} /> },
  ON_HOLD: { label: 'En pause', color: '#f59e0b', icon: <Pause size={11} /> },
  CANCELLED: { label: 'Annulé', color: '#ef4444', icon: <Ban size={11} /> },
};

export default function AdminProjetsPage() {
  const { isMobile } = useAgencySidebar();
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', description: '', contactId: '', projectType: '',
    startDate: '', endDate: '', estimatedBudget: '',
    status: 'PLANNING' as ProjectStatus,
  });

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setProjects([]);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProjects().finally(() => setLoading(false));
    fetch('/api/admin/contacts')
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setContacts(Array.isArray(d) ? d : []));
  }, [fetchProjects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return p.name.toLowerCase().includes(q)
          || (p.description?.toLowerCase().includes(q) ?? false)
          || (p.contact?.companyName?.toLowerCase().includes(q) ?? false)
          || (p.contact?.name?.toLowerCase().includes(q) ?? false);
      }
      return true;
    });
  }, [projects, search, statusFilter]);

  const stats = useMemo(() => ({
    total: projects.length,
    inProgress: projects.filter((p) => p.status === 'IN_PROGRESS').length,
    completed: projects.filter((p) => p.status === 'COMPLETED').length,
    revenue: projects.reduce((s, p) => s + (p.actualBudget || p.estimatedBudget || 0), 0),
  }), [projects]);

  const handleCreate = async () => {
    if (!form.name.trim()) {
      setError('Nom requis');
      return;
    }
    setCreating(true);
    setError('');
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          description: form.description || undefined,
          contactId: form.contactId || undefined,
          projectType: form.projectType || undefined,
          startDate: form.startDate || undefined,
          endDate: form.endDate || undefined,
          estimatedBudget: form.estimatedBudget ? parseFloat(form.estimatedBudget) : undefined,
          status: form.status,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Erreur ${res.status}`);
      }
      setShowCreate(false);
      setForm({ name: '', description: '', contactId: '', projectType: '', startDate: '', endDate: '', estimatedBudget: '', status: 'PLANNING' });
      fetchProjects();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer le projet "${name}" et toutes ses tâches ?`)) return;
    await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
    fetchProjects();
  };

  return (
    <div>
      <header style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, letterSpacing: '-0.02em' }}>
              Projets
            </h1>
            <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginTop: 4 }}>
              {stats.total} projet{stats.total > 1 ? 's' : ''} · {stats.inProgress} en cours · {stats.completed} terminé{stats.completed > 1 ? 's' : ''} · CA estimé : {stats.revenue.toLocaleString('fr-FR')} €
            </p>
          </div>
          <button onClick={() => setShowCreate(true)} style={primaryBtn()}>
            <Plus size={14} />
            Nouveau projet
          </button>
        </div>
      </header>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--agency-ink-3)' }} />
          <input
            type="text"
            placeholder="Rechercher nom, description, client…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputStyle(), paddingLeft: 32 }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button
            onClick={() => setStatusFilter('all')}
            style={{
              padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              border: `1px solid ${statusFilter === 'all' ? 'var(--agency-accent)' : 'var(--agency-border)'}`,
              background: statusFilter === 'all' ? 'var(--agency-accent-soft)' : 'var(--agency-surface-2)',
              color: statusFilter === 'all' ? 'var(--agency-accent)' : 'var(--agency-ink-3)',
            }}
          >
            Tous
          </button>
          {(Object.entries(STATUS_CONFIG) as [ProjectStatus, typeof STATUS_CONFIG[ProjectStatus]][]).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              style={{
                padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                border: `1px solid ${statusFilter === key ? cfg.color : 'var(--agency-border)'}`,
                background: statusFilter === key ? `${cfg.color}20` : 'var(--agency-surface-2)',
                color: statusFilter === key ? cfg.color : 'var(--agency-ink-3)',
              }}
            >
              {cfg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ ...cardStyle(), padding: 60, textAlign: 'center' }}>
          <p style={{ color: 'var(--agency-ink-3)', fontSize: 13, margin: 0 }}>Chargement…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ ...cardStyle(), padding: 60, textAlign: 'center' }}>
          <FolderKanban size={28} style={{ color: 'var(--agency-ink-4)', marginBottom: 12 }} />
          <p style={{ color: 'var(--agency-ink-2)', fontSize: 14, fontWeight: 500, margin: 0, marginBottom: 4 }}>
            {projects.length === 0 ? 'Aucun projet' : 'Aucun résultat'}
          </p>
          <p style={{ color: 'var(--agency-ink-3)', fontSize: 12, margin: 0, marginBottom: 16 }}>
            {projects.length === 0 ? 'Crée ton premier projet pour démarrer.' : 'Modifie ta recherche ou tes filtres.'}
          </p>
          {projects.length === 0 && (
            <button onClick={() => setShowCreate(true)} style={primaryBtn()}>
              <Plus size={13} />
              Nouveau projet
            </button>
          )}
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 12,
          }}
        >
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onDelete={() => handleDelete(p.id, p.name)} />
          ))}
        </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <Modal title="Nouveau projet" onClose={() => setShowCreate(false)}>
          <Field label="Nom du projet *">
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Refonte site Entreprise XYZ" style={inputStyle()} />
          </Field>
          <Field label="Description">
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} style={{ ...inputStyle(), resize: 'vertical', minHeight: 60 }} />
          </Field>
          <Field label="Client">
            <select value={form.contactId} onChange={(e) => setForm({ ...form, contactId: e.target.value })} style={{ ...inputStyle(), cursor: 'pointer' }}>
              <option value="">— Aucun —</option>
              {contacts.map((c) => {
                const display = c.companyName || `${c.firstName || ''} ${c.lastName || ''}`.trim() || c.name;
                return <option key={c.id} value={c.id}>{display}{c.email ? ` — ${c.email}` : ''}</option>;
              })}
            </select>
          </Field>
          <Field label="Type de projet">
            <input type="text" value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })} placeholder="Site vitrine, e-commerce…" style={inputStyle()} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label="Début">
              <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} style={{ ...inputStyle(), colorScheme: 'dark' }} />
            </Field>
            <Field label="Fin prévue">
              <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} style={{ ...inputStyle(), colorScheme: 'dark' }} />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label="Budget estimé (€)">
              <input type="number" value={form.estimatedBudget} onChange={(e) => setForm({ ...form, estimatedBudget: e.target.value })} placeholder="3500" style={inputStyle()} />
            </Field>
            <Field label="Statut">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ProjectStatus })} style={{ ...inputStyle(), cursor: 'pointer' }}>
                {(Object.entries(STATUS_CONFIG) as [ProjectStatus, typeof STATUS_CONFIG[ProjectStatus]][]).map(([key, cfg]) => (
                  <option key={key} value={key}>{cfg.label}</option>
                ))}
              </select>
            </Field>
          </div>
          {error && (
            <p style={{ fontSize: 12, color: 'var(--agency-danger)', margin: 0, marginBottom: 12 }}>{error}</p>
          )}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
            <button onClick={() => setShowCreate(false)} style={secondaryBtn()}>Annuler</button>
            <button
              onClick={handleCreate}
              disabled={creating || !form.name.trim()}
              style={{ ...primaryBtn(), opacity: creating || !form.name.trim() ? 0.5 : 1 }}
            >
              {creating ? 'Création…' : 'Créer'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── ProjectCard ─────────────────────────────────────────────────────

function ProjectCard({ project, onDelete }: { project: Project; onDelete: () => void }) {
  const cfg = STATUS_CONFIG[project.status];
  const clientName = project.contact?.companyName || project.contact?.name;
  return (
    <div style={{
      background: 'var(--agency-surface-1)',
      border: '1px solid var(--agency-border)',
      borderRadius: 12,
      padding: 18,
      transition: 'all 0.15s',
      position: 'relative',
    }}
      onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--agency-border-strong)'; }}
      onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--agency-border)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, flex: 1, lineHeight: 1.3 }}>
          {project.name}
        </h3>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '3px 8px', borderRadius: 12,
          fontSize: 10, fontWeight: 600,
          color: cfg.color, background: `${cfg.color}20`,
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          {cfg.icon} {cfg.label}
        </span>
      </div>

      {project.description && (
        <p style={{
          fontSize: 12, color: 'var(--agency-ink-3)', margin: 0, marginBottom: 10,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          lineHeight: 1.5,
        }}>
          {project.description}
        </p>
      )}

      {clientName && (
        <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', marginBottom: 8 }}>
          <span style={{ color: 'var(--agency-ink-4)' }}>Client : </span>
          <span style={{ color: 'var(--agency-ink-2)', fontWeight: 500 }}>{clientName}</span>
        </div>
      )}

      {(project.startDate || project.endDate) && (
        <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <Calendar size={11} />
          {project.startDate ? new Date(project.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '?'}
          {' → '}
          {project.endDate ? new Date(project.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '?'}
        </div>
      )}

      {/* Progress */}
      {project._count.tasks > 0 && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: 'var(--agency-ink-3)' }}>Avancement</span>
            <span style={{ fontSize: 10, color: 'var(--agency-ink-2)', fontWeight: 500 }}>{project.progress}%</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: 'var(--agency-surface-2)' }}>
            <div style={{
              width: `${project.progress}%`, height: '100%', borderRadius: 2,
              background: project.progress === 100 ? 'var(--agency-success)' : 'var(--agency-accent)',
              transition: 'width 0.3s',
            }} />
          </div>
        </div>
      )}

      {/* Footer stats */}
      <div style={{
        display: 'flex', gap: 10, fontSize: 10, color: 'var(--agency-ink-3)',
        paddingTop: 10, borderTop: '1px solid var(--agency-border-soft)',
      }}>
        <span>{project._count.tasks} tâche{project._count.tasks > 1 ? 's' : ''}</span>
        {project._count.milestones > 0 && (
          <span>{project._count.milestones} milestone{project._count.milestones > 1 ? 's' : ''}</span>
        )}
        {project.estimatedBudget !== null && (
          <span style={{ marginLeft: 'auto', color: 'var(--agency-ink-2)', fontWeight: 500 }}>
            {project.estimatedBudget.toLocaleString('fr-FR')} €
          </span>
        )}
      </div>

      <button
        onClick={onDelete}
        title="Supprimer"
        style={{
          position: 'absolute', top: 12, right: 12,
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'var(--agency-ink-4)', padding: 4, borderRadius: 4,
          display: 'none',
        }}
      >
        <Trash2 size={12} />
      </button>
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
        borderRadius: 12, padding: 24, width: '100%', maxWidth: 520,
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
