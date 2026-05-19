'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Plus, Globe, ExternalLink, FileText, AlertCircle } from 'lucide-react';
import { PageHeaderRibbon } from '@/components/admin/PageHeaderRibbon';

type SiteStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

interface SiteListItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  status: SiteStatus;
  deployUrl: string | null;
  thumbnail: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  hasDraft: boolean;
  _count: { pages: number };
}

const STATUS_CONFIG: Record<SiteStatus, { label: string; color: string; bg: string }> = {
  DRAFT:     { label: 'Brouillon', color: '#94a3b8', bg: '#94a3b822' },
  PUBLISHED: { label: 'En ligne',  color: '#22c55e', bg: '#22c55e22' },
  ARCHIVED:  { label: 'Archivé',   color: '#71717a', bg: '#71717a22' },
};

export default function SitesListPage() {
  const [sites, setSites] = useState<SiteListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/sites', {
        headers: { 'x-portal-super-admin': 'true' },
      });
      const data = await res.json();
      setSites(Array.isArray(data) ? data : []);
    } catch {
      setSites([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const visibleSites = sites.filter((s) => s.status !== 'ARCHIVED');

  return (
    <div>
      <PageHeaderRibbon label="Sites web" />

      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', margin: 0 }}>
            {visibleSites.length} site{visibleSites.length > 1 ? 's' : ''} actif{visibleSites.length > 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/admin/sites/new" style={btn('primary')}>
          <Plus size={13} /> Nouveau site
        </Link>
      </header>

      {loading ? (
        <div style={emptyState()}>
          <p>Chargement…</p>
        </div>
      ) : visibleSites.length === 0 ? (
        <div style={emptyState()}>
          <Globe size={32} style={{ color: 'var(--agency-ink-4)', marginBottom: 12 }} />
          <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Aucun site</p>
          <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginBottom: 16 }}>
            Crée ton premier site (le tien ou un site client).
          </p>
          <Link href="/admin/sites/new" style={btn('primary')}>
            <Plus size={13} /> Nouveau site
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {visibleSites.map((s) => (
            <Link
              key={s.id}
              href={`/admin/sites/${s.id}`}
              style={{
                display: 'block',
                padding: 14,
                background: 'var(--agency-surface-1)',
                border: '1px solid var(--agency-border)',
                borderRadius: 10,
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#06b6d4')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--agency-border)')}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Globe size={14} style={{ color: '#06b6d4', flexShrink: 0 }} />
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {s.name}
                    </h3>
                    {s.hasDraft && (
                      <span title="Modifications non publiées" style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10, color: '#f59e0b', fontWeight: 600 }}>
                        <AlertCircle size={11} /> brouillon
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--agency-ink-3)', margin: 0, fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>
                    /{s.slug}
                  </p>
                  {s.description && (
                    <p style={{ fontSize: 12, color: 'var(--agency-ink-2)', margin: 0, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {s.description}
                    </p>
                  )}
                </div>
                <StatusBadge status={s.status} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 11, color: 'var(--agency-ink-3)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <FileText size={11} /> {s._count.pages} page{s._count.pages > 1 ? 's' : ''}
                </span>
                {s.deployUrl && (
                  <a
                    href={s.deployUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#06b6d4', textDecoration: 'none' }}
                  >
                    <ExternalLink size={11} /> Voir le site
                  </a>
                )}
                <span>
                  Maj {new Date(s.updatedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: SiteStatus }) {
  const c = STATUS_CONFIG[status];
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, color: c.color, background: c.bg,
      padding: '2px 8px', borderRadius: 6, letterSpacing: 0.2, flexShrink: 0,
    }}>
      {c.label}
    </span>
  );
}

function emptyState(): React.CSSProperties {
  return {
    padding: 60, textAlign: 'center' as const,
    background: 'var(--agency-surface-1)',
    border: '1px solid var(--agency-border)',
    borderRadius: 10,
    color: 'var(--agency-ink-2)',
  };
}
function btn(variant: 'primary' | 'secondary'): React.CSSProperties {
  return {
    padding: '7px 12px', borderRadius: 8,
    border: variant === 'primary' ? 'none' : '1px solid var(--agency-border)',
    background: variant === 'primary' ? '#06b6d4' : 'var(--agency-surface-2)',
    color: variant === 'primary' ? 'white' : 'var(--agency-ink-1)',
    fontSize: 12, fontWeight: 500, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 5, textDecoration: 'none',
  };
}
