// ─────────────────────────────────────────────
// COMPONENT RESOLVER — Master → Instance content merging
// ─────────────────────────────────────────────

import type { SectionConfig, ComponentDefinition } from '@/types/site'

/** Get a value from an object by dot-path (e.g. "items.0.label") */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getByDotPath(obj: any, path: string): unknown {
  const keys = path.split('.')
  let current = obj
  for (const key of keys) {
    if (current == null) return undefined
    current = current[key]
  }
  return current
}

/** Set a value in an object by dot-path, creating intermediates as needed */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setByDotPath(obj: any, path: string, value: unknown): void {
  const keys = path.split('.')
  let current = obj
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (current[key] == null) {
      // Create array if next key is numeric, else object
      current[key] = /^\d+$/.test(keys[i + 1]) ? [] : {}
    }
    current = current[key]
  }
  current[keys[keys.length - 1]] = value
}

/**
 * Resolve the final content for an instance section.
 * Priority: propOverrides > variant overrides > master content
 */
export function resolveInstanceContent(
  section: SectionConfig,
  component: ComponentDefinition
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> {
  const instance = section.__componentInstance
  if (!instance || instance.isUnlinked) return section.content

  // Start with deep clone of master content
  const masterContent = JSON.parse(JSON.stringify(component.sectionSnapshot.content))

  // Apply variant overrides
  if (instance.variantId && component.variants) {
    const variant = component.variants.find(v => v.id === instance.variantId)
    if (variant) {
      for (const [key, value] of Object.entries(variant.overrides)) {
        setByDotPath(masterContent, key, JSON.parse(JSON.stringify(value)))
      }
    }
  }

  // Apply prop overrides
  if (component.props) {
    for (const prop of component.props) {
      const overrideValue = instance.propOverrides[prop.id]
      if (overrideValue !== undefined) {
        setByDotPath(masterContent, prop.contentPath, overrideValue)
      }
    }
  }

  // Preserve slot content
  if (component.slots) {
    for (const slot of component.slots) {
      const slotValue = instance.slotContent[slot.id]
      if (slotValue !== undefined) {
        setByDotPath(masterContent, slot.contentPath, slotValue)
      }
    }
  }

  return masterContent
}

/**
 * Sync an instance from its master.
 * Resets content to master, then re-applies prop overrides and slot content.
 */
export function syncInstanceFromMaster(
  section: SectionConfig,
  component: ComponentDefinition
): SectionConfig {
  const instance = section.__componentInstance
  if (!instance || instance.isUnlinked) return section

  const resolvedContent = resolveInstanceContent(section, component)

  return {
    ...section,
    content: resolvedContent,
    style: JSON.parse(JSON.stringify(component.sectionSnapshot.style)),
    type: component.sectionSnapshot.type,
    variant: component.sectionSnapshot.variant,
    elements: component.sectionSnapshot.elements
      ? JSON.parse(JSON.stringify(component.sectionSnapshot.elements))
      : undefined,
  }
}
