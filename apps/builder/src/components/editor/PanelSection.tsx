'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PanelSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  compact?: boolean
  actions?: React.ReactNode
  /** Show blue dot on title when section has non-default values */
  dot?: boolean
}

export function PanelSection({ title, children, defaultOpen = true, compact, actions, dot }: PanelSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-[#333] bg-[#252525]">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open) } }}
        className={cn(
          'w-full flex items-center justify-between text-[12px] font-semibold text-[#ccc] hover:text-white transition-colors cursor-pointer select-none',
          compact ? 'px-2 py-1.5' : 'px-2 py-1.5'
        )}
      >
        <span className="flex items-center gap-1.5">
          {title}
          {dot && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
        </span>
        <div className="flex items-center gap-1.5">
          {actions && <span onClick={e => e.stopPropagation()}>{actions}</span>}
          <ChevronDown className={cn('w-3 h-3 text-[#666] transition-transform', open && 'rotate-180')} />
        </div>
      </div>
      {open && (
        <div className={cn('min-w-0', compact ? 'px-2 pb-2 space-y-1' : 'px-2 pb-2 space-y-1.5')}>
          {children}
        </div>
      )}
    </div>
  )
}
