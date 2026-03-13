'use client'
import { useState } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Check, ChevronDown, ChevronLeft, Rocket, Gem, Layers, Zap, Building2, Minimize2 } from 'lucide-react'
import {
  COLOR_PALETTES,
  TYPOGRAPHY_PRESETS,
  TAG_STYLE_PRESETS,
  THEME_PRESETS,
  STYLE_FAMILIES,
  getPaletteById, getTypographyById, getTagStyleById,
  type ColorPalettePreset, type TypographyPreset, type TagStylePreset, type StyleFamily,
} from '@/data/designPresets'

// ─── Icon map ───

const FAMILY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  rocket: Rocket,
  gem: Gem,
  layers: Layers,
  zap: Zap,
  building: Building2,
  minimize: Minimize2,
}

function FamilyIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = FAMILY_ICONS[icon]
  if (!Icon) return null
  return <Icon className={className} />
}

// ─── Palette Card ───

function PaletteCard({ preset, isActive, onApply }: { preset: ColorPalettePreset; isActive: boolean; onApply: () => void }) {
  return (
    <button
      onClick={onApply}
      className={cn(
        'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-all text-left',
        isActive ? 'bg-wf-blue/15 ring-1 ring-wf-blue' : 'hover:bg-zinc-700/30'
      )}
    >
      <div className="flex gap-px shrink-0">
        {[preset.colors.primary, preset.colors.secondary, preset.colors.accent, preset.colors.background].map((c, i) => (
          <div
            key={i}
            className={cn('w-5 h-5 border border-zinc-700/50', i === 0 && 'rounded-l', i === 3 && 'rounded-r')}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <span className="text-[11px] text-[#999] flex-1 truncate">{preset.name}</span>
      {isActive && <Check className="w-3 h-3 text-wf-blue shrink-0" />}
    </button>
  )
}

// ─── Typography Card ───

function TypoCard({ preset, isActive, onApply }: { preset: TypographyPreset; isActive: boolean; onApply: () => void }) {
  return (
    <button
      onClick={onApply}
      className={cn(
        'w-full px-2.5 py-2 rounded-md transition-all text-left',
        isActive ? 'bg-wf-blue/15 ring-1 ring-wf-blue' : 'hover:bg-zinc-700/30'
      )}
    >
      <div className="flex items-baseline gap-2">
        <span
          className="text-[15px] text-white truncate"
          style={{ fontFamily: preset.heading, fontWeight: 600 }}
        >
          Aa
        </span>
        <span className="text-[11px] text-[#999] truncate flex-1">{preset.name}</span>
        {isActive && <Check className="w-3 h-3 text-wf-blue shrink-0" />}
      </div>
      <div className="text-[10px] text-zinc-500 mt-0.5 truncate">
        {preset.heading}{preset.heading !== preset.body && ` · ${preset.body}`}
      </div>
    </button>
  )
}

// ─── Tag Style Card ───

function TagStyleCard({ preset, onApply }: { preset: TagStylePreset; onApply: () => void }) {
  const h1 = preset.tagStyles.h1
  const body = preset.tagStyles.body
  return (
    <button
      onClick={onApply}
      className="w-full rounded-md border border-zinc-700/40 overflow-hidden transition-all hover:border-zinc-500 text-left group"
    >
      {/* Preview area */}
      <div className="bg-zinc-900 px-3 py-3">
        <div
          className="text-white truncate"
          style={{
            fontFamily: h1?.fontFamily ?? body?.fontFamily,
            fontSize: '15px',
            fontWeight: Number(h1?.fontWeight ?? 700),
            textTransform: h1?.textTransform as React.CSSProperties['textTransform'],
            letterSpacing: h1?.letterSpacing,
            lineHeight: 1.2,
          }}
        >
          Heading Style
        </div>
        <div
          className="text-[#999] mt-1 truncate"
          style={{
            fontFamily: body?.fontFamily,
            fontSize: '11px',
            lineHeight: 1.5,
          }}
        >
          Body text preview · {preset.description}
        </div>
      </div>
      {/* Footer */}
      <div className="px-3 py-1.5 bg-[#1e1e1e] border-t border-zinc-800 flex items-center gap-2">
        <span className="text-[10px] text-[#999] group-hover:text-white flex-1 truncate">{preset.name}</span>
        <span className="text-[9px] text-zinc-500 shrink-0">{preset.borderRadius} · {preset.spacing}</span>
      </div>
    </button>
  )
}

// ─── Theme Card ───

function ThemeCard({ theme, onApply }: { theme: typeof THEME_PRESETS[0]; onApply: () => void }) {
  const palette = getPaletteById(theme.paletteId)
  const typo = getTypographyById(theme.typographyId)
  const tagStyle = getTagStyleById(theme.tagStyleId)
  if (!palette || !typo || !tagStyle) return null
  const h1 = tagStyle.tagStyles.h1

  return (
    <button
      onClick={onApply}
      className="w-full rounded-md border border-zinc-700/40 overflow-hidden transition-all hover:border-zinc-500 text-left group"
    >
      <div className="px-3 py-2.5" style={{ backgroundColor: palette.colors.background }}>
        <div className="flex gap-px mb-2">
          {[palette.colors.primary, palette.colors.secondary, palette.colors.accent].map((c, i) => (
            <div key={i} className="w-6 h-2 first:rounded-l last:rounded-r" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div
          className="truncate"
          style={{
            color: palette.colors.foreground,
            fontFamily: typo.heading,
            fontSize: '14px',
            fontWeight: Number(h1?.fontWeight ?? 700),
            textTransform: h1?.textTransform as React.CSSProperties['textTransform'],
            letterSpacing: h1?.letterSpacing,
            lineHeight: 1.2,
          }}
        >
          {theme.name}
        </div>
        <div
          className="truncate mt-0.5"
          style={{ color: palette.colors.foreground, opacity: 0.4, fontFamily: typo.body, fontSize: '10px' }}
        >
          {theme.description}
        </div>
      </div>
    </button>
  )
}

// ─── Collapsible Section ───

function CollapsibleSection({
  label,
  count,
  defaultOpen = true,
  children,
}: {
  label: string
  count: number
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-1.5 py-1.5 hover:bg-zinc-700/30 rounded transition-colors"
      >
        <span className="text-[11px] font-semibold text-[#ccc] uppercase tracking-wide">
          {label} <span className="text-zinc-500 normal-case font-normal">{count}</span>
        </span>
        <ChevronDown className={cn('w-3 h-3 text-zinc-500 transition-transform', !open && '-rotate-90')} />
      </button>
      {open && <div className="pb-1">{children}</div>}
    </div>
  )
}

// ─── Style Family View ───

function StyleFamilyView({ family, onBack }: { family: StyleFamily; onBack: () => void }) {
  const {
    siteConfig, applyColorPalette, applyTypography, applyTagStylePreset, applyFullTheme,
  } = useEditorStore()
  const brand = siteConfig?.brand

  const palettes = family.paletteIds.map(id => COLOR_PALETTES.find(p => p.id === id)).filter(Boolean) as ColorPalettePreset[]
  const typos = family.typographyIds.map(id => TYPOGRAPHY_PRESETS.find(t => t.id === id)).filter(Boolean) as TypographyPreset[]
  const tagStyles = family.tagStyleIds.map(id => TAG_STYLE_PRESETS.find(t => t.id === id)).filter(Boolean) as TagStylePreset[]
  const themes = family.themeIds.map(id => THEME_PRESETS.find(t => t.id === id)).filter(Boolean) as typeof THEME_PRESETS

  const currentPaletteId = brand ? COLOR_PALETTES.find(p =>
    p.colors.primary === brand.colors.primary && p.colors.background === brand.colors.background
  )?.id : undefined

  const currentTypoId = brand ? TYPOGRAPHY_PRESETS.find(t =>
    t.heading === brand.typography.heading && t.body === brand.typography.body
  )?.id : undefined

  const handleApplyTheme = (theme: typeof THEME_PRESETS[0]) => {
    const palette = getPaletteById(theme.paletteId)
    const typo = getTypographyById(theme.typographyId)
    const tagStyle = getTagStyleById(theme.tagStyleId)
    if (!palette || !typo || !tagStyle) return
    applyFullTheme(palette.colors, typo.heading, typo.body, typo.size, tagStyle.tagStyles, tagStyle.borderRadius, tagStyle.spacing)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Back header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-3 py-2 border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors shrink-0 text-left"
      >
        <ChevronLeft className="w-3.5 h-3.5 text-zinc-500" />
        <FamilyIcon icon={family.icon} className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-[12px] font-medium text-white">{family.name}</span>
      </button>

      <ScrollArea className="flex-1">
        <div className="px-1.5 py-1 space-y-0.5">

          {/* Themes complets */}
          {themes.length > 0 && (
            <CollapsibleSection label="Themes complets" count={themes.length}>
              <div className="px-1.5 grid grid-cols-1 gap-1.5">
                {themes.map(theme => (
                  <ThemeCard key={theme.id} theme={theme} onApply={() => handleApplyTheme(theme)} />
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Palettes */}
          <CollapsibleSection label="Palettes de couleurs" count={palettes.length}>
            <div className="space-y-px">
              {palettes.map(palette => (
                <PaletteCard
                  key={palette.id}
                  preset={palette}
                  isActive={currentPaletteId === palette.id}
                  onApply={() => applyColorPalette(palette.colors)}
                />
              ))}
            </div>
          </CollapsibleSection>

          {/* Typography */}
          <CollapsibleSection label="Polices" count={typos.length}>
            <div className="space-y-px">
              {typos.map(preset => (
                <TypoCard
                  key={preset.id}
                  preset={preset}
                  isActive={currentTypoId === preset.id}
                  onApply={() => applyTypography(preset.heading, preset.body, preset.size)}
                />
              ))}
            </div>
          </CollapsibleSection>

          {/* Tag Styles */}
          <CollapsibleSection label="Styles globaux" count={tagStyles.length}>
            <div className="px-1.5 space-y-1.5">
              {tagStyles.map(preset => (
                <TagStyleCard
                  key={preset.id}
                  preset={preset}
                  onApply={() => applyTagStylePreset(preset.tagStyles, preset.borderRadius, preset.spacing)}
                />
              ))}
            </div>
          </CollapsibleSection>

        </div>
      </ScrollArea>
    </div>
  )
}

// ─── Main Panel ───

export function DesignPresetsPanel() {
  const [activeFamily, setActiveFamily] = useState<string | null>(null)

  const family = activeFamily ? STYLE_FAMILIES.find(f => f.id === activeFamily) : null

  if (family) {
    return <StyleFamilyView family={family} onBack={() => setActiveFamily(null)} />
  }

  return (
    <ScrollArea className="flex-1">
      <div className="px-1.5 py-1 space-y-0.5">
        {STYLE_FAMILIES.map(fam => (
          <button
            key={fam.id}
            onClick={() => setActiveFamily(fam.id)}
            className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-md transition-colors text-left hover:bg-zinc-700/30 group"
          >
            <div className="shrink-0 w-8 h-8 rounded-md bg-zinc-800 border border-zinc-700/50 flex items-center justify-center">
              <FamilyIcon icon={fam.icon} className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[12px] text-[#ccc] font-medium block group-hover:text-white transition-colors">{fam.name}</span>
              <span className="text-[10px] text-zinc-500 block truncate">{fam.description}</span>
              <div className="flex gap-1.5 mt-1">
                <span className="text-[9px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                  {fam.paletteIds.length} palettes
                </span>
                <span className="text-[9px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                  {fam.typographyIds.length} polices
                </span>
                <span className="text-[9px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                  {fam.themeIds.length} themes
                </span>
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-zinc-500 -rotate-90 group-hover:text-zinc-300 shrink-0 transition-colors" />
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}
