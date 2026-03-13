'use client'
import { useState } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PanelSection } from '../PanelSection'
import { CheckCircle2, Loader2 } from 'lucide-react'

const INPUT = 'w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600'
const LBL = 'text-[10px] text-zinc-500'
const BTN_TEST = 'h-6 px-2 text-[10px] rounded border border-zinc-600 text-zinc-300 hover:bg-zinc-700 transition-colors disabled:opacity-50'

interface IntegrationCardProps {
  name: string
  description: string
  enabled: boolean
  onToggle: (enabled: boolean) => void
  children?: React.ReactNode
}

function IntegrationCard({ name, description, enabled, onToggle, children }: IntegrationCardProps) {
  return (
    <div className="border border-zinc-700/50 rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-white font-medium">{name}</p>
          <p className="text-[9px] text-zinc-500">{description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={enabled} onChange={e => onToggle(e.target.checked)} className="sr-only peer" />
          <div className="w-8 h-4 bg-zinc-700 peer-focus:ring-1 peer-focus:ring-wf-blue rounded-full peer peer-checked:bg-wf-blue after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4" />
        </label>
      </div>
      {enabled && children && <div className="space-y-2 pt-1 border-t border-zinc-800">{children}</div>}
    </div>
  )
}

function ConnectedBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 text-[9px] text-emerald-400 font-medium">
      <CheckCircle2 className="w-3 h-3" /> Connected
    </span>
  )
}

function TestButton({ onClick, loading, result }: { onClick: () => void; loading: boolean; result?: { success: boolean; error?: string } }) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" className={BTN_TEST} onClick={onClick} disabled={loading}>
        {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Test connection'}
      </button>
      {result && !loading && (
        <span className={`text-[9px] ${result.success ? 'text-emerald-400' : 'text-red-400'}`}>
          {result.success ? 'OK' : result.error || 'Failed'}
        </span>
      )}
    </div>
  )
}

export function IntegrationsPanel() {
  const { siteConfig, updateIntegrations } = useEditorStore()
  const integrations = siteConfig?.integrations

  const [mcTesting, setMcTesting] = useState(false)
  const [mcResult, setMcResult] = useState<{ success: boolean; error?: string }>()
  const [hsTesting, setHsTesting] = useState(false)
  const [hsResult, setHsResult] = useState<{ success: boolean; error?: string }>()

  if (!integrations) return null

  const mcConfigured = !!(integrations.mailchimp?.apiKey && integrations.mailchimp?.server && integrations.mailchimp?.listId)
  const hsConfigured = !!(integrations.hubspot?.accessToken && integrations.hubspot?.portalId)

  async function testMailchimp() {
    const mc = integrations?.mailchimp
    if (!mc?.apiKey || !mc?.server) return
    setMcTesting(true)
    setMcResult(undefined)
    try {
      const res = await fetch(`https://${mc.server}.api.mailchimp.com/3.0/ping`, {
        headers: { Authorization: `Basic ${btoa(`apikey:${mc.apiKey}`)}` },
      })
      setMcResult(res.ok ? { success: true } : { success: false, error: `HTTP ${res.status}` })
    } catch (err) {
      setMcResult({ success: false, error: err instanceof Error ? err.message : 'Failed' })
    }
    setMcTesting(false)
  }

  async function testHubspot() {
    const hs = integrations?.hubspot
    if (!hs?.accessToken) return
    setHsTesting(true)
    setHsResult(undefined)
    try {
      const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts?limit=1', {
        headers: { Authorization: `Bearer ${hs.accessToken}` },
      })
      setHsResult(res.ok ? { success: true } : { success: false, error: `HTTP ${res.status}` })
    } catch (err) {
      setHsResult({ success: false, error: err instanceof Error ? err.message : 'Failed' })
    }
    setHsTesting(false)
  }

  return (
    <ScrollArea className="flex-1">
      {/* Analytics */}
      <PanelSection title="Analytics" compact>
        <div className="space-y-2">
          <IntegrationCard
            name="Google Analytics 4"
            description="Track visitors with GA4"
            enabled={integrations.analytics?.provider === 'gtag'}
            onToggle={on => updateIntegrations(on ? { analytics: { provider: 'gtag', id: integrations.analytics?.id ?? '' } } : { analytics: undefined })}
          >
            <div>
              <label className={LBL}>Measurement ID</label>
              <input className={INPUT} placeholder="G-XXXXXXXXXX" value={integrations.analytics?.id ?? ''} onChange={e => updateIntegrations({ analytics: { provider: 'gtag', id: e.target.value } })} />
            </div>
          </IntegrationCard>

          <IntegrationCard
            name="Google Tag Manager"
            description="Manage tags centrally"
            enabled={!!integrations.gtm}
            onToggle={on => updateIntegrations(on ? { gtm: { containerId: '' } } : { gtm: undefined })}
          >
            <div>
              <label className={LBL}>Container ID</label>
              <input className={INPUT} placeholder="GTM-XXXXXXX" value={integrations.gtm?.containerId ?? ''} onChange={e => updateIntegrations({ gtm: { containerId: e.target.value } })} />
            </div>
          </IntegrationCard>

          <IntegrationCard
            name="Plausible"
            description="Privacy-friendly analytics"
            enabled={integrations.analytics?.provider === 'plausible'}
            onToggle={on => updateIntegrations(on ? { analytics: { provider: 'plausible', id: integrations.analytics?.id ?? '' } } : { analytics: undefined })}
          >
            <div>
              <label className={LBL}>Domain</label>
              <input className={INPUT} placeholder="example.com" value={integrations.analytics?.id ?? ''} onChange={e => updateIntegrations({ analytics: { provider: 'plausible', id: e.target.value } })} />
            </div>
          </IntegrationCard>

          <IntegrationCard
            name="PostHog"
            description="Product analytics & session replay"
            enabled={integrations.analytics?.provider === 'posthog'}
            onToggle={on => updateIntegrations(on ? { analytics: { provider: 'posthog', id: integrations.analytics?.id ?? '' } } : { analytics: undefined })}
          >
            <div>
              <label className={LBL}>Project API Key</label>
              <input className={INPUT} placeholder="phc_..." value={integrations.analytics?.id ?? ''} onChange={e => updateIntegrations({ analytics: { provider: 'posthog', id: e.target.value } })} />
            </div>
          </IntegrationCard>

          <IntegrationCard
            name="Umami"
            description="Open-source privacy-focused analytics"
            enabled={integrations.analytics?.provider === 'umami'}
            onToggle={on => updateIntegrations(on ? { analytics: { provider: 'umami', id: integrations.analytics?.id ?? '', host: (integrations.analytics as Record<string, string>)?.host ?? '' } } : { analytics: undefined })}
          >
            <div className="space-y-1.5">
              <div>
                <label className={LBL}>Website ID</label>
                <input className={INPUT} placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" value={integrations.analytics?.id ?? ''} onChange={e => updateIntegrations({ analytics: { ...integrations.analytics, provider: 'umami', id: e.target.value } })} />
              </div>
              <div>
                <label className={LBL}>Script URL (host)</label>
                <input className={INPUT} placeholder="https://analytics.example.com/script.js" value={(integrations.analytics as Record<string, string>)?.host ?? ''} onChange={e => updateIntegrations({ analytics: { ...integrations.analytics, provider: 'umami', id: integrations.analytics?.id ?? '', host: e.target.value } })} />
              </div>
            </div>
          </IntegrationCard>
        </div>
      </PanelSection>

      {/* Marketing */}
      <PanelSection title="Marketing" compact>
        <div className="space-y-2">
          <IntegrationCard
            name="Meta Pixel"
            description="Facebook/Instagram ad tracking"
            enabled={!!integrations.metaPixel}
            onToggle={on => updateIntegrations(on ? { metaPixel: { pixelId: '' } } : { metaPixel: undefined })}
          >
            <div>
              <label className={LBL}>Pixel ID</label>
              <input className={INPUT} placeholder="123456789" value={integrations.metaPixel?.pixelId ?? ''} onChange={e => updateIntegrations({ metaPixel: { pixelId: e.target.value } })} />
            </div>
          </IntegrationCard>

          <IntegrationCard
            name="Hotjar"
            description="Heatmaps & session recordings"
            enabled={!!integrations.hotjar}
            onToggle={on => updateIntegrations(on ? { hotjar: { siteId: '' } } : { hotjar: undefined })}
          >
            <div>
              <label className={LBL}>Site ID</label>
              <input className={INPUT} placeholder="1234567" value={integrations.hotjar?.siteId ?? ''} onChange={e => updateIntegrations({ hotjar: { siteId: e.target.value } })} />
            </div>
          </IntegrationCard>
        </div>
      </PanelSection>

      {/* Email */}
      <PanelSection title="Email" compact>
        <div className="space-y-2">
          <IntegrationCard
            name="Mailchimp"
            description="Email marketing automation"
            enabled={!!integrations.mailchimp}
            onToggle={on => updateIntegrations(on ? { mailchimp: { apiKey: '', listId: '', server: '' } } : { mailchimp: undefined })}
          >
            {mcConfigured && <ConnectedBadge />}
            <div>
              <label className={LBL}>API Key</label>
              <input className={INPUT} placeholder="xxxxxxxx-us1" value={integrations.mailchimp?.apiKey ?? ''} onChange={e => updateIntegrations({ mailchimp: { ...integrations.mailchimp!, apiKey: e.target.value } })} />
            </div>
            <div>
              <label className={LBL}>Server prefix</label>
              <input className={INPUT} placeholder="us21" value={integrations.mailchimp?.server ?? ''} onChange={e => updateIntegrations({ mailchimp: { ...integrations.mailchimp!, server: e.target.value } })} />
            </div>
            <div>
              <label className={LBL}>List/Audience ID</label>
              <input className={INPUT} placeholder="abc123def" value={integrations.mailchimp?.listId ?? ''} onChange={e => updateIntegrations({ mailchimp: { ...integrations.mailchimp!, listId: e.target.value } })} />
            </div>
            <TestButton onClick={testMailchimp} loading={mcTesting} result={mcResult} />
          </IntegrationCard>

          <IntegrationCard
            name="HubSpot"
            description="CRM & marketing platform"
            enabled={!!integrations.hubspot}
            onToggle={on => updateIntegrations(on ? { hubspot: { portalId: '' } } : { hubspot: undefined })}
          >
            {hsConfigured && <ConnectedBadge />}
            <div>
              <label className={LBL}>Access Token</label>
              <input type="password" className={INPUT} placeholder="pat-na1-xxxxxxxx" value={integrations.hubspot?.accessToken ?? ''} onChange={e => updateIntegrations({ hubspot: { ...integrations.hubspot!, accessToken: e.target.value } })} />
            </div>
            <div>
              <label className={LBL}>Portal ID</label>
              <input className={INPUT} placeholder="12345678" value={integrations.hubspot?.portalId ?? ''} onChange={e => updateIntegrations({ hubspot: { ...integrations.hubspot!, portalId: e.target.value } })} />
            </div>
            <div>
              <label className={LBL}>Form ID (optional)</label>
              <input className={INPUT} placeholder="xxxxxxxx-xxxx" value={integrations.hubspot?.formId ?? ''} onChange={e => updateIntegrations({ hubspot: { ...integrations.hubspot!, formId: e.target.value || undefined } })} />
            </div>
            <TestButton onClick={testHubspot} loading={hsTesting} result={hsResult} />
          </IntegrationCard>

          <IntegrationCard
            name="Resend"
            description="Transactional emails"
            enabled={!!integrations.email}
            onToggle={on => updateIntegrations(on ? { email: { provider: 'resend', from: '', replyTo: '' } } : { email: undefined })}
          >
            <div>
              <label className={LBL}>From address</label>
              <input className={INPUT} placeholder="noreply@example.com" value={integrations.email?.from ?? ''} onChange={e => updateIntegrations({ email: { ...integrations.email!, from: e.target.value } })} />
            </div>
            <div>
              <label className={LBL}>Reply-to</label>
              <input className={INPUT} placeholder="support@example.com" value={integrations.email?.replyTo ?? ''} onChange={e => updateIntegrations({ email: { ...integrations.email!, replyTo: e.target.value || undefined } })} />
            </div>
          </IntegrationCard>
        </div>
      </PanelSection>

      {/* Automation */}
      <PanelSection title="Automation" compact>
        <div className="space-y-2">
          <IntegrationCard
            name="Zapier"
            description="Connect to 5000+ apps"
            enabled={!!integrations.zapier}
            onToggle={on => updateIntegrations(on ? { zapier: { webhookUrl: '' } } : { zapier: undefined })}
          >
            <div>
              <label className={LBL}>Webhook URL</label>
              <input className={INPUT} placeholder="https://hooks.zapier.com/..." value={integrations.zapier?.webhookUrl ?? ''} onChange={e => updateIntegrations({ zapier: { webhookUrl: e.target.value } })} />
            </div>
          </IntegrationCard>
        </div>
      </PanelSection>

      {/* CRM toggle */}
      <PanelSection title="CRM" compact>
        <IntegrationCard
          name="Built-in CRM"
          description="Contact management & leads"
          enabled={integrations.crm?.enabled ?? false}
          onToggle={on => updateIntegrations({ crm: { enabled: on } })}
        />
      </PanelSection>
    </ScrollArea>
  )
}
