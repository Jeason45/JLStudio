'use client'
import { useState, useMemo, useCallback } from 'react'
import { Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SegmentedControl } from './SegmentedControl'
import { FieldColor } from './FieldColor'

// ─── Types ───

type GradientType = 'linear' | 'radial' | 'conic'

interface GradientStop {
  color: string
  position: number // 0-100
}

interface ParsedGradient {
  type: GradientType
  angle: number // linear: degrees, conic: start angle
  shape: 'circle' | 'ellipse' // radial
  positionKeyword: string // radial/conic position
  stops: GradientStop[]
}

// ─── Constants ───

const TYPE_OPTIONS = [
  { value: 'linear', label: 'Linear' },
  { value: 'radial', label: 'Radial' },
  { value: 'conic', label: 'Conic' },
] as const

const DIRECTION_PRESETS = [
  { angle: 0, label: '↑' },
  { angle: 45, label: '↗' },
  { angle: 90, label: '→' },
  { angle: 135, label: '↘' },
  { angle: 180, label: '↓' },
  { angle: 225, label: '↙' },
  { angle: 270, label: '←' },
  { angle: 315, label: '↖' },
]

const SHAPE_OPTIONS = [
  { value: 'circle', label: 'Circle' },
  { value: 'ellipse', label: 'Ellipse' },
] as const

const POSITION_OPTIONS = [
  'center', 'top', 'bottom', 'left', 'right',
  'top left', 'top right', 'bottom left', 'bottom right',
]

const INPUT = 'w-full h-6 bg-zinc-800 border border-zinc-700 text-white text-[10px] rounded px-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue'

// ─── Parse / Serialize ───

const DEFAULT_GRADIENT: ParsedGradient = {
  type: 'linear',
  angle: 135,
  shape: 'circle',
  positionKeyword: 'center',
  stops: [
    { color: '#6366f1', position: 0 },
    { color: '#8b5cf6', position: 100 },
  ],
}

function parseGradient(raw: string): ParsedGradient | null {
  if (!raw?.trim()) return null
  const trimmed = raw.trim()

  let type: GradientType = 'linear'
  if (trimmed.startsWith('radial-gradient')) type = 'radial'
  else if (trimmed.startsWith('conic-gradient')) type = 'conic'
  else if (trimmed.startsWith('linear-gradient')) type = 'linear'
  else return null

  // Extract content between parens
  const openIdx = trimmed.indexOf('(')
  const closeIdx = trimmed.lastIndexOf(')')
  if (openIdx === -1 || closeIdx === -1) return null
  const content = trimmed.slice(openIdx + 1, closeIdx).trim()

  // Split on commas not inside parens
  const parts: string[] = []
  let depth = 0
  let current = ''
  for (const char of content) {
    if (char === '(') depth++
    else if (char === ')') depth--
    if (char === ',' && depth === 0) {
      parts.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  if (current.trim()) parts.push(current.trim())

  let angle = 180
  let shape: 'circle' | 'ellipse' = 'circle'
  let positionKeyword = 'center'
  let stopsStart = 0

  if (type === 'linear') {
    const first = parts[0]
    const degMatch = first?.match(/^(\d+(?:\.\d+)?)deg$/)
    if (degMatch) {
      angle = parseFloat(degMatch[1])
      stopsStart = 1
    } else if (first?.startsWith('to ')) {
      const dir = first.replace('to ', '')
      const dirMap: Record<string, number> = {
        'top': 0, 'top right': 45, 'right': 90, 'bottom right': 135,
        'bottom': 180, 'bottom left': 225, 'left': 270, 'top left': 315,
      }
      angle = dirMap[dir] ?? 180
      stopsStart = 1
    }
  } else if (type === 'radial') {
    const first = parts[0]
    if (first && !first.match(/^(#|rgb|hsl|[a-z]+\s)/i)) {
      if (first.includes('circle')) shape = 'circle'
      else if (first.includes('ellipse')) shape = 'ellipse'
      const atMatch = first.match(/at\s+(.+)/)
      if (atMatch) positionKeyword = atMatch[1].trim()
      stopsStart = 1
    }
  } else if (type === 'conic') {
    const first = parts[0]
    if (first && !first.match(/^(#|rgb|hsl)/i)) {
      const fromMatch = first.match(/from\s+(\d+(?:\.\d+)?)deg/)
      if (fromMatch) angle = parseFloat(fromMatch[1])
      const atMatch = first.match(/at\s+(.+)/)
      if (atMatch) positionKeyword = atMatch[1].trim()
      stopsStart = 1
    }
  }

  const stops: GradientStop[] = []
  for (let i = stopsStart; i < parts.length; i++) {
    const part = parts[i].trim()
    const posMatch = part.match(/(\d+(?:\.\d+)?)%\s*$/)
    const position = posMatch ? parseFloat(posMatch[1]) : (i - stopsStart) / Math.max(parts.length - stopsStart - 1, 1) * 100
    const color = posMatch ? part.slice(0, part.lastIndexOf(posMatch[1]) - 0).trim().replace(/\s+\d+(\.\d+)?$/, '') : part
    // Clean up color — remove trailing percentage artifacts
    const cleanColor = color.replace(/\s+$/, '')
    stops.push({ color: cleanColor || '#000000', position: Math.round(position) })
  }

  if (stops.length === 0) {
    stops.push({ color: '#6366f1', position: 0 }, { color: '#8b5cf6', position: 100 })
  }

  return { type, angle, shape, positionKeyword, stops }
}

function serializeGradient(g: ParsedGradient): string {
  const stopsStr = g.stops.map(s => `${s.color} ${s.position}%`).join(', ')

  switch (g.type) {
    case 'linear':
      return `linear-gradient(${g.angle}deg, ${stopsStr})`
    case 'radial':
      return `radial-gradient(${g.shape} at ${g.positionKeyword}, ${stopsStr})`
    case 'conic':
      return `conic-gradient(from ${g.angle}deg at ${g.positionKeyword}, ${stopsStr})`
  }
}

// ─── Component ───

interface GradientEditorProps {
  value: string
  onChange: (value: string) => void
}

export function GradientEditor({ value, onChange }: GradientEditorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const gradient = useMemo(() => parseGradient(value), [value])

  const update = useCallback((patch: Partial<ParsedGradient>) => {
    const current = gradient ?? { ...DEFAULT_GRADIENT }
    const next = { ...current, ...patch }
    onChange(serializeGradient(next))
  }, [gradient, onChange])

  const updateStop = useCallback((idx: number, patch: Partial<GradientStop>) => {
    const current = gradient ?? { ...DEFAULT_GRADIENT }
    const stops = [...current.stops]
    stops[idx] = { ...stops[idx], ...patch }
    onChange(serializeGradient({ ...current, stops }))
  }, [gradient, onChange])

  const addStop = useCallback(() => {
    const current = gradient ?? { ...DEFAULT_GRADIENT }
    const stops = [...current.stops]
    // Add at midpoint
    const lastPos = stops[stops.length - 1]?.position ?? 100
    const prevPos = stops[stops.length - 2]?.position ?? 0
    const newPos = Math.round((prevPos + lastPos) / 2)
    stops.push({ color: '#a78bfa', position: newPos })
    stops.sort((a, b) => a.position - b.position)
    onChange(serializeGradient({ ...current, stops }))
  }, [gradient, onChange])

  const removeStop = useCallback((idx: number) => {
    const current = gradient ?? { ...DEFAULT_GRADIENT }
    if (current.stops.length <= 2) return
    const stops = current.stops.filter((_, i) => i !== idx)
    onChange(serializeGradient({ ...current, stops }))
  }, [gradient, onChange])

  const g = gradient ?? DEFAULT_GRADIENT
  const hasValue = !!value?.trim()

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-zinc-500">Gradient</span>
        {!hasValue && (
          <button
            onClick={() => { onChange(serializeGradient(DEFAULT_GRADIENT)); setIsOpen(true) }}
            className="p-0.5 text-zinc-600 hover:text-white transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        )}
        {hasValue && (
          <button
            onClick={() => onChange('')}
            className="p-0.5 text-zinc-600 hover:text-red-400 transition-colors"
            title="Remove gradient"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Preview bar */}
      {hasValue && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-6 rounded border border-zinc-700 mt-1 cursor-pointer hover:border-zinc-500 transition-colors"
          style={{ background: value }}
        />
      )}

      {hasValue && isOpen && (
        <div className="mt-1.5 space-y-2 p-2 border border-zinc-700/50 rounded bg-zinc-800/30">
          {/* Type selector */}
          <SegmentedControl
            options={TYPE_OPTIONS}
            value={g.type}
            onChange={v => update({ type: v as GradientType })}
            small
          />

          {/* Linear: angle + direction presets */}
          {g.type === 'linear' && (
            <>
              <div className="grid grid-cols-8 gap-0.5">
                {DIRECTION_PRESETS.map(d => (
                  <button
                    key={d.angle}
                    onClick={() => update({ angle: d.angle })}
                    className={cn(
                      'h-6 text-[10px] rounded transition-colors',
                      g.angle === d.angle
                        ? 'bg-wf-blue text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    )}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-[9px] text-zinc-600">Angle</label>
                <input
                  type="number"
                  min={0}
                  max={360}
                  value={g.angle}
                  onChange={e => update({ angle: Number(e.target.value) })}
                  className={INPUT}
                />
              </div>
            </>
          )}

          {/* Radial: shape + position */}
          {g.type === 'radial' && (
            <>
              <SegmentedControl
                options={SHAPE_OPTIONS}
                value={g.shape}
                onChange={v => update({ shape: v as 'circle' | 'ellipse' })}
                small
              />
              <div>
                <label className="text-[9px] text-zinc-600">Position</label>
                <select
                  value={g.positionKeyword}
                  onChange={e => update({ positionKeyword: e.target.value })}
                  className={INPUT + ' cursor-pointer'}
                >
                  {POSITION_OPTIONS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Conic: start angle + position */}
          {g.type === 'conic' && (
            <>
              <div>
                <label className="text-[9px] text-zinc-600">Start angle</label>
                <input
                  type="number"
                  min={0}
                  max={360}
                  value={g.angle}
                  onChange={e => update({ angle: Number(e.target.value) })}
                  className={INPUT}
                />
              </div>
              <div>
                <label className="text-[9px] text-zinc-600">Position</label>
                <select
                  value={g.positionKeyword}
                  onChange={e => update({ positionKeyword: e.target.value })}
                  className={INPUT + ' cursor-pointer'}
                >
                  {POSITION_OPTIONS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Color stops */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-zinc-600">Color stops</span>
              <button onClick={addStop} className="p-0.5 text-zinc-600 hover:text-white transition-colors">
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1 mt-1">
              {g.stops.map((stop, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="shrink-0">
                    <FieldColor label="" value={stop.color} onChange={v => updateStop(i, { color: v || '#000000' })} />
                  </div>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={stop.position}
                    onChange={e => updateStop(i, { position: Number(e.target.value) })}
                    className={cn(INPUT, 'w-14 shrink-0')}
                  />
                  <span className="text-[9px] text-zinc-600 shrink-0">%</span>
                  {g.stops.length > 2 && (
                    <button
                      onClick={() => removeStop(i)}
                      className="p-0.5 text-zinc-600 hover:text-red-400 shrink-0"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
