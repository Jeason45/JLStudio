/**
 * fingerprint.js — Semantic fingerprinting for novelty detection
 *
 * Generates deterministic hashes from patterns to detect duplicates.
 * Uses bucketed values (not exact pixels) to avoid near-miss duplicates.
 */

const crypto = require('crypto')

// ─── Bucketing helpers ──────────────────────────────────

function bucketRadius(px) {
  const v = parseInt(px) || 0
  if (v === 0) return 'sharp'
  if (v <= 8) return 'sm'
  if (v <= 20) return 'md'
  if (v <= 100) return 'pill'
  return 'full'
}

function bucketPadding(px) {
  const v = parseInt(px) || 0
  if (v <= 8) return 'tight'
  if (v <= 20) return 'normal'
  if (v <= 40) return 'spacious'
  return 'xl'
}

function bucketWeight(w) {
  const v = parseInt(w) || 400
  if (v <= 300) return 'light'
  if (v <= 500) return 'normal'
  if (v <= 700) return 'bold'
  return 'black'
}

function bucketFontSize(px) {
  const v = parseInt(px) || 16
  if (v <= 12) return 'xs'
  if (v <= 16) return 'sm'
  if (v <= 20) return 'md'
  if (v <= 28) return 'lg'
  if (v <= 40) return 'xl'
  return 'xxl'
}

function hasGradient(bg) {
  return bg && (bg.includes('gradient') || bg.includes('linear') || bg.includes('radial'))
}

function hasGlass(bg) {
  return bg && bg.includes('blur')
}

function isTransparent(color) {
  return !color || color === 'rgba(0, 0, 0, 0)' || color === 'transparent'
}

// ─── Hash utility ───────────────────────────────────────

function hash(str) {
  return crypto.createHash('md5').update(str).digest('hex').slice(0, 12)
}

// ─── Button fingerprint ────────────────────────────────

function fingerprintButton(styles) {
  const parts = [
    'btn',
    bucketRadius(styles.borderRadius),
    isTransparent(styles.backgroundColor) ? 'ghost' : 'solid',
    styles.border && styles.border !== '0px none' && !styles.border.startsWith('0px') ? 'border' : 'no-border',
    bucketWeight(styles.fontWeight),
    styles.textTransform === 'uppercase' ? 'upper' : 'normal',
    hasGradient(styles.background) ? 'gradient' : 'flat',
    bucketPadding(styles.padding),
  ]
  return parts.join(':')
}

// ─── Hover effect fingerprint ──────────────────────────

function fingerprintHover(changes) {
  const props = Object.keys(changes).sort()
  const types = []
  if (changes.backgroundColor) types.push('color-shift')
  if (changes.transform) types.push('transform')
  if (changes.boxShadow) types.push('shadow')
  if (changes.opacity) types.push('opacity')
  if (changes.scale) types.push('scale')
  if (changes.borderColor) types.push('border-color')
  if (changes.color) types.push('text-color')

  return 'hover:' + (types.length > 0 ? types.join('+') : props.join('+'))
}

// ─── Animation fingerprint ─────────────────────────────

function fingerprintAnimation(anim) {
  const type = anim.type || 'entrance'
  const props = (anim.properties || []).sort().join('+')
  return `anim:${type}:${props}`
}

// ─── Palette fingerprint ───────────────────────────────

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function bucketHue(h) {
  if (h < 30 || h >= 330) return 'red'
  if (h < 90) return 'yellow'
  if (h < 150) return 'green'
  if (h < 210) return 'cyan'
  if (h < 270) return 'blue'
  return 'purple'
}

function fingerprintPalette(colors) {
  // colors = { primary, secondary, accent, background, foreground }
  const hues = Object.values(colors)
    .filter(Boolean)
    .map(c => {
      const rgb = parseRgb(c)
      if (!rgb) return null
      const [h, s, l] = rgbToHsl(rgb.r, rgb.g, rgb.b)
      return { hue: bucketHue(h), light: l > 60 ? 'light' : 'dark' }
    })
    .filter(Boolean)

  const hueSet = [...new Set(hues.map(h => h.hue))].sort().join('+')
  const lightness = hues[0]?.light || 'light'
  return `palette:${lightness}:${hueSet}`
}

// ─── Typography fingerprint ────────────────────────────

function fingerprintTypography(headingFont, bodyFont) {
  const normalize = f => (f || '').split(',')[0].trim().toLowerCase().replace(/['"]/g, '')
  return `typo:${normalize(headingFont)}:${normalize(bodyFont)}`
}

// ─── Wireframe fingerprint ─────────────────────────────

function fingerprintWireframe(sectionTypes) {
  return 'wire:' + sectionTypes.join('>')
}

// ─── RGB parser ────────────────────────────────────────

function parseRgb(str) {
  if (!str) return null
  const match = str.match(/rgb[a]?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (!match) {
    // Try hex
    const hex = str.match(/#([0-9a-f]{6})/i)
    if (hex) {
      return {
        r: parseInt(hex[1].slice(0, 2), 16),
        g: parseInt(hex[1].slice(2, 4), 16),
        b: parseInt(hex[1].slice(4, 6), 16)
      }
    }
    return null
  }
  return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) }
}

function rgbToHex(str) {
  const rgb = parseRgb(str)
  if (!rgb) return str
  return '#' + [rgb.r, rgb.g, rgb.b].map(v => v.toString(16).padStart(2, '0')).join('')
}

module.exports = {
  fingerprintButton,
  fingerprintHover,
  fingerprintAnimation,
  fingerprintPalette,
  fingerprintTypography,
  fingerprintWireframe,
  hash,
  parseRgb,
  rgbToHex,
  bucketRadius,
  bucketPadding,
  bucketWeight,
  bucketFontSize,
  isTransparent,
}
