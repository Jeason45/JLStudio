#!/usr/bin/env node
/**
 * JL Studio — Auto-Reproduce Orchestrator
 *
 * Uses Claude API + Vision to automatically reproduce any website
 * in the JL Studio Builder with minimal iteration loops.
 *
 * Pipeline:
 *   1. Scan site (Playwright) → screenshots + raw-data.json
 *   2. Analyze each section (Claude API + Vision)
 *   3. Extract brand system (Claude API + Vision)
 *   4. Generate output.json (Claude API + tool_use)
 *   5. Validate output.json (Claude API)
 *   6. Import into builder
 *   7. Screenshot builder result
 *   8. Compare semantically (Claude API + Vision)
 *   9. Auto-correct based on semantic diff
 *  10. Loop until score ≥ 95% or max iterations
 *
 * Usage:
 *   node scripts/auto-reproduce.js <URL>
 *   node scripts/auto-reproduce.js <URL> --max-loops 5
 *   node scripts/auto-reproduce.js <URL> --skip-scan (reuse existing scan)
 *   node scripts/auto-reproduce.js <URL> --site-id <id> (update existing site)
 *
 * Requires: ANTHROPIC_API_KEY in .env
 */

const Anthropic = require('@anthropic-ai/sdk').default
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════

const MODEL = 'claude-sonnet-4-20250514'
const MODEL_HEAVY = 'claude-opus-4-20250514'
const MAX_TOKENS = 8192
const MAX_LOOPS = 10
const TARGET_SCORE = 95
const SCRIPTS_DIR = __dirname
const ROOT_DIR = path.resolve(__dirname, '..')
const PROMPTS_DIR = path.join(ROOT_DIR, 'prompts')

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

function log(msg) {
  const ts = new Date().toISOString().slice(11, 19)
  console.log(`[${ts}] ${msg}`)
}

function slugify(url) {
  const u = new URL(url)
  return (u.hostname + u.pathname).replace(/[^a-z0-9]+/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

function readPrompt(name) {
  const filePath = path.join(PROMPTS_DIR, `${name}.md`)
  if (!fs.existsSync(filePath)) {
    console.error(`Prompt file not found: ${filePath}`)
    console.error(`Run from the JLStudio root directory.`)
    process.exit(1)
  }
  return fs.readFileSync(filePath, 'utf-8')
}

function imageToBase64(filePath) {
  const data = fs.readFileSync(filePath)
  return data.toString('base64')
}

/**
 * Parse JSON from Claude's text response, handling markdown code blocks and preamble.
 * Uses bracket counting instead of indexOf to find the correct JSON object.
 */
function parseJsonFromText(text) {
  // 1. Try direct parse
  try { return JSON.parse(text) } catch {}

  // 2. Try extracting from markdown code block
  const jsonMatch = text.match(/```(?:json)?\s*\n([\s\S]*?)\n```/)
  if (jsonMatch) {
    try { return JSON.parse(jsonMatch[1]) } catch {}
  }

  // 3. Find the outermost balanced { ... } using bracket counting
  let depth = 0
  let start = -1
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') {
      if (depth === 0) start = i
      depth++
    } else if (text[i] === '}') {
      depth--
      if (depth === 0 && start !== -1) {
        try { return JSON.parse(text.substring(start, i + 1)) } catch {}
        // If this object didn't parse, keep looking
        start = -1
      }
    }
  }

  throw new Error('Could not parse JSON from Claude response')
}

function imageBlock(filePath) {
  return {
    type: 'image',
    source: {
      type: 'base64',
      media_type: 'image/png',
      data: imageToBase64(filePath),
    },
  }
}

function runScript(cmd, opts = {}) {
  log(`  $ ${cmd}`)
  try {
    execSync(cmd, { stdio: 'inherit', cwd: ROOT_DIR, timeout: 300000, ...opts })
    return true
  } catch (err) {
    log(`  ✗ Command failed: ${err.message}`)
    return false
  }
}

// ═══════════════════════════════════════════════════════════════
// CLAUDE API WRAPPER
// ═══════════════════════════════════════════════════════════════

let client = null

function getClient() {
  if (!client) {
    // Load .env files (check multiple locations)
    const envPaths = [
      path.join(ROOT_DIR, '.env'),
      path.join(ROOT_DIR, '.env.local'),
      path.join(ROOT_DIR, 'apps', 'builder', '.env.local'),
      path.join(ROOT_DIR, 'apps', 'builder', '.env'),
    ]
    for (const envPath of envPaths) {
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8')
        for (const line of envContent.split('\n')) {
          const match = line.match(/^([^#=]+)=(.*)$/)
          if (match) {
            const key = match[1].trim()
            const val = match[2].trim().replace(/^["']|["']$/g, '')
            if (!process.env[key]) process.env[key] = val
          }
        }
      }
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY not found in .env or environment')
      process.exit(1)
    }

    client = new Anthropic()
  }
  return client
}

/**
 * Call Claude API with messages and optional images.
 * Supports prompt caching via cache_control.
 */
async function askClaude(systemPrompt, userContent, { model = MODEL, maxTokens = MAX_TOKENS, tools = null, retries = 3 } = {}) {
  const api = getClient()

  const params = {
    model,
    max_tokens: maxTokens,
    system: [
      {
        type: 'text',
        text: systemPrompt,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: Array.isArray(userContent) ? userContent : [{ type: 'text', text: userContent }],
      },
    ],
  }

  if (tools) {
    params.tools = tools
    params.tool_choice = { type: 'any' }
  }

  let lastError
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await api.messages.create(params)

      // Extract tool use result if present
      if (tools) {
        const toolBlock = response.content.find(b => b.type === 'tool_use')
        if (toolBlock) return toolBlock.input
      }

      // Extract text
      const textBlock = response.content.find(b => b.type === 'text')
      return textBlock?.text || ''
    } catch (err) {
      lastError = err
      const isRetryable = err.status === 429 || err.status === 500 || err.status === 529 || err.code === 'ETIMEDOUT' || err.code === 'ECONNRESET'
      if (!isRetryable || attempt === retries) {
        throw err
      }
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 30000)
      log(`    ⚠ API error (${err.status || err.code}), retry ${attempt}/${retries} in ${delay / 1000}s...`)
      await new Promise(r => setTimeout(r, delay))
    }
  }
  throw lastError
}

// ═══════════════════════════════════════════════════════════════
// STEP 1: SCAN SITE
// ═══════════════════════════════════════════════════════════════

function scanSite(url) {
  log('═══ STEP 1: SCANNING SITE ═══')
  const success = runScript(`node scripts/scan-site.js "${url}"`)
  if (!success) {
    console.error('Scan failed. Aborting.')
    process.exit(1)
  }
}

// ═══════════════════════════════════════════════════════════════
// STEP 2: ANALYZE SECTIONS (Claude API + Vision)
// ═══════════════════════════════════════════════════════════════

async function analyzeSections(scanDir) {
  log('═══ STEP 2: ANALYZING SECTIONS ═══')

  const ssDir = path.join(scanDir, 'screenshots')
  const sectionFiles = fs.readdirSync(ssDir)
    .filter(f => f.match(/^section-\d+/))
    .sort()

  log(`  Found ${sectionFiles.length} section screenshots`)

  // Load raw-data.json for structured content (URLs, hrefs, image src, etc.)
  const rawDataPath = path.join(scanDir, 'raw-data.json')
  let rawData = null
  if (fs.existsSync(rawDataPath)) {
    rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf-8'))
    log(`  📦 raw-data.json loaded (${rawData.sections?.length} sections, ${rawData.content?.sections?.length} content sections)`)
  } else {
    log(`  ⚠ raw-data.json not found — analysis will rely on screenshots only`)
  }

  const systemPrompt = readPrompt('analyze-section')
  const variantCatalog = readPrompt('variant-catalog')

  // Enrich system prompt with variant catalog
  const fullSystem = systemPrompt + '\n\n---\n\n# Variant Catalog (reference)\n\n' + variantCatalog

  // Analyze sections in parallel (batches of 5 to respect rate limits)
  const analyses = []
  const batchSize = 5

  for (let i = 0; i < sectionFiles.length; i += batchSize) {
    const batch = sectionFiles.slice(i, i + batchSize)
    const promises = batch.map(async (file) => {
      const filePath = path.join(ssDir, file)
      const idx = file.match(/section-(\d+)/)?.[1] || '?'
      const sectionIndex = parseInt(idx) - 1 // 0-based index into raw-data
      const typeName = file.replace(/^section-\d+-/, '').replace('.png', '')

      log(`  🔍 Analyzing section ${idx} (${typeName})...`)

      // Build context from raw-data for this section
      let rawContext = ''
      if (rawData) {
        const sectionMeta = rawData.sections?.[sectionIndex]
        const sectionContent = rawData.content?.sections?.[sectionIndex]

        if (sectionMeta || sectionContent) {
          const contextData = {}

          // Detected type from Playwright scan
          if (sectionMeta?.detectedType) {
            contextData.detectedType = sectionMeta.detectedType
          }
          if (sectionMeta?.computedBg) {
            contextData.computedBackground = sectionMeta.computedBg
          }

          // Headings with computed styles
          if (sectionContent?.headings?.length > 0) {
            contextData.headings = sectionContent.headings.map(h => ({
              tag: h.tag,
              text: h.text,
              fontSize: h.computed?.fontSize,
              fontWeight: h.computed?.fontWeight,
              textTransform: h.computed?.textTransform,
            }))
          }

          // Paragraphs (full text)
          if (sectionContent?.paragraphs?.length > 0) {
            contextData.paragraphs = sectionContent.paragraphs.map(p => p.text || p)
          }

          // Buttons with href (critical — not visible on screenshots)
          if (sectionContent?.buttons?.length > 0) {
            contextData.buttons = sectionContent.buttons.map(b => ({
              label: b.label,
              href: b.href,
              classes: b.classes,
            }))
          }

          // Images with src URLs (critical — not visible on screenshots)
          if (sectionContent?.images?.length > 0) {
            contextData.images = sectionContent.images.map(img => ({
              src: img.src,
              alt: img.alt,
              width: img.width,
              height: img.height,
            }))
          }

          // Forms
          if (sectionContent?.forms?.length > 0) {
            contextData.forms = sectionContent.forms
          }

          // Lists
          if (sectionContent?.lists?.length > 0) {
            contextData.lists = sectionContent.lists
          }

          rawContext = `\n\n## Donnees extraites du scan (URLs, textes complets, styles computed)\n\`\`\`json\n${JSON.stringify(contextData, null, 2)}\n\`\`\``
        }

        // For header/footer: add navigation and footer data
        if (typeName.includes('header') || typeName.includes('nav') || sectionIndex === 0) {
          if (rawData.content?.navigation) {
            rawContext += `\n\n## Navigation extraite\n\`\`\`json\n${JSON.stringify(rawData.content.navigation, null, 2)}\n\`\`\``
          }
        }
        if (typeName.includes('footer') || sectionIndex === (rawData.sections?.length || 0) - 1) {
          if (rawData.content?.footer) {
            rawContext += `\n\n## Footer extrait\n\`\`\`json\n${JSON.stringify(rawData.content.footer, null, 2)}\n\`\`\``
          }
        }
      }

      const result = await askClaude(fullSystem, [
        { type: 'text', text: `Analyse cette section. Nom du fichier: ${file}\n\nUtilise le screenshot comme source de verite VISUELLE et les donnees extraites ci-dessous pour les URLs, hrefs, et textes exacts.${rawContext}` },
        imageBlock(filePath),
      ], {
        tools: [{
          name: 'section_analysis',
          description: 'Structured analysis of a website section',
          input_schema: {
            type: 'object',
            properties: {
              sectionType: {
                type: 'string',
                description: 'Type parmi: site-header, hero, logos, features, stats, testimonials, pricing, faq, cta, gallery-grid, blog-grid, team, contact, form, newsletter, timeline, steps, slider, lightbox, image-text, video, tabs, accordion, product-grid, site-footer, awards, comparison-table, map, search, quick-stack, custom',
              },
              suggestedVariant: {
                type: 'string',
                description: 'Variant recommande du variant-catalog (ex: luxe-grid, startup-centered)',
              },
              layout: { type: 'string', description: 'Description du layout' },
              background: { type: 'string', description: 'Description du fond (couleur, image, gradient)' },
              suggestedBgValue: {
                type: 'string',
                description: 'Valeur pour style.background: white|light|dark|custom',
              },
              customBgColor: {
                type: 'string',
                description: 'Hex color si background=custom (ex: #f8f5ef). Null sinon.',
              },
              textContent: {
                type: 'object',
                description: 'Tout le texte visible copie mot pour mot, structure selon le type de section',
                properties: {
                  eyebrow: { type: 'string' },
                  title: { type: 'string' },
                  subtitle: { type: 'string' },
                  body: { type: 'string' },
                  copyright: { type: 'string', description: 'Pour site-footer' },
                  tagline: { type: 'string', description: 'Pour site-footer' },
                  logo: { type: 'string', description: 'URL du logo pour site-header/site-footer' },
                  buttons: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        label: { type: 'string' },
                        href: { type: 'string', description: 'URL du lien (ex: /contact, #services, https://...)' },
                        style: { type: 'string', description: 'rempli|outline|ghost' },
                      },
                    },
                  },
                  navLinks: {
                    type: 'array',
                    description: 'Liens de navigation (pour site-header)',
                    items: {
                      type: 'object',
                      properties: {
                        label: { type: 'string' },
                        href: { type: 'string' },
                      },
                    },
                  },
                  ctaLabel: { type: 'string', description: 'Label du CTA dans le header' },
                  items: {
                    type: 'array',
                    description: 'Items structures selon le type: features(icon+title+desc), testimonials(quote+author+role), faq(question+answer), stats(value+label), steps(number+title+desc), pricing plans, team members, etc.',
                    items: {
                      type: 'object',
                      properties: {
                        title: { type: 'string' },
                        name: { type: 'string', description: 'Nom (pour team, product-grid, logos)' },
                        description: { type: 'string' },
                        icon: { type: 'string' },
                        value: { type: 'string', description: 'Pour stats: la valeur (ex: "500+")' },
                        label: { type: 'string', description: 'Pour stats: le label sous la valeur' },
                        quote: { type: 'string', description: 'Pour testimonials: le texte du temoignage' },
                        author: { type: 'string', description: 'Pour testimonials: nom de l auteur' },
                        role: { type: 'string', description: 'Pour testimonials/team: role/poste' },
                        company: { type: 'string', description: 'Pour testimonials: entreprise' },
                        question: { type: 'string', description: 'Pour faq: la question' },
                        answer: { type: 'string', description: 'Pour faq: la reponse' },
                        number: { type: 'string', description: 'Pour steps: "01", "02", etc.' },
                        price: { type: 'string', description: 'Pour pricing/product: le prix' },
                        period: { type: 'string', description: 'Pour pricing: la periode (/mois, /an)' },
                        features: {
                          type: 'array',
                          description: 'Pour pricing: liste de features du plan',
                          items: { type: 'string' },
                        },
                        rating: { type: 'number', description: 'Note en etoiles (1-5)' },
                        avatar: { type: 'string', description: 'URL avatar (pour testimonials/team)' },
                        image: { type: 'string', description: 'URL image (pour product-grid, blog-grid, logos)' },
                        src: { type: 'string', description: 'URL image (pour gallery images[])' },
                        href: { type: 'string', description: 'URL du lien (pour logos, blog-grid slug)' },
                        date: { type: 'string', description: 'Pour timeline/blog' },
                        category: { type: 'string', description: 'Pour blog-grid' },
                        excerpt: { type: 'string', description: 'Pour blog-grid: extrait' },
                      },
                    },
                  },
                  columns: {
                    type: 'array',
                    description: 'Colonnes de liens (pour site-footer)',
                    items: {
                      type: 'object',
                      properties: {
                        title: { type: 'string' },
                        links: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              label: { type: 'string' },
                              href: { type: 'string', description: 'URL du lien' },
                            },
                          },
                        },
                      },
                    },
                  },
                  imageCount: { type: 'number', description: 'Nombre d images visibles (pour gallery)' },
                  placeholder: { type: 'string', description: 'Placeholder input (pour newsletter)' },
                  buttonLabel: { type: 'string', description: 'Label du bouton (pour newsletter)' },
                },
              },
              typography: {
                type: 'object',
                properties: {
                  titleFont: { type: 'string', description: 'serif ou sans-serif' },
                  titleWeight: { type: 'string', description: 'light|normal|bold|black' },
                  titleSize: { type: 'string', description: 'sm|md|lg|xl|2xl|3xl|4xl' },
                  uppercase: { type: 'boolean', description: 'Titres en uppercase' },
                  letterSpacing: { type: 'string', description: 'tight|normal|wide|wider' },
                },
              },
              images: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    src: { type: 'string', description: 'URL de l image (https://cdn.prod.website-files.com/...)' },
                    alt: { type: 'string', description: 'Texte alternatif' },
                    position: { type: 'string' },
                    shape: { type: 'string' },
                    hasOverlay: { type: 'boolean' },
                  },
                },
              },
              decorativeElements: {
                type: 'array',
                description: 'Icones, ornements, separateurs, illustrations',
                items: { type: 'string' },
              },
              accentColor: { type: 'string', description: 'Couleur d accent principale' },
              ambiance: { type: 'string', description: 'luxe|moderne|corporate|creatif|ecommerce|glass' },
            },
            required: ['sectionType', 'suggestedVariant', 'layout', 'background', 'suggestedBgValue'],
          },
        }],
      })

      return { index: parseInt(idx), file, typeName, ...result }
    })

    const batchResults = await Promise.all(promises)
    analyses.push(...batchResults)

    // Small delay between batches for rate limiting
    if (i + batchSize < sectionFiles.length) {
      await new Promise(r => setTimeout(r, 1000))
    }
  }

  analyses.sort((a, b) => a.index - b.index)

  // Save analyses
  const analysisPath = path.join(scanDir, 'section-analyses.json')
  fs.writeFileSync(analysisPath, JSON.stringify(analyses, null, 2))
  log(`  ✅ ${analyses.length} sections analyzed → ${analysisPath}`)

  return analyses
}

// ═══════════════════════════════════════════════════════════════
// STEP 3: EXTRACT BRAND (Claude API + Vision)
// ═══════════════════════════════════════════════════════════════

async function extractBrand(scanDir) {
  log('═══ STEP 3: EXTRACTING BRAND ═══')

  const ssDir = path.join(scanDir, 'screenshots')
  const rawDataPath = path.join(scanDir, 'raw-data.json')

  // Collect key screenshots: full page + hero + a mid section
  const sectionFiles = fs.readdirSync(ssDir).filter(f => f.match(/^section-\d+/)).sort()
  const screenshots = []

  // Full page desktop
  const fullPage = path.join(ssDir, 'full-page-desktop.png')
  if (fs.existsSync(fullPage)) {
    screenshots.push({ path: fullPage, label: 'Full page desktop' })
  }

  // First 3 section screenshots for variety
  for (const file of sectionFiles.slice(0, 3)) {
    screenshots.push({ path: path.join(ssDir, file), label: file })
  }

  // Raw data CSS info (truncated)
  let cssInfo = ''
  if (fs.existsSync(rawDataPath)) {
    const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf-8'))
    cssInfo = JSON.stringify({
      fonts: rawData.libraries?.fonts || [],
      cssVariables: rawData.libraries?.cssVariables || {},
      bodyStyles: rawData.css?.globalStyles?.body || {},
      headingStyles: rawData.css?.globalStyles?.headings || {},
      buttonStyles: (rawData.css?.globalStyles?.buttons || []).slice(0, 3),
    }, null, 2)
  }

  const systemPrompt = readPrompt('extract-brand')

  const userContent = [
    { type: 'text', text: `Extrais le brand system de ce site.\n\nDonnees CSS extraites:\n\`\`\`json\n${cssInfo}\n\`\`\`` },
    ...screenshots.map(s => imageBlock(s.path)),
  ]

  const brand = await askClaude(systemPrompt, userContent, {
    model: MODEL,
    tools: [{
      name: 'brand_extraction',
      description: 'Extracted brand system',
      input_schema: {
        type: 'object',
        properties: {
          brand: {
            type: 'object',
            properties: {
              colors: {
                type: 'object',
                properties: {
                  primary: { type: 'string' },
                  secondary: { type: 'string' },
                  accent: { type: 'string' },
                  background: { type: 'string' },
                  foreground: { type: 'string' },
                  muted: { type: 'string' },
                },
                required: ['primary', 'secondary', 'accent', 'background', 'foreground', 'muted'],
              },
              typography: {
                type: 'object',
                properties: {
                  heading: { type: 'string' },
                  body: { type: 'string' },
                  size: { type: 'string', enum: ['compact', 'default', 'large'] },
                },
                required: ['heading', 'body', 'size'],
              },
              borderRadius: { type: 'string', enum: ['none', 'sm', 'md', 'lg', 'full'] },
              spacing: { type: 'string', enum: ['compact', 'default', 'relaxed'] },
            },
            required: ['colors', 'typography', 'borderRadius', 'spacing'],
          },
          universe: { type: 'string', enum: ['startup', 'corporate', 'luxe', 'creative', 'ecommerce', 'glass'] },
          confidence: {
            type: 'object',
            properties: {
              colors: { type: 'string', enum: ['high', 'medium', 'low'] },
              typography: { type: 'string', enum: ['high', 'medium', 'low'] },
              universe: { type: 'string', enum: ['high', 'medium', 'low'] },
            },
          },
          notes: { type: 'string' },
        },
        required: ['brand', 'universe'],
      },
    }],
  })

  // Save brand
  const brandPath = path.join(scanDir, 'brand.json')
  fs.writeFileSync(brandPath, JSON.stringify(brand, null, 2))
  log(`  ✅ Brand extracted → ${brandPath}`)
  log(`     Universe: ${brand.universe}`)
  log(`     Heading: ${brand.brand?.typography?.heading}`)
  log(`     Background: ${brand.brand?.colors?.background}`)

  return brand
}

// ═══════════════════════════════════════════════════════════════
// STEP 4: GENERATE OUTPUT.JSON (Claude API + tool_use)
// ═══════════════════════════════════════════════════════════════

async function generateTemplate(scanDir, analyses, brandData, url) {
  log('═══ STEP 4: GENERATING TEMPLATE ═══')

  const systemPrompt = readPrompt('generate-template')

  // Build a concise summary of all section analyses
  const sectionsSummary = analyses.map((a, i) => ({
    index: i + 1,
    type: a.sectionType,
    variant: a.suggestedVariant,
    background: a.suggestedBgValue,
    customBgColor: a.customBgColor,
    layout: a.layout,
    textContent: a.textContent,
    typography: a.typography,
    decorativeElements: a.decorativeElements,
    accentColor: a.accentColor,
    images: a.images,
  }))

  const userContent = `
Genere le output.json complet pour ce site.

URL source: ${url}

## Brand extrait
\`\`\`json
${JSON.stringify(brandData, null, 2)}
\`\`\`

## Analyses des sections
\`\`\`json
${JSON.stringify(sectionsSummary, null, 2)}
\`\`\`

Genere le JSON complet avec TOUTES les sections, en respectant :
1. Le brand extrait
2. Les types et variants suggeres par l'analyse
3. Le contenu textuel EXACT copie depuis les analyses
4. Les regles du generate-template.md

Retourne UNIQUEMENT le JSON valide, sans commentaires.
`

  const result = await askClaude(systemPrompt, userContent, {
    model: MODEL_HEAVY,
    maxTokens: 16384,
  })

  // Parse JSON from response
  const template = parseJsonFromText(result)

  // Save output.json
  const outputPath = path.join(scanDir, 'output.json')
  fs.writeFileSync(outputPath, JSON.stringify(template, null, 2))
  log(`  ✅ Template generated → ${outputPath}`)
  log(`     Sections: ${template.sections?.length || 0}`)

  return template
}

// ═══════════════════════════════════════════════════════════════
// STEP 5: VALIDATE JSON (Claude API)
// ═══════════════════════════════════════════════════════════════

async function validateTemplate(scanDir) {
  log('═══ STEP 5: VALIDATING TEMPLATE ═══')

  const outputPath = path.join(scanDir, 'output.json')
  const template = JSON.parse(fs.readFileSync(outputPath, 'utf-8'))
  const systemPrompt = readPrompt('validate-json')
  const variantCatalog = readPrompt('variant-catalog')

  const fullSystem = systemPrompt + '\n\n---\n\n# Variant Catalog\n\n' + variantCatalog

  const result = await askClaude(fullSystem, `Valide ce output.json et corrige les erreurs.\n\n\`\`\`json\n${JSON.stringify(template, null, 2)}\n\`\`\``, {
    tools: [{
      name: 'validation_result',
      description: 'Result of JSON validation',
      input_schema: {
        type: 'object',
        properties: {
          valid: { type: 'boolean' },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                path: { type: 'string' },
                error: { type: 'string' },
                fix: { type: 'string' },
              },
            },
          },
          warnings: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                path: { type: 'string' },
                warning: { type: 'string' },
              },
            },
          },
          correctedJson: { type: 'object', description: 'The corrected JSON if errors were found' },
        },
        required: ['valid', 'errors'],
      },
    }],
  })

  if (result.errors?.length > 0) {
    log(`  ⚠ ${result.errors.length} errors found:`)
    for (const err of result.errors) {
      log(`    - ${err.path}: ${err.error}`)
    }

    // Apply corrections only if the corrected JSON has sections (not partial)
    if (result.correctedJson?.sections?.length > 0) {
      fs.writeFileSync(outputPath, JSON.stringify(result.correctedJson, null, 2))
      log(`  ✅ Corrections applied (${result.correctedJson.sections.length} sections) → ${outputPath}`)
    } else if (result.correctedJson) {
      log(`  ⚠ Corrected JSON looks incomplete (no sections) — keeping original`)
    }
  } else {
    log(`  ✅ Template is valid`)
  }

  if (result.warnings?.length > 0) {
    log(`  ℹ ${result.warnings.length} warnings:`)
    for (const w of result.warnings.slice(0, 5)) {
      log(`    - ${w.path}: ${w.warning}`)
    }
  }

  return result
}

// ═══════════════════════════════════════════════════════════════
// STEP 6-7: IMPORT + SCREENSHOT
// ═══════════════════════════════════════════════════════════════

function importTemplate(scanDir, siteId) {
  log('═══ STEP 6: IMPORTING TEMPLATE ═══')

  const outputPath = path.join(scanDir, 'output.json')
  let cmd = `node scripts/import-template.js "${outputPath}"`
  if (siteId) cmd += ` --site-id ${siteId}`

  const success = runScript(cmd)
  if (!success) {
    console.error('Import failed')
    process.exit(1)
  }

  // Read import result for site ID
  const resultPath = path.join(scanDir, 'import-result.json')
  if (fs.existsSync(resultPath)) {
    const result = JSON.parse(fs.readFileSync(resultPath, 'utf-8'))
    return result.site?.id || siteId
  }

  return siteId
}

async function screenshotBuilder(scanDir, siteId) {
  log('═══ STEP 7: SCREENSHOTTING BUILDER ═══')

  const compDir = path.join(scanDir, 'comparison')
  fs.mkdirSync(compDir, { recursive: true })

  // Wait for builder to process the import
  log('  Waiting 3s for builder to update...')
  await new Promise(r => setTimeout(r, 3000))

  return runScript(`node scripts/screenshot-site.js ${siteId} "${compDir}"`)
}

// ═══════════════════════════════════════════════════════════════
// STEP 8: SEMANTIC COMPARISON (Claude API + Vision)
// ═══════════════════════════════════════════════════════════════

async function compareSections(scanDir) {
  log('═══ STEP 8: SEMANTIC COMPARISON ═══')

  const ssDir = path.join(scanDir, 'screenshots')
  const compDir = path.join(scanDir, 'comparison')

  // Also run pixel diff for the score
  runScript(`node scripts/compare-visual.js "${scanDir}"`)

  // Read the pixel diff report
  const reportPath = path.join(compDir, 'visual-report.json')
  if (!fs.existsSync(reportPath)) {
    log('  ⚠ No visual report found (pixel diff may have failed)')
    return { globalScore: 0, sections: [] }
  }

  const pixelReport = JSON.parse(fs.readFileSync(reportPath, 'utf-8'))
  log(`  Pixel diff score: ${pixelReport.globalScore}%`)

  // If score is already ≥ target, skip semantic comparison
  if (pixelReport.globalScore >= TARGET_SCORE) {
    log(`  ✅ Score ≥ ${TARGET_SCORE}% — skipping semantic comparison`)
    return pixelReport
  }

  // Semantic comparison on sections with score < 90%
  const weakSections = pixelReport.sections.filter(s => s.similarity < 90 && s.currentFile)
  log(`  🔍 Semantic comparison on ${weakSections.length} weak sections...`)

  const comparePrompt = readPrompt('compare-sections')
  const variantCatalog = readPrompt('variant-catalog')
  const systemPrompt = comparePrompt + '\n\n---\n\n# Variant Catalog (reference)\n\n' + variantCatalog
  const semanticResults = []

  for (const section of weakSections) {
    const origPath = path.join(ssDir, section.originalFile)
    const currPath = path.join(compDir, section.currentFile)

    if (!fs.existsSync(origPath) || !fs.existsSync(currPath)) continue

    log(`    Section ${section.index} (${section.type}, ${section.similarity}%)...`)

    try {
      const result = await askClaude(systemPrompt, [
        { type: 'text', text: `Compare ces deux screenshots de la section ${section.index} (type: ${section.type}, variant: ${section.variant}).\nImage 1 = ORIGINAL (site source)\nImage 2 = CONFIGURATEUR (notre reproduction)` },
        imageBlock(origPath),
        imageBlock(currPath),
      ], {
        tools: [{
          name: 'comparison_result',
          description: 'Semantic comparison result',
          input_schema: {
            type: 'object',
            properties: {
              overallMatch: { type: 'number', description: '0-100 match score' },
              issues: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    priority: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] },
                    category: { type: 'string', enum: ['structure', 'color', 'typography', 'image', 'button', 'decoration', 'spacing'] },
                    description: { type: 'string' },
                    fix: { type: 'string' },
                    field: { type: 'string' },
                  },
                  required: ['priority', 'category', 'description', 'fix', 'field'],
                },
              },
              biggestGap: { type: 'string' },
            },
            required: ['overallMatch', 'issues', 'biggestGap'],
          },
        }],
      })

      semanticResults.push({ sectionIndex: section.index, type: section.type, variant: section.variant, ...result })
    } catch (err) {
      log(`    ⚠ Comparison failed for section ${section.index}: ${err.message}`)
    }
  }

  // Save semantic report
  const semanticPath = path.join(compDir, 'semantic-report.json')
  fs.writeFileSync(semanticPath, JSON.stringify(semanticResults, null, 2))
  log(`  ✅ Semantic report → ${semanticPath}`)

  // Merge into pixel report
  pixelReport.semanticResults = semanticResults
  return pixelReport
}

// ═══════════════════════════════════════════════════════════════
// STEP 9: AUTO-CORRECT (Claude API)
// ═══════════════════════════════════════════════════════════════

async function autoCorrect(scanDir, report) {
  log('═══ STEP 9: AUTO-CORRECTING ═══')

  const outputPath = path.join(scanDir, 'output.json')
  const template = JSON.parse(fs.readFileSync(outputPath, 'utf-8'))

  const semanticIssues = report.semanticResults || []
  const pixelIssues = report.sections?.filter(s => s.issues?.length > 0) || []

  if (semanticIssues.length === 0 && pixelIssues.length === 0) {
    log('  No issues to correct')
    return false
  }

  // Count actionable corrections
  const actionableCount = semanticIssues.filter(s => (s.issues || []).some(i => i.priority !== 'low')).length
    + pixelIssues.filter(p => !semanticIssues.some(s => s.sectionIndex === p.index)).length

  if (actionableCount === 0) {
    log('  No actionable corrections (only low-priority issues)')
    return false
  }

  // Build correction instructions from both reports
  let corrections = '## Corrections a appliquer au output.json\n\n'
  const sectionsToFix = []

  // Semantic issues (higher quality, prioritize these)
  for (const sr of semanticIssues) {
    const actionable = (sr.issues || []).filter(i => i.priority !== 'low')
    if (actionable.length === 0) continue

    sectionsToFix.push(sr.sectionIndex)
    corrections += `### Section ${sr.sectionIndex} (${sr.type}, ${sr.variant}) — match: ${sr.overallMatch}%\n`
    corrections += `Plus gros ecart: ${sr.biggestGap}\n`
    for (const issue of actionable) {
      corrections += `- [${issue.priority}] ${issue.category}: ${issue.description}\n`
      corrections += `  Fix: ${issue.fix}\n`
      if (issue.field) corrections += `  Champ JSON: sections[${sr.sectionIndex}].${issue.field}\n`
    }
    corrections += '\n'
  }

  // Pixel issues (fill gaps)
  for (const ps of pixelIssues) {
    if (semanticIssues.some(s => s.sectionIndex === ps.index)) continue

    sectionsToFix.push(ps.index)
    corrections += `### Section ${ps.index} (${ps.type}, ${ps.variant}) — pixel score: ${ps.similarity}%\n`
    for (const issue of ps.issues) {
      corrections += `- [${issue.severity}] ${issue.type}: `
      if (issue.expected && issue.actual) corrections += `attendu ${issue.expected}, obtenu ${issue.actual}. `
      if (issue.fix) corrections += `Fix: ${issue.fix}`
      if (issue.detail) corrections += ` — ${issue.detail}`
      corrections += '\n'
    }
    corrections += '\n'
  }

  log(`  Fixing ${sectionsToFix.length} sections: [${sectionsToFix.join(', ')}]`)

  // Build message content with screenshots for context
  const ssDir = path.join(scanDir, 'screenshots')
  const compDir = path.join(scanDir, 'comparison')
  const messageContent = []

  messageContent.push({
    type: 'text',
    text: `Voici le output.json actuel :\n\`\`\`json\n${JSON.stringify(template, null, 2)}\n\`\`\`\n\n${corrections}\n\nApplique UNIQUEMENT les corrections listees. Ne touche PAS aux sections qui fonctionnent.`
  })

  // Attach screenshots of broken sections (original + current) for visual context
  for (const idx of sectionsToFix.slice(0, 5)) { // Max 5 pairs to avoid token limit
    const origFile = path.join(ssDir, `section-${String(idx).padStart(2, '0')}-original.png`)
    const currFile = path.join(compDir, `diff-section-${String(idx).padStart(2, '0')}.png`)

    if (fs.existsSync(origFile)) {
      messageContent.push({ type: 'text', text: `\n--- Section ${idx} ORIGINAL ---` })
      messageContent.push(imageBlock(origFile))
    }
    if (fs.existsSync(currFile)) {
      messageContent.push({ type: 'text', text: `--- Section ${idx} DIFF (rouge = ecarts) ---` })
      messageContent.push(imageBlock(currFile))
    }
  }

  const systemPrompt = readPrompt('correct-template')

  const result = await askClaude(systemPrompt, messageContent, {
    model: MODEL_HEAVY,
    maxTokens: 16384,
  })

  // Parse corrected JSON
  let corrected
  try {
    corrected = parseJsonFromText(result)
  } catch {
    log('  ✗ Could not parse corrected JSON')
    return false
  }

  // Verify it has sections
  if (!corrected.sections || corrected.sections.length === 0) {
    log('  ✗ Corrected JSON has no sections — keeping original')
    return false
  }

  // Safety: verify section count didn't change unexpectedly
  if (corrected.sections.length !== template.sections.length) {
    log(`  ⚠ Section count changed: ${template.sections.length} → ${corrected.sections.length}`)
  }

  // Log what was corrected
  if (corrected.meta?.corrections) {
    for (const c of corrected.meta.corrections) {
      log(`    • ${c}`)
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(corrected, null, 2))
  log(`  ✅ Corrections applied (${corrected.sections.length} sections)`)
  return true
}

// ═══════════════════════════════════════════════════════════════
// MAIN ORCHESTRATOR
// ═══════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2)
  const url = args.find(a => !a.startsWith('--'))

  if (!url) {
    console.error('Usage: node scripts/auto-reproduce.js <URL> [options]')
    console.error('')
    console.error('Options:')
    console.error('  --max-loops N     Maximum correction loops (default: 10)')
    console.error('  --skip-scan       Skip scanning (reuse existing scan)')
    console.error('  --site-id ID      Update existing site instead of creating new')
    console.error('  --skip-generate   Skip generation (reuse existing output.json)')
    console.error('')
    console.error('Example:')
    console.error('  node scripts/auto-reproduce.js https://beardtemplate.webflow.io/home')
    process.exit(1)
  }

  // Parse options
  const skipScan = args.includes('--skip-scan')
  const skipGenerate = args.includes('--skip-generate')
  const maxLoopsIdx = args.indexOf('--max-loops')
  const maxLoops = maxLoopsIdx !== -1 ? parseInt(args[maxLoopsIdx + 1]) || MAX_LOOPS : MAX_LOOPS
  const siteIdIdx = args.indexOf('--site-id')
  let siteId = siteIdIdx !== -1 ? args[siteIdIdx + 1] : null

  const slug = slugify(url)
  const scanDir = path.join(SCRIPTS_DIR, 'scans', slug)

  console.log('')
  console.log('╔══════════════════════════════════════════════════╗')
  console.log('║   JL Studio — Auto-Reproduce Orchestrator       ║')
  console.log('╚══════════════════════════════════════════════════╝')
  console.log(`  URL:        ${url}`)
  console.log(`  Scan dir:   ${scanDir}`)
  console.log(`  Max loops:  ${maxLoops}`)
  console.log(`  Site ID:    ${siteId || '(new)'}`)
  console.log('')

  // ─── Step 0: Sync variant catalog ───
  log('Syncing variant catalog from _variants.ts...')
  try {
    const { main: syncCatalog } = require('./sync-variant-catalog.js')
    syncCatalog()
  } catch (e) {
    log(`  ⚠ Catalog sync failed: ${e.message} — using existing catalog`)
  }

  // ─── Step 1: Scan ───
  if (!skipScan) {
    scanSite(url)
  } else {
    log('Skipping scan (--skip-scan)')
    if (!fs.existsSync(scanDir)) {
      console.error(`Scan directory not found: ${scanDir}`)
      process.exit(1)
    }
  }

  if (!skipGenerate) {
    // ─── Step 2: Analyze sections ───
    const analyses = await analyzeSections(scanDir)

    // ─── Step 3: Extract brand ───
    const brandData = await extractBrand(scanDir)

    // ─── Step 4: Generate template ───
    await generateTemplate(scanDir, analyses, brandData, url)

    // ─── Step 5: Validate ───
    await validateTemplate(scanDir)
  } else {
    log('Skipping generation (--skip-generate)')
    if (!fs.existsSync(path.join(scanDir, 'output.json'))) {
      console.error('output.json not found — cannot skip generation')
      process.exit(1)
    }
  }

  // ─── Step 6-10: Import → Compare → Correct loop ───
  let globalScore = 0

  for (let loop = 1; loop <= maxLoops; loop++) {
    console.log('')
    log(`═══════════════════════════════════════════`)
    log(`  ITERATION ${loop}/${maxLoops}`)
    log(`═══════════════════════════════════════════`)

    // Import
    siteId = importTemplate(scanDir, siteId)

    // Screenshot
    const screenshotOk = await screenshotBuilder(scanDir, siteId)
    if (!screenshotOk) {
      log('  ✗ Screenshot failed — retrying next loop')
      continue
    }

    // Compare (pixel + semantic)
    const report = await compareSections(scanDir)
    globalScore = report.globalScore || 0

    log(`  📊 Score: ${globalScore}%`)

    if (globalScore >= TARGET_SCORE) {
      console.log('')
      console.log('╔══════════════════════════════════════════════════╗')
      console.log(`║  🎯 TARGET REACHED: ${globalScore}% ≥ ${TARGET_SCORE}%`)
      console.log('╚══════════════════════════════════════════════════╝')
      break
    }

    if (loop >= maxLoops) {
      log(`  Max iterations reached (${maxLoops})`)
      break
    }

    // Auto-correct
    const corrected = await autoCorrect(scanDir, report)
    if (!corrected) {
      log('  No corrections applied — stopping')
      break
    }
  }

  // ─── Final summary ───
  console.log('')
  console.log('═══════════════════════════════════════════')
  console.log('  FINAL RESULTS')
  console.log('═══════════════════════════════════════════')
  console.log(`  Score:      ${globalScore}%`)
  console.log(`  Site ID:    ${siteId}`)
  console.log(`  Scan dir:   ${scanDir}`)
  console.log(`  Output:     ${path.join(scanDir, 'output.json')}`)

  if (globalScore >= TARGET_SCORE) {
    console.log(`  Status:     ✅ Fidelite visuelle atteinte`)
  } else if (globalScore >= 80) {
    console.log(`  Status:     🟡 Corrections mineures restantes`)
  } else {
    console.log(`  Status:     🔴 Corrections majeures necessaires`)
  }

  console.log('')
  console.log(`  Next steps:`)
  console.log(`    1. Review output.json`)
  const builderUrl = process.env.BUILDER_URL || 'http://localhost:3001'
  console.log(`    2. Open builder: ${builderUrl}/editor/${siteId}`)
  console.log(`    3. Manual refinements if needed`)
  console.log('')

  // ─── Step 11: Enrich library ───
  if (!args.includes('--skip-enrich')) {
    log('═══ STEP 11: ENRICHING LIBRARY ═══')
    try {
      const { enrichLibrary } = require('./enrichment/enrich.js')
      const enrichResult = await enrichLibrary(scanDir, { dryRun: false })
      if (enrichResult.added > 0) {
        log(`  🎉 Added ${enrichResult.added} new items to library:`)
        enrichResult.items.forEach(i => log(`    + ${i.category}/${i.subcategory}: ${i.label}`))
      } else {
        log('  No new patterns detected')
      }
    } catch (e) {
      log(`  ⚠ Enrichment failed: ${e.message}`)
    }
  } else {
    log('Skipping enrichment (--skip-enrich)')
  }

  // ─── Step 12: Cleanup scan artifacts ───
  if (!args.includes('--keep-artifacts')) {
    log('═══ STEP 12: CLEANUP SCAN ARTIFACTS ═══')
    try {
      const { cleanScanDir } = require('./clean-scans.js')
      const cleaned = cleanScanDir(scanDir)
      log(`  Cleaned ${cleaned.deleted} artifacts (${cleaned.freedMB} MB freed)`)
      log(`  Kept: raw-data.json, visual-report.json, scan-report.md, output.json`)
    } catch (e) {
      log(`  ⚠ Cleanup failed: ${e.message}`)
    }
  }

  console.log('')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
