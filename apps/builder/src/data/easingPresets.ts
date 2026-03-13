import type { EasingPresetName } from '@/types/interactions'

// ─── Easing Preset Definitions ───

export interface EasingDef {
  name: EasingPresetName
  label: string
  value: string // CSS easing string
  /** Control points for SVG preview [x1, y1, x2, y2] or null for special */
  points: [number, number, number, number] | null
}

const EASING_MAP: Record<EasingPresetName, { label: string; value: string; points: [number, number, number, number] | null }> = {
  // Standard
  'linear':       { label: 'Linear',        value: 'linear',                              points: [0, 0, 1, 1] },
  'ease':         { label: 'Ease',           value: 'ease',                                points: [0.25, 0.1, 0.25, 1] },
  'ease-in':      { label: 'Ease In',        value: 'ease-in',                             points: [0.42, 0, 1, 1] },
  'ease-out':     { label: 'Ease Out',       value: 'ease-out',                            points: [0, 0, 0.58, 1] },
  'ease-in-out':  { label: 'Ease In Out',    value: 'ease-in-out',                         points: [0.42, 0, 0.58, 1] },
  'spring':       { label: 'Spring',         value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', points: [0.175, 0.885, 0.32, 1.275] },

  // Quad
  'quad-in':      { label: 'Quad In',        value: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',  points: [0.55, 0.085, 0.68, 0.53] },
  'quad-out':     { label: 'Quad Out',       value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',   points: [0.25, 0.46, 0.45, 0.94] },
  'quad-in-out':  { label: 'Quad In Out',    value: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)', points: [0.455, 0.03, 0.515, 0.955] },

  // Cubic
  'cubic-in':     { label: 'Cubic In',       value: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)', points: [0.55, 0.055, 0.675, 0.19] },
  'cubic-out':    { label: 'Cubic Out',      value: 'cubic-bezier(0.215, 0.61, 0.355, 1)',    points: [0.215, 0.61, 0.355, 1] },
  'cubic-in-out': { label: 'Cubic In Out',   value: 'cubic-bezier(0.645, 0.045, 0.355, 1)',   points: [0.645, 0.045, 0.355, 1] },

  // Quart
  'quart-in':     { label: 'Quart In',       value: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)', points: [0.895, 0.03, 0.685, 0.22] },
  'quart-out':    { label: 'Quart Out',      value: 'cubic-bezier(0.165, 0.84, 0.44, 1)',     points: [0.165, 0.84, 0.44, 1] },
  'quart-in-out': { label: 'Quart In Out',   value: 'cubic-bezier(0.77, 0, 0.175, 1)',        points: [0.77, 0, 0.175, 1] },

  // Quint
  'quint-in':     { label: 'Quint In',       value: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)', points: [0.755, 0.05, 0.855, 0.06] },
  'quint-out':    { label: 'Quint Out',      value: 'cubic-bezier(0.23, 1, 0.32, 1)',         points: [0.23, 1, 0.32, 1] },
  'quint-in-out': { label: 'Quint In Out',   value: 'cubic-bezier(0.86, 0, 0.07, 1)',         points: [0.86, 0, 0.07, 1] },

  // Sine
  'sine-in':      { label: 'Sine In',        value: 'cubic-bezier(0.47, 0, 0.745, 0.715)',    points: [0.47, 0, 0.745, 0.715] },
  'sine-out':     { label: 'Sine Out',       value: 'cubic-bezier(0.39, 0.575, 0.565, 1)',    points: [0.39, 0.575, 0.565, 1] },
  'sine-in-out':  { label: 'Sine In Out',    value: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',  points: [0.445, 0.05, 0.55, 0.95] },

  // Expo
  'expo-in':      { label: 'Expo In',        value: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)', points: [0.95, 0.05, 0.795, 0.035] },
  'expo-out':     { label: 'Expo Out',       value: 'cubic-bezier(0.19, 1, 0.22, 1)',         points: [0.19, 1, 0.22, 1] },
  'expo-in-out':  { label: 'Expo In Out',    value: 'cubic-bezier(1, 0, 0, 1)',               points: [1, 0, 0, 1] },

  // Circ
  'circ-in':      { label: 'Circ In',        value: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',   points: [0.6, 0.04, 0.98, 0.335] },
  'circ-out':     { label: 'Circ Out',       value: 'cubic-bezier(0.075, 0.82, 0.165, 1)',    points: [0.075, 0.82, 0.165, 1] },
  'circ-in-out':  { label: 'Circ In Out',    value: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)', points: [0.785, 0.135, 0.15, 0.86] },

  // Back
  'back-in':      { label: 'Back In',        value: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)', points: [0.6, -0.28, 0.735, 0.045] },
  'back-out':     { label: 'Back Out',       value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', points: [0.175, 0.885, 0.32, 1.275] },
  'back-in-out':  { label: 'Back In Out',    value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', points: [0.68, -0.55, 0.265, 1.55] },

  // Bounce (use linear + keyframe expansion at runtime)
  'bounce-in':    { label: 'Bounce In',      value: 'linear', points: null },
  'bounce-out':   { label: 'Bounce Out',     value: 'linear', points: null },
  'bounce-in-out': { label: 'Bounce In Out', value: 'linear', points: null },

  // Elastic (use linear + keyframe expansion at runtime)
  'elastic-in':    { label: 'Elastic In',      value: 'linear', points: null },
  'elastic-out':   { label: 'Elastic Out',     value: 'linear', points: null },
  'elastic-in-out': { label: 'Elastic In Out', value: 'linear', points: null },

  // Custom
  'custom':        { label: 'Custom',          value: 'cubic-bezier(0.25, 0.1, 0.25, 1)', points: [0.25, 0.1, 0.25, 1] },
}

export function getEasingValue(name: EasingPresetName): string {
  return EASING_MAP[name]?.value ?? name
}

export function getEasingDef(name: EasingPresetName): EasingDef {
  const entry = EASING_MAP[name]
  return { name, ...entry }
}

export function isSpecialEasing(name: EasingPresetName): boolean {
  return name.startsWith('bounce') || name.startsWith('elastic')
}

/** Generate bounce keyframes for Web Animations API */
export function generateBounceKeyframes(direction: 'in' | 'out' | 'in-out'): { offset: number; easing?: string }[] {
  if (direction === 'out') {
    return [
      { offset: 0 },
      { offset: 0.363 },
      { offset: 0.727 },
      { offset: 0.909 },
      { offset: 1 },
    ]
  }
  if (direction === 'in') {
    return [
      { offset: 0 },
      { offset: 0.091 },
      { offset: 0.273 },
      { offset: 0.637 },
      { offset: 1 },
    ]
  }
  // in-out
  return [
    { offset: 0 },
    { offset: 0.25 },
    { offset: 0.5 },
    { offset: 0.75 },
    { offset: 1 },
  ]
}

/** Generate elastic keyframes for Web Animations API */
export function generateElasticKeyframes(direction: 'in' | 'out' | 'in-out', steps = 10): { offset: number; value: number }[] {
  const keyframes: { offset: number; value: number }[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    let value: number
    if (direction === 'out') {
      value = Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1
    } else if (direction === 'in') {
      value = -(Math.pow(2, 10 * (t - 1)) * Math.sin(((t - 1) - 0.075) * (2 * Math.PI) / 0.3))
    } else {
      const p = t * 2
      if (p < 1) {
        value = -0.5 * (Math.pow(2, 10 * (p - 1)) * Math.sin(((p - 1) - 0.1125) * (2 * Math.PI) / 0.45))
      } else {
        value = Math.pow(2, -10 * (p - 1)) * Math.sin(((p - 1) - 0.1125) * (2 * Math.PI) / 0.45) * 0.5 + 1
      }
    }
    keyframes.push({ offset: t, value: Math.round(value * 1000) / 1000 })
  }
  return keyframes
}

// ─── Grouped for UI ───

export interface EasingGroup {
  label: string
  presets: EasingPresetName[]
}

export const EASING_GROUPS: EasingGroup[] = [
  { label: 'Standard', presets: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'spring'] },
  { label: 'Quad',     presets: ['quad-in', 'quad-out', 'quad-in-out'] },
  { label: 'Cubic',    presets: ['cubic-in', 'cubic-out', 'cubic-in-out'] },
  { label: 'Quart',    presets: ['quart-in', 'quart-out', 'quart-in-out'] },
  { label: 'Quint',    presets: ['quint-in', 'quint-out', 'quint-in-out'] },
  { label: 'Sine',     presets: ['sine-in', 'sine-out', 'sine-in-out'] },
  { label: 'Expo',     presets: ['expo-in', 'expo-out', 'expo-in-out'] },
  { label: 'Circ',     presets: ['circ-in', 'circ-out', 'circ-in-out'] },
  { label: 'Back',     presets: ['back-in', 'back-out', 'back-in-out'] },
  { label: 'Bounce',   presets: ['bounce-in', 'bounce-out', 'bounce-in-out'] },
  { label: 'Elastic',  presets: ['elastic-in', 'elastic-out', 'elastic-in-out'] },
  { label: 'Custom',   presets: ['custom'] },
]

export function getEasingLabel(name: EasingPresetName): string {
  return EASING_MAP[name]?.label ?? name
}

export function getEasingPoints(name: EasingPresetName): [number, number, number, number] | null {
  return EASING_MAP[name]?.points ?? null
}
