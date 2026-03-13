'use client'
import { useState } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PanelSection } from '../PanelSection'
import { Plus, Trash2, Send, X } from 'lucide-react'
import type { WebhookConfig, WebhookEvent } from '@/types/site'

const INPUT = 'w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600'
const LBL = 'text-[10px] text-zinc-500'

const ALL_EVENTS: { value: WebhookEvent; label: string }[] = [
  { value: 'form.submit', label: 'Form submitted' },
  { value: 'order.created', label: 'Order created' },
  { value: 'order.paid', label: 'Order paid' },
  { value: 'cms.item.created', label: 'CMS item created' },
  { value: 'cms.item.updated', label: 'CMS item updated' },
  { value: 'contact.created', label: 'Contact created' },
]

export function WebhooksPanel() {
  const { siteConfig, addWebhook, updateWebhook, removeWebhook } = useEditorStore()
  const [testing, setTesting] = useState<string | null>(null)
  const webhooks = siteConfig?.integrations.webhooks ?? []

  const handleAdd = () => {
    addWebhook({
      id: `wh-${Date.now()}`,
      name: '',
      url: '',
      events: ['form.submit'],
      enabled: true,
    })
  }

  const handleTest = async (webhook: WebhookConfig) => {
    setTesting(webhook.id)
    try {
      await fetch(webhook.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'test', timestamp: new Date().toISOString(), data: { message: 'Test ping' } }),
      })
    } catch { /* ignore */ }
    setTimeout(() => setTesting(null), 1500)
  }

  const toggleEvent = (webhookId: string, event: WebhookEvent, current: WebhookEvent[]) => {
    const next = current.includes(event) ? current.filter(e => e !== event) : [...current, event]
    updateWebhook(webhookId, { events: next })
  }

  return (
    <ScrollArea className="flex-1">
      <PanelSection title="Webhooks" compact>
        {webhooks.length === 0 && (
          <p className="text-[10px] text-zinc-600 text-center py-4">No webhooks configured</p>
        )}
        <div className="space-y-3">
          {webhooks.map(wh => (
            <div key={wh.id} className="border border-zinc-700/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  value={wh.name}
                  onChange={e => updateWebhook(wh.id, { name: e.target.value })}
                  placeholder="Webhook name"
                  className={INPUT + ' flex-1'}
                />
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input type="checkbox" checked={wh.enabled} onChange={e => updateWebhook(wh.id, { enabled: e.target.checked })} className="sr-only peer" />
                  <div className="w-8 h-4 bg-zinc-700 rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4" />
                </label>
              </div>

              <div>
                <label className={LBL}>URL</label>
                <input value={wh.url} onChange={e => updateWebhook(wh.id, { url: e.target.value })} placeholder="https://..." className={INPUT} />
              </div>

              <div>
                <label className={LBL}>Secret (optional)</label>
                <input value={wh.secret ?? ''} onChange={e => updateWebhook(wh.id, { secret: e.target.value || undefined })} placeholder="HMAC secret" type="password" className={INPUT} />
              </div>

              <div>
                <label className={LBL}>Events</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {ALL_EVENTS.map(ev => (
                    <button
                      key={ev.value}
                      onClick={() => toggleEvent(wh.id, ev.value, wh.events)}
                      className={`px-1.5 py-0.5 text-[9px] rounded transition-colors ${
                        wh.events.includes(ev.value)
                          ? 'bg-wf-blue/20 text-wf-blue border border-wf-blue/40'
                          : 'bg-zinc-800 text-zinc-500 border border-zinc-700 hover:text-zinc-300'
                      }`}
                    >
                      {ev.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-1.5 pt-1">
                <button
                  onClick={() => handleTest(wh)}
                  disabled={!wh.url}
                  className="flex items-center gap-1 px-2 py-1 text-[10px] bg-zinc-800 text-zinc-400 rounded hover:bg-zinc-700 hover:text-white transition-colors disabled:opacity-50"
                >
                  <Send className="w-3 h-3" />
                  {testing === wh.id ? 'Sent!' : 'Test'}
                </button>
                <button
                  onClick={() => removeWebhook(wh.id)}
                  className="flex items-center gap-1 px-2 py-1 text-[10px] bg-zinc-800 text-red-400 rounded hover:bg-red-900/30 transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-1 py-2 text-[10px] text-zinc-500 hover:text-zinc-300 border border-dashed border-zinc-700 rounded transition-colors mt-2"
        >
          <Plus className="w-3 h-3" /> Add webhook
        </button>
      </PanelSection>
    </ScrollArea>
  )
}
