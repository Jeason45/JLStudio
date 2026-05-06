'use client';

import { useState, useEffect } from 'react';
import { Check, ArrowRight, ArrowLeft, FileText, RotateCcw } from 'lucide-react';
import { useAgencySidebar } from '@/components/admin/SidebarContext';
import {
  BRIEF_TYPES, COMMON_FEATURES, REFONTE_SCOPES, REFONTE_FIELDS_BY_SCOPE,
  BUDGET_OPTIONS, STEP_LABELS, getInitialBriefData, budgetToNumber,
  type BriefType, type BriefFormData,
} from '@/lib/brief';

interface Contact {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  companyName: string | null;
  type: string | null;
  status: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px',
  border: '1px solid var(--agency-border)',
  borderRadius: 8, fontSize: 13, outline: 'none',
  background: 'var(--agency-surface-2)', color: 'var(--agency-ink-1)',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 600,
  color: 'var(--agency-ink-3)', marginBottom: 6,
  textTransform: 'uppercase', letterSpacing: '0.05em',
};

const fieldGroup: React.CSSProperties = { marginBottom: 20 };

export default function BriefPage() {
  const { isMobile } = useAgencySidebar();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedType, setSelectedType] = useState<BriefType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BriefFormData>(getInitialBriefData());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [createProject, setCreateProject] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/contacts')
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setContacts(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  const updateField = (key: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const toggleFeature = (key: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(key) ? prev.features.filter((f) => f !== key) : [...prev.features, key],
    }));
  };
  const handleSelectType = (t: BriefType) => {
    setSelectedType(t);
    setCurrentStep(0);
    setFormData(getInitialBriefData());
    setSubmitted(false);
    setError('');
  };
  const handleBack = () => {
    if (currentStep === 0) {
      setSelectedType(null);
      setFormData(getInitialBriefData());
    } else {
      setCurrentStep((s) => s - 1);
    }
  };
  const handleSubmit = async () => {
    if (!selectedType) return;
    setSubmitting(true);
    setError('');
    const isRefonte = selectedType.id === 'refonte';
    const refonteScope = (formData.refonteScope as string) || '';
    const refonteScopeLabel = isRefonte && refonteScope
      ? REFONTE_SCOPES.find((s) => s.value === refonteScope)?.label || ''
      : '';
    const briefTitle = isRefonte && refonteScopeLabel
      ? `${selectedType.title} ${refonteScopeLabel}`
      : selectedType.title;
    const projectType = isRefonte && refonteScope ? `refonte-${refonteScope}` : selectedType.id;

    // Collect specific fields
    const specificFields: Record<string, unknown> = {};
    selectedType.specificFields.forEach((f) => {
      if (formData[f.key] !== undefined) specificFields[f.key] = formData[f.key];
    });
    if (isRefonte && refonteScope) specificFields.refonteScope = refonteScope;

    try {
      const res = await fetch('/api/admin/briefs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactId: formData.contactId || undefined,
          projectName: formData.projectName,
          projectType,
          briefTitle,
          objectives: formData.objectives,
          targetAudience: formData.targetAudience,
          budget: formData.budget,
          estimatedBudget: budgetToNumber(formData.budget),
          deadline: formData.deadline,
          features: formData.features,
          inspirations: formData.inspirations,
          notes: formData.notes,
          specificFields,
          createProject,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Erreur ${res.status}`);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setSubmitting(false);
    }
  };

  const isStepValid = (step: number): boolean => {
    if (step === 0) return formData.projectName.trim().length > 0;
    if (step === 1) return formData.objectives.trim().length > 0;
    return true;
  };

  // ─── Submitted state ───
  if (submitted) {
    return (
      <SubmittedScreen
        onNew={() => {
          setSubmitted(false);
          setSelectedType(null);
          setFormData(getInitialBriefData());
        }}
      />
    );
  }

  // ─── Landing (type selection) ───
  if (!selectedType) {
    return (
      <div>
        <header style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, letterSpacing: '-0.02em' }}>
            Nouveau brief projet
          </h1>
          <p style={{ fontSize: 13, color: 'var(--agency-ink-3)', marginTop: 4 }}>
            Sélectionnez le type de projet pour démarrer le recueil des besoins.
          </p>
        </header>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 16,
          }}
        >
          {BRIEF_TYPES.map((type) => (
            <TypeCard key={type.id} type={type} onClick={() => handleSelectType(type)} />
          ))}
        </div>
      </div>
    );
  }

  // ─── Wizard ───
  return (
    <div>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0 }}>
          Brief — {selectedType.title}
        </h1>
        <p style={{ fontSize: 13, color: 'var(--agency-ink-3)', marginTop: 4 }}>
          Étape {currentStep + 1}/{STEP_LABELS.length} · {STEP_LABELS[currentStep]}
        </p>
      </header>

      <ProgressBar selectedType={selectedType} currentStep={currentStep} isMobile={isMobile} />

      <div
        style={{
          background: 'var(--agency-surface-1)',
          border: '1px solid var(--agency-border)',
          borderRadius: 12,
          padding: isMobile ? 20 : 32,
        }}
      >
        {currentStep === 0 && <Step0 formData={formData} updateField={updateField} contacts={contacts} />}
        {currentStep === 1 && <Step1 formData={formData} updateField={updateField} />}
        {currentStep === 2 && <Step2 formData={formData} toggleFeature={toggleFeature} selectedType={selectedType} isMobile={isMobile} />}
        {currentStep === 3 && <Step3 formData={formData} updateField={updateField} selectedType={selectedType} isMobile={isMobile} />}
        {currentStep === 4 && <Step4 formData={formData} updateField={updateField} selectedType={selectedType} isMobile={isMobile} />}
        {currentStep === 5 && (
          <Step5
            formData={formData}
            selectedType={selectedType}
            contacts={contacts}
            createProject={createProject}
            setCreateProject={setCreateProject}
          />
        )}

        {error && (
          <p style={{ marginTop: 16, padding: '10px 14px', borderRadius: 8, background: 'var(--agency-danger-soft)', color: 'var(--agency-danger)', fontSize: 13 }}>
            {error}
          </p>
        )}

        {/* Navigation */}
        <div
          style={{
            display: 'flex', justifyContent: 'space-between', marginTop: 32,
            paddingTop: 20, borderTop: '1px solid var(--agency-border)',
          }}
        >
          <NavButton onClick={handleBack} icon={<ArrowLeft size={14} />}>
            {currentStep === 0 ? 'Annuler' : 'Précédent'}
          </NavButton>
          {currentStep < STEP_LABELS.length - 1 ? (
            <NavButton
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!isStepValid(currentStep)}
              primary
              iconRight={<ArrowRight size={14} />}
            >
              Suivant
            </NavButton>
          ) : (
            <NavButton onClick={handleSubmit} disabled={submitting} primary iconRight={<Check size={14} />}>
              {submitting ? 'Soumission…' : 'Soumettre le brief'}
            </NavButton>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── TypeCard ───────────────────────────────────────────────

function TypeCard({ type, onClick }: { type: BriefType; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--agency-surface-1)',
        borderRadius: 12,
        padding: 24,
        cursor: 'pointer',
        border: '1px solid var(--agency-border)',
        transition: 'all 0.2s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = type.color;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = 'var(--agency-border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div
        style={{
          position: 'absolute', top: -30, right: -30, width: 100, height: 100,
          background: `radial-gradient(circle, ${type.color}15 0%, transparent 70%)`,
          borderRadius: '50%', pointerEvents: 'none',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div
          style={{
            width: 44, height: 44, borderRadius: 10,
            background: `${type.color}18`, border: `1px solid ${type.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          }}
        >
          {type.icon}
        </div>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0 }}>
            {type.title}
          </h3>
          <span style={{ fontSize: 10, color: type.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {type.specificFields.length} champ{type.specificFields.length > 1 ? 's' : ''} spécifique{type.specificFields.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>
      <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', lineHeight: 1.6, margin: 0, marginBottom: 16 }}>
        {type.description}
      </p>
      <div
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          color: type.color, fontSize: 12, fontWeight: 600,
        }}
      >
        Commencer le brief <ArrowRight size={14} />
      </div>
    </div>
  );
}

// ─── ProgressBar ────────────────────────────────────────────

function ProgressBar({ selectedType, currentStep, isMobile }: { selectedType: BriefType; currentStep: number; isMobile: boolean }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 4 : 0 }}>
        {STEP_LABELS.map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: isMobile ? 'none' : 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 28, height: 28, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 600,
                  background: i <= currentStep ? selectedType.color : 'var(--agency-surface-2)',
                  color: i <= currentStep ? 'white' : 'var(--agency-ink-3)',
                  boxShadow: i === currentStep ? `0 0 12px ${selectedType.color}40` : 'none',
                  transition: 'all 0.3s', flexShrink: 0,
                }}
              >
                {i < currentStep ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>
              {!isMobile && (
                <span
                  style={{
                    fontSize: 11, fontWeight: i === currentStep ? 600 : 500,
                    color: i <= currentStep ? 'var(--agency-ink-1)' : 'var(--agency-ink-3)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </span>
              )}
            </div>
            {i < STEP_LABELS.length - 1 && !isMobile && (
              <div
                style={{
                  flex: 1, height: 2, margin: '0 10px',
                  background: i < currentStep ? selectedType.color : 'var(--agency-surface-2)',
                  borderRadius: 1, transition: 'background 0.3s',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Steps ──────────────────────────────────────────────────

function Step0({ formData, updateField, contacts }: { formData: BriefFormData; updateField: (k: string, v: string | string[]) => void; contacts: Contact[] }) {
  return (
    <div>
      <StepHeader title="Client & Projet" subtitle="Identifiez le client et nommez le projet." />
      <div style={fieldGroup}>
        <label style={labelStyle}>Client associé</label>
        <select
          value={formData.contactId}
          onChange={(e) => updateField('contactId', e.target.value)}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          <option value="">— Sélectionner un client (optionnel) —</option>
          {contacts.map((c) => {
            const display = c.companyName ? `${c.companyName} (${c.name || c.firstName || ''})` : (c.name || `${c.firstName || ''} ${c.lastName || ''}`.trim());
            return (
              <option key={c.id} value={c.id}>
                {display}{c.email ? ` — ${c.email}` : ''}
              </option>
            );
          })}
        </select>
      </div>
      <div style={fieldGroup}>
        <label style={labelStyle}>Nom du projet <span style={{ color: 'var(--agency-danger)' }}>*</span></label>
        <input
          type="text"
          value={formData.projectName}
          onChange={(e) => updateField('projectName', e.target.value)}
          placeholder="Ex: Refonte site Entreprise XYZ"
          style={inputStyle}
        />
      </div>
    </div>
  );
}

function Step1({ formData, updateField }: { formData: BriefFormData; updateField: (k: string, v: string | string[]) => void }) {
  return (
    <div>
      <StepHeader title="Objectifs du projet" subtitle="Décrivez les objectifs et le public cible." />
      <div style={fieldGroup}>
        <label style={labelStyle}>Objectifs principaux <span style={{ color: 'var(--agency-danger)' }}>*</span></label>
        <textarea
          value={formData.objectives}
          onChange={(e) => updateField('objectives', e.target.value)}
          placeholder="Quels sont les objectifs principaux de ce projet ?"
          rows={5}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
        />
      </div>
      <div style={fieldGroup}>
        <label style={labelStyle}>Public cible</label>
        <input
          type="text"
          value={formData.targetAudience}
          onChange={(e) => updateField('targetAudience', e.target.value)}
          placeholder="Ex: Professionnels B2B, 25-45 ans, secteur immobilier..."
          style={inputStyle}
        />
      </div>
      <div style={fieldGroup}>
        <label style={labelStyle}>Inspirations / Références</label>
        <textarea
          value={formData.inspirations}
          onChange={(e) => updateField('inspirations', e.target.value)}
          placeholder="Sites web ou applications qui vous inspirent…"
          rows={3}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 70 }}
        />
      </div>
    </div>
  );
}

function Step2({
  formData, toggleFeature, selectedType, isMobile,
}: { formData: BriefFormData; toggleFeature: (k: string) => void; selectedType: BriefType; isMobile: boolean }) {
  return (
    <div>
      <StepHeader title="Fonctionnalités souhaitées" subtitle="Sélectionnez les fonctionnalités à intégrer." />
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 10 }}>
        {COMMON_FEATURES.map((feature) => {
          const isSelected = formData.features.includes(feature.key);
          return (
            <div
              key={feature.key}
              onClick={() => toggleFeature(feature.key)}
              style={{
                padding: '12px 16px', borderRadius: 8, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 12,
                background: isSelected ? `${selectedType.color}15` : 'var(--agency-surface-2)',
                border: `1px solid ${isSelected ? `${selectedType.color}80` : 'var(--agency-border)'}`,
                transition: 'all 0.15s',
              }}
            >
              <div
                style={{
                  width: 18, height: 18, borderRadius: 4,
                  border: `2px solid ${isSelected ? selectedType.color : 'var(--agency-ink-3)'}`,
                  background: isSelected ? selectedType.color : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}
              >
                {isSelected && <Check size={11} color="white" strokeWidth={3} />}
              </div>
              <span style={{ fontSize: 13, fontWeight: isSelected ? 600 : 500, color: isSelected ? 'var(--agency-ink-1)' : 'var(--agency-ink-2)' }}>
                {feature.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Step3({
  formData, updateField, selectedType, isMobile,
}: { formData: BriefFormData; updateField: (k: string, v: string | string[]) => void; selectedType: BriefType; isMobile: boolean }) {
  const isRefonte = selectedType.id === 'refonte';
  const refonteScope = (formData.refonteScope as string) || '';
  const visibleKeys = isRefonte && refonteScope ? REFONTE_FIELDS_BY_SCOPE[refonteScope] || [] : null;
  const fieldsToRender = isRefonte && visibleKeys
    ? selectedType.specificFields.filter((f) => visibleKeys.includes(f.key))
    : isRefonte ? [] : selectedType.specificFields;

  return (
    <div>
      <StepHeader title={`Détails — ${selectedType.title}`} subtitle="Informations spécifiques à ce type de projet." />

      {isRefonte && (
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Type de refonte</label>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 10 }}>
            {REFONTE_SCOPES.map((scope) => {
              const isSelected = refonteScope === scope.value;
              return (
                <div
                  key={scope.value}
                  onClick={() => updateField('refonteScope', scope.value)}
                  style={{
                    padding: 16, borderRadius: 10, cursor: 'pointer', textAlign: 'center',
                    background: isSelected ? `${selectedType.color}15` : 'var(--agency-surface-2)',
                    border: `1px solid ${isSelected ? `${selectedType.color}80` : 'var(--agency-border)'}`,
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{scope.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--agency-ink-1)', marginBottom: 4 }}>
                    {scope.label}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', lineHeight: 1.5 }}>
                    {scope.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {fieldsToRender.map((field) => (
        <div key={field.key} style={fieldGroup}>
          <label style={labelStyle}>{field.label}</label>
          {field.type === 'select' && field.options ? (
            <select
              value={(formData[field.key] as string) || ''}
              onChange={(e) => updateField(field.key, e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              <option value="">— Choisir —</option>
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              value={(formData[field.key] as string) || ''}
              onChange={(e) => updateField(field.key, e.target.value)}
              placeholder={field.placeholder}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
            />
          ) : (
            <input
              type={field.type === 'url' ? 'url' : 'text'}
              value={(formData[field.key] as string) || ''}
              onChange={(e) => updateField(field.key, e.target.value)}
              placeholder={field.placeholder}
              style={inputStyle}
            />
          )}
        </div>
      ))}

      <div style={fieldGroup}>
        <label style={labelStyle}>Notes supplémentaires</label>
        <textarea
          value={formData.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder="Toute information complémentaire…"
          rows={3}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
        />
      </div>
    </div>
  );
}

function Step4({
  formData, updateField, selectedType, isMobile,
}: { formData: BriefFormData; updateField: (k: string, v: string | string[]) => void; selectedType: BriefType; isMobile: boolean }) {
  return (
    <div>
      <StepHeader title="Budget & Planning" subtitle="Définissez votre enveloppe budgétaire et les délais." />
      <div style={fieldGroup}>
        <label style={labelStyle}>Budget estimé</label>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 10 }}>
          {BUDGET_OPTIONS.map((opt) => {
            const isSelected = formData.budget === opt.value;
            return (
              <div
                key={opt.value}
                onClick={() => updateField('budget', opt.value)}
                style={{
                  padding: '14px 16px', borderRadius: 8, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: isSelected ? `${selectedType.color}15` : 'var(--agency-surface-2)',
                  border: `1px solid ${isSelected ? `${selectedType.color}80` : 'var(--agency-border)'}`,
                }}
              >
                <div
                  style={{
                    width: 16, height: 16, borderRadius: '50%',
                    border: `2px solid ${isSelected ? selectedType.color : 'var(--agency-ink-3)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                >
                  {isSelected && (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: selectedType.color }} />
                  )}
                </div>
                <span style={{ fontSize: 13, fontWeight: isSelected ? 600 : 500, color: 'var(--agency-ink-1)' }}>
                  {opt.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={fieldGroup}>
        <label style={labelStyle}>Deadline souhaitée</label>
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => updateField('deadline', e.target.value)}
          style={{ ...inputStyle, colorScheme: 'dark' }}
        />
      </div>
    </div>
  );
}

function Step5({
  formData, selectedType, contacts, createProject, setCreateProject,
}: {
  formData: BriefFormData;
  selectedType: BriefType;
  contacts: Contact[];
  createProject: boolean;
  setCreateProject: (v: boolean) => void;
}) {
  const selectedContact = contacts.find((c) => c.id === formData.contactId);
  const selectedFeatures = COMMON_FEATURES.filter((f) => formData.features.includes(f.key));
  const budgetLabel = BUDGET_OPTIONS.find((b) => b.value === formData.budget)?.label || 'Non défini';

  const blockStyle: React.CSSProperties = {
    background: 'var(--agency-surface-2)',
    borderRadius: 8, padding: 16, marginBottom: 12,
    border: '1px solid var(--agency-border)',
  };
  const blockLabelStyle: React.CSSProperties = {
    fontSize: 10, fontWeight: 700, color: 'var(--agency-ink-3)',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6,
  };

  return (
    <div>
      <StepHeader title="Récapitulatif" subtitle="Vérifiez les informations avant de soumettre." />

      {/* Type badge */}
      <div
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 14px', borderRadius: 8,
          background: `${selectedType.color}15`, border: `1px solid ${selectedType.color}40`,
          marginBottom: 20,
        }}
      >
        <span style={{ fontSize: 16 }}>{selectedType.icon}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: selectedType.color }}>
          {selectedType.title}
          {selectedType.id === 'refonte' && formData.refonteScope && (
            <> — {REFONTE_SCOPES.find((s) => s.value === formData.refonteScope)?.label}</>
          )}
        </span>
      </div>

      <div style={blockStyle}>
        <div style={blockLabelStyle}>Client & Projet</div>
        <div style={{ fontSize: 13, color: 'var(--agency-ink-1)' }}>
          <strong>Projet :</strong> {formData.projectName || '(Non défini)'}
          <br />
          <strong>Client :</strong>{' '}
          {selectedContact
            ? selectedContact.companyName
              ? `${selectedContact.companyName} (${selectedContact.name})`
              : selectedContact.name
            : '(Aucun)'}
        </div>
      </div>

      <div style={blockStyle}>
        <div style={blockLabelStyle}>Objectifs</div>
        <div style={{ fontSize: 13, color: 'var(--agency-ink-1)', whiteSpace: 'pre-wrap' }}>
          {formData.objectives || '(Non défini)'}
        </div>
        {formData.targetAudience && (
          <div style={{ fontSize: 12, color: 'var(--agency-ink-2)', marginTop: 8 }}>
            <strong>Public :</strong> {formData.targetAudience}
          </div>
        )}
      </div>

      {selectedFeatures.length > 0 && (
        <div style={blockStyle}>
          <div style={blockLabelStyle}>Fonctionnalités ({selectedFeatures.length})</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedFeatures.map((f) => (
              <span
                key={f.key}
                style={{
                  padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600,
                  background: `${selectedType.color}15`, color: selectedType.color,
                  border: `1px solid ${selectedType.color}30`,
                }}
              >
                {f.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={blockStyle}>
        <div style={blockLabelStyle}>Budget & Planning</div>
        <div style={{ fontSize: 13, color: 'var(--agency-ink-1)' }}>
          <strong>Budget :</strong> {budgetLabel}
          <br />
          <strong>Deadline :</strong>{' '}
          {formData.deadline
            ? new Date(formData.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
            : '(Non définie)'}
        </div>
      </div>

      {/* Create project option */}
      <div
        onClick={() => setCreateProject(!createProject)}
        style={{
          marginTop: 20, padding: 16, borderRadius: 8, cursor: 'pointer',
          background: createProject ? `${selectedType.color}10` : 'var(--agency-surface-2)',
          border: `1px solid ${createProject ? `${selectedType.color}50` : 'var(--agency-border)'}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}
      >
        <div
          style={{
            width: 18, height: 18, borderRadius: 4,
            border: `2px solid ${createProject ? selectedType.color : 'var(--agency-ink-3)'}`,
            background: createProject ? selectedType.color : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          {createProject && <Check size={11} color="white" strokeWidth={3} />}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--agency-ink-1)' }}>
            Créer un projet à partir de ce brief
          </div>
          <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', marginTop: 2 }}>
            Le brief sera enregistré comme interaction sur le contact, et un nouveau projet sera créé automatiquement.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ────────────────────────────────────────────────

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, marginBottom: 4 }}>
        {title}
      </h2>
      <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginBottom: 24, margin: 0, marginTop: 4 }}>
        {subtitle}
      </p>
    </>
  );
}

function NavButton({
  children, onClick, disabled, primary, icon, iconRight,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '9px 18px', borderRadius: 8,
        fontSize: 13, fontWeight: 500, cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        background: primary ? 'var(--agency-accent)' : 'var(--agency-surface-2)',
        color: primary ? 'white' : 'var(--agency-ink-2)',
        border: `1px solid ${primary ? 'var(--agency-accent)' : 'var(--agency-border)'}`,
        transition: 'all 0.15s',
      }}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}

function SubmittedScreen({ onNew }: { onNew: () => void }) {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: 400, padding: 32, textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'var(--agency-success-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <Check size={32} color="var(--agency-success)" strokeWidth={2.5} />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, marginBottom: 8 }}>
        Brief soumis avec succès
      </h2>
      <p style={{ fontSize: 13, color: 'var(--agency-ink-3)', margin: 0, marginBottom: 24, maxWidth: 400 }}>
        Le brief a été enregistré dans le CRM. Vous le retrouverez dans les interactions du contact.
      </p>
      <button
        onClick={onNew}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '10px 20px', borderRadius: 8,
          background: 'var(--agency-accent)', color: 'white',
          border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
        }}
      >
        <FileText size={14} />
        Nouveau brief
      </button>
    </div>
  );
}
