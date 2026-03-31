import type { StateCreator } from 'zustand'
import type { EditorState, HistorySlice } from '../types'

export const createHistorySlice: StateCreator<EditorState, [['zustand/immer', never]], [], HistorySlice> = (set, get) => ({
  history: [],
  historyIndex: -1,
  canUndo: false,
  canRedo: false,

  _pushHistory: () => set((state) => {
    if (!state.siteConfig) return
    const snapshot = JSON.stringify(state.siteConfig)
    const newHistory = state.history.slice(0, state.historyIndex + 1)
    newHistory.push(snapshot)
    const limited = newHistory.slice(-50)
    state.history = limited
    state.historyIndex = limited.length - 1
    state.canUndo = limited.length > 1
    state.canRedo = false
  }),

  undo: () => set((state) => {
    if (state.historyIndex <= 0) return
    const newIndex = state.historyIndex - 1
    try {
      state.siteConfig = JSON.parse(state.history[newIndex])
    } catch {
      console.error('Undo: corrupted history snapshot at index', newIndex)
      return
    }
    state.historyIndex = newIndex
    state.canUndo = newIndex > 0
    state.canRedo = true
    state.isDirty = true
  }),

  redo: () => set((state) => {
    if (state.historyIndex >= state.history.length - 1) return
    const newIndex = state.historyIndex + 1
    try {
      state.siteConfig = JSON.parse(state.history[newIndex])
    } catch {
      console.error('Redo: corrupted history snapshot at index', newIndex)
      return
    }
    state.historyIndex = newIndex
    state.canUndo = true
    state.canRedo = newIndex < state.history.length - 1
    state.isDirty = true
  }),
})
