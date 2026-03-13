'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { getSectionMeta } from '@/components/sections'
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
  DEFAULT_TABS_CONTENT, DEFAULT_ACCORDION_CONTENT, DEFAULT_SLIDER_CONTENT,
  DEFAULT_LIGHTBOX_CONTENT, DEFAULT_VIDEO_CONTENT,
  DEFAULT_DROPDOWN_CONTENT, DEFAULT_NAVBAR_ADVANCED_CONTENT, DEFAULT_QUICK_STACK_CONTENT,
  DEFAULT_MAP_CONTENT, DEFAULT_SEARCH_CONTENT,
} from '@/types/sections'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEFAULT_CONTENTS: Record<string, any> = {
  hero: DEFAULT_HERO_CONTENT, features: DEFAULT_FEATURES_CONTENT, cta: DEFAULT_CTA_CONTENT,
  stats: DEFAULT_STATS_CONTENT, testimonials: DEFAULT_TESTIMONIALS_CONTENT,
  pricing: DEFAULT_PRICING_CONTENT, faq: DEFAULT_FAQ_CONTENT, contact: DEFAULT_CONTACT_CONTENT,
  logos: DEFAULT_LOGOS_CONTENT, team: DEFAULT_TEAM_CONTENT, 'blog-grid': DEFAULT_BLOG_GRID_CONTENT,
  timeline: DEFAULT_TIMELINE_CONTENT, steps: DEFAULT_STEPS_CONTENT,
  'image-text': DEFAULT_IMAGE_TEXT_CONTENT, 'gallery-grid': DEFAULT_GALLERY_CONTENT,
  'product-grid': DEFAULT_PRODUCT_GRID_CONTENT, newsletter: DEFAULT_NEWSLETTER_CONTENT,
  'site-header': DEFAULT_SITE_HEADER_CONTENT, 'site-footer': DEFAULT_SITE_FOOTER_CONTENT,
  'comparison-table': DEFAULT_COMPARISON_CONTENT, custom: {},
  tabs: DEFAULT_TABS_CONTENT, accordion: DEFAULT_ACCORDION_CONTENT, slider: DEFAULT_SLIDER_CONTENT,
  lightbox: DEFAULT_LIGHTBOX_CONTENT, video: DEFAULT_VIDEO_CONTENT,
  dropdown: DEFAULT_DROPDOWN_CONTENT, 'navbar-advanced': DEFAULT_NAVBAR_ADVANCED_CONTENT,
  'quick-stack': DEFAULT_QUICK_STACK_CONTENT, map: DEFAULT_MAP_CONTENT, search: DEFAULT_SEARCH_CONTENT,
}

// Color per category for the sidebar nav (Webflow-like accent)
const CATEGORY_COLORS: Record<string, string> = {
  structure: '#8B8B8B',
  hero: '#E85D75',
  content: '#4A90D9',
  social: '#F5A623',
  conversion: '#7B61FF',
  ecommerce: '#50C878',
  contact: '#3498DB',
  widgets: '#E67E22',
}

const LAYOUT_CATEGORIES = [
  { id: 'structure', label: 'Structure', icon: '🧭', sections: [
    { type: 'site-header', label: 'Navigation' }, { type: 'site-footer', label: 'Footer' }, { type: 'custom', label: 'Blank Section' },
  ]},
  { id: 'hero', label: 'Hero', icon: '⚡', sections: [
    { type: 'hero', label: 'Hero' },
  ]},
  { id: 'content', label: 'Content', icon: '📄', sections: [
    { type: 'features', label: 'Features' }, { type: 'image-text', label: 'Image + Text' },
    { type: 'steps', label: 'Steps' }, { type: 'timeline', label: 'Timeline' },
    { type: 'blog-grid', label: 'Blog Grid' }, { type: 'gallery-grid', label: 'Gallery' },
  ]},
  { id: 'social', label: 'Social Proof', icon: '💬', sections: [
    { type: 'testimonials', label: 'Testimonials' }, { type: 'stats', label: 'Stats' },
    { type: 'logos', label: 'Logo Cloud' }, { type: 'team', label: 'Team' },
  ]},
  { id: 'conversion', label: 'Conversion', icon: '🎯', sections: [
    { type: 'cta', label: 'Call to Action' }, { type: 'pricing', label: 'Pricing' },
    { type: 'newsletter', label: 'Newsletter' }, { type: 'comparison-table', label: 'Comparison' },
  ]},
  { id: 'ecommerce', label: 'E-commerce', icon: '🛍️', sections: [
    { type: 'product-grid', label: 'Products' },
  ]},
  { id: 'contact', label: 'Contact', icon: '📞', sections: [
    { type: 'contact', label: 'Contact' }, { type: 'faq', label: 'FAQ' },
  ]},
  { id: 'widgets', label: 'Widgets', icon: '📑', sections: [
    { type: 'tabs', label: 'Tabs' }, { type: 'accordion', label: 'Accordion' },
    { type: 'slider', label: 'Slider' }, { type: 'lightbox', label: 'Lightbox' },
    { type: 'video', label: 'Video' }, { type: 'dropdown', label: 'Dropdown' },
    { type: 'navbar-advanced', label: 'Advanced Navbar' }, { type: 'quick-stack', label: 'Quick Stack' },
    { type: 'map', label: 'Map' }, { type: 'search', label: 'Search' },
  ]},
]

interface AddLayoutModalProps {
  onClose: () => void
}

export function AddLayoutModal({ onClose }: AddLayoutModalProps) {
  const [activeCategory, setActiveCategory] = useState('hero')
  const [mounted, setMounted] = useState(false)
  const { selectedPageId, addSection } = useEditorStore()

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  const category = LAYOUT_CATEGORIES.find(c => c.id === activeCategory) ?? LAYOUT_CATEGORIES[1]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddSection = (type: string, variant: string) => {
    if (!selectedPageId) return
    const meta = getSectionMeta(type)
    addSection(selectedPageId, {
      id: `section-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      variant: variant ?? meta?.defaultVariant ?? 'default',
      content: (DEFAULT_CONTENTS[type] ?? {}) as Record<string, any>,
      style: { background: 'white', paddingY: 'lg' },
      visible: true,
    })
    onClose()
  }

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-150" onClick={onClose} />
      <div className="relative bg-[#2b2b2b] border border-zinc-700/50 rounded-xl w-full max-w-5xl h-[80vh] flex shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">

        {/* Left sidebar — category navigation */}
        <div className="w-[200px] bg-[#232323] border-r border-zinc-700/50 flex flex-col shrink-0">
          <div className="px-4 py-4 border-b border-zinc-700/50">
            <h2 className="text-sm font-semibold text-white">Add Layout</h2>
          </div>
          <div className="flex-1 overflow-y-auto py-2 dark-scrollbar">
            {LAYOUT_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-4 py-2 text-left text-[13px] transition-colors',
                  activeCategory === cat.id
                    ? 'bg-[#3a3a3a] text-white font-medium'
                    : 'text-zinc-400 hover:text-white hover:bg-[#2f2f2f]'
                )}
              >
                <span className="text-base leading-none">{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="ml-auto text-[11px] text-zinc-600">{cat.sections.length}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right content — variant previews */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-700/50 shrink-0">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[category.id] ?? '#666' }}
              />
              <h3 className="text-[13px] font-semibold text-white">{category.label}</h3>
              <span className="text-[11px] text-zinc-500">
                {category.sections.length} section{category.sections.length > 1 ? 's' : ''}
              </span>
            </div>
            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sections grid */}
          <div className="flex-1 overflow-y-auto p-5 dark-scrollbar">
            <div className="space-y-6">
              {category.sections.map(section => {
                const variants = SECTION_VARIANTS[section.type] ?? [{ id: 'default', label: 'Default', description: '', previewStyle: { background: 'white', paddingY: 'md' } }]
                const defaultContent = (DEFAULT_CONTENTS[section.type] ?? {}) as Record<string, unknown>

                return (
                  <div key={section.type}>
                    <h4 className="text-[12px] font-semibold text-zinc-300 mb-3">{section.label}</h4>
                    <div className={cn('grid gap-3',
                      variants.length === 1 ? 'grid-cols-1 max-w-sm' :
                      variants.length <= 4 ? 'grid-cols-2' :
                      'grid-cols-2 xl:grid-cols-3'
                    )}>
                      {variants.map(v => (
                        <button
                          key={v.id}
                          onClick={() => handleAddSection(section.type, v.id)}
                          className="group flex flex-col rounded-lg border border-zinc-700/50 overflow-hidden text-left transition-all hover:border-wf-blue hover:shadow-lg hover:shadow-wf-blue/10 hover:scale-[1.01]"
                        >
                          <div className="relative overflow-hidden bg-white">
                            <MiniSectionPreview
                              sectionType={section.type}
                              variant={v.id}
                              content={defaultContent}
                              style={v.previewStyle ?? { background: 'white', paddingY: 'md' }}
                            />
                            <div className="absolute inset-0 bg-transparent group-hover:bg-wf-blue/10 transition-colors" />
                          </div>
                          <div className="px-3 py-2 bg-[#333] border-t border-zinc-700/50 group-hover:bg-[#3a3a3a] transition-colors">
                            <p className="text-[11px] font-medium text-zinc-300 group-hover:text-white truncate">{v.label}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
