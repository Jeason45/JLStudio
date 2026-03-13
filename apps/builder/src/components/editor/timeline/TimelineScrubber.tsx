'use client'
import { useRef } from 'react'

interface TimelineScrubberProps {
  currentTime: number
  totalDuration: number
  zoom: number
  onSeek: (time: number) => void
}

export function TimelineScrubber({ currentTime, totalDuration, zoom, onSeek }: TimelineScrubberProps) {
  const ref = useRef<HTMLDivElement>(null)
  const pxPerMs = zoom * 0.1

  const handleClick = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const time = Math.max(0, Math.min(totalDuration, x / pxPerMs))
    onSeek(time)
  }

  // Generate time markers
  const markers: { time: number; label: string }[] = []
  const interval = zoom >= 2 ? 250 : zoom >= 1 ? 500 : 1000
  for (let t = 0; t <= totalDuration; t += interval) {
    markers.push({
      time: t,
      label: t >= 1000 ? `${(t / 1000).toFixed(1)}s` : `${t}ms`,
    })
  }

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className="relative h-5 bg-zinc-900 border-b border-zinc-700 cursor-pointer select-none"
      style={{ minWidth: `${totalDuration * pxPerMs}px` }}
    >
      {/* Time markers */}
      {markers.map(m => (
        <div
          key={m.time}
          className="absolute top-0 bottom-0 border-l border-zinc-700"
          style={{ left: `${m.time * pxPerMs}px` }}
        >
          <span className="absolute top-0.5 left-1 text-[8px] text-zinc-500 whitespace-nowrap">
            {m.label}
          </span>
        </div>
      ))}

      {/* Playhead */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 pointer-events-none"
        style={{ left: `${currentTime * pxPerMs}px` }}
      >
        <div className="absolute -top-0.5 -left-1 w-2.5 h-2.5 bg-red-500 rotate-45" />
      </div>
    </div>
  )
}
