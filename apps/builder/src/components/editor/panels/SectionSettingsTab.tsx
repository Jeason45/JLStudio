'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { HeroPanel } from './HeroPanel'
import { FeaturesPanel } from './FeaturesPanel'
import { CTAPanel } from './CTAPanel'
import { StatsPanel } from './StatsPanel'
import { TestimonialsPanel } from './TestimonialsPanel'
import { FAQPanel } from './FAQPanel'
import { ContactPanel } from './ContactPanel'
import { PricingPanel } from './PricingPanel'
import { LogosPanel } from './LogosPanel'
import { TeamPanel } from './TeamPanel'
import { BlogGridPanel } from './BlogGridPanel'
import { TimelinePanel } from './TimelinePanel'
import { StepsPanel } from './StepsPanel'
import { ImageTextPanel } from './ImageTextPanel'
import { GalleryPanel } from './GalleryPanel'
import { ProductGridPanel } from './ProductGridPanel'
import { NewsletterPanel } from './NewsletterPanel'
import { ComparisonPanel } from './ComparisonPanel'
import { SiteHeaderPanel } from './SiteHeaderPanel'
import { SiteFooterPanel } from './SiteFooterPanel'
import { TabsPanel } from './TabsPanel'
import { AccordionPanel } from './AccordionPanel'
import { SliderPanel } from './SliderPanel'
import { LightboxPanel } from './LightboxPanel'
import { VideoPanel } from './VideoPanel'
import { DropdownPanel } from './DropdownPanel'
import { NavbarAdvancedPanel } from './NavbarAdvancedPanel'
import { QuickStackPanel } from './QuickStackPanel'
import { MapPanel } from './MapPanel'
import { SearchPanel } from './SearchPanel'
import { FormPanel } from './FormPanel'
import { CollectionListPanel } from './CollectionListPanel'
import { ProductDetailPanel } from './ProductDetailPanel'
import { CartPanel } from './CartPanel'
import { CheckoutPanel } from './CheckoutPanel'
import { InstancePropsPanel } from './InstancePropsPanel'

const PANEL_MAP: Record<string, React.ComponentType<{ sectionId: string }>> = {
  hero: HeroPanel,
  features: FeaturesPanel,
  cta: CTAPanel,
  stats: StatsPanel,
  testimonials: TestimonialsPanel,
  pricing: PricingPanel,
  faq: FAQPanel,
  contact: ContactPanel,
  logos: LogosPanel,
  team: TeamPanel,
  'blog-grid': BlogGridPanel,
  timeline: TimelinePanel,
  steps: StepsPanel,
  'image-text': ImageTextPanel,
  'gallery-grid': GalleryPanel,
  'product-grid': ProductGridPanel,
  newsletter: NewsletterPanel,
  'comparison-table': ComparisonPanel,
  'site-header': SiteHeaderPanel,
  'site-footer': SiteFooterPanel,
  tabs: TabsPanel,
  accordion: AccordionPanel,
  slider: SliderPanel,
  lightbox: LightboxPanel,
  video: VideoPanel,
  dropdown: DropdownPanel,
  'navbar-advanced': NavbarAdvancedPanel,
  'quick-stack': QuickStackPanel,
  map: MapPanel,
  search: SearchPanel,
  form: FormPanel,
  'collection-list': CollectionListPanel,
  'product-detail': ProductDetailPanel,
  cart: CartPanel,
  checkout: CheckoutPanel,
}

export function SectionSettingsTab({ sectionId }: { sectionId: string }) {
  const { siteConfig } = useEditorStore()

  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  if (!section) return null

  // Show instance props panel for component instances
  const isInstance = section.__componentInstance && !section.__componentInstance.isUnlinked

  const PanelComponent = PANEL_MAP[section.type]

  return (
    <>
      {isInstance && <InstancePropsPanel sectionId={sectionId} />}
      {PanelComponent ? (
        <PanelComponent sectionId={sectionId} />
      ) : (
        <PanelSection title="Contenu">
          <p className="text-xs text-zinc-600">
            Panneau de configuration a venir pour le type &quot;{section.type}&quot;.
          </p>
        </PanelSection>
      )}
    </>
  )
}
