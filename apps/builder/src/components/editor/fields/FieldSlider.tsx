'use client'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { SectionStyle } from '@/types/site'

interface FieldSliderProps {
  sectionId?: string
  label: string
  stylePath?: keyof SectionStyle
  min?: number
  max?: number
  step?: number
  unit?: string
  className?: string
  value?: number
  onChange?: (value: number) => void
}

export function FieldSlider({
  sectionId, label, stylePath, min = 0, max = 100, step = 1, unit = '%', className,
  value: controlledValue, onChange,
}: FieldSliderProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const isControlled = controlledValue !== undefined || onChange !== undefined

  const section = !isControlled ? siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId) : undefined
  const value = isControlled ? (controlledValue ?? max) : ((section?.style[stylePath!] as number) ?? max)

  const handleChange = (v: number) => {
    if (isControlled) {
      onChange?.(v)
      return
    }
    if (!section) return
    updateSection(sectionId!, { style: { ...section.style, [stylePath!]: v } })
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-center justify-between">
        <Label className="text-xs text-zinc-400">{label}</Label>
        <span className="text-xs text-zinc-500">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => handleChange(Number(e.target.value))}
        className="w-full h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-wf-blue [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-zinc-900"
      />
    </div>
  )
}
