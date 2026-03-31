'use client'
import { useEditorStore } from '@/store/editorStore'
import { useShallow } from 'zustand/react/shallow'
import { selectSiteConfig } from '@/store/selectors'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PanelSection } from '../PanelSection'
import { Globe, Download, ExternalLink, Webhook, Plus, Trash2, Code } from 'lucide-react'
import { useState } from 'react'
import { IntegrationsPanel } from './IntegrationsPanel'
import { WebhooksPanel } from './WebhooksPanel'

const INPUT = 'w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500'
const TEXTAREA = 'w-full bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500 resize-none'
const LBL = 'text-[10px] text-zinc-500'

export function SiteSettingsPanel() {
  const siteConfig = useEditorStore(selectSiteConfig)
  const { updateSiteMeta, updateIntegrations, addRedirect, updateRedirect, removeRedirect, setRobotsTxt, setJsonLd } = useEditorStore(useShallow(s => ({
    updateSiteMeta: s.updateSiteMeta,
    updateIntegrations: s.updateIntegrations,
    addRedirect: s.addRedirect,
    updateRedirect: s.updateRedirect,
    removeRedirect: s.removeRedirect,
    setRobotsTxt: s.setRobotsTxt,
    setJsonLd: s.setJsonLd,
  })))
  const [showIntegrations, setShowIntegrations] = useState(false)
  const [showWebhooks, setShowWebhooks] = useState(false)
  const meta = siteConfig?.meta
  const integrations = siteConfig?.integrations
  const redirects = siteConfig?.redirects ?? []

  const exportJSON = () => {
    if (!siteConfig) return
    const blob = new Blob([JSON.stringify(siteConfig, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${meta?.title || 'site'}-config.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ScrollArea className="flex-1">
      {/* General */}
      <PanelSection title="General" compact>
        <div className="space-y-2">
          <div>
            <label className={LBL}>Nom du site</label>
            <input
              className={INPUT}
              placeholder="Mon Site"
              value={meta?.title ?? ''}
              onChange={e => updateSiteMeta({ title: e.target.value })}
            />
          </div>
          <div>
            <label className={LBL}>URL du site</label>
            <input
              className={INPUT}
              placeholder="https://monsite.com"
              value={meta?.url ?? ''}
              onChange={e => updateSiteMeta({ url: e.target.value })}
            />
          </div>
          <div>
            <label className={LBL}>Langue</label>
            <select
              className={INPUT}
              value={meta?.lang ?? 'fr'}
              onChange={e => updateSiteMeta({ lang: e.target.value as 'fr' | 'en' | 'es' | 'de' })}
            >
              <option value="fr">Francais</option>
              <option value="en">Anglais</option>
              <option value="es">Espagnol</option>
              <option value="de">Allemand</option>
            </select>
          </div>
          <div>
            <label className={LBL}>Favicon</label>
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                {meta?.favicon ? (
                  <img src={meta.favicon} alt="favicon" className="w-4 h-4" />
                ) : (
                  <Globe className="w-4 h-4 text-zinc-600" />
                )}
              </div>
              <input
                className={INPUT + ' flex-1'}
                placeholder="https://... ou uploader"
                value={meta?.favicon ?? ''}
                onChange={e => updateSiteMeta({ favicon: e.target.value })}
              />
            </div>
          </div>
        </div>
      </PanelSection>

      {/* SEO */}
      <PanelSection title="SEO" compact defaultOpen={false}>
        <div className="space-y-2">
          <div>
            <label className={LBL}>Titre meta global</label>
            <input
              className={INPUT}
              placeholder="Titre du site"
              value={meta?.seoTitle ?? ''}
              onChange={e => updateSiteMeta({ seoTitle: e.target.value })}
            />
          </div>
          <div>
            <label className={LBL}>Description meta globale</label>
            <textarea
              className={TEXTAREA}
              rows={3}
              placeholder="Description du site pour les moteurs de recherche"
              value={meta?.seoDescription ?? ''}
              onChange={e => updateSiteMeta({ seoDescription: e.target.value })}
            />
          </div>
          <div>
            <label className={LBL}>Image OG par defaut</label>
            <input
              className={INPUT}
              placeholder="https://..."
              value={meta?.ogImage ?? ''}
              onChange={e => updateSiteMeta({ ogImage: e.target.value })}
            />
          </div>
        </div>
      </PanelSection>

      {/* Custom Code */}
      <PanelSection title="Code personnalise" compact defaultOpen={false}>
        <div className="space-y-2">
          <div>
            <label className={LBL}>Code head</label>
            <textarea
              className={TEXTAREA + ' text-[10px] font-mono'}
              rows={4}
              placeholder="<!-- Code head personnalise -->"
              value={meta?.headCode ?? ''}
              onChange={e => updateSiteMeta({ headCode: e.target.value })}
            />
          </div>
          <div>
            <label className={LBL}>Code fin de body</label>
            <textarea
              className={TEXTAREA + ' text-[10px] font-mono'}
              rows={4}
              placeholder="<!-- Code body personnalise -->"
              value={meta?.bodyCode ?? ''}
              onChange={e => updateSiteMeta({ bodyCode: e.target.value })}
            />
          </div>
        </div>
      </PanelSection>

      {/* Integrations */}
      <PanelSection title="Integrations" compact defaultOpen={false}>
        {showIntegrations ? (
          <div className="space-y-2">
            <button
              onClick={() => setShowIntegrations(false)}
              className="text-[10px] text-zinc-500 hover:text-white transition-colors"
            >
              &larr; Retour aux parametres
            </button>
            <IntegrationsPanel />
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[10px] text-zinc-500">
              {[
                integrations?.analytics && 'Analytics',
                integrations?.gtm && 'GTM',
                integrations?.metaPixel && 'Meta Pixel',
                integrations?.hotjar && 'Hotjar',
                integrations?.crm?.enabled && 'CRM',
              ].filter(Boolean).join(', ') || 'Aucune integration configuree'}
            </p>
            <button
              onClick={() => setShowIntegrations(true)}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-[10px] text-zinc-400 hover:text-white bg-zinc-800 rounded hover:bg-zinc-700 transition-colors"
            >
              <ExternalLink className="w-3 h-3" /> Gerer les integrations
            </button>
          </div>
        )}
      </PanelSection>

      {/* Webhooks */}
      <PanelSection title="Webhooks" compact defaultOpen={false}>
        {showWebhooks ? (
          <div className="space-y-2">
            <button
              onClick={() => setShowWebhooks(false)}
              className="text-[10px] text-zinc-500 hover:text-white transition-colors"
            >
              &larr; Retour aux parametres
            </button>
            <WebhooksPanel />
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[10px] text-zinc-500">
              {integrations?.webhooks?.length
                ? `${integrations.webhooks.length} webhook(s) configure(s)`
                : 'Aucun webhook'}
            </p>
            <button
              onClick={() => setShowWebhooks(true)}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-[10px] text-zinc-400 hover:text-white bg-zinc-800 rounded hover:bg-zinc-700 transition-colors"
            >
              <Webhook className="w-3 h-3" /> Gerer les webhooks
            </button>
          </div>
        )}
      </PanelSection>

      {/* Redirects */}
      <PanelSection title="Redirections" compact defaultOpen={false}>
        <div className="space-y-2">
          {redirects.map((r) => (
            <div key={r.id} className="border border-zinc-800 rounded p-2 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <span className={`text-[9px] font-mono px-1 py-0.5 rounded ${r.type === '301' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {r.type}
                </span>
                <span className="text-[10px] text-zinc-500 flex-1 truncate">{r.from} &rarr; {r.to}</span>
                <button
                  onClick={() => removeRedirect(r.id)}
                  className="p-0.5 text-zinc-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-[1fr_1fr_auto] gap-1.5">
                <input
                  className={INPUT}
                  value={r.from}
                  onChange={e => updateRedirect(r.id, { from: e.target.value })}
                  placeholder="/old-path"
                />
                <input
                  className={INPUT}
                  value={r.to}
                  onChange={e => updateRedirect(r.id, { to: e.target.value })}
                  placeholder="/new-path"
                />
                <select
                  className={INPUT + ' w-14'}
                  value={r.type}
                  onChange={e => updateRedirect(r.id, { type: e.target.value as '301' | '302' })}
                >
                  <option value="301">301</option>
                  <option value="302">302</option>
                </select>
              </div>
            </div>
          ))}
          <button
            onClick={() => addRedirect({ id: `redir_${Date.now()}`, from: '', to: '', type: '301' })}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-[10px] text-zinc-400 hover:text-white bg-zinc-800 rounded hover:bg-zinc-700 transition-colors border border-dashed border-zinc-700"
          >
            <Plus className="w-3 h-3" /> Ajouter une redirection
          </button>
        </div>
      </PanelSection>

      {/* Robots.txt */}
      <PanelSection title="Robots.txt" compact defaultOpen={false}>
        <div className="space-y-2">
          <p className="text-[10px] text-zinc-500">Contenu robots.txt personnalise. Laisser vide pour le defaut.</p>
          <textarea
            className={TEXTAREA + ' text-[10px] font-mono'}
            rows={5}
            placeholder={"User-agent: *\nAllow: /"}
            value={siteConfig?.robotsTxt ?? ''}
            onChange={e => setRobotsTxt(e.target.value)}
          />
        </div>
      </PanelSection>

      {/* Structured Data (JSON-LD) */}
      <PanelSection title="Structured Data (JSON-LD)" compact defaultOpen={false}>
        <div className="space-y-2">
          <p className="text-[10px] text-zinc-500">{'JSON-LD global injecte en <script type="application/ld+json"> dans le head du site.'}</p>
          <div>
            <label className={LBL}>Modeles predefinis</label>
            <div className="flex flex-wrap gap-1 mb-2">
              {([
                ['Organization', `{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "${siteConfig?.meta.title ?? 'My Company'}",\n  "url": "${siteConfig?.meta.url ?? 'https://example.com'}",\n  "logo": "${siteConfig?.meta.favicon ?? ''}",\n  "sameAs": []\n}`],
                ['WebSite', `{\n  "@context": "https://schema.org",\n  "@type": "WebSite",\n  "name": "${siteConfig?.meta.title ?? 'My Site'}",\n  "url": "${siteConfig?.meta.url ?? 'https://example.com'}",\n  "potentialAction": {\n    "@type": "SearchAction",\n    "target": "${siteConfig?.meta.url ?? 'https://example.com'}/search?q={search_term_string}",\n    "query-input": "required name=search_term_string"\n  }\n}`],
                ['LocalBusiness', `{\n  "@context": "https://schema.org",\n  "@type": "LocalBusiness",\n  "name": "${siteConfig?.meta.title ?? 'Business Name'}",\n  "address": {\n    "@type": "PostalAddress",\n    "streetAddress": "",\n    "addressLocality": "",\n    "postalCode": "",\n    "addressCountry": "FR"\n  },\n  "telephone": "",\n  "openingHours": "Mo-Fr 09:00-18:00"\n}`],
                ['Product', `{\n  "@context": "https://schema.org",\n  "@type": "Product",\n  "name": "Product Name",\n  "description": "Product description",\n  "image": "",\n  "offers": {\n    "@type": "Offer",\n    "price": "0.00",\n    "priceCurrency": "EUR",\n    "availability": "https://schema.org/InStock"\n  }\n}`],
                ['Article', `{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "Article Title",\n  "author": {\n    "@type": "Person",\n    "name": "Author Name"\n  },\n  "datePublished": "${new Date().toISOString().split('T')[0]}",\n  "image": "",\n  "publisher": {\n    "@type": "Organization",\n    "name": "${siteConfig?.meta.title ?? 'Publisher'}"\n  }\n}`],
                ['BreadcrumbList', `{\n  "@context": "https://schema.org",\n  "@type": "BreadcrumbList",\n  "itemListElement": [\n    {\n      "@type": "ListItem",\n      "position": 1,\n      "name": "Home",\n      "item": "${siteConfig?.meta.url ?? 'https://example.com'}"\n    }\n  ]\n}`],
              ] as const).map(([label, template]) => (
                <button
                  key={label}
                  onClick={() => setJsonLd(template)}
                  className="px-1.5 py-0.5 text-[9px] bg-zinc-800 text-zinc-400 rounded hover:bg-zinc-700 hover:text-white transition-colors border border-zinc-700"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <textarea
            className={TEXTAREA + ' text-[10px] font-mono'}
            rows={10}
            placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "My Company"\n}'}
            value={siteConfig?.jsonLd ?? ''}
            onChange={e => setJsonLd(e.target.value)}
          />
          {siteConfig?.jsonLd && (() => {
            try {
              JSON.parse(siteConfig.jsonLd)
              return <p className="text-[9px] text-green-400">JSON valide</p>
            } catch {
              return <p className="text-[9px] text-red-400">JSON invalide</p>
            }
          })()}
        </div>
      </PanelSection>

      {/* Backups */}
      <PanelSection title="Sauvegardes" compact defaultOpen={false}>
        <div className="flex flex-col items-center py-4 text-center">
          <Download className="w-5 h-5 text-zinc-600 mb-2" />
          <p className="text-[10px] text-zinc-500 mb-2">Telecharger une sauvegarde de la configuration du site</p>
          <button
            onClick={exportJSON}
            className="px-3 py-1.5 bg-zinc-800 text-zinc-300 text-[10px] rounded hover:bg-zinc-700 transition-colors"
          >
            Exporter JSON
          </button>
        </div>
      </PanelSection>
    </ScrollArea>
  )
}
