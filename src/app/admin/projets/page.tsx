'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import Link from 'next/link';
import {
  LayoutGrid,
  Table as TableIcon,
  Plus,
  Search,
  Filter,
  X,
  Calendar,
  Clock,
  User,
  FolderOpen,
  ChevronRight,
  Edit3,
  Trash2,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Pause,
  XCircle,
  Loader2,
  ArrowUpRight,
} from 'lucide-react';

// ── Types ──
type ProjectStatus = 'planification' | 'en_cours' | 'tests' | 'livre' | 'en_pause' | 'annule';
type ProjectPriority = 'low' | 'medium' | 'high' | 'urgent';

interface Contact {
  id: string;
  name: string;
  email: string | null;
  type: string;
}

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  progress: number;
  priority: ProjectPriority;
  projectType: string | null;
  estimatedBudget: number | null;
  actualBudget: number | null;
  startDate: string | null;
  endDate: string | null;
  technologies: string | null;
  notes: string | null;
  contactId: string | null;
  contact: Contact | null;
  _count?: {
    tasks: number;
    milestones: number;
    documents: number;
  };
  _taskStats?: {
    total: number;
    completed: number;
  };
  createdAt: string;
  updatedAt: string;
}

// ── Status & Priority configs ──
const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; bgColor: string }> = {
  planification: { label: 'Planification', color: '#94a3b8', bgColor: 'rgba(148,163,184,0.15)' },
  en_cours: { label: 'En cours', color: '#638BFF', bgColor: 'rgba(99,139,255,0.15)' },
  tests: { label: 'Tests', color: '#f59e0b', bgColor: 'rgba(245,158,11,0.15)' },
  livre: { label: 'Livre', color: '#10b981', bgColor: 'rgba(16,185,129,0.15)' },
  en_pause: { label: 'En pause', color: '#64748b', bgColor: 'rgba(100,116,139,0.15)' },
  annule: { label: 'Annule', color: '#ef4444', bgColor: 'rgba(239,68,68,0.15)' },
};

const PRIORITY_CONFIG: Record<ProjectPriority, { label: string; color: string; bgColor: string }> = {
  low: { label: 'Basse', color: '#94a3b8', bgColor: 'rgba(148,163,184,0.15)' },
  medium: { label: 'Moyenne', color: '#638BFF', bgColor: 'rgba(99,139,255,0.15)' },
  high: { label: 'Haute', color: '#f59e0b', bgColor: 'rgba(245,158,11,0.15)' },
  urgent: { label: 'Urgente', color: '#ef4444', bgColor: 'rgba(239,68,68,0.15)' },
};

const PROJECT_TYPES = [
  { value: 'site-vitrine', label: 'Site Vitrine' },
  { value: 'e-commerce', label: 'E-Commerce' },
  { value: 'application-web', label: 'Application Web' },
  { value: 'application-mobile', label: 'Application Mobile' },
  { value: 'design-graphique', label: 'Design Graphique' },
  { value: 'branding', label: 'Branding' },
  { value: 'seo', label: 'SEO' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'autre', label: 'Autre' },
];

// ── SVG Status Icons ──
const StatusIcons: Record<ProjectStatus, () => React.ReactElement> = {
  planification: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </svg>
  ),
  en_cours: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  ),
  tests: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 11-6 6v3h9l3-3" />
      <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
      <path d="M18 5v4" />
      <path d="M20 7h-4" />
    </svg>
  ),
  livre: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  en_pause: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
  annule: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};

// ── Input style overrides ──
const inputStyles = `
  input::placeholder { color: rgba(255, 255, 255, 0.4); }
  select option { background-color: #0d1321; color: white; }
  textarea::placeholder { color: rgba(255, 255, 255, 0.4); }
`;

// ══════════════════════════════════════════════
// Main Page Component
// ══════════════════════════════════════════════
export default function ProjectsPage() {
  const { sidebarWidth, isMobile } = useSidebar();

  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<ProjectPriority | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [clientFilter, setClientFilter] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // ── Data fetching ──
  const fetchProjects = useCallback(() => {
    setLoading(true);
    fetch('/api/projects')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const fetchContacts = useCallback(() => {
    fetch('/api/contacts')
      .then(res => res.ok ? res.json() : [])
      .then(data => setContacts(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchContacts();
  }, [fetchProjects, fetchContacts]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clientId = params.get('client');
    if (clientId) setClientFilter(clientId);
  }, []);

  // ── Filtering ──
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];
    if (clientFilter) filtered = filtered.filter(p => p.contactId === clientFilter);
    if (statusFilter !== 'all') filtered = filtered.filter(p => p.status === statusFilter);
    if (priorityFilter !== 'all') filtered = filtered.filter(p => p.priority === priorityFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.contact && p.contact.name.toLowerCase().includes(q))
      );
    }
    filtered.sort((a, b) => a.progress - b.progress);
    return filtered;
  }, [projects, statusFilter, priorityFilter, searchQuery, clientFilter]);

  // ── Helpers ──
  const getProgressColor = (progress: number) => {
    if (progress < 30) return '#ef4444';
    if (progress < 70) return '#f59e0b';
    return '#10b981';
  };

  const formatBudget = (amount: number | null) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setShowDetailModal(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Etes-vous sur de vouloir supprimer ce projet ?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setShowDetailModal(false);
        setSelectedProject(null);
        fetchProjects();
      }
    } catch {
      // silent
    }
  };

  return (
    <>
      <style>{inputStyles}</style>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0e1a' }}>
        <AdminSidebar />

        <div style={{
          flex: 1,
          marginLeft: isMobile ? '0' : `${sidebarWidth}px`,
          padding: '0',
          transition: 'margin-left 0.3s ease'
        }}>
          {/* ── Header with Stats ── */}
          <div style={{
            background: '#0a0e1a',
            padding: isMobile ? '80px 16px 32px 16px' : '40px 40px 32px 40px',
            color: 'white'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)',
                boxShadow: '0 0 12px rgba(99,139,255,0.4)'
              }} />
              <div style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(90deg, rgba(99,139,255,0.3) 0%, transparent 100%)'
              }} />
              <span style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.4)',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }}>
                Projets
              </span>
            </div>

            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px'
            }}>
              {(Object.keys(STATUS_CONFIG) as ProjectStatus[]).map(status => {
                const count = projects.filter(p => p.status === status).length;
                return (
                  <div
                    key={status}
                    onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
                    style={{
                      background: statusFilter === status ? `${STATUS_CONFIG[status].color}20` : 'rgba(255,255,255,0.05)',
                      padding: '16px',
                      borderRadius: '8px',
                      border: statusFilter === status ? `1px solid ${STATUS_CONFIG[status].color}40` : '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{
                      marginBottom: '12px',
                      color: STATUS_CONFIG[status].color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {StatusIcons[status]()}
                    </div>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      marginBottom: '4px',
                      textAlign: 'left'
                    }}>
                      {count}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.7)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      textAlign: 'left'
                    }}>
                      {STATUS_CONFIG[status].label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Client Filter Banner ── */}
          {clientFilter && (
            <div style={{
              background: 'linear-gradient(to right, rgba(99,139,255,0.1), rgba(99,139,255,0.05))',
              padding: isMobile ? '16px' : '16px 40px',
              borderBottom: '1px solid rgba(99,139,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '14px', color: '#638BFF', fontWeight: 600 }}>
                  Projets filtres par client
                </span>
                {filteredProjects.length > 0 && filteredProjects[0].contact && (
                  <span style={{ fontSize: '14px', color: 'white', fontWeight: 700 }}>
                    {filteredProjects[0].contact.name}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setClientFilter('');
                  window.history.pushState({}, '', '/admin/projets');
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(99,139,255,0.3)',
                  background: 'rgba(99,139,255,0.2)',
                  color: '#638BFF',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Voir tous les projets
              </button>
            </div>
          )}

          {/* ── Filters Bar ── */}
          <div style={{
            background: '#0a0e1a',
            padding: isMobile ? '16px' : '24px 40px',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              {/* Search */}
              <div style={{ flex: '1 1 280px', position: 'relative' }}>
                <Search
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255,255,255,0.5)'
                  }}
                />
                <input
                  type="text"
                  placeholder="Rechercher un projet, client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 44px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.3s',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'white'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#638BFF';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(99,139,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* View Toggle */}
              <div style={{
                display: 'flex',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                padding: '4px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <button
                  onClick={() => setViewMode('table')}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: viewMode === 'table' ? '#638BFF' : 'transparent',
                    color: viewMode === 'table' ? 'white' : 'rgba(255,255,255,0.7)',
                    transition: 'all 0.2s'
                  }}
                >
                  <TableIcon size={16} />
                  {!isMobile && 'Tableau'}
                </button>
                <button
                  onClick={() => setViewMode('kanban')}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: viewMode === 'kanban' ? '#638BFF' : 'transparent',
                    color: viewMode === 'kanban' ? 'white' : 'rgba(255,255,255,0.7)',
                    transition: 'all 0.2s'
                  }}
                >
                  <LayoutGrid size={16} />
                  {!isMobile && 'Kanban'}
                </button>
              </div>

              {/* Priority Filter */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Filter size={18} style={{ color: 'rgba(255,255,255,0.5)' }} />
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value as ProjectPriority | 'all')}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    outline: 'none',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'white'
                  }}
                >
                  <option value="all">Toutes priorites</option>
                  {(Object.keys(PRIORITY_CONFIG) as ProjectPriority[]).map(p => (
                    <option key={p} value={p}>{PRIORITY_CONFIG[p].label}</option>
                  ))}
                </select>
              </div>

              {/* Create Button */}
              <button
                onClick={() => setShowCreateModal(true)}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(99,139,255,0.3)',
                  transition: 'all 0.2s'
                }}
              >
                <Plus size={18} />
                Nouveau Projet
              </button>
            </div>
          </div>

          {/* ── Content ── */}
          <div style={{
            padding: isMobile ? '24px 16px' : '32px 40px',
            background: '#0a0e1a',
            minHeight: 'calc(100vh - 450px)'
          }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                Chargement des projets...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <FolderOpen size={48} style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }} />
                <h3 style={{ color: 'white', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                  Aucun projet trouve
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '24px' }}>
                  {projects.length === 0 ? 'Creez votre premier projet pour commencer' : 'Modifiez vos filtres pour voir plus de projets'}
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 600,
                    background: '#638BFF',
                    color: 'white',
                    transition: 'transform 0.2s'
                  }}
                >
                  Creer un projet
                </button>
              </div>
            ) : viewMode === 'table' ? (
              <TableView
                projects={filteredProjects}
                onSelectProject={handleSelectProject}
                formatBudget={formatBudget}
                getProgressColor={getProgressColor}
                isMobile={isMobile}
              />
            ) : (
              <KanbanView
                projects={filteredProjects}
                onSelectProject={handleSelectProject}
                formatBudget={formatBudget}
                getProgressColor={getProgressColor}
              />
            )}
          </div>
        </div>

        {/* ── Create Modal ── */}
        {showCreateModal && (
          <CreateProjectModal
            contacts={contacts}
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {
              setShowCreateModal(false);
              fetchProjects();
            }}
          />
        )}

        {/* ── Detail Modal ── */}
        {showDetailModal && selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            contacts={contacts}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedProject(null);
            }}
            onUpdate={() => fetchProjects()}
            onDelete={handleDeleteProject}
          />
        )}
      </div>
    </>
  );
}


// ══════════════════════════════════════════════
// Table View Component
// ══════════════════════════════════════════════
function TableView({
  projects,
  onSelectProject,
  formatBudget,
  getProgressColor,
  isMobile,
}: {
  projects: Project[];
  onSelectProject: (p: Project) => void;
  formatBudget: (amount: number | null) => string;
  getProgressColor: (progress: number) => string;
  isMobile: boolean;
}) {
  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {projects.map((project) => (
          <div key={project.id} onClick={() => onSelectProject(project)}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '16px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'white', flex: 1 }}>{project.name}</span>
              <span style={{
                padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
                color: STATUS_CONFIG[project.status]?.color || '#94a3b8',
                backgroundColor: STATUS_CONFIG[project.status]?.bgColor || 'rgba(148,163,184,0.15)',
              }}>
                {STATUS_CONFIG[project.status]?.label || project.status}
              </span>
            </div>
            {project.contact && (
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
                {project.contact.name}
              </div>
            )}
            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Progression</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: getProgressColor(project.progress) }}>{project.progress}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', position: 'relative' as const }}>
                <div style={{ position: 'absolute' as const, top: 0, left: 0, height: '100%', width: `${project.progress}%`, background: getProgressColor(project.progress), borderRadius: '3px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                padding: '3px 8px', borderRadius: '8px', fontSize: '10px', fontWeight: 600,
                color: PRIORITY_CONFIG[project.priority]?.color || '#94a3b8',
                backgroundColor: PRIORITY_CONFIG[project.priority]?.bgColor || 'rgba(148,163,184,0.15)',
              }}>
                {PRIORITY_CONFIG[project.priority]?.label || project.priority}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>{formatBudget(project.estimatedBudget)}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
      background: 'rgba(255,255,255,0.03)',
    }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '800px' : 'auto' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
              {['Projet', 'Client', 'Statut', 'Progression', 'Priorite', 'Budget'].map(h => (
                <th key={h} style={{
                  padding: '16px 24px',
                  textAlign: h === 'Budget' ? 'right' : 'left',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  whiteSpace: 'nowrap'
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                onClick={() => onSelectProject(project)}
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(99,139,255,0.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {/* Project name */}
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ fontWeight: 600, color: 'white', fontSize: '14px', marginBottom: '4px' }}>
                    {project.name}
                  </div>
                  {project.projectType && (
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#638BFF',
                      background: 'rgba(99,139,255,0.15)',
                      marginRight: '6px'
                    }}>
                      {PROJECT_TYPES.find(t => t.value === project.projectType)?.label || project.projectType}
                    </span>
                  )}
                  {project.description && (
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.5)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '300px',
                      marginTop: '4px'
                    }}>
                      {project.description}
                    </div>
                  )}
                </td>
                {/* Client */}
                <td style={{ padding: '20px 24px' }}>
                  {project.contact ? (
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                        {project.contact.name}
                      </div>
                      {project.contact.email && (
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                          {project.contact.email}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>-</span>
                  )}
                </td>
                {/* Status */}
                <td style={{ padding: '20px 24px' }}>
                  <span style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: STATUS_CONFIG[project.status]?.color || '#94a3b8',
                    backgroundColor: STATUS_CONFIG[project.status]?.bgColor || 'rgba(148,163,184,0.15)',
                    display: 'inline-block',
                    whiteSpace: 'nowrap'
                  }}>
                    {STATUS_CONFIG[project.status]?.label || project.status}
                  </span>
                </td>
                {/* Progress */}
                <td style={{ padding: '20px 24px', minWidth: '160px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      flex: 1,
                      height: '8px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${project.progress}%`,
                        background: getProgressColor(project.progress),
                        transition: 'width 0.3s ease',
                        borderRadius: '4px'
                      }} />
                    </div>
                    <span style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: getProgressColor(project.progress),
                      minWidth: '40px',
                      textAlign: 'right'
                    }}>
                      {project.progress}%
                    </span>
                  </div>
                </td>
                {/* Priority */}
                <td style={{ padding: '20px 24px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: PRIORITY_CONFIG[project.priority]?.color || '#94a3b8',
                    backgroundColor: PRIORITY_CONFIG[project.priority]?.bgColor || 'rgba(148,163,184,0.15)',
                    whiteSpace: 'nowrap'
                  }}>
                    {PRIORITY_CONFIG[project.priority]?.label || project.priority}
                  </span>
                </td>
                {/* Budget */}
                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>
                    {formatBudget(project.estimatedBudget)}
                  </div>
                  {project.actualBudget != null && project.actualBudget > 0 && (
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                      Reel: {formatBudget(project.actualBudget)}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// ══════════════════════════════════════════════
// Kanban View Component
// ══════════════════════════════════════════════
function KanbanView({
  projects,
  onSelectProject,
  formatBudget,
  getProgressColor,
}: {
  projects: Project[];
  onSelectProject: (p: Project) => void;
  formatBudget: (amount: number | null) => string;
  getProgressColor: (progress: number) => string;
}) {
  const statuses: ProjectStatus[] = ['planification', 'en_cours', 'tests', 'livre', 'en_pause', 'annule'];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px'
    }}>
      {statuses.map(status => {
        const statusProjects = projects.filter(p => p.status === status);
        return (
          <div
            key={status}
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '8px',
              padding: '16px',
              minHeight: '400px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            {/* Column Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: `2px solid ${STATUS_CONFIG[status].color}30`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: STATUS_CONFIG[status].color
                }} />
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: 0
                }}>
                  {STATUS_CONFIG[status].label}
                </h3>
              </div>
              <span style={{
                background: STATUS_CONFIG[status].bgColor,
                color: STATUS_CONFIG[status].color,
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700
              }}>
                {statusProjects.length}
              </span>
            </div>

            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {statusProjects.map(project => (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,139,255,0.2)';
                    e.currentTarget.style.borderColor = '#638BFF40';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                >
                  {/* Name & Type */}
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4px' }}>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'white',
                        margin: 0,
                        flex: 1,
                        lineHeight: '1.3'
                      }}>
                        {project.name}
                      </h4>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '8px',
                        fontSize: '10px',
                        fontWeight: 600,
                        color: PRIORITY_CONFIG[project.priority]?.color || '#94a3b8',
                        backgroundColor: PRIORITY_CONFIG[project.priority]?.bgColor || 'rgba(148,163,184,0.15)',
                        marginLeft: '8px',
                        whiteSpace: 'nowrap'
                      }}>
                        {PRIORITY_CONFIG[project.priority]?.label || project.priority}
                      </span>
                    </div>
                    {project.projectType && (
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '9px',
                        fontWeight: 700,
                        color: '#638BFF',
                        backgroundColor: 'rgba(99,139,255,0.15)',
                        border: '1px solid rgba(99,139,255,0.2)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {PROJECT_TYPES.find(t => t.value === project.projectType)?.label || project.projectType}
                      </span>
                    )}
                    {project.description && (
                      <p style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.5)',
                        margin: '6px 0 0 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* Progress */}
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Progression</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: getProgressColor(project.progress) }}>
                        {project.progress}%
                      </span>
                    </div>
                    <div style={{
                      height: '6px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${project.progress}%`,
                        background: getProgressColor(project.progress),
                        transition: 'width 0.3s ease',
                        borderRadius: '3px'
                      }} />
                    </div>
                  </div>

                  {/* Dates */}
                  {(project.startDate || project.endDate) && (
                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      marginBottom: '10px',
                      fontSize: '10px',
                      color: 'rgba(255,255,255,0.5)'
                    }}>
                      {project.startDate && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={10} />
                          Debut: {new Date(project.startDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                        </div>
                      )}
                      {project.endDate && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: new Date(project.endDate) < new Date() && project.status !== 'livre' ? '#ef4444' : 'rgba(255,255,255,0.5)'
                        }}>
                          <Calendar size={10} />
                          Fin: {new Date(project.endDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                          {new Date(project.endDate) < new Date() && project.status !== 'livre' && (
                            <span style={{
                              padding: '1px 5px',
                              borderRadius: '4px',
                              backgroundColor: 'rgba(239,68,68,0.2)',
                              fontSize: '8px',
                              fontWeight: 700,
                              color: '#ef4444',
                              marginLeft: '2px'
                            }}>
                              RETARD
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(255,255,255,0.06)'
                  }}>
                    <div>
                      {project.contact ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <User size={11} style={{ color: 'rgba(255,255,255,0.5)' }} />
                          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                            {project.contact.name}
                          </span>
                          {project.contact.type && (
                            <span style={{
                              padding: '1px 5px',
                              borderRadius: '4px',
                              fontSize: '8px',
                              fontWeight: 600,
                              color: project.contact.type === 'entreprise' ? '#638BFF' : '#a78bfa',
                              backgroundColor: project.contact.type === 'entreprise' ? 'rgba(99,139,255,0.15)' : 'rgba(167,139,250,0.15)',
                              border: `1px solid ${project.contact.type === 'entreprise' ? 'rgba(99,139,255,0.3)' : 'rgba(167,139,250,0.3)'}`
                            }}>
                              {project.contact.type === 'entreprise' ? 'ENT' : 'PART'}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Aucun client</span>
                      )}
                      {project.estimatedBudget != null && project.estimatedBudget > 0 && (
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#638BFF', marginTop: '4px' }}>
                          {formatBudget(project.estimatedBudget)}
                        </div>
                      )}
                    </div>

                    {/* Tasks count */}
                    {project._count && project._count.tasks > 0 && (
                      <span style={{
                        fontSize: '10px',
                        color: 'rgba(255,255,255,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <CheckCircle size={10} />
                        {project._count.tasks} taches
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {statusProjects.length === 0 && (
                <div style={{
                  padding: '32px 16px',
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '12px'
                }}>
                  Aucun projet
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}


// ══════════════════════════════════════════════
// Create Project Modal
// ══════════════════════════════════════════════
function CreateProjectModal({
  contacts,
  onClose,
  onSuccess,
}: {
  contacts: Contact[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    status: 'planification' as ProjectStatus,
    priority: 'medium' as ProjectPriority,
    projectType: '',
    contactId: '',
    technologies: '',
    startDate: '',
    endDate: '',
    estimatedBudget: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          estimatedBudget: form.estimatedBudget ? parseFloat(form.estimatedBudget) : null,
          contactId: form.contactId || null,
          technologies: form.technologies || null,
          startDate: form.startDate || null,
          endDate: form.endDate || null,
        }),
      });
      if (res.ok) {
        onSuccess();
      }
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  };

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: 'white',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '6px',
    display: 'block',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #0d1321 0%, #0a1628 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          width: '100%',
          maxWidth: '640px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'white', margin: 0 }}>Nouveau Projet</h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: '4px 0 0 0' }}>
              Remplissez les informations du projet
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Name - full width */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Nom du projet *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Site Web Entreprise XYZ"
                style={fieldStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = '#638BFF'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            {/* Description - full width */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Description du projet..."
                rows={3}
                style={{ ...fieldStyle, resize: 'vertical' }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#638BFF'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            {/* Client */}
            <div>
              <label style={labelStyle}>Client</label>
              <select
                value={form.contactId}
                onChange={e => setForm({ ...form, contactId: e.target.value })}
                style={fieldStyle}
              >
                <option value="">Aucun client</option>
                {contacts.map(c => (
                  <option key={c.id} value={c.id}>{c.name} {c.email ? `(${c.email})` : ''}</option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label style={labelStyle}>Type de projet</label>
              <select
                value={form.projectType}
                onChange={e => setForm({ ...form, projectType: e.target.value })}
                style={fieldStyle}
              >
                <option value="">Non defini</option>
                {PROJECT_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label style={labelStyle}>Statut</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value as ProjectStatus })}
                style={fieldStyle}
              >
                {(Object.keys(STATUS_CONFIG) as ProjectStatus[]).map(s => (
                  <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label style={labelStyle}>Priorite</label>
              <select
                value={form.priority}
                onChange={e => setForm({ ...form, priority: e.target.value as ProjectPriority })}
                style={fieldStyle}
              >
                {(Object.keys(PRIORITY_CONFIG) as ProjectPriority[]).map(p => (
                  <option key={p} value={p}>{PRIORITY_CONFIG[p].label}</option>
                ))}
              </select>
            </div>

            {/* Technologies */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Technologies</label>
              <input
                type="text"
                value={form.technologies}
                onChange={e => setForm({ ...form, technologies: e.target.value })}
                placeholder="Ex: Next.js, React, Tailwind CSS..."
                style={fieldStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = '#638BFF'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            {/* Start Date */}
            <div>
              <label style={labelStyle}>Date de debut</label>
              <input
                type="date"
                value={form.startDate}
                onChange={e => setForm({ ...form, startDate: e.target.value })}
                style={{ ...fieldStyle, colorScheme: 'dark' }}
              />
            </div>

            {/* End Date */}
            <div>
              <label style={labelStyle}>Date de fin</label>
              <input
                type="date"
                value={form.endDate}
                onChange={e => setForm({ ...form, endDate: e.target.value })}
                style={{ ...fieldStyle, colorScheme: 'dark' }}
              />
            </div>

            {/* Budget */}
            <div>
              <label style={labelStyle}>Budget estime (EUR)</label>
              <input
                type="number"
                value={form.estimatedBudget}
                onChange={e => setForm({ ...form, estimatedBudget: e.target.value })}
                placeholder="0.00"
                style={fieldStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = '#638BFF'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            {/* Notes */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Notes</label>
              <textarea
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                placeholder="Notes internes..."
                rows={2}
                style={{ ...fieldStyle, resize: 'vertical' }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#638BFF'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.08)'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving || !form.name.trim()}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                background: saving || !form.name.trim() ? 'rgba(99,139,255,0.3)' : 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                cursor: saving || !form.name.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {saving && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
              {saving ? 'Creation...' : 'Creer le projet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


// ══════════════════════════════════════════════
// Project Detail Modal
// ══════════════════════════════════════════════
type DetailTab = 'overview' | 'tasks' | 'planning';

function ProjectDetailModal({
  project,
  contacts,
  onClose,
  onUpdate,
  onDelete,
}: {
  project: Project;
  contacts: Contact[];
  onClose: () => void;
  onUpdate: () => void;
  onDelete: (id: string) => void;
}) {
  const { isMobile } = useSidebar();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [taskProgress, setTaskProgress] = useState<{ total: number; completed: number; percent: number } | null>(null);
  const [form, setForm] = useState({
    name: project.name,
    description: project.description || '',
    status: project.status as ProjectStatus,
    priority: project.priority as ProjectPriority,
    projectType: project.projectType || '',
    contactId: project.contactId || '',
    technologies: project.technologies || '',
    startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
    endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
    estimatedBudget: project.estimatedBudget?.toString() || '',
    actualBudget: project.actualBudget?.toString() || '',
    progress: project.progress,
    notes: project.notes || '',
  });

  // ── Fetch tasks to auto-calculate progress ──
  useEffect(() => {
    fetch(`/api/projects/${project.id}/tasks`)
      .then(res => res.ok ? res.json() : [])
      .then((tasks: { status: string }[]) => {
        if (Array.isArray(tasks) && tasks.length > 0) {
          const total = tasks.length;
          const completed = tasks.filter(t => t.status === 'completed').length;
          const percent = Math.round((completed / total) * 100);
          setTaskProgress({ total, completed, percent });
        } else {
          setTaskProgress({ total: 0, completed: 0, percent: 0 });
        }
      })
      .catch(() => setTaskProgress(null));
  }, [project.id]);

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          estimatedBudget: form.estimatedBudget ? parseFloat(form.estimatedBudget) : null,
          actualBudget: form.actualBudget ? parseFloat(form.actualBudget) : null,
          contactId: form.contactId || null,
          technologies: form.technologies || null,
          startDate: form.startDate || null,
          endDate: form.endDate || null,
          progress: Number(form.progress),
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onUpdate();
        onClose();
      }
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  };

  const formatBudget = (amount: number | null) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return '#ef4444';
    if (progress < 70) return '#f59e0b';
    return '#10b981';
  };

  const techList = project.technologies ? project.technologies.split(',').map(t => t.trim()).filter(Boolean) : [];

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: 'white',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '6px',
    display: 'block',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #0d1321 0%, #0a1628 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start'
        }}>
          <div style={{ flex: 1 }}>
            {isEditing ? (
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={{ ...fieldStyle, fontSize: '18px', fontWeight: 700 }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#638BFF'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            ) : (
              <>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'white', margin: '0 0 8px 0' }}>
                  {project.name}
                </h2>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: STATUS_CONFIG[project.status]?.color || '#94a3b8',
                    backgroundColor: STATUS_CONFIG[project.status]?.bgColor || 'rgba(148,163,184,0.15)',
                  }}>
                    {STATUS_CONFIG[project.status]?.label || project.status}
                  </span>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: PRIORITY_CONFIG[project.priority]?.color || '#94a3b8',
                    backgroundColor: PRIORITY_CONFIG[project.priority]?.bgColor || 'rgba(148,163,184,0.15)',
                  }}>
                    {PRIORITY_CONFIG[project.priority]?.label || project.priority}
                  </span>
                  {project.projectType && (
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#638BFF',
                      backgroundColor: 'rgba(99,139,255,0.15)',
                    }}>
                      {PROJECT_TYPES.find(t => t.value === project.projectType)?.label || project.projectType}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
            {!isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid rgba(99,139,255,0.3)',
                    background: 'rgba(99,139,255,0.1)',
                    color: '#638BFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  title="Modifier"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => onDelete(project.id)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid rgba(239,68,68,0.3)',
                    background: 'rgba(239,68,68,0.1)',
                    color: '#ef4444',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Tab Navigation ── */}
        {!isEditing && (
          <div style={{
            display: 'flex',
            gap: '0',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            padding: '0 28px',
          }}>
            {([
              { id: 'overview' as DetailTab, label: 'Vue d\'ensemble', icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              ) },
              { id: 'tasks' as DetailTab, label: 'Taches', icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="5" height="18" rx="1"/><rect x="10" y="3" width="5" height="12" rx="1"/><rect x="17" y="3" width="5" height="8" rx="1"/></svg>
              ), badge: taskProgress ? `${taskProgress.completed}/${taskProgress.total}` : undefined },
              { id: 'planning' as DetailTab, label: 'Planning', icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/><rect x="7" y="4" width="6" height="4" fill="currentColor" opacity="0.3"/><rect x="10" y="10" width="8" height="4" fill="currentColor" opacity="0.3"/></svg>
              ) },
            ]).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 20px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #638BFF' : '2px solid transparent',
                  color: activeTab === tab.id ? '#638BFF' : 'rgba(255,255,255,0.5)',
                  fontSize: '13px',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  marginBottom: '-1px',
                }}
                onMouseOver={(e) => { if (activeTab !== tab.id) e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
                onMouseOut={(e) => { if (activeTab !== tab.id) e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>{tab.icon}</span>
                {tab.label}
                {tab.badge && (
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#638BFF',
                    background: 'rgba(99,139,255,0.15)',
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Body */}
        <div style={{ padding: '24px 28px' }}>
          {isEditing ? (
            /* ── Edit Mode ── */
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  style={{ ...fieldStyle, resize: 'vertical' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#638BFF'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div>
                <label style={labelStyle}>Statut</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as ProjectStatus })} style={fieldStyle}>
                  {(Object.keys(STATUS_CONFIG) as ProjectStatus[]).map(s => (
                    <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Priorite</label>
                <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value as ProjectPriority })} style={fieldStyle}>
                  {(Object.keys(PRIORITY_CONFIG) as ProjectPriority[]).map(p => (
                    <option key={p} value={p}>{PRIORITY_CONFIG[p].label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Type de projet</label>
                <select value={form.projectType} onChange={e => setForm({ ...form, projectType: e.target.value })} style={fieldStyle}>
                  <option value="">Non defini</option>
                  {PROJECT_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Client</label>
                <select value={form.contactId} onChange={e => setForm({ ...form, contactId: e.target.value })} style={fieldStyle}>
                  <option value="">Aucun client</option>
                  {contacts.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Progression ({form.progress}%)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={form.progress}
                    onChange={e => setForm({ ...form, progress: parseInt(e.target.value) })}
                    style={{ flex: 1, accentColor: '#638BFF' }}
                  />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: getProgressColor(form.progress), minWidth: '40px', textAlign: 'right' }}>
                    {form.progress}%
                  </span>
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Technologies</label>
                <input
                  type="text"
                  value={form.technologies}
                  onChange={e => setForm({ ...form, technologies: e.target.value })}
                  placeholder="Ex: Next.js, React, Tailwind CSS..."
                  style={fieldStyle}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#638BFF'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div>
                <label style={labelStyle}>Date de debut</label>
                <input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} style={{ ...fieldStyle, colorScheme: 'dark' }} />
              </div>
              <div>
                <label style={labelStyle}>Date de fin</label>
                <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} style={{ ...fieldStyle, colorScheme: 'dark' }} />
              </div>

              <div>
                <label style={labelStyle}>Budget estime (EUR)</label>
                <input type="number" value={form.estimatedBudget} onChange={e => setForm({ ...form, estimatedBudget: e.target.value })} placeholder="0.00" style={fieldStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#638BFF'} onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
              <div>
                <label style={labelStyle}>Budget reel (EUR)</label>
                <input type="number" value={form.actualBudget} onChange={e => setForm({ ...form, actualBudget: e.target.value })} placeholder="0.00" style={fieldStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#638BFF'} onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Notes</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2} style={{ ...fieldStyle, resize: 'vertical' }} onFocus={(e) => e.currentTarget.style.borderColor = '#638BFF'} onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>

              {/* Save / Cancel */}
              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: saving ? 'rgba(99,139,255,0.3)' : 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: saving ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {saving && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </div>
          ) : (
            /* ── View Mode ── */
            <div>
              {/* ── Overview Tab ── */}
              {activeTab === 'overview' && (
              <>
              {/* Progress Bar (prominent) - auto-calculated from tasks */}
              <div style={{
                marginBottom: '24px',
                padding: '20px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                    Progression du projet
                    {taskProgress && taskProgress.total > 0 && (
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginLeft: '8px', fontWeight: 400 }}>
                        ({taskProgress.completed}/{taskProgress.total} taches terminees)
                      </span>
                    )}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: getProgressColor(taskProgress && taskProgress.total > 0 ? taskProgress.percent : project.progress) }}>
                    {taskProgress && taskProgress.total > 0 ? taskProgress.percent : project.progress}%
                  </span>
                </div>
                <div style={{
                  height: '12px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${taskProgress && taskProgress.total > 0 ? taskProgress.percent : project.progress}%`,
                    background: `linear-gradient(90deg, ${getProgressColor(taskProgress && taskProgress.total > 0 ? taskProgress.percent : project.progress)}80, ${getProgressColor(taskProgress && taskProgress.total > 0 ? taskProgress.percent : project.progress)})`,
                    transition: 'width 0.5s ease',
                    borderRadius: '6px'
                  }} />
                </div>
              </div>

              {/* Info Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                {/* Description */}
                {project.description && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Description</label>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                      {project.description}
                    </p>
                  </div>
                )}

                {/* Client */}
                <div>
                  <label style={labelStyle}>Client</label>
                  {project.contact ? (
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>
                        {project.contact.name}
                      </div>
                      {project.contact.email && (
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                          {project.contact.email}
                        </div>
                      )}
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 600,
                        color: project.contact.type === 'entreprise' ? '#638BFF' : '#a78bfa',
                        backgroundColor: project.contact.type === 'entreprise' ? 'rgba(99,139,255,0.15)' : 'rgba(167,139,250,0.15)',
                        display: 'inline-block',
                        marginTop: '4px'
                      }}>
                        {project.contact.type === 'entreprise' ? 'Entreprise' : 'Particulier'}
                      </span>
                    </div>
                  ) : (
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Aucun client</span>
                  )}
                </div>

                {/* Budget */}
                <div>
                  <label style={labelStyle}>Budget</label>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>
                    {formatBudget(project.estimatedBudget)}
                  </div>
                  {project.actualBudget != null && project.actualBudget > 0 && (
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                      Budget reel: {formatBudget(project.actualBudget)}
                    </div>
                  )}
                </div>

                {/* Dates */}
                <div>
                  <label style={labelStyle}>Dates</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {project.startDate && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                        <Clock size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />
                        Debut: {new Date(project.startDate).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                    {project.endDate && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13px',
                        color: new Date(project.endDate) < new Date() && project.status !== 'livre' ? '#ef4444' : 'rgba(255,255,255,0.8)'
                      }}>
                        <Calendar size={14} style={{ color: new Date(project.endDate) < new Date() && project.status !== 'livre' ? '#ef4444' : 'rgba(255,255,255,0.5)' }} />
                        Fin: {new Date(project.endDate).toLocaleDateString('fr-FR')}
                        {new Date(project.endDate) < new Date() && project.status !== 'livre' && (
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(239,68,68,0.2)',
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#ef4444'
                          }}>
                            EN RETARD
                          </span>
                        )}
                      </div>
                    )}
                    {!project.startDate && !project.endDate && (
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Non definies</span>
                    )}
                  </div>
                </div>

                {/* Task / Milestone / Document counts */}
                {project._count && (
                  <div>
                    <label style={labelStyle}>Activite</label>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#638BFF',
                        background: 'rgba(99,139,255,0.15)',
                      }}>
                        {project._count.tasks} taches
                      </span>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#a78bfa',
                        background: 'rgba(167,139,250,0.15)',
                      }}>
                        {project._count.milestones} jalons
                      </span>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#60a5fa',
                        background: 'rgba(96,165,250,0.15)',
                      }}>
                        {project._count.documents} docs
                      </span>
                    </div>
                  </div>
                )}

                {/* Technologies */}
                {techList.length > 0 && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Technologies</label>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {techList.map((tech, i) => (
                        <span key={i} style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#10b981',
                          background: 'rgba(16,185,129,0.1)',
                          border: '1px solid rgba(16,185,129,0.2)',
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {project.notes && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Notes</label>
                    <div style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '8px',
                      padding: '12px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.7)',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {project.notes}
                    </div>
                  </div>
                )}
              </div>

              {/* Meta */}
              <div style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: 'rgba(255,255,255,0.4)'
              }}>
                <span>Cree le {new Date(project.createdAt).toLocaleDateString('fr-FR')}</span>
                <span>Mis a jour le {new Date(project.updatedAt).toLocaleDateString('fr-FR')}</span>
              </div>
              </>
              )}

              {/* ── Tasks Tab ── */}
              {activeTab === 'tasks' && (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '16px',
                    background: 'rgba(99,139,255,0.1)', border: '1px solid rgba(99,139,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px auto',
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#638BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="5" height="18" rx="1"/><rect x="10" y="3" width="5" height="12" rx="1"/><rect x="17" y="3" width="5" height="8" rx="1"/>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', margin: '0 0 8px 0' }}>
                    Tableau Kanban
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: '0 0 24px 0', lineHeight: '1.5' }}>
                    Gerez les taches de ce projet avec le tableau Kanban.
                    {taskProgress && taskProgress.total > 0 && (
                      <><br /><span style={{ color: '#638BFF', fontWeight: 600 }}>{taskProgress.completed}/{taskProgress.total} taches terminees ({taskProgress.percent}%)</span></>
                    )}
                  </p>
                  <Link href={`/admin/kanban?project=${project.id}`} style={{ textDecoration: 'none' }}>
                    <button style={{
                      padding: '12px 28px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(99,139,255,0.3)',
                      transition: 'all 0.2s',
                    }}>
                      <LayoutGrid size={16} />
                      Ouvrir le Kanban
                      <ArrowUpRight size={14} />
                    </button>
                  </Link>
                </div>
              )}

              {/* ── Planning Tab ── */}
              {activeTab === 'planning' && (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '16px',
                    background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px auto',
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2">
                      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                      <rect x="7" y="4" width="6" height="4" fill="#ec4899" opacity="0.3"/><rect x="10" y="10" width="8" height="4" fill="#ec4899" opacity="0.3"/>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', margin: '0 0 8px 0' }}>
                    Diagramme de Gantt
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: '0 0 24px 0', lineHeight: '1.5' }}>
                    Visualisez le planning du projet avec le diagramme de Gantt.
                    {project._count && project._count.milestones > 0 && (
                      <><br /><span style={{ color: '#a78bfa', fontWeight: 600 }}>{project._count.milestones} jalons definis</span></>
                    )}
                  </p>
                  <Link href={`/admin/gantt?project=${project.id}`} style={{ textDecoration: 'none' }}>
                    <button style={{
                      padding: '12px 28px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(236,72,153,0.3)',
                      transition: 'all 0.2s',
                    }}>
                      <Calendar size={16} />
                      Ouvrir le Gantt
                      <ArrowUpRight size={14} />
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
