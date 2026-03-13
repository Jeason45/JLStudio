import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import type { GenerateMode } from '@/types/ai'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

function buildSystemPrompt(mode: GenerateMode): string {
  const base = `Tu es un expert en copywriting et design web. Tu génères du contenu pour un configurateur de sites web.
Tu réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks, sans commentaires.
Le JSON doit être parseable directement avec JSON.parse().`

  if (mode === 'section') {
    return `${base}

Pour générer une section, retourne un objet JSON avec cette structure selon le type choisi :

hero: {"type":"hero","variant":"centered","content":{"eyebrow":"string","title":"string","subtitle":"string","primaryButton":{"label":"string","href":"#","variant":"primary"},"secondaryButton":{"label":"string","href":"#","variant":"outline"}},"style":{"background":"white","paddingY":"lg"}}

features: {"type":"features","variant":"grid-3","content":{"eyebrow":"string","title":"string","subtitle":"string","items":[{"id":"1","icon":"emoji","title":"string","description":"string"}]},"style":{"background":"light","paddingY":"lg"}}

cta: {"type":"cta","variant":"centered","content":{"badge":"string","title":"string","subtitle":"string","primaryButton":{"label":"string","href":"#","variant":"primary"}},"style":{"background":"primary","paddingY":"lg"}}

stats: {"type":"stats","variant":"startup-simple","content":{"eyebrow":"string","title":"string","items":[{"id":"1","value":"string","label":"string","description":"string"}]},"style":{"background":"white","paddingY":"lg"}}

testimonials: {"type":"testimonials","variant":"grid","content":{"eyebrow":"string","title":"string","items":[{"id":"1","quote":"string","author":"string","role":"string","company":"string","rating":5}]},"style":{"background":"light","paddingY":"lg"}}

faq: {"type":"faq","variant":"accordion","content":{"eyebrow":"string","title":"string","items":[{"id":"1","question":"string","answer":"string"}]},"style":{"background":"white","paddingY":"lg"}}

Choisis le type le plus adapté au prompt. Génère du contenu en français, professionnel et accrocheur.`
  }

  if (mode === 'improve') {
    return `${base}

Tu reçois un objet section JSON et une demande d'amélioration.
Retourne la section complète avec le champ "content" amélioré selon la demande.
Conserve exactement le même type et variant. Améliore uniquement le texte.`
  }

  return `${base}

Tu génères une page complète : un tableau JSON de 4 à 8 sections.
Structure recommandée : hero → features → stats → testimonials → pricing → faq → cta
Adapte le nombre et l'ordre selon la description.
Chaque section doit avoir type, variant, content complet, et style.`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, mode, currentSection } = body

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt requis' }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY non configurée. Ajoutez-la dans .env.local' },
        { status: 503 }
      )
    }

    const userMessage = mode === 'improve' && currentSection
      ? `Section actuelle :\n${currentSection}\n\nDemande : ${prompt}`
      : prompt

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: buildSystemPrompt(mode as GenerateMode),
      messages: [{ role: 'user', content: userMessage }],
    })

    const rawText = message.content[0].type === 'text' ? message.content[0].text : ''

    try {
      const cleaned = rawText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/, '')
        .trim()
      const parsed = JSON.parse(cleaned)
      return NextResponse.json({ result: parsed, raw: rawText })
    } catch {
      return NextResponse.json({ result: null, raw: rawText, parseError: true })
    }
  } catch (error: unknown) {
    console.error('AI error:', error)
    const message = error instanceof Error ? error.message : 'Erreur IA'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
