'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { AnimationConfig } from '@/types/interactions'

/**
 * ActionConfigPanel — Webflow-style action configuration.
 * Shows direction tabs, offset slider, delay slider, preview button.
 * Displayed inline under ActionSelector when an action is selected.
 */

/* ─── Direction options per action type ─── */
const DIRECTION_OPTIONS: Record<string, { value: string; label: string }[]> = {
  fade: [{ value: 'in', label: 'Fade in' }, { value: 'out', label: 'Fade out' }],
  slide: [
    { value: 'top', label: 'Top' }, { value: 'bottom', label: 'Bottom' },
    { value: 'left', label: 'Left' }, { value: 'right', label: 'Right' },
  ],
  flip: [
    { value: 'top', label: 'Top' }, { value: 'bottom', label: 'Bottom' },
    { value: 'left', label: 'Left' }, { value: 'right', label: 'Right' },
  ],
  grow: [{ value: 'in', label: 'Grow' }, { value: 'out', label: 'Shrink' }],
  'grow-big': [{ value: 'in', label: 'Grow big' }, { value: 'out', label: 'Shrink big' }],
  shrink: [{ value: 'in', label: 'Shrink' }, { value: 'out', label: 'Grow' }],
  'shrink-big': [{ value: 'in', label: 'Shrink big' }, { value: 'out', label: 'Grow big' }],
  spin: [{ value: 'cw', label: 'Clockwise' }, { value: 'ccw', label: 'Counter-CW' }],
  fly: [{ value: 'in', label: 'Fly in' }, { value: 'out', label: 'Fly out' }],
  drop: [{ value: 'in', label: 'Drop in' }, { value: 'out', label: 'Drop out' }],
}

interface ActionConfigPanelProps {
  actionType: string
  animation: AnimationConfig
  onUpdate: (field: string, value: unknown) => void
  onPreview?: () => void
}

export function ActionConfigPanel({ actionType, animation, onUpdate, onPreview }: ActionConfigPanelProps) {
  const directions = DIRECTION_OPTIONS[actionType]
  const [currentDirection, setCurrentDirection] = useState(animation.direction ?? directions?.[0]?.value ?? 'in')

  const handleDirectionChange = (dir: string) => {
    setCurrentDirection(dir)
    onUpdate('direction', dir)

    // Apply direction-specific from/to
    if (actionType === 'fade') {
      if (dir === 'in') {
        onUpdate('from', { opacity: 0 })
        onUpdate('to', { opacity: 1 })
      } else {
        onUpdate('from', { opacity: 1 })
        onUpdate('to', { opacity: 0 })
      }
    } else if (actionType === 'slide') {
      const map: Record<string, { from: Record<string, number>; to: Record<string, number> }> = {
        top: { from: { opacity: 0, y: -40 }, to: { opacity: 1, y: 0 } },
        bottom: { from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 } },
        left: { from: { opacity: 0, x: -40 }, to: { opacity: 1, x: 0 } },
        right: { from: { opacity: 0, x: 40 }, to: { opacity: 1, x: 0 } },
      }
      if (map[dir]) {
        onUpdate('from', map[dir].from)
        onUpdate('to', map[dir].to)
      }
    }
  }

  return (
    <div className="space-y-2 mt-2">
      {/* Direction */}
      {directions && directions.length > 0 && (
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-[#999] w-16 shrink-0">Direction</span>
          <div className="flex flex-1">
            {directions.map((d, i) => (
              <button key={d.value}
                onClick={() => handleDirectionChange(d.value)}
                className={cn(
                  'flex-1 h-7 text-[11px] border transition-colors',
                  i === 0 && 'rounded-l',
                  i === directions.length - 1 && 'rounded-r',
                  i > 0 && 'border-l-0',
                  currentDirection === d.value
                    ? 'bg-[#111] border-[#555] text-white'
                    : 'bg-[#2a2a2a] border-[#333] text-[#888]'
                )}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Offset */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] text-[#999] w-16 shrink-0">Offset</span>
        <input type="range" min={0} max={100} step={1} defaultValue={0}
          className="flex-1 h-1 accent-white cursor-pointer" />
        <input defaultValue={0}
          className="w-10 h-6 bg-[#111] border border-[#333] text-[#e0e0e0] text-[11px] text-center rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
        <span className="text-[10px] text-[#666] w-4 text-right">%</span>
      </div>

      {/* Delay */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] text-[#999] w-16 shrink-0">Delay</span>
        <input type="range" min={0} max={5000} step={10}
          value={animation.delay ?? 0}
          onChange={e => onUpdate('delay', Number(e.target.value))}
          className="flex-1 h-1 accent-white cursor-pointer" />
        <input value={animation.delay ?? 0}
          onChange={e => onUpdate('delay', Number(e.target.value))}
          className="w-10 h-6 bg-[#111] border border-[#333] text-[#e0e0e0] text-[11px] text-center rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
        <span className="text-[10px] text-[#666] w-6 text-right">MS</span>
      </div>

      {/* Preview */}
      <button onClick={onPreview}
        className="w-full h-7 bg-[#2a2a2a] border border-[#444] rounded text-[11px] text-[#ccc] hover:bg-[#333] hover:text-white transition-colors">
        Preview
      </button>
    </div>
  )
}
