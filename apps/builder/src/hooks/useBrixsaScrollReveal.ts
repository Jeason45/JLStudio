'use client'
import { useEffect, useRef } from 'react'

export function useBrixsaScrollReveal(options?: { threshold?: number; stagger?: number; disabled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (options?.disabled) return
    const el = ref.current
    if (!el) return

    // Set initial state
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: options?.threshold ?? 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options?.threshold, options?.disabled])

  return ref
}

// For animating a counter from 0 to target value
export function useBrixsaCounter(target: number, options?: { duration?: number; disabled?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (options?.disabled || hasAnimated.current) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = options?.duration ?? 2000
          const start = performance.now()

          function update(now: number) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.round(eased * target)
            if (el) el.textContent = String(current)
            if (progress < 1) requestAnimationFrame(update)
          }

          requestAnimationFrame(update)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, options?.duration, options?.disabled])

  return ref
}
