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
  {
    id: 'el-text-stat-number',
    label: 'Stat Number Large',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'stat', 'number', 'counter', 'large', 'metric'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Stat Number',
      defaultStyle: { fontSize: '3.5rem', fontWeight: 700, lineHeight: '1', color: '#f6efe5' },
      defaultContent: { text: '2,500+' },
    },
  },
  {
    id: 'el-text-stat-label',
    label: 'Stat Label',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'stat', 'label', 'description', 'metric'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Stat Label',
      defaultStyle: { fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' },
      defaultContent: { text: 'Projets livrés' },
    },
  },
  {
    id: 'el-text-quote-mark',
    label: 'Quote Mark Decorative',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'quote', 'mark', 'decorative', 'testimonial'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Quote Mark',
      defaultStyle: { fontSize: '4rem', fontWeight: 300, lineHeight: '1', color: '#c8a97e', opacity: 0.5 },
      defaultContent: { text: '\u201C' },
    },
  },
  {
    id: 'el-text-price-monthly',
    label: 'Price with Period',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'price', 'monthly', 'subscription', 'pricing'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Price Monthly',
      defaultStyle: { display: 'inline-block' },
      defaultContent: { html: '<span style="display:inline-flex;align-items:baseline;gap:2px"><span style="font-size:2.5rem;font-weight:700;color:#f6efe5;line-height:1">\u20AC29</span><span style="font-size:0.875rem;font-weight:400;color:rgba(255,255,255,0.4)">/mois</span></span>' },
    },
  },
  {
    id: 'el-text-copyright',
    label: 'Copyright Line',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'copyright', 'footer', 'legal'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Copyright',
      defaultStyle: { fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' },
      defaultContent: { text: '\u00A9 2026 Brand. Tous droits r\u00E9serv\u00E9s.' },
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

// ─── DECORATIVE ───

const DECORATIVE: LibraryElementItem[] = [
  {
    id: 'el-noise-overlay',
    label: 'Noise Texture Overlay',
    category: 'elements', subcategory: 'decorative',
    tags: ['noise', 'texture', 'overlay', 'grain', 'effect'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Noise Overlay',
      defaultStyle: { width: '100%', height: '100%' },
      defaultContent: { html: '<div style="position:fixed;inset:0;pointer-events:none;opacity:0.03;z-index:999"><svg width="100%" height="100%"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3"/></filter><rect width="100%" height="100%" filter="url(#noise)"/></svg></div>' },
    },
  },
  {
    id: 'el-dot-grid-bg',
    label: 'Dot Grid Background',
    category: 'elements', subcategory: 'decorative',
    tags: ['dot', 'grid', 'background', 'pattern', 'subtle'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Dot Grid',
      defaultStyle: { width: '100%', height: '100%' },
      defaultContent: { html: '<div style="width:100%;height:100%;background-image:radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px);background-size:24px 24px"></div>' },
    },
  },
  {
    id: 'el-gradient-divider-animated',
    label: 'Animated Gradient Divider',
    category: 'elements', subcategory: 'decorative',
    tags: ['divider', 'gradient', 'animated', 'line', 'scaleX'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Gradient Divider',
      defaultStyle: { width: '100%', height: '2px' },
      defaultContent: { html: '<div style="width:100%;height:2px;background:linear-gradient(90deg,#c8a97e,transparent);transform:scaleX(0);transform-origin:left;animation:dividerIn 1.5s ease-out forwards"><style>@keyframes dividerIn{to{transform:scaleX(1)}}</style></div>' },
    },
  },
  {
    id: 'el-radial-glow',
    label: 'Radial Glow Accent',
    category: 'elements', subcategory: 'decorative',
    tags: ['glow', 'radial', 'accent', 'background', 'ambient'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Radial Glow',
      defaultStyle: { width: '300px', height: '300px' },
      defaultContent: { html: '<div style="width:100%;height:100%;border-radius:50%;background:radial-gradient(circle,rgba(99,139,255,0.15),transparent);filter:blur(60px)"></div>' },
    },
  },
  {
    id: 'el-floating-shapes',
    label: 'Floating SVG Shapes',
    category: 'elements', subcategory: 'decorative',
    tags: ['floating', 'shapes', 'svg', 'abstract', 'decoration'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Floating Shapes',
      defaultStyle: { width: '100%', height: '100%', position: 'relative' },
      defaultContent: { html: '<div style="position:relative;width:100%;height:100%;overflow:hidden;pointer-events:none"><svg style="position:absolute;top:10%;left:15%;opacity:0.08;animation:floatA 8s ease-in-out infinite" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="35" fill="#c8a97e"/></svg><svg style="position:absolute;top:50%;right:20%;opacity:0.1;animation:floatB 12s ease-in-out infinite" width="60" height="60" viewBox="0 0 60 60"><rect x="10" y="10" width="40" height="40" rx="8" fill="#8b6f4e" transform="rotate(30 30 30)"/></svg><svg style="position:absolute;bottom:15%;left:40%;opacity:0.12;animation:floatC 10s ease-in-out infinite" width="70" height="70" viewBox="0 0 70 70"><polygon points="35,5 65,60 5,60" fill="#a67c52"/></svg><style>@keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}@keyframes floatB{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-15px) rotate(10deg)}}@keyframes floatC{0%,100%{transform:translateY(0)}50%{transform:translateY(-25px)}}</style></div>' },
    },
  },
]

// ─── SECTION DIVIDERS ───

const SECTION_DIVIDERS: LibraryElementItem[] = [
  {
    id: 'el-divider-wave',
    label: 'Wave Section Divider',
    category: 'elements', subcategory: 'dividers',
    tags: ['divider', 'wave', 'section', 'separator', 'organic'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Wave Divider',
      defaultStyle: { width: '100%', height: '60px' },
      defaultContent: { html: '<svg viewBox="0 0 1920 160" preserveAspectRatio="none" style="width:100%;height:100%;display:block"><path d="M0,64 C320,128 640,0 960,64 C1280,128 1600,0 1920,64 L1920,160 L0,160 Z" fill="#f6efe5"/></svg>' },
    },
  },
  {
    id: 'el-divider-angle',
    label: 'Angle Section Divider',
    category: 'elements', subcategory: 'dividers',
    tags: ['divider', 'angle', 'diagonal', 'section', 'sharp'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Angle Divider',
      defaultStyle: { width: '100%', height: '60px' },
      defaultContent: { html: '<svg viewBox="0 0 1920 160" preserveAspectRatio="none" style="width:100%;height:100%;display:block"><path d="M0,160 L1920,0 L1920,160 Z" fill="#f6efe5"/></svg>' },
    },
  },
  {
    id: 'el-divider-curve',
    label: 'Curve Section Divider',
    category: 'elements', subcategory: 'dividers',
    tags: ['divider', 'curve', 'arc', 'section', 'smooth'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Curve Divider',
      defaultStyle: { width: '100%', height: '60px' },
      defaultContent: { html: '<svg viewBox="0 0 1920 160" preserveAspectRatio="none" style="width:100%;height:100%;display:block"><path d="M0,160 Q960,0 1920,160 Z" fill="#f6efe5"/></svg>' },
    },
  },
  {
    id: 'el-divider-triangle',
    label: 'Triangle Section Divider',
    category: 'elements', subcategory: 'dividers',
    tags: ['divider', 'triangle', 'peak', 'section', 'geometric'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Triangle Divider',
      defaultStyle: { width: '100%', height: '60px' },
      defaultContent: { html: '<svg viewBox="0 0 1920 160" preserveAspectRatio="none" style="width:100%;height:100%;display:block"><path d="M0,160 L960,0 L1920,160 Z" fill="#f6efe5"/></svg>' },
    },
  },
  {
    id: 'el-divider-shimmer-gold',
    label: 'Gold Shimmer Divider',
    category: 'elements', subcategory: 'dividers',
    tags: ['divider', 'shimmer', 'gold', 'animated', 'luxury'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Shimmer Gold',
      defaultStyle: { width: '100%', height: '2px' },
      defaultContent: { html: '<div style="width:100%;height:2px;background:linear-gradient(90deg,transparent,rgba(200,169,126,0.5),transparent);background-size:200%;animation:shimmer 3s ease infinite"><style>@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}</style></div>' },
    },
  },
]

// ─── COLOR PALETTES ───

function paletteHtml(name: string, colors: { hex: string; label: string }[]): string {
  const swatches = colors.map(c =>
    `<div style="display:flex;flex-direction:column;align-items:center;gap:4px"><div style="width:40px;height:40px;border-radius:50%;background:${c.hex};border:1px solid rgba(255,255,255,0.12)"></div><span class="pal-hex" style="font-size:10px;font-family:monospace;color:rgba(255,255,255,0.55)">${c.hex}</span></div>`
  ).join('')
  return `<div class="pal-card" style="width:100%;min-height:120px;background:#18181b;border-radius:12px;padding:20px 24px;display:flex;flex-direction:column;gap:14px;box-sizing:border-box"><span class="pal-title" style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.85);letter-spacing:0.02em">${name}</span><div class="pal-row" style="display:flex;gap:16px;flex-wrap:wrap">${swatches}</div></div>`
}

const COLOR_PALETTES: LibraryElementItem[] = [
  {
    id: 'el-palette-brixsa',
    label: 'Palette Brixsa (Immobilier Luxe)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'brixsa', 'luxury', 'warm', 'immobilier'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Brixsa',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Brixsa — Immobilier Luxe', [
        { hex: '#f6efe5', label: 'cream bg' },
        { hex: '#140c08', label: 'dark text' },
        { hex: '#b8860b', label: 'gold accent' },
        { hex: '#56595a', label: 'muted' },
        { hex: '#4a2711', label: 'brown' },
        { hex: '#c8a97e', label: 'soft gold' },
      ]) },
    },
  },
  {
    id: 'el-palette-canopy',
    label: 'Palette Canopy (Éco-commerce)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'canopy', 'eco', 'green', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Canopy',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Canopy — Éco-commerce', [
        { hex: '#1A1A1A', label: 'dark bg' },
        { hex: '#E8E8E5', label: 'text' },
        { hex: '#2D5016', label: 'forest green' },
        { hex: '#A8D98A', label: 'light green' },
        { hex: '#3D6B24', label: 'mid green' },
        { hex: '#F0EDE8', label: 'cream' },
      ]) },
    },
  },
  {
    id: 'el-palette-nacre',
    label: 'Palette Nacre (Salon Luxe)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'nacre', 'mauve', 'rose-gold', 'luxury'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Nacre',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Nacre — Salon Luxe', [
        { hex: '#2A1A1E', label: 'deep mauve' },
        { hex: '#F0E0DA', label: 'warm cream' },
        { hex: '#C9A96E', label: 'rose gold' },
        { hex: '#D4B88E', label: 'light gold' },
        { hex: '#8A7A75', label: 'muted warm' },
        { hex: '#723C3A', label: 'deep rose' },
      ]) },
    },
  },
  {
    id: 'el-palette-obscura',
    label: 'Palette Obscura (Photographe)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'obscura', 'dark', 'gold', 'photography'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Obscura',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Obscura — Photographe', [
        { hex: '#0A0A0A', label: 'deep black' },
        { hex: '#E8E4DF', label: 'cream' },
        { hex: '#D4A853', label: 'gold' },
        { hex: '#888888', label: 'gray' },
        { hex: '#1A1A1A', label: 'near-black' },
        { hex: '#F5F0E8', label: 'light cream' },
      ]) },
    },
  },
  {
    id: 'el-palette-prisme',
    label: 'Palette Prisme (Photography Premium)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'prisme', 'blue', 'ice', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Prisme',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Prisme — Photography Premium', [
        { hex: '#0F1923', label: 'navy dark' },
        { hex: '#B8D4E3', label: 'ice blue' },
        { hex: '#E8E4DF', label: 'cream' },
        { hex: '#5A7A8A', label: 'steel' },
        { hex: '#1E2A3A', label: 'dark blue' },
        { hex: '#D4E4F0', label: 'light blue' },
      ]) },
    },
  },
  {
    id: 'el-palette-petale',
    label: 'Palette Pétale (Fleuriste)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'petale', 'rose', 'floral', 'warm'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Pétale',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Pétale — Fleuriste', [
        { hex: '#1A1412', label: 'dark brown' },
        { hex: '#F0E0DA', label: 'blush' },
        { hex: '#D4A574', label: 'rose gold' },
        { hex: '#E8C9A8', label: 'peach' },
        { hex: '#8A6A55', label: 'warm brown' },
        { hex: '#2A1F1A', label: 'deep brown' },
      ]) },
    },
  },
  {
    id: 'el-palette-forge',
    label: 'Palette Forge (Coach Sportif)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'forge', 'dark', 'energy', 'sport'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Forge',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Forge — Coach Sportif', [
        { hex: '#0A0A0A', label: 'black' },
        { hex: '#E8E8E8', label: 'white' },
        { hex: '#FF4D00', label: 'orange' },
        { hex: '#00D9FF', label: 'cyan' },
        { hex: '#333333', label: 'dark gray' },
        { hex: '#888888', label: 'gray' },
      ]) },
    },
  },
  {
    id: 'el-palette-glass',
    label: 'Palette Glass (Tech/SaaS)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'glass', 'tech', 'purple', 'modern'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Glass',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Glass — Tech/SaaS', [
        { hex: '#0a0a0f', label: 'dark purple-black' },
        { hex: '#e1e1e1', label: 'light' },
        { hex: '#6366f1', label: 'indigo' },
        { hex: '#818cf8', label: 'lavender' },
        { hex: '#1e1b4b', label: 'deep purple' },
        { hex: '#a78bfa', label: 'purple' },
      ]) },
    },
  },
  {
    id: 'el-palette-linear',
    label: 'Palette Linear (SaaS Dark)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'linear', 'saas', 'dark', 'purple'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Linear',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Linear — SaaS Dark', [
        { hex: '#08070b', label: 'bg dark' },
        { hex: '#f2f2f2', label: 'text' },
        { hex: '#5e6ad2', label: 'brand purple' },
        { hex: '#8b8eed', label: 'light purple' },
        { hex: '#101014', label: 'surface' },
        { hex: '#8a8f98', label: 'muted' },
      ]) },
    },
  },
  {
    id: 'el-palette-stripe',
    label: 'Palette Stripe (Fintech)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'stripe', 'fintech', 'navy', 'blurple'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Stripe',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Stripe — Fintech', [
        { hex: '#0A2540', label: 'navy' },
        { hex: '#FFFFFF', label: 'white' },
        { hex: '#635BFF', label: 'blurple' },
        { hex: '#00D4AA', label: 'cyan' },
        { hex: '#F6F9FC', label: 'light gray' },
        { hex: '#425466', label: 'slate' },
      ]) },
    },
  },
  {
    id: 'el-palette-apple-dark',
    label: 'Palette Apple Dark',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'apple', 'dark', 'minimal', 'blue'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Apple Dark',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Apple Dark', [
        { hex: '#000000', label: 'black' },
        { hex: '#f5f5f7', label: 'white' },
        { hex: '#2997ff', label: 'blue' },
        { hex: '#86868b', label: 'gray' },
        { hex: '#1d1d1f', label: 'near-black' },
        { hex: '#0071e3', label: 'button blue' },
      ]) },
    },
  },
  {
    id: 'el-palette-vercel',
    label: 'Palette Vercel (Geist)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'vercel', 'geist', 'dark', 'gradient'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Vercel',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Vercel — Geist', [
        { hex: '#000000', label: 'black' },
        { hex: '#ededed', label: 'text' },
        { hex: '#0070f3', label: 'blue' },
        { hex: '#7928ca', label: 'purple' },
        { hex: '#ff0080', label: 'pink' },
        { hex: '#a1a1a1', label: 'muted' },
      ]) },
    },
  },
  {
    id: 'el-palette-aman',
    label: 'Palette Aman (Luxury Warm)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'aman', 'luxury', 'warm', 'gold'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Aman',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Aman — Luxury Warm', [
        { hex: '#1A1A1A', label: 'dark' },
        { hex: '#F2EDE7', label: 'warm white' },
        { hex: '#C5A572', label: 'muted gold' },
        { hex: '#F7F4EF', label: 'warm cream' },
        { hex: '#6E6455', label: 'warm gray' },
        { hex: '#9B9183', label: 'tertiary' },
      ]) },
    },
  },
  {
    id: 'el-palette-cuberto',
    label: 'Palette Cuberto (Agency Bold)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'cuberto', 'agency', 'bold', 'contrast'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Cuberto',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Cuberto — Agency Bold', [
        { hex: '#000000', label: 'black' },
        { hex: '#FFFFFF', label: 'white' },
        { hex: '#FF4D00', label: 'orange-red' },
        { hex: '#6C63FF', label: 'violet' },
        { hex: '#F5F5F0', label: 'cream' },
        { hex: '#111111', label: 'surface' },
      ]) },
    },
  },
  {
    id: 'el-palette-locomotive',
    label: 'Palette Locomotive (Studio Editorial)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'locomotive', 'studio', 'editorial', 'red'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Locomotive',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Locomotive — Studio Editorial', [
        { hex: '#0E0E0E', label: 'dark' },
        { hex: '#FFFFFF', label: 'white' },
        { hex: '#E63928', label: 'red' },
        { hex: '#EDE8E2', label: 'cream' },
        { hex: '#C8B9A8', label: 'warm' },
        { hex: '#FF6B57', label: 'coral' },
      ]) },
    },
  },
  {
    id: 'el-palette-rauno',
    label: 'Palette Rauno (Minimal Mono)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'rauno', 'minimal', 'monochrome', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Rauno',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Rauno — Minimal Mono', [
        { hex: '#111111', label: 'dark bg' },
        { hex: '#EDEDED', label: 'text' },
        { hex: '#191919', label: 'surface' },
        { hex: '#888888', label: 'secondary' },
        { hex: '#2E2E2E', label: 'border' },
        { hex: '#555555', label: 'tertiary' },
      ]) },
    },
  },
  {
    id: 'el-palette-arc',
    label: 'Palette Arc (Creative Indigo)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'arc', 'creative', 'indigo', 'gradient'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Arc',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Arc — Creative Indigo', [
        { hex: '#16132d', label: 'deep navy' },
        { hex: '#f5f5f7', label: 'light' },
        { hex: '#6366f1', label: 'indigo' },
        { hex: '#a855f7', label: 'purple' },
        { hex: '#ec4899', label: 'pink' },
        { hex: '#1d1d1f', label: 'dark text' },
      ]) },
    },
  },
  {
    id: 'el-palette-resend',
    label: 'Palette Resend (Developer Dark)',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'resend', 'developer', 'dark', 'code'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Resend',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Resend — Developer Dark', [
        { hex: '#000000', label: 'black' },
        { hex: '#fafafa', label: 'text' },
        { hex: '#8b5cf6', label: 'violet' },
        { hex: '#4ade80', label: 'code green' },
        { hex: '#60a5fa', label: 'code blue' },
        { hex: '#18181b', label: 'surface' },
      ]) },
    },
  },
]

// ─── NAVIGATION ───

const NAVIGATION: LibraryElementItem[] = [
  {
    id: 'el-nav-hamburger',
    label: 'Animated Hamburger Icon',
    category: 'elements', subcategory: 'navigation',
    tags: ['navigation', 'hamburger', 'menu', 'icon', 'animated', 'mobile'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Hamburger Icon',
      defaultStyle: { width: '44px', height: '44px' },
      defaultContent: { html: '<div class="nav-hamburger" style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative"><span class="nav-hamburger-line" style="display:block;width:24px;height:2px;background:#f6efe5;border-radius:1px;position:absolute;transition:all 0.3s ease"></span><span class="nav-hamburger-line-top" style="display:block;width:24px;height:2px;background:#f6efe5;border-radius:1px;position:absolute;transform:translateY(-7px);transition:all 0.3s ease"></span><span class="nav-hamburger-line-bot" style="display:block;width:24px;height:2px;background:#f6efe5;border-radius:1px;position:absolute;transform:translateY(7px);transition:all 0.3s ease"></span><style>.nav-hamburger:hover .nav-hamburger-line{opacity:0}.nav-hamburger:hover .nav-hamburger-line-top{transform:rotate(45deg)}.nav-hamburger:hover .nav-hamburger-line-bot{transform:rotate(-45deg)}</style></div>' },
    },
  },
  {
    id: 'el-nav-mobile-overlay',
    label: 'Mobile Menu Overlay',
    category: 'elements', subcategory: 'navigation',
    tags: ['navigation', 'mobile', 'overlay', 'menu', 'fullscreen', 'links'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Mobile Overlay',
      defaultStyle: { width: '100%', height: '400px' },
      defaultContent: { html: '<div class="nav-mobile-overlay" style="width:100%;height:100%;background:#0a0a0a;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;gap:0"><div class="nav-mobile-close" style="position:absolute;top:20px;right:24px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><line x1="2" y1="2" x2="18" y2="18" stroke="#f6efe5" stroke-width="1.5" stroke-linecap="round"/><line x1="18" y1="2" x2="2" y2="18" stroke="#f6efe5" stroke-width="1.5" stroke-linecap="round"/></svg></div><a class="nav-mobile-link" href="#" style="font-size:1.5rem;font-weight:500;color:#f6efe5;text-decoration:none;padding:16px 0;transition:color 0.3s ease;letter-spacing:-0.01em">Accueil</a><a class="nav-mobile-link" href="#" style="font-size:1.5rem;font-weight:500;color:#f6efe5;text-decoration:none;padding:16px 0;transition:color 0.3s ease;letter-spacing:-0.01em">Services</a><a class="nav-mobile-link" href="#" style="font-size:1.5rem;font-weight:500;color:#f6efe5;text-decoration:none;padding:16px 0;transition:color 0.3s ease;letter-spacing:-0.01em">Portfolio</a><a class="nav-mobile-link" href="#" style="font-size:1.5rem;font-weight:500;color:#f6efe5;text-decoration:none;padding:16px 0;transition:color 0.3s ease;letter-spacing:-0.01em">A propos</a><a class="nav-mobile-link" href="#" style="font-size:1.5rem;font-weight:500;color:#f6efe5;text-decoration:none;padding:16px 0;transition:color 0.3s ease;letter-spacing:-0.01em">Contact</a><style>.nav-mobile-link:hover{color:#c8a97e!important}</style></div>' },
    },
  },
  {
    id: 'el-nav-mega-menu',
    label: 'Mega Menu Grid',
    category: 'elements', subcategory: 'navigation',
    tags: ['navigation', 'mega-menu', 'grid', 'dropdown', 'glass', 'links'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Mega Menu',
      defaultStyle: { width: '100%', height: '300px' },
      defaultContent: { html: '<div class="nav-mega" style="width:100%;height:100%;background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:32px 40px;display:grid;grid-template-columns:repeat(3,1fr);gap:32px;box-sizing:border-box"><div class="nav-mega-col"><span class="nav-mega-title" style="display:block;font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#c8a97e;margin-bottom:16px">Produits</span><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Application Web</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Application Mobile</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">API & Integrations</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Analytics</a></div><div class="nav-mega-col"><span class="nav-mega-title" style="display:block;font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#c8a97e;margin-bottom:16px">Ressources</span><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Documentation</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Guides</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Blog</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Changelog</a></div><div class="nav-mega-col"><span class="nav-mega-title" style="display:block;font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#c8a97e;margin-bottom:16px">Entreprise</span><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">A propos</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Carrieres</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Partenaires</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Contact</a></div><style>.nav-mega-link:hover{color:#f6efe5!important}</style></div>' },
    },
  },
  {
    id: 'el-footer-column',
    label: 'Footer Column',
    category: 'elements', subcategory: 'navigation',
    tags: ['footer', 'column', 'links', 'navigation', 'hover'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Footer Column',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '0',
      },
      defaultContent: {},
      children: [
        {
          type: 'custom-heading', label: 'Column Title',
          defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#f6efe5', marginBottom: '16px' },
          defaultContent: { text: 'Navigation', tag: 'h4' },
        },
        {
          type: 'custom-embed', label: 'Footer Links',
          defaultStyle: { width: '100%' },
          defaultContent: { html: '<div class="footer-col-links" style="display:flex;flex-direction:column;gap:10px"><a class="footer-col-link" href="#" style="font-size:0.875rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">Accueil</a><a class="footer-col-link" href="#" style="font-size:0.875rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">Services</a><a class="footer-col-link" href="#" style="font-size:0.875rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">Portfolio</a><a class="footer-col-link" href="#" style="font-size:0.875rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">A propos</a><a class="footer-col-link" href="#" style="font-size:0.875rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">Contact</a><style>.footer-col-link:hover{color:#c8a97e!important}</style></div>' },
        },
      ],
    },
  },
  {
    id: 'el-footer-bottom-bar',
    label: 'Footer Bottom Bar',
    category: 'elements', subcategory: 'navigation',
    tags: ['footer', 'bottom', 'bar', 'copyright', 'legal', 'status'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Footer Bottom Bar',
      defaultStyle: { width: '100%' },
      defaultContent: { html: '<div class="footer-bar" style="width:100%;border-top:1px solid rgba(255,255,255,0.08);padding:20px 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px"><span class="footer-bar-copy" style="font-size:0.8125rem;color:rgba(255,255,255,0.3)">\u00A9 2026 Brand. Tous droits r\u00E9serv\u00E9s.</span><div class="footer-bar-legal" style="display:flex;gap:20px"><a class="footer-bar-link" href="#" style="font-size:0.8125rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">Mentions l\u00E9gales</a><a class="footer-bar-link" href="#" style="font-size:0.8125rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">Confidentialit\u00E9</a><a class="footer-bar-link" href="#" style="font-size:0.8125rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">CGV</a></div><div class="footer-bar-status" style="display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:#22c55e;display:inline-block"></span><span style="font-size:0.75rem;color:rgba(255,255,255,0.4)">Tous les syst\u00E8mes op\u00E9rationnels</span></div><style>.footer-bar-link:hover{color:#c8a97e!important}</style></div>' },
    },
  },
  {
    id: 'el-footer-branding',
    label: 'Footer Branding Block',
    category: 'elements', subcategory: 'navigation',
    tags: ['footer', 'branding', 'logo', 'tagline', 'social', 'icons'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Footer Branding',
      defaultStyle: { width: '100%' },
      defaultContent: { html: '<div class="footer-brand" style="display:flex;flex-direction:column;gap:16px"><span class="footer-brand-logo" style="font-size:1.375rem;font-weight:700;color:#f6efe5;letter-spacing:-0.02em">Brand.</span><p class="footer-brand-tagline" style="font-size:0.875rem;line-height:1.6;color:rgba(225,225,225,0.5);max-width:280px;margin:0">Crafting exceptional digital experiences for ambitious brands since 2020.</p><div class="footer-brand-social" style="display:flex;gap:12px;margin-top:4px"><a class="footer-brand-icon" href="#" style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;text-decoration:none"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f6efe5" stroke-width="1.5" stroke-linecap="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a><a class="footer-brand-icon" href="#" style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;text-decoration:none"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f6efe5" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="#f6efe5" stroke="none"/></svg></a><a class="footer-brand-icon" href="#" style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;text-decoration:none"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f6efe5" stroke-width="1.5" stroke-linecap="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a><a class="footer-brand-icon" href="#" style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;text-decoration:none"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f6efe5" stroke-width="1.5" stroke-linecap="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a></div><style>.footer-brand-icon:hover{background:rgba(255,255,255,0.08)!important;border-color:rgba(255,255,255,0.15)!important}</style></div>' },
    },
  },
  {
    id: 'el-nav-link-hover-slide',
    label: 'Nav Link Hover Slide',
    category: 'elements', subcategory: 'navigation',
    tags: ['navigation', 'link', 'hover', 'slide', 'text-mask', 'animated'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Link Hover Slide',
      defaultStyle: { display: 'inline-block' },
      defaultContent: { html: '<a class="nav-slide-link" href="#" style="position:relative;display:inline-block;overflow:hidden;text-decoration:none;font-size:0.9375rem;font-weight:500;color:#f6efe5;height:1.4em;line-height:1.4"><span class="nav-slide-top" style="display:block;transition:transform 0.3s ease">Services</span><span class="nav-slide-bot" style="display:block;position:absolute;top:0;left:0;color:#c8a97e;transform:translateY(100%);transition:transform 0.3s ease">Services</span><style>.nav-slide-link:hover .nav-slide-top{transform:translateY(-100%)}.nav-slide-link:hover .nav-slide-bot{transform:translateY(0)}</style></a>' },
    },
  },
  {
    id: 'el-sticky-header-bg',
    label: 'Sticky Header Background',
    category: 'elements', subcategory: 'navigation',
    tags: ['header', 'sticky', 'background', 'transparent', 'scroll', 'transition'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Sticky Header BG',
      defaultStyle: { width: '100%', height: '64px' },
      defaultContent: { html: '<div class="sticky-header-demo" style="width:100%;display:flex;gap:0;height:100%"><div style="flex:1;height:100%;display:flex;align-items:center;justify-content:center;background:transparent;border:1px dashed rgba(255,255,255,0.1);border-radius:8px;position:relative"><span style="font-size:0.75rem;color:rgba(255,255,255,0.3);letter-spacing:0.05em;text-transform:uppercase">Transparent</span><span style="position:absolute;top:8px;left:12px;font-size:0.625rem;color:rgba(255,255,255,0.2)">scroll top</span></div><div style="flex:1;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(10,10,10,0.85);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08);border-radius:8px;position:relative"><span style="font-size:0.75rem;color:rgba(255,255,255,0.6);letter-spacing:0.05em;text-transform:uppercase">Solid</span><span style="position:absolute;top:8px;left:12px;font-size:0.625rem;color:rgba(255,255,255,0.2)">scrolled</span></div></div>' },
    },
  },
]

export const LIBRARY_ELEMENTS: LibraryElementItem[] = [
  ...HEADINGS,
  ...TEXTS,
  ...DIVIDERS,
  ...SPACERS,
  ...CONTAINERS,
  ...DECORATIVE,
  ...SECTION_DIVIDERS,
  ...COLOR_PALETTES,
  ...NAVIGATION,
]
