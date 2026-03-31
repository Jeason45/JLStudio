import axios from 'axios'

export interface W3CValidationResult {
  errorCount: number
  warningCount: number
  topErrors: string[]    // top 5 error messages
  fatalError: boolean    // HTML so broken it can't be parsed
}

// W3C HTML Validator API — free, no key needed
// https://validator.w3.org/nu/
const VALIDATOR_URL = 'https://validator.w3.org/nu/'

export async function validateHtml(url: string): Promise<W3CValidationResult> {
  const result: W3CValidationResult = {
    errorCount: 0,
    warningCount: 0,
    topErrors: [],
    fatalError: false,
  }

  try {
    const response = await axios.get(VALIDATOR_URL, {
      params: {
        doc: url,
        out: 'json',
      },
      timeout: 20000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; JLStudio Prospector)',
      },
    })

    const messages = response.data?.messages || []

    for (const msg of messages) {
      if (msg.type === 'error') {
        result.errorCount++
        if (result.topErrors.length < 5) {
          const text = (msg.message || '').slice(0, 120)
          result.topErrors.push(text)
        }
      } else if (msg.type === 'info' && msg.subType === 'warning') {
        result.warningCount++
      }

      if (msg.type === 'non-document-error') {
        result.fatalError = true
      }
    }

    return result
  } catch {
    return result
  }
}
