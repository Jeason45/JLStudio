'use client'
import { useCallback, useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LightboxImage {
  src: string
  alt: string
  caption?: string
}

interface LightboxOverlayProps {
  images: LightboxImage[]
  initialIndex: number
  onClose: () => void
  enableZoom?: boolean
  enableKeyboard?: boolean
}

export function LightboxOverlay({ images, initialIndex, onClose, enableZoom = true, enableKeyboard = true }: LightboxOverlayProps) {
  const [index, setIndex] = useState(initialIndex)
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const dragRef = useRef<{ startX: number; startY: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const current = images[index]
  const hasPrev = index > 0
  const hasNext = index < images.length - 1

  const goNext = useCallback(() => { if (hasNext) { setIndex(i => i + 1); setScale(1); setTranslate({ x: 0, y: 0 }) } }, [hasNext])
  const goPrev = useCallback(() => { if (hasPrev) { setIndex(i => i - 1); setScale(1); setTranslate({ x: 0, y: 0 }) } }, [hasPrev])

  // Keyboard
  useEffect(() => {
    if (!enableKeyboard) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [enableKeyboard, onClose, goNext, goPrev])

  // Double-click zoom
  const handleDoubleClick = useCallback(() => {
    if (!enableZoom) return
    setScale(s => s === 1 ? 2.5 : 1)
    setTranslate({ x: 0, y: 0 })
  }, [enableZoom])

  // Swipe handling
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (scale > 1) return
    dragRef.current = { startX: e.clientX, startY: e.clientY }
  }, [scale])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current || scale > 1) return
    const dx = e.clientX - dragRef.current.startX
    if (Math.abs(dx) > 80) {
      if (dx > 0) goPrev()
      else goNext()
    }
    dragRef.current = null
  }, [scale, goPrev, goNext])

  // Click backdrop to close
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === containerRef.current) onClose()
  }, [onClose])

  const overlay = (
    <div
      ref={containerRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      style={{ cursor: scale > 1 ? 'grab' : 'default' }}
    >
      {/* Close */}
      <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
        <X className="w-5 h-5" />
      </button>

      {/* Nav prev */}
      {hasPrev && (
        <button onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Image */}
      {current && (
        <div
          className="max-w-[90vw] max-h-[85vh] select-none"
          onDoubleClick={handleDoubleClick}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <img
            src={current.src}
            alt={current.alt}
            className="max-w-full max-h-[80vh] object-contain transition-transform duration-200"
            style={{ transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)` }}
            draggable={false}
          />
        </div>
      )}

      {/* Nav next */}
      {hasNext && (
        <button onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Caption + counter */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        {current?.caption && <p className="text-white/80 text-sm mb-2">{current.caption}</p>}
        <p className="text-white/50 text-xs">{index + 1} / {images.length}</p>
      </div>
    </div>
  )

  if (typeof document === 'undefined') return null
  return createPortal(overlay, document.body)
}
