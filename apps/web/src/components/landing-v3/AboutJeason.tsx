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
  const imageRef = useRef<HTMLDivElement>(null);
  const innerImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    // Reduced motion : skip animations, set final states
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (imageRef.current) gsap.set(imageRef.current, { clipPath: 'inset(0 0% 0 0)' });
      if (contentRef.current) {
        contentRef.current.querySelectorAll<HTMLElement>('.about-fade').forEach((el) => {
          el.style.opacity = '1';
        });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Image wipe reveal (left → right)
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
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
      if (!isMobile && innerImageRef.current) {
        gsap.fromTo(
          innerImageRef.current,
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
            stagger: 0.08,
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
      className="relative min-h-screen bg-black overflow-hidden"
    >
      <div className={`${isMobile ? 'flex flex-col' : 'grid grid-cols-2'} min-h-screen`}>
        {/* Left : photo, full half-width on desktop */}
        <div className={`relative overflow-hidden ${isMobile ? 'h-[45vh] min-h-[280px]' : 'h-auto'}`}>
          <div ref={imageRef} className="absolute inset-0">
            <div ref={innerImageRef} className="absolute inset-[-15%] will-change-transform">
              <Image
                src="/images/jeason-profil.jpg"
                alt="Jeason Lemoine, fondateur JL Studio"
                fill
                className="object-cover"
                sizes={isMobile ? '100vw' : '50vw'}
                priority={false}
              />
            </div>
            {/* Vignette + dark gradient (cohérent avec ContactParallax) */}
            <div className="absolute inset-0 bg-black/15" />
            <div
              className={`absolute inset-0 ${isMobile ? 'bg-gradient-to-b from-transparent to-black' : 'bg-gradient-to-r from-transparent via-transparent to-black/80'}`}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 80% 70% at 30% 50%, transparent 30%, rgba(0,0,0,0.4) 100%)',
              }}
            />
          </div>
        </div>

        {/* Right : content */}
        <div className={`flex items-center ${isMobile ? 'px-5 py-12' : 'px-12 lg:px-20 py-20'}`}>
          <div ref={contentRef} className="w-full max-w-xl mx-auto sm:mx-0">
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
            <p className="about-fade text-base sm:text-lg text-white/80 leading-relaxed mb-5 sm:mb-7 opacity-0">
              Quand vous m&apos;écrivez, c&apos;est moi qui vous lis. Et qui dessine, code, et livre votre projet. Pas de relais, pas d&apos;attente.
            </p>

            {/* Para 1 */}
            <p className="about-fade text-sm sm:text-base text-white/60 leading-relaxed mb-4 sm:mb-5 opacity-0">
              Je suis Jeason Lemoine. Depuis cinq ans, j&apos;accompagne des entrepreneurs et des PME pour qu&apos;ils aient un site qui leur ressemble — pensé dans la durée, soigné dans le détail, et conçu pour évoluer avec eux.
            </p>

            {/* Para 2 - autonomie */}
            <p className="about-fade text-sm sm:text-base text-white/60 leading-relaxed mb-8 sm:mb-10 opacity-0">
              <strong className="text-white font-semibold">Mon engagement : à la livraison, vous avez toutes les clés en main.</strong>{' '}
              Mettre à jour votre contenu, gérer vos contacts, faire évoluer votre site au fil du temps — sans avoir à me solliciter pour chaque détail. C&apos;est plus de liberté pour vous, et la promesse d&apos;une collaboration qui s&apos;inscrit dans la durée.
            </p>

            {/* Stats */}
            <div className="about-fade grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/[0.08] opacity-0">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-black text-[#638BFF] tracking-tight leading-none">
                    {s.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/55 uppercase tracking-[0.12em] mt-1.5 sm:mt-2">
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
