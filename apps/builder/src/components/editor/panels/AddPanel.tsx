'use client'
import { useState, useMemo } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { useDraggable } from '@dnd-kit/core'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Search, X, Plus, GripVertical, ChevronDown, Library,
  Boxes, Type, Heading, Image, MousePointer, MinusSquare, ArrowUpDown, Code2,
  LayoutGrid, Columns, Rows, SquareDashed, Link, List, AlignLeft,
  Quote, FileText, Video, FormInput, TextCursorInput, CheckSquare,
  Circle, Upload, Lightbulb, ChevronDownSquare, SlidersHorizontal, Map,
  ListOrdered, Youtube, Box, Clapperboard, Tag, ChevronDown as SelectIcon,
  ShieldCheck, Navigation, ImagePlay, Globe, Hash, Twitter, Facebook, PanelLeft,
  Database, ListTree, Puzzle,
  PanelTop, PanelBottom, LayoutTemplate, Sparkles, Star, ImageIcon,
  Footprints, BarChart3, Building2, Users, Target, CreditCard, Mail,
  GitCompare, ShoppingBag, Phone, HelpCircle, Layers, GalleryHorizontalEnd,
  Play, ChevronDownCircle, Menu, LayoutDashboard, MapPin, SearchIcon,
  MessageSquareQuote, Clock, ListChecks,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getSectionMeta } from '@/components/sections'
import { MiniSectionPreview } from '../MiniSectionPreview'
import { VariantPickerModal } from '../VariantPickerModal'
import { SECTION_VARIANTS } from '@/components/sections/_variants'
import type { CustomElementType } from '@/types/elements'

import {
  DEFAULT_HERO_CONTENT, DEFAULT_FEATURES_CONTENT, DEFAULT_CTA_CONTENT,
  DEFAULT_STATS_CONTENT, DEFAULT_TESTIMONIALS_CONTENT, DEFAULT_PRICING_CONTENT,
  DEFAULT_FAQ_CONTENT, DEFAULT_CONTACT_CONTENT, DEFAULT_LOGOS_CONTENT,
  DEFAULT_TEAM_CONTENT, DEFAULT_BLOG_GRID_CONTENT, DEFAULT_TIMELINE_CONTENT,
  DEFAULT_STEPS_CONTENT, DEFAULT_IMAGE_TEXT_CONTENT,
  DEFAULT_GALLERY_CONTENT, DEFAULT_PRODUCT_GRID_CONTENT, DEFAULT_NEWSLETTER_CONTENT,
  DEFAULT_SITE_HEADER_CONTENT, DEFAULT_SITE_FOOTER_CONTENT,
  DEFAULT_COMPARISON_CONTENT,
  DEFAULT_TABS_CONTENT, DEFAULT_ACCORDION_CONTENT, DEFAULT_SLIDER_CONTENT,
  DEFAULT_LIGHTBOX_CONTENT, DEFAULT_VIDEO_CONTENT,
  DEFAULT_DROPDOWN_CONTENT, DEFAULT_NAVBAR_ADVANCED_CONTENT, DEFAULT_QUICK_STACK_CONTENT,
  DEFAULT_MAP_CONTENT, DEFAULT_SEARCH_CONTENT,
  DEFAULT_FORM_CONTENT,
  DEFAULT_PRODUCT_DETAIL_CONTENT,
  DEFAULT_CART_CONTENT,
  DEFAULT_CHECKOUT_CONTENT,
} from '@/types/sections'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEFAULT_CONTENTS: Record<string, any> = {
  hero: DEFAULT_HERO_CONTENT, features: DEFAULT_FEATURES_CONTENT, cta: DEFAULT_CTA_CONTENT,
  stats: DEFAULT_STATS_CONTENT, testimonials: DEFAULT_TESTIMONIALS_CONTENT,
  pricing: DEFAULT_PRICING_CONTENT, faq: DEFAULT_FAQ_CONTENT, contact: DEFAULT_CONTACT_CONTENT,
  logos: DEFAULT_LOGOS_CONTENT, team: DEFAULT_TEAM_CONTENT, 'blog-grid': DEFAULT_BLOG_GRID_CONTENT,
  timeline: DEFAULT_TIMELINE_CONTENT, steps: DEFAULT_STEPS_CONTENT,
  'image-text': DEFAULT_IMAGE_TEXT_CONTENT, 'gallery-grid': DEFAULT_GALLERY_CONTENT,
  'product-grid': DEFAULT_PRODUCT_GRID_CONTENT, newsletter: DEFAULT_NEWSLETTER_CONTENT,
  'site-header': DEFAULT_SITE_HEADER_CONTENT, 'site-footer': DEFAULT_SITE_FOOTER_CONTENT,
  'comparison-table': DEFAULT_COMPARISON_CONTENT, custom: {},
  tabs: DEFAULT_TABS_CONTENT, accordion: DEFAULT_ACCORDION_CONTENT, slider: DEFAULT_SLIDER_CONTENT,
  lightbox: DEFAULT_LIGHTBOX_CONTENT, video: DEFAULT_VIDEO_CONTENT,
  dropdown: DEFAULT_DROPDOWN_CONTENT, 'navbar-advanced': DEFAULT_NAVBAR_ADVANCED_CONTENT, 'quick-stack': DEFAULT_QUICK_STACK_CONTENT,
  map: DEFAULT_MAP_CONTENT, search: DEFAULT_SEARCH_CONTENT,
  form: DEFAULT_FORM_CONTENT,
  'product-detail': DEFAULT_PRODUCT_DETAIL_CONTENT,
  cart: DEFAULT_CART_CONTENT,
  checkout: DEFAULT_CHECKOUT_CONTENT,
}

// ─── Element definitions (Webflow-style categories) ───

interface ElementDef {
  type: CustomElementType
  label: string
  icon: React.ReactNode
  defaultStyle: Record<string, unknown>
  defaultContent: Record<string, unknown>
}

const ELEMENT_CATEGORIES: { id: string; label: string; elements: ElementDef[] }[] = [
  {
    id: 'structure',
    label: 'Structure',
    elements: [
      { type: 'custom-container', label: 'Section', icon: <SquareDashed className="w-6 h-6" />, defaultStyle: { display: 'block', padding: '3rem 1rem', minHeight: '4rem', width: '100%' }, defaultContent: {} },
      { type: 'custom-container', label: 'Container', icon: <Boxes className="w-6 h-6" />, defaultStyle: { display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', minHeight: '4rem', maxWidth: '1200px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }, defaultContent: {} },
      { type: 'custom-container', label: 'V Flex', icon: <Rows className="w-6 h-6" />, defaultStyle: { display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', minHeight: '4rem' }, defaultContent: {} },
      { type: 'custom-container', label: 'H Flex', icon: <Columns className="w-6 h-6" />, defaultStyle: { display: 'flex', flexDirection: 'row', gap: '1rem', padding: '1rem', minHeight: '4rem' }, defaultContent: {} },
      { type: 'custom-container', label: 'Quick Stack', icon: <LayoutGrid className="w-6 h-6" />, defaultStyle: { display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '1rem', minHeight: '4rem' }, defaultContent: {} },
      { type: 'custom-container', label: 'Page Slot', icon: <PanelLeft className="w-6 h-6" />, defaultStyle: { display: 'block', minHeight: '4rem', width: '100%', flex: '1' }, defaultContent: {} },
    ],
  },
  {
    id: 'basic',
    label: 'Basic',
    elements: [
      { type: 'custom-container', label: 'Div Block', icon: <SquareDashed className="w-6 h-6" />, defaultStyle: { display: 'block', minHeight: '2rem' }, defaultContent: {} },
      { type: 'custom-container', label: 'List', icon: <List className="w-6 h-6" />, defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.5rem' }, defaultContent: {} },
      { type: 'custom-container', label: 'List Item', icon: <ListOrdered className="w-6 h-6" />, defaultStyle: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0' }, defaultContent: {} },
      { type: 'custom-container', label: 'Link Block', icon: <Link className="w-6 h-6" />, defaultStyle: { display: 'block', cursor: 'pointer' }, defaultContent: { href: '#' } },
      { type: 'custom-button', label: 'Button', icon: <MousePointer className="w-6 h-6" />, defaultStyle: { display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: '#6366f1', color: '#fff', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }, defaultContent: { label: 'Button', href: '#' } },
    ],
  },
  {
    id: 'typography',
    label: 'Typography',
    elements: [
      { type: 'custom-heading', label: 'Heading', icon: <Heading className="w-6 h-6" />, defaultStyle: { fontSize: '2rem', fontWeight: 700 }, defaultContent: { text: 'Heading', tag: 'h2' } },
      { type: 'custom-text', label: 'Paragraph', icon: <AlignLeft className="w-6 h-6" />, defaultStyle: { fontSize: '1rem', lineHeight: '1.6' }, defaultContent: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' } },
      { type: 'custom-text', label: 'Text Link', icon: <Link className="w-6 h-6" />, defaultStyle: { fontSize: '1rem', color: '#6366f1', cursor: 'pointer' }, defaultContent: { text: 'Text Link', href: '#' } },
      { type: 'custom-text', label: 'Text Block', icon: <Type className="w-6 h-6" />, defaultStyle: { fontSize: '1rem' }, defaultContent: { text: 'Text block' } },
      { type: 'custom-text', label: 'Block Quote', icon: <Quote className="w-6 h-6" />, defaultStyle: { fontSize: '1.125rem', fontStyle: 'italic', borderLeft: '3px solid #6366f1', paddingLeft: '1rem' } as Record<string, unknown>, defaultContent: { text: 'Block quote text here...' } },
      { type: 'custom-text', label: 'Rich Text', icon: <FileText className="w-6 h-6" />, defaultStyle: { fontSize: '1rem', lineHeight: '1.7' }, defaultContent: { text: 'Rich text content...' } },
    ],
  },
  {
    id: 'cms',
    label: 'CMS',
    elements: [
      { type: 'custom-container', label: 'Collection List', icon: <Database className="w-6 h-6" />, defaultStyle: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '1.5rem', padding: '1rem' }, defaultContent: { collectionId: '', template: 'card' } },
      { type: 'custom-container', label: 'Collection Item', icon: <ListTree className="w-6 h-6" />, defaultStyle: { display: 'flex', flexDirection: 'column', gap: '0.5rem' }, defaultContent: {} },
    ],
  },
  {
    id: 'media',
    label: 'Media',
    elements: [
      { type: 'custom-image', label: 'Image', icon: <Image className="w-6 h-6" />, defaultStyle: { width: '100%', maxWidth: '400px' }, defaultContent: { src: '', alt: '' } },
      { type: 'custom-embed', label: 'Video', icon: <Video className="w-6 h-6" />, defaultStyle: { width: '100%', aspectRatio: '16/9' } as Record<string, unknown>, defaultContent: { html: '<video controls style="width:100%"></video>' } },
      { type: 'custom-embed', label: 'YouTube', icon: <Youtube className="w-6 h-6" />, defaultStyle: { width: '100%', aspectRatio: '16/9' } as Record<string, unknown>, defaultContent: { html: '<iframe src="https://www.youtube.com/embed/" style="width:100%;height:100%;border:none" allowfullscreen></iframe>' } },
      { type: 'custom-lottie', label: 'Lottie Animation', icon: <Clapperboard className="w-6 h-6" />, defaultStyle: { width: '100%', maxWidth: '400px' }, defaultContent: { src: '', autoplay: true, loop: true } },
      { type: 'custom-spline', label: 'Spline Scene', icon: <Box className="w-6 h-6" />, defaultStyle: { width: '100%', height: '400px' }, defaultContent: { url: '' } },
      { type: 'custom-rive', label: 'Rive', icon: <ImagePlay className="w-6 h-6" />, defaultStyle: { width: '100%', height: '400px' }, defaultContent: { src: '' } },
    ],
  },
  {
    id: 'forms',
    label: 'Forms',
    elements: [
      { type: 'custom-container', label: 'Form Block', icon: <FormInput className="w-6 h-6" />, defaultStyle: { display: 'flex', flexDirection: 'column', gap: '1rem' }, defaultContent: {} },
      { type: 'custom-text', label: 'Label', icon: <Tag className="w-6 h-6" />, defaultStyle: { fontSize: '0.875rem', fontWeight: 500 }, defaultContent: { text: 'Label' } },
      { type: 'custom-embed', label: 'Input', icon: <TextCursorInput className="w-6 h-6" />, defaultStyle: { width: '100%' }, defaultContent: { html: '<input type="text" placeholder="Enter text..." style="width:100%;padding:0.5rem;border:1px solid #ccc;border-radius:0.25rem" />' } },
      { type: 'custom-embed', label: 'Textarea', icon: <AlignLeft className="w-6 h-6" />, defaultStyle: { width: '100%' }, defaultContent: { html: '<textarea placeholder="Enter text..." style="width:100%;padding:0.5rem;border:1px solid #ccc;border-radius:0.25rem;min-height:100px"></textarea>' } },
      { type: 'custom-embed', label: 'Checkbox', icon: <CheckSquare className="w-6 h-6" />, defaultStyle: {}, defaultContent: { html: '<label style="display:flex;align-items:center;gap:0.5rem"><input type="checkbox" /> Checkbox</label>' } },
      { type: 'custom-embed', label: 'Radio Button', icon: <Circle className="w-6 h-6" />, defaultStyle: {}, defaultContent: { html: '<label style="display:flex;align-items:center;gap:0.5rem"><input type="radio" name="group" /> Radio</label>' } },
      { type: 'custom-embed', label: 'Select', icon: <SelectIcon className="w-6 h-6" />, defaultStyle: { width: '100%' }, defaultContent: { html: '<select style="width:100%;padding:0.5rem;border:1px solid #ccc;border-radius:0.25rem"><option>Option 1</option><option>Option 2</option><option>Option 3</option></select>' } },
      { type: 'custom-embed', label: 'File Upload', icon: <Upload className="w-6 h-6" />, defaultStyle: { width: '100%' }, defaultContent: { html: '<input type="file" style="width:100%" />' } },
      { type: 'custom-embed', label: 'reCAPTCHA', icon: <ShieldCheck className="w-6 h-6" />, defaultStyle: { width: '304px', height: '78px' }, defaultContent: { html: '<div style="width:304px;height:78px;background:#f9f9f9;border:1px solid #d3d3d3;border-radius:3px;display:flex;align-items:center;justify-content:center;color:#555;font-size:13px">reCAPTCHA</div>' } },
      { type: 'custom-button', label: 'Form Button', icon: <MousePointer className="w-6 h-6" />, defaultStyle: { display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: '#6366f1', color: '#fff', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }, defaultContent: { label: 'Submit', href: '' } },
    ],
  },
  {
    id: 'advanced',
    label: 'Advanced',
    elements: [
      { type: 'custom-embed', label: 'Embed', icon: <Code2 className="w-6 h-6" />, defaultStyle: { width: '100%' }, defaultContent: { html: '' } },
      { type: 'custom-embed', label: 'Custom Code', icon: <Hash className="w-6 h-6" />, defaultStyle: { width: '100%' }, defaultContent: { html: '<!-- Custom code here -->' } },
      { type: 'custom-container', label: 'Lightbox', icon: <Lightbulb className="w-6 h-6" />, defaultStyle: { display: 'block', cursor: 'pointer' }, defaultContent: {} },
      { type: 'custom-container', label: 'Dropdown', icon: <ChevronDownSquare className="w-6 h-6" />, defaultStyle: { display: 'block', position: 'relative' }, defaultContent: {} },
      { type: 'custom-container', label: 'Tabs', icon: <SlidersHorizontal className="w-6 h-6" />, defaultStyle: { display: 'flex', flexDirection: 'column' }, defaultContent: {} },
      { type: 'custom-container', label: 'Slider', icon: <SlidersHorizontal className="w-6 h-6" />, defaultStyle: { display: 'block', position: 'relative', overflow: 'hidden', width: '100%', minHeight: '300px' }, defaultContent: {} },
      { type: 'custom-container', label: 'Navbar', icon: <Navigation className="w-6 h-6" />, defaultStyle: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', width: '100%' }, defaultContent: {} },
      { type: 'custom-embed', label: 'Search', icon: <Search className="w-6 h-6" />, defaultStyle: { width: '100%' }, defaultContent: { html: '<input type="search" placeholder="Search..." style="width:100%;padding:0.5rem 1rem;border:1px solid #ccc;border-radius:0.5rem" />' } },
      { type: 'custom-embed', label: 'Background Video', icon: <Video className="w-6 h-6" />, defaultStyle: { position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover' } as Record<string, unknown>, defaultContent: { html: '<video autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover"><source src="" type="video/mp4" /></video>' } },
      { type: 'custom-embed', label: 'Map', icon: <Map className="w-6 h-6" />, defaultStyle: { width: '100%', height: '300px' }, defaultContent: { html: '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;color:#9ca3af">Map embed</div>' } },
      { type: 'custom-embed', label: 'Locales List', icon: <Globe className="w-6 h-6" />, defaultStyle: { width: '100%' }, defaultContent: { html: '<select style="padding:0.5rem;border:1px solid #ccc;border-radius:0.25rem"><option>Français</option><option>English</option><option>Español</option></select>' } },
      { type: 'custom-embed', label: 'Facebook', icon: <Facebook className="w-6 h-6" />, defaultStyle: { width: '340px', height: '500px' }, defaultContent: { html: '<div style="width:100%;height:100%;background:#f0f2f5;border:1px solid #ddd;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#4267B2;font-weight:600">Facebook Embed</div>' } },
      { type: 'custom-embed', label: 'X (Twitter)', icon: <Twitter className="w-6 h-6" />, defaultStyle: { width: '350px', minHeight: '200px' }, defaultContent: { html: '<div style="width:100%;min-height:200px;background:#f7f9fa;border:1px solid #e1e8ed;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#1da1f2;font-weight:600">X (Twitter) Embed</div>' } },
      { type: 'custom-divider', label: 'Divider', icon: <MinusSquare className="w-6 h-6" />, defaultStyle: { width: '100%' }, defaultContent: {} },
      { type: 'custom-spacer', label: 'Spacer', icon: <ArrowUpDown className="w-6 h-6" />, defaultStyle: { height: '2rem' }, defaultContent: {} },
      { type: 'custom-embed', label: 'Custom Element', icon: <Puzzle className="w-6 h-6" />, defaultStyle: { width: '100%', minHeight: '2rem' }, defaultContent: { html: '' } },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    elements: [
      { type: 'custom-container', label: 'Grid', icon: <LayoutGrid className="w-6 h-6" />, defaultStyle: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '1rem', padding: '1rem', minHeight: '4rem' }, defaultContent: {} },
      { type: 'custom-container', label: 'Columns', icon: <Columns className="w-6 h-6" />, defaultStyle: { display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '1.5rem', padding: '1rem', minHeight: '4rem' }, defaultContent: {} },
    ],
  },
]

// ─── Layout section categories (existing sections) ───

// Icon component per section type
const SECTION_ICONS: Record<string, React.FC<{ className?: string }>> = {
  'site-header': PanelTop,
  'site-footer': PanelBottom,
  custom: LayoutTemplate,
  hero: Sparkles,
  features: Star,
  'image-text': ImageIcon,
  steps: ListChecks,
  timeline: Clock,
  'blog-grid': FileText,
  'gallery-grid': GalleryHorizontalEnd,
  testimonials: MessageSquareQuote,
  stats: BarChart3,
  logos: Building2,
  team: Users,
  cta: Target,
  pricing: CreditCard,
  newsletter: Mail,
  'comparison-table': GitCompare,
  'product-grid': ShoppingBag,
  'product-detail': Tag,
  cart: ShoppingBag,
  checkout: CreditCard,
  contact: Phone,
  faq: HelpCircle,
  tabs: Layers,
  accordion: ChevronDownCircle,
  slider: GalleryHorizontalEnd,
  lightbox: Lightbulb,
  video: Play,
  dropdown: ChevronDownSquare,
  'navbar-advanced': Menu,
  'quick-stack': LayoutDashboard,
  map: MapPin,
  search: SearchIcon,
  form: FormInput,
}

const LAYOUT_CATEGORIES = [
  { id: 'structure', label: 'Structure', sections: [
    { type: 'site-header', label: 'Header' }, { type: 'site-footer', label: 'Footer' }, { type: 'custom', label: 'Blank Section' },
  ]},
  { id: 'hero', label: 'Hero & Landing', sections: [
    { type: 'hero', label: 'Hero' },
  ]},
  { id: 'content', label: 'Contenu', sections: [
    { type: 'features', label: 'Features' }, { type: 'image-text', label: 'Image + Texte' },
    { type: 'steps', label: 'Etapes' }, { type: 'timeline', label: 'Timeline' },
    { type: 'blog-grid', label: 'Blog Grid' }, { type: 'gallery-grid', label: 'Galerie' },
  ]},
  { id: 'social', label: 'Preuve Sociale', sections: [
    { type: 'testimonials', label: 'Temoignages' }, { type: 'stats', label: 'Statistiques' },
    { type: 'logos', label: 'Logos clients' }, { type: 'team', label: 'Equipe' },
  ]},
  { id: 'conversion', label: 'Conversion', sections: [
    { type: 'cta', label: 'Call to Action' }, { type: 'pricing', label: 'Tarifs' },
    { type: 'newsletter', label: 'Newsletter' }, { type: 'comparison-table', label: 'Comparatif' },
  ]},
  { id: 'ecommerce', label: 'E-commerce', sections: [
    { type: 'product-grid', label: 'Grille Produits' },
    { type: 'product-detail', label: 'Fiche Produit' },
    { type: 'cart', label: 'Panier' },
    { type: 'checkout', label: 'Checkout' },
  ]},
  { id: 'contact', label: 'Contact & Info', sections: [
    { type: 'contact', label: 'Contact' }, { type: 'form', label: 'Formulaire' }, { type: 'faq', label: 'FAQ' },
  ]},
  { id: 'widgets', label: 'Widgets Interactifs', sections: [
    { type: 'tabs', label: 'Tabs' }, { type: 'accordion', label: 'Accordion' },
    { type: 'slider', label: 'Slider' },
    { type: 'lightbox', label: 'Lightbox' }, { type: 'video', label: 'Video' },
    { type: 'dropdown', label: 'Dropdown' }, { type: 'navbar-advanced', label: 'Navbar Avancee' },
    { type: 'quick-stack', label: 'Quick Stack' },
    { type: 'map', label: 'Carte' }, { type: 'search', label: 'Recherche' },
  ]},
]

// ─── Draggable element item (sidebar → canvas) ───

function DraggableElementItem({ el, index, onAdd }: { el: ElementDef; index: number; onAdd: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-el-${el.label}-${index}`,
    data: { type: 'new-element', elementDef: el, label: el.label },
  })

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={onAdd}
      className={cn(
        'flex flex-col items-center gap-1 p-1 rounded-md transition-colors text-zinc-300 hover:bg-zinc-700/50 hover:text-white cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-40'
      )}
    >
      <div className="w-full aspect-square rounded-lg bg-zinc-800/80 border border-zinc-700/40 flex items-center justify-center">
        {el.icon}
      </div>
      <span className="text-[11px] truncate w-full text-center leading-tight">{el.label}</span>
    </button>
  )
}

// ─── Layout thumbnail item (Webflow-style preview grid) ───

function LayoutThumbnailItem({ sectionType, label, variant, onAdd }: { sectionType: string; label: string; variant: string; onAdd: () => void }) {
  const meta = getSectionMeta(sectionType)
  const variantDefs = SECTION_VARIANTS[sectionType]
  const variantDef = variantDefs?.find(v => v.id === variant)
  const defaultContent = (DEFAULT_CONTENTS[sectionType] ?? {}) as Record<string, unknown>
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-layout-${sectionType}-${variant}`,
    data: { type: 'new-section', sectionType, label, defaultContent, defaultVariant: variant },
  })

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={onAdd}
      className={cn(
        'group flex flex-col rounded-md border border-zinc-700/40 overflow-hidden text-left transition-all hover:border-zinc-500 hover:shadow-md cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-40'
      )}
    >
      <div className="relative overflow-hidden bg-white">
        <MiniSectionPreview
          sectionType={sectionType}
          variant={variant}
          content={defaultContent}
          style={variantDef?.previewStyle ?? { background: 'white', paddingY: 'md' }}
          scale={0.2}
        />
        <div className="absolute inset-0 bg-transparent group-hover:bg-wf-blue/10 transition-colors" />
      </div>
      <div className="px-1.5 py-1.5 bg-[#333] border-t border-zinc-700/40 group-hover:bg-[#3a3a3a] transition-colors">
        <p className="text-[10px] text-zinc-400 group-hover:text-zinc-200 truncate text-center">{label}</p>
      </div>
    </button>
  )
}

// ─── AddPanel ───

export function AddPanel() {
  const [subTab, setSubTab] = useState<'elements' | 'layouts'>('elements')
  const [search, setSearch] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set([
    'structure', 'basic', 'typography', 'cms', 'media', 'forms', 'advanced', 'other',
    // Layout sections (collapsed by default — user expands what they want)
  ]))
  const [variantPicker, setVariantPicker] = useState<{ type: string; label: string; icon: string } | null>(null)
  const { selectedPageId, addSection, selectedSectionId, addCustomElement, selectSection } = useEditorStore()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddSection = (type: string, variant?: string) => {
    if (!selectedPageId) return
    const meta = getSectionMeta(type)
    addSection(selectedPageId, {
      id: `section-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      variant: variant ?? meta?.defaultVariant ?? 'default',
      content: (DEFAULT_CONTENTS[type] ?? {}) as Record<string, any>,
      style: { background: 'white', paddingY: 'lg' },
      visible: true,
    })
  }

  const handleOpenPicker = (type: string, label: string, icon: string) => {
    const variants = SECTION_VARIANTS[type]
    if (!variants || variants.length <= 1) {
      handleAddSection(type)
    } else {
      setVariantPicker({ type, label, icon })
    }
  }

  const handleAddElement = (el: ElementDef) => {
    let targetSectionId = selectedSectionId

    // Auto-create a blank section if none exists
    if (!targetSectionId) {
      if (!selectedPageId) return
      const newSectionId = `section-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      addSection(selectedPageId, {
        id: newSectionId,
        type: 'custom',
        variant: 'default',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: {} as Record<string, any>,
        style: { background: 'white', paddingY: 'lg' },
        visible: true,
      })
      selectSection(newSectionId)
      targetSectionId = newSectionId
    }

    addCustomElement(targetSectionId, {
      id: `el-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: el.type,
      label: el.label,
      content: { ...el.defaultContent },
      style: { ...el.defaultStyle } as import('@/types/elements').ElementLayoutStyle,
      children: el.type === 'custom-container' ? [] : undefined,
      visible: true,
    })
  }

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filteredElementCategories = useMemo(() => {
    if (!search.trim()) return ELEMENT_CATEGORIES
    const q = search.toLowerCase()
    return ELEMENT_CATEGORIES
      .map(cat => ({ ...cat, elements: cat.elements.filter(e => e.label.toLowerCase().includes(q)) }))
      .filter(cat => cat.elements.length > 0)
  }, [search])

  const filteredLayoutCategories = useMemo(() => {
    if (!search.trim()) return LAYOUT_CATEGORIES
    const q = search.toLowerCase()
    return LAYOUT_CATEGORIES
      .map(cat => ({ ...cat, sections: cat.sections.filter(s => s.label.toLowerCase().includes(q) || s.type.includes(q)) }))
      .filter(cat => cat.sections.length > 0)
  }, [search])

  return (
    <>
      {/* Sub-tabs */}
      <div className="flex border-b border-zinc-700/50 shrink-0">
        <button
          onClick={() => setSubTab('elements')}
          className={cn(
            'flex-1 py-2.5 text-[12px] font-medium transition-colors relative',
            subTab === 'elements' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
          )}
        >
          Elements
          {subTab === 'elements' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-wf-blue" />}
        </button>
        <button
          onClick={() => setSubTab('layouts')}
          className={cn(
            'flex-1 py-2.5 text-[12px] font-medium transition-colors relative',
            subTab === 'layouts' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
          )}
        >
          Layouts
          {subTab === 'layouts' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-wf-blue" />}
        </button>
      </div>

      {/* Search */}
      <div className="px-2 py-1.5 border-b border-zinc-800 shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={subTab === 'elements' ? 'Search elements' : 'Search layouts'}
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded pl-7 pr-6 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Elements tab */}
      {subTab === 'elements' && (
        <ScrollArea className="flex-1">
          <div className="px-1.5 py-1 space-y-0.5">
            {filteredElementCategories.map(category => (
              <div key={category.id}>
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between px-1.5 py-1.5 hover:bg-zinc-700/30 rounded transition-colors"
                >
                  <span className="text-[11px] font-semibold text-[#ccc] uppercase tracking-wide">{category.label}</span>
                  <ChevronDown className={cn('w-3 h-3 text-zinc-500 transition-transform', !expandedCategories.has(category.id) && '-rotate-90')} />
                </button>
                {(search || expandedCategories.has(category.id)) && (
                  <div className="grid grid-cols-3 gap-px pb-1">
                    {category.elements.map((el, i) => (
                      <DraggableElementItem
                        key={`${el.type}-${el.label}-${i}`}
                        el={el}
                        index={i}
                        onAdd={() => handleAddElement(el)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Layouts tab — one section per section type, with variant thumbnails */}
      {subTab === 'layouts' && (
        <ScrollArea className="flex-1">
          <div className="p-2">
            {/* Each section type = its own collapsible group */}
            <div className="space-y-2">
              {filteredLayoutCategories.flatMap(category =>
                category.sections.map(section => {
                  const variants = SECTION_VARIANTS[section.type]
                  const items = (!variants || variants.length === 0)
                    ? [{ variant: 'default', label: section.label }]
                    : variants.map(v => ({ variant: v.id, label: v.label }))
                  const sectionKey = `layout-${section.type}`
                  const isExpanded = search || expandedCategories.has(sectionKey)
                  const SectionIcon = SECTION_ICONS[section.type] ?? LayoutTemplate

                  return (
                    <div key={section.type}>
                      <button
                        onClick={() => toggleCategory(sectionKey)}
                        className="w-full flex items-center gap-2 px-1.5 py-1.5 hover:bg-zinc-700/30 rounded transition-colors"
                      >
                        <SectionIcon className="w-4 h-4 text-zinc-400 shrink-0" />
                        <span className="text-[12px] font-medium text-[#ccc] flex-1 text-left">{section.label}</span>
                        <span className="text-[10px] text-zinc-500 mr-1">{items.length}</span>
                        <ChevronDown className={cn('w-3 h-3 text-zinc-500 transition-transform', !isExpanded && '-rotate-90')} />
                      </button>
                      {isExpanded && (
                        <div className="grid grid-cols-2 gap-1.5 mt-1">
                          {items.map(item => (
                            <LayoutThumbnailItem
                              key={`${section.type}-${item.variant}`}
                              sectionType={section.type}
                              label={item.label}
                              variant={item.variant}
                              onAdd={() => handleAddSection(section.type, item.variant)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </ScrollArea>
      )}

      {variantPicker && (
        <VariantPickerModal
          sectionType={variantPicker.type}
          sectionLabel={variantPicker.label}
          sectionIcon={variantPicker.icon}
          onSelect={(variant) => { handleAddSection(variantPicker.type, variant); setVariantPicker(null) }}
          onClose={() => setVariantPicker(null)}
        />
      )}
    </>
  )
}
