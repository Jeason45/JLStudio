'use client'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface FieldTextareaProps {
  sectionId: string
  label: string
  contentPath: string
  placeholder?: string
  rows?: number
  className?: string
}

function getNestedValue(obj: Record<string, any>, path: string): string {
  const val = path.split('.').reduce((acc: any, key) => acc?.[key], obj)
  return typeof val === 'string' ? val : (val ?? '')
}

function setNestedValue(obj: Record<string, any>, path: string, value: string): Record<string, any> {
  const keys = path.split('.')
  const result = { ...obj }
  let current: any = result
  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...current[keys[i]] }
    current = current[keys[i]]
  }
  current[keys[keys.length - 1]] = value
  return result
}

export function FieldTextarea({ sectionId, label, contentPath, placeholder, rows = 3, className }: FieldTextareaProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const value = section ? getNestedValue(section.content, contentPath) : ''

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!section) return
    const newContent = setNestedValue(section.content, contentPath, e.target.value)
    updateSection(sectionId, { content: newContent })
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label className="text-xs text-zinc-400">{label}</Label>
      <Textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        className="bg-zinc-800 border-zinc-700 text-white text-xs placeholder:text-zinc-600 focus-visible:ring-wf-blue resize-none"
      />
    </div>
  )
}
