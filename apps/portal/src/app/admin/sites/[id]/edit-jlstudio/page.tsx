'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import JLStudioEditor from '@/components/admin/sites/jlstudio/JLStudioEditor';
import type { JlStudioContent } from '@/components/admin/sites/jlstudio/contentSchema';

interface SiteData {
  id: string;
  name: string;
  slug: string;
  config: { jlstudio?: Partial<JlStudioContent> } | null;
  draftConfig: { jlstudio?: Partial<JlStudioContent> } | null;
}

export default function EditJlStudioSitePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [site, setSite] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;
    (async () => {
      try {
        const res = await fetch(`/api/admin/sites/${params.id}`, {
          headers: { 'x-portal-super-admin': 'true' },
        });
        if (!res.ok) throw new Error('Site introuvable');
        const s = await res.json();
        // Cette page n'est valide que pour le site jlstudio. Sinon → redirige.
        if (s.slug !== 'jlstudio') {
          router.replace(`/admin/sites/${s.id}/pages/[pageId]/edit`);
          return;
        }
        setSite(s);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Erreur');
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id, router]);

  if (loading) {
    return <div style={{ padding: 40, fontSize: 13, color: 'var(--agency-ink-3)' }}>Chargement de l&apos;éditeur sur-mesure…</div>;
  }
  if (error || !site) {
    return (
      <div style={{ padding: 40 }}>
        <p style={{ color: 'var(--agency-danger)', fontSize: 13 }}>{error || 'Site introuvable'}</p>
      </div>
    );
  }

  // Resolver : prefer brouillon, sinon live, sinon vide (les defaults seront appliqués côté composant)
  const draftContent = site.draftConfig?.jlstudio;
  const liveContent  = site.config?.jlstudio;
  const initial      = (draftContent || liveContent || {}) as Partial<JlStudioContent>;
  const hasDraft     = !!draftContent;

  return (
    <JLStudioEditor
      site={{ id: site.id, name: site.name, slug: site.slug }}
      initialContent={initial}
      hasDraft={hasDraft}
    />
  );
}
