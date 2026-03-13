import type { SiteConfig, WebhookEvent } from '@/types/site'
import { createHmac } from 'crypto'

export async function dispatchWebhook(
  siteConfig: SiteConfig,
  event: WebhookEvent,
  payload: Record<string, unknown>,
): Promise<void> {
  const webhooks = siteConfig.integrations.webhooks
  if (!webhooks?.length) return

  const matching = webhooks.filter(w => w.enabled && w.events.includes(event))
  if (matching.length === 0) return

  const body = JSON.stringify({
    event,
    timestamp: new Date().toISOString(),
    data: payload,
  })

  const promises = matching.map(async (webhook) => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (webhook.secret) {
        const signature = createHmac('sha256', webhook.secret).update(body).digest('hex')
        headers['X-Webhook-Signature'] = signature
      }

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)

      await fetch(webhook.url, {
        method: 'POST',
        headers,
        body,
        signal: controller.signal,
      })

      clearTimeout(timeout)
    } catch {
      // Fire-and-forget: silently ignore errors
    }
  })

  await Promise.allSettled(promises)
}
