// ============================================================================
// HTML SLIDE BUILDER — Generates premium HTML slides for PDF conversion
// Style 7G: Linear/Keynote hybrid with ChatGPT backgrounds
// ============================================================================

import fs from 'fs'
import path from 'path'
import type { AuditReport } from './auditJson'
import type { Severity } from './auditCriteria'
import { CATEGORY_LABELS } from './auditCriteria'

// ── Load backgrounds as base64 ──

type BgVariant = 'G' | 'G2' | 'G3'
const bgCache: Partial<Record<BgVariant, string>> = {}

function loadBg(variant: BgVariant): string {
  if (bgCache[variant]) return bgCache[variant]!
  const file = `bg-${variant}.png`
  const filePath = path.join(process.cwd(), 'public', 'prospection-template', file)
  const buffer = fs.readFileSync(filePath)
  bgCache[variant] = `data:image/png;base64,${buffer.toString('base64')}`
  return bgCache[variant]!
}

// ── Helpers ──

function severityColor(s: Severity): string {
  if (s === 'ok') return '#22c55e'
  if (s === 'acceptable') return '#fbbf24'
  if (s === 'warning') return '#f59e0b'
  return '#f87171'
}

function severityIcon(s: Severity): string {
  if (s === 'ok') return '<span style="color:#22c55e">✓</span>'
  if (s === 'acceptable') return '<span style="color:#fbbf24">~</span>'
  if (s === 'warning') return '<span style="color:#f59e0b">!</span>'
  return '<span style="color:#f87171">✗</span>'
}

function scoreColor(score: number | null): string {
  if (score === null) return '#71717a'
  if (score >= 90) return '#22c55e'
  if (score >= 50) return '#fbbf24'
  return '#f87171'
}

function esc(str: string | null | undefined): string {
  if (!str) return ''
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// ── CSS ──

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

.slide {
  width: 1920px;
  height: 1080px;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', -apple-system, 'Helvetica Neue', sans-serif;
  color: #fafafa;
  page-break-after: always;
  background-size: cover;
  background-position: center;
  padding: 80px 100px;
  display: flex;
  flex-direction: column;
}

.slide::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 28px 28px;
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 90%);
  mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 90%);
  pointer-events: none;
  z-index: 0;
}

.slide > * { position: relative; z-index: 1; }

.section-label {
  font-size: 13px;
  color: #52525b;
  letter-spacing: 5px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.slide-title {
  font-size: 48px;
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 50px;
  max-width: 1200px;
}
.slide-title b, .slide-title strong { font-weight: 700; }

.card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 28px;
  position: relative;
  overflow: hidden;
}
.card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
}

.gauge-row {
  display: flex;
  gap: 40px;
  justify-content: center;
  margin-top: 40px;
}
.gauge {
  text-align: left;
}
.gauge .value {
  font-size: 72px;
  font-weight: 200;
  letter-spacing: -0.04em;
  line-height: 1;
}
.gauge .divider {
  width: 35px;
  height: 2px;
  background: #3f3f46;
  margin: 20px 0;
}
.gauge .label {
  font-size: 12px;
  color: #71717a;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 600;
}

.problem-card {
  display: flex;
  gap: 20px;
  padding: 24px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.problem-card:last-child { border-bottom: none; }
.problem-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 6px;
}
.problem-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
}
.problem-impact {
  font-size: 14px;
  color: #a1a1aa;
  line-height: 1.5;
}

.check-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.check-table th {
  text-align: left;
  padding: 10px 16px;
  font-size: 11px;
  color: #52525b;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  border-bottom: 1px solid #27272a;
}
.check-table .cat-header td {
  padding: 12px 16px 6px;
  font-size: 11px;
  font-weight: 700;
  color: #638BFF;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-bottom: 1px solid #1a1b1f;
}
.check-table .row td {
  padding: 10px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}
.check-table .row:nth-child(even) td {
  background: rgba(255,255,255,0.015);
}
.check-table .row td:first-child { color: #e4e4e7; }
.check-table .row td:nth-child(2) { color: #a1a1aa; text-align: center; }
.check-table .row td:last-child { text-align: center; font-size: 18px; font-weight: 700; }

.reco-item {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.reco-num {
  font-size: 28px;
  font-weight: 200;
  min-width: 40px;
}
.reco-content { flex: 1; }
.reco-action {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 4px;
}
.reco-impact {
  font-size: 13px;
  color: #a1a1aa;
}
.reco-badge {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 99px;
  font-weight: 600;
  margin-top: 4px;
  display: inline-block;
}

.step-row {
  display: flex;
  gap: 30px;
  margin-top: 40px;
}
.step {
  flex: 1;
  padding: 30px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
}
.step-num {
  font-size: 28px;
  font-weight: 200;
  color: #638BFF;
  margin-bottom: 10px;
}
.step-title {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.step-desc {
  font-size: 13px;
  color: #a1a1aa;
  line-height: 1.5;
}

.loss-badge {
  display: inline-block;
  padding: 12px 24px;
  background: rgba(248,113,113,0.1);
  border: 1px solid rgba(248,113,113,0.2);
  border-radius: 12px;
  color: #f87171;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
}

.screenshot-grid {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  margin-top: 20px;
  flex: 1;
}
.screenshot-col { text-align: center; }
.screenshot-col img {
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
  object-fit: cover;
  object-position: top;
}
.screenshot-label {
  font-size: 11px;
  color: #52525b;
  letter-spacing: 3px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 12px;
}
`

// ============================================================================
// SLIDE BUILDERS
// ============================================================================

function slideCover(r: AuditReport): string {
  const bg = loadBg('G3')
  const date = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  const infoParts: string[] = []
  if (r.prospect.city) infoParts.push(esc(r.prospect.city))
  if (r.prospect.website) infoParts.push(esc(r.prospect.website))
  infoParts.push(date)

  return `
  <div class="slide" style="background-image:url('${bg}'); justify-content: center;">
    <div class="section-label" style="color:#638BFF; letter-spacing:8px;">AUDIT WEB</div>
    <div style="font-size:72px; font-weight:300; letter-spacing:-0.04em; line-height:1.05; max-width:1400px; margin-bottom:40px;">
      ${esc(r.prospect.name)}
    </div>
    <div style="width:80px; height:2px; background:#3f3f46; margin-bottom:30px;"></div>
    <div style="font-size:16px; color:#71717a;">${infoParts.join('  ·  ')}</div>
    <div style="position:absolute; bottom:80px; left:100px; font-size:14px; color:#52525b;">
      JL Studio — jlstudio.dev
    </div>
  </div>`
}

function slideFirstImpression(r: AuditReport): string {
  const bg = loadBg('G')
  const desktopUrl = r.screenshots?.desktopFold || ''
  const mobileUrl = r.screenshots?.mobileFold || ''

  return `
  <div class="slide" style="background-image:url('${bg}');">
    <div class="section-label">SECTION 01 / PREMIÈRE IMPRESSION</div>
    <div class="slide-title">Voici ce que voit votre client<br>en arrivant sur <b>votre site.</b></div>
    <div class="screenshot-grid">
      <div class="screenshot-col">
        <div class="screenshot-label">Desktop</div>
        <img src="${esc(desktopUrl)}" style="width:680px; height:420px;" alt="Desktop">
      </div>
      <div class="screenshot-col">
        <div class="screenshot-label">Mobile</div>
        <img src="${esc(mobileUrl)}" style="width:220px; height:420px;" alt="Mobile">
      </div>
    </div>
  </div>`
}

function slideVerdict(r: AuditReport): string {
  const bg = loadBg('G')
  const categories = [
    { key: 'speed' as const, label: 'Rapidité' },
    { key: 'mobile' as const, label: 'Mobile' },
    { key: 'visibility' as const, label: 'Visibilité' },
    { key: 'trust' as const, label: 'Confiance' },
    { key: 'conversion' as const, label: 'Conversion' },
  ]

  return `
  <div class="slide" style="background-image:url('${bg}');">
    <div class="section-label">SECTION 02 / LE VERDICT</div>
    <div class="slide-title">Votre site obtient un score de <b style="color:${scoreColor(r.scores.global)}">${r.scores.global}/100</b>.</div>
    <div class="gauge-row">
      ${categories.map(c => {
        const score = r.scores[c.key]
        return `
        <div class="gauge">
          <div class="value" style="color:${scoreColor(score)}">${score}</div>
          <div class="divider"></div>
          <div class="label">${c.label}</div>
        </div>`
      }).join('')}
    </div>
    <div class="loss-badge">Estimation : vous perdez ${esc(r.estimatedLoss.phrase)}</div>
  </div>`
}

function slideProblems(r: AuditReport): string {
  const bg = loadBg('G')
  return `
  <div class="slide" style="background-image:url('${bg}');">
    <div class="section-label">SECTION 03 / CE QUE ÇA VOUS COÛTE</div>
    <div class="slide-title">Les problèmes qui vous font <b>perdre des clients</b></div>
    <div style="flex:1;">
      ${r.topProblems.slice(0, 5).map(p => `
        <div class="problem-card">
          <div class="problem-dot" style="background:${p.severity === 'critical' ? '#f87171' : '#f59e0b'}"></div>
          <div>
            <div class="problem-title">${esc(p.title)}</div>
            <div class="problem-impact">${esc(p.impact)}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div style="font-size:11px; color:#3f3f46; font-style:italic;">
      Sources : Google Web Vitals 2024, OWASP, BrightLocal 2024, LCEN
    </div>
  </div>`
}

function slideGoogleVisibility(r: AuditReport): string {
  const bg = loadBg('G')
  const gv = r.googleVisibility!

  const posColor = gv.organicPosition
    ? (gv.organicPosition <= 3 ? '#22c55e' : gv.organicPosition <= 10 ? '#fbbf24' : '#f87171')
    : '#f87171'
  const posText = gv.organicPosition
    ? `Position ${gv.organicPosition}`
    : 'Non trouvé dans les 30 premiers résultats'

  return `
  <div class="slide" style="background-image:url('${bg}');">
    <div class="section-label">SECTION 04 / VISIBILITÉ GOOGLE</div>
    <div class="slide-title">Êtes-vous visible quand vos clients <b>vous cherchent ?</b></div>
    <div class="card" style="max-width:900px; margin-bottom:30px;">
      <div style="font-size:16px; color:#638BFF; font-weight:600; margin-bottom:20px;">Recherche : "${esc(gv.keyword)}"</div>
      <div style="font-size:36px; font-weight:700; color:${posColor}; margin-bottom:16px;">${esc(posText)}</div>
      <div style="font-size:15px; color:${gv.isInLocalPack ? '#22c55e' : '#f87171'};">
        ${gv.isInLocalPack
          ? `✓ Présent dans Google Maps${gv.localPackRating ? ` — ${gv.localPackRating}★ (${gv.localPackReviewCount || 0} avis)` : ''}`
          : '✗ Absent de Google Maps (local pack)'}
      </div>
    </div>
    ${gv.competitorSites.length > 0 ? `
    <div style="margin-top:20px;">
      <div style="font-size:13px; color:#71717a; font-weight:600; margin-bottom:12px;">Vos concurrents qui apparaissent :</div>
      ${gv.competitorSites.slice(0, 3).map(s => {
        let domain = s; try { domain = new URL(s).hostname } catch {}
        return `<div style="font-size:13px; color:#a1a1aa; margin-bottom:6px;">→ ${esc(domain)}</div>`
      }).join('')}
    </div>` : ''}
  </div>`
}

function slideChecklist(r: AuditReport): string {
  const bg = loadBg('G')
  const categoryOrder = ['speed', 'mobile', 'visibility', 'trust', 'conversion'] as const

  let rows = ''
  for (const cat of categoryOrder) {
    rows += `<tr class="cat-header"><td colspan="3">${CATEGORY_LABELS[cat]}</td></tr>`
    const catCriteria = r.criteria.filter(c => c.category === cat)
    for (const crit of catCriteria) {
      rows += `
      <tr class="row">
        <td>${esc(crit.label)}</td>
        <td>${esc(crit.value.slice(0, 45))}</td>
        <td>${severityIcon(crit.severity)}</td>
      </tr>`
    }
  }

  return `
  <div class="slide" style="background-image:url('${bg}'); padding-bottom:40px;">
    <div class="section-label">SECTION 05 / AUDIT COMPLET</div>
    <div style="font-size:32px; font-weight:300; margin-bottom:24px;">Grille d'évaluation détaillée</div>
    <div style="flex:1; overflow:hidden;">
      <table class="check-table">
        <thead><tr><th style="width:50%">Critère</th><th style="width:35%">Résultat</th><th style="width:15%">État</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`
}

function slideBeforeAfter(r: AuditReport): string {
  const bg = loadBg('G2')
  const mobileUrl = r.screenshots?.mobileFold || ''

  return `
  <div class="slide" style="background-image:url('${bg}');">
    <div class="section-label">SECTION 06 / TRANSFORMATION</div>
    <div class="slide-title">Votre site <b style="color:#f87171">avant</b> et <b style="color:#22c55e">après.</b></div>
    <div style="display:flex; gap:80px; flex:1; align-items:flex-start;">
      <div style="flex:1;">
        <div style="font-size:12px; color:#f87171; letter-spacing:4px; font-weight:700; margin-bottom:10px;">AVANT</div>
        <div style="font-size:22px; color:#f87171; margin-bottom:20px;">Score : ${r.scores.global}/100</div>
        ${mobileUrl ? `<img src="${esc(mobileUrl)}" style="width:260px; height:400px; border-radius:12px; border:1px solid rgba(255,255,255,0.1); object-fit:cover; object-position:top;" alt="Avant">` : ''}
      </div>
      <div style="flex:1;">
        <div style="font-size:12px; color:#22c55e; letter-spacing:4px; font-weight:700; margin-bottom:10px;">APRÈS</div>
        <div style="font-size:22px; color:#22c55e; margin-bottom:20px;">Score projeté : 90+/100</div>
        <div style="width:260px; height:400px; border-radius:12px; border:2px dashed #638BFF; display:flex; align-items:center; justify-content:center; background:rgba(99,139,255,0.05);">
          <div style="text-align:center; color:#638BFF; font-size:14px;">
            <div style="font-size:32px; margin-bottom:10px;">↗</div>
            Votre nouveau site<br><span style="font-size:12px; color:#71717a;">(voir slide suivante)</span>
          </div>
        </div>
      </div>
    </div>
  </div>`
}

function slideDemoLink(r: AuditReport): string {
  const bg = loadBg('G2')
  return `
  <div class="slide" style="background-image:url('${bg}'); align-items:center; justify-content:center; text-align:center;">
    <div class="section-label">VOTRE NOUVEAU SITE</div>
    <div style="font-size:52px; font-weight:300; margin-bottom:20px;">Découvrez votre <b>nouveau site.</b></div>
    <div style="font-size:16px; color:#71717a; max-width:700px; line-height:1.6; margin-bottom:50px;">
      Nous avons créé une maquette fonctionnelle de votre futur site.<br>
      Scannez le QR code ou tapez l'adresse pour le voir en vrai.
    </div>
    <div class="card" style="width:220px; height:220px; background:white; display:flex; align-items:center; justify-content:center; border-radius:20px; margin-bottom:30px;">
      <div style="color:#333; font-size:14px; text-align:center;">QR CODE<br><span style="font-size:11px; color:#999;">(à ajouter)</span></div>
    </div>
    <div style="font-size:15px; color:#638BFF;">[lien du site démo à ajouter]</div>
  </div>`
}

function slideRecommendations(r: AuditReport): string {
  const bg = loadBg('G2')
  return `
  <div class="slide" style="background-image:url('${bg}');">
    <div class="section-label">SECTION 08 / RECOMMANDATIONS</div>
    <div class="slide-title">Nos recommandations par <b>priorité</b></div>
    <div style="flex:1;">
      ${r.recommendations.slice(0, 6).map((rec, i) => {
        const numColor = rec.difficulty === 'Important' ? '#f87171' : rec.difficulty === 'Moyen' ? '#f59e0b' : '#22c55e'
        const badgeColor = rec.timeline === 'Immédiat' ? 'rgba(248,113,113,0.1)' : 'rgba(99,139,255,0.1)'
        const badgeText = rec.timeline === 'Immédiat' ? '#f87171' : '#638BFF'
        return `
        <div class="reco-item">
          <div class="reco-num" style="color:${numColor}">${i + 1}</div>
          <div class="reco-content">
            <div class="reco-action">${esc(rec.action)}</div>
            <div class="reco-impact">${esc(rec.impact)}</div>
          </div>
          <div class="reco-badge" style="background:${badgeColor}; color:${badgeText};">${esc(rec.timeline)}</div>
        </div>`
      }).join('')}
    </div>
  </div>`
}

function slideClaudeAnalysis(r: AuditReport): string {
  if (!r.claudeAnalysis) return ''
  const bg = loadBg('G')

  let text = r.claudeAnalysis.trim()
    .replace(/^#{1,6}\s+(.+)$/gm, '<div style="font-size:16px; font-weight:700; color:#e4e4e7; margin:16px 0 8px;">$1</div>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e4e4e7;">$1</strong>')
    .replace(/^---+$/gm, '<div style="height:1px; background:#27272a; margin:16px 0;"></div>')
    .replace(/^>\s?(.+)$/gm, '<div style="border-left:3px solid #638BFF; padding-left:16px; margin:8px 0; color:#a1a1aa; font-style:italic;">$1</div>')
    .replace(/\n/g, '<br>')

  if (text.length > 2000) text = text.slice(0, 2000) + '...'

  return `
  <div class="slide" style="background-image:url('${bg}');">
    <div class="section-label">ANALYSE VISUELLE / EXPÉRIENCE UTILISATEUR</div>
    <div class="slide-title">Ce que voit réellement <b>votre client.</b></div>
    <div style="flex:1; overflow:hidden; font-size:13px; color:#a1a1aa; line-height:1.7;">
      ${text}
    </div>
    <div style="font-size:10px; color:#3f3f46; font-style:italic; margin-top:12px;">
      Analyse réalisée par intelligence artificielle sur captures d'écran du site.
    </div>
  </div>`
}

function slideCTA(r: AuditReport): string {
  const bg = loadBg('G3')
  return `
  <div class="slide" style="background-image:url('${bg}');">
    <div class="section-label">PASSONS À L'ACTION</div>
    <div class="slide-title" style="max-width:1000px;">Chaque semaine sans refonte, c'est <b style="color:#f87171">${esc(r.estimatedLoss.phrase)}</b> en moins.</div>
    <div class="step-row">
      ${[
        { num: '01', title: 'Découverte', desc: 'Réunion de lancement, objectifs, contenus, direction artistique' },
        { num: '02', title: 'Maquette', desc: 'Design soumis à votre validation avant tout développement' },
        { num: '03', title: 'Développement', desc: 'Intégration mobile-first, SEO, tests multi-appareils' },
        { num: '04', title: 'Livraison', desc: 'Mise en ligne, formation, 1 mois de support inclus' },
      ].map(s => `
        <div class="step">
          <div class="step-num">${s.num}</div>
          <div class="step-title">${s.title}</div>
          <div class="step-desc">${s.desc}</div>
        </div>
      `).join('')}
    </div>
    <div style="text-align:center; margin-top:auto; padding-top:40px; border-top:1px solid #27272a;">
      <div style="font-size:22px; font-weight:600; margin-bottom:10px;">JL Studio — Agence web premium</div>
      <div style="font-size:15px; color:#638BFF; margin-bottom:8px;">contact@jlstudio.dev  ·  jlstudio.dev  ·  Bordeaux</div>
      <div style="font-size:14px; color:#71717a; font-style:italic; margin-top:16px;">
        Prochaine étape : un appel de 30 minutes pour définir votre projet.
      </div>
    </div>
  </div>`
}

// ============================================================================
// MAIN — Build full HTML
// ============================================================================

export function buildHtmlSlides(report: AuditReport): string {
  const slides: string[] = []

  slides.push(slideCover(report))
  slides.push(slideFirstImpression(report))
  slides.push(slideVerdict(report))
  slides.push(slideProblems(report))
  if (report.googleVisibility && report.googleVisibility.keyword) {
    slides.push(slideGoogleVisibility(report))
  }
  slides.push(slideChecklist(report))
  slides.push(slideBeforeAfter(report))
  slides.push(slideDemoLink(report))
  slides.push(slideRecommendations(report))
  const claudeSlide = slideClaudeAnalysis(report)
  if (claudeSlide) slides.push(claudeSlide)
  slides.push(slideCTA(report))

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1920">
<title>Audit Web — ${esc(report.prospect.name)}</title>
<style>${CSS}</style>
</head>
<body style="background:#000;">
${slides.join('\n')}
</body>
</html>`
}
