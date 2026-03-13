import { useState, useEffect, useCallback } from 'react'
import type { Product } from '@/types/ecommerce'

export function useProducts(siteId: string | undefined) {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetch_ = useCallback(async (params?: { status?: string; categoryId?: string; search?: string; page?: number }) => {
    if (!siteId) return
    setLoading(true)
    try {
      const sp = new URLSearchParams({ siteId })
      if (params?.status) sp.set('status', params.status)
      if (params?.categoryId) sp.set('categoryId', params.categoryId)
      if (params?.search) sp.set('search', params.search)
      if (params?.page) sp.set('page', String(params.page))
      const res = await fetch(`/api/ecommerce/products?${sp}`)
      if (res.ok) {
        const data = await res.json()
        setProducts(data.products)
        setTotal(data.total)
      }
    } catch (err) {
      console.error('useProducts fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [siteId])

  useEffect(() => { fetch_() }, [fetch_])

  const createProduct = useCallback(async (data: Partial<Product>) => {
    if (!siteId) return null
    try {
      const res = await fetch('/api/ecommerce/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId, ...data }),
      })
      if (res.ok) {
        const product = await res.json()
        setProducts(prev => [product, ...prev])
        return product as Product
      }
    } catch (err) {
      console.error('createProduct error:', err)
    }
    return null
  }, [siteId])

  const updateProduct = useCallback(async (productId: string, data: Partial<Product>) => {
    try {
      const res = await fetch(`/api/ecommerce/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        const updated = await res.json()
        setProducts(prev => prev.map(p => p.id === productId ? updated : p))
        return updated as Product
      }
    } catch (err) {
      console.error('updateProduct error:', err)
    }
    return null
  }, [])

  const deleteProduct = useCallback(async (productId: string) => {
    try {
      const res = await fetch(`/api/ecommerce/products/${productId}`, { method: 'DELETE' })
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== productId))
        return true
      }
    } catch (err) {
      console.error('deleteProduct error:', err)
    }
    return false
  }, [])

  return { products, total, loading, refetch: fetch_, createProduct, updateProduct, deleteProduct }
}
