'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FieldBoxModel } from '../fields/FieldBoxModel'
import { SegmentedControl } from '../fields/SegmentedControl'
import type { ElementLayoutStyle } from '@/types/elements'

interface LayoutPanelProps {
  sectionId: string
  elementId: string
}

const DISPLAY_OPTIONS = [
  { value: 'block', label: 'Block' },
  { value: 'flex', label: 'Flex' },
  { value: 'grid', label: 'Grid' },
  { value: 'inline-block', label: 'Inline' },
  { value: 'none', label: 'None' },
] as const

const FLEX_DIRECTION_OPTIONS = [
  { value: 'row', label: 'Row', icon: '→' },
  { value: 'column', label: 'Col', icon: '↓' },
  { value: 'row-reverse', label: 'Row ←', icon: '←' },
  { value: 'column-reverse', label: 'Col ↑', icon: '↑' },
] as const

const JUSTIFY_OPTIONS = [
  { value: 'flex-start', label: 'Start' },
  { value: 'center', label: 'Center' },
  { value: 'flex-end', label: 'End' },
  { value: 'space-between', label: 'Between' },
  { value: 'space-around', label: 'Around' },
  { value: 'space-evenly', label: 'Evenly' },
] as const

const ALIGN_OPTIONS = [
  { value: 'flex-start', label: 'Start' },
  { value: 'center', label: 'Center' },
  { value: 'flex-end', label: 'End' },
  { value: 'stretch', label: 'Stretch' },
  { value: 'baseline', label: 'Base' },
] as const

const POSITION_OPTIONS = [
  { value: 'static', label: 'Static' },
  { value: 'relative', label: 'Relative' },
  { value: 'absolute', label: 'Absolute' },
  { value: 'fixed', label: 'Fixed' },
  { value: 'sticky', label: 'Sticky' },
] as const

const OVERFLOW_OPTIONS = [
  { value: 'visible', label: 'Visible' },
  { value: 'hidden', label: 'Hidden' },
  { value: 'scroll', label: 'Scroll' },
  { value: 'auto', label: 'Auto' },
] as const

function SizeInput({
  label,
  value,
  onChange,
}: {
  label: string
  value?: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-1">
      <Label className="text-[10px] text-zinc-500">{label}</Label>
      <Input
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        placeholder="auto"
        className="bg-zinc-800 border-zinc-700 text-white text-xs h-7 placeholder:text-zinc-600 focus-visible:ring-wf-blue"
      />
    </div>
  )
}

export function LayoutPanel({ sectionId, elementId }: LayoutPanelProps) {
  const { siteConfig, updateCustomElementStyle } = useEditorStore()

  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  if (!section?.elements) return null

  const sectionElements = section?.elements
  // Find element in tree
  function findEl(elements: typeof sectionElements, id: string): NonNullable<typeof sectionElements>[number] | null {
    if (!elements) return null
    for (const el of elements) {
      if (el.id === id) return el
      if (el.children) {
        const found = findEl(el.children, id)
        if (found) return found
      }
    }
    return null
  }

  const element = findEl(sectionElements, elementId)
  if (!element) return null

  const style = element.style

  const update = (updates: Partial<ElementLayoutStyle>) => {
    updateCustomElementStyle(sectionId, elementId, updates)
  }

  const isFlex = style.display === 'flex'
  const isGrid = style.display === 'grid'
  const hasPosition = style.position && style.position !== 'static'

  return (
    <>
      {/* Display */}
      <PanelSection title="Display">
        <SegmentedControl
          options={DISPLAY_OPTIONS}
          value={style.display}
          onChange={v => update({ display: v })}
        />
      </PanelSection>

      {/* Flex */}
      {isFlex && (
        <PanelSection title="Flexbox">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300">Direction</Label>
              <SegmentedControl
                options={FLEX_DIRECTION_OPTIONS}
                value={style.flexDirection}
                onChange={v => update({ flexDirection: v })}
                small
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300">Wrap</Label>
              <SegmentedControl
                options={[
                  { value: 'nowrap' as const, label: 'No wrap' },
                  { value: 'wrap' as const, label: 'Wrap' },
                ]}
                value={style.flexWrap}
                onChange={v => update({ flexWrap: v })}
                small
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300">Justify</Label>
              <SegmentedControl
                options={JUSTIFY_OPTIONS}
                value={style.justifyContent}
                onChange={v => update({ justifyContent: v })}
                small
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300">Align</Label>
              <SegmentedControl
                options={ALIGN_OPTIONS}
                value={style.alignItems}
                onChange={v => update({ alignItems: v })}
                small
              />
            </div>

            <SizeInput
              label="Gap"
              value={style.gap}
              onChange={v => update({ gap: v || undefined })}
            />
          </div>
        </PanelSection>
      )}

      {/* Grid */}
      {isGrid && (
        <PanelSection title="Grid">
          <div className="space-y-3">
            <SizeInput
              label="Colonnes"
              value={style.gridTemplateColumns}
              onChange={v => update({ gridTemplateColumns: v || undefined })}
            />
            <SizeInput
              label="Lignes"
              value={style.gridTemplateRows}
              onChange={v => update({ gridTemplateRows: v || undefined })}
            />
            <SizeInput
              label="Gap"
              value={style.gridGap}
              onChange={v => update({ gridGap: v || undefined })}
            />
          </div>
        </PanelSection>
      )}

      {/* Sizing */}
      <PanelSection title="Dimensions" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <SizeInput label="Largeur" value={style.width} onChange={v => update({ width: v || undefined })} />
          <SizeInput label="Hauteur" value={style.height} onChange={v => update({ height: v || undefined })} />
          <SizeInput label="Min W" value={style.minWidth} onChange={v => update({ minWidth: v || undefined })} />
          <SizeInput label="Max W" value={style.maxWidth} onChange={v => update({ maxWidth: v || undefined })} />
          <SizeInput label="Min H" value={style.minHeight} onChange={v => update({ minHeight: v || undefined })} />
          <SizeInput label="Max H" value={style.maxHeight} onChange={v => update({ maxHeight: v || undefined })} />
        </div>
      </PanelSection>

      {/* Spacing (Box Model) */}
      <PanelSection title="Espacement">
        <FieldBoxModel
          values={{
            marginTop: style.marginTop,
            marginRight: style.marginRight,
            marginBottom: style.marginBottom,
            marginLeft: style.marginLeft,
            paddingTop: style.paddingTop,
            paddingRight: style.paddingRight,
            paddingBottom: style.paddingBottom,
            paddingLeft: style.paddingLeft,
          }}
          onChange={(key, value) => update({ [key]: value || undefined })}
        />
      </PanelSection>

      {/* Position */}
      <PanelSection title="Position" defaultOpen={false}>
        <div className="space-y-3">
          <SegmentedControl
            options={POSITION_OPTIONS}
            value={style.position}
            onChange={v => update({ position: v })}
            small
          />

          {hasPosition && (
            <div className="grid grid-cols-2 gap-2">
              <SizeInput label="Top" value={style.top} onChange={v => update({ top: v || undefined })} />
              <SizeInput label="Right" value={style.right} onChange={v => update({ right: v || undefined })} />
              <SizeInput label="Bottom" value={style.bottom} onChange={v => update({ bottom: v || undefined })} />
              <SizeInput label="Left" value={style.left} onChange={v => update({ left: v || undefined })} />
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-[10px] text-zinc-500">Z-Index</Label>
              <Input
                type="number"
                value={style.zIndex ?? ''}
                onChange={e => update({ zIndex: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="auto"
                className="bg-zinc-800 border-zinc-700 text-white text-xs h-7 placeholder:text-zinc-600 focus-visible:ring-wf-blue"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-zinc-500">Overflow</Label>
              <select
                value={style.overflow ?? ''}
                onChange={e => update({ overflow: (e.target.value || undefined) as ElementLayoutStyle['overflow'] })}
                className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
              >
                <option value="">Auto</option>
                {OVERFLOW_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </PanelSection>
    </>
  )
}
