// ─────────────────────────────────────────────
// GOOGLE FONTS — ~80 fonts catégorisées
// ─────────────────────────────────────────────

export type FontCategory = 'sans-serif' | 'serif' | 'display' | 'handwriting' | 'monospace'

export type FontFileFormat = 'truetype' | 'opentype' | 'woff' | 'woff2'

export interface CustomFontFile {
  url: string
  format: FontFileFormat
  weight: number
  style: 'normal' | 'italic'
}

export interface CustomFontDef {
  id: string
  name: string
  files: CustomFontFile[]
  category: FontCategory
}

export interface FontAxisDef {
  tag: string
  name: string
  min: number
  max: number
  default: number
}

export interface FontDef {
  name: string
  category: FontCategory
  weights: number[]
  variable?: FontAxisDef[]
}

export const FONT_LIST: FontDef[] = [
  // ── Sans-serif ──
  { name: 'Inter', category: 'sans-serif', weights: [400, 500, 600, 700], variable: [{ tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400 }] },
  { name: 'DM Sans', category: 'sans-serif', weights: [400, 500, 600, 700], variable: [{ tag: 'wght', name: 'Weight', min: 100, max: 1000, default: 400 }] },
  { name: 'Poppins', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Outfit', category: 'sans-serif', weights: [400, 500, 600, 700], variable: [{ tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400 }] },
  { name: 'Plus Jakarta Sans', category: 'sans-serif', weights: [400, 500, 600, 700], variable: [{ tag: 'wght', name: 'Weight', min: 200, max: 800, default: 400 }] },
  { name: 'Sora', category: 'sans-serif', weights: [400, 500, 600, 700], variable: [{ tag: 'wght', name: 'Weight', min: 100, max: 800, default: 400 }] },
  { name: 'Nunito', category: 'sans-serif', weights: [400, 500, 600, 700], variable: [{ tag: 'wght', name: 'Weight', min: 200, max: 1000, default: 400 }] },
  { name: 'Raleway', category: 'sans-serif', weights: [400, 500, 600, 700], variable: [{ tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400 }] },
  { name: 'Lato', category: 'sans-serif', weights: [400, 700] },
  { name: 'Montserrat', category: 'sans-serif', weights: [400, 500, 600, 700], variable: [{ tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400 }] },
  { name: 'Open Sans', category: 'sans-serif', weights: [400, 500, 600, 700], variable: [{ tag: 'wght', name: 'Weight', min: 300, max: 800, default: 400 }] },
  { name: 'Roboto', category: 'sans-serif', weights: [400, 500, 700] },
  { name: 'Nunito Sans', category: 'sans-serif', weights: [400, 600, 700] },
  { name: 'Work Sans', category: 'sans-serif', weights: [400, 500, 600, 700], variable: [{ tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400 }] },
  { name: 'Manrope', category: 'sans-serif', weights: [400, 500, 600, 700], variable: [{ tag: 'wght', name: 'Weight', min: 200, max: 800, default: 400 }] },
  { name: 'Urbanist', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Figtree', category: 'sans-serif', weights: [400, 500, 600, 700], variable: [{ tag: 'wght', name: 'Weight', min: 300, max: 900, default: 400 }] },
  { name: 'Albert Sans', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Source Sans 3', category: 'sans-serif', weights: [400, 600, 700] },
  { name: 'Rubik', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Karla', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Josefin Sans', category: 'sans-serif', weights: [400, 600, 700] },
  { name: 'Mulish', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Cabin', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Barlow', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Lexend', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Space Grotesk', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Geist', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'IBM Plex Sans', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Archivo', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Red Hat Display', category: 'sans-serif', weights: [400, 500, 700] },

  // ── Serif ──
  { name: 'Playfair Display', category: 'serif', weights: [400, 600, 700] },
  { name: 'Merriweather', category: 'serif', weights: [400, 700] },
  { name: 'Libre Baskerville', category: 'serif', weights: [400, 700] },
  { name: 'Lora', category: 'serif', weights: [400, 500, 600, 700] },
  { name: 'EB Garamond', category: 'serif', weights: [400, 500, 600, 700] },
  { name: 'Cormorant Garamond', category: 'serif', weights: [400, 500, 600, 700] },
  { name: 'Crimson Text', category: 'serif', weights: [400, 600, 700] },
  { name: 'Bitter', category: 'serif', weights: [400, 500, 600, 700] },
  { name: 'PT Serif', category: 'serif', weights: [400, 700] },
  { name: 'Source Serif 4', category: 'serif', weights: [400, 600, 700] },
  { name: 'Noto Serif', category: 'serif', weights: [400, 700] },
  { name: 'DM Serif Display', category: 'serif', weights: [400] },
  { name: 'Fraunces', category: 'serif', weights: [400, 500, 600, 700] },
  { name: 'Instrument Serif', category: 'serif', weights: [400] },
  { name: 'Spectral', category: 'serif', weights: [400, 500, 600, 700] },

  // ── Display ──
  { name: 'Bebas Neue', category: 'display', weights: [400] },
  { name: 'Anton', category: 'display', weights: [400] },
  { name: 'Righteous', category: 'display', weights: [400] },
  { name: 'Abril Fatface', category: 'display', weights: [400] },
  { name: 'Bowlby One SC', category: 'display', weights: [400] },
  { name: 'Bungee', category: 'display', weights: [400] },
  { name: 'Press Start 2P', category: 'display', weights: [400] },
  { name: 'Monoton', category: 'display', weights: [400] },
  { name: 'Passion One', category: 'display', weights: [400, 700] },
  { name: 'Oswald', category: 'display', weights: [400, 500, 600, 700] },
  { name: 'Archivo Black', category: 'display', weights: [400] },
  { name: 'Titan One', category: 'display', weights: [400] },
  { name: 'Teko', category: 'display', weights: [400, 500, 600, 700] },

  // ── Handwriting ──
  { name: 'Dancing Script', category: 'handwriting', weights: [400, 500, 600, 700] },
  { name: 'Pacifico', category: 'handwriting', weights: [400] },
  { name: 'Great Vibes', category: 'handwriting', weights: [400] },
  { name: 'Caveat', category: 'handwriting', weights: [400, 500, 600, 700] },
  { name: 'Satisfy', category: 'handwriting', weights: [400] },
  { name: 'Kalam', category: 'handwriting', weights: [400, 700] },
  { name: 'Sacramento', category: 'handwriting', weights: [400] },
  { name: 'Indie Flower', category: 'handwriting', weights: [400] },
  { name: 'Shadows Into Light', category: 'handwriting', weights: [400] },
  { name: 'Patrick Hand', category: 'handwriting', weights: [400] },
  { name: 'Permanent Marker', category: 'handwriting', weights: [400] },

  // ── Monospace ──
  { name: 'JetBrains Mono', category: 'monospace', weights: [400, 500, 600, 700], variable: [{ tag: 'wght', name: 'Weight', min: 100, max: 800, default: 400 }] },
  { name: 'Fira Code', category: 'monospace', weights: [400, 500, 600, 700] },
  { name: 'Source Code Pro', category: 'monospace', weights: [400, 500, 600, 700] },
  { name: 'IBM Plex Mono', category: 'monospace', weights: [400, 500, 600, 700] },
  { name: 'Roboto Mono', category: 'monospace', weights: [400, 500, 700] },
  { name: 'Space Mono', category: 'monospace', weights: [400, 700] },
  { name: 'Inconsolata', category: 'monospace', weights: [400, 500, 600, 700] },
  { name: 'Ubuntu Mono', category: 'monospace', weights: [400, 700] },
]

export const FONT_CATEGORIES: { id: FontCategory; label: string }[] = [
  { id: 'sans-serif', label: 'Sans-serif' },
  { id: 'serif', label: 'Serif' },
  { id: 'display', label: 'Display' },
  { id: 'handwriting', label: 'Handwriting' },
  { id: 'monospace', label: 'Monospace' },
]

/** Encode a font name for Google Fonts CSS URL */
export function encodeFontForGoogle(font: FontDef): string {
  const encoded = font.name.replace(/\s+/g, '+')
  // Variable fonts use range syntax
  if (font.variable) {
    const wghtAxis = font.variable.find(a => a.tag === 'wght')
    if (wghtAxis) {
      return `${encoded}:wght@${wghtAxis.min}..${wghtAxis.max}`
    }
  }
  const weights = font.weights.join(';')
  return `${encoded}:wght@${weights}`
}

/** Get a map of font name → Google Fonts URL param for all fonts */
export function getGoogleFontsMap(): Record<string, string> {
  const map: Record<string, string> = {}
  for (const font of FONT_LIST) {
    map[font.name] = encodeFontForGoogle(font)
  }
  return map
}

/** Get fonts filtered by category */
export function getFontsByCategory(category: FontCategory): FontDef[] {
  return FONT_LIST.filter(f => f.category === category)
}

/** Find a font definition by name */
export function findFont(name: string): FontDef | undefined {
  return FONT_LIST.find(f => f.name === name)
}

/** Detect font file format from MIME type or filename extension */
export function detectFontFormat(mimeType: string, filename: string): FontFileFormat | null {
  const mime = mimeType.toLowerCase()
  if (mime === 'font/woff2' || mime === 'application/font-woff2') return 'woff2'
  if (mime === 'font/woff' || mime === 'application/font-woff') return 'woff'
  if (mime === 'font/ttf' || mime === 'application/x-font-ttf' || mime === 'font/sfnt') return 'truetype'
  if (mime === 'font/otf' || mime === 'application/x-font-opentype') return 'opentype'
  // Fallback to extension
  const ext = filename.split('.').pop()?.toLowerCase()
  if (ext === 'woff2') return 'woff2'
  if (ext === 'woff') return 'woff'
  if (ext === 'ttf') return 'truetype'
  if (ext === 'otf') return 'opentype'
  return null
}

/** MIME types accepted for font uploads */
export const FONT_MIME_TYPES = [
  'font/woff2', 'application/font-woff2',
  'font/woff', 'application/font-woff',
  'font/ttf', 'application/x-font-ttf', 'font/sfnt',
  'font/otf', 'application/x-font-opentype',
  'application/octet-stream', // browsers often send this for font files
]

/** File extensions accepted for font uploads */
export const FONT_EXTENSIONS = ['.ttf', '.otf', '.woff', '.woff2']
