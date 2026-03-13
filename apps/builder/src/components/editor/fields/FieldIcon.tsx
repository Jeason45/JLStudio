'use client'
import { useState } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { IconPicker } from '../IconPicker'

interface FieldIconProps {
  sectionId: string
  label: string
  /** Direct value + onChange mode (used inside item CRUD loops) */
  value?: string
  onChange?: (value: string) => void
  /** Store path mode (reads/writes from section.content[contentPath]) */
  contentPath?: string
}

export function FieldIcon({ sectionId, label, value: directValue, onChange: directOnChange, contentPath }: FieldIconProps) {
  const [open, setOpen] = useState(false)
  const { siteConfig, updateSection } = useEditorStore()

  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)

  const value = directValue ?? (contentPath ? (section?.content as Record<string, unknown>)?.[contentPath] as string : '') ?? ''

  const handleChange = (iconName: string) => {
    if (directOnChange) {
      directOnChange(iconName)
    } else if (contentPath && section) {
      updateSection(sectionId, {
        content: { ...section.content, [contentPath]: iconName }
      })
    }
  }

  return (
    <div>
      <label className="text-xs text-zinc-500 block mb-1">{label}</label>
      <button
        onClick={() => setOpen(true)}
        className="w-full h-9 flex items-center gap-2 px-3 bg-zinc-700 border border-zinc-600 rounded-md text-sm text-white hover:border-zinc-500 transition-colors focus:outline-none focus:ring-1 focus:ring-wf-blue"
      >
        {value ? (
          <>
            <DynamicIcon name={value} className="w-4 h-4 shrink-0" fallbackClassName="text-base leading-none" />
            <span className="text-xs text-zinc-400 truncate">{value}</span>
          </>
        ) : (
          <span className="text-xs text-zinc-500">Choisir une icone...</span>
        )}
      </button>
      {open && (
        <IconPicker
          value={value}
          onChange={handleChange}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}
