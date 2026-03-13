'use client'
import { useMemo } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { CodeEditor } from '../CodeEditor'
import { resolveElementStyles } from '@/lib/cascadeResolver'
import { parseElementId } from '@/lib/elementHelpers'
import { Copy } from 'lucide-react'
import type { ElementStyleOverride } from '@/types/elements'
import type { TagStyleKey } from '@/types/classes'
import { BREAKPOINTS, getMediaQuery } from '@/types/breakpoints'
import { getStateById } from '@/types/states'

function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
}

function stylesToCSS(styles: ElementStyleOverride, selector: string): string {
  const entries = Object.entries(styles).filter(([, v]) => v !== undefined && v !== '')
  if (entries.length === 0) return ''
  const props = entries.map(([k, v]) => `  ${camelToKebab(k)}: ${v};`).join('\n')
  return `${selector} {\n${props}\n}`
}

export function CSSPreviewPanel() {
  const { selectedElementPath, siteConfig, activeBreakpoint, activeState } = useEditorStore()

  const cssOutput = useMemo(() => {
    if (!selectedElementPath || !siteConfig) return ''

    const parsed = parseElementId(selectedElementPath)
    if (!parsed) return '/* No element selected */'

    const { sectionId, contentPath } = parsed
    const section = siteConfig.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
    if (!section) return '/* Section not found */'

    const allClasses = siteConfig.classes ?? []
    const tagStyles = siteConfig.tagStyles
    const elementStyles = (section.content.__elementStyles as Record<string, ElementStyleOverride> | undefined) ?? {}
    const elementClasses = (section.content.__elementClasses as Record<string, string[]> | undefined) ?? {}
    const elementBreakpointStyles = (section.content.__elementBreakpointStyles as Record<string, Record<string, Partial<ElementStyleOverride>>> | undefined) ?? {}

    const inlineOverrides = elementStyles[contentPath]
    const classIds = elementClasses[contentPath] ?? []
    const inlineBpOverrides = elementBreakpointStyles[contentPath]

    // Resolve
    const resolved = resolveElementStyles(
      undefined as TagStyleKey | undefined,
      classIds,
      inlineOverrides,
      allClasses,
      tagStyles,
      activeBreakpoint,
      inlineBpOverrides,
    )

    const parts: string[] = []

    // Show individual classes
    for (const classId of classIds) {
      const cls = allClasses.find(c => c.id === classId)
      if (cls) {
        parts.push(stylesToCSS(cls.styles as ElementStyleOverride, `.${cls.name}`))
      }
    }

    // Show inline overrides
    if (inlineOverrides && Object.keys(inlineOverrides).length > 0) {
      parts.push(stylesToCSS(inlineOverrides, '/* Inline overrides */\n[element]'))
    }

    // Show resolved
    const selectorSuffix = activeState ? getStateById(activeState)?.cssSuffix ?? '' : ''
    const selector = `.element${selectorSuffix}`
    parts.push('')
    parts.push(stylesToCSS(resolved, `/* Computed */\n${selector}`))

    // Wrap in @media if breakpoint
    if (activeBreakpoint !== 'base') {
      const bp = BREAKPOINTS.find(b => b.id === activeBreakpoint)
      if (bp) {
        const mq = getMediaQuery(bp)
        if (mq) {
          const inner = parts.join('\n\n')
          return `${mq} {\n${inner.split('\n').map(l => '  ' + l).join('\n')}\n}`
        }
      }
    }

    return parts.filter(Boolean).join('\n\n')
  }, [selectedElementPath, siteConfig, activeBreakpoint, activeState])

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput).catch(() => {})
  }

  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-zinc-300 font-medium">CSS Preview</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-[10px] text-zinc-500 hover:text-white bg-zinc-800 rounded hover:bg-zinc-700 transition-colors"
        >
          <Copy className="w-3 h-3" /> Copy
        </button>
      </div>
      <CodeEditor value={cssOutput} language="css" readOnly rows={16} />
    </div>
  )
}
