'use client'
import { motion, useScroll, useTransform, type MotionStyle, type Transition } from 'framer-motion'
import { useRef, useMemo } from 'react'
import type { AnimationConfig, AnimatableProperties } from '@/types/interactions'

interface AnimatedElementProps {
  interactions: AnimationConfig[]
  isEditing?: boolean
  children: React.ReactNode
  className?: string
}

function toMotionValues(props?: Partial<AnimatableProperties>): Record<string, number | string> {
  if (!props) return {}
  const result: Record<string, number | string> = {}

  if (props.opacity != null) result.opacity = props.opacity
  if (props.x != null) result.x = props.x
  if (props.y != null) result.y = props.y
  if (props.scale != null) result.scale = props.scale
  if (props.scaleX != null) result.scaleX = props.scaleX
  if (props.scaleY != null) result.scaleY = props.scaleY
  if (props.rotate != null) result.rotate = props.rotate
  if (props.skewX != null) result.skewX = props.skewX
  if (props.skewY != null) result.skewY = props.skewY
  if (props.blur != null) result.filter = `blur(${props.blur}px)`
  if (props.brightness != null) result.filter = `brightness(${props.brightness})`
  if (props.color) result.color = props.color
  if (props.backgroundColor) result.backgroundColor = props.backgroundColor

  return result
}

function toTransition(config: AnimationConfig): Transition {
  const t: Transition = {
    duration: config.duration / 1000,
    delay: config.delay / 1000,
  }

  if (config.easing === 'spring') {
    t.type = 'spring'
    t.stiffness = 200
    t.damping = 20
  } else if (Array.isArray(config.easing)) {
    t.ease = config.easing
  } else {
    const easingMap: Record<string, [number, number, number, number]> = {
      linear: [0, 0, 1, 1],
      ease: [0.25, 0.1, 0.25, 1],
      'ease-in': [0.42, 0, 1, 1],
      'ease-out': [0, 0, 0.58, 1],
      'ease-in-out': [0.42, 0, 0.58, 1],
    }
    t.ease = easingMap[config.easing] || [0, 0, 0.58, 1]
  }

  if (config.repeat) {
    t.repeat = config.repeat === -1 ? Infinity : config.repeat
    t.repeatType = 'loop'
  }

  return t
}

function ScrollAnimation({ config, children }: { config: AnimationConfig; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const from = config.from ?? {}
  const to = config.to ?? {}

  const y = useTransform(scrollYProgress, [0, 1], [from.y ?? 0, to.y ?? 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [from.opacity ?? 1, to.opacity ?? 1])
  const scale = useTransform(scrollYProgress, [0, 1], [from.scale ?? 1, to.scale ?? 1])

  const style: MotionStyle = { y, opacity, scale }

  return (
    <motion.div ref={ref} style={style}>
      {children}
    </motion.div>
  )
}

export function AnimatedElement({ interactions, isEditing, children, className }: AnimatedElementProps) {
  // In editing mode, don't auto-play animations
  if (!interactions.length || isEditing) {
    return <div className={className}>{children}</div>
  }

  const configs = useMemo(() => {
    const hoverConfigs = interactions.filter(i => i.trigger.type === 'hover')
    const entranceConfigs = interactions.filter(
      i => i.trigger.type === 'scroll-into-view' || i.trigger.type === 'page-load'
    )
    const scrollConfigs = interactions.filter(i => i.trigger.type === 'scroll-position')
    const clickConfigs = interactions.filter(i => i.trigger.type === 'click')

    return { hoverConfigs, entranceConfigs, scrollConfigs, clickConfigs }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(interactions)])

  // If there are scroll-position animations, wrap with ScrollAnimation
  if (configs.scrollConfigs.length > 0) {
    let wrapped = <>{children}</>
    for (const config of configs.scrollConfigs) {
      wrapped = <ScrollAnimation config={config}>{wrapped}</ScrollAnimation>
    }
    return <div className={className}>{wrapped}</div>
  }

  // Build motion props
  const initial: Record<string, number | string> = {}
  const animate: Record<string, number | string> = {}
  const whileHover: Record<string, number | string> = {}
  const whileInView: Record<string, number | string> = {}
  let transition: Transition = {}
  let viewportConfig: { once?: boolean; amount?: number } | undefined

  // Entrance animations
  for (const config of configs.entranceConfigs) {
    Object.assign(initial, toMotionValues(config.from))
    Object.assign(animate, toMotionValues(config.to))
    transition = toTransition(config)

    if (config.trigger.type === 'scroll-into-view') {
      Object.assign(whileInView, toMotionValues(config.to))
      viewportConfig = {
        once: true,
        amount: config.trigger.threshold ?? 0.2,
      }
    }
  }

  // Hover animations
  for (const config of configs.hoverConfigs) {
    Object.assign(whileHover, toMotionValues(config.to))
  }

  // Page-load: use initial+animate
  const isViewTriggered = configs.entranceConfigs.some(c => c.trigger.type === 'scroll-into-view')

  if (isViewTriggered) {
    return (
      <motion.div
        className={className}
        initial={initial}
        whileInView={whileInView}
        whileHover={Object.keys(whileHover).length ? whileHover : undefined}
        viewport={viewportConfig}
        transition={transition}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={Object.keys(initial).length ? initial : undefined}
      animate={Object.keys(animate).length ? animate : undefined}
      whileHover={Object.keys(whileHover).length ? whileHover : undefined}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
