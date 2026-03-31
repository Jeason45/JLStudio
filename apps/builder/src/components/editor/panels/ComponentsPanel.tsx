'use client'
import { useState } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { useShallow } from 'zustand/react/shallow'
import { useSelection, useComponentActions } from '@/store/hooks'
import { selectSiteConfig } from '@/store/selectors'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Puzzle, Plus, Search, X, Trash2, Pencil, Settings2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ComponentsPanel() {
  const siteConfig = useEditorStore(selectSiteConfig)
  const { selectedSectionId, selectedPageId } = useSelection()
  const { createComponentFromSection, instantiateComponent, deleteComponent, enterComponentEditor } = useComponentActions()
  const [search, setSearch] = useState('')
  const [naming, setNaming] = useState(false)
  const [newName, setNewName] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const components = siteConfig?.components ?? []
  const filteredComponents = search.trim()
    ? components.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : components

  const handleCreate = () => {
    if (!selectedSectionId || !newName.trim()) return
    createComponentFromSection(selectedSectionId, newName.trim())
    setNaming(false)
    setNewName('')
  }

  const handleDelete = (compId: string) => {
    const comp = components.find(c => c.id === compId)
    if (comp && comp.instanceCount > 0) {
      setConfirmDeleteId(compId)
    } else {
      deleteComponent(compId)
    }
  }

  const confirmDelete = () => {
    if (confirmDeleteId) {
      deleteComponent(confirmDeleteId)
      setConfirmDeleteId(null)
    }
  }

  return (
    <>
      {/* Search */}
      <div className="px-2 py-1.5 border-b border-zinc-700/50 shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search components"
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded pl-7 pr-6 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Create component */}
      <div className="px-3 py-2 border-b border-zinc-700/50 shrink-0">
        {naming ? (
          <div className="space-y-1.5">
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              placeholder="Component name"
              autoFocus
              className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500"
            />
            <div className="flex gap-2">
              <button onClick={handleCreate} className="flex-1 py-1.5 bg-wf-blue text-white text-[11px] rounded hover:bg-wf-blue/90 transition-colors">
                Create
              </button>
              <button onClick={() => { setNaming(false); setNewName('') }} className="flex-1 py-1.5 bg-zinc-800 text-zinc-400 text-[11px] rounded hover:bg-zinc-700 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => setNaming(true)}
              disabled={!selectedSectionId}
              className={cn(
                'w-full flex items-center justify-center gap-1.5 py-2 rounded text-[11px] font-medium transition-colors',
                selectedSectionId
                  ? 'bg-wf-blue text-white hover:bg-wf-blue/90'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              )}
            >
              <Plus className="w-3.5 h-3.5" />
              Create component
            </button>
            {!selectedSectionId && (
              <p className="text-[9px] text-zinc-500 text-center mt-1">Select a section first</p>
            )}
          </>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredComponents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-3 text-zinc-600">
                <Puzzle className="w-5 h-5" />
              </div>
              <p className="text-[11px] text-[#ccc] font-medium mb-1">No components yet</p>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Select a section and click &quot;Create component&quot; to save it as a reusable template.
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              {filteredComponents.map(comp => {
                const propsCount = comp.props?.length ?? 0
                const variantsCount = comp.variants?.length ?? 0
                return (
                  <div
                    key={comp.id}
                    className="flex items-center gap-2 px-2 py-2 rounded hover:bg-zinc-800 transition-colors group cursor-pointer"
                    onClick={() => instantiateComponent(comp.id)}
                  >
                    <div className="w-8 h-8 rounded bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                      <Puzzle className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-[#ccc] truncate">{comp.name}</p>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-zinc-500">{comp.instanceCount} instance{comp.instanceCount !== 1 ? 's' : ''}</span>
                        {propsCount > 0 && (
                          <span className="text-[8px] text-emerald-500 bg-emerald-500/10 px-1 rounded">{propsCount}P</span>
                        )}
                        {variantsCount > 0 && (
                          <span className="text-[8px] text-purple-400 bg-purple-400/10 px-1 rounded">{variantsCount}V</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); enterComponentEditor(comp.id) }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-zinc-600 hover:text-emerald-400 transition-all"
                      title="Edit Master"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); handleDelete(comp.id) }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-zinc-600 hover:text-red-400 transition-all"
                      title="Delete component"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Confirm delete dialog */}
      {confirmDeleteId && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setConfirmDeleteId(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#2d2d2d] border border-zinc-700 rounded-lg p-4 w-72 shadow-xl">
            <p className="text-xs text-white font-medium mb-2">Delete component?</p>
            <p className="text-[11px] text-zinc-400 mb-4">
              This component has active instances. They will be unlinked and become independent sections.
            </p>
            <div className="flex gap-2">
              <button onClick={confirmDelete} className="flex-1 py-1.5 bg-red-600 text-white text-[11px] rounded hover:bg-red-700 transition-colors">
                Delete & Unlink
              </button>
              <button onClick={() => setConfirmDeleteId(null)} className="flex-1 py-1.5 bg-zinc-800 text-zinc-400 text-[11px] rounded hover:bg-zinc-700 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
