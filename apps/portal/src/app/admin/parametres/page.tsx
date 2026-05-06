'use client';

import { useState, useEffect } from 'react';
import { Building2, CreditCard, Save, Check } from 'lucide-react';
import { useAgencySidebar } from '@/components/admin/SidebarContext';

interface CompanySettings {
  id: string;
  companyName: string | null;
  address: string | null;
  zipCode: string | null;
  city: string | null;
  country: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  siret: string | null;
  tvaNumber: string | null;
  iban: string | null;
  bic: string | null;
  logoUrl: string | null;
  updatedAt: string;
}

const DEFAULT: CompanySettings = {
  id: '', companyName: '', address: '', zipCode: '', city: '', country: 'France',
  phone: '', email: '', website: '', siret: '', tvaNumber: '',
  iban: '', bic: '', logoUrl: '', updatedAt: '',
};

type Section = 'company' | 'legal' | 'banking';

export default function ParametresPage() {
  const { isMobile } = useAgencySidebar();
  const [settings, setSettings] = useState<CompanySettings>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [section, setSection] = useState<Section>('company');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setSettings({ ...DEFAULT, ...data });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const update = <K extends keyof CompanySettings>(key: K, value: CompanySettings[K]) => {
    setSettings((s) => ({ ...s, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: settings.companyName,
          address: settings.address,
          zipCode: settings.zipCode,
          city: settings.city,
          country: settings.country,
          phone: settings.phone,
          email: settings.email,
          website: settings.website,
          siret: settings.siret,
          tvaNumber: settings.tvaNumber,
          iban: settings.iban,
          bic: settings.bic,
          logoUrl: settings.logoUrl,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Erreur ${res.status}`);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <header style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, letterSpacing: '-0.02em' }}>
              Paramètres
            </h1>
            <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginTop: 4 }}>
              Informations de ton entreprise — utilisées dans les PDFs des devis, factures et contrats.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              ...primaryBtn(),
              opacity: saving ? 0.6 : 1,
              background: saved ? 'var(--agency-success)' : 'var(--agency-accent)',
            }}
          >
            {saved ? <Check size={14} /> : <Save size={14} />}
            {saving ? 'Sauvegarde…' : saved ? 'Sauvegardé' : 'Enregistrer'}
          </button>
        </div>
      </header>

      {/* Section tabs */}
      <div style={{
        display: 'flex', gap: 4, marginBottom: 20,
        background: 'var(--agency-surface-1)',
        border: '1px solid var(--agency-border)',
        borderRadius: 10, padding: 4, width: 'fit-content',
      }}>
        {[
          { key: 'company' as Section, label: 'Entreprise', icon: <Building2 size={14} /> },
          { key: 'legal' as Section, label: 'Mentions légales', icon: <CreditCard size={14} /> },
          { key: 'banking' as Section, label: 'Coordonnées bancaires', icon: <CreditCard size={14} /> },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setSection(s.key)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 7,
              fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none',
              background: section === s.key ? 'var(--agency-accent-soft)' : 'transparent',
              color: section === s.key ? 'var(--agency-accent)' : 'var(--agency-ink-3)',
              transition: 'all 0.15s',
            }}
          >
            {s.icon}
            {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ ...cardStyle(), padding: 60, textAlign: 'center' }}>
          <p style={{ color: 'var(--agency-ink-3)', fontSize: 13, margin: 0 }}>Chargement…</p>
        </div>
      ) : (
        <div style={{ ...cardStyle(), padding: 24 }}>
          {/* Section: Company */}
          {section === 'company' && (
            <div>
              <SectionTitle title="Identité entreprise" subtitle="Nom, adresse, contact." />

              <Field label="Nom de l'entreprise *">
                <input
                  type="text" value={settings.companyName || ''}
                  onChange={(e) => update('companyName', e.target.value)}
                  placeholder="JL Studio" style={inputStyle()}
                />
              </Field>

              <Field label="Adresse">
                <input
                  type="text" value={settings.address || ''}
                  onChange={(e) => update('address', e.target.value)}
                  placeholder="12 rue de la Paix" style={inputStyle()}
                />
              </Field>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr 1fr', gap: 10 }}>
                <Field label="Code postal">
                  <input type="text" value={settings.zipCode || ''} onChange={(e) => update('zipCode', e.target.value)} placeholder="75002" style={inputStyle()} />
                </Field>
                <Field label="Ville">
                  <input type="text" value={settings.city || ''} onChange={(e) => update('city', e.target.value)} placeholder="Paris" style={inputStyle()} />
                </Field>
                <Field label="Pays">
                  <input type="text" value={settings.country || ''} onChange={(e) => update('country', e.target.value)} style={inputStyle()} />
                </Field>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 10 }}>
                <Field label="Téléphone">
                  <input type="tel" value={settings.phone || ''} onChange={(e) => update('phone', e.target.value)} placeholder="06 12 34 56 78" style={inputStyle()} />
                </Field>
                <Field label="Email">
                  <input type="email" value={settings.email || ''} onChange={(e) => update('email', e.target.value)} placeholder="contact@jlstudio.dev" style={inputStyle()} />
                </Field>
              </div>

              <Field label="Site web">
                <input type="url" value={settings.website || ''} onChange={(e) => update('website', e.target.value)} placeholder="https://jlstudio.dev" style={inputStyle()} />
              </Field>

              <Field label="URL du logo">
                <input type="url" value={settings.logoUrl || ''} onChange={(e) => update('logoUrl', e.target.value)} placeholder="https://…/logo.png" style={inputStyle()} />
                {settings.logoUrl && (
                  <div style={{ marginTop: 8, padding: 8, borderRadius: 6, background: 'var(--agency-surface-2)', display: 'inline-block' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={settings.logoUrl} alt="Logo" style={{ maxHeight: 48, maxWidth: 160, display: 'block' }} />
                  </div>
                )}
              </Field>
            </div>
          )}

          {/* Section: Legal */}
          {section === 'legal' && (
            <div>
              <SectionTitle title="Mentions légales" subtitle="Identifiants fiscaux pour les factures." />

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 10 }}>
                <Field label="SIRET">
                  <input
                    type="text" value={settings.siret || ''}
                    onChange={(e) => update('siret', e.target.value)}
                    placeholder="123 456 789 00012" style={inputStyle()}
                  />
                </Field>
                <Field label="Numéro de TVA intra">
                  <input
                    type="text" value={settings.tvaNumber || ''}
                    onChange={(e) => update('tvaNumber', e.target.value)}
                    placeholder="FR 12 345678901" style={inputStyle()}
                  />
                </Field>
              </div>

              <div style={{
                padding: 12, borderRadius: 8,
                background: 'var(--agency-accent-soft)',
                border: '1px solid rgba(59,130,246,0.2)',
                fontSize: 11, color: 'var(--agency-accent)',
                lineHeight: 1.6,
              }}>
                <strong>💡 À savoir</strong> — Les mentions légales obligatoires sur les factures FR
                (pénalités de retard taux légal +10pts, indemnité forfaitaire 40€, conditions de paiement)
                sont déjà ajoutées automatiquement à tous les PDFs de factures générés.
              </div>
            </div>
          )}

          {/* Section: Banking */}
          {section === 'banking' && (
            <div>
              <SectionTitle title="Coordonnées bancaires" subtitle="Affichées sur les factures pour le règlement." />

              <Field label="IBAN">
                <input
                  type="text" value={settings.iban || ''}
                  onChange={(e) => update('iban', e.target.value)}
                  placeholder="FR76 1234 5678 9012 3456 7890 123" style={inputStyle()}
                />
              </Field>

              <Field label="BIC / SWIFT">
                <input
                  type="text" value={settings.bic || ''}
                  onChange={(e) => update('bic', e.target.value)}
                  placeholder="BNPAFRPPXXX" style={inputStyle()}
                />
              </Field>
            </div>
          )}

          {error && (
            <p style={{ marginTop: 16, padding: '10px 14px', borderRadius: 8, background: 'var(--agency-danger-soft)', color: 'var(--agency-danger)', fontSize: 13 }}>
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0 }}>
        {title}
      </h2>
      <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', margin: 0, marginTop: 4 }}>
        {subtitle}
      </p>
    </div>
  );
}

function inputStyle(): React.CSSProperties {
  return {
    width: '100%', padding: '8px 12px',
    border: '1px solid var(--agency-border)', borderRadius: 8,
    fontSize: 13, outline: 'none',
    background: 'var(--agency-surface-2)',
    color: 'var(--agency-ink-1)',
    fontFamily: 'inherit',
  };
}

function cardStyle(): React.CSSProperties {
  return {
    background: 'var(--agency-surface-1)',
    border: '1px solid var(--agency-border)',
    borderRadius: 12,
  };
}

function primaryBtn(): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '8px 16px', borderRadius: 8,
    fontSize: 13, fontWeight: 500, cursor: 'pointer',
    background: 'var(--agency-accent)', color: 'white', border: 'none',
    transition: 'all 0.15s',
  };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{
        display: 'block', fontSize: 11, fontWeight: 600,
        color: 'var(--agency-ink-3)', marginBottom: 6,
        textTransform: 'uppercase', letterSpacing: '0.05em',
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}
