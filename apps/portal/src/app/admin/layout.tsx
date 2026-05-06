import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import { getAgencySite } from '@/lib/agencySite';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AgencyContentClient from '@/components/admin/AgencyContentClient';
import { AgencySidebarProvider } from '@/components/admin/SidebarContext';
import './agency.css';

async function requireSuperAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('portal-token')?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(token, secret);
    if (payload.superAdmin !== true) return null;
    return payload;
  } catch {
    return null;
  }
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const auth = await requireSuperAdmin();
  if (!auth) redirect('/login');

  // Ensure JL Studio agency site exists (idempotent)
  await getAgencySite();

  return (
    <AgencySidebarProvider>
      <div data-agency="true">
        <AdminSidebar />
        <AgencyContentClient>{children}</AgencyContentClient>
      </div>
    </AgencySidebarProvider>
  );
}
