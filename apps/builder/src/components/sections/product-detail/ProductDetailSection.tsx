'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { ProductDetailContent } from '@/types/sections'
import { formatPrice } from '@/types/ecommerce'
import { ShoppingCart, ChevronLeft, ChevronRight, Shield, Truck, RotateCcw } from 'lucide-react'
import { elementProps } from '@/lib/elementHelpers'

interface Props {
  config: SectionConfig
  isEditing?: boolean
}

const UNIVERSES: Record<string, { bg: string; card: string; accent: string; text: string; muted: string; badge: string; btn: string; border: string }> = {
  startup: { bg: 'bg-white', card: 'bg-gray-50', accent: 'text-blue-600', text: 'text-gray-900', muted: 'text-gray-500', badge: 'bg-blue-100 text-blue-700', btn: 'bg-blue-600 hover:bg-blue-700 text-white', border: 'border-gray-200' },
  corporate: { bg: 'bg-slate-50', card: 'bg-white', accent: 'text-indigo-600', text: 'text-slate-900', muted: 'text-slate-500', badge: 'bg-indigo-100 text-indigo-700', btn: 'bg-indigo-600 hover:bg-indigo-700 text-white', border: 'border-slate-200' },
  luxe: { bg: 'bg-stone-950', card: 'bg-stone-900', accent: 'text-amber-400', text: 'text-white', muted: 'text-stone-400', badge: 'bg-amber-900/50 text-amber-400', btn: 'bg-amber-500 hover:bg-amber-600 text-black', border: 'border-stone-700' },
  creative: { bg: 'bg-fuchsia-50', card: 'bg-white', accent: 'text-fuchsia-600', text: 'text-gray-900', muted: 'text-gray-500', badge: 'bg-fuchsia-100 text-fuchsia-700', btn: 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white', border: 'border-fuchsia-200' },
  ecommerce: { bg: 'bg-white', card: 'bg-gray-50', accent: 'text-emerald-600', text: 'text-gray-900', muted: 'text-gray-500', badge: 'bg-emerald-100 text-emerald-700', btn: 'bg-emerald-600 hover:bg-emerald-700 text-white', border: 'border-gray-200' },
  glass: { bg: 'bg-gray-900/80 backdrop-blur-xl', card: 'bg-white/5 backdrop-blur', accent: 'text-cyan-400', text: 'text-white', muted: 'text-gray-400', badge: 'bg-cyan-900/50 text-cyan-400', btn: 'bg-cyan-500 hover:bg-cyan-600 text-white', border: 'border-white/10' },
}

const TRUST_ICONS = [Truck, RotateCcw, Shield]

export function ProductDetailSection({ config, isEditing }: Props) {
  const content = config.content as ProductDetailContent
  const variant = config.variant || 'startup-split'
  const [universe, layout] = variant.split('-') as [string, string]
  const u = UNIVERSES[universe] || UNIVERSES.startup
  const [activeImage, setActiveImage] = useState(0)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})

  const images = content.images?.length ? content.images : ['/placeholder-product.jpg']
  const currency = 'EUR'

  const handlePrev = () => setActiveImage(i => (i > 0 ? i - 1 : images.length - 1))
  const handleNext = () => setActiveImage(i => (i < images.length - 1 ? i + 1 : 0))

  const galleryContent = (
    <div className="relative aspect-square overflow-hidden rounded-xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...elementProps(config.id, `images.${activeImage}`, 'image')}
        src={images[activeImage]}
        alt={content.name}
        className="w-full h-full object-cover"
      />
      {images.length > 1 && (
        <>
          <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center">
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
      {content.badge && (
        <span {...elementProps(config.id, 'badge', 'badge')} className={cn('absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium', u.badge)}>
          {content.badge}
        </span>
      )}
    </div>
  )

  const thumbnails = images.length > 1 && (
    <div className="flex gap-2 mt-3">
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => setActiveImage(i)}
          className={cn(
            'w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors',
            i === activeImage ? 'border-current ' + u.accent : u.border + ' opacity-60',
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt="" className="w-full h-full object-cover" />
        </button>
      ))}
    </div>
  )

  const infoContent = (
    <div className="flex flex-col gap-4">
      <h1 {...elementProps(config.id, 'name', 'heading')} className={cn('text-3xl font-bold', u.text)}>{content.name}</h1>
      <div className="flex items-center gap-3">
        <span className={cn('text-2xl font-bold', u.accent)}>{formatPrice(content.price, currency)}</span>
        {content.compareAtPrice && content.compareAtPrice > content.price && (
          <span className={cn('text-lg line-through', u.muted)}>{formatPrice(content.compareAtPrice, currency)}</span>
        )}
      </div>
      <p {...elementProps(config.id, 'description', 'text')} className={cn('text-sm leading-relaxed', u.muted)}>{content.description}</p>

      {content.variants?.map(v => (
        <div key={v.id} className="flex flex-col gap-2">
          <span className={cn('text-sm font-medium', u.text)}>{v.label}</span>
          <div className="flex flex-wrap gap-2">
            {v.options.map(opt => (
              <button
                key={opt}
                onClick={() => !isEditing && setSelectedVariants(prev => ({ ...prev, [v.id]: opt }))}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-lg border transition-colors',
                  selectedVariants[v.id] === opt
                    ? u.btn
                    : cn(u.border, u.text, 'hover:opacity-80'),
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-3 mt-2">
        <button {...elementProps(config.id, 'addToCartLabel', 'button')} className={cn('flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors', u.btn)}>
          <ShoppingCart className="w-4 h-4" />
          {content.addToCartLabel}
        </button>
        {content.buyNowLabel && (
          <button {...elementProps(config.id, 'buyNowLabel', 'button')} className={cn('px-6 py-3 rounded-xl font-semibold border transition-colors', u.border, u.text)}>
            {content.buyNowLabel}
          </button>
        )}
      </div>

      {content.trustBadges?.length > 0 && (
        <div className={cn('flex flex-wrap gap-4 mt-4 pt-4 border-t', u.border)}>
          {content.trustBadges.map((badge, i) => {
            const Icon = TRUST_ICONS[i % TRUST_ICONS.length]
            return (
              <div key={i} {...elementProps(config.id, `trustBadges.${i}`, 'text')} className={cn('flex items-center gap-2 text-xs', u.muted)}>
                <Icon className="w-4 h-4" />
                {badge}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )

  if (layout === 'gallery') {
    return (
      <section className={cn('py-16 px-4', u.bg)}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              {galleryContent}
              {thumbnails}
            </div>
            {infoContent}
          </div>
        </div>
      </section>
    )
  }

  // split (default)
  return (
    <section className={cn('py-16 px-4', u.bg)}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          {galleryContent}
          {thumbnails}
        </div>
        {infoContent}
      </div>
    </section>
  )
}

export const productDetailMeta = {
  type: 'product-detail',
  label: 'Fiche Produit',
  icon: '🏷️',
  variants: [
    'startup-split', 'startup-gallery',
    'corporate-split', 'corporate-gallery',
    'luxe-split', 'luxe-gallery',
    'creative-split', 'creative-gallery',
    'ecommerce-split', 'ecommerce-gallery',
    'glass-split', 'glass-gallery',
  ],
  defaultVariant: 'startup-split',
  defaultContent: {},
}
