import type { StateCreator } from 'zustand'
import type { EditorState, SettingsSlice } from '../types'
import type { CSSVariable } from '@/types/site'
import type { CustomFontDef, CustomFontFile } from '@/lib/fonts'

export const createSettingsSlice: StateCreator<EditorState, [['zustand/immer', never]], [], SettingsSlice> = (set, get) => ({
  // ─── Site Meta ───

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

  // ─── Custom Fonts CRUD ───

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

  // ─── Variables CRUD ───

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

  // ─── Webhook CRUD ───

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

  // ─── Localization ───

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

  // ─── Page Password ───

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

  // ─── Deploy ───

  updateDeploy: (updates) => {
    set((state) => {
      if (!state.siteConfig) return
      if (!state.siteConfig.deploy) state.siteConfig.deploy = {}
      Object.assign(state.siteConfig.deploy, updates)
      state.isDirty = true
    })
    get()._pushHistory()
  },

  // ─── Redirect CRUD ───

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
})
