import { useState, useEffect, useCallback } from 'react'
import type { CmsCollection, CmsFieldDef, CmsCollectionSettings } from '@/types/cms'

export function useCmsCollections(siteId: string | undefined) {
  const [collections, setCollections] = useState<CmsCollection[]>([])
  const [loading, setLoading] = useState(false)

  const fetch_ = useCallback(async () => {
    if (!siteId) return
    setLoading(true)
    try {
      const res = await fetch(`/api/cms/collections?siteId=${siteId}`)
      if (res.ok) {
        const data = await res.json()
        setCollections(data)
      }
    } catch (err) {
      console.error('useCmsCollections fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [siteId])

  useEffect(() => { fetch_() }, [fetch_])

  const createCollection = useCallback(async (name: string, slug: string, fields?: CmsFieldDef[], settings?: CmsCollectionSettings) => {
    if (!siteId) return null
    try {
      const res = await fetch('/api/cms/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId, name, slug, fields: fields ?? [], settings: settings ?? {} }),
      })
      if (res.ok) {
        const col = await res.json()
        setCollections(prev => [col, ...prev])
        return col as CmsCollection
      }
    } catch (err) {
      console.error('createCollection error:', err)
    }
    return null
  }, [siteId])

  const updateCollection = useCallback(async (collectionId: string, updates: Partial<Pick<CmsCollection, 'name' | 'slug'>> & { fields?: CmsFieldDef[]; settings?: CmsCollectionSettings }) => {
    try {
      const res = await fetch(`/api/cms/collections/${collectionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (res.ok) {
        const updated = await res.json()
        setCollections(prev => prev.map(c => c.id === collectionId ? updated : c))
        return updated as CmsCollection
      }
    } catch (err) {
      console.error('updateCollection error:', err)
    }
    return null
  }, [])

  const deleteCollection = useCallback(async (collectionId: string) => {
    try {
      const res = await fetch(`/api/cms/collections/${collectionId}`, { method: 'DELETE' })
      if (res.ok) {
        setCollections(prev => prev.filter(c => c.id !== collectionId))
        return true
      }
    } catch (err) {
      console.error('deleteCollection error:', err)
    }
    return false
  }, [])

  return { collections, loading, refetch: fetch_, createCollection, updateCollection, deleteCollection }
}
