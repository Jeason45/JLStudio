'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSidebar } from './SidebarContext';
import { Sun, Moon, LogOut, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface SiteOption {
  id: string;
  name: string;
  slug: string;
}

export default function PortalHeader({ siteName }: { siteName?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { config, isMobile, theme, toggleTheme, userRole, superAdmin } = useSidebar();

  const [sites, setSites] = useState<SiteOption[]>([]);
  const [showSiteDropdown, setShowSiteDropdown] = useState(false);
  const [switching, setSwitching] = useState(false);
  const [currentSiteName, setCurrentSiteName] = useState(siteName || 'Portail');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initial = currentSiteName ? currentSiteName.charAt(0).toUpperCase() : 'P';

  // Fetch sites list for superAdmin
  useEffect(() => {
    if (!superAdmin) return;
    fetch('/api/portal/sites')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSites(data);
      })
      .catch(() => {});
  }, [superAdmin]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSiteDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const handleSwitchSite = async (siteId: string, name: string) => {
    setSwitching(true);
    try {
      const res = await fetch('/api/auth/switch-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId }),
      });
      if (res.ok) {
        setCurrentSiteName(name);
        setShowSiteDropdown(false);
        window.location.reload();
      }
    } catch {
      // ignore
    } finally {
      setSwitching(false);
    }
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

  if (userRole === 'ADMIN' || superAdmin) {
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
      {/* Left: Site name / Site switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '200px', position: 'relative' }} ref={dropdownRef}>
        {config?.logoUrl ? (
          <img src={config.logoUrl} alt="Logo" style={{ height: '24px', width: 'auto' }} />
        ) : superAdmin ? (
          <button
            onClick={() => setShowSiteDropdown(!showSiteDropdown)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'transparent', border: '1px solid var(--border)',
              borderRadius: '8px', padding: '6px 12px',
              cursor: 'pointer', color: 'var(--text-primary)',
              fontSize: '14px', fontWeight: 600, letterSpacing: '-0.02em',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            {currentSiteName}
            <ChevronDown size={14} style={{
              transition: 'transform 0.15s',
              transform: showSiteDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
            }} />
          </button>
        ) : (
          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {currentSiteName}
          </span>
        )}

        {/* Site dropdown */}
        {showSiteDropdown && superAdmin && (
          <div style={{
            position: 'absolute', top: '100%', left: 0,
            marginTop: '6px',
            minWidth: '240px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            boxShadow: 'var(--shadow-md)',
            padding: '6px',
            zIndex: 1000,
            maxHeight: '320px',
            overflowY: 'auto',
          }}>
            {sites.map((site) => (
              <button
                key={site.id}
                onClick={() => handleSwitchSite(site.id, site.name)}
                disabled={switching}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: site.name === currentSiteName ? 'var(--accent-light)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.1s',
                  opacity: switching ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (site.name !== currentSiteName) e.currentTarget.style.background = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  if (site.name !== currentSiteName) e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{site.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '1px' }}>{site.slug}</div>
              </button>
            ))}
            {sites.length === 0 && (
              <div style={{ padding: '12px', fontSize: '13px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
                Aucun site
              </div>
            )}
          </div>
        )}
      </div>

      {/* Center: Navigation tabs */}
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
