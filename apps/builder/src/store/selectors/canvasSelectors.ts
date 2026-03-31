import type { EditorState } from '../types'

export const selectCanvasZoom = (s: EditorState) => s.canvasZoom
export const selectCanvasOffset = (s: EditorState) => s.canvasOffset
export const selectIsPanning = (s: EditorState) => s.isPanning
export const selectShowRulers = (s: EditorState) => s.showRulers
export const selectCanvasGuides = (s: EditorState) => s.canvasGuides
export const selectShowGrid = (s: EditorState) => s.showGrid
export const selectGridSize = (s: EditorState) => s.gridSize
export const selectShowColumns = (s: EditorState) => s.showColumns
export const selectColumnCount = (s: EditorState) => s.columnCount
export const selectSnapEnabled = (s: EditorState) => s.snapEnabled
export const selectSnapToGrid = (s: EditorState) => s.snapToGrid
export const selectSnapToElements = (s: EditorState) => s.snapToElements
export const selectSnapToGuides = (s: EditorState) => s.snapToGuides
