'use client';

import { useAgencySidebar } from './SidebarContext';
import { TOPBAR_HEIGHT } from './AdminTopbar';
import type { ReactNode } from 'react';

export default function AgencyContentClient({ children }: { children: ReactNode }) {
  const { sidebarWidth, isMobile } = useAgencySidebar();
  return (
    <main
      style={{
        marginLeft: isMobile ? 0 : sidebarWidth,
        marginTop: TOPBAR_HEIGHT,
        minHeight: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
        padding: isMobile ? '24px 16px' : '24px 32px',
        transition: 'margin-left 0.2s ease',
      }}
    >
      {children}
    </main>
  );
}
