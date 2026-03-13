'use client'
import { useState } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { useCmsCollections } from '@/hooks/useCmsCollections'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Database, Plus, ChevronRight, Trash2, Settings, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { generateSlug } from '@/lib/cmsResolver'
import { CmsCollectionEditor } from './CmsCollectionEditor'
import { CmsItemsManager } from './CmsItemsManager'

type CmsView = 'list' | 'edit-collection' | 'items'

export function CmsPanel() {
  const { siteConfig } = useEditorStore()
  const siteId = siteConfig?.id
  const { collections, loading, createCollection, updateCollection, deleteCollection, refetch } = useCmsCollections(siteId)
  const [view, setView] = useState<CmsView>('list')
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')

  const activeCollection = collections.find(c => c.id === activeCollectionId)

  const handleCreate = async () => {
    if (!newName.trim()) return
    const slug = generateSlug(newName.trim())
    await createCollection(newName.trim(), slug)
    setNewName('')
    setIsAdding(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette collection et tous ses items ?')) return
    await deleteCollection(id)
    if (activeCollectionId === id) {
      setActiveCollectionId(null)
      setView('list')
    }
  }

  if (view === 'edit-collection' && activeCollection) {
    return (
      <CmsCollectionEditor
        collection={activeCollection}
        onUpdate={async (updates) => {
          await updateCollection(activeCollection.id, updates)
        }}
        onBack={() => setView('list')}
      />
    )
  }

  if (view === 'items' && activeCollectionId) {
    return (
      <CmsItemsManager
        collectionId={activeCollectionId}
        collectionName={activeCollection?.name ?? 'Collection'}
        fields={activeCollection?.fields ?? []}
        onBack={() => setView('list')}
      />
    )
  }

  return (
    <>
      {/* Header actions */}
      <div className="px-2 py-1.5 border-b border-zinc-800 shrink-0 flex items-center justify-between">
        <span className="text-[11px] text-zinc-400">{collections.length} collection{collections.length !== 1 ? 's' : ''}</span>
        <button
          onClick={() => setIsAdding(true)}
          className="text-zinc-500 hover:text-white transition-colors"
          title="Nouvelle collection"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-4 h-4 text-zinc-500 animate-spin" />
            </div>
          )}

          {/* Add collection form */}
          {isAdding && (
            <div className="p-2 bg-zinc-800/50 rounded space-y-1.5">
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreate()}
                placeholder="Nom de la collection..."
                autoFocus
                className="w-full h-6 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue"
              />
              <div className="flex gap-1.5">
                <button onClick={handleCreate} className="flex-1 py-1 bg-wf-blue text-white text-[10px] rounded hover:bg-wf-blue/90">Creer</button>
                <button onClick={() => { setIsAdding(false); setNewName('') }} className="flex-1 py-1 bg-zinc-800 text-zinc-400 text-[10px] rounded hover:bg-zinc-700">Annuler</button>
              </div>
            </div>
          )}

          {/* Collection list */}
          {!loading && collections.length === 0 && !isAdding && (
            <div className="text-center py-8">
              <Database className="w-6 h-6 text-zinc-600 mx-auto mb-2" />
              <p className="text-[11px] text-zinc-500">Aucune collection CMS</p>
              <button
                onClick={() => setIsAdding(true)}
                className="mt-2 text-[10px] text-wf-blue hover:underline"
              >
                Creer une collection
              </button>
            </div>
          )}

          {collections.map(col => (
            <div
              key={col.id}
              className={cn(
                'flex items-center gap-2 px-2 py-1.5 rounded text-[11px] transition-colors cursor-pointer group',
                activeCollectionId === col.id ? 'bg-wf-blue/15 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              )}
              onClick={() => {
                setActiveCollectionId(col.id)
                setView('items')
              }}
            >
              <Database className="w-3.5 h-3.5 shrink-0 text-purple-400" />
              <span className="flex-1 truncate">{col.name}</span>
              <span className="text-[9px] text-zinc-500">{col._count?.items ?? 0}</span>
              <button
                onClick={e => { e.stopPropagation(); setActiveCollectionId(col.id); setView('edit-collection') }}
                className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-600 hover:text-white transition-all shrink-0"
                title="Schema"
              >
                <Settings className="w-3 h-3" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); handleDelete(col.id) }}
                className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-600 hover:text-red-400 transition-all shrink-0"
                title="Supprimer"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  )
}
