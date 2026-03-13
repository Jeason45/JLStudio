'use client'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { SectionBorderRadius } from '@/types/site'

const OPTIONS: { value: SectionBorderRadius; label: string }[] = [
  { value: 'none', label: '0' },
  { value: 'sm', label: 'S' },
  { value: 'md', label: 'M' },
  { value: 'lg', label: 'L' },
  { value: 'xl', label: 'XL' },
  { value: 'full', label: '\u25EF' },
]

interface FieldBorderRadiusProps {
  sectionId?: string
  label: string
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export function FieldBorderRadius({ sectionId, label, className, value: controlledValue, onChange }: FieldBorderRadiusProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const isControlled = controlledValue !== undefined || onChange !== undefined

  const section = !isControlled ? siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId) : undefined
  const value = (isControlled ? (controlledValue ?? 'none') : (section?.style.borderRadius ?? 'none')) as SectionBorderRadius

  const handleChange = (v: SectionBorderRadius) => {
    if (isControlled) {
      onChange?.(v)
      return
    }
    if (!section) return
    updateSection(sectionId!, { style: { ...section.style, borderRadius: v } })
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
