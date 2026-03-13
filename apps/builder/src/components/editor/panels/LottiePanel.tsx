'use client'
import { useState } from 'react'
import { PanelSection } from '../PanelSection'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import type { LottieConfig } from '@/types/richMedia'
import { getDefaultLottieConfig } from '@/types/richMedia'

interface LottiePanelProps {
  config: LottieConfig
  onChange: (config: LottieConfig) => void
}

export function LottiePanel({ config, onChange }: LottiePanelProps) {
  const update = (updates: Partial<LottieConfig>) => onChange({ ...config, ...updates })

  return (
    <PanelSection title="Lottie">
      <div className="space-y-3">
        {/* Source URL */}
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">URL du fichier JSON</Label>
          <Input
            value={config.src}
            onChange={e => update({ src: e.target.value })}
            placeholder="https://... ou /assets/anim.json"
            className="bg-zinc-900 border-zinc-600 text-white text-xs h-7 placeholder:text-zinc-600 focus-visible:ring-wf-blue"
          />
        </div>

        {/* Renderer */}
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">Rendu</Label>
          <select
            value={config.renderer}
            onChange={e => update({ renderer: e.target.value as 'svg' | 'canvas' })}
            className="w-full h-7 bg-zinc-900 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
          >
            <option value="svg">SVG (qualite)</option>
            <option value="canvas">Canvas (perf)</option>
          </select>
        </div>

        {/* Speed */}
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">Vitesse ({config.speed.toFixed(1)}x)</Label>
          <input
            type="range"
            min={0.1} max={3} step={0.1}
            value={config.speed}
            onChange={e => update({ speed: Number(e.target.value) })}
            className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-wf-blue"
          />
        </div>

        {/* Toggles */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.autoplay}
              onChange={e => update({ autoplay: e.target.checked })}
              className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-900 text-wf-blue focus:ring-wf-blue"
            />
            <span className="text-[10px] text-zinc-300">Lecture auto</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.loop}
              onChange={e => update({ loop: e.target.checked })}
              className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-900 text-wf-blue focus:ring-wf-blue"
            />
            <span className="text-[10px] text-zinc-300">Boucle</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.playOnHover}
              onChange={e => update({ playOnHover: e.target.checked })}
              className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-900 text-wf-blue focus:ring-wf-blue"
            />
            <span className="text-[10px] text-zinc-300">Jouer au survol</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.scrollScrub}
              onChange={e => update({ scrollScrub: e.target.checked })}
              className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-900 text-wf-blue focus:ring-wf-blue"
            />
            <span className="text-[10px] text-zinc-300">Lier au scroll</span>
          </label>
        </div>
      </div>
    </PanelSection>
  )
}
