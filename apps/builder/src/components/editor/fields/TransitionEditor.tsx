'use client'
import { useState, useRef, useEffect } from 'react'
import { Plus, X, ChevronDown, ChevronRight } from 'lucide-react'
import { CubicBezierEditor } from './CubicBezierEditor'

interface TransitionItem {
  property: string
  duration: string
  easing: string
  delay: string
}

interface TransitionEditorProps {
  label: string
  value: string
  onChange: (value: string) => void
}

const EASING_OPTIONS = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']
const PROPERTY_GROUPS: { label: string; options: { value: string; label: string }[] }[] = [
  { label: 'Common', options: [
    { value: 'opacity', label: 'Opacity' }, { value: 'margin', label: 'Margin' }, { value: 'padding', label: 'Padding' },
    { value: 'border', label: 'Border' }, { value: 'transform', label: 'Transform' }, { value: 'filter', label: 'Filter' },
    { value: 'flex', label: 'Flex' },
  ]},
  { label: 'Background', options: [
    { value: 'background-color', label: 'Background Color' }, { value: 'background-position', label: 'Background Position' },
  ]},
  { label: 'Size', options: [
    { value: 'width', label: 'Width' }, { value: 'height', label: 'Height' },
    { value: 'max-height', label: 'Max Height' }, { value: 'max-width', label: 'Max Width' },
    { value: 'min-height', label: 'Min Height' }, { value: 'min-width', label: 'Min Width' },
  ]},
  { label: 'Borders', options: [
    { value: 'border-radius', label: 'Border Radius' }, { value: 'border-color', label: 'Border Color' },
    { value: 'border-width', label: 'Border Width' },
  ]},
  { label: 'Typography', options: [
    { value: 'color', label: 'Font Color' }, { value: 'font-size', label: 'Font Size' },
    { value: 'line-height', label: 'Line Height' }, { value: 'letter-spacing', label: 'Letter Spacing' },
    { value: 'text-indent', label: 'Text Indent' }, { value: 'word-spacing', label: 'Word Spacing' },
    { value: 'font-variation-settings', label: 'Font Variations' },
    { value: '-webkit-text-stroke-color', label: 'Text Stroke Color' },
    { value: 'text-underline-offset', label: 'Text Underline Offset' },
    { value: 'text-decoration-color', label: 'Text Decoration Color' },
  ]},
  { label: 'Position', options: [
    { value: 'top', label: 'Top' }, { value: 'left', label: 'Left' },
    { value: 'bottom', label: 'Bottom' }, { value: 'right', label: 'Right' },
    { value: 'z-index', label: 'z-Index' },
  ]},
  { label: 'Margin', options: [
    { value: 'margin-bottom', label: 'Margin Bottom' }, { value: 'margin-left', label: 'Margin Left' },
    { value: 'margin-right', label: 'Margin Right' }, { value: 'margin-top', label: 'Margin Top' },
  ]},
  { label: 'Padding', options: [
    { value: 'padding-bottom', label: 'Padding Bottom' }, { value: 'padding-left', label: 'Padding Left' },
    { value: 'padding-right', label: 'Padding Right' }, { value: 'padding-top', label: 'Padding Top' },
  ]},
  { label: 'Flex', options: [
    { value: 'flex-grow', label: 'Flex Grow' }, { value: 'flex-shrink', label: 'Flex Shrink' },
    { value: 'flex-basis', label: 'Flex Basis' },
  ]},
  { label: 'Advanced', options: [
    { value: 'all', label: 'All Properties' },
  ]},
]

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

function parseTransitions(raw: string): TransitionItem[] {
  if (!raw?.trim()) return []
  return smartSplit(raw, ',').map(s => {
    const parts = smartSplit(s.trim(), ' ')
    return {
      property: parts[0] || 'all',
      duration: parts[1] || '0.3s',
      easing: parts[2] || 'ease',
      delay: parts[3] || '0s',
    }
  })
}

function serializeTransitions(items: TransitionItem[]): string {
  return items.map(t => `${t.property} ${t.duration} ${t.easing} ${t.delay}`).join(', ')
}

const INPUT = 'w-full h-6 bg-zinc-800 border border-zinc-700 text-white text-[10px] rounded px-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue'
const SELECT = 'w-full h-6 bg-zinc-800 border border-zinc-700 text-white text-[10px] rounded px-1 focus:outline-none focus:ring-1 focus:ring-wf-blue cursor-pointer'

function EasingPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const isCustom = value.startsWith('cubic-bezier')
  const displayLabel = isCustom ? 'custom' : value

  return (
    <div className="relative" ref={ref}>
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] text-[#999] w-14 shrink-0">Easing</span>
        <select
          value={isCustom ? '__custom__' : value}
          onChange={e => {
            if (e.target.value === '__custom__') {
              setOpen(true)
            } else {
              onChange(e.target.value)
              setOpen(false)
            }
          }}
          className={SELECT}
        >
          {EASING_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)}
          <option value="__custom__">custom...</option>
        </select>
        {(isCustom || open) && (
          <button
            onClick={() => setOpen(!open)}
            className="px-1.5 h-6 bg-wf-blue hover:bg-wf-blue/90 text-white text-[9px] rounded shrink-0 transition-colors"
            title="Edit curve"
          >
            curve
          </button>
        )}
      </div>
      {isCustom && !open && (
        <p className="text-[9px] text-zinc-600 mt-0.5 font-mono truncate">{value}</p>
      )}
      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 p-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl w-[192px]">
          <CubicBezierEditor
            value={value}
            onChange={v => onChange(v)}
          />
        </div>
      )}
    </div>
  )
}

export function TransitionEditor({ label, value, onChange }: TransitionEditorProps) {
  const [expanded, setExpanded] = useState<number | null>(null)
  const items = parseTransitions(value)

  const update = (idx: number, key: keyof TransitionItem, val: string) => {
    const next = [...items]
    next[idx] = { ...next[idx], [key]: val }
    onChange(serializeTransitions(next))
  }

  const add = () => {
    const next = [...items, { property: 'all', duration: '0.3s', easing: 'ease', delay: '0s' }]
    onChange(serializeTransitions(next))
    setExpanded(next.length - 1)
  }

  const remove = (idx: number) => {
    const next = items.filter((_, i) => i !== idx)
    onChange(serializeTransitions(next))
    setExpanded(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between min-h-[24px]">
        <span className="text-[10px] text-zinc-500">{label}</span>
        <button onClick={add} className="p-0.5 text-zinc-600 hover:text-white transition-colors">
          <Plus className="w-3 h-3" />
        </button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="mt-1 border border-zinc-700/50 rounded overflow-hidden">
          <button
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full flex items-center gap-1.5 px-2 py-1 text-[10px] text-zinc-400 hover:bg-zinc-800"
          >
            {expanded === i ? <ChevronDown className="w-2.5 h-2.5" /> : <ChevronRight className="w-2.5 h-2.5" />}
            <span className="flex-1 text-left truncate">{item.property} {item.duration} {item.easing.startsWith('cubic-bezier') ? 'custom' : item.easing}</span>
            <button onClick={e => { e.stopPropagation(); remove(i) }} className="p-0.5 text-zinc-600 hover:text-red-400">
              <X className="w-2.5 h-2.5" />
            </button>
          </button>
          {expanded === i && (
            <div className="px-2 pb-2 pt-1 space-y-1.5 bg-zinc-800/30">
              {/* Type (property) */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#999] w-14 shrink-0">Type</span>
                <select value={item.property} onChange={e => update(i, 'property', e.target.value)} className={SELECT + ' flex-1'}>
                  {PROPERTY_GROUPS.map(g => (
                    <optgroup key={g.label} label={g.label}>
                      {g.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
              {/* Duration */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#999] w-14 shrink-0">Duration</span>
                <input type="range" min={0} max={2000} step={10}
                  value={parseFloat(item.duration) * (item.duration.includes('ms') ? 1 : 1000) || 300}
                  onChange={e => update(i, 'duration', `${e.target.value}ms`)}
                  className="flex-1 h-1 accent-white cursor-pointer" />
                <input value={parseFloat(item.duration) * (item.duration.includes('ms') ? 1 : 1000) || 300}
                  onChange={e => update(i, 'duration', `${e.target.value}ms`)}
                  className="w-12 h-6 bg-[#2a2a2a] border border-[#444] text-[#e0e0e0] text-[11px] text-center rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                <span className="text-[10px] text-[#666] w-5 text-right shrink-0">MS</span>
              </div>
              {/* Delay */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#999] w-14 shrink-0">Delay</span>
                <input type="range" min={0} max={2000} step={10}
                  value={parseFloat(item.delay) * (item.delay.includes('ms') ? 1 : 1000) || 0}
                  onChange={e => update(i, 'delay', `${e.target.value}ms`)}
                  className="flex-1 h-1 accent-white cursor-pointer" />
                <input value={parseFloat(item.delay) * (item.delay.includes('ms') ? 1 : 1000) || 0}
                  onChange={e => update(i, 'delay', `${e.target.value}ms`)}
                  className="w-12 h-6 bg-[#2a2a2a] border border-[#444] text-[#e0e0e0] text-[11px] text-center rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                <span className="text-[10px] text-[#666] w-5 text-right shrink-0">MS</span>
              </div>
              {/* Easing */}
              <EasingPicker value={item.easing} onChange={v => update(i, 'easing', v)} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
