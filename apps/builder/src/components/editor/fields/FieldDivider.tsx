'use client'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { DividerConfig, DividerShape } from '@/types/site'

const SHAPES: { value: DividerShape; label: string }[] = [
  { value: 'none', label: 'Aucun' },
  { value: 'wave', label: 'Vague' },
  { value: 'angle', label: 'Angle' },
  { value: 'curve', label: 'Courbe' },
  { value: 'triangle', label: 'Triangle' },
]

interface FieldDividerProps {
  sectionId: string
  label: string
  position: 'top' | 'bottom'
  className?: string
}

export function FieldDivider({ sectionId, label, position, className }: FieldDividerProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const stylePath = position === 'top' ? 'dividerTop' : 'dividerBottom'
  const divider = section?.style[stylePath] ?? { shape: 'none' as const }

  const update = (patch: Partial<DividerConfig>) => {
    if (!section) return
    const newDivider = { ...divider, ...patch }
    updateSection(sectionId, { style: { ...section.style, [stylePath]: newDivider } })
  }

  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-xs text-zinc-400">{label}</Label>
      <select
        value={divider.shape}
        onChange={e => update({ shape: e.target.value as DividerShape })}
        className="w-full h-8 bg-zinc-800 border border-zinc-700 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
      >
        {SHAPES.map(s => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      {divider.shape !== 'none' && (
        <div className="space-y-1">
          <span className="text-[10px] text-zinc-500">Couleur</span>
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              value={divider.color ?? '#ffffff'}
              onChange={e => update({ color: e.target.value })}
              className="w-7 h-7 rounded border border-zinc-700 bg-zinc-800 cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded"
            />
            <input
              type="text"
              value={divider.color ?? '#ffffff'}
              onChange={e => update({ color: e.target.value })}
              className="flex-1 h-7 bg-zinc-800 border border-zinc-700 text-white text-[10px] rounded px-1.5 uppercase focus:outline-none focus:ring-1 focus:ring-wf-blue"
            />
          </div>
        </div>
      )}
    </div>
  )
}
