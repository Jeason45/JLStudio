import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { SiteHeaderContent, NavLink } from '@/types/sections'
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { elementProps } from '@/lib/elementHelpers'
import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { renderLogo } from '@/components/sections/_utils'

export function SiteHeaderSection({ config }: { config: SectionConfig }) {
  const content = (config.content ?? {}) as Partial<SiteHeaderContent>
  const variant = config.variant ?? 'startup'
  const { accentColor } = config.style
  const links: NavLink[] = content.links ?? []
  const logo = content.logo ?? 'Logo'
  const ctaLabel = content.ctaLabel
  const ctaHref = content.ctaHref ?? '#'
  const cartLabel = content.cartLabel

  // ─── VARIANT: corporate ───
  // Univers entreprise / finance : fond navy sombre, clean, CTA sobre avec bordure
  if (variant === 'corporate') {
    return (
      <header className="bg-slate-900 px-6 py-0 border-b border-slate-700/50" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-10">
            <div {...elementProps(config.id, 'logo', 'image')} className="font-semibold text-lg text-white tracking-wide">{renderLogo(logo, 'font-semibold text-lg text-white tracking-wide')}</div>
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

  // ─── VARIANT: luxe-transparent ───
  // Univers luxe transparent : overlay sur hero, logo gauche, nav droite, accents dorés
  if (variant === 'luxe-transparent') {
    const gold = accentColor ?? '#b8860b'
    return (
      <header className="absolute top-0 left-0 w-full px-6 py-5" style={{ zIndex: 50, fontFamily: 'var(--font-body, inherit)', backgroundColor: 'transparent' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div {...elementProps(config.id, 'logo', 'image')} className="text-lg font-medium tracking-[0.15em] uppercase" style={{ color: '#FFFFFF' }}>{renderLogo(logo, 'text-lg font-medium tracking-[0.15em] uppercase')}</div>
          <nav className="hidden md:flex items-center gap-8" style={{ backgroundColor: 'transparent' }}>
            {links.map((link, i) => (
              <a
                {...elementProps(config.id, `links.${i}.label`, 'link')}
                key={link.id}
                href={link.href}
                className="text-xs tracking-[0.12em] uppercase transition-colors"
                style={{ color: 'rgba(255,255,255,0.8)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-5">
            {cartLabel && (
              <span {...elementProps(config.id, 'cartLabel', 'text')} className="text-xs tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {cartLabel}
              </span>
            )}
            {ctaLabel && (
              <a
                {...elementProps(config.id, 'ctaLabel', 'button')}
                href={ctaHref}
                className="inline-flex px-5 py-2 text-xs tracking-[0.12em] uppercase font-medium border transition-colors"
                style={{ borderColor: gold, color: gold, backgroundColor: 'transparent' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = gold; (e.currentTarget as HTMLElement).style.color = '#1a1a1a' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = gold }}
              >
                {ctaLabel}
              </a>
            )}
          </div>
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
            <div {...elementProps(config.id, 'logo', 'image')} className="text-2xl font-light tracking-[0.25em] uppercase text-zinc-800">{renderLogo(logo, 'text-2xl font-light tracking-[0.25em] uppercase text-zinc-800')}</div>
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
          <div {...elementProps(config.id, 'logo', 'image')} className="font-bold text-xl text-zinc-900 tracking-tight">{renderLogo(logo, 'font-bold text-xl text-zinc-900 tracking-tight')}</div>
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
          <div {...elementProps(config.id, 'logo', 'image')} className="font-black text-2xl text-zinc-900 tracking-tight">{renderLogo(logo, 'font-black text-2xl text-zinc-900 tracking-tight')}</div>
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
            <div {...elementProps(config.id, 'logo', 'image')} className="font-bold text-xl text-zinc-900">{renderLogo(logo, 'font-bold text-xl text-zinc-900')}</div>
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
          <div {...elementProps(config.id, 'logo', 'image')} className="font-bold text-lg text-white tracking-tight">{renderLogo(logo, 'font-bold text-lg text-white tracking-tight')}</div>
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

  // ─── VARIANT: obscura ───
  // Photographer premium : minimal transparent header, text-only menu button, off-canvas centered nav
  if (variant === 'obscura') {
    return <ObscuraHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  // ─── VARIANT: canopy ───
  // Eco e-commerce header inspiré Allbirds : clean, minimal, sticky, announcement bar vert forêt
  if (variant === 'canopy') {
    return <CanopyHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  // ─── VARIANT: nacre ───
  // Nail salon premium : transparent glassmorphism header, off-canvas menu bordeaux profond
  if (variant === 'nacre') {
    return <NacreHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
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

// ─── Nacre Off-Canvas Menu ───

function NacreHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
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

  // Default nav links for nail salon
  const menuLinks: { label: string; href: string }[] = links.length > 0
    ? links.map(l => ({ label: l.label, href: l.href }))
    : [
        { label: 'Accueil', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Galerie', href: '/galerie' },
        { label: 'A Propos', href: '/a-propos' },
        { label: 'Tarifs', href: '/tarifs' },
        { label: 'Contact', href: '/contact' },
      ]

  const socials = [
    { label: 'Instagram', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
    )},
    { label: 'Facebook', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    )},
    { label: 'TikTok', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z"/></svg>
    )},
  ]

  return (
    <>
      {/* Nacre header responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .nacre-resp-menu-grid { grid-template-columns: 1fr !important; }
          .nacre-resp-menu-right { display: none !important; }
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
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
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
            className="tracking-wide"
            style={{
              maxWidth: '140px',
              fontSize: '20px',
              fontWeight: 600,
              color: '#F0E0DA',
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
            }}
          >
            {renderLogo(logo, 'font-semibold text-lg')}
          </div>

          {/* RIGHT — Menu button (glassmorphism) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            className={cn('flex items-center cursor-pointer')}
            style={{
              borderRadius: '999px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(197, 169, 110, 0.2)',
              color: '#F0E0DA',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '10px',
              paddingBottom: '10px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
              border: '1px solid rgba(197, 169, 110, 0.15)',
              gap: '10px',
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(197, 169, 110, 0.35)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(197, 169, 110, 0.2)' }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>{ctaLabel || 'Menu'}</span>
            {/* Hamburger icon */}
            <span
              {...elementProps(config.id, 'menuIcon', 'icon', 'Menu Icon')}
              className={cn('flex flex-col items-center')}
              style={{ gap: '3px' }}
            >
              <span style={{ width: '18px', height: '2px', display: 'block', backgroundColor: '#F0E0DA' }} />
              <span style={{ width: '18px', height: '2px', display: 'block', backgroundColor: '#F0E0DA' }} />
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
        {/* Bordeaux profond background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#2A1A1E',
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
          className="nacre-resp-menu-grid"
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
                  color: '#F0E0DA',
                  fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                }}
              >
                {renderLogo(logo)}
              </div>
              <div
                {...elementProps(config.id, 'closeButton', 'button', 'Close Button')}
                role="button"
                onClick={toggleMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '999px',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(197, 169, 110, 0.2)',
                  color: '#C9A96E',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: '1px solid rgba(197, 169, 110, 0.15)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(197, 169, 110, 0.35)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(197, 169, 110, 0.2)' }}
              >
                <span>Fermer</span>
                <X size={18} strokeWidth={2} />
              </div>
            </div>

            {/* Navigation links — staggered slide-in from left */}
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
                    fontSize: 'clamp(28px, 5vw, 48px)',
                    fontWeight: 500,
                    color: '#F0E0DA',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'color 0.3s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s',
                    display: 'block',
                    fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(-60px)',
                    opacity: menuOpen ? 1 : 0,
                    transitionDelay: `${i * 0.1}s`,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C9A96E' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#F0E0DA' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom — Social Icons + Phone */}
            <div
              {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '32px',
                borderTop: '1px solid rgba(240, 224, 218, 0.1)',
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
                      color: 'rgba(240, 224, 218, 0.5)',
                      transition: 'color 0.3s, border-color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(240, 224, 218, 0.15)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A96E'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201, 169, 110, 0.4)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(240, 224, 218, 0.5)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240, 224, 218, 0.15)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Phone number */}
              <a
                {...elementProps(config.id, 'offCanvasPhone', 'link', 'Phone')}
                href="tel:+33600000000"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(240, 224, 218, 0.5)',
                  fontSize: '14px',
                  fontWeight: 400,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A96E' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(240, 224, 218, 0.5)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                +33 6 00 00 00 00
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN — Decorative image with rose tint */}
          <div
            {...elementProps(config.id, 'offCanvasImage', 'image', 'Menu Image')}
            className="nacre-resp-menu-right"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#3D2630',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=80"
              alt="Nail art"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.7,
                transform: menuOpen ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            {/* Rose tint overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(42, 26, 30, 0.5) 0%, rgba(201, 169, 110, 0.15) 60%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Brixsa Off-Canvas Menu ───

// ─── Canopy Header ───
// Nature / éco-luxe : transparent overlay, glassmorphism menu button forest green, off-canvas full-screen

// ─── Obscura Header ───

function ObscuraHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
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

  const menuLinks: { label: string; href: string }[] = [
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'À propos', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Journal', href: '/journal' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      {/* Obscura responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 480px) {
          .obscura-resp-header { padding-left: 20px !important; padding-right: 20px !important; }
        }
      ` }} />
      {/* ─── NAVBAR ─── */}
      <header
        {...elementProps(config.id, 'wrapper', 'container', 'Header')}
        className="absolute top-0 left-0 w-full flex items-center obscura-resp-header"
        style={{
          zIndex: 888,
          backgroundColor: 'transparent',
          minHeight: '72px',
          paddingLeft: 'clamp(24px, 5vw, 60px)',
          paddingRight: 'clamp(24px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div
          {...elementProps(config.id, 'navGrid', 'container', 'Nav Grid')}
          className="flex items-center justify-between w-full"
        >
          {/* LEFT — Logo */}
          <div
            {...elementProps(config.id, 'logo', 'image')}
            style={{
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#E8E4DF',
              fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
            }}
          >
            {renderLogo(logo)}
          </div>

          {/* RIGHT — Menu text button (ultra minimal) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            style={{
              color: '#E8E4DF',
              fontSize: '13px',
              fontWeight: 400,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: '8px 0',
              transition: 'color 0.3s ease',
              fontFamily: "'Inter Variable', 'Inter', sans-serif",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#D4A853' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#E8E4DF' }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>{ctaLabel || 'Menu'}</span>
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
        {/* Dark background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#0A0A0A',
          }}
        />

        {/* Close button — top right */}
        <div
          {...elementProps(config.id, 'closeButton', 'button', 'Close Button')}
          role="button"
          onClick={toggleMenu}
          style={{
            position: 'absolute',
            top: 'clamp(24px, 4vw, 40px)',
            right: 'clamp(24px, 5vw, 60px)',
            color: '#E8E4DF',
            fontSize: '13px',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            zIndex: 10,
            fontFamily: "'Inter Variable', 'Inter', sans-serif",
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#D4A853' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#E8E4DF' }}
        >
          Fermer
        </div>

        {/* Menu content — centered vertically */}
        <div
          {...elementProps(config.id, 'offCanvasContent', 'container', 'Menu Content')}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
          }}
        >
          {/* Navigation links — stacked, centered */}
          <nav
            {...elementProps(config.id, 'offCanvasLinks', 'container', 'Menu Links')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {menuLinks.map((link, i) => (
              <a
                key={link.label}
                {...elementProps(config.id, `menuLinks.${i}`, 'link', link.label)}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: 'clamp(32px, 6vw, 56px)',
                  fontWeight: 400,
                  color: '#E8E4DF',
                  textDecoration: 'none',
                  padding: '8px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s, color 0.3s ease`,
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  const line = e.currentTarget.querySelector('.obscura-link-line') as HTMLElement
                  if (line) { line.style.width = '40px'; line.style.opacity = '1' }
                }}
                onMouseLeave={(e) => {
                  const line = e.currentTarget.querySelector('.obscura-link-line') as HTMLElement
                  if (line) { line.style.width = '0px'; line.style.opacity = '0' }
                }}
              >
                {/* Gold line that extends on hover */}
                <span
                  className="obscura-link-line"
                  style={{
                    display: 'inline-block',
                    width: '0px',
                    height: '2px',
                    backgroundColor: '#D4A853',
                    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
                    opacity: 0,
                    flexShrink: 0,
                  }}
                />
                {link.label}
              </a>
            ))}
          </nav>

          {/* Bottom center — contact info */}
          <div
            {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
            style={{
              position: 'absolute',
              bottom: 'clamp(32px, 5vw, 60px)',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              fontFamily: "'Inter Variable', 'Inter', sans-serif",
            }}
          >
            <span
              {...elementProps(config.id, 'contactEmail', 'text', 'Contact Email')}
              style={{
                fontSize: '13px',
                color: 'rgba(232, 228, 223, 0.4)',
                letterSpacing: '0.05em',
              }}
            >
              hello@studio.com
            </span>
            <span
              style={{
                width: '1px',
                height: '14px',
                backgroundColor: 'rgba(232, 228, 223, 0.15)',
              }}
            />
            <span
              {...elementProps(config.id, 'contactPhone', 'text', 'Contact Phone')}
              style={{
                fontSize: '13px',
                color: 'rgba(232, 228, 223, 0.4)',
                letterSpacing: '0.05em',
              }}
            >
              +33 6 00 00 00 00
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Canopy Header ───

function CanopyHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
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

  // Navigation links for the off-canvas menu
  const menuLinks: { label: string; href: string }[] = [
    ...links.map(l => ({ label: l.label, href: l.href })),
    ...(links.length === 0 ? [
      { label: 'Accueil', href: '/' },
      { label: 'Collection', href: '/collection' },
      { label: 'Notre histoire', href: '/about' },
      { label: 'Journal', href: '/blog' },
      { label: 'Boutique', href: '/shop' },
      { label: 'Contact', href: '/contact' },
    ] : []),
  ]

  const socials = [
    { label: 'Instagram', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
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
      {/* Canopy responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .canopy-resp-menu-grid { grid-template-columns: 1fr !important; }
          .canopy-resp-menu-right { display: none !important; }
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
              color: '#FAFAF8',
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
            }}
          >
            {renderLogo(logo)}<sup style={{ fontSize: '0.5em', verticalAlign: 'super' }}>&reg;</sup>
          </div>

          {/* RIGHT — Menu button (glassmorphism forest green) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            className={cn('flex items-center cursor-pointer')}
            style={{
              borderRadius: '4px',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(45, 80, 22, 0.25)',
              color: 'white',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '8px',
              paddingBottom: '8px',
              fontSize: '16px',
              fontWeight: 500,
              fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
              border: '1px solid rgba(255,255,255,0.15)',
              gap: '10px',
              whiteSpace: 'nowrap',
            }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>Menu</span>
            {/* Toggle icon */}
            <span
              {...elementProps(config.id, 'menuIcon', 'icon', 'Menu Icon')}
              className={cn('flex flex-col items-center')}
              style={{ gap: '3px' }}
            >
              <span style={{ width: '18px', height: '2px', display: 'block', backgroundColor: '#FAFAF8' }} />
              <span style={{ width: '18px', height: '2px', display: 'block', backgroundColor: '#FAFAF8' }} />
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
            backgroundColor: '#1A1A1A',
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
          className="canopy-resp-menu-grid"
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
                  color: '#FAFAF8',
                  fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                }}
              >
                {renderLogo(logo)}<sup style={{ fontSize: '0.5em', verticalAlign: 'super' }}>&reg;</sup>
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
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  backgroundColor: 'rgba(45, 80, 22, 0.25)',
                  color: '#FAFAF8',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  fontSize: '16px',
                  fontWeight: 500,
                  border: '1px solid rgba(255,255,255,0.15)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>Fermer</span>
                <X size={18} strokeWidth={2} />
              </div>
            </div>

            {/* Navigation links — staggered slide-in */}
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
                    fontSize: 'clamp(28px, 5vw, 48px)',
                    fontWeight: 500,
                    color: '#FAFAF8',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'color 0.3s, transform 0.3s',
                    display: 'block',
                    fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                    opacity: menuOpen ? 1 : 0,
                    transitionDelay: `${i * 0.1}s`,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#2D5016' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#FAFAF8' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom — Announcement text + Social Icons */}
            <div
              {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Announcement / CTA text */}
              {ctaLabel && (
                <p
                  {...elementProps(config.id, 'offCanvasAnnouncement', 'text', 'Announcement')}
                  style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    color: 'rgba(250,250,248,0.5)',
                    lineHeight: 1.6,
                    margin: 0,
                    maxWidth: '360px',
                  }}
                >
                  {ctaLabel}
                </p>
              )}

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
                      transition: 'color 0.3s, transform 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#FAFAF8'
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(45, 80, 22, 0.6)'
                      ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'
                      ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Decorative image with green tint overlay */}
          <div
            {...elementProps(config.id, 'offCanvasImage', 'image', 'Menu Image')}
            className="canopy-resp-menu-right"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#2a2a2a',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80"
              alt="Forest canopy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.7,
                transform: menuOpen ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            {/* Green tint overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(45, 80, 22, 0.35) 0%, rgba(26,26,26,0.3) 60%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

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
            {renderLogo(logo)}<sup>®</sup>
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
                {renderLogo(logo)}<sup>®</sup>
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
              {renderLogo(logo)}
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
  variants: ['startup', 'corporate', 'luxe-transparent', 'luxe', 'creative', 'ecommerce', 'glass', 'nacre', 'brixsa', 'obscura', 'zmr-agency'],
  defaultVariant: 'startup',
  defaultContent: {},
}
