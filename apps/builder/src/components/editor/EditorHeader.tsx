'use client'
import Link from 'next/link'
import { useEditorStore } from '@/store/editorStore'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft, Globe, Loader2, Palette, Sparkles, LayoutTemplate,
  Eye, EyeOff, ChevronDown, Home, FileText, Plus, Settings, Search,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { BrandPanel } from './brand/BrandPanel'
import { CRMPanel } from '@/components/crm/CRMPanel'
import { CmsPanel } from './panels/CmsPanel'
import { AIPanel } from '@/components/ai/AIPanel'
import { TemplatesModal } from './TemplatesModal'
import { SEOPanel } from './SEOPanel'
import { LocalizationPanel } from './LocalizationPanel'
import { PublishPanel } from './panels/PublishPanel'
import type { PageTemplate } from '@/data/templates'

interface EditorHeaderProps {
  siteName: string
  siteId: string
}

export function EditorHeader({ siteName, siteId }: EditorHeaderProps) {
  const {
    isDirty, isSaving,
    selectedPageId, siteConfig, updatePage, selectPage,
    previewMode, setPreviewMode,
  } = useEditorStore()
  const [brandOpen, setBrandOpen] = useState(false)
  const [crmOpen, setCrmOpen] = useState(false)
  const [cmsOpen, setCmsOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [templatesOpen, setTemplatesOpen] = useState(false)
  const [seoOpen, setSeoOpen] = useState(false)
  const [localizationOpen, setLocalizationOpen] = useState(false)
  const [publishOpen, setPublishOpen] = useState(false)
  const [pagesOpen, setPagesOpen] = useState(false)
  const [pageSearch, setPageSearch] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Focus search when dropdown opens
  useEffect(() => {
    if (pagesOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }
    if (!pagesOpen) setPageSearch('')
  }, [pagesOpen])

  const handleSelectTemplate = (template: PageTemplate) => {
    if (!selectedPageId) return
    const newSections = template.sections.map((s, i) => ({
      ...s,
      id: `section-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 5)}`,
    }))
    updatePage(selectedPageId, { sections: newSections })
    setTemplatesOpen(false)
  }

  const pages = siteConfig?.pages ?? []
  const currentPage = pages.find(p => p.id === selectedPageId)
  const filteredPages = pageSearch
    ? pages.filter(p => p.title.toLowerCase().includes(pageSearch.toLowerCase()))
    : pages
  // Separate utility pages (404, password, etc.) from normal pages
  const normalPages = filteredPages.filter(p => !['404', 'password'].includes(p.slug))
  const utilityPages = filteredPages.filter(p => ['404', 'password'].includes(p.slug))

  return (
    <header className="bg-[#1e1e1e] border-b border-[#2a2a2a] shrink-0 z-10">
      <div className="h-9 flex items-center px-2.5 gap-1.5">
        {/* Left — Back + mode tabs */}
        <div className="flex items-center gap-1 min-w-0">
          <Link href="/">
            <button className="w-7 h-7 flex items-center justify-center rounded text-zinc-400 hover:text-white transition-colors" title={siteName}>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </Link>

          {/* Save indicator */}
          {isSaving ? (
            <Loader2 className="w-3.5 h-3.5 text-zinc-400 animate-spin mx-1" />
          ) : isDirty ? (
            <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0 mx-1" title="Non sauvegardé" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 mx-1" title="Sauvegardé" />
          )}

          <div className="w-px h-4 bg-zinc-700/50 mx-1" />

          {/* Mode tabs */}
          <button className="h-6 px-2.5 rounded text-xs font-medium bg-[#303030] text-white transition-colors">
            Design
          </button>
          <button
            onClick={() => setCmsOpen(true)}
            className="h-6 px-2.5 rounded text-xs font-medium text-zinc-400 hover:text-white hover:bg-[#303030] transition-colors"
          >
            CMS
          </button>
          <button
            onClick={() => setAiOpen(true)}
            className="h-6 px-2.5 rounded text-xs font-medium text-zinc-400 hover:text-white hover:bg-[#303030] transition-colors"
          >
            App Gen
          </button>
          <button
            onClick={() => setSeoOpen(true)}
            className="h-6 px-2.5 rounded text-xs font-medium text-zinc-400 hover:text-white hover:bg-[#303030] transition-colors"
          >
            Insights
          </button>
        </div>

        {/* Center — Page dropdown (like Webflow) */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            <div className="flex items-center gap-3">
              {/* Globe icon — opens localization panel */}
              <button
                onClick={() => setLocalizationOpen(true)}
                className="w-7 h-7 flex items-center justify-center rounded text-zinc-500 hover:text-white hover:bg-[#303030] transition-colors"
                title="Localization"
              >
                <Globe className="w-4 h-4" />
              </button>

              <div className="w-px h-4 bg-zinc-700/50" />

              {/* Page name button */}
              <button
                onClick={() => setPagesOpen(!pagesOpen)}
                className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-zinc-500" />
                <span className="font-medium">{currentPage?.title ?? 'Page'}</span>
                <ChevronDown className="w-3 h-3 text-zinc-500" />
              </button>
            </div>

            {/* Pages dropdown */}
            {pagesOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setPagesOpen(false)} />
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[280px] bg-[#2d2d2d] border border-[#4a4a4a] rounded-lg shadow-2xl z-50 overflow-hidden">
                  {/* Current page */}
                  <div className="px-3 pt-3 pb-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider">Current page</span>
                      <button className="w-5 h-5 flex items-center justify-center rounded text-zinc-500 hover:text-white hover:bg-[#303030] transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {currentPage && (
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-[#4a4a4a]/50">
                        <Home className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="text-xs text-zinc-200 flex-1 truncate">{currentPage.title}</span>
                        <button className="w-5 h-5 flex items-center justify-center rounded text-zinc-500 hover:text-white transition-colors">
                          <Settings className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Search */}
                  <div className="px-3 py-2">
                    <div className="flex items-center gap-2 h-7 bg-[#1e1e1e] border border-[#4a4a4a] focus-within:border-wf-blue rounded px-2 transition-colors">
                      <Search className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <input
                        ref={searchInputRef}
                        value={pageSearch}
                        onChange={(e) => setPageSearch(e.target.value)}
                        placeholder="Search pages and folders"
                        className="flex-1 bg-transparent text-xs text-zinc-200 placeholder:text-zinc-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Pages list */}
                  {normalPages.length > 0 && (
                    <div className="px-3 pb-1">
                      <span className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider">Pages</span>
                      <div className="mt-1">
                        {normalPages.map(page => (
                          <button
                            key={page.id}
                            onClick={() => { selectPage(page.id); setPagesOpen(false) }}
                            className={cn(
                              'w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors',
                              page.id === selectedPageId
                                ? 'bg-wf-blue text-white'
                                : 'text-zinc-300 hover:bg-[#303030]/60 hover:text-white'
                            )}
                          >
                            <Home className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{page.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Utility pages */}
                  {utilityPages.length > 0 && (
                    <div className="px-3 pb-1">
                      <span className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider">Utility pages</span>
                      <div className="mt-1">
                        {utilityPages.map(page => (
                          <button
                            key={page.id}
                            onClick={() => { selectPage(page.id); setPagesOpen(false) }}
                            className={cn(
                              'w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors',
                              page.id === selectedPageId
                                ? 'bg-wf-blue text-white'
                                : 'text-zinc-300 hover:bg-[#303030]/60 hover:text-white'
                            )}
                          >
                            <FileText className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{page.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Manage all pages */}
                  <div className="border-t border-[#4a4a4a] px-3 py-2">
                    <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-zinc-400 hover:text-white hover:bg-[#303030]/60 transition-colors">
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      Manage all pages
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right — Preview + tools + Share + Publish */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            title={previewMode ? 'Quitter la preview' : 'Preview'}
            className={cn(
              'w-7 h-7 flex items-center justify-center rounded transition-colors',
              previewMode
                ? 'bg-wf-blue text-white'
                : 'text-zinc-400 hover:text-white hover:bg-[#303030]'
            )}
          >
            {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setTemplatesOpen(true)}
            className="w-7 h-7 flex items-center justify-center rounded text-zinc-400 hover:text-white hover:bg-[#303030] transition-colors"
            title="Templates"
          >
            <LayoutTemplate className="w-4 h-4" />
          </button>
          <button
            onClick={() => setBrandOpen(true)}
            className="w-7 h-7 flex items-center justify-center rounded text-zinc-400 hover:text-white hover:bg-[#303030] transition-colors"
            title="Brand"
          >
            <Palette className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-zinc-700/50 mx-0.5" />

          <button className="h-7 px-3 rounded text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#303030] transition-colors">
            Share
          </button>

          <Button
            size="sm"
            onClick={() => setPublishOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white h-7 text-[11px] gap-1 px-3 rounded"
          >
            Publish
            <ChevronDown className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <BrandPanel open={brandOpen} onClose={() => setBrandOpen(false)} />
      <CRMPanel open={crmOpen} onClose={() => setCrmOpen(false)} siteId={siteId} />
      {cmsOpen && createPortal(
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCmsOpen(false)} />
          <div className="relative ml-auto w-[420px] h-full bg-zinc-900 border-l border-zinc-800 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 shrink-0">
              <span className="text-sm font-medium text-white">CMS — Collections</span>
              <button onClick={() => setCmsOpen(false)} className="text-zinc-400 hover:text-white text-xs">✕</button>
            </div>
            <div className="flex-1 overflow-auto">
              <CmsPanel />
            </div>
          </div>
        </div>,
        document.body
      )}
      <AIPanel open={aiOpen} onClose={() => setAiOpen(false)} />
      {templatesOpen && (
        <TemplatesModal
          onSelect={handleSelectTemplate}
          onClose={() => setTemplatesOpen(false)}
        />
      )}
      <SEOPanel open={seoOpen} onClose={() => setSeoOpen(false)} />
      <LocalizationPanel open={localizationOpen} onClose={() => setLocalizationOpen(false)} />
      <PublishPanel open={publishOpen} onClose={() => setPublishOpen(false)} />
    </header>
  )
}
