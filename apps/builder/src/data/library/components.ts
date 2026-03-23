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

// ─── NAVBARS — Full Premium (custom-embed, 10 presets) ───

const NAVBARS_FULL: LibraryElementItem[] = [
  {
    id: 'comp-navbar-minimal',
    label: 'Navbar Minimal',
    category: 'components',
    subcategory: 'navbars',
    tags: ['navbar', 'minimal', 'dark', 'clean', 'navigation'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Navbar Minimal',
      defaultStyle: { width: '100%', minHeight: '64px' },
      defaultContent: {
        html: `<style>.nb-min{display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:64px;background:#0a0a0a;font-family:system-ui,-apple-system,sans-serif}.nb-min-logo{font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.03em}.nb-min-links{display:flex;gap:32px}.nb-min-a{font-size:14px;font-weight:450;color:rgba(255,255,255,0.6);text-decoration:none;cursor:pointer;transition:opacity 0.3s}.nb-min-a:hover{opacity:1;color:#fff}.nb-min-cta{font-size:13px;font-weight:600;color:#0a0a0a;background:#fff;padding:8px 20px;border-radius:6px;border:none;cursor:pointer;transition:background 0.3s;font-family:inherit}.nb-min-cta:hover{background:rgba(255,255,255,0.85)}</style><nav class="nb-min"><span class="nb-min-logo">Brand</span><div class="nb-min-links"><a class="nb-min-a">Work</a><a class="nb-min-a">Services</a><a class="nb-min-a">About</a><a class="nb-min-a">Contact</a></div><button class="nb-min-cta">Get Started</button></nav>`
      }
    }
  },
  {
    id: 'comp-navbar-transparent',
    label: 'Navbar Transparent',
    category: 'components',
    subcategory: 'navbars',
    tags: ['navbar', 'transparent', 'overlay', 'hero', 'navigation'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Navbar Transparent',
      defaultStyle: { width: '100%', minHeight: '280px' },
      defaultContent: {
        html: `<style>.nb-tr-wrap{position:relative;min-height:280px;background:linear-gradient(135deg,#1a1a2e,#16213e);border-radius:12px;overflow:hidden}.nb-tr{position:absolute;top:0;left:0;right:0;display:flex;align-items:center;justify-content:space-between;padding:20px 40px;z-index:2}.nb-tr-logo{font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.03em;font-family:system-ui,sans-serif}.nb-tr-links{display:flex;gap:28px}.nb-tr-a{font-size:14px;font-weight:450;color:rgba(255,255,255,0.7);text-decoration:none;cursor:pointer;position:relative;font-family:system-ui,sans-serif;transition:color 0.3s}.nb-tr-a::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:#fff;transition:width 0.3s}.nb-tr-a:hover{color:#fff}.nb-tr-a:hover::after{width:100%}.nb-tr-cta{font-size:13px;font-weight:600;color:#fff;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);padding:8px 20px;border-radius:6px;cursor:pointer;transition:background 0.3s;font-family:system-ui,sans-serif}.nb-tr-cta:hover{background:rgba(255,255,255,0.2)}.nb-tr-hero{display:flex;align-items:center;justify-content:center;height:100%;color:rgba(255,255,255,0.15);font-size:14px;font-family:system-ui,sans-serif}</style><div class="nb-tr-wrap"><nav class="nb-tr"><span class="nb-tr-logo">Studio</span><div class="nb-tr-links"><a class="nb-tr-a">Work</a><a class="nb-tr-a">About</a><a class="nb-tr-a">Services</a><a class="nb-tr-a">Contact</a></div><button class="nb-tr-cta">Let's Talk</button></nav><div class="nb-tr-hero">Hero content area</div></div>`
      }
    }
  },
  {
    id: 'comp-navbar-bordered',
    label: 'Navbar Bordered',
    category: 'components',
    subcategory: 'navbars',
    tags: ['navbar', 'bordered', 'clean', 'corporate', 'light', 'navigation'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Navbar Bordered',
      defaultStyle: { width: '100%', minHeight: '64px' },
      defaultContent: {
        html: `<style>.nb-brd{display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:64px;background:#fff;border-bottom:1px solid #e5e5e5;font-family:system-ui,-apple-system,sans-serif}.nb-brd-logo{font-size:18px;font-weight:700;color:#0a0a0a;letter-spacing:-0.03em}.nb-brd-links{display:flex;gap:28px}.nb-brd-a{font-size:14px;font-weight:450;color:#666;text-decoration:none;cursor:pointer;transition:color 0.3s}.nb-brd-a:hover{color:#0a0a0a}.nb-brd-avatar{width:34px;height:34px;border-radius:50%;background:#e5e5e5;display:flex;align-items:center;justify-content:center;cursor:pointer}.nb-brd-avatar svg{width:16px;height:16px;stroke:#666;fill:none;stroke-width:2;stroke-linecap:round}</style><nav class="nb-brd"><span class="nb-brd-logo">Company</span><div class="nb-brd-links"><a class="nb-brd-a">Products</a><a class="nb-brd-a">Solutions</a><a class="nb-brd-a">Pricing</a><a class="nb-brd-a">Resources</a></div><div class="nb-brd-avatar"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0112 0v1"/></svg></div></nav>`
      }
    }
  },
  {
    id: 'comp-navbar-centered',
    label: 'Navbar Centered',
    category: 'components',
    subcategory: 'navbars',
    tags: ['navbar', 'centered', 'luxury', 'serif', 'elegant', 'navigation'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Navbar Centered',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: {
        html: `<style>.nb-cen{display:flex;flex-direction:column;align-items:center;padding:24px 40px 0;background:#0a0a0a;gap:16px}.nb-cen-logo{font-family:Georgia,"Cormorant Garamond",serif;font-size:26px;font-weight:400;color:#f2ede7;letter-spacing:0.08em;text-transform:uppercase}.nb-cen-links{display:flex;gap:36px;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.08)}.nb-cen-a{font-size:12px;font-weight:500;color:rgba(255,255,255,0.45);text-decoration:none;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;font-family:system-ui,sans-serif;transition:color 0.3s}.nb-cen-a:hover{color:#C5A572}</style><nav class="nb-cen"><span class="nb-cen-logo">Maison</span><div class="nb-cen-links"><a class="nb-cen-a">Collection</a><a class="nb-cen-a">Atelier</a><a class="nb-cen-a">Story</a><a class="nb-cen-a">Journal</a><a class="nb-cen-a">Contact</a></div></nav>`
      }
    }
  },
  {
    id: 'comp-navbar-split',
    label: 'Navbar Split',
    category: 'components',
    subcategory: 'navbars',
    tags: ['navbar', 'split', 'balanced', 'dark', 'navigation'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Navbar Split',
      defaultStyle: { width: '100%', minHeight: '64px' },
      defaultContent: {
        html: `<style>.nb-spl{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 40px;height:64px;background:#0a0a0a;font-family:system-ui,-apple-system,sans-serif}.nb-spl-links{display:flex;gap:28px}.nb-spl-a{font-size:14px;font-weight:450;color:rgba(255,255,255,0.55);text-decoration:none;cursor:pointer;transition:color 0.3s}.nb-spl-a:hover{color:#fff}.nb-spl-logo{font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.03em;text-align:center}.nb-spl-right{display:flex;justify-content:flex-end}.nb-spl-cta{font-size:13px;font-weight:600;color:#0a0a0a;background:#fff;padding:8px 22px;border-radius:6px;border:none;cursor:pointer;transition:background 0.3s;font-family:inherit}.nb-spl-cta:hover{background:rgba(255,255,255,0.85)}</style><nav class="nb-spl"><div class="nb-spl-links"><a class="nb-spl-a">Work</a><a class="nb-spl-a">About</a><a class="nb-spl-a">Blog</a></div><span class="nb-spl-logo">Brand</span><div class="nb-spl-right"><button class="nb-spl-cta">Contact</button></div></nav>`
      }
    }
  },
  {
    id: 'comp-navbar-pill',
    label: 'Navbar Pill',
    category: 'components',
    subcategory: 'navbars',
    tags: ['navbar', 'pill', 'floating', 'blur', 'modern', 'navigation'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Navbar Pill',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: {
        html: `<style>.nb-pill-wrap{display:flex;justify-content:center;padding:16px 20px;background:#0a0a0a;min-height:120px;align-items:flex-start;border-radius:12px}.nb-pill{display:flex;align-items:center;gap:32px;padding:10px 12px 10px 24px;background:rgba(255,255,255,0.06);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);border-radius:999px;font-family:system-ui,-apple-system,sans-serif}.nb-pill-logo{font-size:15px;font-weight:700;color:#fff;letter-spacing:-0.02em}.nb-pill-links{display:flex;gap:24px}.nb-pill-a{font-size:13px;font-weight:450;color:rgba(255,255,255,0.55);text-decoration:none;cursor:pointer;transition:color 0.3s}.nb-pill-a:hover{color:#fff}.nb-pill-cta{font-size:12px;font-weight:600;color:#0a0a0a;background:#fff;padding:7px 18px;border-radius:999px;border:none;cursor:pointer;transition:background 0.3s;font-family:inherit}.nb-pill-cta:hover{background:rgba(255,255,255,0.85)}</style><div class="nb-pill-wrap"><nav class="nb-pill"><span class="nb-pill-logo">Brand</span><div class="nb-pill-links"><a class="nb-pill-a">Features</a><a class="nb-pill-a">Pricing</a><a class="nb-pill-a">Docs</a><a class="nb-pill-a">Blog</a></div><button class="nb-pill-cta">Sign Up</button></nav></div>`
      }
    }
  },
  {
    id: 'comp-navbar-sidebar-toggle',
    label: 'Navbar Sidebar Toggle',
    category: 'components',
    subcategory: 'navbars',
    tags: ['navbar', 'hamburger', 'minimal', 'creative', 'agency', 'navigation'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Navbar Sidebar Toggle',
      defaultStyle: { width: '100%', minHeight: '64px' },
      defaultContent: {
        html: `<style>.nb-st{display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:64px;background:#0a0a0a;font-family:system-ui,-apple-system,sans-serif}.nb-st-logo{font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.03em}.nb-st-ham{display:flex;flex-direction:column;gap:5px;cursor:pointer;padding:8px;transition:opacity 0.3s}.nb-st-ham:hover{opacity:0.7}.nb-st-bar{width:24px;height:1.5px;background:#fff;transition:transform 0.3s}.nb-st-ham:hover .nb-st-bar:first-child{transform:translateX(4px)}.nb-st-ham:hover .nb-st-bar:last-child{transform:translateX(-4px)}</style><nav class="nb-st"><span class="nb-st-logo">Atelier</span><div class="nb-st-ham"><span class="nb-st-bar"></span><span class="nb-st-bar"></span><span class="nb-st-bar"></span></div></nav>`
      }
    }
  },
  {
    id: 'comp-navbar-mega',
    label: 'Navbar Mega Menu',
    category: 'components',
    subcategory: 'navbars',
    tags: ['navbar', 'mega', 'dropdown', 'corporate', 'saas', 'navigation'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Navbar Mega Menu',
      defaultStyle: { width: '100%', minHeight: '64px' },
      defaultContent: {
        html: `<style>.nb-mg{display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:64px;background:#0a0a0a;font-family:system-ui,-apple-system,sans-serif;position:relative}.nb-mg-logo{font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.03em}.nb-mg-links{display:flex;gap:28px;align-items:center}.nb-mg-item{position:relative}.nb-mg-a{font-size:14px;font-weight:450;color:rgba(255,255,255,0.6);text-decoration:none;cursor:pointer;transition:color 0.3s;display:flex;align-items:center;gap:4px}.nb-mg-a:hover{color:#fff}.nb-mg-arrow{width:10px;height:10px;stroke:currentColor;fill:none;stroke-width:2}.nb-mg-panel{display:none;position:absolute;top:100%;left:-20px;min-width:420px;background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;margin-top:12px;z-index:10}.nb-mg-item:hover .nb-mg-panel{display:grid;grid-template-columns:1fr 1fr;gap:16px}.nb-mg-col-title{font-size:11px;font-weight:600;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;grid-column:span 2}.nb-mg-sub{font-size:13px;color:rgba(255,255,255,0.6);cursor:pointer;padding:6px 0;transition:color 0.2s}.nb-mg-sub:hover{color:#fff}.nb-mg-cta{font-size:13px;font-weight:600;color:#0a0a0a;background:#fff;padding:8px 20px;border-radius:6px;border:none;cursor:pointer;transition:background 0.3s;font-family:inherit}.nb-mg-cta:hover{background:rgba(255,255,255,0.85)}</style><nav class="nb-mg"><span class="nb-mg-logo">Platform</span><div class="nb-mg-links"><div class="nb-mg-item"><a class="nb-mg-a">Products <svg class="nb-mg-arrow" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></a><div class="nb-mg-panel"><span class="nb-mg-col-title">Products</span><span class="nb-mg-sub">Analytics</span><span class="nb-mg-sub">Automation</span><span class="nb-mg-sub">Integrations</span><span class="nb-mg-sub">API Platform</span><span class="nb-mg-sub">Security</span><span class="nb-mg-sub">Enterprise</span></div></div><div class="nb-mg-item"><a class="nb-mg-a">Solutions</a></div><div class="nb-mg-item"><a class="nb-mg-a">Pricing</a></div><div class="nb-mg-item"><a class="nb-mg-a">Docs</a></div></div><button class="nb-mg-cta">Get Started</button></nav>`
      }
    }
  },
  {
    id: 'comp-navbar-gradient',
    label: 'Navbar Gradient',
    category: 'components',
    subcategory: 'navbars',
    tags: ['navbar', 'gradient', 'modern', 'saas', 'startup', 'navigation'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Navbar Gradient',
      defaultStyle: { width: '100%', minHeight: '64px' },
      defaultContent: {
        html: `<style>.nb-grad{display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:64px;background:linear-gradient(135deg,#7c3aed,#3b82f6);font-family:system-ui,-apple-system,sans-serif}.nb-grad-logo{font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.03em}.nb-grad-links{display:flex;gap:28px}.nb-grad-a{font-size:14px;font-weight:450;color:rgba(255,255,255,0.75);text-decoration:none;cursor:pointer;transition:color 0.3s}.nb-grad-a:hover{color:#fff}.nb-grad-cta{font-size:13px;font-weight:600;color:#7c3aed;background:#fff;padding:8px 22px;border-radius:6px;border:none;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit;box-shadow:0 2px 12px rgba(0,0,0,0.15)}.nb-grad-cta:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(0,0,0,0.2)}</style><nav class="nb-grad"><span class="nb-grad-logo">Launchpad</span><div class="nb-grad-links"><a class="nb-grad-a">Features</a><a class="nb-grad-a">Pricing</a><a class="nb-grad-a">Docs</a><a class="nb-grad-a">Blog</a></div><button class="nb-grad-cta">Start Free</button></nav>`
      }
    }
  },
  {
    id: 'comp-navbar-stacked',
    label: 'Navbar Stacked',
    category: 'components',
    subcategory: 'navbars',
    tags: ['navbar', 'stacked', 'topbar', 'professional', 'business', 'navigation'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Navbar Stacked',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: {
        html: `<style>.nb-stk-top{display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:36px;background:#111;font-family:system-ui,-apple-system,sans-serif;border-bottom:1px solid rgba(255,255,255,0.06)}.nb-stk-info{display:flex;gap:20px}.nb-stk-info-item{font-size:11px;color:rgba(255,255,255,0.45);display:flex;align-items:center;gap:6px}.nb-stk-info-item svg{width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2}.nb-stk-social{display:flex;gap:12px}.nb-stk-social a{color:rgba(255,255,255,0.35);transition:color 0.3s;cursor:pointer;font-size:11px}.nb-stk-social a:hover{color:#fff}.nb-stk-main{display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:64px;background:#0a0a0a;font-family:system-ui,-apple-system,sans-serif}.nb-stk-logo{font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.03em}.nb-stk-links{display:flex;gap:28px}.nb-stk-a{font-size:14px;font-weight:450;color:rgba(255,255,255,0.6);text-decoration:none;cursor:pointer;transition:color 0.3s}.nb-stk-a:hover{color:#fff}.nb-stk-cta{font-size:13px;font-weight:600;color:#0a0a0a;background:#fff;padding:8px 22px;border-radius:6px;border:none;cursor:pointer;transition:background 0.3s;font-family:inherit}.nb-stk-cta:hover{background:rgba(255,255,255,0.85)}</style><div class="nb-stk-top"><div class="nb-stk-info"><span class="nb-stk-info-item"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>+1 (555) 000-0000</span><span class="nb-stk-info-item"><svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>hello@company.com</span></div><div class="nb-stk-social"><a>LinkedIn</a><a>Twitter</a><a>Instagram</a></div></div><nav class="nb-stk-main"><span class="nb-stk-logo">Company</span><div class="nb-stk-links"><a class="nb-stk-a">Home</a><a class="nb-stk-a">Services</a><a class="nb-stk-a">Portfolio</a><a class="nb-stk-a">About</a><a class="nb-stk-a">Contact</a></div><button class="nb-stk-cta">Get a Quote</button></nav>`
      }
    }
  },
]

// ─── FOOTERS — Full Premium (custom-embed, 8 presets) ───

const FOOTERS_FULL: LibraryElementItem[] = [
  {
    id: 'comp-footer-4col',
    label: 'Footer 4 Columns',
    category: 'components',
    subcategory: 'footers',
    tags: ['footer', 'columns', 'dark', 'corporate', 'links'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Footer 4 Columns',
      defaultStyle: { width: '100%', minHeight: '340px' },
      defaultContent: {
        html: `<style>.ft-4c{background:#0a0a0a;padding:64px 40px 0;font-family:system-ui,-apple-system,sans-serif}.ft-4c-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:48px;padding-bottom:48px;border-bottom:1px solid rgba(255,255,255,0.08)}.ft-4c-brand{display:flex;flex-direction:column;gap:16px}.ft-4c-logo{font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.03em}.ft-4c-desc{font-size:14px;line-height:1.7;color:rgba(255,255,255,0.4);max-width:280px}.ft-4c-col{display:flex;flex-direction:column;gap:12px}.ft-4c-title{font-size:12px;font-weight:600;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px}.ft-4c-link{font-size:14px;color:rgba(255,255,255,0.55);text-decoration:none;cursor:pointer;transition:color 0.3s}.ft-4c-link:hover{color:#fff}.ft-4c-bottom{display:flex;justify-content:space-between;align-items:center;padding:24px 0}.ft-4c-copy{font-size:12px;color:rgba(255,255,255,0.25)}.ft-4c-legal{display:flex;gap:20px}.ft-4c-legal a{font-size:12px;color:rgba(255,255,255,0.3);text-decoration:none;cursor:pointer;transition:color 0.3s}.ft-4c-legal a:hover{color:rgba(255,255,255,0.6)}</style><footer class="ft-4c"><div class="ft-4c-grid"><div class="ft-4c-brand"><span class="ft-4c-logo">Brand</span><p class="ft-4c-desc">Crafting premium digital experiences for visionary brands worldwide.</p></div><div class="ft-4c-col"><span class="ft-4c-title">Services</span><a class="ft-4c-link">Web Design</a><a class="ft-4c-link">Development</a><a class="ft-4c-link">Branding</a><a class="ft-4c-link">Strategy</a></div><div class="ft-4c-col"><span class="ft-4c-title">Company</span><a class="ft-4c-link">About</a><a class="ft-4c-link">Careers</a><a class="ft-4c-link">Blog</a><a class="ft-4c-link">Press</a></div><div class="ft-4c-col"><span class="ft-4c-title">Contact</span><a class="ft-4c-link">hello@brand.com</a><a class="ft-4c-link">+1 (555) 000-0000</a><a class="ft-4c-link">New York, NY</a></div></div><div class="ft-4c-bottom"><span class="ft-4c-copy">&copy; 2026 Brand. All rights reserved.</span><div class="ft-4c-legal"><a>Privacy</a><a>Terms</a><a>Cookies</a></div></div></footer>`
      }
    }
  },
  {
    id: 'comp-footer-minimal',
    label: 'Footer Minimal',
    category: 'components',
    subcategory: 'footers',
    tags: ['footer', 'minimal', 'simple', 'clean', 'subtle'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Footer Minimal',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: {
        html: `<style>.ft-mn{display:flex;align-items:center;justify-content:center;gap:24px;padding:20px 40px;background:#0a0a0a;font-family:system-ui,-apple-system,sans-serif;border-top:1px solid rgba(255,255,255,0.06)}.ft-mn-copy{font-size:13px;color:rgba(255,255,255,0.3)}.ft-mn-dot{width:3px;height:3px;border-radius:50%;background:rgba(255,255,255,0.15)}.ft-mn-a{font-size:13px;color:rgba(255,255,255,0.4);text-decoration:none;cursor:pointer;transition:color 0.3s}.ft-mn-a:hover{color:rgba(255,255,255,0.7)}</style><footer class="ft-mn"><span class="ft-mn-copy">&copy; 2026 Brand</span><span class="ft-mn-dot"></span><a class="ft-mn-a">Privacy</a><span class="ft-mn-dot"></span><a class="ft-mn-a">Terms</a></footer>`
      }
    }
  },
  {
    id: 'comp-footer-cta',
    label: 'Footer CTA',
    category: 'components',
    subcategory: 'footers',
    tags: ['footer', 'cta', 'conversion', 'bold', 'contact'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Footer CTA',
      defaultStyle: { width: '100%', minHeight: '360px' },
      defaultContent: {
        html: `<style>.ft-cta{background:#0a0a0a;font-family:system-ui,-apple-system,sans-serif}.ft-cta-hero{display:flex;flex-direction:column;align-items:center;text-align:center;padding:80px 40px 64px;gap:24px;border-bottom:1px solid rgba(255,255,255,0.08)}.ft-cta-h{font-size:clamp(32px,4vw,48px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0;line-height:1.1}.ft-cta-email{font-size:18px;color:rgba(255,255,255,0.45);margin:0}.ft-cta-btn{font-size:14px;font-weight:600;color:#0a0a0a;background:#fff;padding:12px 32px;border-radius:8px;border:none;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit;margin-top:8px}.ft-cta-btn:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(255,255,255,0.15)}.ft-cta-bottom{display:flex;justify-content:space-between;align-items:center;padding:24px 40px}.ft-cta-copy{font-size:12px;color:rgba(255,255,255,0.25)}.ft-cta-links{display:flex;gap:24px}.ft-cta-links a{font-size:12px;color:rgba(255,255,255,0.35);text-decoration:none;cursor:pointer;transition:color 0.3s}.ft-cta-links a:hover{color:rgba(255,255,255,0.6)}</style><footer class="ft-cta"><div class="ft-cta-hero"><h2 class="ft-cta-h">Let's work together</h2><p class="ft-cta-email">hello@brand.com</p><button class="ft-cta-btn">Start a Project</button></div><div class="ft-cta-bottom"><span class="ft-cta-copy">&copy; 2026 Brand</span><div class="ft-cta-links"><a>Twitter</a><a>LinkedIn</a><a>Instagram</a><a>Dribbble</a></div></div></footer>`
      }
    }
  },
  {
    id: 'comp-footer-newsletter',
    label: 'Footer Newsletter',
    category: 'components',
    subcategory: 'footers',
    tags: ['footer', 'newsletter', 'email', 'subscribe', 'social'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Footer Newsletter',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: {
        html: `<style>.ft-nl{background:#0a0a0a;padding:64px 40px 32px;font-family:system-ui,-apple-system,sans-serif;display:flex;flex-direction:column;align-items:center;gap:40px}.ft-nl-top{display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center}.ft-nl-h{font-size:24px;font-weight:700;color:#fff;letter-spacing:-0.02em;margin:0}.ft-nl-p{font-size:14px;color:rgba(255,255,255,0.4);margin:0;max-width:400px;line-height:1.6}.ft-nl-form{display:flex;gap:8px}.ft-nl-input{padding:10px 16px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:14px;width:260px;outline:none;font-family:inherit;transition:border-color 0.3s}.ft-nl-input::placeholder{color:rgba(255,255,255,0.25)}.ft-nl-input:focus{border-color:rgba(255,255,255,0.25)}.ft-nl-btn{font-size:13px;font-weight:600;color:#0a0a0a;background:#fff;padding:10px 24px;border-radius:8px;border:none;cursor:pointer;font-family:inherit;transition:background 0.3s}.ft-nl-btn:hover{background:rgba(255,255,255,0.85)}.ft-nl-social{display:flex;gap:16px}.ft-nl-social a{font-size:13px;color:rgba(255,255,255,0.3);text-decoration:none;cursor:pointer;transition:color 0.3s}.ft-nl-social a:hover{color:#fff}.ft-nl-bottom{display:flex;gap:24px;align-items:center;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);width:100%;justify-content:center}.ft-nl-copy{font-size:12px;color:rgba(255,255,255,0.2)}.ft-nl-link{font-size:12px;color:rgba(255,255,255,0.3);text-decoration:none;cursor:pointer;transition:color 0.3s}.ft-nl-link:hover{color:rgba(255,255,255,0.5)}</style><footer class="ft-nl"><div class="ft-nl-top"><h3 class="ft-nl-h">Stay in the loop</h3><p class="ft-nl-p">Subscribe to our newsletter for the latest updates, insights, and exclusive content.</p><div class="ft-nl-form"><input class="ft-nl-input" type="email" placeholder="your@email.com"/><button class="ft-nl-btn">Subscribe</button></div></div><div class="ft-nl-social"><a>Twitter</a><a>LinkedIn</a><a>Instagram</a><a>YouTube</a></div><div class="ft-nl-bottom"><span class="ft-nl-copy">&copy; 2026 Brand</span><a class="ft-nl-link">Privacy</a><a class="ft-nl-link">Terms</a></div></footer>`
      }
    }
  },
  {
    id: 'comp-footer-split',
    label: 'Footer Split',
    category: 'components',
    subcategory: 'footers',
    tags: ['footer', 'split', 'two-column', 'clean', 'brand'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Footer Split',
      defaultStyle: { width: '100%', minHeight: '280px' },
      defaultContent: {
        html: `<style>.ft-sp{background:#0a0a0a;padding:64px 40px 32px;font-family:system-ui,-apple-system,sans-serif}.ft-sp-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;padding-bottom:48px;border-bottom:1px solid rgba(255,255,255,0.06)}.ft-sp-left{display:flex;flex-direction:column;gap:20px}.ft-sp-logo{font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.03em}.ft-sp-desc{font-size:14px;line-height:1.7;color:rgba(255,255,255,0.4);max-width:320px}.ft-sp-social{display:flex;gap:14px;margin-top:8px}.ft-sp-social a{font-size:13px;color:rgba(255,255,255,0.3);text-decoration:none;cursor:pointer;transition:color 0.3s}.ft-sp-social a:hover{color:#fff}.ft-sp-right{display:grid;grid-template-columns:1fr 1fr;gap:32px}.ft-sp-col{display:flex;flex-direction:column;gap:10px}.ft-sp-title{font-size:12px;font-weight:600;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px}.ft-sp-link{font-size:14px;color:rgba(255,255,255,0.5);text-decoration:none;cursor:pointer;transition:color 0.3s}.ft-sp-link:hover{color:#fff}.ft-sp-bottom{padding:24px 0 0;text-align:center}.ft-sp-copy{font-size:12px;color:rgba(255,255,255,0.2)}</style><footer class="ft-sp"><div class="ft-sp-grid"><div class="ft-sp-left"><span class="ft-sp-logo">Brand</span><p class="ft-sp-desc">We design and build premium digital products for forward-thinking companies.</p><div class="ft-sp-social"><a>Twitter</a><a>LinkedIn</a><a>Dribbble</a></div></div><div class="ft-sp-right"><div class="ft-sp-col"><span class="ft-sp-title">Product</span><a class="ft-sp-link">Features</a><a class="ft-sp-link">Pricing</a><a class="ft-sp-link">Changelog</a><a class="ft-sp-link">Docs</a></div><div class="ft-sp-col"><span class="ft-sp-title">Company</span><a class="ft-sp-link">About</a><a class="ft-sp-link">Blog</a><a class="ft-sp-link">Careers</a><a class="ft-sp-link">Contact</a></div></div></div><div class="ft-sp-bottom"><span class="ft-sp-copy">&copy; 2026 Brand. All rights reserved.</span></div></footer>`
      }
    }
  },
  {
    id: 'comp-footer-luxury',
    label: 'Footer Luxury',
    category: 'components',
    subcategory: 'footers',
    tags: ['footer', 'luxury', 'serif', 'gold', 'elegant', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Footer Luxury',
      defaultStyle: { width: '100%', minHeight: '320px' },
      defaultContent: {
        html: `<style>.ft-lx{background:#0a0a0a;padding:64px 40px 32px;font-family:system-ui,-apple-system,sans-serif}.ft-lx-top{text-align:center;margin-bottom:48px}.ft-lx-logo{font-family:Georgia,"Cormorant Garamond",serif;font-size:28px;font-weight:400;color:#f2ede7;letter-spacing:0.08em;text-transform:uppercase}.ft-lx-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:48px;padding-bottom:48px;border-bottom:1px solid rgba(197,165,114,0.15)}.ft-lx-col{display:flex;flex-direction:column;gap:12px;text-align:center}.ft-lx-title{font-size:11px;font-weight:600;color:#C5A572;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:4px}.ft-lx-link{font-size:14px;color:rgba(242,237,231,0.45);text-decoration:none;cursor:pointer;transition:color 0.4s}.ft-lx-link:hover{color:#C5A572}.ft-lx-bottom{display:flex;justify-content:center;padding:24px 0 0}.ft-lx-copy{font-size:11px;color:rgba(242,237,231,0.2);letter-spacing:0.05em}</style><footer class="ft-lx"><div class="ft-lx-top"><span class="ft-lx-logo">Maison</span></div><div class="ft-lx-grid"><div class="ft-lx-col"><span class="ft-lx-title">Explore</span><a class="ft-lx-link">Collection</a><a class="ft-lx-link">Atelier</a><a class="ft-lx-link">Savoir-faire</a></div><div class="ft-lx-col"><span class="ft-lx-title">Maison</span><a class="ft-lx-link">Our Story</a><a class="ft-lx-link">Heritage</a><a class="ft-lx-link">Journal</a></div><div class="ft-lx-col"><span class="ft-lx-title">Contact</span><a class="ft-lx-link">Appointments</a><a class="ft-lx-link">Boutiques</a><a class="ft-lx-link">Client Care</a></div></div><div class="ft-lx-bottom"><span class="ft-lx-copy">&copy; 2026 Maison. All rights reserved.</span></div></footer>`
      }
    }
  },
  {
    id: 'comp-footer-modern',
    label: 'Footer Modern',
    category: 'components',
    subcategory: 'footers',
    tags: ['footer', 'modern', 'gradient', 'glassmorphic', 'tech'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Footer Modern',
      defaultStyle: { width: '100%', minHeight: '360px' },
      defaultContent: {
        html: `<style>.ft-md{background:#0a0a0a;padding:4px 4px 0;font-family:system-ui,-apple-system,sans-serif;border-radius:12px;overflow:hidden}.ft-md-inner{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:56px 40px 32px;position:relative;overflow:hidden}.ft-md-inner::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(99,102,241,0.5),rgba(139,92,246,0.5),transparent)}.ft-md-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:48px}.ft-md-brand{font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.04em}.ft-md-grid{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:32px}.ft-md-col{display:flex;flex-direction:column;gap:10px}.ft-md-title{font-size:11px;font-weight:600;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px}.ft-md-link{font-size:13px;color:rgba(255,255,255,0.5);text-decoration:none;cursor:pointer;transition:color 0.3s}.ft-md-link:hover{color:#fff}.ft-md-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:32px;margin-top:48px;border-top:1px solid rgba(255,255,255,0.06)}.ft-md-copy{font-size:12px;color:rgba(255,255,255,0.2)}.ft-md-legal{display:flex;gap:20px}.ft-md-legal a{font-size:12px;color:rgba(255,255,255,0.25);text-decoration:none;cursor:pointer;transition:color 0.3s}.ft-md-legal a:hover{color:rgba(255,255,255,0.5)}</style><footer class="ft-md"><div class="ft-md-inner"><div class="ft-md-top"><span class="ft-md-brand">BRAND</span><div class="ft-md-grid"><div class="ft-md-col"><span class="ft-md-title">Product</span><a class="ft-md-link">Features</a><a class="ft-md-link">Integrations</a><a class="ft-md-link">Pricing</a><a class="ft-md-link">Changelog</a></div><div class="ft-md-col"><span class="ft-md-title">Resources</span><a class="ft-md-link">Documentation</a><a class="ft-md-link">API Reference</a><a class="ft-md-link">Guides</a><a class="ft-md-link">Community</a></div><div class="ft-md-col"><span class="ft-md-title">Company</span><a class="ft-md-link">About</a><a class="ft-md-link">Blog</a><a class="ft-md-link">Careers</a><a class="ft-md-link">Press</a></div><div class="ft-md-col"><span class="ft-md-title">Legal</span><a class="ft-md-link">Privacy</a><a class="ft-md-link">Terms</a><a class="ft-md-link">Security</a><a class="ft-md-link">GDPR</a></div></div></div><div class="ft-md-bottom"><span class="ft-md-copy">&copy; 2026 Brand Inc. All rights reserved.</span><div class="ft-md-legal"><a>Status</a><a>Sitemap</a></div></div></div></footer>`
      }
    }
  },
  {
    id: 'comp-footer-simple',
    label: 'Footer Simple',
    category: 'components',
    subcategory: 'footers',
    tags: ['footer', 'simple', 'light', 'centered', 'clean'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Footer Simple',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: {
        html: `<style>.ft-sm{background:#fafafa;padding:48px 40px 32px;font-family:system-ui,-apple-system,sans-serif;display:flex;flex-direction:column;align-items:center;gap:24px;border-top:1px solid #e5e5e5}.ft-sm-logo{font-size:20px;font-weight:700;color:#0a0a0a;letter-spacing:-0.03em}.ft-sm-links{display:flex;gap:28px}.ft-sm-a{font-size:14px;color:#666;text-decoration:none;cursor:pointer;transition:color 0.3s}.ft-sm-a:hover{color:#0a0a0a}.ft-sm-social{display:flex;gap:16px}.ft-sm-social a{width:36px;height:36px;border-radius:50%;background:#e5e5e5;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background 0.3s;text-decoration:none}.ft-sm-social a:hover{background:#d4d4d4}.ft-sm-social svg{width:16px;height:16px;stroke:#666;fill:none;stroke-width:2}.ft-sm-copy{font-size:12px;color:#999}</style><footer class="ft-sm"><span class="ft-sm-logo">Brand</span><div class="ft-sm-links"><a class="ft-sm-a">Home</a><a class="ft-sm-a">About</a><a class="ft-sm-a">Services</a><a class="ft-sm-a">Blog</a><a class="ft-sm-a">Contact</a></div><div class="ft-sm-social"><a><svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg></a><a><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a><a><svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a></div><span class="ft-sm-copy">&copy; 2026 Brand. All rights reserved.</span></footer>`
      }
    }
  },
]

// ─── CTA SECTIONS — Premium (custom-embed, 6 presets) ───

const CTA_SECTIONS: LibraryElementItem[] = [
  {
    id: 'comp-cta-centered',
    label: 'CTA Centered',
    category: 'components',
    subcategory: 'cta',
    tags: ['cta', 'centered', 'dark', 'conversion', 'classic'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'CTA Centered',
      defaultStyle: { width: '100%', minHeight: '320px' },
      defaultContent: {
        html: `<style>.cta-cn{background:#0a0a0a;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 40px;gap:24px;font-family:system-ui,-apple-system,sans-serif;border-radius:12px}.cta-cn-h{font-size:clamp(28px,3.5vw,44px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0;line-height:1.15;max-width:600px}.cta-cn-p{font-size:16px;color:rgba(255,255,255,0.45);margin:0;max-width:480px;line-height:1.7}.cta-cn-btn{font-size:15px;font-weight:600;color:#0a0a0a;background:#fff;padding:14px 36px;border-radius:8px;border:none;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit;margin-top:8px}.cta-cn-btn:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(255,255,255,0.15)}</style><section class="cta-cn"><h2 class="cta-cn-h">Ready to elevate your digital presence?</h2><p class="cta-cn-p">Join hundreds of brands that trust us to deliver exceptional results.</p><button class="cta-cn-btn">Get Started Today</button></section>`
      }
    }
  },
  {
    id: 'comp-cta-split',
    label: 'CTA Split',
    category: 'components',
    subcategory: 'cta',
    tags: ['cta', 'split', 'horizontal', 'accent', 'conversion'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'CTA Split',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: {
        html: `<style>.cta-sp{display:flex;align-items:center;justify-content:space-between;padding:40px 48px;background:#111;border-radius:12px;font-family:system-ui,-apple-system,sans-serif;border:1px solid rgba(255,255,255,0.06)}.cta-sp-left{display:flex;flex-direction:column;gap:8px}.cta-sp-h{font-size:24px;font-weight:700;color:#fff;letter-spacing:-0.02em;margin:0}.cta-sp-p{font-size:14px;color:rgba(255,255,255,0.4);margin:0}.cta-sp-btn{font-size:14px;font-weight:600;color:#0a0a0a;background:#fff;padding:12px 28px;border-radius:8px;border:none;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit;white-space:nowrap}.cta-sp-btn:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(255,255,255,0.15)}</style><section class="cta-sp"><div class="cta-sp-left"><h3 class="cta-sp-h">Start building something great</h3><p class="cta-sp-p">No credit card required. Free 14-day trial.</p></div><button class="cta-sp-btn">Start Free Trial</button></section>`
      }
    }
  },
  {
    id: 'comp-cta-gradient',
    label: 'CTA Gradient',
    category: 'components',
    subcategory: 'cta',
    tags: ['cta', 'gradient', 'modern', 'saas', 'two-buttons'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'CTA Gradient',
      defaultStyle: { width: '100%', minHeight: '320px' },
      defaultContent: {
        html: `<style>.cta-gr{background:linear-gradient(135deg,#7c3aed,#3b82f6);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 40px;gap:24px;font-family:system-ui,-apple-system,sans-serif;border-radius:12px}.cta-gr-h{font-size:clamp(28px,3.5vw,44px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0;line-height:1.15;max-width:600px}.cta-gr-p{font-size:16px;color:rgba(255,255,255,0.7);margin:0;max-width:480px;line-height:1.7}.cta-gr-btns{display:flex;gap:12px;margin-top:8px}.cta-gr-primary{font-size:15px;font-weight:600;color:#7c3aed;background:#fff;padding:14px 32px;border-radius:8px;border:none;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit}.cta-gr-primary:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(0,0,0,0.2)}.cta-gr-ghost{font-size:15px;font-weight:600;color:#fff;background:transparent;padding:14px 32px;border-radius:8px;border:1px solid rgba(255,255,255,0.3);cursor:pointer;transition:background 0.3s,border-color 0.3s;font-family:inherit}.cta-gr-ghost:hover{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.5)}</style><section class="cta-gr"><h2 class="cta-gr-h">Ship faster with our platform</h2><p class="cta-gr-p">Everything you need to build, deploy, and scale your product.</p><div class="cta-gr-btns"><button class="cta-gr-primary">Start Free</button><button class="cta-gr-ghost">Watch Demo</button></div></section>`
      }
    }
  },
  {
    id: 'comp-cta-card',
    label: 'CTA Card',
    category: 'components',
    subcategory: 'cta',
    tags: ['cta', 'card', 'glassmorphic', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'CTA Card',
      defaultStyle: { width: '100%', minHeight: '360px' },
      defaultContent: {
        html: `<style>.cta-cd-wrap{background:#0a0a0a;display:flex;align-items:center;justify-content:center;padding:64px 40px;border-radius:12px;min-height:360px}.cta-cd{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:56px 48px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:24px;max-width:520px;width:100%;font-family:system-ui,-apple-system,sans-serif;position:relative;overflow:hidden}.cta-cd::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)}.cta-cd-badge{font-size:11px;font-weight:600;color:rgba(255,255,255,0.5);background:rgba(255,255,255,0.06);padding:6px 14px;border-radius:99px;text-transform:uppercase;letter-spacing:0.1em}.cta-cd-h{font-size:28px;font-weight:700;color:#fff;letter-spacing:-0.02em;margin:0;line-height:1.2}.cta-cd-p{font-size:15px;color:rgba(255,255,255,0.4);margin:0;line-height:1.7}.cta-cd-btn{font-size:14px;font-weight:600;color:#0a0a0a;background:#fff;padding:12px 32px;border-radius:8px;border:none;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit;margin-top:8px}.cta-cd-btn:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(255,255,255,0.15)}</style><div class="cta-cd-wrap"><div class="cta-cd"><span class="cta-cd-badge">Limited Offer</span><h3 class="cta-cd-h">Get early access today</h3><p class="cta-cd-p">Be among the first to experience the future of digital creation.</p><button class="cta-cd-btn">Join the Waitlist</button></div></div>`
      }
    }
  },
  {
    id: 'comp-cta-banner',
    label: 'CTA Banner',
    category: 'components',
    subcategory: 'cta',
    tags: ['cta', 'banner', 'full-width', 'bold', 'accent'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'CTA Banner',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: {
        html: `<style>.cta-bn{display:flex;align-items:center;justify-content:space-between;padding:24px 40px;background:#fff;font-family:system-ui,-apple-system,sans-serif;border-radius:12px;border:1px solid #e5e5e5}.cta-bn-left{display:flex;align-items:center;gap:16px}.cta-bn-icon{width:40px;height:40px;border-radius:10px;background:#0a0a0a;display:flex;align-items:center;justify-content:center}.cta-bn-icon svg{width:20px;height:20px;stroke:#fff;fill:none;stroke-width:2}.cta-bn-text{display:flex;flex-direction:column;gap:2px}.cta-bn-h{font-size:16px;font-weight:600;color:#0a0a0a;margin:0}.cta-bn-p{font-size:13px;color:#666;margin:0}.cta-bn-btn{font-size:13px;font-weight:600;color:#fff;background:#0a0a0a;padding:10px 24px;border-radius:8px;border:none;cursor:pointer;transition:background 0.3s;font-family:inherit;white-space:nowrap}.cta-bn-btn:hover{background:#222}</style><section class="cta-bn"><div class="cta-bn-left"><div class="cta-bn-icon"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div><div class="cta-bn-text"><h4 class="cta-bn-h">Boost your workflow today</h4><p class="cta-bn-p">Save 20% with our annual plan</p></div></div><button class="cta-bn-btn">Upgrade Now</button></section>`
      }
    }
  },
  {
    id: 'comp-cta-animated',
    label: 'CTA Animated',
    category: 'components',
    subcategory: 'cta',
    tags: ['cta', 'animated', 'gradient', 'blob', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'CTA Animated',
      defaultStyle: { width: '100%', minHeight: '360px' },
      defaultContent: {
        html: `<style>.cta-an{background:#0a0a0a;display:flex;align-items:center;justify-content:center;padding:80px 40px;border-radius:12px;position:relative;overflow:hidden;min-height:360px;font-family:system-ui,-apple-system,sans-serif}.cta-an-blob{position:absolute;width:400px;height:400px;border-radius:50%;filter:blur(80px);opacity:0.3;animation:ctaBlob 8s ease-in-out infinite}.cta-an-b1{background:linear-gradient(135deg,#7c3aed,#3b82f6);top:50%;left:50%;transform:translate(-50%,-50%);animation-name:ctaBlob}.cta-an-b2{background:linear-gradient(135deg,#ec4899,#8b5cf6);top:50%;left:50%;transform:translate(-50%,-50%);animation-name:ctaBlob2;width:300px;height:300px}@keyframes ctaBlob{0%,100%{transform:translate(-50%,-50%) scale(1)}33%{transform:translate(-40%,-60%) scale(1.1)}66%{transform:translate(-60%,-40%) scale(0.9)}}@keyframes ctaBlob2{0%,100%{transform:translate(-50%,-50%) scale(1)}33%{transform:translate(-60%,-40%) scale(0.9)}66%{transform:translate(-40%,-60%) scale(1.1)}}.cta-an-content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;gap:24px}.cta-an-h{font-size:clamp(28px,3.5vw,44px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0;line-height:1.15;max-width:560px}.cta-an-p{font-size:16px;color:rgba(255,255,255,0.5);margin:0;max-width:440px;line-height:1.7}.cta-an-btn{font-size:15px;font-weight:600;color:#0a0a0a;background:#fff;padding:14px 36px;border-radius:8px;border:none;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit;margin-top:8px}.cta-an-btn:hover{transform:translateY(-1px);box-shadow:0 8px 32px rgba(255,255,255,0.15)}</style><section class="cta-an"><div class="cta-an-blob cta-an-b1"></div><div class="cta-an-blob cta-an-b2"></div><div class="cta-an-content"><h2 class="cta-an-h">Transform your ideas into reality</h2><p class="cta-an-p">Start building with the most powerful creative platform available.</p><button class="cta-an-btn">Get Started Free</button></div></section>`
      }
    }
  },
]

// ─── HERO SECTIONS (8 premium presets) ───

const HERO_SECTIONS: LibraryElementItem[] = [
  {
    id: 'comp-hero-centered',
    label: 'Hero Centered',
    category: 'components',
    subcategory: 'heroes',
    tags: ['hero', 'centered', 'saas', 'dark', 'cta', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Hero Centered',
      defaultStyle: { width: '100%', minHeight: '600px' },
      defaultContent: {
        html: `<style>.hero-ctr{background:#0a0a0a;display:flex;align-items:center;justify-content:center;min-height:600px;padding:80px 40px;font-family:system-ui,-apple-system,sans-serif;text-align:center}.hero-ctr-inner{max-width:720px;display:flex;flex-direction:column;align-items:center;gap:24px}.hero-ctr-badge{font-size:12px;font-weight:600;color:#a78bfa;background:rgba(167,139,250,0.1);border:1px solid rgba(167,139,250,0.2);padding:6px 16px;border-radius:100px;letter-spacing:0.05em;text-transform:uppercase}.hero-ctr-h{font-size:48px;font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.1;margin:0}.hero-ctr-p{font-size:18px;color:rgba(255,255,255,0.5);line-height:1.7;margin:0;max-width:540px}.hero-ctr-btns{display:flex;gap:12px;margin-top:8px}.hero-ctr-btn{font-size:15px;font-weight:600;padding:14px 32px;border-radius:8px;border:none;cursor:pointer;font-family:inherit;transition:all 0.3s}.hero-ctr-primary{background:#fff;color:#0a0a0a}.hero-ctr-primary:hover{transform:translateY(-1px);box-shadow:0 8px 32px rgba(255,255,255,0.15)}.hero-ctr-ghost{background:transparent;color:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.15)}.hero-ctr-ghost:hover{border-color:rgba(255,255,255,0.3);color:#fff}</style><section class="hero-ctr"><div class="hero-ctr-inner"><span class="hero-ctr-badge">Now Available</span><h1 class="hero-ctr-h">Build beautiful products faster than ever</h1><p class="hero-ctr-p">The all-in-one platform for designers and developers to create, iterate, and ship stunning experiences.</p><div class="hero-ctr-btns"><button class="hero-ctr-btn hero-ctr-primary">Get Started</button><button class="hero-ctr-btn hero-ctr-ghost">Learn More</button></div></div></section>`
      }
    }
  },
  {
    id: 'comp-hero-split',
    label: 'Hero Split',
    category: 'components',
    subcategory: 'heroes',
    tags: ['hero', 'split', 'image', 'layout', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Hero Split',
      defaultStyle: { width: '100%', minHeight: '560px' },
      defaultContent: {
        html: `<style>.hero-spl{background:#0a0a0a;display:flex;align-items:center;min-height:560px;padding:60px 40px;font-family:system-ui,-apple-system,sans-serif;gap:60px}.hero-spl-text{flex:1;display:flex;flex-direction:column;gap:24px}.hero-spl-tag{font-size:12px;font-weight:600;color:#34d399;letter-spacing:0.08em;text-transform:uppercase;margin:0}.hero-spl-h{font-size:44px;font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.1;margin:0}.hero-spl-p{font-size:16px;color:rgba(255,255,255,0.5);line-height:1.7;margin:0;max-width:440px}.hero-spl-btn{font-size:15px;font-weight:600;color:#0a0a0a;background:#34d399;padding:14px 32px;border-radius:8px;border:none;cursor:pointer;font-family:inherit;width:fit-content;transition:all 0.3s}.hero-spl-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(52,211,153,0.25)}.hero-spl-visual{flex:1;min-height:400px;background:linear-gradient(135deg,#1a1a2e,#16213e,#0f3460);border-radius:16px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}.hero-spl-mock{width:280px;height:200px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;backdrop-filter:blur(10px);display:flex;flex-direction:column;gap:12px;padding:20px}.hero-spl-mock-bar{height:8px;border-radius:4px;background:rgba(255,255,255,0.1)}.hero-spl-mock-bar:first-child{width:60%}.hero-spl-mock-bar:nth-child(2){width:80%}.hero-spl-mock-bar:nth-child(3){width:45%}.hero-spl-mock-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}.hero-spl-mock-card{height:40px;border-radius:6px;background:rgba(255,255,255,0.06)}</style><section class="hero-spl"><div class="hero-spl-text"><p class="hero-spl-tag">Platform</p><h1 class="hero-spl-h">Design, build, and launch in one place</h1><p class="hero-spl-p">Streamline your entire workflow from concept to production with our integrated suite of tools.</p><button class="hero-spl-btn">Start Building</button></div><div class="hero-spl-visual"><div class="hero-spl-mock"><div class="hero-spl-mock-bar"></div><div class="hero-spl-mock-bar"></div><div class="hero-spl-mock-bar"></div><div class="hero-spl-mock-grid"><div class="hero-spl-mock-card"></div><div class="hero-spl-mock-card"></div><div class="hero-spl-mock-card"></div><div class="hero-spl-mock-card"></div></div></div></div></section>`
      }
    }
  },
  {
    id: 'comp-hero-video-bg',
    label: 'Hero Video Background',
    category: 'components',
    subcategory: 'heroes',
    tags: ['hero', 'video', 'fullscreen', 'dark', 'overlay', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Hero Video Background',
      defaultStyle: { width: '100%', minHeight: '600px' },
      defaultContent: {
        html: `<style>.hero-vid{position:relative;min-height:600px;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;overflow:hidden;background:#0a0a0a}.hero-vid-bg{position:absolute;inset:0;background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);background-size:400% 400%;animation:heroVidShift 12s ease-in-out infinite}.hero-vid-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.6) 100%)}@keyframes heroVidShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}.hero-vid-play{position:absolute;width:72px;height:72px;border-radius:50%;background:rgba(255,255,255,0.1);border:2px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.3s;z-index:1;top:50%;left:50%;transform:translate(-50%,-50%);backdrop-filter:blur(8px)}.hero-vid-play:hover{background:rgba(255,255,255,0.2);transform:translate(-50%,-50%) scale(1.05)}.hero-vid-play svg{width:24px;height:24px;fill:#fff;margin-left:3px}.hero-vid-content{position:relative;z-index:2;text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px;padding:40px}.hero-vid-h{font-size:52px;font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.1;margin:0;max-width:680px}.hero-vid-p{font-size:17px;color:rgba(255,255,255,0.6);margin:0;max-width:480px;line-height:1.7}.hero-vid-btn{font-size:15px;font-weight:600;color:#0a0a0a;background:#fff;padding:14px 36px;border-radius:8px;border:none;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px}.hero-vid-btn:hover{transform:translateY(-1px);box-shadow:0 8px 32px rgba(255,255,255,0.15)}</style><section class="hero-vid"><div class="hero-vid-bg"></div><div class="hero-vid-content"><h1 class="hero-vid-h">Cinematic experiences for the web</h1><p class="hero-vid-p">Create immersive, video-first landing pages that captivate your audience from the first frame.</p><button class="hero-vid-btn">Watch Showreel</button></div></section>`
      }
    }
  },
  {
    id: 'comp-hero-minimal',
    label: 'Hero Minimal',
    category: 'components',
    subcategory: 'heroes',
    tags: ['hero', 'minimal', 'editorial', 'clean', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Hero Minimal',
      defaultStyle: { width: '100%', minHeight: '500px' },
      defaultContent: {
        html: `<style>.hero-min{background:#0a0a0a;display:flex;align-items:center;justify-content:center;min-height:500px;padding:80px 40px;font-family:system-ui,-apple-system,sans-serif;text-align:center}.hero-min-inner{display:flex;flex-direction:column;align-items:center;gap:20px}.hero-min-h{font-size:72px;font-weight:700;color:#fff;letter-spacing:-0.04em;line-height:1.05;margin:0;max-width:800px}.hero-min-p{font-size:17px;color:rgba(255,255,255,0.4);margin:0;letter-spacing:0.01em}.hero-min-link{font-size:15px;color:rgba(255,255,255,0.6);text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.2);padding-bottom:2px;transition:all 0.3s;margin-top:12px}.hero-min-link:hover{color:#fff;border-color:rgba(255,255,255,0.5)}</style><section class="hero-min"><div class="hero-min-inner"><h1 class="hero-min-h">Less noise. More craft.</h1><p class="hero-min-p">A design-first approach to digital products.</p><a href="#" class="hero-min-link">Explore the work</a></div></section>`
      }
    }
  },
  {
    id: 'comp-hero-gradient',
    label: 'Hero Gradient',
    category: 'components',
    subcategory: 'heroes',
    tags: ['hero', 'gradient', 'animated', 'colorful', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Hero Gradient',
      defaultStyle: { width: '100%', minHeight: '580px' },
      defaultContent: {
        html: `<style>.hero-grd{min-height:580px;display:flex;align-items:center;justify-content:center;padding:80px 40px;font-family:system-ui,-apple-system,sans-serif;text-align:center;background:linear-gradient(-45deg,#0f0a1a,#1a0533,#0a1628,#0d1f2d);background-size:400% 400%;animation:heroGrdShift 15s ease infinite;position:relative;overflow:hidden}.hero-grd::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle at 30% 50%,rgba(124,58,237,0.15) 0%,transparent 50%),radial-gradient(circle at 70% 50%,rgba(59,130,246,0.1) 0%,transparent 50%),radial-gradient(circle at 50% 80%,rgba(20,184,166,0.1) 0%,transparent 50%);animation:heroGrdOrb 20s linear infinite}@keyframes heroGrdShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}@keyframes heroGrdOrb{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.hero-grd-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:24px;max-width:680px}.hero-grd-h{font-size:48px;font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.1;margin:0;background:linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.7) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.hero-grd-p{font-size:17px;color:rgba(255,255,255,0.5);margin:0;max-width:480px;line-height:1.7}.hero-grd-btn{font-size:15px;font-weight:600;color:#fff;background:linear-gradient(135deg,#7c3aed,#3b82f6);padding:14px 36px;border-radius:8px;border:none;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px}.hero-grd-btn:hover{transform:translateY(-1px);box-shadow:0 8px 32px rgba(124,58,237,0.3)}</style><section class="hero-grd"><div class="hero-grd-inner"><h1 class="hero-grd-h">The future of creative tooling starts here</h1><p class="hero-grd-p">Powered by AI, built for speed. Design systems that adapt to your vision in real time.</p><button class="hero-grd-btn">Start for Free</button></div></section>`
      }
    }
  },
  {
    id: 'comp-hero-image-overlay',
    label: 'Hero Image Overlay',
    category: 'components',
    subcategory: 'heroes',
    tags: ['hero', 'image', 'overlay', 'fullscreen', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Hero Image Overlay',
      defaultStyle: { width: '100%', minHeight: '600px' },
      defaultContent: {
        html: `<style>.hero-img{position:relative;min-height:600px;display:flex;align-items:flex-end;padding:80px 60px;font-family:system-ui,-apple-system,sans-serif;overflow:hidden;background:#0a0a0a}.hero-img-bg{position:absolute;inset:0;background:linear-gradient(145deg,#1a1a2e 0%,#16213e 30%,#0f3460 60%,#1a1a2e 100%);opacity:0.8}.hero-img-overlay{position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0.1) 100%)}.hero-img-noise{position:absolute;inset:0;opacity:0.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}.hero-img-content{position:relative;z-index:1;display:flex;flex-direction:column;gap:16px;max-width:560px}.hero-img-h{font-size:48px;font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.1;margin:0}.hero-img-p{font-size:16px;color:rgba(255,255,255,0.5);margin:0;line-height:1.7}.hero-img-btn{font-size:15px;font-weight:600;color:#0a0a0a;background:#fff;padding:14px 32px;border-radius:8px;border:none;cursor:pointer;font-family:inherit;width:fit-content;transition:all 0.3s;margin-top:8px}.hero-img-btn:hover{transform:translateY(-1px);box-shadow:0 8px 32px rgba(255,255,255,0.15)}</style><section class="hero-img"><div class="hero-img-bg"></div><div class="hero-img-overlay"></div><div class="hero-img-noise"></div><div class="hero-img-content"><h1 class="hero-img-h">Where vision meets execution</h1><p class="hero-img-p">Premium digital experiences crafted with precision and purpose for brands that demand excellence.</p><button class="hero-img-btn">View Portfolio</button></div></section>`
      }
    }
  },
  {
    id: 'comp-hero-cards',
    label: 'Hero Cards',
    category: 'components',
    subcategory: 'heroes',
    tags: ['hero', 'cards', 'showcase', 'product', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Hero Cards',
      defaultStyle: { width: '100%', minHeight: '600px' },
      defaultContent: {
        html: `<style>.hero-cds{background:#0a0a0a;display:flex;flex-direction:column;align-items:center;padding:80px 40px;min-height:600px;font-family:system-ui,-apple-system,sans-serif;gap:48px}.hero-cds-top{text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px;max-width:600px}.hero-cds-h{font-size:44px;font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.1;margin:0}.hero-cds-p{font-size:17px;color:rgba(255,255,255,0.45);margin:0;line-height:1.7}.hero-cds-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;width:100%;max-width:900px}.hero-cds-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:32px 24px;display:flex;flex-direction:column;gap:16px;transition:all 0.4s;cursor:pointer}.hero-cds-card:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.1);transform:translateY(-4px)}.hero-cds-icon{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,rgba(124,58,237,0.15),rgba(59,130,246,0.15));display:flex;align-items:center;justify-content:center}.hero-cds-icon svg{width:22px;height:22px;stroke:#a78bfa;fill:none;stroke-width:1.5}.hero-cds-ch{font-size:17px;font-weight:600;color:#fff;margin:0}.hero-cds-cp{font-size:14px;color:rgba(255,255,255,0.4);margin:0;line-height:1.6}</style><section class="hero-cds"><div class="hero-cds-top"><h1 class="hero-cds-h">Everything you need to scale</h1><p class="hero-cds-p">Three powerful tools designed to work together seamlessly.</p></div><div class="hero-cds-grid"><div class="hero-cds-card"><div class="hero-cds-icon"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div><h3 class="hero-cds-ch">Design System</h3><p class="hero-cds-cp">Build consistent interfaces with a shared component library.</p></div><div class="hero-cds-card"><div class="hero-cds-icon"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div><h3 class="hero-cds-ch">Performance</h3><p class="hero-cds-cp">Optimized builds that ship fast and score 100 on Lighthouse.</p></div><div class="hero-cds-card"><div class="hero-cds-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div><h3 class="hero-cds-ch">Automation</h3><p class="hero-cds-cp">CI/CD pipelines and workflows that handle the boring stuff.</p></div></div></section>`
      }
    }
  },
  {
    id: 'comp-hero-animated-text',
    label: 'Hero Animated Text',
    category: 'components',
    subcategory: 'heroes',
    tags: ['hero', 'animated', 'typing', 'dark', 'interactive', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Hero Animated Text',
      defaultStyle: { width: '100%', minHeight: '560px' },
      defaultContent: {
        html: `<style>.hero-anim{background:#0a0a0a;display:flex;align-items:center;justify-content:center;min-height:560px;padding:80px 40px;font-family:system-ui,-apple-system,sans-serif;text-align:center}.hero-anim-inner{display:flex;flex-direction:column;align-items:center;gap:24px;max-width:700px}.hero-anim-h{font-size:48px;font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.1;margin:0;display:inline}.hero-anim-typed{display:inline;border-right:2px solid #a78bfa;padding-right:4px;animation:heroTypeBlink 1s step-end infinite;color:#a78bfa;font-size:48px;font-weight:700;letter-spacing:-0.03em;line-height:1.1}.hero-anim-wrap{overflow:hidden}@keyframes heroTypeBlink{0%,100%{border-color:#a78bfa}50%{border-color:transparent}}@keyframes heroTypeIn{from{width:0}to{width:100%}}.hero-anim-sub{font-size:17px;color:rgba(255,255,255,0.4);margin:0;max-width:480px;line-height:1.7;opacity:0;animation:heroFadeIn 1s ease 2.5s forwards}@keyframes heroFadeIn{to{opacity:1}}.hero-anim-btn{font-size:15px;font-weight:600;color:#0a0a0a;background:#fff;padding:14px 36px;border-radius:8px;border:none;cursor:pointer;font-family:inherit;transition:all 0.3s;opacity:0;animation:heroFadeIn 1s ease 3s forwards}.hero-anim-btn:hover{transform:translateY(-1px);box-shadow:0 8px 32px rgba(255,255,255,0.15)}</style><section class="hero-anim"><div class="hero-anim-inner"><div><h1 class="hero-anim-h">We craft </h1><span class="hero-anim-typed" id="heroTyped"></span></div><p class="hero-anim-sub">From concept to launch, we build digital experiences that leave a lasting impression.</p><button class="hero-anim-btn">Start a Project</button></div></section><script>(function(){var w=["experiences.","brands.","products.","futures."],el=document.getElementById("heroTyped");if(!el)return;var wi=0,ci=0,del=false,spd=120;function tick(){var word=w[wi];if(!del){el.textContent=word.substring(0,ci+1);ci++;if(ci===word.length){del=true;setTimeout(tick,1800);return}}else{el.textContent=word.substring(0,ci-1);ci--;if(ci===0){del=false;wi=(wi+1)%w.length}}setTimeout(tick,del?60:spd)}tick()})()</script>`
      }
    }
  },
]

// ─── FEATURE SECTIONS (8 premium presets) ───

const FEATURE_SECTIONS: LibraryElementItem[] = [
  {
    id: 'comp-features-3col',
    label: 'Features 3 Column',
    category: 'components',
    subcategory: 'features',
    tags: ['features', 'grid', '3-column', 'icons', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Features 3 Column',
      defaultStyle: { width: '100%', minHeight: '400px' },
      defaultContent: {
        html: `<style>.feat-3c{background:#0a0a0a;padding:80px 40px;font-family:system-ui,-apple-system,sans-serif}.feat-3c-top{text-align:center;margin-bottom:48px}.feat-3c-tag{font-size:12px;font-weight:600;color:#3b82f6;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 12px}.feat-3c-h{font-size:36px;font-weight:700;color:#fff;letter-spacing:-0.02em;margin:0}.feat-3c-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:960px;margin:0 auto}.feat-3c-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:32px;display:flex;flex-direction:column;gap:16px;transition:all 0.3s}.feat-3c-card:hover{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1)}.feat-3c-icon{width:44px;height:44px;border-radius:12px;background:rgba(59,130,246,0.1);display:flex;align-items:center;justify-content:center}.feat-3c-icon svg{width:22px;height:22px;stroke:#3b82f6;fill:none;stroke-width:1.5}.feat-3c-ch{font-size:17px;font-weight:600;color:#fff;margin:0}.feat-3c-cp{font-size:14px;color:rgba(255,255,255,0.45);margin:0;line-height:1.6}</style><section class="feat-3c"><div class="feat-3c-top"><p class="feat-3c-tag">Features</p><h2 class="feat-3c-h">Built for modern teams</h2></div><div class="feat-3c-grid"><div class="feat-3c-card"><div class="feat-3c-icon"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div><h3 class="feat-3c-ch">Lightning Fast</h3><p class="feat-3c-cp">Sub-second load times with edge-first architecture and global CDN distribution.</p></div><div class="feat-3c-card"><div class="feat-3c-icon"><svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div><h3 class="feat-3c-ch">Enterprise Security</h3><p class="feat-3c-cp">SOC 2 Type II compliant with end-to-end encryption and role-based access control.</p></div><div class="feat-3c-card"><div class="feat-3c-icon"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div><h3 class="feat-3c-ch">Team Collaboration</h3><p class="feat-3c-cp">Real-time editing, comments, and version history for seamless teamwork.</p></div></div></section>`
      }
    }
  },
  {
    id: 'comp-features-alternating',
    label: 'Features Alternating',
    category: 'components',
    subcategory: 'features',
    tags: ['features', 'alternating', 'zigzag', 'image', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Features Alternating',
      defaultStyle: { width: '100%', minHeight: '600px' },
      defaultContent: {
        html: `<style>.feat-alt{background:#0a0a0a;padding:80px 40px;font-family:system-ui,-apple-system,sans-serif;display:flex;flex-direction:column;gap:60px;max-width:1000px;margin:0 auto}.feat-alt-row{display:flex;align-items:center;gap:60px}.feat-alt-row:nth-child(2){flex-direction:row-reverse}.feat-alt-text{flex:1;display:flex;flex-direction:column;gap:16px}.feat-alt-tag{font-size:12px;font-weight:600;color:#34d399;letter-spacing:0.08em;text-transform:uppercase;margin:0}.feat-alt-h{font-size:28px;font-weight:700;color:#fff;letter-spacing:-0.02em;line-height:1.2;margin:0}.feat-alt-p{font-size:15px;color:rgba(255,255,255,0.45);line-height:1.7;margin:0}.feat-alt-link{font-size:14px;color:#34d399;text-decoration:none;font-weight:500;transition:opacity 0.3s;margin-top:4px}.feat-alt-link:hover{opacity:0.7}.feat-alt-visual{flex:1;min-height:280px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.feat-alt-mock{width:200px;height:140px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;display:flex;flex-direction:column;padding:16px;gap:8px}.feat-alt-bar{height:6px;border-radius:3px;background:rgba(255,255,255,0.08)}.feat-alt-bar:nth-child(1){width:70%}.feat-alt-bar:nth-child(2){width:50%}.feat-alt-bar:nth-child(3){width:85%}</style><section class="feat-alt"><div class="feat-alt-row"><div class="feat-alt-text"><p class="feat-alt-tag">Analytics</p><h3 class="feat-alt-h">Real-time insights at your fingertips</h3><p class="feat-alt-p">Track performance metrics, user behavior, and conversion funnels with beautiful dashboards that update in real time.</p><a href="#" class="feat-alt-link">Learn more &rarr;</a></div><div class="feat-alt-visual"><div class="feat-alt-mock"><div class="feat-alt-bar"></div><div class="feat-alt-bar"></div><div class="feat-alt-bar"></div></div></div></div><div class="feat-alt-row"><div class="feat-alt-text"><p class="feat-alt-tag">Automation</p><h3 class="feat-alt-h">Set it and forget it workflows</h3><p class="feat-alt-p">Automate repetitive tasks with powerful workflow builders. Connect your tools and let the system handle the rest.</p><a href="#" class="feat-alt-link">Learn more &rarr;</a></div><div class="feat-alt-visual"><div class="feat-alt-mock"><div class="feat-alt-bar"></div><div class="feat-alt-bar"></div><div class="feat-alt-bar"></div></div></div></div></section>`
      }
    }
  },
  {
    id: 'comp-features-icon-list',
    label: 'Features Icon List',
    category: 'components',
    subcategory: 'features',
    tags: ['features', 'list', 'icons', 'compact', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Features Icon List',
      defaultStyle: { width: '100%', minHeight: '400px' },
      defaultContent: {
        html: `<style>.feat-il{background:#0a0a0a;padding:80px 40px;font-family:system-ui,-apple-system,sans-serif;max-width:720px;margin:0 auto}.feat-il-top{margin-bottom:40px}.feat-il-tag{font-size:12px;font-weight:600;color:#f59e0b;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 12px}.feat-il-h{font-size:32px;font-weight:700;color:#fff;letter-spacing:-0.02em;margin:0}.feat-il-list{display:flex;flex-direction:column;gap:24px}.feat-il-item{display:flex;gap:20px;align-items:flex-start;padding:20px;border-radius:12px;transition:background 0.3s}.feat-il-item:hover{background:rgba(255,255,255,0.03)}.feat-il-icon{width:44px;height:44px;min-width:44px;border-radius:10px;background:rgba(245,158,11,0.1);display:flex;align-items:center;justify-content:center}.feat-il-icon svg{width:20px;height:20px;stroke:#f59e0b;fill:none;stroke-width:1.5}.feat-il-body{display:flex;flex-direction:column;gap:4px}.feat-il-ch{font-size:16px;font-weight:600;color:#fff;margin:0}.feat-il-cp{font-size:14px;color:rgba(255,255,255,0.4);margin:0;line-height:1.6}</style><section class="feat-il"><div class="feat-il-top"><p class="feat-il-tag">Why Choose Us</p><h2 class="feat-il-h">Designed for results</h2></div><div class="feat-il-list"><div class="feat-il-item"><div class="feat-il-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="feat-il-body"><h4 class="feat-il-ch">No-code editor</h4><p class="feat-il-cp">Build and customize without writing a single line of code. Intuitive drag-and-drop interface.</p></div></div><div class="feat-il-item"><div class="feat-il-icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><div class="feat-il-body"><h4 class="feat-il-ch">Built-in security</h4><p class="feat-il-cp">SSL certificates, DDoS protection, and automatic backups included at no extra cost.</p></div></div><div class="feat-il-item"><div class="feat-il-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><div class="feat-il-body"><h4 class="feat-il-ch">99.99% uptime</h4><p class="feat-il-cp">Enterprise-grade infrastructure ensures your site is always available when customers need it.</p></div></div><div class="feat-il-item"><div class="feat-il-icon"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><div class="feat-il-body"><h4 class="feat-il-ch">24/7 support</h4><p class="feat-il-cp">Get help anytime with our dedicated support team via live chat, email, or phone.</p></div></div></div></section>`
      }
    }
  },
  {
    id: 'comp-features-bento',
    label: 'Features Bento Grid',
    category: 'components',
    subcategory: 'features',
    tags: ['features', 'bento', 'grid', 'glassmorphism', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Features Bento Grid',
      defaultStyle: { width: '100%', minHeight: '500px' },
      defaultContent: {
        html: `<style>.feat-bn{background:#0a0a0a;padding:80px 40px;font-family:system-ui,-apple-system,sans-serif}.feat-bn-top{text-align:center;margin-bottom:48px}.feat-bn-tag{font-size:12px;font-weight:600;color:#a78bfa;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 12px}.feat-bn-h{font-size:36px;font-weight:700;color:#fff;letter-spacing:-0.02em;margin:0}.feat-bn-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:auto auto;gap:16px;max-width:960px;margin:0 auto}.feat-bn-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:32px;display:flex;flex-direction:column;gap:12px;backdrop-filter:blur(10px);transition:all 0.4s;overflow:hidden;position:relative}.feat-bn-card:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.1);transform:translateY(-2px)}.feat-bn-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)}.feat-bn-lg{grid-column:span 2;grid-row:span 2}.feat-bn-wide{grid-column:span 2}.feat-bn-icon{width:40px;height:40px;border-radius:10px;background:rgba(167,139,250,0.1);display:flex;align-items:center;justify-content:center}.feat-bn-icon svg{width:20px;height:20px;stroke:#a78bfa;fill:none;stroke-width:1.5}.feat-bn-ch{font-size:17px;font-weight:600;color:#fff;margin:0}.feat-bn-cp{font-size:14px;color:rgba(255,255,255,0.4);margin:0;line-height:1.6}.feat-bn-lg .feat-bn-ch{font-size:22px}.feat-bn-lg .feat-bn-cp{font-size:15px}.feat-bn-visual{flex:1;display:flex;align-items:center;justify-content:center;margin-top:16px;min-height:80px}.feat-bn-dots{display:grid;grid-template-columns:repeat(6,8px);gap:6px}.feat-bn-dot{width:8px;height:8px;border-radius:50%;background:rgba(167,139,250,0.2)}.feat-bn-dot:nth-child(3n){background:rgba(167,139,250,0.5)}</style><section class="feat-bn"><div class="feat-bn-top"><p class="feat-bn-tag">Platform</p><h2 class="feat-bn-h">A better way to build</h2></div><div class="feat-bn-grid"><div class="feat-bn-card feat-bn-lg"><div class="feat-bn-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg></div><h3 class="feat-bn-ch">Visual Editor</h3><p class="feat-bn-cp">Design pixel-perfect layouts with our intuitive drag-and-drop editor. No coding required.</p><div class="feat-bn-visual"><div class="feat-bn-dots"><div class="feat-bn-dot"></div><div class="feat-bn-dot"></div><div class="feat-bn-dot"></div><div class="feat-bn-dot"></div><div class="feat-bn-dot"></div><div class="feat-bn-dot"></div><div class="feat-bn-dot"></div><div class="feat-bn-dot"></div><div class="feat-bn-dot"></div><div class="feat-bn-dot"></div><div class="feat-bn-dot"></div><div class="feat-bn-dot"></div></div></div></div><div class="feat-bn-card"><div class="feat-bn-icon"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div><h3 class="feat-bn-ch">Fast Deploys</h3><p class="feat-bn-cp">Ship in seconds with one-click deployment.</p></div><div class="feat-bn-card"><div class="feat-bn-icon"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div><h3 class="feat-bn-ch">Analytics</h3><p class="feat-bn-cp">Real-time metrics and conversion tracking.</p></div><div class="feat-bn-card feat-bn-wide"><div class="feat-bn-icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><h3 class="feat-bn-ch">Enterprise Security & Compliance</h3><p class="feat-bn-cp">SOC 2, GDPR, and HIPAA ready. Your data is encrypted at rest and in transit with automatic backups.</p></div></div></section>`
      }
    }
  },
  {
    id: 'comp-features-tabs',
    label: 'Features Tabs',
    category: 'components',
    subcategory: 'features',
    tags: ['features', 'tabs', 'interactive', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Features Tabs',
      defaultStyle: { width: '100%', minHeight: '480px' },
      defaultContent: {
        html: `<style>.feat-tb{background:#0a0a0a;padding:80px 40px;font-family:system-ui,-apple-system,sans-serif;max-width:800px;margin:0 auto}.feat-tb-top{text-align:center;margin-bottom:40px}.feat-tb-h{font-size:36px;font-weight:700;color:#fff;letter-spacing:-0.02em;margin:0 0 8px}.feat-tb-sub{font-size:16px;color:rgba(255,255,255,0.4);margin:0}.feat-tb-nav{display:flex;gap:4px;background:rgba(255,255,255,0.04);border-radius:12px;padding:4px;margin-bottom:32px}.feat-tb-btn{flex:1;padding:12px 20px;border:none;background:transparent;color:rgba(255,255,255,0.5);font-size:14px;font-weight:500;border-radius:8px;cursor:pointer;transition:all 0.3s;font-family:inherit}.feat-tb-btn.feat-tb-active{background:rgba(255,255,255,0.08);color:#fff}.feat-tb-btn:hover:not(.feat-tb-active){color:rgba(255,255,255,0.7)}.feat-tb-panel{display:none;gap:32px;align-items:center;animation:featTbIn 0.3s ease}.feat-tb-panel.feat-tb-show{display:flex}@keyframes featTbIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.feat-tb-info{flex:1;display:flex;flex-direction:column;gap:16px}.feat-tb-ph{font-size:24px;font-weight:600;color:#fff;margin:0}.feat-tb-pp{font-size:15px;color:rgba(255,255,255,0.45);line-height:1.7;margin:0}.feat-tb-checks{display:flex;flex-direction:column;gap:8px}.feat-tb-check{display:flex;align-items:center;gap:8px;font-size:14px;color:rgba(255,255,255,0.6)}.feat-tb-check svg{width:16px;height:16px;stroke:#34d399;fill:none;stroke-width:2}.feat-tb-visual{flex:1;height:240px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;display:flex;align-items:center;justify-content:center}.feat-tb-chart{display:flex;align-items:flex-end;gap:8px;height:100px}.feat-tb-bar{width:20px;border-radius:4px 4px 0 0;background:linear-gradient(180deg,#3b82f6,rgba(59,130,246,0.3));transition:height 0.4s}.feat-tb-b1{height:40px}.feat-tb-b2{height:70px}.feat-tb-b3{height:55px}.feat-tb-b4{height:90px}.feat-tb-b5{height:65px}</style><section class="feat-tb"><div class="feat-tb-top"><h2 class="feat-tb-h">Powerful features</h2><p class="feat-tb-sub">Everything you need in one platform</p></div><div class="feat-tb-nav"><button class="feat-tb-btn feat-tb-active" onclick="document.querySelectorAll('.feat-tb-panel').forEach(p=>p.classList.remove('feat-tb-show'));document.querySelectorAll('.feat-tb-btn').forEach(b=>b.classList.remove('feat-tb-active'));this.classList.add('feat-tb-active');document.getElementById('feat-tb-0').classList.add('feat-tb-show')">Analytics</button><button class="feat-tb-btn" onclick="document.querySelectorAll('.feat-tb-panel').forEach(p=>p.classList.remove('feat-tb-show'));document.querySelectorAll('.feat-tb-btn').forEach(b=>b.classList.remove('feat-tb-active'));this.classList.add('feat-tb-active');document.getElementById('feat-tb-1').classList.add('feat-tb-show')">Automation</button><button class="feat-tb-btn" onclick="document.querySelectorAll('.feat-tb-panel').forEach(p=>p.classList.remove('feat-tb-show'));document.querySelectorAll('.feat-tb-btn').forEach(b=>b.classList.remove('feat-tb-active'));this.classList.add('feat-tb-active');document.getElementById('feat-tb-2').classList.add('feat-tb-show')">Security</button></div><div id="feat-tb-0" class="feat-tb-panel feat-tb-show"><div class="feat-tb-info"><h3 class="feat-tb-ph">Deep Analytics</h3><p class="feat-tb-pp">Understand your users with real-time dashboards, funnel analysis, and cohort tracking.</p><div class="feat-tb-checks"><div class="feat-tb-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Real-time data</div><div class="feat-tb-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Custom reports</div><div class="feat-tb-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Export to CSV</div></div></div><div class="feat-tb-visual"><div class="feat-tb-chart"><div class="feat-tb-bar feat-tb-b1"></div><div class="feat-tb-bar feat-tb-b2"></div><div class="feat-tb-bar feat-tb-b3"></div><div class="feat-tb-bar feat-tb-b4"></div><div class="feat-tb-bar feat-tb-b5"></div></div></div></div><div id="feat-tb-1" class="feat-tb-panel"><div class="feat-tb-info"><h3 class="feat-tb-ph">Smart Automation</h3><p class="feat-tb-pp">Build workflows that trigger on events, schedule tasks, and connect with 100+ integrations.</p><div class="feat-tb-checks"><div class="feat-tb-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Visual builder</div><div class="feat-tb-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>100+ integrations</div><div class="feat-tb-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Event triggers</div></div></div><div class="feat-tb-visual"><div class="feat-tb-chart"><div class="feat-tb-bar" style="height:80px"></div><div class="feat-tb-bar" style="height:50px"></div><div class="feat-tb-bar" style="height:95px"></div><div class="feat-tb-bar" style="height:60px"></div><div class="feat-tb-bar" style="height:75px"></div></div></div></div><div id="feat-tb-2" class="feat-tb-panel"><div class="feat-tb-info"><h3 class="feat-tb-ph">Enterprise Security</h3><p class="feat-tb-pp">Bank-grade encryption, SSO, audit logs, and compliance certifications you can trust.</p><div class="feat-tb-checks"><div class="feat-tb-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>SOC 2 certified</div><div class="feat-tb-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>SSO & SAML</div><div class="feat-tb-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Audit logs</div></div></div><div class="feat-tb-visual"><div class="feat-tb-chart"><div class="feat-tb-bar" style="height:90px"></div><div class="feat-tb-bar" style="height:85px"></div><div class="feat-tb-bar" style="height:92px"></div><div class="feat-tb-bar" style="height:88px"></div><div class="feat-tb-bar" style="height:95px"></div></div></div></div></section>`
      }
    }
  },
  {
    id: 'comp-features-comparison',
    label: 'Features Comparison',
    category: 'components',
    subcategory: 'features',
    tags: ['features', 'comparison', 'conversion', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Features Comparison',
      defaultStyle: { width: '100%', minHeight: '480px' },
      defaultContent: {
        html: `<style>.feat-cmp{background:#0a0a0a;padding:80px 40px;font-family:system-ui,-apple-system,sans-serif;max-width:800px;margin:0 auto}.feat-cmp-top{text-align:center;margin-bottom:48px}.feat-cmp-h{font-size:36px;font-weight:700;color:#fff;letter-spacing:-0.02em;margin:0 0 8px}.feat-cmp-sub{font-size:16px;color:rgba(255,255,255,0.4);margin:0}.feat-cmp-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}.feat-cmp-col{border-radius:16px;padding:32px;display:flex;flex-direction:column;gap:20px}.feat-cmp-without{background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.1)}.feat-cmp-with{background:rgba(52,211,153,0.05);border:1px solid rgba(52,211,153,0.15)}.feat-cmp-label{font-size:14px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin:0;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)}.feat-cmp-without .feat-cmp-label{color:#ef4444}.feat-cmp-with .feat-cmp-label{color:#34d399}.feat-cmp-items{display:flex;flex-direction:column;gap:14px}.feat-cmp-item{display:flex;align-items:center;gap:10px;font-size:14px;color:rgba(255,255,255,0.6)}.feat-cmp-item svg{width:18px;height:18px;min-width:18px;fill:none;stroke-width:2}.feat-cmp-without .feat-cmp-item svg{stroke:#ef4444}.feat-cmp-with .feat-cmp-item svg{stroke:#34d399}.feat-cmp-btn{font-size:14px;font-weight:600;color:#0a0a0a;background:#34d399;padding:12px 28px;border-radius:8px;border:none;cursor:pointer;font-family:inherit;margin-top:8px;transition:all 0.3s}.feat-cmp-btn:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(52,211,153,0.25)}</style><section class="feat-cmp"><div class="feat-cmp-top"><h2 class="feat-cmp-h">See the difference</h2><p class="feat-cmp-sub">What changes when you switch to our platform</p></div><div class="feat-cmp-grid"><div class="feat-cmp-col feat-cmp-without"><p class="feat-cmp-label">Without Us</p><div class="feat-cmp-items"><div class="feat-cmp-item"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Hours spent on manual tasks</div><div class="feat-cmp-item"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Scattered tools and data</div><div class="feat-cmp-item"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Slow deployment cycles</div><div class="feat-cmp-item"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>No real-time collaboration</div><div class="feat-cmp-item"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Security vulnerabilities</div></div></div><div class="feat-cmp-col feat-cmp-with"><p class="feat-cmp-label">With Us</p><div class="feat-cmp-items"><div class="feat-cmp-item"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Automated workflows save 10h/week</div><div class="feat-cmp-item"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Single source of truth</div><div class="feat-cmp-item"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>One-click deploys in seconds</div><div class="feat-cmp-item"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Real-time multiplayer editing</div><div class="feat-cmp-item"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Enterprise-grade encryption</div></div><button class="feat-cmp-btn">Switch Today</button></div></div></section>`
      }
    }
  },
  {
    id: 'comp-features-numbers',
    label: 'Features Numbers',
    category: 'components',
    subcategory: 'features',
    tags: ['features', 'stats', 'numbers', 'counter', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Features Numbers',
      defaultStyle: { width: '100%', minHeight: '240px' },
      defaultContent: {
        html: `<style>.feat-num{background:#0a0a0a;padding:80px 40px;font-family:system-ui,-apple-system,sans-serif}.feat-num-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:32px;max-width:900px;margin:0 auto;text-align:center}.feat-num-item{display:flex;flex-direction:column;gap:8px;position:relative}.feat-num-item:not(:last-child)::after{content:'';position:absolute;right:-16px;top:10%;height:80%;width:1px;background:rgba(255,255,255,0.06)}.feat-num-val{font-size:48px;font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1;margin:0;background:linear-gradient(135deg,#fff,rgba(255,255,255,0.7));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.feat-num-label{font-size:14px;color:rgba(255,255,255,0.4);margin:0;font-weight:500}.feat-num-desc{font-size:12px;color:rgba(255,255,255,0.25);margin:0}</style><section class="feat-num"><div class="feat-num-grid"><div class="feat-num-item"><p class="feat-num-val">150+</p><p class="feat-num-label">Projects Delivered</p><p class="feat-num-desc">Across 12 industries</p></div><div class="feat-num-item"><p class="feat-num-val">99.9%</p><p class="feat-num-label">Uptime SLA</p><p class="feat-num-desc">Enterprise reliability</p></div><div class="feat-num-item"><p class="feat-num-val">24/7</p><p class="feat-num-label">Support</p><p class="feat-num-desc">Average 2min response</p></div><div class="feat-num-item"><p class="feat-num-val">50k+</p><p class="feat-num-label">Active Users</p><p class="feat-num-desc">Growing 20% monthly</p></div></div></section>`
      }
    }
  },
  {
    id: 'comp-features-carousel',
    label: 'Features Carousel',
    category: 'components',
    subcategory: 'features',
    tags: ['features', 'carousel', 'scrollable', 'cards', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Features Carousel',
      defaultStyle: { width: '100%', minHeight: '420px' },
      defaultContent: {
        html: `<style>.feat-car{background:#0a0a0a;padding:80px 0;font-family:system-ui,-apple-system,sans-serif}.feat-car-top{text-align:center;margin-bottom:40px;padding:0 40px}.feat-car-h{font-size:36px;font-weight:700;color:#fff;letter-spacing:-0.02em;margin:0 0 8px}.feat-car-sub{font-size:16px;color:rgba(255,255,255,0.4);margin:0}.feat-car-track{display:flex;gap:20px;overflow-x:auto;padding:0 40px 20px;scroll-snap-type:x mandatory;scrollbar-width:none;-ms-overflow-style:none}.feat-car-track::-webkit-scrollbar{display:none}.feat-car-card{min-width:280px;max-width:280px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:16px;scroll-snap-align:start;transition:all 0.3s;flex-shrink:0}.feat-car-card:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.1);transform:translateY(-4px)}.feat-car-num{font-size:48px;font-weight:700;color:rgba(255,255,255,0.06);line-height:1;margin:0}.feat-car-ch{font-size:18px;font-weight:600;color:#fff;margin:0}.feat-car-cp{font-size:14px;color:rgba(255,255,255,0.4);margin:0;line-height:1.6}.feat-car-link{font-size:13px;color:#3b82f6;text-decoration:none;font-weight:500;margin-top:auto;transition:opacity 0.3s}.feat-car-link:hover{opacity:0.7}.feat-car-nav{display:flex;justify-content:center;gap:8px;margin-top:24px;padding:0 40px}.feat-car-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.15);border:none;cursor:pointer;transition:all 0.3s;padding:0}.feat-car-dot:first-child{background:rgba(255,255,255,0.5);width:24px;border-radius:4px}</style><section class="feat-car"><div class="feat-car-top"><h2 class="feat-car-h">Everything included</h2><p class="feat-car-sub">Scroll to explore all features</p></div><div class="feat-car-track"><div class="feat-car-card"><p class="feat-car-num">01</p><h3 class="feat-car-ch">Visual Editor</h3><p class="feat-car-cp">Drag-and-drop interface for building beautiful layouts without code.</p><a href="#" class="feat-car-link">Learn more &rarr;</a></div><div class="feat-car-card"><p class="feat-car-num">02</p><h3 class="feat-car-ch">Smart Components</h3><p class="feat-car-cp">Pre-built, customizable components that adapt to your brand automatically.</p><a href="#" class="feat-car-link">Learn more &rarr;</a></div><div class="feat-car-card"><p class="feat-car-num">03</p><h3 class="feat-car-ch">AI Content</h3><p class="feat-car-cp">Generate copy, images, and layouts with AI that understands your brand voice.</p><a href="#" class="feat-car-link">Learn more &rarr;</a></div><div class="feat-car-card"><p class="feat-car-num">04</p><h3 class="feat-car-ch">Global CDN</h3><p class="feat-car-cp">Lightning-fast delivery from 200+ edge locations worldwide.</p><a href="#" class="feat-car-link">Learn more &rarr;</a></div><div class="feat-car-card"><p class="feat-car-num">05</p><h3 class="feat-car-ch">Team Spaces</h3><p class="feat-car-cp">Organize projects, manage permissions, and collaborate in real time.</p><a href="#" class="feat-car-link">Learn more &rarr;</a></div></div><div class="feat-car-nav"><div class="feat-car-dot"></div><div class="feat-car-dot"></div><div class="feat-car-dot"></div></div></section>`
      }
    }
  },
]

// ─── SOCIAL PROOF (6 premium presets) ───

const SOCIAL_PROOF: LibraryElementItem[] = [
  {
    id: 'comp-logos-bar',
    label: 'Logo Bar',
    category: 'components',
    subcategory: 'social-proof',
    tags: ['logos', 'trust', 'social-proof', 'grayscale', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Logo Bar',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: {
        html: `<style>.sp-logos{background:#0a0a0a;padding:48px 40px;font-family:system-ui,-apple-system,sans-serif;text-align:center}.sp-logos-label{font-size:12px;font-weight:500;color:rgba(255,255,255,0.3);letter-spacing:0.08em;text-transform:uppercase;margin:0 0 32px}.sp-logos-row{display:flex;align-items:center;justify-content:center;gap:48px;flex-wrap:wrap}.sp-logos-item{opacity:0.4;transition:opacity 0.4s;cursor:default;display:flex;align-items:center;gap:8px}.sp-logos-item:hover{opacity:0.8}.sp-logos-icon{width:28px;height:28px;border-radius:6px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center}.sp-logos-icon svg{width:14px;height:14px;fill:rgba(255,255,255,0.6)}.sp-logos-name{font-size:15px;font-weight:600;color:rgba(255,255,255,0.7);letter-spacing:-0.01em}</style><section class="sp-logos"><p class="sp-logos-label">Trusted by industry leaders</p><div class="sp-logos-row"><div class="sp-logos-item"><div class="sp-logos-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/></svg></div><span class="sp-logos-name">Acme Corp</span></div><div class="sp-logos-item"><div class="sp-logos-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg></div><span class="sp-logos-name">Globex</span></div><div class="sp-logos-item"><div class="sp-logos-icon"><svg viewBox="0 0 24 24"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/></svg></div><span class="sp-logos-name">Initech</span></div><div class="sp-logos-item"><div class="sp-logos-icon"><svg viewBox="0 0 24 24"><path d="M12 2L2 19h20L12 2z"/></svg></div><span class="sp-logos-name">Umbrella</span></div><div class="sp-logos-item"><div class="sp-logos-icon"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg></div><span class="sp-logos-name">Massive</span></div><div class="sp-logos-item"><div class="sp-logos-icon"><svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="3"/></svg></div><span class="sp-logos-name">Soylent</span></div></div></section>`
      }
    }
  },
  {
    id: 'comp-logos-marquee',
    label: 'Logo Marquee',
    category: 'components',
    subcategory: 'social-proof',
    tags: ['logos', 'marquee', 'scroll', 'infinite', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Logo Marquee',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: {
        html: `<style>.sp-marq{background:#0a0a0a;padding:40px 0;font-family:system-ui,-apple-system,sans-serif;overflow:hidden;position:relative}.sp-marq::before,.sp-marq::after{content:'';position:absolute;top:0;bottom:0;width:80px;z-index:1}.sp-marq::before{left:0;background:linear-gradient(90deg,#0a0a0a,transparent)}.sp-marq::after{right:0;background:linear-gradient(-90deg,#0a0a0a,transparent)}.sp-marq-track{display:flex;animation:spMarqScroll 25s linear infinite;width:max-content}.sp-marq-set{display:flex;align-items:center;gap:56px;padding:0 28px}@keyframes spMarqScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}.sp-marq-item{display:flex;align-items:center;gap:8px;opacity:0.35;flex-shrink:0}.sp-marq-icon{width:24px;height:24px;border-radius:5px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center}.sp-marq-icon svg{width:12px;height:12px;fill:rgba(255,255,255,0.5)}.sp-marq-name{font-size:14px;font-weight:600;color:rgba(255,255,255,0.6);white-space:nowrap}</style><section class="sp-marq"><div class="sp-marq-track"><div class="sp-marq-set"><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/></svg></div><span class="sp-marq-name">Acme Corp</span></div><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg></div><span class="sp-marq-name">Globex</span></div><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/></svg></div><span class="sp-marq-name">Initech</span></div><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><path d="M12 2L2 19h20L12 2z"/></svg></div><span class="sp-marq-name">Umbrella</span></div><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg></div><span class="sp-marq-name">Massive</span></div><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="3"/></svg></div><span class="sp-marq-name">Soylent</span></div><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></div><span class="sp-marq-name">Hooli</span></div><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg></div><span class="sp-marq-name">Stark Inc</span></div></div><div class="sp-marq-set"><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/></svg></div><span class="sp-marq-name">Acme Corp</span></div><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg></div><span class="sp-marq-name">Globex</span></div><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/></svg></div><span class="sp-marq-name">Initech</span></div><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><path d="M12 2L2 19h20L12 2z"/></svg></div><span class="sp-marq-name">Umbrella</span></div><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg></div><span class="sp-marq-name">Massive</span></div><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="3"/></svg></div><span class="sp-marq-name">Soylent</span></div><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></div><span class="sp-marq-name">Hooli</span></div><div class="sp-marq-item"><div class="sp-marq-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg></div><span class="sp-marq-name">Stark Inc</span></div></div></div></section>`
      }
    }
  },
  {
    id: 'comp-stats-bar',
    label: 'Stats Bar',
    category: 'components',
    subcategory: 'social-proof',
    tags: ['stats', 'bar', 'numbers', 'accent', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Stats Bar',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: {
        html: `<style>.sp-stats{background:linear-gradient(135deg,#1a1a2e,#16213e);padding:40px;font-family:system-ui,-apple-system,sans-serif;border-radius:16px;border:1px solid rgba(255,255,255,0.06)}.sp-stats-row{display:flex;align-items:center;justify-content:space-around;gap:24px;max-width:800px;margin:0 auto}.sp-stats-item{text-align:center;display:flex;flex-direction:column;gap:4px;position:relative;flex:1}.sp-stats-item:not(:last-child)::after{content:'';position:absolute;right:0;top:15%;height:70%;width:1px;background:rgba(255,255,255,0.08)}.sp-stats-val{font-size:32px;font-weight:700;color:#fff;letter-spacing:-0.02em;margin:0}.sp-stats-label{font-size:13px;color:rgba(255,255,255,0.4);margin:0;font-weight:500}</style><section class="sp-stats"><div class="sp-stats-row"><div class="sp-stats-item"><p class="sp-stats-val">200+</p><p class="sp-stats-label">Projects</p></div><div class="sp-stats-item"><p class="sp-stats-val">50+</p><p class="sp-stats-label">Clients</p></div><div class="sp-stats-item"><p class="sp-stats-val">5+</p><p class="sp-stats-label">Years</p></div><div class="sp-stats-item"><p class="sp-stats-val">4.9</p><p class="sp-stats-label">Rating</p></div></div></section>`
      }
    }
  },
  {
    id: 'comp-social-proof-avatars',
    label: 'Social Proof Avatars',
    category: 'components',
    subcategory: 'social-proof',
    tags: ['social-proof', 'avatars', 'cta', 'trust', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Social Proof Avatars',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: {
        html: `<style>.sp-av{background:#0a0a0a;padding:48px 40px;font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;gap:20px;flex-wrap:wrap}.sp-av-stack{display:flex;align-items:center}.sp-av-circle{width:40px;height:40px;border-radius:50%;border:2px solid #0a0a0a;margin-left:-10px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:#fff}.sp-av-circle:first-child{margin-left:0}.sp-av-c1{background:linear-gradient(135deg,#7c3aed,#a78bfa)}.sp-av-c2{background:linear-gradient(135deg,#3b82f6,#60a5fa)}.sp-av-c3{background:linear-gradient(135deg,#ec4899,#f472b6)}.sp-av-c4{background:linear-gradient(135deg,#f59e0b,#fbbf24)}.sp-av-c5{background:linear-gradient(135deg,#10b981,#34d399)}.sp-av-info{display:flex;flex-direction:column;gap:4px}.sp-av-text{font-size:15px;font-weight:600;color:#fff;margin:0}.sp-av-sub{font-size:13px;color:rgba(255,255,255,0.4);margin:0}.sp-av-btn{font-size:14px;font-weight:600;color:#0a0a0a;background:#fff;padding:10px 24px;border-radius:8px;border:none;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-left:16px}.sp-av-btn:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(255,255,255,0.15)}</style><section class="sp-av"><div class="sp-av-stack"><div class="sp-av-circle sp-av-c1">JL</div><div class="sp-av-circle sp-av-c2">AK</div><div class="sp-av-circle sp-av-c3">MR</div><div class="sp-av-circle sp-av-c4">TS</div><div class="sp-av-circle sp-av-c5">+</div></div><div class="sp-av-info"><p class="sp-av-text">Join 2,000+ customers</p><p class="sp-av-sub">who already trust our platform</p></div><button class="sp-av-btn">Get Started</button></section>`
      }
    }
  },
  {
    id: 'comp-review-stars',
    label: 'Review Stars',
    category: 'components',
    subcategory: 'social-proof',
    tags: ['reviews', 'stars', 'rating', 'trust', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Review Stars',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: {
        html: `<style>.sp-rev{background:#0a0a0a;padding:48px 40px;font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;gap:32px;flex-wrap:wrap}.sp-rev-stars{display:flex;gap:4px}.sp-rev-star{width:24px;height:24px;fill:#f59e0b}.sp-rev-score{display:flex;flex-direction:column;gap:2px}.sp-rev-num{font-size:32px;font-weight:700;color:#fff;letter-spacing:-0.02em;margin:0;line-height:1}.sp-rev-out{font-size:13px;color:rgba(255,255,255,0.4);margin:0}.sp-rev-divider{width:1px;height:48px;background:rgba(255,255,255,0.08)}.sp-rev-badge{display:flex;flex-direction:column;align-items:center;gap:4px}.sp-rev-label{font-size:18px;font-weight:700;color:#34d399;margin:0}.sp-rev-count{font-size:13px;color:rgba(255,255,255,0.4);margin:0}</style><section class="sp-rev"><div class="sp-rev-stars"><svg class="sp-rev-star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="sp-rev-star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="sp-rev-star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="sp-rev-star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="sp-rev-star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div><div class="sp-rev-score"><p class="sp-rev-num">4.9</p><p class="sp-rev-out">out of 5</p></div><div class="sp-rev-divider"></div><div class="sp-rev-badge"><p class="sp-rev-label">Excellent</p><p class="sp-rev-count">Based on 1,247 reviews</p></div></section>`
      }
    }
  },
  {
    id: 'comp-press-mentions',
    label: 'Press Mentions',
    category: 'components',
    subcategory: 'social-proof',
    tags: ['press', 'media', 'logos', 'trust', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Press Mentions',
      defaultStyle: { width: '100%', minHeight: '100px' },
      defaultContent: {
        html: `<style>.sp-press{background:#0a0a0a;padding:48px 40px;font-family:system-ui,-apple-system,sans-serif;text-align:center}.sp-press-label{font-size:12px;font-weight:500;color:rgba(255,255,255,0.25);letter-spacing:0.08em;text-transform:uppercase;margin:0 0 28px}.sp-press-row{display:flex;align-items:center;justify-content:center;gap:40px;flex-wrap:wrap}.sp-press-item{opacity:0.3;transition:opacity 0.4s;cursor:default}.sp-press-item:hover{opacity:0.6}.sp-press-name{font-size:18px;font-weight:700;color:#fff;letter-spacing:0.02em;font-style:italic;margin:0}</style><section class="sp-press"><p class="sp-press-label">As seen in</p><div class="sp-press-row"><div class="sp-press-item"><p class="sp-press-name">TechCrunch</p></div><div class="sp-press-item"><p class="sp-press-name">Forbes</p></div><div class="sp-press-item"><p class="sp-press-name">The Verge</p></div><div class="sp-press-item"><p class="sp-press-name">Wired</p></div><div class="sp-press-item"><p class="sp-press-name">Fast Company</p></div></div></section>`
      }
    }
  },
]

// ─── BLOG SECTIONS (6 premium presets) ───

const BLOG_SECTIONS: LibraryElementItem[] = [
  {
    id: 'comp-blog-card-grid',
    label: 'Blog Card Grid',
    category: 'components',
    subcategory: 'blog',
    tags: ['blog', 'cards', 'grid', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Blog Card Grid',
      defaultStyle: { width: '100%', minHeight: '520px' },
      defaultContent: {
        html: `<style>.blg-cg{background:#0a0a0a;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif}.blg-cg-h{font-size:clamp(28px,3vw,40px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0 0 48px 0;text-align:center}.blg-cg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1100px;margin:0 auto}.blg-cg-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;transition:transform 0.3s,border-color 0.3s}.blg-cg-card:hover{transform:translateY(-4px);border-color:rgba(255,255,255,0.15)}.blg-cg-img{width:100%;height:200px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase}.blg-cg-img-1{background:linear-gradient(135deg,#1a1a2e,#16213e);color:rgba(255,255,255,0.3)}.blg-cg-img-2{background:linear-gradient(135deg,#1a2e1a,#162e21);color:rgba(255,255,255,0.3)}.blg-cg-img-3{background:linear-gradient(135deg,#2e1a1a,#2e1621);color:rgba(255,255,255,0.3)}.blg-cg-body{padding:24px}.blg-cg-date{font-size:12px;color:rgba(255,255,255,0.35);margin:0 0 12px 0}.blg-cg-title{font-size:18px;font-weight:600;color:#fff;margin:0 0 10px 0;letter-spacing:-0.01em;line-height:1.3}.blg-cg-excerpt{font-size:14px;color:rgba(255,255,255,0.4);margin:0 0 16px 0;line-height:1.6}.blg-cg-link{font-size:13px;font-weight:600;color:#fff;text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:gap 0.3s}.blg-cg-link:hover{gap:10px}.blg-cg-link span{transition:transform 0.3s}@media(max-width:768px){.blg-cg-grid{grid-template-columns:1fr}}</style><section class="blg-cg"><h2 class="blg-cg-h">Latest Articles</h2><div class="blg-cg-grid"><div class="blg-cg-card"><div class="blg-cg-img blg-cg-img-1">Image 1</div><div class="blg-cg-body"><p class="blg-cg-date">Mar 18, 2026</p><h3 class="blg-cg-title">Design Systems That Scale</h3><p class="blg-cg-excerpt">How to build component libraries that grow with your team and product.</p><a class="blg-cg-link" href="#">Read More <span>&rarr;</span></a></div></div><div class="blg-cg-card"><div class="blg-cg-img blg-cg-img-2">Image 2</div><div class="blg-cg-body"><p class="blg-cg-date">Mar 12, 2026</p><h3 class="blg-cg-title">The Future of Web Animation</h3><p class="blg-cg-excerpt">Exploring the latest techniques in motion design for the modern web.</p><a class="blg-cg-link" href="#">Read More <span>&rarr;</span></a></div></div><div class="blg-cg-card"><div class="blg-cg-img blg-cg-img-3">Image 3</div><div class="blg-cg-body"><p class="blg-cg-date">Mar 5, 2026</p><h3 class="blg-cg-title">Typography in Digital Products</h3><p class="blg-cg-excerpt">A deep dive into choosing and pairing typefaces for premium interfaces.</p><a class="blg-cg-link" href="#">Read More <span>&rarr;</span></a></div></div></div></section>`
      }
    }
  },
  {
    id: 'comp-blog-featured',
    label: 'Blog Featured Post',
    category: 'components',
    subcategory: 'blog',
    tags: ['blog', 'featured', 'hero', 'dark', 'editorial'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Blog Featured Post',
      defaultStyle: { width: '100%', minHeight: '600px' },
      defaultContent: {
        html: `<style>.blg-ft{background:#0a0a0a;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif;max-width:1100px;margin:0 auto}.blg-ft-main{position:relative;border-radius:16px;overflow:hidden;margin-bottom:24px;min-height:360px;display:flex;align-items:flex-end;background:linear-gradient(135deg,#1a1a2e,#0f0f23)}.blg-ft-main-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 60%);z-index:1}.blg-ft-main-placeholder{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:rgba(255,255,255,0.2);text-transform:uppercase;letter-spacing:0.05em}.blg-ft-main-body{position:relative;z-index:2;padding:40px}.blg-ft-badge{font-size:11px;font-weight:600;color:#fff;background:rgba(124,58,237,0.8);padding:5px 12px;border-radius:99px;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:16px}.blg-ft-main-title{font-size:clamp(24px,3vw,36px);font-weight:700;color:#fff;margin:0 0 12px 0;letter-spacing:-0.02em;line-height:1.2}.blg-ft-main-excerpt{font-size:15px;color:rgba(255,255,255,0.5);margin:0;max-width:500px;line-height:1.6}.blg-ft-row{display:grid;grid-template-columns:1fr 1fr;gap:24px}.blg-ft-sm{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;display:flex;overflow:hidden;transition:border-color 0.3s}.blg-ft-sm:hover{border-color:rgba(255,255,255,0.15)}.blg-ft-sm-img{width:180px;min-height:160px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:rgba(255,255,255,0.2);text-transform:uppercase;letter-spacing:0.05em}.blg-ft-sm-img-1{background:linear-gradient(135deg,#1a2e1a,#162e21)}.blg-ft-sm-img-2{background:linear-gradient(135deg,#2e1a1a,#2e1621)}.blg-ft-sm-body{padding:24px;display:flex;flex-direction:column;justify-content:center;gap:8px}.blg-ft-sm-date{font-size:12px;color:rgba(255,255,255,0.3);margin:0}.blg-ft-sm-title{font-size:16px;font-weight:600;color:#fff;margin:0;letter-spacing:-0.01em;line-height:1.3}.blg-ft-sm-excerpt{font-size:13px;color:rgba(255,255,255,0.4);margin:0;line-height:1.5}@media(max-width:768px){.blg-ft-row{grid-template-columns:1fr}.blg-ft-sm{flex-direction:column}.blg-ft-sm-img{width:100%;min-height:120px}}</style><section class="blg-ft"><div class="blg-ft-main"><div class="blg-ft-main-placeholder">Featured Image</div><div class="blg-ft-main-overlay"></div><div class="blg-ft-main-body"><span class="blg-ft-badge">Featured</span><h2 class="blg-ft-main-title">Building the Next Generation of Creative Tools</h2><p class="blg-ft-main-excerpt">An in-depth look at how AI and design are converging to reshape the creative industry.</p></div></div><div class="blg-ft-row"><div class="blg-ft-sm"><div class="blg-ft-sm-img blg-ft-sm-img-1">Image</div><div class="blg-ft-sm-body"><p class="blg-ft-sm-date">Mar 10, 2026</p><h3 class="blg-ft-sm-title">Minimalism in Modern UI</h3><p class="blg-ft-sm-excerpt">Less is more — why top brands are simplifying.</p></div></div><div class="blg-ft-sm"><div class="blg-ft-sm-img blg-ft-sm-img-2">Image</div><div class="blg-ft-sm-body"><p class="blg-ft-sm-date">Mar 3, 2026</p><h3 class="blg-ft-sm-title">Color Theory for Digital</h3><p class="blg-ft-sm-excerpt">Mastering palette selection for screen-first design.</p></div></div></div></section>`
      }
    }
  },
  {
    id: 'comp-blog-list',
    label: 'Blog Post List',
    category: 'components',
    subcategory: 'blog',
    tags: ['blog', 'list', 'minimal', 'clean', 'dark'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Blog Post List',
      defaultStyle: { width: '100%', minHeight: '480px' },
      defaultContent: {
        html: `<style>.blg-ls{background:#0a0a0a;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif}.blg-ls-h{font-size:clamp(28px,3vw,40px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0 0 48px 0}.blg-ls-list{max-width:800px;display:flex;flex-direction:column}.blg-ls-item{display:flex;align-items:flex-start;justify-content:space-between;gap:32px;padding:32px 0;border-bottom:1px solid rgba(255,255,255,0.08);transition:border-color 0.3s}.blg-ls-item:first-child{border-top:1px solid rgba(255,255,255,0.08)}.blg-ls-item:hover{border-color:rgba(255,255,255,0.2)}.blg-ls-left{flex:1}.blg-ls-meta{display:flex;align-items:center;gap:12px;margin-bottom:10px}.blg-ls-date{font-size:12px;color:rgba(255,255,255,0.3)}.blg-ls-author{font-size:12px;color:rgba(255,255,255,0.4)}.blg-ls-dot{width:3px;height:3px;border-radius:50%;background:rgba(255,255,255,0.2)}.blg-ls-title{font-size:20px;font-weight:600;color:#fff;margin:0 0 8px 0;letter-spacing:-0.01em;line-height:1.3}.blg-ls-excerpt{font-size:14px;color:rgba(255,255,255,0.4);margin:0;line-height:1.6;max-width:560px}.blg-ls-arrow{font-size:18px;color:rgba(255,255,255,0.3);margin-top:8px;transition:color 0.3s,transform 0.3s;flex-shrink:0}.blg-ls-item:hover .blg-ls-arrow{color:#fff;transform:translateX(4px)}</style><section class="blg-ls"><h2 class="blg-ls-h">Journal</h2><div class="blg-ls-list"><div class="blg-ls-item"><div class="blg-ls-left"><div class="blg-ls-meta"><span class="blg-ls-date">Mar 18, 2026</span><span class="blg-ls-dot"></span><span class="blg-ls-author">Alex Chen</span></div><h3 class="blg-ls-title">The Art of Whitespace in Web Design</h3><p class="blg-ls-excerpt">Why breathing room is the secret weapon of premium digital experiences.</p></div><span class="blg-ls-arrow">&rarr;</span></div><div class="blg-ls-item"><div class="blg-ls-left"><div class="blg-ls-meta"><span class="blg-ls-date">Mar 11, 2026</span><span class="blg-ls-dot"></span><span class="blg-ls-author">Sarah Kim</span></div><h3 class="blg-ls-title">Microinteractions That Delight Users</h3><p class="blg-ls-excerpt">Small details that create memorable and engaging interfaces.</p></div><span class="blg-ls-arrow">&rarr;</span></div><div class="blg-ls-item"><div class="blg-ls-left"><div class="blg-ls-meta"><span class="blg-ls-date">Mar 4, 2026</span><span class="blg-ls-dot"></span><span class="blg-ls-author">James Park</span></div><h3 class="blg-ls-title">Responsive Design Beyond Breakpoints</h3><p class="blg-ls-excerpt">Fluid layouts and modern CSS techniques for truly adaptive interfaces.</p></div><span class="blg-ls-arrow">&rarr;</span></div><div class="blg-ls-item"><div class="blg-ls-left"><div class="blg-ls-meta"><span class="blg-ls-date">Feb 25, 2026</span><span class="blg-ls-dot"></span><span class="blg-ls-author">Mia Torres</span></div><h3 class="blg-ls-title">Choosing Fonts That Speak Your Brand</h3><p class="blg-ls-excerpt">A practical guide to typography selection for digital products.</p></div><span class="blg-ls-arrow">&rarr;</span></div></div></section>`
      }
    }
  },
  {
    id: 'comp-blog-magazine',
    label: 'Blog Magazine Layout',
    category: 'components',
    subcategory: 'blog',
    tags: ['blog', 'magazine', 'editorial', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Blog Magazine Layout',
      defaultStyle: { width: '100%', minHeight: '520px' },
      defaultContent: {
        html: `<style>.blg-mg{background:#0a0a0a;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif}.blg-mg-h{font-size:clamp(28px,3vw,40px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0 0 48px 0}.blg-mg-grid{display:grid;grid-template-columns:2fr 1fr;gap:24px;max-width:1100px}.blg-mg-main{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;transition:border-color 0.3s}.blg-mg-main:hover{border-color:rgba(255,255,255,0.15)}.blg-mg-main-img{width:100%;height:320px;background:linear-gradient(135deg,#1a1a2e,#0f0f23);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:rgba(255,255,255,0.2);text-transform:uppercase;letter-spacing:0.05em}.blg-mg-main-body{padding:32px}.blg-mg-main-cat{font-size:11px;font-weight:600;color:rgba(124,58,237,0.9);text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px 0}.blg-mg-main-title{font-size:24px;font-weight:700;color:#fff;margin:0 0 12px 0;letter-spacing:-0.02em;line-height:1.25}.blg-mg-main-excerpt{font-size:15px;color:rgba(255,255,255,0.4);margin:0;line-height:1.6}.blg-mg-side{display:flex;flex-direction:column;gap:24px}.blg-mg-sm{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;flex:1;transition:border-color 0.3s}.blg-mg-sm:hover{border-color:rgba(255,255,255,0.15)}.blg-mg-sm-img{width:100%;height:140px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:rgba(255,255,255,0.2);text-transform:uppercase;letter-spacing:0.05em}.blg-mg-sm-img-1{background:linear-gradient(135deg,#1a2e1a,#162e21)}.blg-mg-sm-img-2{background:linear-gradient(135deg,#2e1a1a,#2e1621)}.blg-mg-sm-body{padding:20px}.blg-mg-sm-cat{font-size:10px;font-weight:600;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px 0}.blg-mg-sm-title{font-size:16px;font-weight:600;color:#fff;margin:0;letter-spacing:-0.01em;line-height:1.3}@media(max-width:768px){.blg-mg-grid{grid-template-columns:1fr}}</style><section class="blg-mg"><h2 class="blg-mg-h">Stories</h2><div class="blg-mg-grid"><div class="blg-mg-main"><div class="blg-mg-main-img">Featured Image</div><div class="blg-mg-main-body"><p class="blg-mg-main-cat">Design</p><h3 class="blg-mg-main-title">Reimagining the Digital Experience for Luxury Brands</h3><p class="blg-mg-main-excerpt">How premium brands are setting new standards in digital craftsmanship and user experience.</p></div></div><div class="blg-mg-side"><div class="blg-mg-sm"><div class="blg-mg-sm-img blg-mg-sm-img-1">Image</div><div class="blg-mg-sm-body"><p class="blg-mg-sm-cat">Technology</p><h3 class="blg-mg-sm-title">AI-Powered Design Workflows</h3></div></div><div class="blg-mg-sm"><div class="blg-mg-sm-img blg-mg-sm-img-2">Image</div><div class="blg-mg-sm-body"><p class="blg-mg-sm-cat">Strategy</p><h3 class="blg-mg-sm-title">Content-First Design Approach</h3></div></div></div></div></section>`
      }
    }
  },
  {
    id: 'comp-blog-minimal',
    label: 'Blog Minimal',
    category: 'components',
    subcategory: 'blog',
    tags: ['blog', 'minimal', 'serif', 'elegant', 'dark'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Blog Minimal',
      defaultStyle: { width: '100%', minHeight: '400px' },
      defaultContent: {
        html: `<style>.blg-mn{background:#0a0a0a;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif}.blg-mn-h{font-size:14px;font-weight:600;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.1em;margin:0 0 40px 0}.blg-mn-list{max-width:640px;display:flex;flex-direction:column}.blg-mn-item{display:flex;align-items:center;justify-content:space-between;padding:28px 0;border-bottom:1px solid rgba(255,255,255,0.06);cursor:pointer;transition:border-color 0.3s}.blg-mn-item:first-child{border-top:1px solid rgba(255,255,255,0.06)}.blg-mn-item:hover{border-color:rgba(255,255,255,0.15)}.blg-mn-left{display:flex;flex-direction:column;gap:6px}.blg-mn-title{font-size:20px;font-weight:400;color:#fff;margin:0;letter-spacing:-0.01em;line-height:1.3;font-family:Georgia,'Times New Roman',serif}.blg-mn-date{font-size:12px;color:rgba(255,255,255,0.25);font-family:system-ui,-apple-system,sans-serif}.blg-mn-arrow{font-size:16px;color:rgba(255,255,255,0.2);transition:color 0.3s,transform 0.3s}.blg-mn-item:hover .blg-mn-arrow{color:#fff;transform:translateX(4px)}</style><section class="blg-mn"><p class="blg-mn-h">Recent Writing</p><div class="blg-mn-list"><div class="blg-mn-item"><div class="blg-mn-left"><h3 class="blg-mn-title">On the Importance of Craft in Digital Design</h3><span class="blg-mn-date">March 18, 2026</span></div><span class="blg-mn-arrow">&rarr;</span></div><div class="blg-mn-item"><div class="blg-mn-left"><h3 class="blg-mn-title">Silence as a Design Element</h3><span class="blg-mn-date">March 9, 2026</span></div><span class="blg-mn-arrow">&rarr;</span></div><div class="blg-mn-item"><div class="blg-mn-left"><h3 class="blg-mn-title">The Quiet Revolution of Slow Interfaces</h3><span class="blg-mn-date">February 28, 2026</span></div><span class="blg-mn-arrow">&rarr;</span></div><div class="blg-mn-item"><div class="blg-mn-left"><h3 class="blg-mn-title">Why Every Pixel Still Matters</h3><span class="blg-mn-date">February 14, 2026</span></div><span class="blg-mn-arrow">&rarr;</span></div></div></section>`
      }
    }
  },
  {
    id: 'comp-blog-sidebar',
    label: 'Blog With Sidebar',
    category: 'components',
    subcategory: 'blog',
    tags: ['blog', 'sidebar', 'newsletter', 'categories', 'dark'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Blog With Sidebar',
      defaultStyle: { width: '100%', minHeight: '560px' },
      defaultContent: {
        html: `<style>.blg-sb{background:#0a0a0a;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif}.blg-sb-h{font-size:clamp(28px,3vw,40px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0 0 48px 0}.blg-sb-layout{display:grid;grid-template-columns:1fr 320px;gap:48px;max-width:1100px}.blg-sb-main{display:flex;flex-direction:column;gap:24px}.blg-sb-post{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;display:flex;transition:border-color 0.3s}.blg-sb-post:hover{border-color:rgba(255,255,255,0.15)}.blg-sb-post-img{width:200px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:rgba(255,255,255,0.2);text-transform:uppercase;letter-spacing:0.05em}.blg-sb-post-img-1{background:linear-gradient(135deg,#1a1a2e,#0f0f23)}.blg-sb-post-img-2{background:linear-gradient(135deg,#1a2e1a,#162e21)}.blg-sb-post-body{padding:28px;display:flex;flex-direction:column;justify-content:center;gap:10px}.blg-sb-post-date{font-size:12px;color:rgba(255,255,255,0.3);margin:0}.blg-sb-post-title{font-size:18px;font-weight:600;color:#fff;margin:0;letter-spacing:-0.01em;line-height:1.3}.blg-sb-post-excerpt{font-size:14px;color:rgba(255,255,255,0.4);margin:0;line-height:1.6}.blg-sb-side{display:flex;flex-direction:column;gap:24px}.blg-sb-widget{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px}.blg-sb-widget-h{font-size:14px;font-weight:600;color:#fff;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:0.05em}.blg-sb-cats{display:flex;flex-direction:column;gap:8px}.blg-sb-cat{font-size:14px;color:rgba(255,255,255,0.5);text-decoration:none;transition:color 0.3s;cursor:pointer;display:flex;justify-content:space-between}.blg-sb-cat:hover{color:#fff}.blg-sb-cat-count{font-size:12px;color:rgba(255,255,255,0.25)}.blg-sb-tags{display:flex;flex-wrap:wrap;gap:8px}.blg-sb-tag{font-size:12px;color:rgba(255,255,255,0.4);background:rgba(255,255,255,0.06);padding:6px 12px;border-radius:6px;cursor:pointer;transition:background 0.3s,color 0.3s}.blg-sb-tag:hover{background:rgba(255,255,255,0.1);color:#fff}.blg-sb-nl{display:flex;flex-direction:column;gap:12px}.blg-sb-nl-p{font-size:13px;color:rgba(255,255,255,0.4);margin:0;line-height:1.5}.blg-sb-nl-input{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px 14px;font-size:13px;color:#fff;outline:none;font-family:inherit}.blg-sb-nl-input::placeholder{color:rgba(255,255,255,0.25)}.blg-sb-nl-btn{font-size:13px;font-weight:600;color:#0a0a0a;background:#fff;padding:10px 20px;border-radius:8px;border:none;cursor:pointer;transition:transform 0.2s;font-family:inherit}.blg-sb-nl-btn:hover{transform:translateY(-1px)}@media(max-width:768px){.blg-sb-layout{grid-template-columns:1fr}.blg-sb-post{flex-direction:column}.blg-sb-post-img{width:100%;min-height:140px}}</style><section class="blg-sb"><h2 class="blg-sb-h">Blog</h2><div class="blg-sb-layout"><div class="blg-sb-main"><div class="blg-sb-post"><div class="blg-sb-post-img blg-sb-post-img-1">Image</div><div class="blg-sb-post-body"><p class="blg-sb-post-date">Mar 18, 2026</p><h3 class="blg-sb-post-title">Crafting Premium Web Experiences</h3><p class="blg-sb-post-excerpt">The principles behind websites that feel truly luxurious and intentional.</p></div></div><div class="blg-sb-post"><div class="blg-sb-post-img blg-sb-post-img-2">Image</div><div class="blg-sb-post-body"><p class="blg-sb-post-date">Mar 10, 2026</p><h3 class="blg-sb-post-title">Motion Design for the Web</h3><p class="blg-sb-post-excerpt">How subtle animations elevate user experience and brand perception.</p></div></div></div><div class="blg-sb-side"><div class="blg-sb-widget"><h4 class="blg-sb-widget-h">Categories</h4><div class="blg-sb-cats"><span class="blg-sb-cat">Design <span class="blg-sb-cat-count">12</span></span><span class="blg-sb-cat">Development <span class="blg-sb-cat-count">8</span></span><span class="blg-sb-cat">Strategy <span class="blg-sb-cat-count">5</span></span><span class="blg-sb-cat">Branding <span class="blg-sb-cat-count">4</span></span></div></div><div class="blg-sb-widget"><h4 class="blg-sb-widget-h">Tags</h4><div class="blg-sb-tags"><span class="blg-sb-tag">UI/UX</span><span class="blg-sb-tag">CSS</span><span class="blg-sb-tag">Animation</span><span class="blg-sb-tag">Typography</span><span class="blg-sb-tag">Branding</span><span class="blg-sb-tag">React</span></div></div><div class="blg-sb-widget"><h4 class="blg-sb-widget-h">Newsletter</h4><div class="blg-sb-nl"><p class="blg-sb-nl-p">Get weekly design insights delivered to your inbox.</p><input class="blg-sb-nl-input" type="email" placeholder="your@email.com"/><button class="blg-sb-nl-btn">Subscribe</button></div></div></div></div></section>`
      }
    }
  },
]

// ─── TEAM SECTIONS (5 premium presets) ───

const TEAM_SECTIONS: LibraryElementItem[] = [
  {
    id: 'comp-team-grid',
    label: 'Team Grid',
    category: 'components',
    subcategory: 'team',
    tags: ['team', 'grid', 'hover', 'social', 'dark'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Team Grid',
      defaultStyle: { width: '100%', minHeight: '480px' },
      defaultContent: {
        html: `<style>.tm-gr{background:#0a0a0a;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif;text-align:center}.tm-gr-h{font-size:clamp(28px,3vw,40px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0 0 12px 0}.tm-gr-sub{font-size:15px;color:rgba(255,255,255,0.4);margin:0 0 56px 0}.tm-gr-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:32px;max-width:960px;margin:0 auto}.tm-gr-member{display:flex;flex-direction:column;align-items:center;gap:16px;position:relative}.tm-gr-photo{width:120px;height:120px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;color:rgba(255,255,255,0.3);transition:transform 0.3s}.tm-gr-photo-1{background:linear-gradient(135deg,#1a1a2e,#16213e)}.tm-gr-photo-2{background:linear-gradient(135deg,#2e1a1a,#2e1621)}.tm-gr-photo-3{background:linear-gradient(135deg,#1a2e1a,#162e21)}.tm-gr-photo-4{background:linear-gradient(135deg,#2e2e1a,#21291e)}.tm-gr-member:hover .tm-gr-photo{transform:scale(1.05)}.tm-gr-name{font-size:16px;font-weight:600;color:#fff;margin:0;letter-spacing:-0.01em}.tm-gr-role{font-size:13px;color:rgba(255,255,255,0.35);margin:-8px 0 0 0}.tm-gr-social{display:flex;gap:12px;opacity:0;transform:translateY(8px);transition:opacity 0.3s,transform 0.3s}.tm-gr-member:hover .tm-gr-social{opacity:1;transform:translateY(0)}.tm-gr-social a{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-size:12px;color:rgba(255,255,255,0.5);text-decoration:none;transition:background 0.3s,color 0.3s}.tm-gr-social a:hover{background:rgba(255,255,255,0.15);color:#fff}@media(max-width:768px){.tm-gr-grid{grid-template-columns:repeat(2,1fr);gap:40px}}</style><section class="tm-gr"><h2 class="tm-gr-h">Our Team</h2><p class="tm-gr-sub">The people behind the product</p><div class="tm-gr-grid"><div class="tm-gr-member"><div class="tm-gr-photo tm-gr-photo-1">JD</div><p class="tm-gr-name">Jane Doe</p><p class="tm-gr-role">CEO & Founder</p><div class="tm-gr-social"><a href="#">Li</a><a href="#">Tw</a></div></div><div class="tm-gr-member"><div class="tm-gr-photo tm-gr-photo-2">AS</div><p class="tm-gr-name">Alex Smith</p><p class="tm-gr-role">Lead Designer</p><div class="tm-gr-social"><a href="#">Li</a><a href="#">Dr</a></div></div><div class="tm-gr-member"><div class="tm-gr-photo tm-gr-photo-3">MK</div><p class="tm-gr-name">Maria Kim</p><p class="tm-gr-role">Engineering Lead</p><div class="tm-gr-social"><a href="#">Li</a><a href="#">Gh</a></div></div><div class="tm-gr-member"><div class="tm-gr-photo tm-gr-photo-4">TC</div><p class="tm-gr-name">Tom Carter</p><p class="tm-gr-role">Product Manager</p><div class="tm-gr-social"><a href="#">Li</a><a href="#">Tw</a></div></div></div></section>`
      }
    }
  },
  {
    id: 'comp-team-cards',
    label: 'Team Cards Glass',
    category: 'components',
    subcategory: 'team',
    tags: ['team', 'cards', 'glassmorphic', 'bio', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Team Cards Glass',
      defaultStyle: { width: '100%', minHeight: '520px' },
      defaultContent: {
        html: `<style>.tm-cd{background:#0a0a0a;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif}.tm-cd-h{font-size:clamp(28px,3vw,40px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0 0 48px 0;text-align:center}.tm-cd-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1000px;margin:0 auto}.tm-cd-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px 28px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:16px;transition:transform 0.3s,border-color 0.3s;backdrop-filter:blur(12px)}.tm-cd-card:hover{transform:translateY(-4px);border-color:rgba(255,255,255,0.15)}.tm-cd-photo{width:100px;height:100px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:rgba(255,255,255,0.3)}.tm-cd-photo-1{background:linear-gradient(135deg,#1a1a2e,#16213e)}.tm-cd-photo-2{background:linear-gradient(135deg,#2e1a1a,#2e1621)}.tm-cd-photo-3{background:linear-gradient(135deg,#1a2e1a,#162e21)}.tm-cd-name{font-size:18px;font-weight:600;color:#fff;margin:0;letter-spacing:-0.01em}.tm-cd-role{font-size:13px;color:rgba(124,58,237,0.8);margin:-8px 0 0 0;font-weight:500}.tm-cd-bio{font-size:14px;color:rgba(255,255,255,0.4);margin:0;line-height:1.6}.tm-cd-links{display:flex;gap:10px;margin-top:4px}.tm-cd-links a{width:34px;height:34px;border-radius:8px;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;font-size:12px;color:rgba(255,255,255,0.4);text-decoration:none;transition:background 0.3s,color 0.3s}.tm-cd-links a:hover{background:rgba(255,255,255,0.12);color:#fff}@media(max-width:768px){.tm-cd-grid{grid-template-columns:1fr;max-width:360px}}</style><section class="tm-cd"><h2 class="tm-cd-h">Meet the Team</h2><div class="tm-cd-grid"><div class="tm-cd-card"><div class="tm-cd-photo tm-cd-photo-1">EL</div><p class="tm-cd-name">Emma Laurent</p><p class="tm-cd-role">Creative Director</p><p class="tm-cd-bio">10+ years shaping visual identities for premium brands worldwide.</p><div class="tm-cd-links"><a href="#">Li</a><a href="#">Tw</a><a href="#">Be</a></div></div><div class="tm-cd-card"><div class="tm-cd-photo tm-cd-photo-2">RM</div><p class="tm-cd-name">Ryan Mitchell</p><p class="tm-cd-role">Full-Stack Engineer</p><p class="tm-cd-bio">Building scalable systems with a passion for clean architecture.</p><div class="tm-cd-links"><a href="#">Li</a><a href="#">Gh</a><a href="#">Tw</a></div></div><div class="tm-cd-card"><div class="tm-cd-photo tm-cd-photo-3">SP</div><p class="tm-cd-name">Sofia Park</p><p class="tm-cd-role">UX Researcher</p><p class="tm-cd-bio">Uncovering insights that drive meaningful product decisions.</p><div class="tm-cd-links"><a href="#">Li</a><a href="#">Tw</a><a href="#">Dr</a></div></div></div></section>`
      }
    }
  },
  {
    id: 'comp-team-horizontal',
    label: 'Team Horizontal',
    category: 'components',
    subcategory: 'team',
    tags: ['team', 'horizontal', 'bio', 'dark', 'clean'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Team Horizontal',
      defaultStyle: { width: '100%', minHeight: '440px' },
      defaultContent: {
        html: `<style>.tm-hz{background:#0a0a0a;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif}.tm-hz-h{font-size:clamp(28px,3vw,40px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0 0 48px 0}.tm-hz-list{display:flex;flex-direction:column;gap:24px;max-width:800px}.tm-hz-card{display:flex;gap:32px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px;transition:border-color 0.3s}.tm-hz-card:hover{border-color:rgba(255,255,255,0.15)}.tm-hz-photo{width:120px;height:120px;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;color:rgba(255,255,255,0.3)}.tm-hz-photo-1{background:linear-gradient(135deg,#1a1a2e,#16213e)}.tm-hz-photo-2{background:linear-gradient(135deg,#2e1a1a,#2e1621)}.tm-hz-info{display:flex;flex-direction:column;justify-content:center;gap:8px}.tm-hz-name{font-size:20px;font-weight:600;color:#fff;margin:0;letter-spacing:-0.01em}.tm-hz-role{font-size:13px;color:rgba(255,255,255,0.35);margin:0;font-weight:500}.tm-hz-bio{font-size:14px;color:rgba(255,255,255,0.4);margin:4px 0 0 0;line-height:1.6;max-width:480px}@media(max-width:640px){.tm-hz-card{flex-direction:column;align-items:center;text-align:center}.tm-hz-bio{max-width:none}}</style><section class="tm-hz"><h2 class="tm-hz-h">Leadership</h2><div class="tm-hz-list"><div class="tm-hz-card"><div class="tm-hz-photo tm-hz-photo-1">NR</div><div class="tm-hz-info"><p class="tm-hz-name">Nadia Rousseau</p><p class="tm-hz-role">Co-Founder & CEO</p><p class="tm-hz-bio">Former design lead at a top agency, Nadia brings 12 years of experience in building digital products that merge aesthetics with performance.</p></div></div><div class="tm-hz-card"><div class="tm-hz-photo tm-hz-photo-2">DW</div><div class="tm-hz-info"><p class="tm-hz-name">David Wu</p><p class="tm-hz-role">Co-Founder & CTO</p><p class="tm-hz-bio">Systems architect with a background in distributed computing. David ensures our platform scales elegantly from day one.</p></div></div></div></section>`
      }
    }
  },
  {
    id: 'comp-team-minimal',
    label: 'Team Minimal',
    category: 'components',
    subcategory: 'team',
    tags: ['team', 'minimal', 'hover', 'clean', 'dark'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Team Minimal',
      defaultStyle: { width: '100%', minHeight: '320px' },
      defaultContent: {
        html: `<style>.tm-mn{background:#0a0a0a;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif}.tm-mn-h{font-size:clamp(28px,3vw,40px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0 0 48px 0}.tm-mn-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;max-width:900px}.tm-mn-member{padding:24px;border-radius:12px;cursor:pointer;transition:background 0.3s;position:relative;overflow:hidden}.tm-mn-member:hover{background:rgba(255,255,255,0.04)}.tm-mn-name{font-size:16px;font-weight:600;color:#fff;margin:0 0 4px 0;letter-spacing:-0.01em}.tm-mn-role{font-size:13px;color:rgba(255,255,255,0.35);margin:0}.tm-mn-avatar{width:48px;height:48px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:rgba(255,255,255,0.3);margin-top:12px;opacity:0;transform:translateY(8px);transition:opacity 0.3s,transform 0.3s}.tm-mn-av-1{background:linear-gradient(135deg,#1a1a2e,#16213e)}.tm-mn-av-2{background:linear-gradient(135deg,#2e1a1a,#2e1621)}.tm-mn-av-3{background:linear-gradient(135deg,#1a2e1a,#162e21)}.tm-mn-av-4{background:linear-gradient(135deg,#2e2e1a,#21291e)}.tm-mn-member:hover .tm-mn-avatar{opacity:1;transform:translateY(0)}@media(max-width:768px){.tm-mn-grid{grid-template-columns:repeat(2,1fr)}}</style><section class="tm-mn"><h2 class="tm-mn-h">The Team</h2><div class="tm-mn-grid"><div class="tm-mn-member"><p class="tm-mn-name">Claire Dubois</p><p class="tm-mn-role">Design Lead</p><div class="tm-mn-avatar tm-mn-av-1">CD</div></div><div class="tm-mn-member"><p class="tm-mn-name">Lucas Rivera</p><p class="tm-mn-role">Frontend Engineer</p><div class="tm-mn-avatar tm-mn-av-2">LR</div></div><div class="tm-mn-member"><p class="tm-mn-name">Yuki Tanaka</p><p class="tm-mn-role">Product Strategist</p><div class="tm-mn-avatar tm-mn-av-3">YT</div></div><div class="tm-mn-member"><p class="tm-mn-name">Omar Hassan</p><p class="tm-mn-role">Backend Engineer</p><div class="tm-mn-avatar tm-mn-av-4">OH</div></div></div></section>`
      }
    }
  },
  {
    id: 'comp-team-founder',
    label: 'Founder Spotlight',
    category: 'components',
    subcategory: 'team',
    tags: ['team', 'founder', 'solo', 'spotlight', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Founder Spotlight',
      defaultStyle: { width: '100%', minHeight: '480px' },
      defaultContent: {
        html: `<style>.tm-fd{background:#0a0a0a;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif}.tm-fd-inner{display:grid;grid-template-columns:1fr 1fr;gap:64px;max-width:1000px;align-items:center}.tm-fd-photo{aspect-ratio:4/5;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:700;color:rgba(255,255,255,0.2);background:linear-gradient(135deg,#1a1a2e,#0f0f23);position:relative;overflow:hidden}.tm-fd-photo::after{content:'';position:absolute;inset:0;border:1px solid rgba(255,255,255,0.08);border-radius:16px;pointer-events:none}.tm-fd-info{display:flex;flex-direction:column;gap:20px}.tm-fd-label{font-size:12px;font-weight:600;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.1em;margin:0}.tm-fd-name{font-size:clamp(28px,3vw,40px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0;line-height:1.15}.tm-fd-title{font-size:16px;color:rgba(124,58,237,0.8);font-weight:500;margin:0}.tm-fd-bio{font-size:15px;color:rgba(255,255,255,0.45);margin:0;line-height:1.7;max-width:440px}.tm-fd-social{display:flex;gap:12px;margin-top:8px}.tm-fd-social a{width:40px;height:40px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:rgba(255,255,255,0.4);text-decoration:none;transition:background 0.3s,color 0.3s,border-color 0.3s}.tm-fd-social a:hover{background:rgba(255,255,255,0.1);color:#fff;border-color:rgba(255,255,255,0.15)}@media(max-width:768px){.tm-fd-inner{grid-template-columns:1fr;text-align:center}.tm-fd-photo{max-width:300px;margin:0 auto}.tm-fd-info{align-items:center}.tm-fd-bio{max-width:none}}</style><section class="tm-fd"><div class="tm-fd-inner"><div class="tm-fd-photo">JL</div><div class="tm-fd-info"><p class="tm-fd-label">Founder & Creative Director</p><h2 class="tm-fd-name">Julien Laurent</h2><p class="tm-fd-title">Building premium digital experiences since 2014</p><p class="tm-fd-bio">With over a decade of experience in web design and development, Julien founded JL Studio with a singular vision: to craft digital experiences that feel as intentional and refined as the brands they represent. Every pixel, every interaction, every detail matters.</p><div class="tm-fd-social"><a href="#">Li</a><a href="#">Tw</a><a href="#">Dr</a><a href="#">Be</a></div></div></div></section>`
      }
    }
  },
]

// ─── GALLERY SECTIONS (5 premium presets) ───

const GALLERY_SECTIONS: LibraryElementItem[] = [
  {
    id: 'comp-gallery-grid',
    label: 'Gallery Grid',
    category: 'components',
    subcategory: 'gallery',
    tags: ['gallery', 'grid', 'hover', 'overlay', 'dark'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Gallery Grid',
      defaultStyle: { width: '100%', minHeight: '520px' },
      defaultContent: {
        html: `<style>.gl-gr{background:#0a0a0a;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif}.gl-gr-h{font-size:clamp(28px,3vw,40px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0 0 48px 0;text-align:center}.gl-gr-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:1000px;margin:0 auto}.gl-gr-item{position:relative;border-radius:12px;overflow:hidden;aspect-ratio:4/3;cursor:pointer}.gl-gr-img{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.05em;transition:transform 0.5s}.gl-gr-img-1{background:linear-gradient(135deg,#1a1a2e,#16213e)}.gl-gr-img-2{background:linear-gradient(135deg,#2e1a1a,#2e1621)}.gl-gr-img-3{background:linear-gradient(135deg,#1a2e1a,#162e21)}.gl-gr-img-4{background:linear-gradient(135deg,#2e2e1a,#21291e)}.gl-gr-img-5{background:linear-gradient(135deg,#1a2e2e,#16212e)}.gl-gr-img-6{background:linear-gradient(135deg,#2e1a2e,#211621)}.gl-gr-item:hover .gl-gr-img{transform:scale(1.05)}.gl-gr-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 50%);opacity:0;transition:opacity 0.3s;display:flex;align-items:flex-end;padding:20px}.gl-gr-item:hover .gl-gr-overlay{opacity:1}.gl-gr-title{font-size:14px;font-weight:600;color:#fff;margin:0}@media(max-width:768px){.gl-gr-grid{grid-template-columns:repeat(2,1fr)}}</style><section class="gl-gr"><h2 class="gl-gr-h">Gallery</h2><div class="gl-gr-grid"><div class="gl-gr-item"><div class="gl-gr-img gl-gr-img-1">Photo 1</div><div class="gl-gr-overlay"><p class="gl-gr-title">Mountain Retreat</p></div></div><div class="gl-gr-item"><div class="gl-gr-img gl-gr-img-2">Photo 2</div><div class="gl-gr-overlay"><p class="gl-gr-title">Urban Architecture</p></div></div><div class="gl-gr-item"><div class="gl-gr-img gl-gr-img-3">Photo 3</div><div class="gl-gr-overlay"><p class="gl-gr-title">Coastal Sunset</p></div></div><div class="gl-gr-item"><div class="gl-gr-img gl-gr-img-4">Photo 4</div><div class="gl-gr-overlay"><p class="gl-gr-title">Forest Canopy</p></div></div><div class="gl-gr-item"><div class="gl-gr-img gl-gr-img-5">Photo 5</div><div class="gl-gr-overlay"><p class="gl-gr-title">Desert Dunes</p></div></div><div class="gl-gr-item"><div class="gl-gr-img gl-gr-img-6">Photo 6</div><div class="gl-gr-overlay"><p class="gl-gr-title">Night Skyline</p></div></div></div></section>`
      }
    }
  },
  {
    id: 'comp-gallery-masonry',
    label: 'Gallery Masonry',
    category: 'components',
    subcategory: 'gallery',
    tags: ['gallery', 'masonry', 'columns', 'hover', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Gallery Masonry',
      defaultStyle: { width: '100%', minHeight: '580px' },
      defaultContent: {
        html: `<style>.gl-ms{background:#0a0a0a;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif}.gl-ms-h{font-size:clamp(28px,3vw,40px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0 0 48px 0;text-align:center}.gl-ms-grid{columns:3;column-gap:16px;max-width:1000px;margin:0 auto}.gl-ms-item{break-inside:avoid;margin-bottom:16px;border-radius:12px;overflow:hidden;position:relative;cursor:pointer}.gl-ms-img{width:100%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.05em;transition:transform 0.5s}.gl-ms-item:hover .gl-ms-img{transform:scale(1.04)}.gl-ms-img-1{background:linear-gradient(135deg,#1a1a2e,#16213e);height:280px}.gl-ms-img-2{background:linear-gradient(135deg,#2e1a1a,#2e1621);height:200px}.gl-ms-img-3{background:linear-gradient(135deg,#1a2e1a,#162e21);height:320px}.gl-ms-img-4{background:linear-gradient(135deg,#2e2e1a,#21291e);height:240px}.gl-ms-img-5{background:linear-gradient(135deg,#1a2e2e,#16212e);height:300px}.gl-ms-img-6{background:linear-gradient(135deg,#2e1a2e,#211621);height:220px}@media(max-width:768px){.gl-ms-grid{columns:2}}</style><section class="gl-ms"><h2 class="gl-ms-h">Portfolio</h2><div class="gl-ms-grid"><div class="gl-ms-item"><div class="gl-ms-img gl-ms-img-1">Photo 1</div></div><div class="gl-ms-item"><div class="gl-ms-img gl-ms-img-2">Photo 2</div></div><div class="gl-ms-item"><div class="gl-ms-img gl-ms-img-3">Photo 3</div></div><div class="gl-ms-item"><div class="gl-ms-img gl-ms-img-4">Photo 4</div></div><div class="gl-ms-item"><div class="gl-ms-img gl-ms-img-5">Photo 5</div></div><div class="gl-ms-item"><div class="gl-ms-img gl-ms-img-6">Photo 6</div></div></div></section>`
      }
    }
  },
  {
    id: 'comp-gallery-carousel',
    label: 'Gallery Carousel',
    category: 'components',
    subcategory: 'gallery',
    tags: ['gallery', 'carousel', 'slider', 'arrows', 'dark'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Gallery Carousel',
      defaultStyle: { width: '100%', minHeight: '480px' },
      defaultContent: {
        html: `<style>.gl-cr{background:#0a0a0a;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif}.gl-cr-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px}.gl-cr-h{font-size:clamp(28px,3vw,40px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0}.gl-cr-nav{display:flex;align-items:center;gap:16px}.gl-cr-counter{font-size:14px;color:rgba(255,255,255,0.35);font-variant-numeric:tabular-nums}.gl-cr-btn{width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background 0.3s,border-color 0.3s;color:rgba(255,255,255,0.5);font-size:18px}.gl-cr-btn:hover{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.2);color:#fff}.gl-cr-track{display:flex;gap:16px;overflow-x:auto;scroll-behavior:smooth;scrollbar-width:none;-ms-overflow-style:none;padding-bottom:8px}.gl-cr-track::-webkit-scrollbar{display:none}.gl-cr-slide{flex-shrink:0;width:360px;aspect-ratio:3/2;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.05em;transition:transform 0.3s;cursor:pointer}.gl-cr-slide:hover{transform:scale(1.02)}.gl-cr-s1{background:linear-gradient(135deg,#1a1a2e,#16213e)}.gl-cr-s2{background:linear-gradient(135deg,#2e1a1a,#2e1621)}.gl-cr-s3{background:linear-gradient(135deg,#1a2e1a,#162e21)}.gl-cr-s4{background:linear-gradient(135deg,#2e2e1a,#21291e)}.gl-cr-s5{background:linear-gradient(135deg,#1a2e2e,#16212e)}</style><section class="gl-cr"><div class="gl-cr-top"><h2 class="gl-cr-h">Work</h2><div class="gl-cr-nav"><span class="gl-cr-counter">1 / 5</span><button class="gl-cr-btn" onclick="document.querySelector('.gl-cr-track').scrollBy({left:-376,behavior:'smooth'})">&larr;</button><button class="gl-cr-btn" onclick="document.querySelector('.gl-cr-track').scrollBy({left:376,behavior:'smooth'})">&rarr;</button></div></div><div class="gl-cr-track"><div class="gl-cr-slide gl-cr-s1">Project 1</div><div class="gl-cr-slide gl-cr-s2">Project 2</div><div class="gl-cr-slide gl-cr-s3">Project 3</div><div class="gl-cr-slide gl-cr-s4">Project 4</div><div class="gl-cr-slide gl-cr-s5">Project 5</div></div></section>`
      }
    }
  },
  {
    id: 'comp-gallery-lightbox',
    label: 'Gallery Lightbox',
    category: 'components',
    subcategory: 'gallery',
    tags: ['gallery', 'lightbox', 'modal', 'thumbnails', 'dark'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Gallery Lightbox',
      defaultStyle: { width: '100%', minHeight: '480px' },
      defaultContent: {
        html: `<style>.gl-lb{background:#0a0a0a;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif}.gl-lb-h{font-size:clamp(28px,3vw,40px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0 0 48px 0;text-align:center}.gl-lb-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:900px;margin:0 auto}.gl-lb-thumb{aspect-ratio:1;border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.05em;transition:transform 0.3s,opacity 0.3s;position:relative;overflow:hidden}.gl-lb-thumb:hover{transform:scale(1.03)}.gl-lb-th-1{background:linear-gradient(135deg,#1a1a2e,#16213e)}.gl-lb-th-2{background:linear-gradient(135deg,#2e1a1a,#2e1621)}.gl-lb-th-3{background:linear-gradient(135deg,#1a2e1a,#162e21)}.gl-lb-th-4{background:linear-gradient(135deg,#2e2e1a,#21291e)}.gl-lb-zoom{position:absolute;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s;font-size:24px;color:#fff}.gl-lb-thumb:hover .gl-lb-zoom{opacity:1}.gl-lb-modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;align-items:center;justify-content:center;flex-direction:column;gap:20px}.gl-lb-modal.gl-lb-active{display:flex}.gl-lb-modal-img{width:70vw;max-width:700px;aspect-ratio:16/10;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:600;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.05em}.gl-lb-close{position:absolute;top:24px;right:24px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.08);border:none;color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.3s}.gl-lb-close:hover{background:rgba(255,255,255,0.15)}@media(max-width:640px){.gl-lb-grid{grid-template-columns:repeat(2,1fr)}}</style><section class="gl-lb"><h2 class="gl-lb-h">Selected Work</h2><div class="gl-lb-grid"><div class="gl-lb-thumb gl-lb-th-1" onclick="document.getElementById('gl-lb-m').classList.add('gl-lb-active');document.getElementById('gl-lb-mi').className='gl-lb-modal-img gl-lb-th-1';document.getElementById('gl-lb-mi').textContent='Photo 1'">Photo 1<div class="gl-lb-zoom">+</div></div><div class="gl-lb-thumb gl-lb-th-2" onclick="document.getElementById('gl-lb-m').classList.add('gl-lb-active');document.getElementById('gl-lb-mi').className='gl-lb-modal-img gl-lb-th-2';document.getElementById('gl-lb-mi').textContent='Photo 2'">Photo 2<div class="gl-lb-zoom">+</div></div><div class="gl-lb-thumb gl-lb-th-3" onclick="document.getElementById('gl-lb-m').classList.add('gl-lb-active');document.getElementById('gl-lb-mi').className='gl-lb-modal-img gl-lb-th-3';document.getElementById('gl-lb-mi').textContent='Photo 3'">Photo 3<div class="gl-lb-zoom">+</div></div><div class="gl-lb-thumb gl-lb-th-4" onclick="document.getElementById('gl-lb-m').classList.add('gl-lb-active');document.getElementById('gl-lb-mi').className='gl-lb-modal-img gl-lb-th-4';document.getElementById('gl-lb-mi').textContent='Photo 4'">Photo 4<div class="gl-lb-zoom">+</div></div></div><div class="gl-lb-modal" id="gl-lb-m"><button class="gl-lb-close" onclick="document.getElementById('gl-lb-m').classList.remove('gl-lb-active')">&times;</button><div class="gl-lb-modal-img gl-lb-th-1" id="gl-lb-mi">Photo 1</div></div></section>`
      }
    }
  },
  {
    id: 'comp-gallery-fullwidth',
    label: 'Gallery Full Width',
    category: 'components',
    subcategory: 'gallery',
    tags: ['gallery', 'fullwidth', 'portfolio', 'hero', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Gallery Full Width',
      defaultStyle: { width: '100%', minHeight: '640px' },
      defaultContent: {
        html: `<style>.gl-fw{background:#0a0a0a;padding:80px 0;font-family:system-ui,-apple-system,sans-serif}.gl-fw-hdr{padding:0 48px;margin-bottom:48px;text-align:center}.gl-fw-h{font-size:clamp(28px,3vw,40px);font-weight:700;color:#fff;letter-spacing:-0.03em;margin:0 0 12px 0}.gl-fw-sub{font-size:15px;color:rgba(255,255,255,0.4);margin:0}.gl-fw-hero{width:100%;aspect-ratio:21/9;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:600;color:rgba(255,255,255,0.2);text-transform:uppercase;letter-spacing:0.05em;background:linear-gradient(135deg,#1a1a2e,#0f0f23);margin-bottom:16px;position:relative;overflow:hidden;cursor:pointer;transition:filter 0.3s}.gl-fw-hero:hover{filter:brightness(1.1)}.gl-fw-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:0 48px}.gl-fw-item{aspect-ratio:4/3;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.05em;cursor:pointer;transition:transform 0.3s;overflow:hidden}.gl-fw-item:hover{transform:scale(1.03)}.gl-fw-i1{background:linear-gradient(135deg,#2e1a1a,#2e1621)}.gl-fw-i2{background:linear-gradient(135deg,#1a2e1a,#162e21)}.gl-fw-i3{background:linear-gradient(135deg,#2e2e1a,#21291e)}.gl-fw-i4{background:linear-gradient(135deg,#1a2e2e,#16212e)}@media(max-width:768px){.gl-fw-row{grid-template-columns:repeat(2,1fr);padding:0 24px}.gl-fw-hdr{padding:0 24px}}</style><section class="gl-fw"><div class="gl-fw-hdr"><h2 class="gl-fw-h">Portfolio</h2><p class="gl-fw-sub">A selection of recent work</p></div><div class="gl-fw-hero">Featured Project</div><div class="gl-fw-row"><div class="gl-fw-item gl-fw-i1">Project 1</div><div class="gl-fw-item gl-fw-i2">Project 2</div><div class="gl-fw-item gl-fw-i3">Project 3</div><div class="gl-fw-item gl-fw-i4">Project 4</div></div></section>`
      }
    }
  },
]

// ─── MISC SECTIONS (6 premium presets) ───

const MISC_SECTIONS: LibraryElementItem[] = [
  {
    id: 'comp-cookie-banner',
    label: 'Cookie Consent',
    category: 'components',
    subcategory: 'misc',
    tags: ['cookie', 'banner', 'consent', 'gdpr', 'dark'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Cookie Consent',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: {
        html: `<style>.ck-bn{background:#0a0a0a;font-family:system-ui,-apple-system,sans-serif;position:relative;min-height:200px;display:flex;align-items:flex-end;justify-content:center;padding:20px}.ck-bn-bar{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;width:100%;max-width:800px;animation:ckSlide 0.5s ease-out;backdrop-filter:blur(12px)}.ck-bn-text{font-size:14px;color:rgba(255,255,255,0.5);line-height:1.5;margin:0}.ck-bn-text strong{color:#fff;font-weight:600}.ck-bn-btns{display:flex;gap:8px;flex-shrink:0}.ck-bn-accept{font-size:13px;font-weight:600;color:#0a0a0a;background:#fff;padding:10px 20px;border-radius:8px;border:none;cursor:pointer;transition:transform 0.2s;font-family:inherit}.ck-bn-accept:hover{transform:translateY(-1px)}.ck-bn-decline{font-size:13px;font-weight:600;color:rgba(255,255,255,0.5);background:transparent;padding:10px 20px;border-radius:8px;border:1px solid rgba(255,255,255,0.12);cursor:pointer;transition:border-color 0.3s,color 0.3s;font-family:inherit}.ck-bn-decline:hover{border-color:rgba(255,255,255,0.25);color:#fff}@keyframes ckSlide{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}@media(max-width:640px){.ck-bn-bar{flex-direction:column;text-align:center}.ck-bn-btns{width:100%}.ck-bn-accept,.ck-bn-decline{flex:1}}</style><div class="ck-bn"><div class="ck-bn-bar"><p class="ck-bn-text"><strong>We value your privacy.</strong> We use cookies to enhance your experience. By continuing, you agree to our cookie policy.</p><div class="ck-bn-btns"><button class="ck-bn-decline">Decline</button><button class="ck-bn-accept">Accept All</button></div></div></div>`
      }
    }
  },
  {
    id: 'comp-notification-toast',
    label: 'Notification Toast',
    category: 'components',
    subcategory: 'misc',
    tags: ['toast', 'notification', 'alert', 'dismiss', 'dark'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Notification Toast',
      defaultStyle: { width: '100%', minHeight: '120px' },
      defaultContent: {
        html: `<style>.nt-ts{background:#0a0a0a;font-family:system-ui,-apple-system,sans-serif;min-height:160px;display:flex;justify-content:flex-end;align-items:flex-start;padding:24px}.nt-ts-card{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px 20px;display:flex;align-items:flex-start;gap:14px;min-width:320px;max-width:400px;animation:ntSlide 0.4s ease-out;position:relative;overflow:hidden;backdrop-filter:blur(12px)}.nt-ts-icon{width:36px;height:36px;border-radius:8px;background:rgba(34,197,94,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px;color:#22c55e}.nt-ts-body{flex:1;display:flex;flex-direction:column;gap:4px}.nt-ts-title{font-size:14px;font-weight:600;color:#fff;margin:0}.nt-ts-msg{font-size:13px;color:rgba(255,255,255,0.4);margin:0;line-height:1.4}.nt-ts-close{background:none;border:none;color:rgba(255,255,255,0.3);font-size:16px;cursor:pointer;padding:0;line-height:1;transition:color 0.3s;flex-shrink:0}.nt-ts-close:hover{color:#fff}.nt-ts-timer{position:absolute;bottom:0;left:0;height:2px;background:rgba(34,197,94,0.4);animation:ntTimer 5s linear forwards;border-radius:0 0 12px 12px}@keyframes ntSlide{from{transform:translateX(20px);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes ntTimer{from{width:100%}to{width:0%}}</style><div class="nt-ts"><div class="nt-ts-card"><div class="nt-ts-icon">&#10003;</div><div class="nt-ts-body"><p class="nt-ts-title">Changes saved</p><p class="nt-ts-msg">Your project has been updated successfully.</p></div><button class="nt-ts-close">&times;</button><div class="nt-ts-timer"></div></div></div>`
      }
    }
  },
  {
    id: 'comp-modal-dialog',
    label: 'Modal Dialog',
    category: 'components',
    subcategory: 'misc',
    tags: ['modal', 'dialog', 'overlay', 'confirm', 'dark'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Modal Dialog',
      defaultStyle: { width: '100%', minHeight: '400px' },
      defaultContent: {
        html: `<style>.md-dl{background:#0a0a0a;font-family:system-ui,-apple-system,sans-serif;min-height:400px;display:flex;align-items:center;justify-content:center;position:relative}.md-dl-backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.6);cursor:pointer}.md-dl-box{position:relative;background:#111;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:32px;width:100%;max-width:440px;animation:mdFade 0.3s ease-out;z-index:1}.md-dl-close{position:absolute;top:16px;right:16px;background:none;border:none;color:rgba(255,255,255,0.3);font-size:18px;cursor:pointer;width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;transition:background 0.3s,color 0.3s}.md-dl-close:hover{background:rgba(255,255,255,0.08);color:#fff}.md-dl-h{font-size:20px;font-weight:700;color:#fff;margin:0 0 12px 0;letter-spacing:-0.02em}.md-dl-p{font-size:14px;color:rgba(255,255,255,0.45);margin:0 0 28px 0;line-height:1.6}.md-dl-btns{display:flex;justify-content:flex-end;gap:10px}.md-dl-cancel{font-size:14px;font-weight:500;color:rgba(255,255,255,0.5);background:rgba(255,255,255,0.06);padding:10px 20px;border-radius:8px;border:none;cursor:pointer;transition:background 0.3s;font-family:inherit}.md-dl-cancel:hover{background:rgba(255,255,255,0.1)}.md-dl-confirm{font-size:14px;font-weight:600;color:#0a0a0a;background:#fff;padding:10px 20px;border-radius:8px;border:none;cursor:pointer;transition:transform 0.2s;font-family:inherit}.md-dl-confirm:hover{transform:translateY(-1px)}@keyframes mdFade{from{transform:scale(0.96);opacity:0}to{transform:scale(1);opacity:1}}</style><div class="md-dl"><div class="md-dl-backdrop"></div><div class="md-dl-box"><button class="md-dl-close">&times;</button><h3 class="md-dl-h">Delete project?</h3><p class="md-dl-p">This action cannot be undone. All data associated with this project will be permanently removed from our servers.</p><div class="md-dl-btns"><button class="md-dl-cancel">Cancel</button><button class="md-dl-confirm">Confirm</button></div></div></div>`
      }
    }
  },
  {
    id: 'comp-back-to-top',
    label: 'Back to Top',
    category: 'components',
    subcategory: 'misc',
    tags: ['back-to-top', 'scroll', 'button', 'utility', 'dark'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Back to Top',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: {
        html: `<style>.btt{background:#0a0a0a;font-family:system-ui,-apple-system,sans-serif;min-height:200px;display:flex;align-items:flex-end;justify-content:flex-end;padding:32px;position:relative}.btt-info{position:absolute;top:24px;left:24px;font-size:13px;color:rgba(255,255,255,0.2);font-style:italic}.btt-btn{width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background 0.3s,transform 0.3s,border-color 0.3s;animation:bttPulse 2s ease-in-out infinite}.btt-btn:hover{background:rgba(255,255,255,0.15);transform:translateY(-2px);border-color:rgba(255,255,255,0.25);animation:none}.btt-btn svg{width:20px;height:20px;stroke:#fff;fill:none;stroke-width:2}@keyframes bttPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,0.1)}50%{box-shadow:0 0 0 8px rgba(255,255,255,0)}}</style><div class="btt"><span class="btt-info">Appears on scroll (demo)</span><button class="btt-btn" onclick="window.scrollTo({top:0,behavior:'smooth'})"><svg viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg></button></div>`
      }
    }
  },
  {
    id: 'comp-breadcrumb',
    label: 'Breadcrumbs',
    category: 'components',
    subcategory: 'misc',
    tags: ['breadcrumb', 'navigation', 'path', 'utility', 'dark'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Breadcrumbs',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: {
        html: `<style>.bc-nav{background:#0a0a0a;padding:20px 48px;font-family:system-ui,-apple-system,sans-serif}.bc-list{display:flex;align-items:center;gap:8px;list-style:none;margin:0;padding:0;flex-wrap:wrap}.bc-item{display:flex;align-items:center;gap:8px}.bc-link{font-size:14px;color:rgba(255,255,255,0.4);text-decoration:none;transition:color 0.3s;cursor:pointer}.bc-link:hover{color:#fff}.bc-sep{font-size:12px;color:rgba(255,255,255,0.15)}.bc-current{font-size:14px;color:#fff;font-weight:500}</style><nav class="bc-nav"><ol class="bc-list"><li class="bc-item"><a class="bc-link" href="#">Home</a><span class="bc-sep">&rsaquo;</span></li><li class="bc-item"><a class="bc-link" href="#">Products</a><span class="bc-sep">&rsaquo;</span></li><li class="bc-item"><a class="bc-link" href="#">Electronics</a><span class="bc-sep">&rsaquo;</span></li><li class="bc-item"><span class="bc-current">Wireless Headphones</span></li></ol></nav>`
      }
    }
  },
  {
    id: 'comp-empty-state',
    label: 'Empty State',
    category: 'components',
    subcategory: 'misc',
    tags: ['empty-state', 'placeholder', 'no-data', 'illustration', 'dark'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Empty State',
      defaultStyle: { width: '100%', minHeight: '400px' },
      defaultContent: {
        html: `<style>.es-wrap{background:#0a0a0a;display:flex;align-items:center;justify-content:center;padding:80px 48px;font-family:system-ui,-apple-system,sans-serif;min-height:400px}.es-box{display:flex;flex-direction:column;align-items:center;text-align:center;gap:20px;max-width:400px}.es-illust{width:120px;height:120px;border-radius:24px;background:rgba(255,255,255,0.04);border:1px dashed rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center}.es-illust svg{width:48px;height:48px;stroke:rgba(255,255,255,0.15);fill:none;stroke-width:1.5}.es-h{font-size:20px;font-weight:700;color:#fff;margin:0;letter-spacing:-0.02em}.es-p{font-size:14px;color:rgba(255,255,255,0.4);margin:0;line-height:1.6}.es-btn{font-size:14px;font-weight:600;color:#0a0a0a;background:#fff;padding:12px 28px;border-radius:8px;border:none;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit;margin-top:4px}.es-btn:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(255,255,255,0.15)}</style><div class="es-wrap"><div class="es-box"><div class="es-illust"><svg viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg></div><h3 class="es-h">No projects yet</h3><p class="es-p">Get started by creating your first project. It only takes a minute to set up.</p><button class="es-btn">Create Project</button></div></div>`
      }
    }
  },
]

// ─── FORMS (8 premium form presets) ───

const FORMS: LibraryElementItem[] = [
  {
    id: 'comp-form-contact',
    label: 'Contact Form',
    category: 'components',
    subcategory: 'forms',
    tags: ['form', 'contact', 'email', 'message', 'glassmorphic'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Contact Form',
      defaultStyle: { width: '100%', minHeight: '420px' },
      defaultContent: {
        html: `<style>.cf-wrap{background:rgba(255,255,255,0.04);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:48px;max-width:520px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif}.cf-title{font-size:24px;font-weight:600;color:#f0f0f0;margin:0 0 8px}.cf-sub{font-size:14px;color:rgba(255,255,255,0.45);margin:0 0 32px;line-height:1.6}.cf-field{display:flex;flex-direction:column;gap:6px;margin-bottom:20px}.cf-label{font-size:12px;font-weight:500;color:rgba(255,255,255,0.55);text-transform:uppercase;letter-spacing:0.06em}.cf-input{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 16px;font-size:14px;color:#f0f0f0;outline:none;transition:border-color 0.3s,box-shadow 0.3s;font-family:inherit}.cf-input:focus{border-color:rgba(99,139,255,0.6);box-shadow:0 0 0 3px rgba(99,139,255,0.15)}.cf-textarea{resize:vertical;min-height:110px}.cf-btn{width:100%;padding:14px;background:linear-gradient(135deg,#4F6EF7,#638BFF);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit;margin-top:8px}.cf-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(79,110,247,0.3)}</style><div class="cf-wrap"><h3 class="cf-title">Get in Touch</h3><p class="cf-sub">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p><div class="cf-field"><label class="cf-label">Full Name</label><input class="cf-input" type="text" placeholder="John Doe"/></div><div class="cf-field"><label class="cf-label">Email</label><input class="cf-input" type="email" placeholder="john@example.com"/></div><div class="cf-field"><label class="cf-label">Message</label><textarea class="cf-input cf-textarea" placeholder="Your message..."></textarea></div><button class="cf-btn">Send Message</button></div>`
      },
    },
  },
  {
    id: 'comp-form-newsletter',
    label: 'Newsletter Inline',
    category: 'components',
    subcategory: 'forms',
    tags: ['form', 'newsletter', 'email', 'subscribe', 'inline', 'minimal'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Newsletter Form',
      defaultStyle: { width: '100%', minHeight: '80px' },
      defaultContent: {
        html: `<style>.nl-wrap{display:flex;align-items:center;gap:12px;max-width:520px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif}.nl-input{flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:10px;padding:14px 18px;font-size:14px;color:#f0f0f0;outline:none;transition:border-color 0.3s;font-family:inherit}.nl-input::placeholder{color:rgba(255,255,255,0.3)}.nl-input:focus{border-color:rgba(99,139,255,0.5)}.nl-btn{padding:14px 28px;background:#fff;color:#0a0a0a;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;transition:transform 0.2s,opacity 0.2s;font-family:inherit}.nl-btn:hover{transform:translateY(-1px);opacity:0.9}</style><div class="nl-wrap"><input class="nl-input" type="email" placeholder="Enter your email address"/><button class="nl-btn">Subscribe</button></div>`
      },
    },
  },
  {
    id: 'comp-form-login',
    label: 'Login Form',
    category: 'components',
    subcategory: 'forms',
    tags: ['form', 'login', 'auth', 'sign-in', 'card'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Login Form',
      defaultStyle: { width: '100%', minHeight: '380px' },
      defaultContent: {
        html: `<style>.lf-wrap{background:rgba(255,255,255,0.04);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:48px;max-width:400px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif;text-align:center}.lf-title{font-size:22px;font-weight:600;color:#f0f0f0;margin:0 0 6px}.lf-sub{font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 32px}.lf-field{text-align:left;margin-bottom:18px}.lf-label{display:block;font-size:12px;font-weight:500;color:rgba(255,255,255,0.55);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px}.lf-input{width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 16px;font-size:14px;color:#f0f0f0;outline:none;transition:border-color 0.3s,box-shadow 0.3s;font-family:inherit}.lf-input:focus{border-color:rgba(99,139,255,0.6);box-shadow:0 0 0 3px rgba(99,139,255,0.15)}.lf-btn{width:100%;padding:14px;background:linear-gradient(135deg,#4F6EF7,#638BFF);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit;margin-top:8px}.lf-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(79,110,247,0.3)}.lf-forgot{display:inline-block;margin-top:16px;font-size:13px;color:rgba(99,139,255,0.8);text-decoration:none;cursor:pointer;transition:color 0.3s}.lf-forgot:hover{color:#638BFF}</style><div class="lf-wrap"><h3 class="lf-title">Welcome Back</h3><p class="lf-sub">Sign in to your account</p><div class="lf-field"><label class="lf-label">Email</label><input class="lf-input" type="email" placeholder="you@example.com"/></div><div class="lf-field"><label class="lf-label">Password</label><input class="lf-input" type="password" placeholder="••••••••"/></div><button class="lf-btn">Sign In</button><a class="lf-forgot">Forgot password?</a></div>`
      },
    },
  },
  {
    id: 'comp-form-signup',
    label: 'Signup Form',
    category: 'components',
    subcategory: 'forms',
    tags: ['form', 'signup', 'register', 'auth', 'card'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Signup Form',
      defaultStyle: { width: '100%', minHeight: '520px' },
      defaultContent: {
        html: `<style>.sf-wrap{background:#fff;border-radius:16px;padding:48px;max-width:440px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif;box-shadow:0 4px 32px rgba(0,0,0,0.06)}.sf-title{font-size:22px;font-weight:600;color:#111;margin:0 0 6px}.sf-sub{font-size:13px;color:#888;margin:0 0 28px}.sf-field{margin-bottom:16px}.sf-label{display:block;font-size:12px;font-weight:500;color:#555;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px}.sf-input{width:100%;box-sizing:border-box;background:#f7f7f8;border:1px solid #e5e5e5;border-radius:10px;padding:12px 16px;font-size:14px;color:#111;outline:none;transition:border-color 0.3s,box-shadow 0.3s;font-family:inherit}.sf-input:focus{border-color:#4F6EF7;box-shadow:0 0 0 3px rgba(79,110,247,0.1)}.sf-check{display:flex;align-items:flex-start;gap:8px;margin:20px 0 24px}.sf-checkbox{width:16px;height:16px;margin-top:2px;accent-color:#4F6EF7;cursor:pointer}.sf-check-text{font-size:13px;color:#666;line-height:1.5}.sf-check-text a{color:#4F6EF7;text-decoration:none}.sf-btn{width:100%;padding:14px;background:#111;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;transition:transform 0.2s,opacity 0.2s;font-family:inherit}.sf-btn:hover{transform:translateY(-1px);opacity:0.9}</style><div class="sf-wrap"><h3 class="sf-title">Create Account</h3><p class="sf-sub">Start your journey with us today</p><div class="sf-field"><label class="sf-label">Full Name</label><input class="sf-input" type="text" placeholder="John Doe"/></div><div class="sf-field"><label class="sf-label">Email</label><input class="sf-input" type="email" placeholder="john@example.com"/></div><div class="sf-field"><label class="sf-label">Password</label><input class="sf-input" type="password" placeholder="Min. 8 characters"/></div><div class="sf-field"><label class="sf-label">Confirm Password</label><input class="sf-input" type="password" placeholder="Re-enter password"/></div><div class="sf-check"><input class="sf-checkbox" type="checkbox"/><span class="sf-check-text">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span></div><button class="sf-btn">Create Account</button></div>`
      },
    },
  },
  {
    id: 'comp-form-search',
    label: 'Search Bar',
    category: 'components',
    subcategory: 'forms',
    tags: ['form', 'search', 'input', 'minimal', 'full-width'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Search Bar',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: {
        html: `<style>.sb-wrap{max-width:640px;margin:0 auto;position:relative;font-family:system-ui,-apple-system,sans-serif}.sb-input{width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:16px 52px 16px 48px;font-size:16px;color:#f0f0f0;outline:none;transition:border-color 0.3s,box-shadow 0.3s;font-family:inherit}.sb-input::placeholder{color:rgba(255,255,255,0.3)}.sb-input:focus{border-color:rgba(99,139,255,0.5);box-shadow:0 0 0 3px rgba(99,139,255,0.12)}.sb-icon{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:20px;height:20px;color:rgba(255,255,255,0.35)}.sb-clear{position:absolute;right:14px;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.08);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s;padding:0}.sb-clear:hover{background:rgba(255,255,255,0.15)}.sb-clear svg{width:14px;height:14px;color:rgba(255,255,255,0.5)}</style><div class="sb-wrap"><svg class="sb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><input class="sb-input" type="text" placeholder="Search anything..."/><button class="sb-clear"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button></div>`
      },
    },
  },
  {
    id: 'comp-form-multi-step',
    label: 'Multi-Step Form',
    category: 'components',
    subcategory: 'forms',
    tags: ['form', 'multi-step', 'wizard', 'progress', 'steps'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Multi-Step Form',
      defaultStyle: { width: '100%', minHeight: '380px' },
      defaultContent: {
        html: `<style>.ms-wrap{background:rgba(255,255,255,0.04);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:48px;max-width:480px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif}.ms-steps{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:36px}.ms-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.12);transition:all 0.3s}.ms-dot.active{background:#638BFF;box-shadow:0 0 12px rgba(99,139,255,0.4)}.ms-bar{width:40px;height:2px;background:rgba(255,255,255,0.08);border-radius:1px}.ms-title{font-size:18px;font-weight:600;color:#f0f0f0;margin:0 0 6px}.ms-sub{font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 28px}.ms-field{margin-bottom:18px}.ms-label{display:block;font-size:12px;font-weight:500;color:rgba(255,255,255,0.55);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px}.ms-input{width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 16px;font-size:14px;color:#f0f0f0;outline:none;transition:border-color 0.3s;font-family:inherit}.ms-input:focus{border-color:rgba(99,139,255,0.5)}.ms-btn{width:100%;padding:14px;background:linear-gradient(135deg,#4F6EF7,#638BFF);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit;margin-top:8px;display:flex;align-items:center;justify-content:center;gap:8px}.ms-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(79,110,247,0.3)}.ms-btn svg{width:16px;height:16px}</style><div class="ms-wrap"><div class="ms-steps"><span class="ms-dot active"></span><span class="ms-bar"></span><span class="ms-dot"></span><span class="ms-bar"></span><span class="ms-dot"></span></div><h3 class="ms-title">Personal Info</h3><p class="ms-sub">Step 1 of 3 — Tell us about yourself</p><div class="ms-field"><label class="ms-label">First Name</label><input class="ms-input" type="text" placeholder="John"/></div><div class="ms-field"><label class="ms-label">Last Name</label><input class="ms-input" type="text" placeholder="Doe"/></div><button class="ms-btn">Next Step <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button></div>`
      },
    },
  },
  {
    id: 'comp-form-booking',
    label: 'Booking Form',
    category: 'components',
    subcategory: 'forms',
    tags: ['form', 'booking', 'appointment', 'date', 'schedule', 'service'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Booking Form',
      defaultStyle: { width: '100%', minHeight: '520px' },
      defaultContent: {
        html: `<style>.bk-wrap{background:rgba(255,255,255,0.04);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:48px;max-width:480px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif}.bk-title{font-size:22px;font-weight:600;color:#f0f0f0;margin:0 0 6px}.bk-sub{font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 28px}.bk-section{margin-bottom:24px}.bk-label{display:block;font-size:12px;font-weight:500;color:rgba(255,255,255,0.55);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px}.bk-date-wrap{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 16px;display:flex;align-items:center;gap:10px;cursor:pointer;transition:border-color 0.3s}.bk-date-wrap:hover{border-color:rgba(99,139,255,0.4)}.bk-date-wrap svg{width:18px;height:18px;color:rgba(255,255,255,0.4)}.bk-date-text{font-size:14px;color:rgba(255,255,255,0.5)}.bk-slots{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.bk-slot{padding:10px 4px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;font-size:13px;color:rgba(255,255,255,0.6);text-align:center;cursor:pointer;transition:all 0.2s;font-family:inherit}.bk-slot:hover,.bk-slot.sel{background:rgba(99,139,255,0.15);border-color:rgba(99,139,255,0.4);color:#638BFF}.bk-field{margin-bottom:16px}.bk-input{width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 16px;font-size:14px;color:#f0f0f0;outline:none;transition:border-color 0.3s;font-family:inherit}.bk-input:focus{border-color:rgba(99,139,255,0.5)}.bk-btn{width:100%;padding:14px;background:linear-gradient(135deg,#4F6EF7,#638BFF);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit;margin-top:4px}.bk-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(79,110,247,0.3)}</style><div class="bk-wrap"><h3 class="bk-title">Book a Session</h3><p class="bk-sub">Choose a date and time that works for you</p><div class="bk-section"><label class="bk-label">Select Date</label><div class="bk-date-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg><span class="bk-date-text">Choose a date...</span></div></div><div class="bk-section"><label class="bk-label">Available Slots</label><div class="bk-slots"><span class="bk-slot">09:00</span><span class="bk-slot sel">10:00</span><span class="bk-slot">11:00</span><span class="bk-slot">14:00</span><span class="bk-slot">15:00</span><span class="bk-slot">16:00</span><span class="bk-slot">17:00</span><span class="bk-slot">18:00</span></div></div><div class="bk-field"><label class="bk-label">Your Name</label><input class="bk-input" type="text" placeholder="John Doe"/></div><div class="bk-field"><label class="bk-label">Email</label><input class="bk-input" type="email" placeholder="john@example.com"/></div><button class="bk-btn">Confirm Booking</button></div>`
      },
    },
  },
  {
    id: 'comp-form-feedback',
    label: 'Feedback Form',
    category: 'components',
    subcategory: 'forms',
    tags: ['form', 'feedback', 'rating', 'stars', 'review', 'customer'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Feedback Form',
      defaultStyle: { width: '100%', minHeight: '360px' },
      defaultContent: {
        html: `<style>.fb-wrap{background:rgba(255,255,255,0.04);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:48px;max-width:440px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif;text-align:center}.fb-title{font-size:22px;font-weight:600;color:#f0f0f0;margin:0 0 6px}.fb-sub{font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 28px}.fb-stars{display:flex;justify-content:center;gap:8px;margin-bottom:28px}.fb-star{width:36px;height:36px;cursor:pointer;transition:transform 0.2s;color:rgba(255,255,255,0.15)}.fb-star:hover,.fb-star.on{color:#FBBF24;transform:scale(1.15)}.fb-star svg{width:100%;height:100%}.fb-textarea{width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:14px 16px;font-size:14px;color:#f0f0f0;outline:none;resize:vertical;min-height:100px;transition:border-color 0.3s;font-family:inherit;margin-bottom:20px}.fb-textarea::placeholder{color:rgba(255,255,255,0.3)}.fb-textarea:focus{border-color:rgba(99,139,255,0.5)}.fb-btn{width:100%;padding:14px;background:linear-gradient(135deg,#4F6EF7,#638BFF);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit}.fb-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(79,110,247,0.3)}</style><div class="fb-wrap"><h3 class="fb-title">How was your experience?</h3><p class="fb-sub">Your feedback helps us improve</p><div class="fb-stars"><span class="fb-star on"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span><span class="fb-star on"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span><span class="fb-star on"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span><span class="fb-star on"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span><span class="fb-star"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span></div><textarea class="fb-textarea" placeholder="Tell us what you think..."></textarea><button class="fb-btn">Submit Feedback</button></div>`
      },
    },
  },
]

// ─── TESTIMONIALS (6 premium testimonial presets) ───

const TESTIMONIALS: LibraryElementItem[] = [
  {
    id: 'comp-testimonial-card',
    label: 'Testimonial Card',
    category: 'components',
    subcategory: 'testimonials',
    tags: ['testimonial', 'quote', 'review', 'glassmorphic', 'avatar'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Testimonial Card',
      defaultStyle: { width: '100%', minHeight: '280px' },
      defaultContent: {
        html: `<style>.tc-wrap{background:rgba(255,255,255,0.04);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px;max-width:480px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif}.tc-quote-mark{font-size:48px;line-height:1;color:rgba(99,139,255,0.4);font-family:Georgia,serif;margin-bottom:8px}.tc-text{font-size:16px;line-height:1.7;color:rgba(255,255,255,0.75);margin:0 0 28px;font-style:italic}.tc-author{display:flex;align-items:center;gap:14px}.tc-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#4F6EF7,#638BFF);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:600;color:#fff;flex-shrink:0}.tc-info{display:flex;flex-direction:column;gap:2px}.tc-name{font-size:14px;font-weight:600;color:#f0f0f0}.tc-role{font-size:12px;color:rgba(255,255,255,0.4)}</style><div class="tc-wrap"><div class="tc-quote-mark">\u201C</div><p class="tc-text">Working with this team has been an absolute game-changer. The attention to detail and quality of delivery exceeded all our expectations.</p><div class="tc-author"><div class="tc-avatar">SL</div><div class="tc-info"><span class="tc-name">Sarah Laurent</span><span class="tc-role">CEO, Laurent Design</span></div></div></div>`
      },
    },
  },
  {
    id: 'comp-testimonial-minimal',
    label: 'Testimonial Minimal',
    category: 'components',
    subcategory: 'testimonials',
    tags: ['testimonial', 'quote', 'minimal', 'serif', 'centered'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Testimonial Minimal',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: {
        html: `<style>.tm-wrap{text-align:center;max-width:600px;margin:0 auto;padding:40px 20px;font-family:system-ui,-apple-system,sans-serif}.tm-quote{font-family:Georgia,"Cormorant Garamond","Times New Roman",serif;font-size:clamp(20px,3vw,28px);font-style:italic;font-weight:300;line-height:1.7;color:rgba(255,255,255,0.8);margin:0 0 24px}.tm-dash{width:32px;height:1px;background:rgba(255,255,255,0.2);margin:0 auto 16px}.tm-name{font-size:13px;font-weight:500;color:rgba(255,255,255,0.45);letter-spacing:0.08em;text-transform:uppercase}</style><div class="tm-wrap"><p class="tm-quote">\u201CAn experience crafted with meticulous attention to detail, where every element speaks to a legacy of uncompromising excellence.\u201D</p><div class="tm-dash"></div><span class="tm-name">Marie Dupont</span></div>`
      },
    },
  },
  {
    id: 'comp-testimonial-stars',
    label: 'Testimonial with Stars',
    category: 'components',
    subcategory: 'testimonials',
    tags: ['testimonial', 'stars', 'rating', 'review', 'card'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Testimonial Stars',
      defaultStyle: { width: '100%', minHeight: '240px' },
      defaultContent: {
        html: `<style>.ts-wrap{background:#fff;border-radius:14px;padding:36px;max-width:440px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif;box-shadow:0 2px 20px rgba(0,0,0,0.05)}.ts-stars{display:flex;gap:4px;margin-bottom:20px}.ts-star{width:18px;height:18px;color:#FBBF24}.ts-text{font-size:15px;line-height:1.7;color:#444;margin:0 0 24px}.ts-author{display:flex;align-items:center;gap:12px}.ts-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#f0e6d9,#d4c4b0);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:#4a2711;flex-shrink:0}.ts-info{display:flex;flex-direction:column;gap:1px}.ts-name{font-size:14px;font-weight:600;color:#111}.ts-company{font-size:12px;color:#999}</style><div class="ts-wrap"><div class="ts-stars"><svg class="ts-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="ts-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="ts-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="ts-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="ts-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div><p class="ts-text">\u201CThe quality of their work is outstanding. Every pixel is perfectly placed, and the final product exceeded our expectations by far.\u201D</p><div class="ts-author"><div class="ts-avatar">AP</div><div class="ts-info"><span class="ts-name">Antoine Petit</span><span class="ts-company">Atelier Petit & Co</span></div></div></div>`
      },
    },
  },
  {
    id: 'comp-testimonial-side',
    label: 'Testimonial Side Layout',
    category: 'components',
    subcategory: 'testimonials',
    tags: ['testimonial', 'editorial', 'image', 'side', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Testimonial Side',
      defaultStyle: { width: '100%', minHeight: '300px' },
      defaultContent: {
        html: `<style>.tsd-wrap{display:flex;align-items:stretch;max-width:720px;margin:0 auto;border-radius:16px;overflow:hidden;font-family:system-ui,-apple-system,sans-serif;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08)}.tsd-img{width:280px;min-height:300px;background:linear-gradient(135deg,#1a1a2e,#16213e);flex-shrink:0;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.15);font-size:48px;font-family:Georgia,serif}.tsd-content{flex:1;padding:44px 40px;display:flex;flex-direction:column;justify-content:center;gap:20px}.tsd-quote{font-family:Georgia,"Times New Roman",serif;font-size:18px;font-style:italic;line-height:1.7;color:rgba(255,255,255,0.75);margin:0}.tsd-dash{width:40px;height:2px;background:linear-gradient(90deg,#638BFF,transparent)}.tsd-name{font-size:15px;font-weight:600;color:#f0f0f0;margin:0}.tsd-role{font-size:13px;color:rgba(255,255,255,0.4);margin:4px 0 0}</style><div class="tsd-wrap"><div class="tsd-img">\u201C</div><div class="tsd-content"><p class="tsd-quote">Their creative vision transformed our brand identity entirely. The collaboration was seamless from day one, and the results speak for themselves.</p><div class="tsd-dash"></div><p class="tsd-name">Camille Roux</p><p class="tsd-role">Creative Director, Maison Roux</p></div></div>`
      },
    },
  },
  {
    id: 'comp-testimonial-twitter',
    label: 'Social Proof Tweet',
    category: 'components',
    subcategory: 'testimonials',
    tags: ['testimonial', 'twitter', 'social', 'tweet', 'card'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Tweet Testimonial',
      defaultStyle: { width: '100%', minHeight: '200px' },
      defaultContent: {
        html: `<style>.tw-wrap{background:rgba(255,255,255,0.04);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:28px;max-width:440px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif}.tw-header{display:flex;align-items:center;gap:12px;margin-bottom:16px}.tw-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#1DA1F2,#0d8bd9);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff;flex-shrink:0}.tw-meta{flex:1}.tw-name{font-size:14px;font-weight:600;color:#f0f0f0}.tw-handle{font-size:13px;color:rgba(255,255,255,0.35)}.tw-bird{width:20px;height:20px;color:rgba(29,161,242,0.6)}.tw-text{font-size:15px;line-height:1.7;color:rgba(255,255,255,0.75);margin:0 0 20px}.tw-actions{display:flex;gap:28px}.tw-action{display:flex;align-items:center;gap:6px;font-size:13px;color:rgba(255,255,255,0.3);cursor:pointer;transition:color 0.2s;background:none;border:none;padding:0;font-family:inherit}.tw-action:hover{color:rgba(255,255,255,0.6)}.tw-action svg{width:16px;height:16px}</style><div class="tw-wrap"><div class="tw-header"><div class="tw-avatar">JD</div><div class="tw-meta"><div class="tw-name">Julie Deschamps</div><div class="tw-handle">@juliedesch</div></div><svg class="tw-bird" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></div><p class="tw-text">Just launched our new site built by @jlstudio and it's absolutely insane. The animations, the feel, everything is premium. Can't recommend enough.</p><div class="tw-actions"><button class="tw-action"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>247</button><button class="tw-action"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>58</button><button class="tw-action"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>12</button></div></div>`
      },
    },
  },
  {
    id: 'comp-testimonial-video',
    label: 'Video Testimonial',
    category: 'components',
    subcategory: 'testimonials',
    tags: ['testimonial', 'video', 'play', 'thumbnail', 'media'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Video Testimonial',
      defaultStyle: { width: '100%', minHeight: '360px' },
      defaultContent: {
        html: `<style>.tv-wrap{max-width:480px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif}.tv-thumb{position:relative;border-radius:14px;overflow:hidden;background:linear-gradient(135deg,#1a1a2e,#0f0f1e);aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;cursor:pointer;margin-bottom:20px}.tv-thumb::before{content:'';position:absolute;inset:0;background:rgba(0,0,0,0.3);transition:background 0.3s}.tv-thumb:hover::before{background:rgba(0,0,0,0.15)}.tv-play{position:relative;z-index:1;width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);border:2px solid rgba(255,255,255,0.25);display:flex;align-items:center;justify-content:center;transition:transform 0.3s,background 0.3s}.tv-thumb:hover .tv-play{transform:scale(1.1);background:rgba(255,255,255,0.25)}.tv-play svg{width:24px;height:24px;color:#fff;margin-left:3px}.tv-dur{position:absolute;bottom:12px;right:12px;z-index:1;background:rgba(0,0,0,0.6);padding:4px 10px;border-radius:6px;font-size:12px;font-weight:500;color:#fff}.tv-info{display:flex;align-items:center;gap:14px;padding:0 4px}.tv-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#4F6EF7,#638BFF);display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#fff;flex-shrink:0}.tv-meta{display:flex;flex-direction:column;gap:2px}.tv-name{font-size:14px;font-weight:600;color:#f0f0f0}.tv-role{font-size:12px;color:rgba(255,255,255,0.4)}</style><div class="tv-wrap"><div class="tv-thumb"><div class="tv-play"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div><span class="tv-dur">2:34</span></div><div class="tv-info"><div class="tv-avatar">MV</div><div class="tv-meta"><span class="tv-name">Marc Vaillant</span><span class="tv-role">Founder, Studio Vaillant</span></div></div></div>`
      },
    },
  },
]

// ─── PRICING (6 premium pricing presets) ───

const PRICING: LibraryElementItem[] = [
  {
    id: 'comp-pricing-simple',
    label: 'Pricing Simple',
    category: 'components',
    subcategory: 'pricing',
    tags: ['pricing', 'plan', 'card', 'features', 'cta', 'clean'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Pricing Simple',
      defaultStyle: { width: '100%', minHeight: '400px' },
      defaultContent: {
        html: `<style>.ps-wrap{background:rgba(255,255,255,0.04);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px;max-width:340px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif;text-align:center}.ps-name{font-size:14px;font-weight:600;color:rgba(99,139,255,0.8);text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px}.ps-price{font-size:48px;font-weight:700;color:#f0f0f0;margin:0 0 4px;line-height:1}.ps-price span{font-size:16px;font-weight:400;color:rgba(255,255,255,0.35)}.ps-desc{font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 28px}.ps-divider{height:1px;background:rgba(255,255,255,0.08);margin-bottom:24px}.ps-features{list-style:none;padding:0;margin:0 0 32px;text-align:left}.ps-features li{display:flex;align-items:center;gap:10px;padding:8px 0;font-size:14px;color:rgba(255,255,255,0.65)}.ps-check{width:18px;height:18px;border-radius:50%;background:rgba(99,139,255,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0}.ps-check svg{width:12px;height:12px;color:#638BFF}.ps-btn{width:100%;padding:14px;background:linear-gradient(135deg,#4F6EF7,#638BFF);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit}.ps-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(79,110,247,0.3)}</style><div class="ps-wrap"><div class="ps-name">Pro</div><div class="ps-price">\u20AC49<span>/mo</span></div><p class="ps-desc">Perfect for growing businesses</p><div class="ps-divider"></div><ul class="ps-features"><li><span class="ps-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg></span>Unlimited projects</li><li><span class="ps-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg></span>Priority support</li><li><span class="ps-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg></span>Advanced analytics</li><li><span class="ps-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg></span>Custom integrations</li><li><span class="ps-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg></span>Team collaboration</li></ul><button class="ps-btn">Get Started</button></div>`
      },
    },
  },
  {
    id: 'comp-pricing-popular',
    label: 'Pricing 3-Tier Popular',
    category: 'components',
    subcategory: 'pricing',
    tags: ['pricing', 'tiers', 'popular', 'badge', 'comparison'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Pricing Popular',
      defaultStyle: { width: '100%', minHeight: '480px' },
      defaultContent: {
        html: `<style>.pp-wrap{display:flex;gap:20px;justify-content:center;align-items:flex-end;max-width:900px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif;padding:20px 0;flex-wrap:wrap}.pp-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:36px 32px;width:260px;text-align:center;transition:transform 0.3s,box-shadow 0.3s;position:relative}.pp-card:hover{transform:translateY(-4px)}.pp-card.pop{background:rgba(99,139,255,0.06);border-color:rgba(99,139,255,0.25);padding:44px 32px;box-shadow:0 8px 40px rgba(99,139,255,0.12)}.pp-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#4F6EF7,#638BFF);color:#fff;font-size:11px;font-weight:600;padding:4px 16px;border-radius:99px;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap}.pp-name{font-size:14px;font-weight:600;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px}.pp-price{font-size:40px;font-weight:700;color:#f0f0f0;margin:0 0 4px;line-height:1}.pp-price span{font-size:15px;font-weight:400;color:rgba(255,255,255,0.3)}.pp-desc{font-size:12px;color:rgba(255,255,255,0.35);margin:0 0 24px}.pp-list{list-style:none;padding:0;margin:0 0 28px;text-align:left}.pp-list li{padding:6px 0;font-size:13px;color:rgba(255,255,255,0.55);display:flex;align-items:center;gap:8px}.pp-list li::before{content:'\\2713';color:#638BFF;font-weight:700;font-size:12px}.pp-btn{width:100%;padding:12px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit}.pp-btn-outline{background:transparent;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7)}.pp-btn-outline:hover{border-color:rgba(255,255,255,0.3);color:#fff}.pp-btn-fill{background:linear-gradient(135deg,#4F6EF7,#638BFF);color:#fff;border:none}.pp-btn-fill:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(79,110,247,0.3)}</style><div class="pp-wrap"><div class="pp-card"><div class="pp-name">Starter</div><div class="pp-price">\u20AC19<span>/mo</span></div><p class="pp-desc">For individuals</p><ul class="pp-list"><li>5 projects</li><li>Basic analytics</li><li>Email support</li></ul><button class="pp-btn pp-btn-outline">Choose Plan</button></div><div class="pp-card pop"><span class="pp-badge">Most Popular</span><div class="pp-name">Pro</div><div class="pp-price">\u20AC49<span>/mo</span></div><p class="pp-desc">For growing teams</p><ul class="pp-list"><li>Unlimited projects</li><li>Advanced analytics</li><li>Priority support</li><li>Custom integrations</li></ul><button class="pp-btn pp-btn-fill">Choose Plan</button></div><div class="pp-card"><div class="pp-name">Business</div><div class="pp-price">\u20AC99<span>/mo</span></div><p class="pp-desc">For enterprises</p><ul class="pp-list"><li>Everything in Pro</li><li>Dedicated manager</li><li>SLA guarantee</li><li>Custom branding</li></ul><button class="pp-btn pp-btn-outline">Choose Plan</button></div></div>`
      },
    },
  },
  {
    id: 'comp-pricing-toggle',
    label: 'Pricing Toggle Monthly/Yearly',
    category: 'components',
    subcategory: 'pricing',
    tags: ['pricing', 'toggle', 'monthly', 'yearly', 'switch'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Pricing Toggle',
      defaultStyle: { width: '100%', minHeight: '460px' },
      defaultContent: {
        html: `<style>.pt-wrap{max-width:680px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif;text-align:center}.pt-toggle{display:inline-flex;align-items:center;gap:14px;margin-bottom:36px;padding:6px;background:rgba(255,255,255,0.04);border-radius:99px;border:1px solid rgba(255,255,255,0.08)}.pt-opt{padding:8px 20px;border-radius:99px;font-size:13px;font-weight:500;color:rgba(255,255,255,0.45);cursor:pointer;transition:all 0.3s;border:none;background:transparent;font-family:inherit}.pt-opt.active{background:rgba(99,139,255,0.15);color:#638BFF}.pt-save{font-size:11px;font-weight:600;color:#34D399;background:rgba(52,211,153,0.1);padding:3px 10px;border-radius:99px}.pt-cards{display:flex;gap:20px;justify-content:center;flex-wrap:wrap}.pt-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:36px 32px;width:300px;text-align:center;transition:transform 0.3s}.pt-card:hover{transform:translateY(-4px)}.pt-name{font-size:14px;font-weight:600;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px}.pt-price{font-size:44px;font-weight:700;color:#f0f0f0;margin:0 0 4px;line-height:1}.pt-price span{font-size:14px;font-weight:400;color:rgba(255,255,255,0.3)}.pt-desc{font-size:12px;color:rgba(255,255,255,0.35);margin:0 0 24px}.pt-list{list-style:none;padding:0;margin:0 0 28px;text-align:left}.pt-list li{padding:6px 0;font-size:13px;color:rgba(255,255,255,0.55);display:flex;align-items:center;gap:8px}.pt-list li::before{content:'\\2713';color:#638BFF;font-weight:700;font-size:12px}.pt-btn{width:100%;padding:12px;background:linear-gradient(135deg,#4F6EF7,#638BFF);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:transform 0.2s;font-family:inherit}.pt-btn:hover{transform:translateY(-1px)}</style><div class="pt-wrap"><div class="pt-toggle"><button class="pt-opt active">Monthly</button><button class="pt-opt">Yearly</button><span class="pt-save">Save 20%</span></div><div class="pt-cards"><div class="pt-card"><div class="pt-name">Starter</div><div class="pt-price">\u20AC29<span>/mo</span></div><p class="pt-desc">Everything to get started</p><ul class="pt-list"><li>10 projects</li><li>Basic analytics</li><li>Email support</li><li>1 team member</li></ul><button class="pt-btn">Start Free Trial</button></div><div class="pt-card"><div class="pt-name">Professional</div><div class="pt-price">\u20AC79<span>/mo</span></div><p class="pt-desc">For scaling businesses</p><ul class="pt-list"><li>Unlimited projects</li><li>Advanced analytics</li><li>Priority support</li><li>10 team members</li><li>API access</li></ul><button class="pt-btn">Start Free Trial</button></div></div></div>`
      },
    },
  },
  {
    id: 'comp-pricing-gradient',
    label: 'Pricing Gradient Cards',
    category: 'components',
    subcategory: 'pricing',
    tags: ['pricing', 'gradient', 'dark', 'premium', 'border'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Pricing Gradient',
      defaultStyle: { width: '100%', minHeight: '420px' },
      defaultContent: {
        html: `<style>.pg-wrap{display:flex;gap:24px;justify-content:center;max-width:720px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif;flex-wrap:wrap}.pg-card{position:relative;border-radius:16px;padding:2px;background:linear-gradient(135deg,rgba(99,139,255,0.4),rgba(139,92,246,0.4),rgba(236,72,153,0.3));width:320px;transition:transform 0.3s}.pg-card:hover{transform:translateY(-4px)}.pg-inner{background:#0d0d12;border-radius:14px;padding:40px 32px;text-align:center;height:100%;box-sizing:border-box}.pg-name{font-size:14px;font-weight:600;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.08em;margin:0 0 16px}.pg-price{font-size:48px;font-weight:700;background:linear-gradient(135deg,#638BFF,#A78BFA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 6px;line-height:1}.pg-price span{font-size:15px;font-weight:400;-webkit-text-fill-color:rgba(255,255,255,0.3);background:none}.pg-desc{font-size:12px;color:rgba(255,255,255,0.35);margin:0 0 28px}.pg-list{list-style:none;padding:0;margin:0 0 32px;text-align:left}.pg-list li{padding:7px 0;font-size:13px;color:rgba(255,255,255,0.55);display:flex;align-items:center;gap:8px}.pg-list li::before{content:'\\2713';color:#A78BFA;font-weight:700;font-size:12px}.pg-btn{width:100%;padding:12px;background:linear-gradient(135deg,#4F6EF7,#8B5CF6);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:box-shadow 0.3s;font-family:inherit}.pg-btn:hover{box-shadow:0 8px 32px rgba(99,139,255,0.25)}</style><div class="pg-wrap"><div class="pg-card"><div class="pg-inner"><div class="pg-name">Growth</div><div class="pg-price">\u20AC59<span>/mo</span></div><p class="pg-desc">Scale with confidence</p><ul class="pg-list"><li>Unlimited projects</li><li>Advanced analytics</li><li>Priority support</li><li>API access</li><li>Custom domains</li></ul><button class="pg-btn">Get Started</button></div></div><div class="pg-card"><div class="pg-inner"><div class="pg-name">Scale</div><div class="pg-price">\u20AC129<span>/mo</span></div><p class="pg-desc">Enterprise-ready tools</p><ul class="pg-list"><li>Everything in Growth</li><li>SSO & SAML</li><li>Dedicated support</li><li>Custom SLA</li><li>Audit logs</li></ul><button class="pg-btn">Get Started</button></div></div></div>`
      },
    },
  },
  {
    id: 'comp-pricing-minimal',
    label: 'Pricing Minimal',
    category: 'components',
    subcategory: 'pricing',
    tags: ['pricing', 'minimal', 'simple', 'clean', 'text-link'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Pricing Minimal',
      defaultStyle: { width: '100%', minHeight: '240px' },
      defaultContent: {
        html: `<style>.pm-wrap{text-align:center;max-width:320px;margin:0 auto;padding:40px 20px;font-family:system-ui,-apple-system,sans-serif}.pm-name{font-size:13px;font-weight:600;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;margin:0 0 16px}.pm-price{font-size:56px;font-weight:700;color:#f0f0f0;margin:0 0 24px;line-height:1}.pm-price span{font-size:16px;font-weight:400;color:rgba(255,255,255,0.3)}.pm-features{list-style:none;padding:0;margin:0 0 28px}.pm-features li{padding:5px 0;font-size:14px;color:rgba(255,255,255,0.5)}.pm-link{font-size:13px;color:#638BFF;text-decoration:none;cursor:pointer;border-bottom:1px solid rgba(99,139,255,0.3);padding-bottom:2px;transition:border-color 0.3s;font-family:inherit;background:none;border-top:none;border-left:none;border-right:none}.pm-link:hover{border-bottom-color:#638BFF}</style><div class="pm-wrap"><div class="pm-name">Essential</div><div class="pm-price">\u20AC29<span>/mo</span></div><ul class="pm-features"><li>Unlimited projects</li><li>Priority support</li><li>Advanced analytics</li></ul><button class="pm-link">Start your free trial \u2192</button></div>`
      },
    },
  },
  {
    id: 'comp-pricing-enterprise',
    label: 'Pricing Enterprise',
    category: 'components',
    subcategory: 'pricing',
    tags: ['pricing', 'enterprise', 'custom', 'contact', 'dark', 'premium'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'Pricing Enterprise',
      defaultStyle: { width: '100%', minHeight: '380px' },
      defaultContent: {
        html: `<style>.pe-wrap{background:rgba(255,255,255,0.03);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:48px;max-width:500px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif}.pe-badge{display:inline-block;font-size:11px;font-weight:600;color:#C5A572;text-transform:uppercase;letter-spacing:0.1em;border:1px solid rgba(197,165,114,0.3);padding:4px 14px;border-radius:99px;margin-bottom:20px}.pe-title{font-size:28px;font-weight:700;color:#f0f0f0;margin:0 0 6px}.pe-price{font-size:16px;color:rgba(255,255,255,0.4);margin:0 0 28px}.pe-divider{height:1px;background:rgba(255,255,255,0.06);margin-bottom:28px}.pe-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px 24px;margin-bottom:36px}.pe-feature{display:flex;align-items:center;gap:8px;font-size:13px;color:rgba(255,255,255,0.6)}.pe-feature svg{width:16px;height:16px;color:#C5A572;flex-shrink:0}.pe-btn{width:100%;padding:16px;background:linear-gradient(135deg,#C5A572,#A68B5B);color:#0d0d0d;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:inherit}.pe-btn:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(197,165,114,0.25)}</style><div class="pe-wrap"><span class="pe-badge">Enterprise</span><h3 class="pe-title">Custom Plan</h3><p class="pe-price">Tailored pricing for your organization</p><div class="pe-divider"></div><div class="pe-grid"><span class="pe-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>Unlimited everything</span><span class="pe-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>Dedicated manager</span><span class="pe-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>SSO & SAML</span><span class="pe-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>99.99% SLA</span><span class="pe-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>Custom integrations</span><span class="pe-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>Priority onboarding</span></div><button class="pe-btn">Contact Sales</button></div>`
      },
    },
  },
]

// ─── FAQ COMPONENTS (4 premium FAQ presets) ───

const FAQ_COMPONENTS: LibraryElementItem[] = [
  {
    id: 'comp-faq-accordion',
    label: 'FAQ Accordion',
    category: 'components',
    subcategory: 'faq',
    tags: ['faq', 'accordion', 'toggle', 'questions', 'dark'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'FAQ Accordion',
      defaultStyle: { width: '100%', minHeight: '360px' },
      defaultContent: {
        html: `<style>.fa-wrap{max-width:600px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif}.fa-item{border-bottom:1px solid rgba(255,255,255,0.06)}.fa-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:20px 0;background:none;border:none;cursor:pointer;text-align:left;font-family:inherit}.fa-q-text{font-size:16px;font-weight:500;color:#f0f0f0;flex:1;padding-right:16px}.fa-icon{width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;transition:transform 0.3s,background 0.3s;flex-shrink:0}.fa-icon svg{width:12px;height:12px;color:rgba(255,255,255,0.5)}.fa-item.open .fa-icon{transform:rotate(45deg);background:rgba(99,139,255,0.15)}.fa-item.open .fa-icon svg{color:#638BFF}.fa-a{max-height:0;overflow:hidden;transition:max-height 0.4s ease,padding 0.4s ease;padding:0 0}.fa-item.open .fa-a{max-height:200px;padding:0 0 20px}.fa-a-text{font-size:14px;line-height:1.7;color:rgba(255,255,255,0.5);margin:0}</style><div class="fa-wrap"><div class="fa-item open"><button class="fa-q"><span class="fa-q-text">What services do you offer?</span><span class="fa-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg></span></button><div class="fa-a"><p class="fa-a-text">We offer a comprehensive suite of design and development services including branding, web design, mobile apps, and digital strategy consulting.</p></div></div><div class="fa-item"><button class="fa-q"><span class="fa-q-text">How long does a typical project take?</span><span class="fa-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg></span></button><div class="fa-a"><p class="fa-a-text">Project timelines vary based on scope and complexity. A typical website project takes 4-8 weeks from kickoff to launch.</p></div></div><div class="fa-item"><button class="fa-q"><span class="fa-q-text">Do you provide ongoing support?</span><span class="fa-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg></span></button><div class="fa-a"><p class="fa-a-text">Yes, we offer maintenance packages and ongoing support to ensure your website stays up-to-date and performs optimally.</p></div></div><div class="fa-item"><button class="fa-q"><span class="fa-q-text">What is your pricing model?</span><span class="fa-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg></span></button><div class="fa-a"><p class="fa-a-text">We offer both project-based and retainer pricing. Each project is quoted individually based on requirements and scope.</p></div></div></div>`
      },
    },
  },
  {
    id: 'comp-faq-simple',
    label: 'FAQ Simple List',
    category: 'components',
    subcategory: 'faq',
    tags: ['faq', 'simple', 'list', 'questions', 'visible'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'FAQ Simple',
      defaultStyle: { width: '100%', minHeight: '400px' },
      defaultContent: {
        html: `<style>.fs-wrap{max-width:600px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif}.fs-item{padding:28px 0;border-bottom:1px solid rgba(255,255,255,0.06)}.fs-item:last-child{border-bottom:none}.fs-q{font-size:17px;font-weight:600;color:#f0f0f0;margin:0 0 10px}.fs-a{font-size:14px;line-height:1.7;color:rgba(255,255,255,0.5);margin:0}</style><div class="fs-wrap"><div class="fs-item"><h4 class="fs-q">What makes your service unique?</h4><p class="fs-a">We combine strategy, design, and technology to deliver premium digital experiences that drive measurable results for ambitious brands.</p></div><div class="fs-item"><h4 class="fs-q">Can I request revisions during the project?</h4><p class="fs-a">Absolutely. Each project phase includes revision rounds to ensure the final product perfectly matches your vision and goals.</p></div><div class="fs-item"><h4 class="fs-q">Do you work with international clients?</h4><p class="fs-a">Yes, we work with clients globally. Our process is designed for seamless remote collaboration across time zones.</p></div><div class="fs-item"><h4 class="fs-q">What technologies do you use?</h4><p class="fs-a">We use cutting-edge technologies including React, Next.js, Node.js, and modern design tools to build fast, scalable, and beautiful products.</p></div></div>`
      },
    },
  },
  {
    id: 'comp-faq-two-col',
    label: 'FAQ Two Columns',
    category: 'components',
    subcategory: 'faq',
    tags: ['faq', 'two-column', 'split', 'layout', 'heading'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'FAQ Two Columns',
      defaultStyle: { width: '100%', minHeight: '380px' },
      defaultContent: {
        html: `<style>.ft-wrap{display:flex;gap:60px;max-width:800px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif;align-items:flex-start;flex-wrap:wrap}.ft-left{flex:0 0 240px}.ft-heading{font-size:32px;font-weight:700;color:#f0f0f0;margin:0 0 12px;line-height:1.2}.ft-sub{font-size:14px;color:rgba(255,255,255,0.4);margin:0;line-height:1.6}.ft-right{flex:1;min-width:300px}.ft-item{border-bottom:1px solid rgba(255,255,255,0.06)}.ft-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:18px 0;background:none;border:none;cursor:pointer;text-align:left;font-family:inherit}.ft-q-text{font-size:15px;font-weight:500;color:#f0f0f0;flex:1;padding-right:12px}.ft-chevron{width:16px;height:16px;color:rgba(255,255,255,0.3);transition:transform 0.3s;flex-shrink:0}.ft-item.open .ft-chevron{transform:rotate(180deg);color:#638BFF}.ft-a{max-height:0;overflow:hidden;transition:max-height 0.4s ease}.ft-item.open .ft-a{max-height:150px}.ft-a-text{font-size:14px;line-height:1.7;color:rgba(255,255,255,0.45);margin:0;padding-bottom:18px}</style><div class="ft-wrap"><div class="ft-left"><h2 class="ft-heading">Frequently Asked Questions</h2><p class="ft-sub">Everything you need to know about our services.</p></div><div class="ft-right"><div class="ft-item open"><button class="ft-q"><span class="ft-q-text">How do I get started?</span><svg class="ft-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></button><div class="ft-a"><p class="ft-a-text">Simply reach out through our contact form or schedule a free consultation call. We'll discuss your needs and create a tailored proposal.</p></div></div><div class="ft-item"><button class="ft-q"><span class="ft-q-text">What is your turnaround time?</span><svg class="ft-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></button><div class="ft-a"><p class="ft-a-text">Most projects are delivered within 4-8 weeks, depending on scope and complexity.</p></div></div><div class="ft-item"><button class="ft-q"><span class="ft-q-text">Do you offer refunds?</span><svg class="ft-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></button><div class="ft-a"><p class="ft-a-text">We work in milestone-based phases. If you're not satisfied after the first milestone, we offer a full refund.</p></div></div></div></div>`
      },
    },
  },
  {
    id: 'comp-faq-cards',
    label: 'FAQ Cards Grid',
    category: 'components',
    subcategory: 'faq',
    tags: ['faq', 'cards', 'grid', 'glassmorphic', 'questions'],
    dropType: 'element' as const,
    elementDef: {
      type: 'custom-embed' as const,
      label: 'FAQ Cards',
      defaultStyle: { width: '100%', minHeight: '360px' },
      defaultContent: {
        html: `<style>.fc-wrap{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;max-width:700px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif}.fc-card{background:rgba(255,255,255,0.04);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:28px;transition:border-color 0.3s,transform 0.3s}.fc-card:hover{border-color:rgba(99,139,255,0.2);transform:translateY(-2px)}.fc-q{font-size:15px;font-weight:600;color:#f0f0f0;margin:0 0 10px;line-height:1.4}.fc-a{font-size:13px;line-height:1.7;color:rgba(255,255,255,0.45);margin:0}</style><div class="fc-wrap"><div class="fc-card"><h4 class="fc-q">Is there a free trial?</h4><p class="fc-a">Yes, we offer a 14-day free trial with full access to all features. No credit card required.</p></div><div class="fc-card"><h4 class="fc-q">Can I cancel anytime?</h4><p class="fc-a">Absolutely. You can cancel your subscription at any time with no cancellation fees or hidden charges.</p></div><div class="fc-card"><h4 class="fc-q">Do you offer team plans?</h4><p class="fc-a">Yes, our Pro and Enterprise plans support unlimited team members with role-based access controls.</p></div><div class="fc-card"><h4 class="fc-q">How secure is my data?</h4><p class="fc-a">We use enterprise-grade encryption, regular backups, and comply with GDPR and SOC 2 standards.</p></div></div>`
      },
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
  ...NAVBARS_FULL,
  ...FOOTERS_FULL,
  ...CTA_SECTIONS,
  ...HERO_SECTIONS,
  ...FEATURE_SECTIONS,
  ...SOCIAL_PROOF,
  ...BLOG_SECTIONS,
  ...TEAM_SECTIONS,
  ...GALLERY_SECTIONS,
  ...MISC_SECTIONS,
  ...FORMS,
  ...TESTIMONIALS,
  ...PRICING,
  ...FAQ_COMPONENTS,
]
