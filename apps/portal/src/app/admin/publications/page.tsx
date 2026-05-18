'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Plus, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { PageHeaderRibbon } from '@/components/admin/PageHeaderRibbon';

type CampaignStatus = 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'PUBLISHED' | 'ARCHIVED';
type Platform = 'LINKEDIN' | 'INSTAGRAM_FEED' | 'INSTAGRAM_STORY' | 'INSTAGRAM_REEL';

interface TargetSummary {
  id: string;
  platform: Platform;
  status: string;
  scheduledAt: string | null;
  publishedAt: string | null;
  publicUrl: string | null;
}

interface Campaign {
  id: string;
  title: string;
  description: string | null;
  status: CampaignStatus;
  isPinnedToCRM: boolean;
  createdAt: string;
  updatedAt: string;
  targets: TargetSummary[];
  _count: { targets: number };
}

const PLATFORMS: Record<Platform, { label: string; color: string }> = {
  LINKEDIN:        { label: 'LinkedIn',        color: '#0A66C2' },
  INSTAGRAM_FEED:  { label: 'IG Feed',         color: '#E1306C' },
  INSTAGRAM_STORY: { label: 'IG Story',        color: '#F77737' },
  INSTAGRAM_REEL:  { label: 'IG Reel',         color: '#FE7BAC' },
};

const STATUS_CONFIG: Record<CampaignStatus, { label: string; color: string; bg: string }> = {
  DRAFT:      { label: 'Brouillon', color: '#94a3b8', bg: '#94a3b822' },
  SCHEDULED:  { label: 'Planifié',  color: '#3b82f6', bg: '#3b82f622' },
  ACTIVE:     { label: 'En cours',  color: '#f59e0b', bg: '#f59e0b22' },
  PUBLISHED:  { label: 'Publié',    color: '#22c55e', bg: '#22c55e22' },
  ARCHIVED:   { label: 'Archivé',   color: '#71717a', bg: '#71717a22' },
};

export default function PublicationsListPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<CampaignStatus | 'all'>('all');
  const [platformFilter, setPlatformFilter] = useState<Platform | 'all'>('all');

  const fetchData = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.set('status', filter);
      if (platformFilter !== 'all') params.set('platform', platformFilter);
      const res = await fetch(`/api/admin/publications?${params.toString()}`, {
        headers: { 'x-portal-super-admin': 'true' },
      });
      const data = await res.json();
      setCampaigns(Array.isArray(data) ? data : []);
    } catch {
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  }, [filter, platformFilter]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  const filterChips: Array<{ key: CampaignStatus | 'all'; label: string }> = [
    { key: 'all',       label: 'Toutes' },
    { key: 'DRAFT',     label: 'Brouillons' },
    { key: 'SCHEDULED', label: 'Planifiées' },
    { key: 'ACTIVE',    label: 'En cours' },
    { key: 'PUBLISHED', label: 'Publiées' },
  ];

  return (
    <div>
      <PageHeaderRibbon label="Publications" />

      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', margin: 0 }}>
            {campaigns.length} publication{campaigns.length > 1 ? 's' : ''}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/admin/publications/calendar" style={btn('secondary')}>
            <CalendarIcon size={13} /> Calendrier
          </Link>
          <Link href="/admin/publications/new" style={btn('primary')}>
            <Plus size={13} /> Nouvelle publication
          </Link>
        </div>
      </header>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        <Filter size={14} style={{ color: 'var(--agency-ink-3)' }} />
        {filterChips.map((f) => {
          const isActive = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              style={{
                padding: '4px 10px', borderRadius: 6,
                border: `1px solid ${isActive ? 'var(--agency-accent)' : 'var(--agency-border)'}`,
                background: isActive ? 'var(--agency-accent-soft)' : 'var(--agency-surface-2)',
                color: isActive ? 'var(--agency-accent)' : 'var(--agency-ink-3)',
                fontSize: 11, fontWeight: 500, cursor: 'pointer',
              }}
            >
              {f.label}
            </button>
          );
        })}
        <span style={{ width: 1, height: 20, background: 'var(--agency-border)', margin: '0 6px' }} />
        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value as Platform | 'all')}
          style={{
            padding: '4px 10px', borderRadius: 6,
            border: '1px solid var(--agency-border)',
            background: 'var(--agency-surface-2)',
            color: 'var(--agency-ink-2)',
            fontSize: 11, cursor: 'pointer',
          }}
        >
          <option value="all">Toutes plateformes</option>
          {(Object.keys(PLATFORMS) as Platform[]).map((p) => (
            <option key={p} value={p}>{PLATFORMS[p].label}</option>
          ))}
        </select>
      </div>

      {/* Liste */}
      {loading ? (
        <div style={emptyState()}>
          <p>Chargement…</p>
        </div>
      ) : campaigns.length === 0 ? (
        <div style={emptyState()}>
          <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Aucune publication</p>
          <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginBottom: 16 }}>
            Crée ta première publication pour démarrer.
          </p>
          <Link href="/admin/publications/new" style={btn('primary')}>
            <Plus size={13} /> Nouvelle publication
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {campaigns.map((c) => (
            <Link
              key={c.id}
              href={`/admin/publications/${c.id}`}
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
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--agency-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--agency-border)')}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.title}
                  </h3>
                  {c.description && (
                    <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.description}
                    </p>
                  )}
                </div>
                <StatusBadge status={c.status} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {c.targets.map((t) => {
                    const cfg = PLATFORMS[t.platform];
                    return (
                      <span
                        key={t.id}
                        style={{
                          fontSize: 10,
                          fontWeight: 500,
                          color: cfg.color,
                          background: `${cfg.color}15`,
                          padding: '2px 7px',
                          borderRadius: 5,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                        title={`${t.status}${t.scheduledAt ? ` · ${new Date(t.scheduledAt).toLocaleString('fr-FR')}` : ''}`}
                      >
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.color }} />
                        {cfg.label}
                      </span>
                    );
                  })}
                </div>
                <span style={{ fontSize: 10, color: 'var(--agency-ink-4)' }}>
                  {new Date(c.updatedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: CampaignStatus }) {
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
    background: variant === 'primary' ? 'var(--agency-accent)' : 'var(--agency-surface-2)',
    color: variant === 'primary' ? 'white' : 'var(--agency-ink-1)',
    fontSize: 12, fontWeight: 500, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 5, textDecoration: 'none',
  };
}
