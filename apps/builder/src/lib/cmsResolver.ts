import type { CmsFieldDef, CmsItem, CmsFieldBinding, CmsVisibilityRule } from '@/types/cms'

/**
 * Generate a URL-safe slug from text.
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    || 'item'
}

/**
 * Parse CSV string into CMS items data array.
 */
export function parseCsvToItems(csv: string, fields: CmsFieldDef[]): Record<string, unknown>[] {
  const lines = csv.trim().split('\n')
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
  const fieldMap = new Map(fields.map(f => [f.name.toLowerCase(), f]))

  return lines.slice(1).map(line => {
    const values = parseCsvLine(line)
    const data: Record<string, unknown> = {}
    headers.forEach((header, i) => {
      const field = fieldMap.get(header.toLowerCase())
      if (field && i < values.length) {
        data[field.slug] = coerceValue(values[i], field.type)
      }
    })
    return data
  })
}

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  for (const char of line) {
    if (char === '"') { inQuotes = !inQuotes; continue }
    if (char === ',' && !inQuotes) { result.push(current.trim()); current = ''; continue }
    current += char
  }
  result.push(current.trim())
  return result
}

function coerceValue(value: string, type: string): unknown {
  if (!value) return type === 'boolean' ? false : type === 'number' ? 0 : ''
  switch (type) {
    case 'number': return Number(value) || 0
    case 'boolean': return value.toLowerCase() === 'true' || value === '1'
    case 'date':
    case 'datetime': return value
    default: return value
  }
}

/**
 * Export items as CSV string.
 */
export function itemsToCsv(items: CmsItem[], fields: CmsFieldDef[]): string {
  const headers = fields.map(f => f.name)
  const rows = items.map(item =>
    fields.map(f => {
      const val = item.data[f.slug]
      if (val === null || val === undefined) return ''
      const str = String(val)
      return str.includes(',') || str.includes('"') || str.includes('\n')
        ? `"${str.replace(/"/g, '""')}"`
        : str
    }).join(',')
  )
  return [headers.join(','), ...rows].join('\n')
}

/**
 * Resolve a CMS field binding to get the display value from an item.
 */
export function resolveFieldBinding(binding: CmsFieldBinding, item: CmsItem): string {
  const value = item.data[binding.fieldSlug]
  if (value === null || value === undefined) return binding.fallback ?? ''
  if (Array.isArray(value)) return value.join(', ')
  return String(value)
}

/**
 * Resolve all field bindings for a section content against a CMS item.
 */
export function resolveCmsBindings(
  bindings: Record<string, CmsFieldBinding>,
  item: CmsItem,
): Record<string, string> {
  const resolved: Record<string, string> = {}
  for (const [contentPath, binding] of Object.entries(bindings)) {
    resolved[contentPath] = resolveFieldBinding(binding, item)
  }
  return resolved
}

/**
 * Evaluate a CMS visibility rule against an item.
 * Returns true if the element should be visible.
 */
export function evaluateVisibility(rule: CmsVisibilityRule, item: CmsItem): boolean {
  const value = item.data[rule.fieldSlug]
  let conditionMet = false

  switch (rule.condition) {
    case 'is-set':
      conditionMet = value !== null && value !== undefined && value !== ''
      break
    case 'is-not-set':
      conditionMet = value === null || value === undefined || value === ''
      break
    case 'equals':
      conditionMet = value === rule.value
      break
    case 'not-equals':
      conditionMet = value !== rule.value
      break
    case 'contains':
      conditionMet = typeof value === 'string' && typeof rule.value === 'string' && value.includes(rule.value)
      break
    case 'gt':
      conditionMet = typeof value === 'number' && typeof rule.value === 'number' && value > rule.value
      break
    case 'lt':
      conditionMet = typeof value === 'number' && typeof rule.value === 'number' && value < rule.value
      break
  }

  return rule.action === 'show' ? conditionMet : !conditionMet
}
