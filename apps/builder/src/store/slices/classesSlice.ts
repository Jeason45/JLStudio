import type { StateCreator } from 'zustand'
import type { EditorState, ClassesSlice } from '../types'
import type { CustomElement } from '@/types/elements'
import type { CSSClass, TagStyleKey } from '@/types/classes'
import type { ElementBreakpointStyleMap } from '@/types/breakpoints'
import { findElement } from '../helpers'

export const createClassesSlice: StateCreator<EditorState, [['zustand/immer', never]], [], ClassesSlice> = (set, get) => ({
  // ─── State/Breakpoint Styles ───

  updateClassStateStyles: (classId, stateId, styleUpdates) => {
    set((state) => {
      if (!state.siteConfig?.classes) return
      const cls = state.siteConfig.classes.find(c => c.id === classId)
      if (cls) {
        if (!cls.stateOverrides) cls.stateOverrides = {}
        if (!cls.stateOverrides[stateId]) cls.stateOverrides[stateId] = {}
        for (const [k, v] of Object.entries(styleUpdates)) {
          if (v === undefined) delete (cls.stateOverrides[stateId] as Record<string, unknown>)[k]
          else (cls.stateOverrides[stateId] as Record<string, unknown>)[k] = v
        }
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  resetClassStateProp: (classId, stateId, propKey) => {
    set((state) => {
      if (!state.siteConfig?.classes) return
      const cls = state.siteConfig.classes.find(c => c.id === classId)
      if (cls?.stateOverrides?.[stateId]) {
        delete (cls.stateOverrides[stateId] as Record<string, unknown>)[propKey]
        if (Object.keys(cls.stateOverrides[stateId]!).length === 0) {
          delete cls.stateOverrides[stateId]
        }
        if (Object.keys(cls.stateOverrides).length === 0) {
          cls.stateOverrides = undefined
        }
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  updateClassBreakpointStyles: (classId, breakpointId, styleUpdates) => {
    set((state) => {
      if (!state.siteConfig?.classes) return
      const cls = state.siteConfig.classes.find(c => c.id === classId)
      if (cls) {
        if (!cls.breakpointOverrides) cls.breakpointOverrides = {}
        if (!cls.breakpointOverrides[breakpointId]) cls.breakpointOverrides[breakpointId] = {}
        for (const [k, v] of Object.entries(styleUpdates)) {
          if (v === undefined) delete (cls.breakpointOverrides[breakpointId] as Record<string, unknown>)[k]
          else (cls.breakpointOverrides[breakpointId] as Record<string, unknown>)[k] = v
        }
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  resetClassBreakpointProp: (classId, breakpointId, propKey) => {
    set((state) => {
      if (!state.siteConfig?.classes) return
      const cls = state.siteConfig.classes.find(c => c.id === classId)
      if (cls?.breakpointOverrides?.[breakpointId]) {
        delete (cls.breakpointOverrides[breakpointId] as Record<string, unknown>)[propKey]
        // Clean up empty objects
        if (Object.keys(cls.breakpointOverrides[breakpointId]!).length === 0) {
          delete cls.breakpointOverrides[breakpointId]
        }
        if (Object.keys(cls.breakpointOverrides).length === 0) {
          cls.breakpointOverrides = undefined
        }
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  // ─── CSS Classes CRUD ───

  addClass: (name, styles) => {
    const id = crypto.randomUUID()
    set((state) => {
      if (!state.siteConfig) return
      if (!state.siteConfig.classes) state.siteConfig.classes = []
      state.siteConfig.classes.push({ id, name, styles: styles ?? {} })
      state.isDirty = true
    })
    get()._pushHistory()
    return id
  },

  updateClassStyles: (classId, styleUpdates) => {
    set((state) => {
      if (!state.siteConfig?.classes) return
      const cls = state.siteConfig.classes.find(c => c.id === classId)
      if (cls) {
        for (const [k, v] of Object.entries(styleUpdates)) {
          if (v === undefined) delete (cls.styles as Record<string, unknown>)[k]
          else (cls.styles as Record<string, unknown>)[k] = v
        }
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  renameClass: (classId, newName) => {
    set((state) => {
      if (!state.siteConfig?.classes) return
      const cls = state.siteConfig.classes.find(c => c.id === classId)
      if (cls) {
        cls.name = newName
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  deleteClass: (classId) => {
    set((state) => {
      if (!state.siteConfig) return
      // Remove the class definition
      if (state.siteConfig.classes) {
        state.siteConfig.classes = state.siteConfig.classes.filter(c => c.id !== classId)
      }
      // Remove all references in __elementClasses across all pages/sections
      for (const page of state.siteConfig.pages) {
        for (const section of page.sections) {
          const classes = section.content.__elementClasses as Record<string, string[]> | undefined
          if (classes) {
            for (const path of Object.keys(classes)) {
              classes[path] = classes[path].filter(id => id !== classId)
              if (classes[path].length === 0) delete classes[path]
            }
          }
          // Remove from custom elements
          if (section.elements) {
            const removeFromElements = (elements: CustomElement[]) => {
              for (const el of elements) {
                if (el.classes) {
                  el.classes = el.classes.filter(id => id !== classId)
                  if (el.classes.length === 0) el.classes = undefined
                }
                if (el.children) removeFromElements(el.children)
              }
            }
            removeFromElements(section.elements)
          }
        }
      }
      state.isDirty = true
    })
    get()._pushHistory()
  },

  duplicateClass: (classId) => {
    set((state) => {
      if (!state.siteConfig?.classes) return
      const cls = state.siteConfig.classes.find(c => c.id === classId)
      if (!cls) return
      const clone: CSSClass = {
        id: crypto.randomUUID(),
        name: `${cls.name}-copy`,
        styles: JSON.parse(JSON.stringify(cls.styles)),
      }
      state.siteConfig.classes.push(clone)
      state.isDirty = true
    })
    get()._pushHistory()
  },

  reorderClasses: (fromIndex, toIndex) => {
    set((state) => {
      if (!state.siteConfig?.classes) return
      const arr = state.siteConfig.classes
      if (fromIndex < 0 || fromIndex >= arr.length || toIndex < 0 || toIndex >= arr.length) return
      const [moved] = arr.splice(fromIndex, 1)
      arr.splice(toIndex, 0, moved)
      state.isDirty = true
    })
    get()._pushHistory()
  },

  // ─── Linking element <-> classes ───

  assignClassToElement: (sectionId, contentPath, classId) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section) {
          if (!section.content.__elementClasses) {
            section.content.__elementClasses = {}
          }
          const classes = section.content.__elementClasses as Record<string, string[]>
          if (!classes[contentPath]) classes[contentPath] = []
          if (!classes[contentPath].includes(classId)) {
            classes[contentPath].push(classId)
          }
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  removeClassFromElement: (sectionId, contentPath, classId) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section) {
          const classes = section.content.__elementClasses as Record<string, string[]> | undefined
          if (classes?.[contentPath]) {
            classes[contentPath] = classes[contentPath].filter(id => id !== classId)
            if (classes[contentPath].length === 0) delete classes[contentPath]
          }
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  reorderElementClasses: (sectionId, contentPath, classIds) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section) {
          if (!section.content.__elementClasses) {
            section.content.__elementClasses = {}
          }
          (section.content.__elementClasses as Record<string, string[]>)[contentPath] = classIds
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  assignClassToCustomElement: (sectionId, elementId, classId) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section?.elements) {
          const el = findElement(section.elements, elementId)
          if (el) {
            if (!el.classes) el.classes = []
            if (!el.classes.includes(classId)) {
              el.classes.push(classId)
            }
            state.isDirty = true
          }
          break
        }
      }
    })
    get()._pushHistory()
  },

  removeClassFromCustomElement: (sectionId, elementId, classId) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section?.elements) {
          const el = findElement(section.elements, elementId)
          if (el?.classes) {
            el.classes = el.classes.filter(id => id !== classId)
            if (el.classes.length === 0) el.classes = undefined
            state.isDirty = true
          }
          break
        }
      }
    })
    get()._pushHistory()
  },

  // ─── Tag Styles ───

  updateTagStyle: (tag, styleUpdates) => {
    set((state) => {
      if (!state.siteConfig) return
      if (!state.siteConfig.tagStyles) state.siteConfig.tagStyles = {}
      const existing = state.siteConfig.tagStyles[tag] ?? {}
      state.siteConfig.tagStyles[tag] = { ...existing, ...styleUpdates }
      state.isDirty = true
    })
    get()._pushHistory()
  },

  resetTagStyle: (tag) => {
    set((state) => {
      if (!state.siteConfig?.tagStyles) return
      delete state.siteConfig.tagStyles[tag]
      state.isDirty = true
    })
    get()._pushHistory()
  },

  // ─── Class Library Import ───

  importClassPreset: (presetId) => {
    const { getPresetById } = require('@/data/classLibrary')
    const preset = getPresetById(presetId)
    if (!preset) return null

    // Check if a class with same name already exists
    const existing = get().siteConfig?.classes?.find(c => c.name === preset.name)
    if (existing) return existing.id

    const newId = crypto.randomUUID()
    set((state) => {
      if (!state.siteConfig) return
      if (!state.siteConfig.classes) state.siteConfig.classes = []
      state.siteConfig.classes.push({
        id: newId,
        name: preset.name,
        styles: JSON.parse(JSON.stringify(preset.styles)),
        ...(preset.stateOverrides && { stateOverrides: JSON.parse(JSON.stringify(preset.stateOverrides)) }),
        ...(preset.breakpointOverrides && { breakpointOverrides: JSON.parse(JSON.stringify(preset.breakpointOverrides)) }),
      })
      state.isDirty = true
    })
    get()._pushHistory()
    return newId
  },

  importClassCollection: (collectionId) => {
    const { getCollectionById } = require('@/data/classLibrary')
    const collection = getCollectionById(collectionId)
    if (!collection) return []

    const importedIds: string[] = []
    set((state) => {
      if (!state.siteConfig) return
      if (!state.siteConfig.classes) state.siteConfig.classes = []

      for (const preset of collection.presets) {
        const existing = state.siteConfig.classes.find(c => c.name === preset.name)
        if (existing) {
          importedIds.push(existing.id)
          continue
        }
        const newId = crypto.randomUUID()
        state.siteConfig.classes.push({
          id: newId,
          name: preset.name,
          styles: JSON.parse(JSON.stringify(preset.styles)),
          ...(preset.stateOverrides && { stateOverrides: JSON.parse(JSON.stringify(preset.stateOverrides)) }),
          ...(preset.breakpointOverrides && { breakpointOverrides: JSON.parse(JSON.stringify(preset.breakpointOverrides)) }),
        })
        importedIds.push(newId)
      }
      state.isDirty = true
    })
    get()._pushHistory()
    return importedIds
  },
})
