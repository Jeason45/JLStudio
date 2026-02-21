'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import SplitTextReveal from './shared/SplitTextReveal';
import ScrollReveal from './shared/ScrollReveal';
import { useIsMobile } from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger, SplitText);

const steps = [
  {
    number: '01',
    title: 'Decouverte',
    description:
      'Echange approfondi pour comprendre vos objectifs, votre marche et vos utilisateurs cibles.',
    detail: 'Brief complet, analyse concurrentielle, definition des KPI',
  },
  {
    number: '02',
    title: 'Conception',
    description:
      'Wireframes, maquettes et prototype interactif valides avec vous avant le developpement.',
    detail: 'UX research, prototypage Figma, iterations de design',
  },
  {
    number: '03',
    title: 'Developpement',
    description:
      "Code propre, performant et teste. Points reguliers pour suivre l'avancement en temps reel.",
    detail: 'React / Next.js, CI/CD, revues de code hebdomadaires',
  },
  {
    number: '04',
    title: 'Tests & QA',
    description:
      'Tests cross-browser, responsive, accessibilite et performance pour un produit sans compromis.',
    detail: 'Tests automatises, audit Lighthouse, compatibilite mobile',
  },
  {
    number: '05',
    title: 'Lancement',
    description:
      'Deploiement, formation et suivi post-lancement. Votre projet entre en production en toute serenite.',
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
    if (isMobile || !sectionRef.current) return;

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
          yPercent: -20,
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
        gsap.set(split.chars, { opacity: 0, y: 50, rotateX: -60 });
        gsap.set(desc, { opacity: 0, y: 30 });
        gsap.set(detail, { opacity: 0, y: 20 });
        gsap.set(number, { opacity: 0, y: 20 });
        gsap.set(node, { scale: 0, opacity: 0 });

        // ── Parallax: number moves slower (depth effect) ──
        gsap.to(number, {
          yPercent: -25,
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
          yPercent: -15,
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
          yPercent: -5,
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
          stagger: isLeft ? 0.04 : -0.04,
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
    <>
      {/* ── Desktop: vertical timeline with parallax ── */}
      <section
        ref={sectionRef}
        id="methode"
        className={`relative bg-black overflow-hidden ${isMobile ? 'hidden' : 'block'}`}
      >
        {/* Background image — parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <div ref={bgRef} className="absolute inset-[-20%] will-change-transform">
            <Image
              src="/images/process-bg.jpg"
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
        <div className="relative z-10 pt-32 pb-16 text-center">
          <p className="text-[#638BFF]/70 text-xs tracking-[0.4em] uppercase mb-4">Methode</p>
          <h2 className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl font-black text-white">
            Notre processus
          </h2>
        </div>

        {/* Timeline container */}
        <div className="relative z-10 pb-32">
          {/* Central vertical line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2"
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
                className="relative py-24 md:py-32 lg:py-40"
              >
                {/* Node on the center line */}
                <div
                  data-node
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ opacity: 0, transform: 'translate(-50%, -50%) scale(0)' }}
                >
                  <div
                    data-node-inner
                    className="w-4 h-4 rounded-full bg-[#638BFF] border-2 border-[#638BFF]"
                    style={{ boxShadow: '0 0 0 rgba(99,139,255,0)' }}
                  />
                </div>

                {/* Content — alternates left/right */}
                <div
                  className={`relative max-w-7xl mx-auto px-8 grid grid-cols-2 gap-16 items-center ${
                    isLeft ? '' : 'direction-rtl'
                  }`}
                  style={{ direction: isLeft ? 'ltr' : 'rtl' }}
                >
                  {/* Text side */}
                  <div
                    className={`relative ${isLeft ? 'text-right pr-16' : 'text-left pl-16'}`}
                    style={{ direction: 'ltr', perspective: 600 }}
                  >
                    {/* Step number — visible, styled */}
                    <span
                      data-number
                      className="font-[family-name:var(--font-outfit)] text-6xl lg:text-7xl font-black text-[#638BFF]/20 block mb-3 leading-none will-change-transform"
                      style={{ opacity: 0 }}
                    >
                      {step.number}
                    </span>

                    {/* Title */}
                    <h3
                      data-title
                      className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl lg:text-7xl font-black text-white mb-5 leading-[0.95] tracking-tight relative will-change-transform lg:whitespace-nowrap"
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
                  <div />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Mobile: vertical timeline ── */}
      <section
        id={isMobile ? 'methode' : undefined}
        className={`py-20 bg-black relative overflow-hidden ${isMobile ? 'block' : 'hidden'}`}
      >
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/process-bg.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>

        <div className="relative z-10 px-6">
          <div className="text-center mb-16">
            <p className="text-[#638BFF]/80 text-xs font-semibold tracking-[0.4em] uppercase mb-4">Methode</p>
            <SplitTextReveal
              tag="h2"
              type="words"
              className="font-[family-name:var(--font-outfit)] text-3xl font-black text-white leading-tight"
            >
              Notre processus
            </SplitTextReveal>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-white/[0.06]" />
            <div className="space-y-12">
              {steps.map((step, i) => (
                <ScrollReveal key={i} delay={i * 0.05} direction={i % 2 === 0 ? 'right' : 'left'}>
                  <div className="flex gap-6 pl-2">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#638BFF]/10 border border-[#638BFF]/30 flex items-center justify-center">
                        <span className="font-[family-name:var(--font-outfit)] text-xs font-bold text-[#638BFF]">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-white/55 text-sm leading-relaxed mb-1">{step.description}</p>
                      <p className="text-white/40 text-xs">{step.detail}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
