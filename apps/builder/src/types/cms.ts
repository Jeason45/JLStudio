// ─────────────────────────────────────────────
// CMS Field Types & Schema
// ─────────────────────────────────────────────

export type CmsFieldType =
  | 'plain-text'
  | 'rich-text'
  | 'image'
  | 'multi-image'
  | 'video'
  | 'link'
  | 'email'
  | 'phone'
  | 'number'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'color'
  | 'option'
  | 'multi-option'
  | 'reference'
  | 'multi-reference'

export interface CmsFieldValidation {
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: string
}

export interface CmsFieldDef {
  id: string
  slug: string
  name: string
  type: CmsFieldType
  required?: boolean
  helpText?: string
  options?: string[]
  referenceCollectionId?: string
  defaultValue?: unknown
  validations?: CmsFieldValidation
}

export interface CmsCollectionSettings {
  enablePages?: boolean
  templatePageId?: string
  primaryFieldSlug?: string
  thumbnailFieldSlug?: string
}

// ─────────────────────────────────────────────
// CMS Collection & Item (frontend interfaces)
// ─────────────────────────────────────────────

export interface CmsCollection {
  id: string
  siteId: string
  name: string
  slug: string
  fields: CmsFieldDef[]
  settings: CmsCollectionSettings
  createdAt: string
  updatedAt: string
  _count?: { items: number }
}

export type CmsItemStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'SCHEDULED'

export interface CmsItem {
  id: string
  collectionId: string
  slug: string
  data: Record<string, unknown>
  status: CmsItemStatus
  publishedAt?: string | null
  scheduledAt?: string | null
  createdAt: string
  updatedAt: string
}

// ─────────────────────────────────────────────
// CMS Bindings (stored in section.content)
// ─────────────────────────────────────────────

export type CmsFilterOperator = 'eq' | 'neq' | 'contains' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'exists'

export interface CmsFilter {
  fieldSlug: string
  operator: CmsFilterOperator
  value: unknown
}

export interface CmsListBinding {
  collectionId: string
  limit: number
  offset: number
  sortField: string
  sortDirection: 'asc' | 'desc'
  filters: CmsFilter[]
}

export type CmsFieldBindingProperty =
  | 'textContent'
  | 'src'
  | 'href'
  | 'alt'
  | 'innerHTML'
  | `style.${string}`

export interface CmsFieldBinding {
  fieldSlug: string
  property: CmsFieldBindingProperty
  fallback?: string
}

export type CmsVisibilityCondition = 'is-set' | 'is-not-set' | 'equals' | 'not-equals' | 'contains' | 'gt' | 'lt'

export interface CmsVisibilityRule {
  fieldSlug: string
  condition: CmsVisibilityCondition
  value?: unknown
  action: 'show' | 'hide'
}
