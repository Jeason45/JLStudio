'use client'
import { useEffect, useRef } from 'react'
import type { SplineConfig } from '@/types/richMedia'

interface SplineElementProps {
  config: SplineConfig
  className?: string
}

export function SplineElement({ config, className }: SplineElementProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<unknown>(null)

  useEffect(() => {
    if (!canvasRef.current || !config.sceneUrl) return

    let destroyed = false

    import('@splinetool/runtime').then(({ Application }) => {
      if (destroyed || !canvasRef.current) return

      const app = new Application(canvasRef.current)
      appRef.current = app

      app.load(config.sceneUrl).catch(console.error)
    })

    return () => {
      destroyed = true
      if (appRef.current && typeof (appRef.current as { dispose: () => void }).dispose === 'function') {
        (appRef.current as { dispose: () => void }).dispose()
      }
    }
  }, [config.sceneUrl])

  if (!config.sceneUrl) {
    return (
      <div className={`flex items-center justify-center bg-zinc-800 border-2 border-dashed border-zinc-600 rounded-lg min-h-[120px] ${className ?? ''}`}>
        <span className="text-xs text-zinc-500">Spline — Aucune scene</span>
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: config.backgroundColor ?? 'transparent',
      }}
    />
  )
}
