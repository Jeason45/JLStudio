import { useState, useEffect, useCallback } from 'react'
import type { TaxRate } from '@/types/ecommerce'

export function useTaxRates(siteId: string | undefined) {
  const [rates, setRates] = useState<TaxRate[]>([])
  const [loading, setLoading] = useState(false)

  const fetch_ = useCallback(async () => {
    if (!siteId) return
    setLoading(true)
    try {
      const res = await fetch(`/api/ecommerce/tax-rates?siteId=${siteId}`)
      if (res.ok) setRates(await res.json())
    } catch (err) {
      console.error('useTaxRates fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [siteId])

  useEffect(() => { fetch_() }, [fetch_])

  const createRate = useCallback(async (data: { name: string; rate: number; country?: string; region?: string; includeInPrice?: boolean }) => {
    if (!siteId) return null
    try {
      const res = await fetch('/api/ecommerce/tax-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId, ...data }),
      })
      if (res.ok) {
        const rate = await res.json()
        setRates(prev => [...prev, rate])
        return rate as TaxRate
      }
    } catch (err) {
      console.error('createRate error:', err)
    }
    return null
  }, [siteId])

  const updateRate = useCallback(async (rateId: string, data: Partial<TaxRate>) => {
    try {
      const res = await fetch(`/api/ecommerce/tax-rates/${rateId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        const updated = await res.json()
        setRates(prev => prev.map(r => r.id === rateId ? updated : r))
        return updated as TaxRate
      }
    } catch (err) {
      console.error('updateRate error:', err)
    }
    return null
  }, [])

  const deleteRate = useCallback(async (rateId: string) => {
    try {
      const res = await fetch(`/api/ecommerce/tax-rates/${rateId}`, { method: 'DELETE' })
      if (res.ok) {
        setRates(prev => prev.filter(r => r.id !== rateId))
        return true
      }
    } catch (err) {
      console.error('deleteRate error:', err)
    }
    return false
  }, [])

  return { rates, loading, refetch: fetch_, createRate, updateRate, deleteRate }
}
