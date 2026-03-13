// ─── Web Animations API Engine ───

import type { AnimationConfig, AnimatableProperties } from '@/types/interactions'
import type { AnimationEngineDriver, EngineAnimation } from './engineAdapter'
import { registerEngine } from './engineAdapter'
import { getEasingValue, isSpecialEasing } from '@/data/easingPresets'

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
  return parts.join(' ')
}

function buildFilter(props: Partial<AnimatableProperties>): string {
  const parts: string[] = []
  if (props.blur != null) parts.push(`blur(${props.blur}px)`)
  if (props.brightness != null) parts.push(`brightness(${props.brightness})`)
  if (props.contrast != null) parts.push(`contrast(${props.contrast})`)
  if (props.grayscale != null) parts.push(`grayscale(${props.grayscale})`)
  if (props.hueRotate != null) parts.push(`hue-rotate(${props.hueRotate}deg)`)
  if (props.saturate != null) parts.push(`saturate(${props.saturate})`)
  if (props.sepia != null) parts.push(`sepia(${props.sepia})`)
  return parts.join(' ')
}

function propsToKeyframe(props: Partial<AnimatableProperties>): Keyframe {
  const kf: Keyframe = {}
  const transform = buildTransform(props)
  const filter = buildFilter(props)
  if (transform) kf.transform = transform
  if (filter) kf.filter = filter
  if (props.opacity != null) kf.opacity = props.opacity
  if (props.color) kf.color = props.color
  if (props.backgroundColor) kf.backgroundColor = props.backgroundColor
  return kf
}

function getEasing(easing: AnimationConfig['easing']): string {
  if (Array.isArray(easing)) return `cubic-bezier(${easing.join(',')})`
  if (isSpecialEasing(easing)) return 'linear'
  return getEasingValue(easing)
}

function wrapAnimation(anim: Animation): EngineAnimation {
  return {
    play: () => anim.play(),
    pause: () => anim.pause(),
    resume: () => anim.play(),
    seek: (time) => { anim.currentTime = time },
    setSpeed: (rate) => { anim.playbackRate = rate },
    cancel: () => anim.cancel(),
    finished: anim.finished.then(() => {}),
  }
}

const webApiEngine: AnimationEngineDriver = {
  name: 'web-api',

  animate(element, config, from, to) {
    const fromKf = propsToKeyframe(from)
    const toKf = propsToKeyframe(to)
    const iterations = config.repeatConfig
      ? config.repeatConfig.count === -1 ? Infinity : config.repeatConfig.count
      : config.repeat === -1 ? Infinity : (config.repeat ?? 1)

    const anim = element.animate([fromKf, toKf], {
      duration: config.duration,
      delay: config.delay,
      easing: getEasing(config.easing),
      fill: 'forwards',
      iterations,
      direction: config.repeatConfig?.yoyo ? 'alternate' : (config.playback?.direction ?? 'normal'),
    })

    if (config.playback?.speed) anim.playbackRate = config.playback.speed
    return wrapAnimation(anim)
  },

  animateKeyframes(element, config, keyframes) {
    const kfs = keyframes.map(kf => ({
      offset: kf.offset,
      ...propsToKeyframe(kf.properties),
    }))
    const iterations = config.repeatConfig
      ? config.repeatConfig.count === -1 ? Infinity : config.repeatConfig.count
      : config.repeat === -1 ? Infinity : (config.repeat ?? 1)

    const anim = element.animate(kfs, {
      duration: config.duration,
      delay: config.delay,
      easing: getEasing(config.easing),
      iterations,
      direction: config.repeatConfig?.yoyo ? 'alternate' : 'normal',
    })

    return wrapAnimation(anim)
  },
}

registerEngine(webApiEngine)
export { webApiEngine }
