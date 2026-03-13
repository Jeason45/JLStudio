'use client'
import { useState, useCallback, useRef, useEffect } from 'react'
import { EASING_GROUPS, getEasingDef } from '@/data/easingPresets'
import type { EasingPresetName } from '@/types/interactions'

interface CubicBezierEditorProps {
  value: string // cubic-bezier(...) string or preset name
  onChange: (cssValue: string) => void
}

const SVG_SIZE = 160
const PAD = 16
const GRAPH_SIZE = SVG_SIZE - PAD * 2

function parseCubicBezier(val: string): [number, number, number, number] {
  const match = val.match(/cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/)
  if (match) {
    return [parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]), parseFloat(match[4])]
  }
  // Try to resolve preset name
  const preset = getEasingDef(val as EasingPresetName)
  if (preset?.points) return preset.points
  return [0.25, 0.1, 0.25, 1] // default ease
}

function formatCubicBezier(points: [number, number, number, number]): string {
  return `cubic-bezier(${points.map(p => Math.round(p * 1000) / 1000).join(', ')})`
}

/** Convert graph coordinates to SVG coordinates */
function toSvg(x: number, y: number): { sx: number; sy: number } {
  return {
    sx: PAD + x * GRAPH_SIZE,
    sy: PAD + (1 - y) * GRAPH_SIZE, // flip Y
  }
}

/** Convert SVG coordinates to graph coordinates */
function fromSvg(sx: number, sy: number): { x: number; y: number } {
  return {
    x: Math.max(0, Math.min(1, (sx - PAD) / GRAPH_SIZE)),
    y: Math.max(-1, Math.min(2, 1 - (sy - PAD) / GRAPH_SIZE)),
  }
}

/** Generate bezier curve path for the SVG */
function bezierPath(points: [number, number, number, number]): string {
  const [x1, y1, x2, y2] = points
  const start = toSvg(0, 0)
  const cp1 = toSvg(x1, y1)
  const cp2 = toSvg(x2, y2)
  const end = toSvg(1, 1)
  return `M ${start.sx} ${start.sy} C ${cp1.sx} ${cp1.sy}, ${cp2.sx} ${cp2.sy}, ${end.sx} ${end.sy}`
}

export function CubicBezierEditor({ value, onChange }: CubicBezierEditorProps) {
  const [points, setPoints] = useState<[number, number, number, number]>(() => parseCubicBezier(value))
  const [dragging, setDragging] = useState<1 | 2 | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<Animation | null>(null)

  // Sync when external value changes
  useEffect(() => {
    setPoints(parseCubicBezier(value))
  }, [value])

  // Preview animation
  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    animRef.current?.cancel()
    const anim = el.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(100px)' }],
      { duration: 1500, iterations: Infinity, direction: 'alternate', easing: formatCubicBezier(points) }
    )
    animRef.current = anim
    return () => anim.cancel()
  }, [points])

  const emit = useCallback((newPoints: [number, number, number, number]) => {
    setPoints(newPoints)
    onChange(formatCubicBezier(newPoints))
  }, [onChange])

  const handlePointerDown = useCallback((cp: 1 | 2) => (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    ;(e.target as SVGElement).setPointerCapture(e.pointerId)
    setDragging(cp)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging || !svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const sx = e.clientX - rect.left
    const sy = e.clientY - rect.top
    const { x, y } = fromSvg(sx, sy)
    const newPoints: [number, number, number, number] = [...points]
    if (dragging === 1) {
      newPoints[0] = x
      newPoints[1] = y
    } else {
      newPoints[2] = x
      newPoints[3] = y
    }
    emit(newPoints)
  }, [dragging, points, emit])

  const handlePointerUp = useCallback(() => {
    setDragging(null)
  }, [])

  const handleInputChange = (idx: number, val: string) => {
    const n = parseFloat(val)
    if (isNaN(n)) return
    const newPoints: [number, number, number, number] = [...points]
    newPoints[idx] = Math.round(n * 1000) / 1000
    emit(newPoints)
  }

  const handlePresetSelect = (name: EasingPresetName) => {
    const def = getEasingDef(name)
    if (def.points) {
      emit(def.points)
    }
  }

  const [x1, y1, x2, y2] = points
  const cp1 = toSvg(x1, y1)
  const cp2 = toSvg(x2, y2)
  const start = toSvg(0, 0)
  const end = toSvg(1, 1)

  return (
    <div className="space-y-2">
      {/* SVG Curve Editor */}
      <svg
        ref={svgRef}
        width={SVG_SIZE}
        height={SVG_SIZE}
        className="bg-zinc-900 rounded border border-zinc-700 cursor-crosshair select-none"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map(t => {
          const { sx, sy } = toSvg(t, t)
          return (
            <g key={t}>
              <line x1={PAD} y1={sy} x2={PAD + GRAPH_SIZE} y2={sy} stroke="#27272a" strokeWidth="0.5" />
              <line x1={sx} y1={PAD} x2={sx} y2={PAD + GRAPH_SIZE} stroke="#27272a" strokeWidth="0.5" />
            </g>
          )
        })}

        {/* Border */}
        <rect x={PAD} y={PAD} width={GRAPH_SIZE} height={GRAPH_SIZE} fill="none" stroke="#3f3f46" strokeWidth="0.5" />

        {/* Linear reference */}
        <line x1={start.sx} y1={start.sy} x2={end.sx} y2={end.sy} stroke="#3f3f46" strokeWidth="1" strokeDasharray="4 4" />

        {/* Tangent lines */}
        <line x1={start.sx} y1={start.sy} x2={cp1.sx} y2={cp1.sy} stroke="#6366f1" strokeWidth="1" opacity="0.5" />
        <line x1={end.sx} y1={end.sy} x2={cp2.sx} y2={cp2.sy} stroke="#6366f1" strokeWidth="1" opacity="0.5" />

        {/* Bezier curve */}
        <path d={bezierPath(points)} fill="none" stroke="#6366f1" strokeWidth="2" />

        {/* Control point 1 */}
        <circle
          cx={cp1.sx}
          cy={cp1.sy}
          r={5}
          fill={dragging === 1 ? '#818cf8' : '#6366f1'}
          stroke="#c7d2fe"
          strokeWidth="1.5"
          className="cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown(1)}
        />

        {/* Control point 2 */}
        <circle
          cx={cp2.sx}
          cy={cp2.sy}
          r={5}
          fill={dragging === 2 ? '#818cf8' : '#6366f1'}
          stroke="#c7d2fe"
          strokeWidth="1.5"
          className="cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown(2)}
        />
      </svg>

      {/* Numeric inputs */}
      <div className="grid grid-cols-4 gap-1">
        {(['x1', 'y1', 'x2', 'y2'] as const).map((label, idx) => (
          <div key={label}>
            <label className="text-[9px] text-zinc-600 block">{label}</label>
            <input
              type="number"
              step="0.01"
              min={idx % 2 === 0 ? 0 : -1}
              max={idx % 2 === 0 ? 1 : 2}
              value={Math.round(points[idx] * 1000) / 1000}
              onChange={e => handleInputChange(idx, e.target.value)}
              className="w-full h-6 bg-zinc-800 border border-zinc-700 text-white text-[10px] rounded px-1 focus:outline-none focus:ring-1 focus:ring-wf-blue text-center"
            />
          </div>
        ))}
      </div>

      {/* Preview animation */}
      <div className="relative h-6 bg-zinc-800 rounded border border-zinc-700 overflow-hidden">
        <div
          ref={previewRef}
          className="absolute top-1 left-1 w-4 h-4 rounded-sm bg-wf-blue"
        />
      </div>

      {/* Preset quick select */}
      <div className="max-h-32 overflow-y-auto space-y-1">
        {EASING_GROUPS.filter(g => g.label !== 'Custom').map(group => (
          <div key={group.label}>
            <p className="text-[9px] text-zinc-600 font-medium">{group.label}</p>
            <div className="flex flex-wrap gap-0.5">
              {group.presets.map(name => {
                const def = getEasingDef(name)
                if (!def.points) return null
                return (
                  <button
                    key={name}
                    onClick={() => handlePresetSelect(name)}
                    className="px-1.5 py-0.5 text-[9px] text-zinc-400 hover:text-white hover:bg-zinc-700 rounded transition-colors"
                    title={formatCubicBezier(def.points)}
                  >
                    {def.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Current value display */}
      <p className="text-[9px] text-zinc-600 font-mono truncate">{formatCubicBezier(points)}</p>
    </div>
  )
}
