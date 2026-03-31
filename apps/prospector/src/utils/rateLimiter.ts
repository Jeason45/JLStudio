export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number,
  delayMs: number,
  label: string
): Promise<T | null> {
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      return await fn()
    } catch (err) {
      if (attempt > maxRetries) {
        const msg = err instanceof Error ? err.message : String(err)
        console.error(`  [retry] ${label} — échec après ${maxRetries + 1} tentatives: ${msg}`)
        return null
      }
      await delay(delayMs * attempt)
    }
  }
  return null
}
