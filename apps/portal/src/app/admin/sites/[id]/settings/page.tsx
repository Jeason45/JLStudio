'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Send, AlertCircle, Check, Loader2 } from 'lucide-react';
import { PageHeaderRibbon } from '@/components/admin/PageHeaderRibbon';

interface SiteSettings {
  brand?: {
    logoUrl?: string;
    primaryColor?: string;
    fontFamily?: string;
    tagline?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
  };
  social?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
  };
  footer?: {
    legalText?: string;
    copyrightName?: string;
  };
  navigation?: {
    items?: Array<{ label: string; href: string }>;
  };
  seo?: {
    defaultTitle?: string;
    defaultDescription?: string;
    favicon?: string;
  };
}

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export default function SiteSettingsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [site, setSite] = useState<{ id: string; name: string; slug: string; draftConfig: SiteSettings | null; config: SiteSettings } | null>(null);
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [publishing, setPublishing] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Initial fetch
  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/admin/sites/${params.id}`, { headers: { 'x-portal-super-admin': 'true' } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setSite(data);
        // Prefer draft if present, sinon live config
        const initial = (data.draftConfig as SiteSettings) || (data.config as SiteSettings) || {};
        setSettings(initial);
        setHasDraft(!!data.draftConfig);
      })
      .catch(() => router.push('/admin/sites'))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  // Auto-save debounced (1.5s)
  const triggerSave = useCallback((newSettings: SiteSettings) => {
    if (!params.id) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSaveStatus('saving');
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/sites/${params.id}/draft`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'x-portal-super-admin': 'true' },
          body: JSON.stringify({ config: newSettings }),
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
  }, [params.id]);

  const update = (path: string, value: unknown) => {
    setSettings((prev) => {
      const next = JSON.parse(JSON.stringify(prev || {}));
      const parts = path.split('.');
      let cursor: Record<string, unknown> = next;
      for (let i = 0; i < parts.length - 1; i++) {
        if (typeof cursor[parts[i]] !== 'object' || cursor[parts[i]] === null) cursor[parts[i]] = {};
        cursor = cursor[parts[i]] as Record<string, unknown>;
      }
      cursor[parts[parts.length - 1]] = value;
      triggerSave(next);
      return next;
    });
  };

  const handlePublish = async () => {
    if (!params.id) return;
    setPublishing(true);
    try {
      const res = await fetch(`/api/admin/sites/${params.id}/publish`, {
        method: 'POST',
        headers: { 'x-portal-super-admin': 'true' },
      });
      if (res.ok) {
        setHasDraft(false);
        alert('Paramètres publiés ✓');
      } else {
        const j = await res.json().catch(() => ({}));
        alert(j.error || 'Publication impossible');
      }
    } finally {
      setPublishing(false);
    }
  };

  const handleDiscard = async () => {
    if (!confirm('Annuler les modifications en cours ?')) return;
    await fetch(`/api/admin/sites/${params.id}/draft`, {
      method: 'DELETE',
      headers: { 'x-portal-super-admin': 'true' },
    });
    // Reload from server
    window.location.reload();
  };

  if (loading || !site) {
    return (
      <div>
        <PageHeaderRibbon label="Sites · Paramètres" />
        <p style={{ fontSize: 13, color: 'var(--agency-ink-3)' }}>Chargement…</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeaderRibbon label={`${site.name} · Paramètres`} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Link href={`/admin/sites/${site.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--agency-ink-3)', textDecoration: 'none' }}>
          <ArrowLeft size={12} /> Retour au site
        </Link>
        <SaveIndicator status={saveStatus} hasDraft={hasDraft} />
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <Section title="Identité de marque" description="Logo, couleurs et identité visuelle du site.">
          <Field label="URL du logo">
            <input
              type="url"
              value={settings.brand?.logoUrl || ''}
              onChange={(e) => update('brand.logoUrl', e.target.value)}
              placeholder="https://…/logo.png"
              style={inputStyle()}
            />
          </Field>
          <Field label="Couleur principale">
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="color"
                value={settings.brand?.primaryColor || '#06b6d4'}
                onChange={(e) => update('brand.primaryColor', e.target.value)}
                style={{ width: 44, height: 36, border: '1px solid var(--agency-border)', borderRadius: 6, background: 'transparent', cursor: 'pointer' }}
              />
              <input
                type="text"
                value={settings.brand?.primaryColor || ''}
                onChange={(e) => update('brand.primaryColor', e.target.value)}
                placeholder="#06b6d4"
                style={{ ...inputStyle(), fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}
              />
            </div>
          </Field>
          <Field label="Police principale (optionnel)">
            <input
              type="text"
              value={settings.brand?.fontFamily || ''}
              onChange={(e) => update('brand.fontFamily', e.target.value)}
              placeholder="Inter, sans-serif"
              style={inputStyle()}
            />
          </Field>
          <Field label="Slogan / Tagline">
            <input
              type="text"
              value={settings.brand?.tagline || ''}
              onChange={(e) => update('brand.tagline', e.target.value)}
              placeholder="Une phrase qui résume ton activité"
              style={inputStyle()}
            />
          </Field>
        </Section>

        <Section title="Contact" description="Coordonnées affichées dans le footer et le formulaire de contact.">
          <Field label="Email public">
            <input
              type="email"
              value={settings.contact?.email || ''}
              onChange={(e) => update('contact.email', e.target.value)}
              placeholder="contact@…"
              style={inputStyle()}
            />
          </Field>
          <Field label="Téléphone">
            <input
              type="tel"
              value={settings.contact?.phone || ''}
              onChange={(e) => update('contact.phone', e.target.value)}
              placeholder="06 12 34 56 78"
              style={inputStyle()}
            />
          </Field>
          <Field label="Adresse">
            <input
              type="text"
              value={settings.contact?.address || ''}
              onChange={(e) => update('contact.address', e.target.value)}
              placeholder="12 rue de la République"
              style={inputStyle()}
            />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12 }}>
            <Field label="Code postal">
              <input
                type="text"
                value={settings.contact?.postalCode || ''}
                onChange={(e) => update('contact.postalCode', e.target.value)}
                placeholder="33000"
                style={inputStyle()}
              />
            </Field>
            <Field label="Ville">
              <input
                type="text"
                value={settings.contact?.city || ''}
                onChange={(e) => update('contact.city', e.target.value)}
                placeholder="Bordeaux"
                style={inputStyle()}
              />
            </Field>
          </div>
        </Section>

        <Section title="Réseaux sociaux" description="Liens vers tes profils sociaux (URLs complètes).">
          <Field label="Instagram">
            <input
              type="url"
              value={settings.social?.instagram || ''}
              onChange={(e) => update('social.instagram', e.target.value)}
              placeholder="https://instagram.com/…"
              style={inputStyle()}
            />
          </Field>
          <Field label="LinkedIn">
            <input
              type="url"
              value={settings.social?.linkedin || ''}
              onChange={(e) => update('social.linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/…"
              style={inputStyle()}
            />
          </Field>
          <Field label="Facebook">
            <input
              type="url"
              value={settings.social?.facebook || ''}
              onChange={(e) => update('social.facebook', e.target.value)}
              placeholder="https://facebook.com/…"
              style={inputStyle()}
            />
          </Field>
          <Field label="Twitter / X">
            <input
              type="url"
              value={settings.social?.twitter || ''}
              onChange={(e) => update('social.twitter', e.target.value)}
              placeholder="https://x.com/…"
              style={inputStyle()}
            />
          </Field>
        </Section>

        <Section title="SEO global" description="Méta-données par défaut quand une page n'a pas son propre SEO.">
          <Field label="Titre par défaut">
            <input
              type="text"
              value={settings.seo?.defaultTitle || ''}
              onChange={(e) => update('seo.defaultTitle', e.target.value)}
              placeholder="Mon entreprise — Service incontournable"
              style={inputStyle()}
            />
          </Field>
          <Field label="Description par défaut (155 caractères max)">
            <textarea
              value={settings.seo?.defaultDescription || ''}
              onChange={(e) => update('seo.defaultDescription', e.target.value)}
              maxLength={155}
              rows={3}
              style={{ ...inputStyle(), resize: 'vertical', minHeight: 70 }}
            />
          </Field>
          <Field label="URL du favicon">
            <input
              type="url"
              value={settings.seo?.favicon || ''}
              onChange={(e) => update('seo.favicon', e.target.value)}
              placeholder="https://…/favicon.ico"
              style={inputStyle()}
            />
          </Field>
        </Section>

        <Section title="Pied de page" description="Mentions et copyright affichés en bas de chaque page.">
          <Field label="Nom du copyright">
            <input
              type="text"
              value={settings.footer?.copyrightName || ''}
              onChange={(e) => update('footer.copyrightName', e.target.value)}
              placeholder={site.name}
              style={inputStyle()}
            />
          </Field>
          <Field label="Mentions légales / texte additionnel">
            <textarea
              value={settings.footer?.legalText || ''}
              onChange={(e) => update('footer.legalText', e.target.value)}
              rows={3}
              placeholder="SIRET 123 456 789, etc."
              style={{ ...inputStyle(), resize: 'vertical', minHeight: 70 }}
            />
          </Field>
        </Section>

        {hasDraft && (
          <footer style={{
            position: 'sticky', bottom: 16, marginTop: 24,
            display: 'flex', gap: 8, justifyContent: 'flex-end',
            padding: 14, background: 'var(--agency-surface-1)',
            border: '1px solid #f59e0b66', borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
            <div style={{ flex: 1, fontSize: 12, color: '#f59e0b', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <AlertCircle size={13} /> Brouillon non publié — les changements ne sont pas visibles sur le site live.
            </div>
            <button onClick={handleDiscard} style={btn('secondary')}>Annuler</button>
            <button onClick={handlePublish} disabled={publishing} style={btn('primary')}>
              <Send size={13} /> {publishing ? 'Publication…' : 'Publier les paramètres'}
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section style={{
      background: 'var(--agency-surface-1)',
      border: '1px solid var(--agency-border)',
      borderRadius: 12,
      padding: 18,
      marginBottom: 14,
    }}>
      <h2 style={{ fontSize: 14, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, marginBottom: 4 }}>{title}</h2>
      {description && <p style={{ fontSize: 11, color: 'var(--agency-ink-3)', margin: 0, marginBottom: 14 }}>{description}</p>}
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--agency-ink-2)', marginBottom: 6, letterSpacing: 0.2, textTransform: 'uppercase' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function SaveIndicator({ status, hasDraft }: { status: SaveStatus; hasDraft: boolean }) {
  if (status === 'saving') {
    return (
      <span style={indicatorStyle('#94a3b8')}>
        <Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} /> Enregistrement…
      </span>
    );
  }
  if (status === 'saved') {
    return (
      <span style={indicatorStyle('#22c55e')}>
        <Check size={11} /> Enregistré
      </span>
    );
  }
  if (status === 'error') {
    return (
      <span style={indicatorStyle('#ef4444')}>
        <AlertCircle size={11} /> Erreur de sauvegarde
      </span>
    );
  }
  if (hasDraft) {
    return (
      <span style={indicatorStyle('#f59e0b')}>
        <Save size={11} /> Brouillon en cours
      </span>
    );
  }
  return null;
}

function indicatorStyle(color: string): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    fontSize: 11, fontWeight: 500, color,
  };
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
