import type { EditorState } from '../types'

export const selectCmsCollections = (s: EditorState) => s.cmsCollections
export const selectCmsActiveCollectionId = (s: EditorState) => s.cmsActiveCollectionId
export const selectCmsItems = (s: EditorState) => s.cmsItems

export const selectCmsActiveCollection = (s: EditorState) =>
  s.cmsCollections.find(c => c.id === s.cmsActiveCollectionId) ?? null
