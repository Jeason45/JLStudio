'use client'
import { useState, useMemo, useCallback } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { parseElementId } from '@/lib/elementHelpers'
import { ANIMATION_PRESETS } from '@/data/animationPresets'
import {
  Plus, X, ChevronDown, ChevronRight, Zap,
  Trash2, MoreHorizontal, Search, Info,
  RefreshCw, AlertTriangle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AnimationConfig, InteractionTrigger } from '@/types/interactions'

/* ═══════════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════════ */

const S = {
  select: 'w-full h-[28px] bg-[#2a2a2a] border border-[#3a3a3a] text-[#ddd] text-[11px] rounded-[4px] px-2 focus:outline-none focus:border-[#4a9eff] cursor-pointer appearance-none',
  input: 'h-[28px] bg-[#2a2a2a] border border-[#3a3a3a] text-[#ddd] text-[11px] rounded-[4px] px-2 focus:outline-none focus:border-[#4a9eff]',
  inputYellow: 'h-[28px] bg-[#2a2a2a] border border-[#c8a84e] text-[#ddd] text-[11px] rounded-[4px] px-2 focus:outline-none focus:border-[#c8a84e]',
  label: 'text-[11px] text-[#888] shrink-0',
  labelW: 'text-[11px] text-[#888] w-[52px] shrink-0',
  sectionTitle: 'text-[13px] font-semibold text-white',
  settingsTitle: 'text-[12px] font-medium text-[#ddd]',
  row: 'flex items-center gap-2',
  triggerRow: 'flex items-center gap-2 px-3 py-[7px] group cursor-pointer hover:bg-[#ffffff06] transition-colors',
  blueLink: 'text-[11px] text-[#4a9eff] hover:text-[#6db3ff] transition-colors',
  closeCircle: 'w-[22px] h-[22px] flex items-center justify-center rounded-full border border-[#4a4a4a] hover:border-[#4a9eff] text-[#888] hover:text-white transition-colors',
} as const

/* ═══════════════════════════════════════════════════════════
   TRIGGER KINDS
   ═══════════════════════════════════════════════════════════ */

type TriggerKind = 'click' | 'hover' | 'page-load' | 'scroll' | 'custom-event'

/* ─── SVG icons matching Webflow exactly ─── */

function IconClick({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 1v5.5H1M6.5 6.5l8 8M6.5 6.5l2.8 8.5 1.2-3.5 3.5-1.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconHover({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1l6 14 2-5.5L14.5 7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconPageLoad({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="1" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 4.5h6M5 7h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

function IconScroll({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1v14M5.5 3.5L8 1l2.5 2.5M5.5 12.5L8 15l2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="5" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" />
    </svg>
  )
}

function IconCustomEvent({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 3L2 8l3.5 5M10.5 3L14 8l-3.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconAnimate({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 4l-4 12h8L14 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconSet({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 4l4.5 10.5L28 16l-7.5 1.5L16 28l-4.5-10.5L4 16l7.5-1.5z" />
    </svg>
  )
}

function IconLottie({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 16c3-8 6 8 9 0s6 8 9 0 3-8 6 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function IconSpline({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="16" cy="16" rx="5" ry="11" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 16h22" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

/* Lightning icon for empty state */
function IconLightning({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 5L10 22h8l-2 13L30 18h-8l2-13z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

const TRIGGER_KINDS: { id: TriggerKind; label: string; icon: (props: { className?: string }) => React.ReactNode }[] = [
  { id: 'click', label: 'Click', icon: IconClick },
  { id: 'hover', label: 'Hover', icon: IconHover },
  { id: 'page-load', label: 'Page load', icon: IconPageLoad },
  { id: 'scroll', label: 'Scroll', icon: IconScroll },
  { id: 'custom-event', label: 'Custom event', icon: IconCustomEvent },
]

/* ═══════════════════════════════════════════════════════════
   OPTIONS
   ═══════════════════════════════════════════════════════════ */

const TARGET_OPTIONS = [
  { value: 'element', label: 'Element' },
  { value: 'class', label: 'Class' },
  { value: 'attribute', label: 'Attribute' },
  { value: 'custom-selector', label: 'Custom selector' },
]

const SCROLL_TARGET_OPTIONS = [
  { value: 'page', label: 'Page' },
  ...TARGET_OPTIONS,
]

const FILTER_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'within', label: 'Within' },
  { value: 'direct-child-of', label: 'Direct child of' },
  { value: 'contains', label: 'Contains' },
  { value: 'direct-parent-of', label: 'Direct parent of' },
  { value: 'next-to', label: 'Next to' },
  { value: 'next-sibling-of', label: 'Next sibling of' },
  { value: 'previous-sibling-of', label: 'Previous sibling of' },
]

const CLICK_TYPE_OPTIONS = [
  'Each click', 'First click', 'Second click', 'Odd clicks', 'Even clicks', 'Custom clicks',
]

const HOVER_TYPE_OPTIONS = ['Mouse enter', 'Mouse leave']

const HOVER_TRIGGER_OPTIONS = [
  'Each mouse enter', 'First mouse enter', 'Second mouse enter',
  'Odd mouse enters', 'Even mouse enters', 'Custom mouse enter',
]

const CONTROL_OPTIONS = [
  'Play from beginning', 'Play', 'Reverse', 'Pause', 'Resume',
  'Toggle play/reverse', 'Stop', 'No Action',
]

const SCROLL_TOGGLE_OPTIONS = [
  'None', 'Play', 'Pause', 'Resume', 'Reverse', 'Reset', 'Play from beginning', 'Complete',
]

/* ═══════════════════════════════════════════════════════════
   TRIGGER DATA
   ═══════════════════════════════════════════════════════════ */

interface TriggerData {
  id: string
  kind: TriggerKind
  target: string
  targetValue: string
  filter: string
  filterTarget: string
  filterValue: string
  firstMatchOnly: boolean
  clickType: string
  hoverType: string
  hoverTrigger: string
  control: string
  delay: number
  jumpTo: number
  speed: number
  // Scroll
  startElement: string
  startViewport: string
  endElement: string
  endViewport: string
  controlMode: 'scrub' | 'trigger-actions'
  smooth: number
  enter: string
  leave: string
  enterBack: string
  leaveBack: string
  pinTrigger: boolean
  clampValues: boolean
  showMarkers: boolean
  startPercent: number
  endPercent: number
  // Custom event
  eventName: string
}

function createTrigger(kind: TriggerKind, elementName?: string): TriggerData {
  return {
    id: `t-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
    kind,
    target: kind === 'page-load' ? 'element' : kind === 'scroll' ? 'class' : 'element',
    targetValue: elementName ?? '',
    filter: 'none',
    filterTarget: 'class',
    filterValue: '',
    firstMatchOnly: false,
    clickType: 'Each click',
    hoverType: 'Mouse enter',
    hoverTrigger: 'Each mouse enter',
    control: 'Play from beginning',
    delay: 0,
    jumpTo: 0,
    speed: 1,
    startElement: 'top',
    startViewport: 'bottom',
    endElement: 'bottom',
    endViewport: 'top',
    controlMode: 'scrub',
    smooth: 0.8,
    enter: 'Play',
    leave: 'None',
    enterBack: 'None',
    leaveBack: 'None',
    pinTrigger: false,
    clampValues: true,
    showMarkers: true,
    startPercent: 0,
    endPercent: 100,
    eventName: '',
  }
}

/* ═══════════════════════════════════════════════════════════
   INTERACTION DATA
   ═══════════════════════════════════════════════════════════ */

interface InteractionData {
  id: string
  name: string
  kind: TriggerKind
  triggers: TriggerData[]
}

/* ═══════════════════════════════════════════════════════════
   SHARED FIELD COMPONENTS
   ═══════════════════════════════════════════════════════════ */

/* ─── Target + sub-fields ─── */
function TargetField({ trigger, update, options }: {
  trigger: TriggerData
  update: (f: keyof TriggerData, v: unknown) => void
  options?: { value: string; label: string }[]
}) {
  const opts = options ?? TARGET_OPTIONS
  return (
    <>
      <div className={S.row}>
        <span className={S.labelW}>Target</span>
        <select value={trigger.target} onChange={e => update('target', e.target.value)}
          className={cn(S.select, 'flex-1')}>{opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
      </div>

      {trigger.target === 'element' && trigger.kind !== 'page-load' && (
        <div className="ml-[60px]">
          <div className="flex items-center gap-1.5 h-[28px] bg-[#2a2a2a] border border-[#3a3a3a] rounded-[4px] px-2">
            <div className="w-3 h-3 border border-[#555] rounded-[2px] shrink-0" />
            <span className="text-[11px] text-[#ddd] flex-1 truncate">{trigger.targetValue || 'Select element'}</span>
            <button onClick={() => update('targetValue', '')} className="text-[#666] hover:text-white shrink-0">
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {trigger.target === 'class' && (
        <div className="ml-[60px]">
          <div className="flex items-center gap-1">
            <input value={trigger.targetValue} onChange={e => update('targetValue', e.target.value)}
              placeholder="Class name" className={cn(S.inputYellow, 'flex-1')} />
            <button onClick={() => update('targetValue', '')} className="text-[#666] hover:text-white shrink-0 p-0.5">
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {trigger.target === 'attribute' && (
        <div className="ml-[60px] space-y-[6px]">
          <div className={S.row}>
            <span className={cn(S.label, 'w-[36px]')}>Name</span>
            <input value={trigger.targetValue} onChange={e => update('targetValue', e.target.value)} className={cn(S.input, 'flex-1')} />
          </div>
          <div className={S.row}>
            <span className={cn(S.label, 'w-[36px]')}>Value</span>
            <input value={trigger.filterValue} onChange={e => update('filterValue', e.target.value)} className={cn(S.input, 'flex-1')} />
          </div>
        </div>
      )}

      {trigger.target === 'custom-selector' && (
        <div className="ml-[60px]">
          <input value={trigger.targetValue} onChange={e => update('targetValue', e.target.value)}
            placeholder="#custom-css > .selector" className={cn(S.input, 'w-full text-[#777]')} />
        </div>
      )}
    </>
  )
}

/* ─── Filter ─── */
function FilterField({ trigger, update }: { trigger: TriggerData; update: (f: keyof TriggerData, v: unknown) => void }) {
  return (
    <>
      <div className={S.row}>
        <span className={cn(S.labelW, trigger.filter !== 'none' && 'text-[#4a9eff]')}>Filter</span>
        <select value={trigger.filter} onChange={e => update('filter', e.target.value)}
          className={cn(S.select, 'flex-1')}>{FILTER_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
      </div>

      {trigger.filter !== 'none' && (
        <div className="ml-[60px] space-y-[6px]">
          <select value={trigger.filterTarget} onChange={e => update('filterTarget', e.target.value)}
            className={S.select}>{TARGET_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>

          {(trigger.filterTarget === 'class' || trigger.filterTarget === 'element') && (
            <input value={trigger.filterValue} onChange={e => update('filterValue', e.target.value)}
              className={cn(S.input, 'w-full')} />
          )}
          {trigger.filterTarget === 'attribute' && (
            <>
              <input placeholder="Name" className={cn(S.input, 'w-full')} />
              <input placeholder="Value" className={cn(S.input, 'w-full')} />
            </>
          )}
          {trigger.filterTarget === 'custom-selector' && (
            <input placeholder="#custom-css > .selector" className={cn(S.input, 'w-full text-[#777]')} />
          )}

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={trigger.firstMatchOnly}
              onChange={e => update('firstMatchOnly', e.target.checked)}
              className="w-3.5 h-3.5 rounded border-[#555] bg-[#222] accent-[#4a9eff]" />
            <span className="text-[11px] text-[#ccc]">First match only</span>
          </label>
        </div>
      )}
    </>
  )
}

/* ─── Control + Delay + Speed ─── */
function ControlFields({ trigger, update }: { trigger: TriggerData; update: (f: keyof TriggerData, v: unknown) => void }) {
  const delayActive = trigger.delay > 0

  return (
    <>
      <div className={S.row}>
        <span className={S.labelW}>Control</span>
        <select value={trigger.control} onChange={e => update('control', e.target.value)}
          className={cn(S.select, 'flex-1')}>{CONTROL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}</select>
      </div>

      <div className={S.row}>
        <span className={S.labelW}>Delay</span>
        <div className="flex items-center gap-[3px] flex-1">
          <input type="number" min={0} step={0.1} value={trigger.delay}
            onChange={e => update('delay', Number(e.target.value))}
            className={cn(S.input, 'w-[44px] text-center')} />
          <span className="text-[10px] text-[#777] font-medium">S</span>
          <span className={cn('text-[10px] ml-1', delayActive ? 'text-[#888]' : 'text-[#666]')}>Jump to</span>
          <input type="number" min={0} step={0.1} value={trigger.jumpTo}
            onChange={e => update('jumpTo', Number(e.target.value))}
            disabled={!delayActive}
            className={cn(S.input, 'w-[44px] text-center', !delayActive && 'opacity-40')} />
          <span className={cn('text-[10px] font-medium', delayActive ? 'text-[#777]' : 'text-[#666]')}>S</span>
        </div>
      </div>

      <div className={S.row}>
        <span className={S.labelW}>Speed</span>
        <div className="flex items-center gap-[6px] flex-1">
          <input type="range" min={0.1} max={3} step={0.1} value={trigger.speed}
            onChange={e => update('speed', Number(e.target.value))}
            className="flex-1 h-[3px] accent-white cursor-pointer" />
          <input type="number" min={0.1} max={3} step={0.1} value={trigger.speed}
            onChange={e => update('speed', Number(e.target.value))}
            className={cn(S.input, 'w-[36px] text-center')} />
          <button onClick={() => update('speed', Math.max(0.1, trigger.speed - 0.1))}
            className="text-[12px] text-[#666] hover:text-white w-4 text-center">-</button>
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   SCROLL PREVIEW
   ═══════════════════════════════════════════════════════════ */

function ScrollPreview({ elPos, vpPos, isEnd }: { elPos: string; vpPos: string; isEnd?: boolean }) {
  const elMap: Record<string, number> = { top: 15, center: 45, bottom: 75 }
  const vpMap: Record<string, number> = { top: 15, center: 50, bottom: 85 }
  const ey = elMap[elPos] ?? 15
  const vy = vpMap[vpPos] ?? 85

  return (
    <div className="w-[90px] h-[80px] bg-[#1e1e1e] rounded-[4px] border border-[#3a3a3a] relative overflow-hidden shrink-0">
      {/* Viewport area */}
      <div className="absolute inset-[4px] rounded-[2px] bg-[#161616] border border-[#333]">
        {/* Element box */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[18px] h-[12px] bg-[#2a2a2a] border border-[#444] rounded-[1px]"
          style={{ top: `${ey - 6}%` }}>
          {/* Title bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#555] rounded-t-[1px]" />
          {isEnd && <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500 rounded-t-[1px]" />}
        </div>
        {/* Trigger line */}
        <div className={cn('absolute left-0 right-0 h-[2px]', isEnd ? 'bg-red-500' : 'bg-green-500')}
          style={{ top: `${vy}%` }} />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   SETTINGS PANELS
   ═══════════════════════════════════════════════════════════ */

/* ─── CLICK SETTINGS ─── */
function ClickSettings({ trigger, update, onClose }: {
  trigger: TriggerData; update: (f: keyof TriggerData, v: unknown) => void; onClose: () => void
}) {
  return (
    <div className="px-3 py-3 space-y-[8px] border-t border-[#2a2a2a] bg-[#1a1a1a]">
      <div className="flex items-center justify-between">
        <span className={S.settingsTitle}>Click settings</span>
        <button onClick={onClose} className={S.closeCircle}><X className="w-3 h-3" /></button>
      </div>
      <TargetField trigger={trigger} update={update} />
      {trigger.target !== 'element' && <FilterField trigger={trigger} update={update} />}
      <div className={S.row}>
        <span className={S.labelW}>Click</span>
        <select value={trigger.clickType} onChange={e => update('clickType', e.target.value)}
          className={cn(S.select, 'flex-1')}>{CLICK_TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}</select>
      </div>
      <ControlFields trigger={trigger} update={update} />
    </div>
  )
}

/* ─── HOVER SETTINGS ─── */
function HoverSettings({ trigger, update, onClose }: {
  trigger: TriggerData; update: (f: keyof TriggerData, v: unknown) => void; onClose: () => void
}) {
  return (
    <div className="px-3 py-3 space-y-[8px] border-t border-[#2a2a2a] bg-[#1a1a1a]">
      <div className="flex items-center justify-between">
        <span className={S.settingsTitle}>Hover settings</span>
        <button onClick={onClose} className={S.closeCircle}><X className="w-3 h-3" /></button>
      </div>
      <TargetField trigger={trigger} update={update} />
      {trigger.target !== 'element' && <FilterField trigger={trigger} update={update} />}
      <div className={S.row}>
        <span className={S.labelW}>Type</span>
        <select value={trigger.hoverType} onChange={e => update('hoverType', e.target.value)}
          className={cn(S.select, 'flex-1')}>{HOVER_TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}</select>
      </div>
      <div className={S.row}>
        <span className={S.labelW}>Trigger</span>
        <select value={trigger.hoverTrigger} onChange={e => update('hoverTrigger', e.target.value)}
          className={cn(S.select, 'flex-1')}>{HOVER_TRIGGER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}</select>
      </div>
      <ControlFields trigger={trigger} update={update} />
    </div>
  )
}

/* ─── PAGE LOAD SETTINGS ─── */
function PageLoadSettings({ trigger, update, onClose }: {
  trigger: TriggerData; update: (f: keyof TriggerData, v: unknown) => void; onClose: () => void
}) {
  return (
    <div className="px-3 py-3 space-y-[8px] border-t border-[#2a2a2a] bg-[#1a1a1a]">
      <div className="flex items-center justify-between">
        <span className={S.settingsTitle}>Page load settings</span>
        <button onClick={onClose} className={S.closeCircle}><X className="w-3 h-3" /></button>
      </div>
      <ControlFields trigger={trigger} update={update} />
    </div>
  )
}

/* ─── SCROLL SETTINGS ─── */
function ScrollSettings({ trigger, update, onClose }: {
  trigger: TriggerData; update: (f: keyof TriggerData, v: unknown) => void; onClose: () => void
}) {
  const [advOpen, setAdvOpen] = useState(false)
  const isPage = trigger.target === 'page'

  return (
    <div className="px-3 py-3 space-y-[8px] border-t border-[#2a2a2a] bg-[#1a1a1a]">
      <div className="flex items-center justify-between">
        <span className={S.settingsTitle}>Scroll settings</span>
        <button onClick={onClose} className={S.closeCircle}><X className="w-3 h-3" /></button>
      </div>

      <TargetField trigger={trigger} update={update} options={SCROLL_TARGET_OPTIONS} />

      {!isPage && trigger.target !== 'element' && (
        <FilterField trigger={trigger} update={update} />
      )}

      {/* Page → simple % range */}
      {isPage && (
        <div className={S.row}>
          <span className={S.labelW}>Start</span>
          <input type="number" min={0} max={100} value={trigger.startPercent}
            onChange={e => update('startPercent', Number(e.target.value))}
            className={cn(S.input, 'w-[44px] text-center')} />
          <span className="text-[10px] text-[#777]">%</span>
          <span className="text-[10px] text-[#888] mx-1">End</span>
          <input type="number" min={0} max={100} value={trigger.endPercent}
            onChange={e => update('endPercent', Number(e.target.value))}
            className={cn(S.input, 'w-[44px] text-center')} />
          <span className="text-[10px] text-[#777]">%</span>
        </div>
      )}

      {/* Non-page → full config */}
      {!isPage && (
        <>
          {/* Advanced options */}
          <button onClick={() => setAdvOpen(!advOpen)}
            className="w-full flex items-center justify-center gap-1.5 h-[28px] bg-[#222] border border-[#3a3a3a] rounded-[4px] text-[11px] text-[#ccc] hover:bg-[#2a2a2a] transition-colors">
            {advOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            Advanced options
          </button>

          {advOpen && (
            <div className="space-y-[6px]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={trigger.pinTrigger}
                  onChange={e => update('pinTrigger', e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-[#555] bg-[#222] accent-[#4a9eff]" />
                <span className="text-[11px] text-[#ccc]">Pin trigger element</span>
                <Info className="w-3 h-3 text-[#555]" />
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={trigger.clampValues}
                  onChange={e => update('clampValues', e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-[#555] bg-[#222] accent-[#4a9eff]" />
                <span className="text-[11px] text-[#ccc]">Clamp start/end values</span>
                <Info className="w-3 h-3 text-[#555]" />
              </label>
            </div>
          )}

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={trigger.showMarkers}
              onChange={e => update('showMarkers', e.target.checked)}
              className="w-3.5 h-3.5 rounded border-[#555] bg-[#222] accent-[#4a9eff]" />
            <span className="text-[11px] text-[#ccc]">Show scroll markers</span>
          </label>

          {/* Start */}
          <div>
            <div className="flex items-center gap-1 mb-[6px]">
              <span className="text-[11px] font-semibold text-white">Start</span>
              <Info className="w-3 h-3 text-[#555]" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 space-y-[4px]">
                <div>
                  <span className="text-[10px] text-[#777]">Element</span>
                  <input value={trigger.startElement} onChange={e => update('startElement', e.target.value)}
                    className={cn(S.input, 'w-full mt-[2px]')} />
                </div>
                <div>
                  <span className="text-[10px] text-[#777]">Viewport</span>
                  <input value={trigger.startViewport} onChange={e => update('startViewport', e.target.value)}
                    className={cn(S.input, 'w-full mt-[2px]')} />
                </div>
              </div>
              <ScrollPreview elPos={trigger.startElement} vpPos={trigger.startViewport} />
            </div>
          </div>

          {/* End */}
          <div>
            <div className="flex items-center gap-1 mb-[6px]">
              <span className="text-[11px] font-semibold text-white">End</span>
              <Info className="w-3 h-3 text-[#555]" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 space-y-[4px]">
                <div>
                  <span className="text-[10px] text-[#777]">Element</span>
                  <input value={trigger.endElement} onChange={e => update('endElement', e.target.value)}
                    className={cn(S.input, 'w-full mt-[2px]')} />
                </div>
                <div>
                  <span className="text-[10px] text-[#777]">Viewport</span>
                  <input value={trigger.endViewport} onChange={e => update('endViewport', e.target.value)}
                    className={cn(S.input, 'w-full mt-[2px]')} />
                </div>
              </div>
              <ScrollPreview elPos={trigger.endElement} vpPos={trigger.endViewport} isEnd />
            </div>
          </div>
        </>
      )}

      {/* Controls */}
      <div>
        <span className="text-[11px] font-semibold text-white">Controls</span>
        <div className="flex mt-[6px]">
          <button onClick={() => update('controlMode', 'scrub')}
            className={cn('flex-1 h-[28px] text-[11px] rounded-l-[4px] border transition-colors',
              trigger.controlMode === 'scrub'
                ? 'bg-[#333] border-[#4a4a4a] text-white' : 'bg-[#222] border-[#3a3a3a] text-[#888]'
            )}>Scrub on scroll</button>
          <button onClick={() => update('controlMode', 'trigger-actions')}
            className={cn('flex-1 h-[28px] text-[11px] rounded-r-[4px] border-t border-b border-r transition-colors',
              trigger.controlMode === 'trigger-actions'
                ? 'bg-[#333] border-[#4a4a4a] text-white' : 'bg-[#222] border-[#3a3a3a] text-[#888]'
            )}>Trigger actions</button>
        </div>

        {trigger.controlMode === 'scrub' && (
          <div className="flex items-center gap-[6px] mt-[8px]">
            <span className="text-[11px] text-[#888] flex items-center gap-1">Smooth <Info className="w-3 h-3 text-[#555]" /></span>
            <input type="range" min={0} max={3} step={0.1} value={trigger.smooth}
              onChange={e => update('smooth', Number(e.target.value))}
              className="flex-1 h-[3px] accent-white cursor-pointer" />
            <input type="number" min={0} max={3} step={0.1} value={trigger.smooth}
              onChange={e => update('smooth', Number(e.target.value))}
              className={cn(S.input, 'w-[44px] text-center')} />
            <span className="text-[10px] text-[#777]">S</span>
          </div>
        )}

        {trigger.controlMode === 'trigger-actions' && (
          <div className="space-y-[6px] mt-[8px]">
            {(['enter', 'leave', 'enterBack', 'leaveBack'] as const).map(key => (
              <div key={key} className={S.row}>
                <span className={cn(S.label, 'w-[68px]')}>
                  {key === 'enter' ? 'Enter' : key === 'leave' ? 'Leave' : key === 'enterBack' ? 'Enter back' : 'Leave back'}
                </span>
                <select value={trigger[key]} onChange={e => update(key, e.target.value)}
                  className={cn(S.select, 'flex-1')}>
                  {SCROLL_TOGGLE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── CUSTOM EVENT SETTINGS ─── */
function CustomEventSettings({ trigger, update, onClose }: {
  trigger: TriggerData; update: (f: keyof TriggerData, v: unknown) => void; onClose: () => void
}) {
  return (
    <div className="px-3 py-3 space-y-[8px] border-t border-[#2a2a2a] bg-[#1a1a1a]">
      <div className="flex items-center justify-between">
        <span className={S.settingsTitle}>Custom event settings</span>
        <button onClick={onClose} className={S.closeCircle}><X className="w-3 h-3" /></button>
      </div>
      <div className={S.row}>
        <span className={S.labelW}>Event</span>
        <input value={trigger.eventName} onChange={e => update('eventName', e.target.value)}
          placeholder="event-name" className={cn(S.input, 'flex-1')} />
      </div>
      <ControlFields trigger={trigger} update={update} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   CHOOSE AN ACTION PANEL
   ═══════════════════════════════════════════════════════════ */

const PRESETS_GRID = [
  { id: 'fade-in', label: 'Fade in' },
  { id: 'fade-out', label: 'Fade out' },
  { id: 'slide-left', label: 'Slide in left' },
  { id: 'slide-right', label: 'Slide out right' },
  { id: 'slide-up', label: 'Slide in up' },
  { id: 'slide-down', label: 'Slide out down' },
  { id: 'zoom-in', label: 'Scale in' },
  { id: 'pulse', label: 'Pop in' },
  { id: 'drop-in', label: 'Drop in' },
  { id: 'stagger-fade-in', label: 'Stagger fade in' },
  { id: 'stagger-fade-out', label: 'Stagger fade out' },
  { id: 'stagger-drop-in', label: 'Stagger drop in' },
  { id: 'stagger-fall-out', label: 'Stagger fall out' },
  { id: 'random-stagger', label: 'Random stagger' },
]

/* Preset icon — styled rectangle with motion indicator */
function PresetIcon({ id }: { id: string }) {
  const isFade = id.includes('fade')
  const isSlide = id.includes('slide')
  const isScale = id.includes('zoom') || id === 'pulse'
  const isDrop = id.includes('drop')
  const isStagger = id.includes('stagger')

  if (isStagger) {
    return (
      <div className="w-[36px] h-[36px] flex items-center justify-center gap-[2px]">
        {[0, 1, 2].map(i => (
          <div key={i} className={cn('w-[6px] rounded-[1px]', id.includes('fade') ? 'bg-[#555]' : 'bg-[#666]')}
            style={{ height: `${14 + i * 4}px`, opacity: 0.5 + i * 0.2 }} />
        ))}
      </div>
    )
  }

  return (
    <div className="w-[36px] h-[36px] flex items-center justify-center relative">
      <div className={cn('rounded-[3px] border border-[#555] transition-all',
        isScale ? 'w-[20px] h-[20px] bg-[#444]' : 'w-[16px] h-[22px] bg-[#333]',
        isFade && (id.includes('out') ? 'opacity-40' : 'opacity-100'),
      )}>
        {/* Top bar */}
        <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-[10px] h-[2px] bg-[#666] rounded-full" />
      </div>
      {/* Direction arrow */}
      {(isSlide || isDrop) && (
        <div className="absolute text-[#888] text-[14px]"
          style={{
            ...(id.includes('left') && { right: 2 }),
            ...(id.includes('right') && { left: 2 }),
            ...(id.includes('up') && { bottom: 0 }),
            ...(id.includes('down') && { top: 0 }),
          }}>
          {id.includes('left') ? '→' : id.includes('right') ? '→' : id.includes('up') ? '↑' : '↓'}
        </div>
      )}
    </div>
  )
}

function ChooseActionPanel({ onSelect, onClose }: {
  onSelect: (type: string, presetId?: string) => void
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [presetsOpen, setPresetsOpen] = useState(true)

  const filtered = useMemo(() => {
    if (!query) return PRESETS_GRID
    return PRESETS_GRID.filter(p => p.label.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  return (
    <div className="border-t border-[#333]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-[10px]">
        <span className="text-[12px] font-medium text-white">Choose an action</span>
        <button onClick={onClose} className={S.closeCircle}><X className="w-3 h-3" /></button>
      </div>

      {/* Search */}
      <div className="px-3 pb-[10px]">
        <div className="flex items-center gap-[6px] h-[28px] bg-[#222] border border-[#3a3a3a] rounded-[4px] px-2">
          <Search className="w-3 h-3 text-[#555]" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search actions" className="flex-1 bg-transparent text-[11px] text-[#ccc] outline-none placeholder:text-[#555]" />
        </div>
      </div>

      {/* 4 action types */}
      <div className="px-3 pb-[10px]">
        <div className="grid grid-cols-3 gap-[6px]">
          {([
            { id: 'animate', label: 'Animate', Icon: IconAnimate },
            { id: 'set', label: 'Set', Icon: IconSet },
            { id: 'play-lottie', label: 'Play Lottie', Icon: IconLottie },
          ]).map(a => (
            <button key={a.id} onClick={() => { onSelect(a.id); onClose() }}
              className="flex flex-col items-center gap-[6px] py-[10px] rounded-[6px] hover:bg-[#2a2a2a] transition-colors">
              <a.Icon className="w-[28px] h-[28px] text-[#bbb]" />
              <span className="text-[10px] text-[#bbb]">{a.label}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-[6px] mt-[2px]">
          <button onClick={() => { onSelect('animate-spline'); onClose() }}
            className="flex flex-col items-center gap-[6px] py-[10px] rounded-[6px] hover:bg-[#2a2a2a] transition-colors">
            <IconSpline className="w-[28px] h-[28px] text-[#bbb]" />
            <span className="text-[10px] text-[#bbb] leading-tight text-center">Animate<br />Spline</span>
          </button>
        </div>
      </div>

      {/* Animation Presets */}
      <div className="border-t border-[#333]">
        <button onClick={() => setPresetsOpen(!presetsOpen)}
          className="w-full flex items-center justify-between px-3 py-[10px] hover:bg-[#ffffff06] transition-colors">
          <span className="text-[12px] font-medium text-white">Animation Presets</span>
          <ChevronDown className={cn('w-3.5 h-3.5 text-[#888] transition-transform', !presetsOpen && '-rotate-90')} />
        </button>

        {presetsOpen && (
          <div className="px-3 pb-3 grid grid-cols-3 gap-[4px]">
            {filtered.map(p => (
              <button key={p.id} onClick={() => { onSelect('preset', p.id); onClose() }}
                className="flex flex-col items-center gap-[4px] py-[8px] rounded-[4px] hover:bg-[#2a2a2a] transition-colors">
                <PresetIcon id={p.id} />
                <span className="text-[10px] text-[#aaa] text-center leading-tight px-1">{p.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   TRIGGER ROW HELPERS
   ═══════════════════════════════════════════════════════════ */

function TriggerRowIcon({ kind }: { kind: TriggerKind }) {
  const Comp = TRIGGER_KINDS.find(t => t.id === kind)?.icon
  if (!Comp) return null
  return <Comp className="w-3.5 h-3.5 text-[#888]" />
}

function triggerLabel(t: TriggerData): string {
  const val = t.target === 'class' ? (t.targetValue ? `.${t.targetValue}` : '')
    : t.target === 'attribute' ? (t.targetValue ? `[${t.targetValue}]` : 'No attribute selected')
    : t.target === 'custom-selector' ? (t.targetValue || 'No selector set')
    : t.target === 'page' ? 'Page'
    : (t.targetValue || '')

  switch (t.kind) {
    case 'click': return `Click ${val}`
    case 'hover': return `${t.hoverType === 'Mouse enter' ? 'Hover enter' : 'Hover leave'} ${val}`
    case 'page-load': return 'Page Load'
    case 'scroll': return `Scroll ${val}`
    case 'custom-event': return `Custom event ${t.eventName || 'No event name'}`
  }
}

function triggerHasWarning(t: TriggerData): boolean {
  if (t.target === 'attribute' && !t.targetValue) return true
  if (t.target === 'custom-selector' && !t.targetValue) return true
  if (t.kind === 'custom-event' && !t.eventName) return true
  return false
}

/* ═══════════════════════════════════════════════════════════
   INTERACTION EDITOR
   ═══════════════════════════════════════════════════════════ */

function InteractionEditor({ interaction, sectionId, contentPath, onClose }: {
  interaction: InteractionData; sectionId: string; contentPath: string; onClose: () => void
}) {
  const { addInteraction, removeInteraction } = useEditorStore()
  const [name, setName] = useState(interaction.name)
  const [triggers, setTriggers] = useState<TriggerData[]>(interaction.triggers)
  const [openTrigger, setOpenTrigger] = useState<string | null>(null)
  const [showActions, setShowActions] = useState(false)

  const update = useCallback((triggerId: string, field: keyof TriggerData, value: unknown) => {
    setTriggers(prev => prev.map(t => t.id === triggerId ? { ...t, [field]: value } : t))
  }, [])

  const addTrigger = () => {
    const t = createTrigger(interaction.kind)
    setTriggers(prev => [...prev, t])
    setOpenTrigger(t.id)
  }

  const removeTrigger = (id: string) => {
    setTriggers(prev => prev.filter(t => t.id !== id))
    if (openTrigger === id) setOpenTrigger(null)
  }

  const handleSelectAction = (type: string, presetId?: string) => {
    const preset = presetId ? ANIMATION_PRESETS.find(p => p.id === presetId) : undefined
    const trigger: InteractionTrigger = interaction.kind === 'click' ? { type: 'click' }
      : interaction.kind === 'hover' ? { type: 'hover' }
      : interaction.kind === 'page-load' ? { type: 'page-load', delay: 0 }
      : interaction.kind === 'scroll' ? { type: 'scroll-trigger', scrollTrigger: { start: 'top bottom', end: 'bottom top', scrub: true } }
      : { type: 'click' }

    const config: AnimationConfig = {
      id: `a-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      name: preset?.name ?? (type === 'animate' ? 'Animation' : type === 'set' ? 'Set' : type),
      trigger,
      duration: type === 'set' ? 0 : 600,
      delay: 0,
      easing: 'ease-out',
      actionType: presetId ? 'preset' : type,
      ...preset?.config,
    }
    addInteraction(sectionId, contentPath, config)
    setShowActions(false)
  }

  // Actions from store
  const section = useEditorStore.getState().siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const actions = (section?.content.__interactions?.[contentPath] ?? []) as AnimationConfig[]

  return (
    <div>
      {/* ─── Header ─── */}
      <div className="flex items-center gap-[6px] px-3 py-[10px] border-b border-[#333]">
        <input value={name} onChange={e => setName(e.target.value)}
          className="flex-1 bg-transparent text-[13px] font-medium text-white border border-transparent focus:border-[#4a9eff] rounded-[3px] px-[6px] py-[2px] outline-none transition-colors" />
        <button className="p-[4px] text-[#666] hover:text-white transition-colors">
          <MoreHorizontal className="w-[14px] h-[14px]" />
        </button>
        <button onClick={onClose} className="p-[4px] text-[#666] hover:text-white transition-colors">
          <X className="w-[14px] h-[14px]" />
        </button>
      </div>

      {/* ─── Trigger ─── */}
      <div className="border-b border-[#333]">
        <div className="flex items-center justify-between px-3 py-[8px]">
          <span className={S.sectionTitle}>Trigger</span>
          <button onClick={addTrigger} className="text-[#666] hover:text-white transition-colors">
            <Plus className="w-[14px] h-[14px]" />
          </button>
        </div>

        {triggers.map(t => (
          <div key={t.id}>
            {/* Trigger row */}
            <div className={S.triggerRow} onClick={() => setOpenTrigger(openTrigger === t.id ? null : t.id)}>
              <TriggerRowIcon kind={t.kind} />
              <span className={cn('flex-1 text-[11px] truncate',
                triggerHasWarning(t) ? 'text-[#e8a838]' : 'text-[#ccc]'
              )}>
                {triggerLabel(t)}
              </span>
              {t.filter !== 'none' && (
                <span className="text-[9px] text-[#4a9eff] truncate max-w-[70px]">
                  {t.filter} .{t.filterValue}
                </span>
              )}
              <button onClick={e => { e.stopPropagation(); removeTrigger(t.id) }}
                className="p-[2px] text-[#555] opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all">
                <Trash2 className="w-[12px] h-[12px]" />
              </button>
              {triggerHasWarning(t) && <AlertTriangle className="w-3 h-3 text-[#e8a838] shrink-0" />}
            </div>

            {/* Settings panel */}
            {openTrigger === t.id && (
              <>
                {t.kind === 'click' && <ClickSettings trigger={t} update={(f, v) => update(t.id, f, v)} onClose={() => setOpenTrigger(null)} />}
                {t.kind === 'hover' && <HoverSettings trigger={t} update={(f, v) => update(t.id, f, v)} onClose={() => setOpenTrigger(null)} />}
                {t.kind === 'page-load' && <PageLoadSettings trigger={t} update={(f, v) => update(t.id, f, v)} onClose={() => setOpenTrigger(null)} />}
                {t.kind === 'scroll' && <ScrollSettings trigger={t} update={(f, v) => update(t.id, f, v)} onClose={() => setOpenTrigger(null)} />}
                {t.kind === 'custom-event' && <CustomEventSettings trigger={t} update={(f, v) => update(t.id, f, v)} onClose={() => setOpenTrigger(null)} />}
              </>
            )}
          </div>
        ))}
      </div>

      {/* ─── Actions ─── */}
      <div>
        <div className="px-3 py-[8px]">
          <span className={S.sectionTitle}>Actions</span>
        </div>

        {/* Existing actions */}
        {actions.length > 0 && (
          <div className="px-3 pb-[6px] space-y-[4px]">
            {actions.map(a => (
              <div key={a.id} className="flex items-center gap-2 px-[8px] py-[6px] bg-[#1e1e1e] border border-[#333] rounded-[4px] hover:border-[#4a4a4a] transition-colors">
                <Zap className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="text-[11px] text-[#ccc] flex-1 truncate">{a.name}</span>
                <span className="text-[9px] text-[#777]">{a.duration}ms</span>
                <button onClick={() => removeInteraction(sectionId, contentPath, a.id)}
                  className="p-[2px] text-[#555] hover:text-red-400 transition-colors">
                  <Trash2 className="w-[12px] h-[12px]" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* + Add an action... */}
        {!showActions && (
          <button onClick={() => setShowActions(true)}
            className="w-full text-left px-3 py-[8px] text-[11px] text-[#4a9eff] hover:text-[#6db3ff] transition-colors">
            + Add an action...
          </button>
        )}

        {showActions && <ChooseActionPanel onSelect={handleSelectAction} onClose={() => setShowActions(false)} />}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN PANEL
   ═══════════════════════════════════════════════════════════ */

export function InteractionsPanel() {
  const { selectedElementPath, siteConfig } = useEditorStore()
  const [activeInteraction, setActiveInteraction] = useState<InteractionData | null>(null)

  const parsed = selectedElementPath ? parseElementId(selectedElementPath) : null
  const sectionId = parsed?.sectionId ?? ''
  const contentPath = parsed?.contentPath ?? ''
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const interactions = (section?.content.__interactions?.[contentPath] ?? []) as AnimationConfig[]

  // Map existing AnimationConfigs to InteractionData for the list
  const existingInteractions = useMemo(() => {
    return interactions.map(a => ({
      id: a.id,
      name: a.name || 'Interaction',
      kind: animToKind(a.trigger.type),
      triggers: [createTrigger(animToKind(a.trigger.type))],
    }))
  }, [interactions])

  const handleCreate = (kind: TriggerKind) => {
    // Get element name from selectedElementPath if possible
    const elName = contentPath?.split('.').pop() ?? ''
    setActiveInteraction({
      id: `int-${Date.now()}`,
      name: `${TRIGGER_KINDS.find(t => t.id === kind)?.label} interaction`,
      kind,
      triggers: [createTrigger(kind, elName)],
    })
  }

  /* ─── Editor view ─── */
  if (activeInteraction) {
    return (
      <InteractionEditor
        interaction={activeInteraction}
        sectionId={sectionId}
        contentPath={contentPath}
        onClose={() => setActiveInteraction(null)}
      />
    )
  }

  /* ─── Main view ─── */
  const hasItems = existingInteractions.length > 0

  return (
    <div>
      {!hasItems ? (
        /* ═══ EMPTY STATE ═══ */
        <div className="px-4 pt-6 pb-4">
          {/* Card container */}
          <div className="flex flex-col items-center text-center py-6 px-4 bg-[#1e1e1e] rounded-[8px] border border-[#2a2a2a] mb-6">
            {/* Lightning icon */}
            <div className="w-[52px] h-[52px] rounded-full bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center mb-3">
              <IconLightning className="w-[28px] h-[28px] text-[#888]" />
            </div>
            <h3 className="text-[14px] font-semibold text-white mb-[4px]">Bring your site to life</h3>
            <p className="text-[11px] text-[#888] leading-[16px] mb-[6px]">
              Add animations and interactive<br />behaviors to any element.
            </p>
            <span className="text-[11px] text-[#4a9eff]">Powered by GSAP</span>
          </div>

          {/* Trigger on... */}
          <p className="text-[12px] font-semibold text-white mb-[8px]">Trigger on...</p>
          <div className="space-y-0">
            {TRIGGER_KINDS.map(kind => (
              <button key={kind.id}
                onClick={() => handleCreate(kind.id)}
                className="w-full flex items-center gap-[12px] px-[8px] py-[10px] rounded-[4px] hover:bg-[#ffffff08] transition-colors text-left">
                <kind.icon className="w-[16px] h-[16px] text-[#888]" />
                <span className="text-[12px] text-[#ccc]">{kind.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* ═══ INTERACTION LIST ═══ */
        <div>
          <div className="flex items-center justify-between px-3 py-[8px] border-b border-[#333]">
            <span className="text-[12px] font-medium text-white">Interactions</span>
            <button className="text-[#666] hover:text-white transition-colors">
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="py-[4px]">
            {existingInteractions.map(int => (
              <button key={int.id} onClick={() => setActiveInteraction(int)}
                className="w-full flex items-center gap-[10px] px-3 py-[8px] hover:bg-[#ffffff06] transition-colors text-left">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-white truncate">{int.name}</p>
                  <p className="text-[10px] text-[#777] truncate capitalize">{int.kind} trigger</p>
                </div>
                <ChevronRight className="w-3 h-3 text-[#555]" />
              </button>
            ))}
          </div>

          {/* Add new */}
          <div className="px-3 py-[8px] border-t border-[#333]">
            <p className="text-[10px] text-[#888] mb-[6px]">Add interaction...</p>
            <div className="grid grid-cols-5 gap-[2px]">
              {TRIGGER_KINDS.map(kind => (
                <button key={kind.id} onClick={() => handleCreate(kind.id)}
                  className="flex flex-col items-center gap-[4px] py-[8px] rounded-[4px] hover:bg-[#ffffff08] transition-colors" title={kind.label}>
                  <kind.icon className="w-[14px] h-[14px] text-[#888]" />
                  <span className="text-[9px] text-[#777] truncate w-full text-center">{kind.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════ */

function animToKind(type: string): TriggerKind {
  if (type === 'hover' || type === 'hover-enter' || type === 'hover-leave') return 'hover'
  if (type === 'click' || type === 'click-first' || type === 'click-second') return 'click'
  if (type === 'page-load') return 'page-load'
  if (type.includes('scroll') || type === 'while-scrolling' || type === 'while-in-view' || type === 'scroll-into-view') return 'scroll'
  return 'click'
}
