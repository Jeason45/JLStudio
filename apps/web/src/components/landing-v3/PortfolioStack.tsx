'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useIsMobile } from '@/hooks/useMediaQuery';
import {
  Users,
  FileText,
  CalendarDays,
  BarChart3,
  Mail,
  CreditCard,
  BookOpen,
  BookMarked,
  Brain,
  Check,
  PenTool,
  LineChart,
  Zap,
  Search,
  Headphones,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface Feature {
  icon: LucideIcon;
  label: string;
}

interface Project {
  title: string;
  category: string;
  tags: string[];
  image: string;
  description: string;
  features?: {
    title: string;
    items: Feature[];
  };
}

const projects: Project[] = [
  {
    title: 'Flamme by Caubet',
    category: 'Site Vitrine & CRM',
    tags: ['Next.js 16', 'PostgreSQL', 'Prisma', 'Puppeteer'],
    image: '/images/portfolio-flamme.jpg',
    description: 'Site vitrine premium avec CRM complet pour une entreprise de location de braseros et tournebroches sur remorque.',
    features: {
      title: 'Livré avec un CRM autonome',
      items: [
        { icon: Users, label: 'Pipeline leads & clients' },
        { icon: FileText, label: 'Devis & factures PDF générés automatiquement' },
        { icon: PenTool, label: 'Signature électronique certifiée eIDAS' },
        { icon: CalendarDays, label: 'Calendrier de réservations équipements' },
        { icon: Mail, label: 'Emails transactionnels automatisés' },
      ],
    },
  },
  {
    title: 'Florent Food',
    category: 'Plateforme Créateur',
    tags: ['Next.js 16', 'PostgreSQL', 'Prisma', 'Resend'],
    image: '/images/portfolio-florentfood.jpg',
    description: 'Plateforme complète pour créateur culinaire : publication de recettes, newsletter et gestion des abonnés.',
    features: {
      title: 'Livré avec un back-office complet',
      items: [
        { icon: Mail, label: 'Système de newsletter avec séquences automatisées' },
        { icon: BookOpen, label: 'Gestion des recettes (free & premium)' },
        { icon: LineChart, label: 'Dashboard analytics avec Google Analytics' },
        { icon: CreditCard, label: 'Abonnements premium Stripe' },
        { icon: Zap, label: 'Double provider email (Resend + Gmail fallback)' },
      ],
    },
  },
  {
    title: 'PropDesk',
    category: 'Plateforme Fintech & IA',
    tags: ['Next.js 16', 'PyTorch', 'Databento', 'PostgreSQL'],
    image: '/images/portfolio-propdesk.jpg',
    description: "Plateforme de trading IA combinant pilotage multi-comptes, gestion du risque et exécution automatisée via deep learning sur données de niveau institutionnel.",
    features: {
      title: "Écosystème trading complet",
      items: [
        { icon: BarChart3, label: 'Gestion multi-comptes prop firm & fonds propres via API' },
        { icon: LineChart, label: 'Monitoring drawdown temps réel avec alertes' },
        { icon: FileText, label: 'Module déclaration fiscale lié aux P&L' },
        { icon: Brain, label: 'Stratégie automatisée par deep learning (LSTM/Transformer)' },
        { icon: Zap, label: 'Data institutionnelles Databento + flow options Unusual Whales' },
      ],
    },
  },
  {
    title: 'Run As One',
    category: 'Site Événementiel',
    tags: ['Next.js 16', 'Framer Motion', 'Tailwind CSS'],
    image: '/images/portfolio-runasone.jpg',
    description: 'Site vitrine pour la première course solidaire nationale au profit de Médecins Sans Frontières — 6 villes, 24 heures.',
  },
  {
    title: 'Al-Ilm',
    category: 'Plateforme Éducative',
    tags: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    image: '/images/portfolio-alilm.jpg',
    description: "Plateforme d'apprentissage islamique complète : lecture du Coran, collections de hadiths authentiques et ressources éducatives interactives.",
    features: {
      title: 'Contenu riche et interactif',
      items: [
        { icon: BookOpen, label: '114 sourates avec traductions et translittération' },
        { icon: FileText, label: '7 500+ hadiths de 9 collections majeures' },
        { icon: Search, label: 'Recherche avancée avec filtres thématiques' },
        { icon: Headphones, label: 'Récitation audio par 4 récitateurs renommés' },
        { icon: BookMarked, label: 'Annexes éducatives : 99 Noms, Prophètes, glossaire' },
      ],
    },
  },
];

/* ─────────────────────────────────────────────────────────── */

export default function PortfolioStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const slides = section.querySelectorAll<HTMLElement>('[data-slide]');
    const contents = section.querySelectorAll<HTMLElement>('[data-content]');
    const titles = section.querySelectorAll<HTMLElement>('[data-title]');
    const categories = section.querySelectorAll<HTMLElement>('[data-category]');
    const descs = section.querySelectorAll<HTMLElement>('[data-desc]');
    const featureWraps = section.querySelectorAll<HTMLElement>('[data-features]');
    const tagWraps = section.querySelectorAll<HTMLElement>('[data-tags]');
    const images = section.querySelectorAll<HTMLElement>('[data-image]');
    const dots = section.querySelectorAll<HTMLElement>('[data-dot]');

    if (slides.length === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      slides.forEach((s) => gsap.set(s, { autoAlpha: 1 }));
      contents.forEach((c) => gsap.set(c, { autoAlpha: 1 }));
      categories.forEach((c) => gsap.set(c, { opacity: 1, y: 0 }));
      titles.forEach((t) => {
        const sp = SplitText.create(t, { type: 'chars' });
        gsap.set(sp.chars, { opacity: 1, y: 0, rotateX: 0 });
      });
      descs.forEach((d) => gsap.set(d, { opacity: 1, y: 0 }));
      featureWraps.forEach((fw) => {
        gsap.set(fw.querySelector('[data-feature-title]')!, { opacity: 1, y: 0 });
        gsap.set(fw.querySelectorAll('[data-feature-item]'), { opacity: 1, x: 0 });
      });
      tagWraps.forEach((tw) => gsap.set(tw.querySelectorAll('[data-tag]'), { opacity: 1, y: 0 }));
      return;
    }

    const ctx = gsap.context(() => {
      const splitTitles = Array.from(titles).map((el) =>
        SplitText.create(el, { type: 'chars' })
      );

      // ── Initial states ──
      // First slide visible
      gsap.set(slides[0], { autoAlpha: 1 });
      gsap.set(contents[0], { autoAlpha: 1 });
      gsap.set(images[0], { scale: 1 });
      gsap.set(categories[0], { opacity: 1, y: 0 });
      gsap.set(splitTitles[0].chars, { opacity: 1, y: 0, rotateX: 0 });
      gsap.set(descs[0], { opacity: 1, y: 0 });
      const ft0 = featureWraps[0]?.querySelector<HTMLElement>('[data-feature-title]');
      const fi0 = featureWraps[0]?.querySelectorAll<HTMLElement>('[data-feature-item]');
      if (ft0) gsap.set(ft0, { opacity: 1, y: 0 });
      if (fi0) gsap.set(fi0, { opacity: 1, x: 0 });
      const tags0 = tagWraps[0]?.querySelectorAll<HTMLElement>('[data-tag]');
      if (tags0) gsap.set(tags0, { opacity: 1, y: 0 });

      // Subsequent slides hidden, positioned below
      for (let i = 1; i < projects.length; i++) {
        gsap.set(slides[i], { autoAlpha: 1, yPercent: 100 });
        gsap.set(images[i], { scale: 1.1, yPercent: 10 });
        gsap.set(contents[i], { autoAlpha: 0 });
        gsap.set(categories[i], { opacity: 0, y: 20 });
        gsap.set(splitTitles[i].chars, { opacity: 0, y: isMobile ? 30 : 50, rotateX: isMobile ? -30 : -60 });
        gsap.set(descs[i], { opacity: 0, y: 20 });
        const ftI = featureWraps[i]?.querySelector<HTMLElement>('[data-feature-title]');
        const fiI = featureWraps[i]?.querySelectorAll<HTMLElement>('[data-feature-item]');
        if (ftI) gsap.set(ftI, { opacity: 0, y: 15 });
        if (fiI) gsap.set(fiI, { opacity: 0, x: -15 });
        const tagsI = tagWraps[i]?.querySelectorAll<HTMLElement>('[data-tag]');
        if (tagsI) gsap.set(tagsI, { opacity: 0, y: 10 });
      }

      // ── Master timeline ──
      const tl = gsap.timeline();

      // Slow parallax on first image
      tl.to(images[0], { scale: 1.08, yPercent: -3, ease: 'none', duration: 3 }, 0);

      for (let i = 1; i < projects.length; i++) {
        const prevFt = featureWraps[i - 1]?.querySelector<HTMLElement>('[data-feature-title]');
        const prevFi = featureWraps[i - 1]?.querySelectorAll<HTMLElement>('[data-feature-item]');
        const prevTags = tagWraps[i - 1]?.querySelectorAll<HTMLElement>('[data-tag]');

        const nextFt = featureWraps[i]?.querySelector<HTMLElement>('[data-feature-title]');
        const nextFi = featureWraps[i]?.querySelectorAll<HTMLElement>('[data-feature-item]');
        const nextTags = tagWraps[i]?.querySelectorAll<HTMLElement>('[data-tag]');

        // ── PHASE 1: Exit current text ──
        const exitStart = (i - 1) * 4 + 2.5;

        tl.to(categories[i - 1], { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, exitStart);
        tl.to(splitTitles[i - 1].chars, {
          opacity: 0, y: -40, rotateX: 20,
          stagger: 0.015, duration: 0.6, ease: 'power3.in',
        }, exitStart);
        tl.to(descs[i - 1], { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, exitStart + 0.1);
        if (prevFt) tl.to(prevFt, { opacity: 0, y: -15, duration: 0.4, ease: 'power2.in' }, exitStart + 0.1);
        if (prevFi) tl.to(prevFi, { opacity: 0, x: -10, stagger: 0.02, duration: 0.3, ease: 'power2.in' }, exitStart + 0.15);
        if (prevTags) tl.to(prevTags, { opacity: 0, y: -10, stagger: 0.02, duration: 0.3, ease: 'power2.in' }, exitStart + 0.15);

        // ── PHASE 2: New card slides up over previous ──
        const crossStart = exitStart + 0.6;

        tl.to(slides[i], { yPercent: 0, duration: 1.4, ease: 'power3.inOut' }, crossStart);
        tl.to(images[i], { scale: 1, yPercent: 0, duration: 1.4, ease: 'power3.out' }, crossStart);

        // Dots
        tl.set(dots[i - 1], { background: 'rgba(255,255,255,0.15)', scale: 1, boxShadow: 'none' }, crossStart + 0.3);
        tl.set(dots[i], { background: '#638BFF', scale: 1.5, boxShadow: '0 0 12px rgba(99,139,255,0.4)' }, crossStart + 0.7);

        // ── PHASE 3: Enter new text ──
        const enterStart = crossStart + 0.8;

        tl.to(contents[i], { autoAlpha: 1, duration: 0.1 }, enterStart);
        tl.to(categories[i], { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, enterStart);
        tl.to(splitTitles[i].chars, {
          opacity: 1, y: 0, rotateX: 0,
          stagger: 0.03, duration: 0.7, ease: 'power3.out',
        }, enterStart + 0.15);
        tl.to(descs[i], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, enterStart + 0.4);
        if (nextFt) tl.to(nextFt, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, enterStart + 0.5);
        if (nextFi) tl.to(nextFi, { opacity: 1, x: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out' }, enterStart + 0.6);
        if (nextTags) tl.to(nextTags, { opacity: 1, y: 0, stagger: 0.04, duration: 0.4, ease: 'power2.out' }, enterStart + 0.7);

        // Slow parallax on new image
        tl.to(images[i], { scale: 1.08, yPercent: -3, ease: 'none', duration: 3 }, enterStart);

        // Breathing room
        if (i < projects.length - 1) {
          tl.to({}, { duration: 0.5 });
        }
      }

      // Pin the entire section
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${projects.length * (isMobile ? 900 : 1200)}`,
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
    <section
      ref={sectionRef}
      id="projets"
      aria-label="Portfolio"
      className="relative h-screen overflow-hidden bg-black"
    >
      {/* Section title overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-6 sm:pt-10 text-center pointer-events-none">
        <p className="text-[#638BFF]/70 text-xs tracking-[0.4em] uppercase mb-2">Portfolio</p>
        <h2 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl md:text-4xl font-black text-white">
          Nos réalisations
        </h2>
      </div>

      {/* Progress dots */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 sm:gap-4">
        {projects.map((_, i) => (
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
      {projects.map((project, i) => (
        <div
          key={i}
          data-slide
          className="absolute inset-0"
          style={{ zIndex: i + 1 }}
        >
          {/* Image side */}
          <div className={`absolute ${isMobile ? 'inset-0' : 'top-0 left-0 bottom-0 w-[55%]'} overflow-hidden`}>
            <div data-image className="absolute inset-[-10%] will-change-transform">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top"
                sizes={isMobile ? '100vw' : '55vw'}
                priority={i === 0}
              />
            </div>
            {/* Gradient overlay for text readability on mobile */}
            {isMobile && (
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.9) 100%)',
              }} />
            )}
          </div>

          {/* Desktop: subtle edge gradient between image and content */}
          {!isMobile && (
            <div className="absolute top-0 bottom-0 left-[50%] w-[10%] z-[2]" style={{
              background: 'linear-gradient(to right, transparent, #0a0a0a)',
            }} />
          )}

          {/* Content side */}
          <div
            data-content
            className={`
              absolute z-10
              ${isMobile
                ? 'inset-0 flex items-end p-6 pb-8'
                : 'top-0 right-0 bottom-0 w-[45%] flex items-center'
              }
            `}
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div className={isMobile ? 'w-full' : 'px-8 lg:px-14 xl:px-16 w-full'}>
              {/* Category */}
              <p
                data-category
                className="text-[#638BFF]/70 text-xs font-medium tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-3"
              >
                {project.category}
              </p>

              {/* Title */}
              <h3
                data-title
                className="font-[family-name:var(--font-outfit)] font-black text-white leading-[0.95] tracking-tight mb-4"
                style={{
                  fontSize: isMobile ? 'clamp(1.75rem, 8vw, 2.5rem)' : 'clamp(2rem, 2.8vw, 3rem)',
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                data-desc
                className="text-white/55 text-sm sm:text-base leading-relaxed mb-5 max-w-md"
              >
                {project.description}
              </p>

              {/* Features */}
              {project.features && (
                <div data-features className="mb-5">
                  <p
                    data-feature-title
                    className="text-white/50 text-xs uppercase tracking-[0.2em] mb-3"
                  >
                    {project.features.title}
                  </p>
                  <div className="space-y-2">
                    {(isMobile ? project.features.items.slice(0, 3) : project.features.items).map((feature, j) => (
                      <div
                        key={j}
                        data-feature-item
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-md bg-[#638BFF]/[0.08] border border-[#638BFF]/15 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-[#638BFF]" />
                        </div>
                        <span className="text-[13px] text-white/65">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div data-tags className="flex flex-wrap gap-2">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    data-tag
                    className="text-[11px] text-white/50 border border-white/[0.1] bg-white/[0.03] px-3 py-1 rounded-full backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
