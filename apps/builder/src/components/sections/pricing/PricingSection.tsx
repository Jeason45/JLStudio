'use client'
import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { PricingContent, PricingPlan } from '@/types/sections'
import { Check, X } from 'lucide-react'
import { getTitleSizeClass, getTextAlignClass } from '../_utils'
import { elementProps } from '@/lib/elementHelpers'
import { EditablePlaceholder } from '../_EditablePlaceholder'

// ─── Billetweb Modal ──────────────────────────────────────
function BilletwebModal({ embedUrl, accentColor, variant, onClose }: { embedUrl: string; accentColor: string; variant: 'dark' | 'light'; onClose: () => void }) {
  const isDark = variant === 'dark'

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handleEsc); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }} />
      {/* Modal */}
      <div
        className="relative w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
        style={{
          backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
          border: `1px solid ${isDark ? accentColor + '40' : '#e5e7eb'}`,
          boxShadow: isDark ? `0 0 60px ${accentColor}15, 0 25px 50px rgba(0,0,0,0.5)` : '0 25px 50px rgba(0,0,0,0.15)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#f3f4f6'}` }}>
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: accentColor }}>Réservation</p>
            <h3 className={cn('text-lg font-semibold mt-0.5', isDark ? 'text-white' : 'text-zinc-900')}>Choisissez votre formule</h3>
          </div>
          <button
            onClick={onClose}
            className={cn('w-8 h-8 rounded-full flex items-center justify-center transition-colors', isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-zinc-100 text-zinc-400')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Iframe */}
        <div className="flex-1 overflow-auto">
          <iframe
            src={embedUrl}
            className="w-full"
            style={{ minHeight: '600px', height: '70vh', background: 'white', border: 'none' }}
            allow="payment"
          />
        </div>
        {/* Gold line at bottom */}
        {isDark && (
          <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }} />
        )}
      </div>
    </div>
  )
}

interface PricingSectionProps {
  config: SectionConfig
  isEditing?: boolean
}

// ─── Helpers ───────────────────────────────────────────────

/** Return period string only if it doesn't contain subscription-style text like "/Monthly". */
function displayPeriod(period?: string): string | null {
  if (!period) return null
  if (/month/i.test(period)) return null
  return period
}

/** Collect every unique feature text across all plans (preserving order). */
function allFeatureTexts(plans: PricingPlan[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const plan of plans) {
    for (const f of plan.features) {
      if (!seen.has(f.text)) {
        seen.add(f.text)
        result.push(f.text)
      }
    }
  }
  return result
}

/** Whether a plan includes a given feature text. */
function planHasFeature(plan: PricingPlan, text: string): boolean {
  return plan.features.some(f => f.text === text && f.included)
}

// ─── Main component ────────────────────────────────────────

export function PricingSection({ config, isEditing }: PricingSectionProps) {
  const content = (config.content ?? {}) as Partial<PricingContent>
  const plans: PricingPlan[] = content.plans ?? []
  const variant = config.variant ?? 'startup-columns'
  const { accentColor, titleSize, textAlign, textColor } = config.style
  const embedUrl = (content as any).embedUrl as string | undefined
  const [modalOpen, setModalOpen] = useState(false)
  const closeModal = useCallback(() => setModalOpen(false), [])

  // Parse variant
  const [universe, layout] = variant.includes('-')
    ? [variant.split('-').slice(0, -1).join('-'), variant.split('-').pop()!]
    : [variant, 'columns']

  // ─────────────────────────────────────────────
  // STARTUP
  // ─────────────────────────────────────────────
  if (universe === 'startup') {
    const accent = accentColor ?? '#6366f1'

    if (layout === 'comparison') {
      const features = allFeatureTexts(plans)
      return (
        <section className="relative bg-zinc-50 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6 py-20">
            {/* Header */}
            <div className={cn("text-center mb-14 space-y-3", textAlign && getTextAlignClass(textAlign))}>
              {content.eyebrow ? (
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: accent }}
                >
                  {content.eyebrow}
                </span>
              ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
              {content.title && <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl sm:text-4xl font-bold text-zinc-900", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
              {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 max-w-2xl mx-auto">{content.subtitle}</p>}
            </div>

            {/* Comparison table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-zinc-500 w-1/4">Fonctionnalités</th>
                    {plans.map((plan, planIdx) => (
                      <th key={plan.id} className="p-4 text-center">
                        <div className={cn(
                          'rounded-2xl p-5 transition-all',
                          plan.highlighted
                            ? 'bg-white shadow-xl ring-2 scale-105'
                            : 'bg-white shadow-sm'
                        )}
                          style={plan.highlighted ? { ringColor: accent, '--tw-ring-color': accent } as React.CSSProperties : undefined}
                        >
                          {plan.badge && (
                            <span
                              className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white mb-2"
                              style={{ backgroundColor: accent }}
                            >
                              {plan.badge}
                            </span>
                          )}
                          <div {...elementProps(config.id, `plans.${planIdx}.name`, 'heading')} className="font-bold text-lg text-zinc-900">{plan.name}</div>
                          <div className="flex items-end justify-center gap-1 mt-1">
                            <span {...elementProps(config.id, `plans.${planIdx}.price`, 'text')} className="text-3xl font-bold text-zinc-900">{plan.price}</span>
                            <span className="text-sm text-zinc-400 mb-1">{displayPeriod(plan.period)}</span>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feat, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}>
                      <td className="p-4 text-sm text-zinc-700">{feat}</td>
                      {plans.map((plan, planIdx) => (
                        <td key={plan.id} className="p-4 text-center">
                          {planHasFeature(plan, feat)
                            ? <Check className="w-5 h-5 mx-auto" style={{ color: accent }} />
                            : <X className="w-5 h-5 mx-auto text-zinc-300" />
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="p-4" />
                    {plans.map((plan, planIdx) => (
                      <td key={plan.id} className="p-4 text-center">
                        <a
                          {...elementProps(config.id, `plans.${planIdx}.cta`, 'button')}
                          href={plan.ctaHref}
                          className={cn(
                            'inline-block px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors',
                            plan.highlighted
                              ? 'text-white hover:opacity-90'
                              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                          )}
                          style={plan.highlighted ? { backgroundColor: accent } : undefined}
                        >
                          {plan.cta}
                        </a>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>
      )
    }

    // startup-columns (default)
    return (
      <section className="relative bg-zinc-50 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          {/* Header */}
          <div className={cn("text-center mb-14 space-y-3", textAlign && getTextAlignClass(textAlign))}>
            {content.eyebrow ? (
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: accent }}
              >
                {content.eyebrow}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
            {content.title && <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl sm:text-4xl font-bold text-zinc-900", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
            {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 max-w-2xl mx-auto">{content.subtitle}</p>}
          </div>

          {/* Cards */}
          <div className={cn(
            'grid gap-6 items-start',
            plans.length <= 2 ? 'sm:grid-cols-2 max-w-3xl mx-auto' : plans.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'
          )}>
            {plans.map((plan, planIdx) => (
              <div
                key={plan.id}
                className={cn(
                  'rounded-2xl p-6 relative transition-all',
                  plan.highlighted
                    ? 'text-white scale-105 shadow-2xl ring-2'
                    : 'bg-white shadow-sm border border-zinc-100'
                )}
                style={plan.highlighted
                  ? { backgroundColor: accent, ringColor: accent, '--tw-ring-color': accent, boxShadow: `0 20px 50px -12px ${accent}40` } as React.CSSProperties
                  : undefined
                }
              >
                {plan.badge && (
                  <span className={cn(
                    'absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full',
                    plan.highlighted ? 'bg-amber-400 text-amber-900' : 'bg-zinc-800 text-white'
                  )}>
                    {plan.badge}
                  </span>
                )}
                <div className="mb-6">
                  <h3 {...elementProps(config.id, `plans.${planIdx}.name`, 'heading')} className={cn('font-bold text-lg mb-1', plan.highlighted ? 'text-white' : 'text-zinc-900')}>{plan.name}</h3>
                  <p {...elementProps(config.id, `plans.${planIdx}.description`, 'text')} className={cn('text-xs mb-4', plan.highlighted ? 'text-white/70' : 'text-zinc-500')}>{plan.description}</p>
                  <div className="flex items-end gap-2">
                    <span {...elementProps(config.id, `plans.${planIdx}.price`, 'text')} className={cn('text-4xl font-bold', plan.highlighted ? 'text-white' : 'text-zinc-900')}>{plan.price}</span>
                    {(plan as any).originalPrice && (
                      <span className={cn('text-lg line-through mb-1', plan.highlighted ? 'text-white/40' : 'text-zinc-400')}>{(plan as any).originalPrice}</span>
                    )}
                    <span className={cn('text-sm mb-1', plan.highlighted ? 'text-white/70' : 'text-zinc-400')}>{displayPeriod(plan.period)}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={cn('flex items-center gap-2 text-sm',
                      plan.highlighted ? 'text-white' : feature.included ? 'text-zinc-700' : 'text-zinc-400'
                    )}>
                      {feature.included
                        ? <Check className={cn('w-4 h-4 shrink-0', plan.highlighted ? 'text-white/80' : '')} style={!plan.highlighted ? { color: accent } : undefined} />
                        : <X className="w-4 h-4 shrink-0 opacity-40" />
                      }
                      <span {...elementProps(config.id, `plans.${planIdx}.features.${i}`, 'text')}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                {embedUrl ? (
                  <button
                    {...elementProps(config.id, `plans.${planIdx}.cta`, 'button')}
                    onClick={() => setModalOpen(true)}
                    className={cn(
                      'block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer',
                      plan.highlighted
                        ? 'bg-white hover:bg-white/90'
                        : 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
                    )}
                    style={plan.highlighted ? { color: accent } : undefined}
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <a
                    {...elementProps(config.id, `plans.${planIdx}.cta`, 'button')}
                    href={plan.ctaHref}
                    className={cn(
                      'block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-colors',
                      plan.highlighted
                        ? 'bg-white hover:bg-white/90'
                        : 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
                    )}
                    style={plan.highlighted ? { color: accent } : undefined}
                  >
                    {plan.cta}
                  </a>
                )}
              </div>
            ))}
          </div>
          {/* Billetweb modal */}
          {modalOpen && embedUrl && (
            <BilletwebModal embedUrl={embedUrl} accentColor={accent} variant="light" onClose={closeModal} />
          )}
        </div>
      </section>
    )
  }

  // ─────────────────────────────────────────────
  // CORPORATE
  // ─────────────────────────────────────────────
  if (universe === 'corporate') {
    const accent = accentColor ?? '#3b82f6'

    if (layout === 'comparison') {
      const features = allFeatureTexts(plans)
      return (
        <section className="relative bg-slate-900 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
          <div className="relative max-w-5xl mx-auto px-6 py-20">
            <div className={cn("text-center mb-14 space-y-3", textAlign && getTextAlignClass(textAlign))}>
              {content.eyebrow ? (
                <span className="inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded border border-blue-500/30 text-blue-400">
                  {content.eyebrow}
                </span>
              ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
              {content.title && <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl sm:text-4xl font-bold text-white", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
              {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-slate-400 max-w-2xl mx-auto">{content.subtitle}</p>}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-4 text-sm font-medium text-slate-400 w-1/4">Fonctionnalités</th>
                    {plans.map((plan, planIdx) => (
                      <th key={plan.id} className="p-4 text-center">
                        <div className={cn(
                          'rounded-lg p-5',
                          plan.highlighted
                            ? 'bg-slate-800 border-2'
                            : 'bg-slate-800/50 border border-slate-700'
                        )}
                          style={plan.highlighted ? { borderColor: accent } : undefined}
                        >
                          {plan.highlighted && (
                            <div className="h-1 rounded-full mb-3 -mx-1" style={{ background: `linear-gradient(to right, ${accent}, #1e40af)` }} />
                          )}
                          {plan.badge && (
                            <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded text-white mb-2" style={{ backgroundColor: accent }}>
                              {plan.badge}
                            </span>
                          )}
                          <div {...elementProps(config.id, `plans.${planIdx}.name`, 'heading')} className="font-bold text-lg text-white">{plan.name}</div>
                          <div className="flex items-end justify-center gap-1 mt-1">
                            <span {...elementProps(config.id, `plans.${planIdx}.price`, 'text')} className="text-3xl font-bold text-white">{plan.price}</span>
                            <span className="text-sm text-slate-400 mb-1">{displayPeriod(plan.period)}</span>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feat, i) => (
                    <tr key={i} className={cn('border-b border-slate-800', i % 2 === 0 ? 'bg-slate-800/20' : '')}>
                      <td className="p-4 text-sm text-slate-300">{feat}</td>
                      {plans.map((plan, planIdx) => (
                        <td key={plan.id} className="p-4 text-center">
                          {planHasFeature(plan, feat)
                            ? <Check className="w-5 h-5 mx-auto" style={{ color: accent }} />
                            : <X className="w-5 h-5 mx-auto text-slate-600" />
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="p-4" />
                    {plans.map((plan, planIdx) => (
                      <td key={plan.id} className="p-4 text-center">
                        <a
                          {...elementProps(config.id, `plans.${planIdx}.cta`, 'button')}
                          href={plan.ctaHref}
                          className={cn(
                            'inline-block px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                            plan.highlighted
                              ? 'text-white hover:opacity-90'
                              : 'bg-slate-700 text-white hover:bg-slate-600'
                          )}
                          style={plan.highlighted ? { backgroundColor: accent } : undefined}
                        >
                          {plan.cta}
                        </a>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>
      )
    }

    // corporate-columns
    return (
      <section className="relative bg-slate-900 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className={cn("text-center mb-14 space-y-3", textAlign && getTextAlignClass(textAlign))}>
            {content.eyebrow ? (
              <span className="inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded border border-blue-500/30 text-blue-400">
                {content.eyebrow}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
            {content.title && <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl sm:text-4xl font-bold text-white", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
            {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-slate-400 max-w-2xl mx-auto">{content.subtitle}</p>}
          </div>

          <div className={cn(
            'grid gap-6 items-start',
            plans.length <= 2 ? 'sm:grid-cols-2 max-w-3xl mx-auto' : plans.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'
          )}>
            {plans.map((plan, planIdx) => (
              <div
                key={plan.id}
                className={cn(
                  'rounded-lg p-6 relative',
                  plan.highlighted
                    ? 'bg-slate-800 border-2'
                    : 'bg-slate-800/60 border border-slate-700'
                )}
                style={plan.highlighted ? { borderColor: accent } : undefined}
              >
                {/* Gradient top bar for highlighted */}
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-lg" style={{ background: `linear-gradient(to right, ${accent}, #1e40af)` }} />
                )}
                {plan.badge && (
                  <span className={cn(
                    'absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded',
                    plan.highlighted ? 'text-white' : 'bg-slate-600 text-white'
                  )}
                    style={plan.highlighted ? { backgroundColor: accent } : undefined}
                  >
                    {plan.badge}
                  </span>
                )}
                <div className="mb-6">
                  <h3 {...elementProps(config.id, `plans.${planIdx}.name`, 'heading')} className="font-bold text-lg mb-1 text-white">{plan.name}</h3>
                  <p {...elementProps(config.id, `plans.${planIdx}.description`, 'text')} className="text-xs mb-4 text-slate-400">{plan.description}</p>
                  <div className="flex items-end gap-1">
                    <span {...elementProps(config.id, `plans.${planIdx}.price`, 'text')} className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-sm mb-1 text-slate-400">{displayPeriod(plan.period)}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={cn('flex items-center gap-2 text-sm',
                      feature.included ? 'text-slate-200' : 'text-slate-500'
                    )}>
                      {feature.included
                        ? <Check className="w-4 h-4 shrink-0" style={{ color: accent }} />
                        : <X className="w-4 h-4 shrink-0 opacity-40" />
                      }
                      <span {...elementProps(config.id, `plans.${planIdx}.features.${i}`, 'text')}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <a
                  {...elementProps(config.id, `plans.${planIdx}.cta`, 'button')}
                          href={plan.ctaHref}
                  className={cn(
                    'block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors',
                    plan.highlighted
                      ? 'text-white hover:opacity-90'
                      : 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600'
                  )}
                  style={plan.highlighted ? { backgroundColor: accent } : undefined}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ─────────────────────────────────────────────
  // LUXE
  // ─────────────────────────────────────────────
  if (universe === 'luxe') {
    const gold = accentColor ?? '#b8860b'

    if (layout === 'comparison') {
      const features = allFeatureTexts(plans)
      return (
        <section className="relative bg-white overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6 py-24">
            <div className={cn("text-center mb-16 space-y-4", textAlign && getTextAlignClass(textAlign))}>
              {content.eyebrow ? (
                <span className="inline-block text-[11px] font-light tracking-[0.25em] uppercase" style={{ color: gold }}>
                  {content.eyebrow}
                </span>
              ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
              {content.title && <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl sm:text-4xl font-light tracking-wide text-zinc-900", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
              {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base font-light text-zinc-400 max-w-2xl mx-auto tracking-wide">{content.subtitle}</p>}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 text-[11px] font-light tracking-[0.2em] uppercase text-zinc-400 w-1/4">Fonctionnalités</th>
                    {plans.map((plan, planIdx) => (
                      <th key={plan.id} className="p-4 text-center">
                        <div className={cn(
                          'p-5 border',
                          plan.highlighted ? 'border-2' : 'border-zinc-200'
                        )}
                          style={plan.highlighted ? { borderColor: gold } : undefined}
                        >
                          {plan.badge && (
                            <span className="inline-block text-[10px] font-light tracking-[0.2em] uppercase mb-2" style={{ color: gold }}>
                              {plan.badge || 'Recommandé'}
                            </span>
                          )}
                          <div {...elementProps(config.id, `plans.${planIdx}.name`, 'heading')} className="font-light text-lg tracking-wide text-zinc-900">{plan.name}</div>
                          <div className="flex items-end justify-center gap-1 mt-2">
                            <span {...elementProps(config.id, `plans.${planIdx}.price`, 'text')} className="text-3xl font-light text-zinc-900">{plan.price}</span>
                            <span className="text-sm font-light text-zinc-400 mb-1">{displayPeriod(plan.period)}</span>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feat, i) => (
                    <tr key={i} className="border-b border-zinc-100">
                      <td className="p-4 text-sm font-light text-zinc-600 tracking-wide">{feat}</td>
                      {plans.map((plan, planIdx) => (
                        <td key={plan.id} className="p-4 text-center">
                          {planHasFeature(plan, feat)
                            ? <Check className="w-4 h-4 mx-auto" style={{ color: gold }} />
                            : <X className="w-4 h-4 mx-auto text-zinc-200" />
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="p-4" />
                    {plans.map((plan, planIdx) => (
                      <td key={plan.id} className="p-4 text-center">
                        <a
                          {...elementProps(config.id, `plans.${planIdx}.cta`, 'button')}
                          href={plan.ctaHref}
                          className={cn(
                            'inline-block px-8 py-2.5 text-sm font-light tracking-wider uppercase transition-colors border',
                            plan.highlighted
                              ? 'text-white hover:opacity-90'
                              : 'text-zinc-700 border-zinc-300 hover:border-zinc-400'
                          )}
                          style={plan.highlighted ? { backgroundColor: gold, borderColor: gold } : undefined}
                        >
                          {plan.cta}
                        </a>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>
      )
    }

    // luxe-columns
    return (
      <section className="relative bg-white overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className={cn("text-center mb-16 space-y-4", textAlign && getTextAlignClass(textAlign))}>
            {content.eyebrow ? (
              <span className="inline-block text-[11px] font-light tracking-[0.25em] uppercase" style={{ color: gold }}>
                {content.eyebrow}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
            {content.title && <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl sm:text-4xl font-light tracking-wide text-zinc-900", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
            {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base font-light text-zinc-400 max-w-2xl mx-auto tracking-wide">{content.subtitle}</p>}
          </div>

          <div className={cn(
            'grid gap-8 items-start',
            plans.length <= 2 ? 'sm:grid-cols-2 max-w-3xl mx-auto' : plans.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'
          )}>
            {plans.map((plan, planIdx) => (
              <div
                key={plan.id}
                className={cn(
                  'p-8 relative border',
                  plan.highlighted ? 'border-2' : 'border-zinc-200'
                )}
                style={plan.highlighted ? { borderColor: gold } : undefined}
              >
                {plan.badge && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-light tracking-[0.2em] uppercase px-4 py-1 bg-white"
                    style={{ color: gold }}
                  >
                    {plan.badge}
                  </span>
                )}
                <div className={cn("mb-8 text-center", textAlign && getTextAlignClass(textAlign))}>
                  <h3 {...elementProps(config.id, `plans.${planIdx}.name`, 'heading')} className="font-light text-lg tracking-wide text-zinc-900 mb-2">{plan.name}</h3>
                  <p {...elementProps(config.id, `plans.${planIdx}.description`, 'text')} className="text-xs font-light text-zinc-400 mb-5 tracking-wide">{plan.description}</p>
                  <div className="flex items-end justify-center gap-1">
                    <span {...elementProps(config.id, `plans.${planIdx}.price`, 'text')} className="text-4xl font-light text-zinc-900">{plan.price}</span>
                    <span className="text-sm font-light text-zinc-400 mb-1">{displayPeriod(plan.period)}</span>
                  </div>
                </div>
                <div className="w-12 h-px mx-auto mb-6" style={{ backgroundColor: gold, opacity: 0.3 }} />
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={cn('flex items-center gap-2.5 text-sm font-light tracking-wide',
                      feature.included ? 'text-zinc-600' : 'text-zinc-300'
                    )}>
                      {feature.included
                        ? <Check className="w-4 h-4 shrink-0" style={{ color: gold }} />
                        : <X className="w-4 h-4 shrink-0 opacity-40" />
                      }
                      <span {...elementProps(config.id, `plans.${planIdx}.features.${i}`, 'text')}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <a
                  {...elementProps(config.id, `plans.${planIdx}.cta`, 'button')}
                          href={plan.ctaHref}
                  className={cn(
                    'block w-full text-center py-2.5 text-sm font-light tracking-wider uppercase transition-colors border',
                    plan.highlighted
                      ? 'text-white hover:opacity-90'
                      : 'text-zinc-700 border-zinc-300 hover:border-zinc-400'
                  )}
                  style={plan.highlighted ? { backgroundColor: gold, borderColor: gold } : undefined}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ─────────────────────────────────────────────
  // CREATIVE (neobrutalist)
  // ─────────────────────────────────────────────
  if (universe === 'creative') {
    const accent = accentColor ?? '#6366f1'

    if (layout === 'comparison') {
      const features = allFeatureTexts(plans)
      return (
        <section className="relative bg-[#f5f0e8] overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className={cn("text-center mb-14 space-y-3", textAlign && getTextAlignClass(textAlign))}>
              {content.eyebrow ? (
                <span className="inline-block text-xs font-black uppercase px-3 py-1 bg-zinc-900 text-white border-2 border-zinc-900">
                  {content.eyebrow}
                </span>
              ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
              {content.title && <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl sm:text-4xl font-black text-zinc-900 uppercase", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
              {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-600 max-w-2xl mx-auto">{content.subtitle}</p>}
            </div>

            <div className="overflow-x-auto">
              <div className="border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-zinc-900">
                      <th className="text-left p-4 text-sm font-black uppercase text-zinc-900 w-1/4">Fonctionnalités</th>
                      {plans.map((plan, planIdx) => (
                        <th key={plan.id} className="p-4 text-center border-l-2 border-zinc-900">
                          <div className={cn('p-4', plan.highlighted ? 'bg-zinc-900 text-white' : '')}>
                            {plan.badge && (
                              <span className={cn(
                                'inline-block text-[10px] font-black uppercase px-2 py-0.5 mb-2 border-2',
                                plan.highlighted ? 'border-white text-white' : 'border-zinc-900 text-zinc-900'
                              )}>
                                {plan.badge}
                              </span>
                            )}
                            <div {...elementProps(config.id, `plans.${planIdx}.name`, 'heading')} className="font-black text-lg">{plan.name}</div>
                            <div className="flex items-end justify-center gap-1 mt-1">
                              <span {...elementProps(config.id, `plans.${planIdx}.price`, 'text')} className="text-3xl font-black">{plan.price}</span>
                              <span className="text-sm mb-1 opacity-60">{displayPeriod(plan.period)}</span>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feat, i) => (
                      <tr key={i} className="border-b border-zinc-300">
                        <td className="p-4 text-sm font-bold text-zinc-900">{feat}</td>
                        {plans.map((plan, planIdx) => (
                          <td key={plan.id} className="p-4 text-center border-l-2 border-zinc-900">
                            {planHasFeature(plan, feat)
                              ? <Check className="w-5 h-5 mx-auto text-zinc-900" />
                              : <X className="w-5 h-5 mx-auto text-zinc-300" />
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-zinc-900">
                      <td className="p-4" />
                      {plans.map((plan, planIdx) => (
                        <td key={plan.id} className="p-4 text-center border-l-2 border-zinc-900">
                          <a
                            {...elementProps(config.id, `plans.${planIdx}.cta`, 'button')}
                          href={plan.ctaHref}
                            className={cn(
                              'inline-block px-6 py-2.5 text-sm font-black uppercase transition-all border-2 border-zinc-900',
                              plan.highlighted
                                ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-[2px_2px_0_0_#18181b]'
                                : 'bg-white text-zinc-900 hover:bg-zinc-100 shadow-[2px_2px_0_0_#18181b]'
                            )}
                          >
                            {plan.cta}
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </section>
      )
    }

    // creative-columns
    return (
      <section className="relative bg-[#f5f0e8] overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className={cn("text-center mb-14 space-y-3", textAlign && getTextAlignClass(textAlign))}>
            {content.eyebrow ? (
              <span className="inline-block text-xs font-black uppercase px-3 py-1 bg-zinc-900 text-white border-2 border-zinc-900">
                {content.eyebrow}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
            {content.title && <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl sm:text-4xl font-black text-zinc-900 uppercase", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
            {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-600 max-w-2xl mx-auto">{content.subtitle}</p>}
          </div>

          <div className={cn(
            'grid gap-6 items-start',
            plans.length <= 2 ? 'sm:grid-cols-2 max-w-3xl mx-auto' : plans.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'
          )}>
            {plans.map((plan, planIdx) => (
              <div
                key={plan.id}
                className={cn(
                  'p-6 relative border-2 border-zinc-900 transition-all',
                  plan.highlighted
                    ? 'bg-zinc-900 text-white shadow-[6px_6px_0_0_#18181b]'
                    : 'bg-white shadow-[4px_4px_0_0_#18181b]'
                )}
              >
                {plan.badge && (
                  <span className={cn(
                    'absolute -top-3 left-4 text-xs font-black uppercase px-3 py-1 border-2 border-zinc-900',
                    plan.highlighted ? 'bg-amber-400 text-zinc-900' : 'bg-zinc-900 text-white'
                  )}>
                    {plan.badge}
                  </span>
                )}
                <div className="mb-6">
                  <h3 {...elementProps(config.id, `plans.${planIdx}.name`, 'heading')} className="font-black text-lg mb-1 uppercase">{plan.name}</h3>
                  <p {...elementProps(config.id, `plans.${planIdx}.description`, 'text')} className={cn('text-xs mb-4', plan.highlighted ? 'text-white/60' : 'text-zinc-500')}>{plan.description}</p>
                  <div className="flex items-end gap-1">
                    <span {...elementProps(config.id, `plans.${planIdx}.price`, 'text')} className="text-4xl font-black">{plan.price}</span>
                    <span className={cn('text-sm mb-1', plan.highlighted ? 'text-white/60' : 'text-zinc-400')}>{displayPeriod(plan.period)}</span>
                  </div>
                </div>
                <div className={cn('w-full h-0.5 mb-6', plan.highlighted ? 'bg-white/20' : 'bg-zinc-900')} />
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={cn('flex items-center gap-2 text-sm font-bold',
                      plan.highlighted
                        ? feature.included ? 'text-white' : 'text-white/30'
                        : feature.included ? 'text-zinc-900' : 'text-zinc-300'
                    )}>
                      {feature.included
                        ? <Check className="w-4 h-4 shrink-0" />
                        : <X className="w-4 h-4 shrink-0" />
                      }
                      <span {...elementProps(config.id, `plans.${planIdx}.features.${i}`, 'text')}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <a
                  {...elementProps(config.id, `plans.${planIdx}.cta`, 'button')}
                          href={plan.ctaHref}
                  className={cn(
                    'block w-full text-center py-2.5 text-sm font-black uppercase transition-all border-2 border-zinc-900',
                    plan.highlighted
                      ? 'bg-white text-zinc-900 hover:bg-zinc-100 shadow-[2px_2px_0_0_#f5f0e8]'
                      : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-[2px_2px_0_0_#18181b]'
                  )}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ─────────────────────────────────────────────
  // ECOMMERCE
  // ─────────────────────────────────────────────
  if (universe === 'ecommerce') {
    const green = accentColor ?? '#059669'

    if (layout === 'comparison') {
      const features = allFeatureTexts(plans)
      return (
        <section className="relative bg-white overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className={cn("text-center mb-14 space-y-3", textAlign && getTextAlignClass(textAlign))}>
              {content.eyebrow ? (
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: green }}>
                  {content.eyebrow}
                </span>
              ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
              {content.title && <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl sm:text-4xl font-bold text-zinc-900", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
              {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 max-w-2xl mx-auto">{content.subtitle}</p>}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="text-left p-4 text-sm font-medium text-zinc-500 w-1/4">Fonctionnalités</th>
                    {plans.map((plan, planIdx) => (
                      <th key={plan.id} className="p-4 text-center">
                        <div className={cn(
                          'rounded-xl p-5 border',
                          plan.highlighted ? 'border-2 bg-emerald-50' : 'border-zinc-200'
                        )}
                          style={plan.highlighted ? { borderColor: green } : undefined}
                        >
                          {plan.badge && (
                            <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white mb-2" style={{ backgroundColor: green }}>
                              {plan.badge || 'Meilleure offre'}
                            </span>
                          )}
                          <div {...elementProps(config.id, `plans.${planIdx}.name`, 'heading')} className="font-bold text-lg text-zinc-900">{plan.name}</div>
                          <div className="flex items-end justify-center gap-1 mt-1">
                            <span {...elementProps(config.id, `plans.${planIdx}.price`, 'text')} className="text-3xl font-bold text-zinc-900">{plan.price}</span>
                            <span className="text-sm text-zinc-400 mb-1">{displayPeriod(plan.period)}</span>
                          </div>
                          {plan.highlighted && (
                            <p className="text-[11px] mt-1 font-semibold" style={{ color: green }}>Économisez jusqu&apos;à 30%</p>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feat, i) => (
                    <tr key={i} className={cn('border-b border-zinc-100', i % 2 === 0 ? 'bg-zinc-50/50' : '')}>
                      <td className="p-4 text-sm text-zinc-700">{feat}</td>
                      {plans.map((plan, planIdx) => (
                        <td key={plan.id} className="p-4 text-center">
                          {planHasFeature(plan, feat)
                            ? <Check className="w-5 h-5 mx-auto" style={{ color: green }} />
                            : <X className="w-5 h-5 mx-auto text-zinc-300" />
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="p-4" />
                    {plans.map((plan, planIdx) => (
                      <td key={plan.id} className="p-4 text-center">
                        <a
                          {...elementProps(config.id, `plans.${planIdx}.cta`, 'button')}
                          href={plan.ctaHref}
                          className={cn(
                            'inline-block px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors',
                            plan.highlighted
                              ? 'text-white hover:opacity-90'
                              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                          )}
                          style={plan.highlighted ? { backgroundColor: green } : undefined}
                        >
                          {plan.cta}
                        </a>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 mt-10 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" style={{ color: green }} /> Paiement sécurisé
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" style={{ color: green }} /> Satisfait ou remboursé
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" style={{ color: green }} /> Sans engagement
              </span>
            </div>
          </div>
        </section>
      )
    }

    // ecommerce-columns
    return (
      <section className="relative bg-white overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className={cn("text-center mb-14 space-y-3", textAlign && getTextAlignClass(textAlign))}>
            {content.eyebrow ? (
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: green }}>
                {content.eyebrow}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
            {content.title && <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl sm:text-4xl font-bold text-zinc-900", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
            {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 max-w-2xl mx-auto">{content.subtitle}</p>}
          </div>

          <div className={cn(
            'grid gap-6 items-start',
            plans.length <= 2 ? 'sm:grid-cols-2 max-w-3xl mx-auto' : plans.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'
          )}>
            {plans.map((plan, planIdx) => (
              <div
                key={plan.id}
                className={cn(
                  'rounded-xl p-6 relative border',
                  plan.highlighted
                    ? 'border-2 bg-emerald-50'
                    : 'border-zinc-200 bg-white shadow-sm'
                )}
                style={plan.highlighted ? { borderColor: green } : undefined}
              >
                {plan.badge && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: green }}
                  >
                    {plan.badge}
                  </span>
                )}
                <div className="mb-6">
                  <h3 {...elementProps(config.id, `plans.${planIdx}.name`, 'heading')} className="font-bold text-lg mb-1 text-zinc-900">{plan.name}</h3>
                  <p {...elementProps(config.id, `plans.${planIdx}.description`, 'text')} className="text-xs mb-4 text-zinc-500">{plan.description}</p>
                  <div className="flex items-end gap-1">
                    <span {...elementProps(config.id, `plans.${planIdx}.price`, 'text')} className="text-4xl font-bold text-zinc-900">{plan.price}</span>
                    <span className="text-sm mb-1 text-zinc-400">{displayPeriod(plan.period)}</span>
                  </div>
                  {plan.highlighted && (
                    <p className="text-xs mt-1 font-semibold" style={{ color: green }}>Économisez jusqu&apos;à 30%</p>
                  )}
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={cn('flex items-center gap-2 text-sm',
                      feature.included ? 'text-zinc-700' : 'text-zinc-400'
                    )}>
                      {feature.included
                        ? <Check className="w-4 h-4 shrink-0" style={{ color: green }} />
                        : <X className="w-4 h-4 shrink-0 opacity-40" />
                      }
                      <span {...elementProps(config.id, `plans.${planIdx}.features.${i}`, 'text')}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <a
                  {...elementProps(config.id, `plans.${planIdx}.cta`, 'button')}
                          href={plan.ctaHref}
                  className={cn(
                    'block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-colors',
                    plan.highlighted
                      ? 'text-white hover:opacity-90'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  )}
                  style={plan.highlighted ? { backgroundColor: green } : undefined}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-10 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" style={{ color: green }} /> Paiement sécurisé
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" style={{ color: green }} /> Satisfait ou remboursé
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" style={{ color: green }} /> Sans engagement
            </span>
          </div>
        </div>
      </section>
    )
  }

  // ─────────────────────────────────────────────
  // GLASS
  // ─────────────────────────────────────────────
  if (universe === 'glass') {
    const accent = accentColor ?? '#a78bfa'

    if (layout === 'comparison') {
      const features = allFeatureTexts(plans)
      return (
        <section className="relative bg-zinc-950 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: `radial-gradient(ellipse, ${accent}, transparent 70%)` }} />

          <div className="relative max-w-5xl mx-auto px-6 py-20">
            <div className={cn("text-center mb-14 space-y-3", textAlign && getTextAlignClass(textAlign))}>
              {content.eyebrow ? (
                <span className="inline-block text-xs font-medium px-3 py-1 rounded-full border border-white/10 text-white/60 backdrop-blur-sm bg-white/5">
                  {content.eyebrow}
                </span>
              ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
              {content.title && <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl sm:text-4xl font-bold text-white", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
              {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/40 max-w-2xl mx-auto">{content.subtitle}</p>}
            </div>

            <div className="overflow-x-auto">
              <div className="rounded-2xl border border-white/10 backdrop-blur-md bg-white/[0.03] overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-sm font-medium text-white/40 w-1/4">Fonctionnalités</th>
                      {plans.map((plan, planIdx) => (
                        <th key={plan.id} className="p-4 text-center">
                          <div className={cn(
                            'rounded-xl p-5 backdrop-blur-sm',
                            plan.highlighted
                              ? 'bg-white/[0.08] border border-white/20 shadow-lg'
                              : 'bg-white/[0.03] border border-white/5'
                          )}
                            style={plan.highlighted ? { boxShadow: `0 0 30px ${accent}15` } : undefined}
                          >
                            {plan.badge && (
                              <span className="inline-block text-[10px] font-medium px-2.5 py-0.5 rounded-full border border-white/20 text-white/70 mb-2 bg-white/5">
                                {plan.badge}
                              </span>
                            )}
                            <div {...elementProps(config.id, `plans.${planIdx}.name`, 'heading')} className="font-bold text-lg text-white">{plan.name}</div>
                            <div className="flex items-end justify-center gap-1 mt-1">
                              <span {...elementProps(config.id, `plans.${planIdx}.price`, 'text')} className="text-3xl font-bold text-white">{plan.price}</span>
                              <span className="text-sm text-white/30 mb-1">{displayPeriod(plan.period)}</span>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feat, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="p-4 text-sm text-white/60">{feat}</td>
                        {plans.map((plan, planIdx) => (
                          <td key={plan.id} className="p-4 text-center">
                            {planHasFeature(plan, feat)
                              ? <Check className="w-5 h-5 mx-auto" style={{ color: accent }} />
                              : <X className="w-5 h-5 mx-auto text-white/15" />
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="p-4" />
                      {plans.map((plan, planIdx) => (
                        <td key={plan.id} className="p-4 text-center">
                          <a
                            {...elementProps(config.id, `plans.${planIdx}.cta`, 'button')}
                          href={plan.ctaHref}
                            className={cn(
                              'inline-block px-6 py-2.5 rounded-xl text-sm font-semibold transition-all',
                              plan.highlighted
                                ? 'text-white hover:opacity-90 shadow-lg'
                                : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                            )}
                            style={plan.highlighted ? { background: `linear-gradient(135deg, ${accent}, ${accent}99)`, boxShadow: `0 0 20px ${accent}30` } : undefined}
                          >
                            {plan.cta}
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </section>
      )
    }

    // glass-columns
    return (
      <section className="relative bg-zinc-950 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: `radial-gradient(ellipse, ${accent}, transparent 70%)` }} />

        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className={cn("text-center mb-14 space-y-3", textAlign && getTextAlignClass(textAlign))}>
            {content.eyebrow ? (
              <span className="inline-block text-xs font-medium px-3 py-1 rounded-full border border-white/10 text-white/60 backdrop-blur-sm bg-white/5">
                {content.eyebrow}
              </span>
            ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
            {content.title && <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl sm:text-4xl font-bold text-white", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
            {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/40 max-w-2xl mx-auto">{content.subtitle}</p>}
          </div>

          <div className={cn(
            'grid gap-6 items-stretch',
            plans.length <= 2 ? 'sm:grid-cols-2 max-w-3xl mx-auto' : plans.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'
          )}>
            {plans.map((plan, planIdx) => (
              <div
                key={plan.id}
                className={cn(
                  'rounded-2xl p-6 relative backdrop-blur-md transition-all duration-300 hover:scale-[1.03] flex flex-col',
                  plan.highlighted
                    ? 'border shadow-2xl'
                    : 'bg-white/[0.04] border border-white/10 hover:bg-white/[0.06]'
                )}
                style={plan.highlighted
                  ? { borderColor: `${accent}60`, backgroundColor: `${accent}0a`, boxShadow: `0 0 40px ${accent}20, 0 20px 50px -12px rgba(0,0,0,0.5)` }
                  : undefined
                }
              >
                {/* Gradient border effect for highlighted */}
                {plan.highlighted && (
                  <div
                    className="absolute -inset-[1px] rounded-2xl -z-10 opacity-50"
                    style={{ background: `linear-gradient(135deg, ${accent}60, transparent 50%, ${accent}30)` }}
                  />
                )}
                {plan.badge && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-medium px-3 py-1 rounded-full"
                    style={plan.highlighted
                      ? { backgroundColor: accent, color: '#0a0a0a', border: 'none', fontWeight: 700 }
                      : { border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }
                    }
                  >
                    {plan.badge}
                  </span>
                )}
                <div className="mb-6">
                  <h3 {...elementProps(config.id, `plans.${planIdx}.name`, 'heading')} className="font-bold text-lg mb-1 text-white">{plan.name}</h3>
                  <p {...elementProps(config.id, `plans.${planIdx}.description`, 'text')} className="text-xs mb-4 text-white/40">{plan.description}</p>
                  <div className="flex items-end gap-2">
                    <span {...elementProps(config.id, `plans.${planIdx}.price`, 'text')} className="text-4xl font-bold text-white">{plan.price}</span>
                    {(plan as any).originalPrice && (
                      <span className="text-lg line-through mb-1 text-white/30">{(plan as any).originalPrice}</span>
                    )}
                    <span className="text-sm mb-1 text-white/30">{displayPeriod(plan.period)}</span>
                  </div>
                </div>
                <div className="w-full h-px bg-white/10 mb-6" />
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={cn('flex items-center gap-2 text-sm',
                      feature.included ? 'text-white/80' : 'text-white/20'
                    )}>
                      {feature.included
                        ? <Check className="w-4 h-4 shrink-0" style={{ color: accent }} />
                        : <X className="w-4 h-4 shrink-0 opacity-40" />
                      }
                      <span {...elementProps(config.id, `plans.${planIdx}.features.${i}`, 'text')}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                {embedUrl ? (
                  <button
                    {...elementProps(config.id, `plans.${planIdx}.cta`, 'button')}
                    onClick={() => setModalOpen(true)}
                    className={cn(
                      'block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all mt-auto cursor-pointer',
                      plan.highlighted
                        ? 'text-white hover:opacity-90 shadow-lg'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    )}
                    style={plan.highlighted ? { background: `linear-gradient(135deg, ${accent}, ${accent}99)`, boxShadow: `0 0 20px ${accent}30` } : undefined}
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <a
                    {...elementProps(config.id, `plans.${planIdx}.cta`, 'button')}
                    href={plan.ctaHref}
                    className={cn(
                      'block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all mt-auto',
                      plan.highlighted
                        ? 'text-white hover:opacity-90 shadow-lg'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    )}
                    style={plan.highlighted ? { background: `linear-gradient(135deg, ${accent}, ${accent}99)`, boxShadow: `0 0 20px ${accent}30` } : undefined}
                  >
                    {plan.cta}
                  </a>
                )}
              </div>
            ))}
          </div>
          {/* Billetweb modal */}
          {modalOpen && embedUrl && (
            <BilletwebModal embedUrl={embedUrl} accentColor={accent} variant="dark" onClose={closeModal} />
          )}
        </div>
      </section>
    )
  }

  // ─────────────────────────────────────────────
  // FALLBACK (startup-columns)
  // ─────────────────────────────────────────────
  const accent = accentColor ?? '#6366f1'
  return (
    <section className="relative bg-zinc-50 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className={cn("text-center mb-14 space-y-3", textAlign && getTextAlignClass(textAlign))}>
          {content.eyebrow ? (
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>
              {content.eyebrow}
            </span>
          ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
          {content.title && <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl sm:text-4xl font-bold text-zinc-900", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
          {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 max-w-2xl mx-auto">{content.subtitle}</p>}
        </div>
        <div className={cn(
          'grid gap-6 items-start',
          plans.length <= 2 ? 'sm:grid-cols-2 max-w-3xl mx-auto' : 'sm:grid-cols-3'
        )}>
          {plans.map((plan, planIdx) => (
            <div
              key={plan.id}
              className={cn(
                'rounded-2xl p-6 relative transition-all',
                plan.highlighted
                  ? 'text-white scale-105 shadow-2xl ring-2'
                  : 'bg-white shadow-sm border border-zinc-100'
              )}
              style={plan.highlighted
                ? { backgroundColor: accent, ringColor: accent, '--tw-ring-color': accent, boxShadow: `0 20px 50px -12px ${accent}40` } as React.CSSProperties
                : undefined
              }
            >
              {plan.badge && (
                <span className={cn(
                  'absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full',
                  plan.highlighted ? 'bg-amber-400 text-amber-900' : 'bg-zinc-800 text-white'
                )}>
                  {plan.badge}
                </span>
              )}
              <div className="mb-6">
                <h3 {...elementProps(config.id, `plans.${planIdx}.name`, 'heading')} className={cn('font-bold text-lg mb-1', plan.highlighted ? 'text-white' : 'text-zinc-900')}>{plan.name}</h3>
                <p {...elementProps(config.id, `plans.${planIdx}.description`, 'text')} className={cn('text-xs mb-4', plan.highlighted ? 'text-white/70' : 'text-zinc-500')}>{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span {...elementProps(config.id, `plans.${planIdx}.price`, 'text')} className={cn('text-4xl font-bold', plan.highlighted ? 'text-white' : 'text-zinc-900')}>{plan.price}</span>
                  <span className={cn('text-sm mb-1', plan.highlighted ? 'text-white/70' : 'text-zinc-400')}>{displayPeriod(plan.period)}</span>
                </div>
              </div>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className={cn('flex items-center gap-2 text-sm',
                    plan.highlighted ? 'text-white' : feature.included ? 'text-zinc-700' : 'text-zinc-400'
                  )}>
                    {feature.included
                      ? <Check className={cn('w-4 h-4 shrink-0', plan.highlighted ? 'text-white/80' : '')} style={!plan.highlighted ? { color: accent } : undefined} />
                      : <X className="w-4 h-4 shrink-0 opacity-40" />
                    }
                    <span {...elementProps(config.id, `plans.${planIdx}.features.${i}`, 'text')}>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <a
                {...elementProps(config.id, `plans.${planIdx}.cta`, 'button')}
                          href={plan.ctaHref}
                className={cn(
                  'block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-colors',
                  plan.highlighted
                    ? 'bg-white hover:bg-white/90'
                    : 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
                )}
                style={plan.highlighted ? { color: accent } : undefined}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const pricingMeta = {
  type: 'pricing',
  label: 'Tarifs',
  icon: '💰',
  variants: [
    'startup-columns', 'startup-comparison',
    'corporate-columns', 'corporate-comparison',
    'luxe-columns', 'luxe-comparison',
    'creative-columns', 'creative-comparison',
    'ecommerce-columns', 'ecommerce-comparison',
    'glass-columns', 'glass-comparison',
  ],
  defaultVariant: 'startup-columns',
  defaultContent: {},
}
