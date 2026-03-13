'use client'
import { useState, useMemo } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, X, FileText, LayoutDashboard, Type, MousePointer } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchResult {
  type: 'page' | 'section' | 'element' | 'text'
  label: string
  description: string
  pageId?: string
  sectionId?: string
  elementPath?: string
}

export function FindPanel() {
  const { siteConfig, selectPage, selectSection, selectElement } = useEditorStore()
  const [search, setSearch] = useState('')

  const results = useMemo((): SearchResult[] => {
    if (!search.trim() || !siteConfig) return []
    const q = search.toLowerCase()
    const items: SearchResult[] = []

    for (const page of siteConfig.pages) {
      // Match page title
      if (page.title.toLowerCase().includes(q)) {
        items.push({ type: 'page', label: page.title, description: `Page — ${page.slug}`, pageId: page.id })
      }

      for (const section of page.sections) {
        // Match section type
        if (section.type.toLowerCase().includes(q) || section.variant.toLowerCase().includes(q)) {
          items.push({
            type: 'section',
            label: `${section.type} / ${section.variant}`,
            description: `Section in ${page.title}`,
            pageId: page.id,
            sectionId: section.id,
          })
        }

        // Search in content values
        const searchContent = (obj: Record<string, unknown>, path: string) => {
          for (const [key, val] of Object.entries(obj)) {
            if (key.startsWith('__')) continue
            if (typeof val === 'string' && val.toLowerCase().includes(q) && val.length < 200) {
              items.push({
                type: 'text',
                label: val.length > 60 ? val.slice(0, 60) + '...' : val,
                description: `${section.type} — ${path ? path + '.' : ''}${key}`,
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

    return items.slice(0, 50) // Limit results
  }, [search, siteConfig])

  const handleClick = (result: SearchResult) => {
    if (result.pageId) selectPage(result.pageId)
    if (result.sectionId) selectSection(result.sectionId)
    if (result.elementPath) selectElement(result.elementPath)
  }

  const typeIcons: Record<string, React.ReactNode> = {
    page: <FileText className="w-3.5 h-3.5 text-blue-400" />,
    section: <LayoutDashboard className="w-3.5 h-3.5 text-green-400" />,
    element: <MousePointer className="w-3.5 h-3.5 text-purple-400" />,
    text: <Type className="w-3.5 h-3.5 text-orange-400" />,
  }

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {}
    for (const r of results) {
      if (!groups[r.type]) groups[r.type] = []
      groups[r.type].push(r)
    }
    return groups
  }, [results])

  const groupLabels: Record<string, string> = {
    page: 'Pages',
    section: 'Sections',
    element: 'Elements',
    text: 'Text Content',
  }

  return (
    <>
      {/* Search */}
      <div className="px-2 py-2 border-b border-zinc-700/50 shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search site..."
            autoFocus
            className="w-full h-8 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded pl-8 pr-6 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        {!search.trim() ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <Search className="w-6 h-6 text-zinc-700 mb-2" />
            <p className="text-[11px] text-zinc-400">Search across your site</p>
            <p className="text-[10px] text-zinc-600 mt-1">Find pages, sections, elements, and text content</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <p className="text-[11px] text-zinc-400">No results for &quot;{search}&quot;</p>
          </div>
        ) : (
          <div className="p-2 space-y-3">
            {Object.entries(groupedResults).map(([type, items]) => (
              <div key={type}>
                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-1 mb-1">
                  {groupLabels[type]} ({items.length})
                </p>
                <div className="space-y-0.5">
                  {items.map((result, i) => (
                    <button
                      key={i}
                      onClick={() => handleClick(result)}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-left hover:bg-zinc-800 transition-colors"
                    >
                      {typeIcons[result.type]}
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-zinc-300 truncate">{result.label}</p>
                        <p className="text-[9px] text-zinc-600 truncate">{result.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </>
  )
}
