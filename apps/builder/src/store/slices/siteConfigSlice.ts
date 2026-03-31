import type { StateCreator } from 'zustand'
import type { EditorState, SiteConfigSlice } from '../types'
import type { PageConfig, SectionConfig } from '@/types/site'
import type { ElementBreakpointStyleMap } from '@/types/breakpoints'
import { setByPath, parseElementId } from '@/lib/elementHelpers'

export const createSiteConfigSlice: StateCreator<EditorState, [['zustand/immer', never]], [], SiteConfigSlice> = (set, get) => ({
  siteConfig: null,

  setSiteConfig: (config) => {
    // Migrate old section types to new merged types
    const SECTION_MIGRATION: Record<string, { type: string; variant: string }> = {
      'video-hero': { type: 'hero', variant: 'video' },
      columns: { type: 'features', variant: 'columns' },
      banner: { type: 'cta', variant: 'banner' },
      'review-stars': { type: 'stats', variant: 'review-stars' },
      press: { type: 'logos', variant: 'press-quotes' },
      waitlist: { type: 'newsletter', variant: 'waitlist' },
      countdown: { type: 'cta', variant: 'countdown' },
      'map-embed': { type: 'contact', variant: 'with-map' },
    }
    // Migrate old header/footer variants to new universe-based names
    const VARIANT_MIGRATION: Record<string, Record<string, string>> = {
      'site-header': { default: 'startup', transparent: 'startup' },
      'site-footer': { '4-cols': 'startup', '3-cols': 'startup' },
      hero: { centered: 'startup', 'split-left': 'corporate', 'split-right': 'corporate', 'dark-fullscreen': 'glass', minimal: 'startup', 'with-badge': 'startup', video: 'glass' },
      features: { 'grid-3': 'startup-grid', 'grid-4': 'startup-grid', alternating: 'startup-list', list: 'startup-list', 'cards-large': 'startup-grid', bento: 'startup-bento', columns: 'startup-grid' },
      cta: { centered: 'startup-centered', split: 'startup-split', banner: 'startup-centered', card: 'startup-card', countdown: 'startup-centered' },
      stats: { centered: 'startup-simple', 'with-description': 'startup-cards', 'review-stars': 'review-stars' },
      testimonials: { grid: 'startup-grid', featured: 'startup-featured', carousel: 'startup-marquee', marquee: 'startup-marquee' },
      pricing: { '3-columns': 'startup-columns', '2-columns': 'startup-columns' },
      faq: { accordion: 'startup-accordion', 'two-columns': 'startup-grid' },
      contact: { 'with-info': 'startup-with-info', simple: 'startup-simple', 'with-map': 'startup-with-info' },
      logos: { strip: 'startup-strip', grid: 'startup-grid', 'press-quotes': 'startup-strip' },
      newsletter: { centered: 'startup-centered', split: 'startup-split', waitlist: 'startup-centered' },
      steps: { horizontal: 'startup-horizontal', vertical: 'startup-vertical' },
      timeline: { vertical: 'startup-vertical' },
      team: { grid: 'startup-grid', carousel: 'startup-grid' },
      'blog-grid': { 'grid-3': 'startup-grid', 'grid-2': 'startup-grid' },
      'gallery-grid': { grid: 'startup-grid', masonry: 'startup-masonry', lightbox: 'startup-grid' },
      'image-text': { 'image-right': 'startup-image-right', 'image-left': 'startup-image-left' },
      'product-grid': { 'grid-4': 'startup-grid', 'grid-3': 'startup-grid' },
      'comparison-table': { table: 'startup-table' },
    }

    for (const page of config.pages) {
      for (const section of page.sections) {
        const migration = SECTION_MIGRATION[section.type]
        if (migration) {
          section.type = migration.type
          section.variant = migration.variant
        }
        // Migrate old variants
        const variantMap = VARIANT_MIGRATION[section.type]
        if (variantMap && section.variant && variantMap[section.variant]) {
          section.variant = variantMap[section.variant]
        }
      }
    }

    // Migrate: ensure classes and tagStyles exist
    if (!config.classes) config.classes = []
    if (!config.tagStyles) config.tagStyles = {}

    set((state) => {
      state.siteConfig = config
      state.selectedPageId = config.pages[0]?.id ?? null
    })
    get()._pushHistory()
  },

  updateElementContent: (sectionId, contentPath, value) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section) {
          setByPath(section.content as Record<string, unknown>, contentPath, value)
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  updateElementStyle: (sectionId, contentPath, styleUpdates) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section) {
          if (!section.content.__elementStyles) {
            section.content.__elementStyles = {}
          }
          const styles = section.content.__elementStyles as Record<string, Record<string, unknown>>
          if (!styles[contentPath]) {
            styles[contentPath] = {}
          }
          for (const [k, v] of Object.entries(styleUpdates)) {
            if (v === undefined) delete styles[contentPath][k]
            else styles[contentPath][k] = v
          }
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  updateElementSettings: (sectionId, contentPath, settings) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section) {
          if (!section.content.__elementSettings) {
            section.content.__elementSettings = {}
          }
          const allSettings = section.content.__elementSettings as Record<string, Record<string, unknown>>
          if (!allSettings[contentPath]) {
            allSettings[contentPath] = {}
          }
          Object.assign(allSettings[contentPath], settings)
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  // ─── Section CRUD ───

  updateSection: (sectionId, updates) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section) {
          Object.assign(section, updates)
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  addSection: (pageId, section, index) => {
    set((state) => {
      if (!state.siteConfig) return
      const page = state.siteConfig.pages.find(p => p.id === pageId)
      if (!page) return
      if (index !== undefined) {
        page.sections.splice(index, 0, section)
      } else {
        page.sections.push(section)
      }
      state.isDirty = true
    })
    get()._pushHistory()
  },

  removeSection: (pageId, sectionId) => {
    set((state) => {
      if (!state.siteConfig) return
      const page = state.siteConfig.pages.find(p => p.id === pageId)
      if (!page) return
      page.sections = page.sections.filter(s => s.id !== sectionId)
      state.isDirty = true
    })
    get()._pushHistory()
  },

  moveSection: (pageId, fromIndex, toIndex) => {
    set((state) => {
      if (!state.siteConfig) return
      const page = state.siteConfig.pages.find(p => p.id === pageId)
      if (!page) return
      const [section] = page.sections.splice(fromIndex, 1)
      page.sections.splice(toIndex, 0, section)
      state.isDirty = true
    })
    get()._pushHistory()
  },

  updateBrand: (updates) => {
    set((state) => {
      if (!state.siteConfig) return
      Object.assign(state.siteConfig.brand, updates)
      state.isDirty = true
    })
    get()._pushHistory()
  },

  updatePage: (pageId, updates) => {
    set((state) => {
      if (!state.siteConfig) return
      const page = state.siteConfig.pages.find(p => p.id === pageId)
      if (!page) return
      Object.assign(page, updates)
      state.isDirty = true
    })
    get()._pushHistory()
  },

  // ─── Pages CRUD ───

  addPage: (title, slug) => {
    set((state) => {
      if (!state.siteConfig) return
      const page: PageConfig = {
        id: `page-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        slug,
        title,
        seo: { title, description: '' },
        sections: [],
      }
      state.siteConfig.pages.push(page)
      state.selectedPageId = page.id
      state.isDirty = true
    })
    get()._pushHistory()
  },

  deletePage: (pageId) => {
    set((state) => {
      if (!state.siteConfig || state.siteConfig.pages.length <= 1) return
      state.siteConfig.pages = state.siteConfig.pages.filter(p => p.id !== pageId)
      if (state.selectedPageId === pageId) {
        state.selectedPageId = state.siteConfig.pages[0]?.id ?? null
      }
      state.isDirty = true
    })
    get()._pushHistory()
  },

  duplicatePage: (pageId) => {
    set((state) => {
      if (!state.siteConfig) return
      const page = state.siteConfig.pages.find(p => p.id === pageId)
      if (!page) return
      const clone = JSON.parse(JSON.stringify(page)) as PageConfig
      clone.id = `page-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      clone.slug = `${page.slug}-copy`
      clone.title = `${page.title} (copy)`
      // give new ids to all sections
      for (const section of clone.sections) {
        section.id = `section-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      }
      const idx = state.siteConfig.pages.findIndex(p => p.id === pageId)
      state.siteConfig.pages.splice(idx + 1, 0, clone)
      state.selectedPageId = clone.id
      state.isDirty = true
    })
    get()._pushHistory()
  },

  reorderPages: (fromIndex, toIndex) => {
    set((state) => {
      if (!state.siteConfig) return
      const [page] = state.siteConfig.pages.splice(fromIndex, 1)
      state.siteConfig.pages.splice(toIndex, 0, page)
      state.isDirty = true
    })
    get()._pushHistory()
  },

  // ─── Breakpoint Styles ───

  updateElementBreakpointStyle: (sectionId, contentPath, breakpointId, styleUpdates) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section) {
          if (!section.content.__elementBreakpointStyles) {
            section.content.__elementBreakpointStyles = {}
          }
          const bpStyles = section.content.__elementBreakpointStyles as ElementBreakpointStyleMap
          if (!bpStyles[contentPath]) bpStyles[contentPath] = {}
          if (!bpStyles[contentPath][breakpointId]) bpStyles[contentPath][breakpointId] = {}
          for (const [k, v] of Object.entries(styleUpdates)) {
            if (v === undefined) delete (bpStyles[contentPath][breakpointId] as Record<string, unknown>)[k]
            else (bpStyles[contentPath][breakpointId] as Record<string, unknown>)[k] = v
          }
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  resetElementBreakpointProp: (sectionId, contentPath, breakpointId, propKey) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section) {
          const bpStyles = section.content.__elementBreakpointStyles as ElementBreakpointStyleMap | undefined
          if (bpStyles?.[contentPath]?.[breakpointId]) {
            delete (bpStyles[contentPath][breakpointId] as Record<string, unknown>)[propKey]
            if (Object.keys(bpStyles[contentPath][breakpointId]).length === 0) {
              delete bpStyles[contentPath][breakpointId]
            }
            if (Object.keys(bpStyles[contentPath]).length === 0) {
              delete bpStyles[contentPath]
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
