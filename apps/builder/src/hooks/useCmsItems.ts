import { useState, useEffect, useCallback } from 'react'
import type { CmsItem, CmsItemStatus } from '@/types/cms'

interface ItemsResponse {
  data: CmsItem[]
  meta: { total: number; limit: number; offset: number }
}

interface FetchParams {
  status?: CmsItemStatus
  sort?: string
  dir?: 'asc' | 'desc'
  limit?: number
  offset?: number
  search?: string
}

export function useCmsItems(collectionId: string | undefined) {
  const [items, setItems] = useState<CmsItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [fetchParams, setFetchParams] = useState<FetchParams>({})

  const fetch_ = useCallback(async (params?: FetchParams) => {
    if (!collectionId) return
    const p = params ?? fetchParams
    setLoading(true)
    try {
      const qs = new URLSearchParams()
      if (p.status) qs.set('status', p.status)
      if (p.sort) qs.set('sort', p.sort)
      if (p.dir) qs.set('dir', p.dir)
      if (p.limit) qs.set('limit', String(p.limit))
      if (p.offset) qs.set('offset', String(p.offset))
      if (p.search) qs.set('search', p.search)

      const res = await fetch(`/api/cms/collections/${collectionId}/items?${qs}`)
      if (res.ok) {
        const { data, meta } = (await res.json()) as ItemsResponse
        setItems(data)
        setTotal(meta.total)
      }
    } catch (err) {
      console.error('useCmsItems fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [collectionId, fetchParams])

  useEffect(() => { fetch_() }, [fetch_])

  const updateParams = useCallback((params: FetchParams) => {
    setFetchParams(prev => {
      const next = { ...prev, ...params }
      fetch_(next)
      return next
    })
  }, [fetch_])

  const createItem = useCallback(async (slug: string, data: Record<string, unknown>, status?: CmsItemStatus, scheduledAt?: string) => {
    if (!collectionId) return null
    try {
      const res = await fetch(`/api/cms/collections/${collectionId}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, data, status: status ?? 'DRAFT', scheduledAt }),
      })
      if (res.ok) {
        const item = await res.json()
        setItems(prev => [item, ...prev])
        setTotal(prev => prev + 1)
        return item as CmsItem
      }
    } catch (err) {
      console.error('createItem error:', err)
    }
    return null
  }, [collectionId])

  const updateItem = useCallback(async (itemId: string, updates: Partial<Pick<CmsItem, 'slug' | 'data' | 'status'>> & { scheduledAt?: string | null }) => {
    try {
      const res = await fetch(`/api/cms/collections/${collectionId}/items/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (res.ok) {
        const updated = await res.json()
        setItems(prev => prev.map(i => i.id === itemId ? updated : i))
        return updated as CmsItem
      }
    } catch (err) {
      console.error('updateItem error:', err)
    }
    return null
  }, [collectionId])

  const deleteItem = useCallback(async (itemId: string) => {
    try {
      const res = await fetch(`/api/cms/collections/${collectionId}/items/${itemId}`, { method: 'DELETE' })
      if (res.ok) {
        setItems(prev => prev.filter(i => i.id !== itemId))
        setTotal(prev => prev - 1)
        return true
      }
    } catch (err) {
      console.error('deleteItem error:', err)
    }
    return false
  }, [collectionId])

  const bulkAction = useCallback(async (action: 'status' | 'delete', ids: string[], status?: CmsItemStatus) => {
    if (!collectionId) return false
    try {
      const res = await fetch(`/api/cms/collections/${collectionId}/items/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ids, status }),
      })
      if (res.ok) {
        await fetch_()
        return true
      }
    } catch (err) {
      console.error('bulkAction error:', err)
    }
    return false
  }, [collectionId, fetch_])

  const importCsv = useCallback(async (csv: string) => {
    if (!collectionId) return false
    try {
      const res = await fetch(`/api/cms/collections/${collectionId}/items/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'import', csv }),
      })
      if (res.ok) {
        await fetch_()
        return true
      }
    } catch (err) {
      console.error('importCsv error:', err)
    }
    return false
  }, [collectionId, fetch_])

  const exportCsv = useCallback(async () => {
    if (!collectionId) return null
    try {
      const res = await fetch(`/api/cms/collections/${collectionId}/items/bulk`)
      if (res.ok) return await res.text()
    } catch (err) {
      console.error('exportCsv error:', err)
    }
    return null
  }, [collectionId])

  return {
    items, total, loading,
    fetchParams, updateParams,
    refetch: fetch_,
    createItem, updateItem, deleteItem,
    bulkAction, importCsv, exportCsv,
  }
}
