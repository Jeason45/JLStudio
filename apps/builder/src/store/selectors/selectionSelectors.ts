import type { EditorState } from '../types'

export const selectSelectedPageId = (s: EditorState) => s.selectedPageId
export const selectSelectedSectionId = (s: EditorState) => s.selectedSectionId
export const selectSelectedElementPath = (s: EditorState) => s.selectedElementPath
export const selectIsInlineEditing = (s: EditorState) => s.isInlineEditing
export const selectIsDirty = (s: EditorState) => s.isDirty
export const selectIsSaving = (s: EditorState) => s.isSaving
export const selectIsDragging = (s: EditorState) => s.isDragging
export const selectPreviewMode = (s: EditorState) => s.previewMode
export const selectActiveBreakpoint = (s: EditorState) => s.activeBreakpoint
export const selectActiveState = (s: EditorState) => s.activeState
export const selectActiveVariableMode = (s: EditorState) => s.activeVariableMode
export const selectEditingComponentId = (s: EditorState) => s.editingComponentId
export const selectSelectedElementPaths = (s: EditorState) => s.selectedElementPaths
