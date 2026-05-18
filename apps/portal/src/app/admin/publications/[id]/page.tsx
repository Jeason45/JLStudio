'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { PageHeaderRibbon } from '@/components/admin/PageHeaderRibbon';
import PublicationEditor from '@/components/admin/publications/PublicationEditor';

interface Target {
  id: string;
  platform: 'LINKEDIN' | 'INSTAGRAM_FEED' | 'INSTAGRAM_STORY' | 'INSTAGRAM_REEL';
  content: Record<string, unknown>;
  scheduledAt: string | null;
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHING' | 'PUBLISHED' | 'FAILED' | 'CANCELLED';
  publicUrl: string | null;
  errorMessage: string | null;
  attempts: number;
  media: Array<{ media: { id: string } }>;
}

interface Campaign {
  id: string;
  title: string;
  description: string | null;
  status: 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'PUBLISHED' | 'ARCHIVED';
  isPinnedToCRM: boolean;
  targets: Target[];
}

export default function EditPublicationPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/admin/publications/${params.id}`, {
      headers: { 'x-portal-super-admin': 'true' },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then(setCampaign)
      .catch((e) => setError(typeof e === 'string' ? e : 'Erreur'))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleDelete = async () => {
    if (!campaign) return;
    if (!confirm(`Supprimer "${campaign.title}" ?`)) return;
    const res = await fetch(`/api/admin/publications/${campaign.id}`, {
      method: 'DELETE',
      headers: { 'x-portal-super-admin': 'true' },
    });
    if (res.ok) {
      router.push('/admin/publications');
    } else {
      const j = await res.json().catch(() => ({}));
      alert(j.error || 'Suppression impossible');
    }
  };

  if (loading) {
    return (
      <div>
        <PageHeaderRibbon label="Publications" />
        <p style={{ color: 'var(--agency-ink-3)', fontSize: 13 }}>Chargement…</p>
      </div>
    );
  }
  if (error || !campaign) {
    return (
      <div>
        <PageHeaderRibbon label="Publications" />
        <p style={{ color: 'var(--agency-danger)', fontSize: 13 }}>Publication introuvable</p>
        <Link href="/admin/publications" style={{ fontSize: 12, color: 'var(--agency-accent)' }}>
          ← Retour
        </Link>
      </div>
    );
  }

  // Transforme la campaign DB → forme attendue par PublicationEditor
  const initial = {
    id: campaign.id,
    title: campaign.title,
    description: campaign.description || '',
    status: campaign.status,
    isPinnedToCRM: campaign.isPinnedToCRM,
    targets: campaign.targets.map((t) => ({
      id: t.id,
      platform: t.platform,
      content: t.content,
      // datetime-local format : YYYY-MM-DDTHH:MM
      scheduledAt: t.scheduledAt ? new Date(t.scheduledAt).toISOString().slice(0, 16) : null,
      status: t.status,
      mediaIds: t.media.map((m) => m.media.id),
      publicUrl: t.publicUrl,
      errorMessage: t.errorMessage,
      attempts: t.attempts,
    })),
  };

  return (
    <div>
      <PageHeaderRibbon label="Publications · Édition" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Link
          href="/admin/publications"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 12, color: 'var(--agency-ink-3)', textDecoration: 'none',
          }}
        >
          <ArrowLeft size={12} /> Retour aux publications
        </Link>
        <button
          onClick={handleDelete}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '6px 10px', borderRadius: 6,
            background: 'transparent', border: '1px solid var(--agency-danger)',
            color: 'var(--agency-danger)', fontSize: 11, cursor: 'pointer',
          }}
        >
          <Trash2 size={12} /> Supprimer
        </button>
      </div>
      <PublicationEditor mode="edit" initial={initial} />
    </div>
  );
}
