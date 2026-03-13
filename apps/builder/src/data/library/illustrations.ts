// ─────────────────────────────────────────────
// LIBRARY — Illustrations & decorations (Brixsa-quality premium)
// ─────────────────────────────────────────────

import type { LibraryElementItem } from '@/types/library'

// ─── BLOBS ───

const BLOBS: LibraryElementItem[] = [
  {
    id: 'ill-blob-warm',
    label: 'Warm Blob',
    category: 'illustrations', subcategory: 'blobs',
    tags: ['blob', 'warm', 'brown', 'luxury'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Warm Blob',
      defaultStyle: { width: '400px', height: '400px', position: 'absolute', opacity: 0.2 },
      defaultContent: { html: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#4a2711" d="M39.5,-65.3C50.3,-57.5,57.5,-45.4,63.8,-32.8C70,-20.2,75.2,-7,73.3,5.1C71.4,17.1,62.4,28.1,53.2,38.4C44,48.6,34.6,58.2,22.9,63.7C11.3,69.2,-2.6,70.7,-16.8,68.3C-31,65.9,-45.5,59.7,-55.2,49.2C-64.9,38.7,-69.8,23.9,-72.1,8.5C-74.4,-6.8,-74.2,-22.8,-67.2,-35.2C-60.3,-47.7,-46.7,-56.6,-33.2,-63C-19.7,-69.4,-6.3,-73.4,4.6,-80.6C15.4,-87.9,28.8,-73.1,39.5,-65.3Z" transform="translate(100 100)" /></svg>' },
    },
  },
  {
    id: 'ill-blob-purple',
    label: 'Purple Blob',
    category: 'illustrations', subcategory: 'blobs',
    tags: ['blob', 'purple', 'tech'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Purple Blob',
      defaultStyle: { width: '350px', height: '350px', position: 'absolute', opacity: 0.15 },
      defaultContent: { html: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#6366f1" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.7,-45.8C87.6,-32.5,90.3,-16.3,88.9,-0.8C87.5,14.7,82,29.4,73.1,41.4C64.2,53.5,51.9,63,38.3,70.1C24.7,77.3,9.8,82.1,-4.2,88.3C-18.2,94.5,-31.4,102.1,-42.4,98.3C-53.5,94.4,-62.4,79.1,-69.5,64.2C-76.6,49.3,-82,34.8,-83.6,20.1C-85.3,5.3,-83.3,-9.7,-78.1,-23.3C-72.9,-36.9,-64.6,-49.2,-53,-57.6C-41.5,-66,-26.7,-70.6,-11.6,-73.3C3.5,-76,30.6,-83.5,44.7,-76.4Z" transform="translate(100 100)" /></svg>' },
    },
  },
  {
    id: 'ill-blob-gold-glow',
    label: 'Gold Glow Blob',
    category: 'illustrations', subcategory: 'blobs',
    tags: ['blob', 'gold', 'glow', 'luxury'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Gold Glow',
      defaultStyle: {
        width: '300px', height: '300px', position: 'absolute',
        backgroundColor: '#c8a97e', borderRadius: '99px',
        opacity: 0.12, filter: 'blur(80px)',
      },
      defaultContent: {},
    },
  },
  {
    id: 'ill-blob-indigo-glow',
    label: 'Indigo Glow',
    category: 'illustrations', subcategory: 'blobs',
    tags: ['blob', 'indigo', 'glow', 'tech'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Indigo Glow',
      defaultStyle: {
        width: '400px', height: '400px', position: 'absolute',
        backgroundColor: '#6366f1', borderRadius: '99px',
        opacity: 0.1, filter: 'blur(100px)',
      },
      defaultContent: {},
    },
  },
]

// ─── GRADIENTS ───

const GRADIENTS: LibraryElementItem[] = [
  {
    id: 'ill-gradient-brixsa-dark',
    label: 'Brixsa Dark Gradient',
    category: 'illustrations', subcategory: 'gradients',
    tags: ['gradient', 'dark', 'brown', 'brixsa', 'luxury'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Dark Gradient',
      defaultStyle: { width: '100%', height: '400px', borderRadius: '0.75rem' },
      defaultContent: { html: '<div style="width:100%;height:100%;background:linear-gradient(135deg,#2c1e14 0%,#3d2b1a 50%,#1a120b 100%);border-radius:inherit"></div>' },
    },
  },
  {
    id: 'ill-gradient-aurora',
    label: 'Aurora Gradient',
    category: 'illustrations', subcategory: 'gradients',
    tags: ['gradient', 'aurora', 'colorful', 'modern'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Aurora',
      defaultStyle: { width: '100%', height: '300px', borderRadius: '0.75rem' },
      defaultContent: { html: '<div style="width:100%;height:100%;background:linear-gradient(135deg,#667eea 0%,#764ba2 25%,#f093fb 50%,#4facfe 75%,#00f2fe 100%);border-radius:inherit"></div>' },
    },
  },
  {
    id: 'ill-gradient-midnight',
    label: 'Midnight Gradient',
    category: 'illustrations', subcategory: 'gradients',
    tags: ['gradient', 'dark', 'midnight', 'tech'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Midnight',
      defaultStyle: { width: '100%', height: '300px', borderRadius: '0.75rem' },
      defaultContent: { html: '<div style="width:100%;height:100%;background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%);border-radius:inherit"></div>' },
    },
  },
  {
    id: 'ill-gradient-warm-cream',
    label: 'Warm Cream Gradient',
    category: 'illustrations', subcategory: 'gradients',
    tags: ['gradient', 'warm', 'cream', 'brixsa'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Warm Cream',
      defaultStyle: { width: '100%', height: '300px', borderRadius: '0.75rem' },
      defaultContent: { html: '<div style="width:100%;height:100%;background:linear-gradient(135deg,#f6efe5 0%,#e8ddd0 50%,#d4c5b3 100%);border-radius:inherit"></div>' },
    },
  },
]

// ─── PATTERNS ───

const PATTERNS: LibraryElementItem[] = [
  {
    id: 'ill-pattern-dots',
    label: 'Dots Grid',
    category: 'illustrations', subcategory: 'patterns',
    tags: ['pattern', 'dots', 'grid', 'subtle'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Dots Grid',
      defaultStyle: { width: '100%', height: '300px', opacity: 0.2 },
      defaultContent: { html: '<svg width="100%" height="100%"><defs><pattern id="dots-lib" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="currentColor"/></pattern></defs><rect width="100%" height="100%" fill="url(#dots-lib)"/></svg>' },
    },
  },
  {
    id: 'ill-pattern-grid-lines',
    label: 'Grid Lines',
    category: 'illustrations', subcategory: 'patterns',
    tags: ['pattern', 'grid', 'lines', 'subtle'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Grid Lines',
      defaultStyle: { width: '100%', height: '300px', opacity: 0.08 },
      defaultContent: { html: '<svg width="100%" height="100%"><defs><pattern id="grid-lib" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid-lib)"/></svg>' },
    },
  },
  {
    id: 'ill-pattern-diagonal',
    label: 'Diagonal Lines',
    category: 'illustrations', subcategory: 'patterns',
    tags: ['pattern', 'diagonal', 'lines'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Diagonal Lines',
      defaultStyle: { width: '100%', height: '200px', opacity: 0.06 },
      defaultContent: { html: '<svg width="100%" height="100%"><defs><pattern id="diag-lib" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M0 16L16 0" stroke="currentColor" stroke-width="0.5" fill="none"/></pattern></defs><rect width="100%" height="100%" fill="url(#diag-lib)"/></svg>' },
    },
  },
]

// ─── DECORATIVE ───

const DECORATIVE: LibraryElementItem[] = [
  {
    id: 'ill-deco-wave',
    label: 'Wave Section Divider',
    category: 'illustrations', subcategory: 'decorative',
    tags: ['decoration', 'wave', 'divider', 'section'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Wave',
      defaultStyle: { width: '100%', height: '80px' },
      defaultContent: { html: '<svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="width:100%;height:100%"><path d="M0 40 C 360 80, 720 0, 1080 40 S 1440 80, 1440 40 L 1440 80 L 0 80 Z" fill="#f6efe5"/></svg>' },
    },
  },
  {
    id: 'ill-deco-wave-dark',
    label: 'Wave Dark',
    category: 'illustrations', subcategory: 'decorative',
    tags: ['decoration', 'wave', 'dark'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Wave Dark',
      defaultStyle: { width: '100%', height: '80px' },
      defaultContent: { html: '<svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="width:100%;height:100%"><path d="M0 40 C 360 80, 720 0, 1080 40 S 1440 80, 1440 40 L 1440 80 L 0 80 Z" fill="#140c08"/></svg>' },
    },
  },
  {
    id: 'ill-deco-gradient-line-gold',
    label: 'Gold Accent Line',
    category: 'illustrations', subcategory: 'decorative',
    tags: ['decoration', 'line', 'gold', 'accent'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Gold Line',
      defaultStyle: { width: '120px', height: '3px' },
      defaultContent: { html: '<div style="width:100%;height:100%;background:linear-gradient(90deg,#c8a97e,#4a2711);border-radius:99px"></div>' },
    },
  },
  {
    id: 'ill-deco-glow-circle',
    label: 'Glow Circle',
    category: 'illustrations', subcategory: 'shapes',
    tags: ['shape', 'circle', 'glow', 'decoration'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Glow Circle',
      defaultStyle: {
        width: '200px', height: '200px',
        backgroundColor: '#c8a97e', borderRadius: '99px',
        boxShadow: '0 0 80px 30px rgba(200,169,126,0.25)',
        opacity: 0.5,
      },
      defaultContent: {},
    },
  },
  {
    id: 'ill-deco-ring',
    label: 'Decorative Ring',
    category: 'illustrations', subcategory: 'shapes',
    tags: ['shape', 'ring', 'circle', 'outline'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Ring',
      defaultStyle: {
        width: '180px', height: '180px',
        backgroundColor: 'transparent',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(200,169,126,0.2)',
        borderRadius: '99px',
      },
      defaultContent: {},
    },
  },
  {
    id: 'ill-deco-image-overlay-dark',
    label: 'Image Overlay Dark',
    category: 'illustrations', subcategory: 'decorative',
    tags: ['overlay', 'dark', 'gradient', 'image'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Dark Overlay',
      defaultStyle: { width: '100%', height: '100%', position: 'absolute', top: '0', left: '0' },
      defaultContent: { html: '<div style="width:100%;height:100%;background:linear-gradient(360deg,rgba(20,12,8,0.8) 14%,rgba(255,255,255,0) 39%)"></div>' },
    },
  },
  {
    id: 'ill-deco-noise-texture',
    label: 'Noise Texture',
    category: 'illustrations', subcategory: 'patterns',
    tags: ['noise', 'texture', 'grain', 'overlay'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Noise',
      defaultStyle: { width: '100%', height: '100%', position: 'absolute', top: '0', left: '0', opacity: 0.03, pointerEvents: 'none' },
      defaultContent: { html: '<svg width="100%" height="100%"><filter id="noise-lib"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#noise-lib)"/></svg>' },
    },
  },
]

export const LIBRARY_ILLUSTRATIONS: LibraryElementItem[] = [
  ...BLOBS,
  ...GRADIENTS,
  ...PATTERNS,
  ...DECORATIVE,
]
