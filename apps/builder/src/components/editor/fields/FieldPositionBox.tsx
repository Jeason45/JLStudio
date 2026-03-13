'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type PositionKey = 'top' | 'right' | 'bottom' | 'left'

interface FieldPositionBoxProps {
  values: { top?: string; right?: string; bottom?: string; left?: string }
  onChange: (key: PositionKey, value: string) => void
}

const PRESETS = [0, 5, 10, 15, 25, 50, 75, 100]
const UNITS = ['px', '%', 'em', 'rem', 'vw', 'vh'] as const
const ALL_KEYS: PositionKey[] = ['top', 'right', 'bottom', 'left']
const SIDE_LABEL: Record<PositionKey, string> = { top: 'TOP', right: 'RIGHT', bottom: 'BOTTOM', left: 'LEFT' }

function parseValue(v?: string): { num: number; unit: string; isAuto: boolean } {
  if (!v || v === 'auto') return { num: 0, unit: 'px', isAuto: !v || v === 'auto' }
  const match = v.match(/^(-?\d*\.?\d+)\s*([a-z%]*)$/i)
  if (!match) return { num: 0, unit: 'px', isAuto: false }
  return { num: parseFloat(match[1]), unit: match[2] || 'px', isAuto: false }
}

// ─── Popover (same as spacing) ───
function PosPopover({ propKey, value, onChange, onClose, onNavigate, anchorRect, containerRect }: {
  propKey: PositionKey; value?: string
  onChange: (v: string) => void; onClose: () => void
  onNavigate: (dir: -1 | 1) => void
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
            if (e.key === 'ArrowDown') { e.preventDefault(); commit(numVal - 1, unit) }
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
      <input type="range" min={-100} max={220} value={numVal}
        onChange={e => commit(parseFloat(e.target.value), unit)}
        className="w-full h-[3px] accent-blue-500 cursor-pointer" />
      <div className="grid grid-cols-4 gap-1">
        <button onClick={() => { onChange('auto'); onClose() }}
          className={cn('h-[22px] text-[10px] rounded transition-colors border',
            value === 'auto' || !value ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-[#2b2b2b] text-[#888] hover:bg-[#383838] hover:text-white border-[#333]'
          )}>Auto</button>
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

// ─── Main ───
const BOX_H = 88
const INSET = 26

export function FieldPositionBox({ values, onChange }: FieldPositionBoxProps) {
  const [activeInput, setActiveInput] = useState<PositionKey | null>(null)
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)
  const [hoveredZone, setHoveredZone] = useState<PositionKey | null>(null)
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

  const openPopover = useCallback((key: PositionKey) => {
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
  const hz = (k: PositionKey) => hoveredZone === k

  const ValBtn = ({ propKey, value }: { propKey: PositionKey; value?: string }) => {
    const isAuto = !value || value === 'auto'
    const hasVal = !!value && value !== '0' && value !== '0px' && value !== 'auto'
    const display = isAuto ? 'Auto' : (value?.replace(/[a-z%]+$/i, '') || '0')
    const isActive = activeInput === propKey
    return (
      <button ref={el => { valueRefs.current[propKey] = el }} onClick={() => openPopover(propKey)}
        className={cn('text-[11px] text-center border-0 focus:outline-none transition-colors rounded-sm px-1 py-0.5 min-w-[28px]',
          isActive ? 'text-blue-400 font-semibold bg-blue-500/15' : isAuto ? 'text-[#888] bg-transparent' : hasVal ? 'text-[#ddd] bg-transparent' : 'text-[#888] bg-transparent',
          'hover:text-white cursor-pointer'
        )}>{display}</button>
    )
  }

  const W = cw
  const H = BOX_H

  return (
    <div className="w-full">
      <div ref={containerRef} className="relative" style={{ height: H }}>
        {W > 0 && (
          <svg className="absolute inset-0" width={W} height={H} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pb-t" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3a3a3a" /><stop offset="100%" stopColor="#2e2e2e" /></linearGradient>
              <linearGradient id="pb-b" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#232323" /><stop offset="100%" stopColor="#2a2a2a" /></linearGradient>
              <linearGradient id="pb-l" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#353535" /><stop offset="100%" stopColor="#2b2b2b" /></linearGradient>
              <linearGradient id="pb-r" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stopColor="#2e2e2e" /><stop offset="100%" stopColor="#292929" /></linearGradient>
              <linearGradient id="pb-t-h" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a4a4a" /><stop offset="100%" stopColor="#3e3e3e" /></linearGradient>
              <linearGradient id="pb-b-h" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#333" /><stop offset="100%" stopColor="#3a3a3a" /></linearGradient>
              <linearGradient id="pb-l-h" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#454545" /><stop offset="100%" stopColor="#3b3b3b" /></linearGradient>
              <linearGradient id="pb-r-h" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stopColor="#3e3e3e" /><stop offset="100%" stopColor="#393939" /></linearGradient>
            </defs>

            {/* Outer border */}
            <rect x={0.5} y={0.5} width={W - 1} height={H - 1} rx={4} fill="none" stroke="#333" strokeWidth={1} />

            {/* Trapezoids — top/bottom/left/right */}
            <polygon points={`1,1 ${W - 1},1 ${W - INSET},${INSET} ${INSET},${INSET}`}
              fill={hz('top') ? 'url(#pb-t-h)' : 'url(#pb-t)'} className="cursor-pointer transition-colors duration-150"
              onMouseEnter={() => setHoveredZone('top')} onMouseLeave={() => setHoveredZone(null)} onClick={() => openPopover('top')} />
            <polygon points={`${INSET},${H - INSET} ${W - INSET},${H - INSET} ${W - 1},${H - 1} 1,${H - 1}`}
              fill={hz('bottom') ? 'url(#pb-b-h)' : 'url(#pb-b)'} className="cursor-pointer transition-colors duration-150"
              onMouseEnter={() => setHoveredZone('bottom')} onMouseLeave={() => setHoveredZone(null)} onClick={() => openPopover('bottom')} />
            <polygon points={`1,1 ${INSET},${INSET} ${INSET},${H - INSET} 1,${H - 1}`}
              fill={hz('left') ? 'url(#pb-l-h)' : 'url(#pb-l)'} className="cursor-pointer transition-colors duration-150"
              onMouseEnter={() => setHoveredZone('left')} onMouseLeave={() => setHoveredZone(null)} onClick={() => openPopover('left')} />
            <polygon points={`${W - INSET},${INSET} ${W - 1},1 ${W - 1},${H - 1} ${W - INSET},${H - INSET}`}
              fill={hz('right') ? 'url(#pb-r-h)' : 'url(#pb-r)'} className="cursor-pointer transition-colors duration-150"
              onMouseEnter={() => setHoveredZone('right')} onMouseLeave={() => setHoveredZone(null)} onClick={() => openPopover('right')} />

            {/* Content center */}
            <rect x={INSET} y={INSET} width={W - INSET * 2} height={H - INSET * 2} rx={3} fill="#1e1e1e" stroke="#4a4a4a" strokeWidth={1.5} />
          </svg>
        )}

        {/* Center label */}
        <span className="absolute text-[9px] text-[#555] uppercase tracking-wide select-none pointer-events-none font-medium left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 3 }}>
          position
        </span>

        {/* Values */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 3, zIndex: 5 }}>
          <ValBtn propKey="top" value={values.top} />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 3, zIndex: 5 }}>
          <ValBtn propKey="bottom" value={values.bottom} />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center" style={{ left: 0, width: INSET, zIndex: 5 }}>
          <ValBtn propKey="left" value={values.left} />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center" style={{ right: 0, width: INSET, zIndex: 5 }}>
          <ValBtn propKey="right" value={values.right} />
        </div>

        {/* Popover */}
        {activeInput && (
          <PosPopover
            propKey={activeInput}
            value={values[activeInput]}
            onChange={v => onChange(activeInput, v)}
            onClose={() => setActiveInput(null)}
            onNavigate={navigate}
            anchorRect={anchorRect}
            containerRect={containerRect}
          />
        )}
      </div>
    </div>
  )
}
