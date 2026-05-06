'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { format, addDays, differenceInDays, isWeekend, isToday, parseISO, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, max as maxDate, min as minDate } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Plus, Diamond, X, Trash2 } from 'lucide-react';
import { useAgencySidebar } from '@/components/admin/SidebarContext';

// ─── Types ───────────────────────────────────────────────────────────

type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
type ZoomLevel = 'day' | 'week' | 'month';

interface Project {
  id: string;
  name: string;
  status: string;
  startDate?: string | null;
  endDate?: string | null;
  contact?: { id: string; name: string } | null;
}

interface Task {
  id: string;
  title: string;
  description?: string | null;
  startDate: string | null;
  dueDate: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
}

interface Milestone {
  id: string;
  projectId: string;
  name: string;
  date: string;
  color: string | null;
}

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  low: '#94a3b8',
  medium: '#3B82F6',
  high: '#f97316',
  urgent: '#ef4444',
};

const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: 'À faire',
  IN_PROGRESS: 'En cours',
  DONE: 'Terminé',
};

const ROW_HEIGHT = 36;
const TASK_LIST_WIDTH = 260;
const HEADER_HEIGHT = 56;

// ─── Helpers ─────────────────────────────────────────────────────────

function safeParse(d: string | null | undefined): Date | null {
  if (!d) return null;
  try {
    const parsed = parseISO(d);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  } catch { return null; }
}

function dayWidth(zoom: ZoomLevel): number {
  if (zoom === 'day') return 36;
  if (zoom === 'week') return 16;
  return 6;
}

// ─── Page ────────────────────────────────────────────────────────────

export default function GanttPage() {
  const { isMobile } = useAgencySidebar();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState<ZoomLevel>('week');

  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneForm, setMilestoneForm] = useState({ name: '', date: '', color: '#ef4444' });

  // Initial — fetch projects
  useEffect(() => {
    fetch('/api/admin/projects')
      .then((r) => r.ok ? r.json() : [])
      .then((data) => {
        const list: Project[] = Array.isArray(data) ? data : [];
        setProjects(list);
        if (list.length && !selectedProjectId) setSelectedProjectId(list[0].id);
      })
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [selectedProjectId]);

  // Fetch tasks + milestones for selected project
  const refresh = useCallback(async () => {
    if (!selectedProjectId) {
      setTasks([]);
      setMilestones([]);
      return;
    }
    const [tasksRes, milestonesRes] = await Promise.all([
      fetch(`/api/admin/kanban/tasks?projectId=${selectedProjectId}`),
      fetch(`/api/admin/milestones?projectId=${selectedProjectId}`),
    ]);
    setTasks(tasksRes.ok ? await tasksRes.json() : []);
    setMilestones(milestonesRes.ok ? await milestonesRes.json() : []);
  }, [selectedProjectId]);

  useEffect(() => { refresh(); }, [refresh]);

  // Compute date range from tasks + milestones
  const range = useMemo(() => {
    const dates: Date[] = [];
    tasks.forEach((t) => {
      const s = safeParse(t.startDate);
      const e = safeParse(t.dueDate);
      if (s) dates.push(s);
      if (e) dates.push(e);
    });
    milestones.forEach((m) => {
      const d = safeParse(m.date);
      if (d) dates.push(d);
    });

    let start: Date;
    let end: Date;
    if (dates.length === 0) {
      start = startOfMonth(new Date());
      end = endOfMonth(addMonths(start, 1));
    } else {
      start = startOfMonth(minDate(dates));
      end = endOfMonth(maxDate(dates));
    }
    // Ensure at least 30 days span
    if (differenceInDays(end, start) < 30) {
      end = addDays(start, 30);
    }
    const days = eachDayOfInterval({ start, end });
    return { start, end, days };
  }, [tasks, milestones]);

  const dW = dayWidth(zoom);
  const totalWidth = range.days.length * dW;

  // Bar position for a task
  const getBar = (task: Task): { left: number; width: number } | null => {
    const start = safeParse(task.startDate) || safeParse(task.dueDate);
    const end = safeParse(task.dueDate) || start;
    if (!start || !end) return null;
    const left = differenceInDays(start, range.start) * dW;
    const widthDays = Math.max(differenceInDays(end, start) + 1, 1);
    return { left, width: widthDays * dW };
  };

  const getMilestoneLeft = (m: Milestone): number | null => {
    const d = safeParse(m.date);
    if (!d) return null;
    return differenceInDays(d, range.start) * dW + dW / 2;
  };

  const handleAddMilestone = async () => {
    if (!selectedProjectId || !milestoneForm.name.trim() || !milestoneForm.date) return;
    try {
      const res = await fetch('/api/admin/milestones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: selectedProjectId,
          name: milestoneForm.name.trim(),
          date: milestoneForm.date,
          color: milestoneForm.color,
        }),
      });
      if (!res.ok) throw new Error();
      setMilestoneForm({ name: '', date: '', color: '#ef4444' });
      setShowMilestone(false);
      refresh();
    } catch {
      alert('Erreur création milestone');
    }
  };

  const handleDeleteMilestone = async (id: string) => {
    if (!confirm('Supprimer ce milestone ?')) return;
    await fetch(`/api/admin/milestones?id=${id}`, { method: 'DELETE' });
    refresh();
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  // ─── Render ────────────────────────────────────────────────────────

  return (
    <div>
      {/* Header */}
      <header style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, letterSpacing: '-0.02em' }}>
              Gantt
            </h1>
            <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginTop: 4 }}>
              {selectedProject ? `${selectedProject.name} — ${tasks.length} tâche${tasks.length > 1 ? 's' : ''} · ${milestones.length} milestone${milestones.length > 1 ? 's' : ''}` : 'Aucun projet sélectionné'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              style={{ ...inputStyle(), cursor: 'pointer', maxWidth: 240 }}
            >
              {projects.length === 0 && <option value="">Aucun projet</option>}
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>

            <div style={{ display: 'inline-flex', borderRadius: 8, border: '1px solid var(--agency-border)', overflow: 'hidden' }}>
              {(['day', 'week', 'month'] as ZoomLevel[]).map((z) => (
                <button
                  key={z}
                  onClick={() => setZoom(z)}
                  style={{
                    padding: '7px 14px', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                    background: zoom === z ? 'var(--agency-accent-soft)' : 'transparent',
                    color: zoom === z ? 'var(--agency-accent)' : 'var(--agency-ink-3)',
                  }}
                >
                  {z === 'day' ? 'Jour' : z === 'week' ? 'Semaine' : 'Mois'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowMilestone(true)}
              disabled={!selectedProjectId}
              style={{ ...primaryBtn(), opacity: selectedProjectId ? 1 : 0.5 }}
            >
              <Diamond size={13} />
              Milestone
            </button>
          </div>
        </div>
      </header>

      {/* Empty state */}
      {!loading && projects.length === 0 && (
        <div style={{ ...cardStyle(), padding: 60, textAlign: 'center' }}>
          <p style={{ color: 'var(--agency-ink-2)', fontSize: 14, margin: 0, marginBottom: 8, fontWeight: 500 }}>
            Aucun projet
          </p>
          <p style={{ color: 'var(--agency-ink-3)', fontSize: 13, margin: 0 }}>
            Créez un projet (via Brief ou Projets) pour visualiser son Gantt.
          </p>
        </div>
      )}

      {!loading && projects.length > 0 && tasks.length === 0 && milestones.length === 0 && (
        <div style={{ ...cardStyle(), padding: 60, textAlign: 'center' }}>
          <p style={{ color: 'var(--agency-ink-2)', fontSize: 14, margin: 0, marginBottom: 8, fontWeight: 500 }}>
            Aucune tâche datée pour ce projet
          </p>
          <p style={{ color: 'var(--agency-ink-3)', fontSize: 13, margin: 0 }}>
            Ajoutez des tâches avec une date de début/échéance pour les voir apparaître sur le Gantt,<br />
            ou créez un milestone pour marquer une étape clé.
          </p>
        </div>
      )}

      {/* Gantt board */}
      {!loading && tasks.length + milestones.length > 0 && (
        <div style={{ ...cardStyle(), padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'flex', overflowX: 'auto' }}>
            {/* Task list (sticky left) */}
            <div style={{
              width: TASK_LIST_WIDTH, flexShrink: 0,
              borderRight: '1px solid var(--agency-border)',
              background: 'var(--agency-surface-1)',
              position: 'sticky', left: 0, zIndex: 5,
            }}>
              {/* Header */}
              <div style={{
                height: HEADER_HEIGHT, padding: '10px 16px',
                borderBottom: '1px solid var(--agency-border)',
                display: 'flex', alignItems: 'center',
                fontSize: 11, fontWeight: 600, color: 'var(--agency-ink-3)',
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                Tâches
              </div>
              {tasks.map((t) => (
                <div key={t.id} style={{
                  height: ROW_HEIGHT, padding: '0 16px',
                  display: 'flex', alignItems: 'center', gap: 8,
                  borderBottom: '1px solid var(--agency-border-soft)',
                  fontSize: 12, color: 'var(--agency-ink-1)',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: PRIORITY_COLORS[t.priority], flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={t.title}>
                    {t.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative', minWidth: totalWidth }}>
              {/* Date header */}
              <DateHeader days={range.days} dayWidth={dW} zoom={zoom} />

              {/* Task bars */}
              {tasks.map((t, i) => {
                const bar = getBar(t);
                const isDone = t.status === 'DONE';
                return (
                  <div
                    key={t.id}
                    style={{
                      height: ROW_HEIGHT, position: 'relative',
                      borderBottom: '1px solid var(--agency-border-soft)',
                      background: i % 2 === 0 ? 'transparent' : 'var(--agency-surface-2)',
                    }}
                  >
                    {/* Today line */}
                    <TodayLine rangeStart={range.start} dayWidth={dW} />

                    {/* Weekend stripes */}
                    <WeekendStripes days={range.days} dayWidth={dW} />

                    {bar && (
                      <div
                        title={`${t.title} (${STATUS_LABELS[t.status]})`}
                        style={{
                          position: 'absolute',
                          left: bar.left,
                          top: 8,
                          width: bar.width - 2,
                          height: ROW_HEIGHT - 16,
                          background: isDone ? 'rgba(34,197,94,0.6)' : `${PRIORITY_COLORS[t.priority]}cc`,
                          border: `1px solid ${isDone ? '#22c55e' : PRIORITY_COLORS[t.priority]}`,
                          borderRadius: 4,
                          display: 'flex', alignItems: 'center', padding: '0 6px',
                          fontSize: 10, color: 'white', fontWeight: 500,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          cursor: 'pointer',
                          transition: 'transform 0.15s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                      >
                        {bar.width > 50 && t.title}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Milestones row */}
              {milestones.length > 0 && (
                <div
                  style={{
                    height: ROW_HEIGHT, position: 'relative',
                    borderTop: '2px dashed var(--agency-border)',
                    borderBottom: '1px solid var(--agency-border-soft)',
                    background: 'var(--agency-surface-2)',
                  }}
                >
                  <TodayLine rangeStart={range.start} dayWidth={dW} />
                  <WeekendStripes days={range.days} dayWidth={dW} />
                  {milestones.map((m) => {
                    const left = getMilestoneLeft(m);
                    if (left === null) return null;
                    return (
                      <div
                        key={m.id}
                        title={`${m.name} — ${format(parseISO(m.date), 'd MMM yyyy', { locale: fr })}`}
                        onClick={() => handleDeleteMilestone(m.id)}
                        style={{
                          position: 'absolute',
                          left: left - 8,
                          top: ROW_HEIGHT / 2 - 8,
                          width: 16, height: 16,
                          background: m.color || '#ef4444',
                          transform: 'rotate(45deg)',
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Milestone modal */}
      {showMilestone && (
        <Modal title="Nouveau milestone" onClose={() => setShowMilestone(false)}>
          <Field label="Nom">
            <input
              type="text"
              value={milestoneForm.name}
              onChange={(e) => setMilestoneForm({ ...milestoneForm, name: e.target.value })}
              placeholder="Ex: Lancement v1, Review client…"
              style={inputStyle()}
            />
          </Field>
          <Field label="Date">
            <input
              type="date"
              value={milestoneForm.date}
              onChange={(e) => setMilestoneForm({ ...milestoneForm, date: e.target.value })}
              style={{ ...inputStyle(), colorScheme: 'dark' }}
            />
          </Field>
          <Field label="Couleur">
            <div style={{ display: 'flex', gap: 8 }}>
              {['#ef4444', '#f59e0b', '#22c55e', '#3B82F6', '#a78bfa', '#ec4899'].map((c) => (
                <button
                  key={c}
                  onClick={() => setMilestoneForm({ ...milestoneForm, color: c })}
                  style={{
                    width: 28, height: 28, borderRadius: '50%', cursor: 'pointer',
                    background: c,
                    border: milestoneForm.color === c ? '2px solid var(--agency-ink-1)' : '2px solid transparent',
                    transform: 'rotate(45deg)',
                  }}
                />
              ))}
            </div>
          </Field>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
            <button onClick={() => setShowMilestone(false)} style={secondaryBtn()}>Annuler</button>
            <button
              onClick={handleAddMilestone}
              disabled={!milestoneForm.name.trim() || !milestoneForm.date}
              style={{ ...primaryBtn(), opacity: !milestoneForm.name.trim() || !milestoneForm.date ? 0.5 : 1 }}
            >
              <Plus size={13} />
              Créer
            </button>
          </div>
        </Modal>
      )}

      {/* Hint */}
      {milestones.length > 0 && (
        <p style={{ fontSize: 11, color: 'var(--agency-ink-4)', marginTop: 12, textAlign: 'center' }}>
          Astuce : clique sur un diamant pour le supprimer.
        </p>
      )}
    </div>
  );
}

// ─── Date header ─────────────────────────────────────────────────────

function DateHeader({ days, dayWidth, zoom }: { days: Date[]; dayWidth: number; zoom: ZoomLevel }) {
  // Group days for label rendering
  const labelEvery = zoom === 'day' ? 1 : zoom === 'week' ? 7 : 14;

  return (
    <div
      style={{
        height: HEADER_HEIGHT,
        display: 'flex', alignItems: 'stretch',
        borderBottom: '1px solid var(--agency-border)',
        position: 'sticky', top: 0, background: 'var(--agency-surface-1)',
        zIndex: 4,
      }}
    >
      {days.map((d, i) => {
        const showLabel = i === 0 || i % labelEvery === 0 || isToday(d);
        return (
          <div
            key={i}
            style={{
              width: dayWidth, flexShrink: 0,
              borderRight: i % labelEvery === 0 ? '1px solid var(--agency-border-soft)' : 'none',
              background: isWeekend(d) ? 'rgba(255,255,255,0.02)' : 'transparent',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: '4px 0', textAlign: 'center',
              fontSize: 9, color: isToday(d) ? 'var(--agency-accent)' : 'var(--agency-ink-3)',
              fontWeight: isToday(d) ? 700 : 500,
            }}
          >
            {showLabel && (
              <>
                <span style={{ fontSize: 9, opacity: 0.6 }}>{format(d, 'MMM', { locale: fr })}</span>
                <span style={{ fontSize: 11 }}>{format(d, 'd')}</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Today line ──────────────────────────────────────────────────────

function TodayLine({ rangeStart, dayWidth }: { rangeStart: Date; dayWidth: number }) {
  const offset = differenceInDays(new Date(), rangeStart) * dayWidth;
  if (offset < 0) return null;
  return (
    <div
      style={{
        position: 'absolute', top: 0, bottom: 0,
        left: offset,
        width: 1,
        background: 'var(--agency-accent)',
        boxShadow: '0 0 4px var(--agency-accent-glow)',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}

// ─── Weekend stripes ─────────────────────────────────────────────────

function WeekendStripes({ days, dayWidth }: { days: Date[]; dayWidth: number }) {
  return (
    <>
      {days.map((d, i) =>
        isWeekend(d) ? (
          <div
            key={i}
            style={{
              position: 'absolute', top: 0, bottom: 0,
              left: i * dayWidth,
              width: dayWidth,
              background: 'rgba(255,255,255,0.02)',
              pointerEvents: 'none',
            }}
          />
        ) : null,
      )}
    </>
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
