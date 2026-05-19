'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, Home } from 'lucide-react';
import { PageHeaderRibbon } from '@/components/admin/PageHeaderRibbon';

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

// Templates rapides : structures préfabriquées de sections selon le type de page
const PAGE_TEMPLATES: Array<{
  id: string;
  label: string;
  description: string;
  slug: string;
  title: string;
  sections: Array<{ type: string }>;
}> = [
  {
    id: 'home',
    label: '🏠 Page d\'accueil',
    description: 'Hero + Services + Témoignages + CTA. Pour la home.',
    slug: 'home',
    title: 'Accueil',
    sections: [
      { type: 'HERO' },
      { type: 'SERVICES' },
      { type: 'TESTIMONIALS' },
      { type: 'CTA' },
    ],
  },
  {
    id: 'about',
    label: 'ℹ️ À propos',
    description: 'Bloc À propos + galerie + équipe + CTA contact.',
    slug: 'a-propos',
    title: 'À propos',
    sections: [
      { type: 'ABOUT' },
      { type: 'GALLERY' },
      { type: 'CTA' },
    ],
  },
  {
    id: 'services',
    label: '🛠️ Services / Prestations',
    description: 'Hero court + Services détaillés + Tarifs + FAQ.',
    slug: 'services',
    title: 'Nos services',
    sections: [
      { type: 'HERO' },
      { type: 'SERVICES' },
      { type: 'PRICING' },
      { type: 'FAQ' },
    ],
  },
  {
    id: 'contact',
    label: '✉️ Contact',
    description: 'Bloc Contact (formulaire + coordonnées + carte).',
    slug: 'contact',
    title: 'Contact',
    sections: [
      { type: 'CONTACT' },
    ],
  },
  {
    id: 'blank',
    label: '📄 Page vierge',
    description: 'Aucune section pré-remplie. À toi de composer.',
    slug: '',
    title: '',
    sections: [],
  },
];

export default function NewPagePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [template, setTemplate] = useState(PAGE_TEMPLATES[0]);
  const [title, setTitle] = useState(template.title);
  const [slug, setSlug] = useState(template.slug);
  const [slugTouched, setSlugTouched] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [siteName, setSiteName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Récupère le nom du site pour le header
  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/admin/sites/${params.id}`, { headers: { 'x-portal-super-admin': 'true' } })
      .then((r) => r.ok ? r.json() : null)
      .then((s) => { if (s) setSiteName(s.name); });
  }, [params.id]);

  // Quand on change de template, on pré-remplit
  const handleTemplateChange = (t: typeof PAGE_TEMPLATES[number]) => {
    setTemplate(t);
    setTitle(t.title);
    if (!slugTouched) setSlug(t.slug);
    if (t.id === 'home') setIsHome(true);
  };

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!title.trim() || !slug.trim()) {
      setError('Titre et slug requis');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/admin/sites/${params.id}/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-portal-super-admin': 'true' },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          isHome,
          config: { sections: template.sections.map((s, i) => ({ id: `s-${Date.now()}-${i}`, type: s.type, content: {} })) },
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Erreur ${res.status}`);
      }
      const page = await res.json();
      router.push(`/admin/sites/${params.id}/pages/${page.id}/edit`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création');
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeaderRibbon label={`${siteName || 'Site'} · Nouvelle page`} />

      <div style={{ marginBottom: 16 }}>
        <Link href={`/admin/sites/${params.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--agency-ink-3)', textDecoration: 'none' }}>
          <ArrowLeft size={12} /> Retour au site
        </Link>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <FileText size={20} style={{ color: '#06b6d4' }} />
          <h1 style={{ fontSize: 18, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0 }}>
            Créer une page
          </h1>
        </div>
        <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', margin: 0, marginBottom: 24 }}>
          Choisis un template pour démarrer, ou pars d&apos;une page vierge.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle()}>Template de départ</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8, marginBottom: 18 }}>
            {PAGE_TEMPLATES.map((t) => {
              const active = template.id === t.id;
              return (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => handleTemplateChange(t)}
                  style={{
                    padding: 12, borderRadius: 10, textAlign: 'left',
                    border: `1px solid ${active ? '#06b6d4' : 'var(--agency-border)'}`,
                    background: active ? '#06b6d418' : 'var(--agency-surface-1)',
                    color: 'var(--agency-ink-1)',
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', lineHeight: 1.4 }}>{t.description}</div>
                </button>
              );
            })}
          </div>

          <label style={labelStyle()}>Titre de la page</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Ex. À propos, Tarifs, Contact…"
            style={inputStyle()}
            autoFocus
            required
          />

          <label style={{ ...labelStyle(), marginTop: 14 }}>
            Slug URL <span style={{ color: 'var(--agency-ink-4)', textTransform: 'none', fontWeight: 400 }}>(figé après création)</span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true); }}
            placeholder="ex. a-propos"
            style={{ ...inputStyle(), fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}
            pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
            maxLength={60}
            required
          />
          <p style={{ fontSize: 11, color: 'var(--agency-ink-4)', margin: '4px 0 14px' }}>
            URL finale : <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>/{slug || 'slug'}</span>
          </p>

          <label style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: 10,
            background: 'var(--agency-surface-2)', borderRadius: 8,
            border: '1px solid var(--agency-border)', cursor: 'pointer',
          }}>
            <input
              type="checkbox"
              checked={isHome}
              onChange={(e) => setIsHome(e.target.checked)}
              style={{ accentColor: '#06b6d4' }}
            />
            <Home size={13} style={{ color: isHome ? '#06b6d4' : 'var(--agency-ink-3)' }} />
            <span style={{ fontSize: 13 }}>Définir comme page d&apos;accueil du site</span>
          </label>

          {error && (
            <div style={{ padding: 12, background: '#7f1d1d33', border: '1px solid #ef444466', borderRadius: 8, marginTop: 16 }}>
              <p style={{ fontSize: 13, color: '#fca5a5', margin: 0 }}>{error}</p>
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--agency-border)' }}>
            <Link href={`/admin/sites/${params.id}`} style={btn('secondary')}>Annuler</Link>
            <button type="submit" disabled={loading || !title.trim() || !slug.trim()} style={btn('primary')}>
              {loading ? 'Création…' : 'Créer & éditer'}
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
