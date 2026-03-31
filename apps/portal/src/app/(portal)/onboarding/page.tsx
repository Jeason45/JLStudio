'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@/components/portal/SidebarContext';
import {
  Users, FileText, Receipt, FileSignature, FolderKanban, Globe, Calendar, Radar,
  Check, ArrowRight, Sparkles, SkipForward,
} from 'lucide-react';

interface ModuleOption {
  key: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const MODULES: ModuleOption[] = [
  {
    key: 'moduleCRM',
    label: 'CRM',
    description: 'Gestion des contacts, interactions et pipeline commercial',
    icon: <Users size={22} />,
  },
  {
    key: 'moduleDevis',
    label: 'Devis',
    description: 'Creation et envoi de devis professionnels',
    icon: <FileText size={22} />,
  },
  {
    key: 'moduleFactures',
    label: 'Factures',
    description: 'Facturation, suivi des paiements et relances',
    icon: <Receipt size={22} />,
  },
  {
    key: 'moduleContrats',
    label: 'Contrats',
    description: 'Gestion des contrats et signature electronique',
    icon: <FileSignature size={22} />,
  },
  {
    key: 'moduleProjets',
    label: 'Projets',
    description: 'Suivi de projets, taches et jalons',
    icon: <FolderKanban size={22} />,
  },
  {
    key: 'moduleCMS',
    label: 'Mon Site',
    description: 'Gestion du contenu du site (produits, articles, galerie...)',
    icon: <Globe size={22} />,
  },
  {
    key: 'moduleCalendrier',
    label: 'Calendrier',
    description: 'Rendez-vous, planning et reservations',
    icon: <Calendar size={22} />,
  },
  {
    key: 'moduleProspection',
    label: 'Prospection',
    description: 'Recherche automatique de prospects par metier et ville',
    icon: <Radar size={22} />,
  },
];

const PRESETS: { label: string; key: string; modules: string[] }[] = [
  {
    label: 'E-commerce',
    key: 'ecommerce',
    modules: ['moduleCRM', 'moduleFactures', 'moduleCMS'],
  },
  {
    label: 'Freelance / Agence',
    key: 'agence',
    modules: ['moduleCRM', 'moduleDevis', 'moduleFactures', 'moduleContrats', 'moduleProjets'],
  },
  {
    label: 'Restaurant / Hotel',
    key: 'restaurant',
    modules: ['moduleCMS', 'moduleCalendrier'],
  },
  {
    label: 'Photographe / Createur',
    key: 'photographe',
    modules: ['moduleCMS', 'moduleDevis', 'moduleFactures'],
  },
  {
    label: 'Beaute / Bien-etre',
    key: 'beaute',
    modules: ['moduleCalendrier', 'moduleCRM', 'moduleFactures'],
  },
  {
    label: 'Conseil / Coaching',
    key: 'conseil',
    modules: ['moduleCRM', 'moduleDevis', 'moduleFactures', 'moduleContrats', 'moduleCalendrier'],
  },
  {
    label: 'Tout activer',
    key: 'all',
    modules: MODULES.map((m) => m.key),
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { setConfig, config } = useSidebar();

  const [selected, setSelected] = useState<Record<string, boolean>>({
    moduleCRM: false,
    moduleDevis: false,
    moduleFactures: false,
    moduleContrats: false,
    moduleProjets: false,
    moduleCMS: false,
    moduleCalendrier: false,
    moduleProspection: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const toggleModule = (key: string) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
    setActivePreset(null);
    setError(null);
  };

  const applyPreset = (preset: typeof PRESETS[number]) => {
    const newSelected: Record<string, boolean> = {};
    MODULES.forEach((m) => {
      newSelected[m.key] = preset.modules.includes(m.key);
    });
    setSelected(newSelected);
    setActivePreset(preset.key);
    setError(null);
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

  const submitOnboarding = async (modules: Record<string, boolean>) => {
    setSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/portal/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modules),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Erreur inconnue' }));
        setError(data.error || 'Erreur lors de la configuration');
        setSaving(false);
        return;
      }

      const updatedConfig = await res.json();
      // Update context so the layout doesn't redirect back to onboarding
      if (config) {
        setConfig({ ...config, ...updatedConfig, onboardingDone: true });
      }
      router.replace('/dashboard');
    } catch (err) {
      setError('Erreur reseau. Verifiez votre connexion.');
      setSaving(false);
    }
  };

  const handleSubmit = () => {
    if (selectedCount === 0) return;
    submitOnboarding(selected);
  };

  const handleSkip = () => {
    // Skip = mark onboarding done with no modules (user can enable later in settings)
    const allFalse: Record<string, boolean> = {};
    MODULES.forEach((m) => { allFalse[m.key] = false; });
    submitOnboarding(allFalse);
  };

  return (
    <div style={{
      maxWidth: '720px', margin: '0 auto', padding: '40px 24px',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: 'var(--accent-light)', color: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          <Sparkles size={24} />
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Configuration du portail
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          Selectionnez les modules a activer pour ce site. Vous pourrez modifier ce choix dans les parametres.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          padding: '10px 14px', borderRadius: '8px', marginBottom: '16px',
          background: 'var(--danger-light, rgba(239,68,68,0.1))',
          color: 'var(--danger, #ef4444)', fontSize: '13px',
          border: '1px solid var(--danger, #ef4444)',
        }}>
          {error}
        </div>
      )}

      {/* Presets */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>
          Presets par secteur
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {PRESETS.map((preset) => (
            <button
              key={preset.key}
              onClick={() => applyPreset(preset)}
              disabled={saving}
              style={{
                padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
                border: activePreset === preset.key ? '1px solid var(--accent)' : '1px solid var(--border)',
                background: activePreset === preset.key ? 'var(--accent-light)' : 'var(--bg-card)',
                color: activePreset === preset.key ? 'var(--accent)' : 'var(--text-secondary)',
                cursor: saving ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
                opacity: saving ? 0.5 : 1,
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modules grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
        {MODULES.map((mod) => {
          const isSelected = selected[mod.key];
          return (
            <button
              key={mod.key}
              onClick={() => toggleModule(mod.key)}
              disabled={saving}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 16px', borderRadius: '12px',
                border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                background: isSelected ? 'var(--accent-light)' : 'var(--bg-card)',
                cursor: saving ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
                textAlign: 'left', width: '100%',
                opacity: saving ? 0.5 : 1,
              }}
            >
              {/* Icon */}
              <div style={{
                width: '42px', height: '42px', borderRadius: '10px',
                background: isSelected ? 'var(--accent)' : 'var(--bg-hover)',
                color: isSelected ? 'white' : 'var(--text-tertiary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.15s',
              }}>
                {mod.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {mod.label}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.3' }}>
                  {mod.description}
                </div>
              </div>

              {/* Checkbox */}
              <div style={{
                width: '24px', height: '24px', borderRadius: '6px',
                border: isSelected ? 'none' : '2px solid var(--border)',
                background: isSelected ? 'var(--accent)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.15s',
              }}>
                {isSelected && <Check size={14} style={{ color: 'white' }} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Submit */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={handleSkip}
          disabled={saving}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 16px', borderRadius: '8px',
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--text-tertiary)', cursor: saving ? 'not-allowed' : 'pointer',
            fontSize: '13px', fontWeight: 500, transition: 'all 0.15s',
            opacity: saving ? 0.5 : 1,
          }}
        >
          <SkipForward size={14} /> Passer
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
            {selectedCount} module{selectedCount !== 1 ? 's' : ''}
          </span>
          <button
            onClick={handleSubmit}
            disabled={saving || selectedCount === 0}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 24px', borderRadius: '10px',
              background: selectedCount > 0 ? 'var(--accent)' : 'var(--bg-hover)',
              color: selectedCount > 0 ? 'white' : 'var(--text-tertiary)',
              border: 'none', cursor: (selectedCount > 0 && !saving) ? 'pointer' : 'not-allowed',
              fontSize: '14px', fontWeight: 600, transition: 'all 0.15s',
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? 'Configuration...' : 'Configurer le portail'}
            {!saving && <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
