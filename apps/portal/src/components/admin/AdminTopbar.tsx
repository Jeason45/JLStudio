'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, HelpCircle, LogOut, User, X } from 'lucide-react';
import { useAgencySidebar } from './SidebarContext';

/**
 * Topbar fixe en haut du CRM admin.
 *
 * - Search bar centrale (UI only, ⌘K — non fonctionnelle pour l'instant)
 * - Icône Aide (?)
 * - Icône Notifications (cloche, dropdown "Aucune notification")
 * - Avatar avec dropdown (Mon profil / Déconnexion)
 *
 * Hauteur 56px. La sidebar et le main content sont décalés en conséquence
 * via leur top/padding.
 */

export const TOPBAR_HEIGHT = 56;

export default function AdminTopbar() {
  const { isMobile, sidebarWidth } = useAgencySidebar();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: isMobile ? 0 : sidebarWidth,
        right: 0,
        height: TOPBAR_HEIGHT,
        zIndex: 900,
        background: 'rgba(18, 18, 18, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--agency-border)',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'center',
        gap: 16,
        padding: isMobile ? '0 16px 0 56px' : '0 24px',
        transition: 'left 0.2s ease',
      }}
    >
      <SearchBar mobile={isMobile} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {!isMobile && <HelpButton />}
        <NotificationsButton />
        <AvatarMenu onLogout={handleLogout} />
      </div>
    </header>
  );
}

// ─── Search bar ──────────────────────────────────────────────

function SearchBar({ mobile }: { mobile: boolean }) {
  return (
    <div
      style={{
        background: 'var(--agency-surface-2)',
        border: '1px solid var(--agency-border)',
        borderRadius: 8,
        padding: mobile ? '6px 10px' : '7px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: 'var(--agency-ink-3)',
        fontSize: 13,
        maxWidth: mobile ? '100%' : 540,
        width: '100%',
        cursor: 'text',
        transition: 'border-color 0.15s',
      }}
      onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--agency-border-strong)'; }}
      onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--agency-border)'; }}
    >
      <Search size={14} style={{ flexShrink: 0, opacity: 0.55 }} />
      <input
        type="search"
        placeholder={mobile ? 'Rechercher…' : 'Rechercher un devis, lead, client, projet…'}
        disabled
        title="Bientôt disponible"
        style={{
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--agency-ink-1)',
          flex: 1,
          fontFamily: 'inherit',
          fontSize: 13,
          minWidth: 0,
          cursor: 'not-allowed',
        }}
      />
      {!mobile && (
        <span
          style={{
            fontSize: 10,
            fontWeight: 500,
            padding: '2px 6px',
            borderRadius: 4,
            background: 'var(--agency-surface-3, var(--agency-surface-2))',
            color: 'var(--agency-ink-3)',
            border: '1px solid var(--agency-border)',
            lineHeight: 1,
            flexShrink: 0,
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          ⌘K
        </span>
      )}
    </div>
  );
}

// ─── Help button ─────────────────────────────────────────────

function HelpButton() {
  return (
    <button
      title="Aide"
      onClick={() => window.open('https://github.com/anthropics/claude-code/issues', '_blank')}
      style={iconBtnStyle()}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--agency-surface-2)'; e.currentTarget.style.color = 'var(--agency-ink-1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--agency-ink-2)'; }}
    >
      <HelpCircle size={16} />
    </button>
  );
}

// ─── Notifications dropdown ──────────────────────────────────

function NotificationsButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        title="Notifications"
        onClick={() => setOpen(!open)}
        style={iconBtnStyle()}
        onMouseEnter={(e) => { if (!open) { e.currentTarget.style.background = 'var(--agency-surface-2)'; e.currentTarget.style.color = 'var(--agency-ink-1)'; } }}
        onMouseLeave={(e) => { if (!open) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--agency-ink-2)'; } }}
      >
        <Bell size={16} />
      </button>
      {open && (
        <div style={dropdownStyle()}>
          <div style={dropdownHeaderStyle()}>Notifications</div>
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--agency-ink-3)', fontSize: 12 }}>
            Aucune notification.
            <div style={{ fontSize: 11, color: 'var(--agency-ink-4, var(--agency-ink-3))', marginTop: 4 }}>
              Les paiements, signatures et nouveaux leads s&apos;afficheront ici.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Avatar + menu ───────────────────────────────────────────

function AvatarMenu({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', marginLeft: 4 }}>
      <button
        title="Mon compte"
        onClick={() => setOpen(!open)}
        style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--agency-accent), var(--agency-accent-dark, var(--agency-accent)))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: 11,
          cursor: 'pointer',
          border: open ? '2px solid var(--agency-accent)' : '2px solid transparent',
          transition: 'border-color 0.15s',
          letterSpacing: '0.04em',
        }}
      >
        JL
      </button>
      {open && (
        <div style={dropdownStyle()}>
          <div style={dropdownHeaderStyle()}>Mon compte</div>
          <button
            onClick={() => { setOpen(false); /* TODO: profile page */ }}
            style={menuItemStyle()}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--agency-surface-2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <User size={14} /> Mon profil
          </button>
          <div style={{ height: 1, background: 'var(--agency-border)', margin: '4px 0' }} />
          <button
            onClick={onLogout}
            style={{ ...menuItemStyle(), color: '#f87171' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(248,113,113,0.10)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <LogOut size={14} /> Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Shared styles ───────────────────────────────────────────

function iconBtnStyle(): React.CSSProperties {
  return {
    width: 34, height: 34, borderRadius: 8,
    background: 'transparent', border: '1px solid transparent',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--agency-ink-2)', cursor: 'pointer',
    transition: 'all 0.12s', fontFamily: 'inherit',
  };
}

function dropdownStyle(): React.CSSProperties {
  return {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    minWidth: 260,
    background: 'var(--agency-surface-1)',
    border: '1px solid var(--agency-border)',
    borderRadius: 10,
    boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
    zIndex: 1000,
    overflow: 'hidden',
  };
}

function dropdownHeaderStyle(): React.CSSProperties {
  return {
    fontSize: 10, fontWeight: 700,
    color: 'var(--agency-ink-3)',
    textTransform: 'uppercase', letterSpacing: '0.12em',
    padding: '12px 14px 8px',
    borderBottom: '1px solid var(--agency-border)',
    background: 'var(--agency-surface-2)',
  };
}

function menuItemStyle(): React.CSSProperties {
  return {
    width: '100%',
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 14px',
    background: 'transparent', border: 'none', cursor: 'pointer',
    color: 'var(--agency-ink-1)', fontSize: 13, fontWeight: 500,
    fontFamily: 'inherit',
    textAlign: 'left',
    transition: 'background 0.12s',
  };
}

// Suppress unused import warning (X is reserved for future use, e.g. close button)
void X;
