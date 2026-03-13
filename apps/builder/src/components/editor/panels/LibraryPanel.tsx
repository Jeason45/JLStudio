'use client'

import { useState, useCallback } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Search, X, ChevronLeft,
  Puzzle, LayoutTemplate, FileStack, Type,
  Palette, Smile, Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { LIBRARY_BY_CATEGORY, LIBRARY_CATEGORY_META } from '@/data/libraryPresets'
import { LIBRARY_SUBCATEGORIES, type LibraryCategory, type LibraryItem, type LibraryElementItem, type LibraryIconItem, type LibrarySectionItem, type LibraryTemplateItem } from '@/types/library'
import { expandLibraryElement, expandIconElement } from '@/lib/libraryUtils'
import { useLibrarySearch } from './library/useLibrarySearch'
import { LibraryItemCard } from './library/LibraryItemCard'
import { LibraryTemplateCard } from './library/LibraryTemplateCard'

// ─── Category icons ───

const CATEGORY_ICONS: Record<LibraryCategory, React.FC<{ className?: string }>> = {
  components: Puzzle,
  wireframes: LayoutTemplate,
  templates: FileStack,
  elements: Type,
  illustrations: Palette,
  icons: Smile,
  animations: Sparkles,
}

// ─── LibraryPanel ───

export function LibraryPanel() {
  const [activeCategory, setActiveCategory] = useState<LibraryCategory | null>(null)
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const {
    selectedPageId, selectedSectionId,
    addSection, addCustomElement, selectSection,
  } = useEditorStore()

  // Get items for active category
  const categoryItems = activeCategory ? LIBRARY_BY_CATEGORY[activeCategory] : []
  const filteredItems = useLibrarySearch(categoryItems, search, activeSubcategory)
  const subcategories = activeCategory ? LIBRARY_SUBCATEGORIES[activeCategory] : []

  // ─── Handlers ───

  const handleAddElement = useCallback((item: LibraryElementItem | LibraryIconItem) => {
    let targetSectionId = selectedSectionId

    if (!targetSectionId) {
      if (!selectedPageId) return
      const newSectionId = `section-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      addSection(selectedPageId, {
        id: newSectionId,
        type: 'custom',
        variant: 'default',
        content: {} as Record<string, unknown>,
        style: { background: 'white', paddingY: 'lg' },
        visible: true,
      })
      selectSection(newSectionId)
      targetSectionId = newSectionId
    }

    const element = item.dropType === 'icon'
      ? expandIconElement(item as LibraryIconItem)
      : expandLibraryElement((item as LibraryElementItem).elementDef)

    addCustomElement(targetSectionId, element)
  }, [selectedSectionId, selectedPageId, addSection, addCustomElement, selectSection])

  const handleAddSection = useCallback((item: LibrarySectionItem) => {
    if (!selectedPageId) return
    addSection(selectedPageId, {
      id: `section-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type: item.sectionType,
      variant: item.variant,
      content: { ...item.content },
      style: {
        background: item.style.background,
        customBgColor: item.style.customBgColor,
        paddingY: item.style.paddingY,
      },
      visible: true,
    })
  }, [selectedPageId, addSection])

  const handleApplyTemplate = useCallback((item: LibraryTemplateItem) => {
    if (!selectedPageId) return
    // Add all sections from template
    for (const sectionDef of item.sections) {
      addSection(selectedPageId, {
        id: `section-${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${Math.random().toString(36).slice(2, 4)}`,
        type: sectionDef.type,
        variant: sectionDef.variant,
        content: { ...sectionDef.content },
        style: {
          background: sectionDef.style.background,
          customBgColor: sectionDef.style.customBgColor,
          paddingY: sectionDef.style.paddingY,
        },
        visible: true,
      })
    }
  }, [selectedPageId, addSection])

  const handleItemClick = useCallback((item: LibraryItem) => {
    switch (item.dropType) {
      case 'element':
      case 'icon':
        handleAddElement(item as LibraryElementItem | LibraryIconItem)
        break
      case 'section':
        handleAddSection(item as LibrarySectionItem)
        break
      case 'template':
        handleApplyTemplate(item as LibraryTemplateItem)
        break
    }
  }, [handleAddElement, handleAddSection, handleApplyTemplate])

  const goBack = () => {
    if (activeSubcategory) {
      setActiveSubcategory(null)
    } else {
      setActiveCategory(null)
    }
    setSearch('')
  }

  // ─── Category selection view ───

  if (!activeCategory) {
    return (
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          <div className="px-1 py-2">
            <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Bibliotheque</p>
          </div>
          {LIBRARY_CATEGORY_META.map(cat => {
            const Icon = CATEGORY_ICONS[cat.id]
            return (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setActiveSubcategory(null); setSearch('') }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-700/40 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center group-hover:border-zinc-600">
                  <Icon className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[12px] font-medium text-zinc-200">{cat.label}</p>
                  <p className="text-[10px] text-zinc-500">{cat.count} items</p>
                </div>
              </button>
            )
          })}
        </div>
      </ScrollArea>
    )
  }

  // ─── Category detail view ───

  const currentCatMeta = LIBRARY_CATEGORY_META.find(c => c.id === activeCategory)

  return (
    <>
      {/* Header with back button */}
      <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-zinc-700/50 shrink-0">
        <button onClick={goBack} className="p-1 rounded hover:bg-zinc-700/50 text-zinc-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-[12px] font-medium text-zinc-200 flex-1">
          {activeSubcategory
            ? subcategories.find(s => s.id === activeSubcategory)?.label ?? activeSubcategory
            : currentCatMeta?.label
          }
        </span>
        <span className="text-[10px] text-zinc-500">{filteredItems.length}</span>
      </div>

      {/* Search */}
      <div className="px-2 py-1.5 border-b border-zinc-800 shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded pl-7 pr-6 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Subcategory chips (if not already in a subcategory) */}
      {!activeSubcategory && subcategories.length > 0 && !search && (
        <div className="px-2 py-1.5 border-b border-zinc-800 shrink-0">
          <div className="flex flex-wrap gap-1">
            {subcategories.map(sub => {
              const subCount = categoryItems.filter(i => i.subcategory === sub.id).length
              if (subCount === 0) return null
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubcategory(sub.id)}
                  className="px-2 py-0.5 text-[10px] rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 transition-colors border border-zinc-700/50"
                >
                  {sub.label} <span className="text-zinc-600">{subCount}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Items grid */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-zinc-500">
              <Search className="w-8 h-8 mb-2 opacity-30" />
              <p className="text-[11px]">Aucun resultat</p>
            </div>
          ) : activeCategory === 'templates' || activeCategory === 'wireframes' ? (
            // Templates/Wireframes: larger cards
            <div className="grid grid-cols-1 gap-2">
              {filteredItems.map(item => (
                <LibraryTemplateCard
                  key={item.id}
                  item={item as LibraryTemplateItem}
                  onApply={() => handleItemClick(item)}
                />
              ))}
            </div>
          ) : activeCategory === 'icons' ? (
            // Icons: dense grid
            <div className="grid grid-cols-5 gap-px">
              {filteredItems.map((item, i) => (
                <LibraryItemCard
                  key={item.id}
                  item={item as LibraryElementItem | LibraryIconItem | LibrarySectionItem}
                  index={i}
                  onAdd={() => handleItemClick(item)}
                />
              ))}
            </div>
          ) : (
            // Default: 3-column grid
            <div className="grid grid-cols-3 gap-px">
              {filteredItems.map((item, i) => (
                <LibraryItemCard
                  key={item.id}
                  item={item as LibraryElementItem | LibraryIconItem | LibrarySectionItem}
                  index={i}
                  onAdd={() => handleItemClick(item)}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </>
  )
}
