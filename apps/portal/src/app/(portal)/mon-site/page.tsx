'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSidebar } from '@/components/portal/SidebarContext';
import {
  Plus, X, Trash2, Search, Edit3, Image as ImageIcon, ShoppingBag,
  ChevronDown, ChevronUp, Package, Newspaper, Camera,
  LayoutGrid, GripVertical,
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// ── Types ──────────────────────────────────────────────────────────────

interface CmsField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'date' | 'image';
}

interface CmsCollection {
  id: string;
  name: string;
  slug: string;
  fields: CmsField[];
  settings: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  _count: { items: number };
}

interface CmsItem {
  id: string;
  collectionId: string;
  slug: string;
  data: Record<string, unknown>;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'SCHEDULED';
  publishedAt: string | null;
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
  collection: { id: string; name: string; slug: string; fields: CmsField[] };
}

// ── Helpers ────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 20;

const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Brouillon',
  PUBLISHED: 'Publie',
  ARCHIVED: 'Archive',
  SCHEDULED: 'Programme',
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  DRAFT: { bg: 'var(--bg-badge)', color: 'var(--text-secondary)' },
  PUBLISHED: { bg: 'var(--success-light, rgba(34,197,94,0.12))', color: 'var(--success, #22c55e)' },
  ARCHIVED: { bg: 'var(--bg-badge)', color: 'var(--text-tertiary)' },
  SCHEDULED: { bg: 'var(--accent-light)', color: 'var(--accent)' },
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function detectCollectionType(slug: string): 'product' | 'blog' | 'gallery' | 'generic' {
  const s = slug.toLowerCase();
  if (s.includes('produit') || s.includes('product') || s.includes('shop') || s.includes('boutique')) return 'product';
  if (s.includes('blog') || s.includes('article') || s.includes('actualite') || s.includes('news') || s.includes('post')) return 'blog';
  if (s.includes('galerie') || s.includes('gallery') || s.includes('photo') || s.includes('image') || s.includes('portfolio')) return 'gallery';
  return 'generic';
}

function getCollectionIcon(type: string) {
  switch (type) {
    case 'product': return <ShoppingBag size={18} />;
    case 'blog': return <Newspaper size={18} />;
    case 'gallery': return <Camera size={18} />;
    default: return <LayoutGrid size={18} />;
  }
}

function parseItemData(item: CmsItem): Record<string, unknown> {
  return typeof item.data === 'string' ? JSON.parse(item.data as unknown as string) : item.data;
}

function getItemTitle(item: CmsItem): string {
  const data = parseItemData(item);
  return (data?.title as string) || (data?.name as string) || (data?.titre as string) || (data?.nom as string) || item.slug;
}

function getItemImage(item: CmsItem): string | null {
  const data = parseItemData(item);
  return (data?.image as string) || (data?.photo as string) || (data?.cover as string) || (data?.thumbnail as string) || (data?.img as string) || null;
}

function getItemDescription(item: CmsItem): string | null {
  const data = parseItemData(item);
  return (data?.description as string) || (data?.excerpt as string) || (data?.resume as string) || null;
}

function getItemPrice(item: CmsItem): string | null {
  const data = parseItemData(item);
  const price = data?.price ?? data?.prix;
  if (price !== undefined && price !== null) return `${price} \u20AC`;
  return null;
}

// ── Shared Styles ──────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 12px', borderRadius: '8px',
  background: 'var(--bg-input)', border: '1px solid var(--border-input)',
  color: 'var(--text-primary)', fontSize: '13px', outline: 'none',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none' as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  paddingRight: '30px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '3px',
  display: 'block', fontWeight: 500,
};

// ── Modal Component ────────────────────────────────────────────────────

function Modal({ onClose, title, children, width }: { onClose: () => void; title: string; children: React.ReactNode; width?: string }) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--overlay)', zIndex: 2000 }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: width || '500px', maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto',
        background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)', padding: '24px', zIndex: 2001,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}

// ── Image with fallback ────────────────────────────────────────────────

function SafeImage({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-hover)' }}>
        <ImageIcon size={24} style={{ color: 'var(--text-tertiary)' }} />
      </div>
    );
  }
  return <img src={src} alt={alt} style={style} onError={() => setError(true)} />;
}

// ── Field Input Renderer ───────────────────────────────────────────────

function renderFieldInput(field: CmsField, value: unknown, onChange: (val: unknown) => void) {
  switch (field.type) {
    case 'textarea':
      return <textarea value={(value as string) || ''} onChange={(e) => onChange(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />;
    case 'number':
      return <input type="number" value={(value as number) ?? ''} onChange={(e) => onChange(e.target.value ? Number(e.target.value) : '')} style={inputStyle} />;
    case 'boolean':
      return (
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }} />
          <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{value ? 'Oui' : 'Non'}</span>
        </label>
      );
    case 'date':
      return <input type="date" value={(value as string) || ''} onChange={(e) => onChange(e.target.value)} style={inputStyle} />;
    case 'image':
      return <input type="text" placeholder="URL de l'image" value={(value as string) || ''} onChange={(e) => onChange(e.target.value)} style={inputStyle} />;
    default:
      return <input type="text" value={(value as string) || ''} onChange={(e) => onChange(e.target.value)} style={inputStyle} />;
  }
}

// ── Main Page ──────────────────────────────────────────────────────────

export default function MonSitePage() {
  const { isMobile, userRole, superAdmin } = useSidebar();
  const isAdmin = userRole === 'ADMIN' || superAdmin;

  const [collections, setCollections] = useState<CmsCollection[]>([]);
  const [itemsByCollection, setItemsByCollection] = useState<Record<string, CmsItem[]>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [loadedSections, setLoadedSections] = useState<Record<string, boolean>>({});
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Item modal state
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<CmsItem | null>(null);
  const [activeCollection, setActiveCollection] = useState<CmsCollection | null>(null);
  const [itemForm, setItemForm] = useState<{ slug: string; data: Record<string, unknown>; status: string }>({ slug: '', data: {}, status: 'DRAFT' });
  const [saving, setSaving] = useState(false);

  // Collection modal state (admin only)
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState<CmsCollection | null>(null);
  const [collectionForm, setCollectionForm] = useState({ name: '', slug: '', fields: [] as CmsField[] });
  const [newField, setNewField] = useState<CmsField>({ name: '', label: '', type: 'text' });

  // ── Data fetching ──

  const fetchCollections = useCallback(async () => {
    try {
      const res = await fetch('/api/portal/cms/collections');
      if (!res.ok) throw new Error('Erreur lors du chargement des collections');
      const data = await res.json();
      if (Array.isArray(data)) {
        data.forEach((c: CmsCollection) => {
          if (typeof c.fields === 'string') {
            c.fields = JSON.parse(c.fields as unknown as string);
          }
        });
        setCollections(data);
        setFetchError(null);
      }
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : 'Erreur de chargement');
    }
  }, []);

  const fetchItemsForCollection = useCallback(async (collectionId: string) => {
    try {
      const res = await fetch(`/api/portal/cms/items?collectionId=${collectionId}`);
      if (!res.ok) throw new Error('Erreur chargement items');
      const data = await res.json();
      if (Array.isArray(data)) {
        setItemsByCollection((prev) => ({ ...prev, [collectionId]: data }));
      }
    } catch (err) {
      console.error(`Erreur chargement items collection ${collectionId}:`, err);
    }
  }, []);

  useEffect(() => {
    fetchCollections().then(() => setLoading(false));
  }, [fetchCollections]);

  // Lazy load: fetch items only when section is expanded
  const toggleSection = useCallback((id: string) => {
    setExpandedSections((prev) => {
      const willExpand = !prev[id];
      // Lazy load items on first expand
      if (willExpand && !loadedSections[id]) {
        fetchItemsForCollection(id);
        setLoadedSections((ls) => ({ ...ls, [id]: true }));
        setVisibleCounts((vc) => ({ ...vc, [id]: ITEMS_PER_PAGE }));
      }
      return { ...prev, [id]: willExpand };
    });
  }, [loadedSections, fetchItemsForCollection]);

  // Auto-expand first collection on load
  useEffect(() => {
    if (collections.length > 0 && Object.keys(expandedSections).length === 0) {
      const firstId = collections[0].id;
      setExpandedSections({ [firstId]: true });
      setLoadedSections({ [firstId]: true });
      setVisibleCounts({ [firstId]: ITEMS_PER_PAGE });
      fetchItemsForCollection(firstId);
    }
  }, [collections, expandedSections, fetchItemsForCollection]);

  const showMore = (collectionId: string) => {
    setVisibleCounts((prev) => ({ ...prev, [collectionId]: (prev[collectionId] || ITEMS_PER_PAGE) + ITEMS_PER_PAGE }));
  };

  // ── Item CRUD ──

  const openCreateItem = (collection: CmsCollection) => {
    setActiveCollection(collection);
    setEditingItem(null);
    setItemForm({ slug: '', data: {}, status: 'DRAFT' });
    setShowItemModal(true);
  };

  const openEditItem = (item: CmsItem, collection: CmsCollection) => {
    setActiveCollection(collection);
    setEditingItem(item);
    const data = parseItemData(item);
    setItemForm({ slug: item.slug, data: data || {}, status: item.status });
    setShowItemModal(true);
  };

  const handleSaveItem = async () => {
    if (!activeCollection || !itemForm.slug) return;
    setSaving(true);
    try {
      if (editingItem) {
        const res = await fetch(`/api/portal/cms/items/${editingItem.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug: itemForm.slug, data: itemForm.data, status: itemForm.status }),
        });
        if (!res.ok) console.error('Erreur mise a jour item:', await res.text());
      } else {
        const res = await fetch('/api/portal/cms/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ collectionId: activeCollection.id, slug: itemForm.slug, data: itemForm.data, status: itemForm.status }),
        });
        if (!res.ok) console.error('Erreur creation item:', await res.text());
      }
      setShowItemModal(false);
      fetchItemsForCollection(activeCollection.id);
      fetchCollections();
    } catch (err) {
      console.error('Erreur sauvegarde item:', err);
    }
    setSaving(false);
  };

  const handleDeleteItem = async (itemId: string, collectionId: string) => {
    if (!confirm('Supprimer cet element ?')) return;
    try {
      await fetch(`/api/portal/cms/items/${itemId}`, { method: 'DELETE' });
      fetchItemsForCollection(collectionId);
      fetchCollections();
    } catch (err) {
      console.error('Erreur suppression item:', err);
    }
  };

  // ── Collection CRUD (admin) ──

  const openCreateCollection = () => {
    setEditingCollection(null);
    setCollectionForm({ name: '', slug: '', fields: [] });
    setNewField({ name: '', label: '', type: 'text' });
    setShowCollectionModal(true);
  };

  const openEditCollection = (col: CmsCollection) => {
    const fields = Array.isArray(col.fields) ? col.fields : [];
    setEditingCollection(col);
    setCollectionForm({ name: col.name, slug: col.slug, fields });
    setNewField({ name: '', label: '', type: 'text' });
    setShowCollectionModal(true);
  };

  const handleSaveCollection = async () => {
    if (!collectionForm.name || !collectionForm.slug) return;
    setSaving(true);
    try {
      if (editingCollection) {
        await fetch(`/api/portal/cms/collections/${editingCollection.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: collectionForm.name, slug: collectionForm.slug, fields: collectionForm.fields }),
        });
      } else {
        await fetch('/api/portal/cms/collections', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(collectionForm),
        });
      }
      setShowCollectionModal(false);
      fetchCollections();
    } catch (err) {
      console.error('Erreur sauvegarde collection:', err);
    }
    setSaving(false);
  };

  const handleDeleteCollection = async (id: string) => {
    if (!confirm('Supprimer cette section et tout son contenu ?')) return;
    try {
      await fetch(`/api/portal/cms/collections/${id}`, { method: 'DELETE' });
      fetchCollections();
    } catch (err) {
      console.error('Erreur suppression collection:', err);
    }
  };

  const addField = () => {
    if (!newField.name || !newField.label) return;
    setCollectionForm((prev) => ({ ...prev, fields: [...prev.fields, { ...newField }] }));
    setNewField({ name: '', label: '', type: 'text' });
  };

  const removeField = (index: number) => {
    setCollectionForm((prev) => ({ ...prev, fields: prev.fields.filter((_, i) => i !== index) }));
  };

  // ── Filter items ──

  const filterItems = (items: CmsItem[]): CmsItem[] => {
    if (!searchQuery) return items;
    const q = searchQuery.toLowerCase();
    return items.filter((item) => {
      const title = getItemTitle(item).toLowerCase();
      return title.includes(q) || item.slug.toLowerCase().includes(q);
    });
  };

  // ── Render item fields in modal ──

  const renderItemFields = () => {
    const fields: CmsField[] = activeCollection
      ? (Array.isArray(activeCollection.fields) ? activeCollection.fields : [])
      : [];

    if (fields.length === 0) {
      return (
        <div>
          <label style={labelStyle}>Donnees (JSON)</label>
          <textarea
            value={JSON.stringify(itemForm.data, null, 2)}
            onChange={(e) => { try { setItemForm({ ...itemForm, data: JSON.parse(e.target.value) }); } catch { /* invalid JSON, ignore until valid */ } }}
            rows={8}
            style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '12px', resize: 'vertical' }}
          />
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {fields.map((field) => (
          <div key={field.name}>
            <label style={labelStyle}>{field.label}</label>
            {renderFieldInput(field, itemForm.data[field.name], (val) => {
              setItemForm((prev) => ({ ...prev, data: { ...prev.data, [field.name]: val } }));
            })}
          </div>
        ))}
      </div>
    );
  };

  // ── Render fields builder in collection modal ──

  const renderFieldsBuilder = () => (
    <div>
      <label style={labelStyle}>Champs de la section</label>
      {collectionForm.fields.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
          {collectionForm.fields.map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px',
              borderRadius: '6px', background: 'var(--bg-hover)', border: '1px solid var(--border)',
            }}>
              <GripVertical size={12} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 500, flex: 1 }}>{f.label}</span>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', padding: '2px 6px', borderRadius: '4px', background: 'var(--bg-badge)' }}>{f.type}</span>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>{f.name}</span>
              <button onClick={() => removeField(i)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--danger)', padding: '2px' }}>
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', gap: '6px', alignItems: 'end' }}>
        <div>
          <label style={{ ...labelStyle, fontSize: '10px' }}>Nom technique</label>
          <input placeholder="ex: title" value={newField.name} onChange={(e) => setNewField({ ...newField, name: e.target.value })} style={{ ...inputStyle, fontSize: '12px', padding: '6px 8px' }} />
        </div>
        <div>
          <label style={{ ...labelStyle, fontSize: '10px' }}>Label</label>
          <input placeholder="ex: Titre" value={newField.label} onChange={(e) => setNewField({ ...newField, label: e.target.value })} style={{ ...inputStyle, fontSize: '12px', padding: '6px 8px' }} />
        </div>
        <div>
          <label style={{ ...labelStyle, fontSize: '10px' }}>Type</label>
          <select value={newField.type} onChange={(e) => setNewField({ ...newField, type: e.target.value as CmsField['type'] })} style={{ ...selectStyle, fontSize: '12px', padding: '6px 8px' }}>
            <option value="text">Texte</option>
            <option value="textarea">Zone texte</option>
            <option value="number">Nombre</option>
            <option value="boolean">Booleen</option>
            <option value="date">Date</option>
            <option value="image">Image</option>
          </select>
        </div>
        <button onClick={addField} disabled={!newField.name || !newField.label} style={{
          padding: '6px 10px', borderRadius: '6px', background: 'var(--bg-secondary)',
          color: 'var(--text-primary)', border: '1px solid var(--border)', cursor: 'pointer',
          fontSize: '12px', fontWeight: 500, opacity: (!newField.name || !newField.label) ? 0.4 : 1,
        }}>
          <Plus size={12} />
        </button>
      </div>
    </div>
  );

  // ── Render a collection section ──

  const renderSection = (collection: CmsCollection) => {
    const type = detectCollectionType(collection.slug);
    const allItems = filterItems(itemsByCollection[collection.id] || []);
    const isExpanded = expandedSections[collection.id] === true;
    const visibleCount = visibleCounts[collection.id] || ITEMS_PER_PAGE;
    const items = allItems.slice(0, visibleCount);
    const hasMore = allItems.length > visibleCount;

    return (
      <div key={collection.id} style={{
        background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)', overflow: 'hidden',
      }}>
        {/* Section header */}
        <div
          onClick={() => toggleSection(collection.id)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 18px', cursor: 'pointer',
            borderBottom: isExpanded ? '1px solid var(--border)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center' }}>
              {getCollectionIcon(type)}
            </div>
            <div>
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{collection.name}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginLeft: '8px' }}>
                {collection._count.items} element{collection._count.items !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {isAdmin && (
              <button
                onClick={(e) => { e.stopPropagation(); openEditCollection(collection); }}
                title="Modifier la section"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: '4px' }}
              >
                <Edit3 size={14} />
              </button>
            )}
            {isExpanded ? <ChevronUp size={16} style={{ color: 'var(--text-tertiary)' }} /> : <ChevronDown size={16} style={{ color: 'var(--text-tertiary)' }} />}
          </div>
        </div>

        {/* Section content (lazy loaded) */}
        {isExpanded && (
          <div style={{ padding: '16px 18px' }}>
            {isAdmin && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                <button
                  onClick={() => openCreateItem(collection)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px',
                    background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer',
                    fontSize: '12px', fontWeight: 500,
                  }}
                >
                  <Plus size={14} /> Ajouter
                </button>
              </div>
            )}

            {!loadedSections[collection.id] ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '13px' }}>Chargement...</div>
            ) : items.length === 0 ? (
              <div style={{ padding: '30px', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-tertiary)', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>{getCollectionIcon(type)}</div>
                <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Aucun element dans cette section</p>
                {isAdmin && (
                  <button onClick={() => openCreateItem(collection)} style={{
                    marginTop: '10px', padding: '6px 14px', borderRadius: '8px',
                    background: 'var(--bg-secondary)', color: 'var(--text-primary)',
                    border: '1px solid var(--border)', cursor: 'pointer', fontSize: '12px', fontWeight: 500,
                  }}>
                    Ajouter le premier element
                  </button>
                )}
              </div>
            ) : (
              <>
                {type === 'product' && renderProductGrid(items, collection)}
                {type === 'blog' && renderBlogList(items, collection)}
                {type === 'gallery' && renderGalleryGrid(items, collection)}
                {type === 'generic' && renderGenericList(items, collection)}

                {/* Show more */}
                {hasMore && (
                  <div style={{ textAlign: 'center', marginTop: '12px' }}>
                    <button
                      onClick={() => showMore(collection.id)}
                      style={{
                        padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 500,
                        background: 'var(--bg-secondary)', color: 'var(--text-secondary)',
                        border: '1px solid var(--border)', cursor: 'pointer',
                      }}
                    >
                      Voir plus ({allItems.length - visibleCount} restants)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  // ── Product Grid ──

  const renderProductGrid = (items: CmsItem[], collection: CmsCollection) => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '12px',
    }}>
      {items.map((item) => {
        const image = getItemImage(item);
        const price = getItemPrice(item);
        const statusStyle = STATUS_COLORS[item.status] || STATUS_COLORS.DRAFT;
        return (
          <div
            key={item.id}
            onClick={() => openEditItem(item, collection)}
            style={{
              borderRadius: '10px', border: '1px solid var(--border)', overflow: 'hidden',
              cursor: 'pointer', transition: 'box-shadow 0.15s', background: 'var(--bg-page)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ width: '100%', height: '140px', background: 'var(--bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {image ? (
                <SafeImage src={image} alt={getItemTitle(item)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <Package size={28} style={{ color: 'var(--text-tertiary)' }} />
              )}
            </div>
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {getItemTitle(item)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                {price && <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)' }}>{price}</span>}
                <span style={{ fontSize: '10px', fontWeight: 500, padding: '2px 6px', borderRadius: '10px', background: statusStyle.bg, color: statusStyle.color }}>
                  {STATUS_LABELS[item.status]}
                </span>
              </div>
            </div>
            {isAdmin && (
              <div style={{ padding: '0 12px 8px', display: 'flex', gap: '4px' }}>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id, collection.id); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--danger)', padding: '2px' }} title="Supprimer">
                  <Trash2 size={12} />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // ── Blog List ──

  const renderBlogList = (items: CmsItem[], collection: CmsCollection) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((item) => {
        const image = getItemImage(item);
        const description = getItemDescription(item);
        const statusStyle = STATUS_COLORS[item.status] || STATUS_COLORS.DRAFT;
        return (
          <div
            key={item.id}
            onClick={() => openEditItem(item, collection)}
            style={{
              display: 'flex', gap: '14px', padding: '12px', borderRadius: '10px',
              border: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.1s',
              background: 'var(--bg-page)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-page)'; }}
          >
            {image && (
              <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: 'var(--bg-hover)' }}>
                <SafeImage src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {getItemTitle(item)}
                </span>
                <span style={{ fontSize: '10px', fontWeight: 500, padding: '2px 6px', borderRadius: '10px', background: statusStyle.bg, color: statusStyle.color, flexShrink: 0 }}>
                  {STATUS_LABELS[item.status]}
                </span>
              </div>
              {description && (
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {description}
                </p>
              )}
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                {format(new Date(item.createdAt), 'dd MMM yyyy', { locale: fr })}
              </div>
            </div>
            {isAdmin && (
              <div style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id, collection.id); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--danger)', padding: '4px' }} title="Supprimer">
                  <Trash2 size={13} />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // ── Gallery Grid ──

  const renderGalleryGrid = (items: CmsItem[], collection: CmsCollection) => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '8px',
    }}>
      {items.map((item) => {
        const image = getItemImage(item);
        return (
          <div
            key={item.id}
            onClick={() => openEditItem(item, collection)}
            style={{
              position: 'relative', borderRadius: '8px', overflow: 'hidden',
              aspectRatio: '1', cursor: 'pointer', background: 'var(--bg-hover)',
            }}
          >
            {image ? (
              <SafeImage src={image} alt={getItemTitle(item)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImageIcon size={24} style={{ color: 'var(--text-tertiary)' }} />
              </div>
            )}
            {/* Overlay */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, var(--overlay))',
              padding: '8px 10px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '11px', color: 'var(--text-on-overlay, white)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {getItemTitle(item)}
              </span>
              {isAdmin && (
                <button onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id, collection.id); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-on-overlay, white)', padding: '2px', opacity: 0.8 }}>
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  // ── Generic List ──

  const renderGenericList = (items: CmsItem[], collection: CmsCollection) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {items.map((item) => {
        const statusStyle = STATUS_COLORS[item.status] || STATUS_COLORS.DRAFT;
        return (
          <div
            key={item.id}
            onClick={() => openEditItem(item, collection)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 14px', borderRadius: '8px', cursor: 'pointer',
              border: '1px solid var(--border)', transition: 'background 0.1s',
              background: 'var(--bg-page)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-page)'; }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {getItemTitle(item)}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                /{item.slug} · {format(new Date(item.createdAt), 'dd MMM yyyy', { locale: fr })}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <span style={{ fontSize: '10px', fontWeight: 500, padding: '2px 6px', borderRadius: '10px', background: statusStyle.bg, color: statusStyle.color }}>
                {STATUS_LABELS[item.status]}
              </span>
              {isAdmin && (
                <button onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id, collection.id); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--danger)', padding: '2px' }}>
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  // ── Loading / Error states ──

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 0' }}>
        <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Chargement...</div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: 'var(--danger, #ef4444)', marginBottom: '12px' }}>{fetchError}</p>
        <button onClick={() => { setFetchError(null); setLoading(true); fetchCollections().then(() => setLoading(false)); }} style={{
          padding: '8px 16px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
          border: 'none', cursor: 'pointer', fontSize: '13px',
        }}>Reessayer</button>
      </div>
    );
  }

  // ── Main render ──

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '24px', flexWrap: 'wrap', gap: '12px',
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          Mon Site
        </h1>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ ...inputStyle, paddingLeft: '28px', width: '200px', fontSize: '12px', padding: '7px 10px 7px 28px' }}
            />
          </div>
          {isAdmin && (
            <button onClick={openCreateCollection} style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px',
              background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer',
              fontSize: '13px', fontWeight: 500,
            }}>
              <Plus size={14} /> Nouvelle section
            </button>
          )}
        </div>
      </div>

      {collections.length === 0 ? (
        <div style={{
          background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)', padding: '60px 20px', textAlign: 'center',
        }}>
          <LayoutGrid size={36} style={{ color: 'var(--text-tertiary)', marginBottom: '12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Aucune section configuree</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '16px' }}>
            Creez des sections pour gerer le contenu de votre site (produits, articles, galerie...)
          </p>
          {isAdmin && (
            <button onClick={openCreateCollection} style={{
              padding: '8px 20px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
              border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
            }}>Creer une section</button>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {collections.map((col) => renderSection(col))}
        </div>
      )}

      {/* Item create/edit modal */}
      {showItemModal && activeCollection && (
        <Modal title={editingItem ? `Modifier — ${getItemTitle(editingItem)}` : `Ajouter — ${activeCollection.name}`} onClose={() => setShowItemModal(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Slug</label>
              <input placeholder="ex: mon-element" value={itemForm.slug} onChange={(e) => setItemForm({ ...itemForm, slug: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Statut</label>
              <select value={itemForm.status} onChange={(e) => setItemForm({ ...itemForm, status: e.target.value })} style={selectStyle}>
                <option value="DRAFT">Brouillon</option>
                <option value="PUBLISHED">Publie</option>
                <option value="ARCHIVED">Archive</option>
              </select>
            </div>
            {renderItemFields()}
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button onClick={handleSaveItem} disabled={saving || !itemForm.slug} style={{
                padding: '8px 20px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
                border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
                opacity: (saving || !itemForm.slug) ? 0.5 : 1,
              }}>
                {saving ? 'Sauvegarde...' : (editingItem ? 'Sauvegarder' : 'Creer')}
              </button>
              <button onClick={() => setShowItemModal(false)} style={{
                padding: '8px 20px', borderRadius: '8px', background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
              }}>Annuler</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Collection create/edit modal */}
      {showCollectionModal && (
        <Modal title={editingCollection ? `Modifier — ${editingCollection.name}` : 'Nouvelle section'} onClose={() => setShowCollectionModal(false)} width="540px">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Nom de la section</label>
              <input
                placeholder="ex: Produits, Articles, Galerie"
                value={collectionForm.name}
                onChange={(e) => {
                  const name = e.target.value;
                  if (!editingCollection) {
                    setCollectionForm({ ...collectionForm, name, slug: slugify(name) });
                  } else {
                    setCollectionForm({ ...collectionForm, name });
                  }
                }}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Slug (identifiant technique)</label>
              <input value={collectionForm.slug} onChange={(e) => setCollectionForm({ ...collectionForm, slug: e.target.value })} style={inputStyle} />
              <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '3px' }}>
                Utilisez &quot;produits&quot;, &quot;articles&quot; ou &quot;galerie&quot; pour un affichage adapte
              </p>
            </div>
            {renderFieldsBuilder()}
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button onClick={handleSaveCollection} disabled={saving || !collectionForm.name || !collectionForm.slug} style={{
                padding: '8px 20px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
                border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
                opacity: (saving || !collectionForm.name || !collectionForm.slug) ? 0.5 : 1,
              }}>
                {saving ? 'Sauvegarde...' : (editingCollection ? 'Sauvegarder' : 'Creer')}
              </button>
              {editingCollection && (
                <button onClick={() => { setShowCollectionModal(false); handleDeleteCollection(editingCollection.id); }} style={{
                  padding: '8px 14px', borderRadius: '8px', background: 'var(--bg-secondary)',
                  color: 'var(--danger)', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
                }}>Supprimer</button>
              )}
              <button onClick={() => setShowCollectionModal(false)} style={{
                padding: '8px 20px', borderRadius: '8px', background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
              }}>Annuler</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
