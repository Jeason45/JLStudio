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
                fontFamily: 'var(--font-heading, inherit)',
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
                fontFamily: 'var(--font-body, inherit)',
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
                fontFamily: 'var(--font-heading, inherit)',
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
                fontFamily: 'var(--font-body, inherit)',
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
          color: textColor ?? 'var(--color-foreground, #e1e1e1)',
          zIndex: 2,
          // Tall section: the extra height is the "travel distance" for the sticky text
          minHeight: isPreview ? '180vh' : '100vh',
          fontFamily: 'var(--font-body, inherit)',
          backgroundColor: 'var(--color-foreground, #140c08)',
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
                  fontSize: 13,
                  fontWeight: 300,
                  lineHeight: '180%',
                  flex: '0 40%',
                  maxWidth: 160,
                  color: textColor ? `${textColor}99` : 'rgba(255,255,255,0.55)',
                  whiteSpace: 'pre-line',
                  fontFamily: 'var(--font-body, inherit)',
                  letterSpacing: '0.03em',
                  fontStyle: 'italic',
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
                      fontFamily: 'var(--font-heading, inherit)',
                      fontSize: 'clamp(2.5rem, 1.5rem + 4.5vw, 5rem)',
                      fontWeight: 300,
                      lineHeight: '110%',
                      color: textColor ?? 'var(--color-foreground, #e1e1e1)',
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
                    border: '1px solid rgba(255,255,255,0.25)',
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    color: textColor ?? 'var(--color-foreground, #e1e1e1)',
                    paddingLeft: 36,
                    paddingRight: 36,
                    paddingTop: 14,
                    paddingBottom: 14,
                    fontSize: 13,
                    fontWeight: 400,
                    fontFamily: 'var(--font-body, inherit)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase' as const,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
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

  // ═══════════════════════════════════════════
  // PRISME — Opticien / Clean precision
  // Premium: parallax bg, 3-layer overlay, staggered text reveals,
  // button fill sweep + glow pulse, floating lens-circle SVG decorations
  // ═══════════════════════════════════════════

  if (variant === 'prisme-centered') {
    const navy = '#0F1923'
    const iceBlue = '#B8D4E3'
    const warmCream = '#E8DED0'

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

    // Parallax: shift background image on scroll via IntersectionObserver + scroll listener
    const prismeParallaxRef = (el: HTMLDivElement | null) => {
      if (!el) return
      const img = el.querySelector('.prisme-cta-parallax-img') as HTMLElement | null
      if (!img) return
      const handleScroll = () => {
        const rect = el.getBoundingClientRect()
        const viewH = window.innerHeight
        if (rect.bottom < 0 || rect.top > viewH) return
        const progress = (viewH - rect.top) / (viewH + rect.height)
        const offset = (progress - 0.5) * 40 // -20px to +20px
        img.style.transform = `translateY(${offset}px) scale(1.08)`
      }
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
      // Cleanup not strictly needed for static sections, but observer pattern ensures one-time setup
    }

    const bgImage = (content as Record<string, unknown>).backgroundImage as string | undefined

    return (
      <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Prisme CTA — button fill sweep from left */
        .prisme-cta-btn {
          position: relative;
          overflow: hidden;
          transition: color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .prisme-cta-btn-fill {
          position: absolute;
          inset: 0;
          background: ${iceBlue};
          transform: translateX(-102%);
          transition: transform 0.4s ease;
        }
        .prisme-cta-btn:hover .prisme-cta-btn-fill {
          transform: translateX(0);
        }
        .prisme-cta-btn:hover {
          color: ${navy} !important;
          border-color: ${iceBlue} !important;
        }
        /* Glow pulse on hover */
        @keyframes prisme-cta-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(184, 212, 227, 0.15); }
          50% { box-shadow: 0 0 40px rgba(184, 212, 227, 0.3), 0 0 80px rgba(184, 212, 227, 0.1); }
        }
        .prisme-cta-btn:hover {
          animation: prisme-cta-glow 2s ease-in-out infinite;
        }
        /* Floating lens circles — slow rotation */
        @keyframes prisme-lens-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes prisme-lens-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(180deg); }
        }
      ` }} />
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
        {/* Background with parallax */}
        <div
          ref={prismeParallaxRef}
          {...elementProps(config.id, 'bgWrapper', 'container', 'Background')}
          style={{ position: 'absolute', inset: '-40px 0', zIndex: 0, overflow: 'hidden' }}
        >
          {bgImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={bgImage}
              alt=""
              className="prisme-cta-parallax-img"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transform: 'scale(1.08)', willChange: 'transform' }}
            />
          ) : (
            <div className="prisme-cta-parallax-img" style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${navy}, #162636, ${navy})` }} />
          )}
          {/* 3-layer overlay system */}
          {/* Layer 1: Bottom fade */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,25,35,0.9) 0%, rgba(15,25,35,0.3) 50%, rgba(15,25,35,0.6) 100%)', pointerEvents: 'none' }} />
          {/* Layer 2: Diagonal sweep */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,25,35,0.5) 0%, transparent 40%, rgba(15,25,35,0.4) 100%)', pointerEvents: 'none' }} />
          {/* Layer 3: Vignette */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(15,25,35,0.6) 100%)', pointerEvents: 'none' }} />
        </div>

        {/* Floating lens-circle SVG decorations */}
        <svg
          style={{
            position: 'absolute',
            top: '10%',
            left: '8%',
            width: 120,
            height: 120,
            opacity: 0.06,
            zIndex: 1,
            animation: 'prisme-lens-float 12s ease-in-out infinite',
          }}
          viewBox="0 0 120 120"
          fill="none"
        >
          <circle cx="60" cy="60" r="55" stroke={iceBlue} strokeWidth="1.5" />
          <circle cx="60" cy="60" r="40" stroke={iceBlue} strokeWidth="0.8" />
          <circle cx="60" cy="60" r="25" stroke={iceBlue} strokeWidth="0.5" />
        </svg>
        <svg
          style={{
            position: 'absolute',
            bottom: '12%',
            right: '6%',
            width: 180,
            height: 180,
            opacity: 0.04,
            zIndex: 1,
            animation: 'prisme-lens-float 16s ease-in-out infinite 2s',
          }}
          viewBox="0 0 180 180"
          fill="none"
        >
          <circle cx="90" cy="90" r="85" stroke={iceBlue} strokeWidth="1.5" />
          <circle cx="90" cy="90" r="60" stroke={iceBlue} strokeWidth="1" />
          <circle cx="90" cy="90" r="35" stroke={iceBlue} strokeWidth="0.5" />
          <line x1="5" y1="90" x2="175" y2="90" stroke={iceBlue} strokeWidth="0.3" />
          <line x1="90" y1="5" x2="90" y2="175" stroke={iceBlue} strokeWidth="0.3" />
        </svg>
        <svg
          style={{
            position: 'absolute',
            top: '55%',
            left: '3%',
            width: 80,
            height: 80,
            opacity: 0.035,
            zIndex: 1,
            animation: 'prisme-lens-rotate 30s linear infinite',
          }}
          viewBox="0 0 80 80"
          fill="none"
        >
          <circle cx="40" cy="40" r="36" stroke={warmCream} strokeWidth="1" />
          <circle cx="40" cy="40" r="20" stroke={warmCream} strokeWidth="0.6" />
        </svg>

        {/* Content — staggered scroll reveals */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '700px',
            textAlign: 'center',
            padding: 'clamp(40px, 8vw, 100px) clamp(20px, 5vw, 60px)',
          }}
        >
          <div ref={scrollRevealDelayRef(0)}>
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              className={cn(titleSize && getTitleSizeClass(titleSize))}
              style={{
                fontFamily: 'var(--font-heading, inherit)',
                fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                fontWeight: 500,
                lineHeight: '115%',
                color: textColor ?? warmCream,
                marginBottom: '20px',
              }}
            >
              {content.title || 'Voyez le monde autrement'}
            </h2>
          </div>
          <div ref={scrollRevealDelayRef(0.15)}>
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              style={{
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: '160%',
                color: 'rgba(232, 222, 208, 0.6)',
                marginBottom: '40px',
              }}
            >
              {subtitle || 'Des verres d\u2019exception pour un regard unique'}
            </p>
          </div>
          <div ref={scrollRevealDelayRef(0.3)}>
            <a
              {...elementProps(config.id, 'primaryButton', 'button')}
              href={content.primaryButton?.href ?? '/rendez-vous'}
              className="prisme-cta-btn"
              style={{
                display: 'inline-block',
                backgroundColor: 'transparent',
                color: iceBlue,
                border: `1px solid ${iceBlue}`,
                borderRadius: '0px',
                padding: '14px 36px',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'var(--font-body, inherit)',
                cursor: 'pointer',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span className="prisme-cta-btn-fill" />
              <span style={{ position: 'relative', zIndex: 1 }}>
                {content.primaryButton?.label || 'Prendre rendez-vous'}
              </span>
            </a>
          </div>
        </div>
      </section>
      </>
    )
  }

  // ═══════════════════════════════════════════
  // PETALE — Fleuriste / Warm organic
  // ═══════════════════════════════════════════

  if (variant === 'petale-centered') {
    const scrollRevealDelayRef = (delay: number) => (el: HTMLDivElement | null) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = `opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.disconnect()
        }
      }, { threshold: 0.15 })
      obs.observe(el)
    }

    const parallaxRef = (el: HTMLDivElement | null) => {
      if (!el) return
      const img = el.querySelector('.petale-cta-parallax-img') as HTMLElement | null
      if (!img) return
      const handleScroll = () => {
        const rect = el.getBoundingClientRect()
        const viewH = window.innerHeight
        if (rect.bottom < 0 || rect.top > viewH) return
        const progress = (viewH - rect.top) / (viewH + rect.height)
        const offset = (progress - 0.5) * 60
        img.style.transform = `translateY(${offset}px) scale(1.15)`
      }
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
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
        <style>{`
          .petale-cta-btn { position: relative; overflow: hidden; display: inline-flex; align-items: center; gap: 10px; }
          .petale-cta-btn .petale-cta-btn-fill { position: absolute; inset: 0; background: linear-gradient(135deg, #D4A574, #c4955e); transform: translateX(-102%); transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
          .petale-cta-btn:hover .petale-cta-btn-fill { transform: translateX(0); }
          .petale-cta-btn:hover { box-shadow: 0 8px 30px rgba(212, 165, 116, 0.3); color: #1A1A1A !important; border-color: #D4A574 !important; }
          .petale-cta-btn:hover .petale-cta-btn-label { color: #1A1A1A; }
          .petale-cta-btn-label { transition: color 0.4s; }
          @keyframes petale-drift-1 { 0%,100% { transform: translate(0,0) rotate(0deg); } 33% { transform: translate(15px,-20px) rotate(12deg); } 66% { transform: translate(-10px,10px) rotate(-8deg); } }
          @keyframes petale-drift-2 { 0%,100% { transform: translate(0,0) rotate(0deg); } 25% { transform: translate(-12px,18px) rotate(-15deg); } 50% { transform: translate(8px,-8px) rotate(10deg); } 75% { transform: translate(-18px,-12px) rotate(-5deg); } }
          @keyframes petale-drift-3 { 0%,100% { transform: translate(0,0) rotate(0deg); } 40% { transform: translate(20px,12px) rotate(18deg); } 80% { transform: translate(-8px,-15px) rotate(-12deg); } }
        `}</style>

        {/* Background with parallax */}
        <div ref={parallaxRef} {...elementProps(config.id, 'bgWrapper', 'container', 'Background')} style={{ position: 'absolute', inset: '-30px', zIndex: 0 }}>
          {bgImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={bgImage}
              alt=""
              className="petale-cta-parallax-img"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transform: 'scale(1.15)', willChange: 'transform' }}
            />
          ) : (
            <div className="petale-cta-parallax-img" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1A1A1A, #2A2420, #1A1A1A)', transform: 'scale(1.15)' }} />
          )}
          {/* Multi-layer overlay: warm bottom fade */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26, 26, 26, 0.9) 0%, rgba(26, 26, 26, 0.4) 50%, rgba(26, 26, 26, 0.6) 100%)' }} />
          {/* Organic diagonal */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(45, 80, 22, 0.15) 0%, transparent 50%, rgba(212, 165, 116, 0.1) 100%)' }} />
          {/* Soft vignette */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(26, 26, 26, 0.5) 100%)' }} />
        </div>

        {/* Floating decorative petal/leaf SVGs */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
          {/* Petal top-left */}
          <svg style={{ position: 'absolute', top: '12%', left: '8%', opacity: 0.12, animation: 'petale-drift-1 12s ease-in-out infinite' }} width="50" height="70" viewBox="0 0 50 70" fill="none">
            <ellipse cx="25" cy="30" rx="12" ry="28" fill="#D4A574" transform="rotate(-20 25 30)" />
            <line x1="25" y1="30" x2="25" y2="65" stroke="#2D5016" strokeWidth="1" opacity="0.6" />
          </svg>
          {/* Leaf top-right */}
          <svg style={{ position: 'absolute', top: '18%', right: '10%', opacity: 0.1, animation: 'petale-drift-2 15s ease-in-out infinite' }} width="60" height="40" viewBox="0 0 60 40" fill="none">
            <path d="M5 35C5 35 15 5 55 5C55 5 45 35 5 35Z" fill="#2D5016" opacity="0.8" />
            <path d="M5 35C5 35 25 18 55 5" stroke="#2D5016" strokeWidth="0.8" opacity="0.5" />
          </svg>
          {/* Petal bottom-right */}
          <svg style={{ position: 'absolute', bottom: '15%', right: '12%', opacity: 0.09, animation: 'petale-drift-3 18s ease-in-out infinite' }} width="45" height="65" viewBox="0 0 45 65" fill="none">
            <ellipse cx="22" cy="28" rx="10" ry="25" fill="#D4A574" transform="rotate(15 22 28)" />
            <line x1="22" y1="28" x2="22" y2="60" stroke="#2D5016" strokeWidth="1" opacity="0.5" />
          </svg>
          {/* Small leaf bottom-left */}
          <svg style={{ position: 'absolute', bottom: '22%', left: '15%', opacity: 0.08, animation: 'petale-drift-2 14s ease-in-out infinite reverse' }} width="40" height="30" viewBox="0 0 40 30" fill="none">
            <path d="M3 25C3 25 10 3 37 3C37 3 30 25 3 25Z" fill="#2D5016" opacity="0.7" />
          </svg>
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
          <div ref={scrollRevealDelayRef(0)}>
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              className={cn(titleSize && getTitleSizeClass(titleSize))}
              style={{
                fontFamily: 'var(--font-heading, inherit)',
                fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                fontWeight: 500,
                lineHeight: '115%',
                color: textColor ?? '#F5F0EB',
                marginBottom: '20px',
              }}
            >
              {content.title || 'Offrez un moment fleuri'}
            </h2>
          </div>
          <div ref={scrollRevealDelayRef(0.15)}>
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              style={{
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: '160%',
                color: 'rgba(245, 240, 235, 0.6)',
                marginBottom: '40px',
              }}
            >
              {subtitle || 'Des compositions uniques pour chaque occasion'}
            </p>
          </div>
          <div ref={scrollRevealDelayRef(0.3)}>
            <a
              {...elementProps(config.id, 'primaryButton', 'button')}
              href={content.primaryButton?.href ?? '/boutique'}
              className="petale-cta-btn"
              style={{
                display: 'inline-flex',
                color: '#D4A574',
                borderRadius: '6px',
                padding: '14px 36px',
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: 'var(--font-body, inherit)',
                border: '1px solid rgba(212, 165, 116, 0.4)',
                cursor: 'pointer',
                transition: 'box-shadow 0.4s ease, color 0.4s ease, border-color 0.4s ease',
                textDecoration: 'none',
                background: 'transparent',
              }}
            >
              <span className="petale-cta-btn-fill" />
              <span className="petale-cta-btn-label" style={{ position: 'relative', zIndex: 2 }}>
                {content.primaryButton?.label || 'D\u00E9couvrir nos cr\u00E9ations'}
              </span>
              <svg style={{ position: 'relative', zIndex: 2 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    )
  }

  if (universe === 'warm') {
    const terracotta = accentColor ?? '#b4654a'

    const badgeEl = badge ? (
      <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs tracking-[0.15em] uppercase font-light" style={{ color: terracotta, fontFamily: 'Georgia, serif' }}>
        {badge}
      </span>
    ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />

    const primaryBtn = content.primaryButton && (
      <a
        {...elementProps(config.id, 'primaryButton', 'button')}
        href={content.primaryButton.href}
        className="px-8 py-3 text-sm font-light tracking-wide transition-colors hover:brightness-110"
        style={{ backgroundColor: terracotta, color: '#faf7f2', borderRadius: '0.25rem', fontFamily: 'Georgia, serif' }}
      >
        {content.primaryButton.label}
      </a>
    )

    const secondaryBtn = content.secondaryButton && (
      <a
        {...elementProps(config.id, 'secondaryButton', 'button')}
        href={content.secondaryButton.href}
        className="px-8 py-3 text-sm font-light tracking-wide border transition-colors hover:bg-black/5"
        style={{ borderColor: terracotta, color: terracotta, borderRadius: '0.25rem', fontFamily: 'Georgia, serif' }}
      >
        {content.secondaryButton.label}
      </a>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="py-24" style={{ backgroundColor: '#faf7f2', fontFamily: 'Georgia, serif' }}>
          <div className={cn("max-w-4xl mx-auto px-6 text-center space-y-6", textAlign && getTextAlignClass(textAlign))}>
            {badgeEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light leading-tight tracking-tight", titleSize && getTitleSizeClass(titleSize))} style={{ color: '#3d2c2c', fontFamily: 'Georgia, serif', ...(textColor ? { color: textColor } : {}) }}>{title}</h2>
            <div className="w-12 h-px mx-auto" style={{ backgroundColor: terracotta, opacity: 0.4 }} />
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base max-w-xl mx-auto font-light" style={{ color: '#8b7355' }}>{subtitle}</p>}
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
        <section className="py-24" style={{ backgroundColor: '#faf7f2', fontFamily: 'Georgia, serif' }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-5 flex-1">
              {badgeEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light leading-tight tracking-tight", titleSize && getTitleSizeClass(titleSize))} style={{ color: '#3d2c2c', fontFamily: 'Georgia, serif', ...(textColor ? { color: textColor } : {}) }}>{title}</h2>
              <div className="w-12 h-px" style={{ backgroundColor: terracotta, opacity: 0.4 }} />
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base max-w-md font-light" style={{ color: '#8b7355' }}>{subtitle}</p>}
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
      <section className="py-24" style={{ backgroundColor: '#f3ede4', fontFamily: 'Georgia, serif' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className={cn("p-10 md:p-16 text-center space-y-6", textAlign && getTextAlignClass(textAlign))} style={{ backgroundColor: '#faf7f2', borderRadius: '0.25rem', border: '1px solid rgba(180,101,74,0.15)' }}>
            <div className="w-16 h-px mx-auto" style={{ backgroundColor: terracotta, opacity: 0.4 }} />
            {badge ? (
              <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs tracking-[0.15em] uppercase font-light" style={{ color: terracotta }}>
                {badge}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light leading-tight tracking-tight", titleSize && getTitleSizeClass(titleSize))} style={{ color: '#3d2c2c', fontFamily: 'Georgia, serif', ...(textColor ? { color: textColor } : {}) }}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base max-w-xl mx-auto font-light" style={{ color: '#8b7355' }}>{subtitle}</p>}
            <div className="w-16 h-px mx-auto" style={{ backgroundColor: terracotta, opacity: 0.4 }} />
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-8 py-3 text-sm font-light tracking-wide transition-colors hover:brightness-110"
                  style={{ backgroundColor: terracotta, color: '#faf7f2', borderRadius: '0.25rem' }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-8 py-3 text-sm font-light tracking-wide border transition-colors hover:bg-black/5"
                  style={{ borderColor: terracotta, color: terracotta, borderRadius: '0.25rem' }}
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
  // PLAYFUL — Duolingo / Figma
  // ═══════════════════════════════════════════

  if (universe === 'playful') {
    const violet = accentColor ?? '#7c3aed'
    const pink = '#ec4899'

    const badgeEl = badge ? (
      <span {...elementProps(config.id, 'badge', 'badge')} className="inline-flex items-center gap-2 text-xs font-extrabold px-4 py-1.5 rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${violet}, ${pink})` }}>
        {badge}
      </span>
    ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />

    const primaryBtn = content.primaryButton && (
      <a
        {...elementProps(config.id, 'primaryButton', 'button')}
        href={content.primaryButton.href}
        className="px-8 py-3.5 rounded-2xl font-extrabold text-sm text-white transition-all hover:scale-105 hover:-translate-y-0.5"
        style={{ background: `linear-gradient(135deg, ${violet}, ${pink})`, boxShadow: `0 8px 24px ${violet}40` }}
      >
        {content.primaryButton.label}
      </a>
    )

    const secondaryBtn = content.secondaryButton && (
      <a
        {...elementProps(config.id, 'secondaryButton', 'button')}
        href={content.secondaryButton.href}
        className="px-8 py-3.5 rounded-2xl font-bold text-sm border-2 transition-all hover:scale-105"
        style={{ borderColor: violet, color: violet }}
      >
        {content.secondaryButton.label}
      </a>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className={cn("max-w-4xl mx-auto px-6 text-center space-y-6", textAlign && getTextAlignClass(textAlign))}>
            {badgeEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-5xl font-extrabold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 max-w-xl mx-auto font-medium">{subtitle}</p>}
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
        <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 flex-1">
              {badgeEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-5xl font-extrabold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-500 max-w-md font-medium">{subtitle}</p>}
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
      <section className="py-20" style={{ backgroundColor: '#faf5ff', fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className={cn("rounded-2xl p-10 md:p-14 text-center space-y-6 bg-white border-2", textAlign && getTextAlignClass(textAlign))} style={{ borderColor: `${violet}30`, boxShadow: `0 12px 40px ${violet}15` }}>
            {badge ? (
              <span {...elementProps(config.id, 'badge', 'badge')} className="inline-flex items-center gap-2 text-xs font-extrabold px-4 py-1.5 rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${violet}, ${pink})` }}>
                {badge}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-5xl font-extrabold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 max-w-xl mx-auto font-medium">{subtitle}</p>}
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-8 py-3.5 rounded-2xl font-extrabold text-sm text-white transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${violet}, ${pink})`, boxShadow: `0 8px 24px ${violet}40` }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-8 py-3.5 rounded-2xl font-bold text-sm border-2 transition-all hover:scale-105"
                  style={{ borderColor: violet, color: violet }}
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
  // RETRO — Vintage / Amber
  // ═══════════════════════════════════════════

  if (universe === 'retro') {
    const amber = accentColor ?? '#d97706'
    const darkBrown = '#92400e'

    const badgeEl = badge ? (
      <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs font-extrabold uppercase tracking-[0.2em] px-3 py-1 border-2" style={{ borderColor: darkBrown, color: darkBrown, backgroundColor: '#fef3c7' }}>
        {badge}
      </span>
    ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />

    const primaryBtn = content.primaryButton && (
      <a
        {...elementProps(config.id, 'primaryButton', 'button')}
        href={content.primaryButton.href}
        className="px-8 py-3.5 font-extrabold text-sm uppercase tracking-[0.15em] text-white transition-colors hover:brightness-110"
        style={{ backgroundColor: amber }}
      >
        {content.primaryButton.label}
      </a>
    )

    const secondaryBtn = content.secondaryButton && (
      <a
        {...elementProps(config.id, 'secondaryButton', 'button')}
        href={content.secondaryButton.href}
        className="px-8 py-3.5 font-extrabold text-sm uppercase tracking-[0.15em] border-2 transition-colors hover:bg-amber-50"
        style={{ borderColor: darkBrown, color: darkBrown }}
      >
        {content.secondaryButton.label}
      </a>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="py-20" style={{ backgroundColor: '#fffbeb', fontFamily: 'var(--font-body, inherit)' }}>
          <div className={cn("max-w-4xl mx-auto px-6 text-center space-y-6", textAlign && getTextAlignClass(textAlign))}>
            {badgeEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight", titleSize && getTitleSizeClass(titleSize))} style={{ color: darkBrown, ...(textColor ? { color: textColor } : {}) }}>{title}</h2>
            <div className="w-20 h-0.5 mx-auto" style={{ backgroundColor: amber }} />
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base max-w-xl mx-auto font-medium" style={{ color: '#a16207' }}>{subtitle}</p>}
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
        <section className="py-20" style={{ backgroundColor: '#fffbeb', fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-5 flex-1">
              {badgeEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight", titleSize && getTitleSizeClass(titleSize))} style={{ color: darkBrown, ...(textColor ? { color: textColor } : {}) }}>{title}</h2>
              <div className="w-20 h-0.5" style={{ backgroundColor: amber }} />
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base max-w-md font-medium" style={{ color: '#a16207' }}>{subtitle}</p>}
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
      <section className="py-20" style={{ backgroundColor: '#fef9c3', fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className={cn("p-10 md:p-14 text-center space-y-6 border-2", textAlign && getTextAlignClass(textAlign))} style={{ backgroundColor: '#fffbeb', borderColor: darkBrown }}>
            {badge ? (
              <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs font-extrabold uppercase tracking-[0.2em] px-3 py-1 border-2" style={{ borderColor: darkBrown, color: darkBrown, backgroundColor: '#fef3c7' }}>
                {badge}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight", titleSize && getTitleSizeClass(titleSize))} style={{ color: darkBrown, ...(textColor ? { color: textColor } : {}) }}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base max-w-xl mx-auto font-medium" style={{ color: '#a16207' }}>{subtitle}</p>}
            <div className="w-20 h-0.5 mx-auto" style={{ backgroundColor: amber }} />
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-8 py-3.5 font-extrabold text-sm uppercase tracking-[0.15em] text-white transition-colors hover:brightness-110"
                  style={{ backgroundColor: amber }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-8 py-3.5 font-extrabold text-sm uppercase tracking-[0.15em] border-2 transition-colors hover:bg-amber-50"
                  style={{ borderColor: darkBrown, color: darkBrown }}
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
  // DARK-PREMIUM — Noir / Gold
  // ═══════════════════════════════════════════

  if (universe === 'dark-premium') {
    const gold = accentColor ?? '#d4af37'

    const badgeEl = badge ? (
      <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs font-extralight tracking-[0.2em] uppercase" style={{ color: gold }}>
        {badge}
      </span>
    ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />

    const primaryBtn = content.primaryButton && (
      <a
        {...elementProps(config.id, 'primaryButton', 'button')}
        href={content.primaryButton.href}
        className="px-10 py-3.5 font-extralight text-sm tracking-[0.2em] uppercase border transition-colors hover:bg-white/5"
        style={{ borderColor: gold, color: gold }}
      >
        {content.primaryButton.label}
      </a>
    )

    const secondaryBtn = content.secondaryButton && (
      <a
        {...elementProps(config.id, 'secondaryButton', 'button')}
        href={content.secondaryButton.href}
        className="px-10 py-3.5 font-extralight text-sm tracking-[0.2em] uppercase text-zinc-500 border border-zinc-700 hover:border-zinc-600 transition-colors"
      >
        {content.secondaryButton.label}
      </a>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="py-28" style={{ backgroundColor: '#0a0a0a', fontFamily: 'var(--font-body, inherit)' }}>
          <div className={cn("max-w-4xl mx-auto px-6 text-center space-y-8", textAlign && getTextAlignClass(textAlign))}>
            {badgeEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-extralight uppercase tracking-[0.2em] leading-relaxed", titleSize && getTitleSizeClass(titleSize))} style={{ color: '#e5e5e5', ...(textColor ? { color: textColor } : {}) }}>{title}</h2>
            <div className="w-16 h-px mx-auto" style={{ backgroundColor: gold }} />
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base max-w-xl mx-auto font-extralight tracking-wide" style={{ color: '#737373' }}>{subtitle}</p>}
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
        <section className="py-28" style={{ backgroundColor: '#0a0a0a', fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 flex-1">
              {badgeEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-extralight uppercase tracking-[0.2em] leading-relaxed", titleSize && getTitleSizeClass(titleSize))} style={{ color: '#e5e5e5', ...(textColor ? { color: textColor } : {}) }}>{title}</h2>
              <div className="w-16 h-px" style={{ backgroundColor: gold }} />
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base max-w-md font-extralight tracking-wide" style={{ color: '#737373' }}>{subtitle}</p>}
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
      <section className="py-28" style={{ backgroundColor: '#050505', fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className={cn("p-10 md:p-16 text-center space-y-8 border", textAlign && getTextAlignClass(textAlign))} style={{ backgroundColor: '#0a0a0a', borderColor: `${gold}20` }}>
            <div className="w-20 h-px mx-auto" style={{ backgroundColor: gold }} />
            {badge ? (
              <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs font-extralight tracking-[0.2em] uppercase" style={{ color: gold }}>
                {badge}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-extralight uppercase tracking-[0.2em] leading-relaxed", titleSize && getTitleSizeClass(titleSize))} style={{ color: '#e5e5e5', ...(textColor ? { color: textColor } : {}) }}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base max-w-xl mx-auto font-extralight tracking-wide" style={{ color: '#737373' }}>{subtitle}</p>}
            <div className="w-20 h-px mx-auto" style={{ backgroundColor: gold }} />
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-10 py-3.5 font-extralight text-sm tracking-[0.2em] uppercase text-black transition-colors hover:brightness-110"
                  style={{ backgroundColor: gold }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-10 py-3.5 font-extralight text-sm tracking-[0.2em] uppercase border transition-colors hover:bg-white/5"
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
  // EDITORIAL — NYT / Medium
  // ═══════════════════════════════════════════

  if (universe === 'editorial') {
    const black = accentColor ?? '#18181b'

    const badgeEl = badge ? (
      <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs font-normal tracking-wide uppercase" style={{ color: '#71717a', fontFamily: 'Georgia, serif' }}>
        {badge}
      </span>
    ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />

    const primaryBtn = content.primaryButton && (
      <a
        {...elementProps(config.id, 'primaryButton', 'button')}
        href={content.primaryButton.href}
        className="px-8 py-3 font-normal text-sm tracking-wide transition-colors hover:bg-zinc-800"
        style={{ backgroundColor: black, color: '#fafaf9', fontFamily: 'Georgia, serif' }}
      >
        {content.primaryButton.label}
      </a>
    )

    const secondaryBtn = content.secondaryButton && (
      <a
        {...elementProps(config.id, 'secondaryButton', 'button')}
        href={content.secondaryButton.href}
        className="px-8 py-3 font-normal text-sm tracking-wide border transition-colors hover:bg-zinc-100"
        style={{ borderColor: black, color: black, fontFamily: 'Georgia, serif' }}
      >
        {content.secondaryButton.label}
      </a>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="py-24" style={{ backgroundColor: '#fafaf9', fontFamily: 'Georgia, serif' }}>
          <div className={cn("max-w-3xl mx-auto px-6 text-center space-y-6", textAlign && getTextAlignClass(textAlign))}>
            <div className="w-full h-px mx-auto" style={{ backgroundColor: '#d4d4d8' }} />
            {badgeEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-normal leading-snug", titleSize && getTitleSizeClass(titleSize))} style={{ color: black, fontFamily: 'Georgia, serif', ...(textColor ? { color: textColor } : {}) }}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base max-w-lg mx-auto font-normal leading-relaxed" style={{ color: '#52525b', fontFamily: 'Georgia, serif' }}>{subtitle}</p>}
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              {primaryBtn}
              {secondaryBtn}
            </div>
            <div className="w-full h-px mx-auto" style={{ backgroundColor: '#d4d4d8' }} />
          </div>
        </section>
      )
    }

    // Split
    if (layout === 'split') {
      return (
        <section className="py-24" style={{ backgroundColor: '#fafaf9', fontFamily: 'Georgia, serif' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="w-full h-px mb-12" style={{ backgroundColor: '#d4d4d8' }} />
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="space-y-5 flex-1">
                {badgeEl}
                <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-normal leading-snug", titleSize && getTitleSizeClass(titleSize))} style={{ color: black, fontFamily: 'Georgia, serif', ...(textColor ? { color: textColor } : {}) }}>{title}</h2>
                {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base max-w-md font-normal leading-relaxed" style={{ color: '#52525b', fontFamily: 'Georgia, serif' }}>{subtitle}</p>}
              </div>
              <div className="flex flex-col gap-4 shrink-0">
                {primaryBtn}
                {secondaryBtn}
              </div>
            </div>
            <div className="w-full h-px mt-12" style={{ backgroundColor: '#d4d4d8' }} />
          </div>
        </section>
      )
    }

    // Card
    return (
      <section className="py-24" style={{ backgroundColor: '#f4f4f5', fontFamily: 'Georgia, serif' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className={cn("p-10 md:p-14 text-center space-y-6 border", textAlign && getTextAlignClass(textAlign))} style={{ backgroundColor: '#fafaf9', borderColor: '#d4d4d8' }}>
            <div className="w-full h-px mx-auto" style={{ backgroundColor: '#d4d4d8' }} />
            {badge ? (
              <span {...elementProps(config.id, 'badge', 'badge')} className="inline-block text-xs font-normal tracking-wide uppercase" style={{ color: '#71717a' }}>
                {badge}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-normal leading-snug", titleSize && getTitleSizeClass(titleSize))} style={{ color: black, fontFamily: 'Georgia, serif', ...(textColor ? { color: textColor } : {}) }}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base max-w-lg mx-auto font-normal leading-relaxed" style={{ color: '#52525b', fontFamily: 'Georgia, serif' }}>{subtitle}</p>}
            <div className="w-full h-px mx-auto" style={{ backgroundColor: '#d4d4d8' }} />
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-8 py-3 font-normal text-sm tracking-wide transition-colors hover:bg-zinc-800"
                  style={{ backgroundColor: black, color: '#fafaf9' }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-8 py-3 font-normal text-sm tracking-wide border transition-colors hover:bg-zinc-100"
                  style={{ borderColor: black, color: black }}
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
  // ORGANIC — Nature / Green
  // ═══════════════════════════════════════════

  if (universe === 'organic') {
    const green = accentColor ?? '#3f6212'

    const badgeEl = badge ? (
      <span {...elementProps(config.id, 'badge', 'badge')} className="inline-flex items-center gap-1.5 text-xs font-light tracking-wide px-4 py-1.5 rounded-full border" style={{ borderColor: `${green}30`, color: green, backgroundColor: '#ecfccb', fontFamily: 'Georgia, serif' }}>
        <span>&#127807;</span>
        {badge}
      </span>
    ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />

    const primaryBtn = content.primaryButton && (
      <a
        {...elementProps(config.id, 'primaryButton', 'button')}
        href={content.primaryButton.href}
        className="px-8 py-3 font-light text-sm tracking-wide text-white rounded-full transition-colors hover:brightness-110"
        style={{ backgroundColor: green, fontFamily: 'Georgia, serif' }}
      >
        {content.primaryButton.label}
      </a>
    )

    const secondaryBtn = content.secondaryButton && (
      <a
        {...elementProps(config.id, 'secondaryButton', 'button')}
        href={content.secondaryButton.href}
        className="px-8 py-3 font-light text-sm tracking-wide rounded-full border transition-colors hover:bg-green-50"
        style={{ borderColor: green, color: green, fontFamily: 'Georgia, serif' }}
      >
        {content.secondaryButton.label}
      </a>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="py-24" style={{ backgroundColor: '#f7fee7', fontFamily: 'Georgia, serif' }}>
          <div className={cn("max-w-4xl mx-auto px-6 text-center space-y-6", textAlign && getTextAlignClass(textAlign))}>
            {badgeEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light leading-relaxed", titleSize && getTitleSizeClass(titleSize))} style={{ color: '#1a2e05', fontFamily: 'Georgia, serif', ...(textColor ? { color: textColor } : {}) }}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base max-w-xl mx-auto font-light leading-relaxed" style={{ color: '#4d7c0f', fontFamily: 'Georgia, serif' }}>{subtitle}</p>}
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
        <section className="py-24" style={{ backgroundColor: '#f7fee7', fontFamily: 'Georgia, serif' }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-5 flex-1">
              {badgeEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light leading-relaxed", titleSize && getTitleSizeClass(titleSize))} style={{ color: '#1a2e05', fontFamily: 'Georgia, serif', ...(textColor ? { color: textColor } : {}) }}>{title}</h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base max-w-md font-light leading-relaxed" style={{ color: '#4d7c0f', fontFamily: 'Georgia, serif' }}>{subtitle}</p>}
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
      <section className="py-24" style={{ backgroundColor: '#ecfccb', fontFamily: 'Georgia, serif' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className={cn("p-10 md:p-14 text-center space-y-6 border", textAlign && getTextAlignClass(textAlign))} style={{ backgroundColor: '#f7fee7', borderColor: `${green}20`, borderRadius: '2rem' }}>
            {badge ? (
              <span {...elementProps(config.id, 'badge', 'badge')} className="inline-flex items-center gap-1.5 text-xs font-light tracking-wide px-4 py-1.5 rounded-full border" style={{ borderColor: `${green}30`, color: green, backgroundColor: '#ecfccb' }}>
                <span>&#127807;</span>
                {badge}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="badge" type="badge" className="mb-4" />}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light leading-relaxed", titleSize && getTitleSizeClass(titleSize))} style={{ color: '#1a2e05', fontFamily: 'Georgia, serif', ...(textColor ? { color: textColor } : {}) }}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base max-w-xl mx-auto font-light leading-relaxed" style={{ color: '#4d7c0f', fontFamily: 'Georgia, serif' }}>{subtitle}</p>}
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-8 py-3 font-light text-sm tracking-wide text-white rounded-full transition-colors hover:brightness-110"
                  style={{ backgroundColor: green }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-8 py-3 font-light text-sm tracking-wide rounded-full border transition-colors hover:bg-green-50"
                  style={{ borderColor: green, color: green }}
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
    'prisme-centered',
    'petale-centered',
    'warm-centered', 'warm-split', 'warm-card',
    'playful-centered', 'playful-split', 'playful-card',
    'retro-centered', 'retro-split', 'retro-card',
    'dark-premium-centered', 'dark-premium-split', 'dark-premium-card',
    'editorial-centered', 'editorial-split', 'editorial-card',
    'organic-centered', 'organic-split', 'organic-card',
  ],
  defaultVariant: 'startup-centered',
  defaultContent: {},
}
