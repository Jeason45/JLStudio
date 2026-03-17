'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarProvider, useSidebar } from '@/components/portal/SidebarContext';
import PortalSidebar from '@/components/portal/PortalSidebar';
import PortalHeader from '@/components/portal/PortalHeader';
import type { PortalConfigData } from '@/types/portal';

function PortalContent({ children, siteName }: { children: React.ReactNode; siteName: string }) {
  const { sidebarWidth, isMobile, config } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  const isOnboardingPage = pathname === '/onboarding';
  const needsOnboarding = config !== null && !config.onboardingDone && !isOnboardingPage;

  useEffect(() => {
    if (needsOnboarding) {
      router.replace('/onboarding');
    }
  }, [needsOnboarding, router]);

  // Waiting for redirect
  if (needsOnboarding) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-page)' }}>
        <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Chargement...</div>
      </div>
    );
  }

  // Onboarding page: render without sidebar/header
  if (isOnboardingPage) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
        {children}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-page)' }}>
      <PortalSidebar />
      <div style={{
        flex: 1,
        marginLeft: isMobile ? '0' : `${sidebarWidth}px`,
        transition: 'margin-left 0.25s ease',
        minHeight: '100vh',
        paddingTop: isMobile ? '72px' : '56px',
      }}>
        <PortalHeader siteName={siteName} />
        <div style={{
          padding: isMobile ? '24px 16px' : '32px 40px',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function PortalLayoutClient({
  children,
  config,
  siteName,
  userRole,
  superAdmin = false,
}: {
  children: React.ReactNode;
  config: PortalConfigData | null;
  siteName: string;
  userRole: string | null;
  superAdmin?: boolean;
}) {
  return (
    <SidebarProvider initialConfig={config} userRole={userRole} superAdmin={superAdmin}>
      <PortalContent siteName={siteName}>{children}</PortalContent>
    </SidebarProvider>
  );
}
