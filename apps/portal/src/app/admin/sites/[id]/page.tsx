'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Plus, Globe, Home, ExternalLink, Settings as SettingsIcon,
  Archive, Edit, AlertCircle, FileText, Trash2,
} from 'lucide-react';
import { PageHeaderRibbon } from '@/components/admin/PageHeaderRibbon';

type SiteStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

interface SiteDetail {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  status: SiteStatus;
  deployUrl: string | null;
  publishedAt: string | null;
  draftConfig: unknown;
  config: unknown;
  createdAt: string;
  updatedAt: string;
  _count: { pages: number };
}

interface PageItem {
  id: string;
  slug: string;
  title: string;
  order: number;
  isHome: boolean;
  publishedAt: string | null;
  hasDraft: boolean;
  updatedAt: string;
}

export default function SiteDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [site, setSite] = useState<SiteDetail | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasSiteDraft = !!site?.draftConfig;

  const fetchAll = useCallback(async () => {
    if (!params.id) return;
    try {
      const [siteRes, pagesRes] = await Promise.all([
        fetch(`/api/admin/sites/${params.id}`, { headers: { 'x-portal-super-admin': 'true' } }),
        fetch(`/api/admin/sites/${params.id}/pages`, { headers: { 'x-portal-super-admin': 'true' } }),
      ]);
      if (!siteRes.ok) throw new Error('Site introuvable');
      const s = await siteRes.json();
      // Site jlstudio → éditeur sur-mesure dédié (pas la version générique multi-pages)
      if (s.slug === 'jlstudio') {
        router.replace(`/admin/sites/${params.id}/edit-jlstudio`);
        return;
      }
      setSite(s);
      setPages(pagesRes.ok ? await pagesRes.json() : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleArchive = async () => {
    if (!site || !confirm(`Archiver "${site.name}" ?`)) return;
    await fetch(`/api/admin/sites/${site.id}`, {
      method: 'DELETE',
      headers: { 'x-portal-super-admin': 'true' },
    });
    router.push('/admin/sites');
  };

  const handleDeletePage = async (pageId: string, pageTitle: string) => {
    if (!confirm(`Supprimer la page "${pageTitle}" ?`)) return;
    const res = await fetch(`/api/admin/sites/${params.id}/pages/${pageId}`, {
      method: 'DELETE',
      headers: { 'x-portal-super-admin': 'true' },
    });
    if (res.ok) {
      fetchAll();
    } else {
      const j = await res.json().catch(() => ({}));
      alert(j.error || 'Suppression impossible');
    }
  };

  const handlePublishSite = async () => {
    if (!site) return;
    const res = await fetch(`/api/admin/sites/${site.id}/publish`, {
      method: 'POST',
      headers: { 'x-portal-super-admin': 'true' },
    });
    if (res.ok) {
      fetchAll();
    } else {
      const j = await res.json().catch(() => ({}));
      alert(j.error || 'Publication impossible');
    }
  };

  if (loading) {
    return (
      <div>
        <PageHeaderRibbon label="Sites" />
        <p style={{ fontSize: 13, color: 'var(--agency-ink-3)' }}>Chargement…</p>
      </div>
    );
  }
  if (error || !site) {
    return (
      <div>
        <PageHeaderRibbon label="Sites" />
        <p style={{ fontSize: 13, color: 'var(--agency-danger)' }}>Site introuvable</p>
        <Link href="/admin/sites" style={{ fontSize: 12, color: '#06b6d4' }}>← Retour</Link>
      </div>
    );
  }

  const statusConfig: Record<SiteStatus, { label: string; color: string; bg: string }> = {
    DRAFT:     { label: 'Brouillon', color: '#94a3b8', bg: '#94a3b822' },
    PUBLISHED: { label: 'En ligne',  color: '#22c55e', bg: '#22c55e22' },
    ARCHIVED:  { label: 'Archivé',   color: '#71717a', bg: '#71717a22' },
  };
  const sc = statusConfig[site.status];

  return (
    <div>
      <PageHeaderRibbon label={`Sites · ${site.name}`} />

      <div style={{ marginBottom: 16 }}>
        <Link href="/admin/sites" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--agency-ink-3)', textDecoration: 'none' }}>
          <ArrowLeft size={12} /> Retour aux sites
        </Link>
      </div>

      {/* Header site */}
      <section style={{
        background: 'var(--agency-surface-1)',
        border: '1px solid var(--agency-border)',
        borderRadius: 12,
        padding: 18,
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <Globe size={18} style={{ color: '#06b6d4' }} />
              <h1 style={{ fontSize: 18, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0 }}>{site.name}</h1>
              <span style={{ fontSize: 10, fontWeight: 600, color: sc.color, background: sc.bg, padding: '2px 8px', borderRadius: 6 }}>
                {sc.label}
              </span>
            </div>
            <p style={{ fontSize: 11, color: 'var(--agency-ink-3)', margin: 0, fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>/{site.slug}</p>
            {site.description && (
              <p style={{ fontSize: 13, color: 'var(--agency-ink-2)', margin: '6px 0 0' }}>{site.description}</p>
            )}
            {hasSiteDraft && (
              <p style={{ fontSize: 11, color: '#f59e0b', margin: '8px 0 0', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <AlertCircle size={11} /> Brouillon de paramètres non publié
              </p>
            )}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {site.deployUrl && (
              <a href={site.deployUrl} target="_blank" rel="noopener noreferrer" style={btn('secondary')}>
                <ExternalLink size={12} /> Site en ligne
              </a>
            )}
            <Link href={`/admin/sites/${site.id}/settings`} style={btn('secondary')}>
              <SettingsIcon size={12} /> Paramètres
            </Link>
            {hasSiteDraft && (
              <button onClick={handlePublishSite} style={btn('primary')}>
                Publier paramètres
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Liste des pages */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0 }}>
          Pages <span style={{ color: 'var(--agency-ink-3)', fontWeight: 400 }}>({pages.length})</span>
        </h2>
        <Link href={`/admin/sites/${site.id}/pages/new`} style={btn('primary')}>
          <Plus size={13} /> Nouvelle page
        </Link>
      </div>

      {pages.length === 0 ? (
        <div style={emptyState()}>
          <FileText size={28} style={{ color: 'var(--agency-ink-4)', marginBottom: 10 }} />
          <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Aucune page pour l&apos;instant</p>
          <p style={{ fontSize: 11, color: 'var(--agency-ink-3)', marginBottom: 14 }}>
            Crée ta première page (idéalement la home).
          </p>
          <Link href={`/admin/sites/${site.id}/pages/new`} style={btn('primary')}>
            <Plus size={13} /> Nouvelle page
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 6 }}>
          {pages.map((p) => (
            <div
              key={p.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 12,
                background: 'var(--agency-surface-1)',
                border: '1px solid var(--agency-border)',
                borderRadius: 10,
              }}
            >
              <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                {p.isHome ? (
                  <Home size={13} style={{ color: '#06b6d4', flexShrink: 0 }} />
                ) : (
                  <FileText size={13} style={{ color: 'var(--agency-ink-3)', flexShrink: 0 }} />
                )}
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--agency-ink-1)' }}>{p.title}</span>
                    {p.isHome && (
                      <span style={{ fontSize: 9, fontWeight: 600, color: '#06b6d4', background: '#06b6d422', padding: '1px 6px', borderRadius: 4 }}>
                        ACCUEIL
                      </span>
                    )}
                    {p.hasDraft && (
                      <span title="Brouillon non publié" style={{ fontSize: 9, fontWeight: 600, color: '#f59e0b', background: '#f59e0b22', padding: '1px 6px', borderRadius: 4 }}>
                        BROUILLON
                      </span>
                    )}
                    {!p.publishedAt && !p.hasDraft && (
                      <span style={{ fontSize: 9, fontWeight: 600, color: '#94a3b8', background: '#94a3b822', padding: '1px 6px', borderRadius: 4 }}>
                        NON PUBLIÉE
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 10, color: 'var(--agency-ink-3)', margin: '2px 0 0', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>
                    /{p.slug}
                  </p>
                </div>
              </div>
              <Link href={`/admin/sites/${site.id}/pages/${p.id}/edit`} style={iconBtn()}>
                <Edit size={13} /> Éditer
              </Link>
              {!p.isHome && (
                <button onClick={() => handleDeletePage(p.id, p.title)} style={iconBtnDanger()} title="Supprimer">
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer actions site */}
      <div style={{ marginTop: 28, paddingTop: 16, borderTop: '1px solid var(--agency-border)' }}>
        <button onClick={handleArchive} style={{
          padding: '7px 12px', borderRadius: 8,
          background: 'transparent', border: '1px solid var(--agency-border)',
          color: 'var(--agency-ink-3)', fontSize: 11, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <Archive size={12} /> Archiver ce site
        </button>
      </div>
    </div>
  );
}

function emptyState(): React.CSSProperties {
  return {
    padding: 40, textAlign: 'center' as const,
    background: 'var(--agency-surface-1)',
    border: '1px dashed var(--agency-border-strong)',
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
function iconBtn(): React.CSSProperties {
  return {
    padding: '6px 10px', borderRadius: 6,
    border: '1px solid var(--agency-border)',
    background: 'var(--agency-surface-2)',
    color: 'var(--agency-ink-1)',
    fontSize: 11, fontWeight: 500, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none',
  };
}
function iconBtnDanger(): React.CSSProperties {
  return {
    width: 32, height: 32, borderRadius: 6,
    border: '1px solid var(--agency-border)',
    background: 'transparent',
    color: '#ef4444',
    cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  };
}
