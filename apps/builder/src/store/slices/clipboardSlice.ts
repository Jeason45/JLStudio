import type { StateCreator } from 'zustand'
import type { EditorState, ClipboardSlice } from '../types'
import type { SectionConfig } from '@/types/site'
import type { ElementStyleOverride } from '@/types/elements'
import { parseElementId } from '@/lib/elementHelpers'

export const createClipboardSlice: StateCreator<EditorState, [['zustand/immer', never]], [], ClipboardSlice> = (set, get) => ({
  clipboard: null,

  duplicateSection: (pageId, sectionId) => {
    const state = get()
    if (!state.siteConfig) return
    const page = state.siteConfig.pages.find(p => p.id === pageId)
    if (!page) return
    const idx = page.sections.findIndex(s => s.id === sectionId)
    if (idx === -1) return
    const clone = JSON.parse(JSON.stringify(page.sections[idx])) as SectionConfig
    clone.id = crypto.randomUUID()
    state.addSection(pageId, clone, idx + 1)
    set((s) => { s.selectedSectionId = clone.id })
  },

  deleteSelected: () => {
    const state = get()
    if (state.selectedElementPath) {
      const parsed = parseElementId(state.selectedElementPath)
      if (parsed) {
        const isCustomElement = parsed.contentPath.startsWith('__el.')
        if (isCustomElement) {
          const customElementId = parsed.contentPath.replace('__el.', '')
          state.removeCustomElement(parsed.sectionId, customElementId)
          set((s) => { s.selectedElementPath = null })
        } else {
          // Delete element style overrides for built-in section elements
          set((s) => {
            if (!s.siteConfig) return
            for (const page of s.siteConfig.pages) {
              const section = page.sections.find(sec => sec.id === parsed.sectionId)
              if (section) {
                const styles = section.content.__elementStyles as Record<string, unknown> | undefined
                if (styles) delete styles[parsed.contentPath]
                s.isDirty = true
                break
              }
            }
            s.selectedElementPath = null
          })
          get()._pushHistory()
        }
      }
    } else if (state.selectedSectionId && state.selectedPageId) {
      state.removeSection(state.selectedPageId, state.selectedSectionId)
      set((s) => { s.selectedSectionId = null })
    }
  },

  copyElement: () => {
    const state = get()
    if (state.selectedElementPath) {
      const parsed = parseElementId(state.selectedElementPath)
      if (!parsed || !state.siteConfig) return
      const section = state.siteConfig.pages.flatMap(p => p.sections).find(s => s.id === parsed.sectionId)
      if (!section) return
      const styles = (section.content.__elementStyles as Record<string, Record<string, unknown>> | undefined)?.[parsed.contentPath]
      set((s) => {
        s.clipboard = {
          type: 'element',
          data: parsed,
          styleData: styles ? JSON.parse(JSON.stringify(styles)) : undefined,
        }
      })
    } else if (state.selectedSectionId && state.siteConfig) {
      const section = state.siteConfig.pages.flatMap(p => p.sections).find(s => s.id === state.selectedSectionId)
      if (section) {
        set((s) => {
          s.clipboard = {
            type: 'section',
            data: JSON.parse(JSON.stringify(section)),
          }
        })
      }
    }
  },

  pasteElement: () => {
    const state = get()
    if (!state.clipboard || !state.selectedPageId) return
    if (state.clipboard.type === 'section') {
      const clone = JSON.parse(JSON.stringify(state.clipboard.data)) as SectionConfig
      clone.id = crypto.randomUUID()
      state.addSection(state.selectedPageId, clone)
    }
  },

  copyElementStyle: () => {
    const state = get()
    if (!state.selectedElementPath || !state.siteConfig) return
    const parsed = parseElementId(state.selectedElementPath)
    if (!parsed) return
    const section = state.siteConfig.pages.flatMap(p => p.sections).find(s => s.id === parsed.sectionId)
    if (!section) return
    const styles = (section.content.__elementStyles as Record<string, Record<string, unknown>> | undefined)?.[parsed.contentPath]
    if (styles) {
      set((s) => {
        s.clipboard = { type: 'element', data: null, styleData: JSON.parse(JSON.stringify(styles)) }
      })
    }
  },

  pasteElementStyle: () => {
    const state = get()
    if (!state.selectedElementPath || !state.clipboard?.styleData) return
    const parsed = parseElementId(state.selectedElementPath)
    if (!parsed) return
    state.updateElementStyle(parsed.sectionId, parsed.contentPath, state.clipboard.styleData as Partial<ElementStyleOverride>)
  },

  navigateSection: (direction) => {
    set((state) => {
      if (!state.siteConfig || !state.selectedPageId) return
      const page = state.siteConfig.pages.find(p => p.id === state.selectedPageId)
      if (!page || page.sections.length === 0) return
      const currentIdx = page.sections.findIndex(s => s.id === state.selectedSectionId)
      let newIdx: number
      if (currentIdx === -1) {
        newIdx = direction === 'down' ? 0 : page.sections.length - 1
      } else {
        newIdx = direction === 'down'
          ? Math.min(currentIdx + 1, page.sections.length - 1)
          : Math.max(currentIdx - 1, 0)
      }
      state.selectedSectionId = page.sections[newIdx].id
      state.selectedElementPath = null
    })
  },
})
