'use client'
import { useState, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { X, Search } from 'lucide-react'
import { PAGE_TEMPLATES, UNIVERSE_COLORS, type PageTemplate } from '@/data/templates'
import { MiniSectionPreview } from './MiniSectionPreview'

interface TemplatesModalProps {
  onSelect: (template: PageTemplate) => void
  onClose: () => void
}

const CATEGORIES = [
  { id: 'all', label: 'Tous' },
  { id: 'saas', label: 'SaaS' },
  { id: 'agency', label: 'Agence' },
  { id: 'startup', label: 'Startup' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'blog', label: 'Blog' },
  { id: 'real-estate', label: 'Immobilier' },
  { id: 'photographe', label: 'Photographe' },
  { id: 'coach', label: 'Coach' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'coiffeur', label: 'Coiffeur' },
  { id: 'architecte', label: 'Architecte' },
  { id: 'tatoueur', label: 'Tatoueur' },
  { id: 'beaute', label: 'Beauté' },
  { id: 'dj', label: 'DJ' },
  { id: 'traiteur', label: 'Traiteur' },
  { id: 'agency-models', label: 'Mannequins' },
]

const SECTION_TYPE_LABELS: Record<string, string> = {
  'site-header': 'Header',
  'hero': 'Hero',
  'logos': 'Logos',
  'features': 'Features',
  'stats': 'Stats',
  'testimonials': 'Avis',
  'pricing': 'Pricing',
  'faq': 'FAQ',
  'cta': 'CTA',
  'site-footer': 'Footer',
  'gallery-grid': 'Galerie',
  'blog-grid': 'Blog',
  'newsletter': 'Newsletter',
  'contact': 'Contact',
  'team': 'Équipe',
  'steps': 'Étapes',
  'image-text': 'Image+Texte',
  'product-grid': 'Produits',
}

export function TemplatesModal({ onSelect, onClose }: TemplatesModalProps) {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [hovered, setHovered] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  const filtered = useMemo(() => {
    let list = PAGE_TEMPLATES
    if (category !== 'all') list = list.filter(t => t.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.universe.toLowerCase().includes(q)
      )
    }
    return list
  }, [category, search])

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-150" onClick={onClose} />
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0">
          <div>
            <h2 className="text-white font-semibold">Templates de pages</h2>
            <p className="text-xs text-zinc-500 mt-0.5">{PAGE_TEMPLATES.length} templates disponibles</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search + Filters */}
        <div className="px-6 py-3 border-b border-zinc-800 shrink-0 space-y-2.5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un template..."
              className="w-full pl-9 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-wf-blue"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto dark-scrollbar">
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setCategory(cat.id)}
                className={cn('whitespace-nowrap text-xs px-3 py-1.5 rounded-lg transition-colors',
                  category === cat.id ? 'bg-wf-blue text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                )}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 min-h-0 overflow-y-auto dark-scrollbar">
          <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(template => {
              const universe = UNIVERSE_COLORS[template.universe]
              const sectionTypes = template.sections
                .map(s => SECTION_TYPE_LABELS[s.type] || s.type)
                .filter((v, i, a) => a.indexOf(v) === i)
              // Exclude header/footer from the display list
              const innerSections = sectionTypes.filter(s => s !== 'Header' && s !== 'Footer')

              return (
                <div key={template.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => { setLoadingId(template.id); onSelect(template) }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(template) } }}
                  onMouseEnter={() => setHovered(template.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={cn('group flex flex-col rounded-xl border-2 overflow-hidden text-left transition-all cursor-pointer',
                    loadingId === template.id ? 'border-wf-blue opacity-60 pointer-events-none' :
                    hovered === template.id ? 'border-wf-blue scale-[1.02] shadow-lg shadow-wf-blue/20' : 'border-zinc-700 hover:border-zinc-500'
                  )}>
                  {/* Preview — real mini-render of hero section */}
                  <div className="relative">
                    {loadingId === template.id && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 text-white text-sm font-medium">
                        Création en cours...
                      </div>
                    )}
                    <TemplatePreview template={template} />
                    {/* Universe badge */}
                    <span className={cn('absolute top-2.5 right-2.5 z-10 text-[10px] font-medium px-2 py-0.5 rounded-full', universe.bg, universe.text)}>
                      {universe.label}
                    </span>
                  </div>
                  {/* Info */}
                  <div className={cn('p-4 border-t transition-colors flex-1',
                    hovered === template.id ? 'bg-wf-blue/10 border-wf-blue/30' : 'bg-zinc-800 border-zinc-700'
                  )}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-white">{template.name}</p>
                      <span className="text-[10px] text-zinc-500 shrink-0 ml-2">{template.sections.length} sections</span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-2">{template.description}</p>
                    {/* Section types mini-list */}
                    <div className="flex flex-wrap gap-1">
                      {innerSections.map(s => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-700/50 text-zinc-400">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
            {filtered.length === 0 && (
              <div className="col-span-full py-12 text-center text-zinc-500 text-sm">
                Aucun template trouvé
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

function TemplatePreview({ template }: { template: PageTemplate }) {
  const heroSection = template.sections.find(s => s.type === 'hero')
  if (!heroSection) {
    return (
      <div className={cn('h-36 bg-gradient-to-br flex items-center justify-center', template.preview)}>
        <span className="text-3xl">{template.emoji}</span>
      </div>
    )
  }
  return (
    <MiniSectionPreview
      sectionType={heroSection.type}
      variant={heroSection.variant ?? 'startup'}
      content={heroSection.content}
      style={heroSection.style ?? { background: 'white', paddingY: 'xl' }}
      scale={0.22}
    />
  )
}
