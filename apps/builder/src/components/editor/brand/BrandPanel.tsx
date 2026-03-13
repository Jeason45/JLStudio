'use client'
import { useState } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ColorPicker } from './ColorPicker'
import { FontPicker } from './FontPicker'
import { cn } from '@/lib/utils'
import type { Brand } from '@/types/site'
import { COLOR_PALETTES, PALETTE_CATEGORIES } from '@/data/designPresets'

interface BrandPanelProps {
  open: boolean
  onClose: () => void
}

export function BrandPanel({ open, onClose }: BrandPanelProps) {
  const { siteConfig, updateBrand } = useEditorStore()
  const brand = siteConfig?.brand
  const [paletteFilter, setPaletteFilter] = useState<string | null>(null)

  if (!brand) return null

  const update = (updates: Partial<Brand>) => updateBrand(updates)
  const filteredPalettes = paletteFilter
    ? COLOR_PALETTES.filter(p => p.category === paletteFilter)
    : COLOR_PALETTES
  const updateColor = (key: keyof Brand['colors'], value: string) => {
    update({ colors: { ...brand.colors, [key]: value } })
  }
  const updateTypo = (key: keyof Brand['typography'], value: string) => {
    update({ typography: { ...brand.typography, [key]: value } })
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="w-80 bg-zinc-900 border-zinc-800 text-white p-0 flex flex-col"
      >
        <SheetHeader className="px-5 py-4 border-b border-zinc-800 shrink-0">
          <SheetTitle className="text-white text-sm">Brand Settings</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="px-5 py-4 space-y-6">

            {/* Preset palettes */}
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Palettes ({filteredPalettes.length})
              </p>
              <div className="flex flex-wrap gap-1 mb-2">
                <button
                  onClick={() => setPaletteFilter(null)}
                  className={cn(
                    'text-[10px] px-2 py-0.5 rounded-full transition-colors',
                    !paletteFilter ? 'bg-wf-blue text-white' : 'bg-zinc-800 text-zinc-500 hover:text-white'
                  )}
                >
                  Tous
                </button>
                {PALETTE_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setPaletteFilter(paletteFilter === cat.id ? null : cat.id)}
                    className={cn(
                      'text-[10px] px-2 py-0.5 rounded-full transition-colors',
                      paletteFilter === cat.id ? 'bg-wf-blue text-white' : 'bg-zinc-800 text-zinc-500 hover:text-white'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {filteredPalettes.map(palette => {
                  const isActive = palette.colors.primary === brand.colors.primary && palette.colors.background === brand.colors.background
                  return (
                    <button
                      key={palette.id}
                      onClick={() => update({ colors: palette.colors })}
                      className={cn(
                        'group flex items-center gap-2 p-2 rounded-lg transition-colors text-left',
                        isActive ? 'bg-wf-blue/15 ring-1 ring-wf-blue' : 'bg-zinc-800/50 hover:bg-zinc-800'
                      )}
                      title={palette.name}
                    >
                      <div className="flex gap-0.5 shrink-0">
                        {[palette.colors.primary, palette.colors.secondary, palette.colors.accent].map((c, i) => (
                          <div key={i} className="w-3 h-3 rounded-full border border-white/10" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                      <span className="text-[10px] text-zinc-500 group-hover:text-zinc-300 truncate">{palette.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Colors */}
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                Couleurs
              </p>
              <div className="space-y-1 bg-zinc-800/50 rounded-xl px-3 py-2">
                <ColorPicker label="Primaire" value={brand.colors.primary} onChange={v => updateColor('primary', v)} />
                <div className="h-px bg-zinc-700/50" />
                <ColorPicker label="Secondaire" value={brand.colors.secondary} onChange={v => updateColor('secondary', v)} />
                <div className="h-px bg-zinc-700/50" />
                <ColorPicker label="Accent" value={brand.colors.accent} onChange={v => updateColor('accent', v)} />
                <div className="h-px bg-zinc-700/50" />
                <ColorPicker label="Arriere-plan" value={brand.colors.background} onChange={v => updateColor('background', v)} />
                <div className="h-px bg-zinc-700/50" />
                <ColorPicker label="Texte" value={brand.colors.foreground} onChange={v => updateColor('foreground', v)} />
                <div className="h-px bg-zinc-700/50" />
                <ColorPicker label="Muted" value={brand.colors.muted} onChange={v => updateColor('muted', v)} />
              </div>
            </div>

            {/* Typography */}
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                Typographie
              </p>
              <div className="space-y-3">
                <FontPicker
                  label="Police des titres"
                  value={brand.typography.heading}
                  onChange={v => updateTypo('heading', v)}
                />
                <FontPicker
                  label="Police du corps"
                  value={brand.typography.body}
                  onChange={v => updateTypo('body', v)}
                />
                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5">Taille de base</label>
                  <div className="flex gap-2">
                    {(['compact', 'default', 'large'] as const).map(size => (
                      <button
                        key={size}
                        onClick={() => updateTypo('size', size)}
                        className={`flex-1 py-1.5 rounded-lg text-xs transition-colors ${
                          brand.typography.size === size
                            ? 'bg-wf-blue text-white'
                            : 'bg-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {size === 'compact' ? 'Compact' : size === 'default' ? 'Normal' : 'Large'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Border Radius */}
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                Border Radius
              </p>
              <div className="flex gap-2">
                {([
                  { value: 'none', label: '0', preview: 'rounded-none' },
                  { value: 'sm', label: 'sm', preview: 'rounded' },
                  { value: 'md', label: 'md', preview: 'rounded-lg' },
                  { value: 'lg', label: 'lg', preview: 'rounded-xl' },
                  { value: 'full', label: 'full', preview: 'rounded-full' },
                ] as const).map(({ value, label, preview }) => (
                  <button
                    key={value}
                    onClick={() => update({ borderRadius: value })}
                    className={`flex-1 flex flex-col items-center gap-1.5 py-2 rounded-lg transition-colors ${
                      brand.borderRadius === value
                        ? 'bg-wf-blue/20 border border-wf-blue'
                        : 'bg-zinc-800 border border-transparent hover:border-zinc-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-wf-blue ${preview}`} />
                    <span className="text-xs text-zinc-400">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Spacing */}
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                Espacement
              </p>
              <div className="flex gap-2">
                {(['compact', 'default', 'relaxed'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => update({ spacing: s })}
                    className={`flex-1 py-2 rounded-lg text-xs transition-colors ${
                      brand.spacing === s
                        ? 'bg-wf-blue text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {s === 'compact' ? 'Compact' : s === 'default' ? 'Normal' : 'Aere'}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
