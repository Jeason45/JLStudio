'use client';

import { useState, useEffect, useRef } from 'react';

export default function HeaderV3() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      // Hide on scroll down, show on scroll up (only after 200px)
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

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Methode', href: '#methode' },
    { label: 'Projets', href: '#projets' },
    { label: 'Temoignages', href: '#temoignages' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled
            ? 'bg-black/60 backdrop-blur-xl border-b border-white/[0.05]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <span className="font-[family-name:var(--font-outfit)] text-lg font-bold text-white tracking-tight">
                JL
              </span>
              <span className="text-white/20 font-light">|</span>
              <span className="text-sm text-white/50 tracking-wider">Studio</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#638BFF] hover:after:w-full after:transition-all after:duration-300"
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

            {/* Mobile Burger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center md:hidden"
              aria-label="Menu"
            >
              <div className="flex flex-col gap-1.5">
                <span className="block h-[1.5px] w-6 bg-white" />
                <span className="block h-[1.5px] w-6 bg-white" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black md:hidden"
          style={{ height: '100dvh' }}
        >
          <div className="absolute top-0 right-0 p-5 z-10">
            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center"
              aria-label="Fermer"
            >
              <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center justify-center h-full gap-8">
            <span className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white mb-6">
              JL <span className="text-white/30 font-light">|</span> Studio
            </span>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-[family-name:var(--font-outfit)] text-2xl font-semibold text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 text-sm font-medium text-[#638BFF] border border-[#638BFF]/30 px-8 py-3 rounded-full"
            >
              Parlons projet
            </a>
          </div>
        </div>
      )}
    </>
  );
}
