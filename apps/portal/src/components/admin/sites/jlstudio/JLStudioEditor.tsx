'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Save, Send, AlertCircle, Check, Loader2, X, Eye, Edit3,
} from 'lucide-react';
import {
  JL_SECTIONS, DEFAULT_JLSTUDIO_CONTENT, getSectionCompleteness,
} from './contentSchema';
import type {
  JlStudioContent, JlStudioSection, Completeness,
} from './contentSchema';
import {
  HeroEditor, ServicesEditor, ProcessEditor, PortfolioEditor,
  TestimonialsEditor, AboutEditor, FaqEditor, ContactEditor, GlobalEditor,
} from './SectionEditors';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface SiteData {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  site: SiteData;
  initialContent: Partial<JlStudioContent>;
  hasDraft: boolean;
}

// Fusionne le contenu en base avec les defaults (au cas où des clés manquent côté DB)
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

export default function JLStudioEditor({ site, initialContent, hasDraft: initialHasDraft }: Props) {
  const router = useRouter();
  const [content, setContent] = useState<JlStudioContent>(() => withDefaults(initialContent));
  const [selected, setSelected] = useState<JlStudioSection>('hero');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [hasDraft, setHasDraft] = useState<boolean>(initialHasDraft);
  const [publishing, setPublishing] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [toast, setToast] = useState<{ kind: 'success' | 'error'; message: string } | null>(null);
  const [savedAgo, setSavedAgo] = useState<string>('');
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [previewKey, setPreviewKey] = useState<number>(0);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Tick toutes les 10s pour mettre à jour le "il y a Xs"
  useEffect(() => {
    if (!lastSavedAt) return;
    const tick = () => {
      const sec = Math.floor((Date.now() - lastSavedAt.getTime()) / 1000);
      if (sec < 60) setSavedAgo(`il y a ${sec}s`);
      else if (sec < 3600) setSavedAgo(`il y a ${Math.floor(sec / 60)} min`);
      else setSavedAgo(`il y a ${Math.floor(sec / 3600)}h`);
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, [lastSavedAt]);

  // Auto-save sur PATCH /draft (merge incrémental shallow par section)
  const triggerSave = useCallback((sectionKey: JlStudioSection, sectionContent: unknown) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSaveStatus('saving');
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/sites/${site.id}/draft`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'x-portal-super-admin': 'true' },
          body: JSON.stringify({ config: { [sectionKey]: sectionContent } }),
        });
        if (res.ok) {
          setSaveStatus('saved');
          setHasDraft(true);
          setLastSavedAt(new Date());
          setTimeout(() => setSaveStatus('idle'), 1800);
        } else {
          setSaveStatus('error');
        }
      } catch {
        setSaveStatus('error');
      }
    }, 1500);
  }, [site.id]);

  const updateSection = <K extends JlStudioSection>(key: K, value: JlStudioContent[K]) => {
    setContent((prev) => ({ ...prev, [key]: value }));
    triggerSave(key, value);
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const res = await fetch(`/api/admin/sites/${site.id}/publish`, {
        method: 'POST',
        headers: { 'x-portal-super-admin': 'true' },
      });
      if (res.ok) {
        setHasDraft(false);
        setShowPublishModal(false);
        setToast({ kind: 'success', message: 'Site publié ✓ Tes modifications sont en ligne.' });
        setTimeout(() => setToast(null), 6000);
      } else {
        const j = await res.json().catch(() => ({}));
        setToast({ kind: 'error', message: j.error || 'Publication impossible' });
        setTimeout(() => setToast(null), 6000);
      }
    } finally {
      setPublishing(false);
    }
  };

  const handleDiscard = async () => {
    if (!confirm('Annuler toutes les modifications en cours ? La version en ligne sera restaurée.')) return;
    await fetch(`/api/admin/sites/${site.id}/draft`, {
      method: 'DELETE',
      headers: { 'x-portal-super-admin': 'true' },
    });
    router.refresh();
    window.location.reload();
  };

  // Bascule vers l'aperçu : flush l'auto-save en cours pour que le brouillon
  // en DB soit à jour, puis reload l'iframe.
  const switchToPreview = async () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    setSaveStatus('saving');
    try {
      // Save synchrone du contenu complet jlstudio
      await fetch(`/api/admin/sites/${site.id}/draft`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-portal-super-admin': 'true' },
        body: JSON.stringify({ config: { jlstudio: content } }),
      });
      setHasDraft(true);
      setLastSavedAt(new Date());
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 1500);
    } catch {
      setSaveStatus('error');
    }
    setPreviewKey((k) => k + 1);
    setView('preview');
  };

  const sectionsCompleteness: Record<JlStudioSection, Completeness> = {
    hero:         getSectionCompleteness('hero', content),
    services:     getSectionCompleteness('services', content),
    process:      getSectionCompleteness('process', content),
    portfolio:    getSectionCompleteness('portfolio', content),
    testimonials: getSectionCompleteness('testimonials', content),
    about:        getSectionCompleteness('about', content),
    faq:          getSectionCompleteness('faq', content),
    contact:      getSectionCompleteness('contact', content),
    global:       getSectionCompleteness('global', content),
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 56px)' }}>
      {/* Header sticky */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', gap: 12,
        background: 'var(--agency-surface-1)',
        borderBottom: '1px solid var(--agency-border)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <Link href="/admin/sites" style={{ color: 'var(--agency-ink-3)', textDecoration: 'none', display: 'inline-flex', gap: 4, alignItems: 'center', fontSize: 12 }}>
            <ArrowLeft size={12} /> Sites
          </Link>
          <span style={{ color: 'var(--agency-ink-4)' }}>·</span>
          <strong style={{ fontSize: 13, color: 'var(--agency-ink-1)' }}>
            {site.name}
          </strong>
          <span style={{ fontSize: 11, color: 'var(--agency-ink-3)' }}>· éditeur sur-mesure</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Tab toggle Édition / Aperçu */}
          <div style={{
            display: 'inline-flex', padding: 3, borderRadius: 8,
            background: 'var(--agency-surface-2)',
            border: '1px solid var(--agency-border)',
          }}>
            <button
              onClick={() => setView('edit')}
              style={tabBtn(view === 'edit')}
              title="Édition"
            >
              <Edit3 size={12} /> Édition
            </button>
            <button
              onClick={switchToPreview}
              style={tabBtn(view === 'preview')}
              title="Aperçu (utilise le brouillon en cours)"
            >
              <Eye size={12} /> Aperçu
            </button>
          </div>

          <SaveIndicator status={saveStatus} hasDraft={hasDraft} savedAgo={savedAgo} />
          {hasDraft && view === 'edit' && (
            <button onClick={handleDiscard} style={btn('ghost')}>
              <X size={13} /> Annuler
            </button>
          )}
          <a
            href="https://jlstudio.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={btn('secondary')}
            title="Voir le site en ligne (production)"
          >
            🌐 Site live
          </a>
          <button
            onClick={() => setShowPublishModal(true)}
            disabled={publishing || !hasDraft}
            style={{ ...btn('primary'), opacity: hasDraft ? 1 : 0.45 }}
            title={hasDraft ? 'Publier' : 'Aucune modif à publier'}
          >
            <Send size={13} /> Publier
          </button>
        </div>
      </header>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

        {view === 'preview' ? (
          /* Aperçu : iframe sur jlstudio.dev/preview qui charge le brouillon
             dans les VRAIS composants landing-v3 (animations, design réel) */
          <div style={{ flex: 1, minHeight: 0, background: '#0f172a', padding: 0 }}>
            <iframe
              key={previewKey}
              src={`https://jlstudio.dev/preview?ts=${previewKey}`}
              style={{ width: '100%', height: '100%', border: 'none', background: 'white' }}
              title="Aperçu site JL Studio (rendu réel)"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        ) : (
          <>

        {/* Sidebar gauche */}
        <aside style={{
          width: 240, borderRight: '1px solid var(--agency-border)',
          background: 'var(--agency-surface-1)',
          display: 'flex', flexDirection: 'column', flexShrink: 0,
          overflowY: 'auto',
        }}>
          <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--agency-border)' }}>
            <h2 style={{ fontSize: 10, fontWeight: 700, color: 'var(--agency-ink-3)', margin: 0, letterSpacing: 0.5, textTransform: 'uppercase' }}>
              Sections du site
            </h2>
          </div>
          <nav style={{ flex: 1, padding: 6 }}>
            {JL_SECTIONS.map((s) => {
              const isActive = selected === s.key;
              const status = sectionsCompleteness[s.key];
              return (
                <button
                  key={s.key}
                  onClick={() => setSelected(s.key)}
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '9px 10px', borderRadius: 6, marginBottom: 2,
                    background: isActive ? '#06b6d418' : 'transparent',
                    border: 'none',
                    borderLeft: `2px solid ${isActive ? '#06b6d4' : 'transparent'}`,
                    color: 'var(--agency-ink-1)', cursor: 'pointer',
                    fontFamily: 'inherit', textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>{s.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: isActive ? 600 : 500, color: isActive ? '#06b6d4' : 'var(--agency-ink-1)' }}>
                      {s.label}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--agency-ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {s.description}
                    </div>
                  </div>
                  <CompletenessDot status={status} />
                </button>
              );
            })}
          </nav>
          <div style={{ padding: 12, fontSize: 10, color: 'var(--agency-ink-4)', borderTop: '1px solid var(--agency-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <CompletenessDot status="complete" /> Complet
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <CompletenessDot status="partial" /> Partiel
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <CompletenessDot status="empty" /> Vide
            </div>
          </div>
        </aside>

        {/* Zone d'édition */}
        <main style={{ flex: 1, overflowY: 'auto', padding: 24, background: 'var(--agency-surface-0)' }}>
          <div style={{ width: '100%' }}>
            <SectionHeader sectionKey={selected} status={sectionsCompleteness[selected]} />
            <div style={{
              background: 'var(--agency-surface-1)',
              border: '1px solid var(--agency-border)',
              borderRadius: 12, padding: 18, marginTop: 16,
            }}>
              {selected === 'hero' && <HeroEditor content={content.hero} onChange={(c) => updateSection('hero', c)} />}
              {selected === 'services' && <ServicesEditor content={content.services} onChange={(c) => updateSection('services', c)} />}
              {selected === 'process' && <ProcessEditor content={content.process} onChange={(c) => updateSection('process', c)} />}
              {selected === 'portfolio' && <PortfolioEditor content={content.portfolio} onChange={(c) => updateSection('portfolio', c)} />}
              {selected === 'testimonials' && <TestimonialsEditor content={content.testimonials} onChange={(c) => updateSection('testimonials', c)} />}
              {selected === 'about' && <AboutEditor content={content.about} onChange={(c) => updateSection('about', c)} />}
              {selected === 'faq' && <FaqEditor content={content.faq} onChange={(c) => updateSection('faq', c)} />}
              {selected === 'contact' && <ContactEditor content={content.contact} onChange={(c) => updateSection('contact', c)} />}
              {selected === 'global' && <GlobalEditor content={content.global} onChange={(c) => updateSection('global', c)} />}
            </div>
          </div>
        </main>
          </>
        )}
      </div>

      {/* Modal publish */}
      {showPublishModal && (
        <div
          onClick={() => setShowPublishModal(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
            zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--agency-surface-1)',
              border: '1px solid var(--agency-border)',
              borderRadius: 14, padding: 22,
              maxWidth: 480, width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Send size={18} style={{ color: '#06b6d4' }} />
              <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0 }}>
                Publier les modifications ?
              </h3>
            </div>
            <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', margin: '0 0 16px', lineHeight: 1.5 }}>
              Les modifications du brouillon seront poussées en ligne. Une fois publiées, elles seront visibles sur ton site (après redéploiement du site web).
            </p>
            <div style={{
              padding: 12, background: '#f59e0b15', border: '1px solid #f59e0b44',
              borderRadius: 8, marginBottom: 16,
            }}>
              <p style={{ fontSize: 12, color: '#fbbf24', margin: 0, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <AlertCircle size={12} />
                Le site `apps/web` doit être rebuild pour refléter le contenu en ligne (à venir).
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowPublishModal(false)} style={btn('secondary')}>Annuler</button>
              <button onClick={handlePublish} disabled={publishing} style={btn('primary')}>
                {publishing ? 'Publication…' : 'Publier maintenant'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          role="status"
          style={{
            position: 'fixed', top: 16, right: 16,
            zIndex: 1100,
            padding: '12px 16px',
            background: toast.kind === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${toast.kind === 'success' ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`,
            borderRadius: 8,
            color: toast.kind === 'success' ? '#86efac' : '#fca5a5',
            fontSize: 13, fontWeight: 600,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(8px)',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}
        >
          {toast.kind === 'success' ? <Check size={14} /> : <AlertCircle size={14} />}
          {toast.message}
        </div>
      )}
    </div>
  );
}

function SectionHeader({ sectionKey, status }: { sectionKey: JlStudioSection; status: Completeness }) {
  const meta = JL_SECTIONS.find((s) => s.key === sectionKey);
  if (!meta) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ fontSize: 32 }}>{meta.emoji}</span>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0 }}>{meta.label}</h1>
        <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', margin: '2px 0 0' }}>{meta.description}</p>
      </div>
      <CompletenessLabel status={status} />
    </div>
  );
}

function CompletenessDot({ status }: { status: Completeness }) {
  const colors: Record<Completeness, string> = {
    complete: '#22c55e',
    partial:  '#fbbf24',
    empty:    '#475569',
  };
  return (
    <span
      title={status === 'complete' ? 'Complet' : status === 'partial' ? 'Partiellement rempli' : 'Vide'}
      style={{
        width: 8, height: 8, borderRadius: '50%',
        background: colors[status],
        boxShadow: status === 'complete' ? '0 0 4px rgba(34,197,94,0.4)' : undefined,
        flexShrink: 0,
      }}
    />
  );
}

function CompletenessLabel({ status }: { status: Completeness }) {
  const cfg: Record<Completeness, { label: string; color: string; bg: string }> = {
    complete: { label: 'Complet',  color: '#22c55e', bg: '#22c55e22' },
    partial:  { label: 'Partiel',  color: '#fbbf24', bg: '#fbbf2422' },
    empty:    { label: 'À remplir', color: '#94a3b8', bg: '#94a3b822' },
  };
  const c = cfg[status];
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, color: c.color, background: c.bg,
      padding: '4px 10px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: 0.5,
    }}>
      {c.label}
    </span>
  );
}

function SaveIndicator({ status, hasDraft, savedAgo }: { status: SaveStatus; hasDraft: boolean; savedAgo: string }) {
  if (status === 'saving') return <span style={iStyle('#94a3b8')}><Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} /> Enregistrement…</span>;
  if (status === 'error')   return <span style={iStyle('#ef4444')}><AlertCircle size={11} /> Erreur</span>;
  if (status === 'saved')   return <span style={iStyle('#22c55e')}><Check size={11} /> Enregistré</span>;
  if (hasDraft)              return <span style={iStyle('#f59e0b')}><Save size={11} /> Brouillon {savedAgo}</span>;
  return null;
}

function iStyle(color: string): React.CSSProperties {
  return { display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 500, color };
}

function tabBtn(active: boolean): React.CSSProperties {
  return {
    padding: '6px 12px', borderRadius: 6,
    background: active ? '#06b6d4' : 'transparent',
    color: active ? 'white' : 'var(--agency-ink-2)',
    border: 'none', cursor: 'pointer',
    fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
    display: 'inline-flex', alignItems: 'center', gap: 4,
    transition: 'all 0.15s',
  };
}

function btn(variant: 'primary' | 'secondary' | 'ghost'): React.CSSProperties {
  if (variant === 'ghost') {
    return {
      padding: '6px 10px', borderRadius: 6,
      border: '1px solid var(--agency-border)',
      background: 'transparent',
      color: 'var(--agency-ink-2)',
      fontSize: 12, fontWeight: 500, cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none',
    };
  }
  return {
    padding: '7px 12px', borderRadius: 8,
    border: variant === 'primary' ? 'none' : '1px solid var(--agency-border)',
    background: variant === 'primary' ? '#06b6d4' : 'var(--agency-surface-2)',
    color: variant === 'primary' ? 'white' : 'var(--agency-ink-1)',
    fontSize: 12, fontWeight: 500, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 5, textDecoration: 'none',
  };
}
