import type { ElementStyleOverride } from '@/types/elements'
import type { CSSClass, TagStyleKey, TagStyles, StyleOrigin } from '@/types/classes'
import { getBreakpointCascade } from '@/types/breakpoints'

/**
 * Get inherited breakpoint styles by merging overrides along the cascade chain.
 * E.g. for breakpoint '480': merges base → 768 overrides → 480 overrides.
 */
function getInheritedBreakpointStyles(
  overrides: Record<string, Partial<ElementStyleOverride>> | undefined,
  breakpointId: string,
): Partial<ElementStyleOverride> {
  if (!overrides || breakpointId === 'base') return {}
  const cascade = getBreakpointCascade(breakpointId)
  const result: Partial<ElementStyleOverride> = {}
  // Skip 'base' (index 0) — base styles are handled separately
  for (let i = 1; i < cascade.length; i++) {
    const bpOverride = overrides[cascade[i]]
    if (bpOverride) {
      Object.assign(result, bpOverride)
    }
  }
  return result
}

/**
 * Resolve the final computed styles for an element by merging:
 * 1. Tag style (base defaults for the tag type)
 * 2. Classes (left-to-right = base -> combo overrides) + breakpoint overrides
 * 3. Inline overrides (base) + breakpoint overrides
 */
export function resolveElementStyles(
  tagName: TagStyleKey | undefined,
  classIds: string[],
  inlineOverrides: ElementStyleOverride | undefined,
  allClasses: CSSClass[],
  tagStyles: TagStyles | undefined,
  breakpointId: string = 'base',
  inlineBreakpointOverrides?: Record<string, Partial<ElementStyleOverride>>,
): ElementStyleOverride {
  const result: ElementStyleOverride = {}

  // 1. Tag style (base only — no breakpoint for tags)
  if (tagName && tagStyles?.[tagName]) {
    Object.assign(result, tagStyles[tagName])
  }

  // 2. Classes (in order) + breakpoint overrides
  for (const classId of classIds) {
    const cls = allClasses.find(c => c.id === classId)
    if (cls) {
      // Base class styles
      Object.assign(result, cls.styles)
      // Breakpoint overrides (inherited cascade)
      if (breakpointId !== 'base') {
        const bpStyles = getInheritedBreakpointStyles(cls.breakpointOverrides, breakpointId)
        Object.assign(result, bpStyles)
      }
    }
  }

  // 3. Inline base overrides
  if (inlineOverrides) {
    Object.assign(result, inlineOverrides)
  }

  // 4. Inline breakpoint overrides (inherited cascade)
  if (breakpointId !== 'base' && inlineBreakpointOverrides) {
    const bpStyles = getInheritedBreakpointStyles(inlineBreakpointOverrides, breakpointId)
    Object.assign(result, bpStyles)
  }

  return result
}

/**
 * Same resolution but tracks the origin of each CSS property.
 * Used for blue/orange/violet indicators in the style panel.
 */
export function resolveWithOrigins(
  tagName: TagStyleKey | undefined,
  classIds: string[],
  inlineOverrides: ElementStyleOverride | undefined,
  allClasses: CSSClass[],
  tagStyles: TagStyles | undefined,
  breakpointId: string = 'base',
  inlineBreakpointOverrides?: Record<string, Partial<ElementStyleOverride>>,
  stateId?: string | null,
): Record<string, StyleOrigin> {
  const origins: Record<string, StyleOrigin> = {}

  // 1. Tag style
  if (tagName && tagStyles?.[tagName]) {
    const tagStyle = tagStyles[tagName]!
    for (const [key, value] of Object.entries(tagStyle)) {
      if (value !== undefined) {
        origins[key] = { value, source: 'tag' }
      }
    }
  }

  // 2. Classes + breakpoint overrides
  for (let i = 0; i < classIds.length; i++) {
    const cls = allClasses.find(c => c.id === classIds[i])
    if (!cls) continue
    const source = i === 0 ? 'class' as const : 'combo' as const
    // Base styles
    for (const [key, value] of Object.entries(cls.styles)) {
      if (value !== undefined) {
        origins[key] = { value, source, className: cls.name }
      }
    }
    // Breakpoint overrides
    if (breakpointId !== 'base') {
      const bpStyles = getInheritedBreakpointStyles(cls.breakpointOverrides, breakpointId)
      for (const [key, value] of Object.entries(bpStyles)) {
        if (value !== undefined) {
          origins[key] = { value: value as string | number, source, className: cls.name }
        }
      }
    }
    // State overrides (overlay on top of base + breakpoint)
    if (stateId && cls.stateOverrides?.[stateId]) {
      for (const [key, value] of Object.entries(cls.stateOverrides[stateId])) {
        if (value !== undefined) {
          origins[key] = { value: value as string | number, source, className: cls.name }
        }
      }
    }
  }

  // 3. Inline overrides
  if (inlineOverrides) {
    for (const [key, value] of Object.entries(inlineOverrides)) {
      if (value !== undefined) {
        origins[key] = { value: value as string | number, source: 'inline' }
      }
    }
  }

  // 4. Inline breakpoint overrides
  if (breakpointId !== 'base' && inlineBreakpointOverrides) {
    const bpStyles = getInheritedBreakpointStyles(inlineBreakpointOverrides, breakpointId)
    for (const [key, value] of Object.entries(bpStyles)) {
      if (value !== undefined) {
        origins[key] = { value: value as string | number, source: 'inline' }
      }
    }
  }

  return origins
}

/**
 * Check if a specific property has a direct override at the given breakpoint
 * (not inherited from the cascade, but explicitly set at this exact breakpoint).
 */
export function hasBreakpointOverride(
  breakpointId: string,
  propKey: string,
  classOverrides?: Record<string, Partial<ElementStyleOverride>>,
  inlineOverrides?: Record<string, Partial<ElementStyleOverride>>,
): boolean {
  if (breakpointId === 'base') return false
  if (classOverrides?.[breakpointId]) {
    if ((classOverrides[breakpointId] as Record<string, unknown>)[propKey] !== undefined) return true
  }
  if (inlineOverrides?.[breakpointId]) {
    if ((inlineOverrides[breakpointId] as Record<string, unknown>)[propKey] !== undefined) return true
  }
  return false
}
