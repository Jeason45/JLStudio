'use client'
import { useState } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { ImagePicker } from '../ImagePicker'
import { Image as ImageIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FieldImageProps {
  sectionId: string
  label: string
  contentPath: string
}

function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === 'string' ? current : undefined
}

function setNestedValue(obj: Record<string, unknown>, path: string, value: string): Record<string, unknown> {
  const keys = path.split('.')
  if (keys.length === 1) return { ...obj, [keys[0]]: value }
  const [first, ...rest] = keys
  return {
    ...obj,
    [first]: setNestedValue(
      (obj[first] as Record<string, unknown>) ?? {},
      rest.join('.'),
      value
    ),
  }
}

export function FieldImage({ sectionId, label, contentPath }: FieldImageProps) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const content = (section?.content ?? {}) as Record<string, unknown>
  const value = getNestedValue(content, contentPath)

  const handleChange = (url: string) => {
    updateSection(sectionId, { content: setNestedValue(content, contentPath, url) })
  }

  return (
    <div>
      <label className="text-xs text-zinc-400 block mb-1.5">{label}</label>
      <div className="space-y-1.5">
        {value ? (
          <div className="relative rounded-lg overflow-hidden border border-zinc-700 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="w-full h-24 object-cover" />
            <button onClick={() => handleChange('')}
              className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : null}
        <button onClick={() => setPickerOpen(true)}
          className={cn('w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed text-xs transition-colors',
            value ? 'border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300' : 'border-zinc-700 text-zinc-500 hover:border-wf-blue hover:text-wf-blue'
          )}>
          <ImageIcon className="w-3.5 h-3.5" />
          {value ? 'Changer l\'image' : 'Ajouter une image'}
        </button>
      </div>
      {pickerOpen && <ImagePicker value={value} onChange={handleChange} onClose={() => setPickerOpen(false)} siteId={siteConfig?.id} />}
    </div>
  )
}
