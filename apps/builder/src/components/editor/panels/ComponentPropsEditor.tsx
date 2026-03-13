'use client'
import { useState } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { Plus, Trash2, GripVertical, ChevronDown } from 'lucide-react'
import type { ComponentPropType } from '@/types/components'

const PROP_TYPES: { value: ComponentPropType; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'image', label: 'Image' },
  { value: 'link', label: 'Link' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'color', label: 'Color' },
  { value: 'enum', label: 'Enum' },
]

export function ComponentPropsEditor({ componentId }: { componentId: string }) {
  const { siteConfig, addComponentProp, updateComponentProp, removeComponentProp } = useEditorStore()
  const [adding, setAdding] = useState(false)
  const [newProp, setNewProp] = useState({ name: '', label: '', type: 'text' as ComponentPropType, contentPath: '', defaultValue: '' })

  const comp = siteConfig?.components?.find(c => c.id === componentId)
  if (!comp) return null

  const props = comp.props ?? []

  const handleAdd = () => {
    if (!newProp.name.trim() || !newProp.contentPath.trim()) return
    addComponentProp(componentId, {
      id: `prop-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: newProp.name.trim(),
      label: newProp.label.trim() || newProp.name.trim(),
      type: newProp.type,
      contentPath: newProp.contentPath.trim(),
      defaultValue: newProp.type === 'boolean' ? false : newProp.defaultValue,
    })
    setNewProp({ name: '', label: '', type: 'text', contentPath: '', defaultValue: '' })
    setAdding(false)
  }

  return (
    <PanelSection title="Props">
      {props.length === 0 && !adding && (
        <p className="text-[10px] text-zinc-600 text-center py-2">No props defined</p>
      )}

      <div className="space-y-1">
        {props.map(prop => (
          <div key={prop.id} className="flex items-center gap-1.5 px-1.5 py-1.5 rounded hover:bg-zinc-800 group">
            <GripVertical className="w-3 h-3 text-zinc-700 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-white truncate">{prop.label}</span>
                <span className="text-[9px] text-zinc-600 bg-zinc-800 px-1 rounded">{prop.type}</span>
              </div>
              <p className="text-[9px] text-zinc-600 truncate font-mono">{prop.contentPath}</p>
            </div>
            <button
              onClick={() => removeComponentProp(componentId, prop.id)}
              className="opacity-0 group-hover:opacity-100 p-1 text-zinc-600 hover:text-red-400 transition-all shrink-0"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {adding ? (
        <div className="space-y-1.5 mt-2 p-2 bg-zinc-800/50 rounded">
          <input
            value={newProp.name}
            onChange={e => setNewProp(p => ({ ...p, name: e.target.value }))}
            placeholder="Prop name (e.g. title)"
            autoFocus
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600"
          />
          <input
            value={newProp.label}
            onChange={e => setNewProp(p => ({ ...p, label: e.target.value }))}
            placeholder="Display label"
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600"
          />
          <input
            value={newProp.contentPath}
            onChange={e => setNewProp(p => ({ ...p, contentPath: e.target.value }))}
            placeholder="Content path (e.g. title)"
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600 font-mono"
          />
          <div className="relative">
            <select
              value={newProp.type}
              onChange={e => setNewProp(p => ({ ...p, type: e.target.value as ComponentPropType }))}
              className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 pr-6 focus:outline-none focus:ring-1 focus:ring-wf-blue appearance-none"
            >
              {PROP_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500 pointer-events-none" />
          </div>
          {newProp.type !== 'boolean' && (
            <input
              value={String(newProp.defaultValue)}
              onChange={e => setNewProp(p => ({ ...p, defaultValue: e.target.value }))}
              placeholder="Default value"
              className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600"
            />
          )}
          <div className="flex gap-2">
            <button onClick={handleAdd} className="flex-1 py-1.5 bg-wf-blue text-white text-[11px] rounded hover:bg-wf-blue/90 transition-colors">
              Add
            </button>
            <button onClick={() => setAdding(false)} className="flex-1 py-1.5 bg-zinc-800 text-zinc-400 text-[11px] rounded hover:bg-zinc-700 transition-colors">
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
          Add Prop
        </button>
      )}
    </PanelSection>
  )
}
