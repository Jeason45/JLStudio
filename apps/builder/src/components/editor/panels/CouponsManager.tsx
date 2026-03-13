'use client'
import { useState } from 'react'
import { useCoupons } from '@/hooks/useCoupons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, Plus, Trash2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CouponType } from '@/types/ecommerce'

interface Props {
  siteId: string
  onBack: () => void
}

const COUPON_TYPES: { value: CouponType; label: string }[] = [
  { value: 'DISCOUNT_PERCENT', label: 'Pourcentage' },
  { value: 'DISCOUNT_FIXED', label: 'Montant fixe' },
  { value: 'FREE_SHIPPING', label: 'Livraison gratuite' },
]

export function CouponsManager({ siteId, onBack }: Props) {
  const { coupons, loading, createCoupon, updateCoupon, deleteCoupon } = useCoupons(siteId)
  const [isAdding, setIsAdding] = useState(false)
  const [code, setCode] = useState('')
  const [type, setType] = useState<CouponType>('DISCOUNT_PERCENT')
  const [value, setValue] = useState('')
  const [minOrder, setMinOrder] = useState('')
  const [maxUses, setMaxUses] = useState('')

  const inputClass = 'w-full px-2.5 py-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 outline-none focus:border-blue-500'
  const labelClass = 'text-[10px] font-medium text-zinc-300 mb-1'

  const handleCreate = async () => {
    if (!code.trim() || !value) return
    await createCoupon({
      code: code.trim(),
      type,
      value: parseInt(value) || 0,
      minOrderAmount: minOrder ? parseInt(minOrder) : undefined,
      maxUses: maxUses ? parseInt(maxUses) : undefined,
    })
    setCode(''); setValue(''); setMinOrder(''); setMaxUses('')
    setIsAdding(false)
  }

  const handleToggle = async (couponId: string, active: boolean) => {
    await updateCoupon(couponId, { active })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce coupon ?')) return
    await deleteCoupon(id)
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-3">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-3">
          <ArrowLeft className="w-3.5 h-3.5" /> E-Commerce
        </button>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-zinc-200">Coupons</span>
          <button onClick={() => setIsAdding(true)} className="p-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {isAdding && (
          <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 mb-3 space-y-2">
            <div>
              <label className={labelClass}>Code</label>
              <input value={code} onChange={e => setCode(e.target.value.toUpperCase())} className={inputClass} placeholder="PROMO20" />
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select value={type} onChange={e => setType(e.target.value as CouponType)} className={inputClass}>
                {COUPON_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Valeur {type === 'DISCOUNT_PERCENT' ? '(%)' : type === 'DISCOUNT_FIXED' ? '(centimes)' : ''}</label>
              <input type="number" value={value} onChange={e => setValue(e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>Min. commande</label>
                <input type="number" value={minOrder} onChange={e => setMinOrder(e.target.value)} className={inputClass} placeholder="Centimes" />
              </div>
              <div>
                <label className={labelClass}>Utilisations max</label>
                <input type="number" value={maxUses} onChange={e => setMaxUses(e.target.value)} className={inputClass} />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleCreate} className="flex-1 py-1.5 rounded-md bg-blue-600 text-white text-xs font-medium">Creer</button>
              <button onClick={() => setIsAdding(false)} className="px-3 py-1.5 rounded-md bg-zinc-700 text-zinc-300 text-xs">Annuler</button>
            </div>
          </div>
        )}

        {loading && <Loader2 className="w-4 h-4 animate-spin text-zinc-500 mx-auto my-4" />}

        <div className="space-y-1">
          {coupons.map(c => (
            <div key={c.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800/50 group">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-zinc-200 font-mono">{c.code}</div>
                <div className="text-[10px] text-zinc-500">
                  {c.type === 'DISCOUNT_PERCENT' ? `${c.value}%` : c.type === 'DISCOUNT_FIXED' ? `${(c.value / 100).toFixed(2)}€` : 'Livraison gratuite'}
                  {c.maxUses ? ` · ${c.usedCount}/${c.maxUses}` : ''}
                </div>
              </div>
              <button
                onClick={() => handleToggle(c.id, !c.active)}
                className={cn('px-2 py-0.5 rounded-full text-[9px] font-medium', c.active ? 'bg-green-500/20 text-green-400' : 'bg-zinc-600/20 text-zinc-500')}
              >
                {c.active ? 'Actif' : 'Inactif'}
              </button>
              <button onClick={() => handleDelete(c.id)} className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
          {!loading && coupons.length === 0 && (
            <p className="text-xs text-zinc-600 text-center py-4">Aucun coupon</p>
          )}
        </div>
      </div>
    </ScrollArea>
  )
}
