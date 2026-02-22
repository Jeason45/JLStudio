'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Phone, Building2, MapPin, Calendar, FileText, MessageSquare } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'new', label: 'Nouveau', color: '#6366f1' },
  { value: 'contacted', label: 'Contacte', color: '#f59e0b' },
  { value: 'qualified', label: 'Qualifie', color: '#8b5cf6' },
  { value: 'rdv_planned', label: 'RDV Planifie', color: '#06b6d4' },
  { value: 'quote_sent', label: 'Devis Envoye', color: '#3b82f6' },
  { value: 'pending_signature', label: 'En attente signature', color: '#f97316' },
  { value: 'client', label: 'Client', color: '#10b981' },
  { value: 'lost', label: 'Perdu', color: '#ef4444' },
];

interface ContactDetail {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  companyName: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  type: string;
  status: string;
  source: string | null;
  score: number;
  projectType: string | null;
  budget: string | null;
  estimatedPrice: number | null;
  notes: string | null;
  lostReason: string | null;
  createdAt: string;
  interactions: { id: string; type: string; subject: string | null; content: string | null; createdAt: string }[];
  documents: { id: string; type: string; status: string; documentNumber: string | null; amount: number | null }[];
  appointments: { id: string; title: string; startTime: string; status: string }[];
}

export default function LeadDetailModal({ contactId, onClose, onUpdate }: {
  contactId: string;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [contact, setContact] = useState<ContactDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ContactDetail>>({});
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetch(`/api/contacts/${contactId}`)
      .then(res => res.json())
      .then(data => { setContact(data); setFormData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [contactId]);

  const handleSave = async () => {
    const { interactions, documents, appointments, ...updateData } = formData;
    await fetch(`/api/contacts/${contactId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });
    setEditing(false);
    onUpdate();
    // Refresh
    const res = await fetch(`/api/contacts/${contactId}`);
    const data = await res.json();
    setContact(data);
    setFormData(data);
  };

  const handleStatusChange = async (newStatus: string) => {
    await fetch(`/api/contacts/${contactId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    onUpdate();
    const res = await fetch(`/api/contacts/${contactId}`);
    const data = await res.json();
    setContact(data);
    setFormData(data);
  };

  const handleConvert = async () => {
    await fetch(`/api/leads/${contactId}/convert`, { method: 'POST' });
    onUpdate();
    onClose();
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    await fetch('/api/interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contactId, type: 'note', subject: 'Note', content: newNote }),
    });
    setNewNote('');
    const res = await fetch(`/api/contacts/${contactId}`);
    const data = await res.json();
    setContact(data);
  };

  const handleDelete = async () => {
    if (!confirm('Supprimer ce lead ?')) return;
    await fetch(`/api/contacts/${contactId}`, { method: 'DELETE' });
    onUpdate();
    onClose();
  };

  if (loading) return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div style={{ color: 'white' }}>Chargement...</div>
    </div>
  );

  if (!contact) return null;

  const statusConfig = STATUS_OPTIONS.find(s => s.value === contact.status);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }} onClick={onClose}>
      <div style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', background: 'linear-gradient(135deg, #0f1b2e 0%, #0a0e1a 100%)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{contact.companyName || contact.name}</h2>
            {contact.companyName && <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Contact: {contact.name}</p>}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, color: statusConfig?.color, backgroundColor: `${statusConfig?.color}20` }}>
                {statusConfig?.label}
              </span>
              <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, color: contact.score >= 70 ? '#10b981' : contact.score >= 40 ? '#f59e0b' : '#94a3b8', background: contact.score >= 70 ? 'rgba(16,185,129,0.15)' : contact.score >= 40 ? 'rgba(245,158,11,0.15)' : 'rgba(148,163,184,0.15)' }}>
                Score: {contact.score}
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: 'white' }}>
            <X size={20} />
          </button>
        </div>

        {/* Status Pipeline */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {STATUS_OPTIONS.map(s => (
            <button key={s.value} onClick={() => handleStatusChange(s.value)} style={{
              padding: '6px 12px', borderRadius: '6px', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer',
              background: contact.status === s.value ? `${s.color}30` : 'rgba(255,255,255,0.05)',
              color: contact.status === s.value ? s.color : 'rgba(255,255,255,0.5)',
              transition: 'all 0.2s',
            }}>{s.label}</button>
          ))}
        </div>

        {/* Contact Info */}
        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {contact.email && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}><Mail size={16} color="#638BFF" />{contact.email}</div>}
          {contact.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}><Phone size={16} color="#638BFF" />{contact.phone}</div>}
          {contact.companyName && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}><Building2 size={16} color="#638BFF" />{contact.companyName}</div>}
          {(contact.city || contact.address) && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}><MapPin size={16} color="#638BFF" />{[contact.address, contact.postalCode, contact.city].filter(Boolean).join(', ')}</div>}
          {contact.projectType && <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Projet: <span style={{ color: '#638BFF', fontWeight: 600 }}>{contact.projectType}</span></div>}
          {contact.budget && <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Budget: <span style={{ color: '#638BFF', fontWeight: 600 }}>{contact.budget}</span></div>}
          {contact.estimatedPrice && <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Prix estime: <span style={{ color: '#10b981', fontWeight: 700 }}>{contact.estimatedPrice.toLocaleString('fr-FR')} EUR</span></div>}
          {contact.source && <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Source: {contact.source}</div>}
        </div>

        {/* Notes */}
        {contact.notes && (
          <div style={{ padding: '0 24px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
            {contact.notes}
          </div>
        )}

        {/* Interactions */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
            <MessageSquare size={14} style={{ display: 'inline', marginRight: '6px' }} />Historique ({contact.interactions?.length || 0})
          </h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Ajouter une note..."
              style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '13px', outline: 'none' }}
              onKeyDown={e => e.key === 'Enter' && handleAddNote()} />
            <button onClick={handleAddNote} style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#638BFF', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Ajouter</button>
          </div>
          {contact.interactions?.slice(0, 5).map(i => (
            <div key={i.id} style={{ padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#638BFF', textTransform: 'uppercase' }}>{i.type}</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{new Date(i.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>
              {i.subject && <div style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>{i.subject}</div>}
              {i.content && <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>{i.content}</div>}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
          <button onClick={handleDelete} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Supprimer</button>
          <div style={{ display: 'flex', gap: '8px' }}>
            {contact.status !== 'client' && (
              <button onClick={handleConvert} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Convertir en client</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
