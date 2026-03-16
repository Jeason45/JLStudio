import { cn } from '@/lib/utils'
import { elementProps } from '@/lib/elementHelpers'
import type { CTAConfig, CTAContent } from '@/types/sections'
import type { SectionConfig } from '@/types/site'
import { getTitleSizeClass, getTextAlignClass } from '../_utils'
import { EditablePlaceholder } from '../_EditablePlaceholder'
import { Play } from 'lucide-react'

interface CTASectionProps {
  config: SectionConfig
  isEditing?: boolean
}

export function CTASection({ config, isEditing }: CTASectionProps) {
  const cta = config as CTAConfig
  const content = (cta.content ?? {}) as Partial<CTAContent>
  const { accentColor, titleSize, textAlign, textColor } = config.style
  const variant = config.variant ?? 'startup-centered'
  const universe = variant.split('-')[0]
  const layout = variant.replace(universe + '-', '')

  const title = content.title ?? 'Pret a vous lancer ?'
  const subtitle = content.subtitle
  const badge = content.badge

  // ═══════════════════════════════════════════
  // STARTUP — SaaS moderne
  // ═══════════════════════════════════════════

  if (universe === 'startup') {
    const accent = accentColor ?? '#6366f1'

    const badgeEl = badge ? (
      <span {...elementProps(config.id, 'badge', 'badge')} className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border border-zinc-200 text-zinc-600 bg-white shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
        {badge}
      </span>
    ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />

    const primaryBtn = content.primaryButton && (
      <a
        {...elementProps(config.id, 'primaryButton', 'button')}
        href={content.primaryButton.href}
        className="px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-all hover:scale-[1.02]"
        style={{
          backgroundColor: accent,
          boxShadow: `0 8px 30px ${accent}40, 0 2px 8px ${accent}30`,
        }}
      >
        {content.primaryButton.label}
      </a>
    )

    const secondaryBtn = content.secondaryButton && (
      <a
        {...elementProps(config.id, 'secondaryButton', 'button')}
        href={content.secondaryButton.href}
        className="px-8 py-3.5 rounded-full font-semibold text-sm border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors"
      >
        {content.secondaryButton.label}
      </a>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className={cn("max-w-4xl mx-auto px-6 text-center space-y-6", textAlign && getTextAlignClass(textAlign))}>
            {badgeEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 max-w-xl mx-auto">{subtitle}</p>}
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              {primaryBtn}
              {secondaryBtn}
            </div>
          </div>
        </section>
      )
    }

    // Split
    if (layout === 'split') {
      return (
        <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 flex-1">
              {badgeEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-500 max-w-md">{subtitle}</p>}
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              {primaryBtn}
              {secondaryBtn}
            </div>
          </div>
        </section>
      )
    }

    // Card
    return (
      <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div
            className={cn("rounded-3xl p-10 md:p-14 text-center space-y-6", textAlign && getTextAlignClass(textAlign))}
            style={{
              background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
              boxShadow: `0 20px 60px ${accent}30`,
            }}
          >
            {badge ? (
              <span {...elementProps(config.id, 'badge', 'badge')} className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border border-white/30 text-white/80">
                {badge}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-white leading-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/80 max-w-xl mx-auto">{subtitle}</p>}
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-8 py-3.5 rounded-full font-semibold text-sm bg-white hover:bg-white/90 transition-colors"
                  style={{ color: accent }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-8 py-3.5 rounded-full font-semibold text-sm border border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  {content.secondaryButton.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CORPORATE — Entreprise / Finance
  // ═══════════════════════════════════════════

  if (universe === 'corporate') {
    const accent = accentColor ?? '#3b82f6'

    const badgeEl = badge ? (
      <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs font-semibold px-3 py-1 rounded border text-blue-300 border-blue-500/30 bg-blue-500/10">
        {badge}
      </span>
    ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />

    const primaryBtn = content.primaryButton && (
      <a
        {...elementProps(config.id, 'primaryButton', 'button')}
        href={content.primaryButton.href}
        className="px-8 py-3.5 rounded-lg font-semibold text-sm text-white transition-colors hover:brightness-110"
        style={{ backgroundColor: accent }}
      >
        {content.primaryButton.label}
      </a>
    )

    const secondaryBtn = content.secondaryButton && (
      <a
        {...elementProps(config.id, 'secondaryButton', 'button')}
        href={content.secondaryButton.href}
        className="px-8 py-3.5 rounded-lg font-semibold text-sm border text-white hover:bg-white/5 transition-colors"
        style={{ borderColor: `${accent}60` }}
      >
        {content.secondaryButton.label}
      </a>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="bg-slate-900 py-20 noise-overlay relative" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className={cn("relative max-w-4xl mx-auto px-6 text-center space-y-6", textAlign && getTextAlignClass(textAlign))}>
            {badgeEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-white leading-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-slate-400 max-w-xl mx-auto">{subtitle}</p>}
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              {primaryBtn}
              {secondaryBtn}
            </div>
          </div>
        </section>
      )
    }

    // Split
    if (layout === 'split') {
      return (
        <section className="bg-slate-900 py-20 noise-overlay relative" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="relative max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 flex-1">
              {badgeEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-white leading-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-slate-400 max-w-md">{subtitle}</p>}
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              {primaryBtn}
              {secondaryBtn}
            </div>
          </div>
        </section>
      )
    }

    // Card
    return (
      <section className="bg-slate-900 py-20 noise-overlay relative" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="relative max-w-4xl mx-auto px-6">
          <div className={cn("rounded-xl p-10 md:p-14 text-center space-y-6 bg-slate-800/60 border border-slate-700/50", textAlign && getTextAlignClass(textAlign))}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent rounded-t-xl" />
            {badge ? (
              <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs font-semibold px-3 py-1 rounded border text-blue-300 border-blue-500/30 bg-blue-500/10">
                {badge}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-white leading-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-slate-400 max-w-xl mx-auto">{subtitle}</p>}
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-8 py-3.5 rounded-lg font-semibold text-sm text-white transition-colors hover:brightness-110"
                  style={{ backgroundColor: accent }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-8 py-3.5 rounded-lg font-semibold text-sm border border-slate-600 text-white hover:bg-white/5 transition-colors"
                >
                  {content.secondaryButton.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // LUXE — Hotellerie / Mode / Joaillerie
  // ═══════════════════════════════════════════

  if (universe === 'luxe') {
    const gold = accentColor ?? '#b8860b'

    const badgeEl = badge ? (
      <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs tracking-[0.25em] uppercase font-light" style={{ color: gold }}>
        {badge}
      </span>
    ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />

    const primaryBtn = content.primaryButton && (
      <a
        {...elementProps(config.id, 'primaryButton', 'button')}
        href={content.primaryButton.href}
        className="px-10 py-3.5 font-light text-sm tracking-[0.15em] uppercase border transition-colors hover:bg-opacity-10"
        style={{ borderColor: gold, color: gold }}
      >
        {content.primaryButton.label}
      </a>
    )

    const secondaryBtn = content.secondaryButton && (
      <a
        {...elementProps(config.id, 'secondaryButton', 'button')}
        href={content.secondaryButton.href}
        className="px-10 py-3.5 font-light text-sm tracking-[0.15em] uppercase text-zinc-400 border border-zinc-200 hover:border-zinc-300 transition-colors"
      >
        {content.secondaryButton.label}
      </a>
    )

    // Centered
    if (layout === 'centered') {
      const bgImage = config.style.backgroundImage
      const hasBgImage = !!bgImage?.url
      return (
        <section className={cn(hasBgImage ? 'relative py-32' : 'bg-white py-24')} style={{ fontFamily: 'var(--font-body, inherit)' }}>
          {hasBgImage && (
            <>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage.url})`, backgroundAttachment: bgImage.attachment || 'scroll' }} />
              <div className="absolute inset-0" style={{ backgroundColor: bgImage.overlayColor || '#000', opacity: bgImage.overlayOpacity ?? 0.7 }} />
            </>
          )}
          <div className={cn("max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10", textAlign && getTextAlignClass(textAlign))}>
            {content.icon === 'play' && (
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-zinc-900 ml-1" fill="currentColor" />
                </div>
              </div>
            )}
            {badgeEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light leading-tight tracking-tight", hasBgImage ? 'text-white' : 'text-zinc-900', titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
            {!hasBgImage && <div className="w-12 h-px mx-auto" style={{ background: gold }} />}
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className={cn("text-base max-w-xl mx-auto tracking-wide font-light", hasBgImage ? 'text-white/70' : 'text-zinc-400')}>{subtitle}</p>}
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              {primaryBtn}
              {secondaryBtn}
            </div>
          </div>
        </section>
      )
    }

    // Split
    if (layout === 'split') {
      return (
        <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-5 flex-1">
              {badgeEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light text-zinc-900 leading-tight tracking-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
              <div className="w-12 h-px" style={{ background: gold }} />
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-400 max-w-md tracking-wide font-light">{subtitle}</p>}
            </div>
            <div className="flex flex-col gap-4 shrink-0">
              {primaryBtn}
              {secondaryBtn}
            </div>
          </div>
        </section>
      )
    }

    // Card
    return (
      <section className="bg-zinc-50 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className={cn("bg-white p-10 md:p-16 text-center space-y-6 border border-zinc-100", textAlign && getTextAlignClass(textAlign))}>
            <div className="w-16 h-px mx-auto" style={{ background: gold }} />
            {badge ? (
              <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs tracking-[0.25em] uppercase font-light" style={{ color: gold }}>
                {badge}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light text-zinc-900 leading-tight tracking-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-400 max-w-xl mx-auto tracking-wide font-light">{subtitle}</p>}
            <div className="w-16 h-px mx-auto" style={{ background: gold }} />
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-10 py-3.5 font-light text-sm tracking-[0.15em] uppercase text-white transition-colors"
                  style={{ backgroundColor: gold }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-10 py-3.5 font-light text-sm tracking-[0.15em] uppercase border transition-colors"
                  style={{ borderColor: gold, color: gold }}
                >
                  {content.secondaryButton.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CREATIVE — Agence / Portfolio / Studio
  // ═══════════════════════════════════════════

  if (universe === 'creative') {
    const badgeEl = badge ? (
      <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 border-2 border-zinc-900 text-zinc-900 bg-yellow-300">
        {badge}
      </span>
    ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />

    const primaryBtn = content.primaryButton && (
      <a
        {...elementProps(config.id, 'primaryButton', 'button')}
        href={content.primaryButton.href}
        className="px-8 py-3.5 font-bold text-sm uppercase tracking-wider border-2 border-zinc-900 bg-zinc-900 text-white hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform shadow-[4px_4px_0_0_#18181b] hover:shadow-[6px_6px_0_0_#18181b]"
      >
        {content.primaryButton.label}
      </a>
    )

    const secondaryBtn = content.secondaryButton && (
      <a
        {...elementProps(config.id, 'secondaryButton', 'button')}
        href={content.secondaryButton.href}
        className="px-8 py-3.5 font-bold text-sm uppercase tracking-wider border-2 border-zinc-900 text-zinc-900 bg-white hover:bg-zinc-100 transition-colors"
      >
        {content.secondaryButton.label}
      </a>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="bg-[#f5f0e8] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className={cn("max-w-4xl mx-auto px-6 text-center space-y-6", textAlign && getTextAlignClass(textAlign))}>
            {badgeEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-5xl font-black text-zinc-900 leading-[0.95] uppercase", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-600 max-w-lg mx-auto">{subtitle}</p>}
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              {primaryBtn}
              {secondaryBtn}
            </div>
          </div>
        </section>
      )
    }

    // Split
    if (layout === 'split') {
      return (
        <section className="bg-[#f5f0e8] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 flex-1">
              {badgeEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-5xl font-black text-zinc-900 leading-[0.95] uppercase", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-600 max-w-md">{subtitle}</p>}
            </div>
            <div className="flex flex-col gap-4 shrink-0">
              {primaryBtn}
              {secondaryBtn}
            </div>
          </div>
        </section>
      )
    }

    // Card
    return (
      <section className="bg-[#f5f0e8] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className={cn("bg-white border-2 border-zinc-900 p-10 md:p-14 text-center space-y-6 shadow-[8px_8px_0_0_#18181b]", textAlign && getTextAlignClass(textAlign))}>
            {badge ? (
              <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 border-2 border-zinc-900 text-zinc-900 bg-yellow-300">
                {badge}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-5xl font-black text-zinc-900 leading-[0.95] uppercase", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-600 max-w-lg mx-auto">{subtitle}</p>}
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-8 py-3.5 font-bold text-sm uppercase tracking-wider border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-8 py-3.5 font-bold text-sm uppercase tracking-wider border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-100 transition-colors"
                >
                  {content.secondaryButton.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // ECOMMERCE — Boutique / Marketplace
  // ═══════════════════════════════════════════

  if (universe === 'ecommerce') {
    const accent = accentColor ?? '#059669'

    const badgeEl = badge ? (
      <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>
        {badge}
      </span>
    ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />

    const primaryBtn = content.primaryButton && (
      <a
        {...elementProps(config.id, 'primaryButton', 'button')}
        href={content.primaryButton.href}
        className="px-8 py-3.5 rounded-xl font-semibold text-sm text-white transition-colors hover:brightness-110"
        style={{ backgroundColor: accent }}
      >
        {content.primaryButton.label}
        <span className="ml-2 text-xs opacity-80">- gratuit</span>
      </a>
    )

    const secondaryBtn = content.secondaryButton && (
      <a
        {...elementProps(config.id, 'secondaryButton', 'button')}
        href={content.secondaryButton.href}
        className="px-8 py-3.5 rounded-xl font-semibold text-sm border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors"
      >
        {content.secondaryButton.label}
      </a>
    )

    const trustBadges = (
      <div className="flex items-center justify-center gap-4 text-xs text-zinc-400 pt-2">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Paiement securise
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Satisfait ou rembourse
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Livraison 24h
        </span>
      </div>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className={cn("max-w-4xl mx-auto px-6 text-center space-y-5", textAlign && getTextAlignClass(textAlign))}>
            {badgeEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-500 max-w-xl mx-auto">{subtitle}</p>}
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              {primaryBtn}
              {secondaryBtn}
            </div>
            {trustBadges}
          </div>
        </section>
      )
    }

    // Split
    if (layout === 'split') {
      return (
        <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 flex-1">
              {badgeEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-500 max-w-md">{subtitle}</p>}
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Paiement securise
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Satisfait ou rembourse
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              {primaryBtn}
              {secondaryBtn}
            </div>
          </div>
        </section>
      )
    }

    // Card
    return (
      <section className="bg-zinc-50 py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className={cn("rounded-2xl p-10 md:p-14 text-center space-y-5 bg-white border border-zinc-100 shadow-sm", textAlign && getTextAlignClass(textAlign))}>
            {badge ? (
              <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>
                {badge}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-500 max-w-xl mx-auto">{subtitle}</p>}
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-8 py-3.5 rounded-xl font-semibold text-sm text-white transition-colors hover:brightness-110"
                  style={{ backgroundColor: accent }}
                >
                  {content.primaryButton.label}
                  <span className="ml-2 text-xs opacity-80">- gratuit</span>
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-8 py-3.5 rounded-xl font-semibold text-sm border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors"
                >
                  {content.secondaryButton.label}
                </a>
              )}
            </div>
            {trustBadges}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // GLASS — IA / Crypto / Tech
  // ═══════════════════════════════════════════

  if (universe === 'glass') {
    const accent = accentColor ?? '#818cf8'

    const badgeEl = badge ? (
      <span {...elementProps(config.id, 'badge', 'badge')} className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/[0.04] backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}80` }} />
        {badge}
      </span>
    ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />

    const primaryBtn = content.primaryButton && (
      <a
        {...elementProps(config.id, 'primaryButton', 'button')}
        href={content.primaryButton.href}
        className="relative px-8 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[1.02] overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accent}, ${accent}aa)`,
          boxShadow: `0 0 30px ${accent}30, 0 0 10px ${accent}20`,
        }}
      >
        {content.primaryButton.label}
      </a>
    )

    const secondaryBtn = content.secondaryButton && (
      <a
        {...elementProps(config.id, 'secondaryButton', 'button')}
        href={content.secondaryButton.href}
        className="px-8 py-3.5 rounded-xl font-semibold text-sm border border-white/10 text-white/70 hover:bg-white/[0.06] backdrop-blur-sm transition-colors"
      >
        {content.secondaryButton.label}
      </a>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="bg-zinc-950 py-20 noise-overlay relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 dot-grid" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${accent}20, transparent 70%)` }}
          />
          <div className={cn("relative max-w-4xl mx-auto px-6 text-center space-y-6", textAlign && getTextAlignClass(textAlign))}>
            {badgeEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold gradient-text leading-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/40 max-w-xl mx-auto">{subtitle}</p>}
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              {primaryBtn}
              {secondaryBtn}
            </div>
          </div>
        </section>
      )
    }

    // Split
    if (layout === 'split') {
      return (
        <section className="bg-zinc-950 py-20 noise-overlay relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 dot-grid" />
          <div
            className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${accent}30, transparent 70%)` }}
          />
          <div className="relative max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 flex-1">
              {badgeEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold gradient-text leading-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-white/40 max-w-md">{subtitle}</p>}
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              {primaryBtn}
              {secondaryBtn}
            </div>
          </div>
        </section>
      )
    }

    // Card
    return (
      <section className="bg-zinc-950 py-20 noise-overlay relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="absolute inset-0 dot-grid" />
        <div className="relative max-w-4xl mx-auto px-6">
          <div className={cn("bg-white/[0.04] backdrop-blur-xl rounded-2xl p-10 md:p-14 text-center space-y-6 border border-white/[0.08] relative overflow-hidden", textAlign && getTextAlignClass(textAlign))}>
            {/* Glow accent line at top */}
            <div className="absolute top-0 left-[15%] right-[15%] h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
            {badge ? (
              <span {...elementProps(config.id, 'badge', 'badge')} className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/[0.04]">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}80` }} />
                {badge}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold gradient-text leading-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/40 max-w-xl mx-auto">{subtitle}</p>}
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-8 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${accent}, ${accent}aa)`,
                    boxShadow: `0 0 30px ${accent}30`,
                  }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-8 py-3.5 rounded-xl font-semibold text-sm border border-white/10 text-white/70 hover:bg-white/[0.06] backdrop-blur-sm transition-colors"
                >
                  {content.secondaryButton.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CANOPY — Nature / Organique premium
  // ═══════════════════════════════════════════

  if (variant === 'canopy-banner') {
    const scrollRevealRef = (delay: number) => (el: HTMLElement | null) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(24px)'
      el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
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
      <>
        <style dangerouslySetInnerHTML={{ __html: `
          .canopy-cta-btn {
            transition: background-color 0.3s ease, transform 0.3s ease;
          }
          .canopy-cta-btn:hover {
            background-color: #F0EDE8 !important;
            transform: scale(1.02);
          }
        ` }} />
        <section
          {...elementProps(config.id, 'wrapper', 'container', 'CTA Section')}
          style={{
            backgroundColor: '#2D5016',
            padding: 'clamp(60px, 10vw, 120px) 24px',
            fontFamily: 'var(--font-body, inherit)',
          }}
        >
          <div style={{ maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
            <h2
              ref={scrollRevealRef(0)}
              {...elementProps(config.id, 'title', 'heading')}
              style={{
                fontSize: 'clamp(36px, 5vw, 44px)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: 16,
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                ref={scrollRevealRef(0.15)}
                {...elementProps(config.id, 'subtitle', 'text')}
                style={{
                  fontSize: 16,
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.6,
                  marginBottom: 32,
                }}
              >
                {subtitle}
              </p>
            )}
            {content.primaryButton && (
              <div ref={scrollRevealRef(0.3)}>
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="canopy-cta-btn"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#FFFFFF',
                    color: '#2D5016',
                    padding: '16px 40px',
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.1em',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                >
                  {content.primaryButton.label || 'Commencer'}
                </a>
              </div>
            )}
          </div>
        </section>
      </>
    )
  }

  // ═══════════════════════════════════════════
  // NACRE — Nail Salon CTA
  // ═══════════════════════════════════════════

  if (variant === 'obscura-centered') {
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

    const scrollRevealDelayRef = (delay: number) => (el: HTMLDivElement | null) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.disconnect()
        }
      }, { threshold: 0.15 })
      obs.observe(el)
    }

    const bgImage = (content as Record<string, unknown>).backgroundImage as string | undefined

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'CTA Section')}
        style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-body, inherit)',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <div {...elementProps(config.id, 'bgWrapper', 'container', 'Background')} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {bgImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={bgImage}
              alt=""
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1a1a18, #0A0A0A, #0d0d0a)' }} />
          )}
          {/* Overlay */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10, 10, 10, 0.7)' }} />
        </div>

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '700px',
            textAlign: 'center',
            padding: 'clamp(40px, 8vw, 100px) clamp(20px, 5vw, 60px)',
          }}
        >
          <div ref={scrollRevealRef}>
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              className={cn(titleSize && getTitleSizeClass(titleSize))}
              style={{
                fontFamily: '"GeneralSans Variable", sans-serif',
                fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                fontWeight: 500,
                lineHeight: '115%',
                color: textColor ?? '#E8E4DF',
                marginBottom: '20px',
              }}
            >
              {content.title || 'Racontons votre histoire'}
            </h2>
          </div>
          <div ref={scrollRevealDelayRef(0.15)}>
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              style={{
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: '160%',
                color: 'rgba(232, 228, 223, 0.6)',
                marginBottom: '40px',
              }}
            >
              {subtitle || 'Chaque image mérite d\'être exceptionnelle'}
            </p>
          </div>
          <div ref={scrollRevealDelayRef(0.3)}>
            <a
              {...elementProps(config.id, 'primaryButton', 'button')}
              href={content.primaryButton?.href ?? '/contact'}
              style={{
                display: 'inline-block',
                backgroundColor: 'transparent',
                color: '#D4A853',
                border: '1px solid #D4A853',
                borderRadius: '0px',
                padding: '14px 36px',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: '"Inter Variable", var(--font-body, sans-serif)',
                cursor: 'pointer',
                transition: 'background-color 0.3s, color 0.3s',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#D4A853'; e.currentTarget.style.color = '#0A0A0A' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#D4A853' }}
            >
              {content.primaryButton?.label || 'Réserver une séance'}
            </a>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'nacre-centered') {
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

    const scrollRevealDelayRef = (delay: number) => (el: HTMLDivElement | null) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.disconnect()
        }
      }, { threshold: 0.15 })
      obs.observe(el)
    }

    const bgImage = (content as Record<string, unknown>).backgroundImage as string | undefined

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'CTA Section')}
        style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-body, inherit)',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <div {...elementProps(config.id, 'bgWrapper', 'container', 'Background')} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {bgImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={bgImage}
              alt=""
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #3d2228, #2A1A1E, #1d1015)' }} />
          )}
          {/* Overlay — bordeaux tint */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(42, 26, 30, 0.7)' }} />
        </div>

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '700px',
            textAlign: 'center',
            padding: 'clamp(40px, 8vw, 100px) clamp(20px, 5vw, 60px)',
          }}
        >
          <div ref={scrollRevealRef}>
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              className={cn(titleSize && getTitleSizeClass(titleSize))}
              style={{
                fontFamily: '"GeneralSans Variable", sans-serif',
                fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                fontWeight: 500,
                lineHeight: '115%',
                color: textColor ?? '#F0E0DA',
                marginBottom: '20px',
              }}
            >
              {content.title || 'Prenez soin de vous'}
            </h2>
          </div>
          <div ref={scrollRevealDelayRef(0.15)}>
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              style={{
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: '160%',
                color: 'rgba(240, 224, 218, 0.7)',
                marginBottom: '40px',
              }}
            >
              {subtitle || 'R\u00E9servez votre moment de d\u00E9tente'}
            </p>
          </div>
          <div ref={scrollRevealDelayRef(0.3)}>
            <a
              {...elementProps(config.id, 'primaryButton', 'button')}
              href={content.primaryButton?.href ?? '/reservation'}
              style={{
                display: 'inline-block',
                backgroundColor: '#C9A96E',
                color: '#2A1A1E',
                borderRadius: '4px',
                padding: '14px 36px',
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: '"Inter Variable", var(--font-body, sans-serif)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s, transform 0.3s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#b8953d' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#C9A96E' }}
            >
              {content.primaryButton?.label || 'R\u00E9server maintenant'}
            </a>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRIXSA — Agence / Dark premium
  // ═══════════════════════════════════════════

  if (variant === 'brixsa-centered') {
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

    const bgImage = (content as Record<string, unknown>).backgroundImage as string | undefined

    const isPreview = !isEditing

    return (
      <>
      {/* Brixsa CTA responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .brixsa-resp-cta-content { flex-direction: column !important; gap: 24px !important; text-align: center !important; align-items: center !important; }
        }
      ` }} />
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'CTA Section')}
        style={{
          position: 'relative',
          color: '#e1e1e1',
          zIndex: 2,
          // Tall section: the extra height is the "travel distance" for the sticky text
          minHeight: isPreview ? '180vh' : '100vh',
          fontFamily: 'var(--font-body, inherit)',
          backgroundColor: '#140c08',
        }}
      >
        {/* Background image — scrolls with section, covers full section */}
        <div {...elementProps(config.id, 'bgWrapper', 'container', 'Background')} style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          {bgImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={bgImage}
              alt=""
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
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #374151, #1f2937, #111827)' }} />
          )}
          {/* Overlay */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
        </div>

        {/* Content — sticky in preview:
            - Text starts at TOP of image
            - As image scrolls up, text stays sticky at top:15vh
            - Text appears to "slide down" relative to the image
            - When section bottom reaches text, it pushes text up → footer revealed */}
        <div
          style={{
            position: isPreview ? 'sticky' : 'absolute',
            top: isPreview ? '15vh' : 0,
            left: 0,
            right: 0,
            zIndex: 2,
            padding: 'clamp(20px, 5vw, 60px)',
            ...(isPreview ? {} : { bottom: 0, display: 'flex', alignItems: 'center', height: '100%' }),
          }}
        >
          <div className="w-full mx-auto" style={{ maxWidth: 1320, paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)' }}>
            <div className="flex flex-row justify-between items-center brixsa-resp-cta-content" style={{ gap: 16 }}>
              {/* LEFT — Subtitle */}
              <p
                {...elementProps(config.id, 'subtitle', 'text')}
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  lineHeight: '150%',
                  flex: '0 40%',
                  maxWidth: 130,
                  color: '#e1e1e1',
                  whiteSpace: 'pre-line',
                }}
              >
                {subtitle || 'Interested?\nGet in touch'}
              </p>

              {/* RIGHT — CTA block */}
              <div style={{ maxWidth: 590 }}>
                <div ref={scrollRevealRef}>
                  <h2
                    {...elementProps(config.id, 'title', 'heading')}
                    className={cn(titleSize && getTitleSizeClass(titleSize))}
                    style={{
                      fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                      fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                      fontWeight: 500,
                      lineHeight: '110%',
                      textTransform: 'capitalize',
                      color: textColor ?? '#e1e1e1',
                      marginBottom: 40,
                    }}
                  >
                    {content.title || 'Are You Looking To Buy Or Rent A Property?'}
                  </h2>
                </div>
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton?.href}
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(158,158,158,0.6)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    color: '#e1e1e1',
                    borderRadius: 4,
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingTop: 12,
                    paddingBottom: 12,
                    fontSize: 18,
                    fontWeight: 500,
                    fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'opacity 0.3s, transform 0.3s',
                  }}
                >
                  {content.primaryButton?.label || 'Get in touch'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    )
  }

  // Fallback -> startup-centered
  return <CTASection config={{ ...config, variant: 'startup-centered' }} isEditing={isEditing} />
}

export const ctaMeta = {
  type: 'cta',
  label: 'Call to Action',
  icon: '🎯',
  variants: [
    'startup-centered', 'startup-split', 'startup-card',
    'corporate-centered', 'corporate-split', 'corporate-card',
    'luxe-centered', 'luxe-split', 'luxe-card',
    'creative-centered', 'creative-split', 'creative-card',
    'ecommerce-centered', 'ecommerce-split', 'ecommerce-card',
    'glass-centered', 'glass-split', 'glass-card',
    'canopy-banner',
    'obscura-centered',
    'nacre-centered',
    'brixsa-centered',
  ],
  defaultVariant: 'startup-centered',
  defaultContent: {},
}
