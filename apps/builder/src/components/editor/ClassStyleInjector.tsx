'use client'
import { useMemo } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { elementStyleToCSSString } from '@/lib/elementHelpers'
import type { ElementStyleOverride } from '@/types/elements'
import type { TagStyleKey, CSSClass } from '@/types/classes'
import { BREAKPOINTS, getMediaQuery } from '@/types/breakpoints'
import type { ElementBreakpointStyleMap } from '@/types/breakpoints'
import { ELEMENT_STATES, isPseudoElement } from '@/types/states'

/**
 * Generate state CSS rules (e.g. :hover, ::before) for a given selector and class list.
 * Returns base state rules and media-query state rules.
 */
function generateStateRules(
  selector: string,
  classIds: string[],
  allClasses: CSSClass[],
  baseRules: string[],
  addMediaRule: (bpId: string, rule: string) => void,
) {
  // Collect all state IDs used by any class on this element
  const stateIds = new Set<string>()
  for (const classId of classIds) {
    const cls = allClasses.find(c => c.id === classId)
    if (cls?.stateOverrides) {
      for (const sid of Object.keys(cls.stateOverrides)) stateIds.add(sid)
    }
  }

  for (const stateId of stateIds) {
    const stateDef = ELEMENT_STATES.find(s => s.id === stateId)
    if (!stateDef) continue

    // Merge state overrides from all classes
    const stateStyles: ElementStyleOverride = {}
    for (const classId of classIds) {
      const cls = allClasses.find(c => c.id === classId)
      if (cls?.stateOverrides?.[stateId]) {
        Object.assign(stateStyles, cls.stateOverrides[stateId])
      }
    }

    if (Object.keys(stateStyles).length === 0) continue

    // For ::before/::after, ensure content is set
    if (isPseudoElement(stateId) && (stateId === '::before' || stateId === '::after')) {
      if (!('content' in stateStyles)) {
        (stateStyles as Record<string, unknown>).content = '""'
      }
    }

    const cssStr = elementStyleToCSSString(stateStyles, true)

    // Real state rule: selector:hover { ... }
    baseRules.push(`${selector}${stateDef.cssSuffix} { ${cssStr} }`)

    // Force-state preview rule: #site-canvas[data-force-state=":hover"] selector { ... }
    // Only for pseudo-classes (not pseudo-elements — they can't be "forced")
    if (!isPseudoElement(stateId)) {
      baseRules.push(`#site-canvas[data-force-state="${stateId}"] ${selector.replace('#site-canvas ', '')} { ${cssStr} }`)
    }

    // Also generate state rules inside breakpoint media queries
    for (const classId of classIds) {
      const cls = allClasses.find(c => c.id === classId)
      if (!cls?.breakpointOverrides) continue
      for (const bpId of Object.keys(cls.breakpointOverrides)) {
        // Check if this class has state overrides at this breakpoint
        // For now, state overrides apply at all breakpoints (same as base)
        // Future: per-breakpoint state overrides
      }
    }
  }
}

/**
 * Injects a <style> tag into the document that renders:
 * 1. Tag styles (body, h1-h6, p, a, button, img) scoped to #site-canvas
 * 2. Resolved element styles (classes + inline overrides) via data-element-id selectors
 * 3. @media rules for breakpoint overrides (classes + inline)
 * 4. State rules (:hover, ::before, etc.) from class stateOverrides
 */
export function ClassStyleInjector() {
  const siteConfig = useEditorStore(s => s.siteConfig)

  const cssText = useMemo(() => {
    if (!siteConfig) return ''

    const baseRules: string[] = []
    const mediaRulesMap: Record<string, string[]> = {}
    const allClasses = siteConfig.classes ?? []
    const tagStyles = siteConfig.tagStyles

    // 1. Tag styles (base only)
    if (tagStyles) {
      const TAG_SELECTORS: Record<TagStyleKey, string> = {
        body: '#site-canvas',
        h1: '#site-canvas h1',
        h2: '#site-canvas h2',
        h3: '#site-canvas h3',
        h4: '#site-canvas h4',
        h5: '#site-canvas h5',
        h6: '#site-canvas h6',
        p: '#site-canvas p',
        a: '#site-canvas a',
        button: '#site-canvas button',
        img: '#site-canvas img',
      }
      for (const [tag, styles] of Object.entries(tagStyles)) {
        if (!styles || Object.keys(styles).length === 0) continue
        const selector = TAG_SELECTORS[tag as TagStyleKey]
        if (selector) {
          baseRules.push(`${selector} { ${elementStyleToCSSString(styles)} }`)
        }
      }
    }

    // Helper to add a rule into the right media query bucket
    const addMediaRule = (bpId: string, rule: string) => {
      const bp = BREAKPOINTS.find(b => b.id === bpId)
      if (!bp) return
      const mq = getMediaQuery(bp)
      if (!mq) return
      if (!mediaRulesMap[mq]) mediaRulesMap[mq] = []
      mediaRulesMap[mq].push(rule)
    }

    // 2. Per-element resolved styles (base + breakpoint overrides + states)
    for (const page of siteConfig.pages) {
      for (const section of page.sections) {
        const elementClasses = (section.content.__elementClasses ?? {}) as Record<string, string[]>
        const elementStyles = (section.content.__elementStyles ?? {}) as Record<string, ElementStyleOverride>
        const elementBpStyles = (section.content.__elementBreakpointStyles ?? {}) as ElementBreakpointStyleMap

        // Collect all content paths
        const paths = new Set([
          ...Object.keys(elementClasses),
          ...Object.keys(elementStyles),
          ...Object.keys(elementBpStyles),
        ])

        for (const contentPath of paths) {
          const classIds = elementClasses[contentPath] ?? []
          const inlineStyles = elementStyles[contentPath]
          const selector = `#site-canvas [data-element-id="${section.id}::${contentPath}"]`

          // ── Base rule (classes base + inline base) ──
          if (classIds.length > 0 || inlineStyles) {
            const resolved: ElementStyleOverride = {}
            for (const classId of classIds) {
              const cls = allClasses.find(c => c.id === classId)
              if (cls) Object.assign(resolved, cls.styles)
            }
            if (inlineStyles) Object.assign(resolved, inlineStyles)

            if (Object.keys(resolved).length > 0) {
              baseRules.push(`${selector} { ${elementStyleToCSSString(resolved, true)} }`)
            }
          }

          // ── State rules (:hover, ::before, etc.) ──
          if (classIds.length > 0) {
            generateStateRules(selector, classIds, allClasses, baseRules, addMediaRule)
          }

          // ── Breakpoint rules ──
          const bpIds = new Set<string>()
          for (const classId of classIds) {
            const cls = allClasses.find(c => c.id === classId)
            if (cls?.breakpointOverrides) {
              for (const bpId of Object.keys(cls.breakpointOverrides)) {
                bpIds.add(bpId)
              }
            }
          }
          const inlineBp = elementBpStyles[contentPath]
          if (inlineBp) {
            for (const bpId of Object.keys(inlineBp)) {
              bpIds.add(bpId)
            }
          }

          for (const bpId of bpIds) {
            const overrides: ElementStyleOverride = {}
            for (const classId of classIds) {
              const cls = allClasses.find(c => c.id === classId)
              if (cls?.breakpointOverrides?.[bpId]) {
                Object.assign(overrides, cls.breakpointOverrides[bpId])
              }
            }
            if (inlineBp?.[bpId]) {
              Object.assign(overrides, inlineBp[bpId])
            }

            if (Object.keys(overrides).length > 0) {
              addMediaRule(bpId, `${selector} { ${elementStyleToCSSString(overrides, true)} }`)
            }
          }
        }

        // 3. Custom elements with classes + inline breakpoint styles
        if (section.elements) {
          const processElements = (elements: typeof section.elements) => {
            if (!elements) return
            for (const el of elements) {
              const hasClasses = el.classes && el.classes.length > 0
              const hasBpStyles = el.breakpointStyles && Object.keys(el.breakpointStyles).length > 0
              if (hasClasses || hasBpStyles) {
                const selector = `#site-canvas [data-element-id="${section.id}::__el.${el.id}"]`
                const classIds = el.classes ?? []

                // Base
                if (hasClasses) {
                  const resolved: ElementStyleOverride = {}
                  for (const classId of classIds) {
                    const cls = allClasses.find(c => c.id === classId)
                    if (cls) Object.assign(resolved, cls.styles)
                  }
                  if (Object.keys(resolved).length > 0) {
                    baseRules.push(`${selector} { ${elementStyleToCSSString(resolved, true)} }`)
                  }

                  // State rules for custom elements
                  generateStateRules(selector, classIds, allClasses, baseRules, addMediaRule)
                }

                // Breakpoint overrides (classes + inline breakpointStyles)
                const bpIds = new Set<string>()
                for (const classId of classIds) {
                  const cls = allClasses.find(c => c.id === classId)
                  if (cls?.breakpointOverrides) {
                    for (const bpId of Object.keys(cls.breakpointOverrides)) bpIds.add(bpId)
                  }
                }
                if (el.breakpointStyles) {
                  for (const bpId of Object.keys(el.breakpointStyles)) bpIds.add(bpId)
                }

                for (const bpId of bpIds) {
                  const overrides: ElementStyleOverride = {}
                  for (const classId of classIds) {
                    const cls = allClasses.find(c => c.id === classId)
                    if (cls?.breakpointOverrides?.[bpId]) {
                      Object.assign(overrides, cls.breakpointOverrides[bpId])
                    }
                  }
                  // Inline breakpoint overrides on top of class overrides
                  if (el.breakpointStyles?.[bpId]) {
                    Object.assign(overrides, el.breakpointStyles[bpId] as ElementStyleOverride)
                  }
                  if (Object.keys(overrides).length > 0) {
                    addMediaRule(bpId, `${selector} { ${elementStyleToCSSString(overrides, true)} }`)
                  }
                }
              }
              if (el.children) processElements(el.children)
            }
          }
          processElements(section.elements)
        }
      }
    }

    // Build final CSS: base rules first, then media queries in order
    const parts = [baseRules.join('\n')]

    // Desktop-first: min-width ascending (1280→1440→1920), then max-width descending (991→767→479)
    const minBps = BREAKPOINTS.filter(b => b.type === 'min').reverse() // ascending width
    const maxBps = BREAKPOINTS.filter(b => b.type === 'max')           // descending width (already)
    const mqOrder = [...minBps, ...maxBps]
      .map(b => getMediaQuery(b)!)
      .filter(Boolean)

    for (const mq of mqOrder) {
      if (mediaRulesMap[mq]?.length) {
        parts.push(`${mq} {\n${mediaRulesMap[mq].join('\n')}\n}`)
      }
    }

    return parts.filter(Boolean).join('\n\n')
  }, [siteConfig])

  if (!cssText) return null

  return <style dangerouslySetInnerHTML={{ __html: cssText }} />
}
