'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageEditor from '@/components/admin/sites/PageEditor';

interface SiteData { id: string; name: string; slug: string }
interface PageData {
  id: string;
  slug: string;
  title: string;
  isHome: boolean;
  config: Record<string, unknown>;
  draftConfig: Record<string, unknown> | null;
  publishedAt: string | null;
}

export default function PageEditPage() {
  const params = useParams<{ id: string; pageId: string }>();
  const router = useRouter();
  const [site, setSite] = useState<SiteData | null>(null);
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id || !params.pageId) return;
    (async () => {
      try {
        const [sRes, pRes] = await Promise.all([
          fetch(`/api/admin/sites/${params.id}`, { headers: { 'x-portal-super-admin': 'true' } }),
          fetch(`/api/admin/sites/${params.id}/pages/${params.pageId}`, { headers: { 'x-portal-super-admin': 'true' } }),
        ]);
        if (!sRes.ok || !pRes.ok) throw new Error('Introuvable');
        setSite(await sRes.json());
        setPage(await pRes.json());
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Erreur');
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id, params.pageId]);

  if (loading) {
    return <div style={{ padding: 40, color: 'var(--agency-ink-3)', fontSize: 13 }}>Chargement de l&apos;éditeur…</div>;
  }
  if (error || !site || !page) {
    return (
      <div style={{ padding: 40 }}>
        <p style={{ color: 'var(--agency-danger)', fontSize: 13 }}>Page introuvable</p>
        <button onClick={() => router.push(`/admin/sites/${params.id}`)} style={{
          marginTop: 12, padding: '8px 14px', borderRadius: 8,
          background: '#06b6d4', color: 'white', border: 'none', cursor: 'pointer', fontSize: 13,
        }}>
          ← Retour au site
        </button>
      </div>
    );
  }

  return <PageEditor site={site} page={page} />;
}
