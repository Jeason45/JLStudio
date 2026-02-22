'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import {
  BarChart3, Filter, ChevronDown, ChevronRight, Plus, Trash2, Calendar,
  TrendingUp, Diamond, X, AlertTriangle, Clock,
  CheckCircle2, Circle, Edit3, Save
} from 'lucide-react';
import {
  format, addDays, differenceInDays, startOfWeek, endOfWeek, startOfMonth,
  endOfMonth, eachDayOfInterval, eachWeekOfInterval, isToday,
  isWeekend, parseISO, addMonths, startOfDay
} from 'date-fns';
import { fr } from 'date-fns/locale';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  name: string;
  status: string;
  startDate: string | null;
  endDate: string | null;
  progress: number;
  contact?: { id: string; name: string; } | null;
  _count?: { tasks: number; milestones: number; };
}

interface TaskDependency {
  id: string;
  dependentTaskId: string;
  predecessorTaskId: string;
  type: string;
  lag: number;
}

interface Task {
  id: string;
  title: string;
  description: string | null;
  startDate: string | null;
  dueDate: string | null;
  duration: number | null;
  estimatedHours: number | null;
  actualHours: number | null;
  status: string;
  priority: string;
  projectId: string;
  sectionId: string | null;
  parentTaskId: string | null;
  isCriticalPath: boolean;
  order: number;
  tags: string | null;
  blockedReason: string | null;
  dependsOn: TaskDependency[];
  dependedBy: TaskDependency[];
}

interface TaskSection {
  id: string;
  name: string;
  color: string | null;
  order: number;
  isCollapsed: boolean;
  tasks?: Task[];
}

interface MilestoneType {
  id: string;
  name: string;
  date: string;
  status: string;
  color: string | null;
}

type ZoomLevel = 'day' | 'week' | 'month';

// ─── Constants ───────────────────────────────────────────────────────────────

const PRIMARY = '#638BFF';
const PRIMARY_DARK = '#4a6fd4';
const BG_DARK = '#0a1628';
const BG_CARD = '#0d1321';
const BORDER_COLOR = 'rgba(255,255,255,0.1)';

const STATUS_COLORS: Record<string, string> = {
  todo: '#94a3b8',
  in_progress: '#3b82f6',
  blocked: '#ef4444',
  completed: '#10b981',
};

const STATUS_LABELS: Record<string, string> = {
  todo: 'A faire',
  in_progress: 'En cours',
  blocked: 'Bloque',
  completed: 'Termine',
};

const PRIORITY_COLORS: Record<string, string> = {
  low: '#94a3b8',
  medium: '#f59e0b',
  high: '#f97316',
  urgent: '#ef4444',
};

const PRIORITY_LABELS: Record<string, string> = {
  low: 'Basse',
  medium: 'Moyenne',
  high: 'Haute',
  urgent: 'Urgente',
};

const ROW_HEIGHT = 40;
const HEADER_HEIGHT = 60;
const TASK_LIST_WIDTH = 320;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTaskProgress(task: Task): number {
  if (task.status === 'completed') return 100;
  if (task.status === 'todo') return 0;
  if (task.estimatedHours && task.actualHours) {
    return Math.min(Math.round((task.actualHours / task.estimatedHours) * 100), 100);
  }
  if (task.status === 'in_progress') return 50;
  if (task.status === 'blocked') return 25;
  return 0;
}

function getBarColor(task: Task): string {
  if (task.isCriticalPath) return '#ef4444';
  return STATUS_COLORS[task.status] || '#94a3b8';
}

function safeParse(dateStr: string | null): Date | null {
  if (!dateStr) return null;
  try {
    return parseISO(dateStr);
  } catch {
    return null;
  }
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function GanttPage() {
  const { sidebarWidth, isMobile } = useSidebar();

  // ── Data state ──
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sections, setSections] = useState<TaskSection[]>([]);
  const [milestones, setMilestones] = useState<MilestoneType[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // ── UI state ──
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('week');
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Partial<Task> & { id?: string }>({});
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionColor, setNewSectionColor] = useState(PRIMARY);
  const [newMilestoneName, setNewMilestoneName] = useState('');
  const [newMilestoneDate, setNewMilestoneDate] = useState('');
  const [newMilestoneColor, setNewMilestoneColor] = useState('#ef4444');

  // ── New task form ──
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskStartDate, setNewTaskStartDate] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskSectionId, setNewTaskSectionId] = useState('');
  const [newTaskDuration, setNewTaskDuration] = useState('');
  const [newTaskEstimatedHours, setNewTaskEstimatedHours] = useState('');

  const timelineRef = useRef<HTMLDivElement>(null);
  const taskListRef = useRef<HTMLDivElement>(null);

  // ─── Data Fetching ─────────────────────────────────────────────────────────

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        const projs = Array.isArray(data) ? data : [];
        setProjects(projs);
        if (projs.length > 0 && !selectedProjectId) {
          setSelectedProjectId(projs[0].id);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  const fetchProjectData = useCallback(async (projectId: string) => {
    if (!projectId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      const data = await res.json();
      if (data && !data.error) {
        setTasks(Array.isArray(data.tasks) ? data.tasks : []);
        setSections(Array.isArray(data.taskSections) ? data.taskSections : []);
        setMilestones(Array.isArray(data.milestones) ? data.milestones : []);
      }
    } catch (err) {
      console.error('Error fetching project data:', err);
      setTasks([]);
      setSections([]);
      setMilestones([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      fetchProjectData(selectedProjectId);
    }
  }, [selectedProjectId, fetchProjectData]);

  // ─── Computed data ─────────────────────────────────────────────────────────

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const projectStats = useMemo(() => {
    if (tasks.length === 0) {
      return { percentComplete: 0, totalTasks: 0, startDate: null as Date | null, endDate: null as Date | null };
    }
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const percentComplete = Math.round((completedTasks / tasks.length) * 100);

    const startDates = tasks.filter(t => t.startDate).map(t => new Date(t.startDate!));
    const endDates = tasks.filter(t => t.dueDate).map(t => new Date(t.dueDate!));

    const startDate = startDates.length > 0
      ? new Date(Math.min(...startDates.map(d => d.getTime())))
      : null;
    const endDate = endDates.length > 0
      ? new Date(Math.max(...endDates.map(d => d.getTime())))
      : null;

    return { percentComplete, totalTasks: tasks.length, startDate, endDate };
  }, [tasks]);

  // ── Organize tasks by sections ──
  const organizedRows = useMemo(() => {
    const rows: Array<{ type: 'section' | 'task' | 'milestone'; data: TaskSection | Task | MilestoneType; sectionId?: string }> = [];

    // Sections with their tasks
    const sortedSections = [...sections].sort((a, b) => a.order - b.order);
    const sectionedTaskIds = new Set<string>();

    for (const section of sortedSections) {
      rows.push({ type: 'section', data: section });
      if (!collapsedSections.has(section.id)) {
        const sectionTasks = tasks
          .filter(t => t.sectionId === section.id)
          .sort((a, b) => a.order - b.order);
        for (const task of sectionTasks) {
          rows.push({ type: 'task', data: task, sectionId: section.id });
          sectionedTaskIds.add(task.id);
        }
      } else {
        // Still track IDs even if collapsed
        tasks.filter(t => t.sectionId === section.id).forEach(t => sectionedTaskIds.add(t.id));
      }
    }

    // Unsectioned tasks
    const unsectionedTasks = tasks
      .filter(t => !sectionedTaskIds.has(t.id))
      .sort((a, b) => a.order - b.order);

    if (unsectionedTasks.length > 0) {
      rows.push({ type: 'section', data: { id: '__unsectioned__', name: 'Sans section', color: '#94a3b8', order: 999, isCollapsed: false } as TaskSection });
      if (!collapsedSections.has('__unsectioned__')) {
        for (const task of unsectionedTasks) {
          rows.push({ type: 'task', data: task });
        }
      }
    }

    // Milestones at the bottom
    for (const ms of milestones) {
      rows.push({ type: 'milestone', data: ms });
    }

    return rows;
  }, [tasks, sections, milestones, collapsedSections]);

  // ── Timeline calculations ──
  const timelineConfig = useMemo(() => {
    const today = startOfDay(new Date());
    let timelineStart: Date;
    let timelineEnd: Date;

    if (projectStats.startDate && projectStats.endDate) {
      timelineStart = addDays(startOfWeek(projectStats.startDate, { weekStartsOn: 1 }), -7);
      timelineEnd = addDays(endOfWeek(projectStats.endDate, { weekStartsOn: 1 }), 14);
    } else if (selectedProject?.startDate && selectedProject?.endDate) {
      timelineStart = addDays(startOfWeek(new Date(selectedProject.startDate), { weekStartsOn: 1 }), -7);
      timelineEnd = addDays(endOfWeek(new Date(selectedProject.endDate), { weekStartsOn: 1 }), 14);
    } else {
      timelineStart = addDays(startOfWeek(today, { weekStartsOn: 1 }), -14);
      timelineEnd = addDays(today, 90);
    }

    // Also incorporate milestone dates
    for (const ms of milestones) {
      const msDate = safeParse(ms.date);
      if (msDate) {
        if (msDate < timelineStart) timelineStart = addDays(startOfWeek(msDate, { weekStartsOn: 1 }), -7);
        if (msDate > timelineEnd) timelineEnd = addDays(endOfWeek(msDate, { weekStartsOn: 1 }), 7);
      }
    }

    const totalDays = differenceInDays(timelineEnd, timelineStart) + 1;

    let dayWidth: number;
    switch (zoomLevel) {
      case 'day': dayWidth = 48; break;
      case 'week': dayWidth = 24; break;
      case 'month': dayWidth = 8; break;
      default: dayWidth = 24;
    }

    const totalWidth = totalDays * dayWidth;
    const days = eachDayOfInterval({ start: timelineStart, end: timelineEnd });
    const weeks = eachWeekOfInterval({ start: timelineStart, end: timelineEnd }, { weekStartsOn: 1 });

    return { timelineStart, timelineEnd, totalDays, dayWidth, totalWidth, days, weeks };
  }, [projectStats.startDate, projectStats.endDate, selectedProject, zoomLevel, milestones]);

  // ── Get position for a date ──
  const getDatePosition = useCallback((date: Date): number => {
    const days = differenceInDays(date, timelineConfig.timelineStart);
    return days * timelineConfig.dayWidth;
  }, [timelineConfig]);

  // ── Scroll sync ──
  const handleTimelineScroll = useCallback(() => {
    if (timelineRef.current && taskListRef.current) {
      taskListRef.current.scrollTop = timelineRef.current.scrollTop;
    }
  }, []);

  const handleTaskListScroll = useCallback(() => {
    if (timelineRef.current && taskListRef.current) {
      timelineRef.current.scrollTop = taskListRef.current.scrollTop;
    }
  }, []);

  // ── Scroll to today on load ──
  useEffect(() => {
    if (!loading && timelineRef.current) {
      const todayPos = getDatePosition(new Date());
      timelineRef.current.scrollLeft = Math.max(0, todayPos - 200);
    }
  }, [loading, getDatePosition]);

  // ─── API handlers ──────────────────────────────────────────────────────────

  const handleCreateTask = async () => {
    if (!selectedProjectId || !newTaskTitle.trim()) return;

    try {
      await fetch(`/api/projects/${selectedProjectId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTaskTitle.trim(),
          startDate: newTaskStartDate || null,
          dueDate: newTaskDueDate || null,
          priority: newTaskPriority,
          sectionId: newTaskSectionId || null,
          duration: newTaskDuration ? parseInt(newTaskDuration) : null,
          estimatedHours: newTaskEstimatedHours ? parseFloat(newTaskEstimatedHours) : null,
          status: 'todo',
          order: tasks.length,
        }),
      });
      await fetchProjectData(selectedProjectId);
      setIsAddTaskModalOpen(false);
      resetNewTaskForm();
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async () => {
    if (!editingTask.id) return;
    try {
      await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTask),
      });
      await fetchProjectData(selectedProjectId);
      setIsTaskModalOpen(false);
      setSelectedTask(null);
      setEditingTask({});
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('Supprimer cette tache ?')) return;
    try {
      await fetch(`/api/tasks?id=${taskId}`, { method: 'DELETE' });
      await fetchProjectData(selectedProjectId);
      setIsTaskModalOpen(false);
      setSelectedTask(null);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleDeleteAllTasks = async () => {
    if (!selectedProjectId) return;
    if (!window.confirm(`Supprimer TOUTES les ${tasks.length} taches de ce projet ? Cette action est irreversible.`)) return;
    try {
      await Promise.all(tasks.map(t => fetch(`/api/tasks?id=${t.id}`, { method: 'DELETE' })));
      await fetchProjectData(selectedProjectId);
    } catch (err) {
      console.error('Error deleting all tasks:', err);
    }
  };

  const handleCreateSection = async () => {
    if (!selectedProjectId || !newSectionName.trim()) return;
    try {
      await fetch(`/api/projects/${selectedProjectId}/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newSectionName.trim(),
          color: newSectionColor,
          order: sections.length,
        }),
      });
      await fetchProjectData(selectedProjectId);
      setIsSectionModalOpen(false);
      setNewSectionName('');
      setNewSectionColor(PRIMARY);
    } catch (err) {
      console.error('Error creating section:', err);
    }
  };

  const handleCreateMilestone = async () => {
    if (!selectedProjectId || !newMilestoneName.trim() || !newMilestoneDate) return;
    try {
      await fetch(`/api/projects/${selectedProjectId}/milestones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newMilestoneName.trim(),
          date: newMilestoneDate,
          color: newMilestoneColor,
        }),
      });
      await fetchProjectData(selectedProjectId);
      setIsMilestoneModalOpen(false);
      setNewMilestoneName('');
      setNewMilestoneDate('');
      setNewMilestoneColor('#ef4444');
    } catch (err) {
      console.error('Error creating milestone:', err);
    }
  };

  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  };

  const openTaskForEdit = (task: Task) => {
    setSelectedTask(task);
    setEditingTask({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate ? task.startDate.substring(0, 10) : null,
      dueDate: task.dueDate ? task.dueDate.substring(0, 10) : null,
      duration: task.duration,
      estimatedHours: task.estimatedHours,
      actualHours: task.actualHours,
      sectionId: task.sectionId,
      isCriticalPath: task.isCriticalPath,
      blockedReason: task.blockedReason,
    });
    setIsTaskModalOpen(true);
  };

  const resetNewTaskForm = () => {
    setNewTaskTitle('');
    setNewTaskStartDate('');
    setNewTaskDueDate('');
    setNewTaskPriority('medium');
    setNewTaskSectionId('');
    setNewTaskDuration('');
    setNewTaskEstimatedHours('');
  };

  // ─── Dependency Lines ──────────────────────────────────────────────────────

  const dependencyLines = useMemo(() => {
    const lines: Array<{ x1: number; y1: number; x2: number; y2: number; color: string }> = [];

    // Build a map from task id to row index (only visible task rows)
    const taskRowMap = new Map<string, number>();
    let rowIndex = 0;
    for (const row of organizedRows) {
      if (row.type === 'task') {
        taskRowMap.set((row.data as Task).id, rowIndex);
      }
      rowIndex++;
    }

    for (const row of organizedRows) {
      if (row.type !== 'task') continue;
      const task = row.data as Task;
      if (!task.dependsOn || task.dependsOn.length === 0) continue;

      const taskIdx = taskRowMap.get(task.id);
      if (taskIdx === undefined) continue;

      for (const dep of task.dependsOn) {
        const predIdx = taskRowMap.get(dep.predecessorTaskId);
        if (predIdx === undefined) continue;

        const predTask = tasks.find(t => t.id === dep.predecessorTaskId);
        if (!predTask) continue;

        const predEnd = safeParse(predTask.dueDate || predTask.startDate);
        const taskStart = safeParse(task.startDate);

        if (!predEnd || !taskStart) continue;

        const x1 = getDatePosition(predEnd) + timelineConfig.dayWidth;
        const y1 = predIdx * ROW_HEIGHT + ROW_HEIGHT / 2;
        const x2 = getDatePosition(taskStart);
        const y2 = taskIdx * ROW_HEIGHT + ROW_HEIGHT / 2;

        const isCritical = task.isCriticalPath && predTask.isCriticalPath;

        lines.push({
          x1, y1: y1 + HEADER_HEIGHT,
          x2, y2: y2 + HEADER_HEIGHT,
          color: isCritical ? '#ef4444' : 'rgba(99, 139, 255, 0.5)',
        });
      }
    }

    return lines;
  }, [organizedRows, tasks, getDatePosition, timelineConfig.dayWidth]);

  // ─── Render ────────────────────────────────────────────────────────────────

  if (loading && projects.length === 0) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: `linear-gradient(135deg, ${BG_DARK} 0%, #0f1b2e 100%)` }}>
        <AdminSidebar />
        <div style={{
          flex: 1,
          marginLeft: isMobile ? '0' : `${sidebarWidth}px`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
            <div style={{
              width: '48px', height: '48px',
              border: `4px solid ${PRIMARY}33`, borderTop: `4px solid ${PRIMARY}`,
              borderRadius: '50%', margin: '0 auto 16px',
              animation: 'gantt-spin 1s linear infinite',
            }} />
            <style>{`@keyframes gantt-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: '14px', margin: 0 }}>Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: `linear-gradient(135deg, ${BG_DARK} 0%, #0f1b2e 100%)`, overflow: 'hidden' }}>
      <AdminSidebar />

      <div style={{
        flex: 1,
        marginLeft: isMobile ? '0' : `${sidebarWidth}px`,
        transition: 'margin-left 0.3s ease',
        display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden',
      }}>
        {/* ─── Header ─── */}
        <div style={{
          background: `linear-gradient(to right, ${BG_DARK}, #101d30)`,
          padding: isMobile ? '20px 16px' : '24px 32px',
          color: 'white',
          borderBottom: `1px solid ${BORDER_COLOR}`,
          flexShrink: 0,
        }}>
          {/* Top line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
              boxShadow: `0 0 12px ${PRIMARY}66`,
            }} />
            <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${PRIMARY}4d 0%, transparent 100%)` }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Diagramme de Gantt
            </span>
          </div>

          {/* Controls row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            {/* Project selector */}
            <div style={{ position: 'relative', minWidth: '220px' }}>
              <Filter size={16} style={{
                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.5)', pointerEvents: 'none',
              }} />
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                style={{
                  padding: '10px 40px 10px 40px', borderRadius: '10px',
                  border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.08)',
                  color: 'white', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', outline: 'none', appearance: 'none',
                  width: '100%', backdropFilter: 'blur(10px)',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
              >
                <option value="" style={{ background: '#1e293b' }}>Selectionner un projet</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id} style={{ background: '#1e293b' }}>{p.name}</option>
                ))}
              </select>
              <ChevronDown size={16} style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.5)', pointerEvents: 'none',
              }} />
            </div>

            {/* Zoom controls */}
            <div style={{ display: 'flex', gap: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: `1px solid ${BORDER_COLOR}`, padding: '3px' }}>
              {(['day', 'week', 'month'] as ZoomLevel[]).map(level => (
                <button
                  key={level}
                  onClick={() => setZoomLevel(level)}
                  style={{
                    padding: '7px 14px', borderRadius: '7px', border: 'none',
                    background: zoomLevel === level ? `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)` : 'transparent',
                    color: zoomLevel === level ? 'white' : 'rgba(255,255,255,0.5)',
                    fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {level === 'day' ? 'Jour' : level === 'week' ? 'Semaine' : 'Mois'}
                </button>
              ))}
            </div>

            {/* Action buttons */}
            {selectedProjectId && (
              <>
                <button
                  onClick={() => setIsAddTaskModalOpen(true)}
                  style={{
                    padding: '10px 18px', borderRadius: '10px', border: 'none',
                    background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
                    color: 'white', fontSize: '13px', fontWeight: 700,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    boxShadow: `0 4px 12px ${PRIMARY}4d`, transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <Plus size={16} /> Tache
                </button>

                <button
                  onClick={() => setIsSectionModalOpen(true)}
                  style={{
                    padding: '10px 18px', borderRadius: '10px',
                    border: `1px solid ${PRIMARY}4d`, background: 'rgba(255,255,255,0.05)',
                    color: 'white', fontSize: '13px', fontWeight: 600,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                >
                  <Plus size={16} /> Section
                </button>

                <button
                  onClick={() => setIsMilestoneModalOpen(true)}
                  style={{
                    padding: '10px 18px', borderRadius: '10px',
                    border: `1px solid ${PRIMARY}4d`, background: 'rgba(255,255,255,0.05)',
                    color: 'white', fontSize: '13px', fontWeight: 600,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                >
                  <Diamond size={16} /> Jalon
                </button>

                {tasks.length > 0 && (
                  <button
                    onClick={handleDeleteAllTasks}
                    style={{
                      padding: '10px 18px', borderRadius: '10px',
                      border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444', fontSize: '13px', fontWeight: 600,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
                  >
                    <Trash2 size={16} /> Tout supprimer
                  </button>
                )}
              </>
            )}
          </div>

          {/* Stats row */}
          {selectedProjectId && (
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
              <div style={{
                padding: '12px 16px', borderRadius: '10px',
                background: `linear-gradient(135deg, #10b98126 0%, #10b9810d 100%)`,
                border: '1px solid #10b9814d', minWidth: '120px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <TrendingUp size={14} style={{ color: '#10b981' }} />
                  <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avancement</span>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#10b981' }}>{projectStats.percentComplete}%</div>
              </div>

              <div style={{
                padding: '12px 16px', borderRadius: '10px',
                background: `linear-gradient(135deg, ${PRIMARY}26 0%, ${PRIMARY}0d 100%)`,
                border: `1px solid ${PRIMARY}4d`, minWidth: '120px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <BarChart3 size={14} style={{ color: PRIMARY }} />
                  <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Taches</span>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: PRIMARY }}>{projectStats.totalTasks}</div>
              </div>

              <div style={{
                padding: '12px 16px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)', border: `1px solid ${BORDER_COLOR}`, minWidth: '160px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <Calendar size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />
                  <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Debut</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>
                  {projectStats.startDate ? format(projectStats.startDate, 'dd MMM yyyy', { locale: fr }) : 'Non definie'}
                </div>
              </div>

              <div style={{
                padding: '12px 16px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)', border: `1px solid ${BORDER_COLOR}`, minWidth: '160px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <Calendar size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />
                  <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fin</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>
                  {projectStats.endDate ? format(projectStats.endDate, 'dd MMM yyyy', { locale: fr }) : 'Non definie'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─── Gantt Content ─── */}
        {!selectedProjectId ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
              <BarChart3 size={64} style={{ marginBottom: '16px', opacity: 0.3 }} />
              <p style={{ fontSize: '16px', fontWeight: 600 }}>Selectionnez un projet pour afficher le diagramme de Gantt</p>
            </div>
          </div>
        ) : loading ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
              <div style={{
                width: '48px', height: '48px',
                border: `4px solid ${PRIMARY}33`, borderTop: `4px solid ${PRIMARY}`,
                borderRadius: '50%', margin: '0 auto 16px',
                animation: 'gantt-spin 1s linear infinite',
              }} />
              <style>{`@keyframes gantt-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              <p style={{ fontSize: '14px', margin: 0 }}>Chargement du diagramme...</p>
            </div>
          </div>
        ) : tasks.length === 0 && milestones.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
              <BarChart3 size={64} style={{ marginBottom: '16px', opacity: 0.3 }} />
              <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Aucune tache dans ce projet</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>Cliquez sur &quot;+ Tache&quot; pour commencer</p>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* ─── Task List Panel ─── */}
            <div
              ref={taskListRef}
              onScroll={handleTaskListScroll}
              style={{
                width: `${TASK_LIST_WIDTH}px`, minWidth: `${TASK_LIST_WIDTH}px`,
                borderRight: `1px solid ${BORDER_COLOR}`,
                overflowY: 'auto', overflowX: 'hidden',
                background: BG_CARD, flexShrink: 0,
              }}
            >
              {/* Header */}
              <div style={{
                height: `${HEADER_HEIGHT}px`, display: 'flex', alignItems: 'center',
                padding: '0 16px', borderBottom: `1px solid ${BORDER_COLOR}`,
                background: 'rgba(255,255,255,0.03)', position: 'sticky', top: 0, zIndex: 5,
              }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Taches ({tasks.length})
                </span>
              </div>

              {/* Rows */}
              {organizedRows.map((row, idx) => {
                if (row.type === 'section') {
                  const section = row.data as TaskSection;
                  const isCollapsed = collapsedSections.has(section.id);
                  const sectionTaskCount = tasks.filter(t => t.sectionId === section.id || (section.id === '__unsectioned__' && !t.sectionId)).length;
                  return (
                    <div
                      key={`section-${section.id}`}
                      onClick={() => toggleSection(section.id)}
                      style={{
                        height: `${ROW_HEIGHT}px`, display: 'flex', alignItems: 'center',
                        padding: '0 12px', cursor: 'pointer',
                        background: `${section.color || PRIMARY}0d`,
                        borderBottom: `1px solid ${BORDER_COLOR}`,
                        borderLeft: `3px solid ${section.color || PRIMARY}`,
                        gap: '8px', transition: 'background 0.15s',
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.background = `${section.color || PRIMARY}1a`; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = `${section.color || PRIMARY}0d`; }}
                    >
                      {isCollapsed ? <ChevronRight size={14} color="rgba(255,255,255,0.5)" /> : <ChevronDown size={14} color="rgba(255,255,255,0.5)" />}
                      <div style={{
                        width: '8px', height: '8px', borderRadius: '2px',
                        background: section.color || PRIMARY, flexShrink: 0,
                      }} />
                      <span style={{
                        fontSize: '12px', fontWeight: 700, color: 'white',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
                      }}>
                        {section.name}
                      </span>
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, flexShrink: 0 }}>
                        {sectionTaskCount}
                      </span>
                    </div>
                  );
                }

                if (row.type === 'milestone') {
                  const ms = row.data as MilestoneType;
                  return (
                    <div
                      key={`ms-${ms.id}`}
                      style={{
                        height: `${ROW_HEIGHT}px`, display: 'flex', alignItems: 'center',
                        padding: '0 12px 0 28px', gap: '8px',
                        borderBottom: `1px solid ${BORDER_COLOR}`,
                        background: 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <Diamond size={14} style={{ color: ms.color || '#ef4444', flexShrink: 0 }} />
                      <span style={{
                        fontSize: '12px', fontWeight: 600, color: ms.color || '#ef4444',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
                      }}>
                        {ms.name}
                      </span>
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>
                        {safeParse(ms.date) ? format(safeParse(ms.date)!, 'dd/MM', { locale: fr }) : ''}
                      </span>
                    </div>
                  );
                }

                // Task row
                const task = row.data as Task;
                const progress = getTaskProgress(task);
                return (
                  <div
                    key={`task-${task.id}`}
                    onClick={() => openTaskForEdit(task)}
                    style={{
                      height: `${ROW_HEIGHT}px`, display: 'flex', alignItems: 'center',
                      padding: '0 12px 0 28px', gap: '8px', cursor: 'pointer',
                      borderBottom: `1px solid ${BORDER_COLOR}`,
                      background: task.isCriticalPath ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
                      transition: 'background 0.15s',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = task.isCriticalPath ? 'rgba(239, 68, 68, 0.05)' : 'transparent'; }}
                  >
                    {/* Status icon */}
                    <div style={{ flexShrink: 0 }}>
                      {task.status === 'completed' ? (
                        <CheckCircle2 size={14} color="#10b981" />
                      ) : task.status === 'in_progress' ? (
                        <Clock size={14} color="#3b82f6" />
                      ) : task.status === 'blocked' ? (
                        <AlertTriangle size={14} color="#ef4444" />
                      ) : (
                        <Circle size={14} color="#94a3b8" />
                      )}
                    </div>

                    {/* Title */}
                    <span style={{
                      fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.85)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
                      textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                      opacity: task.status === 'completed' ? 0.6 : 1,
                    }}>
                      {task.title}
                    </span>

                    {/* Priority dot */}
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: PRIORITY_COLORS[task.priority] || '#94a3b8', flexShrink: 0,
                    }} />

                    {/* Critical path indicator */}
                    {task.isCriticalPath && (
                      <AlertTriangle size={12} color="#ef4444" style={{ flexShrink: 0 }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* ─── Timeline Panel ─── */}
            <div
              ref={timelineRef}
              onScroll={handleTimelineScroll}
              style={{ flex: 1, overflow: 'auto', position: 'relative' }}
            >
              <div style={{
                width: `${timelineConfig.totalWidth}px`,
                minHeight: `${HEADER_HEIGHT + organizedRows.length * ROW_HEIGHT}px`,
                position: 'relative',
              }}>
                {/* ─── Timeline Header ─── */}
                <div style={{
                  height: `${HEADER_HEIGHT}px`, position: 'sticky', top: 0, zIndex: 10,
                  background: BG_CARD, borderBottom: `1px solid ${BORDER_COLOR}`,
                }}>
                  {/* Month/Week labels */}
                  <div style={{ height: `${HEADER_HEIGHT / 2}px`, display: 'flex', position: 'relative' }}>
                    {zoomLevel === 'month' ? (
                      // Monthly headers
                      (() => {
                        const months: Array<{ start: Date; end: Date; label: string }> = [];
                        let current = timelineConfig.timelineStart;
                        while (current <= timelineConfig.timelineEnd) {
                          const monthStart = startOfMonth(current);
                          const monthEnd = endOfMonth(current);
                          months.push({
                            start: monthStart < timelineConfig.timelineStart ? timelineConfig.timelineStart : monthStart,
                            end: monthEnd > timelineConfig.timelineEnd ? timelineConfig.timelineEnd : monthEnd,
                            label: format(current, 'MMMM yyyy', { locale: fr }),
                          });
                          current = addMonths(startOfMonth(current), 1);
                        }
                        return months.map((m, i) => {
                          const left = getDatePosition(m.start);
                          const width = differenceInDays(m.end, m.start) * timelineConfig.dayWidth;
                          return (
                            <div key={i} style={{
                              position: 'absolute', left: `${left}px`, width: `${width}px`,
                              height: '100%', display: 'flex', alignItems: 'center',
                              justifyContent: 'center', borderRight: `1px solid ${BORDER_COLOR}`,
                              fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)',
                              textTransform: 'capitalize',
                            }}>
                              {m.label}
                            </div>
                          );
                        });
                      })()
                    ) : (
                      // Weekly headers for day/week views
                      timelineConfig.weeks.map((weekStart, i) => {
                        const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
                        const left = getDatePosition(weekStart);
                        const width = 7 * timelineConfig.dayWidth;
                        return (
                          <div key={i} style={{
                            position: 'absolute', left: `${left}px`, width: `${width}px`,
                            height: '100%', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', borderRight: `1px solid ${BORDER_COLOR}`,
                            fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)',
                          }}>
                            {format(weekStart, 'dd MMM', { locale: fr })} - {format(weekEnd, 'dd MMM', { locale: fr })}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Day labels (for day and week zoom) */}
                  <div style={{ height: `${HEADER_HEIGHT / 2}px`, display: 'flex', position: 'relative' }}>
                    {zoomLevel !== 'month' && timelineConfig.days.map((day, i) => {
                      const left = i * timelineConfig.dayWidth;
                      const isTodayDay = isToday(day);
                      const isWkEnd = isWeekend(day);
                      return (
                        <div key={i} style={{
                          position: 'absolute', left: `${left}px`, width: `${timelineConfig.dayWidth}px`,
                          height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          borderRight: `1px solid rgba(255,255,255,0.05)`,
                          fontSize: zoomLevel === 'day' ? '10px' : '9px',
                          fontWeight: isTodayDay ? 700 : 500,
                          color: isTodayDay ? PRIMARY : isWkEnd ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.4)',
                          background: isTodayDay ? `${PRIMARY}1a` : 'transparent',
                        }}>
                          {zoomLevel === 'day' ? format(day, 'dd', { locale: fr }) : (i % 2 === 0 ? format(day, 'dd', { locale: fr }) : '')}
                        </div>
                      );
                    })}
                    {zoomLevel === 'month' && (() => {
                      // Show week numbers in month view
                      return timelineConfig.weeks.map((weekStart, i) => {
                        const left = getDatePosition(weekStart);
                        const width = 7 * timelineConfig.dayWidth;
                        return (
                          <div key={i} style={{
                            position: 'absolute', left: `${left}px`, width: `${width}px`,
                            height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderRight: `1px solid rgba(255,255,255,0.05)`,
                            fontSize: '9px', fontWeight: 500, color: 'rgba(255,255,255,0.3)',
                          }}>
                            S{format(weekStart, 'ww')}
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* ─── Grid Background ─── */}
                <div style={{ position: 'absolute', top: `${HEADER_HEIGHT}px`, left: 0, right: 0, bottom: 0 }}>
                  {/* Weekend shading */}
                  {timelineConfig.days.map((day, i) => {
                    if (!isWeekend(day)) return null;
                    const left = i * timelineConfig.dayWidth;
                    return (
                      <div key={`we-${i}`} style={{
                        position: 'absolute', left: `${left}px`, top: 0,
                        width: `${timelineConfig.dayWidth}px`, height: '100%',
                        background: 'rgba(255,255,255,0.015)', pointerEvents: 'none',
                      }} />
                    );
                  })}

                  {/* Row grid lines */}
                  {organizedRows.map((_, idx) => (
                    <div key={`grid-${idx}`} style={{
                      position: 'absolute', left: 0, right: 0,
                      top: `${idx * ROW_HEIGHT}px`, height: `${ROW_HEIGHT}px`,
                      borderBottom: `1px solid rgba(255,255,255,0.04)`,
                    }} />
                  ))}

                  {/* Today marker */}
                  {(() => {
                    const todayPos = getDatePosition(new Date());
                    if (todayPos >= 0 && todayPos <= timelineConfig.totalWidth) {
                      return (
                        <div style={{
                          position: 'absolute', left: `${todayPos}px`, top: 0,
                          width: '2px', height: '100%',
                          background: `linear-gradient(180deg, ${PRIMARY} 0%, ${PRIMARY}00 100%)`,
                          zIndex: 3, pointerEvents: 'none',
                        }}>
                          <div style={{
                            position: 'absolute', top: '-4px', left: '-4px',
                            width: '10px', height: '10px', borderRadius: '50%',
                            background: PRIMARY, boxShadow: `0 0 8px ${PRIMARY}`,
                          }} />
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {/* ─── Dependency Arrows (SVG) ─── */}
                  {dependencyLines.length > 0 && (
                    <svg
                      style={{
                        position: 'absolute', top: 0, left: 0,
                        width: `${timelineConfig.totalWidth}px`,
                        height: `${organizedRows.length * ROW_HEIGHT + HEADER_HEIGHT}px`,
                        pointerEvents: 'none', zIndex: 2,
                      }}
                    >
                      <defs>
                        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                          <polygon points="0 0, 8 3, 0 6" fill={`${PRIMARY}80`} />
                        </marker>
                        <marker id="arrowhead-critical" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                          <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
                        </marker>
                      </defs>
                      {dependencyLines.map((line, i) => {
                        const isCritical = line.color === '#ef4444';
                        // Draw a path with a right angle
                        const midX = line.x1 + (line.x2 - line.x1) / 2;
                        const path = `M ${line.x1} ${line.y1} L ${midX} ${line.y1} L ${midX} ${line.y2} L ${line.x2} ${line.y2}`;
                        return (
                          <path
                            key={i}
                            d={path}
                            fill="none"
                            stroke={line.color}
                            strokeWidth={isCritical ? 2 : 1.5}
                            strokeDasharray={isCritical ? 'none' : '4 2'}
                            markerEnd={isCritical ? 'url(#arrowhead-critical)' : 'url(#arrowhead)'}
                            opacity={0.7}
                          />
                        );
                      })}
                    </svg>
                  )}

                  {/* ─── Task Bars and Milestones ─── */}
                  {organizedRows.map((row, idx) => {
                    const top = idx * ROW_HEIGHT;

                    if (row.type === 'section') {
                      const section = row.data as TaskSection;
                      // Section header background stripe on timeline
                      return (
                        <div key={`sec-bar-${section.id}`} style={{
                          position: 'absolute', left: 0, top: `${top}px`,
                          width: '100%', height: `${ROW_HEIGHT}px`,
                          background: `${section.color || PRIMARY}08`,
                          borderBottom: `1px solid ${BORDER_COLOR}`,
                        }} />
                      );
                    }

                    if (row.type === 'milestone') {
                      const ms = row.data as MilestoneType;
                      const msDate = safeParse(ms.date);
                      if (!msDate) return null;

                      const left = getDatePosition(msDate);
                      const msColor = ms.color || '#ef4444';

                      return (
                        <div key={`ms-bar-${ms.id}`} style={{
                          position: 'absolute',
                          left: `${left - 10}px`,
                          top: `${top + ROW_HEIGHT / 2 - 10}px`,
                          width: '20px', height: '20px',
                          zIndex: 4,
                        }}>
                          {/* Diamond shape */}
                          <div style={{
                            width: '16px', height: '16px',
                            background: msColor, transform: 'rotate(45deg)',
                            borderRadius: '2px', margin: '2px',
                            boxShadow: `0 0 8px ${msColor}80`,
                          }} />
                          {/* Label */}
                          <div style={{
                            position: 'absolute', left: '24px', top: '-2px',
                            whiteSpace: 'nowrap', fontSize: '10px', fontWeight: 600,
                            color: msColor, textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                          }}>
                            {ms.name}
                          </div>
                        </div>
                      );
                    }

                    // Task bar
                    const task = row.data as Task;
                    const taskStart = safeParse(task.startDate);
                    const taskEnd = safeParse(task.dueDate);

                    if (!taskStart) return null;

                    const barLeft = getDatePosition(taskStart);
                    let barWidth: number;

                    if (taskEnd) {
                      barWidth = Math.max((differenceInDays(taskEnd, taskStart) + 1) * timelineConfig.dayWidth, 20);
                    } else if (task.duration) {
                      barWidth = Math.max(task.duration * timelineConfig.dayWidth, 20);
                    } else {
                      barWidth = Math.max(timelineConfig.dayWidth, 20);
                    }

                    const barColor = getBarColor(task);
                    const progress = getTaskProgress(task);
                    const barHeight = 24;
                    const barTop = top + (ROW_HEIGHT - barHeight) / 2;

                    return (
                      <div
                        key={`bar-${task.id}`}
                        onClick={() => openTaskForEdit(task)}
                        style={{
                          position: 'absolute',
                          left: `${barLeft}px`,
                          top: `${barTop}px`,
                          width: `${barWidth}px`,
                          height: `${barHeight}px`,
                          borderRadius: '6px',
                          background: `${barColor}33`,
                          border: `1px solid ${barColor}80`,
                          cursor: 'pointer',
                          zIndex: 4,
                          overflow: 'hidden',
                          transition: 'box-shadow 0.15s, transform 0.15s',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.boxShadow = `0 2px 8px ${barColor}4d`;
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        {/* Progress fill */}
                        <div style={{
                          position: 'absolute', left: 0, top: 0,
                          width: `${progress}%`, height: '100%',
                          background: `${barColor}66`,
                          borderRadius: '5px 0 0 5px',
                          transition: 'width 0.3s',
                        }} />

                        {/* Critical path glow */}
                        {task.isCriticalPath && (
                          <div style={{
                            position: 'absolute', inset: 0,
                            borderRadius: '6px',
                            boxShadow: `0 0 6px ${barColor}80, inset 0 0 6px ${barColor}40`,
                          }} />
                        )}

                        {/* Bar content */}
                        <div style={{
                          position: 'relative', display: 'flex', alignItems: 'center',
                          height: '100%', padding: '0 8px', gap: '4px', zIndex: 1,
                        }}>
                          {barWidth > 60 && (
                            <span style={{
                              fontSize: '10px', fontWeight: 600, color: 'white',
                              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                              flex: 1,
                            }}>
                              {task.title}
                            </span>
                          )}
                          {barWidth > 100 && progress > 0 && (
                            <span style={{
                              fontSize: '9px', fontWeight: 700, color: 'white',
                              background: `${barColor}99`, borderRadius: '3px',
                              padding: '1px 4px', flexShrink: 0,
                            }}>
                              {progress}%
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MODALS                                                                 */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      {/* ─── Task Edit Modal ─── */}
      {isTaskModalOpen && selectedTask && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 1000, padding: '20px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) { setIsTaskModalOpen(false); setSelectedTask(null); } }}
        >
          <div style={{
            background: `linear-gradient(135deg, ${BG_CARD} 0%, #1e293b 100%)`,
            borderRadius: '20px', maxWidth: '600px', width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: `1px solid ${PRIMARY}33`, maxHeight: '90vh', overflow: 'auto',
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '24px 28px', borderBottom: `1px solid ${BORDER_COLOR}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Edit3 size={20} color={PRIMARY} />
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'white' }}>
                  Modifier la tache
                </h2>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleDeleteTask(selectedTask.id)}
                  style={{
                    padding: '8px', border: 'none', borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444',
                    cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'; }}
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => { setIsTaskModalOpen(false); setSelectedTask(null); }}
                  style={{
                    padding: '8px', border: 'none', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.1)', color: 'white',
                    cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Title */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Titre</label>
                <input
                  type="text"
                  value={editingTask.title || ''}
                  onChange={(e) => setEditingTask(prev => ({ ...prev, title: e.target.value }))}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '8px',
                    border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                    color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                <textarea
                  value={editingTask.description || ''}
                  onChange={(e) => setEditingTask(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '8px',
                    border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                    color: 'white', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                />
              </div>

              {/* Status + Priority row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Statut</label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {Object.entries(STATUS_LABELS).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setEditingTask(prev => ({ ...prev, status: key }))}
                        style={{
                          padding: '6px 12px', borderRadius: '6px', border: 'none',
                          background: editingTask.status === key ? `${STATUS_COLORS[key]}33` : 'rgba(255,255,255,0.05)',
                          color: editingTask.status === key ? STATUS_COLORS[key] : 'rgba(255,255,255,0.5)',
                          fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                          outline: editingTask.status === key ? `2px solid ${STATUS_COLORS[key]}` : 'none',
                          transition: 'all 0.15s',
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Priorite</label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setEditingTask(prev => ({ ...prev, priority: key }))}
                        style={{
                          padding: '6px 12px', borderRadius: '6px', border: 'none',
                          background: editingTask.priority === key ? `${PRIORITY_COLORS[key]}33` : 'rgba(255,255,255,0.05)',
                          color: editingTask.priority === key ? PRIORITY_COLORS[key] : 'rgba(255,255,255,0.5)',
                          fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                          outline: editingTask.priority === key ? `2px solid ${PRIORITY_COLORS[key]}` : 'none',
                          transition: 'all 0.15s',
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dates row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date de debut</label>
                  <input
                    type="date"
                    value={editingTask.startDate ? String(editingTask.startDate).substring(0, 10) : ''}
                    onChange={(e) => setEditingTask(prev => ({ ...prev, startDate: e.target.value || null }))}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px',
                      border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                      color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                      colorScheme: 'dark',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date de fin</label>
                  <input
                    type="date"
                    value={editingTask.dueDate ? String(editingTask.dueDate).substring(0, 10) : ''}
                    onChange={(e) => setEditingTask(prev => ({ ...prev, dueDate: e.target.value || null }))}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px',
                      border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                      color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                      colorScheme: 'dark',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                  />
                </div>
              </div>

              {/* Duration + Hours row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Duree (jours)</label>
                  <input
                    type="number"
                    value={editingTask.duration ?? ''}
                    onChange={(e) => setEditingTask(prev => ({ ...prev, duration: e.target.value ? parseInt(e.target.value) : null }))}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px',
                      border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                      color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Heures estimees</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editingTask.estimatedHours ?? ''}
                    onChange={(e) => setEditingTask(prev => ({ ...prev, estimatedHours: e.target.value ? parseFloat(e.target.value) : null }))}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px',
                      border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                      color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Heures reelles</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editingTask.actualHours ?? ''}
                    onChange={(e) => setEditingTask(prev => ({ ...prev, actualHours: e.target.value ? parseFloat(e.target.value) : null }))}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px',
                      border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                      color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                  />
                </div>
              </div>

              {/* Section selector */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Section</label>
                <select
                  value={editingTask.sectionId || ''}
                  onChange={(e) => setEditingTask(prev => ({ ...prev, sectionId: e.target.value || null }))}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '8px',
                    border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                    color: 'white', fontSize: '13px', outline: 'none', appearance: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                >
                  <option value="" style={{ background: '#1e293b' }}>Sans section</option>
                  {sections.map(s => (
                    <option key={s.id} value={s.id} style={{ background: '#1e293b' }}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Critical path toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setEditingTask(prev => ({ ...prev, isCriticalPath: !prev.isCriticalPath }))}
                  style={{
                    width: '44px', height: '24px', borderRadius: '12px', border: 'none',
                    background: editingTask.isCriticalPath ? '#ef4444' : 'rgba(255,255,255,0.15)',
                    cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                  }}
                >
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%', background: 'white',
                    position: 'absolute', top: '3px',
                    left: editingTask.isCriticalPath ? '23px' : '3px',
                    transition: 'left 0.2s',
                  }} />
                </button>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>Chemin critique</span>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>Mettre en evidence sur le diagramme</p>
                </div>
              </div>

              {/* Blocked reason (if blocked) */}
              {editingTask.status === 'blocked' && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#ef4444', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Raison du blocage</label>
                  <input
                    type="text"
                    value={editingTask.blockedReason || ''}
                    onChange={(e) => setEditingTask(prev => ({ ...prev, blockedReason: e.target.value }))}
                    placeholder="Indiquez la raison du blocage..."
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px',
                      border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)',
                      color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#ef4444'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'; }}
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '20px 28px', borderTop: `1px solid ${BORDER_COLOR}`,
              display: 'flex', gap: '12px', justifyContent: 'flex-end',
            }}>
              <button
                onClick={() => { setIsTaskModalOpen(false); setSelectedTask(null); }}
                style={{
                  padding: '10px 24px', borderRadius: '8px',
                  border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                  color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateTask}
                style={{
                  padding: '10px 32px', borderRadius: '8px', border: 'none',
                  background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
                  color: 'white', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                  boxShadow: `0 4px 12px ${PRIMARY}4d`, transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Save size={16} /> Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Add Task Modal ─── */}
      {isAddTaskModalOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 1000, padding: '20px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) { setIsAddTaskModalOpen(false); resetNewTaskForm(); } }}
        >
          <div style={{
            background: `linear-gradient(135deg, ${BG_CARD} 0%, #1e293b 100%)`,
            borderRadius: '20px', maxWidth: '500px', width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: `1px solid ${PRIMARY}33`,
          }}>
            {/* Header */}
            <div style={{
              padding: '24px 28px', borderBottom: `1px solid ${BORDER_COLOR}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'white' }}>
                Nouvelle tache
              </h2>
              <button
                onClick={() => { setIsAddTaskModalOpen(false); resetNewTaskForm(); }}
                style={{
                  padding: '8px', border: 'none', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)', color: 'white',
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Titre *</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Nom de la tache"
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '8px',
                    border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                    color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date de debut</label>
                  <input
                    type="date"
                    value={newTaskStartDate}
                    onChange={(e) => setNewTaskStartDate(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px',
                      border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                      color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                      colorScheme: 'dark',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date de fin</label>
                  <input
                    type="date"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px',
                      border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                      color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                      colorScheme: 'dark',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Duree (jours)</label>
                  <input
                    type="number"
                    value={newTaskDuration}
                    onChange={(e) => setNewTaskDuration(e.target.value)}
                    placeholder="5"
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px',
                      border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                      color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Heures estimees</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newTaskEstimatedHours}
                    onChange={(e) => setNewTaskEstimatedHours(e.target.value)}
                    placeholder="8"
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px',
                      border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                      color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Priorite</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setNewTaskPriority(key)}
                      style={{
                        padding: '6px 14px', borderRadius: '6px', border: 'none',
                        background: newTaskPriority === key ? `${PRIORITY_COLORS[key]}33` : 'rgba(255,255,255,0.05)',
                        color: newTaskPriority === key ? PRIORITY_COLORS[key] : 'rgba(255,255,255,0.5)',
                        fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                        outline: newTaskPriority === key ? `2px solid ${PRIORITY_COLORS[key]}` : 'none',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {sections.length > 0 && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Section</label>
                  <select
                    value={newTaskSectionId}
                    onChange={(e) => setNewTaskSectionId(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px',
                      border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                      color: 'white', fontSize: '13px', outline: 'none', appearance: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                  >
                    <option value="" style={{ background: '#1e293b' }}>Sans section</option>
                    {sections.map(s => (
                      <option key={s.id} value={s.id} style={{ background: '#1e293b' }}>{s.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: '20px 28px', borderTop: `1px solid ${BORDER_COLOR}`,
              display: 'flex', gap: '12px', justifyContent: 'flex-end',
            }}>
              <button
                onClick={() => { setIsAddTaskModalOpen(false); resetNewTaskForm(); }}
                style={{
                  padding: '10px 24px', borderRadius: '8px',
                  border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                  color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                }}
              >
                Annuler
              </button>
              <button
                onClick={handleCreateTask}
                disabled={!newTaskTitle.trim()}
                style={{
                  padding: '10px 32px', borderRadius: '8px', border: 'none',
                  background: newTaskTitle.trim()
                    ? `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`
                    : 'rgba(255,255,255,0.1)',
                  color: newTaskTitle.trim() ? 'white' : 'rgba(255,255,255,0.3)',
                  fontSize: '13px', fontWeight: 700,
                  cursor: newTaskTitle.trim() ? 'pointer' : 'not-allowed',
                  boxShadow: newTaskTitle.trim() ? `0 4px 12px ${PRIMARY}4d` : 'none',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}
              >
                <Plus size={16} /> Creer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Create Section Modal ─── */}
      {isSectionModalOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 1000, padding: '20px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsSectionModalOpen(false); }}
        >
          <div style={{
            background: `linear-gradient(135deg, ${BG_CARD} 0%, #1e293b 100%)`,
            borderRadius: '20px', maxWidth: '450px', width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: `1px solid ${PRIMARY}33`,
          }}>
            <div style={{
              padding: '24px 28px', borderBottom: `1px solid ${BORDER_COLOR}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'white' }}>Nouvelle section</h2>
              <button
                onClick={() => setIsSectionModalOpen(false)}
                style={{
                  padding: '8px', border: 'none', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)', color: 'white',
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nom *</label>
                <input
                  type="text"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  placeholder="Ex: Phase de design"
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '8px',
                    border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                    color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Couleur</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[PRIMARY, '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#ef4444', '#84cc16'].map(color => (
                    <div
                      key={color}
                      onClick={() => setNewSectionColor(color)}
                      style={{
                        width: '36px', height: '36px', borderRadius: '8px',
                        background: color, cursor: 'pointer',
                        border: newSectionColor === color ? '3px solid white' : '2px solid rgba(255,255,255,0.15)',
                        transition: 'all 0.2s',
                        boxShadow: newSectionColor === color ? `0 0 12px ${color}80` : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              padding: '20px 28px', borderTop: `1px solid ${BORDER_COLOR}`,
              display: 'flex', gap: '12px', justifyContent: 'flex-end',
            }}>
              <button
                onClick={() => setIsSectionModalOpen(false)}
                style={{
                  padding: '10px 24px', borderRadius: '8px',
                  border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                  color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                }}
              >
                Annuler
              </button>
              <button
                onClick={handleCreateSection}
                disabled={!newSectionName.trim()}
                style={{
                  padding: '10px 32px', borderRadius: '8px', border: 'none',
                  background: newSectionName.trim()
                    ? `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`
                    : 'rgba(255,255,255,0.1)',
                  color: newSectionName.trim() ? 'white' : 'rgba(255,255,255,0.3)',
                  fontSize: '13px', fontWeight: 700,
                  cursor: newSectionName.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                Creer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Create Milestone Modal ─── */}
      {isMilestoneModalOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 1000, padding: '20px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsMilestoneModalOpen(false); }}
        >
          <div style={{
            background: `linear-gradient(135deg, ${BG_CARD} 0%, #1e293b 100%)`,
            borderRadius: '20px', maxWidth: '450px', width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: `1px solid ${PRIMARY}33`,
          }}>
            <div style={{
              padding: '24px 28px', borderBottom: `1px solid ${BORDER_COLOR}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Diamond size={20} color="#ef4444" />
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'white' }}>Nouveau jalon</h2>
              </div>
              <button
                onClick={() => setIsMilestoneModalOpen(false)}
                style={{
                  padding: '8px', border: 'none', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)', color: 'white',
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nom *</label>
                <input
                  type="text"
                  value={newMilestoneName}
                  onChange={(e) => setNewMilestoneName(e.target.value)}
                  placeholder="Ex: Livraison v1"
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '8px',
                    border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                    color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date *</label>
                <input
                  type="date"
                  value={newMilestoneDate}
                  onChange={(e) => setNewMilestoneDate(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '8px',
                    border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                    color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                    colorScheme: 'dark',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = PRIMARY; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = BORDER_COLOR; }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Couleur</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {['#ef4444', '#f59e0b', '#10b981', PRIMARY, '#8b5cf6', '#ec4899', '#06b6d4'].map(color => (
                    <div
                      key={color}
                      onClick={() => setNewMilestoneColor(color)}
                      style={{
                        width: '36px', height: '36px', borderRadius: '8px',
                        background: color, cursor: 'pointer',
                        border: newMilestoneColor === color ? '3px solid white' : '2px solid rgba(255,255,255,0.15)',
                        transition: 'all 0.2s',
                        boxShadow: newMilestoneColor === color ? `0 0 12px ${color}80` : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              padding: '20px 28px', borderTop: `1px solid ${BORDER_COLOR}`,
              display: 'flex', gap: '12px', justifyContent: 'flex-end',
            }}>
              <button
                onClick={() => setIsMilestoneModalOpen(false)}
                style={{
                  padding: '10px 24px', borderRadius: '8px',
                  border: `1px solid ${BORDER_COLOR}`, background: 'rgba(255,255,255,0.05)',
                  color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                }}
              >
                Annuler
              </button>
              <button
                onClick={handleCreateMilestone}
                disabled={!newMilestoneName.trim() || !newMilestoneDate}
                style={{
                  padding: '10px 32px', borderRadius: '8px', border: 'none',
                  background: (newMilestoneName.trim() && newMilestoneDate)
                    ? `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`
                    : 'rgba(255,255,255,0.1)',
                  color: (newMilestoneName.trim() && newMilestoneDate) ? 'white' : 'rgba(255,255,255,0.3)',
                  fontSize: '13px', fontWeight: 700,
                  cursor: (newMilestoneName.trim() && newMilestoneDate) ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}
              >
                <Diamond size={16} /> Creer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
