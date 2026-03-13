import { useMemo } from 'react'
import type { LibraryItem } from '@/types/library'

export function useLibrarySearch(
  items: LibraryItem[],
  search: string,
  subcategory: string | null,
) {
  return useMemo(() => {
    let filtered = items

    if (subcategory) {
      filtered = filtered.filter(i => i.subcategory === subcategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      filtered = filtered.filter(i =>
        i.label.toLowerCase().includes(q) ||
        i.tags.some(t => t.includes(q)) ||
        i.subcategory.includes(q)
      )
    }

    return filtered
  }, [items, search, subcategory])
}
