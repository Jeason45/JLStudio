// ─── Animation Engine Adapter ───
// Facade that routes animation execution to the correct engine

import type { AnimationConfig, AnimatableProperties } from '@/types/interactions'

export type AnimationEngine = 'web-api' | 'gsap' | 'css-keyframes'

export interface EngineAnimation {
  play(): void
  pause(): void
  resume(): void
  seek(time: number): void
  setSpeed(rate: number): void
  cancel(): void
  readonly finished: Promise<void>
}

export interface AnimationEngineDriver {
  name: AnimationEngine
  animate(
    element: HTMLElement,
    config: AnimationConfig,
    from: Partial<AnimatableProperties>,
    to: Partial<AnimatableProperties>,
  ): EngineAnimation
  animateKeyframes(
    element: HTMLElement,
    config: AnimationConfig,
    keyframes: { offset: number; properties: Partial<AnimatableProperties> }[],
  ): EngineAnimation
}

const engines = new Map<AnimationEngine, AnimationEngineDriver>()

export function registerEngine(engine: AnimationEngineDriver) {
  engines.set(engine.name, engine)
}

export function getEngine(name: AnimationEngine): AnimationEngineDriver | undefined {
  return engines.get(name)
}

export function getDefaultEngine(): AnimationEngine {
  return 'web-api'
}

export function resolveEngine(config: AnimationConfig): AnimationEngineDriver {
  const name = config.engine ?? getDefaultEngine()
  const engine = engines.get(name)
  if (!engine) {
    // Fallback to web-api
    const fallback = engines.get('web-api')
    if (!fallback) throw new Error('No animation engine registered')
    return fallback
  }
  return engine
}
