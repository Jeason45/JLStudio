'use client'
import { useState, useEffect } from 'react'

const STYLE_KEYS = [
  // Typography
  'fontFamily', 'fontWeight', 'fontSize', 'lineHeight', 'color',
  'textAlign', 'textDecoration', 'textDecorationStyle', 'textDecorationColor',
  'letterSpacing', 'textIndent', 'textTransform', 'fontStyle', 'direction',
  'wordBreak', 'overflowWrap', 'whiteSpace', 'textOverflow',
  // Background
  'backgroundColor', 'backgroundClip', 'backgroundImage',
  // Border
  'borderRadius', 'borderStyle', 'borderWidth', 'borderColor',
  // Effects
  'opacity', 'mixBlendMode', 'cursor',
  // Outline
  'outlineStyle', 'outlineWidth', 'outlineColor', 'outlineOffset',
  // Layout
  'display', 'flexDirection', 'flexWrap', 'justifyContent', 'alignItems',
  'gap', 'rowGap', 'columnGap',
  'gridTemplateColumns', 'gridTemplateRows', 'gridAutoFlow',
  'justifyItems', 'alignContent', 'justifySelf', 'alignSelf',
  'flexGrow', 'flexShrink', 'flexBasis', 'order',
  'objectFit', 'objectPosition', 'boxSizing', 'aspectRatio',
  // Spacing
  'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  // Size
  'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
  'overflow',
  // Position
  'position', 'top', 'right', 'bottom', 'left', 'zIndex',
  'float', 'clear',
] as const

type ComputedStyles = Partial<Record<string, string>>

/** Convert any CSS color to hex via a canvas */
function colorToHex(raw: string): string {
  if (!raw || raw === 'transparent' || raw === 'rgba(0, 0, 0, 0)') return ''
  // Already hex
  if (raw.startsWith('#')) return raw
  // Use canvas 2D to convert any color format (rgb, hsl, lab, oklch etc.) to hex
  try {
    const ctx = document.createElement('canvas').getContext('2d')
    if (!ctx) return raw
    ctx.fillStyle = raw
    const hex = ctx.fillStyle // Always returns #rrggbb
    return hex
  } catch {
    return raw
  }
}

const KEEP_DEFAULTS = new Set([
  'textAlign', 'fontWeight', 'fontSize', 'color', 'fontFamily',
  'display', 'flexDirection', 'justifyContent', 'alignItems',
  'position', 'boxSizing', 'cursor', 'borderStyle', 'objectFit',
  'mixBlendMode', 'float', 'clear',
  'overflow', 'gridAutoFlow', 'justifyItems', 'alignContent',
  'justifySelf', 'alignSelf',
  'width', 'height',
])

function cleanValue(key: string, raw: string, cs: CSSStyleDeclaration): string {
  if (!raw) return ''
  if (!KEEP_DEFAULTS.has(key)) {
    if (raw === 'normal' || raw === 'none' || raw === 'auto') return ''
  }
  if (key === 'color' || key === 'backgroundColor' || key === 'textDecorationColor' || key === 'borderColor' || key === 'outlineColor') {
    return colorToHex(raw)
  }
  if (key === 'fontFamily') {
    return raw.split(',')[0].replace(/['"]/g, '').trim()
  }
  if (key === 'fontWeight') return raw
  if (key === 'fontSize') return raw
  if (key === 'lineHeight') {
    if (raw === 'normal') return ''
    const lhPx = parseFloat(raw)
    const fsPx = parseFloat(cs.getPropertyValue('font-size'))
    if (fsPx && lhPx) {
      const ratio = Math.round((lhPx / fsPx) * 100) / 100
      return String(ratio)
    }
    return raw
  }
  if (key === 'textDecoration') {
    const first = raw.split(' ')[0]
    return first === 'none' ? '' : first
  }
  if (key === 'textAlign') {
    return raw === 'start' ? 'left' : raw === 'end' ? 'right' : raw
  }
  // Spacing: 0px is the default, don't show it
  if (key.startsWith('margin') || key.startsWith('padding')) {
    return raw === '0px' ? '' : raw
  }
  // Size: auto is default for width/height, 0px for min, none for max
  if (key === 'width' || key === 'height') {
    // computed always returns px, but 'auto' means no explicit size
    // keep value so user sees computed width/height
  }
  if (key === 'minWidth' || key === 'minHeight') {
    return raw === '0px' ? '' : raw
  }
  if (key === 'maxWidth' || key === 'maxHeight') {
    return raw === 'none' ? '' : raw
  }
  // Position offsets: auto means not set
  if (key === 'top' || key === 'right' || key === 'bottom' || key === 'left') {
    return raw === 'auto' ? '' : raw
  }
  // Flex defaults
  if (key === 'flexGrow') return raw === '0' ? '' : raw
  if (key === 'flexShrink') return raw === '1' ? '' : raw
  if (key === 'order') return raw === '0' ? '' : raw
  return raw
}

export function useComputedStyles(selectedElementPath: string | null): ComputedStyles {
  const [computed, setComputed] = useState<ComputedStyles>({})

  useEffect(() => {
    if (!selectedElementPath) {
      setComputed({})
      return
    }

    const timer = setTimeout(() => {
      const canvas = document.getElementById('site-canvas')
      if (!canvas) return

      const el = canvas.querySelector(`[data-element-id="${CSS.escape(selectedElementPath)}"]`) as HTMLElement | null
      if (!el) return

      const cs = window.getComputedStyle(el)
      const result: ComputedStyles = {}

      for (const key of STYLE_KEYS) {
        const raw = cs.getPropertyValue(
          key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
        )
        const cleaned = cleanValue(key, raw, cs)
        if (cleaned) result[key] = cleaned
      }

      setComputed(result)
    }, 50)

    return () => clearTimeout(timer)
  }, [selectedElementPath])

  return computed
}
