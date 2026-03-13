'use client'
import { useState } from 'react'
import { useShippingZones } from '@/hooks/useShippingZones'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, Plus, Trash2, Loader2 } from 'lucide-react'
import type { ShippingRate } from '@/types/ecommerce'

interface Props {
  siteId: string
  onBack: () => void
}

export function ShippingZonesEditor({ siteId, onBack }: Props) {
  const { zones, loading, createZone, updateZone, deleteZone } = useShippingZones(siteId)
  const [isAdding, setIsAdding] = useState(false)
  const [name, setName] = useState('')
  const [countries, setCountries] = useState('')

  const inputClass = 'w-full px-2.5 py-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 outline-none focus:border-blue-500'
  const labelClass = 'text-[10px] font-medium text-zinc-300 mb-1'

  const handleCreate = async () => {
    if (!name.trim()) return
    await createZone({
      name: name.trim(),
      countries: countries.split(',').map(c => c.trim()).filter(Boolean),
      rates: [{ id: '1', name: 'Standard', price: 500, estimatedDays: '3-5' }],
    })
    setName(''); setCountries(''); setIsAdding(false)
  }

  const handleAddRate = async (zoneId: string, currentRates: ShippingRate[]) => {
    const newRate: ShippingRate = {
      id: String(currentRates.length + 1),
      name: 'Nouveau tarif',
      price: 0,
    }
    await updateZone(zoneId, { rates: [...currentRates, newRate] })
  }

  const handleUpdateRate = async (zoneId: string, rates: ShippingRate[], rateIdx: number, field: keyof ShippingRate, value: string | number) => {
    const updated = rates.map((r, i) => i === rateIdx ? { ...r, [field]: value } : r)
    await updateZone(zoneId, { rates: updated })
  }

  const handleDeleteRate = async (zoneId: string, rates: ShippingRate[], rateIdx: number) => {
    await updateZone(zoneId, { rates: rates.filter((_, i) => i !== rateIdx) })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette zone ?')) return
    await deleteZone(id)
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-3">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-3">
          <ArrowLeft className="w-3.5 h-3.5" /> E-Commerce
        </button>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-zinc-200">Zones de livraison</span>
          <button onClick={() => setIsAdding(true)} className="p-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {isAdding && (
          <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 mb-3 space-y-2">
            <div>
              <label className={labelClass}>Nom</label>
              <input value={name} onChange={e => setName(e.target.value)} className={inputClass} placeholder="France metropolitaine" />
            </div>
            <div>
              <label className={labelClass}>Pays (codes ISO, virgule)</label>
              <input value={countries} onChange={e => setCountries(e.target.value)} className={inputClass} placeholder="FR, BE, CH" />
            </div>
            <div className="flex gap-2">
              <button onClick={handleCreate} className="flex-1 py-1.5 rounded-md bg-blue-600 text-white text-xs font-medium">Creer</button>
              <button onClick={() => setIsAdding(false)} className="px-3 py-1.5 rounded-md bg-zinc-700 text-zinc-300 text-xs">Annuler</button>
            </div>
          </div>
        )}

        {loading && <Loader2 className="w-4 h-4 animate-spin text-zinc-500 mx-auto my-4" />}

        <div className="space-y-3">
          {zones.map(z => {
            const rates = (z.rates || []) as ShippingRate[]
            return (
              <div key={z.id} className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-zinc-200">{z.name}</span>
                  <button onClick={() => handleDelete(z.id)} className="text-zinc-600 hover:text-red-400">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                {z.countries.length > 0 && (
                  <p className="text-[10px] text-zinc-500 mb-2">{z.countries.join(', ')}</p>
                )}
                <div className="space-y-1">
                  {rates.map((r, i) => (
                    <div key={r.id} className="flex items-center gap-1.5">
                      <input
                        value={r.name}
                        onChange={e => handleUpdateRate(z.id, rates, i, 'name', e.target.value)}
                        className="flex-1 px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-300 outline-none"
                        placeholder="Nom"
                      />
                      <input
                        type="number"
                        value={r.price}
                        onChange={e => handleUpdateRate(z.id, rates, i, 'price', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-300 outline-none"
                        placeholder="¢"
                      />
                      <button onClick={() => handleDeleteRate(z.id, rates, i)} className="text-zinc-600 hover:text-red-400">
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleAddRate(z.id, rates)}
                  className="mt-2 text-[10px] text-blue-400 hover:text-blue-300"
                >
                  + Ajouter un tarif
                </button>
              </div>
            )
          })}
          {!loading && zones.length === 0 && (
            <p className="text-xs text-zinc-600 text-center py-4">Aucune zone</p>
          )}
        </div>
      </div>
    </ScrollArea>
  )
}
