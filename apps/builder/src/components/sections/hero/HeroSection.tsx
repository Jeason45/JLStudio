'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
// createPortal removed — header/menu/search overlays now handled by SiteHeaderSection
import { cn } from '@/lib/utils'
import { elementProps } from '@/lib/elementHelpers'
import type { HeroConfig, HeroContent } from '@/types/sections'
import type { SectionConfig } from '@/types/site'
import { Play, ShieldCheck, Star, Truck, ArrowRight, ChevronLeft, ChevronRight, MapPin, Search, User } from 'lucide-react'
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
        {/* Background image with parallax feel */}
        {(bgImage || heroImage) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            {...elementProps(config.id, 'image', 'image')}
            src={bgImage || heroImage!}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-105"
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
            style={customTextColor ? { color: customTextColor } : undefined}
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
    return (
      <section className="relative bg-[#f5f0e8] overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-10">
          {/* Text */}
          <div className={cn("flex-1 space-y-6", textAlign && getTextAlignClass(textAlign))}>
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
            <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-600 max-w-lg leading-relaxed">{subtitle}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white border-2 rounded-none transition-all hover:translate-x-0.5 hover:-translate-y-0.5 shadow-[4px_4px_0_0_#18181b] hover:shadow-[6px_6px_0_0_#18181b]"
                  style={{ backgroundColor: accent, borderColor: accent }}
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
          <div className="flex-1 max-w-lg w-full relative">
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
            {content.eyebrow && (
              <div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center text-white text-[10px] font-black uppercase rotate-12 shadow-lg"
                style={{ backgroundColor: accent }}
              >
                NEW!
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
  variants: ['startup', 'corporate', 'luxe', 'creative', 'ecommerce', 'glass', 'brixsa-page', 'brixsa', 'zmr-agency', 'zmr-talent-profile'],
  defaultVariant: 'startup',
  defaultContent: {},
}
