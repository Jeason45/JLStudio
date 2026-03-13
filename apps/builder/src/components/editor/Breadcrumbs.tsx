'use client'
import { useEditorStore } from '@/store/editorStore'
import { SECTION_ELEMENT_TREES } from '@/lib/sectionElementTree'
import type { CustomElement } from '@/types/elements'
import { ChevronRight } from 'lucide-react'

function findCustomElement(elements: CustomElement[], id: string): CustomElement | null {
  for (const el of elements) {
    if (el.id === id) return el
    if (el.children) {
      const found = findCustomElement(el.children, id)
      if (found) return found
    }
  }
  return null
}

function getSectionLabel(section: { type: string; variant: string; content: Record<string, unknown> }): string {
  if (section.type === 'site-header') return 'Main Navbar'
  if (section.type === 'site-footer') return 'Footer'
  if (section.type === 'custom') return 'Custom Section'
  const label = section.content?.__label
  if (typeof label === 'string' && label.trim()) return label.trim()
  const title = section.content?.title
  if (typeof title === 'string' && title.trim()) {
    return title.trim().length > 20 ? title.trim().slice(0, 20) + '…' : title.trim()
  }
  return section.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export function Breadcrumbs() {
  const { siteConfig, selectedPageId, selectedSectionId, selectedElementPath, selectSection, selectElement } = useEditorStore()

  const currentPage = siteConfig?.pages.find(p => p.id === selectedPageId)
  const selectedSection = currentPage?.sections.find(s => s.id === selectedSectionId)

  // Nothing selected
  if (!selectedSection) return null

  // Resolve element name
  let elementName: string | null = null
  if (selectedElementPath) {
    const idx = selectedElementPath.indexOf('::')
    const contentPath = idx !== -1 ? selectedElementPath.slice(idx + 2) : selectedElementPath

    if (contentPath.startsWith('__el.')) {
      // Custom element: sectionId::__el.elementId
      const elId = contentPath.slice(5)
      const el = findCustomElement(selectedSection.elements ?? [], elId)
      elementName = el?.label ?? 'Element'
    } else if (contentPath) {
      // Predefined element: sectionId::contentPath
      const trees = SECTION_ELEMENT_TREES[selectedSection.type] ?? []
      const node = trees.find(n => n.path === contentPath)
      if (node) {
        elementName = node.label
      } else {
        // Fallback: try DOM label, then make contentPath readable
        if (typeof document !== 'undefined') {
          const domEl = document.querySelector(`[data-element-id="${selectedElementPath}"]`) as HTMLElement | null
          if (domEl) {
            elementName = domEl.getAttribute('data-element-label') ?? null
          }
        }
        if (!elementName) {
          const lastPart = contentPath.split('.').pop() ?? contentPath
          elementName = lastPart.charAt(0).toUpperCase() + lastPart.slice(1)
        }
      }
    }
  }

  const sectionLabel = getSectionLabel(selectedSection)

  return (
    <div className="h-6 bg-zinc-900 border-t border-zinc-800 flex items-center gap-0.5 px-3 text-[11px] text-zinc-500 shrink-0 select-none">
      <button
        onClick={() => { selectSection(null); selectElement(null) }}
        className="hover:text-white transition-colors"
      >
        Body
      </button>

      <ChevronRight className="w-3 h-3 text-zinc-700 shrink-0" />

      <button
        onClick={() => { selectSection(selectedSection.id); selectElement(null) }}
        className={!selectedElementPath ? 'text-blue-400' : 'hover:text-white transition-colors'}
      >
        {sectionLabel}
      </button>

      {elementName && (
        <>
          <ChevronRight className="w-3 h-3 text-zinc-700 shrink-0" />
          <span className="text-blue-400 truncate">{elementName}</span>
        </>
      )}
    </div>
  )
}
