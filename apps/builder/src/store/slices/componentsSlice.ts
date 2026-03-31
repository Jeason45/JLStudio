import type { StateCreator } from 'zustand'
import type { EditorState, ComponentsSlice } from '../types'
import type { ComponentDefinition, SectionConfig } from '@/types/site'
import type { ComponentInstanceData, ComponentPropDef, ComponentSlotDef, ComponentVariantDef } from '@/types/components'
import { syncInstanceFromMaster } from '@/lib/componentResolver'

export const createComponentsSlice: StateCreator<EditorState, [['zustand/immer', never]], [], ComponentsSlice> = (set, get) => ({
  createComponentFromSection: (sectionId, name) => {
    set((state) => {
      if (!state.siteConfig) return
      const section = state.siteConfig.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
      if (!section) return
      if (!state.siteConfig.components) state.siteConfig.components = []
      const comp: ComponentDefinition = {
        id: `comp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name,
        sectionSnapshot: JSON.parse(JSON.stringify(section)),
        instanceCount: 0,
        createdAt: new Date().toISOString(),
      }
      state.siteConfig.components.push(comp)
      state.isDirty = true
    })
    get()._pushHistory()
  },

  instantiateComponent: (componentId) => {
    const state = get()
    if (!state.siteConfig || !state.selectedPageId) return
    const comp = state.siteConfig.components?.find(c => c.id === componentId)
    if (!comp) return
    const clone = JSON.parse(JSON.stringify(comp.sectionSnapshot)) as SectionConfig
    clone.id = `section-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const instanceData: ComponentInstanceData = {
      componentId,
      propOverrides: {},
      slotContent: {},
    }
    clone.__componentInstance = instanceData
    // Single atomic mutation: add section + increment instanceCount
    set((s) => {
      if (!s.siteConfig) return
      const page = s.siteConfig.pages.find(p => p.id === s.selectedPageId)
      if (page) page.sections.push(clone)
      const c = s.siteConfig.components?.find(x => x.id === componentId)
      if (c) c.instanceCount++
      s.selectedSectionId = clone.id
      s.isDirty = true
    })
    get()._pushHistory()
  },

  deleteComponent: (componentId) => {
    set((state) => {
      if (!state.siteConfig?.components) return
      // Auto-unlink all instances
      for (const page of state.siteConfig.pages) {
        for (const section of page.sections) {
          if (section.__componentInstance?.componentId === componentId) {
            delete section.__componentInstance
          }
        }
      }
      state.siteConfig.components = state.siteConfig.components.filter(c => c.id !== componentId)
      state.isDirty = true
    })
    get()._pushHistory()
  },

  updateComponent: (componentId, updates) => {
    set((state) => {
      if (!state.siteConfig?.components) return
      const comp = state.siteConfig.components.find(c => c.id === componentId)
      if (comp) {
        Object.assign(comp, updates)
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  enterComponentEditor: (componentId) => {
    set((state) => {
      state.editingComponentId = componentId
      state.selectedSectionId = null
      state.selectedElementPath = null
    })
  },

  exitComponentEditor: () => {
    const compId = get().editingComponentId
    set((state) => {
      state.editingComponentId = null
    })
    if (compId) get().syncMasterToInstances(compId)
  },

  updateComponentMaster: (componentId, snapshotUpdates) => {
    set((state) => {
      if (!state.siteConfig?.components) return
      const comp = state.siteConfig.components.find(c => c.id === componentId)
      if (comp) {
        Object.assign(comp.sectionSnapshot, snapshotUpdates)
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  syncMasterToInstances: (componentId) => {
    set((state) => {
      if (!state.siteConfig?.components) return
      const comp = state.siteConfig.components.find(c => c.id === componentId)
      if (!comp) return
      for (const page of state.siteConfig.pages) {
        for (let i = 0; i < page.sections.length; i++) {
          const section = page.sections[i]
          if (section.__componentInstance?.componentId === componentId && !section.__componentInstance.isUnlinked) {
            const synced = syncInstanceFromMaster(JSON.parse(JSON.stringify(section)), comp)
            // Preserve id, visible, __componentInstance
            synced.id = section.id
            synced.visible = section.visible
            synced.__componentInstance = section.__componentInstance
            page.sections[i] = synced as typeof section
          }
        }
      }
      state.isDirty = true
    })
    get()._pushHistory()
  },

  // ─── Component Props ───

  addComponentProp: (componentId, prop) => {
    set((state) => {
      if (!state.siteConfig?.components) return
      const comp = state.siteConfig.components.find(c => c.id === componentId)
      if (!comp) return
      if (!comp.props) comp.props = []
      comp.props.push(prop)
      state.isDirty = true
    })
    get()._pushHistory()
  },

  updateComponentProp: (componentId, propId, updates) => {
    set((state) => {
      if (!state.siteConfig?.components) return
      const comp = state.siteConfig.components.find(c => c.id === componentId)
      const prop = comp?.props?.find(p => p.id === propId)
      if (prop) {
        Object.assign(prop, updates)
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  removeComponentProp: (componentId, propId) => {
    set((state) => {
      if (!state.siteConfig?.components) return
      const comp = state.siteConfig.components.find(c => c.id === componentId)
      if (comp?.props) {
        comp.props = comp.props.filter(p => p.id !== propId)
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  setInstancePropOverride: (sectionId, propId, value) => {
    set((state) => {
      if (!state.siteConfig) return
      const section = state.siteConfig.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
      if (section?.__componentInstance) {
        section.__componentInstance.propOverrides[propId] = value
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  resetInstanceProp: (sectionId, propId) => {
    set((state) => {
      if (!state.siteConfig) return
      const section = state.siteConfig.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
      if (section?.__componentInstance) {
        delete section.__componentInstance.propOverrides[propId]
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  // ─── Component Slots ───

  addComponentSlot: (componentId, slot) => {
    set((state) => {
      if (!state.siteConfig?.components) return
      const comp = state.siteConfig.components.find(c => c.id === componentId)
      if (!comp) return
      if (!comp.slots) comp.slots = []
      comp.slots.push(slot)
      state.isDirty = true
    })
    get()._pushHistory()
  },

  removeComponentSlot: (componentId, slotId) => {
    set((state) => {
      if (!state.siteConfig?.components) return
      const comp = state.siteConfig.components.find(c => c.id === componentId)
      if (comp?.slots) {
        comp.slots = comp.slots.filter(s => s.id !== slotId)
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  // ─── Component Variants ───

  addComponentVariant: (componentId, variant) => {
    set((state) => {
      if (!state.siteConfig?.components) return
      const comp = state.siteConfig.components.find(c => c.id === componentId)
      if (!comp) return
      if (!comp.variants) comp.variants = []
      comp.variants.push(variant)
      state.isDirty = true
    })
    get()._pushHistory()
  },

  updateComponentVariant: (componentId, variantId, updates) => {
    set((state) => {
      if (!state.siteConfig?.components) return
      const comp = state.siteConfig.components.find(c => c.id === componentId)
      const variant = comp?.variants?.find(v => v.id === variantId)
      if (variant) {
        Object.assign(variant, updates)
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  removeComponentVariant: (componentId, variantId) => {
    set((state) => {
      if (!state.siteConfig?.components) return
      const comp = state.siteConfig.components.find(c => c.id === componentId)
      if (comp?.variants) {
        comp.variants = comp.variants.filter(v => v.id !== variantId)
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  setInstanceVariant: (sectionId, variantId) => {
    set((state) => {
      if (!state.siteConfig) return
      const section = state.siteConfig.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
      if (section?.__componentInstance) {
        section.__componentInstance.variantId = variantId
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  // ─── Instance Management ───

  unlinkInstance: (sectionId) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section?.__componentInstance) {
          // Decrement instance count
          const comp = state.siteConfig.components?.find(c => c.id === section.__componentInstance!.componentId)
          if (comp && comp.instanceCount > 0) comp.instanceCount--
          delete section.__componentInstance
          state.isDirty = true
          return
        }
      }
    })
    get()._pushHistory()
  },

  resetInstanceToMaster: (sectionId) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section?.__componentInstance) {
          section.__componentInstance.propOverrides = {}
          section.__componentInstance.slotContent = {}
          section.__componentInstance.variantId = undefined
          state.isDirty = true
          return
        }
      }
    })
    // Sync from master to apply reset
    const section = get().siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
    if (section?.__componentInstance) {
      get().syncMasterToInstances(section.__componentInstance.componentId)
    }
    get()._pushHistory()
  },
})
