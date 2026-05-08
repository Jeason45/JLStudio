import Link from 'next/link';
import { getAgencySite } from '@/lib/agencySite';
import { prisma } from '@/lib/prisma';
import { PageHeaderRibbon } from '@/components/admin/PageHeaderRibbon';
import { SECTION_COLORS } from '@/components/admin/sectionColors';

export default async function AdminDashboardPage() {
  const site = await getAgencySite();
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    leadsNew,
    clientsActive,
    documentsPending,
    projectsActive,
    facturedThisMonth,
    recentActivity,
    recentLeads,
  ] = await Promise.all([
    // KPI 1 — Leads NEW
    prisma.lead.count({
      where: { siteId: site.id, status: 'NEW' },
    }),
    // KPI 2 — Clients actifs (Contacts non supprimés)
    prisma.contact.count({
      where: { siteId: site.id, deletedAt: null, status: 'ACTIVE' },
    }),
    // KPI 3 — Devis/factures en attente (DRAFT + SENT)
    prisma.portalDocument.count({
      where: { siteId: site.id, status: { in: ['DRAFT', 'SENT'] } },
    }),
    // KPI 4 — Projets en cours
    prisma.portalProject.count({
      where: { siteId: site.id, status: 'IN_PROGRESS' },
    }),
    // KPI 5 — CA facturé ce mois
    prisma.portalDocument.aggregate({
      where: {
        siteId: site.id,
        type: 'FACTURE',
        status: 'PAID',
        paidAt: { gte: monthStart },
      },
      _sum: { totalAmount: true },
    }),
    // Activity feed — 10 derniers events
    prisma.activity.findMany({
      where: { siteId: site.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    // Leads récents — 5 derniers
    prisma.lead.findMany({
      where: { siteId: site.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        contact: { select: { id: true, name: true, email: true, companyName: true } },
      },
    }),
  ]);

  const caMonth = facturedThisMonth._sum.totalAmount || 0;

  return (
    <div>
      <PageHeaderRibbon label="Tableau de bord" />

      <p style={{ fontSize: 13, color: 'var(--agency-ink-3)', margin: '0 0 24px' }}>
        Vue d&apos;ensemble de ton activité.
      </p>

      {/* KPI Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: 12,
          marginBottom: 24,
        }}
      >
        <KpiCard label="Leads à qualifier" value={leadsNew} color={SECTION_COLORS.contacts} href="/admin/leads" hint="Statut NEW" />
        <KpiCard label="Clients actifs" value={clientsActive} color={SECTION_COLORS.contacts} href="/admin/clients" hint="Carnet d'adresses" />
        <KpiCard label="Devis en attente" value={documentsPending} color={SECTION_COLORS.communication} href="/admin/documents" hint="Brouillons + envoyés" />
        <KpiCard label="Projets en cours" value={projectsActive} color={SECTION_COLORS.projets} href="/admin/projets" hint="Statut In Progress" />
        <KpiCard
          label="CA facturé ce mois"
          value={`${caMonth.toLocaleString('fr-FR')} €`}
          color={SECTION_COLORS.communication}
          href="/admin/documents"
          hint="Factures payées"
          highlight
        />
      </div>

      {/* Content grid : Activity + Quick actions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 280px',
          gap: 16,
          marginBottom: 16,
        }}
        className="dashboard-grid"
      >
        <Panel title="Activité agence" subtitle={`${recentActivity.length} dernier${recentActivity.length > 1 ? 's' : ''} événement${recentActivity.length > 1 ? 's' : ''}`}>
          {recentActivity.length === 0 ? (
            <EmptyState message="Aucune activité pour l'instant. Crée un devis ou ajoute un lead pour démarrer." />
          ) : (
            <div>
              {recentActivity.map((a) => (
                <ActivityRow
                  key={a.id}
                  action={a.action}
                  entity={a.entity}
                  entityId={a.entityId}
                  details={a.details as Record<string, unknown> | null}
                  createdAt={a.createdAt}
                />
              ))}
            </div>
          )}
        </Panel>

        <Panel title="Actions rapides">
          <QuickAction href="/admin/documents/create-devis" label="Nouveau devis" color={SECTION_COLORS.communication} icon="📄" />
          <QuickAction href="/admin/documents/create-facture" label="Nouvelle facture" color={SECTION_COLORS.communication} icon="🧾" />
          <QuickAction href="/admin/leads" label="Nouveau lead" color={SECTION_COLORS.contacts} icon="🎯" />
          <QuickAction href="/admin/projets" label="Nouveau projet" color={SECTION_COLORS.projets} icon="📁" />
          <QuickAction href="/admin/parametres" label="Paramètres agence" color={SECTION_COLORS.systeme} icon="⚙" />
        </Panel>
      </div>

      {/* Leads récents */}
      <Panel title="Leads récents" subtitle={`${recentLeads.length} dernier${recentLeads.length > 1 ? 's' : ''}`}>
        {recentLeads.length === 0 ? (
          <EmptyState message="Aucun lead. Les contacts entrants depuis jlstudio.dev apparaîtront ici." />
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--agency-surface-2)' }}>
                <Th>Contact</Th>
                <Th>Source</Th>
                <Th>Statut</Th>
                <Th align="right">Date</Th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <LeadRow
                  key={lead.id}
                  contact={lead.contact}
                  source={lead.source || '—'}
                  status={lead.status}
                  createdAt={lead.createdAt}
                />
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </div>
  );
}

// ─── KPI Card ────────────────────────────────────────────────

function KpiCard({
  label, value, color, href, hint, highlight,
}: {
  label: string; value: number | string; color: string; href: string; hint?: string; highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        display: 'block',
        padding: '18px 20px',
        background: 'var(--agency-surface-1)',
        border: `1px solid ${highlight ? color + '40' : 'var(--agency-border)'}`,
        borderRadius: 12,
        textDecoration: 'none',
        position: 'relative',
        transition: 'all 0.15s',
        overflow: 'hidden',
      }}
    >
      {highlight && (
        <span
          style={{
            position: 'absolute', top: 0, right: 0,
            width: 80, height: '100%',
            background: `radial-gradient(circle at top right, ${color}1A, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
      )}
      <span
        style={{
          position: 'absolute', top: 12, right: 12,
          width: 8, height: 8, borderRadius: '50%',
          background: color, boxShadow: `0 0 8px ${color}66`,
        }}
      />
      <div
        style={{
          fontSize: 10, fontWeight: 700, color,
          textTransform: 'uppercase', letterSpacing: '0.1em',
          marginBottom: 8, opacity: 0.9,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 28, fontWeight: 700, color: 'var(--agency-ink-1)',
          letterSpacing: '-0.02em', lineHeight: 1, position: 'relative',
        }}
      >
        {value}
      </div>
      {hint && (
        <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', marginTop: 6 }}>
          {hint}
        </div>
      )}
    </Link>
  );
}

// ─── Panel ───────────────────────────────────────────────────

function Panel({
  title, subtitle, children,
}: {
  title: string; subtitle?: string; children: React.ReactNode;
}) {
  return (
    <section
      style={{
        background: 'var(--agency-surface-1)',
        border: '1px solid var(--agency-border)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <header
        style={{
          padding: '14px 18px',
          borderBottom: '1px solid var(--agency-border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          gap: 12,
        }}
      >
        <h2 style={{ fontSize: 13, fontWeight: 700, color: 'var(--agency-ink-1)', letterSpacing: '-0.01em' }}>
          {title}
        </h2>
        {subtitle && (
          <span style={{ fontSize: 11, color: 'var(--agency-ink-3)' }}>{subtitle}</span>
        )}
      </header>
      <div>{children}</div>
    </section>
  );
}

// ─── Activity row ────────────────────────────────────────────

const ACTION_LABELS: Record<string, { label: string; color: string }> = {
  create: { label: 'Création', color: '#34d399' },
  update: { label: 'Mise à jour', color: '#818cf8' },
  delete: { label: 'Suppression', color: '#f87171' },
  send:   { label: 'Envoi', color: '#fbbf24' },
};

function ActivityRow({
  action, entity, entityId, details, createdAt,
}: {
  action: string; entity: string; entityId: string | null;
  details: Record<string, unknown> | null; createdAt: Date;
}) {
  const meta = ACTION_LABELS[action] ?? { label: action, color: '#94a3b8' };
  const recipientName = (details && typeof details.recipientName === 'string') ? details.recipientName : null;
  const to = (details && typeof details.to === 'string') ? details.to : null;

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 18px',
        borderBottom: '1px solid var(--agency-border-soft, var(--agency-border))',
      }}
    >
      <span
        style={{
          width: 6, height: 6, borderRadius: '50%',
          background: meta.color, boxShadow: `0 0 6px ${meta.color}80`, flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: 'var(--agency-ink-1)', lineHeight: 1.4 }}>
          <span style={{ color: meta.color, fontWeight: 600 }}>{meta.label}</span>{' '}
          <span style={{ color: 'var(--agency-ink-2)' }}>· {entity}</span>
          {entityId && <span style={{ color: 'var(--agency-ink-3)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}> {entityId.slice(0, 8)}</span>}
          {recipientName && <span style={{ color: 'var(--agency-ink-2)' }}> → {recipientName}</span>}
          {!recipientName && to && <span style={{ color: 'var(--agency-ink-2)' }}> → {to}</span>}
        </div>
        <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', marginTop: 2 }}>
          {relativeTime(createdAt)}
        </div>
      </div>
    </div>
  );
}

// ─── Quick action ────────────────────────────────────────────

function QuickAction({
  href, label, color, icon,
}: {
  href: string; label: string; color: string; icon: string;
}) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px',
        textDecoration: 'none',
        color: 'var(--agency-ink-1)',
        fontSize: 13, fontWeight: 500,
        borderBottom: '1px solid var(--agency-border-soft, var(--agency-border))',
        transition: 'background 0.12s',
      }}
    >
      <span
        style={{
          width: 28, height: 28, borderRadius: 8,
          background: `${color}1F`, color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      <span style={{ color: 'var(--agency-ink-3)', fontSize: 12 }}>→</span>
    </Link>
  );
}

// ─── Leads table ─────────────────────────────────────────────

function Th({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <th
      style={{
        padding: '10px 16px', textAlign: align,
        fontSize: 10, fontWeight: 700,
        color: 'var(--agency-ink-3)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        borderBottom: '1px solid var(--agency-border)',
      }}
    >
      {children}
    </th>
  );
}

const LEAD_STATUS_COLORS: Record<string, string> = {
  NEW: '#34d399',
  CONTACTED: '#818cf8',
  QUALIFIED: '#fbbf24',
  CONVERTED: '#22c55e',
  LOST: '#94a3b8',
};

function LeadRow({
  contact, source, status, createdAt,
}: {
  contact: { name: string | null; email: string | null; companyName: string | null } | null;
  source: string; status: string; createdAt: Date;
}) {
  const name = contact ? (contact.companyName || contact.name || 'Lead sans nom') : 'Lead anonyme';
  const email = contact?.email ?? '—';
  const statusColor = LEAD_STATUS_COLORS[status] ?? '#94a3b8';

  return (
    <tr style={{ borderBottom: '1px solid var(--agency-border-soft, var(--agency-border))' }}>
      <td style={{ padding: '10px 16px', fontSize: 12 }}>
        <div style={{ color: 'var(--agency-ink-1)', fontWeight: 600 }}>{name}</div>
        <div style={{ color: 'var(--agency-ink-3)', fontSize: 11 }}>{email}</div>
      </td>
      <td style={{ padding: '10px 16px', fontSize: 12, color: 'var(--agency-ink-2)' }}>{source}</td>
      <td style={{ padding: '10px 16px' }}>
        <span
          style={{
            display: 'inline-block', padding: '3px 10px', borderRadius: 999,
            fontSize: 10, fontWeight: 600,
            color: statusColor, background: `${statusColor}1F`,
          }}
        >
          {status}
        </span>
      </td>
      <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: 11, color: 'var(--agency-ink-3)' }}>
        {relativeTime(createdAt)}
      </td>
    </tr>
  );
}

// ─── Empty state ─────────────────────────────────────────────

function EmptyState({ message }: { message: string }) {
  return (
    <div
      style={{
        padding: 32, textAlign: 'center',
        color: 'var(--agency-ink-3)', fontSize: 12,
      }}
    >
      {message}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────

function relativeTime(date: Date): string {
  const now = Date.now();
  const diff = (now - date.getTime()) / 1000;
  if (diff < 60) return 'à l\'instant';
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
  if (diff < 604800) return `il y a ${Math.floor(diff / 86400)} j`;
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' });
}
