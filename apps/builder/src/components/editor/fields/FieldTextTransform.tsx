'use client'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { SectionTextTransform } from '@/types/site'

const OPTIONS: { value: SectionTextTransform; label: string }[] = [
  { value: 'none', label: 'Aa' },
  { value: 'uppercase', label: 'AA' },
  { value: 'lowercase', label: 'aa' },
  { value: 'capitalize', label: 'Ab' },
]

interface FieldTextTransformProps {
  sectionId?: string
  label: string
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export function FieldTextTransform({ sectionId, label, className, value: controlledValue, onChange }: FieldTextTransformProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const isControlled = controlledValue !== undefined || onChange !== undefined

  const section = !isControlled ? siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId) : undefined
  const value = (isControlled ? (controlledValue ?? 'none') : (section?.style.textTransform ?? 'none')) as SectionTextTransform

  const handleChange = (v: SectionTextTransform) => {
    if (isControlled) {
      onChange?.(v)
      return
    }
    if (!section) return
    updateSection(sectionId!, { style: { ...section.style, textTransform: v } })
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label className="text-xs text-zinc-400">{label}</Label>
      <div className="flex rounded-md border border-zinc-700 overflow-hidden">
        {OPTIONS.map(({ value: v, label: l }) => (
          <button
            key={v}
            onClick={() => handleChange(v)}
            className={cn(
              'flex-1 flex items-center justify-center h-8 text-xs font-medium transition-colors',
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
