'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { renderSection } from '@/components/admin/sites/SectionPreviews';
import type { SectionInstance } from '@/components/admin/sites/sectionTypes';

interface SiteSettings {
  brand?: { logoUrl?: string; primaryColor?: string; fontFamily?: string; tagline?: string };
  contact?: { email?: string; phone?: string; address?: string; city?: string; postalCode?: string };
  social?: Record<string, string>;
  footer?: { legalText?: string; copyrightName?: string };
  navigation?: { items?: Array<{ label: string; href: string }> };
}

interface SiteData {
  id: string; name: string; slug: string;
  config: SiteSettings;
  draftConfig: SiteSettings | null;
}

interface PageData {
  id: string; slug: string; title: string;
  config: { sections?: SectionInstance[] };
  draftConfig: { sections?: SectionInstance[] } | null;
}

export default function PreviewPage() {
  const params = useParams<{ id: string; pageId: string }>();
  const [site, setSite] = useState<SiteData | null>(null);
  const [page, setPage] = useState<PageData | null>(null);
  const [allPages, setAllPages] = useState<Array<{ slug: string; title: string; isHome: boolean }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id || !params.pageId) return;
    (async () => {
      try {
        const [sRes, pRes, pagesRes] = await Promise.all([
          fetch(`/api/admin/sites/${params.id}`, { headers: { 'x-portal-super-admin': 'true' } }),
          fetch(`/api/admin/sites/${params.id}/pages/${params.pageId}`, { headers: { 'x-portal-super-admin': 'true' } }),
          fetch(`/api/admin/sites/${params.id}/pages`, { headers: { 'x-portal-super-admin': 'true' } }),
        ]);
        if (sRes.ok) setSite(await sRes.json());
        if (pRes.ok) setPage(await pRes.json());
        if (pagesRes.ok) setAllPages(await pagesRes.json());
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id, params.pageId]);

  if (loading) {
    return <div style={{ padding: 40, fontSize: 13, color: '#64748b' }}>Chargement de l&apos;aperçu…</div>;
  }
  if (!site || !page) {
    return <div style={{ padding: 40, color: '#dc2626', fontSize: 13 }}>Page introuvable</div>;
  }

  // Resolver : prefer brouillon
  const settings: SiteSettings = (site.draftConfig as SiteSettings) || site.config || {};
  const pageContent = (page.draftConfig || page.config || {}) as { sections?: SectionInstance[] };
  const sections = pageContent.sections || [];
  const fontFamily = settings.brand?.fontFamily || 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

  return (
    <div style={{ fontFamily, lineHeight: 1.5, color: '#0f172a', background: '#ffffff' }}>
      {/* Bandeau "aperçu" */}
      <div style={{
        padding: '10px 16px', background: '#0f172a', color: 'white',
        fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span>
          🔍 <strong>Aperçu</strong> · {site.name} · /{page.slug} · {page.draftConfig ? 'BROUILLON' : 'EN LIGNE'}
        </span>
        <a
          href={`/admin/sites/${site.id}/pages/${page.id}/edit`}
          style={{ color: '#06b6d4', textDecoration: 'none' }}
        >
          ← Retour à l&apos;éditeur
        </a>
      </div>

      {/* Header avec logo + nav */}
      <header style={{
        padding: '20px 24px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: 1280, margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {settings.brand?.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.brand.logoUrl} alt={site.name} style={{ height: 36, width: 'auto' }} />
          ) : (
            <span style={{ fontSize: 20, fontWeight: 700 }}>{site.name}</span>
          )}
        </div>
        <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {allPages.map((p) => (
            <a
              key={p.slug}
              href="#"
              style={{
                fontSize: 14, color: p.slug === page.slug ? (settings.brand?.primaryColor || '#06b6d4') : '#475569',
                textDecoration: 'none', fontWeight: p.slug === page.slug ? 600 : 500,
              }}
            >
              {p.isHome ? 'Accueil' : p.title}
            </a>
          ))}
        </nav>
      </header>

      {/* Rendu des sections */}
      <main>
        {sections.length === 0 ? (
          <div style={{ padding: 80, textAlign: 'center', color: '#94a3b8' }}>
            <p style={{ fontSize: 16, margin: 0 }}>Aucune section sur cette page</p>
            <p style={{ fontSize: 13, margin: '8px 0 0' }}>Retourne à l&apos;éditeur et ajoute des sections.</p>
          </div>
        ) : (
          sections.map((s) => <div key={s.id}>{renderSection(s, settings)}</div>)
        )}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '40px 24px',
        background: '#0f172a',
        color: 'white',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 13, margin: 0, marginBottom: 8 }}>
            © {new Date().getFullYear()} {settings.footer?.copyrightName || site.name}
          </p>
          {settings.footer?.legalText && (
            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{settings.footer.legalText}</p>
          )}
          {settings.social && (
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 16 }}>
              {settings.social.instagram && <a href={settings.social.instagram} style={socialLink} target="_blank" rel="noopener noreferrer">Instagram</a>}
              {settings.social.linkedin && <a href={settings.social.linkedin} style={socialLink} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
              {settings.social.facebook && <a href={settings.social.facebook} style={socialLink} target="_blank" rel="noopener noreferrer">Facebook</a>}
              {settings.social.twitter && <a href={settings.social.twitter} style={socialLink} target="_blank" rel="noopener noreferrer">X</a>}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}

const socialLink: React.CSSProperties = {
  fontSize: 12, color: '#94a3b8', textDecoration: 'none',
};
