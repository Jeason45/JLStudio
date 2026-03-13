'use client'
import { useEffect, useRef } from 'react'
import type { AnimationConfig, AnimatableProperties, StaggerConfig, ScrollTriggerConfig } from '@/types/interactions'
import { getEasingValue, isSpecialEasing, generateElasticKeyframes } from '@/data/easingPresets'
import { animationRegistry } from '@/lib/animationPlayback'
import { scrollObserver } from '@/lib/scrollEngine'
import { addWillChange, removeWillChange, detectAnimatedProperties } from '@/lib/animations/willChangeManager'

interface AnimationControllerProps {
  sectionId: string
  interactions: Record<string, AnimationConfig[]>
  disabled?: boolean
}

// ─── Transform builders ───

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

function buildFilter(props: Partial<AnimatableProperties>): string {
  const parts: string[] = []
  if (props.blur != null) parts.push(`blur(${props.blur}px)`)
  if (props.brightness != null) parts.push(`brightness(${props.brightness})`)
  if (props.contrast != null) parts.push(`contrast(${props.contrast})`)
  if (props.grayscale != null) parts.push(`grayscale(${props.grayscale})`)
  if (props.hueRotate != null) parts.push(`hue-rotate(${props.hueRotate}deg)`)
  if (props.invert != null) parts.push(`invert(${props.invert})`)
  if (props.saturate != null) parts.push(`saturate(${props.saturate})`)
  if (props.sepia != null) parts.push(`sepia(${props.sepia})`)
  return parts.length ? parts.join(' ') : ''
}

function buildBackdropFilter(props: Partial<AnimatableProperties>): string {
  const parts: string[] = []
  if (props.backdropBlur != null) parts.push(`blur(${props.backdropBlur}px)`)
  if (props.backdropBrightness != null) parts.push(`brightness(${props.backdropBrightness})`)
  return parts.length ? parts.join(' ') : ''
}

function propsToKeyframe(props: Partial<AnimatableProperties>): Keyframe {
  const kf: Keyframe = {}
  const transform = buildTransform(props)
  const filter = buildFilter(props)
  const backdropFilter = buildBackdropFilter(props)

  if (transform) kf.transform = transform
  if (filter) kf.filter = filter
  if (backdropFilter) (kf as Record<string, unknown>)['backdropFilter'] = backdropFilter

  if (props.opacity != null) kf.opacity = props.opacity
  if (props.color) kf.color = props.color
  if (props.backgroundColor) kf.backgroundColor = props.backgroundColor
  if (props.borderColor) (kf as Record<string, unknown>)['borderColor'] = props.borderColor

  // Sizing
  if (props.width) (kf as Record<string, unknown>)['width'] = props.width
  if (props.height) (kf as Record<string, unknown>)['height'] = props.height

  // Spacing
  if (props.paddingTop) (kf as Record<string, unknown>)['paddingTop'] = props.paddingTop
  if (props.paddingRight) (kf as Record<string, unknown>)['paddingRight'] = props.paddingRight
  if (props.paddingBottom) (kf as Record<string, unknown>)['paddingBottom'] = props.paddingBottom
  if (props.paddingLeft) (kf as Record<string, unknown>)['paddingLeft'] = props.paddingLeft
  if (props.marginTop) (kf as Record<string, unknown>)['marginTop'] = props.marginTop
  if (props.marginRight) (kf as Record<string, unknown>)['marginRight'] = props.marginRight
  if (props.marginBottom) (kf as Record<string, unknown>)['marginBottom'] = props.marginBottom
  if (props.marginLeft) (kf as Record<string, unknown>)['marginLeft'] = props.marginLeft

  // Border
  if (props.borderWidth) (kf as Record<string, unknown>)['borderWidth'] = props.borderWidth
  if (props.borderRadius) (kf as Record<string, unknown>)['borderRadius'] = props.borderRadius

  // Typography
  if (props.fontSize) (kf as Record<string, unknown>)['fontSize'] = props.fontSize
  if (props.letterSpacing) (kf as Record<string, unknown>)['letterSpacing'] = props.letterSpacing
  if (props.lineHeight) (kf as Record<string, unknown>)['lineHeight'] = props.lineHeight

  // Shadow
  if (props.boxShadow) (kf as Record<string, unknown>)['boxShadow'] = props.boxShadow
  if (props.textShadow) (kf as Record<string, unknown>)['textShadow'] = props.textShadow

  // Clip
  if (props.clipPath) (kf as Record<string, unknown>)['clipPath'] = props.clipPath

  return kf
}

// ─── Easing resolution ───

function getEasing(easing: AnimationConfig['easing']): string {
  if (Array.isArray(easing)) return `cubic-bezier(${easing.join(',')})`
  return getEasingValue(easing)
}

function getRepeatCount(config: AnimationConfig): number {
  if (config.repeatConfig) {
    return config.repeatConfig.count === -1 ? Infinity : config.repeatConfig.count
  }
  if (config.repeat != null) {
    return config.repeat === -1 ? Infinity : config.repeat
  }
  return 1
}

function getPlaybackRate(config: AnimationConfig): number {
  return config.playback?.speed ?? 1
}

function getDirection(config: AnimationConfig): PlaybackDirection {
  if (config.repeatConfig?.yoyo) return 'alternate'
  if (config.playback?.direction) return config.playback.direction
  return 'normal'
}

// ─── Stagger helpers ───

function getStaggerDelays(count: number, stagger: StaggerConfig): number[] {
  const delays: number[] = []
  const { value, direction } = stagger

  for (let i = 0; i < count; i++) {
    let index: number
    switch (direction) {
      case 'reverse':
        index = count - 1 - i
        break
      case 'center': {
        const center = (count - 1) / 2
        index = Math.abs(i - center)
        break
      }
      case 'edges': {
        const center = (count - 1) / 2
        index = center - Math.abs(i - center)
        break
      }
      case 'random':
        index = Math.random() * count
        break
      default:
        index = i
    }
    delays.push(index * value)
  }
  return delays
}

// ─── Animation appliers ───

function applyEntranceAnimation(el: HTMLElement, config: AnimationConfig) {
  if (!config.from && !config.to) return

  // GPU optimization: apply will-change before animation
  const willChangeProps = detectAnimatedProperties(
    config.from as Record<string, unknown>,
    config.to as Record<string, unknown>
  )
  if (willChangeProps.length > 0) addWillChange(el, willChangeProps)

  const fromKf = propsToKeyframe(config.from ?? {})
  const toKf = propsToKeyframe(config.to ?? {})
  const easingStr = getEasing(config.easing)
  const iterations = getRepeatCount(config)

  // Set initial state
  Object.assign(el.style, fromKf)

  // Handle special easings (bounce/elastic) by expanding keyframes
  const useSpecial = typeof config.easing === 'string' && isSpecialEasing(config.easing)

  const animOptions: KeyframeAnimationOptions = {
    duration: config.duration,
    delay: config.delay,
    easing: useSpecial ? 'linear' : easingStr,
    fill: 'forwards',
    iterations,
    direction: getDirection(config),
    playbackRate: getPlaybackRate(config),
  }

  let keyframes: Keyframe[]
  if (useSpecial && typeof config.easing === 'string' && config.easing.startsWith('elastic')) {
    const dir = config.easing.replace('elastic-', '') as 'in' | 'out' | 'in-out'
    const elasticKfs = generateElasticKeyframes(dir)
    keyframes = elasticKfs.map(ekf => {
      const interpolated: Keyframe = {}
      // Interpolate between from and to using elastic value
      for (const [key, fromVal] of Object.entries(fromKf)) {
        const toVal = (toKf as Record<string, unknown>)[key]
        if (typeof fromVal === 'number' && typeof toVal === 'number') {
          (interpolated as Record<string, unknown>)[key] = fromVal + (toVal - fromVal) * ekf.value
        }
      }
      interpolated.offset = ekf.offset
      return interpolated
    })
  } else {
    keyframes = [fromKf, toKf]
  }

  if (config.trigger.type === 'scroll-into-view') {
    const threshold = config.trigger.threshold ?? 0.2
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const anim = el.animate(keyframes, animOptions)
          anim.addEventListener('finish', () => removeWillChange(el), { once: true })
          animationRegistry.register({ id: config.id, animation: anim, element: el, paused: false })
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => { observer.disconnect(); animationRegistry.unregister(config.id) }
  }

  if (config.trigger.type === 'page-load') {
    const opts = { ...animOptions, delay: (config.trigger.delay ?? 0) + config.delay }
    const anim = el.animate(keyframes, opts)
    anim.addEventListener('finish', () => removeWillChange(el), { once: true })
    animationRegistry.register({ id: config.id, animation: anim, element: el, paused: false })
    return () => { anim.cancel(); removeWillChange(el, 0); animationRegistry.unregister(config.id) }
  }
}

function applyHoverAnimation(el: HTMLElement, config: AnimationConfig) {
  if (!config.to) return

  // GPU optimization: will-change for hover (persistent, removed on cleanup)
  const hoverWcProps = detectAnimatedProperties(undefined, config.to as Record<string, unknown>)
  if (hoverWcProps.length > 0) addWillChange(el, hoverWcProps)

  const toKf = propsToKeyframe(config.to)
  const duration = config.duration
  const easing = getEasing(config.easing)

  const transitionProps: string[] = []
  const hasTransform = config.to.scale != null || config.to.x != null || config.to.y != null ||
    config.to.rotate != null || config.to.rotateX != null || config.to.rotateY != null ||
    config.to.skewX != null || config.to.skewY != null
  if (hasTransform) transitionProps.push(`transform ${duration}ms ${easing}`)
  if (config.to.opacity != null) transitionProps.push(`opacity ${duration}ms ${easing}`)
  const hasFilter = config.to.blur != null || config.to.brightness != null ||
    config.to.contrast != null || config.to.grayscale != null || config.to.saturate != null
  if (hasFilter) transitionProps.push(`filter ${duration}ms ${easing}`)
  if (config.to.color) transitionProps.push(`color ${duration}ms ${easing}`)
  if (config.to.backgroundColor) transitionProps.push(`background-color ${duration}ms ${easing}`)
  if (config.to.borderColor) transitionProps.push(`border-color ${duration}ms ${easing}`)
  if (config.to.boxShadow) transitionProps.push(`box-shadow ${duration}ms ${easing}`)
  if (config.to.borderRadius) transitionProps.push(`border-radius ${duration}ms ${easing}`)

  // Save original styles before applying hover transitions
  const originalStyles = {
    transform: el.style.transform,
    filter: el.style.filter,
    opacity: el.style.opacity,
    color: el.style.color,
    backgroundColor: el.style.backgroundColor,
    borderColor: el.style.borderColor,
    boxShadow: el.style.boxShadow,
    borderRadius: el.style.borderRadius,
  }

  const existingTransition = el.style.transition
  el.style.transition = [existingTransition, ...transitionProps].filter(Boolean).join(', ')

  const handleEnter = () => {
    if (toKf.transform) el.style.transform = toKf.transform as string
    if (toKf.filter) el.style.filter = toKf.filter as string
    if (toKf.opacity != null) el.style.opacity = String(toKf.opacity)
    if (toKf.color) el.style.color = toKf.color as string
    if (toKf.backgroundColor) el.style.backgroundColor = toKf.backgroundColor as string
    const r = toKf as Record<string, unknown>
    if (r.borderColor) el.style.borderColor = r.borderColor as string
    if (r.boxShadow) el.style.boxShadow = r.boxShadow as string
    if (r.borderRadius) el.style.borderRadius = r.borderRadius as string
  }

  const handleLeave = () => {
    // Restore original styles instead of clearing to empty string
    if (toKf.transform) el.style.transform = originalStyles.transform
    if (toKf.filter) el.style.filter = originalStyles.filter
    if (toKf.opacity != null) el.style.opacity = originalStyles.opacity
    if (toKf.color) el.style.color = originalStyles.color
    if (toKf.backgroundColor) el.style.backgroundColor = originalStyles.backgroundColor
    const r = toKf as Record<string, unknown>
    if (r.borderColor) el.style.borderColor = originalStyles.borderColor
    if (r.boxShadow) el.style.boxShadow = originalStyles.boxShadow
    if (r.borderRadius) el.style.borderRadius = originalStyles.borderRadius
  }

  el.addEventListener('mouseenter', handleEnter)
  el.addEventListener('mouseleave', handleLeave)

  return () => {
    el.removeEventListener('mouseenter', handleEnter)
    el.removeEventListener('mouseleave', handleLeave)
    el.style.transition = existingTransition
  }
}

function applyHoverEnterAnimation(el: HTMLElement, config: AnimationConfig) {
  if (!config.from && !config.to) return

  const fromKf = propsToKeyframe(config.from ?? {})
  const toKf = propsToKeyframe(config.to ?? {})

  const handler = () => {
    const anim = el.animate([fromKf, toKf], {
      duration: config.duration,
      delay: config.delay,
      easing: getEasing(config.easing),
      fill: 'forwards',
    })
    animationRegistry.register({ id: config.id + '-enter', animation: anim, element: el, paused: false })
  }

  el.addEventListener('mouseenter', handler)
  return () => { el.removeEventListener('mouseenter', handler); animationRegistry.unregister(config.id + '-enter') }
}

function applyHoverLeaveAnimation(el: HTMLElement, config: AnimationConfig) {
  if (!config.from && !config.to) return

  const fromKf = propsToKeyframe(config.from ?? {})
  const toKf = propsToKeyframe(config.to ?? {})

  const handler = () => {
    const anim = el.animate([fromKf, toKf], {
      duration: config.duration,
      delay: config.delay,
      easing: getEasing(config.easing),
      fill: 'forwards',
    })
    animationRegistry.register({ id: config.id + '-leave', animation: anim, element: el, paused: false })
  }

  el.addEventListener('mouseleave', handler)
  return () => { el.removeEventListener('mouseleave', handler); animationRegistry.unregister(config.id + '-leave') }
}

function applyEmphasisAnimation(el: HTMLElement, config: AnimationConfig) {
  if (!config.keyframes?.length) return

  const keyframes = config.keyframes.map(kf => ({
    offset: kf.offset,
    ...propsToKeyframe(kf.properties),
  }))

  const anim = el.animate(keyframes, {
    duration: config.duration,
    delay: config.delay,
    easing: getEasing(config.easing),
    iterations: getRepeatCount(config),
    direction: getDirection(config),
    playbackRate: getPlaybackRate(config),
  })

  animationRegistry.register({ id: config.id, animation: anim, element: el, paused: false })
  return () => { anim.cancel(); animationRegistry.unregister(config.id) }
}

function applyScrollAnimation(el: HTMLElement, config: AnimationConfig) {
  if (!config.from && !config.to) return

  const from = config.from ?? {}
  const to = config.to ?? {}

  const handleScroll = () => {
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight
    const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)))

    const lerp = (a: number, b: number) => a + (b - a) * progress
    const interpolated: Partial<AnimatableProperties> = {}

    if (from.y != null || to.y != null) interpolated.y = lerp(from.y ?? 0, to.y ?? 0)
    if (from.x != null || to.x != null) interpolated.x = lerp(from.x ?? 0, to.x ?? 0)
    if (from.opacity != null || to.opacity != null) interpolated.opacity = lerp(from.opacity ?? 1, to.opacity ?? 1)
    if (from.scale != null || to.scale != null) interpolated.scale = lerp(from.scale ?? 1, to.scale ?? 1)
    if (from.rotate != null || to.rotate != null) interpolated.rotate = lerp(from.rotate ?? 0, to.rotate ?? 0)
    if (from.blur != null || to.blur != null) interpolated.blur = lerp(from.blur ?? 0, to.blur ?? 0)
    if (from.brightness != null || to.brightness != null) interpolated.brightness = lerp(from.brightness ?? 1, to.brightness ?? 1)

    const transform = buildTransform(interpolated)
    const filter = buildFilter(interpolated)
    if (transform) el.style.transform = transform
    if (filter) el.style.filter = filter
    if (interpolated.opacity != null) el.style.opacity = String(interpolated.opacity)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  return () => window.removeEventListener('scroll', handleScroll)
}

function applyWhileScrollingAnimation(el: HTMLElement, config: AnimationConfig) {
  if (!config.from && !config.to) return
  if (config.trigger.type !== 'while-scrolling') return

  const fromKf = propsToKeyframe(config.from ?? {})
  const toKf = propsToKeyframe(config.to ?? {})
  const scrubSmoothing = typeof config.trigger.scrub === 'number' ? config.trigger.scrub : 0.1
  let currentProgress = 0
  let targetProgress = 0
  let rafId: number | null = null

  const applyAtProgress = (progress: number) => {
    const lerp = (a: unknown, b: unknown) => {
      if (typeof a === 'number' && typeof b === 'number') return a + (b - a) * progress
      return progress > 0.5 ? b : a
    }
    const interpolated: Keyframe = {}
    for (const key of new Set([...Object.keys(fromKf), ...Object.keys(toKf)])) {
      const fromVal = (fromKf as Record<string, unknown>)[key]
      const toVal = (toKf as Record<string, unknown>)[key]
      if (fromVal != null || toVal != null) {
        (interpolated as Record<string, unknown>)[key] = lerp(fromVal ?? toVal, toVal ?? fromVal)
      }
    }
    Object.assign(el.style, interpolated)
  }

  const tick = () => {
    currentProgress += (targetProgress - currentProgress) * scrubSmoothing
    if (Math.abs(targetProgress - currentProgress) > 0.001) {
      applyAtProgress(currentProgress)
      rafId = requestAnimationFrame(tick)
    } else {
      currentProgress = targetProgress
      applyAtProgress(currentProgress)
      rafId = null
    }
  }

  const handleScroll = () => {
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight
    targetProgress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)))
    if (!rafId) rafId = requestAnimationFrame(tick)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  return () => {
    window.removeEventListener('scroll', handleScroll)
    if (rafId) cancelAnimationFrame(rafId)
  }
}

function applyMouseMoveAnimation(el: HTMLElement, config: AnimationConfig) {
  if (config.trigger.type !== 'mouse-move' && config.trigger.type !== 'mouse-move-element') return

  const strength = config.trigger.strength ?? 20
  const isElementScope = config.trigger.type === 'mouse-move-element'

  const handler = (e: MouseEvent) => {
    let percentX: number, percentY: number
    if (isElementScope) {
      const rect = el.getBoundingClientRect()
      percentX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      percentY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    } else {
      percentX = (e.clientX / window.innerWidth - 0.5) * 2
      percentY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    el.style.transform = `translate(${percentX * strength}px, ${percentY * strength}px)`
  }

  const target = isElementScope ? el : document
  target.addEventListener('mousemove', handler as EventListener, { passive: true })

  const resetHandler = () => { el.style.transform = '' }
  if (isElementScope) {
    el.addEventListener('mouseleave', resetHandler)
  }

  return () => {
    target.removeEventListener('mousemove', handler as EventListener)
    if (isElementScope) el.removeEventListener('mouseleave', resetHandler)
    el.style.transform = ''
  }
}

function applyClickToggleAnimation(el: HTMLElement, config: AnimationConfig) {
  if (!config.from && !config.to) return

  const fromKf = propsToKeyframe(config.from ?? {})
  const toKf = propsToKeyframe(config.to ?? {})
  let isForward = true

  const handler = () => {
    const [start, end] = isForward ? [fromKf, toKf] : [toKf, fromKf]
    el.animate([start, end], {
      duration: config.duration,
      easing: getEasing(config.easing),
      fill: 'forwards',
    })
    isForward = !isForward
  }

  el.addEventListener('click', handler)
  return () => el.removeEventListener('click', handler)
}

function applyStaggeredAnimation(el: HTMLElement, config: AnimationConfig) {
  if (!config.stagger?.enabled) return
  if (!config.from && !config.to) return

  const selector = config.stagger.selector
  const children = selector ? el.querySelectorAll(selector) : el.children
  if (!children.length) return

  const delays = getStaggerDelays(children.length, config.stagger)
  const fromKf = propsToKeyframe(config.from ?? {})
  const toKf = propsToKeyframe(config.to ?? {})
  const anims: Animation[] = []

  const threshold = config.trigger.type === 'scroll-into-view' ? (config.trigger.threshold ?? 0.2) : 0

  const runAnimations = () => {
    Array.from(children).forEach((child, i) => {
      const childEl = child as HTMLElement
      Object.assign(childEl.style, fromKf)
      const anim = childEl.animate([fromKf, toKf], {
        duration: config.duration,
        delay: config.delay + delays[i],
        easing: getEasing(config.easing),
        fill: 'forwards',
        iterations: getRepeatCount(config),
        direction: getDirection(config),
      })
      anims.push(anim)
    })
  }

  if (config.trigger.type === 'scroll-into-view') {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimations()
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => { observer.disconnect(); anims.forEach(a => a.cancel()) }
  }

  // page-load or immediate
  runAnimations()
  return () => anims.forEach(a => a.cancel())
}

// ─── Advanced scroll handlers ───

function applyWhileInViewAnimation(el: HTMLElement, config: AnimationConfig) {
  if (!config.from && !config.to) return
  if (config.trigger.type !== 'while-in-view') return

  const fromKf = propsToKeyframe(config.from ?? {})
  const toKf = propsToKeyframe(config.to ?? {})
  const threshold = config.trigger.threshold ?? 0.2
  const once = config.trigger.once ?? false

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        const anim = el.animate([fromKf, toKf], {
          duration: config.duration,
          delay: config.delay,
          easing: getEasing(config.easing),
          fill: 'forwards',
          iterations: getRepeatCount(config),
          direction: getDirection(config),
        })
        animationRegistry.register({ id: config.id, animation: anim, element: el, paused: false })
        if (once) observer.unobserve(el)
      } else {
        // Out of view: reset
        animationRegistry.unregister(config.id)
        Object.assign(el.style, fromKf)
      }
    },
    { threshold }
  )
  observer.observe(el)
  return () => { observer.disconnect(); animationRegistry.unregister(config.id) }
}

function applyPageScrollProgressAnimation(el: HTMLElement, config: AnimationConfig) {
  if (!config.from && !config.to) return

  const fromKf = propsToKeyframe(config.from ?? {})
  const toKf = propsToKeyframe(config.to ?? {})

  const handleScroll = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? Math.max(0, Math.min(1, window.scrollY / docHeight)) : 0

    const interpolated: Keyframe = {}
    for (const key of new Set([...Object.keys(fromKf), ...Object.keys(toKf)])) {
      const fromVal = (fromKf as Record<string, unknown>)[key]
      const toVal = (toKf as Record<string, unknown>)[key]
      if (typeof fromVal === 'number' && typeof toVal === 'number') {
        (interpolated as Record<string, unknown>)[key] = fromVal + (toVal - fromVal) * progress
      } else {
        (interpolated as Record<string, unknown>)[key] = progress > 0.5 ? toVal : fromVal
      }
    }
    Object.assign(el.style, interpolated)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
  return () => window.removeEventListener('scroll', handleScroll)
}

function applyScrollTriggerAnimation(el: HTMLElement, config: AnimationConfig, stConfig: ScrollTriggerConfig) {
  if (!config.from && !config.to) return

  const fromKf = propsToKeyframe(config.from ?? {})
  const toKf = propsToKeyframe(config.to ?? {})
  const entryId = config.id + '-st'

  const applyAtProgress = (progress: number) => {
    const interpolated: Keyframe = {}
    for (const key of new Set([...Object.keys(fromKf), ...Object.keys(toKf)])) {
      const fromVal = (fromKf as Record<string, unknown>)[key]
      const toVal = (toKf as Record<string, unknown>)[key]
      if (typeof fromVal === 'number' && typeof toVal === 'number') {
        (interpolated as Record<string, unknown>)[key] = fromVal + (toVal - fromVal) * progress
      } else {
        (interpolated as Record<string, unknown>)[key] = progress > 0.5 ? toVal : fromVal
      }
    }
    Object.assign(el.style, interpolated)
  }

  scrollObserver.add({
    id: entryId,
    element: el,
    config: stConfig,
    onProgress: applyAtProgress,
  })

  return () => scrollObserver.remove(entryId)
}

function applyScrollPinAnimation(el: HTMLElement, config: AnimationConfig) {
  if (config.trigger.type !== 'scroll-pin') return

  const stConfig = config.trigger.scrollTrigger
  const entryId = config.id + '-pin'

  scrollObserver.add({
    id: entryId,
    element: el,
    config: { ...stConfig, pin: true },
    onProgress: () => {},
  })

  return () => scrollObserver.remove(entryId)
}

function applyScrollSnapAnimation(el: HTMLElement, config: AnimationConfig) {
  if (config.trigger.type !== 'scroll-snap') return

  const snapType = config.trigger.snapType ?? 'mandatory'
  const snapAlign = config.trigger.snapAlign ?? 'start'

  // Apply CSS scroll snap to parent container
  const parent = el.parentElement
  if (parent) {
    parent.style.scrollSnapType = `y ${snapType}`
    parent.style.overflowY = 'auto'
  }
  el.style.scrollSnapAlign = snapAlign

  return () => {
    if (parent) {
      parent.style.scrollSnapType = ''
      parent.style.overflowY = ''
    }
    el.style.scrollSnapAlign = ''
  }
}

/**
 * AnimationController applies animations to DOM elements with data-element-id
 * attributes within a section. No need to wrap individual elements — this
 * component reads __interactions and uses Web Animations API + DOM events.
 */
export function AnimationController({ sectionId, interactions, disabled }: AnimationControllerProps) {
  const cleanupRef = useRef<(() => void)[]>([])

  useEffect(() => {
    if (disabled || !Object.keys(interactions).length) return

    // Wait for next frame to ensure DOM is rendered, then retry once if elements not found
    const timer = requestAnimationFrame(() => {
      const cleanups: (() => void)[] = []

      for (const [contentPath, configs] of Object.entries(interactions)) {
        const elementId = `${sectionId}::${contentPath}`
        const el = document.querySelector(`[data-element-id="${elementId}"]`) as HTMLElement | null
        if (!el) continue

        for (const config of configs) {
          let cleanup: (() => void) | undefined

          // Handle staggered animations first
          if (config.stagger?.enabled) {
            cleanup = applyStaggeredAnimation(el, config)
            if (cleanup) cleanups.push(cleanup)
            continue
          }

          switch (config.trigger.type) {
            case 'scroll-into-view':
            case 'page-load':
              cleanup = applyEntranceAnimation(el, config)
              break
            case 'hover':
              cleanup = applyHoverAnimation(el, config)
              break
            case 'hover-enter':
              cleanup = applyHoverEnterAnimation(el, config)
              break
            case 'hover-leave':
              cleanup = applyHoverLeaveAnimation(el, config)
              break
            case 'scroll-position':
              cleanup = applyScrollAnimation(el, config)
              break
            case 'while-scrolling':
              cleanup = applyWhileScrollingAnimation(el, config)
              break
            case 'mouse-move':
            case 'mouse-move-element':
              cleanup = applyMouseMoveAnimation(el, config)
              break
            case 'click':
              if (config.trigger.toggle || config.reverseOnSecondClick) {
                cleanup = applyClickToggleAnimation(el, config)
              } else if (config.keyframes?.length) {
                cleanup = applyEmphasisAnimation(el, config)
              }
              break
            case 'click-first':
            case 'click-second':
              cleanup = applyClickToggleAnimation(el, config)
              break
            case 'while-in-view':
              cleanup = applyWhileInViewAnimation(el, config)
              break
            case 'page-scroll-progress':
              cleanup = applyPageScrollProgressAnimation(el, config)
              break
            case 'scroll-pin':
              cleanup = applyScrollPinAnimation(el, config)
              break
            case 'scroll-snap':
              cleanup = applyScrollSnapAnimation(el, config)
              break
            case 'scroll-trigger':
              if (config.trigger.type === 'scroll-trigger') {
                cleanup = applyScrollTriggerAnimation(el, config, config.trigger.scrollTrigger)
              }
              break
            default:
              if (config.keyframes?.length) {
                cleanup = applyEmphasisAnimation(el, config)
              } else {
                cleanup = applyEntranceAnimation(el, config)
              }
          }

          if (cleanup) cleanups.push(cleanup)
        }
      }

      cleanupRef.current = cleanups
    })

    return () => {
      cancelAnimationFrame(timer)
      cleanupRef.current.forEach(fn => fn())
      cleanupRef.current = []
    }
  }, [sectionId, interactions, disabled])

  return null // Renderless component
}
