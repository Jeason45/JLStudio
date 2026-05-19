'use client';

import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import type { SectionType } from './sectionTypes';

// ─── Types des content payload (cohérents avec sectionTypes.ts) ─────────

interface CtaLink { label?: string; href?: string }
interface ServiceItem { title?: string; description?: string; icon?: string; href?: string }
interface PricingPlan {
  name?: string; price?: string; period?: string; description?: string;
  features?: string[]; highlighted?: boolean; cta?: CtaLink;
}
interface TestimonialItem { quote?: string; author?: string; role?: string; avatarUrl?: string }
interface GalleryItem { url?: string; alt?: string; caption?: string }
interface FaqItem { question?: string; answer?: string }

interface EditorProps<T> {
  content: T;
  onChange: (newContent: T) => void;
}

// ─── Style helpers ──────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 12px',
  border: '1px solid var(--agency-border)', borderRadius: 8,
  fontSize: 13, outline: 'none',
  background: 'var(--agency-surface-2)', color: 'var(--agency-ink-1)',
  fontFamily: 'inherit',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 600,
  color: 'var(--agency-ink-2)', marginBottom: 6,
  letterSpacing: 0.2, textTransform: 'uppercase' as const,
};
const fieldGroup: React.CSSProperties = { marginBottom: 12 };
const itemCardStyle: React.CSSProperties = {
  padding: 12, background: 'var(--agency-surface-2)',
  border: '1px solid var(--agency-border)', borderRadius: 8,
  marginBottom: 8,
};
const cardHeaderStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  marginBottom: 10,
};
const iconBtn: React.CSSProperties = {
  width: 26, height: 26, borderRadius: 6,
  border: '1px solid var(--agency-border)',
  background: 'var(--agency-surface-3)',
  color: 'var(--agency-ink-2)',
  cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
};

// ─── Composants réutilisables ────────────────────────────────────────────

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={fieldGroup}>
      <label style={labelStyle}>{label}</label>
      {children}
      {hint && <p style={{ fontSize: 10, color: 'var(--agency-ink-4)', margin: '4px 0 0' }}>{hint}</p>}
    </div>
  );
}

function ItemActions({ index, count, onMoveUp, onMoveDown, onRemove }: {
  index: number; count: number;
  onMoveUp: () => void; onMoveDown: () => void; onRemove: () => void;
}) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      <button type="button" onClick={onMoveUp} disabled={index === 0} style={iconBtn} title="Monter">
        <ChevronUp size={13} />
      </button>
      <button type="button" onClick={onMoveDown} disabled={index === count - 1} style={iconBtn} title="Descendre">
        <ChevronDown size={13} />
      </button>
      <button type="button" onClick={onRemove} style={{ ...iconBtn, color: '#ef4444' }} title="Supprimer">
        <Trash2 size={13} />
      </button>
    </div>
  );
}

function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%', padding: '10px 14px', borderRadius: 8,
        border: '1px dashed var(--agency-border-strong)',
        background: 'transparent', color: 'var(--agency-ink-2)',
        cursor: 'pointer', fontSize: 12, fontWeight: 500,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      }}
    >
      <Plus size={13} /> {label}
    </button>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────

interface HeroContent {
  eyebrow?: string; title?: string; subtitle?: string;
  imageUrl?: string; align?: 'left' | 'center';
  ctaPrimary?: CtaLink; ctaSecondary?: CtaLink;
}

export function HeroEditor({ content, onChange }: EditorProps<HeroContent>) {
  const set = (patch: Partial<HeroContent>) => onChange({ ...content, ...patch });
  return (
    <>
      <Field label="Eyebrow (petite ligne au-dessus du titre)">
        <input type="text" value={content.eyebrow || ''} onChange={(e) => set({ eyebrow: e.target.value })} placeholder="Ex. Nouveau" style={inputStyle} />
      </Field>
      <Field label="Titre principal">
        <input type="text" value={content.title || ''} onChange={(e) => set({ title: e.target.value })} style={inputStyle} />
      </Field>
      <Field label="Sous-titre / accroche">
        <textarea value={content.subtitle || ''} onChange={(e) => set({ subtitle: e.target.value })} rows={2} style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} />
      </Field>
      <Field label="URL de l'image de fond (optionnel)">
        <input type="url" value={content.imageUrl || ''} onChange={(e) => set({ imageUrl: e.target.value })} placeholder="https://…/hero.jpg" style={inputStyle} />
      </Field>
      <Field label="Alignement du texte">
        <select value={content.align || 'left'} onChange={(e) => set({ align: e.target.value as 'left' | 'center' })} style={inputStyle}>
          <option value="left">Gauche</option>
          <option value="center">Centré</option>
        </select>
      </Field>
      <Field label="Bouton principal (CTA)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input type="text" value={content.ctaPrimary?.label || ''} onChange={(e) => set({ ctaPrimary: { ...content.ctaPrimary, label: e.target.value } })} placeholder="Texte du bouton" style={inputStyle} />
          <input type="text" value={content.ctaPrimary?.href || ''} onChange={(e) => set({ ctaPrimary: { ...content.ctaPrimary, href: e.target.value } })} placeholder="Lien (#contact ou URL)" style={inputStyle} />
        </div>
      </Field>
      <Field label="Bouton secondaire (optionnel)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input type="text" value={content.ctaSecondary?.label || ''} onChange={(e) => set({ ctaSecondary: { ...content.ctaSecondary, label: e.target.value } })} placeholder="Texte (laisse vide pour cacher)" style={inputStyle} />
          <input type="text" value={content.ctaSecondary?.href || ''} onChange={(e) => set({ ctaSecondary: { ...content.ctaSecondary, href: e.target.value } })} placeholder="Lien" style={inputStyle} />
        </div>
      </Field>
    </>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────

interface AboutContent {
  eyebrow?: string; title?: string; body?: string;
  imageUrl?: string; imagePosition?: 'left' | 'right';
}

export function AboutEditor({ content, onChange }: EditorProps<AboutContent>) {
  const set = (patch: Partial<AboutContent>) => onChange({ ...content, ...patch });
  return (
    <>
      <Field label="Eyebrow"><input type="text" value={content.eyebrow || ''} onChange={(e) => set({ eyebrow: e.target.value })} style={inputStyle} /></Field>
      <Field label="Titre"><input type="text" value={content.title || ''} onChange={(e) => set({ title: e.target.value })} style={inputStyle} /></Field>
      <Field label="Texte" hint="Supports les sauts de ligne. Markdown simple à venir.">
        <textarea value={content.body || ''} onChange={(e) => set({ body: e.target.value })} rows={6} style={{ ...inputStyle, resize: 'vertical', minHeight: 130 }} />
      </Field>
      <Field label="URL image (optionnel)">
        <input type="url" value={content.imageUrl || ''} onChange={(e) => set({ imageUrl: e.target.value })} placeholder="https://…" style={inputStyle} />
      </Field>
      <Field label="Position de l'image">
        <select value={content.imagePosition || 'right'} onChange={(e) => set({ imagePosition: e.target.value as 'left' | 'right' })} style={inputStyle}>
          <option value="right">À droite du texte</option>
          <option value="left">À gauche du texte</option>
        </select>
      </Field>
    </>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────

interface ServicesContent {
  eyebrow?: string; title?: string; subtitle?: string;
  items?: ServiceItem[]; columns?: 2 | 3 | 4;
}

export function ServicesEditor({ content, onChange }: EditorProps<ServicesContent>) {
  const items: ServiceItem[] = content.items || [];
  const set = (patch: Partial<ServicesContent>) => onChange({ ...content, ...patch });
  const updateItem = (i: number, patch: Partial<ServiceItem>) =>
    set({ items: items.map((it, idx) => idx === i ? { ...it, ...patch } : it) });
  const move = (i: number, dir: -1 | 1) => {
    const next = [...items];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    set({ items: next });
  };
  const remove = (i: number) => set({ items: items.filter((_, idx) => idx !== i) });
  const add = () => set({ items: [...items, { title: 'Nouveau service', description: '', icon: '✨', href: '' }] });

  return (
    <>
      <Field label="Eyebrow"><input type="text" value={content.eyebrow || ''} onChange={(e) => set({ eyebrow: e.target.value })} style={inputStyle} /></Field>
      <Field label="Titre"><input type="text" value={content.title || ''} onChange={(e) => set({ title: e.target.value })} style={inputStyle} /></Field>
      <Field label="Sous-titre"><input type="text" value={content.subtitle || ''} onChange={(e) => set({ subtitle: e.target.value })} style={inputStyle} /></Field>
      <Field label="Nombre de colonnes">
        <select value={content.columns || 3} onChange={(e) => set({ columns: parseInt(e.target.value, 10) as 2 | 3 | 4 })} style={inputStyle}>
          <option value={2}>2 colonnes</option>
          <option value={3}>3 colonnes</option>
          <option value={4}>4 colonnes</option>
        </select>
      </Field>

      <label style={{ ...labelStyle, marginTop: 16 }}>Services ({items.length})</label>
      {items.map((it, i) => (
        <div key={i} style={itemCardStyle}>
          <div style={cardHeaderStyle}>
            <span style={{ fontSize: 11, color: 'var(--agency-ink-3)', fontWeight: 600 }}>Service #{i + 1}</span>
            <ItemActions index={i} count={items.length} onMoveUp={() => move(i, -1)} onMoveDown={() => move(i, 1)} onRemove={() => remove(i)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 8, marginBottom: 8 }}>
            <input type="text" value={it.icon || ''} onChange={(e) => updateItem(i, { icon: e.target.value })} placeholder="🛠️" style={{ ...inputStyle, textAlign: 'center', fontSize: 18 }} />
            <input type="text" value={it.title || ''} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="Titre du service" style={inputStyle} />
          </div>
          <textarea value={it.description || ''} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Description courte (2-3 phrases)" rows={2} style={{ ...inputStyle, resize: 'vertical', minHeight: 50, marginBottom: 6 }} />
          <input type="text" value={it.href || ''} onChange={(e) => updateItem(i, { href: e.target.value })} placeholder="Lien (optionnel)" style={inputStyle} />
        </div>
      ))}
      <AddBtn onClick={add} label="Ajouter un service" />
    </>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────

interface PricingContent {
  eyebrow?: string; title?: string; subtitle?: string;
  plans?: PricingPlan[];
}

export function PricingEditor({ content, onChange }: EditorProps<PricingContent>) {
  const plans: PricingPlan[] = content.plans || [];
  const set = (patch: Partial<PricingContent>) => onChange({ ...content, ...patch });
  const updatePlan = (i: number, patch: Partial<PricingPlan>) =>
    set({ plans: plans.map((p, idx) => idx === i ? { ...p, ...patch } : p) });
  const move = (i: number, dir: -1 | 1) => {
    const next = [...plans];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    set({ plans: next });
  };
  const remove = (i: number) => set({ plans: plans.filter((_, idx) => idx !== i) });
  const add = () => set({
    plans: [...plans, {
      name: 'Nouvelle formule', price: '', period: '', description: '',
      features: [''], highlighted: false, cta: { label: 'Choisir', href: '#contact' },
    }],
  });

  return (
    <>
      <Field label="Eyebrow"><input type="text" value={content.eyebrow || ''} onChange={(e) => set({ eyebrow: e.target.value })} style={inputStyle} /></Field>
      <Field label="Titre"><input type="text" value={content.title || ''} onChange={(e) => set({ title: e.target.value })} style={inputStyle} /></Field>
      <Field label="Sous-titre"><input type="text" value={content.subtitle || ''} onChange={(e) => set({ subtitle: e.target.value })} style={inputStyle} /></Field>

      <label style={{ ...labelStyle, marginTop: 16 }}>Formules ({plans.length})</label>
      {plans.map((p, i) => (
        <div key={i} style={itemCardStyle}>
          <div style={cardHeaderStyle}>
            <span style={{ fontSize: 11, color: 'var(--agency-ink-3)', fontWeight: 600 }}>Formule #{i + 1}</span>
            <ItemActions index={i} count={plans.length} onMoveUp={() => move(i, -1)} onMoveDown={() => move(i, 1)} onRemove={() => remove(i)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 6 }}>
            <input type="text" value={p.name || ''} onChange={(e) => updatePlan(i, { name: e.target.value })} placeholder="Nom (ex. Premium)" style={inputStyle} />
            <input type="text" value={p.price || ''} onChange={(e) => updatePlan(i, { price: e.target.value })} placeholder="Prix (ex. 49€)" style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 6 }}>
            <input type="text" value={p.period || ''} onChange={(e) => updatePlan(i, { period: e.target.value })} placeholder="Période (ex. /mois)" style={inputStyle} />
            <input type="text" value={p.description || ''} onChange={(e) => updatePlan(i, { description: e.target.value })} placeholder="Description courte" style={inputStyle} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--agency-ink-2)', marginBottom: 6 }}>
            <input type="checkbox" checked={!!p.highlighted} onChange={(e) => updatePlan(i, { highlighted: e.target.checked })} style={{ accentColor: '#06b6d4' }} />
            Mettre en avant (carte la plus visible)
          </label>
          <textarea
            value={(p.features || []).join('\n')}
            onChange={(e) => updatePlan(i, { features: e.target.value.split('\n').filter(Boolean) })}
            rows={4}
            placeholder="Une fonctionnalité par ligne&#10;Hébergement inclus&#10;Support 7/7"
            style={{ ...inputStyle, resize: 'vertical', minHeight: 80, marginBottom: 6 }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <input type="text" value={p.cta?.label || ''} onChange={(e) => updatePlan(i, { cta: { ...p.cta, label: e.target.value } })} placeholder="Texte du bouton" style={inputStyle} />
            <input type="text" value={p.cta?.href || ''} onChange={(e) => updatePlan(i, { cta: { ...p.cta, href: e.target.value } })} placeholder="Lien" style={inputStyle} />
          </div>
        </div>
      ))}
      <AddBtn onClick={add} label="Ajouter une formule" />
    </>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────────────────

interface TestimonialsContent {
  eyebrow?: string; title?: string;
  items?: TestimonialItem[];
}

export function TestimonialsEditor({ content, onChange }: EditorProps<TestimonialsContent>) {
  const items = content.items || [];
  const set = (patch: Partial<TestimonialsContent>) => onChange({ ...content, ...patch });
  const updateItem = (i: number, patch: Partial<TestimonialItem>) =>
    set({ items: items.map((it, idx) => idx === i ? { ...it, ...patch } : it) });
  const move = (i: number, dir: -1 | 1) => {
    const next = [...items];
    const j = i + dir; if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    set({ items: next });
  };
  const remove = (i: number) => set({ items: items.filter((_, idx) => idx !== i) });
  const add = () => set({ items: [...items, { quote: '', author: '', role: '', avatarUrl: '' }] });

  return (
    <>
      <Field label="Eyebrow"><input type="text" value={content.eyebrow || ''} onChange={(e) => set({ eyebrow: e.target.value })} style={inputStyle} /></Field>
      <Field label="Titre"><input type="text" value={content.title || ''} onChange={(e) => set({ title: e.target.value })} style={inputStyle} /></Field>

      <label style={{ ...labelStyle, marginTop: 16 }}>Témoignages ({items.length})</label>
      {items.map((it, i) => (
        <div key={i} style={itemCardStyle}>
          <div style={cardHeaderStyle}>
            <span style={{ fontSize: 11, color: 'var(--agency-ink-3)', fontWeight: 600 }}>Témoignage #{i + 1}</span>
            <ItemActions index={i} count={items.length} onMoveUp={() => move(i, -1)} onMoveDown={() => move(i, 1)} onRemove={() => remove(i)} />
          </div>
          <textarea value={it.quote || ''} onChange={(e) => updateItem(i, { quote: e.target.value })} placeholder="« Citation du client »" rows={3} style={{ ...inputStyle, resize: 'vertical', minHeight: 70, marginBottom: 6 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 6 }}>
            <input type="text" value={it.author || ''} onChange={(e) => updateItem(i, { author: e.target.value })} placeholder="Nom (ex. Marie Dupont)" style={inputStyle} />
            <input type="text" value={it.role || ''} onChange={(e) => updateItem(i, { role: e.target.value })} placeholder="Rôle (ex. Cliente / CEO X)" style={inputStyle} />
          </div>
          <input type="url" value={it.avatarUrl || ''} onChange={(e) => updateItem(i, { avatarUrl: e.target.value })} placeholder="URL avatar (optionnel)" style={inputStyle} />
        </div>
      ))}
      <AddBtn onClick={add} label="Ajouter un témoignage" />
    </>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────────────

interface GalleryContent {
  eyebrow?: string; title?: string; subtitle?: string;
  images?: GalleryItem[]; columns?: 2 | 3 | 4;
}

export function GalleryEditor({ content, onChange }: EditorProps<GalleryContent>) {
  const images = content.images || [];
  const set = (patch: Partial<GalleryContent>) => onChange({ ...content, ...patch });
  const updateImage = (i: number, patch: Partial<GalleryItem>) =>
    set({ images: images.map((im, idx) => idx === i ? { ...im, ...patch } : im) });
  const move = (i: number, dir: -1 | 1) => {
    const next = [...images];
    const j = i + dir; if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    set({ images: next });
  };
  const remove = (i: number) => set({ images: images.filter((_, idx) => idx !== i) });
  const add = () => set({ images: [...images, { url: '', alt: '', caption: '' }] });

  return (
    <>
      <Field label="Eyebrow"><input type="text" value={content.eyebrow || ''} onChange={(e) => set({ eyebrow: e.target.value })} style={inputStyle} /></Field>
      <Field label="Titre"><input type="text" value={content.title || ''} onChange={(e) => set({ title: e.target.value })} style={inputStyle} /></Field>
      <Field label="Sous-titre"><input type="text" value={content.subtitle || ''} onChange={(e) => set({ subtitle: e.target.value })} style={inputStyle} /></Field>
      <Field label="Nombre de colonnes">
        <select value={content.columns || 3} onChange={(e) => set({ columns: parseInt(e.target.value, 10) as 2 | 3 | 4 })} style={inputStyle}>
          <option value={2}>2 colonnes</option>
          <option value={3}>3 colonnes</option>
          <option value={4}>4 colonnes</option>
        </select>
      </Field>

      <label style={{ ...labelStyle, marginTop: 16 }}>Images ({images.length})</label>
      {images.map((im, i) => (
        <div key={i} style={itemCardStyle}>
          <div style={cardHeaderStyle}>
            <span style={{ fontSize: 11, color: 'var(--agency-ink-3)', fontWeight: 600 }}>Image #{i + 1}</span>
            <ItemActions index={i} count={images.length} onMoveUp={() => move(i, -1)} onMoveDown={() => move(i, 1)} onRemove={() => remove(i)} />
          </div>
          {im.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={im.url} alt={im.alt || ''} style={{ width: '100%', maxHeight: 120, objectFit: 'cover', borderRadius: 6, marginBottom: 6 }} />
          )}
          <input type="url" value={im.url || ''} onChange={(e) => updateImage(i, { url: e.target.value })} placeholder="https://…/image.jpg" style={{ ...inputStyle, marginBottom: 6 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <input type="text" value={im.alt || ''} onChange={(e) => updateImage(i, { alt: e.target.value })} placeholder="Texte alternatif (a11y)" style={inputStyle} />
            <input type="text" value={im.caption || ''} onChange={(e) => updateImage(i, { caption: e.target.value })} placeholder="Légende (optionnel)" style={inputStyle} />
          </div>
        </div>
      ))}
      <AddBtn onClick={add} label="Ajouter une image" />
    </>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────

interface FaqContent {
  eyebrow?: string; title?: string;
  items?: FaqItem[];
}

export function FaqEditor({ content, onChange }: EditorProps<FaqContent>) {
  const items = content.items || [];
  const set = (patch: Partial<FaqContent>) => onChange({ ...content, ...patch });
  const updateItem = (i: number, patch: Partial<FaqItem>) =>
    set({ items: items.map((it, idx) => idx === i ? { ...it, ...patch } : it) });
  const move = (i: number, dir: -1 | 1) => {
    const next = [...items];
    const j = i + dir; if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    set({ items: next });
  };
  const remove = (i: number) => set({ items: items.filter((_, idx) => idx !== i) });
  const add = () => set({ items: [...items, { question: '', answer: '' }] });

  return (
    <>
      <Field label="Eyebrow"><input type="text" value={content.eyebrow || ''} onChange={(e) => set({ eyebrow: e.target.value })} style={inputStyle} /></Field>
      <Field label="Titre"><input type="text" value={content.title || ''} onChange={(e) => set({ title: e.target.value })} style={inputStyle} /></Field>

      <label style={{ ...labelStyle, marginTop: 16 }}>Questions ({items.length})</label>
      {items.map((it, i) => (
        <div key={i} style={itemCardStyle}>
          <div style={cardHeaderStyle}>
            <span style={{ fontSize: 11, color: 'var(--agency-ink-3)', fontWeight: 600 }}>Q&A #{i + 1}</span>
            <ItemActions index={i} count={items.length} onMoveUp={() => move(i, -1)} onMoveDown={() => move(i, 1)} onRemove={() => remove(i)} />
          </div>
          <input type="text" value={it.question || ''} onChange={(e) => updateItem(i, { question: e.target.value })} placeholder="Question…" style={{ ...inputStyle, marginBottom: 6, fontWeight: 600 }} />
          <textarea value={it.answer || ''} onChange={(e) => updateItem(i, { answer: e.target.value })} placeholder="Réponse…" rows={3} style={{ ...inputStyle, resize: 'vertical', minHeight: 70 }} />
        </div>
      ))}
      <AddBtn onClick={add} label="Ajouter une question" />
    </>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────

interface ContactContent {
  eyebrow?: string; title?: string; subtitle?: string;
  showForm?: boolean; showCoordinates?: boolean;
  mapEmbedUrl?: string;
}

export function ContactEditor({ content, onChange }: EditorProps<ContactContent>) {
  const set = (patch: Partial<ContactContent>) => onChange({ ...content, ...patch });
  return (
    <>
      <Field label="Eyebrow"><input type="text" value={content.eyebrow || ''} onChange={(e) => set({ eyebrow: e.target.value })} style={inputStyle} /></Field>
      <Field label="Titre"><input type="text" value={content.title || ''} onChange={(e) => set({ title: e.target.value })} style={inputStyle} /></Field>
      <Field label="Sous-titre"><input type="text" value={content.subtitle || ''} onChange={(e) => set({ subtitle: e.target.value })} style={inputStyle} /></Field>
      <Field label="URL Google Maps embed (optionnel)" hint="Va sur Google Maps → Partager → Intégrer une carte → copie l'URL src de l'iframe">
        <input type="url" value={content.mapEmbedUrl || ''} onChange={(e) => set({ mapEmbedUrl: e.target.value })} placeholder="https://www.google.com/maps/embed?…" style={inputStyle} />
      </Field>
      <Field label="Affichage">
        <div style={{ display: 'grid', gap: 6 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--agency-ink-2)' }}>
            <input type="checkbox" checked={content.showForm !== false} onChange={(e) => set({ showForm: e.target.checked })} style={{ accentColor: '#06b6d4' }} />
            Afficher le formulaire de contact
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--agency-ink-2)' }}>
            <input type="checkbox" checked={content.showCoordinates !== false} onChange={(e) => set({ showCoordinates: e.target.checked })} style={{ accentColor: '#06b6d4' }} />
            Afficher les coordonnées (depuis Paramètres du site)
          </label>
        </div>
      </Field>
    </>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────

interface CtaContent {
  title?: string; subtitle?: string;
  ctaLabel?: string; ctaHref?: string;
  backgroundColor?: string;
}

export function CtaEditor({ content, onChange }: EditorProps<CtaContent>) {
  const set = (patch: Partial<CtaContent>) => onChange({ ...content, ...patch });
  return (
    <>
      <Field label="Titre">
        <input type="text" value={content.title || ''} onChange={(e) => set({ title: e.target.value })} placeholder="Prêt à démarrer ?" style={inputStyle} />
      </Field>
      <Field label="Sous-titre">
        <textarea value={content.subtitle || ''} onChange={(e) => set({ subtitle: e.target.value })} rows={2} style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} />
      </Field>
      <Field label="Bouton">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input type="text" value={content.ctaLabel || ''} onChange={(e) => set({ ctaLabel: e.target.value })} placeholder="Texte" style={inputStyle} />
          <input type="text" value={content.ctaHref || ''} onChange={(e) => set({ ctaHref: e.target.value })} placeholder="Lien (#contact ou URL)" style={inputStyle} />
        </div>
      </Field>
      <Field label="Couleur de fond">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="color" value={content.backgroundColor || '#06b6d4'} onChange={(e) => set({ backgroundColor: e.target.value })} style={{ width: 44, height: 36, border: '1px solid var(--agency-border)', borderRadius: 6, background: 'transparent', cursor: 'pointer' }} />
          <input type="text" value={content.backgroundColor || ''} onChange={(e) => set({ backgroundColor: e.target.value })} placeholder="#06b6d4" style={{ ...inputStyle, fontFamily: 'ui-monospace, SFMono-Regular, monospace' }} />
        </div>
      </Field>
    </>
  );
}

// ─── Router : retourne l'éditeur correspondant au type ───────────────────

export function SectionEditor({ type, content, onChange }: {
  type: SectionType;
  content: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
}) {
  switch (type) {
    case 'HERO':         return <HeroEditor content={content as HeroContent} onChange={onChange as (c: HeroContent) => void} />;
    case 'ABOUT':        return <AboutEditor content={content as AboutContent} onChange={onChange as (c: AboutContent) => void} />;
    case 'SERVICES':     return <ServicesEditor content={content as ServicesContent} onChange={onChange as (c: ServicesContent) => void} />;
    case 'PRICING':      return <PricingEditor content={content as PricingContent} onChange={onChange as (c: PricingContent) => void} />;
    case 'TESTIMONIALS': return <TestimonialsEditor content={content as TestimonialsContent} onChange={onChange as (c: TestimonialsContent) => void} />;
    case 'GALLERY':      return <GalleryEditor content={content as GalleryContent} onChange={onChange as (c: GalleryContent) => void} />;
    case 'FAQ':          return <FaqEditor content={content as FaqContent} onChange={onChange as (c: FaqContent) => void} />;
    case 'CONTACT':      return <ContactEditor content={content as ContactContent} onChange={onChange as (c: ContactContent) => void} />;
    case 'CTA':          return <CtaEditor content={content as CtaContent} onChange={onChange as (c: CtaContent) => void} />;
    default:             return <p style={{ color: 'var(--agency-ink-3)' }}>Type de section non reconnu.</p>;
  }
}
