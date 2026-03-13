// ─────────────────────────────────────────────
// LIBRARY — Template presets (full styled pages by industry)
// ─────────────────────────────────────────────

import type { LibraryTemplateItem, LibrarySectionStyle } from '@/types/library'
import { PAGE_TEMPLATES } from '@/data/templates'
import type { SectionBackground } from '@/types/site'

// Shorthand helpers
const wSm: LibrarySectionStyle = { background: 'white', paddingY: 'sm' }
const wMd: LibrarySectionStyle = { background: 'white', paddingY: 'md' }
const wLg: LibrarySectionStyle = { background: 'white', paddingY: 'lg' }
const wXl: LibrarySectionStyle = { background: 'white', paddingY: 'xl' }
const lMd: LibrarySectionStyle = { background: 'light', paddingY: 'md' }
const lLg: LibrarySectionStyle = { background: 'light', paddingY: 'lg' }
const dSm: LibrarySectionStyle = { background: 'dark', paddingY: 'sm' }
const dMd: LibrarySectionStyle = { background: 'dark', paddingY: 'md' }
const dLg: LibrarySectionStyle = { background: 'dark', paddingY: 'lg' }
const dXl: LibrarySectionStyle = { background: 'dark', paddingY: 'xl' }
const pLg: LibrarySectionStyle = { background: 'primary', paddingY: 'lg' }

// ─── Basic templates (original 10 hand-crafted presets) ───

const BASIC_TEMPLATES: LibraryTemplateItem[] = [
  {
    id: 'basic-tpl-photographe',
    label: 'Photographe',
    category: 'templates',
    subcategory: 'photographe',
    tags: ['photographe', 'photo', 'portfolio', 'creatif', 'basic'],
    universe: 'creatif',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: dSm },
      { type: 'hero', variant: 'default', content: {}, style: dXl },
      { type: 'gallery-grid', variant: 'default', content: {}, style: dLg },
      { type: 'image-text', variant: 'default', content: {}, style: dLg },
      { type: 'testimonials', variant: 'default', content: {}, style: dLg },
      { type: 'contact', variant: 'default', content: {}, style: dLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-coach',
    label: 'Coach / Consultant',
    category: 'templates',
    subcategory: 'coach',
    tags: ['coach', 'consultant', 'personal', 'branding', 'basic'],
    universe: 'startup',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: wXl },
      { type: 'logos', variant: 'default', content: {}, style: lMd },
      { type: 'features', variant: 'default', content: {}, style: wLg },
      { type: 'testimonials', variant: 'default', content: {}, style: lLg },
      { type: 'pricing', variant: 'default', content: {}, style: wLg },
      { type: 'faq', variant: 'default', content: {}, style: lLg },
      { type: 'contact', variant: 'default', content: {}, style: wLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-restaurant',
    label: 'Restaurant',
    category: 'templates',
    subcategory: 'restaurant',
    tags: ['restaurant', 'food', 'menu', 'reservations', 'basic'],
    universe: 'luxe',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: dSm },
      { type: 'hero', variant: 'default', content: {}, style: dXl },
      { type: 'image-text', variant: 'default', content: {}, style: dLg },
      { type: 'gallery-grid', variant: 'default', content: {}, style: dLg },
      { type: 'testimonials', variant: 'default', content: {}, style: dLg },
      { type: 'map', variant: 'default', content: {}, style: dLg },
      { type: 'contact', variant: 'default', content: {}, style: dLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-saas',
    label: 'SaaS Product',
    category: 'templates',
    subcategory: 'saas',
    tags: ['saas', 'software', 'product', 'tech', 'basic'],
    universe: 'startup',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: wXl },
      { type: 'logos', variant: 'default', content: {}, style: lMd },
      { type: 'features', variant: 'default', content: {}, style: wLg },
      { type: 'image-text', variant: 'default', content: {}, style: wLg },
      { type: 'stats', variant: 'default', content: {}, style: lLg },
      { type: 'testimonials', variant: 'default', content: {}, style: wLg },
      { type: 'pricing', variant: 'default', content: {}, style: lLg },
      { type: 'comparison-table', variant: 'default', content: {}, style: wLg },
      { type: 'faq', variant: 'default', content: {}, style: lLg },
      { type: 'cta', variant: 'default', content: {}, style: pLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-agency',
    label: 'Agence Digitale',
    category: 'templates',
    subcategory: 'agency',
    tags: ['agency', 'agence', 'digital', 'creative', 'basic'],
    universe: 'corporate',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: wXl },
      { type: 'features', variant: 'default', content: {}, style: wLg },
      { type: 'gallery-grid', variant: 'default', content: {}, style: lLg },
      { type: 'steps', variant: 'default', content: {}, style: wLg },
      { type: 'team', variant: 'default', content: {}, style: lLg },
      { type: 'testimonials', variant: 'default', content: {}, style: wLg },
      { type: 'contact', variant: 'default', content: {}, style: lLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-portfolio-creatif',
    label: 'Portfolio Creatif',
    category: 'templates',
    subcategory: 'portfolio',
    tags: ['portfolio', 'creatif', 'designer', 'artist', 'basic'],
    universe: 'creatif',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: lMd },
      { type: 'hero', variant: 'default', content: {}, style: { background: 'light', paddingY: 'xl' } },
      { type: 'gallery-grid', variant: 'default', content: {}, style: wLg },
      { type: 'image-text', variant: 'default', content: {}, style: lLg },
      { type: 'testimonials', variant: 'default', content: {}, style: wLg },
      { type: 'cta', variant: 'default', content: {}, style: pLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-ecommerce-shop',
    label: 'Boutique en Ligne',
    category: 'templates',
    subcategory: 'ecommerce',
    tags: ['ecommerce', 'boutique', 'shop', 'products', 'basic'],
    universe: 'ecommerce',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: wLg },
      { type: 'product-grid', variant: 'default', content: {}, style: wLg },
      { type: 'features', variant: 'default', content: {}, style: lLg },
      { type: 'testimonials', variant: 'default', content: {}, style: wLg },
      { type: 'newsletter', variant: 'default', content: {}, style: lMd },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-startup',
    label: 'Startup Tech',
    category: 'templates',
    subcategory: 'startup',
    tags: ['startup', 'tech', 'innovation', 'basic'],
    universe: 'startup',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: dSm },
      { type: 'hero', variant: 'default', content: {}, style: dXl },
      { type: 'logos', variant: 'default', content: {}, style: dMd },
      { type: 'features', variant: 'default', content: {}, style: dLg },
      { type: 'stats', variant: 'default', content: {}, style: dLg },
      { type: 'testimonials', variant: 'default', content: {}, style: dLg },
      { type: 'pricing', variant: 'default', content: {}, style: dLg },
      { type: 'cta', variant: 'default', content: {}, style: pLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-immobilier',
    label: 'Immobilier',
    category: 'templates',
    subcategory: 'immobilier',
    tags: ['immobilier', 'real-estate', 'property', 'basic'],
    universe: 'corporate',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: wXl },
      { type: 'search', variant: 'default', content: {}, style: lMd },
      { type: 'product-grid', variant: 'default', content: {}, style: wLg },
      { type: 'features', variant: 'default', content: {}, style: lLg },
      { type: 'testimonials', variant: 'default', content: {}, style: wLg },
      { type: 'contact', variant: 'default', content: {}, style: lLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'basic-tpl-sante',
    label: 'Sante / Bien-etre',
    category: 'templates',
    subcategory: 'sante',
    tags: ['sante', 'health', 'wellness', 'bien-etre', 'basic'],
    universe: 'corporate',
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: { background: 'light', paddingY: 'xl' } },
      { type: 'features', variant: 'default', content: {}, style: wLg },
      { type: 'image-text', variant: 'default', content: {}, style: lLg },
      { type: 'team', variant: 'default', content: {}, style: wLg },
      { type: 'testimonials', variant: 'default', content: {}, style: lLg },
      { type: 'pricing', variant: 'default', content: {}, style: wLg },
      { type: 'contact', variant: 'default', content: {}, style: lLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
]

// ─── Rich templates (converted from PAGE_TEMPLATES) ───

/** Map PAGE_TEMPLATES category to library subcategory */
const CATEGORY_TO_SUBCATEGORY: Record<string, string> = {
  'saas': 'saas',
  'agency': 'agency',
  'ecommerce': 'ecommerce',
  'portfolio': 'portfolio',
  'startup': 'startup',
  'blog': 'blog',
  'real-estate': 'real-estate',
  'photographe': 'photographe',
  'coach': 'coach',
  'restaurant': 'restaurant',
  'coiffeur': 'coiffeur',
  'architecte': 'architecte',
  'tatoueur': 'tatoueur',
  'beaute': 'beaute',
  'dj': 'dj',
  'traiteur': 'traiteur',
  'agency-models': 'agency-models',
}

const RICH_TEMPLATES: LibraryTemplateItem[] = PAGE_TEMPLATES.map((tpl) => ({
  id: tpl.id,
  label: tpl.name,
  category: 'templates' as const,
  subcategory: CATEGORY_TO_SUBCATEGORY[tpl.category] ?? tpl.category,
  tags: [tpl.category, tpl.universe, tpl.name.toLowerCase(), 'rich'],
  universe: tpl.universe,
  dropType: 'template' as const,
  sections: tpl.sections.map((s) => ({
    type: s.type,
    variant: s.variant,
    content: (s.content ?? {}) as Record<string, unknown>,
    style: {
      background: (s.style?.background ?? 'white') as SectionBackground,
      paddingY: (s.style?.paddingY ?? 'md') as LibrarySectionStyle['paddingY'],
    },
  })),
}))

// ─── Combined export ───

export const LIBRARY_TEMPLATES: LibraryTemplateItem[] = [
  ...BASIC_TEMPLATES,
  ...RICH_TEMPLATES,
]
