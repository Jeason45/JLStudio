'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
// createPortal removed — header/menu/search overlays now handled by SiteHeaderSection
import { cn } from '@/lib/utils'
import { elementProps } from '@/lib/elementHelpers'
import type { HeroConfig, HeroContent } from '@/types/sections'
import type { SectionConfig } from '@/types/site'
import { Play, ShieldCheck, Star, Truck, ArrowRight, ChevronLeft, ChevronRight, MapPin, Search, User, Check } from 'lucide-react'
import { getTitleSizeClass, getTextAlignClass } from '../_utils'
import { EditablePlaceholder } from '../_EditablePlaceholder'
import { useBrixsaScrollReveal } from '@/hooks/useBrixsaScrollReveal'

interface HeroSectionProps {
  config: SectionConfig
  isEditing?: boolean
}

export function HeroSection({ config, isEditing }: HeroSectionProps) {
  const hero = config as HeroConfig
  const content = (hero.content ?? {}) as Partial<HeroContent>
  const { accentColor, textColor: customTextColor, titleSize, textAlign } = config.style
  const variant = hero.variant ?? 'startup'

  const title = content.title ?? 'Titre de votre hero'
  const subtitle = content.subtitle ?? 'Votre sous-titre accrocheur ici.'
  const bgImage = content.backgroundImage
  const heroImage = content.image?.src
  const fontStyle = config.style.fontStyle

  // Helper: background image or placeholder
  const renderBgImage = (cls?: string) =>
    bgImage ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={bgImage} alt="" className={cn('absolute inset-0 w-full h-full object-cover', cls)} />
    ) : null

  const renderHeroImage = (cls?: string) =>
    heroImage ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img {...elementProps(config.id, 'image', 'image')} src={heroImage} alt={content.image?.alt ?? ''} className={cn('w-full h-full object-cover', cls)} />
    ) : isEditing ? (
      <EditablePlaceholder sectionId={config.id} contentPath="image.src" type="image" className={cls} />
    ) : (
      <div className={cn('w-full h-full flex items-center justify-center', cls)}>
        <span className="text-sm text-white/30">Image</span>
      </div>
    )

  // Helper: video background (YouTube/Vimeo embed or HTML5 video)
  const renderVideoBg = () => {
    if (!content.videoUrl) return null
    const isEmbed = content.videoUrl.includes('youtube') || content.videoUrl.includes('vimeo') || content.videoUrl.includes('embed')
    if (isEmbed) {
      return (
        <iframe
          src={content.videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ border: 0, pointerEvents: 'none' }}
        />
      )
    }
    return (
      <video
        src={content.videoUrl}
        poster={content.posterImage}
        autoPlay={content.autoplay !== false}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    )
  }

  // ─── VARIANT: startup ───
  // SaaS moderne : glow radial derrière le titre, CTA gradient avec shadow, image flottante en dessous
  if (variant === 'startup') {
    const accent = accentColor ?? '#6366f1'
    return (
      <section className="relative bg-white overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        {/* Subtle radial glow */}
        <div
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent}40, transparent 70%)` }}
        />
        <div className={cn("relative max-w-5xl mx-auto px-6 pt-20 pb-16 flex flex-col items-center text-center gap-6", textAlign && getTextAlignClass(textAlign))}>
          {content.eyebrow ? (
            <span
              {...elementProps(config.id, 'eyebrow', 'badge')}
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border border-zinc-200 text-zinc-600 bg-white shadow-sm"
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
              {content.eyebrow}
            </span>
          ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
          <h1
            {...elementProps(config.id, 'title', 'heading')}
            className={cn("text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-zinc-900 max-w-4xl", titleSize && getTitleSizeClass(titleSize))}
            style={customTextColor ? { color: customTextColor } : undefined}
          >
            {title}
          </h1>
          <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg md:text-xl text-zinc-500 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {content.primaryButton && (
              <a
                {...elementProps(config.id, 'primaryButton', 'button')}
                href={content.primaryButton.href}
                className="px-7 py-3.5 rounded-full text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] flex items-center gap-2"
                style={{ backgroundColor: accent, boxShadow: `0 4px 20px ${accent}35` }}
              >
                {content.primaryButton.label}
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
            {content.secondaryButton && (
              <a
                {...elementProps(config.id, 'secondaryButton', 'button')}
                href={content.secondaryButton.href}
                className="px-7 py-3.5 rounded-full text-sm font-semibold border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                {content.secondaryButton.label}
              </a>
            )}
          </div>
          {/* Hero image / video */}
          {(heroImage || content.videoUrl || bgImage || isEditing) && (
            <div className="mt-10 w-full max-w-4xl hero-float">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/50 aspect-video bg-zinc-100">
                {content.videoUrl ? (
                  <div className="relative w-full h-full">
                    {renderVideoBg()}
                  </div>
                ) : heroImage ? (
                  renderHeroImage('rounded-2xl')
                ) : bgImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={bgImage} alt="" className="w-full h-full object-cover rounded-2xl" />
                ) : isEditing ? (
                  <EditablePlaceholder sectionId={config.id} contentPath="image.src" type="image" className="rounded-2xl" />
                ) : null}
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }

  // ─── VARIANT: corporate ───
  // Entreprise/finance : split navy gauche, image droite, structuré, sobre
  if (variant === 'corporate') {
    const accent = accentColor ?? '#3b82f6'
    return (
      <section className="relative bg-slate-900 overflow-hidden noise-overlay" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12">
          {/* Text */}
          <div className={cn("flex-1 space-y-6", textAlign && getTextAlignClass(textAlign))}>
            {content.eyebrow && (
              <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-block text-xs font-semibold px-3 py-1 rounded border text-blue-300 border-blue-500/30 bg-blue-500/10">
                {content.eyebrow}
              </span>
            )}
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              className={cn("text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white", titleSize && getTitleSizeClass(titleSize))}
              style={customTextColor ? { color: customTextColor } : undefined}
            >
              {title}
            </h1>
            <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-slate-300 leading-relaxed max-w-xl">{subtitle}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-6 py-3 rounded text-sm font-semibold text-white transition-colors hover:brightness-110"
                  style={{ backgroundColor: accent }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-6 py-3 rounded text-sm font-medium border border-slate-500 text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  {content.secondaryButton.label}
                </a>
              )}
            </div>
            {content.trustText && (
              <p className="text-xs text-slate-500 flex items-center gap-2 pt-2">
                <ShieldCheck className="w-4 h-4 text-slate-600" />
                {content.trustText}
              </p>
            )}
          </div>
          {/* Image */}
          <div className="flex-1 max-w-lg w-full">
            <div className="relative rounded-2xl overflow-hidden bg-slate-800 aspect-[4/3]">
              {content.videoUrl ? (
                <>
                  {renderVideoBg()}
                  <div className="absolute inset-0 bg-slate-900/30" />
                </>
              ) : heroImage ? (
                renderHeroImage()
              ) : bgImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={bgImage} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-sm text-slate-600">Image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ─── VARIANT: luxe ───
  // Luxe/hôtellerie : image plein écran, overlay sombre, typo fine, espacement premium, accent doré
  if (variant === 'luxe') {
    const gold = accentColor ?? '#b8860b'
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        {/* Background image with parallax */}
        {(bgImage || heroImage) ? (
          <div
            {...elementProps(config.id, 'image', 'image')}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${bgImage || heroImage})`,
              backgroundSize: config.style.backgroundImage?.size || 'cover',
              backgroundPosition: config.style.backgroundImage?.position || 'center',
              backgroundAttachment: config.style.backgroundImage?.attachment || 'scroll',
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-900" />
        )}
        {/* Video background */}
        {content.videoUrl && (
          <div className="absolute inset-0">
            {renderVideoBg()}
          </div>
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Content */}
        <div className={cn("relative z-10 max-w-4xl mx-auto px-6 text-center py-24 space-y-8", textAlign && getTextAlignClass(textAlign))}>
          {/* Decorative image (logo/emblem) */}
          {content.decorativeImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              {...elementProps(config.id, 'decorativeImage', 'image')}
              src={content.decorativeImage}
              alt=""
              className="mx-auto max-h-32 w-auto object-contain"
            />
          )}
          {content.eyebrow && (
            <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-block text-xs tracking-[0.25em] uppercase font-light" style={{ color: gold }}>
              {content.eyebrow}
            </span>
          )}
          {/* Gold divider */}
          <div className="w-12 h-px mx-auto" style={{ background: gold }} />
          <h1
            {...elementProps(config.id, 'title', 'heading')}
            className={cn("text-4xl md:text-5xl lg:text-7xl font-light leading-[1.1] tracking-tight text-white", titleSize && getTitleSizeClass(titleSize))}
            style={{ ...(customTextColor ? { color: customTextColor } : {}), ...(fontStyle === 'italic' ? { fontStyle: 'italic' } : {}) }}
          >
            {title}
          </h1>
          <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            {content.primaryButton && (
              <a
                {...elementProps(config.id, 'primaryButton', 'button')}
                href={content.primaryButton.href}
                className="px-8 py-3.5 text-sm font-medium tracking-[0.1em] uppercase text-white transition-all hover:brightness-110 border"
                style={{ borderColor: gold, backgroundColor: gold }}
              >
                {content.primaryButton.label}
              </a>
            )}
            {content.secondaryButton && (
              <a
                {...elementProps(config.id, 'secondaryButton', 'button')}
                href={content.secondaryButton.href}
                className="px-8 py-3.5 text-sm font-medium tracking-[0.1em] uppercase border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                {content.secondaryButton.label}
              </a>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ─── VARIANT: creative ───
  // Néobrutalist : fond crème, bordures épaisses, typo black XXL, image offset avec rotation, stickers
  if (variant === 'creative') {
    const accent = accentColor ?? '#ea580c'
    const isCentered = textAlign === 'center'
    return (
      <section className="relative bg-[#f5f0e8] overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className={cn(
          'max-w-7xl mx-auto px-6 flex items-center',
          isCentered ? 'flex-col pt-12 pb-6 lg:pt-16 lg:pb-8 gap-8' : 'flex-col lg:flex-row py-16 lg:py-24 gap-10'
        )}>
          {/* Text */}
          <div className={cn("space-y-6", isCentered ? 'text-center flex flex-col items-center max-w-3xl' : 'flex-1', textAlign && !isCentered && getTextAlignClass(textAlign))}>
            {content.eyebrow && (
              <span
                {...elementProps(config.id, 'eyebrow', 'badge')}
                className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-none border-2 border-zinc-900 text-zinc-900"
                style={accentColor ? { backgroundColor: accentColor, borderColor: accentColor, color: '#fff' } : undefined}
              >
                {content.eyebrow}
              </span>
            )}
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              className={cn("text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-zinc-900", titleSize && getTitleSizeClass(titleSize))}
              style={customTextColor ? { color: customTextColor } : undefined}
            >
              {title}
            </h1>
            <p {...elementProps(config.id, 'subtitle', 'text')} className={cn("text-lg text-zinc-600 leading-relaxed", isCentered ? 'max-w-xl' : 'max-w-lg')}>{subtitle}</p>
            <div className={cn("flex flex-wrap gap-3 pt-2", isCentered && 'justify-center')}>
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className={cn(
                    'px-6 py-3.5 text-sm font-bold uppercase tracking-wider border-2 rounded-none transition-all',
                    content.primaryButton.variant === 'outline'
                      ? 'bg-transparent text-zinc-900 border-zinc-900 hover:bg-zinc-900 hover:text-white'
                      : 'text-white hover:translate-x-0.5 hover:-translate-y-0.5 shadow-[4px_4px_0_0_#18181b] hover:shadow-[6px_6px_0_0_#18181b]'
                  )}
                  style={content.primaryButton.variant === 'outline' ? undefined : { backgroundColor: accent, borderColor: accent }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-zinc-900 border-2 border-zinc-900 rounded-none bg-transparent hover:bg-zinc-900 hover:text-white transition-colors"
                >
                  {content.secondaryButton.label}
                </a>
              )}
            </div>
          </div>
          {/* Image with offset/rotation effect */}
          <div className={cn("relative", isCentered ? 'w-full max-w-2xl' : 'flex-1 max-w-lg w-full')}>
            {/* Shadow offset */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-zinc-900 rounded-none" />
            <div className="relative overflow-hidden border-3 border-zinc-900 bg-zinc-200 aspect-[4/3] rounded-none" style={{ borderWidth: '3px' }}>
              {content.videoUrl ? (
                <div className="relative w-full h-full">
                  {renderVideoBg()}
                </div>
              ) : heroImage ? (
                renderHeroImage()
              ) : bgImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={bgImage} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-sm text-zinc-400">Image</span>
                </div>
              )}
            </div>
            {/* Sticker badge */}
            {(content.badge || content.eyebrow) && (
              <div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center text-white text-[10px] font-black uppercase rotate-12 shadow-lg"
                style={{ backgroundColor: accent }}
              >
                {content.badge || 'NEW!'}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ─── VARIANT: ecommerce ───
  // Boutique : split, grande image produit, prix, badges confiance, CTA proéminent
  if (variant === 'ecommerce') {
    const accent = accentColor ?? '#059669'
    return (
      <section className="relative bg-white overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-7xl mx-auto px-6 py-14 lg:py-20 flex flex-col lg:flex-row items-center gap-12">
          {/* Text & CTA */}
          <div className={cn("flex-1 space-y-5", textAlign && getTextAlignClass(textAlign))}>
            {content.eyebrow && (
              <span
                {...elementProps(config.id, 'eyebrow', 'badge')}
                className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: accent }}
              >
                {content.eyebrow}
              </span>
            )}
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              className={cn("text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-zinc-900", titleSize && getTitleSizeClass(titleSize))}
              style={customTextColor ? { color: customTextColor } : undefined}
            >
              {title}
            </h1>
            <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-500 max-w-lg leading-relaxed">{subtitle}</p>
            {/* Price */}
            {content.price && (
              <div className="flex items-end gap-3 pt-2">
                <span className="text-3xl font-bold text-zinc-900">{content.price}</span>
                {content.originalPrice && (
                  <span className="text-lg text-zinc-400 line-through">{content.originalPrice}</span>
                )}
              </div>
            )}
            <div className="flex flex-wrap gap-3 pt-3">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white transition-colors hover:brightness-110"
                  style={{ backgroundColor: accent }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-8 py-3.5 rounded-xl text-sm font-medium border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors"
                >
                  {content.secondaryButton.label}
                </a>
              )}
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-4 text-xs text-zinc-500">
              <span {...elementProps(config.id, 'trustBadge1', 'text')} className="flex items-center gap-1.5"><Truck className="w-4 h-4" />Livraison gratuite</span>
              <span {...elementProps(config.id, 'trustBadge2', 'text')} className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" />Satisfait ou remboursé</span>
              <span {...elementProps(config.id, 'trustBadge3', 'text')} className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-500" />4.9/5 (2 340 avis)</span>
            </div>
          </div>
          {/* Product image */}
          <div className="flex-1 max-w-lg w-full">
            <div className="relative rounded-3xl overflow-hidden bg-zinc-50 aspect-square">
              {content.videoUrl ? (
                <div className="relative w-full h-full">
                  {renderVideoBg()}
                </div>
              ) : heroImage ? (
                renderHeroImage()
              ) : bgImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={bgImage} alt="" className="w-full h-full object-cover" />
              ) : isEditing ? (
                <EditablePlaceholder sectionId={config.id} contentPath="image.src" type="image" className="w-full h-full" label="Image produit" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-sm text-zinc-300">Image produit</span>
                </div>
              )}
              {content.originalPrice && content.price && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  PROMO
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ─── VARIANT: glass ───
  // Tech/IA/Crypto : fond très sombre, dot grid, glow radial accent, glassmorphism card, gradient text
  // Inspiré par jlstudio.dev
  if (variant === 'glass') {
    const accent = accentColor ?? '#638bff'
    return (
      <section className="relative bg-zinc-950 overflow-hidden noise-overlay" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid" />
        {/* Radial glow */}
        <div
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full glow-pulse pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 40% at 50% 50%, ${accent}15, transparent 70%)` }}
        />
        {/* Video/image background */}
        {content.videoUrl && (
          <div className="absolute inset-0 opacity-30">
            {renderVideoBg()}
          </div>
        )}
        {bgImage && !content.videoUrl && (
          <div className="absolute inset-0 opacity-20">
            {renderBgImage()}
          </div>
        )}
        <div className={cn("relative z-10 max-w-5xl mx-auto px-6 py-24 lg:py-32 flex flex-col items-center text-center gap-8", textAlign && getTextAlignClass(textAlign))}>
          {content.eyebrow && (
            <span
              {...elementProps(config.id, 'eyebrow', 'badge')}
              className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/[0.04] backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}80` }} />
              {content.eyebrow}
            </span>
          )}
          <h1
            {...elementProps(config.id, 'title', 'heading')}
            className={cn("text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight gradient-text max-w-4xl", titleSize && getTitleSizeClass(titleSize))}
            style={customTextColor ? { color: customTextColor, background: 'none', WebkitTextFillColor: 'unset' } : undefined}
          >
            {title}
          </h1>
          <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {content.primaryButton && (
              <a
                {...elementProps(config.id, 'primaryButton', 'button')}
                href={content.primaryButton.href}
                className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110 flex items-center gap-2"
                style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)`, boxShadow: `0 0 25px ${accent}30` }}
              >
                {content.primaryButton.label}
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
            {content.secondaryButton && (
              <a
                {...elementProps(config.id, 'secondaryButton', 'button')}
                href={content.secondaryButton.href}
                className="px-7 py-3.5 rounded-xl text-sm font-medium border border-white/10 text-white/70 hover:bg-white/[0.06] backdrop-blur-sm transition-colors"
              >
                {content.secondaryButton.label}
              </a>
            )}
          </div>
          {/* Glassmorphism image card */}
          {(heroImage || bgImage) && (
            <div className="mt-8 w-full max-w-4xl hero-float">
              <div className="relative rounded-2xl overflow-hidden bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-2 shadow-2xl">
                <div className="rounded-xl overflow-hidden aspect-video bg-zinc-900">
                  {heroImage ? (
                    renderHeroImage('rounded-xl')
                  ) : bgImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={bgImage} alt="" className="w-full h-full object-cover rounded-xl" />
                  ) : null}
                </div>
                {/* Glow line at bottom */}
                <div className="absolute bottom-0 left-[10%] right-[10%] h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
              </div>
            </div>
          )}
          {/* Video play button if video + no bg */}
          {content.videoUrl && !heroImage && !bgImage && (
            <div className="mt-8">
              <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors group">
                <Play className="w-6 h-6 text-white group-hover:scale-110 transition-transform ml-0.5" />
              </button>
            </div>
          )}
        </div>
      </section>
    )
  }

  // ─── VARIANT: brixsa-page ───
  // Brixsa secondary pages: simple hero with breadcrumb, centered title, scroll indicator
  if (variant === 'brixsa-page') {
    const pageBgImage = bgImage ?? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80'
    const breadcrumb = subtitle || 'Home • Page'

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Page Hero')}
        style={{
          position: 'relative',
          width: '100%',
          height: '60vh',
          minHeight: '400px',
          backgroundColor: '#140c08',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
          color: '#e1e1e1',
        }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pageBgImage}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(20, 12, 8, 0.65)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            textAlign: 'center',
            padding: '0 24px',
          }}
        >
          {/* Breadcrumb */}
          <p
            {...elementProps(config.id, 'breadcrumb', 'text', 'Breadcrumb')}
            style={{
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(225, 225, 225, 0.6)',
              margin: 0,
            }}
          >
            {breadcrumb}
          </p>

          {/* Title */}
          <h1
            {...elementProps(config.id, 'title', 'heading')}
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#e1e1e1',
              margin: 0,
              maxWidth: '800px',
            }}
          >
            {title}
          </h1>
        </div>

        {/* Scroll indicator */}
        <p
          {...elementProps(config.id, 'scrollText', 'text', 'Scroll Indicator')}
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '12px',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(225, 225, 225, 0.4)',
            margin: 0,
          }}
        >
          Scroll to Explore
        </p>
      </section>
    )
  }

  // ─── VARIANT: obscura ───
  // Photographer premium : fullscreen diagonal-wipe slider, gold counter, progress bar, centered title
  if (variant === 'obscura') {
    const defaultHeroImages = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&q=85',
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=85',
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1920&q=85',
    ]

    const rawHeroImages = (content as Record<string, unknown>).heroImages as (string | { id?: string; src?: string; alt?: string })[] | undefined
    const heroImages = rawHeroImages?.map(img => typeof img === 'string' ? img : img?.src).filter(Boolean) as string[] | undefined

    const slides = [
      { name: 'Portrait', counter: '01', image: heroImages?.[0] ?? defaultHeroImages[0] },
      { name: 'Mariage', counter: '02', image: heroImages?.[1] ?? defaultHeroImages[1] },
      { name: 'Événement', counter: '03', image: heroImages?.[2] ?? defaultHeroImages[2] },
    ]

    /* eslint-disable react-hooks/rules-of-hooks */
    const [obscuraActiveSlide, setObscuraActiveSlide] = useState(0)
    const obscuraPrevSlideRef = useRef(0)
    const obscuraTitleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })

    const obscuraGoNext = useCallback(() => {
      setObscuraActiveSlide((prev) => {
        obscuraPrevSlideRef.current = prev
        return (prev + 1) % slides.length
      })
    }, [])

    const obscuraGoPrev = useCallback(() => {
      setObscuraActiveSlide((prev) => {
        obscuraPrevSlideRef.current = prev
        return (prev - 1 + slides.length) % slides.length
      })
    }, [])

    useEffect(() => {
      const interval = setInterval(obscuraGoNext, 5000)
      return () => clearInterval(interval)
    }, [obscuraGoNext])
    /* eslint-enable react-hooks/rules-of-hooks */

    const obscuraCurrentSlide = slides[obscuraActiveSlide]

    return (
      <>
      {/* Obscura hero responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .obscura-resp-arrows { display: none !important; }
          .obscura-resp-meta { left: 50% !important; transform: translateX(-50%) !important; text-align: center !important; }
        }
        @media (max-width: 480px) {
          .obscura-resp-progress { max-width: 200px !important; }
        }
      ` }} />
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Hero Section')}
        className="relative overflow-hidden"
        style={{
          height: '100vh',
          backgroundColor: '#0A0A0A',
          color: '#E8E4DF',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        {/* Diagonal wipe — parallelogram translates uniformly so the oblique angle
            NEVER changes during the sweep (no "book opening" distortion).
            All 4 polygon points shift by exactly 120% horizontally.
            Left edge skew = 20% (top is 20% further right than bottom). */}
        {slides.map((slide, i) => {
          const isActive = obscuraActiveSlide === i
          const isPrev = obscuraPrevSlideRef.current === i && !isActive

          const visible = 'polygon(0% 0%, 130% 0%, 130% 100%, -20% 100%)'
          const hidden  = 'polygon(120% 0%, 250% 0%, 250% 100%, 100% 100%)'
          const full    = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                clipPath: isActive ? visible : isPrev ? full : hidden,
                opacity: isActive || isPrev ? 1 : 0,
                transition: isActive
                  ? 'clip-path 1.4s cubic-bezier(0.76, 0, 0.24, 1), opacity 0s'
                  : isPrev
                    ? 'none'
                    : 'clip-path 0s 1.5s, opacity 0s 1.5s',
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              }}
            >
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: '#0A0A0A',
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              )}
            </div>
          )
        })}

        {/* Dark overlay */}
        <div {...elementProps(config.id, 'overlay', 'container', 'Overlay')} className="absolute inset-0" style={{ backgroundColor: 'rgba(10, 10, 10, 0.4)', zIndex: 3 }} />

        {/* Center content — title + subtitle */}
        <div {...elementProps(config.id, 'centerContent', 'container', 'Hero Content')} className="relative flex flex-col items-center justify-center h-full px-6" style={{ zIndex: 10 }}>
          <div ref={obscuraTitleRevealRef}>
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              style={{
                color: '#E8E4DF',
                fontWeight: 500,
                fontSize: 'clamp(3rem, 2rem + 5vw, 6rem)',
                lineHeight: '110%',
                maxWidth: '1000px',
                textAlign: 'center',
                letterSpacing: '0.05em',
                marginBottom: '16px',
                marginTop: 0,
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
              }}
            >
              {title}
            </h1>
          </div>
          {/* Subtitle */}
          <p
            {...elementProps(config.id, 'subtitle', 'text')}
            style={{
              color: 'rgba(232, 228, 223, 0.4)',
              fontSize: '14px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              margin: 0,
              textAlign: 'center',
              fontFamily: "'Inter Variable', 'Inter', sans-serif",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Bottom-left: category + counter */}
        <div
          {...elementProps(config.id, 'slideMeta', 'container', 'Slide Info')}
          className="absolute z-10 obscura-resp-meta"
          style={{
            bottom: '40px',
            left: 'clamp(24px, 5vw, 60px)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <span
            {...elementProps(config.id, `slides.${obscuraActiveSlide}.name`, 'text')}
            style={{
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#E8E4DF',
              fontFamily: "'Inter Variable', 'Inter', sans-serif",
            }}
          >
            {obscuraCurrentSlide.name}
          </span>
          <span
            {...elementProps(config.id, 'slideCounter', 'text', 'Slide Counter')}
            style={{
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.05em',
              color: '#D4A853',
              fontFamily: "'Inter Variable', 'Inter', sans-serif",
            }}
          >
            {obscuraCurrentSlide.counter} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        {/* Bottom center: progress bar */}
        <div
          {...elementProps(config.id, 'progressBar', 'container', 'Progress Bar')}
          className="absolute z-10 obscura-resp-progress"
          style={{
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '240px',
            height: '2px',
            backgroundColor: 'rgba(232, 228, 223, 0.15)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${((obscuraActiveSlide + 1) / slides.length) * 100}%`,
              backgroundColor: '#D4A853',
              borderRadius: '1px',
              transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>

        {/* Side arrows — subtle thin circles */}
        <div
          {...elementProps(config.id, 'prevButton', 'button')}
          role="button"
          onClick={obscuraGoPrev}
          className="absolute z-10 flex items-center justify-center obscura-resp-arrows"
          style={{
            left: 'clamp(16px, 4vw, 48px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '1px solid rgba(232, 228, 223, 0.15)',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            transition: 'border-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#D4A853' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(232, 228, 223, 0.15)' }}
          aria-label="Previous slide"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8E4DF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>

        <div
          {...elementProps(config.id, 'nextButton', 'button')}
          role="button"
          onClick={obscuraGoNext}
          className="absolute z-10 flex items-center justify-center obscura-resp-arrows"
          style={{
            right: 'clamp(16px, 4vw, 48px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '1px solid rgba(232, 228, 223, 0.15)',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            transition: 'border-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#D4A853' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(232, 228, 223, 0.15)' }}
          aria-label="Next slide"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8E4DF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </section>
      </>
    )
  }

  // ─── VARIANT: canopy ───
  // Eco e-commerce premium : fullscreen diagonal-wipe slider, glassmorphism shop bar, Brixsa-level
  if (variant === 'canopy') {
    const defaultHeroImages = [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1920&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1920&q=80',
    ]

    const rawHeroImages = (content as Record<string, unknown>).heroImages as (string | { id?: string; src?: string; alt?: string })[] | undefined
    const heroImages = rawHeroImages?.map(img => typeof img === 'string' ? img : img?.src).filter(Boolean) as string[] | undefined

    const slides = [
      { name: 'Tree Runner', location: 'Eucalyptus', image: heroImages?.[0] ?? defaultHeroImages[0] },
      { name: 'Wool Collection', location: 'Mérinos', image: heroImages?.[1] ?? defaultHeroImages[1] },
      { name: 'Trail Runner', location: 'Bio-based', image: heroImages?.[2] ?? defaultHeroImages[2] },
    ]

    /* eslint-disable react-hooks/rules-of-hooks */
    const [activeSlide, setActiveSlide] = useState(0)
    const prevSlideRef = useRef(0)
    const heroTitleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })

    const goNext = useCallback(() => {
      setActiveSlide((prev) => {
        prevSlideRef.current = prev
        return (prev + 1) % slides.length
      })
    }, [])

    const goPrev = useCallback(() => {
      setActiveSlide((prev) => {
        prevSlideRef.current = prev
        return (prev - 1 + slides.length) % slides.length
      })
    }, [])

    useEffect(() => {
      const interval = setInterval(goNext, 5000)
      return () => clearInterval(interval)
    }, [goNext])

    const shopBtnLabel = content.primaryButton?.label || 'ACHETER'
    const currentSlide = slides[activeSlide]

    // Chevron SVG for filter dropdowns
    const CanopyChevronDown = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6L8 10L12 6" stroke="#E8E8E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )

    // Filter dropdowns state
    const filterOptions: Record<string, string[]> = {
      'Catégorie': ['Chaussures', 'Vêtements', 'Accessoires', 'Sous-vêtements', 'Chaussettes'],
      'Taille': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      'Matière': ['Eucalyptus', 'Mérinos', 'Coton bio', 'Trino', 'Recyclé'],
    }
    const [openFilter, setOpenFilter] = useState<string | null>(null)
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string | null>>({
      'Catégorie': null,
      'Taille': null,
      'Matière': null,
    })
    const filtersContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!openFilter) return
      const handleClickOutside = (e: MouseEvent) => {
        if (filtersContainerRef.current && !filtersContainerRef.current.contains(e.target as Node)) {
          setOpenFilter(null)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [openFilter])
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <>
      {/* Canopy hero responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .canopy-resp-shopbar { padding: 6px !important; max-width: 100% !important; }
          .canopy-resp-filters { display: none !important; }
        }
        @media (max-width: 480px) {
          .canopy-resp-shopbar { margin: 0 16px; }
        }
      ` }} />
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Hero Section')}
        className="relative overflow-hidden"
        style={{
          height: '100vh',
          backgroundColor: '#1A1A1A',
          color: '#FAFAF8',
          fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif",
        }}
      >
        {/* Diagonal wipe — parallelogram translates uniformly so the oblique angle
            NEVER changes during the sweep (no "book opening" distortion).
            All 4 polygon points shift by exactly 120% horizontally.
            Left edge skew = 20% (top is 20% further right than bottom). */}
        {slides.map((slide, i) => {
          const isActive = activeSlide === i
          const isPrev = prevSlideRef.current === i && !isActive

          const visible = 'polygon(0% 0%, 130% 0%, 130% 100%, -20% 100%)'
          const hidden  = 'polygon(120% 0%, 250% 0%, 250% 100%, 100% 100%)'
          const full    = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                clipPath: isActive ? visible : isPrev ? full : hidden,
                opacity: isActive || isPrev ? 1 : 0,
                transition: isActive
                  ? 'clip-path 1.4s cubic-bezier(0.76, 0, 0.24, 1), opacity 0s'
                  : isPrev
                    ? 'none'
                    : 'clip-path 0s 1.5s, opacity 0s 1.5s',
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              }}
            >
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: '#1A1A1A',
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              )}
            </div>
          )
        })}

        {/* Dark overlay */}
        <div {...elementProps(config.id, 'overlay', 'container', 'Overlay')} className="absolute inset-0" style={{ backgroundColor: 'rgba(26, 26, 26, 0.35)', zIndex: 3 }} />

        {/* Center content */}
        <div {...elementProps(config.id, 'centerContent', 'container', 'Hero Content')} className="relative flex flex-col items-center justify-center h-full px-6" style={{ zIndex: 10 }}>
          {/* H1 title */}
          <div ref={heroTitleRevealRef}>
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              style={{
                color: '#FAFAF8',
                fontWeight: 700,
                fontSize: 'clamp(2.875rem, 1.6429rem + 5.4762vw, 5.75rem)',
                lineHeight: '110%',
                maxWidth: '928px',
                textAlign: 'center',
                marginBottom: '40px',
                marginTop: 0,
                fontFamily: "'Inter Variable', system-ui, sans-serif",
              }}
            >
              {title}
            </h1>
          </div>

          {/* Glassmorphism shop pill — Filters LEFT, Buy button RIGHT */}
          <div
            {...elementProps(config.id, 'shopBar', 'container', 'Shop Bar')}
            className={cn('flex items-center', 'canopy-resp-shopbar')}
            style={{
              borderRadius: '999px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(45, 80, 22, 0.35)',
              padding: '6px 6px 6px 24px',
              gap: '0',
              maxWidth: '720px',
              width: '100%',
            }}
          >
            {/* Left: 3 filter dropdowns */}
            <div ref={filtersContainerRef} {...elementProps(config.id, 'filtersRow', 'container', 'Filters')} className="flex items-center canopy-resp-filters" style={{ flexShrink: 0 }}>
              {['Catégorie', 'Taille', 'Matière'].map((label, i) => (
                <div
                  key={label}
                  style={{
                    position: 'relative',
                    paddingRight: i < 2 ? '14px' : '0',
                    marginRight: i < 2 ? '14px' : '0',
                    borderRight: i < 2 ? '1px solid rgba(232, 232, 229, 0.25)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span
                    {...elementProps(config.id, `filters.${i}.label`, 'text')}
                    onClick={() => setOpenFilter(openFilter === label ? null : label)}
                    style={{
                      color: selectedFilters[label] ? '#A8D98A' : '#E8E8E5',
                      fontSize: '14px',
                      gap: '6px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      userSelect: 'none',
                    }}
                  >
                    {selectedFilters[label] ?? label}
                    <span {...elementProps(config.id, `filters.${i}.caret`, 'icon', `${label} Caret`)} style={{ display: 'flex', alignItems: 'center', transition: 'transform 0.2s ease', transform: openFilter === label ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <CanopyChevronDown />
                    </span>
                  </span>
                  {openFilter === label && (
                    <div
                      {...elementProps(config.id, `filters.${i}.dropdown`, 'container', `${label} Dropdown`)}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        marginTop: '12px',
                        minWidth: '180px',
                        zIndex: 100,
                        backgroundColor: 'rgba(45, 80, 22, 0.5)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '8px',
                        padding: '6px',
                        fontFamily: "'Inter Variable', Inter, sans-serif",
                      }}
                    >
                      {filterOptions[label].map((option) => (
                        <div
                          key={option}
                          {...elementProps(config.id, `filters.${i}.option.${option}`, 'text', option)}
                          onClick={() => {
                            setSelectedFilters((prev) => ({ ...prev, [label]: prev[label] === option ? null : option }))
                            setOpenFilter(null)
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)' }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                          style={{
                            padding: '8px 14px',
                            color: selectedFilters[label] === option ? '#A8D98A' : '#E8E8E5',
                            fontSize: '14px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            transition: 'background-color 0.15s ease',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: spacer + buy button */}
            <div style={{ flex: '1 1 auto', minWidth: '0', marginLeft: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <div
                {...elementProps(config.id, 'primaryButton', 'button')}
                role="button"
                className="text-white"
                style={{
                  backgroundColor: '#2D5016',
                  borderRadius: '0',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {shopBtnLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-left meta badge */}
        <div
          {...elementProps(config.id, 'slideMeta', 'container', 'Slide Info')}
          className="absolute"
          style={{
            bottom: '24px',
            left: 'clamp(16px, 4vw, 60px)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(45, 80, 22, 0.35)',
            borderRadius: '4px',
            padding: '12px 20px',
            zIndex: 10,
          }}
        >
          <div className="flex items-center" style={{ gap: '16px' }}>
            <span
              {...elementProps(config.id, `slides.${activeSlide}.name`, 'text')}
              style={{ fontSize: 'clamp(14px, 1.5vw, 18px)', fontWeight: 500, color: '#FAFAF8' }}
            >
              {currentSlide.name}
            </span>
            <span {...elementProps(config.id, 'slideDivider', 'text', 'Divider')} style={{ color: 'rgba(250,250,248,0.6)', fontSize: '14px' }}>
              &middot;
            </span>
            <span
              {...elementProps(config.id, `slides.${activeSlide}.location`, 'text')}
              className="flex items-center"
              style={{ color: '#A8D98A', fontSize: '14px', gap: '4px' }}
            >
              Eco
              <span style={{ color: 'rgba(250,250,248,0.6)', margin: '0 4px' }}>&middot;</span>
              {currentSlide.location}
            </span>
          </div>
        </div>

        {/* Prev button */}
        <div
          {...elementProps(config.id, 'prevButton', 'button')}
          role="button"
          onClick={goPrev}
          className="absolute flex items-center justify-center"
          style={{
            left: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 60px)',
            height: 'clamp(40px, 6vw, 60px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(45, 80, 22, 0.35)',
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.5s ease',
            zIndex: 10,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}
          aria-label="Previous slide"
        >
          <span {...elementProps(config.id, 'prevIcon', 'icon', 'Chevron Left')}><ChevronLeft style={{ width: '24px', height: '24px', color: '#FAFAF8' }} /></span>
        </div>

        {/* Next button */}
        <div
          {...elementProps(config.id, 'nextButton', 'button')}
          role="button"
          onClick={goNext}
          className="absolute flex items-center justify-center"
          style={{
            right: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 60px)',
            height: 'clamp(40px, 6vw, 60px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(45, 80, 22, 0.35)',
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.5s ease',
            zIndex: 10,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}
          aria-label="Next slide"
        >
          <span {...elementProps(config.id, 'nextIcon', 'icon', 'Chevron Right')}><ChevronRight style={{ width: '24px', height: '24px', color: '#FAFAF8' }} /></span>
        </div>

        {/* Bottom-right thumbnail dots */}
        <div
          {...elementProps(config.id, 'slideNav', 'container', 'Slide Nav')}
          className="absolute flex"
          style={{ bottom: '24px', right: 'clamp(16px, 4vw, 60px)', gap: '24px', zIndex: 10 }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              {...elementProps(config.id, `slides.${i}.thumbnail`, 'image')}
              role="button"
              onClick={() => {
                prevSlideRef.current = activeSlide
                setActiveSlide(i)
              }}
              className="overflow-hidden relative"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '4px',
                opacity: activeSlide === i ? 1 : 0.5,
                border: activeSlide === i ? '2px solid #FAFAF8' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease, border-color 0.3s ease',
                padding: 0,
              }}
              aria-label={`Slide ${i + 1}`}
            >
              {slide.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={slide.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
              )}
            </div>
          ))}
        </div>
      </section>
      </>
    )
  }

  // ─── VARIANT: nacre ───
  // Nail salon premium : fullscreen diagonal-wipe slider, glassmorphism booking bar, centered title
  if (variant === 'nacre') {
    const defaultHeroImages = [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1920&q=80',
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1920&q=80',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=1920&q=80',
    ]

    const rawHeroImages = (content as Record<string, unknown>).heroImages as (string | { id?: string; src?: string; alt?: string })[] | undefined
    const heroImages = rawHeroImages?.map(img => typeof img === 'string' ? img : img?.src).filter(Boolean) as string[] | undefined

    const slides = [
      { name: 'French Elegance', location: 'Nail Art', bg: 'linear-gradient(135deg, #2A1A1E 0%, #3D2630 50%, #1E1215 100%)', image: heroImages?.[0] ?? defaultHeroImages[0] },
      { name: 'Baby Boomer', location: 'Tendance', bg: 'linear-gradient(135deg, #1E1215 0%, #2A1A1E 50%, #3D2630 100%)', image: heroImages?.[1] ?? defaultHeroImages[1] },
      { name: 'Gel Artistique', location: 'Creation', bg: 'linear-gradient(135deg, #3D2630 0%, #1E1215 50%, #2A1A1E 100%)', image: heroImages?.[2] ?? defaultHeroImages[2] },
    ]

    /* eslint-disable react-hooks/rules-of-hooks */
    const [nacreActiveSlide, setNacreActiveSlide] = useState(0)
    const nacrePrevSlideRef = useRef(0)
    const nacreTitleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })

    const nacreGoNext = useCallback(() => {
      setNacreActiveSlide((prev) => {
        nacrePrevSlideRef.current = prev
        return (prev + 1) % slides.length
      })
    }, [])

    const nacreGoPrev = useCallback(() => {
      setNacreActiveSlide((prev) => {
        nacrePrevSlideRef.current = prev
        return (prev - 1 + slides.length) % slides.length
      })
    }, [])

    useEffect(() => {
      const interval = setInterval(nacreGoNext, 5000)
      return () => clearInterval(interval)
    }, [nacreGoNext])

    // Booking bar state
    const bookingOptions: Record<string, string[]> = {
      Prestation: ['Pose gel', 'French manucure', 'Baby boomer', 'Nail art', 'Manucure classique', 'Pose faux ongles'],
      Date: ['Aujourd\'hui', 'Demain', 'Cette semaine', 'Semaine prochaine', 'Choisir une date'],
      Heure: ['9h00', '10h00', '11h00', '14h00', '15h00', '16h00', '17h00'],
    }
    const [nacreOpenFilter, setNacreOpenFilter] = useState<string | null>(null)
    const [nacreSelectedFilters, setNacreSelectedFilters] = useState<Record<string, string | null>>({
      Prestation: null,
      Date: null,
      Heure: null,
    })
    const nacreFiltersRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!nacreOpenFilter) return
      const handleClickOutside = (e: MouseEvent) => {
        if (nacreFiltersRef.current && !nacreFiltersRef.current.contains(e.target as Node)) {
          setNacreOpenFilter(null)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [nacreOpenFilter])
    /* eslint-enable react-hooks/rules-of-hooks */

    const currentSlide = slides[nacreActiveSlide]
    const bookingBtnLabel = content.primaryButton?.label || 'Reserver'

    // Chevron SVG for dropdowns
    const NacreChevronDown = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6L8 10L12 6" stroke="#F0E0DA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )

    return (
      <>
      {/* Nacre hero responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .nacre-resp-bookingbar { padding: 6px !important; max-width: 100% !important; }
          .nacre-resp-filters { display: none !important; }
        }
        @media (max-width: 480px) {
          .nacre-resp-bookingbar { margin: 0 16px; }
        }
      ` }} />
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Hero Section')}
        className="relative overflow-hidden"
        style={{
          height: '100vh',
          backgroundColor: '#2A1A1E',
          color: '#F0E0DA',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        {/* Diagonal wipe — parallelogram translates uniformly so the oblique angle
            NEVER changes during the sweep (no "book opening" distortion).
            All 4 polygon points shift by exactly 120% horizontally.
            Left edge skew = 20% (top is 20% further right than bottom). */}
        {slides.map((slide, i) => {
          const isActive = nacreActiveSlide === i
          const isPrev = nacrePrevSlideRef.current === i && !isActive

          const visible = 'polygon(0% 0%, 130% 0%, 130% 100%, -20% 100%)'
          const hidden  = 'polygon(120% 0%, 250% 0%, 250% 100%, 100% 100%)'
          const full    = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                clipPath: isActive ? visible : isPrev ? full : hidden,
                opacity: isActive || isPrev ? 1 : 0,
                transition: isActive
                  ? 'clip-path 1.4s cubic-bezier(0.76, 0, 0.24, 1), opacity 0s'
                  : isPrev
                    ? 'none'
                    : 'clip-path 0s 1.5s, opacity 0s 1.5s',
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              }}
            >
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: slide.bg,
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              )}
            </div>
          )
        })}

        {/* Dark overlay with rose tint */}
        <div {...elementProps(config.id, 'overlay', 'container', 'Overlay')} className="absolute inset-0" style={{ backgroundColor: 'rgba(42, 26, 30, 0.4)' }} />

        {/* Center content */}
        <div {...elementProps(config.id, 'centerContent', 'container', 'Hero Content')} className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          {/* H1 title */}
          <div ref={nacreTitleRevealRef}>
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              style={{
                color: '#F0E0DA',
                fontWeight: 500,
                fontSize: 'clamp(2.875rem, 1.6429rem + 5.4762vw, 5.75rem)',
                lineHeight: '110%',
                maxWidth: '928px',
                textAlign: 'center',
                textTransform: 'capitalize',
                marginBottom: '40px',
                marginTop: 0,
              }}
            >
              {title}
            </h1>
          </div>

          {/* Glassmorphism booking pill — 3 selectors LEFT, Reserver button RIGHT */}
          <div
            {...elementProps(config.id, 'bookingBar', 'container', 'Booking Bar')}
            className={cn('flex items-center', 'nacre-resp-bookingbar')}
            style={{
              borderRadius: '999px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(197, 169, 110, 0.3)',
              padding: '6px 6px 6px 24px',
              gap: '0',
              maxWidth: '720px',
              width: '100%',
            }}
          >
            {/* Left: 3 booking dropdowns */}
            <div ref={nacreFiltersRef} {...elementProps(config.id, 'filtersRow', 'container', 'Booking Filters')} className="flex items-center nacre-resp-filters" style={{ flexShrink: 0 }}>
              {['Prestation', 'Date', 'Heure'].map((label, i) => (
                <div
                  key={label}
                  style={{
                    position: 'relative',
                    paddingRight: i < 2 ? '14px' : '0',
                    marginRight: i < 2 ? '14px' : '0',
                    borderRight: i < 2 ? '1px solid rgba(240, 224, 218, 0.25)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span
                    {...elementProps(config.id, `filters.${i}.label`, 'text')}
                    onClick={() => setNacreOpenFilter(nacreOpenFilter === label ? null : label)}
                    style={{
                      color: nacreSelectedFilters[label] ? '#C9A96E' : '#F0E0DA',
                      fontSize: '14px',
                      gap: '6px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      userSelect: 'none',
                      fontFamily: "'Inter Variable', Inter, sans-serif",
                    }}
                  >
                    {nacreSelectedFilters[label] ?? label}
                    <span {...elementProps(config.id, `filters.${i}.caret`, 'icon', `${label} Caret`)} style={{ display: 'flex', alignItems: 'center', transition: 'transform 0.2s ease', transform: nacreOpenFilter === label ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <NacreChevronDown />
                    </span>
                  </span>
                  {nacreOpenFilter === label && (
                    <div
                      {...elementProps(config.id, `filters.${i}.dropdown`, 'container', `${label} Dropdown`)}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        marginTop: '12px',
                        minWidth: '180px',
                        zIndex: 100,
                        backgroundColor: 'rgba(197, 169, 110, 0.3)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(240, 224, 218, 0.15)',
                        borderRadius: '8px',
                        padding: '6px',
                        fontFamily: "'Inter Variable', Inter, sans-serif",
                      }}
                    >
                      {bookingOptions[label].map((option) => (
                        <div
                          key={option}
                          {...elementProps(config.id, `filters.${i}.option.${option}`, 'text', option)}
                          onClick={() => {
                            setNacreSelectedFilters((prev) => ({ ...prev, [label]: prev[label] === option ? null : option }))
                            setNacreOpenFilter(null)
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(240, 224, 218, 0.1)' }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                          style={{
                            padding: '8px 14px',
                            color: nacreSelectedFilters[label] === option ? '#C9A96E' : '#F0E0DA',
                            fontSize: '14px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            transition: 'background-color 0.15s ease',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: Reserver button */}
            <div style={{ flex: '1 1 auto', minWidth: '0', display: 'flex', justifyContent: 'flex-end', marginLeft: '16px' }}>
              <div
                {...elementProps(config.id, 'primaryButton', 'button')}
                role="button"
                style={{
                  backgroundColor: '#C9A96E',
                  color: '#2A1A1E',
                  borderRadius: '999px',
                  paddingLeft: '28px',
                  paddingRight: '28px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.02em',
                  fontFamily: "'Inter Variable', Inter, sans-serif",
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#D4B88E' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#C9A96E' }}
              >
                {bookingBtnLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-left meta badge */}
        <div
          {...elementProps(config.id, 'slideMeta', 'container', 'Slide Info')}
          className="absolute z-10"
          style={{
            bottom: '24px',
            left: 'clamp(16px, 4vw, 60px)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(197, 169, 110, 0.3)',
            borderRadius: '4px',
            padding: '12px 20px',
          }}
        >
          <div className="flex items-center" style={{ gap: '16px' }}>
            <span
              {...elementProps(config.id, `slides.${nacreActiveSlide}.name`, 'text')}
              style={{ fontSize: 'clamp(14px, 1.5vw, 18px)', fontWeight: 500, color: '#F0E0DA' }}
            >
              {currentSlide.name}
            </span>
            <span {...elementProps(config.id, 'slideDivider', 'text', 'Divider')} style={{ color: 'rgba(240, 224, 218, 0.5)', fontSize: '14px' }}>
              &middot;
            </span>
            <span
              {...elementProps(config.id, `slides.${nacreActiveSlide}.location`, 'text')}
              className="flex items-center"
              style={{ color: 'rgba(240, 224, 218, 0.5)', fontSize: '14px', gap: '4px' }}
            >
              {currentSlide.location}
            </span>
          </div>
        </div>

        {/* Prev button */}
        <div
          {...elementProps(config.id, 'prevButton', 'button')}
          role="button"
          onClick={nacreGoPrev}
          className="absolute z-10 flex items-center justify-center"
          style={{
            left: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 60px)',
            height: 'clamp(40px, 6vw, 60px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(197, 169, 110, 0.3)',
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}
          aria-label="Previous slide"
        >
          <span {...elementProps(config.id, 'prevIcon', 'icon', 'Chevron Left')}><ChevronLeft style={{ width: '24px', height: '24px', color: '#F0E0DA' }} /></span>
        </div>

        {/* Next button */}
        <div
          {...elementProps(config.id, 'nextButton', 'button')}
          role="button"
          onClick={nacreGoNext}
          className="absolute z-10 flex items-center justify-center"
          style={{
            right: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 60px)',
            height: 'clamp(40px, 6vw, 60px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(197, 169, 110, 0.3)',
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}
          aria-label="Next slide"
        >
          <span {...elementProps(config.id, 'nextIcon', 'icon', 'Chevron Right')}><ChevronRight style={{ width: '24px', height: '24px', color: '#F0E0DA' }} /></span>
        </div>

        {/* Bottom-right thumbnail dots */}
        <div
          {...elementProps(config.id, 'slideNav', 'container', 'Slide Nav')}
          className="absolute z-10 flex"
          style={{ bottom: '24px', right: 'clamp(16px, 4vw, 60px)', gap: '24px' }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              {...elementProps(config.id, `slides.${i}.thumbnail`, 'image')}
              role="button"
              onClick={() => setNacreActiveSlide(i)}
              className="overflow-hidden relative"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '4px',
                opacity: nacreActiveSlide === i ? 1 : 0.5,
                border: nacreActiveSlide === i ? '2px solid #C9A96E' : '2px solid transparent',
                background: slide.image ? undefined : slide.bg,
                cursor: 'pointer',
                transition: 'opacity 0.3s ease, border-color 0.3s ease',
                padding: 0,
              }}
              aria-label={`Slide ${i + 1}`}
            >
              {slide.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={slide.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
              )}
            </div>
          ))}
        </div>
      </section>
      </>
    )
  }

  // ─── VARIANT: brixsa ───
  // Real estate luxe : fullscreen crossfade slider, glassmorphism search bar, nav arrows
  if (variant === 'brixsa') {
    const defaultHeroImages = [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80',
    ]

    const rawHeroImages = (content as Record<string, unknown>).heroImages as (string | { id?: string; src?: string; alt?: string })[] | undefined
    // Support both string[] and object[] formats for heroImages
    const heroImages = rawHeroImages?.map(img => typeof img === 'string' ? img : img?.src).filter(Boolean) as string[] | undefined

    const slides = [
      { name: 'Contemporary Home Design', location: 'Trendy Neighborhood', bg: 'linear-gradient(135deg, #2c1e14 0%, #3d2b1a 50%, #1a120b 100%)', image: heroImages?.[0] ?? defaultHeroImages[0] },
      { name: 'Rustic Farmhouse Charm', location: 'Rural Area', bg: 'linear-gradient(135deg, #1a120b 0%, #2c1e14 50%, #3d2b1a 100%)', image: heroImages?.[1] ?? defaultHeroImages[1] },
      { name: 'Urban Loft Space', location: 'Downtown District', bg: 'linear-gradient(135deg, #3d2b1a 0%, #1a120b 50%, #2c1e14 100%)', image: heroImages?.[2] ?? defaultHeroImages[2] },
    ]

    /* eslint-disable react-hooks/rules-of-hooks */
    const [activeSlide, setActiveSlide] = useState(0)
    const prevSlideRef = useRef(0)
    const heroTitleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })

    const goNext = useCallback(() => {
      setActiveSlide((prev) => {
        prevSlideRef.current = prev
        return (prev + 1) % slides.length
      })
    }, [])

    const goPrev = useCallback(() => {
      setActiveSlide((prev) => {
        prevSlideRef.current = prev
        return (prev - 1 + slides.length) % slides.length
      })
    }, [])

    useEffect(() => {
      const interval = setInterval(goNext, 5000)
      return () => clearInterval(interval)
    }, [goNext])

    const searchPlaceholder = subtitle || 'Search by location, type, or keyword...'
    const searchBtnLabel = content.primaryButton?.label || 'Search'
    const currentSlide = slides[activeSlide]

    // Chevron SVG for filter dropdowns
    const ChevronDown = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6L8 10L12 6" stroke="#e1e1e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )

    // Filter dropdowns state
    const filterOptions: Record<string, string[]> = {
      Location: ['Birmingham', 'San Francisco', 'Miami', 'Chicago', 'Los Angeles', 'New York City'],
      Category: ['Interior Design', 'Property Management', 'Market Trends', 'Renovations', 'Investments'],
      Type: ['Studio Apartment', 'Office', 'Apartment', 'Loft', 'House'],
    }
    const [openFilter, setOpenFilter] = useState<string | null>(null)
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string | null>>({
      Location: null,
      Category: null,
      Type: null,
    })
    const filtersContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!openFilter) return
      const handleClickOutside = (e: MouseEvent) => {
        if (filtersContainerRef.current && !filtersContainerRef.current.contains(e.target as Node)) {
          setOpenFilter(null)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [openFilter])
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <>
      {/* Brixsa hero responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .brixsa-resp-searchbar { padding: 6px !important; max-width: 100% !important; }
          .brixsa-resp-filters { display: none !important; }
        }
        @media (max-width: 480px) {
          .brixsa-resp-searchbar { margin: 0 16px; }
        }
      ` }} />
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Hero Section')}
        className="relative overflow-hidden"
        style={{
          height: '100vh',
          backgroundColor: '#140c08',
          color: '#ffffff',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        {/* Diagonal wipe — parallelogram translates uniformly so the oblique angle
            NEVER changes during the sweep (no "book opening" distortion).
            All 4 polygon points shift by exactly 120% horizontally.
            Left edge skew = 20% (top is 20% further right than bottom). */}
        {slides.map((slide, i) => {
          const isActive = activeSlide === i
          const isPrev = prevSlideRef.current === i && !isActive

          // Parallelogram shape — same shape, just translated horizontally:
          // Visible:  polygon(  0% 0%, 130% 0%, 130% 100%, -20% 100%)  ← covers viewport
          // Hidden:   polygon(120% 0%, 250% 0%, 250% 100%, 100% 100%)  ← parked off-screen right
          // Each point is shifted exactly +120% from visible → hidden.
          const visible = 'polygon(0% 0%, 130% 0%, 130% 100%, -20% 100%)'
          const hidden  = 'polygon(120% 0%, 250% 0%, 250% 100%, 100% 100%)'
          const full    = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                clipPath: isActive ? visible : isPrev ? full : hidden,
                opacity: isActive || isPrev ? 1 : 0,
                transition: isActive
                  ? 'clip-path 1.4s cubic-bezier(0.76, 0, 0.24, 1), opacity 0s'
                  : isPrev
                    ? 'none'
                    : 'clip-path 0s 1.5s, opacity 0s 1.5s',
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              }}
            >
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: slide.bg,
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              )}
            </div>
          )
        })}

        {/* Dark overlay */}
        <div {...elementProps(config.id, 'overlay', 'container', 'Overlay')} className="absolute inset-0" style={{ backgroundColor: 'rgba(20, 12, 8, 0.35)' }} />

        {/* Center content */}
        <div {...elementProps(config.id, 'centerContent', 'container', 'Hero Content')} className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          {/* H1 title */}
          <div ref={heroTitleRevealRef}>
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              style={{
                color: '#ffffff',
                fontWeight: 500,
                fontSize: 'clamp(2.875rem, 1.6429rem + 5.4762vw, 5.75rem)',
                lineHeight: '110%',
                maxWidth: '928px',
                textAlign: 'center',
                textTransform: 'capitalize',
                marginBottom: '40px',
                marginTop: 0,
              }}
            >
              {title}
            </h1>
          </div>

          {/* Glassmorphism search pill — Filters LEFT, Search RIGHT (matches real Brixsa) */}
          <div
            {...elementProps(config.id, 'searchBar', 'container', 'Search Bar')}
            className={cn('flex items-center', 'brixsa-resp-searchbar')}
            style={{
              borderRadius: '999px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(128, 117, 117, 0.5)',
              padding: '6px 6px 6px 24px',
              gap: '0',
              maxWidth: '720px',
              width: '100%',
            }}
          >
            {/* Left: 3 filter dropdowns */}
            <div ref={filtersContainerRef} {...elementProps(config.id, 'filtersRow', 'container', 'Filters')} className="flex items-center brixsa-resp-filters" style={{ flexShrink: 0 }}>
              {['Location', 'Category', 'Type'].map((label, i) => (
                <div
                  key={label}
                  style={{
                    position: 'relative',
                    paddingRight: i < 2 ? '14px' : '0',
                    marginRight: i < 2 ? '14px' : '0',
                    borderRight: i < 2 ? '1px solid rgba(209, 203, 199, 0.35)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span
                    {...elementProps(config.id, `filters.${i}.label`, 'text')}
                    onClick={() => setOpenFilter(openFilter === label ? null : label)}
                    style={{
                      color: selectedFilters[label] ? '#c8a97e' : '#e1e1e1',
                      fontSize: '14px',
                      gap: '6px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      userSelect: 'none',
                    }}
                  >
                    {selectedFilters[label] ?? label}
                    <span {...elementProps(config.id, `filters.${i}.caret`, 'icon', `${label} Caret`)} style={{ display: 'flex', alignItems: 'center', transition: 'transform 0.2s ease', transform: openFilter === label ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <ChevronDown />
                    </span>
                  </span>
                  {openFilter === label && (
                    <div
                      {...elementProps(config.id, `filters.${i}.dropdown`, 'container', `${label} Dropdown`)}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        marginTop: '12px',
                        minWidth: '180px',
                        zIndex: 100,
                        backgroundColor: 'rgba(128, 117, 117, 0.5)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '8px',
                        padding: '6px',
                        fontFamily: "'Inter Variable', Inter, sans-serif",
                      }}
                    >
                      {filterOptions[label].map((option) => (
                        <div
                          key={option}
                          {...elementProps(config.id, `filters.${i}.option.${option}`, 'text', option)}
                          onClick={() => {
                            setSelectedFilters((prev) => ({ ...prev, [label]: prev[label] === option ? null : option }))
                            setOpenFilter(null)
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)' }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                          style={{
                            padding: '8px 14px',
                            color: selectedFilters[label] === option ? '#c8a97e' : '#e1e1e1',
                            fontSize: '14px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            transition: 'background-color 0.15s ease',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: search input area */}
            <div className="relative" style={{ flex: '1 1 auto', minWidth: '0', marginLeft: '16px' }}>
              <input
                {...elementProps(config.id, 'subtitle', 'text')}
                type="text"
                placeholder={searchPlaceholder}
                readOnly
                className="w-full bg-transparent text-white outline-none"
                style={{
                  borderRadius: '999px',
                  border: '1px solid rgba(209, 203, 199, 0.5)',
                  color: '#ffffff',
                  fontSize: '14px',
                  padding: '10px 90px 10px 38px',
                }}
              />
              <span {...elementProps(config.id, 'searchIcon', 'icon', 'Search Icon')} className="absolute top-1/2 -translate-y-1/2" style={{ left: '14px' }}>
                <Search style={{ width: '16px', height: '16px', color: '#e1e1e1' }} />
              </span>
              <div
                {...elementProps(config.id, 'primaryButton', 'button')}
                role="button"
                className="absolute right-0 top-0 bottom-0 text-white"
                style={{
                  backgroundColor: '#140c08',
                  borderRadius: '99px',
                  paddingLeft: '18px',
                  paddingRight: '18px',
                  fontSize: '13px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                {searchBtnLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-left meta badge */}
        <div
          {...elementProps(config.id, 'slideMeta', 'container', 'Slide Info')}
          className="absolute z-10"
          style={{
            bottom: '24px',
            left: 'clamp(16px, 4vw, 60px)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(128, 117, 117, 0.5)',
            borderRadius: '4px',
            padding: '12px 20px',
          }}
        >
          <div className="flex items-center" style={{ gap: '16px' }}>
            <span
              {...elementProps(config.id, `slides.${activeSlide}.name`, 'text')}
              style={{ fontSize: 'clamp(14px, 1.5vw, 18px)', fontWeight: 500, color: '#ffffff' }}
            >
              {currentSlide.name}
            </span>
            <span {...elementProps(config.id, 'slideDivider', 'text', 'Divider')} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              &middot;
            </span>
            <span
              {...elementProps(config.id, `slides.${activeSlide}.location`, 'text')}
              className="flex items-center"
              style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', gap: '4px' }}
            >
              <span {...elementProps(config.id, 'locationIcon', 'icon', 'Map Pin')}><MapPin style={{ width: '14px', height: '14px' }} /></span>
              {currentSlide.location}
            </span>
          </div>
        </div>

        {/* Prev button */}
        <div
          {...elementProps(config.id, 'prevButton', 'button')}
          role="button"
          onClick={goPrev}
          className="absolute z-10 flex items-center justify-center"
          style={{
            left: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 60px)',
            height: 'clamp(40px, 6vw, 60px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(128, 117, 117, 0.5)',
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}
          aria-label="Previous slide"
        >
          <span {...elementProps(config.id, 'prevIcon', 'icon', 'Chevron Left')}><ChevronLeft style={{ width: '24px', height: '24px', color: '#ffffff' }} /></span>
        </div>

        {/* Next button */}
        <div
          {...elementProps(config.id, 'nextButton', 'button')}
          role="button"
          onClick={goNext}
          className="absolute z-10 flex items-center justify-center"
          style={{
            right: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 60px)',
            height: 'clamp(40px, 6vw, 60px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(128, 117, 117, 0.5)',
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}
          aria-label="Next slide"
        >
          <span {...elementProps(config.id, 'nextIcon', 'icon', 'Chevron Right')}><ChevronRight style={{ width: '24px', height: '24px', color: '#ffffff' }} /></span>
        </div>

        {/* Bottom-right thumbnail dots */}
        <div
          {...elementProps(config.id, 'slideNav', 'container', 'Slide Nav')}
          className="absolute z-10 flex"
          style={{ bottom: '24px', right: 'clamp(16px, 4vw, 60px)', gap: '24px' }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              {...elementProps(config.id, `slides.${i}.thumbnail`, 'image')}
              role="button"
              onClick={() => setActiveSlide(i)}
              className="overflow-hidden relative"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '4px',
                opacity: activeSlide === i ? 1 : 0.5,
                border: activeSlide === i ? '2px solid #ffffff' : '2px solid transparent',
                background: slide.image ? undefined : slide.bg,
                cursor: 'pointer',
                transition: 'opacity 0.3s ease, border-color 0.3s ease',
                padding: 0,
              }}
              aria-label={`Slide ${i + 1}`}
            >
              {slide.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={slide.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
              )}
            </div>
          ))}
        </div>
      </section>
      </>
    )
  }

  // ─── VARIANT: zmr-agency ───
  // Agence de mannequins : fullscreen video/image background + integrated header (logo, burger, icons, overlays)
  // Header is inside hero to avoid position:fixed issues inside SortableSectionWrapper transform context
  if (variant === 'zmr-agency') {
    return <ZmrAgencyHero config={config} content={content} bgImage={bgImage} customTextColor={customTextColor} />
  }

  // ─── VARIANT: zmr-talent-profile ───
  // Page détail mannequin : hero fullscreen, nom en bold 900, nav links en bas
  if (variant === 'zmr-talent-profile') {
    // Nav links from subtitle (pipe-separated: "PORTFOLIO|SHOWS|INSTAGRAM|EXPERIENCE")
    const navLabels = (content.subtitle ?? 'PORTFOLIO|SHOWS|INSTAGRAM|EXPERIENCE').split('|').map(s => s.trim()).filter(Boolean)
    return (
      <section
        className="relative w-full overflow-hidden"
        style={{ fontFamily: 'var(--font-body, inherit)', height: '100vh', background: '#000' }}
      >
        {/* Background Video or Image */}
        {content.videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={content.videoUrl} type="video/mp4" />
          </video>
        ) : bgImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
        )}

        {/* Back Arrow */}
        <a
          href="/"
          style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            zIndex: 10,
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'opacity 0.3s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.5')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
        >
          ←
        </a>

        {/* Bottom content: Name + Nav Links */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(30px, 5vh, 60px)',
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <h1
            {...elementProps(config.id, 'title', 'heading')}
            style={{
              color: customTextColor ?? '#ffffff',
              fontSize: 'clamp(24px, 4vw, 60px)',
              fontWeight: 900,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: 0,
              marginBottom: 'clamp(15px, 2.5vh, 30px)',
              textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            {title}
          </h1>
          {/* Navigation Links */}
          <div
            style={{
              display: 'flex',
              gap: 'clamp(15px, 2.5vw, 30px)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {navLabels.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                style={{
                  color: 'white',
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderBottom: '1px solid transparent',
                  paddingBottom: '4px',
                  transition: 'border-color 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.borderBottomColor = 'white')}
                onMouseOut={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ─── VARIANT: braise ───
  // Restaurant gastronomique premium : fullscreen diagonal-wipe slider, glassmorphism reservation bar, scroll reveal
  if (variant === 'braise') {
    const defaultHeroImages = [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=85',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=85',
    ]

    const rawHeroImages = (content as Record<string, unknown>).heroImages as (string | { id?: string; src?: string; alt?: string })[] | undefined
    const heroImages = rawHeroImages?.map(img => typeof img === 'string' ? img : img?.src).filter(Boolean) as string[] | undefined

    const slides = [
      { name: 'Fine Dining', location: 'Paris 8e', bg: 'linear-gradient(135deg, #1A1209 0%, #2A1D10 50%, #0F0B06 100%)', image: heroImages?.[0] ?? defaultHeroImages[0] },
      { name: 'Cuisine d\'Exception', location: 'Saison', bg: 'linear-gradient(135deg, #0F0B06 0%, #1A1209 50%, #2A1D10 100%)', image: heroImages?.[1] ?? defaultHeroImages[1] },
      { name: 'Ambiance Intime', location: 'Interieur', bg: 'linear-gradient(135deg, #2A1D10 0%, #0F0B06 50%, #1A1209 100%)', image: heroImages?.[2] ?? defaultHeroImages[2] },
    ]

    /* eslint-disable react-hooks/rules-of-hooks */
    const [braiseActiveSlide, setBraiseActiveSlide] = useState(0)
    const braisePrevSlideRef = useRef(0)
    const braiseTitleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const braiseProgressRef = useRef<HTMLDivElement>(null)

    const braiseGoNext = useCallback(() => {
      setBraiseActiveSlide((prev) => {
        braisePrevSlideRef.current = prev
        return (prev + 1) % slides.length
      })
    }, [])

    const braiseGoPrev = useCallback(() => {
      setBraiseActiveSlide((prev) => {
        braisePrevSlideRef.current = prev
        return (prev - 1 + slides.length) % slides.length
      })
    }, [])

    useEffect(() => {
      const interval = setInterval(braiseGoNext, 5000)
      return () => clearInterval(interval)
    }, [braiseGoNext])

    // Reset progress bar animation on slide change
    useEffect(() => {
      if (braiseProgressRef.current) {
        braiseProgressRef.current.style.transition = 'none'
        braiseProgressRef.current.style.width = '0%'
        // Force reflow
        void braiseProgressRef.current.offsetWidth
        braiseProgressRef.current.style.transition = 'width 5s linear'
        braiseProgressRef.current.style.width = '100%'
      }
    }, [braiseActiveSlide])
    /* eslint-enable react-hooks/rules-of-hooks */

    const braiseCurrentSlide = slides[braiseActiveSlide]
    const braiseReserveBtnLabel = content.primaryButton?.label || 'Réserver'

    return (
      <>
      {/* Braise hero responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .braise-resp-bookingbar { flex-direction: column !important; padding: 16px !important; border-radius: 16px !important; max-width: 90% !important; }
          .braise-resp-filters { flex-direction: column !important; gap: 12px !important; width: 100% !important; }
          .braise-resp-filter-divider { display: none !important; }
          .braise-resp-reserve-btn { width: 100% !important; margin-left: 0 !important; margin-top: 8px !important; justify-content: center !important; }
          .braise-resp-hero-title { font-size: clamp(2rem, 8vw, 3.5rem) !important; }
          .braise-resp-hero-subtitle { font-size: 12px !important; }
          .braise-resp-nav-arrows { display: none !important; }
        }
        @media (max-width: 480px) {
          .braise-resp-bookingbar { margin: 0 16px; max-width: calc(100% - 32px) !important; }
        }
      ` }} />
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Hero Section')}
        className="relative overflow-hidden"
        style={{
          height: '100vh',
          backgroundColor: '#1A1209',
          color: '#E8E4DF',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        {/* Diagonal wipe — parallelogram translates uniformly */}
        {slides.map((slide, i) => {
          const isActive = braiseActiveSlide === i
          const isPrev = braisePrevSlideRef.current === i && !isActive

          const visible = 'polygon(0% 0%, 130% 0%, 130% 100%, -20% 100%)'
          const hidden  = 'polygon(120% 0%, 250% 0%, 250% 100%, 100% 100%)'
          const full    = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                clipPath: isActive ? visible : isPrev ? full : hidden,
                opacity: isActive || isPrev ? 1 : 0,
                transition: isActive
                  ? 'clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1), opacity 0s'
                  : isPrev
                    ? 'none'
                    : 'clip-path 0s 1.3s, opacity 0s 1.3s',
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              }}
            >
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: slide.bg,
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              )}
            </div>
          )
        })}

        {/* Dark overlay with warm tint */}
        <div {...elementProps(config.id, 'overlay', 'container', 'Overlay')} className="absolute inset-0" style={{ backgroundColor: 'rgba(26, 18, 9, 0.45)', zIndex: 3 }} />

        {/* Content — bottom-left title + subtitle */}
        <div {...elementProps(config.id, 'centerContent', 'container', 'Hero Content')} className="relative flex flex-col justify-end h-full px-6" style={{ zIndex: 10, paddingBottom: '140px', paddingLeft: 'clamp(20px, 5vw, 80px)' }}>
          <div ref={braiseTitleRevealRef}>
            {/* Subtitle above title */}
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              className="braise-resp-hero-subtitle"
              style={{
                color: '#C8A96E',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '16px',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
              }}
            >
              {subtitle || 'RESTAURANT GASTRONOMIQUE — PARIS'}
            </p>
            {/* H1 title */}
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              className="braise-resp-hero-title"
              style={{
                color: '#F5F0E8',
                fontWeight: 500,
                fontSize: 'clamp(2.875rem, 1.6429rem + 5.4762vw, 5.75rem)',
                lineHeight: '105%',
                maxWidth: '800px',
                textAlign: 'left',
                marginBottom: '0',
                marginTop: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {title || "L'Art de la Gastronomie"}
            </h1>
          </div>
        </div>

        {/* Glassmorphism reservation bar at bottom */}
        <div
          {...elementProps(config.id, 'bookingBar', 'container', 'Reservation Bar')}
          className="absolute z-10 flex items-center braise-resp-bookingbar"
          style={{
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '999px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(26, 18, 9, 0.4)',
            padding: '6px 6px 6px 28px',
            gap: '0',
            maxWidth: '600px',
            width: '90%',
            border: '1px solid rgba(200, 169, 110, 0.15)',
          }}
        >
          {/* Reservation fields */}
          <div {...elementProps(config.id, 'filtersRow', 'container', 'Reservation Fields')} className="flex items-center braise-resp-filters" style={{ flexShrink: 0 }}>
            {['Date', 'Heure', 'Convives'].map((label, i) => (
              <div
                key={label}
                style={{
                  position: 'relative',
                  paddingRight: i < 2 ? '14px' : '0',
                  marginRight: i < 2 ? '14px' : '0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {i < 2 && (
                  <span className="braise-resp-filter-divider" style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1px',
                    height: '20px',
                    backgroundColor: 'rgba(232, 228, 223, 0.2)',
                  }} />
                )}
                <span
                  {...elementProps(config.id, `filters.${i}.label`, 'text')}
                  style={{
                    color: 'rgba(232, 228, 223, 0.7)',
                    fontSize: '14px',
                    cursor: 'default',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: 'none',
                    fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                    gap: '6px',
                  }}
                >
                  {label === 'Date' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  )}
                  {label === 'Heure' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  )}
                  {label === 'Convives' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                  )}
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Reserve button */}
          <div className="braise-resp-reserve-btn" style={{ flex: '1 1 auto', minWidth: '0', display: 'flex', justifyContent: 'flex-end', marginLeft: '16px' }}>
            <div
              {...elementProps(config.id, 'primaryButton', 'button')}
              role="button"
              style={{
                backgroundColor: '#C8A96E',
                color: '#1A1209',
                borderRadius: '999px',
                paddingLeft: '28px',
                paddingRight: '28px',
                paddingTop: '12px',
                paddingBottom: '12px',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#D4BC86' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#C8A96E' }}
            >
              {braiseReserveBtnLabel}
            </div>
          </div>
        </div>

        {/* Prev button */}
        <div
          {...elementProps(config.id, 'prevButton', 'button')}
          role="button"
          onClick={braiseGoPrev}
          className="absolute z-10 flex items-center justify-center braise-resp-nav-arrows"
          style={{
            left: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(114, 47, 55, 0.25)',
            border: '1px solid rgba(114, 47, 55, 0.15)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(114, 47, 55, 0.4)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(114, 47, 55, 0.25)' }}
          aria-label="Previous slide"
        >
          <span {...elementProps(config.id, 'prevIcon', 'icon', 'Chevron Left')}><ChevronLeft style={{ width: '24px', height: '24px', color: '#E8E4DF' }} /></span>
        </div>

        {/* Next button */}
        <div
          {...elementProps(config.id, 'nextButton', 'button')}
          role="button"
          onClick={braiseGoNext}
          className="absolute z-10 flex items-center justify-center braise-resp-nav-arrows"
          style={{
            right: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(114, 47, 55, 0.25)',
            border: '1px solid rgba(114, 47, 55, 0.15)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(114, 47, 55, 0.4)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(114, 47, 55, 0.25)' }}
          aria-label="Next slide"
        >
          <span {...elementProps(config.id, 'nextIcon', 'icon', 'Chevron Right')}><ChevronRight style={{ width: '24px', height: '24px', color: '#E8E4DF' }} /></span>
        </div>

        {/* Bottom-left meta badge */}
        <div
          {...elementProps(config.id, 'slideMeta', 'container', 'Slide Info')}
          className="absolute z-10"
          style={{
            bottom: '100px',
            left: 'clamp(16px, 4vw, 80px)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(114, 47, 55, 0.2)',
            borderRadius: '4px',
            padding: '10px 18px',
            border: '1px solid rgba(114, 47, 55, 0.15)',
          }}
        >
          <div className="flex items-center" style={{ gap: '12px' }}>
            <span
              {...elementProps(config.id, `slides.${braiseActiveSlide}.name`, 'text')}
              style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', fontWeight: 500, color: '#E8E4DF' }}
            >
              {braiseCurrentSlide.name}
            </span>
            <span {...elementProps(config.id, 'slideDivider', 'text', 'Divider')} style={{ color: 'rgba(232, 228, 223, 0.4)', fontSize: '14px' }}>
              &middot;
            </span>
            <span
              {...elementProps(config.id, `slides.${braiseActiveSlide}.location`, 'text')}
              className="flex items-center"
              style={{ color: '#C8A96E', fontSize: '13px', gap: '4px', fontWeight: 500 }}
            >
              {braiseCurrentSlide.location}
            </span>
          </div>
        </div>

        {/* Progress bar at very bottom */}
        <div
          {...elementProps(config.id, 'progressBar', 'container', 'Progress Bar')}
          className="absolute z-10"
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            backgroundColor: 'rgba(200, 169, 110, 0.15)',
          }}
        >
          <div
            ref={braiseProgressRef}
            style={{
              height: '100%',
              backgroundColor: '#C8A96E',
              width: '0%',
              transition: 'width 5s linear',
            }}
          />
        </div>

        {/* Bottom-right slide dots */}
        <div
          {...elementProps(config.id, 'slideNav', 'container', 'Slide Nav')}
          className="absolute z-10 flex"
          style={{ bottom: '100px', right: 'clamp(16px, 4vw, 80px)', gap: '8px', alignItems: 'center' }}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              {...elementProps(config.id, `slides.${i}.dot`, 'button')}
              role="button"
              onClick={() => setBraiseActiveSlide(i)}
              style={{
                width: braiseActiveSlide === i ? '32px' : '8px',
                height: '8px',
                borderRadius: '999px',
                backgroundColor: braiseActiveSlide === i ? '#C8A96E' : 'rgba(232, 228, 223, 0.3)',
                cursor: 'pointer',
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
      </>
    )
  }

  // ─── VARIANT: forge ───
  // Coach sportif premium : fullscreen diagonal-wipe slider, glassmorphism booking bar, scroll reveal
  if (variant === 'forge') {
    const defaultHeroImages = [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=85',
      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1920&q=85',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=85',
    ]

    const rawHeroImages = (content as Record<string, unknown>).heroImages as (string | { id?: string; src?: string; alt?: string })[] | undefined
    const heroImages = rawHeroImages?.map(img => typeof img === 'string' ? img : img?.src).filter(Boolean) as string[] | undefined

    const slides = [
      { name: 'Salle Premium', location: 'Paris', bg: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)', image: heroImages?.[0] ?? defaultHeroImages[0] },
      { name: 'Entraînement Intensif', location: 'Coaching', bg: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0F0F0F 100%)', image: heroImages?.[1] ?? defaultHeroImages[1] },
      { name: 'Outdoor Training', location: 'Plein Air', bg: 'linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 50%, #1A1A1A 100%)', image: heroImages?.[2] ?? defaultHeroImages[2] },
    ]

    /* eslint-disable react-hooks/rules-of-hooks */
    const [forgeActiveSlide, setForgeActiveSlide] = useState(0)
    const forgePrevSlideRef = useRef(0)
    const forgeTitleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const forgeProgressRef = useRef<HTMLDivElement>(null)

    const forgeGoNext = useCallback(() => {
      setForgeActiveSlide((prev) => {
        forgePrevSlideRef.current = prev
        return (prev + 1) % slides.length
      })
    }, [])

    const forgeGoPrev = useCallback(() => {
      setForgeActiveSlide((prev) => {
        forgePrevSlideRef.current = prev
        return (prev - 1 + slides.length) % slides.length
      })
    }, [])

    useEffect(() => {
      const interval = setInterval(forgeGoNext, 5000)
      return () => clearInterval(interval)
    }, [forgeGoNext])

    // Reset progress bar animation on slide change
    useEffect(() => {
      if (forgeProgressRef.current) {
        forgeProgressRef.current.style.transition = 'none'
        forgeProgressRef.current.style.width = '0%'
        // Force reflow
        void forgeProgressRef.current.offsetWidth
        forgeProgressRef.current.style.transition = 'width 5s linear'
        forgeProgressRef.current.style.width = '100%'
      }
    }, [forgeActiveSlide])
    /* eslint-enable react-hooks/rules-of-hooks */

    const forgeCurrentSlide = slides[forgeActiveSlide]
    const forgeBtnLabel = content.primaryButton?.label || 'Essai gratuit'

    return (
      <>
      {/* Forge hero responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .forge-resp-bookingbar { flex-direction: column !important; padding: 16px !important; border-radius: 16px !important; max-width: 90% !important; }
          .forge-resp-filters { flex-direction: column !important; gap: 12px !important; width: 100% !important; }
          .forge-resp-filter-divider { display: none !important; }
          .forge-resp-reserve-btn { width: 100% !important; margin-left: 0 !important; margin-top: 8px !important; justify-content: center !important; }
          .forge-resp-hero-title { font-size: clamp(2rem, 8vw, 3.5rem) !important; }
          .forge-resp-hero-subtitle { font-size: 12px !important; }
          .forge-resp-nav-arrows { display: none !important; }
        }
        @media (max-width: 480px) {
          .forge-resp-bookingbar { margin: 0 16px; max-width: calc(100% - 32px) !important; }
        }
      ` }} />
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Hero Section')}
        className="relative overflow-hidden"
        style={{
          height: '100vh',
          backgroundColor: '#0A0A0A',
          color: '#E8E8E8',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        {/* Diagonal wipe — parallelogram translates uniformly */}
        {slides.map((slide, i) => {
          const isActive = forgeActiveSlide === i
          const isPrev = forgePrevSlideRef.current === i && !isActive

          const visible = 'polygon(0% 0%, 130% 0%, 130% 100%, -20% 100%)'
          const hidden  = 'polygon(120% 0%, 250% 0%, 250% 100%, 100% 100%)'
          const full    = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                clipPath: isActive ? visible : isPrev ? full : hidden,
                opacity: isActive || isPrev ? 1 : 0,
                transition: isActive
                  ? 'clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1), opacity 0s'
                  : isPrev
                    ? 'none'
                    : 'clip-path 0s 1.3s, opacity 0s 1.3s',
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              }}
            >
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: slide.bg,
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              )}
            </div>
          )
        })}

        {/* Dark overlay */}
        <div {...elementProps(config.id, 'overlay', 'container', 'Overlay')} className="absolute inset-0" style={{ backgroundColor: 'rgba(10, 10, 10, 0.45)', zIndex: 3 }} />

        {/* Content — bottom-left title + subtitle */}
        <div {...elementProps(config.id, 'centerContent', 'container', 'Hero Content')} className="relative flex flex-col justify-end h-full px-6" style={{ zIndex: 10, paddingBottom: '140px', paddingLeft: 'clamp(20px, 5vw, 80px)' }}>
          <div ref={forgeTitleRevealRef}>
            {/* Subtitle above title */}
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              className="forge-resp-hero-subtitle"
              style={{
                color: '#FF4D00',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '16px',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
              }}
            >
              {subtitle || 'COACH SPORTIF — PARIS'}
            </p>
            {/* H1 title */}
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              className="forge-resp-hero-title"
              style={{
                color: '#E8E8E8',
                fontWeight: 500,
                fontSize: 'clamp(2.875rem, 1.6429rem + 5.4762vw, 5.75rem)',
                lineHeight: '105%',
                maxWidth: '800px',
                textAlign: 'left',
                marginBottom: '0',
                marginTop: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {title || 'Forgez Votre Meilleure Version'}
            </h1>
          </div>
        </div>

        {/* Glassmorphism booking bar at bottom */}
        <div
          {...elementProps(config.id, 'bookingBar', 'container', 'Booking Bar')}
          className="absolute z-10 flex items-center forge-resp-bookingbar"
          style={{
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '999px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(10, 10, 10, 0.4)',
            padding: '6px 6px 6px 28px',
            gap: '0',
            maxWidth: '700px',
            width: '90%',
            border: '1px solid rgba(255, 77, 0, 0.15)',
          }}
        >
          {/* Booking fields */}
          <div {...elementProps(config.id, 'filtersRow', 'container', 'Booking Fields')} className="flex items-center forge-resp-filters" style={{ flexShrink: 0 }}>
            {['Objectif', 'Niveau', 'Créneau'].map((label, i) => {
              const options: Record<string, string[]> = {
                Objectif: ['Perte de poids', 'Prise de masse', 'Remise en forme'],
                Niveau: ['Débutant', 'Intermédiaire', 'Confirmé'],
                Créneau: ['Matin', 'Midi', 'Soir'],
              }
              return (
                <div
                  key={label}
                  style={{
                    position: 'relative',
                    paddingRight: i < 2 ? '14px' : '0',
                    marginRight: i < 2 ? '14px' : '0',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {i < 2 && (
                    <span className="forge-resp-filter-divider" style={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '1px',
                      height: '20px',
                      backgroundColor: 'rgba(232, 232, 232, 0.2)',
                    }} />
                  )}
                  <span
                    {...elementProps(config.id, `filters.${i}.label`, 'text')}
                    style={{
                      color: 'rgba(232, 232, 232, 0.7)',
                      fontSize: '14px',
                      cursor: 'default',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      userSelect: 'none',
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      gap: '6px',
                    }}
                  >
                    {label === 'Objectif' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                    )}
                    {label === 'Niveau' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h4V8H2zM9 20h4V4H9zM16 20h4v-8h-4z"/></svg>
                    )}
                    {label === 'Créneau' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    )}
                    {label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* CTA button */}
          <div className="forge-resp-reserve-btn" style={{ flex: '1 1 auto', minWidth: '0', display: 'flex', justifyContent: 'flex-end', marginLeft: '16px' }}>
            <div
              {...elementProps(config.id, 'primaryButton', 'button')}
              role="button"
              style={{
                backgroundColor: '#FF4D00',
                color: '#FFFFFF',
                borderRadius: '999px',
                paddingLeft: '28px',
                paddingRight: '28px',
                paddingTop: '12px',
                paddingBottom: '12px',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#FF6A2B' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#FF4D00' }}
            >
              {forgeBtnLabel}
            </div>
          </div>
        </div>

        {/* Prev button */}
        <div
          {...elementProps(config.id, 'prevButton', 'button')}
          role="button"
          onClick={forgeGoPrev}
          className="absolute z-10 flex items-center justify-center forge-resp-nav-arrows"
          style={{
            left: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 77, 0, 0.2)',
            border: '1px solid rgba(255, 77, 0, 0.15)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(255, 77, 0, 0.35)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(255, 77, 0, 0.2)' }}
          aria-label="Previous slide"
        >
          <span {...elementProps(config.id, 'prevIcon', 'icon', 'Chevron Left')}><ChevronLeft style={{ width: '24px', height: '24px', color: '#E8E8E8' }} /></span>
        </div>

        {/* Next button */}
        <div
          {...elementProps(config.id, 'nextButton', 'button')}
          role="button"
          onClick={forgeGoNext}
          className="absolute z-10 flex items-center justify-center forge-resp-nav-arrows"
          style={{
            right: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 77, 0, 0.2)',
            border: '1px solid rgba(255, 77, 0, 0.15)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(255, 77, 0, 0.35)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(255, 77, 0, 0.2)' }}
          aria-label="Next slide"
        >
          <span {...elementProps(config.id, 'nextIcon', 'icon', 'Chevron Right')}><ChevronRight style={{ width: '24px', height: '24px', color: '#E8E8E8' }} /></span>
        </div>

        {/* Bottom-left meta badge */}
        <div
          {...elementProps(config.id, 'slideMeta', 'container', 'Slide Info')}
          className="absolute z-10"
          style={{
            bottom: '100px',
            left: 'clamp(16px, 4vw, 80px)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 77, 0, 0.15)',
            borderRadius: '4px',
            padding: '10px 18px',
            border: '1px solid rgba(255, 77, 0, 0.15)',
          }}
        >
          <div className="flex items-center" style={{ gap: '12px' }}>
            <span
              {...elementProps(config.id, `slides.${forgeActiveSlide}.name`, 'text')}
              style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', fontWeight: 500, color: '#E8E8E8' }}
            >
              {forgeCurrentSlide.name}
            </span>
            <span {...elementProps(config.id, 'slideDivider', 'text', 'Divider')} style={{ color: 'rgba(232, 232, 232, 0.4)', fontSize: '14px' }}>
              &middot;
            </span>
            <span
              {...elementProps(config.id, `slides.${forgeActiveSlide}.location`, 'text')}
              className="flex items-center"
              style={{ color: '#FF4D00', fontSize: '13px', gap: '4px', fontWeight: 500 }}
            >
              {forgeCurrentSlide.location}
            </span>
          </div>
        </div>

        {/* Progress bar at very bottom */}
        <div
          {...elementProps(config.id, 'progressBar', 'container', 'Progress Bar')}
          className="absolute z-10"
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            backgroundColor: 'rgba(255, 77, 0, 0.15)',
          }}
        >
          <div
            ref={forgeProgressRef}
            style={{
              height: '100%',
              backgroundColor: '#FF4D00',
              width: '0%',
              transition: 'width 5s linear',
            }}
          />
        </div>

        {/* Bottom-right slide dots */}
        <div
          {...elementProps(config.id, 'slideNav', 'container', 'Slide Nav')}
          className="absolute z-10 flex"
          style={{ bottom: '100px', right: 'clamp(16px, 4vw, 80px)', gap: '8px', alignItems: 'center' }}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              {...elementProps(config.id, `slides.${i}.dot`, 'button')}
              role="button"
              onClick={() => setForgeActiveSlide(i)}
              style={{
                width: forgeActiveSlide === i ? '32px' : '8px',
                height: '8px',
                borderRadius: '999px',
                backgroundColor: forgeActiveSlide === i ? '#FF4D00' : 'rgba(232, 232, 232, 0.3)',
                cursor: 'pointer',
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
      </>
    )
  }

  // ─── VARIANT: ciseaux ───
  // Salon de coiffure premium : fullscreen diagonal-wipe slider, glassmorphism booking bar, scroll reveal
  if (variant === 'ciseaux') {
    const defaultHeroImages = [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=85',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1920&q=85',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=85',
    ]

    const rawHeroImages = (content as Record<string, unknown>).heroImages as (string | { id?: string; src?: string; alt?: string })[] | undefined
    const heroImages = rawHeroImages?.map(img => typeof img === 'string' ? img : img?.src).filter(Boolean) as string[] | undefined

    const slides = [
      { name: 'Salon Interior', location: 'Paris', bg: 'linear-gradient(135deg, #0B0B0B 0%, #1A1A1A 50%, #0B0B0B 100%)', image: heroImages?.[0] ?? defaultHeroImages[0] },
      { name: 'Coiffure Experte', location: 'Styling', bg: 'linear-gradient(135deg, #0B0B0B 0%, #1A1A1A 50%, #0F0F0F 100%)', image: heroImages?.[1] ?? defaultHeroImages[1] },
      { name: 'R\u00E9sultat Sublime', location: 'Beaut\u00E9', bg: 'linear-gradient(135deg, #1A1A1A 0%, #0B0B0B 50%, #1A1A1A 100%)', image: heroImages?.[2] ?? defaultHeroImages[2] },
    ]

    /* eslint-disable react-hooks/rules-of-hooks */
    const [ciseauxActiveSlide, setCiseauxActiveSlide] = useState(0)
    const ciseauxPrevSlideRef = useRef(0)
    const ciseauxTitleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const ciseauxProgressRef = useRef<HTMLDivElement>(null)

    const ciseauxGoNext = useCallback(() => {
      setCiseauxActiveSlide((prev) => {
        ciseauxPrevSlideRef.current = prev
        return (prev + 1) % slides.length
      })
    }, [])

    const ciseauxGoPrev = useCallback(() => {
      setCiseauxActiveSlide((prev) => {
        ciseauxPrevSlideRef.current = prev
        return (prev - 1 + slides.length) % slides.length
      })
    }, [])

    useEffect(() => {
      const interval = setInterval(ciseauxGoNext, 5000)
      return () => clearInterval(interval)
    }, [ciseauxGoNext])

    // Reset progress bar animation on slide change
    useEffect(() => {
      if (ciseauxProgressRef.current) {
        ciseauxProgressRef.current.style.transition = 'none'
        ciseauxProgressRef.current.style.width = '0%'
        // Force reflow
        void ciseauxProgressRef.current.offsetWidth
        ciseauxProgressRef.current.style.transition = 'width 5s linear'
        ciseauxProgressRef.current.style.width = '100%'
      }
    }, [ciseauxActiveSlide])
    /* eslint-enable react-hooks/rules-of-hooks */

    const ciseauxCurrentSlide = slides[ciseauxActiveSlide]
    const ciseauxBtnLabel = content.primaryButton?.label || 'R\u00E9server'

    return (
      <>
      {/* Ciseaux hero responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .ciseaux-resp-bookingbar { flex-direction: column !important; padding: 16px !important; border-radius: 16px !important; max-width: 90% !important; }
          .ciseaux-resp-filters { flex-direction: column !important; gap: 12px !important; width: 100% !important; }
          .ciseaux-resp-filter-divider { display: none !important; }
          .ciseaux-resp-reserve-btn { width: 100% !important; margin-left: 0 !important; margin-top: 8px !important; justify-content: center !important; }
          .ciseaux-resp-hero-title { font-size: clamp(2rem, 8vw, 3.5rem) !important; }
          .ciseaux-resp-hero-subtitle { font-size: 12px !important; }
          .ciseaux-resp-nav-arrows { display: none !important; }
        }
        @media (max-width: 480px) {
          .ciseaux-resp-bookingbar { margin: 0 16px; max-width: calc(100% - 32px) !important; }
        }
      ` }} />
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Hero Section')}
        className="relative overflow-hidden"
        style={{
          height: '100vh',
          backgroundColor: '#0B0B0B',
          color: '#FFFFFF',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        {/* Diagonal wipe — parallelogram translates uniformly */}
        {slides.map((slide, i) => {
          const isActive = ciseauxActiveSlide === i
          const isPrev = ciseauxPrevSlideRef.current === i && !isActive

          const visible = 'polygon(0% 0%, 130% 0%, 130% 100%, -20% 100%)'
          const hidden  = 'polygon(120% 0%, 250% 0%, 250% 100%, 100% 100%)'
          const full    = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                clipPath: isActive ? visible : isPrev ? full : hidden,
                opacity: isActive || isPrev ? 1 : 0,
                transition: isActive
                  ? 'clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1), opacity 0s'
                  : isPrev
                    ? 'none'
                    : 'clip-path 0s 1.3s, opacity 0s 1.3s',
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              }}
            >
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: slide.bg,
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              )}
            </div>
          )
        })}

        {/* Dark overlay */}
        <div {...elementProps(config.id, 'overlay', 'container', 'Overlay')} className="absolute inset-0" style={{ backgroundColor: 'rgba(11, 11, 11, 0.45)', zIndex: 3 }} />

        {/* Content — bottom-left title + subtitle */}
        <div {...elementProps(config.id, 'centerContent', 'container', 'Hero Content')} className="relative flex flex-col justify-end h-full px-6" style={{ zIndex: 10, paddingBottom: '140px', paddingLeft: 'clamp(20px, 5vw, 80px)' }}>
          <div ref={ciseauxTitleRevealRef}>
            {/* Subtitle above title */}
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              className="ciseaux-resp-hero-subtitle"
              style={{
                color: '#B76E79',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '16px',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
              }}
            >
              {subtitle || 'SALON DE COIFFURE \u2014 PARIS'}
            </p>
            {/* H1 title */}
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              className="ciseaux-resp-hero-title"
              style={{
                color: '#FFFFFF',
                fontWeight: 500,
                fontSize: 'clamp(2.875rem, 1.6429rem + 5.4762vw, 5.75rem)',
                lineHeight: '105%',
                maxWidth: '800px',
                textAlign: 'left',
                marginBottom: '0',
                marginTop: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {title || "L\u2019\u00C9l\u00E9gance au Naturel"}
            </h1>
          </div>
        </div>

        {/* Glassmorphism booking bar at bottom */}
        <div
          {...elementProps(config.id, 'bookingBar', 'container', 'Booking Bar')}
          className="absolute z-10 flex items-center ciseaux-resp-bookingbar"
          style={{
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '999px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(11, 11, 11, 0.4)',
            padding: '6px 6px 6px 28px',
            gap: '0',
            maxWidth: '700px',
            width: '90%',
            border: '1px solid rgba(183, 110, 121, 0.15)',
          }}
        >
          {/* Booking fields */}
          <div {...elementProps(config.id, 'filtersRow', 'container', 'Booking Fields')} className="flex items-center ciseaux-resp-filters" style={{ flexShrink: 0 }}>
            {['Prestation', 'Date', 'Coiffeur'].map((label, i) => (
              <div
                key={label}
                style={{
                  position: 'relative',
                  paddingRight: i < 2 ? '14px' : '0',
                  marginRight: i < 2 ? '14px' : '0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {i < 2 && (
                  <span className="ciseaux-resp-filter-divider" style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1px',
                    height: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }} />
                )}
                <span
                  {...elementProps(config.id, `filters.${i}.label`, 'text')}
                  style={{
                    color: 'rgba(181, 176, 168, 0.9)',
                    fontSize: '14px',
                    cursor: 'default',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: 'none',
                    fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                    gap: '6px',
                  }}
                >
                  {label === 'Prestation' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.121 14.121A3 3 0 1 0 9.879 9.879M6.343 6.343a8 8 0 0 0 11.314 11.314"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                  )}
                  {label === 'Date' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  )}
                  {label === 'Coiffeur' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  )}
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Reserve button */}
          <div className="ciseaux-resp-reserve-btn" style={{ flex: '1 1 auto', minWidth: '0', display: 'flex', justifyContent: 'flex-end', marginLeft: '16px' }}>
            <div
              {...elementProps(config.id, 'primaryButton', 'button')}
              role="button"
              style={{
                backgroundColor: '#B76E79',
                color: '#FFFFFF',
                borderRadius: '999px',
                paddingLeft: '28px',
                paddingRight: '28px',
                paddingTop: '12px',
                paddingBottom: '12px',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#C98490' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#B76E79' }}
            >
              {ciseauxBtnLabel}
            </div>
          </div>
        </div>

        {/* Prev button */}
        <div
          {...elementProps(config.id, 'prevButton', 'button')}
          role="button"
          onClick={ciseauxGoPrev}
          className="absolute z-10 flex items-center justify-center ciseaux-resp-nav-arrows"
          style={{
            left: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(183, 110, 121, 0.2)',
            border: '1px solid rgba(183, 110, 121, 0.15)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(183, 110, 121, 0.35)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(183, 110, 121, 0.2)' }}
          aria-label="Previous slide"
        >
          <span {...elementProps(config.id, 'prevIcon', 'icon', 'Chevron Left')}><ChevronLeft style={{ width: '24px', height: '24px', color: '#FFFFFF' }} /></span>
        </div>

        {/* Next button */}
        <div
          {...elementProps(config.id, 'nextButton', 'button')}
          role="button"
          onClick={ciseauxGoNext}
          className="absolute z-10 flex items-center justify-center ciseaux-resp-nav-arrows"
          style={{
            right: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(183, 110, 121, 0.2)',
            border: '1px solid rgba(183, 110, 121, 0.15)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(183, 110, 121, 0.35)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(183, 110, 121, 0.2)' }}
          aria-label="Next slide"
        >
          <span {...elementProps(config.id, 'nextIcon', 'icon', 'Chevron Right')}><ChevronRight style={{ width: '24px', height: '24px', color: '#FFFFFF' }} /></span>
        </div>

        {/* Bottom-left meta badge */}
        <div
          {...elementProps(config.id, 'slideMeta', 'container', 'Slide Info')}
          className="absolute z-10"
          style={{
            bottom: '100px',
            left: 'clamp(16px, 4vw, 80px)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(183, 110, 121, 0.15)',
            borderRadius: '4px',
            padding: '10px 18px',
            border: '1px solid rgba(183, 110, 121, 0.15)',
          }}
        >
          <div className="flex items-center" style={{ gap: '12px' }}>
            <span
              {...elementProps(config.id, `slides.${ciseauxActiveSlide}.name`, 'text')}
              style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', fontWeight: 500, color: '#FFFFFF' }}
            >
              {ciseauxCurrentSlide.name}
            </span>
            <span {...elementProps(config.id, 'slideDivider', 'text', 'Divider')} style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '14px' }}>
              &middot;
            </span>
            <span
              {...elementProps(config.id, `slides.${ciseauxActiveSlide}.location`, 'text')}
              className="flex items-center"
              style={{ color: '#B76E79', fontSize: '13px', gap: '4px', fontWeight: 500 }}
            >
              {ciseauxCurrentSlide.location}
            </span>
          </div>
        </div>

        {/* Progress bar at very bottom */}
        <div
          {...elementProps(config.id, 'progressBar', 'container', 'Progress Bar')}
          className="absolute z-10"
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            backgroundColor: 'rgba(183, 110, 121, 0.15)',
          }}
        >
          <div
            ref={ciseauxProgressRef}
            style={{
              height: '100%',
              backgroundColor: '#B76E79',
              width: '0%',
              transition: 'width 5s linear',
            }}
          />
        </div>

        {/* Bottom-right slide dots */}
        <div
          {...elementProps(config.id, 'slideNav', 'container', 'Slide Nav')}
          className="absolute z-10 flex"
          style={{ bottom: '100px', right: 'clamp(16px, 4vw, 80px)', gap: '8px', alignItems: 'center' }}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              {...elementProps(config.id, `slides.${i}.dot`, 'button')}
              role="button"
              onClick={() => setCiseauxActiveSlide(i)}
              style={{
                width: ciseauxActiveSlide === i ? '32px' : '8px',
                height: '8px',
                borderRadius: '999px',
                backgroundColor: ciseauxActiveSlide === i ? '#B76E79' : 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
      </>
    )
  }

  // ─── VARIANT: atelier ───
  // Architecte d'intérieur premium : fullscreen diagonal-wipe slider, glassmorphism consultation bar
  if (variant === 'atelier') {
    const defaultHeroImages = [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=85',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1920&q=85',
    ]

    const rawHeroImages = (content as Record<string, unknown>).heroImages as (string | { id?: string; src?: string; alt?: string })[] | undefined
    const heroImages = rawHeroImages?.map(img => typeof img === 'string' ? img : img?.src).filter(Boolean) as string[] | undefined

    const slides = [
      { name: 'Salon Contemporain', location: 'Résidentiel', bg: 'linear-gradient(135deg, #1A1A1A 0%, #2A2521 50%, #1A1A1A 100%)', image: heroImages?.[0] ?? defaultHeroImages[0] },
      { name: 'Design Sur Mesure', location: 'Luxe', bg: 'linear-gradient(135deg, #2A2521 0%, #1A1A1A 50%, #221E1A 100%)', image: heroImages?.[1] ?? defaultHeroImages[1] },
      { name: 'L\u2019Art de l\u2019Int\u00E9rieur', location: 'Atelier', bg: 'linear-gradient(135deg, #1A1A1A 0%, #221E1A 50%, #2A2521 100%)', image: heroImages?.[2] ?? defaultHeroImages[2] },
    ]

    /* eslint-disable react-hooks/rules-of-hooks */
    const [atelierActiveSlide, setAtelierActiveSlide] = useState(0)
    const atelierPrevSlideRef = useRef(0)
    const atelierTitleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const atelierProgressRef = useRef<HTMLDivElement>(null)

    const atelierGoNext = useCallback(() => {
      setAtelierActiveSlide((prev) => {
        atelierPrevSlideRef.current = prev
        return (prev + 1) % slides.length
      })
    }, [])

    const atelierGoPrev = useCallback(() => {
      setAtelierActiveSlide((prev) => {
        atelierPrevSlideRef.current = prev
        return (prev - 1 + slides.length) % slides.length
      })
    }, [])

    useEffect(() => {
      const interval = setInterval(atelierGoNext, 5000)
      return () => clearInterval(interval)
    }, [atelierGoNext])

    // Reset progress bar animation on slide change
    useEffect(() => {
      if (atelierProgressRef.current) {
        atelierProgressRef.current.style.transition = 'none'
        atelierProgressRef.current.style.width = '0%'
        // Force reflow
        void atelierProgressRef.current.offsetWidth
        atelierProgressRef.current.style.transition = 'width 5s linear'
        atelierProgressRef.current.style.width = '100%'
      }
    }, [atelierActiveSlide])
    /* eslint-enable react-hooks/rules-of-hooks */

    const atelierCurrentSlide = slides[atelierActiveSlide]
    const atelierBtnLabel = content.primaryButton?.label || 'Consultation gratuite'

    return (
      <>
      {/* Atelier hero responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .atelier-resp-bookingbar { flex-direction: column !important; padding: 16px !important; border-radius: 16px !important; max-width: 90% !important; }
          .atelier-resp-filters { flex-direction: column !important; gap: 12px !important; width: 100% !important; }
          .atelier-resp-filter-divider { display: none !important; }
          .atelier-resp-reserve-btn { width: 100% !important; margin-left: 0 !important; margin-top: 8px !important; justify-content: center !important; }
          .atelier-resp-hero-title { font-size: clamp(2rem, 8vw, 3.5rem) !important; }
          .atelier-resp-hero-subtitle { font-size: 12px !important; }
          .atelier-resp-nav-arrows { display: none !important; }
        }
        @media (max-width: 480px) {
          .atelier-resp-bookingbar { margin: 0 16px; max-width: calc(100% - 32px) !important; }
        }
      ` }} />
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Hero Section')}
        className="relative overflow-hidden"
        style={{
          height: '100vh',
          backgroundColor: '#1A1A1A',
          color: '#FFFFFF',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        {/* Diagonal wipe — parallelogram translates uniformly */}
        {slides.map((slide, i) => {
          const isActive = atelierActiveSlide === i
          const isPrev = atelierPrevSlideRef.current === i && !isActive

          const visible = 'polygon(0% 0%, 130% 0%, 130% 100%, -20% 100%)'
          const hidden  = 'polygon(120% 0%, 250% 0%, 250% 100%, 100% 100%)'
          const full    = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                clipPath: isActive ? visible : isPrev ? full : hidden,
                opacity: isActive || isPrev ? 1 : 0,
                transition: isActive
                  ? 'clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1), opacity 0s'
                  : isPrev
                    ? 'none'
                    : 'clip-path 0s 1.3s, opacity 0s 1.3s',
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              }}
            >
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: slide.bg,
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              )}
            </div>
          )
        })}

        {/* Dark overlay with subtle warm tint */}
        <div {...elementProps(config.id, 'overlay', 'container', 'Overlay')} className="absolute inset-0" style={{ backgroundColor: 'rgba(26, 26, 26, 0.42)', zIndex: 3 }} />

        {/* Content — bottom-left title + subtitle */}
        <div {...elementProps(config.id, 'centerContent', 'container', 'Hero Content')} className="relative flex flex-col justify-end h-full px-6" style={{ zIndex: 10, paddingBottom: '140px', paddingLeft: 'clamp(20px, 5vw, 80px)' }}>
          <div ref={atelierTitleRevealRef}>
            {/* Subtitle above title */}
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              className="atelier-resp-hero-subtitle"
              style={{
                color: '#C4B5A0',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '18px',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
              }}
            >
              {subtitle || 'ARCHITECTE D\u2019INT\u00C9RIEUR \u2014 PARIS'}
            </p>
            {/* H1 title with sand accent on key word */}
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              className="atelier-resp-hero-title"
              style={{
                color: '#FFFFFF',
                fontWeight: 400,
                fontSize: 'clamp(2.875rem, 1.6429rem + 5.4762vw, 5.75rem)',
                lineHeight: '105%',
                maxWidth: '820px',
                textAlign: 'left',
                marginBottom: '0',
                marginTop: 0,
                letterSpacing: '-0.025em',
              }}
            >
              {title ? (
                title
              ) : (
                <>
                  Cr\u00E9ons votre{' '}
                  <span style={{ color: '#C4B5A0', fontStyle: 'italic' }}>espace de vie</span>
                </>
              )}
            </h1>
          </div>
        </div>

        {/* Glassmorphism consultation bar at bottom */}
        <div
          {...elementProps(config.id, 'bookingBar', 'container', 'Consultation Bar')}
          className="absolute z-10 flex items-center atelier-resp-bookingbar"
          style={{
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '999px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(26, 26, 26, 0.45)',
            padding: '6px 6px 6px 28px',
            gap: '0',
            maxWidth: '720px',
            width: '90%',
            border: '1px solid rgba(196, 181, 160, 0.15)',
          }}
        >
          {/* Consultation fields */}
          <div {...elementProps(config.id, 'filtersRow', 'container', 'Consultation Fields')} className="flex items-center atelier-resp-filters" style={{ flexShrink: 0 }}>
            {['Nom', 'Email', 'Type de projet'].map((label, i) => (
              <div
                key={label}
                style={{
                  position: 'relative',
                  paddingRight: i < 2 ? '14px' : '0',
                  marginRight: i < 2 ? '14px' : '0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {i < 2 && (
                  <span className="atelier-resp-filter-divider" style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1px',
                    height: '20px',
                    backgroundColor: 'rgba(196, 181, 160, 0.2)',
                  }} />
                )}
                <span
                  {...elementProps(config.id, `filters.${i}.label`, 'text')}
                  style={{
                    color: 'rgba(196, 181, 160, 0.85)',
                    fontSize: '14px',
                    cursor: 'default',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: 'none',
                    fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                    gap: '6px',
                  }}
                >
                  {label === 'Nom' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  )}
                  {label === 'Email' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  )}
                  {label === 'Type de projet' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  )}
                  {label}
                  {label === 'Type de projet' && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px', opacity: 0.6 }}><polyline points="6 9 12 15 18 9"/></svg>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="atelier-resp-reserve-btn" style={{ flex: '1 1 auto', minWidth: '0', display: 'flex', justifyContent: 'flex-end', marginLeft: '16px' }}>
            <div
              {...elementProps(config.id, 'primaryButton', 'button')}
              role="button"
              style={{
                backgroundColor: '#8B7355',
                color: '#FFFFFF',
                borderRadius: '999px',
                paddingLeft: '28px',
                paddingRight: '28px',
                paddingTop: '12px',
                paddingBottom: '12px',
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#9E8569' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#8B7355' }}
            >
              {atelierBtnLabel}
            </div>
          </div>
        </div>

        {/* Prev button */}
        <div
          {...elementProps(config.id, 'prevButton', 'button')}
          role="button"
          onClick={atelierGoPrev}
          className="absolute z-10 flex items-center justify-center atelier-resp-nav-arrows"
          style={{
            left: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(139, 115, 85, 0.2)',
            border: '1px solid rgba(196, 181, 160, 0.15)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(139, 115, 85, 0.35)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(139, 115, 85, 0.2)' }}
          aria-label="Previous slide"
        >
          <span {...elementProps(config.id, 'prevIcon', 'icon', 'Chevron Left')}><ChevronLeft style={{ width: '24px', height: '24px', color: '#C4B5A0' }} /></span>
        </div>

        {/* Next button */}
        <div
          {...elementProps(config.id, 'nextButton', 'button')}
          role="button"
          onClick={atelierGoNext}
          className="absolute z-10 flex items-center justify-center atelier-resp-nav-arrows"
          style={{
            right: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(139, 115, 85, 0.2)',
            border: '1px solid rgba(196, 181, 160, 0.15)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(139, 115, 85, 0.35)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(139, 115, 85, 0.2)' }}
          aria-label="Next slide"
        >
          <span {...elementProps(config.id, 'nextIcon', 'icon', 'Chevron Right')}><ChevronRight style={{ width: '24px', height: '24px', color: '#C4B5A0' }} /></span>
        </div>

        {/* Bottom-left meta badge */}
        <div
          {...elementProps(config.id, 'slideMeta', 'container', 'Slide Info')}
          className="absolute z-10"
          style={{
            bottom: '100px',
            left: 'clamp(16px, 4vw, 80px)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(139, 115, 85, 0.15)',
            borderRadius: '4px',
            padding: '10px 18px',
            border: '1px solid rgba(196, 181, 160, 0.15)',
          }}
        >
          <div className="flex items-center" style={{ gap: '12px' }}>
            <span
              {...elementProps(config.id, `slides.${atelierActiveSlide}.name`, 'text')}
              style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', fontWeight: 400, color: '#FFFFFF', letterSpacing: '0.01em' }}
            >
              {atelierCurrentSlide.name}
            </span>
            <span {...elementProps(config.id, 'slideDivider', 'text', 'Divider')} style={{ color: 'rgba(196, 181, 160, 0.4)', fontSize: '14px' }}>
              &middot;
            </span>
            <span
              {...elementProps(config.id, `slides.${atelierActiveSlide}.location`, 'text')}
              className="flex items-center"
              style={{ color: '#C4B5A0', fontSize: '13px', gap: '4px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              {atelierCurrentSlide.location}
            </span>
          </div>
        </div>

        {/* Progress bar at very bottom */}
        <div
          {...elementProps(config.id, 'progressBar', 'container', 'Progress Bar')}
          className="absolute z-10"
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: 'rgba(196, 181, 160, 0.12)',
          }}
        >
          <div
            ref={atelierProgressRef}
            style={{
              height: '100%',
              backgroundColor: '#C4B5A0',
              width: '0%',
              transition: 'width 5s linear',
            }}
          />
        </div>

        {/* Bottom-right slide dots */}
        <div
          {...elementProps(config.id, 'slideNav', 'container', 'Slide Nav')}
          className="absolute z-10 flex"
          style={{ bottom: '100px', right: 'clamp(16px, 4vw, 80px)', gap: '8px', alignItems: 'center' }}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              {...elementProps(config.id, `slides.${i}.dot`, 'button')}
              role="button"
              onClick={() => setAtelierActiveSlide(i)}
              style={{
                width: atelierActiveSlide === i ? '28px' : '6px',
                height: '6px',
                borderRadius: '999px',
                backgroundColor: atelierActiveSlide === i ? '#C4B5A0' : 'rgba(255, 255, 255, 0.25)',
                cursor: 'pointer',
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
      </>
    )
  }

  // ─── VARIANT: encre ───
  // Tatoueur premium : fullscreen diagonal-wipe slider, glassmorphism booking bar, scroll reveal
  if (variant === 'encre') {
    const defaultHeroImages = [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1920&q=85',
      'https://images.unsplash.com/photo-1562962230-16f4e1d1c8c4?w=1920&q=85',
      'https://images.unsplash.com/photo-1612392062422-f0c96a8e6bfe?w=1920&q=85',
    ]

    const rawHeroImages = (content as Record<string, unknown>).heroImages as (string | { id?: string; src?: string; alt?: string })[] | undefined
    const heroImages = rawHeroImages?.map(img => typeof img === 'string' ? img : img?.src).filter(Boolean) as string[] | undefined

    const slides = [
      { name: "L'art dans la peau", style: 'Neo-Traditionnel', bg: 'linear-gradient(135deg, #0A0A0A 0%, #1A0A0E 50%, #0A0A0A 100%)', image: heroImages?.[0] ?? defaultHeroImages[0] },
      { name: 'Chaque tattoo raconte une histoire', style: 'Blackwork', bg: 'linear-gradient(135deg, #0A0A0A 0%, #120008 50%, #0F0A0A 100%)', image: heroImages?.[1] ?? defaultHeroImages[1] },
      { name: 'Votre vision, notre encre', style: 'Fine Line', bg: 'linear-gradient(135deg, #0F0A0A 0%, #0A0A0A 50%, #1A0A0E 100%)', image: heroImages?.[2] ?? defaultHeroImages[2] },
    ]

    /* eslint-disable react-hooks/rules-of-hooks */
    const [encreActiveSlide, setEncreActiveSlide] = useState(0)
    const encrePrevSlideRef = useRef(0)
    const encreTitleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const encreProgressRef = useRef<HTMLDivElement>(null)

    const encreGoNext = useCallback(() => {
      setEncreActiveSlide((prev) => {
        encrePrevSlideRef.current = prev
        return (prev + 1) % slides.length
      })
    }, [])

    const encreGoPrev = useCallback(() => {
      setEncreActiveSlide((prev) => {
        encrePrevSlideRef.current = prev
        return (prev - 1 + slides.length) % slides.length
      })
    }, [])

    useEffect(() => {
      const interval = setInterval(encreGoNext, 5000)
      return () => clearInterval(interval)
    }, [encreGoNext])

    // Reset progress bar animation on slide change
    useEffect(() => {
      if (encreProgressRef.current) {
        encreProgressRef.current.style.transition = 'none'
        encreProgressRef.current.style.width = '0%'
        // Force reflow
        void encreProgressRef.current.offsetWidth
        encreProgressRef.current.style.transition = 'width 5s linear'
        encreProgressRef.current.style.width = '100%'
      }
    }, [encreActiveSlide])
    /* eslint-enable react-hooks/rules-of-hooks */

    const encreCurrentSlide = slides[encreActiveSlide]
    const encreBtnLabel = content.primaryButton?.label || 'R\u00E9server une session'

    return (
      <>
      {/* Encre hero responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .encre-resp-bookingbar { flex-direction: column !important; padding: 16px !important; border-radius: 16px !important; max-width: 90% !important; }
          .encre-resp-filters { flex-direction: column !important; gap: 12px !important; width: 100% !important; }
          .encre-resp-filter-divider { display: none !important; }
          .encre-resp-reserve-btn { width: 100% !important; margin-left: 0 !important; margin-top: 8px !important; justify-content: center !important; }
          .encre-resp-hero-title { font-size: clamp(2rem, 8vw, 3.5rem) !important; }
          .encre-resp-hero-subtitle { font-size: 12px !important; }
          .encre-resp-nav-arrows { display: none !important; }
        }
        @media (max-width: 480px) {
          .encre-resp-bookingbar { margin: 0 16px; max-width: calc(100% - 32px) !important; }
        }
      ` }} />
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Hero Section')}
        className="relative overflow-hidden"
        style={{
          height: '100vh',
          backgroundColor: '#0A0A0A',
          color: '#FFFFFF',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        {/* Diagonal wipe — parallelogram translates uniformly */}
        {slides.map((slide, i) => {
          const isActive = encreActiveSlide === i
          const isPrev = encrePrevSlideRef.current === i && !isActive

          const visible = 'polygon(0% 0%, 130% 0%, 130% 100%, -20% 100%)'
          const hidden  = 'polygon(120% 0%, 250% 0%, 250% 100%, 100% 100%)'
          const full    = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                clipPath: isActive ? visible : isPrev ? full : hidden,
                opacity: isActive || isPrev ? 1 : 0,
                transition: isActive
                  ? 'clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1), opacity 0s'
                  : isPrev
                    ? 'none'
                    : 'clip-path 0s 1.3s, opacity 0s 1.3s',
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              }}
            >
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: slide.bg,
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              )}
            </div>
          )
        })}

        {/* Dark overlay with subtle crimson tint */}
        <div {...elementProps(config.id, 'overlay', 'container', 'Overlay')} className="absolute inset-0" style={{ backgroundColor: 'rgba(10, 10, 10, 0.5)', zIndex: 3 }} />

        {/* Content — bottom-left title + subtitle */}
        <div {...elementProps(config.id, 'centerContent', 'container', 'Hero Content')} className="relative flex flex-col justify-end h-full px-6" style={{ zIndex: 10, paddingBottom: '140px', paddingLeft: 'clamp(20px, 5vw, 80px)' }}>
          <div ref={encreTitleRevealRef}>
            {/* Subtitle above title */}
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              className="encre-resp-hero-subtitle"
              style={{
                color: '#8C8C8C',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                marginBottom: '18px',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
              }}
            >
              {subtitle || 'TATTOO ARTIST'}
            </p>
            {/* H1 title with crimson accent on key word */}
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              className="encre-resp-hero-title"
              style={{
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 'clamp(2.875rem, 1.6429rem + 5.4762vw, 5.75rem)',
                lineHeight: '105%',
                maxWidth: '820px',
                textAlign: 'left',
                marginBottom: '0',
                marginTop: 0,
                letterSpacing: '-0.025em',
              }}
            >
              {title ? (
                title
              ) : (
                <>
                  {encreCurrentSlide.name.split(' ').slice(0, -1).join(' ')}{' '}
                  <span style={{ color: '#C41E3A' }}>{encreCurrentSlide.name.split(' ').slice(-1)[0]}</span>
                </>
              )}
            </h1>
          </div>
        </div>

        {/* Glassmorphism booking bar at bottom */}
        <div
          {...elementProps(config.id, 'bookingBar', 'container', 'Booking Bar')}
          className="absolute z-10 flex items-center encre-resp-bookingbar"
          style={{
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '999px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(10, 10, 10, 0.5)',
            padding: '6px 6px 6px 28px',
            gap: '0',
            maxWidth: '720px',
            width: '90%',
            border: '1px solid rgba(196, 30, 58, 0.2)',
          }}
        >
          {/* Booking fields */}
          <div {...elementProps(config.id, 'filtersRow', 'container', 'Booking Fields')} className="flex items-center encre-resp-filters" style={{ flexShrink: 0 }}>
            {['Nom', 'Email', 'Style souhait\u00E9'].map((label, i) => (
              <div
                key={label}
                style={{
                  position: 'relative',
                  paddingRight: i < 2 ? '14px' : '0',
                  marginRight: i < 2 ? '14px' : '0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {i < 2 && (
                  <span className="encre-resp-filter-divider" style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1px',
                    height: '20px',
                    backgroundColor: 'rgba(196, 30, 58, 0.2)',
                  }} />
                )}
                <span
                  {...elementProps(config.id, `filters.${i}.label`, 'text')}
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px',
                    cursor: 'default',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: 'none',
                    fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                    gap: '6px',
                  }}
                >
                  {label === 'Nom' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  )}
                  {label === 'Email' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  )}
                  {label === 'Style souhait\u00E9' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
                  )}
                  {label}
                  {label === 'Style souhait\u00E9' && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px', opacity: 0.6 }}><polyline points="6 9 12 15 18 9"/></svg>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="encre-resp-reserve-btn" style={{ flex: '1 1 auto', minWidth: '0', display: 'flex', justifyContent: 'flex-end', marginLeft: '16px' }}>
            <div
              {...elementProps(config.id, 'primaryButton', 'button')}
              role="button"
              style={{
                backgroundColor: '#C41E3A',
                color: '#FFFFFF',
                borderRadius: '999px',
                paddingLeft: '28px',
                paddingRight: '28px',
                paddingTop: '12px',
                paddingBottom: '12px',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#D4213F' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#C41E3A' }}
            >
              {encreBtnLabel}
            </div>
          </div>
        </div>

        {/* Prev button */}
        <div
          {...elementProps(config.id, 'prevButton', 'button')}
          role="button"
          onClick={encreGoPrev}
          className="absolute z-10 flex items-center justify-center encre-resp-nav-arrows"
          style={{
            left: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(196, 30, 58, 0.18)',
            border: '1px solid rgba(196, 30, 58, 0.2)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(196, 30, 58, 0.35)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(196, 30, 58, 0.18)' }}
          aria-label="Previous slide"
        >
          <span {...elementProps(config.id, 'prevIcon', 'icon', 'Chevron Left')}><ChevronLeft style={{ width: '24px', height: '24px', color: '#FFFFFF' }} /></span>
        </div>

        {/* Next button */}
        <div
          {...elementProps(config.id, 'nextButton', 'button')}
          role="button"
          onClick={encreGoNext}
          className="absolute z-10 flex items-center justify-center encre-resp-nav-arrows"
          style={{
            right: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(196, 30, 58, 0.18)',
            border: '1px solid rgba(196, 30, 58, 0.2)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(196, 30, 58, 0.35)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(196, 30, 58, 0.18)' }}
          aria-label="Next slide"
        >
          <span {...elementProps(config.id, 'nextIcon', 'icon', 'Chevron Right')}><ChevronRight style={{ width: '24px', height: '24px', color: '#FFFFFF' }} /></span>
        </div>

        {/* Bottom-left meta badge */}
        <div
          {...elementProps(config.id, 'slideMeta', 'container', 'Slide Info')}
          className="absolute z-10"
          style={{
            bottom: '100px',
            left: 'clamp(16px, 4vw, 80px)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(196, 30, 58, 0.15)',
            borderRadius: '4px',
            padding: '10px 18px',
            border: '1px solid rgba(196, 30, 58, 0.2)',
          }}
        >
          <div className="flex items-center" style={{ gap: '12px' }}>
            <span
              {...elementProps(config.id, `slides.${encreActiveSlide}.name`, 'text')}
              style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', fontWeight: 500, color: '#FFFFFF', letterSpacing: '0.01em' }}
            >
              {encreCurrentSlide.name}
            </span>
            <span {...elementProps(config.id, 'slideDivider', 'text', 'Divider')} style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '14px' }}>
              &middot;
            </span>
            <span
              {...elementProps(config.id, `slides.${encreActiveSlide}.style`, 'text')}
              className="flex items-center"
              style={{ color: '#C41E3A', fontSize: '13px', gap: '4px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              {encreCurrentSlide.style}
            </span>
          </div>
        </div>

        {/* Progress bar at very bottom */}
        <div
          {...elementProps(config.id, 'progressBar', 'container', 'Progress Bar')}
          className="absolute z-10"
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: 'rgba(196, 30, 58, 0.15)',
          }}
        >
          <div
            ref={encreProgressRef}
            style={{
              height: '100%',
              backgroundColor: '#C41E3A',
              width: '0%',
              transition: 'width 5s linear',
            }}
          />
        </div>

        {/* Bottom-right slide dots */}
        <div
          {...elementProps(config.id, 'slideNav', 'container', 'Slide Nav')}
          className="absolute z-10 flex"
          style={{ bottom: '100px', right: 'clamp(16px, 4vw, 80px)', gap: '8px', alignItems: 'center' }}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              {...elementProps(config.id, `slides.${i}.dot`, 'button')}
              role="button"
              onClick={() => setEncreActiveSlide(i)}
              style={{
                width: encreActiveSlide === i ? '28px' : '6px',
                height: '6px',
                borderRadius: '999px',
                backgroundColor: encreActiveSlide === i ? '#C41E3A' : 'rgba(255, 255, 255, 0.25)',
                cursor: 'pointer',
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
      </>
    )
  }

  // ─── VARIANT: serenite ───
  // Institut de beauté & spa premium : fullscreen diagonal-wipe slider, glassmorphism booking bar, scroll reveal
  if (variant === 'serenite') {
    const defaultHeroImages = [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=85',
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1920&q=85',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1920&q=85',
    ]

    const rawHeroImages = (content as Record<string, unknown>).heroImages as (string | { id?: string; src?: string; alt?: string })[] | undefined
    const heroImages = rawHeroImages?.map(img => typeof img === 'string' ? img : img?.src).filter(Boolean) as string[] | undefined

    const slides = [
      { name: 'Un sanctuaire de bien-\u00EAtre', style: 'Soin Signature', bg: 'linear-gradient(135deg, #1B1B2F 0%, #2A2440 50%, #1B1B2F 100%)', image: heroImages?.[0] ?? defaultHeroImages[0] },
      { name: "L\u2019art du soin sur mesure", style: 'Massage Premium', bg: 'linear-gradient(135deg, #22213A 0%, #1B1B2F 50%, #251F38 100%)', image: heroImages?.[1] ?? defaultHeroImages[1] },
      { name: '\u00C9veillez vos sens', style: 'Rituel Spa', bg: 'linear-gradient(135deg, #1B1B2F 0%, #251F38 50%, #22213A 100%)', image: heroImages?.[2] ?? defaultHeroImages[2] },
    ]

    /* eslint-disable react-hooks/rules-of-hooks */
    const [sereniteActiveSlide, setSereniteActiveSlide] = useState(0)
    const serenitePrevSlideRef = useRef(0)
    const sereniteTitleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const sereniteProgressRef = useRef<HTMLDivElement>(null)

    const sereniteGoNext = useCallback(() => {
      setSereniteActiveSlide((prev) => {
        serenitePrevSlideRef.current = prev
        return (prev + 1) % slides.length
      })
    }, [])

    const sereniteGoPrev = useCallback(() => {
      setSereniteActiveSlide((prev) => {
        serenitePrevSlideRef.current = prev
        return (prev - 1 + slides.length) % slides.length
      })
    }, [])

    useEffect(() => {
      const interval = setInterval(sereniteGoNext, 5000)
      return () => clearInterval(interval)
    }, [sereniteGoNext])

    // Reset progress bar animation on slide change
    useEffect(() => {
      if (sereniteProgressRef.current) {
        sereniteProgressRef.current.style.transition = 'none'
        sereniteProgressRef.current.style.width = '0%'
        // Force reflow
        void sereniteProgressRef.current.offsetWidth
        sereniteProgressRef.current.style.transition = 'width 5s linear'
        sereniteProgressRef.current.style.width = '100%'
      }
    }, [sereniteActiveSlide])
    /* eslint-enable react-hooks/rules-of-hooks */

    const sereniteCurrentSlide = slides[sereniteActiveSlide]
    const sereniteBtnLabel = content.primaryButton?.label || 'R\u00E9server un soin'

    return (
      <>
      {/* Serenite hero responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .serenite-resp-bookingbar { flex-direction: column !important; padding: 16px !important; border-radius: 16px !important; max-width: 90% !important; }
          .serenite-resp-filters { flex-direction: column !important; gap: 12px !important; width: 100% !important; }
          .serenite-resp-filter-divider { display: none !important; }
          .serenite-resp-reserve-btn { width: 100% !important; margin-left: 0 !important; margin-top: 8px !important; justify-content: center !important; }
          .serenite-resp-hero-title { font-size: clamp(2rem, 8vw, 3.5rem) !important; }
          .serenite-resp-hero-subtitle { font-size: 12px !important; }
          .serenite-resp-nav-arrows { display: none !important; }
        }
        @media (max-width: 480px) {
          .serenite-resp-bookingbar { margin: 0 16px; max-width: calc(100% - 32px) !important; }
        }
      ` }} />
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Hero Section')}
        className="relative overflow-hidden"
        style={{
          height: '100vh',
          backgroundColor: '#1B1B2F',
          color: '#FFFFFF',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        {/* Diagonal wipe — parallelogram translates uniformly */}
        {slides.map((slide, i) => {
          const isActive = sereniteActiveSlide === i
          const isPrev = serenitePrevSlideRef.current === i && !isActive

          const visible = 'polygon(0% 0%, 130% 0%, 130% 100%, -20% 100%)'
          const hidden  = 'polygon(120% 0%, 250% 0%, 250% 100%, 100% 100%)'
          const full    = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                clipPath: isActive ? visible : isPrev ? full : hidden,
                opacity: isActive || isPrev ? 1 : 0,
                transition: isActive
                  ? 'clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1), opacity 0s'
                  : isPrev
                    ? 'none'
                    : 'clip-path 0s 1.3s, opacity 0s 1.3s',
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              }}
            >
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: slide.bg,
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              )}
            </div>
          )
        })}

        {/* Dark overlay with subtle navy tint */}
        <div {...elementProps(config.id, 'overlay', 'container', 'Overlay')} className="absolute inset-0" style={{ backgroundColor: 'rgba(27, 27, 47, 0.45)', zIndex: 3 }} />

        {/* Content — bottom-left title + subtitle */}
        <div {...elementProps(config.id, 'centerContent', 'container', 'Hero Content')} className="relative flex flex-col justify-end h-full px-6" style={{ zIndex: 10, paddingBottom: '140px', paddingLeft: 'clamp(20px, 5vw, 80px)' }}>
          <div ref={sereniteTitleRevealRef}>
            {/* Subtitle above title — lavender, wide tracking */}
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              className="serenite-resp-hero-subtitle"
              style={{
                color: '#7B6F8A',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                marginBottom: '18px',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
              }}
            >
              {subtitle || 'INSTITUT DE BEAUT\u00C9 & SPA'}
            </p>
            {/* H1 title with gold accent on last word */}
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              className="serenite-resp-hero-title"
              style={{
                color: '#FFFFFF',
                fontWeight: 300,
                fontSize: 'clamp(2.875rem, 1.6429rem + 5.4762vw, 5.75rem)',
                lineHeight: '105%',
                maxWidth: '820px',
                textAlign: 'left',
                marginBottom: '0',
                marginTop: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {title ? (
                title
              ) : (
                <>
                  {sereniteCurrentSlide.name.split(' ').slice(0, -1).join(' ')}{' '}
                  <span style={{ color: '#D4B896', fontWeight: 500 }}>{sereniteCurrentSlide.name.split(' ').slice(-1)[0]}</span>
                </>
              )}
            </h1>
          </div>
        </div>

        {/* Glassmorphism booking bar at bottom */}
        <div
          {...elementProps(config.id, 'bookingBar', 'container', 'Booking Bar')}
          className="absolute z-10 flex items-center serenite-resp-bookingbar"
          style={{
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '999px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(27, 27, 47, 0.5)',
            padding: '6px 6px 6px 28px',
            gap: '0',
            maxWidth: '720px',
            width: '90%',
            border: '1px solid rgba(212, 184, 150, 0.2)',
          }}
        >
          {/* Booking fields */}
          <div {...elementProps(config.id, 'filtersRow', 'container', 'Booking Fields')} className="flex items-center serenite-resp-filters" style={{ flexShrink: 0 }}>
            {['Nom', 'Email', 'Type de soin'].map((label, i) => (
              <div
                key={label}
                style={{
                  position: 'relative',
                  paddingRight: i < 2 ? '14px' : '0',
                  marginRight: i < 2 ? '14px' : '0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {i < 2 && (
                  <span className="serenite-resp-filter-divider" style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1px',
                    height: '20px',
                    backgroundColor: 'rgba(212, 184, 150, 0.2)',
                  }} />
                )}
                <span
                  {...elementProps(config.id, `filters.${i}.label`, 'text')}
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px',
                    cursor: 'default',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: 'none',
                    fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                    gap: '6px',
                  }}
                >
                  {label === 'Nom' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  )}
                  {label === 'Email' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  )}
                  {label === 'Type de soin' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                  )}
                  {label}
                  {label === 'Type de soin' && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px', opacity: 0.6 }}><polyline points="6 9 12 15 18 9"/></svg>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="serenite-resp-reserve-btn" style={{ flex: '1 1 auto', minWidth: '0', display: 'flex', justifyContent: 'flex-end', marginLeft: '16px' }}>
            <div
              {...elementProps(config.id, 'primaryButton', 'button')}
              role="button"
              style={{
                backgroundColor: '#D4B896',
                color: '#1B1B2F',
                borderRadius: '999px',
                paddingLeft: '28px',
                paddingRight: '28px',
                paddingTop: '12px',
                paddingBottom: '12px',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#E0C8A8' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#D4B896' }}
            >
              {sereniteBtnLabel}
            </div>
          </div>
        </div>

        {/* Prev button */}
        <div
          {...elementProps(config.id, 'prevButton', 'button')}
          role="button"
          onClick={sereniteGoPrev}
          className="absolute z-10 flex items-center justify-center serenite-resp-nav-arrows"
          style={{
            left: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(212, 184, 150, 0.15)',
            border: '1px solid rgba(212, 184, 150, 0.2)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(212, 184, 150, 0.32)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(212, 184, 150, 0.15)' }}
          aria-label="Previous slide"
        >
          <span {...elementProps(config.id, 'prevIcon', 'icon', 'Chevron Left')}><ChevronLeft style={{ width: '24px', height: '24px', color: '#D4B896' }} /></span>
        </div>

        {/* Next button */}
        <div
          {...elementProps(config.id, 'nextButton', 'button')}
          role="button"
          onClick={sereniteGoNext}
          className="absolute z-10 flex items-center justify-center serenite-resp-nav-arrows"
          style={{
            right: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(212, 184, 150, 0.15)',
            border: '1px solid rgba(212, 184, 150, 0.2)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(212, 184, 150, 0.32)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(212, 184, 150, 0.15)' }}
          aria-label="Next slide"
        >
          <span {...elementProps(config.id, 'nextIcon', 'icon', 'Chevron Right')}><ChevronRight style={{ width: '24px', height: '24px', color: '#D4B896' }} /></span>
        </div>

        {/* Bottom-left meta badge */}
        <div
          {...elementProps(config.id, 'slideMeta', 'container', 'Slide Info')}
          className="absolute z-10"
          style={{
            bottom: '100px',
            left: 'clamp(16px, 4vw, 80px)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(212, 184, 150, 0.12)',
            borderRadius: '4px',
            padding: '10px 18px',
            border: '1px solid rgba(212, 184, 150, 0.2)',
          }}
        >
          <div className="flex items-center" style={{ gap: '12px' }}>
            <span
              {...elementProps(config.id, `slides.${sereniteActiveSlide}.name`, 'text')}
              style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', fontWeight: 500, color: '#FFFFFF', letterSpacing: '0.01em' }}
            >
              {sereniteCurrentSlide.name}
            </span>
            <span {...elementProps(config.id, 'slideDivider', 'text', 'Divider')} style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '14px' }}>
              &middot;
            </span>
            <span
              {...elementProps(config.id, `slides.${sereniteActiveSlide}.style`, 'text')}
              className="flex items-center"
              style={{ color: '#D4B896', fontSize: '13px', gap: '4px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              {sereniteCurrentSlide.style}
            </span>
          </div>
        </div>

        {/* Progress bar at very bottom */}
        <div
          {...elementProps(config.id, 'progressBar', 'container', 'Progress Bar')}
          className="absolute z-10"
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: 'rgba(212, 184, 150, 0.15)',
          }}
        >
          <div
            ref={sereniteProgressRef}
            style={{
              height: '100%',
              backgroundColor: '#D4B896',
              width: '0%',
              transition: 'width 5s linear',
            }}
          />
        </div>

        {/* Bottom-right slide dots */}
        <div
          {...elementProps(config.id, 'slideNav', 'container', 'Slide Nav')}
          className="absolute z-10 flex"
          style={{ bottom: '100px', right: 'clamp(16px, 4vw, 80px)', gap: '8px', alignItems: 'center' }}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              {...elementProps(config.id, `slides.${i}.dot`, 'button')}
              role="button"
              onClick={() => setSereniteActiveSlide(i)}
              style={{
                width: sereniteActiveSlide === i ? '28px' : '6px',
                height: '6px',
                borderRadius: '999px',
                backgroundColor: sereniteActiveSlide === i ? '#D4B896' : 'rgba(255, 255, 255, 0.25)',
                cursor: 'pointer',
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
      </>
    )
  }

  // ─── VARIANT: pulse ───
  // DJ / musicien premium : fullscreen diagonal-wipe slider, glassmorphism booking bar, accents cyan néon + magenta
  if (variant === 'pulse') {
    const defaultHeroImages = [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=85',
      'https://images.unsplash.com/photo-1571266028243-d220c6a7d1f0?w=1920&q=85',
      'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=1920&q=85',
    ]

    const rawHeroImages = (content as Record<string, unknown>).heroImages as (string | { id?: string; src?: string; alt?: string })[] | undefined
    const heroImages = rawHeroImages?.map(img => typeof img === 'string' ? img : img?.src).filter(Boolean) as string[] | undefined

    const slides = [
      { name: 'Feel the Pulse', style: 'Live Performance', bg: 'linear-gradient(135deg, #0D0D0D 0%, #1A002B 50%, #0D0D0D 100%)', image: heroImages?.[0] ?? defaultHeroImages[0] },
      { name: 'Sound without limits', style: 'Studio Sessions', bg: 'linear-gradient(135deg, #000D1A 0%, #0D0D0D 50%, #1A000A 100%)', image: heroImages?.[1] ?? defaultHeroImages[1] },
      { name: '\u00C9nergie pure', style: 'Club & Festival', bg: 'linear-gradient(135deg, #0D0D0D 0%, #001A1A 50%, #0D0D0D 100%)', image: heroImages?.[2] ?? defaultHeroImages[2] },
    ]

    /* eslint-disable react-hooks/rules-of-hooks */
    const [pulseActiveSlide, setPulseActiveSlide] = useState(0)
    const pulsePrevSlideRef = useRef(0)
    const pulseTitleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const pulseProgressRef = useRef<HTMLDivElement>(null)

    const pulseGoNext = useCallback(() => {
      setPulseActiveSlide((prev) => {
        pulsePrevSlideRef.current = prev
        return (prev + 1) % slides.length
      })
    }, [])

    const pulseGoPrev = useCallback(() => {
      setPulseActiveSlide((prev) => {
        pulsePrevSlideRef.current = prev
        return (prev - 1 + slides.length) % slides.length
      })
    }, [])

    useEffect(() => {
      const interval = setInterval(pulseGoNext, 5000)
      return () => clearInterval(interval)
    }, [pulseGoNext])

    // Reset progress bar animation on slide change
    useEffect(() => {
      if (pulseProgressRef.current) {
        pulseProgressRef.current.style.transition = 'none'
        pulseProgressRef.current.style.width = '0%'
        // Force reflow
        void pulseProgressRef.current.offsetWidth
        pulseProgressRef.current.style.transition = 'width 5s linear'
        pulseProgressRef.current.style.width = '100%'
      }
    }, [pulseActiveSlide])
    /* eslint-enable react-hooks/rules-of-hooks */

    const pulseCurrentSlide = slides[pulseActiveSlide]
    const pulseBtnLabel = content.primaryButton?.label || 'R\u00E9server une date'

    return (
      <>
      {/* Pulse hero responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .pulse-resp-bookingbar { flex-direction: column !important; padding: 16px !important; border-radius: 16px !important; max-width: 90% !important; }
          .pulse-resp-filters { flex-direction: column !important; gap: 12px !important; width: 100% !important; }
          .pulse-resp-filter-divider { display: none !important; }
          .pulse-resp-reserve-btn { width: 100% !important; margin-left: 0 !important; margin-top: 8px !important; justify-content: center !important; }
          .pulse-resp-hero-title { font-size: clamp(2rem, 8vw, 3.5rem) !important; }
          .pulse-resp-hero-subtitle { font-size: 12px !important; }
          .pulse-resp-nav-arrows { display: none !important; }
        }
        @media (max-width: 480px) {
          .pulse-resp-bookingbar { margin: 0 16px; max-width: calc(100% - 32px) !important; }
        }
      ` }} />
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Hero Section')}
        className="relative overflow-hidden"
        style={{
          height: '100vh',
          backgroundColor: '#0D0D0D',
          color: '#FFFFFF',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        {/* Diagonal wipe — parallelogram translates uniformly */}
        {slides.map((slide, i) => {
          const isActive = pulseActiveSlide === i
          const isPrev = pulsePrevSlideRef.current === i && !isActive

          const visible = 'polygon(0% 0%, 130% 0%, 130% 100%, -20% 100%)'
          const hidden  = 'polygon(120% 0%, 250% 0%, 250% 100%, 100% 100%)'
          const full    = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                clipPath: isActive ? visible : isPrev ? full : hidden,
                opacity: isActive || isPrev ? 1 : 0,
                transition: isActive
                  ? 'clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1), opacity 0s'
                  : isPrev
                    ? 'none'
                    : 'clip-path 0s 1.3s, opacity 0s 1.3s',
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              }}
            >
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: slide.bg,
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              )}
            </div>
          )
        })}

        {/* Dark overlay with subtle neon vignette */}
        <div {...elementProps(config.id, 'overlay', 'container', 'Overlay')} className="absolute inset-0" style={{ backgroundColor: 'rgba(13, 13, 13, 0.5)', zIndex: 3 }} />
        {/* Neon cyan glow — top right corner */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4, background: 'radial-gradient(ellipse at 80% 10%, rgba(0, 229, 255, 0.08) 0%, transparent 60%)' }} />
        {/* Neon magenta glow — bottom left corner */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4, background: 'radial-gradient(ellipse at 20% 90%, rgba(255, 0, 110, 0.06) 0%, transparent 55%)' }} />

        {/* Content — bottom-left title + subtitle */}
        <div {...elementProps(config.id, 'centerContent', 'container', 'Hero Content')} className="relative flex flex-col justify-end h-full px-6" style={{ zIndex: 10, paddingBottom: '140px', paddingLeft: 'clamp(20px, 5vw, 80px)' }}>
          <div ref={pulseTitleRevealRef}>
            {/* Subtitle above title — magenta, wide tracking */}
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              className="pulse-resp-hero-subtitle"
              style={{
                color: '#FF006E',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.36em',
                textTransform: 'uppercase',
                marginBottom: '18px',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
              }}
            >
              {subtitle || 'DJ & PRODUCTEUR'}
            </p>
            {/* H1 title — bold electric with cyan accent on last word */}
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              className="pulse-resp-hero-title"
              style={{
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: 'clamp(2.875rem, 1.6429rem + 5.4762vw, 5.75rem)',
                lineHeight: '100%',
                maxWidth: '860px',
                textAlign: 'left',
                marginBottom: '0',
                marginTop: 0,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
              }}
            >
              {title ? (
                title
              ) : (
                <>
                  {pulseCurrentSlide.name.split(' ').slice(0, -1).join(' ')}{' '}
                  <span style={{ color: '#00E5FF' }}>{pulseCurrentSlide.name.split(' ').slice(-1)[0]}</span>
                </>
              )}
            </h1>
          </div>
        </div>

        {/* Glassmorphism booking bar at bottom */}
        <div
          {...elementProps(config.id, 'bookingBar', 'container', 'Booking Bar')}
          className="absolute z-10 flex items-center pulse-resp-bookingbar"
          style={{
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '999px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(13, 13, 13, 0.6)',
            padding: '6px 6px 6px 28px',
            gap: '0',
            maxWidth: '740px',
            width: '90%',
            border: '1px solid rgba(0, 229, 255, 0.2)',
          }}
        >
          {/* Booking fields */}
          <div {...elementProps(config.id, 'filtersRow', 'container', 'Booking Fields')} className="flex items-center pulse-resp-filters" style={{ flexShrink: 0 }}>
            {['Nom', 'Email', "Type d'\u00E9v\u00E9nement"].map((label, i) => (
              <div
                key={label}
                style={{
                  position: 'relative',
                  paddingRight: i < 2 ? '14px' : '0',
                  marginRight: i < 2 ? '14px' : '0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {i < 2 && (
                  <span className="pulse-resp-filter-divider" style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1px',
                    height: '20px',
                    backgroundColor: 'rgba(0, 229, 255, 0.2)',
                  }} />
                )}
                <span
                  {...elementProps(config.id, `filters.${i}.label`, 'text')}
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px',
                    cursor: 'default',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: 'none',
                    fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                    gap: '6px',
                  }}
                >
                  {label === 'Nom' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  )}
                  {label === 'Email' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  )}
                  {label === "Type d'\u00E9v\u00E9nement" && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  )}
                  {label}
                  {label === "Type d'\u00E9v\u00E9nement" && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px', opacity: 0.6 }}><polyline points="6 9 12 15 18 9"/></svg>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="pulse-resp-reserve-btn" style={{ flex: '1 1 auto', minWidth: '0', display: 'flex', justifyContent: 'flex-end', marginLeft: '16px' }}>
            <div
              {...elementProps(config.id, 'primaryButton', 'button')}
              role="button"
              style={{
                backgroundColor: '#00E5FF',
                color: '#0D0D0D',
                borderRadius: '999px',
                paddingLeft: '28px',
                paddingRight: '28px',
                paddingTop: '12px',
                paddingBottom: '12px',
                fontSize: '14px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#33EAFF'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.4)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#00E5FF'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              {pulseBtnLabel}
            </div>
          </div>
        </div>

        {/* Prev button */}
        <div
          {...elementProps(config.id, 'prevButton', 'button')}
          role="button"
          onClick={pulseGoPrev}
          className="absolute z-10 flex items-center justify-center pulse-resp-nav-arrows"
          style={{
            left: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(0, 229, 255, 0.12)',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.28)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.12)' }}
          aria-label="Previous slide"
        >
          <span {...elementProps(config.id, 'prevIcon', 'icon', 'Chevron Left')}><ChevronLeft style={{ width: '24px', height: '24px', color: '#00E5FF' }} /></span>
        </div>

        {/* Next button */}
        <div
          {...elementProps(config.id, 'nextButton', 'button')}
          role="button"
          onClick={pulseGoNext}
          className="absolute z-10 flex items-center justify-center pulse-resp-nav-arrows"
          style={{
            right: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(0, 229, 255, 0.12)',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.28)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.12)' }}
          aria-label="Next slide"
        >
          <span {...elementProps(config.id, 'nextIcon', 'icon', 'Chevron Right')}><ChevronRight style={{ width: '24px', height: '24px', color: '#00E5FF' }} /></span>
        </div>

        {/* Bottom-left meta badge */}
        <div
          {...elementProps(config.id, 'slideMeta', 'container', 'Slide Info')}
          className="absolute z-10"
          style={{
            bottom: '100px',
            left: 'clamp(16px, 4vw, 80px)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(0, 229, 255, 0.08)',
            borderRadius: '4px',
            padding: '10px 18px',
            border: '1px solid rgba(0, 229, 255, 0.2)',
          }}
        >
          <div className="flex items-center" style={{ gap: '12px' }}>
            <span
              {...elementProps(config.id, `slides.${pulseActiveSlide}.name`, 'text')}
              style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.01em', textTransform: 'uppercase' }}
            >
              {pulseCurrentSlide.name}
            </span>
            <span {...elementProps(config.id, 'slideDivider', 'text', 'Divider')} style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '14px' }}>
              &middot;
            </span>
            <span
              {...elementProps(config.id, `slides.${pulseActiveSlide}.style`, 'text')}
              className="flex items-center"
              style={{ color: '#FF006E', fontSize: '13px', gap: '4px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              {pulseCurrentSlide.style}
            </span>
          </div>
        </div>

        {/* Progress bar at very bottom */}
        <div
          {...elementProps(config.id, 'progressBar', 'container', 'Progress Bar')}
          className="absolute z-10"
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: 'rgba(0, 229, 255, 0.12)',
          }}
        >
          <div
            ref={pulseProgressRef}
            style={{
              height: '100%',
              backgroundColor: '#00E5FF',
              width: '0%',
              transition: 'width 5s linear',
              boxShadow: '0 0 8px rgba(0, 229, 255, 0.6)',
            }}
          />
        </div>

        {/* Bottom-right slide counter dots */}
        <div
          {...elementProps(config.id, 'slideNav', 'container', 'Slide Nav')}
          className="absolute z-10 flex"
          style={{ bottom: '100px', right: 'clamp(16px, 4vw, 80px)', gap: '8px', alignItems: 'center' }}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              {...elementProps(config.id, `slides.${i}.dot`, 'button')}
              role="button"
              onClick={() => setPulseActiveSlide(i)}
              style={{
                width: pulseActiveSlide === i ? '28px' : '6px',
                height: '6px',
                borderRadius: '999px',
                backgroundColor: pulseActiveSlide === i ? '#00E5FF' : 'rgba(255, 255, 255, 0.25)',
                cursor: 'pointer',
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
                boxShadow: pulseActiveSlide === i ? '0 0 8px rgba(0, 229, 255, 0.5)' : 'none',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
      </>
    )
  }

  // ─── VARIANT: saveur ───
  // Traiteur & chef à domicile premium : fullscreen diagonal-wipe slider, glassmorphism booking bar, accents or antique + sienna
  if (variant === 'saveur') {
    const defaultHeroImages = [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=85',
      'https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=85',
    ]

    const rawHeroImages = (content as Record<string, unknown>).heroImages as (string | { id?: string; src?: string; alt?: string })[] | undefined
    const heroImages = rawHeroImages?.map(img => typeof img === 'string' ? img : img?.src).filter(Boolean) as string[] | undefined

    const slides = [
      { name: "L\u2019art de recevoir", style: 'Traiteur \u00C9v\u00E9nementiel', bg: 'linear-gradient(135deg, #1C1917 0%, #2D2420 50%, #1C1917 100%)', image: heroImages?.[0] ?? defaultHeroImages[0] },
      { name: 'Une cuisine d\u2019exception \u00E0 votre table', style: 'Chef \u00C0 Domicile', bg: 'linear-gradient(135deg, #241E1B 0%, #1C1917 50%, #2A1F1A 100%)', image: heroImages?.[1] ?? defaultHeroImages[1] },
      { name: 'Chaque \u00E9v\u00E9nement m\u00E9rite le meilleur', style: 'Buffet & Cocktail', bg: 'linear-gradient(135deg, #1C1917 0%, #2A1F1A 50%, #241E1B 100%)', image: heroImages?.[2] ?? defaultHeroImages[2] },
    ]

    /* eslint-disable react-hooks/rules-of-hooks */
    const [saveurActiveSlide, setSaveurActiveSlide] = useState(0)
    const saveurPrevSlideRef = useRef(0)
    const saveurTitleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const saveurProgressRef = useRef<HTMLDivElement>(null)

    const saveurGoNext = useCallback(() => {
      setSaveurActiveSlide((prev) => {
        saveurPrevSlideRef.current = prev
        return (prev + 1) % slides.length
      })
    }, [])

    const saveurGoPrev = useCallback(() => {
      setSaveurActiveSlide((prev) => {
        saveurPrevSlideRef.current = prev
        return (prev - 1 + slides.length) % slides.length
      })
    }, [])

    useEffect(() => {
      const interval = setInterval(saveurGoNext, 5000)
      return () => clearInterval(interval)
    }, [saveurGoNext])

    // Reset progress bar animation on slide change
    useEffect(() => {
      if (saveurProgressRef.current) {
        saveurProgressRef.current.style.transition = 'none'
        saveurProgressRef.current.style.width = '0%'
        // Force reflow
        void saveurProgressRef.current.offsetWidth
        saveurProgressRef.current.style.transition = 'width 5s linear'
        saveurProgressRef.current.style.width = '100%'
      }
    }, [saveurActiveSlide])
    /* eslint-enable react-hooks/rules-of-hooks */

    const saveurCurrentSlide = slides[saveurActiveSlide]
    const saveurBtnLabel = content.primaryButton?.label || 'Demander un devis'

    return (
      <>
      {/* Saveur hero responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .saveur-resp-bookingbar { flex-direction: column !important; padding: 16px !important; border-radius: 16px !important; max-width: 90% !important; }
          .saveur-resp-filters { flex-direction: column !important; gap: 12px !important; width: 100% !important; }
          .saveur-resp-filter-divider { display: none !important; }
          .saveur-resp-reserve-btn { width: 100% !important; margin-left: 0 !important; margin-top: 8px !important; justify-content: center !important; }
          .saveur-resp-hero-title { font-size: clamp(2rem, 8vw, 3.5rem) !important; }
          .saveur-resp-hero-subtitle { font-size: 12px !important; }
          .saveur-resp-nav-arrows { display: none !important; }
        }
        @media (max-width: 480px) {
          .saveur-resp-bookingbar { margin: 0 16px; max-width: calc(100% - 32px) !important; }
        }
      ` }} />
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Hero Section')}
        className="relative overflow-hidden"
        style={{
          height: '100vh',
          backgroundColor: '#1C1917',
          color: '#FFFFFF',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        {/* Diagonal wipe — parallelogram translates uniformly */}
        {slides.map((slide, i) => {
          const isActive = saveurActiveSlide === i
          const isPrev = saveurPrevSlideRef.current === i && !isActive

          const visible = 'polygon(0% 0%, 130% 0%, 130% 100%, -20% 100%)'
          const hidden  = 'polygon(120% 0%, 250% 0%, 250% 100%, 100% 100%)'
          const full    = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                clipPath: isActive ? visible : isPrev ? full : hidden,
                opacity: isActive || isPrev ? 1 : 0,
                transition: isActive
                  ? 'clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1), opacity 0s'
                  : isPrev
                    ? 'none'
                    : 'clip-path 0s 1.3s, opacity 0s 1.3s',
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              }}
            >
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: slide.bg,
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              )}
            </div>
          )
        })}

        {/* Dark overlay with subtle warm tint */}
        <div {...elementProps(config.id, 'overlay', 'container', 'Overlay')} className="absolute inset-0" style={{ backgroundColor: 'rgba(28, 25, 23, 0.42)', zIndex: 3 }} />
        {/* Warm gold glow — bottom left */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4, background: 'radial-gradient(ellipse at 15% 85%, rgba(200, 169, 126, 0.1) 0%, transparent 55%)' }} />

        {/* Content — bottom-left title + subtitle */}
        <div {...elementProps(config.id, 'centerContent', 'container', 'Hero Content')} className="relative flex flex-col justify-end h-full px-6" style={{ zIndex: 10, paddingBottom: '140px', paddingLeft: 'clamp(20px, 5vw, 80px)' }}>
          <div ref={saveurTitleRevealRef}>
            {/* Subtitle above title — sienna, wide tracking */}
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              className="saveur-resp-hero-subtitle"
              style={{
                color: '#6B4C3B',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                marginBottom: '18px',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
              }}
            >
              {subtitle || 'TRAITEUR & CHEF \u00C0 DOMICILE'}
            </p>
            {/* H1 title — elegant, warm, with gold accent on last word */}
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              className="saveur-resp-hero-title"
              style={{
                color: '#FFFFFF',
                fontWeight: 300,
                fontSize: 'clamp(2.875rem, 1.6429rem + 5.4762vw, 5.75rem)',
                lineHeight: '105%',
                maxWidth: '860px',
                textAlign: 'left',
                marginBottom: '0',
                marginTop: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {title ? (
                title
              ) : (
                <>
                  {saveurCurrentSlide.name.split(' ').slice(0, -1).join(' ')}{' '}
                  <span style={{ color: '#C8A97E', fontWeight: 400 }}>{saveurCurrentSlide.name.split(' ').slice(-1)[0]}</span>
                </>
              )}
            </h1>
          </div>
        </div>

        {/* Glassmorphism booking bar at bottom */}
        <div
          {...elementProps(config.id, 'bookingBar', 'container', 'Booking Bar')}
          className="absolute z-10 flex items-center saveur-resp-bookingbar"
          style={{
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '999px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(28, 25, 23, 0.55)',
            padding: '6px 6px 6px 28px',
            gap: '0',
            maxWidth: '760px',
            width: '90%',
            border: '1px solid rgba(200, 169, 126, 0.22)',
          }}
        >
          {/* Booking fields */}
          <div {...elementProps(config.id, 'filtersRow', 'container', 'Booking Fields')} className="flex items-center saveur-resp-filters" style={{ flexShrink: 0 }}>
            {['Nom', 'Email', "Type d'\u00E9v\u00E9nement"].map((label, i) => (
              <div
                key={label}
                style={{
                  position: 'relative',
                  paddingRight: i < 2 ? '14px' : '0',
                  marginRight: i < 2 ? '14px' : '0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {i < 2 && (
                  <span className="saveur-resp-filter-divider" style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1px',
                    height: '20px',
                    backgroundColor: 'rgba(200, 169, 126, 0.2)',
                  }} />
                )}
                <span
                  {...elementProps(config.id, `filters.${i}.label`, 'text')}
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px',
                    cursor: 'default',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: 'none',
                    fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                    gap: '6px',
                  }}
                >
                  {label === 'Nom' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  )}
                  {label === 'Email' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  )}
                  {label === "Type d'\u00E9v\u00E9nement" && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                  )}
                  {label}
                  {label === "Type d'\u00E9v\u00E9nement" && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px', opacity: 0.6 }}><polyline points="6 9 12 15 18 9"/></svg>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="saveur-resp-reserve-btn" style={{ flex: '1 1 auto', minWidth: '0', display: 'flex', justifyContent: 'flex-end', marginLeft: '16px' }}>
            <div
              {...elementProps(config.id, 'primaryButton', 'button')}
              role="button"
              style={{
                backgroundColor: '#C8A97E',
                color: '#1C1917',
                borderRadius: '999px',
                paddingLeft: '28px',
                paddingRight: '28px',
                paddingTop: '12px',
                paddingBottom: '12px',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                letterSpacing: '0.03em',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#D9BB94' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#C8A97E' }}
            >
              {saveurBtnLabel}
            </div>
          </div>
        </div>

        {/* Prev button */}
        <div
          {...elementProps(config.id, 'prevButton', 'button')}
          role="button"
          onClick={saveurGoPrev}
          className="absolute z-10 flex items-center justify-center saveur-resp-nav-arrows"
          style={{
            left: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(200, 169, 126, 0.15)',
            border: '1px solid rgba(200, 169, 126, 0.22)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(200, 169, 126, 0.32)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(200, 169, 126, 0.15)' }}
          aria-label="Previous slide"
        >
          <span {...elementProps(config.id, 'prevIcon', 'icon', 'Chevron Left')}><ChevronLeft style={{ width: '24px', height: '24px', color: '#C8A97E' }} /></span>
        </div>

        {/* Next button */}
        <div
          {...elementProps(config.id, 'nextButton', 'button')}
          role="button"
          onClick={saveurGoNext}
          className="absolute z-10 flex items-center justify-center saveur-resp-nav-arrows"
          style={{
            right: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(200, 169, 126, 0.15)',
            border: '1px solid rgba(200, 169, 126, 0.22)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(200, 169, 126, 0.32)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(200, 169, 126, 0.15)' }}
          aria-label="Next slide"
        >
          <span {...elementProps(config.id, 'nextIcon', 'icon', 'Chevron Right')}><ChevronRight style={{ width: '24px', height: '24px', color: '#C8A97E' }} /></span>
        </div>

        {/* Bottom-left meta badge */}
        <div
          {...elementProps(config.id, 'slideMeta', 'container', 'Slide Info')}
          className="absolute z-10"
          style={{
            bottom: '100px',
            left: 'clamp(16px, 4vw, 80px)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(200, 169, 126, 0.1)',
            borderRadius: '4px',
            padding: '10px 18px',
            border: '1px solid rgba(200, 169, 126, 0.2)',
          }}
        >
          <div className="flex items-center" style={{ gap: '12px' }}>
            <span
              {...elementProps(config.id, `slides.${saveurActiveSlide}.name`, 'text')}
              style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', fontWeight: 400, color: '#FFFFFF', letterSpacing: '0.01em' }}
            >
              {saveurCurrentSlide.name}
            </span>
            <span {...elementProps(config.id, 'slideDivider', 'text', 'Divider')} style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '14px' }}>
              &middot;
            </span>
            <span
              {...elementProps(config.id, `slides.${saveurActiveSlide}.style`, 'text')}
              className="flex items-center"
              style={{ color: '#C8A97E', fontSize: '13px', gap: '4px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              {saveurCurrentSlide.style}
            </span>
          </div>
        </div>

        {/* Progress bar at very bottom */}
        <div
          {...elementProps(config.id, 'progressBar', 'container', 'Progress Bar')}
          className="absolute z-10"
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: 'rgba(200, 169, 126, 0.15)',
          }}
        >
          <div
            ref={saveurProgressRef}
            style={{
              height: '100%',
              backgroundColor: '#C8A97E',
              width: '0%',
              transition: 'width 5s linear',
            }}
          />
        </div>

        {/* Bottom-right slide counter dots */}
        <div
          {...elementProps(config.id, 'slideNav', 'container', 'Slide Nav')}
          className="absolute z-10 flex"
          style={{ bottom: '100px', right: 'clamp(16px, 4vw, 80px)', gap: '8px', alignItems: 'center' }}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              {...elementProps(config.id, `slides.${i}.dot`, 'button')}
              role="button"
              onClick={() => setSaveurActiveSlide(i)}
              style={{
                width: saveurActiveSlide === i ? '28px' : '6px',
                height: '6px',
                borderRadius: '999px',
                backgroundColor: saveurActiveSlide === i ? '#C8A97E' : 'rgba(255, 255, 255, 0.25)',
                cursor: 'pointer',
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
      </>
    )
  }

  // ─── VARIANT: ascent ───
  // Business coach / life coach premium : fullscreen diagonal-wipe slider, glassmorphism booking bar, luminous gold accents #E0B870
  if (variant === 'ascent') {
    const defaultHeroImages = [
      '', // placeholder — gradient fallback
      '', // placeholder — gradient fallback
      '', // placeholder — gradient fallback
    ]

    const rawHeroImages = (content as Record<string, unknown>).heroImages as (string | { id?: string; src?: string; alt?: string })[] | undefined
    const heroImages = rawHeroImages?.map(img => typeof img === 'string' ? img : img?.src).filter(Boolean) as string[] | undefined

    const slides = [
      { name: 'Lib\u00E9rez votre potentiel', style: 'Coaching Business', bg: 'linear-gradient(135deg, #111827 0%, #1a2540 50%, #111827 100%)', image: heroImages?.[0] ?? defaultHeroImages[0] },
      { name: 'Le succ\u00E8s commence par une d\u00E9cision', style: 'D\u00E9veloppement Personnel', bg: 'linear-gradient(135deg, #161f2e 0%, #111827 50%, #1e2d45 100%)', image: heroImages?.[1] ?? defaultHeroImages[1] },
      { name: 'Votre transformation commence ici', style: 'Life Coaching', bg: 'linear-gradient(135deg, #111827 0%, #1e2d45 50%, #161f2e 100%)', image: heroImages?.[2] ?? defaultHeroImages[2] },
    ]

    /* eslint-disable react-hooks/rules-of-hooks */
    const [ascentActiveSlide, setAscentActiveSlide] = useState(0)
    const ascentPrevSlideRef = useRef(0)
    const ascentTitleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const ascentProgressRef = useRef<HTMLDivElement>(null)

    const ascentGoNext = useCallback(() => {
      setAscentActiveSlide((prev) => {
        ascentPrevSlideRef.current = prev
        return (prev + 1) % slides.length
      })
    }, [])

    const ascentGoPrev = useCallback(() => {
      setAscentActiveSlide((prev) => {
        ascentPrevSlideRef.current = prev
        return (prev - 1 + slides.length) % slides.length
      })
    }, [])

    useEffect(() => {
      const interval = setInterval(ascentGoNext, 5000)
      return () => clearInterval(interval)
    }, [ascentGoNext])

    // Reset progress bar animation on slide change
    useEffect(() => {
      if (ascentProgressRef.current) {
        ascentProgressRef.current.style.transition = 'none'
        ascentProgressRef.current.style.width = '0%'
        // Force reflow
        void ascentProgressRef.current.offsetWidth
        ascentProgressRef.current.style.transition = 'width 5s linear'
        ascentProgressRef.current.style.width = '100%'
      }
    }, [ascentActiveSlide])
    /* eslint-enable react-hooks/rules-of-hooks */

    const ascentCurrentSlide = slides[ascentActiveSlide]
    const ascentBtnLabel = content.primaryButton?.label || 'R\u00E9server un appel d\u00E9couverte'

    return (
      <>
      {/* Ascent hero responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .ascent-resp-bookingbar { flex-direction: column !important; padding: 16px !important; border-radius: 16px !important; max-width: 90% !important; }
          .ascent-resp-filters { flex-direction: column !important; gap: 12px !important; width: 100% !important; }
          .ascent-resp-filter-divider { display: none !important; }
          .ascent-resp-reserve-btn { width: 100% !important; margin-left: 0 !important; margin-top: 8px !important; justify-content: center !important; }
          .ascent-resp-hero-title { font-size: clamp(2rem, 8vw, 3.5rem) !important; }
          .ascent-resp-hero-subtitle { font-size: 12px !important; }
          .ascent-resp-nav-arrows { display: none !important; }
        }
        @media (max-width: 480px) {
          .ascent-resp-bookingbar { margin: 0 16px; max-width: calc(100% - 32px) !important; }
        }
      ` }} />
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Hero Section')}
        className="relative overflow-hidden"
        style={{
          height: '100vh',
          backgroundColor: '#111827',
          color: '#FFFFFF',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        {/* Diagonal wipe — parallelogram translates uniformly */}
        {slides.map((slide, i) => {
          const isActive = ascentActiveSlide === i
          const isPrev = ascentPrevSlideRef.current === i && !isActive

          const visible = 'polygon(0% 0%, 130% 0%, 130% 100%, -20% 100%)'
          const hidden  = 'polygon(120% 0%, 250% 0%, 250% 100%, 100% 100%)'
          const full    = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                clipPath: isActive ? visible : isPrev ? full : hidden,
                opacity: isActive || isPrev ? 1 : 0,
                transition: isActive
                  ? 'clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1), opacity 0s'
                  : isPrev
                    ? 'none'
                    : 'clip-path 0s 1.3s, opacity 0s 1.3s',
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              }}
            >
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: slide.bg,
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 6s ease-out',
                  }}
                />
              )}
            </div>
          )
        })}

        {/* Dark navy overlay */}
        <div {...elementProps(config.id, 'overlay', 'container', 'Overlay')} className="absolute inset-0" style={{ backgroundColor: 'rgba(17, 24, 39, 0.38)', zIndex: 3 }} />
        {/* Gold glow — bottom left */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4, background: 'radial-gradient(ellipse at 10% 90%, rgba(224, 184, 112, 0.08) 0%, transparent 55%)' }} />

        {/* Content — bottom-left title + subtitle */}
        <div {...elementProps(config.id, 'centerContent', 'container', 'Hero Content')} className="relative flex flex-col justify-end h-full px-6" style={{ zIndex: 10, paddingBottom: '140px', paddingLeft: 'clamp(20px, 5vw, 80px)' }}>
          <div ref={ascentTitleRevealRef}>
            {/* Subtitle above title — slate, wide tracking */}
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              className="ascent-resp-hero-subtitle"
              style={{
                color: '#2D3748',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                marginBottom: '18px',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                textShadow: '0 1px 8px rgba(17, 24, 39, 0.5)',
              }}
            >
              {subtitle || 'COACH BUSINESS & D\u00C9VELOPPEMENT'}
            </p>
            {/* H1 title — confident, professional, with gold accent on key words */}
            <h1
              {...elementProps(config.id, 'title', 'heading')}
              className="ascent-resp-hero-title"
              style={{
                color: '#FFFFFF',
                fontWeight: 300,
                fontSize: 'clamp(2.875rem, 1.6429rem + 5.4762vw, 5.75rem)',
                lineHeight: '105%',
                maxWidth: '860px',
                textAlign: 'left',
                marginBottom: '0',
                marginTop: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {title ? (
                title
              ) : (
                <>
                  {ascentCurrentSlide.name.split(' ').slice(0, -1).join(' ')}{' '}
                  <span style={{ color: '#E0B870', fontWeight: 400 }}>{ascentCurrentSlide.name.split(' ').slice(-1)[0]}</span>
                </>
              )}
            </h1>
          </div>
        </div>

        {/* Glassmorphism booking bar at bottom */}
        <div
          {...elementProps(config.id, 'bookingBar', 'container', 'Booking Bar')}
          className="absolute z-10 flex items-center ascent-resp-bookingbar"
          style={{
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '999px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(17, 24, 39, 0.60)',
            padding: '6px 6px 6px 28px',
            gap: '0',
            maxWidth: '780px',
            width: '90%',
            border: '1px solid rgba(224, 184, 112, 0.22)',
          }}
        >
          {/* Booking fields */}
          <div {...elementProps(config.id, 'filtersRow', 'container', 'Booking Fields')} className="flex items-center ascent-resp-filters" style={{ flexShrink: 0 }}>
            {['Nom', 'Email', 'Objectif'].map((label, i) => (
              <div
                key={label}
                style={{
                  position: 'relative',
                  paddingRight: i < 2 ? '14px' : '0',
                  marginRight: i < 2 ? '14px' : '0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {i < 2 && (
                  <span className="ascent-resp-filter-divider" style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1px',
                    height: '20px',
                    backgroundColor: 'rgba(224, 184, 112, 0.2)',
                  }} />
                )}
                <span
                  {...elementProps(config.id, `filters.${i}.label`, 'text')}
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px',
                    cursor: 'default',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: 'none',
                    fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                    gap: '6px',
                  }}
                >
                  {label === 'Nom' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  )}
                  {label === 'Email' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  )}
                  {label === 'Objectif' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                  )}
                  {label}
                  {label === 'Objectif' && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px', opacity: 0.6 }}><polyline points="6 9 12 15 18 9"/></svg>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="ascent-resp-reserve-btn" style={{ flex: '1 1 auto', minWidth: '0', display: 'flex', justifyContent: 'flex-end', marginLeft: '16px' }}>
            <div
              {...elementProps(config.id, 'primaryButton', 'button')}
              role="button"
              style={{
                backgroundColor: '#E0B870',
                color: '#111827',
                borderRadius: '999px',
                paddingLeft: '28px',
                paddingRight: '28px',
                paddingTop: '12px',
                paddingBottom: '12px',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                letterSpacing: '0.03em',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#ECC882' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#E0B870' }}
            >
              {ascentBtnLabel}
            </div>
          </div>
        </div>

        {/* Prev button */}
        <div
          {...elementProps(config.id, 'prevButton', 'button')}
          role="button"
          onClick={ascentGoPrev}
          className="absolute z-10 flex items-center justify-center ascent-resp-nav-arrows"
          style={{
            left: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(224, 184, 112, 0.12)',
            border: '1px solid rgba(224, 184, 112, 0.22)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(224, 184, 112, 0.28)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(224, 184, 112, 0.12)' }}
          aria-label="Previous slide"
        >
          <span {...elementProps(config.id, 'prevIcon', 'icon', 'Chevron Left')}><ChevronLeft style={{ width: '24px', height: '24px', color: '#E0B870' }} /></span>
        </div>

        {/* Next button */}
        <div
          {...elementProps(config.id, 'nextButton', 'button')}
          role="button"
          onClick={ascentGoNext}
          className="absolute z-10 flex items-center justify-center ascent-resp-nav-arrows"
          style={{
            right: 'clamp(16px, 4vw, 60px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(40px, 6vw, 56px)',
            height: 'clamp(40px, 6vw, 56px)',
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(224, 184, 112, 0.12)',
            border: '1px solid rgba(224, 184, 112, 0.22)',
            cursor: 'pointer',
            transition: 'transform 0.5s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(224, 184, 112, 0.28)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(224, 184, 112, 0.12)' }}
          aria-label="Next slide"
        >
          <span {...elementProps(config.id, 'nextIcon', 'icon', 'Chevron Right')}><ChevronRight style={{ width: '24px', height: '24px', color: '#E0B870' }} /></span>
        </div>

        {/* Bottom-left meta badge */}
        <div
          {...elementProps(config.id, 'slideMeta', 'container', 'Slide Info')}
          className="absolute z-10"
          style={{
            bottom: '100px',
            left: 'clamp(16px, 4vw, 80px)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(224, 184, 112, 0.08)',
            borderRadius: '4px',
            padding: '10px 18px',
            border: '1px solid rgba(224, 184, 112, 0.18)',
          }}
        >
          <div className="flex items-center" style={{ gap: '12px' }}>
            <span
              {...elementProps(config.id, `slides.${ascentActiveSlide}.name`, 'text')}
              style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', fontWeight: 400, color: '#FFFFFF', letterSpacing: '0.01em' }}
            >
              {ascentCurrentSlide.name}
            </span>
            <span {...elementProps(config.id, 'slideDivider', 'text', 'Divider')} style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '14px' }}>
              &middot;
            </span>
            <span
              {...elementProps(config.id, `slides.${ascentActiveSlide}.style`, 'text')}
              className="flex items-center"
              style={{ color: '#E0B870', fontSize: '13px', gap: '4px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              {ascentCurrentSlide.style}
            </span>
          </div>
        </div>

        {/* Progress bar at very bottom */}
        <div
          {...elementProps(config.id, 'progressBar', 'container', 'Progress Bar')}
          className="absolute z-10"
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: 'rgba(224, 184, 112, 0.12)',
          }}
        >
          <div
            ref={ascentProgressRef}
            style={{
              height: '100%',
              backgroundColor: '#E0B870',
              width: '0%',
              transition: 'width 5s linear',
            }}
          />
        </div>

        {/* Bottom-right slide counter dots */}
        <div
          {...elementProps(config.id, 'slideNav', 'container', 'Slide Nav')}
          className="absolute z-10 flex"
          style={{ bottom: '100px', right: 'clamp(16px, 4vw, 80px)', gap: '8px', alignItems: 'center' }}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              {...elementProps(config.id, `slides.${i}.dot`, 'button')}
              role="button"
              onClick={() => setAscentActiveSlide(i)}
              style={{
                width: ascentActiveSlide === i ? '28px' : '6px',
                height: '6px',
                borderRadius: '999px',
                backgroundColor: ascentActiveSlide === i ? '#E0B870' : 'rgba(255, 255, 255, 0.25)',
                cursor: 'pointer',
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
      </>
    )
  }

  // fallback → startup
  return <HeroSection config={{ ...config, variant: 'startup' }} isEditing={isEditing} />
}

// ─── ZMR AGENCY HERO (integrated header + fullscreen bg + overlays) ───
function ZmrAgencyHero({ config, content, bgImage, customTextColor }: {
  config: SectionConfig
  content: Partial<HeroContent>
  bgImage?: string
  customTextColor?: string
}) {
  // Support multiple videos: videoUrl can be comma-separated or videoUrls array
  const videoUrls: string[] = (() => {
    const urls = (content as Record<string, unknown>).videoUrls as string[] | undefined
    if (urls?.length) return urls
    if (content.videoUrl) return content.videoUrl.split(',').map((u: string) => u.trim()).filter(Boolean)
    return []
  })()

  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Play next video when current one ends
  const handleEnded = useCallback(() => {
    if (videoUrls.length <= 1) {
      // Single video: loop
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play()
      }
      return
    }
    setCurrentIndex(prev => (prev + 1) % videoUrls.length)
  }, [videoUrls.length])

  // Auto-play when index changes
  useEffect(() => {
    if (videoRef.current && videoUrls.length > 0) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
  }, [currentIndex, videoUrls.length])

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ fontFamily: 'var(--font-body, inherit)', height: '100vh', background: '#0a0a0a' }}
    >
      {/* Background Video or Image */}
      {videoUrls.length > 0 ? (
        <video
          key={currentIndex}
          ref={videoRef}
          src={videoUrls[currentIndex]}
          autoPlay
          muted
          playsInline
          onEnded={handleEnded}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: ((content as Record<string, unknown>).videoPositions as string[] | undefined)?.[currentIndex] ?? 'center center' }}
        />
      ) : bgImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
      )}
    </section>
  )
}

export const heroMeta = {
  type: 'hero',
  label: 'Hero',
  icon: '⚡',
  variants: ['startup', 'corporate', 'luxe', 'creative', 'ecommerce', 'glass', 'brixsa-page', 'brixsa', 'zmr-agency', 'zmr-talent-profile', 'braise', 'forge', 'ciseaux', 'atelier', 'encre', 'serenite', 'pulse', 'saveur', 'ascent'],
  defaultVariant: 'startup',
  defaultContent: {},
}
