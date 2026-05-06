'use client';

import { useState, useEffect } from 'react';
import type { CompanySettingsData } from '@/types/portal';
import { Card, Skeleton, Button } from '@/components/ui';

export default function CompanySettings() {
  const [settings, setSettings] = useState<CompanySettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    companyName: '', address: '', zipCode: '', city: '', country: 'France',
    phone: '', email: '', website: '', siret: '', tvaNumber: '', iban: '', bic: '',
  });

  useEffect(() => {
    fetch('/api/portal/company-settings')
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        setForm({
          companyName: data.companyName || '',
          address: data.address || '',
          zipCode: data.zipCode || '',
          city: data.city || '',
          country: data.country || 'France',
          phone: data.phone || '',
          email: data.email || '',
          website: data.website || '',
          siret: data.siret || '',
          tvaNumber: data.tvaNumber || '',
          iban: data.iban || '',
          bic: data.bic || '',
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('/api/portal/company-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) setSettings(await res.json());
    setSaving(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', borderRadius: '8px',
    background: 'var(--bg-input)', border: '1px solid var(--border-input)',
    color: 'var(--text-primary)', fontSize: '13px', outline: 'none',
  };

  const labelStyle: React.CSSProperties = { fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '4px', display: 'block' };

  if (loading) return <Skeleton height={200} rounded={12} />;

  return (
    <Card padding="24px">
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>Entreprise</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Nom de l&apos;entreprise</label>
          <input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} style={inputStyle} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Adresse</label>
          <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Code postal</label>
          <input value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Ville</label>
          <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Telephone</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Site web</label>
          <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} style={inputStyle} />
        </div>

        <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '4px' }}>
          <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>Informations legales</span>
        </div>
        <div>
          <label style={labelStyle}>SIRET</label>
          <input value={form.siret} onChange={(e) => setForm({ ...form, siret: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>N° TVA</label>
          <input value={form.tvaNumber} onChange={(e) => setForm({ ...form, tvaNumber: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>IBAN</label>
          <input value={form.iban} onChange={(e) => setForm({ ...form, iban: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>BIC</label>
          <input value={form.bic} onChange={(e) => setForm({ ...form, bic: e.target.value })} style={inputStyle} />
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <Button onClick={handleSave} loading={saving} size="md">
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </div>
    </Card>
  );
}
