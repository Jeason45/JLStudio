'use client'
import { useState } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Plus, Trash2, Copy, Play } from 'lucide-react'
import { parseElementId } from '@/lib/elementHelpers'
import type { AnimationConfig } from '@/types/interactions'
import type { AnimationPresetCustom } from '@/types/site'

export function AnimationLibraryPanel() {
  const { siteConfig, selectedElementPath, addCustomPreset, removeCustomPreset, addInteraction } = useEditorStore()
  const [showCreate, setShowCreate] = useState(false)
  const [presetName, setPresetName] = useState('')
  const [presetCategory, setPresetCategory] = useState('custom')

  const customPresets = siteConfig?.customPresets ?? []

  // Get current element's first animation to save as preset
  const getCurrentAnimation = (): AnimationConfig | null => {
    if (!selectedElementPath || !siteConfig) return null
    const parsed = parseElementId(selectedElementPath)
    if (!parsed) return null
    for (const page of siteConfig.pages) {
      const section = page.sections.find(s => s.id === parsed.sectionId)
      if (section) {
        const interactions = section.content.__interactions as Record<string, AnimationConfig[]> | undefined
        const anims = interactions?.[parsed.contentPath]
        return anims?.[0] ?? null
      }
    }
    return null
  }

  const handleSavePreset = () => {
    if (!presetName.trim()) return
    const anim = getCurrentAnimation()
    if (!anim) return

    const { id: _id, name: _name, trigger: _trigger, ...config } = anim
    addCustomPreset({
      id: `preset-${Date.now()}`,
      name: presetName.trim(),
      category: presetCategory,
      config: config as Record<string, unknown>,
    })
    setShowCreate(false)
    setPresetName('')
    setPresetCategory('custom')
  }

  const handleApplyPreset = (preset: AnimationPresetCustom) => {
    if (!selectedElementPath) return
    const parsed = parseElementId(selectedElementPath)
    if (!parsed) return

    const config: AnimationConfig = {
      id: `anim-${Date.now()}`,
      name: preset.name,
      trigger: { type: 'scroll-into-view', threshold: 0.2 },
      duration: 600,
      delay: 0,
      easing: 'ease-out',
      ...(preset.config as Partial<AnimationConfig>),
    }
    addInteraction(parsed.sectionId, parsed.contentPath, config)
  }

  const hasAnimation = !!getCurrentAnimation()

  return (
    <PanelSection title="Bibliotheque d'animations">
      <div className="space-y-3">
        {/* Custom presets list */}
        {customPresets.length > 0 ? (
          <div className="space-y-1.5">
            {customPresets.map(preset => (
              <div
                key={preset.id}
                className="flex items-center gap-2 px-2 py-1.5 bg-[#1a1a1a] border border-[#333] rounded-md"
              >
                <Play className="w-2.5 h-2.5 text-wf-blue shrink-0" />
                <span className="text-xs text-zinc-300 flex-1 truncate">{preset.name}</span>
                <span className="text-[9px] text-zinc-500">{preset.category}</span>
                <button
                  onClick={() => handleApplyPreset(preset)}
                  className="p-0.5 text-zinc-500 hover:text-white"
                  title="Appliquer"
                >
                  <Copy className="w-2.5 h-2.5" />
                </button>
                <button
                  onClick={() => removeCustomPreset(preset.id)}
                  className="p-0.5 text-zinc-500 hover:text-red-400"
                  title="Supprimer"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[10px] text-zinc-500 text-center py-2">
            Aucun preset personnalise. Sauvegardez une animation comme preset.
          </p>
        )}

        {/* Create preset */}
        {!showCreate ? (
          <button
            onClick={() => setShowCreate(true)}
            disabled={!hasAnimation}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-wf-blue hover:text-blue-300 hover:bg-wf-blue/10 rounded-md border border-dashed border-[#444] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-3 h-3" /> Sauvegarder comme preset
          </button>
        ) : (
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-2 space-y-2">
            <div className="space-y-1">
              <Label className="text-[10px] text-zinc-500">Nom du preset</Label>
              <Input
                value={presetName}
                onChange={e => setPresetName(e.target.value)}
                placeholder="Mon animation"
                className="bg-[#111] border-[#333] text-white text-xs h-7 placeholder:text-zinc-600 focus-visible:ring-wf-blue"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-zinc-500">Categorie</Label>
              <select
                value={presetCategory}
                onChange={e => setPresetCategory(e.target.value)}
                className="w-full h-7 bg-zinc-900 border border-[#333] text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
              >
                <option value="custom">Custom</option>
                <option value="entrance">Entrance</option>
                <option value="exit">Exit</option>
                <option value="emphasis">Emphasis</option>
                <option value="hover">Hover</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSavePreset}
                className="flex-1 py-1 text-[10px] text-wf-blue hover:text-blue-300 hover:bg-wf-blue/10 rounded transition-colors"
              >
                Sauvegarder
              </button>
              <button
                onClick={() => setShowCreate(false)}
                className="flex-1 py-1 text-[10px] text-zinc-500 hover:text-white rounded transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </PanelSection>
  )
}
