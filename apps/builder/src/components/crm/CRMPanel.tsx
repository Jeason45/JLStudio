'use client'
import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { LeadsPanel } from './LeadsPanel'
import { ContactsPanel } from './ContactsPanel'
import { cn } from '@/lib/utils'
import { Users, Inbox } from 'lucide-react'

interface CRMPanelProps {
  open: boolean
  onClose: () => void
  siteId: string
}

type CRMTab = 'leads' | 'contacts'

export function CRMPanel({ open, onClose, siteId }: CRMPanelProps) {
  const [activeTab, setActiveTab] = useState<CRMTab>('leads')

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-96 bg-zinc-900 border-zinc-800 text-white p-0 flex flex-col"
      >
        <SheetHeader className="px-5 py-4 border-b border-zinc-800 shrink-0">
          <SheetTitle className="text-white text-sm">CRM — {siteId}</SheetTitle>
        </SheetHeader>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 shrink-0">
          <button
            onClick={() => setActiveTab('leads')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-colors',
              activeTab === 'leads'
                ? 'text-white border-b-2 border-indigo-500'
                : 'text-zinc-500 hover:text-zinc-300'
            )}
          >
            <Inbox className="w-3.5 h-3.5" />
            Leads
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-colors',
              activeTab === 'contacts'
                ? 'text-white border-b-2 border-indigo-500'
                : 'text-zinc-500 hover:text-zinc-300'
            )}
          >
            <Users className="w-3.5 h-3.5" />
            Contacts
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'leads' ? (
            <LeadsPanel siteId={siteId} />
          ) : (
            <ContactsPanel siteId={siteId} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
