'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSidebar } from '@/components/portal/SidebarContext';
import {
  Save, ChevronDown, ChevronRight, FileText, Image as ImageIcon,
  Type, Link2, List, Check, Globe,
} from 'lucide-react';

// ── Types ──
interface SectionData {
  id: string;
  type: string;
  variant: string;
  content: Record<string, unknown>;
}

interface PageData {
  id: string;
  slug: string;
  title: string;
  sections: SectionData[];
}

// ── Section type labels ──
const SECTION_LABELS: Record<string, string> = {
  'site-header': 'En-tete du site',
  'site-footer': 'Pied de page',
  hero: 'Hero',
  features: 'Fonctionnalites',
  cta: 'Appel a l\'action',
  stats: 'Statistiques',
  testimonials: 'Temoignages',
  pricing: 'Tarifs',
  contact: 'Contact',
  footer: 'Pied de page',
  navbar: 'Navigation',
  gallery: 'Galerie',
  'gallery-grid': 'Galerie grille',
  blog: 'Blog',
  faq: 'FAQ',
  team: 'Equipe',
  timeline: 'Timeline',
  slider: 'Slider',
  logos: 'Logos partenaires',
  product: 'Produit',
  'product-detail': 'Detail produit',
  cart: 'Panier',
  checkout: 'Paiement',
};

// ── Detect field type ──
type FieldType = 'text' | 'textarea' | 'image' | 'button' | 'items' | 'skip';

function detectFieldType(key: string, value: unknown): FieldType {
  if (value === null || value === undefined || typeof value === 'boolean' || typeof value === 'number') {
    return 'skip';
  }
  if (typeof value === 'string') {
    if (key.toLowerCase().includes('image') || key.toLowerCase().includes('logo') || key.toLowerCase().includes('poster') || key.toLowerCase().includes('src')) {
      return 'image';
    }
    if (value.length > 80 || key === 'subtitle' || key === 'description' || key === 'content') {
      return 'textarea';
    }
    return 'text';
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>;
    if ('label' in obj && 'href' in obj) return 'button';
    if ('src' in obj) return 'image';
    return 'skip';
  }
  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
    return 'items';
  }
  return 'skip';
}

// ── Field labels ──
const FIELD_LABELS: Record<string, string> = {
  title: 'Titre',
  subtitle: 'Sous-titre',
  description: 'Description',
  eyebrow: 'Badge',
  content: 'Contenu',
  image: 'Image',
  backgroundImage: 'Image de fond',
  decorativeImage: 'Image decorative',
  posterImage: 'Image poster',
  videoUrl: 'URL video',
  primaryButton: 'Bouton principal',
  secondaryButton: 'Bouton secondaire',
  items: 'Elements',
  badge: 'Badge',
  trustText: 'Texte de confiance',
  icon: 'Icone',
  label: 'Label',
  href: 'Lien',
  name: 'Nom',
  role: 'Role',
  quote: 'Citation',
  company: 'Entreprise',
  value: 'Valeur',
  price: 'Prix',
  originalPrice: 'Prix original',
  phone: 'Telephone',
  email: 'Email',
  address: 'Adresse',
};

function getFieldLabel(key: string): string {
  return FIELD_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
}

export default function MonSitePage() {
  const { isMobile } = useSidebar();
  const [loading, setLoading] = useState(true);
  const [siteName, setSiteName] = useState('');
  const [pages, setPages] = useState<PageData[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Record<string, Record<string, unknown>>>({});

  const fetchContent = useCallback(() => {
    fetch('/api/portal/site-content')
      .then((r) => r.json())
      .then((data) => {
        setSiteName(data.siteName || '');
        setPages(data.pages || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  };

  // Track edits
  const updateField = (sectionId: string, path: string, value: unknown) => {
    setEditedContent((prev) => ({
      ...prev,
      [sectionId]: { ...(prev[sectionId] || {}), [path]: value },
    }));
    setSaved(null);
  };

  // Build deep content object from flat paths
  const buildContentUpdate = (sectionId: string, originalContent: Record<string, unknown>): Record<string, unknown> => {
    const edits = editedContent[sectionId];
    if (!edits) return originalContent;

    const result = JSON.parse(JSON.stringify(originalContent));
    for (const [path, value] of Object.entries(edits)) {
      const parts = path.split('.');
      let obj = result;
      for (let i = 0; i < parts.length - 1; i++) {
        if (obj[parts[i]] === undefined) obj[parts[i]] = {};
        obj = obj[parts[i]] as Record<string, unknown>;
      }
      obj[parts[parts.length - 1]] = value;
    }
    return result;
  };

  // Save a section
  const handleSave = async (pageId: string, section: SectionData) => {
    setSaving(section.id);
    const content = buildContentUpdate(section.id, section.content);
    const res = await fetch('/api/portal/site-content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageId, sectionId: section.id, content }),
    });
    if (res.ok) {
      setSaved(section.id);
      // Clear edits for this section
      setEditedContent((prev) => {
        const next = { ...prev };
        delete next[section.id];
        return next;
      });
      fetchContent();
      setTimeout(() => setSaved(null), 2000);
    }
    setSaving(null);
  };

  // Get current value (edited or original)
  const getValue = (sectionId: string, content: Record<string, unknown>, path: string): unknown => {
    const edited = editedContent[sectionId]?.[path];
    if (edited !== undefined) return edited;
    const parts = path.split('.');
    let obj: unknown = content;
    for (const part of parts) {
      if (obj === null || obj === undefined || typeof obj !== 'object') return undefined;
      obj = (obj as Record<string, unknown>)[part];
    }
    return obj;
  };

  const hasEdits = (sectionId: string) => {
    return editedContent[sectionId] && Object.keys(editedContent[sectionId]).length > 0;
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', borderRadius: '8px',
    background: 'var(--bg-input)', border: '1px solid var(--border-input)',
    color: 'var(--text-primary)', fontSize: '13px', outline: 'none',
  };

  if (loading) {
    return <p style={{ color: 'var(--text-tertiary)', padding: '40px 0', textAlign: 'center' }}>Chargement...</p>;
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
        <Globe size={20} style={{ color: 'var(--accent)' }} />
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Mon Site {siteName && <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>— {siteName}</span>}
        </h1>
      </div>

      {pages.length === 0 || pages.every((p) => p.sections.length === 0) ? (
        <div style={{
          background: 'var(--bg-card)', borderRadius: '12px', padding: '40px',
          border: '1px solid var(--border)', textAlign: 'center',
        }}>
          <Globe size={32} style={{ color: 'var(--text-tertiary)', margin: '0 auto 12px', opacity: 0.5 }} />
          <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '15px', marginBottom: '8px' }}>
            Aucune section a editer
          </p>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '13px', lineHeight: '1.5', maxWidth: '400px', margin: '0 auto' }}>
            Le contenu de votre site apparaitra ici une fois que des sections auront ete ajoutees dans le configurateur.
            Contactez votre developpeur pour ajouter ou modifier la structure du site.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {pages.map((page) => (
            <div key={page.id}>
              {/* Page header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '8px', padding: '0 4px',
              }}>
                <FileText size={14} style={{ color: 'var(--text-tertiary)' }} />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {page.title}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                  {page.slug}
                </span>
              </div>

              {/* Sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {page.sections.map((section) => {
                  const isExpanded = expandedSections.has(section.id);
                  const isDirty = hasEdits(section.id);
                  const isSaving = saving === section.id;
                  const isSaved = saved === section.id;
                  const sectionLabel = SECTION_LABELS[section.type] || section.type;

                  return (
                    <div key={section.id} style={{
                      background: 'var(--bg-card)', borderRadius: '12px',
                      border: isDirty ? '1px solid var(--accent)' : '1px solid var(--border)',
                      boxShadow: 'var(--shadow-card)', overflow: 'hidden',
                      transition: 'border-color 0.15s',
                    }}>
                      {/* Section header */}
                      <button
                        onClick={() => toggleSection(section.id)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '14px 16px', border: 'none', background: 'none',
                          cursor: 'pointer', textAlign: 'left',
                        }}
                      >
                        {isExpanded
                          ? <ChevronDown size={16} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
                          : <ChevronRight size={16} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
                        }
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {sectionLabel}
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginLeft: '8px' }}>
                            {section.variant}
                          </span>
                        </div>
                        {isDirty && (
                          <span style={{
                            fontSize: '10px', fontWeight: 500, color: 'var(--accent)',
                            background: 'var(--accent-light)', padding: '2px 8px', borderRadius: '10px',
                          }}>
                            Modifie
                          </span>
                        )}
                      </button>

                      {/* Section content editor */}
                      {isExpanded && (
                        <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--border-light)' }}>
                          <div style={{ paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {/* Render editable fields */}
                            {renderFields(section, page.id, '', section.content, inputStyle, isMobile, updateField, getValue)}

                            {/* Save button */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
                              <button
                                onClick={() => handleSave(page.id, section)}
                                disabled={!isDirty && !isSaving}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '6px',
                                  padding: '8px 16px', borderRadius: '8px', border: 'none',
                                  background: isSaved ? 'var(--success)' : 'var(--accent)',
                                  color: 'white', fontSize: '12px', fontWeight: 500,
                                  cursor: isDirty ? 'pointer' : 'default',
                                  opacity: isDirty || isSaving ? 1 : 0.4,
                                  transition: 'all 0.15s',
                                }}
                              >
                                {isSaved ? <Check size={14} /> : <Save size={14} />}
                                {isSaving ? 'Sauvegarde...' : isSaved ? 'Sauvegarde !' : 'Sauvegarder'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Render fields recursively ──
function renderFields(
  section: SectionData,
  pageId: string,
  prefix: string,
  content: Record<string, unknown>,
  inputStyle: React.CSSProperties,
  isMobile: boolean,
  updateField: (sectionId: string, path: string, value: unknown) => void,
  getValue: (sectionId: string, content: Record<string, unknown>, path: string) => unknown,
) {
  const fields: React.ReactNode[] = [];

  for (const [key, value] of Object.entries(content)) {
    const path = prefix ? `${prefix}.${key}` : key;
    const fieldType = detectFieldType(key, value);

    if (fieldType === 'skip') continue;

    if (fieldType === 'text') {
      fields.push(
        <div key={path}>
          <label style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Type size={10} /> {getFieldLabel(key)}
          </label>
          <input
            value={String(getValue(section.id, section.content, path) ?? '')}
            onChange={(e) => updateField(section.id, path, e.target.value)}
            style={inputStyle}
          />
        </div>,
      );
    }

    if (fieldType === 'textarea') {
      fields.push(
        <div key={path}>
          <label style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Type size={10} /> {getFieldLabel(key)}
          </label>
          <textarea
            value={String(getValue(section.id, section.content, path) ?? '')}
            onChange={(e) => updateField(section.id, path, e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>,
      );
    }

    if (fieldType === 'image') {
      if (typeof value === 'string') {
        fields.push(
          <div key={path}>
            <label style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ImageIcon size={10} /> {getFieldLabel(key)}
            </label>
            <input
              value={String(getValue(section.id, section.content, path) ?? '')}
              onChange={(e) => updateField(section.id, path, e.target.value)}
              placeholder="URL de l'image"
              style={inputStyle}
            />
            {String(getValue(section.id, section.content, path) ?? '') && (
              <div style={{ marginTop: '6px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-light)', maxWidth: '200px' }}>
                <img
                  src={String(getValue(section.id, section.content, path))}
                  alt=""
                  style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
          </div>,
        );
      } else if (typeof value === 'object' && value !== null && 'src' in (value as Record<string, unknown>)) {
        const imgObj = value as { src: string; alt?: string };
        fields.push(
          <div key={path} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ImageIcon size={10} /> {getFieldLabel(key)}
            </label>
            <input
              value={String(getValue(section.id, section.content, `${path}.src`) ?? imgObj.src ?? '')}
              onChange={(e) => updateField(section.id, `${path}.src`, e.target.value)}
              placeholder="URL de l'image"
              style={inputStyle}
            />
            <input
              value={String(getValue(section.id, section.content, `${path}.alt`) ?? imgObj.alt ?? '')}
              onChange={(e) => updateField(section.id, `${path}.alt`, e.target.value)}
              placeholder="Texte alternatif"
              style={{ ...inputStyle, fontSize: '12px' }}
            />
            {String(getValue(section.id, section.content, `${path}.src`) ?? imgObj.src ?? '') && (
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-light)', maxWidth: '200px' }}>
                <img
                  src={String(getValue(section.id, section.content, `${path}.src`) ?? imgObj.src)}
                  alt=""
                  style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
          </div>,
        );
      }
    }

    if (fieldType === 'button') {
      const btn = value as { label: string; href: string };
      fields.push(
        <div key={path} style={{
          background: 'var(--bg-secondary)', borderRadius: '8px', padding: '10px 12px',
          display: 'flex', flexDirection: 'column', gap: '6px',
        }}>
          <label style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Link2 size={10} /> {getFieldLabel(key)}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '6px' }}>
            <input
              value={String(getValue(section.id, section.content, `${path}.label`) ?? btn.label ?? '')}
              onChange={(e) => updateField(section.id, `${path}.label`, e.target.value)}
              placeholder="Texte du bouton"
              style={inputStyle}
            />
            <input
              value={String(getValue(section.id, section.content, `${path}.href`) ?? btn.href ?? '')}
              onChange={(e) => updateField(section.id, `${path}.href`, e.target.value)}
              placeholder="Lien (ex: /contact)"
              style={inputStyle}
            />
          </div>
        </div>,
      );
    }

    if (fieldType === 'items') {
      const items = value as Record<string, unknown>[];
      fields.push(
        <div key={path} style={{
          display: 'flex', flexDirection: 'column', gap: '8px',
        }}>
          <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <List size={10} /> {getFieldLabel(key)} ({items.length})
          </label>
          {items.map((item, idx) => (
            <div key={`${path}.${idx}`} style={{
              background: 'var(--bg-secondary)', borderRadius: '8px', padding: '10px 12px',
              display: 'flex', flexDirection: 'column', gap: '6px',
            }}>
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                #{idx + 1}
              </span>
              {Object.entries(item).map(([itemKey, itemValue]) => {
                if (itemKey === 'id' || typeof itemValue === 'boolean' || typeof itemValue === 'number' || itemValue === null || itemValue === undefined) return null;
                if (typeof itemValue !== 'string') return null;
                const itemPath = `${path}.${idx}.${itemKey}`;
                const isLong = String(itemValue).length > 60 || itemKey === 'description' || itemKey === 'quote' || itemKey === 'content';
                return (
                  <div key={itemPath}>
                    <label style={{ fontSize: '10px', fontWeight: 500, color: 'var(--text-tertiary)', marginBottom: '2px', display: 'block' }}>
                      {getFieldLabel(itemKey)}
                    </label>
                    {isLong ? (
                      <textarea
                        value={String(getValue(section.id, section.content, itemPath) ?? itemValue)}
                        onChange={(e) => updateField(section.id, itemPath, e.target.value)}
                        rows={2}
                        style={{ ...inputStyle, fontSize: '12px', resize: 'vertical' }}
                      />
                    ) : (
                      <input
                        value={String(getValue(section.id, section.content, itemPath) ?? itemValue)}
                        onChange={(e) => updateField(section.id, itemPath, e.target.value)}
                        style={{ ...inputStyle, fontSize: '12px' }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>,
      );
    }
  }

  return fields;
}
