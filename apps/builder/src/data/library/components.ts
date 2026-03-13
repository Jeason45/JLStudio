// ─────────────────────────────────────────────
// LIBRARY — Components presets (Brixsa-quality premium)
// ─────────────────────────────────────────────

import type { LibraryElementItem } from '@/types/library'

// ─── BUTTONS (12 styles × premium quality) ───

const BUTTONS: LibraryElementItem[] = [
  {
    id: 'comp-btn-primary',
    label: 'Primary Solid',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'cta', 'primary', 'solid'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Primary Button',
      defaultStyle: {
        display: 'inline-block', padding: '0.875rem 2.25rem',
        backgroundColor: '#4a2711', color: '#f6efe5',
        borderRadius: '0.375rem', fontSize: '0.9375rem', fontWeight: 500,
        cursor: 'pointer', textAlign: 'center', letterSpacing: '0.01em',
        transition: 'all 0.4s ease',
      },
      defaultContent: { label: 'Get Started', href: '#' },
    },
  },
  {
    id: 'comp-btn-outline-luxury',
    label: 'Outline Luxury',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'outline', 'luxury', 'elegant'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Outline Button',
      defaultStyle: {
        display: 'inline-block', padding: '0.875rem 2.25rem',
        backgroundColor: 'transparent', color: '#f6efe5',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(209,203,199,0.35)',
        borderRadius: '0.375rem', fontSize: '0.9375rem', fontWeight: 500,
        cursor: 'pointer', textAlign: 'center', letterSpacing: '0.01em',
        transition: 'all 0.4s ease',
      },
      defaultContent: { label: 'Learn More', href: '#' },
    },
  },
  {
    id: 'comp-btn-glass',
    label: 'Glass Button',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'glass', 'glassmorphism', 'blur', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Glass Button',
      defaultStyle: {
        display: 'inline-block', padding: '0.875rem 2.25rem',
        backgroundColor: 'rgba(128,117,117,0.5)', color: '#f6efe5',
        borderRadius: '99px', fontSize: '0.9375rem', fontWeight: 500,
        cursor: 'pointer', textAlign: 'center',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.4s ease',
      },
      defaultContent: { label: 'Explore', href: '#' },
    },
  },
  {
    id: 'comp-btn-gradient-glow',
    label: 'Gradient Glow',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'gradient', 'glow', 'modern', 'tech'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Gradient Glow',
      defaultStyle: {
        display: 'inline-block', padding: '0.9375rem 2.5rem',
        backgroundColor: '#6366f1', color: '#fff',
        borderRadius: '0.75rem', fontSize: '0.9375rem', fontWeight: 600,
        cursor: 'pointer', textAlign: 'center',
        boxShadow: '0 0 20px rgba(99,102,241,0.4), 0 0 60px rgba(99,102,241,0.15)',
        transition: 'all 0.4s ease',
      },
      defaultContent: { label: 'Start Free Trial', href: '#' },
    },
  },
  {
    id: 'comp-btn-neobrutalism',
    label: 'Neobrutalism',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'neobrutalism', 'bold', 'playful'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Neobrutal Button',
      defaultStyle: {
        display: 'inline-block', padding: '0.9375rem 2rem',
        backgroundColor: '#facc15', color: '#18181b',
        borderRadius: '0', fontSize: '1rem', fontWeight: 800,
        cursor: 'pointer', textAlign: 'center',
        borderWidth: '3px', borderStyle: 'solid', borderColor: '#18181b',
        boxShadow: '5px 5px 0px #18181b',
        transition: 'all 0.2s ease',
      },
      defaultContent: { label: 'Click Me!', href: '#' },
    },
  },
  {
    id: 'comp-btn-dark-minimal',
    label: 'Dark Minimal',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'dark', 'minimal', 'clean'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Dark Button',
      defaultStyle: {
        display: 'inline-block', padding: '0.875rem 2rem',
        backgroundColor: '#140c08', color: '#e1e1e1',
        borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: 500,
        cursor: 'pointer', textAlign: 'center', letterSpacing: '0.02em',
        transition: 'all 0.4s ease',
      },
      defaultContent: { label: 'View Details', href: '#' },
    },
  },
  {
    id: 'comp-btn-pill-soft',
    label: 'Pill Soft',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'pill', 'soft', 'rounded'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Pill Button',
      defaultStyle: {
        display: 'inline-block', padding: '0.75rem 1.75rem',
        backgroundColor: 'rgba(99,102,241,0.1)', color: '#6366f1',
        borderRadius: '99px', fontSize: '0.875rem', fontWeight: 500,
        cursor: 'pointer', textAlign: 'center',
        transition: 'all 0.3s ease',
      },
      defaultContent: { label: 'Filter', href: '#' },
    },
  },
  {
    id: 'comp-btn-white-shadow',
    label: 'White Elevated',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'white', 'shadow', 'elevated'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'White Button',
      defaultStyle: {
        display: 'inline-block', padding: '0.875rem 2rem',
        backgroundColor: '#ffffff', color: '#18181b',
        borderRadius: '0.5rem', fontSize: '0.9375rem', fontWeight: 600,
        cursor: 'pointer', textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
      },
      defaultContent: { label: 'Get Started', href: '#' },
    },
  },
  {
    id: 'comp-btn-icon-arrow',
    label: 'Arrow CTA',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'arrow', 'cta', 'icon'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Arrow CTA',
      defaultStyle: {
        display: 'inline-flex', gap: '0.625rem', alignItems: 'center',
        padding: '0.875rem 2rem',
        backgroundColor: '#4a2711', color: '#f6efe5',
        borderRadius: '0.375rem', fontSize: '0.9375rem', fontWeight: 500,
        cursor: 'pointer', textAlign: 'center',
        transition: 'all 0.4s ease',
      },
      defaultContent: { label: 'Discover →', href: '#' },
    },
  },
  {
    id: 'comp-btn-large-hero',
    label: 'Hero CTA Large',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'hero', 'large', 'cta'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Hero CTA',
      defaultStyle: {
        display: 'inline-block', padding: '1.125rem 3.5rem',
        backgroundColor: '#4a2711', color: '#f6efe5',
        borderRadius: '0.5rem', fontSize: '1.0625rem', fontWeight: 600,
        cursor: 'pointer', textAlign: 'center', letterSpacing: '0.02em',
        boxShadow: '0 4px 20px rgba(74,39,17,0.3)',
        transition: 'all 0.4s ease',
      },
      defaultContent: { label: 'Start Building Now', href: '#' },
    },
  },
  {
    id: 'comp-btn-circle-icon',
    label: 'Circle Icon',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'circle', 'icon', 'round'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Circle Button',
      defaultStyle: {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '48px', height: '48px',
        backgroundColor: 'rgba(255,255,255,0.1)', color: '#e1e1e1',
        borderRadius: '99px',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.15)',
        fontSize: '1.25rem', cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.4s ease',
      },
      defaultContent: { label: '→', href: '#' },
    },
  },
  {
    id: 'comp-btn-danger',
    label: 'Danger',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'danger', 'red', 'delete'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Danger Button',
      defaultStyle: {
        display: 'inline-block', padding: '0.875rem 2rem',
        backgroundColor: '#dc2626', color: '#fff',
        borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 600,
        cursor: 'pointer', textAlign: 'center',
        transition: 'all 0.3s ease',
      },
      defaultContent: { label: 'Delete', href: '#' },
    },
  },
]

// ─── BADGES (10 styles) ───

const BADGES: LibraryElementItem[] = [
  {
    id: 'comp-badge-glass',
    label: 'Badge Glass',
    category: 'components', subcategory: 'badges',
    tags: ['badge', 'glass', 'premium', 'blur'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Badge Glass',
      defaultStyle: {
        display: 'inline-block', padding: '0.375rem 1rem',
        backgroundColor: 'rgba(158,158,158,0.3)', color: '#e1e1e1',
        borderRadius: '99px', fontSize: '0.75rem', fontWeight: 500,
        backdropFilter: 'blur(8px)',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.1)',
      },
      defaultContent: { text: 'Featured' },
    },
  },
  {
    id: 'comp-badge-solid-primary',
    label: 'Badge Solid',
    category: 'components', subcategory: 'badges',
    tags: ['badge', 'solid', 'primary'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Badge Solid',
      defaultStyle: {
        display: 'inline-block', padding: '0.3125rem 0.875rem',
        backgroundColor: '#4a2711', color: '#f6efe5',
        borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
        letterSpacing: '0.03em',
      },
      defaultContent: { text: 'New' },
    },
  },
  {
    id: 'comp-badge-outline-light',
    label: 'Badge Outline Light',
    category: 'components', subcategory: 'badges',
    tags: ['badge', 'outline', 'light'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Badge Outline',
      defaultStyle: {
        display: 'inline-block', padding: '0.3125rem 0.875rem',
        backgroundColor: 'transparent', color: '#e1e1e1',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(209,203,199,0.35)',
        borderRadius: '99px', fontSize: '0.75rem', fontWeight: 500,
      },
      defaultContent: { text: 'Beta' },
    },
  },
  {
    id: 'comp-badge-success',
    label: 'Badge Success',
    category: 'components', subcategory: 'badges',
    tags: ['badge', 'success', 'green', 'status'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Badge Success',
      defaultStyle: {
        display: 'inline-flex', gap: '0.375rem', alignItems: 'center',
        padding: '0.3125rem 0.875rem',
        backgroundColor: 'rgba(16,185,129,0.12)', color: '#10b981',
        borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
      },
      defaultContent: { text: '● Active' },
    },
  },
  {
    id: 'comp-badge-warning',
    label: 'Badge Warning',
    category: 'components', subcategory: 'badges',
    tags: ['badge', 'warning', 'yellow', 'status'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Badge Warning',
      defaultStyle: {
        display: 'inline-flex', gap: '0.375rem', alignItems: 'center',
        padding: '0.3125rem 0.875rem',
        backgroundColor: 'rgba(245,158,11,0.12)', color: '#f59e0b',
        borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
      },
      defaultContent: { text: '● Pending' },
    },
  },
  {
    id: 'comp-badge-danger',
    label: 'Badge Danger',
    category: 'components', subcategory: 'badges',
    tags: ['badge', 'danger', 'red', 'error'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Badge Danger',
      defaultStyle: {
        display: 'inline-flex', gap: '0.375rem', alignItems: 'center',
        padding: '0.3125rem 0.875rem',
        backgroundColor: 'rgba(239,68,68,0.12)', color: '#ef4444',
        borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
      },
      defaultContent: { text: '● Error' },
    },
  },
  {
    id: 'comp-badge-neobrutalism',
    label: 'Badge Neobrutal',
    category: 'components', subcategory: 'badges',
    tags: ['badge', 'neobrutalism', 'bold'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Badge Neobrutal',
      defaultStyle: {
        display: 'inline-block', padding: '0.25rem 0.75rem',
        backgroundColor: '#a3e635', color: '#18181b',
        borderRadius: '0', fontSize: '0.75rem', fontWeight: 800,
        borderWidth: '2px', borderStyle: 'solid', borderColor: '#18181b',
        boxShadow: '3px 3px 0px #18181b',
      },
      defaultContent: { text: 'HOT' },
    },
  },
  {
    id: 'comp-badge-dark-subtle',
    label: 'Badge Dark Subtle',
    category: 'components', subcategory: 'badges',
    tags: ['badge', 'dark', 'subtle'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Badge Dark',
      defaultStyle: {
        display: 'inline-block', padding: '0.3125rem 0.875rem',
        backgroundColor: 'rgba(255,255,255,0.06)', color: '#a1a1aa',
        borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: 500,
      },
      defaultContent: { text: 'v2.0' },
    },
  },
  {
    id: 'comp-badge-notification',
    label: 'Notification Count',
    category: 'components', subcategory: 'badges',
    tags: ['badge', 'notification', 'count', 'number'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Notification',
      defaultStyle: {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '1.5rem', height: '1.5rem', minWidth: '1.5rem',
        backgroundColor: '#ef4444', color: '#fff',
        borderRadius: '99px', fontSize: '0.6875rem', fontWeight: 700,
      },
      defaultContent: { text: '3' },
    },
  },
  {
    id: 'comp-badge-gold-luxury',
    label: 'Badge Gold Luxury',
    category: 'components', subcategory: 'badges',
    tags: ['badge', 'gold', 'luxury', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-text', label: 'Badge Gold',
      defaultStyle: {
        display: 'inline-block', padding: '0.375rem 1rem',
        backgroundColor: 'rgba(200,169,126,0.15)', color: '#c8a97e',
        borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(200,169,126,0.3)',
        letterSpacing: '0.05em', textTransform: 'uppercase',
      },
      defaultContent: { text: 'Premium' },
    },
  },
]

// ─── CARDS (10 premium cards with rich children) ───

const CARDS: LibraryElementItem[] = [
  {
    id: 'comp-card-glass',
    label: 'Glass Card',
    category: 'components', subcategory: 'cards',
    tags: ['card', 'glass', 'glassmorphism', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Glass Card',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1.25rem',
        padding: '2rem',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '1rem',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Icon', defaultStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '0.75rem', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.06)' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Emoji', defaultStyle: { fontSize: '1.5rem' }, defaultContent: { text: '✦' } },
        ]},
        { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.25rem', fontWeight: 600, color: '#ffffff', lineHeight: '1.3' }, defaultContent: { text: 'Premium Feature', tag: 'h3' } },
        { type: 'custom-text', label: 'Desc', defaultStyle: { fontSize: '0.9375rem', lineHeight: '1.65', color: 'rgba(255,255,255,0.6)' }, defaultContent: { text: 'Beautiful glassmorphism card with backdrop blur and subtle borders for a premium feel.' } },
      ],
    },
  },
  {
    id: 'comp-card-image-hover',
    label: 'Image Card Hover',
    category: 'components', subcategory: 'cards',
    tags: ['card', 'image', 'hover', 'blog', 'property'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Image Card',
      defaultStyle: {
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: '0.5rem', overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        transition: 'all 0.6s ease',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Image Wrapper', defaultStyle: { overflow: 'hidden', position: 'relative', height: '220px' }, defaultContent: {}, children: [
          { type: 'custom-image', label: 'Image', defaultStyle: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }, defaultContent: { src: '', alt: 'Card image' } },
        ]},
        { type: 'custom-container', label: 'Body', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.625rem', padding: '1.5rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Category', defaultStyle: { fontSize: '0.75rem', fontWeight: 600, color: '#4a2711', letterSpacing: '0.05em', textTransform: 'uppercase' }, defaultContent: { text: 'Design' } },
          { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.125rem', fontWeight: 600, color: '#18181b', lineHeight: '1.35' }, defaultContent: { text: 'Creating Memorable Experiences Through Design', tag: 'h3' } },
          { type: 'custom-text', label: 'Excerpt', defaultStyle: { fontSize: '0.875rem', lineHeight: '1.6', color: '#71717a' }, defaultContent: { text: 'A brief description that captures interest and leads the reader to explore more.' } },
        ]},
      ],
    },
  },
  {
    id: 'comp-card-pricing-premium',
    label: 'Pricing Card Premium',
    category: 'components', subcategory: 'cards',
    tags: ['card', 'pricing', 'plan', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Pricing Card',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '2rem',
        padding: '2.5rem',
        backgroundColor: '#140c08', color: '#e1e1e1',
        borderRadius: '1rem',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(209,203,199,0.15)',
        position: 'relative', overflow: 'hidden',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Header', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.75rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Plan', defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, color: '#c8a97e', letterSpacing: '0.1em', textTransform: 'uppercase' }, defaultContent: { text: 'Professional' } },
          { type: 'custom-container', label: 'Price Row', defaultStyle: { display: 'flex', alignItems: 'baseline', gap: '0.25rem' }, defaultContent: {}, children: [
            { type: 'custom-heading', label: 'Price', defaultStyle: { fontSize: '3rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1' }, defaultContent: { text: '$79', tag: 'h2' } },
            { type: 'custom-text', label: 'Period', defaultStyle: { fontSize: '0.9375rem', color: 'rgba(225,225,225,0.5)' }, defaultContent: { text: '/month' } },
          ]},
          { type: 'custom-text', label: 'Description', defaultStyle: { fontSize: '0.9375rem', color: 'rgba(225,225,225,0.6)', lineHeight: '1.5' }, defaultContent: { text: 'Everything you need to scale your business to the next level.' } },
        ]},
        { type: 'custom-divider', label: 'Divider', defaultStyle: { width: '100%', opacity: 0.15 }, defaultContent: {} },
        { type: 'custom-container', label: 'Features', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.875rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Feature 1', defaultStyle: { fontSize: '0.9375rem', color: '#e1e1e1' }, defaultContent: { text: '✓  Unlimited projects' } },
          { type: 'custom-text', label: 'Feature 2', defaultStyle: { fontSize: '0.9375rem', color: '#e1e1e1' }, defaultContent: { text: '✓  Priority support' } },
          { type: 'custom-text', label: 'Feature 3', defaultStyle: { fontSize: '0.9375rem', color: '#e1e1e1' }, defaultContent: { text: '✓  Advanced analytics' } },
          { type: 'custom-text', label: 'Feature 4', defaultStyle: { fontSize: '0.9375rem', color: '#e1e1e1' }, defaultContent: { text: '✓  Custom integrations' } },
          { type: 'custom-text', label: 'Feature 5', defaultStyle: { fontSize: '0.9375rem', color: 'rgba(225,225,225,0.4)' }, defaultContent: { text: '✕  White-label' } },
        ]},
        { type: 'custom-button', label: 'CTA', defaultStyle: { display: 'block', padding: '0.9375rem 2rem', backgroundColor: '#4a2711', color: '#f6efe5', borderRadius: '0.375rem', fontSize: '0.9375rem', fontWeight: 500, cursor: 'pointer', textAlign: 'center', transition: 'all 0.4s ease' }, defaultContent: { label: 'Get Started', href: '#' } },
      ],
    },
  },
  {
    id: 'comp-card-testimonial-brixsa',
    label: 'Testimonial Premium',
    category: 'components', subcategory: 'cards',
    tags: ['card', 'testimonial', 'review', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Testimonial Card',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1.5rem',
        padding: '2rem',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: '0.75rem',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.06)',
      },
      defaultContent: {},
      children: [
        { type: 'custom-text', label: 'Stars', defaultStyle: { fontSize: '1rem', color: '#c8a97e', letterSpacing: '0.15em' }, defaultContent: { text: '★ ★ ★ ★ ★' } },
        { type: 'custom-text', label: 'Quote', defaultStyle: { fontSize: '1.0625rem', lineHeight: '1.65', color: '#e1e1e1', fontStyle: 'italic' }, defaultContent: { text: '"This platform completely transformed how we present our properties. The attention to detail is remarkable and our clients notice the difference."' } },
        { type: 'custom-container', label: 'Author', defaultStyle: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.875rem', marginTop: '0.5rem' }, defaultContent: {}, children: [
          { type: 'custom-image', label: 'Avatar', defaultStyle: { width: '44px', height: '44px', borderRadius: '99px', objectFit: 'cover' }, defaultContent: { src: '', alt: 'Avatar' } },
          { type: 'custom-container', label: 'Info', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.125rem' }, defaultContent: {}, children: [
            { type: 'custom-text', label: 'Name', defaultStyle: { fontSize: '0.9375rem', fontWeight: 600, color: '#f6efe5' }, defaultContent: { text: 'Sarah Mitchell' } },
            { type: 'custom-text', label: 'Role', defaultStyle: { fontSize: '0.8125rem', color: 'rgba(225,225,225,0.5)' }, defaultContent: { text: 'CEO, Luxury Estates' } },
          ]},
        ]},
      ],
    },
  },
  {
    id: 'comp-card-feature-icon',
    label: 'Feature Card Icon',
    category: 'components', subcategory: 'cards',
    tags: ['card', 'feature', 'icon', 'service'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Feature Card',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1.25rem',
        padding: '2rem',
        backgroundColor: '#f6efe5',
        borderRadius: '0.5rem',
        transition: 'all 0.4s ease',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Icon', defaultStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', backgroundColor: '#4a2711', borderRadius: '0.5rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Emoji', defaultStyle: { fontSize: '1.375rem', color: '#f6efe5' }, defaultContent: { text: '◆' } },
        ]},
        { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.125rem', fontWeight: 600, color: '#140c08', lineHeight: '1.35' }, defaultContent: { text: 'Lightning Fast', tag: 'h3' } },
        { type: 'custom-text', label: 'Description', defaultStyle: { fontSize: '0.9375rem', lineHeight: '1.65', color: '#56595a' }, defaultContent: { text: 'Optimized for speed with cutting-edge technology delivering the best possible performance.' } },
      ],
    },
  },
  {
    id: 'comp-card-stat',
    label: 'Stat Card',
    category: 'components', subcategory: 'cards',
    tags: ['card', 'stat', 'number', 'counter', 'metric'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Stat Card',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '0.5rem',
        padding: '2rem',
        textAlign: 'center',
      },
      defaultContent: {},
      children: [
        { type: 'custom-heading', label: 'Number', defaultStyle: { fontSize: '3rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1' }, defaultContent: { text: '500+', tag: 'h2' } },
        { type: 'custom-text', label: 'Label', defaultStyle: { fontSize: '0.875rem', fontWeight: 500, color: 'rgba(225,225,225,0.5)', letterSpacing: '0.05em', textTransform: 'uppercase' }, defaultContent: { text: 'Projects Delivered' } },
      ],
    },
  },
  {
    id: 'comp-card-team-member',
    label: 'Team Member',
    category: 'components', subcategory: 'cards',
    tags: ['card', 'team', 'member', 'portrait'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Team Member',
      defaultStyle: {
        display: 'flex', flexDirection: 'column',
        borderRadius: '0.5rem', overflow: 'hidden',
        backgroundColor: '#f6efe5',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Image Wrap', defaultStyle: { overflow: 'hidden', height: '320px' }, defaultContent: {}, children: [
          { type: 'custom-image', label: 'Portrait', defaultStyle: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }, defaultContent: { src: '', alt: 'Team member' } },
        ]},
        { type: 'custom-container', label: 'Info', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '1.25rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Name', defaultStyle: { fontSize: '1rem', fontWeight: 600, color: '#140c08' }, defaultContent: { text: 'Emma Wilson' } },
          { type: 'custom-text', label: 'Role', defaultStyle: { fontSize: '0.8125rem', color: '#56595a' }, defaultContent: { text: 'Lead Designer' } },
        ]},
      ],
    },
  },
  {
    id: 'comp-card-cta-split',
    label: 'CTA Banner',
    category: 'components', subcategory: 'cta',
    tags: ['card', 'cta', 'banner', 'call-to-action'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'CTA Banner',
      defaultStyle: {
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        padding: '3rem 3.5rem',
        backgroundColor: '#140c08',
        borderRadius: '1rem',
        gap: '2rem',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Text', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: '1' }, defaultContent: {}, children: [
          { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.75rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.25' }, defaultContent: { text: 'Ready to get started?', tag: 'h2' } },
          { type: 'custom-text', label: 'Subtitle', defaultStyle: { fontSize: '1rem', color: 'rgba(225,225,225,0.6)' }, defaultContent: { text: 'Join thousands of professionals who trust our platform.' } },
        ]},
        { type: 'custom-button', label: 'Button', defaultStyle: { display: 'inline-block', padding: '0.9375rem 2.25rem', backgroundColor: '#4a2711', color: '#f6efe5', borderRadius: '0.375rem', fontSize: '0.9375rem', fontWeight: 500, cursor: 'pointer', textAlign: 'center', transition: 'all 0.4s ease', whiteSpace: 'nowrap' }, defaultContent: { label: 'Start Now →', href: '#' } },
      ],
    },
  },
  {
    id: 'comp-card-property',
    label: 'Property Card',
    category: 'components', subcategory: 'cards',
    tags: ['card', 'property', 'real-estate', 'listing', 'brixsa'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Property Card',
      defaultStyle: {
        display: 'flex', flexDirection: 'column',
        borderRadius: '0.5rem', overflow: 'hidden',
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Image Wrap', defaultStyle: { position: 'relative', overflow: 'hidden', height: '240px' }, defaultContent: {}, children: [
          { type: 'custom-image', label: 'Photo', defaultStyle: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }, defaultContent: { src: '', alt: 'Property' } },
          { type: 'custom-text', label: 'Badge', defaultStyle: { position: 'absolute', top: '12px', left: '12px', display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: 'rgba(0,0,0,0.45)', color: '#fff', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 500, backdropFilter: 'blur(8px)' }, defaultContent: { text: 'For Sale' } },
        ]},
        { type: 'custom-container', label: 'Info', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.25rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Location', defaultStyle: { fontSize: '0.75rem', fontWeight: 500, color: '#56595a', letterSpacing: '0.03em', textTransform: 'uppercase' }, defaultContent: { text: 'Paris, France' } },
          { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.125rem', fontWeight: 600, color: '#140c08', lineHeight: '1.3' }, defaultContent: { text: 'Luxury Penthouse with City Views', tag: 'h3' } },
          { type: 'custom-container', label: 'Meta', defaultStyle: { display: 'flex', flexDirection: 'row', gap: '1rem', marginTop: '0.25rem' }, defaultContent: {}, children: [
            { type: 'custom-text', label: 'Beds', defaultStyle: { fontSize: '0.8125rem', color: '#71717a' }, defaultContent: { text: '3 Beds' } },
            { type: 'custom-text', label: 'Baths', defaultStyle: { fontSize: '0.8125rem', color: '#71717a' }, defaultContent: { text: '2 Baths' } },
            { type: 'custom-text', label: 'Area', defaultStyle: { fontSize: '0.8125rem', color: '#71717a' }, defaultContent: { text: '180 m²' } },
          ]},
          { type: 'custom-text', label: 'Price', defaultStyle: { fontSize: '1.25rem', fontWeight: 600, color: '#4a2711', marginTop: '0.5rem' }, defaultContent: { text: '€1,250,000' } },
        ]},
      ],
    },
  },
  {
    id: 'comp-card-dark-elevated',
    label: 'Dark Elevated Card',
    category: 'components', subcategory: 'cards',
    tags: ['card', 'dark', 'elevated', 'tech'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Dark Card',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1.25rem',
        padding: '2rem',
        backgroundColor: '#18181b',
        borderRadius: '0.75rem',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      },
      defaultContent: {},
      children: [
        { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.25rem', fontWeight: 600, color: '#fafafa', lineHeight: '1.3' }, defaultContent: { text: 'Advanced Analytics', tag: 'h3' } },
        { type: 'custom-text', label: 'Desc', defaultStyle: { fontSize: '0.9375rem', lineHeight: '1.65', color: '#a1a1aa' }, defaultContent: { text: 'Deep insights into your performance with real-time dashboards and custom reporting.' } },
        { type: 'custom-text', label: 'Link', defaultStyle: { fontSize: '0.875rem', fontWeight: 500, color: '#6366f1', cursor: 'pointer' }, defaultContent: { text: 'Learn more →' } },
      ],
    },
  },
]

// ─── NAVBARS ───

const NAVBARS: LibraryElementItem[] = [
  {
    id: 'comp-navbar-glass',
    label: 'Navbar Glassmorphism',
    category: 'components', subcategory: 'navbars',
    tags: ['navbar', 'glass', 'navigation', 'header'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Navbar Glass',
      defaultStyle: {
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2.5rem', width: '100%',
        backgroundColor: 'rgba(20,12,8,0.6)',
        backdropFilter: 'blur(20px)',
        borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(255,255,255,0.08)',
      },
      defaultContent: {},
      children: [
        { type: 'custom-text', label: 'Logo', defaultStyle: { fontSize: '1.25rem', fontWeight: 700, color: '#f6efe5', letterSpacing: '-0.02em' }, defaultContent: { text: 'BRIXSA' } },
        { type: 'custom-container', label: 'Links', defaultStyle: { display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'center' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Link 1', defaultStyle: { fontSize: '0.875rem', color: 'rgba(225,225,225,0.7)', cursor: 'pointer' }, defaultContent: { text: 'Properties' } },
          { type: 'custom-text', label: 'Link 2', defaultStyle: { fontSize: '0.875rem', color: 'rgba(225,225,225,0.7)', cursor: 'pointer' }, defaultContent: { text: 'About' } },
          { type: 'custom-text', label: 'Link 3', defaultStyle: { fontSize: '0.875rem', color: 'rgba(225,225,225,0.7)', cursor: 'pointer' }, defaultContent: { text: 'Contact' } },
        ]},
        { type: 'custom-button', label: 'CTA', defaultStyle: { display: 'inline-block', padding: '0.625rem 1.5rem', backgroundColor: 'rgba(128,117,117,0.5)', color: '#f6efe5', borderRadius: '99px', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', textAlign: 'center', backdropFilter: 'blur(12px)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }, defaultContent: { label: 'Get Started', href: '#' } },
      ],
    },
  },
]

// ─── FOOTERS ───

const FOOTERS: LibraryElementItem[] = [
  {
    id: 'comp-footer-premium',
    label: 'Footer Premium',
    category: 'components', subcategory: 'footers',
    tags: ['footer', 'premium', 'multi-column'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Footer',
      defaultStyle: {
        display: 'flex', flexDirection: 'row', gap: '4rem',
        padding: '4rem 3rem 2rem',
        backgroundColor: '#f6efe5', width: '100%',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Brand', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '1rem', flex: '1', maxWidth: '320px' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Logo', defaultStyle: { fontSize: '1.25rem', fontWeight: 700, color: '#140c08' }, defaultContent: { text: 'BRAND' } },
          { type: 'custom-text', label: 'Description', defaultStyle: { fontSize: '0.875rem', lineHeight: '1.65', color: '#56595a' }, defaultContent: { text: 'Creating exceptional digital experiences for visionary brands since 2020.' } },
        ]},
        { type: 'custom-container', label: 'Links Col', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.75rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Title', defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, color: '#140c08', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.25rem' }, defaultContent: { text: 'Navigation' } },
          { type: 'custom-text', label: 'L1', defaultStyle: { fontSize: '0.875rem', color: '#56595a', cursor: 'pointer' }, defaultContent: { text: 'Home' } },
          { type: 'custom-text', label: 'L2', defaultStyle: { fontSize: '0.875rem', color: '#56595a', cursor: 'pointer' }, defaultContent: { text: 'About' } },
          { type: 'custom-text', label: 'L3', defaultStyle: { fontSize: '0.875rem', color: '#56595a', cursor: 'pointer' }, defaultContent: { text: 'Services' } },
          { type: 'custom-text', label: 'L4', defaultStyle: { fontSize: '0.875rem', color: '#56595a', cursor: 'pointer' }, defaultContent: { text: 'Contact' } },
        ]},
        { type: 'custom-container', label: 'Links Col 2', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.75rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Title', defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, color: '#140c08', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.25rem' }, defaultContent: { text: 'Legal' } },
          { type: 'custom-text', label: 'L1', defaultStyle: { fontSize: '0.875rem', color: '#56595a', cursor: 'pointer' }, defaultContent: { text: 'Privacy Policy' } },
          { type: 'custom-text', label: 'L2', defaultStyle: { fontSize: '0.875rem', color: '#56595a', cursor: 'pointer' }, defaultContent: { text: 'Terms of Service' } },
          { type: 'custom-text', label: 'L3', defaultStyle: { fontSize: '0.875rem', color: '#56595a', cursor: 'pointer' }, defaultContent: { text: 'Cookie Policy' } },
        ]},
      ],
    },
  },
]

export const LIBRARY_COMPONENTS: LibraryElementItem[] = [
  ...BUTTONS,
  ...BADGES,
  ...CARDS,
  ...NAVBARS,
  ...FOOTERS,
]
