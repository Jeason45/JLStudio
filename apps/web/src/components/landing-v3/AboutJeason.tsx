'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitTextReveal from './shared/SplitTextReveal';
import { useIsMobile } from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '+10', label: 'Projets livrés' },
  { value: '4 ans', label: "D'expérience" },
  { value: '100%', label: 'Code maison' },
];

export default function AboutJeason() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const innerPhotoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    // Reduced motion : skip animations, set final states
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (photoRef.current) gsap.set(photoRef.current, { clipPath: 'inset(0 0% 0 0)' });
      if (contentRef.current) {
        contentRef.current.querySelectorAll<HTMLElement>('.about-fade').forEach((el) => {
          el.style.opacity = '1';
        });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Photo wipe reveal (left → right)
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          },
        );
      }

      // Slow vertical parallax on photo (desktop only)
      if (!isMobile && innerPhotoRef.current) {
        gsap.fromTo(
          innerPhotoRef.current,
          { yPercent: 8 },
          {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      }

      // Content stagger reveal
      if (contentRef.current) {
        const items = contentRef.current.querySelectorAll('.about-fade');
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="a-propos"
      ref={sectionRef}
      aria-label="À propos de Jeason Lemoine"
      className="relative bg-black overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 w-[500px] h-[500px] pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(99,139,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Photo */}
          <div className="lg:col-span-5">
            <div
              ref={photoRef}
              className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/[0.05] bg-[#0a0a18] mx-auto max-w-md lg:max-w-none"
            >
              <div ref={innerPhotoRef} className="absolute inset-[-8%] will-change-transform">
                <Image
                  src="/images/jeason-profil.png"
                  alt="Jeason Lemoine, fondateur JL Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 480px"
                />
              </div>
              {/* Subtle bottom gradient for depth */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4) 100%)',
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="lg:col-span-7">
            {/* Eyebrow */}
            <p className="about-fade text-[#638BFF] text-xs tracking-[0.4em] uppercase mb-5 sm:mb-6 opacity-0">
              À propos
            </p>

            {/* Title */}
            <div className="about-fade opacity-0 mb-5 sm:mb-7">
              <SplitTextReveal
                tag="h2"
                type="words"
                className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[0.98] tracking-tight"
              >
                Un studio,
              </SplitTextReveal>
              <SplitTextReveal
                tag="h2"
                type="words"
                className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[0.98] tracking-tight mt-1"
              >
                <span className="text-[#638BFF]">une seule personne</span>.
              </SplitTextReveal>
            </div>

            {/* Lead */}
            <p className="about-fade text-base sm:text-lg text-white/75 leading-relaxed mb-5 sm:mb-7 opacity-0 max-w-xl">
              Quand vous m&apos;écrivez, c&apos;est moi qui vous lis. Et qui dessine, code, et livre votre projet. Pas de relais, pas d&apos;attente.
            </p>

            {/* Para 1 */}
            <p className="about-fade text-sm sm:text-base text-white/55 leading-relaxed mb-4 sm:mb-5 opacity-0 max-w-xl">
              Je suis Jeason Lemoine. Depuis cinq ans, j&apos;accompagne des entrepreneurs et des PME pour qu&apos;ils aient un site qui leur ressemble — pensé dans la durée, soigné dans le détail, et conçu pour évoluer avec eux.
            </p>

            {/* Para 2 - autonomie */}
            <p className="about-fade text-sm sm:text-base text-white/55 leading-relaxed mb-8 sm:mb-10 opacity-0 max-w-xl">
              <strong className="text-white font-semibold">Mon engagement : à la livraison, vous avez toutes les clés en main.</strong>{' '}
              Mettre à jour votre contenu, gérer vos contacts, faire évoluer votre site au fil du temps — sans avoir à me solliciter pour chaque détail. C&apos;est plus de liberté pour vous, et la promesse d&apos;une collaboration qui s&apos;inscrit dans la durée.
            </p>

            {/* Stats */}
            <div className="about-fade grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/[0.06] opacity-0 max-w-xl">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-black text-[#638BFF] tracking-tight leading-none">
                    {s.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-[0.12em] mt-1.5 sm:mt-2">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
