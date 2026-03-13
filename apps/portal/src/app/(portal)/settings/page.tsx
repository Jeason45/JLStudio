'use client';

import { useSidebar } from '@/components/portal/SidebarContext';
import UserManagement from '@/components/portal/UserManagement';
import CompanySettings from '@/components/portal/CompanySettings';

export default function SettingsPage() {
  const { isMobile } = useSidebar();

  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '28px', letterSpacing: '-0.01em' }}>Parametres</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px' }}>
        {/* Company Settings */}
        <CompanySettings />

        {/* Users */}
        <UserManagement />
      </div>
    </div>
  );
}
