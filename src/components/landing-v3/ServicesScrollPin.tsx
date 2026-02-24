'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useIsMobile } from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger, SplitText);

const services = [
  {
    title: 'Site Vitrine',
    subtitle: 'Votre identite en ligne',
    description:
      'Un site elegant et performant qui reflete votre marque. Design sur mesure, animations fluides, SEO optimise.',
    features: ['Design responsive', 'Animations premium', 'SEO optimise', 'CMS integre'],
    image: '/images/services-vitrine.jpg',
    number: '01',
  },
  {
    title: 'E-Commerce',
    subtitle: 'Vendez sans limites',
    description:
      "Boutiques en ligne performantes avec paiement securise, gestion de stock et experience d'achat optimisee.",
    features: ['Paiement securise', 'Gestion de stock', 'Panier optimise', 'Analytics avances'],
    image: '/images/services-ecommerce.jpg',
    number: '02',
  },
  {
    title: 'Application Web',
    subtitle: 'Outils sur mesure',
    description:
      'Applications metier robustes : dashboards, CRM, plateformes SaaS. Architecture scalable et interfaces intuitives.',
    features: ['Dashboard temps reel', 'API robuste', 'Architecture scalable', 'UX intuitive'],
    image: '/images/services-webapp.jpg',
    number: '03',
  },
  {
    title: 'Autres Services',
    subtitle: 'Solutions complementaires',
    description:
      'Landing pages, refonte de sites existants, maintenance, conseil technique et accompagnement strategie digitale.',
    features: ['Landing pages', 'Refonte & migration', 'Maintenance', 'Conseil technique'],
    image: '/images/services-other.jpg',
    number: '04',
  },
];

export default function ServicesScrollPin() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const slides = section.querySelectorAll<HTMLElement>('[data-slide]');
    const innerImages = section.querySelectorAll<HTMLElement>('[data-inner-image]');
    const overlays = section.querySelectorAll<HTMLElement>('[data-overlay]');
    const contents = section.querySelectorAll<HTMLElement>('[data-content]');
    const titles = section.querySelectorAll<HTMLElement>('[data-title]');
    const subtitles = section.querySelectorAll<HTMLElement>('[data-subtitle]');
    const descriptions = section.querySelectorAll<HTMLElement>('[data-desc]');
    const featureWraps = section.querySelectorAll<HTMLElement>('[data-features]');
    const dots = section.querySelectorAll<HTMLElement>('[data-dot]');

    if (slides.length === 0) return;

    const ctx = gsap.context(() => {
      // SplitText for each title
      const splitTitles = Array.from(titles).map((el) =>
        SplitText.create(el, { type: 'chars' })
      );

      // ── Initial states ──
      // First slide: fully visible
      gsap.set(slides[0], { autoAlpha: 1 });
      gsap.set(innerImages[0], { scale: 1 });
      gsap.set(overlays[0], { opacity: 1 });
      gsap.set(contents[0], { autoAlpha: 1 });
      gsap.set(splitTitles[0].chars, { opacity: 1, y: 0, rotateX: 0 });
      gsap.set(subtitles[0], { opacity: 1, y: 0 });
      gsap.set(descriptions[0], { opacity: 1, y: 0 });
      const firstFeatures = featureWraps[0]?.querySelectorAll('[data-feature]');
      if (firstFeatures) gsap.set(firstFeatures, { opacity: 1, y: 0 });

      // Subsequent slides: hidden, images offset for parallax entry
      for (let i = 1; i < services.length; i++) {
        gsap.set(slides[i], { autoAlpha: 1 });
        gsap.set(innerImages[i], { scale: 1.15, yPercent: 15 });
        gsap.set(overlays[i], { opacity: 1 });
        gsap.set(contents[i], { autoAlpha: 0 });
        gsap.set(splitTitles[i].chars, { opacity: 0, y: isMobile ? 40 : 80, rotateX: isMobile ? -45 : -90 });
        gsap.set(subtitles[i], { opacity: 0, y: 30 });
        gsap.set(descriptions[i], { opacity: 0, y: 30 });
        const features = featureWraps[i]?.querySelectorAll('[data-feature]');
        if (features) gsap.set(features, { opacity: 0, y: 20 });
      }

      // ── Master timeline ──
      const tl = gsap.timeline();

      // Slow parallax zoom on first image during its lifetime
      tl.to(innerImages[0], {
        scale: 1.12,
        yPercent: -5,
        ease: 'none',
        duration: 3,
      }, 0);

      for (let i = 1; i < services.length; i++) {
        const prevFeatures = featureWraps[i - 1]?.querySelectorAll('[data-feature]');
        const nextFeatures = featureWraps[i]?.querySelectorAll('[data-feature]');

        // ── PHASE 1: Exit current text ──
        const exitStart = (i - 1) * 4 + 2.5;

        // Text exits upward with fade
        tl.to(splitTitles[i - 1].chars, {
          opacity: 0, y: -60, rotateX: 30,
          stagger: 0.015, duration: 0.7, ease: 'power3.in',
        }, exitStart);
        tl.to(subtitles[i - 1], {
          opacity: 0, y: -30, duration: 0.5, ease: 'power2.in',
        }, exitStart);
        tl.to(descriptions[i - 1], {
          opacity: 0, y: -30, duration: 0.5, ease: 'power2.in',
        }, exitStart + 0.1);
        if (prevFeatures) {
          tl.to(prevFeatures, {
            opacity: 0, y: -15, stagger: 0.02, duration: 0.4, ease: 'power2.in',
          }, exitStart + 0.1);
        }

        // ── PHASE 2: Image crossfade — new slide rises over previous ──
        const crossStart = exitStart + 0.6;

        // New slide comes from below (stacked card effect)
        gsap.set(slides[i], { yPercent: 100 });
        tl.to(slides[i], {
          yPercent: 0,
          duration: 1.4,
          ease: 'power3.inOut',
        }, crossStart);

        // New image parallax: arrives zoomed & offset, settles into place
        tl.to(innerImages[i], {
          scale: 1,
          yPercent: 0,
          duration: 1.4,
          ease: 'power3.out',
        }, crossStart);

        // Dot updates
        tl.set(dots[i - 1], { background: 'rgba(255,255,255,0.15)', scale: 1, boxShadow: 'none' }, crossStart + 0.3);
        tl.set(dots[i], { background: '#638BFF', scale: 1.5, boxShadow: '0 0 12px rgba(99,139,255,0.4)' }, crossStart + 0.7);

        // ── PHASE 3: Enter new text ──
        const enterStart = crossStart + 0.8;

        // Show content wrapper
        tl.to(contents[i], { autoAlpha: 1, duration: 0.1 }, enterStart);

        // Subtitle slides in
        tl.to(subtitles[i], {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        }, enterStart + 0.1);

        // Title chars cascade with 3D rotation
        tl.to(splitTitles[i].chars, {
          opacity: 1, y: 0, rotateX: 0,
          stagger: 0.03, duration: 0.7, ease: 'power3.out',
        }, enterStart + 0.2);

        // Description
        tl.to(descriptions[i], {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        }, enterStart + 0.5);

        // Features stagger in
        if (nextFeatures) {
          tl.to(nextFeatures, {
            opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out',
          }, enterStart + 0.7);
        }

        // ── Slow parallax zoom while this slide is active ──
        tl.to(innerImages[i], {
          scale: 1.1,
          yPercent: -5,
          ease: 'none',
          duration: 3,
        }, enterStart);

        // ── Breathing room ──
        if (i < services.length - 1) {
          tl.to({}, { duration: 0.5 });
        }
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${services.length * (isMobile ? 900 : 1200)}`,
        pin: true,
        pinSpacing: true,
        scrub: isMobile ? 0.8 : 1.5,
        animation: tl,
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile]);

  return (
    <div
      ref={sectionRef}
      id="services"
      className="relative h-screen overflow-hidden bg-black"
    >
      {/* Progress dots */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 sm:gap-4">
        {services.map((_, i) => (
          <div
            key={i}
            data-dot
            className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
            style={{
              background: i === 0 ? '#638BFF' : 'rgba(255,255,255,0.15)',
              transform: i === 0 ? 'scale(1.5)' : 'scale(1)',
              boxShadow: i === 0 ? '0 0 12px rgba(99,139,255,0.4)' : 'none',
              transition: 'background 0.3s, transform 0.3s, box-shadow 0.3s',
            }}
          />
        ))}
      </div>

      {/* Slides — stacked, full-screen */}
      {services.map((service, i) => (
        <div
          key={i}
          data-slide
          className="absolute inset-0"
          style={{ zIndex: i + 1 }}
        >
          {/* Full-screen background image with parallax */}
          <div className="absolute inset-0 overflow-hidden">
            <div data-inner-image className="absolute inset-[-15%] will-change-transform">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
            </div>
          </div>

          {/* Dark overlay for text readability */}
          <div
            data-overlay
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.65) 100%)',
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 70% at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
            }}
          />

          {/* Content — centered */}
          <div
            data-content
            className="absolute inset-0 z-10 flex items-center justify-center"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div className="text-center px-6 sm:px-8 max-w-4xl mx-auto relative" style={{ perspective: 800 }}>
              {/* Subtitle */}
              <p
                data-subtitle
                className="text-[#638BFF]/70 text-[10px] sm:text-xs font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-4 sm:mb-6 relative"
              >
                {service.subtitle}
              </p>

              {/* Title */}
              <h3
                data-title
                className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-[0.95] tracking-tight relative"
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                data-desc
                className="text-white/60 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-10 max-w-lg mx-auto relative"
              >
                {service.description}
              </p>

              {/* Feature tags */}
              <div data-features className="flex flex-wrap justify-center gap-2 sm:gap-3 relative">
                {service.features.map((f, j) => (
                  <span
                    key={j}
                    data-feature
                    className="text-[10px] sm:text-xs text-white/60 border border-white/[0.15] bg-white/[0.05] px-3 sm:px-5 py-1.5 sm:py-2 rounded-full backdrop-blur-sm"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
