'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSidebar } from '@/components/portal/SidebarContext';
import { Plus, X, FolderKanban, CheckCircle2, Clock, Pause, Ban, User, Calendar, ChevronRight, Trash2, Check } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { ProjectData, ProjectTaskData } from '@/types/portal';

interface ContactOption {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
}

type ProjectStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  IN_PROGRESS: { label: 'En cours', color: 'var(--accent)', bg: 'var(--accent-light)', icon: <Clock size={12} /> },
  COMPLETED: { label: 'Termine', color: 'var(--success)', bg: 'var(--success-light, rgba(34,197,94,0.1))', icon: <CheckCircle2 size={12} /> },
  ON_HOLD: { label: 'En pause', color: 'var(--warning, #f59e0b)', bg: 'var(--warning-light, rgba(245,158,11,0.1))', icon: <Pause size={12} /> },
  CANCELLED: { label: 'Annule', color: 'var(--danger)', bg: 'var(--danger-light, rgba(239,68,68,0.1))', icon: <Ban size={12} /> },
};

const FILTER_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Tous' },
  { value: 'IN_PROGRESS', label: 'En cours' },
  { value: 'COMPLETED', label: 'Termines' },
  { value: 'ON_HOLD', label: 'En pause' },
  { value: 'CANCELLED', label: 'Annules' },
];

export default function ProjetsPage() {
  const { isMobile, userRole } = useSidebar();
  const isClient = userRole === 'CLIENT';

  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [contacts, setContacts] = useState<ContactOption[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', contactId: '', dueDate: '' });
  const [saving, setSaving] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [addingTask, setAddingTask] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(() => {
    const url = statusFilter ? `/api/portal/projects?status=${statusFilter}` : '/api/portal/projects';
    fetch(url)
      .then((r) => r.json())
      .then((data) => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [statusFilter]);

  const fetchProjectDetail = useCallback((id: string) => {
    fetch(`/api/portal/projects/${id}`)
      .then((r) => r.json())
      .then(setSelectedProject)
      .catch(() => {});
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);
  useEffect(() => { fetch('/api/portal/contacts').then((r) => r.json()).then(setContacts).catch(() => {}); }, []);

  const handleCreate = async () => {
    if (!form.name) return;
    setSaving(true);
    const res = await fetch('/api/portal/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        description: form.description || undefined,
        contactId: form.contactId || undefined,
        dueDate: form.dueDate || undefined,
      }),
    });
    if (res.ok) {
      setShowCreate(false);
      setForm({ name: '', description: '', contactId: '', dueDate: '' });
      fetchProjects();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce projet et toutes ses taches ?')) return;
    await fetch(`/api/portal/projects/${id}`, { method: 'DELETE' });
    if (selectedProject?.id === id) setSelectedProject(null);
    fetchProjects();
  };

  const handleStatusChange = async (id: string, status: ProjectStatus) => {
    await fetch(`/api/portal/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchProjects();
    if (selectedProject?.id === id) fetchProjectDetail(id);
  };

  const handleAddTask = async () => {
    if (!selectedProject || !newTaskTitle) return;
    setAddingTask(true);
    const res = await fetch(`/api/portal/projects/${selectedProject.id}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTaskTitle }),
    });
    if (res.ok) {
      setNewTaskTitle('');
      fetchProjectDetail(selectedProject.id);
      fetchProjects();
    }
    setAddingTask(false);
  };

  const handleToggleTask = async (task: ProjectTaskData) => {
    if (!selectedProject) return;
    const newStatus: TaskStatus = task.status === 'DONE' ? 'TODO' : 'DONE';
    await fetch(`/api/portal/projects/${selectedProject.id}/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchProjectDetail(selectedProject.id);
    fetchProjects();
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!selectedProject) return;
    await fetch(`/api/portal/projects/${selectedProject.id}/tasks/${taskId}`, { method: 'DELETE' });
    fetchProjectDetail(selectedProject.id);
    fetchProjects();
  };

  // Stats
  const totalProjects = projects.length;
  const inProgressCount = projects.filter((p) => p.status === 'IN_PROGRESS').length;
  const completedCount = projects.filter((p) => p.status === 'COMPLETED').length;

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', borderRadius: '8px',
    background: 'var(--bg-input)', border: '1px solid var(--border-input)',
    color: 'var(--text-primary)', fontSize: '13px', outline: 'none',
  };

  const getContactName = (contact: { firstName: string | null; lastName: string | null; email: string } | null | undefined) => {
    if (!contact) return null;
    const name = [contact.firstName, contact.lastName].filter(Boolean).join(' ');
    return name || contact.email;
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Projets</h1>
        {!isClient && (
          <button onClick={() => setShowCreate(true)} style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
            background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
          }}>
            <Plus size={16} /> Nouveau projet
          </button>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {[
          { label: 'Total', value: totalProjects, icon: <FolderKanban size={16} />, color: 'var(--accent)' },
          { label: 'En cours', value: inProgressCount, icon: <Clock size={16} />, color: 'var(--accent)' },
          { label: 'Termines', value: completedCount, icon: <CheckCircle2 size={16} />, color: 'var(--success)' },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-card)', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `color-mix(in srgb, ${stat.color} 10%, transparent)`, color: stat.color,
            }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Status filter */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStatusFilter(opt.value)}
            style={{
              padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
              border: '1px solid var(--border)',
              background: statusFilter === opt.value ? 'var(--accent)' : 'var(--bg-card)',
              color: statusFilter === opt.value ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.15s',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedProject && !isMobile ? '1fr 380px' : '1fr', gap: '20px' }}>
        {/* Projects grid */}
        <div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)', fontSize: '13px' }}>Chargement...</div>
          ) : projects.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)',
              borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)',
            }}>
              <FolderKanban size={40} style={{ color: 'var(--text-tertiary)', marginBottom: '12px' }} />
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Aucun projet</p>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                {statusFilter ? 'Aucun projet avec ce statut' : 'Creez votre premier projet'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : selectedProject ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: '12px' }}>
              {projects.map((project) => {
                const statusConf = STATUS_CONFIG[project.status];
                const tasksTotal = project._count?.tasks ?? 0;
                const tasksDone = project._tasksDone ?? 0;
                const progressPct = tasksTotal > 0 ? Math.round((tasksDone / tasksTotal) * 100) : 0;
                const isSelected = selectedProject?.id === project.id;

                return (
                  <div
                    key={project.id}
                    onClick={() => fetchProjectDetail(project.id)}
                    style={{
                      background: isSelected ? 'var(--accent-light)' : 'var(--bg-card)',
                      borderRadius: '12px',
                      border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                      boxShadow: 'var(--shadow-card)',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {/* Title + Status */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px', gap: '8px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, flex: 1 }}>{project.name}</h3>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 500,
                        color: statusConf.color, background: statusConf.bg, whiteSpace: 'nowrap',
                      }}>
                        {statusConf.icon} {statusConf.label}
                      </span>
                    </div>

                    {/* Description */}
                    {project.description && (
                      <p style={{
                        fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 10px 0',
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>
                        {project.description}
                      </p>
                    )}

                    {/* Meta row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                      {project.contact && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          <User size={11} /> {getContactName(project.contact)}
                        </div>
                      )}
                      {project.dueDate && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          <Calendar size={11} /> {format(new Date(project.dueDate), 'd MMM yyyy', { locale: fr })}
                        </div>
                      )}
                    </div>

                    {/* Task progress */}
                    {tasksTotal > 0 && (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Taches</span>
                          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>{tasksDone}/{tasksTotal}</span>
                        </div>
                        <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: 'var(--bg-secondary)' }}>
                          <div style={{
                            width: `${progressPct}%`, height: '100%', borderRadius: '2px',
                            background: progressPct === 100 ? 'var(--success)' : 'var(--accent)',
                            transition: 'width 0.3s',
                          }} />
                        </div>
                      </div>
                    )}

                    {/* Arrow */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                      <ChevronRight size={14} style={{ color: 'var(--text-tertiary)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Detail panel (desktop) */}
        {selectedProject && !isMobile && (
          <div style={{
            background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-card)', padding: '16px', alignSelf: 'start', position: 'sticky', top: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{selectedProject.name}</h3>
              <button onClick={() => setSelectedProject(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
                <X size={14} />
              </button>
            </div>

            {selectedProject.description && (
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>{selectedProject.description}</p>
            )}

            {/* Status selector */}
            {!isClient && (
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Statut</label>
                <select
                  value={selectedProject.status}
                  onChange={(e) => handleStatusChange(selectedProject.id, e.target.value as ProjectStatus)}
                  style={inputStyle}
                >
                  {Object.entries(STATUS_CONFIG).map(([key, conf]) => (
                    <option key={key} value={key}>{conf.label}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Meta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              {selectedProject.contact && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <User size={12} /> {getContactName(selectedProject.contact)}
                </div>
              )}
              {selectedProject.dueDate && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <Calendar size={12} /> Echeance : {format(new Date(selectedProject.dueDate), 'd MMMM yyyy', { locale: fr })}
                </div>
              )}
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                Cree le {format(new Date(selectedProject.createdAt), 'd MMM yyyy', { locale: fr })}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--border)', marginBottom: '16px' }} />

            {/* Tasks */}
            <div style={{ marginBottom: '12px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '10px' }}>
                Taches ({selectedProject.tasks?.filter((t) => t.status === 'DONE').length ?? 0}/{selectedProject.tasks?.length ?? 0})
              </h4>

              {selectedProject.tasks && selectedProject.tasks.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {selectedProject.tasks.map((task) => (
                    <div key={task.id} style={{
                      display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '6px',
                      background: 'var(--bg-hover)', border: '1px solid var(--border)',
                    }}>
                      {!isClient ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleToggleTask(task); }}
                          style={{
                            width: '18px', height: '18px', borderRadius: '4px', border: `1.5px solid ${task.status === 'DONE' ? 'var(--success)' : 'var(--border-input)'}`,
                            background: task.status === 'DONE' ? 'var(--success)' : 'transparent',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}
                        >
                          {task.status === 'DONE' && <Check size={12} style={{ color: 'white' }} />}
                        </button>
                      ) : (
                        <div style={{
                          width: '18px', height: '18px', borderRadius: '4px', border: `1.5px solid ${task.status === 'DONE' ? 'var(--success)' : 'var(--border-input)'}`,
                          background: task.status === 'DONE' ? 'var(--success)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          {task.status === 'DONE' && <Check size={12} style={{ color: 'white' }} />}
                        </div>
                      )}
                      <span style={{
                        fontSize: '12px', color: task.status === 'DONE' ? 'var(--text-tertiary)' : 'var(--text-primary)',
                        textDecoration: task.status === 'DONE' ? 'line-through' : 'none', flex: 1,
                      }}>
                        {task.title}
                      </span>
                      {!isClient && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: '2px', flexShrink: 0 }}
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Aucune tache</p>
              )}
            </div>

            {/* Add task */}
            {!isClient && (
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  placeholder="Nouvelle tache..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddTask(); }}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button
                  onClick={handleAddTask}
                  disabled={addingTask || !newTaskTitle}
                  style={{
                    padding: '8px 12px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
                    border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 500,
                    opacity: addingTask || !newTaskTitle ? 0.5 : 1, flexShrink: 0,
                  }}
                >
                  <Plus size={14} />
                </button>
              </div>
            )}

            {/* Delete project */}
            {!isClient && (
              <>
                <div style={{ height: '1px', background: 'var(--border)', margin: '16px 0' }} />
                <button
                  onClick={() => handleDelete(selectedProject.id)}
                  style={{
                    width: '100%', padding: '8px', borderRadius: '8px', fontSize: '12px',
                    background: 'var(--bg-secondary)', color: 'var(--danger)', border: 'none', cursor: 'pointer', fontWeight: 500,
                  }}
                >
                  Supprimer le projet
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Detail modal (mobile) */}
      {selectedProject && isMobile && (
        <>
          <div onClick={() => setSelectedProject(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--overlay)', zIndex: 2000 }} />
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            maxHeight: '85vh', overflowY: 'auto',
            background: 'var(--bg-card)', borderRadius: '16px 16px 0 0',
            border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)',
            padding: '20px', zIndex: 2001,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{selectedProject.name}</h3>
              <button onClick={() => setSelectedProject(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
                <X size={16} />
              </button>
            </div>

            {selectedProject.description && (
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>{selectedProject.description}</p>
            )}

            {!isClient && (
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Statut</label>
                <select
                  value={selectedProject.status}
                  onChange={(e) => handleStatusChange(selectedProject.id, e.target.value as ProjectStatus)}
                  style={inputStyle}
                >
                  {Object.entries(STATUS_CONFIG).map(([key, conf]) => (
                    <option key={key} value={key}>{conf.label}</option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              {selectedProject.contact && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <User size={12} /> {getContactName(selectedProject.contact)}
                </div>
              )}
              {selectedProject.dueDate && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <Calendar size={12} /> Echeance : {format(new Date(selectedProject.dueDate), 'd MMMM yyyy', { locale: fr })}
                </div>
              )}
            </div>

            <div style={{ height: '1px', background: 'var(--border)', marginBottom: '16px' }} />

            <h4 style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '10px' }}>
              Taches ({selectedProject.tasks?.filter((t) => t.status === 'DONE').length ?? 0}/{selectedProject.tasks?.length ?? 0})
            </h4>

            {selectedProject.tasks && selectedProject.tasks.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
                {selectedProject.tasks.map((task) => (
                  <div key={task.id} style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: '6px',
                    background: 'var(--bg-hover)', border: '1px solid var(--border)',
                  }}>
                    {!isClient ? (
                      <button
                        onClick={() => handleToggleTask(task)}
                        style={{
                          width: '20px', height: '20px', borderRadius: '4px', border: `1.5px solid ${task.status === 'DONE' ? 'var(--success)' : 'var(--border-input)'}`,
                          background: task.status === 'DONE' ? 'var(--success)' : 'transparent',
                          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}
                      >
                        {task.status === 'DONE' && <Check size={12} style={{ color: 'white' }} />}
                      </button>
                    ) : (
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '4px', border: `1.5px solid ${task.status === 'DONE' ? 'var(--success)' : 'var(--border-input)'}`,
                        background: task.status === 'DONE' ? 'var(--success)' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {task.status === 'DONE' && <Check size={12} style={{ color: 'white' }} />}
                      </div>
                    )}
                    <span style={{
                      fontSize: '13px', color: task.status === 'DONE' ? 'var(--text-tertiary)' : 'var(--text-primary)',
                      textDecoration: task.status === 'DONE' ? 'line-through' : 'none', flex: 1,
                    }}>
                      {task.title}
                    </span>
                    {!isClient && (
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: '2px' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '12px' }}>Aucune tache</p>
            )}

            {!isClient && (
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                <input
                  placeholder="Nouvelle tache..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddTask(); }}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button
                  onClick={handleAddTask}
                  disabled={addingTask || !newTaskTitle}
                  style={{
                    padding: '8px 14px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
                    border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 500,
                    opacity: addingTask || !newTaskTitle ? 0.5 : 1,
                  }}
                >
                  <Plus size={14} />
                </button>
              </div>
            )}

            {!isClient && (
              <button
                onClick={() => handleDelete(selectedProject.id)}
                style={{
                  width: '100%', padding: '10px', borderRadius: '8px', fontSize: '13px',
                  background: 'var(--bg-secondary)', color: 'var(--danger)', border: 'none', cursor: 'pointer', fontWeight: 500,
                }}
              >
                Supprimer le projet
              </button>
            )}
          </div>
        </>
      )}

      {/* Create modal */}
      {showCreate && (
        <>
          <div onClick={() => setShowCreate(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--overlay)', zIndex: 2000 }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '440px', maxWidth: '95vw', background: 'var(--bg-card)',
            borderRadius: '12px', border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-card)',
            padding: '24px', zIndex: 2001,
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>Nouveau projet</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input placeholder="Nom du projet *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
              <textarea placeholder="Description (optionnel)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
              <select value={form.contactId} onChange={(e) => setForm({ ...form, contactId: e.target.value })} style={inputStyle}>
                <option value="">-- Contact (optionnel) --</option>
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>{c.firstName || ''} {c.lastName || ''} ({c.email})</option>
                ))}
              </select>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '3px', display: 'block', fontWeight: 500 }}>Echeance (optionnel)</label>
                <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button onClick={handleCreate} disabled={saving || !form.name} style={{
                  padding: '8px 20px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
                  border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px', opacity: saving || !form.name ? 0.5 : 1,
                }}>
                  {saving ? 'Creation...' : 'Creer'}
                </button>
                <button onClick={() => setShowCreate(false)} style={{
                  padding: '8px 20px', borderRadius: '8px', background: 'var(--bg-secondary)',
                  color: 'var(--text-secondary)', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
                }}>Annuler</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
