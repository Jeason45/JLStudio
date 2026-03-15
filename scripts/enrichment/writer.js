/**
 * writer.js — Safe append to TypeScript library files
 *
 * Strategy: find the target array in the file, insert new items before
 * the closing bracket. Backup before modification, validate after.
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '../..')
const BUILDER_DATA = path.join(ROOT, 'apps/builder/src/data')
const LIBRARY_DIR = path.join(BUILDER_DATA, 'library')

// ─── Backup ─────────────────────────────────────────────

function backupFile(filePath) {
  const backupPath = filePath + '.backup'
  fs.copyFileSync(filePath, backupPath)
  return backupPath
}

function restoreBackup(filePath) {
  const backupPath = filePath + '.backup'
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, filePath)
    fs.unlinkSync(backupPath)
    return true
  }
  return false
}

function cleanBackup(filePath) {
  const backupPath = filePath + '.backup'
  if (fs.existsSync(backupPath)) fs.unlinkSync(backupPath)
}

// ─── Generate TypeScript for a button item ──────────────

function generateButtonTS(candidate) {
  const s = candidate.styles
  return `  {
    id: '${candidate.id}',
    label: '${candidate.label.replace(/'/g, "\\'")}',
    category: 'components',
    subcategory: 'buttons',
    tags: [${candidate.tags.map(t => `'${t}'`).join(', ')}],
    dropType: 'element',
    elementDef: {
      type: 'custom-button', label: '${candidate.label.replace(/'/g, "\\'")}',
      defaultStyle: {
        display: 'inline-block', padding: '${s.padding}',
        backgroundColor: '${s.backgroundColor}', color: '${s.color}',
        borderRadius: '${s.borderRadius}', fontSize: '${s.fontSize}', fontWeight: ${parseInt(s.fontWeight) || 400},
        cursor: 'pointer', textAlign: 'center',${s.textTransform !== 'none' ? `\n        textTransform: '${s.textTransform}',` : ''}${s.letterSpacing !== 'normal' ? `\n        letterSpacing: '${s.letterSpacing}',` : ''}
        transition: 'all 0.4s ease',
      },
      defaultContent: { label: 'Button', href: '#' },
    },
  }`
}

// ─── Generate TypeScript for a hover animation item ─────

function generateHoverTS(candidate) {
  const changes = candidate.changes
  const duration = candidate.transition?.duration || '0.3s'
  const timing = candidate.transition?.timing || 'ease'

  // Build CSS transition properties
  const props = Object.keys(changes)
  const cssProps = props.join(', ')
  const fromStyles = props.map(p => `${camelToCss(p)}:${changes[p].from}`).join(';')

  // Build a simple CSS-only hover demo (no inline JS = no escaping issues)
  const animName = candidate.id.replace(/-/g, '')
  const toStyles = props.map(p => `${camelToCss(p)}:${changes[p].to}`).join(';')
  const html = `<style>.${animName}{${fromStyles};transition:${cssProps} ${duration} ${timing};padding:1.25rem;border-radius:.75rem;background:rgba(74,39,17,.12);border:1px solid rgba(200,169,126,.2);color:#f6efe5;font-size:.875rem;text-align:center;cursor:pointer}.${animName}:hover{${toStyles}}</style><div class="${animName}">Hover Effect &mdash; ${props.join(' + ')}</div>`

  // Use JSON.stringify to safely escape the HTML for embedding in TS
  const escapedHtml = JSON.stringify(html)

  const safeLabel = candidate.label.replace(/'/g, "\\'")
  return `  {
    id: '${candidate.id}',
    label: '${safeLabel}',
    category: 'animations', subcategory: 'hovers',
    tags: [${candidate.tags.map(t => `'${t}'`).join(', ')}],
    dropType: 'element',
    elementDef: {
      type: 'custom-embed', label: '${safeLabel}',
      defaultStyle: { width: '100%', minHeight: '60px' },
      defaultContent: { html: ${escapedHtml} },
    },
  }`
}

function camelToCss(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// ─── Generate TypeScript for a wireframe item ───────────

function generateWireframeTS(candidate) {
  const sections = candidate.sectionTypes.map(type => {
    return `      { type: '${type}', variant: 'default', content: {}, style: wMd }`
  }).join(',\n')

  return `  {
    id: '${candidate.id}',
    label: '${candidate.label.replace(/'/g, "\\'")}',
    category: 'wireframes',
    subcategory: '${candidate.subcategory}',
    tags: [${candidate.tags.map(t => `'${t}'`).join(', ')}],
    dropType: 'template',
    sections: [
${sections},
    ],
  }`
}

// ─── Generate TypeScript for a template item ────────────

// LibrarySectionStyle only allows: background, customBgColor, paddingY
function sanitizeLibraryStyle(style) {
  if (!style) return { background: 'white', paddingY: 'md' }
  const clean = {
    background: style.background || 'white',
    paddingY: style.paddingY || 'md',
  }
  if (style.customBgColor) clean.customBgColor = style.customBgColor
  return clean
}

function generateTemplateTS(candidate) {
  const sections = candidate.sections.map(s => {
    const style = JSON.stringify(sanitizeLibraryStyle(s.style))
    return `      { type: '${s.type}', variant: '${s.variant || 'default'}', content: ${JSON.stringify(s.content || {})}, style: ${style} }`
  }).join(',\n')

  return `  {
    id: '${candidate.id}',
    label: '${candidate.label.replace(/'/g, "\\'")}',
    category: 'templates',
    subcategory: '${candidate.subcategory}',
    tags: [${candidate.tags.map(t => `'${t}'`).join(', ')}],
    dropType: 'template',
    sections: [
${sections},
    ],
  }`
}

// ─── Append items to a specific array in a .ts file ─────

function appendToArray(filePath, arrayName, newItemsTS) {
  if (newItemsTS.length === 0) return { added: 0 }

  const content = fs.readFileSync(filePath, 'utf-8')

  // Find the array declaration: const ARRAY_NAME: Type[] = [
  const arrayPattern = new RegExp(`const ${arrayName}[^=]*=\\s*\\[`)
  const match = arrayPattern.exec(content)
  if (!match) {
    console.error(`  ⚠ Array ${arrayName} not found in ${path.basename(filePath)}`)
    return { added: 0, error: `Array ${arrayName} not found` }
  }

  // Find the matching closing ]
  const arrayStart = match.index + match[0].length
  let depth = 1
  let arrayEnd = -1
  for (let i = arrayStart; i < content.length; i++) {
    if (content[i] === '[') depth++
    else if (content[i] === ']') {
      depth--
      if (depth === 0) { arrayEnd = i; break }
    }
  }

  if (arrayEnd === -1) {
    return { added: 0, error: `Could not find closing ] for ${arrayName}` }
  }

  // Insert before the closing ]
  const insertion = newItemsTS.join(',\n') + ','
  const before = content.slice(0, arrayEnd)
  const after = content.slice(arrayEnd)
  const trimmedBefore = before.trimEnd()

  // Determine separator: avoid double commas
  let separator
  if (trimmedBefore.endsWith('[')) {
    separator = '\n'  // Empty array
  } else if (trimmedBefore.endsWith(',')) {
    separator = '\n'  // Already has trailing comma
  } else {
    separator = ',\n'  // Needs comma before new items
  }

  const newContent = trimmedBefore + separator + insertion + '\n' + after

  backupFile(filePath)
  fs.writeFileSync(filePath, newContent, 'utf-8')

  // Basic validation: check brackets are balanced
  const openBrackets = (newContent.match(/\[/g) || []).length
  const closeBrackets = (newContent.match(/\]/g) || []).length
  if (openBrackets !== closeBrackets) {
    console.error(`  ⚠ Bracket mismatch after edit — restoring backup`)
    restoreBackup(filePath)
    return { added: 0, error: 'Bracket mismatch' }
  }

  cleanBackup(filePath)
  return { added: newItemsTS.length }
}

// ─── Append to export spread (for wireframes/templates added to end of file) ──

function appendToExportArray(filePath, exportArrayName, newItemsTS) {
  if (newItemsTS.length === 0) return { added: 0 }

  const content = fs.readFileSync(filePath, 'utf-8')

  // Find the export: export const NAME: Type[] = [
  const exportPattern = new RegExp(`export const ${exportArrayName}[^=]*=\\s*\\[`)
  const match = exportPattern.exec(content)

  if (match) {
    // Find its closing ]
    const arrayStart = match.index + match[0].length
    let depth = 1
    let arrayEnd = -1
    for (let i = arrayStart; i < content.length; i++) {
      if (content[i] === '[') depth++
      else if (content[i] === ']') {
        depth--
        if (depth === 0) { arrayEnd = i; break }
      }
    }

    if (arrayEnd === -1) return { added: 0, error: 'Could not find closing ]' }

    const insertion = newItemsTS.join(',\n') + ','
    const before = content.slice(0, arrayEnd)
    const after = content.slice(arrayEnd)
    const trimmedBefore = before.trimEnd()

    // Determine separator: avoid double commas
    let separator
    if (trimmedBefore.endsWith('[')) {
      separator = '\n'  // Empty array
    } else if (trimmedBefore.endsWith(',')) {
      separator = '\n'  // Already has trailing comma
    } else {
      separator = ',\n'  // Needs comma before new items
    }

    const newContent = trimmedBefore + separator + insertion + '\n' + after

    backupFile(filePath)
    fs.writeFileSync(filePath, newContent, 'utf-8')
    cleanBackup(filePath)
    return { added: newItemsTS.length }
  }

  return { added: 0, error: `Export ${exportArrayName} not found` }
}

// ─── High-level write functions ─────────────────────────

function writeButtons(candidates) {
  const filePath = path.join(LIBRARY_DIR, 'components.ts')
  const tsItems = candidates.map(c => generateButtonTS(c))
  return appendToArray(filePath, 'BUTTONS', tsItems)
}

function writeHovers(candidates) {
  const filePath = path.join(LIBRARY_DIR, 'animations.ts')
  // Find IMAGE_HOVERS array or ENTRANCES as fallback
  const content = fs.readFileSync(filePath, 'utf-8')
  const arrayName = content.includes('IMAGE_HOVERS') ? 'IMAGE_HOVERS' : 'ENTRANCES'
  const tsItems = candidates.map(c => generateHoverTS(c))
  return appendToArray(filePath, arrayName, tsItems)
}

function writeWireframes(candidates) {
  const filePath = path.join(LIBRARY_DIR, 'wireframes.ts')
  const tsItems = candidates.map(c => generateWireframeTS(c))
  return appendToExportArray(filePath, 'LIBRARY_WIREFRAMES', tsItems)
}

function writeTemplates(candidates) {
  const filePath = path.join(LIBRARY_DIR, 'templates.ts')
  // Append to RICH_TEMPLATES or BASIC_TEMPLATES
  // RICH_TEMPLATES is a .map() expression, not a literal array — append to BASIC_TEMPLATES
  const arrayName = 'BASIC_TEMPLATES'
  const tsItems = candidates.map(c => generateTemplateTS(c))
  return appendToArray(filePath, arrayName, tsItems)
}

module.exports = {
  writeButtons,
  writeHovers,
  writeWireframes,
  writeTemplates,
  generateButtonTS,
  generateHoverTS,
  generateWireframeTS,
  generateTemplateTS,
  backupFile,
  restoreBackup,
  cleanBackup,
}
