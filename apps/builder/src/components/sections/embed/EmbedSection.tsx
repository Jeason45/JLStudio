'use client'
import { useEffect, useRef } from 'react'
import type { SectionConfig } from '@/types/site'
import { elementProps } from '@/lib/elementHelpers'

interface EmbedSectionProps {
  config: SectionConfig
  isEditing?: boolean
}

export function EmbedSection({ config }: EmbedSectionProps) {
  const content = config.content as Record<string, unknown>
  const { accentColor } = config.style
  const accent = accentColor ?? '#D4AF37'
  const title = (content.title as string) || 'Réservation'
  const subtitle = (content.subtitle as string) || ''
  const embedUrl = (content.embedUrl as string) || ''
  const footerText = (content.footerText as string) || ''
  const eventName = (content.eventName as string) || "Bal C'est L'Est — 29 mai 2026"
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Auto-resize iframe to match content height
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!iframeRef.current) return
      // Billetweb sends resize messages
      if (e.data && typeof e.data === 'object' && e.data.height) {
        iframeRef.current.style.height = `${e.data.height + 20}px`
      }
      if (typeof e.data === 'string') {
        try {
          const parsed = JSON.parse(e.data)
          if (parsed.height) iframeRef.current.style.height = `${parsed.height + 20}px`
        } catch { /* not JSON */ }
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  if (!embedUrl) return null

  return (
    <section
      {...elementProps(config.id, 'wrapper', 'container', 'Embed Section')}
      style={{
        backgroundColor: '#060606',
        fontFamily: 'var(--font-body, inherit)',
        minHeight: '100vh',
      }}
    >
      {/* Elegant top bar */}
      <div
        style={{
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
          padding: '20px 24px',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
            </svg>
            Retour au site
          </a>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
            {eventName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: accent,
              margin: '0 0 12px',
            }}
          >
            Réservation
          </p>
          <h2
            {...elementProps(config.id, 'title', 'heading')}
            style={{
              fontSize: 'clamp(26px, 4vw, 36px)',
              fontWeight: 600,
              color: '#ffffff',
              margin: '0 0 10px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-heading, inherit)',
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.35)',
                margin: '0 0 24px',
              }}
            >
              {subtitle}
            </p>
          )}
          {/* Gold divider */}
          <div style={{ width: '50px', height: '1px', margin: '0 auto', background: accent }} />
        </div>

        {/* Billetweb iframe — no container border, full width, auto height */}
        <iframe
          ref={iframeRef}
          src={embedUrl}
          style={{
            width: '100%',
            minHeight: '900px',
            background: 'white',
            border: 'none',
            display: 'block',
            borderRadius: '12px',
          }}
          allow="payment"
          title="Billetterie"
        />

        {/* Footer text */}
        {footerText && (
          <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '12px', color: 'rgba(255,255,255,0.18)' }}>
            {footerText}
          </p>
        )}
      </div>
    </section>
  )
}

export const embedMeta = {
  type: 'embed',
  label: 'Embed',
  icon: '🔗',
  variants: ['billetweb'],
  defaultVariant: 'billetweb',
  defaultContent: {},
}
