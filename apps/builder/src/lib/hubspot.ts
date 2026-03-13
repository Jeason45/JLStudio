/**
 * HubSpot CRM API v3 helper — create or update contact
 */

export interface HubSpotContactResult {
  success: boolean
  contactId?: string
  status?: 'created' | 'updated'
  error?: string
}

export async function createOrUpdateContact(
  accessToken: string,
  email: string,
  properties?: Record<string, string>
): Promise<HubSpotContactResult> {
  if (!accessToken || !email) {
    return { success: false, error: 'Missing required HubSpot parameters' }
  }

  const contactProps: Record<string, string> = {
    email,
    ...properties,
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }

  try {
    // Try creating a new contact
    const createRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers,
      body: JSON.stringify({ properties: contactProps }),
    })

    if (createRes.ok) {
      const data = await createRes.json()
      return { success: true, contactId: data.id, status: 'created' }
    }

    // Conflict = contact already exists → update instead
    if (createRes.status === 409) {
      const errorData = await createRes.json().catch(() => null)
      const existingId = errorData?.message?.match(/Existing ID:\s*(\d+)/)?.[1]

      if (existingId) {
        const updateRes = await fetch(
          `https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`,
          {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ properties: contactProps }),
          }
        )

        if (updateRes.ok) {
          return { success: true, contactId: existingId, status: 'updated' }
        }

        const updateErr = await updateRes.json().catch(() => null)
        return {
          success: false,
          error: updateErr?.message || `HubSpot update error ${updateRes.status}`,
        }
      }

      // Could not extract existing ID — try search + update fallback
      return await searchAndUpdateContact(headers, email, contactProps)
    }

    const errData = await createRes.json().catch(() => null)
    return {
      success: false,
      error: errData?.message || `HubSpot API error ${createRes.status}`,
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'HubSpot request failed',
    }
  }
}

async function searchAndUpdateContact(
  headers: HeadersInit,
  email: string,
  properties: Record<string, string>
): Promise<HubSpotContactResult> {
  try {
    const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              { propertyName: 'email', operator: 'EQ', value: email },
            ],
          },
        ],
      }),
    })

    if (!searchRes.ok) {
      return { success: false, error: 'Could not search for existing contact' }
    }

    const searchData = await searchRes.json()
    const existingContact = searchData.results?.[0]

    if (!existingContact) {
      return { success: false, error: 'Contact conflict but could not find existing contact' }
    }

    const updateRes = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${existingContact.id}`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ properties }),
      }
    )

    if (updateRes.ok) {
      return { success: true, contactId: existingContact.id, status: 'updated' }
    }

    return { success: false, error: `HubSpot update failed ${updateRes.status}` }
  } catch {
    return { success: false, error: 'HubSpot search/update failed' }
  }
}

/**
 * Test HubSpot connection by fetching account info
 */
export async function testConnection(
  accessToken: string
): Promise<{ success: boolean; error?: string }> {
  if (!accessToken) {
    return { success: false, error: 'Access Token required' }
  }

  try {
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts?limit=1', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (res.ok) return { success: true }

    const data = await res.json().catch(() => null)
    return { success: false, error: data?.message || `HTTP ${res.status}` }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Connection failed',
    }
  }
}
