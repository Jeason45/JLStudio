'use client'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { SearchContent } from '@/types/sections'
import { elementProps } from '@/lib/elementHelpers'
import { Search, X } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import type { SectionMeta } from '@/components/sections'

const UNIVERSE_CONFIGS = {
  startup: { bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', inputBg: 'bg-zinc-50 border-zinc-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100', resultBg: 'bg-white border border-zinc-200 shadow-lg', resultHover: 'hover:bg-indigo-50', badge: 'bg-indigo-100 text-indigo-700', icon: 'text-zinc-400' },
  corporate: { bg: 'bg-slate-900', text: 'text-white', sub: 'text-slate-400', inputBg: 'bg-slate-800 border-slate-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-900/50', resultBg: 'bg-slate-800 border border-slate-700 shadow-lg', resultHover: 'hover:bg-slate-700', badge: 'bg-blue-900/50 text-blue-300', icon: 'text-slate-500' },
  luxe: { bg: 'bg-white', text: 'text-zinc-800', sub: 'text-zinc-500', inputBg: 'bg-zinc-50 border-zinc-200 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100', resultBg: 'bg-white border border-zinc-200 shadow-lg', resultHover: 'hover:bg-amber-50', badge: 'bg-amber-50 text-amber-800', icon: 'text-zinc-400' },
  creative: { bg: 'bg-amber-50', text: 'text-zinc-900', sub: 'text-zinc-600', inputBg: 'bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]', resultBg: 'bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]', resultHover: 'hover:bg-yellow-100', badge: 'bg-yellow-300 text-zinc-900', icon: 'text-zinc-900' },
  ecommerce: { bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', inputBg: 'bg-zinc-50 border-zinc-200 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100', resultBg: 'bg-white border border-zinc-200 shadow-lg', resultHover: 'hover:bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700', icon: 'text-zinc-400' },
  glass: { bg: 'bg-zinc-950', text: 'text-white', sub: 'text-zinc-400', inputBg: 'bg-white/5 backdrop-blur-sm border-white/10 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-900/50', resultBg: 'bg-zinc-900/90 backdrop-blur-xl border border-white/10 shadow-xl', resultHover: 'hover:bg-white/10', badge: 'bg-purple-900/50 text-purple-300', icon: 'text-zinc-500' },
} as const

type Universe = keyof typeof UNIVERSE_CONFIGS

function parseVariant(variant: string): Universe {
  const universe = (variant || 'startup') as Universe
  return universe in UNIVERSE_CONFIGS ? universe : 'startup'
}

interface SearchResult {
  title: string
  type: string
  sectionType: string
}

export function SearchSection({ config }: { config: SectionConfig; isEditing?: boolean }) {
  const content = config.content as SearchContent
  const universe = parseVariant(config.variant || 'startup')
  const uConfig = UNIVERSE_CONFIGS[universe]
  const { siteConfig } = useEditorStore()

  const [query, setQuery] = useState('')

  // Build index from all pages/sections
  const allResults = useMemo<SearchResult[]>(() => {
    if (!siteConfig) return []
    const results: SearchResult[] = []
    for (const page of siteConfig.pages) {
      for (const section of page.sections) {
        const c = section.content as Record<string, unknown>
        if (c.title && typeof c.title === 'string') {
          results.push({ title: c.title, type: section.type, sectionType: section.type })
        }
        if (c.subtitle && typeof c.subtitle === 'string') {
          results.push({ title: c.subtitle, type: section.type, sectionType: section.type })
        }
        // Index FAQ items
        const items = c.items as Array<{ question?: string; title?: string }> | undefined
        if (Array.isArray(items)) {
          for (const item of items) {
            const label = item.question ?? item.title
            if (label) results.push({ title: label, type: section.type, sectionType: section.type })
          }
        }
      }
    }
    return results
  }, [siteConfig])

  const filtered = useMemo(() => {
    if (!query.trim() || query.length < 2) return []
    const q = query.toLowerCase()
    return allResults.filter(r => r.title.toLowerCase().includes(q)).slice(0, 10)
  }, [query, allResults])

  const grouped = useMemo(() => {
    if (!content.showCategories) return { '': filtered }
    const map: Record<string, SearchResult[]> = {}
    for (const r of filtered) {
      const key = r.sectionType
      if (!map[key]) map[key] = []
      map[key].push(r)
    }
    return map
  }, [filtered, content.showCategories])

  return (
    <section className={cn(uConfig.bg, 'py-16 md:py-24')}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {content.title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className={cn('text-3xl md:text-4xl font-bold text-center mb-8', uConfig.text)}>
            {content.title}
          </h2>
        )}

        {/* Search input */}
        <div className="relative">
          <div className={cn('flex items-center gap-3 px-4 py-3 rounded-xl border transition-all', uConfig.inputBg)}>
            <Search className={cn('w-5 h-5 shrink-0', uConfig.icon)} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={content.placeholder}
              className={cn('flex-1 bg-transparent outline-none text-sm', uConfig.text)}
            />
            {query && (
              <button onClick={() => setQuery('')} className={cn('shrink-0', uConfig.sub)}>
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results dropdown */}
          {filtered.length > 0 && (
            <div className={cn('absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-30 max-h-80 overflow-y-auto', uConfig.resultBg)}>
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  {category && content.showCategories && (
                    <div className="px-4 py-2">
                      <span className={cn('text-[10px] font-semibold uppercase tracking-wider', uConfig.sub)}>{category}</span>
                    </div>
                  )}
                  {items.map((item, i) => (
                    <div key={`${category}-${i}`} className={cn('px-4 py-2.5 cursor-pointer transition-colors', uConfig.resultHover)}>
                      <p className={cn('text-sm', uConfig.text)}>{item.title}</p>
                      {content.showCategories && (
                        <span className={cn('inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium', uConfig.badge)}>{item.type}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {query.length >= 2 && filtered.length === 0 && (
            <div className={cn('absolute top-full left-0 right-0 mt-2 rounded-xl p-6 text-center', uConfig.resultBg)}>
              <p className={cn('text-sm', uConfig.sub)}>Aucun resultat pour &quot;{query}&quot;</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export const searchMeta: SectionMeta = {
  type: 'search',
  label: 'Recherche',
  icon: '🔎',
  variants: ['startup', 'corporate', 'luxe', 'creative', 'ecommerce', 'glass'],
  defaultVariant: 'startup',
  defaultContent: {},
}
