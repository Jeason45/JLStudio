'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'

export type SpacingKey = 'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft' | 'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft'

interface BoxModelValues {
  marginTop?: string
  marginRight?: string
  marginBottom?: string
  marginLeft?: string
  paddingTop?: string
  paddingRight?: string
  paddingBottom?: string
  paddingLeft?: string
}

type DotColor = 'blue' | 'orange' | 'violet' | 'yellow' | null

interface FieldBoxModelProps {
  values: BoxModelValues
  onChange: (key: SpacingKey, value: string) => void
  dots?: Partial<Record<SpacingKey, DotColor>>
  onReset?: (key: SpacingKey) => void
}

const PRESETS = [0, 10, 20, 40, 60, 100, 140, 220]
const UNITS = ['px', '%', 'em', 'rem', 'vw', 'vh'] as const

const ALL_KEYS: SpacingKey[] = [
  'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
]

function parseValue(v?: string): { num: number; unit: string; isAuto: boolean } {
  if (!v || v === 'auto') return { num: 0, unit: 'px', isAuto: v === 'auto' }
  const match = v.match(/^(-?\d*\.?\d+)\s*([a-z%]*)$/i)
  if (!match) return { num: 0, unit: 'px', isAuto: false }
  return { num: parseFloat(match[1]), unit: match[2] || 'px', isAuto: false }
}

const SIDE_LABEL: Record<SpacingKey, string> = {
  marginTop: 'MARGIN', marginRight: 'MARGIN', marginBottom: 'MARGIN', marginLeft: 'MARGIN',
  paddingTop: 'PADDING', paddingRight: 'PADDING', paddingBottom: 'PADDING', paddingLeft: 'PADDING',
}

// ─── Spacing Popover ───
function SpacingPopover({ propKey, value, onChange, onClose, onNavigate, isMargin, anchorRect, containerRect }: {
  propKey: SpacingKey; value?: string
  onChange: (v: string) => void; onClose: () => void
  onNavigate: (dir: -1 | 1) => void; isMargin: boolean
  anchorRect: DOMRect | null; containerRect: DOMRect | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const parsed = parseValue(value)
  const [unit, setUnit] = useState(parsed.unit)
  const [numVal, setNumVal] = useState(parsed.num)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { const p = parseValue(value); setNumVal(p.num); setUnit(p.unit) }, [value])
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose() }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])
  useEffect(() => { inputRef.current?.select() }, [])

  const commit = (n: number, u: string) => { setNumVal(n); setUnit(u); onChange(`${n}${u}`) }

  const style: React.CSSProperties = {}
  if (anchorRect && containerRect) {
    const pw = 220
    let left = anchorRect.left - containerRect.left + anchorRect.width / 2 - pw / 2
    left = Math.max(0, Math.min(left, containerRect.width - pw))
    style.left = left
    style.top = anchorRect.bottom - containerRect.top + 4
    style.width = pw
  }

  return (
    <div ref={ref} className="absolute z-50 bg-[#1e1e1e] border border-[#444] rounded-lg p-2.5 space-y-2"
      style={{ ...style, boxShadow: '0 8px 30px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)' }}>
      <div className="flex items-center gap-1.5">
        <button onClick={() => onNavigate(-1)} className="text-[#666] hover:text-white shrink-0"><ChevronLeft className="w-3.5 h-3.5" /></button>
        <span className="text-[8px] text-[#888] uppercase tracking-wider shrink-0 font-semibold w-[38px]">{SIDE_LABEL[propKey]}</span>
        <input ref={inputRef} type="number" value={numVal}
          onChange={e => { const n = parseFloat(e.target.value) || 0; commit(n, unit) }}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === 'Escape') onClose()
            if (e.key === 'ArrowUp') { e.preventDefault(); commit(numVal + 1, unit) }
            if (e.key === 'ArrowDown') { e.preventDefault(); commit(Math.max(isMargin ? -9999 : 0, numVal - 1), unit) }
            if (e.key === 'Tab') { e.preventDefault(); onNavigate(e.shiftKey ? -1 : 1) }
          }}
          className="flex-1 h-6 bg-[#2b2b2b] border border-[#3a3a3a] text-white text-[11px] text-center rounded px-1 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-0"
        />
        <select value={unit} onChange={e => commit(numVal, e.target.value)}
          className="h-6 bg-[#2b2b2b] border border-[#3a3a3a] text-[#999] text-[9px] rounded px-0.5 cursor-pointer focus:outline-none w-[36px]">
          {UNITS.map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
        </select>
        <button onClick={() => onNavigate(1)} className="text-[#666] hover:text-white shrink-0"><ChevronRight className="w-3.5 h-3.5" /></button>
      </div>
      <input type="range" min={isMargin ? -100 : 0} max={220} value={numVal}
        onChange={e => commit(parseFloat(e.target.value), unit)}
        className="w-full h-[3px] accent-blue-500 cursor-pointer" />
      <div className="grid grid-cols-4 gap-1">
        {isMargin && (
          <button onClick={() => { onChange('auto'); onClose() }}
            className={cn('h-[22px] text-[10px] rounded transition-colors border',
              value === 'auto' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-[#2b2b2b] text-[#888] hover:bg-[#383838] hover:text-white border-[#333]'
            )}>Auto</button>
        )}
        {PRESETS.map(p => (
          <button key={p} onClick={() => { commit(p, unit); onClose() }}
            className={cn('h-[22px] text-[10px] rounded transition-colors border',
              numVal === p && !parsed.isAuto ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-[#2b2b2b] text-[#888] hover:bg-[#383838] hover:text-white border-[#333]'
            )}>{p}</button>
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ───
// All dimensions in px, M = margin inset, P = padding inset
const BOX_H = 132
const M = 32
const PV = 28  // padding vertical inset
const PH = 40  // padding horizontal inset (larger = narrower content center)

export function FieldBoxModel({ values, onChange, dots, onReset }: FieldBoxModelProps) {
  const [activeInput, setActiveInput] = useState<SpacingKey | null>(null)
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)
  const [hoveredZone, setHoveredZone] = useState<SpacingKey | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [cw, setCw] = useState(0)
  const valueRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => setCw(entries[0].contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const d = (key: SpacingKey) => dots?.[key] ?? null
  const r = (key: SpacingKey) => onReset ? () => onReset(key) : undefined

  const openPopover = useCallback((key: SpacingKey) => {
    const el = valueRefs.current[key]
    if (el) setAnchorRect(el.getBoundingClientRect())
    setActiveInput(key)
  }, [])

  const navigate = useCallback((dir: -1 | 1) => {
    if (!activeInput) return
    const idx = ALL_KEYS.indexOf(activeInput)
    const next = ALL_KEYS[(idx + dir + ALL_KEYS.length) % ALL_KEYS.length]
    openPopover(next)
  }, [activeInput, openPopover])

  const containerRect = containerRef.current?.getBoundingClientRect() ?? null

  const ValBtn = ({ propKey, value }: { propKey: SpacingKey; value?: string }) => {
    const isAuto = value === 'auto'
    const hasVal = !!value && value !== '0' && value !== '0px'
    const display = isAuto ? 'Auto' : (value?.replace(/[a-z%]+$/i, '') || '0')
    const dot = d(propKey)
    const resetFn = r(propKey)
    const isActive = activeInput === propKey
    // Blue bg behind value when it has an override (instead of dot)
    const hasBlueBg = !!dot && !isAuto
    return (
      <div className="relative flex items-center justify-center">
        <button ref={el => { valueRefs.current[propKey] = el }} onClick={() => openPopover(propKey)}
          className={cn('text-[11px] text-center border-0 focus:outline-none transition-colors rounded-sm px-1 py-0.5 min-w-[28px]',
            isActive ? 'text-blue-400 font-semibold bg-blue-500/15' : hasBlueBg ? 'bg-blue-500/15 text-blue-300' : isAuto ? 'text-[#7db8e8] bg-transparent' : hasVal ? 'text-[#ddd] bg-transparent' : 'text-[#888] bg-transparent',
            'hover:text-white'
          )}>{display}</button>
        {resetFn && (dot === 'violet' || dot === 'yellow') && (
          <button onClick={e => { e.stopPropagation(); resetFn() }}
            className={`absolute -top-1 -right-1 z-20 ${dot === 'yellow' ? 'text-yellow-400' : 'text-violet-400'} opacity-0 hover:opacity-100`}>
            <RotateCcw className="w-2 h-2" />
          </button>
        )}
      </div>
    )
  }

  // Hover/click helpers
  const hz = (k: SpacingKey) => hoveredZone === k

  // Everything rendered via one SVG + overlaid value buttons
  const W = cw
  const H = BOX_H

  return (
    <div className="w-full">
      <div ref={containerRef} className="relative" style={{ height: H }}>

        {W > 0 && (
          <svg className="absolute inset-0" width={W} height={H} xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Margin gradients */}
              <linearGradient id="bm-mt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a3a3a" /><stop offset="100%" stopColor="#2e2e2e" />
              </linearGradient>
              <linearGradient id="bm-mb" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#232323" /><stop offset="100%" stopColor="#2a2a2a" />
              </linearGradient>
              <linearGradient id="bm-ml" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#353535" /><stop offset="100%" stopColor="#2b2b2b" />
              </linearGradient>
              <linearGradient id="bm-mr" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#2e2e2e" /><stop offset="100%" stopColor="#292929" />
              </linearGradient>
              {/* Padding gradients */}
              <linearGradient id="bm-pt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#444" /><stop offset="100%" stopColor="#393939" />
              </linearGradient>
              <linearGradient id="bm-pb" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#2c2c2c" /><stop offset="100%" stopColor="#353535" />
              </linearGradient>
              <linearGradient id="bm-pl" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3f3f3f" /><stop offset="100%" stopColor="#373737" />
              </linearGradient>
              <linearGradient id="bm-pr" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#3a3a3a" /><stop offset="100%" stopColor="#343434" />
              </linearGradient>
              {/* Hover versions (brighter) */}
              <linearGradient id="bm-mt-h" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a4a4a" /><stop offset="100%" stopColor="#3e3e3e" />
              </linearGradient>
              <linearGradient id="bm-mb-h" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#333" /><stop offset="100%" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="bm-ml-h" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#454545" /><stop offset="100%" stopColor="#3b3b3b" />
              </linearGradient>
              <linearGradient id="bm-mr-h" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#3e3e3e" /><stop offset="100%" stopColor="#393939" />
              </linearGradient>
              <linearGradient id="bm-pt-h" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#545454" /><stop offset="100%" stopColor="#494949" />
              </linearGradient>
              <linearGradient id="bm-pb-h" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#3c3c3c" /><stop offset="100%" stopColor="#454545" />
              </linearGradient>
              <linearGradient id="bm-pl-h" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4f4f4f" /><stop offset="100%" stopColor="#474747" />
              </linearGradient>
              <linearGradient id="bm-pr-h" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#4a4a4a" /><stop offset="100%" stopColor="#444" />
              </linearGradient>
            </defs>

            {/* Outer box border */}
            <rect x={0.5} y={0.5} width={W - 1} height={H - 1} rx={4} fill="none" stroke="#333" strokeWidth={1} />

            {/* Margin trapezoids */}
            <polygon points={`1,1 ${W - 1},1 ${W - M},${M} ${M},${M}`}
              fill={values.marginTop === 'auto' ? '#1a3a5c' : hz('marginTop') ? 'url(#bm-mt-h)' : 'url(#bm-mt)'} className="cursor-pointer transition-colors duration-150"
              onMouseEnter={() => setHoveredZone('marginTop')} onMouseLeave={() => setHoveredZone(null)} onClick={() => openPopover('marginTop')} />
            <polygon points={`${M},${H - M} ${W - M},${H - M} ${W - 1},${H - 1} 1,${H - 1}`}
              fill={values.marginBottom === 'auto' ? '#1a3a5c' : hz('marginBottom') ? 'url(#bm-mb-h)' : 'url(#bm-mb)'} className="cursor-pointer transition-colors duration-150"
              onMouseEnter={() => setHoveredZone('marginBottom')} onMouseLeave={() => setHoveredZone(null)} onClick={() => openPopover('marginBottom')} />
            <polygon points={`1,1 ${M},${M} ${M},${H - M} 1,${H - 1}`}
              fill={values.marginLeft === 'auto' ? '#1a3a5c' : hz('marginLeft') ? 'url(#bm-ml-h)' : 'url(#bm-ml)'} className="cursor-pointer transition-colors duration-150"
              onMouseEnter={() => setHoveredZone('marginLeft')} onMouseLeave={() => setHoveredZone(null)} onClick={() => openPopover('marginLeft')} />
            <polygon points={`${W - M},${M} ${W - 1},1 ${W - 1},${H - 1} ${W - M},${H - M}`}
              fill={values.marginRight === 'auto' ? '#1a3a5c' : hz('marginRight') ? 'url(#bm-mr-h)' : 'url(#bm-mr)'} className="cursor-pointer transition-colors duration-150"
              onMouseEnter={() => setHoveredZone('marginRight')} onMouseLeave={() => setHoveredZone(null)} onClick={() => openPopover('marginRight')} />

            {/* Padding box border (visible rect between margin & padding) */}
            <rect x={M} y={M} width={W - M * 2} height={H - M * 2} rx={3} fill="none" stroke="#4a4a4a" strokeWidth={1.5} />

            {/* Padding trapezoids */}
            <polygon points={`${M},${M} ${W - M},${M} ${W - M - PH},${M + PV} ${M + PH},${M + PV}`}
              fill={hz('paddingTop') ? 'url(#bm-pt-h)' : 'url(#bm-pt)'} className="cursor-pointer transition-colors duration-150"
              onMouseEnter={() => setHoveredZone('paddingTop')} onMouseLeave={() => setHoveredZone(null)} onClick={() => openPopover('paddingTop')} />
            <polygon points={`${M + PH},${H - M - PV} ${W - M - PH},${H - M - PV} ${W - M},${H - M} ${M},${H - M}`}
              fill={hz('paddingBottom') ? 'url(#bm-pb-h)' : 'url(#bm-pb)'} className="cursor-pointer transition-colors duration-150"
              onMouseEnter={() => setHoveredZone('paddingBottom')} onMouseLeave={() => setHoveredZone(null)} onClick={() => openPopover('paddingBottom')} />
            <polygon points={`${M},${M} ${M + PH},${M + PV} ${M + PH},${H - M - PV} ${M},${H - M}`}
              fill={hz('paddingLeft') ? 'url(#bm-pl-h)' : 'url(#bm-pl)'} className="cursor-pointer transition-colors duration-150"
              onMouseEnter={() => setHoveredZone('paddingLeft')} onMouseLeave={() => setHoveredZone(null)} onClick={() => openPopover('paddingLeft')} />
            <polygon points={`${W - M - PH},${M + PV} ${W - M},${M} ${W - M},${H - M} ${W - M - PH},${H - M - PV}`}
              fill={hz('paddingRight') ? 'url(#bm-pr-h)' : 'url(#bm-pr)'} className="cursor-pointer transition-colors duration-150"
              onMouseEnter={() => setHoveredZone('paddingRight')} onMouseLeave={() => setHoveredZone(null)} onClick={() => openPopover('paddingRight')} />

            {/* Content center */}
            <rect x={M + PH} y={M + PV} width={W - (M + PH) * 2} height={H - (M + PV) * 2} rx={2} fill="#1e1e1e" stroke="#444" strokeWidth={1.5} />

            {/* Edges created naturally by gradient contrast between adjacent faces */}
          </svg>
        )}

        {/* ── Labels ── */}
        <span className="absolute text-[8px] text-[#666] uppercase tracking-[0.08em] leading-none select-none pointer-events-none font-medium"
          style={{ top: 5, left: 8, zIndex: 3 }}>margin</span>
        <span className="absolute text-[8px] text-[#666] uppercase tracking-[0.08em] leading-none select-none pointer-events-none font-medium"
          style={{ left: M + 6, top: M + 4, zIndex: 3 }}>padding</span>

        {/* ── Values ── */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 5, zIndex: 5 }}>
          <ValBtn propKey="marginTop" value={values.marginTop} />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 5, zIndex: 5 }}>
          <ValBtn propKey="marginBottom" value={values.marginBottom} />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center" style={{ left: 0, width: M, zIndex: 5 }}>
          <ValBtn propKey="marginLeft" value={values.marginLeft} />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center" style={{ right: 0, width: M, zIndex: 5 }}>
          <ValBtn propKey="marginRight" value={values.marginRight} />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: M + 4, zIndex: 5 }}>
          <ValBtn propKey="paddingTop" value={values.paddingTop} />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: M + 4, zIndex: 5 }}>
          <ValBtn propKey="paddingBottom" value={values.paddingBottom} />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2" style={{ left: M + 3, zIndex: 5 }}>
          <ValBtn propKey="paddingLeft" value={values.paddingLeft} />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2" style={{ right: M + 3, zIndex: 5 }}>
          <ValBtn propKey="paddingRight" value={values.paddingRight} />
        </div>

        {/* ── Popover ── */}
        {activeInput && (
          <SpacingPopover
            propKey={activeInput}
            value={values[activeInput]}
            onChange={v => onChange(activeInput, v)}
            onClose={() => { setActiveInput(null); setAnchorRect(null) }}
            onNavigate={navigate}
            isMargin={activeInput.startsWith('margin')}
            anchorRect={anchorRect}
            containerRect={containerRect}
          />
        )}
      </div>
    </div>
  )
}
