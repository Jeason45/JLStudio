import { useState, useCallback } from 'react'
import type { GenerateMode } from '@/types/ai'

interface UseAIGenerateResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generate: (prompt: string, mode: GenerateMode, currentSection?: string) => Promise<any>
  loading: boolean
  error: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any
  reset: () => void
}

export function useAIGenerate(): UseAIGenerateResult {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null)

  const generate = useCallback(async (prompt: string, mode: GenerateMode, currentSection?: string) => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mode, currentSection }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Erreur inconnue')
      if (data.parseError) throw new Error('Réponse IA invalide. Réessayez.')
      setResult(data.result)
      return data.result
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur de génération'
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => { setError(null); setResult(null) }, [])

  return { generate, loading, error, result, reset }
}
