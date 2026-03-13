import { cn } from '@/lib/utils'
import { sectionClasses, getTextColorClass, getMutedTextClass, getEyebrowClass, getTitleSizeClass, getTextAlignClass } from '../_utils'
import type { SectionConfig } from '@/types/site'
import type { TimelineContent, TimelineItem } from '@/types/sections'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { elementProps } from '@/lib/elementHelpers'

export function TimelineSection({ config }: { config: SectionConfig }) {
  const content = (config.content ?? {}) as Partial<TimelineContent>
  const variant = config.variant ?? 'startup-vertical'
  const { accentColor, textColor: customTextColor } = config.style
  const items: TimelineItem[] = content.items ?? []
  const eyebrow = content.eyebrow
  const title = content.title

  const [universe, layout] = variant.includes('-')
    ? [variant.substring(0, variant.lastIndexOf('-')), variant.substring(variant.lastIndexOf('-') + 1)]
    : ['startup', variant]

  // ═══════════════════════════════════════════
  // STARTUP — SaaS/modern
  // ═══════════════════════════════════════════

  if (universe === 'startup') {
    const accent = accentColor ?? '#6366f1'

    const header = (
      <div className="text-center mb-14 space-y-4">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border border-zinc-200 text-zinc-600 bg-white shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
            {eyebrow}
          </span>
        )}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
      </div>
    )

    if (layout === 'alternating') {
      return (
        <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-4xl mx-auto px-6">
            {header}
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-zinc-200" />
              <div className="space-y-12">
                {items.map((item, i) => {
                  const isLeft = i % 2 === 0
                  return (
                    <div key={item.id} className={cn('flex items-start gap-8 relative', isLeft ? 'flex-row' : 'flex-row-reverse')}>
                      <div className={cn('flex-1', isLeft ? 'text-right' : 'text-left')}>
                        <p {...elementProps(config.id, `items.${i}.date`, 'text')} className="text-xs font-semibold mb-1" style={{ color: accent }}>{item.date}</p>
                        <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-zinc-900 mb-1">{item.title}</h3>
                        <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                      </div>
                      <div className="relative z-10 shrink-0">
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg"
                          style={{ backgroundColor: accent }}
                        >
                          {item.icon ? <DynamicIcon name={item.icon} className="w-4 h-4" fallbackClassName="text-sm leading-none" /> : (i + 1)}
                        </div>
                      </div>
                      <div className="flex-1" />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )
    }

    // vertical (default)
    return (
      <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-3xl mx-auto px-6">
          {header}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-200" />
            <div className="space-y-8">
              {items.map((item, i) => (
                <div key={item.id} className="flex gap-6 relative">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 z-10 text-white shadow-lg"
                    style={{ backgroundColor: accent }}
                  >
                    {item.icon ? <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-xl leading-none" /> : (i + 1)}
                  </div>
                  <div className="flex-1 pb-2">
                    <p {...elementProps(config.id, `items.${i}.date`, 'text')} className="text-xs font-semibold mb-1" style={{ color: accent }}>{item.date}</p>
                    <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-zinc-900 mb-1">{item.title}</h3>
                    <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CORPORATE — Navy/professional
  // ═══════════════════════════════════════════

  if (universe === 'corporate') {
    const accent = accentColor ?? '#3b82f6'

    const header = (
      <div className="mb-14 space-y-4">
        {eyebrow && (
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded border text-blue-300 border-blue-500/30 bg-blue-500/10">
            {eyebrow}
          </span>
        )}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-white leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
      </div>
    )

    if (layout === 'alternating') {
      return (
        <section className="bg-[#0f172a] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            {header}
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-slate-700" />
              <div className="space-y-10">
                {items.map((item, i) => {
                  const isLeft = i % 2 === 0
                  return (
                    <div key={item.id} className={cn('flex items-start gap-6 relative', isLeft ? 'flex-row' : 'flex-row-reverse')}>
                      <div className={cn('flex-1 p-5 rounded-xl bg-slate-800/50 border border-slate-700/50', isLeft ? 'text-right' : 'text-left')}>
                        <p {...elementProps(config.id, `items.${i}.date`, 'text')} className="text-xs font-semibold mb-1 text-blue-400">{item.date}</p>
                        <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-white mb-1">{item.title}</h3>
                        <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                      </div>
                      <div className="relative z-10 shrink-0">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-600 bg-slate-800 text-white">
                          {item.icon ? <DynamicIcon name={item.icon} className="w-4 h-4" fallbackClassName="text-sm leading-none" /> : (i + 1)}
                        </div>
                      </div>
                      <div className="flex-1" />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )
    }

    // vertical
    return (
      <section className="bg-[#0f172a] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-3xl mx-auto px-6">
          {header}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-700" />
            <div className="space-y-8">
              {items.map((item, i) => (
                <div key={item.id} className="flex gap-6 relative">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl shrink-0 z-10 border border-slate-600 bg-slate-800 text-white">
                    {item.icon ? <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-xl leading-none" /> : (i + 1)}
                  </div>
                  <div className="flex-1 pb-2">
                    <p {...elementProps(config.id, `items.${i}.date`, 'text')} className="text-xs font-semibold mb-1 text-blue-400">{item.date}</p>
                    <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-white mb-1">{item.title}</h3>
                    <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // LUXE — Gold/elegant
  // ═══════════════════════════════════════════

  if (universe === 'luxe') {
    const gold = accentColor ?? '#b8860b'

    const header = (
      <div className="text-center mb-16 space-y-5">
        {eyebrow && (
          <span className="inline-block text-xs tracking-[0.25em] uppercase font-light" style={{ color: gold }}>
            {eyebrow}
          </span>
        )}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-light text-zinc-900 leading-tight tracking-tight" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
        <div className="w-12 h-px mx-auto" style={{ background: gold }} />
      </div>
    )

    if (layout === 'alternating') {
      return (
        <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-4xl mx-auto px-6">
            {header}
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: `linear-gradient(to bottom, transparent, ${gold}, transparent)` }} />
              <div className="space-y-16">
                {items.map((item, i) => {
                  const isLeft = i % 2 === 0
                  return (
                    <div key={item.id} className={cn('flex items-start gap-10 relative', isLeft ? 'flex-row' : 'flex-row-reverse')}>
                      <div className={cn('flex-1', isLeft ? 'text-right' : 'text-left')}>
                        <span {...elementProps(config.id, `items.${i}.date`, 'text')} className="text-xs tracking-[0.2em] uppercase font-light" style={{ color: gold }}>{item.date}</span>
                        <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-medium text-zinc-900 tracking-wide text-sm uppercase mt-2 mb-2">{item.title}</h3>
                        <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-400 leading-relaxed font-light">{item.description}</p>
                      </div>
                      <div className="relative z-10 shrink-0">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center border bg-white" style={{ borderColor: gold }}>
                          {item.icon ? <DynamicIcon name={item.icon} className="w-4 h-4" fallbackClassName="text-sm leading-none" /> : (
                            <span className="text-xs font-light" style={{ color: gold }}>{String(i + 1).padStart(2, '0')}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1" />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )
    }

    // vertical
    return (
      <section className="bg-zinc-50 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-3xl mx-auto px-6">
          {header}
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${gold}, transparent)` }} />
            <div className="space-y-12">
              {items.map((item, i) => (
                <div key={item.id} className="flex gap-8 relative">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border bg-white" style={{ borderColor: gold }}>
                    {item.icon ? <DynamicIcon name={item.icon} className="w-4 h-4" fallbackClassName="text-sm leading-none" /> : (
                      <span className="text-xs font-light" style={{ color: gold }}>{String(i + 1).padStart(2, '0')}</span>
                    )}
                  </div>
                  <div className="flex-1 border-t border-zinc-200 pt-4">
                    <span {...elementProps(config.id, `items.${i}.date`, 'text')} className="text-xs tracking-[0.2em] uppercase font-light" style={{ color: gold }}>{item.date}</span>
                    <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-medium text-zinc-900 tracking-wide text-sm uppercase mt-2 mb-2">{item.title}</h3>
                    <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-400 leading-relaxed font-light">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CREATIVE — Neobrutalist
  // ═══════════════════════════════════════════

  if (universe === 'creative') {
    const header = (
      <div className="mb-14 space-y-4">
        {eyebrow && (
          <span
            className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 border-2 border-zinc-900 text-zinc-900"
            style={accentColor ? { backgroundColor: accentColor, borderColor: accentColor, color: '#fff' } : undefined}
          >
            {eyebrow}
          </span>
        )}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-5xl font-black text-zinc-900 leading-[0.95]" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
      </div>
    )

    if (layout === 'alternating') {
      return (
        <section className="bg-[#fdf6e3] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            {header}
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-zinc-900" />
              <div className="space-y-8">
                {items.map((item, i) => {
                  const isLeft = i % 2 === 0
                  return (
                    <div key={item.id} className={cn('flex items-start gap-6 relative', isLeft ? 'flex-row' : 'flex-row-reverse')}>
                      <div className={cn('flex-1 bg-white border-2 border-zinc-900 p-5 shadow-[4px_4px_0_0_#18181b]', isLeft ? 'text-right' : 'text-left')}>
                        <span {...elementProps(config.id, `items.${i}.date`, 'text')} className="text-xs font-bold uppercase tracking-wider text-zinc-400">{item.date}</span>
                        <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-black text-zinc-900 uppercase tracking-wide text-sm mt-2 mb-1">{item.title}</h3>
                        <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-600 leading-relaxed">{item.description}</p>
                      </div>
                      <div className="relative z-10 shrink-0">
                        <div className="w-12 h-12 border-2 border-zinc-900 bg-white flex items-center justify-center text-lg font-black shadow-[3px_3px_0_0_#18181b]">
                          {item.icon ? <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-lg leading-none" /> : (i + 1)}
                        </div>
                      </div>
                      <div className="flex-1" />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )
    }

    // vertical
    return (
      <section className="bg-[#fdf6e3] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-3xl mx-auto px-6">
          {header}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-zinc-900" />
            <div className="space-y-0 border-t-2 border-zinc-900">
              {items.map((item, i) => (
                <div key={item.id} className="flex gap-6 relative border-b-2 border-zinc-900 py-6">
                  <div className="w-12 h-12 border-2 border-zinc-900 bg-white flex items-center justify-center text-lg font-black shrink-0 z-10 shadow-[3px_3px_0_0_#18181b]">
                    {item.icon ? <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-lg leading-none" /> : (i + 1)}
                  </div>
                  <div className="flex-1">
                    <span {...elementProps(config.id, `items.${i}.date`, 'text')} className="text-xs font-bold uppercase tracking-wider text-zinc-400">{item.date}</span>
                    <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-black text-zinc-900 uppercase tracking-wide text-sm mt-1 mb-1">{item.title}</h3>
                    <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // ECOMMERCE — Green/trust
  // ═══════════════════════════════════════════

  if (universe === 'ecommerce') {
    const accent = accentColor ?? '#059669'

    const header = (
      <div className="text-center mb-14 space-y-3">
        {eyebrow && (
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>
            {eyebrow}
          </span>
        )}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
      </div>
    )

    if (layout === 'alternating') {
      return (
        <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-4xl mx-auto px-6">
            {header}
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-emerald-200" />
              <div className="space-y-10">
                {items.map((item, i) => {
                  const isLeft = i % 2 === 0
                  return (
                    <div key={item.id} className={cn('flex items-start gap-6 relative', isLeft ? 'flex-row' : 'flex-row-reverse')}>
                      <div className={cn('flex-1 rounded-2xl p-5 bg-emerald-50/50 border border-emerald-100', isLeft ? 'text-right' : 'text-left')}>
                        <p {...elementProps(config.id, `items.${i}.date`, 'text')} className="text-xs font-semibold mb-1" style={{ color: accent }}>{item.date}</p>
                        <div className={cn('flex items-center gap-2 mb-1', isLeft ? 'justify-end' : 'justify-start')}>
                          <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-zinc-900">{item.title}</h3>
                          <svg className="w-4 h-4 shrink-0" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        </div>
                        <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                      </div>
                      <div className="relative z-10 shrink-0">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                          style={{ backgroundColor: accent }}
                        >
                          {item.icon ? <DynamicIcon name={item.icon} className="w-4 h-4" fallbackClassName="text-sm leading-none" /> : (i + 1)}
                        </div>
                      </div>
                      <div className="flex-1" />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )
    }

    // vertical
    return (
      <section className="bg-zinc-50 py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-3xl mx-auto px-6">
          {header}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-emerald-200" />
            <div className="space-y-6">
              {items.map((item, i) => (
                <div key={item.id} className="flex gap-6 relative">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 z-10 text-white shadow-md"
                    style={{ backgroundColor: accent }}
                  >
                    {item.icon ? <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-xl leading-none" /> : (i + 1)}
                  </div>
                  <div className="flex-1 pb-2 rounded-2xl p-4 bg-white border border-zinc-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <p {...elementProps(config.id, `items.${i}.date`, 'text')} className="text-xs font-semibold" style={{ color: accent }}>{item.date}</p>
                      <svg className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </div>
                    <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-zinc-900 mb-1">{item.title}</h3>
                    <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // GLASS — Dark glassmorphism
  // ═══════════════════════════════════════════

  if (universe === 'glass') {
    const accent = accentColor ?? '#818cf8'

    const header = (
      <div className="text-center mb-14 space-y-4">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/[0.04] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}80` }} />
            {eyebrow}
          </span>
        )}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-white leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
      </div>
    )

    if (layout === 'alternating') {
      return (
        <section className="bg-[#0a0a0f] py-20 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 dot-grid" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${accent}30, transparent 70%)` }}
          />
          <div className="relative max-w-5xl mx-auto px-6">
            {header}
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: `linear-gradient(to bottom, transparent, ${accent}40, transparent)` }} />
              <div className="space-y-10">
                {items.map((item, i) => {
                  const isLeft = i % 2 === 0
                  return (
                    <div key={item.id} className={cn('flex items-start gap-6 relative', isLeft ? 'flex-row' : 'flex-row-reverse')}>
                      <div className={cn('flex-1 bg-white/[0.04] backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08]', isLeft ? 'text-right' : 'text-left')}>
                        <p {...elementProps(config.id, `items.${i}.date`, 'text')} className="text-xs font-semibold mb-1" style={{ color: accent }}>{item.date}</p>
                        <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-white mb-1">{item.title}</h3>
                        <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-white/40 leading-relaxed">{item.description}</p>
                      </div>
                      <div className="relative z-10 shrink-0">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] text-white"
                        >
                          {item.icon ? <DynamicIcon name={item.icon} className="w-4 h-4" fallbackClassName="text-sm leading-none" /> : (i + 1)}
                        </div>
                        <div
                          className="absolute inset-0 rounded-xl opacity-50 blur-md -z-10"
                          style={{ background: accent }}
                        />
                      </div>
                      <div className="flex-1" />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )
    }

    // vertical
    return (
      <section className="bg-[#0a0a0f] py-20 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="absolute inset-0 dot-grid" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent}30, transparent 70%)` }}
        />
        <div className="relative max-w-3xl mx-auto px-6">
          {header}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${accent}40, transparent)` }} />
            <div className="space-y-8">
              {items.map((item, i) => (
                <div key={item.id} className="flex gap-6 relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 z-10 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] text-white"
                  >
                    {item.icon ? <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-xl leading-none" /> : (i + 1)}
                  </div>
                  <div className="flex-1 pb-2">
                    <p {...elementProps(config.id, `items.${i}.date`, 'text')} className="text-xs font-semibold mb-1" style={{ color: accent }}>{item.date}</p>
                    <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-white mb-1">{item.title}</h3>
                    <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-white/40 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // fallback
  return <TimelineSection config={{ ...config, variant: 'startup-vertical' }} />
}

export const timelineMeta = {
  type: 'timeline',
  label: 'Timeline',
  icon: '📅',
  variants: [
    'startup-vertical', 'startup-alternating',
    'corporate-vertical', 'corporate-alternating',
    'luxe-vertical', 'luxe-alternating',
    'creative-vertical', 'creative-alternating',
    'ecommerce-vertical', 'ecommerce-alternating',
    'glass-vertical', 'glass-alternating',
  ],
  defaultVariant: 'startup-vertical',
  defaultContent: {},
}
