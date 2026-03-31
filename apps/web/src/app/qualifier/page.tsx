'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import {
  Globe,
  ShoppingCart,
  Settings,
  Rocket,
  RefreshCw,
  Lightbulb,
  Smartphone,
  Search,
  LayoutDashboard,
  PenLine,
  CalendarDays,
  CreditCard,
  Languages,
  BarChart3,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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

const PROJECT_TYPES: { value: string; label: string; icon: LucideIcon; desc: string }[] = [
  { value: 'vitrine', label: 'Site Vitrine', icon: Globe, desc: 'Présentez votre activité' },
  { value: 'ecommerce', label: 'E-Commerce', icon: ShoppingCart, desc: 'Vendez en ligne' },
  { value: 'webapp', label: 'Application Web', icon: Settings, desc: 'Outil sur mesure' },
  { value: 'landing', label: 'Landing Page', icon: Rocket, desc: 'Page de conversion' },
  { value: 'refonte', label: 'Refonte', icon: RefreshCw, desc: 'Modernisez votre site' },
  { value: 'autre', label: 'Autre', icon: Lightbulb, desc: 'Projet spécifique' },
];

const PAGE_RANGES = [
  { value: '1-5', label: '1 - 5 pages' },
  { value: '5-10', label: '5 - 10 pages' },
  { value: '10-20', label: '10 - 20 pages' },
  { value: '20+', label: '20+ pages' },
];

const FEATURES: { value: string; label: string; icon: LucideIcon }[] = [
  { value: 'responsive', label: 'Design Responsive', icon: Smartphone },
  { value: 'seo', label: 'SEO', icon: Search },
  { value: 'cms', label: 'CMS / Back-office', icon: LayoutDashboard },
  { value: 'blog', label: 'Blog', icon: PenLine },
  { value: 'booking', label: 'Réservation', icon: CalendarDays },
  { value: 'payment', label: 'Paiement en ligne', icon: CreditCard },
  { value: 'multilang', label: 'Multilingue', icon: Languages },
  { value: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const BUDGETS = [
  { value: '<2000', label: 'Moins de 2 000 €' },
  { value: '2000-5000', label: '2 000 - 5 000 €' },
  { value: '5000-10000', label: '5 000 - 10 000 €' },
  { value: '>10000', label: 'Plus de 10 000 €' },
];

const DEADLINES = [
  { value: 'urgent', label: 'Urgent', desc: "Moins d'1 mois" },
  { value: '1-2-mois', label: '1 - 2 mois', desc: 'Délai court' },
  { value: '2-3-mois', label: '2 - 3 mois', desc: 'Délai standard' },
  { value: 'flexible', label: 'Flexible', desc: 'Pas de rush' },
];

const STEP_LABELS = ['Votre projet', 'Fonctionnalités', 'Délai & Détails', 'Vos coordonnées'];

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
    if (step === 3)
      return (
        !!form.name.trim() &&
        !!form.email.trim() &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      );
    return true;
  }

  // ── Handlers ──

  function toggleFeature(value: string) {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(value)
        ? prev.features.filter((f) => f !== value)
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

  // ── Input class ──

  const inputClasses =
    'w-full bg-transparent border-b border-white/[0.08] text-white py-3.5 text-sm outline-none transition-all duration-300 focus:border-[#638BFF]/60 placeholder:text-white/25';

  // ── Render: Success ──

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] text-white">
        <header className="flex items-center px-6 sm:px-8 py-5 border-b border-white/[0.06]">
          <a href="/">
            <Image
              src="/images/logo-jlstudio.png"
              alt="JL Studio"
              width={90}
              height={18}
              className="h-5 sm:h-6 w-auto"
            />
          </a>
        </header>

        <div className="flex flex-col items-center justify-center text-center min-h-[70vh] px-6">
          <div className="w-16 h-16 rounded-full bg-[#638BFF]/15 flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-[#638BFF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-black mb-3">
            Merci, {form.name.split(' ')[0]} !
          </h1>
          <p className="text-white/50 text-sm sm:text-base max-w-md leading-relaxed mb-8">
            Votre projet a bien été enregistré. Nous reviendrons vers vous sous
            24h avec une proposition personnalisée adaptée à vos besoins.
          </p>
          <a
            href="/"
            className="bg-[#638BFF] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,139,255,0.3)]"
          >
            ← Retour au site
          </a>
        </div>
      </div>
    );
  }

  // ── Render: Form ──

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/[0.06]">
        <a href="/">
          <Image
            src="/images/logo-jlstudio.png"
            alt="JL Studio"
            width={90}
            height={18}
            className="h-5 sm:h-6 w-auto"
          />
        </a>
        <span className="text-white/50 text-xs tracking-wide">
          {STEP_LABELS[step]}
        </span>
      </header>

      <div className="max-w-2xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
        {/* Progress bar */}
        <div className="mb-10 sm:mb-14">
          <div className="flex justify-between mb-2.5">
            <span className="text-white/50 text-xs">
              Étape {step + 1} / {totalSteps}
            </span>
            <span className="text-[#638BFF]/50 text-xs">
              {Math.round(((step + 1) / totalSteps) * 100)}%
            </span>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                  i < step
                    ? 'bg-[#638BFF]'
                    : i === step
                      ? 'bg-gradient-to-r from-[#638BFF] to-[#7da3ff]'
                      : 'bg-white/[0.06]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step content */}
        <form onSubmit={handleSubmit}>
          <div
            className={`transition-all duration-300 ease-out ${
              animating
                ? `opacity-0 ${direction === 'next' ? 'translate-x-6' : '-translate-x-6'}`
                : 'opacity-100 translate-x-0'
            }`}
          >
            {/* ── Step 1: Project ── */}
            {step === 0 && (
              <div>
                <p className="text-[#638BFF]/70 text-xs tracking-[0.3em] uppercase mb-3">
                  Étape 1
                </p>
                <h2 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-black text-white mb-2">
                  Quel type de projet ?
                </h2>
                <p className="text-white/45 text-sm sm:text-base mb-8 sm:mb-10">
                  Sélectionnez le type qui correspond le mieux à votre besoin.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
                  {PROJECT_TYPES.map((pt) => (
                    <button
                      key={pt.value}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          projectType: pt.value,
                        }))
                      }
                      className={`flex flex-col items-center gap-2 p-5 sm:p-6 rounded-xl border transition-all duration-300 text-center ${
                        form.projectType === pt.value
                          ? 'bg-[#638BFF]/10 border-[#638BFF]/30'
                          : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]'
                      }`}
                    >
                      <pt.icon className={`w-6 h-6 ${form.projectType === pt.value ? 'text-[#638BFF]' : 'text-white/50'} transition-colors duration-300`} />
                      <span className="text-sm font-semibold text-white">
                        {pt.label}
                      </span>
                      <span className="text-xs text-white/50">{pt.desc}</span>
                    </button>
                  ))}
                </div>

                <p className="text-white/50 text-xs tracking-[0.2em] uppercase font-semibold mb-4">
                  Nombre de pages estimé
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PAGE_RANGES.map((pr) => (
                    <button
                      key={pr.value}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, pages: pr.value }))
                      }
                      className={`py-3.5 px-4 rounded-xl border text-sm font-medium transition-all duration-300 ${
                        form.pages === pr.value
                          ? 'bg-[#638BFF]/10 border-[#638BFF]/30 text-white'
                          : 'bg-white/[0.02] border-white/[0.06] text-white/60 hover:border-white/[0.12]'
                      }`}
                    >
                      {pr.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 2: Features ── */}
            {step === 1 && (
              <div>
                <p className="text-[#638BFF]/70 text-xs tracking-[0.3em] uppercase mb-3">
                  Étape 2
                </p>
                <h2 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-black text-white mb-2">
                  De quoi avez-vous besoin ?
                </h2>
                <p className="text-white/45 text-sm sm:text-base mb-8 sm:mb-10">
                  Sélectionnez les fonctionnalités souhaitées.
                </p>

                <p className="text-white/50 text-xs tracking-[0.2em] uppercase font-semibold mb-4">
                  Fonctionnalités
                </p>
                <div className="flex flex-wrap gap-2.5 mb-10">
                  {FEATURES.map((feat) => (
                    <button
                      key={feat.value}
                      type="button"
                      onClick={() => toggleFeature(feat.value)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm transition-all duration-300 ${
                        form.features.includes(feat.value)
                          ? 'bg-[#638BFF]/10 border-[#638BFF]/30 text-white'
                          : 'bg-white/[0.02] border-white/[0.06] text-white/55 hover:border-white/[0.12] hover:text-white/70'
                      }`}
                    >
                      <feat.icon className={`w-4 h-4 ${form.features.includes(feat.value) ? 'text-[#638BFF]' : 'text-white/50'} transition-colors duration-300`} />
                      <span>{feat.label}</span>
                    </button>
                  ))}
                </div>

                <p className="text-white/50 text-xs tracking-[0.2em] uppercase font-semibold mb-4">
                  Budget
                </p>
                <div className="flex flex-col gap-2.5">
                  {BUDGETS.map((b) => (
                    <button
                      key={b.value}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, budget: b.value }))
                      }
                      className={`flex items-center gap-3.5 px-5 py-4 rounded-xl border text-left transition-all duration-300 ${
                        form.budget === b.value
                          ? 'bg-[#638BFF]/10 border-[#638BFF]/30'
                          : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]'
                      }`}
                    >
                      <div
                        className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          form.budget === b.value
                            ? 'border-[#638BFF]'
                            : 'border-white/20'
                        }`}
                      >
                        {form.budget === b.value && (
                          <div className="w-2 h-2 rounded-full bg-[#638BFF]" />
                        )}
                      </div>
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          form.budget === b.value
                            ? 'text-white'
                            : 'text-white/60'
                        }`}
                      >
                        {b.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 3: Deadline & Details ── */}
            {step === 2 && (
              <div>
                <p className="text-[#638BFF]/70 text-xs tracking-[0.3em] uppercase mb-3">
                  Étape 3
                </p>
                <h2 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-black text-white mb-2">
                  Quand et comment ?
                </h2>
                <p className="text-white/45 text-sm sm:text-base mb-8 sm:mb-10">
                  Indiquez vos contraintes de délai et décrivez votre projet.
                </p>

                <p className="text-white/50 text-xs tracking-[0.2em] uppercase font-semibold mb-4">
                  Délai souhaité
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                  {DEADLINES.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, deadline: d.value }))
                      }
                      className={`flex flex-col items-center gap-1.5 p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
                        form.deadline === d.value
                          ? 'bg-[#638BFF]/10 border-[#638BFF]/30'
                          : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]'
                      }`}
                    >
                      <span className="text-sm font-semibold text-white">
                        {d.label}
                      </span>
                      <span className="text-xs text-white/50">{d.desc}</span>
                    </button>
                  ))}
                </div>

                <p className="text-white/50 text-xs tracking-[0.2em] uppercase font-semibold mb-4">
                  Description du projet{' '}
                  <span className="normal-case tracking-normal text-white/50">
                    (optionnel)
                  </span>
                </p>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  placeholder="Décrivez brièvement votre projet, vos objectifs, ou toute information utile..."
                  rows={4}
                  className={`${inputClasses} resize-none`}
                />
              </div>
            )}

            {/* ── Step 4: Contact Info ── */}
            {step === 3 && (
              <div>
                <p className="text-[#638BFF]/70 text-xs tracking-[0.3em] uppercase mb-3">
                  Dernière étape
                </p>
                <h2 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-black text-white mb-2">
                  Vos coordonnées
                </h2>
                <p className="text-white/45 text-sm sm:text-base mb-8 sm:mb-10">
                  Pour que nous puissions vous recontacter avec une proposition
                  adaptée.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      Nom complet <span className="text-[#638BFF]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Jean Dupont"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      Adresse email <span className="text-[#638BFF]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="jean@exemple.com"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      placeholder="06 12 34 56 78"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      placeholder="Nom de votre entreprise"
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Honeypot anti-spam */}
                <input
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="absolute left-[-9999px] opacity-0 h-0 w-0"
                />
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/[0.06] border border-red-500/15 rounded-xl text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 sm:mt-12">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                className="text-white/50 hover:text-white text-sm font-medium transition-colors duration-300"
              >
                ← Précédent
              </button>
            ) : (
              <a
                href="/"
                className="text-white/50 hover:text-white/70 text-sm transition-colors duration-300"
              >
                ← Retour
              </a>
            )}

            {step < totalSteps - 1 ? (
              <button
                type="button"
                disabled={!canAdvance()}
                onClick={() => canAdvance() && goTo(step + 1)}
                className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  canAdvance()
                    ? 'bg-[#638BFF] text-white hover:shadow-[0_0_40px_rgba(99,139,255,0.3)]'
                    : 'bg-white/[0.06] text-white/25 cursor-not-allowed'
                }`}
              >
                Suivant →
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canAdvance() || submitting}
                className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  canAdvance() && !submitting
                    ? 'bg-[#638BFF] text-white hover:shadow-[0_0_40px_rgba(99,139,255,0.3)]'
                    : 'bg-white/[0.06] text-white/25 cursor-not-allowed'
                }`}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Envoi...
                  </span>
                ) : (
                  'Envoyer ma demande →'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
