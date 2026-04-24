'use client'
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

  if (!embedUrl) return null

  return (
    <section
      {...elementProps(config.id, 'wrapper', 'container', 'Embed Section')}
      style={{
        backgroundColor: '#060606',
        padding: '60px 24px 80px',
        fontFamily: 'var(--font-body, inherit)',
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2
            {...elementProps(config.id, 'title', 'heading')}
            style={{
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: 600,
              color: '#ffffff',
              margin: '0 0 8px',
              letterSpacing: '-0.01em',
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
                color: 'rgba(255,255,255,0.4)',
                margin: '0 0 20px',
              }}
            >
              {subtitle}
            </p>
          )}
          {/* Gold divider */}
          <div
            style={{
              width: '60px',
              height: '1px',
              margin: '0 auto',
              background: accent,
            }}
          />
        </div>

        {/* Iframe container */}
        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: `1px solid ${accent}25`,
            boxShadow: `0 0 40px ${accent}08, 0 20px 60px rgba(0,0,0,0.3)`,
          }}
        >
          <iframe
            src={embedUrl}
            style={{
              width: '100%',
              minHeight: '700px',
              background: 'white',
              border: 'none',
              display: 'block',
            }}
            allow="payment"
            title="Billetterie"
          />
        </div>

        {/* Footer text */}
        {footerText && (
          <p
            style={{
              textAlign: 'center',
              marginTop: '24px',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.2)',
            }}
          >
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
