'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { X, Check } from 'lucide-react'
import { MiniSectionPreview } from './MiniSectionPreview'
import { SECTION_VARIANTS } from '@/components/sections/_variants'

import {
  DEFAULT_HERO_CONTENT, DEFAULT_FEATURES_CONTENT, DEFAULT_CTA_CONTENT,
  DEFAULT_STATS_CONTENT, DEFAULT_TESTIMONIALS_CONTENT, DEFAULT_PRICING_CONTENT,
  DEFAULT_FAQ_CONTENT, DEFAULT_CONTACT_CONTENT, DEFAULT_LOGOS_CONTENT,
  DEFAULT_TEAM_CONTENT, DEFAULT_BLOG_GRID_CONTENT, DEFAULT_TIMELINE_CONTENT,
  DEFAULT_STEPS_CONTENT, DEFAULT_IMAGE_TEXT_CONTENT,
  DEFAULT_GALLERY_CONTENT, DEFAULT_PRODUCT_GRID_CONTENT, DEFAULT_NEWSLETTER_CONTENT,
  DEFAULT_SITE_HEADER_CONTENT, DEFAULT_SITE_FOOTER_CONTENT,
  DEFAULT_COMPARISON_CONTENT,
} from '@/types/sections'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEFAULT_CONTENTS: Record<string, any> = {
  hero: DEFAULT_HERO_CONTENT,
  features: DEFAULT_FEATURES_CONTENT,
  cta: DEFAULT_CTA_CONTENT,
  stats: DEFAULT_STATS_CONTENT,
  testimonials: DEFAULT_TESTIMONIALS_CONTENT,
  pricing: DEFAULT_PRICING_CONTENT,
  faq: DEFAULT_FAQ_CONTENT,
  contact: DEFAULT_CONTACT_CONTENT,
  logos: DEFAULT_LOGOS_CONTENT,
  team: DEFAULT_TEAM_CONTENT,
  'blog-grid': DEFAULT_BLOG_GRID_CONTENT,
  timeline: DEFAULT_TIMELINE_CONTENT,
  steps: DEFAULT_STEPS_CONTENT,
  'image-text': DEFAULT_IMAGE_TEXT_CONTENT,
  'gallery-grid': DEFAULT_GALLERY_CONTENT,
  'product-grid': DEFAULT_PRODUCT_GRID_CONTENT,
  newsletter: DEFAULT_NEWSLETTER_CONTENT,
  'site-header': DEFAULT_SITE_HEADER_CONTENT,
  'site-footer': DEFAULT_SITE_FOOTER_CONTENT,
  'comparison-table': DEFAULT_COMPARISON_CONTENT,
}

interface VariantPickerModalProps {
  sectionType: string
  sectionLabel: string
  sectionIcon: string
  onSelect: (variant: string) => void
  onClose: () => void
}

export function VariantPickerModal({ sectionType, sectionLabel, sectionIcon, onSelect, onClose }: VariantPickerModalProps) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  const variants = SECTION_VARIANTS[sectionType] ?? [{ id: 'default', label: 'Par défaut', description: '', previewStyle: { background: 'white', paddingY: 'md' } }]
  const defaultContent = (DEFAULT_CONTENTS[sectionType] ?? {}) as Record<string, any>

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-150" onClick={onClose} />
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{sectionIcon}</span>
            <div>
              <h2 className="text-white font-semibold">{sectionLabel}</h2>
              <p className="text-xs text-zinc-500">{variants.length} variant{variants.length > 1 ? 's' : ''} — cliquez pour ajouter</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto min-h-0 dark-scrollbar">
          <div className="p-6">
            <div className={cn('grid gap-4',
              variants.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' :
              variants.length === 2 ? 'grid-cols-2' :
              variants.length <= 4 ? 'grid-cols-2 lg:grid-cols-4' :
              'grid-cols-2 lg:grid-cols-3'
            )}>
              {variants.map(v => (
                <button key={v.id} onClick={() => onSelect(v.id)}
                  onMouseEnter={() => setHovered(v.id)} onMouseLeave={() => setHovered(null)}
                  className={cn('group flex flex-col rounded-xl border-2 overflow-hidden text-left transition-all duration-150',
                    hovered === v.id ? 'border-wf-blue shadow-lg shadow-wf-blue/20 scale-[1.02]' : 'border-zinc-700 hover:border-zinc-500'
                  )}>
                  {/* Miniature */}
                  <div className="relative overflow-hidden">
                    <MiniSectionPreview
                      sectionType={sectionType} variant={v.id}
                      content={defaultContent}
                      style={v.previewStyle ?? { background: 'white', paddingY: 'md' }}
                    />
                    {hovered === v.id && (
                      <div className="absolute inset-0 bg-wf-blue/15 flex items-center justify-center">
                        <div className="w-8 h-8 bg-wf-blue rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Label */}
                  <div className={cn('px-3 py-2 border-t transition-colors',
                    hovered === v.id ? 'bg-wf-blue/10 border-wf-blue/30' : 'bg-zinc-800 border-zinc-700'
                  )}>
                    <p className={cn('text-xs font-semibold', hovered === v.id ? 'text-blue-300' : 'text-white')}>{v.label}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{v.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
