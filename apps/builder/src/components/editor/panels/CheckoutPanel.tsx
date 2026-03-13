'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldToggle } from '../fields'

export function CheckoutPanel({ sectionId }: { sectionId: string }) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  if (!section) return null

  const c = section.content || {}
  const providers: string[] = c.paymentProviders || ['stripe']

  const toggleProvider = (provider: string) => {
    const next = providers.includes(provider)
      ? providers.filter((p: string) => p !== provider)
      : [...providers, provider]
    if (next.length === 0) return
    updateSection(sectionId, { content: { ...c, paymentProviders: next } })
  }

  return (
    <>
      <PanelSection title="Fournisseurs de paiement">
        <label className="flex items-center gap-2 text-xs text-zinc-300 mb-1.5">
          <input type="checkbox" checked={providers.includes('stripe')} onChange={() => toggleProvider('stripe')} className="rounded" />
          Stripe
        </label>
        <label className="flex items-center gap-2 text-xs text-zinc-300 mb-1.5">
          <input type="checkbox" checked={providers.includes('paypal')} onChange={() => toggleProvider('paypal')} className="rounded" />
          PayPal
        </label>
      </PanelSection>

      <PanelSection title="Configuration">
        {providers.includes('stripe') && (
          <FieldText sectionId={sectionId} label="Cle publique Stripe" contentPath="stripePublishableKey" />
        )}
        {providers.includes('paypal') && (
          <FieldText sectionId={sectionId} label="Client ID PayPal" contentPath="paypalClientId" />
        )}
      </PanelSection>

      <PanelSection title="Options">
        <FieldToggle sectionId={sectionId} label="Resume de commande" contentPath="showOrderSummary" />
        <FieldToggle sectionId={sectionId} label="Champ coupon" contentPath="showCouponField" />
        <FieldText sectionId={sectionId} label="URL apres paiement" contentPath="successRedirectUrl" />
        <FieldText sectionId={sectionId} label="URL CGV" contentPath="termsUrl" />
      </PanelSection>
    </>
  )
}
