'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Layers, ArrowDown } from 'lucide-react'
import type { LibraryTemplateItem } from '@/types/library'

interface LibraryTemplateCardProps {
  item: LibraryTemplateItem
  onApply: () => void
}

// ─── Section type labels ───

const SECTION_LABELS: Record<string, string> = {
  'site-header': 'Header', hero: 'Hero', 'hero-split': 'Hero Split',
  features: 'Features', testimonials: 'Testimonials', pricing: 'Pricing',
  cta: 'CTA', contact: 'Contact', faq: 'FAQ', gallery: 'Gallery',
  'gallery-grid': 'Gallery', team: 'Team', stats: 'Stats', about: 'About',
  blog: 'Blog', 'blog-grid': 'Blog', logos: 'Logos', newsletter: 'Newsletter',
  'image-text': 'Image + Texte', timeline: 'Timeline', map: 'Map',
  'site-footer': 'Footer', 'product-grid': 'Produits', services: 'Services',
  form: 'Form', custom: 'Custom', 'text-block': 'Texte',
  steps: 'Étapes', slider: 'Slider', accordion: 'Accordion',
  tabs: 'Tabs', search: 'Recherche', 'comparison-table': 'Comparatif',
  video: 'Vidéo', lightbox: 'Lightbox',
}

// ─── Color system — accent per section type ───

const ACCENT: Record<string, string> = {
  hero: '#c8a97e', 'hero-split': '#c8a97e', features: '#818cf8',
  testimonials: '#a78bfa', pricing: '#fbbf24', cta: '#f87171',
  contact: '#34d399', faq: '#22d3ee', gallery: '#f472b6',
  'gallery-grid': '#f472b6', team: '#c4b5fd', stats: '#60a5fa',
  'site-footer': '#a1a1aa', 'site-header': '#d4d4d8', logos: '#cbd5e1',
  newsletter: '#fb923c', 'image-text': '#2dd4bf', 'blog-grid': '#fb923c',
  blog: '#fb923c', timeline: '#c4b5fd', map: '#34d399',
  'product-grid': '#f472b6', services: '#2dd4bf', form: '#34d399',
  steps: '#a78bfa', slider: '#f472b6', accordion: '#22d3ee',
  tabs: '#818cf8', search: '#60a5fa', 'comparison-table': '#fbbf24',
  video: '#f87171', lightbox: '#f472b6',
}

// Background tint per section type (subtle colored bg)
const SECTION_BG: Record<string, string> = {
  hero: 'rgba(200,169,126,0.12)', 'hero-split': 'rgba(200,169,126,0.12)',
  features: 'rgba(129,140,248,0.08)', testimonials: 'rgba(167,139,250,0.08)',
  pricing: 'rgba(251,191,36,0.07)', cta: 'rgba(248,113,113,0.1)',
  contact: 'rgba(52,211,153,0.08)', faq: 'rgba(34,211,238,0.06)',
  gallery: 'rgba(244,114,182,0.08)', 'gallery-grid': 'rgba(244,114,182,0.08)',
  team: 'rgba(196,181,253,0.08)', stats: 'rgba(96,165,250,0.08)',
  'site-footer': 'rgba(161,161,170,0.06)', 'site-header': 'rgba(212,212,216,0.06)',
  logos: 'rgba(203,213,225,0.05)', newsletter: 'rgba(251,146,60,0.08)',
  'image-text': 'rgba(45,212,191,0.07)', 'blog-grid': 'rgba(251,146,60,0.07)',
  blog: 'rgba(251,146,60,0.07)', timeline: 'rgba(196,181,253,0.07)',
  map: 'rgba(52,211,153,0.07)', 'product-grid': 'rgba(244,114,182,0.07)',
  services: 'rgba(45,212,191,0.07)', form: 'rgba(52,211,153,0.07)',
  steps: 'rgba(167,139,250,0.07)', slider: 'rgba(244,114,182,0.07)',
  accordion: 'rgba(34,211,238,0.06)', tabs: 'rgba(129,140,248,0.07)',
  search: 'rgba(96,165,250,0.07)', 'comparison-table': 'rgba(251,191,36,0.06)',
  video: 'rgba(248,113,113,0.07)', lightbox: 'rgba(244,114,182,0.07)',
}

// ─── Mini-section visual renderer (colorful, always visible) ───

function MiniSection({ type, isHovered, content }: { type: string; isHovered: boolean; content?: Record<string, unknown> }) {
  const c = ACCENT[type] || '#a1a1aa'
  const dimC = `${c}99` // 60% alpha

  // Helper: extract short text from content
  const txt = (key: string, fallback: string) => {
    const v = content?.[key]
    if (typeof v === 'string' && v.length > 0) {
      return v.length > 30 ? v.slice(0, 30) + '…' : v
    }
    return fallback
  }

  // Header
  if (type === 'site-header') {
    const logo = txt('logo', 'Brand')
    return (
      <div className="w-full h-full flex items-center justify-between px-2">
        <span className="text-[4px] font-bold truncate" style={{ color: c }}>{logo}</span>
        <div className="flex gap-1">
          {['Home', 'About', 'Contact'].map(l => (
            <span key={l} className="text-[4px]" style={{ color: isHovered ? c : dimC }}>{l}</span>
          ))}
        </div>
        <div className="w-4 h-1.5 rounded-sm border" style={{ borderColor: `${c}60`, backgroundColor: `${c}20` }} />
      </div>
    )
  }

  // Footer
  if (type === 'site-footer') {
    const logo = txt('logo', 'Brand')
    return (
      <div className="w-full h-full flex items-center justify-between px-2">
        <span className="text-[3.5px] font-bold truncate" style={{ color: `${c}70` }}>{logo}</span>
        <span className="text-[4px]" style={{ color: dimC }}>© 2026</span>
        <div className="flex gap-0.5">
          {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${c}40` }} />)}
        </div>
      </div>
    )
  }

  // Hero
  if (type === 'hero' || type === 'hero-split') {
    const title = txt('title', 'Headline Here')
    const eyebrow = txt('eyebrow', '')
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-0.5 px-2">
        {eyebrow && <span className="text-[3px] uppercase tracking-wider" style={{ color: `${c}60` }}>{eyebrow}</span>}
        <span className="text-[5px] font-bold text-center leading-tight truncate w-full" style={{ color: isHovered ? c : dimC }}>{title}</span>
        <div className="w-5 h-1.5 rounded-sm mt-0.5" style={{ backgroundColor: isHovered ? c : `${c}80` }} />
      </div>
    )
  }

  // Features
  if (type === 'features') {
    const items = content?.items as Array<{ title?: string; icon?: string }> | undefined
    const featureNames = items?.slice(0, 3).map(it => it.title ?? 'Feature') ?? ['Feature 1', 'Feature 2', 'Feature 3']
    return (
      <div className="w-full h-full flex items-center justify-center gap-1 px-1.5">
        {featureNames.map((name, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: isHovered ? `${c}50` : `${c}30` }} />
            <span className="text-[3.5px] truncate w-full text-center" style={{ color: dimC }}>{name}</span>
          </div>
        ))}
      </div>
    )
  }

  // Testimonials
  if (type === 'testimonials') {
    const items = content?.items as Array<{ author?: string; quote?: string }> | undefined
    const author = items?.[0]?.author ?? 'Client'
    const quote = items?.[0]?.quote
    const shortQuote = quote ? (quote.length > 35 ? quote.slice(0, 35) + '…' : quote) : 'Great experience...'
    return (
      <div className="w-full h-full flex items-center justify-center gap-1 px-2">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${c}35` }} />
        <div className="flex flex-col gap-0.5 flex-1">
          <span className="text-[3.5px] italic truncate" style={{ color: dimC }}>&ldquo;{shortQuote}&rdquo;</span>
          <span className="text-[3px]" style={{ color: `${c}60` }}>— {author}</span>
        </div>
      </div>
    )
  }

  // Pricing
  if (type === 'pricing') {
    const plans = content?.plans as Array<{ name?: string; price?: string }> | undefined
    const planData = plans?.slice(0, 3) ?? [{ name: 'Basic', price: '$9' }, { name: 'Pro', price: '$29' }, { name: 'Elite', price: '$99' }]
    return (
      <div className="w-full h-full flex items-center justify-center gap-1 px-1.5">
        {planData.map((plan, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5 py-0.5 rounded-sm border" style={{ borderColor: i === 1 ? `${c}60` : `${c}25`, backgroundColor: i === 1 ? `${c}15` : 'transparent' }}>
            <span className="text-[3.5px] truncate" style={{ color: dimC }}>{plan.name ?? 'Plan'}</span>
            <span className="text-[4px] font-bold" style={{ color: isHovered ? c : dimC }}>{plan.price ?? '$X'}</span>
          </div>
        ))}
      </div>
    )
  }

  // CTA
  if (type === 'cta') {
    const title = txt('title', 'Ready to start?')
    return (
      <div className="w-full h-full flex items-center justify-center gap-1.5 px-2">
        <span className="text-[4px] font-semibold flex-1 truncate" style={{ color: isHovered ? c : dimC }}>{title}</span>
        <div className="w-5 h-1.5 rounded-sm" style={{ backgroundColor: isHovered ? c : `${c}70` }} />
      </div>
    )
  }

  // Gallery
  if (type === 'gallery' || type === 'gallery-grid') {
    return (
      <div className="w-full h-full flex items-center justify-center gap-0.5 px-1.5">
        {[1,2,3,4].map(i => (
          <div key={i} className="flex-1 h-[60%] rounded-sm" style={{ backgroundColor: isHovered ? `${c}30` : `${c}18`, border: `1px solid ${c}20` }} />
        ))}
      </div>
    )
  }

  // Stats
  if (type === 'stats') {
    const items = content?.items as Array<{ value?: string; label?: string }> | undefined
    const statData = items?.slice(0, 3) ?? [{ value: '150+', label: 'Clients' }, { value: '99%', label: 'Uptime' }, { value: '24/7', label: 'Support' }]
    return (
      <div className="w-full h-full flex items-center justify-center gap-2 px-2">
        {statData.map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-[5px] font-bold" style={{ color: isHovered ? c : dimC }}>{stat.value ?? '—'}</span>
            <span className="text-[3px] truncate" style={{ color: `${c}60` }}>{stat.label ?? 'Stat'}</span>
          </div>
        ))}
      </div>
    )
  }

  // Contact / Form
  if (type === 'contact' || type === 'form') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-0.5 px-3">
        <span className="text-[4px]" style={{ color: dimC }}>Contact Form</span>
        <div className="w-full h-1 rounded-sm" style={{ backgroundColor: `${c}12`, border: `1px solid ${c}20` }} />
        <div className="w-full h-1 rounded-sm" style={{ backgroundColor: `${c}12`, border: `1px solid ${c}20` }} />
        <div className="w-1/3 h-1.5 rounded-sm" style={{ backgroundColor: isHovered ? `${c}60` : `${c}40` }} />
      </div>
    )
  }

  // Team
  if (type === 'team') {
    return (
      <div className="w-full h-full flex items-center justify-center gap-1.5 px-2">
        {[1,2,3].map(i => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: isHovered ? `${c}40` : `${c}25` }} />
            <span className="text-[3px]" style={{ color: dimC }}>Member {i}</span>
          </div>
        ))}
      </div>
    )
  }

  // Logos
  if (type === 'logos') {
    return (
      <div className="w-full h-full flex items-center justify-center gap-1.5 px-2">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="w-3 h-1.5 rounded-sm" style={{ backgroundColor: isHovered ? `${c}35` : `${c}20` }} />
        ))}
      </div>
    )
  }

  // Newsletter
  if (type === 'newsletter') {
    return (
      <div className="w-full h-full flex items-center justify-center gap-1 px-2">
        <div className="flex-1 h-1.5 rounded-sm" style={{ backgroundColor: `${c}12`, border: `1px solid ${c}20` }} />
        <div className="w-5 h-1.5 rounded-sm" style={{ backgroundColor: isHovered ? `${c}60` : `${c}40` }} />
      </div>
    )
  }

  // Image + Text
  if (type === 'image-text') {
    return (
      <div className="w-full h-full flex items-center justify-center gap-1 px-1.5">
        <div className="flex-1 h-[70%] rounded-sm" style={{ backgroundColor: `${c}15`, border: `1px solid ${c}20` }} />
        <div className="flex-1 flex flex-col gap-0.5">
          <span className="text-[4px] font-semibold" style={{ color: isHovered ? c : dimC }}>Section Title</span>
          <span className="text-[3px]" style={{ color: `${c}60` }}>Description text here...</span>
        </div>
      </div>
    )
  }

  // Blog grid
  if (type === 'blog-grid' || type === 'blog') {
    return (
      <div className="w-full h-full flex items-center justify-center gap-0.5 px-1.5">
        {[1,2,3].map(i => (
          <div key={i} className="flex-1 flex flex-col gap-0.5">
            <div className="w-full h-[40%] rounded-sm" style={{ backgroundColor: isHovered ? `${c}25` : `${c}15` }} />
            <span className="text-[3px]" style={{ color: dimC }}>Article {i}</span>
          </div>
        ))}
      </div>
    )
  }

  // Timeline
  if (type === 'timeline') {
    return (
      <div className="w-full h-full flex items-center justify-center px-2">
        <div className="w-px h-[80%]" style={{ backgroundColor: `${c}40` }} />
        <div className="flex flex-col gap-1 ml-1">
          {[1,2].map(i => (
            <div key={i} className="flex items-center gap-0.5">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: isHovered ? `${c}70` : `${c}50` }} />
              <span className="text-[3px]" style={{ color: dimC }}>Event {i}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Map
  if (type === 'map') {
    return (
      <div className="w-full h-full flex items-center justify-center px-2">
        <div className="w-full h-[70%] rounded-sm flex items-center justify-center" style={{ backgroundColor: `${c}10`, border: `1px solid ${c}20` }}>
          <svg className="w-3 h-3" style={{ color: isHovered ? `${c}90` : `${c}50` }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
        </div>
      </div>
    )
  }

  // Product grid
  if (type === 'product-grid') {
    return (
      <div className="w-full h-full flex items-center justify-center gap-0.5 px-1.5">
        {[1,2,3].map(i => (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
            <div className="w-full h-[45%] rounded-sm" style={{ backgroundColor: isHovered ? `${c}25` : `${c}15` }} />
            <span className="text-[3px]" style={{ color: `${c}60` }}>Product</span>
            <span className="text-[3.5px] font-bold" style={{ color: isHovered ? c : dimC }}>${[29,49,79][i-1]}</span>
          </div>
        ))}
      </div>
    )
  }

  // FAQ
  if (type === 'faq') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-0.5 px-2">
        {[1,2,3].map(i => (
          <div key={i} className="w-full flex items-center justify-between">
            <span className="text-[3.5px]" style={{ color: dimC }}>Question {i} ?</span>
            <span className="text-[5px]" style={{ color: `${c}50` }}>+</span>
          </div>
        ))}
      </div>
    )
  }

  // Services
  if (type === 'services') {
    return (
      <div className="w-full h-full flex items-center justify-center gap-1 px-1.5">
        {[1,2].map(i => (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5 py-0.5 rounded-sm" style={{ border: `1px solid ${c}20` }}>
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: isHovered ? `${c}35` : `${c}20` }} />
            <span className="text-[3px]" style={{ color: dimC }}>Service {i}</span>
          </div>
        ))}
      </div>
    )
  }

  // Steps
  if (type === 'steps') {
    const items = content?.items as Array<{ title?: string }> | undefined
    const stepNames = items?.slice(0, 4).map(it => it.title ?? 'Step') ?? ['Step 1', 'Step 2', 'Step 3']
    return (
      <div className="w-full h-full flex items-center justify-center gap-1 px-1.5">
        {stepNames.map((name, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className="w-2 h-2 rounded-full flex items-center justify-center" style={{ backgroundColor: isHovered ? `${c}50` : `${c}30` }}>
              <span className="text-[4px] font-bold" style={{ color: isHovered ? '#fff' : dimC }}>{i + 1}</span>
            </div>
            <span className="text-[3px] truncate max-w-[20px] text-center" style={{ color: dimC }}>{name}</span>
          </div>
        ))}
      </div>
    )
  }

  // Default fallback
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-[4px]" style={{ color: dimC }}>{SECTION_LABELS[type] || type}</span>
    </div>
  )
}

// ─── Section bg per style background ───

const STYLE_BG: Record<string, string> = {
  dark: '#1a1715', white: '#252220', light: '#2d2a27',
  primary: '#3a2210', gradient: '#2a2030',
  custom: '#242424', 'custom-gradient': '#2a2030',
}

// ─── Padding heights per size ───

const PAD_HEIGHTS: Record<string, number> = {
  none: 0, sm: 6, md: 10, lg: 14, xl: 18,
}

export function LibraryTemplateCard({ item, onApply }: LibraryTemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isWireframe = item.category === 'wireframes'

  return (
    <button
      onClick={onApply}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group flex flex-col rounded-lg border overflow-hidden text-left',
        'transition-all duration-300',
        isHovered
          ? 'border-zinc-500 shadow-lg shadow-black/30 -translate-y-0.5'
          : 'border-zinc-700/40',
      )}
    >
      {/* Visual preview — both modes use colorful mini-section layouts */}
      <div className={cn(
        'relative flex flex-col items-stretch gap-px p-1.5 overflow-hidden',
        isWireframe ? 'h-32 bg-[#1e1c1a]' : 'h-28 bg-[#1e1c1a]',
      )}>
        {item.sections.slice(0, isWireframe ? 8 : 6).map((s, i) => {
          const sType = s.type
          const accent = ACCENT[sType] || '#a1a1aa'
          const sectionBg = SECTION_BG[sType] || 'rgba(161,161,170,0.05)'
          const styleBg = STYLE_BG[s.style.background] || STYLE_BG.white
          const height = isWireframe
            ? Math.max(8, PAD_HEIGHTS[s.style.paddingY] || 10)
            : (i === 0 ? 20 : i === 1 ? 16 : 12)

          return (
            <div
              key={i}
              className={cn(
                'w-full rounded-sm overflow-hidden transition-all duration-300',
                isHovered ? 'brightness-125' : '',
              )}
              style={{
                height: `${height}px`,
                backgroundColor: styleBg,
                backgroundImage: `linear-gradient(${sectionBg}, ${sectionBg})`,
                borderLeft: `2px solid ${accent}`,
              }}
            >
              <MiniSection type={sType} isHovered={isHovered} content={s.content} />
            </div>
          )
        })}

        {/* Remaining sections indicator */}
        {item.sections.length > (isWireframe ? 8 : 6) && (
          <div className="text-[6px] text-zinc-500 text-center py-0.5">
            +{item.sections.length - (isWireframe ? 8 : 6)} more
          </div>
        )}

        {/* Hover overlay with apply button */}
        <div className={cn(
          'absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none',
          isHovered ? 'bg-black/20' : 'bg-transparent',
        )}>
          <div className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 bg-wf-blue rounded-md text-white text-[11px] font-medium transition-all duration-300 pointer-events-auto',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
          )}>
            <ArrowDown className="w-3 h-3" />
            Appliquer
          </div>
        </div>
      </div>

      {/* Info */}
      <div className={cn(
        'px-2.5 py-2 border-t border-zinc-700/40 transition-colors duration-300',
        isHovered ? 'bg-[#333]' : 'bg-[#2a2a2a]',
      )}>
        <p className="text-[11px] font-medium text-zinc-200 truncate">{item.label}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Layers className="w-3 h-3 text-zinc-500" />
          <span className="text-[10px] text-zinc-500">{item.sections.length} sections</span>
          {item.universe && (
            <span className={cn(
              'text-[9px] px-1.5 py-px rounded transition-colors duration-300',
              isHovered ? 'bg-zinc-600/60 text-zinc-300' : 'bg-zinc-700/50 text-zinc-400',
            )}>
              {item.universe}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
