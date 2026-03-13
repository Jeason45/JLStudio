// ─── GSAP Animation Engine ───

import type { AnimationConfig, AnimatableProperties } from '@/types/interactions'
import type { AnimationEngineDriver, EngineAnimation } from './engineAdapter'
import { registerEngine } from './engineAdapter'
import { getEasingValue } from '@/data/easingPresets'

let gsapModule: typeof import('gsap') | null = null

async function loadGSAP() {
  if (!gsapModule) {
    gsapModule = await import('gsap')
  }
  return gsapModule
}

function propsToGSAPVars(props: Partial<AnimatableProperties>): Record<string, unknown> {
  const vars: Record<string, unknown> = {}
  if (props.x != null) vars.x = props.x
  if (props.y != null) vars.y = props.y
  if (props.z != null) vars.z = props.z
  if (props.scale != null) vars.scale = props.scale
  if (props.scaleX != null) vars.scaleX = props.scaleX
  if (props.scaleY != null) vars.scaleY = props.scaleY
  if (props.scaleZ != null) vars.scaleZ = props.scaleZ
  if (props.rotate != null) vars.rotation = props.rotate
  if (props.rotateX != null) vars.rotationX = props.rotateX
  if (props.rotateY != null) vars.rotationY = props.rotateY
  if (props.rotateZ != null) vars.rotationZ = props.rotateZ
  if (props.skewX != null) vars.skewX = props.skewX
  if (props.skewY != null) vars.skewY = props.skewY
  if (props.opacity != null) vars.opacity = props.opacity
  if (props.color) vars.color = props.color
  if (props.backgroundColor) vars.backgroundColor = props.backgroundColor
  if (props.borderColor) vars.borderColor = props.borderColor
  if (props.width) vars.width = props.width
  if (props.height) vars.height = props.height
  if (props.borderRadius) vars.borderRadius = props.borderRadius
  if (props.fontSize) vars.fontSize = props.fontSize
  if (props.letterSpacing) vars.letterSpacing = props.letterSpacing
  if (props.boxShadow) vars.boxShadow = props.boxShadow

  // Filters
  const filters: string[] = []
  if (props.blur != null) filters.push(`blur(${props.blur}px)`)
  if (props.brightness != null) filters.push(`brightness(${props.brightness})`)
  if (props.contrast != null) filters.push(`contrast(${props.contrast})`)
  if (props.grayscale != null) filters.push(`grayscale(${props.grayscale})`)
  if (props.hueRotate != null) filters.push(`hue-rotate(${props.hueRotate}deg)`)
  if (props.saturate != null) filters.push(`saturate(${props.saturate})`)
  if (props.sepia != null) filters.push(`sepia(${props.sepia})`)
  if (filters.length) vars.filter = filters.join(' ')

  if (props.clipPath) vars.clipPath = props.clipPath

  return vars
}

function getGSAPEasing(easing: AnimationConfig['easing']): string {
  if (Array.isArray(easing)) return `cubic-bezier(${easing.join(',')})`
  const name = easing as string
  // Map our naming to GSAP naming
  const gsapMap: Record<string, string> = {
    'linear': 'none',
    'ease': 'power1.inOut',
    'ease-in': 'power1.in',
    'ease-out': 'power1.out',
    'ease-in-out': 'power1.inOut',
    'spring': 'back.out(1.7)',
    'quad-in': 'power1.in',
    'quad-out': 'power1.out',
    'quad-in-out': 'power1.inOut',
    'cubic-in': 'power2.in',
    'cubic-out': 'power2.out',
    'cubic-in-out': 'power2.inOut',
    'quart-in': 'power3.in',
    'quart-out': 'power3.out',
    'quart-in-out': 'power3.inOut',
    'quint-in': 'power4.in',
    'quint-out': 'power4.out',
    'quint-in-out': 'power4.inOut',
    'sine-in': 'sine.in',
    'sine-out': 'sine.out',
    'sine-in-out': 'sine.inOut',
    'expo-in': 'expo.in',
    'expo-out': 'expo.out',
    'expo-in-out': 'expo.inOut',
    'circ-in': 'circ.in',
    'circ-out': 'circ.out',
    'circ-in-out': 'circ.inOut',
    'back-in': 'back.in',
    'back-out': 'back.out',
    'back-in-out': 'back.inOut',
    'bounce-in': 'bounce.in',
    'bounce-out': 'bounce.out',
    'bounce-in-out': 'bounce.inOut',
    'elastic-in': 'elastic.in',
    'elastic-out': 'elastic.out',
    'elastic-in-out': 'elastic.inOut',
  }
  return gsapMap[name] ?? 'power1.out'
}

function wrapGSAPTween(tween: gsap.core.Tween): EngineAnimation {
  return {
    play: () => tween.play(),
    pause: () => tween.pause(),
    resume: () => tween.resume(),
    seek: (time) => tween.seek(time / 1000),
    setSpeed: (rate) => tween.timeScale(rate),
    cancel: () => tween.kill(),
    finished: new Promise<void>((resolve) => {
      tween.then(() => resolve())
    }),
  }
}

const gsapEngine: AnimationEngineDriver = {
  name: 'gsap',

  animate(element, config, from, to) {
    // Lazy load GSAP — return a placeholder that resolves
    const placeholder: EngineAnimation = {
      play: () => {},
      pause: () => {},
      resume: () => {},
      seek: () => {},
      setSpeed: () => {},
      cancel: () => {},
      finished: loadGSAP().then(({ gsap }) => {
        const toVars = {
          ...propsToGSAPVars(to),
          duration: config.duration / 1000,
          delay: config.delay / 1000,
          ease: getGSAPEasing(config.easing),
          repeat: config.repeatConfig?.count ?? config.repeat ?? 0,
          yoyo: config.repeatConfig?.yoyo ?? false,
          repeatDelay: (config.repeatConfig?.repeatDelay ?? 0) / 1000,
        }

        if (Object.keys(from).length > 0) {
          const tween = gsap.fromTo(element, propsToGSAPVars(from), toVars)
          Object.assign(placeholder, wrapGSAPTween(tween))
        } else {
          const tween = gsap.to(element, toVars)
          Object.assign(placeholder, wrapGSAPTween(tween))
        }
      }),
    }
    return placeholder
  },

  animateKeyframes(element, config, keyframes) {
    const placeholder: EngineAnimation = {
      play: () => {},
      pause: () => {},
      resume: () => {},
      seek: () => {},
      setSpeed: () => {},
      cancel: () => {},
      finished: loadGSAP().then(({ gsap }) => {
        const tl = gsap.timeline({
          repeat: config.repeatConfig?.count ?? config.repeat ?? 0,
          yoyo: config.repeatConfig?.yoyo ?? false,
          delay: config.delay / 1000,
        })

        for (let i = 0; i < keyframes.length - 1; i++) {
          const segDuration = (keyframes[i + 1].offset - keyframes[i].offset) * (config.duration / 1000)
          tl.to(element, {
            ...propsToGSAPVars(keyframes[i + 1].properties),
            duration: segDuration,
            ease: getGSAPEasing(config.easing),
          })
        }

        Object.assign(placeholder, {
          play: () => tl.play(),
          pause: () => tl.pause(),
          resume: () => tl.resume(),
          seek: (time: number) => tl.seek(time / 1000),
          setSpeed: (rate: number) => tl.timeScale(rate),
          cancel: () => tl.kill(),
        })
      }),
    }
    return placeholder
  },
}

registerEngine(gsapEngine)
export { gsapEngine }
