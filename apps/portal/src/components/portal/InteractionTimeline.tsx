'use client';

import { useState } from 'react';
import { Phone, Mail, MessageSquare, Calendar, CheckSquare, Plus, Trash2 } from 'lucide-react';
import type { InteractionData } from '@/types/portal';

const TYPE_CONFIG = {
  NOTE: { icon: <MessageSquare size={12} />, label: 'Note' },
  CALL: { icon: <Phone size={12} />, label: 'Appel' },
  MEETING: { icon: <Calendar size={12} />, label: 'Reunion' },
  EMAIL: { icon: <Mail size={12} />, label: 'Email' },
  TASK: { icon: <CheckSquare size={12} />, label: 'Tache' },
};

export default function InteractionTimeline({ contactId, interactions, onRefresh }: {
  contactId: string;
  interactions: InteractionData[];
  onRefresh: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<InteractionData['type']>('NOTE');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!title.trim()) return;
    setSaving(true);
    await fetch('/api/portal/interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contactId, type, title, content }),
    });
    setTitle('');
    setContent('');
    setShowForm(false);
    setSaving(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/portal/interactions?id=${id}`, { method: 'DELETE' });
    onRefresh();
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' }) +
      ' ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '7px 10px', borderRadius: '8px',
    background: 'var(--bg-input)', border: '1px solid var(--border-input)',
    color: 'var(--text-primary)', fontSize: '12px', outline: 'none',
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Timeline
        </h4>
        <button onClick={() => setShowForm(!showForm)} style={{
          display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 12px', borderRadius: '6px',
          background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 500,
        }}>
          <Plus size={12} /> Ajouter
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'var(--bg-hover)', borderRadius: '10px', padding: '14px', marginBottom: '12px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '10px', flexWrap: 'wrap' }}>
            {(Object.keys(TYPE_CONFIG) as InteractionData['type'][]).map((t) => (
              <button key={t} onClick={() => setType(t)} style={{
                padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 500,
                background: type === t ? 'var(--text-primary)' : 'var(--bg-card)',
                color: type === t ? 'var(--bg-card)' : 'var(--text-secondary)',
                border: '1px solid ' + (type === t ? 'var(--text-primary)' : 'var(--border-input)'),
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
                {TYPE_CONFIG[t].label}
              </button>
            ))}
          </div>
          <input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} style={{ ...inputStyle, marginBottom: '8px' }} />
          <textarea placeholder="Details (optionnel)" value={content} onChange={(e) => setContent(e.target.value)} rows={2} style={{ ...inputStyle, marginBottom: '8px', resize: 'vertical' }} />
          <button onClick={handleAdd} disabled={saving || !title.trim()} style={{
            padding: '6px 14px', borderRadius: '6px', background: 'var(--accent)', color: 'white',
            border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 500, opacity: saving ? 0.5 : 1,
          }}>
            {saving ? '...' : 'Ajouter'}
          </button>
        </div>
      )}

      {interactions.length === 0 ? (
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Aucune interaction</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {interactions.map((item) => {
            const cfg = TYPE_CONFIG[item.type];
            return (
              <div key={item.id} style={{
                display: 'flex', gap: '10px', padding: '10px 12px', borderRadius: '8px',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                transition: 'background 0.1s',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  background: 'var(--bg-badge)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-secondary)', marginTop: '1px',
                }}>
                  {cfg.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{item.title}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500, padding: '1px 6px', borderRadius: '4px', background: 'var(--bg-badge)' }}>
                      {cfg.label}
                    </span>
                  </div>
                  {item.content && <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: 1.4 }}>{item.content}</p>}
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '3px', display: 'block' }}>{formatDate(item.date)}</span>
                </div>
                <button onClick={() => handleDelete(item.id)} style={{
                  width: '24px', height: '24px', borderRadius: '4px', background: 'transparent',
                  border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--danger-light)'; e.currentTarget.style.color = 'var(--danger)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
