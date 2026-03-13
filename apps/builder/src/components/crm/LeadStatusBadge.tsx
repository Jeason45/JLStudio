import { cn } from '@/lib/utils'
import type { LeadStatus } from '@/types/crm'

const STATUS_CONFIG: Record<LeadStatus, { label: string; className: string }> = {
  new:       { label: 'Nouveau',   className: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  contacted: { label: 'Contacté',  className: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  qualified: { label: 'Qualifié',  className: 'bg-green-500/15 text-green-400 border-green-500/30' },
  lost:      { label: 'Perdu',     className: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30' },
}

interface LeadStatusBadgeProps {
  status: LeadStatus
  onChange?: (status: LeadStatus) => void
  interactive?: boolean
}

export function LeadStatusBadge({ status, onChange, interactive = false }: LeadStatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.new
  const statuses: LeadStatus[] = ['new', 'contacted', 'qualified', 'lost']

  if (interactive && onChange) {
    return (
      <select
        value={status}
        onChange={e => onChange(e.target.value as LeadStatus)}
        onClick={e => e.stopPropagation()}
        className={cn(
          'text-xs font-medium px-2 py-0.5 rounded-full border cursor-pointer focus:outline-none',
          config.className
        )}
        style={{ appearance: 'none', background: 'transparent' }}
      >
        {statuses.map(s => (
          <option key={s} value={s} className="bg-zinc-900 text-white">
            {STATUS_CONFIG[s].label}
          </option>
        ))}
      </select>
    )
  }

  return (
    <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border', config.className)}>
      {config.label}
    </span>
  )
}
