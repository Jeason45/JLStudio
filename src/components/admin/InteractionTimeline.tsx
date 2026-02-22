'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Phone, Calendar, FileText, MessageSquare, Plus } from 'lucide-react';

const INTERACTION_TYPES = [
  { value: 'email', label: 'Email', color: '#6366f1', icon: Mail },
  { value: 'call', label: 'Appel', color: '#10b981', icon: Phone },
  { value: 'meeting', label: 'Reunion', color: '#f59e0b', icon: Calendar },
  { value: 'document_shared', label: 'Document', color: '#8b5cf6', icon: FileText },
  { value: 'note', label: 'Note', color: '#64748b', icon: MessageSquare },
];

interface Interaction {
  id: string;
  type: string;
  subject: string | null;
  content: string | null;
  direction: string | null;
  duration: number | null;
  createdAt: string;
}

export default function InteractionTimeline({ contactId, onClose }: {
  contactId: string;
  onClose: () => void;
}) {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newType, setNewType] = useState('note');
  const [newSubject, setNewSubject] = useState('');
  const [newContent, setNewContent] = useState('');

  const fetchInteractions = () => {
    fetch(`/api/interactions?contactId=${contactId}`)
      .then(res => res.json())
      .then(data => { setInteractions(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchInteractions(); }, [contactId]);

  const handleAdd = async () => {
    if (!newSubject.trim()) return;
    await fetch('/api/interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contactId, type: newType, subject: newSubject, content: newContent }),
    });
    setNewSubject('');
    setNewContent('');
    setShowAdd(false);
    fetchInteractions();
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f1b2e 0%, #0a0e1a 100%)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>Historique des interactions</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setShowAdd(!showAdd)} style={{ padding: '8px 12px', borderRadius: '8px', border: 'none', background: '#638BFF', color: 'white', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Plus size={14} />Ajouter
          </button>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: 'white' }}>
            <X size={16} />
          </button>
        </div>
      </div>

      {showAdd && (
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            {INTERACTION_TYPES.map(t => (
              <button key={t.value} onClick={() => setNewType(t.value)} style={{
                padding: '6px 12px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                background: newType === t.value ? `${t.color}30` : 'rgba(255,255,255,0.05)',
                color: newType === t.value ? t.color : 'rgba(255,255,255,0.5)',
              }}>{t.label}</button>
            ))}
          </div>
          <input value={newSubject} onChange={e => setNewSubject(e.target.value)} placeholder="Sujet..."
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '13px', outline: 'none', marginBottom: '8px' }} />
          <textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Details..."
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '13px', outline: 'none', minHeight: '60px', resize: 'vertical' }} />
          <button onClick={handleAdd} style={{ marginTop: '8px', padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#638BFF', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Enregistrer</button>
        </div>
      )}

      <div style={{ padding: '16px 24px', maxHeight: '500px', overflowY: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '24px' }}>Chargement...</div>
        ) : interactions.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '24px' }}>Aucune interaction</div>
        ) : (
          interactions.map(interaction => {
            const typeConfig = INTERACTION_TYPES.find(t => t.value === interaction.type) || INTERACTION_TYPES[4];
            const Icon = typeConfig.icon;
            return (
              <div key={interaction.id} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${typeConfig.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} color={typeConfig.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: typeConfig.color, textTransform: 'uppercase' }}>{typeConfig.label}</span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{new Date(interaction.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  {interaction.subject && <div style={{ fontSize: '13px', fontWeight: 600, color: 'white', marginBottom: '2px' }}>{interaction.subject}</div>}
                  {interaction.content && <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{interaction.content}</div>}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
