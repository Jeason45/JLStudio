'use client'
import { useEffect, useRef, useCallback } from 'react'

interface CanvasRulersProps {
  zoom: number
  offset: { x: number; y: number }
  cursorPos: { x: number; y: number } | null
}

const RULER_SIZE = 20
const BG_COLOR = '#2d2d2d'
const TICK_COLOR = '#666'
const TEXT_COLOR = '#999'
const CURSOR_COLOR = '#146EF5'

function getTickInterval(zoom: number): { major: number; minor: number } {
  if (zoom < 0.25) return { major: 400, minor: 100 }
  if (zoom < 0.5) return { major: 200, minor: 50 }
  if (zoom < 1) return { major: 100, minor: 25 }
  if (zoom < 2) return { major: 100, minor: 10 }
  return { major: 50, minor: 10 }
}

export function CanvasRulers({ zoom, offset, cursorPos }: CanvasRulersProps) {
  const hCanvasRef = useRef<HTMLCanvasElement>(null)
  const vCanvasRef = useRef<HTMLCanvasElement>(null)

  const drawHorizontal = useCallback(() => {
    const canvas = hCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth
    const h = RULER_SIZE
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    ctx.fillStyle = BG_COLOR
    ctx.fillRect(0, 0, w, h)

    const { major, minor } = getTickInterval(zoom)
    // Offset in canvas pixels (ruler starts after the vertical ruler = 20px)
    const rulerOffset = offset.x

    // Start/end in logical (canvas content) coordinates
    const startPx = Math.floor(-rulerOffset / zoom / minor) * minor - minor
    const endPx = Math.ceil((w - rulerOffset) / zoom / minor) * minor + minor

    ctx.strokeStyle = TICK_COLOR
    ctx.fillStyle = TEXT_COLOR
    ctx.font = '9px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    for (let px = startPx; px <= endPx; px += minor) {
      const screenX = px * zoom + rulerOffset
      if (screenX < 0 || screenX > w) continue

      const isMajor = px % major === 0
      const tickH = isMajor ? 12 : 6

      ctx.beginPath()
      ctx.moveTo(screenX + 0.5, h)
      ctx.lineTo(screenX + 0.5, h - tickH)
      ctx.stroke()

      if (isMajor) {
        ctx.fillText(`${px}`, screenX, 2)
      }
    }

    // Cursor marker
    if (cursorPos) {
      const cx = cursorPos.x - RULER_SIZE // adjust for vertical ruler offset
      ctx.fillStyle = CURSOR_COLOR
      ctx.fillRect(cx - 0.5, 0, 1, h)
    }

    // Bottom border
    ctx.strokeStyle = '#444'
    ctx.beginPath()
    ctx.moveTo(0, h - 0.5)
    ctx.lineTo(w, h - 0.5)
    ctx.stroke()
  }, [zoom, offset.x, cursorPos])

  const drawVertical = useCallback(() => {
    const canvas = vCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = RULER_SIZE
    const h = canvas.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    ctx.fillStyle = BG_COLOR
    ctx.fillRect(0, 0, w, h)

    const { major, minor } = getTickInterval(zoom)
    const rulerOffset = offset.y

    const startPx = Math.floor(-rulerOffset / zoom / minor) * minor - minor
    const endPx = Math.ceil((h - rulerOffset) / zoom / minor) * minor + minor

    ctx.strokeStyle = TICK_COLOR
    ctx.fillStyle = TEXT_COLOR
    ctx.font = '9px monospace'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'

    for (let px = startPx; px <= endPx; px += minor) {
      const screenY = px * zoom + rulerOffset
      if (screenY < 0 || screenY > h) continue

      const isMajor = px % major === 0
      const tickW = isMajor ? 12 : 6

      ctx.beginPath()
      ctx.moveTo(w, screenY + 0.5)
      ctx.lineTo(w - tickW, screenY + 0.5)
      ctx.stroke()

      if (isMajor) {
        ctx.save()
        ctx.translate(8, screenY)
        ctx.rotate(-Math.PI / 2)
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(`${px}`, 0, 0)
        ctx.restore()
      }
    }

    // Cursor marker
    if (cursorPos) {
      const cy = cursorPos.y - RULER_SIZE
      ctx.fillStyle = CURSOR_COLOR
      ctx.fillRect(0, cy - 0.5, w, 1)
    }

    // Right border
    ctx.strokeStyle = '#444'
    ctx.beginPath()
    ctx.moveTo(w - 0.5, 0)
    ctx.lineTo(w - 0.5, h)
    ctx.stroke()
  }, [zoom, offset.y, cursorPos])

  useEffect(() => {
    drawHorizontal()
    drawVertical()
  }, [drawHorizontal, drawVertical])

  // Redraw on window resize
  useEffect(() => {
    const handleResize = () => { drawHorizontal(); drawVertical() }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [drawHorizontal, drawVertical])

  return (
    <>
      {/* Corner square */}
      <div
        className="absolute top-0 left-0 z-50"
        style={{ width: RULER_SIZE, height: RULER_SIZE, backgroundColor: BG_COLOR }}
      />
      {/* Horizontal ruler */}
      <canvas
        ref={hCanvasRef}
        className="absolute top-0 z-40"
        style={{ left: RULER_SIZE, height: RULER_SIZE, width: `calc(100% - ${RULER_SIZE}px)` }}
      />
      {/* Vertical ruler */}
      <canvas
        ref={vCanvasRef}
        className="absolute left-0 z-40"
        style={{ top: RULER_SIZE, width: RULER_SIZE, height: `calc(100% - ${RULER_SIZE}px)` }}
      />
    </>
  )
}
