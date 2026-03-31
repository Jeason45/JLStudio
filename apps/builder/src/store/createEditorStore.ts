'use client'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { EditorState } from './types'
import { createCanvasSlice } from './slices/canvasSlice'
import { createLockSlice } from './slices/lockSlice'
import { createEcommerceSlice } from './slices/ecommerceSlice'
import { createSelectionSlice } from './slices/selectionSlice'
import { createHistorySlice } from './slices/historySlice'
import { createTimelineSlice } from './slices/timelineSlice'
import { createInteractionsSlice } from './slices/interactionsSlice'
import { createCustomElementsSlice } from './slices/customElementsSlice'
import { createSettingsSlice } from './slices/settingsSlice'
import { createThemeSlice } from './slices/themeSlice'
import { createCmsSlice } from './slices/cmsSlice'
import { createClassesSlice } from './slices/classesSlice'
import { createComponentsSlice } from './slices/componentsSlice'
import { createClipboardSlice } from './slices/clipboardSlice'
import { createSiteConfigSlice } from './slices/siteConfigSlice'

export const useEditorStore = create<EditorState>()(
  immer((...args) => ({
    ...createCanvasSlice(...args),
    ...createLockSlice(...args),
    ...createEcommerceSlice(...args),
    ...createSelectionSlice(...args),
    ...createHistorySlice(...args),
    ...createTimelineSlice(...args),
    ...createInteractionsSlice(...args),
    ...createCustomElementsSlice(...args),
    ...createSettingsSlice(...args),
    ...createThemeSlice(...args),
    ...createCmsSlice(...args),
    ...createClassesSlice(...args),
    ...createComponentsSlice(...args),
    ...createClipboardSlice(...args),
    ...createSiteConfigSlice(...args),
  }))
)
