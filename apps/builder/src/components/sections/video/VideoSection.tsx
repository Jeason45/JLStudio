'use client'
import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { VideoContent, VideoProvider } from '@/types/sections'
import { elementProps } from '@/lib/elementHelpers'
import { Play } from 'lucide-react'
import type { SectionMeta } from '@/components/sections'

const UNIVERSE_CONFIGS = {
  startup: { bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-indigo-600', videoBg: 'bg-zinc-100', playBtn: 'bg-indigo-600 text-white' },
  corporate: { bg: 'bg-slate-900', text: 'text-white', sub: 'text-slate-400', eyebrow: 'text-blue-400', videoBg: 'bg-slate-800', playBtn: 'bg-blue-600 text-white' },
  luxe: { bg: 'bg-white', text: 'text-zinc-800', sub: 'text-zinc-500', eyebrow: 'text-amber-700', videoBg: 'bg-zinc-50', playBtn: 'bg-amber-700 text-white' },
  creative: { bg: 'bg-amber-50', text: 'text-zinc-900', sub: 'text-zinc-600', eyebrow: 'text-zinc-900', videoBg: 'bg-white border-2 border-zinc-900', playBtn: 'bg-zinc-900 text-white' },
  ecommerce: { bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-emerald-600', videoBg: 'bg-zinc-50', playBtn: 'bg-emerald-600 text-white' },
  glass: { bg: 'bg-zinc-950', text: 'text-white', sub: 'text-zinc-400', eyebrow: 'text-purple-400', videoBg: 'bg-white/5 border border-white/10', playBtn: 'bg-purple-600 text-white' },
} as const

type Universe = keyof typeof UNIVERSE_CONFIGS

function parseVariant(variant: string): { universe: Universe; layout: 'full' | 'feature' } {
  const parts = variant.split('-')
  const layout = parts[parts.length - 1] === 'feature' ? 'feature' : 'full'
  const universe = (parts.slice(0, -1).join('-') || 'startup') as Universe
  return { universe: universe in UNIVERSE_CONFIGS ? universe : 'startup', layout }
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
  return match?.[1] ?? null
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match?.[1] ?? null
}

function VideoEmbed({ content, uConfig }: { content: VideoContent; uConfig: typeof UNIVERSE_CONFIGS[Universe] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  // Lazy load via IntersectionObserver
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const provider = content.provider ?? 'youtube'

  return (
    <div ref={containerRef} className={cn('relative aspect-video rounded-lg overflow-hidden', uConfig.videoBg)}>
      {!visible ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className={cn('w-16 h-16 rounded-full flex items-center justify-center', uConfig.playBtn)}>
            <Play className="w-6 h-6 ml-1" />
          </div>
        </div>
      ) : provider === 'youtube' ? (
        <iframe
          src={`https://www.youtube.com/embed/${getYouTubeId(content.url) ?? ''}?${content.autoplay ? 'autoplay=1&' : ''}${content.loop ? 'loop=1&' : ''}${!content.controls ? 'controls=0&' : ''}`}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Video"
        />
      ) : provider === 'vimeo' ? (
        <iframe
          src={`https://player.vimeo.com/video/${getVimeoId(content.url) ?? ''}?${content.autoplay ? 'autoplay=1&' : ''}${content.loop ? 'loop=1&' : ''}`}
          className="w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen
          title="Video"
        />
      ) : (
        <video
          src={content.url}
          poster={content.poster}
          autoPlay={content.autoplay}
          loop={content.loop}
          controls={content.controls ?? true}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}

export function VideoSection({ config }: { config: SectionConfig; isEditing?: boolean }) {
  const content = config.content as VideoContent
  const { universe, layout } = parseVariant(config.variant || 'startup-full')
  const uConfig = UNIVERSE_CONFIGS[universe]

  return (
    <section className={cn(uConfig.bg, 'py-16 md:py-24')}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {layout === 'feature' ? (
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text */}
            <div>
              {content.eyebrow && (
                <span {...elementProps(config.id, 'eyebrow', 'text')} className={cn('text-xs font-semibold uppercase tracking-widest', uConfig.eyebrow)}>
                  {content.eyebrow}
                </span>
              )}
              {content.title && (
                <h2 {...elementProps(config.id, 'title', 'heading')} className={cn('text-3xl md:text-4xl font-bold mt-3', uConfig.text)}>
                  {content.title}
                </h2>
              )}
              {content.subtitle && (
                <p {...elementProps(config.id, 'subtitle', 'text')} className={cn('mt-4 text-lg', uConfig.sub)}>
                  {content.subtitle}
                </p>
              )}
              {content.body && (
                <p {...elementProps(config.id, 'body', 'text')} className={cn('mt-4 text-sm leading-relaxed', uConfig.sub)}>
                  {content.body}
                </p>
              )}
            </div>
            {/* Video */}
            <VideoEmbed content={content} uConfig={uConfig} />
          </div>
        ) : (
          <>
            {/* Header */}
            {(content.eyebrow || content.title) && (
              <div className="text-center mb-10">
                {content.eyebrow && (
                  <span {...elementProps(config.id, 'eyebrow', 'text')} className={cn('text-xs font-semibold uppercase tracking-widest', uConfig.eyebrow)}>
                    {content.eyebrow}
                  </span>
                )}
                {content.title && (
                  <h2 {...elementProps(config.id, 'title', 'heading')} className={cn('text-3xl md:text-4xl font-bold mt-3', uConfig.text)}>
                    {content.title}
                  </h2>
                )}
                {content.subtitle && (
                  <p {...elementProps(config.id, 'subtitle', 'text')} className={cn('mt-4 text-lg max-w-2xl mx-auto', uConfig.sub)}>
                    {content.subtitle}
                  </p>
                )}
              </div>
            )}
            <VideoEmbed content={content} uConfig={uConfig} />
          </>
        )}
      </div>
    </section>
  )
}

export const videoMeta: SectionMeta = {
  type: 'video',
  label: 'Video',
  icon: '🎬',
  variants: [
    'startup-full', 'startup-feature',
    'corporate-full', 'corporate-feature',
    'luxe-full', 'luxe-feature',
    'creative-full', 'creative-feature',
    'ecommerce-full', 'ecommerce-feature',
    'glass-full', 'glass-feature',
  ],
  defaultVariant: 'startup-full',
  defaultContent: {},
}
