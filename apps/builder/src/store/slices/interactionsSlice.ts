import type { StateCreator } from 'zustand'
import type { EditorState, InteractionsSlice } from '../types'
import type { AnimationConfig } from '@/types/interactions'

export const createInteractionsSlice: StateCreator<EditorState, [['zustand/immer', never]], [], InteractionsSlice> = (set, get) => ({
  addInteraction: (sectionId, elementPath, config) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section) {
          if (!section.content.__interactions) {
            section.content.__interactions = {}
          }
          const interactions = section.content.__interactions as Record<string, AnimationConfig[]>
          if (!interactions[elementPath]) {
            interactions[elementPath] = []
          }
          interactions[elementPath].push(config)
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  updateInteraction: (sectionId, elementPath, interactionId, updates) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section) {
          const interactions = section.content.__interactions as Record<string, AnimationConfig[]> | undefined
          const list = interactions?.[elementPath]
          if (list) {
            const item = list.find(i => i.id === interactionId)
            if (item) Object.assign(item, updates)
            state.isDirty = true
          }
          break
        }
      }
    })
    get()._pushHistory()
  },

  removeInteraction: (sectionId, elementPath, interactionId) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section) {
          const interactions = section.content.__interactions as Record<string, AnimationConfig[]> | undefined
          if (interactions?.[elementPath]) {
            interactions[elementPath] = interactions[elementPath].filter(i => i.id !== interactionId)
            state.isDirty = true
          }
          break
        }
      }
    })
    get()._pushHistory()
  },

  addCustomPreset: (preset) => {
    set((state) => {
      if (!state.siteConfig) return
      if (!state.siteConfig.customPresets) state.siteConfig.customPresets = []
      state.siteConfig.customPresets.push(preset)
      state.isDirty = true
    })
    get()._pushHistory()
  },

  removeCustomPreset: (presetId) => {
    set((state) => {
      if (!state.siteConfig?.customPresets) return
      state.siteConfig.customPresets = state.siteConfig.customPresets.filter(p => p.id !== presetId)
      state.isDirty = true
    })
    get()._pushHistory()
  },
})
