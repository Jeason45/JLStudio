'use client'
import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { FieldColor } from './FieldColor'

/* ───────── types ───────── */
interface ShadowItem {
  x: string; y: string; blur: string; spread: string; color: string; inset: boolean
}

interface ShadowEditorProps {
  label: string
  value: string
  onChange: (value: string) => void
}

/* ───────── parse / serialize ───────── */
function smartSplit(str: string, delimiter: string): string[] {
  const parts: string[] = []; let current = ''; let depth = 0
  for (const char of str) {
    if (char === '(') depth++; else if (char === ')') depth--
    if (char === delimiter && depth === 0) { parts.push(current.trim()); current = '' }
    else current += char
  }
  if (current.trim()) parts.push(current.trim())
  return parts
}

function parseShadow(raw: string): ShadowItem[] {
  if (!raw?.trim()) return []
  return smartSplit(raw, ',').map(s => {
    const trimmed = s.trim()
    const isInset = trimmed.startsWith('inset')
    const parts = smartSplit(trimmed.replace('inset', '').trim(), ' ')
    return {
      x: parts[0] || '0px', y: parts[1] || '0px',
      blur: parts[2] || '0px', spread: parts[3] || '0px',
      color: parts[4] || 'rgba(0, 0, 0, 0.2)', inset: isInset,
    }
  })
}

function serializeShadows(items: ShadowItem[]): string {
  return items.map(s => `${s.inset ? 'inset ' : ''}${s.x} ${s.y} ${s.blur} ${s.spread} ${s.color}`).join(', ')
}

function pxVal(v: string): number { return parseFloat(v) || 0 }
function toPx(n: number): string { return `${n}px` }

function shadowSummary(s: ShadowItem): string {
  return `${s.inset ? 'Inner' : 'Outer'} shadow: ${s.x} ${s.y} ${s.blur} ${s.spread}`
}

/* ───────── slider row ───────── */
function SliderRow({ label, value, onChange, min, max }: {
  label: string; value: string; onChange: (v: string) => void; min: number; max: number
}) {
  const num = pxVal(value)
  return (
    <div className="flex items-center gap-1.5 h-7">
      <span className="text-[11px] text-[#999] w-8 shrink-0">{label}</span>
      <input type="range" min={min} max={max} step={1} value={num}
        onChange={e => onChange(toPx(Number(e.target.value)))}
        className="flex-1 h-1 accent-white cursor-pointer" />
      <input value={num} onChange={e => onChange(toPx(Number(e.target.value) || 0))}
        className="w-10 h-6 bg-[#2a2a2a] border border-[#444] text-[#e0e0e0] text-[11px] text-center rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
      <span className="text-[10px] text-[#666] w-5 text-right shrink-0">PX</span>
    </div>
  )
}

/* ───────── main ───────── */
export function ShadowEditor({ label, value, onChange }: ShadowEditorProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)
  const items = parseShadow(value)

  const update = (idx: number, key: keyof ShadowItem, val: string | boolean) => {
    const next = [...items]
    next[idx] = { ...next[idx], [key]: val }
    onChange(serializeShadows(next))
  }

  const add = () => {
    const next = [...items, { x: '0px', y: '2px', blur: '5px', spread: '0px', color: 'rgba(0, 0, 0, 0.2)', inset: false }]
    onChange(serializeShadows(next))
    setExpandedIdx(next.length - 1)
  }

  const remove = (idx: number) => {
    const next = items.filter((_, i) => i !== idx)
    onChange(serializeShadows(next))
    setExpandedIdx(null)
  }

  const toggleType = (idx: number) => {
    const next = [...items]
    next[idx] = { ...next[idx], inset: !next[idx].inset }
    onChange(serializeShadows(next))
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between min-h-[24px]">
        <span className={`text-[10px] ${items.length > 0 ? 'text-wf-blue' : 'text-zinc-500'}`}>{label}</span>
        <button onClick={add} className="p-0.5 text-zinc-600 hover:text-white transition-colors">
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Shadow items */}
      {items.map((item, i) => {
        const isExpanded = expandedIdx === i
        return (
          <div key={i} className="mt-1.5">
            {/* Summary row */}
            <button onClick={() => setExpandedIdx(isExpanded ? null : i)}
              className="w-full flex items-center gap-1.5 px-1.5 py-1 text-[10px] text-[#ccc] hover:bg-[#333] rounded transition-colors">
              <span className="flex-1 text-left truncate">{shadowSummary(item)}</span>
              <button onClick={e => { e.stopPropagation(); remove(i) }} className="p-0.5 text-[#666] hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            </button>

            {/* Expanded editor */}
            {isExpanded && (
              <div className="mt-1 space-y-2 pb-1">
                {/* Type: Outside / Inside */}
                <div>
                  <span className="text-[10px] text-[#777]">Type</span>
                  <div className="mt-1 flex rounded overflow-hidden border border-[#444]">
                    <button onClick={() => { if (item.inset) toggleType(i) }}
                      className={`flex-1 h-7 text-[11px] ${!item.inset ? 'bg-[#2a2a2a] text-white' : 'bg-[#383838] text-[#999] hover:text-white'}`}>
                      Outside
                    </button>
                    <button onClick={() => { if (!item.inset) toggleType(i) }}
                      className={`flex-1 h-7 text-[11px] border-l border-[#444] ${item.inset ? 'bg-[#2a2a2a] text-white' : 'bg-[#383838] text-[#999] hover:text-white'}`}>
                      Inside
                    </button>
                  </div>
                </div>

                {/* X / Y / Blur / Size sliders */}
                <SliderRow label="X" value={item.x} onChange={v => update(i, 'x', v)} min={-50} max={50} />
                <SliderRow label="Y" value={item.y} onChange={v => update(i, 'y', v)} min={-50} max={50} />
                <SliderRow label="Blur" value={item.blur} onChange={v => update(i, 'blur', v)} min={0} max={100} />
                <SliderRow label="Size" value={item.spread} onChange={v => update(i, 'spread', v)} min={-50} max={50} />

                {/* Color */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[#999] w-8 shrink-0">Color</span>
                  <FieldColor label="" value={item.color} onChange={v => update(i, 'color', v || 'rgba(0, 0, 0, 0.2)')} />
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Add button at bottom when items exist */}
      {items.length > 0 && (
        <button onClick={add} className="mt-1.5 w-full flex items-center justify-center gap-1 py-1 text-[10px] text-[#666] hover:text-white transition-colors">
          <Plus className="w-3 h-3" />
          <span>Add</span>
        </button>
      )}
    </div>
  )
}
