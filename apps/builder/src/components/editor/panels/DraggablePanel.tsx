'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import { PanelSection } from '../PanelSection'
import { Label } from '@/components/ui/label'
import { useEditorStore } from '@/store/editorStore'
import { parseElementId } from '@/lib/elementHelpers'

export interface DraggableConfig {
  enabled: boolean
  axis?: 'x' | 'y' | 'both'
  bounds?: 'parent' | 'window' | 'none'
  inertia?: boolean
  snap?: { x?: number; y?: number }
}

export function DraggablePanel() {
  const { selectedElementPath } = useEditorStore()
  const [config, setConfig] = useState<DraggableConfig>({
    enabled: false,
    axis: 'both',
    bounds: 'parent',
    inertia: true,
  })
  const cleanupRef = useRef<(() => void) | null>(null)
  const axisRef = useRef(config.axis)
  axisRef.current = config.axis

  if (!selectedElementPath) return null
  const parsed = parseElementId(selectedElementPath)
  if (!parsed) return null

  const elementId = `${parsed.sectionId}::${parsed.contentPath}`

  // Cleanup function that removes all listeners and resets element state
  const cleanup = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }
  }, [])

  // Cleanup on unmount
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    return () => { cleanup() }
  }, [cleanup])

  const handleToggle = useCallback((enabled: boolean) => {
    setConfig(prev => ({ ...prev, enabled }))

    // Always clean up previous listeners first
    cleanup()

    const el = document.querySelector(`[data-element-id="${elementId}"]`) as HTMLElement | null
    if (!el) return

    if (enabled) {
      el.style.cursor = 'grab'
      el.setAttribute('data-draggable', 'true')

      let startX = 0, startY = 0, currentX = 0, currentY = 0
      let activeMoveHandler: ((me: MouseEvent) => void) | null = null
      let activeUpHandler: (() => void) | null = null

      const onMouseDown = (e: MouseEvent) => {
        startX = e.clientX - currentX
        startY = e.clientY - currentY
        el.style.cursor = 'grabbing'

        const onMouseMove = (me: MouseEvent) => {
          const axis = axisRef.current
          if (axis !== 'y') currentX = me.clientX - startX
          if (axis !== 'x') currentY = me.clientY - startY
          el.style.transform = `translate(${currentX}px, ${currentY}px)`
        }

        const onMouseUp = () => {
          el.style.cursor = 'grab'
          document.removeEventListener('mousemove', onMouseMove)
          document.removeEventListener('mouseup', onMouseUp)
          activeMoveHandler = null
          activeUpHandler = null
        }

        // Remove previous move/up listeners if they exist (safety)
        if (activeMoveHandler) document.removeEventListener('mousemove', activeMoveHandler)
        if (activeUpHandler) document.removeEventListener('mouseup', activeUpHandler)

        activeMoveHandler = onMouseMove
        activeUpHandler = onMouseUp
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
      }

      el.addEventListener('mousedown', onMouseDown)

      // Store cleanup function
      cleanupRef.current = () => {
        el.removeEventListener('mousedown', onMouseDown)
        if (activeMoveHandler) document.removeEventListener('mousemove', activeMoveHandler)
        if (activeUpHandler) document.removeEventListener('mouseup', activeUpHandler)
        el.style.cursor = ''
        el.removeAttribute('data-draggable')
        el.style.transform = ''
      }
    } else {
      el.style.cursor = ''
      el.removeAttribute('data-draggable')
      el.style.transform = ''
    }
  }, [elementId, cleanup])

  return (
    <PanelSection title="Draggable">
      <div className="space-y-3">
        {/* Enable */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={config.enabled}
            onChange={e => handleToggle(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-[#555] bg-[#111] text-wf-blue focus:ring-wf-blue"
          />
          <span className="text-xs text-zinc-300">Activer le glisser</span>
        </label>

        {config.enabled && (
          <>
            {/* Axis */}
            <div className="space-y-1">
              <Label className="text-[10px] text-zinc-500">Axe</Label>
              <select
                value={config.axis}
                onChange={e => setConfig(prev => ({ ...prev, axis: e.target.value as DraggableConfig['axis'] }))}
                className="w-full h-7 bg-[#111] border border-[#333] text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
              >
                <option value="both">Les deux</option>
                <option value="x">Horizontal</option>
                <option value="y">Vertical</option>
              </select>
            </div>

            {/* Bounds */}
            <div className="space-y-1">
              <Label className="text-[10px] text-zinc-500">Limites</Label>
              <select
                value={config.bounds}
                onChange={e => setConfig(prev => ({ ...prev, bounds: e.target.value as DraggableConfig['bounds'] }))}
                className="w-full h-7 bg-[#111] border border-[#333] text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
              >
                <option value="parent">Parent</option>
                <option value="window">Fenetre</option>
                <option value="none">Aucune</option>
              </select>
            </div>

            {/* Inertia */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.inertia}
                onChange={e => setConfig(prev => ({ ...prev, inertia: e.target.checked }))}
                className="w-3.5 h-3.5 rounded border-[#555] bg-[#111] text-wf-blue focus:ring-wf-blue"
              />
              <span className="text-[10px] text-zinc-300">Inertie</span>
            </label>
          </>
        )}
      </div>
    </PanelSection>
  )
}
