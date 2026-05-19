'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Globe } from 'lucide-react';
import { PageHeaderRibbon } from '@/components/admin/PageHeaderRibbon';

// Slug auto depuis le nom : lowercase, accents → ascii, espaces → tirets, alphanum
function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // accents
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
}

export default function NewSitePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (v: string) => {
    setName(v);
    if (!slugTouched) setSlug(slugify(v));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name.trim() || !slug.trim()) {
      setError('Nom et slug requis');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-portal-super-admin': 'true' },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Erreur ${res.status}`);
      }
      const site = await res.json();
      router.push(`/admin/sites/${site.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création');
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeaderRibbon label="Sites · Nouveau" />

      <div style={{ marginBottom: 16 }}>
        <Link
          href="/admin/sites"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--agency-ink-3)', textDecoration: 'none' }}
        >
          <ArrowLeft size={12} /> Retour aux sites
        </Link>
      </div>

      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Globe size={20} style={{ color: '#06b6d4' }} />
          <h1 style={{ fontSize: 18, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0 }}>
            Créer un nouveau site
          </h1>
        </div>
        <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', margin: 0, marginBottom: 24 }}>
          Représente soit ton propre site JL Studio, soit un site client à éditer en autonomie.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle()}>Nom du site</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Ex. Restaurant Le Comptoir, JL Studio, Coach Marie Durand…"
            style={inputStyle()}
            autoFocus
            required
          />

          <label style={{ ...labelStyle(), marginTop: 14 }}>
            Slug technique <span style={{ color: 'var(--agency-ink-4)', textTransform: 'none', fontWeight: 400 }}>(identifiant interne, figé après création)</span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true); }}
            placeholder="ex. le-comptoir-bordeaux"
            style={{ ...inputStyle(), fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}
            pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
            minLength={3}
            maxLength={40}
            required
          />
          <p style={{ fontSize: 11, color: 'var(--agency-ink-4)', margin: '4px 0 0' }}>
            Lettres minuscules, chiffres et tirets uniquement. 3 à 40 caractères.
          </p>

          <label style={{ ...labelStyle(), marginTop: 14 }}>
            Description <span style={{ color: 'var(--agency-ink-4)', textTransform: 'none', fontWeight: 400 }}>(optionnel)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Notes internes sur le site, contexte client…"
            rows={3}
            style={{ ...inputStyle(), resize: 'vertical', minHeight: 70 }}
          />

          {error && (
            <div style={{ padding: 12, background: '#7f1d1d33', border: '1px solid #ef444466', borderRadius: 8, marginTop: 16 }}>
              <p style={{ fontSize: 13, color: '#fca5a5', margin: 0 }}>{error}</p>
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--agency-border)' }}>
            <Link href="/admin/sites" style={btn('secondary')}>Annuler</Link>
            <button type="submit" disabled={loading || !name.trim() || !slug.trim()} style={btn('primary')}>
              {loading ? 'Création…' : 'Créer le site'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function inputStyle(): React.CSSProperties {
  return {
    width: '100%', padding: '8px 12px',
    border: '1px solid var(--agency-border)', borderRadius: 8,
    fontSize: 13, outline: 'none',
    background: 'var(--agency-surface-2)',
    color: 'var(--agency-ink-1)',
    fontFamily: 'inherit',
  };
}
function labelStyle(): React.CSSProperties {
  return {
    display: 'block', fontSize: 11, fontWeight: 600,
    color: 'var(--agency-ink-2)', marginBottom: 6,
    letterSpacing: 0.2, textTransform: 'uppercase' as const,
  };
}
function btn(variant: 'primary' | 'secondary'): React.CSSProperties {
  return {
    padding: '8px 14px', borderRadius: 8,
    border: variant === 'primary' ? 'none' : '1px solid var(--agency-border)',
    background: variant === 'primary' ? '#06b6d4' : 'var(--agency-surface-2)',
    color: variant === 'primary' ? 'white' : 'var(--agency-ink-1)',
    fontSize: 13, fontWeight: 500, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 5, textDecoration: 'none',
  };
}
