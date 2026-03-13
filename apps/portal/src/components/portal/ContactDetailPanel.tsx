'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Phone, Building, Tag } from 'lucide-react';
import InteractionTimeline from './InteractionTimeline';
import type { ContactData, InteractionData } from '@/types/portal';

interface ContactDetail extends ContactData {
  portalInteractions: InteractionData[];
  portalDocuments: { id: string; type: string; status: string; documentNumber: string | null; title: string; totalAmount: number | null; createdAt: string }[];
}

export default function ContactDetailPanel({ contactId, onClose, onUpdate }: {
  contactId: string;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [contact, setContact] = useState<ContactDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', company: '', position: '', notes: '' });

  const fetchContact = useCallback(() => {
    fetch(`/api/portal/contacts/${contactId}`)
      .then((r) => r.json())
      .then((data) => {
        setContact(data);
        setForm({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          phone: data.phone || '',
          company: data.company || '',
          position: data.position || '',
          notes: data.notes || '',
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [contactId]);

  useEffect(() => { fetchContact(); }, [fetchContact]);

  const handleSave = async () => {
    await fetch(`/api/portal/contacts/${contactId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setEditing(false);
    fetchContact();
    onUpdate();
  };

  const handleStatusChange = async (status: string) => {
    await fetch(`/api/portal/contacts/${contactId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchContact();
    onUpdate();
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '7px 10px', borderRadius: '8px',
    background: 'var(--bg-input)', border: '1px solid var(--border-input)',
    color: 'var(--text-primary)', fontSize: '13px', outline: 'none',
  };

  const formatCurrency = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);

  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, width: '460px', maxWidth: '100vw', height: '100vh',
      background: 'var(--bg-card)', borderLeft: '1px solid var(--border)',
      boxShadow: 'var(--shadow-md)',
      zIndex: 2000, overflowY: 'auto', padding: '24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>Contact</h2>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
          <X size={18} />
        </button>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-tertiary)' }}>Chargement...</p>
      ) : contact ? (
        <>
          {/* Header */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '15px', fontWeight: 500, color: 'var(--accent)',
              }}>
                {(contact.firstName?.[0] || contact.email[0]).toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {contact.firstName || ''} {contact.lastName || ''}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{contact.email}</div>
              </div>
            </div>

            {/* Status */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
              {(['NEW', 'ACTIVE', 'INACTIVE'] as const).map((s) => (
                <button key={s} onClick={() => handleStatusChange(s)} style={{
                  padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 500,
                  background: contact.status === s ? 'var(--text-primary)' : 'var(--bg-secondary)',
                  color: contact.status === s
                    ? (s === 'ACTIVE' ? 'var(--success)' : 'var(--bg-card)')
                    : 'var(--text-secondary)',
                  border: '1px solid ' + (contact.status === s ? 'var(--text-primary)' : 'var(--border)'),
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  {s === 'NEW' ? 'Nouveau' : s === 'ACTIVE' ? 'Actif' : 'Inactif'}
                </button>
              ))}
            </div>

            {/* Info */}
            {!editing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {contact.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}><Phone size={14} /> {contact.phone}</div>}
                {contact.company && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}><Building size={14} /> {contact.company}{contact.position ? ` · ${contact.position}` : ''}</div>}
                {contact.tags.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                    <Tag size={14} color="var(--text-tertiary)" />
                    {contact.tags.map((t) => <span key={t} style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-badge)', fontSize: '12px', color: 'var(--text-secondary)' }}>{t}</span>)}
                  </div>
                )}
                {contact.notes && <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '4px' }}>{contact.notes}</p>}
                <button onClick={() => setEditing(true)} style={{
                  padding: '6px 14px', borderRadius: '6px', background: 'var(--bg-secondary)',
                  color: 'var(--text-secondary)', border: '1px solid var(--border)', cursor: 'pointer', fontSize: '12px',
                  fontWeight: 500, marginTop: '6px', alignSelf: 'flex-start', transition: 'all 0.15s',
                }}>Modifier</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <input placeholder="Prenom" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} style={inputStyle} />
                  <input placeholder="Nom" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} style={inputStyle} />
                </div>
                <input placeholder="Telephone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                <input placeholder="Entreprise" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} style={inputStyle} />
                <input placeholder="Poste" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} style={inputStyle} />
                <textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={handleSave} style={{ padding: '6px 14px', borderRadius: '6px', background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 500 }}>Enregistrer</button>
                  <button onClick={() => setEditing(false)} style={{ padding: '6px 14px', borderRadius: '6px', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 500 }}>Annuler</button>
                </div>
              </div>
            )}
          </div>

          {/* Documents */}
          {contact.portalDocuments.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Documents</h4>
              <div style={{ background: 'var(--bg-hover)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                {contact.portalDocuments.map((doc, idx) => (
                  <div key={doc.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 12px',
                    borderBottom: idx < contact.portalDocuments.length - 1 ? '1px solid var(--border)' : 'none',
                    fontSize: '13px', background: 'var(--bg-card)',
                  }}>
                    <div>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{doc.documentNumber || doc.title}</span>
                      <span style={{ color: 'var(--text-tertiary)', marginLeft: '8px', fontSize: '12px' }}>{doc.type}</span>
                    </div>
                    {doc.totalAmount != null && <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{formatCurrency(doc.totalAmount)}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactions */}
          <InteractionTimeline
            contactId={contactId}
            interactions={contact.portalInteractions}
            onRefresh={fetchContact}
          />
        </>
      ) : (
        <p style={{ color: 'var(--text-tertiary)' }}>Contact introuvable</p>
      )}
    </div>
  );
}
