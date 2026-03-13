import { useState, useEffect, useCallback } from 'react'
import type { Cart, CartItem } from '@/types/ecommerce'

const CART_KEY = 'wf-cart'

function loadCart(): Cart {
  if (typeof window === 'undefined') return { items: [] }
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : { items: [] }
  } catch {
    return { items: [] }
  }
}

function saveCart(cart: Cart) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [] })

  useEffect(() => {
    setCart(loadCart())
  }, [])

  const persist = useCallback((next: Cart) => {
    setCart(next)
    saveCart(next)
  }, [])

  const addItem = useCallback((item: CartItem) => {
    setCart(prev => {
      const existing = prev.items.find(i => i.productId === item.productId && i.variantId === item.variantId)
      const next = existing
        ? { ...prev, items: prev.items.map(i => i.productId === item.productId && i.variantId === item.variantId ? { ...i, quantity: i.quantity + item.quantity } : i) }
        : { ...prev, items: [...prev.items, item] }
      saveCart(next)
      return next
    })
  }, [])

  const removeItem = useCallback((productId: string, variantId?: string) => {
    setCart(prev => {
      const next = { ...prev, items: prev.items.filter(i => !(i.productId === productId && i.variantId === variantId)) }
      saveCart(next)
      return next
    })
  }, [])

  const updateQuantity = useCallback((productId: string, variantId: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, variantId)
      return
    }
    setCart(prev => {
      const next = { ...prev, items: prev.items.map(i => i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i) }
      saveCart(next)
      return next
    })
  }, [removeItem])

  const applyCoupon = useCallback((code: string) => {
    persist({ ...cart, couponCode: code })
  }, [cart, persist])

  const removeCoupon = useCallback(() => {
    persist({ ...cart, couponCode: undefined })
  }, [cart, persist])

  const clearCart = useCallback(() => {
    persist({ items: [] })
  }, [persist])

  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return {
    cart,
    items: cart.items,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    clearCart,
  }
}
