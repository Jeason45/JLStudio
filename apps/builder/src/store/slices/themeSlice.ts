import type { StateCreator } from 'zustand'
import type { EditorState, ThemeSlice } from '../types'

export const createThemeSlice: StateCreator<EditorState, [['zustand/immer', never]], [], ThemeSlice> = (set, get) => ({
  applyColorPalette: (colors) => {
    set((state) => {
      if (!state.siteConfig) return
      state.siteConfig.brand.colors = colors
      state.isDirty = true
    })
    get()._pushHistory()
  },

  applyTypography: (heading, body, size) => {
    set((state) => {
      if (!state.siteConfig) return
      state.siteConfig.brand.typography = { heading, body, size }
      state.isDirty = true
    })
    get()._pushHistory()
  },

  applyTagStylePreset: (tagStyles, borderRadius, spacing) => {
    set((state) => {
      if (!state.siteConfig) return
      state.siteConfig.tagStyles = tagStyles
      if (borderRadius !== undefined) state.siteConfig.brand.borderRadius = borderRadius
      if (spacing !== undefined) state.siteConfig.brand.spacing = spacing
      state.isDirty = true
    })
    get()._pushHistory()
  },

  applyFullTheme: (colors, heading, body, size, tagStyles, borderRadius, spacing) => {
    set((state) => {
      if (!state.siteConfig) return
      state.siteConfig.brand.colors = colors
      state.siteConfig.brand.typography = { heading, body, size }
      state.siteConfig.brand.borderRadius = borderRadius
      state.siteConfig.brand.spacing = spacing
      state.siteConfig.tagStyles = tagStyles
      state.isDirty = true
    })
    get()._pushHistory()
  },
})
