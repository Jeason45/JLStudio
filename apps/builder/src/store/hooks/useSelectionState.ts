import { useShallow } from 'zustand/react/shallow'
import { useEditorStore } from '../createEditorStore'

export const useSelection = () => useEditorStore(useShallow(s => ({
  selectedPageId: s.selectedPageId,
  selectedSectionId: s.selectedSectionId,
  selectedElementPath: s.selectedElementPath,
  selectedElementPaths: s.selectedElementPaths,
})))

export const useSelectionActions = () => useEditorStore(useShallow(s => ({
  selectPage: s.selectPage,
  selectSection: s.selectSection,
  selectElement: s.selectElement,
  selectElements: s.selectElements,
  addToSelection: s.addToSelection,
  removeFromSelection: s.removeFromSelection,
  clearSelection: s.clearSelection,
})))

export const useEditorFlags = () => useEditorStore(useShallow(s => ({
  isDirty: s.isDirty,
  isSaving: s.isSaving,
  isDragging: s.isDragging,
  previewMode: s.previewMode,
  isInlineEditing: s.isInlineEditing,
  activeBreakpoint: s.activeBreakpoint,
  activeState: s.activeState,
  editingComponentId: s.editingComponentId,
})))
