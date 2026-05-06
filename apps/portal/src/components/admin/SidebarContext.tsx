'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  sidebarWidth: number;
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function AgencySidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarWidth = isCollapsed ? 64 : 224;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, setIsCollapsed, sidebarWidth, isMobile, isMobileMenuOpen, setIsMobileMenuOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useAgencySidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useAgencySidebar must be used within AgencySidebarProvider');
  return ctx;
}
