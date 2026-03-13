'use client'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { SectionTitleSize } from '@/types/site'

interface FieldTitleSizeProps {
  sectionId: string
  label: string
  className?: string
}

const SIZE_OPTIONS: { value: SectionTitleSize; label: string }[] = [
  { value: 'sm', label: 'S' },
  { value: 'md', label: 'M' },
  { value: 'lg', label: 'L' },
  { value: 'xl', label: 'XL' },
]

export function FieldTitleSize({ sectionId, label, className }: FieldTitleSizeProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const value = section?.style.titleSize ?? 'lg'

  const handleChange = (newValue: SectionTitleSize) => {
    if (!section) return
    updateSection(sectionId, { style: { ...section.style, titleSize: newValue } })
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label className="text-xs text-zinc-400">{label}</Label>
      <div className="flex rounded-md border border-zinc-700 overflow-hidden">
        {SIZE_OPTIONS.map(({ value: v, label: l }) => (
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
