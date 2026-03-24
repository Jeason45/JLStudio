import { cn } from '@/lib/utils'
import { sectionClasses, getTextColorClass, getMutedTextClass, getEyebrowClass, getTitleSizeClass, getTextAlignClass } from '../_utils'
import type { SectionConfig } from '@/types/site'
import type { BlogGridContent, BlogPost } from '@/types/sections'
import { ArrowRight } from 'lucide-react'
import { elementProps } from '@/lib/elementHelpers'

/* ── Post image placeholder ───────────────────────────── */

function PostImage({ post, className, placeholderClass }: { post: BlogPost; className?: string; placeholderClass?: string }) {
  if (post.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={post.image} alt={post.title} className={cn('w-full h-full object-cover', className)} />
    )
  }
  return (
    <div className={cn('w-full h-full flex items-center justify-center', placeholderClass ?? 'bg-zinc-100')}>
      <span className="text-3xl">📝</span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export function BlogGridSection({ config }: { config: SectionConfig }) {
  const content = (config.content ?? {}) as Partial<BlogGridContent>
  const { accentColor, textColor: customTextColor } = config.style
  // Template data may pass 'items' instead of 'posts' — support both
  const posts: BlogPost[] = content.posts ?? ((content as Record<string, unknown>).items as BlogPost[] | undefined) ?? []
  const variant = config.variant ?? 'startup-grid'
  const universe = variant.split('-')[0]

  const title = content.title
  const subtitle = content.subtitle
  const eyebrow = content.eyebrow
  const ctaLabel = content.ctaLabel
  const ctaHref = content.ctaHref ?? '#'

  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  // ═══════════════════════════════════════════
  // STARTUP — SaaS / Moderne
  // ═══════════════════════════════════════════

  if (universe === 'startup') {
    const accent = accentColor ?? '#6366f1'
    const layout = variant.replace('startup-', '')

    const header = (
      <div className="flex items-end justify-between mb-10">
        <div className="space-y-2">
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
          {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-500">{subtitle}</p>}
        </div>
        {ctaLabel && (
          <a href={ctaHref} className="flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-80 shrink-0" style={{ color: accent }}>
            {ctaLabel} <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    )

    // Grid — 3 columns
    if (layout === 'grid') {
      return (
        <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <a key={post.id} href={post.slug} className="group bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                  <div {...elementProps(config.id, `posts.${i}.image`, 'image')} className="h-44 overflow-hidden">
                    <PostImage post={post} className="group-hover:scale-105 transition-transform duration-300" placeholderClass="bg-zinc-100" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span {...elementProps(config.id, `posts.${i}.category`, 'badge')} className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">{post.category}</span>
                      <span className="text-xs text-zinc-400">{post.readTime}</span>
                    </div>
                    <h3 {...elementProps(config.id, `posts.${i}.title`, 'heading')} className="font-semibold text-sm text-zinc-900 leading-snug group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                    <p {...elementProps(config.id, `posts.${i}.excerpt`, 'text')} className="text-xs mt-2 text-zinc-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <p {...elementProps(config.id, `posts.${i}.date`, 'text')} className="text-xs mt-3 text-zinc-400">{post.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Featured — 1 large + smaller cards
    return (
      <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto px-6">
          {header}
          {featuredPost && (
            <a href={featuredPost.slug} className="group block mb-8 bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 hover:shadow-lg transition-shadow lg:flex">
              <div {...elementProps(config.id, 'posts.0.image', 'image')} className="lg:w-1/2 h-56 lg:h-auto overflow-hidden">
                <PostImage post={featuredPost} className="group-hover:scale-105 transition-transform duration-300" placeholderClass="bg-zinc-100" />
              </div>
              <div className="lg:w-1/2 p-7 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span {...elementProps(config.id, 'posts.0.category', 'badge')} className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">{featuredPost.category}</span>
                  <span className="text-xs text-zinc-400">{featuredPost.readTime}</span>
                </div>
                <h3 {...elementProps(config.id, 'posts.0.title', 'heading')} className="text-xl md:text-2xl font-bold text-zinc-900 leading-snug group-hover:text-indigo-600 transition-colors">{featuredPost.title}</h3>
                <p {...elementProps(config.id, 'posts.0.excerpt', 'text')} className="text-sm mt-3 text-zinc-500 leading-relaxed line-clamp-3">{featuredPost.excerpt}</p>
                <p {...elementProps(config.id, 'posts.0.date', 'text')} className="text-xs mt-4 text-zinc-400">{featuredPost.date}</p>
              </div>
            </a>
          )}
          {remainingPosts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {remainingPosts.map((post, i) => (
                <a key={post.id} href={post.slug} className="group bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 hover:shadow-md transition-shadow">
                  <div {...elementProps(config.id, `posts.${i + 1}.image`, 'image')} className="h-36 overflow-hidden">
                    <PostImage post={post} className="group-hover:scale-105 transition-transform duration-300" placeholderClass="bg-zinc-100" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span {...elementProps(config.id, `posts.${i + 1}.category`, 'badge')} className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">{post.category}</span>
                      <span className="text-xs text-zinc-400">{post.readTime}</span>
                    </div>
                    <h3 {...elementProps(config.id, `posts.${i + 1}.title`, 'heading')} className="font-semibold text-sm text-zinc-900 leading-snug group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                    <p {...elementProps(config.id, `posts.${i + 1}.excerpt`, 'text')} className="text-xs mt-2 text-zinc-500 line-clamp-2">{post.excerpt}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CORPORATE — Navy / Professional
  // ═══════════════════════════════════════════

  if (universe === 'corporate') {
    const accent = accentColor ?? '#3b82f6'
    const layout = variant.replace('corporate-', '')

    const header = (
      <div className="flex items-end justify-between mb-10">
        <div className="space-y-2">
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
          {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-slate-400">{subtitle}</p>}
        </div>
        {ctaLabel && (
          <a href={ctaHref} className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors shrink-0">
            {ctaLabel} <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-[#0f172a] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-7xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <a key={post.id} href={post.slug} className="group rounded-xl overflow-hidden border border-slate-700/50 bg-slate-800/50 hover:border-blue-500/30 transition-colors">
                  <div {...elementProps(config.id, `posts.${i}.image`, 'image')} className="h-40 overflow-hidden">
                    <PostImage post={post} className="group-hover:scale-105 transition-transform duration-300" placeholderClass="bg-slate-800" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span {...elementProps(config.id, `posts.${i}.category`, 'badge')} className="text-xs font-medium px-2 py-0.5 rounded border border-blue-500/20 bg-blue-500/10 text-blue-300">{post.category}</span>
                      <span className="text-xs text-slate-500">{post.readTime}</span>
                    </div>
                    <h3 {...elementProps(config.id, `posts.${i}.title`, 'heading')} className="font-semibold text-sm text-white leading-snug group-hover:text-blue-400 transition-colors">{post.title}</h3>
                    <p {...elementProps(config.id, `posts.${i}.excerpt`, 'text')} className="text-xs mt-2 text-slate-400 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <p {...elementProps(config.id, `posts.${i}.date`, 'text')} className="text-xs mt-3 text-slate-500">{post.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Featured
    return (
      <section className="bg-[#0f172a] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-7xl mx-auto px-6">
          {header}
          {featuredPost && (
            <a href={featuredPost.slug} className="group block mb-8 rounded-xl overflow-hidden border border-slate-700/50 bg-slate-800/50 hover:border-blue-500/30 transition-colors lg:flex">
              <div {...elementProps(config.id, 'posts.0.image', 'image')} className="lg:w-1/2 h-56 lg:h-auto overflow-hidden">
                <PostImage post={featuredPost} className="group-hover:scale-105 transition-transform duration-300" placeholderClass="bg-slate-800" />
              </div>
              <div className="lg:w-1/2 p-7 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span {...elementProps(config.id, 'posts.0.category', 'badge')} className="text-xs font-medium px-2 py-0.5 rounded border border-blue-500/20 bg-blue-500/10 text-blue-300">{featuredPost.category}</span>
                  <span className="text-xs text-slate-500">{featuredPost.readTime}</span>
                </div>
                <h3 {...elementProps(config.id, 'posts.0.title', 'heading')} className="text-xl md:text-2xl font-bold text-white leading-snug group-hover:text-blue-400 transition-colors">{featuredPost.title}</h3>
                <p {...elementProps(config.id, 'posts.0.excerpt', 'text')} className="text-sm mt-3 text-slate-400 leading-relaxed line-clamp-3">{featuredPost.excerpt}</p>
                <p {...elementProps(config.id, 'posts.0.date', 'text')} className="text-xs mt-4 text-slate-500">{featuredPost.date}</p>
              </div>
            </a>
          )}
          {remainingPosts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {remainingPosts.map((post, i) => (
                <a key={post.id} href={post.slug} className="group rounded-xl overflow-hidden border border-slate-700/50 bg-slate-800/30 hover:border-blue-500/30 transition-colors">
                  <div {...elementProps(config.id, `posts.${i + 1}.image`, 'image')} className="h-36 overflow-hidden">
                    <PostImage post={post} className="group-hover:scale-105 transition-transform duration-300" placeholderClass="bg-slate-800" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span {...elementProps(config.id, `posts.${i + 1}.category`, 'badge')} className="text-xs font-medium px-2 py-0.5 rounded border border-blue-500/20 bg-blue-500/10 text-blue-300">{post.category}</span>
                    </div>
                    <h3 {...elementProps(config.id, `posts.${i + 1}.title`, 'heading')} className="font-semibold text-sm text-white leading-snug group-hover:text-blue-400 transition-colors">{post.title}</h3>
                    <p {...elementProps(config.id, `posts.${i + 1}.excerpt`, 'text')} className="text-xs mt-2 text-slate-400 line-clamp-2">{post.excerpt}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // LUXE — Gold / Elegant
  // ═══════════════════════════════════════════

  if (universe === 'luxe') {
    const gold = accentColor ?? '#b8860b'
    const layout = variant.replace('luxe-', '')

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
        {ctaLabel && (
          <a href={ctaHref} className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-light transition-colors hover:opacity-70" style={{ color: gold }}>
            {ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <a key={post.id} href={post.slug} className="group">
                  <div {...elementProps(config.id, `posts.${i}.image`, 'image')} className="h-52 overflow-hidden mb-5">
                    <PostImage post={post} className="group-hover:scale-105 transition-transform duration-500" placeholderClass="bg-zinc-50" />
                  </div>
                  <span {...elementProps(config.id, `posts.${i}.category`, 'badge')} className="text-[10px] tracking-[0.2em] uppercase font-light" style={{ color: gold }}>{post.category}</span>
                  <h3 {...elementProps(config.id, `posts.${i}.title`, 'heading')} className="font-medium text-zinc-900 text-sm mt-2 leading-snug tracking-wide group-hover:opacity-70 transition-opacity">{post.title}</h3>
                  <p {...elementProps(config.id, `posts.${i}.excerpt`, 'text')} className="text-xs text-zinc-400 font-light leading-relaxed mt-2 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span {...elementProps(config.id, `posts.${i}.date`, 'text')} className="text-[10px] text-zinc-300 tracking-wide">{post.date}</span>
                    <span className="w-4 h-px" style={{ background: gold }} />
                    <span className="text-[10px] text-zinc-300 tracking-wide">{post.readTime}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Featured
    return (
      <section className="bg-zinc-50 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          {header}
          {featuredPost && (
            <a href={featuredPost.slug} className="group block mb-12 lg:flex gap-10 items-center">
              <div {...elementProps(config.id, 'posts.0.image', 'image')} className="lg:w-1/2 h-64 lg:h-80 overflow-hidden">
                <PostImage post={featuredPost} className="group-hover:scale-105 transition-transform duration-500" placeholderClass="bg-white" />
              </div>
              <div className="lg:w-1/2 mt-6 lg:mt-0">
                <span {...elementProps(config.id, 'posts.0.category', 'badge')} className="text-[10px] tracking-[0.2em] uppercase font-light" style={{ color: gold }}>{featuredPost.category}</span>
                <h3 {...elementProps(config.id, 'posts.0.title', 'heading')} className="text-xl md:text-2xl font-light text-zinc-900 mt-3 leading-snug tracking-tight group-hover:opacity-70 transition-opacity">{featuredPost.title}</h3>
                <div className="w-10 h-px my-4" style={{ background: gold }} />
                <p {...elementProps(config.id, 'posts.0.excerpt', 'text')} className="text-sm text-zinc-400 font-light leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-3 mt-4">
                  <span {...elementProps(config.id, 'posts.0.date', 'text')} className="text-[10px] text-zinc-300 tracking-wide">{featuredPost.date}</span>
                  <span className="w-4 h-px" style={{ background: gold }} />
                  <span className="text-[10px] text-zinc-300 tracking-wide">{featuredPost.readTime}</span>
                </div>
              </div>
            </a>
          )}
          {remainingPosts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 border-t border-zinc-200">
              {remainingPosts.map((post, i) => (
                <a key={post.id} href={post.slug} className="group">
                  <span {...elementProps(config.id, `posts.${i + 1}.category`, 'badge')} className="text-[10px] tracking-[0.2em] uppercase font-light" style={{ color: gold }}>{post.category}</span>
                  <h3 {...elementProps(config.id, `posts.${i + 1}.title`, 'heading')} className="font-medium text-zinc-900 text-sm mt-2 leading-snug tracking-wide group-hover:opacity-70 transition-opacity">{post.title}</h3>
                  <p {...elementProps(config.id, `posts.${i + 1}.excerpt`, 'text')} className="text-xs text-zinc-400 font-light mt-2 line-clamp-2">{post.excerpt}</p>
                  <span {...elementProps(config.id, `posts.${i + 1}.date`, 'text')} className="text-[10px] text-zinc-300 tracking-wide mt-3 block">{post.date}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CREATIVE — Neobrutalist / Crème
  // ═══════════════════════════════════════════

  if (universe === 'creative') {
    const layout = variant.replace('creative-', '')

    const header = (
      <div className="flex items-end justify-between mb-10">
        <div className="space-y-3">
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
        {ctaLabel && (
          <a href={ctaHref} className="flex items-center gap-1 text-sm font-black uppercase tracking-wider text-zinc-900 hover:text-zinc-600 transition-colors shrink-0">
            {ctaLabel} <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-[#fdf6e3] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-7xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <a key={post.id} href={post.slug} className="group bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b] hover:shadow-[6px_6px_0_0_#18181b] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all overflow-hidden">
                  <div {...elementProps(config.id, `posts.${i}.image`, 'image')} className="h-44 overflow-hidden border-b-2 border-zinc-900">
                    <PostImage post={post} className="group-hover:scale-105 transition-transform duration-300" placeholderClass="bg-[#f5f0e8]" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span {...elementProps(config.id, `posts.${i}.category`, 'badge')} className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 border border-zinc-900 text-zinc-900">{post.category}</span>
                      <span className="text-xs font-bold text-zinc-400">{post.readTime}</span>
                    </div>
                    <h3 {...elementProps(config.id, `posts.${i}.title`, 'heading')} className="font-black text-zinc-900 text-sm uppercase tracking-wide leading-snug">{post.title}</h3>
                    <p {...elementProps(config.id, `posts.${i}.excerpt`, 'text')} className="text-xs mt-2 text-zinc-600 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <p {...elementProps(config.id, `posts.${i}.date`, 'text')} className="text-xs mt-3 font-bold text-zinc-400 uppercase tracking-wider">{post.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Featured
    return (
      <section className="bg-[#fdf6e3] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-7xl mx-auto px-6">
          {header}
          {featuredPost && (
            <a href={featuredPost.slug} className="group block mb-8 bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b] overflow-hidden lg:flex">
              <div {...elementProps(config.id, 'posts.0.image', 'image')} className="lg:w-1/2 h-56 lg:h-auto overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2 border-zinc-900">
                <PostImage post={featuredPost} className="group-hover:scale-105 transition-transform duration-300" placeholderClass="bg-[#f5f0e8]" />
              </div>
              <div className="lg:w-1/2 p-7 lg:p-10 flex flex-col justify-center">
                <span {...elementProps(config.id, 'posts.0.category', 'badge')} className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 border border-zinc-900 text-zinc-900 self-start">{featuredPost.category}</span>
                <h3 {...elementProps(config.id, 'posts.0.title', 'heading')} className="text-xl md:text-2xl font-black text-zinc-900 uppercase tracking-wide leading-tight mt-4">{featuredPost.title}</h3>
                <p {...elementProps(config.id, 'posts.0.excerpt', 'text')} className="text-sm mt-3 text-zinc-600 leading-relaxed line-clamp-3">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-3 mt-4">
                  <span {...elementProps(config.id, 'posts.0.date', 'text')} className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{featuredPost.date}</span>
                  <span className="text-xs font-bold text-zinc-400">|</span>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{featuredPost.readTime}</span>
                </div>
              </div>
            </a>
          )}
          {remainingPosts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {remainingPosts.map((post, i) => (
                <a key={post.id} href={post.slug} className="group bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b] hover:shadow-[6px_6px_0_0_#18181b] transition-all p-5">
                  <span {...elementProps(config.id, `posts.${i + 1}.category`, 'badge')} className="text-[10px] font-black uppercase tracking-wider text-zinc-400">{post.category}</span>
                  <h3 {...elementProps(config.id, `posts.${i + 1}.title`, 'heading')} className="font-black text-zinc-900 text-sm uppercase tracking-wide leading-snug mt-2">{post.title}</h3>
                  <p {...elementProps(config.id, `posts.${i + 1}.excerpt`, 'text')} className="text-xs mt-2 text-zinc-600 line-clamp-2">{post.excerpt}</p>
                  <p {...elementProps(config.id, `posts.${i + 1}.date`, 'text')} className="text-xs mt-3 font-bold text-zinc-400 uppercase tracking-wider">{post.date}</p>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // ECOMMERCE — Green / Trust
  // ═══════════════════════════════════════════

  if (universe === 'ecommerce') {
    const accent = accentColor ?? '#059669'
    const layout = variant.replace('ecommerce-', '')

    const header = (
      <div className="flex items-end justify-between mb-10">
        <div className="space-y-2">
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
          {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-500">{subtitle}</p>}
        </div>
        {ctaLabel && (
          <a href={ctaHref} className="flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-80 shrink-0" style={{ color: accent }}>
            {ctaLabel} <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <a key={post.id} href={post.slug} className="group rounded-2xl overflow-hidden border border-zinc-100 bg-zinc-50 hover:border-emerald-200 transition-colors">
                  <div {...elementProps(config.id, `posts.${i}.image`, 'image')} className="h-44 overflow-hidden">
                    <PostImage post={post} className="group-hover:scale-105 transition-transform duration-300" placeholderClass="bg-emerald-50" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span {...elementProps(config.id, `posts.${i}.category`, 'badge')} className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: accent }}>{post.category}</span>
                      <span className="text-xs text-zinc-400">{post.readTime}</span>
                    </div>
                    <h3 {...elementProps(config.id, `posts.${i}.title`, 'heading')} className="font-semibold text-sm text-zinc-900 leading-snug group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                    <p {...elementProps(config.id, `posts.${i}.excerpt`, 'text')} className="text-xs mt-2 text-zinc-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-1.5 mt-3">
                      <svg className="w-3.5 h-3.5" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: accent }}>Expert-verified</span>
                      <span {...elementProps(config.id, `posts.${i}.date`, 'text')} className="text-xs text-zinc-400 ml-auto">{post.date}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Featured
    return (
      <section className="bg-zinc-50 py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto px-6">
          {header}
          {featuredPost && (
            <a href={featuredPost.slug} className="group block mb-8 bg-white rounded-2xl overflow-hidden border border-zinc-100 hover:border-emerald-200 transition-colors lg:flex">
              <div {...elementProps(config.id, 'posts.0.image', 'image')} className="lg:w-1/2 h-56 lg:h-auto overflow-hidden">
                <PostImage post={featuredPost} className="group-hover:scale-105 transition-transform duration-300" placeholderClass="bg-emerald-50" />
              </div>
              <div className="lg:w-1/2 p-7 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span {...elementProps(config.id, 'posts.0.category', 'badge')} className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: accent }}>{featuredPost.category}</span>
                  <span className="text-xs text-zinc-400">{featuredPost.readTime}</span>
                  <svg className="w-3.5 h-3.5 ml-auto" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: accent }}>Featured</span>
                </div>
                <h3 {...elementProps(config.id, 'posts.0.title', 'heading')} className="text-xl md:text-2xl font-bold text-zinc-900 leading-snug group-hover:text-emerald-600 transition-colors">{featuredPost.title}</h3>
                <p {...elementProps(config.id, 'posts.0.excerpt', 'text')} className="text-sm mt-3 text-zinc-500 leading-relaxed line-clamp-3">{featuredPost.excerpt}</p>
                <p {...elementProps(config.id, 'posts.0.date', 'text')} className="text-xs mt-4 text-zinc-400">{featuredPost.date}</p>
              </div>
            </a>
          )}
          {remainingPosts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {remainingPosts.map((post, i) => (
                <a key={post.id} href={post.slug} className="group bg-white rounded-2xl p-5 border border-zinc-100 hover:border-emerald-200 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span {...elementProps(config.id, `posts.${i + 1}.category`, 'badge')} className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: accent }}>{post.category}</span>
                    <span className="text-xs text-zinc-400">{post.readTime}</span>
                  </div>
                  <h3 {...elementProps(config.id, `posts.${i + 1}.title`, 'heading')} className="font-semibold text-sm text-zinc-900 leading-snug group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                  <p {...elementProps(config.id, `posts.${i + 1}.excerpt`, 'text')} className="text-xs mt-2 text-zinc-500 line-clamp-2">{post.excerpt}</p>
                  <p {...elementProps(config.id, `posts.${i + 1}.date`, 'text')} className="text-xs mt-3 text-zinc-400">{post.date}</p>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // GLASS — Dark / Glassmorphism
  // ═══════════════════════════════════════════

  if (universe === 'glass') {
    const accent = accentColor ?? '#818cf8'
    const layout = variant.replace('glass-', '')

    const header = (
      <div className="flex items-end justify-between mb-10">
        <div className="space-y-3">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/[0.04] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}80` }} />
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent leading-tight" style={customTextColor ? { color: customTextColor, background: 'none', WebkitTextFillColor: 'unset' } : undefined}>
              {title}
            </h2>
          )}
          {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-white/40">{subtitle}</p>}
        </div>
        {ctaLabel && (
          <a href={ctaHref} className="flex items-center gap-1 text-sm font-medium transition-colors shrink-0" style={{ color: accent }}>
            {ctaLabel} <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-[#0a0a0f] py-20 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 dot-grid" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${accent}20, transparent 70%)` }}
          />
          <div className="relative max-w-6xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post, i) => (
                <a key={post.id} href={post.slug} className="group bg-white/[0.04] backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-white/[0.15] transition-colors">
                  <div {...elementProps(config.id, `posts.${i}.image`, 'image')} className="h-40 overflow-hidden">
                    <PostImage post={post} className="group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100" placeholderClass="bg-white/[0.03]" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span {...elementProps(config.id, `posts.${i}.category`, 'badge')} className="text-xs font-medium px-2 py-0.5 rounded-full border border-white/10 text-white/60 bg-white/[0.06]">{post.category}</span>
                      <span className="text-xs text-white/30">{post.readTime}</span>
                    </div>
                    <h3 {...elementProps(config.id, `posts.${i}.title`, 'heading')} className="font-semibold text-sm text-white leading-snug group-hover:opacity-80 transition-opacity">{post.title}</h3>
                    <p {...elementProps(config.id, `posts.${i}.excerpt`, 'text')} className="text-xs mt-2 text-white/40 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <p {...elementProps(config.id, `posts.${i}.date`, 'text')} className="text-xs mt-3 text-white/20">{post.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Featured
    return (
      <section className="bg-[#0a0a0f] py-20 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="absolute inset-0 dot-grid" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent}20, transparent 70%)` }}
        />
        <div className="relative max-w-6xl mx-auto px-6">
          {header}
          {featuredPost && (
            <a href={featuredPost.slug} className="group block mb-8 bg-white/[0.04] backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-white/[0.15] transition-colors lg:flex">
              <div {...elementProps(config.id, 'posts.0.image', 'image')} className="lg:w-1/2 h-56 lg:h-auto overflow-hidden relative">
                <PostImage post={featuredPost} className="group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100" placeholderClass="bg-white/[0.03]" />
                {/* Glow accent line */}
                <div className="absolute bottom-0 left-[10%] right-[10%] h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }} />
              </div>
              <div className="lg:w-1/2 p-7 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span {...elementProps(config.id, 'posts.0.category', 'badge')} className="text-xs font-medium px-2 py-0.5 rounded-full border border-white/10 text-white/60 bg-white/[0.06]">{featuredPost.category}</span>
                  <span className="text-xs text-white/30">{featuredPost.readTime}</span>
                </div>
                <h3 {...elementProps(config.id, 'posts.0.title', 'heading')} className="text-xl md:text-2xl font-bold text-white leading-snug group-hover:opacity-80 transition-opacity">{featuredPost.title}</h3>
                <p {...elementProps(config.id, 'posts.0.excerpt', 'text')} className="text-sm mt-3 text-white/40 leading-relaxed line-clamp-3">{featuredPost.excerpt}</p>
                <p {...elementProps(config.id, 'posts.0.date', 'text')} className="text-xs mt-4 text-white/20">{featuredPost.date}</p>
              </div>
            </a>
          )}
          {remainingPosts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {remainingPosts.map((post, i) => (
                <a key={post.id} href={post.slug} className="group bg-white/[0.03] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06] hover:bg-white/[0.06] transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span {...elementProps(config.id, `posts.${i + 1}.category`, 'badge')} className="text-xs font-medium px-2 py-0.5 rounded-full border border-white/10 text-white/60 bg-white/[0.04]">{post.category}</span>
                    <span className="text-xs text-white/30">{post.readTime}</span>
                  </div>
                  <h3 {...elementProps(config.id, `posts.${i + 1}.title`, 'heading')} className="font-semibold text-sm text-white leading-snug group-hover:opacity-80 transition-opacity">{post.title}</h3>
                  <p {...elementProps(config.id, `posts.${i + 1}.excerpt`, 'text')} className="text-xs mt-2 text-white/40 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 4px ${accent}60` }} />
                    <span {...elementProps(config.id, `posts.${i + 1}.date`, 'text')} className="text-xs text-white/20">{post.date}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRIXSA — Warm Cream / Journal
  // ═══════════════════════════════════════════

  if (variant === 'brixsa-grid') {
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

    const brixsaPosts: BlogPost[] = posts.length > 0 ? posts.slice(0, 2) : [
      { id: 'brixsa-1', title: 'The Importance Of Home Inspections', category: 'Investments', slug: '/blog/understanding-home-inspections', image: '', excerpt: '', date: '', readTime: '' },
      { id: 'brixsa-2', title: 'Understanding Real Estate Terminology', category: 'Renovations', slug: '/blog/understanding-home-inspections', image: '', excerpt: '', date: '', readTime: '' },
    ]

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Blog Section')}
        style={{
          backgroundColor: 'var(--color-muted, #f6efe5)',
          paddingTop: 'clamp(60px, 12vw, 180px)',
          paddingBottom: 'clamp(60px, 12vw, 180px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
        }}
      >
        <style>{`
          .brixsa-blog-img-dezoom { transform: scale(1.15); transition: transform 1.2s ease-out; }
          .brixsa-blog-img-dezoom.revealed { transform: scale(1); }
          @media (max-width: 768px) {
            .brixsa-resp-blog-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        <div {...elementProps(config.id, 'container', 'container', 'Container')} style={{ maxWidth: '1320px', marginLeft: 'auto', marginRight: 'auto' }}>
          {/* Header */}
          <div
            {...elementProps(config.id, 'header', 'container', 'Header')}
            className={cn('flex flex-wrap items-end')}
            style={{ justifyContent: 'space-between', marginBottom: '60px', gap: '20px' }}
          >
            <div>
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: '"General Sans Variable", "General Sans", var(--font-heading, sans-serif)',
                  fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                  fontWeight: 500,
                  lineHeight: '110%',
                  textTransform: 'capitalize',
                  color: customTextColor ?? 'var(--color-foreground, #140c08)',
                }}
              >
                {title ?? 'Our Journal'}
              </h2>
            </div>

            <style>{`
              .brixsa-btn-blog .brixsa-btn-fill-blog { transform: translateX(102%); transition: transform 0.4s ease; }
              .brixsa-btn-blog:hover .brixsa-btn-fill-blog { transform: translateX(0); }
              .brixsa-btn-blog:hover .brixsa-btn-label-blog { color: #fff; }
              .brixsa-btn-label-blog { transition: color 0.4s; }
            `}</style>
            <a
              {...elementProps(config.id, 'ctaLabel', 'button')}
              href={ctaHref === '#' ? '/blog' : ctaHref}
              className="brixsa-btn-blog flex items-center relative overflow-hidden"
              style={{
                fontSize: 'clamp(16px, 2vw, 20px)',
                fontWeight: 500,
                gap: '10px',
                padding: '10px 12px 10px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              <span {...elementProps(config.id, 'viewAllLabel', 'text', 'Link Text')} className="brixsa-btn-label-blog relative" style={{ zIndex: 10, color: 'var(--color-foreground, #140c08)' }}>
                {ctaLabel ?? 'View all Blogs'}
              </span>
              <span
                {...elementProps(config.id, 'viewAllIcon', 'icon', 'Arrow Icon')}
                className="flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--color-primary, #4a2711)',
                  color: '#ffffff',
                  borderRadius: '4px',
                  width: '28px',
                  height: '28px',
                  position: 'relative',
                  zIndex: 10,
                  flexShrink: 0,
                }}
              >
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </span>
              <span className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden', borderRadius: '6px' }} aria-hidden="true">
                <span className="brixsa-btn-fill-blog" style={{ display: 'block', backgroundColor: 'var(--color-primary, #4a2711)', width: '100%', height: '100%' }} />
              </span>
            </a>
          </div>

          {/* Grid — 2 columns */}
          <div
            {...elementProps(config.id, 'grid', 'container', 'Blog Grid')}
            className="grid brixsa-resp-blog-grid"
            style={{
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
          >
            {brixsaPosts.map((post, i) => (
              <a key={post.id} href={post.slug ?? '#'} className={cn('group block w-full')} style={{ textDecoration: 'none' }}>
                {/* Image */}
                <div
                  {...elementProps(config.id, `posts.${i}.image`, 'image')}
                  className="overflow-hidden"
                  style={{ aspectRatio: '648 / 446', borderRadius: '8px' }}
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        const img = el.querySelector('.brixsa-blog-img-dezoom')
                        if (img) img.classList.add('revealed')
                        obs.disconnect()
                      }
                    }, { threshold: 0.15 })
                    obs.observe(el)
                  }}
                >
                  <PostImage
                    post={post}
                    className={cn('brixsa-blog-img-dezoom group-hover:scale-105 transition-transform duration-500')}
                    placeholderClass="bg-gradient-to-br from-gray-200 to-gray-400"
                  />
                </div>
                {/* Body */}
                <div style={{ marginTop: '16px' }}>
                  {post.category && (
                    <p
                      {...elementProps(config.id, `posts.${i}.category`, 'badge')}
                      style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'var(--color-foreground, #140c08)',
                        marginBottom: '8px',
                      }}
                    >
                      {post.category}
                    </p>
                  )}
                  <h3
                    {...elementProps(config.id, `posts.${i}.title`, 'heading')}
                    style={{
                      fontSize: '24px',
                      fontWeight: 500,
                      lineHeight: '150%',
                      fontFamily: '"Inter Variable", "Inter", var(--font-body, sans-serif)',
                      color: 'var(--color-foreground, #140c08)',
                    }}
                  >
                    {post.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRIXSA-DETAIL — Individual Blog Article Page
  // ═══════════════════════════════════════════

  if (variant === 'brixsa-detail') {
    const article = posts[0] ?? { id: 'brixsa-article', title: 'Understanding Home Inspections in 2023', category: 'Investments', slug: '#', image: '', excerpt: 'A comprehensive guide to the home inspection process, what to expect, and how to prepare for a smooth and informed buying experience.', date: 'September 29, 2025', readTime: '8 min read', author: 'Emily Williams' }
    const relatedPosts = posts.slice(1, 4)
    const articleAuthor = (article as unknown as Record<string, unknown>).author as string | undefined ?? 'Emily Williams'
    const articleBody = article.excerpt || 'A comprehensive guide to the home inspection process, what to expect, and how to prepare for a smooth and informed buying experience.'

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Blog Detail Section')}
        style={{
          backgroundColor: 'var(--color-muted, #f5f0e8)',
          paddingTop: 'clamp(60px, 10vw, 120px)',
          paddingBottom: 'clamp(60px, 10vw, 120px)',
          paddingLeft: '24px',
          paddingRight: '24px',
          fontFamily: '"Inter Variable", "Inter", var(--font-body, sans-serif)',
        }}
      >
        <div
          {...elementProps(config.id, 'container', 'container', 'Container')}
          style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {/* ── Article Header ─────────────────────── */}
          <div {...elementProps(config.id, 'articleHeader', 'container', 'Article Header')} style={{ marginBottom: '48px' }}>
            {/* Category badge */}
            {article.category && (
              <span
                {...elementProps(config.id, 'posts.0.category', 'badge')}
                style={{
                  display: 'inline-block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#ffffff',
                  backgroundColor: 'var(--color-primary, #4a2711)',
                  borderRadius: '4px',
                  padding: '6px 16px',
                  marginBottom: '24px',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                }}
              >
                {article.category}
              </span>
            )}

            {/* Title */}
            <h1
              {...elementProps(config.id, 'posts.0.title', 'heading')}
              style={{
                fontFamily: '"General Sans Variable", "General Sans", var(--font-heading, sans-serif)',
                fontSize: '40px',
                fontWeight: 700,
                lineHeight: '120%',
                color: customTextColor ?? 'var(--color-foreground, #140c08)',
                marginBottom: '32px',
              }}
            >
              {article.title}
            </h1>

            {/* Author + Date row */}
            <div
              {...elementProps(config.id, 'authorRow', 'container', 'Author Row')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '40px',
              }}
            >
              {/* Author avatar placeholder */}
              <div
                {...elementProps(config.id, 'authorAvatar', 'image', 'Author Avatar')}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent, #c8a97e)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: '#ffffff',
                  fontSize: '18px',
                  fontWeight: 600,
                }}
              >
                {articleAuthor.charAt(0)}
              </div>
              <div>
                <p
                  {...elementProps(config.id, 'authorName', 'text', 'Author Name')}
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--color-foreground, #140c08)',
                    margin: 0,
                    lineHeight: '1.4',
                  }}
                >
                  {articleAuthor}
                </p>
                <p
                  {...elementProps(config.id, 'authorRole', 'text', 'Author Role & Date')}
                  style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#888',
                    margin: 0,
                    lineHeight: '1.4',
                  }}
                >
                  Realty Agent &middot; {article.date || 'September 29, 2025'}
                </p>
              </div>
            </div>

            {/* Featured Image */}
            {article.image && (
              <div
                {...elementProps(config.id, 'posts.0.image', 'image')}
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  aspectRatio: '16 / 9',
                  marginBottom: '48px',
                }}
              >
                <PostImage post={article} placeholderClass="bg-gradient-to-br from-gray-200 to-gray-400" />
              </div>
            )}
            {!article.image && (
              <div
                {...elementProps(config.id, 'posts.0.image', 'image')}
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  aspectRatio: '16 / 9',
                  marginBottom: '48px',
                  background: 'linear-gradient(135deg, #d4c4a8 0%, #b8a080 100%)',
                }}
              />
            )}
          </div>

          {/* ── Article Body ─────────────────────── */}
          <div
            {...elementProps(config.id, 'articleBody', 'container', 'Article Body')}
            style={{ marginBottom: '64px' }}
          >
            {/* Intro paragraph */}
            <p
              {...elementProps(config.id, 'posts.0.excerpt', 'text')}
              style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: '#444444',
                marginBottom: '32px',
              }}
            >
              {articleBody}
            </p>

            {/* Section heading */}
            <h2
              {...elementProps(config.id, 'bodyHeading1', 'heading', 'Body Heading 1')}
              style={{
                fontFamily: '"General Sans Variable", "General Sans", var(--font-heading, sans-serif)',
                fontSize: '28px',
                fontWeight: 600,
                lineHeight: '130%',
                color: 'var(--color-foreground, #140c08)',
                marginBottom: '16px',
                marginTop: '48px',
              }}
            >
              Why Home Inspections Matter
            </h2>

            <p
              {...elementProps(config.id, 'bodyParagraph1', 'text', 'Body Paragraph 1')}
              style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: '#444444',
                marginBottom: '24px',
              }}
            >
              A home inspection is one of the most critical steps in the home buying process. It provides buyers with a detailed understanding of the property&apos;s condition, helping them make informed decisions and potentially saving thousands in unexpected repairs.
            </p>

            {/* Block quote */}
            <blockquote
              {...elementProps(config.id, 'blockquote', 'container', 'Block Quote')}
              style={{
                borderLeft: '4px solid #c8a97e',
                paddingLeft: '24px',
                paddingTop: '8px',
                paddingBottom: '8px',
                marginLeft: 0,
                marginRight: 0,
                marginTop: '32px',
                marginBottom: '32px',
              }}
            >
              <p
                {...elementProps(config.id, 'quoteText', 'text', 'Quote Text')}
                style={{
                  fontSize: '18px',
                  fontStyle: 'italic',
                  lineHeight: '1.7',
                  color: '#333333',
                  margin: 0,
                }}
              >
                &ldquo;A thorough home inspection can reveal issues that aren&apos;t visible during a casual walkthrough, giving buyers the leverage to negotiate repairs or adjust the purchase price.&rdquo;
              </p>
            </blockquote>

            {/* Another heading */}
            <h3
              {...elementProps(config.id, 'bodyHeading2', 'heading', 'Body Heading 2')}
              style={{
                fontFamily: '"General Sans Variable", "General Sans", var(--font-heading, sans-serif)',
                fontSize: '22px',
                fontWeight: 600,
                lineHeight: '130%',
                color: 'var(--color-foreground, #140c08)',
                marginBottom: '16px',
                marginTop: '40px',
              }}
            >
              What to Expect During the Process
            </h3>

            <p
              {...elementProps(config.id, 'bodyParagraph2', 'text', 'Body Paragraph 2')}
              style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: '#444444',
                marginBottom: '24px',
              }}
            >
              The inspection typically takes two to four hours and covers the home&apos;s major systems, including the roof, foundation, plumbing, electrical, HVAC, and more. A qualified inspector will provide a detailed report documenting their findings, complete with photographs and recommendations.
            </p>

            <p
              {...elementProps(config.id, 'bodyParagraph3', 'text', 'Body Paragraph 3')}
              style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: '#444444',
                marginBottom: '24px',
              }}
            >
              Buyers are encouraged to attend the inspection whenever possible. This provides an opportunity to ask questions, learn about the property&apos;s maintenance needs, and gain a first-hand understanding of any issues that may arise.
            </p>
          </div>

          {/* ── Social Sharing ─────────────────────── */}
          <div
            {...elementProps(config.id, 'socialSharing', 'container', 'Social Sharing')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              paddingTop: '24px',
              paddingBottom: '24px',
              borderTop: '1px solid #d4c4a8',
              borderBottom: '1px solid #d4c4a8',
              marginBottom: '64px',
            }}
          >
            <span
              {...elementProps(config.id, 'shareLabel', 'text', 'Share Label')}
              style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-foreground, #140c08)' }}
            >
              Share this article
            </span>
            <div style={{ display: 'flex', gap: '12px', marginLeft: 'auto' }}>
              {/* Instagram */}
              <a
                {...elementProps(config.id, 'socialInstagram', 'link', 'Instagram')}
                href="#"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-foreground, #140c08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              {/* Facebook */}
              <a
                {...elementProps(config.id, 'socialFacebook', 'link', 'Facebook')}
                href="#"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-foreground, #140c08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* X (Twitter) */}
              <a
                {...elementProps(config.id, 'socialX', 'link', 'X')}
                href="#"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-foreground, #140c08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* LinkedIn */}
              <a
                {...elementProps(config.id, 'socialLinkedin', 'link', 'LinkedIn')}
                href="#"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-foreground, #140c08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* ── Previous / Next Navigation ─────────────────────── */}
          <div
            {...elementProps(config.id, 'articleNav', 'container', 'Article Navigation')}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '80px',
              gap: '24px',
            }}
          >
            <a
              {...elementProps(config.id, 'prevArticle', 'link', 'Previous Article')}
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--color-foreground, #140c08)',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              <span>Previous Article</span>
            </a>
            <a
              {...elementProps(config.id, 'nextArticle', 'link', 'Next Article')}
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--color-foreground, #140c08)',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              <span>Next Article</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
          </div>

          {/* ── Related Posts ─────────────────────── */}
          {relatedPosts.length > 0 && (
            <div {...elementProps(config.id, 'relatedSection', 'container', 'Related Posts Section')}>
              <h2
                {...elementProps(config.id, 'relatedTitle', 'heading', 'Related Posts Title')}
                style={{
                  fontFamily: '"General Sans Variable", "General Sans", var(--font-heading, sans-serif)',
                  fontSize: '32px',
                  fontWeight: 600,
                  color: 'var(--color-foreground, #140c08)',
                  marginBottom: '40px',
                }}
              >
                Related Posts
              </h2>
              <div
                {...elementProps(config.id, 'relatedGrid', 'container', 'Related Grid')}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '24px',
                }}
              >
                {relatedPosts.map((post, i) => (
                  <a
                    key={post.id}
                    {...elementProps(config.id, `related.${i}`, 'link', `Related Post ${i + 1}`)}
                    href={post.slug ?? '#'}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    {/* Card image */}
                    <div
                      {...elementProps(config.id, `related.${i}.image`, 'image')}
                      style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        marginBottom: '16px',
                      }}
                    >
                      <PostImage post={post} placeholderClass="bg-gradient-to-br from-gray-200 to-gray-400" />
                    </div>
                    {/* Category */}
                    {post.category && (
                      <p
                        {...elementProps(config.id, `related.${i}.category`, 'badge')}
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'var(--color-primary, #4a2711)',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {post.category}
                      </p>
                    )}
                    {/* Title */}
                    <h3
                      {...elementProps(config.id, `related.${i}.title`, 'heading')}
                      style={{
                        fontFamily: '"General Sans Variable", "General Sans", var(--font-heading, sans-serif)',
                        fontSize: '18px',
                        fontWeight: 500,
                        lineHeight: '140%',
                        color: 'var(--color-foreground, #140c08)',
                        marginBottom: '8px',
                      }}
                    >
                      {post.title}
                    </h3>
                    {/* Date */}
                    {post.date && (
                      <p
                        {...elementProps(config.id, `related.${i}.date`, 'text')}
                        style={{
                          fontSize: '13px',
                          color: '#888888',
                        }}
                      >
                        {post.date}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // ZMR-BLOG — Fond blanc, typographie fine, catégories en tabs underline,
  // grille d'articles avec image 280px, catégorie badge, titre, date, read time
  // ═══════════════════════════════════════════════════════
  if (variant === 'zmr-grid') {
    return (
      <section
        style={{ fontFamily: 'var(--font-body, inherit)', background: '#ffffff', paddingTop: '120px', paddingBottom: '100px' }}
      >
        {/* Title */}
        {content.title && (
          <h2
            {...elementProps(config.id, 'title', 'heading')}
            className="text-center"
            style={{ color: '#000', fontSize: '48px', fontWeight: 300, letterSpacing: '0.05em', marginBottom: '20px' }}
          >
            {content.title}
          </h2>
        )}
        {content.subtitle && (
          <p
            {...elementProps(config.id, 'subtitle', 'text')}
            className="text-center"
            style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.6, marginBottom: '60px' }}
          >
            {content.subtitle}
          </p>
        )}

        {/* Articles Grid */}
        <div
          className="max-w-[1400px] mx-auto px-10 grid gap-10"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))' }}
        >
          {posts.map((post, i) => (
            <a
              key={post.id}
              {...elementProps(config.id, `posts.${i}.title`, 'link')}
              href={post.slug ? `/blog/${post.slug}` : '#'}
              className="no-underline block transition-transform duration-300 hover:-translate-y-1"
              style={{ color: 'inherit' }}
            >
              <article>
                {/* Image */}
                <div className="mb-6 overflow-hidden relative" style={{ width: '100%', height: '280px', background: '#f3f4f6' }}>
                  <PostImage
                    post={post}
                    className="w-full h-full object-cover"
                    placeholderClass="bg-zinc-100"
                  />
                  {/* Category Badge */}
                  {post.category && (
                    <div
                      className="absolute top-4 left-4"
                      style={{
                        background: '#fff',
                        padding: '6px 12px',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#000',
                      }}
                    >
                      {post.category}
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-3" style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <span>{post.date ?? ''}</span>
                  {post.readTime && (
                    <>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 400,
                    color: '#000',
                    marginBottom: '12px',
                    lineHeight: 1.4,
                    letterSpacing: '0.01em',
                  }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
                    {post.excerpt}
                  </p>
                )}

                {/* Read More */}
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '16px',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#000',
                  }}
                >
                  Lire la suite →
                </span>
              </article>
            </a>
          ))}
        </div>
      </section>
    )
  }

  // Fallback → startup-grid
  return <BlogGridSection config={{ ...config, variant: 'startup-grid' }} />
}

export const blogGridMeta = {
  type: 'blog-grid',
  label: 'Blog Grid',
  icon: '📝',
  variants: [
    'startup-grid', 'startup-featured',
    'corporate-grid', 'corporate-featured',
    'luxe-grid', 'luxe-featured',
    'creative-grid', 'creative-featured',
    'ecommerce-grid', 'ecommerce-featured',
    'glass-grid', 'glass-featured',
    'brixsa-grid',
    'brixsa-detail',
    'zmr-grid',
  ],
  defaultVariant: 'startup-grid',
  defaultContent: {},
}
