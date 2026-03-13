'use client'
import { useState } from 'react'
import { PanelSection } from '../PanelSection'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Play, Type } from 'lucide-react'
import { cn } from '@/lib/utils'
import { splitText, animateSplitText, type SplitMode, type SplitResult } from '@/lib/animations/splitText'
import { useEditorStore } from '@/store/editorStore'
import { parseElementId } from '@/lib/elementHelpers'

const SPLIT_MODES: { value: SplitMode; label: string }[] = [
  { value: 'chars', label: 'Caracteres' },
  { value: 'words', label: 'Mots' },
  { value: 'lines', label: 'Lignes' },
]

export function SplitTextPanel() {
  const { selectedElementPath } = useEditorStore()
  const [splitMode, setSplitMode] = useState<SplitMode>('chars')
  const [staggerDelay, setStaggerDelay] = useState(30)
  const [duration, setDuration] = useState(400)
  const [splitResult, setSplitResult] = useState<SplitResult | null>(null)

  if (!selectedElementPath) return null
  const parsed = parseElementId(selectedElementPath)
  if (!parsed) return null

  const elementId = `${parsed.sectionId}::${parsed.contentPath}`

  const handleSplit = () => {
    const el = document.querySelector(`[data-element-id="${elementId}"]`) as HTMLElement | null
    if (!el) return

    // Revert previous split
    splitResult?.revert()

    const result = splitText(el, { mode: splitMode })
    setSplitResult(result)
  }

  const handleAnimate = async () => {
    if (!splitResult) return

    await animateSplitText(splitResult, {
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      duration,
      staggerDelay,
    })
  }

  const handleRevert = () => {
    splitResult?.revert()
    setSplitResult(null)
  }

  return (
    <PanelSection title="Split Text">
      <div className="space-y-3">
        {/* Split mode */}
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">Mode de split</Label>
          <div className="grid grid-cols-3 gap-1">
            {SPLIT_MODES.map(mode => (
              <button
                key={mode.value}
                onClick={() => setSplitMode(mode.value)}
                className={cn(
                  'px-2 py-1 text-[10px] rounded-md border transition-colors',
                  splitMode === mode.value
                    ? 'bg-wf-blue/20 border-wf-blue text-blue-300'
                    : 'bg-[#111] border-[#333] text-zinc-400 hover:text-white'
                )}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stagger & Duration */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-[10px] text-zinc-500">Stagger (ms)</Label>
            <Input
              type="number"
              min={5}
              max={500}
              value={staggerDelay}
              onChange={e => setStaggerDelay(Number(e.target.value))}
              className="bg-[#111] border-[#333] text-white text-xs h-7 focus-visible:ring-wf-blue"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] text-zinc-500">Duree (ms)</Label>
            <Input
              type="number"
              min={100}
              max={3000}
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              className="bg-[#111] border-[#333] text-white text-xs h-7 focus-visible:ring-wf-blue"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleSplit}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs text-wf-blue hover:text-blue-300 hover:bg-wf-blue/10 rounded-md border border-zinc-700 transition-colors"
          >
            <Type className="w-3 h-3" /> Split
          </button>
          <button
            onClick={handleAnimate}
            disabled={!splitResult}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-md border border-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Play className="w-3 h-3" /> Animer
          </button>
        </div>

        {splitResult && (
          <button
            onClick={handleRevert}
            className="w-full py-1 text-[10px] text-zinc-400 hover:text-white transition-colors"
          >
            Annuler le split
          </button>
        )}
      </div>
    </PanelSection>
  )
}
