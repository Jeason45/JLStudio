'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import JLStudioPreview from '@/components/admin/sites/jlstudio/JLStudioPreview';
import { DEFAULT_JLSTUDIO_CONTENT } from '@/components/admin/sites/jlstudio/contentSchema';
import type { JlStudioContent } from '@/components/admin/sites/jlstudio/contentSchema';

function withDefaults(partial: Partial<JlStudioContent>): JlStudioContent {
  return {
    hero:         { ...DEFAULT_JLSTUDIO_CONTENT.hero,         ...(partial.hero || {}) },
    services:     { ...DEFAULT_JLSTUDIO_CONTENT.services,     ...(partial.services || {}) },
    process:      { ...DEFAULT_JLSTUDIO_CONTENT.process,      ...(partial.process || {}) },
    portfolio:    { ...DEFAULT_JLSTUDIO_CONTENT.portfolio,    ...(partial.portfolio || {}) },
    testimonials: { ...DEFAULT_JLSTUDIO_CONTENT.testimonials, ...(partial.testimonials || {}) },
    about:        { ...DEFAULT_JLSTUDIO_CONTENT.about,        ...(partial.about || {}) },
    faq:          { ...DEFAULT_JLSTUDIO_CONTENT.faq,          ...(partial.faq || {}) },
    contact:      { ...DEFAULT_JLSTUDIO_CONTENT.contact,      ...(partial.contact || {}) },
    global:       { ...DEFAULT_JLSTUDIO_CONTENT.global,       ...(partial.global || {}) },
  };
}

export default function JLStudioPreviewPage() {
  const params = useParams<{ id: string }>();
  const [content, setContent] = useState<JlStudioContent | null>(null);
  const [usingDraft, setUsingDraft] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/admin/sites/${params.id}`, { headers: { 'x-portal-super-admin': 'true' } })
      .then((r) => r.ok ? r.json() : null)
      .then((s) => {
        if (!s) return;
        const draft = s.draftConfig?.jlstudio as Partial<JlStudioContent> | undefined;
        const live = s.config?.jlstudio as Partial<JlStudioContent> | undefined;
        setUsingDraft(!!draft);
        setContent(withDefaults(draft || live || {}));
      });
  }, [params.id]);

  if (!content) {
    return <div style={{ padding: 40, color: '#64748b', fontSize: 13 }}>Chargement de l&apos;aperçu…</div>;
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        overflowY: 'auto',
        background: '#ffffff',
      }}
    >
      {/* Bandeau "aperçu" — sticky en haut */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        padding: '10px 16px',
        background: '#0f172a', color: 'white',
        fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span>
          🔍 <strong>Aperçu site jlstudio.dev</strong> ·{' '}
          <span style={{ color: usingDraft ? '#fbbf24' : '#22c55e' }}>
            {usingDraft ? 'BROUILLON (non publié)' : 'EN LIGNE'}
          </span>
        </span>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>
          Rendu simplifié — sans animations Lenis/parallax/GSAP du site réel
        </span>
      </div>
      <JLStudioPreview content={content} />
    </div>
  );
}
