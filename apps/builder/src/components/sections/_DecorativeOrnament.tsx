/**
 * Decorative ornament: two golden horizontal lines flanking a moustache icon.
 * Used in luxe sections when content.decorativeIcon is truthy.
 */
export function DecorativeOrnament({ color, className }: { color?: string; className?: string }) {
  const gold = color || '#DEC7A6'
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
      <div style={{ width: '40px', height: '1px', backgroundColor: gold }} />
      {/* Moustache SVG */}
      <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="14" style={{ outline: 'none', border: 'none' }}>
        <path
          d="M2 14 C2 14, 5 4, 12 6 C16 7, 18 10, 20 11 C22 12, 25 12, 27 11 C29 10, 30 9, 30 9 C30 9, 31 10, 33 11 C35 12, 38 12, 40 11 C42 10, 44 7, 48 6 C55 4, 58 14, 58 14"
          stroke={gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
        <path
          d="M8 10 C10 7, 14 7, 16 9 C17 10, 18 10.5, 20 11"
          stroke={gold} strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
        <path
          d="M40 11 C42 10.5, 43 10, 44 9 C46 7, 50 7, 52 10"
          stroke={gold} strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
      </svg>
      <div style={{ width: '40px', height: '1px', backgroundColor: gold }} />
    </div>
  )
}
