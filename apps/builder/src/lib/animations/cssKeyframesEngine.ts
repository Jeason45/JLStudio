// ─── CSS Keyframes Engine ───
// Generates @keyframes CSS rules instead of runtime animations

import type { AnimationConfig, AnimatableProperties } from '@/types/interactions'
import type { AnimationEngineDriver, EngineAnimation } from './engineAdapter'
import { registerEngine } from './engineAdapter'
import { getEasingValue } from '@/data/easingPresets'

let styleElement: HTMLStyleElement | null = null
let ruleCounter = 0

function getStyleElement(): HTMLStyleElement {
  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = 'css-keyframes-engine'
    document.head.appendChild(styleElement)
  }
  return styleElement
}

function propsToCSS(props: Partial<AnimatableProperties>): string {
  const rules: string[] = []
  const transforms: string[] = []

  if (props.x != null) transforms.push(`translateX(${props.x}px)`)
  if (props.y != null) transforms.push(`translateY(${props.y}px)`)
  if (props.z != null) transforms.push(`translateZ(${props.z}px)`)
  if (props.scale != null) transforms.push(`scale(${props.scale})`)
  if (props.scaleX != null) transforms.push(`scaleX(${props.scaleX})`)
  if (props.scaleY != null) transforms.push(`scaleY(${props.scaleY})`)
  if (props.scaleZ != null) transforms.push(`scaleZ(${props.scaleZ})`)
  if (props.rotate != null) transforms.push(`rotate(${props.rotate}deg)`)
  if (props.rotateX != null) transforms.push(`rotateX(${props.rotateX}deg)`)
  if (props.rotateY != null) transforms.push(`rotateY(${props.rotateY}deg)`)
  if (props.rotateZ != null) transforms.push(`rotateZ(${props.rotateZ}deg)`)
  if (props.skewX != null) transforms.push(`skewX(${props.skewX}deg)`)
  if (props.skewY != null) transforms.push(`skewY(${props.skewY}deg)`)
  if (transforms.length) rules.push(`transform: ${transforms.join(' ')}`)

  const filters: string[] = []
  if (props.blur != null) filters.push(`blur(${props.blur}px)`)
  if (props.brightness != null) filters.push(`brightness(${props.brightness})`)
  if (props.contrast != null) filters.push(`contrast(${props.contrast})`)
  if (props.grayscale != null) filters.push(`grayscale(${props.grayscale})`)
  if (props.hueRotate != null) filters.push(`hue-rotate(${props.hueRotate}deg)`)
  if (props.saturate != null) filters.push(`saturate(${props.saturate})`)
  if (props.sepia != null) filters.push(`sepia(${props.sepia})`)
  if (filters.length) rules.push(`filter: ${filters.join(' ')}`)

  if (props.opacity != null) rules.push(`opacity: ${props.opacity}`)
  if (props.color) rules.push(`color: ${props.color}`)
  if (props.backgroundColor) rules.push(`background-color: ${props.backgroundColor}`)
  if (props.width) rules.push(`width: ${props.width}`)
  if (props.height) rules.push(`height: ${props.height}`)
  if (props.borderRadius) rules.push(`border-radius: ${props.borderRadius}`)
  if (props.boxShadow) rules.push(`box-shadow: ${props.boxShadow}`)
  if (props.clipPath) rules.push(`clip-path: ${props.clipPath}`)

  return rules.join('; ')
}

function getEasing(easing: AnimationConfig['easing']): string {
  if (Array.isArray(easing)) return `cubic-bezier(${easing.join(',')})`
  return getEasingValue(easing)
}

function createKeyframesRule(
  name: string,
  from: Partial<AnimatableProperties>,
  to: Partial<AnimatableProperties>,
): string {
  return `@keyframes ${name} { from { ${propsToCSS(from)} } to { ${propsToCSS(to)} } }`
}

function createKeyframesFromArray(
  name: string,
  keyframes: { offset: number; properties: Partial<AnimatableProperties> }[],
): string {
  const frames = keyframes.map(kf => `${Math.round(kf.offset * 100)}% { ${propsToCSS(kf.properties)} }`)
  return `@keyframes ${name} { ${frames.join(' ')} }`
}

function wrapCSSAnimation(element: HTMLElement, animName: string, config: AnimationConfig): EngineAnimation {
  const duration = config.duration
  return {
    play: () => { element.style.animationPlayState = 'running' },
    pause: () => { element.style.animationPlayState = 'paused' },
    resume: () => { element.style.animationPlayState = 'running' },
    seek: (time: number) => {
      // Seek by re-applying animation with negative delay
      element.style.animationPlayState = 'paused'
      element.style.animationDelay = `-${Math.min(time, duration)}ms`
    },
    setSpeed: (rate: number) => { element.style.animationDuration = `${duration / rate}ms` },
    cancel: () => { element.style.animation = '' },
    finished: new Promise<void>((resolve) => {
      element.addEventListener('animationend', () => resolve(), { once: true })
    }),
  }
}

const cssKeyframesEngine: AnimationEngineDriver = {
  name: 'css-keyframes',

  animate(element, config, from, to) {
    const animName = `cke-${++ruleCounter}`
    const rule = createKeyframesRule(animName, from, to)
    const style = getStyleElement()
    style.sheet?.insertRule(rule, style.sheet.cssRules.length)

    const iterations = config.repeatConfig
      ? config.repeatConfig.count === -1 ? 'infinite' : String(config.repeatConfig.count)
      : config.repeat === -1 ? 'infinite' : String(config.repeat ?? 1)

    const direction = config.repeatConfig?.yoyo ? 'alternate' : (config.playback?.direction ?? 'normal')

    element.style.animation = `${animName} ${config.duration}ms ${getEasing(config.easing)} ${config.delay}ms ${iterations} ${direction} forwards`

    return wrapCSSAnimation(element, animName, config)
  },

  animateKeyframes(element, config, keyframes) {
    const animName = `cke-${++ruleCounter}`
    const rule = createKeyframesFromArray(animName, keyframes)
    const style = getStyleElement()
    style.sheet?.insertRule(rule, style.sheet.cssRules.length)

    const iterations = config.repeatConfig
      ? config.repeatConfig.count === -1 ? 'infinite' : String(config.repeatConfig.count)
      : config.repeat === -1 ? 'infinite' : String(config.repeat ?? 1)

    const direction = config.repeatConfig?.yoyo ? 'alternate' : 'normal'
    element.style.animation = `${animName} ${config.duration}ms ${getEasing(config.easing)} ${config.delay}ms ${iterations} ${direction} forwards`

    return wrapCSSAnimation(element, animName, config)
  },
}

registerEngine(cssKeyframesEngine)
export { cssKeyframesEngine }

/** Generate static @keyframes CSS string for export */
export function generateCSSKeyframes(
  name: string,
  from: Partial<AnimatableProperties>,
  to: Partial<AnimatableProperties>,
): string {
  return createKeyframesRule(name, from, to)
}

export function generateCSSKeyframesFromArray(
  name: string,
  keyframes: { offset: number; properties: Partial<AnimatableProperties> }[],
): string {
  return createKeyframesFromArray(name, keyframes)
}
