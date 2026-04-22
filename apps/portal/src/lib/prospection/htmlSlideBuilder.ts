// ============================================================================
// HTML SLIDE BUILDER v3 — Corporate Style C (Gris Clair Élégant)
// 8 slides, narrative sales structure, Unsplash images, financial data
// ============================================================================

import type { AuditReport } from './auditJson'
import type { Severity } from './auditCriteria'
import { CATEGORY_LABELS } from './auditCriteria'

// ── Helpers ──

function esc(str: string | null | undefined): string {
  if (!str) return ''
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function scoreColor(score: number | null): string {
  if (score === null) return '#9ca3af'
  if (score >= 90) return '#16a34a'
  if (score >= 50) return '#d97706'
  return '#dc2626'
}

function severityDot(s: Severity): string {
  const colors: Record<Severity, string> = { ok: '#16a34a', acceptable: '#d97706', warning: '#f59e0b', critical: '#dc2626' }
  return `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${colors[s]};margin-right:10px;flex-shrink:0;margin-top:7px;"></span>`
}

function severityIcon(s: Severity): string {
  if (s === 'ok') return '<span style="color:#16a34a;font-weight:700;">✓</span>'
  if (s === 'acceptable') return '<span style="color:#d97706;font-weight:700;">~</span>'
  if (s === 'warning') return '<span style="color:#f59e0b;font-weight:700;">!</span>'
  return '<span style="color:#dc2626;font-weight:700;">✗</span>'
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
  font-family: 'Inter', -apple-system, sans-serif;
  color: #171717;
  page-break-after: always;
  background: #fafafa;
  padding: 80px 100px;
  display: flex;
  flex-direction: column;
}

.slide-white { background: #ffffff; }
.slide-dark {
  background: #111827;
  color: #f1f5f9;
}

.section-label {
  font-size: 12px;
  color: #a3a3a3;
  letter-spacing: 3px;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.slide-dark .section-label { color: #64748b; }

.slide-title {
  font-size: 44px;
  font-weight: 300;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: #171717;
  margin-bottom: 40px;
}
.slide-title b { font-weight: 700; }
.slide-dark .slide-title { color: #f1f5f9; }
.slide-dark .slide-title b { color: #fff; }

.footer-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;
  font-size: 11px;
  color: #a3a3a3;
  border-top: 1px solid #e5e5e5;
  background: inherit;
}
.slide-dark .footer-bar { border-top-color: #1e293b; color: #475569; }

.accent-line {
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #1a56db, #7c3aed);
  border-radius: 2px;
  margin-bottom: 24px;
}

/* Cards */
.card {
  background: #ffffff;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.slide-dark .card {
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.08);
  box-shadow: none;
}

/* Gauges */
.gauge-row {
  display: flex;
  gap: 20px;
}
.gauge-card {
  flex: 1;
  background: #fff;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.gauge-card .value {
  font-size: 44px;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 8px;
}
.gauge-card .bar {
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  margin: 12px 0;
  overflow: hidden;
}
.gauge-card .bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s;
}
.gauge-card .label {
  font-size: 11px;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Problems */
.problem-item {
  display: flex;
  gap: 16px;
  padding: 24px 0;
  border-bottom: 1px solid #f3f4f6;
  align-items: flex-start;
}
.problem-item:last-child { border-bottom: none; }
.problem-num {
  font-size: 28px;
  font-weight: 800;
  min-width: 40px;
}
.problem-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 6px;
}
.problem-impact {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}

/* Steps */
.step-row {
  display: flex;
  gap: 24px;
}
.step-card {
  flex: 1;
  background: #fff;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.step-num {
  font-size: 32px;
  font-weight: 200;
  color: #1a56db;
  margin-bottom: 12px;
}
.step-title {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #111827;
  margin-bottom: 8px;
}
.step-desc {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
}

/* Result items */
.result-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  margin-bottom: 20px;
}
.result-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  background: #eff6ff;
  color: #1a56db;
}
.result-title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2px;
}
.result-desc {
  font-size: 13px;
  color: #6b7280;
}

/* Check table */
.check-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.check-table th {
  text-align: left;
  padding: 8px 16px;
  font-size: 10px;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  border-bottom: 2px solid #e5e7eb;
}
.check-table .cat-header td {
  padding: 12px 16px 4px;
  font-size: 10px;
  font-weight: 700;
  color: #1a56db;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.check-table .row td {
  padding: 7px 16px;
  border-bottom: 1px solid #f5f5f5;
  color: #374151;
}
.check-table .row:nth-child(even) td { background: #fafafa; }
.check-table .row td:nth-child(2) { color: #9ca3af; text-align: center; }
.check-table .row td:last-child { text-align: center; font-size: 16px; }

/* Image with overlay */
.img-block {
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}
.img-block img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`

// ============================================================================
// SLIDES
// ============================================================================

function slide1Cover(r: AuditReport): string {
  const date = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  return `
  <div class="slide slide-dark" style="justify-content:center; padding:100px 120px;">
    <div style="position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#1a56db,#7c3aed);"></div>
    <div style="font-size:13px;color:#64748b;letter-spacing:6px;font-weight:600;text-transform:uppercase;margin-bottom:24px;">AUDIT WEB</div>
    <div style="font-size:72px;font-weight:300;letter-spacing:-0.04em;line-height:1.05;max-width:1400px;margin-bottom:40px;color:#f1f5f9;">
      ${esc(r.prospect.name)}
    </div>
    <div style="width:60px;height:2px;background:linear-gradient(90deg,#1a56db,#7c3aed);margin-bottom:30px;border-radius:1px;"></div>
    <div style="font-size:16px;color:#64748b;line-height:1.8;">
      ${r.prospect.city ? esc(r.prospect.city) : ''}${r.prospect.sector ? ` · ${esc(r.prospect.sector)}` : ''}<br>
      ${date}
    </div>
    <div style="position:absolute;bottom:50px;left:120px;font-size:14px;color:#475569;">
      JL Studio — Agence web premium · jlstudio.dev
    </div>
  </div>`
}

function slide2SiteActuel(r: AuditReport): string {
  const mobileUrl = r.screenshots?.mobileFold || ''
  const year = r.designScore !== null && r.designScore < 40 ? '2016-2018' : r.designScore !== null && r.designScore < 60 ? '2019-2020' : '2021-2022'

  return `
  <div class="slide" style="padding:80px 100px;">
    <div class="section-label">01 · Votre site aujourd'hui</div>
    <div class="slide-title">Voici ce que voit votre client<br>sur <b>son téléphone.</b></div>
    <div style="display:flex;gap:60px;flex:1;align-items:flex-start;">
      <div style="flex-shrink:0;">
        <div style="width:320px;height:580px;border-radius:24px;border:8px solid #e5e7eb;overflow:hidden;background:#fff;box-shadow:0 8px 30px rgba(0,0,0,0.08);">
          ${mobileUrl ? `<img src="${esc(mobileUrl)}" style="width:100%;height:100%;object-fit:cover;object-position:top;" alt="Mobile">` : '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#9ca3af;font-size:14px;">Capture non disponible</div>'}
        </div>
      </div>
      <div style="flex:1;padding-top:40px;">
        <div style="font-size:20px;font-weight:700;color:#111827;margin-bottom:16px;">Première impression</div>
        <div class="accent-line"></div>
        <div style="font-size:16px;color:#6b7280;line-height:1.8;margin-bottom:30px;">
          70% de vos clients potentiels arrivent sur votre site depuis leur téléphone. Voici ce qu'ils voient.
        </div>
        <div class="card" style="margin-bottom:20px;">
          <div style="font-size:14px;font-weight:600;color:#dc2626;margin-bottom:8px;">Ce design date de ${year}</div>
          <div style="font-size:13px;color:#6b7280;line-height:1.6;">
            Les standards web ont radicalement changé. Un site qui avait l'air correct il y a quelques années donne aujourd'hui une impression d'amateurisme à vos visiteurs.
          </div>
        </div>
        <div style="display:flex;gap:16px;">
          <img src="${esc(r.sectorImages.phone)}" style="width:200px;height:130px;object-fit:cover;border-radius:10px;opacity:0.9;" alt="">
        </div>
      </div>
    </div>
    <div class="footer-bar"><span>JL Studio · jlstudio.dev</span><span>${esc(r.prospect.name)} · Audit Web</span></div>
  </div>`
}

function slide3Diagnostic(r: AuditReport): string {
  const categories = [
    { key: 'speed' as const, label: 'Rapidité' },
    { key: 'mobile' as const, label: 'Mobile' },
    { key: 'visibility' as const, label: 'Visibilité' },
    { key: 'trust' as const, label: 'Confiance' },
    { key: 'conversion' as const, label: 'Conversion' },
  ]

  return `
  <div class="slide" style="padding:80px 100px;">
    <div class="section-label">02 · Le diagnostic</div>
    <div class="slide-title">Votre site obtient un score de <b style="color:${scoreColor(r.scores.global)}">${r.scores.global}/100</b></div>
    <div class="gauge-row" style="margin-bottom:40px;">
      ${categories.map(c => {
        const score = r.scores[c.key]
        const color = scoreColor(score)
        return `
        <div class="gauge-card">
          <div class="value" style="color:${color};">${score}</div>
          <div class="bar"><div class="bar-fill" style="width:${score}%;background:${color};"></div></div>
          <div class="label">${c.label}</div>
        </div>`
      }).join('')}
    </div>
    <div style="display:flex;gap:24px;">
      <div class="card" style="flex:1;border-left:3px solid #dc2626;">
        <div style="font-size:13px;color:#9ca3af;margin-bottom:4px;">Estimation de perte mensuelle</div>
        <div style="font-size:28px;font-weight:800;color:#dc2626;">${esc(r.estimatedLoss.monthlyLoss)}</div>
        <div style="font-size:12px;color:#9ca3af;margin-top:4px;">${esc(r.estimatedLoss.phrase)}</div>
      </div>
      <div class="card" style="flex:1;border-left:3px solid #dc2626;">
        <div style="font-size:13px;color:#9ca3af;margin-bottom:4px;">Perte annuelle estimée</div>
        <div style="font-size:28px;font-weight:800;color:#dc2626;">${esc(r.estimatedLoss.annualLoss)}</div>
        <div style="font-size:12px;color:#9ca3af;margin-top:4px;">Basé sur un ticket moyen de ${r.estimatedLoss.avgTicket}€</div>
      </div>
    </div>
    <div class="footer-bar"><span>JL Studio · jlstudio.dev</span><span>${esc(r.prospect.name)} · Audit Web</span></div>
  </div>`
}

function slide4Problemes(r: AuditReport): string {
  const problems = r.topProblems.slice(0, 3)
  const numColors = ['#dc2626', '#f59e0b', '#f59e0b']

  return `
  <div class="slide" style="padding:80px 100px;">
    <div class="section-label">03 · Ce que ça vous coûte concrètement</div>
    <div class="slide-title">Les problèmes qui vous font<br><b>perdre des clients</b></div>
    <div style="flex:1;">
      ${problems.map((p, i) => `
        <div class="problem-item">
          <div class="problem-num" style="color:${numColors[i] || '#f59e0b'};">${i + 1}</div>
          <div style="flex:1;">
            <div class="problem-title">${esc(p.title)}</div>
            <div class="problem-impact">${esc(p.impact)}</div>
          </div>
          <div style="font-size:10px;color:#9ca3af;min-width:120px;text-align:right;padding-top:4px;">
            Source : ${esc(p.source.split(',')[0])}
          </div>
        </div>
      `).join('')}
    </div>
    <div class="footer-bar"><span>JL Studio · jlstudio.dev</span><span>${esc(r.prospect.name)} · Audit Web</span></div>
  </div>`
}

function slide5Concurrents(r: AuditReport): string {
  const gv = r.googleVisibility
  const keyword = gv?.keyword || `${r.prospect.sector || 'votre activité'} ${r.prospect.city || ''}`
  const competitors = gv?.competitorSites || []

  return `
  <div class="slide" style="padding:80px 100px;">
    <div class="section-label">04 · Et pendant ce temps, vos concurrents...</div>
    <div class="slide-title">Quand on cherche <b>"${esc(keyword)}"</b></div>
    <div style="display:flex;gap:60px;flex:1;">
      <div style="flex:1;">
        ${gv && gv.organicPosition ? `
          <div class="card" style="margin-bottom:16px;border-left:3px solid #f59e0b;">
            <div style="font-size:14px;color:#6b7280;margin-bottom:4px;">Votre position</div>
            <div style="font-size:32px;font-weight:800;color:#f59e0b;">Position ${gv.organicPosition}</div>
          </div>
        ` : `
          <div class="card" style="margin-bottom:16px;border-left:3px solid #dc2626;">
            <div style="font-size:14px;color:#6b7280;margin-bottom:4px;">Votre position</div>
            <div style="font-size:24px;font-weight:700;color:#dc2626;">Introuvable dans les 30 premiers résultats</div>
          </div>
        `}

        ${competitors.length > 0 ? `
          <div style="margin-top:24px;">
            <div style="font-size:14px;font-weight:600;color:#111827;margin-bottom:16px;">Ceux qui apparaissent à votre place :</div>
            ${competitors.slice(0, 3).map((s, i) => {
              let domain = s; try { domain = new URL(s).hostname } catch {}
              return `
              <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #f3f4f6;">
                <div style="width:28px;height:28px;border-radius:6px;background:#eff6ff;color:#1a56db;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;">${i + 1}</div>
                <div style="font-size:14px;color:#374151;">${esc(domain)}</div>
              </div>`
            }).join('')}
          </div>
        ` : `
          <div style="margin-top:24px;font-size:14px;color:#6b7280;">
            Lancez l'audit depuis une recherche métier + ville pour voir vos concurrents.
          </div>
        `}

        <div style="margin-top:30px;padding:16px 20px;background:#fef2f2;border-radius:10px;border:1px solid #fecaca;">
          <div style="font-size:14px;color:#991b1b;font-weight:600;">Chaque jour, des clients potentiels cherchent vos services et tombent sur vos concurrents. Pas sur vous.</div>
        </div>
      </div>

      <div class="img-block" style="width:380px;height:500px;flex-shrink:0;">
        <img src="${esc(r.sectorImages.modernBusiness)}" alt="Salon moderne" style="width:100%;height:100%;object-fit:cover;">
        <div style="position:absolute;bottom:0;left:0;right:0;padding:20px;background:linear-gradient(transparent,rgba(0,0,0,0.7));color:white;">
          <div style="font-size:13px;font-weight:600;">Ce que vos concurrents proposent en ligne en 2026</div>
        </div>
      </div>
    </div>
    <div class="footer-bar"><span>JL Studio · jlstudio.dev</span><span>${esc(r.prospect.name)} · Audit Web</span></div>
  </div>`
}

function slide6NouveauSite(r: AuditReport): string {
  return `
  <div class="slide slide-dark" style="padding:80px 100px;align-items:center;justify-content:center;text-align:center;">
    <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#1a56db,#7c3aed);"></div>
    <div class="section-label" style="color:#64748b;">05 · Votre nouveau site</div>
    <div style="font-size:52px;font-weight:300;margin-bottom:20px;color:#f1f5f9;">
      On a préparé quelque chose<br><b style="font-weight:700;">pour vous.</b>
    </div>
    <div style="font-size:16px;color:#94a3b8;max-width:700px;line-height:1.7;margin-bottom:50px;">
      Scannez le QR code avec votre téléphone pour découvrir votre futur site — il est déjà en ligne, fonctionnel, avec vos contenus.
    </div>
    <div style="display:flex;gap:60px;align-items:center;justify-content:center;">
      <div style="width:200px;height:200px;background:#fff;border-radius:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 30px rgba(0,0,0,0.3);">
        <div style="color:#6b7280;font-size:14px;text-align:center;">QR CODE<br><span style="font-size:11px;color:#9ca3af;">(à ajouter)</span></div>
      </div>
      <div style="text-align:left;">
        <div style="font-size:36px;font-weight:800;color:#22c55e;margin-bottom:8px;">90+<span style="font-size:18px;font-weight:400;color:#64748b;">/100</span></div>
        <div style="font-size:14px;color:#64748b;">Score projeté après refonte</div>
        <div style="margin-top:16px;font-size:14px;color:#3b82f6;">[URL du site démo]</div>
      </div>
    </div>
    <div class="footer-bar" style="border-top-color:#1e293b;color:#475569;"><span>JL Studio · jlstudio.dev</span><span>${esc(r.prospect.name)} · Audit Web</span></div>
  </div>`
}

function slide7Solution(r: AuditReport): string {
  return `
  <div class="slide" style="padding:80px 100px;">
    <div class="section-label">06 · La solution complète</div>
    <div class="slide-title">Pas juste un site.<br><b>Tout ce qu'il vous faut pour gagner des clients.</b></div>
    <div style="display:flex;gap:40px;flex:1;">
      <div style="flex:1;">
        <div class="result-item">
          <div class="result-icon">📈</div>
          <div><div class="result-title">Plus de clients</div><div class="result-desc">Réservation en ligne 24h/24, SEO optimisé pour "${esc(r.prospect.sector || 'votre activité')} ${esc(r.prospect.city || '')}", fiche Google My Business optimisée</div></div>
        </div>
        <div class="result-item">
          <div class="result-icon">🔔</div>
          <div><div class="result-title">Zéro rendez-vous oubliés</div><div class="result-desc">Rappels SMS et email automatiques J-1 pour chaque rendez-vous — fini les no-shows</div></div>
        </div>
        <div class="result-item">
          <div class="result-icon" style="background:#fef3c7;color:#d97706;">⭐</div>
          <div><div class="result-title">Plus d'avis 5 étoiles</div><div class="result-desc">Après chaque visite, un SMS automatique invite votre client à laisser un avis Google — sans que vous ayez à y penser</div></div>
        </div>
        <div class="result-item">
          <div class="result-icon" style="background:#f0fdf4;color:#16a34a;">⏱</div>
          <div><div class="result-title">Votre temps libéré</div><div class="result-desc">CRM intégré : tous vos clients, leur historique, leurs préférences. Fini les post-its et le cahier de rendez-vous</div></div>
        </div>
        <div class="result-item">
          <div class="result-icon" style="background:#faf5ff;color:#7c3aed;">🎛</div>
          <div><div class="result-title">100% sous votre contrôle</div><div class="result-desc">Vous modifiez vos photos, vos tarifs, vos horaires vous-même — aucune dépendance technique</div></div>
        </div>
      </div>
      <div class="img-block" style="width:360px;flex-shrink:0;border-radius:12px;overflow:hidden;">
        <img src="${esc(r.sectorImages.happyClient)}" alt="" style="width:100%;height:100%;object-fit:cover;">
      </div>
    </div>
    <div class="footer-bar"><span>JL Studio · jlstudio.dev</span><span>${esc(r.prospect.name)} · Audit Web</span></div>
  </div>`
}

function slide8CTA(r: AuditReport): string {
  return `
  <div class="slide" style="padding:80px 100px;">
    <div class="section-label">07 · Prochaine étape</div>
    <div class="slide-title">Votre site démo est <b>déjà prêt.</b><br>On peut démarrer <b>dès la semaine prochaine.</b></div>
    <div class="step-row" style="margin-bottom:40px;">
      ${[
        { num: '01', title: 'Découverte', desc: 'Réunion de lancement : vos objectifs, vos contenus, votre vision.' },
        { num: '02', title: 'Maquette', desc: 'Design soumis à votre validation avant tout développement.' },
        { num: '03', title: 'Développement', desc: 'Intégration mobile-first, CRM, réservation, SEO.' },
        { num: '04', title: 'Livraison', desc: 'Mise en ligne + formation + 1 mois de support inclus.' },
      ].map(s => `
        <div class="step-card">
          <div class="step-num">${s.num}</div>
          <div class="step-title">${s.title}</div>
          <div class="step-desc">${s.desc}</div>
        </div>
      `).join('')}
    </div>
    <div style="display:flex;gap:40px;align-items:center;padding:30px 40px;background:#111827;border-radius:16px;color:white;">
      <div style="flex:1;">
        <div style="font-size:22px;font-weight:700;margin-bottom:6px;">JL Studio — Agence web premium</div>
        <div style="font-size:15px;color:#94a3b8;">contact@jlstudio.dev · jlstudio.dev · Bordeaux</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:14px;color:#94a3b8;margin-bottom:4px;">Délai estimé</div>
        <div style="font-size:24px;font-weight:700;">4-6 semaines</div>
      </div>
    </div>
    <div style="text-align:center;margin-top:20px;font-size:14px;color:#dc2626;font-weight:500;font-style:italic;">
      Chaque semaine sans refonte, c'est ${esc(r.estimatedLoss.monthlyLoss)} de chiffre d'affaires en moins.
    </div>
    <div class="footer-bar"><span>JL Studio · jlstudio.dev</span><span>${esc(r.prospect.name)} · Audit Web</span></div>
  </div>`
}

// Optional: Claude visual analysis (only if present)
function slideClaudeAnalysis(r: AuditReport): string {
  if (!r.claudeAnalysis) return ''

  let text = r.claudeAnalysis.trim()
    .replace(/^#{1,6}\s+(.+)$/gm, '<div style="font-size:16px;font-weight:700;color:#111827;margin:16px 0 8px;">$1</div>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^---+$/gm, '<div style="height:1px;background:#e5e7eb;margin:16px 0;"></div>')
    .replace(/^>\s?(.+)$/gm, '<div style="border-left:3px solid #1a56db;padding-left:16px;margin:8px 0;color:#6b7280;font-style:italic;">$1</div>')
    .replace(/\n/g, '<br>')

  if (text.length > 2000) text = text.slice(0, 2000) + '...'

  return `
  <div class="slide" style="padding:80px 100px;">
    <div class="section-label">Analyse visuelle · Expérience utilisateur</div>
    <div class="slide-title">Ce que voit réellement <b>votre client.</b></div>
    <div style="flex:1;overflow:hidden;font-size:13px;color:#6b7280;line-height:1.7;column-count:2;column-gap:40px;">
      ${text}
    </div>
    <div class="footer-bar"><span>JL Studio · jlstudio.dev</span><span>${esc(r.prospect.name)} · Audit Web</span></div>
  </div>`
}

// Optional: Full checklist (appendix)
function slideChecklist(r: AuditReport): string {
  const categoryOrder = ['speed', 'mobile', 'visibility', 'trust', 'conversion'] as const
  let rows = ''

  for (const cat of categoryOrder) {
    rows += `<tr class="cat-header"><td colspan="3">${CATEGORY_LABELS[cat]}</td></tr>`
    for (const crit of r.criteria.filter(c => c.category === cat)) {
      rows += `<tr class="row"><td>${esc(crit.label)}</td><td>${esc(crit.value.slice(0, 40))}</td><td>${severityIcon(crit.severity)}</td></tr>`
    }
  }

  return `
  <div class="slide" style="padding:60px 100px;">
    <div class="section-label">Annexe · Audit technique complet</div>
    <div style="font-size:28px;font-weight:300;margin-bottom:20px;">Grille d'évaluation détaillée — <b>${r.criteria.length} critères</b></div>
    <div style="flex:1;overflow:hidden;">
      <table class="check-table">
        <thead><tr><th style="width:50%">Critère</th><th style="width:35%">Résultat</th><th style="width:15%">État</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="footer-bar"><span>JL Studio · jlstudio.dev</span><span>${esc(r.prospect.name)} · Audit Web</span></div>
  </div>`
}

// ============================================================================
// MAIN
// ============================================================================

export function buildHtmlSlides(report: AuditReport): string {
  const slides: string[] = []

  slides.push(slide1Cover(report))
  slides.push(slide2SiteActuel(report))
  slides.push(slide3Diagnostic(report))
  slides.push(slide4Problemes(report))
  slides.push(slide5Concurrents(report))
  slides.push(slide6NouveauSite(report))
  slides.push(slide7Solution(report))
  slides.push(slide8CTA(report))

  // Optional slides
  const claude = slideClaudeAnalysis(report)
  if (claude) slides.splice(7, 0, claude) // insert before CTA

  // Annexe: full checklist always included at the end
  slides.push(slideChecklist(report))

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1920">
<title>Audit Web — ${esc(report.prospect.name)}</title>
<style>${CSS}</style>
</head>
<body style="background:#e5e5e5;">
${slides.join('\n')}
</body>
</html>`
}
