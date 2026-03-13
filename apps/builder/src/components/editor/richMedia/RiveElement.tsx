'use client'
import { useEffect, useRef } from 'react'
import type { RiveConfig } from '@/types/richMedia'

interface RiveElementProps {
  config: RiveConfig
  className?: string
}

// Map our fit names to Rive fit values
const FIT_MAP: Record<RiveConfig['fit'], string> = {
  cover: 'cover',
  contain: 'contain',
  fill: 'fill',
  fitWidth: 'fitWidth',
  fitHeight: 'fitHeight',
  none: 'none',
}

export function RiveElement({ config, className }: RiveElementProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const riveRef = useRef<unknown>(null)

  useEffect(() => {
    if (!canvasRef.current || !config.src) return

    let destroyed = false

    // Dynamic import for code splitting
    import('@rive-app/react-canvas').then(riveModule => {
      if (destroyed || !canvasRef.current) return

      // Use the raw Rive runtime if available
      const RiveCanvas = (riveModule as unknown as { Rive?: new (opts: Record<string, unknown>) => unknown }).Rive
      if (!RiveCanvas) return

      const rive = new RiveCanvas({
        src: config.src,
        canvas: canvasRef.current,
        autoplay: config.autoplay,
        stateMachines: config.stateMachine ? [config.stateMachine] : undefined,
        artboard: config.artboard,
      })

      riveRef.current = rive
    }).catch(() => {
      // Fallback: show placeholder
    })

    return () => {
      destroyed = true
      if (riveRef.current && typeof (riveRef.current as { cleanup: () => void }).cleanup === 'function') {
        (riveRef.current as { cleanup: () => void }).cleanup()
      }
    }
  }, [config.src, config.autoplay, config.stateMachine, config.artboard])

  if (!config.src) {
    return (
      <div className={`flex items-center justify-center bg-zinc-800 border-2 border-dashed border-zinc-600 rounded-lg min-h-[120px] ${className ?? ''}`}>
        <span className="text-xs text-zinc-500">Rive — Aucun fichier</span>
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
