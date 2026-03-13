import { useState, useEffect, useCallback } from 'react'
import type { Order, OrderStatus } from '@/types/ecommerce'

export function useOrders(siteId: string | undefined) {
  const [orders, setOrders] = useState<Order[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetch_ = useCallback(async (params?: { status?: string; page?: number }) => {
    if (!siteId) return
    setLoading(true)
    try {
      const sp = new URLSearchParams({ siteId })
      if (params?.status) sp.set('status', params.status)
      if (params?.page) sp.set('page', String(params.page))
      const res = await fetch(`/api/ecommerce/orders?${sp}`)
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders)
        setTotal(data.total)
      }
    } catch (err) {
      console.error('useOrders fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [siteId])

  useEffect(() => { fetch_() }, [fetch_])

  const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatus, notes?: string) => {
    try {
      const res = await fetch(`/api/ecommerce/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      })
      if (res.ok) {
        const updated = await res.json()
        setOrders(prev => prev.map(o => o.id === orderId ? updated : o))
        return updated as Order
      }
    } catch (err) {
      console.error('updateOrderStatus error:', err)
    }
    return null
  }, [])

  return { orders, total, loading, refetch: fetch_, updateOrderStatus }
}
