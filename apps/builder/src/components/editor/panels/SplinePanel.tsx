'use client'
import { PanelSection } from '../PanelSection'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import type { SplineConfig } from '@/types/richMedia'

interface SplinePanelProps {
  config: SplineConfig
  onChange: (config: SplineConfig) => void
}

export function SplinePanel({ config, onChange }: SplinePanelProps) {
  const update = (updates: Partial<SplineConfig>) => onChange({ ...config, ...updates })

  return (
    <PanelSection title="Spline 3D">
      <div className="space-y-3">
        {/* Scene URL */}
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">URL de la scene</Label>
          <Input
            value={config.sceneUrl}
            onChange={e => update({ sceneUrl: e.target.value })}
            placeholder="https://prod.spline.design/..."
            className="bg-zinc-900 border-zinc-600 text-white text-xs h-7 placeholder:text-zinc-600 focus-visible:ring-wf-blue"
          />
        </div>

        {/* Background color */}
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">Fond</Label>
          <Input
            value={config.backgroundColor ?? ''}
            onChange={e => update({ backgroundColor: e.target.value || undefined })}
            placeholder="transparent"
            className="bg-zinc-900 border-zinc-600 text-white text-xs h-7 placeholder:text-zinc-600 focus-visible:ring-wf-blue"
          />
        </div>

        {/* Toggles */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.mouseEvents}
              onChange={e => update({ mouseEvents: e.target.checked })}
              className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-900 text-wf-blue focus:ring-wf-blue"
            />
            <span className="text-[10px] text-zinc-300">Interactions souris</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.scrollEvents}
              onChange={e => update({ scrollEvents: e.target.checked })}
              className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-900 text-wf-blue focus:ring-wf-blue"
            />
            <span className="text-[10px] text-zinc-300">Reactions au scroll</span>
          </label>
        </div>
      </div>
    </PanelSection>
  )
}
