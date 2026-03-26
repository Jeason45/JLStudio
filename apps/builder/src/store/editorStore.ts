'use client'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { SiteConfig, PageConfig, SectionConfig, ComponentDefinition, CSSVariable } from '@/types/site'
import type { ComponentPropDef, ComponentSlotDef, ComponentVariantDef, ComponentInstanceData } from '@/types/components'
import { syncInstanceFromMaster } from '@/lib/componentResolver'
import type { ElementStyleOverride, CustomElement } from '@/types/elements'
import type { AnimationConfig, TimelineConfig, TimelineTrack, TimelineAction } from '@/types/interactions'
import type { CSSClass, TagStyleKey, TagStyles } from '@/types/classes'
import type { CmsCollection, CmsItem, CmsListBinding, CmsFieldBinding, CmsVisibilityRule, CmsFilter } from '@/types/cms'
import type { Product, ProductCategory, Order } from '@/types/ecommerce'
import type { ElementBreakpointStyleMap } from '@/types/breakpoints'
import { parseElementId, setByPath } from '@/lib/elementHelpers'
import type { CustomFontDef, CustomFontFile } from '@/lib/fonts'

interface ClipboardData {
  type: 'section' | 'element'
  data: unknown
  styleData?: Record<string, unknown>
}

interface EditorState {
  siteConfig: SiteConfig | null
  selectedPageId: string | null
  selectedSectionId: string | null
  selectedElementPath: string | null // format: "sectionId::contentPath"
  isInlineEditing: boolean
  isDirty: boolean
  isSaving: boolean
  isDragging: boolean
  previewMode: boolean
  activeBreakpoint: string
  activeState: string | null
  activeVariableMode: string | null
  history: string[]
  historyIndex: number
  canUndo: boolean
  canRedo: boolean
  clipboard: ClipboardData | null
  // Component editor state
  editingComponentId: string | null
  // Timeline state
  timelineOpen: boolean
  timelinePanelHeight: number
  activeTimelineId: string | null
  scrubberTime: number
  // CMS state (not in history — fetched from API)
  cmsCollections: CmsCollection[]
  cmsActiveCollectionId: string | null
  cmsItems: CmsItem[]
  // E-commerce state (not in history — fetched from API)
  ecommerceProducts: Product[]
  ecommerceCategories: ProductCategory[]
  ecommerceOrders: Order[]
  activeProductId: string | null
  activeOrderId: string | null
  // Canvas viewport (ephemeral, not in history)
  canvasZoom: number
  canvasOffset: { x: number; y: number }
  isPanning: boolean
  showRulers: boolean
  canvasGuides: Array<{ id: string; axis: 'x' | 'y'; position: number }>
  showGrid: boolean
  gridSize: number
  showColumns: boolean
  columnCount: number
  snapEnabled: boolean
  snapToGrid: boolean
  snapToElements: boolean
  snapToGuides: boolean
  // Multi-selection
  selectedElementPaths: string[]
  // Locked elements (ephemeral — prevents selection/editing)
  lockedElements: Set<string>

  setSiteConfig: (config: SiteConfig) => void
  selectPage: (pageId: string) => void
  selectSection: (sectionId: string | null) => void
  selectElement: (path: string | null) => void
  setInlineEditing: (editing: boolean) => void
  updateElementContent: (sectionId: string, contentPath: string, value: unknown) => void
  updateElementStyle: (sectionId: string, contentPath: string, styleUpdates: Partial<ElementStyleOverride>) => void
  updateElementSettings: (sectionId: string, contentPath: string, settings: Record<string, unknown>) => void
  // Clipboard & shortcuts
  duplicateSection: (pageId: string, sectionId: string) => void
  deleteSelected: () => void
  copyElement: () => void
  pasteElement: () => void
  copyElementStyle: () => void
  pasteElementStyle: () => void
  navigateSection: (direction: 'up' | 'down') => void
  // Custom elements CRUD
  addCustomElement: (sectionId: string, element: CustomElement, parentId?: string, index?: number) => void
  removeCustomElement: (sectionId: string, elementId: string) => void
  moveCustomElement: (sectionId: string, elementId: string, newParentId: string | null, index: number) => void
  updateCustomElement: (sectionId: string, elementId: string, updates: Partial<CustomElement>) => void
  updateCustomElementStyle: (sectionId: string, elementId: string, styleUpdates: Partial<CustomElement['style']>) => void
  // Interactions CRUD
  addInteraction: (sectionId: string, elementPath: string, config: AnimationConfig) => void
  updateInteraction: (sectionId: string, elementPath: string, interactionId: string, updates: Partial<AnimationConfig>) => void
  removeInteraction: (sectionId: string, elementPath: string, interactionId: string) => void
  // Custom animation presets
  addCustomPreset: (preset: import('@/types/site').AnimationPresetCustom) => void
  removeCustomPreset: (presetId: string) => void
  // Section CRUD
  updateSection: (sectionId: string, updates: Partial<SectionConfig>) => void
  addSection: (pageId: string, section: SectionConfig, index?: number) => void
  removeSection: (pageId: string, sectionId: string) => void
  moveSection: (pageId: string, fromIndex: number, toIndex: number) => void
  updateBrand: (updates: Partial<SiteConfig['brand']>) => void
  updatePage: (pageId: string, updates: Partial<PageConfig>) => void
  setIsSaving: (saving: boolean) => void
  setIsDragging: (dragging: boolean) => void
  setPreviewMode: (preview: boolean) => void
  setActiveBreakpoint: (breakpointId: string) => void
  setActiveState: (stateId: string | null) => void
  updateClassStateStyles: (classId: string, stateId: string, styleUpdates: Partial<ElementStyleOverride>) => void
  resetClassStateProp: (classId: string, stateId: string, propKey: string) => void
  updateClassBreakpointStyles: (classId: string, breakpointId: string, styleUpdates: Partial<ElementStyleOverride>) => void
  resetClassBreakpointProp: (classId: string, breakpointId: string, propKey: string) => void
  updateElementBreakpointStyle: (sectionId: string, contentPath: string, breakpointId: string, styleUpdates: Partial<ElementStyleOverride>) => void
  resetElementBreakpointProp: (sectionId: string, contentPath: string, breakpointId: string, propKey: string) => void
  // Components CRUD
  createComponentFromSection: (sectionId: string, name: string) => void
  instantiateComponent: (componentId: string) => void
  deleteComponent: (componentId: string) => void
  updateComponent: (componentId: string, updates: Partial<ComponentDefinition>) => void
  // Component editor (master editing)
  enterComponentEditor: (componentId: string) => void
  exitComponentEditor: () => void
  updateComponentMaster: (componentId: string, snapshotUpdates: Partial<SectionConfig>) => void
  syncMasterToInstances: (componentId: string) => void
  // Component props
  addComponentProp: (componentId: string, prop: ComponentPropDef) => void
  updateComponentProp: (componentId: string, propId: string, updates: Partial<ComponentPropDef>) => void
  removeComponentProp: (componentId: string, propId: string) => void
  setInstancePropOverride: (sectionId: string, propId: string, value: unknown) => void
  resetInstanceProp: (sectionId: string, propId: string) => void
  // Component slots
  addComponentSlot: (componentId: string, slot: ComponentSlotDef) => void
  removeComponentSlot: (componentId: string, slotId: string) => void
  // Component variants
  addComponentVariant: (componentId: string, variant: ComponentVariantDef) => void
  updateComponentVariant: (componentId: string, variantId: string, updates: Partial<ComponentVariantDef>) => void
  removeComponentVariant: (componentId: string, variantId: string) => void
  setInstanceVariant: (sectionId: string, variantId: string | undefined) => void
  // Instance management
  unlinkInstance: (sectionId: string) => void
  resetInstanceToMaster: (sectionId: string) => void
  // Variables CRUD
  setActiveVariableMode: (mode: string | null) => void
  addVariable: (name: string, type: CSSVariable['type'], value: string, group?: string) => void
  updateVariable: (id: string, updates: Partial<CSSVariable>) => void
  deleteVariable: (id: string) => void
  // Pages CRUD
  addPage: (title: string, slug: string) => void
  deletePage: (pageId: string) => void
  duplicatePage: (pageId: string) => void
  reorderPages: (fromIndex: number, toIndex: number) => void
  // Site Settings
  updateSiteMeta: (updates: Partial<SiteConfig['meta']>) => void
  updateIntegrations: (updates: Partial<SiteConfig['integrations']>) => void
  setRobotsTxt: (value: string) => void
  setJsonLd: (value: string) => void
  // CSS Classes CRUD
  addClass: (name: string, styles?: ElementStyleOverride) => string
  updateClassStyles: (classId: string, styleUpdates: Partial<ElementStyleOverride>) => void
  renameClass: (classId: string, newName: string) => void
  deleteClass: (classId: string) => void
  duplicateClass: (classId: string) => void
  reorderClasses: (fromIndex: number, toIndex: number) => void
  // Linking element <-> classes
  assignClassToElement: (sectionId: string, contentPath: string, classId: string) => void
  removeClassFromElement: (sectionId: string, contentPath: string, classId: string) => void
  reorderElementClasses: (sectionId: string, contentPath: string, classIds: string[]) => void
  assignClassToCustomElement: (sectionId: string, elementId: string, classId: string) => void
  removeClassFromCustomElement: (sectionId: string, elementId: string, classId: string) => void
  // Tag styles
  updateTagStyle: (tag: TagStyleKey, styleUpdates: Partial<ElementStyleOverride>) => void
  resetTagStyle: (tag: TagStyleKey) => void
  // Class library import
  importClassPreset: (presetId: string) => string | null
  importClassCollection: (collectionId: string) => string[]
  // Timeline CRUD
  setTimelineOpen: (open: boolean) => void
  setTimelinePanelHeight: (height: number) => void
  setActiveTimelineId: (id: string | null) => void
  setScrubberTime: (time: number) => void
  createTimeline: (sectionId: string, timeline: TimelineConfig) => void
  deleteTimeline: (sectionId: string, timelineId: string) => void
  updateTimeline: (sectionId: string, timelineId: string, updates: Partial<TimelineConfig>) => void
  addTimelineTrack: (sectionId: string, timelineId: string, track: TimelineTrack) => void
  removeTimelineTrack: (sectionId: string, timelineId: string, trackId: string) => void
  addTimelineAction: (sectionId: string, timelineId: string, trackId: string, action: TimelineAction) => void
  updateTimelineAction: (sectionId: string, timelineId: string, trackId: string, actionId: string, updates: Partial<TimelineAction>) => void
  removeTimelineAction: (sectionId: string, timelineId: string, trackId: string, actionId: string) => void
  moveTimelineAction: (sectionId: string, timelineId: string, fromTrackId: string, toTrackId: string, actionId: string, newStartTime: number) => void
  // Custom fonts CRUD
  addCustomFont: (font: CustomFontDef) => void
  removeCustomFont: (fontId: string) => void
  addCustomFontFile: (fontId: string, file: CustomFontFile) => void
  // CMS actions (no history for data-only, history for bindings)
  setCmsCollections: (collections: CmsCollection[]) => void
  setCmsActiveCollection: (id: string | null) => void
  setCmsItems: (items: CmsItem[]) => void
  // E-commerce actions
  setEcommerceProducts: (products: Product[]) => void
  setEcommerceCategories: (categories: ProductCategory[]) => void
  setEcommerceOrders: (orders: Order[]) => void
  setActiveProductId: (id: string | null) => void
  setActiveOrderId: (id: string | null) => void
  setCmsListBinding: (sectionId: string, binding: CmsListBinding) => void
  setCmsFieldBinding: (sectionId: string, contentPath: string, binding: CmsFieldBinding) => void
  setCmsVisibility: (sectionId: string, contentPath: string, rule: CmsVisibilityRule) => void
  setPageCollectionId: (pageId: string, collectionId: string | undefined) => void
  updateCmsListSort: (sectionId: string, sortField: string, sortDirection: 'asc' | 'desc') => void
  updateCmsListFilters: (sectionId: string, filters: CmsFilter[]) => void
  updateCmsListLimit: (sectionId: string, limit: number) => void
  updateCmsListOffset: (sectionId: string, offset: number) => void
  // Canvas viewport actions
  setCanvasZoom: (zoom: number) => void
  setCanvasOffset: (offset: { x: number; y: number }) => void
  zoomIn: () => void
  zoomOut: () => void
  zoomToFit: () => void
  zoomTo100: () => void
  setIsPanning: (v: boolean) => void
  toggleRulers: () => void
  addGuide: (axis: 'x' | 'y', position: number) => void
  updateGuide: (id: string, position: number) => void
  removeGuide: (id: string) => void
  clearGuides: () => void
  toggleGrid: () => void
  toggleColumns: () => void
  setGridSize: (n: number) => void
  toggleSnap: () => void
  // Multi-selection actions
  selectElements: (paths: string[]) => void
  addToSelection: (path: string) => void
  removeFromSelection: (path: string) => void
  clearSelection: () => void
  // Lock actions
  toggleLockElement: (elementPath: string) => void
  isElementLocked: (elementPath: string) => boolean
  // Webhook CRUD
  addWebhook: (webhook: import('@/types/site').WebhookConfig) => void
  updateWebhook: (webhookId: string, updates: Partial<import('@/types/site').WebhookConfig>) => void
  removeWebhook: (webhookId: string) => void
  // Theme presets
  applyColorPalette: (colors: import('@/types/site').Brand['colors']) => void
  applyTypography: (heading: string, body: string, size: import('@/types/site').Brand['typography']['size']) => void
  applyTagStylePreset: (tagStyles: Partial<Record<import('@/types/classes').TagStyleKey, Partial<ElementStyleOverride>>>, borderRadius?: import('@/types/site').Brand['borderRadius'], spacing?: import('@/types/site').Brand['spacing']) => void
  applyFullTheme: (colors: import('@/types/site').Brand['colors'], heading: string, body: string, size: import('@/types/site').Brand['typography']['size'], tagStyles: Partial<Record<import('@/types/classes').TagStyleKey, Partial<ElementStyleOverride>>>, borderRadius: import('@/types/site').Brand['borderRadius'], spacing: import('@/types/site').Brand['spacing']) => void
  // Localization
  addLocale: (locale: import('@/types/site').SiteLocale) => void
  updateLocale: (localeId: string, updates: Partial<import('@/types/site').SiteLocale>) => void
  removeLocale: (localeId: string) => void
  setActiveLocale: (localeCode: string) => void
  // Page password
  setPagePassword: (pageId: string, password: string | undefined) => void
  // Deploy
  updateDeploy: (updates: Partial<import('@/types/site').DeployConfig>) => void
  // Redirect CRUD
  addRedirect: (redirect: import('@/types/site').SiteRedirect) => void
  updateRedirect: (redirectId: string, updates: Partial<import('@/types/site').SiteRedirect>) => void
  removeRedirect: (redirectId: string) => void
  markClean: () => void
  undo: () => void
  redo: () => void
  _pushHistory: () => void
}

// ─── Tree helpers for custom elements ───
function findElement(elements: CustomElement[], id: string): CustomElement | null {
  for (const el of elements) {
    if (el.id === id) return el
    if (el.children) {
      const found = findElement(el.children, id)
      if (found) return found
    }
  }
  return null
}

function removeFromTree(elements: CustomElement[], id: string): CustomElement[] {
  return elements.filter(el => {
    if (el.id === id) return false
    if (el.children) el.children = removeFromTree(el.children, id)
    return true
  })
}

export const useEditorStore = create<EditorState>()(
  immer((set, get) => ({
    siteConfig: null,
    selectedPageId: null,
    selectedSectionId: null,
    selectedElementPath: null,
    isInlineEditing: false,
    isDirty: false,
    isSaving: false,
    isDragging: false,
    previewMode: false,
    activeBreakpoint: 'base',
    activeState: null,
    activeVariableMode: null,
    editingComponentId: null,
    history: [],
    historyIndex: -1,
    canUndo: false,
    canRedo: false,
    clipboard: null,
    timelineOpen: false,
    timelinePanelHeight: 250,
    activeTimelineId: null,
    scrubberTime: 0,
    cmsCollections: [],
    cmsActiveCollectionId: null,
    cmsItems: [],
    ecommerceProducts: [],
    ecommerceCategories: [],
    ecommerceOrders: [],
    activeProductId: null,
    activeOrderId: null,
    // Canvas viewport defaults
    canvasZoom: 1,
    canvasOffset: { x: 0, y: 0 },
    isPanning: false,
    showRulers: false,
    canvasGuides: [],
    showGrid: false,
    gridSize: 16,
    showColumns: false,
    columnCount: 12,
    snapEnabled: true,
    snapToGrid: true,
    snapToElements: true,
    snapToGuides: true,
    selectedElementPaths: [],
    lockedElements: new Set<string>(),

    _pushHistory: () => set((state) => {
      if (!state.siteConfig) return
      const snapshot = JSON.stringify(state.siteConfig)
      const newHistory = state.history.slice(0, state.historyIndex + 1)
      newHistory.push(snapshot)
      const limited = newHistory.slice(-50)
      state.history = limited
      state.historyIndex = limited.length - 1
      state.canUndo = limited.length > 1
      state.canRedo = false
    }),

    undo: () => set((state) => {
      if (state.historyIndex <= 0) return
      const newIndex = state.historyIndex - 1
      try {
        state.siteConfig = JSON.parse(state.history[newIndex])
      } catch {
        console.error('Undo: corrupted history snapshot at index', newIndex)
        return
      }
      state.historyIndex = newIndex
      state.canUndo = newIndex > 0
      state.canRedo = true
      state.isDirty = true
    }),

    redo: () => set((state) => {
      if (state.historyIndex >= state.history.length - 1) return
      const newIndex = state.historyIndex + 1
      try {
        state.siteConfig = JSON.parse(state.history[newIndex])
      } catch {
        console.error('Redo: corrupted history snapshot at index', newIndex)
        return
      }
      state.historyIndex = newIndex
      state.canUndo = true
      state.canRedo = newIndex < state.history.length - 1
      state.isDirty = true
    }),

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

    selectPage: (pageId) => set((state) => {
      state.selectedPageId = pageId
      state.selectedSectionId = null
      state.selectedElementPath = null
      state.isInlineEditing = false
    }),

    selectSection: (sectionId) => set((state) => {
      state.selectedSectionId = sectionId
      state.selectedElementPath = null
      state.isInlineEditing = false
    }),

    selectElement: (path) => set((state) => {
      state.selectedElementPath = path
      state.isInlineEditing = false
      // Auto-select parent section
      if (path) {
        const parsed = parseElementId(path)
        if (parsed) {
          state.selectedSectionId = parsed.sectionId
        }
      }
    }),

    setInlineEditing: (editing) => set((state) => {
      state.isInlineEditing = editing
    }),

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

    // ─── Custom Elements CRUD ───

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

    // ─── Interactions CRUD ───

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

    // ─── Custom Animation Presets ───

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

    // ─── Timeline CRUD ───

    setTimelineOpen: (open) => set((state) => { state.timelineOpen = open }),
    setTimelinePanelHeight: (height) => set((state) => { state.timelinePanelHeight = height }),
    setActiveTimelineId: (id) => set((state) => { state.activeTimelineId = id }),
    setScrubberTime: (time) => set((state) => { state.scrubberTime = time }),

    createTimeline: (sectionId, timeline) => {
      set((state) => {
        if (!state.siteConfig) return
        for (const page of state.siteConfig.pages) {
          const section = page.sections.find(s => s.id === sectionId)
          if (section) {
            if (!section.content.__timelines) section.content.__timelines = []
            ;(section.content.__timelines as TimelineConfig[]).push(timeline)
            state.isDirty = true
            break
          }
        }
      })
      get()._pushHistory()
    },

    deleteTimeline: (sectionId, timelineId) => {
      set((state) => {
        if (!state.siteConfig) return
        for (const page of state.siteConfig.pages) {
          const section = page.sections.find(s => s.id === sectionId)
          if (section && section.content.__timelines) {
            section.content.__timelines = (section.content.__timelines as TimelineConfig[]).filter(t => t.id !== timelineId)
            state.isDirty = true
            break
          }
        }
      })
      get()._pushHistory()
    },

    updateTimeline: (sectionId, timelineId, updates) => {
      set((state) => {
        if (!state.siteConfig) return
        for (const page of state.siteConfig.pages) {
          const section = page.sections.find(s => s.id === sectionId)
          if (section && section.content.__timelines) {
            const tl = (section.content.__timelines as TimelineConfig[]).find(t => t.id === timelineId)
            if (tl) Object.assign(tl, updates)
            state.isDirty = true
            break
          }
        }
      })
      get()._pushHistory()
    },

    addTimelineTrack: (sectionId, timelineId, track) => {
      set((state) => {
        if (!state.siteConfig) return
        for (const page of state.siteConfig.pages) {
          const section = page.sections.find(s => s.id === sectionId)
          if (section && section.content.__timelines) {
            const tl = (section.content.__timelines as TimelineConfig[]).find(t => t.id === timelineId)
            if (tl) tl.tracks.push(track)
            state.isDirty = true
            break
          }
        }
      })
      get()._pushHistory()
    },

    removeTimelineTrack: (sectionId, timelineId, trackId) => {
      set((state) => {
        if (!state.siteConfig) return
        for (const page of state.siteConfig.pages) {
          const section = page.sections.find(s => s.id === sectionId)
          if (section && section.content.__timelines) {
            const tl = (section.content.__timelines as TimelineConfig[]).find(t => t.id === timelineId)
            if (tl) tl.tracks = tl.tracks.filter(t => t.id !== trackId)
            state.isDirty = true
            break
          }
        }
      })
      get()._pushHistory()
    },

    addTimelineAction: (sectionId, timelineId, trackId, action) => {
      set((state) => {
        if (!state.siteConfig) return
        for (const page of state.siteConfig.pages) {
          const section = page.sections.find(s => s.id === sectionId)
          if (section && section.content.__timelines) {
            const tl = (section.content.__timelines as TimelineConfig[]).find(t => t.id === timelineId)
            const track = tl?.tracks.find(t => t.id === trackId)
            if (track) track.actions.push(action)
            state.isDirty = true
            break
          }
        }
      })
      get()._pushHistory()
    },

    updateTimelineAction: (sectionId, timelineId, trackId, actionId, updates) => {
      set((state) => {
        if (!state.siteConfig) return
        for (const page of state.siteConfig.pages) {
          const section = page.sections.find(s => s.id === sectionId)
          if (section && section.content.__timelines) {
            const tl = (section.content.__timelines as TimelineConfig[]).find(t => t.id === timelineId)
            const track = tl?.tracks.find(t => t.id === trackId)
            const action = track?.actions.find(a => a.id === actionId)
            if (action) Object.assign(action, updates)
            state.isDirty = true
            break
          }
        }
      })
      get()._pushHistory()
    },

    removeTimelineAction: (sectionId, timelineId, trackId, actionId) => {
      set((state) => {
        if (!state.siteConfig) return
        for (const page of state.siteConfig.pages) {
          const section = page.sections.find(s => s.id === sectionId)
          if (section && section.content.__timelines) {
            const tl = (section.content.__timelines as TimelineConfig[]).find(t => t.id === timelineId)
            const track = tl?.tracks.find(t => t.id === trackId)
            if (track) track.actions = track.actions.filter(a => a.id !== actionId)
            state.isDirty = true
            break
          }
        }
      })
      get()._pushHistory()
    },

    moveTimelineAction: (sectionId, timelineId, fromTrackId, toTrackId, actionId, newStartTime) => {
      set((state) => {
        if (!state.siteConfig) return
        for (const page of state.siteConfig.pages) {
          const section = page.sections.find(s => s.id === sectionId)
          if (section && section.content.__timelines) {
            const tl = (section.content.__timelines as TimelineConfig[]).find(t => t.id === timelineId)
            if (!tl) break
            const fromTrack = tl.tracks.find(t => t.id === fromTrackId)
            const toTrack = tl.tracks.find(t => t.id === toTrackId)
            if (!fromTrack || !toTrack) break
            const actionIdx = fromTrack.actions.findIndex(a => a.id === actionId)
            if (actionIdx === -1) break
            const [action] = fromTrack.actions.splice(actionIdx, 1)
            action.startTime = newStartTime
            toTrack.actions.push(action)
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

    setIsSaving: (saving) => set((state) => {
      state.isSaving = saving
    }),

    setIsDragging: (dragging) => set((state) => {
      state.isDragging = dragging
    }),

    setPreviewMode: (preview) => set((state) => {
      state.previewMode = preview
      if (preview) {
        state.selectedSectionId = null
        state.selectedElementPath = null
      }
    }),

    setActiveBreakpoint: (breakpointId) => set((state) => {
      state.activeBreakpoint = breakpointId
    }),

    setActiveState: (stateId) => set((state) => {
      state.activeState = stateId
    }),

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

    // ─── Clipboard & Shortcuts ───

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

    // ─── Components CRUD ───

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

    // ─── Component Editor (Master editing) ───

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

    // ─── Variables ───

    setActiveVariableMode: (mode) => set((state) => {
      state.activeVariableMode = mode
    }),

    addVariable: (name, type, value, group) => {
      set((state) => {
        if (!state.siteConfig) return
        if (!state.siteConfig.variables) state.siteConfig.variables = []
        const variable: CSSVariable = {
          id: `var-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name,
          type,
          value,
        }
        if (group) variable.group = group
        state.siteConfig.variables.push(variable)
        state.isDirty = true
      })
      get()._pushHistory()
    },

    updateVariable: (id, updates) => {
      set((state) => {
        if (!state.siteConfig?.variables) return
        const v = state.siteConfig.variables.find(x => x.id === id)
        if (v) {
          Object.assign(v, updates)
          state.isDirty = true
        }
      })
      get()._pushHistory()
    },

    deleteVariable: (id) => {
      set((state) => {
        if (!state.siteConfig?.variables) return
        state.siteConfig.variables = state.siteConfig.variables.filter(v => v.id !== id)
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

    // ─── Site Settings ───

    updateSiteMeta: (updates) => {
      set((state) => {
        if (!state.siteConfig) return
        Object.assign(state.siteConfig.meta, updates)
        state.isDirty = true
      })
      get()._pushHistory()
    },

    updateIntegrations: (updates) => {
      set((state) => {
        if (!state.siteConfig) return
        Object.assign(state.siteConfig.integrations, updates)
        state.isDirty = true
      })
      get()._pushHistory()
    },

    setRobotsTxt: (value) => {
      set((state) => {
        if (!state.siteConfig) return
        state.siteConfig.robotsTxt = value || undefined
        state.isDirty = true
      })
      get()._pushHistory()
    },

    setJsonLd: (value) => {
      set((state) => {
        if (!state.siteConfig) return
        state.siteConfig.jsonLd = value || undefined
        state.isDirty = true
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

    // ── Class Library Import ──

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

    // ── Theme Presets ──
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

    // ── Custom Fonts CRUD ──
    addCustomFont: (font) => {
      set((state) => {
        if (!state.siteConfig) return
        if (!state.siteConfig.customFonts) state.siteConfig.customFonts = []
        state.siteConfig.customFonts.push(font)
        state.isDirty = true
      })
      get()._pushHistory()
    },

    removeCustomFont: (fontId) => {
      set((state) => {
        if (!state.siteConfig?.customFonts) return
        state.siteConfig.customFonts = state.siteConfig.customFonts.filter(f => f.id !== fontId)
        state.isDirty = true
      })
      get()._pushHistory()
    },

    addCustomFontFile: (fontId, file) => {
      set((state) => {
        if (!state.siteConfig?.customFonts) return
        const font = state.siteConfig.customFonts.find(f => f.id === fontId)
        if (font) {
          font.files.push(file)
          state.isDirty = true
        }
      })
      get()._pushHistory()
    },

    // ─── CMS actions ───

    setCmsCollections: (collections) => set((state) => { state.cmsCollections = collections }),
    setCmsActiveCollection: (id) => set((state) => { state.cmsActiveCollectionId = id }),
    setCmsItems: (items) => set((state) => { state.cmsItems = items }),

    // ─── E-commerce actions ───

    setEcommerceProducts: (products) => set((state) => { state.ecommerceProducts = products }),
    setEcommerceCategories: (categories) => set((state) => { state.ecommerceCategories = categories }),
    setEcommerceOrders: (orders) => set((state) => { state.ecommerceOrders = orders }),
    setActiveProductId: (id) => set((state) => { state.activeProductId = id }),
    setActiveOrderId: (id) => set((state) => { state.activeOrderId = id }),

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

    // ─── Canvas viewport actions (ephemeral, no history) ───
    setCanvasZoom: (zoom) => set((state) => {
      state.canvasZoom = Math.max(0.1, Math.min(3, zoom))
    }),
    setCanvasOffset: (offset) => set((state) => {
      state.canvasOffset = offset
    }),
    zoomIn: () => set((state) => {
      state.canvasZoom = Math.min(3, Math.round((state.canvasZoom + 0.25) * 100) / 100)
    }),
    zoomOut: () => set((state) => {
      state.canvasZoom = Math.max(0.1, Math.round((state.canvasZoom - 0.25) * 100) / 100)
    }),
    zoomToFit: () => set((state) => {
      state.canvasZoom = 1
      state.canvasOffset = { x: 0, y: 0 }
    }),
    zoomTo100: () => set((state) => {
      state.canvasZoom = 1
      state.canvasOffset = { x: 0, y: 0 }
    }),
    setIsPanning: (v) => set((state) => {
      state.isPanning = v
    }),
    toggleRulers: () => set((state) => {
      state.showRulers = !state.showRulers
    }),
    addGuide: (axis, position) => set((state) => {
      state.canvasGuides.push({ id: `guide-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, axis, position })
    }),
    updateGuide: (id, position) => set((state) => {
      const g = state.canvasGuides.find(g => g.id === id)
      if (g) g.position = position
    }),
    removeGuide: (id) => set((state) => {
      state.canvasGuides = state.canvasGuides.filter(g => g.id !== id)
    }),
    clearGuides: () => set((state) => {
      state.canvasGuides = []
    }),
    toggleGrid: () => set((state) => {
      state.showGrid = !state.showGrid
    }),
    toggleColumns: () => set((state) => {
      state.showColumns = !state.showColumns
    }),
    setGridSize: (n) => set((state) => {
      state.gridSize = n
    }),
    toggleSnap: () => set((state) => {
      state.snapEnabled = !state.snapEnabled
    }),
    // ─── Multi-selection actions ───
    selectElements: (paths) => set((state) => {
      state.selectedElementPaths = paths
      state.selectedElementPath = paths[0] ?? null
    }),
    addToSelection: (path) => set((state) => {
      if (!state.selectedElementPaths.includes(path)) {
        state.selectedElementPaths.push(path)
      }
      // Keep selectedElementPath as the last added
      state.selectedElementPath = path
    }),
    removeFromSelection: (path) => set((state) => {
      state.selectedElementPaths = state.selectedElementPaths.filter(p => p !== path)
      if (state.selectedElementPath === path) {
        state.selectedElementPath = state.selectedElementPaths[0] ?? null
      }
    }),
    clearSelection: () => set((state) => {
      state.selectedElementPaths = []
      state.selectedElementPath = null
    }),

    // Lock actions (ephemeral, not in history)
    toggleLockElement: (elementPath) => set((state) => {
      const next = new Set(state.lockedElements)
      if (next.has(elementPath)) {
        next.delete(elementPath)
      } else {
        next.add(elementPath)
        // Deselect if currently selected
        if (state.selectedElementPath === elementPath) {
          state.selectedElementPath = null
        }
        if (state.selectedSectionId === elementPath) {
          state.selectedSectionId = null
        }
      }
      state.lockedElements = next
    }),
    isElementLocked: (elementPath) => get().lockedElements.has(elementPath),

    // Webhook CRUD
    addWebhook: (webhook) => {
      set((state) => {
        if (!state.siteConfig) return
        if (!state.siteConfig.integrations.webhooks) state.siteConfig.integrations.webhooks = []
        state.siteConfig.integrations.webhooks.push(webhook)
        state.isDirty = true
      })
      get()._pushHistory()
    },
    updateWebhook: (webhookId, updates) => {
      set((state) => {
        if (!state.siteConfig?.integrations.webhooks) return
        const idx = state.siteConfig.integrations.webhooks.findIndex(w => w.id === webhookId)
        if (idx === -1) return
        Object.assign(state.siteConfig.integrations.webhooks[idx], updates)
        state.isDirty = true
      })
      get()._pushHistory()
    },
    removeWebhook: (webhookId) => {
      set((state) => {
        if (!state.siteConfig?.integrations.webhooks) return
        state.siteConfig.integrations.webhooks = state.siteConfig.integrations.webhooks.filter(w => w.id !== webhookId)
        state.isDirty = true
      })
      get()._pushHistory()
    },

    // Localization
    addLocale: (locale) => {
      set((state) => {
        if (!state.siteConfig) return
        if (!state.siteConfig.locales) state.siteConfig.locales = []
        state.siteConfig.locales.push(locale)
        state.isDirty = true
      })
      get()._pushHistory()
    },
    updateLocale: (localeId, updates) => {
      set((state) => {
        if (!state.siteConfig?.locales) return
        const idx = state.siteConfig.locales.findIndex(l => l.id === localeId)
        if (idx === -1) return
        Object.assign(state.siteConfig.locales[idx], updates)
        state.isDirty = true
      })
      get()._pushHistory()
    },
    removeLocale: (localeId) => {
      set((state) => {
        if (!state.siteConfig?.locales) return
        state.siteConfig.locales = state.siteConfig.locales.filter(l => l.id !== localeId)
        state.isDirty = true
      })
      get()._pushHistory()
    },
    setActiveLocale: (localeCode) => {
      set((state) => {
        if (!state.siteConfig) return
        state.siteConfig.activeLocale = localeCode
        state.isDirty = true
      })
      get()._pushHistory()
    },

    // Page password
    setPagePassword: (pageId, password) => {
      set((state) => {
        if (!state.siteConfig) return
        const page = state.siteConfig.pages.find(p => p.id === pageId)
        if (!page) return
        page.password = password
        state.isDirty = true
      })
      get()._pushHistory()
    },

    // Deploy
    updateDeploy: (updates) => {
      set((state) => {
        if (!state.siteConfig) return
        if (!state.siteConfig.deploy) state.siteConfig.deploy = {}
        Object.assign(state.siteConfig.deploy, updates)
        state.isDirty = true
      })
      get()._pushHistory()
    },

    // Redirect CRUD
    addRedirect: (redirect) => {
      set((state) => {
        if (!state.siteConfig) return
        if (!state.siteConfig.redirects) state.siteConfig.redirects = []
        state.siteConfig.redirects.push(redirect)
        state.isDirty = true
      })
      get()._pushHistory()
    },
    updateRedirect: (redirectId, updates) => {
      set((state) => {
        if (!state.siteConfig?.redirects) return
        const idx = state.siteConfig.redirects.findIndex(r => r.id === redirectId)
        if (idx === -1) return
        Object.assign(state.siteConfig.redirects[idx], updates)
        state.isDirty = true
      })
      get()._pushHistory()
    },
    removeRedirect: (redirectId) => {
      set((state) => {
        if (!state.siteConfig?.redirects) return
        state.siteConfig.redirects = state.siteConfig.redirects.filter(r => r.id !== redirectId)
        state.isDirty = true
      })
      get()._pushHistory()
    },

    markClean: () => set((state) => {
      state.isDirty = false
    }),
  }))
)
