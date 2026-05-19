'use client';

import type { JlStudioContent } from './contentSchema';

// Rendu HTML/CSS représentatif des 9 sections du site jlstudio.dev
// Sans les animations Lenis/parallax/GSAP — l'objectif est de valider
// le CONTENU (textes, images, ordre, tarifs, etc.) avant publication.

interface Props {
  content: JlStudioContent;
}

export default function JLStudioPreview({ content }: Props) {
  const { hero, services, process: proc, portfolio, testimonials, about, faq, contact, global: g } = content;
  return (
    <div style={pageStyle}>
      {/* HEADER */}
      <header style={headerStyle}>
        <div style={containerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {g.brand.logoUrl ? (
              <ImgFallback src={g.brand.logoUrl} alt="logo" style={{ height: 36, width: 'auto' }} />
            ) : (
              <strong style={{ fontSize: 18, color: '#0f172a' }}>{g.copyrightName}</strong>
            )}
            <nav style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
              {g.navigation.map((n, i) => (
                <a key={i} href={n.href} style={{ fontSize: 13, color: '#475569', textDecoration: 'none' }}>{n.label}</a>
              ))}
              {g.headerCta.label && (
                <a href={g.headerCta.href} style={{ fontSize: 13, color: 'white', background: '#0f172a', padding: '8px 14px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
                  {g.headerCta.label}
                </a>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" style={{ position: 'relative', minHeight: 520, display: 'flex', alignItems: 'center', color: 'white', padding: '80px 24px', backgroundImage: hero.backgroundImage ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${hero.backgroundImage})` : undefined, backgroundColor: hero.backgroundImage ? undefined : '#0f172a', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ ...containerStyle, width: '100%' }}>
          <h1 style={{ fontSize: 56, fontWeight: 700, margin: 0, lineHeight: 1.05 }}>
            {hero.title}<br />
            <span style={{ color: '#06b6d4' }}>{hero.subtitle}</span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', margin: '20px 0 30px', maxWidth: 640 }}>
            {hero.description}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {hero.ctaPrimary.label && (
              <a href={hero.ctaPrimary.href} style={ctaPrimaryStyle}>{hero.ctaPrimary.label}</a>
            )}
            {hero.ctaSecondary.label && (
              <a href={hero.ctaSecondary.href} style={ctaSecondaryStyle}>{hero.ctaSecondary.label}</a>
            )}
          </div>
          <p style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: 2, textTransform: 'uppercase' }}>
            ↓ {hero.scrollLabel}
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={sectionStyle('#ffffff')}>
        <div style={containerStyle}>
          <SectionHeading eyebrow={services.eyebrow} title={services.title} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 48 }}>
            {(services.items || []).map((it, i) => (
              <div key={i} style={{ position: 'relative', padding: 28, background: '#f8fafc', borderRadius: 16, border: '1px solid #e2e8f0' }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: 36, fontWeight: 800, color: '#06b6d4', opacity: 0.5 }}>
                  {it.number}
                </div>
                {it.image && <ImgFallback src={it.image} alt={it.title} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 10, marginBottom: 16 }} />}
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>{it.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 12px' }}>{it.subtitle}</p>
                <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, margin: 0, marginBottom: 16 }}>{it.description}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 16 }}>
                  {(it.features || []).filter(Boolean).map((f, fi) => (
                    <li key={fi} style={{ fontSize: 13, color: '#475569', padding: '4px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#06b6d4', fontSize: 14 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div style={{ paddingTop: 14, borderTop: '1px solid #e2e8f0' }}>
                  {it.pricingAmount ? (
                    <>
                      <span style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>{it.pricingAmount}</span>
                      {it.pricingDelivery && <span style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>en {it.pricingDelivery}</span>}
                    </>
                  ) : (
                    <span style={{ fontSize: 13, color: '#64748b', fontStyle: 'italic' }}>{it.pricingFallback}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="methode" style={sectionStyle('#f8fafc')}>
        <div style={containerStyle}>
          <SectionHeading eyebrow={proc.eyebrow} title={proc.title} />
          <div style={{ marginTop: 48, display: 'grid', gap: 20 }}>
            {(proc.steps || []).map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, padding: '18px 22px', background: 'white', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#06b6d4', minWidth: 70 }}>{s.number}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: 0, marginBottom: 4 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: '#475569', margin: 0, marginBottom: 6 }}>{s.description}</p>
                  <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, fontStyle: 'italic' }}>{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="projets" style={sectionStyle('#ffffff')}>
        <div style={containerStyle}>
          <SectionHeading eyebrow={portfolio.eyebrow} title={portfolio.title} hint={portfolio.hint} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginTop: 48 }}>
            {(portfolio.projects || []).map((p, i) => (
              <article key={i} style={{ background: '#0f172a', color: 'white', borderRadius: 14, overflow: 'hidden' }}>
                {p.image && <ImgFallback src={p.image} alt={p.title} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover' }} />}
                <div style={{ padding: 18 }}>
                  <p style={{ fontSize: 10, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: 1, margin: 0, marginBottom: 6 }}>{p.category}</p>
                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: '#94a3b8', margin: 0, marginBottom: 12 }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(p.tags || []).map((t, ti) => (
                      <span key={ti} style={{ fontSize: 10, padding: '3px 9px', background: 'rgba(6,182,212,0.15)', color: '#22d3ee', borderRadius: 4 }}>{t}</span>
                    ))}
                  </div>
                  {(p.features && p.features.length > 0) && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(148, 163, 184, 0.2)' }}>
                      {p.featuresTitle && <p style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, margin: 0, marginBottom: 8 }}>{p.featuresTitle}</p>}
                      {p.features.map((f, fi) => (
                        <div key={fi} style={{ fontSize: 12, color: '#cbd5e1', margin: '4px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span>{f.icon}</span> {f.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="temoignages" style={sectionStyle('#f8fafc')}>
        <div style={containerStyle}>
          <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} />
          {/* Trustbox widget */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 24, marginBottom: 36 }}>
            <div style={{ background: 'white', padding: '12px 20px', borderRadius: 10, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 14 }}>
              <strong style={{ fontSize: 26, color: '#0f172a' }}>{testimonials.trustScore.toFixed(1)}</strong>
              <div>
                <div style={{ fontSize: 14, color: '#22c55e' }}>{'★'.repeat(Math.round(testimonials.trustScore))}{'☆'.repeat(5 - Math.round(testimonials.trustScore))}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>{testimonials.trustReviewCount} avis Trustpilot</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
            {(testimonials.items || []).map((t, i) => (
              <blockquote key={i} style={{ margin: 0, padding: 22, background: 'white', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#fbbf24', fontSize: 14, marginBottom: 10 }}>
                  {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                </div>
                <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, margin: 0, marginBottom: 12, fontStyle: 'italic' }}>
                  « {t.quote} »
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{t.role}</div>
                  </div>
                  {t.verified && <span style={{ fontSize: 10, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 3 }}>✓ Vérifié</span>}
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="a-propos" style={sectionStyle('#ffffff')}>
        <div style={containerStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: about.profileImage ? '1fr 1fr' : '1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <p style={eyebrowStyle}>{about.eyebrow}</p>
              <h2 style={{ fontSize: 40, fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.1 }}>
                {about.titleLine1}<br />
                <span style={{ color: '#06b6d4' }}>{about.titleLine2}</span>
              </h2>
              <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, margin: '24px 0', fontWeight: 500 }}>
                {about.lead}
              </p>
              {(about.paragraphs || []).map((p, i) => (
                <p key={i} style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, margin: '0 0 12px' }}>{p}</p>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${(about.stats || []).length || 1}, 1fr)`, gap: 16, marginTop: 28, paddingTop: 24, borderTop: '1px solid #e2e8f0' }}>
                {(about.stats || []).map((s, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 32, fontWeight: 800, color: '#06b6d4' }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {about.profileImage && (
              <ImgFallback src={about.profileImage} alt="Jeason" style={{ width: '100%', height: 'auto', borderRadius: 14, aspectRatio: '4/5', objectFit: 'cover' }} />
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={sectionStyle('#f8fafc')}>
        <div style={{ ...containerStyle, maxWidth: 760 }}>
          <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />
          <div style={{ display: 'grid', gap: 10, marginTop: 36 }}>
            {(faq.items || []).map((it, i) => (
              <details key={i} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
                <summary style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', cursor: 'pointer', listStyle: 'none' }}>
                  + {it.question}
                </summary>
                <div
                  style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, margin: '14px 0 0' }}
                  dangerouslySetInnerHTML={{ __html: it.answer }}
                />
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={sectionStyle('#ffffff')}>
        <div style={containerStyle}>
          <SectionHeading eyebrow={contact.eyebrow} title={contact.title} subtitle={contact.subtitle} />
          <div style={{ display: 'grid', gridTemplateColumns: contact.image ? '1fr 1fr' : '1fr', gap: 36, marginTop: 36, alignItems: 'start' }}>
            <form style={{ padding: 24, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }} onSubmit={(e) => e.preventDefault()}>
              <FormGroup label={contact.formLabels.projectType}>
                <select style={inputStyle}>
                  {(contact.projectTypes || []).map((t, i) => (
                    <option key={i} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label={contact.formLabels.fullName}>
                <input type="text" style={inputStyle} />
              </FormGroup>
              <FormGroup label={contact.formLabels.email}>
                <input type="email" style={inputStyle} />
              </FormGroup>
              <FormGroup label={contact.formLabels.phone}>
                <input type="tel" style={inputStyle} />
              </FormGroup>
              <FormGroup label={contact.formLabels.message}>
                <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
              </FormGroup>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569', marginBottom: 16 }}>
                <input type="checkbox" /> {contact.formLabels.callback}
              </label>
              <button style={{ width: '100%', padding: 14, background: '#06b6d4', color: 'white', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                {contact.formLabels.submit}
              </button>
            </form>
            {contact.image && (
              <ImgFallback src={contact.image} alt="" style={{ width: '100%', height: '100%', minHeight: 400, objectFit: 'cover', borderRadius: 12 }} />
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '50px 24px 24px' }}>
        <div style={containerStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, marginBottom: 32 }}>
            <div>
              {g.brand.logoUrl && <ImgFallback src={g.brand.logoUrl} alt="logo" style={{ height: 36, width: 'auto', marginBottom: 12, filter: 'brightness(0) invert(1)' }} />}
              <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>{g.brand.tagline}</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 1, margin: 0, marginBottom: 10 }}>Contact</p>
              {g.contact.email && <p style={{ fontSize: 13, color: '#cbd5e1', margin: '0 0 4px' }}>{g.contact.email}</p>}
              {g.contact.phone && <p style={{ fontSize: 13, color: '#cbd5e1', margin: '0 0 4px' }}>{g.contact.phone}</p>}
              {g.contact.city && <p style={{ fontSize: 13, color: '#cbd5e1', margin: 0 }}>{g.contact.city}</p>}
            </div>
            <div>
              <p style={{ fontSize: 11, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 1, margin: 0, marginBottom: 10 }}>Suivez-nous</p>
              {(g.social || []).map((s, i) => (
                <a key={i} href={s.href} style={{ display: 'block', fontSize: 13, color: '#cbd5e1', textDecoration: 'none', marginBottom: 4 }}>{s.label}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.2)', paddingTop: 18, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ fontSize: 11, color: '#94a3b8' }}>© {new Date().getFullYear()} {g.copyrightName}</span>
            <div style={{ display: 'flex', gap: 18 }}>
              {(g.legal || []).map((l, i) => (
                <a key={i} href={l.href} style={{ fontSize: 11, color: '#94a3b8', textDecoration: 'none' }}>{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────

function SectionHeading({ eyebrow, title, subtitle, hint }: { eyebrow?: string; title?: string; subtitle?: string; hint?: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      {eyebrow && <p style={eyebrowStyle}>{eyebrow}</p>}
      {title && <h2 style={{ fontSize: 40, fontWeight: 700, color: '#0f172a', margin: 0 }}>{title}</h2>}
      {subtitle && <p style={{ fontSize: 17, color: '#64748b', margin: '10px 0 0' }}>{subtitle}</p>}
      {hint && <p style={{ fontSize: 12, color: '#94a3b8', margin: '10px 0 0', fontStyle: 'italic' }}>{hint}</p>}
    </div>
  );
}

function FormGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  );
}

// Image avec fallback "image manquante" si l'URL ne charge pas
function ImgFallback({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      style={style}
      onError={(e) => {
        const t = e.currentTarget;
        t.style.display = 'flex';
        t.style.alignItems = 'center';
        t.style.justifyContent = 'center';
        t.style.background = '#e2e8f0';
        t.style.color = '#94a3b8';
        t.style.fontSize = '11px';
        t.replaceWith(Object.assign(document.createElement('div'), {
          textContent: `📷 ${alt || 'Image manquante'} (${src.slice(0, 40)}…)`,
          style: `display:flex;align-items:center;justify-content:center;background:#e2e8f0;color:#94a3b8;font-size:11px;${Object.entries(style || {}).map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}:${typeof v === 'number' ? v + 'px' : v}`).join(';')}`,
        }));
      }}
    />
  );
}

// ─── Styles ──────────────────────────────────────────────────────────

const pageStyle: React.CSSProperties = {
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  background: '#ffffff',
  color: '#0f172a',
  lineHeight: 1.5,
};
const containerStyle: React.CSSProperties = { maxWidth: 1180, margin: '0 auto' };
const headerStyle: React.CSSProperties = { padding: '20px 24px', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', zIndex: 10 };
const sectionStyle = (bg: string): React.CSSProperties => ({ padding: '80px 24px', background: bg });
const eyebrowStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: 1.5, margin: 0, marginBottom: 12 };
const ctaPrimaryStyle: React.CSSProperties = { display: 'inline-block', padding: '14px 28px', background: '#06b6d4', color: 'white', fontWeight: 600, textDecoration: 'none', fontSize: 15, borderRadius: 10 };
const ctaSecondaryStyle: React.CSSProperties = { display: 'inline-block', padding: '14px 28px', background: 'transparent', color: 'white', fontWeight: 600, textDecoration: 'none', fontSize: 15, borderRadius: 10, border: '1px solid rgba(255,255,255,0.3)' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 14, background: 'white', color: '#0f172a', fontFamily: 'inherit', boxSizing: 'border-box' };
