// ─────────────────────────────────────────────
// LIBRARY — Wireframe presets (empty page structures)
// ─────────────────────────────────────────────

import type { LibraryTemplateItem, LibrarySectionStyle } from '@/types/library'

// Shorthand helpers
const wSm: LibrarySectionStyle = { background: 'white', paddingY: 'sm' }
const wMd: LibrarySectionStyle = { background: 'white', paddingY: 'md' }
const wLg: LibrarySectionStyle = { background: 'white', paddingY: 'lg' }
const wXl: LibrarySectionStyle = { background: 'white', paddingY: 'xl' }
const lMd: LibrarySectionStyle = { background: 'light', paddingY: 'md' }
const lLg: LibrarySectionStyle = { background: 'light', paddingY: 'lg' }
const dMd: LibrarySectionStyle = { background: 'dark', paddingY: 'md' }
const pLg: LibrarySectionStyle = { background: 'primary', paddingY: 'lg' }

export const LIBRARY_WIREFRAMES: LibraryTemplateItem[] = [
  {
    id: 'wf-landing-basic',
    label: 'Landing Page Basique',
    category: 'wireframes',
    subcategory: 'landing',
    tags: ['landing', 'basic', 'simple'],
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: wXl },
      { type: 'features', variant: 'default', content: {}, style: lLg },
      { type: 'testimonials', variant: 'default', content: {}, style: wLg },
      { type: 'cta', variant: 'default', content: {}, style: pLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'wf-landing-full',
    label: 'Landing Page Complete',
    category: 'wireframes',
    subcategory: 'landing',
    tags: ['landing', 'complete', 'full'],
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
      { type: 'faq', variant: 'default', content: {}, style: wLg },
      { type: 'cta', variant: 'default', content: {}, style: pLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'wf-about',
    label: 'Page A Propos',
    category: 'wireframes',
    subcategory: 'about',
    tags: ['about', 'team', 'story'],
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: wLg },
      { type: 'image-text', variant: 'default', content: {}, style: wLg },
      { type: 'timeline', variant: 'default', content: {}, style: lLg },
      { type: 'team', variant: 'default', content: {}, style: wLg },
      { type: 'stats', variant: 'default', content: {}, style: lLg },
      { type: 'cta', variant: 'default', content: {}, style: pLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'wf-blog',
    label: 'Page Blog',
    category: 'wireframes',
    subcategory: 'blog',
    tags: ['blog', 'articles', 'news'],
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: wMd },
      { type: 'blog-grid', variant: 'default', content: {}, style: wLg },
      { type: 'newsletter', variant: 'default', content: {}, style: lLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'wf-portfolio',
    label: 'Page Portfolio',
    category: 'wireframes',
    subcategory: 'portfolio',
    tags: ['portfolio', 'gallery', 'work'],
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wSm },
      { type: 'hero', variant: 'default', content: {}, style: wLg },
      { type: 'gallery-grid', variant: 'default', content: {}, style: wLg },
      { type: 'testimonials', variant: 'default', content: {}, style: lLg },
      { type: 'contact', variant: 'default', content: {}, style: wLg },
      { type: 'site-footer', variant: 'default', content: {}, style: dMd },
    ],
  },
  {
    id: 'wf-ecommerce',
    label: 'Page E-Commerce',
    category: 'wireframes',
    subcategory: 'ecommerce',
    tags: ['ecommerce', 'shop', 'products'],
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
    id: 'wire-scan-ff9aca9448d9',
    label: '12-section layout',
    category: 'wireframes',
    subcategory: 'landing',
    tags: ['wireframe', 'layout'],
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wMd },
      { type: 'hero', variant: 'default', content: {}, style: wMd },
      { type: 'image-text', variant: 'default', content: {}, style: wMd },
      { type: 'features', variant: 'default', content: {}, style: wMd },
      { type: 'gallery-grid', variant: 'default', content: {}, style: wMd },
      { type: 'cta', variant: 'default', content: {}, style: wMd },
      { type: 'image-text', variant: 'default', content: {}, style: wMd },
      { type: 'product-grid', variant: 'default', content: {}, style: wMd },
      { type: 'testimonials', variant: 'default', content: {}, style: wMd },
      { type: 'gallery-grid', variant: 'default', content: {}, style: wMd },
      { type: 'newsletter', variant: 'default', content: {}, style: wMd },
      { type: 'site-footer', variant: 'default', content: {}, style: wMd },
    ],
  },
  {
    id: 'wire-scan-858ca36ffe6b',
    label: '10-section layout',
    category: 'wireframes',
    subcategory: 'landing',
    tags: ['wireframe', 'layout'],
    dropType: 'template',
    sections: [
      { type: 'site-header', variant: 'default', content: {}, style: wMd },
      { type: 'hero', variant: 'default', content: {}, style: wMd },
      { type: 'features', variant: 'default', content: {}, style: wMd },
      { type: 'slider', variant: 'default', content: {}, style: wMd },
      { type: 'product-grid', variant: 'default', content: {}, style: wMd },
      { type: 'product-grid', variant: 'default', content: {}, style: wMd },
      { type: 'features', variant: 'default', content: {}, style: wMd },
      { type: 'product-grid', variant: 'default', content: {}, style: wMd },
      { type: 'features', variant: 'default', content: {}, style: wMd },
      { type: 'site-footer', variant: 'default', content: {}, style: wMd },
    ],
  },
  {
    id: 'wire-scan-398205ff33e4',
    label: '6-section layout',
    category: 'wireframes',
    subcategory: 'landing',
    tags: ['wireframe', 'layout'],
    dropType: 'template',
    sections: [
      { type: 'custom', variant: 'default', content: {}, style: wMd },
      { type: 'gallery-grid', variant: 'default', content: {}, style: wMd },
      { type: 'image-text', variant: 'default', content: {}, style: wMd },
      { type: 'product-grid', variant: 'default', content: {}, style: wMd },
      { type: 'product-grid', variant: 'default', content: {}, style: wMd },
      { type: 'site-footer', variant: 'default', content: {}, style: wMd },
    ],
  },
]
