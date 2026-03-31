import type { EditorState } from '../types'

export const selectSiteConfig = (s: EditorState) => s.siteConfig
export const selectCurrentPage = (s: EditorState) =>
  s.siteConfig?.pages.find(p => p.id === s.selectedPageId) ?? null
export const selectCurrentPageSections = (s: EditorState) =>
  s.siteConfig?.pages.find(p => p.id === s.selectedPageId)?.sections ?? []
export const selectPages = (s: EditorState) => s.siteConfig?.pages ?? []
export const selectClasses = (s: EditorState) => s.siteConfig?.classes ?? []
export const selectComponents = (s: EditorState) => s.siteConfig?.components ?? []
export const selectBrand = (s: EditorState) => s.siteConfig?.brand ?? null
export const selectTagStyles = (s: EditorState) => s.siteConfig?.tagStyles ?? {}
export const selectVariables = (s: EditorState) => s.siteConfig?.variables ?? []
