'use client'
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { SECTION_ELEMENT_TREES } from '@/lib/sectionElementTree'
import { Search, FileText, LayoutDashboard, Type, MousePointer, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchResult {
  type: 'page' | 'section' | 'element' | 'text'
  label: string
  description: string
  preview?: string
  pageId?: string
  sectionId?: string
  elementPath?: string
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
  page: <FileText className="w-4 h-4 text-blue-400" />,
  section: <LayoutDashboard className="w-4 h-4 text-green-400" />,
  element: <MousePointer className="w-4 h-4 text-purple-400" />,
  text: <Type className="w-4 h-4 text-orange-400" />,
}

const GROUP_LABELS: Record<string, string> = {
  page: 'Pages',
  section: 'Sections',
  element: 'Elements',
  text: 'Contenu texte',
}

// Custom event to open QuickFind from anywhere
export const QUICK_FIND_EVENT = 'quick-find:open'

/** Fuzzy match: each word in query must be present in target (case-insensitive) */
function fuzzyMatch(target: string, query: string): boolean {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const t = target.toLowerCase()
  return words.every(w => t.includes(w))
}

export function QuickFind() {
  const { siteConfig, selectPage, selectSection, selectElement } = useEditorStore()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Open via custom event
  useEffect(() => {
    const handleOpen = () => setOpen(true)
    window.addEventListener(QUICK_FIND_EVENT, handleOpen)
    return () => window.removeEventListener(QUICK_FIND_EVENT, handleOpen)
  }, [])

  // Cmd+E shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input on open
  useEffect(() => {
    if (open) {
      setSearch('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Search logic with fuzzy matching
  const results = useMemo((): SearchResult[] => {
    if (!search.trim() || !siteConfig) return []
    const q = search.trim()
    const items: SearchResult[] = []

    for (const page of siteConfig.pages) {
      if (fuzzyMatch(page.title, q) || fuzzyMatch(page.slug, q)) {
        items.push({
          type: 'page',
          label: page.title,
          description: `Page — /${page.slug}`,
          preview: `${page.sections.length} section${page.sections.length !== 1 ? 's' : ''}`,
          pageId: page.id,
        })
      }

      for (const section of page.sections) {
        const title = section.content?.title
        const sectionLabel = typeof title === 'string' && title.trim()
          ? (title.trim().length > 40 ? title.trim().slice(0, 40) + '...' : title.trim())
          : `${section.type} / ${section.variant}`
        const searchTarget = `${section.type} ${section.variant} ${sectionLabel}`

        if (fuzzyMatch(searchTarget, q)) {
          items.push({
            type: 'section',
            label: sectionLabel,
            description: `Section in ${page.title}`,
            preview: `${section.type} - ${section.variant}`,
            pageId: page.id,
            sectionId: section.id,
          })
        }

        // Predefined elements
        const tree = SECTION_ELEMENT_TREES[section.type] ?? []
        for (const node of tree) {
          if (fuzzyMatch(node.label, q)) {
            items.push({
              type: 'element',
              label: node.label,
              description: `${section.type} - ${section.variant}`,
              preview: page.title,
              pageId: page.id,
              sectionId: section.id,
              elementPath: `${section.id}::${node.path}`,
            })
          }
        }

        // Text content
        const searchContent = (obj: Record<string, unknown>, path: string) => {
          for (const [key, val] of Object.entries(obj)) {
            if (key.startsWith('__')) continue
            if (typeof val === 'string' && fuzzyMatch(val, q) && val.length < 200) {
              items.push({
                type: 'text',
                label: val.length > 60 ? val.slice(0, 60) + '...' : val,
                description: `${section.type} - ${path ? path + '.' : ''}${key}`,
                preview: page.title,
                pageId: page.id,
                sectionId: section.id,
                elementPath: `${section.id}::${path ? path + '.' : ''}${key}`,
              })
            }
            if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
              searchContent(val as Record<string, unknown>, path ? `${path}.${key}` : key)
            }
          }
        }
        searchContent(section.content, '')
      }
    }

    return items.slice(0, 30)
  }, [search, siteConfig])

  // Group results
  const grouped = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {}
    for (const r of results) {
      if (!groups[r.type]) groups[r.type] = []
      groups[r.type].push(r)
    }
    return groups
  }, [results])

  // Flat list for keyboard nav
  const flatResults = results

  // Active result for preview
  const activeResult = flatResults[selectedIndex] ?? null

  const handleSelect = useCallback((result: SearchResult) => {
    if (result.pageId) selectPage(result.pageId)
    if (result.sectionId) selectSection(result.sectionId)
    if (result.elementPath) selectElement(result.elementPath)
    setOpen(false)
  }, [selectPage, selectSection, selectElement])

  // Keyboard nav
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, flatResults.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && flatResults[selectedIndex]) {
      e.preventDefault()
      handleSelect(flatResults[selectedIndex])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }, [flatResults, selectedIndex, handleSelect])

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]')
    el?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  // Reset index on search change
  useEffect(() => { setSelectedIndex(0) }, [search])

  if (!open) return null

  let flatIndex = -1

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 animate-in fade-in-0 duration-150" />

      {/* Modal */}
      <div
        className="relative w-[640px] max-h-[60vh] bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in-0 zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
          <Search className="w-4 h-4 text-zinc-500 shrink-0" />
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Find anything... (fuzzy search)"
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-zinc-500 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="text-[10px] text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700 shrink-0">ESC</kbd>
        </div>

        {/* Results + preview */}
        <div className="flex flex-1 min-h-0">
          {/* Results list */}
          <div ref={listRef} className="overflow-y-auto flex-1 p-2 min-w-0">
            {!search.trim() ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <p className="text-xs text-zinc-500">Rechercher des pages, sections, elements et textes</p>
                <p className="text-[10px] text-zinc-600 mt-1">Raccourci : <kbd className="bg-zinc-800 px-1 py-0.5 rounded border border-zinc-700">⌘E</kbd></p>
              </div>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <p className="text-xs text-zinc-400">Aucun resultat pour &ldquo;{search}&rdquo;</p>
              </div>
            ) : (
              Object.entries(grouped).map(([type, items]) => (
                <div key={type} className="mb-2">
                  <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-2 py-1">
                    {GROUP_LABELS[type]} ({items.length})
                  </p>
                  {items.map((result) => {
                    flatIndex++
                    const idx = flatIndex
                    const isActive = idx === selectedIndex
                    return (
                      <button
                        key={`${type}-${idx}`}
                        data-active={isActive}
                        onClick={() => handleSelect(result)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                          isActive ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'
                        )}
                      >
                        {TYPE_ICONS[result.type]}
                        <div className="flex-1 min-w-0">
                          <p className={cn('text-[13px] truncate', isActive ? 'text-white' : 'text-zinc-300')}>{result.label}</p>
                          <p className="text-[10px] text-zinc-600 truncate">{result.description}</p>
                        </div>
                        {isActive && (
                          <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
                        )}
                      </button>
                    )
                  })}
                </div>
              ))
            )}
          </div>

          {/* Preview panel */}
          {activeResult && search.trim() && results.length > 0 && (
            <div className="w-[200px] border-l border-zinc-800 p-3 flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                {TYPE_ICONS[activeResult.type]}
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                  {activeResult.type}
                </span>
              </div>
              <p className="text-[12px] text-white font-medium leading-tight break-words">{activeResult.label}</p>
              <p className="text-[10px] text-zinc-500 leading-relaxed break-words">{activeResult.description}</p>
              {activeResult.preview && (
                <p className="text-[10px] text-zinc-600 mt-auto">{activeResult.preview}</p>
              )}
              <p className="text-[9px] text-zinc-700 mt-1">Appuyer sur Entree pour naviguer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
