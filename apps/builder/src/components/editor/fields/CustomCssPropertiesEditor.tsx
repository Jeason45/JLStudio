'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'

interface CssProperty { property: string; value: string }

interface CustomCssPropertiesEditorProps {
  value: string
  onChange: (value: string) => void
}

const INPUT = 'h-7 bg-[#2b2b2b] border border-[#3a3a3a] text-[#e0e0e0] text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-[#555]'

export function CustomCssPropertiesEditor({ value, onChange }: CustomCssPropertiesEditorProps) {
  const [items, setItems] = useState<CssProperty[]>([])

  useEffect(() => {
    if (!value) { setItems([]); return }
    try { const p = JSON.parse(value); if (Array.isArray(p)) setItems(p) } catch { setItems([]) }
  }, [value])

  const commit = (updated: CssProperty[]) => {
    setItems(updated)
    const filtered = updated.filter(p => p.property || p.value)
    onChange(filtered.length > 0 ? JSON.stringify(filtered) : '')
  }

  return (
    <div className="space-y-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1">
          <input value={item.property} onChange={e => { const c = [...items]; c[i] = { ...c[i], property: e.target.value }; commit(c) }}
            placeholder="property" className={`${INPUT} flex-1 min-w-0`} />
          <span className="text-[11px] text-[#555]">:</span>
          <input value={item.value} onChange={e => { const c = [...items]; c[i] = { ...c[i], value: e.target.value }; commit(c) }}
            placeholder="value" className={`${INPUT} flex-1 min-w-0`} />
          <button onClick={() => commit(items.filter((_, j) => j !== i))} className="text-[#666] hover:text-red-400 shrink-0">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      ))}
      {items.length === 0 && (
        <div className="flex items-center gap-1 text-[11px] text-[#555]">
          <span className="flex-1 border-l-2 border-[#444] pl-2">property : value</span>
        </div>
      )}
      <button onClick={() => commit([...items, { property: '', value: '' }])}
        className="flex items-center gap-1 text-[11px] text-[#888] hover:text-white transition-colors">
        <Plus className="w-3 h-3" /> Add
      </button>
    </div>
  )
}
