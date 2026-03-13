import type { ElementStyleOverride } from './elements'

// ─────────────────────────────────────────────
// CSS CLASSES SYSTEM
// ─────────────────────────────────────────────

export interface CSSClass {
  id: string              // crypto.randomUUID()
  name: string            // "btn-primary"
  styles: ElementStyleOverride
  // Ready for Step 3/4 (breakpoints & pseudo-states):
  breakpointOverrides?: Record<string, Partial<ElementStyleOverride>>
  stateOverrides?: Record<string, Partial<ElementStyleOverride>>
}

export type TagStyleKey = 'body' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'a' | 'button' | 'img'

export type TagStyles = Partial<Record<TagStyleKey, ElementStyleOverride>>

/** Map of contentPath -> classIds[] */
export type ElementClassMap = Record<string, string[]>

export interface StyleOrigin {
  value: string | number
  source: 'tag' | 'class' | 'combo' | 'inline'
  className?: string
}
