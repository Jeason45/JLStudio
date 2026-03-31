import type { StateCreator } from 'zustand'
import type { EditorState, CmsSlice } from '../types'

export const createCmsSlice: StateCreator<EditorState, [['zustand/immer', never]], [], CmsSlice> = (set, get) => ({
  cmsCollections: [],
  cmsActiveCollectionId: null,
  cmsItems: [],

  setCmsCollections: (collections) => set((state) => { state.cmsCollections = collections }),
  setCmsActiveCollection: (id) => set((state) => { state.cmsActiveCollectionId = id }),
  setCmsItems: (items) => set((state) => { state.cmsItems = items }),

  setCmsListBinding: (sectionId, binding) => {
    set((state) => {
      const section = state.siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
      if (section) {
        section.content.__cmsBinding = binding
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  setCmsFieldBinding: (sectionId, contentPath, binding) => {
    set((state) => {
      const section = state.siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
      if (section) {
        if (!section.content.__fieldBindings) section.content.__fieldBindings = {}
        section.content.__fieldBindings[contentPath] = binding
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  setCmsVisibility: (sectionId, contentPath, rule) => {
    set((state) => {
      const section = state.siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
      if (section) {
        if (!section.content.__cmsVisibility) section.content.__cmsVisibility = {}
        section.content.__cmsVisibility[contentPath] = rule
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  setPageCollectionId: (pageId, collectionId) => {
    set((state) => {
      const page = state.siteConfig?.pages.find(p => p.id === pageId)
      if (page) {
        page.collectionId = collectionId
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  updateCmsListSort: (sectionId, sortField, sortDirection) => {
    set((state) => {
      const section = state.siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
      if (section?.content.__cmsBinding) {
        section.content.__cmsBinding.sortField = sortField
        section.content.__cmsBinding.sortDirection = sortDirection
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  updateCmsListFilters: (sectionId, filters) => {
    set((state) => {
      const section = state.siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
      if (section?.content.__cmsBinding) {
        section.content.__cmsBinding.filters = filters
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  updateCmsListLimit: (sectionId, limit) => {
    set((state) => {
      const section = state.siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
      if (section?.content.__cmsBinding) {
        section.content.__cmsBinding.limit = limit
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },

  updateCmsListOffset: (sectionId, offset) => {
    set((state) => {
      const section = state.siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
      if (section?.content.__cmsBinding) {
        section.content.__cmsBinding.offset = offset
        state.isDirty = true
      }
    })
    get()._pushHistory()
  },
})
