import type { ElementStyleOverride } from './elements'

// ─────────────────────────────────────────────
// RESPONSIVE BREAKPOINTS SYSTEM
// Desktop-first cascade like Webflow
// ─────────────────────────────────────────────

export interface BreakpointDef {
  id: string
  label: string
  shortLabel: string
  width: number
  icon: string
  shortcut?: string
  type: 'min' | 'max' | 'base'
}

/**
 * Breakpoints ordered from largest to smallest.
 * Base = 992px (no media query, default styles).
 * Above base: @media (min-width: Xpx)
 * Below base: @media (max-width: Xpx)
 */
export const BREAKPOINTS: BreakpointDef[] = [
  { id: '1920', label: '1920px',           shortLabel: '1920',           width: 1920, icon: 'Monitor',    type: 'min' },
  { id: '1440', label: '1440px',           shortLabel: '1440',           width: 1440, icon: 'Monitor',    type: 'min' },
  { id: '1280', label: '1280px',           shortLabel: '1280',           width: 1280, icon: 'Monitor',    type: 'min' },
  { id: 'base', label: 'Base (992px)',     shortLabel: 'Desktop',        width: 992,  icon: 'Monitor',    type: 'base', shortcut: '1' },
  { id: '768',  label: 'Tablet',           shortLabel: 'Tablet',         width: 768,  icon: 'Tablet',     type: 'max',  shortcut: '2' },
  { id: '480',  label: 'Mobile landscape', shortLabel: 'M. Landscape',   width: 480,  icon: 'Smartphone', type: 'max',  shortcut: '3' },
  { id: '320',  label: 'Mobile portrait',  shortLabel: 'M. Portrait',    width: 320,  icon: 'Smartphone', type: 'max' },
]

/** Primary breakpoints shown as main icons in breadcrumb (4 like Webflow) */
export const PRIMARY_BREAKPOINTS = BREAKPOINTS.filter(b =>
  ['base', '768', '480', '320'].includes(b.id)
)

/** Secondary breakpoints shown in dropdown */
export const SECONDARY_BREAKPOINTS = BREAKPOINTS.filter(b =>
  ['1920', '1440', '1280'].includes(b.id)
)

export function getBreakpointById(id: string): BreakpointDef | undefined {
  return BREAKPOINTS.find(b => b.id === id)
}

/**
 * Get the media query string for a breakpoint.
 * Returns null for 'base' (no media query needed).
 */
export function getMediaQuery(bp: BreakpointDef): string | null {
  if (bp.type === 'base') return null
  if (bp.type === 'min') return `@media (min-width: ${bp.width}px)`
  // max-width uses (breakpoint - 1) to avoid overlap with base
  // e.g. 768 → max-width: 991px (just below base 992)
  // But for breakpoints below other max breakpoints, use their own width - 1
  const maxWidthMap: Record<string, number> = {
    '768': 991,   // just below base 992
    '480': 767,   // just below 768
    '320': 479,   // just below 480
  }
  const maxWidth = maxWidthMap[bp.id] ?? (bp.width - 1)
  return `@media (max-width: ${maxWidth}px)`
}

/**
 * Desktop-first cascade: returns the chain of breakpoint ids
 * from base toward the given breakpoint (inclusive).
 *
 * For max breakpoints (below base): base → 768 → 480 → 320
 * For min breakpoints (above base): base → 1280 → 1440 → 1920
 */
export function getBreakpointCascade(breakpointId: string): string[] {
  if (breakpointId === 'base') return ['base']

  const bp = getBreakpointById(breakpointId)
  if (!bp) return ['base']

  if (bp.type === 'max') {
    // Below base: cascade is base → 768 → 480 → 320 (stop at target)
    const chain = ['base']
    const belowIds = ['768', '480', '320']
    for (const id of belowIds) {
      chain.push(id)
      if (id === breakpointId) break
    }
    return chain
  }

  // Above base: cascade is base → 1280 → 1440 → 1920 (stop at target)
  const chain = ['base']
  const aboveIds = ['1280', '1440', '1920']
  for (const id of aboveIds) {
    chain.push(id)
    if (id === breakpointId) break
  }
  return chain
}

/**
 * Returns "Affects {width}px and below" for max breakpoints,
 * "Affects {width}px and above" for min breakpoints, null for base.
 */
export function getAffectsLabel(bpId: string): string | null {
  const bp = getBreakpointById(bpId)
  if (!bp || bp.type === 'base') return null
  if (bp.type === 'max') {
    // max-width breakpoints affect from their upper bound downward
    const maxWidthMap: Record<string, number> = { '768': 991, '480': 767, '320': 479 }
    const w = maxWidthMap[bp.id] ?? (bp.width - 1)
    return `Affects ${w}px and below`
  }
  return `Affects ${bp.width}px and above`
}

/** Breakpoints shown in canvas switcher (primary + 320px) */
export const CANVAS_BREAKPOINTS = BREAKPOINTS.filter(b =>
  ['base', '768', '480', '320'].includes(b.id)
)

/** Map of contentPath → Record<breakpointId, Partial<ElementStyleOverride>> */
export type ElementBreakpointStyleMap = Record<string, Record<string, Partial<ElementStyleOverride>>>
