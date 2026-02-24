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
  UserPlus,
  Camera,
  FolderOpen,
  Gamepad2,
  Music,
  Brain,
  Trophy,
  Smartphone,
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
    stat: string;
  };
}

const projects: Project[] = [
  {
    title: 'Flamme by Caubet',
    category: 'Site Vitrine & CRM',
    tags: ['Next.js', 'Prisma', 'Nodemailer'],
    image: '/images/portfolio-flamme.jpg',
    description: 'Site premium avec animations et CRM complet pour une entreprise de location de braseros et tournebroches.',
    features: {
      title: 'CRM sur-mesure',
      items: [
        { icon: Users, label: 'Gestion des leads & clients' },
        { icon: FileText, label: 'Devis automatisés' },
        { icon: CalendarDays, label: 'Calendrier de réservations' },
        { icon: BarChart3, label: 'Dashboard analytics' },
        { icon: Mail, label: 'Notifications email' },
      ],
      stat: '5 modules · 100% sur-mesure',
    },
  },
  {
    title: 'Florent Food',
    category: 'Plateforme Créateur',
    tags: ['Next.js', 'Supabase', 'Stripe'],
    image: '/images/portfolio-florentfood.jpg',
    description: 'Plateforme premium pour créateur culinaire avec newsletter, recettes et système de membres.',
    features: {
      title: 'Back-office créateur',
      items: [
        { icon: Mail, label: 'Newsletter & abonnés' },
        { icon: BookOpen, label: 'Gestion des recettes' },
        { icon: UserPlus, label: 'Espace membres premium' },
        { icon: CreditCard, label: 'Paiements Stripe' },
        { icon: BarChart3, label: 'Analytics de contenu' },
      ],
      stat: '840K+ abonnés · Monétisation intégrée',
    },
  },
  {
    title: 'Jouons Avec Les Paroles',
    category: 'Application Mobile',
    tags: ['React Native', 'Fastify', 'SQLite'],
    image: '/images/portfolio-jalp.jpg',
    description: "Application mobile de karaoké avec 5 modes de jeu, API backend et système de révision intelligent.",
    features: {
      title: 'Application complète',
      items: [
        { icon: Gamepad2, label: '5 modes de jeu uniques' },
        { icon: Music, label: 'Catalogue de 500+ chansons' },
        { icon: Brain, label: 'Révision intelligente' },
        { icon: Trophy, label: 'Classement & progression' },
        { icon: Smartphone, label: 'iOS & Android natif' },
      ],
      stat: 'API Fastify · Base SQLite locale',
    },
  },
  {
    title: 'Run As One',
    category: 'Site Événementiel',
    tags: ['Next.js', 'Framer Motion', 'Tailwind'],
    image: '/images/portfolio-runasone.jpg',
    description: 'Plateforme pour la première course solidaire nationale au profit de MSF — 6 villes, 24 heures, 1 France.',
  },
  {
    title: 'ZMR Models Agency',
    category: 'Plateforme & CRM',
    tags: ['Next.js', 'Prisma', 'Stripe', 'AWS S3'],
    image: '/images/portfolio-zmr.jpg',
    description: "Plateforme premium pour agence de mannequins avec gestion des talents, devis automatisés et espace membres.",
    features: {
      title: 'CRM Agence',
      items: [
        { icon: Camera, label: 'Gestion des talents & books' },
        { icon: FileText, label: 'Devis & factures PDF' },
        { icon: UserPlus, label: 'Espace membres & clients' },
        { icon: FolderOpen, label: 'Stockage média cloud' },
        { icon: CalendarDays, label: 'Calendrier événements' },
      ],
      stat: '8 modules · Génération PDF automatique',
    },
  },
];

export default function PortfolioParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const items = section.querySelectorAll<HTMLElement>('[data-project]');
    const imageWrappers = section.querySelectorAll<HTMLElement>('[data-image-wrapper]');
    const innerImages = section.querySelectorAll<HTMLElement>('[data-inner-image]');
    const featurePanels = section.querySelectorAll<HTMLElement>('[data-feature-panel]');
    const textBlocks = section.querySelectorAll<HTMLElement>('[data-text-block]');
    const titles = section.querySelectorAll<HTMLElement>('[data-title]');
    const categories = section.querySelectorAll<HTMLElement>('[data-category]');
    const descriptions = section.querySelectorAll<HTMLElement>('[data-desc]');
    const tagWraps = section.querySelectorAll<HTMLElement>('[data-tags]');

    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      const splitTitles = Array.from(titles).map((el) =>
        SplitText.create(el, { type: 'chars' })
      );

      items.forEach((item, i) => {
        const imageWrapper = imageWrappers[i];
        const innerImage = innerImages[i];
        const textBlock = textBlocks[i];
        const split = splitTitles[i];
        const category = categories[i];
        const desc = descriptions[i];
        const tagWrap = tagWraps[i];
        const tags = tagWrap?.querySelectorAll('[data-tag]');

        // ═══════════════════════════════════════════════
        //  LAYER 1 — Image parallax (slowest layer)
        // ═══════════════════════════════════════════════
        gsap.fromTo(innerImage, {
          yPercent: isMobile ? 12 : 25,
        }, {
          yPercent: isMobile ? -12 : -25,
          ease: 'none',
          scrollTrigger: {
            trigger: imageWrapper,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // ═══════════════════════════════════════════════
        //  LAYER 2 — Text block parallax (medium speed)
        // ═══════════════════════════════════════════════
        gsap.to(textBlock, {
          yPercent: isMobile ? -30 : -70,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // ── Text reveal animations ──
        gsap.set(split.chars, { opacity: 0, y: isMobile ? 50 : 100, rotateX: isMobile ? -45 : -90 });
        gsap.set(category, { opacity: 0, y: 20 });
        gsap.set(desc, { opacity: 0, y: 30 });
        if (tags) gsap.set(tags, { opacity: 0, y: 15 });

        gsap.to(category, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: {
            trigger: textBlock,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });

        gsap.to(split.chars, {
          opacity: 1, y: 0, rotateX: 0,
          stagger: isMobile ? 0.03 : (i % 2 === 0 ? 0.04 : -0.04),
          duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: textBlock,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        gsap.to(desc, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: textBlock,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        if (tags) {
          gsap.to(tags, {
            opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power2.out',
            scrollTrigger: {
              trigger: textBlock,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });

      // ═══════════════════════════════════════════════
      //  LAYER 3 — Feature panels (fastest = most depth)
      // ═══════════════════════════════════════════════
      featurePanels.forEach((panel) => {
        const featureItems = panel.querySelectorAll<HTMLElement>('[data-feature-item]');
        const featureStat = panel.querySelector<HTMLElement>('[data-feature-stat]');

        // Panel entrance
        gsap.set(panel, { opacity: 0, y: 80, scale: 0.9 });
        gsap.to(panel, {
          opacity: 1, y: 0, scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        });

        // Stagger feature items
        gsap.set(featureItems, { opacity: 0, x: 20 });
        gsap.to(featureItems, {
          opacity: 1, x: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        // Stat line
        if (featureStat) {
          gsap.set(featureStat, { opacity: 0 });
          gsap.to(featureStat, {
            opacity: 1,
            duration: 0.6,
            delay: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        // Parallax — faster than background = floats forward
        gsap.to(panel, {
          yPercent: isMobile ? -15 : -35,
          ease: 'none',
          scrollTrigger: {
            trigger: panel.closest('[data-project]'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
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
      id="projets"
      className="relative bg-black"
    >
      {/* Section header */}
      <div className="relative z-10 pt-20 pb-12 md:pt-32 md:pb-24 text-center">
        <p className="text-[#638BFF]/70 text-xs tracking-[0.4em] uppercase mb-4">Portfolio</p>
        <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-black text-white">
          Nos réalisations
        </h2>
      </div>

      {/* Projects */}
      {projects.map((project, i) => {
        const isEven = i % 2 === 0;

        return (
          <article key={i} data-project className="relative pb-8">
            {/* ── Image ── */}
            <div
              data-image-wrapper
              className="relative overflow-hidden mx-4 sm:mx-6 lg:mx-12 rounded-xl"
              style={{ height: isMobile ? '50vh' : '80vh' }}
            >
              <div
                data-inner-image
                className="absolute will-change-transform"
                style={{ inset: isMobile ? '-15%' : '-30%' }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={i === 0}
                />
              </div>

              {/* Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 80% 70% at center, transparent 30%, rgba(0,0,0,0.35) 100%)',
                }}
              />

              {/* ── Feature floating panel ── */}
              {project.features && (
                <div
                  data-feature-panel
                  className={`absolute z-10 will-change-transform ${
                    isMobile
                      ? 'bottom-4 right-4 left-4'
                      : isEven
                        ? 'bottom-8 right-8 lg:bottom-12 lg:right-12 w-[320px] lg:w-[360px]'
                        : 'bottom-8 left-8 lg:bottom-12 lg:left-12 w-[320px] lg:w-[360px]'
                  }`}
                  style={{ opacity: 0 }}
                >
                  {/* Glow */}
                  <div
                    className="absolute -inset-6 rounded-3xl pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(99,139,255,0.12) 0%, transparent 70%)',
                      filter: 'blur(25px)',
                    }}
                  />

                  {/* Panel */}
                  <div className="relative rounded-xl overflow-hidden border border-white/[0.1] bg-black/70 backdrop-blur-xl p-5 sm:p-6">
                    {/* Header */}
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-2 h-2 rounded-full bg-[#638BFF]" />
                      <span className="text-xs font-semibold text-white/90 tracking-wide uppercase">
                        {project.features.title}
                      </span>
                    </div>

                    {/* Feature list */}
                    <div className="space-y-2.5">
                      {project.features.items.map((feature, j) => {
                        const Icon = feature.icon;
                        return (
                          <div
                            key={j}
                            data-feature-item
                            className="flex items-center gap-3"
                            style={{ opacity: 0 }}
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#638BFF]/[0.08] border border-[#638BFF]/20 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-3.5 h-3.5 text-[#638BFF]" />
                            </div>
                            <span className="text-sm text-white/70">{feature.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Separator + stat */}
                    <div className="mt-4 pt-3 border-t border-white/[0.06]">
                      <p
                        data-feature-stat
                        className="text-[11px] text-[#638BFF]/60 tracking-wide"
                        style={{ opacity: 0 }}
                      >
                        {project.features.stat}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Text: overlaps the image bottom edge ── */}
            <div
              data-text-block
              className={`relative z-10 px-6 sm:px-8 lg:px-20 max-w-7xl mx-auto will-change-transform ${
                isMobile ? '' : (isEven ? '' : 'text-right')
              }`}
              style={{
                marginTop: isMobile ? '-10vh' : '-18vh',
                perspective: 700,
              }}
            >
              {/* Category */}
              <p
                data-category
                className="text-[#638BFF]/70 text-xs font-medium tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-3 sm:mb-4"
              >
                {project.category}
              </p>

              {/* Title */}
              <h3
                data-title
                className="font-[family-name:var(--font-outfit)] font-black text-white leading-[0.9] tracking-tighter mb-4 sm:mb-6 lg:whitespace-nowrap"
                style={{ fontSize: isMobile ? 'clamp(2rem, 10vw, 3rem)' : 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                data-desc
                className={`text-white/60 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 ${
                  isMobile ? 'max-w-lg' : (isEven ? 'max-w-lg' : 'max-w-lg ml-auto')
                }`}
              >
                {project.description}
              </p>

              {/* Tags */}
              <div
                data-tags
                className={`flex flex-wrap gap-2 sm:gap-3 ${
                  isMobile ? '' : (isEven ? '' : 'justify-end')
                }`}
              >
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    data-tag
                    className="text-xs text-white/60 border border-white/[0.15] bg-white/[0.05] px-3 sm:px-5 py-1.5 sm:py-2 rounded-full backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Spacer between projects */}
            <div style={{ height: isMobile ? '6vh' : '15vh' }} />
          </article>
        );
      })}

      <div className="h-8 sm:h-16" />
    </section>
  );
}
