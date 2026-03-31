import { useShallow } from 'zustand/react/shallow'
import { useEditorStore } from '../createEditorStore'

export const useCanvasViewport = () => useEditorStore(useShallow(s => ({
  canvasZoom: s.canvasZoom,
  canvasOffset: s.canvasOffset,
  isPanning: s.isPanning,
})))

export const useCanvasTools = () => useEditorStore(useShallow(s => ({
  showRulers: s.showRulers,
  showGrid: s.showGrid,
  gridSize: s.gridSize,
  showColumns: s.showColumns,
  columnCount: s.columnCount,
  snapEnabled: s.snapEnabled,
  canvasGuides: s.canvasGuides,
})))

export const useCanvasActions = () => useEditorStore(useShallow(s => ({
  setCanvasZoom: s.setCanvasZoom,
  setCanvasOffset: s.setCanvasOffset,
  zoomIn: s.zoomIn,
  zoomOut: s.zoomOut,
  zoomToFit: s.zoomToFit,
  zoomTo100: s.zoomTo100,
  setIsPanning: s.setIsPanning,
  toggleRulers: s.toggleRulers,
  toggleGrid: s.toggleGrid,
  toggleColumns: s.toggleColumns,
  toggleSnap: s.toggleSnap,
  setGridSize: s.setGridSize,
  addGuide: s.addGuide,
  updateGuide: s.updateGuide,
  removeGuide: s.removeGuide,
  clearGuides: s.clearGuides,
})))
