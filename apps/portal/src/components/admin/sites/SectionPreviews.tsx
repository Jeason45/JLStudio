'use client';

import type { SectionType, SectionInstance } from './sectionTypes';

interface SiteSettings {
  brand?: { logoUrl?: string; primaryColor?: string; fontFamily?: string; tagline?: string };
  contact?: { email?: string; phone?: string; address?: string; city?: string; postalCode?: string };
  social?: Record<string, string>;
  footer?: { legalText?: string; copyrightName?: string };
  navigation?: { items?: Array<{ label: string; href: string }> };
}

interface PreviewProps<T> {
  content: T;
  brand: SiteSettings['brand'];
  settings?: SiteSettings;
}

const wrapStyle = (bg?: string): React.CSSProperties => ({
  padding: '64px 24px', background: bg || '#ffffff',
});
const containerStyle: React.CSSProperties = { maxWidth: 1100, margin: '0 auto' };

// ─── HERO ─────────────────────────────────────────────────────────────

interface HeroContent {
  eyebrow?: string; title?: string; subtitle?: string;
  imageUrl?: string; align?: 'left' | 'center';
  ctaPrimary?: { label?: string; href?: string };
  ctaSecondary?: { label?: string; href?: string };
}

function HeroPreview({ content, brand }: PreviewProps<HeroContent>) {
  const align = content.align || 'left';
  const primaryColor = brand?.primaryColor || '#06b6d4';
  return (
    <section style={{
      position: 'relative',
      minHeight: 480,
      display: 'flex',
      alignItems: 'center',
      backgroundImage: content.imageUrl ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${content.imageUrl})` : undefined,
      backgroundColor: content.imageUrl ? undefined : '#0f172a',
      backgroundSize: 'cover', backgroundPosition: 'center',
      color: 'white',
      padding: '80px 24px',
      textAlign: align,
    }}>
      <div style={{ ...containerStyle, width: '100%' }}>
        {content.eyebrow && (
          <p style={{ fontSize: 13, fontWeight: 600, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1, margin: 0, marginBottom: 12 }}>
            {content.eyebrow}
          </p>
        )}
        <h1 style={{ fontSize: 48, fontWeight: 700, margin: 0, marginBottom: 16, lineHeight: 1.1 }}>
          {content.title || 'Titre principal'}
        </h1>
        {content.subtitle && (
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', margin: 0, marginBottom: 24, maxWidth: 640, ...(align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}) }}>
            {content.subtitle}
          </p>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: align === 'center' ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
          {content.ctaPrimary?.label && (
            <a href={content.ctaPrimary.href || '#'} style={{
              display: 'inline-block', padding: '14px 28px', borderRadius: 10,
              background: primaryColor, color: 'white', fontWeight: 600, textDecoration: 'none', fontSize: 15,
            }}>
              {content.ctaPrimary.label}
            </a>
          )}
          {content.ctaSecondary?.label && (
            <a href={content.ctaSecondary.href || '#'} style={{
              display: 'inline-block', padding: '14px 28px', borderRadius: 10,
              background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 600, textDecoration: 'none', fontSize: 15,
              border: '1px solid rgba(255,255,255,0.3)',
            }}>
              {content.ctaSecondary.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────

interface AboutContent {
  eyebrow?: string; title?: string; body?: string;
  imageUrl?: string; imagePosition?: 'left' | 'right';
}

function AboutPreview({ content, brand }: PreviewProps<AboutContent>) {
  const primaryColor = brand?.primaryColor || '#06b6d4';
  const imageLeft = content.imagePosition === 'left';
  return (
    <section style={wrapStyle('#ffffff')}>
      <div style={{ ...containerStyle, display: 'grid', gridTemplateColumns: content.imageUrl ? '1fr 1fr' : '1fr', gap: 48, alignItems: 'center' }}>
        {content.imageUrl && imageLeft && (
          <img src={content.imageUrl} alt="" style={{ width: '100%', height: 'auto', borderRadius: 12 }} />
        )}
        <div>
          {content.eyebrow && (
            <p style={{ fontSize: 13, fontWeight: 600, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1, margin: 0, marginBottom: 12 }}>
              {content.eyebrow}
            </p>
          )}
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0f172a', margin: 0, marginBottom: 16 }}>
            {content.title || 'Titre'}
          </h2>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>
            {content.body || 'Texte'}
          </p>
        </div>
        {content.imageUrl && !imageLeft && (
          <img src={content.imageUrl} alt="" style={{ width: '100%', height: 'auto', borderRadius: 12 }} />
        )}
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────

interface ServicesContent {
  eyebrow?: string; title?: string; subtitle?: string;
  items?: Array<{ title?: string; description?: string; icon?: string; href?: string }>;
  columns?: 2 | 3 | 4;
}

function ServicesPreview({ content, brand }: PreviewProps<ServicesContent>) {
  const primaryColor = brand?.primaryColor || '#06b6d4';
  const cols = content.columns || 3;
  return (
    <section style={wrapStyle('#f8fafc')}>
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          {content.eyebrow && (
            <p style={{ fontSize: 13, fontWeight: 600, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1, margin: 0, marginBottom: 12 }}>
              {content.eyebrow}
            </p>
          )}
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0f172a', margin: 0, marginBottom: 8 }}>
            {content.title || 'Services'}
          </h2>
          {content.subtitle && (
            <p style={{ fontSize: 16, color: '#64748b', margin: 0 }}>{content.subtitle}</p>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 20 }}>
          {(content.items || []).map((it, i) => (
            <div key={i} style={{
              padding: 24, background: 'white', borderRadius: 12,
              border: '1px solid #e2e8f0',
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{it.icon || '✨'}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', margin: 0, marginBottom: 8 }}>
                {it.title || 'Service'}
              </h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                {it.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────

interface PricingContent {
  eyebrow?: string; title?: string; subtitle?: string;
  plans?: Array<{
    name?: string; price?: string; period?: string; description?: string;
    features?: string[]; highlighted?: boolean; cta?: { label?: string; href?: string };
  }>;
}

function PricingPreview({ content, brand }: PreviewProps<PricingContent>) {
  const primaryColor = brand?.primaryColor || '#06b6d4';
  const plans = content.plans || [];
  return (
    <section style={wrapStyle('#ffffff')}>
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          {content.eyebrow && <p style={{ fontSize: 13, fontWeight: 600, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1, margin: 0, marginBottom: 12 }}>{content.eyebrow}</p>}
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0f172a', margin: 0, marginBottom: 8 }}>{content.title || 'Tarifs'}</h2>
          {content.subtitle && <p style={{ fontSize: 16, color: '#64748b', margin: 0 }}>{content.subtitle}</p>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(plans.length || 1, 3)}, 1fr)`, gap: 20, maxWidth: 960, margin: '0 auto' }}>
          {plans.map((p, i) => (
            <div key={i} style={{
              padding: 28, borderRadius: 14,
              background: p.highlighted ? primaryColor : 'white',
              color: p.highlighted ? 'white' : undefined,
              border: p.highlighted ? `2px solid ${primaryColor}` : '1px solid #e2e8f0',
              boxShadow: p.highlighted ? '0 10px 30px rgba(6,182,212,0.3)' : undefined,
              position: 'relative',
            }}>
              {p.highlighted && (
                <div style={{ position: 'absolute', top: -12, right: 16, background: '#0f172a', color: 'white', padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>
                  Recommandé
                </div>
              )}
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 4 }}>{p.name || 'Formule'}</h3>
              {p.description && <p style={{ fontSize: 12, opacity: 0.8, margin: 0, marginBottom: 14 }}>{p.description}</p>}
              <div style={{ marginBottom: 18, marginTop: 16 }}>
                <span style={{ fontSize: 32, fontWeight: 700 }}>{p.price || '—'}</span>
                {p.period && <span style={{ fontSize: 13, opacity: 0.7, marginLeft: 4 }}>{p.period}</span>}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 20 }}>
                {(p.features || []).map((f, j) => (
                  <li key={j} style={{ fontSize: 13, padding: '6px 0', borderTop: p.highlighted ? '1px solid rgba(255,255,255,0.2)' : '1px solid #f1f5f9' }}>
                    ✓ {f}
                  </li>
                ))}
              </ul>
              {p.cta?.label && (
                <a href={p.cta.href || '#'} style={{
                  display: 'block', textAlign: 'center', padding: '12px',
                  background: p.highlighted ? 'white' : primaryColor,
                  color: p.highlighted ? primaryColor : 'white',
                  textDecoration: 'none', fontWeight: 600, fontSize: 14, borderRadius: 8,
                }}>
                  {p.cta.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────

interface TestimonialsContent {
  eyebrow?: string; title?: string;
  items?: Array<{ quote?: string; author?: string; role?: string; avatarUrl?: string }>;
}

function TestimonialsPreview({ content, brand }: PreviewProps<TestimonialsContent>) {
  const primaryColor = brand?.primaryColor || '#06b6d4';
  return (
    <section style={wrapStyle('#f8fafc')}>
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          {content.eyebrow && <p style={{ fontSize: 13, fontWeight: 600, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1, margin: 0, marginBottom: 12 }}>{content.eyebrow}</p>}
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0f172a', margin: 0 }}>{content.title || 'Témoignages'}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, maxWidth: 1000, margin: '0 auto' }}>
          {(content.items || []).map((t, i) => (
            <blockquote key={i} style={{
              margin: 0, padding: 24, background: 'white', borderRadius: 12,
              border: '1px solid #e2e8f0',
            }}>
              <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.6, fontStyle: 'italic', margin: 0, marginBottom: 16 }}>
                « {t.quote || 'Citation'} »
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {t.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.avatarUrl} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: '#94a3b8' }}>
                    {(t.author || '?').slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{t.author || 'Anonyme'}</div>
                  {t.role && <div style={{ fontSize: 11, color: '#64748b' }}>{t.role}</div>}
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY ──────────────────────────────────────────────────────────

interface GalleryContent {
  eyebrow?: string; title?: string; subtitle?: string;
  images?: Array<{ url?: string; alt?: string; caption?: string }>;
  columns?: 2 | 3 | 4;
}

function GalleryPreview({ content, brand }: PreviewProps<GalleryContent>) {
  const primaryColor = brand?.primaryColor || '#06b6d4';
  const cols = content.columns || 3;
  return (
    <section style={wrapStyle('#ffffff')}>
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          {content.eyebrow && <p style={{ fontSize: 13, fontWeight: 600, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1, margin: 0, marginBottom: 12 }}>{content.eyebrow}</p>}
          {content.title && <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0f172a', margin: 0 }}>{content.title}</h2>}
          {content.subtitle && <p style={{ fontSize: 16, color: '#64748b', margin: '8px 0 0' }}>{content.subtitle}</p>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
          {(content.images || []).map((im, i) => (
            <figure key={i} style={{ margin: 0 }}>
              {im.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={im.url} alt={im.alt || ''} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 10 }} />
              ) : (
                <div style={{ width: '100%', aspectRatio: '1', background: '#e2e8f0', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 12 }}>
                  Pas d&apos;image
                </div>
              )}
              {im.caption && <figcaption style={{ fontSize: 12, color: '#64748b', marginTop: 6, textAlign: 'center' }}>{im.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────

interface FaqContent {
  eyebrow?: string; title?: string;
  items?: Array<{ question?: string; answer?: string }>;
}

function FaqPreview({ content, brand }: PreviewProps<FaqContent>) {
  const primaryColor = brand?.primaryColor || '#06b6d4';
  return (
    <section style={wrapStyle('#f8fafc')}>
      <div style={{ ...containerStyle, maxWidth: 760 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          {content.eyebrow && <p style={{ fontSize: 13, fontWeight: 600, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1, margin: 0, marginBottom: 12 }}>{content.eyebrow}</p>}
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0f172a', margin: 0 }}>{content.title || 'Questions fréquentes'}</h2>
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          {(content.items || []).map((it, i) => (
            <details key={i} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: 16 }}>
              <summary style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', cursor: 'pointer', listStyle: 'none' }}>
                {it.question || `Question ${i + 1}`}
              </summary>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, margin: '12px 0 0' }}>
                {it.answer || ''}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────

interface ContactContent {
  eyebrow?: string; title?: string; subtitle?: string;
  showForm?: boolean; showCoordinates?: boolean; mapEmbedUrl?: string;
}

function ContactPreview({ content, brand, settings }: PreviewProps<ContactContent>) {
  const primaryColor = brand?.primaryColor || '#06b6d4';
  const contact = settings?.contact || {};
  return (
    <section style={wrapStyle('#ffffff')}>
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          {content.eyebrow && <p style={{ fontSize: 13, fontWeight: 600, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1, margin: 0, marginBottom: 12 }}>{content.eyebrow}</p>}
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0f172a', margin: 0, marginBottom: 8 }}>{content.title || 'Contact'}</h2>
          {content.subtitle && <p style={{ fontSize: 16, color: '#64748b', margin: 0 }}>{content.subtitle}</p>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: content.showForm !== false && content.showCoordinates !== false ? '1fr 1fr' : '1fr', gap: 32, maxWidth: 920, margin: '0 auto' }}>
          {content.showForm !== false && (
            <div style={{ padding: 24, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <input type="text" placeholder="Nom" style={contactInputStyle} />
              <input type="email" placeholder="Email" style={contactInputStyle} />
              <textarea placeholder="Votre message…" rows={4} style={{ ...contactInputStyle, resize: 'vertical', minHeight: 100 }} />
              <button style={{ padding: '12px 24px', background: primaryColor, color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
                Envoyer
              </button>
            </div>
          )}
          {content.showCoordinates !== false && (
            <div>
              {contact.email && <p style={{ fontSize: 14, color: '#475569', margin: '0 0 8px' }}>📧 <a href={`mailto:${contact.email}`} style={{ color: primaryColor }}>{contact.email}</a></p>}
              {contact.phone && <p style={{ fontSize: 14, color: '#475569', margin: '0 0 8px' }}>📞 <a href={`tel:${contact.phone}`} style={{ color: primaryColor }}>{contact.phone}</a></p>}
              {(contact.address || contact.city) && (
                <p style={{ fontSize: 14, color: '#475569', margin: '0 0 16px' }}>
                  📍 {[contact.address, contact.postalCode, contact.city].filter(Boolean).join(', ')}
                </p>
              )}
              {content.mapEmbedUrl && (
                <iframe
                  src={content.mapEmbedUrl}
                  style={{ width: '100%', height: 240, border: 'none', borderRadius: 10 }}
                  loading="lazy"
                  title="Carte"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const contactInputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px',
  border: '1px solid #cbd5e1', borderRadius: 8,
  fontSize: 14, marginBottom: 10,
  background: 'white', color: '#0f172a',
  fontFamily: 'inherit', boxSizing: 'border-box',
};

// ─── CTA ──────────────────────────────────────────────────────────────

interface CtaContent {
  title?: string; subtitle?: string;
  ctaLabel?: string; ctaHref?: string;
  backgroundColor?: string;
}

function CtaPreview({ content, brand }: PreviewProps<CtaContent>) {
  const bg = content.backgroundColor || brand?.primaryColor || '#06b6d4';
  return (
    <section style={{ padding: '64px 24px', background: bg, color: 'white', textAlign: 'center' }}>
      <div style={containerStyle}>
        <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0, marginBottom: 12 }}>{content.title || 'Prêt à démarrer ?'}</h2>
        {content.subtitle && <p style={{ fontSize: 17, opacity: 0.92, margin: 0, marginBottom: 24, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>{content.subtitle}</p>}
        {content.ctaLabel && (
          <a href={content.ctaHref || '#'} style={{
            display: 'inline-block', padding: '14px 32px', background: 'white',
            color: bg, fontWeight: 700, textDecoration: 'none', fontSize: 15, borderRadius: 10,
          }}>
            {content.ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}

// ─── Router ───────────────────────────────────────────────────────────

export function renderSection(section: SectionInstance, settings: SiteSettings): React.ReactNode {
  const brand = settings.brand;
  const c = section.content as Record<string, unknown>;
  switch (section.type as SectionType) {
    case 'HERO':         return <HeroPreview content={c as HeroContent} brand={brand} />;
    case 'ABOUT':        return <AboutPreview content={c as AboutContent} brand={brand} />;
    case 'SERVICES':     return <ServicesPreview content={c as ServicesContent} brand={brand} />;
    case 'PRICING':      return <PricingPreview content={c as PricingContent} brand={brand} />;
    case 'TESTIMONIALS': return <TestimonialsPreview content={c as TestimonialsContent} brand={brand} />;
    case 'GALLERY':      return <GalleryPreview content={c as GalleryContent} brand={brand} />;
    case 'FAQ':          return <FaqPreview content={c as FaqContent} brand={brand} />;
    case 'CONTACT':      return <ContactPreview content={c as ContactContent} brand={brand} settings={settings} />;
    case 'CTA':          return <CtaPreview content={c as CtaContent} brand={brand} />;
    default:             return null;
  }
}
