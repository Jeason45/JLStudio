import type { StateCreator } from 'zustand'
import type { EditorState, LockSlice } from '../types'

export const createLockSlice: StateCreator<EditorState, [['zustand/immer', never]], [], LockSlice> = (set, get) => ({
  selectedElementPaths: [],
  lockedElements: new Set<string>(),

  selectElements: (paths) => set((state) => {
    state.selectedElementPaths = paths
    state.selectedElementPath = paths[0] ?? null
  }),
  addToSelection: (path) => set((state) => {
    if (!state.selectedElementPaths.includes(path)) {
      state.selectedElementPaths.push(path)
    }
    // Keep selectedElementPath as the last added
    state.selectedElementPath = path
  }),
  removeFromSelection: (path) => set((state) => {
    state.selectedElementPaths = state.selectedElementPaths.filter(p => p !== path)
    if (state.selectedElementPath === path) {
      state.selectedElementPath = state.selectedElementPaths[0] ?? null
    }
  }),
  clearSelection: () => set((state) => {
    state.selectedElementPaths = []
    state.selectedElementPath = null
  }),

  toggleLockElement: (elementPath) => set((state) => {
    const next = new Set(state.lockedElements)
    if (next.has(elementPath)) {
      next.delete(elementPath)
    } else {
      next.add(elementPath)
      // Deselect if currently selected
      if (state.selectedElementPath === elementPath) {
        state.selectedElementPath = null
      }
      if (state.selectedSectionId === elementPath) {
        state.selectedSectionId = null
      }
    }
    state.lockedElements = next
  }),
  isElementLocked: (elementPath) => get().lockedElements.has(elementPath),
})
