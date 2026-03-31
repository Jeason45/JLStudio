import type { EditorState } from '../types'

export const selectAllComponents = (s: EditorState) => s.siteConfig?.components ?? []

export const selectComponentById = (componentId: string) => (s: EditorState) =>
  s.siteConfig?.components?.find(c => c.id === componentId) ?? null

export const selectEditingComponent = (s: EditorState) => {
  if (!s.editingComponentId || !s.siteConfig?.components) return null
  return s.siteConfig.components.find(c => c.id === s.editingComponentId) ?? null
}
