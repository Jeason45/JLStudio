'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSidebar } from './SidebarContext';
import { Sun, Moon, LogOut } from 'lucide-react';

export default function PortalHeader({ siteName }: { siteName?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { config, isMobile, theme, toggleTheme, userRole } = useSidebar();

  const initial = siteName ? siteName.charAt(0).toUpperCase() : 'P';

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const allNavItems = [
    { href: '/dashboard', label: 'Dashboard', exact: true, always: true },
    { href: '/crm', label: 'CRM', module: 'moduleCRM' as const },
    { href: '/devis', label: 'Devis', module: 'moduleDevis' as const },
    { href: '/factures', label: 'Factures', module: 'moduleFactures' as const },
    { href: '/contrats', label: 'Contrats', module: 'moduleContrats' as const },
    { href: '/projets', label: 'Projets', module: 'moduleProjets' as const },
    { href: '/cms', label: 'CMS', module: 'moduleCMS' as const },
    { href: '/calendrier', label: 'Calendrier', module: 'moduleCalendrier' as const },
  ];

  const navItems = allNavItems.filter((item) => {
    if (item.always) return true;
    if (!item.module || !config) return false;
    return config[item.module];
  });

  if (userRole === 'ADMIN') {
    navItems.push({ href: '/settings', label: 'Settings', exact: false, always: true });
  }

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  if (isMobile) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: '48px', right: 0,
      height: '56px',
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px',
      zIndex: 900,
    }}>
      {/* Left: Site name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '180px' }}>
        {config?.logoUrl ? (
          <img src={config.logoUrl} alt="Logo" style={{ height: '24px', width: 'auto' }} />
        ) : (
          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {siteName || 'Portail'}
          </span>
        )}
      </div>

      {/* Center: Navigation tabs like SugarCRM */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '6px 18px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: active ? 500 : 400,
                color: active ? '#ffffff' : 'var(--text-secondary)',
                backgroundColor: active ? '#1e293b' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}>
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '180px', justifyContent: 'flex-end' }}>
        <button
          onClick={toggleTheme}
          title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
          style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'transparent', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-tertiary)',
          }}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <button
          onClick={handleLogout}
          title="Deconnexion"
          style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'transparent', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-tertiary)',
          }}
        >
          <LogOut size={18} />
        </button>
        <div style={{
          width: '38px', height: '38px', borderRadius: '50%',
          overflow: 'hidden', border: '2px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--accent-light)', color: 'var(--accent)',
          fontSize: '14px', fontWeight: 600,
        }}>
          {initial}
        </div>
      </div>
    </div>
  );
}
