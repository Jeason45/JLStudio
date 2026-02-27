'use client';

import { useState, FormEvent } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  projectType: string;
  pages: string;
  features: string[];
  budget: string;
  deadline: string;
  message: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface ApiResponse {
  success: boolean;
  contact?: {
    id: string;
    score: number;
  };
  error?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECT_TYPES = [
  { value: 'vitrine', label: 'Site Vitrine', icon: '🌐', desc: 'Présentez votre activité' },
  { value: 'ecommerce', label: 'E-Commerce', icon: '🛒', desc: 'Vendez en ligne' },
  { value: 'webapp', label: 'Application Web', icon: '⚙️', desc: 'Outil sur mesure' },
  { value: 'landing', label: 'Landing Page', icon: '🚀', desc: 'Page de conversion' },
  { value: 'refonte', label: 'Refonte', icon: '🔄', desc: 'Modernisez votre site' },
  { value: 'autre', label: 'Autre', icon: '💡', desc: 'Projet spécifique' },
];

const PAGE_RANGES = [
  { value: '1-5', label: '1 - 5 pages' },
  { value: '5-10', label: '5 - 10 pages' },
  { value: '10-20', label: '10 - 20 pages' },
  { value: '20+', label: '20+ pages' },
];

const FEATURES = [
  { value: 'responsive', label: 'Design Responsive', icon: '📱' },
  { value: 'seo', label: 'SEO', icon: '🔍' },
  { value: 'cms', label: 'CMS / Back-office', icon: '🖥️' },
  { value: 'blog', label: 'Blog', icon: '📝' },
  { value: 'booking', label: 'Réservation', icon: '📅' },
  { value: 'payment', label: 'Paiement en ligne', icon: '💳' },
  { value: 'multilang', label: 'Multilingue', icon: '🌍' },
  { value: 'analytics', label: 'Analytics', icon: '📊' },
];

const BUDGETS = [
  { value: '<2000', label: 'Moins de 2 000 €' },
  { value: '2000-5000', label: '2 000 - 5 000 €' },
  { value: '5000-10000', label: '5 000 - 10 000 €' },
  { value: '>10000', label: 'Plus de 10 000 €' },
];

const DEADLINES = [
  { value: 'urgent', label: 'Urgent', desc: 'Moins d\'1 mois' },
  { value: '1-2-mois', label: '1 - 2 mois', desc: 'Délai court' },
  { value: '2-3-mois', label: '2 - 3 mois', desc: 'Délai standard' },
  { value: 'flexible', label: 'Flexible', desc: 'Pas de rush' },
];

const STEP_TITLES = ['Votre projet', 'Fonctionnalités', 'Délai & Détails', 'Vos coordonnées'];

// ─── Component ───────────────────────────────────────────────────────────────

export default function QualifierPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<FormData>({
    projectType: '',
    pages: '',
    features: [],
    budget: '',
    deadline: '',
    message: '',
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const totalSteps = 4;

  // ── Navigation ──

  function goTo(nextStep: number) {
    if (animating) return;
    setDirection(nextStep > step ? 'next' : 'prev');
    setAnimating(true);
    setTimeout(() => {
      setStep(nextStep);
      setAnimating(false);
    }, 250);
  }

  function canAdvance(): boolean {
    if (step === 0) return !!form.projectType;
    if (step === 3) return !!form.name.trim() && !!form.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    return true;
  }

  // ── Handlers ──

  function toggleFeature(value: string) {
    setForm(prev => ({
      ...prev,
      features: prev.features.includes(value)
        ? prev.features.filter(f => f !== value)
        : [...prev.features, value],
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canAdvance() || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const body = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        company: form.company.trim() || undefined,
        message: form.message.trim() || undefined,
        projectType: form.projectType || undefined,
        budget: form.budget || undefined,
        deadline: form.deadline || undefined,
        features: form.features.length > 0 ? form.features : undefined,
        pages: form.pages || undefined,
        source: 'site',
      };

      const res = await fetch('/api/leads/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Une erreur est survenue. Veuillez réessayer.');
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Impossible de contacter le serveur. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  }


  // ── Styles ──

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#0a0e1a',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    } as React.CSSProperties,
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 32px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    } as React.CSSProperties,
    logo: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#fff',
      textDecoration: 'none',
      letterSpacing: '-0.5px',
    } as React.CSSProperties,
    logoAccent: {
      color: '#638BFF',
    } as React.CSSProperties,
    headerRight: {
      fontSize: '13px',
      color: 'rgba(255,255,255,0.4)',
    } as React.CSSProperties,
    container: {
      maxWidth: '720px',
      margin: '0 auto',
      padding: '40px 24px 80px',
    } as React.CSSProperties,
    progressBar: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '48px',
    } as React.CSSProperties,
    progressSegment: (active: boolean, completed: boolean): React.CSSProperties => ({
      flex: 1,
      height: '4px',
      borderRadius: '2px',
      background: completed ? '#638BFF' : active ? 'linear-gradient(90deg, #638BFF, #4a6fdd)' : 'rgba(255,255,255,0.08)',
      transition: 'background 0.4s ease',
    }),
    progressLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px',
    } as React.CSSProperties,
    progressText: {
      fontSize: '13px',
      color: 'rgba(255,255,255,0.4)',
    } as React.CSSProperties,
    stepTitle: {
      fontSize: '28px',
      fontWeight: 700,
      marginBottom: '8px',
      letterSpacing: '-0.5px',
    } as React.CSSProperties,
    stepSubtitle: {
      fontSize: '15px',
      color: 'rgba(255,255,255,0.5)',
      marginBottom: '36px',
    } as React.CSSProperties,
    stepContent: (isAnimating: boolean, dir: 'next' | 'prev'): React.CSSProperties => ({
      opacity: isAnimating ? 0 : 1,
      transform: isAnimating
        ? `translateX(${dir === 'next' ? '30px' : '-30px'})`
        : 'translateX(0)',
      transition: 'opacity 0.25s ease, transform 0.25s ease',
    }),
    grid6: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '12px',
      marginBottom: '32px',
    } as React.CSSProperties,
    grid4: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '12px',
      marginBottom: '32px',
    } as React.CSSProperties,
    card: (selected: boolean): React.CSSProperties => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '20px 16px',
      borderRadius: '12px',
      border: selected ? '2px solid #638BFF' : '2px solid rgba(255,255,255,0.08)',
      background: selected ? 'rgba(99,139,255,0.1)' : 'rgba(255,255,255,0.03)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textAlign: 'center',
    }),
    cardIcon: {
      fontSize: '28px',
      marginBottom: '4px',
    } as React.CSSProperties,
    cardLabel: {
      fontSize: '14px',
      fontWeight: 600,
      color: '#fff',
    } as React.CSSProperties,
    cardDesc: {
      fontSize: '12px',
      color: 'rgba(255,255,255,0.4)',
    } as React.CSSProperties,
    sectionLabel: {
      fontSize: '14px',
      fontWeight: 600,
      color: 'rgba(255,255,255,0.7)',
      marginBottom: '12px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
    } as React.CSSProperties,
    featureChip: (selected: boolean): React.CSSProperties => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 18px',
      borderRadius: '10px',
      border: selected ? '2px solid #638BFF' : '2px solid rgba(255,255,255,0.08)',
      background: selected ? 'rgba(99,139,255,0.1)' : 'rgba(255,255,255,0.03)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '14px',
      fontWeight: 500,
      color: selected ? '#fff' : 'rgba(255,255,255,0.7)',
    }),
    featureGrid: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '10px',
      marginBottom: '36px',
    } as React.CSSProperties,
    radioCard: (selected: boolean): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 20px',
      borderRadius: '12px',
      border: selected ? '2px solid #638BFF' : '2px solid rgba(255,255,255,0.08)',
      background: selected ? 'rgba(99,139,255,0.1)' : 'rgba(255,255,255,0.03)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
    radioDot: (selected: boolean): React.CSSProperties => ({
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      border: selected ? '5px solid #638BFF' : '2px solid rgba(255,255,255,0.2)',
      background: selected ? '#fff' : 'transparent',
      flexShrink: 0,
      transition: 'all 0.2s ease',
    }),
    radioLabel: {
      fontSize: '14px',
      fontWeight: 600,
      color: '#fff',
    } as React.CSSProperties,
    radioDesc: {
      fontSize: '12px',
      color: 'rgba(255,255,255,0.4)',
      marginTop: '2px',
    } as React.CSSProperties,
    textarea: {
      width: '100%',
      minHeight: '120px',
      padding: '16px',
      borderRadius: '12px',
      border: '2px solid rgba(255,255,255,0.08)',
      background: 'rgba(255,255,255,0.03)',
      color: '#fff',
      fontSize: '14px',
      fontFamily: 'inherit',
      resize: 'vertical' as const,
      outline: 'none',
      transition: 'border-color 0.2s ease',
    } as React.CSSProperties,
    input: {
      width: '100%',
      padding: '14px 16px',
      borderRadius: '12px',
      border: '2px solid rgba(255,255,255,0.08)',
      background: 'rgba(255,255,255,0.03)',
      color: '#fff',
      fontSize: '14px',
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'border-color 0.2s ease',
    } as React.CSSProperties,
    inputLabel: {
      display: 'block',
      fontSize: '13px',
      fontWeight: 600,
      color: 'rgba(255,255,255,0.6)',
      marginBottom: '8px',
    } as React.CSSProperties,
    inputGroup: {
      marginBottom: '20px',
    } as React.CSSProperties,
    required: {
      color: '#638BFF',
      marginLeft: '2px',
    } as React.CSSProperties,
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '40px',
      gap: '16px',
    } as React.CSSProperties,
    btnPrev: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      borderRadius: '10px',
      border: '2px solid rgba(255,255,255,0.1)',
      background: 'transparent',
      color: 'rgba(255,255,255,0.7)',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: 'inherit',
    } as React.CSSProperties,
    btnNext: (disabled: boolean): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 32px',
      borderRadius: '10px',
      border: 'none',
      background: disabled
        ? 'rgba(99,139,255,0.3)'
        : 'linear-gradient(135deg, #638BFF, #4a6fdd)',
      color: disabled ? 'rgba(255,255,255,0.4)' : '#fff',
      fontSize: '14px',
      fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: 'inherit',
      marginLeft: 'auto',
    }),
    successContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center' as const,
      minHeight: '60vh',
      padding: '40px 24px',
    } as React.CSSProperties,
    successIcon: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'rgba(99,139,255,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px',
      marginBottom: '24px',
    } as React.CSSProperties,
    successTitle: {
      fontSize: '32px',
      fontWeight: 700,
      marginBottom: '12px',
      letterSpacing: '-0.5px',
    } as React.CSSProperties,
    successSubtitle: {
      fontSize: '16px',
      color: 'rgba(255,255,255,0.5)',
      marginBottom: '32px',
      maxWidth: '400px',
      lineHeight: '1.6',
    } as React.CSSProperties,
    backLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 28px',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #638BFF, #4a6fdd)',
      color: '#fff',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: 600,
      transition: 'all 0.2s ease',
    } as React.CSSProperties,
    errorMsg: {
      marginTop: '12px',
      padding: '12px 16px',
      borderRadius: '10px',
      background: 'rgba(255,80,80,0.1)',
      border: '1px solid rgba(255,80,80,0.3)',
      color: '#ff6b6b',
      fontSize: '13px',
    } as React.CSSProperties,
  };

  // ── Render: Success ──

  if (submitted) {
    return (
      <div style={styles.page}>
        <header style={styles.header}>
          <a href="/" style={styles.logo}>
            JL <span style={styles.logoAccent}>Studio</span>
          </a>
        </header>
        <div style={styles.successContainer}>
          <div style={styles.successIcon}>✓</div>
          <h1 style={styles.successTitle}>Merci, {form.name.split(' ')[0]} !</h1>
          <p style={styles.successSubtitle}>
            Votre projet a bien été enregistré. Nous reviendrons vers vous sous 24h avec une proposition personnalisée adaptée à vos besoins.
          </p>
          <a href="/" style={styles.backLink}>
            ← Retour au site
          </a>
        </div>
      </div>
    );
  }

  // ── Render: Form ──

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <a href="/" style={styles.logo}>
          JL <span style={styles.logoAccent}>Studio</span>
        </a>
        <span style={styles.headerRight}>Pré-qualification projet</span>
      </header>

      <div style={styles.container}>
        {/* Progress */}
        <div>
          <div style={styles.progressLabel}>
            <span style={styles.progressText}>
              Étape {step + 1} / {totalSteps}
            </span>
            <span style={styles.progressText}>{STEP_TITLES[step]}</span>
          </div>
          <div style={styles.progressBar}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                style={styles.progressSegment(i === step, i < step)}
              />
            ))}
          </div>
        </div>

        {/* Step content with transitions */}
        <form onSubmit={handleSubmit}>
          <div style={styles.stepContent(animating, direction)}>

            {/* ── Step 1: Project ── */}
            {step === 0 && (
              <div>
                <h2 style={styles.stepTitle}>Quel type de projet ?</h2>
                <p style={styles.stepSubtitle}>
                  Sélectionnez le type de projet qui correspond le mieux à votre besoin.
                </p>

                <div style={styles.grid6}>
                  {PROJECT_TYPES.map((pt) => (
                    <div
                      key={pt.value}
                      style={styles.card(form.projectType === pt.value)}
                      onClick={() => setForm(prev => ({ ...prev, projectType: pt.value }))}
                    >
                      <span style={styles.cardIcon}>{pt.icon}</span>
                      <span style={styles.cardLabel}>{pt.label}</span>
                      <span style={styles.cardDesc}>{pt.desc}</span>
                    </div>
                  ))}
                </div>

                <div style={styles.sectionLabel}>Nombre de pages estimé</div>
                <div style={styles.grid4}>
                  {PAGE_RANGES.map((pr) => (
                    <div
                      key={pr.value}
                      style={styles.card(form.pages === pr.value)}
                      onClick={() => setForm(prev => ({ ...prev, pages: pr.value }))}
                    >
                      <span style={styles.cardLabel}>{pr.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 2: Features ── */}
            {step === 1 && (
              <div>
                <h2 style={styles.stepTitle}>De quoi avez-vous besoin ?</h2>
                <p style={styles.stepSubtitle}>
                  Sélectionnez les fonctionnalités souhaitées pour votre projet.
                </p>

                <div style={styles.sectionLabel}>Fonctionnalités</div>
                <div style={styles.featureGrid}>
                  {FEATURES.map((feat) => (
                    <div
                      key={feat.value}
                      style={styles.featureChip(form.features.includes(feat.value))}
                      onClick={() => toggleFeature(feat.value)}
                    >
                      <span>{feat.icon}</span>
                      <span>{feat.label}</span>
                    </div>
                  ))}
                </div>

                <div style={{ ...styles.sectionLabel, marginTop: '8px' }}>Budget</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {BUDGETS.map((b) => (
                    <div
                      key={b.value}
                      style={styles.radioCard(form.budget === b.value)}
                      onClick={() => setForm(prev => ({ ...prev, budget: b.value }))}
                    >
                      <div style={styles.radioDot(form.budget === b.value)} />
                      <span style={styles.radioLabel}>{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 3: Deadline & Details ── */}
            {step === 2 && (
              <div>
                <h2 style={styles.stepTitle}>Quand et comment ?</h2>
                <p style={styles.stepSubtitle}>
                  Indiquez vos contraintes de délai et décrivez votre projet.
                </p>

                <div style={styles.sectionLabel}>Délai souhaité</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px', marginBottom: '32px' }}>
                  {DEADLINES.map((d) => (
                    <div
                      key={d.value}
                      style={styles.card(form.deadline === d.value)}
                      onClick={() => setForm(prev => ({ ...prev, deadline: d.value }))}
                    >
                      <span style={styles.cardLabel}>{d.label}</span>
                      <span style={styles.cardDesc}>{d.desc}</span>
                    </div>
                  ))}
                </div>

                <div style={styles.sectionLabel}>Description du projet (optionnel)</div>
                <textarea
                  style={styles.textarea}
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Décrivez brièvement votre projet, vos objectifs, ou toute information utile..."
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                />
              </div>
            )}

            {/* ── Step 4: Contact Info ── */}
            {step === 3 && (
              <div>
                <h2 style={styles.stepTitle}>Vos coordonnées</h2>
                <p style={styles.stepSubtitle}>
                  Pour que nous puissions vous recontacter avec une proposition adaptée.
                </p>

                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>
                    Nom complet <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    style={styles.input}
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Jean Dupont"
                    required
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>
                    Adresse email <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    style={styles.input}
                    value={form.email}
                    onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="jean@exemple.com"
                    required
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Téléphone</label>
                  <input
                    type="tel"
                    style={styles.input}
                    value={form.phone}
                    onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="06 12 34 56 78"
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Entreprise</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={form.company}
                    onChange={e => setForm(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Nom de votre entreprise"
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                  />
                </div>

                {/* Honeypot anti-spam */}
                <input name="website" autoComplete="off" tabIndex={-1} style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }} />
              </div>
            )}
          </div>

          {/* Error */}
          {error && <div style={styles.errorMsg}>{error}</div>}

          {/* Navigation */}
          <div style={styles.nav}>
            {step > 0 ? (
              <button
                type="button"
                style={styles.btnPrev}
                onClick={() => goTo(step - 1)}
              >
                ← Précédent
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps - 1 ? (
              <button
                type="button"
                style={styles.btnNext(!canAdvance())}
                disabled={!canAdvance()}
                onClick={() => canAdvance() && goTo(step + 1)}
              >
                Suivant →
              </button>
            ) : (
              <button
                type="submit"
                style={styles.btnNext(!canAdvance() || submitting)}
                disabled={!canAdvance() || submitting}
              >
                {submitting ? 'Envoi en cours...' : 'Envoyer ma demande →'}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Global CSS for focus/placeholder styling */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::placeholder { color: rgba(255,255,255,0.25); }
        ::selection { background: rgba(99,139,255,0.3); }
        textarea:focus, input:focus { border-color: rgba(99,139,255,0.5) !important; }
        @media (max-width: 520px) {
          .qual-grid6 { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
