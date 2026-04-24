import type { SectionConfig } from '@/types/site'
import type { ComponentType } from 'react'

export interface SectionComponentProps {
  config: SectionConfig
  isEditing?: boolean
}

export interface SectionMeta {
  type: string
  label: string
  icon: string
  variants: string[]
  defaultVariant: string
  defaultContent: Record<string, unknown>
}

// ─────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────

import { HeroSection, heroMeta } from './hero/HeroSection'
import { FeaturesSection, featuresMeta } from './features/FeaturesSection'
import { CTASection, ctaMeta } from './cta/CTASection'
import { StatsSection, statsMeta } from './stats/StatsSection'
import { TestimonialsSection, testimonialsMeta } from './testimonials/TestimonialsSection'
import { PricingSection, pricingMeta } from './pricing/PricingSection'
import { FAQSection, faqMeta } from './faq/FAQSection'
import { ContactSection, contactMeta } from './contact/ContactSection'
import { LogosSection, logosMeta } from './logos/LogosSection'
import { TeamSection, teamMeta } from './team/TeamSection'
import { BlogGridSection, blogGridMeta } from './blog/BlogGridSection'
import { TimelineSection, timelineMeta } from './timeline/TimelineSection'
import { StepsSection, stepsMeta } from './steps/StepsSection'
import { GallerySection, galleryMeta } from './gallery/GallerySection'
import { ImageTextSection, imageTextMeta } from './image-text/ImageTextSection'
import { ProductGridSection, productGridMeta } from './product/ProductGridSection'
import { NewsletterSection, newsletterMeta } from './newsletter/NewsletterSection'
import { SiteHeaderSection, siteHeaderMeta } from './header/SiteHeaderSection'
import { SiteFooterSection, siteFooterMeta } from './footer/SiteFooterSection'
import { ComparisonSection, comparisonMeta } from './comparison/ComparisonSection'
import { CustomSection, customMeta } from './custom/CustomSection'
import { TabsSection, tabsMeta } from './tabs/TabsSection'
import { AccordionSection, accordionMeta } from './accordion/AccordionSection'
import { SliderSection, sliderMeta } from './slider/SliderSection'
import { LightboxSection, lightboxMeta } from './lightbox/LightboxSection'
import { VideoSection, videoMeta } from './video/VideoSection'
import { DropdownSection, dropdownMeta } from './dropdown/DropdownSection'
import { NavbarAdvancedSection, navbarAdvancedMeta } from './navbar/NavbarAdvancedSection'
import { QuickStackSection, quickStackMeta } from './quick-stack/QuickStackSection'
import { MapSection, mapMeta } from './map/MapSection'
import { SearchSection, searchMeta } from './search/SearchSection'
import { FormSection, formMeta } from './form/FormSection'
import { CollectionListSection, collectionListMeta } from './collection-list/CollectionListSection'
import { ProductDetailSection, productDetailMeta } from './product-detail/ProductDetailSection'
import { CartSection, cartMeta } from './cart/CartSection'
import { CheckoutSection, checkoutMeta } from './checkout/CheckoutSection'
import { EmbedSection, embedMeta } from './embed/EmbedSection'

// ─────────────────────────────────────────────
// REGISTRY
// ─────────────────────────────────────────────

const componentRegistry: Record<string, ComponentType<SectionComponentProps>> = {
  hero: HeroSection,
  features: FeaturesSection,
  cta: CTASection,
  stats: StatsSection,
  testimonials: TestimonialsSection,
  pricing: PricingSection,
  faq: FAQSection,
  contact: ContactSection,
  logos: LogosSection,
  team: TeamSection,
  'blog-grid': BlogGridSection,
  timeline: TimelineSection,
  steps: StepsSection,
  'gallery-grid': GallerySection,
  'image-text': ImageTextSection,
  'product-grid': ProductGridSection,
  newsletter: NewsletterSection,
  'site-header': SiteHeaderSection,
  'site-footer': SiteFooterSection,
  'comparison-table': ComparisonSection,
  custom: CustomSection,
  tabs: TabsSection,
  accordion: AccordionSection,
  slider: SliderSection,
  lightbox: LightboxSection,
  video: VideoSection,
  dropdown: DropdownSection,
  'navbar-advanced': NavbarAdvancedSection,
  'quick-stack': QuickStackSection,
  map: MapSection,
  search: SearchSection,
  form: FormSection,
  'collection-list': CollectionListSection,
  'product-detail': ProductDetailSection,
  cart: CartSection,
  checkout: CheckoutSection,
  embed: EmbedSection,
}

const metaRegistry: Record<string, SectionMeta> = {
  hero: heroMeta,
  features: featuresMeta,
  cta: ctaMeta,
  stats: statsMeta,
  testimonials: testimonialsMeta,
  pricing: pricingMeta,
  faq: faqMeta,
  contact: contactMeta,
  logos: logosMeta,
  team: teamMeta,
  'blog-grid': blogGridMeta,
  timeline: timelineMeta,
  steps: stepsMeta,
  'gallery-grid': galleryMeta,
  'image-text': imageTextMeta,
  'product-grid': productGridMeta,
  newsletter: newsletterMeta,
  'site-header': siteHeaderMeta,
  'site-footer': siteFooterMeta,
  'comparison-table': comparisonMeta,
  custom: customMeta,
  tabs: tabsMeta,
  accordion: accordionMeta,
  slider: sliderMeta,
  lightbox: lightboxMeta,
  video: videoMeta,
  dropdown: dropdownMeta,
  'navbar-advanced': navbarAdvancedMeta,
  'quick-stack': quickStackMeta,
  map: mapMeta,
  search: searchMeta,
  form: formMeta,
  'collection-list': collectionListMeta,
  'product-detail': productDetailMeta,
  cart: cartMeta,
  checkout: checkoutMeta,
  embed: embedMeta,
}

export function getSectionComponent(type: string): ComponentType<SectionComponentProps> | null {
  return componentRegistry[type] ?? null
}

export function getSectionMeta(type: string): SectionMeta | null {
  return metaRegistry[type] ?? null
}

export function getAllSectionMetas(): SectionMeta[] {
  return Object.values(metaRegistry)
}

export function registerSection(
  type: string,
  component: ComponentType<SectionComponentProps>,
  meta: SectionMeta
) {
  componentRegistry[type] = component
  metaRegistry[type] = meta
}
