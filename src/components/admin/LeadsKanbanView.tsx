'use client';

const PIPELINE_COLUMNS = [
  { key: 'new', label: 'Nouveau', color: '#6366f1' },
  { key: 'contacted', label: 'Contacte', color: '#f59e0b' },
  { key: 'qualified', label: 'Qualifie', color: '#8b5cf6' },
  { key: 'rdv_planned', label: 'RDV Planifie', color: '#06b6d4' },
  { key: 'quote_sent', label: 'Devis Envoye', color: '#3b82f6' },
  { key: 'pending_signature', label: 'Signature', color: '#f97316' },
  { key: 'lost', label: 'Perdu', color: '#ef4444' },
];

interface Contact {
  id: string;
  name: string;
  email: string | null;
  companyName: string | null;
  status: string;
  score: number;
  projectType: string | null;
  estimatedPrice: number | null;
  createdAt: string;
}

export default function LeadsKanbanView({ contacts, onStatusChange, onContactClick }: {
  contacts: Contact[];
  onStatusChange: (id: string, status: string) => void;
  onContactClick: (id: string) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', minHeight: '500px' }}>
      {PIPELINE_COLUMNS.map(col => {
        const colContacts = contacts.filter(c => c.status === col.key);
        return (
          <div key={col.key} style={{ minWidth: '260px', flex: '1 0 260px' }}
            onDragOver={e => { e.preventDefault(); e.currentTarget.style.background = `${col.color}10`; }}
            onDragLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            onDrop={e => {
              e.preventDefault();
              e.currentTarget.style.background = 'transparent';
              const contactId = e.dataTransfer.getData('contactId');
              if (contactId) onStatusChange(contactId, col.key);
            }}>
            {/* Column Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', padding: '12px 16px', borderRadius: '10px', background: `${col.color}15`, borderLeft: `3px solid ${col.color}` }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: col.color }}>{col.label}</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px' }}>{colContacts.length}</span>
            </div>

            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {colContacts.map(contact => (
                <div key={contact.id} draggable onDragStart={e => e.dataTransfer.setData('contactId', contact.id)}
                  onClick={() => onContactClick(contact.id)}
                  style={{
                    padding: '16px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)', cursor: 'grab', transition: 'all 0.2s',
                  }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = col.color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '6px' }}>
                    {contact.companyName || contact.name}
                  </div>
                  {contact.email && <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>{contact.email}</div>}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px',
                      color: contact.score >= 70 ? '#10b981' : contact.score >= 40 ? '#f59e0b' : '#94a3b8',
                      background: contact.score >= 70 ? 'rgba(16,185,129,0.15)' : contact.score >= 40 ? 'rgba(245,158,11,0.15)' : 'rgba(148,163,184,0.15)',
                    }}>Score: {contact.score}</span>
                    {contact.estimatedPrice && <span style={{ fontSize: '11px', fontWeight: 700, color: '#638BFF' }}>{contact.estimatedPrice.toLocaleString('fr-FR')} EUR</span>}
                  </div>
                  {contact.projectType && <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>{contact.projectType}</div>}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
