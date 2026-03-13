'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Plus, FileText, List, Puzzle, Variable, Paintbrush, ImageIcon,
  Settings, ClipboardCheck, Search, PlayCircle,
  Zap, BookOpen, Blocks, GraduationCap, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { AddPanel } from './panels/AddPanel'
import { NavigatorPanel } from './panels/NavigatorPanel'
import { PagesPanel } from './panels/PagesPanel'
import { ComponentsPanel } from './panels/ComponentsPanel'
import { VariablesPanel } from './panels/VariablesPanel'
import { StyleManagerPanel } from './panels/StyleManagerPanel'
import { InteractionsPanel } from './panels/InteractionsPanel'
import { AssetsPanel } from './panels/AssetsPanel'
import { SiteSettingsPanel } from './panels/SiteSettingsPanel'
import { AuditsPanel } from './panels/AuditsPanel'
import { CmsPanel } from './panels/CmsPanel'
import { EcommercePanel } from './panels/EcommercePanel'
import { FigmaImportPanel } from './panels/FigmaImportPanel'
import { DesignPresetsPanel } from './panels/DesignPresetsPanel'
import { LibraryPanel } from './panels/LibraryPanel'
import { QUICK_FIND_EVENT } from './QuickFind'

// ─── Sidebar tab definitions (Webflow-exact layout) ───

type SidebarTab =
  | 'add' | 'pages' | 'navigator'
  | 'components' | 'variables' | 'styles' | 'interactions' | 'assets' | 'libraries'
  | 'apps'
  | 'settings' | 'audits' | 'find'

interface ToolbarItem {
  id: SidebarTab
  icon: React.FC<{ className?: string }>
  label: string
  shortcut?: string
}

// ─── Webflow sidebar layout (top to bottom) ───

// Group 1: Add / Pages / Navigator
const TOOLBAR_GROUP_1: ToolbarItem[] = [
  { id: 'add', icon: Plus, label: 'Ajouter des elements', shortcut: 'A' },
  { id: 'pages', icon: FileText, label: 'Pages', shortcut: 'P' },
  { id: 'navigator', icon: List, label: 'Navigateur', shortcut: 'Z' },
]

// Group 2: Components / Variables / Style selectors / Interactions / Assets / Libraries
const TOOLBAR_GROUP_2: ToolbarItem[] = [
  { id: 'components', icon: Puzzle, label: 'Composants', shortcut: '⇧A' },
  { id: 'variables', icon: Variable, label: 'Variables', shortcut: 'V' },
  { id: 'styles', icon: Paintbrush, label: 'Style selectors', shortcut: 'G' },
  { id: 'interactions', icon: Zap, label: 'Interactions', shortcut: 'X' },
  { id: 'assets', icon: ImageIcon, label: 'Assets', shortcut: 'J' },
  { id: 'libraries', icon: BookOpen, label: 'Bibliotheque', shortcut: 'L' },
]

// Group 3: Apps (CMS + E-Commerce combined)
const TOOLBAR_GROUP_3: ToolbarItem[] = [
  { id: 'apps', icon: Blocks, label: 'Apps', shortcut: 'E' },
]

// Bottom: Settings / Learning assistant / Audits / Find / Video tutorials
const TOOLBAR_BOTTOM: ToolbarItem[] = [
  { id: 'settings', icon: Settings, label: 'Parametres' },
]

// ─── Panel content map ───

const PANEL_TITLES: Record<SidebarTab, string> = {
  add: 'Ajouter',
  pages: 'Pages',
  navigator: 'Navigateur',
  components: 'Composants',
  variables: 'Variables',
  styles: 'Style selectors',
  interactions: 'Interactions',
  assets: 'Assets',
  libraries: 'Bibliotheque',
  apps: 'Apps',
  settings: 'Parametres',
  audits: 'Audits',
  find: 'Rechercher',
}

// Event name for toggling sidebar panels from keyboard shortcuts
export const SIDEBAR_TOGGLE_EVENT = 'sidebar:toggle'

// ─── Tooltip component ───

function SidebarTooltip({ label, buttonRef }: { label: string; buttonRef: React.RefObject<HTMLButtonElement | null> }) {
  const [show, setShow] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    const btn = buttonRef.current
    if (!btn) return
    const onEnter = () => {
      timerRef.current = setTimeout(() => setShow(true), 300)
    }
    const onLeave = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      setShow(false)
    }
    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mouseleave', onLeave)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [buttonRef])

  if (!show) return null

  const rect = buttonRef.current?.getBoundingClientRect()
  if (!rect) return null

  return (
    <div
      className="fixed z-[100] bg-zinc-900 text-white text-[11px] px-2 py-1 rounded shadow-lg border border-zinc-700 whitespace-nowrap pointer-events-none"
      style={{ top: rect.top + rect.height / 2 - 12, left: rect.right + 8 }}
    >
      {label}
    </div>
  )
}

function SidebarButton({ label, isActive, onClick, children }: {
  label: string
  isActive?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <>
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          'w-9 h-9 flex items-center justify-center rounded-lg transition-colors',
          isActive
            ? 'bg-wf-blue text-white'
            : 'text-zinc-400 hover:text-white hover:bg-[#303030]'
        )}
      >
        {children}
      </button>
      <SidebarTooltip label={label} buttonRef={ref} />
    </>
  )
}

function SidebarExtraButton({ label, onClick, children }: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <>
      <button
        ref={ref}
        onClick={onClick}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800 transition-colors"
      >
        {children}
      </button>
      <SidebarTooltip label={label} buttonRef={ref} />
    </>
  )
}

// ─── Main Sidebar ───

export function Sidebar() {
  const [activeTab, setActiveTab] = useState<SidebarTab | null>(null)

  const toggleTab = useCallback((tab: SidebarTab) => {
    setActiveTab(prev => prev === tab ? null : tab)
  }, [])

  // Listen for keyboard shortcut events
  useEffect(() => {
    const handler = (e: Event) => {
      const tab = (e as CustomEvent).detail as SidebarTab
      if (tab === 'find') {
        window.dispatchEvent(new Event(QUICK_FIND_EVENT))
      } else {
        toggleTab(tab)
      }
    }
    window.addEventListener(SIDEBAR_TOGGLE_EVENT, handler)
    return () => window.removeEventListener(SIDEBAR_TOGGLE_EVENT, handler)
  }, [toggleTab])

  const flyoutOpen = activeTab !== null

  const renderToolbarGroup = (items: ToolbarItem[]) =>
    items.map(({ id, icon: Icon, label, shortcut }) => (
      <SidebarButton
        key={id}
        label={shortcut ? `${label} (${shortcut})` : label}
        isActive={activeTab === id}
        onClick={() => toggleTab(id)}
      >
        <Icon className="w-[18px] h-[18px]" />
      </SidebarButton>
    ))

  return (
    <div className="relative flex shrink-0 h-full">
      {/* ── Toolbar (48px) ── */}
      <div className="w-12 bg-[#1e1e1e] border-r border-[#2a2a2a] flex flex-col items-center py-2 shrink-0">

        {/* Group 1: Add / Pages / Navigator */}
        <div className="flex flex-col items-center gap-0.5">
          {renderToolbarGroup(TOOLBAR_GROUP_1)}
        </div>

        {/* Separator */}
        <div className="w-6 h-px bg-zinc-700 my-2" />

        {/* Group 2: Components / Variables / Styles / Interactions / Assets / Libraries */}
        <div className="flex flex-col items-center gap-0.5">
          {renderToolbarGroup(TOOLBAR_GROUP_2)}
        </div>

        {/* Separator */}
        <div className="w-6 h-px bg-zinc-700 my-2" />

        {/* Group 3: Apps */}
        <div className="flex flex-col items-center gap-0.5">
          {renderToolbarGroup(TOOLBAR_GROUP_3)}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom: Settings */}
        <div className="flex flex-col items-center gap-0.5">
          {renderToolbarGroup(TOOLBAR_BOTTOM)}
        </div>

        {/* Learning assistant */}
        <SidebarExtraButton
          label="Assistant d'apprentissage"
          onClick={() => window.open('https://university.webflow.com/', '_blank')}
        >
          <GraduationCap className="w-[18px] h-[18px]" />
        </SidebarExtraButton>

        {/* Audits */}
        <SidebarButton
          label="Audits (U)"
          isActive={activeTab === 'audits'}
          onClick={() => toggleTab('audits')}
        >
          <ClipboardCheck className="w-[18px] h-[18px]" />
        </SidebarButton>

        {/* Find */}
        <SidebarButton
          label="Rechercher (⌘E)"
          isActive={false}
          onClick={() => window.dispatchEvent(new Event(QUICK_FIND_EVENT))}
        >
          <Search className="w-[18px] h-[18px]" />
        </SidebarButton>

        {/* Video tutorials */}
        <SidebarExtraButton
          label="Tutoriels video"
          onClick={() => window.open('https://www.youtube.com/@Webflow', '_blank')}
        >
          <PlayCircle className="w-[18px] h-[18px]" />
        </SidebarExtraButton>

        <div className="h-1" />
      </div>

      {/* ── Flyout panel (280px) ── */}
      {flyoutOpen && activeTab && (
        <>
        {/* Overlay — click to close flyout */}
        <div className="fixed inset-0 z-20" onClick={() => setActiveTab(null)} />
        <div className="absolute left-12 top-0 bottom-0 w-[280px] bg-[#363636] border-r border-[#2a2a2a] flex flex-col overflow-hidden animate-in slide-in-from-left-2 duration-200 z-30 shadow-xl dark-scroll-zone">
          {/* Flyout header */}
          <div className="h-10 flex items-center justify-between px-3 border-b border-zinc-700/50 shrink-0">
            <span className="text-[12px] font-semibold text-[#ccc]">
              {PANEL_TITLES[activeTab]}
            </span>
            <button onClick={() => setActiveTab(null)} className="text-zinc-500 hover:text-white transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Panel content */}
          {activeTab === 'add' && <AddPanel />}
          {activeTab === 'pages' && <PagesPanel />}
          {activeTab === 'navigator' && <NavigatorPanel />}
          {activeTab === 'components' && <ComponentsPanel />}
          {activeTab === 'variables' && <VariablesPanel />}
          {activeTab === 'styles' && <StyleManagerPanel />}
          {activeTab === 'interactions' && <InteractionsPanel />}
          {activeTab === 'assets' && <AssetsPanel />}
          {activeTab === 'libraries' && <LibraryPanel />}
          {activeTab === 'apps' && <AppsPanel />}
          {activeTab === 'settings' && <SiteSettingsPanel />}
          {activeTab === 'audits' && <AuditsPanel />}
        </div>
        </>
      )}
    </div>
  )
}

// ─── Apps Panel (Webflow-style marketplace) ───

interface AppDef {
  id: string
  name: string
  desc: string
  icon: string       // emoji or short text
  iconBg: string     // tailwind bg class
  iconColor: string  // tailwind text class
  category: 'built-in' | 'marketing' | 'design' | 'cms' | 'ecommerce' | 'dev' | 'analytics' | 'ai'
  panel?: 'cms' | 'ecommerce' | 'figma'  // opens a sub-panel if set
  url?: string       // external link
}

const APPS: AppDef[] = [
  // Built-in
  { id: 'cms', name: 'CMS', desc: 'Collections et contenu dynamique', icon: 'DB', iconBg: 'bg-purple-500/20', iconColor: 'text-purple-400', category: 'built-in', panel: 'cms' },
  { id: 'ecommerce', name: 'E-Commerce', desc: 'Produits, commandes et paiements', icon: '$$', iconBg: 'bg-green-500/20', iconColor: 'text-green-400', category: 'built-in', panel: 'ecommerce' },
  // Marketing
  { id: 'hubspot', name: 'HubSpot', desc: 'CRM, formulaires et marketing automation', icon: '🟠', iconBg: 'bg-orange-500/10', iconColor: 'text-orange-400', category: 'marketing', url: 'https://www.hubspot.com/' },
  { id: 'mailchimp', name: 'Mailchimp', desc: 'Email marketing et newsletters', icon: '📧', iconBg: 'bg-yellow-500/10', iconColor: 'text-yellow-400', category: 'marketing', url: 'https://mailchimp.com/' },
  { id: 'zapier', name: 'Zapier', desc: 'Automatisation no-code entre applications', icon: '⚡', iconBg: 'bg-orange-500/10', iconColor: 'text-orange-300', category: 'marketing', url: 'https://zapier.com/' },
  { id: 'google-ads', name: 'Google Ads', desc: 'Gerez vos campagnes Google Ads', icon: '📊', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400', category: 'marketing', url: 'https://ads.google.com/' },
  // Design
  { id: 'figma', name: 'Figma Import', desc: 'Importez vos designs Figma en elements', icon: '🎨', iconBg: 'bg-violet-500/10', iconColor: 'text-violet-400', category: 'design', panel: 'figma' },
  { id: 'unsplash', name: 'Unsplash', desc: 'Inserez des images libres de droit', icon: '📷', iconBg: 'bg-zinc-500/10', iconColor: 'text-zinc-300', category: 'design', url: 'https://unsplash.com/' },
  { id: 'getty', name: 'Getty Images', desc: 'Images premium haute qualite', icon: '🖼', iconBg: 'bg-red-500/10', iconColor: 'text-red-400', category: 'design', url: 'https://www.gettyimages.com/' },
  { id: 'ikonik', name: 'Ikonik', desc: '50k+ icones, outlined et filled', icon: '◇', iconBg: 'bg-cyan-500/10', iconColor: 'text-cyan-400', category: 'design', url: 'https://ikonik.com/' },
  { id: 'better-shadows', name: 'Better Shadows', desc: 'Ombres realistes pour vos elements', icon: '🌑', iconBg: 'bg-zinc-500/10', iconColor: 'text-zinc-400', category: 'design' },
  // CMS extensions
  { id: 'jetboost', name: 'Jetboost', desc: 'Filtres, recherche, geo search, likes...', icon: '🚀', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-300', category: 'cms', url: 'https://www.jetboost.io/' },
  // E-commerce extensions
  { id: 'paypal-links', name: 'PayPal Payment Links', desc: 'Liens de paiement et QR codes PayPal', icon: '💳', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-300', category: 'ecommerce', url: 'https://www.paypal.com/' },
  { id: 'memberstack', name: 'Memberstack', desc: 'Membres, contenus prives et abonnements', icon: '👤', iconBg: 'bg-indigo-500/10', iconColor: 'text-indigo-400', category: 'ecommerce', url: 'https://www.memberstack.com/' },
  // Dev
  { id: 'slater', name: 'Slater', desc: 'Environnement de code pour le designer', icon: '🔥', iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400', category: 'dev', url: 'https://slater.app/' },
  // Analytics / SEO
  { id: 'fluidseo', name: 'FluidSEO', desc: 'SEO avance, problemes et optimisations', icon: '🔍', iconBg: 'bg-green-500/10', iconColor: 'text-green-300', category: 'analytics', url: 'https://fluidseo.com/' },
  // AI
  { id: 'airops', name: 'AirOps', desc: 'Sync Webflow data, import, export AI', icon: '🤖', iconBg: 'bg-sky-500/10', iconColor: 'text-sky-400', category: 'ai', url: 'https://www.airops.com/' },
  { id: 'miyagi', name: 'Miyagi', desc: 'Agents IA pour designer et coder', icon: '🧠', iconBg: 'bg-pink-500/10', iconColor: 'text-pink-400', category: 'ai', url: 'https://miyagi.ai/' },
  // Localization
  { id: 'lokalise', name: 'Lokalise', desc: 'Traduction et localisation rapide', icon: '🌍', iconBg: 'bg-teal-500/10', iconColor: 'text-teal-400', category: 'marketing', url: 'https://lokalise.com/' },
  { id: 'globallink', name: 'GlobalLink', desc: 'Traduction IA et workflows', icon: '🔗', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-300', category: 'marketing', url: 'https://www.transperfect.com/' },
]

const APP_CATEGORIES = [
  { id: 'all', label: 'Tout' },
  { id: 'built-in', label: 'Integre' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'design', label: 'Design' },
  { id: 'ai', label: 'IA' },
  { id: 'analytics', label: 'SEO' },
  { id: 'dev', label: 'Dev' },
]

function AppsPanel() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [subPanel, setSubPanel] = useState<'cms' | 'ecommerce' | 'figma' | null>(null)

  if (subPanel === 'cms') return <CmsPanel />
  if (subPanel === 'ecommerce') return <EcommercePanel />
  if (subPanel === 'figma') return <FigmaImportPanel onBack={() => setSubPanel(null)} />

  const filtered = APPS.filter(app => {
    if (category !== 'all' && app.category !== category) return false
    if (search) {
      const q = search.toLowerCase()
      return app.name.toLowerCase().includes(q) || app.desc.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <ScrollArea className="flex-1">
      <div className="p-2 space-y-2">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search and install Apps"
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded pl-7 pr-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-0.5 overflow-x-auto pb-1">
          {APP_CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={cn(
                'px-2 py-0.5 text-[10px] rounded whitespace-nowrap transition-colors',
                category === c.id ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Section header */}
        {!search && category === 'all' && (
          <div className="text-[10px] text-zinc-500 font-medium pt-1">New & Noteworthy</div>
        )}

        {/* Apps list */}
        <div className="space-y-0.5">
          {filtered.map(app => (
            <button
              key={app.id}
              onClick={() => {
                if (app.panel) {
                  setSubPanel(app.panel)
                } else if (app.url) {
                  window.open(app.url, '_blank')
                }
              }}
              className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-zinc-700/40 transition-colors text-left"
            >
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[13px]', app.iconBg)}>
                <span className={app.iconColor}>{app.icon}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] text-[#ccc] font-medium flex items-center gap-1.5">
                  {app.name}
                  {app.panel && <span className="text-[8px] bg-green-500/20 text-green-400 px-1 rounded">actif</span>}
                </div>
                <div className="text-[10px] text-zinc-500 truncate">{app.desc}</div>
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="text-[10px] text-zinc-500 text-center py-6">Aucune app trouvee</div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-700/50">
          <button className="text-[10px] text-zinc-500 hover:text-white transition-colors">Charger plus</button>
          <button
            onClick={() => window.open('https://webflow.com/apps', '_blank')}
            className="text-[10px] text-wf-blue hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            Open Marketplace ↗
          </button>
        </div>
      </div>
    </ScrollArea>
  )
}

// ─── Libraries Panel (templates + blocks library) ───

function LibrariesPanel() {
  return (
    <ScrollArea className="flex-1">
      <div className="p-3 space-y-3">
        <p className="text-[10px] text-zinc-500">Parcourez et ajoutez des sections et layouts pre-construits.</p>

        {/* Categories */}
        {[
          { label: 'Sections', count: 31, desc: 'Hero, Features, CTA, Pricing...' },
          { label: 'Layouts', count: 12, desc: 'Headers, Footers, Sidebars...' },
          { label: 'Composants', count: 10, desc: 'Tabs, Accordions, Sliders...' },
          { label: 'Formulaires', count: 6, desc: 'Contact, Newsletter, Login...' },
        ].map(cat => (
          <button
            key={cat.label}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 transition-colors text-left"
          >
            <div>
              <div className="text-[12px] text-[#ccc] font-medium">{cat.label} <span className="text-zinc-500 text-[10px]">{cat.count}</span></div>
              <div className="text-[10px] text-zinc-500">{cat.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}
