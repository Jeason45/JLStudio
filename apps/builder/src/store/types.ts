import type { SiteConfig, PageConfig, SectionConfig, ComponentDefinition, CSSVariable } from '@/types/site'
import type { ComponentPropDef, ComponentSlotDef, ComponentVariantDef, ComponentInstanceData } from '@/types/components'
import type { ElementStyleOverride, CustomElement } from '@/types/elements'
import type { AnimationConfig, TimelineConfig, TimelineTrack, TimelineAction } from '@/types/interactions'
import type { CSSClass, TagStyleKey, TagStyles } from '@/types/classes'
import type { CmsCollection, CmsItem, CmsListBinding, CmsFieldBinding, CmsVisibilityRule, CmsFilter } from '@/types/cms'
import type { Product, ProductCategory, Order } from '@/types/ecommerce'
import type { ElementBreakpointStyleMap } from '@/types/breakpoints'
import type { CustomFontDef, CustomFontFile } from '@/lib/fonts'

// ─── Slice Interfaces ───

export interface ClipboardData {
  type: 'section' | 'element'
  data: unknown
  styleData?: Record<string, unknown>
}

export interface SelectionSlice {
  selectedPageId: string | null
  selectedSectionId: string | null
  selectedElementPath: string | null
  isInlineEditing: boolean
  isDirty: boolean
  isSaving: boolean
  isDragging: boolean
  previewMode: boolean
  activeBreakpoint: string
  activeState: string | null
  activeVariableMode: string | null
  editingComponentId: string | null
  selectPage: (pageId: string) => void
  selectSection: (sectionId: string | null) => void
  selectElement: (path: string | null) => void
  setInlineEditing: (editing: boolean) => void
  setIsSaving: (saving: boolean) => void
  setIsDragging: (dragging: boolean) => void
  setPreviewMode: (preview: boolean) => void
  setActiveBreakpoint: (breakpointId: string) => void
  setActiveState: (stateId: string | null) => void
  setActiveVariableMode: (mode: string | null) => void
  markClean: () => void
}

export interface HistorySlice {
  history: string[]
  historyIndex: number
  canUndo: boolean
  canRedo: boolean
  undo: () => void
  redo: () => void
  _pushHistory: () => void
}

export interface CanvasSlice {
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
}

export interface LockSlice {
  selectedElementPaths: string[]
  lockedElements: Set<string>
  selectElements: (paths: string[]) => void
  addToSelection: (path: string) => void
  removeFromSelection: (path: string) => void
  clearSelection: () => void
  toggleLockElement: (elementPath: string) => void
  isElementLocked: (elementPath: string) => boolean
}

export interface TimelineSlice {
  timelineOpen: boolean
  timelinePanelHeight: number
  activeTimelineId: string | null
  scrubberTime: number
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
}

export interface CmsSlice {
  cmsCollections: CmsCollection[]
  cmsActiveCollectionId: string | null
  cmsItems: CmsItem[]
  setCmsCollections: (collections: CmsCollection[]) => void
  setCmsActiveCollection: (id: string | null) => void
  setCmsItems: (items: CmsItem[]) => void
  setCmsListBinding: (sectionId: string, binding: CmsListBinding) => void
  setCmsFieldBinding: (sectionId: string, contentPath: string, binding: CmsFieldBinding) => void
  setCmsVisibility: (sectionId: string, contentPath: string, rule: CmsVisibilityRule) => void
  setPageCollectionId: (pageId: string, collectionId: string | undefined) => void
  updateCmsListSort: (sectionId: string, sortField: string, sortDirection: 'asc' | 'desc') => void
  updateCmsListFilters: (sectionId: string, filters: CmsFilter[]) => void
  updateCmsListLimit: (sectionId: string, limit: number) => void
  updateCmsListOffset: (sectionId: string, offset: number) => void
}

export interface EcommerceSlice {
  ecommerceProducts: Product[]
  ecommerceCategories: ProductCategory[]
  ecommerceOrders: Order[]
  activeProductId: string | null
  activeOrderId: string | null
  setEcommerceProducts: (products: Product[]) => void
  setEcommerceCategories: (categories: ProductCategory[]) => void
  setEcommerceOrders: (orders: Order[]) => void
  setActiveProductId: (id: string | null) => void
  setActiveOrderId: (id: string | null) => void
}

export interface ClipboardSlice {
  clipboard: ClipboardData | null
  duplicateSection: (pageId: string, sectionId: string) => void
  deleteSelected: () => void
  copyElement: () => void
  pasteElement: () => void
  copyElementStyle: () => void
  pasteElementStyle: () => void
  navigateSection: (direction: 'up' | 'down') => void
}

export interface SiteConfigSlice {
  siteConfig: SiteConfig | null
  setSiteConfig: (config: SiteConfig) => void
  updateElementContent: (sectionId: string, contentPath: string, value: unknown) => void
  updateElementStyle: (sectionId: string, contentPath: string, styleUpdates: Partial<ElementStyleOverride>) => void
  updateElementSettings: (sectionId: string, contentPath: string, settings: Record<string, unknown>) => void
  updateSection: (sectionId: string, updates: Partial<SectionConfig>) => void
  addSection: (pageId: string, section: SectionConfig, index?: number) => void
  removeSection: (pageId: string, sectionId: string) => void
  moveSection: (pageId: string, fromIndex: number, toIndex: number) => void
  updateBrand: (updates: Partial<SiteConfig['brand']>) => void
  updatePage: (pageId: string, updates: Partial<PageConfig>) => void
  addPage: (title: string, slug: string) => void
  deletePage: (pageId: string) => void
  duplicatePage: (pageId: string) => void
  reorderPages: (fromIndex: number, toIndex: number) => void
  updateElementBreakpointStyle: (sectionId: string, contentPath: string, breakpointId: string, styleUpdates: Partial<ElementStyleOverride>) => void
  resetElementBreakpointProp: (sectionId: string, contentPath: string, breakpointId: string, propKey: string) => void
}

export interface ClassesSlice {
  addClass: (name: string, styles?: ElementStyleOverride) => string
  updateClassStyles: (classId: string, styleUpdates: Partial<ElementStyleOverride>) => void
  renameClass: (classId: string, newName: string) => void
  deleteClass: (classId: string) => void
  duplicateClass: (classId: string) => void
  reorderClasses: (fromIndex: number, toIndex: number) => void
  assignClassToElement: (sectionId: string, contentPath: string, classId: string) => void
  removeClassFromElement: (sectionId: string, contentPath: string, classId: string) => void
  reorderElementClasses: (sectionId: string, contentPath: string, classIds: string[]) => void
  assignClassToCustomElement: (sectionId: string, elementId: string, classId: string) => void
  removeClassFromCustomElement: (sectionId: string, elementId: string, classId: string) => void
  updateTagStyle: (tag: TagStyleKey, styleUpdates: Partial<ElementStyleOverride>) => void
  resetTagStyle: (tag: TagStyleKey) => void
  updateClassStateStyles: (classId: string, stateId: string, styleUpdates: Partial<ElementStyleOverride>) => void
  resetClassStateProp: (classId: string, stateId: string, propKey: string) => void
  updateClassBreakpointStyles: (classId: string, breakpointId: string, styleUpdates: Partial<ElementStyleOverride>) => void
  resetClassBreakpointProp: (classId: string, breakpointId: string, propKey: string) => void
  importClassPreset: (presetId: string) => string | null
  importClassCollection: (collectionId: string) => string[]
}

export interface ComponentsSlice {
  createComponentFromSection: (sectionId: string, name: string) => void
  instantiateComponent: (componentId: string) => void
  deleteComponent: (componentId: string) => void
  updateComponent: (componentId: string, updates: Partial<ComponentDefinition>) => void
  enterComponentEditor: (componentId: string) => void
  exitComponentEditor: () => void
  updateComponentMaster: (componentId: string, snapshotUpdates: Partial<SectionConfig>) => void
  syncMasterToInstances: (componentId: string) => void
  addComponentProp: (componentId: string, prop: ComponentPropDef) => void
  updateComponentProp: (componentId: string, propId: string, updates: Partial<ComponentPropDef>) => void
  removeComponentProp: (componentId: string, propId: string) => void
  setInstancePropOverride: (sectionId: string, propId: string, value: unknown) => void
  resetInstanceProp: (sectionId: string, propId: string) => void
  addComponentSlot: (componentId: string, slot: ComponentSlotDef) => void
  removeComponentSlot: (componentId: string, slotId: string) => void
  addComponentVariant: (componentId: string, variant: ComponentVariantDef) => void
  updateComponentVariant: (componentId: string, variantId: string, updates: Partial<ComponentVariantDef>) => void
  removeComponentVariant: (componentId: string, variantId: string) => void
  setInstanceVariant: (sectionId: string, variantId: string | undefined) => void
  unlinkInstance: (sectionId: string) => void
  resetInstanceToMaster: (sectionId: string) => void
}

export interface InteractionsSlice {
  addInteraction: (sectionId: string, elementPath: string, config: AnimationConfig) => void
  updateInteraction: (sectionId: string, elementPath: string, interactionId: string, updates: Partial<AnimationConfig>) => void
  removeInteraction: (sectionId: string, elementPath: string, interactionId: string) => void
  addCustomPreset: (preset: import('@/types/site').AnimationPresetCustom) => void
  removeCustomPreset: (presetId: string) => void
}

export interface CustomElementsSlice {
  addCustomElement: (sectionId: string, element: CustomElement, parentId?: string, index?: number) => void
  removeCustomElement: (sectionId: string, elementId: string) => void
  moveCustomElement: (sectionId: string, elementId: string, newParentId: string | null, index: number) => void
  updateCustomElement: (sectionId: string, elementId: string, updates: Partial<CustomElement>) => void
  updateCustomElementStyle: (sectionId: string, elementId: string, styleUpdates: Partial<CustomElement['style']>) => void
}

export interface ThemeSlice {
  applyColorPalette: (colors: import('@/types/site').Brand['colors']) => void
  applyTypography: (heading: string, body: string, size: import('@/types/site').Brand['typography']['size']) => void
  applyTagStylePreset: (tagStyles: Partial<Record<import('@/types/classes').TagStyleKey, Partial<ElementStyleOverride>>>, borderRadius?: import('@/types/site').Brand['borderRadius'], spacing?: import('@/types/site').Brand['spacing']) => void
  applyFullTheme: (colors: import('@/types/site').Brand['colors'], heading: string, body: string, size: import('@/types/site').Brand['typography']['size'], tagStyles: Partial<Record<import('@/types/classes').TagStyleKey, Partial<ElementStyleOverride>>>, borderRadius: import('@/types/site').Brand['borderRadius'], spacing: import('@/types/site').Brand['spacing']) => void
}

export interface SettingsSlice {
  updateSiteMeta: (updates: Partial<SiteConfig['meta']>) => void
  updateIntegrations: (updates: Partial<SiteConfig['integrations']>) => void
  setRobotsTxt: (value: string) => void
  setJsonLd: (value: string) => void
  addCustomFont: (font: CustomFontDef) => void
  removeCustomFont: (fontId: string) => void
  addCustomFontFile: (fontId: string, file: CustomFontFile) => void
  addVariable: (name: string, type: CSSVariable['type'], value: string, group?: string) => void
  updateVariable: (id: string, updates: Partial<CSSVariable>) => void
  deleteVariable: (id: string) => void
  addWebhook: (webhook: import('@/types/site').WebhookConfig) => void
  updateWebhook: (webhookId: string, updates: Partial<import('@/types/site').WebhookConfig>) => void
  removeWebhook: (webhookId: string) => void
  addLocale: (locale: import('@/types/site').SiteLocale) => void
  updateLocale: (localeId: string, updates: Partial<import('@/types/site').SiteLocale>) => void
  removeLocale: (localeId: string) => void
  setActiveLocale: (localeCode: string) => void
  setPagePassword: (pageId: string, password: string | undefined) => void
  updateDeploy: (updates: Partial<import('@/types/site').DeployConfig>) => void
  addRedirect: (redirect: import('@/types/site').SiteRedirect) => void
  updateRedirect: (redirectId: string, updates: Partial<import('@/types/site').SiteRedirect>) => void
  removeRedirect: (redirectId: string) => void
}

// ─── Combined State ───

export type EditorState =
  SelectionSlice &
  HistorySlice &
  CanvasSlice &
  LockSlice &
  TimelineSlice &
  CmsSlice &
  EcommerceSlice &
  ClipboardSlice &
  SiteConfigSlice &
  ClassesSlice &
  ComponentsSlice &
  InteractionsSlice &
  CustomElementsSlice &
  ThemeSlice &
  SettingsSlice
