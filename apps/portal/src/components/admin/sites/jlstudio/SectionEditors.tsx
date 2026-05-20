'use client';

import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import ImagePicker from '../ImagePicker';
import type {
  HeroContent, ServiceItem, ProcessStep, PortfolioProject, PortfolioFeature,
  Testimonial, AboutContent, AboutStat, FaqItem, ContactContent, GlobalContent,
  CtaLink, NavLink, SocialLink, ContactProjectType,
  JlStudioContent,
} from './contentSchema';

// ─── Styles ──────────────────────────────────────────────────────────

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

// ─── Helpers de base ──────────────────────────────────────────────────

interface FieldProps { label: string; hint?: string; children: React.ReactNode }
function Field({ label, hint, children }: FieldProps) {
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

function moveItem<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const next = [...arr];
  const j = i + dir;
  if (j < 0 || j >= next.length) return arr;
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

// ─── 1. HERO ─────────────────────────────────────────────────────────

export function HeroEditor({ content, onChange }: { content: HeroContent; onChange: (c: HeroContent) => void }) {
  const set = (patch: Partial<HeroContent>) => onChange({ ...content, ...patch });
  const setCta = (key: 'ctaPrimary' | 'ctaSecondary', patch: Partial<CtaLink>) =>
    set({ [key]: { ...content[key], ...patch } as CtaLink });
  return (
    <>
      <Field label="Titre principal" hint="Ligne 1 du hero, mise en avant"><input type="text" value={content.title} onChange={(e) => set({ title: e.target.value })} style={inputStyle} /></Field>
      <Field label="Sous-titre" hint="Ligne 2 du hero"><input type="text" value={content.subtitle} onChange={(e) => set({ subtitle: e.target.value })} style={inputStyle} /></Field>
      <Field label="Description"><textarea value={content.description} onChange={(e) => set({ description: e.target.value })} rows={2} style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} /></Field>
      <Field label="Image de fond"><ImagePicker value={content.backgroundImage} onChange={(url) => set({ backgroundImage: url })} folder="hero" hint="16:9 paysage, idéal 1920×1080" /></Field>
      <Field label="Bouton principal (CTA)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input type="text" value={content.ctaPrimary.label} onChange={(e) => setCta('ctaPrimary', { label: e.target.value })} placeholder="Texte" style={inputStyle} />
          <input type="text" value={content.ctaPrimary.href} onChange={(e) => setCta('ctaPrimary', { href: e.target.value })} placeholder="Lien (#contact)" style={inputStyle} />
        </div>
      </Field>
      <Field label="Bouton secondaire (CTA)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input type="text" value={content.ctaSecondary.label} onChange={(e) => setCta('ctaSecondary', { label: e.target.value })} placeholder="Texte" style={inputStyle} />
          <input type="text" value={content.ctaSecondary.href} onChange={(e) => setCta('ctaSecondary', { href: e.target.value })} placeholder="Lien" style={inputStyle} />
        </div>
      </Field>
      <Field label="Libellé du scroll indicator"><input type="text" value={content.scrollLabel} onChange={(e) => set({ scrollLabel: e.target.value })} style={inputStyle} /></Field>
    </>
  );
}

// ─── 2. SERVICES ─────────────────────────────────────────────────────

export function ServicesEditor({ content, onChange }: { content: JlStudioContent['services']; onChange: (c: JlStudioContent['services']) => void }) {
  const set = (patch: Partial<JlStudioContent['services']>) => onChange({ ...content, ...patch });
  const items = content.items || [];
  const update = (i: number, patch: Partial<ServiceItem>) =>
    set({ items: items.map((it, idx) => idx === i ? { ...it, ...patch } : it) });
  const updateFeature = (i: number, fi: number, value: string) =>
    update(i, { features: (items[i].features || []).map((f, fidx) => fidx === fi ? value : f) });
  const remove = (i: number) => set({ items: items.filter((_, idx) => idx !== i) });
  const add = () => set({ items: [...items, { number: String(items.length + 1).padStart(2, '0'), title: 'Nouveau service', subtitle: '', description: '', features: ['', '', '', ''], image: '', pricingAmount: '', pricingDelivery: '', pricingFallback: '' }] });
  return (
    <>
      <Field label="Eyebrow (petite ligne)"><input type="text" value={content.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} style={inputStyle} /></Field>
      <Field label="Titre de la section"><input type="text" value={content.title} onChange={(e) => set({ title: e.target.value })} style={inputStyle} /></Field>
      <label style={{ ...labelStyle, marginTop: 16 }}>Services ({items.length})</label>
      {items.map((it, i) => (
        <div key={i} style={itemCardStyle}>
          <div style={cardHeaderStyle}>
            <span style={{ fontSize: 11, color: 'var(--agency-ink-3)', fontWeight: 600 }}>Service {it.number || `#${i + 1}`}</span>
            <ItemActions index={i} count={items.length} onMoveUp={() => set({ items: moveItem(items, i, -1) })} onMoveDown={() => set({ items: moveItem(items, i, 1) })} onRemove={() => remove(i)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 8, marginBottom: 6 }}>
            <input type="text" value={it.number} onChange={(e) => update(i, { number: e.target.value })} placeholder="01" style={{ ...inputStyle, textAlign: 'center' }} />
            <input type="text" value={it.title} onChange={(e) => update(i, { title: e.target.value })} placeholder="Titre" style={inputStyle} />
          </div>
          <input type="text" value={it.subtitle} onChange={(e) => update(i, { subtitle: e.target.value })} placeholder="Sous-titre court" style={{ ...inputStyle, marginBottom: 6 }} />
          <textarea value={it.description} onChange={(e) => update(i, { description: e.target.value })} placeholder="Description (2-3 phrases)" rows={2} style={{ ...inputStyle, resize: 'vertical', minHeight: 56, marginBottom: 6 }} />
          <label style={{ fontSize: 10, color: 'var(--agency-ink-3)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>4 features</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 4, marginBottom: 8 }}>
            {[0, 1, 2, 3].map((fi) => (
              <input
                key={fi} type="text"
                value={it.features?.[fi] || ''}
                onChange={(e) => updateFeature(i, fi, e.target.value)}
                placeholder={`Feature ${fi + 1}`}
                style={inputStyle}
              />
            ))}
          </div>
          <div style={{ marginBottom: 6 }}><ImagePicker value={it.image} onChange={(url) => update(i, { image: url })} folder="services" hint="paysage 16:10" /></div>
          <label style={{ fontSize: 10, color: 'var(--agency-ink-3)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>Tarification (laisser tarif vide pour utiliser le fallback)</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 4, marginBottom: 6 }}>
            <input type="text" value={it.pricingAmount} onChange={(e) => update(i, { pricingAmount: e.target.value })} placeholder="Ex. 1 500 €" style={inputStyle} />
            <input type="text" value={it.pricingDelivery} onChange={(e) => update(i, { pricingDelivery: e.target.value })} placeholder="Ex. 2 semaines" style={inputStyle} />
          </div>
          <input type="text" value={it.pricingFallback} onChange={(e) => update(i, { pricingFallback: e.target.value })} placeholder="Fallback (ex. Tarif et délais selon prestation)" style={inputStyle} />
        </div>
      ))}
      <AddBtn onClick={add} label="Ajouter un service" />
    </>
  );
}

// ─── 3. PROCESS ──────────────────────────────────────────────────────

export function ProcessEditor({ content, onChange }: { content: JlStudioContent['process']; onChange: (c: JlStudioContent['process']) => void }) {
  const set = (patch: Partial<JlStudioContent['process']>) => onChange({ ...content, ...patch });
  const steps = content.steps || [];
  const update = (i: number, patch: Partial<ProcessStep>) =>
    set({ steps: steps.map((s, idx) => idx === i ? { ...s, ...patch } : s) });
  const remove = (i: number) => set({ steps: steps.filter((_, idx) => idx !== i) });
  const add = () => set({ steps: [...steps, { number: String(steps.length + 1).padStart(2, '0'), title: 'Nouvelle étape', description: '', detail: '' }] });
  return (
    <>
      <Field label="Eyebrow"><input type="text" value={content.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} style={inputStyle} /></Field>
      <Field label="Titre de la section"><input type="text" value={content.title} onChange={(e) => set({ title: e.target.value })} style={inputStyle} /></Field>
      <label style={{ ...labelStyle, marginTop: 16 }}>Étapes ({steps.length})</label>
      {steps.map((s, i) => (
        <div key={i} style={itemCardStyle}>
          <div style={cardHeaderStyle}>
            <span style={{ fontSize: 11, color: 'var(--agency-ink-3)', fontWeight: 600 }}>Étape {s.number || `#${i + 1}`}</span>
            <ItemActions index={i} count={steps.length} onMoveUp={() => set({ steps: moveItem(steps, i, -1) })} onMoveDown={() => set({ steps: moveItem(steps, i, 1) })} onRemove={() => remove(i)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 8, marginBottom: 6 }}>
            <input type="text" value={s.number} onChange={(e) => update(i, { number: e.target.value })} placeholder="01" style={{ ...inputStyle, textAlign: 'center' }} />
            <input type="text" value={s.title} onChange={(e) => update(i, { title: e.target.value })} placeholder="Titre étape" style={inputStyle} />
          </div>
          <textarea value={s.description} onChange={(e) => update(i, { description: e.target.value })} placeholder="Description courte de l'étape" rows={2} style={{ ...inputStyle, resize: 'vertical', minHeight: 50, marginBottom: 6 }} />
          <input type="text" value={s.detail} onChange={(e) => update(i, { detail: e.target.value })} placeholder="Détail (technologies, livrables…)" style={inputStyle} />
        </div>
      ))}
      <AddBtn onClick={add} label="Ajouter une étape" />
    </>
  );
}

// ─── 4. PORTFOLIO ────────────────────────────────────────────────────

export function PortfolioEditor({ content, onChange }: { content: JlStudioContent['portfolio']; onChange: (c: JlStudioContent['portfolio']) => void }) {
  const set = (patch: Partial<JlStudioContent['portfolio']>) => onChange({ ...content, ...patch });
  const projects = content.projects || [];
  const update = (i: number, patch: Partial<PortfolioProject>) =>
    set({ projects: projects.map((p, idx) => idx === i ? { ...p, ...patch } : p) });
  const updateFeat = (i: number, fi: number, patch: Partial<PortfolioFeature>) =>
    update(i, { features: (projects[i].features || []).map((f, fidx) => fidx === fi ? { ...f, ...patch } : f) });
  const addFeat = (i: number) =>
    update(i, { features: [...(projects[i].features || []), { icon: '✨', label: '' }] });
  const removeFeat = (i: number, fi: number) =>
    update(i, { features: (projects[i].features || []).filter((_, fidx) => fidx !== fi) });
  const remove = (i: number) => set({ projects: projects.filter((_, idx) => idx !== i) });
  const add = () => set({ projects: [...projects, { title: 'Nouveau projet', category: '', tags: [], image: '', description: '', featuresTitle: '', features: [], href: '' }] });
  return (
    <>
      <Field label="Eyebrow"><input type="text" value={content.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} style={inputStyle} /></Field>
      <Field label="Titre de la section"><input type="text" value={content.title} onChange={(e) => set({ title: e.target.value })} style={inputStyle} /></Field>
      <Field label="Hint (texte d'aide affiché sous le titre)"><input type="text" value={content.hint} onChange={(e) => set({ hint: e.target.value })} style={inputStyle} /></Field>
      <label style={{ ...labelStyle, marginTop: 16 }}>Projets ({projects.length})</label>
      {projects.map((p, i) => (
        <div key={i} style={itemCardStyle}>
          <div style={cardHeaderStyle}>
            <span style={{ fontSize: 11, color: 'var(--agency-ink-3)', fontWeight: 600 }}>Projet #{i + 1}</span>
            <ItemActions index={i} count={projects.length} onMoveUp={() => set({ projects: moveItem(projects, i, -1) })} onMoveDown={() => set({ projects: moveItem(projects, i, 1) })} onRemove={() => remove(i)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 6 }}>
            <input type="text" value={p.title} onChange={(e) => update(i, { title: e.target.value })} placeholder="Titre projet" style={inputStyle} />
            <input type="text" value={p.category} onChange={(e) => update(i, { category: e.target.value })} placeholder="Catégorie (ex. Site Vitrine)" style={inputStyle} />
          </div>
          <div style={{ marginBottom: 6 }}><ImagePicker value={p.image} onChange={(url) => update(i, { image: url })} folder="portfolio" hint="paysage 16:10" /></div>
          <input
            type="text"
            value={p.tags?.join(', ') || ''}
            onChange={(e) => update(i, { tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })}
            placeholder="Tags (séparés par virgules) — ex. Next.js, CRM, Stripe"
            style={{ ...inputStyle, marginBottom: 6 }}
          />
          <textarea value={p.description} onChange={(e) => update(i, { description: e.target.value })} placeholder="Description du projet" rows={2} style={{ ...inputStyle, resize: 'vertical', minHeight: 50, marginBottom: 6 }} />
          <input type="text" value={p.href} onChange={(e) => update(i, { href: e.target.value })} placeholder="URL externe du projet (optionnel)" style={{ ...inputStyle, marginBottom: 6 }} />
          <input type="text" value={p.featuresTitle} onChange={(e) => update(i, { featuresTitle: e.target.value })} placeholder="Titre du bloc features (optionnel, ex. Réalisations)" style={{ ...inputStyle, marginBottom: 6 }} />
          {(p.features || []).map((f, fi) => (
            <div key={fi} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 32px', gap: 6, marginBottom: 4 }}>
              <input type="text" value={f.icon} onChange={(e) => updateFeat(i, fi, { icon: e.target.value })} style={{ ...inputStyle, textAlign: 'center' }} />
              <input type="text" value={f.label} onChange={(e) => updateFeat(i, fi, { label: e.target.value })} placeholder="Label" style={inputStyle} />
              <button type="button" onClick={() => removeFeat(i, fi)} style={{ ...iconBtn, color: '#ef4444' }}><Trash2 size={11} /></button>
            </div>
          ))}
          <button type="button" onClick={() => addFeat(i)} style={{ fontSize: 11, color: 'var(--agency-ink-2)', background: 'transparent', border: 'none', cursor: 'pointer', marginTop: 4 }}>
            + Ajouter une feature
          </button>
        </div>
      ))}
      <AddBtn onClick={add} label="Ajouter un projet" />
    </>
  );
}

// ─── 5. TESTIMONIALS ─────────────────────────────────────────────────

export function TestimonialsEditor({ content, onChange }: { content: JlStudioContent['testimonials']; onChange: (c: JlStudioContent['testimonials']) => void }) {
  const set = (patch: Partial<JlStudioContent['testimonials']>) => onChange({ ...content, ...patch });
  const items = content.items || [];
  const update = (i: number, patch: Partial<Testimonial>) =>
    set({ items: items.map((it, idx) => idx === i ? { ...it, ...patch } : it) });
  const remove = (i: number) => set({ items: items.filter((_, idx) => idx !== i) });
  const add = () => set({ items: [...items, { name: '', role: '', quote: '', rating: 5, date: new Date().toISOString().slice(0, 10), verified: true }] });
  return (
    <>
      <Field label="Eyebrow"><input type="text" value={content.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} style={inputStyle} /></Field>
      <Field label="Titre de la section"><input type="text" value={content.title} onChange={(e) => set({ title: e.target.value })} style={inputStyle} /></Field>
      <Field label="Données Trustpilot (widget statique)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input type="number" step="0.1" min="0" max="5" value={content.trustScore} onChange={(e) => set({ trustScore: parseFloat(e.target.value) || 0 })} placeholder="Score (ex. 4.1)" style={inputStyle} />
          <input type="number" min="0" value={content.trustReviewCount} onChange={(e) => set({ trustReviewCount: parseInt(e.target.value, 10) || 0 })} placeholder="Nb avis" style={inputStyle} />
        </div>
      </Field>
      <Field label="URL Trustpilot"><input type="url" value={content.trustpilotUrl} onChange={(e) => set({ trustpilotUrl: e.target.value })} placeholder="https://fr.trustpilot.com/…" style={inputStyle} /></Field>
      <label style={{ ...labelStyle, marginTop: 16 }}>Témoignages ({items.length})</label>
      {items.map((t, i) => (
        <div key={i} style={itemCardStyle}>
          <div style={cardHeaderStyle}>
            <span style={{ fontSize: 11, color: 'var(--agency-ink-3)', fontWeight: 600 }}>Témoignage #{i + 1}</span>
            <ItemActions index={i} count={items.length} onMoveUp={() => set({ items: moveItem(items, i, -1) })} onMoveDown={() => set({ items: moveItem(items, i, 1) })} onRemove={() => remove(i)} />
          </div>
          <textarea value={t.quote} onChange={(e) => update(i, { quote: e.target.value })} placeholder="« Citation »" rows={3} style={{ ...inputStyle, resize: 'vertical', minHeight: 70, marginBottom: 6, fontStyle: 'italic' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 6 }}>
            <input type="text" value={t.name} onChange={(e) => update(i, { name: e.target.value })} placeholder="Nom client" style={inputStyle} />
            <input type="text" value={t.role} onChange={(e) => update(i, { role: e.target.value })} placeholder="Rôle / type projet" style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 130px 1fr', gap: 6, alignItems: 'center' }}>
            <select value={t.rating} onChange={(e) => update(i, { rating: parseInt(e.target.value, 10) })} style={inputStyle}>
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{'★'.repeat(n)}</option>)}
            </select>
            <input type="date" value={t.date} onChange={(e) => update(i, { date: e.target.value })} style={inputStyle} />
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--agency-ink-2)' }}>
              <input type="checkbox" checked={t.verified} onChange={(e) => update(i, { verified: e.target.checked })} style={{ accentColor: '#06b6d4' }} />
              Vérifié
            </label>
          </div>
        </div>
      ))}
      <AddBtn onClick={add} label="Ajouter un témoignage" />
    </>
  );
}

// ─── 6. ABOUT ────────────────────────────────────────────────────────

export function AboutEditor({ content, onChange }: { content: AboutContent; onChange: (c: AboutContent) => void }) {
  const set = (patch: Partial<AboutContent>) => onChange({ ...content, ...patch });
  const paras = content.paragraphs || [];
  const stats = content.stats || [];
  const updatePara = (i: number, v: string) => set({ paragraphs: paras.map((p, idx) => idx === i ? v : p) });
  const addPara = () => set({ paragraphs: [...paras, ''] });
  const removePara = (i: number) => set({ paragraphs: paras.filter((_, idx) => idx !== i) });
  const updateStat = (i: number, patch: Partial<AboutStat>) => set({ stats: stats.map((s, idx) => idx === i ? { ...s, ...patch } : s) });
  const addStat = () => set({ stats: [...stats, { value: '', label: '' }] });
  const removeStat = (i: number) => set({ stats: stats.filter((_, idx) => idx !== i) });
  return (
    <>
      <Field label="Eyebrow"><input type="text" value={content.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} style={inputStyle} /></Field>
      <Field label="Titre (ligne 1)"><input type="text" value={content.titleLine1} onChange={(e) => set({ titleLine1: e.target.value })} placeholder="Un studio," style={inputStyle} /></Field>
      <Field label="Titre (ligne 2 - accent)"><input type="text" value={content.titleLine2} onChange={(e) => set({ titleLine2: e.target.value })} placeholder="une seule personne" style={inputStyle} /></Field>
      <Field label="Phrase d'accroche (lead)"><textarea value={content.lead} onChange={(e) => set({ lead: e.target.value })} rows={2} style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} /></Field>
      <Field label="Photo de profil"><ImagePicker value={content.profileImage} onChange={(url) => set({ profileImage: url })} folder="about" hint="portrait 4:5" /></Field>

      <label style={{ ...labelStyle, marginTop: 16 }}>Paragraphes ({paras.length})</label>
      {paras.map((p, i) => (
        <div key={i} style={itemCardStyle}>
          <div style={cardHeaderStyle}>
            <span style={{ fontSize: 11, color: 'var(--agency-ink-3)', fontWeight: 600 }}>Paragraphe #{i + 1}</span>
            <ItemActions index={i} count={paras.length}
              onMoveUp={() => set({ paragraphs: moveItem(paras, i, -1) })}
              onMoveDown={() => set({ paragraphs: moveItem(paras, i, 1) })}
              onRemove={() => removePara(i)}
            />
          </div>
          <textarea value={p} onChange={(e) => updatePara(i, e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }} />
        </div>
      ))}
      <AddBtn onClick={addPara} label="Ajouter un paragraphe" />

      <label style={{ ...labelStyle, marginTop: 20 }}>Stats ({stats.length})</label>
      {stats.map((s, i) => (
        <div key={i} style={{ ...itemCardStyle, display: 'grid', gridTemplateColumns: '90px 1fr 70px', gap: 6, alignItems: 'center' }}>
          <input type="text" value={s.value} onChange={(e) => updateStat(i, { value: e.target.value })} placeholder="+10" style={{ ...inputStyle, textAlign: 'center', fontWeight: 700, fontSize: 16 }} />
          <input type="text" value={s.label} onChange={(e) => updateStat(i, { label: e.target.value })} placeholder="Projets livrés" style={inputStyle} />
          <button type="button" onClick={() => removeStat(i)} style={{ ...iconBtn, color: '#ef4444' }}><Trash2 size={12} /></button>
        </div>
      ))}
      <AddBtn onClick={addStat} label="Ajouter une stat" />
    </>
  );
}

// ─── 7. FAQ ──────────────────────────────────────────────────────────

export function FaqEditor({ content, onChange }: { content: JlStudioContent['faq']; onChange: (c: JlStudioContent['faq']) => void }) {
  const set = (patch: Partial<JlStudioContent['faq']>) => onChange({ ...content, ...patch });
  const items = content.items || [];
  const update = (i: number, patch: Partial<FaqItem>) =>
    set({ items: items.map((it, idx) => idx === i ? { ...it, ...patch } : it) });
  const remove = (i: number) => set({ items: items.filter((_, idx) => idx !== i) });
  const add = () => set({ items: [...items, { question: '', answer: '' }] });
  return (
    <>
      <Field label="Eyebrow"><input type="text" value={content.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} style={inputStyle} /></Field>
      <Field label="Titre de la section"><input type="text" value={content.title} onChange={(e) => set({ title: e.target.value })} style={inputStyle} /></Field>
      <label style={{ ...labelStyle, marginTop: 16 }}>Questions ({items.length})</label>
      {items.map((it, i) => (
        <div key={i} style={itemCardStyle}>
          <div style={cardHeaderStyle}>
            <span style={{ fontSize: 11, color: 'var(--agency-ink-3)', fontWeight: 600 }}>Q&A #{i + 1}</span>
            <ItemActions index={i} count={items.length} onMoveUp={() => set({ items: moveItem(items, i, -1) })} onMoveDown={() => set({ items: moveItem(items, i, 1) })} onRemove={() => remove(i)} />
          </div>
          <input type="text" value={it.question} onChange={(e) => update(i, { question: e.target.value })} placeholder="Question…" style={{ ...inputStyle, marginBottom: 6, fontWeight: 600 }} />
          <textarea value={it.answer} onChange={(e) => update(i, { answer: e.target.value })} placeholder="Réponse (HTML simple toléré : <p>, <ul>, <li>)" rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }} />
        </div>
      ))}
      <AddBtn onClick={add} label="Ajouter une question" />
    </>
  );
}

// ─── 8. CONTACT ──────────────────────────────────────────────────────

export function ContactEditor({ content, onChange }: { content: ContactContent; onChange: (c: ContactContent) => void }) {
  const set = (patch: Partial<ContactContent>) => onChange({ ...content, ...patch });
  const setLabels = (patch: Partial<ContactContent['formLabels']>) => set({ formLabels: { ...content.formLabels, ...patch } });
  const types = content.projectTypes || [];
  const updateType = (i: number, patch: Partial<ContactProjectType>) =>
    set({ projectTypes: types.map((t, idx) => idx === i ? { ...t, ...patch } : t) });
  const addType = () => set({ projectTypes: [...types, { value: '', label: '' }] });
  const removeType = (i: number) => set({ projectTypes: types.filter((_, idx) => idx !== i) });
  return (
    <>
      <Field label="Eyebrow"><input type="text" value={content.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} style={inputStyle} /></Field>
      <Field label="Titre"><input type="text" value={content.title} onChange={(e) => set({ title: e.target.value })} style={inputStyle} /></Field>
      <Field label="Sous-titre"><input type="text" value={content.subtitle} onChange={(e) => set({ subtitle: e.target.value })} style={inputStyle} /></Field>
      <Field label="Image"><ImagePicker value={content.image} onChange={(url) => set({ image: url })} folder="contact" hint="portrait ou paysage" /></Field>

      <label style={{ ...labelStyle, marginTop: 16 }}>Types de projets (dropdown du formulaire)</label>
      {types.map((t, i) => (
        <div key={i} style={{ ...itemCardStyle, display: 'grid', gridTemplateColumns: '120px 1fr 32px', gap: 6 }}>
          <input type="text" value={t.value} onChange={(e) => updateType(i, { value: e.target.value })} placeholder="value (clé)" style={{ ...inputStyle, fontFamily: 'ui-monospace, SFMono-Regular, monospace' }} />
          <input type="text" value={t.label} onChange={(e) => updateType(i, { label: e.target.value })} placeholder="Libellé visible" style={inputStyle} />
          <button type="button" onClick={() => removeType(i)} style={{ ...iconBtn, color: '#ef4444' }}><Trash2 size={11} /></button>
        </div>
      ))}
      <AddBtn onClick={addType} label="Ajouter un type" />

      <label style={{ ...labelStyle, marginTop: 20 }}>Libellés du formulaire</label>
      <div style={{ display: 'grid', gap: 6 }}>
        <input type="text" value={content.formLabels.projectType} onChange={(e) => setLabels({ projectType: e.target.value })} placeholder="Label « Type de projet »" style={inputStyle} />
        <input type="text" value={content.formLabels.fullName} onChange={(e) => setLabels({ fullName: e.target.value })} placeholder="Label « Nom »" style={inputStyle} />
        <input type="text" value={content.formLabels.email} onChange={(e) => setLabels({ email: e.target.value })} placeholder="Label « Email »" style={inputStyle} />
        <input type="text" value={content.formLabels.phone} onChange={(e) => setLabels({ phone: e.target.value })} placeholder="Label « Téléphone »" style={inputStyle} />
        <input type="text" value={content.formLabels.message} onChange={(e) => setLabels({ message: e.target.value })} placeholder="Label « Message »" style={inputStyle} />
        <input type="text" value={content.formLabels.callback} onChange={(e) => setLabels({ callback: e.target.value })} placeholder="Texte case à cocher rappel" style={inputStyle} />
        <input type="text" value={content.formLabels.submit} onChange={(e) => setLabels({ submit: e.target.value })} placeholder="Texte bouton Envoyer" style={inputStyle} />
      </div>
      <Field label="Message de succès"><input type="text" value={content.successMessage} onChange={(e) => set({ successMessage: e.target.value })} style={inputStyle} /></Field>
      <Field label="Erreur si téléphone manquant pour rappel"><input type="text" value={content.callbackPhoneRequired} onChange={(e) => set({ callbackPhoneRequired: e.target.value })} style={inputStyle} /></Field>
    </>
  );
}

// ─── 9. GLOBAL ───────────────────────────────────────────────────────

export function GlobalEditor({ content, onChange }: { content: GlobalContent; onChange: (c: GlobalContent) => void }) {
  const set = (patch: Partial<GlobalContent>) => onChange({ ...content, ...patch });
  const setBrand = (patch: Partial<GlobalContent['brand']>) => set({ brand: { ...content.brand, ...patch } });
  const setContact = (patch: Partial<GlobalContent['contact']>) => set({ contact: { ...content.contact, ...patch } });
  const setHeaderCta = (patch: Partial<CtaLink>) => set({ headerCta: { ...content.headerCta, ...patch } });

  const nav = content.navigation || [];
  const social = content.social || [];
  const legal = content.legal || [];

  const updateNav = (i: number, patch: Partial<NavLink>) => set({ navigation: nav.map((n, idx) => idx === i ? { ...n, ...patch } : n) });
  const addNav = () => set({ navigation: [...nav, { label: '', href: '' }] });
  const removeNav = (i: number) => set({ navigation: nav.filter((_, idx) => idx !== i) });

  const updateSocial = (i: number, patch: Partial<SocialLink>) => set({ social: social.map((s, idx) => idx === i ? { ...s, ...patch } : s) });
  const addSocial = () => set({ social: [...social, { label: '', href: '' }] });
  const removeSocial = (i: number) => set({ social: social.filter((_, idx) => idx !== i) });

  const updateLegal = (i: number, patch: Partial<NavLink>) => set({ legal: legal.map((l, idx) => idx === i ? { ...l, ...patch } : l) });
  const addLegal = () => set({ legal: [...legal, { label: '', href: '' }] });
  const removeLegal = (i: number) => set({ legal: legal.filter((_, idx) => idx !== i) });

  return (
    <>
      <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--agency-ink-2)', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Identité de marque</h3>
      <Field label="Logo"><ImagePicker value={content.brand.logoUrl} onChange={(url) => setBrand({ logoUrl: url })} folder="brand" hint="PNG transparent" /></Field>
      <Field label="Tagline (slogan court)"><input type="text" value={content.brand.tagline} onChange={(e) => setBrand({ tagline: e.target.value })} style={inputStyle} /></Field>

      <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--agency-ink-2)', margin: '20px 0 12px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Header — navigation</h3>
      {nav.map((n, i) => (
        <div key={i} style={{ ...itemCardStyle, display: 'grid', gridTemplateColumns: '1fr 1fr 32px', gap: 6 }}>
          <input type="text" value={n.label} onChange={(e) => updateNav(i, { label: e.target.value })} placeholder="Label" style={inputStyle} />
          <input type="text" value={n.href} onChange={(e) => updateNav(i, { href: e.target.value })} placeholder="Lien (#section)" style={inputStyle} />
          <button type="button" onClick={() => removeNav(i)} style={{ ...iconBtn, color: '#ef4444' }}><Trash2 size={11} /></button>
        </div>
      ))}
      <AddBtn onClick={addNav} label="Ajouter un lien de nav" />

      <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--agency-ink-2)', margin: '20px 0 12px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Header — bouton CTA</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <input type="text" value={content.headerCta.label} onChange={(e) => setHeaderCta({ label: e.target.value })} placeholder="Texte (ex. Parlons projet)" style={inputStyle} />
        <input type="text" value={content.headerCta.href} onChange={(e) => setHeaderCta({ href: e.target.value })} placeholder="Lien" style={inputStyle} />
      </div>

      <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--agency-ink-2)', margin: '20px 0 12px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Contact (affiché dans footer + header burger)</h3>
      <Field label="Email"><input type="email" value={content.contact.email} onChange={(e) => setContact({ email: e.target.value })} style={inputStyle} /></Field>
      <Field label="Téléphone"><input type="tel" value={content.contact.phone} onChange={(e) => setContact({ phone: e.target.value })} style={inputStyle} /></Field>
      <Field label="Ville / localisation"><input type="text" value={content.contact.city} onChange={(e) => setContact({ city: e.target.value })} style={inputStyle} /></Field>

      <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--agency-ink-2)', margin: '20px 0 12px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Réseaux sociaux</h3>
      {social.map((s, i) => (
        <div key={i} style={{ ...itemCardStyle, display: 'grid', gridTemplateColumns: '1fr 2fr 32px', gap: 6 }}>
          <input type="text" value={s.label} onChange={(e) => updateSocial(i, { label: e.target.value })} placeholder="Nom (Instagram, LinkedIn…)" style={inputStyle} />
          <input type="url" value={s.href} onChange={(e) => updateSocial(i, { href: e.target.value })} placeholder="https://…" style={inputStyle} />
          <button type="button" onClick={() => removeSocial(i)} style={{ ...iconBtn, color: '#ef4444' }}><Trash2 size={11} /></button>
        </div>
      ))}
      <AddBtn onClick={addSocial} label="Ajouter un réseau" />

      <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--agency-ink-2)', margin: '20px 0 12px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Footer — liens légaux</h3>
      {legal.map((l, i) => (
        <div key={i} style={{ ...itemCardStyle, display: 'grid', gridTemplateColumns: '1fr 1fr 32px', gap: 6 }}>
          <input type="text" value={l.label} onChange={(e) => updateLegal(i, { label: e.target.value })} placeholder="Label" style={inputStyle} />
          <input type="text" value={l.href} onChange={(e) => updateLegal(i, { href: e.target.value })} placeholder="URL" style={inputStyle} />
          <button type="button" onClick={() => removeLegal(i)} style={{ ...iconBtn, color: '#ef4444' }}><Trash2 size={11} /></button>
        </div>
      ))}
      <AddBtn onClick={addLegal} label="Ajouter un lien légal" />

      <Field label="Nom utilisé dans le copyright"><input type="text" value={content.copyrightName} onChange={(e) => set({ copyrightName: e.target.value })} placeholder="JL Studio" style={{ ...inputStyle, marginTop: 12 }} /></Field>
    </>
  );
}
