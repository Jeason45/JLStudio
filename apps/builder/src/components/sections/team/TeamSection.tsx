'use client'

import { cn } from '@/lib/utils'
import { sectionClasses, getTextColorClass, getMutedTextClass, getEyebrowClass, getTitleSizeClass, getTextAlignClass } from '../_utils'
import type { SectionConfig } from '@/types/site'
import type { TeamContent, TeamMember } from '@/types/sections'
import { elementProps } from '@/lib/elementHelpers'

interface TeamSectionProps {
  config: SectionConfig
  isEditing?: boolean
}

/* ── Avatar helper ────────────────────────────────────── */

function Avatar({ member, size = 'md', className, fallbackBg, fallbackText, sectionId, memberIndex }: {
  member: TeamMember
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fallbackBg?: string
  fallbackText?: string
  sectionId?: string
  memberIndex?: number
}) {
  const dims = { sm: 'w-12 h-12', md: 'w-16 h-16', lg: 'w-20 h-20' }[size]
  const textSize = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' }[size]
  const elProps = sectionId != null && memberIndex != null ? elementProps(sectionId, `members.${memberIndex}.avatar`, 'image') : {}

  if (member.avatar) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...elProps}
        src={member.avatar}
        alt={member.name}
        className={cn(dims, 'rounded-full object-cover', className)}
      />
    )
  }

  return (
    <div {...elProps} className={cn(dims, 'rounded-full flex items-center justify-center font-bold', textSize, fallbackBg ?? 'bg-zinc-200', fallbackText ?? 'text-zinc-600', className)}>
      {member.name.charAt(0)}
    </div>
  )
}

/* ── Socials helper ───────────────────────────────────── */

function SocialLinks({ member, linkClass }: { member: TeamMember; linkClass?: string }) {
  const links = [
    member.linkedin && { href: member.linkedin, label: 'LinkedIn' },
    member.twitter && { href: member.twitter, label: 'Twitter' },
  ].filter(Boolean) as { href: string; label: string }[]

  if (links.length === 0) return null

  return (
    <div className="flex items-center gap-3 mt-3">
      {links.map(l => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={cn('text-xs underline underline-offset-2 transition-colors', linkClass ?? 'text-zinc-400 hover:text-zinc-700')}>
          {l.label}
        </a>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export function TeamSection({ config }: TeamSectionProps) {
  const content = (config.content ?? {}) as Partial<TeamContent>
  const { accentColor, textColor: customTextColor } = config.style
  const members: TeamMember[] = content.members ?? []
  const variant = config.variant ?? 'startup-grid'
  const universe = variant.split('-')[0]

  const title = content.title
  const subtitle = content.subtitle
  const eyebrow = content.eyebrow

  // ═══════════════════════════════════════════
  // STARTUP — SaaS / Moderne
  // ═══════════════════════════════════════════

  if (universe === 'startup') {
    const accent = accentColor ?? '#6366f1'
    const layout = variant.replace('startup-', '')

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

    // Grid — 3 columns cards
    if (layout === 'grid') {
      return (
        <section className="bg-zinc-50 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {members.map((member, i) => (
                <div key={member.id} className="bg-white rounded-2xl p-7 border border-zinc-100 shadow-sm hover:shadow-md transition-shadow text-center">
                  <Avatar member={member} size="lg" fallbackBg="bg-indigo-100" fallbackText="text-indigo-600" className="mx-auto mb-4" sectionId={config.id} memberIndex={i} />
                  <h3 {...elementProps(config.id, `members.${i}.name`, 'heading')} className="font-semibold text-zinc-900">{member.name}</h3>
                  <p {...elementProps(config.id, `members.${i}.role`, 'text')} className="text-sm mt-0.5" style={{ color: accent }}>{member.role}</p>
                  {member.bio && <p {...elementProps(config.id, `members.${i}.bio`, 'text')} className="text-xs mt-3 text-zinc-500 leading-relaxed">{member.bio}</p>}
                  <SocialLinks member={member} linkClass="text-indigo-400 hover:text-indigo-600" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List — horizontal rows
    return (
      <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6">
          {header}
          <div className="space-y-5">
            {members.map((member, i) => (
              <div key={member.id} className="flex items-center gap-6 bg-zinc-50 rounded-2xl p-5 border border-zinc-100 hover:shadow-sm transition-shadow">
                <Avatar member={member} size="lg" fallbackBg="bg-indigo-100" fallbackText="text-indigo-600" className="shrink-0" sectionId={config.id} memberIndex={i} />
                <div className="flex-1 min-w-0">
                  <h3 {...elementProps(config.id, `members.${i}.name`, 'heading')} className="font-semibold text-zinc-900">{member.name}</h3>
                  <p {...elementProps(config.id, `members.${i}.role`, 'text')} className="text-sm" style={{ color: accent }}>{member.role}</p>
                  {member.bio && <p {...elementProps(config.id, `members.${i}.bio`, 'text')} className="text-xs mt-1.5 text-zinc-500 leading-relaxed">{member.bio}</p>}
                  <SocialLinks member={member} linkClass="text-indigo-400 hover:text-indigo-600" />
                </div>
              </div>
            ))}
          </div>
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

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-[#0f172a] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-7xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {members.map((member, i) => (
                <div key={member.id} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-colors text-center">
                  <Avatar member={member} size="lg" fallbackBg="bg-blue-500/20" fallbackText="text-blue-300" className="mx-auto mb-4" sectionId={config.id} memberIndex={i} />
                  <h3 {...elementProps(config.id, `members.${i}.name`, 'heading')} className="font-semibold text-white">{member.name}</h3>
                  <p {...elementProps(config.id, `members.${i}.role`, 'text')} className="text-sm mt-0.5 text-blue-400">{member.role}</p>
                  {member.bio && <p {...elementProps(config.id, `members.${i}.bio`, 'text')} className="text-xs mt-3 text-slate-400 leading-relaxed">{member.bio}</p>}
                  <SocialLinks member={member} linkClass="text-slate-500 hover:text-blue-400" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List
    return (
      <section className="bg-[#0f172a] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6">
          {header}
          <div className="divide-y divide-slate-700/50">
            {members.map((member, i) => (
              <div key={member.id} className="flex items-center gap-6 py-6 first:pt-0 last:pb-0">
                <Avatar member={member} size="lg" fallbackBg="bg-blue-500/20" fallbackText="text-blue-300" className="shrink-0" sectionId={config.id} memberIndex={i} />
                <div className="flex-1 min-w-0">
                  <h3 {...elementProps(config.id, `members.${i}.name`, 'heading')} className="font-semibold text-white">{member.name}</h3>
                  <p {...elementProps(config.id, `members.${i}.role`, 'text')} className="text-sm text-blue-400">{member.role}</p>
                  {member.bio && <p {...elementProps(config.id, `members.${i}.bio`, 'text')} className="text-xs mt-1.5 text-slate-400 leading-relaxed">{member.bio}</p>}
                  <SocialLinks member={member} linkClass="text-slate-500 hover:text-blue-400" />
                </div>
              </div>
            ))}
          </div>
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
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {members.map((member, i) => (
                <div key={member.id} className="text-center space-y-4">
                  <Avatar member={member} size="lg" fallbackBg="bg-zinc-100" fallbackText="text-zinc-500" className="mx-auto ring-1 ring-zinc-200" sectionId={config.id} memberIndex={i} />
                  <div className="w-8 h-px mx-auto" style={{ background: gold }} />
                  <h3 {...elementProps(config.id, `members.${i}.name`, 'heading')} className="font-medium text-zinc-900 tracking-wide text-sm uppercase">{member.name}</h3>
                  <p {...elementProps(config.id, `members.${i}.role`, 'text')} className="text-xs tracking-widest uppercase font-light" style={{ color: gold }}>{member.role}</p>
                  {member.bio && <p {...elementProps(config.id, `members.${i}.bio`, 'text')} className="text-sm text-zinc-400 leading-relaxed font-light">{member.bio}</p>}
                  <SocialLinks member={member} linkClass="text-zinc-400 hover:text-zinc-700" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List
    return (
      <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-3xl mx-auto px-6">
          {header}
          <div className="space-y-10">
            {members.map((member, i) => (
              <div key={member.id} className="flex gap-8 items-center">
                <Avatar member={member} size="lg" fallbackBg="bg-zinc-100" fallbackText="text-zinc-500" className="shrink-0 ring-1 ring-zinc-200" sectionId={config.id} memberIndex={i} />
                <div className="flex-1 border-t border-zinc-100 pt-4">
                  <h3 {...elementProps(config.id, `members.${i}.name`, 'heading')} className="font-medium text-zinc-900 tracking-wide text-sm uppercase">{member.name}</h3>
                  <p {...elementProps(config.id, `members.${i}.role`, 'text')} className="text-xs tracking-widest uppercase font-light mt-1" style={{ color: gold }}>{member.role}</p>
                  {member.bio && <p {...elementProps(config.id, `members.${i}.bio`, 'text')} className="text-sm text-zinc-400 leading-relaxed font-light mt-2">{member.bio}</p>}
                  <SocialLinks member={member} linkClass="text-zinc-400 hover:text-zinc-700" />
                </div>
              </div>
            ))}
          </div>
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

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-[#fdf6e3] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-7xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {members.map((member, i) => (
                <div key={member.id} className="bg-white border-2 border-zinc-900 p-6 shadow-[4px_4px_0_0_#18181b] hover:shadow-[6px_6px_0_0_#18181b] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all text-center">
                  <Avatar member={member} size="lg" fallbackBg="bg-zinc-900" fallbackText="text-white" className="mx-auto mb-4 border-2 border-zinc-900" sectionId={config.id} memberIndex={i} />
                  <h3 {...elementProps(config.id, `members.${i}.name`, 'heading')} className="font-black text-zinc-900 uppercase text-sm tracking-wide">{member.name}</h3>
                  <p {...elementProps(config.id, `members.${i}.role`, 'text')} className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-1">{member.role}</p>
                  {member.bio && <p {...elementProps(config.id, `members.${i}.bio`, 'text')} className="text-sm text-zinc-600 leading-relaxed mt-3">{member.bio}</p>}
                  <SocialLinks member={member} linkClass="text-zinc-500 hover:text-zinc-900 font-bold" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List
    return (
      <section className="bg-[#fdf6e3] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6">
          {header}
          <div className="border-t-2 border-zinc-900">
            {members.map((member, i) => (
              <div key={member.id} className="flex items-center gap-6 py-6 border-b-2 border-zinc-900">
                <Avatar member={member} size="lg" fallbackBg="bg-zinc-900" fallbackText="text-white" className="shrink-0 border-2 border-zinc-900" sectionId={config.id} memberIndex={i} />
                <div className="flex-1 min-w-0">
                  <h3 {...elementProps(config.id, `members.${i}.name`, 'heading')} className="font-black text-zinc-900 uppercase text-sm tracking-wide">{member.name}</h3>
                  <p {...elementProps(config.id, `members.${i}.role`, 'text')} className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-0.5">{member.role}</p>
                  {member.bio && <p {...elementProps(config.id, `members.${i}.bio`, 'text')} className="text-sm text-zinc-600 leading-relaxed mt-2">{member.bio}</p>}
                  <SocialLinks member={member} linkClass="text-zinc-500 hover:text-zinc-900 font-bold" />
                </div>
              </div>
            ))}
          </div>
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

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {members.map((member, i) => (
                <div key={member.id} className="rounded-2xl p-6 border border-zinc-100 bg-zinc-50 hover:border-emerald-200 transition-colors text-center">
                  <Avatar member={member} size="lg" fallbackBg="bg-emerald-100" fallbackText="text-emerald-700" className="mx-auto mb-4" sectionId={config.id} memberIndex={i} />
                  <h3 {...elementProps(config.id, `members.${i}.name`, 'heading')} className="font-semibold text-zinc-900">{member.name}</h3>
                  <p {...elementProps(config.id, `members.${i}.role`, 'text')} className="text-sm mt-0.5" style={{ color: accent }}>{member.role}</p>
                  {member.bio && <p {...elementProps(config.id, `members.${i}.bio`, 'text')} className="text-xs mt-3 text-zinc-500 leading-relaxed">{member.bio}</p>}
                  <div className="flex items-center justify-center gap-1 mt-3">
                    <svg className="w-3.5 h-3.5" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: accent }}>Verified member</span>
                  </div>
                  <SocialLinks member={member} linkClass="text-emerald-500 hover:text-emerald-700" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List
    return (
      <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6">
          {header}
          <div className="space-y-4">
            {members.map((member, i) => (
              <div key={member.id} className="flex items-center gap-5 p-5 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <Avatar member={member} size="lg" fallbackBg="bg-emerald-100" fallbackText="text-emerald-700" className="shrink-0" sectionId={config.id} memberIndex={i} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 {...elementProps(config.id, `members.${i}.name`, 'heading')} className="font-semibold text-zinc-900">{member.name}</h3>
                    <svg className="w-4 h-4 shrink-0" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p {...elementProps(config.id, `members.${i}.role`, 'text')} className="text-sm" style={{ color: accent }}>{member.role}</p>
                  {member.bio && <p {...elementProps(config.id, `members.${i}.bio`, 'text')} className="text-xs mt-1.5 text-zinc-500 leading-relaxed">{member.bio}</p>}
                  <SocialLinks member={member} linkClass="text-emerald-500 hover:text-emerald-700" />
                </div>
              </div>
            ))}
          </div>
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
      <div className="text-center mb-14 space-y-4">
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
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/40 max-w-2xl mx-auto">{subtitle}</p>}
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
              {members.map((member, i) => (
                <div key={member.id} className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 border border-white/[0.08] hover:border-white/[0.15] transition-colors text-center group">
                  <Avatar member={member} size="lg" fallbackBg="bg-white/10" fallbackText="text-white/80" className="mx-auto mb-4 ring-1 ring-white/10" sectionId={config.id} memberIndex={i} />
                  <h3 {...elementProps(config.id, `members.${i}.name`, 'heading')} className="font-semibold text-white">{member.name}</h3>
                  <p {...elementProps(config.id, `members.${i}.role`, 'text')} className="text-sm mt-0.5" style={{ color: accent }}>{member.role}</p>
                  {member.bio && <p {...elementProps(config.id, `members.${i}.bio`, 'text')} className="text-xs mt-3 text-white/40 leading-relaxed">{member.bio}</p>}
                  <SocialLinks member={member} linkClass="text-white/30 hover:text-white/70" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List
    return (
      <section className="bg-[#0a0a0f] py-20 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="absolute inset-0 dot-grid" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent}20, transparent 70%)` }}
        />
        <div className="relative max-w-4xl mx-auto px-6">
          {header}
          <div className="space-y-3">
            {members.map((member, i) => (
              <div key={member.id} className="flex items-center gap-5 p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] transition-colors">
                <Avatar member={member} size="lg" fallbackBg="bg-white/10" fallbackText="text-white/80" className="shrink-0 ring-1 ring-white/10" sectionId={config.id} memberIndex={i} />
                <div className="flex-1 min-w-0">
                  <h3 {...elementProps(config.id, `members.${i}.name`, 'heading')} className="font-semibold text-white">{member.name}</h3>
                  <p {...elementProps(config.id, `members.${i}.role`, 'text')} className="text-sm" style={{ color: accent }}>{member.role}</p>
                  {member.bio && <p {...elementProps(config.id, `members.${i}.bio`, 'text')} className="text-xs mt-1.5 text-white/40 leading-relaxed">{member.bio}</p>}
                  <SocialLinks member={member} linkClass="text-white/30 hover:text-white/70" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}60` }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRIXSA — Marquee Carousel
  // ═══════════════════════════════════════════

  if (variant === 'brixsa-marquee') {
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

    const defaultAgents: TeamMember[] = [
      { id: 'brixsa-1', name: 'James Smith', role: 'CEO, Founder', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', bio: '' },
      { id: 'brixsa-2', name: 'David Johnson', role: 'CFO', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', bio: '' },
      { id: 'brixsa-3', name: 'Michael Brown', role: 'COO', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', bio: '' },
      { id: 'brixsa-4', name: 'Matt Dymon', role: 'Real Estate Agent', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', bio: '' },
      { id: 'brixsa-5', name: 'Jane Smith', role: 'Real Estate Agent', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', bio: '' },
      { id: 'brixsa-6', name: 'Jeo Zaldana', role: 'Real Estate Agent', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', bio: '' },
    ]
    // Template data may pass 'image' instead of 'avatar' — normalize
    const normalizedMembers = members.map(m => {
      const raw = m as unknown as Record<string, unknown>
      const avatarUrl = m.avatar || (raw.image as string) || ''
      return { ...m, avatar: avatarUrl }
    })
    const agents = normalizedMembers.length > 0 ? normalizedMembers : defaultAgents
    const doubled = [...agents, ...agents]

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Agents Section')} className="overflow-hidden" style={{ backgroundColor: 'var(--color-muted, #f6efe5)', paddingTop: '180px', paddingBottom: '180px', fontFamily: 'var(--font-body, inherit)' }}>
        <style>{`
          @keyframes brixsa-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

        {/* Header — inside container */}
        <div {...elementProps(config.id, 'headerContainer', 'container', 'Container')} style={{ maxWidth: '1320px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '60px', paddingRight: '60px', marginBottom: '60px' }}>
          <div {...elementProps(config.id, 'header', 'container', 'Header')} className={cn('flex justify-between items-end')} style={{ gap: '24px' }}>
            {title && (
              <div>
                <h2
                  {...elementProps(config.id, 'title', 'heading')}
                  style={{
                    fontFamily: "'GeneralSans Variable', var(--font-heading, sans-serif)",
                    fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                    fontWeight: 500,
                    lineHeight: '110%',
                    textTransform: 'capitalize' as const,
                    color: customTextColor ?? 'var(--color-foreground, #140c08)',
                  }}
                >
                  {title}
                </h2>
              </div>
            )}
            {subtitle && (
              <>
                <style>{`
                  .brixsa-btn-agents .brixsa-btn-fill-agents { transform: translateX(102%); transition: transform 0.4s ease; }
                  .brixsa-btn-agents:hover .brixsa-btn-fill-agents { transform: translateX(0); }
                  .brixsa-btn-agents:hover .brixsa-btn-label-agents { color: #fff; }
                  .brixsa-btn-label-agents { transition: color 0.4s; }
                `}</style>
                <a
                  {...elementProps(config.id, 'subtitle', 'text')}
                  href="/agents"
                  className="brixsa-btn-agents flex items-center shrink-0 relative overflow-hidden"
                  style={{ fontSize: '20px', fontWeight: 500, padding: '10px 12px 10px 20px', gap: '10px', color: 'var(--color-foreground, #140c08)', borderRadius: '6px', textDecoration: 'none' }}
                >
                  <span {...elementProps(config.id, 'viewAllLabel', 'text', 'Link Text')} className="brixsa-btn-label-agents relative" style={{ zIndex: 10 }}>{subtitle}</span>
                  <span
                    {...elementProps(config.id, 'viewAllIcon', 'icon', 'Arrow Icon')}
                    className="flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-primary, #4a2711)', borderRadius: '4px', width: '28px', height: '28px', position: 'relative', zIndex: 10, flexShrink: 0 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 7h12M8 2l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden', borderRadius: '6px' }}>
                    <span className="brixsa-btn-fill-agents" style={{ display: 'block', backgroundColor: 'var(--color-primary, #4a2711)', width: '100%', height: '100%' }} />
                  </span>
                </a>
              </>
            )}
          </div>
        </div>

        {/* Marquee track — full width, outside container */}
        <div {...elementProps(config.id, 'marqueeTrack', 'container', 'Marquee Track')} className="w-full" style={{ overflow: 'hidden' }}>
          <div
            {...elementProps(config.id, 'marqueeInner', 'container', 'Marquee Inner')}
            className={cn('flex flex-nowrap')}
            style={{ animation: 'brixsa-marquee 20s linear infinite', width: 'max-content' }}
          >
            {doubled.map((member, i) => {
              const realIndex = i % agents.length
              const isFirstSet = i < agents.length

              return (
                <a
                  key={`${member.id}-${i}`}
                  href={`/agents/${member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}
                  className="group/agent block"
                  style={{ flex: '0 0 424px', marginRight: '16px', textDecoration: 'none', color: 'inherit' }}
                  {...(!isFirstSet ? { 'aria-hidden': 'true' as unknown as boolean } : {})}
                >
                  {/* Image */}
                  <div style={{ overflow: 'hidden', borderRadius: '8px' }}>
                    {member.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        {...(isFirstSet ? elementProps(config.id, `members.${realIndex}.avatar`, 'image') : {})}
                        src={member.avatar}
                        alt={member.name}
                        className={cn('w-full object-cover group-hover/agent:scale-105')}
                        style={{ aspectRatio: '424 / 482', transition: 'transform 0.6s ease' }}
                      />
                    ) : (
                      <div
                        className={cn('w-full flex items-center justify-center group-hover/agent:scale-105')}
                        style={{
                          aspectRatio: '424 / 482',
                          background: 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)',
                          transition: 'transform 0.6s ease',
                        }}
                      >
                        <span style={{ fontSize: '48px', fontWeight: 700, color: '#6b7280' }}>{member.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div style={{ marginTop: '16px' }}>
                    <p
                      {...(isFirstSet ? elementProps(config.id, `members.${realIndex}.name`, 'heading') : {})}
                      style={{ fontSize: '18px', fontWeight: 500, marginBottom: '4px', color: 'var(--color-foreground, #140c08)' }}
                    >
                      {member.name}
                    </p>
                    <p
                      {...(isFirstSet ? elementProps(config.id, `members.${realIndex}.role`, 'text') : {})}
                      style={{ fontSize: '16px', fontWeight: 400, color: '#56595a' }}
                    >
                      {member.role}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRIXSA — Detail (Single Agent Profile)
  // ═══════════════════════════════════════════

  if (variant === 'brixsa-detail') {
    const raw = (members[0] ?? {}) as unknown as Record<string, unknown>
    const agent = {
      name: (raw.name as string) || 'James Smith',
      role: (raw.role as string) || 'Real Estate Agent',
      avatar: (raw.avatar as string) || (raw.image as string) || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      bio: (raw.bio as string) || (raw.description as string) || 'James Smith is a passionate real estate agent with over 8 years of experience in the New York City area. Known for his dedication to clients and deep market knowledge, James has helped hundreds of families find their dream homes.',
      phone: (raw.phone as string) || '+1 (555) 123-4567',
      email: (raw.email as string) || 'james@brixsa.com',
      address: (raw.address as string) || '123 Madison Ave, New York, NY 10016',
      linkedin: (raw.linkedin as string) || '#',
      twitter: (raw.twitter as string) || '#',
      instagram: (raw.instagram as string) || '#',
      facebook: (raw.facebook as string) || '#',
    }
    const listings = (raw.listings as Array<Record<string, unknown>>) || [
      { id: 'l1', title: 'Modern Apartment in Manhattan', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', price: '$1,250,000', beds: 3, baths: 2, sqft: '1,800' },
      { id: 'l2', title: 'Brooklyn Heights Townhouse', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', price: '$2,100,000', beds: 4, baths: 3, sqft: '2,400' },
      { id: 'l3', title: 'Upper East Side Condo', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', price: '$890,000', beds: 2, baths: 1, sqft: '1,200' },
    ]

    const stats = [
      { label: 'Active Listings', value: '20' },
      { label: 'Experience Since', value: '2015' },
      { label: 'Areas Served', value: 'New York City' },
    ]

    /* Social icon SVGs */
    const socialIcons: { key: string; href: string; svg: React.ReactNode }[] = [
      { key: 'instagram', href: agent.instagram, svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
      { key: 'facebook', href: agent.facebook, svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
      { key: 'twitter', href: agent.twitter, svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg> },
      { key: 'linkedin', href: agent.linkedin, svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
    ]

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Agent Detail Section')}
        style={{ backgroundColor: 'var(--color-muted, #f5f0e8)', fontFamily: "'Inter Variable', var(--font-body, sans-serif)", margin: 0, padding: 0 }}
      >
        {/* Hero — two column */}
        <div
          {...elementProps(config.id, 'heroWrapper', 'container', 'Hero Wrapper')}
          style={{ maxWidth: '1320px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '60px', paddingRight: '60px', paddingTop: '100px', paddingBottom: '80px', display: 'flex', gap: '60px', alignItems: 'flex-start', flexWrap: 'wrap' as const }}
        >
          {/* Left — Agent Photo */}
          <div
            {...elementProps(config.id, 'heroImageCol', 'container', 'Image Column')}
            style={{ flex: '0 0 50%', maxWidth: '50%', minWidth: '300px' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...elementProps(config.id, 'members.0.avatar', 'image')}
              src={agent.avatar}
              alt={agent.name}
              style={{ width: '100%', height: 'auto', aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: '12px', display: 'block' }}
            />
          </div>

          {/* Right — Agent Info */}
          <div
            {...elementProps(config.id, 'heroInfoCol', 'container', 'Info Column')}
            style={{ flex: '1 1 0%', minWidth: '280px' }}
          >
            {/* Name */}
            <h1
              {...elementProps(config.id, 'members.0.name', 'heading')}
              style={{ fontFamily: "'GeneralSans Variable', var(--font-heading, sans-serif)", fontSize: '40px', fontWeight: 700, lineHeight: '1.15', color: customTextColor ?? 'var(--color-foreground, #140c08)', margin: 0, marginBottom: '8px' }}
            >
              {agent.name}
            </h1>

            {/* Role */}
            <p
              {...elementProps(config.id, 'members.0.role', 'text')}
              style={{ fontSize: '18px', fontWeight: 400, color: '#666666', margin: 0, marginBottom: '24px' }}
            >
              {agent.role}
            </p>

            {/* Bio */}
            <p
              {...elementProps(config.id, 'members.0.bio', 'text')}
              style={{ fontSize: '16px', fontWeight: 400, lineHeight: '1.7', color: '#444444', margin: 0, marginBottom: '36px', maxWidth: '540px' }}
            >
              {agent.bio}
            </p>

            {/* Stats Grid */}
            <div
              {...elementProps(config.id, 'statsGrid', 'container', 'Stats Grid')}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '36px' }}
            >
              {stats.map((stat, si) => (
                <div
                  key={stat.label}
                  {...elementProps(config.id, `stat.${si}`, 'container', stat.label)}
                  style={{ padding: '20px', backgroundColor: '#ece6da', borderRadius: '10px', textAlign: 'center' as const }}
                >
                  <p
                    {...elementProps(config.id, `stat.${si}.value`, 'text')}
                    style={{ fontFamily: "'GeneralSans Variable', var(--font-heading, sans-serif)", fontSize: '24px', fontWeight: 600, color: 'var(--color-foreground, #140c08)', margin: 0, marginBottom: '4px' }}
                  >
                    {stat.value}
                  </p>
                  <p
                    {...elementProps(config.id, `stat.${si}.label`, 'text')}
                    style={{ fontSize: '13px', fontWeight: 500, color: '#888888', margin: 0, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div
              {...elementProps(config.id, 'contactBlock', 'container', 'Contact Info')}
              style={{ marginBottom: '28px', display: 'flex', flexDirection: 'column' as const, gap: '12px' }}
            >
              {/* Phone */}
              <div
                {...elementProps(config.id, 'contactPhone', 'container', 'Phone')}
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <svg {...elementProps(config.id, 'phoneIcon', 'icon', 'Phone Icon')} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary, #4a2711)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span
                  {...elementProps(config.id, 'phoneValue', 'text', 'Phone Number')}
                  style={{ fontSize: '15px', color: 'var(--color-foreground, #140c08)', fontWeight: 400 }}
                >
                  {agent.phone}
                </span>
              </div>
              {/* Email */}
              <div
                {...elementProps(config.id, 'contactEmail', 'container', 'Email')}
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <svg {...elementProps(config.id, 'emailIcon', 'icon', 'Email Icon')} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary, #4a2711)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span
                  {...elementProps(config.id, 'emailValue', 'text', 'Email Address')}
                  style={{ fontSize: '15px', color: 'var(--color-foreground, #140c08)', fontWeight: 400 }}
                >
                  {agent.email}
                </span>
              </div>
              {/* Address */}
              <div
                {...elementProps(config.id, 'contactAddress', 'container', 'Address')}
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <svg {...elementProps(config.id, 'addressIcon', 'icon', 'Address Icon')} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary, #4a2711)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span
                  {...elementProps(config.id, 'addressValue', 'text', 'Address')}
                  style={{ fontSize: '15px', color: 'var(--color-foreground, #140c08)', fontWeight: 400 }}
                >
                  {agent.address}
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div
              {...elementProps(config.id, 'socialRow', 'container', 'Social Icons')}
              style={{ display: 'flex', gap: '12px' }}
            >
              {socialIcons.map(s => (
                <a
                  key={s.key}
                  {...elementProps(config.id, `social.${s.key}`, 'link', s.key)}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--color-primary, #4a2711)', color: '#ffffff', transition: 'opacity 0.2s' }}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Listings Section */}
        <div
          {...elementProps(config.id, 'listingsSection', 'container', 'Agent Listings')}
          style={{ maxWidth: '1320px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '60px', paddingRight: '60px', paddingBottom: '100px' }}
        >
          <h2
            {...elementProps(config.id, 'listingsTitle', 'heading', 'Listings Heading')}
            style={{ fontFamily: "'GeneralSans Variable', var(--font-heading, sans-serif)", fontSize: '32px', fontWeight: 600, color: customTextColor ?? 'var(--color-foreground, #140c08)', marginBottom: '40px', marginTop: 0 }}
          >
            Agent Listings
          </h2>

          <div
            {...elementProps(config.id, 'listingsGrid', 'container', 'Listings Grid')}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
          >
            {listings.map((listing, li) => (
              <div
                key={(listing.id as string) || li}
                {...elementProps(config.id, `listing.${li}`, 'container', (listing.title as string) || 'Listing')}
                style={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.2s' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...elementProps(config.id, `listing.${li}.image`, 'image')}
                  src={(listing.image as string) || ''}
                  alt={(listing.title as string) || ''}
                  style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                />
                <div
                  {...elementProps(config.id, `listing.${li}.body`, 'container', 'Card Body')}
                  style={{ padding: '20px' }}
                >
                  <p
                    {...elementProps(config.id, `listing.${li}.price`, 'text', 'Price')}
                    style={{ fontFamily: "'GeneralSans Variable', var(--font-heading, sans-serif)", fontSize: '20px', fontWeight: 600, color: 'var(--color-foreground, #140c08)', margin: 0, marginBottom: '6px' }}
                  >
                    {(listing.price as string) || ''}
                  </p>
                  <p
                    {...elementProps(config.id, `listing.${li}.title`, 'text', 'Title')}
                    style={{ fontSize: '15px', fontWeight: 500, color: '#333333', margin: 0, marginBottom: '12px' }}
                  >
                    {(listing.title as string) || ''}
                  </p>
                  <div
                    {...elementProps(config.id, `listing.${li}.meta`, 'container', 'Meta')}
                    style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#888888' }}
                  >
                    <span {...elementProps(config.id, `listing.${li}.beds`, 'text', 'Beds')}>{(listing.beds as number) || 0} Beds</span>
                    <span {...elementProps(config.id, `listing.${li}.baths`, 'text', 'Baths')}>{(listing.baths as number) || 0} Baths</span>
                    <span {...elementProps(config.id, `listing.${li}.sqft`, 'text', 'Sqft')}>{(listing.sqft as string) || '0'} Sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Fallback → startup-grid
  return <TeamSection config={{ ...config, variant: 'startup-grid' }} />
}

export const teamMeta = {
  type: 'team',
  label: 'Equipe',
  icon: '👥',
  variants: [
    'startup-grid', 'startup-list',
    'corporate-grid', 'corporate-list',
    'luxe-grid', 'luxe-list',
    'creative-grid', 'creative-list',
    'ecommerce-grid', 'ecommerce-list',
    'glass-grid', 'glass-list',
    'brixsa-marquee',
    'brixsa-detail',
  ],
  defaultVariant: 'startup-grid',
  defaultContent: {},
}
