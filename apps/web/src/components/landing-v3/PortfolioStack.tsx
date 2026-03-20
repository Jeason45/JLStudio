'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
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
  X,
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

/* ── Fan config ── */
const FAN_ROTATIONS = [-16, -8, 0, 8, 16];
const FAN_Y_OFFSETS = [30, 10, 0, 10, 30];
const FAN_X_SPREAD = 220;
const MID = Math.floor(projects.length / 2);

/** Compute the fan position for a card */
function getFanPosition(i: number) {
  return {
    x: (i - MID) * FAN_X_SPREAD,
    y: FAN_Y_OFFSETS[i],
    rotation: FAN_ROTATIONS[i],
  };
}

export default function PortfolioStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [fanReady, setFanReady] = useState(false);
  const isMobile = useIsMobile();

  const closeCard = useCallback(() => setActiveCard(null), []);

  // ── Desktop: animate fan open when section enters viewport ──
  useEffect(() => {
    if (!sectionRef.current || isMobile) return;

    const section = sectionRef.current;
    const cards = section.querySelectorAll<HTMLElement>('[data-card]');

    if (cards.length === 0) return;

    // Start as a messy pile in the center (visible!)
    cards.forEach((card) => {
      gsap.set(card, {
        x: 0,
        y: 0,
        rotation: -5 + Math.random() * 10,
        scale: 0.75,
        opacity: 1,
      });
    });

    const ctx = gsap.context(() => {
      // When section enters viewport → fan opens
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          // Fan out with elastic bounce
          cards.forEach((card, i) => {
            const pos = getFanPosition(i);
            gsap.to(card, {
              x: pos.x,
              y: pos.y,
              rotation: pos.rotation,
              scale: 1,
              duration: 1.2,
              delay: i * 0.08,
              ease: 'elastic.out(0.8, 0.6)',
              onComplete: i === cards.length - 1 ? () => setFanReady(true) : undefined,
            });
          });

          // Section title
          const titleEl = section.querySelector<HTMLElement>('[data-section-title]');
          if (titleEl) {
            const split = SplitText.create(titleEl, { type: 'chars' });
            gsap.from(split.chars, {
              opacity: 0, y: 50, rotateX: -60,
              stagger: 0.04, duration: 0.8, ease: 'power3.out',
            });
          }
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      setFanReady(false);
    };
  }, [isMobile]);

  // Hover is handled entirely via CSS (same approach as builder)

  const handleCardClick = useCallback((index: number) => {
    if (!fanReady) return;
    setActiveCard(index);
  }, [fanReady]);

  /* ═══════════════════════════════════════════
     MOBILE: vertical cards
     ═══════════════════════════════════════════ */
  if (isMobile) {
    return (
      <section id="projets" className="relative bg-[#0a0a0a] py-16 px-4">
        <div className="text-center mb-10">
          <p className="text-[#638BFF]/70 text-xs tracking-[0.4em] uppercase mb-3">Portfolio</p>
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-black text-white">
            Nos réalisations
          </h2>
        </div>
        <div className="space-y-6 max-w-lg mx-auto">
          {projects.map((project, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.08] bg-[#111114] overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image src={project.image} alt={project.title} fill className="object-cover object-top" sizes="100vw" priority={i === 0} />
              </div>
              <div className="p-5">
                <p className="text-[#638BFF]/70 text-xs font-medium tracking-[0.3em] uppercase mb-2">{project.category}</p>
                <h3 className="font-[family-name:var(--font-outfit)] font-black text-white text-xl mb-3">{project.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-4">{project.description}</p>
                {project.features && (
                  <div className="mb-4">
                    <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-2">{project.features.title}</p>
                    <div className="space-y-1.5">
                      {project.features.items.slice(0, 3).map((f, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-[#638BFF]/[0.08] border border-[#638BFF]/15 flex items-center justify-center flex-shrink-0">
                            <Check className="w-2 h-2 text-[#638BFF]" />
                          </div>
                          <span className="text-xs text-white/65">{f.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] text-white/50 border border-white/[0.1] bg-white/[0.03] px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ═══════════════════════════════════════════
     DESKTOP: Fan effect — NO pin, NO scrub
     ═══════════════════════════════════════════ */
  return (
    <section
      ref={sectionRef}
      id="projets"
      aria-label="Portfolio"
      className="relative bg-[#0a0a0a] py-32"
      style={{ minHeight: '100vh' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,139,255,0.06) 0%, transparent 70%)' }}
      />

      {/* Section title */}
      <div className="text-center mb-20 relative z-[5]">
        <p className="text-[#638BFF]/70 text-xs tracking-[0.4em] uppercase mb-3">Portfolio</p>
        <h2
          data-section-title
          className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl font-black text-white"
        >
          Nos réalisations
        </h2>
      </div>

      {/* CSS hover rules — same approach as builder (pure CSS, no JS) */}
      <style jsx>{`
        .fan-card {
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0s;
        }
        .fan-card-inner {
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease;
        }
        .fan-container:hover .fan-card:not(:hover) .fan-card-inner {
          transform: scale(0.95);
          opacity: 0.45;
        }
        .fan-card:hover {
          z-index: 20 !important;
        }
        .fan-card:hover .fan-card-inner {
          transform: translateY(-40px) scale(1.08);
        }
        .fan-card:hover .fan-img img {
          transform: scale(1.1);
        }
      `}</style>

      {/* Fan cards container */}
      <div
        data-fan-container
        className="fan-container relative flex items-center justify-center"
        style={{ height: '480px' }}
      >
        {projects.map((project, i) => {
          const pos = getFanPosition(i);
          return (
            <div
              key={i}
              data-card
              className="fan-card absolute cursor-pointer"
              style={{
                width: '310px',
                height: '430px',
                padding: '15px',
                zIndex: i + 1,
                transformOrigin: 'center 150%',
                transform: `translateX(${pos.x}px) translateY(${pos.y}px) rotate(${pos.rotation}deg)`,
              }}
              onClick={() => handleCardClick(i)}
            >
              <div data-card-inner className="fan-card-inner w-full h-full rounded-2xl overflow-hidden border border-white/[0.1] bg-[#111114] shadow-2xl relative">
                <div className="fan-img relative h-[60%] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    style={{ transition: 'transform 0.7s ease' }}
                    sizes="280px"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[#638BFF]/70 text-[10px] font-medium tracking-[0.3em] uppercase mb-1.5">
                    {project.category}
                  </p>
                  <h3 className="font-[family-name:var(--font-outfit)] font-bold text-white text-lg leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.slice(0, 2).map((tag, j) => (
                      <span key={j} className="text-[9px] text-white/40 border border-white/[0.08] px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hint */}
      <div className="text-center mt-10 relative z-[5]">
        <p className="text-white/30 text-xs tracking-[0.15em] uppercase">
          Cliquer sur une carte pour en savoir plus
        </p>
      </div>

      {/* ── Expanded card overlay ── */}
      {activeCard !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={closeCard}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.3s_ease]" />
          <div
            className="relative z-10 w-[min(1200px,calc(100%-4rem))] h-[min(80vh,700px)] rounded-2xl overflow-hidden border border-white/[0.1] bg-[#111114] grid grid-cols-[55%_45%] shadow-2xl animate-[scaleIn_0.4s_cubic-bezier(0.16,1,0.3,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeCard}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.15] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative h-full overflow-hidden">
              <Image src={projects[activeCard].image} alt={projects[activeCard].title} fill className="object-cover object-top" sizes="55vw" />
            </div>
            <div className="flex flex-col justify-center p-10 lg:p-14">
              <p className="text-[#638BFF]/70 text-xs font-medium tracking-[0.4em] uppercase mb-3">
                {projects[activeCard].category}
              </p>
              <h3
                className="font-[family-name:var(--font-outfit)] font-black text-white leading-[0.95] tracking-tight mb-5"
                style={{ fontSize: 'clamp(2rem, 2.8vw, 3rem)' }}
              >
                {projects[activeCard].title}
              </h3>
              <p className="text-white/55 text-base leading-relaxed mb-6 max-w-md">
                {projects[activeCard].description}
              </p>
              {projects[activeCard].features && (
                <div className="mb-6">
                  <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-3">
                    {projects[activeCard].features!.title}
                  </p>
                  <div className="space-y-2.5">
                    {projects[activeCard].features!.items.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3">
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
                {projects[activeCard].tags.map((tag, j) => (
                  <span key={j} className="text-[11px] text-white/50 border border-white/[0.1] bg-white/[0.03] px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85) translateY(30px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </section>
  );
}
