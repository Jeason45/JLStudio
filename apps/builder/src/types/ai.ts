export type GenerateMode = 'section' | 'improve' | 'page'

export interface AIGenerateRequest {
  prompt: string
  mode: GenerateMode
  currentSection?: string
}

export interface AIGenerateResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any
  raw?: string
  error?: string
  parseError?: boolean
}
