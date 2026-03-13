import type { DividerConfig } from '@/types/site'

interface SectionDividerProps {
  config?: DividerConfig
  position: 'top' | 'bottom'
}

const PATHS: Record<string, string> = {
  wave: 'M0,64 C320,128 640,0 960,64 C1280,128 1600,0 1920,64 L1920,160 L0,160 Z',
  angle: 'M0,160 L1920,0 L1920,160 Z',
  curve: 'M0,160 Q960,0 1920,160 Z',
  triangle: 'M0,160 L960,0 L1920,160 Z',
}

export function SectionDivider({ config, position }: SectionDividerProps) {
  if (!config || config.shape === 'none') return null

  const path = PATHS[config.shape]
  if (!path) return null

  const color = config.color ?? '#ffffff'
  const isTop = position === 'top'

  return (
    <div
      className="absolute left-0 right-0 w-full overflow-hidden leading-none pointer-events-none"
      style={{
        [isTop ? 'top' : 'bottom']: 0,
        height: '60px',
        transform: isTop ? 'rotate(180deg)' : undefined,
        zIndex: 1,
      }}
    >
      <svg
        viewBox="0 0 1920 160"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path d={path} fill={color} />
      </svg>
    </div>
  )
}
