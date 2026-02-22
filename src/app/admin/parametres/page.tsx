'use client';

import { useState, useEffect, useRef } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import { Settings, Building2, Scale, UserCheck, CreditCard, FileText, Check, Loader2, Image, Upload } from 'lucide-react';

interface CompanySettings {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  siret: string;
  tvaNumber: string;
  legalForm: string;
  capital: string;
  rcsCity: string;
  representantName: string;
  representantRole: string;
  iban: string;
  bic: string;
  defaultPaymentTerms: string;
  penaltyRate: number;
  logoPath: string;
  updatedAt: string;
}

const LEGAL_FORMS = [
  'Auto-entrepreneur',
  'EURL',
  'SARL',
  'SAS',
  'SASU',
  'SA',
  'SCI',
  'Association',
];

const ROLES = [
  'Gerant',
  'President',
  'Directeur General',
  'Associe',
];

const DEFAULT_SETTINGS: CompanySettings = {
  id: 'default',
  name: '',
  address: '',
  phone: '',
  email: '',
  siret: '',
  tvaNumber: '',
  legalForm: '',
  capital: '',
  rcsCity: '',
  representantName: '',
  representantRole: '',
  iban: '',
  bic: '',
  defaultPaymentTerms: '30 jours',
  penaltyRate: 3.0,
  logoPath: '',
  updatedAt: '',
};

export default function ParametresPage() {
  const { sidebarWidth, isMobile } = useSidebar();
  const [settings, setSettings] = useState<CompanySettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoSuccess, setLogoSuccess] = useState('');
  const [logoError, setLogoError] = useState('');
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => {
        if (!res.ok) throw new Error('Erreur de chargement');
        return res.json();
      })
      .then(data => {
        setSettings({
          ...DEFAULT_SETTINGS,
          ...data,
          penaltyRate: data.penaltyRate ?? 3.0,
          defaultPaymentTerms: data.defaultPaymentTerms || '30 jours',
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const validateSettings = (): boolean => {
    const errs: Record<string, string> = {};
    if (!settings.name.trim()) errs.name = 'Le nom est requis';
    if (!settings.email.trim()) {
      errs.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email.trim())) {
      errs.email = "Le format de l'email est invalide";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validateSettings()) return;
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');

      const data = await res.json();
      setSettings({
        ...DEFAULT_SETTINGS,
        ...data,
        penaltyRate: data.penaltyRate ?? 3.0,
        defaultPaymentTerms: data.defaultPaymentTerms || '30 jours',
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('Impossible de sauvegarder les parametres. Veuillez reessayer.');
    } finally {
      setSaving(false);
    }
  };

  const update = (field: keyof CompanySettings, value: string | number) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoUploading(true);
    setLogoError('');
    setLogoSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/settings/logo', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors du telechargement');
      }

      setSettings(prev => ({ ...prev, logoPath: data.logoPath }));
      setLogoSuccess('Logo mis a jour avec succes');
      setTimeout(() => setLogoSuccess(''), 3000);
    } catch (err) {
      setLogoError(err instanceof Error ? err.message : 'Erreur lors du telechargement du logo');
    } finally {
      setLogoUploading(false);
      // Reset file input so the same file can be re-selected
      if (logoInputRef.current) logoInputRef.current.value = '';
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: 'white',
    transition: 'border-color 0.2s',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    paddingRight: '40px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const fieldErrorStyle: React.CSSProperties = {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '4px',
    display: 'block',
  };

  const inputErrorBorder = '1px solid rgba(239,68,68,0.5)';

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    padding: '28px',
    marginBottom: '24px',
  };

  const sectionHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  };

  const sectionIconStyle = (color: string): React.CSSProperties => ({
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: `${color}15`,
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  });

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'white',
    margin: 0,
  };

  const sectionSubtitleStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.4)',
    marginTop: '2px',
  };

  const gridStyle = (cols: number): React.CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : `repeat(${cols}, 1fr)`,
    gap: '16px',
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
        <AdminSidebar />
        <div style={{ flex: 1, marginLeft: isMobile ? '0' : `${sidebarWidth}px`, transition: 'margin-left 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>
            <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '12px' }} />
            <p style={{ fontSize: '14px' }}>Chargement des parametres...</p>
          </div>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: isMobile ? '0' : `${sidebarWidth}px`, transition: 'margin-left 0.3s ease' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(to right, #0a0e1a, #101d30)', padding: isMobile ? '80px 16px 32px 16px' : '40px 40px 32px 40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)', boxShadow: '0 0 12px rgba(99,139,255,0.4)' }} />
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99,139,255,0.3) 0%, transparent 100%)' }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Parametres</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(99,139,255,0.15)', color: '#638BFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Settings size={28} />
            </div>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'white', margin: 0 }}>Parametres</h1>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: '4px 0 0 0' }}>
                Configurez les informations de votre entreprise
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: isMobile ? '24px 16px' : '40px', background: 'linear-gradient(to right, #0a0e1a, #101d30)', minHeight: 'calc(100vh - 200px)' }}>
          {/* Success banner */}
          {success && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 20px',
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: '12px',
              marginBottom: '24px',
              animation: 'fadeIn 0.3s ease',
            }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={18} style={{ color: '#10b981' }} />
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#10b981', margin: 0 }}>Parametres enregistres</p>
                <p style={{ fontSize: '12px', color: 'rgba(16,185,129,0.7)', margin: '2px 0 0 0' }}>Les modifications ont ete enregistrees avec succes</p>
              </div>
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div style={{
              padding: '16px 20px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '12px',
              marginBottom: '24px',
              fontSize: '14px',
              color: '#ef4444',
            }}>
              {error}
            </div>
          )}

          <div style={{ maxWidth: '900px' }}>
            {/* Section 0: Logo de l'entreprise */}
            <div style={cardStyle}>
              <div style={sectionHeaderStyle}>
                <div style={sectionIconStyle('#ec4899')}>
                  <Image size={20} />
                </div>
                <div>
                  <h2 style={sectionTitleStyle}>Logo de l&apos;entreprise</h2>
                  <p style={sectionSubtitleStyle}>Apparait sur vos devis, factures et documents</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: isMobile ? 'stretch' : 'center', gap: '24px', flexDirection: isMobile ? 'column' : 'row' }}>
                {/* Logo preview */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '12px',
                  border: '2px dashed rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  {settings.logoPath ? (
                    <img
                      src={settings.logoPath}
                      alt="Logo de l'entreprise"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)' }}>
                      <Image size={32} />
                      <p style={{ fontSize: '10px', marginTop: '6px', margin: '6px 0 0 0' }}>Aucun logo</p>
                    </div>
                  )}
                </div>

                {/* Upload controls */}
                <div style={{ flex: 1 }}>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                    onChange={handleLogoUpload}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    disabled={logoUploading}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      background: logoUploading ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)',
                      color: logoUploading ? 'rgba(255,255,255,0.4)' : 'white',
                      fontSize: '13px',
                      fontWeight: 500,
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.12)',
                      cursor: logoUploading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={e => { if (!logoUploading) { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(99,139,255,0.4)'; } }}
                    onMouseOut={e => { e.currentTarget.style.background = logoUploading ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  >
                    {logoUploading ? (
                      <>
                        <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                        Telechargement...
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        Choisir un logo
                      </>
                    )}
                  </button>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '10px', margin: '10px 0 0 0' }}>
                    Formats acceptes : PNG, JPG, SVG. Taille maximum : 2 Mo.
                  </p>

                  {/* Logo success message */}
                  {logoSuccess && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '12px',
                      padding: '8px 14px',
                      background: 'rgba(16,185,129,0.1)',
                      border: '1px solid rgba(16,185,129,0.2)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#10b981',
                      animation: 'fadeIn 0.3s ease',
                    }}>
                      <Check size={14} />
                      {logoSuccess}
                    </div>
                  )}

                  {/* Logo error message */}
                  {logoError && (
                    <div style={{
                      marginTop: '12px',
                      padding: '8px 14px',
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#ef4444',
                      animation: 'fadeIn 0.3s ease',
                    }}>
                      {logoError}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 1: Informations de l'entreprise */}
            <div style={cardStyle}>
              <div style={sectionHeaderStyle}>
                <div style={sectionIconStyle('#638BFF')}>
                  <Building2 size={20} />
                </div>
                <div>
                  <h2 style={sectionTitleStyle}>Informations de l&apos;entreprise</h2>
                  <p style={sectionSubtitleStyle}>Coordonnees et identifiants legaux</p>
                </div>
              </div>

              <div style={gridStyle(2)}>
                <div>
                  <label style={labelStyle}>Nom *</label>
                  <input
                    style={{ ...inputStyle, ...(fieldErrors.name ? { border: inputErrorBorder } : {}) }}
                    placeholder="JL Studio"
                    value={settings.name}
                    onChange={e => { update('name', e.target.value); if (fieldErrors.name) setFieldErrors(prev => { const { name, ...rest } = prev; return rest; }); }}
                    onFocus={e => { e.currentTarget.style.borderColor = fieldErrors.name ? 'rgba(239,68,68,0.5)' : 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = fieldErrors.name ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'; }}
                  />
                  {fieldErrors.name && <span style={fieldErrorStyle}>{fieldErrors.name}</span>}
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    style={{ ...inputStyle, ...(fieldErrors.email ? { border: inputErrorBorder } : {}) }}
                    type="email"
                    placeholder="contact@jlstudio.fr"
                    value={settings.email}
                    onChange={e => { update('email', e.target.value); if (fieldErrors.email) setFieldErrors(prev => { const { email, ...rest } = prev; return rest; }); }}
                    onFocus={e => { e.currentTarget.style.borderColor = fieldErrors.email ? 'rgba(239,68,68,0.5)' : 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = fieldErrors.email ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'; }}
                  />
                  {fieldErrors.email && <span style={fieldErrorStyle}>{fieldErrors.email}</span>}
                </div>
              </div>

              <div style={{ ...gridStyle(1), marginTop: '16px' }}>
                <div>
                  <label style={labelStyle}>Adresse</label>
                  <input
                    style={inputStyle}
                    placeholder="12 rue de la Paix, 75000 Paris"
                    value={settings.address}
                    onChange={e => update('address', e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                </div>
              </div>

              <div style={{ ...gridStyle(3), marginTop: '16px' }}>
                <div>
                  <label style={labelStyle}>Telephone</label>
                  <input
                    style={inputStyle}
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={settings.phone}
                    onChange={e => update('phone', e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>SIRET</label>
                  <input
                    style={inputStyle}
                    placeholder="123 456 789 00012"
                    value={settings.siret}
                    onChange={e => update('siret', e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>N&deg; TVA</label>
                  <input
                    style={inputStyle}
                    placeholder="FR 12 345678901"
                    value={settings.tvaNumber}
                    onChange={e => update('tvaNumber', e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Forme juridique */}
            <div style={cardStyle}>
              <div style={sectionHeaderStyle}>
                <div style={sectionIconStyle('#a78bfa')}>
                  <Scale size={20} />
                </div>
                <div>
                  <h2 style={sectionTitleStyle}>Forme juridique</h2>
                  <p style={sectionSubtitleStyle}>Statut legal et capital de la societe</p>
                </div>
              </div>

              <div style={gridStyle(3)}>
                <div>
                  <label style={labelStyle}>Forme juridique</label>
                  <select
                    style={selectStyle}
                    value={settings.legalForm}
                    onChange={e => update('legalForm', e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  >
                    <option value="" style={{ background: '#0d1321', color: 'rgba(255,255,255,0.5)' }}>Selectionner...</option>
                    {LEGAL_FORMS.map(form => (
                      <option key={form} value={form} style={{ background: '#0d1321', color: 'white' }}>{form}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Capital social</label>
                  <input
                    style={inputStyle}
                    placeholder="1 000 EUR"
                    value={settings.capital}
                    onChange={e => update('capital', e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Ville RCS</label>
                  <input
                    style={inputStyle}
                    placeholder="Paris"
                    value={settings.rcsCity}
                    onChange={e => update('rcsCity', e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Representant legal */}
            <div style={cardStyle}>
              <div style={sectionHeaderStyle}>
                <div style={sectionIconStyle('#34d399')}>
                  <UserCheck size={20} />
                </div>
                <div>
                  <h2 style={sectionTitleStyle}>Representant legal</h2>
                  <p style={sectionSubtitleStyle}>Personne responsable de la societe</p>
                </div>
              </div>

              <div style={gridStyle(2)}>
                <div>
                  <label style={labelStyle}>Nom du representant</label>
                  <input
                    style={inputStyle}
                    placeholder="Jean Dupont"
                    value={settings.representantName}
                    onChange={e => update('representantName', e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Fonction</label>
                  <select
                    style={selectStyle}
                    value={settings.representantRole}
                    onChange={e => update('representantRole', e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  >
                    <option value="" style={{ background: '#0d1321', color: 'rgba(255,255,255,0.5)' }}>Selectionner...</option>
                    {ROLES.map(role => (
                      <option key={role} value={role} style={{ background: '#0d1321', color: 'white' }}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Coordonnees bancaires */}
            <div style={cardStyle}>
              <div style={sectionHeaderStyle}>
                <div style={sectionIconStyle('#f59e0b')}>
                  <CreditCard size={20} />
                </div>
                <div>
                  <h2 style={sectionTitleStyle}>Coordonnees bancaires</h2>
                  <p style={sectionSubtitleStyle}>Informations pour les virements et paiements</p>
                </div>
              </div>

              <div style={gridStyle(2)}>
                <div>
                  <label style={labelStyle}>IBAN</label>
                  <input
                    style={inputStyle}
                    placeholder="FR76 1234 5678 9012 3456 7890 123"
                    value={settings.iban}
                    onChange={e => update('iban', e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>BIC</label>
                  <input
                    style={inputStyle}
                    placeholder="BNPAFRPPXXX"
                    value={settings.bic}
                    onChange={e => update('bic', e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Conditions de paiement */}
            <div style={cardStyle}>
              <div style={sectionHeaderStyle}>
                <div style={sectionIconStyle('#60a5fa')}>
                  <FileText size={20} />
                </div>
                <div>
                  <h2 style={sectionTitleStyle}>Conditions de paiement</h2>
                  <p style={sectionSubtitleStyle}>Delais et penalites appliques aux factures</p>
                </div>
              </div>

              <div style={gridStyle(2)}>
                <div>
                  <label style={labelStyle}>Conditions de reglement par defaut</label>
                  <input
                    style={inputStyle}
                    placeholder="30 jours"
                    value={settings.defaultPaymentTerms}
                    onChange={e => update('defaultPaymentTerms', e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Taux de penalites de retard (%)</label>
                  <input
                    style={inputStyle}
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="3.0"
                    value={settings.penaltyRate}
                    onChange={e => update('penaltyRate', parseFloat(e.target.value) || 0)}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                </div>
              </div>
            </div>

            {/* Save button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px', paddingBottom: '40px' }}>
              {settings.updatedAt && (
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginRight: 'auto' }}>
                  Derniere mise a jour : {new Date(settings.updatedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </div>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 32px',
                  background: saving ? 'rgba(99,139,255,0.5)' : 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  borderRadius: '12px',
                  border: 'none',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: saving ? 'none' : '0 4px 16px rgba(99,139,255,0.3)',
                }}
                onMouseOver={e => { if (!saving) { e.currentTarget.style.boxShadow = '0 6px 24px rgba(99,139,255,0.4)'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                onMouseOut={e => { e.currentTarget.style.boxShadow = saving ? 'none' : '0 4px 16px rgba(99,139,255,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {saving ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Sauvegarder les parametres
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
