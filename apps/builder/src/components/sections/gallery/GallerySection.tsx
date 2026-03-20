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

export function GallerySection({ config, isEditing }: { config: SectionConfig; isEditing?: boolean }) {
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
      const btn = content.primaryButton
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
  // OBSCURA — Photographer Portfolio Grid
  // ═══════════════════════════════════════════

  if (variant === 'obscura-portfolio') {
    const defaultItems = [
      { id: '1', title: 'Lumière Dorée', category: 'Portrait', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85' },
      { id: '2', title: 'Le Grand Jour', category: 'Mariage', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85' },
      { id: '3', title: 'Gala Annuel', category: 'Événement', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85' },
      { id: '4', title: 'Horizon Lointain', category: 'Paysage', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85' },
      { id: '5', title: 'Vie Urbaine', category: 'Street', image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=85' },
      { id: '6', title: 'Haute Couture', category: 'Éditorial', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85' },
    ]

    const rawItems = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; category?: string; image?: string
    }> | undefined

    const cards = rawItems && rawItems.length > 0
      ? rawItems.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultItems[i % defaultItems.length].title,
          category: item.category ?? defaultItems[i % defaultItems.length].category,
          image: item.image ?? defaultItems[i % defaultItems.length].image,
        }))
      : defaultItems

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Portfolio Section')}
        style={{
          background: '#0A0A0A',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: 'var(--font-body, inherit)',
        }}
      >
        <style>{`
          .obscura-img-dezoom { transform: scale(1.15); transition: transform 1.2s ease-out; }
          .obscura-img-dezoom.obscura-revealed { transform: scale(1); }
          .obscura-card:hover .obscura-img-zoom { transform: scale(1.05) !important; }
          .obscura-card:hover .obscura-overlay { opacity: 1 !important; }
          .obscura-card:hover .obscura-hover-label { opacity: 1 !important; transform: translateY(0) !important; }
          @media (max-width: 768px) {
            .obscura-resp-grid { grid-template-columns: 1fr !important; }
            .obscura-resp-grid > * { grid-row: span 1 !important; }
            .obscura-resp-header { flex-direction: column; align-items: flex-start !important; }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .obscura-resp-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div
            {...elementProps(config.id, 'header', 'container', 'Header')}
            className="flex justify-between items-end obscura-resp-header"
            style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}
          >
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              style={{
                fontFamily: '"GeneralSans Variable", sans-serif',
                fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                fontWeight: 400,
                lineHeight: '110%',
                color: '#E8E4DF',
                margin: 0,
              }}
            >
              {content.title ?? 'Portfolio'}
            </h2>
            <a
              {...elementProps(config.id, 'viewAllLink', 'text', 'View All Link')}
              href="/portfolio"
              style={{
                fontFamily: '"Inter Variable", sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                color: '#8A8480',
                textDecoration: 'none',
                transition: 'color 0.3s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#D4A853' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#8A8480' }}
            >
              Voir tout &rarr;
            </a>
          </div>

          {/* Grid — alternating heights for masonry effect */}
          <div
            {...elementProps(config.id, 'grid', 'container', 'Portfolio Grid')}
            className="grid obscura-resp-grid"
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
            }}
          >
            {cards.map((card, i) => {
              // Alternating tall/short pattern: row 1 = tall-short-tall, row 2 = short-tall-short
              const rowIndex = Math.floor(i / 3)
              const colIndex = i % 3
              const isTall = (rowIndex % 2 === 0) ? (colIndex % 2 === 0) : (colIndex % 2 === 1)

              return (
                <div
                  key={card.id}
                  {...elementProps(config.id, `items.${i}`, 'container', 'Portfolio Item')}
                  className="obscura-card relative cursor-pointer"
                  style={{
                    gridRow: isTall ? 'span 2' : 'span 1',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    minHeight: isTall ? '500px' : '240px',
                  }}
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.obscura-img-dezoom')
                        if (img) img.classList.add('obscura-revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                  {/* Image */}
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={card.image}
                      alt={card.title}
                      className="obscura-img-zoom obscura-img-dezoom"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        inset: 0,
                        transition: 'transform 0.6s ease',
                      }}
                    />
                  ) : (
                    <div
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      className="obscura-img-zoom obscura-img-dezoom"
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, #1a1a1a, #0d0d0d)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.6s ease',
                      }}
                    >
                      <Image className="w-8 h-8" style={{ color: 'rgba(212, 168, 83, 0.3)' }} />
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div
                    className="obscura-overlay absolute inset-0"
                    style={{
                      backgroundColor: 'rgba(10, 10, 10, 0.4)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                      zIndex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <span
                      className="obscura-hover-label"
                      style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase' as const,
                        color: '#D4A853',
                        opacity: 0,
                        transform: 'translateY(8px)',
                        transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
                      }}
                    >
                      Voir
                    </span>
                    <span
                      className="obscura-hover-label"
                      style={{
                        fontSize: '11px',
                        fontWeight: 400,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase' as const,
                        color: '#8A8480',
                        opacity: 0,
                        transform: 'translateY(8px)',
                        transition: 'opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s',
                      }}
                    >
                      {card.category}
                    </span>
                  </div>

                  {/* Bottom title (subtle) */}
                  <div
                    {...elementProps(config.id, `items.${i}.meta`, 'container', 'Item Meta')}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '40px 16px 16px',
                      background: 'linear-gradient(to top, rgba(10,10,10,0.6), transparent)',
                      zIndex: 2,
                      pointerEvents: 'none',
                    }}
                  >
                    <span
                      {...elementProps(config.id, `items.${i}.title`, 'text')}
                      style={{
                        fontFamily: '"Inter Variable", sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase' as const,
                        color: 'rgba(232, 228, 223, 0.6)',
                      }}
                    >
                      {card.title}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CANOPY — E-commerce Product Grid
  // ═══════════════════════════════════════════

  if (variant === 'canopy-products') {
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

    const defaultProducts = [
      { id: '1', title: 'Tree Runner', subtitle: 'Chaussure de running légère', price: '130 €', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', badge: 'Nouveau' },
      { id: '2', title: 'Wool Lounger', subtitle: 'Confort naturel au quotidien', price: '110 €', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80' },
      { id: '3', title: 'Tree Dasher', subtitle: 'Performance et durabilité', price: '145 €', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80', badge: 'Best-seller' },
      { id: '4', title: 'Wool Runner', subtitle: 'Le classique en laine mérinos', price: '120 €', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80' },
      { id: '5', title: 'Trail Runner', subtitle: 'Traction tout-terrain', price: '155 €', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80', badge: 'Nouveau' },
      { id: '6', title: 'Pacer', subtitle: 'Énergie à chaque foulée', price: '135 €', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80' },
    ]

    const items = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; subtitle?: string; price?: string;
      image?: string; badge?: string;
    }> | undefined

    const products = items && items.length > 0
      ? items.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultProducts[i % defaultProducts.length].title,
          subtitle: item.subtitle ?? defaultProducts[i % defaultProducts.length].subtitle,
          price: item.price ?? defaultProducts[i % defaultProducts.length].price,
          image: item.image,
          badge: item.badge,
        }))
      : defaultProducts

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Products Section')}
        style={{
          background: '#FAFAF8',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
        }}
      >
        <style>{`
          .canopy-card:hover .canopy-img-zoom { transform: scale(1.05) !important; }
          .canopy-img-dezoom { transform: scale(1.15); transition: transform 1.2s ease-out; }
          .canopy-img-dezoom.canopy-revealed { transform: scale(1); }
          .canopy-card:hover .canopy-text-slide { transform: translateY(-36px) !important; }
          .canopy-btn-fill { transform: translateX(102%); transition: transform 0.4s ease; }
          .canopy-btn:hover .canopy-btn-fill { transform: translateX(0); }
          .canopy-btn:hover .canopy-btn-label { color: #fff; }
          .canopy-btn-label { transition: color 0.4s; }
          .canopy-link { text-decoration: none; color: inherit; display: block; }
          .canopy-link:hover { text-decoration: none; }
          @media (max-width: 768px) {
            .canopy-grid { grid-template-columns: 1fr !important; }
            .canopy-resp-header { flex-direction: column; align-items: flex-start !important; }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .canopy-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header — title left + button right (brixsa layout) */}
          <div
            {...elementProps(config.id, 'header', 'container', 'Header')}
            className="flex justify-between items-end canopy-resp-header"
            style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}
          >
            <div style={{ maxWidth: '760px' }}>
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: "'Inter Variable', var(--font-heading, sans-serif)",
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 700,
                  lineHeight: '110%',
                  color: '#1A1A1A',
                  letterSpacing: '-0.02em',
                }}
              >
                {content.title ?? 'Nos produits'}
              </h2>
            </div>
            <a
              {...elementProps(config.id, 'subtitle', 'text')}
              href="#"
              className="canopy-btn flex items-center relative overflow-hidden"
              style={{ fontSize: '20px', fontWeight: 500, color: '#1A1A1A', padding: '10px 12px 10px 20px', gap: '10px', textDecoration: 'none' }}
            >
              <span {...elementProps(config.id, 'viewAllLabel', 'text', 'Link Text')} className="canopy-btn-label relative" style={{ zIndex: 10 }}>
                {(content as Record<string, unknown>).subtitle as string ?? 'Voir tout'}
              </span>
              <span
                {...elementProps(config.id, 'viewAllIcon', 'icon', 'Arrow Icon')}
                className="flex items-center justify-center"
                style={{
                  background: '#2D5016',
                  color: '#fff',
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
              {/* Animated bg — fills from right to left on hover */}
              <span className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
                <span className="canopy-btn-fill" style={{ display: 'block', background: '#2D5016', width: '100%', height: '100%' }} />
              </span>
            </a>
          </div>

          {/* Product Grid */}
          <div
            {...elementProps(config.id, 'grid', 'container', 'Product Grid')}
            className="canopy-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              columnGap: 'clamp(16px, 2vw, 24px)',
              rowGap: 'clamp(30px, 5vw, 60px)',
            }}
          >
            {products.map((product, i) => (
              <a
                key={product.id}
                {...elementProps(config.id, `items.${i}`, 'text')}
                href="#"
                className="canopy-card block w-full canopy-link"
              >
                {/* Image with dezoom on scroll reveal */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.canopy-img-dezoom')
                        if (img) img.classList.add('canopy-revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                <div className="overflow-hidden" style={{ aspectRatio: '4/5', position: 'relative' }}>
                  {product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={product.image}
                      alt={product.title}
                      className="canopy-img-zoom canopy-img-dezoom w-full h-full object-cover"
                      style={{ transition: 'transform 0.6s ease' }}
                    />
                  ) : (
                    <div
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      className="canopy-img-zoom canopy-img-dezoom w-full h-full flex items-center justify-center"
                      style={{ background: '#F0EDE8', transition: 'transform 0.6s ease' }}
                    >
                      <Image className="w-10 h-10" style={{ color: '#C4BFB6' }} />
                    </div>
                  )}
                  {/* Glassmorphism badge top-left */}
                  {product.badge && (
                    <span
                      {...elementProps(config.id, `items.${i}.badge`, 'badge')}
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        background: 'rgba(0,0,0,0.45)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        padding: '6px 14px',
                        lineHeight: 1,
                        zIndex: 2,
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>
                </div>

                {/* Product Info — text slides up on hover to reveal price */}
                <div style={{ marginTop: '16px' }}>
                  <div style={{ overflow: 'hidden', height: '36px' }}>
                    <div
                      className="canopy-text-slide"
                      style={{ transition: 'transform 0.4s ease' }}
                    >
                      <h3
                        {...elementProps(config.id, `items.${i}.title`, 'text')}
                        style={{
                          fontSize: '24px',
                          fontWeight: 500,
                          lineHeight: '36px',
                          color: '#1A1A1A',
                          fontFamily: "'Inter Variable', sans-serif",
                          margin: 0,
                        }}
                      >
                        {product.title}
                      </h3>
                      <span
                        {...elementProps(config.id, `items.${i}.price`, 'text')}
                        style={{
                          fontSize: '24px',
                          fontWeight: 500,
                          lineHeight: '36px',
                          color: '#1A1A1A',
                          display: 'block',
                        }}
                      >
                        {product.price}
                      </span>
                    </div>
                  </div>
                  {/* Subtitle — stays in place */}
                  <span
                    {...elementProps(config.id, `items.${i}.subtitle`, 'text')}
                    style={{ fontSize: '16px', fontWeight: 400, color: '#8B7355', marginTop: '4px', display: 'block' }}
                  >
                    {product.subtitle}
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
  // NACRE — Nail Salon Services Grid
  // ═══════════════════════════════════════════

  if (variant === 'nacre-services') {
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
      { id: '1', title: 'Manucure Classique', duration: '30 min', price: '25\u20AC', description: 'Limage, cuticules, vernis couleur au choix', image: '' },
      { id: '2', title: 'Pose Gel Compl\u00E8te', duration: '1h30', price: '55\u20AC', description: 'Pr\u00E9paration, pose gel UV, modelage, finition', image: '' },
      { id: '3', title: 'Nail Art Premium', duration: '2h', price: '75\u20AC', description: 'Cr\u00E9ation sur-mesure, strass, d\u00E9grad\u00E9s, motifs', image: '' },
      { id: '4', title: 'P\u00E9dicure Spa', duration: '1h', price: '45\u20AC', description: 'Bain relaxant, gommage, soin, vernis', image: '' },
      { id: '5', title: 'Semi-Permanent', duration: '45 min', price: '35\u20AC', description: 'Vernis longue tenue 2-3 semaines', image: '' },
      { id: '6', title: 'Soin Paraffine', duration: '30 min', price: '30\u20AC', description: 'Hydratation intense, bain paraffine ti\u00E8de', image: '' },
    ]

    const items = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; duration?: string; price?: string;
      description?: string; image?: string;
    }> | undefined

    const cards = items && items.length > 0
      ? items.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultCards[i % 6].title,
          duration: item.duration ?? defaultCards[i % 6].duration,
          price: item.price ?? defaultCards[i % 6].price,
          description: item.description ?? defaultCards[i % 6].description,
          image: item.image,
        }))
      : defaultCards

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Services Section')}
        style={{
          background: '#F5E6E0',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: 'var(--font-body, inherit)',
        }}
      >
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div {...elementProps(config.id, 'header', 'container', 'Header')} className="flex justify-between items-end nacre-resp-services-header" style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}>
            <div style={{ maxWidth: '760px' }}>
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: '"GeneralSans Variable", sans-serif',
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 500,
                  lineHeight: '110%',
                  textTransform: 'capitalize',
                  color: '#2A1A1E',
                }}
              >
                {content.title ?? 'Nos Prestations'}
              </h2>
            </div>
            <a
              {...elementProps(config.id, 'subtitle', 'text')}
              href="/tarifs"
              className="nacre-btn flex items-center relative overflow-hidden"
              style={{ fontSize: '20px', fontWeight: 500, color: '#2A1A1E', padding: '10px 12px 10px 20px', gap: '10px', borderRadius: '6px', textDecoration: 'none' }}
            >
              <span {...elementProps(config.id, 'viewAllLabel', 'text', 'Link Text')} className="nacre-btn-label relative" style={{ zIndex: 10 }}>Voir les tarifs</span>
              <span
                {...elementProps(config.id, 'viewAllIcon', 'icon', 'Arrow Icon')}
                className="flex items-center justify-center"
                style={{
                  background: '#C9A96E',
                  color: '#2A1A1E',
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
                <span className="nacre-btn-fill" style={{ display: 'block', background: '#C9A96E', width: '100%', height: '100%' }} />
              </span>
            </a>
          </div>

          {/* Grid */}
          <style>{`
            .nacre-card:hover .nacre-img-zoom { transform: scale(1.05) !important; }
            .nacre-img-dezoom { transform: scale(1.15); transition: transform 1.2s ease-out; }
            .nacre-img-dezoom.revealed { transform: scale(1); }
            .nacre-btn-fill { transform: translateX(102%); transition: transform 0.4s ease; }
            .nacre-btn:hover .nacre-btn-fill { transform: translateX(0); }
            .nacre-btn:hover .nacre-btn-label { color: #2A1A1E; }
            .nacre-btn-label { transition: color 0.4s; }
            .nacre-reserve-btn { position: relative; overflow: hidden; display: inline-flex; align-items: center; gap: 8px; }
            .nacre-reserve-fill { position: absolute; inset: 0; background: #C9A96E; transform: translateX(102%); transition: transform 0.4s ease; }
            .nacre-reserve-btn:hover .nacre-reserve-fill { transform: translateX(0); }
            .nacre-reserve-btn:hover .nacre-reserve-label { color: #2A1A1E; }
            .nacre-reserve-label { transition: color 0.4s; }
            @media (max-width: 768px) {
              .nacre-resp-services-grid { grid-template-columns: 1fr !important; }
              .nacre-resp-services-header { flex-direction: column; align-items: flex-start !important; }
            }
            @media (min-width: 769px) and (max-width: 1024px) {
              .nacre-resp-services-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
          <div {...elementProps(config.id, 'grid', 'container', 'Services Grid')} className="grid grid-cols-3 nacre-resp-services-grid" style={{ columnGap: 'clamp(16px, 2vw, 24px)', rowGap: 'clamp(30px, 5vw, 60px)' }}>
            {cards.map((card, i) => (
              <div
                key={card.id}
                ref={scrollRevealRef}
                {...elementProps(config.id, `items.${i}`, 'container')}
                className="nacre-card"
                style={{ color: 'inherit' }}
              >
                {/* Image */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.nacre-img-dezoom')
                        if (img) img.classList.add('revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                <div className="overflow-hidden relative" style={{ aspectRatio: '3/4', borderRadius: '8px' }}>
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={card.image}
                      alt={card.title}
                      className="nacre-img-zoom nacre-img-dezoom w-full h-full object-cover"
                      style={{ transition: 'transform 0.6s ease' }}
                    />
                  ) : (
                    <div
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      className="nacre-img-zoom nacre-img-dezoom w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(to bottom, #d4bfb5, #c4a99c)', transition: 'transform 0.6s ease' }}
                    >
                      <Image className="w-8 h-8 text-white/40" />
                    </div>
                  )}
                  {/* Glass badge: duration + price */}
                  <span
                    {...elementProps(config.id, `items.${i}.badge`, 'badge')}
                    className="flex items-center"
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      background: 'rgba(197, 169, 110, 0.3)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '4px',
                      padding: '6px 14px',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#fff',
                      gap: '8px',
                      zIndex: 2,
                    }}
                  >
                    {card.duration} &middot; {card.price}
                  </span>
                </div>
                </div>

                {/* Body */}
                <div style={{ marginTop: '16px' }}>
                  <h3
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    style={{
                      fontFamily: '"GeneralSans Variable", sans-serif',
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: '140%',
                      color: '#2A1A1E',
                      marginBottom: '6px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    {...elementProps(config.id, `items.${i}.description`, 'text')}
                    style={{
                      fontFamily: '"Inter Variable", Inter, sans-serif',
                      fontSize: '14px',
                      lineHeight: '150%',
                      color: '#8A7A75',
                      marginBottom: '14px',
                    }}
                  >
                    {card.description}
                  </p>
                  <a
                    {...elementProps(config.id, `items.${i}.cta`, 'button')}
                    href="/reservation"
                    className="nacre-reserve-btn"
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#C9A96E',
                      padding: '8px 18px',
                      borderRadius: '4px',
                      border: '1px solid #C9A96E',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <span className="nacre-reserve-fill" />
                    <span className="nacre-reserve-label relative" style={{ zIndex: 1 }}>R&eacute;server</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRAISE — Restaurant Menu Grid
  // ═══════════════════════════════════════════

  if (variant === 'braise-menu') {
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
      { id: '1', title: 'Filet de Boeuf Rossini', price: '48\u20AC', description: 'Foie gras po\u00EAl\u00E9, sauce P\u00E9rigueux, pommes fondantes', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=85' },
      { id: '2', title: 'Homard Bleu R\u00F4ti', price: '62\u20AC', description: 'Bisque cr\u00E9meuse, l\u00E9gumes de saison, beurre corail', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=85' },
      { id: '3', title: 'Risotto aux Truffes', price: '38\u20AC', description: 'Truffe noire du P\u00E9rigord, parmesan 24 mois, huile de truffe', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=85' },
      { id: '4', title: 'Saint-Jacques Snack\u00E9es', price: '42\u20AC', description: 'Pur\u00E9e de c\u00E9leri, noisettes torr\u00E9fi\u00E9es, jus de viande', image: 'https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=800&q=85' },
      { id: '5', title: 'Souffl\u00E9 au Chocolat', price: '18\u20AC', description: 'Grand cru Valrhona, cr\u00E8me anglaise \u00E0 la vanille', image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800&q=85' },
      { id: '6', title: 'Tarte Tatin', price: '16\u20AC', description: 'Pommes caram\u00E9lis\u00E9es, cr\u00E8me fra\u00EEche \u00E9paisse, glace vanille', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=85' },
    ]

    const items = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; price?: string;
      description?: string; image?: string;
    }> | undefined

    const cards = items && items.length > 0
      ? items.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultCards[i % 6].title,
          price: item.price ?? defaultCards[i % 6].price,
          description: item.description ?? defaultCards[i % 6].description,
          image: item.image ?? defaultCards[i % 6].image,
        }))
      : defaultCards

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Menu Section')}
        style={{
          background: '#F5F0E8',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div {...elementProps(config.id, 'header', 'container', 'Header')} className="flex justify-between items-end braise-resp-menu-header" style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}>
            <div style={{ maxWidth: '760px' }}>
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 500,
                  lineHeight: '110%',
                  textTransform: 'capitalize',
                  color: '#1A1209',
                }}
              >
                {content.title ?? 'Nos Plats Signatures'}
              </h2>
            </div>
            <a
              {...elementProps(config.id, 'subtitle', 'text')}
              href="/carte"
              className="braise-btn flex items-center relative overflow-hidden"
              style={{ fontSize: '20px', fontWeight: 500, color: '#1A1209', padding: '10px 12px 10px 20px', gap: '10px', borderRadius: '6px', textDecoration: 'none' }}
            >
              <span {...elementProps(config.id, 'viewAllLabel', 'text', 'Link Text')} className="braise-btn-label relative" style={{ zIndex: 10 }}>Voir la carte</span>
              <span
                {...elementProps(config.id, 'viewAllIcon', 'icon', 'Arrow Icon')}
                className="flex items-center justify-center"
                style={{
                  background: '#C8A96E',
                  color: '#1A1209',
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
                <span className="braise-btn-fill" style={{ display: 'block', background: '#C8A96E', width: '100%', height: '100%' }} />
              </span>
            </a>
          </div>

          {/* Grid */}
          <style>{`
            .braise-card:hover .braise-img-zoom { transform: scale(1.05) !important; }
            .braise-img-dezoom { transform: scale(1.05); transition: transform 1.2s ease-out; }
            .braise-img-dezoom.revealed { transform: scale(1); }
            .braise-btn-fill { transform: translateX(102%); transition: transform 0.4s ease; }
            .braise-btn:hover .braise-btn-fill { transform: translateX(0); }
            .braise-btn:hover .braise-btn-label { color: #1A1209; }
            .braise-btn-label { transition: color 0.4s; }
            .braise-link { color: transparent; transition: color 0.3s; font-size: 14px; font-weight: 500; }
            .braise-card:hover .braise-link { color: #C8A96E; }
            @media (max-width: 768px) {
              .braise-resp-menu-grid { grid-template-columns: 1fr !important; }
              .braise-resp-menu-header { flex-direction: column; align-items: flex-start !important; }
            }
            @media (min-width: 769px) and (max-width: 1024px) {
              .braise-resp-menu-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
          <div {...elementProps(config.id, 'grid', 'container', 'Menu Grid')} className="grid grid-cols-3 braise-resp-menu-grid" style={{ columnGap: 'clamp(16px, 2vw, 24px)', rowGap: 'clamp(30px, 5vw, 60px)' }}>
            {cards.map((card, i) => (
              <div
                key={card.id}
                ref={scrollRevealRef}
                {...elementProps(config.id, `items.${i}`, 'container')}
                className="braise-card"
                style={{ color: 'inherit' }}
              >
                {/* Image */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.braise-img-dezoom')
                        if (img) img.classList.add('revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                <div className="overflow-hidden relative" style={{ aspectRatio: '3/4', borderRadius: '8px' }}>
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={card.image}
                      alt={card.title}
                      className="braise-img-zoom braise-img-dezoom w-full h-full object-cover"
                      style={{ transition: 'transform 0.6s ease' }}
                    />
                  ) : (
                    <div
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      className="braise-img-zoom braise-img-dezoom w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(to bottom, #2A1F14, #1A1209)', transition: 'transform 0.6s ease' }}
                    >
                      <Image className="w-8 h-8 text-white/40" />
                    </div>
                  )}
                  {/* Glass badge: price */}
                  <span
                    {...elementProps(config.id, `items.${i}.badge`, 'badge')}
                    className="flex items-center"
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(26, 18, 9, 0.6)',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                      borderRadius: '4px',
                      padding: '6px 14px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#F5F0E8',
                      zIndex: 2,
                    }}
                  >
                    {card.price}
                  </span>
                </div>
                </div>

                {/* Body */}
                <div style={{ marginTop: '16px' }}>
                  <h3
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: '140%',
                      color: '#1A1209',
                      marginBottom: '6px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    {...elementProps(config.id, `items.${i}.description`, 'text')}
                    style={{
                      fontSize: '14px',
                      lineHeight: '150%',
                      color: '#6B5D4F',
                      marginBottom: '14px',
                    }}
                  >
                    {card.description}
                  </p>
                  <span
                    {...elementProps(config.id, `items.${i}.cta`, 'button')}
                    className="braise-link"
                  >
                    Voir la carte &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // FORGE — Sports Coach Programs Grid
  // ═══════════════════════════════════════════

  if (variant === 'forge-programs') {
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
      { id: '1', title: 'Perte de Poids', duration: '12 semaines', description: 'Programme intensif combinant HIIT, musculation et plan nutritionnel personnalisé pour des résultats durables.', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=85' },
      { id: '2', title: 'Prise de Masse', duration: '16 semaines', description: 'Hypertrophie ciblée avec progression de charge, récupération optimisée et suivi macro-nutritionnel.', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=85' },
      { id: '3', title: 'HIIT & Cardio', duration: '8 semaines', description: 'Entraînements haute intensité pour booster votre métabolisme et votre endurance cardiovasculaire.', image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=85' },
      { id: '4', title: 'Remise en Forme', duration: '10 semaines', description: 'Reprise progressive adaptée à votre niveau avec renforcement musculaire et mobilité articulaire.', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=85' },
      { id: '5', title: 'Prépa Sportive', duration: '6 semaines', description: 'Préparation physique spécifique pour compétition, sport collectif ou défi personnel.', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=85' },
      { id: '6', title: 'Coaching Nutrition', duration: '8 semaines', description: 'Plan alimentaire sur-mesure, suivi hebdomadaire et éducation nutritionnelle pour transformer vos habitudes.', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=85' },
    ]

    const items = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; duration?: string;
      description?: string; image?: string;
    }> | undefined

    const cards = items && items.length > 0
      ? items.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultCards[i % 6].title,
          duration: item.duration ?? defaultCards[i % 6].duration,
          description: item.description ?? defaultCards[i % 6].description,
          image: item.image ?? defaultCards[i % 6].image,
        }))
      : defaultCards

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Programs Section')}
        style={{
          background: '#0A0A0A',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div {...elementProps(config.id, 'header', 'container', 'Header')} className="flex justify-between items-end forge-resp-programs-header" style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}>
            <div style={{ maxWidth: '760px' }}>
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 500,
                  lineHeight: '110%',
                  textTransform: 'capitalize',
                  color: '#E8E8E8',
                }}
              >
                {content.title ?? 'Nos Programmes'}
              </h2>
            </div>
            <a
              {...elementProps(config.id, 'subtitle', 'text')}
              href="/programmes"
              className="forge-btn flex items-center relative overflow-hidden"
              style={{ fontSize: '20px', fontWeight: 500, color: '#E8E8E8', padding: '10px 12px 10px 20px', gap: '10px', borderRadius: '6px', textDecoration: 'none' }}
            >
              <span {...elementProps(config.id, 'viewAllLabel', 'text', 'Link Text')} className="forge-btn-label relative" style={{ zIndex: 10 }}>Tous les programmes</span>
              <span
                {...elementProps(config.id, 'viewAllIcon', 'icon', 'Arrow Icon')}
                className="flex items-center justify-center"
                style={{
                  background: '#FF4D00',
                  color: '#FFFFFF',
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
                <span className="forge-btn-fill" style={{ display: 'block', background: '#FF4D00', width: '100%', height: '100%' }} />
              </span>
            </a>
          </div>

          {/* Grid */}
          <style>{`
            .forge-card:hover .forge-img-zoom { transform: scale(1.05) !important; }
            .forge-img-dezoom { transform: scale(1.05); transition: transform 1.2s ease-out; }
            .forge-img-dezoom.revealed { transform: scale(1); }
            .forge-btn-fill { transform: translateX(102%); transition: transform 0.4s ease; }
            .forge-btn:hover .forge-btn-fill { transform: translateX(0); }
            .forge-btn:hover .forge-btn-label { color: #FFFFFF; }
            .forge-btn-label { transition: color 0.4s; }
            .forge-link { color: transparent; transition: color 0.3s; font-size: 14px; font-weight: 500; }
            .forge-card:hover .forge-link { color: #FF4D00; }
            @media (max-width: 768px) {
              .forge-resp-programs-grid { grid-template-columns: 1fr !important; }
              .forge-resp-programs-header { flex-direction: column; align-items: flex-start !important; }
            }
            @media (min-width: 769px) and (max-width: 1024px) {
              .forge-resp-programs-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
          <div {...elementProps(config.id, 'grid', 'container', 'Programs Grid')} className="grid grid-cols-3 forge-resp-programs-grid" style={{ columnGap: 'clamp(16px, 2vw, 24px)', rowGap: 'clamp(30px, 5vw, 60px)' }}>
            {cards.map((card, i) => (
              <div
                key={card.id}
                ref={scrollRevealRef}
                {...elementProps(config.id, `items.${i}`, 'container')}
                className="forge-card"
                style={{ color: 'inherit' }}
              >
                {/* Image */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.forge-img-dezoom')
                        if (img) img.classList.add('revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                <div className="overflow-hidden relative" style={{ aspectRatio: '3/4', borderRadius: '8px' }}>
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={card.image}
                      alt={card.title}
                      className="forge-img-zoom forge-img-dezoom w-full h-full object-cover"
                      style={{ transition: 'transform 0.6s ease' }}
                    />
                  ) : (
                    <div
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      className="forge-img-zoom forge-img-dezoom w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(to bottom, #1A1A1A, #0A0A0A)', transition: 'transform 0.6s ease' }}
                    >
                      <Image className="w-8 h-8 text-white/40" />
                    </div>
                  )}
                  {/* Glass badge: duration */}
                  <span
                    {...elementProps(config.id, `items.${i}.badge`, 'badge')}
                    className="flex items-center"
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(255, 77, 0, 0.3)',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                      borderRadius: '4px',
                      padding: '6px 14px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      zIndex: 2,
                    }}
                  >
                    {card.duration}
                  </span>
                </div>
                </div>

                {/* Body */}
                <div style={{ marginTop: '16px' }}>
                  <h3
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: '140%',
                      color: '#E8E8E8',
                      marginBottom: '6px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    {...elementProps(config.id, `items.${i}.description`, 'text')}
                    style={{
                      fontSize: '14px',
                      lineHeight: '150%',
                      color: '#888888',
                      marginBottom: '14px',
                    }}
                  >
                    {card.description}
                  </p>
                  <span
                    {...elementProps(config.id, `items.${i}.cta`, 'button')}
                    className="forge-link"
                  >
                    En savoir plus &rarr;
                  </span>
                </div>
              </div>
            ))}
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

  // ═══════════════════════════════════════════
  // CISEAUX — Hair Salon Réalisations Grid
  // ═══════════════════════════════════════════

  if (variant === 'ciseaux-realisations') {
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
      { id: '1', title: 'Balayage Californien', category: 'Coloration', description: 'Un balayage lumineux et naturel pour un effet sun-kissed irrésistible.', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=85' },
      { id: '2', title: 'Coupe Structurée', category: 'Coupe', description: 'Des lignes nettes et un volume maîtrisé pour un look affirmé.', image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=85' },
      { id: '3', title: 'Blond Polaire', category: 'Coloration', description: 'Un blond glacé d\'une pureté absolue, sans compromis sur la brillance.', image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=85' },
      { id: '4', title: 'Coupe Homme Tendance', category: 'Coupe', description: 'Dégradé précis et texture travaillée pour un style contemporain.', image: 'https://images.unsplash.com/photo-1503951914875-452d3d18fc80?w=800&q=85' },
      { id: '5', title: 'Chignon Mariage', category: 'Événement', description: 'Une coiffure élégante et tenue pour le plus beau jour de votre vie.', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=85' },
      { id: '6', title: 'Soin Kératine', category: 'Soin', description: 'Un soin profond qui restaure la fibre et sublime la brillance naturelle.', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=85' },
    ]

    const items = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; category?: string;
      description?: string; image?: string;
    }> | undefined

    const cards = items && items.length > 0
      ? items.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultCards[i % 6].title,
          category: item.category ?? defaultCards[i % 6].category,
          description: item.description ?? defaultCards[i % 6].description,
          image: item.image ?? defaultCards[i % 6].image,
        }))
      : defaultCards

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Réalisations Section')}
        style={{
          background: '#FFFFFF',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div {...elementProps(config.id, 'header', 'container', 'Header')} className="flex justify-between items-end ciseaux-resp-realisations-header" style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}>
            <div style={{ maxWidth: '760px' }}>
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 500,
                  lineHeight: '110%',
                  textTransform: 'capitalize',
                  color: '#0B0B0B',
                }}
              >
                {content.title ?? 'Nos Réalisations'}
              </h2>
            </div>
            <a
              {...elementProps(config.id, 'subtitle', 'text')}
              href="/realisations"
              className="ciseaux-btn flex items-center relative overflow-hidden"
              style={{ fontSize: '20px', fontWeight: 500, color: '#0B0B0B', padding: '10px 12px 10px 20px', gap: '10px', borderRadius: '6px', textDecoration: 'none' }}
            >
              <span {...elementProps(config.id, 'viewAllLabel', 'text', 'Link Text')} className="ciseaux-btn-label relative" style={{ zIndex: 10 }}>Toutes nos réalisations</span>
              <span
                {...elementProps(config.id, 'viewAllIcon', 'icon', 'Arrow Icon')}
                className="flex items-center justify-center"
                style={{
                  background: '#B76E79',
                  color: '#FFFFFF',
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
                <span className="ciseaux-btn-fill" style={{ display: 'block', background: '#B76E79', width: '100%', height: '100%' }} />
              </span>
            </a>
          </div>

          {/* Grid */}
          <style>{`
            .ciseaux-card:hover .ciseaux-img-zoom { transform: scale(1.05) !important; }
            .ciseaux-img-dezoom { transform: scale(1.05); transition: transform 1.2s ease-out; }
            .ciseaux-img-dezoom.revealed { transform: scale(1); }
            .ciseaux-btn-fill { transform: translateX(102%); transition: transform 0.4s ease; }
            .ciseaux-btn:hover .ciseaux-btn-fill { transform: translateX(0); }
            .ciseaux-btn:hover .ciseaux-btn-label { color: #FFFFFF; }
            .ciseaux-btn-label { transition: color 0.4s; }
            .ciseaux-link { color: transparent; transition: color 0.3s; font-size: 14px; font-weight: 500; }
            .ciseaux-card:hover .ciseaux-link { color: #B76E79; }
            @media (max-width: 768px) {
              .ciseaux-resp-realisations-grid { grid-template-columns: 1fr !important; }
              .ciseaux-resp-realisations-header { flex-direction: column; align-items: flex-start !important; }
            }
            @media (min-width: 769px) and (max-width: 1024px) {
              .ciseaux-resp-realisations-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
          <div {...elementProps(config.id, 'grid', 'container', 'Réalisations Grid')} className="grid grid-cols-3 ciseaux-resp-realisations-grid" style={{ columnGap: 'clamp(16px, 2vw, 24px)', rowGap: 'clamp(30px, 5vw, 60px)' }}>
            {cards.map((card, i) => (
              <div
                key={card.id}
                ref={scrollRevealRef}
                {...elementProps(config.id, `items.${i}`, 'container')}
                className="ciseaux-card"
                style={{ color: 'inherit' }}
              >
                {/* Image */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.ciseaux-img-dezoom')
                        if (img) img.classList.add('revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                <div className="overflow-hidden relative" style={{ aspectRatio: '3/4', borderRadius: '8px' }}>
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={card.image}
                      alt={card.title}
                      className="ciseaux-img-zoom ciseaux-img-dezoom w-full h-full object-cover"
                      style={{ transition: 'transform 0.6s ease' }}
                    />
                  ) : (
                    <div
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      className="ciseaux-img-zoom ciseaux-img-dezoom w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(to bottom, #1A1A1A, #0B0B0B)', transition: 'transform 0.6s ease' }}
                    >
                      <Image className="w-8 h-8 text-white/40" />
                    </div>
                  )}
                  {/* Glass badge: category */}
                  <span
                    {...elementProps(config.id, `items.${i}.badge`, 'badge')}
                    className="flex items-center"
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(11, 11, 11, 0.6)',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                      borderRadius: '4px',
                      padding: '6px 14px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      zIndex: 2,
                    }}
                  >
                    {card.category}
                  </span>
                </div>
                </div>

                {/* Body */}
                <div style={{ marginTop: '16px' }}>
                  <h3
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: '140%',
                      color: '#0B0B0B',
                      marginBottom: '6px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    {...elementProps(config.id, `items.${i}.description`, 'text')}
                    style={{
                      fontSize: '14px',
                      lineHeight: '150%',
                      color: '#B5B0A8',
                      marginBottom: '14px',
                    }}
                  >
                    {card.description}
                  </p>
                  <span
                    {...elementProps(config.id, `items.${i}.cta`, 'button')}
                    className="ciseaux-link"
                  >
                    Voir plus &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // ATELIER — Interior Architecture Projects Grid
  // ═══════════════════════════════════════════

  if (variant === 'atelier-projets') {
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
      { id: '1', title: 'Appartement Haussmannien', category: 'R\u00e9sidentiel', description: 'R\u00e9novation compl\u00e8te d\'un appartement parisien de 120m\u00b2, m\u00ealant moulures classiques et mobilier contemporain.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=85' },
      { id: '2', title: 'Loft Industriel', category: 'Commercial', description: 'Transformation d\'un ancien espace industriel en loft de caract\u00e8re, conservant les \u00e9l\u00e9ments architecturaux d\'origine.', image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=85' },
      { id: '3', title: 'Suite H\u00f4teli\u00e8re', category: 'H\u00f4tellerie', description: 'Conception d\'une suite de luxe alliant confort absolu et esth\u00e9tique raffin\u00e9e pour une exp\u00e9rience sensorielle unique.', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85' },
      { id: '4', title: 'Bureau Design', category: 'Bureau', description: 'Am\u00e9nagement d\'un espace de travail inspirant, favorisant la cr\u00e9ativit\u00e9 et le bien-\u00eatre des collaborateurs.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85' },
      { id: '5', title: 'Penthouse Moderne', category: 'Loft', description: 'Design \u00e9pur\u00e9 et mati\u00e8res nobles pour ce penthouse parisien aux volumes exceptionnels et \u00e0 la luminosit\u00e9 optimis\u00e9e.', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=85' },
      { id: '6', title: 'Villa M\u00e9diterran\u00e9enne', category: 'Villa', description: 'Int\u00e9rieurs lumineux inspir\u00e9s du bassin m\u00e9diterran\u00e9en, \u00e9quilibre parfait entre tradition locale et modernit\u00e9.', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=85' },
    ]

    const items = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; category?: string;
      description?: string; image?: string;
    }> | undefined

    const cards = items && items.length > 0
      ? items.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultCards[i % 6].title,
          category: item.category ?? defaultCards[i % 6].category,
          description: item.description ?? defaultCards[i % 6].description,
          image: item.image ?? defaultCards[i % 6].image,
        }))
      : defaultCards

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Réalisations Section')}
        style={{
          background: '#1A1A1A',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div {...elementProps(config.id, 'header', 'container', 'Header')} className="flex justify-between items-end atelier-resp-projets-header" style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}>
            <div style={{ maxWidth: '760px' }}>
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 500,
                  lineHeight: '110%',
                  textTransform: 'capitalize',
                  color: '#FFFFFF',
                }}
              >
                {content.title ?? 'Nos r\u00e9alisations'}
              </h2>
            </div>
            <a
              {...elementProps(config.id, 'subtitle', 'text')}
              href="/realisations"
              className="atelier-btn flex items-center relative overflow-hidden"
              style={{ fontSize: '20px', fontWeight: 500, color: '#FFFFFF', padding: '10px 12px 10px 20px', gap: '10px', borderRadius: '6px', textDecoration: 'none' }}
            >
              <span {...elementProps(config.id, 'viewAllLabel', 'text', 'Link Text')} className="atelier-btn-label relative" style={{ zIndex: 10 }}>Tous nos projets</span>
              <span
                {...elementProps(config.id, 'viewAllIcon', 'icon', 'Arrow Icon')}
                className="flex items-center justify-center"
                style={{
                  background: '#C4B5A0',
                  color: '#1A1A1A',
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
                <span className="atelier-btn-fill" style={{ display: 'block', background: '#C4B5A0', width: '100%', height: '100%' }} />
              </span>
            </a>
          </div>

          {/* Grid */}
          <style>{`
            .atelier-card:hover .atelier-img-zoom { transform: scale(1.05) !important; }
            .atelier-img-dezoom { transform: scale(1.05); transition: transform 1.2s ease-out; }
            .atelier-img-dezoom.revealed { transform: scale(1); }
            .atelier-btn-fill { transform: translateX(102%); transition: transform 0.4s ease; }
            .atelier-btn:hover .atelier-btn-fill { transform: translateX(0); }
            .atelier-btn:hover .atelier-btn-label { color: #1A1A1A; }
            .atelier-btn-label { transition: color 0.4s; }
            .atelier-link { color: transparent; transition: color 0.3s; font-size: 14px; font-weight: 500; }
            .atelier-card:hover .atelier-link { color: #C4B5A0; }
            @media (max-width: 768px) {
              .atelier-resp-projets-grid { grid-template-columns: 1fr !important; }
              .atelier-resp-projets-header { flex-direction: column; align-items: flex-start !important; }
            }
            @media (min-width: 769px) and (max-width: 1024px) {
              .atelier-resp-projets-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
          <div {...elementProps(config.id, 'grid', 'container', 'Projets Grid')} className="grid grid-cols-3 atelier-resp-projets-grid" style={{ columnGap: 'clamp(16px, 2vw, 24px)', rowGap: 'clamp(30px, 5vw, 60px)' }}>
            {cards.map((card, i) => (
              <div
                key={card.id}
                ref={scrollRevealRef}
                {...elementProps(config.id, `items.${i}`, 'container')}
                className="atelier-card"
                style={{ color: 'inherit' }}
              >
                {/* Image */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.atelier-img-dezoom')
                        if (img) img.classList.add('revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                <div className="overflow-hidden relative" style={{ aspectRatio: '3/4', borderRadius: '8px' }}>
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={card.image}
                      alt={card.title}
                      className="atelier-img-zoom atelier-img-dezoom w-full h-full object-cover"
                      style={{ transition: 'transform 0.6s ease' }}
                    />
                  ) : (
                    <div
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      className="atelier-img-zoom atelier-img-dezoom w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(to bottom, #2A2A2A, #1A1A1A)', transition: 'transform 0.6s ease' }}
                    >
                      <Image className="w-8 h-8 text-white/40" />
                    </div>
                  )}
                  {/* Glass badge: category */}
                  <span
                    {...elementProps(config.id, `items.${i}.badge`, 'badge')}
                    className="flex items-center"
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(196, 181, 160, 0.25)',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                      borderRadius: '4px',
                      padding: '6px 14px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      zIndex: 2,
                      border: '1px solid rgba(196, 181, 160, 0.3)',
                    }}
                  >
                    {card.category}
                  </span>
                </div>
                </div>

                {/* Body */}
                <div style={{ marginTop: '16px' }}>
                  <h3
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: '140%',
                      color: '#FFFFFF',
                      marginBottom: '6px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    {...elementProps(config.id, `items.${i}.description`, 'text')}
                    style={{
                      fontSize: '14px',
                      lineHeight: '150%',
                      color: '#8B8B8B',
                      marginBottom: '14px',
                    }}
                  >
                    {card.description}
                  </p>
                  <span
                    {...elementProps(config.id, `items.${i}.cta`, 'button')}
                    className="atelier-link"
                  >
                    Voir le projet &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // ENCRE — Tattoo Artist Portfolio Grid
  // Deep black background, crimson accents, glassmorphism hover badges
  // ═══════════════════════════════════════════════════════
  if (variant === 'encre-portfolio') {
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
      { id: '1', title: 'Portrait Réaliste', category: 'Réalisme', description: 'Un portrait hyperréaliste aux détails saisissants, capturant chaque nuance de la peau et du regard.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=85' },
      { id: '2', title: 'Dragon Japonais', category: 'Japonais', description: 'Un dragon traditionnel japonais aux couleurs vives et aux écailles minutieusement détaillées.', image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&q=85' },
      { id: '3', title: 'Mandala Géométrique', category: 'Géométrique', description: 'Mandala aux lignes parfaites et à la symétrie absolue, créant un effet hypnotique sur la peau.', image: 'https://images.unsplash.com/photo-1565073624497-7144969d0a8c?w=800&q=85' },
      { id: '4', title: 'Rose Old School', category: 'Old School', description: 'Une rose classique aux contours épais et aux couleurs saturées, hommage au tatouage traditionnel.', image: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=85' },
      { id: '5', title: 'Lion Dotwork', category: 'Dotwork', description: 'Majestueux lion réalisé entièrement en pointillisme, créant profondeur et texture par accumulation.', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=85' },
      { id: '6', title: 'Sleeve Blackwork', category: 'Blackwork', description: 'Sleeve couvrant l\'avant-bras en noir profond, motifs entrelacés et ornementaux d\'une rare précision.', image: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&q=85' },
    ]

    const items = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; category?: string;
      description?: string; image?: string;
    }> | undefined

    const cards = items && items.length > 0
      ? items.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultCards[i % 6].title,
          category: item.category ?? defaultCards[i % 6].category,
          description: item.description ?? defaultCards[i % 6].description,
          image: item.image ?? defaultCards[i % 6].image,
        }))
      : defaultCards

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Portfolio Section')}
        style={{
          background: '#0A0A0A',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div {...elementProps(config.id, 'header', 'container', 'Header')} className="flex justify-between items-end encre-resp-portfolio-header" style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}>
            <div style={{ maxWidth: '760px' }}>
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 500,
                  lineHeight: '110%',
                  textTransform: 'capitalize',
                  color: '#FFFFFF',
                }}
              >
                {content.title ?? 'Portfolio'}
              </h2>
            </div>
            <a
              {...elementProps(config.id, 'subtitle', 'text')}
              href="/portfolio"
              className="encre-btn flex items-center relative overflow-hidden"
              style={{ fontSize: '20px', fontWeight: 500, color: '#FFFFFF', padding: '10px 12px 10px 20px', gap: '10px', borderRadius: '6px', textDecoration: 'none' }}
            >
              <span {...elementProps(config.id, 'viewAllLabel', 'text', 'Link Text')} className="encre-btn-label relative" style={{ zIndex: 10 }}>Voir tout le portfolio</span>
              <span
                {...elementProps(config.id, 'viewAllIcon', 'icon', 'Arrow Icon')}
                className="flex items-center justify-center"
                style={{
                  background: '#C41E3A',
                  color: '#FFFFFF',
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
                <span className="encre-btn-fill" style={{ display: 'block', background: '#C41E3A', width: '100%', height: '100%' }} />
              </span>
            </a>
          </div>

          {/* Grid */}
          <style>{`
            .encre-card:hover .encre-img-zoom { transform: scale(1.05) !important; }
            .encre-img-dezoom { transform: scale(1.05); transition: transform 1.2s ease-out; }
            .encre-img-dezoom.revealed { transform: scale(1); }
            .encre-btn-fill { transform: translateX(102%); transition: transform 0.4s ease; }
            .encre-btn:hover .encre-btn-fill { transform: translateX(0); }
            .encre-btn:hover .encre-btn-label { color: #FFFFFF; }
            .encre-btn-label { transition: color 0.4s; }
            .encre-link { color: transparent; transition: color 0.3s; font-size: 14px; font-weight: 500; }
            .encre-card:hover .encre-link { color: #C41E3A; }
            @media (max-width: 768px) {
              .encre-resp-portfolio-grid { grid-template-columns: 1fr !important; }
              .encre-resp-portfolio-header { flex-direction: column; align-items: flex-start !important; }
            }
            @media (min-width: 769px) and (max-width: 1024px) {
              .encre-resp-portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
          <div {...elementProps(config.id, 'grid', 'container', 'Portfolio Grid')} className="grid grid-cols-3 encre-resp-portfolio-grid" style={{ columnGap: 'clamp(16px, 2vw, 24px)', rowGap: 'clamp(30px, 5vw, 60px)' }}>
            {cards.map((card, i) => (
              <div
                key={card.id}
                ref={scrollRevealRef}
                {...elementProps(config.id, `items.${i}`, 'container')}
                className="encre-card"
                style={{ color: 'inherit' }}
              >
                {/* Image */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.encre-img-dezoom')
                        if (img) img.classList.add('revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                <div className="overflow-hidden relative" style={{ aspectRatio: '3/4', borderRadius: '8px' }}>
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={card.image}
                      alt={card.title}
                      className="encre-img-zoom encre-img-dezoom w-full h-full object-cover"
                      style={{ transition: 'transform 0.6s ease' }}
                    />
                  ) : (
                    <div
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      className="encre-img-zoom encre-img-dezoom w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(to bottom, #1A1A1A, #0A0A0A)', transition: 'transform 0.6s ease' }}
                    >
                      <Image className="w-8 h-8 text-white/40" />
                    </div>
                  )}
                  {/* Glassmorphism badge: category */}
                  <span
                    {...elementProps(config.id, `items.${i}.badge`, 'badge')}
                    className="flex items-center"
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(196, 30, 58, 0.3)',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                      borderRadius: '4px',
                      padding: '6px 14px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      zIndex: 2,
                      border: '1px solid rgba(196, 30, 58, 0.4)',
                    }}
                  >
                    {card.category}
                  </span>
                </div>
                </div>

                {/* Body */}
                <div style={{ marginTop: '16px' }}>
                  <h3
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: '140%',
                      color: '#FFFFFF',
                      marginBottom: '6px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    {...elementProps(config.id, `items.${i}.description`, 'text')}
                    style={{
                      fontSize: '14px',
                      lineHeight: '150%',
                      color: '#8C8C8C',
                      marginBottom: '14px',
                    }}
                  >
                    {card.description}
                  </p>
                  <span
                    {...elementProps(config.id, `items.${i}.cta`, 'button')}
                    className="encre-link"
                  >
                    Voir le tatouage &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // SERENITE — Spa & Beauty Institute Grid
  // Deep navy background, gold glassmorphism badges on hover
  // ═══════════════════════════════════════════════════════
  if (variant === 'serenite-soins') {
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
      { id: '1', title: 'Soin Éclat Absolu', category: 'Visage', description: 'Un rituel luminosité d\'exception combinant actifs précieux et techniques ancestrales pour une peau radieuse et régénérée.', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=85' },
      { id: '2', title: 'Enveloppement Royal', category: 'Corps', description: 'Un cocon de douceur enveloppant tout le corps dans des argiles précieuses et huiles essentielles revitalisantes.', image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=85' },
      { id: '3', title: 'Massage Pierres Chaudes', category: 'Massage', description: 'Des pierres volcaniques polies glissent sur le corps pour dénouer les tensions profondes et libérer l\'énergie vitale.', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=85' },
      { id: '4', title: 'Rituel Hammam', category: 'Hammam', description: 'Un voyage sensoriel au cœur de la tradition orientale — vapeurs chaudes, savon noir et gommage au kessa.', image: 'https://images.unsplash.com/photo-1531901599143-df5010ab9438?w=800&q=85' },
      { id: '5', title: 'Manucure Spa', category: 'Manucure', description: 'Un soin complet des mains alliant bain aromatique, modelage et finition impeccable pour des mains sublimées.', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=85' },
      { id: '6', title: 'Rituel Lune de Miel', category: 'Rituel', description: 'Un duo de soins enchanteurs pensé pour les couples, entre massages en cabine privative et bain de fleurs pétillant.', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=85' },
    ]

    const items = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; category?: string;
      description?: string; image?: string;
    }> | undefined

    const cards = items && items.length > 0
      ? items.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultCards[i % 6].title,
          category: item.category ?? defaultCards[i % 6].category,
          description: item.description ?? defaultCards[i % 6].description,
          image: item.image ?? defaultCards[i % 6].image,
        }))
      : defaultCards

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Soins Section')}
        style={{
          background: '#1B1B2F',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div {...elementProps(config.id, 'header', 'container', 'Header')} className="flex justify-between items-end serenite-resp-soins-header" style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}>
            <div style={{ maxWidth: '760px' }}>
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 500,
                  lineHeight: '110%',
                  textTransform: 'capitalize',
                  color: '#FFFFFF',
                }}
              >
                {content.title ?? 'Nos soins'}
              </h2>
            </div>
            <a
              {...elementProps(config.id, 'subtitle', 'text')}
              href="/soins"
              className="serenite-btn flex items-center relative overflow-hidden"
              style={{ fontSize: '20px', fontWeight: 500, color: '#FFFFFF', padding: '10px 12px 10px 20px', gap: '10px', borderRadius: '6px', textDecoration: 'none' }}
            >
              <span {...elementProps(config.id, 'viewAllLabel', 'text', 'Link Text')} className="serenite-btn-label relative" style={{ zIndex: 10 }}>Découvrir tous les soins</span>
              <span
                {...elementProps(config.id, 'viewAllIcon', 'icon', 'Arrow Icon')}
                className="flex items-center justify-center"
                style={{
                  background: '#D4B896',
                  color: '#1B1B2F',
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
                <span className="serenite-btn-fill" style={{ display: 'block', background: '#D4B896', width: '100%', height: '100%' }} />
              </span>
            </a>
          </div>

          {/* Grid */}
          <style>{`
            .serenite-card:hover .serenite-img-zoom { transform: scale(1.05) !important; }
            .serenite-img-dezoom { transform: scale(1.05); transition: transform 1.2s ease-out; }
            .serenite-img-dezoom.revealed { transform: scale(1); }
            .serenite-btn-fill { transform: translateX(102%); transition: transform 0.4s ease; }
            .serenite-btn:hover .serenite-btn-fill { transform: translateX(0); }
            .serenite-btn:hover .serenite-btn-label { color: #1B1B2F; }
            .serenite-btn-label { transition: color 0.4s; }
            .serenite-link { color: transparent; transition: color 0.3s; font-size: 14px; font-weight: 500; }
            .serenite-card:hover .serenite-link { color: #D4B896; }
            @media (max-width: 768px) {
              .serenite-resp-soins-grid { grid-template-columns: 1fr !important; }
              .serenite-resp-soins-header { flex-direction: column; align-items: flex-start !important; }
            }
            @media (min-width: 769px) and (max-width: 1024px) {
              .serenite-resp-soins-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
          <div {...elementProps(config.id, 'grid', 'container', 'Soins Grid')} className="grid grid-cols-3 serenite-resp-soins-grid" style={{ columnGap: 'clamp(16px, 2vw, 24px)', rowGap: 'clamp(30px, 5vw, 60px)' }}>
            {cards.map((card, i) => (
              <div
                key={card.id}
                ref={scrollRevealRef}
                {...elementProps(config.id, `items.${i}`, 'container')}
                className="serenite-card"
                style={{ color: 'inherit' }}
              >
                {/* Image */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.serenite-img-dezoom')
                        if (img) img.classList.add('revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                <div className="overflow-hidden relative" style={{ aspectRatio: '3/4', borderRadius: '8px' }}>
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={card.image}
                      alt={card.title}
                      className="serenite-img-zoom serenite-img-dezoom w-full h-full object-cover"
                      style={{ transition: 'transform 0.6s ease' }}
                    />
                  ) : (
                    <div
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      className="serenite-img-zoom serenite-img-dezoom w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(to bottom, #2A2A45, #1B1B2F)', transition: 'transform 0.6s ease' }}
                    >
                      <Image className="w-8 h-8 text-white/40" />
                    </div>
                  )}
                  {/* Glassmorphism badge: category */}
                  <span
                    {...elementProps(config.id, `items.${i}.badge`, 'badge')}
                    className="flex items-center"
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(212, 184, 150, 0.25)',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                      borderRadius: '4px',
                      padding: '6px 14px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#D4B896',
                      zIndex: 2,
                      border: '1px solid rgba(212, 184, 150, 0.4)',
                    }}
                  >
                    {card.category}
                  </span>
                </div>
                </div>

                {/* Body */}
                <div style={{ marginTop: '16px' }}>
                  <h3
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: '140%',
                      color: '#FFFFFF',
                      marginBottom: '6px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    {...elementProps(config.id, `items.${i}.description`, 'text')}
                    style={{
                      fontSize: '14px',
                      lineHeight: '150%',
                      color: '#7B6F8A',
                      marginBottom: '14px',
                    }}
                  >
                    {card.description}
                  </p>
                  <span
                    {...elementProps(config.id, `items.${i}.cta`, 'button')}
                    className="serenite-link"
                  >
                    Découvrir le soin &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // PULSE-EVENTS — DJ / Music event grid : 3:4 cards, absolute black bg,
  // cyan glassmorphism badges on hover, neon accent, scroll-reveal
  // ═══════════════════════════════════════════════════════
  if (variant === 'pulse-events') {
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
      { id: '1', title: 'Tomorrowland Main Stage', category: 'Festival', description: 'Face à 50 000 personnes sur le main stage de Tomorrowland — un set de 2h gravé dans les mémoires.', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=85' },
      { id: '2', title: 'Berghain Resident Night', category: 'Club', description: 'Nuit de résident au Berghain — 6 heures de techno hypnotique dans le temple berlinois de la musique électronique.', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85' },
      { id: '3', title: 'Soirée Privée Monaco', category: 'Privé', description: 'Set exclusif pour 200 invités dans une villa surplombant la Méditerranée — une nuit hors du temps.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=85' },
      { id: '4', title: 'Corporate Gala Paris', category: 'Corporate', description: 'Ambiance soigneusement calibrée pour un gala d\'entreprise — energy parfaite du cocktail à la clôture.', image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=85' },
      { id: '5', title: 'Résidence Ibiza', category: 'Résidence', description: 'Résidence estivale de 8 semaines dans l\'un des clubs les plus prestigieux d\'Ibiza — sold-out chaque soir.', image: 'https://images.unsplash.com/photo-1571266028243-d220c6a6dee1?w=800&q=85' },
      { id: '6', title: 'Afterparty Fashion Week', category: 'Afterparty', description: 'L\'afterparty officielle de la Fashion Week Paris — créateurs, mannequins et artistes réunis pour une nuit légendaire.', image: 'https://images.unsplash.com/photo-1564679031507-c38c0db01b09?w=800&q=85' },
    ]

    const items = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; category?: string;
      description?: string; image?: string;
    }> | undefined

    const cards = items && items.length > 0
      ? items.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultCards[i % 6].title,
          category: item.category ?? defaultCards[i % 6].category,
          description: item.description ?? defaultCards[i % 6].description,
          image: item.image ?? defaultCards[i % 6].image,
        }))
      : defaultCards

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Events Section')}
        style={{
          background: '#0D0D0D',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <style>{`
          .pulse-card:hover .pulse-img-zoom { transform: scale(1.07) !important; }
          .pulse-img-dezoom { transform: scale(1.05); transition: transform 1.2s ease-out; }
          .pulse-img-dezoom.revealed { transform: scale(1); }
          .pulse-overlay { opacity: 0; transition: opacity 0.4s ease; }
          .pulse-card:hover .pulse-overlay { opacity: 1; }
          .pulse-badge-bottom { transition: opacity 0.3s ease; }
          .pulse-card:hover .pulse-badge-bottom { opacity: 0; }
          @media (max-width: 768px) {
            .pulse-resp-events-grid { grid-template-columns: 1fr !important; }
            .pulse-resp-events-header { flex-direction: column; align-items: flex-start !important; }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .pulse-resp-events-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div {...elementProps(config.id, 'header', 'container', 'Header')} className="flex justify-between items-end pulse-resp-events-header" style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}>
            <div style={{ maxWidth: '760px' }}>
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 500,
                  lineHeight: '110%',
                  textTransform: 'capitalize',
                  color: '#FFFFFF',
                }}
              >
                {content.title ?? 'Événements'}
              </h2>
            </div>
          </div>

          {/* Grid */}
          <div {...elementProps(config.id, 'grid', 'container', 'Events Grid')} className="grid grid-cols-3 pulse-resp-events-grid" style={{ columnGap: 'clamp(16px, 2vw, 24px)', rowGap: 'clamp(30px, 5vw, 60px)' }}>
            {cards.map((card, i) => (
              <div
                key={card.id}
                ref={scrollRevealRef}
                {...elementProps(config.id, `items.${i}`, 'container')}
                className="pulse-card"
                style={{ color: 'inherit' }}
              >
                {/* Image */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.pulse-img-dezoom')
                        if (img) img.classList.add('revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                  <div className="overflow-hidden relative" style={{ aspectRatio: '3/4', borderRadius: '8px' }}>
                    {card.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        {...elementProps(config.id, `items.${i}.image`, 'image')}
                        src={card.image}
                        alt={card.title}
                        className="pulse-img-zoom pulse-img-dezoom w-full h-full object-cover"
                        style={{ transition: 'transform 0.6s ease' }}
                      />
                    ) : (
                      <div
                        {...elementProps(config.id, `items.${i}.image`, 'image')}
                        className="pulse-img-zoom pulse-img-dezoom w-full h-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(to bottom, #1A1A1A, #0D0D0D)', transition: 'transform 0.6s ease' }}
                      >
                        <Image className="w-8 h-8 text-white/40" />
                      </div>
                    )}
                    {/* Static bottom badge (category) */}
                    <span
                      {...elementProps(config.id, `items.${i}.badge`, 'badge')}
                      className="pulse-badge-bottom flex items-center"
                      style={{
                        position: 'absolute',
                        bottom: '16px',
                        right: '16px',
                        background: 'rgba(0, 229, 255, 0.15)',
                        backdropFilter: 'blur(15px)',
                        WebkitBackdropFilter: 'blur(15px)',
                        borderRadius: '4px',
                        padding: '6px 14px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#00E5FF',
                        zIndex: 2,
                        border: '1px solid rgba(0, 229, 255, 0.35)',
                      }}
                    >
                      {card.category}
                    </span>
                    {/* Hover overlay with title + category */}
                    <div
                      className="pulse-overlay absolute inset-0 flex flex-col justify-end"
                      style={{
                        background: 'linear-gradient(0deg, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.5) 50%, rgba(13,13,13,0.1) 100%)',
                        padding: '20px',
                        zIndex: 3,
                        borderRadius: '8px',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          background: 'rgba(0, 229, 255, 0.2)',
                          backdropFilter: 'blur(15px)',
                          WebkitBackdropFilter: 'blur(15px)',
                          border: '1px solid rgba(0, 229, 255, 0.4)',
                          borderRadius: '4px',
                          padding: '4px 12px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#00E5FF',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          marginBottom: '10px',
                          alignSelf: 'flex-start',
                        }}
                      >
                        {card.category}
                      </span>
                      <p style={{ fontSize: '16px', fontWeight: 600, color: '#FFFFFF', lineHeight: '130%' }}>
                        {card.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div style={{ marginTop: '16px' }}>
                  <h3
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: '140%',
                      color: '#FFFFFF',
                      marginBottom: '6px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    {...elementProps(config.id, `items.${i}.description`, 'text')}
                    style={{
                      fontSize: '14px',
                      lineHeight: '150%',
                      color: 'rgba(255,255,255,0.45)',
                      marginBottom: '14px',
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
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

  // ═══════════════════════════════════════════════════════
  // SAVEUR-CREATIONS — Traiteur / Private Chef gallery : 3:4 cards,
  // brown black bg (#1C1917), gold glassmorphism badges, scroll-reveal
  // ═══════════════════════════════════════════════════════
  if (variant === 'saveur-creations') {
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
      { id: '1', title: 'Cocktail Prestige', category: 'Cocktail', description: 'Un cocktail d\'exception pour marquer les esprits — bouchées signatures, boissons artisanales et mise en scène soignée.', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85' },
      { id: '2', title: 'Dîner Gastronomique', category: 'Gastronomique', description: 'Un voyage culinaire en plusieurs actes, entre produits de saison sublimés et techniques de haute gastronomie.', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85' },
      { id: '3', title: 'Buffet Royal', category: 'Buffet', description: 'Une table généreuse et raffinée, où chaque mets raconte une histoire et invite à la convivialité la plus élégante.', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=85' },
      { id: '4', title: 'Mariage Champêtre', category: 'Mariage', description: 'Le menu de votre plus beau jour — mets délicats, accords parfaits et service attentionné pour 200 convives et plus.', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=85' },
      { id: '5', title: 'Brunch Dominical', category: 'Brunch', description: 'La douceur d\'un dimanche matin élevée au rang d\'art — viennoiseries maison, œufs cuisinés minute et fruits de saison.', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85' },
      { id: '6', title: 'Gala Corporate', category: 'Corporate', description: 'Un dîner corporate à la hauteur de vos ambitions — standing irréprochable, coordination millimétrée, résultats mémorables.', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=85' },
    ]

    const items = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; category?: string;
      description?: string; image?: string;
    }> | undefined

    const cards = items && items.length > 0
      ? items.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultCards[i % 6].title,
          category: item.category ?? defaultCards[i % 6].category,
          description: item.description ?? defaultCards[i % 6].description,
          image: item.image ?? defaultCards[i % 6].image,
        }))
      : defaultCards

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Créations Section')}
        style={{
          background: '#1C1917',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <style>{`
          .saveur-card:hover .saveur-img-zoom { transform: scale(1.05) !important; }
          .saveur-img-dezoom { transform: scale(1.05); transition: transform 1.2s ease-out; }
          .saveur-img-dezoom.revealed { transform: scale(1); }
          .saveur-btn-fill { transform: translateX(102%); transition: transform 0.4s ease; }
          .saveur-btn:hover .saveur-btn-fill { transform: translateX(0); }
          .saveur-btn:hover .saveur-btn-label { color: #1C1917; }
          .saveur-btn-label { transition: color 0.4s; }
          .saveur-link { color: transparent; transition: color 0.3s; font-size: 14px; font-weight: 500; }
          .saveur-card:hover .saveur-link { color: #C8A97E; }
          @media (max-width: 768px) {
            .saveur-resp-creations-grid { grid-template-columns: 1fr !important; }
            .saveur-resp-creations-header { flex-direction: column; align-items: flex-start !important; }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .saveur-resp-creations-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div {...elementProps(config.id, 'header', 'container', 'Header')} className="flex justify-between items-end saveur-resp-creations-header" style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}>
            <div style={{ maxWidth: '760px' }}>
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 500,
                  lineHeight: '110%',
                  textTransform: 'capitalize',
                  color: '#FFFFFF',
                }}
              >
                {content.title ?? 'Nos créations'}
              </h2>
            </div>
            <a
              {...elementProps(config.id, 'subtitle', 'text')}
              href="/creations"
              className="saveur-btn flex items-center relative overflow-hidden"
              style={{ fontSize: '20px', fontWeight: 500, color: '#FFFFFF', padding: '10px 12px 10px 20px', gap: '10px', borderRadius: '6px', textDecoration: 'none' }}
            >
              <span {...elementProps(config.id, 'viewAllLabel', 'text', 'Link Text')} className="saveur-btn-label relative" style={{ zIndex: 10 }}>Voir toutes les créations</span>
              <span
                {...elementProps(config.id, 'viewAllIcon', 'icon', 'Arrow Icon')}
                className="flex items-center justify-center"
                style={{
                  background: '#C8A97E',
                  color: '#1C1917',
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
                <span className="saveur-btn-fill" style={{ display: 'block', background: '#C8A97E', width: '100%', height: '100%' }} />
              </span>
            </a>
          </div>

          {/* Grid */}
          <div {...elementProps(config.id, 'grid', 'container', 'Créations Grid')} className="grid grid-cols-3 saveur-resp-creations-grid" style={{ columnGap: 'clamp(16px, 2vw, 24px)', rowGap: 'clamp(30px, 5vw, 60px)' }}>
            {cards.map((card, i) => (
              <div
                key={card.id}
                ref={scrollRevealRef}
                {...elementProps(config.id, `items.${i}`, 'container')}
                className="saveur-card"
                style={{ color: 'inherit' }}
              >
                {/* Image */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.saveur-img-dezoom')
                        if (img) img.classList.add('revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                <div className="overflow-hidden relative" style={{ aspectRatio: '3/4', borderRadius: '8px' }}>
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={card.image}
                      alt={card.title}
                      className="saveur-img-zoom saveur-img-dezoom w-full h-full object-cover"
                      style={{ transition: 'transform 0.6s ease' }}
                    />
                  ) : (
                    <div
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      className="saveur-img-zoom saveur-img-dezoom w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(to bottom, #2A1F1A, #1C1917)', transition: 'transform 0.6s ease' }}
                    >
                      <Image className="w-8 h-8 text-white/40" />
                    </div>
                  )}
                  {/* Glassmorphism badge: category */}
                  <span
                    {...elementProps(config.id, `items.${i}.badge`, 'badge')}
                    className="flex items-center"
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(200, 169, 126, 0.25)',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                      borderRadius: '4px',
                      padding: '6px 14px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#C8A97E',
                      zIndex: 2,
                      border: '1px solid rgba(200, 169, 126, 0.4)',
                    }}
                  >
                    {card.category}
                  </span>
                </div>
                </div>

                {/* Body */}
                <div style={{ marginTop: '16px' }}>
                  <h3
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: '140%',
                      color: '#FFFFFF',
                      marginBottom: '6px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    {...elementProps(config.id, `items.${i}.description`, 'text')}
                    style={{
                      fontSize: '14px',
                      lineHeight: '150%',
                      color: 'rgba(255,255,255,0.45)',
                      marginBottom: '14px',
                    }}
                  >
                    {card.description}
                  </p>
                  <span
                    {...elementProps(config.id, `items.${i}.cta`, 'button')}
                    className="saveur-link"
                  >
                    Découvrir la prestation &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // MIEL-CREATIONS — Patisserie / Bakery gallery :
  // 3:4 cards, chocolate brown (#2A1F1A) bg, honey gold (#E8C17A) badges,
  // glassmorphism overlay, scroll-reveal animation
  // ═══════════════════════════════════════════════════════
  if (variant === 'miel-creations') {
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
      { id: '1', title: 'Paris-Brest Revisité', category: 'Gâteaux', description: 'Notre réinterprétation du grand classique — pâte à choux aérienne, praliné noisette maison et finitions dorées à la feuille d\'or.', image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=85' },
      { id: '2', title: 'Croissant Pur Beurre', category: 'Viennoiseries', description: 'Feuilletage délicat réalisé avec un beurre de qualité supérieure — 27 couches pour une texture incomparable, croustillante et fondante.', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=85' },
      { id: '3', title: 'Collection Macarons', category: 'Macarons', description: 'Coquilles de meringue française parfaitement lisses, garnitures de ganaches et crèmes artisanales en douze saveurs exclusives.', image: 'https://images.unsplash.com/photo-1558326567-98166e232c52?w=800&q=85' },
      { id: '4', title: 'Pain au Levain', category: 'Pain', description: 'Levain centenaire, farine de tradition française, cuisson sur sole en pierre — une mie alvéolée et une croûte chantante à chaque fournée.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=85' },
      { id: '5', title: 'Wedding Cake Royal', category: 'Wedding Cake', description: 'Une pièce maîtresse pour votre plus beau jour — quatre étages habillés de fleurs en sucre soufflé, réalisés à la main par notre chef.', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=85' },
      { id: '6', title: 'Tablette Chocolat Grand Cru', category: 'Chocolat', description: 'Cacao sélectionné à la source, torréfié dans notre atelier — tablettes aux notes florales, fruitées et épicées pour les fins connaisseurs.', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&q=85' },
    ]

    const items = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; category?: string;
      description?: string; image?: string;
    }> | undefined

    const cards = items && items.length > 0
      ? items.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultCards[i % 6].title,
          category: item.category ?? defaultCards[i % 6].category,
          description: item.description ?? defaultCards[i % 6].description,
          image: item.image ?? defaultCards[i % 6].image,
        }))
      : defaultCards

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Créations Section')}
        style={{
          background: '#2A1F1A',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <style>{`
          .miel-card:hover .miel-img-zoom { transform: scale(1.05) !important; }
          .miel-img-dezoom { transform: scale(1.05); transition: transform 1.2s ease-out; }
          .miel-img-dezoom.revealed { transform: scale(1); }
          .miel-btn-fill { transform: translateX(102%); transition: transform 0.4s ease; }
          .miel-btn:hover .miel-btn-fill { transform: translateX(0); }
          .miel-btn:hover .miel-btn-label { color: #2A1F1A; }
          .miel-btn-label { transition: color 0.4s; }
          .miel-link { color: transparent; transition: color 0.3s; font-size: 14px; font-weight: 500; }
          .miel-card:hover .miel-link { color: #E8C17A; }
          @media (max-width: 768px) {
            .miel-resp-creations-grid { grid-template-columns: 1fr !important; }
            .miel-resp-creations-header { flex-direction: column; align-items: flex-start !important; }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .miel-resp-creations-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div {...elementProps(config.id, 'header', 'container', 'Header')} className="flex justify-between items-end miel-resp-creations-header" style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}>
            <div style={{ maxWidth: '760px' }}>
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 500,
                  lineHeight: '110%',
                  textTransform: 'capitalize',
                  color: '#FFFFFF',
                }}
              >
                {(content as Record<string, unknown>).title as string ?? 'Nos créations'}
              </h2>
            </div>
            <a
              {...elementProps(config.id, 'subtitle', 'text')}
              href="/creations"
              className="miel-btn flex items-center relative overflow-hidden"
              style={{ fontSize: '20px', fontWeight: 500, color: '#FFFFFF', padding: '10px 12px 10px 20px', gap: '10px', borderRadius: '6px', textDecoration: 'none' }}
            >
              <span {...elementProps(config.id, 'viewAllLabel', 'text', 'Link Text')} className="miel-btn-label relative" style={{ zIndex: 10 }}>Voir toutes les créations</span>
              <span
                {...elementProps(config.id, 'viewAllIcon', 'icon', 'Arrow Icon')}
                className="flex items-center justify-center"
                style={{
                  background: '#E8C17A',
                  color: '#2A1F1A',
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
                <span className="miel-btn-fill" style={{ display: 'block', background: '#E8C17A', width: '100%', height: '100%' }} />
              </span>
            </a>
          </div>

          {/* Grid */}
          <div {...elementProps(config.id, 'grid', 'container', 'Créations Grid')} className="grid grid-cols-3 miel-resp-creations-grid" style={{ columnGap: 'clamp(16px, 2vw, 24px)', rowGap: 'clamp(30px, 5vw, 60px)' }}>
            {cards.map((card, i) => (
              <div
                key={card.id}
                ref={scrollRevealRef}
                {...elementProps(config.id, `items.${i}`, 'container')}
                className="miel-card"
                style={{ color: 'inherit' }}
              >
                {/* Image */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.miel-img-dezoom')
                        if (img) img.classList.add('revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                <div className="overflow-hidden relative" style={{ aspectRatio: '3/4', borderRadius: '8px' }}>
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={card.image}
                      alt={card.title}
                      className="miel-img-zoom miel-img-dezoom w-full h-full object-cover"
                      style={{ transition: 'transform 0.6s ease' }}
                    />
                  ) : (
                    <div
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      className="miel-img-zoom miel-img-dezoom w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(to bottom, #3D2B22, #2A1F1A)', transition: 'transform 0.6s ease' }}
                    >
                      <Image className="w-8 h-8 text-white/40" />
                    </div>
                  )}
                  {/* Glassmorphism badge: category */}
                  <span
                    {...elementProps(config.id, `items.${i}.badge`, 'badge')}
                    className="flex items-center"
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(232, 193, 122, 0.2)',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                      borderRadius: '4px',
                      padding: '6px 14px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#E8C17A',
                      zIndex: 2,
                      border: '1px solid rgba(232, 193, 122, 0.4)',
                    }}
                  >
                    {card.category}
                  </span>
                </div>
                </div>

                {/* Body */}
                <div style={{ marginTop: '16px' }}>
                  <h3
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: '140%',
                      color: '#FFFFFF',
                      marginBottom: '6px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    {...elementProps(config.id, `items.${i}.description`, 'text')}
                    style={{
                      fontSize: '14px',
                      lineHeight: '150%',
                      color: 'rgba(255,255,255,0.45)',
                      marginBottom: '14px',
                    }}
                  >
                    {card.description}
                  </p>
                  <span
                    {...elementProps(config.id, `items.${i}.cta`, 'button')}
                    className="miel-link"
                  >
                    Découvrir la création &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // ASCENT-INTERVENTIONS — Business / Life Coach gallery :
  // 3:4 cards, dark navy (#111827) bg, gold (#E0B870) badges,
  // glassmorphism overlay, scroll-reveal animation
  // ═══════════════════════════════════════════════════════
  if (variant === 'ascent-interventions') {
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
      { id: '1', title: 'Coaching Dirigeant', category: 'Individuel', description: 'Un accompagnement sur-mesure pour les leaders qui souhaitent franchir un nouveau palier dans leur parcours professionnel et personnel.', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=85' },
      { id: '2', title: 'Team Building Leadership', category: 'Équipe', description: 'Des ateliers immersifs pour souder vos équipes, développer la cohésion et faire émerger les leaders naturels au sein de votre organisation.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=85' },
      { id: '3', title: 'Conférence TEDx', category: 'Conférence', description: 'Des interventions inspirantes devant des centaines de personnes — des idées puissantes qui changent la perspective et déclenchent l\'action.', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85' },
      { id: '4', title: 'Séminaire Stratégique', category: 'Séminaire', description: 'Deux jours d\'immersion totale pour aligner votre vision, définir votre stratégie de croissance et repartir avec un plan d\'action concret.', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=85' },
      { id: '5', title: 'Workshop Innovation', category: 'Workshop', description: 'Des sessions hands-on pour débloquer la créativité de vos équipes, challenger vos modèles établis et concevoir des solutions nouvelles.', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=85' },
      { id: '6', title: 'Masterclass Mindset', category: 'Masterclass', description: 'Une immersion profonde dans les ressorts psychologiques de la haute performance — les outils mentaux des leaders d\'exception.', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=85' },
    ]

    const items = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; category?: string;
      description?: string; image?: string;
    }> | undefined

    const cards = items && items.length > 0
      ? items.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultCards[i % 6].title,
          category: item.category ?? defaultCards[i % 6].category,
          description: item.description ?? defaultCards[i % 6].description,
          image: item.image ?? defaultCards[i % 6].image,
        }))
      : defaultCards

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Interventions Section')}
        style={{
          background: '#111827',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <style>{`
          .ascent-card:hover .ascent-img-zoom { transform: scale(1.05) !important; }
          .ascent-img-dezoom { transform: scale(1.05); transition: transform 1.2s ease-out; }
          .ascent-img-dezoom.revealed { transform: scale(1); }
          .ascent-btn-fill { transform: translateX(102%); transition: transform 0.4s ease; }
          .ascent-btn:hover .ascent-btn-fill { transform: translateX(0); }
          .ascent-btn:hover .ascent-btn-label { color: #111827; }
          .ascent-btn-label { transition: color 0.4s; }
          .ascent-link { color: transparent; transition: color 0.3s; font-size: 14px; font-weight: 500; }
          .ascent-card:hover .ascent-link { color: #E0B870; }
          @media (max-width: 768px) {
            .ascent-resp-interventions-grid { grid-template-columns: 1fr !important; }
            .ascent-resp-interventions-header { flex-direction: column; align-items: flex-start !important; }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .ascent-resp-interventions-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div {...elementProps(config.id, 'header', 'container', 'Header')} className="flex justify-between items-end ascent-resp-interventions-header" style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}>
            <div style={{ maxWidth: '760px' }}>
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 500,
                  lineHeight: '110%',
                  textTransform: 'capitalize',
                  color: '#FFFFFF',
                }}
              >
                {(content as Record<string, unknown>).title as string ?? 'Interventions'}
              </h2>
            </div>
            <a
              {...elementProps(config.id, 'subtitle', 'text')}
              href="#contact"
              className="ascent-btn flex items-center relative overflow-hidden"
              style={{ fontSize: '20px', fontWeight: 500, color: '#FFFFFF', padding: '10px 12px 10px 20px', gap: '10px', borderRadius: '6px', textDecoration: 'none' }}
            >
              <span {...elementProps(config.id, 'viewAllLabel', 'text', 'Link Text')} className="ascent-btn-label relative" style={{ zIndex: 10 }}>Voir toutes les interventions</span>
              <span
                {...elementProps(config.id, 'viewAllIcon', 'icon', 'Arrow Icon')}
                className="flex items-center justify-center"
                style={{
                  background: '#E0B870',
                  color: '#111827',
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
                <span className="ascent-btn-fill" style={{ display: 'block', background: '#E0B870', width: '100%', height: '100%' }} />
              </span>
            </a>
          </div>

          {/* Grid */}
          <div {...elementProps(config.id, 'grid', 'container', 'Interventions Grid')} className="grid grid-cols-3 ascent-resp-interventions-grid" style={{ columnGap: 'clamp(16px, 2vw, 24px)', rowGap: 'clamp(30px, 5vw, 60px)' }}>
            {cards.map((card, i) => (
              <div
                key={card.id}
                ref={scrollRevealRef}
                {...elementProps(config.id, `items.${i}`, 'container')}
                className="ascent-card"
                style={{ color: 'inherit' }}
              >
                {/* Image */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.ascent-img-dezoom')
                        if (img) img.classList.add('revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                <div className="overflow-hidden relative" style={{ aspectRatio: '3/4', borderRadius: '8px' }}>
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={card.image}
                      alt={card.title}
                      className="ascent-img-zoom ascent-img-dezoom w-full h-full object-cover"
                      style={{ transition: 'transform 0.6s ease' }}
                    />
                  ) : (
                    <div
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      className="ascent-img-zoom ascent-img-dezoom w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(to bottom, #1E2A3A, #111827)', transition: 'transform 0.6s ease' }}
                    >
                      <Image className="w-8 h-8 text-white/40" />
                    </div>
                  )}
                  {/* Glassmorphism badge: category */}
                  <span
                    {...elementProps(config.id, `items.${i}.badge`, 'badge')}
                    className="flex items-center"
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(224, 184, 112, 0.2)',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                      borderRadius: '4px',
                      padding: '6px 14px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#E0B870',
                      zIndex: 2,
                      border: '1px solid rgba(224, 184, 112, 0.4)',
                    }}
                  >
                    {card.category}
                  </span>
                </div>
                </div>

                {/* Body */}
                <div style={{ marginTop: '16px' }}>
                  <h3
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: '140%',
                      color: '#FFFFFF',
                      marginBottom: '6px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    {...elementProps(config.id, `items.${i}.description`, 'text')}
                    style={{
                      fontSize: '14px',
                      lineHeight: '150%',
                      color: 'rgba(255,255,255,0.45)',
                      marginBottom: '14px',
                    }}
                  >
                    {card.description}
                  </p>
                  <span
                    {...elementProps(config.id, `items.${i}.cta`, 'button')}
                    className="ascent-link"
                  >
                    Découvrir l'intervention &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // ZENITH-COURS — Yoga / Pilates studio : 3:4 cards, soft black bg,
  // sage green glassmorphism badges, scroll-reveal stagger
  // ═══════════════════════════════════════════════════════
  if (variant === 'zenith-cours') {
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
      { id: '1', title: 'Vinyasa Flow', category: 'Vinyasa', description: 'Un enchaînement fluide de postures synchronisées avec le souffle pour renforcer le corps et libérer l\'esprit.', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=85' },
      { id: '2', title: 'Hatha Doux', category: 'Hatha', description: 'Postures maintenues, alignement précis et respiration consciente pour une pratique accessible à tous.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=85' },
      { id: '3', title: 'Pilates Reformer', category: 'Pilates', description: 'Travail en profondeur sur machine Reformer pour sculpter la silhouette, corriger la posture et renforcer le gainage.', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=85' },
      { id: '4', title: 'Yin Yoga', category: 'Yin', description: 'Postures tenues longuement pour relâcher les fascias profonds, apaiser le système nerveux et cultiver la pleine conscience.', image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=85' },
      { id: '5', title: 'Ashtanga', category: 'Ashtanga', description: 'Une série codifiée et dynamique qui développe la force, la flexibilité et la concentration à travers une pratique régulière et exigeante.', image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&q=85' },
      { id: '6', title: 'Yoga Prénatal', category: 'Prénatal', description: 'Un accompagnement doux et bienveillant tout au long de la grossesse pour rester connectée à son corps et préparer l\'accouchement.', image: 'https://images.unsplash.com/photo-1559595500-e15296bdbb48?w=800&q=85' },
    ]

    const items = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; category?: string;
      description?: string; image?: string;
    }> | undefined

    const cards = items && items.length > 0
      ? items.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultCards[i % 6].title,
          category: item.category ?? defaultCards[i % 6].category,
          description: item.description ?? defaultCards[i % 6].description,
          image: item.image ?? defaultCards[i % 6].image,
        }))
      : defaultCards

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Cours Section')}
        style={{
          background: '#1A1A1A',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div {...elementProps(config.id, 'header', 'container', 'Header')} className="flex justify-between items-end zenith-resp-cours-header" style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}>
            <div style={{ maxWidth: '760px' }}>
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 500,
                  lineHeight: '110%',
                  textTransform: 'capitalize',
                  color: '#FFFFFF',
                }}
              >
                {content.title ?? 'Nos cours'}
              </h2>
            </div>
            <a
              {...elementProps(config.id, 'subtitle', 'text')}
              href="/cours"
              className="zenith-btn flex items-center relative overflow-hidden"
              style={{ fontSize: '20px', fontWeight: 500, color: '#FFFFFF', padding: '10px 12px 10px 20px', gap: '10px', borderRadius: '6px', textDecoration: 'none' }}
            >
              <span {...elementProps(config.id, 'viewAllLabel', 'text', 'Link Text')} className="zenith-btn-label relative" style={{ zIndex: 10 }}>Découvrir tous les cours</span>
              <span
                {...elementProps(config.id, 'viewAllIcon', 'icon', 'Arrow Icon')}
                className="flex items-center justify-center"
                style={{
                  background: '#A8C5A0',
                  color: '#1A1A1A',
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
                <span className="zenith-btn-fill" style={{ display: 'block', background: '#A8C5A0', width: '100%', height: '100%' }} />
              </span>
            </a>
          </div>

          {/* Grid */}
          <style>{`
            .zenith-card:hover .zenith-img-zoom { transform: scale(1.05) !important; }
            .zenith-img-dezoom { transform: scale(1.05); transition: transform 1.2s ease-out; }
            .zenith-img-dezoom.revealed { transform: scale(1); }
            .zenith-btn-fill { transform: translateX(102%); transition: transform 0.4s ease; }
            .zenith-btn:hover .zenith-btn-fill { transform: translateX(0); }
            .zenith-btn:hover .zenith-btn-label { color: #1A1A1A; }
            .zenith-btn-label { transition: color 0.4s; }
            .zenith-link { color: transparent; transition: color 0.3s; font-size: 14px; font-weight: 500; }
            .zenith-card:hover .zenith-link { color: #A8C5A0; }
            @media (max-width: 768px) {
              .zenith-resp-cours-grid { grid-template-columns: 1fr !important; }
              .zenith-resp-cours-header { flex-direction: column; align-items: flex-start !important; }
            }
            @media (min-width: 769px) and (max-width: 1024px) {
              .zenith-resp-cours-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
          <div {...elementProps(config.id, 'grid', 'container', 'Cours Grid')} className="grid grid-cols-3 zenith-resp-cours-grid" style={{ columnGap: 'clamp(16px, 2vw, 24px)', rowGap: 'clamp(30px, 5vw, 60px)' }}>
            {cards.map((card, i) => (
              <div
                key={card.id}
                ref={scrollRevealRef}
                {...elementProps(config.id, `items.${i}`, 'container')}
                className="zenith-card"
                style={{ color: 'inherit' }}
              >
                {/* Image */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.zenith-img-dezoom')
                        if (img) img.classList.add('revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                <div className="overflow-hidden relative" style={{ aspectRatio: '3/4', borderRadius: '8px' }}>
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={card.image}
                      alt={card.title}
                      className="zenith-img-zoom zenith-img-dezoom w-full h-full object-cover"
                      style={{ transition: 'transform 0.6s ease' }}
                    />
                  ) : (
                    <div
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      className="zenith-img-zoom zenith-img-dezoom w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(to bottom, #2A2A2A, #1A1A1A)', transition: 'transform 0.6s ease' }}
                    >
                      <Image className="w-8 h-8 text-white/40" />
                    </div>
                  )}
                  {/* Glassmorphism badge: category */}
                  <span
                    {...elementProps(config.id, `items.${i}.badge`, 'badge')}
                    className="flex items-center"
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(168, 197, 160, 0.25)',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                      borderRadius: '4px',
                      padding: '6px 14px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#A8C5A0',
                      zIndex: 2,
                      border: '1px solid rgba(168, 197, 160, 0.4)',
                    }}
                  >
                    {card.category}
                  </span>
                </div>
                </div>

                {/* Body */}
                <div style={{ marginTop: '16px' }}>
                  <h3
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: '140%',
                      color: '#FFFFFF',
                      marginBottom: '6px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    {...elementProps(config.id, `items.${i}.description`, 'text')}
                    style={{
                      fontSize: '14px',
                      lineHeight: '150%',
                      color: 'rgba(255,255,255,0.45)',
                      marginBottom: '14px',
                    }}
                  >
                    {card.description}
                  </p>
                  <span
                    {...elementProps(config.id, `items.${i}.cta`, 'button')}
                    className="zenith-link"
                  >
                    Découvrir le cours &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ─── VARIANT: prisme-collection ───
  // Opticien premium : 3-column eyewear collection grid, glass effect cards, dark navy background
  // Premium features: IntersectionObserver scroll reveal with stagger, image dezoom on reveal,
  // Ken Burns hover, multi-layer hover (gradient shift + description slide-up + border glow pulse),
  // "Découvrir" button with fill sweep, enhanced glassmorphism, category filter pills
  if (variant === 'prisme-collection') {
    const navy = '#0F1923'
    const iceBlue = '#B8D4E3'
    const warmCream = '#E8DED0'

    const filterCategories = ['Toutes', 'Optique', 'Solaire', 'Sport', 'Luxe']

    const defaultPrismeItems = [
      { id: '1', title: 'Heritage Classic', duration: 'Italie \u2014 Ray-Ban', price: '\u00C0 partir de 189\u20AC', description: 'Monture ac\u00E9tate intemporelle avec verres anti-reflets premium. Finition polie \u00E0 la main, charni\u00E8res flex.', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=85' },
      { id: '2', title: 'Signature Titanium', duration: 'Japon \u2014 Tom Ford', price: '\u00C0 partir de 320\u20AC', description: 'Titane ultra-l\u00E9ger, design \u00E9pur\u00E9. Branches grav\u00E9es au laser, plaquettes ajustables en silicone.', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=85' },
      { id: '3', title: 'Air Rimless', duration: 'Danemark \u2014 Lindberg', price: '\u00C0 partir de 450\u20AC', description: 'Sans monture, \u00E0 peine 1.9g. Technologie brevet\u00E9e de fixation invisible, personnalisable sur 200+ combinaisons.', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=85' },
      { id: '4', title: 'Optique Couture', duration: 'France \u2014 Chanel', price: '\u00C0 partir de 280\u20AC', description: 'Collection haute couture avec d\u00E9tails matelass\u00E9s signature. Verres progressifs Essilor int\u00E9gr\u00E9s.', image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800&q=85' },
      { id: '5', title: 'Sport Performance', duration: 'USA \u2014 Oakley', price: '\u00C0 partir de 220\u20AC', description: 'Monture Prizm avec technologie O-Matter. Grip Unobtainium, ventilation optimis\u00E9e pour le sport intense.', image: '' },
      { id: '6', title: 'Vintage Revival', duration: 'Angleterre \u2014 Oliver Peoples', price: '\u00C0 partir de 350\u20AC', description: 'R\u00E9\u00E9dition fid\u00E8le des classiques ann\u00E9es 60. Ac\u00E9tate \u00E9caille de tortue, verres min\u00E9raux teint\u00E9s.', image: '' },
    ]

    const rawContentItems = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; duration?: string;
      price?: string; description?: string; image?: string;
    }> | undefined

    const prismeItems = rawContentItems && rawContentItems.length > 0
      ? rawContentItems.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultPrismeItems[i % defaultPrismeItems.length].title,
          duration: item.duration ?? defaultPrismeItems[i % defaultPrismeItems.length].duration,
          price: item.price ?? defaultPrismeItems[i % defaultPrismeItems.length].price,
          description: item.description ?? defaultPrismeItems[i % defaultPrismeItems.length].description,
          image: item.image ?? defaultPrismeItems[i % defaultPrismeItems.length].image,
        }))
      : defaultPrismeItems

    // Staggered scroll-reveal: each card scales from 0.95 + fades in with 0.15s delay between cards
    const prismeCardRevealRef = (index: number) => (el: HTMLDivElement | null) => {
      if (!el) return
      const delay = index * 0.15
      el.style.opacity = '0'
      el.style.transform = 'scale(0.95)'
      el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'scale(1)'
          // Trigger image dezoom
          const img = el.querySelector('.prisme-img-dezoom')
          if (img) (img as HTMLElement).classList.add('prisme-revealed')
          obs.disconnect()
        }
      }, { threshold: 0.1 })
      obs.observe(el)
    }

    const prismeHeaderRevealRef = (el: HTMLDivElement | null) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
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

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Collection Section')}
        style={{
          backgroundColor: navy,
          padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <style>{`
          @media (max-width: 768px) {
            .prisme-collection-grid { grid-template-columns: 1fr !important; }
            .prisme-filter-bar { gap: 6px !important; }
            .prisme-filter-pill { padding: 6px 14px !important; font-size: 11px !important; }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .prisme-collection-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          /* Card base transitions */
          .prisme-collection-card {
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s ease, border-color 0.5s ease;
          }
          .prisme-collection-card:hover {
            transform: translateY(-6px);
            border-color: rgba(184, 212, 227, 0.3) !important;
          }
          /* Border glow pulse on hover */
          @keyframes prisme-border-glow {
            0%, 100% { box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(184, 212, 227, 0.12); }
            50% { box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 60px rgba(184, 212, 227, 0.2), 0 0 100px rgba(184, 212, 227, 0.08); }
          }
          .prisme-collection-card:hover {
            animation: prisme-border-glow 2s ease-in-out infinite;
          }
          /* Image dezoom on scroll reveal (scale 1.08 -> 1.0) */
          .prisme-img-dezoom { transform: scale(1.08); transition: transform 1.2s ease-out; }
          .prisme-img-dezoom.prisme-revealed { transform: scale(1); }
          /* Ken Burns slow zoom on hover */
          @keyframes prisme-ken-burns {
            0% { transform: scale(1); }
            100% { transform: scale(1.06); }
          }
          .prisme-collection-card:hover .prisme-card-img {
            animation: prisme-ken-burns 4s ease-out forwards;
          }
          /* Overlay gradient shift on hover */
          .prisme-card-overlay-hover {
            opacity: 0;
            transition: opacity 0.5s ease;
          }
          .prisme-collection-card:hover .prisme-card-overlay-hover {
            opacity: 1;
          }
          /* Description slide-up reveal on hover */
          .prisme-card-desc-reveal {
            opacity: 0;
            transform: translateY(12px);
            transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
          }
          .prisme-collection-card:hover .prisme-card-desc-reveal {
            opacity: 1;
            transform: translateY(0);
          }
          /* "Découvrir" button: appears on hover with fill sweep from left */
          .prisme-discover-btn {
            position: relative;
            overflow: hidden;
            color: #B8D4E3;
            border: 1px solid rgba(184, 212, 227, 0.3);
            background: transparent;
            opacity: 0;
            transform: translateY(8px);
            transition: opacity 0.35s ease 0.15s, transform 0.35s ease 0.15s, color 0.4s ease, border-color 0.4s ease;
          }
          .prisme-collection-card:hover .prisme-discover-btn {
            opacity: 1;
            transform: translateY(0);
          }
          .prisme-discover-fill {
            position: absolute;
            inset: 0;
            background: #B8D4E3;
            transform: translateX(-102%);
            transition: transform 0.4s ease;
          }
          .prisme-discover-btn:hover .prisme-discover-fill {
            transform: translateX(0);
          }
          .prisme-discover-btn:hover {
            color: #0F1923;
            border-color: #B8D4E3;
          }
          /* Filter pills */
          .prisme-filter-pill {
            padding: 8px 20px;
            border-radius: 100px;
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 0.04em;
            border: 1px solid rgba(184, 212, 227, 0.15);
            background: transparent;
            color: rgba(184, 212, 227, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
          }
          .prisme-filter-pill:hover {
            border-color: rgba(184, 212, 227, 0.4);
            color: rgba(184, 212, 227, 0.8);
          }
          .prisme-filter-active {
            background: rgba(184, 212, 227, 0.12) !important;
            border-color: rgba(184, 212, 227, 0.4) !important;
            color: #B8D4E3 !important;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
        `}</style>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          {/* Header with scroll reveal */}
          <div ref={prismeHeaderRevealRef}>
            {content.title ? (
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 300,
                  lineHeight: '110%',
                  color: warmCream,
                  textAlign: 'center',
                  marginBottom: 16,
                }}
              >
                {String(content.title)}
              </h2>
            ) : null}
            {(() => {
              const sub = (content as Record<string, unknown>).subtitle
              return sub ? (
                <p
                  {...elementProps(config.id, 'subtitle', 'text')}
                  style={{
                    fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
                    fontWeight: 400,
                    lineHeight: '160%',
                    color: 'rgba(184, 212, 227, 0.5)',
                    textAlign: 'center',
                    maxWidth: 600,
                    margin: '0 auto',
                    marginBottom: 20,
                  }}
                >
                  {String(sub)}
                </p>
              ) : null
            })()}
          </div>

          {/* Category filter pills */}
          <div
            {...elementProps(config.id, 'filters', 'container', 'Filter Bar')}
            className="prisme-filter-bar"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 10,
              marginBottom: 'clamp(40px, 6vw, 70px)',
              flexWrap: 'wrap',
            }}
          >
            {filterCategories.map((cat, i) => (
              <button
                key={cat}
                {...elementProps(config.id, `filter.${i}`, 'button', `Filter ${cat}`)}
                className={cn('prisme-filter-pill', i === 0 && 'prisme-filter-active')}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 3-column Grid */}
          <div
            {...elementProps(config.id, 'grid', 'container', 'Collection Grid')}
            className="prisme-collection-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(16px, 3vw, 28px)',
            }}
          >
            {prismeItems.map((item, i) => (
              <div
                key={item.id}
                ref={prismeCardRevealRef(i)}
                {...elementProps(config.id, `items.${i}`, 'container', 'Collection Card')}
                className="prisme-collection-card"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 12,
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(12px) saturate(1.2)',
                  WebkitBackdropFilter: 'blur(12px) saturate(1.2)',
                  border: '1px solid rgba(184, 212, 227, 0.08)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(184, 212, 227, 0.06)',
                }}
              >
                {/* Image with dezoom on reveal + Ken Burns on hover + gradient overlays */}
                <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={item.image}
                      alt={item.title}
                      className="prisme-card-img prisme-img-dezoom"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div
                      className="prisme-card-img prisme-img-dezoom"
                      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${navy}, rgba(184,212,227,0.05))` }}
                    >
                      <Image className="w-8 h-8" style={{ color: 'rgba(184, 212, 227, 0.2)' }} />
                    </div>
                  )}
                  {/* 3 gradient overlays — bottom fade (always), diagonal sweep + vignette (on hover) */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,25,35,0.7) 0%, transparent 50%)', pointerEvents: 'none' }} />
                  <div className="prisme-card-overlay-hover" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(184,212,227,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
                  <div className="prisme-card-overlay-hover" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(15,25,35,0.3) 100%)', pointerEvents: 'none' }} />
                </div>
                {/* Card info */}
                <div style={{ padding: 'clamp(16px, 3vw, 24px)' }}>
                  <h3
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: warmCream,
                      margin: 0,
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    {...elementProps(config.id, `items.${i}.duration`, 'text')}
                    style={{
                      fontSize: 13,
                      fontWeight: 400,
                      color: 'rgba(184, 212, 227, 0.5)',
                      margin: 0,
                      marginBottom: 10,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {item.duration}
                  </p>
                  {/* Description — slides up on hover */}
                  <p
                    {...elementProps(config.id, `items.${i}.description`, 'text')}
                    className="prisme-card-desc-reveal"
                    style={{
                      fontSize: 13,
                      fontWeight: 400,
                      lineHeight: '155%',
                      color: 'rgba(232, 222, 208, 0.45)',
                      margin: 0,
                      marginBottom: 14,
                      maxHeight: 60,
                      overflow: 'hidden',
                    }}
                  >
                    {item.description}
                  </p>
                  {/* Price + Discover button row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <span
                      {...elementProps(config.id, `items.${i}.price`, 'text')}
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: iceBlue,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {item.price}
                    </span>
                    <button
                      type="button"
                      className="prisme-discover-btn"
                      style={{
                        padding: '6px 16px',
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 500,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span className="prisme-discover-fill" />
                      <span style={{ position: 'relative', zIndex: 1 }}>D&#233;couvrir</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // PETALE-CREATIONS — Fleuriste premium gallery :
  // 3-column grid, dark bg (#1A1A1A), rose gold (#D4A574) badges,
  // organic scale hover with shadow bloom, scroll-reveal
  // ═══════════════════════════════════════════════════════
  if (variant === 'petale-creations') {
    const staggeredRevealRef = (index: number) => (el: HTMLDivElement | null) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(40px) scale(0.95)'
      el.style.transition = `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.15}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.15}s`
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0) scale(1)'
          obs.disconnect()
        }
      }, { threshold: 0.1 })
      obs.observe(el)
    }

    const headerRevealRef = (el: HTMLDivElement | null) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
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
      { id: '1', title: 'Bouquet Ros\u00E9e du Matin', category: 'Bouquets', description: 'Une composition d\u00E9licate de roses anciennes et pivoines, agr\u00E9ment\u00E9e de feuillages d\u2019eucalyptus pour une fra\u00EEcheur naturelle.', price: '\u00E0 partir de 45\u20AC', image: '' },
      { id: '2', title: 'Composition Jardin Sauvage', category: 'Bouquets', description: 'Un m\u00E9lange champ\u00EAtre de fleurs des champs, dahlias et gramin\u00E9es dans un vase en c\u00E9ramique artisanale.', price: '\u00E0 partir de 65\u20AC', image: '' },
      { id: '3', title: 'Couronne V\u00E9g\u00E9tale', category: 'Mariages', description: 'Couronne de fleurs fra\u00EEches pour mariages et c\u00E9r\u00E9monies. Cr\u00E9ation sur-mesure selon votre th\u00E8me.', price: 'Sur devis', image: '' },
      { id: '4', title: 'Abonnement Floral Mensuel', category: 'Abonnements', description: 'Chaque mois, un bouquet de saison livr\u00E9 chez vous. Des fleurs fra\u00EEches et \u00E9thiques, s\u00E9lectionn\u00E9es avec soin.', price: '39\u20AC/mois', image: '' },
    ]

    const filterCategories = ['Toutes', 'Bouquets', 'Mariages', 'Abonnements', 'D\u00E9coration']

    const items = (content as Record<string, unknown>).items as Array<{
      id?: string; title?: string; category?: string;
      description?: string; price?: string; image?: string;
    }> | undefined

    const cards = items && items.length > 0
      ? items.map((item, i) => ({
          id: item.id ?? String(i),
          title: item.title ?? defaultCards[i % 4].title,
          category: item.category ?? defaultCards[i % 4].category,
          description: item.description ?? defaultCards[i % 4].description,
          price: item.price ?? defaultCards[i % 4].price,
          image: item.image ?? defaultCards[i % 4].image,
        }))
      : defaultCards

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Cr\u00E9ations Section')}
        style={{
          background: '#1A1A1A',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <style>{`
          /* Image: gentle dezoom on reveal */
          .petale-img-dezoom { transform: scale(1.08); transition: transform 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
          .petale-img-dezoom.revealed { transform: scale(1); }
          /* Image: slow organic zoom + slight rotation on hover */
          .petale-card:hover .petale-img-zoom { transform: scale(1.06) rotate(1.5deg) !important; }
          /* Card hover: rose gold border glow */
          .petale-card { border: 1px solid transparent; transition: box-shadow 0.5s ease, border-color 0.5s ease; }
          .petale-card:hover { box-shadow: 0 20px 60px rgba(212, 165, 116, 0.15), 0 0 30px rgba(212, 165, 116, 0.08) !important; border-color: rgba(212, 165, 116, 0.35) !important; }
          /* Warm overlay on hover */
          .petale-overlay { opacity: 0; transition: opacity 0.5s ease; }
          .petale-card:hover .petale-overlay { opacity: 1; }
          /* Description slide-up on hover */
          .petale-desc-slide { transform: translateY(12px); opacity: 0; transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.45s ease; }
          .petale-card:hover .petale-desc-slide { transform: translateY(0); opacity: 1; }
          /* Commander button: organic fill animation */
          .petale-order-btn { position: relative; overflow: hidden; color: #D4A574; border: 1px solid rgba(212, 165, 116, 0.4); background: transparent; transition: color 0.4s ease, border-color 0.4s ease; }
          .petale-order-btn .petale-btn-fill { position: absolute; inset: 0; background: linear-gradient(135deg, #D4A574, #c4955e); transform: translateX(-102%); transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
          .petale-card:hover .petale-order-btn .petale-btn-fill { transform: translateX(0); }
          .petale-card:hover .petale-order-btn { color: #1A1A1A; border-color: #D4A574; }
          /* Filter pills */
          .petale-filter-pill { background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.5); transition: all 0.35s ease; cursor: pointer; }
          .petale-filter-pill:hover { background: rgba(212, 165, 116, 0.1); border-color: rgba(212, 165, 116, 0.3); color: rgba(255, 255, 255, 0.8); }
          .petale-filter-pill.active { background: rgba(212, 165, 116, 0.15); border-color: #D4A574; color: #D4A574; }
          /* Responsive */
          @media (max-width: 768px) {
            .petale-resp-creations-grid { grid-template-columns: 1fr !important; }
            .petale-resp-creations-header { flex-direction: column; align-items: flex-start !important; }
            .petale-filter-wrap { flex-wrap: wrap; }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .petale-resp-creations-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Header */}
          <div ref={headerRevealRef} {...elementProps(config.id, 'header', 'container', 'Header')} className="petale-resp-creations-header" style={{ marginBottom: 'clamp(30px, 5vw, 60px)', gap: '24px' }}>
            <div style={{ maxWidth: '760px', marginBottom: '28px' }}>
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 500,
                  lineHeight: '110%',
                  textTransform: 'capitalize',
                  color: '#FFFFFF',
                }}
              >
                {(content as Record<string, unknown>).title as string ?? 'Nos cr\u00E9ations florales'}
              </h2>
            </div>
            {/* Category filter pills */}
            <div {...elementProps(config.id, 'filters', 'container', 'Filters')} className="flex petale-filter-wrap" style={{ gap: '10px' }}>
              {filterCategories.map((cat, fi) => (
                <span
                  key={cat}
                  {...elementProps(config.id, `filter.${fi}`, 'button')}
                  className={`petale-filter-pill${fi === 0 ? ' active' : ''}`}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '100px',
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div {...elementProps(config.id, 'grid', 'container', 'Cr\u00E9ations Grid')} className="grid grid-cols-3 petale-resp-creations-grid" style={{ columnGap: 'clamp(16px, 2vw, 24px)', rowGap: 'clamp(30px, 5vw, 60px)' }}>
            {cards.map((card, i) => (
              <div
                key={card.id}
                ref={staggeredRevealRef(i)}
                {...elementProps(config.id, `items.${i}`, 'container')}
                className="petale-card"
                style={{ color: 'inherit', borderRadius: '14px', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}
              >
                {/* Image */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.petale-img-dezoom')
                        if (img) img.classList.add('revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                <div className="overflow-hidden relative" style={{ aspectRatio: '4/5', borderRadius: '12px 12px 0 0' }}>
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      src={card.image}
                      alt={card.title}
                      className="petale-img-zoom petale-img-dezoom w-full h-full object-cover"
                      style={{ transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                    />
                  ) : (
                    <div
                      {...elementProps(config.id, `items.${i}.image`, 'image')}
                      className="petale-img-zoom petale-img-dezoom w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(to bottom, #2a2520, #1A1A1A)', transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                    >
                      <svg width="40" height="40" viewBox="0 0 60 60" fill="none" opacity="0.2">
                        <ellipse cx="30" cy="25" rx="8" ry="15" fill="#D4A574" transform="rotate(-15 30 25)" />
                        <ellipse cx="30" cy="25" rx="8" ry="15" fill="#D4A574" transform="rotate(15 30 25)" />
                        <line x1="30" y1="30" x2="30" y2="50" stroke="#2D5016" strokeWidth="1.5" />
                      </svg>
                    </div>
                  )}
                  {/* Warm overlay gradient on hover */}
                  <div
                    className="petale-overlay absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(212, 165, 116, 0.25) 0%, rgba(45, 80, 22, 0.1) 40%, transparent 70%)',
                      zIndex: 1,
                    }}
                  />
                  {/* Glassmorphism badge: category — warm-tinted */}
                  <span
                    {...elementProps(config.id, `items.${i}.badge`, 'badge')}
                    className="flex items-center"
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(212, 165, 116, 0.15)',
                      backdropFilter: 'blur(20px) saturate(1.2)',
                      WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
                      borderRadius: '6px',
                      padding: '6px 14px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#D4A574',
                      zIndex: 2,
                      border: '1px solid rgba(212, 165, 116, 0.3)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {card.category}
                  </span>
                </div>
                </div>

                {/* Body */}
                <div style={{ padding: '18px 16px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                    <h3
                      {...elementProps(config.id, `items.${i}.title`, 'heading')}
                      style={{
                        fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                        fontSize: '18px',
                        fontWeight: 600,
                        lineHeight: '140%',
                        color: '#FFFFFF',
                      }}
                    >
                      {card.title}
                    </h3>
                    <span
                      {...elementProps(config.id, `items.${i}.price`, 'text')}
                      style={{ fontSize: '14px', fontWeight: 500, color: '#D4A574', whiteSpace: 'nowrap', marginLeft: '12px' }}
                    >
                      {card.price}
                    </span>
                  </div>
                  {/* Description slides up on hover */}
                  <div className="petale-desc-slide">
                    <p
                      {...elementProps(config.id, `items.${i}.description`, 'text')}
                      style={{
                        fontSize: '14px',
                        lineHeight: '155%',
                        color: 'rgba(255,255,255,0.5)',
                        marginBottom: '16px',
                      }}
                    >
                      {card.description}
                    </p>
                    {/* Commander button with organic fill */}
                    <span
                      {...elementProps(config.id, `items.${i}.cta`, 'button')}
                      className="petale-order-btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 20px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: 600,
                        letterSpacing: '0.03em',
                        cursor: 'pointer',
                      }}
                    >
                      <span className="petale-btn-fill" />
                      <span style={{ position: 'relative', zIndex: 2 }}>Commander</span>
                      <svg style={{ position: 'relative', zIndex: 2 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // JLSTUDIO — Option A: Scroll Reveal + Image Zoom Grid
  // ═══════════════════════════════════════════

  // ═══════════════════════════════════════════
  // JLSTUDIO — Portfolio Parallax (Brixsa CTA-style)
  // Each project = full-bleed parallax slide: background image scrolls, text stays sticky
  // Projects displayed one after another, immersive full-screen experience
  // ═══════════════════════════════════════════

  if (variant === 'jlstudio-portfolio-reveal' || variant === 'jlstudio-portfolio-parallax' || variant === 'jlstudio-portfolio') {
    const accent = accentColor ?? '#638BFF'
    const raw = content as Record<string, unknown>
    const itemsRaw = (raw.items ?? []) as Array<Record<string, unknown>>
    const isPreview = !isEditing

    const projects = itemsRaw.length > 0
      ? itemsRaw.map((item, i) => {
          let tags: string[] = []
          const t = item.tags
          if (typeof t === 'string') { try { const p = JSON.parse(t); if (Array.isArray(p)) tags = p } catch { tags = t.split(',').map((s: string) => s.trim()) } }
          else if (Array.isArray(t)) tags = t as string[]
          return { id: (item.id as string) || `p-${i}`, title: (item.title as string) || `Projet ${i + 1}`, description: (item.description as string) || '', image: (item.image as string) || '', category: (item.category as string) || 'Web', tags }
        })
      : images.map((img, i) => ({ id: img.id || `p-${i}`, title: img.alt || `Projet ${i + 1}`, description: img.caption || '', image: img.src, category: img.badge || 'Web', tags: (img.category ?? '').split(',').map(s => s.trim()).filter(Boolean) }))

    // Staggered scroll reveal — each element appears with a progressive delay
    const staggerRevealRef = (delay: number) => (el: HTMLDivElement | null) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(35px)'
      el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.disconnect()
        }
      }, { threshold: 0.1 })
      obs.observe(el)
    }

    return (
      <section
        className="relative bg-[#050507]"
        style={{ fontFamily: 'var(--font-body, inherit)' }}
      >
        <style>{`
          @media (max-width: 768px) {
            .jls-prlx-slide { min-height: auto !important; }
            .jls-prlx-content { position: relative !important; top: auto !important; padding: 40px 20px !important; }
            .jls-prlx-img-wrap { height: 60vh !important; }
            .jls-prlx-counter { font-size: 4rem !important; }
          }
        `}</style>

        {/* Section intro — title + subtitle */}
        <div
          style={{
            padding: 'clamp(80px, 15vw, 160px) clamp(20px, 5vw, 60px) clamp(40px, 8vw, 80px)',
            textAlign: 'center',
          }}
        >
          <div ref={staggerRevealRef(0)}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: `${accent}b3`,
                marginBottom: '16px',
              }}
            >
              Portfolio
            </span>
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              style={{
                fontSize: 'clamp(2.25rem, 1.5rem + 3.5vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: '110%',
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              {content.title ?? 'Nos Réalisations'}
            </h2>
          </div>
          {(raw.subtitle as string) && (
            <div ref={staggerRevealRef(0.15)}>
              <p
                {...elementProps(config.id, 'subtitle', 'text')}
                style={{
                  fontSize: '17px',
                  lineHeight: '170%',
                  color: 'rgba(255,255,255,0.4)',
                  maxWidth: '520px',
                  margin: '0 auto',
                }}
              >
                {raw.subtitle as string}
              </p>
            </div>
          )}
        </div>

        {/* Projects — each is a full-bleed parallax slide */}
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="jls-prlx-slide"
            style={{
              position: 'relative',
              // Tall section for parallax travel — in builder edit mode, shorter
              minHeight: isPreview ? '150vh' : '100vh',
            }}
          >
            {/* Background image — fills the entire slide, scrolls with page */}
            <div
              className="jls-prlx-img-wrap"
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
              }}
            >
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  {...elementProps(config.id, `items.${i}.image`, 'image')}
                  src={project.image}
                  alt={project.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, ${accent}15, #0a0a0a, ${accent}08)`,
                  }}
                />
              )}
              {/* Dark overlay gradient — stronger at bottom for text readability */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)',
                }}
              />
            </div>

            {/* Sticky content — stays fixed while background scrolls past */}
            <div
              className="jls-prlx-content"
              style={{
                position: isPreview ? 'sticky' : 'relative',
                top: isPreview ? '10vh' : 0,
                zIndex: 2,
                padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px)',
                ...(!isPreview ? { display: 'flex', alignItems: 'center', minHeight: '100vh' } : {}),
              }}
            >
              <div style={{ maxWidth: '1320px', margin: '0 auto', width: '100%' }}>
                <div style={{ maxWidth: '680px' }}>
                  {/* Counter number — delay 0s */}
                  <div ref={staggerRevealRef(0)}>
                    <span
                      className="jls-prlx-counter"
                      style={{
                        display: 'block',
                        fontSize: 'clamp(4rem, 3rem + 5vw, 7rem)',
                        fontWeight: 800,
                        lineHeight: 1,
                        color: 'rgba(255,255,255,0.08)',
                        marginBottom: '-10px',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Category badge — delay 0.1s */}
                  <div ref={staggerRevealRef(0.1)}>
                    <span
                      {...elementProps(config.id, `items.${i}.badge`, 'badge')}
                      style={{
                        display: 'inline-block',
                        background: `${accent}25`,
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        borderRadius: '6px',
                        padding: '6px 16px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        border: `1px solid ${accent}35`,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: '20px',
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Title — delay 0.2s */}
                  <div ref={staggerRevealRef(0.2)}>
                    <h3
                      {...elementProps(config.id, `items.${i}.title`, 'heading')}
                      style={{
                        fontSize: 'clamp(1.75rem, 1.2rem + 2.5vw, 3rem)',
                        fontWeight: 700,
                        lineHeight: '120%',
                        color: '#FFFFFF',
                        marginBottom: '16px',
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Description — delay 0.3s */}
                  {project.description && (
                    <div ref={staggerRevealRef(0.3)}>
                      <p
                        {...elementProps(config.id, `items.${i}.description`, 'text')}
                        style={{
                          fontSize: '16px',
                          lineHeight: '170%',
                          color: 'rgba(255,255,255,0.6)',
                          marginBottom: '24px',
                        }}
                      >
                        {project.description}
                      </p>
                    </div>
                  )}

                  {/* Tags — delay 0.4s */}
                  {project.tags.length > 0 && (
                    <div ref={staggerRevealRef(0.4)}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {project.tags.map((tag, ti) => (
                          <span
                            key={ti}
                            style={{
                              fontSize: '12px',
                              padding: '5px 14px',
                              borderRadius: '100px',
                              fontWeight: 500,
                              color: 'rgba(255,255,255,0.7)',
                              backgroundColor: 'rgba(255,255,255,0.08)',
                              border: '1px solid rgba(255,255,255,0.12)',
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    )
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
    'canopy-products',
    'nacre-services',
    'obscura-portfolio',
    'brixsa-listing',
    'brixsa-detail',
    'braise-menu',
    'forge-programs',
    'ciseaux-realisations',
    'zmr-agency-grid',
    'zmr-showcase',
    'atelier-projets',
    'encre-portfolio',
    'serenite-soins',
    'pulse-events',
    'saveur-creations',
    'ascent-interventions',
    'zenith-cours',
    'miel-creations',
    'prisme-collection',
    'petale-creations',
    'jlstudio-portfolio',
  ],
  defaultVariant: 'startup-grid',
  defaultContent: {},
}
