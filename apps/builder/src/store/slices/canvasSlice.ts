import type { StateCreator } from 'zustand'
import type { EditorState, CanvasSlice } from '../types'

export const createCanvasSlice: StateCreator<EditorState, [['zustand/immer', never]], [], CanvasSlice> = (set, get) => ({
  canvasZoom: 1,
  canvasOffset: { x: 0, y: 0 },
  isPanning: false,
  showRulers: false,
  canvasGuides: [],
  showGrid: false,
  gridSize: 16,
  showColumns: false,
  columnCount: 12,
  snapEnabled: true,
  snapToGrid: true,
  snapToElements: true,
  snapToGuides: true,

  setCanvasZoom: (zoom) => set((state) => {
    state.canvasZoom = Math.max(0.1, Math.min(3, zoom))
  }),
  setCanvasOffset: (offset) => set((state) => {
    state.canvasOffset = offset
  }),
  zoomIn: () => set((state) => {
    state.canvasZoom = Math.min(3, Math.round((state.canvasZoom + 0.25) * 100) / 100)
  }),
  zoomOut: () => set((state) => {
    state.canvasZoom = Math.max(0.1, Math.round((state.canvasZoom - 0.25) * 100) / 100)
  }),
  zoomToFit: () => set((state) => {
    state.canvasZoom = 1
    state.canvasOffset = { x: 0, y: 0 }
  }),
  zoomTo100: () => set((state) => {
    state.canvasZoom = 1
    state.canvasOffset = { x: 0, y: 0 }
  }),
  setIsPanning: (v) => set((state) => {
    state.isPanning = v
  }),
  toggleRulers: () => set((state) => {
    state.showRulers = !state.showRulers
  }),
  addGuide: (axis, position) => set((state) => {
    state.canvasGuides.push({ id: `guide-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, axis, position })
  }),
  updateGuide: (id, position) => set((state) => {
    const g = state.canvasGuides.find(g => g.id === id)
    if (g) g.position = position
  }),
  removeGuide: (id) => set((state) => {
    state.canvasGuides = state.canvasGuides.filter(g => g.id !== id)
  }),
  clearGuides: () => set((state) => {
    state.canvasGuides = []
  }),
  toggleGrid: () => set((state) => {
    state.showGrid = !state.showGrid
  }),
  toggleColumns: () => set((state) => {
    state.showColumns = !state.showColumns
  }),
  setGridSize: (n) => set((state) => {
    state.gridSize = n
  }),
  toggleSnap: () => set((state) => {
    state.snapEnabled = !state.snapEnabled
  }),
})
