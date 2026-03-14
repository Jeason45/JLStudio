/**
 * Decorative ornament: two golden horizontal lines flanking a moustache icon.
 * Used in luxe sections when content.decorativeIcon is truthy.
 *
 * When `iconUrl` is provided, renders the external SVG (e.g. barbershop icon).
 * Otherwise renders the built-in moustache shape.
 */
export function DecorativeOrnament({ color, className, iconUrl }: { color?: string; className?: string; iconUrl?: string }) {
  const gold = color || '#DEC7A6'

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
      <div style={{ width: '60px', height: '1px', backgroundColor: gold }} />
      {iconUrl ? (
        // External SVG icon (e.g. barbershop moustache)
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={iconUrl}
          alt=""
          width={32}
          height={10}
          style={{ outline: 'none', border: 'none', display: 'block' }}
        />
      ) : (
        /* Built-in barbershop moustache – exact SVG from Beard X template */
        <svg viewBox="0 0 51 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="11" style={{ outline: 'none', border: 'none' }}>
          <path d="M30.4214 0C27.1971 0 24.5814 2.82951 24.5814 6.31705C24.5814 9.80459 27.1971 12.6341 30.4214 12.6341C33.6457 12.6341 36.2614 9.80459 36.2614 6.31705C36.2614 2.82951 33.6457 0 30.4214 0Z" fill={gold} />
          <path d="M44.0466 7.36987C46.6006 7.36987 49.2163 6.84345 50.8613 3.1585C50.8613 3.1585 52.3213 14.7398 38.2066 14.7398C32.49 14.7398 28.3239 13.4402 25.8522 10.2487C27.4973 7.65364 30.6517 5.15314 34.3819 1.67383C35.6362 3.04335 40.2753 7.36987 44.0466 7.36987Z" fill={gold} />
          <path d="M20.8471 0C17.6228 0 15.0071 2.82951 15.0071 6.31705C15.0071 9.80459 17.6228 12.6341 20.8471 12.6341C24.0714 12.6341 26.6871 9.80459 26.6871 6.31705C26.6871 2.82951 24.0714 0 20.8471 0Z" fill={gold} />
          <path d="M16.8866 1.67383C20.6168 5.14903 23.7712 7.65364 25.4163 10.2487C22.9446 13.4402 18.7784 14.7398 13.0618 14.7398C-1.05284 14.7398 0.407157 3.1585 0.407157 3.1585C2.05222 6.84345 4.66788 7.36987 7.22184 7.36987C10.9932 7.36987 15.6322 3.04335 16.8866 1.67383Z" fill={gold} />
        </svg>
      )}
      <div style={{ width: '60px', height: '1px', backgroundColor: gold }} />
    </div>
  )
}

/**
 * Floating decorative illustration — positioned absolute in a corner,
 * low opacity, pointer-events: none. Used by luxe sections.
 */
export function FloatingIllustration({ src, position, size = 200, opacity = 0.12 }: {
  src: string
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  size?: number
  opacity?: number
}) {
  const posStyle: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: 'auto',
    opacity,
    pointerEvents: 'none',
    zIndex: 3,
    border: 'none',
    outline: 'none',
  }

  // Offset into the corner — partially clipped by parent overflow-hidden for a natural look
  switch (position) {
    case 'top-left':
      posStyle.top = 20
      posStyle.left = 30
      break
    case 'top-right':
      posStyle.top = 20
      posStyle.right = 30
      break
    case 'bottom-left':
      posStyle.bottom = 20
      posStyle.left = 30
      break
    case 'bottom-right':
      posStyle.bottom = 20
      posStyle.right = 30
      break
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" style={posStyle} />
  )
}
