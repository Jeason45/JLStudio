'use client'

/**
 * ActionSelector — Webflow-style action dropdown with grouped categories.
 * Used inside each trigger phase to select what animation to play.
 */

const SELECT = 'w-full h-7 bg-[#111] border border-[#333] text-[#e0e0e0] text-[11px] rounded px-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer'

/* ─── Action definitions ─── */
export interface ActionDef {
  id: string
  label: string
  presetId?: string // maps to animationPresets.ts
}

export interface ActionCategory {
  label: string
  actions: ActionDef[]
}

export const ACTION_CATEGORIES: ActionCategory[] = [
  {
    label: 'Custom animation',
    actions: [
      { id: 'start-animation', label: 'Start an animation' },
    ],
  },
  {
    label: 'Appear & Disappear',
    actions: [
      { id: 'fade', label: 'Fade', presetId: 'fade-in' },
      { id: 'slide', label: 'Slide', presetId: 'slide-up' },
      { id: 'flip', label: 'Flip', presetId: 'flip-x' },
      { id: 'grow', label: 'Grow', presetId: 'zoom-in' },
      { id: 'grow-big', label: 'Grow big', presetId: 'zoom-in' },
      { id: 'shrink', label: 'Shrink', presetId: 'zoom-out' },
      { id: 'shrink-big', label: 'Shrink big', presetId: 'zoom-out' },
      { id: 'spin', label: 'Spin', presetId: 'rotate-in' },
      { id: 'fly', label: 'Fly', presetId: 'slide-up' },
      { id: 'drop', label: 'Drop', presetId: 'slide-down' },
    ],
  },
  {
    label: 'Emphasis',
    actions: [
      { id: 'pop', label: 'Pop', presetId: 'pulse' },
      { id: 'jiggle', label: 'Jiggle', presetId: 'shake-x' },
      { id: 'pulse', label: 'Pulse', presetId: 'pulse' },
      { id: 'blink', label: 'Blink', presetId: 'pulse' },
      { id: 'bounce', label: 'Bounce', presetId: 'bounce' },
      { id: 'flip-lr', label: 'Flip left to right', presetId: 'flip-x' },
      { id: 'flip-rl', label: 'Flip right to left', presetId: 'flip-y' },
      { id: 'rubber-band', label: 'Rubber band', presetId: 'rubber-band' },
      { id: 'jello', label: 'Jello', presetId: 'jello' },
    ],
  },
]

export function getActionDef(actionId: string): ActionDef | undefined {
  for (const cat of ACTION_CATEGORIES) {
    const found = cat.actions.find(a => a.id === actionId)
    if (found) return found
  }
  return undefined
}

interface ActionSelectorProps {
  value: string | null
  onChange: (actionId: string | null) => void
}

export function ActionSelector({ value, onChange }: ActionSelectorProps) {
  return (
    <select
      value={value ?? '__none__'}
      onChange={e => {
        const v = e.target.value
        onChange(v === '__none__' ? null : v)
      }}
      className={SELECT}
    >
      <option value="__none__">Select an action...</option>
      {ACTION_CATEGORIES.map(cat => (
        <optgroup key={cat.label} label={cat.label}>
          {cat.actions.map(a => (
            <option key={a.id} value={a.id}>{a.label}</option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}
