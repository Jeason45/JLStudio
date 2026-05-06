'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import {
  Menu, X, LogOut, Sun, Moon, Monitor, Sparkles,
  LayoutDashboard, Users, FileText, Receipt, FileSignature,
  FolderKanban, Globe, Calendar, Radar, Settings, GitBranch,
} from 'lucide-react';
import { useSidebar } from './SidebarContext';

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
  module?: keyof NonNullable<ReturnType<typeof useSidebar>['config']>;
  exact?: boolean;
  always?: boolean;
  /** Hidden from CLIENT role even if module enabled. */
  adminOnly?: boolean;
  /** Visible to CLIENT role (subset of allowed modules). */
  clientAllowed?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Pilotage',
    items: [
      { href: '/dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={16} strokeWidth={1.75} />, exact: true, always: true },
      { href: '/calendrier', label: 'Calendrier', icon: <Calendar size={16} strokeWidth={1.75} />, module: 'moduleCalendrier', adminOnly: true },
    ],
  },
  {
    title: 'CRM',
    items: [
      { href: '/crm', label: 'Contacts & Pipeline', icon: <Users size={16} strokeWidth={1.75} />, module: 'moduleCRM', adminOnly: true },
      { href: '/projets', label: 'Projets', icon: <FolderKanban size={16} strokeWidth={1.75} />, module: 'moduleProjets', adminOnly: true },
      { href: '/prospection', label: 'Prospection', icon: <Radar size={16} strokeWidth={1.75} />, module: 'moduleProspection', adminOnly: true },
    ],
  },
  {
    title: 'Documents',
    items: [
      { href: '/devis', label: 'Devis', icon: <FileText size={16} strokeWidth={1.75} />, module: 'moduleDevis', clientAllowed: true },
      { href: '/factures', label: 'Factures', icon: <Receipt size={16} strokeWidth={1.75} />, module: 'moduleFactures', clientAllowed: true },
      { href: '/contrats', label: 'Contrats', icon: <FileSignature size={16} strokeWidth={1.75} />, module: 'moduleContrats', clientAllowed: true },
    ],
  },
  {
    title: 'Site',
    items: [
      { href: '/mon-site', label: 'Mon site', icon: <Globe size={16} strokeWidth={1.75} />, module: 'moduleCMS', adminOnly: true },
    ],
  },
  {
    title: 'Système',
    items: [
      { href: '/settings', label: 'Paramètres', icon: <Settings size={16} strokeWidth={1.75} />, always: true, adminOnly: true },
    ],
  },
];

function active(pathname: string, href: string, exact?: boolean): boolean {
  if (exact) return pathname === href;
  return pathname.startsWith(href);
}

export default function PortalSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    isCollapsed, setIsCollapsed,
    isMobile, isMobileMenuOpen, setIsMobileMenuOpen,
    config, userRole, superAdmin,
    themePref, setThemePref,
  } = useSidebar();

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

  // Filter nav items by role + module config
  const visibleGroups: NavGroup[] = NAV_GROUPS.map((group) => {
    const items = group.items.filter((item) => {
      // Module gate
      if (item.module && !item.always) {
        if (!config) return false;
        if (!config[item.module]) return false;
      }
      // CLIENT role: only items explicitly allowed
      if (userRole === 'CLIENT' && !item.clientAllowed) return false;
      // Settings: ADMIN/SUPER only (already adminOnly)
      if (userRole === 'CLIENT' && item.adminOnly) return false;
      return true;
    });
    return { ...group, items };
  }).filter((g) => g.items.length > 0);

  // ─── Mobile drawer ──────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          style={{
            position: 'fixed', top: 12, left: 12, zIndex: 2000,
            width: 40, height: 40, borderRadius: 10,
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-secondary)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1500,
              background: 'var(--overlay)', backdropFilter: 'blur(4px)',
            }}
          />
        )}

        <aside style={{
          position: 'fixed', top: 0, left: isMobileMenuOpen ? 0 : '-100%',
          width: 260, height: '100vh',
          background: 'var(--bg-card)',
          borderRight: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          transition: 'left 0.25s ease', zIndex: 1600, overflowY: 'auto',
        }}>
          <Header siteName={config ? 'Mon Site' : 'Portail'} />
          {superAdmin && <AgencyShortcut onClick={() => { router.push('/admin'); closeMobileMenu(); }} />}
          <Nav groups={visibleGroups} pathname={pathname} onClickItem={closeMobileMenu} />
          <Footer
            themePref={themePref}
            setThemePref={setThemePref}
            onLogout={handleLogout}
          />
        </aside>
      </>
    );
  }

  // ─── Desktop sidebar ─────────────────────────────────────────────
  return (
    <aside
      style={{
        position: 'fixed', top: 0, left: 0, height: '100vh',
        width: isCollapsed ? 64 : 224,
        background: 'var(--bg-card)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.2s ease', zIndex: 1000,
      }}
    >
      <Header
        siteName={config ? 'Mon Site' : 'Portail'}
        collapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />
      {superAdmin && (
        <AgencyShortcut
          collapsed={isCollapsed}
          onClick={() => router.push('/admin')}
        />
      )}
      <Nav groups={visibleGroups} pathname={pathname} collapsed={isCollapsed} />
      <Footer
        themePref={themePref}
        setThemePref={setThemePref}
        onLogout={handleLogout}
        collapsed={isCollapsed}
      />
    </aside>
  );
}

// ─── Header ──────────────────────────────────────────────────

function Header({
  siteName, collapsed = false, onToggle,
}: { siteName: string; collapsed?: boolean; onToggle?: () => void }) {
  const initial = siteName.charAt(0).toUpperCase();
  return (
    <div
      style={{
        padding: collapsed ? '20px 8px' : '20px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between',
      }}
    >
      {!collapsed && (
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            fontSize: 14, fontWeight: 700, color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {siteName}
          </div>
          <div style={{
            fontSize: 10, color: 'var(--text-tertiary)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            fontWeight: 500, marginTop: 2,
          }}>
            Espace pro
          </div>
        </div>
      )}
      {collapsed && (
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'var(--accent-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent)', fontSize: 13, fontWeight: 700,
        }}>
          {initial}
        </div>
      )}
      {onToggle && !collapsed && (
        <button
          onClick={onToggle}
          aria-label="Réduire le menu"
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'var(--text-tertiary)', padding: 4, display: 'flex',
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

// ─── Agency shortcut (super-admin only) ──────────────────────

function AgencyShortcut({
  onClick, collapsed = false,
}: { onClick: () => void; collapsed?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? 'CRM Agence (JL Studio)' : undefined}
      style={{
        margin: collapsed ? '8px' : '10px 12px',
        padding: collapsed ? '8px 0' : '8px 12px',
        borderRadius: 8,
        background: 'var(--accent-light)',
        border: '1px solid transparent',
        color: 'var(--accent)',
        cursor: 'pointer', display: 'flex', alignItems: 'center',
        gap: collapsed ? 0 : 8,
        justifyContent: collapsed ? 'center' : 'flex-start',
        fontSize: 12, fontWeight: 600,
        transition: 'all 0.12s', fontFamily: 'inherit',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'white'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent-light)'; e.currentTarget.style.color = 'var(--accent)'; }}
    >
      <Sparkles size={14} strokeWidth={2} />
      {!collapsed && <span>CRM Agence</span>}
    </button>
  );
}

// ─── Nav ─────────────────────────────────────────────────────

function Nav({
  groups, pathname, collapsed = false, onClickItem,
}: { groups: NavGroup[]; pathname: string; collapsed?: boolean; onClickItem?: () => void }) {
  return (
    <nav style={{ flex: 1, padding: collapsed ? '8px 6px' : '12px 10px', overflowY: 'auto' }}>
      {groups.map((group) => (
        <div key={group.title} style={{ marginBottom: 16 }}>
          {!collapsed && (
            <div
              style={{
                fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '6px 12px 4px',
              }}
            >
              {group.title}
            </div>
          )}
          {group.items.map((item) => {
            const isAct = active(pathname, item.href, item.exact);
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
                  color: isAct ? 'var(--accent)' : 'var(--text-secondary)',
                  background: isAct ? 'var(--accent-light)' : 'transparent',
                  borderRadius: 6, marginBottom: 1, textDecoration: 'none',
                  position: 'relative', transition: 'all 0.12s',
                }}
                onMouseOver={(e) => {
                  if (!isAct) {
                    e.currentTarget.style.background = 'var(--bg-hover)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isAct) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                {isAct && !collapsed && (
                  <span
                    style={{
                      position: 'absolute', left: 0, top: 6, bottom: 6,
                      width: 2, background: 'var(--accent)',
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

// ─── Footer (theme + logout) ─────────────────────────────────

const THEME_OPTIONS: { value: 'auto' | 'light' | 'dark'; label: string; icon: ReactNode }[] = [
  { value: 'auto', label: 'Auto', icon: <Monitor size={13} /> },
  { value: 'light', label: 'Clair', icon: <Sun size={13} /> },
  { value: 'dark', label: 'Sombre', icon: <Moon size={13} /> },
];

function Footer({
  themePref, setThemePref, onLogout, collapsed = false,
}: {
  themePref: 'auto' | 'light' | 'dark';
  setThemePref: (p: 'auto' | 'light' | 'dark') => void;
  onLogout: () => void;
  collapsed?: boolean;
}) {
  const cycle = () => {
    const next = themePref === 'auto' ? 'light' : themePref === 'light' ? 'dark' : 'auto';
    setThemePref(next);
  };
  const current = THEME_OPTIONS.find((o) => o.value === themePref) ?? THEME_OPTIONS[0];

  return (
    <div style={{ padding: collapsed ? '10px 8px' : '10px 12px', borderTop: '1px solid var(--border)' }}>
      {/* Theme switcher */}
      {!collapsed ? (
        <div style={{
          display: 'flex', gap: 2, padding: 2, marginBottom: 6,
          background: 'var(--bg-hover)', borderRadius: 6,
        }}>
          {THEME_OPTIONS.map((opt) => {
            const isAct = themePref === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setThemePref(opt.value)}
                title={opt.label}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                  padding: '5px 8px', borderRadius: 4,
                  background: isAct ? 'var(--bg-card)' : 'transparent',
                  color: isAct ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 500,
                  fontFamily: 'inherit', transition: 'all 0.12s',
                  boxShadow: isAct ? 'var(--shadow-card)' : 'none',
                }}
              >
                {opt.icon}
                {opt.label}
              </button>
            );
          })}
        </div>
      ) : (
        <button
          onClick={cycle}
          title={`Theme: ${current.label}`}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '8px 0', marginBottom: 6,
            background: 'var(--bg-hover)', borderRadius: 6,
            border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)',
          }}
        >
          {current.icon}
        </button>
      )}

      {/* Logout */}
      <button
        onClick={onLogout}
        title="Déconnexion"
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          gap: collapsed ? 0 : 10,
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '8px 0' : '7px 12px',
          background: 'transparent', border: 'none', borderRadius: 6,
          color: 'var(--text-tertiary)', cursor: 'pointer',
          fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
          transition: 'all 0.12s',
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = 'var(--danger-light)'; e.currentTarget.style.color = 'var(--danger)'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
      >
        <LogOut size={15} strokeWidth={1.75} />
        {!collapsed && <span style={{ lineHeight: 1.3 }}>Déconnexion</span>}
      </button>
    </div>
  );
}
