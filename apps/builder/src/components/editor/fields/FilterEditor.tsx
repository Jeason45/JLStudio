'use client'
import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { FieldColor } from './FieldColor'

/* ───────── types ───────── */
interface FilterItem { type: string; value: string }

interface FilterEditorProps {
  label: string
  value: string
  onChange: (value: string) => void
}

/* ───────── filter definitions ───────── */
interface FilterDef {
  value: string; label: string; defaultValue: number; unit: string
  min: number; max: number; step: number; sliderLabel: string
}

const FILTER_DEFS: FilterDef[] = [
  { value: 'blur', label: 'Blur', defaultValue: 5, unit: 'px', min: 0, max: 100, step: 1, sliderLabel: 'Radius' },
  { value: 'drop-shadow', label: 'Drop shadow', defaultValue: 0, unit: '', min: 0, max: 0, step: 0, sliderLabel: '' },
  { value: 'brightness', label: 'Brightness', defaultValue: 100, unit: '%', min: 0, max: 200, step: 1, sliderLabel: 'Amount' },
  { value: 'contrast', label: 'Contrast', defaultValue: 100, unit: '%', min: 0, max: 200, step: 1, sliderLabel: 'Amount' },
  { value: 'hue-rotate', label: 'Hue rotate', defaultValue: 0, unit: 'deg', min: 0, max: 360, step: 1, sliderLabel: 'Angle' },
  { value: 'saturate', label: 'Saturation', defaultValue: 100, unit: '%', min: 0, max: 200, step: 1, sliderLabel: 'Amount' },
  { value: 'grayscale', label: 'Grayscale', defaultValue: 0, unit: '%', min: 0, max: 100, step: 1, sliderLabel: 'Amount' },
  { value: 'invert', label: 'Invert', defaultValue: 0, unit: '%', min: 0, max: 100, step: 1, sliderLabel: 'Amount' },
  { value: 'sepia', label: 'Sepia', defaultValue: 0, unit: '%', min: 0, max: 100, step: 1, sliderLabel: 'Amount' },
]

const FILTER_GROUPS: { label: string; items: string[] }[] = [
  { label: 'General', items: ['blur', 'drop-shadow'] },
  { label: 'Color Adjustments', items: ['brightness', 'contrast', 'hue-rotate', 'saturate'] },
  { label: 'Color Effects', items: ['grayscale', 'invert', 'sepia'] },
]

function getFilterDef(type: string): FilterDef | undefined {
  return FILTER_DEFS.find(d => d.value === type)
}

/* ───────── parse / serialize ───────── */
function parseFilters(raw: string): FilterItem[] {
  if (!raw?.trim()) return []
  const items: FilterItem[] = []
  const names = FILTER_DEFS.map(d => d.value)
  let i = 0
  while (i < raw.length) {
    let matched = false
    for (const name of names) {
      if (raw.substring(i).startsWith(name + '(')) {
        const start = i + name.length + 1
        let depth = 1; let j = start
        while (j < raw.length && depth > 0) { if (raw[j] === '(') depth++; if (raw[j] === ')') depth--; j++ }
        items.push({ type: name, value: raw.substring(start, j - 1).trim() })
        i = j; matched = true; break
      }
    }
    if (!matched) i++
  }
  return items
}

function serializeFilters(items: FilterItem[]): string {
  return items.map(f => `${f.type}(${f.value})`).join(' ').trim()
}

function numVal(v: string): number { return parseFloat(v) || 0 }

/* ───────── drop shadow ───────── */
interface DropShadowParts { x: string; y: string; blur: string; color: string }

function parseDropShadow(val: string): DropShadowParts {
  const parts = val.split(/\s+/)
  return {
    x: parts[0] || '0px', y: parts[1] || '4px', blur: parts[2] || '6px',
    color: parts.slice(3).join(' ') || 'rgba(0,0,0,0.1)',
  }
}

function serializeDropShadow(d: DropShadowParts): string {
  return `${d.x} ${d.y} ${d.blur} ${d.color}`
}

/* ───────── main ───────── */
export function FilterEditor({ label, value, onChange }: FilterEditorProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)
  const items = parseFilters(value)

  const update = (idx: number, val: string) => {
    const next = [...items]; next[idx] = { ...next[idx], value: val }
    onChange(serializeFilters(next))
  }

  const add = (type: string) => {
    const def = getFilterDef(type)
    const defaultVal = type === 'drop-shadow' ? '0px 4px 6px rgba(0,0,0,0.1)' : `${def?.defaultValue ?? 0}${def?.unit ?? ''}`
    const next = [...items, { type, value: defaultVal }]
    onChange(serializeFilters(next))
    setExpandedIdx(next.length - 1)
  }

  const remove = (idx: number) => {
    const next = items.filter((_, i) => i !== idx)
    onChange(serializeFilters(next))
    setExpandedIdx(null)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between min-h-[24px]">
        <span className={`text-[10px] ${items.length > 0 ? 'text-wf-blue' : 'text-zinc-500'}`}>{label}</span>
        <div className="relative group">
          <button className="p-0.5 text-zinc-600 hover:text-white transition-colors">
            <Plus className="w-3 h-3" />
          </button>
          <div className="absolute right-0 top-full mt-1 w-36 bg-[#2a2a2a] border border-[#444] rounded shadow-lg z-50 hidden group-hover:block py-1">
            {FILTER_GROUPS.map(g => (
              <div key={g.label}>
                <div className="px-2 py-0.5 text-[9px] text-[#777] uppercase tracking-wider">{g.label}</div>
                {g.items.map(type => {
                  const def = getFilterDef(type)
                  return (
                    <button key={type} onClick={() => add(type)}
                      className="w-full px-3 py-1 text-left text-[11px] text-[#ccc] hover:bg-[#444] hover:text-white">
                      {def?.label}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter items */}
      {items.map((item, i) => {
        const def = getFilterDef(item.type)
        const isExpanded = expandedIdx === i
        const isDropShadow = item.type === 'drop-shadow'

        return (
          <div key={i} className="mt-1.5">
            {/* Summary row */}
            <button onClick={() => setExpandedIdx(isExpanded ? null : i)}
              className="w-full flex items-center gap-1.5 px-1.5 py-1 text-[10px] text-[#ccc] hover:bg-[#333] rounded transition-colors">
              <span className="w-4 h-4 grid place-items-center text-[10px] text-[#999] shrink-0">::</span>
              <span className="flex-1 text-left truncate">{def?.label}: {item.value}</span>
              <button onClick={e => { e.stopPropagation(); remove(i) }} className="p-0.5 text-[#666] hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            </button>

            {/* Expanded */}
            {isExpanded && (
              <div className="mt-1 space-y-1.5 pb-1">
                {/* Filter type selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[#999] w-10 shrink-0">Filter</span>
                  <select value={item.type} onChange={e => {
                    const newType = e.target.value
                    const newDef = getFilterDef(newType)
                    const newVal = newType === 'drop-shadow' ? '0px 4px 6px rgba(0,0,0,0.1)' : `${newDef?.defaultValue ?? 0}${newDef?.unit ?? ''}`
                    const next = [...items]; next[i] = { type: newType, value: newVal }
                    onChange(serializeFilters(next))
                  }} className="flex-1 h-6 bg-[#2a2a2a] border border-[#444] text-[#e0e0e0] text-[11px] rounded px-1 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
                    {FILTER_GROUPS.map(g => (
                      <optgroup key={g.label} label={g.label}>
                        {g.items.map(type => {
                          const d = getFilterDef(type)
                          return <option key={type} value={type}>{d?.label}</option>
                        })}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Drop shadow: X/Y/Blur sliders + Color */}
                {isDropShadow ? (() => {
                  const ds = parseDropShadow(item.value)
                  const updateDs = (key: keyof DropShadowParts, val: string) => {
                    const newDs = { ...ds, [key]: val }
                    update(i, serializeDropShadow(newDs))
                  }
                  return (
                    <>
                      {[
                        { label: 'X', key: 'x' as const, min: -50, max: 50 },
                        { label: 'Y', key: 'y' as const, min: -50, max: 50 },
                        { label: 'Blur', key: 'blur' as const, min: 0, max: 100 },
                      ].map(row => (
                        <div key={row.label} className="flex items-center gap-1.5 h-7">
                          <span className="text-[11px] text-[#999] w-10 shrink-0">{row.label}</span>
                          <input type="range" min={row.min} max={row.max} step={1} value={numVal(ds[row.key])}
                            onChange={e => updateDs(row.key, `${e.target.value}px`)}
                            className="flex-1 h-1 accent-white cursor-pointer" />
                          <input value={numVal(ds[row.key])} onChange={e => updateDs(row.key, `${e.target.value}px`)}
                            className="w-10 h-6 bg-[#2a2a2a] border border-[#444] text-[#e0e0e0] text-[11px] text-center rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                          <span className="text-[10px] text-[#666] w-5 text-right shrink-0">PX</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-[#999] w-10 shrink-0">Color</span>
                        <FieldColor label="" value={ds.color} onChange={v => updateDs('color', v || 'rgba(0,0,0,0.1)')} />
                      </div>
                    </>
                  )
                })() : (
                  /* Standard filter: slider + input + unit */
                  <div className="flex items-center gap-1.5 h-7">
                    <span className="text-[11px] text-[#999] w-10 shrink-0">{def?.sliderLabel || 'Value'}</span>
                    <input type="range" min={def?.min ?? 0} max={def?.max ?? 100} step={def?.step ?? 1}
                      value={numVal(item.value)}
                      onChange={e => update(i, `${e.target.value}${def?.unit ?? ''}`)}
                      className="flex-1 h-1 accent-white cursor-pointer" />
                    <input value={numVal(item.value)}
                      onChange={e => update(i, `${e.target.value}${def?.unit ?? ''}`)}
                      className="w-10 h-6 bg-[#2a2a2a] border border-[#444] text-[#e0e0e0] text-[11px] text-center rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    <span className="text-[10px] text-[#666] w-5 text-right shrink-0">{def?.unit?.toUpperCase() || ''}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
