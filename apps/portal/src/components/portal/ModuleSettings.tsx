'use client';

import { useState } from 'react';
import { useSidebar } from './SidebarContext';
import {
  Users, FileText, Receipt, FileSignature, FolderKanban, Globe, Calendar,
  Save,
} from 'lucide-react';

const MODULE_INFO: { key: string; label: string; description: string; icon: React.ReactNode }[] = [
  { key: 'moduleCRM', label: 'CRM', description: 'Contacts et interactions', icon: <Users size={16} /> },
  { key: 'moduleDevis', label: 'Devis', description: 'Devis professionnels', icon: <FileText size={16} /> },
  { key: 'moduleFactures', label: 'Factures', description: 'Facturation et paiements', icon: <Receipt size={16} /> },
  { key: 'moduleContrats', label: 'Contrats', description: 'Gestion des contrats', icon: <FileSignature size={16} /> },
  { key: 'moduleProjets', label: 'Projets', description: 'Suivi de projets', icon: <FolderKanban size={16} /> },
  { key: 'moduleCMS', label: 'Mon Site', description: 'Contenu du site', icon: <Globe size={16} /> },
  { key: 'moduleCalendrier', label: 'Calendrier', description: 'Rendez-vous et planning', icon: <Calendar size={16} /> },
];

export default function ModuleSettings() {
  const { config, setConfig } = useSidebar();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [modules, setModules] = useState<Record<string, boolean>>(() => {
    if (!config) return {
      moduleCRM: false, moduleDevis: false, moduleFactures: false,
      moduleContrats: false, moduleProjets: false, moduleCMS: false, moduleCalendrier: false,
    };
    return {
      moduleCRM: config.moduleCRM,
      moduleDevis: config.moduleDevis,
      moduleFactures: config.moduleFactures,
      moduleContrats: config.moduleContrats,
      moduleProjets: config.moduleProjets,
      moduleCMS: config.moduleCMS,
      moduleCalendrier: config.moduleCalendrier,
    };
  });

  const toggleModule = (key: string) => {
    setModules((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/portal/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modules),
      });
      if (res.ok && config) {
        const updated = await res.json();
        setConfig({ ...config, ...updated });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      // Error
    }
    setSaving(false);
  };

  return (
    <div style={{
      background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-card)', padding: '20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>Modules actifs</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px',
            background: saved ? 'var(--success, #22c55e)' : 'var(--accent)',
            color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 500,
            opacity: saving ? 0.6 : 1, transition: 'all 0.15s',
          }}
        >
          <Save size={13} />
          {saving ? 'Sauvegarde...' : saved ? 'Sauvegarde !' : 'Sauvegarder'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '8px' }}>
        {MODULE_INFO.map((mod) => {
          const isActive = modules[mod.key] ?? false;
          return (
            <button
              key={mod.key}
              onClick={() => toggleModule(mod.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '8px',
                border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                background: isActive ? 'var(--accent-light)' : 'transparent',
                cursor: 'pointer', textAlign: 'left', width: '100%',
                transition: 'all 0.15s',
              }}
            >
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: isActive ? 'var(--accent)' : 'var(--bg-hover)',
                color: isActive ? 'white' : 'var(--text-tertiary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.15s',
              }}>
                {mod.icon}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{mod.label}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{mod.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
