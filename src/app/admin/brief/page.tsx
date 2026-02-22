'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';

// ── Types ──
interface Contact {
  id: string;
  name: string;
  email: string | null;
  companyName: string | null;
  type: string;
  status: string;
}

interface BriefType {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  specificFields: SpecificField[];
}

interface SpecificField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'url';
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface BriefFormData {
  // Common
  contactId: string;
  projectName: string;
  objectives: string;
  targetAudience: string;
  budget: string;
  deadline: string;
  features: string[];
  inspirations: string;
  notes: string;
  // Specific (dynamic per type)
  [key: string]: string | string[] | number | undefined;
}

// ── Brief type definitions ──
const BRIEF_TYPES: BriefType[] = [
  {
    id: 'site-vitrine',
    title: 'Site Vitrine',
    description: 'Site web corporate ou personnel pour presenter votre activite, vos services et votre image de marque.',
    icon: '🌐',
    color: '#638BFF',
    specificFields: [
      { key: 'pageCount', label: 'Nombre de pages estimees', type: 'select', options: [
        { value: '1-5', label: '1 a 5 pages' },
        { value: '5-10', label: '5 a 10 pages' },
        { value: '10-20', label: '10 a 20 pages' },
        { value: '20+', label: 'Plus de 20 pages' },
      ]},
      { key: 'existingContent', label: 'Contenu existant (textes, images)', type: 'select', options: [
        { value: 'oui', label: 'Oui, tout est pret' },
        { value: 'partiel', label: 'Partiellement' },
        { value: 'non', label: 'Non, a creer entierement' },
      ]},
    ],
  },
  {
    id: 'e-commerce',
    title: 'E-commerce',
    description: 'Boutique en ligne complete avec catalogue produits, panier, paiement securise et gestion des commandes.',
    icon: '🛒',
    color: '#10b981',
    specificFields: [
      { key: 'productCount', label: 'Nombre de produits estimes', type: 'select', options: [
        { value: '1-50', label: '1 a 50 produits' },
        { value: '50-200', label: '50 a 200 produits' },
        { value: '200-1000', label: '200 a 1000 produits' },
        { value: '1000+', label: 'Plus de 1000 produits' },
      ]},
      { key: 'paymentMethods', label: 'Moyens de paiement souhaites', type: 'text', placeholder: 'Ex: Carte bancaire, PayPal, virement...' },
      { key: 'shippingNeeds', label: 'Besoins en livraison', type: 'textarea', placeholder: 'Decrivez vos besoins de livraison (zones, transporteurs, tarifs...)' },
    ],
  },
  {
    id: 'application-web',
    title: 'Application Web',
    description: 'Application web sur mesure avec fonctionnalites avancees, gestion utilisateurs et logique metier specifique.',
    icon: '⚡',
    color: '#a78bfa',
    specificFields: [
      { key: 'estimatedUsers', label: "Nombre d'utilisateurs estimes", type: 'select', options: [
        { value: '1-100', label: '1 a 100 utilisateurs' },
        { value: '100-1000', label: '100 a 1000 utilisateurs' },
        { value: '1000-10000', label: '1000 a 10 000 utilisateurs' },
        { value: '10000+', label: 'Plus de 10 000 utilisateurs' },
      ]},
      { key: 'specificFeatures', label: 'Fonctionnalites specifiques requises', type: 'textarea', placeholder: 'Decrivez les fonctionnalites metier specifiques (API, integrations, automatisations...)' },
    ],
  },
  {
    id: 'refonte',
    title: 'Refonte',
    description: 'Modernisation de votre site existant : refonte design, technique ou complete selon vos besoins.',
    icon: '🔄',
    color: '#f59e0b',
    specificFields: [
      { key: 'currentSiteUrl', label: 'URL du site actuel', type: 'url', placeholder: 'https://www.votre-site.fr' },
      { key: 'identifiedProblems', label: 'Problemes identifies avec le design actuel', type: 'textarea', placeholder: 'Decrivez les problemes visuels ou UX que vous souhaitez corriger...' },
      { key: 'currentStack', label: 'Stack technique actuelle', type: 'text', placeholder: 'Ex: WordPress, PHP, MySQL...' },
      { key: 'technicalProblems', label: 'Problemes techniques identifies', type: 'textarea', placeholder: 'Decrivez les problemes techniques (lenteur, securite, bugs, maintenance...)' },
      { key: 'redesignReasons', label: 'Raisons principales de la refonte', type: 'textarea', placeholder: 'Expliquez pourquoi une refonte complete est necessaire...' },
    ],
  },
];

const COMMON_FEATURES = [
  { key: 'contact_form', label: 'Formulaire de contact' },
  { key: 'blog', label: 'Blog / Actualites' },
  { key: 'newsletter', label: 'Newsletter' },
  { key: 'multilingual', label: 'Multilangue' },
  { key: 'member_area', label: 'Espace membre' },
  { key: 'seo', label: 'Optimisation SEO' },
  { key: 'analytics', label: 'Analytics / Statistiques' },
  { key: 'social_media', label: 'Integration reseaux sociaux' },
  { key: 'chat', label: 'Chat en direct' },
  { key: 'crm_integration', label: 'Integration CRM' },
  { key: 'responsive', label: 'Design responsive' },
  { key: 'accessibility', label: 'Accessibilite (RGAA/WCAG)' },
];

const REFONTE_SCOPES = [
  { value: 'design', label: 'Design', description: 'Modernisation du design et de l\'experience utilisateur sans modifier la structure technique.', icon: '🎨' },
  { value: 'technique', label: 'Technique', description: 'Migration ou refactorisation technique pour ameliorer performances, securite et maintenabilite.', icon: '🔧' },
  { value: 'complete', label: 'Complete', description: 'Refonte integrale : nouveau design, nouvelle architecture technique et nouveau contenu.', icon: '🔄' },
];

// Fields visible per refonte scope
const REFONTE_FIELDS_BY_SCOPE: Record<string, string[]> = {
  design: ['currentSiteUrl', 'identifiedProblems'],
  technique: ['currentStack', 'technicalProblems'],
  complete: ['currentSiteUrl', 'redesignReasons'],
};

const BUDGET_OPTIONS = [
  { value: '<2000', label: 'Moins de 2 000 EUR' },
  { value: '2000-5000', label: '2 000 - 5 000 EUR' },
  { value: '5000-10000', label: '5 000 - 10 000 EUR' },
  { value: '>10000', label: 'Plus de 10 000 EUR' },
];

const STEP_LABELS = [
  'Client & Projet',
  'Objectifs',
  'Fonctionnalites',
  'Details specifiques',
  'Budget & Planning',
  'Recapitulatif',
];

// ── Helper: initial form data ──
function getInitialFormData(): BriefFormData {
  return {
    contactId: '',
    projectName: '',
    objectives: '',
    targetAudience: '',
    budget: '',
    deadline: '',
    features: [],
    inspirations: '',
    notes: '',
  };
}

// ── Budget value to number for project creation ──
function budgetToNumber(budget: string): number | null {
  switch (budget) {
    case '<2000': return 1500;
    case '2000-5000': return 3500;
    case '5000-10000': return 7500;
    case '>10000': return 12000;
    default: return null;
  }
}

export default function BriefPage() {
  const { sidebarWidth, isMobile } = useSidebar();

  // State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [selectedType, setSelectedType] = useState<BriefType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BriefFormData>(getInitialFormData());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [createProject, setCreateProject] = useState(true);
  const [error, setError] = useState('');

  // Fetch contacts
  useEffect(() => {
    fetch('/api/contacts')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setContacts(Array.isArray(data) ? data : []);
        setLoadingContacts(false);
      })
      .catch(() => setLoadingContacts(false));
  }, []);

  // ── Handlers ──
  const handleSelectType = (type: BriefType) => {
    setSelectedType(type);
    setCurrentStep(0);
    setFormData(getInitialFormData());
    setSubmitted(false);
    setError('');
  };

  const handleBack = () => {
    if (currentStep === 0) {
      setSelectedType(null);
      setFormData(getInitialFormData());
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const updateField = (key: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleFeature = (featureKey: string) => {
    setFormData(prev => {
      const features = prev.features.includes(featureKey)
        ? prev.features.filter(f => f !== featureKey)
        : [...prev.features, featureKey];
      return { ...prev, features };
    });
  };

  const handleSubmit = async () => {
    if (!selectedType) return;
    setSubmitting(true);
    setError('');

    try {
      // Build display title (include refonte scope if applicable)
      const isRefonte = selectedType.id === 'refonte';
      const refonteScope = (formData.refonteScope as string) || '';
      const refonteScopeLabel = isRefonte && refonteScope
        ? REFONTE_SCOPES.find(s => s.value === refonteScope)?.label || ''
        : '';
      const displayTitle = isRefonte && refonteScopeLabel
        ? `${selectedType.title} ${refonteScopeLabel}`
        : selectedType.title;
      const projectTypeId = isRefonte && refonteScope
        ? `refonte-${refonteScope}`
        : selectedType.id;

      // 1. Save brief as interaction (type='brief') on the contact
      if (formData.contactId) {
        const briefContent = JSON.stringify({
          briefType: projectTypeId,
          briefTitle: displayTitle,
          ...formData,
          submittedAt: new Date().toISOString(),
        });

        await fetch('/api/interactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contactId: formData.contactId,
            type: 'brief',
            subject: `Brief: ${formData.projectName || displayTitle}`,
            content: briefContent,
          }),
        });
      }

      // 2. Optionally create a project from the brief
      if (createProject && formData.projectName) {
        const projectData: Record<string, unknown> = {
          name: formData.projectName,
          description: formData.objectives,
          projectType: projectTypeId,
          status: 'planification',
          priority: 'medium',
          notes: `Brief ${displayTitle}\n\nPublic cible: ${formData.targetAudience}\nBudget: ${formData.budget}\nInspirations: ${formData.inspirations}\n\nNotes: ${formData.notes}`,
          estimatedBudget: budgetToNumber(formData.budget),
        };

        if (formData.contactId) {
          projectData.contactId = formData.contactId;
        }

        if (formData.deadline) {
          projectData.endDate = formData.deadline;
        }

        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        });
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting brief:', err);
      setError('Une erreur est survenue lors de la soumission du brief.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Validation per step ──
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0: return formData.projectName.trim().length > 0;
      case 1: return formData.objectives.trim().length > 0;
      case 2: return true; // Features are optional
      case 3: return true; // Specific fields are optional
      case 4: return true; // Budget/deadline are optional
      case 5: return true; // Summary
      default: return true;
    }
  };

  // ── Shared styles ──
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'rgba(255,255,255,0.06)',
    color: 'white',
    transition: 'border-color 0.2s, background-color 0.2s',
    fontFamily: 'inherit',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  };

  const fieldGroupStyle: React.CSSProperties = {
    marginBottom: '24px',
  };

  // ── Render: Landing cards ──
  const renderLanding = () => (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)', boxShadow: '0 0 12px rgba(99,139,255,0.4)' }} />
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99,139,255,0.3) 0%, transparent 100%)' }} />
        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Briefs</span>
      </div>

      <h1 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
        Nouveau Brief Projet
      </h1>
      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', marginBottom: '40px', maxWidth: '600px', lineHeight: 1.6 }}>
        Selectionnez le type de projet pour demarrer le recueil des besoins client. Chaque brief est adapte aux specificites du projet.
      </p>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '20px',
      }}>
        {BRIEF_TYPES.map(type => (
          <div
            key={type.id}
            onClick={() => handleSelectType(type)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '32px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = type.color;
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 12px 40px ${type.color}20`;
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Accent glow */}
            <div style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '120px',
              height: '120px',
              background: `radial-gradient(circle, ${type.color}15 0%, transparent 70%)`,
              borderRadius: '50%',
              pointerEvents: 'none',
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: `${type.color}18`,
                border: `1px solid ${type.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}>
                {type.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '2px' }}>
                  {type.title}
                </h3>
                <span style={{ fontSize: '11px', color: type.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {type.specificFields.length} champ{type.specificFields.length > 1 ? 's' : ''} specifique{type.specificFields.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>
              {type.description}
            </p>

            <div style={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: type.color,
              fontSize: '13px',
              fontWeight: 600,
            }}>
              <span>Commencer le brief</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Render: Progress bar ──
  const renderProgress = () => {
    if (!selectedType) return null;
    return (
      <div style={{ marginBottom: '40px' }}>
        {/* Steps indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '4px' : '0', marginBottom: '16px', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
          {STEP_LABELS.map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: isMobile ? 'none' : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 700,
                  background: i <= currentStep
                    ? `linear-gradient(135deg, ${selectedType.color} 0%, ${selectedType.color}cc 100%)`
                    : 'rgba(255,255,255,0.08)',
                  color: i <= currentStep ? 'white' : 'rgba(255,255,255,0.4)',
                  border: i === currentStep ? `2px solid ${selectedType.color}` : '2px solid transparent',
                  boxShadow: i === currentStep ? `0 0 16px ${selectedType.color}40` : 'none',
                  transition: 'all 0.3s',
                  flexShrink: 0,
                }}>
                  {i < currentStep ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                {!isMobile && (
                  <span style={{
                    fontSize: '12px',
                    fontWeight: i === currentStep ? 700 : 500,
                    color: i <= currentStep ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                    whiteSpace: 'nowrap',
                  }}>
                    {label}
                  </span>
                )}
              </div>
              {i < STEP_LABELS.length - 1 && !isMobile && (
                <div style={{
                  flex: 1,
                  height: '2px',
                  margin: '0 12px',
                  background: i < currentStep
                    ? `linear-gradient(90deg, ${selectedType.color}, ${selectedType.color}80)`
                    : 'rgba(255,255,255,0.1)',
                  borderRadius: '1px',
                  transition: 'background 0.3s',
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile label */}
        {isMobile && (
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: selectedType.color }}>
              {STEP_LABELS[currentStep]}
            </span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginLeft: '8px' }}>
              ({currentStep + 1}/{STEP_LABELS.length})
            </span>
          </div>
        )}
      </div>
    );
  };

  // ── Render: Step 0 - Client & Project ──
  const renderStep0 = () => (
    <div>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
        Client & Projet
      </h2>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
        Identifiez le client et nommez le projet.
      </p>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>Client associe</label>
        <select
          value={formData.contactId}
          onChange={e => updateField('contactId', e.target.value)}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          <option value="" style={{ backgroundColor: '#0d1321' }}>-- Selectionner un client (optionnel) --</option>
          {loadingContacts ? (
            <option disabled style={{ backgroundColor: '#0d1321' }}>Chargement...</option>
          ) : (
            contacts.map(c => (
              <option key={c.id} value={c.id} style={{ backgroundColor: '#0d1321' }}>
                {c.companyName ? `${c.companyName} (${c.name})` : c.name}
                {c.email ? ` - ${c.email}` : ''}
              </option>
            ))
          )}
        </select>
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>
          Nom du projet <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          type="text"
          value={formData.projectName}
          onChange={e => updateField('projectName', e.target.value)}
          placeholder="Ex: Refonte site web Entreprise XYZ"
          style={inputStyle}
        />
      </div>
    </div>
  );

  // ── Render: Step 1 - Objectives ──
  const renderStep1 = () => (
    <div>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
        Objectifs du projet
      </h2>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
        Decrivez les objectifs et le public cible.
      </p>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>
          Objectifs principaux <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <textarea
          value={formData.objectives}
          onChange={e => updateField('objectives', e.target.value)}
          placeholder="Quels sont les objectifs principaux de ce projet ? Que souhaitez-vous accomplir ?"
          rows={5}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
        />
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>Public cible</label>
        <input
          type="text"
          value={formData.targetAudience}
          onChange={e => updateField('targetAudience', e.target.value)}
          placeholder="Ex: Professionnels B2B, 25-45 ans, secteur immobilier..."
          style={inputStyle}
        />
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>Inspirations / References</label>
        <textarea
          value={formData.inspirations}
          onChange={e => updateField('inspirations', e.target.value)}
          placeholder="Sites web ou applications qui vous inspirent, avec URL si possible..."
          rows={3}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
        />
      </div>
    </div>
  );

  // ── Render: Step 2 - Features ──
  const renderStep2 = () => (
    <div>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
        Fonctionnalites souhaitees
      </h2>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
        Selectionnez les fonctionnalites a integrer au projet.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '12px',
      }}>
        {COMMON_FEATURES.map(feature => {
          const isSelected = formData.features.includes(feature.key);
          return (
            <div
              key={feature.key}
              onClick={() => toggleFeature(feature.key)}
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                border: `1px solid ${isSelected ? (selectedType?.color || '#638BFF') + '80' : 'rgba(255,255,255,0.1)'}`,
                background: isSelected ? `${selectedType?.color || '#638BFF'}15` : 'rgba(255,255,255,0.04)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => {
                if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              }}
              onMouseOut={e => {
                if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '6px',
                border: `2px solid ${isSelected ? (selectedType?.color || '#638BFF') : 'rgba(255,255,255,0.3)'}`,
                background: isSelected ? (selectedType?.color || '#638BFF') : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}>
                {isSelected && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: isSelected ? 600 : 500,
                color: isSelected ? 'white' : 'rgba(255,255,255,0.7)',
              }}>
                {feature.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Render: Step 3 - Type-specific fields ──
  const renderStep3 = () => {
    if (!selectedType) return null;

    const isRefonte = selectedType.id === 'refonte';
    const refonteScope = (formData.refonteScope as string) || '';
    const visibleFieldKeys = isRefonte && refonteScope
      ? REFONTE_FIELDS_BY_SCOPE[refonteScope] || []
      : null;

    // Filter specific fields: for refonte, only show fields matching the selected scope
    const fieldsToRender = isRefonte && visibleFieldKeys
      ? selectedType.specificFields.filter(f => visibleFieldKeys.includes(f.key))
      : isRefonte
        ? [] // Refonte with no scope selected: show no specific fields yet
        : selectedType.specificFields;

    return (
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
          Details specifiques - {selectedType.title}
        </h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
          Informations supplementaires specifiques a ce type de projet.
        </p>

        {/* Refonte scope selector */}
        {isRefonte && (
          <div style={{ marginBottom: '32px' }}>
            <label style={labelStyle}>Type de refonte</label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '12px',
            }}>
              {REFONTE_SCOPES.map(scope => {
                const isSelected = refonteScope === scope.value;
                return (
                  <div
                    key={scope.value}
                    onClick={() => updateField('refonteScope', scope.value)}
                    style={{
                      padding: '20px',
                      borderRadius: '14px',
                      border: `1px solid ${isSelected ? selectedType.color + '80' : 'rgba(255,255,255,0.1)'}`,
                      background: isSelected ? `${selectedType.color}15` : 'rgba(255,255,255,0.04)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center',
                    }}
                    onMouseOver={e => {
                      if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                    }}
                    onMouseOut={e => {
                      if (!isSelected) e.currentTarget.style.borderColor = isSelected ? `${selectedType.color}80` : 'rgba(255,255,255,0.1)';
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{scope.icon}</div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: isSelected ? 'white' : 'rgba(255,255,255,0.8)',
                      marginBottom: '6px',
                    }}>
                      {scope.label}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.5,
                    }}>
                      {scope.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {fieldsToRender.map(field => (
          <div key={field.key} style={fieldGroupStyle}>
            <label style={labelStyle}>{field.label}</label>
            {field.type === 'select' && field.options ? (
              <select
                value={(formData[field.key] as string) || ''}
                onChange={e => updateField(field.key, e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="" style={{ backgroundColor: '#0d1321' }}>-- Choisir --</option>
                {field.options.map(opt => (
                  <option key={opt.value} value={opt.value} style={{ backgroundColor: '#0d1321' }}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                value={(formData[field.key] as string) || ''}
                onChange={e => updateField(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={4}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
              />
            ) : (
              <input
                type={field.type === 'url' ? 'url' : 'text'}
                value={(formData[field.key] as string) || ''}
                onChange={e => updateField(field.key, e.target.value)}
                placeholder={field.placeholder}
                style={inputStyle}
              />
            )}
          </div>
        ))}

        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Notes supplementaires</label>
          <textarea
            value={formData.notes}
            onChange={e => updateField('notes', e.target.value)}
            placeholder="Toute information complementaire que vous souhaitez partager..."
            rows={4}
            style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
          />
        </div>
      </div>
    );
  };

  // ── Render: Step 4 - Budget & Timeline ──
  const renderStep4 = () => (
    <div>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
        Budget & Planning
      </h2>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
        Definissez votre enveloppe budgetaire et les delais souhaites.
      </p>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>Budget estime</label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '12px',
        }}>
          {BUDGET_OPTIONS.map(opt => {
            const isSelected = formData.budget === opt.value;
            return (
              <div
                key={opt.value}
                onClick={() => updateField('budget', opt.value)}
                style={{
                  padding: '18px 20px',
                  borderRadius: '12px',
                  border: `1px solid ${isSelected ? (selectedType?.color || '#638BFF') + '80' : 'rgba(255,255,255,0.1)'}`,
                  background: isSelected ? `${selectedType?.color || '#638BFF'}15` : 'rgba(255,255,255,0.04)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => {
                  if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                }}
                onMouseOut={e => {
                  if (!isSelected) e.currentTarget.style.borderColor = isSelected ? `${selectedType?.color || '#638BFF'}80` : 'rgba(255,255,255,0.1)';
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `2px solid ${isSelected ? (selectedType?.color || '#638BFF') : 'rgba(255,255,255,0.3)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {isSelected && (
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: selectedType?.color || '#638BFF',
                    }} />
                  )}
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: isSelected ? 600 : 500,
                  color: isSelected ? 'white' : 'rgba(255,255,255,0.7)',
                }}>
                  {opt.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>Deadline souhaitee</label>
        <input
          type="date"
          value={formData.deadline}
          onChange={e => updateField('deadline', e.target.value)}
          style={{ ...inputStyle, colorScheme: 'dark' }}
        />
      </div>
    </div>
  );

  // ── Render: Step 5 - Summary ──
  const renderStep5 = () => {
    if (!selectedType) return null;

    const selectedContact = contacts.find(c => c.id === formData.contactId);
    const selectedFeatures = COMMON_FEATURES.filter(f => formData.features.includes(f.key));
    const budgetLabel = BUDGET_OPTIONS.find(b => b.value === formData.budget)?.label || 'Non defini';

    const summaryBlockStyle: React.CSSProperties = {
      background: 'rgba(255,255,255,0.04)',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '16px',
      border: '1px solid rgba(255,255,255,0.08)',
    };

    const summaryLabelStyle: React.CSSProperties = {
      fontSize: '11px',
      fontWeight: 700,
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      marginBottom: '8px',
    };

    const summaryValueStyle: React.CSSProperties = {
      fontSize: '14px',
      color: 'white',
      lineHeight: 1.6,
    };

    return (
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
          Recapitulatif du Brief
        </h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
          Verifiez les informations avant de soumettre.
        </p>

        {/* Type badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 20px',
          borderRadius: '12px',
          background: `${selectedType.color}15`,
          border: `1px solid ${selectedType.color}40`,
          marginBottom: '24px',
        }}>
          <span style={{ fontSize: '20px' }}>{selectedType.icon}</span>
          <span style={{ fontSize: '15px', fontWeight: 700, color: selectedType.color }}>
            {selectedType.title}
            {selectedType.id === 'refonte' && formData.refonteScope && (
              <> - {REFONTE_SCOPES.find(s => s.value === formData.refonteScope)?.label}</>
            )}
          </span>
        </div>

        {/* Client & Project */}
        <div style={summaryBlockStyle}>
          <div style={summaryLabelStyle}>Client & Projet</div>
          <div style={summaryValueStyle}>
            <strong>Projet:</strong> {formData.projectName || '(Non defini)'}<br />
            <strong>Client:</strong> {selectedContact
              ? (selectedContact.companyName ? `${selectedContact.companyName} (${selectedContact.name})` : selectedContact.name)
              : '(Aucun client selectionne)'}
          </div>
        </div>

        {/* Objectives */}
        <div style={summaryBlockStyle}>
          <div style={summaryLabelStyle}>Objectifs</div>
          <div style={summaryValueStyle}>
            {formData.objectives || '(Non defini)'}
          </div>
          {formData.targetAudience && (
            <div style={{ ...summaryValueStyle, marginTop: '8px' }}>
              <strong>Public cible:</strong> {formData.targetAudience}
            </div>
          )}
        </div>

        {/* Features */}
        {selectedFeatures.length > 0 && (
          <div style={summaryBlockStyle}>
            <div style={summaryLabelStyle}>Fonctionnalites ({selectedFeatures.length})</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {selectedFeatures.map(f => (
                <span key={f.key} style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: `${selectedType.color}15`,
                  color: selectedType.color,
                  border: `1px solid ${selectedType.color}30`,
                }}>
                  {f.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Specific fields */}
        {(() => {
          const isRefonte = selectedType.id === 'refonte';
          const scope = (formData.refonteScope as string) || '';
          const visibleKeys = isRefonte && scope ? REFONTE_FIELDS_BY_SCOPE[scope] || [] : null;
          const fieldsForSummary = isRefonte && visibleKeys
            ? selectedType.specificFields.filter(f => visibleKeys.includes(f.key))
            : selectedType.specificFields;

          return fieldsForSummary.some(f => formData[f.key]) ? (
            <div style={summaryBlockStyle}>
              <div style={summaryLabelStyle}>Details specifiques</div>
              <div style={summaryValueStyle}>
                {fieldsForSummary.map(f => {
                  const val = formData[f.key] as string;
                  if (!val) return null;
                  const displayVal = f.type === 'select' && f.options
                    ? f.options.find(o => o.value === val)?.label || val
                    : val;
                  return (
                    <div key={f.key} style={{ marginBottom: '6px' }}>
                      <strong>{f.label}:</strong> {displayVal}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null;
        })()}

        {/* Budget & Timeline */}
        <div style={summaryBlockStyle}>
          <div style={summaryLabelStyle}>Budget & Planning</div>
          <div style={summaryValueStyle}>
            <strong>Budget:</strong> {budgetLabel}<br />
            <strong>Deadline:</strong> {formData.deadline
              ? new Date(formData.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
              : '(Non definie)'}
          </div>
        </div>

        {/* Inspirations */}
        {formData.inspirations && (
          <div style={summaryBlockStyle}>
            <div style={summaryLabelStyle}>Inspirations</div>
            <div style={{ ...summaryValueStyle, whiteSpace: 'pre-wrap' }}>
              {formData.inspirations}
            </div>
          </div>
        )}

        {/* Notes */}
        {formData.notes && (
          <div style={summaryBlockStyle}>
            <div style={summaryLabelStyle}>Notes supplementaires</div>
            <div style={{ ...summaryValueStyle, whiteSpace: 'pre-wrap' }}>
              {formData.notes}
            </div>
          </div>
        )}

        {/* Create project option */}
        <div style={{
          marginTop: '24px',
          padding: '20px',
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div
            onClick={() => setCreateProject(!createProject)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: '22px',
              height: '22px',
              borderRadius: '6px',
              border: `2px solid ${createProject ? (selectedType.color) : 'rgba(255,255,255,0.3)'}`,
              background: createProject ? selectedType.color : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}>
              {createProject && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <div>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>
                Creer un projet automatiquement
              </span>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: '4px 0 0 0' }}>
                Un projet sera cree dans le gestionnaire avec les informations du brief
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            marginTop: '16px',
            padding: '14px 20px',
            borderRadius: '10px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            color: '#ef4444',
            fontSize: '14px',
          }}>
            {error}
          </div>
        )}
      </div>
    );
  };

  // ── Render: Success ──
  const renderSuccess = () => {
    if (!selectedType) return null;
    return (
      <div style={{
        textAlign: 'center',
        padding: isMobile ? '40px 20px' : '80px 40px',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `${selectedType.color}20`,
          border: `2px solid ${selectedType.color}60`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={selectedType.color} strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
          Brief soumis avec succes
        </h2>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.6 }}>
          Le brief pour <strong style={{ color: selectedType.color }}>{formData.projectName}</strong> a ete enregistre.
          {createProject && ' Un projet a ete cree dans le gestionnaire.'}
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              setSelectedType(null);
              setFormData(getInitialFormData());
              setSubmitted(false);
              setCurrentStep(0);
            }}
            style={{
              padding: '14px 28px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.08)',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
          >
            Nouveau brief
          </button>

          {createProject && (
            <button
              onClick={() => window.location.href = '/admin/projets'}
              style={{
                padding: '14px 28px',
                borderRadius: '12px',
                border: 'none',
                background: `linear-gradient(135deg, ${selectedType.color} 0%, ${selectedType.color}cc 100%)`,
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: `0 4px 16px ${selectedType.color}40`,
              }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Voir les projets
            </button>
          )}
        </div>
      </div>
    );
  };

  // ── Render current step content ──
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderStep0();
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return null;
    }
  };

  // ── Main render ──
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)',
    }}>
      <AdminSidebar />

      <div style={{
        flex: 1,
        marginLeft: isMobile ? '0' : `${sidebarWidth}px`,
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh',
        padding: isMobile ? '80px 16px 40px 16px' : '40px',
      }}>
        {!selectedType ? (
          renderLanding()
        ) : submitted ? (
          renderSuccess()
        ) : (
          <>
            {/* Back to types + Type badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}>
              <button
                onClick={handleBack}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
                </svg>
                {currentStep === 0 ? 'Retour' : 'Precedent'}
              </button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 16px',
                borderRadius: '10px',
                background: `${selectedType.color}12`,
                border: `1px solid ${selectedType.color}30`,
              }}>
                <span style={{ fontSize: '18px' }}>{selectedType.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: selectedType.color }}>
                  {selectedType.title}
                </span>
              </div>
            </div>

            {/* Progress */}
            {renderProgress()}

            {/* Form card */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '20px',
              padding: isMobile ? '24px' : '40px',
              border: '1px solid rgba(255,255,255,0.08)',
              maxWidth: '800px',
            }}>
              {renderCurrentStep()}

              {/* Navigation buttons */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                marginTop: '40px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}>
                {currentStep < STEP_LABELS.length - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!isStepValid(currentStep)}
                    style={{
                      padding: '14px 32px',
                      borderRadius: '12px',
                      border: 'none',
                      background: isStepValid(currentStep)
                        ? `linear-gradient(135deg, ${selectedType.color} 0%, ${selectedType.color}cc 100%)`
                        : 'rgba(255,255,255,0.1)',
                      color: isStepValid(currentStep) ? 'white' : 'rgba(255,255,255,0.3)',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: isStepValid(currentStep) ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s',
                      boxShadow: isStepValid(currentStep) ? `0 4px 16px ${selectedType.color}30` : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                    onMouseOver={e => {
                      if (isStepValid(currentStep)) e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    Suivant
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    style={{
                      padding: '14px 36px',
                      borderRadius: '12px',
                      border: 'none',
                      background: submitting
                        ? 'rgba(255,255,255,0.1)'
                        : `linear-gradient(135deg, ${selectedType.color} 0%, ${selectedType.color}cc 100%)`,
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: submitting ? 'wait' : 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: submitting ? 'none' : `0 4px 20px ${selectedType.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                    onMouseOver={e => {
                      if (!submitting) e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    {submitting ? (
                      <>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: 'white',
                          borderRadius: '50%',
                          animation: 'spin 0.8s linear infinite',
                        }} />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                        Soumettre le brief
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
