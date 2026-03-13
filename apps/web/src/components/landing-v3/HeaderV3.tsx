'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function HeaderV3() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      if (y > 200) {
        setHidden(y > lastScrollY.current && y - lastScrollY.current > 5);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // GSAP animation for menu open/close
  useEffect(() => {
    if (!menuRef.current || !linksRef.current) return;

    const menu = menuRef.current;
    const linkEls = linksRef.current.querySelectorAll('[data-menu-item]');
    const cta = ctaRef.current;

    if (tlRef.current) {
      tlRef.current.kill();
    }

    if (menuOpen) {
      const tl = gsap.timeline();
      tlRef.current = tl;

      // Menu backdrop slides in
      tl.fromTo(menu,
        { clipPath: 'circle(0% at calc(100% - 36px) 32px)' },
        { clipPath: 'circle(150% at calc(100% - 36px) 32px)', duration: 0.6, ease: 'power3.inOut' },
        0
      );

      // Links stagger in
      tl.fromTo(linkEls,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out' },
        0.25
      );

      // CTA fades in
      if (cta) {
        tl.fromTo(cta,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          0.55
        );
      }
    } else {
      gsap.to(menu, {
        clipPath: 'circle(0% at calc(100% - 36px) 32px)',
        duration: 0.4,
        ease: 'power2.inOut',
      });
    }
  }, [menuOpen]);

  // Focus trap: keep keyboard focus inside menu when open
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const focusable = menu.querySelectorAll<HTMLElement>('a, button');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); return; }
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Méthode', href: '#methode' },
    { label: 'Projets', href: '#projets' },
    { label: 'Témoignages', href: '#temoignages' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          menuOpen ? 'z-[60]' : 'z-50'
        } ${
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled && !menuOpen
            ? 'bg-black/60 backdrop-blur-xl border-b border-white/[0.05]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <a href="#" className="relative z-[61] flex items-center group">
              <Image
                src="/images/logo-jlstudio.png"
                alt="JL Studio"
                width={90}
                height={18}
                className="h-5 sm:h-6 w-auto"
                priority
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-[family-name:var(--font-outfit)] text-sm text-white/50 hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#638BFF] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="text-sm font-medium text-[#638BFF] border border-[#638BFF]/30 px-5 py-2 rounded-full hover:bg-[#638BFF]/10 transition-all duration-300"
              >
                Parlons projet
              </a>
            </nav>

            {/* Mobile Burger — animates to X */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative flex h-10 w-10 items-center justify-center md:hidden z-[61]"
              aria-label={menuOpen ? 'Fermer' : 'Menu'}
            >
              <span
                className="absolute block h-[1.5px] w-6 bg-white transition-all duration-300 ease-in-out"
                style={{
                  transform: menuOpen
                    ? 'translateY(0) rotate(45deg)'
                    : 'translateY(-4px) rotate(0)',
                }}
              />
              <span
                className="absolute block h-[1.5px] w-6 bg-white transition-all duration-300 ease-in-out"
                style={{
                  transform: menuOpen
                    ? 'translateY(0) rotate(-45deg)'
                    : 'translateY(4px) rotate(0)',
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu — always in DOM, animated with clipPath */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[59] bg-black/95 backdrop-blur-2xl md:hidden"
        style={{ clipPath: 'circle(0% at calc(100% - 36px) 32px)', height: '100dvh' }}
        aria-hidden={!menuOpen}
        {...(!menuOpen && { inert: true as unknown as boolean })}
      >
        {/* Subtle background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 70% 30%, rgba(99,139,255,0.06) 0%, transparent 70%)',
          }}
        />

        <div
          ref={linksRef}
          className="relative flex flex-col justify-center h-full px-10"
        >
          {/* Navigation links */}
          <nav className="flex flex-col gap-1">
            {links.map((link, i) => (
              <div key={link.href} data-menu-item>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="group flex items-center justify-between py-4 border-b border-white/[0.06]"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs text-[#638BFF]/40 font-mono tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-white/80 group-hover:text-white transition-colors duration-300">
                      {link.label}
                    </span>
                  </div>
                  <svg
                    className="w-5 h-5 text-white/20 group-hover:text-[#638BFF] group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </a>
              </div>
            ))}
          </nav>

          {/* CTA */}
          <a
            ref={ctaRef}
            href="#contact"
            onClick={closeMenu}
            className="mt-10 self-start text-sm font-medium text-white bg-[#638BFF] px-8 py-3.5 rounded-full hover:shadow-[0_0_30px_rgba(99,139,255,0.3)] transition-all duration-300"
            style={{ opacity: 0 }}
          >
            Parlons projet
          </a>

          {/* Footer info */}
          <div className="absolute bottom-8 left-10 right-10 flex items-center justify-between">
            <span className="text-xs text-white/50">
              jlstudio.dev
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/jlstudio33"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/70 transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/jl-studio-64b287396"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/70 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
            <span className="text-xs text-white/50">
              Bordeaux, France
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
