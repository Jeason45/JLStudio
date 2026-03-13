'use client'
import { useState } from 'react'
import { MoreHorizontal, Plus, RotateCcw } from 'lucide-react'

/* ───────── types ───────── */
interface TransformValues {
  moveX: string; moveY: string; moveZ: string
  moveXUnit: string; moveYUnit: string; moveZUnit: string
  scaleX: string; scaleY: string; scaleZ: string
  rotateX: string; rotateY: string; rotateZ: string
  skewX: string; skewY: string
}

interface TransformEditorProps {
  label: string
  value: string
  onChange: (value: string) => void
  transformOrigin?: string
  onTransformOriginChange?: (value: string) => void
  backfaceVisibility?: string
  onBackfaceVisibilityChange?: (value: string) => void
  perspective?: string
  onPerspectiveChange?: (value: string) => void
  transformStyle?: string
  onTransformStyleChange?: (value: string) => void
  childrenPerspective?: string
  onChildrenPerspectiveChange?: (value: string) => void
  perspectiveOrigin?: string
  onPerspectiveOriginChange?: (value: string) => void
}

type Tab = 'move' | 'scale' | 'rotate' | 'skew'

/* ───────── defaults ───────── */
const DEFAULTS: TransformValues = {
  moveX: '0', moveY: '0', moveZ: '0',
  moveXUnit: 'px', moveYUnit: 'px', moveZUnit: 'px',
  scaleX: '1', scaleY: '1', scaleZ: '1',
  rotateX: '0', rotateY: '0', rotateZ: '0',
  skewX: '0', skewY: '0',
}

/* ───────── dark input class (quasi-noir comme Webflow) ───────── */
const DARK_INPUT = 'h-6 bg-[#111] border border-[#333] text-[#e0e0e0] text-[11px] text-center rounded focus:outline-none focus:ring-1 focus:ring-blue-500'

/* ───────── parse / serialize ───────── */
function parseTransform(raw: string): TransformValues {
  const v = { ...DEFAULTS }
  if (!raw?.trim()) return v
  const r = (name: string) => {
    const m = raw.match(new RegExp(`${name}\\(([^)]+)\\)`))
    return m ? m[1] : null
  }
  const extractUnit = (s: string): string => s.match(/[a-z%]+$/i)?.[0] || 'px'
  const t3d = raw.match(/translate3d\(([^)]+)\)/)
  if (t3d) {
    const [x, y, z] = t3d[1].split(',').map(s => s.trim())
    v.moveX = parseFloat(x).toString(); v.moveXUnit = extractUnit(x)
    v.moveY = parseFloat(y).toString(); v.moveYUnit = extractUnit(y)
    v.moveZ = parseFloat(z).toString(); v.moveZUnit = extractUnit(z)
  } else {
    const tx = r('translateX'); if (tx) { v.moveX = parseFloat(tx).toString(); v.moveXUnit = extractUnit(tx) }
    const ty = r('translateY'); if (ty) { v.moveY = parseFloat(ty).toString(); v.moveYUnit = extractUnit(ty) }
    const tz = r('translateZ'); if (tz) { v.moveZ = parseFloat(tz).toString(); v.moveZUnit = extractUnit(tz) }
  }
  const s3d = raw.match(/scale3d\(([^)]+)\)/)
  if (s3d) {
    const [x, y, z] = s3d[1].split(',').map(s => s.trim())
    v.scaleX = x; v.scaleY = y; v.scaleZ = z
  } else {
    const sx = r('scaleX'); if (sx) v.scaleX = sx
    const sy = r('scaleY'); if (sy) v.scaleY = sy
    const sz = r('scaleZ'); if (sz) v.scaleZ = sz
    const sc = raw.match(/(?<![XYZ3])scale\(([^)]+)\)/)
    if (sc) {
      const parts = sc[1].split(',').map(s => s.trim())
      v.scaleX = parts[0]; v.scaleY = parts[1] || parts[0]; v.scaleZ = '1'
    }
  }
  const rx = r('rotateX'); if (rx) v.rotateX = parseFloat(rx).toString()
  const ry = r('rotateY'); if (ry) v.rotateY = parseFloat(ry).toString()
  const rz = r('rotateZ'); if (rz) v.rotateZ = parseFloat(rz).toString()
  const plainR = raw.match(/(?<![XYZ3])rotate\(([^)]+)\)/)
  if (plainR) v.rotateZ = parseFloat(plainR[1]).toString()
  const skx = r('skewX'); if (skx) v.skewX = parseFloat(skx).toString()
  const sky = r('skewY'); if (sky) v.skewY = parseFloat(sky).toString()
  const plainSk = raw.match(/(?<![XY])skew\(([^)]+)\)/)
  if (plainSk) {
    const parts = plainSk[1].split(',').map(s => s.trim())
    v.skewX = parseFloat(parts[0]).toString()
    if (parts[1]) v.skewY = parseFloat(parts[1]).toString()
  }
  return v
}

function serializeTransform(v: TransformValues): string {
  const parts: string[] = []
  if (v.moveX !== '0' || v.moveY !== '0' || v.moveZ !== '0') {
    if (v.moveZ !== '0') {
      parts.push(`translate3d(${v.moveX}${v.moveXUnit}, ${v.moveY}${v.moveYUnit}, ${v.moveZ}${v.moveZUnit})`)
    } else {
      if (v.moveX !== '0') parts.push(`translateX(${v.moveX}${v.moveXUnit})`)
      if (v.moveY !== '0') parts.push(`translateY(${v.moveY}${v.moveYUnit})`)
    }
  }
  if (v.scaleX !== '1' || v.scaleY !== '1' || v.scaleZ !== '1') {
    if (v.scaleZ !== '1') {
      parts.push(`scale3d(${v.scaleX}, ${v.scaleY}, ${v.scaleZ})`)
    } else if (v.scaleX === v.scaleY) {
      parts.push(`scale(${v.scaleX})`)
    } else {
      parts.push(`scaleX(${v.scaleX})`)
      parts.push(`scaleY(${v.scaleY})`)
    }
  }
  if (v.rotateX !== '0') parts.push(`rotateX(${v.rotateX}deg)`)
  if (v.rotateY !== '0') parts.push(`rotateY(${v.rotateY}deg)`)
  if (v.rotateZ !== '0') parts.push(`rotateZ(${v.rotateZ}deg)`)
  if (v.skewX !== '0') parts.push(`skewX(${v.skewX}deg)`)
  if (v.skewY !== '0') parts.push(`skewY(${v.skewY}deg)`)
  return parts.join(' ')
}

function hasNonDefault(v: TransformValues): boolean {
  return Object.entries(v).some(([k, val]) => val !== DEFAULTS[k as keyof TransformValues])
}

function tabSummary(tab: Tab, v: TransformValues): string {
  switch (tab) {
    case 'move': return `Move: ${v.moveX}, ${v.moveY}, ${v.moveZ}`
    case 'scale': return `Scale: ${v.scaleX}, ${v.scaleY}, ${v.scaleZ}`
    case 'rotate': return `Rotate: ${v.rotateX}deg, ${v.rotateY}deg, ${v.rotateZ}deg`
    case 'skew': return `Skew: ${v.skewX}deg, ${v.skewY}deg`
  }
}

function tabHasValues(tab: Tab, v: TransformValues): boolean {
  switch (tab) {
    case 'move': return v.moveX !== '0' || v.moveY !== '0' || v.moveZ !== '0'
    case 'scale': return v.scaleX !== '1' || v.scaleY !== '1' || v.scaleZ !== '1'
    case 'rotate': return v.rotateX !== '0' || v.rotateY !== '0' || v.rotateZ !== '0'
    case 'skew': return v.skewX !== '0' || v.skewY !== '0'
  }
}

/* ───────── origin ───────── */
const ORIGIN_POINTS = [
  ['top left', 'top center', 'top right'],
  ['center left', 'center center', 'center right'],
  ['bottom left', 'bottom center', 'bottom right'],
]

function parseOrigin(val: string): { x: string; y: string } {
  const v = (val || '50% 50%').replace(/^center$/, '50% 50%').replace(/^center center$/, '50% 50%')
  const map: Record<string, { x: string; y: string }> = {
    'top left': { x: '0', y: '0' }, 'top center': { x: '50', y: '0' }, 'top right': { x: '100', y: '0' },
    'center left': { x: '0', y: '50' }, 'center center': { x: '50', y: '50' }, 'center right': { x: '100', y: '50' },
    'bottom left': { x: '0', y: '100' }, 'bottom center': { x: '50', y: '100' }, 'bottom right': { x: '100', y: '100' },
  }
  if (map[v]) return map[v]
  const m = v.match(/^([\d.]+)%?\s+([\d.]+)%?$/)
  if (m) return { x: m[1], y: m[2] }
  return { x: '50', y: '50' }
}

/* Webflow layout: grid on left, Left/Top stacked vertically on right */
function OriginGrid({ value, onChange, label: lbl }: { value: string; onChange: (v: string) => void; label?: string }) {
  const parsed = parseOrigin(value)
  const currentGrid = `${parsed.x}-${parsed.y}`

  return (
    <div className="flex items-start gap-2">
      {lbl && <span className="text-[11px] text-[#999] w-10 shrink-0 pt-1">{lbl}</span>}
      <div className="shrink-0 grid grid-cols-3 rounded border border-[#333]" style={{ width: 42, height: 42, background: '#111' }}>
        {ORIGIN_POINTS.flat().map(pt => {
          const { x, y } = parseOrigin(pt)
          const key = `${x}-${y}`
          const isActive = currentGrid === key
          return (
            <button key={pt} onClick={() => onChange(`${x}% ${y}%`)} className="flex items-center justify-center">
              <div className={`rounded-full transition-colors ${isActive ? 'w-[7px] h-[7px] bg-white border border-[#666]' : 'w-[4px] h-[4px] bg-[#555] hover:bg-[#999]'}`} />
            </button>
          )
        })}
      </div>
      {/* Left / Top stacked vertically */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-[#777] w-6 shrink-0">Left</span>
          <input value={parsed.x} onChange={e => {
            const nx = e.target.value || '50'
            onChange(`${nx}% ${parsed.y}%`)
          }} className={`${DARK_INPUT} flex-1 min-w-0`} />
          <span className="text-[10px] text-[#666] w-4 text-right shrink-0">%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-[#777] w-6 shrink-0">Top</span>
          <input value={parsed.y} onChange={e => {
            const ny = e.target.value || '50'
            onChange(`${parsed.x}% ${ny}%`)
          }} className={`${DARK_INPUT} flex-1 min-w-0`} />
          <span className="text-[10px] text-[#666] w-4 text-right shrink-0">%</span>
        </div>
      </div>
    </div>
  )
}

/* ───────── axis row ───────── */
function AxisRow({ axis, value, onChange, unit, min, max, step, linkable, linked, onToggleLink, unitOptions, currentUnit, onUnitChange }: {
  axis: string; value: string; onChange: (v: string) => void; unit: string
  min: number; max: number; step: number
  linkable?: boolean; linked?: boolean; onToggleLink?: () => void
  unitOptions?: string[]; currentUnit?: string; onUnitChange?: (u: string) => void
}) {
  const numVal = parseFloat(value) || 0
  return (
    <div className="flex items-center gap-1.5 h-7">
      <span className="text-[11px] text-[#666] w-3 shrink-0">{axis}</span>
      <input type="range" min={min} max={max} step={step} value={numVal}
        onChange={e => onChange(e.target.value)}
        className="flex-1 h-1 accent-white cursor-pointer" />
      <input value={value} onChange={e => onChange(e.target.value)}
        className={`w-12 ${DARK_INPUT}`} />
      {unitOptions && onUnitChange ? (
        <select value={currentUnit || 'px'} onChange={e => onUnitChange(e.target.value)}
          className="w-[38px] h-6 bg-[#111] border border-[#333] text-[#e0e0e0] text-[10px] rounded px-0.5 cursor-pointer focus:outline-none shrink-0">
          {unitOptions.map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
        </select>
      ) : (
        <span className="text-[10px] text-[#666] w-5 text-right shrink-0">{unit}</span>
      )}
      {linkable && (
        <button onClick={onToggleLink} className={`ml-0.5 text-[11px] shrink-0 ${linked ? 'text-blue-400' : 'text-[#555] hover:text-[#999]'}`} title="Link axes">
          ⛓
        </button>
      )}
    </div>
  )
}

/* ───────── main component ───────── */
export function TransformEditor({
  label, value, onChange,
  transformOrigin, onTransformOriginChange,
  backfaceVisibility, onBackfaceVisibilityChange,
  perspective, onPerspectiveChange,
  transformStyle, onTransformStyleChange,
  childrenPerspective, onChildrenPerspectiveChange,
  perspectiveOrigin, onPerspectiveOriginChange,
}: TransformEditorProps) {
  const [showTabs, setShowTabs] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('move')
  const [showSettings, setShowSettings] = useState(false)
  const [scaleLinked, setScaleLinked] = useState(true)
  const vals = parseTransform(value)
  const active = hasNonDefault(vals)

  const set = (key: keyof TransformValues, v: string) => {
    const next = { ...vals, [key]: v }
    if (scaleLinked && (key === 'scaleX' || key === 'scaleY' || key === 'scaleZ')) {
      next.scaleX = v; next.scaleY = v; next.scaleZ = v
    }
    onChange(serializeTransform(next))
  }

  const resetTab = () => {
    const next = { ...vals }
    switch (activeTab) {
      case 'move': next.moveX = '0'; next.moveY = '0'; next.moveZ = '0'; break
      case 'scale': next.scaleX = '1'; next.scaleY = '1'; next.scaleZ = '1'; break
      case 'rotate': next.rotateX = '0'; next.rotateY = '0'; next.rotateZ = '0'; break
      case 'skew': next.skewX = '0'; next.skewY = '0'; break
    }
    onChange(serializeTransform(next))
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: 'move', label: 'Move' },
    { key: 'scale', label: 'Scale' },
    { key: 'rotate', label: 'Rotate' },
    { key: 'skew', label: 'Skew' },
  ]

  const selfPersp = parseFloat(perspective || '0') || 0
  const childPersp = parseFloat(childrenPerspective || '0') || 0

  return (
    <div>
      {/* Header: label + ... + + */}
      <div className="flex items-center justify-between min-h-[24px]">
        <span className="text-[10px] text-zinc-500">{label}</span>
        <div className="flex items-center gap-0.5">
          <button onClick={() => { setShowSettings(!showSettings); if (!showSettings) setShowTabs(false) }}
            className={`p-0.5 transition-colors ${showSettings ? 'text-white' : 'text-zinc-600 hover:text-white'}`}
            title="Transform settings">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => { setShowTabs(!showTabs); if (!showTabs) setShowSettings(false) }}
            className={`p-0.5 transition-colors ${showTabs ? 'text-white' : 'text-zinc-600 hover:text-white'}`}
            title="Edit transforms">
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Tabs panel (opened by +) */}
      {showTabs && (
        <div className="mt-1.5">
          {/* Summary line when has transforms */}
          {active && tabHasValues(activeTab, vals) && (
            <div className="mb-1.5 flex items-center gap-1.5">
              <button onClick={resetTab} className="p-0.5 text-[#666] hover:text-white" title="Reset">
                <RotateCcw className="w-3 h-3" />
              </button>
              <span className="text-[10px] text-[#999] truncate">{tabSummary(activeTab, vals)}</span>
            </div>
          )}

          {/* Tab buttons */}
          <div className="flex rounded overflow-hidden border border-[#333]">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`flex-1 h-7 text-[11px] transition-colors border-r border-[#333] last:border-r-0 ${activeTab === t.key
                  ? 'bg-[#111] text-white'
                  : 'bg-[#333] text-[#999] hover:text-white'}`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Axis sliders */}
          <div className="mt-1.5 space-y-0.5">
            {activeTab === 'move' && (
              <>
                <AxisRow axis="X" value={vals.moveX} onChange={v => set('moveX', v)} unit={vals.moveXUnit.toUpperCase()} min={vals.moveXUnit === '%' ? -100 : -500} max={vals.moveXUnit === '%' ? 100 : 500} step={1}
                  unitOptions={['px', '%', 'em', 'rem', 'vw', 'vh']} currentUnit={vals.moveXUnit} onUnitChange={u => set('moveXUnit', u)} />
                <AxisRow axis="Y" value={vals.moveY} onChange={v => set('moveY', v)} unit={vals.moveYUnit.toUpperCase()} min={vals.moveYUnit === '%' ? -100 : -500} max={vals.moveYUnit === '%' ? 100 : 500} step={1}
                  unitOptions={['px', '%', 'em', 'rem', 'vw', 'vh']} currentUnit={vals.moveYUnit} onUnitChange={u => set('moveYUnit', u)} />
                <AxisRow axis="Z" value={vals.moveZ} onChange={v => set('moveZ', v)} unit={vals.moveZUnit.toUpperCase()} min={-500} max={500} step={1} />
              </>
            )}
            {activeTab === 'scale' && (
              <>
                <AxisRow axis="X" value={vals.scaleX} onChange={v => set('scaleX', v)} unit="" min={0} max={5} step={0.01}
                  linkable linked={scaleLinked} onToggleLink={() => setScaleLinked(!scaleLinked)} />
                <AxisRow axis="Y" value={vals.scaleY} onChange={v => set('scaleY', v)} unit="" min={0} max={5} step={0.01}
                  linkable linked={scaleLinked} onToggleLink={() => setScaleLinked(!scaleLinked)} />
                <AxisRow axis="Z" value={vals.scaleZ} onChange={v => set('scaleZ', v)} unit="" min={0} max={5} step={0.01}
                  linkable linked={scaleLinked} onToggleLink={() => setScaleLinked(!scaleLinked)} />
              </>
            )}
            {activeTab === 'rotate' && (
              <>
                <AxisRow axis="X" value={vals.rotateX} onChange={v => set('rotateX', v)} unit="DEG" min={-360} max={360} step={1} />
                <AxisRow axis="Y" value={vals.rotateY} onChange={v => set('rotateY', v)} unit="DEG" min={-360} max={360} step={1} />
                <AxisRow axis="Z" value={vals.rotateZ} onChange={v => set('rotateZ', v)} unit="DEG" min={-360} max={360} step={1} />
              </>
            )}
            {activeTab === 'skew' && (
              <>
                <AxisRow axis="X" value={vals.skewX} onChange={v => set('skewX', v)} unit="DEG" min={-90} max={90} step={1} />
                <AxisRow axis="Y" value={vals.skewY} onChange={v => set('skewY', v)} unit="DEG" min={-90} max={90} step={1} />
              </>
            )}
          </div>
        </div>
      )}

      {/* Transform settings panel (opened by ...) */}
      {showSettings && (
        <div className="mt-2 border-t border-[#333] pt-2 space-y-2.5">
          <span className="text-[11px] text-[#ccc] font-semibold">Transform settings</span>

          {/* Origin: grid + Left/Top stacked */}
          {onTransformOriginChange && (
            <OriginGrid label="Origin" value={transformOrigin || '50% 50%'} onChange={onTransformOriginChange} />
          )}

          {/* Backface */}
          {onBackfaceVisibilityChange && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#999] w-14 shrink-0">Backface</span>
              <div className="flex-1 flex rounded overflow-hidden border border-[#333]">
                {(['visible', 'hidden'] as const).map(v => (
                  <button key={v} onClick={() => onBackfaceVisibilityChange(v)}
                    className={`flex-1 h-7 text-[11px] border-r border-[#333] last:border-r-0 ${(backfaceVisibility || 'visible') === v
                      ? 'bg-[#111] text-white' : 'bg-[#333] text-[#999] hover:text-white'}`}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Self perspective */}
          {onPerspectiveChange && (
            <div>
              <span className="text-[11px] text-[#ccc] font-semibold">Self perspective</span>
              <div className="flex items-center gap-1.5 mt-1 h-7">
                <span className="text-[11px] text-[#999] w-14 shrink-0">Distance</span>
                <input type="range" min={0} max={2000} step={1} value={selfPersp}
                  onChange={e => onPerspectiveChange(e.target.value === '0' ? '' : `${e.target.value}px`)}
                  className="flex-1 h-1 accent-white cursor-pointer" />
                <input value={selfPersp || ''} onChange={e => onPerspectiveChange(e.target.value ? `${e.target.value}px` : '')}
                  placeholder="0" className={`w-12 ${DARK_INPUT}`} />
                <span className="text-[10px] text-[#666] w-5 text-right shrink-0">PX</span>
              </div>
            </div>
          )}

          {/* Children perspective */}
          {onChildrenPerspectiveChange && (
            <div>
              <span className="text-[11px] text-[#ccc] font-semibold">Children perspective</span>
              <div className="flex items-center gap-1.5 mt-1 h-7">
                <span className="text-[11px] text-[#999] w-14 shrink-0">Distance</span>
                <input type="range" min={0} max={2000} step={1} value={childPersp}
                  onChange={e => onChildrenPerspectiveChange(e.target.value === '0' ? '' : `${e.target.value}px`)}
                  className="flex-1 h-1 accent-white cursor-pointer" />
                <input value={childPersp || ''} onChange={e => onChildrenPerspectiveChange(e.target.value ? `${e.target.value}px` : '')}
                  placeholder="0" className={`w-12 ${DARK_INPUT}`} />
                <span className="text-[10px] text-[#666] w-5 text-right shrink-0">PX</span>
              </div>
              {/* Children perspective origin */}
              {onPerspectiveOriginChange && (
                <div className="mt-1.5">
                  <OriginGrid label="Origin" value={perspectiveOrigin || '50% 50%'} onChange={onPerspectiveOriginChange} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
