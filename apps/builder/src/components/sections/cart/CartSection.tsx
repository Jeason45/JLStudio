'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { CartContent } from '@/types/sections'
import { formatPrice } from '@/types/ecommerce'
import { useCart } from '@/hooks/useCart'
import { ShoppingBag, Trash2, Plus, Minus, Tag, X } from 'lucide-react'

interface Props {
  config: SectionConfig
  isEditing?: boolean
}

const UNIVERSES: Record<string, { bg: string; card: string; accent: string; text: string; muted: string; btn: string; border: string }> = {
  startup: { bg: 'bg-gray-50', card: 'bg-white', accent: 'text-blue-600', text: 'text-gray-900', muted: 'text-gray-500', btn: 'bg-blue-600 hover:bg-blue-700 text-white', border: 'border-gray-200' },
  corporate: { bg: 'bg-slate-50', card: 'bg-white', accent: 'text-indigo-600', text: 'text-slate-900', muted: 'text-slate-500', btn: 'bg-indigo-600 hover:bg-indigo-700 text-white', border: 'border-slate-200' },
  luxe: { bg: 'bg-stone-950', card: 'bg-stone-900', accent: 'text-amber-400', text: 'text-white', muted: 'text-stone-400', btn: 'bg-amber-500 hover:bg-amber-600 text-black', border: 'border-stone-700' },
  creative: { bg: 'bg-fuchsia-50', card: 'bg-white', accent: 'text-fuchsia-600', text: 'text-gray-900', muted: 'text-gray-500', btn: 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white', border: 'border-fuchsia-200' },
  ecommerce: { bg: 'bg-gray-50', card: 'bg-white', accent: 'text-emerald-600', text: 'text-gray-900', muted: 'text-gray-500', btn: 'bg-emerald-600 hover:bg-emerald-700 text-white', border: 'border-gray-200' },
  glass: { bg: 'bg-gray-900/80 backdrop-blur-xl', card: 'bg-white/5 backdrop-blur', accent: 'text-cyan-400', text: 'text-white', muted: 'text-gray-400', btn: 'bg-cyan-500 hover:bg-cyan-600 text-white', border: 'border-white/10' },
}

// Static demo items for editor preview
const DEMO_ITEMS = [
  { name: 'T-Shirt Premium', price: 2990, quantity: 2, image: '' },
  { name: 'Casquette Logo', price: 1990, quantity: 1, image: '' },
  { name: 'Sac Tote', price: 3490, quantity: 1, image: '' },
]

export function CartSection({ config, isEditing }: Props) {
  const content = config.content as CartContent
  const variant = config.variant || 'startup-slide'
  const [universe] = variant.split('-') as [string]
  const u = UNIVERSES[universe] || UNIVERSES.startup

  // Production: real cart from localStorage via useCart hook
  const cart = useCart()

  // Coupon input state (production only)
  const [couponInput, setCouponInput] = useState('')

  // Editor uses demo data, production uses real cart
  const items = isEditing
    ? DEMO_ITEMS.map((d, i) => ({ ...d, productId: `demo-${i}`, variantId: undefined as string | undefined }))
    : cart.items
  const subtotal = isEditing
    ? DEMO_ITEMS.reduce((sum, i) => sum + i.price * i.quantity, 0)
    : cart.subtotal
  const activeCoupon = isEditing ? undefined : cart.cart.couponCode

  const handleQuantityChange = (productId: string, variantId: string | undefined, delta: number, currentQty: number) => {
    if (isEditing) return
    cart.updateQuantity(productId, variantId, currentQty + delta)
  }

  const handleRemove = (productId: string, variantId: string | undefined) => {
    if (isEditing) return
    cart.removeItem(productId, variantId)
  }

  const handleApplyCoupon = () => {
    if (isEditing || !couponInput.trim()) return
    cart.applyCoupon(couponInput.trim())
    setCouponInput('')
  }

  const handleRemoveCoupon = () => {
    if (isEditing) return
    cart.removeCoupon()
  }

  if (!isEditing && items.length === 0) {
    return (
      <section className={cn('py-20 px-4', u.bg)}>
        <div className="max-w-lg mx-auto text-center">
          <ShoppingBag className={cn('w-16 h-16 mx-auto mb-4', u.muted)} />
          <p className={cn('text-lg', u.muted)}>{content.emptyMessage}</p>
          <button className={cn('mt-6 px-6 py-2.5 rounded-lg font-medium transition-colors', u.btn)}>
            {content.continueShoppingLabel}
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className={cn('py-12 px-4', u.bg)}>
      <div className="max-w-4xl mx-auto">
        <h2 className={cn('text-2xl font-bold mb-8', u.text)}>Panier</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <div key={`${item.productId}-${item.variantId ?? i}`} className={cn('flex items-center gap-4 p-4 rounded-xl border', u.card, u.border)}>
                {content.showProductImages && (
                  <div className={cn('w-20 h-20 rounded-lg bg-gray-200 shrink-0 flex items-center justify-center overflow-hidden', u.muted)}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <ShoppingBag className="w-6 h-6" />
                    )}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className={cn('font-medium truncate', u.text)}>{item.name}</h3>
                  <p className={cn('text-sm mt-1', u.accent)}>{formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.variantId, -1, item.quantity)}
                    className={cn('w-7 h-7 rounded flex items-center justify-center border', u.border, u.text)}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className={cn('w-8 text-center text-sm', u.text)}>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.variantId, 1, item.quantity)}
                    className={cn('w-7 h-7 rounded flex items-center justify-center border', u.border, u.text)}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <span className={cn('font-semibold w-20 text-right', u.text)}>
                  {formatPrice(item.price * item.quantity)}
                </span>
                <button
                  onClick={() => handleRemove(item.productId, item.variantId)}
                  className={cn('text-red-400 hover:text-red-500')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className={cn('p-6 rounded-xl border h-fit', u.card, u.border)}>
            <h3 className={cn('text-lg font-semibold mb-4', u.text)}>Resume</h3>

            {content.showCouponField && (
              <div className="mb-4">
                {activeCoupon ? (
                  <div className={cn('flex items-center justify-between px-3 py-2 rounded-lg border', u.border)}>
                    <div className="flex items-center gap-2">
                      <Tag className={cn('w-4 h-4', u.accent)} />
                      <span className={cn('text-sm font-medium', u.text)}>{activeCoupon}</span>
                    </div>
                    <button onClick={handleRemoveCoupon} className="text-red-400 hover:text-red-500">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div className={cn('flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border', u.border)}>
                      <Tag className={cn('w-4 h-4', u.muted)} />
                      <input
                        type="text"
                        placeholder="Code promo"
                        disabled={isEditing}
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                        className={cn('bg-transparent text-sm flex-1 outline-none', u.text)}
                      />
                    </div>
                    <button onClick={handleApplyCoupon} className={cn('px-3 py-2 rounded-lg text-sm font-medium', u.btn)}>OK</button>
                  </div>
                )}
              </div>
            )}

            <div className={cn('flex justify-between py-2 text-sm', u.muted)}>
              <span>Sous-total</span>
              <span className={u.text}>{formatPrice(subtotal)}</span>
            </div>
            <div className={cn('flex justify-between py-2 text-sm', u.muted)}>
              <span>Livraison</span>
              <span className={u.text}>Calcule a l&apos;etape suivante</span>
            </div>
            <div className={cn('flex justify-between py-3 mt-2 border-t font-semibold', u.border, u.text)}>
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <button className={cn('w-full py-3 rounded-xl font-semibold mt-4 transition-colors', u.btn)}>
              {content.checkoutLabel}
            </button>
            <button className={cn('w-full py-2 mt-2 text-sm text-center', u.muted)}>
              {content.continueShoppingLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export const cartMeta = {
  type: 'cart',
  label: 'Panier',
  icon: '🛒',
  variants: [
    'startup-slide', 'startup-page',
    'corporate-slide', 'corporate-page',
    'luxe-slide', 'luxe-page',
    'creative-slide', 'creative-page',
    'ecommerce-slide', 'ecommerce-page',
    'glass-slide', 'glass-page',
  ],
  defaultVariant: 'startup-page',
  defaultContent: {},
}
