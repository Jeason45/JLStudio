'use client'
import { useState, useCallback, useRef } from 'react'

interface BrixsaViewCursorProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function BrixsaViewCursor({ children, className, style }: BrixsaViewCursorProps) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ ...style, position: 'relative', cursor: 'none' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {/* Custom cursor */}
      <div
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          width: 100,
          height: 100,
          borderRadius: '50%',
          backgroundColor: 'rgba(122, 113, 113, 0.6)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 50,
          color: 'var(--color-background, #e1e1e1)',
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        View
      </div>
    </div>
  )
}
