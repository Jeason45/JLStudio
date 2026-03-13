/**
 * Mailchimp API v3 helper — add/update subscriber
 */

export interface MailchimpSubscriberResult {
  success: boolean
  status?: string
  error?: string
}

export async function addSubscriber(
  apiKey: string,
  server: string,
  listId: string,
  email: string,
  firstName?: string,
  lastName?: string
): Promise<MailchimpSubscriberResult> {
  if (!apiKey || !server || !listId || !email) {
    return { success: false, error: 'Missing required Mailchimp parameters' }
  }

  const url = `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members`
  const auth = Buffer.from(`apikey:${apiKey}`).toString('base64')

  const mergeFields: Record<string, string> = {}
  if (firstName) mergeFields.FNAME = firstName
  if (lastName) mergeFields.LNAME = lastName

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: mergeFields,
      }),
    })

    if (res.ok) {
      return { success: true, status: 'subscribed' }
    }

    const data = await res.json().catch(() => null)

    // Member already exists — not an error
    if (res.status === 400 && data?.title === 'Member Exists') {
      return { success: true, status: 'already_subscribed' }
    }

    return {
      success: false,
      error: data?.detail || `Mailchimp API error ${res.status}`,
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Mailchimp request failed',
    }
  }
}

/**
 * Test Mailchimp connection by pinging the API
 */
export async function testConnection(
  apiKey: string,
  server: string
): Promise<{ success: boolean; error?: string }> {
  if (!apiKey || !server) {
    return { success: false, error: 'API Key and Server prefix required' }
  }

  const url = `https://${server}.api.mailchimp.com/3.0/ping`
  const auth = Buffer.from(`apikey:${apiKey}`).toString('base64')

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Basic ${auth}` },
    })

    if (res.ok) return { success: true }

    const data = await res.json().catch(() => null)
    return { success: false, error: data?.detail || `HTTP ${res.status}` }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Connection failed',
    }
  }
}
