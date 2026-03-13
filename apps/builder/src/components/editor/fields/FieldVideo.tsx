'use client'
import { useEditorStore } from '@/store/editorStore'
import { Film, X, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FieldVideoProps {
  sectionId: string
  label: string
  contentPath: string
  placeholder?: string
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

/** Extract YouTube/Vimeo embed URL from various formats */
function getEmbedUrl(url: string): string | null {
  if (!url) return null

  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`

  // Vimeo
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  // Already an embed URL or direct video
  if (url.includes('embed') || url.endsWith('.mp4') || url.endsWith('.webm')) return url

  return null
}

export function FieldVideo({ sectionId, label, contentPath, placeholder }: FieldVideoProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const content = (section?.content ?? {}) as Record<string, unknown>
  const value = getNestedValue(content, contentPath) ?? ''

  const handleChange = (url: string) => {
    updateSection(sectionId, { content: setNestedValue(content, contentPath, url) })
  }

  const embedUrl = getEmbedUrl(value)

  return (
    <div>
      <label className="text-xs text-zinc-400 block mb-1.5">{label}</label>
      <div className="space-y-2">
        <div className="relative">
          <Film className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            value={value}
            onChange={e => handleChange(e.target.value)}
            placeholder={placeholder ?? 'URL YouTube, Vimeo ou vidéo directe'}
            className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md pl-8 pr-8 focus:outline-none focus:ring-1 focus:ring-wf-blue"
          />
          {value && (
            <button
              onClick={() => handleChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {embedUrl && (
          <div className="aspect-video rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700">
            {embedUrl.endsWith('.mp4') || embedUrl.endsWith('.webm') ? (
              <video src={embedUrl} className="w-full h-full object-cover" muted />
            ) : (
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video preview"
              />
            )}
          </div>
        )}

        {value && !embedUrl && (
          <p className="text-[10px] text-amber-500">
            URL non reconnue. Formats supportés: YouTube, Vimeo, .mp4, .webm
          </p>
        )}

        {!value && (
          <div className="flex gap-1.5 flex-wrap">
            {['YouTube', 'Vimeo', '.mp4'].map(tag => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-zinc-800 text-zinc-600 rounded border border-zinc-700">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
