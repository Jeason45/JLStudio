'use client'
import { Component, useMemo, useRef, useState, useEffect, type ReactNode } from 'react'
import { getSectionComponent } from '@/components/sections'
import type { SectionConfig, SectionStyle } from '@/types/site'

interface MiniSectionPreviewProps {
  sectionType: string
  variant: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Record<string, any>
  style: SectionStyle
  scale?: number
}

class PreviewErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? this.props.fallback : this.props.children }
}

export function MiniSectionPreview({ sectionType, variant, content, style, scale = 0.28 }: MiniSectionPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Lazy loading: only render when in viewport (with 200px margin)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const SectionComponent = getSectionComponent(sectionType)

  const config: SectionConfig = useMemo(() => ({
    id: `preview-${sectionType}-${variant}`,
    type: sectionType,
    variant,
    content,
    style,
    visible: true,
  }), [sectionType, variant, content, style])

  const placeholder = (
    <div ref={containerRef} className="w-full flex items-center justify-center bg-zinc-800 text-zinc-400 text-xs" style={{ height: '140px' }}>
      {variant}
    </div>
  )

  if (!SectionComponent || !isVisible) return placeholder

  return (
    <PreviewErrorBoundary fallback={placeholder}>
      <div ref={containerRef} className="mini-preview-freeze w-full bg-white overflow-hidden" style={{ height: '140px' }}>
        <style>{`
          .mini-preview-freeze *,
          .mini-preview-freeze *::before,
          .mini-preview-freeze *::after {
            animation: none !important;
            transition: none !important;
          }
        `}</style>
        <div style={{ width: `${100 / scale}%`, transform: `scale(${scale})`, transformOrigin: 'top left', pointerEvents: 'none', userSelect: 'none' }}>
          <SectionComponent config={config} isEditing={true} />
        </div>
      </div>
    </PreviewErrorBoundary>
  )
}
