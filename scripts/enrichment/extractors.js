/**
 * extractors.js — Extract library candidates from raw-data.json
 *
 * Transforms scan data into candidate library items:
 * buttons, hover effects, animations, palettes, typography, wireframes, section presets
 */

const {
  fingerprintButton, fingerprintHover, fingerprintAnimation,
  fingerprintPalette, fingerprintTypography, fingerprintWireframe,
  hash, parseRgb, rgbToHex, isTransparent, bucketRadius, bucketWeight,
} = require('./fingerprint')

// ─── BUTTONS ────────────────────────────────────────────

function extractButtonCandidates(rawData) {
  const buttons = rawData.css?.globalStyles?.buttons || []
  const candidates = []
  const seen = new Set()

  for (const btn of buttons) {
    const s = btn.styles
    if (!s) continue
    // Skip transparent/invisible buttons (just nav links)
    if (isTransparent(s.backgroundColor) && (!s.border || s.border.startsWith('0px'))) continue
    // Skip buttons with no padding (embedded controls, not real CTA buttons)
    if (s.padding === '0px') continue

    const fp = fingerprintButton(s)
    if (seen.has(fp)) continue
    seen.add(fp)

    const id = 'btn-scan-' + hash(fp)

    // Neutralize colors → use placeholder palette
    const bgHex = rgbToHex(s.backgroundColor)
    const colorHex = rgbToHex(s.color)
    const borderHex = s.border ? rgbToHex(s.border.split(' ').pop()) : null

    candidates.push({
      id,
      fingerprint: fp,
      category: 'components',
      subcategory: 'buttons',
      label: `Button ${bucketRadius(s.borderRadius)} ${bucketWeight(s.fontWeight)}`,
      tags: buildButtonTags(s),
      originalColors: { bg: bgHex, color: colorHex, border: borderHex },
      styles: {
        backgroundColor: bgHex,
        color: colorHex,
        borderRadius: s.borderRadius || '0px',
        padding: s.padding || '16px 24px',
        fontWeight: s.fontWeight || '400',
        textTransform: s.textTransform || 'none',
        letterSpacing: s.letterSpacing || 'normal',
        fontSize: s.fontSize || '16px',
        fontFamily: s.fontFamily || 'inherit',
        border: s.border || 'none',
      },
      source: btn.text || 'unknown',
    })
  }

  return candidates
}

function buildButtonTags(styles) {
  const tags = ['button']
  if (styles.textTransform === 'uppercase') tags.push('uppercase')
  if (parseInt(styles.fontWeight) >= 700) tags.push('bold')
  if (parseInt(styles.borderRadius) >= 20) tags.push('pill')
  if (parseInt(styles.borderRadius) === 0) tags.push('sharp')
  if (styles.border && !styles.border.startsWith('0px') && isTransparent(styles.backgroundColor)) tags.push('outline')
  if (styles.background?.includes('gradient')) tags.push('gradient')
  return tags
}

// ─── HOVER EFFECTS ──────────────────────────────────────

function extractHoverCandidates(rawData) {
  const effects = rawData.hover?.hoverEffects || []
  const transitions = rawData.hover?.transitions || []
  const candidates = []
  const seen = new Set()

  for (const effect of effects) {
    if (!effect.changes || Object.keys(effect.changes).length === 0) continue

    // Skip trivial color-only changes (just slightly darker)
    const changeKeys = Object.keys(effect.changes)
    if (changeKeys.length === 1 && changeKeys[0] === 'color') {
      const from = parseRgb(effect.changes.color.from)
      const to = parseRgb(effect.changes.color.to)
      if (from && to) {
        const delta = Math.abs(from.r - to.r) + Math.abs(from.g - to.g) + Math.abs(from.b - to.b)
        if (delta < 45) continue // Too subtle
      }
    }

    const fp = fingerprintHover(effect.changes)
    if (seen.has(fp)) continue
    seen.add(fp)

    const id = 'hover-scan-' + hash(fp)

    // Build transition timing from transitions array
    const matchingTransition = transitions.find(t =>
      t.element && effect.element && t.element.includes(effect.element.slice(0, 10))
    )

    candidates.push({
      id,
      fingerprint: fp,
      category: 'animations',
      subcategory: 'hovers',
      label: `Hover ${Object.keys(effect.changes).join(' + ')}`,
      tags: ['hover', ...Object.keys(effect.changes)],
      changes: effect.changes,
      transition: matchingTransition ? {
        duration: matchingTransition.transitionDuration || '0.3s',
        timing: matchingTransition.transitionTimingFunction || 'ease',
      } : { duration: '0.3s', timing: 'ease' },
      source: effect.element || 'unknown',
    })
  }

  return candidates
}

// ─── SCROLL ANIMATIONS ─────────────────────────────────

function extractScrollAnimCandidates(rawData) {
  const scroll = rawData.scroll?.scrollEffects || {}
  const candidates = []

  // fadeIn effects
  if (scroll.fadeIn?.length > 0) {
    // Group by unique animation type
    const types = new Set()
    for (const item of scroll.fadeIn) {
      const type = item.direction || item.type || 'fade-up'
      types.add(type)
    }
    for (const type of types) {
      const fp = `scroll:fadeIn:${type}`
      candidates.push({
        id: 'scroll-scan-' + hash(fp),
        fingerprint: fp,
        category: 'animations',
        subcategory: 'scroll',
        label: `Scroll Fade ${type}`,
        tags: ['scroll', 'fade', type],
        animationType: 'fadeIn',
        direction: type,
      })
    }
  }

  // slideIn effects
  if (scroll.slideIn?.length > 0) {
    const types = new Set()
    for (const item of scroll.slideIn) {
      const type = item.direction || item.type || 'slide-left'
      types.add(type)
    }
    for (const type of types) {
      const fp = `scroll:slideIn:${type}`
      candidates.push({
        id: 'scroll-scan-' + hash(fp),
        fingerprint: fp,
        category: 'animations',
        subcategory: 'scroll',
        label: `Scroll Slide ${type}`,
        tags: ['scroll', 'slide', type],
        animationType: 'slideIn',
        direction: type,
      })
    }
  }

  // counter animations
  if (scroll.counters?.length > 0) {
    const fp = 'scroll:counter'
    candidates.push({
      id: 'scroll-scan-' + hash(fp),
      fingerprint: fp,
      category: 'animations',
      subcategory: 'scroll',
      label: 'Scroll Counter',
      tags: ['scroll', 'counter', 'number'],
      animationType: 'counter',
    })
  }

  return candidates
}

// ─── CSS KEYFRAME ANIMATIONS ───────────────────────────

function extractKeyframeCandidates(rawData) {
  const keyframes = rawData.animations?.keyframes || []
  const cssAnims = rawData.animations?.cssAnimations || []
  const candidates = []
  const seen = new Set()

  for (const kf of keyframes) {
    if (!kf.name || !kf.frames) continue
    const fp = `keyframe:${kf.name}`
    if (seen.has(fp)) continue
    seen.add(fp)

    candidates.push({
      id: 'keyframe-scan-' + hash(fp),
      fingerprint: fp,
      category: 'animations',
      subcategory: 'loops',
      label: `Animation ${kf.name}`,
      tags: ['keyframe', 'css-animation'],
      keyframeName: kf.name,
      frames: kf.frames,
    })
  }

  for (const anim of cssAnims) {
    if (!anim.name) continue
    const fp = `cssanim:${anim.name}`
    if (seen.has(fp)) continue
    seen.add(fp)

    candidates.push({
      id: 'cssanim-scan-' + hash(fp),
      fingerprint: fp,
      category: 'animations',
      subcategory: 'entrances',
      label: `CSS Anim ${anim.name}`,
      tags: ['css-animation'],
      animationName: anim.name,
      config: anim,
    })
  }

  return candidates
}

// ─── COLOR PALETTES ────────────────────────────────────

function extractPaletteCandidates(rawData) {
  const body = rawData.css?.globalStyles?.body || {}
  const headings = rawData.css?.globalStyles?.headings || {}
  const buttons = rawData.css?.globalStyles?.buttons || []

  // Extract key colors
  const background = rgbToHex(body.backgroundColor)
  const foreground = rgbToHex(body.color)
  const headingColor = rgbToHex(headings.h1?.color || headings.h2?.color)

  // Find primary button color (first non-transparent button bg)
  const primaryBtn = buttons.find(b => !isTransparent(b.styles.backgroundColor))
  const primary = primaryBtn ? rgbToHex(primaryBtn.styles.backgroundColor) : null
  const accent = primary // Often the same in simple sites

  if (!background || !foreground) return []

  const colors = { primary, secondary: headingColor, accent, background, foreground, muted: foreground }
  const fp = fingerprintPalette(colors)

  // Classify the palette
  const bgRgb = parseRgb(background)
  const luminance = bgRgb ? (bgRgb.r * 0.299 + bgRgb.g * 0.587 + bgRgb.b * 0.114) : 200
  let paletteCategory = 'light'
  if (luminance < 50) paletteCategory = 'dark'
  else if (luminance < 128) paletteCategory = 'corporate'

  return [{
    id: 'palette-scan-' + hash(fp),
    fingerprint: fp,
    category: 'palettes',
    subcategory: paletteCategory,
    label: `Palette ${paletteCategory}`,
    tags: ['palette', paletteCategory],
    colors,
  }]
}

// ─── TYPOGRAPHY PAIRINGS ───────────────────────────────

function extractTypographyCandidates(rawData) {
  const headings = rawData.css?.globalStyles?.headings || {}
  const body = rawData.css?.globalStyles?.body || {}
  const fonts = rawData.libraries?.fonts || []

  const headingFont = headings.h1?.['font-family'] || headings.h2?.['font-family'] || fonts[0]
  const bodyFont = body.fontFamily || fonts[1] || fonts[0]

  if (!headingFont && !bodyFont) return []

  const fp = fingerprintTypography(headingFont, bodyFont)

  const normalize = f => (f || '').split(',')[0].trim().replace(/['"]/g, '')

  return [{
    id: 'typo-scan-' + hash(fp),
    fingerprint: fp,
    category: 'typography',
    subcategory: 'pairing',
    label: `${normalize(headingFont)} + ${normalize(bodyFont)}`,
    tags: ['typography'],
    heading: normalize(headingFont),
    body: normalize(bodyFont),
    headingWeight: headings.h1?.['font-weight'] || '700',
    bodyWeight: body.fontWeight || '400',
  }]
}

// ─── WIREFRAMES (from output.json) ─────────────────────

function extractWireframeCandidates(outputJson) {
  if (!outputJson?.sections?.length) return []

  const sectionTypes = outputJson.sections.map(s => s.type)
  const fp = fingerprintWireframe(sectionTypes)

  return [{
    id: 'wire-scan-' + hash(fp),
    fingerprint: fp,
    category: 'wireframes',
    subcategory: 'landing',
    label: `${sectionTypes.length}-section layout`,
    tags: ['wireframe', 'layout'],
    sectionTypes,
    sectionCount: sectionTypes.length,
  }]
}

// ─── SECTION PRESETS (from output.json) ────────────────

function extractSectionPresetCandidates(outputJson) {
  if (!outputJson?.sections?.length) return []

  const candidates = []
  for (const section of outputJson.sections) {
    if (!section.type || !section.variant) continue

    // Only save sections with meaningful content
    const contentKeys = Object.keys(section.content || {}).filter(k => section.content[k])
    if (contentKeys.length < 2) continue

    const fp = `preset:${section.type}:${section.variant}:${contentKeys.sort().join('+')}`
    candidates.push({
      id: 'preset-scan-' + hash(fp),
      fingerprint: fp,
      category: 'sectionPresets',
      subcategory: section.type,
      label: `${section.type} — ${section.variant}`,
      tags: ['section-preset', section.type],
      sectionType: section.type,
      variant: section.variant,
      style: section.style || {},
      content: section.content,
    })
  }

  return candidates
}

// ─── TEMPLATE (from output.json) ───────────────────────

function extractTemplateCandidates(outputJson, sourceUrl) {
  if (!outputJson?.sections?.length) return []

  const types = outputJson.sections.map(s => s.type).join('>')
  const fp = `template:${types}`

  return [{
    id: 'template-scan-' + hash(fp),
    fingerprint: fp,
    category: 'templates',
    subcategory: outputJson.brand?.universe || 'custom',
    label: outputJson.site?.name || 'Imported Template',
    tags: ['template', 'imported'],
    site: outputJson.site,
    brand: outputJson.brand,
    sections: outputJson.sections,
    sourceUrl: sourceUrl || outputJson.meta?.sourceUrl,
  }]
}

// ─── EXTRACT ALL ───────────────────────────────────────

function extractAll(rawData, outputJson, sourceUrl) {
  return {
    buttons: extractButtonCandidates(rawData),
    hovers: extractHoverCandidates(rawData),
    scrollAnims: extractScrollAnimCandidates(rawData),
    keyframes: extractKeyframeCandidates(rawData),
    palettes: extractPaletteCandidates(rawData),
    typography: extractTypographyCandidates(rawData),
    wireframes: extractWireframeCandidates(outputJson),
    sectionPresets: extractSectionPresetCandidates(outputJson),
    templates: extractTemplateCandidates(outputJson, sourceUrl),
  }
}

module.exports = {
  extractButtonCandidates,
  extractHoverCandidates,
  extractScrollAnimCandidates,
  extractKeyframeCandidates,
  extractPaletteCandidates,
  extractTypographyCandidates,
  extractWireframeCandidates,
  extractSectionPresetCandidates,
  extractTemplateCandidates,
  extractAll,
}
