'use client'
import { useState } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { Plus, Trash2 } from 'lucide-react'

export function ComponentVariantsEditor({ componentId }: { componentId: string }) {
  const { siteConfig, addComponentVariant, removeComponentVariant } = useEditorStore()
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')

  const comp = siteConfig?.components?.find(c => c.id === componentId)
  if (!comp) return null

  const variants = comp.variants ?? []

  const handleAdd = () => {
    if (!newName.trim()) return
    addComponentVariant(componentId, {
      id: `variant-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: newName.trim(),
      overrides: {},
    })
    setNewName('')
    setAdding(false)
  }

  return (
    <PanelSection title="Variants">
      {variants.length === 0 && !adding && (
        <p className="text-[10px] text-zinc-600 text-center py-2">No variants defined</p>
      )}

      <div className="space-y-0.5">
        {variants.map(v => (
          <div key={v.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-800 group">
            <div className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
            <span className="flex-1 text-[11px] text-zinc-300 truncate">{v.name}</span>
            <span className="text-[9px] text-zinc-600">
              {Object.keys(v.overrides).length} override{Object.keys(v.overrides).length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => removeComponentVariant(componentId, v.id)}
              className="opacity-0 group-hover:opacity-100 p-1 text-zinc-600 hover:text-red-400 transition-all shrink-0"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {adding ? (
        <div className="space-y-1.5 mt-2">
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Variant name"
            autoFocus
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600"
          />
          <div className="flex gap-2">
            <button onClick={handleAdd} className="flex-1 py-1.5 bg-wf-blue text-white text-[11px] rounded hover:bg-wf-blue/90 transition-colors">
              Create
            </button>
            <button onClick={() => { setAdding(false); setNewName('') }} className="flex-1 py-1.5 bg-zinc-800 text-zinc-400 text-[11px] rounded hover:bg-zinc-700 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 mt-1 text-[11px] text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded transition-colors"
        >
          <Plus className="w-3 h-3" />
          Add Variant
        </button>
      )}
    </PanelSection>
  )
}
