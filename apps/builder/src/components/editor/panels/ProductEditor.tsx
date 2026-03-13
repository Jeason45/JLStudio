'use client'
import { useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { useProductCategories } from '@/hooks/useProductCategories'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, Plus, Trash2, Loader2, Package, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/types/ecommerce'
import type { Product, ProductVariant } from '@/types/ecommerce'

interface Props {
  siteId: string
  onBack: () => void
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function ProductEditor({ siteId, onBack }: Props) {
  const { products, loading, createProduct, updateProduct, deleteProduct } = useProducts(siteId)
  const { categories } = useProductCategories(siteId)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  // Form state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [compareAtPrice, setCompareAtPrice] = useState('')
  const [sku, setSku] = useState('')
  const [stock, setStock] = useState('0')
  const [trackInventory, setTrackInventory] = useState(false)
  const [isDigital, setIsDigital] = useState(false)
  const [digitalFileUrl, setDigitalFileUrl] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [tags, setTags] = useState('')
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT')

  const resetForm = () => {
    setName(''); setDescription(''); setPrice(''); setCompareAtPrice('')
    setSku(''); setStock('0'); setTrackInventory(false); setIsDigital(false)
    setDigitalFileUrl(''); setCategoryId(''); setTags(''); setStatus('DRAFT')
    setEditingId(null)
  }

  const loadProduct = (p: Product) => {
    setEditingId(p.id)
    setName(p.name); setDescription(p.description || ''); setPrice(String(p.price))
    setCompareAtPrice(p.compareAtPrice ? String(p.compareAtPrice) : '')
    setSku(p.sku || ''); setStock(String(p.stock)); setTrackInventory(p.trackInventory)
    setIsDigital(p.isDigital); setDigitalFileUrl(p.digitalFileUrl || '')
    setCategoryId(p.categoryId || ''); setTags(p.tags.join(', ')); setStatus(p.status as 'DRAFT' | 'PUBLISHED')
  }

  const handleSave = async () => {
    const data: Partial<Product> = {
      name, slug: slugify(name), description,
      price: parseInt(price) || 0,
      compareAtPrice: compareAtPrice ? parseInt(compareAtPrice) : undefined,
      sku: sku || undefined, stock: parseInt(stock) || 0,
      trackInventory, isDigital, digitalFileUrl: digitalFileUrl || undefined,
      categoryId: categoryId || undefined,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      status,
    }
    if (editingId) {
      await updateProduct(editingId, data)
    } else {
      await createProduct(data)
    }
    resetForm()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce produit ?')) return
    await deleteProduct(id)
    if (editingId === id) resetForm()
  }

  const inputClass = 'w-full px-2.5 py-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 outline-none focus:border-blue-500'
  const labelClass = 'text-[10px] font-medium text-zinc-300 mb-1'

  const filtered = products.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  )

  if (editingId !== null || name) {
    return (
      <ScrollArea className="flex-1">
        <div className="p-3">
          <button onClick={resetForm} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-3">
            <ArrowLeft className="w-3.5 h-3.5" /> Retour aux produits
          </button>

          <div className="space-y-3">
            <div>
              <label className={labelClass}>Nom</label>
              <input value={name} onChange={e => setName(e.target.value)} className={inputClass} placeholder="Nom du produit" />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className={cn(inputClass, 'h-20 resize-none')} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>Prix (centimes)</label>
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} className={inputClass} placeholder="4990" />
              </div>
              <div>
                <label className={labelClass}>Prix barre</label>
                <input type="number" value={compareAtPrice} onChange={e => setCompareAtPrice(e.target.value)} className={inputClass} placeholder="5990" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>SKU</label>
                <input value={sku} onChange={e => setSku(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Stock</label>
                <input type="number" value={stock} onChange={e => setStock(e.target.value)} className={inputClass} />
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs text-zinc-300">
              <input type="checkbox" checked={trackInventory} onChange={e => setTrackInventory(e.target.checked)} className="rounded" />
              Suivre l&apos;inventaire
            </label>
            <label className="flex items-center gap-2 text-xs text-zinc-300">
              <input type="checkbox" checked={isDigital} onChange={e => setIsDigital(e.target.checked)} className="rounded" />
              Produit numerique
            </label>
            {isDigital && (
              <div>
                <label className={labelClass}>URL du fichier</label>
                <input value={digitalFileUrl} onChange={e => setDigitalFileUrl(e.target.value)} className={inputClass} placeholder="https://..." />
              </div>
            )}
            {categories.length > 0 && (
              <div>
                <label className={labelClass}>Categorie</label>
                <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className={inputClass}>
                  <option value="">Aucune</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className={labelClass}>Tags (separes par virgule)</label>
              <input value={tags} onChange={e => setTags(e.target.value)} className={inputClass} placeholder="nouveau, promo" />
            </div>
            <div>
              <label className={labelClass}>Statut</label>
              <select value={status} onChange={e => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')} className={inputClass}>
                <option value="DRAFT">Brouillon</option>
                <option value="PUBLISHED">Publie</option>
              </select>
            </div>

            <button onClick={handleSave} className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors">
              {editingId ? 'Mettre a jour' : 'Creer le produit'}
            </button>
          </div>
        </div>
      </ScrollArea>
    )
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-3">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-3">
          <ArrowLeft className="w-3.5 h-3.5" /> E-Commerce
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className={cn(inputClass, 'flex items-center gap-1.5 flex-1')}>
            <Search className="w-3 h-3 text-zinc-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent outline-none flex-1 text-xs" placeholder="Rechercher..." />
          </div>
          <button onClick={() => setEditingId('')} className="p-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading && <Loader2 className="w-4 h-4 animate-spin text-zinc-500 mx-auto my-4" />}

        <div className="space-y-1">
          {filtered.map(p => (
            <div
              key={p.id}
              onClick={() => loadProduct(p)}
              className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-zinc-800/50 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded bg-zinc-700/50 flex items-center justify-center shrink-0">
                <Package className="w-3.5 h-3.5 text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-zinc-200 truncate">{p.name}</div>
                <div className="text-[10px] text-zinc-500">{formatPrice(p.price)} · {p.status}</div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(p.id) }}
                className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-all"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
          {!loading && filtered.length === 0 && (
            <p className="text-xs text-zinc-600 text-center py-4">Aucun produit</p>
          )}
        </div>
      </div>
    </ScrollArea>
  )
}
