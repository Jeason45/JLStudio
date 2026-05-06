'use client';

import { useState, useEffect, useCallback, useRef, type DragEvent } from 'react';
import { Plus, Search, RefreshCw, X, Settings, Trash2 } from 'lucide-react';
import { useAgencySidebar } from '@/components/admin/SidebarContext';

// ─── Types ───────────────────────────────────────────────────────────

type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

interface Task {
  id: string;
  title: string;
  description?: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  kanbanColumn?: string | null;
  order: number;
  dueDate?: string | null;
  project: {
    id: string;
    name: string;
    contact?: { id: string; name: string; email?: string | null } | null;
  };
}

interface Project { id: string; name: string }

interface Column {
  id: string;
  label: string;
  color: string;
  wipLimit: number | null;
  mappedStatus: TaskStatus;
}

const DEFAULT_COLUMNS: Column[] = [
  { id: 'backlog', label: 'Backlog', color: '#94a3b8', wipLimit: null, mappedStatus: 'TODO' },
  { id: 'todo', label: 'À faire', color: '#3B82F6', wipLimit: 5, mappedStatus: 'TODO' },
  { id: 'in_progress', label: 'En cours', color: '#f59e0b', wipLimit: 3, mappedStatus: 'IN_PROGRESS' },
  { id: 'review', label: 'Revue', color: '#a78bfa', wipLimit: 2, mappedStatus: 'IN_PROGRESS' },
  { id: 'done', label: 'Terminé', color: '#22c55e', wipLimit: null, mappedStatus: 'DONE' },
];

const STORAGE_KEY = 'jlstudio_admin_kanban_columns';

const PRIORITY_COLORS: Record<TaskPriority, { bg: string; border: string; text: string; label: string }> = {
  urgent: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', text: '#f87171', label: 'Urgent' },
  high:   { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.4)', text: '#fb923c', label: 'Haute' },
  medium: { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.4)', text: '#60a5fa', label: 'Moyenne' },
  low:    { bg: 'rgba(148,163,184,0.15)', border: 'rgba(148,163,184,0.4)', text: '#94a3b8', label: 'Basse' },
};

function loadColumns(): Column[] {
  if (typeof window === 'undefined') return DEFAULT_COLUMNS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }
  return DEFAULT_COLUMNS;
}

function saveColumns(columns: Column[]) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(columns)); } catch { /* ignore */ }
}

function formatDate(d: string | null | undefined): string {
  if (!d) return '';
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function isOverdue(d: string | null | undefined, status: TaskStatus): boolean {
  if (!d || status === 'DONE') return false;
  return new Date(d) < new Date();
}

// ─── Page ────────────────────────────────────────────────────────────

export default function KanbanPage() {
  const { isMobile } = useAgencySidebar();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [columns, setColumns] = useState<Column[]>(DEFAULT_COLUMNS);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedProjectId, setSelectedProjectId] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [showCreate, setShowCreate] = useState(false);
  const [newTask, setNewTask] = useState({ projectId: '', title: '', priority: 'medium' as TaskPriority, description: '' });
  const [creating, setCreating] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [editColumns, setEditColumns] = useState<Column[]>([]);

  const dragTaskId = useRef<string | null>(null);
  const dragSourceCol = useRef<string | null>(null);

  // Initial load
  useEffect(() => { setColumns(loadColumns()); }, []);

  const fetchTasks = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (selectedProjectId !== 'all') params.append('projectId', selectedProjectId);
      if (selectedPriority !== 'all') params.append('priority', selectedPriority);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      const res = await fetch(`/api/admin/kanban/tasks?${params.toString()}`);
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch {
      setTasks([]);
    }
  }, [selectedProjectId, selectedPriority, searchQuery]);

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
    Promise.all([fetchProjects(), fetchTasks()]).finally(() => setLoading(false));
  }, [fetchProjects, fetchTasks]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  // Tasks per column
  const getTaskColumn = (task: Task): string => {
    if (task.kanbanColumn && columns.some((c) => c.id === task.kanbanColumn)) return task.kanbanColumn;
    if (task.status === 'DONE') return 'done';
    if (task.status === 'IN_PROGRESS') return 'in_progress';
    return 'backlog';
  };
  const getTasksForColumn = (colId: string) =>
    tasks.filter((t) => getTaskColumn(t) === colId).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Drag & drop
  const handleDragStart = (e: DragEvent<HTMLDivElement>, taskId: string, colId: string) => {
    dragTaskId.current = taskId;
    dragSourceCol.current = colId;
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.style.opacity = '0.5';
  };
  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
    dragTaskId.current = null;
    dragSourceCol.current = null;
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); };
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.background = 'var(--agency-accent-soft)';
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => { e.currentTarget.style.background = ''; };

  const handleDrop = async (e: DragEvent<HTMLDivElement>, targetColId: string) => {
    e.preventDefault();
    e.currentTarget.style.background = '';
    const taskId = dragTaskId.current;
    if (!taskId || dragSourceCol.current === targetColId) return;
    const col = columns.find((c) => c.id === targetColId);
    if (!col) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, kanbanColumn: targetColId, status: col.mappedStatus } : t,
      ),
    );

    try {
      const res = await fetch('/api/admin/kanban/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId, kanbanColumn: targetColId, status: col.mappedStatus }),
      });
      if (!res.ok) throw new Error();
    } catch {
      await fetchTasks();
    }
  };

  // Create
  const handleCreate = async () => {
    if (!newTask.projectId || !newTask.title.trim()) return;
    setCreating(true);
    try {
      const res = await fetch('/api/admin/kanban/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: newTask.projectId,
          title: newTask.title.trim(),
          priority: newTask.priority,
          description: newTask.description.trim() || undefined,
          kanbanColumn: 'backlog',
          status: 'TODO',
        }),
      });
      if (!res.ok) throw new Error();
      await fetchTasks();
      setShowCreate(false);
      setNewTask({ projectId: '', title: '', priority: 'medium', description: '' });
    } catch {
      alert('Erreur lors de la création');
    } finally {
      setCreating(false);
    }
  };

  // Delete
  const handleDelete = async (taskId: string, title: string) => {
    if (!confirm(`Supprimer la tâche "${title}" ?`)) return;
    try {
      await fetch(`/api/admin/kanban/tasks?id=${taskId}`, { method: 'DELETE' });
      await fetchTasks();
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  // Settings
  const openSettings = () => {
    setEditColumns([...columns]);
    setShowSettings(true);
  };
  const saveSettings = () => {
    setColumns(editColumns);
    saveColumns(editColumns);
    setShowSettings(false);
  };

  // ─── Render ─────────────────────────────────────────────────────────

  return (
    <div>
      {/* Header */}
      <header style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, letterSpacing: '-0.02em' }}>
              Kanban
            </h1>
            <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginTop: 4 }}>
              {tasks.length} tâche{tasks.length > 1 ? 's' : ''} · {columns.length} colonne{columns.length > 1 ? 's' : ''}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={handleRefresh} title="Rafraîchir" style={iconBtn()}>
              <RefreshCw size={14} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            </button>
            <button onClick={openSettings} title="Configurer colonnes" style={iconBtn()}>
              <Settings size={14} />
            </button>
            <button onClick={() => setShowCreate(true)} style={primaryBtn()}>
              <Plus size={14} />
              Nouvelle tâche
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 180 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--agency-ink-3)' }} />
          <input
            type="text"
            placeholder="Rechercher…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ ...inputStyle(), paddingLeft: 32 }}
          />
        </div>
        <select value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)} style={{ ...inputStyle(), cursor: 'pointer', maxWidth: 220 }}>
          <option value="all">Tous les projets</option>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)} style={{ ...inputStyle(), cursor: 'pointer', maxWidth: 160 }}>
          <option value="all">Toutes priorités</option>
          <option value="urgent">Urgent</option>
          <option value="high">Haute</option>
          <option value="medium">Moyenne</option>
          <option value="low">Basse</option>
        </select>
      </div>

      {/* Board */}
      {loading ? (
        <div style={{ ...cardStyle(), textAlign: 'center', padding: 60 }}>
          <RefreshCw size={24} style={{ color: 'var(--agency-accent)', animation: 'spin 1s linear infinite', marginBottom: 12 }} />
          <p style={{ color: 'var(--agency-ink-3)', fontSize: 13, margin: 0 }}>Chargement…</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : `repeat(${columns.length}, minmax(260px, 1fr))`,
            gap: 12,
            overflowX: 'auto',
            paddingBottom: 8,
          }}
        >
          {columns.map((col) => {
            const colTasks = getTasksForColumn(col.id);
            const overWip = col.wipLimit !== null && colTasks.length > col.wipLimit;
            return (
              <div
                key={col.id}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, col.id)}
                style={{
                  background: 'var(--agency-surface-1)',
                  border: '1px solid var(--agency-border)',
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 300,
                  transition: 'background 0.15s',
                }}
              >
                {/* Column header */}
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
                    color: overWip ? 'var(--agency-danger)' : 'var(--agency-ink-3)',
                    background: 'var(--agency-surface-2)',
                    padding: '2px 8px', borderRadius: 10,
                  }}>
                    {colTasks.length}{col.wipLimit !== null ? `/${col.wipLimit}` : ''}
                  </span>
                </div>

                {/* Tasks */}
                <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                  {colTasks.length === 0 && (
                    <p style={{ fontSize: 11, color: 'var(--agency-ink-4)', textAlign: 'center', padding: '24px 0', margin: 0 }}>
                      Aucune tâche
                    </p>
                  )}
                  {colTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      colId={col.id}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDelete={() => handleDelete(task.id, task.title)}
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
        <Modal title="Nouvelle tâche" onClose={() => setShowCreate(false)}>
          <Field label="Projet">
            <select
              value={newTask.projectId}
              onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })}
              style={{ ...inputStyle(), cursor: 'pointer' }}
            >
              <option value="">— Sélectionner un projet —</option>
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </Field>
          <Field label="Titre">
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Ex: Refonte page d'accueil"
              style={inputStyle()}
            />
          </Field>
          <Field label="Priorité">
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskPriority })}
              style={{ ...inputStyle(), cursor: 'pointer' }}
            >
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
              <option value="urgent">Urgent</option>
            </select>
          </Field>
          <Field label="Description (optionnel)">
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Détails…"
              rows={3}
              style={{ ...inputStyle(), resize: 'vertical', minHeight: 80 }}
            />
          </Field>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
            <button onClick={() => setShowCreate(false)} style={secondaryBtn()}>Annuler</button>
            <button
              onClick={handleCreate}
              disabled={creating || !newTask.projectId || !newTask.title.trim()}
              style={{ ...primaryBtn(), opacity: creating || !newTask.projectId || !newTask.title.trim() ? 0.5 : 1 }}
            >
              {creating ? 'Création…' : 'Créer'}
            </button>
          </div>
        </Modal>
      )}

      {/* Settings modal */}
      {showSettings && (
        <Modal title="Configurer les colonnes" onClose={() => setShowSettings(false)} maxWidth={520}>
          <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginBottom: 16, marginTop: 0 }}>
            Modifiez le nom et la limite WIP de chaque colonne. Sauvegardé localement.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {editColumns.map((c, i) => (
              <div key={c.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                <input
                  value={c.label}
                  onChange={(e) => {
                    const copy = [...editColumns];
                    copy[i] = { ...c, label: e.target.value };
                    setEditColumns(copy);
                  }}
                  style={{ ...inputStyle(), flex: 1 }}
                />
                <input
                  type="number"
                  placeholder="WIP"
                  value={c.wipLimit ?? ''}
                  onChange={(e) => {
                    const copy = [...editColumns];
                    const v = e.target.value === '' ? null : parseInt(e.target.value, 10);
                    copy[i] = { ...c, wipLimit: Number.isFinite(v as number) ? (v as number) : null };
                    setEditColumns(copy);
                  }}
                  style={{ ...inputStyle(), width: 72 }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 20 }}>
            <button onClick={() => { setEditColumns([...DEFAULT_COLUMNS]); }} style={secondaryBtn()}>
              Réinitialiser
            </button>
            <button onClick={saveSettings} style={primaryBtn()}>Enregistrer</button>
          </div>
        </Modal>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// ─── TaskCard ────────────────────────────────────────────────────────

function TaskCard({
  task, colId, onDragStart, onDragEnd, onDelete,
}: {
  task: Task;
  colId: string;
  onDragStart: (e: DragEvent<HTMLDivElement>, taskId: string, colId: string) => void;
  onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
  onDelete: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const p = PRIORITY_COLORS[task.priority];
  const overdue = isOverdue(task.dueDate, task.status);
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id, colId)}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--agency-surface-2)',
        border: `1px solid ${hovered ? 'var(--agency-border-strong)' : 'var(--agency-border)'}`,
        borderRadius: 8,
        padding: 10,
        cursor: 'grab',
        transition: 'all 0.15s',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginBottom: 6 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--agency-ink-1)', lineHeight: 1.4, flex: 1 }}>
          {task.title}
        </div>
        {hovered && (
          <button
            onClick={onDelete}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: 'var(--agency-ink-3)', padding: 2, display: 'flex',
              flexShrink: 0,
            }}
            title="Supprimer"
          >
            <Trash2 size={12} />
          </button>
        )}
      </div>
      {task.description && (
        <div style={{ fontSize: 10, color: 'var(--agency-ink-3)', lineHeight: 1.4, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {task.description}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, flexWrap: 'wrap' }}>
        <span style={{
          fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 4,
          background: p.bg, color: p.text, border: `1px solid ${p.border}`,
          textTransform: 'uppercase', letterSpacing: '0.04em',
        }}>
          {p.label}
        </span>
        {task.dueDate && (
          <span style={{
            fontSize: 10, color: overdue ? 'var(--agency-danger)' : 'var(--agency-ink-3)',
            fontWeight: overdue ? 600 : 500,
          }}>
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>
      <div style={{ marginTop: 6, fontSize: 10, color: 'var(--agency-ink-4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {task.project.name}
      </div>
    </div>
  );
}

// ─── UI helpers ──────────────────────────────────────────────────────

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
    borderRadius: 12, padding: 22,
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
function iconBtn(): React.CSSProperties {
  return {
    width: 32, height: 32, borderRadius: 8,
    border: '1px solid var(--agency-border)',
    background: 'transparent',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: 'var(--agency-ink-3)',
  };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
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
  title, onClose, children, maxWidth = 440,
}: { title: string; onClose: () => void; children: React.ReactNode; maxWidth?: number }) {
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
        borderRadius: 12, padding: 24, width: '100%', maxWidth,
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
