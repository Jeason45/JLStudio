import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/db'
import { sendOrderConfirmation, sendDigitalProductDelivery } from '@/lib/ecommerceEmails'
import type { Order, OrderItem } from '@/types/ecommerce'

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    }

    const body = await request.text()
    const sig = request.headers.get('stripe-signature')
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!sig || !webhookSecret) {
      return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret)

    if (event.type === 'payment_intent.succeeded') {
      const pi = event.data.object
      const orderId = pi.metadata.orderId

      if (!orderId) {
        console.error('Stripe webhook: missing orderId in metadata')
        return NextResponse.json({ received: true })
      }

      // Update order to PAID + decrement stock
      const order = await prisma.$transaction(async (tx) => {
        const ord = await tx.order.update({
          where: { id: orderId },
          data: { status: 'PAID' },
          include: { items: { include: { product: true } } },
        })

        // Decrement stock for tracked products
        for (const item of ord.items) {
          if (item.product?.trackInventory) {
            await tx.product.update({
              where: { id: item.product.id },
              data: { stock: { decrement: item.quantity } },
            })
          }
        }

        return ord
      })

      // Send confirmation email
      const orderData = {
        ...order,
        shippingAddress: order.shippingAddress as unknown as Order['shippingAddress'],
        billingAddress: order.billingAddress as unknown as Order['billingAddress'],
        metadata: (order.metadata || {}) as Record<string, unknown>,
        paymentProvider: order.paymentProvider ?? undefined,
        paymentId: order.paymentId ?? undefined,
        couponId: order.couponId ?? undefined,
        notes: order.notes ?? undefined,
        items: order.items.map(i => ({
          id: i.id,
          orderId: i.orderId,
          productId: i.productId ?? undefined,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          variantLabel: i.variantLabel ?? undefined,
          sku: i.sku ?? undefined,
        })),
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
      } as Order

      await sendOrderConfirmation(orderData)

      // Send digital product delivery if applicable
      const digitalItems = order.items.filter(i => i.product?.isDigital && i.product.digitalFileUrl)
      if (digitalItems.length > 0) {
        await sendDigitalProductDelivery(
          orderData,
          digitalItems.map(i => ({ name: i.name, url: i.product!.digitalFileUrl! }))
        )
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }
}
