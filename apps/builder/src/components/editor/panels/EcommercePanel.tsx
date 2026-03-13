'use client'
import { useState } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ShoppingBag, Package, Tag, Truck, Receipt, Percent, ChevronRight, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProductEditor } from './ProductEditor'
import { OrdersManager } from './OrdersManager'
import { CouponsManager } from './CouponsManager'
import { ShippingZonesEditor } from './ShippingZonesEditor'
import { TaxRatesEditor } from './TaxRatesEditor'

type EcomView = 'hub' | 'products' | 'orders' | 'coupons' | 'shipping' | 'taxes'

const TILES: { id: EcomView; label: string; description: string; icon: typeof ShoppingBag }[] = [
  { id: 'products', label: 'Produits', description: 'Gerer votre catalogue', icon: Package },
  { id: 'orders', label: 'Commandes', description: 'Suivi des commandes', icon: Receipt },
  { id: 'coupons', label: 'Coupons', description: 'Codes promo & reductions', icon: Percent },
  { id: 'shipping', label: 'Livraison', description: 'Zones & tarifs', icon: Truck },
  { id: 'taxes', label: 'Taxes', description: 'Taux de taxation', icon: Tag },
]

export function EcommercePanel() {
  const { siteConfig } = useEditorStore()
  const siteId = siteConfig?.id
  const [view, setView] = useState<EcomView>('hub')

  if (!siteId) {
    return (
      <div className="p-4 text-xs text-zinc-500">Aucun site charge.</div>
    )
  }

  if (view === 'products') {
    return <ProductEditor siteId={siteId} onBack={() => setView('hub')} />
  }
  if (view === 'orders') {
    return <OrdersManager siteId={siteId} onBack={() => setView('hub')} />
  }
  if (view === 'coupons') {
    return <CouponsManager siteId={siteId} onBack={() => setView('hub')} />
  }
  if (view === 'shipping') {
    return <ShippingZonesEditor siteId={siteId} onBack={() => setView('hub')} />
  }
  if (view === 'taxes') {
    return <TaxRatesEditor siteId={siteId} onBack={() => setView('hub')} />
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <ShoppingBag className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-[#ccc]">E-Commerce</span>
        </div>
        {TILES.map(tile => {
          const Icon = tile.icon
          return (
            <button
              key={tile.id}
              onClick={() => setView(tile.id)}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-zinc-700/50 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-zinc-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-[#ccc]">{tile.label}</div>
                <div className="text-[10px] text-zinc-500 truncate">{tile.description}</div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </button>
          )
        })}
      </div>
    </ScrollArea>
  )
}
