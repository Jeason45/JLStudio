'use client'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useEditorStore } from '@/store/editorStore'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

interface SEOPanelProps {
  open: boolean
  onClose: () => void
}

export function SEOPanel({ open, onClose }: SEOPanelProps) {
  const { siteConfig, selectedPageId, updatePage } = useEditorStore()
  const page = siteConfig?.pages.find(p => p.id === selectedPageId)
  const seo = page?.seo ?? { title: '', description: '' }

  const update = (field: string, value: string | boolean) => {
    if (!selectedPageId) return
    updatePage(selectedPageId, { seo: { ...seo, [field]: value } })
  }

  const metaTitle = seo.metaTitle || page?.title || ''
  const metaDescription = seo.metaDescription || ''
  const titleLength = metaTitle.length
  const descLength = metaDescription.length

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-96 bg-zinc-900 border-zinc-800 text-white p-0 flex flex-col">
        <SheetHeader className="px-5 py-4 border-b border-zinc-800 shrink-0">
          <SheetTitle className="text-white text-sm flex items-center gap-2">
            <Search className="w-4 h-4 text-green-400" />
            SEO — {page?.title ?? 'Page'}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">

          {/* Google preview */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Aperçu Google</p>
            <div className="bg-white rounded-xl p-4 space-y-1">
              <p className="text-xs text-zinc-500">https://monsite.fr/{page?.slug ?? ''}</p>
              <p className="text-sm font-medium text-blue-600 truncate">{metaTitle || 'Titre de la page'}</p>
              <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2">
                {metaDescription || 'La meta description apparaîtra ici. Rédigez une description accrocheuse pour inciter les internautes à cliquer.'}
              </p>
            </div>
          </div>

          {/* Meta title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Meta Titre</label>
              <span className={cn('text-xs', titleLength > 60 ? 'text-red-400' : titleLength > 50 ? 'text-amber-400' : 'text-green-400')}>
                {titleLength}/60
              </span>
            </div>
            <input value={metaTitle} onChange={e => update('metaTitle', e.target.value)}
              placeholder={page?.title}
              className="w-full h-9 bg-zinc-800 border border-zinc-700 text-white text-xs rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
            <p className="text-xs text-zinc-600 mt-1">Idéalement entre 50 et 60 caractères</p>
          </div>

          {/* Meta description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Meta Description</label>
              <span className={cn('text-xs', descLength > 160 ? 'text-red-400' : descLength > 140 ? 'text-amber-400' : 'text-green-400')}>
                {descLength}/160
              </span>
            </div>
            <textarea value={metaDescription} onChange={e => update('metaDescription', e.target.value)}
              rows={3} placeholder="Décrivez cette page en 1-2 phrases..."
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wf-blue resize-none" />
            <p className="text-xs text-zinc-600 mt-1">Idéalement entre 120 et 160 caractères</p>
          </div>

          {/* OG Image */}
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">Image de partage (OG Image)</label>
            <input value={seo.ogImage ?? ''} onChange={e => update('ogImage', e.target.value)}
              placeholder="https://monsite.fr/og-image.jpg"
              className="w-full h-9 bg-zinc-800 border border-zinc-700 text-white text-xs rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
            <p className="text-xs text-zinc-600 mt-1">Recommandé : 1200x630px</p>
          </div>

          {/* Slug */}
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">Slug URL</label>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-600">/</span>
              <input value={page?.slug ?? ''} onChange={e => {
                if (!selectedPageId) return
                updatePage(selectedPageId, { slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })
              }}
                placeholder="ma-page"
                className="flex-1 h-9 bg-zinc-800 border border-zinc-700 text-white text-xs rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
            </div>
          </div>

          {/* Canonical URL */}
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">URL canonique</label>
            <input value={seo.canonicalUrl ?? ''} onChange={e => update('canonicalUrl', e.target.value)}
              placeholder="https://monsite.fr/ma-page"
              className="w-full h-9 bg-zinc-800 border border-zinc-700 text-white text-xs rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
            <p className="text-xs text-zinc-600 mt-1">{'Injecte <link rel="canonical"> dans le <head>. Laissez vide pour utiliser l\'URL par defaut.'}</p>
          </div>

          {/* No index */}
          <div className="flex items-center justify-between py-3 border-t border-zinc-800">
            <div>
              <p className="text-xs font-medium text-white">Masquer des moteurs de recherche</p>
              <p className="text-xs text-zinc-500 mt-0.5">Ajoute noindex à cette page</p>
            </div>
            <button onClick={() => update('noIndex', !seo.noIndex)}
              className={cn('w-10 h-5 rounded-full transition-colors relative', seo.noIndex ? 'bg-red-500' : 'bg-zinc-700')}>
              <div className={cn('absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform', seo.noIndex ? 'translate-x-5' : 'translate-x-0.5')} />
            </button>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  )
}
