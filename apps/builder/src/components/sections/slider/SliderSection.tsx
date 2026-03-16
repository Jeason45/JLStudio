'use client'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { SliderContent, SlideItem } from '@/types/sections'
import { elementProps } from '@/lib/elementHelpers'
import { componentTriggerBus } from '@/lib/animations/componentTriggerBridge'
import { useSectionCarousel } from '@/hooks/useSectionCarousel'
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'
import { EditablePlaceholder } from '../_EditablePlaceholder'
import { BrixsaViewCursor } from '../_BrixsaViewCursor'
import { useEffect, useCallback, useRef } from 'react'
import type { SectionMeta } from '@/components/sections'

// ═══════════════════════════════════════════════════
// Universe configs
// ═══════════════════════════════════════════════════

const UNIVERSE_CONFIGS = {
  startup: {
    bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-indigo-600',
    dotActive: 'bg-indigo-600', dotInactive: 'bg-zinc-300', arrowBg: 'bg-white shadow-lg hover:bg-zinc-50',
    arrowText: 'text-zinc-700', badge: 'bg-indigo-100 text-indigo-700', slideBg: 'bg-zinc-100',
    ctaBg: 'bg-indigo-600 hover:bg-indigo-700 text-white', overlay: 'from-black/60 to-transparent',
  },
  corporate: {
    bg: 'bg-slate-900', text: 'text-white', sub: 'text-slate-400', eyebrow: 'text-blue-400',
    dotActive: 'bg-blue-500', dotInactive: 'bg-slate-600', arrowBg: 'bg-slate-800 border border-slate-700 hover:bg-slate-700',
    arrowText: 'text-white', badge: 'bg-blue-900/50 text-blue-300', slideBg: 'bg-slate-800',
    ctaBg: 'bg-blue-600 hover:bg-blue-700 text-white', overlay: 'from-slate-900/80 to-transparent',
  },
  luxe: {
    bg: 'bg-white', text: 'text-zinc-800', sub: 'text-zinc-500', eyebrow: 'text-amber-700',
    dotActive: 'bg-amber-600', dotInactive: 'bg-zinc-300', arrowBg: 'bg-white border border-zinc-200 hover:bg-zinc-50',
    arrowText: 'text-zinc-700', badge: 'bg-amber-50 text-amber-800 border border-amber-200', slideBg: 'bg-zinc-50',
    ctaBg: 'bg-amber-700 hover:bg-amber-800 text-white', overlay: 'from-black/50 to-transparent',
  },
  creative: {
    bg: 'bg-amber-50', text: 'text-zinc-900', sub: 'text-zinc-600', eyebrow: 'text-zinc-900',
    dotActive: 'bg-zinc-900', dotInactive: 'bg-zinc-400', arrowBg: 'bg-yellow-300 border-2 border-zinc-900 hover:bg-yellow-400',
    arrowText: 'text-zinc-900', badge: 'bg-yellow-300 text-zinc-900 border-2 border-zinc-900', slideBg: 'bg-white border-2 border-zinc-900',
    ctaBg: 'bg-zinc-900 hover:bg-zinc-800 text-white', overlay: 'from-black/70 to-transparent',
  },
  ecommerce: {
    bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-emerald-600',
    dotActive: 'bg-emerald-600', dotInactive: 'bg-zinc-300', arrowBg: 'bg-white shadow-md hover:bg-zinc-50',
    arrowText: 'text-zinc-700', badge: 'bg-emerald-100 text-emerald-700', slideBg: 'bg-zinc-50',
    ctaBg: 'bg-emerald-600 hover:bg-emerald-700 text-white', overlay: 'from-black/60 to-transparent',
  },
  glass: {
    bg: 'bg-zinc-950', text: 'text-white', sub: 'text-zinc-400', eyebrow: 'text-purple-400',
    dotActive: 'bg-purple-500', dotInactive: 'bg-zinc-700', arrowBg: 'bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20',
    arrowText: 'text-white', badge: 'bg-purple-900/50 text-purple-300 border border-purple-700/50', slideBg: 'bg-white/5 backdrop-blur-sm border border-white/10',
    ctaBg: 'bg-purple-600 hover:bg-purple-700 text-white', overlay: 'from-zinc-950/80 to-transparent',
  },
} as const

type Universe = keyof typeof UNIVERSE_CONFIGS

function parseVariant(variant: string): { universe: Universe; layout: 'hero' | 'cards' | 'thumbnails' } {
  const parts = variant.split('-')
  const layoutStr = parts[parts.length - 1]
  const layout = (['hero', 'cards', 'thumbnails'].includes(layoutStr) ? layoutStr : 'hero') as 'hero' | 'cards' | 'thumbnails'
  const universe = (parts.slice(0, -1).join('-') || 'startup') as Universe
  return { universe: universe in UNIVERSE_CONFIGS ? universe : 'startup', layout }
}

// ═══════════════════════════════════════════════════
// Slide Components
// ═══════════════════════════════════════════════════

function HeroSlide({ slide, uConfig, sectionId, index, isEditing }: { slide: SlideItem; uConfig: typeof UNIVERSE_CONFIGS[Universe]; sectionId: string; index: number; isEditing?: boolean }) {
  return (
    <div className="embla__slide flex-[0_0_100%] min-w-0 relative">
      <div className="relative aspect-[16/7] md:aspect-[16/6] overflow-hidden rounded-lg">
        {slide.image ? (
          <img {...elementProps(sectionId, `slides.${index}.image`, 'image')} src={slide.image} alt={slide.title ?? ''} className="w-full h-full object-cover" />
        ) : isEditing ? (
          <EditablePlaceholder sectionId={sectionId} contentPath={`slides.${index}.image`} type="image" className="w-full h-full" />
        ) : (
          <div className={cn('w-full h-full flex items-center justify-center', uConfig.slideBg)}>
            <ImageIcon className="w-16 h-16 text-zinc-400" />
          </div>
        )}
        <div className={cn('absolute inset-0 bg-gradient-to-t', uConfig.overlay)} />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          {slide.badge ? (
            <span {...elementProps(sectionId, `slides.${index}.badge`, 'badge')} className={cn('inline-block px-3 py-1 rounded-full text-xs font-medium mb-3', uConfig.badge)}>{slide.badge}</span>
          ) : isEditing ? (
            <EditablePlaceholder sectionId={sectionId} contentPath={`slides.${index}.badge`} type="badge" />
          ) : null}
          {slide.title && (
            <h3 {...elementProps(sectionId, `slides.${index}.title`, 'heading')} className="text-2xl md:text-4xl font-bold text-white mb-2">{slide.title}</h3>
          )}
          {slide.subtitle && (
            <p {...elementProps(sectionId, `slides.${index}.subtitle`, 'text')} className="text-sm md:text-base text-white/80 max-w-xl mb-4">{slide.subtitle}</p>
          )}
          {slide.ctaLabel && (
            <a {...elementProps(sectionId, `slides.${index}.ctaLabel`, 'button')} href={slide.ctaHref ?? '#'} className={cn('inline-block px-6 py-2.5 rounded-lg text-sm font-medium transition-colors', uConfig.ctaBg)}>
              {slide.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function CardSlide({ slide, uConfig, sectionId, index, isEditing }: { slide: SlideItem; uConfig: typeof UNIVERSE_CONFIGS[Universe]; sectionId: string; index: number; isEditing?: boolean }) {
  return (
    <div className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-2">
      <div className={cn('rounded-lg overflow-hidden', uConfig.slideBg)}>
        <div className="aspect-[4/3] relative">
          {slide.image ? (
            <img {...elementProps(sectionId, `slides.${index}.image`, 'image')} src={slide.image} alt={slide.title ?? ''} className="w-full h-full object-cover" />
          ) : isEditing ? (
            <EditablePlaceholder sectionId={sectionId} contentPath={`slides.${index}.image`} type="image" className="w-full h-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-200">
              <ImageIcon className="w-10 h-10 text-zinc-400" />
            </div>
          )}
          {slide.badge ? (
            <span {...elementProps(sectionId, `slides.${index}.badge`, 'badge')} className={cn('absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium', uConfig.badge)}>{slide.badge}</span>
          ) : isEditing ? (
            <EditablePlaceholder sectionId={sectionId} contentPath={`slides.${index}.badge`} type="badge" />
          ) : null}
        </div>
        <div className="p-4">
          {slide.title && <h3 {...elementProps(sectionId, `slides.${index}.title`, 'heading')} className={cn('font-semibold text-sm mb-1', uConfig.text)}>{slide.title}</h3>}
          {slide.subtitle && <p {...elementProps(sectionId, `slides.${index}.subtitle`, 'text')} className={cn('text-xs', uConfig.sub)}>{slide.subtitle}</p>}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════

/* Nacre parallax slide — Same technique as Brixsa but nail salon themed.
   - Preview mode (!isEditing): native CSS background-attachment:fixed.
   - Editor mode (isEditing): JS scroll-based fallback. */
function NacreFixedBgSlide({ slide, idx, sectionId, isEditing }: { slide: SlideItem; idx: number; sectionId: string; isEditing?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // JS fallback for editor mode only
  useEffect(() => {
    if (!isEditing) return
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    let scroller: HTMLElement | null = wrap.parentElement
    while (scroller) {
      const ov = getComputedStyle(scroller).overflowY
      if (ov === 'auto' || ov === 'scroll') break
      scroller = scroller.parentElement
    }
    if (!scroller) return

    let accOffset = 0
    let el: HTMLElement | null = wrap
    while (el && el !== scroller) {
      accOffset += el.offsetTop
      el = el.offsetParent as HTMLElement | null
    }

    const setSize = () => { img.style.height = `${scroller!.clientHeight}px` }
    setSize()

    const onScroll = () => {
      img.style.transform = `translate3d(0,${-(accOffset - scroller!.scrollTop)}px,0)`
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const ro = new ResizeObserver(setSize)
    ro.observe(scroller)

    return () => {
      scroller!.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [isEditing])

  // Preview mode: pure CSS background-attachment: fixed
  if (!isEditing) {
    return (
      <div
        {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
        style={{
          display: 'block',
          minHeight: '100svh',
          position: 'relative',
          overflow: 'hidden',
          color: '#F0E0DA',
          ...(slide.image ? {
            backgroundImage: `url(${slide.image})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#2A1A1E',
          } : { backgroundColor: '#2A1A1E' }),
        }}
      >
        <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(42, 26, 30, 0.8) 14%, rgba(255, 255, 255, 0) 39%)' }} />
        {slide.badge && (
          <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(197, 169, 110, 0.3)', color: '#F0E0DA', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em' }}>
            {slide.badge}
          </div>
        )}
        <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <h2
              {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
              style={{ fontFamily: '"GeneralSans Variable", sans-serif', fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#F0E0DA', textTransform: 'capitalize', marginBottom: 20 }}
            >
              {slide.title}
            </h2>
            <p
              {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
              style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(240, 224, 218, 0.8)' }}
            >
              {slide.subtitle}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Editor mode: JS-based scroll compensation with <img> tag
  return (
    <div
      ref={wrapRef}
      {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden', backgroundColor: '#2A1A1E', color: '#F0E0DA' }}
    >
      {slide.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          {...elementProps(sectionId, `slides.${idx}.image`, 'image', 'Slide Image')}
          src={slide.image}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      )}
      <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(42, 26, 30, 0.8) 14%, rgba(255, 255, 255, 0) 39%)' }} />
      {slide.badge && (
        <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(197, 169, 110, 0.3)', color: '#F0E0DA', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em' }}>
          {slide.badge}
        </div>
      )}
      <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
        <div style={{ maxWidth: '680px' }}>
          <h2
            {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
            style={{ fontFamily: '"GeneralSans Variable", sans-serif', fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#F0E0DA', textTransform: 'capitalize', marginBottom: 20 }}
          >
            {slide.title}
          </h2>
          <p
            {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
            style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(240, 224, 218, 0.8)' }}
          >
            {slide.subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

/* Obscura parallax slide — Same technique as Brixsa but photographer themed.
   - Preview mode (!isEditing): native CSS background-attachment:fixed.
   - Editor mode (isEditing): JS scroll-based fallback with translate3d GPU acceleration. */
function ObscuraFixedBgSlide({ slide, idx, sectionId, isEditing }: { slide: SlideItem; idx: number; sectionId: string; isEditing?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // JS fallback for editor mode only
  useEffect(() => {
    if (!isEditing) return
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    let scroller: HTMLElement | null = wrap.parentElement
    while (scroller) {
      const ov = getComputedStyle(scroller).overflowY
      if (ov === 'auto' || ov === 'scroll') break
      scroller = scroller.parentElement
    }
    if (!scroller) return

    let accOffset = 0
    let el: HTMLElement | null = wrap
    while (el && el !== scroller) {
      accOffset += el.offsetTop
      el = el.offsetParent as HTMLElement | null
    }

    const setSize = () => { img.style.height = `${scroller!.clientHeight}px` }
    setSize()

    const onScroll = () => {
      img.style.transform = `translate3d(0,${-(accOffset - scroller!.scrollTop)}px,0)`
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const ro = new ResizeObserver(setSize)
    ro.observe(scroller)

    return () => {
      scroller!.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [isEditing])

  // Preview mode: pure CSS background-attachment: fixed
  if (!isEditing) {
    return (
      <div
        {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
        style={{
          display: 'block',
          minHeight: '100svh',
          position: 'relative',
          overflow: 'hidden',
          color: '#E8E4DF',
          ...(slide.image ? {
            backgroundImage: `url(${slide.image})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#0A0A0A',
          } : { backgroundColor: '#0A0A0A' }),
        }}
      >
        <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(10, 10, 10, 0.85) 14%, rgba(255, 255, 255, 0) 39%)' }} />
        {slide.badge && (
          <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(212, 168, 83, 0.2)', color: '#E8E4DF', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em' }}>
            {slide.badge}
          </div>
        )}
        <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <h2
              {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
              style={{ fontFamily: '"GeneralSans Variable", sans-serif', fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#E8E4DF', textTransform: 'capitalize', marginBottom: 20 }}
            >
              {slide.title}
            </h2>
            <p
              {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
              style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(232, 228, 223, 0.8)' }}
            >
              {slide.subtitle}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Editor mode: JS-based scroll compensation with <img> tag
  return (
    <div
      ref={wrapRef}
      {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden', backgroundColor: '#0A0A0A', color: '#E8E4DF' }}
    >
      {slide.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          {...elementProps(sectionId, `slides.${idx}.image`, 'image', 'Slide Image')}
          src={slide.image}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      )}
      <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(10, 10, 10, 0.85) 14%, rgba(255, 255, 255, 0) 39%)' }} />
      {slide.badge && (
        <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(212, 168, 83, 0.2)', color: '#E8E4DF', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em' }}>
          {slide.badge}
        </div>
      )}
      <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
        <div style={{ maxWidth: '680px' }}>
          <h2
            {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
            style={{ fontFamily: '"GeneralSans Variable", sans-serif', fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#E8E4DF', textTransform: 'capitalize', marginBottom: 20 }}
          >
            {slide.title}
          </h2>
          <p
            {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
            style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(232, 228, 223, 0.8)' }}
          >
            {slide.subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

/* Canopy parallax slide — Same technique as Brixsa but eco/forest themed.
   - Preview mode (!isEditing): native CSS background-attachment:fixed.
   - Editor mode (isEditing): JS scroll-based fallback with translate3d GPU acceleration. */
function CanopyFixedBgSlide({ slide, idx, sectionId, isEditing }: { slide: SlideItem; idx: number; sectionId: string; isEditing?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // JS fallback for editor mode only
  useEffect(() => {
    if (!isEditing) return
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    let scroller: HTMLElement | null = wrap.parentElement
    while (scroller) {
      const ov = getComputedStyle(scroller).overflowY
      if (ov === 'auto' || ov === 'scroll') break
      scroller = scroller.parentElement
    }
    if (!scroller) return

    let accOffset = 0
    let el: HTMLElement | null = wrap
    while (el && el !== scroller) {
      accOffset += el.offsetTop
      el = el.offsetParent as HTMLElement | null
    }

    const setSize = () => { img.style.height = `${scroller!.clientHeight}px` }
    setSize()

    const onScroll = () => {
      img.style.transform = `translate3d(0,${-(accOffset - scroller!.scrollTop)}px,0)`
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const ro = new ResizeObserver(setSize)
    ro.observe(scroller)

    return () => {
      scroller!.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [isEditing])

  // Preview mode: pure CSS background-attachment: fixed
  if (!isEditing) {
    return (
      <div
        {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
        style={{
          display: 'block',
          minHeight: '100svh',
          position: 'relative',
          overflow: 'hidden',
          color: '#E8E8E5',
          ...(slide.image ? {
            backgroundImage: `url(${slide.image})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#1A1A1A',
          } : { backgroundColor: '#1A1A1A' }),
        }}
      >
        <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(26, 26, 26, 0.8) 14%, rgba(255, 255, 255, 0) 39%)' }} />
        {slide.badge && (
          <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(45, 80, 22, 0.3)', color: '#fff', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em' }}>
            {slide.badge}
          </div>
        )}
        <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <h2
              {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
              style={{ fontFamily: "'Inter Variable', system-ui, sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 700, lineHeight: '110%', color: '#E8E8E5', letterSpacing: '-0.02em', marginBottom: 20 }}
            >
              {slide.title}
            </h2>
            <p
              {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
              style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(232, 232, 229, 0.8)' }}
            >
              {slide.subtitle}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Editor mode: JS-based scroll compensation with <img> tag
  return (
    <div
      ref={wrapRef}
      {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden', backgroundColor: '#1A1A1A', color: '#E8E8E5' }}
    >
      {slide.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          {...elementProps(sectionId, `slides.${idx}.image`, 'image', 'Slide Image')}
          src={slide.image}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      )}
      <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(26, 26, 26, 0.8) 14%, rgba(255, 255, 255, 0) 39%)' }} />
      {slide.badge && (
        <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(45, 80, 22, 0.3)', color: '#fff', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em' }}>
          {slide.badge}
        </div>
      )}
      <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
        <div style={{ maxWidth: '680px' }}>
          <h2
            {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
            style={{ fontFamily: "'Inter Variable', system-ui, sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 700, lineHeight: '110%', color: '#E8E8E5', letterSpacing: '-0.02em', marginBottom: 20 }}
          >
            {slide.title}
          </h2>
          <p
            {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
            style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(232, 232, 229, 0.8)' }}
          >
            {slide.subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

/* Brixsa parallax slide.
   - Preview mode (!isEditing): native CSS background-attachment:fixed — zero jank, pixel-perfect.
     Requires Canvas.tsx to skip transform in preview (already done).
   - Editor mode (isEditing): JS scroll-based fallback because transform parent breaks fixed. */
function BrixsaFixedBgSlide({ slide, idx, sectionId, isEditing }: { slide: SlideItem; idx: number; sectionId: string; isEditing?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // JS fallback for editor mode only
  useEffect(() => {
    if (!isEditing) return
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    let scroller: HTMLElement | null = wrap.parentElement
    while (scroller) {
      const ov = getComputedStyle(scroller).overflowY
      if (ov === 'auto' || ov === 'scroll') break
      scroller = scroller.parentElement
    }
    if (!scroller) return

    let accOffset = 0
    let el: HTMLElement | null = wrap
    while (el && el !== scroller) {
      accOffset += el.offsetTop
      el = el.offsetParent as HTMLElement | null
    }

    const setSize = () => { img.style.height = `${scroller!.clientHeight}px` }
    setSize()

    const onScroll = () => {
      img.style.transform = `translate3d(0,${-(accOffset - scroller!.scrollTop)}px,0)`
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const ro = new ResizeObserver(setSize)
    ro.observe(scroller)

    return () => {
      scroller!.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [isEditing])

  // Preview mode: pure CSS background-attachment: fixed
  const slideSlug = (slide.title ?? 'property').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  if (!isEditing) {
    return (
      <a
        href={`/property/${slideSlug}`}
        {...elementProps(sectionId, `slides.${idx}`, 'link', 'Slide')}
        style={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <BrixsaViewCursor
          style={{
            minHeight: '100svh',
            position: 'relative',
            overflow: 'hidden',
            color: '#e1e1e1',
            ...(slide.image ? {
              backgroundImage: `url(${slide.image})`,
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#4a2711',
            } : { backgroundColor: '#4a2711' }),
          }}
        >
          <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(20, 12, 8, 0.8) 14%, rgba(255, 255, 255, 0) 39%)' }} />
          <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', background: 'rgba(158,158,158,0.3)', color: '#fff', fontSize: 16, fontWeight: 400, zIndex: 2 }}>
            Featured
          </div>
          <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', gap: 'clamp(16px, 4vw, 32px)' }}>
              <div style={{ maxWidth: '680px' }}>
                <h2
                  {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
                  style={{ fontFamily: '"GeneralSans Variable", sans-serif', fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#fff', textTransform: 'capitalize', marginBottom: 20 }}
                >
                  {slide.title}
                </h2>
                <p
                  {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
                  style={{ fontSize: 16, lineHeight: '150%', color: '#e1e1e1' }}
                >
                  {slide.subtitle}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', whiteSpace: 'nowrap' }}>
                <h5
                  {...elementProps(sectionId, `slides.${idx}.badge`, 'text')}
                  style={{ fontFamily: '"GeneralSans Variable", sans-serif', fontSize: 'clamp(1.25rem, .9286rem + 1.4286vw, 2rem)', fontWeight: 500, color: '#fff' }}
                >
                  {slide.badge}
                </h5>
                <span style={{ fontSize: 16, color: '#e1e1e1' }}>/Monthly</span>
              </div>
            </div>
          </div>
        </BrixsaViewCursor>
      </a>
    )
  }

  // Editor mode: JS-based scroll compensation with <img> tag
  return (
    <div
      ref={wrapRef}
      {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden', backgroundColor: '#4a2711', color: '#e1e1e1' }}
    >
      {slide.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          {...elementProps(sectionId, `slides.${idx}.image`, 'image', 'Slide Image')}
          src={slide.image}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      )}
      <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(20, 12, 8, 0.8) 14%, rgba(255, 255, 255, 0) 39%)' }} />
      <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', background: 'rgba(158,158,158,0.3)', color: '#fff', fontSize: 16, fontWeight: 400, zIndex: 2 }}>
        Featured
      </div>
      <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', gap: 'clamp(16px, 4vw, 32px)' }}>
          <div style={{ maxWidth: '680px' }}>
            <h2
              {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
              style={{ fontFamily: '"GeneralSans Variable", sans-serif', fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#fff', textTransform: 'capitalize', marginBottom: 20 }}
            >
              {slide.title}
            </h2>
            <p
              {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
              style={{ fontSize: 16, lineHeight: '150%', color: '#e1e1e1' }}
            >
              {slide.subtitle}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', whiteSpace: 'nowrap' }}>
            <h5
              {...elementProps(sectionId, `slides.${idx}.badge`, 'text')}
              style={{ fontFamily: '"GeneralSans Variable", sans-serif', fontSize: 'clamp(1.25rem, .9286rem + 1.4286vw, 2rem)', fontWeight: 500, color: '#fff' }}
            >
              {slide.badge}
            </h5>
            <span style={{ fontSize: 16, color: '#e1e1e1' }}>/Monthly</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Braise parallax slide — Same technique as Nacre but restaurant themed.
   - Preview mode (!isEditing): native CSS background-attachment:fixed.
   - Editor mode (isEditing): JS scroll-based fallback with translate3d GPU acceleration. */
function BraiseFixedBgSlide({ slide, idx, sectionId, isEditing }: { slide: SlideItem; idx: number; sectionId: string; isEditing?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // JS fallback for editor mode only
  useEffect(() => {
    if (!isEditing) return
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    let scroller: HTMLElement | null = wrap.parentElement
    while (scroller) {
      const ov = getComputedStyle(scroller).overflowY
      if (ov === 'auto' || ov === 'scroll') break
      scroller = scroller.parentElement
    }
    if (!scroller) return

    let accOffset = 0
    let el: HTMLElement | null = wrap
    while (el && el !== scroller) {
      accOffset += el.offsetTop
      el = el.offsetParent as HTMLElement | null
    }

    const setSize = () => { img.style.height = `${scroller!.clientHeight}px` }
    setSize()

    const onScroll = () => {
      img.style.transform = `translate3d(0,${-(accOffset - scroller!.scrollTop)}px,0)`
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const ro = new ResizeObserver(setSize)
    ro.observe(scroller)

    return () => {
      scroller!.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [isEditing])

  // Preview mode: pure CSS background-attachment: fixed
  if (!isEditing) {
    return (
      <div
        {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
        style={{
          display: 'block',
          minHeight: '100svh',
          position: 'relative',
          overflow: 'hidden',
          color: '#E8E4DF',
          ...(slide.image ? {
            backgroundImage: `url(${slide.image})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#1A1209',
          } : { backgroundColor: '#1A1209' }),
        }}
      >
        <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(26, 18, 9, 0.85) 14%, rgba(255, 255, 255, 0) 39%)' }} />
        {slide.badge && (
          <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(114, 47, 55, 0.3)', color: '#E8E4DF', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em' }}>
            {slide.badge}
          </div>
        )}
        <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <h2
              {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
              style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#F5F0E8', textTransform: 'capitalize', marginBottom: 20 }}
            >
              {slide.title}
            </h2>
            <p
              {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
              style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(232, 228, 223, 0.8)' }}
            >
              {slide.subtitle}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Editor mode: JS-based scroll compensation with <img> tag
  return (
    <div
      ref={wrapRef}
      {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden', backgroundColor: '#1A1209', color: '#E8E4DF' }}
    >
      {slide.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          {...elementProps(sectionId, `slides.${idx}.image`, 'image', 'Slide Image')}
          src={slide.image}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      )}
      <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(26, 18, 9, 0.85) 14%, rgba(255, 255, 255, 0) 39%)' }} />
      {slide.badge && (
        <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(114, 47, 55, 0.3)', color: '#E8E4DF', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em' }}>
          {slide.badge}
        </div>
      )}
      <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
        <div style={{ maxWidth: '680px' }}>
          <h2
            {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
            style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#F5F0E8', textTransform: 'capitalize', marginBottom: 20 }}
          >
            {slide.title}
          </h2>
          <p
            {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
            style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(232, 228, 223, 0.8)' }}
          >
            {slide.subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

/* Forge parallax slide — Same technique as Braise but sports coach themed.
   - Preview mode (!isEditing): native CSS background-attachment:fixed.
   - Editor mode (isEditing): JS scroll-based fallback with translate3d GPU acceleration. */
function ForgeFixedBgSlide({ slide, idx, sectionId, isEditing }: { slide: SlideItem; idx: number; sectionId: string; isEditing?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // JS fallback for editor mode only
  useEffect(() => {
    if (!isEditing) return
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    let scroller: HTMLElement | null = wrap.parentElement
    while (scroller) {
      const ov = getComputedStyle(scroller).overflowY
      if (ov === 'auto' || ov === 'scroll') break
      scroller = scroller.parentElement
    }
    if (!scroller) return

    let accOffset = 0
    let el: HTMLElement | null = wrap
    while (el && el !== scroller) {
      accOffset += el.offsetTop
      el = el.offsetParent as HTMLElement | null
    }

    const setSize = () => { img.style.height = `${scroller!.clientHeight}px` }
    setSize()

    const onScroll = () => {
      img.style.transform = `translate3d(0,${-(accOffset - scroller!.scrollTop)}px,0)`
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const ro = new ResizeObserver(setSize)
    ro.observe(scroller)

    return () => {
      scroller!.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [isEditing])

  // Preview mode: pure CSS background-attachment: fixed
  if (!isEditing) {
    return (
      <div
        {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
        style={{
          display: 'block',
          minHeight: '100svh',
          position: 'relative',
          overflow: 'hidden',
          color: '#E8E8E8',
          ...(slide.image ? {
            backgroundImage: `url(${slide.image})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#0A0A0A',
          } : { backgroundColor: '#0A0A0A' }),
        }}
      >
        <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(10, 10, 10, 0.85) 14%, rgba(255, 255, 255, 0) 39%)' }} />
        {slide.badge && (
          <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(255, 77, 0, 0.3)', color: '#E8E8E8', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em' }}>
            {slide.badge}
          </div>
        )}
        <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <h2
              {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
              style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#E8E8E8', textTransform: 'capitalize', marginBottom: 20 }}
            >
              {slide.title}
            </h2>
            <p
              {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
              style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(232, 232, 232, 0.8)' }}
            >
              {slide.subtitle}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Editor mode: JS-based scroll compensation with <img> tag
  return (
    <div
      ref={wrapRef}
      {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden', backgroundColor: '#0A0A0A', color: '#E8E8E8' }}
    >
      {slide.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          {...elementProps(sectionId, `slides.${idx}.image`, 'image', 'Slide Image')}
          src={slide.image}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      )}
      <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(10, 10, 10, 0.85) 14%, rgba(255, 255, 255, 0) 39%)' }} />
      {slide.badge && (
        <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(255, 77, 0, 0.3)', color: '#E8E8E8', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em' }}>
          {slide.badge}
        </div>
      )}
      <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
        <div style={{ maxWidth: '680px' }}>
          <h2
            {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
            style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#E8E8E8', textTransform: 'capitalize', marginBottom: 20 }}
          >
            {slide.title}
          </h2>
          <p
            {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
            style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(232, 232, 232, 0.8)' }}
          >
            {slide.subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

/* Ciseaux parallax slide — Hair salon themed.
   - Preview mode (!isEditing): native CSS background-attachment:fixed.
   - Editor mode (isEditing): JS scroll-based fallback with translate3d GPU acceleration. */
function CiseauxFixedBgSlide({ slide, idx, sectionId, isEditing }: { slide: SlideItem; idx: number; sectionId: string; isEditing?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // JS fallback for editor mode only
  useEffect(() => {
    if (!isEditing) return
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    let scroller: HTMLElement | null = wrap.parentElement
    while (scroller) {
      const ov = getComputedStyle(scroller).overflowY
      if (ov === 'auto' || ov === 'scroll') break
      scroller = scroller.parentElement
    }
    if (!scroller) return

    let accOffset = 0
    let el: HTMLElement | null = wrap
    while (el && el !== scroller) {
      accOffset += el.offsetTop
      el = el.offsetParent as HTMLElement | null
    }

    const setSize = () => { img.style.height = `${scroller!.clientHeight}px` }
    setSize()

    const onScroll = () => {
      img.style.transform = `translate3d(0,${-(accOffset - scroller!.scrollTop)}px,0)`
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const ro = new ResizeObserver(setSize)
    ro.observe(scroller)

    return () => {
      scroller!.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [isEditing])

  // Preview mode: pure CSS background-attachment: fixed
  if (!isEditing) {
    return (
      <div
        {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
        style={{
          display: 'block',
          minHeight: '100svh',
          position: 'relative',
          overflow: 'hidden',
          color: '#FFFFFF',
          ...(slide.image ? {
            backgroundImage: `url(${slide.image})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#0B0B0B',
          } : { backgroundColor: '#0B0B0B' }),
        }}
      >
        <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(11, 11, 11, 0.8) 14%, rgba(255, 255, 255, 0) 39%)' }} />
        {slide.badge && (
          <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(183, 110, 121, 0.3)', color: '#FFFFFF', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em' }}>
            {slide.badge}
          </div>
        )}
        <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <h2
              {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
              style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#FFFFFF', textTransform: 'capitalize', marginBottom: 20 }}
            >
              {slide.title}
            </h2>
            <p
              {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
              style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(255, 255, 255, 0.8)' }}
            >
              {slide.subtitle}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Editor mode: JS-based scroll compensation with <img> tag
  return (
    <div
      ref={wrapRef}
      {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden', backgroundColor: '#0B0B0B', color: '#FFFFFF' }}
    >
      {slide.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          {...elementProps(sectionId, `slides.${idx}.image`, 'image', 'Slide Image')}
          src={slide.image}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      )}
      <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(11, 11, 11, 0.8) 14%, rgba(255, 255, 255, 0) 39%)' }} />
      {slide.badge && (
        <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(183, 110, 121, 0.3)', color: '#FFFFFF', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em' }}>
          {slide.badge}
        </div>
      )}
      <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
        <div style={{ maxWidth: '680px' }}>
          <h2
            {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
            style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#FFFFFF', textTransform: 'capitalize', marginBottom: 20 }}
          >
            {slide.title}
          </h2>
          <p
            {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
            style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(255, 255, 255, 0.8)' }}
          >
            {slide.subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

/* Atelier parallax slide — Interior architecture themed.
   - Preview mode (!isEditing): native CSS background-attachment:fixed.
   - Editor mode (isEditing): JS scroll-based fallback with translate3d GPU acceleration. */
/* Encre parallax slide — Same technique as Braise/Atelier but tattoo studio themed.
   - Preview mode (!isEditing): native CSS background-attachment:fixed.
   - Editor mode (isEditing): JS scroll-based fallback with translate3d GPU acceleration. */
function EncreFixedBgSlide({ slide, idx, sectionId, isEditing }: { slide: SlideItem; idx: number; sectionId: string; isEditing?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // JS fallback for editor mode only
  useEffect(() => {
    if (!isEditing) return
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    let scroller: HTMLElement | null = wrap.parentElement
    while (scroller) {
      const ov = getComputedStyle(scroller).overflowY
      if (ov === 'auto' || ov === 'scroll') break
      scroller = scroller.parentElement
    }
    if (!scroller) return

    let accOffset = 0
    let el: HTMLElement | null = wrap
    while (el && el !== scroller) {
      accOffset += el.offsetTop
      el = el.offsetParent as HTMLElement | null
    }

    const setSize = () => { img.style.height = `${scroller!.clientHeight}px` }
    setSize()

    const onScroll = () => {
      img.style.transform = `translate3d(0,${-(accOffset - scroller!.scrollTop)}px,0)`
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const ro = new ResizeObserver(setSize)
    ro.observe(scroller)

    return () => {
      scroller!.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [isEditing])

  // Preview mode: pure CSS background-attachment: fixed
  if (!isEditing) {
    return (
      <div
        {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
        style={{
          display: 'block',
          minHeight: '100svh',
          position: 'relative',
          overflow: 'hidden',
          color: '#FFFFFF',
          ...(slide.image ? {
            backgroundImage: `url(${slide.image})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#0A0A0A',
          } : { backgroundColor: '#0A0A0A' }),
        }}
      >
        <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(10, 10, 10, 0.90) 14%, rgba(10, 10, 10, 0.3) 60%, rgba(10, 10, 10, 0.1) 100%)' }} />
        {slide.badge && (
          <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(196, 30, 58, 0.25)', color: '#FFFFFF', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em', border: '1px solid rgba(196, 30, 58, 0.4)' }}>
            {slide.badge}
          </div>
        )}
        <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <h2
              {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
              style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#C41E3A', textTransform: 'capitalize', marginBottom: 20 }}
            >
              {slide.title}
            </h2>
            <p
              {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
              style={{ fontSize: 16, lineHeight: '150%', color: '#8C8C8C' }}
            >
              {slide.subtitle}
            </p>
            {slide.ctaLabel && (
              <a
                {...elementProps(sectionId, `slides.${idx}.cta`, 'button')}
                href={slide.ctaHref ?? '#'}
                style={{ display: 'inline-block', marginTop: '28px', padding: '12px 28px', background: '#C41E3A', color: '#FFFFFF', borderRadius: '4px', fontSize: '15px', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.03em', transition: 'background 0.3s ease' }}
              >
                {slide.ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Editor mode: JS-based scroll compensation with <img> tag
  return (
    <div
      ref={wrapRef}
      {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden', backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
    >
      {slide.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          {...elementProps(sectionId, `slides.${idx}.image`, 'image', 'Slide Image')}
          src={slide.image}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      )}
      <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(10, 10, 10, 0.90) 14%, rgba(10, 10, 10, 0.3) 60%, rgba(10, 10, 10, 0.1) 100%)' }} />
      {slide.badge && (
        <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(196, 30, 58, 0.25)', color: '#FFFFFF', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em', border: '1px solid rgba(196, 30, 58, 0.4)' }}>
          {slide.badge}
        </div>
      )}
      <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
        <div style={{ maxWidth: '680px' }}>
          <h2
            {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
            style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#C41E3A', textTransform: 'capitalize', marginBottom: 20 }}
          >
            {slide.title}
          </h2>
          <p
            {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
            style={{ fontSize: 16, lineHeight: '150%', color: '#8C8C8C' }}
          >
            {slide.subtitle}
          </p>
          {slide.ctaLabel && (
            <a
              {...elementProps(sectionId, `slides.${idx}.cta`, 'button')}
              href={slide.ctaHref ?? '#'}
              style={{ display: 'inline-block', marginTop: '28px', padding: '12px 28px', background: '#C41E3A', color: '#FFFFFF', borderRadius: '4px', fontSize: '15px', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.03em', transition: 'background 0.3s ease' }}
            >
              {slide.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function AtelierFixedBgSlide({ slide, idx, sectionId, isEditing }: { slide: SlideItem; idx: number; sectionId: string; isEditing?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // JS fallback for editor mode only
  useEffect(() => {
    if (!isEditing) return
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    let scroller: HTMLElement | null = wrap.parentElement
    while (scroller) {
      const ov = getComputedStyle(scroller).overflowY
      if (ov === 'auto' || ov === 'scroll') break
      scroller = scroller.parentElement
    }
    if (!scroller) return

    let accOffset = 0
    let el: HTMLElement | null = wrap
    while (el && el !== scroller) {
      accOffset += el.offsetTop
      el = el.offsetParent as HTMLElement | null
    }

    const setSize = () => { img.style.height = `${scroller!.clientHeight}px` }
    setSize()

    const onScroll = () => {
      img.style.transform = `translate3d(0,${-(accOffset - scroller!.scrollTop)}px,0)`
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const ro = new ResizeObserver(setSize)
    ro.observe(scroller)

    return () => {
      scroller!.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [isEditing])

  // Preview mode: pure CSS background-attachment: fixed
  if (!isEditing) {
    return (
      <div
        {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
        style={{
          display: 'block',
          minHeight: '100svh',
          position: 'relative',
          overflow: 'hidden',
          color: '#FFFFFF',
          ...(slide.image ? {
            backgroundImage: `url(${slide.image})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#1A1A1A',
          } : { backgroundColor: '#1A1A1A' }),
        }}
      >
        <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(26, 26, 26, 0.85) 14%, rgba(255, 255, 255, 0) 39%)' }} />
        {slide.badge && (
          <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(196, 181, 160, 0.25)', color: '#FFFFFF', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em', border: '1px solid rgba(196, 181, 160, 0.3)' }}>
            {slide.badge}
          </div>
        )}
        <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <h2
              {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
              style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#C4B5A0', textTransform: 'capitalize', marginBottom: 20 }}
            >
              {slide.title}
            </h2>
            <p
              {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
              style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(255, 255, 255, 0.8)' }}
            >
              {slide.subtitle}
            </p>
            {slide.ctaLabel && (
              <a
                {...elementProps(sectionId, `slides.${idx}.cta`, 'button')}
                href={slide.ctaHref ?? '#'}
                style={{ display: 'inline-block', marginTop: '28px', padding: '12px 28px', background: '#8B7355', color: '#FFFFFF', borderRadius: '4px', fontSize: '15px', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.03em', transition: 'background 0.3s ease' }}
              >
                {slide.ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Editor mode: JS-based scroll compensation with <img> tag
  return (
    <div
      ref={wrapRef}
      {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden', backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
    >
      {slide.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          {...elementProps(sectionId, `slides.${idx}.image`, 'image', 'Slide Image')}
          src={slide.image}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      )}
      <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(26, 26, 26, 0.85) 14%, rgba(255, 255, 255, 0) 39%)' }} />
      {slide.badge && (
        <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(196, 181, 160, 0.25)', color: '#FFFFFF', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em', border: '1px solid rgba(196, 181, 160, 0.3)' }}>
          {slide.badge}
        </div>
      )}
      <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
        <div style={{ maxWidth: '680px' }}>
          <h2
            {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
            style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#C4B5A0', textTransform: 'capitalize', marginBottom: 20 }}
          >
            {slide.title}
          </h2>
          <p
            {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
            style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(255, 255, 255, 0.8)' }}
          >
            {slide.subtitle}
          </p>
          {slide.ctaLabel && (
            <a
              {...elementProps(sectionId, `slides.${idx}.cta`, 'button')}
              href={slide.ctaHref ?? '#'}
              style={{ display: 'inline-block', marginTop: '28px', padding: '12px 28px', background: '#8B7355', color: '#FFFFFF', borderRadius: '4px', fontSize: '15px', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.03em', transition: 'background 0.3s ease' }}
            >
              {slide.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function SereniteFixedBgSlide({ slide, idx, sectionId, isEditing }: { slide: SlideItem; idx: number; sectionId: string; isEditing?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // JS fallback for editor mode only
  useEffect(() => {
    if (!isEditing) return
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    let scroller: HTMLElement | null = wrap.parentElement
    while (scroller) {
      const ov = getComputedStyle(scroller).overflowY
      if (ov === 'auto' || ov === 'scroll') break
      scroller = scroller.parentElement
    }
    if (!scroller) return

    let accOffset = 0
    let el: HTMLElement | null = wrap
    while (el && el !== scroller) {
      accOffset += el.offsetTop
      el = el.offsetParent as HTMLElement | null
    }

    const setSize = () => { img.style.height = `${scroller!.clientHeight}px` }
    setSize()

    const onScroll = () => {
      img.style.transform = `translate3d(0,${-(accOffset - scroller!.scrollTop)}px,0)`
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const ro = new ResizeObserver(setSize)
    ro.observe(scroller)

    return () => {
      scroller!.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [isEditing])

  // Preview mode: pure CSS background-attachment: fixed
  if (!isEditing) {
    return (
      <div
        {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
        style={{
          display: 'block',
          minHeight: '100svh',
          position: 'relative',
          overflow: 'hidden',
          color: '#FFFFFF',
          ...(slide.image ? {
            backgroundImage: `url(${slide.image})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#1B1B2F',
          } : { backgroundColor: '#1B1B2F' }),
        }}
      >
        <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(27, 27, 47, 0.90) 14%, rgba(27, 27, 47, 0.3) 60%, rgba(27, 27, 47, 0.1) 100%)' }} />
        {slide.badge && (
          <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(212, 184, 150, 0.25)', color: '#D4B896', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em', border: '1px solid rgba(212, 184, 150, 0.4)' }}>
            {slide.badge}
          </div>
        )}
        <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <h2
              {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
              style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#D4B896', textTransform: 'capitalize', marginBottom: 20 }}
            >
              {slide.title}
            </h2>
            <p
              {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
              style={{ fontSize: 16, lineHeight: '150%', color: '#C8C0D4' }}
            >
              {slide.subtitle}
            </p>
            {slide.ctaLabel && (
              <a
                {...elementProps(sectionId, `slides.${idx}.cta`, 'button')}
                href={slide.ctaHref ?? '#'}
                style={{ display: 'inline-block', marginTop: '28px', padding: '12px 28px', background: '#D4B896', color: '#1B1B2F', borderRadius: '4px', fontSize: '15px', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.03em', transition: 'background 0.3s ease' }}
              >
                {slide.ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Editor mode: JS-based scroll compensation with <img> tag
  return (
    <div
      ref={wrapRef}
      {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden', backgroundColor: '#1B1B2F', color: '#FFFFFF' }}
    >
      {slide.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          {...elementProps(sectionId, `slides.${idx}.image`, 'image', 'Slide Image')}
          src={slide.image}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      )}
      <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(27, 27, 47, 0.90) 14%, rgba(27, 27, 47, 0.3) 60%, rgba(27, 27, 47, 0.1) 100%)' }} />
      {slide.badge && (
        <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(212, 184, 150, 0.25)', color: '#D4B896', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.05em', border: '1px solid rgba(212, 184, 150, 0.4)' }}>
          {slide.badge}
        </div>
      )}
      <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
        <div style={{ maxWidth: '680px' }}>
          <h2
            {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
            style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#D4B896', textTransform: 'capitalize', marginBottom: 20 }}
          >
            {slide.title}
          </h2>
          <p
            {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
            style={{ fontSize: 16, lineHeight: '150%', color: '#C8C0D4' }}
          >
            {slide.subtitle}
          </p>
          {slide.ctaLabel && (
            <a
              {...elementProps(sectionId, `slides.${idx}.cta`, 'button')}
              href={slide.ctaHref ?? '#'}
              style={{ display: 'inline-block', marginTop: '28px', padding: '12px 28px', background: '#D4B896', color: '#1B1B2F', borderRadius: '4px', fontSize: '15px', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.03em', transition: 'background 0.3s ease' }}
            >
              {slide.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function PulseFixedBgSlide({ slide, idx, sectionId, isEditing }: { slide: SlideItem; idx: number; sectionId: string; isEditing?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // JS fallback for editor mode only
  useEffect(() => {
    if (!isEditing) return
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    let scroller: HTMLElement | null = wrap.parentElement
    while (scroller) {
      const ov = getComputedStyle(scroller).overflowY
      if (ov === 'auto' || ov === 'scroll') break
      scroller = scroller.parentElement
    }
    if (!scroller) return

    let accOffset = 0
    let el: HTMLElement | null = wrap
    while (el && el !== scroller) {
      accOffset += el.offsetTop
      el = el.offsetParent as HTMLElement | null
    }

    const setSize = () => { img.style.height = `${scroller!.clientHeight}px` }
    setSize()

    const onScroll = () => {
      img.style.transform = `translate3d(0,${-(accOffset - scroller!.scrollTop)}px,0)`
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const ro = new ResizeObserver(setSize)
    ro.observe(scroller)

    return () => {
      scroller!.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [isEditing])

  // Preview mode: pure CSS background-attachment: fixed
  if (!isEditing) {
    return (
      <div
        {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
        style={{
          display: 'block',
          minHeight: '100svh',
          position: 'relative',
          overflow: 'hidden',
          color: '#FFFFFF',
          ...(slide.image ? {
            backgroundImage: `url(${slide.image})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#0D0D0D',
          } : { backgroundColor: '#0D0D0D' }),
        }}
      >
        <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(13, 13, 13, 0.92) 14%, rgba(13, 13, 13, 0.4) 60%, rgba(13, 13, 13, 0.15) 100%)' }} />
        {/* Slide number top-right */}
        <div style={{ position: 'absolute', right: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', zIndex: 2, fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: '12px', fontWeight: 500, color: '#00E5FF', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {String(idx + 1).padStart(2, '0')}
        </div>
        {slide.badge && (
          <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(0, 229, 255, 0.12)', color: '#00E5FF', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(0, 229, 255, 0.35)' }}>
            {slide.badge}
          </div>
        )}
        <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <h2
              {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
              style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#00E5FF', textTransform: 'capitalize', marginBottom: 20 }}
            >
              {slide.title}
            </h2>
            <p
              {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
              style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(255,255,255,0.7)' }}
            >
              {slide.subtitle}
            </p>
            {slide.ctaLabel && (
              <a
                {...elementProps(sectionId, `slides.${idx}.cta`, 'button')}
                href={slide.ctaHref ?? '#'}
                style={{ display: 'inline-block', marginTop: '28px', padding: '12px 28px', background: '#FF006E', color: '#FFFFFF', borderRadius: '4px', fontSize: '15px', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.03em', transition: 'background 0.3s ease' }}
              >
                {slide.ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Editor mode: JS-based scroll compensation with <img> tag
  return (
    <div
      ref={wrapRef}
      {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden', backgroundColor: '#0D0D0D', color: '#FFFFFF' }}
    >
      {slide.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          {...elementProps(sectionId, `slides.${idx}.image`, 'image', 'Slide Image')}
          src={slide.image}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      )}
      <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(13, 13, 13, 0.92) 14%, rgba(13, 13, 13, 0.4) 60%, rgba(13, 13, 13, 0.15) 100%)' }} />
      {/* Slide number top-right */}
      <div style={{ position: 'absolute', right: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', zIndex: 2, fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: '12px', fontWeight: 500, color: '#00E5FF', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        {String(idx + 1).padStart(2, '0')}
      </div>
      {slide.badge && (
        <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(0, 229, 255, 0.12)', color: '#00E5FF', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(0, 229, 255, 0.35)' }}>
          {slide.badge}
        </div>
      )}
      <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
        <div style={{ maxWidth: '680px' }}>
          <h2
            {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
            style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#00E5FF', textTransform: 'capitalize', marginBottom: 20 }}
          >
            {slide.title}
          </h2>
          <p
            {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
            style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(255,255,255,0.7)' }}
          >
            {slide.subtitle}
          </p>
          {slide.ctaLabel && (
            <a
              {...elementProps(sectionId, `slides.${idx}.cta`, 'button')}
              href={slide.ctaHref ?? '#'}
              style={{ display: 'inline-block', marginTop: '28px', padding: '12px 28px', background: '#FF006E', color: '#FFFFFF', borderRadius: '4px', fontSize: '15px', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.03em', transition: 'background 0.3s ease' }}
            >
              {slide.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* Saveur parallax slide — Same technique as Serenite but catering/private chef themed.
 * Brown black (#1C1917) bg, gold (#C8A97E) slide numbers/titles, sienna (#6B4C3B) CTA. */
function SaveurFixedBgSlide({ slide, idx, sectionId, isEditing }: { slide: SlideItem; idx: number; sectionId: string; isEditing?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // JS fallback for editor mode only
  useEffect(() => {
    if (!isEditing) return
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    let scroller: HTMLElement | null = wrap.parentElement
    while (scroller) {
      const ov = getComputedStyle(scroller).overflowY
      if (ov === 'auto' || ov === 'scroll') break
      scroller = scroller.parentElement
    }
    if (!scroller) return

    let accOffset = 0
    let el: HTMLElement | null = wrap
    while (el && el !== scroller) {
      accOffset += el.offsetTop
      el = el.offsetParent as HTMLElement | null
    }

    const setSize = () => { img.style.height = `${scroller!.clientHeight}px` }
    setSize()

    const onScroll = () => {
      img.style.transform = `translate3d(0,${-(accOffset - scroller!.scrollTop)}px,0)`
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const ro = new ResizeObserver(setSize)
    ro.observe(scroller)

    return () => {
      scroller!.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [isEditing])

  // Preview mode: pure CSS background-attachment: fixed
  if (!isEditing) {
    return (
      <div
        {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
        style={{
          display: 'block',
          minHeight: '100svh',
          position: 'relative',
          overflow: 'hidden',
          color: '#FFFFFF',
          ...(slide.image ? {
            backgroundImage: `url(${slide.image})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#1C1917',
          } : { backgroundColor: '#1C1917' }),
        }}
      >
        <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(28, 25, 23, 0.92) 14%, rgba(28, 25, 23, 0.35) 60%, rgba(28, 25, 23, 0.12) 100%)' }} />
        {/* Slide number top-right */}
        <div style={{ position: 'absolute', right: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', zIndex: 2, fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: '12px', fontWeight: 500, color: '#C8A97E', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {String(idx + 1).padStart(2, '0')}
        </div>
        {slide.badge && (
          <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(200, 169, 126, 0.2)', color: '#C8A97E', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(200, 169, 126, 0.4)' }}>
            {slide.badge}
          </div>
        )}
        <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <h2
              {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
              style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#C8A97E', textTransform: 'capitalize', marginBottom: 20 }}
            >
              {slide.title}
            </h2>
            <p
              {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
              style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(255,255,255,0.72)' }}
            >
              {slide.subtitle}
            </p>
            {slide.ctaLabel && (
              <a
                {...elementProps(sectionId, `slides.${idx}.cta`, 'button')}
                href={slide.ctaHref ?? '#'}
                style={{ display: 'inline-block', marginTop: '28px', padding: '12px 28px', background: '#6B4C3B', color: '#FFFFFF', borderRadius: '4px', fontSize: '15px', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.03em', transition: 'background 0.3s ease' }}
              >
                {slide.ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Editor mode: JS-based scroll compensation with <img> tag
  return (
    <div
      ref={wrapRef}
      {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden', backgroundColor: '#1C1917', color: '#FFFFFF' }}
    >
      {slide.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          {...elementProps(sectionId, `slides.${idx}.image`, 'image', 'Slide Image')}
          src={slide.image}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      )}
      <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(28, 25, 23, 0.92) 14%, rgba(28, 25, 23, 0.35) 60%, rgba(28, 25, 23, 0.12) 100%)' }} />
      {/* Slide number top-right */}
      <div style={{ position: 'absolute', right: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', zIndex: 2, fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: '12px', fontWeight: 500, color: '#C8A97E', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        {String(idx + 1).padStart(2, '0')}
      </div>
      {slide.badge && (
        <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(200, 169, 126, 0.2)', color: '#C8A97E', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(200, 169, 126, 0.4)' }}>
          {slide.badge}
        </div>
      )}
      <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
        <div style={{ maxWidth: '680px' }}>
          <h2
            {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
            style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#C8A97E', textTransform: 'capitalize', marginBottom: 20 }}
          >
            {slide.title}
          </h2>
          <p
            {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
            style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(255,255,255,0.72)' }}
          >
            {slide.subtitle}
          </p>
          {slide.ctaLabel && (
            <a
              {...elementProps(sectionId, `slides.${idx}.cta`, 'button')}
              href={slide.ctaHref ?? '#'}
              style={{ display: 'inline-block', marginTop: '28px', padding: '12px 28px', background: '#6B4C3B', color: '#FFFFFF', borderRadius: '4px', fontSize: '15px', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.03em', transition: 'background 0.3s ease' }}
            >
              {slide.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* Ascent parallax slide — Same technique as Saveur but business/life coach themed.
 * Dark navy (#111827) bg, gold (#E0B870) slide numbers/titles, slate (#2D3748) CTA. */
function AscentFixedBgSlide({ slide, idx, sectionId, isEditing }: { slide: SlideItem; idx: number; sectionId: string; isEditing?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // JS fallback for editor mode only
  useEffect(() => {
    if (!isEditing) return
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    let scroller: HTMLElement | null = wrap.parentElement
    while (scroller) {
      const ov = getComputedStyle(scroller).overflowY
      if (ov === 'auto' || ov === 'scroll') break
      scroller = scroller.parentElement
    }
    if (!scroller) return

    let accOffset = 0
    let el: HTMLElement | null = wrap
    while (el && el !== scroller) {
      accOffset += el.offsetTop
      el = el.offsetParent as HTMLElement | null
    }

    const setSize = () => { img.style.height = `${scroller!.clientHeight}px` }
    setSize()

    const onScroll = () => {
      img.style.transform = `translate3d(0,${-(accOffset - scroller!.scrollTop)}px,0)`
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const ro = new ResizeObserver(setSize)
    ro.observe(scroller)

    return () => {
      scroller!.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [isEditing])

  // Preview mode: pure CSS background-attachment: fixed
  if (!isEditing) {
    return (
      <div
        {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
        style={{
          display: 'block',
          minHeight: '100svh',
          position: 'relative',
          overflow: 'hidden',
          color: '#FFFFFF',
          ...(slide.image ? {
            backgroundImage: `url(${slide.image})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#111827',
          } : { backgroundColor: '#111827' }),
        }}
      >
        <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(17, 24, 39, 0.92) 14%, rgba(17, 24, 39, 0.35) 60%, rgba(17, 24, 39, 0.12) 100%)' }} />
        {/* Slide number top-right */}
        <div style={{ position: 'absolute', right: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', zIndex: 2, fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: '12px', fontWeight: 500, color: '#E0B870', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {String(idx + 1).padStart(2, '0')}
        </div>
        {slide.badge && (
          <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(224, 184, 112, 0.15)', color: '#E0B870', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(224, 184, 112, 0.4)' }}>
            {slide.badge}
          </div>
        )}
        <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <h2
              {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
              style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#E0B870', textTransform: 'capitalize', marginBottom: 20 }}
            >
              {slide.title}
            </h2>
            <p
              {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
              style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(255,255,255,0.72)' }}
            >
              {slide.subtitle}
            </p>
            {slide.ctaLabel && (
              <a
                {...elementProps(sectionId, `slides.${idx}.cta`, 'button')}
                href={slide.ctaHref ?? '#'}
                style={{ display: 'inline-block', marginTop: '28px', padding: '12px 28px', background: '#2D3748', color: '#FFFFFF', borderRadius: '4px', fontSize: '15px', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.03em', transition: 'background 0.3s ease' }}
              >
                {slide.ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Editor mode: JS-based scroll compensation with <img> tag
  return (
    <div
      ref={wrapRef}
      {...elementProps(sectionId, `slides.${idx}`, 'container', 'Slide')}
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden', backgroundColor: '#111827', color: '#FFFFFF' }}
    >
      {slide.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          {...elementProps(sectionId, `slides.${idx}.image`, 'image', 'Slide Image')}
          src={slide.image}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      )}
      <div {...elementProps(sectionId, `slides.${idx}.overlay`, 'container', 'Gradient Overlay')} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(360deg, rgba(17, 24, 39, 0.92) 14%, rgba(17, 24, 39, 0.35) 60%, rgba(17, 24, 39, 0.12) 100%)' }} />
      {/* Slide number top-right */}
      <div style={{ position: 'absolute', right: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', zIndex: 2, fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: '12px', fontWeight: 500, color: '#E0B870', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        {String(idx + 1).padStart(2, '0')}
      </div>
      {slide.badge && (
        <div {...elementProps(sectionId, `slides.${idx}.featuredBadge`, 'badge', 'Badge')} style={{ position: 'absolute', left: 'clamp(20px, 5vw, 60px)', top: 'clamp(50px, 8vw, 100px)', padding: '8px 20px', borderRadius: 4, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(224, 184, 112, 0.15)', color: '#E0B870', fontSize: 14, fontWeight: 500, zIndex: 2, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(224, 184, 112, 0.4)' }}>
          {slide.badge}
        </div>
      )}
      <div {...elementProps(sectionId, `slides.${idx}.content`, 'container', 'Slide Content')} style={{ position: 'absolute', inset: 0, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)', paddingBottom: 'clamp(40px, 8vw, 100px)', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
        <div style={{ maxWidth: '680px' }}>
          <h2
            {...elementProps(sectionId, `slides.${idx}.title`, 'heading')}
            style={{ fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif", fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)', fontWeight: 500, lineHeight: '110%', color: '#E0B870', textTransform: 'capitalize', marginBottom: 20 }}
          >
            {slide.title}
          </h2>
          <p
            {...elementProps(sectionId, `slides.${idx}.subtitle`, 'text')}
            style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(255,255,255,0.72)' }}
          >
            {slide.subtitle}
          </p>
          {slide.ctaLabel && (
            <a
              {...elementProps(sectionId, `slides.${idx}.cta`, 'button')}
              href={slide.ctaHref ?? '#'}
              style={{ display: 'inline-block', marginTop: '28px', padding: '12px 28px', background: '#2D3748', color: '#FFFFFF', borderRadius: '4px', fontSize: '15px', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.03em', transition: 'background 0.3s ease' }}
            >
              {slide.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export function SliderSection({ config, isEditing }: { config: SectionConfig; isEditing?: boolean }) {
  const content = config.content as SliderContent
  const { universe, layout } = parseVariant(config.variant || 'startup-hero')
  const uConfig = UNIVERSE_CONFIGS[universe]
  const slides = content.slides ?? []

  const { emblaRef, selectedIndex, scrollSnaps, canScrollPrev, canScrollNext, scrollPrev, scrollNext, scrollTo } = useSectionCarousel({
    loop: content.loop ?? true,
    autoplay: content.autoplay ?? true,
    interval: content.interval ?? 5000,
    align: layout === 'cards' ? 'start' : 'center',
  })

  const emitChange = useCallback((type: 'slider-change' | 'slider-next' | 'slider-prev', index: number) => {
    componentTriggerBus.emit({ type, sourceId: config.id, data: { index } })
  }, [config.id])

  useEffect(() => {
    emitChange('slider-change', selectedIndex)
  }, [selectedIndex, emitChange])

  if (slides.length === 0) return null

  // ── nacre-parallax: Fullscreen parallax nail art gallery ──
  if (config.variant === 'nacre-parallax') {
    const defaultSlides = [
      { id: '1', title: 'Collection Automne', badge: 'Nouveau', subtitle: 'Tons chauds et textures velours pour un look sophistiqu\u00E9', image: '' } as SlideItem,
      { id: '2', title: 'French R\u00E9invent\u00E9e', badge: 'Tendance', subtitle: 'La classique french manucure revisit\u00E9e avec des touches dor\u00E9es', image: '' } as SlideItem,
      { id: '3', title: 'Nail Art G\u00E9om\u00E9trique', badge: 'Exclusif', subtitle: 'Lignes \u00E9pur\u00E9es et formes abstraites pour un style audacieux', image: '' } as SlideItem,
    ] as SlideItem[]
    const items = slides.length > 0 ? slides : defaultSlides

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Parallax Section')} style={{ width: '100%' }}>
        {items.map((slide, i) => (
          <NacreFixedBgSlide key={slide.id} slide={slide} idx={i} sectionId={config.id} isEditing={isEditing} />
        ))}
      </section>
    )
  }

  // ── obscura-parallax: Fullscreen parallax photographer portfolio ──
  if (config.variant === 'obscura-parallax') {
    const defaultSlides = [
      { id: '1', title: 'Lumière Dorée', badge: 'Portrait', subtitle: 'Un jeu d\'ombres et de lumière naturelle pour capturer l\'essence du sujet', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1920&q=85' } as SlideItem,
      { id: '2', title: 'Instant Éternel', badge: 'Mariage', subtitle: 'L\'émotion brute d\'un jour unique, sublimée par un regard artistique', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85' } as SlideItem,
      { id: '3', title: 'Horizon Urbain', badge: 'Paysage', subtitle: 'La vibration d\'un moment capturée dans sa plus pure intensité', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85' } as SlideItem,
    ] as SlideItem[]
    const items = slides.length > 0 ? slides : defaultSlides

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Parallax Section')} style={{ width: '100%' }}>
        {items.map((slide, i) => (
          <ObscuraFixedBgSlide key={slide.id} slide={slide} idx={i} sectionId={config.id} isEditing={isEditing} />
        ))}
      </section>
    )
  }

  // ── canopy-parallax: Fullscreen parallax eco product slides ──
  if (config.variant === 'canopy-parallax') {
    const defaultSlides = [
      { id: '1', title: 'Collection Été', badge: 'Coup de cœur', subtitle: 'Des sneakers légères en fibre d\'eucalyptus pour un été responsable', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&q=80' } as SlideItem,
      { id: '2', title: 'Wool Runner', badge: 'Nouveau', subtitle: 'Laine mérinos premium pour un confort naturel au quotidien', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1920&q=80' } as SlideItem,
      { id: '3', title: 'Trail Runner SWT', badge: 'Best-seller', subtitle: 'Semelle bio-based et traction tout-terrain, conçue pour durer', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1920&q=80' } as SlideItem,
    ] as SlideItem[]
    const items = slides.length > 0 ? slides : defaultSlides

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Parallax Section')} style={{ width: '100%' }}>
        {items.map((slide, i) => (
          <CanopyFixedBgSlide key={slide.id} slide={slide} idx={i} sectionId={config.id} isEditing={isEditing} />
        ))}
      </section>
    )
  }

  // ── brixsa-parallax: Fullscreen parallax property cards ──
  if (config.variant === 'brixsa-parallax') {
    const defaultSlides = [
      { id: '1', title: 'Family Friendly Home', badge: '$3,900', subtitle: 'Nestled in a peaceful suburban neighbourhood, with a spacious layout spanning 1,929 square feet, this home offers the perfect blend of comfort and style.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80' } as SlideItem,
      { id: '2', title: 'Elegant Condo Living', badge: '$3,900', subtitle: 'Nestled in a peaceful suburban neighbourhood, with a spacious layout spanning 1,929 square feet, this home offers the perfect blend of comfort and style.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80' } as SlideItem,
      { id: '3', title: 'Palm Grove Mansion', badge: '$3,900', subtitle: 'Nestled in a peaceful suburban neighbourhood, with a spacious layout spanning 1,929 square feet, this home offers the perfect blend of comfort and style.', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80' } as SlideItem,
    ] as SlideItem[]
    const items = slides.length > 0 ? slides : defaultSlides

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Parallax Section')} style={{ width: '100%' }}>
        {items.map((slide, i) => (
          <BrixsaFixedBgSlide key={slide.id} slide={slide} idx={i} sectionId={config.id} isEditing={isEditing} />
        ))}
      </section>
    )
  }

  // ── braise-parallax: Fullscreen parallax restaurant gallery ──
  if (config.variant === 'braise-parallax') {
    const defaultSlides = [
      { id: '1', title: 'Cuisine Ouverte', badge: 'En vedette', subtitle: 'Notre chef orchestre une symphonie de saveurs dans une cuisine ouverte sur la salle', image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1920&q=85' } as SlideItem,
      { id: '2', title: 'Cave \u00E0 Vins', badge: 'S\u00E9lection', subtitle: 'Plus de 300 r\u00E9f\u00E9rences soigneusement s\u00E9lectionn\u00E9es par notre sommelier', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920&q=85' } as SlideItem,
      { id: '3', title: 'Terrasse Secr\u00E8te', badge: 'Exclusif', subtitle: 'Un \u00E9crin de verdure cach\u00E9 au c\u0153ur de la ville pour des soir\u00E9es inoubliables', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=85' } as SlideItem,
    ] as SlideItem[]
    const items = slides.length > 0 ? slides : defaultSlides

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Parallax Section')} style={{ width: '100%' }}>
        {items.map((slide, i) => (
          <BraiseFixedBgSlide key={slide.id} slide={slide} idx={i} sectionId={config.id} isEditing={isEditing} />
        ))}
      </section>
    )
  }

  // ── forge-parallax: Fullscreen parallax sports coach gallery ──
  if (config.variant === 'forge-parallax') {
    const defaultSlides = [
      { id: '1', title: 'La Salle', badge: 'Équipement Pro', subtitle: 'Un espace de 500m² équipé des meilleures machines pour repousser vos limites', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=85' } as SlideItem,
      { id: '2', title: 'Outdoor Training', badge: 'En plein air', subtitle: 'Des séances en extérieur pour varier les plaisirs et profiter du grand air', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=85' } as SlideItem,
      { id: '3', title: 'Transformations', badge: 'Résultats', subtitle: 'Des centaines de transformations réussies grâce à un accompagnement sur-mesure', image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1920&q=85' } as SlideItem,
    ] as SlideItem[]
    const items = slides.length > 0 ? slides : defaultSlides

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Parallax Section')} style={{ width: '100%' }}>
        {items.map((slide, i) => (
          <ForgeFixedBgSlide key={slide.id} slide={slide} idx={i} sectionId={config.id} isEditing={isEditing} />
        ))}
      </section>
    )
  }

  // ── ciseaux-parallax: Fullscreen parallax hair salon gallery ──
  if (config.variant === 'ciseaux-parallax') {
    const defaultSlides = [
      { id: '1', title: 'Notre Salon', badge: 'Bienvenue', subtitle: 'Un espace lumineux et raffiné dédié à votre beauté et votre bien-être', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=85' } as SlideItem,
      { id: '2', title: 'Les Produits', badge: 'Premium', subtitle: 'Des soins et colorations haut de gamme pour sublimer chaque chevelure', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=85' } as SlideItem,
      { id: '3', title: 'L\'Expérience', badge: 'Exclusif', subtitle: 'Un moment de détente unique, pensé dans les moindres détails pour vous', image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1920&q=85' } as SlideItem,
    ] as SlideItem[]
    const items = slides.length > 0 ? slides : defaultSlides

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Parallax Section')} style={{ width: '100%' }}>
        {items.map((slide, i) => (
          <CiseauxFixedBgSlide key={slide.id} slide={slide} idx={i} sectionId={config.id} isEditing={isEditing} />
        ))}
      </section>
    )
  }

  // ── atelier-parallax: Fullscreen parallax interior architecture gallery ──
  if (config.variant === 'atelier-parallax') {
    const defaultSlides = [
      { id: '1', title: 'Avant / Apr\u00e8s', badge: 'Transformation', subtitle: 'Transformation compl\u00e8te d\'un appartement parisien de 120m\u00b2', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=85' } as SlideItem,
      { id: '2', title: 'Mat\u00e9riaux nobles', badge: 'Savoir-faire', subtitle: 'S\u00e9lection rigoureuse de mat\u00e9riaux d\'exception pour chaque projet', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=85' } as SlideItem,
      { id: '3', title: 'Lumi\u00e8re naturelle', badge: 'Design', subtitle: 'Optimisation des espaces pour maximiser la luminosit\u00e9', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=85' } as SlideItem,
    ] as SlideItem[]
    const items = slides.length > 0 ? slides : defaultSlides

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Parallax Section')} style={{ width: '100%' }}>
        {items.map((slide, i) => (
          <AtelierFixedBgSlide key={slide.id} slide={slide} idx={i} sectionId={config.id} isEditing={isEditing} />
        ))}
      </section>
    )
  }

  // ── encre-parallax: Fullscreen parallax tattoo studio process gallery ──
  if (config.variant === 'encre-parallax') {
    const defaultSlides = [
      { id: '1', title: 'Consultation', badge: 'Étape 01', subtitle: 'Échange approfondi sur votre projet, recherche de références et création du design personnalisé', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1920&q=85' } as SlideItem,
      { id: '2', title: 'Création', badge: 'Étape 02', subtitle: 'Dessin détaillé, ajustements et validation du stencil avant la séance', image: 'https://images.unsplash.com/photo-1565073624497-7144969d0a8c?w=1920&q=85' } as SlideItem,
      { id: '3', title: 'Réalisation', badge: 'Étape 03', subtitle: 'Exécution précise dans un environnement stérile avec les meilleurs équipements', image: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1920&q=85' } as SlideItem,
    ] as SlideItem[]
    const items = slides.length > 0 ? slides : defaultSlides

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Parallax Section')} style={{ width: '100%' }}>
        {items.map((slide, i) => (
          <EncreFixedBgSlide key={slide.id} slide={slide} idx={i} sectionId={config.id} isEditing={isEditing} />
        ))}
      </section>
    )
  }

  // ── serenite-parallax: Fullscreen parallax spa & wellness gallery ──
  if (config.variant === 'serenite-parallax') {
    const defaultSlides = [
      { id: '1', title: 'Espace Hammam', badge: 'Sérénité', subtitle: 'Un voyage sensoriel au cœur de la tradition orientale, entre vapeurs et gommage au savon noir', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=85' } as SlideItem,
      { id: '2', title: 'Cabines de Soins', badge: 'Exclusivité', subtitle: 'Des espaces privatifs baignés de lumière tamisée, pensés pour une relaxation totale', image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=1920&q=85' } as SlideItem,
      { id: '3', title: 'Jardin Zen', badge: 'Harmonie', subtitle: 'Un écrin de verdure où méditation et relaxation se mêlent dans une harmonie parfaite', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1920&q=85' } as SlideItem,
    ] as SlideItem[]
    const items = slides.length > 0 ? slides : defaultSlides

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Parallax Section')} style={{ width: '100%' }}>
        {items.map((slide, i) => (
          <SereniteFixedBgSlide key={slide.id} slide={slide} idx={i} sectionId={config.id} isEditing={isEditing} />
        ))}
      </section>
    )
  }

  // ── pulse-parallax: Fullscreen parallax DJ / music event gallery ──
  if (config.variant === 'pulse-parallax') {
    const defaultSlides = [
      { id: '1', title: 'Festival Stage', badge: 'Festival', subtitle: "L'adrénaline de jouer devant des milliers de personnes, les basses qui font trembler le sol", image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1920&q=85' } as SlideItem,
      { id: '2', title: 'Studio Session', badge: 'Studio', subtitle: 'Des heures de création, de sampling et de mixage pour produire le son parfait', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920&q=85' } as SlideItem,
      { id: '3', title: 'Club Night', badge: 'Club', subtitle: "L'intimité d'un club, la connexion directe avec le dancefloor, la magie du moment", image: 'https://images.unsplash.com/photo-1571266028243-d220c6a6dee1?w=1920&q=85' } as SlideItem,
    ] as SlideItem[]
    const items = slides.length > 0 ? slides : defaultSlides

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Parallax Section')} style={{ width: '100%' }}>
        {items.map((slide, i) => (
          <PulseFixedBgSlide key={slide.id} slide={slide} idx={i} sectionId={config.id} isEditing={isEditing} />
        ))}
      </section>
    )
  }

  // ── ascent-parallax: Fullscreen parallax business / life coach gallery ──
  if (config.variant === 'ascent-parallax') {
    const defaultSlides = [
      { id: '1', title: 'Clarifier', badge: 'Étape 01', subtitle: 'Identifier vos objectifs profonds, lever les freins invisibles et définir une feuille de route claire vers votre réussite', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=85' } as SlideItem,
      { id: '2', title: 'Transformer', badge: 'Étape 02', subtitle: 'Développer de nouveaux réflexes de leadership, reprogrammer vos schémas limitants et libérer votre plein potentiel', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1920&q=85' } as SlideItem,
      { id: '3', title: 'Performer', badge: 'Étape 03', subtitle: 'Mettre en place des systèmes durables, mesurer vos progrès et ancrer les résultats dans le temps', image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1920&q=85' } as SlideItem,
    ] as SlideItem[]
    const items = slides.length > 0 ? slides : defaultSlides

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Parallax Section')} style={{ width: '100%' }}>
        {items.map((slide, i) => (
          <AscentFixedBgSlide key={slide.id} slide={slide} idx={i} sectionId={config.id} isEditing={isEditing} />
        ))}
      </section>
    )
  }

  // ── saveur-parallax: Fullscreen parallax catering / private chef gallery ──
  if (config.variant === 'saveur-parallax') {
    const defaultSlides = [
      { id: '1', title: 'Produits d\'exception', badge: 'Sourcing', subtitle: 'Sélection rigoureuse auprès des meilleurs producteurs locaux et maraîchers bio', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85' } as SlideItem,
      { id: '2', title: 'L\'art du dressage', badge: 'Gastronomie', subtitle: 'Chaque assiette est une œuvre d\'art, pensée pour émerveiller les yeux avant les papilles', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=85' } as SlideItem,
      { id: '3', title: 'Service sur mesure', badge: 'Excellence', subtitle: 'Une équipe dédiée, du chef au maître d\'hôtel, pour un service irréprochable', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1920&q=85' } as SlideItem,
    ] as SlideItem[]
    const items = slides.length > 0 ? slides : defaultSlides

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Parallax Section')} style={{ width: '100%' }}>
        {items.map((slide, i) => (
          <SaveurFixedBgSlide key={slide.id} slide={slide} idx={i} sectionId={config.id} isEditing={isEditing} />
        ))}
      </section>
    )
  }

  // Thumbnails layout
  const isThumbnails = layout === 'thumbnails'

  return (
    <section className={cn(uConfig.bg, 'py-16 md:py-24')}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        {content.title && (
          <div className="text-center mb-8">
            {content.eyebrow && (
              <span {...elementProps(config.id, 'eyebrow', 'text')} className={cn('text-xs font-semibold uppercase tracking-widest', uConfig.eyebrow)}>
                {content.eyebrow}
              </span>
            )}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn('text-3xl md:text-4xl font-bold mt-3', uConfig.text)}>
              {content.title}
            </h2>
          </div>
        )}

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {slides.map((slide, i) =>
                layout === 'cards' ? (
                  <CardSlide key={slide.id} slide={slide} uConfig={uConfig} sectionId={config.id} index={i} isEditing={isEditing} />
                ) : (
                  <HeroSlide key={slide.id} slide={slide} uConfig={uConfig} sectionId={config.id} index={i} isEditing={isEditing} />
                )
              )}
            </div>
          </div>

          {/* Arrows */}
          {(content.showArrows ?? true) && slides.length > 1 && (
            <>
              <button
                onClick={() => { scrollPrev(); emitChange('slider-prev', selectedIndex) }}
                disabled={!canScrollPrev}
                className={cn('absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30', uConfig.arrowBg)}
              >
                <ChevronLeft className={cn('w-5 h-5', uConfig.arrowText)} />
              </button>
              <button
                onClick={() => { scrollNext(); emitChange('slider-next', selectedIndex) }}
                disabled={!canScrollNext}
                className={cn('absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30', uConfig.arrowBg)}
              >
                <ChevronRight className={cn('w-5 h-5', uConfig.arrowText)} />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {(content.showDots ?? true) && scrollSnaps.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={cn('w-2.5 h-2.5 rounded-full transition-all', i === selectedIndex ? uConfig.dotActive : uConfig.dotInactive)}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        {content.showCounter && slides.length > 1 && (
          <div className={cn('text-center mt-4 text-sm font-medium', uConfig.sub)}>
            {selectedIndex + 1} / {slides.length}
          </div>
        )}

        {/* Thumbnails */}
        {isThumbnails && slides.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => scrollTo(i)}
                className={cn(
                  'shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all',
                  i === selectedIndex ? 'border-indigo-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-80',
                )}
              >
                {slide.image ? (
                  <img src={slide.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-zinc-200 flex items-center justify-center">
                    <ImageIcon className="w-4 h-4 text-zinc-400" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export const sliderMeta: SectionMeta = {
  type: 'slider',
  label: 'Slider',
  icon: '🎠',
  variants: [
    'startup-hero', 'startup-cards', 'startup-thumbnails',
    'corporate-hero', 'corporate-cards', 'corporate-thumbnails',
    'luxe-hero', 'luxe-cards', 'luxe-thumbnails',
    'creative-hero', 'creative-cards', 'creative-thumbnails',
    'ecommerce-hero', 'ecommerce-cards', 'ecommerce-thumbnails',
    'glass-hero', 'glass-cards', 'glass-thumbnails',
    'nacre-parallax',
    'obscura-parallax',
    'canopy-parallax',
    'brixsa-parallax',
    'braise-parallax',
    'forge-parallax',
    'ciseaux-parallax',
    'atelier-parallax',
    'encre-parallax',
    'serenite-parallax',
    'pulse-parallax',
    'saveur-parallax',
    'ascent-parallax',
  ],
  defaultVariant: 'startup-hero',
  defaultContent: {},
}
