'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { PortalConfigData } from '@/types/portal';

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
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children, initialConfig, userRole }: {
  children: ReactNode;
  initialConfig: PortalConfigData | null;
  userRole: string | null;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [config, setConfig] = useState<PortalConfigData | null>(initialConfig);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const sidebarWidth = 48;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize theme from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portal-theme') as 'light' | 'dark' | null;
      if (saved) {
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
      }
    } catch (e) {
      // localStorage not available
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('portal-theme', next);
      } catch (e) {
        // localStorage not available
      }
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  return (
    <SidebarContext.Provider value={{
      isCollapsed, setIsCollapsed, sidebarWidth,
      isMobile, isMobileMenuOpen, setIsMobileMenuOpen,
      config, setConfig, userRole,
      theme, toggleTheme,
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
