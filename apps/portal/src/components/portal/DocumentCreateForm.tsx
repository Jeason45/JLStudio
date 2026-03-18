'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  unit: string;
}

interface ContactOption {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  company: string | null;
}

const TYPE_LABELS: Record<string, string> = { DEVIS: 'Devis', FACTURE: 'Facture', CONTRAT: 'Contrat' };

export default function DocumentCreateForm({ type, backHref }: { type: 'DEVIS' | 'FACTURE' | 'CONTRAT'; backHref: string }) {
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactOption[]>([]);
  const [nextNumber, setNextNumber] = useState('');
  const [contactId, setContactId] = useState('');
  const [title, setTitle] = useState('');
  const [lines, setLines] = useState<LineItem[]>([{ description: '', quantity: 1, unitPrice: 0, unit: 'unite' }]);
  const [taxRate, setTaxRate] = useState(20);
  const [notes, setNotes] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/portal/contacts').then((r) => r.json()).then((res) => setContacts(res.data ?? res));
    fetch(`/api/portal/documents/next-number?type=${type}`).then((r) => r.json()).then((d) => setNextNumber(d.number));
  }, [type]);

  const subtotal = lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0);
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  const formatCurrency = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);

  const addLine = () => setLines([...lines, { description: '', quantity: 1, unitPrice: 0, unit: 'unite' }]);
  const removeLine = (i: number) => setLines(lines.filter((_, idx) => idx !== i));
  const updateLine = (i: number, field: keyof LineItem, value: string | number) => {
    const updated = [...lines];
    (updated[i] as unknown as Record<string, string | number>)[field] = value;
    setLines(updated);
  };

  const handleSubmit = async () => {
    setSaving(true);
    const res = await fetch('/api/portal/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        title: title || `${TYPE_LABELS[type]} ${nextNumber}`,
        contactId: contactId || undefined,
        content: { lines },
        amount: subtotal,
        taxRate,
        validUntil: validUntil || undefined,
        notes: notes || undefined,
      }),
    });

    if (res.ok) {
      router.push(backHref);
    } else {
      setSaving(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', borderRadius: '8px',
    background: 'var(--bg-input)', border: '1px solid var(--border-input)',
    color: 'var(--text-primary)', fontSize: '13px', outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '4px', display: 'block',
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Nouveau {TYPE_LABELS[type].toLowerCase()}</h1>
        <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>{nextNumber}</span>
      </div>

      <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Contact + Title */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)', padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Contact</label>
              <select value={contactId} onChange={(e) => setContactId(e.target.value)} style={inputStyle}>
                <option value="">-- Aucun contact --</option>
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>{c.firstName || ''} {c.lastName || ''} ({c.email}){c.company ? ` - ${c.company}` : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Titre</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={`${TYPE_LABELS[type]} ${nextNumber}`} style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Line items */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)', padding: '20px' }}>
          <label style={{ ...labelStyle, marginBottom: '12px' }}>Lignes</label>
          {/* Column headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 120px 80px 32px', gap: '8px', marginBottom: '8px', padding: '0 0 8px', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Description</span>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Qte</span>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Prix HT</span>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>Total</span>
            <span />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {lines.map((line, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 80px 120px 80px 32px', gap: '8px', alignItems: 'center',
              }}>
                <input placeholder="Description" value={line.description} onChange={(e) => updateLine(i, 'description', e.target.value)} style={inputStyle} />
                <input type="number" placeholder="Qte" value={line.quantity} onChange={(e) => updateLine(i, 'quantity', Number(e.target.value))} style={inputStyle} min={1} />
                <input type="number" placeholder="Prix HT" value={line.unitPrice} onChange={(e) => updateLine(i, 'unitPrice', Number(e.target.value))} style={inputStyle} min={0} step={0.01} />
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'right', fontWeight: 500 }}>{formatCurrency(line.quantity * line.unitPrice)}</span>
                {lines.length > 1 && (
                  <button onClick={() => removeLine(i)} style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--danger-light)'; e.currentTarget.style.color = 'var(--danger)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button onClick={addLine} style={{
            display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px',
            padding: '6px 14px', borderRadius: '6px', background: 'var(--bg-secondary)',
            color: 'var(--text-secondary)', border: '1px solid var(--border)',
            cursor: 'pointer', fontSize: '12px', fontWeight: 500,
          }}>
            <Plus size={14} /> Ajouter une ligne
          </button>
        </div>

        {/* Totals */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Sous-total HT</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{formatCurrency(subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>TVA</span>
              <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} style={{ width: '60px', padding: '4px 8px', borderRadius: '6px', background: 'var(--bg-input)', border: '1px solid var(--border-input)', color: 'var(--text-primary)', fontSize: '13px', outline: 'none', textAlign: 'right' }} />
              <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>%</span>
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{formatCurrency(taxAmount)}</span>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Total TTC</span>
            <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent)' }}>{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Notes + Valid until */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)', padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {type === 'DEVIS' && (
              <div>
                <label style={labelStyle}>Valide jusqu&apos;au</label>
                <input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} style={inputStyle} />
              </div>
            )}
            <div style={{ gridColumn: type === 'DEVIS' ? 'auto' : '1 / -1' }}>
              <label style={labelStyle}>Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleSubmit} disabled={saving} style={{
            padding: '10px 24px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
            border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px', opacity: saving ? 0.5 : 1,
          }}>
            {saving ? 'Creation...' : `Creer le ${TYPE_LABELS[type].toLowerCase()}`}
          </button>
          <button onClick={() => router.push(backHref)} style={{
            padding: '10px 24px', borderRadius: '8px', background: 'var(--bg-secondary)',
            color: 'var(--text-secondary)', border: '1px solid var(--border)', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
          }}>Annuler</button>
        </div>
      </div>
    </div>
  );
}
