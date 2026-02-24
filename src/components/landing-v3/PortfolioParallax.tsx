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
  Check,
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
    tags: ['Next.js', 'Prisma', 'Nodemailer'],
    image: '/images/portfolio-flamme.jpg',
    description: 'Site premium avec animations et CRM complet pour une entreprise de location de braseros et tournebroches.',
    features: {
      title: 'Ce site est livré avec :',
      items: [
        { icon: Users, label: 'Gestion des leads & clients' },
        { icon: FileText, label: 'Devis automatisés' },
        { icon: CalendarDays, label: 'Calendrier de réservations' },
        { icon: BarChart3, label: 'Dashboard analytics' },
        { icon: Mail, label: 'Notifications email' },
      ],
    },
  },
  {
    title: 'Florent Food',
    category: 'Plateforme Créateur',
    tags: ['Next.js', 'Supabase', 'Stripe'],
    image: '/images/portfolio-florentfood.jpg',
    description: 'Plateforme premium pour créateur culinaire avec newsletter, recettes et système de membres.',
    features: {
      title: 'Ce site est livré avec :',
      items: [
        { icon: Mail, label: 'Newsletter & abonnés' },
        { icon: BookOpen, label: 'Gestion des recettes' },
        { icon: UserPlus, label: 'Espace membres premium' },
        { icon: CreditCard, label: 'Paiements Stripe' },
        { icon: BarChart3, label: 'Analytics de contenu' },
      ],
    },
  },
  {
    title: 'Jouons Avec Les Paroles',
    category: 'Application Mobile',
    tags: ['React Native', 'Fastify', 'SQLite'],
    image: '/images/portfolio-jalp.jpg',
    description: "Application mobile de karaoké avec 5 modes de jeu, API backend et système de révision intelligent.",
    features: {
      title: "L'application comprend :",
      items: [
        { icon: Gamepad2, label: '5 modes de jeu uniques' },
        { icon: Music, label: 'Catalogue de 500+ chansons' },
        { icon: Brain, label: 'Révision intelligente' },
        { icon: Trophy, label: 'Classement & progression' },
        { icon: Smartphone, label: 'iOS & Android natif' },
      ],
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
      title: 'Ce site est livré avec :',
      items: [
        { icon: Camera, label: 'Gestion des talents & books' },
        { icon: FileText, label: 'Devis & factures PDF' },
        { icon: UserPlus, label: 'Espace membres & clients' },
        { icon: FolderOpen, label: 'Stockage média cloud' },
        { icon: CalendarDays, label: 'Calendrier événements' },
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

          // Subtle parallax on mockup
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

        // ── Category ──
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

        // ── Description ──
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

        // ── Feature title ──
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

        // ── Feature items stagger ──
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

        // ── Tags ──
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
            <article
              key={i}
              data-project
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-16 sm:py-20 lg:py-28 ${
                i < projects.length - 1 ? 'border-b border-white/[0.06]' : ''
              }`}
            >
              {/* ── Mockup ── */}
              <div
                data-mockup
                className={`relative will-change-transform ${
                  !isMobile && !isEven ? 'lg:order-2' : ''
                }`}
                style={{ opacity: 0 }}
              >
                {/* Browser frame */}
                <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#111318] shadow-2xl shadow-black/50">
                  {/* Title bar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1d25] border-b border-white/[0.06]">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-white/[0.05] rounded-md px-3 py-1 max-w-xs mx-auto">
                        <span className="text-[10px] text-white/30 font-mono">{project.title.toLowerCase().replace(/\s+/g, '-')}.fr</span>
                      </div>
                    </div>
                  </div>
                  {/* Screenshot */}
                  <div className="relative aspect-[16/10] overflow-hidden">
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
                      {project.features.items.map((feature, j) => {
                        const Icon = feature.icon;
                        return (
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
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      data-tag
                      className="text-xs text-white/50 border border-white/[0.1] bg-white/[0.03] px-4 py-1.5 rounded-full"
                      style={{ opacity: 0 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="h-8 sm:h-16" />
    </section>
  );
}
