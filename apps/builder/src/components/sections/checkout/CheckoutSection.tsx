'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { CheckoutContent } from '@/types/sections'
import type { CheckoutResult, AddressData } from '@/types/ecommerce'
import { formatPrice } from '@/types/ecommerce'
import { CreditCard, Lock, Check, User, MapPin, Wallet, Loader2, AlertCircle } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

// Stripe imports (client-side only)
import { loadStripe, type Stripe as StripeType } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

// PayPal imports
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

interface Props {
  config: SectionConfig
  isEditing?: boolean
}

const UNIVERSES: Record<string, { bg: string; card: string; accent: string; text: string; muted: string; btn: string; border: string; input: string }> = {
  startup: { bg: 'bg-gray-50', card: 'bg-white', accent: 'text-blue-600', text: 'text-gray-900', muted: 'text-gray-500', btn: 'bg-blue-600 hover:bg-blue-700 text-white', border: 'border-gray-200', input: 'bg-white border-gray-300 text-gray-900' },
  corporate: { bg: 'bg-slate-50', card: 'bg-white', accent: 'text-indigo-600', text: 'text-slate-900', muted: 'text-slate-500', btn: 'bg-indigo-600 hover:bg-indigo-700 text-white', border: 'border-slate-200', input: 'bg-white border-slate-300 text-slate-900' },
  luxe: { bg: 'bg-stone-950', card: 'bg-stone-900', accent: 'text-amber-400', text: 'text-white', muted: 'text-stone-400', btn: 'bg-amber-500 hover:bg-amber-600 text-black', border: 'border-stone-700', input: 'bg-stone-800 border-stone-600 text-white' },
  creative: { bg: 'bg-fuchsia-50', card: 'bg-white', accent: 'text-fuchsia-600', text: 'text-gray-900', muted: 'text-gray-500', btn: 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white', border: 'border-fuchsia-200', input: 'bg-white border-fuchsia-200 text-gray-900' },
  ecommerce: { bg: 'bg-gray-50', card: 'bg-white', accent: 'text-emerald-600', text: 'text-gray-900', muted: 'text-gray-500', btn: 'bg-emerald-600 hover:bg-emerald-700 text-white', border: 'border-gray-200', input: 'bg-white border-gray-300 text-gray-900' },
  glass: { bg: 'bg-gray-900/80 backdrop-blur-xl', card: 'bg-white/5 backdrop-blur', accent: 'text-cyan-400', text: 'text-white', muted: 'text-gray-400', btn: 'bg-cyan-500 hover:bg-cyan-600 text-white', border: 'border-white/10', input: 'bg-white/10 border-white/20 text-white' },
}

const STEPS = [
  { id: 'info', label: 'Informations', icon: User },
  { id: 'shipping', label: 'Livraison', icon: MapPin },
  { id: 'payment', label: 'Paiement', icon: CreditCard },
]

// ─── Stripe Payment Form (inner component, used inside <Elements>) ───

interface StripePaymentFormProps {
  u: typeof UNIVERSES[string]
  onSuccess: (orderId: string, orderNumber: string) => void
  onError: (message: string) => void
  loading: boolean
  setLoading: (v: boolean) => void
}

function StripePaymentForm({ u, onSuccess, onError, loading, setLoading }: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = useCallback(async () => {
    if (!stripe || !elements) return
    setLoading(true)
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.href },
        redirect: 'if_required',
      })
      if (error) {
        onError(error.message || 'Erreur de paiement')
      } else if (paymentIntent?.status === 'succeeded') {
        onSuccess(paymentIntent.id, '')
      } else {
        onError('Le paiement n\'a pas abouti. Veuillez reessayer.')
      }
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Erreur inattendue')
    } finally {
      setLoading(false)
    }
  }, [stripe, elements, onSuccess, onError, setLoading])

  return (
    <div className="space-y-4">
      <PaymentElement />
      <button
        onClick={handleSubmit}
        disabled={!stripe || loading}
        className={cn(
          'w-full py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2',
          u.btn,
          (loading || !stripe) && 'opacity-60 cursor-not-allowed',
        )}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? 'Traitement...' : 'Payer par carte'}
      </button>
    </div>
  )
}

// ─── Live Payment Form (production mode) ───

interface LivePaymentFormProps {
  content: CheckoutContent
  config: SectionConfig
  u: typeof UNIVERSES[string]
  email: string
  shippingAddress: AddressData
}

function LivePaymentForm({ content, config, u, email, shippingAddress }: LivePaymentFormProps) {
  const { items, subtotal, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>(
    content.paymentProviders[0] || 'stripe'
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ orderId: string; orderNumber: string } | null>(null)

  // Stripe state
  const [stripePromise, setStripePromise] = useState<Promise<StripeType | null> | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [checkoutResult, setCheckoutResult] = useState<CheckoutResult | null>(null)

  // Load Stripe instance
  useEffect(() => {
    if (content.stripePublishableKey && content.paymentProviders.includes('stripe')) {
      setStripePromise(loadStripe(content.stripePublishableKey))
    }
  }, [content.stripePublishableKey, content.paymentProviders])

  // Derive siteId from config.id (same pattern as FormSection)
  const siteId = useMemo(() => {
    // content may have siteId explicitly, otherwise derive from section id
    const c = content as CheckoutContent & { siteId?: string }
    return c.siteId || config.id.split('_')[0] || ''
  }, [content, config.id])

  // Create checkout session for Stripe
  const initStripeCheckout = useCallback(async () => {
    if (clientSecret || loading || items.length === 0) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/ecommerce/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId,
          items,
          email,
          shippingAddress,
          paymentMethod: 'stripe',
        }),
      })
      const data = await res.json() as CheckoutResult & { error?: string }
      if (!res.ok) throw new Error(data.error || 'Erreur checkout')
      setCheckoutResult(data)
      if (data.clientSecret) setClientSecret(data.clientSecret)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }, [clientSecret, loading, items, siteId, email, shippingAddress])

  // Auto-init Stripe checkout when selecting stripe payment
  useEffect(() => {
    if (paymentMethod === 'stripe' && !clientSecret && items.length > 0 && email && shippingAddress.line1) {
      initStripeCheckout()
    }
  }, [paymentMethod, clientSecret, items.length, email, shippingAddress.line1, initStripeCheckout])

  const handlePaymentSuccess = useCallback((orderId: string, orderNumber: string) => {
    const num = orderNumber || checkoutResult?.orderNumber || ''
    setSuccess({ orderId, orderNumber: num })
    clearCart()
    if (content.successRedirectUrl) {
      setTimeout(() => { window.location.href = content.successRedirectUrl! }, 2000)
    }
  }, [clearCart, content.successRedirectUrl, checkoutResult])

  const handlePaymentError = useCallback((message: string) => {
    setError(message)
  }, [])

  // Success state
  if (success) {
    return (
      <div className="text-center py-8 space-y-3">
        <div className={cn('w-12 h-12 rounded-full mx-auto flex items-center justify-center', u.btn)}>
          <Check className="w-6 h-6" />
        </div>
        <h3 className={cn('text-lg font-semibold', u.text)}>Paiement confirme !</h3>
        <p className={u.muted}>
          Commande {success.orderNumber ? `#${success.orderNumber}` : ''} enregistree.
        </p>
        {content.successRedirectUrl && (
          <p className={cn('text-xs', u.muted)}>Redirection en cours...</p>
        )}
      </div>
    )
  }

  const hasStripe = content.paymentProviders.includes('stripe')
  const hasPaypal = content.paymentProviders.includes('paypal')
  const showTabs = hasStripe && hasPaypal

  return (
    <div className="space-y-4">
      <h3 className={cn('text-lg font-semibold mb-3', u.text)}>Paiement</h3>

      {/* Payment method tabs */}
      {showTabs && (
        <div className={cn('flex rounded-lg border overflow-hidden', u.border)}>
          {hasStripe && (
            <button
              onClick={() => setPaymentMethod('stripe')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors',
                paymentMethod === 'stripe' ? u.btn : cn(u.card, u.muted),
              )}
            >
              <CreditCard className="w-4 h-4" />
              Carte bancaire
            </button>
          )}
          {hasPaypal && (
            <button
              onClick={() => setPaymentMethod('paypal')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors',
                paymentMethod === 'paypal' ? u.btn : cn(u.card, u.muted),
              )}
            >
              <Wallet className="w-4 h-4" />
              PayPal
            </button>
          )}
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Stripe Elements */}
      {paymentMethod === 'stripe' && hasStripe && (
        <div className={cn('p-4 rounded-xl border', u.card, u.border)}>
          {!content.stripePublishableKey ? (
            <p className={cn('text-sm', u.muted)}>Cle Stripe non configuree.</p>
          ) : !clientSecret ? (
            <div className="flex items-center justify-center gap-2 py-4">
              <Loader2 className={cn('w-5 h-5 animate-spin', u.accent)} />
              <span className={cn('text-sm', u.muted)}>Initialisation du paiement...</span>
            </div>
          ) : stripePromise ? (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
              <StripePaymentForm
                u={u}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                loading={loading}
                setLoading={setLoading}
              />
            </Elements>
          ) : null}
        </div>
      )}

      {/* PayPal Buttons */}
      {paymentMethod === 'paypal' && hasPaypal && (
        <div className={cn('p-4 rounded-xl border', u.card, u.border)}>
          {!content.paypalClientId ? (
            <p className={cn('text-sm', u.muted)}>Client ID PayPal non configure.</p>
          ) : items.length === 0 ? (
            <p className={cn('text-sm', u.muted)}>Le panier est vide.</p>
          ) : (
            <PayPalScriptProvider options={{ clientId: content.paypalClientId, currency: 'EUR' }}>
              <PayPalButtons
                style={{ layout: 'vertical', shape: 'rect', label: 'pay' }}
                disabled={loading}
                createOrder={async () => {
                  setLoading(true)
                  setError(null)
                  try {
                    const res = await fetch('/api/ecommerce/checkout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        siteId,
                        items,
                        email,
                        shippingAddress,
                        paymentMethod: 'paypal',
                      }),
                    })
                    const data = await res.json() as CheckoutResult & { error?: string }
                    if (!res.ok) throw new Error(data.error || 'Erreur checkout')
                    setCheckoutResult(data)
                    if (!data.paypalOrderId) throw new Error('PayPal Order ID manquant')
                    return data.paypalOrderId
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Erreur PayPal')
                    throw err
                  } finally {
                    setLoading(false)
                  }
                }}
                onApprove={async (data) => {
                  setLoading(true)
                  setError(null)
                  try {
                    // The PayPal webhook will handle the order status update on the server side.
                    // On the client, we just acknowledge the approval.
                    handlePaymentSuccess(
                      checkoutResult?.orderId || data.orderID,
                      checkoutResult?.orderNumber || '',
                    )
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Erreur confirmation PayPal')
                  } finally {
                    setLoading(false)
                  }
                }}
                onError={(err) => {
                  setError(typeof err === 'string' ? err : 'Erreur PayPal. Veuillez reessayer.')
                  setLoading(false)
                }}
                onCancel={() => {
                  setError(null)
                  setLoading(false)
                }}
              />
            </PayPalScriptProvider>
          )}
        </div>
      )}

      {content.termsUrl && (
        <p className={cn('text-xs', u.muted)}>
          En passant commande, vous acceptez nos <a href={content.termsUrl} className={u.accent}>conditions generales</a>.
        </p>
      )}
    </div>
  )
}

// ─── Editor placeholder payment form (unchanged from original) ───

function EditorPaymentForm({ content, u }: { content: CheckoutContent; u: typeof UNIVERSES[string] }) {
  return (
    <div className="space-y-4">
      <h3 className={cn('text-lg font-semibold mb-3', u.text)}>Paiement</h3>
      <div className="space-y-3">
        {content.paymentProviders.includes('stripe') && (
          <div className={cn('p-4 rounded-xl border', u.card, u.border)}>
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className={cn('w-5 h-5', u.accent)} />
              <span className={cn('text-sm font-medium', u.text)}>Carte bancaire</span>
            </div>
            <div className={cn('h-10 rounded-lg border flex items-center px-3', u.border)}>
              <span className={cn('text-xs', u.muted)}>Stripe Elements s&apos;affichera ici</span>
            </div>
          </div>
        )}
        {content.paymentProviders.includes('paypal') && (
          <div className={cn('p-4 rounded-xl border', u.card, u.border)}>
            <div className="flex items-center gap-3 mb-3">
              <Wallet className={cn('w-5 h-5', u.accent)} />
              <span className={cn('text-sm font-medium', u.text)}>PayPal</span>
            </div>
            <div className={cn('h-10 rounded-lg border flex items-center px-3', u.border)}>
              <span className={cn('text-xs', u.muted)}>Boutons PayPal s&apos;afficheront ici</span>
            </div>
          </div>
        )}
      </div>
      {content.termsUrl && (
        <p className={cn('text-xs', u.muted)}>
          En passant commande, vous acceptez nos <a href={content.termsUrl} className={u.accent}>conditions generales</a>.
        </p>
      )}
    </div>
  )
}

// ─── Main CheckoutSection ───

export function CheckoutSection({ config, isEditing }: Props) {
  const content = config.content as CheckoutContent
  const variant = config.variant || 'startup-steps'
  const [universe, layout] = variant.split('-') as [string, string]
  const u = UNIVERSES[universe] || UNIVERSES.startup
  const [currentStep, setCurrentStep] = useState(0)

  // Form state for live checkout
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('FR')

  const shippingAddress: AddressData = useMemo(() => ({
    firstName,
    lastName,
    line1: address,
    line2: addressLine2 || undefined,
    city,
    postalCode,
    country,
  }), [firstName, lastName, address, addressLine2, city, postalCode, country])

  // Cart data for live order summary
  const { items: cartItems, subtotal } = useCart()

  const inputClass = cn('w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors', u.input)

  const stepIndicator = layout === 'steps' && (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((step, i) => {
        const Icon = step.icon
        const isActive = i === currentStep
        const isDone = i < currentStep
        return (
          <div key={step.id} className="flex items-center gap-2">
            {i > 0 && <div className={cn('w-8 h-px', isDone ? u.accent.replace('text-', 'bg-') : u.border.replace('border-', 'bg-'))} />}
            <button
              onClick={() => !isEditing && setCurrentStep(i)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                isActive ? u.btn : isDone ? cn(u.accent, 'opacity-80') : u.muted,
              )}
            >
              {isDone ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
              {step.label}
            </button>
          </div>
        )
      })}
    </div>
  )

  // In editor mode, use disabled static inputs
  // In live mode, use controlled inputs
  const infoForm = isEditing ? (
    <div className="space-y-4">
      <h3 className={cn('text-lg font-semibold mb-3', u.text)}>Informations</h3>
      <input type="email" placeholder="Email" disabled className={inputClass} />
      <div className="grid grid-cols-2 gap-3">
        <input type="text" placeholder="Prenom" disabled className={inputClass} />
        <input type="text" placeholder="Nom" disabled className={inputClass} />
      </div>
    </div>
  ) : (
    <div className="space-y-4">
      <h3 className={cn('text-lg font-semibold mb-3', u.text)}>Informations</h3>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
      <div className="grid grid-cols-2 gap-3">
        <input type="text" placeholder="Prenom" value={firstName} onChange={e => setFirstName(e.target.value)} className={inputClass} />
        <input type="text" placeholder="Nom" value={lastName} onChange={e => setLastName(e.target.value)} className={inputClass} />
      </div>
    </div>
  )

  const shippingForm = isEditing ? (
    <div className="space-y-4">
      <h3 className={cn('text-lg font-semibold mb-3', u.text)}>Adresse de livraison</h3>
      <input type="text" placeholder="Adresse" disabled className={inputClass} />
      <input type="text" placeholder="Complement" disabled className={inputClass} />
      <div className="grid grid-cols-3 gap-3">
        <input type="text" placeholder="Code postal" disabled className={inputClass} />
        <input type="text" placeholder="Ville" disabled className={cn(inputClass, 'col-span-2')} />
      </div>
      <input type="text" placeholder="Pays" disabled className={inputClass} />
    </div>
  ) : (
    <div className="space-y-4">
      <h3 className={cn('text-lg font-semibold mb-3', u.text)}>Adresse de livraison</h3>
      <input type="text" placeholder="Adresse" value={address} onChange={e => setAddress(e.target.value)} className={inputClass} />
      <input type="text" placeholder="Complement" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} className={inputClass} />
      <div className="grid grid-cols-3 gap-3">
        <input type="text" placeholder="Code postal" value={postalCode} onChange={e => setPostalCode(e.target.value)} className={inputClass} />
        <input type="text" placeholder="Ville" value={city} onChange={e => setCity(e.target.value)} className={cn(inputClass, 'col-span-2')} />
      </div>
      <input type="text" placeholder="Pays" value={country} onChange={e => setCountry(e.target.value)} className={inputClass} />
    </div>
  )

  const paymentForm = isEditing ? (
    <EditorPaymentForm content={content} u={u} />
  ) : (
    <LivePaymentForm
      content={content}
      config={config}
      u={u}
      email={email}
      shippingAddress={shippingAddress}
    />
  )

  // Order summary: in editor mode use fake data, in live mode use real cart
  const orderSummary = content.showOrderSummary && (
    <div className={cn('p-6 rounded-xl border h-fit', u.card, u.border)}>
      <h3 className={cn('text-lg font-semibold mb-4', u.text)}>Recapitulatif</h3>
      <div className="space-y-3">
        {isEditing ? (
          // Editor: static demo items
          <>
            {[
              { name: 'T-Shirt Premium', qty: 2, price: 5980 },
              { name: 'Casquette Logo', qty: 1, price: 1990 },
            ].map((item, i) => (
              <div key={i} className={cn('flex justify-between text-sm', u.muted)}>
                <span>{item.name} x{item.qty}</span>
                <span className={u.text}>{(item.price / 100).toFixed(2)}&euro;</span>
              </div>
            ))}
          </>
        ) : (
          // Live: real cart items
          <>
            {cartItems.length === 0 ? (
              <p className={cn('text-sm', u.muted)}>Panier vide</p>
            ) : (
              cartItems.map((item, i) => (
                <div key={i} className={cn('flex justify-between text-sm', u.muted)}>
                  <span>{item.name} x{item.quantity}</span>
                  <span className={u.text}>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))
            )}
          </>
        )}
      </div>
      <div className={cn('flex justify-between py-3 mt-4 border-t font-semibold', u.border, u.text)}>
        <span>Total</span>
        <span>{isEditing ? '79,70\u20AC' : formatPrice(subtotal)}</span>
      </div>
    </div>
  )

  if (layout === 'single') {
    return (
      <section className={cn('py-12 px-4', u.bg)}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className={cn('lg:col-span-3 p-6 rounded-xl border space-y-6', u.card, u.border)}>
            <div className="flex items-center gap-2 mb-2">
              <Lock className={cn('w-4 h-4', u.accent)} />
              <span className={cn('text-sm font-medium', u.text)}>Paiement securise</span>
            </div>
            {infoForm}
            <div className={cn('h-px', u.border.replace('border-', 'bg-'))} />
            {shippingForm}
            <div className={cn('h-px', u.border.replace('border-', 'bg-'))} />
            {paymentForm}
            {isEditing && (
              <button className={cn('w-full py-3 rounded-xl font-semibold mt-4 transition-colors', u.btn)}>
                Payer
              </button>
            )}
          </div>
          <div className="lg:col-span-2">
            {orderSummary}
          </div>
        </div>
      </section>
    )
  }

  // steps (default)
  return (
    <section className={cn('py-12 px-4', u.bg)}>
      <div className="max-w-4xl mx-auto">
        {stepIndicator}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className={cn('lg:col-span-3 p-6 rounded-xl border', u.card, u.border)}>
            {currentStep === 0 && infoForm}
            {currentStep === 1 && shippingForm}
            {currentStep === 2 && paymentForm}
            <div className="flex justify-between mt-6">
              {currentStep > 0 && (
                <button onClick={() => !isEditing && setCurrentStep(s => s - 1)} className={cn('px-4 py-2 rounded-lg text-sm', u.muted)}>
                  Retour
                </button>
              )}
              <div className="ml-auto">
                {currentStep < 2 ? (
                  <button onClick={() => !isEditing && setCurrentStep(s => s + 1)} className={cn('px-6 py-2.5 rounded-lg font-medium transition-colors', u.btn)}>
                    Continuer
                  </button>
                ) : isEditing ? (
                  <button className={cn('px-6 py-2.5 rounded-lg font-medium transition-colors', u.btn)}>
                    Payer
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            {orderSummary}
          </div>
        </div>
      </div>
    </section>
  )
}

export const checkoutMeta = {
  type: 'checkout',
  label: 'Checkout',
  icon: '\uD83D\uDCB3',
  variants: [
    'startup-steps', 'startup-single',
    'corporate-steps', 'corporate-single',
    'luxe-steps', 'luxe-single',
    'creative-steps', 'creative-single',
    'ecommerce-steps', 'ecommerce-single',
    'glass-steps', 'glass-single',
  ],
  defaultVariant: 'startup-steps',
  defaultContent: {},
}
