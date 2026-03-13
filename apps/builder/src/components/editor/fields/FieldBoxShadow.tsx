'use client'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { SectionBoxShadow } from '@/types/site'

const OPTIONS: { value: SectionBoxShadow; label: string }[] = [
  { value: 'none', label: 'Aucune' },
  { value: 'sm', label: 'Legere' },
  { value: 'md', label: 'Moyenne' },
  { value: 'lg', label: 'Forte' },
  { value: 'xl', label: 'Tres forte' },
]

interface FieldBoxShadowProps {
  sectionId?: string
  label: string
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export function FieldBoxShadow({ sectionId, label, className, value: controlledValue, onChange }: FieldBoxShadowProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const isControlled = controlledValue !== undefined || onChange !== undefined

  const section = !isControlled ? siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId) : undefined
  const value = (isControlled ? (controlledValue ?? 'none') : (section?.style.boxShadow ?? 'none')) as SectionBoxShadow

  const handleChange = (v: SectionBoxShadow) => {
    if (isControlled) {
      onChange?.(v)
      return
    }
    if (!section) return
    updateSection(sectionId!, { style: { ...section.style, boxShadow: v } })
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label className="text-xs text-zinc-400">{label}</Label>
      <select
        value={value}
        onChange={e => handleChange(e.target.value as SectionBoxShadow)}
        className="w-full h-8 bg-zinc-800 border border-zinc-700 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
      >
        {OPTIONS.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
