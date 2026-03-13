'use client'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { SectionLetterSpacing } from '@/types/site'

const OPTIONS: { value: SectionLetterSpacing; label: string }[] = [
  { value: 'tight', label: 'Serre' },
  { value: 'normal', label: 'Normal' },
  { value: 'wide', label: 'Large' },
  { value: 'wider', label: 'Tres large' },
]

interface FieldLetterSpacingProps {
  sectionId?: string
  label: string
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export function FieldLetterSpacing({ sectionId, label, className, value: controlledValue, onChange }: FieldLetterSpacingProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const isControlled = controlledValue !== undefined || onChange !== undefined

  const section = !isControlled ? siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId) : undefined
  const value = (isControlled ? (controlledValue ?? 'normal') : (section?.style.letterSpacing ?? 'normal')) as SectionLetterSpacing

  const handleChange = (v: SectionLetterSpacing) => {
    if (isControlled) {
      onChange?.(v)
      return
    }
    if (!section) return
    updateSection(sectionId!, { style: { ...section.style, letterSpacing: v } })
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label className="text-xs text-zinc-400">{label}</Label>
      <select
        value={value}
        onChange={e => handleChange(e.target.value as SectionLetterSpacing)}
        className="w-full h-8 bg-zinc-800 border border-zinc-700 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
      >
        {OPTIONS.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
