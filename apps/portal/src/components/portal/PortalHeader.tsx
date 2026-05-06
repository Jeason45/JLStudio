'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSidebar } from './SidebarContext';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface SiteOption {
  id: string;
  name: string;
  slug: string;
}

export default function PortalHeader({ siteName }: { siteName?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { config, isMobile, sidebarWidth, superAdmin } = useSidebar();

  const [sites, setSites] = useState<SiteOption[]>([]);
  const [showSiteDropdown, setShowSiteDropdown] = useState(false);
  const [switching, setSwitching] = useState(false);
  const [currentSiteName, setCurrentSiteName] = useState(siteName || 'Portail');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initial = currentSiteName ? currentSiteName.charAt(0).toUpperCase() : 'P';

  useEffect(() => {
    if (!superAdmin) return;
    fetch('/api/portal/sites')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setSites(data); })
      .catch(() => {});
  }, [superAdmin]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSiteDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
    } catch { /* ignore */ } finally {
      setSwitching(false);
    }
  };

  // Mark unused vars to silence linter (config available for future breadcrumb)
  void config;
  void pathname;

  if (isMobile) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: `${sidebarWidth}px`, right: 0,
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
            minWidth: '260px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            boxShadow: 'var(--shadow-md)',
            padding: '6px',
            zIndex: 1000,
            maxHeight: '380px',
            overflowY: 'auto',
          }}>
            {/* JL Studio agency CRM — special entry */}
            <button
              onClick={() => {
                setShowSiteDropdown(false);
                router.push('/admin');
              }}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                background: pathname.startsWith('/admin') ? 'var(--accent-light)' : 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.1s',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}
              onMouseEnter={(e) => {
                if (!pathname.startsWith('/admin')) e.currentTarget.style.background = 'var(--bg-hover)';
              }}
              onMouseLeave={(e) => {
                if (!pathname.startsWith('/admin')) e.currentTarget.style.background = 'transparent';
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'var(--accent-light)', color: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Sparkles size={14} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>JL Studio</div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '1px' }}>CRM Agence</div>
              </div>
            </button>

            {/* Separator */}
            {sites.filter((s) => s.slug !== 'jlstudio').length > 0 && (
              <div style={{
                fontSize: '10px', fontWeight: 600,
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                padding: '10px 12px 4px',
              }}>
                Sites clients
              </div>
            )}

            {/* Client sites */}
            {sites
              .filter((s) => s.slug !== 'jlstudio')
              .map((site) => {
                const isActive = !pathname.startsWith('/admin') && site.name === currentSiteName;
                return (
                  <button
                    key={site.id}
                    onClick={() => handleSwitchSite(site.id, site.name)}
                    disabled={switching}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: isActive ? 'var(--accent-light)' : 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.1s',
                      opacity: switching ? 0.5 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = 'var(--bg-hover)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{site.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '1px' }}>{site.slug}</div>
                  </button>
                );
              })}

            {sites.filter((s) => s.slug !== 'jlstudio').length === 0 && (
              <div style={{ padding: '12px', fontSize: '12px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
                Aucun site client encore
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: User avatar (theme toggle + logout are in sidebar footer) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          overflow: 'hidden', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--accent-light)', color: 'var(--accent)',
          fontSize: '13px', fontWeight: 600,
        }}>
          {initial}
        </div>
      </div>
    </div>
  );
}
