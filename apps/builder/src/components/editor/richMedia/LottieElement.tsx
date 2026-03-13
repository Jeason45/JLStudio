'use client'
import { useEffect, useRef } from 'react'
import type { LottieConfig } from '@/types/richMedia'

interface LottieElementProps {
  config: LottieConfig
  className?: string
}

export function LottieElement({ config, className }: LottieElementProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<unknown>(null)

  useEffect(() => {
    if (!containerRef.current || !config.src) return

    let destroyed = false

    // Dynamic import for code splitting
    import('lottie-web').then(lottie => {
      if (destroyed || !containerRef.current) return

      const anim = lottie.default.loadAnimation({
        container: containerRef.current,
        renderer: config.renderer === 'canvas' ? 'canvas' : 'svg',
        loop: config.loop,
        autoplay: config.autoplay && !config.playOnHover && !config.scrollScrub,
        path: config.src,
      })

      if (config.speed !== 1) anim.setSpeed(config.speed)
      if (config.segment) anim.playSegments(config.segment, true)

      animRef.current = anim

      // Hover control
      if (config.playOnHover) {
        anim.pause()
        containerRef.current.addEventListener('mouseenter', () => anim.play())
        containerRef.current.addEventListener('mouseleave', () => { anim.pause(); anim.goToAndStop(0, true) })
      }

      // Scroll scrub
      if (config.scrollScrub) {
        anim.pause()
        const handleScroll = () => {
          if (!containerRef.current) return
          const rect = containerRef.current.getBoundingClientRect()
          const vh = window.innerHeight
          const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)))
          const frame = progress * (anim.totalFrames - 1)
          anim.goToAndStop(frame, true)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
      }
    })

    return () => {
      destroyed = true
      if (animRef.current && typeof (animRef.current as { destroy: () => void }).destroy === 'function') {
        (animRef.current as { destroy: () => void }).destroy()
      }
    }
  }, [config.src, config.autoplay, config.loop, config.speed, config.renderer, config.scrollScrub, config.playOnHover, config.segment])

  if (!config.src) {
    return (
      <div className={`flex items-center justify-center bg-zinc-800 border-2 border-dashed border-zinc-600 rounded-lg min-h-[120px] ${className ?? ''}`}>
        <span className="text-xs text-zinc-500">Lottie — Aucun fichier</span>
      </div>
    )
  }

  return <div ref={containerRef} className={className} />
}
