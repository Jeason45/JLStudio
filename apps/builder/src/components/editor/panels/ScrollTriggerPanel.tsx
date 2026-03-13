'use client'
import { PanelSection } from '../PanelSection'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import type { ScrollTriggerConfig, ScrollToggleAction } from '@/types/interactions'

interface ScrollTriggerPanelProps {
  config: ScrollTriggerConfig
  onChange: (config: ScrollTriggerConfig) => void
}

const TOGGLE_ACTIONS: ScrollToggleAction[] = ['play', 'pause', 'resume', 'reset', 'restart', 'complete', 'reverse', 'none']

export function ScrollTriggerPanel({ config, onChange }: ScrollTriggerPanelProps) {
  const update = (updates: Partial<ScrollTriggerConfig>) => onChange({ ...config, ...updates })

  // Parse toggleActions string
  const toggleParts = (config.toggleActions ?? 'play none none none').split(' ') as ScrollToggleAction[]
  const [onEnter, onLeave, onEnterBack, onLeaveBack] = toggleParts

  const updateToggleActions = (index: number, value: ScrollToggleAction) => {
    const parts = [...toggleParts]
    parts[index] = value
    update({ toggleActions: parts.join(' ') as ScrollTriggerConfig['toggleActions'] })
  }

  return (
    <PanelSection title="ScrollTrigger avance">
      <div className="space-y-3">
        {/* Start / End positions */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-[10px] text-zinc-500">Position debut</Label>
            <Input
              value={config.start}
              onChange={e => update({ start: e.target.value })}
              placeholder="top bottom"
              className="bg-zinc-900 border-zinc-600 text-white text-xs h-7 placeholder:text-zinc-600 focus-visible:ring-wf-blue"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] text-zinc-500">Position fin</Label>
            <Input
              value={config.end}
              onChange={e => update({ end: e.target.value })}
              placeholder="bottom top"
              className="bg-zinc-900 border-zinc-600 text-white text-xs h-7 placeholder:text-zinc-600 focus-visible:ring-wf-blue"
            />
          </div>
        </div>

        {/* Scrub */}
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">Scrub</Label>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={!!config.scrub}
                onChange={e => update({ scrub: e.target.checked ? 1 : false })}
                className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-900 text-wf-blue focus:ring-wf-blue"
              />
              <span className="text-[10px] text-zinc-300">Actif</span>
            </label>
            {typeof config.scrub === 'number' && (
              <Input
                type="number"
                step={0.1} min={0} max={5}
                value={config.scrub}
                onChange={e => update({ scrub: Number(e.target.value) })}
                className="w-20 bg-zinc-900 border-zinc-600 text-white text-xs h-7 focus-visible:ring-wf-blue"
              />
            )}
          </div>
        </div>

        {/* Pin */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.pin ?? false}
              onChange={e => update({ pin: e.target.checked })}
              className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-900 text-wf-blue focus:ring-wf-blue"
            />
            <span className="text-[10px] text-zinc-300">Epingler (pin)</span>
          </label>
          {config.pin && (
            <label className="flex items-center gap-2 cursor-pointer pl-5">
              <input
                type="checkbox"
                checked={config.pinSpacing ?? true}
                onChange={e => update({ pinSpacing: e.target.checked })}
                className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-900 text-wf-blue focus:ring-wf-blue"
              />
              <span className="text-[10px] text-zinc-300">Pin spacing</span>
            </label>
          )}
        </div>

        {/* Toggle Actions */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Toggle Actions</span>
          <div className="grid grid-cols-2 gap-2">
            {['onEnter', 'onLeave', 'onEnterBack', 'onLeaveBack'].map((label, i) => (
              <div key={label} className="space-y-0.5">
                <Label className="text-[9px] text-zinc-500">{label}</Label>
                <select
                  value={toggleParts[i] ?? 'none'}
                  onChange={e => updateToggleActions(i, e.target.value as ScrollToggleAction)}
                  className="w-full h-6 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-1 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                >
                  {TOGGLE_ACTIONS.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Direction */}
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">Direction</Label>
          <select
            value={config.direction ?? 'vertical'}
            onChange={e => update({ direction: e.target.value as 'vertical' | 'horizontal' })}
            className="w-full h-7 bg-zinc-900 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
          >
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
          </select>
        </div>

        {/* Debug markers */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={config.markers ?? false}
            onChange={e => update({ markers: e.target.checked })}
            className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-900 text-wf-blue focus:ring-wf-blue"
          />
          <span className="text-[10px] text-zinc-300">Marqueurs debug</span>
        </label>
      </div>
    </PanelSection>
  )
}
