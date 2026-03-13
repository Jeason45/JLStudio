'use client'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface FieldToggleProps {
  sectionId: string
  label: string
  contentPath: string
  className?: string
}

export function FieldToggle({ sectionId, label, contentPath, className }: FieldToggleProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const value = contentPath.split('.').reduce((acc: any, key) => acc?.[key], section?.content) ?? false

  const handleChange = (checked: boolean) => {
    if (!section) return
    const keys = contentPath.split('.')
    const newContent = { ...section.content }
    let current: any = newContent
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] }
      current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = checked
    updateSection(sectionId, { content: newContent })
  }

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <Label className="text-xs text-zinc-400">{label}</Label>
      <Switch
        checked={!!value}
        onCheckedChange={handleChange}
        className="scale-75"
      />
    </div>
  )
}
