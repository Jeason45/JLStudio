'use client'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { sectionClasses, getTextColorClass, getTitleSizeClass, getTextAlignClass } from '../_utils'
import type { SectionConfig } from '@/types/site'
import type { GalleryContent, GalleryImage } from '@/types/sections'
import { Image, Bed, Bath, Ruler } from 'lucide-react'
import { elementProps } from '@/lib/elementHelpers'
import { LightboxOverlay } from '@/components/ui/LightboxOverlay'
import { BrixsaViewCursor } from '../_BrixsaViewCursor'
import { DecorativeOrnament, FloatingIllustration } from '../_DecorativeOrnament'

export function GallerySection({ config }: { config: SectionConfig }) {
  const content = (config.content ?? {}) as Partial<GalleryContent & { enableLightbox?: boolean }>
  const variant = config.variant ?? 'startup-grid'
  const { accentColor, textColor: customTextColor } = config.style
  const images: GalleryImage[] = content.images ?? []
  const columns = content.columns ?? 3
  const enableLightbox = content.enableLightbox ?? false
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const validImages = images.filter(img => img.src)

  // Parse universe and layout from variant
  const parts = variant.split('-')
  const layout = parts[parts.length - 1] // 'grid' or 'masonry'
  const universe = parts.slice(0, -1).join('-') // handle 'ecommerce' etc.

  const colClass = columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : columns === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'
  const masonryColClass = columns === 2 ? 'columns-2' : columns === 4 ? 'columns-2 sm:columns-4' : 'columns-2 sm:columns-3'

  const getAspect = (i: number) => i % 3 === 0 ? 'aspect-[3/4]' : i % 3 === 1 ? 'aspect-square' : 'aspect-[4/3]'

  // ═══════════════════════════════════════════
  // STARTUP — SaaS / Modern
  // ═══════════════════════════════════════════

  if (universe === 'startup') {
    const accent = accentColor ?? '#6366f1'

    const title = content.title && (
      <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-zinc-900 mb-10 text-center" style={customTextColor ? { color: customTextColor } : undefined}>
        {content.title}
      </h2>
    )

    const imgCard = (img: GalleryImage, aspectClass = 'aspect-square', i = 0) => (
      <div key={img.id} className={cn(aspectClass, 'rounded-2xl overflow-hidden relative group bg-zinc-100 shadow-sm hover:shadow-md transition-shadow')}>
        {img.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img {...elementProps(config.id, `images.${i}.src`, 'image')} src={img.src} alt={img.alt} className="w-full h-full object-cover" />
        ) : (
          <div {...elementProps(config.id, `images.${i}.src`, 'image')} className="w-full h-full flex items-center justify-center">
            <Image className="w-8 h-8 text-zinc-300" />
          </div>
        )}
        {img.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <p {...elementProps(config.id, `images.${i}.caption`, 'text')} className="text-white text-sm font-medium">{img.caption}</p>
          </div>
        )}
      </div>
    )

    if (layout === 'masonry') {
      return (
        <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {title}
            <div className={cn(masonryColClass, 'gap-4 space-y-4')}>
              {images.map((img, i) => (
                <div key={img.id} className="break-inside-avoid rounded-2xl overflow-hidden relative group bg-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                  {img.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img {...elementProps(config.id, `images.${i}.src`, 'image')} src={img.src} alt={img.alt} className={cn('w-full object-cover', getAspect(i))} />
                  ) : (
                    <div {...elementProps(config.id, `images.${i}.src`, 'image')} className={cn('w-full flex items-center justify-center', getAspect(i))}>
                      <Image className="w-8 h-8 text-zinc-300" />
                    </div>
                  )}
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p {...elementProps(config.id, `images.${i}.caption`, 'text')} className="text-white text-sm font-medium">{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Grid
    return (
      <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto px-6">
          {title}
          <div className={cn('grid gap-4', colClass)}>
            {images.map((img, i) => imgCard(img, undefined, i))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CORPORATE — Navy / Professional
  // ═══════════════════════════════════════════

  if (universe === 'corporate') {
    const accent = accentColor ?? '#3b82f6'

    const title = content.title && (
      <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-white mb-10" style={customTextColor ? { color: customTextColor } : undefined}>
        {content.title}
      </h2>
    )

    const imgCard = (img: GalleryImage, aspectClass = 'aspect-square', i = 0) => (
      <div key={img.id} className={cn(aspectClass, 'rounded-xl overflow-hidden relative group bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30 transition-colors')}>
        {img.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img {...elementProps(config.id, `images.${i}.src`, 'image')} src={img.src} alt={img.alt} className="w-full h-full object-cover" />
        ) : (
          <div {...elementProps(config.id, `images.${i}.src`, 'image')} className="w-full h-full flex items-center justify-center">
            <Image className="w-8 h-8 text-white/20" />
          </div>
        )}
        {img.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-3">
            <p {...elementProps(config.id, `images.${i}.caption`, 'text')} className="text-white/80 text-xs font-medium">{img.caption}</p>
          </div>
        )}
      </div>
    )

    if (layout === 'masonry') {
      return (
        <section className="bg-slate-900 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-7xl mx-auto px-6">
            {title}
            <div className={cn(masonryColClass, 'gap-4 space-y-4')}>
              {images.map((img, i) => (
                <div key={img.id} className="break-inside-avoid rounded-xl overflow-hidden relative group bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                  {img.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img {...elementProps(config.id, `images.${i}.src`, 'image')} src={img.src} alt={img.alt} className={cn('w-full object-cover', getAspect(i))} />
                  ) : (
                    <div {...elementProps(config.id, `images.${i}.src`, 'image')} className={cn('w-full flex items-center justify-center', getAspect(i))}>
                      <Image className="w-8 h-8 text-white/20" />
                    </div>
                  )}
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-3">
                      <p {...elementProps(config.id, `images.${i}.caption`, 'text')} className="text-white/80 text-xs font-medium">{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Grid
    return (
      <section className="bg-slate-900 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-7xl mx-auto px-6">
          {title}
          <div className={cn('grid gap-4', colClass)}>
            {images.map((img, i) => imgCard(img, undefined, i))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // LUXE — Gold / Elegant
  // ═══════════════════════════════════════════

  if (universe === 'luxe') {
    const gold = accentColor ?? '#b8860b'
    const hasDecorativeIcon = !!content.decorativeIcon

    const isDarkBg = config.style.background === 'custom' && !!config.style.customBgColor && !['#ffffff', '#fff', '#F8F5EF', '#f8f5ef'].includes(config.style.customBgColor)
    const title = content.title && (
      <div className="text-center mb-14 space-y-4">
        {hasDecorativeIcon && <DecorativeOrnament color={isDarkBg ? '#DEC7A6' : gold} iconUrl={typeof content.decorativeIcon === 'string' && content.decorativeIcon.startsWith('http') ? content.decorativeIcon : undefined} />}
        <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-black tracking-tight", isDarkBg ? "text-white" : "text-zinc-900")} style={customTextColor ? { color: customTextColor } : undefined}>
          {content.title}
        </h2>
        {!hasDecorativeIcon && <div className="w-12 h-px mx-auto" style={{ background: gold }} />}
      </div>
    )

    const imgCard = (img: GalleryImage, aspectClass = 'aspect-square', i = 0) => (
      <div key={img.id} className={cn(aspectClass, 'overflow-hidden relative group')}>
        {img.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img {...elementProps(config.id, `images.${i}.src`, 'image')} src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div {...elementProps(config.id, `images.${i}.src`, 'image')} className="w-full h-full flex items-center justify-center bg-zinc-100">
            <Image className="w-8 h-8 text-zinc-300" />
          </div>
        )}
        {img.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p {...elementProps(config.id, `images.${i}.caption`, 'text')} className="text-white text-xs tracking-widest uppercase font-light">{img.caption}</p>
          </div>
        )}
      </div>
    )

    if (layout === 'masonry') {
      const btn = (content as Record<string, unknown>).primaryButton as { label: string; href: string } | undefined
      // Featured-center grid for 5 images: 3 cols, center spans 2 rows
      const useFeaturedGrid = images.length === 5
      return (
        <section className={cn("py-24 relative overflow-hidden", !(config.style.background === 'custom' && config.style.customBgColor) && "bg-white")} style={{ fontFamily: 'var(--font-body, inherit)', ...(config.style.background === 'custom' && config.style.customBgColor ? { backgroundColor: config.style.customBgColor } : {}) }}>
          <div className="max-w-5xl mx-auto px-6 relative">
            {title}
            {useFeaturedGrid ? (
              <div className="grid grid-cols-3 grid-rows-2 gap-4" style={{ gridTemplateRows: 'auto auto' }}>
                {/* Top-left */}
                <div className="overflow-hidden relative group rounded-sm">
                  {images[0]?.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img {...elementProps(config.id, 'images.0.src', 'image')} src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div {...elementProps(config.id, 'images.0.src', 'image')} className="w-full aspect-square flex items-center justify-center bg-zinc-100"><Image className="w-8 h-8 text-zinc-300" /></div>
                  )}
                </div>
                {/* Center — spans 2 rows */}
                <div className="row-span-2 overflow-hidden relative group rounded-sm">
                  {images[1]?.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img {...elementProps(config.id, 'images.1.src', 'image')} src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div {...elementProps(config.id, 'images.1.src', 'image')} className="w-full h-full flex items-center justify-center bg-zinc-100"><Image className="w-8 h-8 text-zinc-300" /></div>
                  )}
                </div>
                {/* Top-right */}
                <div className="overflow-hidden relative group rounded-sm">
                  {images[2]?.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img {...elementProps(config.id, 'images.2.src', 'image')} src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div {...elementProps(config.id, 'images.2.src', 'image')} className="w-full aspect-square flex items-center justify-center bg-zinc-100"><Image className="w-8 h-8 text-zinc-300" /></div>
                  )}
                </div>
                {/* Bottom-left */}
                <div className="overflow-hidden relative group rounded-sm">
                  {images[3]?.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img {...elementProps(config.id, 'images.3.src', 'image')} src={images[3].src} alt={images[3].alt} className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div {...elementProps(config.id, 'images.3.src', 'image')} className="w-full aspect-square flex items-center justify-center bg-zinc-100"><Image className="w-8 h-8 text-zinc-300" /></div>
                  )}
                </div>
                {/* Bottom-right */}
                <div className="overflow-hidden relative group rounded-sm">
                  {images[4]?.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img {...elementProps(config.id, 'images.4.src', 'image')} src={images[4].src} alt={images[4].alt} className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div {...elementProps(config.id, 'images.4.src', 'image')} className="w-full aspect-square flex items-center justify-center bg-zinc-100"><Image className="w-8 h-8 text-zinc-300" /></div>
                  )}
                </div>
              </div>
            ) : (
              <div className={cn(masonryColClass, 'gap-6 space-y-6')}>
                {images.map((img, i) => (
                  <div key={img.id} className="break-inside-avoid overflow-hidden relative group">
                    {img.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img {...elementProps(config.id, `images.${i}.src`, 'image')} src={img.src} alt={img.alt} className={cn('w-full object-cover transition-transform duration-700 group-hover:scale-105', getAspect(i))} />
                    ) : (
                      <div {...elementProps(config.id, `images.${i}.src`, 'image')} className={cn('w-full flex items-center justify-center bg-zinc-100', getAspect(i))}>
                        <Image className="w-8 h-8 text-zinc-300" />
                      </div>
                    )}
                    {img.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p {...elementProps(config.id, `images.${i}.caption`, 'text')} className="text-white text-xs tracking-widest uppercase font-light">{img.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {btn && (
              <div className="flex justify-center pt-12">
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={btn.href}
                  className={cn("px-10 py-3.5 text-sm font-medium tracking-[0.12em] uppercase border transition-colors", isDarkBg ? "border-white/30 text-white hover:border-white/50" : "border-zinc-300 text-zinc-700 hover:border-zinc-400")}
                >
                  {btn.label}
                </a>
              </div>
            )}
          </div>
        </section>
      )
    }

    // Grid
    return (
      <section className="bg-white py-24 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6 relative">
          {title}
          <div className={cn('grid gap-6', colClass)}>
            {images.map((img, i) => imgCard(img, undefined, i))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CREATIVE — Neobrutalist
  // ═══════════════════════════════════════════

  if (universe === 'creative') {
    const title = content.title && (
      <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-5xl font-black text-zinc-900 mb-10 leading-[0.95]" style={customTextColor ? { color: customTextColor } : undefined}>
        {content.title}
      </h2>
    )

    const imgCard = (img: GalleryImage, aspectClass = 'aspect-square', i = 0) => (
      <div key={img.id} className={cn(aspectClass, 'border-2 border-zinc-900 overflow-hidden relative group bg-white shadow-[4px_4px_0_0_#18181b] hover:shadow-[6px_6px_0_0_#18181b] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all')}>
        {img.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img {...elementProps(config.id, `images.${i}.src`, 'image')} src={img.src} alt={img.alt} className="w-full h-full object-cover" />
        ) : (
          <div {...elementProps(config.id, `images.${i}.src`, 'image')} className="w-full h-full flex items-center justify-center bg-[#fdf6e3]">
            <Image className="w-8 h-8 text-zinc-400" />
          </div>
        )}
        {img.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-zinc-900 px-3 py-2">
            <p {...elementProps(config.id, `images.${i}.caption`, 'text')} className="text-white text-xs font-bold uppercase tracking-wide">{img.caption}</p>
          </div>
        )}
      </div>
    )

    if (layout === 'masonry') {
      return (
        <section className="bg-[#fdf6e3] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-7xl mx-auto px-6">
            {title}
            <div className={cn(masonryColClass, 'gap-5 space-y-5')}>
              {images.map((img, i) => (
                <div key={img.id} className="break-inside-avoid border-2 border-zinc-900 overflow-hidden relative group bg-white shadow-[4px_4px_0_0_#18181b] hover:shadow-[6px_6px_0_0_#18181b] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all">
                  {img.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img {...elementProps(config.id, `images.${i}.src`, 'image')} src={img.src} alt={img.alt} className={cn('w-full object-cover', getAspect(i))} />
                  ) : (
                    <div {...elementProps(config.id, `images.${i}.src`, 'image')} className={cn('w-full flex items-center justify-center bg-[#fdf6e3]', getAspect(i))}>
                      <Image className="w-8 h-8 text-zinc-400" />
                    </div>
                  )}
                  {img.caption && (
                    <div className="bg-zinc-900 px-3 py-2">
                      <p {...elementProps(config.id, `images.${i}.caption`, 'text')} className="text-white text-xs font-bold uppercase tracking-wide">{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Grid
    return (
      <section className="bg-[#fdf6e3] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-7xl mx-auto px-6">
          {title}
          <div className={cn('grid gap-5', colClass)}>
            {images.map((img, i) => imgCard(img, undefined, i))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // ECOMMERCE — Green / Trust
  // ═══════════════════════════════════════════

  if (universe === 'ecommerce') {
    const accent = accentColor ?? '#059669'

    const title = content.title && (
      <div className="text-center mb-10 space-y-3">
        <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-zinc-900" style={customTextColor ? { color: customTextColor } : undefined}>
          {content.title}
        </h2>
        <div className="flex items-center justify-center gap-2 text-xs font-semibold" style={{ color: accent }}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          Images verifiees
        </div>
      </div>
    )

    const imgCard = (img: GalleryImage, aspectClass = 'aspect-square', i = 0) => (
      <div key={img.id} className={cn(aspectClass, 'rounded-2xl overflow-hidden relative group bg-zinc-50 border border-zinc-100 hover:border-emerald-200 transition-colors')}>
        {img.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img {...elementProps(config.id, `images.${i}.src`, 'image')} src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
        ) : (
          <div {...elementProps(config.id, `images.${i}.src`, 'image')} className="w-full h-full flex items-center justify-center">
            <Image className="w-8 h-8 text-zinc-300" />
          </div>
        )}
        {img.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm px-3 py-2 border-t border-zinc-100">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <p {...elementProps(config.id, `images.${i}.caption`, 'text')} className="text-zinc-700 text-xs font-medium">{img.caption}</p>
            </div>
          </div>
        )}
      </div>
    )

    if (layout === 'masonry') {
      return (
        <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {title}
            <div className={cn(masonryColClass, 'gap-4 space-y-4')}>
              {images.map((img, i) => (
                <div key={img.id} className="break-inside-avoid rounded-2xl overflow-hidden relative group bg-zinc-50 border border-zinc-100 hover:border-emerald-200 transition-colors">
                  {img.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img {...elementProps(config.id, `images.${i}.src`, 'image')} src={img.src} alt={img.alt} className={cn('w-full object-cover transition-transform group-hover:scale-105', getAspect(i))} />
                  ) : (
                    <div {...elementProps(config.id, `images.${i}.src`, 'image')} className={cn('w-full flex items-center justify-center', getAspect(i))}>
                      <Image className="w-8 h-8 text-zinc-300" />
                    </div>
                  )}
                  {img.caption && (
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-2 border-t border-zinc-100">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <p {...elementProps(config.id, `images.${i}.caption`, 'text')} className="text-zinc-700 text-xs font-medium">{img.caption}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Grid
    return (
      <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto px-6">
          {title}
          <div className={cn('grid gap-4', colClass)}>
            {images.map((img, i) => imgCard(img, undefined, i))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // GLASS — Dark / Glassmorphism
  // ═══════════════════════════════════════════

  if (universe === 'glass') {
    const accent = accentColor ?? '#818cf8'

    const title = content.title && (
      <h2
        {...elementProps(config.id, 'title', 'heading')}
        className="text-3xl md:text-4xl font-bold gradient-text mb-10 text-center"
        style={customTextColor ? { color: customTextColor, background: 'none', WebkitTextFillColor: 'unset' } : undefined}
      >
        {content.title}
      </h2>
    )

    const imgCard = (img: GalleryImage, aspectClass = 'aspect-square', i = 0) => (
      <div key={img.id} className={cn(aspectClass, 'bg-white/[0.04] backdrop-blur-xl rounded-2xl overflow-hidden relative group border border-white/[0.08] hover:border-white/[0.15] transition-colors')}>
        {img.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img {...elementProps(config.id, `images.${i}.src`, 'image')} src={img.src} alt={img.alt} className="w-full h-full object-cover" />
        ) : (
          <div {...elementProps(config.id, `images.${i}.src`, 'image')} className="w-full h-full flex items-center justify-center">
            <Image className="w-8 h-8 text-white/20" />
          </div>
        )}
        {img.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <p {...elementProps(config.id, `images.${i}.caption`, 'text')} className="text-white/80 text-xs font-medium">{img.caption}</p>
          </div>
        )}
      </div>
    )

    if (layout === 'masonry') {
      return (
        <section className="bg-[#0a0a0f] py-20 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 dot-grid" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${accent}20, transparent 70%)` }}
          />
          <div className="relative max-w-6xl mx-auto px-6">
            {title}
            <div className={cn(masonryColClass, 'gap-4 space-y-4')}>
              {images.map((img, i) => (
                <div key={img.id} className="break-inside-avoid bg-white/[0.04] backdrop-blur-xl rounded-2xl overflow-hidden relative group border border-white/[0.08] hover:border-white/[0.15] transition-colors">
                  {img.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img {...elementProps(config.id, `images.${i}.src`, 'image')} src={img.src} alt={img.alt} className={cn('w-full object-cover', getAspect(i))} />
                  ) : (
                    <div {...elementProps(config.id, `images.${i}.src`, 'image')} className={cn('w-full flex items-center justify-center', getAspect(i))}>
                      <Image className="w-8 h-8 text-white/20" />
                    </div>
                  )}
                  {img.caption && (
                    <div className="bg-black/60 backdrop-blur-sm p-3">
                      <p {...elementProps(config.id, `images.${i}.caption`, 'text')} className="text-white/80 text-xs font-medium">{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Grid
    return (
      <section className="bg-[#0a0a0f] py-20 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="absolute inset-0 dot-grid" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent}20, transparent 70%)` }}
        />
        <div className="relative max-w-6xl mx-auto px-6">
          {title}
          <div className={cn('grid gap-4', colClass)}>
            {images.map((img, i) => imgCard(img, undefined, i))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRIXSA — Property Listing
  // ═══════════════════════════════════════════

  if (variant === 'brixsa-listing') {
    const scrollRevealRef = (el: HTMLDivElement | null) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(40px)'
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.disconnect()
        }
      }, { threshold: 0.15 })
      obs.observe(el)
    }

    const defaultCards = [
      { id: '1', title: 'Contemporary Home Design', city: 'Chicago', price: '$550,000', beds: 3, baths: 2, sqft: '2,500', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' },
      { id: '2', title: 'Rustic Farmhouse Charm', city: 'New York City', price: '$375,000', beds: 3, baths: 2, sqft: '1,500', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80' },
      { id: '3', title: 'Urban Loft Space', city: 'Los Angeles', price: '$500,000', beds: 1, baths: 1, sqft: '1,500', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80' },
    ]

    const toSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

    const items = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; city?: string; price?: string;
      beds?: number; baths?: number; sqft?: string; image?: string;
    }> | undefined

    const cards = items && items.length > 0
      ? items.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultCards[i % 3].title,
          city: item.city ?? defaultCards[i % 3].city,
          price: item.price ?? defaultCards[i % 3].price,
          beds: item.beds ?? defaultCards[i % 3].beds,
          baths: item.baths ?? defaultCards[i % 3].baths,
          sqft: item.sqft ?? defaultCards[i % 3].sqft,
          image: item.image,
        }))
      : defaultCards

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Properties Section')}
        style={{
          background: '#f6efe5',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: 'var(--font-body, inherit)',
        }}
      >
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div {...elementProps(config.id, 'header', 'container', 'Header')} className="flex justify-between items-end brixsa-resp-listing-header" style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}>
            <div style={{ maxWidth: '760px' }}>
              <div>
                <h2
                  {...elementProps(config.id, 'title', 'heading')}
                  className="capitalize"
                  style={{
                    fontFamily: '"GeneralSans Variable", sans-serif',
                    fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                    fontWeight: 500,
                    lineHeight: '110%',
                    textTransform: 'capitalize',
                    color: '#140c08',
                  }}
                >
                  {content.title ?? 'Explore Our Properties'}
                </h2>
              </div>
            </div>
            <a
              {...elementProps(config.id, 'subtitle', 'text')}
              href="/property"
              className="brixsa-btn flex items-center relative overflow-hidden"
              style={{ fontSize: '20px', fontWeight: 500, color: '#140c08', padding: '10px 12px 10px 20px', gap: '10px', borderRadius: '6px', textDecoration: 'none' }}
            >
              <span {...elementProps(config.id, 'viewAllLabel', 'text', 'Link Text')} className="brixsa-btn-label relative" style={{ zIndex: 10 }}>View all Property</span>
              <span
                {...elementProps(config.id, 'viewAllIcon', 'icon', 'Arrow Icon')}
                className="flex items-center justify-center"
                style={{
                  background: '#4a2711',
                  color: '#fff',
                  borderRadius: '4px',
                  width: '28px',
                  height: '28px',
                  position: 'relative',
                  zIndex: 10,
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </span>
              {/* Animated bg — fills from right to left */}
              <span className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden', borderRadius: '6px' }}>
                <span className="brixsa-btn-fill" style={{ display: 'block', background: '#4a2711', width: '100%', height: '100%' }} />
              </span>
            </a>
          </div>

          {/* Grid */}
          <style>{`
            .brixsa-card:hover .brixsa-text-slide { transform: translateY(-36px) !important; }
            .brixsa-card:hover .brixsa-img-zoom { transform: scale(1.05) !important; }
            .brixsa-img-dezoom { transform: scale(1.15); transition: transform 1.2s ease-out; }
            .brixsa-img-dezoom.revealed { transform: scale(1); }
            .brixsa-btn-fill { transform: translateX(102%); transition: transform 0.4s ease; }
            .brixsa-btn:hover .brixsa-btn-fill { transform: translateX(0); }
            .brixsa-btn:hover .brixsa-btn-label { color: #fff; }
            .brixsa-btn-label { transition: color 0.4s; }
            @media (max-width: 768px) {
              .brixsa-resp-listing-grid { grid-template-columns: 1fr !important; }
              .brixsa-resp-listing-header { flex-direction: column; align-items: flex-start !important; }
            }
            @media (min-width: 769px) and (max-width: 1024px) {
              .brixsa-resp-listing-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
          <div {...elementProps(config.id, 'grid', 'container', 'Properties Grid')} className="grid grid-cols-3 brixsa-resp-listing-grid" style={{ columnGap: 'clamp(16px, 2vw, 24px)', rowGap: 'clamp(30px, 5vw, 60px)' }}>
            {cards.map((card, i) => (
              <a
                key={card.id}
                {...elementProps(config.id, `items.${i}`, 'text')}
                href={`/property/${toSlug(card.title)}`}
                className="brixsa-card block w-full"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {/* Image */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.brixsa-img-dezoom')
                        if (img) img.classList.add('revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                <BrixsaViewCursor className="overflow-hidden" style={{ aspectRatio: '424/502', borderRadius: '8px' }}>
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={card.image}
                      alt={card.title}
                      className="brixsa-img-zoom brixsa-img-dezoom w-full h-full object-cover"
                      style={{ transition: 'transform 0.6s ease' }}
                    />
                  ) : (
                    <div
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      className="brixsa-img-zoom brixsa-img-dezoom w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(to bottom, #c4b8a8, #a89882)', transition: 'transform 0.6s ease' }}
                    >
                      <Image className="w-8 h-8 text-white/40" />
                    </div>
                  )}
                  {/* Meta badges */}
                  <div {...elementProps(config.id, `items.${i}.badges`, 'container', 'Badges')} className="absolute bottom-0 left-0 flex flex-wrap" style={{ padding: '20px', gap: '8px' }}>
                    {[
                      { icon: <Bed style={{ maxWidth: '16px', height: '16px' }} />, label: `${card.beds} Bedroom`, path: 'beds' },
                      { icon: <Bath style={{ maxWidth: '16px', height: '16px' }} />, label: `${card.baths} Bathroom`, path: 'baths' },
                      { icon: <Ruler style={{ maxWidth: '16px', height: '16px' }} />, label: `${card.sqft} sq.ft.`, path: 'sqft' },
                    ].map((badge, bi) => (
                      <span
                        key={bi}
                        {...elementProps(config.id, `items.${i}.${badge.path}`, 'badge')}
                        className="flex items-center"
                        style={{
                          background: 'rgba(0,0,0,0.45)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          borderRadius: '4px',
                          paddingLeft: '8px',
                          paddingRight: '8px',
                          paddingTop: '2px',
                          paddingBottom: '2px',
                          fontSize: '12px',
                          gap: '12px',
                          color: '#fff',
                        }}
                      >
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                    ))}
                  </div>
                </BrixsaViewCursor>
                </div>

                {/* Body */}
                <div style={{ marginTop: '16px' }}>
                  {/* Title/Price animated container */}
                  <div style={{ overflow: 'hidden', height: '36px' }}>
                    <div
                      className="brixsa-text-slide"
                      style={{
                        transition: 'transform 0.4s ease',
                      }}
                    >
                      <h3
                        {...elementProps(config.id, `items.${i}.title`, 'text')}
                        style={{
                          fontSize: '24px',
                          fontWeight: 500,
                          lineHeight: '36px',
                          color: '#140c08',
                          fontFamily: '"Inter Variable", Inter, sans-serif',
                        }}
                      >
                        {card.title}
                      </h3>
                      <span
                        {...elementProps(config.id, `items.${i}.price`, 'text')}
                        style={{
                          fontSize: '24px',
                          fontWeight: 500,
                          lineHeight: '36px',
                          color: '#140c08',
                          display: 'block',
                        }}
                      >
                        {card.price}
                      </span>
                    </div>
                  </div>
                  {/* City - stays in place */}
                  <span
                    {...elementProps(config.id, `items.${i}.city`, 'text')}
                    style={{ fontSize: '16px', fontWeight: 400, color: '#56595a', marginTop: '4px', display: 'block' }}
                  >
                    {card.city}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRIXSA — Property Detail Page
  // ═══════════════════════════════════════════

  if (variant === 'brixsa-detail') {
    const c = content as Record<string, unknown>
    const title = (c.title as string) ?? 'Modern Apartment Living'
    const price = (c.price as string) ?? '$350,000'
    const location = (c.location as string) ?? 'Miami'
    const description = (c.description as string) ?? 'This stunning modern apartment offers the perfect blend of comfort and style. Located in the heart of the city, it features contemporary design elements, high-end finishes, and breathtaking views. The open floor plan creates a spacious living environment perfect for both relaxation and entertaining.'
    const features = (c.features as string[]) ?? ['Open Floor Plan', 'Floor-to-Ceiling Windows', 'Hardwood Flooring', 'Modern Kitchen with Quartz Countertops', 'Walk-in Closets', 'In-unit Washer/Dryer', 'Private Balcony', 'Smart Home Technology']
    const amenities = (c.amenities as string[]) ?? ['Swimming Pool', 'Gym/Fitness Center', '24/7 Security', 'Children\'s Playground', 'Community Clubhouse', 'Pet-Friendly Facilities', 'BBQ and Picnic Area', 'Emergency Exit', 'Library and Reading Room']
    const specs = (c.specs as { beds?: number; baths?: number; sqft?: string; livingArea?: string; type?: string; floor?: number | string; yearBuilt?: number | string }) ?? {}
    const specBeds = specs.beds ?? 2
    const specBaths = specs.baths ?? 2
    const specSqft = specs.sqft ?? '4,000'
    const specLivingArea = specs.livingArea ?? '1,200'
    const specType = specs.type ?? 'House'
    const specFloor = specs.floor ?? 10
    const specYearBuilt = specs.yearBuilt ?? 2020
    const rawImages = (c.images as Array<string | { id?: string; src?: string }>) ?? []
    const imgArr = rawImages.map(img => typeof img === 'string' ? img : img.src ?? '')
    const mainImage = imgArr[0] ?? ''
    const thumb1 = imgArr[1] ?? ''
    const thumb2 = imgArr[2] ?? ''
    const agent = (c.agent as { name?: string; email?: string; image?: string }) ?? {}
    const agentName = agent.name ?? 'David Johnson'
    const agentEmail = agent.email ?? 'david.johnson@example.com'
    const agentImage = agent.image ?? ''
    const relatedProperties = (c.relatedProperties as Array<{ title?: string; price?: string; city?: string; image?: string; beds?: number; baths?: number; sqft?: string }>) ?? [
      { title: 'Luxury Penthouse Suite', price: '$750,000', city: 'Miami', beds: 3, baths: 3, sqft: '3,200' },
      { title: 'Cozy Suburban Retreat', price: '$280,000', city: 'Chicago', beds: 4, baths: 2, sqft: '2,800' },
      { title: 'Downtown Studio Loft', price: '$195,000', city: 'Los Angeles', beds: 1, baths: 1, sqft: '850' },
    ]
    const toSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const historyItems = [
      { label: 'Previous Owners', value: 'This home has been well-maintained and updated by its previous owners.' },
      { label: 'Renovation History', value: `In 2021, the kitchen and bathrooms were remodeled to enhance functionality and style.` },
      { label: 'Market Trends', value: 'Homes in this area have seen a steady increase in value, making it a great investment.' },
      { label: 'Community Feedback', value: 'Residents appreciate the modern amenities and the vibrant community atmosphere.' },
    ]

    const dark = '#140c08'
    const cream = '#f5f0e8'
    const warmGray = '#56595a'
    const headingFont = '"GeneralSans Variable", sans-serif'
    const bodyFont = '"Inter Variable", Inter, sans-serif'

    const sectionHeading = (text: string, path: string) => (
      <h3
        {...elementProps(config.id, path, 'heading')}
        style={{
          fontFamily: headingFont,
          fontSize: '28px',
          fontWeight: 600,
          color: dark,
          marginBottom: '24px',
          lineHeight: '120%',
        }}
      >
        {text}
      </h3>
    )

    // Amenity icon map
    const amenityIcons: Record<string, React.ReactNode> = {
      'Swimming Pool': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12c1.5-1.5 3-2 4.5-1s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0M2 17c1.5-1.5 3-2 4.5-1s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/><path d="M7 12V4m5 8V2m5 10V6"/></svg>,
      'Gym/Fitness Center': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6.5 6.5h-2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2m11-11h2a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-2M6.5 4v16M17.5 4v16M6.5 12h11"/></svg>,
      '24/7 Security': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
      'Children\'s Playground': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="4" r="2"/><path d="M12 6v4m-4 4h8m-8 0-2 6m10-6 2 6"/></svg>,
      'Community Clubhouse': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4"/></svg>,
      'Pet-Friendly Facilities': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3.074 4.577 3.469 3.5 5.36 3.5 6.75c0 1.39 1 3.25 3 3.25s3.5-1.86 3.5-3.25V5.172zM14 5.172c0-1.39 1.577-2.493 3.5-2.098C19.423 3.469 20.5 5.36 20.5 6.75c0 1.39-1 3.25-3 3.25s-3.5-1.86-3.5-3.25V5.172zM12 12c-3 0-5.5 2.5-5.5 5.5 0 2 1.5 3.5 5.5 3.5s5.5-1.5 5.5-3.5c0-3-2.5-5.5-5.5-5.5z"/></svg>,
      'BBQ and Picnic Area': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="20" height="6" rx="1"/><path d="M6 12v6m12-6v6m-9-6v8m6-8v8M2 6l3-4m17 4-3-4"/></svg>,
      'Emergency Exit': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5M4 12h12m0 0-4-4m4 4-4 4"/></svg>,
      'Library and Reading Room': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
    }

    const specIcons: Record<string, React.ReactNode> = {
      Type: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4"/></svg>,
      Floor: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>,
      'Year Built': <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><text x="12" y="17" textAnchor="middle" fontSize="7" fill="currentColor" stroke="none">12</text></svg>,
      'Living Area': <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M3 12h6M15 12h6M12 3v6M12 15v6"/></svg>,
      Bedrooms: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 17h18M3 13h18M5 13V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/></svg>,
      Bathrooms: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1zM6 12V5a2 2 0 0 1 2-2h1"/></svg>,
    }

    const specRows = [
      { label: 'Type', value: specType },
      { label: 'Floor', value: String(specFloor) },
      { label: 'Year Built', value: String(specYearBuilt) },
      { label: 'Living Area', value: `${specLivingArea} ft²` },
      { label: 'Bedrooms', value: String(specBeds) },
      { label: 'Bathrooms', value: String(specBaths) },
    ]

    const renderImage = (src: string, alt: string, path: string, style: React.CSSProperties) => (
      <div
        {...elementProps(config.id, path, 'image')}
        style={{ overflow: 'hidden', borderRadius: '12px', ...style }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #c4b8a8, #a89882)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ width: '48px', height: '48px', color: 'rgba(255,255,255,0.4)' }} />
          </div>
        )}
      </div>
    )

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Property Detail Page')}
        style={{
          background: cream,
          fontFamily: bodyFont,
          color: dark,
        }}
      >
        <style>{`
          @media (max-width: 768px) {
            .brixsa-resp-detail-gallery { grid-template-columns: 1fr !important; grid-template-rows: auto auto !important; height: auto !important; }
            .brixsa-resp-detail-gallery > *:first-child { grid-row: auto !important; }
            .brixsa-resp-detail-2col { grid-template-columns: 1fr !important; }
            .brixsa-resp-detail-sidebar { position: static !important; }
            .brixsa-resp-detail-similar-grid { grid-template-columns: 1fr !important; }
            .brixsa-resp-detail-amenities { grid-template-columns: 1fr !important; }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .brixsa-resp-detail-gallery { height: 420px !important; }
            .brixsa-resp-detail-2col { grid-template-columns: 1fr 320px !important; }
            .brixsa-resp-detail-similar-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
        {/* ── Breadcrumb + Title ── */}
        <div
          {...elementProps(config.id, 'breadcrumbSection', 'container', 'Breadcrumb Section')}
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            padding: 'clamp(30px, 5vw, 60px) clamp(20px, 5vw, 60px) 0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: warmGray, marginBottom: '24px' }}>
            <a href="/" style={{ color: warmGray, textDecoration: 'none' }}>HOME</a>
            <span style={{ fontSize: '8px' }}>•</span>
            <a href="/property" style={{ color: warmGray, textDecoration: 'none' }}>PROPERTY</a>
            <span style={{ fontSize: '8px' }}>•</span>
            <span style={{ color: dark, textDecoration: 'underline', textUnderlineOffset: '3px' }}>PROPERTY DETAILS</span>
          </div>
          <h1
            {...elementProps(config.id, 'title', 'heading')}
            style={{
              fontFamily: headingFont,
              fontSize: 'clamp(48px, 6vw, 82px)',
              fontWeight: 600,
              color: dark,
              lineHeight: '105%',
              margin: 0,
              letterSpacing: '-1px',
            }}
          >
            {title}
          </h1>
          <div
            {...elementProps(config.id, 'location', 'text')}
            style={{
              fontSize: '18px',
              fontWeight: 400,
              color: warmGray,
              marginTop: '12px',
            }}
          >
            {location}
          </div>
        </div>

        {/* ── Image Gallery Grid ── */}
        <div
          {...elementProps(config.id, 'imageGallery', 'container', 'Image Gallery')}
          className="brixsa-resp-detail-gallery"
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            padding: 'clamp(20px, 4vw, 40px) clamp(20px, 5vw, 60px) 0',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '16px',
            height: '620px',
          }}
        >
          {renderImage(mainImage, title, 'images.0', { gridRow: '1 / 3', width: '100%', height: '100%' })}
          {renderImage(thumb1, `${title} - 2`, 'images.1', { width: '100%', height: '100%' })}
          {renderImage(thumb2, `${title} - 3`, 'images.2', { width: '100%', height: '100%' })}
        </div>

        {/* ── 2-Column Layout: Content + Sticky Sidebar ── */}
        <div
          {...elementProps(config.id, 'mainContent', 'container', 'Main Content')}
          className="brixsa-resp-detail-2col"
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            padding: 'clamp(30px, 5vw, 60px) clamp(20px, 5vw, 60px) 0',
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'start',
          }}
        >
          {/* ── Left Column — Scrolling Content ── */}
          <div>
            {/* Description */}
            <div
              {...elementProps(config.id, 'descriptionSection', 'container', 'Description Section')}
              style={{ marginBottom: '48px' }}
            >
              {sectionHeading('Description', 'descriptionHeading')}
              <p
                {...elementProps(config.id, 'description', 'text')}
                style={{ fontSize: '16px', lineHeight: '180%', color: warmGray, margin: 0 }}
              >
                {description}
              </p>
            </div>

            {/* Key Features */}
            <div
              {...elementProps(config.id, 'featuresSection', 'container', 'Features Section')}
              style={{ marginBottom: '48px' }}
            >
              {sectionHeading('Key Features', 'featuresHeading')}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {features.map((feat, fi) => (
                  <li
                    key={fi}
                    {...elementProps(config.id, `features.${fi}`, 'text')}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', color: dark, padding: '6px 0' }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: dark, flexShrink: 0 }} />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Amenities */}
            <div
              {...elementProps(config.id, 'amenitiesSection', 'container', 'Amenities Section')}
              style={{ marginBottom: '48px' }}
            >
              {sectionHeading('Amenities', 'amenitiesHeading')}
              <div className="brixsa-resp-detail-amenities" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {amenities.map((amenity, ai) => (
                  <div
                    key={ai}
                    {...elementProps(config.id, `amenities.${ai}`, 'badge')}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: dark, padding: '8px 0' }}
                  >
                    <span style={{ color: dark, flexShrink: 0, display: 'flex' }}>
                      {amenityIcons[amenity] ?? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>}
                    </span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* Property History — Timeline */}
            <div
              {...elementProps(config.id, 'historySection', 'container', 'Property History Section')}
              style={{ marginBottom: '48px' }}
            >
              {sectionHeading('Property History', 'historyHeading')}
              <div style={{ position: 'relative', paddingLeft: '32px' }}>
                {/* Vertical line */}
                <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', background: '#d4cfc6' }} />
                {historyItems.map((item, hi) => (
                  <div
                    key={hi}
                    {...elementProps(config.id, `history.${hi}`, 'text')}
                    style={{ position: 'relative', marginBottom: hi < historyItems.length - 1 ? '28px' : '0' }}
                  >
                    {/* Dot */}
                    <div style={{ position: 'absolute', left: '-32px', top: '6px', width: '16px', height: '16px', borderRadius: '50%', background: dark, border: '3px solid ' + cream }} />
                    <div style={{ fontSize: '16px', fontWeight: 600, color: dark, marginBottom: '6px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '15px', color: warmGray, lineHeight: '160%' }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* House Project / Floor Plan */}
            <div
              {...elementProps(config.id, 'floorPlanSection', 'container', 'Floor Plan Section')}
              style={{ marginBottom: '48px' }}
            >
              {sectionHeading('House Project', 'floorPlanHeading')}
              <div
                {...elementProps(config.id, 'floorPlanImage', 'image')}
                style={{
                  width: '100%',
                  height: '380px',
                  background: '#fff',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  border: '1px solid #e8e4de',
                }}
              >
                {/* Floor plan SVG placeholder */}
                <svg width="480" height="300" viewBox="0 0 480 300" fill="none" stroke="#b8b0a4" strokeWidth="1">
                  <rect x="20" y="20" width="440" height="260" />
                  <line x1="200" y1="20" x2="200" y2="280" />
                  <line x1="20" y1="150" x2="200" y2="150" />
                  <line x1="200" y1="120" x2="480" y2="120" />
                  <rect x="40" y="40" width="60" height="40" rx="2" />
                  <rect x="40" y="170" width="40" height="30" rx="2" />
                  <rect x="220" y="30" width="80" height="60" rx="2" />
                  <rect x="350" y="30" width="60" height="50" rx="2" />
                  <rect x="220" y="140" width="100" height="80" rx="2" />
                  <circle cx="260" cy="55" r="15" />
                  <text x="260" y="60" textAnchor="middle" fontSize="8" fill="#b8b0a4" stroke="none">Table</text>
                  <text x="70" y="65" textAnchor="middle" fontSize="8" fill="#b8b0a4" stroke="none">Bed</text>
                  <text x="380" y="60" textAnchor="middle" fontSize="8" fill="#b8b0a4" stroke="none">Bath</text>
                  <text x="60" y="190" textAnchor="middle" fontSize="8" fill="#b8b0a4" stroke="none">WC</text>
                  <text x="270" y="185" textAnchor="middle" fontSize="8" fill="#b8b0a4" stroke="none">Living Room</text>
                </svg>
              </div>
            </div>

            {/* Location / Map */}
            <div
              {...elementProps(config.id, 'locationSection', 'container', 'Location Section')}
              style={{ marginBottom: '0' }}
            >
              {sectionHeading('Location', 'locationHeading')}
              <div
                {...elementProps(config.id, 'mapImage', 'image')}
                style={{
                  width: '100%',
                  height: '320px',
                  background: '#e8e0d4',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <div style={{ textAlign: 'center', color: warmGray }}>
                  <svg style={{ width: '48px', height: '48px', color: '#c4b8a8', margin: '0 auto 12px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <span style={{ fontSize: '14px' }}>{location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column — Sticky Sidebar ── */}
          <div className="brixsa-resp-detail-sidebar" style={{ position: 'sticky', top: '100px', alignSelf: 'start' }}>
            <div
              {...elementProps(config.id, 'sidebarCard', 'container', 'Sidebar Card')}
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '36px 32px',
              }}
            >
              {/* Price */}
              <div
                {...elementProps(config.id, 'price', 'text')}
                style={{
                  fontFamily: headingFont,
                  fontSize: '40px',
                  fontWeight: 700,
                  color: dark,
                  lineHeight: '110%',
                }}
              >
                {price}
              </div>
              <div style={{ fontSize: '16px', color: warmGray, marginTop: '4px' }}>
                {specSqft} sq ft
              </div>

              {/* Make Offer Button */}
              <div
                {...elementProps(config.id, 'makeOfferBtn', 'button')}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: '#e4dfd7',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: dark,
                  cursor: 'pointer',
                  marginTop: '24px',
                  marginBottom: '28px',
                }}
              >
                Make offer
              </div>

              {/* Specs List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {specRows.map((spec, si) => (
                  <div
                    key={si}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 0',
                      borderBottom: si < specRows.length - 1 ? '1px solid #f0ece6' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: dark }}>
                      <span style={{ display: 'flex', color: dark }}>{specIcons[spec.label] ?? null}</span>
                      <span style={{ fontSize: '15px', fontWeight: 400 }}>{spec.label}</span>
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: dark }}>{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Agent Card */}
              <div
                {...elementProps(config.id, 'agentCard', 'container', 'Agent Card')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid #f0ece6',
                }}
              >
                <div
                  {...elementProps(config.id, 'agent.image', 'image')}
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: 'linear-gradient(135deg, #d4c8b8, #b8a898)',
                  }}
                >
                  {agentImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={agentImage} alt={agentName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '22px', fontWeight: 700 }}>
                      {agentName.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div
                    {...elementProps(config.id, 'agent.name', 'text')}
                    style={{ fontSize: '16px', fontWeight: 600, color: dark }}
                  >
                    {agentName}
                  </div>
                  <div
                    {...elementProps(config.id, 'agent.email', 'text')}
                    style={{ fontSize: '13px', color: warmGray, marginTop: '2px' }}
                  >
                    {agentEmail}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Similar Listing (full-width) ── */}
        <style>{`
          .brixsa-detail-related:hover .brixsa-detail-related-img { transform: scale(1.05); }
        `}</style>
        <div
          {...elementProps(config.id, 'relatedSection', 'container', 'Similar Listing Section')}
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            padding: 'clamp(40px, 7vw, 80px) clamp(20px, 5vw, 60px) clamp(50px, 8vw, 100px)',
          }}
        >
          <h2
            {...elementProps(config.id, 'relatedHeading', 'heading')}
            style={{
              fontFamily: headingFont,
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 600,
              color: dark,
              marginBottom: '40px',
              lineHeight: '110%',
            }}
          >
            Similar Listing
          </h2>
          <div
            {...elementProps(config.id, 'relatedGrid', 'container', 'Similar Listing Grid')}
            className="brixsa-resp-detail-similar-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(16px, 2vw, 24px)',
            }}
          >
            {relatedProperties.map((rp, ri) => (
              <a
                key={ri}
                {...elementProps(config.id, `relatedProperties.${ri}`, 'text')}
                href={`/property/${toSlug(rp.title ?? 'property')}`}
                className="brixsa-detail-related"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div style={{ width: '100%', aspectRatio: '4/4.5', overflow: 'hidden', borderRadius: '12px', position: 'relative' }}>
                  {rp.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={rp.image} alt={rp.title ?? ''} className="brixsa-detail-related-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #d4c8b8, #b8a898)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Image style={{ width: '32px', height: '32px', color: 'rgba(255,255,255,0.4)' }} />
                    </div>
                  )}
                  {/* Badges overlay */}
                  <div style={{ position: 'absolute', bottom: '14px', left: '14px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', fontWeight: 500, color: dark, display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Bed style={{ width: '14px', height: '14px' }} />
                      {rp.beds ?? 3} Bedroom
                    </span>
                    <span style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', fontWeight: 500, color: dark, display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Bath style={{ width: '14px', height: '14px' }} />
                      {rp.baths ?? 2} Bathroom
                    </span>
                    <span style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', fontWeight: 500, color: dark, display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Ruler style={{ width: '14px', height: '14px' }} />
                      {rp.sqft ?? '1500'} sq.ft.
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '22px', fontWeight: 500, color: dark, fontFamily: headingFont, lineHeight: '130%' }}>
                    {rp.title ?? 'Property'}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 400, color: warmGray, marginTop: '4px' }}>
                    {rp.city ?? ''}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // ZMR-AGENCY — Grille talent modeling : cards 3:4, fond noir,
  // nom sous l'image, hover image swap, style minimaliste
  // ═══════════════════════════════════════════════════════
  if (variant === 'zmr-agency-grid') {
    return <ZmrAgencyGrid config={config} content={content} images={images} />
  }

  // ═══════════════════════════════════════════════════════
  // ZMR-SHOWCASE — Fullscreen image cards avec overlay titre + CTA,
  // type portfolio/shows/social, 100vh par card, side-by-side possible
  // ═══════════════════════════════════════════════════════
  if (variant === 'zmr-showcase') {
    return <ZmrShowcase config={config} images={images} />
  }

  // Fallback to startup-grid
  return (
    <>
      <GallerySection config={{ ...config, variant: 'startup-grid' }} />
      {renderLightbox()}
    </>
  )

  function renderLightbox() {
    if (!enableLightbox || lightboxIndex === null || validImages.length === 0) return null
    return (
      <LightboxOverlay
        images={validImages.map(img => ({ src: img.src, alt: img.alt, caption: img.caption }))}
        initialIndex={Math.min(lightboxIndex, validImages.length - 1)}
        onClose={() => setLightboxIndex(null)}
      />
    )
  }
}

// ═══════════════════════════════════════════════════════
// ZMR-SHOWCASE — Portfolio lightbox + Shows stacking modal + Instagram link
// ═══════════════════════════════════════════════════════
function ZmrShowcase({ config, images }: { config: SectionConfig; images: GalleryImage[] }) {
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const [portfolioIndex, setPortfolioIndex] = useState(0)
  const [showsOpen, setShowsOpen] = useState(false)

  // Portfolio images — use all available images (the 3 main cards + any extras)
  const portfolioImages = images.length > 0 ? images : []

  // Experience data — stored in image captions as "TYPE|Brand|Role|Year" format
  const showsImage = images[1]
  const instagramImage = images[2]

  // Mock experience entries (will come from CMS later)
  const experiences = [
    { image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80', type: 'SHOW', title: 'Paris Fashion Week SS25', brand: 'Chanel', role: 'Lead Model', year: '2025' },
    { image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', type: 'CAMPAIGN', title: 'Vogue Italia Cover', brand: 'Vogue', role: 'Cover Model', year: '2024' },
    { image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', type: 'SHOW', title: 'Dior Cruise Collection', brand: 'Dior', role: 'Runway', year: '2024' },
    { image: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=600&q=80', type: 'CAMPAIGN', title: "L'Oréal Paris", brand: "L'Oréal", role: 'Brand Ambassador', year: '2024' },
  ]

  const cardOverlay = (label: string, viewLabel: string): React.CSSProperties => ({
    position: 'absolute', bottom: '60px', left: 0, width: '100%',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
  })

  const titleStyle: React.CSSProperties = {
    color: 'white', fontSize: 'clamp(24px, 4vw, 60px)', fontWeight: 900,
    letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0,
    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
  }

  const viewBtnStyle: React.CSSProperties = {
    color: 'white', fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase',
    marginTop: '20px', borderBottom: '1px solid white', paddingBottom: '4px', cursor: 'pointer',
  }

  return (
    <>
      <section style={{ fontFamily: 'var(--font-body, inherit)', background: '#000' }}>
        {/* ── PORTFOLIO — Full width, cliquable → lightbox modal ── */}
        {images[0] && (
          <div
            className="relative w-full overflow-hidden cursor-pointer"
            style={{ height: '100vh' }}
            onClick={() => { setPortfolioIndex(0); setPortfolioOpen(true) }}
          >
            {images[0].src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={images[0].src} alt={images[0].alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            ) : (
              <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                <Image className="w-12 h-12 text-zinc-600" />
              </div>
            )}
            <div style={cardOverlay('', '')}>
              <h2 style={titleStyle}>{images[0].alt || 'PORTFOLIO'}</h2>
              <span style={viewBtnStyle}>VIEW PORTFOLIO</span>
            </div>
          </div>
        )}

        {/* ── SHOWS + INSTAGRAM — Side by side ── */}
        {(showsImage || instagramImage) && (
          <div style={{ display: 'grid', gridTemplateColumns: showsImage && instagramImage ? '1fr 1fr' : '1fr', gap: '4px', marginTop: '4px' }}>
            {/* SHOWS — cliquable → modal stacking */}
            {showsImage && (
              <div
                className="relative overflow-hidden cursor-pointer"
                style={{ height: '100vh' }}
                onClick={() => setShowsOpen(true)}
              >
                {showsImage.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={showsImage.src} alt={showsImage.alt} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center"><Image className="w-12 h-12 text-zinc-600" /></div>
                )}
                <div style={cardOverlay('', '')}>
                  <h2 style={{ ...titleStyle, fontSize: 'clamp(22px, 3.5vw, 50px)' }}>{showsImage.alt || 'SHOWS'}</h2>
                  <span style={viewBtnStyle}>VIEW SHOWS</span>
                </div>
              </div>
            )}

            {/* INSTAGRAM — cliquable → lien externe */}
            {instagramImage && (
              <a
                href={instagramImage.caption || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden cursor-pointer block"
                style={{ height: '100vh', textDecoration: 'none' }}
              >
                {instagramImage.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={instagramImage.src} alt={instagramImage.alt} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center"><Image className="w-12 h-12 text-zinc-600" /></div>
                )}
                <div style={cardOverlay('', '')}>
                  <h2 style={{ ...titleStyle, fontSize: 'clamp(22px, 3.5vw, 50px)' }}>{instagramImage.alt || 'INSTAGRAM'}</h2>
                  <span style={viewBtnStyle}>VIEW INSTAGRAM</span>
                </div>
              </a>
            )}
          </div>
        )}
      </section>

      {/* ══════ PORTFOLIO LIGHTBOX MODAL ══════ */}
      {portfolioOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setPortfolioOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setPortfolioOpen(false)}
            style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 10, background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'white', transform: 'rotate(45deg)', position: 'absolute' }} />
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'white', transform: 'rotate(-45deg)' }} />
          </button>

          {/* Counter */}
          <div style={{ position: 'absolute', top: '28px', left: '28px', color: 'rgba(255,255,255,0.5)', fontSize: '13px', letterSpacing: '0.1em' }}>
            {portfolioIndex + 1} / {portfolioImages.length}
          </div>

          {/* Main image */}
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '85vw', maxHeight: '85vh', position: 'relative' }}>
            {portfolioImages[portfolioIndex]?.src && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={portfolioImages[portfolioIndex].src}
                alt={portfolioImages[portfolioIndex].alt}
                style={{ maxWidth: '85vw', maxHeight: '85vh', objectFit: 'contain' }}
              />
            )}
          </div>

          {/* Prev / Next arrows */}
          {portfolioImages.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); setPortfolioIndex(i => (i - 1 + portfolioImages.length) % portfolioImages.length) }}
                style={{
                  position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontSize: '24px',
                  width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s',
                }}
                onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              >
                ‹
              </button>
              <button
                onClick={e => { e.stopPropagation(); setPortfolioIndex(i => (i + 1) % portfolioImages.length) }}
                style={{
                  position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontSize: '24px',
                  width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s',
                }}
                onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              >
                ›
              </button>
            </>
          )}

          {/* Thumbnail strip */}
          {portfolioImages.length > 1 && (
            <div style={{ position: 'absolute', bottom: '24px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {portfolioImages.map((img, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setPortfolioIndex(i) }}
                  style={{
                    width: '56px', height: '56px', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', padding: 0, border: 'none',
                    opacity: i === portfolioIndex ? 1 : 0.4, transition: 'opacity 0.3s',
                    outline: i === portfolioIndex ? '2px solid white' : 'none', outlineOffset: '2px',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══════ SHOWS MODAL — Scroll-stacking effect ══════ */}
      {showsOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 99999, background: '#000',
            overflowY: 'auto',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setShowsOpen(false)}
            style={{
              position: 'fixed', top: '24px', right: '24px', zIndex: 100000,
              background: 'none', border: 'none', cursor: 'pointer', padding: '8px',
              width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <span style={{ position: 'absolute', width: '24px', height: '2px', background: 'white', transform: 'rotate(45deg)' }} />
            <span style={{ position: 'absolute', width: '24px', height: '2px', background: 'white', transform: 'rotate(-45deg)' }} />
          </button>

          {/* Title */}
          <div style={{ padding: '80px 40px 40px', textAlign: 'center' }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(28px, 5vw, 60px)', fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>
              EXPERIENCE
            </h2>
          </div>

          {/* Scroll-stacking layout: each card gets 100vh of scroll, sticks, next card covers previous */}
          <div style={{ position: 'relative' }}>
            {experiences.map((exp, i) => (
              <div
                key={i}
                style={{
                  height: '100vh',
                  position: 'sticky',
                  top: 0,
                  zIndex: i + 1,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    background: '#000',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '40px',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 40px',
                    alignItems: 'center',
                  }}
                >
                  {/* Left — Image card */}
                  <div>
                    <div style={{ aspectRatio: '3/4', borderRadius: '4px', overflow: 'hidden', position: 'relative', maxHeight: '70vh' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={exp.image} alt={exp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      {/* Type badge */}
                      <div style={{
                        position: 'absolute', top: '12px', left: '12px', padding: '4px 12px',
                        background: 'white', color: '#000', fontSize: '10px', fontWeight: 600,
                        letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px',
                      }}>
                        {exp.type}
                      </div>
                    </div>
                  </div>

                  {/* Right — Experience detail */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {/* Timeline: show all entries up to and including current */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                      {experiences.slice(0, i + 1).map((entry, j) => (
                        <div
                          key={j}
                          style={{
                            borderLeft: '1px solid rgba(255,255,255,0.15)',
                            paddingLeft: '24px',
                            opacity: j === i ? 1 : 0.35,
                            transition: 'opacity 0.3s',
                          }}
                        >
                          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
                            {entry.year}
                          </div>
                          <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 600, margin: '0 0 6px', letterSpacing: '0.02em' }}>
                            {entry.title}
                          </h3>
                          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 300, margin: 0 }}>
                            {entry.brand} · {entry.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Extra spacer so last card has scroll room */}
            <div style={{ height: '50vh' }} />
          </div>
        </div>
      )}
    </>
  )
}

// ═══════════════════════════════════════════════════════
// ZMR-AGENCY-GRID — Full talent grid with search, filters, hover swap, badges
// ═══════════════════════════════════════════════════════
const TALENT_TYPES = [
  { id: 'models', label: 'MODELS' },
  { id: 'advertising', label: 'ADVERTISING' },
  { id: 'promo', label: 'PROMO' },
  { id: 'parts', label: 'PARTS MODELS' },
]

const TALENT_SUBCATEGORIES: Record<string, { id: string; label: string }[]> = {
  models: [{ id: 'women', label: 'Women' }, { id: 'men', label: 'Men' }],
  advertising: [{ id: 'commercial', label: 'Commercial' }, { id: 'cinema', label: 'Cinema' }, { id: 'theater', label: 'Theater' }],
  promo: [{ id: 'beauty', label: 'Beauty & Fashion' }, { id: 'luxury', label: 'Luxury Events' }, { id: 'lifestyle', label: 'Lifestyle' }, { id: 'hostess', label: 'Hostess' }],
  parts: [{ id: 'hands', label: 'Hands' }, { id: 'feet', label: 'Feet' }, { id: 'face', label: 'Face' }, { id: 'legs', label: 'Legs' }, { id: 'body', label: 'Body' }],
}

const FILTER_OPTIONS = {
  gender: ['All', 'Women', 'Men'],
  eyes: ['All', 'Blue', 'Green', 'Brown', 'Hazel'],
  hair: ['All', 'Blonde', 'Brown', 'Black', 'Red'],
}

function ZmrAgencyGrid({ config, content, images }: { config: SectionConfig; content: Partial<GalleryContent>; images: GalleryImage[] }) {
  const [search, setSearch] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedSub, setSelectedSub] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [gender, setGender] = useState('All')
  const [eyes, setEyes] = useState('All')
  const [hair, setHair] = useState('All')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const toggleType = (id: string) => {
    setSelectedTypes(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id])
    setSelectedSub(null)
  }

  const activeFilterCount = (gender !== 'All' ? 1 : 0) + (eyes !== 'All' ? 1 : 0) + (hair !== 'All' ? 1 : 0)

  const filtered = useMemo(() => {
    let list = images
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(img => img.alt?.toLowerCase().includes(q))
    }
    if (selectedTypes.length > 0) {
      list = list.filter(img => {
        const badge = (img.badge ?? '').toLowerCase()
        return selectedTypes.some(t => badge.includes(t))
      })
    }
    if (selectedSub) {
      list = list.filter(img => (img.category ?? '').toLowerCase() === selectedSub || (img.subcategory ?? '').toLowerCase() === selectedSub)
    }
    if (gender !== 'All') {
      list = list.filter(img => (img.category ?? '').toLowerCase() === gender.toLowerCase())
    }
    if (eyes !== 'All') {
      list = list.filter(img => (img.caption ?? '').toLowerCase().includes(eyes.toLowerCase()))
    }
    if (hair !== 'All') {
      list = list.filter(img => (img.caption ?? '').toLowerCase().includes(hair.toLowerCase()))
    }
    return list
  }, [images, search, selectedTypes, selectedSub, gender, eyes, hair])

  // Subcategories for active type selections
  const activeSubcats = selectedTypes.length === 1 ? TALENT_SUBCATEGORIES[selectedTypes[0]] ?? [] : []

  return (
    <section
      style={{
        fontFamily: 'var(--font-body, inherit)',
        background: '#000',
        minHeight: '100vh',
        paddingTop: '180px',
        paddingBottom: '80px',
      }}
    >
      {/* Title */}
      {content.title && (
        <h2
          {...elementProps(config.id, 'title', 'heading')}
          style={{
            color: '#fff',
            fontSize: 'clamp(20px, 4vw, 40px)',
            fontWeight: 300,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          {content.title}
        </h2>
      )}

      {/* Search Bar */}
      <div style={{ maxWidth: '800px', margin: '0 auto 32px', padding: '0 40px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name..."
            style={{
              width: '100%',
              padding: '16px 56px 16px 24px',
              fontWeight: 300,
              fontSize: '16px',
              color: 'white',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50px',
              outline: 'none',
              transition: 'all 0.3s',
            }}
            onFocus={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
            onBlur={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          />
          <svg style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      {/* Type Filter Chips */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', padding: '0 20px' }}>
        {TALENT_TYPES.map(type => {
          const isActive = selectedTypes.includes(type.id)
          return (
            <button
              key={type.id}
              onClick={() => toggleType(type.id)}
              style={{
                background: isActive ? 'white' : 'transparent',
                border: isActive ? '1px solid white' : '1px solid rgba(255,255,255,0.3)',
                color: isActive ? 'black' : 'white',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: isActive ? 500 : 400,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {isActive && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {type.label}
            </button>
          )
        })}
      </div>

      {/* Subcategory Chips */}
      {activeSubcats.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', padding: '0 20px' }}>
          {activeSubcats.map(sub => {
            const isActive = selectedSub === sub.id
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSub(isActive ? null : sub.id)}
                style={{
                  background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  padding: '8px 16px',
                  fontSize: '12px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {sub.label}
              </button>
            )
          })}
        </div>
      )}

      {/* More Filters Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            background: 'none',
            border: 'none',
            color: showFilters ? 'white' : 'rgba(255,255,255,0.6)',
            fontSize: '13px',
            fontWeight: 300,
            letterSpacing: '0.1em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'color 0.2s',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
            <circle cx="8" cy="6" r="2" fill="currentColor" /><circle cx="16" cy="12" r="2" fill="currentColor" /><circle cx="10" cy="18" r="2" fill="currentColor" />
          </svg>
          More Filters
        </button>
        {activeFilterCount > 0 && (
          <button
            onClick={() => { setGender('All'); setEyes('All'); setHair('All') }}
            style={{
              background: 'rgba(255,100,100,0.1)',
              border: '1px solid rgba(255,100,100,0.3)',
              color: 'rgba(255,150,150,1)',
              padding: '6px 14px',
              fontSize: '12px',
              borderRadius: '15px',
              cursor: 'pointer',
            }}
          >
            Clear {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}
          </button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div style={{
          maxWidth: '900px',
          margin: '0 auto 40px',
          padding: '28px 32px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '24px',
        }}>
          {/* Gender */}
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Gender</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {FILTER_OPTIONS.gender.map(opt => (
                <button key={opt} onClick={() => setGender(opt)} style={{
                  padding: '8px 14px', fontSize: '12px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
                  background: gender === opt ? 'rgba(255,255,255,0.12)' : 'transparent',
                  border: gender === opt ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                }}>{opt}</button>
              ))}
            </div>
          </div>
          {/* Eye Color */}
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Eye Color</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {FILTER_OPTIONS.eyes.map(opt => (
                <button key={opt} onClick={() => setEyes(opt)} style={{
                  padding: '8px 14px', fontSize: '12px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
                  background: eyes === opt ? 'rgba(255,255,255,0.12)' : 'transparent',
                  border: eyes === opt ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                }}>{opt}</button>
              ))}
            </div>
          </div>
          {/* Hair Color */}
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Hair Color</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {FILTER_OPTIONS.hair.map(opt => (
                <button key={opt} onClick={() => setHair(opt)} style={{
                  padding: '8px 14px', fontSize: '12px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
                  background: hair === opt ? 'rgba(255,255,255,0.12)' : 'transparent',
                  border: hair === opt ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                }}>{opt}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Talent Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          padding: '0 40px',
          maxWidth: '1800px',
          margin: '0 auto',
        }}
      >
        {filtered.map((img, i) => (
          <a
            key={img.id}
            href="/talent"
            style={{ color: 'inherit', textDecoration: 'none', display: 'block', cursor: 'pointer' }}
            onMouseEnter={() => setHoveredId(img.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Image Container — 3:4 aspect with hover swap */}
            <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#1a1a1a', marginBottom: '16px' }}>
              {img.src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  {...elementProps(config.id, `images.${i}.src`, 'image')}
                  src={img.src}
                  alt={img.alt}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: '50% 20%',
                    opacity: hoveredId === img.id && img.hoverSrc ? 0 : 1,
                    transition: 'opacity 0.5s ease-in-out',
                  }}
                />
              )}
              {img.hoverSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.hoverSrc}
                  alt={img.alt}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: '50% 20%',
                    opacity: hoveredId === img.id ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                  }}
                />
              )}
              {!img.src && (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image className="w-8 h-8 text-zinc-600" />
                </div>
              )}
              {/* Type Badges */}
              {img.badge && (
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {img.badge.split(',').map((b, bi) => (
                    <span key={bi} style={{
                      padding: '4px 10px',
                      background: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      borderRadius: '4px',
                    }}>
                      {b.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {/* Name + Info */}
            <div style={{ textAlign: 'center', padding: '0 16px' }}>
              <h3
                {...elementProps(config.id, `images.${i}.alt`, 'text')}
                style={{
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 300,
                  letterSpacing: '0.05em',
                  margin: '0 0 4px 0',
                  opacity: hoveredId === img.id ? 0.6 : 1,
                  transition: 'opacity 0.3s',
                }}
              >
                {img.alt || `Talent ${i + 1}`}
              </h3>
              {img.caption && (
                <p style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '12px',
                  fontWeight: 300,
                  letterSpacing: '0.1em',
                  margin: 0,
                }}>
                  {img.caption}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>

      {/* No Results */}
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 40px', color: 'rgba(255,255,255,0.4)', fontSize: '18px', fontWeight: 300 }}>
          No talents found matching your criteria
        </div>
      )}
    </section>
  )
}

export const galleryMeta = {
  type: 'gallery-grid',
  label: 'Galerie',
  icon: '🖼️',
  variants: [
    'startup-grid', 'startup-masonry',
    'corporate-grid', 'corporate-masonry',
    'luxe-grid', 'luxe-masonry',
    'creative-grid', 'creative-masonry',
    'ecommerce-grid', 'ecommerce-masonry',
    'glass-grid', 'glass-masonry',
    'brixsa-listing',
    'brixsa-detail',
    'zmr-agency-grid',
    'zmr-showcase',
  ],
  defaultVariant: 'startup-grid',
  defaultContent: {},
}
