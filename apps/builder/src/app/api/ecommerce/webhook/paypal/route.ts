import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { sendOrderConfirmation, sendDigitalProductDelivery } from '@/lib/ecommerceEmails'
import type { Order } from '@/types/ecommerce'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_SECRET = process.env.PAYPAL_SECRET
const PAYPAL_WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID
const PAYPAL_API = process.env.PAYPAL_SANDBOX === 'true'
  ? 'https://api-m.sandbox.paypal.com'
  : 'https://api-m.paypal.com'

async function getAccessToken(): Promise<string> {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
    throw new Error('PayPal not configured')
  }
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  })
  const data = await res.json()
  return data.access_token
}

async function verifyWebhookSignature(
  headers: Headers,
  body: string
): Promise<boolean> {
  if (!PAYPAL_WEBHOOK_ID) return false

  const token = await getAccessToken()
  const res = await fetch(`${PAYPAL_API}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      auth_algo: headers.get('paypal-auth-algo'),
      cert_url: headers.get('paypal-cert-url'),
      transmission_id: headers.get('paypal-transmission-id'),
      transmission_sig: headers.get('paypal-transmission-sig'),
      transmission_time: headers.get('paypal-transmission-time'),
      webhook_id: PAYPAL_WEBHOOK_ID,
      webhook_event: JSON.parse(body),
    }),
  })

  const data = await res.json()
  return data.verification_status === 'SUCCESS'
}

function toOrderData(order: {
  id: string
  orderNumber: string
  email: string
  status: string
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
  shippingAddress: unknown
  billingAddress: unknown
  metadata: unknown
  paymentProvider: string | null
  paymentId: string | null
  couponId: string | null
  notes: string | null
  createdAt: Date
  updatedAt: Date
  items: Array<{
    id: string
    orderId: string
    productId: string | null
    name: string
    price: number
    quantity: number
    variantLabel: string | null
    sku: string | null
  }>
}): Order {
  return {
    ...order,
    shippingAddress: order.shippingAddress as Order['shippingAddress'],
    billingAddress: order.billingAddress as Order['billingAddress'],
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
}

export async function POST(request: NextRequest) {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
      return NextResponse.json({ error: 'PayPal not configured' }, { status: 500 })
    }

    const body = await request.text()

    // Verify webhook signature
    const verified = await verifyWebhookSignature(request.headers, body)
    if (!verified) {
      console.error('PayPal webhook: signature verification failed')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)
    const eventType = event.event_type as string

    if (eventType === 'PAYMENT.CAPTURE.COMPLETED' || eventType === 'CHECKOUT.ORDER.APPROVED') {
      // Extract our internal orderId from custom_id or purchase_units metadata
      let orderId: string | undefined

      if (eventType === 'PAYMENT.CAPTURE.COMPLETED') {
        // capture event: resource is the capture object
        orderId = event.resource?.custom_id
          || event.resource?.supplementary_data?.related_ids?.order_id
      } else {
        // CHECKOUT.ORDER.APPROVED: resource is the order object
        orderId = event.resource?.purchase_units?.[0]?.custom_id
      }

      // Fallback: look up by PayPal order ID (stored as paymentId in our DB)
      if (!orderId) {
        const paypalOrderId = eventType === 'PAYMENT.CAPTURE.COMPLETED'
          ? event.resource?.supplementary_data?.related_ids?.order_id || event.resource?.id
          : event.resource?.id

        if (paypalOrderId) {
          const found = await prisma.order.findFirst({
            where: { paymentId: paypalOrderId },
          })
          if (found) orderId = found.id
        }
      }

      if (!orderId) {
        console.error('PayPal webhook: missing orderId', { eventType, resourceId: event.resource?.id })
        return NextResponse.json({ received: true })
      }

      // Update order to PAID + decrement stock (same pattern as Stripe webhook)
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
      const orderData = toOrderData(order)
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
    console.error('PayPal webhook error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }
}
