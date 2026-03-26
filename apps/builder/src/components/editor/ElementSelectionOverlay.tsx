'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { parseElementId, getByPath } from '@/lib/elementHelpers'
import { EditorContextMenu } from './ContextMenu'
import { InlineRichTextEditor } from './InlineRichTextEditor'
import type { ElementType } from '@/types/elements'
import { getBreakpointById } from '@/types/breakpoints'

interface OverlayRect {
  top: number
  left: number
  width: number
  height: number
}

interface ElementInfo {
  id: string
  type: ElementType
  label: string
  rect: OverlayRect
}

interface SpacingValues {
  margin: [number, number, number, number]
  padding: [number, number, number, number]
}

interface DistanceLine {
  x1: number; y1: number; x2: number; y2: number; label: string; axis: 'h' | 'v'
}

export function ElementSelectionOverlay() {
  const {
    selectedElementPath, selectElement, setInlineEditing, isInlineEditing, activeBreakpoint,
    canvasZoom, selectedElementPaths, addToSelection, removeFromSelection, clearSelection,
  } = useEditorStore()
  const [hoveredElement, setHoveredElement] = useState<ElementInfo | null>(null)
  const [selectedRect, setSelectedRect] = useState<OverlayRect | null>(null)
  const [selectedLabel, setSelectedLabel] = useState<string>('')
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const [spacingValues, setSpacingValues] = useState<SpacingValues | null>(null)
  const [resizing, setResizing] = useState<{ handle: string; startX: number; startY: number; startW: number; startH: number } | null>(null)
  const [repositioning, setRepositioning] = useState(false)
  const [richTextTarget, setRichTextTarget] = useState<{ element: HTMLElement; id: string; type: ElementType } | null>(null)
  const [altHeld, setAltHeld] = useState(false)
  const [distanceLines, setDistanceLines] = useState<DistanceLine[]>([])
  const [multiRects, setMultiRects] = useState<Map<string, OverlayRect>>(new Map())
  const [rubberBand, setRubberBand] = useState<{ startX: number; startY: number; endX: number; endY: number } | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  // Track Alt key for distance measurement
  useEffect(() => {
    const down = (e: KeyboardEvent) => { if (e.key === 'Alt') setAltHeld(true) }
    const up = (e: KeyboardEvent) => { if (e.key === 'Alt') { setAltHeld(false); setDistanceLines([]) } }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])

  // Get canvas-relative rect, compensating for zoom
  const getRelativeRect = useCallback((el: HTMLElement): OverlayRect | null => {
    const canvas = document.getElementById('site-canvas')
    if (!canvas) return null
    const canvasRect = canvas.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    // Divide by zoom to get canvas-space coordinates
    const zoom = useEditorStore.getState().canvasZoom
    return {
      top: (elRect.top - canvasRect.top) / zoom,
      left: (elRect.left - canvasRect.left) / zoom,
      width: elRect.width / zoom,
      height: elRect.height / zoom,
    }
  }, [])

  // Find closest element with data-element-id (supports SVG elements inside badges/buttons)
  const findElementTarget = useCallback((target: EventTarget | null): HTMLElement | null => {
    if (!(target instanceof Element)) return null
    return target.closest('[data-element-id]') as HTMLElement | null
  }, [])

  // Extract info from annotated element
  const getElementInfo = useCallback((el: HTMLElement): ElementInfo | null => {
    const id = el.getAttribute('data-element-id')
    const type = el.getAttribute('data-element-type') as ElementType
    const label = el.getAttribute('data-element-label')
    if (!id || !type || !label) return null
    const rect = getRelativeRect(el)
    if (!rect) return null
    return { id, type, label, rect }
  }, [getRelativeRect])

  // Compute distance lines between selected and hovered element
  const computeDistances = useCallback((selRect: OverlayRect, hovRect: OverlayRect): DistanceLine[] => {
    const lines: DistanceLine[] = []
    // Vertical distance (top/bottom)
    if (hovRect.top > selRect.top + selRect.height) {
      // Hovered below selected
      const gap = hovRect.top - (selRect.top + selRect.height)
      const midX = Math.max(selRect.left, hovRect.left) + Math.min(selRect.width, hovRect.width) / 2
      lines.push({ x1: midX, y1: selRect.top + selRect.height, x2: midX, y2: hovRect.top, label: `${Math.round(gap)}`, axis: 'v' })
    } else if (selRect.top > hovRect.top + hovRect.height) {
      const gap = selRect.top - (hovRect.top + hovRect.height)
      const midX = Math.max(selRect.left, hovRect.left) + Math.min(selRect.width, hovRect.width) / 2
      lines.push({ x1: midX, y1: hovRect.top + hovRect.height, x2: midX, y2: selRect.top, label: `${Math.round(gap)}`, axis: 'v' })
    }
    // Horizontal distance (left/right)
    if (hovRect.left > selRect.left + selRect.width) {
      const gap = hovRect.left - (selRect.left + selRect.width)
      const midY = Math.max(selRect.top, hovRect.top) + Math.min(selRect.height, hovRect.height) / 2
      lines.push({ x1: selRect.left + selRect.width, y1: midY, x2: hovRect.left, y2: midY, label: `${Math.round(gap)}`, axis: 'h' })
    } else if (selRect.left > hovRect.left + hovRect.width) {
      const gap = selRect.left - (hovRect.left + hovRect.width)
      const midY = Math.max(selRect.top, hovRect.top) + Math.min(selRect.height, hovRect.height) / 2
      lines.push({ x1: hovRect.left + hovRect.width, y1: midY, x2: selRect.left, y2: midY, label: `${Math.round(gap)}`, axis: 'h' })
    }
    return lines
  }, [])

  // Handle mousemove → hover outline + distance measurement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isInlineEditing) return
    const el = findElementTarget(e.target)
    if (el) {
      const info = getElementInfo(el)
      setHoveredElement(prev => {
        if (prev?.id === info?.id) return prev
        return info
      })
      // Distance measurement on Alt+hover
      if (altHeld && selectedRect && info && info.id !== selectedElementPath) {
        setDistanceLines(computeDistances(selectedRect, info.rect))
      } else if (!altHeld) {
        setDistanceLines([])
      }
    } else {
      setHoveredElement(null)
      if (!altHeld) setDistanceLines([])
    }
  }, [findElementTarget, getElementInfo, isInlineEditing, altHeld, selectedRect, selectedElementPath, computeDistances])

  // Handle mouseleave → clear hover
  const handleMouseLeave = useCallback(() => {
    setHoveredElement(null)
  }, [])

  // Handle click → select element (with Shift for multi-select)
  const handleClick = useCallback((e: MouseEvent) => {
    if (isInlineEditing) return
    const el = findElementTarget(e.target)
    if (el) {
      e.stopPropagation()
      e.preventDefault()
      const id = el.getAttribute('data-element-id')!
      // Skip locked elements
      if (useEditorStore.getState().lockedElements.has(id)) return
      if (e.shiftKey) {
        const store = useEditorStore.getState()
        if (store.selectedElementPaths.includes(id)) {
          removeFromSelection(id)
        } else {
          // If no multi-selection yet, start with current
          if (store.selectedElementPaths.length === 0 && store.selectedElementPath) {
            addToSelection(store.selectedElementPath)
          }
          addToSelection(id)
        }
      } else {
        clearSelection()
        selectElement(id)
      }
    }
  }, [findElementTarget, selectElement, isInlineEditing, addToSelection, removeFromSelection, clearSelection])

  // Handle double-click → rich text editing
  const handleDoubleClick = useCallback((e: MouseEvent) => {
    const el = findElementTarget(e.target)
    if (!el) return
    const elId = el.getAttribute('data-element-id')
    if (elId && useEditorStore.getState().lockedElements.has(elId)) return
    const type = el.getAttribute('data-element-type') as ElementType
    if (type !== 'heading' && type !== 'text' && type !== 'badge') return

    e.stopPropagation()
    e.preventDefault()

    const id = el.getAttribute('data-element-id')!
    selectElement(id)
    setInlineEditing(true)

    // Hide the original element text (we overlay with tiptap)
    el.style.visibility = 'hidden'
    setRichTextTarget({ element: el, id, type })
  }, [findElementTarget, selectElement, setInlineEditing])

  // Rich text commit/cancel handlers
  const handleRichTextCommit = useCallback((html: string) => {
    if (!richTextTarget) return
    const { element, id } = richTextTarget
    element.style.visibility = ''
    setRichTextTarget(null)
    setInlineEditing(false)

    const parsed = parseElementId(id)
    if (parsed) {
      useEditorStore.getState().updateElementContent(parsed.sectionId, parsed.contentPath, html)
    }
  }, [richTextTarget, setInlineEditing])

  const handleRichTextCancel = useCallback(() => {
    if (!richTextTarget) return
    richTextTarget.element.style.visibility = ''
    setRichTextTarget(null)
    setInlineEditing(false)
  }, [richTextTarget, setInlineEditing])

  // Handle right-click → context menu
  const handleContextMenu = useCallback((e: MouseEvent) => {
    const el = findElementTarget(e.target)
    if (el) {
      e.preventDefault()
      e.stopPropagation()
      const id = el.getAttribute('data-element-id')!
      selectElement(id)
      setContextMenu({ x: e.clientX, y: e.clientY })
    } else {
      const { selectedSectionId } = useEditorStore.getState()
      if (selectedSectionId) {
        e.preventDefault()
        setContextMenu({ x: e.clientX, y: e.clientY })
      }
    }
  }, [findElementTarget, selectElement])

  // Rubber band selection
  const handleRubberBandStart = useCallback((e: React.MouseEvent) => {
    // Only on empty area (no element target), left button, no space (panning)
    if (e.button !== 0) return
    const el = findElementTarget(e.target as EventTarget)
    if (el) return

    const canvas = document.getElementById('site-canvas')
    if (!canvas) return
    const canvasRect = canvas.getBoundingClientRect()
    const zoom = useEditorStore.getState().canvasZoom
    const startX = (e.clientX - canvasRect.left) / zoom
    const startY = (e.clientY - canvasRect.top) / zoom

    setRubberBand({ startX, startY, endX: startX, endY: startY })

    const onMove = (me: MouseEvent) => {
      const endX = (me.clientX - canvasRect.left) / zoom
      const endY = (me.clientY - canvasRect.top) / zoom
      setRubberBand({ startX, startY, endX, endY })
    }

    const onUp = (me: MouseEvent) => {
      const endX = (me.clientX - canvasRect.left) / zoom
      const endY = (me.clientY - canvasRect.top) / zoom
      // Compute selection rect
      const minX = Math.min(startX, endX)
      const maxX = Math.max(startX, endX)
      const minY = Math.min(startY, endY)
      const maxY = Math.max(startY, endY)

      if (maxX - minX > 5 || maxY - minY > 5) {
        // Find all elements that intersect the rubber band
        const allEls = canvas.querySelectorAll('[data-element-id]')
        const selected: string[] = []
        allEls.forEach(el => {
          const rect = getRelativeRect(el as HTMLElement)
          if (!rect) return
          // Check intersection
          if (rect.left < maxX && rect.left + rect.width > minX &&
              rect.top < maxY && rect.top + rect.height > minY) {
            const id = el.getAttribute('data-element-id')
            if (id) selected.push(id)
          }
        })
        if (selected.length > 0) {
          useEditorStore.getState().selectElements(selected)
        }
      }

      setRubberBand(null)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [findElementTarget, getRelativeRect])

  // Sync selected element rect + spacing on RAF
  useEffect(() => {
    if (!selectedElementPath) {
      setSelectedRect(null)
      setSelectedLabel('')
      setSpacingValues(null)
      return
    }

    const updateSelectedRect = () => {
      const el = document.querySelector(`[data-element-id="${selectedElementPath}"]`) as HTMLElement | null
      if (el) {
        const rect = getRelativeRect(el)
        setSelectedRect(rect)
        setSelectedLabel(el.getAttribute('data-element-label') ?? '')
        // Always compute spacing for selected element
        const cs = getComputedStyle(el)
        const zoom = useEditorStore.getState().canvasZoom
        setSpacingValues({
          margin: [parseFloat(cs.marginTop) / zoom, parseFloat(cs.marginRight) / zoom, parseFloat(cs.marginBottom) / zoom, parseFloat(cs.marginLeft) / zoom],
          padding: [parseFloat(cs.paddingTop) / zoom, parseFloat(cs.paddingRight) / zoom, parseFloat(cs.paddingBottom) / zoom, parseFloat(cs.paddingLeft) / zoom],
        })
      } else {
        setSelectedRect(null)
        setSpacingValues(null)
      }

      // Update multi-selection rects
      const store = useEditorStore.getState()
      if (store.selectedElementPaths.length > 1) {
        const newRects = new Map<string, OverlayRect>()
        store.selectedElementPaths.forEach(path => {
          const elem = document.querySelector(`[data-element-id="${path}"]`) as HTMLElement | null
          if (elem) {
            const r = getRelativeRect(elem)
            if (r) newRects.set(path, r)
          }
        })
        setMultiRects(newRects)
      } else {
        setMultiRects(new Map())
      }

      rafRef.current = requestAnimationFrame(updateSelectedRect)
    }

    rafRef.current = requestAnimationFrame(updateSelectedRect)
    return () => cancelAnimationFrame(rafRef.current)
  }, [selectedElementPath, getRelativeRect, selectedElementPaths])

  // Attach event listeners to canvas
  useEffect(() => {
    const canvas = document.getElementById('site-canvas')
    if (!canvas) return

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true })
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('click', handleClick, true)
    canvas.addEventListener('dblclick', handleDoubleClick, true)
    canvas.addEventListener('contextmenu', handleContextMenu, true)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('click', handleClick, true)
      canvas.removeEventListener('dblclick', handleDoubleClick, true)
      canvas.removeEventListener('contextmenu', handleContextMenu, true)
    }
  }, [handleMouseMove, handleMouseLeave, handleClick, handleDoubleClick, handleContextMenu])

  // Delete key for multi-selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElementPaths.length > 1) {
        e.preventDefault()
        const store = useEditorStore.getState()
        // Delete all selected elements
        selectedElementPaths.forEach(path => {
          const parsed = parseElementId(path)
          if (parsed && parsed.contentPath.startsWith('__el.')) {
            store.removeCustomElement(parsed.sectionId, parsed.contentPath.slice(5))
          }
        })
        clearSelection()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedElementPaths, clearSelection])

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 30 }}
      onMouseDown={handleRubberBandStart as unknown as React.MouseEventHandler}
    >
      {/* ── Hover outline (solid blue, Webflow-style) ── */}
      {hoveredElement && hoveredElement.id !== selectedElementPath && !isInlineEditing && (
        <>
          <div
            className="absolute border border-wf-blue/70 rounded-[1px] transition-all duration-75"
            style={{
              top: hoveredElement.rect.top,
              left: hoveredElement.rect.left,
              width: hoveredElement.rect.width,
              height: hoveredElement.rect.height,
            }}
          />
          {/* Hover label */}
          <div
            className="absolute bg-wf-blue text-white text-[9px] leading-none px-1.5 py-[3px] rounded-[2px] font-medium whitespace-nowrap"
            style={{
              top: Math.max(0, hoveredElement.rect.top - 18),
              left: hoveredElement.rect.left,
            }}
          >
            {hoveredElement.label}
          </div>
        </>
      )}

      {/* ── Multi-selection outlines ── */}
      {multiRects.size > 0 && Array.from(multiRects.entries()).map(([path, rect]) => (
        path !== selectedElementPath && (
          <div
            key={path}
            className="absolute border-[1.5px] border-wf-blue/60 rounded-[1px]"
            style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
          />
        )
      ))}

      {/* ── Selected element ── */}
      {selectedRect && !isInlineEditing && (
        <>
          {/* Spacing guides — always visible for selected element */}
          {spacingValues && (
            <>
              {/* ── Margin guides (orange) ── */}
              {spacingValues.margin[0] > 0 && (
                <div className="absolute bg-wf-margin/15 flex items-center justify-center" style={{
                  top: selectedRect.top - spacingValues.margin[0], left: selectedRect.left,
                  width: selectedRect.width, height: spacingValues.margin[0],
                }}>
                  <span className="text-[8px] font-medium text-wf-margin/80">{Math.round(spacingValues.margin[0])}</span>
                </div>
              )}
              {spacingValues.margin[2] > 0 && (
                <div className="absolute bg-wf-margin/15 flex items-center justify-center" style={{
                  top: selectedRect.top + selectedRect.height, left: selectedRect.left,
                  width: selectedRect.width, height: spacingValues.margin[2],
                }}>
                  <span className="text-[8px] font-medium text-wf-margin/80">{Math.round(spacingValues.margin[2])}</span>
                </div>
              )}
              {spacingValues.margin[3] > 0 && (
                <div className="absolute bg-wf-margin/15 flex items-center justify-center" style={{
                  top: selectedRect.top, left: selectedRect.left - spacingValues.margin[3],
                  width: spacingValues.margin[3], height: selectedRect.height,
                }}>
                  <span className="text-[8px] font-medium text-wf-margin/80 -rotate-90">{Math.round(spacingValues.margin[3])}</span>
                </div>
              )}
              {spacingValues.margin[1] > 0 && (
                <div className="absolute bg-wf-margin/15 flex items-center justify-center" style={{
                  top: selectedRect.top, left: selectedRect.left + selectedRect.width,
                  width: spacingValues.margin[1], height: selectedRect.height,
                }}>
                  <span className="text-[8px] font-medium text-wf-margin/80 -rotate-90">{Math.round(spacingValues.margin[1])}</span>
                </div>
              )}

              {/* ── Padding guides (green) ── */}
              {spacingValues.padding[0] > 0 && (
                <div className="absolute bg-wf-padding/15 flex items-center justify-center" style={{
                  top: selectedRect.top, left: selectedRect.left,
                  width: selectedRect.width, height: spacingValues.padding[0],
                }}>
                  <span className="text-[8px] font-medium text-wf-padding/80">{Math.round(spacingValues.padding[0])}</span>
                </div>
              )}
              {spacingValues.padding[2] > 0 && (
                <div className="absolute bg-wf-padding/15 flex items-center justify-center" style={{
                  top: selectedRect.top + selectedRect.height - spacingValues.padding[2], left: selectedRect.left,
                  width: selectedRect.width, height: spacingValues.padding[2],
                }}>
                  <span className="text-[8px] font-medium text-wf-padding/80">{Math.round(spacingValues.padding[2])}</span>
                </div>
              )}
              {spacingValues.padding[3] > 0 && (
                <div className="absolute bg-wf-padding/15 flex items-center justify-center" style={{
                  top: selectedRect.top, left: selectedRect.left,
                  width: spacingValues.padding[3], height: selectedRect.height,
                }}>
                  <span className="text-[8px] font-medium text-wf-padding/80 -rotate-90">{Math.round(spacingValues.padding[3])}</span>
                </div>
              )}
              {spacingValues.padding[1] > 0 && (
                <div className="absolute bg-wf-padding/15 flex items-center justify-center" style={{
                  top: selectedRect.top, left: selectedRect.left + selectedRect.width - spacingValues.padding[1],
                  width: spacingValues.padding[1], height: selectedRect.height,
                }}>
                  <span className="text-[8px] font-medium text-wf-padding/80 -rotate-90">{Math.round(spacingValues.padding[1])}</span>
                </div>
              )}
            </>
          )}

          {/* Selection border — also serves as drag-to-move handle for custom elements */}
          <div
            className="absolute border-[1.5px] border-wf-blue rounded-[1px]"
            style={{
              top: selectedRect.top,
              left: selectedRect.left,
              width: selectedRect.width,
              height: selectedRect.height,
              cursor: selectedElementPath?.includes('::__el.') ? 'move' : undefined,
              pointerEvents: selectedElementPath?.includes('::__el.') ? 'auto' : undefined,
            }}
            onMouseDown={(e) => {
              if (!selectedElementPath?.includes('::__el.')) return
              const parsed = parseElementId(selectedElementPath)
              if (!parsed) return

              // Check if element is on a pre-built section (not custom)
              const store = useEditorStore.getState()
              const section = store.siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === parsed.sectionId)
              if (!section || section.type === 'custom') return

              const elementId = parsed.contentPath.replace('__el.', '')
              const findEl = (elements: typeof section.elements, id: string): NonNullable<typeof section.elements>[number] | null => {
                if (!elements) return null
                for (const el of elements) {
                  if (el.id === id) return el
                  if (el.children) { const f = findEl(el.children, id); if (f) return f }
                }
                return null
              }
              const el = findEl(section.elements ?? [], elementId)
              if (!el || el.style?.position !== 'absolute') return

              e.stopPropagation()
              e.preventDefault()

              const startX = e.clientX
              const startY = e.clientY
              const startTop = parseFloat(String(el.style.top)) || 0
              const startLeft = parseFloat(String(el.style.left)) || 0
              const topUnit = String(el.style.top || '0px').match(/[a-z%]+$/i)?.[0] || 'px'
              const leftUnit = String(el.style.left || '0px').match(/[a-z%]+$/i)?.[0] || 'px'
              const zoom = store.canvasZoom
              let hasMoved = false

              // For % positioning, get section dimensions
              const sectionEl = document.querySelector(`[data-section-content="${parsed.sectionId}"]`) as HTMLElement
              const sectionRect = sectionEl?.getBoundingClientRect()

              const onMove = (me: MouseEvent) => {
                const dx = (me.clientX - startX) / zoom
                const dy = (me.clientY - startY) / zoom
                if (!hasMoved && Math.abs(dx) < 3 && Math.abs(dy) < 3) return
                hasMoved = true
                setRepositioning(true)

                let newTop: string
                let newLeft: string

                if (topUnit === '%' && sectionRect) {
                  const sectionH = sectionRect.height / zoom
                  newTop = `${Math.round((startTop + (dy / sectionH) * 100) * 100) / 100}%`
                } else {
                  newTop = `${Math.round(startTop + dy)}px`
                }

                if (leftUnit === '%' && sectionRect) {
                  const sectionW = sectionRect.width / zoom
                  newLeft = `${Math.round((startLeft + (dx / sectionW) * 100) * 100) / 100}%`
                } else {
                  newLeft = `${Math.round(startLeft + dx)}px`
                }

                store.updateCustomElementStyle(parsed.sectionId, elementId, {
                  top: newTop,
                  left: newLeft,
                })
              }

              const onUp = () => {
                setRepositioning(false)
                window.removeEventListener('mousemove', onMove)
                window.removeEventListener('mouseup', onUp)
              }

              window.addEventListener('mousemove', onMove)
              window.addEventListener('mouseup', onUp)
            }}
          />

          {/* Label badge + settings gear + delete button */}
          <div
            className="absolute flex items-center gap-0.5"
            style={{
              top: Math.max(0, selectedRect.top - 19),
              left: selectedRect.left,
            }}
          >
            <div className="bg-wf-blue text-white text-[9px] leading-none px-1.5 py-[3px] rounded-[2px] font-medium whitespace-nowrap flex items-center gap-1">
              {selectedLabel}
            </div>
            <div className="bg-emerald-500 text-white rounded-[2px] p-[2px] pointer-events-auto cursor-pointer hover:bg-emerald-600 transition-colors">
              <svg className="w-[10px] h-[10px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
            {/* Delete button */}
            <div
              className="bg-red-500 text-white rounded-[2px] p-[2px] pointer-events-auto cursor-pointer hover:bg-red-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                const path = useEditorStore.getState().selectedElementPath
                if (path) {
                  const parsed = parseElementId(path)
                  if (parsed && parsed.contentPath.startsWith('__el.')) {
                    const elementId = parsed.contentPath.replace('__el.', '')
                    useEditorStore.getState().removeCustomElement(parsed.sectionId, elementId)
                    useEditorStore.getState().selectElement(null)
                  } else {
                    useEditorStore.getState().deleteSelected()
                  }
                }
              }}
              title="Supprimer"
            >
              <svg className="w-[10px] h-[10px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
          </div>

          {/* Dimension tooltip (always shown, bottom-right) */}
          <div
            className="absolute bg-wf-blue/90 text-white text-[9px] leading-none px-1.5 py-[3px] rounded-[2px] font-medium whitespace-nowrap"
            style={{
              top: selectedRect.top + selectedRect.height + 4,
              left: selectedRect.left + selectedRect.width,
              transform: 'translateX(-100%)',
            }}
          >
            {Math.round(selectedRect.width)} x {Math.round(selectedRect.height)}
          </div>

          {/* Vertical breakpoint indicator — "Affects Xpx and below" */}
          {activeBreakpoint !== 'base' && (() => {
            const currentBp = getBreakpointById(activeBreakpoint)
            return (
              <div
                className="absolute bg-violet-500/90 text-white text-[9px] font-medium px-1 py-1.5 rounded-r whitespace-nowrap"
                style={{
                  top: selectedRect.top,
                  left: selectedRect.left - 18,
                  height: Math.min(selectedRect.height, 120),
                  writingMode: 'vertical-lr',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Affects {currentBp?.width ?? activeBreakpoint}px and below
              </div>
            )
          })()}

          {/* Resize handles — 4 corners + 4 edges */}
          {(() => {
            const s = 6
            const handles = [
              { id: 'nw', x: -s / 2, y: -s / 2, cursor: 'nwse-resize' },
              { id: 'n', x: selectedRect.width / 2 - s / 2, y: -s / 2, cursor: 'ns-resize' },
              { id: 'ne', x: selectedRect.width - s / 2, y: -s / 2, cursor: 'nesw-resize' },
              { id: 'w', x: -s / 2, y: selectedRect.height / 2 - s / 2, cursor: 'ew-resize' },
              { id: 'e', x: selectedRect.width - s / 2, y: selectedRect.height / 2 - s / 2, cursor: 'ew-resize' },
              { id: 'sw', x: -s / 2, y: selectedRect.height - s / 2, cursor: 'nesw-resize' },
              { id: 's', x: selectedRect.width / 2 - s / 2, y: selectedRect.height - s / 2, cursor: 'ns-resize' },
              { id: 'se', x: selectedRect.width - s / 2, y: selectedRect.height - s / 2, cursor: 'nwse-resize' },
            ]

            const startResize = (handle: string, e: React.MouseEvent) => {
              e.stopPropagation()
              e.preventDefault()
              const startX = e.clientX
              const startY = e.clientY
              const startW = selectedRect.width
              const startH = selectedRect.height
              setResizing({ handle, startX, startY, startW, startH })

              const parsed = selectedElementPath ? parseElementId(selectedElementPath) : null
              if (!parsed) return

              const zoom = useEditorStore.getState().canvasZoom

              const onMove = (me: MouseEvent) => {
                const dx = (me.clientX - startX) / zoom
                const dy = (me.clientY - startY) / zoom
                let newW = startW
                let newH = startH
                if (handle.includes('e')) newW = Math.max(20, startW + dx)
                if (handle.includes('w')) newW = Math.max(20, startW - dx)
                if (handle.includes('s')) newH = Math.max(20, startH + dy)
                if (handle.includes('n')) newH = Math.max(20, startH - dy)

                // Preserve existing unit (%, vw, vh, em, rem) or default to px
                const elementId = `${parsed.sectionId}::${parsed.contentPath}`
                const domEl = document.querySelector(`[data-element-id="${elementId}"]`) as HTMLElement | null
                const getExistingUnit = (prop: 'width' | 'height') => {
                  // Check store style value for unit
                  const store = useEditorStore.getState()
                  const sections = store.siteConfig?.pages.flatMap(p => p.sections) ?? []
                  const section = sections.find(s => s.id === parsed.sectionId)
                  const elStyles = section?.content?.__elementStyles as Record<string, Record<string, string>> | undefined
                  const styleVal = elStyles?.[parsed.contentPath]?.[prop]
                  if (styleVal) {
                    const unitMatch = styleVal.match(/[a-z%]+$/i)
                    if (unitMatch) return { unit: unitMatch[0], numVal: parseFloat(styleVal) }
                  }
                  return { unit: 'px', numVal: prop === 'width' ? startW : startH }
                }

                const updates: Record<string, string> = {}
                if (handle.includes('e') || handle.includes('w')) {
                  const { unit, numVal } = getExistingUnit('width')
                  if (unit === 'px' || !numVal) {
                    updates.width = `${Math.round(newW)}px`
                  } else {
                    const ratio = newW / startW
                    updates.width = `${Math.round(numVal * ratio * 100) / 100}${unit}`
                  }
                }
                if (handle.includes('s') || handle.includes('n')) {
                  const { unit, numVal } = getExistingUnit('height')
                  if (unit === 'px' || !numVal) {
                    updates.height = `${Math.round(newH)}px`
                  } else {
                    const ratio = newH / startH
                    updates.height = `${Math.round(numVal * ratio * 100) / 100}${unit}`
                  }
                }
                if (parsed.contentPath.startsWith('__el.')) {
                  const elId = parsed.contentPath.replace('__el.', '')
                  useEditorStore.getState().updateCustomElementStyle(parsed.sectionId, elId, updates)
                } else {
                  useEditorStore.getState().updateElementStyle(parsed.sectionId, parsed.contentPath, updates)
                }
              }

              const onUp = () => {
                setResizing(null)
                window.removeEventListener('mousemove', onMove)
                window.removeEventListener('mouseup', onUp)
              }

              window.addEventListener('mousemove', onMove)
              window.addEventListener('mouseup', onUp)
            }

            return handles.map(h => (
              <div
                key={h.id}
                className="absolute bg-white border border-wf-blue rounded-[1px] pointer-events-auto"
                style={{
                  top: selectedRect.top + h.y,
                  left: selectedRect.left + h.x,
                  width: s,
                  height: s,
                  cursor: h.cursor,
                }}
                onMouseDown={(e) => startResize(h.id, e)}
              />
            ))
          })()}

          {/* Position tooltip during drag-to-move */}
          {repositioning && (
            <div
              className="absolute bg-zinc-900 text-white text-[10px] px-2.5 py-1 rounded shadow-lg border border-zinc-700 whitespace-nowrap font-medium"
              style={{
                top: selectedRect.top - 30,
                left: selectedRect.left + selectedRect.width / 2,
                transform: 'translateX(-50%)',
                zIndex: 10,
              }}
            >
              {Math.round(selectedRect.left)}px, {Math.round(selectedRect.top)}px
            </div>
          )}

          {/* Dimension tooltip during resize (larger, centered) */}
          {resizing && (
            <div
              className="absolute bg-zinc-900 text-white text-[10px] px-2.5 py-1 rounded shadow-lg border border-zinc-700 whitespace-nowrap font-medium"
              style={{
                top: selectedRect.top + selectedRect.height + 10,
                left: selectedRect.left + selectedRect.width / 2,
                transform: 'translateX(-50%)',
              }}
            >
              {Math.round(selectedRect.width)} x {Math.round(selectedRect.height)}
            </div>
          )}
        </>
      )}

      {/* ── Distance measurement lines (Alt+Hover) ── */}
      {distanceLines.length > 0 && (
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 31 }}>
          {distanceLines.map((line, i) => (
            <g key={i}>
              <line
                x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                stroke="#ff6b9d"
                strokeWidth={1}
                strokeDasharray="4 2"
              />
              <rect
                x={(line.x1 + line.x2) / 2 - 14}
                y={(line.y1 + line.y2) / 2 - 8}
                width={28}
                height={16}
                rx={3}
                fill="#ff6b9d"
              />
              <text
                x={(line.x1 + line.x2) / 2}
                y={(line.y1 + line.y2) / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={9}
                fontWeight={600}
                fontFamily="monospace"
              >
                {line.label}
              </text>
            </g>
          ))}
        </svg>
      )}

      {/* ── Rubber band selection ── */}
      {rubberBand && (
        <div
          className="absolute border border-wf-blue/60 bg-wf-blue/10 pointer-events-none"
          style={{
            left: Math.min(rubberBand.startX, rubberBand.endX),
            top: Math.min(rubberBand.startY, rubberBand.endY),
            width: Math.abs(rubberBand.endX - rubberBand.startX),
            height: Math.abs(rubberBand.endY - rubberBand.startY),
          }}
        />
      )}

      {/* Inline editing indicator */}
      {isInlineEditing && selectedRect && (
        <div
          className="absolute border-[1.5px] border-wf-blue/50 rounded-[1px]"
          style={{
            top: selectedRect.top,
            left: selectedRect.left,
            width: selectedRect.width,
            height: selectedRect.height,
          }}
        />
      )}

      {/* Rich text editor overlay */}
      {richTextTarget && (() => {
        const parsed = parseElementId(richTextTarget.id)
        if (!parsed) return null
        const { siteConfig: sc } = useEditorStore.getState()
        const section = sc?.pages.flatMap(p => p.sections).find(s => s.id === parsed.sectionId)
        const currentContent = section ? (getByPath(section.content, parsed.contentPath) as string) ?? '' : ''
        return (
          <InlineRichTextEditor
            initialContent={currentContent}
            targetElement={richTextTarget.element}
            elementType={richTextTarget.type as 'heading' | 'text' | 'badge'}
            onCommit={handleRichTextCommit}
            onCancel={handleRichTextCancel}
          />
        )
      })()}

      {/* Context menu */}
      {contextMenu && (
        <EditorContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  )
}
