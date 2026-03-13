export interface Rect {
  top: number
  left: number
  width: number
  height: number
}

export interface SnapGuide {
  axis: 'x' | 'y'
  position: number
  type: 'edge' | 'center' | 'spacing'
}

export interface SnapResult {
  snapX?: number
  snapY?: number
  guides: SnapGuide[]
}

export interface SnapOptions {
  threshold?: number
  gridSize?: number
  snapToGrid?: boolean
  snapToElements?: boolean
  snapToGuides?: boolean
  guidePositions?: Array<{ axis: 'x' | 'y'; position: number }>
}

/**
 * Find snap targets for a moving rect against other rects, grid, and guides.
 */
export function findSnapTargets(
  movingRect: Rect,
  allRects: Rect[],
  options: SnapOptions = {}
): SnapResult {
  const {
    threshold = 5,
    gridSize = 16,
    snapToGrid = true,
    snapToElements = true,
    snapToGuides = true,
    guidePositions = [],
  } = options

  const bestSnap = { x: null as { value: number; distance: number } | null, y: null as { value: number; distance: number } | null }
  const guides: SnapGuide[] = []

  const movingEdges = {
    left: movingRect.left,
    right: movingRect.left + movingRect.width,
    top: movingRect.top,
    bottom: movingRect.top + movingRect.height,
    centerX: movingRect.left + movingRect.width / 2,
    centerY: movingRect.top + movingRect.height / 2,
  }

  function trySnapX(target: number, source: number, type: SnapGuide['type']) {
    const dist = Math.abs(target - source)
    if (dist < threshold) {
      if (!bestSnap.x || dist < bestSnap.x.distance) {
        bestSnap.x = { value: target - source + movingRect.left, distance: dist }
      }
      guides.push({ axis: 'x', position: target, type })
    }
  }

  function trySnapY(target: number, source: number, type: SnapGuide['type']) {
    const dist = Math.abs(target - source)
    if (dist < threshold) {
      if (!bestSnap.y || dist < bestSnap.y.distance) {
        bestSnap.y = { value: target - source + movingRect.top, distance: dist }
      }
      guides.push({ axis: 'y', position: target, type })
    }
  }

  // Snap to element edges and centers
  if (snapToElements) {
    for (const rect of allRects) {
      const edges = {
        left: rect.left,
        right: rect.left + rect.width,
        top: rect.top,
        bottom: rect.top + rect.height,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
      }

      // X-axis snapping (left, right, center)
      trySnapX(edges.left, movingEdges.left, 'edge')
      trySnapX(edges.right, movingEdges.right, 'edge')
      trySnapX(edges.left, movingEdges.right, 'edge')
      trySnapX(edges.right, movingEdges.left, 'edge')
      trySnapX(edges.centerX, movingEdges.centerX, 'center')

      // Y-axis snapping (top, bottom, center)
      trySnapY(edges.top, movingEdges.top, 'edge')
      trySnapY(edges.bottom, movingEdges.bottom, 'edge')
      trySnapY(edges.top, movingEdges.bottom, 'edge')
      trySnapY(edges.bottom, movingEdges.top, 'edge')
      trySnapY(edges.centerY, movingEdges.centerY, 'center')
    }
  }

  // Snap to grid
  if (snapToGrid && gridSize > 0) {
    const nearestGridX = Math.round(movingRect.left / gridSize) * gridSize
    const nearestGridY = Math.round(movingRect.top / gridSize) * gridSize
    const distX = Math.abs(nearestGridX - movingRect.left)
    const distY = Math.abs(nearestGridY - movingRect.top)

    if (distX < threshold && (!bestSnap.x || distX < bestSnap.x.distance)) {
      bestSnap.x = { value: nearestGridX, distance: distX }
    }
    if (distY < threshold && (!bestSnap.y || distY < bestSnap.y.distance)) {
      bestSnap.y = { value: nearestGridY, distance: distY }
    }
  }

  // Snap to canvas guides
  if (snapToGuides) {
    for (const guide of guidePositions) {
      if (guide.axis === 'x') {
        trySnapX(guide.position, movingEdges.left, 'edge')
        trySnapX(guide.position, movingEdges.right, 'edge')
        trySnapX(guide.position, movingEdges.centerX, 'center')
      } else {
        trySnapY(guide.position, movingEdges.top, 'edge')
        trySnapY(guide.position, movingEdges.bottom, 'edge')
        trySnapY(guide.position, movingEdges.centerY, 'center')
      }
    }
  }

  return {
    snapX: bestSnap.x?.value ?? undefined,
    snapY: bestSnap.y?.value ?? undefined,
    guides,
  }
}
