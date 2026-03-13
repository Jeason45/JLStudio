import type { Modifier } from '@dnd-kit/core'
import { findSnapTargets, type Rect, type SnapGuide } from './snapEngine'
import { useEditorStore } from '@/store/editorStore'
import { setActiveSmartGuides } from '@/components/editor/SmartGuidesOverlay'

/**
 * dnd-kit modifier that applies snap-to-grid, snap-to-elements, and snap-to-guides
 * during drag operations. Only active when snapEnabled is true in the store.
 *
 * For section reorder (list-based), snapping is skipped since it doesn't apply.
 * For element drags (which can be positioned), the modifier adjusts the transform
 * to snap to nearby targets and updates the SmartGuidesOverlay.
 */
export const snapModifier: Modifier = ({
  active,
  transform,
  draggingNodeRect,
}) => {
  const state = useEditorStore.getState()

  // No-op if snap is disabled
  if (!state.snapEnabled) {
    return transform
  }

  // Only snap element drags, not section reorders
  const activeData = active?.data?.current
  if (!activeData) return transform
  const dragType = activeData.type as string | undefined
  if (dragType !== 'element' && dragType !== 'new-element') {
    return transform
  }

  // We need the dragging node rect to compute the moving rect
  if (!draggingNodeRect) {
    return transform
  }

  // Build the moving rect (current position of dragged element including transform)
  const movingRect: Rect = {
    left: draggingNodeRect.left + transform.x,
    top: draggingNodeRect.top + transform.y,
    width: draggingNodeRect.width,
    height: draggingNodeRect.height,
  }

  // Collect all sibling element rects from the canvas
  const allRects = collectElementRects(active?.id as string)

  // Build guide positions from canvas guides
  const guidePositions = state.canvasGuides.map(g => ({
    axis: g.axis,
    position: g.position,
  }))

  const result = findSnapTargets(movingRect, allRects, {
    threshold: 6,
    gridSize: state.gridSize,
    snapToGrid: state.snapToGrid,
    snapToElements: state.snapToElements,
    snapToGuides: state.snapToGuides,
    guidePositions,
  })

  // Update smart guides overlay
  if (result.guides.length > 0) {
    setActiveSmartGuides(result.guides)
  } else {
    setActiveSmartGuides([])
  }

  // Compute adjusted transform
  let adjustedX = transform.x
  let adjustedY = transform.y

  if (result.snapX !== undefined) {
    // snapX is the desired left position; adjust transform accordingly
    adjustedX = result.snapX - draggingNodeRect.left
  }
  if (result.snapY !== undefined) {
    adjustedY = result.snapY - draggingNodeRect.top
  }

  return {
    ...transform,
    x: adjustedX,
    y: adjustedY,
  }
}

/**
 * Collect DOMRects for all custom elements in the canvas, excluding the one being dragged.
 * Uses data-element-id attributes on DOM nodes inside #site-canvas.
 */
function collectElementRects(excludeId: string): Rect[] {
  const rects: Rect[] = []
  const canvas = document.getElementById('site-canvas')
  if (!canvas) return rects

  const elements = canvas.querySelectorAll('[data-element-id]')
  elements.forEach(el => {
    const elementId = el.getAttribute('data-element-id')
    if (elementId === excludeId) return

    const domRect = el.getBoundingClientRect()
    rects.push({
      left: domRect.left,
      top: domRect.top,
      width: domRect.width,
      height: domRect.height,
    })
  })

  return rects
}
