'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitTextReveal from './shared/SplitTextReveal';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  initials: string;
  rating: number;
}

/* ── Row 1 : scrolls LEFT ── */
const row1: Testimonial[] = [
  {
    name: 'Run As One',
    role: 'Communauté running',
    quote:
      "Un site qui capture parfaitement l'énergie de notre communauté. Le design épuré et l'expérience mobile irréprochable nous ont permis de fédérer nos coureurs.",
    initials: 'RO',
    rating: 5,
  },
  {
    name: 'Propdesk',
    role: 'Prop trading',
    quote:
      "JL Studio a su traduire notre exigence de précision en un site professionnel et performant. L'interface inspire confiance dès le premier clic.",
    initials: 'PD',
    rating: 5,
  },
  {
    name: 'Al-Ilm',
    role: 'Plateforme éducative',
    quote:
      "Navigation fluide entre les sourates, accès aux hadiths authentiques et contenu éducatif riche. Un outil qui rend l'apprentissage accessible.",
    initials: 'AI',
    rating: 5,
  },
  {
    name: 'Flamme by Caubet',
    role: 'Location événementielle',
    quote:
      "Le CRM intégré a transformé notre gestion. Devis automatiques, signature électronique, calendrier de réservations — tout est fluide et pro.",
    initials: 'FC',
    rating: 5,
  },
  {
    name: 'Florent Food',
    role: 'Créateur culinaire',
    quote:
      "Ma plateforme de recettes est exactement ce que j'imaginais. Newsletter, abonnements premium, analytics — tout fonctionne parfaitement.",
    initials: 'FF',
    rating: 5,
  },
];

/* ── Row 2 : scrolls RIGHT ── */
const row2: Testimonial[] = [
  {
    name: 'Sophie M.',
    role: 'Photographe',
    quote:
      "Mon portfolio est enfin à la hauteur de mon travail. Les animations sont sublimes, le chargement ultra-rapide et mes clients adorent.",
    initials: 'SM',
    rating: 5,
  },
  {
    name: 'Thomas R.',
    role: 'Coach business',
    quote:
      "Le site a boosté ma crédibilité en ligne. En 2 mois, mes demandes de consultation ont triplé. Le ROI est indiscutable.",
    initials: 'TR',
    rating: 5,
  },
  {
    name: 'Maison Delvaux',
    role: 'Restaurant gastronomique',
    quote:
      "Un site élégant qui reflète notre identité. La réservation en ligne a simplifié notre quotidien et nos clients apprécient l'expérience.",
    initials: 'MD',
    rating: 5,
  },
  {
    name: 'Lucas B.',
    role: 'Agence immobilière',
    quote:
      "Nos biens sont mis en valeur comme jamais. Le design premium et les performances du site ont clairement fait la différence face à la concurrence.",
    initials: 'LB',
    rating: 5,
  },
  {
    name: 'Claire D.',
    role: 'E-commerce mode',
    quote:
      "La boutique en ligne est magnifique et les conversions ont explosé. Paiement fluide, tunnel optimisé — exactement ce qu'il nous fallait.",
    initials: 'CD',
    rating: 5,
  },
];

/* ── Stars component ── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-white/15'}`}
        />
      ))}
    </div>
  );
}

/* ── Single testimonial card ── */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[340px] sm:w-[400px] bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 sm:p-7 hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-500 group">
      {/* Stars */}
      <Stars count={t.rating} />

      {/* Quote */}
      <blockquote className="mt-4 mb-6 text-white/60 text-sm leading-relaxed group-hover:text-white/75 transition-colors duration-500">
        <p>&ldquo;{t.quote}&rdquo;</p>
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#638BFF]/[0.1] border border-[#638BFF]/20 flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-bold text-[#638BFF]">{t.initials}</span>
        </div>
        <div>
          <cite className="text-sm font-semibold text-white not-italic block leading-tight">
            {t.name}
          </cite>
          <p className="text-[11px] text-white/40">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Marquee row: duplicated for seamless loop ── */
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

    // Each item set occupies 50% of the track (since we duplicate once)
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

  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className="flex gap-5 w-max will-change-transform">
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.initials}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

/* ── Main section ── */
export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Background parallax
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

      // Fade in the marquee rows on scroll
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

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-20 px-6">
          <p className="text-[#638BFF]/70 text-xs tracking-[0.4em] uppercase mb-4">
            Témoignages
          </p>
          <SplitTextReveal
            tag="h2"
            type="words"
            className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight"
          >
            Ils nous font confiance
          </SplitTextReveal>
          <p className="mt-4 text-white/40 text-sm max-w-md mx-auto">
            Des projets livrés, des clients satisfaits.
          </p>
        </div>

        {/* Marquee rows — full width, no max-w container */}
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
