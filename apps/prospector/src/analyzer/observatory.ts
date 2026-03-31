import axios from 'axios'

interface ObservatoryResult {
  grade: string | null
  score: number | null
}

// Mozilla Observatory — free security analysis API
// https://observatory.mozilla.org/
export async function analyzeObservatory(url: string): Promise<ObservatoryResult> {
  try {
    const hostname = new URL(url).hostname

    // Start a scan
    const scanResponse = await axios.post(
      `https://http-observatory.security.mozilla.org/api/v1/analyze?host=${hostname}`,
      null,
      { timeout: 10000, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )

    const data = scanResponse.data
    if (data.state === 'FINISHED' || data.state === 'ABORTED') {
      return {
        grade: data.grade || null,
        score: typeof data.score === 'number' ? data.score : null,
      }
    }

    // If still pending, wait and retry once
    if (data.state === 'PENDING' || data.state === 'STARTING' || data.state === 'RUNNING') {
      await new Promise(r => setTimeout(r, 8000))

      const retryResponse = await axios.get(
        `https://http-observatory.security.mozilla.org/api/v1/analyze?host=${hostname}`,
        { timeout: 10000 }
      )

      const retryData = retryResponse.data
      if (retryData.state === 'FINISHED') {
        return {
          grade: retryData.grade || null,
          score: typeof retryData.score === 'number' ? retryData.score : null,
        }
      }
    }

    return { grade: null, score: null }
  } catch {
    return { grade: null, score: null }
  }
}
