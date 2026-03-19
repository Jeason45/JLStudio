'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useIsMobile } from '@/hooks/use-mobile'
import { elementProps } from '@/lib/elementHelpers'
import type { SectionConfig } from '@/types/site'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface ProcessItem {
  id: string
  title: string
  description: string
  badge?: string
  details?: string
  image?: string
}

export function JlstudioProcessTimeline({
  config,
  isEditing,
}: {
  config: SectionConfig
  isEditing?: boolean
}) {
  const content = (config.content ?? {}) as Record<string, unknown>
  const items = (content.items as ProcessItem[]) ?? []
  const eyebrow = content.eyebrow as string | undefined
  const title = content.title as string | undefined
  const subtitle = content.subtitle as string | undefined
  const accent = config.style?.accentColor ?? '#638BFF'
  const isPreview = !isEditing

  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const lineProgressRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    // ScrollTrigger doesn't work in the builder's nested scroll container.
    // Animations only run on the final deployed site (apps/web).
    // In the builder, content is shown statically without animations.
    if (!sectionRef.current || !isPreview) return

    // Detect builder environment: if we're inside a nested scrollable container
    // (not the window), skip GSAP animations entirely
    const el = sectionRef.current
    let parent = el.parentElement
    let isInBuilder = false
    while (parent) {
      const style = window.getComputedStyle(parent)
      if ((style.overflow === 'auto' || style.overflow === 'scroll' || style.overflowY === 'auto' || style.overflowY === 'scroll') && parent !== document.documentElement) {
        isInBuilder = true
        break
      }
      parent = parent.parentElement
    }
    if (isInBuilder) return

    const section = sectionRef.current
    const line = lineRef.current
    const lineProgress = lineProgressRef.current
    const stepEls = section.querySelectorAll<HTMLElement>('[data-step]')
    const numberEls = section.querySelectorAll<HTMLElement>('[data-number]')
    const titleEls = section.querySelectorAll<HTMLElement>('[data-title]')
    const descEls = section.querySelectorAll<HTMLElement>('[data-desc]')
    const detailEls = section.querySelectorAll<HTMLElement>('[data-detail]')
    const nodeEls = section.querySelectorAll<HTMLElement>('[data-node]')
    const nodeInners = section.querySelectorAll<HTMLElement>('[data-node-inner]')

    if (stepEls.length === 0) return

    // Set line height to stop at the last step's node center
    const lastStep = stepEls[stepEls.length - 1]
    if (lastStep && line) {
      const lineHeight = lastStep.offsetTop + lastStep.offsetHeight / 2
      line.style.height = `${lineHeight}px`
    }

    // Skip animations if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      titleEls.forEach((t) => {
        const s = SplitText.create(t, { type: 'chars' })
        gsap.set(s.chars, { opacity: 1, y: 0, rotateX: 0 })
      })
      numberEls.forEach((n) => gsap.set(n, { opacity: 1, y: 0 }))
      descEls.forEach((d) => gsap.set(d, { opacity: 1, y: 0 }))
      detailEls.forEach((d) => gsap.set(d, { opacity: 1, y: 0 }))
      nodeEls.forEach((n) => gsap.set(n, { scale: 1, opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }))
      if (lineProgress) gsap.set(lineProgress, { scaleY: 1 })
      return
    }

    const ctx = gsap.context(() => {
      const splitTitles = Array.from(titleEls).map((el) =>
        SplitText.create(el, { type: 'chars' })
      )

      // Progress line grows as you scroll
      if (lineProgress) {
        gsap.set(lineProgress, { scaleY: 0, transformOrigin: 'top' })
        gsap.to(lineProgress, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: line,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: true,
          },
        })
      }

      // Per-step animations
      stepEls.forEach((stepEl, i) => {
        const number = numberEls[i]
        const desc = descEls[i]
        const detail = detailEls[i]
        const node = nodeEls[i]
        const nodeInner = nodeInners[i]
        const split = splitTitles[i]
        const isLeft = i % 2 === 0

        // Initial states — GSAP sets opacity:0, will animate to 1 on scroll
        gsap.set(split.chars, { opacity: 0, y: isMobile ? 30 : 50, rotateX: isMobile ? -30 : -60 })
        gsap.set(desc, { opacity: 0, y: 30 })
        if (detail) gsap.set(detail, { opacity: 0, y: 20 })
        gsap.set(number, { opacity: 0, y: 20 })
        gsap.set(node, { scale: 0, opacity: 0 })

        // Parallax: number moves slower (depth effect)
        gsap.to(number, {
          yPercent: isMobile ? -10 : -25,
          ease: 'none',
          scrollTrigger: { trigger: stepEl, start: 'top bottom', end: 'bottom top', scrub: true },
        })

        // Parallax: title moves at medium speed
        gsap.to(titleEls[i], {
          yPercent: isMobile ? -8 : -15,
          ease: 'none',
          scrollTrigger: { trigger: stepEl, start: 'top bottom', end: 'bottom top', scrub: true },
        })

        // Parallax: description at slight speed
        gsap.to(desc, {
          yPercent: isMobile ? -3 : -5,
          ease: 'none',
          scrollTrigger: { trigger: stepEl, start: 'top bottom', end: 'bottom top', scrub: true },
        })

        // Node scale up + glow
        gsap.to(node, {
          scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)',
          scrollTrigger: { trigger: stepEl, start: 'top 70%', toggleActions: 'play none none reverse' },
        })

        // Node glow pulse
        if (nodeInner) {
          gsap.to(nodeInner, {
            boxShadow: `0 0 20px ${accent}99, 0 0 40px ${accent}33`,
            duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: stepEl, start: 'top 60%', toggleActions: 'play none none reverse' },
          })
        }

        // Number fade in
        gsap.to(number, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: stepEl, start: 'top 75%', toggleActions: 'play none none reverse' },
        })

        // Title chars cascade
        gsap.to(split.chars, {
          opacity: 1, y: 0, rotateX: 0,
          stagger: isMobile ? 0.03 : (isLeft ? 0.04 : -0.04),
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: stepEl, start: 'top 68%', toggleActions: 'play none none reverse' },
        })

        // Description slides in
        gsap.to(desc, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: stepEl, start: 'top 62%', toggleActions: 'play none none reverse' },
        })

        // Detail slides in
        if (detail) {
          gsap.to(detail, {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: stepEl, start: 'top 58%', toggleActions: 'play none none reverse' },
          })
        }
      })
    }, sectionRef)

    return () => { ctx.revert() }
  }, [isMobile, isPreview, accent])

  // Grid background nodes
  const gridNodes = [
    { top: '12%', left: '20%', delay: '0s', size: '3px' },
    { top: '28%', left: '50%', delay: '1.5s', size: '4px' },
    { top: '45%', left: '80%', delay: '0.8s', size: '3px' },
    { top: '65%', left: '15%', delay: '2.2s', size: '4px' },
    { top: '78%', left: '60%', delay: '0.4s', size: '3px' },
    { top: '35%', left: '35%', delay: '3s', size: '2px' },
    { top: '55%', left: '70%', delay: '1.8s', size: '3px' },
    { top: '88%', left: '40%', delay: '2.8s', size: '2px' },
    { top: '18%', left: '75%', delay: '1.2s', size: '3px' },
    { top: '72%', left: '90%', delay: '0.6s', size: '2px' },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      style={{ fontFamily: 'var(--font-body, inherit)' }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(${accent}10 1px, transparent 1px),
            linear-gradient(90deg, ${accent}10 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute inset-0 overflow-hidden">
          {gridNodes.map((node, i) => (
            <div key={i} className="absolute rounded-full" style={{
              top: node.top, left: node.left,
              width: node.size, height: node.size,
              background: accent,
              boxShadow: `0 0 8px 2px ${accent}99, 0 0 20px 6px ${accent}33`,
              animation: `pulse-node 3s ease-in-out ${node.delay} infinite`,
            }} />
          ))}
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 right-0 h-[1px]" style={{
            background: `linear-gradient(90deg, transparent, ${accent}26, transparent)`,
            animation: 'scan-line 8s ease-in-out infinite',
          }} />
        </div>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.9) 100%)',
        }} />
      </div>

      <style>{`
        @keyframes pulse-node {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.8); }
        }
        @keyframes scan-line {
          0% { top: -2%; }
          100% { top: 102%; }
        }
      `}</style>

      {/* Section header */}
      <div className="relative z-10 pt-20 pb-12 md:pt-32 md:pb-24 text-center">
        {eyebrow && (
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: `${accent}b3` }}>
            {eyebrow}
          </p>
        )}
        {title && (
          <h2
            {...elementProps(config.id, 'title', 'heading')}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: 'var(--font-heading, inherit)' }}
          >
            {title}
          </h2>
        )}
        {subtitle && (
          <p
            {...elementProps(config.id, 'subtitle', 'text')}
            className="text-white/40 text-base mt-4 max-w-xl mx-auto"
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Timeline container */}
      <div className="relative z-10 pb-20 md:pb-32">
        {/* Vertical line */}
        <div
          ref={lineRef}
          className="absolute top-0 w-[1px]"
          style={{
            left: isMobile ? '24px' : '50%',
            transform: isMobile ? 'none' : 'translateX(-50%)',
          }}
        >
          <div className="w-full h-full bg-white/[0.06]" />
          <div
            ref={lineProgressRef}
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `linear-gradient(to bottom, ${accent}99, ${accent}66, ${accent}99)`,
            }}
          />
        </div>

        {/* Steps */}
        {items.map((item, i) => {
          const isLeft = i % 2 === 0
          const stepNumber = String(i + 1).padStart(2, '0')

          return (
            <div key={item.id} data-step className="relative py-16 md:py-24 lg:py-28 xl:py-32">
              {/* Node on the line */}
              <div
                data-node
                className="absolute top-1/2 z-20"
                style={{
                  left: isMobile ? '24px' : '50%',
                  transform: 'translate(-50%, -50%) scale(1)',
                }}
              >
                <div
                  data-node-inner
                  className="w-4 h-4 rounded-full border-2"
                  style={{
                    backgroundColor: accent,
                    borderColor: accent,
                    boxShadow: `0 0 20px ${accent}99`,
                  }}
                />
              </div>

              {/* Content */}
              {isMobile ? (
                <div className="relative pl-14 pr-6" style={{ perspective: 600 }}>
                  <span
                    data-number
                    className="text-5xl font-black block mb-2 leading-none will-change-transform"
                    style={{ color: `${accent}33`, fontFamily: 'var(--font-heading, inherit)' }}
                  >
                    {stepNumber}
                  </span>
                  <h3
                    data-title
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    className="text-3xl sm:text-4xl font-black text-white mb-4 leading-[0.95] tracking-tight relative will-change-transform"
                    style={{ fontFamily: 'var(--font-heading, inherit)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    data-desc
                    {...elementProps(config.id, `items.${i}.description`, 'text')}
                    className="text-white/60 text-sm sm:text-base leading-relaxed mb-3 relative will-change-transform"
                  >
                    {item.description}
                  </p>
                  {item.details && (
                    <p
                      data-detail
                      className="text-xs sm:text-sm tracking-wide relative"
                      style={{ color: `${accent}8c` }}
                    >
                      {item.details}
                    </p>
                  )}
                </div>
              ) : (
                <div className="relative max-w-7xl mx-auto px-8 grid grid-cols-2 gap-16 items-center">
                  <div
                    className={`relative ${isLeft ? 'text-right pr-16' : 'text-left pl-16 order-2'}`}
                    style={{ perspective: 600 }}
                  >
                    <span
                      data-number
                      className="text-5xl lg:text-6xl font-black block mb-3 leading-none will-change-transform"
                      style={{ color: `${accent}33`, fontFamily: 'var(--font-heading, inherit)' }}
                    >
                      {stepNumber}
                    </span>
                    <h3
                      data-title
                      {...elementProps(config.id, `items.${i}.title`, 'heading')}
                      className="text-3xl md:text-4xl lg:text-4xl font-black text-white mb-5 leading-[0.95] tracking-tight relative will-change-transform lg:whitespace-nowrap"
                      style={{ fontFamily: 'var(--font-heading, inherit)' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      data-desc
                      {...elementProps(config.id, `items.${i}.description`, 'text')}
                      className="text-white/60 text-base lg:text-lg leading-relaxed mb-4 relative will-change-transform"
                    >
                      {item.description}
                    </p>
                    {item.details && (
                      <p
                        data-detail
                        className="text-sm tracking-wide relative"
                        style={{ color: `${accent}8c` }}
                      >
                        {item.details}
                      </p>
                    )}
                  </div>
                  <div className={isLeft ? '' : 'order-1'} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
