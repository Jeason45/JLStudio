import { useState, useEffect, useCallback } from 'react'
import type { Coupon } from '@/types/ecommerce'

export function useCoupons(siteId: string | undefined) {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(false)

  const fetch_ = useCallback(async () => {
    if (!siteId) return
    setLoading(true)
    try {
      const res = await fetch(`/api/ecommerce/coupons?siteId=${siteId}`)
      if (res.ok) setCoupons(await res.json())
    } catch (err) {
      console.error('useCoupons fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [siteId])

  useEffect(() => { fetch_() }, [fetch_])

  const createCoupon = useCallback(async (data: Partial<Coupon>) => {
    if (!siteId) return null
    try {
      const res = await fetch('/api/ecommerce/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId, ...data }),
      })
      if (res.ok) {
        const coupon = await res.json()
        setCoupons(prev => [coupon, ...prev])
        return coupon as Coupon
      }
    } catch (err) {
      console.error('createCoupon error:', err)
    }
    return null
  }, [siteId])

  const updateCoupon = useCallback(async (couponId: string, data: Partial<Coupon>) => {
    try {
      const res = await fetch(`/api/ecommerce/coupons/${couponId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        const updated = await res.json()
        setCoupons(prev => prev.map(c => c.id === couponId ? updated : c))
        return updated as Coupon
      }
    } catch (err) {
      console.error('updateCoupon error:', err)
    }
    return null
  }, [])

  const deleteCoupon = useCallback(async (couponId: string) => {
    try {
      const res = await fetch(`/api/ecommerce/coupons/${couponId}`, { method: 'DELETE' })
      if (res.ok) {
        setCoupons(prev => prev.filter(c => c.id !== couponId))
        return true
      }
    } catch (err) {
      console.error('deleteCoupon error:', err)
    }
    return false
  }, [])

  return { coupons, loading, refetch: fetch_, createCoupon, updateCoupon, deleteCoupon }
}
