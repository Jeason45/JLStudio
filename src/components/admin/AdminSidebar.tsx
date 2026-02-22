'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSidebar } from './SidebarContext';
import { Settings, LogOut, Menu, X } from 'lucide-react';
import { useEffect } from 'react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed, setIsCollapsed, isMobile, isMobileMenuOpen, setIsMobileMenuOpen } = useSidebar();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const handleSettings = () => {
    router.push('/admin/parametres');
    if (isMobile) setIsMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    if (isMobile) setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isMobile && isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobile, isMobileMenuOpen]);

  const navItems = [
    {
      href: '/admin',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
        </svg>
      ),
      label: 'Dashboard',
      color: '#818cf8',
      exact: true
    },
    {
      href: '/admin/leads',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      label: 'Leads',
      color: '#34d399'
    },
    {
      href: '/admin/clients',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="8.5" cy="7" r="4"/><path d="M20 8v6"/><path d="M23 11h-6"/>
        </svg>
      ),
      label: 'Clients',
      color: '#638BFF'
    },
    {
      href: '/admin/projets',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
          <line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>
        </svg>
      ),
      label: 'Projets',
      color: '#a78bfa'
    },
    {
      href: '/admin/documents',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="9" y1="15" x2="15" y2="15"/>
        </svg>
      ),
      label: 'Documents',
      color: '#60a5fa'
    },
    {
      href: '/admin/calendar',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      label: 'Calendrier',
      color: '#fbbf24'
    },
    {
      href: '/admin/brief',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      label: 'Briefs',
      color: '#f472b6'
    },
    {
      href: '/admin/emails',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: 'Emails',
      color: '#60a5fa'
    },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            position: 'fixed', top: '16px', left: '16px', zIndex: 2000,
            width: '48px', height: '48px', borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'linear-gradient(180deg, #000000 0%, #0a1628 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#638BFF',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)', transition: 'all 0.2s'
          }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
              zIndex: 1500
            }}
          />
        )}

        <div style={{
          position: 'fixed', top: 0, left: isMobileMenuOpen ? 0 : '-100%',
          width: '280px', height: '100vh',
          background: 'linear-gradient(180deg, #000000 0%, #0a1628 100%)',
          display: 'flex', flexDirection: 'column',
          transition: 'left 0.3s ease',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          zIndex: 1600, overflowY: 'auto'
        }}>
          <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginTop: '64px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#638BFF', marginBottom: '4px' }}>JL Studio</h1>
            <p style={{ fontSize: '11px', color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>CRM Platform</p>
          </div>
          <nav style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={handleLinkClick} style={{ textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
                  backgroundColor: isActive(item.href, item.exact) ? `${item.color}26` : 'transparent',
                  borderLeft: isActive(item.href, item.exact) ? `3px solid ${item.color}` : '3px solid transparent',
                  borderRadius: '8px', fontSize: '15px',
                  fontWeight: isActive(item.href, item.exact) ? 600 : 500,
                  cursor: 'pointer', transition: 'all 200ms'
                }}>
                  <div style={{ color: item.color, display: 'flex', alignItems: 'center', opacity: isActive(item.href, item.exact) ? 1 : 0.7 }}>{item.icon}</div>
                  <span style={{ color: item.color, opacity: isActive(item.href, item.exact) ? 1 : 0.7 }}>{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>
          <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '12px' }}>
            <button onClick={handleSettings} style={{ flex: 1, height: '48px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 500 }}>
              <Settings size={20} /><span>Parametres</span>
            </button>
            <button onClick={handleLogout} style={{ width: '48px', height: '48px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef4444', flexShrink: 0 }}>
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div style={{
      width: isCollapsed ? '80px' : '260px',
      background: 'linear-gradient(180deg, #000000 0%, #0a1628 100%)',
      display: 'flex', flexDirection: 'column', position: 'fixed',
      height: '100vh', left: 0, top: 0, transition: 'width 0.3s ease',
      borderRight: '1px solid rgba(255,255,255,0.06)', zIndex: 1000
    }}>
      <div style={{ padding: isCollapsed ? '24px 16px' : '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ opacity: isCollapsed ? 0 : 1, transition: 'opacity 0.3s ease', pointerEvents: isCollapsed ? 'none' : 'auto', width: isCollapsed ? 0 : 'auto', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#638BFF', marginBottom: '2px' }}>JL Studio</h1>
          <p style={{ fontSize: '11px', color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>CRM Platform</p>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '8px', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', marginLeft: isCollapsed ? '0' : 'auto' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
            <polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>
          </svg>
        </button>
      </div>

      <nav style={{ flex: 1, padding: isCollapsed ? '16px 12px' : '16px', overflowY: 'auto' }}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: isCollapsed ? '12px' : '12px 16px',
              backgroundColor: isActive(item.href, item.exact) ? `${item.color}26` : 'transparent',
              borderLeft: isActive(item.href, item.exact) ? `3px solid ${item.color}` : '3px solid transparent',
              borderRadius: '6px', fontSize: '14px',
              fontWeight: isActive(item.href, item.exact) ? 600 : 500,
              cursor: 'pointer', transition: 'all 200ms',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }} title={isCollapsed ? item.label : undefined}>
              <div style={{ color: item.color, display: 'flex', alignItems: 'center', opacity: isActive(item.href, item.exact) ? 1 : 0.7 }}>{item.icon}</div>
              {!isCollapsed && <span style={{ color: item.color, opacity: isActive(item.href, item.exact) ? 1 : 0.7 }}>{item.label}</span>}
            </div>
          </Link>
        ))}
      </nav>

      <div style={{ padding: isCollapsed ? '16px 12px' : '16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '12px', justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
        <button onClick={handleSettings} title="Parametres" style={{ width: isCollapsed ? '100%' : '40px', height: '40px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', flexShrink: 0 }}>
          <Settings size={20} />
        </button>
        <button onClick={handleLogout} title="Deconnexion" style={{ width: isCollapsed ? '100%' : '40px', height: '40px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', display: isCollapsed ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef4444', flexShrink: 0 }}>
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}
