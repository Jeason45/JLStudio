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

export default function PortfolioStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;

    const section = sectionRef.current;
    const projectEls = section.querySelectorAll<HTMLElement>('[data-project]');

    if (projectEls.length === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      projectEls.forEach((projectEl) => {
        projectEl.querySelectorAll<HTMLElement>('[style]').forEach((el) => {
          if (el.style.opacity === '0') el.style.opacity = '1';
        });
      });
      return;
    }

    const ctx = gsap.context(() => {
      // ── Stacking cards via GSAP pin (desktop only) ──
      if (!isMobile) {
        const cards = cardsContainerRef.current!.querySelectorAll<HTMLElement>('[data-card]');
        const totalCards = cards.length;

        cards.forEach((card, i) => {
          // Pin each card; last card doesn't need pinning
          if (i < totalCards - 1) {
            ScrollTrigger.create({
              trigger: card,
              start: `top ${60 + i * 20}px`,
              endTrigger: cardsContainerRef.current!,
              end: 'bottom bottom',
              pin: true,
              pinSpacing: false,
            });
          }

          // Slight scale down + dim as next cards stack on top
          if (i < totalCards - 1) {
            gsap.to(card, {
              scale: 0.95 - i * 0.02,
              opacity: 0.6,
              scrollTrigger: {
                trigger: cards[i + 1],
                start: 'top bottom',
                end: `top ${80 + i * 20}px`,
                scrub: true,
              },
            });
          }
        });
      }

      // ── Content animations ──
      projectEls.forEach((projectEl) => {
        const mockup = projectEl.querySelector<HTMLElement>('[data-mockup]');
        const titleEl = projectEl.querySelector<HTMLElement>('[data-title]');
        const categoryEl = projectEl.querySelector<HTMLElement>('[data-category]');
        const descEl = projectEl.querySelector<HTMLElement>('[data-desc]');
        const featureTitle = projectEl.querySelector<HTMLElement>('[data-feature-title]');
        const featureItems = projectEl.querySelectorAll<HTMLElement>('[data-feature-item]');
        const tagEls = projectEl.querySelectorAll<HTMLElement>('[data-tag]');

        if (mockup) {
          gsap.set(mockup, { opacity: 0, y: 40 });
          gsap.to(mockup, {
            opacity: 1, y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: projectEl,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        }

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
              start: 'top 80%',
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
              start: 'top 82%',
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
              start: 'top 78%',
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
              start: 'top 74%',
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
              start: 'top 70%',
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
              start: 'top 66%',
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
      <div className="relative z-10 pt-20 pb-8 md:pt-32 md:pb-16 text-center">
        <p className="text-[#638BFF]/70 text-xs tracking-[0.4em] uppercase mb-4">Portfolio</p>
        <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-black text-white">
          Nos réalisations
        </h2>
      </div>

      {/* Cards */}
      <div ref={cardsContainerRef} className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {projects.map((project, i) => (
          <div
            key={i}
            data-card
            data-project
            className={`
              rounded-2xl border border-white/[0.08] bg-[#111114]
              ${isMobile ? 'mb-6' : 'mb-8 grid grid-cols-[55%_45%]'}
            `}
            style={{
              zIndex: i + 1,
              boxShadow: isMobile ? undefined : '0 -4px 40px rgba(0,0,0,0.5)',
              height: isMobile ? undefined : '85vh',
            }}
          >
            {/* ── Image ── */}
            <div
              data-mockup
              className={`
                relative w-full overflow-hidden
                ${isMobile ? 'aspect-[4/3] rounded-t-2xl' : 'h-full rounded-l-2xl'}
              `}
              style={{ opacity: 0 }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority={i === 0}
              />
            </div>

            {/* ── Content ── */}
            <div className={`
              flex flex-col justify-center
              ${isMobile ? 'p-5 pb-6' : 'p-8 lg:p-12 xl:p-14'}
            `}>
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
                className="font-[family-name:var(--font-outfit)] font-black text-white leading-[0.95] tracking-tight mb-4"
                style={{
                  fontSize: isMobile ? 'clamp(1.75rem, 8vw, 2.5rem)' : 'clamp(1.75rem, 2.5vw, 2.75rem)',
                  perspective: 600,
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                data-desc
                className="text-white/55 text-sm sm:text-base leading-relaxed mb-5 max-w-md"
                style={{ opacity: 0 }}
              >
                {project.description}
              </p>

              {/* Features */}
              {project.features && (
                <div className="mb-5">
                  <p
                    data-feature-title
                    className="text-white/50 text-xs uppercase tracking-[0.2em] mb-3"
                    style={{ opacity: 0 }}
                  >
                    {project.features.title}
                  </p>
                  <div className="space-y-2">
                    {(isMobile ? project.features.items.slice(0, 3) : project.features.items).map((feature, j) => (
                      <div
                        key={j}
                        data-feature-item
                        className="flex items-center gap-3"
                        style={{ opacity: 0 }}
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
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    data-tag
                    className="text-[11px] text-white/50 border border-white/[0.1] bg-white/[0.03] px-3 py-1 rounded-full"
                    style={{ opacity: 0 }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-12 sm:h-20" />
    </section>
  );
}
