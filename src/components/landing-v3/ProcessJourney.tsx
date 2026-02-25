'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useIsMobile } from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger, SplitText);

const steps = [
  {
    number: '01',
    title: 'Découverte',
    description:
      'Échange approfondi pour comprendre vos objectifs, votre marché et vos utilisateurs cibles.',
    detail: 'Brief complet, analyse concurrentielle, définition des KPI',
  },
  {
    number: '02',
    title: 'Conception',
    description:
      'Wireframes, maquettes et prototype interactif validés avec vous avant le développement.',
    detail: 'UX research, prototypage Figma, itérations de design',
  },
  {
    number: '03',
    title: 'Développement',
    description:
      "Code propre, performant et testé. Points réguliers pour suivre l'avancement en temps réel.",
    detail: 'React / Next.js, CI/CD, revues de code hebdomadaires',
  },
  {
    number: '04',
    title: 'Tests & QA',
    description:
      'Tests cross-browser, responsive, accessibilité et performance pour un produit sans compromis.',
    detail: 'Tests automatisés, audit Lighthouse, compatibilité mobile',
  },
  {
    number: '05',
    title: 'Lancement',
    description:
      'Déploiement, formation et suivi post-lancement. Votre projet entre en production en toute sérénité.',
    detail: 'Mise en ligne, monitoring, support 30 jours inclus',
  },
];

export default function ProcessJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const line = lineRef.current;
    const lineProgress = lineProgressRef.current;
    const bg = bgRef.current;
    const stepEls = section.querySelectorAll<HTMLElement>('[data-step]');
    const numberEls = section.querySelectorAll<HTMLElement>('[data-number]');
    const titleEls = section.querySelectorAll<HTMLElement>('[data-title]');
    const descEls = section.querySelectorAll<HTMLElement>('[data-desc]');
    const detailEls = section.querySelectorAll<HTMLElement>('[data-detail]');
    const nodeEls = section.querySelectorAll<HTMLElement>('[data-node]');
    const nodeInners = section.querySelectorAll<HTMLElement>('[data-node-inner]');

    if (stepEls.length === 0) return;

    const ctx = gsap.context(() => {
      // SplitText for each title
      const splitTitles = Array.from(titleEls).map((el) =>
        SplitText.create(el, { type: 'chars' })
      );

      // ── Background parallax — moves slower than scroll ──
      if (bg) {
        gsap.to(bg, {
          yPercent: isMobile ? -10 : -20,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // ── Progress line grows as you scroll through the section ──
      if (lineProgress) {
        gsap.set(lineProgress, { scaleY: 0, transformOrigin: 'top' });
        gsap.to(lineProgress, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: line,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: true,
          },
        });
      }

      // ── Per-step animations ──
      stepEls.forEach((stepEl, i) => {
        const number = numberEls[i];
        const title = titleEls[i];
        const desc = descEls[i];
        const detail = detailEls[i];
        const node = nodeEls[i];
        const nodeInner = nodeInners[i];
        const split = splitTitles[i];
        const isLeft = i % 2 === 0;

        // Initial states
        gsap.set(split.chars, { opacity: 0, y: isMobile ? 30 : 50, rotateX: isMobile ? -30 : -60 });
        gsap.set(desc, { opacity: 0, y: 30 });
        gsap.set(detail, { opacity: 0, y: 20 });
        gsap.set(number, { opacity: 0, y: 20 });
        gsap.set(node, { scale: 0, opacity: 0 });

        // ── Parallax: number moves slower (depth effect) ──
        gsap.to(number, {
          yPercent: isMobile ? -10 : -25,
          ease: 'none',
          scrollTrigger: {
            trigger: stepEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // ── Parallax: title moves at medium speed ──
        gsap.to(title, {
          yPercent: isMobile ? -8 : -15,
          ease: 'none',
          scrollTrigger: {
            trigger: stepEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // ── Parallax: description/detail at slight speed ──
        gsap.to(desc, {
          yPercent: isMobile ? -3 : -5,
          ease: 'none',
          scrollTrigger: {
            trigger: stepEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // ── Node on the line: scale up + glow ──
        gsap.to(node, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: stepEl,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });

        // Node glow pulse when active
        gsap.to(nodeInner, {
          boxShadow: '0 0 20px rgba(99,139,255,0.6), 0 0 40px rgba(99,139,255,0.2)',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepEl,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });

        // ── Number fades in ──
        gsap.to(number, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepEl,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });

        // ── Title chars cascade ──
        gsap.to(split.chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: isMobile ? 0.03 : (isLeft ? 0.04 : -0.04),
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepEl,
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        });

        // ── Description slides in ──
        gsap.to(desc, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepEl,
            start: 'top 62%',
            toggleActions: 'play none none reverse',
          },
        });

        // ── Detail slides in ──
        gsap.to(detail, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepEl,
            start: 'top 58%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="methode"
      className="relative bg-black overflow-hidden"
    >
      {/* Background image — parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-[-20%] will-change-transform">
          <Image
            src="/images/process-bg-v2.jpg"
            alt=""
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 15%, rgba(0,0,0,0.2) 85%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* Section header */}
      <div className="relative z-10 pt-20 pb-12 md:pt-32 md:pb-24 text-center">
        <p className="text-[#638BFF]/70 text-xs tracking-[0.4em] uppercase mb-4">Méthode</p>
        <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-black text-white">
          Notre processus
        </h2>
      </div>

      {/* Timeline container */}
      <div className="relative z-10 pb-20 md:pb-32">
        {/* Vertical line — left on mobile, center on desktop */}
        <div
          ref={lineRef}
          className="absolute top-0 bottom-0 w-[1px]"
          style={{
            left: isMobile ? '24px' : '50%',
            transform: isMobile ? 'none' : 'translateX(-50%)',
          }}
        >
          {/* Background line */}
          <div className="w-full h-full bg-white/[0.06]" />
          {/* Animated progress line */}
          <div
            ref={lineProgressRef}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#638BFF]/60 via-[#638BFF]/40 to-[#638BFF]/60"
          />
        </div>

        {/* Steps */}
        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;

          return (
            <div
              key={i}
              data-step
              className="relative py-16 md:py-24 lg:py-28 xl:py-32"
            >
              {/* Node on the line */}
              <div
                data-node
                className="absolute top-1/2 z-20"
                style={{
                  left: isMobile ? '24px' : '50%',
                  opacity: 0,
                  transform: 'translate(-50%, -50%) scale(0)',
                }}
              >
                <div
                  data-node-inner
                  className="w-4 h-4 rounded-full bg-[#638BFF] border-2 border-[#638BFF]"
                  style={{ boxShadow: '0 0 0 rgba(99,139,255,0)' }}
                />
              </div>

              {/* Content */}
              {isMobile ? (
                /* Mobile: single column, content to the right of the timeline */
                <div
                  className="relative pl-14 pr-6"
                  style={{ perspective: 600 }}
                >
                  {/* Step number */}
                  <span
                    data-number
                    className="font-[family-name:var(--font-outfit)] text-5xl font-black text-[#638BFF]/20 block mb-2 leading-none will-change-transform"
                    style={{ opacity: 0 }}
                  >
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3
                    data-title
                    className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-black text-white mb-4 leading-[0.95] tracking-tight relative will-change-transform"
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    data-desc
                    className="text-white/60 text-sm sm:text-base leading-relaxed mb-3 relative will-change-transform"
                  >
                    {step.description}
                  </p>

                  {/* Detail */}
                  <p
                    data-detail
                    className="text-[#638BFF]/55 text-xs sm:text-sm tracking-wide relative"
                  >
                    {step.detail}
                  </p>
                </div>
              ) : (
                /* Desktop: 2-column grid, alternating left/right */
                <div
                  className="relative max-w-7xl mx-auto px-8 grid grid-cols-2 gap-16 items-center"
                >
                  {/* Text side */}
                  <div
                    className={`relative ${isLeft ? 'text-right pr-16' : 'text-left pl-16 order-2'}`}
                    style={{ perspective: 600 }}
                  >
                    {/* Step number */}
                    <span
                      data-number
                      className="font-[family-name:var(--font-outfit)] text-5xl lg:text-6xl font-black text-[#638BFF]/20 block mb-3 leading-none will-change-transform"
                      style={{ opacity: 0 }}
                    >
                      {step.number}
                    </span>

                    {/* Title */}
                    <h3
                      data-title
                      className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl lg:text-4xl font-black text-white mb-5 leading-[0.95] tracking-tight relative will-change-transform lg:whitespace-nowrap"
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p
                      data-desc
                      className="text-white/60 text-base lg:text-lg leading-relaxed mb-4 relative will-change-transform"
                    >
                      {step.description}
                    </p>

                    {/* Detail */}
                    <p
                      data-detail
                      className="text-[#638BFF]/55 text-sm tracking-wide relative"
                    >
                      {step.detail}
                    </p>
                  </div>

                  {/* Empty side (opposite of text, for balance) */}
                  <div className={isLeft ? '' : 'order-1'} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
