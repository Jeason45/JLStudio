'use client'
import { useState } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { ImagePicker } from '../ImagePicker'
import { Image as ImageIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BackgroundImageConfig } from '@/types/site'

interface FieldBackgroundImageProps {
  sectionId: string
  label: string
  className?: string
}

export function FieldBackgroundImage({ sectionId, label, className }: FieldBackgroundImageProps) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const bgImage = section?.style.backgroundImage

  const update = (patch: Partial<BackgroundImageConfig> | undefined) => {
    if (!section) return
    if (!patch) {
      const newStyle = { ...section.style }
      delete newStyle.backgroundImage
      updateSection(sectionId, { style: newStyle })
      return
    }
    updateSection(sectionId, {
      style: {
        ...section.style,
        backgroundImage: {
          url: bgImage?.url ?? '',
          ...bgImage,
          ...patch,
        },
      },
    })
  }

  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-xs text-zinc-400">{label}</Label>

      {bgImage?.url ? (
        <div className="relative rounded-lg overflow-hidden border border-zinc-700 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bgImage.url} alt="" className="w-full h-20 object-cover" />
          {bgImage.overlayColor && (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: bgImage.overlayColor,
                opacity: (bgImage.overlayOpacity ?? 50) / 100,
              }}
            />
          )}
          <button
            onClick={() => update(undefined)}
            className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : null}

      <button
        onClick={() => setPickerOpen(true)}
        className={cn(
          'w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed text-xs transition-colors',
          bgImage?.url
            ? 'border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300'
            : 'border-zinc-700 text-zinc-500 hover:border-wf-blue hover:text-wf-blue'
        )}
      >
        <ImageIcon className="w-3.5 h-3.5" />
        {bgImage?.url ? 'Changer l\'image' : 'Ajouter une image de fond'}
      </button>

      {bgImage?.url && (
        <div className="space-y-2">
          {/* Overlay color */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500">Overlay</span>
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={bgImage.overlayColor ?? '#000000'}
                onChange={e => update({ overlayColor: e.target.value })}
                className="w-7 h-7 rounded border border-zinc-700 bg-zinc-800 cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded"
              />
              <input
                type="range"
                min={0}
                max={100}
                value={bgImage.overlayOpacity ?? 50}
                onChange={e => update({ overlayOpacity: Number(e.target.value) })}
                className="flex-1 h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-wf-blue"
              />
              <span className="text-[10px] text-zinc-500 w-7 text-right">{bgImage.overlayOpacity ?? 50}%</span>
            </div>
          </div>
        </div>
      )}

      {pickerOpen && (
        <ImagePicker
          value={bgImage?.url}
          onChange={url => update({ url })}
          onClose={() => setPickerOpen(false)}
          siteId={siteConfig?.id}
        />
      )}
    </div>
  )
}
