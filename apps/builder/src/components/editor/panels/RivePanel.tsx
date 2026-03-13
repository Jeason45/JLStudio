'use client'
import { PanelSection } from '../PanelSection'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import type { RiveConfig } from '@/types/richMedia'

interface RivePanelProps {
  config: RiveConfig
  onChange: (config: RiveConfig) => void
}

const FIT_OPTIONS = [
  { value: 'contain', label: 'Contenir' },
  { value: 'cover', label: 'Couvrir' },
  { value: 'fill', label: 'Remplir' },
  { value: 'fitWidth', label: 'Largeur' },
  { value: 'fitHeight', label: 'Hauteur' },
  { value: 'none', label: 'Aucun' },
]

const ALIGNMENT_OPTIONS = [
  { value: 'center', label: 'Centre' },
  { value: 'topLeft', label: 'Haut gauche' },
  { value: 'topCenter', label: 'Haut centre' },
  { value: 'topRight', label: 'Haut droit' },
  { value: 'centerLeft', label: 'Centre gauche' },
  { value: 'centerRight', label: 'Centre droit' },
  { value: 'bottomLeft', label: 'Bas gauche' },
  { value: 'bottomCenter', label: 'Bas centre' },
  { value: 'bottomRight', label: 'Bas droit' },
]

export function RivePanel({ config, onChange }: RivePanelProps) {
  const update = (updates: Partial<RiveConfig>) => onChange({ ...config, ...updates })

  return (
    <PanelSection title="Rive">
      <div className="space-y-3">
        {/* Source */}
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">URL du fichier .riv</Label>
          <Input
            value={config.src}
            onChange={e => update({ src: e.target.value })}
            placeholder="https://... ou /assets/anim.riv"
            className="bg-zinc-900 border-zinc-600 text-white text-xs h-7 placeholder:text-zinc-600 focus-visible:ring-wf-blue"
          />
        </div>

        {/* State machine */}
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">State Machine</Label>
          <Input
            value={config.stateMachine ?? ''}
            onChange={e => update({ stateMachine: e.target.value || undefined })}
            placeholder="State Machine 1"
            className="bg-zinc-900 border-zinc-600 text-white text-xs h-7 placeholder:text-zinc-600 focus-visible:ring-wf-blue"
          />
        </div>

        {/* Artboard */}
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">Artboard</Label>
          <Input
            value={config.artboard ?? ''}
            onChange={e => update({ artboard: e.target.value || undefined })}
            placeholder="Defaut"
            className="bg-zinc-900 border-zinc-600 text-white text-xs h-7 placeholder:text-zinc-600 focus-visible:ring-wf-blue"
          />
        </div>

        {/* Fit & Alignment */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-[10px] text-zinc-500">Ajustement</Label>
            <select
              value={config.fit}
              onChange={e => update({ fit: e.target.value as RiveConfig['fit'] })}
              className="w-full h-7 bg-zinc-900 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
            >
              {FIT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] text-zinc-500">Alignement</Label>
            <select
              value={config.alignment}
              onChange={e => update({ alignment: e.target.value as RiveConfig['alignment'] })}
              className="w-full h-7 bg-zinc-900 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
            >
              {ALIGNMENT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Autoplay */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={config.autoplay}
            onChange={e => update({ autoplay: e.target.checked })}
            className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-900 text-wf-blue focus:ring-wf-blue"
          />
          <span className="text-[10px] text-zinc-300">Lecture auto</span>
        </label>
      </div>
    </PanelSection>
  )
}
