'use client'
import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { MapContent } from '@/types/sections'
import { elementProps } from '@/lib/elementHelpers'
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'
import type { SectionMeta } from '@/components/sections'

const UNIVERSE_CONFIGS = {
  startup: { bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-indigo-600', cardBg: 'bg-zinc-50 rounded-2xl border border-zinc-100', accent: 'text-indigo-600', link: 'text-indigo-600 hover:text-indigo-800' },
  corporate: { bg: 'bg-slate-900', text: 'text-white', sub: 'text-slate-400', eyebrow: 'text-blue-400', cardBg: 'bg-slate-800 rounded-xl border border-slate-700', accent: 'text-blue-400', link: 'text-blue-400 hover:text-blue-300' },
  luxe: { bg: 'bg-white', text: 'text-zinc-800', sub: 'text-zinc-500', eyebrow: 'text-amber-700', cardBg: 'bg-zinc-50 rounded-xl border border-zinc-200', accent: 'text-amber-700', link: 'text-amber-700 hover:text-amber-800' },
  creative: { bg: 'bg-amber-50', text: 'text-zinc-900', sub: 'text-zinc-600', eyebrow: 'text-zinc-900', cardBg: 'bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]', accent: 'text-zinc-900', link: 'text-zinc-900 hover:text-zinc-700 font-black' },
  ecommerce: { bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-emerald-600', cardBg: 'bg-zinc-50 rounded-2xl border border-zinc-100', accent: 'text-emerald-600', link: 'text-emerald-600 hover:text-emerald-800' },
  glass: { bg: 'bg-zinc-950', text: 'text-white', sub: 'text-zinc-400', eyebrow: 'text-purple-400', cardBg: 'bg-white/5 backdrop-blur-sm rounded-xl border border-white/10', accent: 'text-purple-400', link: 'text-purple-400 hover:text-purple-300' },
} as const

type Universe = keyof typeof UNIVERSE_CONFIGS

function parseVariant(variant: string): { universe: Universe; layout: 'full' | 'info' } {
  const parts = variant.split('-')
  const layout = parts[parts.length - 1] === 'info' ? 'info' : 'full'
  const universe = (parts.slice(0, -1).join('-') || 'startup') as Universe
  return { universe: universe in UNIVERSE_CONFIGS ? universe : 'startup', layout }
}

function buildEmbedUrl(content: MapContent): string | null {
  if (content.embedUrl) return content.embedUrl
  if (content.lat != null && content.lng != null) {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${content.lng - 0.01},${content.lat - 0.01},${content.lng + 0.01},${content.lat + 0.01}&layer=mapnik&marker=${content.lat},${content.lng}`
  }
  if (content.address) {
    const q = encodeURIComponent(content.address)
    return `https://www.openstreetmap.org/export/embed.html?bbox=-180,-90,180,90&layer=mapnik&query=${q}`
  }
  return null
}

function MapEmbed({ url, className }: { url: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { rootMargin: '200px' })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      {visible ? (
        <iframe src={url} className="w-full h-full border-0" loading="lazy" allowFullScreen />
      ) : (
        <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse flex items-center justify-center">
          <MapPin className="w-8 h-8 text-zinc-400" />
        </div>
      )}
    </div>
  )
}

export function MapSection({ config }: { config: SectionConfig; isEditing?: boolean }) {
  const content = config.content as MapContent
  const { universe, layout } = parseVariant(config.variant || 'startup-full')
  const uConfig = UNIVERSE_CONFIGS[universe]
  const embedUrl = buildEmbedUrl(content)

  return (
    <section className={cn(uConfig.bg, 'py-16 md:py-24')}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        {(content.eyebrow || content.title) && (
          <div className={cn('mb-10', layout === 'info' ? 'text-left' : 'text-center')}>
            {content.eyebrow && (
              <span {...elementProps(config.id, 'eyebrow', 'text')} className={cn('text-xs font-semibold uppercase tracking-widest', uConfig.eyebrow)}>
                {content.eyebrow}
              </span>
            )}
            {content.title && (
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn('text-3xl md:text-4xl font-bold mt-3', uConfig.text)}>
                {content.title}
              </h2>
            )}
            {content.subtitle && (
              <p {...elementProps(config.id, 'subtitle', 'text')} className={cn('mt-4 text-lg', uConfig.sub)}>
                {content.subtitle}
              </p>
            )}
          </div>
        )}

        {layout === 'info' ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Map 60% */}
            <div className="md:col-span-3">
              {embedUrl ? (
                <MapEmbed url={embedUrl} className="w-full h-[400px] rounded-xl overflow-hidden" />
              ) : (
                <div className="w-full h-[400px] bg-zinc-200 dark:bg-zinc-800 rounded-xl flex items-center justify-center">
                  <MapPin className="w-10 h-10 text-zinc-400" />
                </div>
              )}
            </div>
            {/* Info 40% */}
            <div className={cn('md:col-span-2 p-6 space-y-5', uConfig.cardBg)}>
              {content.address && (
                <div className="flex gap-3">
                  <MapPin className={cn('w-5 h-5 shrink-0 mt-0.5', uConfig.accent)} />
                  <div>
                    <p className={cn('text-sm font-medium', uConfig.text)}>Adresse</p>
                    <p className={cn('text-sm', uConfig.sub)}>{content.address}</p>
                  </div>
                </div>
              )}
              {content.phone && (
                <div className="flex gap-3">
                  <Phone className={cn('w-5 h-5 shrink-0 mt-0.5', uConfig.accent)} />
                  <div>
                    <p className={cn('text-sm font-medium', uConfig.text)}>Telephone</p>
                    <p className={cn('text-sm', uConfig.sub)}>{content.phone}</p>
                  </div>
                </div>
              )}
              {content.hours && (
                <div className="flex gap-3">
                  <Clock className={cn('w-5 h-5 shrink-0 mt-0.5', uConfig.accent)} />
                  <div>
                    <p className={cn('text-sm font-medium', uConfig.text)}>Horaires</p>
                    <p className={cn('text-sm', uConfig.sub)}>{content.hours}</p>
                  </div>
                </div>
              )}
              {content.linkLabel && (
                <a href={content.linkHref ?? '#'} className={cn('inline-flex items-center gap-1.5 text-sm font-medium transition-colors mt-2', uConfig.link)}>
                  <ExternalLink className="w-4 h-4" />
                  {content.linkLabel}
                </a>
              )}
            </div>
          </div>
        ) : (
          embedUrl ? (
            <MapEmbed url={embedUrl} className="w-full h-[450px] rounded-xl overflow-hidden" />
          ) : (
            <div className="w-full h-[450px] bg-zinc-200 dark:bg-zinc-800 rounded-xl flex items-center justify-center">
              <MapPin className="w-10 h-10 text-zinc-400" />
            </div>
          )
        )}
      </div>
    </section>
  )
}

export const mapMeta: SectionMeta = {
  type: 'map',
  label: 'Carte',
  icon: '🗺️',
  variants: [
    'startup-full', 'startup-info',
    'corporate-full', 'corporate-info',
    'luxe-full', 'luxe-info',
    'creative-full', 'creative-info',
    'ecommerce-full', 'ecommerce-info',
    'glass-full', 'glass-info',
  ],
  defaultVariant: 'startup-info',
  defaultContent: {},
}
