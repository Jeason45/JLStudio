'use client'
import { useState, useMemo, useRef, useCallback } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Search, Copy, Trash2, Paintbrush, Type, Heading1, GripVertical,
  BookOpen, ChevronDown, Plus, Check, Download,
} from 'lucide-react'
import type { CSSClass, TagStyleKey } from '@/types/classes'
import { cn } from '@/lib/utils'
import {
  CLASS_CATEGORIES,
  CLASS_LIBRARY,
  getCollectionsByCategory,
  type ClassCategory,
  type ClassCollection,
  type ClassPreset,
} from '@/data/classLibrary'

const TAG_STYLE_ENTRIES: { key: TagStyleKey; label: string; icon: typeof Type }[] = [
  { key: 'body', label: 'Body (All)', icon: Type },
  { key: 'h1', label: 'All H1', icon: Heading1 },
  { key: 'h2', label: 'All H2', icon: Heading1 },
  { key: 'h3', label: 'All H3', icon: Heading1 },
  { key: 'h4', label: 'All H4', icon: Heading1 },
  { key: 'h5', label: 'All H5', icon: Heading1 },
  { key: 'h6', label: 'All H6', icon: Heading1 },
  { key: 'p', label: 'All Paragraphs', icon: Type },
  { key: 'a', label: 'All Links', icon: Type },
  { key: 'button', label: 'All Buttons', icon: Type },
  { key: 'img', label: 'All Images', icon: Type },
]

// ─── Class Library Browser ───

function ClassLibraryBrowser() {
  const { siteConfig, importClassPreset, importClassCollection } = useEditorStore()
  const [activeCategory, setActiveCategory] = useState<ClassCategory | null>(null)
  const [expandedCollections, setExpandedCollections] = useState<Set<string>>(new Set())
  const [importedIds, setImportedIds] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')

  const existingNames = useMemo(() => {
    return new Set((siteConfig?.classes ?? []).map(c => c.name))
  }, [siteConfig?.classes])

  const toggleCollection = (id: string) => {
    setExpandedCollections(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleImportPreset = (preset: ClassPreset) => {
    const id = importClassPreset(preset.id)
    if (id) {
      setImportedIds(prev => new Set(prev).add(preset.id))
    }
  }

  const handleImportCollection = (collection: ClassCollection) => {
    const ids = importClassCollection(collection.id)
    if (ids.length > 0) {
      const newImported = new Set(importedIds)
      collection.presets.forEach(p => newImported.add(p.id))
      setImportedIds(newImported)
    }
  }

  // Filter presets by search
  const filteredLibrary = useMemo(() => {
    if (!search.trim()) return null
    const q = search.toLowerCase()
    const results: ClassPreset[] = []
    for (const col of CLASS_LIBRARY) {
      for (const preset of col.presets) {
        if (preset.name.toLowerCase().includes(q) || preset.description.toLowerCase().includes(q)) {
          results.push(preset)
        }
      }
    }
    return results
  }, [search])

  // Category view
  if (activeCategory) {
    const collections = getCollectionsByCategory(activeCategory)
    const cat = CLASS_CATEGORIES.find(c => c.id === activeCategory)

    return (
      <div className="space-y-3">
        <button
          onClick={() => setActiveCategory(null)}
          className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronDown className="w-3 h-3 rotate-90" />
          {cat?.label ?? activeCategory}
        </button>

        {collections.map(col => {
          const isExpanded = expandedCollections.has(col.id)
          const allImported = col.presets.every(p => existingNames.has(p.name) || importedIds.has(p.id))

          return (
            <div key={col.id} className="border border-zinc-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleCollection(col.id)}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-zinc-700/30 transition-colors text-left"
              >
                <ChevronDown className={cn('w-3 h-3 text-zinc-500 transition-transform', !isExpanded && '-rotate-90')} />
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] text-zinc-200 font-medium">{col.name}</span>
                  <span className="text-[10px] text-zinc-500 ml-2">{col.presets.length}</span>
                </div>
                {allImported ? (
                  <span className="text-[9px] text-green-500 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Added
                  </span>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleImportCollection(col)
                    }}
                    className="text-[9px] text-wf-blue hover:text-blue-300 flex items-center gap-1 transition-colors"
                    title="Import all"
                  >
                    <Download className="w-3 h-3" /> All
                  </button>
                )}
              </button>

              {isExpanded && (
                <div className="border-t border-zinc-700/50">
                  {col.presets.map(preset => {
                    const exists = existingNames.has(preset.name) || importedIds.has(preset.id)
                    return (
                      <div
                        key={preset.id}
                        className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-700/20 transition-colors"
                      >
                        <PresetPreviewBadge preset={preset} />
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] text-zinc-300 block truncate">{preset.name}</span>
                          <span className="text-[10px] text-zinc-500 block truncate">{preset.description}</span>
                        </div>
                        {exists ? (
                          <Check className="w-3 h-3 text-green-500 shrink-0" />
                        ) : (
                          <button
                            onClick={() => handleImportPreset(preset)}
                            className="p-1 text-zinc-500 hover:text-wf-blue transition-colors shrink-0"
                            title="Import"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Search results
  if (filteredLibrary) {
    return (
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search library..."
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded pl-8 pr-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500"
          />
        </div>

        {filteredLibrary.length === 0 ? (
          <p className="text-[10px] text-zinc-500 text-center py-4">No results</p>
        ) : (
          <div className="space-y-0.5">
            {filteredLibrary.map(preset => {
              const exists = existingNames.has(preset.name) || importedIds.has(preset.id)
              return (
                <div
                  key={preset.id}
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-700/20 rounded transition-colors"
                >
                  <PresetPreviewBadge preset={preset} />
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] text-zinc-300 truncate block">{preset.name}</span>
                    <span className="text-[10px] text-zinc-500 truncate block">{preset.description}</span>
                  </div>
                  {exists ? (
                    <Check className="w-3 h-3 text-green-500 shrink-0" />
                  ) : (
                    <button
                      onClick={() => handleImportPreset(preset)}
                      className="p-1 text-zinc-500 hover:text-wf-blue transition-colors shrink-0"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  // Category list (default view)
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search library..."
          className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded pl-8 pr-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500"
        />
      </div>

      <div className="space-y-0.5">
        {CLASS_CATEGORIES.map(cat => {
          const collections = getCollectionsByCategory(cat.id)
          const totalPresets = collections.reduce((sum, c) => sum + c.presets.length, 0)

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-zinc-700/30 transition-colors text-left group"
            >
              <div className="flex-1 min-w-0">
                <span className="text-[11px] text-zinc-200 font-medium block group-hover:text-white transition-colors">
                  {cat.label}
                </span>
                <span className="text-[10px] text-zinc-500">
                  {collections.length} collection{collections.length > 1 ? 's' : ''} · {totalPresets} classes
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-zinc-500 -rotate-90 shrink-0" />
            </button>
          )
        })}
      </div>

      <div className="text-[10px] text-zinc-600 px-2">
        {CLASS_LIBRARY.reduce((sum, c) => sum + c.presets.length, 0)} classes disponibles
      </div>
    </div>
  )
}

// ─── Preset Preview Badge ───

function PresetPreviewBadge({ preset }: { preset: ClassPreset }) {
  const bg = preset.styles.backgroundColor || preset.styles.backgroundImage
  const color = preset.styles.color
  const hasBorder = preset.styles.borderWidth && preset.styles.borderColor

  return (
    <div
      className="w-5 h-5 rounded shrink-0 border border-zinc-700/50 flex items-center justify-center text-[8px] font-bold"
      style={{
        backgroundColor: (typeof bg === 'string' && !bg.includes('gradient') && !bg.includes('var'))
          ? bg
          : '#27272a',
        color: (typeof color === 'string' && !color.includes('var') && color !== 'transparent')
          ? color
          : '#a1a1aa',
        borderColor: hasBorder && typeof preset.styles.borderColor === 'string'
          ? preset.styles.borderColor
          : undefined,
      }}
    >
      A
    </div>
  )
}

// ─── Main Panel ───

export function StyleManagerPanel() {
  const { siteConfig, renameClass, duplicateClass, deleteClass, reorderClasses, resetTagStyle } = useEditorStore()
  const [activeTab, setActiveTab] = useState<'classes' | 'library'>('classes')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  // Drag state
  const [dragId, setDragId] = useState<string | null>(null)
  const [dropTargetId, setDropTargetId] = useState<string | null>(null)
  const dragIndexRef = useRef<number>(-1)

  const allClasses = siteConfig?.classes ?? []

  // Count class usage across all sections
  const usageCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    if (!siteConfig) return counts
    for (const cls of allClasses) counts[cls.id] = 0
    for (const page of siteConfig.pages) {
      for (const section of page.sections) {
        const elementClasses = section.content.__elementClasses as Record<string, string[]> | undefined
        if (elementClasses) {
          for (const classIds of Object.values(elementClasses)) {
            for (const id of classIds) {
              counts[id] = (counts[id] ?? 0) + 1
            }
          }
        }
        if (section.elements) {
          const countInElements = (elements: typeof section.elements) => {
            if (!elements) return
            for (const el of elements) {
              if (el.classes) {
                for (const id of el.classes) {
                  counts[id] = (counts[id] ?? 0) + 1
                }
              }
              if (el.children) countInElements(el.children)
            }
          }
          countInElements(section.elements)
        }
      }
    }
    return counts
  }, [siteConfig, allClasses])

  const isSearching = !!search.trim()
  const filtered = allClasses.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  const startRename = (cls: CSSClass) => {
    setEditingId(cls.id)
    setEditName(cls.name)
  }

  const confirmRename = () => {
    if (editingId && editName.trim()) {
      renameClass(editingId, editName.trim())
    }
    setEditingId(null)
  }

  const tagStyles = siteConfig?.tagStyles ?? {}
  const hasTagStyle = (key: TagStyleKey) => {
    const style = tagStyles[key]
    return style && Object.keys(style).length > 0
  }

  // ─── HTML5 Drag handlers ───
  const handleDragStart = useCallback((e: React.DragEvent, cls: CSSClass, index: number) => {
    setDragId(cls.id)
    dragIndexRef.current = index
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', cls.id)
    const ghost = document.createElement('div')
    ghost.className = 'bg-zinc-700 text-white text-[11px] px-2 py-1 rounded shadow-lg'
    ghost.textContent = cls.name
    ghost.style.position = 'absolute'
    ghost.style.top = '-999px'
    document.body.appendChild(ghost)
    e.dataTransfer.setDragImage(ghost, 0, 0)
    requestAnimationFrame(() => document.body.removeChild(ghost))
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, clsId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDropTargetId(clsId)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDropTargetId(null)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    const fromIndex = dragIndexRef.current
    if (fromIndex >= 0 && fromIndex !== targetIndex) {
      reorderClasses(fromIndex, targetIndex)
    }
    setDragId(null)
    setDropTargetId(null)
    dragIndexRef.current = -1
  }, [reorderClasses])

  const handleDragEnd = useCallback(() => {
    setDragId(null)
    setDropTargetId(null)
    dragIndexRef.current = -1
  }, [])

  return (
    <ScrollArea className="flex-1">
      <div className="p-3 space-y-4">

        {/* Tab toggle */}
        <div className="flex rounded-lg overflow-hidden border border-zinc-700">
          <button
            onClick={() => setActiveTab('classes')}
            className={cn(
              'flex-1 h-7 text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5',
              activeTab === 'classes'
                ? 'bg-zinc-700 text-white'
                : 'bg-zinc-800 text-zinc-500 hover:text-zinc-300'
            )}
          >
            <Paintbrush className="w-3 h-3" />
            Classes
            <span className="text-[9px] text-zinc-500">{allClasses.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={cn(
              'flex-1 h-7 text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 border-l border-zinc-700',
              activeTab === 'library'
                ? 'bg-zinc-700 text-white'
                : 'bg-zinc-800 text-zinc-500 hover:text-zinc-300'
            )}
          >
            <BookOpen className="w-3 h-3" />
            Library
          </button>
        </div>

        {/* Library tab */}
        {activeTab === 'library' && <ClassLibraryBrowser />}

        {/* Classes tab */}
        {activeTab === 'classes' && (
          <>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search classes..."
                className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded pl-8 pr-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500"
              />
            </div>

            {/* CSS Classes */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Paintbrush className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-[11px] font-medium text-[#ccc]">CSS Classes</span>
                <span className="text-[10px] text-zinc-500 ml-auto">{allClasses.length}</span>
              </div>

              {filtered.length === 0 ? (
                <div className="text-[10px] text-zinc-500 text-center py-4">
                  {search ? 'No classes match your search' : 'No classes created yet'}
                </div>
              ) : (
                <div className="space-y-0.5">
                  {filtered.map((cls) => {
                    const realIndex = allClasses.indexOf(cls)
                    const isDragging = dragId === cls.id
                    const isDropTarget = dropTargetId === cls.id && dragId !== cls.id
                    return (
                      <div
                        key={cls.id}
                        draggable={!isSearching && editingId !== cls.id}
                        onDragStart={e => handleDragStart(e, cls, realIndex)}
                        onDragOver={e => handleDragOver(e, cls.id)}
                        onDragLeave={handleDragLeave}
                        onDrop={e => handleDrop(e, realIndex)}
                        onDragEnd={handleDragEnd}
                        className={cn(
                          'group flex items-center gap-1.5 px-1.5 py-1.5 rounded transition-colors',
                          isDragging ? 'opacity-40' : 'hover:bg-zinc-700/50',
                          isDropTarget && 'border-t-2 border-wf-blue',
                        )}
                      >
                        {!isSearching && (
                          <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-zinc-600 hover:text-zinc-400">
                            <GripVertical className="w-3 h-3" />
                          </div>
                        )}

                        <div
                          className="w-3 h-3 rounded-sm shrink-0"
                          style={{
                            backgroundColor: cls.styles.backgroundColor || cls.styles.color || '#6366f1',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}
                        />

                        {editingId === cls.id ? (
                          <input
                            autoFocus
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                            onBlur={confirmRename}
                            onKeyDown={e => { if (e.key === 'Enter') confirmRename(); if (e.key === 'Escape') setEditingId(null) }}
                            className="flex-1 bg-zinc-800 border border-zinc-600 text-[11px] text-white rounded px-1.5 py-0.5 outline-none"
                          />
                        ) : (
                          <span
                            className="flex-1 text-[11px] text-zinc-300 truncate cursor-pointer"
                            onDoubleClick={() => startRename(cls)}
                          >
                            {cls.name}
                          </span>
                        )}

                        <span className="text-[9px] text-zinc-500 shrink-0">
                          {usageCounts[cls.id] ?? 0}
                        </span>

                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => duplicateClass(cls.id)}
                            title="Duplicate"
                            className="p-0.5 text-zinc-500 hover:text-white transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => {
                              const count = usageCounts[cls.id] ?? 0
                              if (count > 0) {
                                if (!confirm(`This class is used on ${count} element(s). Delete anyway?`)) return
                              }
                              deleteClass(cls.id)
                            }}
                            title="Delete"
                            className="p-0.5 text-zinc-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Tag Styles */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Type className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-[11px] font-medium text-[#ccc]">Tag Styles</span>
              </div>
              <div className="space-y-0.5">
                {TAG_STYLE_ENTRIES.map(({ key, label }) => (
                  <div
                    key={key}
                    className="group flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-700/50 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 ${hasTagStyle(key) ? 'bg-blue-500' : 'bg-zinc-700'}`} />
                    <span className="flex-1 text-[11px] text-zinc-300">{label}</span>
                    {hasTagStyle(key) && (
                      <button
                        onClick={() => resetTagStyle(key)}
                        title="Reset to default"
                        className="p-0.5 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </ScrollArea>
  )
}
