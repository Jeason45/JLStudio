'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSidebar } from '@/components/portal/SidebarContext';
import { Plus, X, Trash2, Database, FileText, ChevronRight, Search, GripVertical } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

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

type StatusFilter = 'ALL' | 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

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

export default function CmsPage() {
  const { isMobile, userRole } = useSidebar();
  const isAdmin = userRole === 'ADMIN';

  // Data
  const [collections, setCollections] = useState<CmsCollection[]>([]);
  const [items, setItems] = useState<CmsItem[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<CmsCollection | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(false);
  const [editingItem, setEditingItem] = useState<CmsItem | null>(null);
  const [editingCollection, setEditingCollection] = useState<CmsCollection | null>(null);

  // Forms
  const [collectionForm, setCollectionForm] = useState({ name: '', slug: '', fields: [] as CmsField[] });
  const [newField, setNewField] = useState<CmsField>({ name: '', label: '', type: 'text' });
  const [itemForm, setItemForm] = useState<{ slug: string; data: Record<string, unknown>; status: string }>({ slug: '', data: {}, status: 'DRAFT' });
  const [saving, setSaving] = useState(false);

  // Fetch collections
  const fetchCollections = useCallback(() => {
    fetch('/api/portal/cms/collections')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCollections(data);
          // Parse fields from JSON if needed
          data.forEach((c: CmsCollection) => {
            if (typeof c.fields === 'string') {
              c.fields = JSON.parse(c.fields as unknown as string);
            }
          });
        }
      })
      .catch(() => {});
  }, []);

  // Fetch items for selected collection
  const fetchItems = useCallback(() => {
    if (!selectedCollection) {
      setItems([]);
      return;
    }
    const params = new URLSearchParams({ collectionId: selectedCollection.id });
    if (statusFilter !== 'ALL') params.set('status', statusFilter);
    fetch(`/api/portal/cms/items?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
      })
      .catch(() => {});
  }, [selectedCollection, statusFilter]);

  useEffect(() => { fetchCollections(); }, [fetchCollections]);
  useEffect(() => { fetchItems(); }, [fetchItems]);

  // Auto-select first collection
  useEffect(() => {
    if (collections.length > 0 && !selectedCollection) {
      setSelectedCollection(collections[0]);
    }
  }, [collections, selectedCollection]);

  // Collection CRUD
  const handleCreateCollection = async () => {
    if (!collectionForm.name || !collectionForm.slug) return;
    setSaving(true);
    const res = await fetch('/api/portal/cms/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collectionForm),
    });
    if (res.ok) {
      const created = await res.json();
      setShowCreateCollection(false);
      setCollectionForm({ name: '', slug: '', fields: [] });
      setNewField({ name: '', label: '', type: 'text' });
      fetchCollections();
      setSelectedCollection(created);
    }
    setSaving(false);
  };

  const handleDeleteCollection = async (id: string) => {
    if (!confirm('Supprimer cette collection et tous ses items ?')) return;
    await fetch(`/api/portal/cms/collections/${id}`, { method: 'DELETE' });
    if (selectedCollection?.id === id) setSelectedCollection(null);
    fetchCollections();
  };

  const handleUpdateCollection = async () => {
    if (!editingCollection) return;
    setSaving(true);
    const res = await fetch(`/api/portal/cms/collections/${editingCollection.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: collectionForm.name,
        slug: collectionForm.slug,
        fields: collectionForm.fields,
      }),
    });
    if (res.ok) {
      setEditingCollection(null);
      setCollectionForm({ name: '', slug: '', fields: [] });
      setNewField({ name: '', label: '', type: 'text' });
      fetchCollections();
      if (selectedCollection?.id === editingCollection.id) {
        const updated = await res.json();
        setSelectedCollection(updated);
      }
    }
    setSaving(false);
  };

  // Item CRUD
  const handleCreateItem = async () => {
    if (!selectedCollection || !itemForm.slug) return;
    setSaving(true);
    const res = await fetch('/api/portal/cms/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        collectionId: selectedCollection.id,
        slug: itemForm.slug,
        data: itemForm.data,
        status: itemForm.status,
      }),
    });
    if (res.ok) {
      setShowCreateItem(false);
      setItemForm({ slug: '', data: {}, status: 'DRAFT' });
      fetchItems();
      fetchCollections();
    }
    setSaving(false);
  };

  const handleUpdateItem = async () => {
    if (!editingItem) return;
    setSaving(true);
    const res = await fetch(`/api/portal/cms/items/${editingItem.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: itemForm.slug,
        data: itemForm.data,
        status: itemForm.status,
      }),
    });
    if (res.ok) {
      setEditingItem(null);
      setItemForm({ slug: '', data: {}, status: 'DRAFT' });
      fetchItems();
      fetchCollections();
    }
    setSaving(false);
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Supprimer cet item ?')) return;
    await fetch(`/api/portal/cms/items/${id}`, { method: 'DELETE' });
    if (editingItem?.id === id) setEditingItem(null);
    fetchItems();
    fetchCollections();
  };

  const openEditItem = (item: CmsItem) => {
    const fields = selectedCollection?.fields || [];
    const parsedFields = Array.isArray(fields) ? fields : [];
    setEditingItem(item);
    const data = typeof item.data === 'string' ? JSON.parse(item.data as unknown as string) : item.data;
    setItemForm({
      slug: item.slug,
      data: data || {},
      status: item.status,
    });
    // If no fields defined, set raw JSON
    if (parsedFields.length === 0) {
      setItemForm((prev) => ({ ...prev, data: data || {} }));
    }
  };

  const openEditCollection = (col: CmsCollection) => {
    const fields = Array.isArray(col.fields) ? col.fields : [];
    setEditingCollection(col);
    setCollectionForm({ name: col.name, slug: col.slug, fields });
  };

  // Add field to collection form
  const addField = () => {
    if (!newField.name || !newField.label) return;
    setCollectionForm((prev) => ({
      ...prev,
      fields: [...prev.fields, { ...newField }],
    }));
    setNewField({ name: '', label: '', type: 'text' });
  };

  const removeField = (index: number) => {
    setCollectionForm((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index),
    }));
  };

  // Get display title from item data
  const getItemTitle = (item: CmsItem): string => {
    const data = typeof item.data === 'string' ? JSON.parse(item.data as unknown as string) : item.data;
    return (data?.title as string) || (data?.name as string) || (data?.titre as string) || item.slug;
  };

  // Filter items by search
  const filteredItems = items.filter((item) => {
    if (!searchQuery) return true;
    const title = getItemTitle(item).toLowerCase();
    const slug = item.slug.toLowerCase();
    const q = searchQuery.toLowerCase();
    return title.includes(q) || slug.includes(q);
  });

  const currentFields: CmsField[] = selectedCollection
    ? (Array.isArray(selectedCollection.fields) ? selectedCollection.fields : [])
    : [];

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

  // Render dynamic field input
  const renderFieldInput = (field: CmsField, value: unknown, onChange: (val: unknown) => void) => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={(value as number) ?? ''}
            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : '')}
            style={inputStyle}
          />
        );
      case 'boolean':
        return (
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }}
            />
            <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{value ? 'Oui' : 'Non'}</span>
          </label>
        );
      case 'date':
        return (
          <input
            type="date"
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            style={inputStyle}
          />
        );
      case 'image':
        return (
          <input
            type="text"
            placeholder="URL de l'image"
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            style={inputStyle}
          />
        );
      default: // text
        return (
          <input
            type="text"
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            style={inputStyle}
          />
        );
    }
  };

  // Fields builder UI (used in collection create/edit modals)
  const renderFieldsBuilder = () => (
    <div>
      <label style={labelStyle}>Champs de la collection</label>
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
          <input
            placeholder="ex: title"
            value={newField.name}
            onChange={(e) => setNewField({ ...newField, name: e.target.value })}
            style={{ ...inputStyle, fontSize: '12px', padding: '6px 8px' }}
          />
        </div>
        <div>
          <label style={{ ...labelStyle, fontSize: '10px' }}>Label</label>
          <input
            placeholder="ex: Titre"
            value={newField.label}
            onChange={(e) => setNewField({ ...newField, label: e.target.value })}
            style={{ ...inputStyle, fontSize: '12px', padding: '6px 8px' }}
          />
        </div>
        <div>
          <label style={{ ...labelStyle, fontSize: '10px' }}>Type</label>
          <select
            value={newField.type}
            onChange={(e) => setNewField({ ...newField, type: e.target.value as CmsField['type'] })}
            style={{ ...selectStyle, fontSize: '12px', padding: '6px 8px' }}
          >
            <option value="text">Texte</option>
            <option value="textarea">Zone texte</option>
            <option value="number">Nombre</option>
            <option value="boolean">Booleen</option>
            <option value="date">Date</option>
            <option value="image">Image</option>
          </select>
        </div>
        <button
          onClick={addField}
          disabled={!newField.name || !newField.label}
          style={{
            padding: '6px 10px', borderRadius: '6px', background: 'var(--bg-secondary)',
            color: 'var(--text-primary)', border: '1px solid var(--border)', cursor: 'pointer',
            fontSize: '12px', fontWeight: 500, opacity: (!newField.name || !newField.label) ? 0.4 : 1,
            whiteSpace: 'nowrap',
          }}
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );

  // Item form fields (dynamic based on collection schema)
  const renderItemFields = () => {
    if (currentFields.length === 0) {
      // Fallback: raw JSON editor
      return (
        <div>
          <label style={labelStyle}>Donnees (JSON)</label>
          <textarea
            value={JSON.stringify(itemForm.data, null, 2)}
            onChange={(e) => {
              try {
                setItemForm({ ...itemForm, data: JSON.parse(e.target.value) });
              } catch {
                // Invalid JSON, keep raw
              }
            }}
            rows={8}
            style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '12px', resize: 'vertical' }}
          />
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {currentFields.map((field) => (
          <div key={field.name}>
            <label style={labelStyle}>{field.label}</label>
            {renderFieldInput(field, itemForm.data[field.name], (val) => {
              setItemForm((prev) => ({
                ...prev,
                data: { ...prev.data, [field.name]: val },
              }));
            })}
          </div>
        ))}
      </div>
    );
  };

  // Modal overlay component
  const Modal = ({ onClose, title, children, width }: { onClose: () => void; title: string; children: React.ReactNode; width?: string }) => (
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

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>CMS</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          {isAdmin && (
            <button
              onClick={() => {
                setCollectionForm({ name: '', slug: '', fields: [] });
                setNewField({ name: '', label: '', type: 'text' });
                setShowCreateCollection(true);
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
                background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)',
                cursor: 'pointer', fontSize: '13px', fontWeight: 500,
              }}
            >
              <Database size={14} /> Nouvelle collection
            </button>
          )}
          {selectedCollection && (
            <button
              onClick={() => {
                setItemForm({ slug: '', data: {}, status: 'DRAFT' });
                setShowCreateItem(true);
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
                background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
              }}
            >
              <Plus size={16} /> Nouvel item
            </button>
          )}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : (editingItem ? '200px 1fr 360px' : '200px 1fr'),
        gap: '16px',
      }}>
        {/* Left sidebar — Collections */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)', overflow: 'hidden',
        }}>
          <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Collections
            </span>
          </div>
          {collections.length === 0 ? (
            <div style={{ padding: '20px 14px', textAlign: 'center' }}>
              <Database size={24} style={{ color: 'var(--text-tertiary)', marginBottom: '8px' }} />
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Aucune collection</p>
            </div>
          ) : (
            <div>
              {collections.map((col) => {
                const isSelected = selectedCollection?.id === col.id;
                return (
                  <div
                    key={col.id}
                    onClick={() => {
                      setSelectedCollection(col);
                      setEditingItem(null);
                      setStatusFilter('ALL');
                      setSearchQuery('');
                    }}
                    style={{
                      padding: '10px 14px', cursor: 'pointer',
                      background: isSelected ? 'var(--accent-light)' : 'transparent',
                      borderLeft: isSelected ? '3px solid var(--accent)' : '3px solid transparent',
                      transition: 'background 0.1s',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{
                        fontSize: '13px', fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? 'var(--accent)' : 'var(--text-primary)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {col.name}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '1px' }}>
                        {col._count.items} item{col._count.items !== 1 ? 's' : ''}
                      </div>
                    </div>
                    {isAdmin && (
                      <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); openEditCollection(col); }}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: '2px' }}
                          title="Modifier"
                        >
                          <ChevronRight size={12} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteCollection(col.id); }}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--danger)', padding: '2px' }}
                          title="Supprimer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Main — Items list */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)', overflow: 'hidden',
        }}>
          {!selectedCollection ? (
            <div style={{ padding: '60px 20px', textAlign: 'center' }}>
              <FileText size={32} style={{ color: 'var(--text-tertiary)', marginBottom: '12px' }} />
              <p style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Selectionnez une collection</p>
            </div>
          ) : (
            <>
              {/* Filters bar */}
              <div style={{
                padding: '12px 16px', borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {(['ALL', 'DRAFT', 'PUBLISHED', 'ARCHIVED'] as StatusFilter[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      style={{
                        padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 500,
                        background: statusFilter === s ? 'var(--accent-light)' : 'transparent',
                        color: statusFilter === s ? 'var(--accent)' : 'var(--text-tertiary)',
                        border: statusFilter === s ? '1px solid var(--accent)' : '1px solid transparent',
                        cursor: 'pointer', transition: 'all 0.1s',
                      }}
                    >
                      {s === 'ALL' ? 'Tous' : STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
                <div style={{ position: 'relative' }}>
                  <Search size={13} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                  <input
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ ...inputStyle, paddingLeft: '28px', width: '180px', fontSize: '12px', padding: '6px 10px 6px 28px' }}
                  />
                </div>
              </div>

              {/* Items */}
              {filteredItems.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Aucun item</p>
                </div>
              ) : (
                <div>
                  {filteredItems.map((item) => {
                    const statusStyle = STATUS_COLORS[item.status] || STATUS_COLORS.DRAFT;
                    const isSelected = editingItem?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => openEditItem(item)}
                        style={{
                          padding: '12px 16px', cursor: 'pointer',
                          borderBottom: '1px solid var(--bg-badge)',
                          background: isSelected ? 'var(--accent-light)' : 'transparent',
                          transition: 'background 0.1s',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        }}
                      >
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{
                            fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>
                            {getItemTitle(item)}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                            /{item.slug} &middot; {format(new Date(item.createdAt), 'dd MMM yyyy', { locale: fr })}
                            {item.publishedAt && (
                              <> &middot; Publie le {format(new Date(item.publishedAt), 'dd MMM yyyy', { locale: fr })}</>
                            )}
                          </div>
                        </div>
                        <span style={{
                          fontSize: '10px', fontWeight: 500, padding: '2px 8px', borderRadius: '10px',
                          background: statusStyle.bg, color: statusStyle.color, flexShrink: 0,
                        }}>
                          {STATUS_LABELS[item.status] || item.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right panel — Edit item */}
        {editingItem && !isMobile && (
          <div style={{
            background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-card)', padding: '16px', overflowY: 'auto', maxHeight: 'calc(100vh - 160px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Modifier l&apos;item</h3>
              <button onClick={() => setEditingItem(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
                <X size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Slug</label>
                <input
                  value={itemForm.slug}
                  onChange={(e) => setItemForm({ ...itemForm, slug: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Statut</label>
                <select
                  value={itemForm.status}
                  onChange={(e) => setItemForm({ ...itemForm, status: e.target.value })}
                  style={selectStyle}
                >
                  <option value="DRAFT">Brouillon</option>
                  <option value="PUBLISHED">Publie</option>
                  <option value="ARCHIVED">Archive</option>
                </select>
              </div>

              {renderItemFields()}

              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button
                  onClick={handleUpdateItem}
                  disabled={saving}
                  style={{
                    padding: '8px 20px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
                    border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px', opacity: saving ? 0.5 : 1,
                  }}
                >
                  {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
                <button
                  onClick={() => handleDeleteItem(editingItem.id)}
                  style={{
                    padding: '8px 14px', borderRadius: '8px', background: 'var(--bg-secondary)',
                    color: 'var(--danger)', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit item modal (mobile) */}
      {editingItem && isMobile && (
        <Modal title="Modifier l'item" onClose={() => setEditingItem(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Slug</label>
              <input
                value={itemForm.slug}
                onChange={(e) => setItemForm({ ...itemForm, slug: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Statut</label>
              <select
                value={itemForm.status}
                onChange={(e) => setItemForm({ ...itemForm, status: e.target.value })}
                style={selectStyle}
              >
                <option value="DRAFT">Brouillon</option>
                <option value="PUBLISHED">Publie</option>
                <option value="ARCHIVED">Archive</option>
              </select>
            </div>
            {renderItemFields()}
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button onClick={handleUpdateItem} disabled={saving} style={{
                padding: '8px 20px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
                border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px', opacity: saving ? 0.5 : 1,
              }}>
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
              <button onClick={() => handleDeleteItem(editingItem.id)} style={{
                padding: '8px 14px', borderRadius: '8px', background: 'var(--bg-secondary)',
                color: 'var(--danger)', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
              }}>
                Supprimer
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create collection modal */}
      {showCreateCollection && (
        <Modal title="Nouvelle collection" onClose={() => setShowCreateCollection(false)} width="540px">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Nom</label>
              <input
                placeholder="ex: Articles de blog"
                value={collectionForm.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setCollectionForm({ ...collectionForm, name, slug: slugify(name) });
                }}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Slug</label>
              <input
                value={collectionForm.slug}
                onChange={(e) => setCollectionForm({ ...collectionForm, slug: e.target.value })}
                style={inputStyle}
              />
            </div>

            {renderFieldsBuilder()}

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button onClick={handleCreateCollection} disabled={saving || !collectionForm.name || !collectionForm.slug} style={{
                padding: '8px 20px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
                border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
                opacity: (saving || !collectionForm.name || !collectionForm.slug) ? 0.5 : 1,
              }}>
                {saving ? 'Creation...' : 'Creer'}
              </button>
              <button onClick={() => setShowCreateCollection(false)} style={{
                padding: '8px 20px', borderRadius: '8px', background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
              }}>Annuler</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit collection modal */}
      {editingCollection && (
        <Modal title="Modifier la collection" onClose={() => setEditingCollection(null)} width="540px">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Nom</label>
              <input
                value={collectionForm.name}
                onChange={(e) => setCollectionForm({ ...collectionForm, name: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Slug</label>
              <input
                value={collectionForm.slug}
                onChange={(e) => setCollectionForm({ ...collectionForm, slug: e.target.value })}
                style={inputStyle}
              />
            </div>

            {renderFieldsBuilder()}

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button onClick={handleUpdateCollection} disabled={saving} style={{
                padding: '8px 20px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
                border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px', opacity: saving ? 0.5 : 1,
              }}>
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
              <button onClick={() => setEditingCollection(null)} style={{
                padding: '8px 20px', borderRadius: '8px', background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
              }}>Annuler</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create item modal */}
      {showCreateItem && selectedCollection && (
        <Modal title={`Nouvel item — ${selectedCollection.name}`} onClose={() => setShowCreateItem(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Slug</label>
              <input
                placeholder="ex: mon-article"
                value={itemForm.slug}
                onChange={(e) => setItemForm({ ...itemForm, slug: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Statut</label>
              <select
                value={itemForm.status}
                onChange={(e) => setItemForm({ ...itemForm, status: e.target.value })}
                style={selectStyle}
              >
                <option value="DRAFT">Brouillon</option>
                <option value="PUBLISHED">Publie</option>
              </select>
            </div>

            {renderItemFields()}

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button onClick={handleCreateItem} disabled={saving || !itemForm.slug} style={{
                padding: '8px 20px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
                border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
                opacity: (saving || !itemForm.slug) ? 0.5 : 1,
              }}>
                {saving ? 'Creation...' : 'Creer'}
              </button>
              <button onClick={() => setShowCreateItem(false)} style={{
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
