'use client'
import { useState } from 'react'
import { useTaxRates } from '@/hooks/useTaxRates'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, Plus, Trash2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  siteId: string
  onBack: () => void
}

export function TaxRatesEditor({ siteId, onBack }: Props) {
  const { rates, loading, createRate, updateRate, deleteRate } = useTaxRates(siteId)
  const [isAdding, setIsAdding] = useState(false)
  const [name, setName] = useState('')
  const [rate, setRate] = useState('')
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [includeInPrice, setIncludeInPrice] = useState(false)

  const inputClass = 'w-full px-2.5 py-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 outline-none focus:border-blue-500'
  const labelClass = 'text-[10px] font-medium text-zinc-300 mb-1'

  const handleCreate = async () => {
    if (!name.trim() || !rate) return
    await createRate({
      name: name.trim(),
      rate: parseFloat(rate) || 0,
      country: country || undefined,
      region: region || undefined,
      includeInPrice,
    })
    setName(''); setRate(''); setCountry(''); setRegion(''); setIncludeInPrice(false)
    setIsAdding(false)
  }

  const handleToggle = async (rateId: string, active: boolean) => {
    await updateRate(rateId, { active })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce taux ?')) return
    await deleteRate(id)
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-3">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-3">
          <ArrowLeft className="w-3.5 h-3.5" /> E-Commerce
        </button>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-zinc-200">Taux de taxes</span>
          <button onClick={() => setIsAdding(true)} className="p-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {isAdding && (
          <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 mb-3 space-y-2">
            <div>
              <label className={labelClass}>Nom</label>
              <input value={name} onChange={e => setName(e.target.value)} className={inputClass} placeholder="TVA 20%" />
            </div>
            <div>
              <label className={labelClass}>Taux (%)</label>
              <input type="number" step="0.01" value={rate} onChange={e => setRate(e.target.value)} className={inputClass} placeholder="20" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>Pays (ISO)</label>
                <input value={country} onChange={e => setCountry(e.target.value)} className={inputClass} placeholder="FR" />
              </div>
              <div>
                <label className={labelClass}>Region</label>
                <input value={region} onChange={e => setRegion(e.target.value)} className={inputClass} placeholder="IDF" />
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs text-zinc-300">
              <input type="checkbox" checked={includeInPrice} onChange={e => setIncludeInPrice(e.target.checked)} className="rounded" />
              Inclus dans le prix
            </label>
            <div className="flex gap-2">
              <button onClick={handleCreate} className="flex-1 py-1.5 rounded-md bg-blue-600 text-white text-xs font-medium">Creer</button>
              <button onClick={() => setIsAdding(false)} className="px-3 py-1.5 rounded-md bg-zinc-700 text-zinc-300 text-xs">Annuler</button>
            </div>
          </div>
        )}

        {loading && <Loader2 className="w-4 h-4 animate-spin text-zinc-500 mx-auto my-4" />}

        <div className="space-y-1">
          {rates.map(r => (
            <div key={r.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800/50 group">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-zinc-200">{r.name}</div>
                <div className="text-[10px] text-zinc-500">
                  {r.rate}%{r.country ? ` · ${r.country}` : ''}{r.region ? ` / ${r.region}` : ''}
                  {r.includeInPrice ? ' · TTC' : ' · HT'}
                </div>
              </div>
              <button
                onClick={() => handleToggle(r.id, !r.active)}
                className={cn('px-2 py-0.5 rounded-full text-[9px] font-medium', r.active ? 'bg-green-500/20 text-green-400' : 'bg-zinc-600/20 text-zinc-500')}
              >
                {r.active ? 'Actif' : 'Inactif'}
              </button>
              <button onClick={() => handleDelete(r.id)} className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
          {!loading && rates.length === 0 && (
            <p className="text-xs text-zinc-600 text-center py-4">Aucun taux de taxe</p>
          )}
        </div>
      </div>
    </ScrollArea>
  )
}
