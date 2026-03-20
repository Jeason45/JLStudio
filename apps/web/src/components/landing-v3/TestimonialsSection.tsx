'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitTextReveal from './shared/SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   TRUSTPILOT DATA
   ═══════════════════════════════════════════ */
const TRUSTPILOT_URL = 'https://fr.trustpilot.com/review/jlstudio.dev';
const TRUST_SCORE = 4.1;
const TOTAL_REVIEWS = 5;

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  date: string;
  verified: boolean;
}

/* ── Real Trustpilot reviews ── */
const realReviews: Testimonial[] = [
  {
    name: 'Houda Zeggouti',
    role: 'Cliente',
    quote:
      "Rapide et efficace dans l'élaboration du projet, JL Studio transforme les idées en résultats concrets et de qualité. Je recommande vivement.",
    rating: 5,
    date: '6 mars 2026',
    verified: true,
  },
  {
    name: 'Carla Goncalves',
    role: 'Plateforme éducative',
    quote:
      "Une grande écoute et une valeur ajoutée significative grâce à des propositions professionnelles. Le résultat dépasse nos attentes.",
    rating: 5,
    date: '3 mars 2026',
    verified: true,
  },
  {
    name: 'Hinde',
    role: 'Application sur mesure',
    quote:
      "Un développeur compétent et à l'écoute qui a su concevoir une application sur mesure. Design soigné, attention au détail et réactivité exemplaire.",
    rating: 5,
    date: '3 mars 2026',
    verified: true,
  },
  {
    name: 'Florent Carivenc',
    role: 'Créateur culinaire',
    quote:
      "Très professionnel, je recommande vraiment. Le site correspond parfaitement à ce que j'attendais, livré dans les temps avec un suivi impeccable.",
    rating: 5,
    date: '2 mars 2026',
    verified: true,
  },
  {
    name: 'Tib',
    role: 'Site vitrine & CRM',
    quote:
      "Top qualité ! Je recommande sans hésitations. Le site et le CRM livrés sont exactement ce dont nous avions besoin, fiables et bien pensés.",
    rating: 5,
    date: '2 mars 2026',
    verified: true,
  },
];

/* ── Additional testimonials for marquee density ── */
const extraReviews: Testimonial[] = [
  {
    name: 'Run As One',
    role: 'Communauté running',
    quote:
      "Un site qui capture parfaitement l'énergie de notre communauté. Design épuré, performances rapides et expérience mobile irréprochable.",
    rating: 5,
    date: 'Projet livré',
    verified: false,
  },
  {
    name: 'Propdesk',
    role: 'Prop trading',
    quote:
      "JL Studio a traduit notre exigence de précision en un site professionnel et performant. L'interface inspire confiance dès le premier clic.",
    rating: 5,
    date: 'Projet livré',
    verified: false,
  },
  {
    name: 'Al-Ilm',
    role: 'Plateforme éducative',
    quote:
      "Navigation fluide, accès aux hadiths authentiques et contenu riche. Un outil qui rend l'apprentissage accessible et agréable.",
    rating: 5,
    date: 'Projet livré',
    verified: false,
  },
];

const row1 = [...realReviews.slice(0, 3), ...extraReviews.slice(0, 2)];
const row2 = [...realReviews.slice(3), ...extraReviews.slice(2), ...realReviews.slice(0, 2)];

/* ═══════════════════════════════════════════
   TRUSTPILOT STAR (green Trustpilot style)
   ═══════════════════════════════════════════ */
function TrustpilotStar({ filled }: { filled: boolean }) {
  return (
    <div
      className="w-[22px] h-[22px] flex items-center justify-center"
      style={{ background: filled ? '#00b67a' : '#dcdce6', clipPath: 'none' }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={filled ? '#fff' : '#fff'}
        />
      </svg>
    </div>
  );
}

function TrustpilotStars({ count }: { count: number }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <TrustpilotStar key={i} filled={i < count} />
      ))}
    </div>
  );
}

/* ── Trustpilot mini badge for cards ── */
function CardStars({ count }: { count: number }) {
  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="w-[18px] h-[18px] flex items-center justify-center"
          style={{ background: i < count ? '#00b67a' : '#dcdce6' }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="#fff"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   TRUSTBOX WIDGET (custom)
   ═══════════════════════════════════════════ */
function TrustBox() {
  return (
    <a
      href={TRUSTPILOT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-4 sm:gap-6 bg-white/[0.05] backdrop-blur-md border border-white/[0.1] rounded-2xl px-6 sm:px-8 py-4 sm:py-5 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-500 group"
    >
      {/* Score */}
      <div className="text-center">
        <p className="text-white font-bold text-2xl sm:text-3xl leading-none">{TRUST_SCORE}</p>
        <p className="text-white/40 text-[10px] mt-1">sur 5</p>
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-white/[0.1]" />

      {/* Stars + info */}
      <div>
        <TrustpilotStars count={Math.round(TRUST_SCORE)} />
        <p className="text-white/50 text-xs mt-1.5">
          Basé sur <span className="text-white/70 font-medium">{TOTAL_REVIEWS} avis</span>
        </p>
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-white/[0.1] hidden sm:block" />

      {/* Trustpilot logo */}
      <div className="hidden sm:flex items-center gap-1.5">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="#00b67a"
          />
        </svg>
        <span className="text-white font-semibold text-sm tracking-tight">Trustpilot</span>
      </div>

      {/* Arrow */}
      <svg className="w-4 h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-300 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIAL CARD
   ═══════════════════════════════════════════ */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[340px] sm:w-[400px] bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 sm:p-7 hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-500 group">
      {/* Header: stars + verified badge */}
      <div className="flex items-center justify-between mb-4">
        <CardStars count={t.rating} />
        {t.verified && (
          <span className="text-[10px] text-[#00b67a]/80 font-medium flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Vérifié
          </span>
        )}
      </div>

      {/* Quote */}
      <blockquote className="mb-5 text-white/60 text-sm leading-relaxed group-hover:text-white/75 transition-colors duration-500">
        <p>&ldquo;{t.quote}&rdquo;</p>
      </blockquote>

      {/* Author + date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#00b67a]/[0.12] border border-[#00b67a]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-bold text-[#00b67a]">
              {t.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div>
            <cite className="text-sm font-semibold text-white not-italic block leading-tight">
              {t.name}
            </cite>
            <p className="text-[11px] text-white/35">{t.role}</p>
          </div>
        </div>
        <p className="text-[10px] text-white/25">{t.date}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MARQUEE ROW
   ═══════════════════════════════════════════ */
function MarqueeRow({
  items,
  direction,
  speed,
}: {
  items: Testimonial[];
  direction: 'left' | 'right';
  speed: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const xPercent = direction === 'left' ? -50 : 0;
    const xPercentEnd = direction === 'left' ? 0 : -50;

    gsap.set(track, { xPercent });

    tweenRef.current = gsap.to(track, {
      xPercent: xPercentEnd,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [direction, speed]);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.8, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: 'power2.out' });
    }
  };

  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className="flex gap-5 w-max will-change-transform">
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════ */
export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      const rows = sectionRef.current!.querySelectorAll<HTMLElement>('[data-marquee-row]');
      rows.forEach((row, i) => {
        gsap.from(row, {
          opacity: 0,
          y: 40,
          duration: 1,
          delay: i * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="temoignages"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-36 overflow-hidden bg-black"
    >
      {/* Background image with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-[-15%] will-change-transform">
          <Image
            src="/images/testimonials-bg.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 px-6">
          <p className="text-[#00b67a]/70 text-xs tracking-[0.4em] uppercase mb-4">
            Avis clients
          </p>
          <SplitTextReveal
            tag="h2"
            type="words"
            className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight"
          >
            Ils nous font confiance
          </SplitTextReveal>
        </div>

        {/* TrustBox widget */}
        <div className="flex justify-center mb-14 sm:mb-20 px-6">
          <TrustBox />
        </div>

        {/* Marquee rows */}
        <div className="space-y-5">
          <div data-marquee-row>
            <MarqueeRow items={row1} direction="left" speed={45} />
          </div>
          <div data-marquee-row>
            <MarqueeRow items={row2} direction="right" speed={50} />
          </div>
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 z-20 pointer-events-none bg-gradient-to-r from-black to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 z-20 pointer-events-none bg-gradient-to-l from-black to-transparent" />
    </section>
  );
}
