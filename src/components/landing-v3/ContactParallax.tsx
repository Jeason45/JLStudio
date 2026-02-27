'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitTextReveal from './shared/SplitTextReveal';
import { useIsMobile } from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

export default function ContactParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const innerImageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [projectType, setProjectType] = useState<string | null>(null);
  const [wantCallback, setWantCallback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const projectTypes = [
    { value: 'site_vitrine', label: 'Site Vitrine' },
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'application', label: 'Application Web' },
    { value: 'landing', label: 'Landing Page' },
    { value: 'refonte', label: 'Refonte' },
    { value: 'autre', label: 'Autre' },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // Skip all animations if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (imageRef.current) gsap.set(imageRef.current, { clipPath: 'inset(0 0% 0 0)' });
      if (formRef.current) {
        formRef.current.querySelectorAll<HTMLElement>('.form-field').forEach((el) => {
          el.style.opacity = '1';
        });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Image wipe reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Image parallax — slow vertical movement for depth
      if (!isMobile && innerImageRef.current) {
        gsap.fromTo(innerImageRef.current, {
          yPercent: 10,
        }, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Form fields stagger reveal
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field');
        gsap.fromTo(
          fields,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wantCallback && !formData.phone.trim()) {
      setError('Le numéro de téléphone est obligatoire pour être rappelé.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selectedType: projectType,
          wantCallback,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi");

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setProjectType(null);
      setWantCallback(false);

      setTimeout(() => setSuccess(false), 8000);
    } catch {
      setError(
        'Une erreur est survenue. Veuillez réessayer.'
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    'w-full bg-transparent border-b border-white/[0.08] text-white py-3.5 px-0 text-base outline-none transition-all duration-300 focus:border-[#638BFF]/60 placeholder:text-white/35';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      <div className={`${isMobile ? 'flex flex-col' : 'grid grid-cols-2'} min-h-screen`}>
        {/* Left: Image with parallax */}
        <div className={`relative overflow-hidden ${isMobile ? 'h-[35vh] min-h-[220px]' : 'h-auto'}`}>
          <div ref={imageRef} className="absolute inset-0">
            <div ref={innerImageRef} className="absolute inset-[-15%] will-change-transform">
              <Image
                src="/images/contact-bg.jpg"
                alt=""
                fill
                className="object-cover"
                sizes={isMobile ? '100vw' : '50vw'}
              />
            </div>
            <div className="absolute inset-0 bg-black/25" />
            <div className={`absolute inset-0 ${isMobile ? 'bg-gradient-to-b from-transparent to-black' : 'bg-gradient-to-r from-transparent via-transparent to-black/80'}`} />
            {/* Vignette */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 80% 70% at 30% 50%, transparent 30%, rgba(0,0,0,0.4) 100%)',
              }}
            />
          </div>

          {/* Title overlay */}
          <div className={`relative z-10 flex items-end h-full ${isMobile ? 'p-5 pb-6' : 'p-12 lg:p-20'}`}>
            <div>
              <p className="text-[#638BFF]/70 text-xs tracking-[0.4em] uppercase mb-3 sm:mb-4">
                Contact
              </p>
              <SplitTextReveal
                tag="h2"
                type="chars"
                className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-black text-white leading-[0.95]"
              >
                Votre Projet
              </SplitTextReveal>
              <p className="text-white/50 text-xs sm:text-sm mt-3 sm:mt-4 max-w-xs">
                Discutons de votre prochaine réalisation
              </p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className={`flex items-center ${isMobile ? 'px-5 py-10' : 'px-12 lg:px-20 py-20'}`}>
          <div ref={formRef} className="w-full max-w-lg mx-auto sm:mx-0">
            {/* Success */}
            {success && (
              <div className="mb-8 p-6 bg-emerald-500/[0.06] border border-emerald-500/15 rounded-2xl text-center">
                <svg
                  className="w-8 h-8 text-emerald-400 mx-auto mb-3"
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
                <p className="text-emerald-400 font-semibold text-lg mb-1">
                  Message envoyé !
                </p>
                <p className="text-emerald-400/60 text-sm">
                  Nous vous recontacterons rapidement.
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-8 p-5 bg-red-500/[0.06] border border-red-500/15 rounded-2xl text-center text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Project Type */}
              <div className="form-field" style={{ opacity: 0 }}>
                <span className="block text-sm font-semibold text-white mb-3">
                  Type de projet
                </span>
                {/* Mobile: select */}
                <select
                  value={projectType || ''}
                  onChange={(e) => setProjectType(e.target.value || null)}
                  className="sm:hidden w-full bg-transparent border-b border-white/[0.08] text-white py-3 text-base outline-none focus:border-[#638BFF]/60 appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='rgba(255,255,255,0.3)' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 4px center',
                  }}
                >
                  <option value="" className="bg-black text-white/50">
                    Sélectionner...
                  </option>
                  {projectTypes.map((type) => (
                    <option
                      key={type.value}
                      value={type.value}
                      className="bg-black text-white"
                    >
                      {type.label}
                    </option>
                  ))}
                </select>
                {/* Desktop: pills */}
                <div className="hidden sm:flex flex-wrap gap-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      aria-pressed={projectType === type.value}
                      onClick={() =>
                        setProjectType(
                          projectType === type.value ? null : type.value
                        )
                      }
                      className={`px-4 py-2 rounded-full text-sm transition-all duration-300 border ${
                        projectType === type.value
                          ? 'bg-[#638BFF]/10 border-[#638BFF]/30 text-[#638BFF]'
                          : 'bg-transparent border-white/[0.08] text-white/45 hover:border-white/15 hover:text-white/60'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="form-field grid sm:grid-cols-2 gap-6 sm:gap-8" style={{ opacity: 0 }}>
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-white mb-3">
                    Nom complet *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Votre nom"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-white mb-3">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="votre@email.com"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="form-field" style={{ opacity: 0 }}>
                <label htmlFor="contact-phone" className="block text-sm font-semibold text-white mb-3">
                  Téléphone
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="06 XX XX XX XX"
                  className={inputClasses}
                />
              </div>

              {/* Message */}
              <div className="form-field" style={{ opacity: 0 }}>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-white mb-3">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Décrivez votre projet, vos objectifs, votre budget..."
                  className={`${inputClasses} resize-none`}
                  style={{ fontFamily: 'inherit' }}
                />
              </div>

              {/* Honeypot anti-spam */}
              <input name="website" autoComplete="off" tabIndex={-1} className="absolute left-[-9999px] opacity-0 h-0 w-0" />

              {/* Callback */}
              <div className="form-field" style={{ opacity: 0 }}>
                <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={wantCallback}
                      onChange={() => setWantCallback(!wantCallback)}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                        wantCallback
                          ? 'bg-[#638BFF] border-[#638BFF]'
                          : 'border-white/15 group-hover:border-white/25'
                      }`}
                    >
                      {wantCallback && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white/50 text-sm group-hover:text-white/70 transition-colors">
                      Je souhaite être rappelé pour discuter de mon projet
                    </span>
                  </label>
                </div>
                {wantCallback && !formData.phone.trim() && (
                  <p className="text-xs text-[#638BFF]/60 mt-2 ml-1">
                    Un numéro de téléphone est requis pour être rappelé
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="form-field pt-2" style={{ opacity: 0 }}>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto bg-[#638BFF] text-white font-semibold px-8 py-3.5 sm:px-12 sm:py-4 rounded-full text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,139,255,0.3)] ${
                    loading ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center gap-3 justify-center">
                      <svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                      >
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
                      Envoi en cours...
                    </span>
                  ) : (
                    'Envoyer ma demande'
                  )}
                </button>
              </div>

              {/* Pre-qualification link */}
              <div className="form-field pt-4 text-center sm:text-left" style={{ opacity: 0 }}>
                <p className="text-white/40 text-xs">
                  Vous avez déjà une idée précise ?{' '}
                  <a
                    href="/qualifier"
                    className="text-[#638BFF] hover:text-[#638BFF]/80 underline underline-offset-2 transition-colors"
                  >
                    Obtenez un devis estimé en 2 minutes
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
