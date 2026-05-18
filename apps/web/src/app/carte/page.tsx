'use client';

import { useEffect, useState, useRef, type FormEvent } from 'react';
import Image from 'next/image';
import './styles.css';

/* ─── Trustpilot reviews data ─────────────────────────────────────── */
type Review = { name: string; initials: string; role: string; date: string; quote: string };

const REVIEWS: Review[] = [
  {
    name: 'Houda Zeggouti',
    initials: 'HZ',
    role: 'Cliente',
    date: '6 mars 2026',
    quote:
      "Rapide et efficace, JL Studio transforme les idées en résultats concrets et de qualité. Je recommande vivement.",
  },
  {
    name: 'Carla Goncalves',
    initials: 'CG',
    role: 'Plateforme éducative',
    date: '3 mars 2026',
    quote:
      "Une grande écoute et une valeur ajoutée significative grâce à des propositions professionnelles. Le résultat dépasse nos attentes.",
  },
  {
    name: 'Hinde',
    initials: 'H',
    role: 'Application sur mesure',
    date: '3 mars 2026',
    quote:
      "Un développeur compétent et à l'écoute qui a su concevoir une application sur mesure. Design soigné et réactivité exemplaire.",
  },
  {
    name: 'Florent Carivenc',
    initials: 'FC',
    role: 'Créateur culinaire',
    date: '2 mars 2026',
    quote:
      "Très professionnel. Le site correspond parfaitement à ce que j'attendais, livré dans les temps avec un suivi impeccable.",
  },
  {
    name: 'Tib',
    initials: 'T',
    role: 'Site vitrine & CRM',
    date: '2 mars 2026',
    quote:
      "Top qualité ! Je recommande sans hésitations. Le site et le CRM livrés sont exactement ce dont nous avions besoin.",
  },
];

/* ─── Reusable SVGs ───────────────────────────────────────────────── */
function TPStar() {
  return (
    <svg viewBox="0 0 24 24" fill="#fff">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <article className="review-card">
      <header className="review-header">
        <div className="review-stars" aria-label="5 étoiles">
          <span><TPStar /></span><span><TPStar /></span><span><TPStar /></span><span><TPStar /></span><span><TPStar /></span>
        </div>
        <span className="review-verified">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
          Vérifié
        </span>
      </header>
      <blockquote className="review-quote">« {r.quote} »</blockquote>
      <div className="review-author">
        <div className="review-avatar">{r.initials}</div>
        <div>
          <span className="name">{r.name}</span>
          <span className="role">{r.role} · {r.date}</span>
        </div>
      </div>
    </article>
  );
}

/* ─── Slot picker types & helpers ─────────────────────────────────── */
type Availability = { timezone: string; slotMinutes: number; slots: Record<string, string[]> };

const DOW_LABELS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}

function endOfSlot(start: string, slotMinutes: number): string {
  const [h, m] = start.split(':').map(Number);
  const totalMin = h * 60 + m + slotMinutes;
  const eh = Math.floor(totalMin / 60);
  const em = totalMin % 60;
  return `${String(eh).padStart(2, '0')}:${String(em).padStart(2, '0')}`;
}

/* ─── Page component ──────────────────────────────────────────────── */
export default function CartePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Slot picker state
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const openModal = () => {
    setSubmitted(false);
    setError(null);
    setSelectedSlot(null);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // Fetch availability when modal opens (once)
  useEffect(() => {
    if (!modalOpen || availability) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/availability');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Availability = await res.json();
        if (cancelled) return;
        setAvailability(data);
        const firstDay = Object.keys(data.slots)[0] || null;
        setSelectedDay(firstDay);
      } catch (err) {
        if (cancelled) return;
        setAvailabilityError(err instanceof Error ? err.message : 'Impossible de charger les créneaux');
      }
    })();
    return () => { cancelled = true; };
  }, [modalOpen, availability]);

  // Body scroll lock + Escape to close
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
      document.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKey);
      };
    }
  }, [modalOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!selectedDay || !selectedSlot) {
      setError('Choisissez un créneau dans le calendrier ci-dessus.');
      return;
    }

    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const slotMinutes = availability?.slotMinutes ?? 30;
    const appointmentSlot = `${selectedSlot} - ${endOfSlot(selectedSlot, slotMinutes)}`;

    const payload: Record<string, string | undefined> = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim() || undefined,
      message: String(formData.get('message') || '').trim() || undefined,
      website: String(formData.get('website') || ''),
      source: 'qr_carte_visite',
      appointmentDay: selectedDay,
      appointmentSlot,
    };

    try {
      const res = await fetch('/api/leads/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Erreur ${res.status}`);
      }

      setSubmitted(true);
      formRef.current?.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Réessayez ou contactez-moi directement.');
    } finally {
      setSubmitting(false);
    }
  };

  const doubledReviews = [...REVIEWS, ...REVIEWS];

  return (
    <div className="carte-root">
      <a href="#main-content" className="skip-link">Aller au contenu</a>

      <div className="page" id="main-content">
        {/* Corners brackets + flares */}
        <span className="corner tl" aria-hidden="true" />
        <span className="corner tr" aria-hidden="true" />
        <span className="corner bl" aria-hidden="true" />
        <span className="corner br" aria-hidden="true" />
        <span className="flare f1" aria-hidden="true" />
        <span className="flare f2" aria-hidden="true" />

        {/* Header */}
        <header className="header anim anim-1">
          <div className="header-logo">
            <Image src="/qr/logo.png" alt="JL Studio" width={120} height={26} unoptimized priority />
          </div>
          <div className="header-meta">2026</div>
        </header>

        {/* Hero */}
        <section className="hero">
          <div className="hero-photo anim anim-2">
            <Image src="/qr/profil.webp" alt="Jeason Lemoine" width={128} height={128} priority />
          </div>
          <h1 className="hero-name anim anim-3">
            <span className="first">Jeason</span> <span className="last">Lemoine</span>
          </h1>
          <p className="hero-desc anim anim-4">
            Je donne vie à votre marque en ligne avec des sites raffinés et des outils sur-mesure qui travaillent pour vous.
          </p>
          <div className="hero-chips anim anim-5">
            <span>Bordeaux</span>
            <span className="dot">·</span>
            <span>Disponible pour de nouveaux projets</span>
          </div>
        </section>

        {/* 4 boutons CTA top */}
        <nav className="quick-actions anim anim-6" aria-label="Contact rapide">
          <button type="button" className="qa-btn qa-contact" onClick={openModal} aria-label="Ouvrir le formulaire de contact">
            <span className="icon">
              <svg viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M9 11h6M9 14h4M6 9h.01" /></svg>
            </span>
            <span className="label">Contact</span>
          </button>
          <a href="https://wa.me/33767581061" className="qa-btn qa-whatsapp" aria-label="WhatsApp">
            <span className="icon">
              <svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-.9s-.5-.2-.7.1c-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5 0 1.5 1.1 2.9 1.2 3.1.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4M12 22c-1.7 0-3.4-.4-4.9-1.3l-3.5 1L4.6 18C3.7 16.5 3.2 14.8 3.2 13.1c0-4.9 4-8.9 8.9-8.9 2.4 0 4.6.9 6.3 2.6 1.7 1.7 2.6 3.9 2.6 6.3-.1 4.9-4.1 8.9-9 8.9Z" /></svg>
            </span>
            <span className="label">WhatsApp</span>
          </a>
          <a href="mailto:contact@jlstudio.dev" className="qa-btn qa-email" aria-label="Email">
            <span className="icon">
              <svg viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </span>
            <span className="label">Email</span>
          </a>
          <a href="https://jlstudio.dev" className="qa-btn qa-website" aria-label="Site web">
            <span className="icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
            </span>
            <span className="label">Site web</span>
          </a>
        </nav>

        {/* Ce que je fais */}
        <section className="anim anim-7">
          <h2 className="section-title">Ce que je fais</h2>
          <div className="services">
            <article className="service-card s-vitrine">
              <span className="accent-line" aria-hidden="true" />
              <div className="content">
                <h3>Sites sur-mesure</h3>
                <p>Design &amp; développement premium</p>
              </div>
            </article>
            <article className="service-card s-crm">
              <span className="accent-line" aria-hidden="true" />
              <div className="content">
                <h3>Automatisations &amp; CRM</h3>
                <p>Systèmes qui libèrent du temps</p>
              </div>
            </article>
            <article className="service-card s-refonte">
              <span className="accent-line" aria-hidden="true" />
              <div className="content">
                <h3>Refonte</h3>
                <p>Transformer votre site</p>
              </div>
            </article>
          </div>
        </section>

        {/* Avis clients */}
        <section className="reviews-section anim anim-8">
          <h2 className="section-title">Avis clients</h2>

          <div className="trust-stats">
            <div className="trust-stars" aria-label="5 étoiles sur 5">
              <span className="trust-star"><TPStar /></span>
              <span className="trust-star"><TPStar /></span>
              <span className="trust-star"><TPStar /></span>
              <span className="trust-star"><TPStar /></span>
              <span className="trust-star"><TPStar /></span>
            </div>
            <p className="trust-headline">100% de mes clients me recommandent</p>
            <p className="trust-sub">12+ projets <span className="dot">·</span> 4 années <span className="dot">·</span> Bordeaux</p>
          </div>

          <div className="reviews-marquee">
            <div className="reviews-track">
              {doubledReviews.map((r, i) => (
                <ReviewCard key={`${r.name}-${i}`} r={r} />
              ))}
            </div>
          </div>

          <div className="trust-link-wrap">
            <a href="https://fr.trustpilot.com/review/jlstudio.dev" target="_blank" rel="noopener noreferrer" className="trust-link">
              <svg className="tp-logo" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              <span className="tp-text">Trustpilot</span>
              <span>Voir les avis</span>
              <span className="arrow">→</span>
            </a>
          </div>
        </section>

        {/* CTA principal */}
        <button type="button" className="cta-main anim anim-9" onClick={openModal} aria-label="Réserver un échange découverte">
          <span className="title">Réserver 20 minutes <span className="arrow">→</span></span>
          <span className="subtitle">Échange découverte gratuit, sans engagement</span>
        </button>

        {/* Footer */}
        <footer className="footer anim anim-9">
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/jl-studio-64b287396" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
            </a>
            <a href="https://www.instagram.com/jlstudio.dev" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.21-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85.15-3.23 1.66-4.77 4.92-4.92C8.42 2.18 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.69.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" /></svg>
            </a>
          </div>
          <div className="footer-credit">© 2026 JL Studio — jlstudio.dev</div>
        </footer>
      </div>

      {/* Modal RDV / Contact */}
      <div className={`carte-modal ${modalOpen ? 'open' : ''}`} role="dialog" aria-labelledby="modal-title" aria-hidden={!modalOpen}>
        <div className="modal-overlay" onClick={closeModal} />
        <div className="modal-card">
          <button type="button" className="modal-close" onClick={closeModal} aria-label="Fermer">×</button>

          {submitted ? (
            <div className="modal-success">
              <div className="check">✓</div>
              <h2>Demande envoyée !</h2>
              <p className="modal-subtitle" style={{ marginTop: '8px' }}>
                Je vous recontacte sous 24h pour caler un créneau.
              </p>
            </div>
          ) : (
            <>
              <h2 id="modal-title">Réserver un échange</h2>
              <p className="modal-subtitle">
                20 minutes pour parler de votre projet, gratuit et sans engagement. Je vous recontacte sous 24h pour caler un créneau.
              </p>
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                {/* Honeypot anti-spam */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />

                <label htmlFor="f-name">Votre nom</label>
                <input type="text" id="f-name" name="name" required autoComplete="name" />

                <label htmlFor="f-email">Votre email</label>
                <input type="email" id="f-email" name="email" required autoComplete="email" />

                <label htmlFor="f-phone">Téléphone (optionnel)</label>
                <input type="tel" id="f-phone" name="phone" autoComplete="tel" />

                <label htmlFor="f-message">Décrivez votre projet</label>
                <textarea
                  id="f-message"
                  name="message"
                  rows={3}
                  placeholder="Site vitrine, e-commerce, automatisation… donnez-moi le contexte."
                />

                <label>Choisissez votre créneau (20 min)</label>
                {availabilityError && (
                  <div className="slotpicker-status">Impossible de charger les créneaux. Réessayez.</div>
                )}
                {!availability && !availabilityError && (
                  <div className="slotpicker-status">Chargement des créneaux…</div>
                )}
                {availability && Object.keys(availability.slots).length === 0 && (
                  <div className="slotpicker-status">Aucun créneau disponible dans les 30 prochains jours. Contactez-moi par WhatsApp.</div>
                )}
                {availability && Object.keys(availability.slots).length > 0 && (
                  <>
                    <div className="slotpicker-days" role="tablist">
                      {Object.keys(availability.slots).map((dayKey) => {
                        const [y, m, d] = dayKey.split('-').map(Number);
                        const date = new Date(y, m - 1, d);
                        const dow = DOW_LABELS[date.getDay()];
                        const month = date.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '');
                        return (
                          <button
                            key={dayKey}
                            type="button"
                            className={`day-chip${selectedDay === dayKey ? ' active' : ''}`}
                            onClick={() => { setSelectedDay(dayKey); setSelectedSlot(null); }}
                            aria-pressed={selectedDay === dayKey}
                          >
                            <span className="dow">{dow}</span>
                            <span className="dom">{date.getDate()}</span>
                            <span className="mon">{month}</span>
                          </button>
                        );
                      })}
                    </div>
                    {selectedDay && (
                      <div className="slotpicker-slots" role="listbox">
                        {(availability.slots[selectedDay] || []).map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            className={`slot-btn${selectedSlot === slot ? ' active' : ''}`}
                            onClick={() => setSelectedSlot(slot)}
                            aria-pressed={selectedSlot === slot}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                    {selectedDay && selectedSlot && (
                      <div className="slot-summary">
                        Rendez-vous le <strong>{formatLongDate(selectedDay)}</strong> à <strong>{selectedSlot}</strong>
                      </div>
                    )}
                  </>
                )}

                {error && <div className="modal-error">{error}</div>}

                <button type="submit" className="modal-submit" disabled={submitting}>
                  {submitting ? 'Envoi en cours…' : 'Envoyer la demande'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
