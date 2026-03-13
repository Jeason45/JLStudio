'use client'
import { Component, useMemo, type ReactNode } from 'react'
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
  const SectionComponent = getSectionComponent(sectionType)

  const config: SectionConfig = useMemo(() => ({
    id: `preview-${sectionType}-${variant}`,
    type: sectionType,
    variant,
    content,
    style,
    visible: true,
  }), [sectionType, variant, content, style])

  if (!SectionComponent) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-400 text-xs">
        {sectionType}
      </div>
    )
  }

  const fallback = (
    <div className="w-full flex items-center justify-center bg-zinc-800 text-zinc-400 text-xs" style={{ height: '140px' }}>
      {variant}
    </div>
  )

  return (
    <PreviewErrorBoundary fallback={fallback}>
      <div className="w-full bg-white overflow-hidden" style={{ height: '140px' }}>
        <div style={{ width: '1280px', transform: `scale(${scale})`, transformOrigin: 'top left', pointerEvents: 'none', userSelect: 'none' }}>
          <SectionComponent config={config} isEditing={false} />
        </div>
      </div>
    </PreviewErrorBoundary>
  )
}
