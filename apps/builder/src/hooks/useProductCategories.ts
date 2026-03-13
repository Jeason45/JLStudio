import { useState, useEffect, useCallback } from 'react'
import type { ProductCategory } from '@/types/ecommerce'

export function useProductCategories(siteId: string | undefined) {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(false)

  const fetch_ = useCallback(async () => {
    if (!siteId) return
    setLoading(true)
    try {
      const res = await fetch(`/api/ecommerce/categories?siteId=${siteId}`)
      if (res.ok) setCategories(await res.json())
    } catch (err) {
      console.error('useProductCategories fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [siteId])

  useEffect(() => { fetch_() }, [fetch_])

  const createCategory = useCallback(async (data: { name: string; slug: string; parentId?: string; image?: string }) => {
    if (!siteId) return null
    try {
      const res = await fetch('/api/ecommerce/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId, ...data }),
      })
      if (res.ok) {
        const cat = await res.json()
        setCategories(prev => [...prev, cat])
        return cat as ProductCategory
      }
    } catch (err) {
      console.error('createCategory error:', err)
    }
    return null
  }, [siteId])

  const updateCategory = useCallback(async (categoryId: string, data: Partial<ProductCategory>) => {
    try {
      const res = await fetch(`/api/ecommerce/categories/${categoryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        const updated = await res.json()
        setCategories(prev => prev.map(c => c.id === categoryId ? updated : c))
        return updated as ProductCategory
      }
    } catch (err) {
      console.error('updateCategory error:', err)
    }
    return null
  }, [])

  const deleteCategory = useCallback(async (categoryId: string) => {
    try {
      const res = await fetch(`/api/ecommerce/categories/${categoryId}`, { method: 'DELETE' })
      if (res.ok) {
        setCategories(prev => prev.filter(c => c.id !== categoryId))
        return true
      }
    } catch (err) {
      console.error('deleteCategory error:', err)
    }
    return false
  }, [])

  return { categories, loading, refetch: fetch_, createCategory, updateCategory, deleteCategory }
}
