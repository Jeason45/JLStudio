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
  {
    id: 'btn-scan-d8ea1ef78050',
    label: 'Button sharp black',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'uppercase', 'bold', 'sharp'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Button sharp black',
      defaultStyle: {
        display: 'inline-block', padding: '22px 18px',
        backgroundColor: '#dec7a6', color: '#121212',
        borderRadius: '0px', fontSize: '16px', fontWeight: 900,
        cursor: 'pointer', textAlign: 'center',
        textTransform: 'uppercase',
        transition: 'all 0.4s ease',
      },
      defaultContent: { label: 'Button', href: '#' },
    },
  },
  {
    id: 'btn-scan-2cf5fc799b94',
    label: 'Button sm normal',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Button sm normal',
      defaultStyle: {
        display: 'inline-block', padding: '0px 15px',
        backgroundColor: '#000000', color: '#ffffff',
        borderRadius: '2px', fontSize: '18px', fontWeight: 400,
        cursor: 'pointer', textAlign: 'center',
        transition: 'all 0.4s ease',
      },
      defaultContent: { label: 'Button', href: '#' },
    },
  },
  {
    id: 'btn-scan-0bfb34b56a2b',
    label: 'Button sm black',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'uppercase', 'bold'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Button sm black',
      defaultStyle: {
        display: 'inline-block', padding: '30px 24px',
        backgroundColor: '#dec7a6', color: '#121212',
        borderRadius: '2px', fontSize: '18px', fontWeight: 900,
        cursor: 'pointer', textAlign: 'center',
        textTransform: 'uppercase',
        transition: 'all 0.4s ease',
      },
      defaultContent: { label: 'Button', href: '#' },
    },
  },
  {
    id: 'btn-scan-02226ac5e215',
    label: 'Button sm bold',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'bold'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Button sm bold',
      defaultStyle: {
        display: 'inline-block', padding: '10px 25px',
        backgroundColor: '#333333', color: '#ffffff',
        borderRadius: '2px', fontSize: '14px', fontWeight: 700,
        cursor: 'pointer', textAlign: 'center',
        transition: 'all 0.4s ease',
      },
      defaultContent: { label: 'Button', href: '#' },
    },
  },
  {
    id: 'btn-scan-464ec5de232e',
    label: 'Button sm normal',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button'],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: 'Button sm normal',
      defaultStyle: {
        display: 'inline-block', padding: '10px 25px',
        backgroundColor: '#333333', color: '#ffffff',
        borderRadius: '2px', fontSize: '14px', fontWeight: 400,
        cursor: 'pointer', textAlign: 'center',
        transition: 'all 0.4s ease',
      },
      defaultContent: { label: 'Button', href: '#' },
    },
  },
  {
    id: 'comp-btn-sweep-fill',
    label: 'Button Sweep Fill',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'sweep', 'fill', 'hover', 'animation', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Button Sweep Fill',
      defaultStyle: { width: 'auto', minHeight: '48px', display: 'inline-block' },
      defaultContent: { html: '<style>.btn-sweep{position:relative;display:inline-block;padding:0.875rem 2.25rem;background:#140c08;color:#f6efe5;font-size:0.9375rem;font-weight:500;border:none;border-radius:0.375rem;cursor:pointer;overflow:hidden;text-align:center;letter-spacing:0.01em;transition:color 0.4s ease;z-index:1}.btn-sweep::before{content:"";position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(135deg,#c8a97e,#4a2711);transition:left 0.5s cubic-bezier(0.25,0.46,0.45,0.94);z-index:-1}.btn-sweep:hover::before{left:0}.btn-sweep:hover{color:#f6efe5}</style><button class="btn-sweep">Sweep Fill</button>' },
    },
  },
  {
    id: 'comp-btn-neon-glow',
    label: 'Button Neon Glow',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'neon', 'glow', 'hover', 'animation'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Button Neon Glow',
      defaultStyle: { width: 'auto', minHeight: '48px', display: 'inline-block' },
      defaultContent: { html: '<style>.btn-neon{display:inline-block;padding:0.875rem 2.25rem;background:transparent;color:#fff;font-size:0.9375rem;font-weight:500;border:1px solid rgba(99,102,241,0.6);border-radius:0.5rem;cursor:pointer;text-align:center;letter-spacing:0.01em;transition:all 0.4s ease;box-shadow:0 0 8px rgba(99,102,241,0.2)}.btn-neon:hover{box-shadow:0 0 20px rgba(99,102,241,0.5),0 0 40px rgba(99,139,255,0.3),0 0 60px rgba(99,102,241,0.15);border-color:#6366f1;text-shadow:0 0 8px rgba(99,102,241,0.5)}</style><button class="btn-neon">Neon Glow</button>' },
    },
  },
  {
    id: 'comp-btn-circular-nav',
    label: 'Circular Nav Button',
    category: 'components',
    subcategory: 'buttons',
    tags: ['button', 'circular', 'navigation', 'arrow', 'round'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Circular Nav Button',
      defaultStyle: { width: '50px', height: '50px', display: 'inline-block' },
      defaultContent: { html: '<style>.btn-circ-nav{display:inline-flex;align-items:center;justify-content:center;width:50px;height:50px;background:rgba(255,255,255,0.08);color:#f6efe5;border:1px solid rgba(255,255,255,0.12);border-radius:99px;cursor:pointer;font-size:1.25rem;backdrop-filter:blur(16px);transition:all 0.35s ease}.btn-circ-nav:hover{transform:scale(1.1);background:rgba(255,255,255,0.15)}</style><button class="btn-circ-nav">&rarr;</button>' },
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
  {
    id: 'comp-badge-new',
    label: 'Badge NEW',
    category: 'components', subcategory: 'badges',
    tags: ['badge', 'new', 'label', 'ecommerce'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Badge NEW',
      defaultStyle: { display: 'inline-block' },
      defaultContent: { html: '<span style="display:inline-block;padding:0.3125rem 0.625rem;background:#638BFF;color:#fff;border-radius:99px;text-transform:uppercase;font-weight:700;font-size:10px;letter-spacing:0.05em">NOUVEAU</span>' },
    },
  },
  {
    id: 'comp-badge-popular',
    label: 'Badge POPULAR',
    category: 'components', subcategory: 'badges',
    tags: ['badge', 'popular', 'best', 'pricing', 'featured'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Badge POPULAR',
      defaultStyle: { display: 'inline-block' },
      defaultContent: { html: '<span style="display:inline-block;padding:0.3125rem 0.625rem;background:#c8a97e;color:#140c08;border-radius:99px;text-transform:uppercase;font-weight:700;font-size:10px;letter-spacing:0.05em">POPULAIRE</span>' },
    },
  },
  {
    id: 'comp-badge-promo',
    label: 'Badge PROMO',
    category: 'components', subcategory: 'badges',
    tags: ['badge', 'promo', 'sale', 'discount', 'ecommerce'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Badge PROMO',
      defaultStyle: { display: 'inline-block' },
      defaultContent: { html: '<span style="display:inline-block;padding:0.3125rem 0.625rem;background:#ef4444;color:#fff;border-radius:99px;text-transform:uppercase;font-weight:700;font-size:10px;letter-spacing:0.05em">-30%</span>' },
    },
  },
  {
    id: 'comp-badge-sold-out',
    label: 'Badge SOLD OUT',
    category: 'components', subcategory: 'badges',
    tags: ['badge', 'sold-out', 'unavailable', 'ecommerce', 'stock'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Badge SOLD OUT',
      defaultStyle: { display: 'inline-block' },
      defaultContent: { html: '<span style="display:inline-block;padding:0.3125rem 0.625rem;background:#27272a;color:rgba(255,255,255,0.7);border-radius:99px;text-transform:uppercase;font-weight:700;font-size:10px;letter-spacing:0.05em;opacity:0.8">ÉPUISÉ</span>' },
    },
  },
  {
    id: 'comp-badge-pulse-dot',
    label: 'Badge with Pulse Dot',
    category: 'components', subcategory: 'badges',
    tags: ['badge', 'pulse', 'dot', 'animated', 'live', 'status'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Badge Pulse Dot',
      defaultStyle: { display: 'inline-block' },
      defaultContent: { html: '<style>@keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.85)}}</style><span style="display:inline-flex;align-items:center;gap:0.375rem;padding:0.3125rem 0.75rem;background:rgba(16,185,129,0.08);color:#e1e1e1;border-radius:99px;font-size:0.75rem;font-weight:500;border:1px solid rgba(16,185,129,0.2)"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#10b981;animation:pulse-dot 2s ease-in-out infinite"></span>En ligne</span>' },
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
  {
    id: 'comp-card-property-v2',
    label: 'Property Card',
    category: 'components', subcategory: 'cards',
    tags: ['card', 'property', 'real-estate', 'immobilier', 'listing'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Property Card',
      defaultStyle: {
        display: 'flex', flexDirection: 'column',
        borderRadius: '0.75rem', overflow: 'hidden',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        transition: 'all 0.5s ease',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Image Wrap', defaultStyle: { position: 'relative', overflow: 'hidden', height: '220px' }, defaultContent: {}, children: [
          { type: 'custom-image', label: 'Photo', defaultStyle: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }, defaultContent: { src: '', alt: 'Property' } },
          { type: 'custom-text', label: 'Price Badge', defaultStyle: { position: 'absolute', bottom: '12px', left: '12px', display: 'inline-block', padding: '0.375rem 0.875rem', backgroundColor: 'rgba(20,12,8,0.75)', color: '#f6efe5', borderRadius: '0.375rem', fontSize: '1rem', fontWeight: 600, backdropFilter: 'blur(8px)' }, defaultContent: { text: '€485,000' } },
        ]},
        { type: 'custom-container', label: 'Body', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.625rem', padding: '1.25rem' }, defaultContent: {}, children: [
          { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.0625rem', fontWeight: 600, color: '#140c08', lineHeight: '1.35' }, defaultContent: { text: 'Modern Villa with Garden', tag: 'h3' } },
          { type: 'custom-text', label: 'Location', defaultStyle: { fontSize: '0.8125rem', color: '#71717a', display: 'flex', alignItems: 'center', gap: '0.25rem' }, defaultContent: { text: 'Lyon, France' } },
          { type: 'custom-container', label: 'Meta', defaultStyle: { display: 'flex', flexDirection: 'row', gap: '1.25rem', marginTop: '0.375rem', paddingTop: '0.75rem', borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: 'rgba(0,0,0,0.06)' }, defaultContent: {}, children: [
            { type: 'custom-text', label: 'Beds', defaultStyle: { fontSize: '0.8125rem', color: '#56595a' }, defaultContent: { text: '4 Beds' } },
            { type: 'custom-text', label: 'Baths', defaultStyle: { fontSize: '0.8125rem', color: '#56595a' }, defaultContent: { text: '2 Baths' } },
            { type: 'custom-text', label: 'Area', defaultStyle: { fontSize: '0.8125rem', color: '#56595a' }, defaultContent: { text: '145 m²' } },
          ]},
        ]},
      ],
    },
  },
  {
    id: 'comp-card-blog',
    label: 'Blog Post Card',
    category: 'components', subcategory: 'cards',
    tags: ['card', 'blog', 'article', 'post', 'news'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Blog Post Card',
      defaultStyle: {
        display: 'flex', flexDirection: 'column',
        borderRadius: '0.5rem', overflow: 'hidden',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        transition: 'all 0.4s ease',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Image Wrap', defaultStyle: { position: 'relative', overflow: 'hidden', height: '200px' }, defaultContent: {}, children: [
          { type: 'custom-image', label: 'Cover', defaultStyle: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }, defaultContent: { src: '', alt: 'Blog cover' } },
        ]},
        { type: 'custom-container', label: 'Body', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Category', defaultStyle: { display: 'inline-block', padding: '0.25rem 0.625rem', backgroundColor: 'rgba(74,39,17,0.08)', color: '#4a2711', borderRadius: '99px', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', width: 'fit-content' }, defaultContent: { text: 'Design' } },
          { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.125rem', fontWeight: 600, color: '#18181b', lineHeight: '1.35' }, defaultContent: { text: 'How to Create Stunning Visual Identities', tag: 'h3' } },
          { type: 'custom-text', label: 'Excerpt', defaultStyle: { fontSize: '0.875rem', lineHeight: '1.6', color: '#71717a' }, defaultContent: { text: 'Discover the key principles behind crafting visual identities that leave a lasting impression on your audience.' } },
          { type: 'custom-container', label: 'Footer', defaultStyle: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }, defaultContent: {}, children: [
            { type: 'custom-image', label: 'Avatar', defaultStyle: { width: '32px', height: '32px', borderRadius: '99px', objectFit: 'cover' }, defaultContent: { src: '', alt: 'Author' } },
            { type: 'custom-text', label: 'Author', defaultStyle: { fontSize: '0.8125rem', fontWeight: 500, color: '#18181b' }, defaultContent: { text: 'Marie Laurent' } },
            { type: 'custom-text', label: 'Date', defaultStyle: { fontSize: '0.8125rem', color: '#a1a1aa' }, defaultContent: { text: 'Mar 15, 2026' } },
          ]},
        ]},
      ],
    },
  },
  {
    id: 'comp-card-pricing',
    label: 'Pricing Card',
    category: 'components', subcategory: 'cards',
    tags: ['card', 'pricing', 'plan', 'subscription'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Pricing Card',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1.75rem',
        padding: '2.5rem',
        backgroundColor: '#140c08',
        borderRadius: '1rem',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(200,169,126,0.25)',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Header', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.5rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Popular', defaultStyle: { display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: 'rgba(200,169,126,0.15)', color: '#c8a97e', borderRadius: '99px', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', width: 'fit-content' }, defaultContent: { text: 'Most Popular' } },
          { type: 'custom-heading', label: 'Plan', defaultStyle: { fontSize: '1.25rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.3' }, defaultContent: { text: 'Professional', tag: 'h3' } },
        ]},
        { type: 'custom-container', label: 'Price', defaultStyle: { display: 'flex', alignItems: 'baseline', gap: '0.25rem' }, defaultContent: {}, children: [
          { type: 'custom-heading', label: 'Amount', defaultStyle: { fontSize: '2.75rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1' }, defaultContent: { text: '€49', tag: 'h2' } },
          { type: 'custom-text', label: 'Period', defaultStyle: { fontSize: '0.9375rem', color: 'rgba(225,225,225,0.5)' }, defaultContent: { text: '/mois' } },
        ]},
        { type: 'custom-divider', label: 'Divider', defaultStyle: { width: '100%', opacity: 0.12 }, defaultContent: {} },
        { type: 'custom-container', label: 'Features', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.75rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'F1', defaultStyle: { fontSize: '0.9375rem', color: '#e1e1e1' }, defaultContent: { text: '✓  Projets illimités' } },
          { type: 'custom-text', label: 'F2', defaultStyle: { fontSize: '0.9375rem', color: '#e1e1e1' }, defaultContent: { text: '✓  Support prioritaire' } },
          { type: 'custom-text', label: 'F3', defaultStyle: { fontSize: '0.9375rem', color: '#e1e1e1' }, defaultContent: { text: '✓  Analytics avancées' } },
          { type: 'custom-text', label: 'F4', defaultStyle: { fontSize: '0.9375rem', color: '#e1e1e1' }, defaultContent: { text: '✓  Domaine personnalisé' } },
          { type: 'custom-text', label: 'F5', defaultStyle: { fontSize: '0.9375rem', color: 'rgba(225,225,225,0.35)' }, defaultContent: { text: '✕  API access' } },
        ]},
        { type: 'custom-button', label: 'CTA', defaultStyle: { display: 'block', padding: '0.9375rem 2rem', backgroundColor: '#c8a97e', color: '#140c08', borderRadius: '0.375rem', fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center', transition: 'all 0.4s ease' }, defaultContent: { label: 'Choisir ce plan', href: '#' } },
      ],
    },
  },
  {
    id: 'comp-card-stats',
    label: 'Stats Card',
    category: 'components', subcategory: 'cards',
    tags: ['card', 'stats', 'number', 'metric', 'dashboard'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Stats Card',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '0.75rem',
        padding: '1.75rem',
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderRadius: '0.75rem',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
      },
      defaultContent: {},
      children: [
        { type: 'custom-text', label: 'Label', defaultStyle: { fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(225,225,225,0.5)', letterSpacing: '0.03em', textTransform: 'uppercase' }, defaultContent: { text: 'Revenue' } },
        { type: 'custom-heading', label: 'Value', defaultStyle: { fontSize: '2.25rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.1' }, defaultContent: { text: '€24,580', tag: 'h2' } },
        { type: 'custom-text', label: 'Change', defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, color: '#10b981' }, defaultContent: { text: '+12.5% vs last month' } },
      ],
    },
  },
  {
    id: 'comp-card-team',
    label: 'Team Member Card',
    category: 'components', subcategory: 'cards',
    tags: ['card', 'team', 'member', 'about', 'person'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Team Member Card',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        transition: 'all 0.4s ease',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Avatar', defaultStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', backgroundColor: '#f6efe5', borderRadius: '99px', overflow: 'hidden' }, defaultContent: {}, children: [
          { type: 'custom-image', label: 'Photo', defaultStyle: { width: '100%', height: '100%', objectFit: 'cover' }, defaultContent: { src: '', alt: 'Team member' } },
        ]},
        { type: 'custom-container', label: 'Info', defaultStyle: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Name', defaultStyle: { fontSize: '1rem', fontWeight: 600, color: '#140c08' }, defaultContent: { text: 'Thomas Mercier' } },
          { type: 'custom-text', label: 'Role', defaultStyle: { fontSize: '0.8125rem', color: '#71717a' }, defaultContent: { text: 'Directeur Créatif' } },
        ]},
        { type: 'custom-container', label: 'Socials', defaultStyle: { display: 'flex', flexDirection: 'row', gap: '0.75rem', marginTop: '0.375rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'LinkedIn', defaultStyle: { fontSize: '0.8125rem', color: '#a1a1aa', cursor: 'pointer' }, defaultContent: { text: 'in' } },
          { type: 'custom-text', label: 'Twitter', defaultStyle: { fontSize: '0.8125rem', color: '#a1a1aa', cursor: 'pointer' }, defaultContent: { text: 'X' } },
          { type: 'custom-text', label: 'Dribbble', defaultStyle: { fontSize: '0.8125rem', color: '#a1a1aa', cursor: 'pointer' }, defaultContent: { text: 'Dr' } },
        ]},
      ],
    },
  },
  {
    id: 'comp-card-contact',
    label: 'Contact Info Card',
    category: 'components', subcategory: 'cards',
    tags: ['card', 'contact', 'info', 'address', 'email'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Contact Info Card',
      defaultStyle: {
        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.25rem',
        padding: '1.5rem 1.75rem',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '0.75rem',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Icon Circle', defaultStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', minWidth: '48px', backgroundColor: 'rgba(200,169,126,0.12)', borderRadius: '99px' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Icon', defaultStyle: { fontSize: '1.125rem', color: '#c8a97e' }, defaultContent: { text: '✉' } },
        ]},
        { type: 'custom-container', label: 'Text', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.25rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Title', defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(225,225,225,0.5)', letterSpacing: '0.04em', textTransform: 'uppercase' }, defaultContent: { text: 'Email' } },
          { type: 'custom-text', label: 'Value', defaultStyle: { fontSize: '0.9375rem', fontWeight: 500, color: '#f6efe5' }, defaultContent: { text: 'contact@studio.com' } },
        ]},
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

// ─── MISC UI ───

const MISC_UI: LibraryElementItem[] = [
  {
    id: 'comp-trust-badges',
    label: 'Trust Badges Row',
    category: 'components', subcategory: 'misc',
    tags: ['trust', 'badges', 'payment', 'security'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Trust Badges Row',
      defaultStyle: { width: '100%', minHeight: '40px' },
      defaultContent: { html: '<style>.trust-row{display:flex;flex-direction:row;align-items:center;justify-content:center;gap:2rem;padding:1rem 0}.trust-item{display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;font-weight:500;color:rgba(225,225,225,0.45);letter-spacing:0.02em}.trust-icon{font-size:1rem;opacity:0.6}</style><div class="trust-row"><span class="trust-item"><span class="trust-icon">🔒</span> SSL Secured</span><span class="trust-item"><span class="trust-icon">✓</span> Verified</span><span class="trust-item"><span class="trust-icon">⚡</span> Fast Delivery</span><span class="trust-item"><span class="trust-icon">↩</span> Easy Returns</span></div>' },
    },
  },
  {
    id: 'comp-announcement-bar',
    label: 'Announcement Bar',
    category: 'components', subcategory: 'misc',
    tags: ['announcement', 'bar', 'banner', 'top', 'promo'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Announcement Bar',
      defaultStyle: { width: '100%', minHeight: '44px' },
      defaultContent: { html: '<style>.announce-bar{display:flex;align-items:center;justify-content:center;gap:0.625rem;padding:0.75rem 1.5rem;background:#140c08;border-bottom:1px solid rgba(200,169,126,0.15);width:100%}.announce-text{font-size:0.8125rem;font-weight:500;color:#f6efe5;letter-spacing:0.01em}.announce-icon{font-size:0.875rem;color:#c8a97e}.announce-close{background:none;border:none;color:rgba(225,225,225,0.4);font-size:1rem;cursor:pointer;margin-left:auto;padding:0 0.25rem;transition:color 0.3s ease}.announce-close:hover{color:#f6efe5}</style><div class="announce-bar"><span class="announce-icon">✦</span><span class="announce-text">Free shipping on orders over €100 — Limited time offer</span><button class="announce-close">&times;</button></div>' },
    },
  },
  {
    id: 'comp-newsletter-combo',
    label: 'Newsletter Input Combo',
    category: 'components', subcategory: 'misc',
    tags: ['newsletter', 'email', 'input', 'subscribe', 'form'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Newsletter Input Combo',
      defaultStyle: { width: '100%', maxWidth: '480px', minHeight: '52px' },
      defaultContent: { html: '<style>.nl-combo{display:flex;flex-direction:row;align-items:center;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:99px;padding:0.375rem;backdrop-filter:blur(16px)}.nl-input{flex:1;background:transparent;border:none;outline:none;padding:0.625rem 1.25rem;font-size:0.875rem;color:#f6efe5}.nl-input::placeholder{color:rgba(225,225,225,0.35)}.nl-btn{display:inline-block;padding:0.625rem 1.5rem;background:#c8a97e;color:#140c08;border:none;border-radius:99px;font-size:0.8125rem;font-weight:600;cursor:pointer;transition:all 0.3s ease;white-space:nowrap}.nl-btn:hover{background:#d4b88e}</style><div class="nl-combo"><input class="nl-input" type="email" placeholder="Enter your email address" /><button class="nl-btn">Subscribe</button></div>' },
    },
  },
  {
    id: 'comp-scroll-indicator',
    label: 'Scroll Down Indicator',
    category: 'components', subcategory: 'misc',
    tags: ['scroll', 'indicator', 'down', 'arrow', 'hero'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Scroll Down Indicator',
      defaultStyle: { width: '40px', minHeight: '60px', display: 'flex', justifyContent: 'center' },
      defaultContent: { html: '<style>@keyframes scrollBounce{0%,100%{transform:translateY(0);opacity:0.6}50%{transform:translateY(8px);opacity:1}}.scroll-ind{display:flex;flex-direction:column;align-items:center;gap:0.5rem;animation:scrollBounce 2s ease-in-out infinite}.scroll-mouse{width:24px;height:38px;border:2px solid rgba(246,239,229,0.4);border-radius:12px;position:relative}.scroll-dot{position:absolute;top:6px;left:50%;transform:translateX(-50%);width:3px;height:8px;background:rgba(246,239,229,0.6);border-radius:99px;animation:scrollDot 2s ease-in-out infinite}@keyframes scrollDot{0%,100%{opacity:1;top:6px}50%{opacity:0.3;top:18px}}.scroll-chevron{color:rgba(246,239,229,0.4);font-size:0.75rem}</style><div class="scroll-ind"><div class="scroll-mouse"><div class="scroll-dot"></div></div><span class="scroll-chevron">&#8964;</span></div>' },
    },
  },
  {
    id: 'comp-input-focus-ring',
    label: 'Input Focus Ring Styles',
    category: 'components', subcategory: 'misc',
    tags: ['input', 'focus', 'ring', 'form', 'field', 'styles'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Input Focus Ring Styles',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem;padding:2rem;background:#140c08;border-radius:.75rem"><style>.ifr-group{display:flex;flex-direction:column;gap:.375rem}.ifr-label{font-size:.6875rem;font-weight:500;color:rgba(246,239,229,0.4);letter-spacing:.04em;text-transform:uppercase}.ifr-rounded{width:100%;padding:.625rem 1rem;background:rgba(255,255,255,0.04);border:1px solid rgba(246,239,229,0.1);border-radius:8px;color:#f6efe5;font-size:.8125rem;outline:none;transition:box-shadow .2s,border-color .2s}.ifr-rounded:focus{border-color:#638BFF;box-shadow:0 0 0 3px rgba(99,139,255,0.2)}.ifr-underline{width:100%;padding:.625rem 0;background:transparent;border:none;border-bottom:1px solid rgba(246,239,229,0.15);color:#f6efe5;font-size:.8125rem;outline:none;transition:border-color .2s}.ifr-underline:focus{border-bottom-color:#c8a97e}.ifr-glass{width:100%;padding:.625rem 1rem;background:rgba(255,255,255,0.05);backdrop-filter:blur(12px);border:1px solid rgba(246,239,229,0.06);border-radius:6px;color:#f6efe5;font-size:.8125rem;outline:none;transition:background .2s,border-color .2s}.ifr-glass:focus{background:rgba(255,255,255,0.08);border-color:rgba(246,239,229,0.12)}.ifr-bold{width:100%;padding:.625rem 1rem;background:rgba(255,255,255,0.03);border:2px solid rgba(246,239,229,0.12);border-radius:6px;color:#f6efe5;font-size:.8125rem;outline:none;transition:box-shadow .2s,border-color .2s}.ifr-bold:focus{border-color:#638BFF;box-shadow:0 0 0 3px rgba(99,139,255,0.15),0 0 0 6px rgba(99,139,255,0.05)}</style><div class="ifr-group"><span class="ifr-label">Rounded + Ring</span><input class="ifr-rounded" placeholder="Click to focus..." /></div><div class="ifr-group"><span class="ifr-label">Underline Only</span><input class="ifr-underline" placeholder="Click to focus..." /></div><div class="ifr-group"><span class="ifr-label">Glass Dark</span><input class="ifr-glass" placeholder="Click to focus..." /></div><div class="ifr-group"><span class="ifr-label">Bold Border</span><input class="ifr-bold" placeholder="Click to focus..." /></div></div>' },
    },
  },
  {
    id: 'comp-comparison-table',
    label: 'Comparison/Pricing Table',
    category: 'components', subcategory: 'misc',
    tags: ['table', 'comparison', 'pricing', 'features', 'plans'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Comparison/Pricing Table',
      defaultStyle: { width: '100%', minHeight: '320px' },
      defaultContent: { html: '<div style="display:flex;align-items:center;justify-content:center;padding:2rem;background:#140c08"><style>.cpt-table{width:100%;max-width:600px;border-collapse:separate;border-spacing:0}.cpt-table th,.cpt-table td{padding:.75rem 1rem;text-align:center;font-size:.8125rem;border-bottom:1px solid rgba(246,239,229,0.06)}.cpt-table th{font-weight:600;color:#f6efe5;letter-spacing:.02em;padding-top:1rem;padding-bottom:1rem}.cpt-table td{color:rgba(246,239,229,0.6)}.cpt-table td:first-child{text-align:left;font-weight:500;color:rgba(246,239,229,0.8)}.cpt-highlight{position:relative;background:rgba(99,139,255,0.06)}.cpt-highlight-head{background:rgba(99,139,255,0.1);color:#638BFF !important;position:relative}.cpt-highlight-head::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:#638BFF;border-radius:2px 2px 0 0}.cpt-check{color:#c8a97e}.cpt-cross{color:rgba(246,239,229,0.2)}</style><table class="cpt-table"><thead><tr><th></th><th>Basic</th><th class="cpt-highlight-head">Pro</th><th>Enterprise</th></tr></thead><tbody><tr><td>Custom Domain</td><td class="cpt-check">&#10003;</td><td class="cpt-highlight cpt-check">&#10003;</td><td class="cpt-check">&#10003;</td></tr><tr><td>Analytics</td><td class="cpt-cross">&#10005;</td><td class="cpt-highlight cpt-check">&#10003;</td><td class="cpt-check">&#10003;</td></tr><tr><td>Priority Support</td><td class="cpt-cross">&#10005;</td><td class="cpt-highlight cpt-check">&#10003;</td><td class="cpt-check">&#10003;</td></tr><tr><td>White Label</td><td class="cpt-cross">&#10005;</td><td class="cpt-highlight cpt-cross">&#10005;</td><td class="cpt-check">&#10003;</td></tr></tbody></table></div>' },
    },
  },
]

// ─── LAYOUTS ───

const LAYOUTS: LibraryElementItem[] = [
  {
    id: 'comp-layout-bento-grid',
    label: 'Bento Grid 2x3',
    category: 'components', subcategory: 'layouts',
    tags: ['layout', 'bento', 'grid', 'asymmetric', 'featured'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Bento Grid',
      defaultStyle: {
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem',
        width: '100%',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Featured', defaultStyle: { gridColumn: 'span 2', gridRow: 'span 2', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '0.75rem', padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', minHeight: '320px' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Overline', defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8a97e' }, defaultContent: { text: 'Featured' } },
          { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.75rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.25' }, defaultContent: { text: 'Premium Experience', tag: 'h2' } },
          { type: 'custom-text', label: 'Desc', defaultStyle: { fontSize: '0.9375rem', lineHeight: '1.65', color: 'rgba(225,225,225,0.6)' }, defaultContent: { text: 'Crafted with attention to every detail for an unparalleled experience.' } },
        ]},
        { type: 'custom-container', label: 'Cell 2', defaultStyle: { display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '0.5rem', padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)' }, defaultContent: {}, children: [
          { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.125rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.35' }, defaultContent: { text: 'Analytics', tag: 'h3' } },
          { type: 'custom-text', label: 'Desc', defaultStyle: { fontSize: '0.8125rem', lineHeight: '1.5', color: 'rgba(225,225,225,0.5)' }, defaultContent: { text: 'Real-time insights and metrics.' } },
        ]},
        { type: 'custom-container', label: 'Cell 3', defaultStyle: { display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '0.5rem', padding: '1.5rem', backgroundColor: 'rgba(200,169,126,0.1)', borderRadius: '0.75rem', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(200,169,126,0.2)' }, defaultContent: {}, children: [
          { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.125rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.35' }, defaultContent: { text: 'Integrations', tag: 'h3' } },
          { type: 'custom-text', label: 'Desc', defaultStyle: { fontSize: '0.8125rem', lineHeight: '1.5', color: 'rgba(225,225,225,0.5)' }, defaultContent: { text: 'Connect your favorite tools.' } },
        ]},
        { type: 'custom-container', label: 'Cell 4', defaultStyle: { display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '0.5rem', padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)' }, defaultContent: {}, children: [
          { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.125rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.35' }, defaultContent: { text: 'Security', tag: 'h3' } },
          { type: 'custom-text', label: 'Desc', defaultStyle: { fontSize: '0.8125rem', lineHeight: '1.5', color: 'rgba(225,225,225,0.5)' }, defaultContent: { text: 'Enterprise-grade protection.' } },
        ]},
      ],
    },
  },
  {
    id: 'comp-layout-split-60-40',
    label: 'Split Layout 60/40',
    category: 'components', subcategory: 'layouts',
    tags: ['layout', 'split', 'hero', 'two-column', 'asymmetric'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Split 60/40',
      defaultStyle: {
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        gap: '3rem', width: '100%',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Content', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: '3' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Overline', defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8a97e' }, defaultContent: { text: 'About Us' } },
          { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '2.5rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.15', letterSpacing: '-0.02em' }, defaultContent: { text: 'We Build Exceptional\nDigital Experiences', tag: 'h1' } },
          { type: 'custom-text', label: 'Description', defaultStyle: { fontSize: '1rem', lineHeight: '1.7', color: 'rgba(225,225,225,0.6)' }, defaultContent: { text: 'Our team combines strategy, design, and technology to create products that make a lasting impression on your audience.' } },
          { type: 'custom-button', label: 'CTA', defaultStyle: { display: 'inline-block', padding: '0.875rem 2.25rem', backgroundColor: '#c8a97e', color: '#140c08', borderRadius: '0.375rem', fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center', transition: 'all 0.4s ease', width: 'fit-content' }, defaultContent: { label: 'Discover More', href: '#' } },
        ]},
        { type: 'custom-container', label: 'Image', defaultStyle: { flex: '2', minHeight: '400px', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #1a1210, #2a1f18)', overflow: 'hidden' }, defaultContent: {}, children: [
          { type: 'custom-image', label: 'Visual', defaultStyle: { width: '100%', height: '100%', objectFit: 'cover' }, defaultContent: { src: '', alt: 'Visual' } },
        ]},
      ],
    },
  },
  {
    id: 'comp-layout-masonry-2col',
    label: 'Masonry 2 Columns',
    category: 'components', subcategory: 'layouts',
    tags: ['layout', 'masonry', 'columns', 'gallery', 'waterfall'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Masonry 2 Col',
      defaultStyle: {
        columns: '2', gap: '1rem', width: '100%',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Item 1', defaultStyle: { breakInside: 'avoid', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', minHeight: '200px' }, defaultContent: {}, children: [
          { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.125rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.35' }, defaultContent: { text: 'Creative Direction', tag: 'h3' } },
          { type: 'custom-text', label: 'Desc', defaultStyle: { fontSize: '0.875rem', lineHeight: '1.65', color: 'rgba(225,225,225,0.5)' }, defaultContent: { text: 'Setting the visual tone and guiding creative decisions across every touchpoint.' } },
        ]},
        { type: 'custom-container', label: 'Item 2', defaultStyle: { breakInside: 'avoid', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem', backgroundColor: 'rgba(200,169,126,0.1)', borderRadius: '0.75rem', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(200,169,126,0.2)', minHeight: '150px' }, defaultContent: {}, children: [
          { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.125rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.35' }, defaultContent: { text: 'Brand Strategy', tag: 'h3' } },
          { type: 'custom-text', label: 'Desc', defaultStyle: { fontSize: '0.875rem', lineHeight: '1.65', color: 'rgba(225,225,225,0.5)' }, defaultContent: { text: 'Defining your unique positioning.' } },
        ]},
        { type: 'custom-container', label: 'Item 3', defaultStyle: { breakInside: 'avoid', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', minHeight: '120px' }, defaultContent: {}, children: [
          { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.125rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.35' }, defaultContent: { text: 'UI Design', tag: 'h3' } },
          { type: 'custom-text', label: 'Desc', defaultStyle: { fontSize: '0.875rem', lineHeight: '1.65', color: 'rgba(225,225,225,0.5)' }, defaultContent: { text: 'Pixel-perfect interfaces.' } },
        ]},
        { type: 'custom-container', label: 'Item 4', defaultStyle: { breakInside: 'avoid', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', minHeight: '180px' }, defaultContent: {}, children: [
          { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.125rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.35' }, defaultContent: { text: 'Development', tag: 'h3' } },
          { type: 'custom-text', label: 'Desc', defaultStyle: { fontSize: '0.875rem', lineHeight: '1.65', color: 'rgba(225,225,225,0.5)' }, defaultContent: { text: 'Clean, performant code built with modern frameworks and best practices.' } },
        ]},
        { type: 'custom-container', label: 'Item 5', defaultStyle: { breakInside: 'avoid', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem', backgroundColor: 'rgba(200,169,126,0.1)', borderRadius: '0.75rem', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(200,169,126,0.2)', minHeight: '140px' }, defaultContent: {}, children: [
          { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.125rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.35' }, defaultContent: { text: 'Motion Design', tag: 'h3' } },
          { type: 'custom-text', label: 'Desc', defaultStyle: { fontSize: '0.875rem', lineHeight: '1.65', color: 'rgba(225,225,225,0.5)' }, defaultContent: { text: 'Bringing interfaces to life with purposeful animations.' } },
        ]},
      ],
    },
  },
  {
    id: 'comp-layout-footer-4col',
    label: 'Footer 4 Columns',
    category: 'components', subcategory: 'layouts',
    tags: ['layout', 'footer', 'columns', 'navigation', 'links'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Footer 4 Col',
      defaultStyle: {
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem',
        padding: '4rem 3rem 2rem', width: '100%',
        backgroundColor: '#140c08',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Brand', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '1rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Logo', defaultStyle: { fontSize: '1.375rem', fontWeight: 700, color: '#f6efe5', letterSpacing: '-0.02em' }, defaultContent: { text: 'STUDIO' } },
          { type: 'custom-text', label: 'Description', defaultStyle: { fontSize: '0.875rem', lineHeight: '1.65', color: 'rgba(225,225,225,0.5)', maxWidth: '280px' }, defaultContent: { text: 'Creating exceptional digital experiences for visionary brands. Premium quality, unmatched attention to detail.' } },
        ]},
        { type: 'custom-container', label: 'Navigation', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.75rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Title', defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, color: '#c8a97e', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.25rem' }, defaultContent: { text: 'Navigation' } },
          { type: 'custom-text', label: 'L1', defaultStyle: { fontSize: '0.875rem', color: 'rgba(225,225,225,0.6)', cursor: 'pointer' }, defaultContent: { text: 'Home' } },
          { type: 'custom-text', label: 'L2', defaultStyle: { fontSize: '0.875rem', color: 'rgba(225,225,225,0.6)', cursor: 'pointer' }, defaultContent: { text: 'About' } },
          { type: 'custom-text', label: 'L3', defaultStyle: { fontSize: '0.875rem', color: 'rgba(225,225,225,0.6)', cursor: 'pointer' }, defaultContent: { text: 'Portfolio' } },
          { type: 'custom-text', label: 'L4', defaultStyle: { fontSize: '0.875rem', color: 'rgba(225,225,225,0.6)', cursor: 'pointer' }, defaultContent: { text: 'Contact' } },
        ]},
        { type: 'custom-container', label: 'Services', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.75rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Title', defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, color: '#c8a97e', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.25rem' }, defaultContent: { text: 'Services' } },
          { type: 'custom-text', label: 'L1', defaultStyle: { fontSize: '0.875rem', color: 'rgba(225,225,225,0.6)', cursor: 'pointer' }, defaultContent: { text: 'Web Design' } },
          { type: 'custom-text', label: 'L2', defaultStyle: { fontSize: '0.875rem', color: 'rgba(225,225,225,0.6)', cursor: 'pointer' }, defaultContent: { text: 'Development' } },
          { type: 'custom-text', label: 'L3', defaultStyle: { fontSize: '0.875rem', color: 'rgba(225,225,225,0.6)', cursor: 'pointer' }, defaultContent: { text: 'Branding' } },
        ]},
        { type: 'custom-container', label: 'Legal', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.75rem' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Title', defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, color: '#c8a97e', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.25rem' }, defaultContent: { text: 'Legal' } },
          { type: 'custom-text', label: 'L1', defaultStyle: { fontSize: '0.875rem', color: 'rgba(225,225,225,0.6)', cursor: 'pointer' }, defaultContent: { text: 'Privacy Policy' } },
          { type: 'custom-text', label: 'L2', defaultStyle: { fontSize: '0.875rem', color: 'rgba(225,225,225,0.6)', cursor: 'pointer' }, defaultContent: { text: 'Terms of Service' } },
          { type: 'custom-text', label: 'L3', defaultStyle: { fontSize: '0.875rem', color: 'rgba(225,225,225,0.6)', cursor: 'pointer' }, defaultContent: { text: 'Cookie Policy' } },
        ]},
      ],
    },
  },
  {
    id: 'comp-layout-alternating',
    label: 'Alternating Feature Rows',
    category: 'components', subcategory: 'layouts',
    tags: ['layout', 'alternating', 'zigzag', 'features', 'image-text'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Alternating Rows',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '4rem',
        width: '100%',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Row 1', defaultStyle: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '3rem' }, defaultContent: {}, children: [
          { type: 'custom-container', label: 'Image', defaultStyle: { flex: '1', minHeight: '300px', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #1a1210, #2a1f18)', overflow: 'hidden' }, defaultContent: {}, children: [
            { type: 'custom-image', label: 'Visual', defaultStyle: { width: '100%', height: '100%', objectFit: 'cover' }, defaultContent: { src: '', alt: 'Feature visual' } },
          ]},
          { type: 'custom-container', label: 'Content', defaultStyle: { flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem' }, defaultContent: {}, children: [
            { type: 'custom-text', label: 'Overline', defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8a97e' }, defaultContent: { text: '01 — Design' } },
            { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.75rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.25' }, defaultContent: { text: 'Crafted With Precision', tag: 'h2' } },
            { type: 'custom-text', label: 'Description', defaultStyle: { fontSize: '0.9375rem', lineHeight: '1.7', color: 'rgba(225,225,225,0.6)' }, defaultContent: { text: 'Every pixel is placed with intention. We obsess over the details so your brand stands out in a crowded digital landscape.' } },
          ]},
        ]},
        { type: 'custom-container', label: 'Row 2', defaultStyle: { display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: '3rem' }, defaultContent: {}, children: [
          { type: 'custom-container', label: 'Image', defaultStyle: { flex: '1', minHeight: '300px', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #1a1210, #2a1f18)', overflow: 'hidden' }, defaultContent: {}, children: [
            { type: 'custom-image', label: 'Visual', defaultStyle: { width: '100%', height: '100%', objectFit: 'cover' }, defaultContent: { src: '', alt: 'Feature visual' } },
          ]},
          { type: 'custom-container', label: 'Content', defaultStyle: { flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem' }, defaultContent: {}, children: [
            { type: 'custom-text', label: 'Overline', defaultStyle: { fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8a97e' }, defaultContent: { text: '02 — Development' } },
            { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '1.75rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.25' }, defaultContent: { text: 'Built for Performance', tag: 'h2' } },
            { type: 'custom-text', label: 'Description', defaultStyle: { fontSize: '0.9375rem', lineHeight: '1.7', color: 'rgba(225,225,225,0.6)' }, defaultContent: { text: 'Lightning-fast load times, clean code architecture, and scalable solutions that grow with your business.' } },
          ]},
        ]},
      ],
    },
  },
  {
    id: 'comp-layout-centered-stack',
    label: 'Centered Content Stack',
    category: 'components', subcategory: 'layouts',
    tags: ['layout', 'centered', 'stack', 'hero', 'cta'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Centered Stack',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', maxWidth: '640px', margin: '0 auto',
        gap: '1.5rem',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Badge', defaultStyle: { display: 'inline-flex', padding: '0.375rem 1rem', backgroundColor: 'rgba(200,169,126,0.12)', borderRadius: '99px', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(200,169,126,0.2)' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Badge Text', defaultStyle: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#c8a97e' }, defaultContent: { text: 'Now Available' } },
        ]},
        { type: 'custom-heading', label: 'Title', defaultStyle: { fontSize: '2.75rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.1', letterSpacing: '-0.025em' }, defaultContent: { text: 'Transform Your\nDigital Presence', tag: 'h1' } },
        { type: 'custom-text', label: 'Description', defaultStyle: { fontSize: '1.0625rem', lineHeight: '1.7', color: 'rgba(225,225,225,0.6)', maxWidth: '520px' }, defaultContent: { text: 'Join thousands of brands who trust us to create stunning, high-performance websites that convert visitors into customers.' } },
        { type: 'custom-button', label: 'CTA', defaultStyle: { display: 'inline-block', padding: '0.9375rem 2.5rem', backgroundColor: '#c8a97e', color: '#140c08', borderRadius: '0.375rem', fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center', transition: 'all 0.4s ease' }, defaultContent: { label: 'Get Started Today', href: '#' } },
      ],
    },
  },
]

// ─── BLOCKS (reusable micro-component compositions) ───

const BLOCKS: LibraryElementItem[] = [
  {
    id: 'comp-block-social-row',
    label: 'Social Media Icons Row',
    category: 'components', subcategory: 'blocks',
    tags: ['social', 'icons', 'row', 'links', 'footer'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Social Icons Row',
      defaultStyle: { width: 'auto', minHeight: '40px', display: 'inline-block' },
      defaultContent: { html: '<style>.social-row{display:flex;flex-direction:row;align-items:center;gap:12px}.social-icon{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#f6efe5;cursor:pointer;transition:all 0.3s ease}.social-icon:hover{transform:scale(1.15);background:rgba(255,255,255,0.12)}.social-icon svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}</style><div class="social-row"><a class="social-icon" href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg></a><a class="social-icon" href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a><a class="social-icon" href="#" aria-label="X"><svg viewBox="0 0 24 24"><path d="M4 4l6.5 8L4 20h2l5.5-6.5L16 20h4l-6.5-8L20 4h-2l-5.5 6.5L8 4H4z"/></svg></a><a class="social-icon" href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a><a class="social-icon" href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></a></div>' },
    },
  },
  {
    id: 'comp-block-avatar-placeholder',
    label: 'Avatar Placeholder',
    category: 'components', subcategory: 'blocks',
    tags: ['avatar', 'placeholder', 'profile', 'user', 'photo'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Avatar Placeholder',
      defaultStyle: {
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '80px', height: '80px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #c8a97e, #4a2711)',
      },
      defaultContent: {},
      children: [
        { type: 'custom-text', label: 'Initials', defaultStyle: { fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', lineHeight: '1' }, defaultContent: { text: 'JD' } },
      ],
    },
  },
  {
    id: 'comp-block-image-placeholder',
    label: 'Image Placeholder',
    category: 'components', subcategory: 'blocks',
    tags: ['image', 'placeholder', 'photo', 'media'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Image Placeholder',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<style>.img-placeholder{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.75rem;width:100%;aspect-ratio:16/9;background:linear-gradient(135deg,#1a1a1a,#2a2a2a);border:2px dashed rgba(255,255,255,0.12);border-radius:0.75rem}.img-placeholder svg{width:32px;height:32px;stroke:rgba(255,255,255,0.25);fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}.img-placeholder span{font-size:0.8125rem;color:rgba(255,255,255,0.25);font-weight:500}</style><div class="img-placeholder"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Image</span></div>' },
    },
  },
  {
    id: 'comp-block-video-play-btn',
    label: 'Video Play Button',
    category: 'components', subcategory: 'blocks',
    tags: ['video', 'play', 'button', 'media', 'hero'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Video Play Button',
      defaultStyle: { width: '64px', height: '64px', display: 'inline-block' },
      defaultContent: { html: '<style>@keyframes playPulse{0%{box-shadow:0 0 0 0 rgba(200,169,126,0.4)}70%{box-shadow:0 0 0 16px rgba(200,169,126,0)}100%{box-shadow:0 0 0 0 rgba(200,169,126,0)}}.play-btn{display:flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);backdrop-filter:blur(20px);cursor:pointer;transition:all 0.3s ease;animation:playPulse 2s ease-in-out infinite}.play-btn:hover{transform:scale(1.1);background:rgba(255,255,255,0.18)}.play-btn svg{width:22px;height:22px;fill:#f6efe5;margin-left:3px}</style><button class="play-btn"><svg viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3"/></svg></button>' },
    },
  },
  {
    id: 'comp-block-star-rating',
    label: 'Star Rating (5 Stars)',
    category: 'components', subcategory: 'blocks',
    tags: ['stars', 'rating', 'review', 'testimonial'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Star Rating',
      defaultStyle: { width: 'auto', minHeight: '20px', display: 'inline-block' },
      defaultContent: { html: '<style>.star-rating{display:inline-flex;align-items:center;gap:0.25rem}.star-rating .stars{display:flex;gap:2px;color:#c8a97e;font-size:1rem;line-height:1}.star-rating .score{font-size:0.875rem;font-weight:600;color:#c8a97e;margin-left:0.5rem}</style><div class="star-rating"><span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span><span class="score">5.0</span></div>' },
    },
  },
  {
    id: 'comp-block-feature-item',
    label: 'Feature Checklist Item',
    category: 'components', subcategory: 'blocks',
    tags: ['feature', 'checklist', 'item', 'checkmark', 'pricing'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Feature Checklist Item',
      defaultStyle: {
        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px',
      },
      defaultContent: {},
      children: [
        { type: 'custom-container', label: 'Checkmark', defaultStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', minWidth: '20px', borderRadius: '50%', backgroundColor: '#2D5016' }, defaultContent: {}, children: [
          { type: 'custom-text', label: 'Icon', defaultStyle: { fontSize: '0.6875rem', color: '#ffffff', lineHeight: '1' }, defaultContent: { text: '✓' } },
        ]},
        { type: 'custom-text', label: 'Feature Text', defaultStyle: { fontSize: '0.9375rem', color: '#e1e1e1', lineHeight: '1.5' }, defaultContent: { text: 'Feature included in this plan' } },
      ],
    },
  },
  {
    id: 'comp-block-stat-counter',
    label: 'Stat Counter',
    category: 'components', subcategory: 'blocks',
    tags: ['stat', 'counter', 'number', 'metric', 'big'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Stat Counter',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '1.5rem', backgroundColor: '#140c08', borderRadius: '0.75rem',
      },
      defaultContent: {},
      children: [
        { type: 'custom-heading', label: 'Number', defaultStyle: { fontSize: '3rem', fontWeight: 700, color: '#f6efe5', lineHeight: '1.1' }, defaultContent: { text: '2,500+', tag: 'h2' } },
        { type: 'custom-text', label: 'Label', defaultStyle: { fontSize: '0.875rem', color: 'rgba(225,225,225,0.5)', fontWeight: 500, letterSpacing: '0.02em', marginTop: '0.375rem' }, defaultContent: { text: 'Projects Delivered' } },
      ],
    },
  },
  {
    id: 'comp-block-testimonial-quote',
    label: 'Testimonial Quote Block',
    category: 'components', subcategory: 'blocks',
    tags: ['testimonial', 'quote', 'review', 'author', 'block'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Testimonial Quote',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', gap: '1.25rem',
        padding: '2rem', backgroundColor: 'rgba(255,255,255,0.04)',
        borderRadius: '1rem', borderWidth: '1px', borderStyle: 'solid',
        borderColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
      },
      defaultContent: {},
      children: [
        { type: 'custom-text', label: 'Quote Mark', defaultStyle: { fontSize: '3rem', color: '#c8a97e', lineHeight: '1', fontFamily: 'Georgia, serif' }, defaultContent: { text: '\u201C' } },
        { type: 'custom-text', label: 'Quote Text', defaultStyle: { fontSize: '1.125rem', fontStyle: 'italic', lineHeight: '1.7', color: 'rgba(246,239,229,0.85)' }, defaultContent: { text: 'Working with this team was an absolute pleasure. The attention to detail and creative vision exceeded all expectations.' } },
        { type: 'custom-container', label: 'Author Row', defaultStyle: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }, defaultContent: {}, children: [
          { type: 'custom-container', label: 'Avatar', defaultStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', minWidth: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #c8a97e, #4a2711)' }, defaultContent: {}, children: [
            { type: 'custom-text', label: 'Initials', defaultStyle: { fontSize: '0.8125rem', fontWeight: 700, color: '#ffffff', lineHeight: '1' }, defaultContent: { text: 'SL' } },
          ]},
          { type: 'custom-container', label: 'Info', defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.125rem' }, defaultContent: {}, children: [
            { type: 'custom-text', label: 'Name', defaultStyle: { fontSize: '0.875rem', fontWeight: 600, color: '#f6efe5' }, defaultContent: { text: 'Sophie Laurent' } },
            { type: 'custom-text', label: 'Role', defaultStyle: { fontSize: '0.8125rem', color: 'rgba(225,225,225,0.5)' }, defaultContent: { text: 'Creative Director, Studio Noir' } },
          ]},
        ]},
      ],
    },
  },
  {
    id: 'comp-block-cta-group',
    label: 'CTA Button Group',
    category: 'components', subcategory: 'blocks',
    tags: ['cta', 'buttons', 'group', 'hero', 'action'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'CTA Button Group',
      defaultStyle: {
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center', gap: '16px',
      },
      defaultContent: {},
      children: [
        { type: 'custom-button', label: 'Primary CTA', defaultStyle: { display: 'inline-block', padding: '0.875rem 2.25rem', backgroundColor: '#c8a97e', color: '#140c08', borderRadius: '0.5rem', fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center', transition: 'all 0.4s ease' }, defaultContent: { label: 'Get Started', href: '#' } },
        { type: 'custom-button', label: 'Secondary CTA', defaultStyle: { display: 'inline-block', padding: '0.875rem 2.25rem', backgroundColor: 'transparent', color: '#f6efe5', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(246,239,229,0.3)', borderRadius: '0.5rem', fontSize: '0.9375rem', fontWeight: 500, cursor: 'pointer', textAlign: 'center', transition: 'all 0.4s ease' }, defaultContent: { label: 'Learn More', href: '#' } },
      ],
    },
  },
  {
    id: 'comp-block-breadcrumb',
    label: 'Breadcrumb Navigation',
    category: 'components', subcategory: 'blocks',
    tags: ['breadcrumb', 'navigation', 'path', 'links'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Breadcrumb Navigation',
      defaultStyle: { width: 'auto', minHeight: '20px', display: 'inline-block' },
      defaultContent: { html: '<style>.breadcrumb{display:flex;flex-direction:row;align-items:center;gap:0.5rem;font-size:0.875rem}.breadcrumb a{color:rgba(225,225,225,0.45);text-decoration:none;transition:color 0.3s ease}.breadcrumb a:hover{color:#f6efe5}.breadcrumb .sep{color:rgba(225,225,225,0.25);font-size:0.75rem}.breadcrumb .current{color:#f6efe5;font-weight:500}</style><nav class="breadcrumb"><a href="#">Home</a><span class="sep">\u203A</span><a href="#">Services</a><span class="sep">\u203A</span><span class="current">Web Design</span></nav>' },
    },
  },
  {
    id: 'comp-block-back-to-top',
    label: 'Back to Top Button',
    category: 'components', subcategory: 'blocks',
    tags: ['back-to-top', 'scroll', 'button', 'footer', 'navigation'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Back to Top Button',
      defaultStyle: { width: '44px', height: '44px', display: 'inline-block' },
      defaultContent: { html: '<style>.btt-btn{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(16px);cursor:pointer;transition:all 0.3s ease;color:#f6efe5}.btt-btn:hover{transform:translateY(-2px);background:rgba(255,255,255,0.15)}.btt-btn svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}</style><button class="btt-btn" aria-label="Back to top"><svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg></button>' },
    },
  },
  {
    id: 'comp-block-map-placeholder',
    label: 'Map Embed Placeholder',
    category: 'components', subcategory: 'blocks',
    tags: ['map', 'embed', 'placeholder', 'contact', 'location'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Map Placeholder',
      defaultStyle: { width: '100%', minHeight: '240px' },
      defaultContent: { html: '<style>.map-placeholder{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.75rem;width:100%;height:240px;background:linear-gradient(135deg,#1a1a1a,#222);border:1px solid rgba(255,255,255,0.08);border-radius:0.75rem;position:relative;overflow:hidden}.map-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:40px 40px}.map-pin{position:relative;z-index:1}.map-pin svg{width:28px;height:28px;stroke:#c8a97e;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}.map-label{position:relative;z-index:1;font-size:0.8125rem;color:rgba(255,255,255,0.3);font-weight:500}</style><div class="map-placeholder"><div class="map-grid"></div><div class="map-pin"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><span class="map-label">Map Location</span></div>' },
    },
  },
]

// ─── ECOMMERCE (12 presets × premium dark style) ───

const ECOMMERCE: LibraryElementItem[] = [
  {
    id: 'comp-ecom-product-card',
    label: 'Product Card',
    category: 'components', subcategory: 'ecommerce',
    tags: ['product', 'card', 'ecommerce', 'shop', 'add-to-cart', 'price'],
    universe: 'ecommerce',
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Product Card',
      defaultStyle: {
        display: 'flex', flexDirection: 'column', width: '300px',
        backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '1rem',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.08)',
        overflow: 'hidden', transition: 'all 0.3s ease',
      },
      defaultContent: {},
      children: [
        {
          type: 'custom-container', label: 'Image Wrapper',
          defaultStyle: { width: '100%', height: '280px', backgroundColor: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
          defaultContent: {},
          children: [
            { type: 'custom-text', label: 'Placeholder', defaultStyle: { fontSize: '0.8125rem', color: 'rgba(225,225,225,0.3)', fontWeight: 500 }, defaultContent: { text: 'Product Image' } },
          ],
        },
        {
          type: 'custom-container', label: 'Product Info',
          defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem' },
          defaultContent: {},
          children: [
            { type: 'custom-text', label: 'Product Name', defaultStyle: { fontSize: '1rem', fontWeight: 600, color: '#f6efe5', lineHeight: '1.4' }, defaultContent: { text: 'Premium Leather Bag' } },
            { type: 'custom-text', label: 'Price', defaultStyle: { fontSize: '1.125rem', fontWeight: 700, color: '#c8a97e' }, defaultContent: { text: '\u20AC249.00' } },
            { type: 'custom-button', label: 'Add to Cart', defaultStyle: { display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: '#4a2711', color: '#f6efe5', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s ease', width: '100%' }, defaultContent: { label: 'Add to Cart', href: '#' } },
          ],
        },
      ],
    },
  },
  {
    id: 'comp-ecom-price-display',
    label: 'Price Display with Discount',
    category: 'components', subcategory: 'ecommerce',
    tags: ['price', 'discount', 'strikethrough', 'ecommerce', 'sale', 'badge'],
    universe: 'ecommerce',
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Price Display',
      defaultStyle: { width: 'auto', minHeight: '32px', display: 'inline-block' },
      defaultContent: { html: '<style>.ecom-price{display:flex;align-items:center;gap:0.75rem;font-family:inherit}.ecom-price__current{font-size:1.5rem;font-weight:700;color:#c8a97e}.ecom-price__original{font-size:1rem;color:rgba(225,225,225,0.4);text-decoration:line-through}.ecom-price__badge{display:inline-flex;align-items:center;padding:0.25rem 0.625rem;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);border-radius:999px;font-size:0.75rem;font-weight:600;color:#ef4444}</style><div class="ecom-price"><span class="ecom-price__original">\u20AC349.00</span><span class="ecom-price__current">\u20AC249.00</span><span class="ecom-price__badge">\u221229%</span></div>' },
    },
  },
  {
    id: 'comp-ecom-variant-pills',
    label: 'Size Variant Selector',
    category: 'components', subcategory: 'ecommerce',
    tags: ['variant', 'size', 'selector', 'pills', 'ecommerce', 'product'],
    universe: 'ecommerce',
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Variant Pills',
      defaultStyle: { width: 'auto', minHeight: '40px', display: 'inline-block' },
      defaultContent: { html: '<style>.ecom-variants{display:flex;align-items:center;gap:0.5rem;font-family:inherit}.ecom-variants__pill{display:flex;align-items:center;justify-content:center;min-width:44px;height:40px;padding:0 0.875rem;border-radius:0.5rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:rgba(225,225,225,0.6);font-size:0.875rem;font-weight:500;cursor:pointer;transition:all 0.3s ease}.ecom-variants__pill:hover{border-color:rgba(200,169,126,0.4);color:#f6efe5}.ecom-variants__pill--active{border-color:#c8a97e;color:#c8a97e;background:rgba(200,169,126,0.08)}</style><div class="ecom-variants"><button class="ecom-variants__pill">S</button><button class="ecom-variants__pill ecom-variants__pill--active">M</button><button class="ecom-variants__pill">L</button><button class="ecom-variants__pill">XL</button></div>' },
    },
  },
  {
    id: 'comp-ecom-quantity-selector',
    label: 'Quantity Selector',
    category: 'components', subcategory: 'ecommerce',
    tags: ['quantity', 'selector', 'input', 'ecommerce', 'cart', 'glassmorphic'],
    universe: 'ecommerce',
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Quantity Selector',
      defaultStyle: { width: 'auto', minHeight: '44px', display: 'inline-block' },
      defaultContent: { html: '<style>.ecom-qty{display:inline-flex;align-items:center;border-radius:0.625rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(16px);overflow:hidden;font-family:inherit}.ecom-qty__btn{display:flex;align-items:center;justify-content:center;width:44px;height:44px;background:none;border:none;color:rgba(225,225,225,0.6);font-size:1.25rem;cursor:pointer;transition:all 0.3s ease}.ecom-qty__btn:hover{color:#f6efe5;background:rgba(255,255,255,0.06)}.ecom-qty__val{width:48px;height:44px;display:flex;align-items:center;justify-content:center;font-size:0.9375rem;font-weight:600;color:#f6efe5;border-left:1px solid rgba(255,255,255,0.08);border-right:1px solid rgba(255,255,255,0.08)}</style><div class="ecom-qty"><button class="ecom-qty__btn">\u2212</button><span class="ecom-qty__val">1</span><button class="ecom-qty__btn">+</button></div>' },
    },
  },
  {
    id: 'comp-ecom-add-to-cart',
    label: 'Add to Cart Button',
    category: 'components', subcategory: 'ecommerce',
    tags: ['add-to-cart', 'button', 'shopping', 'bag', 'ecommerce', 'cta'],
    universe: 'ecommerce',
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Add to Cart Button',
      defaultStyle: { width: 'auto', minHeight: '48px', display: 'inline-block' },
      defaultContent: { html: '<style>.ecom-atc{display:inline-flex;align-items:center;justify-content:center;gap:0.625rem;padding:0.875rem 2rem;background:#4a2711;border:none;border-radius:0.5rem;color:#f6efe5;font-size:0.9375rem;font-weight:600;cursor:pointer;transition:all 0.3s ease;font-family:inherit}.ecom-atc:hover{background:#5c3218;transform:translateY(-1px);box-shadow:0 8px 24px rgba(74,39,17,0.4)}.ecom-atc svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}</style><button class="ecom-atc"><svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>Add to Cart</button>' },
    },
  },
  {
    id: 'comp-ecom-cart-item',
    label: 'Cart Item Row',
    category: 'components', subcategory: 'ecommerce',
    tags: ['cart', 'item', 'row', 'ecommerce', 'thumbnail', 'quantity', 'remove'],
    universe: 'ecommerce',
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Cart Item Row',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: { html: '<style>.ecom-cart-item{display:flex;align-items:center;gap:1rem;padding:1rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:0.75rem;font-family:inherit}.ecom-cart-item__img{width:64px;height:64px;min-width:64px;border-radius:0.5rem;background:#1a1a1a;display:flex;align-items:center;justify-content:center;font-size:0.625rem;color:rgba(225,225,225,0.3)}.ecom-cart-item__info{flex:1;display:flex;flex-direction:column;gap:0.25rem}.ecom-cart-item__name{font-size:0.9375rem;font-weight:600;color:#f6efe5}.ecom-cart-item__variant{font-size:0.8125rem;color:rgba(225,225,225,0.5)}.ecom-cart-item__qty{display:flex;align-items:center;gap:0.375rem;border-radius:0.375rem;background:rgba(255,255,255,0.06);overflow:hidden}.ecom-cart-item__qty-btn{width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:none;border:none;color:rgba(225,225,225,0.5);font-size:0.875rem;cursor:pointer}.ecom-cart-item__qty-val{font-size:0.8125rem;font-weight:600;color:#f6efe5;width:24px;text-align:center}.ecom-cart-item__price{font-size:0.9375rem;font-weight:700;color:#c8a97e;min-width:70px;text-align:right}.ecom-cart-item__remove{width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:none;border:none;color:rgba(225,225,225,0.3);cursor:pointer;transition:color 0.3s ease;font-size:1rem}.ecom-cart-item__remove:hover{color:#ef4444}</style><div class="ecom-cart-item"><div class="ecom-cart-item__img">IMG</div><div class="ecom-cart-item__info"><span class="ecom-cart-item__name">Premium Leather Bag</span><span class="ecom-cart-item__variant">Size: M \u00B7 Black</span></div><div class="ecom-cart-item__qty"><button class="ecom-cart-item__qty-btn">\u2212</button><span class="ecom-cart-item__qty-val">1</span><button class="ecom-cart-item__qty-btn">+</button></div><span class="ecom-cart-item__price">\u20AC249.00</span><button class="ecom-cart-item__remove">\u00D7</button></div>' },
    },
  },
  {
    id: 'comp-ecom-order-summary',
    label: 'Order Summary Panel',
    category: 'components', subcategory: 'ecommerce',
    tags: ['order', 'summary', 'subtotal', 'total', 'shipping', 'tax', 'ecommerce', 'checkout'],
    universe: 'ecommerce',
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Order Summary',
      defaultStyle: { width: '100%', maxWidth: '380px', minHeight: '200px' },
      defaultContent: { html: '<style>.ecom-summary{display:flex;flex-direction:column;gap:0.875rem;padding:1.5rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:1rem;font-family:inherit}.ecom-summary__title{font-size:1.125rem;font-weight:700;color:#f6efe5;margin-bottom:0.25rem}.ecom-summary__row{display:flex;justify-content:space-between;align-items:center}.ecom-summary__label{font-size:0.875rem;color:rgba(225,225,225,0.6)}.ecom-summary__value{font-size:0.875rem;font-weight:500;color:#f6efe5}.ecom-summary__divider{height:1px;background:rgba(255,255,255,0.08);margin:0.25rem 0}.ecom-summary__total .ecom-summary__label{font-size:1rem;font-weight:600;color:#f6efe5}.ecom-summary__total .ecom-summary__value{font-size:1.25rem;font-weight:700;color:#c8a97e}</style><div class="ecom-summary"><span class="ecom-summary__title">Order Summary</span><div class="ecom-summary__row"><span class="ecom-summary__label">Subtotal</span><span class="ecom-summary__value">\u20AC498.00</span></div><div class="ecom-summary__row"><span class="ecom-summary__label">Shipping</span><span class="ecom-summary__value">Free</span></div><div class="ecom-summary__row"><span class="ecom-summary__label">Tax (20%)</span><span class="ecom-summary__value">\u20AC99.60</span></div><div class="ecom-summary__divider"></div><div class="ecom-summary__row ecom-summary__total"><span class="ecom-summary__label">Total</span><span class="ecom-summary__value">\u20AC597.60</span></div></div>' },
    },
  },
  {
    id: 'comp-ecom-checkout-steps',
    label: 'Checkout Step Indicator',
    category: 'components', subcategory: 'ecommerce',
    tags: ['checkout', 'steps', 'progress', 'indicator', 'ecommerce', 'wizard'],
    universe: 'ecommerce',
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Checkout Steps',
      defaultStyle: { width: '100%', minHeight: '48px' },
      defaultContent: { html: '<style>.ecom-steps{display:flex;align-items:center;justify-content:center;gap:0;width:100%;font-family:inherit}.ecom-steps__item{display:flex;align-items:center;gap:0.5rem}.ecom-steps__num{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.8125rem;font-weight:600;transition:all 0.3s ease}.ecom-steps__num--completed{background:#c8a97e;color:#140c08}.ecom-steps__num--active{background:rgba(200,169,126,0.15);border:2px solid #c8a97e;color:#c8a97e}.ecom-steps__num--upcoming{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(225,225,225,0.35)}.ecom-steps__label{font-size:0.8125rem;font-weight:500}.ecom-steps__label--completed{color:#c8a97e}.ecom-steps__label--active{color:#f6efe5}.ecom-steps__label--upcoming{color:rgba(225,225,225,0.35)}.ecom-steps__line{width:40px;height:1px;margin:0 0.5rem}.ecom-steps__line--done{background:#c8a97e}.ecom-steps__line--pending{background:rgba(255,255,255,0.1)}</style><div class="ecom-steps"><div class="ecom-steps__item"><span class="ecom-steps__num ecom-steps__num--completed">\u2713</span><span class="ecom-steps__label ecom-steps__label--completed">Cart</span></div><div class="ecom-steps__line ecom-steps__line--done"></div><div class="ecom-steps__item"><span class="ecom-steps__num ecom-steps__num--active">2</span><span class="ecom-steps__label ecom-steps__label--active">Shipping</span></div><div class="ecom-steps__line ecom-steps__line--pending"></div><div class="ecom-steps__item"><span class="ecom-steps__num ecom-steps__num--upcoming">3</span><span class="ecom-steps__label ecom-steps__label--upcoming">Payment</span></div><div class="ecom-steps__line ecom-steps__line--pending"></div><div class="ecom-steps__item"><span class="ecom-steps__num ecom-steps__num--upcoming">4</span><span class="ecom-steps__label ecom-steps__label--upcoming">Confirmation</span></div></div>' },
    },
  },
  {
    id: 'comp-ecom-payment-tabs',
    label: 'Payment Method Tabs',
    category: 'components', subcategory: 'ecommerce',
    tags: ['payment', 'tabs', 'card', 'paypal', 'ecommerce', 'checkout', 'method'],
    universe: 'ecommerce',
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Payment Tabs',
      defaultStyle: { width: '100%', minHeight: '44px' },
      defaultContent: { html: '<style>.ecom-pay-tabs{display:flex;gap:0;border-bottom:1px solid rgba(255,255,255,0.08);font-family:inherit}.ecom-pay-tabs__tab{display:flex;align-items:center;gap:0.5rem;padding:0.875rem 1.5rem;background:none;border:none;border-bottom:2px solid transparent;color:rgba(225,225,225,0.5);font-size:0.875rem;font-weight:500;cursor:pointer;transition:all 0.3s ease}.ecom-pay-tabs__tab:hover{color:#f6efe5}.ecom-pay-tabs__tab--active{color:#c8a97e;border-bottom-color:#c8a97e}.ecom-pay-tabs__tab svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}</style><div class="ecom-pay-tabs"><button class="ecom-pay-tabs__tab ecom-pay-tabs__tab--active"><svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Credit Card</button><button class="ecom-pay-tabs__tab"><svg viewBox="0 0 24 24"><path d="M7.144 19.532l1.049-5.751c.11-.606.691-1.002 1.304-.948 2.155.192 6.58.456 8.503-.588 2.478-1.346 3.14-4.406 2.676-5.996-.465-1.59-2.19-3.748-6.676-3.748H8.206c-.554 0-1.032.392-1.138.938L4.58 17.673c-.076.391.221.749.619.749h1.553"/><path d="M7.418 20.861l.667-3.655c.076-.417.44-.718.864-.718h2.028c3.727 0 6.508-2.674 7.139-6.313.195-1.127.138-2.368-.515-3.286"/></svg>PayPal</button></div>' },
    },
  },
  {
    id: 'comp-ecom-coupon-input',
    label: 'Coupon Code Input',
    category: 'components', subcategory: 'ecommerce',
    tags: ['coupon', 'promo', 'code', 'input', 'discount', 'ecommerce'],
    universe: 'ecommerce',
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Coupon Input',
      defaultStyle: { width: '100%', maxWidth: '400px', minHeight: '44px' },
      defaultContent: { html: '<style>.ecom-coupon{display:flex;gap:0;font-family:inherit}.ecom-coupon__input{flex:1;padding:0.75rem 1rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-right:none;border-radius:0.5rem 0 0 0.5rem;color:#f6efe5;font-size:0.875rem;outline:none;transition:border-color 0.3s ease}.ecom-coupon__input::placeholder{color:rgba(225,225,225,0.3)}.ecom-coupon__input:focus{border-color:rgba(200,169,126,0.4)}.ecom-coupon__btn{padding:0.75rem 1.25rem;background:#4a2711;border:1px solid #4a2711;border-radius:0 0.5rem 0.5rem 0;color:#f6efe5;font-size:0.875rem;font-weight:600;cursor:pointer;transition:all 0.3s ease;white-space:nowrap}.ecom-coupon__btn:hover{background:#5c3218}</style><div class="ecom-coupon"><input class="ecom-coupon__input" type="text" placeholder="Enter coupon code" /><button class="ecom-coupon__btn">Apply</button></div>' },
    },
  },
  {
    id: 'comp-ecom-trust-row',
    label: 'Trust Badges Row',
    category: 'components', subcategory: 'ecommerce',
    tags: ['trust', 'badges', 'shipping', 'returns', 'secure', 'payment', 'ecommerce', 'guarantee'],
    universe: 'ecommerce',
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Trust Badges',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: '<style>.ecom-trust{display:flex;align-items:center;justify-content:center;gap:2rem;padding:1rem;font-family:inherit}.ecom-trust__item{display:flex;align-items:center;gap:0.5rem}.ecom-trust__item svg{width:20px;height:20px;stroke:#c8a97e;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}.ecom-trust__label{font-size:0.8125rem;font-weight:500;color:rgba(225,225,225,0.6)}</style><div class="ecom-trust"><div class="ecom-trust__item"><svg viewBox="0 0 24 24"><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2.81A2 2 0 0 1 20 8v8a2 2 0 0 1-2 2h-2"/><polyline points="17 14 12 9 7 14"/><line x1="12" y1="9" x2="12" y2="21"/></svg><span class="ecom-trust__label">Free Shipping</span></div><div class="ecom-trust__item"><svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg><span class="ecom-trust__label">30-Day Returns</span></div><div class="ecom-trust__item"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span class="ecom-trust__label">Secure Payment</span></div></div>' },
    },
  },
  {
    id: 'comp-ecom-product-gallery',
    label: 'Product Image Gallery',
    category: 'components', subcategory: 'ecommerce',
    tags: ['gallery', 'product', 'images', 'thumbnails', 'ecommerce', 'zoom'],
    universe: 'ecommerce',
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Product Gallery',
      defaultStyle: { width: '100%', maxWidth: '480px', minHeight: '400px' },
      defaultContent: { html: '<style>.ecom-gallery{display:flex;flex-direction:column;gap:0.75rem;font-family:inherit}.ecom-gallery__main{width:100%;aspect-ratio:1/1;background:#1a1a1a;border-radius:0.75rem;border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;overflow:hidden}.ecom-gallery__main-label{font-size:0.9375rem;color:rgba(225,225,225,0.25);font-weight:500}.ecom-gallery__thumbs{display:flex;gap:0.5rem}.ecom-gallery__thumb{width:72px;height:72px;border-radius:0.5rem;background:#1a1a1a;border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.3s ease;font-size:0.625rem;color:rgba(225,225,225,0.2)}.ecom-gallery__thumb:hover{border-color:rgba(200,169,126,0.3)}.ecom-gallery__thumb--active{border-color:#c8a97e;box-shadow:0 0 0 1px #c8a97e}</style><div class="ecom-gallery"><div class="ecom-gallery__main"><span class="ecom-gallery__main-label">Main Image</span></div><div class="ecom-gallery__thumbs"><div class="ecom-gallery__thumb ecom-gallery__thumb--active">1</div><div class="ecom-gallery__thumb">2</div><div class="ecom-gallery__thumb">3</div><div class="ecom-gallery__thumb">4</div></div></div>' },
    },
  },
]

// ─── SECTION-SPECIFIC (components extracted from section templates) ───

const SECTION_SPECIFIC: LibraryElementItem[] = [
  {
    id: 'comp-blog-card',
    label: 'Blog Card',
    category: 'components', subcategory: 'sections',
    tags: ['blog', 'card', 'article', 'post', 'image', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Blog Card',
      defaultStyle: { width: '360px', minHeight: '380px' },
      defaultContent: { html: '<style>.ss-blog-card{display:flex;flex-direction:column;border-radius:0.75rem;overflow:hidden;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);transition:all 0.3s ease}.ss-blog-card:hover{transform:translateY(-4px);border-color:rgba(200,169,126,0.25)}.ss-blog-card-img{width:100%;height:200px;background:linear-gradient(135deg,#1a1210,#2a1f18);object-fit:cover}.ss-blog-card-body{padding:1.25rem;display:flex;flex-direction:column;gap:0.75rem}.ss-blog-card-badge{display:inline-block;width:fit-content;padding:0.25rem 0.625rem;font-size:0.6875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#c8a97e;background:rgba(200,169,126,0.12);border-radius:99px}.ss-blog-card-title{font-size:1.125rem;font-weight:600;color:#f6efe5;line-height:1.35;margin:0}.ss-blog-card-excerpt{font-size:0.875rem;color:rgba(225,225,225,0.6);line-height:1.6;margin:0}.ss-blog-card-footer{display:flex;justify-content:space-between;align-items:center;padding:0 1.25rem 1.25rem;font-size:0.75rem;color:rgba(225,225,225,0.4)}</style><div class="ss-blog-card"><div class="ss-blog-card-img"></div><div class="ss-blog-card-body"><span class="ss-blog-card-badge">Design</span><h3 class="ss-blog-card-title">Crafting Premium Digital Experiences</h3><p class="ss-blog-card-excerpt">Exploring the intersection of aesthetics and functionality in modern web design.</p></div><div class="ss-blog-card-footer"><span>5 min read</span><span>Mar 2026</span></div></div>' },
    },
  },
  {
    id: 'comp-team-card',
    label: 'Team Member Card',
    category: 'components', subcategory: 'sections',
    tags: ['team', 'card', 'member', 'profile', 'social', 'glass'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Team Member Card',
      defaultStyle: { width: '280px', minHeight: '320px' },
      defaultContent: { html: '<style>.ss-team-card{display:flex;flex-direction:column;align-items:center;gap:1rem;padding:2rem 1.5rem;border-radius:0.75rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(16px);text-align:center;transition:all 0.3s ease}.ss-team-card:hover{border-color:rgba(200,169,126,0.2)}.ss-team-avatar{width:96px;height:96px;border-radius:50%;background:linear-gradient(135deg,#2a1f18,#1a1210);border:2px solid rgba(200,169,126,0.25)}.ss-team-name{font-size:1.0625rem;font-weight:600;color:#f6efe5;margin:0}.ss-team-role{font-size:0.8125rem;color:rgba(225,225,225,0.6);margin:0;margin-top:-0.25rem}.ss-team-socials{display:flex;gap:0.75rem;margin-top:0.5rem}.ss-team-socials a{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);color:rgba(225,225,225,0.5);text-decoration:none;font-size:0.8125rem;transition:all 0.3s ease}.ss-team-socials a:hover{color:#c8a97e;border-color:rgba(200,169,126,0.3);background:rgba(200,169,126,0.08)}</style><div class="ss-team-card"><div class="ss-team-avatar"></div><h4 class="ss-team-name">Alex Morgan</h4><p class="ss-team-role">Creative Director</p><div class="ss-team-socials"><a href="#">Li</a><a href="#">Tw</a><a href="#">Dr</a></div></div>' },
    },
  },
  {
    id: 'comp-timeline-vertical',
    label: 'Vertical Timeline',
    category: 'components', subcategory: 'sections',
    tags: ['timeline', 'steps', 'process', 'vertical', 'numbered'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Vertical Timeline',
      defaultStyle: { width: '480px', minHeight: '400px' },
      defaultContent: { html: '<style>.ss-timeline{display:flex;flex-direction:column;gap:0;position:relative;padding-left:3rem}.ss-timeline::before{content:"";position:absolute;left:15px;top:15px;bottom:15px;width:1px;background:rgba(255,255,255,0.08)}.ss-timeline-step{display:flex;flex-direction:column;gap:0.5rem;padding:1.25rem 0;position:relative}.ss-timeline-num{position:absolute;left:-3rem;top:1.25rem;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.6875rem;font-weight:700;color:#c8a97e;background:rgba(200,169,126,0.1);border:1px solid rgba(200,169,126,0.25)}.ss-timeline-title{font-size:1rem;font-weight:600;color:#f6efe5;margin:0}.ss-timeline-desc{font-size:0.875rem;color:rgba(225,225,225,0.6);line-height:1.6;margin:0}</style><div class="ss-timeline"><div class="ss-timeline-step"><span class="ss-timeline-num">01</span><h4 class="ss-timeline-title">Discovery & Strategy</h4><p class="ss-timeline-desc">We dive deep into your brand, audience, and objectives to craft a tailored roadmap.</p></div><div class="ss-timeline-step"><span class="ss-timeline-num">02</span><h4 class="ss-timeline-title">Design & Prototyping</h4><p class="ss-timeline-desc">High-fidelity mockups and interactive prototypes refined through your feedback.</p></div><div class="ss-timeline-step"><span class="ss-timeline-num">03</span><h4 class="ss-timeline-title">Development & Launch</h4><p class="ss-timeline-desc">Pixel-perfect implementation, rigorous testing, and a seamless go-live experience.</p></div></div>' },
    },
  },
  {
    id: 'comp-logo-grayscale',
    label: 'Logo Grayscale Hover',
    category: 'components', subcategory: 'sections',
    tags: ['logo', 'brand', 'grayscale', 'hover', 'partner', 'client'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Logo Grayscale',
      defaultStyle: { width: '140px', minHeight: '80px' },
      defaultContent: { html: '<style>.ss-logo-gs{display:flex;align-items:center;justify-content:center;width:140px;height:80px;padding:1rem;border-radius:0.5rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);filter:grayscale(1);opacity:0.6;transition:all 0.3s ease;cursor:pointer}.ss-logo-gs:hover{filter:grayscale(0);opacity:1;border-color:rgba(255,255,255,0.12)}.ss-logo-gs svg{width:48px;height:48px}</style><div class="ss-logo-gs"><svg viewBox="0 0 48 48" fill="none"><rect x="4" y="4" width="40" height="40" rx="8" stroke="#c8a97e" stroke-width="1.5"/><path d="M16 32V16l8 10 8-10v16" stroke="#c8a97e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' },
    },
  },
  {
    id: 'comp-tab-nav-underline',
    label: 'Tab Nav — Underline',
    category: 'components', subcategory: 'sections',
    tags: ['tab', 'navigation', 'underline', 'active', 'indicator'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Tab Nav Underline',
      defaultStyle: { width: '100%', minHeight: '44px' },
      defaultContent: { html: '<style>.ss-tabs-ul{display:flex;gap:0;border-bottom:1px solid rgba(255,255,255,0.08)}.ss-tabs-ul button{padding:0.75rem 1.5rem;font-size:0.875rem;font-weight:500;color:rgba(225,225,225,0.5);background:none;border:none;cursor:pointer;position:relative;transition:color 0.3s ease}.ss-tabs-ul button:hover{color:#f6efe5}.ss-tabs-ul button.active{color:#c8a97e}.ss-tabs-ul button.active::after{content:"";position:absolute;bottom:-1px;left:0;right:0;height:2px;background:#c8a97e;border-radius:1px}</style><nav class="ss-tabs-ul"><button class="active">Tab 1</button><button>Tab 2</button><button>Tab 3</button></nav>' },
    },
  },
  {
    id: 'comp-tab-nav-pills',
    label: 'Tab Nav — Pills',
    category: 'components', subcategory: 'sections',
    tags: ['tab', 'navigation', 'pills', 'filled', 'active'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Tab Nav Pills',
      defaultStyle: { width: '100%', minHeight: '44px' },
      defaultContent: { html: '<style>.ss-tabs-pills{display:flex;gap:0.5rem;padding:0.25rem;background:rgba(255,255,255,0.04);border-radius:0.5rem;border:1px solid rgba(255,255,255,0.06);width:fit-content}.ss-tabs-pills button{padding:0.5rem 1.25rem;font-size:0.8125rem;font-weight:500;color:rgba(225,225,225,0.5);background:none;border:none;border-radius:0.375rem;cursor:pointer;transition:all 0.3s ease}.ss-tabs-pills button:hover{color:#f6efe5}.ss-tabs-pills button.active{color:#f6efe5;background:rgba(255,255,255,0.1)}</style><nav class="ss-tabs-pills"><button class="active">Tab 1</button><button>Tab 2</button><button>Tab 3</button></nav>' },
    },
  },
  {
    id: 'comp-accordion-item',
    label: 'Accordion Item',
    category: 'components', subcategory: 'sections',
    tags: ['accordion', 'faq', 'collapsible', 'toggle', 'chevron'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Accordion Item',
      defaultStyle: { width: '100%', minHeight: '56px' },
      defaultContent: { html: '<style>.ss-accordion{border:1px solid rgba(255,255,255,0.08);border-radius:0.5rem;overflow:hidden;background:rgba(255,255,255,0.04)}.ss-accordion-header{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.25rem;cursor:pointer;background:none;border:none;width:100%;color:#f6efe5;font-size:0.9375rem;font-weight:500;transition:background 0.3s ease}.ss-accordion-header:hover{background:rgba(255,255,255,0.04)}.ss-accordion-chevron{width:18px;height:18px;stroke:rgba(225,225,225,0.4);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;transition:transform 0.3s ease}.ss-accordion.open .ss-accordion-chevron{transform:rotate(180deg)}.ss-accordion-body{max-height:0;overflow:hidden;transition:max-height 0.3s ease}.ss-accordion.open .ss-accordion-body{max-height:200px}.ss-accordion-content{padding:0 1.25rem 1rem;font-size:0.875rem;color:rgba(225,225,225,0.6);line-height:1.7}</style><div class="ss-accordion open"><button class="ss-accordion-header">How does the process work?<svg class="ss-accordion-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></button><div class="ss-accordion-body"><div class="ss-accordion-content">We follow a structured approach starting with discovery, moving through design and development, and finishing with testing and launch support.</div></div></div>' },
    },
  },
  {
    id: 'comp-video-embed',
    label: 'Video Embed Placeholder',
    category: 'components', subcategory: 'sections',
    tags: ['video', 'embed', 'play', 'media', 'thumbnail', 'lazy'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Video Embed',
      defaultStyle: { width: '100%', minHeight: '320px' },
      defaultContent: { html: '<style>.ss-video-embed{position:relative;width:100%;height:320px;border-radius:0.75rem;overflow:hidden;background:linear-gradient(135deg,#0d0d0d,#1a1210);border:1px solid rgba(255,255,255,0.08);cursor:pointer}.ss-video-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.3);transition:background 0.3s ease}.ss-video-embed:hover .ss-video-overlay{background:rgba(0,0,0,0.15)}.ss-video-play{width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.12);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;transition:all 0.3s ease}.ss-video-embed:hover .ss-video-play{transform:scale(1.08);background:rgba(200,169,126,0.2);border-color:rgba(200,169,126,0.3)}.ss-video-play svg{width:24px;height:24px;fill:#f6efe5;margin-left:3px}</style><div class="ss-video-embed"><div class="ss-video-overlay"><div class="ss-video-play"><svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg></div></div></div>' },
    },
  },
  {
    id: 'comp-lightbox-trigger',
    label: 'Lightbox Image Trigger',
    category: 'components', subcategory: 'sections',
    tags: ['lightbox', 'image', 'zoom', 'gallery', 'modal', 'hover'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Lightbox Trigger',
      defaultStyle: { width: '280px', minHeight: '200px' },
      defaultContent: { html: '<style>.ss-lightbox-trigger{position:relative;width:100%;height:200px;border-radius:0.75rem;overflow:hidden;cursor:pointer;background:linear-gradient(135deg,#1a1210,#2a1f18);border:1px solid rgba(255,255,255,0.06)}.ss-lightbox-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0);transition:all 0.3s ease}.ss-lightbox-trigger:hover .ss-lightbox-overlay{background:rgba(0,0,0,0.4)}.ss-lightbox-icon{opacity:0;transform:scale(0.8);transition:all 0.3s ease}.ss-lightbox-trigger:hover .ss-lightbox-icon{opacity:1;transform:scale(1)}.ss-lightbox-icon svg{width:28px;height:28px;stroke:#f6efe5;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}</style><div class="ss-lightbox-trigger"><div class="ss-lightbox-overlay"><div class="ss-lightbox-icon"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div></div></div>' },
    },
  },
  {
    id: 'comp-search-bar',
    label: 'Search Bar',
    category: 'components', subcategory: 'sections',
    tags: ['search', 'input', 'bar', 'glass', 'dropdown', 'results'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Search Bar',
      defaultStyle: { width: '400px', minHeight: '48px' },
      defaultContent: { html: '<style>.ss-search-wrap{position:relative;width:100%}.ss-search-bar{display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:0.5rem;backdrop-filter:blur(16px);transition:border-color 0.3s ease}.ss-search-bar:focus-within{border-color:rgba(200,169,126,0.35)}.ss-search-bar svg{width:18px;height:18px;stroke:rgba(225,225,225,0.4);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0}.ss-search-bar input{flex:1;background:none;border:none;outline:none;font-size:0.875rem;color:#f6efe5}.ss-search-bar input::placeholder{color:rgba(225,225,225,0.3)}.ss-search-results{position:absolute;top:calc(100% + 0.5rem);left:0;right:0;background:rgba(20,18,16,0.95);border:1px solid rgba(255,255,255,0.08);border-radius:0.5rem;backdrop-filter:blur(16px);padding:0.5rem;display:none}.ss-search-wrap:focus-within .ss-search-results{display:block}.ss-search-item{padding:0.625rem 0.75rem;border-radius:0.375rem;font-size:0.8125rem;color:rgba(225,225,225,0.6);cursor:pointer;transition:all 0.2s ease}.ss-search-item:hover{background:rgba(255,255,255,0.06);color:#f6efe5}</style><div class="ss-search-wrap"><div class="ss-search-bar"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input type="text" placeholder="Search..."></div><div class="ss-search-results"><div class="ss-search-item">Result item 1</div><div class="ss-search-item">Result item 2</div><div class="ss-search-item">Result item 3</div></div></div>' },
    },
  },
]

// ─── INTERACTIVE UI (interactive patterns from templates) ───

const INTERACTIVE_UI: LibraryElementItem[] = [
  {
    id: 'comp-ui-cookie-banner',
    label: 'Cookie Consent Banner',
    category: 'components', subcategory: 'interactive',
    tags: ['cookie', 'consent', 'banner', 'gdpr', 'privacy', 'glass'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Cookie Banner',
      defaultStyle: { width: '100%', minHeight: '72px' },
      defaultContent: { html: '<style>.ss-cookie-banner{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;padding:1rem 1.5rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:0.75rem;backdrop-filter:blur(16px)}.ss-cookie-text{font-size:0.8125rem;color:rgba(225,225,225,0.6);line-height:1.5;flex:1}.ss-cookie-actions{display:flex;gap:0.625rem;flex-shrink:0}.ss-cookie-btn{padding:0.5rem 1.25rem;font-size:0.8125rem;font-weight:500;border-radius:0.375rem;cursor:pointer;border:none;transition:all 0.3s ease}.ss-cookie-accept{background:#4a2711;color:#f6efe5}.ss-cookie-accept:hover{background:#5a3318}.ss-cookie-decline{background:rgba(255,255,255,0.06);color:rgba(225,225,225,0.6);border:1px solid rgba(255,255,255,0.08)}.ss-cookie-decline:hover{color:#f6efe5;border-color:rgba(255,255,255,0.15)}</style><div class="ss-cookie-banner"><p class="ss-cookie-text">We use cookies to enhance your browsing experience. By continuing, you agree to our use of cookies.</p><div class="ss-cookie-actions"><button class="ss-cookie-btn ss-cookie-decline">Decline</button><button class="ss-cookie-btn ss-cookie-accept">Accept</button></div></div>' },
    },
  },
  {
    id: 'comp-ui-notification-toast',
    label: 'Notification Toast',
    category: 'components', subcategory: 'interactive',
    tags: ['toast', 'notification', 'alert', 'message', 'slide'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Toast Notification',
      defaultStyle: { width: '360px', minHeight: '56px' },
      defaultContent: { html: '<style>.ss-toast{display:flex;align-items:center;gap:0.75rem;padding:0.875rem 1rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:0.5rem;backdrop-filter:blur(16px);animation:ss-toast-in 0.4s ease forwards}@keyframes ss-toast-in{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}.ss-toast-icon{width:32px;height:32px;border-radius:0.375rem;background:rgba(200,169,126,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0}.ss-toast-icon svg{width:16px;height:16px;stroke:#c8a97e;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.ss-toast-msg{flex:1;font-size:0.8125rem;color:#f6efe5;line-height:1.4}.ss-toast-close{background:none;border:none;cursor:pointer;padding:0.25rem;color:rgba(225,225,225,0.3);transition:color 0.3s ease;flex-shrink:0}.ss-toast-close:hover{color:#f6efe5}.ss-toast-close svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}</style><div class="ss-toast"><div class="ss-toast-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><span class="ss-toast-msg">Changes saved successfully.</span><button class="ss-toast-close"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>' },
    },
  },
  {
    id: 'comp-ui-progress-bar',
    label: 'Animated Progress Bar',
    category: 'components', subcategory: 'interactive',
    tags: ['progress', 'bar', 'percentage', 'loading', 'animated', 'fill'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Progress Bar',
      defaultStyle: { width: '100%', minHeight: '36px' },
      defaultContent: { html: '<style>.ss-progress-wrap{display:flex;flex-direction:column;gap:0.375rem}.ss-progress-header{display:flex;justify-content:space-between;align-items:center}.ss-progress-label{font-size:0.8125rem;font-weight:500;color:#f6efe5}.ss-progress-pct{font-size:0.75rem;color:rgba(225,225,225,0.5);font-variant-numeric:tabular-nums}.ss-progress-track{height:6px;background:rgba(255,255,255,0.06);border-radius:99px;overflow:hidden}.ss-progress-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,#4a2711,#c8a97e);width:0;animation:ss-progress-grow 1.2s ease forwards}@keyframes ss-progress-grow{to{width:72%}}</style><div class="ss-progress-wrap"><div class="ss-progress-header"><span class="ss-progress-label">Project Progress</span><span class="ss-progress-pct">72%</span></div><div class="ss-progress-track"><div class="ss-progress-fill"></div></div></div>' },
    },
  },
  {
    id: 'comp-ui-tooltip',
    label: 'Tooltip on Hover',
    category: 'components', subcategory: 'interactive',
    tags: ['tooltip', 'hover', 'info', 'hint', 'popup'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Tooltip',
      defaultStyle: { width: 'auto', minHeight: '40px', display: 'inline-block' },
      defaultContent: { html: '<style>.ss-tooltip-wrap{position:relative;display:inline-block;cursor:pointer}.ss-tooltip-trigger{padding:0.5rem 1rem;font-size:0.875rem;font-weight:500;color:#f6efe5;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:0.375rem;transition:all 0.3s ease}.ss-tooltip-trigger:hover{border-color:rgba(200,169,126,0.25)}.ss-tooltip-box{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(4px);padding:0.5rem 0.75rem;background:rgba(20,18,16,0.95);border:1px solid rgba(255,255,255,0.1);border-radius:0.375rem;backdrop-filter:blur(16px);font-size:0.75rem;color:rgba(225,225,225,0.7);white-space:nowrap;opacity:0;pointer-events:none;transition:all 0.3s ease}.ss-tooltip-box::after{content:"";position:absolute;top:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:rgba(255,255,255,0.1)}.ss-tooltip-wrap:hover .ss-tooltip-box{opacity:1;transform:translateX(-50%) translateY(0)}</style><div class="ss-tooltip-wrap"><span class="ss-tooltip-trigger">Hover me</span><div class="ss-tooltip-box">Additional information here</div></div>' },
    },
  },
  {
    id: 'comp-ui-loading-skeleton',
    label: 'Loading Skeleton',
    category: 'components', subcategory: 'interactive',
    tags: ['skeleton', 'loading', 'shimmer', 'placeholder', 'animation'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Loading Skeleton',
      defaultStyle: { width: '320px', minHeight: '80px' },
      defaultContent: { html: '<style>.ss-skeleton{display:flex;flex-direction:column;gap:0.75rem;padding:1.25rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:0.75rem}.ss-skeleton-line{height:12px;border-radius:6px;background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 75%);background-size:200% 100%;animation:ss-shimmer 1.5s ease-in-out infinite}@keyframes ss-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}.ss-skeleton-line:nth-child(1){width:85%}.ss-skeleton-line:nth-child(2){width:65%}.ss-skeleton-line:nth-child(3){width:45%}</style><div class="ss-skeleton"><div class="ss-skeleton-line"></div><div class="ss-skeleton-line"></div><div class="ss-skeleton-line"></div></div>' },
    },
  },
]

// ─── INTERACTIVE PREMIUM (13 ultra-premium interactive widgets) ───

const INTERACTIVE_PREMIUM: LibraryElementItem[] = [
  {
    id: 'comp-before-after-slider',
    label: 'Before / After Slider',
    category: 'components', subcategory: 'interactive',
    tags: ['before', 'after', 'comparison', 'slider', 'drag', 'image', 'interactive'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Before After Slider',
      defaultStyle: { width: '100%', maxWidth: '560px', minHeight: '320px' },
      defaultContent: { html: '<style>.ipba-wrap{position:relative;width:100%;height:320px;overflow:hidden;border-radius:0.75rem;border:1px solid rgba(255,255,255,0.08);cursor:ew-resize;user-select:none}.ipba-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.ipba-before{clip-path:inset(0 50% 0 0)}.ipba-after{clip-path:none}.ipba-handle{position:absolute;top:0;bottom:0;left:50%;width:3px;background:#c8a97e;z-index:2;transform:translateX(-50%)}.ipba-knob{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;border-radius:50%;background:rgba(10,10,10,0.85);border:2px solid #c8a97e;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px)}.ipba-knob svg{width:20px;height:20px;fill:none;stroke:#c8a97e;stroke-width:2}</style><div class="ipba-wrap" id="ipbaWrap"><img class="ipba-img ipba-after" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'320\'%3E%3Crect fill=\'%23141210\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%23c8a97e\' font-size=\'18\'%3EAfter%3C/text%3E%3C/svg%3E" alt="After"/><img class="ipba-img ipba-before" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'320\'%3E%3Crect fill=\'%230a0a0a\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%23666\' font-size=\'18\'%3EBefore%3C/text%3E%3C/svg%3E" alt="Before"/><div class="ipba-handle"><div class="ipba-knob"><svg viewBox="0 0 24 24"><path d="M8 5l-5 7 5 7M16 5l5 7-5 7"/></svg></div></div></div><script>(function(){var w=document.getElementById("ipbaWrap");if(!w)return;var h=w.querySelector(".ipba-handle"),b=w.querySelector(".ipba-before"),drag=false;function move(x){var r=w.getBoundingClientRect(),p=Math.max(0,Math.min(1,(x-r.left)/r.width));h.style.left=p*100+"%";b.style.clipPath="inset(0 "+(100-p*100)+"% 0 0)"}w.addEventListener("pointerdown",function(e){drag=true;w.setPointerCapture(e.pointerId);move(e.clientX)});w.addEventListener("pointermove",function(e){if(drag)move(e.clientX)});w.addEventListener("pointerup",function(){drag=false})})()</script>' },
    },
  },
  {
    id: 'comp-pricing-toggle',
    label: 'Pricing Toggle (Monthly/Yearly)',
    category: 'components', subcategory: 'interactive',
    tags: ['pricing', 'toggle', 'monthly', 'yearly', 'cards', 'switch', 'animated'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Pricing Toggle',
      defaultStyle: { width: '100%', maxWidth: '720px', minHeight: '380px' },
      defaultContent: { html: '<style>.ippt-wrap{display:flex;flex-direction:column;align-items:center;gap:2rem;font-family:inherit}.ippt-toggle{display:flex;align-items:center;gap:0.75rem}.ippt-lbl{font-size:0.875rem;color:rgba(225,225,225,0.6);transition:color 0.3s}.ippt-lbl.active{color:#f6efe5}.ippt-sw{position:relative;width:48px;height:26px;background:rgba(255,255,255,0.08);border-radius:99px;cursor:pointer;transition:background 0.3s}.ippt-sw.on{background:rgba(200,169,126,0.25)}.ippt-dot{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#c8a97e;transition:transform 0.3s ease}.ippt-sw.on .ippt-dot{transform:translateX(22px)}.ippt-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;width:100%}.ippt-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:0.75rem;padding:1.5rem;text-align:center;transition:border-color 0.3s}.ippt-card.pop{border-color:rgba(200,169,126,0.4);position:relative}.ippt-badge{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#c8a97e;color:#0a0a0a;font-size:0.6875rem;font-weight:600;padding:0.2rem 0.75rem;border-radius:99px}.ippt-name{font-size:0.8125rem;color:rgba(225,225,225,0.5);margin-bottom:0.5rem}.ippt-price{font-size:1.75rem;font-weight:700;color:#f6efe5;transition:all 0.3s}.ippt-per{font-size:0.75rem;color:rgba(225,225,225,0.4)}.ippt-feats{list-style:none;padding:0;margin:1rem 0 0;display:flex;flex-direction:column;gap:0.375rem}.ippt-feats li{font-size:0.8125rem;color:rgba(225,225,225,0.6)}.ippt-feats li::before{content:"✓ ";color:#c8a97e}</style><div class="ippt-wrap"><div class="ippt-toggle"><span class="ippt-lbl active" data-m>Monthly</span><div class="ippt-sw" id="ipptSw"><div class="ippt-dot"></div></div><span class="ippt-lbl" data-y>Yearly</span></div><div class="ippt-cards"><div class="ippt-card"><div class="ippt-name">Starter</div><div class="ippt-price" data-m="19" data-y="15">$19</div><div class="ippt-per">/month</div><ul class="ippt-feats"><li>5 Projects</li><li>Basic Support</li></ul></div><div class="ippt-card pop"><div class="ippt-badge">Popular</div><div class="ippt-name">Pro</div><div class="ippt-price" data-m="49" data-y="39">$49</div><div class="ippt-per">/month</div><ul class="ippt-feats"><li>Unlimited Projects</li><li>Priority Support</li><li>Analytics</li></ul></div><div class="ippt-card"><div class="ippt-name">Enterprise</div><div class="ippt-price" data-m="99" data-y="79">$99</div><div class="ippt-per">/month</div><ul class="ippt-feats"><li>Everything in Pro</li><li>Dedicated Manager</li><li>Custom Integrations</li></ul></div></div></div><script>(function(){var sw=document.getElementById("ipptSw");if(!sw)return;var yearly=false;sw.addEventListener("click",function(){yearly=!yearly;sw.classList.toggle("on",yearly);document.querySelectorAll("[data-m].ippt-lbl").forEach(function(l){l.classList.toggle("active",!yearly)});document.querySelectorAll("[data-y].ippt-lbl").forEach(function(l){l.classList.toggle("active",yearly)});document.querySelectorAll(".ippt-price").forEach(function(p){p.textContent="$"+(yearly?p.dataset.y:p.dataset.m)})})})()</script>' },
    },
  },
  {
    id: 'comp-image-hotspot',
    label: 'Image Hotspot Tooltips',
    category: 'components', subcategory: 'interactive',
    tags: ['hotspot', 'image', 'tooltip', 'interactive', 'click', 'pin', 'annotation'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Image Hotspot',
      defaultStyle: { width: '100%', maxWidth: '520px', minHeight: '320px' },
      defaultContent: { html: '<style>.iphs-wrap{position:relative;width:100%;height:320px;border-radius:0.75rem;overflow:hidden;background:#0a0a0a;border:1px solid rgba(255,255,255,0.08)}.iphs-bg{width:100%;height:100%;object-fit:cover;opacity:0.7}.iphs-dot{position:absolute;width:28px;height:28px;border-radius:50%;background:rgba(200,169,126,0.2);border:2px solid #c8a97e;cursor:pointer;transform:translate(-50%,-50%);z-index:2;transition:all 0.3s}.iphs-dot::before{content:"";position:absolute;inset:-4px;border-radius:50%;border:1px solid rgba(200,169,126,0.3);animation:iphs-pulse 2s ease-in-out infinite}@keyframes iphs-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:0}}.iphs-tip{position:absolute;bottom:calc(100% + 12px);left:50%;transform:translateX(-50%) scale(0.95);background:rgba(10,10,10,0.95);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.1);border-radius:0.5rem;padding:0.625rem 0.875rem;min-width:140px;opacity:0;pointer-events:none;transition:all 0.25s ease;z-index:3}.iphs-tip.show{opacity:1;transform:translateX(-50%) scale(1)}.iphs-tip-title{font-size:0.8125rem;font-weight:600;color:#f6efe5;margin-bottom:0.125rem}.iphs-tip-desc{font-size:0.75rem;color:rgba(225,225,225,0.5)}</style><div class="iphs-wrap"><img class="iphs-bg" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'520\' height=\'320\'%3E%3Crect width=\'520\' height=\'320\' fill=\'%23141210\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%23333\' font-size=\'16\'%3EProduct Image%3C/text%3E%3C/svg%3E" alt="Product"/><div class="iphs-dot" style="top:30%;left:25%"><div class="iphs-tip"><div class="iphs-tip-title">Premium Leather</div><div class="iphs-tip-desc">Italian full-grain leather</div></div></div><div class="iphs-dot" style="top:55%;left:60%"><div class="iphs-tip"><div class="iphs-tip-title">Gold Hardware</div><div class="iphs-tip-desc">18K gold-plated finish</div></div></div><div class="iphs-dot" style="top:75%;left:40%"><div class="iphs-tip"><div class="iphs-tip-title">Hand-Stitched</div><div class="iphs-tip-desc">Double saddle stitch</div></div></div></div><script>(function(){document.querySelectorAll(".iphs-dot").forEach(function(d){d.addEventListener("click",function(e){e.stopPropagation();var tip=d.querySelector(".iphs-tip");var open=tip.classList.contains("show");document.querySelectorAll(".iphs-tip.show").forEach(function(t){t.classList.remove("show")});if(!open)tip.classList.add("show")})});document.addEventListener("click",function(){document.querySelectorAll(".iphs-tip.show").forEach(function(t){t.classList.remove("show")})})})()</script>' },
    },
  },
  {
    id: 'comp-modal-glass',
    label: 'Glassmorphic Modal',
    category: 'components', subcategory: 'interactive',
    tags: ['modal', 'popup', 'glass', 'glassmorphism', 'overlay', 'dialog'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Glass Modal',
      defaultStyle: { width: '100%', maxWidth: '480px', minHeight: '240px' },
      defaultContent: { html: '<style>.ipmg-trigger{padding:0.625rem 1.5rem;font-size:0.875rem;font-weight:500;color:#f6efe5;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:0.375rem;cursor:pointer;transition:all 0.3s}.ipmg-trigger:hover{border-color:rgba(200,169,126,0.3)}.ipmg-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;pointer-events:none;transition:opacity 0.3s}.ipmg-overlay.open{opacity:1;pointer-events:auto}.ipmg-box{background:rgba(20,18,16,0.85);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.1);border-radius:1rem;padding:2rem;width:90%;max-width:420px;transform:scale(0.95);transition:transform 0.3s ease}.ipmg-overlay.open .ipmg-box{transform:scale(1)}.ipmg-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}.ipmg-title{font-size:1.125rem;font-weight:600;color:#f6efe5}.ipmg-close{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.06);border:none;color:rgba(225,225,225,0.5);font-size:1.125rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.3s}.ipmg-close:hover{background:rgba(255,255,255,0.1);color:#f6efe5}.ipmg-body{font-size:0.875rem;color:rgba(225,225,225,0.6);line-height:1.6;margin-bottom:1.5rem}.ipmg-cta{width:100%;padding:0.75rem;background:#c8a97e;color:#0a0a0a;font-size:0.875rem;font-weight:600;border:none;border-radius:0.5rem;cursor:pointer;transition:opacity 0.3s}.ipmg-cta:hover{opacity:0.9}</style><button class="ipmg-trigger" id="ipmgOpen">Open Modal</button><div class="ipmg-overlay" id="ipmgOverlay"><div class="ipmg-box"><div class="ipmg-head"><span class="ipmg-title">Premium Access</span><button class="ipmg-close" id="ipmgClose">&times;</button></div><div class="ipmg-body">Unlock exclusive features and premium content. Join our community of creators and elevate your workflow.</div><button class="ipmg-cta">Get Started</button></div></div><script>(function(){var o=document.getElementById("ipmgOverlay");document.getElementById("ipmgOpen").addEventListener("click",function(){o.classList.add("open")});document.getElementById("ipmgClose").addEventListener("click",function(){o.classList.remove("open")});o.addEventListener("click",function(e){if(e.target===o)o.classList.remove("open")})})()</script>' },
    },
  },
  {
    id: 'comp-drawer-panel',
    label: 'Slide-in Drawer Panel',
    category: 'components', subcategory: 'interactive',
    tags: ['drawer', 'panel', 'slide', 'menu', 'sidebar', 'off-canvas'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Drawer Panel',
      defaultStyle: { width: '100%', maxWidth: '480px', minHeight: '200px' },
      defaultContent: { html: '<style>.ipdw-trigger{padding:0.625rem 1.5rem;font-size:0.875rem;font-weight:500;color:#f6efe5;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:0.375rem;cursor:pointer;transition:all 0.3s}.ipdw-trigger:hover{border-color:rgba(200,169,126,0.3)}.ipdw-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9998;opacity:0;pointer-events:none;transition:opacity 0.3s}.ipdw-overlay.open{opacity:1;pointer-events:auto}.ipdw-drawer{position:fixed;top:0;right:0;bottom:0;width:320px;background:rgba(14,12,10,0.97);backdrop-filter:blur(16px);border-left:1px solid rgba(255,255,255,0.08);z-index:9999;transform:translateX(100%);transition:transform 0.35s ease;padding:1.5rem;display:flex;flex-direction:column}.ipdw-drawer.open{transform:translateX(0)}.ipdw-dhead{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem}.ipdw-dtitle{font-size:1rem;font-weight:600;color:#f6efe5}.ipdw-dclose{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.06);border:none;color:rgba(225,225,225,0.5);font-size:1.125rem;cursor:pointer;display:flex;align-items:center;justify-content:center}.ipdw-dclose:hover{background:rgba(255,255,255,0.1);color:#f6efe5}.ipdw-items{display:flex;flex-direction:column;gap:0.25rem}.ipdw-item{padding:0.75rem 1rem;font-size:0.875rem;color:rgba(225,225,225,0.7);border-radius:0.5rem;cursor:pointer;transition:all 0.2s}.ipdw-item:hover{background:rgba(255,255,255,0.06);color:#f6efe5}</style><button class="ipdw-trigger" id="ipdwOpen">Open Drawer</button><div class="ipdw-overlay" id="ipdwOv"></div><div class="ipdw-drawer" id="ipdwDr"><div class="ipdw-dhead"><span class="ipdw-dtitle">Navigation</span><button class="ipdw-dclose" id="ipdwClose">&times;</button></div><div class="ipdw-items"><div class="ipdw-item">Dashboard</div><div class="ipdw-item">Projects</div><div class="ipdw-item">Analytics</div><div class="ipdw-item">Settings</div><div class="ipdw-item">Help & Support</div></div></div><script>(function(){var ov=document.getElementById("ipdwOv"),dr=document.getElementById("ipdwDr");function open(){ov.classList.add("open");dr.classList.add("open")}function close(){ov.classList.remove("open");dr.classList.remove("open")}document.getElementById("ipdwOpen").addEventListener("click",open);document.getElementById("ipdwClose").addEventListener("click",close);ov.addEventListener("click",close)})()</script>' },
    },
  },
  {
    id: 'comp-tabs-animated',
    label: 'Animated Tabs',
    category: 'components', subcategory: 'interactive',
    tags: ['tabs', 'animated', 'slide', 'content', 'switch', 'panel'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Animated Tabs',
      defaultStyle: { width: '100%', maxWidth: '520px', minHeight: '260px' },
      defaultContent: { html: '<style>.ipta-wrap{display:flex;flex-direction:column;gap:1rem}.ipta-tabs{display:flex;gap:0;background:rgba(255,255,255,0.04);border-radius:0.5rem;padding:4px;border:1px solid rgba(255,255,255,0.06)}.ipta-tab{flex:1;padding:0.625rem 1rem;font-size:0.8125rem;font-weight:500;color:rgba(225,225,225,0.5);text-align:center;cursor:pointer;border-radius:0.375rem;transition:all 0.3s;border:none;background:none}.ipta-tab.active{background:rgba(200,169,126,0.15);color:#c8a97e}.ipta-panels{position:relative;overflow:hidden;border-radius:0.75rem;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02);min-height:160px}.ipta-track{display:flex;transition:transform 0.4s ease;width:300%}.ipta-panel{width:100%;flex-shrink:0;padding:1.5rem}.ipta-panel h4{font-size:0.9375rem;font-weight:600;color:#f6efe5;margin:0 0 0.5rem}.ipta-panel p{font-size:0.8125rem;color:rgba(225,225,225,0.5);line-height:1.6;margin:0}</style><div class="ipta-wrap"><div class="ipta-tabs" id="iptaTabs"><button class="ipta-tab active" data-i="0">Design</button><button class="ipta-tab" data-i="1">Develop</button><button class="ipta-tab" data-i="2">Deploy</button></div><div class="ipta-panels"><div class="ipta-track" id="iptaTrack"><div class="ipta-panel"><h4>Design System</h4><p>Create beautiful, consistent interfaces with our premium component library. Every element is crafted for visual excellence.</p></div><div class="ipta-panel"><h4>Development</h4><p>Build with modern tools and frameworks. Clean code architecture ensures maintainability and performance at scale.</p></div><div class="ipta-panel"><h4>Deployment</h4><p>Ship to production with confidence. Automated pipelines, monitoring, and rollback capabilities included.</p></div></div></div></div><script>(function(){var tabs=document.querySelectorAll("#iptaTabs .ipta-tab"),track=document.getElementById("iptaTrack");tabs.forEach(function(t){t.addEventListener("click",function(){tabs.forEach(function(b){b.classList.remove("active")});t.classList.add("active");track.style.transform="translateX(-"+t.dataset.i*(100/3)+"%)"})})})() </script>' },
    },
  },
  {
    id: 'comp-stepper-form',
    label: 'Multi-Step Form Wizard',
    category: 'components', subcategory: 'interactive',
    tags: ['stepper', 'form', 'wizard', 'multi-step', 'progress', 'steps'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Stepper Form',
      defaultStyle: { width: '100%', maxWidth: '480px', minHeight: '320px' },
      defaultContent: { html: '<style>.ipsf-wrap{display:flex;flex-direction:column;gap:1.5rem;padding:2rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:0.75rem}.ipsf-dots{display:flex;align-items:center;justify-content:center;gap:0.75rem}.ipsf-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.1);transition:all 0.3s}.ipsf-dot.active{background:#c8a97e;box-shadow:0 0 8px rgba(200,169,126,0.4)}.ipsf-dot.done{background:rgba(200,169,126,0.4)}.ipsf-line{width:40px;height:2px;background:rgba(255,255,255,0.06);transition:background 0.3s}.ipsf-line.done{background:rgba(200,169,126,0.3)}.ipsf-panels{position:relative;overflow:hidden;min-height:140px}.ipsf-strk{display:flex;width:300%;transition:transform 0.4s ease}.ipsf-step{width:100%;flex-shrink:0;display:flex;flex-direction:column;gap:0.75rem}.ipsf-label{font-size:0.75rem;color:rgba(225,225,225,0.4);text-transform:uppercase;letter-spacing:0.05em}.ipsf-input{padding:0.75rem 1rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:0.5rem;color:#f6efe5;font-size:0.875rem;outline:none;transition:border-color 0.3s}.ipsf-input:focus{border-color:rgba(200,169,126,0.4)}.ipsf-input::placeholder{color:rgba(225,225,225,0.25)}.ipsf-btns{display:flex;justify-content:space-between;gap:0.75rem}.ipsf-btn{padding:0.625rem 1.25rem;font-size:0.8125rem;font-weight:500;border-radius:0.375rem;cursor:pointer;transition:all 0.3s;border:none}.ipsf-prev{background:rgba(255,255,255,0.06);color:rgba(225,225,225,0.6)}.ipsf-prev:hover{background:rgba(255,255,255,0.1)}.ipsf-next{background:#c8a97e;color:#0a0a0a}.ipsf-next:hover{opacity:0.9}.ipsf-btn:disabled{opacity:0.3;cursor:default}</style><div class="ipsf-wrap"><div class="ipsf-dots" id="ipsfDots"><div class="ipsf-dot active"></div><div class="ipsf-line"></div><div class="ipsf-dot"></div><div class="ipsf-line"></div><div class="ipsf-dot"></div></div><div class="ipsf-panels"><div class="ipsf-strk" id="ipsfTrk"><div class="ipsf-step"><div class="ipsf-label">Step 1 — Personal Info</div><input class="ipsf-input" placeholder="Full Name"><input class="ipsf-input" placeholder="Email Address"></div><div class="ipsf-step"><div class="ipsf-label">Step 2 — Project Details</div><input class="ipsf-input" placeholder="Company Name"><input class="ipsf-input" placeholder="Project Type"></div><div class="ipsf-step"><div class="ipsf-label">Step 3 — Budget & Timeline</div><input class="ipsf-input" placeholder="Budget Range"><input class="ipsf-input" placeholder="Deadline"></div></div></div><div class="ipsf-btns"><button class="ipsf-btn ipsf-prev" id="ipsfPrev" disabled>Back</button><button class="ipsf-btn ipsf-next" id="ipsfNext">Next</button></div></div><script>(function(){var cur=0,max=2,trk=document.getElementById("ipsfTrk"),dots=document.querySelectorAll("#ipsfDots .ipsf-dot"),lines=document.querySelectorAll("#ipsfDots .ipsf-line"),prev=document.getElementById("ipsfPrev"),next=document.getElementById("ipsfNext");function upd(){trk.style.transform="translateX(-"+cur*(100/3)+"%)";dots.forEach(function(d,i){d.classList.toggle("active",i===cur);d.classList.toggle("done",i<cur)});lines.forEach(function(l,i){l.classList.toggle("done",i<cur)});prev.disabled=cur===0;next.textContent=cur===max?"Submit":"Next"}prev.addEventListener("click",function(){if(cur>0){cur--;upd()}});next.addEventListener("click",function(){if(cur<max){cur++;upd()}});upd()})()</script>' },
    },
  },
  {
    id: 'comp-range-slider',
    label: 'Premium Range Slider',
    category: 'components', subcategory: 'interactive',
    tags: ['range', 'slider', 'input', 'gradient', 'value', 'control'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Range Slider',
      defaultStyle: { width: '100%', maxWidth: '400px', minHeight: '70px' },
      defaultContent: { html: '<style>.iprs-wrap{display:flex;flex-direction:column;gap:0.75rem;padding:1.25rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:0.75rem}.iprs-head{display:flex;justify-content:space-between;align-items:center}.iprs-label{font-size:0.8125rem;font-weight:500;color:#f6efe5}.iprs-val{font-size:0.875rem;font-weight:600;color:#c8a97e;font-variant-numeric:tabular-nums}.iprs-track{position:relative;height:6px;background:rgba(255,255,255,0.06);border-radius:99px;cursor:pointer}.iprs-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,#4a2711,#c8a97e);width:60%;transition:width 0.05s}.iprs-thumb{position:absolute;top:50%;transform:translate(-50%,-50%);width:20px;height:20px;border-radius:50%;background:#c8a97e;box-shadow:0 0 10px rgba(200,169,126,0.4);cursor:grab;left:60%;transition:left 0.05s}</style><div class="iprs-wrap"><div class="iprs-head"><span class="iprs-label">Budget</span><span class="iprs-val" id="iprsVal">$6,000</span></div><div class="iprs-track" id="iprsTrk"><div class="iprs-fill" id="iprsFill"></div><div class="iprs-thumb" id="iprsThumb"></div></div></div><script>(function(){var trk=document.getElementById("iprsTrk"),fill=document.getElementById("iprsFill"),thumb=document.getElementById("iprsThumb"),val=document.getElementById("iprsVal"),drag=false;function set(x){var r=trk.getBoundingClientRect(),p=Math.max(0,Math.min(1,(x-r.left)/r.width));fill.style.width=p*100+"%";thumb.style.left=p*100+"%";var v=Math.round(p*10000);val.textContent="$"+v.toLocaleString()}trk.addEventListener("pointerdown",function(e){drag=true;trk.setPointerCapture(e.pointerId);set(e.clientX)});trk.addEventListener("pointermove",function(e){if(drag)set(e.clientX)});trk.addEventListener("pointerup",function(){drag=false})})()</script>' },
    },
  },
  {
    id: 'comp-toggle-switch',
    label: 'Premium Toggle Switch',
    category: 'components', subcategory: 'interactive',
    tags: ['toggle', 'switch', 'on', 'off', 'boolean', 'control'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Toggle Switch',
      defaultStyle: { width: 'auto', minHeight: '40px', display: 'inline-flex' },
      defaultContent: { html: '<style>.ipts-wrap{display:inline-flex;align-items:center;gap:0.75rem;padding:0.75rem 1.25rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:0.75rem}.ipts-label{font-size:0.8125rem;color:rgba(225,225,225,0.6);transition:color 0.3s}.ipts-wrap.on .ipts-label{color:#f6efe5}.ipts-sw{position:relative;width:52px;height:28px;background:rgba(255,255,255,0.08);border-radius:99px;cursor:pointer;transition:background 0.3s ease}.ipts-wrap.on .ipts-sw{background:rgba(200,169,126,0.25)}.ipts-knob{position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#666;transition:all 0.3s ease;box-shadow:0 1px 3px rgba(0,0,0,0.3)}.ipts-wrap.on .ipts-knob{left:27px;background:#c8a97e;box-shadow:0 0 8px rgba(200,169,126,0.4)}.ipts-status{font-size:0.75rem;color:rgba(225,225,225,0.3);min-width:24px}</style><div class="ipts-wrap" id="iptsWrap"><span class="ipts-label">Notifications</span><div class="ipts-sw"><div class="ipts-knob"></div></div><span class="ipts-status" id="iptsStatus">Off</span></div><script>(function(){var w=document.getElementById("iptsWrap"),s=document.getElementById("iptsStatus");w.addEventListener("click",function(){var on=w.classList.toggle("on");s.textContent=on?"On":"Off"})})()</script>' },
    },
  },
  {
    id: 'comp-dropdown-select',
    label: 'Custom Dropdown Select',
    category: 'components', subcategory: 'interactive',
    tags: ['dropdown', 'select', 'search', 'filter', 'options', 'menu'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Dropdown Select',
      defaultStyle: { width: '100%', maxWidth: '320px', minHeight: '48px' },
      defaultContent: { html: '<style>.ipds-wrap{position:relative;font-family:inherit}.ipds-trigger{width:100%;padding:0.75rem 1rem;padding-right:2.5rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:0.5rem;color:#f6efe5;font-size:0.875rem;cursor:pointer;display:flex;align-items:center;transition:border-color 0.3s}.ipds-trigger:hover{border-color:rgba(200,169,126,0.3)}.ipds-arrow{position:absolute;right:1rem;top:50%;transform:translateY(-50%) rotate(0deg);transition:transform 0.3s;color:rgba(225,225,225,0.4);font-size:0.625rem}.ipds-wrap.open .ipds-arrow{transform:translateY(-50%) rotate(180deg)}.ipds-menu{position:absolute;top:calc(100% + 6px);left:0;right:0;background:rgba(14,12,10,0.97);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.1);border-radius:0.5rem;padding:0.375rem;max-height:0;overflow:hidden;opacity:0;transition:all 0.25s ease;z-index:10}.ipds-wrap.open .ipds-menu{max-height:280px;opacity:1;overflow:auto}.ipds-search{width:100%;padding:0.5rem 0.75rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:0.375rem;color:#f6efe5;font-size:0.8125rem;margin-bottom:0.375rem;outline:none}.ipds-search::placeholder{color:rgba(225,225,225,0.25)}.ipds-opt{padding:0.5rem 0.75rem;font-size:0.8125rem;color:rgba(225,225,225,0.6);border-radius:0.375rem;cursor:pointer;transition:all 0.15s}.ipds-opt:hover{background:rgba(255,255,255,0.06);color:#f6efe5}.ipds-opt.sel{color:#c8a97e}</style><div class="ipds-wrap" id="ipdsWrap"><div class="ipds-trigger" id="ipdsTrig"><span id="ipdsLabel">Select an option...</span><span class="ipds-arrow">&#9660;</span></div><div class="ipds-menu"><input class="ipds-search" placeholder="Search..." id="ipdsSearch"><div id="ipdsOpts"><div class="ipds-opt" data-v="design">Design System</div><div class="ipds-opt" data-v="dev">Development</div><div class="ipds-opt" data-v="brand">Brand Strategy</div><div class="ipds-opt" data-v="market">Marketing</div><div class="ipds-opt" data-v="consult">Consulting</div></div></div></div><script>(function(){var w=document.getElementById("ipdsWrap"),trig=document.getElementById("ipdsTrig"),lbl=document.getElementById("ipdsLabel"),search=document.getElementById("ipdsSearch"),opts=document.querySelectorAll(".ipds-opt");trig.addEventListener("click",function(e){e.stopPropagation();w.classList.toggle("open");if(w.classList.contains("open"))search.focus()});opts.forEach(function(o){o.addEventListener("click",function(){opts.forEach(function(x){x.classList.remove("sel")});o.classList.add("sel");lbl.textContent=o.textContent;w.classList.remove("open")})});search.addEventListener("input",function(){var q=search.value.toLowerCase();opts.forEach(function(o){o.style.display=o.textContent.toLowerCase().includes(q)?"":"none"})});document.addEventListener("click",function(){w.classList.remove("open")})})()</script>' },
    },
  },
  {
    id: 'comp-testimonial-carousel',
    label: 'Testimonial Carousel',
    category: 'components', subcategory: 'interactive',
    tags: ['testimonial', 'carousel', 'slider', 'review', 'quote', 'autoplay'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Testimonial Carousel',
      defaultStyle: { width: '100%', maxWidth: '560px', minHeight: '240px' },
      defaultContent: { html: '<style>.iptc-wrap{position:relative;overflow:hidden;padding:2rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:0.75rem}.iptc-track{display:flex;transition:transform 0.5s ease;width:300%}.iptc-slide{width:100%;flex-shrink:0;text-align:center;padding:0 1rem}.iptc-quote{font-size:1rem;color:rgba(225,225,225,0.7);line-height:1.7;font-style:italic;margin-bottom:1.25rem}.iptc-quote::before{content:"\\201C";font-size:2rem;color:#c8a97e;line-height:0;vertical-align:-0.5rem;margin-right:0.25rem}.iptc-author{font-size:0.875rem;font-weight:600;color:#f6efe5}.iptc-role{font-size:0.75rem;color:rgba(225,225,225,0.4)}.iptc-nav{display:flex;justify-content:center;align-items:center;gap:1rem;margin-top:1.25rem}.iptc-arr{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);color:rgba(225,225,225,0.5);font-size:0.875rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.3s}.iptc-arr:hover{border-color:rgba(200,169,126,0.3);color:#c8a97e}.iptc-dots{display:flex;gap:0.375rem}.iptc-dotn{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.1);cursor:pointer;transition:all 0.3s;border:none}.iptc-dotn.active{background:#c8a97e}</style><div class="iptc-wrap"><div class="iptc-track" id="iptcTrk"><div class="iptc-slide"><div class="iptc-quote">Their attention to detail is unmatched. The final result exceeded every expectation we had.</div><div class="iptc-author">Sarah Chen</div><div class="iptc-role">CEO, Luxe Interiors</div></div><div class="iptc-slide"><div class="iptc-quote">Working with this team transformed our brand entirely. Premium quality in every pixel.</div><div class="iptc-author">Marc Dubois</div><div class="iptc-role">Creative Director, Atelier</div></div><div class="iptc-slide"><div class="iptc-quote">The most sophisticated web presence we\'ve ever had. Our clients notice the difference immediately.</div><div class="iptc-author">Elena Rossi</div><div class="iptc-role">Founder, Villa Collection</div></div></div><div class="iptc-nav"><button class="iptc-arr" id="iptcPrev">&#8249;</button><div class="iptc-dots" id="iptcDots"><button class="iptc-dotn active"></button><button class="iptc-dotn"></button><button class="iptc-dotn"></button></div><button class="iptc-arr" id="iptcNext">&#8250;</button></div></div><script>(function(){var cur=0,max=2,trk=document.getElementById("iptcTrk"),dots=document.querySelectorAll("#iptcDots .iptc-dotn");function go(i){cur=i<0?max:i>max?0:i;trk.style.transform="translateX(-"+cur*(100/3)+"%)";dots.forEach(function(d,j){d.classList.toggle("active",j===cur)})}document.getElementById("iptcPrev").addEventListener("click",function(){go(cur-1)});document.getElementById("iptcNext").addEventListener("click",function(){go(cur+1)});dots.forEach(function(d,i){d.addEventListener("click",function(){go(i)})});setInterval(function(){go(cur+1)},5000)})()</script>' },
    },
  },
  {
    id: 'comp-portfolio-filter',
    label: 'Filterable Portfolio Grid',
    category: 'components', subcategory: 'interactive',
    tags: ['portfolio', 'filter', 'grid', 'gallery', 'isotope', 'masonry'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Portfolio Filter',
      defaultStyle: { width: '100%', maxWidth: '640px', minHeight: '360px' },
      defaultContent: { html: '<style>.ippf-wrap{display:flex;flex-direction:column;gap:1.25rem}.ippf-filters{display:flex;gap:0.5rem}.ippf-fbtn{padding:0.5rem 1rem;font-size:0.8125rem;font-weight:500;color:rgba(225,225,225,0.5);background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:0.375rem;cursor:pointer;transition:all 0.3s}.ippf-fbtn.active{color:#c8a97e;border-color:rgba(200,169,126,0.3);background:rgba(200,169,126,0.08)}.ippf-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem}.ippf-card{border-radius:0.625rem;overflow:hidden;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);transition:all 0.4s ease;opacity:1;transform:scale(1)}.ippf-card.hide{opacity:0;transform:scale(0.9);position:absolute;pointer-events:none}.ippf-thumb{width:100%;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;font-size:0.75rem;color:rgba(225,225,225,0.3)}.ippf-info{padding:0.75rem}.ippf-name{font-size:0.8125rem;font-weight:600;color:#f6efe5}.ippf-cat{font-size:0.6875rem;color:rgba(225,225,225,0.4)}</style><div class="ippf-wrap"><div class="ippf-filters" id="ippfFil"><button class="ippf-fbtn active" data-f="all">All</button><button class="ippf-fbtn" data-f="web">Web</button><button class="ippf-fbtn" data-f="brand">Brand</button></div><div class="ippf-grid" id="ippfGrid"><div class="ippf-card" data-c="web"><div class="ippf-thumb" style="background:rgba(200,169,126,0.08)">Web Project</div><div class="ippf-info"><div class="ippf-name">Luxury Resort</div><div class="ippf-cat">Web Design</div></div></div><div class="ippf-card" data-c="brand"><div class="ippf-thumb" style="background:rgba(99,139,255,0.08)">Brand Project</div><div class="ippf-info"><div class="ippf-name">Atelier Mode</div><div class="ippf-cat">Branding</div></div></div><div class="ippf-card" data-c="web"><div class="ippf-thumb" style="background:rgba(200,169,126,0.06)">Web Project</div><div class="ippf-info"><div class="ippf-name">Gourmet Bistro</div><div class="ippf-cat">Web Design</div></div></div><div class="ippf-card" data-c="brand"><div class="ippf-thumb" style="background:rgba(99,139,255,0.06)">Brand Project</div><div class="ippf-info"><div class="ippf-name">Villa Estates</div><div class="ippf-cat">Branding</div></div></div><div class="ippf-card" data-c="web"><div class="ippf-thumb" style="background:rgba(200,169,126,0.04)">Web Project</div><div class="ippf-info"><div class="ippf-name">Artisan Coffee</div><div class="ippf-cat">Web Design</div></div></div><div class="ippf-card" data-c="brand"><div class="ippf-thumb" style="background:rgba(99,139,255,0.04)">Brand Project</div><div class="ippf-info"><div class="ippf-name">Noir Studio</div><div class="ippf-cat">Branding</div></div></div></div></div><script>(function(){var btns=document.querySelectorAll("#ippfFil .ippf-fbtn"),cards=document.querySelectorAll("#ippfGrid .ippf-card");btns.forEach(function(b){b.addEventListener("click",function(){btns.forEach(function(x){x.classList.remove("active")});b.classList.add("active");var f=b.dataset.f;cards.forEach(function(c){c.classList.toggle("hide",f!=="all"&&c.dataset.c!==f)})})})})()</script>' },
    },
  },
  {
    id: 'comp-command-palette',
    label: 'Command Palette (Cmd+K)',
    category: 'components', subcategory: 'interactive',
    tags: ['command', 'palette', 'search', 'spotlight', 'cmd-k', 'keyboard'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Command Palette',
      defaultStyle: { width: '100%', maxWidth: '480px', minHeight: '200px' },
      defaultContent: { html: '<style>.ipcp-trigger{display:flex;align-items:center;gap:0.75rem;padding:0.625rem 1rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:0.5rem;cursor:pointer;transition:all 0.3s;width:100%}.ipcp-trigger:hover{border-color:rgba(255,255,255,0.15)}.ipcp-icon{color:rgba(225,225,225,0.3);font-size:0.875rem}.ipcp-text{font-size:0.8125rem;color:rgba(225,225,225,0.3);flex:1;text-align:left}.ipcp-kbd{display:flex;gap:0.25rem}.ipcp-key{padding:0.125rem 0.375rem;font-size:0.6875rem;color:rgba(225,225,225,0.4);background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:0.25rem;font-family:inherit}.ipcp-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding-top:20vh;opacity:0;pointer-events:none;transition:opacity 0.2s}.ipcp-overlay.open{opacity:1;pointer-events:auto}.ipcp-box{width:90%;max-width:480px;background:rgba(14,12,10,0.97);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.1);border-radius:0.75rem;overflow:hidden;transform:scale(0.98) translateY(-8px);transition:transform 0.25s ease}.ipcp-overlay.open .ipcp-box{transform:scale(1) translateY(0)}.ipcp-sinput{width:100%;padding:1rem 1.25rem;background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,0.06);color:#f6efe5;font-size:0.9375rem;outline:none}.ipcp-sinput::placeholder{color:rgba(225,225,225,0.25)}.ipcp-results{padding:0.5rem}.ipcp-group{padding:0.25rem 0.75rem;font-size:0.6875rem;color:rgba(225,225,225,0.3);text-transform:uppercase;letter-spacing:0.05em;margin-top:0.25rem}.ipcp-item{display:flex;align-items:center;gap:0.75rem;padding:0.625rem 0.75rem;border-radius:0.375rem;cursor:pointer;transition:all 0.15s}.ipcp-item:hover{background:rgba(255,255,255,0.06)}.ipcp-iicon{width:20px;text-align:center;color:rgba(225,225,225,0.3);font-size:0.8125rem}.ipcp-ilabel{font-size:0.8125rem;color:rgba(225,225,225,0.7);flex:1}.ipcp-ishort{font-size:0.6875rem;color:rgba(225,225,225,0.2)}</style><div class="ipcp-trigger" id="ipcpOpen"><span class="ipcp-icon">&#128269;</span><span class="ipcp-text">Search commands...</span><div class="ipcp-kbd"><span class="ipcp-key">&#8984;</span><span class="ipcp-key">K</span></div></div><div class="ipcp-overlay" id="ipcpOv"><div class="ipcp-box"><input class="ipcp-sinput" placeholder="Type a command or search..." id="ipcpInput"><div class="ipcp-results"><div class="ipcp-group">Pages</div><div class="ipcp-item"><span class="ipcp-iicon">&#9670;</span><span class="ipcp-ilabel">Dashboard</span><span class="ipcp-ishort">G D</span></div><div class="ipcp-item"><span class="ipcp-iicon">&#9998;</span><span class="ipcp-ilabel">Editor</span><span class="ipcp-ishort">G E</span></div><div class="ipcp-group">Actions</div><div class="ipcp-item"><span class="ipcp-iicon">&#43;</span><span class="ipcp-ilabel">New Project</span><span class="ipcp-ishort">N</span></div><div class="ipcp-item"><span class="ipcp-iicon">&#8599;</span><span class="ipcp-ilabel">Deploy Site</span><span class="ipcp-ishort">&#8984;D</span></div><div class="ipcp-item"><span class="ipcp-iicon">&#9881;</span><span class="ipcp-ilabel">Settings</span><span class="ipcp-ishort">&#8984;,</span></div></div></div></div><script>(function(){var ov=document.getElementById("ipcpOv"),inp=document.getElementById("ipcpInput");document.getElementById("ipcpOpen").addEventListener("click",function(){ov.classList.add("open");inp.focus()});ov.addEventListener("click",function(e){if(e.target===ov)ov.classList.remove("open")});inp.addEventListener("input",function(){var q=inp.value.toLowerCase(),items=document.querySelectorAll(".ipcp-item");items.forEach(function(it){it.style.display=it.querySelector(".ipcp-ilabel").textContent.toLowerCase().includes(q)?"":"none"})})})()</script>' },
    },
  },
]

// ─── CONTENT PREMIUM (12 rich content components) ───

const CONTENT_PREMIUM: LibraryElementItem[] = [
  {
    id: 'comp-stats-counter-row',
    label: 'Animated Stats Counter Row',
    category: 'components', subcategory: 'content',
    tags: ['stats', 'counter', 'number', 'animated', 'metrics', 'kpi'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Stats Counter Row',
      defaultStyle: { width: '100%', maxWidth: '720px', minHeight: '100px' },
      defaultContent: { html: '<style>.cpsc-wrap{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}.cpsc-stat{text-align:center;padding:1.25rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:0.75rem;transition:border-color 0.3s;cursor:default}.cpsc-stat:hover{border-color:rgba(200,169,126,0.25)}.cpsc-num{font-size:1.75rem;font-weight:700;color:#f6efe5;font-variant-numeric:tabular-nums;transition:color 0.3s}.cpsc-stat:hover .cpsc-num{color:#c8a97e}.cpsc-label{font-size:0.75rem;color:rgba(225,225,225,0.4);margin-top:0.25rem}</style><div class="cpsc-wrap"><div class="cpsc-stat" data-target="250" data-suffix="+"><div class="cpsc-num">0+</div><div class="cpsc-label">Projects Delivered</div></div><div class="cpsc-stat" data-target="98" data-suffix="%"><div class="cpsc-num">0%</div><div class="cpsc-label">Client Satisfaction</div></div><div class="cpsc-stat" data-target="50" data-suffix="+"><div class="cpsc-num">0+</div><div class="cpsc-label">Team Members</div></div><div class="cpsc-stat" data-target="24" data-suffix="/7"><div class="cpsc-num">0/7</div><div class="cpsc-label">Support Available</div></div></div><script>(function(){var stats=document.querySelectorAll(".cpsc-stat");stats.forEach(function(s){var num=s.querySelector(".cpsc-num"),target=parseInt(s.dataset.target),suffix=s.dataset.suffix||"",running=false;function animate(){if(running)return;running=true;var start=0,dur=1200,t0=null;function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1);var ease=1-Math.pow(1-p,3);var v=Math.round(ease*target);num.textContent=v+suffix;if(p<1)requestAnimationFrame(step);else running=false}requestAnimationFrame(step)}s.addEventListener("mouseenter",animate);animate()})})()</script>' },
    },
  },
  {
    id: 'comp-pricing-table',
    label: 'Pricing Table (3 Columns)',
    category: 'components', subcategory: 'content',
    tags: ['pricing', 'table', 'plans', 'popular', 'features', 'comparison'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Pricing Table',
      defaultStyle: { width: '100%', maxWidth: '760px', minHeight: '400px' },
      defaultContent: { html: '<style>.cppt-wrap{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;align-items:start}.cppt-col{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:0.75rem;padding:1.75rem;text-align:center;transition:all 0.3s}.cppt-col.pop{border-color:rgba(200,169,126,0.4);background:rgba(200,169,126,0.04);transform:scale(1.02);position:relative}.cppt-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#c8a97e;color:#0a0a0a;font-size:0.6875rem;font-weight:600;padding:0.2rem 0.75rem;border-radius:99px}.cppt-name{font-size:0.875rem;color:rgba(225,225,225,0.5);margin-bottom:0.5rem}.cppt-price{font-size:2.25rem;font-weight:700;color:#f6efe5;margin-bottom:0.25rem}.cppt-price span{font-size:0.875rem;font-weight:400;color:rgba(225,225,225,0.4)}.cppt-feats{list-style:none;padding:0;margin:1.25rem 0;display:flex;flex-direction:column;gap:0.5rem;text-align:left}.cppt-feats li{font-size:0.8125rem;color:rgba(225,225,225,0.6);display:flex;align-items:center;gap:0.5rem}.cppt-check{color:#c8a97e;font-size:0.75rem}.cppt-x{color:rgba(225,225,225,0.15);font-size:0.75rem}.cppt-cta{width:100%;padding:0.75rem;font-size:0.8125rem;font-weight:600;border-radius:0.5rem;cursor:pointer;transition:all 0.3s;border:none}.cppt-cta-outline{background:transparent;border:1px solid rgba(255,255,255,0.12);color:rgba(225,225,225,0.7)}.cppt-cta-outline:hover{border-color:rgba(200,169,126,0.3);color:#f6efe5}.cppt-cta-fill{background:#c8a97e;color:#0a0a0a}.cppt-cta-fill:hover{opacity:0.9}</style><div class="cppt-wrap"><div class="cppt-col"><div class="cppt-name">Starter</div><div class="cppt-price">$29<span>/mo</span></div><ul class="cppt-feats"><li><span class="cppt-check">&#10003;</span>5 Projects</li><li><span class="cppt-check">&#10003;</span>Basic Analytics</li><li><span class="cppt-check">&#10003;</span>Email Support</li><li><span class="cppt-x">&#10005;</span>Custom Domain</li><li><span class="cppt-x">&#10005;</span>Priority Support</li></ul><button class="cppt-cta cppt-cta-outline">Get Started</button></div><div class="cppt-col pop"><div class="cppt-badge">Most Popular</div><div class="cppt-name">Professional</div><div class="cppt-price">$79<span>/mo</span></div><ul class="cppt-feats"><li><span class="cppt-check">&#10003;</span>Unlimited Projects</li><li><span class="cppt-check">&#10003;</span>Advanced Analytics</li><li><span class="cppt-check">&#10003;</span>Priority Support</li><li><span class="cppt-check">&#10003;</span>Custom Domain</li><li><span class="cppt-x">&#10005;</span>White Label</li></ul><button class="cppt-cta cppt-cta-fill">Get Started</button></div><div class="cppt-col"><div class="cppt-name">Enterprise</div><div class="cppt-price">$199<span>/mo</span></div><ul class="cppt-feats"><li><span class="cppt-check">&#10003;</span>Everything in Pro</li><li><span class="cppt-check">&#10003;</span>White Label</li><li><span class="cppt-check">&#10003;</span>Dedicated Manager</li><li><span class="cppt-check">&#10003;</span>SLA Guarantee</li><li><span class="cppt-check">&#10003;</span>Custom Integrations</li></ul><button class="cppt-cta cppt-cta-outline">Contact Sales</button></div></div>' },
    },
  },
  {
    id: 'comp-timeline-horizontal',
    label: 'Horizontal Scrollable Timeline',
    category: 'components', subcategory: 'content',
    tags: ['timeline', 'horizontal', 'scroll', 'history', 'milestones', 'steps'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Horizontal Timeline',
      defaultStyle: { width: '100%', maxWidth: '720px', minHeight: '180px' },
      defaultContent: { html: '<style>.cpth-wrap{overflow-x:auto;scrollbar-width:thin;scrollbar-color:rgba(200,169,126,0.2) transparent;padding:1rem 0}.cpth-track{display:flex;align-items:flex-start;min-width:max-content;position:relative;padding:0 1rem}.cpth-line{position:absolute;top:20px;left:2rem;right:2rem;height:2px;background:rgba(255,255,255,0.06)}.cpth-item{display:flex;flex-direction:column;align-items:center;min-width:140px;position:relative;z-index:1}.cpth-dot{width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,0.1);border:2px solid rgba(255,255,255,0.08);transition:all 0.3s;cursor:pointer}.cpth-item:hover .cpth-dot{background:#c8a97e;border-color:#c8a97e;box-shadow:0 0 10px rgba(200,169,126,0.4)}.cpth-card{margin-top:1rem;padding:1rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:0.5rem;text-align:center;transition:border-color 0.3s;max-width:130px}.cpth-item:hover .cpth-card{border-color:rgba(200,169,126,0.2)}.cpth-year{font-size:0.6875rem;color:#c8a97e;font-weight:600;margin-bottom:0.25rem}.cpth-title{font-size:0.8125rem;font-weight:600;color:#f6efe5;margin-bottom:0.25rem}.cpth-desc{font-size:0.6875rem;color:rgba(225,225,225,0.4);line-height:1.4}</style><div class="cpth-wrap"><div class="cpth-track"><div class="cpth-line"></div><div class="cpth-item"><div class="cpth-dot"></div><div class="cpth-card"><div class="cpth-year">2020</div><div class="cpth-title">Founded</div><div class="cpth-desc">Studio launched with a vision</div></div></div><div class="cpth-item"><div class="cpth-dot"></div><div class="cpth-card"><div class="cpth-year">2021</div><div class="cpth-title">First Client</div><div class="cpth-desc">Luxury brand partnership</div></div></div><div class="cpth-item"><div class="cpth-dot"></div><div class="cpth-card"><div class="cpth-year">2022</div><div class="cpth-title">Team Growth</div><div class="cpth-desc">Expanded to 15 members</div></div></div><div class="cpth-item"><div class="cpth-dot"></div><div class="cpth-card"><div class="cpth-year">2023</div><div class="cpth-title">Award</div><div class="cpth-desc">Design excellence award</div></div></div><div class="cpth-item"><div class="cpth-dot"></div><div class="cpth-card"><div class="cpth-year">2024</div><div class="cpth-title">Global</div><div class="cpth-desc">International expansion</div></div></div></div></div>' },
    },
  },
  {
    id: 'comp-faq-searchable',
    label: 'Searchable FAQ Accordion',
    category: 'components', subcategory: 'content',
    tags: ['faq', 'search', 'accordion', 'questions', 'help', 'support'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Searchable FAQ',
      defaultStyle: { width: '100%', maxWidth: '560px', minHeight: '320px' },
      defaultContent: { html: '<style>.cpfq-wrap{display:flex;flex-direction:column;gap:1rem}.cpfq-search{padding:0.75rem 1rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:0.5rem;color:#f6efe5;font-size:0.875rem;outline:none;transition:border-color 0.3s}.cpfq-search:focus{border-color:rgba(200,169,126,0.3)}.cpfq-search::placeholder{color:rgba(225,225,225,0.25)}.cpfq-list{display:flex;flex-direction:column;gap:0.5rem}.cpfq-item{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:0.5rem;overflow:hidden;transition:border-color 0.3s}.cpfq-item.open{border-color:rgba(200,169,126,0.2)}.cpfq-q{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.25rem;cursor:pointer;transition:all 0.2s}.cpfq-q:hover{background:rgba(255,255,255,0.02)}.cpfq-qtxt{font-size:0.875rem;font-weight:500;color:#f6efe5}.cpfq-arrow{font-size:0.75rem;color:rgba(225,225,225,0.3);transition:transform 0.3s}.cpfq-item.open .cpfq-arrow{transform:rotate(180deg);color:#c8a97e}.cpfq-a{max-height:0;overflow:hidden;transition:max-height 0.3s ease}.cpfq-item.open .cpfq-a{max-height:200px}.cpfq-atxt{padding:0 1.25rem 1rem;font-size:0.8125rem;color:rgba(225,225,225,0.5);line-height:1.6}</style><div class="cpfq-wrap"><input class="cpfq-search" placeholder="Search questions..." id="cpfqSearch"><div class="cpfq-list" id="cpfqList"><div class="cpfq-item"><div class="cpfq-q"><span class="cpfq-qtxt">What services do you offer?</span><span class="cpfq-arrow">&#9660;</span></div><div class="cpfq-a"><div class="cpfq-atxt">We provide premium web design, brand strategy, and digital transformation services for luxury and high-end businesses.</div></div></div><div class="cpfq-item"><div class="cpfq-q"><span class="cpfq-qtxt">What is your typical project timeline?</span><span class="cpfq-arrow">&#9660;</span></div><div class="cpfq-a"><div class="cpfq-atxt">Most projects range from 4 to 12 weeks depending on scope. We ensure quality at every stage of the process.</div></div></div><div class="cpfq-item"><div class="cpfq-q"><span class="cpfq-qtxt">Do you offer ongoing support?</span><span class="cpfq-arrow">&#9660;</span></div><div class="cpfq-a"><div class="cpfq-atxt">Yes, all projects include 3 months of post-launch support. Extended maintenance plans are available upon request.</div></div></div><div class="cpfq-item"><div class="cpfq-q"><span class="cpfq-qtxt">How do you handle revisions?</span><span class="cpfq-arrow">&#9660;</span></div><div class="cpfq-a"><div class="cpfq-atxt">Each project includes 3 rounds of revisions. We work closely with you to ensure the final result matches your vision.</div></div></div></div></div><script>(function(){var items=document.querySelectorAll(".cpfq-item"),search=document.getElementById("cpfqSearch");items.forEach(function(it){it.querySelector(".cpfq-q").addEventListener("click",function(){it.classList.toggle("open")})});search.addEventListener("input",function(){var q=search.value.toLowerCase();items.forEach(function(it){var txt=it.querySelector(".cpfq-qtxt").textContent.toLowerCase();it.style.display=txt.includes(q)?"":"none"})})})()</script>' },
    },
  },
  {
    id: 'comp-team-grid-hover',
    label: 'Team Grid with Hover Overlay',
    category: 'components', subcategory: 'content',
    tags: ['team', 'grid', 'hover', 'overlay', 'members', 'people'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Team Grid',
      defaultStyle: { width: '100%', maxWidth: '520px', minHeight: '320px' },
      defaultContent: { html: '<style>.cptg-wrap{display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem}.cptg-card{position:relative;aspect-ratio:1;border-radius:0.75rem;overflow:hidden;cursor:pointer;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06)}.cptg-img{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;color:rgba(225,225,225,0.1);background:linear-gradient(135deg,rgba(200,169,126,0.05),rgba(99,139,255,0.05))}.cptg-over{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,0.95) 0%,rgba(10,10,10,0.3) 50%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:1.25rem;opacity:0;transition:opacity 0.35s ease}.cptg-card:hover .cptg-over{opacity:1}.cptg-name{font-size:1rem;font-weight:600;color:#f6efe5;margin-bottom:0.125rem}.cptg-role{font-size:0.8125rem;color:#c8a97e}.cptg-bio{font-size:0.75rem;color:rgba(225,225,225,0.5);margin-top:0.375rem;line-height:1.4}</style><div class="cptg-wrap"><div class="cptg-card"><div class="cptg-img">&#9679;</div><div class="cptg-over"><div class="cptg-name">Alexandre Martin</div><div class="cptg-role">Creative Director</div><div class="cptg-bio">10+ years in luxury brand design</div></div></div><div class="cptg-card"><div class="cptg-img">&#9679;</div><div class="cptg-over"><div class="cptg-name">Sophie Laurent</div><div class="cptg-role">Lead Designer</div><div class="cptg-bio">Award-winning visual identity</div></div></div><div class="cptg-card"><div class="cptg-img">&#9679;</div><div class="cptg-over"><div class="cptg-name">Thomas Beaumont</div><div class="cptg-role">Developer</div><div class="cptg-bio">Full-stack architecture expert</div></div></div><div class="cptg-card"><div class="cptg-img">&#9679;</div><div class="cptg-over"><div class="cptg-name">Claire Dubois</div><div class="cptg-role">Strategy Lead</div><div class="cptg-bio">Brand positioning specialist</div></div></div></div>' },
    },
  },
  {
    id: 'comp-client-logos-ticker',
    label: 'Infinite Logo Ticker',
    category: 'components', subcategory: 'content',
    tags: ['logos', 'ticker', 'marquee', 'clients', 'brands', 'scroll', 'infinite'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Logo Ticker',
      defaultStyle: { width: '100%', maxWidth: '720px', minHeight: '80px' },
      defaultContent: { html: '<style>.cplt-wrap{overflow:hidden;padding:1rem 0;position:relative}.cplt-wrap::before,.cplt-wrap::after{content:"";position:absolute;top:0;bottom:0;width:60px;z-index:1;pointer-events:none}.cplt-wrap::before{left:0;background:linear-gradient(90deg,#0a0a0a,transparent)}.cplt-wrap::after{right:0;background:linear-gradient(270deg,#0a0a0a,transparent)}.cplt-track{display:flex;animation:cplt-scroll 20s linear infinite;width:max-content}.cplt-track:hover{animation-play-state:paused}@keyframes cplt-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.cplt-logo{display:flex;align-items:center;justify-content:center;min-width:120px;height:48px;margin:0 1.5rem;padding:0.5rem 1rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:0.375rem;font-size:0.8125rem;font-weight:600;color:rgba(225,225,225,0.2);filter:grayscale(1);transition:all 0.3s;cursor:default;white-space:nowrap}.cplt-logo:hover{filter:grayscale(0);color:#c8a97e;border-color:rgba(200,169,126,0.2)}</style><div class="cplt-wrap"><div class="cplt-track"><div class="cplt-logo">LUXE CO</div><div class="cplt-logo">ATELIER</div><div class="cplt-logo">MAISON</div><div class="cplt-logo">NOIR STUDIO</div><div class="cplt-logo">VILLA GROUP</div><div class="cplt-logo">PRESTIGE</div><div class="cplt-logo">LUXE CO</div><div class="cplt-logo">ATELIER</div><div class="cplt-logo">MAISON</div><div class="cplt-logo">NOIR STUDIO</div><div class="cplt-logo">VILLA GROUP</div><div class="cplt-logo">PRESTIGE</div></div></div>' },
    },
  },
  {
    id: 'comp-floating-nav',
    label: 'Floating Navigation Pill',
    category: 'components', subcategory: 'content',
    tags: ['floating', 'nav', 'pill', 'sticky', 'scroll', 'navigation'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Floating Nav',
      defaultStyle: { width: '100%', maxWidth: '420px', minHeight: '56px' },
      defaultContent: { html: '<style>.cpfn-pill{display:inline-flex;align-items:center;gap:0.25rem;padding:0.375rem;background:rgba(14,12,10,0.95);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.1);border-radius:99px;box-shadow:0 8px 32px rgba(0,0,0,0.4)}.cpfn-link{padding:0.5rem 1rem;font-size:0.8125rem;font-weight:500;color:rgba(225,225,225,0.5);border-radius:99px;cursor:pointer;transition:all 0.3s;text-decoration:none;white-space:nowrap;border:none;background:none}.cpfn-link:hover{color:#f6efe5}.cpfn-link.active{background:rgba(200,169,126,0.15);color:#c8a97e}</style><nav class="cpfn-pill"><button class="cpfn-link active">Home</button><button class="cpfn-link">Services</button><button class="cpfn-link">Work</button><button class="cpfn-link">Contact</button></nav><script>(function(){var links=document.querySelectorAll(".cpfn-link");links.forEach(function(l){l.addEventListener("click",function(){links.forEach(function(x){x.classList.remove("active")});l.classList.add("active")})})})()</script>' },
    },
  },
  {
    id: 'comp-side-dots-nav',
    label: 'Side Dots Navigation',
    category: 'components', subcategory: 'content',
    tags: ['dots', 'side', 'vertical', 'navigation', 'scroll', 'indicator'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Side Dots Nav',
      defaultStyle: { width: '60px', minHeight: '200px' },
      defaultContent: { html: '<style>.cpsdn-wrap{display:flex;flex-direction:column;align-items:center;gap:1.25rem;padding:1rem 0.5rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:99px;backdrop-filter:blur(8px)}.cpsdn-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.1);cursor:pointer;transition:all 0.3s;position:relative;border:none}.cpsdn-dot:hover{background:rgba(255,255,255,0.2)}.cpsdn-dot.active{background:#c8a97e;box-shadow:0 0 8px rgba(200,169,126,0.4)}.cpsdn-dot.active::before{content:"";position:absolute;inset:-4px;border-radius:50%;border:1px solid rgba(200,169,126,0.2)}.cpsdn-tip{position:absolute;right:calc(100% + 12px);top:50%;transform:translateY(-50%);padding:0.25rem 0.625rem;background:rgba(10,10,10,0.95);border:1px solid rgba(255,255,255,0.1);border-radius:0.25rem;font-size:0.6875rem;color:rgba(225,225,225,0.6);white-space:nowrap;opacity:0;pointer-events:none;transition:opacity 0.2s}.cpsdn-dot:hover .cpsdn-tip{opacity:1}</style><div class="cpsdn-wrap"><button class="cpsdn-dot active"><span class="cpsdn-tip">Home</span></button><button class="cpsdn-dot"><span class="cpsdn-tip">About</span></button><button class="cpsdn-dot"><span class="cpsdn-tip">Services</span></button><button class="cpsdn-dot"><span class="cpsdn-tip">Portfolio</span></button><button class="cpsdn-dot"><span class="cpsdn-tip">Contact</span></button></div><script>(function(){var dots=document.querySelectorAll(".cpsdn-dot");dots.forEach(function(d){d.addEventListener("click",function(){dots.forEach(function(x){x.classList.remove("active")});d.classList.add("active")})})})()</script>' },
    },
  },
  {
    id: 'comp-toc-sticky',
    label: 'Sticky Table of Contents',
    category: 'components', subcategory: 'content',
    tags: ['toc', 'table-of-contents', 'sticky', 'sidebar', 'navigation', 'article'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Sticky TOC',
      defaultStyle: { width: '240px', minHeight: '240px' },
      defaultContent: { html: '<style>.cptoc-wrap{padding:1.25rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:0.75rem}.cptoc-title{font-size:0.6875rem;text-transform:uppercase;letter-spacing:0.08em;color:rgba(225,225,225,0.3);margin-bottom:0.75rem;font-weight:600}.cptoc-list{display:flex;flex-direction:column;gap:0.125rem;border-left:2px solid rgba(255,255,255,0.06);padding-left:0}.cptoc-link{display:block;padding:0.375rem 0.75rem;font-size:0.8125rem;color:rgba(225,225,225,0.45);cursor:pointer;transition:all 0.2s;text-decoration:none;border-left:2px solid transparent;margin-left:-2px;background:none;border-top:none;border-right:none;border-bottom:none;text-align:left;width:100%}.cptoc-link:hover{color:rgba(225,225,225,0.7)}.cptoc-link.active{color:#c8a97e;border-left-color:#c8a97e}.cptoc-link.sub{padding-left:1.5rem;font-size:0.75rem}</style><div class="cptoc-wrap"><div class="cptoc-title">On this page</div><div class="cptoc-list"><button class="cptoc-link active">Introduction</button><button class="cptoc-link">Getting Started</button><button class="cptoc-link sub">Installation</button><button class="cptoc-link sub">Configuration</button><button class="cptoc-link">Core Concepts</button><button class="cptoc-link">API Reference</button><button class="cptoc-link sub">Endpoints</button><button class="cptoc-link sub">Authentication</button><button class="cptoc-link">Examples</button></div></div><script>(function(){var links=document.querySelectorAll(".cptoc-link");links.forEach(function(l){l.addEventListener("click",function(){links.forEach(function(x){x.classList.remove("active")});l.classList.add("active")})})})()</script>' },
    },
  },
  {
    id: 'comp-notification-badge',
    label: 'Notification Bell Dropdown',
    category: 'components', subcategory: 'content',
    tags: ['notification', 'bell', 'badge', 'dropdown', 'alerts', 'count'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Notification Badge',
      defaultStyle: { width: 'auto', minHeight: '44px', display: 'inline-block' },
      defaultContent: { html: '<style>.cpnb-wrap{position:relative;display:inline-block}.cpnb-btn{position:relative;width:40px;height:40px;border-radius:0.5rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.3s;font-size:1.125rem;color:rgba(225,225,225,0.6)}.cpnb-btn:hover{border-color:rgba(200,169,126,0.2);color:#f6efe5}.cpnb-count{position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;border-radius:99px;background:#e04343;font-size:0.625rem;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center;padding:0 4px}.cpnb-drop{position:absolute;top:calc(100% + 8px);right:0;width:280px;background:rgba(14,12,10,0.97);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.1);border-radius:0.75rem;padding:0.5rem;opacity:0;pointer-events:none;transform:translateY(-4px);transition:all 0.25s ease;z-index:10}.cpnb-wrap.open .cpnb-drop{opacity:1;pointer-events:auto;transform:translateY(0)}.cpnb-dhead{display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0.75rem;margin-bottom:0.25rem}.cpnb-dtitle{font-size:0.8125rem;font-weight:600;color:#f6efe5}.cpnb-mark{font-size:0.6875rem;color:#c8a97e;cursor:pointer;background:none;border:none}.cpnb-item{display:flex;gap:0.625rem;padding:0.625rem 0.75rem;border-radius:0.5rem;cursor:pointer;transition:background 0.15s}.cpnb-item:hover{background:rgba(255,255,255,0.04)}.cpnb-idot{width:8px;height:8px;border-radius:50%;background:#c8a97e;margin-top:0.375rem;flex-shrink:0}.cpnb-idot.read{background:rgba(255,255,255,0.1)}.cpnb-icontent{flex:1}.cpnb-itxt{font-size:0.8125rem;color:rgba(225,225,225,0.7);line-height:1.4}.cpnb-itime{font-size:0.6875rem;color:rgba(225,225,225,0.3);margin-top:0.125rem}</style><div class="cpnb-wrap" id="cpnbWrap"><button class="cpnb-btn" id="cpnbBtn">&#128276;<span class="cpnb-count">3</span></button><div class="cpnb-drop"><div class="cpnb-dhead"><span class="cpnb-dtitle">Notifications</span><button class="cpnb-mark">Mark all read</button></div><div class="cpnb-item"><div class="cpnb-idot"></div><div class="cpnb-icontent"><div class="cpnb-itxt">New project proposal received</div><div class="cpnb-itime">2 min ago</div></div></div><div class="cpnb-item"><div class="cpnb-idot"></div><div class="cpnb-icontent"><div class="cpnb-itxt">Client approved the design</div><div class="cpnb-itime">1 hour ago</div></div></div><div class="cpnb-item"><div class="cpnb-idot read"></div><div class="cpnb-icontent"><div class="cpnb-itxt">Deployment completed</div><div class="cpnb-itime">3 hours ago</div></div></div></div></div><script>(function(){var w=document.getElementById("cpnbWrap"),btn=document.getElementById("cpnbBtn");btn.addEventListener("click",function(e){e.stopPropagation();w.classList.toggle("open")});document.addEventListener("click",function(){w.classList.remove("open")})})()</script>' },
    },
  },
  {
    id: 'comp-tag-cloud',
    label: 'Tag Cloud',
    category: 'components', subcategory: 'content',
    tags: ['tags', 'cloud', 'keywords', 'labels', 'topics', 'categories'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Tag Cloud',
      defaultStyle: { width: '100%', maxWidth: '480px', minHeight: '120px' },
      defaultContent: { html: '<style>.cptc-wrap{display:flex;flex-wrap:wrap;gap:0.5rem;padding:1.25rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:0.75rem}.cptc-tag{padding:0.375rem 0.875rem;font-size:0.8125rem;color:rgba(225,225,225,0.5);background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:99px;cursor:pointer;transition:all 0.3s;white-space:nowrap}.cptc-tag:hover{border-color:rgba(200,169,126,0.3);color:#c8a97e;background:rgba(200,169,126,0.06)}.cptc-tag.lg{font-size:0.9375rem;padding:0.5rem 1rem}.cptc-tag.sm{font-size:0.6875rem;padding:0.25rem 0.625rem}.cptc-tag.accent{border-color:rgba(200,169,126,0.2);color:#c8a97e}</style><div class="cptc-wrap"><span class="cptc-tag lg accent">Design</span><span class="cptc-tag">Typography</span><span class="cptc-tag sm">Motion</span><span class="cptc-tag lg">Branding</span><span class="cptc-tag sm">UX Research</span><span class="cptc-tag accent">Development</span><span class="cptc-tag">Strategy</span><span class="cptc-tag lg">Photography</span><span class="cptc-tag sm">Illustration</span><span class="cptc-tag">3D</span><span class="cptc-tag sm accent">AI</span><span class="cptc-tag">Animation</span><span class="cptc-tag lg">Architecture</span><span class="cptc-tag sm">Print</span></div>' },
    },
  },
  {
    id: 'comp-pagination',
    label: 'Pagination Component',
    category: 'components', subcategory: 'content',
    tags: ['pagination', 'pages', 'navigation', 'prev', 'next', 'numbers'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Pagination',
      defaultStyle: { width: 'auto', minHeight: '44px', display: 'inline-flex' },
      defaultContent: { html: '<style>.cppg-wrap{display:inline-flex;align-items:center;gap:0.25rem;padding:0.375rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:0.5rem}.cppg-btn{min-width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:0.8125rem;color:rgba(225,225,225,0.5);background:none;border:1px solid transparent;border-radius:0.375rem;cursor:pointer;transition:all 0.2s;font-weight:500}.cppg-btn:hover{background:rgba(255,255,255,0.06);color:#f6efe5}.cppg-btn.active{background:rgba(200,169,126,0.15);color:#c8a97e;border-color:rgba(200,169,126,0.2)}.cppg-btn.nav{color:rgba(225,225,225,0.3);font-size:0.875rem}.cppg-btn.nav:hover{color:#f6efe5}.cppg-dots{color:rgba(225,225,225,0.2);font-size:0.75rem;padding:0 0.25rem}</style><div class="cppg-wrap" id="cppgWrap"><button class="cppg-btn nav" data-v="prev">&#8249;</button><button class="cppg-btn active" data-v="1">1</button><button class="cppg-btn" data-v="2">2</button><button class="cppg-btn" data-v="3">3</button><span class="cppg-dots">...</span><button class="cppg-btn" data-v="10">10</button><button class="cppg-btn nav" data-v="next">&#8250;</button></div><script>(function(){var btns=document.querySelectorAll("#cppgWrap .cppg-btn:not(.nav)");btns.forEach(function(b){b.addEventListener("click",function(){btns.forEach(function(x){x.classList.remove("active")});b.classList.add("active")})})})()</script>' },
    },
  },
]

// ─── SITE-INSPIRED (premium components inspired by top websites) ───

const SITE_INSPIRED: LibraryElementItem[] = [
  {
    id: 'comp-underline-cta',
    label: 'Luxury Underline CTA',
    category: 'components', subcategory: 'site-inspired',
    tags: ['cta', 'luxury', 'underline', 'aman', 'gold', 'minimal'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Luxury Underline CTA',
      defaultStyle: { width: 'auto', minHeight: '32px', display: 'inline-block' },
      defaultContent: { html: '<style>.si-ucta{display:inline-block;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.15em;color:#C5A572;border-bottom:1px solid #C5A572;padding-bottom:4px;text-decoration:none;cursor:pointer;transition:color 0.4s ease,border-color 0.4s ease;background:none;border-top:none;border-left:none;border-right:none;font-family:inherit}.si-ucta:hover{color:#fff;border-bottom-color:#fff}</style><a class="si-ucta" href="#">Discover More</a>' },
    },
  },
  {
    id: 'comp-sliding-nav-pill',
    label: 'Sliding Nav Pill',
    category: 'components', subcategory: 'site-inspired',
    tags: ['nav', 'pill', 'vercel', 'tabs', 'interactive', 'slide'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Sliding Nav Pill',
      defaultStyle: { width: '100%', maxWidth: '480px', minHeight: '48px' },
      defaultContent: { html: '<style>.si-snp{display:inline-flex;align-items:center;position:relative;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:9999px;padding:4px;gap:0}.si-snp-pill{position:absolute;top:4px;left:4px;height:calc(100% - 8px);border-radius:9999px;background:rgba(255,255,255,0.1);transition:transform 0.35s cubic-bezier(0.4,0,0.2,1),width 0.35s cubic-bezier(0.4,0,0.2,1);pointer-events:none;z-index:0}.si-snp-link{position:relative;z-index:1;padding:8px 20px;font-size:13px;font-weight:500;color:rgba(225,225,225,0.5);cursor:pointer;border:none;background:none;border-radius:9999px;transition:color 0.25s;white-space:nowrap;font-family:inherit}.si-snp-link.active{color:#fff}.si-snp-link:hover{color:rgba(225,225,225,0.85)}</style><div class="si-snp" id="siSnpWrap"><div class="si-snp-pill" id="siSnpPill"></div><button class="si-snp-link active" data-idx="0">Overview</button><button class="si-snp-link" data-idx="1">Features</button><button class="si-snp-link" data-idx="2">Pricing</button><button class="si-snp-link" data-idx="3">Docs</button></div><script>(function(){var w=document.getElementById("siSnpWrap"),p=document.getElementById("siSnpPill"),bs=w.querySelectorAll(".si-snp-link");function mv(i){var b=bs[i];p.style.width=b.offsetWidth+"px";p.style.transform="translateX("+b.offsetLeft+"px) translateX(-4px)";bs.forEach(function(x){x.classList.remove("active")});b.classList.add("active")}bs.forEach(function(b,i){b.addEventListener("click",function(){mv(i)})});mv(0)})()</script>' },
    },
  },
  {
    id: 'comp-code-block',
    label: 'Styled Code Block',
    category: 'components', subcategory: 'site-inspired',
    tags: ['code', 'syntax', 'resend', 'developer', 'terminal', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Styled Code Block',
      defaultStyle: { width: '100%', maxWidth: '560px', minHeight: '200px' },
      defaultContent: { html: '<style>.si-cb{background:#0a0a0a;border:1px solid rgba(255,255,255,0.06);border-radius:12px;overflow:hidden;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}.si-cb-bar{display:flex;align-items:center;gap:6px;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06)}.si-cb-dot{width:10px;height:10px;border-radius:50%}.si-cb-dot.r{background:#FF5F57}.si-cb-dot.y{background:#FEBC2E}.si-cb-dot.g{background:#28C840}.si-cb-pre{margin:0;padding:16px;overflow-x:auto;font-size:13px;line-height:1.7}.si-cb-ln{display:inline-block;width:28px;text-align:right;margin-right:16px;color:rgba(255,255,255,0.2);user-select:none}.si-cb-kw{color:#6CB6FF}.si-cb-str{color:#7EE787}.si-cb-val{color:#FFA657}.si-cb-txt{color:rgba(255,255,255,0.85)}.si-cb-cm{color:rgba(255,255,255,0.3);font-style:italic}</style><div class="si-cb"><div class="si-cb-bar"><span class="si-cb-dot r"></span><span class="si-cb-dot y"></span><span class="si-cb-dot g"></span></div><pre class="si-cb-pre"><span class="si-cb-ln">1</span><span class="si-cb-kw">const</span> <span class="si-cb-txt">response</span> <span class="si-cb-kw">=</span> <span class="si-cb-kw">await</span> <span class="si-cb-txt">fetch(</span><span class="si-cb-str">\'/api/send\'</span><span class="si-cb-txt">, {</span>\n<span class="si-cb-ln">2</span>  <span class="si-cb-txt">method:</span> <span class="si-cb-str">\'POST\'</span><span class="si-cb-txt">,</span>\n<span class="si-cb-ln">3</span>  <span class="si-cb-txt">headers: {</span> <span class="si-cb-str">\'Content-Type\'</span><span class="si-cb-txt">:</span> <span class="si-cb-str">\'application/json\'</span> <span class="si-cb-txt">},</span>\n<span class="si-cb-ln">4</span>  <span class="si-cb-txt">body: JSON.stringify({</span>\n<span class="si-cb-ln">5</span>    <span class="si-cb-txt">to:</span> <span class="si-cb-str">\'client@example.com\'</span><span class="si-cb-txt">,</span> <span class="si-cb-txt">subject:</span> <span class="si-cb-str">\'Welcome\'</span>\n<span class="si-cb-ln">6</span>  <span class="si-cb-txt">})</span>\n<span class="si-cb-ln">7</span><span class="si-cb-txt">})</span></pre></div>' },
    },
  },
  {
    id: 'comp-api-demo',
    label: 'API Demo Simulation',
    category: 'components', subcategory: 'site-inspired',
    tags: ['api', 'demo', 'interactive', 'developer', 'request', 'response'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'API Demo',
      defaultStyle: { width: '100%', maxWidth: '520px', minHeight: '280px' },
      defaultContent: { html: '<style>.si-api{background:#0a0a0a;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:24px;font-family:system-ui,-apple-system,sans-serif}.si-api-url{display:flex;align-items:center;gap:8px;margin-bottom:16px}.si-api-method{background:rgba(126,231,135,0.12);color:#7EE787;font-size:11px;font-weight:700;padding:4px 8px;border-radius:4px;font-family:ui-monospace,monospace}.si-api-path{font-family:ui-monospace,monospace;font-size:13px;color:rgba(255,255,255,0.6)}.si-api-btn{display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:#fff;color:#0a0a0a;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;transition:opacity 0.2s;font-family:inherit}.si-api-btn:hover{opacity:0.85}.si-api-btn:disabled{opacity:0.5;cursor:not-allowed}.si-api-spin{width:14px;height:14px;border:2px solid rgba(0,0,0,0.15);border-top-color:#0a0a0a;border-radius:50%;animation:siSpin 0.6s linear infinite;display:none}@keyframes siSpin{to{transform:rotate(360deg)}}.si-api-res{margin-top:16px;padding:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;font-family:ui-monospace,monospace;font-size:12.5px;line-height:1.6;color:rgba(255,255,255,0.8);opacity:0;transform:translateY(6px);transition:opacity 0.4s,transform 0.4s;white-space:pre}.si-api-res.show{opacity:1;transform:translateY(0)}.si-api-ok{color:#7EE787}.si-api-key{color:#6CB6FF}</style><div class="si-api"><div class="si-api-url"><span class="si-api-method">GET</span><span class="si-api-path">/api/v1/users/me</span></div><button class="si-api-btn" id="siApiBtn"><span class="si-api-spin" id="siApiSpin"></span><span id="siApiBtnTxt">Send Request</span></button><div class="si-api-res" id="siApiRes">{\n  <span class="si-api-key">"status"</span>: <span class="si-api-ok">200</span>,\n  <span class="si-api-key">"data"</span>: {\n    <span class="si-api-key">"id"</span>: <span class="si-api-ok">"usr_8xK2mP"</span>,\n    <span class="si-api-key">"name"</span>: <span class="si-api-ok">"Jean Dupont"</span>,\n    <span class="si-api-key">"plan"</span>: <span class="si-api-ok">"premium"</span>\n  }\n}</div></div><script>(function(){var btn=document.getElementById("siApiBtn"),sp=document.getElementById("siApiSpin"),txt=document.getElementById("siApiBtnTxt"),res=document.getElementById("siApiRes");btn.addEventListener("click",function(){btn.disabled=true;sp.style.display="inline-block";txt.textContent="Sending...";res.classList.remove("show");setTimeout(function(){sp.style.display="none";txt.textContent="Send Request";btn.disabled=false;res.classList.add("show")},1200)})})()</script>' },
    },
  },
  {
    id: 'comp-1px-gap-grid',
    label: '1px Gap Grid',
    category: 'components', subcategory: 'site-inspired',
    tags: ['grid', 'gap', 'linear', 'resend', 'cards', 'features', 'border-trick'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: '1px Gap Grid',
      defaultStyle: { width: '100%', maxWidth: '720px', minHeight: '300px' },
      defaultContent: { html: '<style>.si-gapg{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.06);border-radius:12px;overflow:hidden}.si-gapg-card{background:#0a0a0a;padding:28px 24px;display:flex;flex-direction:column;gap:10px}.si-gapg-icon{width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center}.si-gapg-icon svg{width:18px;height:18px;stroke:rgba(255,255,255,0.5);fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}.si-gapg-t{font-size:14px;font-weight:600;color:#fff;font-family:system-ui,sans-serif}.si-gapg-d{font-size:13px;color:rgba(255,255,255,0.4);line-height:1.5;font-family:system-ui,sans-serif}</style><div class="si-gapg"><div class="si-gapg-card"><div class="si-gapg-icon"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div><div class="si-gapg-t">Lightning Fast</div><div class="si-gapg-d">Sub-50ms response times globally distributed.</div></div><div class="si-gapg-card"><div class="si-gapg-icon"><svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div><div class="si-gapg-t">Secure by Default</div><div class="si-gapg-d">End-to-end encryption with zero-trust architecture.</div></div><div class="si-gapg-card"><div class="si-gapg-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></div><div class="si-gapg-t">Global Scale</div><div class="si-gapg-d">Deploy across 30+ regions with one click.</div></div><div class="si-gapg-card"><div class="si-gapg-icon"><svg viewBox="0 0 24 24"><path d="M12 20V10M18 20V4M6 20v-4"/></svg></div><div class="si-gapg-t">Real-time Analytics</div><div class="si-gapg-d">Monitor every metric with live dashboards.</div></div><div class="si-gapg-card"><div class="si-gapg-icon"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg></div><div class="si-gapg-t">Team Collaboration</div><div class="si-gapg-d">Built-in roles, permissions and audit logs.</div></div><div class="si-gapg-card"><div class="si-gapg-icon"><svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div><div class="si-gapg-t">Developer First</div><div class="si-gapg-d">SDKs, webhooks and a complete REST API.</div></div></div>' },
    },
  },
  {
    id: 'comp-download-fill-btn',
    label: 'Download Fill Button',
    category: 'components', subcategory: 'site-inspired',
    tags: ['button', 'download', 'hover', 'fill', 'animation', 'gradient', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Download Fill Button',
      defaultStyle: { width: 'auto', minHeight: '48px', display: 'inline-block' },
      defaultContent: { html: '<style>.si-dfb{position:relative;display:inline-flex;align-items:center;gap:8px;padding:14px 28px;font-size:14px;font-weight:600;color:#fff;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;cursor:pointer;overflow:hidden;transition:color 0.4s,border-color 0.4s;font-family:system-ui,sans-serif;text-decoration:none}.si-dfb::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,#6366F1,#8B5CF6);transform:scaleX(0);transform-origin:left;transition:transform 0.45s cubic-bezier(0.4,0,0.2,1);z-index:0}.si-dfb:hover::before{transform:scaleX(1)}.si-dfb:hover{border-color:transparent}.si-dfb-txt,.si-dfb-ico{position:relative;z-index:1}.si-dfb-ico{width:16px;height:16px;transition:transform 0.3s}.si-dfb:hover .si-dfb-ico{transform:translateY(2px)}</style><a class="si-dfb" href="#"><span class="si-dfb-txt">Download</span><svg class="si-dfb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></a>' },
    },
  },
  {
    id: 'comp-layered-shadow-card',
    label: 'Layered Shadow Card',
    category: 'components', subcategory: 'site-inspired',
    tags: ['card', 'shadow', 'arc', 'depth', 'elevation', 'premium'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Layered Shadow Card',
      defaultStyle: { width: '100%', maxWidth: '380px', minHeight: '220px' },
      defaultContent: { html: '<style>.si-lsc-wrap{padding:40px;display:flex;justify-content:center}.si-lsc{background:#fff;border-radius:16px;padding:32px;box-shadow:0 1px 2px rgba(0,0,0,0.04),0 4px 8px rgba(0,0,0,0.04),0 12px 24px rgba(0,0,0,0.06),0 24px 48px rgba(0,0,0,0.08);transition:box-shadow 0.4s ease,transform 0.4s ease;cursor:default}.si-lsc:hover{transform:translateY(-2px);box-shadow:0 1px 2px rgba(0,0,0,0.06),0 6px 12px rgba(0,0,0,0.06),0 16px 32px rgba(0,0,0,0.08),0 32px 64px rgba(0,0,0,0.1)}.si-lsc-badge{display:inline-block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#6366F1;background:rgba(99,102,241,0.08);padding:4px 10px;border-radius:6px;margin-bottom:16px;font-family:system-ui,sans-serif}.si-lsc-t{font-size:20px;font-weight:700;color:#111;margin:0 0 8px;font-family:system-ui,sans-serif}.si-lsc-d{font-size:14px;color:#666;line-height:1.6;margin:0;font-family:system-ui,sans-serif}</style><div class="si-lsc-wrap"><div class="si-lsc"><span class="si-lsc-badge">New Feature</span><h3 class="si-lsc-t">Realistic Depth</h3><p class="si-lsc-d">A card with four layers of shadow creating natural, realistic depth perception inspired by Arc browser.</p></div></div>' },
    },
  },
  {
    id: 'comp-frosted-navbar',
    label: 'Frosted Glass Navbar',
    category: 'components', subcategory: 'site-inspired',
    tags: ['navbar', 'glass', 'frosted', 'blur', 'backdrop', 'transparent', 'apple'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Frosted Glass Navbar',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: { html: '<style>.si-fn-bg{background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);min-height:200px;display:flex;flex-direction:column;border-radius:12px;overflow:hidden;position:relative}.si-fn{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:14px 28px;background:rgba(255,255,255,0.08);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border-bottom:1px solid rgba(255,255,255,0.08)}.si-fn-logo{font-size:15px;font-weight:700;color:#fff;letter-spacing:-0.02em;font-family:system-ui,sans-serif}.si-fn-links{display:flex;align-items:center;gap:24px}.si-fn-a{font-size:13px;font-weight:500;color:rgba(255,255,255,0.6);text-decoration:none;transition:color 0.25s;cursor:pointer;font-family:system-ui,sans-serif}.si-fn-a:hover{color:#fff}.si-fn-cta{font-size:12px;font-weight:600;color:#fff;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.15);padding:8px 18px;border-radius:8px;cursor:pointer;transition:background 0.25s;font-family:system-ui,sans-serif}.si-fn-cta:hover{background:rgba(255,255,255,0.2)}.si-fn-body{flex:1;display:flex;align-items:center;justify-content:center;padding:32px;color:rgba(255,255,255,0.15);font-size:14px;font-family:system-ui,sans-serif}</style><div class="si-fn-bg"><nav class="si-fn"><span class="si-fn-logo">Studio</span><div class="si-fn-links"><a class="si-fn-a">Products</a><a class="si-fn-a">Solutions</a><a class="si-fn-a">Pricing</a><a class="si-fn-a">Docs</a><a class="si-fn-a">Blog</a></div><button class="si-fn-cta">Get Started</button></nav><div class="si-fn-body">Scroll content area &mdash; glass effect visible above</div></div>' },
    },
  },
  {
    id: 'comp-serif-hero-heading',
    label: 'Luxury Serif Hero',
    category: 'components', subcategory: 'site-inspired',
    tags: ['hero', 'serif', 'luxury', 'aman', 'heading', 'typography', 'elegant'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Luxury Serif Hero',
      defaultStyle: { width: '100%', maxWidth: '720px', minHeight: '320px' },
      defaultContent: { html: '<style>.si-sh-wrap{background:#1A1A1A;padding:80px 40px;text-align:center;border-radius:12px;display:flex;flex-direction:column;align-items:center;gap:24px}.si-sh-h{font-family:Georgia,"Cormorant Garamond","Times New Roman",serif;font-weight:300;font-size:clamp(32px,5vw,56px);text-transform:uppercase;letter-spacing:0.08em;color:#F2EDE7;margin:0;line-height:1.15}.si-sh-sub{font-family:system-ui,-apple-system,sans-serif;font-size:15px;font-weight:400;color:rgba(242,237,231,0.45);max-width:480px;line-height:1.7;margin:0}.si-sh-cta{display:inline-block;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.15em;color:#C5A572;border-bottom:1px solid #C5A572;padding-bottom:4px;text-decoration:none;cursor:pointer;transition:color 0.4s,border-color 0.4s;margin-top:8px;background:none;border-top:none;border-left:none;border-right:none;font-family:system-ui,sans-serif}.si-sh-cta:hover{color:#fff;border-bottom-color:#fff}</style><div class="si-sh-wrap"><h1 class="si-sh-h">The Art of<br/>Timeless Luxury</h1><p class="si-sh-sub">An experience crafted with meticulous attention to detail, where every element speaks to a legacy of uncompromising excellence.</p><a class="si-sh-cta" href="#">Explore the Collection</a></div>' },
    },
  },
  {
    id: 'comp-floating-fragments',
    label: 'Floating UI Fragments',
    category: 'components', subcategory: 'site-inspired',
    tags: ['floating', 'fragments', 'arc', 'animation', 'ui', 'oscillate', 'decorative'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Floating UI Fragments',
      defaultStyle: { width: '100%', maxWidth: '600px', minHeight: '280px' },
      defaultContent: { html: '<style>.si-ff-wrap{background:#0a0a0a;border-radius:12px;min-height:280px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}.si-ff-item{position:absolute;animation:siFloat var(--dur,3s) ease-in-out infinite;animation-delay:var(--del,0s)}@keyframes siFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(var(--dist,-8px))}}.si-ff-pill{padding:8px 16px;font-size:12px;font-weight:600;color:#fff;background:linear-gradient(135deg,#6366F1,#8B5CF6);border-radius:99px;white-space:nowrap;box-shadow:0 4px 16px rgba(99,102,241,0.3);font-family:system-ui,sans-serif}.si-ff-badge{display:flex;align-items:center;gap:6px;padding:6px 14px;font-size:11px;font-weight:600;color:#7EE787;background:rgba(126,231,135,0.1);border:1px solid rgba(126,231,135,0.2);border-radius:8px;white-space:nowrap;font-family:system-ui,sans-serif}.si-ff-badge-dot{width:6px;height:6px;border-radius:50%;background:#7EE787}.si-ff-toggle{width:40px;height:22px;border-radius:11px;background:#6366F1;position:relative;box-shadow:0 2px 8px rgba(99,102,241,0.3)}.si-ff-toggle::after{content:"";position:absolute;top:3px;left:21px;width:16px;height:16px;border-radius:50%;background:#fff}.si-ff-icon-box{width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center}.si-ff-icon-box svg{width:20px;height:20px;stroke:rgba(255,255,255,0.5);fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}.si-ff-label{font-size:13px;color:rgba(255,255,255,0.2);font-family:system-ui,sans-serif;letter-spacing:0.05em}</style><div class="si-ff-wrap"><span class="si-ff-label">Floating UI fragments</span><div class="si-ff-item" style="top:20%;left:12%;--dur:3.2s;--del:0s;--dist:-8px"><span class="si-ff-pill">Get Started</span></div><div class="si-ff-item" style="top:55%;right:10%;--dur:3.8s;--del:0.6s;--dist:-10px"><span class="si-ff-badge"><span class="si-ff-badge-dot"></span>Active</span></div><div class="si-ff-item" style="top:25%;right:18%;--dur:3s;--del:1.2s;--dist:-6px"><div class="si-ff-toggle"></div></div><div class="si-ff-item" style="bottom:18%;left:22%;--dur:3.5s;--del:0.3s;--dist:-9px"><div class="si-ff-icon-box"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div></div></div>' },
    },
  },
]

export const LIBRARY_COMPONENTS: LibraryElementItem[] = [
  ...BUTTONS,
  ...BADGES,
  ...CARDS,
  ...NAVBARS,
  ...FOOTERS,
  ...MISC_UI,
  ...LAYOUTS,
  ...BLOCKS,
  ...ECOMMERCE,
  ...SECTION_SPECIFIC,
  ...INTERACTIVE_UI,
  ...INTERACTIVE_PREMIUM,
  ...CONTENT_PREMIUM,
  ...SITE_INSPIRED,
]
