'use client'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { GradientConfig } from '@/types/site'

const DIRECTIONS: { value: GradientConfig['direction']; label: string }[] = [
  { value: 'to-r', label: '\u2192' },
  { value: 'to-l', label: '\u2190' },
  { value: 'to-b', label: '\u2193' },
  { value: 'to-t', label: '\u2191' },
  { value: 'to-br', label: '\u2198' },
  { value: 'to-bl', label: '\u2199' },
  { value: 'to-tr', label: '\u2197' },
  { value: 'to-tl', label: '\u2196' },
]

const DIR_TO_CSS: Record<string, string> = {
  'to-r': 'to right', 'to-l': 'to left', 'to-t': 'to top', 'to-b': 'to bottom',
  'to-br': 'to bottom right', 'to-bl': 'to bottom left',
  'to-tr': 'to top right', 'to-tl': 'to top left',
}

interface FieldGradientBuilderProps {
  sectionId: string
  label: string
  className?: string
}

export function FieldGradientBuilder({ sectionId, label, className }: FieldGradientBuilderProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const gradient = section?.style.customGradient ?? { from: '#6366f1', to: '#8b5cf6', direction: 'to-br' as const }

  const update = (patch: Partial<GradientConfig>) => {
    if (!section) return
    const newGradient = { ...gradient, ...patch }
    updateSection(sectionId, { style: { ...section.style, customGradient: newGradient } })
  }

  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-xs text-zinc-400">{label}</Label>

      {/* Preview */}
      <div
        className="h-10 rounded-md border border-zinc-700"
        style={{ background: `linear-gradient(${DIR_TO_CSS[gradient.direction] ?? 'to right'}, ${gradient.from}, ${gradient.to})` }}
      />

      {/* Colors */}
      <div className="flex gap-2">
        <div className="flex-1 space-y-1">
          <span className="text-[10px] text-zinc-500">Debut</span>
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              value={gradient.from}
              onChange={e => update({ from: e.target.value })}
              className="w-7 h-7 rounded border border-zinc-700 bg-zinc-800 cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded"
            />
            <input
              type="text"
              value={gradient.from}
              onChange={e => update({ from: e.target.value })}
              className="flex-1 h-7 bg-zinc-800 border border-zinc-700 text-white text-[10px] rounded px-1.5 uppercase focus:outline-none focus:ring-1 focus:ring-wf-blue"
            />
          </div>
        </div>
        <div className="flex-1 space-y-1">
          <span className="text-[10px] text-zinc-500">Fin</span>
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              value={gradient.to}
              onChange={e => update({ to: e.target.value })}
              className="w-7 h-7 rounded border border-zinc-700 bg-zinc-800 cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded"
            />
            <input
              type="text"
              value={gradient.to}
              onChange={e => update({ to: e.target.value })}
              className="flex-1 h-7 bg-zinc-800 border border-zinc-700 text-white text-[10px] rounded px-1.5 uppercase focus:outline-none focus:ring-1 focus:ring-wf-blue"
            />
          </div>
        </div>
      </div>

      {/* Direction */}
      <div className="space-y-1">
        <span className="text-[10px] text-zinc-500">Direction</span>
        <div className="grid grid-cols-8 gap-0.5 rounded-md border border-zinc-700 overflow-hidden">
          {DIRECTIONS.map(({ value: v, label: l }) => (
            <button
              key={v}
              onClick={() => update({ direction: v })}
              className={cn(
                'flex items-center justify-center h-7 text-xs transition-colors',
                gradient.direction === v ? 'bg-wf-blue text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
