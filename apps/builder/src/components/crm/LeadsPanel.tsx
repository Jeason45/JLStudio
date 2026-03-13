'use client'
import { useState } from 'react'
import { useCRM } from '@/hooks/useCRM'
import { LeadStatusBadge } from './LeadStatusBadge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RefreshCw, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LeadStatus, LeadWithContact } from '@/types/crm'

interface LeadsPanelProps {
  siteId: string
}

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `il y a ${minutes}min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `il y a ${hours}h`
  const days = Math.floor(hours / 24)
  return `il y a ${days}j`
}

function LeadRow({ lead, onStatusChange }: { lead: LeadWithContact; onStatusChange: (id: string, s: LeadStatus) => void }) {
  const [expanded, setExpanded] = useState(false)
  const contactName = [lead.contact.firstName, lead.contact.lastName].filter(Boolean).join(' ') || lead.contact.email

  return (
    <div className={cn(
      'border-b border-zinc-800 last:border-0 transition-colors',
      lead.status === 'new' && 'bg-blue-500/5'
    )}>
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-zinc-800/50"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Indicateur nouveau */}
        <div className={cn('w-1.5 h-1.5 rounded-full shrink-0', lead.status === 'new' ? 'bg-blue-400' : 'bg-transparent')} />

        {/* Avatar */}
        <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0">
          {contactName.charAt(0).toUpperCase()}
        </div>

        {/* Infos */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white truncate">{contactName}</p>
          <p className="text-xs text-zinc-500 truncate">{lead.contact.company ?? lead.contact.email}</p>
        </div>

        {/* Status + date */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          <LeadStatusBadge status={lead.status as LeadStatus} onChange={s => onStatusChange(lead.id, s)} interactive />
          <span className="text-xs text-zinc-600">{formatRelativeTime(lead.createdAt)}</span>
        </div>

        {expanded ? <ChevronUp className="w-3 h-3 text-zinc-600 shrink-0" /> : <ChevronDown className="w-3 h-3 text-zinc-600 shrink-0" />}
      </div>

      {/* Détails du lead */}
      {expanded && (
        <div className="px-4 pb-3 pt-0 ml-10">
          <div className="rounded-lg p-3 space-y-1.5 bg-zinc-800/60">
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-2">Données du formulaire</p>
            {Object.entries(lead.data).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <span className="text-xs text-zinc-500 capitalize min-w-[60px]">{key} :</span>
                <span className="text-xs text-zinc-300 flex-1">{String(value)}</span>
              </div>
            ))}
            {lead.source && (
              <p className="text-xs text-zinc-600 pt-1 border-t border-zinc-700 mt-2">Source : {lead.source}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function LeadsPanel({ siteId }: LeadsPanelProps) {
  const { leads, loading, error, isMock, updateLeadStatus, refresh } = useCRM(siteId)
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all')

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)
  const newCount = leads.filter(l => l.status === 'new').length

  const filterOptions: { value: LeadStatus | 'all'; label: string }[] = [
    { value: 'all', label: `Tous (${leads.length})` },
    { value: 'new', label: `Nouveaux (${leads.filter(l => l.status === 'new').length})` },
    { value: 'contacted', label: 'Contactés' },
    { value: 'qualified', label: 'Qualifiés' },
    { value: 'lost', label: 'Perdus' },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Barre d'outils */}
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {newCount > 0 && (
            <span className="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded-full font-bold">
              {newCount} nouveau{newCount > 1 ? 'x' : ''}
            </span>
          )}
          {isMock && (
            <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">
              Données démo
            </span>
          )}
        </div>
        <button onClick={refresh} className="text-zinc-600 hover:text-zinc-400 transition-colors p-1 rounded">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filtres */}
      <div className="px-4 py-2 border-b border-zinc-800 flex gap-1 overflow-x-auto shrink-0">
        {filterOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={cn(
              'whitespace-nowrap text-xs px-2.5 py-1 rounded-lg transition-colors',
              filter === opt.value
                ? 'bg-indigo-500 text-white'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Liste */}
      <ScrollArea className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-5 h-5 border-2 border-zinc-700 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2 text-center px-4">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-xs text-zinc-500">{error}</p>
            <button onClick={refresh} className="text-xs text-indigo-400 hover:underline">Réessayer</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center px-4">
            <p className="text-xs text-zinc-600">Aucun lead {filter !== 'all' ? `avec le statut "${filter}"` : ''}</p>
            <p className="text-xs text-zinc-700 mt-1">Les soumissions de formulaire apparaîtront ici</p>
          </div>
        ) : (
          filtered.map(lead => (
            <LeadRow key={lead.id} lead={lead} onStatusChange={updateLeadStatus} />
          ))
        )}
      </ScrollArea>
    </div>
  )
}
