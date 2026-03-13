// ─────────────────────────────────────────────
// LIBRARY — Elements presets (Brixsa-quality premium)
// ─────────────────────────────────────────────

import type { LibraryElementItem } from '@/types/library'

// ─── HEADINGS ───

const HEADINGS: LibraryElementItem[] = [
  {
    id: 'el-heading-hero-xl',
    label: 'Hero Display XL',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'hero', 'h1', 'display', 'large'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Hero Display',
      defaultStyle: { fontSize: '4.5rem', fontWeight: 500, lineHeight: '1.1', letterSpacing: '-0.03em', color: '#f6efe5' },
      defaultContent: { text: 'Exceptional Living\nStarts Here', tag: 'h1' },
    },
  },
  {
    id: 'el-heading-hero-clamp',
    label: 'Hero Responsive',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'hero', 'responsive', 'clamp'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Hero Responsive',
      defaultStyle: { fontSize: '3.5rem', fontWeight: 600, lineHeight: '1.1', letterSpacing: '-0.025em', color: '#18181b' },
      defaultContent: { text: 'Build Something\nRemarkable', tag: 'h1' },
    },
  },
  {
    id: 'el-heading-section',
    label: 'Section Heading',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'section', 'h2'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Section Heading',
      defaultStyle: { fontSize: '2.5rem', fontWeight: 500, lineHeight: '1.15', letterSpacing: '-0.02em', color: '#140c08' },
      defaultContent: { text: 'Why Choose Us', tag: 'h2' },
    },
  },
  {
    id: 'el-heading-section-light',
    label: 'Section Heading Light',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'section', 'h2', 'light', 'dark-bg'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Section Heading Light',
      defaultStyle: { fontSize: '2.5rem', fontWeight: 500, lineHeight: '1.15', letterSpacing: '-0.02em', color: '#f6efe5' },
      defaultContent: { text: 'Our Expertise', tag: 'h2' },
    },
  },
  {
    id: 'el-heading-subsection',
    label: 'Subsection',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'subsection', 'h3'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Subsection',
      defaultStyle: { fontSize: '1.5rem', fontWeight: 600, lineHeight: '1.3', color: '#27272a' },
      defaultContent: { text: 'Premium Features', tag: 'h3' },
    },
  },
  {
    id: 'el-heading-card',
    label: 'Card Title',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'card', 'h3', 'small'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Card Title',
      defaultStyle: { fontSize: '1.125rem', fontWeight: 600, lineHeight: '1.35', color: '#18181b' },
      defaultContent: { text: 'Feature Title', tag: 'h3' },
    },
  },
]

// ─── TEXTS ───

const TEXTS: LibraryElementItem[] = [
  {
    id: 'el-text-overline',
    label: 'Overline / Label',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'overline', 'label', 'uppercase', 'small'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Overline',
      defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8a97e' },
      defaultContent: { text: 'Featured Collection' },
    },
  },
  {
    id: 'el-text-overline-dark',
    label: 'Overline Dark',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'overline', 'label', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Overline Dark',
      defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4a2711' },
      defaultContent: { text: 'Our Services' },
    },
  },
  {
    id: 'el-text-lead',
    label: 'Lead Paragraph',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'lead', 'intro', 'large'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Lead Text',
      defaultStyle: { fontSize: '1.1875rem', lineHeight: '1.65', color: 'rgba(225,225,225,0.6)' },
      defaultContent: { text: 'We craft digital experiences that captivate audiences and drive meaningful results for ambitious brands.' },
    },
  },
  {
    id: 'el-text-body',
    label: 'Body Text',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'paragraph', 'body'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Body Text',
      defaultStyle: { fontSize: '1rem', lineHeight: '1.7', color: '#56595a' },
      defaultContent: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.' },
    },
  },
  {
    id: 'el-text-body-light',
    label: 'Body Text Light',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'paragraph', 'body', 'light', 'dark-bg'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Body Light',
      defaultStyle: { fontSize: '1rem', lineHeight: '1.7', color: 'rgba(225,225,225,0.6)' },
      defaultContent: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    },
  },
  {
    id: 'el-text-small-muted',
    label: 'Small Muted',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'small', 'muted', 'caption'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Small Muted',
      defaultStyle: { fontSize: '0.8125rem', lineHeight: '1.5', color: '#a1a1aa' },
      defaultContent: { text: 'Additional note or caption for context.' },
    },
  },
  {
    id: 'el-text-blockquote-luxury',
    label: 'Blockquote Luxury',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'quote', 'blockquote', 'luxury'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Blockquote',
      defaultStyle: {
        fontSize: '1.25rem', lineHeight: '1.6', fontStyle: 'italic', color: '#e1e1e1',
        paddingLeft: '1.5rem',
        borderWidth: '0',
      },
      defaultContent: { text: '"Architecture is the learned game, correct and magnificent, of forms assembled in the light." — Le Corbusier' },
    },
  },
  {
    id: 'el-text-price-display',
    label: 'Price Display',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'price', 'number', 'large'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Price',
      defaultStyle: { fontSize: '2.5rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1' },
      defaultContent: { text: '€1,250,000' },
    },
  },
]

// ─── DIVIDERS ───

const DIVIDERS: LibraryElementItem[] = [
  {
    id: 'el-divider-subtle',
    label: 'Subtle Divider',
    category: 'elements', subcategory: 'dividers',
    tags: ['divider', 'line', 'subtle'],
    dropType: 'element',
    elementDef: {
      type: 'custom-divider', label: 'Divider',
      defaultStyle: { width: '100%', opacity: 0.15 },
      defaultContent: {},
    },
  },
  {
    id: 'el-divider-gradient-gold',
    label: 'Gradient Gold Line',
    category: 'elements', subcategory: 'dividers',
    tags: ['divider', 'gradient', 'gold', 'luxury'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Gradient Gold',
      defaultStyle: { width: '100%', height: '1px' },
      defaultContent: { html: '<div style="width:100%;height:1px;background:linear-gradient(90deg,transparent,#c8a97e,transparent)"></div>' },
    },
  },
  {
    id: 'el-divider-gradient-purple',
    label: 'Gradient Purple Line',
    category: 'elements', subcategory: 'dividers',
    tags: ['divider', 'gradient', 'purple', 'tech'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Gradient Purple',
      defaultStyle: { width: '100%', height: '1px' },
      defaultContent: { html: '<div style="width:100%;height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent)"></div>' },
    },
  },
  {
    id: 'el-divider-short-accent',
    label: 'Short Accent Line',
    category: 'elements', subcategory: 'dividers',
    tags: ['divider', 'short', 'accent'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Short Line',
      defaultStyle: { width: '60px', height: '3px' },
      defaultContent: { html: '<div style="width:100%;height:100%;background:#4a2711;border-radius:99px"></div>' },
    },
  },
]

// ─── SPACERS ───

const SPACERS: LibraryElementItem[] = [
  { id: 'el-spacer-xs', label: 'Spacer XS', category: 'elements', subcategory: 'spacers', tags: ['spacer', 'xs'], dropType: 'element', elementDef: { type: 'custom-spacer', label: 'Spacer XS', defaultStyle: { height: '0.5rem' }, defaultContent: {} } },
  { id: 'el-spacer-sm', label: 'Spacer SM', category: 'elements', subcategory: 'spacers', tags: ['spacer', 'sm'], dropType: 'element', elementDef: { type: 'custom-spacer', label: 'Spacer SM', defaultStyle: { height: '1.5rem' }, defaultContent: {} } },
  { id: 'el-spacer-md', label: 'Spacer MD', category: 'elements', subcategory: 'spacers', tags: ['spacer', 'md'], dropType: 'element', elementDef: { type: 'custom-spacer', label: 'Spacer MD', defaultStyle: { height: '3rem' }, defaultContent: {} } },
  { id: 'el-spacer-lg', label: 'Spacer LG', category: 'elements', subcategory: 'spacers', tags: ['spacer', 'lg'], dropType: 'element', elementDef: { type: 'custom-spacer', label: 'Spacer LG', defaultStyle: { height: '6rem' }, defaultContent: {} } },
  { id: 'el-spacer-xl', label: 'Spacer XL', category: 'elements', subcategory: 'spacers', tags: ['spacer', 'xl'], dropType: 'element', elementDef: { type: 'custom-spacer', label: 'Spacer XL', defaultStyle: { height: '10rem' }, defaultContent: {} } },
]

// ─── CONTAINERS ───

const CONTAINERS: LibraryElementItem[] = [
  {
    id: 'el-container-glass',
    label: 'Glass Container',
    category: 'elements', subcategory: 'containers',
    tags: ['container', 'glass', 'glassmorphism'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Glass Container',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '1rem',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
      },
      defaultContent: {},
    },
  },
  {
    id: 'el-container-dark-panel',
    label: 'Dark Panel',
    category: 'elements', subcategory: 'containers',
    tags: ['container', 'dark', 'panel'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Dark Panel',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2.5rem',
        backgroundColor: '#140c08',
        borderRadius: '0.75rem',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(209,203,199,0.1)',
      },
      defaultContent: {},
    },
  },
  {
    id: 'el-container-cream-card',
    label: 'Cream Panel',
    category: 'elements', subcategory: 'containers',
    tags: ['container', 'cream', 'warm', 'brixsa'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Cream Panel',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2.5rem',
        backgroundColor: '#f6efe5',
        borderRadius: '0.5rem',
      },
      defaultContent: {},
    },
  },
  {
    id: 'el-container-elevated',
    label: 'Elevated White',
    category: 'elements', subcategory: 'containers',
    tags: ['container', 'white', 'elevated', 'shadow'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Elevated',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.06)',
      },
      defaultContent: {},
    },
  },
]

export const LIBRARY_ELEMENTS: LibraryElementItem[] = [
  ...HEADINGS,
  ...TEXTS,
  ...DIVIDERS,
  ...SPACERS,
  ...CONTAINERS,
]
