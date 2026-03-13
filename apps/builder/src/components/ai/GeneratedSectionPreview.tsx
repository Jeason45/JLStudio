'use client'
import { getSectionComponent } from '@/components/sections'
import { cn } from '@/lib/utils'
import { CheckCircle2, RefreshCw } from 'lucide-react'
import type { GenerateMode } from '@/types/ai'

interface GeneratedSectionPreviewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any
  mode: GenerateMode
  onApply: () => void
  onRegenerate: () => void
  loading: boolean
}

export function GeneratedSectionPreview({ result, mode, onApply, onRegenerate, loading }: GeneratedSectionPreviewProps) {
  const sections = Array.isArray(result) ? result : [result]

  return (
    <div className="space-y-3">
      {/* Aperçu miniature */}
      <div className="rounded-xl overflow-hidden border border-zinc-700">
        <div className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1.5 flex items-center justify-between">
          <span>Aperçu généré</span>
          <span className="text-zinc-600">{sections.length} section{sections.length > 1 ? 's' : ''}</span>
        </div>
        <div className="bg-white overflow-hidden" style={{ maxHeight: '180px' }}>
          <div style={{ transform: 'scale(0.45)', transformOrigin: 'top left', width: '222%', pointerEvents: 'none' }}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {sections.map((section: any, i: number) => {
              if (!section?.type) return null
              const Component = getSectionComponent(section.type)
              if (!Component) return (
                <div key={i} className="bg-zinc-50 py-8 text-center text-xs text-zinc-400">
                  Section {section.type}
                </div>
              )
              return (
                <Component
                  key={i}
                  config={{
                    id: `preview-${i}`,
                    type: section.type,
                    variant: section.variant ?? 'default',
                    content: section.content ?? {},
                    style: section.style ?? { background: 'white', paddingY: 'lg' },
                    visible: true,
                  }}
                  isEditing={false}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Liste des sections */}
      <div className="bg-zinc-800/60 rounded-lg p-3 space-y-1.5">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {sections.map((s: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
            <span className="text-xs text-zinc-300 capitalize">{s?.type ?? 'section'}</span>
            {s?.content?.title && (
              <span className="text-xs text-zinc-600 truncate">— {s.content.title}</span>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onApply}
          className="flex-1 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Appliquer au canvas
        </button>
        <button
          onClick={onRegenerate}
          disabled={loading}
          className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs rounded-lg transition-colors disabled:opacity-50"
          title="Régénérer"
        >
          <RefreshCw className={cn('w-3.5 h-3.5', loading && 'animate-spin')} />
        </button>
      </div>
    </div>
  )
}
