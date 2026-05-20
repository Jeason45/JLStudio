'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, Loader2, ImageIcon, Link as LinkIcon, FolderOpen } from 'lucide-react';

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
}

interface ImagePickerProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  /** Aspect ratio hint affiché à l'utilisateur (ex. "16:9", "1:1") */
  hint?: string;
}

export default function ImagePicker({ value, onChange, folder = 'sites', hint }: ImagePickerProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [gallery, setGallery] = useState<MediaItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', folder);
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        headers: { 'x-portal-super-admin': 'true' },
        body: fd,
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || `Erreur ${res.status}`);
      onChange(j.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload échoué');
    } finally {
      setUploading(false);
    }
  }, [folder, onChange]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  }, [upload]);

  const loadGallery = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/media?mime=image', { headers: { 'x-portal-super-admin': 'true' } });
      const data = await res.json();
      setGallery(Array.isArray(data) ? data : []);
    } catch {
      setGallery([]);
    }
  }, []);

  useEffect(() => {
    if (showGallery) loadGallery();
  }, [showGallery, loadGallery]);

  return (
    <div>
      {/* Aperçu / zone de dépôt */}
      {value ? (
        <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            style={{
              maxWidth: '100%', maxHeight: 160, borderRadius: 8,
              border: '1px solid var(--agency-border)', display: 'block',
              objectFit: 'cover',
            }}
            onError={(e) => { e.currentTarget.style.opacity = '0.3'; }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            title="Retirer l'image"
            style={{
              position: 'absolute', top: 6, right: 6,
              width: 24, height: 24, borderRadius: '50%',
              background: 'rgba(0,0,0,0.65)', border: 'none', color: 'white',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `1px dashed ${dragOver ? '#06b6d4' : 'var(--agency-border-strong)'}`,
            background: dragOver ? '#06b6d410' : 'var(--agency-surface-2)',
            borderRadius: 8, padding: '20px 16px', textAlign: 'center',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          {uploading ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--agency-ink-2)' }}>
              <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Upload en cours…
            </span>
          ) : (
            <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: 'var(--agency-ink-3)' }}>
              <Upload size={20} />
              <span style={{ fontSize: 12 }}>Glisse une image ici ou <strong style={{ color: '#06b6d4' }}>parcours</strong></span>
              {hint && <span style={{ fontSize: 10, color: 'var(--agency-ink-4)' }}>Format conseillé : {hint}</span>}
            </span>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }}
      />

      {/* Barre d'actions */}
      <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
        <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} style={miniBtn}>
          <Upload size={11} /> {value ? 'Remplacer' : 'Parcourir'}
        </button>
        <button type="button" onClick={() => setShowGallery((s) => !s)} style={miniBtn}>
          <FolderOpen size={11} /> Galerie
        </button>
        <button type="button" onClick={() => setShowUrlInput((s) => !s)} style={miniBtn}>
          <LinkIcon size={11} /> URL
        </button>
      </div>

      {/* Saisie URL manuelle (fallback) */}
      {showUrlInput && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… ou /images/local.jpg"
          style={{
            width: '100%', marginTop: 8, padding: '7px 10px',
            border: '1px solid var(--agency-border)', borderRadius: 6,
            fontSize: 12, background: 'var(--agency-surface-2)', color: 'var(--agency-ink-1)',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          }}
        />
      )}

      {/* Galerie des médias existants */}
      {showGallery && (
        <div style={{ marginTop: 8, padding: 8, background: 'var(--agency-surface-2)', borderRadius: 8, border: '1px solid var(--agency-border)' }}>
          {gallery.length === 0 ? (
            <p style={{ fontSize: 11, color: 'var(--agency-ink-3)', textAlign: 'center', padding: 12, margin: 0 }}>
              <ImageIcon size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
              Aucune image uploadée pour l’instant
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: 6, maxHeight: 200, overflowY: 'auto' }}>
              {gallery.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => { onChange(m.url); setShowGallery(false); }}
                  style={{
                    aspectRatio: '1', borderRadius: 6, overflow: 'hidden', padding: 0,
                    border: value === m.url ? '2px solid #06b6d4' : '1px solid var(--agency-border)',
                    cursor: 'pointer', background: 'var(--agency-surface-3)',
                  }}
                  title={m.filename}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.url} alt={m.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {error && <p style={{ fontSize: 11, color: '#ef4444', margin: '6px 0 0' }}>{error}</p>}
    </div>
  );
}

const miniBtn: React.CSSProperties = {
  padding: '5px 9px', borderRadius: 6,
  border: '1px solid var(--agency-border)',
  background: 'var(--agency-surface-2)', color: 'var(--agency-ink-2)',
  fontSize: 11, fontWeight: 500, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', gap: 4,
};
