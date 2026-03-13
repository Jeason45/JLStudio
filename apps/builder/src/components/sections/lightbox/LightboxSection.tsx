'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { LightboxContent, GalleryImage } from '@/types/sections'
import { elementProps } from '@/lib/elementHelpers'
import { Image as ImageIcon } from 'lucide-react'
import { LightboxOverlay } from '@/components/ui/LightboxOverlay'
import type { SectionMeta } from '@/components/sections'

const UNIVERSE_CONFIGS = {
  startup: { bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-indigo-600', cardBg: 'bg-zinc-100', hoverOverlay: 'bg-indigo-600/40', captionText: 'text-white' },
  corporate: { bg: 'bg-slate-900', text: 'text-white', sub: 'text-slate-400', eyebrow: 'text-blue-400', cardBg: 'bg-slate-800', hoverOverlay: 'bg-blue-900/60', captionText: 'text-white' },
  luxe: { bg: 'bg-white', text: 'text-zinc-800', sub: 'text-zinc-500', eyebrow: 'text-amber-700', cardBg: 'bg-zinc-50', hoverOverlay: 'bg-black/40', captionText: 'text-white' },
  creative: { bg: 'bg-amber-50', text: 'text-zinc-900', sub: 'text-zinc-600', eyebrow: 'text-zinc-900', cardBg: 'bg-white border-2 border-zinc-900', hoverOverlay: 'bg-yellow-400/60', captionText: 'text-zinc-900' },
  ecommerce: { bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-emerald-600', cardBg: 'bg-zinc-50', hoverOverlay: 'bg-emerald-600/40', captionText: 'text-white' },
  glass: { bg: 'bg-zinc-950', text: 'text-white', sub: 'text-zinc-400', eyebrow: 'text-purple-400', cardBg: 'bg-white/5 border border-white/10', hoverOverlay: 'bg-purple-600/40', captionText: 'text-white' },
} as const

type Universe = keyof typeof UNIVERSE_CONFIGS

function parseVariant(variant: string): { universe: Universe; layout: 'grid' | 'masonry' } {
  const parts = variant.split('-')
  const layout = parts[parts.length - 1] === 'masonry' ? 'masonry' : 'grid'
  const universe = (parts.slice(0, -1).join('-') || 'startup') as Universe
  return { universe: universe in UNIVERSE_CONFIGS ? universe : 'startup', layout }
}

export function LightboxSection({ config }: { config: SectionConfig; isEditing?: boolean }) {
  const content = config.content as LightboxContent
  const { universe, layout } = parseVariant(config.variant || 'startup-grid')
  const uConfig = UNIVERSE_CONFIGS[universe]
  const images = content.images ?? []
  const columns = content.columns ?? 3
  const gap = content.gap ?? 4
  const showCaptions = content.showCaptions ?? true

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const validImages = images.filter(img => img.src)

  if (images.length === 0) return null

  const gridCols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }
  const gapClass = { 2: 'gap-2', 4: 'gap-4', 6: 'gap-6', 8: 'gap-8' }

  return (
    <section className={cn(uConfig.bg, 'py-16 md:py-24')}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        {(content.eyebrow || content.title) && (
          <div className="text-center mb-10">
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
              <p {...elementProps(config.id, 'subtitle', 'text')} className={cn('mt-4 text-lg max-w-2xl mx-auto', uConfig.sub)}>
                {content.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Grid / Masonry */}
        {layout === 'masonry' ? (
          <div className={cn('columns-2 lg:columns-3', gapClass[gap as keyof typeof gapClass] ?? 'gap-4')}>
            {images.map((img, i) => (
              <ImageCard key={img.id} img={img} index={i} uConfig={uConfig} sectionId={config.id} showCaptions={showCaptions} onClick={() => img.src && setOpenIndex(i)} isMasonry />
            ))}
          </div>
        ) : (
          <div className={cn('grid', gridCols[columns as keyof typeof gridCols] ?? 'sm:grid-cols-2 lg:grid-cols-3', gapClass[gap as keyof typeof gapClass] ?? 'gap-4')}>
            {images.map((img, i) => (
              <ImageCard key={img.id} img={img} index={i} uConfig={uConfig} sectionId={config.id} showCaptions={showCaptions} onClick={() => img.src && setOpenIndex(i)} />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox overlay */}
      {openIndex !== null && validImages.length > 0 && (
        <LightboxOverlay
          images={validImages.map(img => ({ src: img.src, alt: img.alt, caption: img.caption }))}
          initialIndex={Math.min(openIndex, validImages.length - 1)}
          onClose={() => setOpenIndex(null)}
          enableZoom={content.enableZoom ?? true}
          enableKeyboard={content.enableKeyboard ?? true}
        />
      )}
    </section>
  )
}

function ImageCard({ img, index, uConfig, sectionId, showCaptions, onClick, isMasonry }: {
  img: GalleryImage; index: number; uConfig: typeof UNIVERSE_CONFIGS[Universe]; sectionId: string; showCaptions: boolean; onClick: () => void; isMasonry?: boolean
}) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg cursor-pointer',
        uConfig.cardBg,
        isMasonry && 'mb-4 break-inside-avoid',
      )}
      onClick={onClick}
    >
      {img.src ? (
        <img
          {...elementProps(sectionId, `images.${index}`, 'image')}
          src={img.src}
          alt={img.alt}
          className={cn('w-full object-cover transition-transform duration-300 group-hover:scale-105', !isMasonry && 'aspect-square')}
        />
      ) : (
        <div {...elementProps(sectionId, `images.${index}`, 'image')} className={cn('flex items-center justify-center bg-zinc-200', isMasonry ? 'h-48' : 'aspect-square')}>
          <ImageIcon className="w-10 h-10 text-zinc-400" />
        </div>
      )}
      {/* Hover overlay */}
      <div className={cn('absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end', uConfig.hoverOverlay)}>
        {showCaptions && img.caption && (
          <p className={cn('w-full px-3 py-2 text-xs font-medium', uConfig.captionText)}>{img.caption}</p>
        )}
      </div>
    </div>
  )
}

export const lightboxMeta: SectionMeta = {
  type: 'lightbox',
  label: 'Lightbox',
  icon: '🔍',
  variants: [
    'startup-grid', 'startup-masonry',
    'corporate-grid', 'corporate-masonry',
    'luxe-grid', 'luxe-masonry',
    'creative-grid', 'creative-masonry',
    'ecommerce-grid', 'ecommerce-masonry',
    'glass-grid', 'glass-masonry',
  ],
  defaultVariant: 'startup-grid',
  defaultContent: {},
}
