import { cn } from '@/lib/utils'
import { getTextAlignClass, getTitleSizeClass } from '../_utils'
import type { StatsConfig, StatsContent, StatItem } from '@/types/sections'
import type { SectionConfig } from '@/types/site'
import { elementProps } from '@/lib/elementHelpers'

interface StatsSectionProps {
  config: SectionConfig
  isEditing?: boolean
}

export function StatsSection({ config }: StatsSectionProps) {
  const stats = config as StatsConfig
  const content = (stats.content ?? {}) as Partial<StatsContent>
  const variant = config.variant ?? 'startup-simple'
  const { titleSize, textAlign, textColor, accentColor } = config.style
  const items: StatItem[] = content.items ?? []

  const universe = variant.split('-')[0]
  const layout = variant.split('-').slice(1).join('-')

  // Backward compat: review-stars
  if (variant === 'review-stars') {
    const average = (content as Record<string, unknown>).average as string | undefined
    const sources = ((content as Record<string, unknown>).sources ?? []) as Array<{ id: string; name: string; rating: number; count: string }>
    const avgNum = parseFloat(average ?? '0')
    const stars = (rating: number) => (
      <div className="flex gap-0.5 justify-center">
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} className={cn('text-lg', i <= Math.round(rating) ? 'text-yellow-400' : 'text-zinc-200')}>&#9733;</span>
        ))}
      </div>
    )
    return (
      <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          {average && (
            <div className="mb-8">
              <div className="text-6xl font-bold mb-2 text-indigo-600">{average}</div>
              {stars(avgNum)}
            </div>
          )}
          <div className={cn('grid gap-6', sources.length <= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4')}>
            {sources.map((src) => (
              <div key={src.id} className="rounded-xl p-5 border bg-white border-zinc-100 shadow-sm">
                <p className="font-semibold mb-1 text-zinc-900">{src.name}</p>
                {stars(src.rating)}
                <p className="text-xs mt-2 text-zinc-500">{src.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Grid cols helper
  const gridCols = items.length === 4
    ? 'sm:grid-cols-2 lg:grid-cols-4'
    : items.length === 2
      ? 'sm:grid-cols-2'
      : 'sm:grid-cols-3'

  // ═══════════════════════════════════════════
  // STARTUP — Clean modern SaaS
  // ═══════════════════════════════════════════

  if (universe === 'startup') {
    const accent = accentColor ?? '#6366f1'

    const header = (content.eyebrow || content.title) ? (
      <div className={cn('mb-14 space-y-4', getTextAlignClass(textAlign))}>
        {content.eyebrow && (
          <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border border-zinc-200 text-zinc-600 bg-white shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
            {content.eyebrow}
          </span>
        )}
        {content.title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className={cn(getTitleSizeClass(titleSize), 'font-bold text-zinc-900')}
            style={textColor ? { color: textColor } : undefined}>{content.title}</h2>
        )}
      </div>
    ) : null

    // simple
    if (layout === 'simple') {
      return (
        <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            {header}
            <div className="flex flex-wrap items-center justify-center gap-y-8">
              {items.map((item, i) => (
                <div key={item.id} className="flex items-center">
                  <div className="text-center px-8 md:px-12">
                    <div {...elementProps(config.id, `items.${i}.value`, 'text')} className="text-4xl lg:text-5xl font-bold" style={{ color: accent }}>{item.value}</div>
                    <div {...elementProps(config.id, `items.${i}.label`, 'text')} className="text-sm text-zinc-500 mt-1 font-medium">{item.label}</div>
                  </div>
                  {i < items.length - 1 && (
                    <div className="hidden sm:block w-px h-12 bg-zinc-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // cards
    if (layout === 'cards') {
      return (
        <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {header}
            <div className={cn('grid gap-5', gridCols)}>
              {items.map((item, i) => (
                <div key={item.id} className="bg-white rounded-2xl p-7 border border-zinc-100 shadow-sm text-center">
                  <div {...elementProps(config.id, `items.${i}.value`, 'text')} className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: accent }}>{item.value}</div>
                  <div {...elementProps(config.id, `items.${i}.label`, 'text')} className="font-semibold text-sm text-zinc-900">{item.label}</div>
                  {item.description && <div className="text-xs text-zinc-500 mt-1">{item.description}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // highlight
    return (
      <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          {header}
          <div className="flex flex-col items-center gap-10">
            {items.length > 0 && (
              <div className="text-center">
                <div {...elementProps(config.id, `items.0.value`, 'text')} className="text-6xl lg:text-7xl font-bold" style={{ color: accent }}>{items[0].value}</div>
                <div {...elementProps(config.id, `items.0.label`, 'text')} className="text-lg text-zinc-700 mt-2 font-medium">{items[0].label}</div>
                {items[0].description && <div className="text-sm text-zinc-500 mt-1">{items[0].description}</div>}
              </div>
            )}
            {items.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-8">
                {items.slice(1).map((item, i) => (
                  <div key={item.id} className="text-center px-6">
                    <div {...elementProps(config.id, `items.${i + 1}.value`, 'text')} className="text-2xl lg:text-3xl font-bold" style={{ color: accent }}>{item.value}</div>
                    <div {...elementProps(config.id, `items.${i + 1}.label`, 'text')} className="text-sm text-zinc-500 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CORPORATE — Professional navy
  // ═══════════════════════════════════════════

  if (universe === 'corporate') {
    const accent = accentColor ?? '#3b82f6'

    const header = (content.eyebrow || content.title) ? (
      <div className={cn('mb-14 space-y-4', getTextAlignClass(textAlign))}>
        {content.eyebrow && (
          <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded border"
            style={{ color: accent, borderColor: accent, backgroundColor: `${accent}15` }}>
            {content.eyebrow}
          </span>
        )}
        {content.title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className={cn(getTitleSizeClass(titleSize), 'font-bold text-white')}
            style={textColor ? { color: textColor } : undefined}>{content.title}</h2>
        )}
      </div>
    ) : null

    // simple
    if (layout === 'simple') {
      return (
        <section className="relative bg-slate-900 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
          <div className="relative max-w-5xl mx-auto px-6">
            {header}
            <div className="flex flex-wrap items-center justify-center gap-y-8">
              {items.map((item, i) => (
                <div key={item.id} className="flex items-center">
                  <div className="text-center px-8 md:px-12">
                    <div {...elementProps(config.id, `items.${i}.value`, 'text')} className="text-4xl lg:text-5xl font-bold text-white">{item.value}</div>
                    <div {...elementProps(config.id, `items.${i}.label`, 'text')} className="text-sm text-slate-400 mt-1 font-medium">{item.label}</div>
                  </div>
                  {i < items.length - 1 && (
                    <div className="hidden sm:block w-px h-12" style={{ backgroundColor: `${accent}40` }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // cards
    if (layout === 'cards') {
      return (
        <section className="relative bg-slate-900 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
          <div className="relative max-w-6xl mx-auto px-6">
            {header}
            <div className={cn('grid gap-5', gridCols)}>
              {items.map((item, i) => (
                <div key={item.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-7 border border-white/10 text-center"
                  style={{ borderTopColor: accent, borderTopWidth: '2px' }}>
                  <div {...elementProps(config.id, `items.${i}.value`, 'text')} className="text-3xl lg:text-4xl font-bold text-white mb-2">{item.value}</div>
                  <div {...elementProps(config.id, `items.${i}.label`, 'text')} className="font-semibold text-sm text-slate-300">{item.label}</div>
                  {item.description && <div className="text-xs text-slate-400 mt-1">{item.description}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // highlight
    return (
      <section className="relative bg-slate-900 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
        <div className="relative max-w-5xl mx-auto px-6">
          {header}
          <div className="flex flex-col items-center gap-10">
            {items.length > 0 && (
              <div className="text-center">
                <div {...elementProps(config.id, `items.0.value`, 'text')} className="text-6xl lg:text-7xl font-bold text-white">{items[0].value}</div>
                <div {...elementProps(config.id, `items.0.label`, 'text')} className="text-lg text-slate-300 mt-2 font-medium">{items[0].label}</div>
                {items[0].description && <div className="text-sm text-slate-400 mt-1">{items[0].description}</div>}
              </div>
            )}
            {items.length > 1 && (
              <div className="w-16 h-px" style={{ backgroundColor: accent }} />
            )}
            {items.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-8">
                {items.slice(1).map((item, i) => (
                  <div key={item.id} className="text-center px-6">
                    <div {...elementProps(config.id, `items.${i + 1}.value`, 'text')} className="text-2xl lg:text-3xl font-bold text-white">{item.value}</div>
                    <div {...elementProps(config.id, `items.${i + 1}.label`, 'text')} className="text-sm text-slate-400 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // LUXE — Elegant, gold
  // ═══════════════════════════════════════════

  if (universe === 'luxe') {
    const accent = accentColor ?? '#b8860b'

    const header = (content.eyebrow || content.title) ? (
      <div className={cn('mb-16 space-y-4', getTextAlignClass(textAlign))}>
        {content.eyebrow && (
          <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-block text-[10px] font-light tracking-[0.3em] uppercase" style={{ color: accent }}>
            {content.eyebrow}
          </span>
        )}
        {content.title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className={cn(getTitleSizeClass(titleSize), 'font-light tracking-wide text-zinc-900')}
            style={textColor ? { color: textColor } : undefined}>{content.title}</h2>
        )}
        <div className="flex items-center justify-center gap-4 pt-2">
          <span className="w-12 h-px" style={{ backgroundColor: accent }} />
          <span className="text-xs" style={{ color: accent }}>&#9830;</span>
          <span className="w-12 h-px" style={{ backgroundColor: accent }} />
        </div>
      </div>
    ) : null

    // simple
    if (layout === 'simple') {
      return (
        <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            {header}
            <div className="flex flex-wrap items-center justify-center gap-y-10">
              {items.map((item, i) => (
                <div key={item.id} className="flex items-center">
                  <div className="text-center px-10 md:px-14">
                    <div {...elementProps(config.id, `items.${i}.value`, 'text')} className="text-4xl lg:text-5xl font-light tracking-wide" style={{ color: accent }}>{item.value}</div>
                    <div {...elementProps(config.id, `items.${i}.label`, 'text')} className="text-xs tracking-[0.2em] uppercase text-zinc-500 mt-3 font-light">{item.label}</div>
                  </div>
                  {i < items.length - 1 && (
                    <span className="hidden sm:inline text-sm font-light" style={{ color: accent }}>&#8212;</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // cards
    if (layout === 'cards') {
      return (
        <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {header}
            <div className={cn('grid gap-6', gridCols)}>
              {items.map((item, i) => (
                <div key={item.id} className="border rounded-sm p-8 text-center" style={{ borderColor: `${accent}30` }}>
                  <div {...elementProps(config.id, `items.${i}.value`, 'text')} className="text-3xl lg:text-4xl font-light tracking-wide mb-3" style={{ color: accent }}>{item.value}</div>
                  <div className="w-8 h-px mx-auto mb-3" style={{ backgroundColor: accent }} />
                  <div {...elementProps(config.id, `items.${i}.label`, 'text')} className="text-xs tracking-[0.2em] uppercase text-zinc-700 font-light">{item.label}</div>
                  {item.description && <div className="text-xs text-zinc-400 mt-2 font-light">{item.description}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // highlight
    return (
      <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          {header}
          <div className="flex flex-col items-center gap-12">
            {items.length > 0 && (
              <div className="text-center">
                <div {...elementProps(config.id, `items.0.value`, 'text')} className="text-7xl lg:text-8xl font-light tracking-wide" style={{ color: accent }}>{items[0].value}</div>
                <div {...elementProps(config.id, `items.0.label`, 'text')} className="text-sm tracking-[0.2em] uppercase text-zinc-600 mt-4 font-light">{items[0].label}</div>
                {items[0].description && <div className="text-xs text-zinc-400 mt-2 font-light">{items[0].description}</div>}
              </div>
            )}
            {items.length > 1 && (
              <div className="flex items-center gap-4">
                <span className="w-16 h-px" style={{ backgroundColor: accent }} />
                <span className="text-xs" style={{ color: accent }}>&#9830;</span>
                <span className="w-16 h-px" style={{ backgroundColor: accent }} />
              </div>
            )}
            {items.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-10">
                {items.slice(1).map((item, i) => (
                  <div key={item.id} className="text-center px-6">
                    <div {...elementProps(config.id, `items.${i + 1}.value`, 'text')} className="text-2xl lg:text-3xl font-light tracking-wide" style={{ color: accent }}>{item.value}</div>
                    <div {...elementProps(config.id, `items.${i + 1}.label`, 'text')} className="text-xs tracking-[0.2em] uppercase text-zinc-500 mt-2 font-light">{item.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CREATIVE — Bold, offset shadow, huge numbers
  // ═══════════════════════════════════════════

  if (universe === 'creative') {
    const accent = accentColor ?? '#18181b'

    const header = (content.eyebrow || content.title) ? (
      <div className={cn('mb-14 space-y-4', getTextAlignClass(textAlign))}>
        {content.eyebrow && (
          <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-block text-xs font-black uppercase tracking-wider bg-zinc-900 text-white px-4 py-1.5 -rotate-1">
            {content.eyebrow}
          </span>
        )}
        {content.title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className={cn(getTitleSizeClass(titleSize), 'font-black text-zinc-900')}
            style={textColor ? { color: textColor } : undefined}>{content.title}</h2>
        )}
      </div>
    ) : null

    // simple
    if (layout === 'simple') {
      return (
        <section className="bg-[#f5f0e8] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            {header}
            <div className="flex flex-wrap items-start justify-center gap-y-10">
              {items.map((item, i) => (
                <div key={item.id} className="flex items-center">
                  <div className="text-center px-6 md:px-10">
                    <div className="text-6xl lg:text-7xl font-black leading-none" style={{ color: accent }}>{item.value}</div>
                    <div className="text-sm font-bold uppercase tracking-wider text-zinc-700 mt-3">{item.label}</div>
                  </div>
                  {i < items.length - 1 && (
                    <div className="hidden sm:block w-0.5 h-16 bg-zinc-900" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // cards
    if (layout === 'cards') {
      return (
        <section className="bg-[#f5f0e8] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {header}
            <div className={cn('grid gap-5', gridCols)}>
              {items.map((item, i) => (
                <div key={item.id}
                  className="relative bg-white border-2 border-zinc-900 p-7 text-center"
                  style={{ boxShadow: `${4 + (i % 2)}px ${4 + (i % 2)}px 0 #18181b` }}>
                  <div className="text-5xl lg:text-6xl font-black mb-2" style={{ color: accent }}>{item.value}</div>
                  <div className="font-bold text-sm uppercase tracking-wider text-zinc-900">{item.label}</div>
                  {item.description && <div className="text-xs text-zinc-500 mt-2 font-medium">{item.description}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // highlight
    return (
      <section className="bg-[#f5f0e8] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          {header}
          <div className="flex flex-col items-center gap-10">
            {items.length > 0 && (
              <div className="relative text-center bg-white border-2 border-zinc-900 p-10 inline-block"
                style={{ boxShadow: '6px 6px 0 #18181b' }}>
                <div className="text-7xl lg:text-8xl font-black leading-none" style={{ color: accent }}>{items[0].value}</div>
                <div className="text-base font-bold uppercase tracking-wider text-zinc-900 mt-4">{items[0].label}</div>
                {items[0].description && <div className="text-sm text-zinc-500 mt-2">{items[0].description}</div>}
              </div>
            )}
            {items.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-6">
                {items.slice(1).map((item) => (
                  <div key={item.id} className="text-center px-4 border-2 border-zinc-900 bg-white p-5"
                    style={{ boxShadow: '3px 3px 0 #18181b' }}>
                    <div className="text-3xl lg:text-4xl font-black" style={{ color: accent }}>{item.value}</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-700 mt-2">{item.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // ECOMMERCE — Trust, green, conversion
  // ═══════════════════════════════════════════

  if (universe === 'ecommerce') {
    const accent = accentColor ?? '#059669'

    const header = (content.eyebrow || content.title) ? (
      <div className={cn('mb-12 space-y-3', getTextAlignClass(textAlign))}>
        {content.eyebrow && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: `${accent}15`, color: accent }}>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
            {content.eyebrow}
          </span>
        )}
        {content.title && (
          <h2 className={cn(getTitleSizeClass(titleSize), 'font-bold text-zinc-900')}
            style={textColor ? { color: textColor } : undefined}>{content.title}</h2>
        )}
      </div>
    ) : null

    // simple
    if (layout === 'simple') {
      return (
        <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            {header}
            <div className="flex flex-wrap items-center justify-center gap-y-8">
              {items.map((item, i) => (
                <div key={item.id} className="flex items-center">
                  <div className="text-center px-8 md:px-12">
                    <div className="text-4xl lg:text-5xl font-bold" style={{ color: accent }}>{item.value}</div>
                    <div className="text-sm text-zinc-500 mt-1 font-medium">{item.label}</div>
                  </div>
                  {i < items.length - 1 && (
                    <div className="hidden sm:block w-px h-12 bg-zinc-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // cards
    if (layout === 'cards') {
      return (
        <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {header}
            <div className={cn('grid gap-5', gridCols)}>
              {items.map((item) => (
                <div key={item.id} className="rounded-xl p-7 border border-zinc-100 shadow-sm text-center bg-zinc-50">
                  <div className="w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${accent}15` }}>
                    <svg className="w-5 h-5" fill="none" stroke={accent} strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: accent }}>{item.value}</div>
                  <div className="font-semibold text-sm text-zinc-900">{item.label}</div>
                  {item.description && <div className="text-xs text-zinc-500 mt-1">{item.description}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // highlight
    return (
      <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          {header}
          <div className="flex flex-col items-center gap-10">
            {items.length > 0 && (
              <div className="text-center rounded-2xl p-10 border border-zinc-100 shadow-sm bg-zinc-50 w-full max-w-md">
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${accent}15` }}>
                  <svg className="w-6 h-6" fill="none" stroke={accent} strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-6xl lg:text-7xl font-bold" style={{ color: accent }}>{items[0].value}</div>
                <div className="text-lg text-zinc-700 mt-2 font-semibold">{items[0].label}</div>
                {items[0].description && <div className="text-sm text-zinc-500 mt-1">{items[0].description}</div>}
              </div>
            )}
            {items.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-8">
                {items.slice(1).map((item) => (
                  <div key={item.id} className="text-center px-6">
                    <div className="text-2xl lg:text-3xl font-bold" style={{ color: accent }}>{item.value}</div>
                    <div className="text-sm text-zinc-500 mt-1 font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRIXSA — Warm cream, real estate stats
  // ═══════════════════════════════════════════

  if (variant === 'brixsa-cards') {
    return (
      <section
        {...elementProps(config.id, 'section', 'container')}
        style={{
          backgroundColor: 'var(--color-muted, #f5f0e8)',
          padding: '80px 0',
          fontFamily: "'GeneralSans Variable', sans-serif",
        }}
      >
        <div
          {...elementProps(config.id, 'container', 'container')}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          <div
            {...elementProps(config.id, 'grid', 'container')}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '0',
              position: 'relative',
            }}
          >
            {items.map((item, i) => (
              <div
                key={item.id}
                {...elementProps(config.id, `items.${i}`, 'container')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '24px 16px',
                  position: 'relative',
                }}
              >
                {i > 0 && (
                  <div
                    {...elementProps(config.id, `items.${i}.divider`, 'container')}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '20%',
                      bottom: '20%',
                      width: '1px',
                      backgroundColor: '#d4c9b8',
                    }}
                  />
                )}
                <div
                  {...elementProps(config.id, `items.${i}.value`, 'text')}
                  style={{
                    fontSize: '48px',
                    fontWeight: 700,
                    color: 'var(--color-foreground, #140c08)',
                    lineHeight: 1.1,
                    marginBottom: '8px',
                  }}
                >
                  {item.value}
                </div>
                <div
                  {...elementProps(config.id, `items.${i}.label`, 'text')}
                  style={{
                    fontSize: '14px',
                    color: '#666666',
                    lineHeight: 1.4,
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <style>{`
            @media (max-width: 768px) {
              [data-element-id="${config.id}::grid"] {
                grid-template-columns: repeat(3, 1fr) !important;
              }
            }
          `}</style>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // GLASS — Glassmorphism, gradient text, glow
  // ═══════════════════════════════════════════

  {
    const accent = accentColor ?? '#a855f7'

    const header = (content.eyebrow || content.title) ? (
      <div className={cn('mb-14 space-y-4', getTextAlignClass(textAlign))}>
        {content.eyebrow && (
          <span className="inline-block text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70">
            {content.eyebrow}
          </span>
        )}
        {content.title && (
          <h2 className={cn(getTitleSizeClass(titleSize), 'font-bold text-white')}
            style={textColor ? { color: textColor } : undefined}>{content.title}</h2>
        )}
      </div>
    ) : null

    const gradientNumberStyle = {
      background: `linear-gradient(135deg, ${accent}, #ec4899, ${accent})`,
      WebkitBackgroundClip: 'text' as const,
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text' as const,
    }

    const glowStyle = (size: 'lg' | 'sm') => ({
      filter: size === 'lg' ? `drop-shadow(0 0 24px ${accent}50)` : `drop-shadow(0 0 12px ${accent}40)`,
    })

    // simple
    if (layout === 'simple') {
      return (
        <section className="relative bg-zinc-950 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="relative max-w-5xl mx-auto px-6">
            {header}
            <div className="flex flex-wrap items-center justify-center gap-y-8">
              {items.map((item, i) => (
                <div key={item.id} className="flex items-center">
                  <div className="text-center px-8 md:px-12" style={glowStyle('sm')}>
                    <div className="text-4xl lg:text-5xl font-bold" style={gradientNumberStyle}>{item.value}</div>
                    <div className="text-sm text-zinc-400 mt-1 font-medium">{item.label}</div>
                  </div>
                  {i < items.length - 1 && (
                    <div className="hidden sm:block w-px h-12 bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // cards
    if (layout === 'cards') {
      return (
        <section className="relative bg-zinc-950 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="relative max-w-6xl mx-auto px-6">
            {header}
            <div className={cn('grid gap-5', gridCols)}>
              {items.map((item) => (
                <div key={item.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-7 border border-white/10 text-center">
                  <div className="text-3xl lg:text-4xl font-bold mb-2" style={{ ...gradientNumberStyle, ...glowStyle('sm') }}>{item.value}</div>
                  <div className="font-semibold text-sm text-white/80">{item.label}</div>
                  {item.description && <div className="text-xs text-white/50 mt-1">{item.description}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // highlight (default for glass)
    return (
      <section className="relative bg-zinc-950 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-5xl mx-auto px-6">
          {header}
          <div className="flex flex-col items-center gap-10">
            {items.length > 0 && (
              <div className="text-center bg-white/5 backdrop-blur-md rounded-2xl p-10 border border-white/10 w-full max-w-md">
                <div className="text-6xl lg:text-7xl font-bold" style={{ ...gradientNumberStyle, ...glowStyle('lg') }}>{items[0].value}</div>
                <div className="text-lg text-white/80 mt-3 font-medium">{items[0].label}</div>
                {items[0].description && <div className="text-sm text-white/50 mt-1">{items[0].description}</div>}
              </div>
            )}
            {items.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-6">
                {items.slice(1).map((item) => (
                  <div key={item.id} className="text-center px-6 bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10">
                    <div className="text-2xl lg:text-3xl font-bold" style={{ ...gradientNumberStyle, ...glowStyle('sm') }}>{item.value}</div>
                    <div className="text-sm text-white/60 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export const statsMeta = {
  type: 'stats',
  label: 'Statistiques',
  icon: '📊',
  variants: [
    'startup-simple', 'startup-cards', 'startup-highlight',
    'corporate-simple', 'corporate-cards', 'corporate-highlight',
    'luxe-simple', 'luxe-cards', 'luxe-highlight',
    'creative-simple', 'creative-cards', 'creative-highlight',
    'ecommerce-simple', 'ecommerce-cards', 'ecommerce-highlight',
    'glass-simple', 'glass-cards', 'glass-highlight',
    'brixsa-cards',
  ],
  defaultVariant: 'startup-simple',
  defaultContent: {},
}
