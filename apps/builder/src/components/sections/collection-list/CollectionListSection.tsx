'use client'
import { useEffect, useMemo, useState } from 'react'
import type { SectionComponentProps } from '../index'
import type { CollectionListContent, CollectionListVariant } from '@/types/sections'
import type { CmsItem, CmsFieldDef } from '@/types/cms'
import { cn } from '@/lib/utils'
import { Database } from 'lucide-react'
import { resolveFieldBinding, evaluateVisibility } from '@/lib/cmsResolver'

// ─── Variant-aware styling ───

const VARIANT_STYLES: Record<string, { container: string; card: string; title: string; subtitle: string }> = {
  'startup-grid': { container: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', card: 'bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow', title: 'text-2xl font-bold text-gray-900', subtitle: 'text-gray-500' },
  'startup-list': { container: 'space-y-4', card: 'bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex gap-4 items-start hover:shadow-md transition-shadow', title: 'text-2xl font-bold text-gray-900', subtitle: 'text-gray-500' },
  'corporate-grid': { container: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8', card: 'bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors', title: 'text-2xl font-semibold text-gray-800', subtitle: 'text-gray-500' },
  'corporate-list': { container: 'space-y-3', card: 'bg-white border border-gray-200 p-6 flex gap-6 items-start hover:border-gray-300 transition-colors', title: 'text-2xl font-semibold text-gray-800', subtitle: 'text-gray-500' },
  'luxe-grid': { container: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10', card: 'bg-black/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-black/10 transition-colors', title: 'text-2xl font-light tracking-wide text-white', subtitle: 'text-white/60' },
  'luxe-list': { container: 'space-y-4', card: 'bg-black/5 backdrop-blur border border-white/10 rounded-2xl p-6 flex gap-6 items-start hover:bg-black/10 transition-colors', title: 'text-2xl font-light tracking-wide text-white', subtitle: 'text-white/60' },
}

export function CollectionListSection({ config, isEditing }: SectionComponentProps) {
  const content = config.content as CollectionListContent
  const variant = config.variant as CollectionListVariant
  const binding = content.__cmsBinding
  const styles = VARIANT_STYLES[variant] ?? VARIANT_STYLES['startup-grid']

  const [items, setItems] = useState<CmsItem[]>([])
  const [fields, setFields] = useState<CmsFieldDef[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!binding?.collectionId) return
    const fetchItems = async () => {
      setLoading(true)
      try {
        // Fetch collection fields
        const colRes = await fetch(`/api/cms/collections/${binding.collectionId}`)
        if (colRes.ok) {
          const col = await colRes.json()
          setFields(col.fields ?? [])
        }

        // Fetch items
        const qs = new URLSearchParams({
          status: 'PUBLISHED',
          limit: String(binding.limit ?? 10),
          offset: String(binding.offset ?? 0),
          sort: binding.sortField ?? 'createdAt',
          dir: binding.sortDirection ?? 'desc',
        })
        const res = await fetch(`/api/cms/collections/${binding.collectionId}/items?${qs}`)
        if (res.ok) {
          const { data } = await res.json()
          setItems(data)
        }
      } catch (err) {
        console.error('CollectionList fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [binding?.collectionId, binding?.limit, binding?.offset, binding?.sortField, binding?.sortDirection])

  const fieldBindings = content.__fieldBindings
  const visibilityRules = content.__cmsVisibility

  // Auto-detect fields as fallback when no explicit bindings are configured
  const primaryField = fields.find(f => f.type === 'plain-text') ?? fields[0]
  const imageField = fields.find(f => f.type === 'image')
  const textField = fields.find(f => f.type === 'rich-text') ?? fields.find(f => f.type === 'plain-text' && f !== primaryField)

  const hasFieldBindings = fieldBindings && Object.keys(fieldBindings).length > 0
  const hasVisibilityRules = visibilityRules && Object.keys(visibilityRules).length > 0

  // Apply visibility rules to filter items (only at runtime, not in editor)
  const visibleItems = useMemo(() => {
    if (isEditing || !hasVisibilityRules) return items
    return items.filter(item => {
      // All rules must pass for the item to be visible
      return Object.values(visibilityRules).every(rule => evaluateVisibility(rule, item))
    })
  }, [items, isEditing, hasVisibilityRules, visibilityRules])

  // Resolve field values for an item using bindings or auto-detect fallback
  const resolveItemFields = (item: CmsItem) => {
    if (hasFieldBindings) {
      // Use explicit bindings — resolve each configured content path
      const titleBinding = fieldBindings['title'] ?? fieldBindings['heading'] ?? fieldBindings['name']
      const imageBinding = fieldBindings['image'] ?? fieldBindings['thumbnail'] ?? fieldBindings['cover']
      const excerptBinding = fieldBindings['excerpt'] ?? fieldBindings['description'] ?? fieldBindings['body'] ?? fieldBindings['text']
      const linkBinding = fieldBindings['link'] ?? fieldBindings['url'] ?? fieldBindings['href']

      return {
        title: titleBinding ? resolveFieldBinding(titleBinding, item) : item.slug,
        image: imageBinding ? resolveFieldBinding(imageBinding, item) : '',
        excerpt: excerptBinding ? resolveFieldBinding(excerptBinding, item) : '',
        link: linkBinding ? resolveFieldBinding(linkBinding, item) : '',
      }
    }
    // Fallback: auto-detect from field schema
    return {
      title: primaryField ? String(item.data[primaryField.slug] ?? '') : item.slug,
      image: imageField ? String(item.data[imageField.slug] ?? '') : '',
      excerpt: textField ? String(item.data[textField.slug] ?? '') : '',
      link: '',
    }
  }

  // No binding configured
  if (!binding?.collectionId) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {content.title && <h2 className={cn(styles.title, 'mb-3')}>{content.title}</h2>}
          {content.subtitle && <p className={cn(styles.subtitle, 'text-sm mb-8')}>{content.subtitle}</p>}
          <div className="py-12 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl flex flex-col items-center gap-3">
            <Database className="w-8 h-8 text-zinc-400" />
            <p className="text-sm text-zinc-500">
              {isEditing ? 'Selectionnez une collection CMS dans le panneau de droite.' : (content.emptyMessage ?? 'Aucun element.')}
            </p>
          </div>
        </div>
      </section>
    )
  }

  const displayItems = isEditing ? items : visibleItems

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {content.title && <h2 className={cn(styles.title, 'mb-3 text-center')}>{content.title}</h2>}
        {content.subtitle && <p className={cn(styles.subtitle, 'text-sm mb-8 text-center')}>{content.subtitle}</p>}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
          </div>
        ) : displayItems.length === 0 ? (
          <p className="text-center text-zinc-500 py-12">{content.emptyMessage ?? 'Aucun element.'}</p>
        ) : (
          <div className={styles.container}>
            {displayItems.map(item => {
              const { title, image, excerpt, link } = resolveItemFields(item)
              const cardContent = (
                <div key={item.id} className={styles.card}>
                  {image && (
                    <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg mb-3" />
                  )}
                  <h3 className="font-semibold text-sm mb-1">{title}</h3>
                  {excerpt && <p className="text-xs opacity-70 line-clamp-3">{excerpt}</p>}
                </div>
              )

              if (link && !isEditing) {
                return (
                  <a key={item.id} href={link} className="block no-underline">
                    {cardContent}
                  </a>
                )
              }

              return cardContent
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export const collectionListMeta = {
  type: 'collection-list',
  label: 'Collection List',
  icon: '🗄️',
  variants: [
    'startup-grid', 'startup-list',
    'corporate-grid', 'corporate-list',
    'luxe-grid', 'luxe-list',
  ],
  defaultVariant: 'startup-grid',
  defaultContent: { title: 'Collection', subtitle: 'Contenus dynamiques depuis le CMS.', emptyMessage: 'Aucun element a afficher.', columns: 3, showPagination: true },
}
