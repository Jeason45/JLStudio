'use client'
import { useState, useCallback } from 'react'
import { Plus, X, ChevronDown, ChevronRight, ArrowUp, ArrowDown, Image as ImageIcon, Blend } from 'lucide-react'
import { GradientEditor } from './GradientEditor'
import { cn } from '@/lib/utils'

export interface BackgroundLayer {
  type: 'gradient' | 'image'
  value: string        // CSS gradient string or URL
  size?: string        // cover, contain, auto, custom
  position?: string    // center, top left, etc.
  repeat?: string      // no-repeat, repeat, etc.
  attachment?: string   // scroll, fixed
  blendMode?: string
  customWidth?: string
  customHeight?: string
  positionLeft?: string
  positionTop?: string
}

interface BackgroundLayerEditorProps {
  value: string // JSON-stringified BackgroundLayer[]
  onChange: (value: string) => void
}

const INPUT = 'w-full h-6 bg-[#111] border border-[#333] text-[#e0e0e0] text-[10px] rounded px-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue'
const SELECT = 'w-full h-6 bg-[#383838] border border-[#4a4a4a] text-[#e0e0e0] text-[10px] rounded px-1 focus:outline-none focus:ring-1 focus:ring-wf-blue cursor-pointer'

const BLEND_MODES = [
  'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
  'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
  'exclusion', 'hue', 'saturation', 'color', 'luminosity',
]

const POSITION_GRID = [
  ['top left', 'top center', 'top right'],
  ['center left', 'center', 'center right'],
  ['bottom left', 'bottom center', 'bottom right'],
]

const TILE_OPTIONS: { value: string; label: string; icon: string }[] = [
  { value: 'repeat', label: 'Repeat both', icon: '⊞' },
  { value: 'repeat-x', label: 'Repeat X', icon: '⊟' },
  { value: 'repeat-y', label: 'Repeat Y', icon: '⊞' },
  { value: 'no-repeat', label: 'No repeat', icon: '×' },
]

function parseLayers(raw: string): BackgroundLayer[] {
  if (!raw?.trim()) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function serializeLayers(layers: BackgroundLayer[]): string {
  return layers.length > 0 ? JSON.stringify(layers) : ''
}

/** Generate multi-value CSS from background layers */
export function layersToCSS(layers: BackgroundLayer[]): React.CSSProperties {
  if (!layers.length) return {}
  const images: string[] = []
  const sizes: string[] = []
  const positions: string[] = []
  const repeats: string[] = []
  const blendModes: string[] = []

  for (const layer of layers) {
    if (layer.type === 'gradient') {
      images.push(layer.value)
    } else {
      images.push(`url(${layer.value})`)
    }
    // Size
    if (layer.size === 'custom') {
      sizes.push(`${layer.customWidth || 'auto'} ${layer.customHeight || 'auto'}`)
    } else {
      sizes.push(layer.size || 'cover')
    }
    // Position
    if (layer.positionLeft || layer.positionTop) {
      positions.push(`${layer.positionLeft || '0px'} ${layer.positionTop || '0px'}`)
    } else {
      positions.push(layer.position || 'center')
    }
    repeats.push(layer.repeat || 'no-repeat')
    blendModes.push(layer.blendMode || 'normal')
  }

  return {
    backgroundImage: images.join(', '),
    backgroundSize: sizes.join(', '),
    backgroundPosition: positions.join(', '),
    backgroundRepeat: repeats.join(', '),
    backgroundBlendMode: blendModes.join(', ') as React.CSSProperties['backgroundBlendMode'],
  }
}

/** Generate multi-value CSS string from background layers */
export function layersToCSSString(layers: BackgroundLayer[]): string {
  if (!layers.length) return ''
  const parts: string[] = []
  const css = layersToCSS(layers)
  if (css.backgroundImage) parts.push(`background-image: ${css.backgroundImage}`)
  if (css.backgroundSize) parts.push(`background-size: ${css.backgroundSize}`)
  if (css.backgroundPosition) parts.push(`background-position: ${css.backgroundPosition}`)
  if (css.backgroundRepeat) parts.push(`background-repeat: ${css.backgroundRepeat}`)
  if (css.backgroundBlendMode) parts.push(`background-blend-mode: ${css.backgroundBlendMode}`)
  return parts.join('; ')
}

function LayerPreview({ layer }: { layer: BackgroundLayer }) {
  if (layer.type === 'gradient') {
    return (
      <div
        className="w-5 h-5 rounded-sm border border-zinc-600 shrink-0"
        style={{ background: layer.value }}
      />
    )
  }
  return (
    <div
      className="w-5 h-5 rounded-sm border border-zinc-600 shrink-0 bg-cover bg-center"
      style={layer.value ? { backgroundImage: `url(${layer.value})` } : { backgroundColor: '#333' }}
    />
  )
}

/** Filename from URL */
function urlFilename(url: string): string {
  if (!url) return ''
  try {
    const parts = new URL(url).pathname.split('/')
    return parts[parts.length - 1] || url
  } catch {
    return url.split('/').pop() || url
  }
}

// ─── Image layer expanded UI (Webflow-style) ───

function ImageLayerEditor({ layer, onUpdate }: { layer: BackgroundLayer; onUpdate: (patch: Partial<BackgroundLayer>) => void }) {
  const sizeMode = layer.size === 'custom' ? 'custom' : (layer.size || 'cover')
  const filename = urlFilename(layer.value)

  return (
    <div className="space-y-3">
      {/* Image preview + info */}
      <div className="flex gap-2">
        <div
          className="w-[72px] h-[72px] rounded border border-[#444] bg-[#222] bg-cover bg-center shrink-0"
          style={layer.value ? { backgroundImage: `url(${layer.value})` } : undefined}
        />
        <div className="flex-1 min-w-0 space-y-1">
          <p className="text-[10px] text-[#ccc] truncate">{filename || 'No image'}</p>
          <input
            value={layer.value}
            onChange={e => onUpdate({ value: e.target.value })}
            placeholder="https://...image.png"
            className={cn(INPUT, 'text-[9px]')}
          />
        </div>
      </div>

      {/* Size — Custom | Cover | Contain */}
      <div>
        <label className="text-[9px] text-[#888] mb-1 block">Size</label>
        <div className="flex gap-0 mb-1.5">
          {(['custom', 'cover', 'contain'] as const).map(v => (
            <button
              key={v}
              onClick={() => onUpdate({ size: v })}
              className={cn(
                'flex-1 h-6 text-[10px] border border-[#4a4a4a] first:rounded-l last:rounded-r -ml-px first:ml-0 capitalize',
                sizeMode === v ? 'bg-[#111] text-white border-[#555]' : 'bg-[#383838] text-[#999] hover:text-white'
              )}
            >
              {v === 'custom' ? 'Custom' : v === 'cover' ? 'Cover' : 'Contain'}
            </button>
          ))}
        </div>
        {sizeMode === 'custom' && (
          <div className="flex gap-1.5">
            <div className="flex-1 min-w-0">
              <div className="flex h-6">
                <input
                  value={layer.customWidth?.replace(/[a-z%]+$/i, '') || ''}
                  onChange={e => onUpdate({ customWidth: e.target.value ? `${e.target.value}${layer.customWidth?.match(/[a-z%]+$/i)?.[0] || 'px'}` : '' })}
                  placeholder="Auto"
                  className="flex-1 min-w-0 h-6 bg-[#111] border border-[#333] text-[#e0e0e0] text-[10px] rounded-l px-1.5 focus:outline-none"
                />
                <select
                  value={layer.customWidth?.match(/[a-z%]+$/i)?.[0] || '-'}
                  onChange={e => {
                    const num = layer.customWidth?.replace(/[a-z%]+$/i, '') || ''
                    onUpdate({ customWidth: num && e.target.value !== '-' ? `${num}${e.target.value}` : num || '' })
                  }}
                  className="h-6 bg-[#383838] border border-[#4a4a4a] border-l-0 text-[#999] text-[9px] rounded-r px-0.5 focus:outline-none cursor-pointer"
                >
                  <option value="-">-</option>
                  <option value="px">PX</option>
                  <option value="%">%</option>
                  <option value="vw">VW</option>
                </select>
              </div>
              <label className="text-[8px] text-[#666] text-center block mt-0.5">Width</label>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex h-6">
                <input
                  value={layer.customHeight?.replace(/[a-z%]+$/i, '') || ''}
                  onChange={e => onUpdate({ customHeight: e.target.value ? `${e.target.value}${layer.customHeight?.match(/[a-z%]+$/i)?.[0] || 'px'}` : '' })}
                  placeholder="Auto"
                  className="flex-1 min-w-0 h-6 bg-[#111] border border-[#333] text-[#e0e0e0] text-[10px] rounded-l px-1.5 focus:outline-none"
                />
                <select
                  value={layer.customHeight?.match(/[a-z%]+$/i)?.[0] || '-'}
                  onChange={e => {
                    const num = layer.customHeight?.replace(/[a-z%]+$/i, '') || ''
                    onUpdate({ customHeight: num && e.target.value !== '-' ? `${num}${e.target.value}` : num || '' })
                  }}
                  className="h-6 bg-[#383838] border border-[#4a4a4a] border-l-0 text-[#999] text-[9px] rounded-r px-0.5 focus:outline-none cursor-pointer"
                >
                  <option value="-">-</option>
                  <option value="px">PX</option>
                  <option value="%">%</option>
                  <option value="vh">VH</option>
                </select>
              </div>
              <label className="text-[8px] text-[#666] text-center block mt-0.5">Height</label>
            </div>
          </div>
        )}
      </div>

      {/* Position — 3x3 grid + Left/Top inputs */}
      <div>
        <label className="text-[9px] text-[#888] mb-1 block">Position</label>
        <div className="flex gap-3 items-start">
          {/* 3x3 dot grid */}
          <div className="grid grid-cols-3 gap-0 shrink-0">
            {POSITION_GRID.flat().map(pos => {
              const current = layer.position || 'center'
              const isActive = current === pos || (current === 'center center' && pos === 'center')
              return (
                <button
                  key={pos}
                  onClick={() => onUpdate({ position: pos, positionLeft: undefined, positionTop: undefined })}
                  className={cn(
                    'w-4 h-4 flex items-center justify-center',
                    isActive ? 'text-white' : 'text-[#555] hover:text-[#999]'
                  )}
                >
                  <span className={cn('w-1.5 h-1.5 rounded-full', isActive ? 'bg-white' : 'bg-current')} />
                </button>
              )
            })}
          </div>
          {/* Left / Top inputs */}
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-1">
              <label className="text-[8px] text-[#888] w-6 shrink-0">Left</label>
              <input
                value={layer.positionLeft?.replace(/[a-z%]+$/i, '') || '0'}
                onChange={e => onUpdate({ positionLeft: `${e.target.value}px`, position: undefined })}
                className="flex-1 min-w-0 h-5 bg-[#111] border border-[#333] text-[#e0e0e0] text-[10px] rounded px-1 focus:outline-none text-center"
              />
              <span className="text-[8px] text-[#666] w-5 shrink-0">PX</span>
            </div>
            <div className="flex items-center gap-1">
              <label className="text-[8px] text-[#888] w-6 shrink-0">Top</label>
              <input
                value={layer.positionTop?.replace(/[a-z%]+$/i, '') || '0'}
                onChange={e => onUpdate({ positionTop: `${e.target.value}px`, position: undefined })}
                className="flex-1 min-w-0 h-5 bg-[#111] border border-[#333] text-[#e0e0e0] text-[10px] rounded px-1 focus:outline-none text-center"
              />
              <span className="text-[8px] text-[#666] w-5 shrink-0">PX</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tile (repeat) */}
      <div>
        <label className="text-[9px] text-[#888] mb-1 block">Tile</label>
        <div className="flex gap-0">
          {TILE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => onUpdate({ repeat: opt.value })}
              className={cn(
                'flex-1 h-6 text-[10px] border border-[#4a4a4a] first:rounded-l last:rounded-r -ml-px first:ml-0',
                (layer.repeat || 'no-repeat') === opt.value
                  ? 'bg-[#111] text-white border-[#555]'
                  : 'bg-[#383838] text-[#999] hover:text-white'
              )}
              title={opt.label}
            >
              {opt.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Fixed (attachment) */}
      <div>
        <label className="text-[9px] text-[#888] mb-1 block">Fixed</label>
        <div className="flex gap-0">
          {([['fixed', 'Fixed'], ['scroll', 'Not fixed']] as const).map(([v, lbl]) => (
            <button
              key={v}
              onClick={() => onUpdate({ attachment: v })}
              className={cn(
                'flex-1 h-6 text-[10px] border border-[#4a4a4a] first:rounded-l last:rounded-r -ml-px first:ml-0',
                (layer.attachment || 'scroll') === v
                  ? 'bg-[#111] text-white border-[#555]'
                  : 'bg-[#383838] text-[#999] hover:text-white'
              )}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───

export function BackgroundLayerEditor({ value, onChange }: BackgroundLayerEditorProps) {
  const [expanded, setExpanded] = useState<number | null>(null)
  const layers = parseLayers(value)

  const emit = useCallback((next: BackgroundLayer[]) => {
    onChange(serializeLayers(next))
  }, [onChange])

  const updateLayer = (idx: number, patch: Partial<BackgroundLayer>) => {
    const next = [...layers]
    next[idx] = { ...next[idx], ...patch }
    emit(next)
  }

  const addGradient = () => {
    const next = [...layers, { type: 'gradient' as const, value: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)' }]
    emit(next)
    setExpanded(next.length - 1)
  }

  const addImage = () => {
    const next = [...layers, { type: 'image' as const, value: '', size: 'cover', position: 'center', repeat: 'no-repeat', attachment: 'scroll' }]
    emit(next)
    setExpanded(next.length - 1)
  }

  const remove = (idx: number) => {
    emit(layers.filter((_, i) => i !== idx))
    setExpanded(null)
  }

  const moveUp = (idx: number) => {
    if (idx === 0) return
    const next = [...layers]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    emit(next)
    setExpanded(idx - 1)
  }

  const moveDown = (idx: number) => {
    if (idx >= layers.length - 1) return
    const next = [...layers]
    ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
    emit(next)
    setExpanded(idx + 1)
  }

  if (layers.length === 0) return null

  return (
    <div>
      {/* Composite preview */}
      {layers.length > 0 && (
        <div
          className="w-full h-10 rounded border border-[#444] mt-1"
          style={layersToCSS(layers)}
        />
      )}

      {layers.map((layer, i) => (
        <div key={i} className="mt-1 border border-[#444] rounded overflow-hidden">
          {/* Layer header */}
          <button
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full flex items-center gap-1.5 px-2 py-1 text-[10px] text-[#ccc] hover:bg-[#2a2a2a] transition-colors"
          >
            {expanded === i ? <ChevronDown className="w-2.5 h-2.5 text-[#888]" /> : <ChevronRight className="w-2.5 h-2.5 text-[#888]" />}
            <LayerPreview layer={layer} />
            <span className="flex-1 text-left truncate">
              {layer.type === 'gradient' ? 'Gradient' : urlFilename(layer.value) || 'Image'}
            </span>
            <div className="flex items-center gap-0.5">
              <button onClick={e => { e.stopPropagation(); moveUp(i) }} className="p-0.5 text-[#666] hover:text-white disabled:opacity-30" disabled={i === 0}>
                <ArrowUp className="w-2.5 h-2.5" />
              </button>
              <button onClick={e => { e.stopPropagation(); moveDown(i) }} className="p-0.5 text-[#666] hover:text-white disabled:opacity-30" disabled={i === layers.length - 1}>
                <ArrowDown className="w-2.5 h-2.5" />
              </button>
              <button onClick={e => { e.stopPropagation(); remove(i) }} className="p-0.5 text-[#666] hover:text-red-400">
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          </button>

          {/* Layer expanded content */}
          {expanded === i && (
            <div className="px-2.5 pb-2.5 pt-1 bg-[#1a1a1a]">
              {layer.type === 'gradient' ? (
                <div className="space-y-1.5">
                  <GradientEditor
                    value={layer.value}
                    onChange={v => updateLayer(i, { value: v })}
                  />
                  {/* Blend Mode */}
                  <div>
                    <label className="text-[9px] text-[#888]">Blend Mode</label>
                    <select value={layer.blendMode || 'normal'} onChange={e => updateLayer(i, { blendMode: e.target.value })} className={SELECT}>
                      {BLEND_MODES.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
              ) : (
                <ImageLayerEditor layer={layer} onUpdate={patch => updateLayer(i, patch)} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
