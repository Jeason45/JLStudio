'use client'
import { useState } from 'react'
import { Plus, X, ChevronDown, ChevronRight } from 'lucide-react'

interface TextShadowItem {
  x: string
  y: string
  blur: string
  color: string
}

interface TextShadowEditorProps {
  label: string
  value: string
  onChange: (value: string) => void
}

/** Split string by delimiter, but respect parenthesized groups */
function smartSplit(str: string, delimiter: string): string[] {
  const parts: string[] = []
  let current = ''
  let depth = 0
  for (const char of str) {
    if (char === '(') depth++
    else if (char === ')') depth--
    if (char === delimiter && depth === 0) {
      parts.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  if (current.trim()) parts.push(current.trim())
  return parts
}

function parseTextShadow(raw: string): TextShadowItem[] {
  if (!raw?.trim()) return []
  return smartSplit(raw, ',').map(s => {
    const parts = smartSplit(s.trim(), ' ')
    return {
      x: parts[0] || '0px',
      y: parts[1] || '0px',
      blur: parts[2] || '0px',
      color: parts[3] || 'rgba(0,0,0,0.3)',
    }
  })
}

function serializeTextShadows(items: TextShadowItem[]): string {
  return items.map(s => `${s.x} ${s.y} ${s.blur} ${s.color}`).join(', ')
}

const INPUT = 'w-full h-6 bg-zinc-800 border border-zinc-700 text-white text-[10px] rounded px-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue'

export function TextShadowEditor({ label, value, onChange }: TextShadowEditorProps) {
  const [expanded, setExpanded] = useState<number | null>(null)
  const items = parseTextShadow(value)

  const update = (idx: number, key: keyof TextShadowItem, val: string) => {
    const next = [...items]
    next[idx] = { ...next[idx], [key]: val }
    onChange(serializeTextShadows(next))
  }

  const add = () => {
    const next = [...items, { x: '1px', y: '1px', blur: '2px', color: 'rgba(0,0,0,0.3)' }]
    onChange(serializeTextShadows(next))
    setExpanded(next.length - 1)
  }

  const remove = (idx: number) => {
    const next = items.filter((_, i) => i !== idx)
    onChange(serializeTextShadows(next))
    setExpanded(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-zinc-500">{label}</span>
        <button onClick={add} className="p-0.5 text-zinc-600 hover:text-white transition-colors">
          <Plus className="w-3 h-3" />
        </button>
      </div>
      {items.length === 0 && (
        <p className="text-[10px] text-zinc-700 mt-1">No text shadows</p>
      )}
      {items.map((item, i) => (
        <div key={i} className="mt-1 border border-zinc-700/50 rounded overflow-hidden">
          <button
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full flex items-center gap-1.5 px-2 py-1 text-[10px] text-zinc-400 hover:bg-zinc-800 transition-colors"
          >
            {expanded === i ? <ChevronDown className="w-2.5 h-2.5" /> : <ChevronRight className="w-2.5 h-2.5" />}
            <div className="w-3 h-3 rounded-sm border border-zinc-600" style={{ backgroundColor: item.color }} />
            <span className="flex-1 text-left truncate">{item.x} {item.y} {item.blur}</span>
            <button onClick={e => { e.stopPropagation(); remove(i) }} className="p-0.5 text-zinc-600 hover:text-red-400">
              <X className="w-2.5 h-2.5" />
            </button>
          </button>
          {expanded === i && (
            <div className="px-2 pb-2 pt-1 space-y-1.5 bg-zinc-800/30">
              <div className="grid grid-cols-3 gap-1">
                <div><label className="text-[9px] text-zinc-600">X</label><input value={item.x} onChange={e => update(i, 'x', e.target.value)} className={INPUT} /></div>
                <div><label className="text-[9px] text-zinc-600">Y</label><input value={item.y} onChange={e => update(i, 'y', e.target.value)} className={INPUT} /></div>
                <div><label className="text-[9px] text-zinc-600">Blur</label><input value={item.blur} onChange={e => update(i, 'blur', e.target.value)} className={INPUT} /></div>
              </div>
              <div><label className="text-[9px] text-zinc-600">Color</label><input value={item.color} onChange={e => update(i, 'color', e.target.value)} className={INPUT} /></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
