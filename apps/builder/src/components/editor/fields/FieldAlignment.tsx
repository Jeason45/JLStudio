'use client'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SectionTextAlign } from '@/types/site'

interface FieldAlignmentProps {
  sectionId?: string
  label: string
  className?: string
  value?: string
  onChange?: (value: string) => void
}

const ALIGN_OPTIONS: { value: SectionTextAlign; icon: typeof AlignLeft }[] = [
  { value: 'left', icon: AlignLeft },
  { value: 'center', icon: AlignCenter },
  { value: 'right', icon: AlignRight },
  { value: 'justify', icon: AlignJustify },
]

export function FieldAlignment({ sectionId, label, className, value: controlledValue, onChange }: FieldAlignmentProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const isControlled = controlledValue !== undefined || onChange !== undefined

  const section = !isControlled ? siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId) : undefined
  const value = (isControlled ? (controlledValue ?? '') : (section?.style.textAlign ?? '')) as SectionTextAlign

  const handleChange = (newValue: SectionTextAlign) => {
    if (isControlled) {
      onChange?.(newValue)
      return
    }
    if (!section) return
    updateSection(sectionId!, { style: { ...section.style, textAlign: newValue } })
  }

  // If label is empty, render just the buttons (for use inside WfRow)
  if (!label) {
    return (
      <div className="flex items-center gap-0">
        {ALIGN_OPTIONS.map(({ value: v, icon: Icon }) => (
          <button
            key={v}
            onClick={() => handleChange(v)}
            className={cn(
              'flex-1 flex items-center justify-center h-6 border border-[#4a4a4a] -ml-px first:ml-0 first:rounded-l last:rounded-r transition-colors',
              value === v ? 'bg-[#111] text-white border-[#555]' : 'bg-[#383838] text-[#999] hover:text-white'
            )}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label className="text-xs text-zinc-400">{label}</Label>
      <div className="flex rounded-md border border-zinc-700 overflow-hidden">
        {ALIGN_OPTIONS.map(({ value: v, icon: Icon }) => (
          <button
            key={v}
            onClick={() => handleChange(v)}
            className={cn(
              'flex-1 flex items-center justify-center h-8 transition-colors',
              value === v ? 'bg-wf-blue text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
            )}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>
    </div>
  )
}
