import type { EditorState } from '../types'

export const selectClassById = (classId: string) => (s: EditorState) =>
  s.siteConfig?.classes?.find(c => c.id === classId) ?? null

export const selectClassByName = (name: string) => (s: EditorState) =>
  s.siteConfig?.classes?.find(c => c.name === name) ?? null

export const selectAllClasses = (s: EditorState) => s.siteConfig?.classes ?? []

export const selectTagStyle = (tag: string) => (s: EditorState) =>
  s.siteConfig?.tagStyles?.[tag as keyof typeof s.siteConfig.tagStyles] ?? null
