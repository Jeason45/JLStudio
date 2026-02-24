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
    name: 'Marie Dubois',
    role: 'Maison Elegance',
    quote:
      'JL Studio a transforme notre vision en realite. Le site est a la fois elegant et performant, avec une attention aux details qui nous a impressionnes.',
    initials: 'MD',
  },
  {
    name: 'Thomas Mercier',
    role: 'TechVision SaaS',
    quote:
      "Notre taux de conversion a augmente de 40% depuis le lancement du nouveau site. L'expertise technique et le sens du design font vraiment la difference.",
    initials: 'TM',
  },
  {
    name: 'Sophie Laurent',
    role: 'Agence Creativa',
    quote:
      "La qualite du code et l'attention aux details sont remarquables. Un partenaire technique de confiance pour nos projets les plus ambitieux.",
    initials: 'SL',
  },
  {
    name: 'Alexandre Chen',
    role: 'Digital Commerce Pro',
    quote:
      'Livraison dans les delais, communication fluide et resultat au-dela de nos attentes. Notre e-commerce tourne comme une horloge.',
    initials: 'AC',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;

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
      {/* Background image — parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-[-15%] will-change-transform">
          <Image
            src="/images/testimonials-bg.jpg"
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Subtle radial light */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(99,139,255,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-20 md:mb-28">
          <p className="text-[#638BFF]/70 text-xs tracking-[0.4em] uppercase mb-4">
            Temoignages
          </p>
          <SplitTextReveal
            tag="h2"
            type="words"
            className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight"
          >
            Pourquoi Nous
          </SplitTextReveal>
        </div>

        {/* Grid — 2 columns desktop, 1 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 lg:gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-card
              className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8 lg:p-10 hover:border-white/[0.1] transition-colors duration-500"
              style={{ opacity: 0 }}
            >
              {/* Quote mark — large, decorative */}
              <span className="font-[family-name:var(--font-outfit)] text-4xl sm:text-6xl font-black text-[#638BFF]/15 leading-none absolute top-4 sm:top-6 right-6 sm:right-8 select-none">
                &ldquo;
              </span>

              {/* Quote text */}
              <p
                data-quote
                className="text-white/55 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 relative"
              >
                {t.quote}
              </p>

              {/* Author */}
              <div data-author className="flex items-center gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-[#638BFF]/[0.08] border border-[#638BFF]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[#638BFF]">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
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
