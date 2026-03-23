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

// ─── MESH GRADIENTS ───

const MESH_GRADIENTS: LibraryElementItem[] = [
  {
    id: 'ill-mesh-warm',
    label: 'Warm Mesh Gradient',
    category: 'illustrations', subcategory: 'mesh-gradients',
    tags: ['gradient', 'mesh', 'warm', 'amber', 'rose', 'luxury'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Warm Mesh',
      defaultStyle: { width: '100%', height: '300px' },
      defaultContent: { html: '<div style="width:100%;height:100%;background:conic-gradient(from 180deg at 50% 50%,#f59e0b 0deg,#e11d48 120deg,#f97316 240deg,#f59e0b 360deg);position:relative;overflow:hidden"><div style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 20%,rgba(251,191,36,0.8) 0%,transparent 50%),radial-gradient(ellipse at 70% 60%,rgba(244,63,94,0.6) 0%,transparent 50%),radial-gradient(ellipse at 50% 80%,rgba(249,115,22,0.7) 0%,transparent 50%)"></div></div>' },
    },
  },
  {
    id: 'ill-mesh-cool',
    label: 'Cool Mesh Gradient',
    category: 'illustrations', subcategory: 'mesh-gradients',
    tags: ['gradient', 'mesh', 'cool', 'blue', 'cyan', 'tech'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Cool Mesh',
      defaultStyle: { width: '100%', height: '300px' },
      defaultContent: { html: '<div style="width:100%;height:100%;background:conic-gradient(from 90deg at 50% 50%,#3b82f6 0deg,#06b6d4 120deg,#8b5cf6 240deg,#3b82f6 360deg);position:relative;overflow:hidden"><div style="position:absolute;inset:0;background:radial-gradient(ellipse at 25% 30%,rgba(59,130,246,0.8) 0%,transparent 50%),radial-gradient(ellipse at 75% 50%,rgba(6,182,212,0.6) 0%,transparent 50%),radial-gradient(ellipse at 40% 75%,rgba(139,92,246,0.7) 0%,transparent 50%)"></div></div>' },
    },
  },
  {
    id: 'ill-mesh-aurora',
    label: 'Aurora Mesh Gradient',
    category: 'illustrations', subcategory: 'mesh-gradients',
    tags: ['gradient', 'mesh', 'aurora', 'green', 'blue', 'purple'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Aurora Mesh',
      defaultStyle: { width: '100%', height: '300px' },
      defaultContent: { html: '<div style="width:100%;height:100%;background:linear-gradient(180deg,#0f172a 0%,#0f172a 100%);position:relative;overflow:hidden"><div style="position:absolute;inset:0;background:radial-gradient(ellipse 120% 40% at 20% 40%,rgba(34,197,94,0.5) 0%,transparent 70%),radial-gradient(ellipse 100% 35% at 50% 35%,rgba(59,130,246,0.4) 0%,transparent 70%),radial-gradient(ellipse 110% 30% at 80% 50%,rgba(168,85,247,0.45) 0%,transparent 70%),radial-gradient(ellipse 80% 25% at 35% 30%,rgba(6,182,212,0.3) 0%,transparent 60%)"></div></div>' },
    },
  },
]

// ─── ABSTRACT SHAPES ───

const ABSTRACT_SHAPES: LibraryElementItem[] = [
  {
    id: 'ill-shape-topographic',
    label: 'Topographic Lines',
    category: 'illustrations', subcategory: 'shapes',
    tags: ['shape', 'topographic', 'contour', 'lines', 'trendy'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Topographic',
      defaultStyle: { width: '100%', height: '300px', opacity: 0.15 },
      defaultContent: { html: '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%" preserveAspectRatio="xMidYMid slice"><ellipse cx="200" cy="150" rx="180" ry="130" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.3"/><ellipse cx="200" cy="150" rx="150" ry="110" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.4"/><ellipse cx="200" cy="150" rx="120" ry="88" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.5"/><ellipse cx="200" cy="150" rx="90" ry="65" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.6"/><ellipse cx="200" cy="150" rx="60" ry="42" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.7"/><ellipse cx="200" cy="150" rx="30" ry="20" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.8"/><ellipse cx="180" cy="140" rx="160" ry="115" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.35"/><ellipse cx="220" cy="160" rx="140" ry="100" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.45"/></svg>' },
    },
  },
  {
    id: 'ill-shape-circuit',
    label: 'Circuit Board',
    category: 'illustrations', subcategory: 'shapes',
    tags: ['shape', 'circuit', 'tech', 'pattern', 'digital'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Circuit Board',
      defaultStyle: { width: '100%', height: '300px', opacity: 0.12 },
      defaultContent: { html: '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%" preserveAspectRatio="xMidYMid slice"><g stroke="currentColor" stroke-width="1" fill="none"><line x1="50" y1="50" x2="150" y2="50"/><line x1="150" y1="50" x2="150" y2="120"/><line x1="150" y1="120" x2="250" y2="120"/><line x1="250" y1="120" x2="250" y2="50"/><line x1="250" y1="50" x2="350" y2="50"/><line x1="100" y1="150" x2="200" y2="150"/><line x1="200" y1="150" x2="200" y2="220"/><line x1="200" y1="220" x2="300" y2="220"/><line x1="50" y1="250" x2="120" y2="250"/><line x1="120" y1="250" x2="120" y2="180"/><line x1="300" y1="220" x2="300" y2="270"/><line x1="300" y1="270" x2="380" y2="270"/></g><g fill="currentColor"><circle cx="50" cy="50" r="3"/><circle cx="150" cy="50" r="3"/><circle cx="250" cy="50" r="3"/><circle cx="350" cy="50" r="3"/><circle cx="150" cy="120" r="3"/><circle cx="250" cy="120" r="3"/><circle cx="100" cy="150" r="3"/><circle cx="200" cy="150" r="3"/><circle cx="200" cy="220" r="3"/><circle cx="300" cy="220" r="3"/><circle cx="50" cy="250" r="3"/><circle cx="120" cy="250" r="3"/><circle cx="120" cy="180" r="3"/><circle cx="300" cy="270" r="3"/><circle cx="380" cy="270" r="3"/></g></svg>' },
    },
  },
  {
    id: 'ill-shape-isometric-grid',
    label: 'Isometric Grid',
    category: 'illustrations', subcategory: 'shapes',
    tags: ['shape', 'isometric', 'grid', '3d', 'modern'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Isometric Grid',
      defaultStyle: { width: '100%', height: '300px', opacity: 0.1 },
      defaultContent: { html: '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="iso-grid-lib" x="0" y="0" width="56" height="32" patternUnits="userSpaceOnUse"><path d="M0 32 L28 16 L56 32 M28 16 L28 0" stroke="currentColor" stroke-width="0.5" fill="none"/></pattern></defs><rect width="100%" height="100%" fill="url(#iso-grid-lib)"/></svg>' },
    },
  },
  {
    id: 'ill-shape-gradient-orb-3d',
    label: '3D Gradient Orb',
    category: 'illustrations', subcategory: 'shapes',
    tags: ['shape', 'orb', '3d', 'sphere', 'gradient', 'modern'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: '3D Orb',
      defaultStyle: {
        width: '250px', height: '250px', borderRadius: '99px',
        background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4) 0%, rgba(99,102,241,0.8) 30%, rgba(79,70,229,0.9) 60%, rgba(49,46,129,1) 100%)',
        boxShadow: '0 20px 60px rgba(99,102,241,0.3), inset 0 -10px 30px rgba(0,0,0,0.2)',
      },
      defaultContent: {},
    },
  },
  {
    id: 'ill-shape-line-art-corners',
    label: 'Corner Line Art',
    category: 'illustrations', subcategory: 'shapes',
    tags: ['shape', 'line-art', 'corners', 'gold', 'luxury', 'decorative'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Corner Lines',
      defaultStyle: { width: '100%', height: '300px' },
      defaultContent: { html: '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%" preserveAspectRatio="none"><g stroke="#c8a97e" stroke-width="0.75" fill="none" opacity="0.6"><polyline points="10,40 10,10 40,10"/><polyline points="10,50 10,10 50,10"/><line x1="10" y1="10" x2="30" y2="30" stroke-width="0.5"/><polyline points="360,10 390,10 390,40"/><polyline points="350,10 390,10 390,50"/><line x1="390" y1="10" x2="370" y2="30" stroke-width="0.5"/><polyline points="10,260 10,290 40,290"/><polyline points="10,250 10,290 50,290"/><line x1="10" y1="290" x2="30" y2="270" stroke-width="0.5"/><polyline points="360,290 390,290 390,260"/><polyline points="350,290 390,290 390,250"/><line x1="390" y1="290" x2="370" y2="270" stroke-width="0.5"/></g></svg>' },
    },
  },
]

// ─── GLASSMORPHIC ───

const GLASSMORPHIC: LibraryElementItem[] = [
  {
    id: 'ill-glass-card',
    label: 'Glassmorphic Card',
    category: 'illustrations', subcategory: 'glassmorphic',
    tags: ['glass', 'glassmorphism', 'card', 'blur', 'modern'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Glass Card',
      defaultStyle: {
        width: '350px', height: '220px', borderRadius: '1rem',
        backgroundColor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.12)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      },
      defaultContent: {},
    },
  },
  {
    id: 'ill-glass-circle',
    label: 'Glassmorphic Circle',
    category: 'illustrations', subcategory: 'glassmorphic',
    tags: ['glass', 'glassmorphism', 'circle', 'blur', 'modern'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Glass Circle',
      defaultStyle: {
        width: '200px', height: '200px', borderRadius: '99px',
        backgroundColor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.12)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      },
      defaultContent: {},
    },
  },
  {
    id: 'ill-glass-pill',
    label: 'Glassmorphic Pill',
    category: 'illustrations', subcategory: 'glassmorphic',
    tags: ['glass', 'glassmorphism', 'pill', 'capsule', 'blur', 'modern'],
    dropType: 'element',
    elementDef: {
      type: 'custom-container', label: 'Glass Pill',
      defaultStyle: {
        width: '300px', height: '80px', borderRadius: '99px',
        backgroundColor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.12)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      },
      defaultContent: {},
    },
  },
]

// ─── GEOMETRIC PATTERNS ───

const GEOMETRIC_PATTERNS: LibraryElementItem[] = [
  {
    id: 'illus-grid-dots',
    label: 'Dot Grid',
    category: 'illustrations', subcategory: 'patterns',
    tags: ['pattern', 'dots', 'grid', 'subtle', 'background'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Dot Grid',
      defaultStyle: { width: '200px', height: '200px', opacity: 0.15 },
      defaultContent: { html: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#0f172a"/><defs><pattern id="dot-grid-geo" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.5" fill="rgba(255,255,255,0.4)"/></pattern></defs><rect width="200" height="200" fill="url(#dot-grid-geo)"/></svg>' },
    },
  },
  {
    id: 'illus-isometric-cubes',
    label: 'Isometric Cubes',
    category: 'illustrations', subcategory: 'patterns',
    tags: ['pattern', 'isometric', 'cubes', '3d', 'monochrome'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Isometric Cubes',
      defaultStyle: { width: '200px', height: '200px', opacity: 0.2 },
      defaultContent: { html: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="iso-cubes-geo" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse"><path d="M30 0 L60 17.3 L60 52 L30 34.7 Z" fill="rgba(255,255,255,0.08)"/><path d="M30 0 L0 17.3 L0 52 L30 34.7 Z" fill="rgba(255,255,255,0.15)"/><path d="M0 17.3 L30 0 L60 17.3 L30 34.7 Z" fill="rgba(255,255,255,0.22)"/></pattern></defs><rect width="200" height="200" fill="url(#iso-cubes-geo)"/></svg>' },
    },
  },
  {
    id: 'illus-diagonal-lines',
    label: 'Diagonal Lines',
    category: 'illustrations', subcategory: 'patterns',
    tags: ['pattern', 'diagonal', 'lines', 'subtle', 'overlay'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Diagonal Lines',
      defaultStyle: { width: '200px', height: '200px', opacity: 0.12 },
      defaultContent: { html: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="diag-lines-geo" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="14" stroke="rgba(255,255,255,0.3)" stroke-width="0.75"/></pattern></defs><rect width="200" height="200" fill="url(#diag-lines-geo)"/></svg>' },
    },
  },
  {
    id: 'illus-hexagon-grid',
    label: 'Hexagon Grid',
    category: 'illustrations', subcategory: 'patterns',
    tags: ['pattern', 'hexagon', 'honeycomb', 'grid', 'gradient'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Hexagon Grid',
      defaultStyle: { width: '200px', height: '200px', opacity: 0.18 },
      defaultContent: { html: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hex-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="rgba(99,102,241,0.3)"/><stop offset="100%" stop-color="rgba(168,85,247,0.3)"/></linearGradient><pattern id="hex-grid-geo" x="0" y="0" width="40" height="46.19" patternUnits="userSpaceOnUse"><polygon points="20,2 37.32,11.1 37.32,28.1 20,37.19 2.68,28.1 2.68,11.1" fill="none" stroke="url(#hex-grad)" stroke-width="0.75"/><polygon points="40,25.1 57.32,34.19 57.32,51.19 40,60.29 22.68,51.19 22.68,34.19" fill="none" stroke="url(#hex-grad)" stroke-width="0.75" transform="translate(-20,-23.1)"/></pattern></defs><rect width="200" height="200" fill="url(#hex-grid-geo)"/></svg>' },
    },
  },
]

// ─── LINE ART ───

const LINE_ART: LibraryElementItem[] = [
  {
    id: 'illus-line-wave',
    label: 'Wave Line',
    category: 'illustrations', subcategory: 'decorative',
    tags: ['line-art', 'wave', 'elegant', 'accent', 'minimal'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Wave Line',
      defaultStyle: { width: '200px', height: '200px' },
      defaultContent: { html: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M10 100 C 40 60, 70 140, 100 100 S 160 60, 190 100" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round"/></svg>' },
    },
  },
  {
    id: 'illus-line-circles',
    label: 'Concentric Circles',
    category: 'illustrations', subcategory: 'decorative',
    tags: ['line-art', 'circles', 'concentric', 'minimal', 'geometric'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Concentric Circles',
      defaultStyle: { width: '200px', height: '200px' },
      defaultContent: { html: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" stroke-width="1" opacity="0.15"/><circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/><circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/><circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" stroke-width="1" opacity="0.7"/></svg>' },
    },
  },
  {
    id: 'illus-line-geometric',
    label: 'Geometric Composition',
    category: 'illustrations', subcategory: 'decorative',
    tags: ['line-art', 'geometric', 'abstract', 'triangles', 'composition'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Geometric Composition',
      defaultStyle: { width: '200px', height: '200px' },
      defaultContent: { html: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><polygon points="100,20 170,140 30,140" fill="none" stroke="currentColor" stroke-width="1" opacity="0.4"/><circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/><line x1="40" y1="40" x2="160" y2="160" stroke="currentColor" stroke-width="0.75" opacity="0.25"/><line x1="160" y1="40" x2="40" y2="160" stroke="currentColor" stroke-width="0.75" opacity="0.25"/><circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.4"/><polygon points="100,55 135,115 65,115" fill="none" stroke="currentColor" stroke-width="0.75" opacity="0.5"/></svg>' },
    },
  },
  {
    id: 'illus-line-flow',
    label: 'Flow Lines',
    category: 'illustrations', subcategory: 'decorative',
    tags: ['line-art', 'flow', 'curves', 'organic', 'elegant'],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: 'Flow Lines',
      defaultStyle: { width: '200px', height: '200px' },
      defaultContent: { html: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M20 80 C 60 20, 100 160, 140 80 S 200 40, 200 100" fill="none" stroke="currentColor" stroke-width="1" opacity="0.35" stroke-linecap="round"/><path d="M0 110 C 50 60, 90 180, 140 110 S 190 70, 210 120" fill="none" stroke="currentColor" stroke-width="1" opacity="0.25" stroke-linecap="round"/><path d="M10 140 C 40 90, 100 190, 150 130 S 180 100, 200 140" fill="none" stroke="currentColor" stroke-width="1" opacity="0.15" stroke-linecap="round"/></svg>' },
    },
  },
]

export const LIBRARY_ILLUSTRATIONS: LibraryElementItem[] = [
  ...BLOBS,
  ...GRADIENTS,
  ...PATTERNS,
  ...DECORATIVE,
  ...MESH_GRADIENTS,
  ...ABSTRACT_SHAPES,
  ...GLASSMORPHIC,
  ...GEOMETRIC_PATTERNS,
  ...LINE_ART,
]
