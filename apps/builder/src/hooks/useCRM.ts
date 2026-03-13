import { useState, useEffect, useCallback } from 'react'
import type { LeadWithContact, ContactRecord, LeadStatus } from '@/types/crm'

interface UseCRMResult {
  leads: LeadWithContact[]
  contacts: ContactRecord[]
  loading: boolean
  error: string | null
  isMock: boolean
  updateLeadStatus: (leadId: string, status: LeadStatus) => Promise<void>
  refresh: () => void
}

export function useCRM(siteId: string): UseCRMResult {
  const [leads, setLeads] = useState<LeadWithContact[]>([])
  const [contacts, setContacts] = useState<ContactRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMock, setIsMock] = useState(false)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!siteId) return
    setLoading(true)

    Promise.all([
      fetch(`/api/sites/${siteId}/leads`).then(r => r.json()),
      fetch(`/api/sites/${siteId}/contacts`).then(r => r.json()),
    ])
      .then(([leadsData, contactsData]) => {
        setLeads(leadsData.leads ?? [])
        setContacts(contactsData.contacts ?? [])
        setIsMock(leadsData.source === 'mock')
        setError(null)
      })
      .catch(() => setError('Impossible de charger les données CRM'))
      .finally(() => setLoading(false))
  }, [siteId, tick])

  const updateLeadStatus = useCallback(async (leadId: string, status: LeadStatus) => {
    // Optimistic update
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status } : l))
    try {
      await fetch(`/api/sites/${siteId}/leads`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, status }),
      })
    } catch {
      // Revert on error
      setTick(t => t + 1)
    }
  }, [siteId])

  const refresh = useCallback(() => setTick(t => t + 1), [])

  return { leads, contacts, loading, error, isMock, updateLeadStatus, refresh }
}
