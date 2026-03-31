import type { StateCreator } from 'zustand'
import type { EditorState, CustomElementsSlice } from '../types'
import type { CustomElement } from '@/types/elements'
import { findElement, removeFromTree } from '../helpers'

export const createCustomElementsSlice: StateCreator<EditorState, [['zustand/immer', never]], [], CustomElementsSlice> = (set, get) => ({
  addCustomElement: (sectionId, element, parentId, index) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section) {
          if (!section.elements) section.elements = []
          if (parentId) {
            const parent = findElement(section.elements, parentId)
            if (parent) {
              if (!parent.children) parent.children = []
              if (index !== undefined) {
                parent.children.splice(index, 0, element)
              } else {
                parent.children.push(element)
              }
            }
          } else {
            if (index !== undefined) {
              section.elements.splice(index, 0, element)
            } else {
              section.elements.push(element)
            }
          }
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  removeCustomElement: (sectionId, elementId) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section && section.elements) {
          section.elements = removeFromTree(section.elements, elementId)
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  moveCustomElement: (sectionId, elementId, newParentId, index) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section && section.elements) {
          const el = findElement(section.elements, elementId)
          if (!el) break
          const clone = JSON.parse(JSON.stringify(el)) as CustomElement
          section.elements = removeFromTree(section.elements, elementId)
          if (newParentId) {
            const parent = findElement(section.elements, newParentId)
            if (parent) {
              if (!parent.children) parent.children = []
              parent.children.splice(index, 0, clone)
            }
          } else {
            section.elements.splice(index, 0, clone)
          }
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  updateCustomElement: (sectionId, elementId, updates) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section && section.elements) {
          const el = findElement(section.elements, elementId)
          if (el) {
            Object.assign(el, updates)
            state.isDirty = true
          }
          break
        }
      }
    })
    get()._pushHistory()
  },

  updateCustomElementStyle: (sectionId, elementId, styleUpdates) => {
    set((state) => {
      if (!state.siteConfig) return
      const bp = state.activeBreakpoint
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section && section.elements) {
          const el = findElement(section.elements, elementId)
          if (el) {
            if (bp && bp !== 'base') {
              // Write to breakpoint-specific overrides
              if (!el.breakpointStyles) el.breakpointStyles = {}
              if (!el.breakpointStyles[bp]) el.breakpointStyles[bp] = {}
              const target = el.breakpointStyles[bp] as Record<string, unknown>
              for (const [k, v] of Object.entries(styleUpdates)) {
                if (v === undefined) delete target[k]
                else target[k] = v
              }
            } else {
              // Write to base styles
              for (const [k, v] of Object.entries(styleUpdates)) {
                if (v === undefined) delete (el.style as Record<string, unknown>)[k]
                else (el.style as Record<string, unknown>)[k] = v
              }
            }
            state.isDirty = true
          }
          break
        }
      }
    })
    get()._pushHistory()
  },
})
