'use client';

import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import type { Contact } from './types';
import { inputStyle, labelStyle } from './styles';

export function ContactSearchBox({
  contacts,
  onSelect,
  placeholder = 'Tapez un nom ou email…',
  initialQuery = '',
  label = 'Rechercher un contact',
}: {
  contacts: Contact[];
  onSelect: (c: Contact) => void;
  placeholder?: string;
  initialQuery?: string;
  label?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const filtered = contacts.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.email || '').toLowerCase().includes(q) ||
      (c.companyName || '').toLowerCase().includes(q)
    );
  });

  return (
    <div ref={ref} style={{ position: 'relative', marginBottom: 16 }}>
      <label style={labelStyle()}>{label}</label>
      <div style={{ position: 'relative' }}>
        <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--agency-ink-3)', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          style={{ ...inputStyle(), paddingLeft: 32 }}
        />
      </div>
      {open && query && (
        <div
          style={{
            position: 'absolute',
            zIndex: 20,
            top: '100%',
            left: 0,
            right: 0,
            marginTop: 4,
            background: 'var(--agency-surface-2)',
            border: '1px solid var(--agency-border)',
            borderRadius: 8,
            maxHeight: 240,
            overflowY: 'auto',
            boxShadow: 'var(--agency-shadow-md, 0 4px 16px rgba(0,0,0,0.5))',
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: '8px 12px', fontSize: 12, color: 'var(--agency-ink-3)' }}>Aucun contact trouvé</div>
          ) : (
            filtered.slice(0, 10).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => { onSelect(c); setQuery(c.name); setOpen(false); }}
                style={{
                  display: 'flex',
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  fontSize: 12,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--agency-ink-1)',
                  borderBottom: '1px solid var(--agency-border-soft)',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--agency-surface-3, var(--agency-surface-2))'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <span style={{ fontWeight: 600 }}>{c.name}</span>
                  {c.companyName && <span style={{ color: 'var(--agency-ink-3)', marginLeft: 6 }}>({c.companyName})</span>}
                  <span style={{ color: 'var(--agency-ink-3)', marginLeft: 8 }}>{c.email}</span>
                </div>
                {c.phone && <span style={{ color: 'var(--agency-ink-3)', fontSize: 11 }}>{c.phone}</span>}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
