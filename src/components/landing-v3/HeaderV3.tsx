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
            <span className="text-xs text-white/25">
              jlstudio.dev
            </span>
            <span className="text-xs text-white/25">
              Bordeaux, France
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
