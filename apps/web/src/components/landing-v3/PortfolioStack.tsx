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

/* ── Stacking cards config ── */
const CARD_HEIGHT = 75; // vh
const CARD_TOP_START = 12; // vh — where the first card sits
const CARD_STACK_OFFSET = 3; // vh — offset between stacked cards

export default function PortfolioStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const cards = section.querySelectorAll<HTMLElement>('[data-card]');

    if (cards.length === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cards.forEach((card) => {
        card.querySelectorAll<HTMLElement>('[style]').forEach((el) => {
          if (el.style.opacity === '0') el.style.opacity = '1';
        });
      });
      return;
    }

    const ctx = gsap.context(() => {
      const totalCards = cards.length;

      // ── Master timeline ──
      const tl = gsap.timeline();

      // Initial states: all cards below viewport except first
      cards.forEach((card, i) => {
        if (i === 0) {
          // First card already in place
          gsap.set(card, { y: 0 });
        } else {
          // Other cards start below the section
          gsap.set(card, { y: window.innerHeight });
        }
      });

      // Animate content of first card on load
      const firstTitle = cards[0].querySelector<HTMLElement>('[data-title]');
      if (firstTitle) {
        const split = SplitText.create(firstTitle, { type: 'chars' });
        gsap.set(split.chars, { opacity: 0, y: 40, rotateX: -50 });
        tl.to(split.chars, {
          opacity: 1, y: 0, rotateX: 0,
          stagger: 0.03, duration: 0.6, ease: 'power3.out',
        }, 0);
      }

      // Breathing room for first card
      tl.to({}, { duration: 1 }, 0.5);

      // For each subsequent card: slide it up to its stacked position
      for (let i = 1; i < totalCards; i++) {
        const stackY = i * CARD_STACK_OFFSET; // each card sits a bit lower (in vh)
        const stackYpx = `${stackY}vh`;

        const cardStart = 1 + (i - 1) * 2;

        // ── Scale down previous card slightly to create depth ──
        tl.to(cards[i - 1], {
          scale: 1 - i * 0.03,
          duration: 1.2,
          ease: 'power2.inOut',
        }, cardStart);

        // ── Slide new card up from bottom to its stacked position ──
        tl.to(cards[i], {
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
        }, cardStart);

        // ── Animate content of new card ──
        const title = cards[i].querySelector<HTMLElement>('[data-title]');
        const category = cards[i].querySelector<HTMLElement>('[data-category]');
        const desc = cards[i].querySelector<HTMLElement>('[data-desc]');
        const featureItems = cards[i].querySelectorAll<HTMLElement>('[data-feature-item]');
        const featureTitle = cards[i].querySelector<HTMLElement>('[data-feature-title]');
        const tagEls = cards[i].querySelectorAll<HTMLElement>('[data-tag]');

        if (category) {
          gsap.set(category, { opacity: 0, y: 15 });
          tl.to(category, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, cardStart + 0.6);
        }

        if (title) {
          const split = SplitText.create(title, { type: 'chars' });
          gsap.set(split.chars, { opacity: 0, y: isMobile ? 30 : 50, rotateX: isMobile ? -30 : -60 });
          tl.to(split.chars, {
            opacity: 1, y: 0, rotateX: 0,
            stagger: 0.03, duration: 0.7, ease: 'power3.out',
          }, cardStart + 0.7);
        }

        if (desc) {
          gsap.set(desc, { opacity: 0, y: 20 });
          tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, cardStart + 0.9);
        }

        if (featureTitle) {
          gsap.set(featureTitle, { opacity: 0, y: 15 });
          tl.to(featureTitle, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, cardStart + 1.0);
        }

        if (featureItems.length > 0) {
          gsap.set(featureItems, { opacity: 0, x: -15 });
          tl.to(featureItems, {
            opacity: 1, x: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out',
          }, cardStart + 1.1);
        }

        if (tagEls.length > 0) {
          gsap.set(tagEls, { opacity: 0, y: 10 });
          tl.to(tagEls, {
            opacity: 1, y: 0, stagger: 0.04, duration: 0.4, ease: 'power2.out',
          }, cardStart + 1.2);
        }

        // Breathing room before next card
        if (i < totalCards - 1) {
          tl.to({}, { duration: 0.8 });
        }
      }

      // ── Pin the entire section ──
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${totalCards * (isMobile ? 800 : 1000)}`,
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
      className="relative h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* Section title */}
      <div className="absolute top-0 left-0 right-0 z-[20] pt-5 sm:pt-8 text-center pointer-events-none">
        <p className="text-[#638BFF]/70 text-xs tracking-[0.4em] uppercase mb-2">Portfolio</p>
        <h2 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl md:text-4xl font-black text-white">
          Nos réalisations
        </h2>
      </div>

      {/* Stacking cards */}
      {projects.map((project, i) => (
        <div
          key={i}
          data-card
          className={`
            absolute left-1/2 -translate-x-1/2 rounded-2xl overflow-hidden
            border border-white/[0.08] bg-[#111114]
            ${isMobile ? 'flex flex-col' : 'grid grid-cols-[55%_45%]'}
          `}
          style={{
            top: `${CARD_TOP_START + i * CARD_STACK_OFFSET}vh`,
            width: isMobile ? 'calc(100% - 2rem)' : 'min(1400px, calc(100% - 4rem))',
            height: `${CARD_HEIGHT}vh`,
            zIndex: i + 1,
            boxShadow: '0 -8px 50px rgba(0,0,0,0.6), 0 2px 20px rgba(0,0,0,0.4)',
          }}
        >
          {/* ── Image ── */}
          <div className={`relative overflow-hidden ${isMobile ? 'h-[40%]' : 'h-full'}`}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
              sizes={isMobile ? '100vw' : '55vw'}
              priority={i === 0}
            />
          </div>

          {/* ── Content ── */}
          <div className={`
            flex flex-col justify-center bg-[#111114]
            ${isMobile ? 'flex-1 p-5' : 'p-8 lg:p-12 xl:p-14'}
          `}>
            <p
              data-category
              className="text-[#638BFF]/70 text-xs font-medium tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-3"
            >
              {project.category}
            </p>

            <h3
              data-title
              className="font-[family-name:var(--font-outfit)] font-black text-white leading-[0.95] tracking-tight mb-4"
              style={{
                fontSize: isMobile ? 'clamp(1.5rem, 7vw, 2rem)' : 'clamp(1.75rem, 2.5vw, 2.75rem)',
              }}
            >
              {project.title}
            </h3>

            <p
              data-desc
              className="text-white/55 text-sm sm:text-base leading-relaxed mb-5 max-w-md"
            >
              {project.description}
            </p>

            {project.features && (
              <div className="mb-5">
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

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, j) => (
                <span
                  key={j}
                  data-tag
                  className="text-[11px] text-white/50 border border-white/[0.1] bg-white/[0.03] px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
