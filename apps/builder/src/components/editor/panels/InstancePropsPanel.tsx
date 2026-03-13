'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { Puzzle, RotateCcw, Unlink, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getByDotPath } from '@/lib/componentResolver'
import type { ComponentPropDef } from '@/types/components'

function PropField({ prop, sectionId, componentId }: {
  prop: ComponentPropDef
  sectionId: string
  componentId: string
}) {
  const { siteConfig, setInstancePropOverride, resetInstanceProp } = useEditorStore()

  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const comp = siteConfig?.components?.find(c => c.id === componentId)
  if (!section?.__componentInstance || !comp) return null

  const instance = section.__componentInstance
  const hasOverride = instance.propOverrides[prop.id] !== undefined
  const currentValue = hasOverride
    ? instance.propOverrides[prop.id]
    : getByDotPath(comp.sectionSnapshot.content, prop.contentPath) ?? prop.defaultValue

  const handleChange = (value: unknown) => {
    setInstancePropOverride(sectionId, prop.id, value)
  }

  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        'w-1 h-8 rounded-full shrink-0',
        hasOverride ? 'bg-orange-400' : 'bg-blue-400'
      )} />
      <div className="flex-1 min-w-0">
        <label className="text-[10px] text-zinc-500 mb-0.5 block">{prop.label}</label>
        {prop.type === 'text' && (
          <input
            type="text"
            value={String(currentValue ?? '')}
            onChange={e => handleChange(e.target.value)}
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
          />
        )}
        {prop.type === 'image' && (
          <input
            type="text"
            value={String(currentValue ?? '')}
            onChange={e => handleChange(e.target.value)}
            placeholder="Image URL"
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
          />
        )}
        {prop.type === 'link' && (
          <input
            type="text"
            value={String(currentValue ?? '')}
            onChange={e => handleChange(e.target.value)}
            placeholder="URL"
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
          />
        )}
        {prop.type === 'color' && (
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              value={String(currentValue ?? '#000000')}
              onChange={e => handleChange(e.target.value)}
              className="w-7 h-7 rounded border border-zinc-700 cursor-pointer"
            />
            <input
              type="text"
              value={String(currentValue ?? '')}
              onChange={e => handleChange(e.target.value)}
              className="flex-1 h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
            />
          </div>
        )}
        {prop.type === 'boolean' && (
          <button
            onClick={() => handleChange(!currentValue)}
            className={cn(
              'w-8 h-5 rounded-full transition-colors relative',
              currentValue ? 'bg-wf-blue' : 'bg-zinc-700'
            )}
          >
            <div className={cn(
              'absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
              currentValue ? 'translate-x-3.5' : 'translate-x-0.5'
            )} />
          </button>
        )}
        {prop.type === 'enum' && (
          <select
            value={String(currentValue ?? '')}
            onChange={e => handleChange(e.target.value)}
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
          >
            {prop.enumOptions?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        )}
      </div>
      {hasOverride && (
        <button
          onClick={() => resetInstanceProp(sectionId, prop.id)}
          title="Reset to default"
          className="p-1 text-orange-400 hover:text-orange-300 transition-colors shrink-0"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}

export function InstancePropsPanel({ sectionId }: { sectionId: string }) {
  const {
    siteConfig, enterComponentEditor, unlinkInstance, resetInstanceToMaster,
    setInstanceVariant,
  } = useEditorStore()

  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const instance = section?.__componentInstance
  if (!instance || instance.isUnlinked) return null

  const comp = siteConfig?.components?.find(c => c.id === instance.componentId)
  if (!comp) return null

  const props = comp.props ?? []
  const variants = comp.variants ?? []

  return (
    <>
      <PanelSection title="Component Instance">
        <div className="space-y-3">
          {/* Component name + go to master */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Puzzle className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-white font-medium truncate">{comp.name}</p>
              <p className="text-[9px] text-zinc-600">{comp.instanceCount} instance{comp.instanceCount !== 1 ? 's' : ''}</p>
            </div>
            <button
              onClick={() => enterComponentEditor(comp.id)}
              className="text-[10px] text-wf-blue hover:text-wf-blue/80 transition-colors"
            >
              Go to Master
            </button>
          </div>

          {/* Variant picker */}
          {variants.length > 0 && (
            <div>
              <label className="text-[10px] text-zinc-500 mb-1 block">Variant</label>
              <div className="relative">
                <select
                  value={instance.variantId ?? ''}
                  onChange={e => setInstanceVariant(sectionId, e.target.value || undefined)}
                  className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 pr-6 focus:outline-none focus:ring-1 focus:ring-wf-blue appearance-none"
                >
                  <option value="">Default</option>
                  {variants.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500 pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </PanelSection>

      {/* Props */}
      {props.length > 0 && (
        <PanelSection title="Properties">
          <div className="space-y-2.5">
            {props.map(prop => (
              <PropField key={prop.id} prop={prop} sectionId={sectionId} componentId={comp.id} />
            ))}
          </div>
        </PanelSection>
      )}

      {/* Actions */}
      <PanelSection title="Instance Actions">
        <div className="flex gap-2">
          <button
            onClick={() => resetInstanceToMaster(sectionId)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-zinc-800 text-zinc-300 text-[11px] rounded hover:bg-zinc-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          <button
            onClick={() => unlinkInstance(sectionId)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-zinc-800 text-red-400 text-[11px] rounded hover:bg-zinc-700 transition-colors"
          >
            <Unlink className="w-3 h-3" />
            Unlink
          </button>
        </div>
      </PanelSection>
    </>
  )
}
