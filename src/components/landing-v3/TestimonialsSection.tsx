'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import SplitTextReveal from './shared/SplitTextReveal';
import { useIsMobile } from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger, SplitText);

const testimonials = [
  {
    name: 'Famille Caubet',
    role: 'Flamme by Caubet',
    quote:
      'Jeason a compris notre univers dès le premier échange. Le site reflète parfaitement notre passion du feu et de la convivialité, avec un système de gestion qui nous simplifie le quotidien.',
    initials: 'FC',
  },
  {
    name: 'Florent',
    role: 'Florent Food — 500K+ abonnés',
    quote:
      "Une plateforme à la hauteur de mon image de marque. Le design premium et le système de newsletter intégré m'ont permis de professionnaliser mon activité de créateur de contenu.",
    initials: 'F',
  },
  {
    name: 'Équipe JALP',
    role: 'Jouons Avec Les Paroles',
    quote:
      "Un projet ambitieux mené de bout en bout : application mobile, API backend et interface web. Jeason a su transformer une idée complexe en produit abouti et fonctionnel.",
    initials: 'JP',
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
      {/* Animated floating orbs background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blue orbs */}
        <div className="absolute rounded-full" style={{
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(99,139,255,0.12) 0%, transparent 70%)',
          top: '10%', left: '-5%',
          filter: 'blur(60px)',
          animation: 'float-orb-1 20s ease-in-out infinite',
        }} />
        <div className="absolute rounded-full" style={{
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(99,139,255,0.08) 0%, transparent 70%)',
          top: '60%', right: '-8%',
          filter: 'blur(50px)',
          animation: 'float-orb-2 25s ease-in-out infinite',
        }} />
        {/* Gold champagne orbs */}
        <div className="absolute rounded-full" style={{
          width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)',
          top: '50%', left: '30%',
          filter: 'blur(55px)',
          animation: 'float-orb-3 22s ease-in-out infinite',
        }} />
        <div className="absolute rounded-full" style={{
          width: '250px', height: '250px',
          background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)',
          top: '5%', right: '20%',
          filter: 'blur(45px)',
          animation: 'float-orb-4 18s ease-in-out infinite',
        }} />
        {/* Small accent orbs */}
        <div className="absolute rounded-full" style={{
          width: '150px', height: '150px',
          background: 'radial-gradient(circle, rgba(99,139,255,0.1) 0%, transparent 70%)',
          bottom: '15%', left: '60%',
          filter: 'blur(35px)',
          animation: 'float-orb-5 15s ease-in-out infinite',
        }} />
        {/* Noise texture overlay for depth */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
          mixBlendMode: 'overlay',
        }} />
      </div>
      <style jsx>{`
        @keyframes float-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(80px, 40px) scale(1.1); }
          66% { transform: translate(-30px, 80px) scale(0.95); }
        }
        @keyframes float-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-60px, -50px) scale(1.05); }
          66% { transform: translate(40px, -30px) scale(0.9); }
        }
        @keyframes float-orb-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -60px) scale(1.08); }
          66% { transform: translate(-70px, 30px) scale(0.92); }
        }
        @keyframes float-orb-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 50px) scale(1.12); }
          66% { transform: translate(60px, -20px) scale(0.88); }
        }
        @keyframes float-orb-5 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-50px, -40px); }
        }
      `}</style>

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
              className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8 lg:p-10 hover:border-white/[0.1] transition-colors duration-500"
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
