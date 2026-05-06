'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { PortalConfigData } from '@/types/portal';

type ThemePref = 'auto' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  sidebarWidth: number;
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  config: PortalConfigData | null;
  setConfig: (config: PortalConfigData) => void;
  userRole: string | null;
  superAdmin: boolean;
  /** User preference: auto | light | dark. */
  themePref: ThemePref;
  /** Resolved theme actually applied to DOM (auto resolves to dark for super-admin, system pref otherwise). */
  theme: ResolvedTheme;
  setThemePref: (pref: ThemePref) => void;
  toggleTheme: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const STORAGE_KEY = 'portal-theme-pref';

function readPrefFromStorage(): ThemePref | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'auto' || v === 'light' || v === 'dark') return v;
    // Legacy: old key was 'portal-theme' with raw 'light'|'dark'
    const legacy = localStorage.getItem('portal-theme');
    if (legacy === 'light' || legacy === 'dark') return legacy;
  } catch { /* ignore */ }
  return null;
}

function writePrefToStorage(pref: ThemePref) {
  try { localStorage.setItem(STORAGE_KEY, pref); } catch { /* ignore */ }
}

function resolveTheme(pref: ThemePref, superAdmin: boolean): ResolvedTheme {
  if (pref === 'light') return 'light';
  if (pref === 'dark') return 'dark';
  // 'auto'
  if (superAdmin) return 'dark'; // super-admin = always dark by default
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

function applyThemeToDOM(theme: ResolvedTheme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
}

export function SidebarProvider({ children, initialConfig, userRole, superAdmin = false }: {
  children: ReactNode;
  initialConfig: PortalConfigData | null;
  userRole: string | null;
  superAdmin?: boolean;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [config, setConfig] = useState<PortalConfigData | null>(initialConfig);
  const [themePref, setThemePrefState] = useState<ThemePref>('auto');
  const [theme, setTheme] = useState<ResolvedTheme>(superAdmin ? 'dark' : 'light');

  const sidebarWidth = isCollapsed ? 64 : 224;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initial theme resolution: localStorage first (fast), then fetch from API and reconcile.
  useEffect(() => {
    const stored = readPrefFromStorage();
    const initialPref = stored ?? 'auto';
    setThemePrefState(initialPref);
    const resolved = resolveTheme(initialPref, superAdmin);
    setTheme(resolved);
    applyThemeToDOM(resolved);

    // Async: fetch user pref from BDD (overrides localStorage if different)
    fetch('/api/portal/me/theme')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.theme) return;
        const apiPref: ThemePref = data.theme;
        if (apiPref !== initialPref) {
          setThemePrefState(apiPref);
          writePrefToStorage(apiPref);
          const newResolved = resolveTheme(apiPref, superAdmin);
          setTheme(newResolved);
          applyThemeToDOM(newResolved);
        }
      })
      .catch(() => { /* offline / not migrated yet — keep localStorage value */ });
  }, [superAdmin]);

  // Listen to system theme changes when in 'auto' mode
  useEffect(() => {
    if (themePref !== 'auto' || typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      const resolved = resolveTheme('auto', superAdmin);
      setTheme(resolved);
      applyThemeToDOM(resolved);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [themePref, superAdmin]);

  const setThemePref = useCallback(
    (pref: ThemePref) => {
      setThemePrefState(pref);
      writePrefToStorage(pref);
      const resolved = resolveTheme(pref, superAdmin);
      setTheme(resolved);
      applyThemeToDOM(resolved);

      // Persist to BDD (best-effort, non-blocking)
      fetch('/api/portal/me/theme', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: pref }),
      }).catch(() => { /* ignore */ });
    },
    [superAdmin],
  );

  const toggleTheme = useCallback(() => {
    // Cycle: light → dark → auto → light
    const next: ThemePref = themePref === 'light' ? 'dark' : themePref === 'dark' ? 'auto' : 'light';
    setThemePref(next);
  }, [themePref, setThemePref]);

  return (
    <SidebarContext.Provider value={{
      isCollapsed, setIsCollapsed, sidebarWidth,
      isMobile, isMobileMenuOpen, setIsMobileMenuOpen,
      config, setConfig, userRole, superAdmin,
      themePref, theme, setThemePref, toggleTheme,
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used within SidebarProvider');
  return context;
}
