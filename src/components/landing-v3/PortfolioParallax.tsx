'use client';

import { useRef, useEffect, Fragment } from 'react';
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
  Check,
  PenTool,
  LineChart,
  Zap,
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
    title: 'Jouons Avec Les Paroles',
    category: 'Application Mobile & API',
    tags: ['React Native', 'Expo', 'Fastify', 'PostgreSQL'],
    image: '/images/portfolio-jalp.jpg',
    description: "Application mobile de quiz musical avec API backend complète, système de progression et multijoueur temps réel.",
    features: {
      title: "Écosystème complet développé",
      items: [
        { icon: Gamepad2, label: '8 modes de jeu (duel, survie, daily challenge...)' },
        { icon: Brain, label: 'Algorithme de révision espacée FSRS' },
        { icon: Trophy, label: 'Progression 50 niveaux, achievements, classements' },
        { icon: Music, label: 'Catalogue de 2 000+ chansons avec métadonnées' },
        { icon: Smartphone, label: 'Multijoueur temps réel via WebSocket' },
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
    title: 'ZMR Models Agency',
    category: 'Plateforme & CRM',
    tags: ['Next.js 16', 'PostgreSQL', 'Prisma', 'Stripe', 'Cloudflare R2'],
    image: '/images/portfolio-zmr.jpg',
    description: "Plateforme pour agence de mannequins avec gestion des talents, billetterie événementielle et espace membres.",
    features: {
      title: 'Livré avec un CRM complet',
      items: [
        { icon: Camera, label: 'Gestion multi-catégories de talents avec books' },
        { icon: FileText, label: '22+ templates de documents (devis, contrats, factures)' },
        { icon: UserPlus, label: 'Espace membres avec inscription et vérification' },
        { icon: FolderOpen, label: 'Stockage média Cloudflare R2 (S3)' },
        { icon: CreditCard, label: 'Billetterie Stripe avec QR codes de validation' },
      ],
    },
  },
];

export default function PortfolioParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const projectEls = section.querySelectorAll<HTMLElement>('[data-project]');

    if (projectEls.length === 0) return;

    const ctx = gsap.context(() => {
      projectEls.forEach((projectEl) => {
        const mockup = projectEl.querySelector<HTMLElement>('[data-mockup]');
        const titleEl = projectEl.querySelector<HTMLElement>('[data-title]');
        const categoryEl = projectEl.querySelector<HTMLElement>('[data-category]');
        const descEl = projectEl.querySelector<HTMLElement>('[data-desc]');
        const featureTitle = projectEl.querySelector<HTMLElement>('[data-feature-title]');
        const featureItems = projectEl.querySelectorAll<HTMLElement>('[data-feature-item]');
        const tagEls = projectEl.querySelectorAll<HTMLElement>('[data-tag]');

        // ── Mockup: slide in + subtle parallax ──
        if (mockup) {
          gsap.set(mockup, { opacity: 0, y: 60 });
          gsap.to(mockup, {
            opacity: 1, y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: projectEl,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });

          gsap.to(mockup, {
            yPercent: isMobile ? -5 : -10,
            ease: 'none',
            scrollTrigger: {
              trigger: projectEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        // ── Title: SplitText char reveal ──
        if (titleEl) {
          const split = SplitText.create(titleEl, { type: 'chars' });
          gsap.set(split.chars, { opacity: 0, y: isMobile ? 30 : 50, rotateX: isMobile ? -30 : -60 });
          gsap.to(split.chars, {
            opacity: 1, y: 0, rotateX: 0,
            stagger: 0.03,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: projectEl,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        if (categoryEl) {
          gsap.set(categoryEl, { opacity: 0, y: 15 });
          gsap.to(categoryEl, {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: {
              trigger: projectEl,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        if (descEl) {
          gsap.set(descEl, { opacity: 0, y: 20 });
          gsap.to(descEl, {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: {
              trigger: projectEl,
              start: 'top 72%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        if (featureTitle) {
          gsap.set(featureTitle, { opacity: 0, y: 15 });
          gsap.to(featureTitle, {
            opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
            scrollTrigger: {
              trigger: projectEl,
              start: 'top 68%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        if (featureItems.length > 0) {
          gsap.set(featureItems, { opacity: 0, x: -15 });
          gsap.to(featureItems, {
            opacity: 1, x: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: projectEl,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        if (tagEls.length > 0) {
          gsap.set(tagEls, { opacity: 0, y: 10 });
          gsap.to(tagEls, {
            opacity: 1, y: 0,
            stagger: 0.06,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: projectEl,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          });
        }
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
      <div className="relative z-10 pt-20 pb-12 md:pt-32 md:pb-20 text-center">
        <p className="text-[#638BFF]/70 text-xs tracking-[0.4em] uppercase mb-4">Portfolio</p>
        <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-black text-white">
          Nos réalisations
        </h2>
      </div>

      {/* Projects */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {projects.map((project, i) => {
          const isEven = i % 2 === 0;

          return (
            <Fragment key={i}>
            <article
              data-project
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-10 sm:py-20 lg:py-28"
            >
              {/* ── Screenshot ── */}
              <div
                data-mockup
                className={`relative will-change-transform ${
                  !isMobile && !isEven ? 'lg:order-2' : ''
                }`}
                style={{ opacity: 0 }}
              >
                <div className="relative aspect-[4/3] lg:aspect-[16/10] rounded-xl overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={i === 0}
                  />
                </div>
              </div>

              {/* ── Content ── */}
              <div className={!isMobile && !isEven ? 'lg:order-1' : ''}>
                {/* Category */}
                <p
                  data-category
                  className="text-[#638BFF]/70 text-xs font-medium tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-3"
                  style={{ opacity: 0 }}
                >
                  {project.category}
                </p>

                {/* Title */}
                <h3
                  data-title
                  className="font-[family-name:var(--font-outfit)] font-black text-white leading-[0.95] tracking-tight mb-4 sm:mb-5"
                  style={{
                    fontSize: isMobile ? 'clamp(1.75rem, 8vw, 2.5rem)' : 'clamp(2rem, 3vw, 3rem)',
                    perspective: 600,
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  data-desc
                  className="text-white/55 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-lg"
                  style={{ opacity: 0 }}
                >
                  {project.description}
                </p>

                {/* Features */}
                {project.features && (
                  <div className="mb-6 sm:mb-8">
                    <p
                      data-feature-title
                      className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4"
                      style={{ opacity: 0 }}
                    >
                      {project.features.title}
                    </p>
                    <div className="space-y-2.5">
                      {(isMobile ? project.features.items.slice(0, 3) : project.features.items).map((feature, j) => (
                        <div
                          key={j}
                          data-feature-item
                          className="flex items-center gap-3"
                          style={{ opacity: 0 }}
                        >
                          <div className="w-6 h-6 rounded-md bg-[#638BFF]/[0.08] border border-[#638BFF]/15 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-[#638BFF]" />
                          </div>
                          <span className="text-sm text-white/65">{feature.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      data-tag
                      className="text-[11px] lg:text-xs text-white/50 border border-white/[0.1] bg-white/[0.03] px-3 py-1 lg:px-4 lg:py-1.5 rounded-full"
                      style={{ opacity: 0 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Separator between projects */}
            {i < projects.length - 1 && (
              <div className="flex items-center gap-4">
                {/* Mobile: numbered pill separator */}
                <div className="flex-1 h-px bg-[#638BFF]/20 lg:bg-white/[0.06]" />
                <span className="text-[#638BFF]/40 text-[11px] font-medium tracking-wider lg:hidden">
                  {String(i + 2).padStart(2, '0')}
                </span>
                <div className="flex-1 h-px bg-[#638BFF]/20 lg:bg-white/[0.06] lg:hidden" />
              </div>
            )}
          </Fragment>
          );
        })}
      </div>

      <div className="h-8 sm:h-16" />
    </section>
  );
}
