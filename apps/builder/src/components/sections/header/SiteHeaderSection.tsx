import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { SiteHeaderContent, NavLink } from '@/types/sections'
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { elementProps } from '@/lib/elementHelpers'
import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'

export function SiteHeaderSection({ config }: { config: SectionConfig }) {
  const content = (config.content ?? {}) as Partial<SiteHeaderContent>
  const variant = config.variant ?? 'startup'
  const { accentColor } = config.style
  const links: NavLink[] = content.links ?? []
  const logo = content.logo ?? 'Logo'
  const ctaLabel = content.ctaLabel
  const ctaHref = content.ctaHref ?? '#'

  // ─── VARIANT: corporate ───
  // Univers entreprise / finance : fond navy sombre, clean, CTA sobre avec bordure
  if (variant === 'corporate') {
    return (
      <header className="bg-slate-900 px-6 py-0 border-b border-slate-700/50" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-10">
            <div {...elementProps(config.id, 'logo', 'image')} className="font-semibold text-lg text-white tracking-wide">{logo}</div>
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link, i) => (
                <a
                  {...elementProps(config.id, `links.${i}.label`, 'link')}
                  key={link.id}
                  href={link.href}
                  className="text-sm text-slate-300 hover:text-white transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 hover:after:w-full after:transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          {ctaLabel && (
            <a
              {...elementProps(config.id, 'ctaLabel', 'button')}
              href={ctaHref}
              className="px-5 py-2 rounded text-sm font-medium border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all"
              style={accentColor ? { borderColor: accentColor, color: accentColor } : undefined}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </header>
    )
  }

  // ─── VARIANT: luxe ───
  // Univers luxe / premium : beaucoup d'espace, logo centré, accents dorés, finesse
  if (variant === 'luxe') {
    const gold = accentColor ?? '#b8860b'
    return (
      <header className="bg-white px-6" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Logo centré */}
          <div className="flex justify-center py-6">
            <div {...elementProps(config.id, 'logo', 'image')} className="text-2xl font-light tracking-[0.25em] uppercase text-zinc-800">{logo}</div>
          </div>
          {/* Séparateur doré fin */}
          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
          {/* Nav centrée */}
          <div className="flex items-center justify-center py-4 gap-10">
            <nav className="hidden md:flex items-center gap-10">
              {links.map((link, i) => (
                <a
                  {...elementProps(config.id, `links.${i}.label`, 'link')}
                  key={link.id}
                  href={link.href}
                  className="text-xs tracking-[0.15em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            {ctaLabel && (
              <a
                {...elementProps(config.id, 'ctaLabel', 'button')}
                href={ctaHref}
                className="text-xs tracking-[0.15em] uppercase font-medium transition-colors"
                style={{ color: gold }}
              >
                {ctaLabel}
              </a>
            )}
          </div>
        </div>
      </header>
    )
  }

  // ─── VARIANT: startup (default) ───
  // Univers SaaS / tech : pilules nav, CTA gradient arrondi, moderne
  if (variant === 'startup') {
    const accent = accentColor ?? '#6366f1'
    return (
      <header className="bg-white px-6 py-3 border-b border-zinc-100" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div {...elementProps(config.id, 'logo', 'image')} className="font-bold text-xl text-zinc-900 tracking-tight">{logo}</div>
          <nav className="hidden md:flex items-center bg-zinc-100 rounded-full px-1.5 py-1">
            {links.map((link, i) => (
              <a
                {...elementProps(config.id, `links.${i}.label`, 'link')}
                key={link.id}
                href={link.href}
                className="text-sm px-4 py-1.5 rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-white transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>
          {ctaLabel && (
            <a
              {...elementProps(config.id, 'ctaLabel', 'button')}
              href={ctaHref}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
              style={{ backgroundColor: accent, boxShadow: `0 4px 14px ${accent}40` }}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </header>
    )
  }

  // ─── VARIANT: creative ───
  // Univers agence / portfolio : néobrutalist, bordures épaisses, uppercase, contrasté
  if (variant === 'creative') {
    return (
      <header className="bg-[#f5f0e8] px-6 py-0 border-b-[3px] border-zinc-900" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div {...elementProps(config.id, 'logo', 'image')} className="font-black text-2xl text-zinc-900 tracking-tight">{logo}</div>
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link, i) => (
              <a
                {...elementProps(config.id, `links.${i}.label`, 'link')}
                key={link.id}
                href={link.href}
                className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-orange-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {ctaLabel && (
              <a
                {...elementProps(config.id, 'ctaLabel', 'button')}
                href={ctaHref}
                className="px-5 py-2.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider rounded-none hover:bg-orange-600 transition-colors border-2 border-zinc-900 hover:border-orange-600"
                style={accentColor ? { backgroundColor: accentColor, borderColor: accentColor } : undefined}
              >
                {ctaLabel}
              </a>
            )}
            <button className="w-10 h-10 border-2 border-zinc-900 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-colors md:hidden">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
    )
  }

  // ─── VARIANT: ecommerce ───
  // Univers boutique : barre de recherche, icônes panier/compte, catégories
  if (variant === 'ecommerce') {
    const accent = accentColor ?? '#059669'
    return (
      <header className="bg-white border-b border-zinc-200" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        {/* Top bar */}
        <div className="px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div {...elementProps(config.id, 'logo', 'image')} className="font-bold text-xl text-zinc-900">{logo}</div>
            {/* Search bar */}
            <div {...elementProps(config.id, 'searchBar', 'text')} className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="flex w-full h-10 rounded-lg border border-zinc-200 overflow-hidden bg-zinc-50">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="flex-1 px-4 text-sm bg-transparent outline-none text-zinc-700 placeholder:text-zinc-400"
                />
                <button className="px-3 flex items-center justify-center text-white" style={{ backgroundColor: accent }}>
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Icons */}
            <div className="flex items-center gap-4">
              {ctaLabel && (
                <a {...elementProps(config.id, 'ctaLabel', 'button')} href={ctaHref} className="hidden sm:block text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">
                  {ctaLabel}
                </a>
              )}
              <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-zinc-100 transition-colors text-zinc-600">
                <User className="w-5 h-5" />
              </button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-zinc-100 transition-colors text-zinc-600 relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold text-white rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}>
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Category nav */}
        <div className="border-t border-zinc-100 px-6">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-6 overflow-x-auto py-2.5 scrollbar-hide">
              {links.map((link, i) => (
                <a
                  {...elementProps(config.id, `links.${i}.label`, 'link')}
                  key={link.id}
                  href={link.href}
                  className="text-sm text-zinc-600 hover:text-zinc-900 whitespace-nowrap transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>
    )
  }

  // ─── VARIANT: glass ───
  // Univers tech / IA / crypto : glassmorphism, fond sombre, effets blur, futuriste
  if (variant === 'glass') {
    const accent = accentColor ?? '#818cf8'
    return (
      <header className="bg-zinc-950/80 backdrop-blur-2xl px-6 py-0 border-b border-white/[0.08]" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div {...elementProps(config.id, 'logo', 'image')} className="font-bold text-lg text-white tracking-tight">{logo}</div>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link, i) => (
              <a
                {...elementProps(config.id, `links.${i}.label`, 'link')}
                key={link.id}
                href={link.href}
                className="text-sm px-3.5 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>
          {ctaLabel && (
            <a
              {...elementProps(config.id, 'ctaLabel', 'button')}
              href={ctaHref}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:brightness-110"
              style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, boxShadow: `0 0 20px ${accent}30` }}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </header>
    )
  }

  // ─── VARIANT: brixsa ───
  // Transparent overlay navbar : glassmorphism menu button, logo left, minimal
  if (variant === 'brixsa') {
    return <BrixsaHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  if (variant === 'zmr-agency') {
    return <ZmrAgencyHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  // fallback → startup
  return <SiteHeaderSection config={{ ...config, variant: 'startup' }} />
}

// ─── Brixsa Off-Canvas Menu ───

function BrixsaHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  // All menu links (include FAQ + Privacy Policy beyond the section links)
  const menuLinks: { label: string; href: string }[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Property', href: '/property' },
    { label: 'Agents', href: '/agents' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ]

  const socials = [
    { label: 'Instagram', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
    )},
    { label: 'Facebook', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    )},
    { label: 'X', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    )},
    { label: 'LinkedIn', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    )},
  ]

  return (
    <>
      {/* Brixsa responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .brixsa-resp-menu-grid { grid-template-columns: 1fr !important; }
          .brixsa-resp-menu-right { display: none !important; }
        }
      ` }} />
      {/* ─── NAVBAR ─── */}
      <header
        {...elementProps(config.id, 'wrapper', 'container', 'Header')}
        className={cn('absolute top-0 left-0 w-full flex items-center')}
        style={{
          zIndex: 888,
          backgroundColor: 'transparent',
          minHeight: '72px',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: 'var(--font-body, inherit)',
        }}
      >
        <div
          {...elementProps(config.id, 'navGrid', 'container', 'Nav Grid')}
          className={cn('grid items-center w-full')}
          style={{
            gridTemplateColumns: '.375fr minmax(min-content, max-content)',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* LEFT — Logo */}
          <div
            {...elementProps(config.id, 'logo', 'image')}
            className="text-white tracking-wide"
            style={{
              maxWidth: '140px',
              fontSize: '20px',
              fontWeight: 600,
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
            }}
          >
            {logo}<sup>®</sup>
          </div>

          {/* RIGHT — Menu button (glassmorphism) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            className={cn('flex items-center cursor-pointer')}
            style={{
              borderRadius: '4px',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(128,117,117,0.5)',
              color: 'white',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '8px',
              paddingBottom: '8px',
              fontSize: '16px',
              fontWeight: 500,
              fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
              border: 'none',
              gap: '10px',
              whiteSpace: 'nowrap',
            }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>{ctaLabel || 'Menu'}</span>
            {/* Toggle icon */}
            <span
              {...elementProps(config.id, 'menuIcon', 'icon', 'Menu Icon')}
              className={cn('flex flex-col items-center')}
              style={{ gap: '3px' }}
            >
              <span className="bg-white" style={{ width: '18px', height: '2px', display: 'block' }} />
              <span className="bg-white" style={{ width: '18px', height: '2px', display: 'block' }} />
            </span>
          </div>
        </div>
      </header>

      {/* ─── OFF-CANVAS MENU OVERLAY ─── */}
      <div
        {...elementProps(config.id, 'offCanvas', 'container', 'Off-Canvas Menu')}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Dark background overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#1a1a1a',
          }}
        />

        {/* Menu content grid */}
        <div
          {...elementProps(config.id, 'offCanvasGrid', 'container', 'Menu Grid')}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
          }}
          className="brixsa-resp-menu-grid"
        >
          {/* LEFT COLUMN — Navigation */}
          <div
            {...elementProps(config.id, 'offCanvasNav', 'container', 'Menu Navigation')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(20px, 5vw, 60px)',
              paddingTop: 'clamp(40px, 8vw, 80px)',
            }}
          >
            {/* Top — Logo + Close */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
              <div
                {...elementProps(config.id, 'offCanvasLogo', 'text', 'Menu Logo')}
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'white',
                  fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                }}
              >
                {logo}<sup>®</sup>
              </div>
              <div
                {...elementProps(config.id, 'closeButton', 'button', 'Close Button')}
                role="button"
                onClick={toggleMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '4px',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(128,117,117,0.5)',
                  color: 'white',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  fontSize: '16px',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>Close</span>
                <X size={18} strokeWidth={2} />
              </div>
            </div>

            {/* Navigation links */}
            <nav
              {...elementProps(config.id, 'offCanvasLinks', 'container', 'Menu Links')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                flex: 1,
              }}
            >
              {menuLinks.map((link, i) => (
                <a
                  key={link.label}
                  {...elementProps(config.id, `menuLinks.${i}`, 'link', link.label)}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: i < 6 ? 'clamp(24px, 5vw, 40px)' : '18px',
                    fontWeight: i < 6 ? 500 : 400,
                    color: i < 6 ? 'white' : 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    padding: i < 6 ? '8px 0' : '4px 0',
                    transition: 'color 0.3s, transform 0.3s',
                    display: 'block',
                    fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${i * 0.05}s`,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#c8a97e' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = i < 6 ? 'white' : 'rgba(255,255,255,0.5)' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom — Social Icons + CTA */}
            <div
              {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Social icons */}
              <div
                {...elementProps(config.id, 'offCanvasSocials', 'container', 'Social Icons')}
                style={{ display: 'flex', gap: '16px' }}
              >
                {socials.map((s, i) => (
                  <a
                    key={s.label}
                    {...elementProps(config.id, `social.${i}`, 'link', s.label)}
                    href={s.href}
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      transition: 'color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'white'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* CTA */}
              <a
                {...elementProps(config.id, 'offCanvasCta', 'button', 'Get in Touch')}
                href="#contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 28px',
                  backgroundColor: '#c8a97e',
                  color: '#1a1a1a',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  borderRadius: '4px',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#d4b88e' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#c8a97e' }}
              >
                Get in touch
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN — Image overlay */}
          <div
            {...elementProps(config.id, 'offCanvasImage', 'image', 'Menu Image')}
            className="brixsa-resp-menu-right"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#2a2a2a',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
              alt="Luxury property"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.7,
                transform: menuOpen ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            {/* Image overlay gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(26,26,26,0.4) 0%, transparent 60%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
  }

// ─── ZMR Agency Header ───

function ZmrAgencyHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const [canvasRect, setCanvasRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null)
  const [viewportRect, setViewportRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null)
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null)

  useEffect(() => { setMounted(true) }, [])

  // Track canvas viewport rect + scroll direction
  useEffect(() => {
    if (!mounted) return
    const canvasEl = document.getElementById('site-canvas')
    if (!canvasEl) return

    // Walk up to the scrollable ancestor
    let scrollParent: HTMLElement | null = canvasEl.parentElement
    while (scrollParent) {
      const style = getComputedStyle(scrollParent)
      if (style.overflowY === 'auto' || style.overflowY === 'scroll' || style.overflow === 'auto') break
      scrollParent = scrollParent.parentElement
    }
    if (!scrollParent) return
    setScrollContainer(scrollParent)

    const updateRect = () => {
      const r = canvasEl.getBoundingClientRect()
      setCanvasRect({ top: r.top, left: r.left, width: r.width, height: r.height })
      // Viewport rect = scroll container bounds (stable, for overlays)
      const vr = scrollParent!.getBoundingClientRect()
      setViewportRect({ top: vr.top, left: r.left, width: r.width, height: vr.height })
    }
    updateRect()

    const ro = new ResizeObserver(updateRect)
    ro.observe(canvasEl)

    const onScroll = () => {
      const y = scrollParent!.scrollTop
      const delta = y - lastScrollY.current
      // Hide when scrolling down more than 5px (and past initial 80px)
      // Show immediately when scrolling up at all
      if (delta > 5 && y > 80) {
        setHeaderVisible(false)
      } else if (delta < -5) {
        setHeaderVisible(true)
      }
      lastScrollY.current = y
      updateRect()
    }
    scrollParent.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      scrollParent!.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [mounted])

  if (!mounted || !canvasRect || !scrollContainer) return <div style={{ height: 0 }} />

  return createPortal(
    <div style={{
      position: 'fixed',
      top: viewportRect?.top ?? canvasRect.top,
      left: viewportRect?.left ?? canvasRect.left,
      width: viewportRect?.width ?? canvasRect.width,
      height: viewportRect?.height ?? canvasRect.height,
      zIndex: 30,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      {/* Header — clipped to canvas viewport */}
      {!menuOpen && !searchOpen && (
        <header
          ref={headerRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            pointerEvents: 'none',
            fontFamily: 'var(--font-body, inherit)',
            height: '160px',
            transform: headerVisible ? 'translateY(0)' : 'translateY(-160px)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Centered Logo */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              top: '20px',
              zIndex: 10,
              pointerEvents: 'auto',
            }}
          >
            <a
              href="/"
              {...elementProps(config.id, 'logo', 'image')}
              style={{
                color: 'white',
                fontWeight: 300,
                letterSpacing: '0.2em',
                fontSize: 'clamp(32px, 6vw, 72px)',
                lineHeight: 1,
                transition: 'opacity 0.3s',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'block',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {logo}
            </a>
            {ctaLabel && (
              <p style={{
                color: 'white',
                fontWeight: 300,
                letterSpacing: '0.4em',
                fontSize: 'clamp(8px, 1vw, 11px)',
                textTransform: 'uppercase',
                marginTop: '10px',
              }}>
                {ctaLabel}
              </p>
            )}
          </div>

          {/* Right Icons */}
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              top: 'clamp(20px, 4vh, 32px)',
              right: 'clamp(16px, 4vw, 32px)',
              gap: 'clamp(16px, 3vw, 24px)',
              zIndex: 50,
              pointerEvents: 'auto',
            }}
          >
            <button
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.3s' }}
              onClick={() => setSearchOpen(true)}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.5')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <Search style={{ width: 20, height: 20, color: 'white' }} />
            </button>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.3s' }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.5')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <User style={{ width: 20, height: 20, color: 'white' }} />
            </button>
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.3s' }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.5')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none" />
              </svg>
            </a>
            <button
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 'clamp(28px, 4vw, 32px)', height: 'clamp(28px, 4vw, 32px)' }}
              onClick={() => setMenuOpen(true)}
            >
              <span style={{ width: '100%', height: '2px', backgroundColor: 'white', marginBottom: 'clamp(6px, 1vw, 8px)' }} />
              <span style={{ width: '100%', height: '2px', backgroundColor: 'white' }} />
            </button>
          </div>
        </header>
      )}

      {/* Fullscreen Menu Overlay */}
      {menuOpen && viewportRect && (
        <div
          style={{
            position: 'fixed',
            top: viewportRect.top,
            left: viewportRect.left,
            width: viewportRect.width,
            height: viewportRect.height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            zIndex: 99999,
            padding: '20px',
            overflowY: 'auto',
            pointerEvents: 'auto',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2.5vh, 28px)' }}>
            {links.map((link, i) => (
              <a
                {...elementProps(config.id, `links.${i}.label`, 'link')}
                key={link.id}
                href={link.href}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: 'clamp(28px, 5.5vw, 90px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  transition: 'opacity 0.3s',
                  background: 'none',
                  display: 'block',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.5')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            style={{
              position: 'absolute',
              top: 'clamp(20px, 4vh, 32px)',
              right: 'clamp(20px, 4vw, 32px)',
              width: '32px',
              height: '32px',
              zIndex: 10000,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setMenuOpen(false)}
          >
            <span style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: 'white', transform: 'rotate(45deg)' }} />
            <span style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: 'white', transform: 'rotate(-45deg)' }} />
          </button>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && viewportRect && (
        <div
          style={{
            position: 'fixed',
            top: viewportRect.top,
            left: viewportRect.left,
            width: viewportRect.width,
            height: viewportRect.height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            zIndex: 99999,
            pointerEvents: 'auto',
          }}
        >
          <div style={{ width: '100%', maxWidth: '600px', padding: '0 24px' }}>
            <input
              type="text"
              placeholder="Rechercher..."
              autoFocus
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                fontSize: 'clamp(24px, 5vw, 32px)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                padding: '16px 0',
                outline: 'none',
              }}
            />
          </div>
          <button
            style={{
              position: 'absolute',
              top: 'clamp(20px, 4vh, 32px)',
              right: 'clamp(20px, 4vw, 32px)',
              width: '32px',
              height: '32px',
              zIndex: 10000,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setSearchOpen(false)}
          >
            <span style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: 'white', transform: 'rotate(45deg)' }} />
            <span style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: 'white', transform: 'rotate(-45deg)' }} />
          </button>
        </div>
      )}
    </div>,
    document.body
  )
}

export const siteHeaderMeta = {
  type: 'site-header',
  label: 'Header',
  icon: '🧭',
  variants: ['startup', 'corporate', 'luxe', 'creative', 'ecommerce', 'glass', 'brixsa', 'zmr-agency'],
  defaultVariant: 'startup',
  defaultContent: {},
}
