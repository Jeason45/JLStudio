'use client'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldToggle } from '../fields'

export function CartPanel({ sectionId }: { sectionId: string }) {
  return (
    <PanelSection title="Panier">
      <FieldText sectionId={sectionId} label="Message panier vide" contentPath="emptyMessage" />
      <FieldText sectionId={sectionId} label="Bouton continuer" contentPath="continueShoppingLabel" />
      <FieldText sectionId={sectionId} label="Bouton checkout" contentPath="checkoutLabel" />
      <FieldToggle sectionId={sectionId} label="Champ coupon" contentPath="showCouponField" />
      <FieldToggle sectionId={sectionId} label="Images produits" contentPath="showProductImages" />
    </PanelSection>
  )
}
