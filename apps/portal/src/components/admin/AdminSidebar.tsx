'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAgencySidebar } from './SidebarContext';
import { useEffect, type ReactNode } from 'react';
import {
  LayoutDashboard, BarChart3, Users, UserCheck, FolderKanban,
  Trello, GanttChart, FileText, Mail, Calendar, Settings, LogOut, Menu, X,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    title: 'Pilotage',
    items: [
      { href: '/admin', label: 'Tableau de bord', icon: <LayoutDashboard size={16} strokeWidth={1.75} /> },
      { href: '/admin/analytics', label: 'Analytics', icon: <BarChart3 size={16} strokeWidth={1.75} /> },
    ],
  },
  {
    title: 'Contacts',
    items: [
      { href: '/admin/leads', label: 'Leads', icon: <Users size={16} strokeWidth={1.75} /> },
      { href: '/admin/clients', label: 'Clients', icon: <UserCheck size={16} strokeWidth={1.75} /> },
    ],
  },
  {
    title: 'Projets',
    items: [
      { href: '/admin/projets', label: 'Projets', icon: <FolderKanban size={16} strokeWidth={1.75} /> },
      { href: '/admin/kanban', label: 'Kanban', icon: <Trello size={16} strokeWidth={1.75} /> },
      { href: '/admin/gantt', label: 'Gantt', icon: <GanttChart size={16} strokeWidth={1.75} /> },
      { href: '/admin/brief', label: 'Briefs', icon: <FileText size={16} strokeWidth={1.75} /> },
    ],
  },
  {
    title: 'Communication',
    items: [
      { href: '/admin/documents', label: 'Documents', icon: <FileText size={16} strokeWidth={1.75} /> },
      { href: '/admin/emails', label: 'Emails', icon: <Mail size={16} strokeWidth={1.75} /> },
      { href: '/admin/calendar', label: 'Calendrier', icon: <Calendar size={16} strokeWidth={1.75} /> },
    ],
  },
  {
    title: 'Système',
    items: [
      { href: '/admin/parametres', label: 'Paramètres', icon: <Settings size={16} strokeWidth={1.75} /> },
    ],
  },
];

function active(pathname: string, href: string): boolean {
  if (href === '/admin') return pathname === '/admin';
  return pathname.startsWith(href);
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed, setIsCollapsed, isMobile, isMobileMenuOpen, setIsMobileMenuOpen } = useAgencySidebar();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const closeMobileMenu = () => { if (isMobile) setIsMobileMenuOpen(false); };

  useEffect(() => {
    if (isMobile && isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobile, isMobileMenuOpen]);

  // Mobile drawer
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            position: 'fixed', top: '12px', left: '12px', zIndex: 2000,
            width: 40, height: 40, borderRadius: 10,
            border: '1px solid var(--agency-border)',
            background: 'var(--agency-surface-1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--agency-ink-2)',
          }}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1500,
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
            }}
          />
        )}

        <aside style={{
          position: 'fixed', top: 0, left: isMobileMenuOpen ? 0 : '-100%',
          width: 260, height: '100vh',
          background: 'var(--agency-surface-1)',
          borderRight: '1px solid var(--agency-border)',
          display: 'flex', flexDirection: 'column',
          transition: 'left 0.25s ease', zIndex: 1600, overflowY: 'auto',
        }}>
          <Header />
          <Nav onClickItem={closeMobileMenu} pathname={pathname} />
          <Footer onLogout={handleLogout} />
        </aside>
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside
      style={{
        position: 'fixed', top: 0, left: 0, height: '100vh',
        width: isCollapsed ? 64 : 224,
        background: 'var(--agency-surface-1)',
        borderRight: '1px solid var(--agency-border)',
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.2s ease', zIndex: 1000,
      }}
    >
      <Header collapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <Nav collapsed={isCollapsed} pathname={pathname} />
      <Footer onLogout={handleLogout} collapsed={isCollapsed} />
    </aside>
  );
}

// ─── Header ──────────────────────────────────────────────────

function Header({ collapsed = false, onToggle }: { collapsed?: boolean; onToggle?: () => void }) {
  return (
    <div
      style={{
        padding: collapsed ? '20px 8px' : '20px 16px',
        borderBottom: '1px solid var(--agency-border)',
        display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between',
      }}
    >
      {!collapsed && (
        <div>
          <div style={{
            fontSize: 14, fontWeight: 700, color: 'var(--agency-ink-1)',
            letterSpacing: '-0.01em',
          }}>
            JL Studio
          </div>
          <div style={{
            fontSize: 10, color: 'var(--agency-ink-3)',
            letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginTop: 2,
          }}>
            CRM Agence
          </div>
        </div>
      )}
      {collapsed && (
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'var(--agency-accent-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--agency-accent)', fontSize: 13, fontWeight: 700,
        }}>
          JL
        </div>
      )}
      {onToggle && (
        <button
          onClick={onToggle}
          aria-label="Toggle sidebar"
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'var(--agency-ink-3)', padding: 4, display: collapsed ? 'none' : 'flex',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────

function Nav({
  pathname, collapsed = false, onClickItem,
}: { pathname: string; collapsed?: boolean; onClickItem?: () => void }) {
  return (
    <nav style={{ flex: 1, padding: collapsed ? '8px 6px' : '12px 10px', overflowY: 'auto' }}>
      {NAV.map((group) => (
        <div key={group.title} style={{ marginBottom: 16 }}>
          {!collapsed && (
            <div
              style={{
                fontSize: 10, fontWeight: 600, color: 'var(--agency-ink-3)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '6px 12px 4px',
              }}
            >
              {group.title}
            </div>
          )}
          {group.items.map((item) => {
            const isAct = active(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClickItem}
                title={collapsed ? item.label : undefined}
                style={{
                  display: 'flex', alignItems: 'center',
                  gap: collapsed ? 0 : 12,
                  padding: collapsed ? '9px 0' : '7px 12px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  fontSize: 13, fontWeight: isAct ? 600 : 500,
                  color: isAct ? 'var(--agency-accent)' : 'var(--agency-ink-2)',
                  background: isAct ? 'var(--agency-accent-soft)' : 'transparent',
                  borderRadius: 6, marginBottom: 1, textDecoration: 'none',
                  position: 'relative', transition: 'all 0.12s',
                }}
                onMouseOver={(e) => {
                  if (!isAct) {
                    e.currentTarget.style.background = 'var(--agency-surface-2)';
                    e.currentTarget.style.color = 'var(--agency-ink-1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isAct) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--agency-ink-2)';
                  }
                }}
              >
                {isAct && !collapsed && (
                  <span
                    style={{
                      position: 'absolute', left: 0, top: 6, bottom: 6,
                      width: 2, background: 'var(--agency-accent)',
                      borderRadius: '0 2px 2px 0',
                    }}
                  />
                )}
                <span style={{ display: 'inline-flex', alignItems: 'center', opacity: isAct ? 1 : 0.85 }}>
                  {item.icon}
                </span>
                {!collapsed && <span style={{ flex: 1, lineHeight: 1.3 }}>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

// ─── Footer ──────────────────────────────────────────────────

function Footer({ onLogout, collapsed = false }: { onLogout: () => void; collapsed?: boolean }) {
  return (
    <div style={{ padding: collapsed ? '10px 8px' : '10px 12px', borderTop: '1px solid var(--agency-border)' }}>
      {!collapsed && (
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 4px',
            fontSize: 11, color: 'var(--agency-ink-3)',
          }}
        >
          <span
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 6px rgba(34,197,94,0.5)',
              animation: 'agency-pulse 2s ease-in-out infinite',
            }}
          />
          <span>Tous services opérationnels</span>
        </div>
      )}
      {collapsed && (
        <div
          style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 6px rgba(34,197,94,0.5)',
            margin: '8px auto',
            animation: 'agency-pulse 2s ease-in-out infinite',
          }}
        />
      )}
      <button
        onClick={onLogout}
        title="Déconnexion"
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          gap: collapsed ? 0 : 10,
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '8px 0' : '7px 12px',
          background: 'transparent', border: 'none', borderRadius: 6,
          color: 'var(--agency-ink-3)', cursor: 'pointer',
          fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
          marginTop: 4, transition: 'all 0.12s',
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(248,113,113,0.12)'; e.currentTarget.style.color = '#f87171'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--agency-ink-3)'; }}
      >
        <LogOut size={15} strokeWidth={1.75} />
        {!collapsed && <span style={{ lineHeight: 1.3 }}>Déconnexion</span>}
      </button>
    </div>
  );
}
