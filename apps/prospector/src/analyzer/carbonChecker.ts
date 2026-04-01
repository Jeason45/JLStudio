import axios from 'axios'

export interface CarbonResult {
  isGreen: boolean              // hosted on green energy?
  co2PerView: number | null     // grams CO2 per page view
  cleanerThan: number | null    // percentage (e.g., 65 = cleaner than 65% of sites)
  rating: string | null         // A, B, C, D, E, F
}

// Website Carbon API — free, no key needed
// https://api.websitecarbon.com/
export async function checkCarbon(url: string): Promise<CarbonResult> {
  const result: CarbonResult = {
    isGreen: false, co2PerView: null, cleanerThan: null, rating: null,
  }

  try {
    const response = await axios.get('https://api.websitecarbon.com/site', {
      params: { url },
      timeout: 15000,
    })

    const data = response.data
    if (!data) return result

    result.isGreen = data.green === true || data.green === 'true'
    result.co2PerView = data.statistics?.co2?.grid?.grams ?? null
    result.cleanerThan = data.cleanerThan != null ? Math.round(data.cleanerThan * 100) : null

    // Calculate rating based on CO2
    if (result.co2PerView !== null) {
      if (result.co2PerView < 0.15) result.rating = 'A'
      else if (result.co2PerView < 0.34) result.rating = 'B'
      else if (result.co2PerView < 0.73) result.rating = 'C'
      else if (result.co2PerView < 1.17) result.rating = 'D'
      else if (result.co2PerView < 2.0) result.rating = 'E'
      else result.rating = 'F'
    }

    return result
  } catch {
    return result
  }
}
