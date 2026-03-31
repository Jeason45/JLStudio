import type { StateCreator } from 'zustand'
import type { EditorState, SelectionSlice } from '../types'
import { parseElementId } from '@/lib/elementHelpers'

export const createSelectionSlice: StateCreator<EditorState, [['zustand/immer', never]], [], SelectionSlice> = (set, get) => ({
  selectedPageId: null,
  selectedSectionId: null,
  selectedElementPath: null,
  isInlineEditing: false,
  isDirty: false,
  isSaving: false,
  isDragging: false,
  previewMode: false,
  activeBreakpoint: 'base',
  activeState: null,
  activeVariableMode: null,
  editingComponentId: null,

  selectPage: (pageId) => set((state) => {
    state.selectedPageId = pageId
    state.selectedSectionId = null
    state.selectedElementPath = null
    state.isInlineEditing = false
  }),

  selectSection: (sectionId) => set((state) => {
    state.selectedSectionId = sectionId
    state.selectedElementPath = null
    state.isInlineEditing = false
  }),

  selectElement: (path) => set((state) => {
    state.selectedElementPath = path
    state.isInlineEditing = false
    // Auto-select parent section
    if (path) {
      const parsed = parseElementId(path)
      if (parsed) {
        state.selectedSectionId = parsed.sectionId
      }
    }
  }),

  setInlineEditing: (editing) => set((state) => {
    state.isInlineEditing = editing
  }),

  setIsSaving: (saving) => set((state) => {
    state.isSaving = saving
  }),

  setIsDragging: (dragging) => set((state) => {
    state.isDragging = dragging
  }),

  setPreviewMode: (preview) => set((state) => {
    state.previewMode = preview
    if (preview) {
      state.selectedSectionId = null
      state.selectedElementPath = null
    }
  }),

  setActiveBreakpoint: (breakpointId) => set((state) => {
    state.activeBreakpoint = breakpointId
  }),

  setActiveState: (stateId) => set((state) => {
    state.activeState = stateId
  }),

  setActiveVariableMode: (mode) => set((state) => {
    state.activeVariableMode = mode
  }),

  markClean: () => set((state) => {
    state.isDirty = false
  }),
})
