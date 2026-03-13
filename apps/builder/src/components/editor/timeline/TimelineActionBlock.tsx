'use client'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { TimelineAction } from '@/types/interactions'

interface TimelineActionBlockProps {
  action: TimelineAction
  zoom: number
  totalDuration: number
  onSelect: () => void
  onMove: (newStartTime: number) => void
  onResize: (newDuration: number) => void
  selected: boolean
}

const TYPE_COLORS: Record<string, string> = {
  tween: 'bg-wf-blue/80 border-wf-blue/60',
  set: 'bg-amber-500/80 border-amber-400',
  label: 'bg-emerald-500/80 border-emerald-400',
  call: 'bg-purple-500/80 border-purple-400',
}

export function TimelineActionBlock({
  action,
  zoom,
  totalDuration,
  onSelect,
  onMove,
  onResize,
  selected,
}: TimelineActionBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const pxPerMs = zoom * 0.1 // 0.1px per ms at zoom=1
  const left = action.startTime * pxPerMs
  const width = Math.max(action.duration * pxPerMs, 8)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect()

    const startX = e.clientX
    const startLeft = left

    const handleMouseMove = (me: MouseEvent) => {
      setIsDragging(true)
      const dx = me.clientX - startX
      const maxLeft = totalDuration * pxPerMs - width
      const newLeft = Math.max(0, Math.min(maxLeft, startLeft + dx))
      onMove(newLeft / pxPerMs)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleResizeRight = (e: React.MouseEvent) => {
    e.stopPropagation()
    const startX = e.clientX
    const startWidth = width

    const handleMouseMove = (me: MouseEvent) => {
      const dx = me.clientX - startX
      const maxWidth = (totalDuration - action.startTime) * pxPerMs
      const newWidth = Math.max(8, Math.min(maxWidth, startWidth + dx))
      onResize(newWidth / pxPerMs)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const colorClass = TYPE_COLORS[action.type] ?? TYPE_COLORS.tween

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      style={{ left: `${left}px`, width: `${width}px` }}
      className={cn(
        'absolute top-1 bottom-1 rounded border cursor-grab select-none flex items-center px-1 overflow-hidden',
        colorClass,
        selected && 'ring-1 ring-white ring-offset-1 ring-offset-zinc-800',
        isDragging && 'opacity-75 cursor-grabbing'
      )}
    >
      <span className="text-[9px] text-white truncate pointer-events-none">
        {action.label || action.type}
      </span>
      {/* Resize handle */}
      <div
        onMouseDown={handleResizeRight}
        className="absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize hover:bg-white/20"
      />
    </div>
  )
}
