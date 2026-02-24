'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
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
    if (!sectionRef.current) return;

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
                className={`text-white/55 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 ${
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
                    className="text-xs text-white/50 border border-white/[0.12] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full"
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
