'use client'
import { useState, useCallback } from 'react'
import { useEditorStore } from '@/store/editorStore'

interface CanvasGuidesProps {
  zoom: number
}

const GUIDE_COLOR = '#00bcd4'

export function CanvasGuides({ zoom }: CanvasGuidesProps) {
  const { canvasGuides, addGuide, updateGuide, removeGuide } = useEditorStore()
  const [dragging, setDragging] = useState<{ id: string; axis: 'x' | 'y' } | null>(null)
  const [dragPos, setDragPos] = useState<number | null>(null)
  const [creating, setCreating] = useState<{ axis: 'x' | 'y'; position: number } | null>(null)

  // Start creating a guide by dragging from ruler area
  const handleRulerMouseDown = useCallback((axis: 'x' | 'y', e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const startVal = axis === 'x' ? e.clientX : e.clientY

    const onMove = (me: MouseEvent) => {
      const canvas = document.getElementById('site-canvas')
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const pos = axis === 'x'
        ? (me.clientX - rect.left) / zoom
        : (me.clientY - rect.top) / zoom
      setCreating({ axis, position: Math.round(pos) })
    }

    const onUp = (me: MouseEvent) => {
      const canvas = document.getElementById('site-canvas')
      if (canvas) {
        const rect = canvas.getBoundingClientRect()
        const pos = axis === 'x'
          ? (me.clientX - rect.left) / zoom
          : (me.clientY - rect.top) / zoom
        // Only add if dragged far enough from ruler
        const dist = Math.abs((axis === 'x' ? me.clientX : me.clientY) - startVal)
        if (dist > 5) {
          addGuide(axis, Math.round(pos))
        }
      }
      setCreating(null)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [zoom, addGuide])

  // Drag existing guide
  const handleGuideDragStart = useCallback((id: string, axis: 'x' | 'y', e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging({ id, axis })

    const onMove = (me: MouseEvent) => {
      const canvas = document.getElementById('site-canvas')
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const pos = axis === 'x'
        ? (me.clientX - rect.left) / zoom
        : (me.clientY - rect.top) / zoom
      setDragPos(Math.round(pos))
    }

    const onUp = (me: MouseEvent) => {
      const canvas = document.getElementById('site-canvas')
      if (canvas) {
        const rect = canvas.getBoundingClientRect()
        const isInside = axis === 'x'
          ? me.clientX >= rect.left && me.clientX <= rect.right
          : me.clientY >= rect.top && me.clientY <= rect.bottom

        if (isInside) {
          const pos = axis === 'x'
            ? (me.clientX - rect.left) / zoom
            : (me.clientY - rect.top) / zoom
          updateGuide(id, Math.round(pos))
        } else {
          // Dragged outside canvas = remove
          removeGuide(id)
        }
      }
      setDragging(null)
      setDragPos(null)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [zoom, updateGuide, removeGuide])

  return (
    <>
      {/* Invisible ruler drag zones (on top of canvas rulers to create guides) */}
      {/* Horizontal ruler drag zone */}
      <div
        className="absolute top-0 left-5 right-0 z-[45] cursor-crosshair"
        style={{ height: 20 }}
        onMouseDown={(e) => handleRulerMouseDown('y', e)}
      />
      {/* Vertical ruler drag zone */}
      <div
        className="absolute left-0 top-5 bottom-0 z-[45] cursor-crosshair"
        style={{ width: 20 }}
        onMouseDown={(e) => handleRulerMouseDown('x', e)}
      />

      {/* Existing guides */}
      {canvasGuides.map(guide => {
        const pos = dragging?.id === guide.id && dragPos !== null ? dragPos : guide.position
        const scaledPos = pos * zoom

        return guide.axis === 'x' ? (
          <div
            key={guide.id}
            className="absolute top-0 bottom-0 pointer-events-auto cursor-ew-resize z-[35]"
            style={{
              left: scaledPos - 2,
              width: 5,
            }}
            onMouseDown={(e) => handleGuideDragStart(guide.id, 'x', e)}
            onDoubleClick={(e) => {
              e.stopPropagation()
              const input = prompt('Guide position (px):', `${guide.position}`)
              if (input !== null) {
                const n = parseInt(input)
                if (!isNaN(n)) updateGuide(guide.id, n)
              }
            }}
          >
            <div
              className="absolute inset-y-0"
              style={{
                left: 2,
                width: 1,
                backgroundColor: GUIDE_COLOR,
                opacity: 0.8,
              }}
            />
            {/* Position label */}
            <div
              className="absolute top-1 text-[9px] font-mono whitespace-nowrap pointer-events-none"
              style={{ left: 6, color: GUIDE_COLOR }}
            >
              {Math.round(pos)}px
            </div>
          </div>
        ) : (
          <div
            key={guide.id}
            className="absolute left-0 right-0 pointer-events-auto cursor-ns-resize z-[35]"
            style={{
              top: scaledPos - 2,
              height: 5,
            }}
            onMouseDown={(e) => handleGuideDragStart(guide.id, 'y', e)}
            onDoubleClick={(e) => {
              e.stopPropagation()
              const input = prompt('Guide position (px):', `${guide.position}`)
              if (input !== null) {
                const n = parseInt(input)
                if (!isNaN(n)) updateGuide(guide.id, n)
              }
            }}
          >
            <div
              className="absolute inset-x-0"
              style={{
                top: 2,
                height: 1,
                backgroundColor: GUIDE_COLOR,
                opacity: 0.8,
              }}
            />
            <div
              className="absolute left-1 text-[9px] font-mono whitespace-nowrap pointer-events-none"
              style={{ top: 6, color: GUIDE_COLOR }}
            >
              {Math.round(pos)}px
            </div>
          </div>
        )
      })}

      {/* Guide being created */}
      {creating && (
        <div
          className="absolute pointer-events-none z-[36]"
          style={creating.axis === 'x' ? {
            left: creating.position * zoom,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: GUIDE_COLOR,
            opacity: 0.6,
          } : {
            top: creating.position * zoom,
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: GUIDE_COLOR,
            opacity: 0.6,
          }}
        />
      )}
    </>
  )
}
