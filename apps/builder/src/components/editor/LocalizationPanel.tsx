'use client'
import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useEditorStore } from '@/store/editorStore'
import { Globe, Plus, Trash2, Check, X, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SiteLocale } from '@/types/site'

interface LocalizationPanelProps {
  open: boolean
  onClose: () => void
}

const LOCALE_PRESETS: { code: string; label: string; hreflang: string; flag: string }[] = [
  { code: 'fr', label: 'Francais', hreflang: 'fr-FR', flag: 'FR' },
  { code: 'en', label: 'English', hreflang: 'en-US', flag: 'EN' },
  { code: 'es', label: 'Espanol', hreflang: 'es-ES', flag: 'ES' },
  { code: 'de', label: 'Deutsch', hreflang: 'de-DE', flag: 'DE' },
  { code: 'it', label: 'Italiano', hreflang: 'it-IT', flag: 'IT' },
  { code: 'pt', label: 'Portugues', hreflang: 'pt-BR', flag: 'PT' },
  { code: 'nl', label: 'Nederlands', hreflang: 'nl-NL', flag: 'NL' },
  { code: 'ja', label: 'Japanese', hreflang: 'ja-JP', flag: 'JA' },
  { code: 'zh', label: 'Chinese', hreflang: 'zh-CN', flag: 'ZH' },
  { code: 'ko', label: 'Korean', hreflang: 'ko-KR', flag: 'KO' },
  { code: 'ar', label: 'Arabic', hreflang: 'ar-SA', flag: 'AR' },
  { code: 'ru', label: 'Russian', hreflang: 'ru-RU', flag: 'RU' },
]

export function LocalizationPanel({ open, onClose }: LocalizationPanelProps) {
  const { siteConfig, addLocale, updateLocale, removeLocale, setActiveLocale } = useEditorStore()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ code: '', label: '', hreflang: '', isDefault: false })

  const locales = siteConfig?.locales ?? []
  const activeLocale = siteConfig?.activeLocale ?? locales.find(l => l.isDefault)?.code ?? ''

  const resetForm = () => {
    setForm({ code: '', label: '', hreflang: '', isDefault: false })
    setIsAdding(false)
    setEditingId(null)
  }

  const handleAdd = () => {
    if (!form.code.trim() || !form.label.trim()) return
    const locale: SiteLocale = {
      id: `locale-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      code: form.code.trim().toLowerCase(),
      label: form.label.trim(),
      isDefault: locales.length === 0 ? true : form.isDefault,
      hreflang: form.hreflang.trim() || undefined,
    }
    // If this is set as default, unset others
    if (locale.isDefault) {
      for (const l of locales) {
        if (l.isDefault) updateLocale(l.id, { isDefault: false })
      }
    }
    addLocale(locale)
    if (locale.isDefault || locales.length === 0) {
      setActiveLocale(locale.code)
    }
    resetForm()
  }

  const handleUpdate = () => {
    if (!editingId || !form.code.trim() || !form.label.trim()) return
    if (form.isDefault) {
      for (const l of locales) {
        if (l.isDefault && l.id !== editingId) updateLocale(l.id, { isDefault: false })
      }
    }
    updateLocale(editingId, {
      code: form.code.trim().toLowerCase(),
      label: form.label.trim(),
      hreflang: form.hreflang.trim() || undefined,
      isDefault: form.isDefault,
    })
    resetForm()
  }

  const startEdit = (locale: SiteLocale) => {
    setEditingId(locale.id)
    setForm({ code: locale.code, label: locale.label, hreflang: locale.hreflang ?? '', isDefault: locale.isDefault })
    setIsAdding(false)
  }

  const handleRemove = (locale: SiteLocale) => {
    removeLocale(locale.id)
    if (locale.isDefault && locales.length > 1) {
      const remaining = locales.filter(l => l.id !== locale.id)
      if (remaining.length > 0) {
        updateLocale(remaining[0].id, { isDefault: true })
        setActiveLocale(remaining[0].code)
      }
    }
  }

  const handleSelectPreset = (preset: typeof LOCALE_PRESETS[0]) => {
    setForm({ code: preset.code, label: preset.label, hreflang: preset.hreflang, isDefault: false })
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-96 bg-zinc-900 border-zinc-800 text-white p-0 flex flex-col">
        <SheetHeader className="px-5 py-4 border-b border-zinc-800 shrink-0">
          <SheetTitle className="text-white text-sm flex items-center gap-2">
            <Globe className="w-4 h-4 text-wf-blue" />
            Localization
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

          {/* Active locale switcher */}
          {locales.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Active locale</p>
              <div className="flex flex-wrap gap-1.5">
                {locales.map(locale => (
                  <button
                    key={locale.id}
                    onClick={() => setActiveLocale(locale.code)}
                    className={cn(
                      'h-7 px-3 rounded text-[11px] font-medium transition-colors border',
                      activeLocale === locale.code
                        ? 'bg-wf-blue border-wf-blue text-white'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500'
                    )}
                  >
                    {locale.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Locales list */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Configured locales</p>
              <button
                onClick={() => { setIsAdding(true); setEditingId(null); setForm({ code: '', label: '', hreflang: '', isDefault: false }) }}
                className="w-5 h-5 flex items-center justify-center rounded text-zinc-500 hover:text-white hover:bg-zinc-700 transition-colors"
                title="Add locale"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {locales.length === 0 && !isAdding && (
              <p className="text-[11px] text-zinc-600 italic">No locales configured. Add one to enable multi-language support.</p>
            )}

            <div className="space-y-1">
              {locales.map(locale => (
                <div
                  key={locale.id}
                  className={cn(
                    'flex items-center gap-2 px-2.5 py-2 rounded border transition-colors',
                    editingId === locale.id
                      ? 'border-wf-blue bg-zinc-800/50'
                      : 'border-zinc-800 hover:border-zinc-700 bg-zinc-800/30'
                  )}
                >
                  <span className="w-7 h-5 flex items-center justify-center bg-zinc-700 rounded text-[9px] font-bold text-zinc-300 shrink-0">
                    {locale.code.toUpperCase()}
                  </span>
                  <span className="flex-1 text-[11px] text-zinc-300 truncate">{locale.label}</span>
                  {locale.isDefault && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-wf-blue/20 text-wf-blue rounded font-medium">Default</span>
                  )}
                  {locale.hreflang && (
                    <span className="text-[9px] text-zinc-600">{locale.hreflang}</span>
                  )}
                  <button
                    onClick={() => startEdit(locale)}
                    className="p-0.5 text-zinc-600 hover:text-white transition-colors"
                    title="Edit"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button
                    onClick={() => handleRemove(locale)}
                    className="p-0.5 text-zinc-600 hover:text-red-400 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add / Edit form */}
          {(isAdding || editingId) && (
            <div className="p-3 bg-zinc-800 border border-zinc-700 rounded space-y-3">
              <p className="text-[11px] font-semibold text-zinc-300">{editingId ? 'Edit locale' : 'Add locale'}</p>

              {/* Quick presets */}
              {isAdding && (
                <div>
                  <p className="text-[10px] text-zinc-500 mb-1.5">Quick add</p>
                  <div className="flex flex-wrap gap-1">
                    {LOCALE_PRESETS.filter(p => !locales.some(l => l.code === p.code)).slice(0, 8).map(preset => (
                      <button
                        key={preset.code}
                        onClick={() => handleSelectPreset(preset)}
                        className={cn(
                          'h-6 px-2 rounded text-[10px] border transition-colors',
                          form.code === preset.code
                            ? 'bg-wf-blue/20 border-wf-blue text-white'
                            : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:text-white hover:border-zinc-500'
                        )}
                      >
                        {preset.flag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-zinc-500">Code</label>
                  <input
                    value={form.code}
                    onChange={e => setForm({ ...form, code: e.target.value })}
                    placeholder="fr"
                    className="w-full h-7 bg-zinc-900 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-700"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500">Label</label>
                  <input
                    value={form.label}
                    onChange={e => setForm({ ...form, label: e.target.value })}
                    placeholder="Francais"
                    className="w-full h-7 bg-zinc-900 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-zinc-500">Hreflang (optional)</label>
                <input
                  value={form.hreflang}
                  onChange={e => setForm({ ...form, hreflang: e.target.value })}
                  placeholder="fr-FR"
                  className="w-full h-7 bg-zinc-900 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-700"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={e => setForm({ ...form, isDefault: e.target.checked })}
                  className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-900 text-wf-blue focus:ring-wf-blue"
                />
                <span className="text-[11px] text-zinc-400">Default locale</span>
              </label>

              <div className="flex gap-2">
                <button
                  onClick={editingId ? handleUpdate : handleAdd}
                  className="flex-1 h-7 bg-wf-blue text-white text-[11px] font-medium rounded hover:bg-wf-blue/90 transition-colors flex items-center justify-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  {editingId ? 'Update' : 'Add'}
                </button>
                <button
                  onClick={resetForm}
                  className="h-7 px-3 bg-zinc-700 text-zinc-300 text-[11px] rounded hover:bg-zinc-600 transition-colors flex items-center justify-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Info section */}
          <div className="flex gap-2 p-3 bg-zinc-800/50 border border-zinc-800 rounded">
            <Info className="w-4 h-4 text-wf-blue shrink-0 mt-0.5" />
            <div className="text-[10px] text-zinc-500 leading-relaxed">
              <p className="font-medium text-zinc-400 mb-1">Translation workflow</p>
              <p>Each page&apos;s content can be translated per locale. Switch the active locale to edit that version of the content. The default locale is used as the fallback when no translation exists.</p>
              <p className="mt-1">Hreflang tags are automatically generated for SEO based on your configured locales.</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
