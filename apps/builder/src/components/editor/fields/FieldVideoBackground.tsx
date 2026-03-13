'use client'
import { useEditorStore } from '@/store/editorStore'
import { Video, X } from 'lucide-react'

interface FieldVideoBackgroundProps {
  sectionId: string
  label: string
}

const INPUT = 'w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-xs rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue'

export function FieldVideoBackground({ sectionId, label }: FieldVideoBackgroundProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  if (!section) return null

  const video = section.style.videoBackground

  const update = (patch: Partial<NonNullable<typeof video>>) => {
    updateSection(sectionId, {
      style: {
        ...section.style,
        videoBackground: { url: '', loop: true, muted: true, ...video, ...patch },
      },
    })
  }

  const clear = () => {
    const newStyle = { ...section.style }
    delete newStyle.videoBackground
    updateSection(sectionId, { style: newStyle })
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs text-zinc-400 flex items-center gap-1">
          <Video className="w-3 h-3" />
          {label}
        </label>
        {video?.url && (
          <button onClick={clear} className="p-0.5 text-zinc-600 hover:text-red-400" title="Supprimer">
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
      <input
        value={video?.url ?? ''}
        onChange={e => update({ url: e.target.value })}
        placeholder="https://...video.mp4"
        className={INPUT}
      />
      {video?.url && (
        <>
          <input
            value={video?.poster ?? ''}
            onChange={e => update({ poster: e.target.value || undefined })}
            placeholder="URL poster (optionnel)"
            className={INPUT}
          />
          <div className="flex gap-4">
            <label className="flex items-center gap-1.5 text-xs text-zinc-500 cursor-pointer">
              <input
                type="checkbox"
                checked={video?.loop !== false}
                onChange={e => update({ loop: e.target.checked })}
                className="rounded border-zinc-600"
              />
              Boucle
            </label>
            <label className="flex items-center gap-1.5 text-xs text-zinc-500 cursor-pointer">
              <input
                type="checkbox"
                checked={video?.muted !== false}
                onChange={e => update({ muted: e.target.checked })}
                className="rounded border-zinc-600"
              />
              Muet
            </label>
          </div>
        </>
      )}
    </div>
  )
}
