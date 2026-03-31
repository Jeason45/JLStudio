'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useIsMobile } from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function HeroParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    // Skip all animations if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(maskRef.current, { opacity: 0 });
      gsap.set(overlayRef.current, { opacity: 1 });
      gsap.set(contentRef.current, { opacity: 1 });
      gsap.set(scrollHintRef.current, { opacity: 0 });
      gsap.set(bgRef.current, { filter: 'brightness(1)' });
      const splitH1 = SplitText.create(h1Ref.current!, { type: 'chars' });
      const splitH2 = SplitText.create(h2Ref.current!, { type: 'chars' });
      gsap.set(splitH1.chars, { opacity: 1, y: 0, rotateX: 0 });
      gsap.set(splitH2.chars, { opacity: 1, y: 0, rotateX: 0 });
      gsap.set(paraRef.current, { opacity: 1, y: 0 });
      gsap.set(ctaRef.current, { opacity: 1, y: 0 });
      return;
    }

    // Force initial states BEFORE timeline creation
    gsap.set(textRef.current, { scale: 1, transformOrigin: '50% 75%' });
    gsap.set(maskRef.current, { opacity: 1 });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(contentRef.current, { opacity: 0 });
    gsap.set(scrollHintRef.current, { opacity: 1 });
    gsap.set(bgRef.current, { scale: 1, filter: 'brightness(1.4)' });

    // Force top state — runs AFTER all GSAP rendering each frame
    const forceTopState = () => {
      if (window.scrollY < 15) {
        if (textRef.current) textRef.current.style.transform = 'scale(1)';
        if (textRef.current) textRef.current.style.transformOrigin = '50% 75%';
        if (maskRef.current) maskRef.current.style.opacity = '1';
        if (overlayRef.current) overlayRef.current.style.opacity = '0';
        if (contentRef.current) contentRef.current.style.opacity = '0';
      }
    };
    gsap.ticker.add(forceTopState);

    const ctx = gsap.context(() => {
      // SplitText — cinematic char-by-char reveals
      const splitH1 = SplitText.create(h1Ref.current!, { type: 'chars' });
      const splitH2 = SplitText.create(h2Ref.current!, { type: 'chars' });

      // Initial states for split elements
      gsap.set(splitH1.chars, { opacity: 0, y: 80, rotateX: -90 });
      gsap.set(splitH2.chars, { opacity: 0, y: 80, rotateX: -90 });
      gsap.set(paraRef.current, { opacity: 0, y: 30 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline();

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        animation: tl,
      });

      if (isMobile) {
        // ── Mobile (300vh) ──────────────────────────────
        // Scroll hint fades quickly
        tl.fromTo(scrollHintRef.current,
          { opacity: 1 },
          { opacity: 0, duration: 4 },
          0
        );

        // Background brightness dims as mask reveals
        tl.fromTo(bgRef.current,
          { filter: 'brightness(1.4)' },
          { filter: 'brightness(1)', ease: 'power2.inOut', duration: 40 },
          0
        );

        // JL STUDIO text zooms in and flies past
        tl.fromTo(textRef.current,
          { scale: 1, transformOrigin: '50% 75%' },
          { scale: 35, ease: 'power4.in', duration: 38 },
          0
        );

        // Black mask fades away
        tl.fromTo(maskRef.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power4.in', duration: 40 },
          0
        );

        // Dark overlay fades in for text readability
        tl.fromTo(overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 10, ease: 'power2.inOut', immediateRender: false },
          32
        );

        // Content wrapper snaps visible (like desktop)
        tl.fromTo(contentRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 2, immediateRender: false },
          40
        );

        // "Votre Vision" — chars cascade
        tl.fromTo(splitH1.chars,
          { opacity: 0, y: 40, rotateX: -60 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.4, duration: 5, ease: 'power3.out', immediateRender: false },
          41
        );

        // "Notre Expertise" — chars cascade
        tl.fromTo(splitH2.chars,
          { opacity: 0, y: 40, rotateX: -60 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.3, duration: 5, ease: 'power3.out', immediateRender: false },
          45
        );

        // Paragraph
        tl.fromTo(paraRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 5, ease: 'power2.out', immediateRender: false },
          49
        );

        // CTA buttons
        tl.fromTo(ctaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 4, ease: 'power2.out', immediateRender: false },
          52
        );

        // Parallax exit
        tl.to(contentRef.current,
          { yPercent: -60, opacity: 0, ease: 'none', duration: 25 },
          85
        );
        tl.to(overlayRef.current,
          { opacity: 0, duration: 23 },
          85
        );
      } else {
        // ── Desktop (300vh) ─────────────────────────────
        // SINGLE tween per property starting at position 0
        // power4.in = stays near initial value for first ~15%, then accelerates

        tl.fromTo(scrollHintRef.current,
          { opacity: 1 },
          { opacity: 0, duration: 5 },
          1
        );

        tl.fromTo(bgRef.current,
          { scale: 1, filter: 'brightness(1.4)' },
          { scale: 1.12, filter: 'brightness(1)', ease: 'none', duration: 40 },
          0
        );

        // Continue slow zoom after brightness settles
        tl.to(bgRef.current,
          { scale: 1.12, ease: 'none', duration: 60 },
          40
        );

        // ── Text zoom: single tween 0→37 ──
        // power4.in: at 13% (pos ~5), scale ≈ 1.01 (invisible)
        //            at 50% (pos ~18), scale ≈ 4
        //            at 100% (pos 37), scale = 50
        tl.fromTo(textRef.current,
          { scale: 1, transformOrigin: '50% 75%' },
          { scale: 50, ease: 'power4.in', duration: 37 },
          0
        );

        // ── Mask: single tween 0→40 ──
        // power4.in: stays near opacity 1 until ~70% (pos ~28), then drops fast
        tl.fromTo(maskRef.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power4.in', duration: 40 },
          0
        );

        // ── Overlay: fades in 30→52, out 70→92 ──
        tl.fromTo(overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 22, ease: 'power2.inOut', immediateRender: false },
          30
        );

        // ── Content: fades in 40→42 ──
        tl.fromTo(contentRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 2, immediateRender: false },
          40
        );

        // "Votre Vision" — chars cascade with 3D rotation
        tl.fromTo(splitH1.chars,
          { opacity: 0, y: 80, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.5, duration: 5, ease: 'power3.out', immediateRender: false },
          41
        );

        // "Notre Expertise" — chars cascade
        tl.fromTo(splitH2.chars,
          { opacity: 0, y: 80, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.4, duration: 5, ease: 'power3.out', immediateRender: false },
          46
        );

        // Paragraph slides up
        tl.fromTo(paraRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 5, ease: 'power2.out', immediateRender: false },
          52
        );

        // CTA buttons slide up
        tl.fromTo(ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 4, ease: 'power2.out', immediateRender: false },
          54
        );

        // ── Phase 3: Breathing room (58→70%) ──

        // ── Phase 4: Parallax exit (70→92%) ──
        tl.to(contentRef.current,
          { yPercent: -80, opacity: 0, ease: 'none', duration: 22 },
          70
        );
        tl.to(overlayRef.current,
          { opacity: 0, duration: 22 },
          70
        );
      }
    }, sectionRef);

    return () => {
      gsap.ticker.remove(forceTopState);
      ctx.revert();
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Image */}
        <div
          ref={bgRef}
          className="absolute will-change-transform"
          style={{ inset: isMobile ? '0' : '-10%' }}
        >
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 120vw"
            quality={55}
            priority
          />
          {/* Color grading — warm shadows, cool highlights */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(20,30,60,0.15) 0%, transparent 40%, rgba(10,8,4,0.2) 100%)',
            }}
          />
        </div>

        {/* Vignette — subtle, static, cinematic framing */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* Film grain — subtle texture overlay */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />

        {/* Black mask + JL STUDIO text (multiply blend) */}
        <div
          ref={maskRef}
          className="absolute inset-0 z-[5] bg-black flex items-center justify-center"
          style={{ mixBlendMode: 'multiply' }}
        >
          <div
            ref={textRef}
            className="text-white font-[family-name:var(--font-outfit)] font-black text-center select-none"
            style={{
              fontSize: isMobile ? 'clamp(5.5rem, 24vw, 10rem)' : 'clamp(5rem, 20vw, 16rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
            }}
          >
            JL
            <br />
            STUDIO
          </div>
        </div>

        {/* Dark overlay — fades in smoothly after zoom, fades out on exit */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-[8] bg-black/60"
          style={{ opacity: 0 }}
        />

        {/* Content — arrives, settles, readable, clickable */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-[10] flex items-center justify-center will-change-transform"
          style={{ opacity: 0 }}
        >
          <div className="text-center px-6 max-w-5xl mx-auto" style={{ perspective: 600 }}>
            <h1
              ref={h1Ref}
              className="font-[family-name:var(--font-outfit)] text-[clamp(2.4rem,10vw,3rem)] sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.95] tracking-tight mb-4 whitespace-nowrap"
            >
              Votre Vision
            </h1>
            <h2
              ref={h2Ref}
              className="font-[family-name:var(--font-outfit)] text-[clamp(2.4rem,10vw,3rem)] sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight mb-6 sm:mb-8 text-[#638BFF] whitespace-nowrap"
            >
              Notre Expertise
            </h2>
            <p
              ref={paraRef}
              className="text-base sm:text-lg md:text-xl lg:text-xl text-white/60 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed"
            >
              Sites web, e-commerce et applications sur mesure pour propulser
              votre activité
            </p>
            <div
              ref={ctaRef}
              className="flex flex-row items-center justify-center gap-3 md:gap-5"
            >
              <a
                href="#contact"
                className="group relative bg-[#638BFF] text-white font-semibold px-[clamp(0.9rem,4vw,1.5rem)] py-2.5 sm:px-6 sm:py-3 md:px-10 md:py-4 rounded-full text-[clamp(0.65rem,2.8vw,0.8rem)] sm:text-sm md:text-base overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,139,255,0.3)]"
              >
                <span className="relative z-10">Démarrer un projet</span>
              </a>
              <a
                href="#projets"
                className="border border-white/20 text-white/80 font-medium px-[clamp(0.9rem,4vw,1.5rem)] py-2.5 sm:px-6 sm:py-3 md:px-10 md:py-4 rounded-full text-[clamp(0.65rem,2.8vw,0.8rem)] sm:text-sm md:text-base hover:border-white/40 hover:text-white transition-all duration-300"
              >
                Voir nos réalisations
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[15] flex flex-col items-center gap-2"
        >
          <span className="text-[0.65rem] sm:text-xs tracking-[0.3em] uppercase text-white/50">
            Scroll
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
