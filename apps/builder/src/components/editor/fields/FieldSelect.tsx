'use client'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { SectionStyle } from '@/types/site'

interface SelectOption {
  value: string
  label: string
}

interface FieldSelectProps {
  sectionId: string
  label: string
  contentPath?: string
  stylePath?: keyof SectionStyle
  variantField?: boolean
  options: SelectOption[]
  className?: string
}

export function FieldSelect({
  sectionId, label, contentPath, stylePath, variantField, options, className
}: FieldSelectProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)

  let value = ''
  if (variantField) value = section?.variant ?? ''
  else if (stylePath) value = section?.style[stylePath] as string ?? ''
  else if (contentPath) {
    value = contentPath.split('.').reduce((acc: any, key) => acc?.[key], section?.content) ?? ''
  }

  const handleChange = (newValue: string) => {
    if (!section) return
    if (variantField) {
      updateSection(sectionId, { variant: newValue })
    } else if (stylePath) {
      updateSection(sectionId, { style: { ...section.style, [stylePath]: newValue } })
    } else if (contentPath) {
      const keys = contentPath.split('.')
      const newContent = { ...section.content }
      let current: any = newContent
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = newValue
      updateSection(sectionId, { content: newContent })
    }
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label className="text-xs text-zinc-400">{label}</Label>
      <select
        value={value}
        onChange={e => handleChange(e.target.value)}
        className="w-full h-8 bg-zinc-800 border border-zinc-700 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
