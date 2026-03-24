// ─────────────────────────────────────────────
// LIBRARY — Elements presets (neutral premium defaults)
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
      defaultStyle: { fontSize: '4.5rem', fontWeight: 500, lineHeight: '1.1', letterSpacing: '-0.03em', color: '#f5f5f5' },
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
      defaultStyle: { fontSize: '2.5rem', fontWeight: 500, lineHeight: '1.15', letterSpacing: '-0.02em', color: '#0f172a' },
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
      defaultStyle: { fontSize: '2.5rem', fontWeight: 500, lineHeight: '1.15', letterSpacing: '-0.02em', color: '#f5f5f5' },
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

  // ─── Universe headings ───

  // Warm — Aman/Aesop serif elegance
  {
    id: 'el-heading-warm-serif',
    label: 'Warm Serif Display',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'warm', 'serif', 'h1', 'earthy'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Warm Serif',
      defaultStyle: { fontSize: '3.5rem', fontWeight: 300, lineHeight: '1.1', letterSpacing: '-0.02em', color: '#3d2b1f', fontFamily: 'Georgia, serif' },
      defaultContent: { text: 'Crafted with\nIntention', tag: 'h1' },
    },
  },
  {
    id: 'el-heading-warm-section',
    label: 'Warm Section Heading',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'warm', 'section', 'h2', 'terracotta'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Warm Section',
      defaultStyle: { fontSize: '2.25rem', fontWeight: 400, lineHeight: '1.2', letterSpacing: '-0.01em', color: '#b4654a' },
      defaultContent: { text: 'Our Philosophy', tag: 'h2' },
    },
  },
  // Playful — Duolingo/Figma bouncy rounded
  {
    id: 'el-heading-playful-bold',
    label: 'Playful Bold Display',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'playful', 'bold', 'h1', 'fun'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Playful Bold',
      defaultStyle: { fontSize: '4rem', fontWeight: 800, lineHeight: '1.05', letterSpacing: '-0.03em', color: '#7c3aed' },
      defaultContent: { text: 'Make it\nawesome!', tag: 'h1' },
    },
  },
  {
    id: 'el-heading-playful-section',
    label: 'Playful Section',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'playful', 'section', 'h2', 'colorful'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Playful Section',
      defaultStyle: { fontSize: '2.25rem', fontWeight: 700, lineHeight: '1.2', color: '#18181b' },
      defaultContent: { text: 'How it works', tag: 'h2' },
    },
  },
  // Retro — Vintage slab/deco
  {
    id: 'el-heading-retro-slab',
    label: 'Retro Slab Display',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'retro', 'slab', 'h1', 'vintage'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Retro Slab',
      defaultStyle: { fontSize: '3.75rem', fontWeight: 900, lineHeight: '1.05', letterSpacing: '0.02em', textTransform: 'uppercase', color: '#92400e' },
      defaultContent: { text: 'GOOD\nOLD DAYS', tag: 'h1' },
    },
  },
  {
    id: 'el-heading-retro-deco',
    label: 'Retro Art Deco',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'retro', 'deco', 'h2', 'vintage'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Art Deco',
      defaultStyle: { fontSize: '2.5rem', fontWeight: 300, lineHeight: '1.15', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#451a03' },
      defaultContent: { text: 'THE EXPERIENCE', tag: 'h2' },
    },
  },
  // Dark Premium — Thin/gold luxury
  {
    id: 'el-heading-dark-prem-thin',
    label: 'Dark Premium Thin',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'dark-premium', 'thin', 'h1', 'luxury'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Dark Thin',
      defaultStyle: { fontSize: '4rem', fontWeight: 200, lineHeight: '1.1', letterSpacing: '0.05em', color: '#fafaf9' },
      defaultContent: { text: 'TIMELESS\nELEGANCE', tag: 'h1' },
    },
  },
  {
    id: 'el-heading-dark-prem-gold',
    label: 'Dark Premium Gold',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'dark-premium', 'gold', 'h2', 'luxury'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Gold Heading',
      defaultStyle: { fontSize: '2.5rem', fontWeight: 300, lineHeight: '1.2', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d4af37' },
      defaultContent: { text: 'THE COLLECTION', tag: 'h2' },
    },
  },
  // Editorial — Magazine display XXL
  {
    id: 'el-heading-editorial-display',
    label: 'Editorial Display XXL',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'editorial', 'display', 'h1', 'magazine'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Editorial Display',
      defaultStyle: { fontSize: '5.5rem', fontWeight: 400, lineHeight: '0.95', letterSpacing: '-0.04em', color: '#18181b', fontFamily: 'Georgia, serif' },
      defaultContent: { text: 'The Art of\nStorytelling', tag: 'h1' },
    },
  },
  {
    id: 'el-heading-editorial-section',
    label: 'Editorial Section',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'editorial', 'section', 'h2', 'serif'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Editorial Section',
      defaultStyle: { fontSize: '2rem', fontWeight: 400, lineHeight: '1.3', letterSpacing: '-0.01em', color: '#18181b', fontFamily: 'Georgia, serif', fontStyle: 'italic' },
      defaultContent: { text: 'A deeper perspective', tag: 'h2' },
    },
  },
  // Organic — Nature flowing
  {
    id: 'el-heading-organic-nature',
    label: 'Organic Nature Display',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'organic', 'nature', 'h1', 'green'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Organic Display',
      defaultStyle: { fontSize: '3.5rem', fontWeight: 300, lineHeight: '1.15', letterSpacing: '-0.02em', color: '#1a2e05', fontFamily: 'Georgia, serif' },
      defaultContent: { text: 'Rooted in\nNature', tag: 'h1' },
    },
  },
  {
    id: 'el-heading-organic-section',
    label: 'Organic Section',
    category: 'elements', subcategory: 'headings',
    tags: ['heading', 'organic', 'section', 'h2', 'leaf'],
    dropType: 'element',
    elementDef: {
      type: 'custom-heading', label: 'Organic Section',
      defaultStyle: { fontSize: '2.25rem', fontWeight: 400, lineHeight: '1.25', color: '#3f6212' },
      defaultContent: { text: 'Sustainable Living', tag: 'h2' },
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
      defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8' },
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
      defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1e293b' },
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
      defaultContent: { text: 'Nous concevons des expériences digitales sur-mesure qui transforment votre vision en réalité. Chaque projet est une collaboration unique.' },
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
      defaultContent: { text: 'Notre approche combine créativité et expertise technique pour des résultats qui dépassent vos attentes. Découvrez notre univers.' },
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
      defaultStyle: { fontSize: '2.5rem', fontWeight: 600, color: '#f5f5f5', lineHeight: '1' },
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
      defaultStyle: { fontSize: '3.5rem', fontWeight: 700, lineHeight: '1', color: '#f5f5f5' },
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
      defaultStyle: { fontSize: '4rem', fontWeight: 300, lineHeight: '1', color: '#94a3b8', opacity: 0.5 },
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
      defaultContent: { html: '<span style="display:inline-flex;align-items:baseline;gap:2px"><span style="font-size:2.5rem;font-weight:700;color:#f5f5f5;line-height:1">\u20AC29</span><span style="font-size:0.875rem;font-weight:400;color:rgba(255,255,255,0.4)">/mois</span></span>' },
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

  // ─── Universe texts ───

  {
    id: 'el-text-warm-lead',
    label: 'Warm Lead Text',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'warm', 'lead', 'earthy', 'serif'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Warm Lead',
      defaultStyle: { fontSize: '1.125rem', lineHeight: '1.75', color: '#78593e', fontFamily: 'Georgia, serif' },
      defaultContent: { text: 'Every detail has been considered with care, creating spaces that feel both timeless and deeply personal.' },
    },
  },
  {
    id: 'el-text-playful-lead',
    label: 'Playful Lead Text',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'playful', 'lead', 'fun'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Playful Lead',
      defaultStyle: { fontSize: '1.1875rem', lineHeight: '1.7', color: '#52525b', fontWeight: 500 },
      defaultContent: { text: 'We believe great products should be fun to use. That\'s why we obsess over every interaction.' },
    },
  },
  {
    id: 'el-text-retro-body',
    label: 'Retro Body Text',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'retro', 'body', 'vintage'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Retro Body',
      defaultStyle: { fontSize: '1rem', lineHeight: '1.8', color: '#57534e', letterSpacing: '0.01em' },
      defaultContent: { text: 'In a world of fleeting trends, we champion the enduring. Our craft is a bridge between the soul of yesterday and the spirit of tomorrow.' },
    },
  },
  {
    id: 'el-text-dark-prem-lead',
    label: 'Dark Premium Lead',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'dark-premium', 'lead', 'luxury'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Dark Premium Lead',
      defaultStyle: { fontSize: '1.125rem', lineHeight: '1.75', color: 'rgba(212,175,55,0.7)', letterSpacing: '0.02em' },
      defaultContent: { text: 'An exclusive experience reserved for those who appreciate the finest things in life.' },
    },
  },
  {
    id: 'el-text-editorial-lead',
    label: 'Editorial Lead',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'editorial', 'lead', 'magazine', 'serif'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Editorial Lead',
      defaultStyle: { fontSize: '1.375rem', lineHeight: '1.65', color: '#3f3f46', fontFamily: 'Georgia, serif' },
      defaultContent: { text: 'The conversation around design has shifted. What was once considered radical is now essential, and what follows will redefine the landscape entirely.' },
    },
  },
  {
    id: 'el-text-organic-lead',
    label: 'Organic Lead Text',
    category: 'elements', subcategory: 'text',
    tags: ['text', 'organic', 'lead', 'nature'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Organic Lead',
      defaultStyle: { fontSize: '1.125rem', lineHeight: '1.8', color: '#4d7c0f' },
      defaultContent: { text: 'Grown from the earth, shaped by the seasons. Our commitment to sustainability runs through everything we create.' },
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
      defaultContent: { html: '<div style="width:100%;height:1px;background:linear-gradient(90deg,transparent,#94a3b8,transparent)"></div>' },
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
      defaultContent: { html: '<div style="width:100%;height:100%;background:#1e293b;border-radius:99px"></div>' },
    },
  },

  // ─── Universe dividers ───

  {
    id: 'el-divider-warm-terracotta',
    label: 'Warm Terracotta Line',
    category: 'elements', subcategory: 'dividers',
    tags: ['divider', 'warm', 'terracotta', 'earthy'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Warm Line',
      defaultStyle: { width: '80px', height: '2px' },
      defaultContent: { html: '<div style="width:100%;height:100%;background:linear-gradient(90deg,#b4654a,rgba(180,101,74,0.2))"></div>' },
    },
  },
  {
    id: 'el-divider-playful-gradient',
    label: 'Playful Rainbow Line',
    category: 'elements', subcategory: 'dividers',
    tags: ['divider', 'playful', 'gradient', 'colorful'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Rainbow Line',
      defaultStyle: { width: '100%', height: '3px' },
      defaultContent: { html: '<div style="width:100%;height:100%;background:linear-gradient(90deg,#7c3aed,#ec4899,#f59e0b,#10b981);border-radius:99px"></div>' },
    },
  },
  {
    id: 'el-divider-retro-dashed',
    label: 'Retro Dashed Line',
    category: 'elements', subcategory: 'dividers',
    tags: ['divider', 'retro', 'dashed', 'vintage'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Retro Dashed',
      defaultStyle: { width: '100%', height: '2px' },
      defaultContent: { html: '<div style="width:100%;border-top:2px dashed #92400e"></div>' },
    },
  },
  {
    id: 'el-divider-dark-prem-gold',
    label: 'Dark Gold Line',
    category: 'elements', subcategory: 'dividers',
    tags: ['divider', 'dark-premium', 'gold', 'luxury'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Gold Line',
      defaultStyle: { width: '100%', height: '1px' },
      defaultContent: { html: '<div style="width:100%;height:1px;background:linear-gradient(90deg,transparent,#d4af37,transparent)"></div>' },
    },
  },
  {
    id: 'el-divider-editorial-rule',
    label: 'Editorial Rule',
    category: 'elements', subcategory: 'dividers',
    tags: ['divider', 'editorial', 'rule', 'magazine'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Editorial Rule',
      defaultStyle: { width: '100%', height: '2px' },
      defaultContent: { html: '<div style="width:100%;height:2px;background:#18181b"></div>' },
    },
  },
  {
    id: 'el-divider-organic-leaf',
    label: 'Organic Leaf Line',
    category: 'elements', subcategory: 'dividers',
    tags: ['divider', 'organic', 'leaf', 'nature'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Organic Line',
      defaultStyle: { width: '120px', height: '2px' },
      defaultContent: { html: '<div style="width:100%;height:100%;background:linear-gradient(90deg,transparent,#3f6212,transparent);border-radius:99px"></div>' },
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
        backgroundColor: '#0f172a',
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
    tags: ['container', 'cream', 'warm', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Cream Panel',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2.5rem',
        backgroundColor: '#f5f5f5',
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

  // ─── Universe containers ───

  {
    id: 'el-container-warm-linen',
    label: 'Warm Linen Panel',
    category: 'elements', subcategory: 'containers',
    tags: ['container', 'warm', 'linen', 'earthy'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Warm Linen',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '2.5rem',
        backgroundColor: '#faf7f2',
        borderRadius: '0.25rem',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(180,101,74,0.15)',
      },
      defaultContent: {},
    },
  },
  {
    id: 'el-container-playful-bubble',
    label: 'Playful Bubble',
    category: 'elements', subcategory: 'containers',
    tags: ['container', 'playful', 'bubble', 'fun', 'rounded'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Playful Bubble',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem',
        backgroundColor: '#faf5ff',
        borderRadius: '1.5rem',
        borderWidth: '2px', borderStyle: 'solid', borderColor: '#e9d5ff',
        boxShadow: '0 4px 20px rgba(124,58,237,0.08)',
      },
      defaultContent: {},
    },
  },
  {
    id: 'el-container-retro-frame',
    label: 'Retro Frame',
    category: 'elements', subcategory: 'containers',
    tags: ['container', 'retro', 'frame', 'vintage'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Retro Frame',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem',
        backgroundColor: '#fffbeb',
        borderRadius: '0',
        borderWidth: '3px', borderStyle: 'solid', borderColor: '#92400e',
      },
      defaultContent: {},
    },
  },
  {
    id: 'el-container-dark-prem-obsidian',
    label: 'Dark Obsidian Panel',
    category: 'elements', subcategory: 'containers',
    tags: ['container', 'dark-premium', 'obsidian', 'luxury'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Obsidian Panel',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '2.5rem',
        backgroundColor: '#0a0a0a',
        borderRadius: '0',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(212,175,55,0.2)',
      },
      defaultContent: {},
    },
  },
  {
    id: 'el-container-editorial-bordered',
    label: 'Editorial Bordered',
    category: 'elements', subcategory: 'containers',
    tags: ['container', 'editorial', 'bordered', 'magazine'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Editorial Box',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem',
        backgroundColor: '#fafaf9',
        borderRadius: '0',
        borderWidth: '1px', borderStyle: 'solid', borderColor: '#18181b',
      },
      defaultContent: {},
    },
  },
  {
    id: 'el-container-organic-leaf',
    label: 'Organic Leaf Panel',
    category: 'elements', subcategory: 'containers',
    tags: ['container', 'organic', 'leaf', 'nature'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Organic Panel',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem',
        backgroundColor: '#f7fee7',
        borderRadius: '1rem',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(63,98,18,0.15)',
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
      defaultContent: { html: '<div style="width:100%;height:2px;background:linear-gradient(90deg,#94a3b8,transparent);transform:scaleX(0);transform-origin:left;animation:dividerIn 1.5s ease-out forwards"><style>@keyframes dividerIn{to{transform:scaleX(1)}}</style></div>' },
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
      defaultContent: { html: '<div style="position:relative;width:100%;height:100%;overflow:hidden;pointer-events:none"><svg style="position:absolute;top:10%;left:15%;opacity:0.08;animation:floatA 8s ease-in-out infinite" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="35" fill="#94a3b8"/></svg><svg style="position:absolute;top:50%;right:20%;opacity:0.1;animation:floatB 12s ease-in-out infinite" width="60" height="60" viewBox="0 0 60 60"><rect x="10" y="10" width="40" height="40" rx="8" fill="#8b6f4e" transform="rotate(30 30 30)"/></svg><svg style="position:absolute;bottom:15%;left:40%;opacity:0.12;animation:floatC 10s ease-in-out infinite" width="70" height="70" viewBox="0 0 70 70"><polygon points="35,5 65,60 5,60" fill="#a67c52"/></svg><style>@keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}@keyframes floatB{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-15px) rotate(10deg)}}@keyframes floatC{0%,100%{transform:translateY(0)}50%{transform:translateY(-25px)}}</style></div>' },
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
      defaultContent: { html: '<svg viewBox="0 0 1920 160" preserveAspectRatio="none" style="width:100%;height:100%;display:block"><path d="M0,64 C320,128 640,0 960,64 C1280,128 1600,0 1920,64 L1920,160 L0,160 Z" fill="#f5f5f5"/></svg>' },
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
      defaultContent: { html: '<svg viewBox="0 0 1920 160" preserveAspectRatio="none" style="width:100%;height:100%;display:block"><path d="M0,160 L1920,0 L1920,160 Z" fill="#f5f5f5"/></svg>' },
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
      defaultContent: { html: '<svg viewBox="0 0 1920 160" preserveAspectRatio="none" style="width:100%;height:100%;display:block"><path d="M0,160 Q960,0 1920,160 Z" fill="#f5f5f5"/></svg>' },
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
      defaultContent: { html: '<svg viewBox="0 0 1920 160" preserveAspectRatio="none" style="width:100%;height:100%;display:block"><path d="M0,160 L960,0 L1920,160 Z" fill="#f5f5f5"/></svg>' },
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
    id: 'el-palette-immobilier-luxe',
    label: 'Palette Immobilier Luxe',
    category: 'elements', subcategory: 'palettes',
    tags: ['palette', 'colors', 'luxury', 'warm', 'immobilier'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Palette Immobilier Luxe',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: { html: paletteHtml('Immobilier Luxe', [
        { hex: '#f5f5f5', label: 'cream bg' },
        { hex: '#0f172a', label: 'dark text' },
        { hex: '#b8860b', label: 'gold accent' },
        { hex: '#56595a', label: 'muted' },
        { hex: '#1e293b', label: 'brown' },
        { hex: '#94a3b8', label: 'soft gold' },
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
      defaultContent: { html: '<div class="nav-hamburger" style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative"><span class="nav-hamburger-line" style="display:block;width:24px;height:2px;background:#f5f5f5;border-radius:1px;position:absolute;transition:all 0.3s ease"></span><span class="nav-hamburger-line-top" style="display:block;width:24px;height:2px;background:#f5f5f5;border-radius:1px;position:absolute;transform:translateY(-7px);transition:all 0.3s ease"></span><span class="nav-hamburger-line-bot" style="display:block;width:24px;height:2px;background:#f5f5f5;border-radius:1px;position:absolute;transform:translateY(7px);transition:all 0.3s ease"></span><style>.nav-hamburger:hover .nav-hamburger-line{opacity:0}.nav-hamburger:hover .nav-hamburger-line-top{transform:rotate(45deg)}.nav-hamburger:hover .nav-hamburger-line-bot{transform:rotate(-45deg)}</style></div>' },
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
      defaultContent: { html: '<div class="nav-mobile-overlay" style="width:100%;height:100%;background:#0a0a0a;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;gap:0"><div class="nav-mobile-close" style="position:absolute;top:20px;right:24px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><line x1="2" y1="2" x2="18" y2="18" stroke="#f5f5f5" stroke-width="1.5" stroke-linecap="round"/><line x1="18" y1="2" x2="2" y2="18" stroke="#f5f5f5" stroke-width="1.5" stroke-linecap="round"/></svg></div><a class="nav-mobile-link" href="#" style="font-size:1.5rem;font-weight:500;color:#f5f5f5;text-decoration:none;padding:16px 0;transition:color 0.3s ease;letter-spacing:-0.01em">Accueil</a><a class="nav-mobile-link" href="#" style="font-size:1.5rem;font-weight:500;color:#f5f5f5;text-decoration:none;padding:16px 0;transition:color 0.3s ease;letter-spacing:-0.01em">Services</a><a class="nav-mobile-link" href="#" style="font-size:1.5rem;font-weight:500;color:#f5f5f5;text-decoration:none;padding:16px 0;transition:color 0.3s ease;letter-spacing:-0.01em">Portfolio</a><a class="nav-mobile-link" href="#" style="font-size:1.5rem;font-weight:500;color:#f5f5f5;text-decoration:none;padding:16px 0;transition:color 0.3s ease;letter-spacing:-0.01em">A propos</a><a class="nav-mobile-link" href="#" style="font-size:1.5rem;font-weight:500;color:#f5f5f5;text-decoration:none;padding:16px 0;transition:color 0.3s ease;letter-spacing:-0.01em">Contact</a><style>.nav-mobile-link:hover{color:#94a3b8!important}</style></div>' },
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
      defaultContent: { html: '<div class="nav-mega" style="width:100%;height:100%;background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:32px 40px;display:grid;grid-template-columns:repeat(3,1fr);gap:32px;box-sizing:border-box"><div class="nav-mega-col"><span class="nav-mega-title" style="display:block;font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;margin-bottom:16px">Produits</span><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Application Web</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Application Mobile</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">API & Integrations</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Analytics</a></div><div class="nav-mega-col"><span class="nav-mega-title" style="display:block;font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;margin-bottom:16px">Ressources</span><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Documentation</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Guides</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Blog</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Changelog</a></div><div class="nav-mega-col"><span class="nav-mega-title" style="display:block;font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;margin-bottom:16px">Entreprise</span><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">A propos</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Carrieres</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Partenaires</a><a class="nav-mega-link" href="#" style="display:block;font-size:0.9375rem;color:rgba(225,225,225,0.5);text-decoration:none;padding:6px 0;transition:color 0.3s ease">Contact</a></div><style>.nav-mega-link:hover{color:#f5f5f5!important}</style></div>' },
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
          defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#f5f5f5', marginBottom: '16px' },
          defaultContent: { text: 'Navigation', tag: 'h4' },
        },
        {
          type: 'custom-embed', label: 'Footer Links',
          defaultStyle: { width: '100%' },
          defaultContent: { html: '<div class="footer-col-links" style="display:flex;flex-direction:column;gap:10px"><a class="footer-col-link" href="#" style="font-size:0.875rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">Accueil</a><a class="footer-col-link" href="#" style="font-size:0.875rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">Services</a><a class="footer-col-link" href="#" style="font-size:0.875rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">Portfolio</a><a class="footer-col-link" href="#" style="font-size:0.875rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">A propos</a><a class="footer-col-link" href="#" style="font-size:0.875rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">Contact</a><style>.footer-col-link:hover{color:#94a3b8!important}</style></div>' },
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
      defaultContent: { html: '<div class="footer-bar" style="width:100%;border-top:1px solid rgba(255,255,255,0.08);padding:20px 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px"><span class="footer-bar-copy" style="font-size:0.8125rem;color:rgba(255,255,255,0.3)">\u00A9 2026 Brand. Tous droits r\u00E9serv\u00E9s.</span><div class="footer-bar-legal" style="display:flex;gap:20px"><a class="footer-bar-link" href="#" style="font-size:0.8125rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">Mentions l\u00E9gales</a><a class="footer-bar-link" href="#" style="font-size:0.8125rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">Confidentialit\u00E9</a><a class="footer-bar-link" href="#" style="font-size:0.8125rem;color:rgba(225,225,225,0.5);text-decoration:none;transition:color 0.3s ease">CGV</a></div><div class="footer-bar-status" style="display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:#22c55e;display:inline-block"></span><span style="font-size:0.75rem;color:rgba(255,255,255,0.4)">Tous les syst\u00E8mes op\u00E9rationnels</span></div><style>.footer-bar-link:hover{color:#94a3b8!important}</style></div>' },
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
      defaultContent: { html: '<div class="footer-brand" style="display:flex;flex-direction:column;gap:16px"><span class="footer-brand-logo" style="font-size:1.375rem;font-weight:700;color:#f5f5f5;letter-spacing:-0.02em">Brand.</span><p class="footer-brand-tagline" style="font-size:0.875rem;line-height:1.6;color:rgba(225,225,225,0.5);max-width:280px;margin:0">Crafting exceptional digital experiences for ambitious brands since 2020.</p><div class="footer-brand-social" style="display:flex;gap:12px;margin-top:4px"><a class="footer-brand-icon" href="#" style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;text-decoration:none"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5" stroke-linecap="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a><a class="footer-brand-icon" href="#" style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;text-decoration:none"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="#f5f5f5" stroke="none"/></svg></a><a class="footer-brand-icon" href="#" style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;text-decoration:none"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5" stroke-linecap="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a><a class="footer-brand-icon" href="#" style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;text-decoration:none"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5" stroke-linecap="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a></div><style>.footer-brand-icon:hover{background:rgba(255,255,255,0.08)!important;border-color:rgba(255,255,255,0.15)!important}</style></div>' },
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
      defaultContent: { html: '<a class="nav-slide-link" href="#" style="position:relative;display:inline-block;overflow:hidden;text-decoration:none;font-size:0.9375rem;font-weight:500;color:#f5f5f5;height:1.4em;line-height:1.4"><span class="nav-slide-top" style="display:block;transition:transform 0.3s ease">Services</span><span class="nav-slide-bot" style="display:block;position:absolute;top:0;left:0;color:#94a3b8;transform:translateY(100%);transition:transform 0.3s ease">Services</span><style>.nav-slide-link:hover .nav-slide-top{transform:translateY(-100%)}.nav-slide-link:hover .nav-slide-bot{transform:translateY(0)}</style></a>' },
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

// ─── FORM INPUTS ───

const FORM_INPUTS: LibraryElementItem[] = [
  {
    id: 'el-input-text',
    label: 'Text Input',
    category: 'elements', subcategory: 'inputs',
    tags: ['input', 'text', 'form', 'field', 'name'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Text Input',
      defaultStyle: { width: '100%', minHeight: '48px' },
      defaultContent: {
        html: `<div class="jl-inp-text" style="width:100%;font-family:system-ui,-apple-system,sans-serif"><label style="display:block;font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.6);margin-bottom:8px;letter-spacing:0.02em">Full Name</label><input type="text" placeholder="Your name" style="width:100%;height:48px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:0 16px;font-size:0.9375rem;color:#f5f5f5;outline:none;box-sizing:border-box;transition:all 0.25s ease" onfocus="this.style.borderColor='rgba(99,139,255,0.6)';this.style.boxShadow='0 0 0 3px rgba(99,139,255,0.15)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)';this.style.boxShadow='none'"/></div>`
      }
    }
  },
  {
    id: 'el-input-email',
    label: 'Email Input',
    category: 'elements', subcategory: 'inputs',
    tags: ['input', 'email', 'form', 'field', 'icon'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Email Input',
      defaultStyle: { width: '100%', minHeight: '48px' },
      defaultContent: {
        html: `<div class="jl-inp-email" style="width:100%;font-family:system-ui,-apple-system,sans-serif"><label style="display:block;font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.6);margin-bottom:8px;letter-spacing:0.02em">Email Address</label><div style="position:relative"><svg style="position:absolute;left:14px;top:50%;transform:translateY(-50%);pointer-events:none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(246,239,229,0.35)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg><input type="email" placeholder="email@example.com" style="width:100%;height:48px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:0 16px 0 42px;font-size:0.9375rem;color:#f5f5f5;outline:none;box-sizing:border-box;transition:all 0.25s ease" onfocus="this.style.borderColor='rgba(99,139,255,0.6)';this.style.boxShadow='0 0 0 3px rgba(99,139,255,0.15)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)';this.style.boxShadow='none'"/></div></div>`
      }
    }
  },
  {
    id: 'el-input-password',
    label: 'Password Input',
    category: 'elements', subcategory: 'inputs',
    tags: ['input', 'password', 'form', 'field', 'toggle', 'eye'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Password Input',
      defaultStyle: { width: '100%', minHeight: '48px' },
      defaultContent: {
        html: `<div class="jl-inp-pwd" style="width:100%;font-family:system-ui,-apple-system,sans-serif"><label style="display:block;font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.6);margin-bottom:8px;letter-spacing:0.02em">Password</label><div style="position:relative"><input id="jl-pwd-field" type="password" value="mypassword" style="width:100%;height:48px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:0 48px 0 16px;font-size:0.9375rem;color:#f5f5f5;outline:none;box-sizing:border-box;transition:all 0.25s ease" onfocus="this.style.borderColor='rgba(99,139,255,0.6)';this.style.boxShadow='0 0 0 3px rgba(99,139,255,0.15)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)';this.style.boxShadow='none'"/><button onclick="var f=document.getElementById('jl-pwd-field');f.type=f.type==='password'?'text':'password'" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);width:36px;height:36px;background:none;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:8px;transition:background 0.2s" onmouseenter="this.style.background='rgba(255,255,255,0.06)'" onmouseleave="this.style.background='none'"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(246,239,229,0.4)" stroke-width="1.5" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button></div></div>`
      }
    }
  },
  {
    id: 'el-input-textarea',
    label: 'Textarea',
    category: 'elements', subcategory: 'inputs',
    tags: ['input', 'textarea', 'form', 'field', 'multiline', 'message'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Textarea',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: {
        html: `<div class="jl-inp-ta" style="width:100%;font-family:system-ui,-apple-system,sans-serif"><label style="display:block;font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.6);margin-bottom:8px;letter-spacing:0.02em">Message</label><textarea rows="4" placeholder="Write your message..." style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:14px 16px;font-size:0.9375rem;color:#f5f5f5;outline:none;box-sizing:border-box;resize:vertical;font-family:inherit;line-height:1.5;transition:all 0.25s ease;min-height:110px" onfocus="this.style.borderColor='rgba(99,139,255,0.6)';this.style.boxShadow='0 0 0 3px rgba(99,139,255,0.15)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)';this.style.boxShadow='none'"></textarea></div>`
      }
    }
  },
  {
    id: 'el-input-select',
    label: 'Select / Dropdown',
    category: 'elements', subcategory: 'inputs',
    tags: ['input', 'select', 'dropdown', 'form', 'field', 'chevron'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Select Dropdown',
      defaultStyle: { width: '100%', minHeight: '48px' },
      defaultContent: {
        html: `<div class="jl-inp-sel" style="width:100%;font-family:system-ui,-apple-system,sans-serif"><label style="display:block;font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.6);margin-bottom:8px;letter-spacing:0.02em">Category</label><div style="position:relative"><select style="width:100%;height:48px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:0 40px 0 16px;font-size:0.9375rem;color:#f5f5f5;outline:none;box-sizing:border-box;appearance:none;-webkit-appearance:none;cursor:pointer;transition:all 0.25s ease" onfocus="this.style.borderColor='rgba(99,139,255,0.6)';this.style.boxShadow='0 0 0 3px rgba(99,139,255,0.15)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)';this.style.boxShadow='none'"><option value="" style="background:#1a1a1a">Select an option</option><option value="design" style="background:#1a1a1a">Design</option><option value="development" style="background:#1a1a1a">Development</option><option value="marketing" style="background:#1a1a1a">Marketing</option></select><svg style="position:absolute;right:14px;top:50%;transform:translateY(-50%);pointer-events:none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(246,239,229,0.4)" stroke-width="2" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div></div>`
      }
    }
  },
  {
    id: 'el-input-file',
    label: 'File Upload',
    category: 'elements', subcategory: 'inputs',
    tags: ['input', 'file', 'upload', 'form', 'dropzone', 'drag'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'File Upload',
      defaultStyle: { width: '100%', minHeight: '140px' },
      defaultContent: {
        html: `<div class="jl-inp-file" style="width:100%;font-family:system-ui,-apple-system,sans-serif"><div class="jl-dropzone" style="width:100%;min-height:130px;border:2px dashed rgba(255,255,255,0.12);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;cursor:pointer;transition:all 0.3s ease;padding:24px;box-sizing:border-box" onmouseenter="this.style.borderColor='rgba(99,139,255,0.4)';this.style.background='rgba(99,139,255,0.04)'" onmouseleave="this.style.borderColor='rgba(255,255,255,0.12)';this.style.background='transparent'"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(246,239,229,0.3)" stroke-width="1.5" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><span style="font-size:0.9375rem;color:rgba(246,239,229,0.5);font-weight:500">Drop files or click to upload</span><span style="font-size:0.75rem;color:rgba(246,239,229,0.25)">PNG, JPG, PDF up to 10MB</span></div></div>`
      }
    }
  },
  {
    id: 'el-input-range',
    label: 'Range Slider',
    category: 'elements', subcategory: 'inputs',
    tags: ['input', 'range', 'slider', 'form', 'field', 'value'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Range Slider',
      defaultStyle: { width: '100%', minHeight: '56px' },
      defaultContent: {
        html: `<div class="jl-inp-range" style="width:100%;font-family:system-ui,-apple-system,sans-serif"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><label style="font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.6);letter-spacing:0.02em">Budget</label><span id="jl-range-val" style="font-size:0.875rem;font-weight:600;color:#638bff">75%</span></div><style>.jl-range-s::-webkit-slider-runnable-track{height:6px;border-radius:3px;background:linear-gradient(90deg,#638bff 75%,rgba(255,255,255,0.08) 75%)}.jl-range-s::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#638bff;border:3px solid #1a1a1a;margin-top:-7px;cursor:pointer;box-shadow:0 0 0 3px rgba(99,139,255,0.2);transition:box-shadow 0.2s}.jl-range-s::-webkit-slider-thumb:hover{box-shadow:0 0 0 6px rgba(99,139,255,0.2)}</style><input class="jl-range-s" type="range" min="0" max="100" value="75" style="width:100%;appearance:none;-webkit-appearance:none;background:transparent;outline:none;cursor:pointer" oninput="document.getElementById('jl-range-val').textContent=this.value+'%';this.style.setProperty('--v',this.value)"/></div>`
      }
    }
  },
  {
    id: 'el-input-date',
    label: 'Date Input',
    category: 'elements', subcategory: 'inputs',
    tags: ['input', 'date', 'form', 'field', 'calendar', 'picker'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Date Input',
      defaultStyle: { width: '100%', minHeight: '48px' },
      defaultContent: {
        html: `<div class="jl-inp-date" style="width:100%;font-family:system-ui,-apple-system,sans-serif"><label style="display:block;font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.6);margin-bottom:8px;letter-spacing:0.02em">Date</label><div style="position:relative"><svg style="position:absolute;left:14px;top:50%;transform:translateY(-50%);pointer-events:none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(246,239,229,0.35)" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><input type="date" style="width:100%;height:48px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:0 16px 0 42px;font-size:0.9375rem;color:#f5f5f5;outline:none;box-sizing:border-box;transition:all 0.25s ease;color-scheme:dark" onfocus="this.style.borderColor='rgba(99,139,255,0.6)';this.style.boxShadow='0 0 0 3px rgba(99,139,255,0.15)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)';this.style.boxShadow='none'"/></div></div>`
      }
    }
  },
]

// ─── SOCIAL LINKS ───

const SOCIAL_LINKS: LibraryElementItem[] = [
  {
    id: 'el-social-icons-row',
    label: 'Social Icons Row',
    category: 'elements', subcategory: 'social',
    tags: ['social', 'icons', 'row', 'horizontal', 'hover', 'links'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Social Icons Row',
      defaultStyle: { width: '100%', minHeight: '44px' },
      defaultContent: {
        html: `<div class="jl-soc-row" style="display:flex;align-items:center;gap:16px;font-family:system-ui,-apple-system,sans-serif"><style>.jl-soc-row a{display:flex;align-items:center;justify-content:center;width:40px;height:40px;transition:all 0.3s ease;opacity:0.5}.jl-soc-row a:hover{opacity:1;transform:scale(1.15)}</style><a href="#" aria-label="X/Twitter"><svg width="20" height="20" viewBox="0 0 24 24" fill="#f5f5f5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a><a href="#" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="#f5f5f5" stroke="none"/></svg></a><a href="#" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5" stroke-linecap="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a><a href="#" aria-label="GitHub"><svg width="20" height="20" viewBox="0 0 24 24" fill="#f5f5f5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg></a><a href="#" aria-label="YouTube"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5" stroke-linecap="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#f5f5f5" stroke="none"/></svg></a></div>`
      }
    }
  },
  {
    id: 'el-social-icons-circle',
    label: 'Social Icons Circle',
    category: 'elements', subcategory: 'social',
    tags: ['social', 'icons', 'circle', 'hover', 'brand-color', 'links'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Social Icons Circle',
      defaultStyle: { width: '100%', minHeight: '48px' },
      defaultContent: {
        html: `<div class="jl-soc-circle" style="display:flex;align-items:center;gap:12px;font-family:system-ui,-apple-system,sans-serif"><style>.jl-soc-circle a{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);transition:all 0.3s ease;text-decoration:none}.jl-soc-circle a:hover{transform:translateY(-2px)}.jl-soc-c-tw:hover{background:#1d9bf0!important;border-color:#1d9bf0!important}.jl-soc-c-ig:hover{background:#e4405f!important;border-color:#e4405f!important}.jl-soc-c-li:hover{background:#0a66c2!important;border-color:#0a66c2!important}.jl-soc-c-gh:hover{background:#333!important;border-color:#555!important}.jl-soc-c-yt:hover{background:#ff0000!important;border-color:#ff0000!important}</style><a href="#" class="jl-soc-c-tw" aria-label="X/Twitter"><svg width="18" height="18" viewBox="0 0 24 24" fill="#f5f5f5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a><a href="#" class="jl-soc-c-ig" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="#f5f5f5" stroke="none"/></svg></a><a href="#" class="jl-soc-c-li" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a><a href="#" class="jl-soc-c-gh" aria-label="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" fill="#f5f5f5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg></a><a href="#" class="jl-soc-c-yt" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#f5f5f5" stroke="none"/></svg></a></div>`
      }
    }
  },
  {
    id: 'el-social-icons-pill',
    label: 'Social Pill Buttons',
    category: 'elements', subcategory: 'social',
    tags: ['social', 'pill', 'buttons', 'username', 'monochrome', 'links'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Social Pill Buttons',
      defaultStyle: { width: '100%', minHeight: '44px' },
      defaultContent: {
        html: `<div class="jl-soc-pill" style="display:flex;flex-wrap:wrap;gap:10px;font-family:system-ui,-apple-system,sans-serif"><style>.jl-soc-pill a{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:999px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);text-decoration:none;font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.6);transition:all 0.3s ease;white-space:nowrap}.jl-soc-pill a:hover{color:#f5f5f5;background:rgba(99,139,255,0.1);border-color:rgba(99,139,255,0.3)}</style><a href="#"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>@studio</a><a href="#"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/></svg>@studio.design</a><a href="#"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>/in/studio</a><a href="#"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>@studio</a></div>`
      }
    }
  },
  {
    id: 'el-social-share',
    label: 'Share Bar',
    category: 'elements', subcategory: 'social',
    tags: ['social', 'share', 'bar', 'buttons', 'copy', 'links'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Share Bar',
      defaultStyle: { width: '100%', minHeight: '48px' },
      defaultContent: {
        html: `<div class="jl-soc-share" style="display:flex;align-items:center;gap:16px;font-family:system-ui,-apple-system,sans-serif"><span style="font-size:0.8125rem;font-weight:600;color:rgba(246,239,229,0.4);text-transform:uppercase;letter-spacing:0.08em;white-space:nowrap">Share this</span><div style="width:1px;height:20px;background:rgba(255,255,255,0.08)"></div><div style="display:flex;gap:8px"><style>.jl-share-btn{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);cursor:pointer;transition:all 0.3s ease;text-decoration:none}.jl-share-btn:hover{background:rgba(255,255,255,0.08);transform:translateY(-2px)}</style><a href="#" class="jl-share-btn" aria-label="Twitter"><svg width="16" height="16" viewBox="0 0 24 24" fill="#f5f5f5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a><a href="#" class="jl-share-btn" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a><a href="#" class="jl-share-btn" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a><a href="#" class="jl-share-btn" aria-label="Copy Link"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a></div></div>`
      }
    }
  },
  {
    id: 'el-social-follow',
    label: 'Follow Card',
    category: 'elements', subcategory: 'social',
    tags: ['social', 'follow', 'card', 'counts', 'followers', 'cta'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Follow Card',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: {
        html: `<div class="jl-soc-follow" style="width:100%;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:28px 32px;font-family:system-ui,-apple-system,sans-serif"><h4 style="font-size:1.125rem;font-weight:600;color:#f5f5f5;margin:0 0 6px;letter-spacing:-0.01em">Follow us</h4><p style="font-size:0.875rem;color:rgba(246,239,229,0.4);margin:0 0 20px;line-height:1.5">Stay connected and get the latest updates</p><div style="display:flex;flex-wrap:wrap;gap:10px"><style>.jl-follow-btn{display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);text-decoration:none;transition:all 0.3s ease;cursor:pointer}.jl-follow-btn:hover{background:rgba(255,255,255,0.08);transform:translateY(-1px)}.jl-follow-cnt{font-size:0.75rem;color:rgba(246,239,229,0.3);font-weight:500}</style><a href="#" class="jl-follow-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="#f5f5f5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg><span class="jl-follow-cnt">12.4K</span></a><a href="#" class="jl-follow-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="#f5f5f5" stroke="none"/></svg><span class="jl-follow-cnt">8.2K</span></a><a href="#" class="jl-follow-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg><span class="jl-follow-cnt">5.1K</span></a><a href="#" class="jl-follow-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#f5f5f5" stroke="none"/></svg><span class="jl-follow-cnt">3.7K</span></a></div></div>`
      }
    }
  },
  {
    id: 'el-social-icons-minimal',
    label: 'Social Icons Minimal',
    category: 'elements', subcategory: 'social',
    tags: ['social', 'icons', 'minimal', 'footer', 'subtle', 'inline'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Social Icons Minimal',
      defaultStyle: { width: '100%', minHeight: '24px' },
      defaultContent: {
        html: `<div class="jl-soc-min" style="display:flex;align-items:center;gap:20px;font-family:system-ui,-apple-system,sans-serif"><style>.jl-soc-min a{display:inline-flex;color:rgba(246,239,229,0.3);transition:color 0.3s ease;text-decoration:none}.jl-soc-min a:hover{color:#f5f5f5}</style><a href="#" aria-label="Twitter"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a><a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/></svg></a><a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a><a href="#" aria-label="GitHub"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg></a></div>`
      }
    }
  },
]

// ─── PROGRESS ───

const PROGRESS: LibraryElementItem[] = [
  {
    id: 'el-progress-bar',
    label: 'Progress Bar',
    category: 'elements', subcategory: 'progress',
    tags: ['progress', 'bar', 'percentage', 'fill', 'animated'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Progress Bar',
      defaultStyle: { width: '100%', minHeight: '48px' },
      defaultContent: {
        html: `<div class="jl-prog-bar" style="width:100%;font-family:system-ui,-apple-system,sans-serif"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.6)">Progress</span><span style="font-size:0.8125rem;font-weight:600;color:#638bff">72%</span></div><div style="width:100%;height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden"><div style="width:72%;height:100%;background:linear-gradient(90deg,#638bff,#8b5cf6);border-radius:4px;animation:jl-prog-fill 1.5s ease-out forwards"></div></div><style>@keyframes jl-prog-fill{from{width:0}to{width:72%}}</style></div>`
      }
    }
  },
  {
    id: 'el-progress-circle',
    label: 'Circular Progress',
    category: 'elements', subcategory: 'progress',
    tags: ['progress', 'circle', 'donut', 'svg', 'animated', 'percentage'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Circular Progress',
      defaultStyle: { width: '140px', minHeight: '140px' },
      defaultContent: {
        html: `<div class="jl-prog-circ" style="width:140px;height:140px;position:relative;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif"><svg width="140" height="140" viewBox="0 0 140 140" style="transform:rotate(-90deg)"><circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/><circle cx="70" cy="70" r="58" fill="none" stroke="url(#jl-prog-grad)" stroke-width="8" stroke-linecap="round" stroke-dasharray="364.42" stroke-dashoffset="91.1" style="animation:jl-circ-fill 1.5s ease-out forwards"><animate attributeName="stroke-dashoffset" from="364.42" to="91.1" dur="1.5s" fill="freeze" calcMode="spline" keySplines="0.25 0.1 0.25 1"/></circle><defs><linearGradient id="jl-prog-grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#638bff"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs></svg><div style="position:absolute;text-align:center"><span style="font-size:2rem;font-weight:700;color:#f5f5f5;letter-spacing:-0.02em">75</span><span style="font-size:0.875rem;font-weight:500;color:rgba(246,239,229,0.4)">%</span></div></div>`
      }
    }
  },
  {
    id: 'el-progress-steps',
    label: 'Step Indicator',
    category: 'elements', subcategory: 'progress',
    tags: ['progress', 'steps', 'indicator', 'numbered', 'wizard', 'stepper'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Step Indicator',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: {
        html: `<div class="jl-prog-steps" style="width:100%;display:flex;align-items:center;justify-content:center;gap:0;font-family:system-ui,-apple-system,sans-serif"><style>.jl-step-dot{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.8125rem;font-weight:600;flex-shrink:0;transition:all 0.3s ease}.jl-step-line{flex:1;height:2px;max-width:80px;min-width:40px}.jl-step-done{background:#22c55e;color:#fff}.jl-step-active{background:#638bff;color:#fff;box-shadow:0 0 0 4px rgba(99,139,255,0.2)}.jl-step-pending{background:rgba(255,255,255,0.06);color:rgba(246,239,229,0.3);border:1px solid rgba(255,255,255,0.08)}.jl-line-done{background:#22c55e}.jl-line-pending{background:rgba(255,255,255,0.08)}</style><div class="jl-step-dot jl-step-done"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg></div><div class="jl-step-line jl-line-done"></div><div class="jl-step-dot jl-step-active">2</div><div class="jl-step-line jl-line-pending"></div><div class="jl-step-dot jl-step-pending">3</div><div class="jl-step-line jl-line-pending"></div><div class="jl-step-dot jl-step-pending">4</div></div>`
      }
    }
  },
  {
    id: 'el-progress-skills',
    label: 'Skills Bars',
    category: 'elements', subcategory: 'progress',
    tags: ['progress', 'skills', 'bars', 'labeled', 'animated', 'multiple'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Skills Bars',
      defaultStyle: { width: '100%', minHeight: '180px' },
      defaultContent: {
        html: `<div class="jl-prog-skills" style="width:100%;display:flex;flex-direction:column;gap:18px;font-family:system-ui,-apple-system,sans-serif"><style>@keyframes jl-skill-fill{from{width:0}}.jl-skill-bar{height:6px;border-radius:3px;animation:jl-skill-fill 1.2s ease-out forwards}</style><div><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.7)">Design</span><span style="font-size:0.8125rem;font-weight:600;color:rgba(246,239,229,0.4)">90%</span></div><div style="width:100%;height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden"><div class="jl-skill-bar" style="width:90%;background:linear-gradient(90deg,#638bff,#818cf8)"></div></div></div><div><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.7)">Development</span><span style="font-size:0.8125rem;font-weight:600;color:rgba(246,239,229,0.4)">85%</span></div><div style="width:100%;height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden"><div class="jl-skill-bar" style="width:85%;background:linear-gradient(90deg,#8b5cf6,#a78bfa)"></div></div></div><div><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.7)">SEO</span><span style="font-size:0.8125rem;font-weight:600;color:rgba(246,239,229,0.4)">70%</span></div><div style="width:100%;height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden"><div class="jl-skill-bar" style="width:70%;background:linear-gradient(90deg,#22c55e,#4ade80)"></div></div></div><div><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.7)">UX Research</span><span style="font-size:0.8125rem;font-weight:600;color:rgba(246,239,229,0.4)">95%</span></div><div style="width:100%;height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden"><div class="jl-skill-bar" style="width:95%;background:linear-gradient(90deg,#f59e0b,#fbbf24)"></div></div></div></div>`
      }
    }
  },
  {
    id: 'el-progress-stats',
    label: 'Stats Counter',
    category: 'elements', subcategory: 'progress',
    tags: ['progress', 'stats', 'counter', 'numbers', 'metrics', 'animated'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Stats Counter',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: {
        html: `<div class="jl-prog-stats" style="width:100%;display:flex;justify-content:center;gap:48px;flex-wrap:wrap;font-family:system-ui,-apple-system,sans-serif"><style>@keyframes jl-stat-up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.jl-stat-item{text-align:center;animation:jl-stat-up 0.6s ease-out forwards;opacity:0}.jl-stat-item:nth-child(1){animation-delay:0s}.jl-stat-item:nth-child(2){animation-delay:0.15s}.jl-stat-item:nth-child(3){animation-delay:0.3s}</style><div class="jl-stat-item"><div style="font-size:2.5rem;font-weight:700;color:#f5f5f5;letter-spacing:-0.03em;line-height:1">150<span style="color:#638bff">+</span></div><div style="font-size:0.8125rem;color:rgba(246,239,229,0.4);margin-top:6px;font-weight:500">Projects Delivered</div></div><div class="jl-stat-item"><div style="font-size:2.5rem;font-weight:700;color:#f5f5f5;letter-spacing:-0.03em;line-height:1">98<span style="color:#22c55e">%</span></div><div style="font-size:0.8125rem;color:rgba(246,239,229,0.4);margin-top:6px;font-weight:500">Client Satisfaction</div></div><div class="jl-stat-item"><div style="font-size:2.5rem;font-weight:700;color:#f5f5f5;letter-spacing:-0.03em;line-height:1">24<span style="color:#f59e0b">/7</span></div><div style="font-size:0.8125rem;color:rgba(246,239,229,0.4);margin-top:6px;font-weight:500">Support Available</div></div></div>`
      }
    }
  },
  {
    id: 'el-progress-timeline-mini',
    label: 'Mini Timeline',
    category: 'elements', subcategory: 'progress',
    tags: ['progress', 'timeline', 'mini', 'vertical', 'dates', 'steps'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Mini Timeline',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: {
        html: `<div class="jl-prog-tl" style="width:100%;display:flex;flex-direction:column;gap:0;padding-left:20px;font-family:system-ui,-apple-system,sans-serif"><style>.jl-tl-entry{position:relative;padding:0 0 28px 28px;border-left:2px solid rgba(255,255,255,0.08)}.jl-tl-entry:last-child{border-left-color:transparent;padding-bottom:0}.jl-tl-dot{position:absolute;left:-7px;top:2px;width:12px;height:12px;border-radius:50%;border:2px solid #638bff;background:#0a0a0a}.jl-tl-entry:first-child .jl-tl-dot{background:#638bff}</style><div class="jl-tl-entry"><div class="jl-tl-dot"></div><span style="font-size:0.75rem;font-weight:600;color:#638bff;letter-spacing:0.04em;text-transform:uppercase">Jan 2026</span><p style="font-size:0.875rem;color:rgba(246,239,229,0.6);margin:4px 0 0;line-height:1.5">Project kickoff and initial research phase completed</p></div><div class="jl-tl-entry"><div class="jl-tl-dot"></div><span style="font-size:0.75rem;font-weight:600;color:rgba(246,239,229,0.35);letter-spacing:0.04em;text-transform:uppercase">Feb 2026</span><p style="font-size:0.875rem;color:rgba(246,239,229,0.6);margin:4px 0 0;line-height:1.5">Design system and prototyping in Figma</p></div><div class="jl-tl-entry"><div class="jl-tl-dot"></div><span style="font-size:0.75rem;font-weight:600;color:rgba(246,239,229,0.35);letter-spacing:0.04em;text-transform:uppercase">Mar 2026</span><p style="font-size:0.875rem;color:rgba(246,239,229,0.6);margin:4px 0 0;line-height:1.5">Development sprint and beta launch</p></div></div>`
      }
    }
  },
]

// ─── AVATARS ───

const AVATARS: LibraryElementItem[] = [
  {
    id: 'el-avatar-single',
    label: 'Single Avatar',
    category: 'elements', subcategory: 'avatars',
    tags: ['avatar', 'single', 'image', 'initials', 'status', 'online'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Single Avatar',
      defaultStyle: { width: '52px', minHeight: '52px' },
      defaultContent: {
        html: `<div class="jl-avatar-s" style="position:relative;width:52px;height:52px;font-family:system-ui,-apple-system,sans-serif"><div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#638bff,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:1.125rem;font-weight:600;color:#fff;letter-spacing:-0.01em">JL</div><div style="position:absolute;bottom:1px;right:1px;width:14px;height:14px;border-radius:50%;background:#22c55e;border:3px solid #0a0a0a"></div></div>`
      }
    }
  },
  {
    id: 'el-avatar-group',
    label: 'Avatar Group',
    category: 'elements', subcategory: 'avatars',
    tags: ['avatar', 'group', 'stacked', 'overlapping', 'counter', 'team'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Avatar Group',
      defaultStyle: { width: '100%', minHeight: '44px' },
      defaultContent: {
        html: `<div class="jl-avatar-g" style="display:flex;align-items:center;font-family:system-ui,-apple-system,sans-serif"><style>.jl-avg-item{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.8125rem;font-weight:600;color:#fff;border:3px solid #0a0a0a;margin-left:-10px;position:relative;transition:transform 0.2s ease}.jl-avg-item:first-child{margin-left:0}.jl-avg-item:hover{transform:translateY(-3px);z-index:10}</style><div class="jl-avg-item" style="background:linear-gradient(135deg,#638bff,#818cf8);z-index:4">AL</div><div class="jl-avg-item" style="background:linear-gradient(135deg,#8b5cf6,#a78bfa);z-index:3">MK</div><div class="jl-avg-item" style="background:linear-gradient(135deg,#ec4899,#f472b6);z-index:2">SR</div><div class="jl-avg-item" style="background:linear-gradient(135deg,#f59e0b,#fbbf24);z-index:1">JP</div><div class="jl-avg-item" style="background:rgba(255,255,255,0.08);color:rgba(246,239,229,0.5);font-size:0.75rem;z-index:0">+3</div></div>`
      }
    }
  },
  {
    id: 'el-avatar-card',
    label: 'Avatar Card',
    category: 'elements', subcategory: 'avatars',
    tags: ['avatar', 'card', 'name', 'role', 'bio', 'profile', 'horizontal'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Avatar Card',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: {
        html: `<div class="jl-avatar-card" style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:14px;font-family:system-ui,-apple-system,sans-serif;transition:all 0.3s ease" onmouseenter="this.style.borderColor='rgba(255,255,255,0.12)';this.style.background='rgba(255,255,255,0.05)'" onmouseleave="this.style.borderColor='rgba(255,255,255,0.06)';this.style.background='rgba(255,255,255,0.03)'"><div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#638bff,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:1.125rem;font-weight:600;color:#fff;flex-shrink:0">JL</div><div style="flex:1;min-width:0"><div style="font-size:0.9375rem;font-weight:600;color:#f5f5f5;letter-spacing:-0.01em">Jean Lemonier</div><div style="font-size:0.8125rem;color:#638bff;font-weight:500;margin-top:2px">Lead Designer</div><div style="font-size:0.8125rem;color:rgba(246,239,229,0.4);margin-top:4px;line-height:1.4">Crafting premium digital experiences for ambitious brands.</div></div></div>`
      }
    }
  },
  {
    id: 'el-avatar-with-badge',
    label: 'Avatar + Badge',
    category: 'elements', subcategory: 'avatars',
    tags: ['avatar', 'badge', 'notification', 'count', 'alert', 'red'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Avatar + Badge',
      defaultStyle: { width: '52px', minHeight: '52px' },
      defaultContent: {
        html: `<div class="jl-avatar-badge" style="position:relative;width:52px;height:52px;font-family:system-ui,-apple-system,sans-serif"><div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#638bff,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:1.125rem;font-weight:600;color:#fff;letter-spacing:-0.01em">JL</div><div style="position:absolute;top:-2px;right:-2px;min-width:20px;height:20px;border-radius:10px;background:#ef4444;border:3px solid #0a0a0a;display:flex;align-items:center;justify-content:center;padding:0 5px;box-sizing:border-box"><span style="font-size:0.6875rem;font-weight:700;color:#fff;line-height:1">3</span></div></div>`
      }
    }
  },
]

// ─── TABS ───

const TABS_ELEMENTS: LibraryElementItem[] = [
  {
    id: 'el-tabs-underline',
    label: 'Underline Tabs',
    category: 'elements', subcategory: 'tabs',
    tags: ['tabs', 'underline', 'navigation', 'toggle', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Underline Tabs',
      defaultStyle: { width: '100%', minHeight: '180px' },
      defaultContent: {
        html: `<div class="jl-tabs-ul" style="font-family:system-ui,-apple-system,sans-serif;width:100%"><style>.jl-tabs-ul-bar{display:flex;border-bottom:1px solid rgba(255,255,255,0.08);gap:0}.jl-tabs-ul-btn{padding:12px 24px;font-size:0.875rem;font-weight:500;color:rgba(246,239,229,0.4);background:none;border:none;cursor:pointer;position:relative;transition:color 0.25s ease}.jl-tabs-ul-btn:hover{color:rgba(246,239,229,0.7)}.jl-tabs-ul-btn.active{color:#f5f5f5;font-weight:600}.jl-tabs-ul-btn.active::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:2px;background:#638bff;border-radius:1px}.jl-tabs-ul-panel{padding:20px 4px;font-size:0.875rem;color:rgba(246,239,229,0.6);line-height:1.6;display:none}.jl-tabs-ul-panel.active{display:block}</style><div class="jl-tabs-ul-bar"><button class="jl-tabs-ul-btn active" onclick="(function(b){b.closest('.jl-tabs-ul').querySelectorAll('.jl-tabs-ul-btn').forEach(function(x){x.classList.remove('active')});b.classList.add('active');b.closest('.jl-tabs-ul').querySelectorAll('.jl-tabs-ul-panel').forEach(function(p){p.classList.remove('active')});b.closest('.jl-tabs-ul').querySelector('[data-tab='+b.dataset.target+']').classList.add('active')})(this)" data-target="t1">Overview</button><button class="jl-tabs-ul-btn" onclick="(function(b){b.closest('.jl-tabs-ul').querySelectorAll('.jl-tabs-ul-btn').forEach(function(x){x.classList.remove('active')});b.classList.add('active');b.closest('.jl-tabs-ul').querySelectorAll('.jl-tabs-ul-panel').forEach(function(p){p.classList.remove('active')});b.closest('.jl-tabs-ul').querySelector('[data-tab='+b.dataset.target+']').classList.add('active')})(this)" data-target="t2">Features</button><button class="jl-tabs-ul-btn" onclick="(function(b){b.closest('.jl-tabs-ul').querySelectorAll('.jl-tabs-ul-btn').forEach(function(x){x.classList.remove('active')});b.classList.add('active');b.closest('.jl-tabs-ul').querySelectorAll('.jl-tabs-ul-panel').forEach(function(p){p.classList.remove('active')});b.closest('.jl-tabs-ul').querySelector('[data-tab='+b.dataset.target+']').classList.add('active')})(this)" data-target="t3">Pricing</button></div><div class="jl-tabs-ul-panel active" data-tab="t1">Discover our comprehensive platform designed to elevate your digital presence with premium tools and seamless integrations.</div><div class="jl-tabs-ul-panel" data-tab="t2">Advanced analytics, real-time collaboration, custom workflows, and enterprise-grade security built for modern teams.</div><div class="jl-tabs-ul-panel" data-tab="t3">Flexible plans starting at $29/month. Scale as you grow with transparent pricing and no hidden fees.</div></div>`
      }
    }
  },
  {
    id: 'el-tabs-pills',
    label: 'Pill Tabs',
    category: 'elements', subcategory: 'tabs',
    tags: ['tabs', 'pills', 'rounded', 'toggle', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Pill Tabs',
      defaultStyle: { width: '100%', minHeight: '180px' },
      defaultContent: {
        html: `<div class="jl-tabs-pill" style="font-family:system-ui,-apple-system,sans-serif;width:100%"><style>.jl-tabs-pill-bar{display:flex;gap:6px;padding:4px;background:rgba(255,255,255,0.04);border-radius:12px;width:fit-content}.jl-tabs-pill-btn{padding:8px 20px;font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.45);background:none;border:none;border-radius:8px;cursor:pointer;transition:all 0.25s ease}.jl-tabs-pill-btn:hover{color:rgba(246,239,229,0.7)}.jl-tabs-pill-btn.active{background:#638bff;color:#fff;font-weight:600;box-shadow:0 2px 8px rgba(99,139,255,0.3)}.jl-tabs-pill-panel{padding:20px 4px;font-size:0.875rem;color:rgba(246,239,229,0.6);line-height:1.6;display:none}.jl-tabs-pill-panel.active{display:block}</style><div class="jl-tabs-pill-bar"><button class="jl-tabs-pill-btn active" onclick="(function(b){b.closest('.jl-tabs-pill').querySelectorAll('.jl-tabs-pill-btn').forEach(function(x){x.classList.remove('active')});b.classList.add('active');b.closest('.jl-tabs-pill').querySelectorAll('.jl-tabs-pill-panel').forEach(function(p){p.classList.remove('active')});b.closest('.jl-tabs-pill').querySelector('[data-tab='+b.dataset.target+']').classList.add('active')})(this)" data-target="p1">Monthly</button><button class="jl-tabs-pill-btn" onclick="(function(b){b.closest('.jl-tabs-pill').querySelectorAll('.jl-tabs-pill-btn').forEach(function(x){x.classList.remove('active')});b.classList.add('active');b.closest('.jl-tabs-pill').querySelectorAll('.jl-tabs-pill-panel').forEach(function(p){p.classList.remove('active')});b.closest('.jl-tabs-pill').querySelector('[data-tab='+b.dataset.target+']').classList.add('active')})(this)" data-target="p2">Quarterly</button><button class="jl-tabs-pill-btn" onclick="(function(b){b.closest('.jl-tabs-pill').querySelectorAll('.jl-tabs-pill-btn').forEach(function(x){x.classList.remove('active')});b.classList.add('active');b.closest('.jl-tabs-pill').querySelectorAll('.jl-tabs-pill-panel').forEach(function(p){p.classList.remove('active')});b.closest('.jl-tabs-pill').querySelector('[data-tab='+b.dataset.target+']').classList.add('active')})(this)" data-target="p3">Annual</button></div><div class="jl-tabs-pill-panel active" data-tab="p1">Pay month-to-month with full flexibility. Cancel or upgrade at any time with no commitment.</div><div class="jl-tabs-pill-panel" data-tab="p2">Save 15% with quarterly billing. Ideal for growing teams looking for stability and savings.</div><div class="jl-tabs-pill-panel" data-tab="p3">Best value — save 30% annually. Priority support and early access to new features included.</div></div>`
      }
    }
  },
  {
    id: 'el-tabs-vertical',
    label: 'Vertical Tabs',
    category: 'elements', subcategory: 'tabs',
    tags: ['tabs', 'vertical', 'sidebar', 'navigation', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Vertical Tabs',
      defaultStyle: { width: '100%', minHeight: '220px' },
      defaultContent: {
        html: `<div class="jl-tabs-vert" style="font-family:system-ui,-apple-system,sans-serif;display:flex;gap:0;width:100%;min-height:200px"><style>.jl-tabs-vert-sidebar{display:flex;flex-direction:column;gap:2px;padding:4px;background:rgba(255,255,255,0.02);border-right:1px solid rgba(255,255,255,0.06);min-width:160px;border-radius:12px 0 0 12px}.jl-tabs-vert-btn{padding:10px 16px;font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.4);background:none;border:none;text-align:left;cursor:pointer;border-radius:8px;transition:all 0.2s ease}.jl-tabs-vert-btn:hover{color:rgba(246,239,229,0.7);background:rgba(255,255,255,0.03)}.jl-tabs-vert-btn.active{color:#f5f5f5;background:rgba(99,139,255,0.1);font-weight:600;border-left:2px solid #638bff;padding-left:14px}.jl-tabs-vert-content{flex:1;padding:16px 24px;font-size:0.875rem;color:rgba(246,239,229,0.6);line-height:1.6}.jl-tabs-vert-panel{display:none}.jl-tabs-vert-panel.active{display:block}</style><div class="jl-tabs-vert-sidebar"><button class="jl-tabs-vert-btn active" onclick="(function(b){b.closest('.jl-tabs-vert').querySelectorAll('.jl-tabs-vert-btn').forEach(function(x){x.classList.remove('active')});b.classList.add('active');b.closest('.jl-tabs-vert').querySelectorAll('.jl-tabs-vert-panel').forEach(function(p){p.classList.remove('active')});b.closest('.jl-tabs-vert').querySelector('[data-tab='+b.dataset.target+']').classList.add('active')})(this)" data-target="v1">Dashboard</button><button class="jl-tabs-vert-btn" onclick="(function(b){b.closest('.jl-tabs-vert').querySelectorAll('.jl-tabs-vert-btn').forEach(function(x){x.classList.remove('active')});b.classList.add('active');b.closest('.jl-tabs-vert').querySelectorAll('.jl-tabs-vert-panel').forEach(function(p){p.classList.remove('active')});b.closest('.jl-tabs-vert').querySelector('[data-tab='+b.dataset.target+']').classList.add('active')})(this)" data-target="v2">Analytics</button><button class="jl-tabs-vert-btn" onclick="(function(b){b.closest('.jl-tabs-vert').querySelectorAll('.jl-tabs-vert-btn').forEach(function(x){x.classList.remove('active')});b.classList.add('active');b.closest('.jl-tabs-vert').querySelectorAll('.jl-tabs-vert-panel').forEach(function(p){p.classList.remove('active')});b.closest('.jl-tabs-vert').querySelector('[data-tab='+b.dataset.target+']').classList.add('active')})(this)" data-target="v3">Settings</button></div><div class="jl-tabs-vert-content"><div class="jl-tabs-vert-panel active" data-tab="v1">Your dashboard provides a real-time overview of key metrics, recent activity, and quick actions to manage your workspace efficiently.</div><div class="jl-tabs-vert-panel" data-tab="v2">Deep-dive into user behavior, conversion funnels, and performance trends with interactive charts and exportable reports.</div><div class="jl-tabs-vert-panel" data-tab="v3">Customize your experience — notifications, integrations, team permissions, and billing preferences all in one place.</div></div></div>`
      }
    }
  },
  {
    id: 'el-tabs-bordered',
    label: 'Bordered Tabs',
    category: 'elements', subcategory: 'tabs',
    tags: ['tabs', 'bordered', 'classic', 'navigation', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Bordered Tabs',
      defaultStyle: { width: '100%', minHeight: '180px' },
      defaultContent: {
        html: `<div class="jl-tabs-brd" style="font-family:system-ui,-apple-system,sans-serif;width:100%"><style>.jl-tabs-brd-bar{display:flex;border-bottom:2px solid rgba(255,255,255,0.06)}.jl-tabs-brd-btn{padding:12px 24px;font-size:0.875rem;font-weight:500;color:rgba(246,239,229,0.4);background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-2px;cursor:pointer;transition:all 0.25s ease}.jl-tabs-brd-btn:hover{color:rgba(246,239,229,0.65)}.jl-tabs-brd-btn.active{color:#f5f5f5;font-weight:700;border-bottom-color:#638bff}.jl-tabs-brd-panel{padding:20px 4px;font-size:0.875rem;color:rgba(246,239,229,0.6);line-height:1.6;display:none}.jl-tabs-brd-panel.active{display:block}</style><div class="jl-tabs-brd-bar"><button class="jl-tabs-brd-btn active" onclick="(function(b){b.closest('.jl-tabs-brd').querySelectorAll('.jl-tabs-brd-btn').forEach(function(x){x.classList.remove('active')});b.classList.add('active');b.closest('.jl-tabs-brd').querySelectorAll('.jl-tabs-brd-panel').forEach(function(p){p.classList.remove('active')});b.closest('.jl-tabs-brd').querySelector('[data-tab='+b.dataset.target+']').classList.add('active')})(this)" data-target="b1">Details</button><button class="jl-tabs-brd-btn" onclick="(function(b){b.closest('.jl-tabs-brd').querySelectorAll('.jl-tabs-brd-btn').forEach(function(x){x.classList.remove('active')});b.classList.add('active');b.closest('.jl-tabs-brd').querySelectorAll('.jl-tabs-brd-panel').forEach(function(p){p.classList.remove('active')});b.closest('.jl-tabs-brd').querySelector('[data-tab='+b.dataset.target+']').classList.add('active')})(this)" data-target="b2">Reviews</button><button class="jl-tabs-brd-btn" onclick="(function(b){b.closest('.jl-tabs-brd').querySelectorAll('.jl-tabs-brd-btn').forEach(function(x){x.classList.remove('active')});b.classList.add('active');b.closest('.jl-tabs-brd').querySelectorAll('.jl-tabs-brd-panel').forEach(function(p){p.classList.remove('active')});b.closest('.jl-tabs-brd').querySelector('[data-tab='+b.dataset.target+']').classList.add('active')})(this)" data-target="b3">Shipping</button></div><div class="jl-tabs-brd-panel active" data-tab="b1">Crafted from premium materials with meticulous attention to detail. Every element is designed to deliver an exceptional experience.</div><div class="jl-tabs-brd-panel" data-tab="b2">Rated 4.9/5 by over 2,000 verified customers. Consistently praised for quality, design, and customer service.</div><div class="jl-tabs-brd-panel" data-tab="b3">Free express shipping on all orders. Delivered within 2-4 business days with full tracking and insurance.</div></div>`
      }
    }
  },
]

// ─── ALERTS ───

const ALERTS_ELEMENTS: LibraryElementItem[] = [
  {
    id: 'el-alert-success',
    label: 'Success Alert',
    category: 'elements', subcategory: 'alerts',
    tags: ['alert', 'success', 'notification', 'green', 'dismissible'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Success Alert',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: {
        html: `<div class="jl-alert-s" style="font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:flex-start;gap:12px;padding:16px 20px;background:rgba(34,197,94,0.06);border-left:3px solid #22c55e;border-radius:0 10px 10px 0;position:relative"><style>.jl-alert-s-close{position:absolute;top:12px;right:12px;width:24px;height:24px;border:none;background:none;color:rgba(246,239,229,0.3);cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:all 0.2s ease;font-size:1rem;line-height:1}.jl-alert-s-close:hover{background:rgba(255,255,255,0.06);color:rgba(246,239,229,0.6)}</style><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:1px"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><div style="flex:1;padding-right:20px"><div style="font-size:0.875rem;font-weight:600;color:#f5f5f5;margin-bottom:4px">Success</div><div style="font-size:0.8125rem;color:rgba(246,239,229,0.5);line-height:1.5">Your changes have been saved successfully. The updates will be reflected immediately.</div></div><button class="jl-alert-s-close" onclick="this.closest('.jl-alert-s').style.opacity='0';this.closest('.jl-alert-s').style.transform='translateX(10px)';setTimeout(function(){}.bind(this),300)">&times;</button></div>`
      }
    }
  },
  {
    id: 'el-alert-error',
    label: 'Error Alert',
    category: 'elements', subcategory: 'alerts',
    tags: ['alert', 'error', 'notification', 'red', 'danger'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Error Alert',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: {
        html: `<div class="jl-alert-e" style="font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:flex-start;gap:12px;padding:16px 20px;background:rgba(239,68,68,0.06);border-left:3px solid #ef4444;border-radius:0 10px 10px 0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:1px"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg><div style="flex:1"><div style="font-size:0.875rem;font-weight:600;color:#f5f5f5;margin-bottom:4px">Error</div><div style="font-size:0.8125rem;color:rgba(246,239,229,0.5);line-height:1.5">Something went wrong while processing your request. Please try again or contact support.</div></div></div>`
      }
    }
  },
  {
    id: 'el-alert-warning',
    label: 'Warning Alert',
    category: 'elements', subcategory: 'alerts',
    tags: ['alert', 'warning', 'notification', 'amber', 'caution'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Warning Alert',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: {
        html: `<div class="jl-alert-w" style="font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:flex-start;gap:12px;padding:16px 20px;background:rgba(245,158,11,0.06);border-left:3px solid #f59e0b;border-radius:0 10px 10px 0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:1px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><div style="flex:1"><div style="font-size:0.875rem;font-weight:600;color:#f5f5f5;margin-bottom:4px">Warning</div><div style="font-size:0.8125rem;color:rgba(246,239,229,0.5);line-height:1.5">Your account storage is almost full. Consider upgrading your plan to avoid service interruptions.</div></div></div>`
      }
    }
  },
  {
    id: 'el-alert-info',
    label: 'Info Alert',
    category: 'elements', subcategory: 'alerts',
    tags: ['alert', 'info', 'notification', 'blue', 'information'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Info Alert',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: {
        html: `<div class="jl-alert-i" style="font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:flex-start;gap:12px;padding:16px 20px;background:rgba(99,139,255,0.06);border-left:3px solid #638bff;border-radius:0 10px 10px 0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#638bff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:1px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><div style="flex:1"><div style="font-size:0.875rem;font-weight:600;color:#f5f5f5;margin-bottom:4px">Information</div><div style="font-size:0.8125rem;color:rgba(246,239,229,0.5);line-height:1.5">A new version is available. Update now to access the latest features and security improvements.</div></div></div>`
      }
    }
  },
  {
    id: 'el-alert-banner',
    label: 'Top Banner',
    category: 'elements', subcategory: 'alerts',
    tags: ['alert', 'banner', 'announcement', 'strip', 'top'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Top Banner',
      defaultStyle: { width: '100%', minHeight: '44px' },
      defaultContent: {
        html: `<div class="jl-alert-ban" style="font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;gap:12px;padding:10px 48px 10px 20px;background:linear-gradient(135deg,rgba(99,139,255,0.12),rgba(139,92,246,0.08));border:1px solid rgba(99,139,255,0.15);border-radius:10px;position:relative"><style>.jl-alert-ban-link{color:#638bff;text-decoration:none;font-weight:600;font-size:0.8125rem;transition:color 0.2s ease}.jl-alert-ban-link:hover{color:#818cf8}.jl-alert-ban-close{position:absolute;right:12px;top:50%;transform:translateY(-50%);width:24px;height:24px;border:none;background:none;color:rgba(246,239,229,0.3);cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:all 0.2s ease;font-size:1rem}.jl-alert-ban-close:hover{background:rgba(255,255,255,0.06);color:rgba(246,239,229,0.6)}</style><span style="font-size:0.8125rem;color:rgba(246,239,229,0.7)">Introducing our redesigned platform with powerful new features.</span><a href="#" class="jl-alert-ban-link">Learn more &rarr;</a><button class="jl-alert-ban-close" onclick="this.closest('.jl-alert-ban').style.opacity='0';this.closest('.jl-alert-ban').style.transform='translateY(-4px)'">&times;</button></div>`
      }
    }
  },
]

// ─── TAGS / CHIPS ───

const TAGS_CHIPS: LibraryElementItem[] = [
  {
    id: 'el-tag-basic',
    label: 'Basic Tags',
    category: 'elements', subcategory: 'tags',
    tags: ['tag', 'label', 'category', 'basic', 'group'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Basic Tags',
      defaultStyle: { width: '100%', minHeight: '36px' },
      defaultContent: {
        html: `<div class="jl-tags-basic" style="font-family:system-ui,-apple-system,sans-serif;display:flex;flex-wrap:wrap;gap:8px"><style>.jl-tag-b{padding:6px 14px;font-size:0.75rem;font-weight:500;color:rgba(246,239,229,0.6);background:rgba(255,255,255,0.06);border-radius:20px;letter-spacing:0.01em;transition:all 0.2s ease;cursor:default}.jl-tag-b:hover{background:rgba(255,255,255,0.1);color:rgba(246,239,229,0.8)}</style><span class="jl-tag-b">Technology</span><span class="jl-tag-b">Design</span><span class="jl-tag-b">Marketing</span><span class="jl-tag-b">Business</span><span class="jl-tag-b">Creative</span></div>`
      }
    }
  },
  {
    id: 'el-tag-removable',
    label: 'Removable Tags',
    category: 'elements', subcategory: 'tags',
    tags: ['tag', 'removable', 'close', 'dismiss', 'interactive'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Removable Tags',
      defaultStyle: { width: '100%', minHeight: '36px' },
      defaultContent: {
        html: `<div class="jl-tags-rem" style="font-family:system-ui,-apple-system,sans-serif;display:flex;flex-wrap:wrap;gap:8px"><style>.jl-tag-r{display:inline-flex;align-items:center;gap:8px;padding:6px 10px 6px 14px;font-size:0.75rem;font-weight:500;color:rgba(246,239,229,0.65);background:rgba(99,139,255,0.1);border:1px solid rgba(99,139,255,0.15);border-radius:20px;transition:all 0.3s ease}.jl-tag-r-x{width:16px;height:16px;border:none;background:rgba(255,255,255,0.08);color:rgba(246,239,229,0.4);border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.625rem;transition:all 0.2s ease;line-height:1}.jl-tag-r-x:hover{background:rgba(239,68,68,0.2);color:#ef4444}</style><span class="jl-tag-r">React<button class="jl-tag-r-x" onclick="var t=this.closest('.jl-tag-r');t.style.opacity='0';t.style.transform='scale(0.8)';setTimeout(function(){t.remove()},200)">&times;</button></span><span class="jl-tag-r">TypeScript<button class="jl-tag-r-x" onclick="var t=this.closest('.jl-tag-r');t.style.opacity='0';t.style.transform='scale(0.8)';setTimeout(function(){t.remove()},200)">&times;</button></span><span class="jl-tag-r">Next.js<button class="jl-tag-r-x" onclick="var t=this.closest('.jl-tag-r');t.style.opacity='0';t.style.transform='scale(0.8)';setTimeout(function(){t.remove()},200)">&times;</button></span></div>`
      }
    }
  },
  {
    id: 'el-tag-status',
    label: 'Status Tags',
    category: 'elements', subcategory: 'tags',
    tags: ['tag', 'status', 'state', 'dot', 'badge'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Status Tags',
      defaultStyle: { width: '100%', minHeight: '36px' },
      defaultContent: {
        html: `<div class="jl-tags-status" style="font-family:system-ui,-apple-system,sans-serif;display:flex;flex-wrap:wrap;gap:10px"><style>.jl-tag-st{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;font-size:0.75rem;font-weight:500;border-radius:20px;letter-spacing:0.01em}.jl-tag-st-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}</style><span class="jl-tag-st" style="background:rgba(161,161,170,0.1);color:rgba(161,161,170,0.8)"><span class="jl-tag-st-dot" style="background:#a1a1aa"></span>Draft</span><span class="jl-tag-st" style="background:rgba(34,197,94,0.1);color:rgba(34,197,94,0.9)"><span class="jl-tag-st-dot" style="background:#22c55e"></span>Published</span><span class="jl-tag-st" style="background:rgba(245,158,11,0.1);color:rgba(245,158,11,0.9)"><span class="jl-tag-st-dot" style="background:#f59e0b"></span>Archived</span><span class="jl-tag-st" style="background:rgba(239,68,68,0.1);color:rgba(239,68,68,0.9)"><span class="jl-tag-st-dot" style="background:#ef4444"></span>Deleted</span></div>`
      }
    }
  },
  {
    id: 'el-tag-category',
    label: 'Category Pills',
    category: 'elements', subcategory: 'tags',
    tags: ['tag', 'category', 'pill', 'icon', 'large'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Category Pills',
      defaultStyle: { width: '100%', minHeight: '40px' },
      defaultContent: {
        html: `<div class="jl-tags-cat" style="font-family:system-ui,-apple-system,sans-serif;display:flex;flex-wrap:wrap;gap:10px"><style>.jl-tag-c{display:inline-flex;align-items:center;gap:8px;padding:8px 18px;font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.7);background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:24px;cursor:default;transition:all 0.25s ease}.jl-tag-c:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.12);color:#f5f5f5}.jl-tag-c svg{flex-shrink:0}</style><span class="jl-tag-c"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>Mobile</span><span class="jl-tag-c"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>Web</span><span class="jl-tag-c"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z"/><path d="M2 17l5-5 5 5"/><path d="M22 17l-5-5-3 3"/></svg>Design</span><span class="jl-tag-c"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>Analytics</span></div>`
      }
    }
  },
]

// ─── PAGINATION ───

const PAGINATION_ELEMENTS: LibraryElementItem[] = [
  {
    id: 'el-pagination-numbered',
    label: 'Numbered Pagination',
    category: 'elements', subcategory: 'pagination',
    tags: ['pagination', 'numbered', 'pages', 'navigation', 'arrows'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Numbered Pagination',
      defaultStyle: { width: '100%', minHeight: '44px' },
      defaultContent: {
        html: `<div class="jl-pag-num" style="font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;gap:4px"><style>.jl-pag-n-btn{width:36px;height:36px;border:none;background:none;color:rgba(246,239,229,0.4);font-size:0.8125rem;font-weight:500;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s ease}.jl-pag-n-btn:hover{background:rgba(255,255,255,0.06);color:rgba(246,239,229,0.7)}.jl-pag-n-btn.active{background:#638bff;color:#fff;font-weight:600;box-shadow:0 2px 8px rgba(99,139,255,0.25)}.jl-pag-n-btn.disabled{opacity:0.25;cursor:not-allowed;pointer-events:none}.jl-pag-n-dots{color:rgba(246,239,229,0.2);font-size:0.75rem;width:36px;text-align:center;letter-spacing:2px}</style><button class="jl-pag-n-btn" onclick="(function(b){var btns=b.closest('.jl-pag-num').querySelectorAll('.jl-pag-n-btn:not(.disabled)');btns.forEach(function(x){x.classList.remove('active')});b.classList.add('active')})(this)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><button class="jl-pag-n-btn active" onclick="(function(b){var btns=b.closest('.jl-pag-num').querySelectorAll('.jl-pag-n-btn:not(.disabled)');btns.forEach(function(x){x.classList.remove('active')});b.classList.add('active')})(this)">1</button><button class="jl-pag-n-btn" onclick="(function(b){var btns=b.closest('.jl-pag-num').querySelectorAll('.jl-pag-n-btn:not(.disabled)');btns.forEach(function(x){x.classList.remove('active')});b.classList.add('active')})(this)">2</button><button class="jl-pag-n-btn" onclick="(function(b){var btns=b.closest('.jl-pag-num').querySelectorAll('.jl-pag-n-btn:not(.disabled)');btns.forEach(function(x){x.classList.remove('active')});b.classList.add('active')})(this)">3</button><span class="jl-pag-n-dots">...</span><button class="jl-pag-n-btn" onclick="(function(b){var btns=b.closest('.jl-pag-num').querySelectorAll('.jl-pag-n-btn:not(.disabled)');btns.forEach(function(x){x.classList.remove('active')});b.classList.add('active')})(this)">10</button><button class="jl-pag-n-btn" onclick="(function(b){var btns=b.closest('.jl-pag-num').querySelectorAll('.jl-pag-n-btn:not(.disabled)');btns.forEach(function(x){x.classList.remove('active')});b.classList.add('active')})(this)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button></div>`
      }
    }
  },
  {
    id: 'el-pagination-simple',
    label: 'Simple Pagination',
    category: 'elements', subcategory: 'pagination',
    tags: ['pagination', 'simple', 'minimal', 'previous', 'next'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Simple Pagination',
      defaultStyle: { width: '100%', minHeight: '40px' },
      defaultContent: {
        html: `<div class="jl-pag-simple" style="font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:space-between"><style>.jl-pag-s-link{display:inline-flex;align-items:center;gap:6px;font-size:0.8125rem;font-weight:500;color:rgba(246,239,229,0.45);text-decoration:none;cursor:pointer;padding:8px 4px;transition:color 0.2s ease}.jl-pag-s-link:hover{color:#638bff}.jl-pag-s-divider{width:1px;height:16px;background:rgba(255,255,255,0.08)}</style><a class="jl-pag-s-link" href="#"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>Previous</a><span class="jl-pag-s-divider"></span><a class="jl-pag-s-link" href="#">Next<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a></div>`
      }
    }
  },
  {
    id: 'el-pagination-load-more',
    label: 'Load More Button',
    category: 'elements', subcategory: 'pagination',
    tags: ['pagination', 'load-more', 'button', 'spinner', 'loading'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Load More Button',
      defaultStyle: { width: '100%', minHeight: '48px' },
      defaultContent: {
        html: `<div class="jl-pag-load" style="font-family:system-ui,-apple-system,sans-serif;display:flex;justify-content:center"><style>.jl-pag-l-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 28px;font-size:0.8125rem;font-weight:600;color:rgba(246,239,229,0.7);background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;cursor:pointer;transition:all 0.3s ease;letter-spacing:0.01em}.jl-pag-l-btn:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.14);color:#f5f5f5}.jl-pag-l-btn:active{transform:scale(0.97)}.jl-pag-l-spinner{display:none;width:14px;height:14px;border:2px solid rgba(246,239,229,0.15);border-top-color:#638bff;border-radius:50%;animation:jl-pag-spin 0.6s linear infinite}@keyframes jl-pag-spin{to{transform:rotate(360deg)}}.jl-pag-l-btn.loading .jl-pag-l-spinner{display:block}.jl-pag-l-btn.loading .jl-pag-l-text{opacity:0.5}</style><button class="jl-pag-l-btn" onclick="var b=this;b.classList.add('loading');setTimeout(function(){b.classList.remove('loading')},1500)"><span class="jl-pag-l-spinner"></span><span class="jl-pag-l-text">Load more</span></button></div>`
      }
    }
  },
]

// ─── CODE ───

const CODE_ELEMENTS: LibraryElementItem[] = [
  {
    id: 'el-code-inline',
    label: 'Inline Code',
    category: 'elements', subcategory: 'code',
    tags: ['code', 'inline', 'monospace', 'snippet', 'text'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Inline Code',
      defaultStyle: { width: '100%', minHeight: '32px' },
      defaultContent: {
        html: `<div class="jl-code-inline" style="font-family:system-ui,-apple-system,sans-serif;font-size:0.875rem;color:rgba(246,239,229,0.6);line-height:1.7"><style>.jl-ci{padding:2px 8px;font-family:'SF Mono',SFMono-Regular,ui-monospace,'Cascadia Mono',Menlo,Consolas,monospace;font-size:0.8125em;background:rgba(255,255,255,0.06);color:#e2b3ff;border-radius:5px;letter-spacing:-0.01em}</style>Use the <code class="jl-ci">useState</code> hook to manage local component state, or <code class="jl-ci">useReducer</code> for more complex logic. Import from <code class="jl-ci">react</code> directly.</div>`
      }
    }
  },
  {
    id: 'el-code-block',
    label: 'Code Block',
    category: 'elements', subcategory: 'code',
    tags: ['code', 'block', 'syntax', 'highlighting', 'lines'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Code Block',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: {
        html: `<div class="jl-code-block" style="font-family:system-ui,-apple-system,sans-serif;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.06)"><style>.jl-cb-header{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:rgba(255,255,255,0.03);border-bottom:1px solid rgba(255,255,255,0.06)}.jl-cb-dots{display:flex;gap:6px}.jl-cb-dot{width:10px;height:10px;border-radius:50%}.jl-cb-lang{font-size:0.6875rem;color:rgba(246,239,229,0.3);font-weight:500;text-transform:uppercase;letter-spacing:0.05em}.jl-cb-body{padding:16px;background:#0a0a0a;overflow-x:auto}.jl-cb-line{display:flex;line-height:1.7;font-size:0.8125rem}.jl-cb-ln{width:32px;text-align:right;padding-right:16px;color:rgba(246,239,229,0.15);font-family:'SF Mono',SFMono-Regular,ui-monospace,monospace;user-select:none;flex-shrink:0}.jl-cb-code{font-family:'SF Mono',SFMono-Regular,ui-monospace,monospace;color:#f5f5f5;white-space:pre}.jl-cb-kw{color:#c084fc}.jl-cb-fn{color:#60a5fa}.jl-cb-str{color:#34d399}.jl-cb-cm{color:rgba(246,239,229,0.25);font-style:italic}.jl-cb-op{color:#f59e0b}.jl-cb-num{color:#fb923c}</style><div class="jl-cb-header"><div class="jl-cb-dots"><div class="jl-cb-dot" style="background:#ef4444"></div><div class="jl-cb-dot" style="background:#f59e0b"></div><div class="jl-cb-dot" style="background:#22c55e"></div></div><span class="jl-cb-lang">typescript</span></div><div class="jl-cb-body"><div class="jl-cb-line"><span class="jl-cb-ln">1</span><span class="jl-cb-code"><span class="jl-cb-kw">import</span> { <span class="jl-cb-fn">useState</span>, <span class="jl-cb-fn">useEffect</span> } <span class="jl-cb-kw">from</span> <span class="jl-cb-str">'react'</span></span></div><div class="jl-cb-line"><span class="jl-cb-ln">2</span><span class="jl-cb-code"></span></div><div class="jl-cb-line"><span class="jl-cb-ln">3</span><span class="jl-cb-code"><span class="jl-cb-cm">// Custom hook for fetching data</span></span></div><div class="jl-cb-line"><span class="jl-cb-ln">4</span><span class="jl-cb-code"><span class="jl-cb-kw">export function</span> <span class="jl-cb-fn">useFetch</span><span class="jl-cb-op">&lt;</span>T<span class="jl-cb-op">&gt;</span>(url: <span class="jl-cb-fn">string</span>) {</span></div><div class="jl-cb-line"><span class="jl-cb-ln">5</span><span class="jl-cb-code">  <span class="jl-cb-kw">const</span> [data, setData] <span class="jl-cb-op">=</span> <span class="jl-cb-fn">useState</span><span class="jl-cb-op">&lt;</span>T <span class="jl-cb-op">|</span> <span class="jl-cb-kw">null</span><span class="jl-cb-op">&gt;</span>(<span class="jl-cb-kw">null</span>)</span></div><div class="jl-cb-line"><span class="jl-cb-ln">6</span><span class="jl-cb-code">  <span class="jl-cb-kw">const</span> [loading, setLoading] <span class="jl-cb-op">=</span> <span class="jl-cb-fn">useState</span>(<span class="jl-cb-kw">true</span>)</span></div><div class="jl-cb-line"><span class="jl-cb-ln">7</span><span class="jl-cb-code"></span></div><div class="jl-cb-line"><span class="jl-cb-ln">8</span><span class="jl-cb-code">  <span class="jl-cb-fn">useEffect</span>(() <span class="jl-cb-op">=&gt;</span> {</span></div><div class="jl-cb-line"><span class="jl-cb-ln">9</span><span class="jl-cb-code">    <span class="jl-cb-fn">fetch</span>(url)</span></div><div class="jl-cb-line"><span class="jl-cb-ln">10</span><span class="jl-cb-code">      .<span class="jl-cb-fn">then</span>(r <span class="jl-cb-op">=&gt;</span> r.<span class="jl-cb-fn">json</span>())</span></div><div class="jl-cb-line"><span class="jl-cb-ln">11</span><span class="jl-cb-code">      .<span class="jl-cb-fn">then</span>(setData)</span></div><div class="jl-cb-line"><span class="jl-cb-ln">12</span><span class="jl-cb-code">      .<span class="jl-cb-fn">finally</span>(() <span class="jl-cb-op">=&gt;</span> <span class="jl-cb-fn">setLoading</span>(<span class="jl-cb-kw">false</span>))</span></div><div class="jl-cb-line"><span class="jl-cb-ln">13</span><span class="jl-cb-code">  }, [url])</span></div><div class="jl-cb-line"><span class="jl-cb-ln">14</span><span class="jl-cb-code"></span></div><div class="jl-cb-line"><span class="jl-cb-ln">15</span><span class="jl-cb-code">  <span class="jl-cb-kw">return</span> { data, loading }</span></div><div class="jl-cb-line"><span class="jl-cb-ln">16</span><span class="jl-cb-code">}</span></div></div></div>`
      }
    }
  },
  {
    id: 'el-code-terminal',
    label: 'Terminal',
    category: 'elements', subcategory: 'code',
    tags: ['code', 'terminal', 'console', 'command', 'cli', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Terminal',
      defaultStyle: { width: '100%', minHeight: '180px' },
      defaultContent: {
        html: `<div class="jl-code-term" style="font-family:system-ui,-apple-system,sans-serif;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.06)"><style>.jl-ct-header{display:flex;align-items:center;gap:8px;padding:10px 16px;background:rgba(255,255,255,0.03);border-bottom:1px solid rgba(255,255,255,0.06)}.jl-ct-dots{display:flex;gap:6px}.jl-ct-dot{width:10px;height:10px;border-radius:50%}.jl-ct-title{font-size:0.6875rem;color:rgba(246,239,229,0.25);font-weight:500;flex:1;text-align:center}.jl-ct-body{padding:16px 20px;background:#050505;font-family:'SF Mono',SFMono-Regular,ui-monospace,monospace;font-size:0.8125rem;line-height:1.8}.jl-ct-line{display:flex}.jl-ct-prompt{color:#22c55e;margin-right:8px;user-select:none;flex-shrink:0}.jl-ct-cmd{color:#f5f5f5}.jl-ct-out{color:rgba(246,239,229,0.4);padding-left:20px}.jl-ct-cursor{display:inline-block;width:7px;height:14px;background:#22c55e;margin-left:2px;animation:jl-ct-blink 1s step-end infinite;vertical-align:text-bottom}@keyframes jl-ct-blink{50%{opacity:0}}</style><div class="jl-ct-header"><div class="jl-ct-dots"><div class="jl-ct-dot" style="background:#ef4444"></div><div class="jl-ct-dot" style="background:#f59e0b"></div><div class="jl-ct-dot" style="background:#22c55e"></div></div><span class="jl-ct-title">Terminal</span><div style="width:54px"></div></div><div class="jl-ct-body"><div class="jl-ct-line"><span class="jl-ct-prompt">$</span><span class="jl-ct-cmd">pnpm install</span></div><div class="jl-ct-out">Packages: +247</div><div class="jl-ct-out">Progress: resolved 312, reused 298, downloaded 14</div><div class="jl-ct-out" style="color:#22c55e">Done in 3.2s</div><div class="jl-ct-line" style="margin-top:4px"><span class="jl-ct-prompt">$</span><span class="jl-ct-cmd">pnpm dev</span></div><div class="jl-ct-out">Ready on http://localhost:3000</div><div class="jl-ct-line" style="margin-top:4px"><span class="jl-ct-prompt">$</span><span class="jl-ct-cursor"></span></div></div></div>`
      }
    }
  },
]

// ─── TABLES ───

const TABLES: LibraryElementItem[] = [
  {
    id: 'el-table-simple',
    label: 'Simple Table',
    category: 'elements', subcategory: 'tables',
    tags: ['table', 'data', 'rows', 'columns', 'grid', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Simple Table',
      defaultStyle: { width: '100%', minHeight: '280px' },
      defaultContent: {
        html: `<div class="jl-tbl-simple" style="font-family:system-ui,-apple-system,sans-serif;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.06)"><style>.jl-tbs table{width:100%;border-collapse:collapse;font-size:0.8125rem;color:rgba(246,239,229,0.7)}.jl-tbs th{padding:12px 16px;text-align:left;font-weight:600;color:#f5f5f5;background:rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.08);font-size:0.75rem;text-transform:uppercase;letter-spacing:0.04em}.jl-tbs td{padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.04)}.jl-tbs tr:nth-child(even) td{background:rgba(255,255,255,0.02)}.jl-tbs tr:last-child td{border-bottom:none}</style><div class="jl-tbs" style="background:#0a0a0a"><table><thead><tr><th>Name</th><th>Role</th><th>Status</th><th>Revenue</th></tr></thead><tbody><tr><td>Sophia Laurent</td><td>Creative Director</td><td style="color:#34d399">Active</td><td>$48,200</td></tr><tr><td>Marcus Chen</td><td>Lead Developer</td><td style="color:#34d399">Active</td><td>$36,800</td></tr><tr><td>Amira Patel</td><td>Brand Strategist</td><td style="color:#f59e0b">Pending</td><td>$29,500</td></tr><tr><td>Julian Moreau</td><td>UX Designer</td><td style="color:#34d399">Active</td><td>$31,400</td></tr><tr><td>Elena Rossi</td><td>Project Manager</td><td style="color:rgba(246,239,229,0.3)">Inactive</td><td>$22,100</td></tr></tbody></table></div></div>`
      }
    }
  },
  {
    id: 'el-table-striped',
    label: 'Striped Table',
    category: 'elements', subcategory: 'tables',
    tags: ['table', 'striped', 'zebra', 'hover', 'accent', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Striped Table',
      defaultStyle: { width: '100%', minHeight: '260px' },
      defaultContent: {
        html: `<div class="jl-tbl-striped" style="font-family:system-ui,-apple-system,sans-serif;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.06)"><style>.jl-tbst table{width:100%;border-collapse:collapse;font-size:0.8125rem;color:rgba(246,239,229,0.7)}.jl-tbst th{padding:12px 16px;text-align:left;font-weight:600;color:#fff;background:rgba(99,139,255,0.15);border-bottom:2px solid rgba(99,139,255,0.3);font-size:0.75rem;text-transform:uppercase;letter-spacing:0.04em}.jl-tbst td{padding:12px 16px;transition:background 0.2s ease}.jl-tbst tbody tr:nth-child(odd) td{background:rgba(255,255,255,0.03)}.jl-tbst tbody tr:nth-child(even) td{background:rgba(255,255,255,0.06)}.jl-tbst tbody tr:hover td{background:rgba(99,139,255,0.08)}</style><div class="jl-tbst" style="background:#0a0a0a"><table><thead><tr><th>Product</th><th>Category</th><th>Stock</th><th>Price</th></tr></thead><tbody><tr><td>Noir Collection</td><td>Apparel</td><td>124</td><td>$289</td></tr><tr><td>Aura Fragrance</td><td>Beauty</td><td>87</td><td>$165</td></tr><tr><td>Silk Clutch</td><td>Accessories</td><td>56</td><td>$420</td></tr><tr><td>Cashmere Wrap</td><td>Apparel</td><td>31</td><td>$540</td></tr></tbody></table></div></div>`
      }
    }
  },
  {
    id: 'el-table-cards',
    label: 'Card Table',
    category: 'elements', subcategory: 'tables',
    tags: ['table', 'cards', 'mobile', 'responsive', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Card Table',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: {
        html: `<div class="jl-tbl-cards" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-tbc-grid{display:flex;flex-direction:column;gap:10px}.jl-tbc-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;transition:border-color 0.2s ease}.jl-tbc-card:hover{border-color:rgba(255,255,255,0.12)}.jl-tbc-name{font-size:0.875rem;font-weight:600;color:#f5f5f5;min-width:140px}.jl-tbc-badge{display:inline-flex;align-items:center;padding:4px 10px;border-radius:20px;font-size:0.6875rem;font-weight:600;letter-spacing:0.02em}.jl-tbc-badge-green{background:rgba(52,211,153,0.1);color:#34d399}.jl-tbc-badge-amber{background:rgba(245,158,11,0.1);color:#f59e0b}.jl-tbc-badge-red{background:rgba(239,68,68,0.1);color:#ef4444}.jl-tbc-amount{font-size:0.875rem;font-weight:500;color:rgba(246,239,229,0.8);font-variant-numeric:tabular-nums}.jl-tbc-date{font-size:0.75rem;color:rgba(246,239,229,0.3)}</style><div class="jl-tbc-grid" style="background:#0a0a0a;padding:4px;border-radius:16px"><div class="jl-tbc-card"><span class="jl-tbc-name">Alexandre Dubois</span><span class="jl-tbc-badge jl-tbc-badge-green">Completed</span><span class="jl-tbc-amount">$12,400</span><span class="jl-tbc-date">Mar 15, 2026</span></div><div class="jl-tbc-card"><span class="jl-tbc-name">Camille Fontaine</span><span class="jl-tbc-badge jl-tbc-badge-amber">In Progress</span><span class="jl-tbc-amount">$8,750</span><span class="jl-tbc-date">Mar 12, 2026</span></div><div class="jl-tbc-card"><span class="jl-tbc-name">Hugo Bernard</span><span class="jl-tbc-badge jl-tbc-badge-red">Overdue</span><span class="jl-tbc-amount">$5,200</span><span class="jl-tbc-date">Feb 28, 2026</span></div></div></div>`
      }
    }
  },
  {
    id: 'el-table-pricing',
    label: 'Pricing Table',
    category: 'elements', subcategory: 'tables',
    tags: ['table', 'pricing', 'comparison', 'features', 'plans', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Pricing Table',
      defaultStyle: { width: '100%', minHeight: '380px' },
      defaultContent: {
        html: `<div class="jl-tbl-pricing" style="font-family:system-ui,-apple-system,sans-serif;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.06)"><style>.jl-tbp table{width:100%;border-collapse:collapse;font-size:0.8125rem;color:rgba(246,239,229,0.6)}.jl-tbp th{padding:20px 16px;text-align:center;vertical-align:bottom;border-bottom:1px solid rgba(255,255,255,0.08)}.jl-tbp th:first-child{text-align:left;width:35%}.jl-tbp .jl-tbp-plan{font-size:0.75rem;text-transform:uppercase;letter-spacing:0.06em;color:rgba(246,239,229,0.4);font-weight:500;margin-bottom:4px}.jl-tbp .jl-tbp-price{font-size:1.5rem;font-weight:700;color:#f5f5f5}.jl-tbp .jl-tbp-price span{font-size:0.75rem;font-weight:400;color:rgba(246,239,229,0.3)}.jl-tbp td{padding:12px 16px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.04)}.jl-tbp td:first-child{text-align:left;color:rgba(246,239,229,0.7);font-weight:500}.jl-tbp tr:last-child td{border-bottom:none}.jl-tbp .jl-tbp-check{color:#34d399;font-size:1rem}.jl-tbp .jl-tbp-dash{color:rgba(246,239,229,0.15)}.jl-tbp .jl-tbp-pop{background:rgba(99,139,255,0.04);border-left:1px solid rgba(99,139,255,0.1);border-right:1px solid rgba(99,139,255,0.1)}.jl-tbp th.jl-tbp-pop{background:rgba(99,139,255,0.08);border-top:2px solid #638bff}</style><div class="jl-tbp" style="background:#0a0a0a"><table><thead><tr><th></th><th><div class="jl-tbp-plan">Basic</div><div class="jl-tbp-price">$29<span>/mo</span></div></th><th class="jl-tbp-pop"><div class="jl-tbp-plan" style="color:#638bff">Pro</div><div class="jl-tbp-price">$79<span>/mo</span></div></th><th><div class="jl-tbp-plan">Enterprise</div><div class="jl-tbp-price">$199<span>/mo</span></div></th></tr></thead><tbody><tr><td>Custom domain</td><td class="jl-tbp-check">&#10003;</td><td class="jl-tbp-pop jl-tbp-check">&#10003;</td><td class="jl-tbp-check">&#10003;</td></tr><tr><td>Analytics dashboard</td><td class="jl-tbp-dash">&#8212;</td><td class="jl-tbp-pop jl-tbp-check">&#10003;</td><td class="jl-tbp-check">&#10003;</td></tr><tr><td>Priority support</td><td class="jl-tbp-dash">&#8212;</td><td class="jl-tbp-pop jl-tbp-check">&#10003;</td><td class="jl-tbp-check">&#10003;</td></tr><tr><td>API access</td><td class="jl-tbp-dash">&#8212;</td><td class="jl-tbp-pop jl-tbp-dash">&#8212;</td><td class="jl-tbp-check">&#10003;</td></tr><tr><td>White-label</td><td class="jl-tbp-dash">&#8212;</td><td class="jl-tbp-pop jl-tbp-dash">&#8212;</td><td class="jl-tbp-check">&#10003;</td></tr><tr><td>Dedicated manager</td><td class="jl-tbp-dash">&#8212;</td><td class="jl-tbp-pop jl-tbp-dash">&#8212;</td><td class="jl-tbp-check">&#10003;</td></tr></tbody></table></div></div>`
      }
    }
  },
]

// ─── LISTS ───

const LISTS: LibraryElementItem[] = [
  {
    id: 'el-list-checkmarks',
    label: 'Checkmark List',
    category: 'elements', subcategory: 'lists',
    tags: ['list', 'checkmark', 'benefits', 'features', 'check', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Checkmark List',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: {
        html: `<div class="jl-lst-check" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-lc-list{display:flex;flex-direction:column;gap:12px;padding:4px 0}.jl-lc-item{display:flex;align-items:flex-start;gap:12px}.jl-lc-icon{width:20px;height:20px;border-radius:50%;background:rgba(52,211,153,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}.jl-lc-icon svg{width:12px;height:12px;stroke:#34d399;stroke-width:2.5;fill:none}.jl-lc-text{font-size:0.875rem;color:rgba(246,239,229,0.75);line-height:1.5}</style><div class="jl-lc-list"><div class="jl-lc-item"><div class="jl-lc-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><span class="jl-lc-text">Unlimited premium templates and components</span></div><div class="jl-lc-item"><div class="jl-lc-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><span class="jl-lc-text">Custom domain with SSL certificate included</span></div><div class="jl-lc-item"><div class="jl-lc-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><span class="jl-lc-text">Priority support with 2-hour response time</span></div><div class="jl-lc-item"><div class="jl-lc-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><span class="jl-lc-text">Advanced analytics and conversion tracking</span></div><div class="jl-lc-item"><div class="jl-lc-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><span class="jl-lc-text">Automatic backups and version history</span></div></div></div>`
      }
    }
  },
  {
    id: 'el-list-numbered',
    label: 'Numbered List',
    category: 'elements', subcategory: 'lists',
    tags: ['list', 'numbered', 'steps', 'process', 'order', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Numbered List',
      defaultStyle: { width: '100%', minHeight: '220px' },
      defaultContent: {
        html: `<div class="jl-lst-num" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-ln-list{display:flex;flex-direction:column;gap:16px;padding:4px 0}.jl-ln-item{display:flex;align-items:flex-start;gap:14px}.jl-ln-num{font-size:0.8125rem;font-weight:700;color:#638bff;font-variant-numeric:tabular-nums;letter-spacing:-0.02em;min-width:24px;line-height:1.5}.jl-ln-text{font-size:0.875rem;color:rgba(246,239,229,0.75);line-height:1.5;border-bottom:1px solid rgba(255,255,255,0.04);padding-bottom:14px;flex:1}.jl-ln-item:last-child .jl-ln-text{border-bottom:none;padding-bottom:0}</style><div class="jl-ln-list"><div class="jl-ln-item"><span class="jl-ln-num">01</span><span class="jl-ln-text">Discovery call to understand your vision and brand identity</span></div><div class="jl-ln-item"><span class="jl-ln-num">02</span><span class="jl-ln-text">Strategic wireframing and content architecture planning</span></div><div class="jl-ln-item"><span class="jl-ln-num">03</span><span class="jl-ln-text">High-fidelity design with interactive prototyping</span></div><div class="jl-ln-item"><span class="jl-ln-num">04</span><span class="jl-ln-text">Development with pixel-perfect implementation and testing</span></div><div class="jl-ln-item"><span class="jl-ln-num">05</span><span class="jl-ln-text">Launch, optimization, and ongoing performance monitoring</span></div></div></div>`
      }
    }
  },
  {
    id: 'el-list-icons',
    label: 'Icon List',
    category: 'elements', subcategory: 'lists',
    tags: ['list', 'icons', 'features', 'services', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Icon List',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: {
        html: `<div class="jl-lst-icons" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-li-list{display:flex;flex-direction:column;gap:20px}.jl-li-item{display:flex;align-items:flex-start;gap:14px}.jl-li-icon{width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;flex-shrink:0}.jl-li-icon svg{width:18px;height:18px;stroke:rgba(246,239,229,0.6);stroke-width:1.5;fill:none}.jl-li-body{flex:1}.jl-li-title{font-size:0.875rem;font-weight:600;color:#f5f5f5;margin-bottom:3px}.jl-li-desc{font-size:0.8125rem;color:rgba(246,239,229,0.45);line-height:1.5}</style><div class="jl-li-list"><div class="jl-li-item"><div class="jl-li-icon"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div><div class="jl-li-body"><div class="jl-li-title">Modular Architecture</div><div class="jl-li-desc">Component-based system for scalable and maintainable builds</div></div></div><div class="jl-li-item"><div class="jl-li-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div><div class="jl-li-body"><div class="jl-li-title">Responsive Layouts</div><div class="jl-li-desc">Fluid grids that adapt seamlessly across every device</div></div></div><div class="jl-li-item"><div class="jl-li-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><div class="jl-li-body"><div class="jl-li-title">Performance First</div><div class="jl-li-desc">Optimized loading with sub-second time to interactive</div></div></div><div class="jl-li-item"><div class="jl-li-icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><div class="jl-li-body"><div class="jl-li-title">Enterprise Security</div><div class="jl-li-desc">SSL, DDoS protection, and GDPR compliance built-in</div></div></div><div class="jl-li-item"><div class="jl-li-icon"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><div class="jl-li-body"><div class="jl-li-title">Dedicated Support</div><div class="jl-li-desc">Direct access to your project lead with guaranteed SLA</div></div></div></div></div>`
      }
    }
  },
  {
    id: 'el-list-timeline',
    label: 'Timeline List',
    category: 'elements', subcategory: 'lists',
    tags: ['list', 'timeline', 'vertical', 'history', 'steps', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Timeline List',
      defaultStyle: { width: '100%', minHeight: '320px' },
      defaultContent: {
        html: `<div class="jl-lst-timeline" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-lt-list{position:relative;padding-left:28px}.jl-lt-list::before{content:'';position:absolute;left:5px;top:8px;bottom:8px;width:1px;background:rgba(255,255,255,0.08)}.jl-lt-item{position:relative;padding-bottom:28px}.jl-lt-item:last-child{padding-bottom:0}.jl-lt-dot{position:absolute;left:-28px;top:6px;width:11px;height:11px;border-radius:50%;background:#0a0a0a;border:2px solid rgba(99,139,255,0.5);z-index:1}.jl-lt-item:first-child .jl-lt-dot{border-color:#638bff;background:#638bff;box-shadow:0 0 0 4px rgba(99,139,255,0.15)}.jl-lt-date{font-size:0.6875rem;text-transform:uppercase;letter-spacing:0.06em;color:rgba(246,239,229,0.3);font-weight:500;margin-bottom:4px}.jl-lt-title{font-size:0.875rem;font-weight:600;color:#f5f5f5;margin-bottom:4px}.jl-lt-desc{font-size:0.8125rem;color:rgba(246,239,229,0.45);line-height:1.5}</style><div class="jl-lt-list"><div class="jl-lt-item"><div class="jl-lt-dot"></div><div class="jl-lt-date">March 2026</div><div class="jl-lt-title">Platform Launch</div><div class="jl-lt-desc">Public release with core builder features and template library</div></div><div class="jl-lt-item"><div class="jl-lt-dot"></div><div class="jl-lt-date">January 2026</div><div class="jl-lt-title">Beta Program</div><div class="jl-lt-desc">Invited 50 creators to test and refine the editing experience</div></div><div class="jl-lt-item"><div class="jl-lt-dot"></div><div class="jl-lt-date">October 2025</div><div class="jl-lt-title">Design System v2</div><div class="jl-lt-desc">Complete overhaul of the component library and animation engine</div></div><div class="jl-lt-item"><div class="jl-lt-dot"></div><div class="jl-lt-date">June 2025</div><div class="jl-lt-title">Initial Prototype</div><div class="jl-lt-desc">First working prototype with drag-and-drop section builder</div></div></div></div>`
      }
    }
  },
  {
    id: 'el-list-pros-cons',
    label: 'Pros & Cons',
    category: 'elements', subcategory: 'lists',
    tags: ['list', 'pros', 'cons', 'comparison', 'split', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Pros & Cons',
      defaultStyle: { width: '100%', minHeight: '240px' },
      defaultContent: {
        html: `<div class="jl-lst-procon" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-lpc-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.jl-lpc-col{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px}.jl-lpc-header{font-size:0.75rem;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;margin-bottom:14px;display:flex;align-items:center;gap:8px}.jl-lpc-header-pro{color:#34d399}.jl-lpc-header-con{color:#ef4444}.jl-lpc-items{display:flex;flex-direction:column;gap:10px}.jl-lpc-item{display:flex;align-items:flex-start;gap:10px;font-size:0.8125rem;color:rgba(246,239,229,0.65);line-height:1.5}.jl-lpc-icon{flex-shrink:0;margin-top:2px;width:14px;height:14px}.jl-lpc-icon-pro{stroke:#34d399;fill:none;stroke-width:2.5}.jl-lpc-icon-con{stroke:#ef4444;fill:none;stroke-width:2.5}</style><div class="jl-lpc-grid"><div class="jl-lpc-col"><div class="jl-lpc-header jl-lpc-header-pro"><svg class="jl-lpc-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" class="jl-lpc-icon-pro"/></svg>Advantages</div><div class="jl-lpc-items"><div class="jl-lpc-item"><svg class="jl-lpc-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" class="jl-lpc-icon-pro"/></svg><span>Lightning-fast page load times under 1s</span></div><div class="jl-lpc-item"><svg class="jl-lpc-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" class="jl-lpc-icon-pro"/></svg><span>No code required for full customization</span></div><div class="jl-lpc-item"><svg class="jl-lpc-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" class="jl-lpc-icon-pro"/></svg><span>Built-in SEO optimization tools</span></div><div class="jl-lpc-item"><svg class="jl-lpc-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" class="jl-lpc-icon-pro"/></svg><span>Integrated CRM and client portal</span></div></div></div><div class="jl-lpc-col"><div class="jl-lpc-header jl-lpc-header-con"><svg class="jl-lpc-icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" class="jl-lpc-icon-con"/><line x1="6" y1="6" x2="18" y2="18" class="jl-lpc-icon-con"/></svg>Limitations</div><div class="jl-lpc-items"><div class="jl-lpc-item"><svg class="jl-lpc-icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" class="jl-lpc-icon-con"/><line x1="6" y1="6" x2="18" y2="18" class="jl-lpc-icon-con"/></svg><span>Learning curve for advanced animations</span></div><div class="jl-lpc-item"><svg class="jl-lpc-icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" class="jl-lpc-icon-con"/><line x1="6" y1="6" x2="18" y2="18" class="jl-lpc-icon-con"/></svg><span>Limited third-party plugin ecosystem</span></div><div class="jl-lpc-item"><svg class="jl-lpc-icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" class="jl-lpc-icon-con"/><line x1="6" y1="6" x2="18" y2="18" class="jl-lpc-icon-con"/></svg><span>Custom code requires Pro plan</span></div><div class="jl-lpc-item"><svg class="jl-lpc-icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" class="jl-lpc-icon-con"/><line x1="6" y1="6" x2="18" y2="18" class="jl-lpc-icon-con"/></svg><span>No native e-commerce below Business tier</span></div></div></div></div></div>`
      }
    }
  },
]

// ─── BLOCKQUOTES ───

const BLOCKQUOTES: LibraryElementItem[] = [
  {
    id: 'el-quote-simple',
    label: 'Simple Quote',
    category: 'elements', subcategory: 'quotes',
    tags: ['quote', 'blockquote', 'testimonial', 'centered', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Simple Quote',
      defaultStyle: { width: '100%', minHeight: '160px' },
      defaultContent: {
        html: `<div class="jl-qt-simple" style="font-family:system-ui,-apple-system,sans-serif;text-align:center;padding:20px 0"><style>.jl-qs-mark{font-size:3.5rem;line-height:1;color:rgba(99,139,255,0.3);font-family:Georgia,serif;margin-bottom:8px}.jl-qs-text{font-size:1.125rem;font-style:italic;color:rgba(246,239,229,0.75);line-height:1.7;max-width:560px;margin:0 auto 16px}.jl-qs-author{font-size:0.8125rem;font-weight:600;color:rgba(246,239,229,0.4);letter-spacing:0.03em;text-transform:uppercase}</style><div class="jl-qs-mark">\u201C</div><p class="jl-qs-text">Design is not just what it looks like and feels like. Design is how it works. Every detail matters when crafting exceptional experiences.</p><div class="jl-qs-author">Jonathan Ive</div></div>`
      }
    }
  },
  {
    id: 'el-quote-bordered',
    label: 'Bordered Quote',
    category: 'elements', subcategory: 'quotes',
    tags: ['quote', 'blockquote', 'bordered', 'editorial', 'accent', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Bordered Quote',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: {
        html: `<div class="jl-qt-bordered" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-qb-wrap{border-left:4px solid #638bff;padding:16px 0 16px 24px}.jl-qb-text{font-size:1rem;color:rgba(246,239,229,0.75);line-height:1.7;font-style:italic;margin-bottom:12px}.jl-qb-footer{display:flex;align-items:center;gap:8px}.jl-qb-dash{width:16px;height:1px;background:rgba(246,239,229,0.15)}.jl-qb-author{font-size:0.8125rem;font-weight:600;color:rgba(246,239,229,0.5)}.jl-qb-role{font-size:0.75rem;color:rgba(246,239,229,0.25)}</style><div class="jl-qb-wrap"><p class="jl-qb-text">The best interfaces are the ones that disappear. When a user forgets they are using software, you have achieved something truly remarkable.</p><div class="jl-qb-footer"><div class="jl-qb-dash"></div><span class="jl-qb-author">Marie Laurent</span><span class="jl-qb-role">\u2014 Design Director, Studio Noir</span></div></div></div>`
      }
    }
  },
  {
    id: 'el-quote-card',
    label: 'Quote Card',
    category: 'elements', subcategory: 'quotes',
    tags: ['quote', 'card', 'glassmorphism', 'avatar', 'premium', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Quote Card',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: {
        html: `<div class="jl-qt-card" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-qc-card{background:rgba(255,255,255,0.03);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:28px 28px 24px;position:relative;overflow:hidden}.jl-qc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)}.jl-qc-marks{font-size:4rem;line-height:1;color:rgba(99,139,255,0.12);font-family:Georgia,serif;position:absolute;top:12px;left:24px}\u201C.jl-qc-text{font-size:0.9375rem;color:rgba(246,239,229,0.7);line-height:1.7;margin:20px 0 20px;font-style:italic}.jl-qc-footer{display:flex;align-items:center;gap:12px}.jl-qc-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#638bff,#c084fc);display:flex;align-items:center;justify-content:center;font-size:0.8125rem;font-weight:700;color:#fff;flex-shrink:0}.jl-qc-info{display:flex;flex-direction:column}.jl-qc-name{font-size:0.8125rem;font-weight:600;color:#f5f5f5}.jl-qc-role{font-size:0.75rem;color:rgba(246,239,229,0.35)}</style><div class="jl-qc-card"><div class="jl-qc-marks">\u201C</div><p class="jl-qc-text">Working with this platform transformed how we approach digital experiences. The attention to detail and craft in every component is simply unmatched in the industry.</p><div class="jl-qc-footer"><div class="jl-qc-avatar">SL</div><div class="jl-qc-info"><span class="jl-qc-name">Sophie Laurent</span><span class="jl-qc-role">CEO, Maison Digitale</span></div></div></div></div>`
      }
    }
  },
  {
    id: 'el-quote-highlight',
    label: 'Highlight Quote',
    category: 'elements', subcategory: 'quotes',
    tags: ['quote', 'highlight', 'pullquote', 'accent', 'article', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Highlight Quote',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: {
        html: `<div class="jl-qt-highlight" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-qh-wrap{background:rgba(99,139,255,0.06);border-radius:12px;padding:28px 32px;text-align:center;position:relative;overflow:hidden}.jl-qh-wrap::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:40px;height:2px;background:#638bff;border-radius:1px}.jl-qh-text{font-size:1.25rem;font-weight:500;color:rgba(246,239,229,0.85);line-height:1.6;letter-spacing:-0.01em}</style><div class="jl-qh-wrap"><p class="jl-qh-text">Great design is invisible. It does not call attention to itself \u2014 it simply makes everything feel effortless and inevitable.</p></div></div>`
      }
    }
  },
]

// ─── VIDEO ELEMENTS ───

const VIDEO_ELEMENTS: LibraryElementItem[] = [
  {
    id: 'el-video-player',
    label: 'Video Player',
    category: 'elements', subcategory: 'video',
    tags: ['video', 'player', 'media', 'controls', 'play', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Video Player',
      defaultStyle: { width: '100%', minHeight: '360px' },
      defaultContent: {
        html: `<div class="jl-vid-player" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-vp-wrap{position:relative;width:100%;aspect-ratio:16/9;background:#0a0a0a;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;cursor:pointer}.jl-vp-play{width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.1);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;z-index:2}.jl-vp-wrap:hover .jl-vp-play{background:rgba(255,255,255,0.15);transform:scale(1.08)}.jl-vp-play svg{width:24px;height:24px;fill:#fff;margin-left:3px}.jl-vp-controls{position:absolute;bottom:0;left:0;right:0;padding:12px 16px;background:linear-gradient(transparent,rgba(0,0,0,0.7));display:flex;align-items:center;gap:12px;z-index:2}.jl-vp-time{font-size:0.6875rem;color:rgba(255,255,255,0.6);font-variant-numeric:tabular-nums;min-width:72px}.jl-vp-bar{flex:1;height:3px;background:rgba(255,255,255,0.15);border-radius:2px;position:relative;cursor:pointer}.jl-vp-bar::before{content:'';position:absolute;left:0;top:0;height:100%;width:35%;background:#638bff;border-radius:2px}.jl-vp-bar::after{content:'';position:absolute;left:35%;top:50%;transform:translate(-50%,-50%);width:10px;height:10px;background:#fff;border-radius:50%;opacity:0;transition:opacity 0.2s}.jl-vp-wrap:hover .jl-vp-bar::after{opacity:1}.jl-vp-vol{width:14px;height:14px;stroke:rgba(255,255,255,0.5);fill:none;stroke-width:1.5}.jl-vp-fs{width:14px;height:14px;stroke:rgba(255,255,255,0.5);fill:none;stroke-width:1.5}</style><div class="jl-vp-wrap"><div class="jl-vp-play"><svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg></div><div class="jl-vp-controls"><span class="jl-vp-time">1:24 / 3:42</span><div class="jl-vp-bar"></div><svg class="jl-vp-vol" viewBox="0 0 24 24"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="rgba(255,255,255,0.5)"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg><svg class="jl-vp-fs" viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/></svg></div></div></div>`
      }
    }
  },
  {
    id: 'el-video-thumbnail',
    label: 'Video Thumbnail',
    category: 'elements', subcategory: 'video',
    tags: ['video', 'thumbnail', 'preview', 'play', 'overlay', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Video Thumbnail',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: {
        html: `<div class="jl-vid-thumb" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-vt-wrap{position:relative;width:100%;aspect-ratio:16/9;background:linear-gradient(135deg,#0f0f0f 0%,#1a1a2e 50%,#16213e 100%);border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);cursor:pointer}.jl-vt-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;transition:background 0.3s ease}.jl-vt-wrap:hover .jl-vt-overlay{background:rgba(0,0,0,0.15)}.jl-vt-play{width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,0.12);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;transition:all 0.3s ease}.jl-vt-wrap:hover .jl-vt-play{transform:scale(1.1);background:rgba(255,255,255,0.18)}.jl-vt-play svg{width:22px;height:22px;fill:#fff;margin-left:2px}.jl-vt-badge{position:absolute;bottom:12px;right:12px;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);padding:3px 8px;border-radius:4px;font-size:0.6875rem;font-weight:600;color:rgba(255,255,255,0.8);font-variant-numeric:tabular-nums;letter-spacing:0.02em}</style><div class="jl-vt-wrap"><div class="jl-vt-overlay"><div class="jl-vt-play"><svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg></div></div><div class="jl-vt-badge">3:42</div></div></div>`
      }
    }
  },
  {
    id: 'el-video-embed',
    label: 'Video Embed',
    category: 'elements', subcategory: 'video',
    tags: ['video', 'embed', 'placeholder', 'youtube', 'vimeo', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Video Embed',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: {
        html: `<div class="jl-vid-embed" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-ve-wrap{position:relative;width:100%;aspect-ratio:16/9;background:#0a0a0a;border-radius:12px;overflow:hidden;border:2px dashed rgba(255,255,255,0.08);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;cursor:pointer;transition:border-color 0.3s ease}.jl-ve-wrap:hover{border-color:rgba(99,139,255,0.3)}.jl-ve-icon{width:40px;height:40px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center}.jl-ve-icon svg{width:20px;height:20px;stroke:rgba(246,239,229,0.3);fill:none;stroke-width:1.5}.jl-ve-text{font-size:0.875rem;color:rgba(246,239,229,0.35);font-weight:500}.jl-ve-sub{font-size:0.75rem;color:rgba(246,239,229,0.2)}</style><div class="jl-ve-wrap"><div class="jl-ve-icon"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2"/><polygon points="10,8 16,12 10,16" fill="rgba(246,239,229,0.3)" stroke="none"/></svg></div><span class="jl-ve-text">Paste your video URL</span><span class="jl-ve-sub">YouTube, Vimeo, or direct MP4 link</span></div></div>`
      }
    }
  },
]

// ─── BUTTONS STANDALONE (8 premium presets) ───

const BUTTONS_STANDALONE: LibraryElementItem[] = [
  {
    id: 'el-btn-primary',
    label: 'Primary Button',
    category: 'elements', subcategory: 'buttons',
    tags: ['button', 'primary', 'solid', 'cta', 'accent', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Primary Button',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: {
        html: `<div class="jl-btn-prim" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-bp-wrap{display:flex;align-items:center;justify-content:center;padding:16px}.jl-bp-btn{display:inline-flex;align-items:center;justify-content:center;padding:14px 36px;background:#638BFF;color:#fff;font-size:0.9375rem;font-weight:600;border-radius:10px;border:none;cursor:pointer;text-decoration:none;letter-spacing:0.01em;transition:all 0.35s cubic-bezier(0.22,1,0.36,1);box-shadow:0 4px 16px rgba(99,139,255,0.25)}.jl-bp-btn:hover{background:#5178e6;transform:translateY(-2px);box-shadow:0 8px 28px rgba(99,139,255,0.35)}.jl-bp-btn:active{transform:translateY(0);box-shadow:0 2px 8px rgba(99,139,255,0.2)}</style><div class="jl-bp-wrap"><a class="jl-bp-btn" href="#">Get Started</a></div></div>`
      }
    }
  },
  {
    id: 'el-btn-secondary',
    label: 'Secondary Button',
    category: 'elements', subcategory: 'buttons',
    tags: ['button', 'secondary', 'outline', 'border', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Secondary Button',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: {
        html: `<div class="jl-btn-sec" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-bs-wrap{display:flex;align-items:center;justify-content:center;padding:16px}.jl-bs-btn{display:inline-flex;align-items:center;justify-content:center;padding:14px 36px;background:transparent;color:rgba(255,255,255,0.8);font-size:0.9375rem;font-weight:600;border-radius:10px;border:1.5px solid rgba(255,255,255,0.2);cursor:pointer;text-decoration:none;letter-spacing:0.01em;transition:all 0.35s cubic-bezier(0.22,1,0.36,1)}.jl-bs-btn:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.4);color:#fff;transform:translateY(-2px)}.jl-bs-btn:active{transform:translateY(0)}</style><div class="jl-bs-wrap"><a class="jl-bs-btn" href="#">Learn More</a></div></div>`
      }
    }
  },
  {
    id: 'el-btn-ghost',
    label: 'Ghost Button',
    category: 'elements', subcategory: 'buttons',
    tags: ['button', 'ghost', 'text', 'minimal', 'underline', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Ghost Button',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: {
        html: `<div class="jl-btn-ghost" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-bg-wrap{display:flex;align-items:center;justify-content:center;padding:16px}.jl-bg-btn{display:inline-flex;align-items:center;gap:6px;padding:10px 4px;background:none;color:rgba(255,255,255,0.6);font-size:0.9375rem;font-weight:500;border:none;cursor:pointer;text-decoration:none;letter-spacing:0.01em;position:relative;transition:color 0.3s}.jl-bg-btn::after{content:'';position:absolute;bottom:6px;left:4px;right:4px;height:1px;background:rgba(255,255,255,0.3);transform:scaleX(0);transform-origin:left;transition:transform 0.4s cubic-bezier(0.22,1,0.36,1)}.jl-bg-btn:hover{color:#fff}.jl-bg-btn:hover::after{transform:scaleX(1)}</style><div class="jl-bg-wrap"><a class="jl-bg-btn" href="#">View Details</a></div></div>`
      }
    }
  },
  {
    id: 'el-btn-icon',
    label: 'Icon Button',
    category: 'elements', subcategory: 'buttons',
    tags: ['button', 'icon', 'arrow', 'animated', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Icon Button',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: {
        html: `<div class="jl-btn-icon" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-bi-wrap{display:flex;align-items:center;justify-content:center;padding:16px}.jl-bi-btn{display:inline-flex;align-items:center;gap:10px;padding:14px 32px;background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.8);font-size:0.9375rem;font-weight:600;border-radius:10px;border:1px solid rgba(255,255,255,0.1);cursor:pointer;text-decoration:none;letter-spacing:0.01em;transition:all 0.35s cubic-bezier(0.22,1,0.36,1)}.jl-bi-btn svg{width:18px;height:18px;transition:transform 0.35s cubic-bezier(0.22,1,0.36,1)}.jl-bi-btn:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2);color:#fff}.jl-bi-btn:hover svg{transform:translateX(4px)}</style><div class="jl-bi-wrap"><a class="jl-bi-btn" href="#">Explore Now <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a></div></div>`
      }
    }
  },
  {
    id: 'el-btn-pill',
    label: 'Pill Button',
    category: 'elements', subcategory: 'buttons',
    tags: ['button', 'pill', 'rounded', 'gradient', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Pill Button',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: {
        html: `<div class="jl-btn-pill" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-bpl-wrap{display:flex;align-items:center;justify-content:center;padding:16px}.jl-bpl-btn{display:inline-flex;align-items:center;justify-content:center;padding:14px 40px;background:linear-gradient(135deg,#638BFF 0%,#8B5CF6 100%);color:#fff;font-size:0.9375rem;font-weight:600;border-radius:99px;border:none;cursor:pointer;text-decoration:none;letter-spacing:0.01em;transition:all 0.35s cubic-bezier(0.22,1,0.36,1);box-shadow:0 4px 20px rgba(99,139,255,0.3)}.jl-bpl-btn:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(99,139,255,0.4)}.jl-bpl-btn:active{transform:translateY(0);box-shadow:0 2px 12px rgba(99,139,255,0.2)}</style><div class="jl-bpl-wrap"><a class="jl-bpl-btn" href="#">Start Free Trial</a></div></div>`
      }
    }
  },
  {
    id: 'el-btn-loading',
    label: 'Loading Button',
    category: 'elements', subcategory: 'buttons',
    tags: ['button', 'loading', 'spinner', 'state', 'interactive', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Loading Button',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: {
        html: `<div class="jl-btn-load" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-bl-wrap{display:flex;align-items:center;justify-content:center;padding:16px;gap:16px}.jl-bl-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:14px 36px;background:#638BFF;color:#fff;font-size:0.9375rem;font-weight:600;border-radius:10px;border:none;cursor:pointer;text-decoration:none;letter-spacing:0.01em;transition:all 0.35s;box-shadow:0 4px 16px rgba(99,139,255,0.25);min-width:160px}.jl-bl-btn:hover{background:#5178e6}.jl-bl-btn-loading{background:rgba(99,139,255,0.6);cursor:wait;pointer-events:none}.jl-bl-spinner{width:18px;height:18px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:jl-bl-spin 0.7s linear infinite;flex-shrink:0}@keyframes jl-bl-spin{to{transform:rotate(360deg)}}</style><div class="jl-bl-wrap"><a class="jl-bl-btn" href="#">Submit</a><a class="jl-bl-btn jl-bl-btn-loading" href="#"><span class="jl-bl-spinner"></span>Loading...</a></div></div>`
      }
    }
  },
  {
    id: 'el-btn-group',
    label: 'Button Group',
    category: 'elements', subcategory: 'buttons',
    tags: ['button', 'group', 'multiple', 'row', 'showcase', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Button Group',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: {
        html: `<div class="jl-btn-grp" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-bgr-wrap{display:flex;align-items:center;justify-content:center;gap:12px;padding:16px;flex-wrap:wrap}.jl-bgr-primary{display:inline-flex;align-items:center;justify-content:center;padding:14px 32px;background:#638BFF;color:#fff;font-size:0.875rem;font-weight:600;border-radius:10px;border:none;cursor:pointer;text-decoration:none;transition:all 0.35s cubic-bezier(0.22,1,0.36,1);box-shadow:0 4px 16px rgba(99,139,255,0.25)}.jl-bgr-primary:hover{background:#5178e6;transform:translateY(-2px)}.jl-bgr-secondary{display:inline-flex;align-items:center;justify-content:center;padding:14px 32px;background:transparent;color:rgba(255,255,255,0.8);font-size:0.875rem;font-weight:600;border-radius:10px;border:1.5px solid rgba(255,255,255,0.2);cursor:pointer;text-decoration:none;transition:all 0.35s cubic-bezier(0.22,1,0.36,1)}.jl-bgr-secondary:hover{border-color:rgba(255,255,255,0.4);color:#fff;transform:translateY(-2px)}.jl-bgr-ghost{display:inline-flex;align-items:center;gap:6px;padding:14px 20px;background:none;color:rgba(255,255,255,0.5);font-size:0.875rem;font-weight:500;border:none;cursor:pointer;text-decoration:none;transition:color 0.3s}.jl-bgr-ghost:hover{color:#fff}.jl-bgr-ghost svg{width:16px;height:16px;transition:transform 0.3s}.jl-bgr-ghost:hover svg{transform:translateX(3px)}</style><div class="jl-bgr-wrap"><a class="jl-bgr-primary" href="#">Get Started</a><a class="jl-bgr-secondary" href="#">Learn More</a><a class="jl-bgr-ghost" href="#">View Demo <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a></div></div>`
      }
    }
  },
  {
    id: 'el-btn-cta-animated',
    label: 'Animated CTA',
    category: 'elements', subcategory: 'buttons',
    tags: ['button', 'cta', 'animated', 'gradient', 'glow', 'premium', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Animated CTA',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: {
        html: `<div class="jl-btn-cta-anim" style="font-family:system-ui,-apple-system,sans-serif"><style>.jl-bca-wrap{display:flex;align-items:center;justify-content:center;padding:20px}.jl-bca-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;padding:16px 44px;background:#0a0a0a;color:#fff;font-size:1rem;font-weight:600;border-radius:12px;border:none;cursor:pointer;text-decoration:none;letter-spacing:0.01em;overflow:hidden;z-index:0;transition:transform 0.35s cubic-bezier(0.22,1,0.36,1)}.jl-bca-btn::before{content:'';position:absolute;inset:-2px;border-radius:14px;padding:2px;background:linear-gradient(135deg,#638BFF,#8B5CF6,#EC4899,#638BFF);background-size:300% 300%;animation:jl-bca-gradient 4s ease infinite;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;z-index:-1}.jl-bca-btn::after{content:'';position:absolute;inset:0;border-radius:12px;background:linear-gradient(135deg,rgba(99,139,255,0.1),rgba(139,92,246,0.1),rgba(236,72,153,0.1));background-size:300% 300%;animation:jl-bca-gradient 4s ease infinite;opacity:0;transition:opacity 0.3s;z-index:-1}.jl-bca-btn:hover::after{opacity:1}.jl-bca-btn:hover{transform:translateY(-2px)}.jl-bca-glow{position:absolute;inset:-20px;border-radius:30px;background:linear-gradient(135deg,rgba(99,139,255,0.15),rgba(139,92,246,0.15),rgba(236,72,153,0.15));background-size:300% 300%;animation:jl-bca-gradient 4s ease infinite;filter:blur(20px);z-index:-2;opacity:0.6}@keyframes jl-bca-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}.jl-bca-pulse{position:absolute;inset:-4px;border-radius:16px;border:1px solid rgba(99,139,255,0.15);animation:jl-bca-pulse-anim 2.5s ease-in-out infinite}@keyframes jl-bca-pulse-anim{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:0;transform:scale(1.05)}}</style><div class="jl-bca-wrap"><a class="jl-bca-btn" href="#"><span class="jl-bca-glow"></span><span class="jl-bca-pulse"></span>Start Your Project</a></div></div>`
      }
    }
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
  ...FORM_INPUTS,
  ...SOCIAL_LINKS,
  ...PROGRESS,
  ...AVATARS,
  ...TABS_ELEMENTS,
  ...ALERTS_ELEMENTS,
  ...TAGS_CHIPS,
  ...PAGINATION_ELEMENTS,
  ...CODE_ELEMENTS,
  ...TABLES,
  ...LISTS,
  ...BLOCKQUOTES,
  ...VIDEO_ELEMENTS,
  ...BUTTONS_STANDALONE,
]
