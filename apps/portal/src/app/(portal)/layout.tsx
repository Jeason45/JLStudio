import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import { PortalLayoutClient } from './portal-layout-client';

async function getPortalData() {
  const cookieStore = await cookies();
  const token = cookieStore.get('portal-token')?.value;
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const siteId = payload.siteId as string;
    const role = payload.role as string;

    const [config, site] = await Promise.all([
      prisma.portalConfig.findUnique({ where: { siteId } }),
      prisma.site.findUnique({ where: { id: siteId }, select: { name: true } }),
    ]);

    const superAdmin = payload.superAdmin === true;
    return { config, siteName: site?.name || 'Mon site', role, superAdmin };
  } catch {
    return null;
  }
}

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const data = await getPortalData();

  const configData = data?.config ? {
    id: data.config.id,
    siteId: data.config.siteId,
    logoUrl: data.config.logoUrl,
    primaryColor: data.config.primaryColor,
    moduleCRM: data.config.moduleCRM,
    moduleDevis: data.config.moduleDevis,
    moduleFactures: data.config.moduleFactures,
    moduleContrats: data.config.moduleContrats,
    moduleProjets: data.config.moduleProjets,
    moduleCMS: data.config.moduleCMS,
    moduleCalendrier: data.config.moduleCalendrier,
  } : null;

  return (
    <PortalLayoutClient
      config={configData}
      siteName={data?.siteName || 'Mon site'}
      userRole={data?.role || null}
      superAdmin={data?.superAdmin || false}
    >
      {children}
    </PortalLayoutClient>
  );
}
