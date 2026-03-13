import { useState, useCallback, useRef, useEffect } from 'react'

interface UseCarouselIndexOptions {
  total: number
  loop?: boolean
  autoplay?: boolean
  interval?: number
}

export function useCarouselIndex({ total, loop = false, autoplay = false, interval = 5000 }: UseCarouselIndexOptions) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((i: number) => {
    if (total <= 0) return
    if (loop) {
      setIndex(((i % total) + total) % total)
    } else {
      setIndex(Math.max(0, Math.min(i, total - 1)))
    }
  }, [total, loop])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])
  const pause = useCallback(() => setPaused(true), [])
  const resume = useCallback(() => setPaused(false), [])

  useEffect(() => {
    if (autoplay && !paused && total > 1) {
      timerRef.current = setInterval(next, interval)
      return () => { if (timerRef.current) clearInterval(timerRef.current) }
    }
  }, [autoplay, paused, next, interval, total])

  return { index, goTo, next, prev, pause, resume, canPrev: loop || index > 0, canNext: loop || index < total - 1 }
}
