'use client'
import { useEditorStore } from '@/store/editorStore'
import { useState, useEffect } from 'react'
import type { SnapGuide } from '@/lib/snapEngine'

/**
 * SmartGuidesOverlay renders alignment guides (magenta/cyan lines) when elements
 * are being dragged and snap to edges/centers of other elements.
 *
 * The actual snap computation happens in the drag handlers. This component
 * subscribes to a simple global state to show/hide guides.
 */

// Global state for active smart guides (set by drag handlers)
let _activeGuides: SnapGuide[] = []
let _listeners: Array<() => void> = []

export function setActiveSmartGuides(guides: SnapGuide[]) {
  _activeGuides = guides
  _listeners.forEach(fn => fn())
}

export function clearActiveSmartGuides() {
  _activeGuides = []
  _listeners.forEach(fn => fn())
}

function useSmartGuides(): SnapGuide[] {
  const [guides, setGuides] = useState<SnapGuide[]>([])
  useEffect(() => {
    const listener = () => setGuides([..._activeGuides])
    _listeners.push(listener)
    return () => { _listeners = _listeners.filter(l => l !== listener) }
  }, [])
  return guides
}

const EDGE_COLOR = '#ff00ff'
const CENTER_COLOR = '#00e5ff'

export function SmartGuidesOverlay() {
  const guides = useSmartGuides()
  const { isDragging } = useEditorStore()

  if (!isDragging || guides.length === 0) return null

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 32, overflow: 'visible' }}
    >
      {guides.map((guide, i) => {
        const color = guide.type === 'center' ? CENTER_COLOR : EDGE_COLOR
        const dashArray = guide.type === 'center' ? '4 3' : undefined

        if (guide.axis === 'x') {
          return (
            <line
              key={`${guide.axis}-${guide.position}-${i}`}
              x1={guide.position}
              y1={0}
              x2={guide.position}
              y2="100%"
              stroke={color}
              strokeWidth={1}
              strokeDasharray={dashArray}
              opacity={0.7}
            />
          )
        }
        return (
          <line
            key={`${guide.axis}-${guide.position}-${i}`}
            x1={0}
            y1={guide.position}
            x2="100%"
            y2={guide.position}
            stroke={color}
            strokeWidth={1}
            strokeDasharray={dashArray}
            opacity={0.7}
          />
        )
      })}
    </svg>
  )
}
