import { useState, useEffect, useCallback } from 'react'
import type { ShippingZone } from '@/types/ecommerce'

export function useShippingZones(siteId: string | undefined) {
  const [zones, setZones] = useState<ShippingZone[]>([])
  const [loading, setLoading] = useState(false)

  const fetch_ = useCallback(async () => {
    if (!siteId) return
    setLoading(true)
    try {
      const res = await fetch(`/api/ecommerce/shipping-zones?siteId=${siteId}`)
      if (res.ok) setZones(await res.json())
    } catch (err) {
      console.error('useShippingZones fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [siteId])

  useEffect(() => { fetch_() }, [fetch_])

  const createZone = useCallback(async (data: { name: string; countries?: string[]; rates?: ShippingZone['rates'] }) => {
    if (!siteId) return null
    try {
      const res = await fetch('/api/ecommerce/shipping-zones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId, ...data }),
      })
      if (res.ok) {
        const zone = await res.json()
        setZones(prev => [...prev, zone])
        return zone as ShippingZone
      }
    } catch (err) {
      console.error('createZone error:', err)
    }
    return null
  }, [siteId])

  const updateZone = useCallback(async (zoneId: string, data: Partial<ShippingZone>) => {
    try {
      const res = await fetch(`/api/ecommerce/shipping-zones/${zoneId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        const updated = await res.json()
        setZones(prev => prev.map(z => z.id === zoneId ? updated : z))
        return updated as ShippingZone
      }
    } catch (err) {
      console.error('updateZone error:', err)
    }
    return null
  }, [])

  const deleteZone = useCallback(async (zoneId: string) => {
    try {
      const res = await fetch(`/api/ecommerce/shipping-zones/${zoneId}`, { method: 'DELETE' })
      if (res.ok) {
        setZones(prev => prev.filter(z => z.id !== zoneId))
        return true
      }
    } catch (err) {
      console.error('deleteZone error:', err)
    }
    return false
  }, [])

  return { zones, loading, refetch: fetch_, createZone, updateZone, deleteZone }
}
