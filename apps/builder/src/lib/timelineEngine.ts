// ─── Timeline Engine ───
// Resolves timeline tracks/actions and manages playback

import type { TimelineConfig, TimelineAction, AnimatableProperties } from '@/types/interactions'
import { getEasingValue } from '@/data/easingPresets'

interface ResolvedAction {
  action: TimelineAction
  absoluteStart: number
  element: HTMLElement | null
}

// ─── Label resolution ───

function resolveLabels(actions: TimelineAction[]): Map<string, number> {
  const labels = new Map<string, number>()
  for (const action of actions) {
    if (action.type === 'label' && action.label) {
      labels.set(action.label, action.startTime)
    }
  }
  return labels
}

function resolveRelativeOffset(offset: string, labels: Map<string, number>): number {
  // Format: "labelName+=200" or "labelName-=100" or "labelName"
  const match = offset.match(/^(\w+)([+-]=?)(\d+)?$/)
  if (!match) return 0

  const [, labelName, op, value] = match
  const labelTime = labels.get(labelName) ?? 0
  const numValue = parseInt(value ?? '0')

  if (op === '+=' || op === '+') return labelTime + numValue
  if (op === '-=' || op === '-') return labelTime - numValue
  return labelTime
}

// ─── Flatten timeline ───

export function flattenTimeline(
  config: TimelineConfig,
  allTimelines?: Map<string, TimelineConfig>
): ResolvedAction[] {
  const resolved: ResolvedAction[] = []

  // Collect all actions from tracks
  const allActions: TimelineAction[] = []
  for (const track of config.tracks) {
    for (const action of track.actions) {
      allActions.push({ ...action, elementRef: action.elementRef ?? track.elementRef })
    }
  }

  const labels = resolveLabels(allActions)

  for (const action of allActions) {
    if (action.type === 'label') continue

    let absoluteStart = action.startTime
    if (action.relativeOffset) {
      absoluteStart = resolveRelativeOffset(action.relativeOffset, labels)
    }

    const element = action.elementRef
      ? document.querySelector(`[data-element-id="${action.elementRef}"]`) as HTMLElement | null
      : null

    resolved.push({ action, absoluteStart, element })
  }

  // Flatten child timelines
  if (config.childTimelines && allTimelines) {
    for (const childId of config.childTimelines) {
      const childConfig = allTimelines.get(childId)
      if (!childConfig) continue
      const childActions = flattenTimeline(childConfig, allTimelines)
      resolved.push(...childActions)
    }
  }

  return resolved.sort((a, b) => a.absoluteStart - b.absoluteStart)
}

// ─── Playback ───

function buildTransform(props: Partial<AnimatableProperties>): string {
  const parts: string[] = []
  if (props.x != null) parts.push(`translateX(${props.x}px)`)
  if (props.y != null) parts.push(`translateY(${props.y}px)`)
  if (props.z != null) parts.push(`translateZ(${props.z}px)`)
  if (props.scale != null) parts.push(`scale(${props.scale})`)
  if (props.scaleX != null) parts.push(`scaleX(${props.scaleX})`)
  if (props.scaleY != null) parts.push(`scaleY(${props.scaleY})`)
  if (props.scaleZ != null) parts.push(`scaleZ(${props.scaleZ})`)
  if (props.rotate != null) parts.push(`rotate(${props.rotate}deg)`)
  if (props.rotateX != null) parts.push(`rotateX(${props.rotateX}deg)`)
  if (props.rotateY != null) parts.push(`rotateY(${props.rotateY}deg)`)
  if (props.rotateZ != null) parts.push(`rotateZ(${props.rotateZ}deg)`)
  if (props.skewX != null) parts.push(`skewX(${props.skewX}deg)`)
  if (props.skewY != null) parts.push(`skewY(${props.skewY}deg)`)
  return parts.length ? parts.join(' ') : ''
}

export class TimelinePlayer {
  private config: TimelineConfig
  private resolvedActions: ResolvedAction[] = []
  private runningAnims: Animation[] = []
  private startTimestamp = 0
  private rafId: number | null = null
  private _currentTime = 0
  private _isPlaying = false
  private _onTimeUpdate?: (time: number) => void

  constructor(config: TimelineConfig, onTimeUpdate?: (time: number) => void) {
    this.config = config
    this._onTimeUpdate = onTimeUpdate
  }

  resolve(allTimelines?: Map<string, TimelineConfig>) {
    this.resolvedActions = flattenTimeline(this.config, allTimelines)
  }

  play() {
    if (this._isPlaying) return
    this._isPlaying = true
    this.startTimestamp = performance.now() - this._currentTime

    for (const { action, absoluteStart, element } of this.resolvedActions) {
      if (!element || action.type === 'label' || action.type === 'call') continue

      const fromProps = action.from ?? {}
      const toProps = action.to ?? {}

      const fromKf: Keyframe = {}
      const toKf: Keyframe = {}

      const fromTransform = buildTransform(fromProps)
      const toTransform = buildTransform(toProps)
      if (fromTransform) fromKf.transform = fromTransform
      if (toTransform) toKf.transform = toTransform
      if (fromProps.opacity != null) fromKf.opacity = fromProps.opacity
      if (toProps.opacity != null) toKf.opacity = toProps.opacity
      // Color properties
      if (fromProps.color) fromKf.color = fromProps.color
      if (toProps.color) toKf.color = toProps.color
      if (fromProps.backgroundColor) fromKf.backgroundColor = fromProps.backgroundColor
      if (toProps.backgroundColor) toKf.backgroundColor = toProps.backgroundColor
      // Filter
      const buildFilter = (p: Partial<AnimatableProperties>) => {
        const f: string[] = []
        if (p.blur != null) f.push(`blur(${p.blur}px)`)
        if (p.brightness != null) f.push(`brightness(${p.brightness})`)
        if (p.contrast != null) f.push(`contrast(${p.contrast})`)
        if (p.grayscale != null) f.push(`grayscale(${p.grayscale})`)
        if (p.hueRotate != null) f.push(`hue-rotate(${p.hueRotate}deg)`)
        if (p.saturate != null) f.push(`saturate(${p.saturate})`)
        return f.length ? f.join(' ') : ''
      }
      const fromFilter = buildFilter(fromProps)
      const toFilter = buildFilter(toProps)
      if (fromFilter) fromKf.filter = fromFilter
      if (toFilter) toKf.filter = toFilter

      const easing = Array.isArray(action.easing)
        ? `cubic-bezier(${action.easing.join(',')})`
        : getEasingValue(action.easing ?? 'ease')

      const anim = element.animate(
        action.tweenMode === 'from' ? [toKf, fromKf] : [fromKf, toKf],
        {
          duration: action.duration,
          delay: absoluteStart,
          easing,
          fill: 'forwards',
        }
      )

      anim.playbackRate = this.config.playbackRate
      this.runningAnims.push(anim)
    }

    this.tick()
  }

  private tick = () => {
    if (!this._isPlaying) return
    // playbackRate is already applied by WAAPI on each animation, so we
    // just track wall-clock time scaled by rate for the scrubber display.
    this._currentTime = (performance.now() - this.startTimestamp) * this.config.playbackRate
    this._onTimeUpdate?.(this._currentTime)

    if (this._currentTime >= this.config.totalDuration) {
      if (this.config.repeat === -1 || this.config.repeat > 1) {
        this._currentTime = 0
        this.startTimestamp = performance.now()
      } else {
        this.pause()
        return
      }
    }

    this.rafId = requestAnimationFrame(this.tick)
  }

  pause() {
    this._isPlaying = false
    if (this.rafId) cancelAnimationFrame(this.rafId)
    this.runningAnims.forEach(a => a.pause())
  }

  stop() {
    this._isPlaying = false
    this._currentTime = 0
    if (this.rafId) cancelAnimationFrame(this.rafId)
    this.runningAnims.forEach(a => a.cancel())
    this.runningAnims = []
  }

  seekTo(time: number) {
    this._currentTime = time
    // WAAPI animations use delay = absoluteStart, so currentTime is relative
    // to animation creation (0 = before delay). We pass timeline time directly.
    this.runningAnims.forEach(a => {
      a.currentTime = time
    })
    // Recalculate startTimestamp so tick() continues from the new position
    if (this._isPlaying) {
      this.startTimestamp = performance.now() - time / this.config.playbackRate
    }
    this._onTimeUpdate?.(time)
  }

  setPlaybackRate(rate: number) {
    // Recalculate startTimestamp to avoid time jumps when changing rate mid-playback
    if (this._isPlaying) {
      const now = performance.now()
      this.startTimestamp = now - this._currentTime / rate
    }
    this.config.playbackRate = rate
    this.runningAnims.forEach(a => { a.playbackRate = rate })
  }

  get currentTime() { return this._currentTime }
  get isPlaying() { return this._isPlaying }
  get totalDuration() { return this.config.totalDuration }

  destroy() {
    this.stop()
  }
}
