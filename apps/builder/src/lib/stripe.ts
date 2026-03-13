import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2026-02-25.clover' })
  : null

export async function createPaymentIntent(
  amount: number,
  currency: string,
  metadata: Record<string, string>
) {
  if (!stripe) throw new Error('Stripe is not configured (missing STRIPE_SECRET_KEY)')
  return stripe.paymentIntents.create({
    amount,
    currency: currency.toLowerCase(),
    metadata,
    automatic_payment_methods: { enabled: true },
  })
}
