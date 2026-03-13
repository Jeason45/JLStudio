// ─────────────────────────────────────────────
// COMPONENT SYSTEM — Master/Instance types
// ─────────────────────────────────────────────

export type ComponentPropType = 'text' | 'image' | 'link' | 'boolean' | 'color' | 'enum'

export interface ComponentPropDef {
  id: string
  name: string
  label: string
  type: ComponentPropType
  defaultValue: string | boolean
  /** Dot-path into section content, e.g. "title" or "items.0.label" */
  contentPath: string
  enumOptions?: string[]
}

export interface ComponentSlotDef {
  id: string
  name: string
  label: string
  /** Dot-path to the slot container in content */
  contentPath: string
}

export interface ComponentVariantDef {
  id: string
  name: string
  /** Content overrides applied on top of master */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  overrides: Record<string, any>
  /** Style overrides */
  styleOverrides?: Record<string, unknown>
}

export interface ComponentInstanceData {
  componentId: string
  variantId?: string
  /** Per-prop overrides keyed by prop id */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propOverrides: Record<string, any>
  /** Slot content keyed by slot id */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slotContent: Record<string, any>
  /** When true, instance is detached from master */
  isUnlinked?: boolean
}
