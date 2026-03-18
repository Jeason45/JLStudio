const store = new Map<string, { count: number; resetAt: number }>()

// Cleanup expired entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key)
  }
}

export function rateLimit(key: string, maxRequests: number, windowMs: number): { allowed: boolean; remaining: number } {
  cleanup()
  const now = Date.now()
  const entry = store.get(key)
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }
  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }
  entry.count++
  return { allowed: true, remaining: maxRequests - entry.count }
}
