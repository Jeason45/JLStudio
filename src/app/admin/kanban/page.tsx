'use client';

import { useState, useEffect, useCallback, useRef, DragEvent } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import Link from 'next/link';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Task {
  id: string;
  title: string;
  description?: string | null;
  priority: string;
  status: string;
  kanbanColumn?: string | null;
  order: number;
  estimatedHours?: number | null;
  actualHours?: number | null;
  dueDate?: string | null;
  startDate?: string | null;
  tags?: string | null;
  blockedReason?: string | null;
  isCriticalPath?: boolean;
  project: {
    id: string;
    name: string;
    status?: string;
    contact?: {
      id: string;
      name: string;
      email?: string;
    } | null;
  };
}

interface TimeData {
  totalMinutes: number;
  totalHours: number;
  runningEntry: { id: string; startedAt: string } | null;
}

interface Column {
  id: string;
  label: string;
  color: string;
  wipLimit: number | null;
  mappedStatus: string;
}

interface Project {
  id: string;
  name: string;
}

// ─── Default Columns ─────────────────────────────────────────────────────────

const DEFAULT_COLUMNS: Column[] = [
  { id: 'backlog', label: 'Backlog', color: '#94a3b8', wipLimit: null, mappedStatus: 'todo' },
  { id: 'todo', label: 'A faire', color: '#6366f1', wipLimit: 5, mappedStatus: 'todo' },
  { id: 'in_progress', label: 'En cours', color: '#f59e0b', wipLimit: 3, mappedStatus: 'in_progress' },
  { id: 'review', label: 'Revue', color: '#8b5cf6', wipLimit: 2, mappedStatus: 'in_progress' },
  { id: 'done', label: 'Termine', color: '#10b981', wipLimit: null, mappedStatus: 'completed' },
];

const STORAGE_KEY = 'jlstudio_kanban_columns';

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
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  } catch { /* ignore */ }
}

// ─── Priority helpers ────────────────────────────────────────────────────────

function priorityColor(p: string): string {
  switch (p) {
    case 'urgent': return '#ef4444';
    case 'high': return '#f97316';
    case 'medium': return '#638BFF';
    case 'low': return '#94a3b8';
    default: return '#94a3b8';
  }
}

function priorityLabel(p: string): string {
  switch (p) {
    case 'urgent': return 'Urgent';
    case 'high': return 'Haute';
    case 'medium': return 'Moyenne';
    case 'low': return 'Basse';
    default: return p;
  }
}

function priorityBg(p: string): string {
  switch (p) {
    case 'urgent': return 'rgba(239, 68, 68, 0.15)';
    case 'high': return 'rgba(249, 115, 22, 0.15)';
    case 'medium': return 'rgba(99, 139, 255, 0.15)';
    case 'low': return 'rgba(148, 163, 184, 0.15)';
    default: return 'rgba(148, 163, 184, 0.15)';
  }
}

function priorityBorder(p: string): string {
  switch (p) {
    case 'urgent': return 'rgba(239, 68, 68, 0.4)';
    case 'high': return 'rgba(249, 115, 22, 0.4)';
    case 'medium': return 'rgba(99, 139, 255, 0.4)';
    case 'low': return 'rgba(148, 163, 184, 0.4)';
    default: return 'rgba(148, 163, 184, 0.4)';
  }
}

// ─── Date helper ─────────────────────────────────────────────────────────────

function formatDate(d: string | null | undefined): string {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function isOverdue(d: string | null | undefined, status: string): boolean {
  if (!d || status === 'completed') return false;
  return new Date(d) < new Date();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function KanbanPage() {
  const { sidebarWidth, isMobile } = useSidebar();

  // ─── State ───────────────────────────────────────────────────────────────
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [columns, setColumns] = useState<Column[]>(DEFAULT_COLUMNS);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters
  const [selectedProjectId, setSelectedProjectId] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Task detail / edit
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});

  // Create modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTask, setNewTask] = useState({ projectId: '', title: '', priority: 'medium', description: '' });
  const [creating, setCreating] = useState(false);

  // Settings modal
  const [showSettings, setShowSettings] = useState(false);
  const [editColumns, setEditColumns] = useState<Column[]>([]);

  // Drag & drop
  const dragTaskId = useRef<string | null>(null);
  const dragSourceCol = useRef<string | null>(null);

  // Time tracking
  const [timeDataMap, setTimeDataMap] = useState<Record<string, TimeData>>({});
  const [elapsedMap, setElapsedMap] = useState<Record<string, number>>({});
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ─── Read URL params to pre-select project ──────────────────────────────
  const [fromProject, setFromProject] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectParam = params.get('project');
    if (projectParam) {
      setFromProject(projectParam);
      setSelectedProjectId(projectParam);
    }
  }, []);

  // ─── Load columns from localStorage ──────────────────────────────────────
  useEffect(() => {
    setColumns(loadColumns());
  }, []);

  // ─── Fetch tasks ─────────────────────────────────────────────────────────
  const fetchTasks = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (selectedProjectId !== 'all') params.append('projectId', selectedProjectId);
      if (selectedPriority !== 'all') params.append('priority', selectedPriority);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const response = await fetch(`/api/kanban/tasks?${params.toString()}`);
      const data = await response.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    }
  }, [selectedProjectId, selectedPriority, searchQuery]);

  // ─── Fetch projects ──────────────────────────────────────────────────────
  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    }
  }, []);

  // ─── Initial load ────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchProjects(), fetchTasks()]);
      setLoading(false);
    };
    load();
  }, [fetchProjects, fetchTasks]);

  // ─── Refresh ─────────────────────────────────────────────────────────────
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  }, [fetchTasks]);

  // ─── Task column assignment ──────────────────────────────────────────────
  // Assign tasks without a kanbanColumn to "backlog"
  const getTaskColumn = (task: Task): string => {
    if (task.kanbanColumn && columns.some(c => c.id === task.kanbanColumn)) {
      return task.kanbanColumn;
    }
    // Map by status
    if (task.status === 'completed') return 'done';
    if (task.status === 'in_progress') return 'in_progress';
    if (task.status === 'blocked') return 'in_progress';
    return 'backlog';
  };

  const getTasksForColumn = (columnId: string): Task[] => {
    return tasks
      .filter(t => getTaskColumn(t) === columnId)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  };

  // ─── Drag & Drop ────────────────────────────────────────────────────────
  const handleDragStart = (e: DragEvent<HTMLDivElement>, taskId: string, colId: string) => {
    dragTaskId.current = taskId;
    dragSourceCol.current = colId;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', taskId);
    // Make the drag image slightly transparent
    if (e.currentTarget) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
    dragTaskId.current = null;
    dragSourceCol.current = null;
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.background = 'rgba(99, 139, 255, 0.08)';
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = '';
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>, targetColumnId: string) => {
    e.preventDefault();
    e.currentTarget.style.background = '';

    const taskId = dragTaskId.current;
    if (!taskId) return;
    if (dragSourceCol.current === targetColumnId) return;

    const column = columns.find(c => c.id === targetColumnId);
    if (!column) return;

    // Optimistic update
    setTasks(prev => prev.map(t =>
      t.id === taskId
        ? { ...t, kanbanColumn: targetColumnId, status: column.mappedStatus }
        : t
    ));

    try {
      const response = await fetch('/api/kanban/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: taskId,
          kanbanColumn: targetColumnId,
          status: column.mappedStatus,
        }),
      });

      if (!response.ok) throw new Error('Failed to move task');
    } catch (error) {
      console.error('Error moving task:', error);
      // Revert on error
      await fetchTasks();
    }
  };

  // ─── Create task ─────────────────────────────────────────────────────────
  const handleCreateTask = async () => {
    if (!newTask.projectId || !newTask.title.trim()) return;
    setCreating(true);

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: newTask.projectId,
          title: newTask.title.trim(),
          priority: newTask.priority,
          description: newTask.description.trim() || null,
          status: 'todo',
          kanbanColumn: 'backlog',
        }),
      });

      if (!response.ok) throw new Error('Failed to create task');

      await fetchTasks();
      setShowCreateModal(false);
      setNewTask({ projectId: '', title: '', priority: 'medium', description: '' });
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Erreur lors de la creation de la tache');
    } finally {
      setCreating(false);
    }
  };

  // ─── Delete task ─────────────────────────────────────────────────────────
  const handleDeleteTask = async () => {
    if (!selectedTask) return;
    if (!confirm(`Supprimer la tache "${selectedTask.title}" ?\n\nCette action est irreversible.`)) return;

    try {
      const response = await fetch(`/api/tasks?id=${selectedTask.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete task');
      setSelectedTask(null);
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Erreur lors de la suppression');
    }
  };

  // ─── Duplicate task ──────────────────────────────────────────────────────
  const handleDuplicateTask = async () => {
    if (!selectedTask) return;

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: selectedTask.project.id,
          title: `${selectedTask.title} (Copie)`,
          description: selectedTask.description,
          priority: selectedTask.priority,
          status: 'todo',
          kanbanColumn: 'backlog',
          dueDate: selectedTask.dueDate,
          estimatedHours: selectedTask.estimatedHours,
          tags: selectedTask.tags,
        }),
      });

      if (!response.ok) throw new Error('Failed to duplicate task');
      await fetchTasks();
      setSelectedTask(null);
    } catch (error) {
      console.error('Error duplicating task:', error);
      alert('Erreur lors de la duplication');
    }
  };

  // ─── Edit task ───────────────────────────────────────────────────────────
  const handleStartEdit = () => {
    if (!selectedTask) return;
    setEditedTask({
      id: selectedTask.id,
      title: selectedTask.title,
      description: selectedTask.description,
      priority: selectedTask.priority,
      dueDate: selectedTask.dueDate,
      estimatedHours: selectedTask.estimatedHours,
      actualHours: selectedTask.actualHours,
      tags: selectedTask.tags,
      blockedReason: selectedTask.blockedReason,
    });
    setIsEditingTask(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedTask || !editedTask.id) return;

    try {
      const response = await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editedTask.id,
          title: editedTask.title,
          description: editedTask.description || null,
          priority: editedTask.priority,
          dueDate: editedTask.dueDate || null,
          estimatedHours: editedTask.estimatedHours,
          actualHours: editedTask.actualHours,
          tags: editedTask.tags || null,
          blockedReason: editedTask.blockedReason || null,
        }),
      });

      if (!response.ok) throw new Error('Failed to update task');

      await fetchTasks();
      setIsEditingTask(false);
      setEditedTask({});
      // Refresh the selected task
      const updated = tasks.find(t => t.id === selectedTask.id);
      if (updated) setSelectedTask(updated);
      else setSelectedTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Erreur lors de la mise a jour');
    }
  };

  const handleCancelEdit = () => {
    setIsEditingTask(false);
    setEditedTask({});
  };

  // Update selectedTask when tasks change
  useEffect(() => {
    if (selectedTask) {
      const found = tasks.find(t => t.id === selectedTask.id);
      if (found) setSelectedTask(found);
    }
  }, [tasks]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Settings ────────────────────────────────────────────────────────────
  const openSettings = () => {
    setEditColumns(JSON.parse(JSON.stringify(columns)));
    setShowSettings(true);
  };

  const saveSettings = () => {
    setColumns(editColumns);
    saveColumns(editColumns);
    setShowSettings(false);
  };

  // ─── Clear filters ──────────────────────────────────────────────────────
  const hasFilters = selectedProjectId !== 'all' || selectedPriority !== 'all' || searchQuery.trim() !== '';

  const handleClearFilters = () => {
    setSelectedProjectId('all');
    setSelectedPriority('all');
    setSearchQuery('');
  };

  // ─── Time Tracking ──────────────────────────────────────────────────────

  const fetchTimeData = useCallback(async (taskId: string) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}/time`);
      if (!res.ok) return;
      const data = await res.json();
      setTimeDataMap(prev => ({ ...prev, [taskId]: data }));
    } catch (err) {
      console.error('Error fetching time data:', err);
    }
  }, []);

  // Fetch time data for all tasks on load
  useEffect(() => {
    if (tasks.length > 0) {
      tasks.forEach(task => fetchTimeData(task.id));
    }
  }, [tasks.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Tick interval for running timers
  useEffect(() => {
    const hasRunning = Object.values(timeDataMap).some(td => td.runningEntry !== null);

    if (hasRunning) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = setInterval(() => {
        const newElapsed: Record<string, number> = {};
        for (const [taskId, td] of Object.entries(timeDataMap)) {
          if (td.runningEntry) {
            const startMs = new Date(td.runningEntry.startedAt).getTime();
            const elapsedSec = Math.floor((Date.now() - startMs) / 1000);
            newElapsed[taskId] = elapsedSec;
          }
        }
        setElapsedMap(newElapsed);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      setElapsedMap({});
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timeDataMap]);

  const handleStartTimer = async (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/tasks/${taskId}/time`, { method: 'POST' });
      if (!res.ok) {
        const err = await res.json();
        console.error('Start timer error:', err);
        return;
      }
      await fetchTimeData(taskId);
    } catch (err) {
      console.error('Error starting timer:', err);
    }
  };

  const handleStopTimer = async (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/tasks/${taskId}/time`, { method: 'PATCH' });
      if (!res.ok) {
        const err = await res.json();
        console.error('Stop timer error:', err);
        return;
      }
      await fetchTimeData(taskId);
      // Refresh tasks to update actualHours
      await fetchTasks();
    } catch (err) {
      console.error('Error stopping timer:', err);
    }
  };

  const formatElapsed = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h${m.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const formatTotalHours = (minutes: number): string => {
    if (minutes <= 0) return '';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m}min`;
    if (m === 0) return `${h}h`;
    return `${h}h${m.toString().padStart(2, '0')}`;
  };

  // ─── Stats ───────────────────────────────────────────────────────────────
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const overdueTasks = tasks.filter(t => isOverdue(t.dueDate, t.status)).length;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RENDER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />

      <div style={{
        flex: 1,
        marginLeft: isMobile ? '0' : `${sidebarWidth}px`,
        transition: 'margin-left 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}>

        {/* ── HEADER ───────────────────────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(to right, #0a1628, #0d1321)',
          padding: isMobile ? '16px' : '20px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          flexShrink: 0,
        }}>
          {/* Decorative line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)', boxShadow: '0 0 12px rgba(99, 139, 255, 0.4)' }} />
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99, 139, 255, 0.3) 0%, transparent 100%)' }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Kanban Board</span>
          </div>

          {/* Title + Actions row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Back to projects */}
              <Link href="/admin/projets" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    padding: '8px 14px', borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                  Projets
                </button>
              </Link>
              {/* Kanban icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#638BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="5" height="18" rx="1" />
                <rect x="10" y="3" width="5" height="12" rx="1" />
                <rect x="17" y="3" width="5" height="8" rx="1" />
              </svg>
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0, color: 'white' }}>Kanban</h1>
              </div>
            </div>

            {/* Stats badges */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{
                background: 'rgba(99, 139, 255, 0.1)', border: '1px solid rgba(99, 139, 255, 0.3)',
                borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#638BFF', boxShadow: '0 0 8px rgba(99, 139, 255, 0.5)' }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#93b4ff' }}>{totalTasks} tache{totalTasks !== 1 ? 's' : ''}</span>
              </div>

              {completedTasks > 0 && (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#6ee7b7' }}>
                    {completedTasks} terminee{completedTasks !== 1 ? 's' : ''}
                  </span>
                </div>
              )}

              {overdueTasks > 0 && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#fca5a5' }}>
                    {overdueTasks} en retard
                  </span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setNewTask(prev => ({
                    ...prev,
                    projectId: selectedProjectId !== 'all' ? selectedProjectId : '',
                  }));
                  setShowCreateModal(true);
                }}
                style={{
                  padding: '10px 20px', borderRadius: '10px', border: 'none',
                  background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)',
                  color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  boxShadow: '0 4px 12px rgba(99, 139, 255, 0.3)',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 139, 255, 0.4)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 139, 255, 0.3)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                Nouvelle tache
              </button>

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                style={{
                  padding: '10px 20px', borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)',
                  color: 'white', fontSize: '14px', fontWeight: 600,
                  cursor: refreshing ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  transition: 'all 0.2s', opacity: refreshing ? 0.5 : 1,
                }}
                onMouseOver={(e) => { if (!refreshing) e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }}>
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" />
                </svg>
                Actualiser
              </button>

              <button
                onClick={openSettings}
                style={{
                  padding: '10px 20px', borderRadius: '10px',
                  border: '1px solid rgba(99, 139, 255, 0.3)', background: 'rgba(255,255,255,0.05)',
                  color: '#638BFF', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(99, 139, 255, 0.1)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
                Configurer
              </button>
            </div>
          </div>

          {/* ── FILTER BAR ─────────────────────────────────────────────────── */}
          <div style={{
            display: 'flex', gap: '12px', marginTop: '16px', alignItems: 'center', flexWrap: 'wrap',
          }}>
            {/* Project filter */}
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              style={{
                padding: '8px 14px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                color: 'white', fontSize: '13px', fontWeight: 500, cursor: 'pointer', outline: 'none',
                minWidth: '180px',
              }}
            >
              <option value="all" style={{ background: '#0d1321' }}>Tous les projets</option>
              {projects.map(p => (
                <option key={p.id} value={p.id} style={{ background: '#0d1321' }}>{p.name}</option>
              ))}
            </select>

            {/* Priority filter */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              style={{
                padding: '8px 14px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                color: 'white', fontSize: '13px', fontWeight: 500, cursor: 'pointer', outline: 'none',
                minWidth: '150px',
              }}
            >
              <option value="all" style={{ background: '#0d1321' }}>Toutes priorites</option>
              <option value="urgent" style={{ background: '#0d1321' }}>Urgent</option>
              <option value="high" style={{ background: '#0d1321' }}>Haute</option>
              <option value="medium" style={{ background: '#0d1321' }}>Moyenne</option>
              <option value="low" style={{ background: '#0d1321' }}>Basse</option>
            </select>

            {/* Search */}
            <div style={{ position: 'relative', flex: 1, maxWidth: '320px', minWidth: '200px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher une tache..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', padding: '8px 14px 8px 36px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                  color: 'white', fontSize: '13px', outline: 'none',
                }}
              />
            </div>

            {/* Clear filters */}
            {hasFilters && (
              <button
                onClick={handleClearFilters}
                style={{
                  padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)',
                  background: 'rgba(239, 68, 68, 0.08)', color: '#ef4444', fontSize: '12px',
                  fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'; }}
              >
                Effacer filtres
              </button>
            )}
          </div>
        </div>

        {/* ── KANBAN BOARD ─────────────────────────────────────────────────── */}
        <div style={{
          flex: 1, overflowX: 'auto', overflowY: 'auto',
          padding: isMobile ? '12px' : '20px',
          background: 'linear-gradient(135deg, #0a1628 0%, #0d1321 100%)',
        }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', color: 'rgba(255,255,255,0.6)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '48px', height: '48px', border: '4px solid rgba(99, 139, 255, 0.2)',
                  borderTop: '4px solid #638BFF', borderRadius: '50%', margin: '0 auto 16px',
                  animation: 'spin 1s linear infinite',
                }} />
                <p style={{ fontSize: '14px', margin: 0 }}>Chargement du Kanban...</p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '100%' }}>
              {/* Columns row */}
              <div style={{
                display: 'flex', gap: '16px', minHeight: '500px',
                minWidth: columns.length * 290,
              }}>
                {columns.map(column => {
                  const colTasks = getTasksForColumn(column.id);
                  const count = colTasks.length;
                  const isOverLimit = column.wipLimit !== null && count > column.wipLimit;
                  const isAtLimit = column.wipLimit !== null && count === column.wipLimit;

                  return (
                    <div
                      key={column.id}
                      style={{
                        flex: '1 1 260px', minWidth: '260px', maxWidth: '340px',
                        display: 'flex', flexDirection: 'column',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '12px',
                        border: isOverLimit
                          ? '1px solid rgba(239, 68, 68, 0.4)'
                          : '1px solid rgba(255,255,255,0.08)',
                        transition: 'all 0.2s',
                      }}
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, column.id)}
                    >
                      {/* Column header */}
                      <div style={{
                        padding: '14px 16px',
                        borderBottom: `2px solid ${column.color}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: isOverLimit
                          ? 'rgba(239, 68, 68, 0.08)'
                          : isAtLimit
                            ? 'rgba(245, 158, 11, 0.06)'
                            : 'transparent',
                        borderRadius: '12px 12px 0 0',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '12px', height: '12px', borderRadius: '3px',
                            background: column.color,
                            boxShadow: `0 0 8px ${column.color}60`,
                          }} />
                          <span style={{
                            fontSize: '14px', fontWeight: 700, color: 'white',
                            letterSpacing: '0.02em',
                          }}>
                            {column.label}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{
                            padding: '2px 8px', borderRadius: '10px', fontSize: '12px', fontWeight: 700,
                            background: `${column.color}20`, color: column.color,
                          }}>
                            {count}
                          </span>
                          {column.wipLimit !== null && (
                            <span style={{
                              padding: '2px 6px', borderRadius: '10px', fontSize: '10px', fontWeight: 600,
                              background: isOverLimit ? 'rgba(239, 68, 68, 0.2)' : isAtLimit ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.06)',
                              color: isOverLimit ? '#ef4444' : isAtLimit ? '#f59e0b' : 'rgba(255,255,255,0.4)',
                              border: isOverLimit ? '1px solid rgba(239, 68, 68, 0.4)' : 'none',
                            }}>
                              max {column.wipLimit}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Column body */}
                      <div style={{
                        flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px',
                        overflowY: 'auto', minHeight: '60px',
                      }}>
                        {colTasks.length === 0 ? (
                          <div style={{
                            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '40px 16px', textAlign: 'center',
                          }}>
                            <div>
                              <div style={{ fontSize: '24px', marginBottom: '8px', opacity: 0.3 }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" style={{ margin: '0 auto' }}>
                                  <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="12" y2="14" />
                                </svg>
                              </div>
                              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', fontWeight: 500 }}>
                                Aucune tache
                              </span>
                            </div>
                          </div>
                        ) : (
                          colTasks.map(task => {
                            const overdue = isOverdue(task.dueDate, task.status);

                            return (
                              <div
                                key={task.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                                onDragEnd={handleDragEnd}
                                onClick={() => {
                                  if (selectedTask?.id === task.id) {
                                    setSelectedTask(null);
                                    setIsEditingTask(false);
                                    setEditedTask({});
                                  } else {
                                    setSelectedTask(task);
                                    setIsEditingTask(false);
                                    setEditedTask({});
                                  }
                                }}
                                style={{
                                  background: selectedTask?.id === task.id
                                    ? 'rgba(99, 139, 255, 0.12)'
                                    : 'rgba(255,255,255,0.04)',
                                  border: selectedTask?.id === task.id
                                    ? '1px solid rgba(99, 139, 255, 0.4)'
                                    : '1px solid rgba(255,255,255,0.08)',
                                  borderRadius: '10px',
                                  padding: '12px',
                                  cursor: 'grab',
                                  transition: 'all 0.15s',
                                  borderLeft: `3px solid ${priorityColor(task.priority)}`,
                                }}
                                onMouseOver={(e) => {
                                  if (selectedTask?.id !== task.id) {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                                  }
                                }}
                                onMouseOut={(e) => {
                                  if (selectedTask?.id !== task.id) {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                  }
                                }}
                              >
                                {/* Title */}
                                <div style={{
                                  fontSize: '13px', fontWeight: 600, color: 'white',
                                  marginBottom: '8px', lineHeight: '1.4',
                                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                }}>
                                  {task.title}
                                </div>

                                {/* Priority badge */}
                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                                  <span style={{
                                    padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700,
                                    background: priorityBg(task.priority),
                                    color: priorityColor(task.priority),
                                    border: `1px solid ${priorityBorder(task.priority)}`,
                                    textTransform: 'uppercase', letterSpacing: '0.04em',
                                  }}>
                                    {priorityLabel(task.priority)}
                                  </span>

                                  {task.blockedReason && (
                                    <span style={{
                                      padding: '2px 6px', borderRadius: '6px', fontSize: '10px', fontWeight: 700,
                                      background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444',
                                      border: '1px solid rgba(239, 68, 68, 0.3)',
                                    }}>
                                      BLOQUE
                                    </span>
                                  )}
                                </div>

                                {/* Project name */}
                                <div style={{
                                  fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 500,
                                  marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px',
                                }}>
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                  </svg>
                                  {task.project.name}
                                </div>

                                {/* Footer: due date + timer + hours */}
                                <div style={{
                                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                  gap: '6px', flexWrap: 'wrap',
                                }}>
                                  {task.dueDate ? (
                                    <span style={{
                                      fontSize: '11px', fontWeight: 600,
                                      color: overdue ? '#ef4444' : 'rgba(255,255,255,0.45)',
                                      display: 'flex', alignItems: 'center', gap: '3px',
                                    }}>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                      </svg>
                                      {formatDate(task.dueDate)}
                                      {overdue && ' !'}
                                    </span>
                                  ) : (
                                    <span />
                                  )}

                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    {/* Timer button + running indicator */}
                                    {(() => {
                                      const td = timeDataMap[task.id];
                                      const isRunning = td?.runningEntry !== null && td?.runningEntry !== undefined;
                                      const elapsed = elapsedMap[task.id];
                                      const totalMin = td?.totalMinutes || 0;

                                      return (
                                        <>
                                          {/* Total logged time */}
                                          {totalMin > 0 && !isRunning && (
                                            <span style={{
                                              fontSize: '10px', fontWeight: 700,
                                              color: '#10b981',
                                              background: 'rgba(16, 185, 129, 0.12)',
                                              border: '1px solid rgba(16, 185, 129, 0.25)',
                                              borderRadius: '6px', padding: '1px 6px',
                                              display: 'flex', alignItems: 'center', gap: '3px',
                                            }}>
                                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                              </svg>
                                              {formatTotalHours(totalMin)}
                                            </span>
                                          )}

                                          {/* Running timer display */}
                                          {isRunning && elapsed !== undefined && (
                                            <span style={{
                                              fontSize: '10px', fontWeight: 700,
                                              color: '#f59e0b',
                                              background: 'rgba(245, 158, 11, 0.12)',
                                              border: '1px solid rgba(245, 158, 11, 0.3)',
                                              borderRadius: '6px', padding: '1px 6px',
                                              display: 'flex', alignItems: 'center', gap: '3px',
                                              animation: 'timerPulse 2s ease-in-out infinite',
                                            }}>
                                              <span style={{
                                                width: '5px', height: '5px', borderRadius: '50%',
                                                background: '#f59e0b', display: 'inline-block',
                                                animation: 'timerDot 1s ease-in-out infinite',
                                              }} />
                                              {formatElapsed(elapsed)}
                                            </span>
                                          )}

                                          {/* Play / Stop button */}
                                          <button
                                            onClick={(e) => isRunning ? handleStopTimer(e, task.id) : handleStartTimer(e, task.id)}
                                            title={isRunning ? 'Arreter le timer' : 'Demarrer le timer'}
                                            style={{
                                              width: '22px', height: '22px', borderRadius: '6px',
                                              border: isRunning
                                                ? '1px solid rgba(239, 68, 68, 0.4)'
                                                : '1px solid rgba(16, 185, 129, 0.3)',
                                              background: isRunning
                                                ? 'rgba(239, 68, 68, 0.12)'
                                                : 'rgba(16, 185, 129, 0.08)',
                                              cursor: 'pointer',
                                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                                              padding: 0, transition: 'all 0.15s',
                                              flexShrink: 0,
                                            }}
                                            onMouseOver={(e) => {
                                              e.currentTarget.style.background = isRunning
                                                ? 'rgba(239, 68, 68, 0.25)'
                                                : 'rgba(16, 185, 129, 0.2)';
                                              e.currentTarget.style.transform = 'scale(1.1)';
                                            }}
                                            onMouseOut={(e) => {
                                              e.currentTarget.style.background = isRunning
                                                ? 'rgba(239, 68, 68, 0.12)'
                                                : 'rgba(16, 185, 129, 0.08)';
                                              e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                          >
                                            {isRunning ? (
                                              /* Stop icon (square) */
                                              <svg width="10" height="10" viewBox="0 0 24 24" fill="#ef4444" stroke="none">
                                                <rect x="6" y="6" width="12" height="12" rx="2" />
                                              </svg>
                                            ) : (
                                              /* Play icon (triangle) */
                                              <svg width="10" height="10" viewBox="0 0 24 24" fill="#10b981" stroke="none">
                                                <polygon points="8,5 20,12 8,19" />
                                              </svg>
                                            )}
                                          </button>
                                        </>
                                      );
                                    })()}

                                    {task.estimatedHours && (
                                      <span style={{
                                        fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 500,
                                        display: 'flex', alignItems: 'center', gap: '3px',
                                      }}>
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        {task.estimatedHours}h
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── TASK DETAIL PANEL ───────────────────────────────────────── */}
              {selectedTask && (
                <div
                  id="task-detail-panel"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '2px solid rgba(99, 139, 255, 0.3)',
                    borderRadius: '16px',
                    padding: '24px',
                    animation: 'slideDown 0.3s ease-out',
                    marginTop: '8px',
                  }}
                >
                  {/* Header with edit/close */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      {isEditingTask ? (
                        <input
                          type="text"
                          value={editedTask.title || ''}
                          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                          style={{
                            width: '100%', fontSize: '22px', fontWeight: 700, color: 'white',
                            background: 'rgba(255,255,255,0.05)', border: '2px solid #638BFF',
                            borderRadius: '8px', padding: '8px 12px', marginBottom: '8px', outline: 'none',
                          }}
                        />
                      ) : (
                        <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', margin: '0 0 8px 0' }}>
                          {selectedTask.title}
                        </h2>
                      )}
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '13px', color: '#638BFF', fontWeight: 600 }}>
                          {selectedTask.project.name}
                        </span>
                        {selectedTask.project.contact && (
                          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                            {selectedTask.project.contact.name}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {isEditingTask ? (
                        <>
                          <button onClick={handleCancelEdit} style={{
                            padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)',
                            background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '13px', fontWeight: 600,
                            cursor: 'pointer',
                          }}>
                            Annuler
                          </button>
                          <button onClick={handleSaveEdit} style={{
                            padding: '8px 16px', borderRadius: '8px', border: 'none',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                            boxShadow: '0 4px 8px rgba(16, 185, 129, 0.3)',
                          }}>
                            Sauvegarder
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={handleStartEdit} style={{
                            padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(99, 139, 255, 0.3)',
                            background: 'rgba(99, 139, 255, 0.1)', color: '#638BFF', fontSize: '13px', fontWeight: 600,
                            cursor: 'pointer', transition: 'all 0.2s',
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(99, 139, 255, 0.2)'; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(99, 139, 255, 0.1)'; }}
                          >
                            Editer
                          </button>
                          <button onClick={handleDuplicateTask} style={{
                            padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.3)',
                            background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', fontSize: '13px', fontWeight: 600,
                            cursor: 'pointer', transition: 'all 0.2s',
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)'; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)'; }}
                          >
                            Dupliquer
                          </button>
                          <button onClick={handleDeleteTask} style={{
                            padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)',
                            background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '13px', fontWeight: 600,
                            cursor: 'pointer', transition: 'all 0.2s',
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
                          >
                            Supprimer
                          </button>
                          <button onClick={() => { setSelectedTask(null); setIsEditingTask(false); setEditedTask({}); }} style={{
                            padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)',
                            background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '13px',
                            cursor: 'pointer', transition: 'all 0.2s',
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                          >
                            Fermer
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
                    gap: '24px',
                  }}>
                    {/* Left - Description */}
                    <div>
                      <h3 style={{
                        fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)',
                        textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px',
                      }}>
                        Description
                      </h3>
                      {isEditingTask ? (
                        <textarea
                          value={editedTask.description || ''}
                          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                          rows={6}
                          placeholder="Ajouter une description..."
                          style={{
                            width: '100%', fontSize: '14px', color: 'white',
                            background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(99, 139, 255, 0.3)',
                            borderRadius: '8px', padding: '12px', lineHeight: '1.6', outline: 'none', resize: 'vertical',
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = '#638BFF'; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(99, 139, 255, 0.3)'; }}
                        />
                      ) : (
                        <p style={{
                          fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.6',
                          margin: 0, whiteSpace: 'pre-wrap',
                        }}>
                          {selectedTask.description || 'Aucune description'}
                        </p>
                      )}

                      {/* Blocked reason */}
                      {(selectedTask.blockedReason || isEditingTask) && (
                        <div style={{ marginTop: '16px' }}>
                          <h3 style={{
                            fontSize: '13px', fontWeight: 700, color: '#ef4444',
                            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px',
                          }}>
                            Raison du blocage
                          </h3>
                          {isEditingTask ? (
                            <input
                              type="text"
                              value={editedTask.blockedReason || ''}
                              onChange={(e) => setEditedTask({ ...editedTask, blockedReason: e.target.value })}
                              placeholder="Raison du blocage (laisser vide si pas bloque)"
                              style={{
                                width: '100%', padding: '8px 12px', borderRadius: '6px',
                                background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.3)',
                                color: '#fca5a5', fontSize: '13px', outline: 'none',
                              }}
                            />
                          ) : (
                            <div style={{
                              padding: '10px 14px', borderRadius: '8px',
                              background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)',
                              fontSize: '13px', color: '#fca5a5', lineHeight: '1.5',
                            }}>
                              {selectedTask.blockedReason}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right - Metadata */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {/* Status */}
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                          Statut
                        </div>
                        <div style={{
                          padding: '8px 12px', borderRadius: '6px',
                          background: 'rgba(99, 139, 255, 0.1)', border: '1px solid rgba(99, 139, 255, 0.3)',
                          fontSize: '13px', fontWeight: 600, color: '#93b4ff',
                        }}>
                          {selectedTask.status === 'todo' ? 'A faire' :
                           selectedTask.status === 'in_progress' ? 'En cours' :
                           selectedTask.status === 'blocked' ? 'Bloque' :
                           selectedTask.status === 'completed' ? 'Termine' :
                           selectedTask.status}
                        </div>
                      </div>

                      {/* Kanban Column */}
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                          Colonne
                        </div>
                        <div style={{
                          padding: '8px 12px', borderRadius: '6px',
                          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                          fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)',
                        }}>
                          {columns.find(c => c.id === getTaskColumn(selectedTask))?.label || 'N/A'}
                        </div>
                      </div>

                      {/* Priority */}
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                          Priorite
                        </div>
                        {isEditingTask ? (
                          <select
                            value={editedTask.priority || 'medium'}
                            onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                            style={{
                              width: '100%', padding: '8px 12px', borderRadius: '6px',
                              background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(99, 139, 255, 0.3)',
                              color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer', outline: 'none',
                            }}
                          >
                            <option value="low" style={{ background: '#0d1321' }}>Basse</option>
                            <option value="medium" style={{ background: '#0d1321' }}>Moyenne</option>
                            <option value="high" style={{ background: '#0d1321' }}>Haute</option>
                            <option value="urgent" style={{ background: '#0d1321' }}>Urgent</option>
                          </select>
                        ) : (
                          <div style={{
                            padding: '8px 12px', borderRadius: '6px',
                            background: priorityBg(selectedTask.priority),
                            border: `1px solid ${priorityBorder(selectedTask.priority)}`,
                            fontSize: '13px', fontWeight: 600, color: priorityColor(selectedTask.priority),
                          }}>
                            {priorityLabel(selectedTask.priority)}
                          </div>
                        )}
                      </div>

                      {/* Due Date */}
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                          Date d&apos;echeance
                        </div>
                        {isEditingTask ? (
                          <input
                            type="date"
                            value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().split('T')[0] : ''}
                            onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value || null })}
                            style={{
                              width: '100%', padding: '8px 12px', borderRadius: '6px',
                              background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(99, 139, 255, 0.3)',
                              color: 'white', fontSize: '13px', outline: 'none',
                            }}
                          />
                        ) : selectedTask.dueDate ? (
                          <div style={{
                            padding: '8px 12px', borderRadius: '6px',
                            background: isOverdue(selectedTask.dueDate, selectedTask.status) ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)',
                            border: isOverdue(selectedTask.dueDate, selectedTask.status) ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255,255,255,0.1)',
                            fontSize: '13px', fontWeight: 600,
                            color: isOverdue(selectedTask.dueDate, selectedTask.status) ? '#fca5a5' : 'rgba(255,255,255,0.7)',
                          }}>
                            {new Date(selectedTask.dueDate).toLocaleDateString('fr-FR', {
                              day: 'numeric', month: 'long', year: 'numeric',
                            })}
                            {isOverdue(selectedTask.dueDate, selectedTask.status) && ' (en retard)'}
                          </div>
                        ) : (
                          <div style={{ padding: '8px 12px', fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
                            Non definie
                          </div>
                        )}
                      </div>

                      {/* Estimated Hours */}
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                          Temps estime
                        </div>
                        {isEditingTask ? (
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            value={editedTask.estimatedHours || ''}
                            onChange={(e) => setEditedTask({ ...editedTask, estimatedHours: parseFloat(e.target.value) || undefined })}
                            placeholder="Heures"
                            style={{
                              width: '100%', padding: '8px 12px', borderRadius: '6px',
                              background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(99, 139, 255, 0.3)',
                              color: 'white', fontSize: '13px', outline: 'none',
                            }}
                          />
                        ) : selectedTask.estimatedHours ? (
                          <div style={{
                            padding: '8px 12px', borderRadius: '6px',
                            background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)',
                            fontSize: '13px', fontWeight: 600, color: '#d8b4fe',
                          }}>
                            {selectedTask.estimatedHours}h
                          </div>
                        ) : (
                          <div style={{ padding: '8px 12px', fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
                            Non defini
                          </div>
                        )}
                      </div>

                      {/* Actual Hours */}
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                          Temps reel
                        </div>
                        {isEditingTask ? (
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            value={editedTask.actualHours || ''}
                            onChange={(e) => setEditedTask({ ...editedTask, actualHours: parseFloat(e.target.value) || undefined })}
                            placeholder="Heures"
                            style={{
                              width: '100%', padding: '8px 12px', borderRadius: '6px',
                              background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(99, 139, 255, 0.3)',
                              color: 'white', fontSize: '13px', outline: 'none',
                            }}
                          />
                        ) : selectedTask.actualHours ? (
                          <div style={{
                            padding: '8px 12px', borderRadius: '6px',
                            background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)',
                            fontSize: '13px', fontWeight: 600, color: '#6ee7b7',
                          }}>
                            {selectedTask.actualHours}h
                          </div>
                        ) : (
                          <div style={{ padding: '8px 12px', fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
                            Non defini
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                          Tags
                        </div>
                        {isEditingTask ? (
                          <input
                            type="text"
                            value={editedTask.tags || ''}
                            onChange={(e) => setEditedTask({ ...editedTask, tags: e.target.value })}
                            placeholder="tag1, tag2, tag3"
                            style={{
                              width: '100%', padding: '8px 12px', borderRadius: '6px',
                              background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(99, 139, 255, 0.3)',
                              color: 'white', fontSize: '13px', outline: 'none',
                            }}
                          />
                        ) : selectedTask.tags ? (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {selectedTask.tags.split(',').map((tag, idx) => (
                              <span key={idx} style={{
                                padding: '3px 10px', borderRadius: '12px',
                                background: 'rgba(99, 139, 255, 0.1)', border: '1px solid rgba(99, 139, 255, 0.3)',
                                fontSize: '11px', fontWeight: 600, color: '#638BFF',
                              }}>
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div style={{ padding: '8px 12px', fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
                            Aucun tag
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── CREATE TASK MODAL ────────────────────────────────────────────── */}
      {showCreateModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          }}
          onClick={() => setShowCreateModal(false)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #0d1321 0%, #0a1628 100%)',
              border: '1px solid rgba(99, 139, 255, 0.3)',
              borderRadius: '16px', padding: '28px', width: '480px', maxWidth: '90vw',
              boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
              animation: 'slideDown 0.3s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'white', margin: '0 0 20px 0' }}>
              Nouvelle tache
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Project select */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Projet *
                </label>
                <select
                  value={newTask.projectId}
                  onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                    color: 'white', fontSize: '14px', outline: 'none', cursor: 'pointer',
                  }}
                >
                  <option value="" style={{ background: '#0d1321' }}>Selectionner un projet</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id} style={{ background: '#0d1321' }}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Titre *
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Titre de la tache..."
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                    color: 'white', fontSize: '14px', outline: 'none',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#638BFF'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                />
              </div>

              {/* Priority */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Priorite
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                    color: 'white', fontSize: '14px', outline: 'none', cursor: 'pointer',
                  }}
                >
                  <option value="low" style={{ background: '#0d1321' }}>Basse</option>
                  <option value="medium" style={{ background: '#0d1321' }}>Moyenne</option>
                  <option value="high" style={{ background: '#0d1321' }}>Haute</option>
                  <option value="urgent" style={{ background: '#0d1321' }}>Urgent</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows={4}
                  placeholder="Description optionnelle..."
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                    color: 'white', fontSize: '14px', outline: 'none', resize: 'vertical',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#638BFF'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                />
              </div>
            </div>

            {/* Modal actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  padding: '10px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '14px', fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Annuler
              </button>
              <button
                onClick={handleCreateTask}
                disabled={!newTask.projectId || !newTask.title.trim() || creating}
                style={{
                  padding: '10px 24px', borderRadius: '8px', border: 'none',
                  background: (!newTask.projectId || !newTask.title.trim() || creating)
                    ? 'rgba(99, 139, 255, 0.3)'
                    : 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)',
                  color: 'white', fontSize: '14px', fontWeight: 600,
                  cursor: (!newTask.projectId || !newTask.title.trim() || creating) ? 'not-allowed' : 'pointer',
                  boxShadow: (!newTask.projectId || !newTask.title.trim() || creating) ? 'none' : '0 4px 12px rgba(99, 139, 255, 0.3)',
                  transition: 'all 0.2s',
                }}
              >
                {creating ? 'Creation...' : 'Creer la tache'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SETTINGS MODAL ───────────────────────────────────────────────── */}
      {showSettings && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          }}
          onClick={() => setShowSettings(false)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #0d1321 0%, #0a1628 100%)',
              border: '1px solid rgba(99, 139, 255, 0.3)',
              borderRadius: '16px', padding: '28px', width: '600px', maxWidth: '90vw',
              maxHeight: '80vh', overflowY: 'auto',
              boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
              animation: 'slideDown 0.3s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'white', margin: '0 0 20px 0' }}>
              Configuration des colonnes
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {editColumns.map((col, idx) => (
                <div key={col.id} style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px', padding: '14px',
                  display: 'grid', gridTemplateColumns: '1fr 80px 80px 100px', gap: '10px', alignItems: 'center',
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: '4px', textTransform: 'uppercase' }}>
                      Nom
                    </label>
                    <input
                      type="text"
                      value={col.label}
                      onChange={(e) => {
                        const updated = [...editColumns];
                        updated[idx] = { ...updated[idx], label: e.target.value };
                        setEditColumns(updated);
                      }}
                      style={{
                        width: '100%', padding: '6px 10px', borderRadius: '6px',
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                        color: 'white', fontSize: '13px', outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: '4px', textTransform: 'uppercase' }}>
                      Couleur
                    </label>
                    <input
                      type="color"
                      value={col.color}
                      onChange={(e) => {
                        const updated = [...editColumns];
                        updated[idx] = { ...updated[idx], color: e.target.value };
                        setEditColumns(updated);
                      }}
                      style={{
                        width: '100%', height: '32px', borderRadius: '6px',
                        background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: '4px', textTransform: 'uppercase' }}>
                      WIP
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={col.wipLimit ?? ''}
                      onChange={(e) => {
                        const updated = [...editColumns];
                        const val = e.target.value ? parseInt(e.target.value) : null;
                        updated[idx] = { ...updated[idx], wipLimit: val };
                        setEditColumns(updated);
                      }}
                      placeholder="-"
                      style={{
                        width: '100%', padding: '6px 10px', borderRadius: '6px',
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                        color: 'white', fontSize: '13px', outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: '4px', textTransform: 'uppercase' }}>
                      Statut
                    </label>
                    <select
                      value={col.mappedStatus}
                      onChange={(e) => {
                        const updated = [...editColumns];
                        updated[idx] = { ...updated[idx], mappedStatus: e.target.value };
                        setEditColumns(updated);
                      }}
                      style={{
                        width: '100%', padding: '6px 10px', borderRadius: '6px',
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                        color: 'white', fontSize: '12px', outline: 'none', cursor: 'pointer',
                      }}
                    >
                      <option value="todo" style={{ background: '#0d1321' }}>todo</option>
                      <option value="in_progress" style={{ background: '#0d1321' }}>in_progress</option>
                      <option value="blocked" style={{ background: '#0d1321' }}>blocked</option>
                      <option value="completed" style={{ background: '#0d1321' }}>completed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button
                onClick={() => {
                  setEditColumns(DEFAULT_COLUMNS);
                }}
                style={{
                  padding: '10px 18px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)',
                  background: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(245, 158, 11, 0.15)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(245, 158, 11, 0.08)'; }}
              >
                Reinitialiser
              </button>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setShowSettings(false)}
                  style={{
                    padding: '10px 18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '13px', fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Annuler
                </button>
                <button
                  onClick={saveSettings}
                  style={{
                    padding: '10px 24px', borderRadius: '8px', border: 'none',
                    background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)',
                    color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(99, 139, 255, 0.3)',
                  }}
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CSS Animations ───────────────────────────────────────────────── */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-16px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes timerPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes timerDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        input::placeholder, textarea::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        select option {
          background-color: #0d1321;
          color: white;
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.25);
        }

        /* Drag cursor override */
        [draggable="true"] {
          cursor: grab;
        }
        [draggable="true"]:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
}
