'use client'
import { useState } from 'react'
import { useOrders } from '@/hooks/useOrders'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, Loader2, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/types/ecommerce'
import type { Order, OrderStatus } from '@/types/ecommerce'

interface Props {
  siteId: string
  onBack: () => void
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-500/20 text-yellow-400',
  PAYMENT_PENDING: 'bg-orange-500/20 text-orange-400',
  PAID: 'bg-green-500/20 text-green-400',
  PROCESSING: 'bg-blue-500/20 text-blue-400',
  SHIPPED: 'bg-wf-blue/20 text-wf-blue',
  DELIVERED: 'bg-emerald-500/20 text-emerald-400',
  CANCELLED: 'bg-red-500/20 text-red-400',
  REFUNDED: 'bg-zinc-500/20 text-zinc-400',
}

const STATUS_OPTIONS: OrderStatus[] = ['PENDING', 'PAYMENT_PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']

export function OrdersManager({ siteId, onBack }: Props) {
  const { orders, loading, updateOrderStatus } = useOrders(siteId)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedOrder = orders.find(o => o.id === selectedId)

  if (selectedOrder) {
    return (
      <ScrollArea className="flex-1">
        <div className="p-3">
          <button onClick={() => setSelectedId(null)} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-3">
            <ArrowLeft className="w-3.5 h-3.5" /> Retour
          </button>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-200">#{selectedOrder.orderNumber}</span>
              <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-medium', STATUS_COLORS[selectedOrder.status])}>
                {selectedOrder.status}
              </span>
            </div>

            <div className="text-xs text-zinc-400 space-y-1">
              <p>Email : {selectedOrder.email}</p>
              <p>Date : {new Date(selectedOrder.createdAt).toLocaleDateString('fr-FR')}</p>
              {selectedOrder.paymentProvider && <p>Paiement : {selectedOrder.paymentProvider}</p>}
            </div>

            <div className="border-t border-zinc-700 pt-3">
              <label className="text-[10px] font-medium text-zinc-300 mb-1 block">Articles</label>
              {selectedOrder.items?.map(item => (
                <div key={item.id} className="flex justify-between text-xs text-zinc-300 py-1">
                  <span>{item.name} {item.variantLabel && `(${item.variantLabel})`} x{item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity, selectedOrder.currency)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-700 pt-3 space-y-1 text-xs text-zinc-400">
              <div className="flex justify-between"><span>Sous-total</span><span className="text-zinc-200">{formatPrice(selectedOrder.subtotal, selectedOrder.currency)}</span></div>
              {selectedOrder.shipping > 0 && <div className="flex justify-between"><span>Livraison</span><span className="text-zinc-200">{formatPrice(selectedOrder.shipping, selectedOrder.currency)}</span></div>}
              {selectedOrder.tax > 0 && <div className="flex justify-between"><span>Taxes</span><span className="text-zinc-200">{formatPrice(selectedOrder.tax, selectedOrder.currency)}</span></div>}
              {selectedOrder.discount > 0 && <div className="flex justify-between"><span>Remise</span><span className="text-green-400">-{formatPrice(selectedOrder.discount, selectedOrder.currency)}</span></div>}
              <div className="flex justify-between font-semibold text-zinc-200 pt-1 border-t border-zinc-700">
                <span>Total</span><span>{formatPrice(selectedOrder.total, selectedOrder.currency)}</span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-medium text-zinc-300 mb-1 block">Changer le statut</label>
              <select
                value={selectedOrder.status}
                onChange={e => updateOrderStatus(selectedOrder.id, e.target.value as OrderStatus)}
                className="w-full px-2.5 py-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 outline-none"
              >
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
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

        <div className="text-xs font-semibold text-zinc-200 mb-3">Commandes</div>

        {loading && <Loader2 className="w-4 h-4 animate-spin text-zinc-500 mx-auto my-4" />}

        <div className="space-y-1">
          {orders.map(o => (
            <button
              key={o.id}
              onClick={() => setSelectedId(o.id)}
              className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-zinc-800/50 text-left group"
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs text-zinc-200">#{o.orderNumber}</div>
                <div className="text-[10px] text-zinc-500">{o.email} · {formatPrice(o.total, o.currency)}</div>
              </div>
              <span className={cn('px-1.5 py-0.5 rounded-full text-[9px] font-medium shrink-0', STATUS_COLORS[o.status])}>
                {o.status}
              </span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
            </button>
          ))}
          {!loading && orders.length === 0 && (
            <p className="text-xs text-zinc-600 text-center py-4">Aucune commande</p>
          )}
        </div>
      </div>
    </ScrollArea>
  )
}
