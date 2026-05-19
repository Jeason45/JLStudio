'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Plus, Save, Send, AlertCircle, Check, Loader2,
  ChevronUp, ChevronDown, Trash2, Eye, X, GripVertical,
} from 'lucide-react';
import { SECTION_META, SECTION_LIST, newSection } from './sectionTypes';
import type { SectionInstance, SectionType } from './sectionTypes';
import { SectionEditor } from './SectionEditors';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface PageData {
  id: string;
  slug: string;
  title: string;
  isHome: boolean;
  config: { sections?: SectionInstance[] } | null;
  draftConfig: { sections?: SectionInstance[] } | null;
  publishedAt: string | null;
}

interface SiteRef { id: string; name: string; slug: string }

interface Props {
  site: SiteRef;
  page: PageData;
}

export default function PageEditor({ site, page }: Props) {
  const router = useRouter();
  const [sections, setSections] = useState<SectionInstance[]>(
    (page.draftConfig?.sections || page.config?.sections || []) as SectionInstance[],
  );
  const [selectedId, setSelectedId] = useState<string | null>(sections[0]?.id || null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [hasDraft, setHasDraft] = useState<boolean>(!!page.draftConfig);
  const [publishing, setPublishing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const selected = sections.find((s) => s.id === selectedId) || null;

  // Auto-save debounced
  const triggerSave = useCallback((nextSections: SectionInstance[]) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSaveStatus('saving');
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/sites/${site.id}/pages/${page.id}/draft`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'x-portal-super-admin': 'true' },
          body: JSON.stringify({ config: { sections: nextSections } }),
        });
        if (res.ok) {
          setSaveStatus('saved');
          setHasDraft(true);
          setTimeout(() => setSaveStatus('idle'), 1800);
        } else {
          setSaveStatus('error');
        }
      } catch {
        setSaveStatus('error');
      }
    }, 1500);
  }, [site.id, page.id]);

  const updateSection = (id: string, content: Record<string, unknown>) => {
    setSections((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, content } : s));
      triggerSave(next);
      return next;
    });
  };

  const moveSection = (id: string, dir: -1 | 1) => {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      const j = idx + dir;
      if (idx < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[j]] = [next[j], next[idx]];
      triggerSave(next);
      return next;
    });
  };

  const removeSection = (id: string) => {
    if (!confirm('Supprimer cette section ?')) return;
    setSections((prev) => {
      const next = prev.filter((s) => s.id !== id);
      triggerSave(next);
      if (selectedId === id) setSelectedId(next[0]?.id || null);
      return next;
    });
  };

  const addSection = (type: SectionType) => {
    const section = newSection(type);
    setSections((prev) => {
      const next = [...prev, section];
      triggerSave(next);
      return next;
    });
    setSelectedId(section.id);
    setShowAddModal(false);
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const res = await fetch(`/api/admin/sites/${site.id}/pages/${page.id}/publish`, {
        method: 'POST',
        headers: { 'x-portal-super-admin': 'true' },
      });
      if (res.ok) {
        setHasDraft(false);
        // Message succès
        alert('Page publiée ✓ Les modifications sont en ligne.');
      } else {
        const j = await res.json().catch(() => ({}));
        alert(j.error || 'Publication impossible');
      }
    } finally {
      setPublishing(false);
    }
  };

  const handleDiscard = async () => {
    if (!confirm('Annuler toutes les modifications en cours sur cette page ?')) return;
    await fetch(`/api/admin/sites/${site.id}/pages/${page.id}/draft`, {
      method: 'DELETE',
      headers: { 'x-portal-super-admin': 'true' },
    });
    router.refresh();
    window.location.reload();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' }}>
      {/* Header sticky */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', gap: 12,
        background: 'var(--agency-surface-1)',
        borderBottom: '1px solid var(--agency-border)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <Link href={`/admin/sites/${site.id}`} style={{ color: 'var(--agency-ink-3)', textDecoration: 'none', display: 'inline-flex', gap: 4, alignItems: 'center', fontSize: 12 }}>
            <ArrowLeft size={12} /> Retour
          </Link>
          <span style={{ color: 'var(--agency-ink-4)' }}>·</span>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <strong style={{ fontSize: 13, color: 'var(--agency-ink-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {site.name} · {page.title}
            </strong>
            <span style={{ fontSize: 10, color: 'var(--agency-ink-3)', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>
              /{site.slug}/{page.slug}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SaveIndicator status={saveStatus} hasDraft={hasDraft} />
          {hasDraft && (
            <button onClick={handleDiscard} style={btn('ghost')}>
              <X size={13} /> Annuler
            </button>
          )}
          <button
            onClick={() => window.open(`/admin/sites/${site.id}/pages/${page.id}/preview`, '_blank')}
            style={btn('secondary')}
            title="Aperçu (nouvelle fenêtre)"
          >
            <Eye size={13} /> Aperçu
          </button>
          <button
            onClick={handlePublish}
            disabled={publishing || !hasDraft}
            style={btn('primary')}
            title={hasDraft ? 'Publier les modifications' : 'Aucun brouillon à publier'}
          >
            <Send size={13} /> {publishing ? 'Publication…' : 'Publier'}
          </button>
        </div>
      </header>

      {/* Body : 2 colonnes */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

        {/* Sidebar gauche : liste sections */}
        <aside style={{
          width: 280, borderRight: '1px solid var(--agency-border)',
          background: 'var(--agency-surface-1)',
          display: 'flex', flexDirection: 'column', flexShrink: 0,
        }}>
          <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--agency-border)' }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, color: 'var(--agency-ink-3)', margin: 0, letterSpacing: 0.5, textTransform: 'uppercase' }}>
              Sections ({sections.length})
            </h2>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
            {sections.length === 0 ? (
              <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', textAlign: 'center', padding: 20 }}>
                Aucune section. Ajoute-en une ↓
              </p>
            ) : (
              sections.map((s, i) => {
                const meta = SECTION_META[s.type];
                const isSelected = s.id === selectedId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedId(s.id)}
                    style={{
                      width: '100%',
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '8px 10px', borderRadius: 6, marginBottom: 4,
                      background: isSelected ? '#06b6d418' : 'transparent',
                      border: `1px solid ${isSelected ? '#06b6d4' : 'transparent'}`,
                      color: 'var(--agency-ink-1)', cursor: 'pointer',
                      fontFamily: 'inherit', textAlign: 'left',
                    }}
                  >
                    <GripVertical size={12} style={{ color: 'var(--agency-ink-4)', flexShrink: 0 }} />
                    <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>{meta.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {meta.label}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--agency-ink-3)' }}>
                        Position {i + 1}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 2, flexShrink: 0, opacity: isSelected ? 1 : 0.6 }}>
                      <span
                        onClick={(e) => { e.stopPropagation(); moveSection(s.id, -1); }}
                        style={miniBtn(i === 0)}
                      >
                        <ChevronUp size={11} />
                      </span>
                      <span
                        onClick={(e) => { e.stopPropagation(); moveSection(s.id, 1); }}
                        style={miniBtn(i === sections.length - 1)}
                      >
                        <ChevronDown size={11} />
                      </span>
                      <span
                        onClick={(e) => { e.stopPropagation(); removeSection(s.id); }}
                        style={{ ...miniBtn(false), color: '#ef4444' }}
                      >
                        <Trash2 size={11} />
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
          <div style={{ padding: 10, borderTop: '1px solid var(--agency-border)' }}>
            <button
              onClick={() => setShowAddModal(true)}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: 8,
                border: '1px dashed #06b6d4',
                background: '#06b6d410', color: '#06b6d4',
                cursor: 'pointer', fontSize: 12, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              <Plus size={13} /> Ajouter une section
            </button>
          </div>
        </aside>

        {/* Zone éditeur de section */}
        <main style={{ flex: 1, overflowY: 'auto', padding: 24, background: 'var(--agency-surface-0)' }}>
          {selected ? (
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 26 }}>{SECTION_META[selected.type].emoji}</span>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0 }}>
                    {SECTION_META[selected.type].label}
                  </h2>
                  <p style={{ fontSize: 11, color: 'var(--agency-ink-3)', margin: 0 }}>
                    {SECTION_META[selected.type].description}
                  </p>
                </div>
              </div>
              <div style={{
                background: 'var(--agency-surface-1)',
                border: '1px solid var(--agency-border)',
                borderRadius: 12, padding: 18, marginTop: 12,
              }}>
                <SectionEditor
                  type={selected.type}
                  content={selected.content}
                  onChange={(next) => updateSection(selected.id, next)}
                />
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontSize: 14, color: 'var(--agency-ink-3)', margin: 0 }}>
                Aucune section sélectionnée
              </p>
              <button onClick={() => setShowAddModal(true)} style={btn('primary')}>
                <Plus size={13} /> Ajouter ta première section
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Modal ajout section */}
      {showAddModal && (
        <div
          onClick={() => setShowAddModal(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--agency-surface-1)',
              border: '1px solid var(--agency-border)',
              borderRadius: 14, padding: 18,
              maxWidth: 720, width: '100%',
              maxHeight: '85vh', overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0 }}>
                Choisir un type de section
              </h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--agency-ink-3)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
              {SECTION_LIST.map((type) => {
                const m = SECTION_META[type];
                return (
                  <button
                    key={type}
                    onClick={() => addSection(type)}
                    style={{
                      padding: 14, borderRadius: 10, textAlign: 'left',
                      border: '1px solid var(--agency-border)',
                      background: 'var(--agency-surface-2)',
                      color: 'var(--agency-ink-1)', cursor: 'pointer',
                      fontFamily: 'inherit', transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#06b6d4';
                      e.currentTarget.style.background = '#06b6d410';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--agency-border)';
                      e.currentTarget.style.background = 'var(--agency-surface-2)';
                    }}
                  >
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{m.emoji}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{m.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', lineHeight: 1.4 }}>{m.description}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SaveIndicator({ status, hasDraft }: { status: SaveStatus; hasDraft: boolean }) {
  if (status === 'saving') {
    return <span style={iStyle('#94a3b8')}><Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} /> Enregistrement…</span>;
  }
  if (status === 'saved') {
    return <span style={iStyle('#22c55e')}><Check size={11} /> Enregistré</span>;
  }
  if (status === 'error') {
    return <span style={iStyle('#ef4444')}><AlertCircle size={11} /> Erreur</span>;
  }
  if (hasDraft) {
    return <span style={iStyle('#f59e0b')}><Save size={11} /> Brouillon</span>;
  }
  return null;
}

function iStyle(color: string): React.CSSProperties {
  return { display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 500, color };
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
    opacity: variant === 'primary' ? 1 : undefined,
  };
}

function miniBtn(disabled: boolean): React.CSSProperties {
  return {
    width: 18, height: 18, borderRadius: 4,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--agency-ink-3)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.3 : 1,
    background: 'transparent',
  };
}
