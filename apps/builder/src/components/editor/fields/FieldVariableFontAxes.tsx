'use client'
import { useMemo } from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { FontAxisDef } from '@/lib/fonts'

interface FieldVariableFontAxesProps {
  axes: FontAxisDef[]
  /** Current font-variation-settings string, e.g. "'wght' 450" */
  value?: string
  /** Also receives the raw weight number for the wght axis (for fontWeight sync) */
  onChange: (variationSettings: string, weightValue?: number) => void
  className?: string
}

/** Parse font-variation-settings string into a map: tag → value */
function parseVariationSettings(str?: string): Record<string, number> {
  if (!str) return {}
  const map: Record<string, number> = {}
  const parts = str.split(',')
  for (const part of parts) {
    const match = part.trim().match(/['"](\w+)['"]\s+([\d.]+)/)
    if (match) {
      map[match[1]] = parseFloat(match[2])
    }
  }
  return map
}

/** Build font-variation-settings string from a map */
function buildVariationSettings(map: Record<string, number>): string {
  return Object.entries(map)
    .map(([tag, val]) => `'${tag}' ${val}`)
    .join(', ')
}

export function FieldVariableFontAxes({ axes, value, onChange, className }: FieldVariableFontAxesProps) {
  const currentValues = useMemo(() => parseVariationSettings(value), [value])

  const handleAxisChange = (tag: string, val: number) => {
    const updated = { ...currentValues, [tag]: val }
    // Fill defaults for missing axes
    for (const axis of axes) {
      if (!(axis.tag in updated)) {
        updated[axis.tag] = axis.default
      }
    }
    const settings = buildVariationSettings(updated)
    const weightValue = tag === 'wght' ? val : updated['wght']
    onChange(settings, weightValue)
  }

  return (
    <div className={cn('space-y-2', className)}>
      {axes.map(axis => {
        const val = currentValues[axis.tag] ?? axis.default
        return (
          <div key={axis.tag} className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-zinc-400">{axis.name}</Label>
              <span className="text-[10px] text-zinc-500 tabular-nums">{Math.round(val)}</span>
            </div>
            <input
              type="range"
              min={axis.min}
              max={axis.max}
              step={1}
              value={val}
              onChange={e => handleAxisChange(axis.tag, Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-wf-blue [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-zinc-900"
            />
            <div className="flex justify-between text-[9px] text-zinc-600">
              <span>{axis.min}</span>
              <span>{axis.max}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
