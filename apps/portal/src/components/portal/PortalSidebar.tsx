'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSidebar } from './SidebarContext';
import { Settings, LogOut, Menu, X, ChevronLeft, Share2, Upload, Star, Plus, Copy, FileText, Calendar, Send, Bell, Phone, LayoutDashboard, Users, Receipt, FileSignature, FolderKanban, Globe, Radar } from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';

export default function PortalSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, isMobileMenuOpen, setIsMobileMenuOpen, config, userRole, theme, toggleTheme } = useSidebar();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
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

  // Navigation items (used for mobile menu only)
  // CLIENT can only see dashboard + documents
  const clientOnlyModules = ['moduleDevis', 'moduleFactures', 'moduleContrats'];

  const allNavItems = [
    { href: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard', exact: true, always: true },
    { href: '/crm', icon: <Users size={18} />, label: 'CRM', module: 'moduleCRM' as const, adminOnly: true },
    { href: '/devis', icon: <FileText size={18} />, label: 'Devis', module: 'moduleDevis' as const },
    { href: '/factures', icon: <Receipt size={18} />, label: 'Factures', module: 'moduleFactures' as const },
    { href: '/contrats', icon: <FileSignature size={18} />, label: 'Contrats', module: 'moduleContrats' as const },
    { href: '/projets', icon: <FolderKanban size={18} />, label: 'Projets', module: 'moduleProjets' as const, adminOnly: true },
    { href: '/mon-site', icon: <Globe size={18} />, label: 'Mon Site', module: 'moduleCMS' as const },
    { href: '/calendrier', icon: <Calendar size={18} />, label: 'Calendrier', module: 'moduleCalendrier' as const, adminOnly: true },
    { href: '/prospection', icon: <Radar size={18} />, label: 'Prospection', module: 'moduleProspection' as const, adminOnly: true },
  ];

  const navItems = allNavItems.filter((item) => {
    if (item.always) return true;
    if (!item.module || !config) return false;
    if (!config[item.module]) return false;
    // CLIENT role: hide admin-only modules
    if (userRole === 'CLIENT' && item.adminOnly) return false;
    // CLIENT role: only show document modules they have access to
    if (userRole === 'CLIENT' && !clientOnlyModules.includes(item.module)) return false;
    return true;
  });

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  // Left sidebar tool icons (like SugarCRM)
  const toolIcons = [
    { icon: <ChevronLeft size={18} />, label: 'Retour', action: () => router.back() },
    { icon: <Share2 size={18} />, label: 'Partager' },
    { icon: <Upload size={18} />, label: 'Exporter' },
    { icon: <Star size={18} />, label: 'Favoris' },
    { icon: <Plus size={18} />, label: 'Ajouter' },
    { icon: <Copy size={18} />, label: 'Copier' },
    { icon: <FileText size={18} />, label: 'Documents' },
    { icon: <Calendar size={18} />, label: 'Calendrier' },
    { icon: <Send size={18} />, label: 'Envoyer' },
    { icon: <Bell size={18} />, label: 'Notifications' },
  ];

  // Mobile: full slide-out menu with navigation
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            position: 'fixed', top: '14px', left: '14px', zIndex: 2000,
            width: '40px', height: '40px', borderRadius: '10px',
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
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'var(--overlay)', backdropFilter: 'blur(4px)', zIndex: 1500,
            }}
          />
        )}

        <div style={{
          position: 'fixed', top: 0, left: isMobileMenuOpen ? 0 : '-280px',
          width: '260px', height: '100vh',
          background: 'var(--bg-card)',
          display: 'flex', flexDirection: 'column',
          transition: 'left 0.25s ease',
          borderRight: '1px solid var(--border)', zIndex: 1600, overflowY: 'auto',
        }}>
          <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)', marginTop: '56px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {config?.logoUrl ? <img src={config.logoUrl} alt="Logo" style={{ height: '20px' }} /> : 'Portail'}
            </span>
          </div>

          <nav style={{ flex: 1, padding: '12px', overflowY: 'auto' }}>
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link key={item.href} href={item.href} onClick={handleLinkClick} style={{ textDecoration: 'none', display: 'block', marginBottom: '2px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '8px 12px',
                    backgroundColor: active ? 'var(--accent-light)' : 'transparent',
                    borderRadius: '8px', fontSize: '13px',
                    fontWeight: active ? 500 : 400,
                    cursor: 'pointer',
                  }}>
                    <div style={{ color: active ? 'var(--accent)' : 'var(--text-tertiary)', display: 'flex', alignItems: 'center' }}>{item.icon}</div>
                    <span style={{ color: active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{item.label}</span>
                  </div>
                </Link>
              );
            })}
            {userRole === 'ADMIN' && (
              <Link href="/settings" onClick={handleLinkClick} style={{ textDecoration: 'none', display: 'block', marginBottom: '2px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '8px 12px',
                  backgroundColor: isActive('/settings') ? 'var(--accent-light)' : 'transparent',
                  borderRadius: '8px', fontSize: '13px',
                  fontWeight: isActive('/settings') ? 500 : 400,
                }}>
                  <div style={{ color: isActive('/settings') ? 'var(--accent)' : 'var(--text-tertiary)', display: 'flex', alignItems: 'center' }}><Settings size={18} /></div>
                  <span style={{ color: isActive('/settings') ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Settings</span>
                </div>
              </Link>
            )}
          </nav>

          <div style={{ padding: '12px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
            <button onClick={handleLogout} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text-tertiary)', fontSize: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <LogOut size={14} /> Deconnexion
            </button>
          </div>
        </div>
      </>
    );
  }

  // Desktop: thin 48px tool sidebar (like SugarCRM left bar)
  return (
    <div style={{
      width: '48px',
      background: 'var(--bg-card)',
      display: 'flex', flexDirection: 'column', position: 'fixed',
      height: '100vh', left: 0, top: 0,
      borderRight: '1px solid var(--border)', zIndex: 1000,
    }}>
      {/* Tool icons */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: '16px', gap: '2px',
      }}>
        {toolIcons.map((tool, i) => (
          <button
            key={i}
            onClick={tool.action}
            title={tool.label}
            style={{
              width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', border: 'none',
              cursor: tool.action ? 'pointer' : 'default',
              color: 'var(--text-tertiary)',
              borderRadius: '8px',
              transition: 'color 0.15s, background 0.15s',
              opacity: tool.action ? 1 : 0.6,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.background = 'var(--bg-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-tertiary)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {tool.icon}
          </button>
        ))}
      </div>

      {/* Bottom: circle buttons like SugarCRM */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingBottom: '16px', gap: '8px',
      }}>
        <button
          onClick={() => {}}
          title="Contact"
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-tertiary)',
            transition: 'all 0.15s',
          }}
        >
          <Phone size={16} />
        </button>
        {userRole === 'ADMIN' && (
          <button
            onClick={() => router.push('/settings')}
            title="Parametres"
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              border: 'none',
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white',
              transition: 'all 0.15s',
              boxShadow: '0 2px 8px rgba(70,104,229,0.3)',
            }}
          >
            <Settings size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
