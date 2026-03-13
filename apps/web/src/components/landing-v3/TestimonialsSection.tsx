'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import SplitTextReveal from './shared/SplitTextReveal';
import { useIsMobile } from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger, SplitText);

const testimonials = [
  {
    name: 'Run As One',
    role: 'Run As One — Communauté running',
    quote:
      "Un site qui capture parfaitement l'énergie de notre communauté. Le design épuré, les performances rapides et l'expérience mobile irréprochable nous ont permis de fédérer nos coureurs autour d'une plateforme à notre image.",
    initials: 'RO',
  },
  {
    name: 'Propdesk',
    role: 'Propdesk — Prop trading',
    quote:
      "JL Studio a su traduire notre exigence de précision en un site professionnel et performant. L'interface claire et le parcours utilisateur fluide inspirent confiance dès le premier clic.",
    initials: 'PD',
  },
  {
    name: 'Al-Ilm',
    role: 'Al-Ilm — Plateforme éducative',
    quote:
      "Une plateforme à la hauteur du sujet : navigation fluide entre les sourates, accès aux hadiths authentiques et contenu éducatif riche. Un outil qui rend l'apprentissage accessible et agréable.",
    initials: 'AI',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;

    // Skip all animations if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      section.querySelectorAll<HTMLElement>('[style]').forEach((el) => {
        if (el.style.opacity === '0') el.style.opacity = '1';
      });
      return;
    }

    const ctx = gsap.context(() => {
      // ── Background parallax ──
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: isMobile ? -8 : -15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      const cards = section.querySelectorAll<HTMLElement>('[data-card]');
      const quotes = section.querySelectorAll<HTMLElement>('[data-quote]');
      const authors = section.querySelectorAll<HTMLElement>('[data-author]');

      cards.forEach((card, i) => {
        // Initial state
        gsap.set(card, { opacity: 0, y: 60 });

        // Card enters
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        // ── Parallax: alternating speeds → creates depth within the grid ──
        gsap.to(card, {
          yPercent: isMobile
            ? (i % 2 === 0 ? -8 : -18)
            : (i % 2 === 0 ? -15 : -35),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Quote text reveals
      quotes.forEach((quote) => {
        gsap.set(quote, { opacity: 0, y: 20 });
        gsap.to(quote, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quote,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Author reveals
      authors.forEach((author) => {
        gsap.set(author, { opacity: 0, x: -15 });
        gsap.to(author, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: author,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="temoignages"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-32 overflow-hidden bg-black"
    >
      {/* Background image with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-[-15%] will-change-transform">
          <Image
            src="/images/testimonials-bg.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-20 md:mb-28">
          <p className="text-[#638BFF]/70 text-xs tracking-[0.4em] uppercase mb-4">
            Témoignages
          </p>
          <SplitTextReveal
            tag="h2"
            type="words"
            className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight"
          >
            Ils nous font confiance
          </SplitTextReveal>
        </div>

        {/* Grid — 2 columns desktop, 1 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 lg:gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-card
              className="group relative bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 lg:p-10 hover:border-white/[0.12] transition-colors duration-500"
              style={{ opacity: 0 }}
            >
              {/* Quote mark — large, decorative */}
              <span className="font-[family-name:var(--font-outfit)] text-4xl sm:text-6xl font-black text-[#638BFF]/15 leading-none absolute top-4 sm:top-6 right-6 sm:right-8 select-none" aria-hidden="true">
                &ldquo;
              </span>

              {/* Quote text */}
              <blockquote
                data-quote
                className="m-0 p-0 text-white/55 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 relative"
              >
                <p>{t.quote}</p>
              </blockquote>

              {/* Author */}
              <div data-author className="flex items-center gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-[#638BFF]/[0.08] border border-[#638BFF]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[#638BFF]">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <cite className="text-sm font-semibold text-white not-italic block">{t.name}</cite>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
