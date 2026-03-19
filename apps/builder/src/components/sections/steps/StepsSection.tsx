import { cn } from '@/lib/utils'
import { sectionClasses, getTextColorClass, getMutedTextClass, getEyebrowClass, getTitleSizeClass, getTextAlignClass } from '../_utils'
import type { SectionConfig } from '@/types/site'
import type { StepsContent } from '@/types/sections'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { elementProps } from '@/lib/elementHelpers'

export function StepsSection({ config, isEditing }: { config: SectionConfig; isEditing?: boolean }) {
  const content = (config.content ?? {}) as Partial<StepsContent>
  const variant = config.variant ?? 'startup-horizontal'
  const { accentColor, textColor: customTextColor } = config.style
  const items = content.items ?? []
  const eyebrow = content.eyebrow
  const title = content.title
  const subtitle = content.subtitle

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
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    )

    if (layout === 'vertical') {
      return (
        <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-3xl mx-auto px-6">
            {header}
            <div className="space-y-0">
              {items.map((item, i) => (
                <div key={item.id} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div
                      {...elementProps(config.id, `items.${i}.number`, 'badge')}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0 text-white shadow-lg"
                      style={{ backgroundColor: accent }}
                    >
                      {item.icon ? <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-lg leading-none" /> : item.number}
                    </div>
                    {i < items.length - 1 && (
                      <div className="w-px flex-1 my-2 bg-zinc-200" />
                    )}
                  </div>
                  <div className="pb-10">
                    <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-zinc-900 mb-1">{item.title}</h3>
                    <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // horizontal (default)
    return (
      <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          {header}
          <div className="grid sm:grid-cols-3 gap-8 relative">
            {items.map((item, i) => (
              <div key={item.id} className="relative text-center space-y-4">
                <div
                  {...elementProps(config.id, `items.${i}.number`, 'badge')}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto text-xl font-bold text-white shadow-lg"
                  style={{ backgroundColor: accent }}
                >
                  {item.icon ? <DynamicIcon name={item.icon} className="w-6 h-6" fallbackClassName="text-xl leading-none" /> : item.number}
                </div>
                {i < items.length - 1 && (
                  <div className="hidden sm:block absolute top-7 left-[60%] right-[-40%] h-px bg-zinc-200" />
                )}
                <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-zinc-900">{item.title}</h3>
                <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
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
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-slate-400 max-w-2xl">{subtitle}</p>}
      </div>
    )

    if (layout === 'vertical') {
      return (
        <section className="bg-[#0f172a] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-3xl mx-auto px-6">
            {header}
            <div className="space-y-0 border-l border-slate-700 ml-6">
              {items.map((item, i) => (
                <div key={item.id} className="flex gap-6 relative pl-8 pb-10 last:pb-0">
                  <div
                    {...elementProps(config.id, `items.${i}.number`, 'badge')}
                    className="absolute -left-5 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 border border-slate-600 bg-slate-800 text-white"
                  >
                    {item.icon ? <DynamicIcon name={item.icon} className="w-4 h-4" fallbackClassName="text-sm leading-none" /> : item.number}
                  </div>
                  <div>
                    <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-white mb-1">{item.title}</h3>
                    <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // horizontal
    return (
      <section className="bg-[#0f172a] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto px-6">
          {header}
          <div className="grid sm:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <div key={item.id} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    {...elementProps(config.id, `items.${i}.number`, 'badge')}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold border border-blue-500/20 bg-blue-500/10 text-blue-300"
                  >
                    {item.icon ? <DynamicIcon name={item.icon} className="w-4 h-4" fallbackClassName="text-sm leading-none" /> : item.number}
                  </div>
                  <div className="h-px flex-1 bg-slate-700/50" />
                </div>
                <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-white mb-2">{item.title}</h3>
                <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
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
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-400 max-w-xl mx-auto tracking-wide font-light">{subtitle}</p>}
      </div>
    )

    if (layout === 'vertical') {
      return (
        <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-3xl mx-auto px-6">
            {header}
            <div className="space-y-12">
              {items.map((item, i) => (
                <div key={item.id} className="flex gap-8 items-start">
                  <div className="flex flex-col items-center">
                    <span {...elementProps(config.id, `items.${i}.number`, 'badge')} className="text-2xl font-light tracking-wide shrink-0" style={{ color: gold }}>
                      {item.number || String(i + 1).padStart(2, '0')}
                    </span>
                    {i < items.length - 1 && (
                      <div className="w-px flex-1 mt-3" style={{ background: `linear-gradient(to bottom, ${gold}, transparent)` }} />
                    )}
                  </div>
                  <div className="flex-1 border-t border-zinc-100 pt-4 pb-2">
                    {item.icon && (
                      <div className="mb-3">
                        <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-lg leading-none" />
                      </div>
                    )}
                    <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-medium text-zinc-900 tracking-wide text-sm uppercase mb-2">{item.title}</h3>
                    <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-400 leading-relaxed font-light">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // horizontal
    return (
      <section className="bg-zinc-50 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          {header}
          <div className="grid sm:grid-cols-3 gap-10">
            {items.map((item, i) => (
              <div key={item.id} className="text-center space-y-4">
                <span {...elementProps(config.id, `items.${i}.number`, 'badge')} className="inline-block text-xs font-light tracking-[0.2em] uppercase" style={{ color: gold }}>
                  {item.number || String(i + 1).padStart(2, '0')}
                </span>
                {item.icon && (
                  <div className="flex justify-center">
                    <DynamicIcon name={item.icon} className="w-6 h-6" fallbackClassName="text-xl leading-none" />
                  </div>
                )}
                <div className="w-8 h-px mx-auto" style={{ background: gold }} />
                <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-medium text-zinc-900 tracking-wide text-sm uppercase">{item.title}</h3>
                <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-400 leading-relaxed font-light">{item.description}</p>
              </div>
            ))}
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
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-600 max-w-lg">{subtitle}</p>}
      </div>
    )

    if (layout === 'vertical') {
      return (
        <section className="bg-[#fdf6e3] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-3xl mx-auto px-6">
            {header}
            <div className="space-y-0 border-l-4 border-zinc-900 ml-4">
              {items.map((item, i) => (
                <div key={item.id} className="relative pl-10 pb-10 last:pb-0">
                  <div {...elementProps(config.id, `items.${i}.number`, 'badge')} className="absolute -left-6 w-12 h-12 border-2 border-zinc-900 bg-white flex items-center justify-center text-lg font-black shadow-[3px_3px_0_0_#18181b]">
                    {item.icon ? <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-lg leading-none" /> : item.number}
                  </div>
                  <div className="pt-1">
                    <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-black text-zinc-900 uppercase tracking-wide text-sm mb-1">{item.title}</h3>
                    <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // horizontal
    return (
      <section className="bg-[#fdf6e3] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto px-6">
          {header}
          <div className="grid sm:grid-cols-3 gap-5">
            {items.map((item, i) => (
              <div key={item.id} className="relative bg-white border-2 border-zinc-900 p-6 shadow-[4px_4px_0_0_#18181b] hover:shadow-[6px_6px_0_0_#18181b] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all">
                <div {...elementProps(config.id, `items.${i}.number`, 'badge')} className="w-12 h-12 border-2 border-zinc-900 flex items-center justify-center text-lg font-black mb-4 bg-[#fdf6e3]">
                  {item.icon ? <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-lg leading-none" /> : item.number}
                </div>
                <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-black text-zinc-900 uppercase tracking-wide text-sm mb-2">{item.title}</h3>
                <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
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
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-500 max-w-xl mx-auto">{subtitle}</p>}
      </div>
    )

    if (layout === 'vertical') {
      return (
        <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-3xl mx-auto px-6">
            {header}
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={item.id} className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 hover:border-emerald-200 transition-colors">
                  <div
                    {...elementProps(config.id, `items.${i}.number`, 'badge')}
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-sm"
                    style={{ backgroundColor: accent }}
                  >
                    {item.icon ? <DynamicIcon name={item.icon} className="w-4 h-4" fallbackClassName="text-sm leading-none" /> : item.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-zinc-900">{item.title}</h3>
                      <svg className="w-4 h-4 shrink-0" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </div>
                    <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // horizontal
    return (
      <section className="bg-zinc-50 py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          {header}
          <div className="grid sm:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm text-center space-y-3 hover:shadow-md transition-shadow">
                <div
                  {...elementProps(config.id, `items.${i}.number`, 'badge')}
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto text-white font-bold"
                  style={{ backgroundColor: accent }}
                >
                  {item.icon ? <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-lg leading-none" /> : item.number}
                </div>
                <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-zinc-900">{item.title}</h3>
                <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: accent }}>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Verifie
                </span>
              </div>
            ))}
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
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/40 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    )

    if (layout === 'vertical') {
      return (
        <section className="bg-[#0a0a0f] py-20 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 dot-grid" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${accent}30, transparent 70%)` }}
          />
          <div className="relative max-w-3xl mx-auto px-6">
            {header}
            <div className="space-y-0">
              {items.map((item, i) => (
                <div key={item.id} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div
                      {...elementProps(config.id, `items.${i}.number`, 'badge')}
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] text-white"
                    >
                      {item.icon ? <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-lg leading-none" /> : item.number}
                    </div>
                    {i < items.length - 1 && (
                      <div className="w-px flex-1 my-2" style={{ background: `linear-gradient(to bottom, ${accent}40, transparent)` }} />
                    )}
                  </div>
                  <div className="pb-10">
                    <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-white mb-1">{item.title}</h3>
                    <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-white/40 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // horizontal
    return (
      <section className="bg-[#0a0a0f] py-20 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="absolute inset-0 dot-grid" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent}20, transparent 70%)` }}
        />
        <div className="relative max-w-5xl mx-auto px-6">
          {header}
          <div className="grid sm:grid-cols-3 gap-5">
            {items.map((item, i) => (
              <div key={item.id} className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 border border-white/[0.08] hover:border-white/[0.15] transition-colors text-center space-y-4 relative overflow-hidden">
                <div className="absolute top-0 left-[20%] right-[20%] h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }} />
                <div
                  {...elementProps(config.id, `items.${i}.number`, 'badge')}
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto text-lg font-bold border border-white/10 text-white"
                  style={{ backgroundColor: `${accent}15` }}
                >
                  {item.icon ? <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-lg leading-none" /> : item.number}
                </div>
                <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-white">{item.title}</h3>
                <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-white/40 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // JLSTUDIO-PROCESS — Brixsa-style sticky text + scrolling bg per step
  // Each step: tall container (180vh), bg image scrolls away, text stays sticky
  // ═══════════════════════════════════════════

  if (variant === 'jlstudio-process') {
    const accent = accentColor ?? '#638BFF'
    const BG = '#0a0a0f'
    const isPreview = !isEditing

    const defaultImages = [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
    ]

    return (
      <section style={{ fontFamily: 'var(--font-body, inherit)' }}>
        {/* Section header */}
        <div style={{ backgroundColor: BG, padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)', textAlign: 'center' }}>
          {eyebrow && (
            <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, marginBottom: 16 }}>
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 {...elementProps(config.id, 'title', 'heading')} style={{ fontSize: 'clamp(2rem, 1.2rem + 3.5vw, 3.5rem)', fontWeight: 700, color: '#FFFFFF', lineHeight: '110%', marginBottom: subtitle ? 16 : 0 }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p {...elementProps(config.id, 'subtitle', 'text')} style={{ fontSize: 17, color: 'rgba(255,255,255,0.4)', maxWidth: 600, margin: '0 auto' }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Steps — each is a tall block with bg image + sticky text overlay */}
        {items.map((item, i) => {
          const image = (item as any).image || defaultImages[i % defaultImages.length]
          const stepNumber = String(i + 1).padStart(2, '0')

          return (
            <div
              key={item.id}
              style={{
                position: 'relative',
                minHeight: isPreview ? '180vh' : '100vh',
                backgroundColor: BG,
                color: '#FFFFFF',
                zIndex: 2,
              }}
            >
              {/* Background image — absolute, scrolls with its parent */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt=""
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                />
                {/* Dark overlay */}
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)' }} />
              </div>

              {/* Sticky text content — stays fixed while bg scrolls */}
              <div
                style={{
                  position: isPreview ? 'sticky' : 'absolute',
                  top: isPreview ? '15vh' : 0,
                  left: 0,
                  right: 0,
                  zIndex: 2,
                  padding: 'clamp(40px, 8vw, 100px) clamp(20px, 5vw, 60px)',
                  ...(isPreview ? {} : { bottom: 0, display: 'flex', alignItems: 'center', height: '100%' }),
                }}
              >
                <div style={{ maxWidth: 800, width: '100%' }}>
                  {/* Step number large + badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                    <span
                      {...elementProps(config.id, `items.${i}.number`, 'badge')}
                      style={{
                        fontSize: 'clamp(4rem, 3rem + 4vw, 7rem)',
                        fontWeight: 800,
                        lineHeight: 1,
                        color: `${accent}25`,
                        fontFamily: "'Inter Variable', 'Inter', sans-serif",
                      }}
                    >
                      {stepNumber}
                    </span>
                    {(item as any).badge && (
                      <span style={{
                        padding: '6px 16px',
                        borderRadius: 100,
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        background: `${accent}15`,
                        color: accent,
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase' as const,
                        border: `1px solid ${accent}30`,
                      }}>
                        {(item as any).badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    style={{
                      fontSize: 'clamp(2rem, 1.2rem + 3vw, 3.5rem)',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      lineHeight: '115%',
                      marginBottom: 16,
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    {...elementProps(config.id, `items.${i}.description`, 'text')}
                    style={{ fontSize: 17, lineHeight: '170%', color: 'rgba(255,255,255,0.65)', maxWidth: 560 }}
                  >
                    {item.description}
                  </p>

                  {/* Details */}
                  {(item as any).details && (
                    <p style={{ marginTop: 16, fontSize: 14, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.02em' }}>
                      {(item as any).details}
                    </p>
                  )}

                  {/* Step indicator */}
                  <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {Array.from({ length: items.length }, (_, j) => (
                      <div
                        key={j}
                        style={{
                          width: j === i ? 32 : 8,
                          height: 3,
                          borderRadius: 2,
                          backgroundColor: j === i ? accent : 'rgba(255,255,255,0.15)',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ))}
                    <span style={{ marginLeft: 12, fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
                      {stepNumber} / {String(items.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // JLSTUDIO — Vertical center-line timeline
  // ═══════════════════════════════════════════

  if (universe === 'jlstudio') {
    const accent = accentColor ?? '#638BFF'

    return (
      <section className="relative bg-[#050507] py-24 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        {/* Grid background pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-15 blur-3xl" style={{ background: `radial-gradient(ellipse, ${accent}30, transparent 70%)` }} />

        <div className="relative max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20 space-y-4">
            {eyebrow && (
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: accent }}>
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-5xl font-bold text-white leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
                {title}
              </h2>
            )}
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/40 max-w-2xl mx-auto">{subtitle}</p>}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Center line (desktop) / Left line (mobile) */}
            <div className="absolute top-0 bottom-0 left-4 md:left-1/2 md:-translate-x-px w-px" style={{ background: `linear-gradient(to bottom, transparent, ${accent}40 10%, ${accent}40 90%, transparent)` }} />

            <div className="space-y-16 md:space-y-20">
              {items.map((item, i) => {
                const isLeft = i % 2 === 0

                return (
                  <div key={item.id} className="relative">
                    {/* Glowing node on the line */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 z-10">
                      <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: accent, backgroundColor: `${accent}30`, boxShadow: `0 0 12px ${accent}50` }} />
                    </div>

                    {/* Content block */}
                    <div className={cn(
                      'pl-12 md:pl-0 md:w-[calc(50%-40px)]',
                      isLeft ? 'md:mr-auto md:pr-0 md:text-right' : 'md:ml-auto md:pl-0 md:text-left'
                    )}>
                      {/* Big faded number */}
                      <span
                        {...elementProps(config.id, `items.${i}.number`, 'badge')}
                        className="block text-6xl md:text-7xl font-black leading-none mb-3"
                        style={{ color: `${accent}12` }}
                      >
                        {item.number || String(i + 1).padStart(2, '0')}
                      </span>
                      <h3
                        {...elementProps(config.id, `items.${i}.title`, 'heading')}
                        className="text-xl md:text-2xl font-bold text-white mb-2"
                      >
                        {item.title}
                      </h3>
                      <p
                        {...elementProps(config.id, `items.${i}.description`, 'text')}
                        className="text-sm md:text-base text-white/50 leading-relaxed"
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // fallback
  return <StepsSection config={{ ...config, variant: 'startup-horizontal' }} />
}

export const stepsMeta = {
  type: 'steps',
  label: 'Étapes / Process',
  icon: '🔢',
  variants: [
    'startup-horizontal', 'startup-vertical',
    'corporate-horizontal', 'corporate-vertical',
    'luxe-horizontal', 'luxe-vertical',
    'creative-horizontal', 'creative-vertical',
    'ecommerce-horizontal', 'ecommerce-vertical',
    'glass-horizontal', 'glass-vertical',
    'jlstudio-timeline',
    'jlstudio-process',
  ],
  defaultVariant: 'startup-horizontal',
  defaultContent: {},
}
