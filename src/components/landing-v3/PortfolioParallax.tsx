'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import SplitTextReveal from './shared/SplitTextReveal';
import ScrollReveal from './shared/ScrollReveal';
import { useIsMobile } from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger, SplitText);

const projects = [
  {
    title: 'Boutique Mode',
    category: 'E-Commerce',
    tags: ['Next.js', 'Stripe', 'Prisma'],
    image: '/images/portfolio-ecommerce.jpg',
    description: "Experience d'achat immersive avec paiement integre et gestion de stock en temps reel.",
  },
  {
    title: 'Dashboard Analytics',
    category: 'Application Web',
    tags: ['React', 'D3.js', 'Node.js'],
    image: '/images/portfolio-dashboard.jpg',
    description: 'Tableau de bord temps reel avec visualisations de donnees avancees.',
  },
  {
    title: 'App Mobile Fitness',
    category: 'Mobile',
    tags: ['React Native', 'Firebase', 'Stripe'],
    image: '/images/portfolio-mobile.jpg',
    description: 'Application de suivi sportif avec coaching personnalise et paiements in-app.',
  },
  {
    title: 'Landing SaaS',
    category: 'Site Vitrine',
    tags: ['Next.js', 'GSAP', 'Tailwind'],
    image: '/images/portfolio-landing.jpg',
    description: "Page d'atterrissage haute conversion avec animations scroll-driven.",
  },
  {
    title: 'Blog Editorial',
    category: 'CMS',
    tags: ['Next.js', 'MDX', 'Vercel'],
    image: '/images/portfolio-blog.jpg',
    description: 'Plateforme editoriale performante avec gestion de contenu avancee.',
  },
];

export default function PortfolioParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile || !sectionRef.current) return;

    const section = sectionRef.current;
    const items = section.querySelectorAll<HTMLElement>('[data-project]');
    const imageWrappers = section.querySelectorAll<HTMLElement>('[data-image-wrapper]');
    const innerImages = section.querySelectorAll<HTMLElement>('[data-inner-image]');
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
        //  LAYER 1 — Image (slowest: ~30% of scroll speed)
        //  The image barely moves. This is what creates the "fixed" feel.
        // ═══════════════════════════════════════════════
        gsap.fromTo(innerImage, {
          yPercent: 25,
        }, {
          yPercent: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: imageWrapper,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // ═══════════════════════════════════════════════
        //  LAYER 2 — Title (medium: ~60% of scroll speed)
        //  Moves faster than image, slower than page.
        //  This is what makes the title "float" between layers.
        // ═══════════════════════════════════════════════
        gsap.to(textBlock, {
          yPercent: -70,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // ═══════════════════════════════════════════════
        //  LAYER 3 — Normal page scroll (100%)
        //  The browser handles this natively.
        // ═══════════════════════════════════════════════

        // ── Text reveal animations ──
        gsap.set(split.chars, { opacity: 0, y: 100, rotateX: -90 });
        gsap.set(category, { opacity: 0, y: 20 });
        gsap.set(desc, { opacity: 0, y: 30 });
        if (tags) gsap.set(tags, { opacity: 0, y: 15 });

        gsap.to(category, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: {
            trigger: textBlock,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        gsap.to(split.chars, {
          opacity: 1, y: 0, rotateX: 0,
          stagger: i % 2 === 0 ? 0.04 : -0.04,
          duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: textBlock,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });

        gsap.to(desc, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: textBlock,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });

        if (tags) {
          gsap.to(tags, {
            opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power2.out',
            scrollTrigger: {
              trigger: textBlock,
              start: 'top 70%',
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
    <>
      {/* ── Desktop: editorial parallax ── */}
      <section
        ref={sectionRef}
        id="projets"
        className={`relative bg-black ${isMobile ? 'hidden' : 'block'}`}
      >
        {/* Section header */}
        <div className="relative z-10 pt-32 pb-24 text-center">
          <p className="text-[#638BFF]/70 text-xs tracking-[0.4em] uppercase mb-4">Portfolio</p>
          <h2 className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl font-black text-white">
            Nos realisations
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
                className="relative overflow-hidden mx-6 lg:mx-12 rounded-xl"
                style={{ height: '80vh' }}
              >
                <div
                  data-inner-image
                  className="absolute inset-[-30%] will-change-transform"
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

                {/* Minimal vignette only */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 80% 70% at center, transparent 30%, rgba(0,0,0,0.35) 100%)',
                  }}
                />
              </div>

              {/* ── Text: overlaps the image bottom edge ── */}
              <div
                data-text-block
                className={`relative z-10 px-8 lg:px-20 max-w-7xl mx-auto will-change-transform ${
                  isEven ? '' : 'text-right'
                }`}
                style={{
                  marginTop: '-18vh',
                  perspective: 700,
                }}
              >
                {/* Category */}
                <p
                  data-category
                  className="text-[#638BFF] text-xs font-medium tracking-[0.4em] uppercase mb-4"
                >
                  {project.category}
                </p>

                {/* Title — the design element */}
                <h3
                  data-title
                  className="font-[family-name:var(--font-outfit)] font-black text-white leading-[0.9] tracking-tighter mb-6 lg:whitespace-nowrap"
                  style={{ fontSize: 'clamp(2.5rem, 7vw, 8rem)' }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  data-desc
                  className={`text-white/55 text-base lg:text-lg leading-relaxed mb-6 ${
                    isEven ? 'max-w-lg' : 'max-w-lg ml-auto'
                  }`}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div
                  data-tags
                  className={`flex flex-wrap gap-3 ${isEven ? '' : 'justify-end'}`}
                >
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      data-tag
                      className="text-xs text-white/50 border border-white/[0.12] px-4 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Spacer between projects */}
              <div style={{ height: '15vh' }} />
            </article>
          );
        })}

        <div className="h-16" />
      </section>

      {/* ── Mobile: stacked cards ── */}
      <section
        id={isMobile ? 'projets' : undefined}
        className={`py-20 bg-black ${isMobile ? 'block' : 'hidden'}`}
      >
        <div className="px-6 mb-16 text-center">
          <p className="text-[#638BFF]/80 text-xs font-semibold tracking-[0.4em] uppercase mb-4">Portfolio</p>
          <SplitTextReveal
            tag="h2"
            type="words"
            className="font-[family-name:var(--font-outfit)] text-3xl font-black text-white leading-tight"
          >
            Nos realisations
          </SplitTextReveal>
        </div>

        <div className="space-y-6 px-6">
          {projects.map((project, i) => (
            <ScrollReveal key={i} delay={i * 0.05} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <p className="text-[#638BFF] text-xs tracking-[0.2em] uppercase mb-2">{project.category}</p>
                  <h3 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="text-xs text-white/50 border border-white/[0.12] px-2.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
