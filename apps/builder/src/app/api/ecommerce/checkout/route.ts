import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { createPaymentIntent } from '@/lib/stripe'
import { createPaypalOrder } from '@/lib/paypal'
import type { CartItem, AddressData, ShippingRate } from '@/types/ecommerce'

function generateOrderNumber(): string {
  const d = new Date()
  const prefix = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}-${rand}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { siteId, items, email, shippingAddress, billingAddress, paymentMethod, couponCode, notes } = body as {
      siteId: string
      items: CartItem[]
      email: string
      shippingAddress: AddressData
      billingAddress?: AddressData
      paymentMethod: 'stripe' | 'paypal'
      couponCode?: string
      notes?: string
    }

    if (!siteId || !items?.length || !email || !shippingAddress || !paymentMethod) {
      return NextResponse.json({ error: 'Données de checkout incomplètes' }, { status: 400 })
    }

    // 1. Validate products exist + PUBLISHED + stock
    const productIds = [...new Set(items.map(i => i.productId))]
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, siteId, status: 'PUBLISHED' },
    })

    const productMap = new Map(products.map(p => [p.id, p]))
    for (const item of items) {
      const p = productMap.get(item.productId)
      if (!p) {
        return NextResponse.json({ error: `Produit introuvable : ${item.name}` }, { status: 400 })
      }
      if (p.trackInventory && p.stock < item.quantity) {
        return NextResponse.json({ error: `Stock insuffisant pour : ${p.name}` }, { status: 400 })
      }
    }

    const currency = products[0]?.currency || 'EUR'

    // 2. Calculate subtotal
    const subtotal = items.reduce((sum, item) => {
      const p = productMap.get(item.productId)!
      return sum + (p.price * item.quantity)
    }, 0)

    // 3. Resolve tax
    const taxRates = await prisma.taxRate.findMany({
      where: { siteId, active: true },
    })
    const applicableTax = taxRates.find(t =>
      (!t.country || t.country === shippingAddress.country) &&
      (!t.region || t.region === shippingAddress.state)
    )
    const taxAmount = applicableTax ? Math.round(subtotal * applicableTax.rate / 100) : 0

    // 4. Resolve shipping
    const zones = await prisma.shippingZone.findMany({ where: { siteId } })
    let shippingAmount = 0
    const matchingZone = zones.find(z =>
      z.countries.length === 0 || z.countries.includes(shippingAddress.country)
    )
    if (matchingZone) {
      const rates = (matchingZone.rates as unknown as ShippingRate[]) || []
      const cheapest = rates.sort((a, b) => a.price - b.price)[0]
      if (cheapest) shippingAmount = cheapest.price
    }

    // 5. Validate + apply coupon
    let discount = 0
    let couponId: string | null = null
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { siteId_code: { siteId, code: couponCode.toUpperCase() } },
      })
      if (coupon?.active) {
        const now = new Date()
        const valid = (!coupon.validFrom || now >= coupon.validFrom) &&
          (!coupon.validTo || now <= coupon.validTo) &&
          (!coupon.maxUses || coupon.usedCount < coupon.maxUses) &&
          (!coupon.minOrderAmount || subtotal >= coupon.minOrderAmount)

        if (valid) {
          couponId = coupon.id
          if (coupon.type === 'DISCOUNT_PERCENT') {
            discount = Math.round(subtotal * coupon.value / 100)
          } else if (coupon.type === 'DISCOUNT_FIXED') {
            discount = Math.min(coupon.value, subtotal)
          } else if (coupon.type === 'FREE_SHIPPING') {
            shippingAmount = 0
          }
        }
      }
    }

    // 6. Calculate total
    const total = Math.max(0, subtotal + taxAmount + shippingAmount - discount)
    const orderNumber = generateOrderNumber()

    // 7. Create Order + OrderItems in transaction
    const order = await prisma.$transaction(async (tx) => {
      const ord = await tx.order.create({
        data: {
          siteId,
          orderNumber,
          email,
          status: 'PAYMENT_PENDING',
          subtotal,
          tax: taxAmount,
          shipping: shippingAmount,
          discount,
          total,
          currency,
          shippingAddress: JSON.parse(JSON.stringify(shippingAddress)),
          billingAddress: billingAddress ? JSON.parse(JSON.stringify(billingAddress)) : undefined,
          paymentProvider: paymentMethod,
          couponId,
          notes: notes || null,
          items: {
            create: items.map(item => ({
              productId: item.productId,
              name: item.name,
              price: productMap.get(item.productId)!.price,
              quantity: item.quantity,
              variantLabel: item.variantLabel || null,
              sku: item.sku || null,
            })),
          },
        },
        include: { items: true },
      })

      // Increment coupon usage
      if (couponId) {
        await tx.coupon.update({
          where: { id: couponId },
          data: { usedCount: { increment: 1 } },
        })
      }

      return ord
    })

    // 8. Dispatch webhook for order.created
    try {
      const site = await prisma.site.findUnique({ where: { id: siteId } })
      if (site?.config) {
        const { dispatchWebhook } = await import('@/lib/webhookDispatcher')
        const sc = site.config as unknown as import('@/types/site').SiteConfig
        dispatchWebhook(sc, 'order.created', { orderId: order.id, orderNumber, email, total, currency }).catch(() => {})
      }
    } catch { /* ignore */ }

    // 9. Init payment
    if (paymentMethod === 'stripe') {
      const pi = await createPaymentIntent(total, currency, {
        orderId: order.id,
        orderNumber,
        siteId,
      })
      await prisma.order.update({
        where: { id: order.id },
        data: { paymentId: pi.id },
      })
      return NextResponse.json({
        orderId: order.id,
        orderNumber,
        clientSecret: pi.client_secret,
      })
    } else {
      const ppOrder = await createPaypalOrder(total, currency)
      await prisma.order.update({
        where: { id: order.id },
        data: { paymentId: ppOrder.id },
      })
      return NextResponse.json({
        orderId: order.id,
        orderNumber,
        paypalOrderId: ppOrder.id,
      })
    }
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Erreur lors du checkout' }, { status: 500 })
  }
}
