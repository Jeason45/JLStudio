'use client'
import { Video, X } from 'lucide-react'

interface VideoBackgroundConfig {
  url: string
  poster?: string
  loop?: boolean
  muted?: boolean
}

interface VideoBackgroundEditorProps {
  value?: VideoBackgroundConfig
  onChange: (value: VideoBackgroundConfig | undefined) => void
}

const INPUT = 'w-full h-6 bg-zinc-800 border border-zinc-700 text-white text-[10px] rounded px-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue'

export function VideoBackgroundEditor({ value, onChange }: VideoBackgroundEditorProps) {
  const update = (patch: Partial<VideoBackgroundConfig>) => {
    onChange({ url: '', loop: true, muted: true, ...value, ...patch })
  }

  const clear = () => onChange(undefined)

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-zinc-500 flex items-center gap-1">
          <Video className="w-3 h-3" />
          Video Background
        </span>
        {value && (
          <button onClick={clear} className="p-0.5 text-zinc-600 hover:text-red-400 transition-colors" title="Remove video background">
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="mt-1 space-y-1.5">
        {/* Video URL */}
        <div>
          <label className="text-[9px] text-zinc-600">Video URL (MP4/WebM)</label>
          <input
            value={value?.url ?? ''}
            onChange={e => update({ url: e.target.value })}
            placeholder="https://...video.mp4"
            className={INPUT}
          />
        </div>

        {/* Poster */}
        <div>
          <label className="text-[9px] text-zinc-600">Poster Image URL</label>
          <div className="flex gap-1.5 items-start">
            <input
              value={value?.poster ?? ''}
              onChange={e => update({ poster: e.target.value || undefined })}
              placeholder="https://...poster.jpg"
              className={INPUT}
            />
            {value?.poster && (
              <div
                className="w-7 h-7 shrink-0 rounded border border-zinc-700 bg-center bg-cover"
                style={{ backgroundImage: `url(${value.poster})` }}
              />
            )}
          </div>
        </div>

        {/* Toggles */}
        {value?.url && (
          <div className="flex gap-4">
            <label className="flex items-center gap-1.5 text-[10px] text-zinc-500 cursor-pointer">
              <input
                type="checkbox"
                checked={value?.loop !== false}
                onChange={e => update({ loop: e.target.checked })}
                className="rounded border-zinc-600"
              />
              Loop
            </label>
            <label className="flex items-center gap-1.5 text-[10px] text-zinc-500 cursor-pointer">
              <input
                type="checkbox"
                checked={value?.muted !== false}
                onChange={e => update({ muted: e.target.checked })}
                className="rounded border-zinc-600"
              />
              Muted
            </label>
          </div>
        )}
      </div>
    </div>
  )
}
