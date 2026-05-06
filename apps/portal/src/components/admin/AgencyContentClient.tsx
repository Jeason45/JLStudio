'use client';

import { useAgencySidebar } from './SidebarContext';
import type { ReactNode } from 'react';

export default function AgencyContentClient({ children }: { children: ReactNode }) {
  const { sidebarWidth, isMobile } = useAgencySidebar();
  return (
    <main
      style={{
        marginLeft: isMobile ? 0 : sidebarWidth,
        minHeight: '100vh',
        padding: isMobile ? '64px 16px 24px' : '24px 32px',
        transition: 'margin-left 0.2s ease',
      }}
    >
      {children}
    </main>
  );
}
