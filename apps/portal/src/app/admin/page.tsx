import { getAgencySite } from '@/lib/agencySite';
import { prisma } from '@/lib/prisma';

export default async function AdminDashboardPage() {
  const site = await getAgencySite();

  // Quick agency-wide stats (using JL Studio site data)
  const [contactsCount, leadsCount, projectsCount, documentsCount] = await Promise.all([
    prisma.contact.count({ where: { siteId: site.id, deletedAt: null } }),
    prisma.lead.count({ where: { siteId: site.id } }),
    prisma.portalProject.count({ where: { siteId: site.id } }),
    prisma.portalDocument.count({ where: { siteId: site.id } }),
  ]);

  const kpis = [
    { label: 'Contacts', value: contactsCount, hint: 'Total dans ton CRM' },
    { label: 'Leads', value: leadsCount, hint: 'En cours de qualification' },
    { label: 'Projets', value: projectsCount, hint: 'Actifs et terminés' },
    { label: 'Documents', value: documentsCount, hint: 'Devis, factures, contrats' },
  ];

  return (
    <div>
      <header style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 24, fontWeight: 600, color: 'var(--agency-ink-1)',
            margin: 0, letterSpacing: '-0.02em',
          }}
        >
          Tableau de bord
        </h1>
        <p
          style={{
            fontSize: 13, color: 'var(--agency-ink-3)',
            marginTop: 4, marginBottom: 0,
          }}
        >
          Bienvenue dans ton CRM agence — vue d&apos;ensemble de ton activité.
        </p>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            style={{
              background: 'var(--agency-surface-1)',
              border: '1px solid var(--agency-border)',
              borderRadius: 12,
              padding: '20px 22px',
            }}
          >
            <div
              style={{
                fontSize: 11, color: 'var(--agency-ink-3)', fontWeight: 500,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              {kpi.label}
            </div>
            <div
              style={{
                fontSize: 32, fontWeight: 600, color: 'var(--agency-ink-1)',
                lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 6,
              }}
            >
              {kpi.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--agency-ink-3)' }}>
              {kpi.hint}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 32,
          padding: 32,
          borderRadius: 12,
          border: '1px dashed var(--agency-border)',
          background: 'var(--agency-surface-1)',
          textAlign: 'center',
          color: 'var(--agency-ink-3)',
          fontSize: 13,
        }}
      >
        <p style={{ margin: 0, marginBottom: 6, fontSize: 14, fontWeight: 500, color: 'var(--agency-ink-2)' }}>
          🚧 CRM en construction
        </p>
        <p style={{ margin: 0 }}>
          Les modules Leads, Clients, Projets, Kanban, Gantt, Briefs, Documents, Emails, Calendrier et Analytics
          arrivent dans les prochaines sessions de migration.
        </p>
      </div>
    </div>
  );
}
