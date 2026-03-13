'use client'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const WEIGHT_OPTIONS: { value: number; label: string }[] = [
  { value: 300, label: 'Light' },
  { value: 400, label: 'Regular' },
  { value: 500, label: 'Medium' },
  { value: 600, label: 'Semi' },
  { value: 700, label: 'Bold' },
]

interface FieldFontWeightProps {
  sectionId?: string
  label: string
  className?: string
  value?: number
  onChange?: (value: number | undefined) => void
}

export function FieldFontWeight({ sectionId, label, className, value: controlledValue, onChange }: FieldFontWeightProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const isControlled = controlledValue !== undefined || onChange !== undefined

  const section = !isControlled ? siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId) : undefined
  const value = isControlled ? controlledValue : section?.style.fontWeight

  const handleChange = (w: number) => {
    if (isControlled) {
      onChange?.(value === w ? undefined : w)
      return
    }
    if (!section) return
    updateSection(sectionId!, { style: { ...section.style, fontWeight: value === w ? undefined : w } })
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label className="text-xs text-zinc-400">{label}</Label>
      <div className="flex rounded-md border border-zinc-700 overflow-hidden">
        {WEIGHT_OPTIONS.map(({ value: v, label: l }) => (
          <button
            key={v}
            onClick={() => handleChange(v)}
            className={cn(
              'flex-1 flex items-center justify-center h-8 text-[10px] font-medium transition-colors',
              value === v ? 'bg-wf-blue text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
            )}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  )
}
