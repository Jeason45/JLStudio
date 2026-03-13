'use client'
import { useState } from 'react'
import { useCRM } from '@/hooks/useCRM'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ContactRecord } from '@/types/crm'

interface ContactsPanelProps {
  siteId: string
}

function ContactRow({ contact }: { contact: ContactRecord }) {
  const fullName = [contact.firstName, contact.lastName].filter(Boolean).join(' ')
  const initials = [contact.firstName?.charAt(0), contact.lastName?.charAt(0)].filter(Boolean).join('').toUpperCase() || contact.email.charAt(0).toUpperCase()

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50">
      <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        {fullName && <p className="text-xs font-medium text-white">{fullName}</p>}
        <p className="text-xs text-zinc-500 truncate">{contact.email}</p>
        {contact.company && <p className="text-xs text-zinc-600 truncate">{contact.company}</p>}
        {contact.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap mt-1">
            {contact.tags.map(tag => (
              <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function ContactsPanel({ siteId }: ContactsPanelProps) {
  const { contacts, loading, refresh, isMock } = useCRM(siteId)
  const [search, setSearch] = useState('')

  const filtered = contacts.filter(c => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      c.email.toLowerCase().includes(q) ||
      c.firstName?.toLowerCase().includes(q) ||
      c.lastName?.toLowerCase().includes(q) ||
      c.company?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="flex flex-col h-full">
      {/* Barre outils */}
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">{contacts.length} contact{contacts.length !== 1 ? 's' : ''}</span>
          {isMock && (
            <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">
              Démo
            </span>
          )}
        </div>
        <button onClick={refresh} className="text-zinc-600 hover:text-zinc-400 transition-colors p-1 rounded">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Recherche */}
      <div className="px-4 py-2 border-b border-zinc-800 shrink-0">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full h-8 bg-zinc-800 border border-zinc-700 text-white text-xs rounded-lg pl-8 pr-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-zinc-600"
          />
        </div>
      </div>

      {/* Liste */}
      <ScrollArea className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-5 h-5 border-2 border-zinc-700 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-xs text-zinc-600">{search ? 'Aucun résultat' : 'Aucun contact'}</p>
          </div>
        ) : (
          filtered.map(contact => <ContactRow key={contact.id} contact={contact} />)
        )}
      </ScrollArea>
    </div>
  )
}
