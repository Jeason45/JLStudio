#!/usr/bin/env node

/**
 * sync-variant-catalog.js
 *
 * Lit _variants.ts (source de vérité) et génère automatiquement
 * prompts/variant-catalog.md pour que le catalog soit toujours
 * synchronisé avec le code du builder.
 *
 * Usage : node scripts/sync-variant-catalog.js
 */

const fs = require('fs')
const path = require('path')

// ─── Paths ──────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..')
const VARIANTS_TS = path.join(ROOT, 'apps/builder/src/components/sections/_variants.ts')
const CATALOG_OUT = path.join(ROOT, 'prompts/variant-catalog.md')

// ─── Parse _variants.ts ─────────────────────────────────
function parseVariantsFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')

  // Extract the SECTION_VARIANTS object content
  const startIdx = content.indexOf('SECTION_VARIANTS')
  if (startIdx === -1) throw new Error('SECTION_VARIANTS not found in file')

  // Find the opening { of the Record
  const objStart = content.indexOf('{', startIdx)

  // Use bracket counting to find the matching }
  let depth = 0
  let objEnd = -1
  for (let i = objStart; i < content.length; i++) {
    if (content[i] === '{') depth++
    else if (content[i] === '}') {
      depth--
      if (depth === 0) { objEnd = i; break }
    }
  }

  if (objEnd === -1) throw new Error('Could not find end of SECTION_VARIANTS object')

  const objContent = content.slice(objStart, objEnd + 1)

  // Parse section types and their variants using regex
  const sections = {}

  // Match each section key and its array
  // Pattern: 'key' or key followed by : [...]
  const sectionRegex = /['"]?([\w-]+)['"]?\s*:\s*\[/g
  let sectionMatch

  while ((sectionMatch = sectionRegex.exec(objContent)) !== null) {
    const sectionType = sectionMatch[1]
    const arrayStart = sectionMatch.index + sectionMatch[0].length

    // Find the matching ]
    let bracketDepth = 1
    let arrayEnd = -1
    for (let i = arrayStart; i < objContent.length; i++) {
      if (objContent[i] === '[') bracketDepth++
      else if (objContent[i] === ']') {
        bracketDepth--
        if (bracketDepth === 0) { arrayEnd = i; break }
      }
    }

    if (arrayEnd === -1) continue

    const arrayContent = objContent.slice(arrayStart, arrayEnd)

    // Extract each variant object
    const variants = []
    const variantRegex = /\{\s*id:\s*'([^']+)'\s*,\s*label:\s*'([^']+)'\s*,\s*description:\s*'([^']+)'\s*,\s*previewStyle:\s*\{([^}]*)\}/g
    let variantMatch

    while ((variantMatch = variantRegex.exec(arrayContent)) !== null) {
      const previewStyle = variantMatch[4]
      const bgMatch = previewStyle.match(/background:\s*'([^']+)'/)
      const background = bgMatch ? bgMatch[1] : 'white'

      variants.push({
        id: variantMatch[1],
        label: variantMatch[2],
        description: variantMatch[3],
        background
      })
    }

    if (variants.length > 0) {
      sections[sectionType] = variants
    }
  }

  return sections
}

// ─── Background label mapping ───────────────────────────
function bgLabel(bg) {
  const map = {
    'white': 'Blanc',
    'light': 'Gris clair',
    'dark': 'Sombre',
    'primary': 'Primaire',
    'gradient': 'Dégradé',
    'custom': 'Custom',
  }
  return map[bg] || bg
}

// ─── Section type display names ─────────────────────────
const SECTION_LABELS = {
  'hero': 'hero',
  'site-header': 'site-header',
  'site-footer': 'site-footer',
  'features': 'features',
  'cta': 'cta',
  'stats': 'stats',
  'testimonials': 'testimonials',
  'pricing': 'pricing',
  'faq': 'faq',
  'contact': 'contact',
  'logos': 'logos',
  'team': 'team',
  'blog-grid': 'blog-grid',
  'timeline': 'timeline',
  'steps': 'steps',
  'gallery-grid': 'gallery-grid',
  'image-text': 'image-text',
  'product-grid': 'product-grid',
  'newsletter': 'newsletter',
  'tabs': 'tabs',
  'accordion': 'accordion',
  'lightbox': 'lightbox',
  'video': 'video',
  'slider': 'slider',
  'dropdown': 'dropdown',
  'navbar-advanced': 'navbar-advanced',
  'quick-stack': 'quick-stack',
  'map': 'map',
  'search': 'search',
  'comparison-table': 'comparison-table',
  'form': 'form',
  'collection-list': 'collection-list',
  'product-detail': 'product-detail',
  'cart': 'cart',
  'checkout': 'checkout',
}

// ─── Section ordering (most common first) ───────────────
const SECTION_ORDER = [
  'hero', 'site-header', 'site-footer', 'features', 'image-text',
  'cta', 'testimonials', 'stats', 'pricing', 'faq', 'contact',
  'logos', 'team', 'blog-grid', 'gallery-grid', 'newsletter',
  'steps', 'timeline', 'slider', 'video', 'tabs', 'accordion',
  'lightbox', 'product-grid', 'product-detail', 'cart', 'checkout',
  'collection-list', 'form', 'quick-stack', 'map', 'search',
  'comparison-table', 'dropdown', 'navbar-advanced',
]

// ─── Generate markdown ──────────────────────────────────
function generateCatalog(sections) {
  const lines = []

  lines.push('# Variant Catalog — JL Studio Builder')
  lines.push('## Reference visuelle de chaque variant pour la selection automatique')
  lines.push('')
  lines.push('> Ce fichier est **auto-genere** par `scripts/sync-variant-catalog.js` depuis `_variants.ts`.')
  lines.push('> Ne pas editer manuellement — relancer le script apres modification des variants.')
  lines.push('> Utilise-le pour choisir le bon variant en comparant avec le screenshot du site source.')
  lines.push('')

  // Stats
  let totalVariants = 0
  for (const key of Object.keys(sections)) {
    totalVariants += sections[key].length
  }
  lines.push(`> **${Object.keys(sections).length} types de sections** | **${totalVariants} variants au total**`)
  lines.push('')
  lines.push('---')

  // Sort sections by defined order, then any remaining alphabetically
  const sortedKeys = []
  for (const key of SECTION_ORDER) {
    if (sections[key]) sortedKeys.push(key)
  }
  for (const key of Object.keys(sections).sort()) {
    if (!sortedKeys.includes(key)) sortedKeys.push(key)
  }

  for (const sectionType of sortedKeys) {
    const variants = sections[sectionType]
    lines.push('')
    lines.push(`## ${sectionType}`)
    lines.push('')
    lines.push('| Variant | Description | Background | Quand l\'utiliser |')
    lines.push('|---------|-------------|------------|------------------|')

    for (const v of variants) {
      // Derive "quand l'utiliser" from the label/universe
      const universe = v.id.split('-')[0]
      let usage = ''
      switch (universe) {
        case 'startup': usage = 'SaaS, tech, moderne'; break
        case 'corporate': usage = 'Entreprise, pro'; break
        case 'luxe': usage = 'Luxe, hotel, mode'; break
        case 'creative': usage = 'Agence, neobrutalist'; break
        case 'ecommerce': usage = 'Boutique, e-commerce'; break
        case 'glass': usage = 'Fintech, crypto, tech'; break
        case 'brixsa': usage = 'Immobilier specifique'; break
        case 'zmr': usage = 'Agence creative specifique'; break
        case 'review': usage = 'Avis, notes'; break
        default: usage = v.label
      }

      lines.push(`| \`${v.id}\` | ${v.description} | ${bgLabel(v.background)} | ${usage} |`)
    }

    // Fallback info
    const firstVariant = variants[0]?.id || 'startup'
    const defaultUniverse = firstVariant.includes('-') ? firstVariant : firstVariant
    lines.push('')
    lines.push(`**Fallback** : variant inconnu → \`${defaultUniverse}\``)
    lines.push('')
    lines.push('---')
  }

  // Footer
  lines.push('')
  lines.push(`*Auto-genere le ${new Date().toISOString().split('T')[0]} depuis _variants.ts*`)
  lines.push('')

  return lines.join('\n')
}

// ─── Main ───────────────────────────────────────────────
function main() {
  console.log('🔄 Sync variant catalog...')
  console.log(`   Source: ${VARIANTS_TS}`)
  console.log(`   Output: ${CATALOG_OUT}`)

  if (!fs.existsSync(VARIANTS_TS)) {
    console.error(`❌ File not found: ${VARIANTS_TS}`)
    process.exit(1)
  }

  const sections = parseVariantsFile(VARIANTS_TS)
  const sectionCount = Object.keys(sections).length
  let variantCount = 0
  for (const key of Object.keys(sections)) {
    variantCount += sections[key].length
  }

  console.log(`   Found: ${sectionCount} section types, ${variantCount} variants`)

  const markdown = generateCatalog(sections)

  // Ensure output dir exists
  const outDir = path.dirname(CATALOG_OUT)
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  fs.writeFileSync(CATALOG_OUT, markdown, 'utf-8')
  console.log(`✅ Catalog written to ${CATALOG_OUT}`)
  console.log(`   ${sectionCount} sections, ${variantCount} variants`)
}

// Allow import as module or direct execution
if (require.main === module) {
  main()
} else {
  module.exports = { parseVariantsFile, generateCatalog, main }
}
