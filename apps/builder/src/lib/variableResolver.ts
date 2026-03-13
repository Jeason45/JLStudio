import type { CSSVariable } from '@/types/site'

/**
 * Sanitize variable name to valid CSS custom property name
 */
export function varCssName(variable: CSSVariable): string {
  return `--${variable.name.replace(/[^a-zA-Z0-9-_]/g, '-')}`
}

/**
 * Resolve a variable's value considering active mode and aliases
 */
export function resolveVariableValue(
  variable: CSSVariable,
  allVariables: CSSVariable[],
  activeMode: string | null,
  depth = 0
): string {
  if (depth > 10) return variable.value // prevent infinite alias loops

  // Pick mode value if available
  let raw = variable.value
  if (activeMode && variable.modeValues?.[activeMode]) {
    raw = variable.modeValues[activeMode]
  }

  // Resolve alias
  if (raw.startsWith('alias:')) {
    const targetId = raw.slice(6)
    const target = allVariables.find(v => v.id === targetId)
    if (target) {
      return resolveVariableValue(target, allVariables, activeMode, depth + 1)
    }
  }

  return raw
}

/**
 * Check if a style value references a CSS variable
 */
export function isVarRef(value: string): boolean {
  return typeof value === 'string' && value.startsWith('var(')
}

/**
 * Extract variable name from var() reference
 */
export function extractVarName(value: string): string | null {
  const match = value.match(/^var\(--([^,)]+)/)
  return match ? match[1] : null
}

/**
 * Check if value contains CSS functions (clamp, calc, min, max)
 */
export function hasCssFunctions(value: string): boolean {
  return /(?:clamp|calc|min|max)\s*\(/.test(value)
}

/**
 * Export variables to W3C Design Tokens JSON format
 */
export function exportDesignTokens(variables: CSSVariable[]): string {
  const tokens: Record<string, Record<string, unknown>> = {}

  for (const v of variables) {
    const group = v.group || 'ungrouped'
    if (!tokens[group]) tokens[group] = {}

    const token: Record<string, unknown> = {
      $value: v.value,
      $type: v.type === 'font-family' ? 'fontFamily' : v.type,
    }
    if (v.description) token.$description = v.description
    if (v.modeValues && Object.keys(v.modeValues).length > 0) {
      token.$extensions = { modes: v.modeValues }
    }

    tokens[group][v.name] = token
  }

  return JSON.stringify(tokens, null, 2)
}

/**
 * Import variables from W3C Design Tokens JSON
 */
export function parseDesignTokens(json: string): CSSVariable[] {
  const data = JSON.parse(json) as Record<string, Record<string, Record<string, unknown>>>
  const variables: CSSVariable[] = []

  for (const [group, tokens] of Object.entries(data)) {
    for (const [name, token] of Object.entries(tokens)) {
      if (!token.$value) continue
      const rawType = (token.$type as string) || 'color'
      const type = (rawType === 'fontFamily' ? 'font-family' : rawType) as CSSVariable['type']

      const variable: CSSVariable = {
        id: `var-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name,
        type,
        value: String(token.$value),
        group: group === 'ungrouped' ? undefined : group,
        description: token.$description as string | undefined,
      }

      const modes = (token.$extensions as Record<string, unknown>)?.modes as Record<string, string> | undefined
      if (modes) variable.modeValues = modes

      variables.push(variable)
    }
  }

  return variables
}
