'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';

interface MailLogEntry {
  id: string;
  to: string;
  subject: string | null;
  type: string | null;
  status: string;
  error: string | null;
  sentAt: string | null;
  createdAt: string;
  contact: { name: string; email: string | null } | null;
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  sent: { label: 'Envoye', color: '#10b981' },
  failed: { label: 'Echoue', color: '#ef4444' },
  pending: { label: 'En attente', color: '#f59e0b' },
};

export default function EmailsPage() {
  const { sidebarWidth, isMobile } = useSidebar();
  const [emails, setEmails] = useState<MailLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/emails?limit=200')
      .then(res => res.ok ? res.json() : [])
      .then(data => { setEmails(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = emails.filter(e => {
    if (statusFilter !== 'all' && e.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return e.to.toLowerCase().includes(q) ||
        (e.subject && e.subject.toLowerCase().includes(q));
    }
    return true;
  });

  const stats = [
    { label: 'Total envoyes', value: emails.filter(e => e.status === 'sent').length, color: '#10b981' },
    { label: 'Echecs', value: emails.filter(e => e.status === 'failed').length, color: '#ef4444' },
    { label: 'En attente', value: emails.filter(e => e.status === 'pending').length, color: '#f59e0b' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: isMobile ? '0' : `${sidebarWidth}px`, transition: 'margin-left 0.3s ease' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(to right, #0a0e1a, #101d30)', padding: isMobile ? '80px 16px 0 16px' : '32px 40px 0 40px', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)', boxShadow: '0 0 12px rgba(96,165,250,0.4)' }} />
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(96,165,250,0.3) 0%, transparent 100%)' }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Emails</span>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{s.label}</span>
                <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px', color: 'white' }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ background: 'linear-gradient(to right, #0a0e1a, #101d30)', minHeight: 'calc(100vh - 280px)', padding: isMobile ? '24px 16px' : '32px 40px' }}>
          {/* Filters */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input type="text" placeholder="Rechercher par email ou sujet..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              style={{ flex: '1 1 300px', padding: '14px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', outline: 'none', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white' }} />
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button onClick={() => setStatusFilter('all')} style={{
                padding: '10px 18px', borderRadius: '10px', border: '1px solid',
                borderColor: statusFilter === 'all' ? '#60a5fa' : 'rgba(255,255,255,0.1)',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                backgroundColor: statusFilter === 'all' ? 'rgba(96,165,250,0.2)' : 'rgba(255,255,255,0.05)',
                color: statusFilter === 'all' ? '#60a5fa' : 'rgba(255,255,255,0.7)'
              }}>Tous</button>
              {[
                { key: 'sent', label: 'Envoyes', color: '#10b981' },
                { key: 'failed', label: 'Echoues', color: '#ef4444' },
                { key: 'pending', label: 'En attente', color: '#f59e0b' },
              ].map(f => (
                <button key={f.key} onClick={() => setStatusFilter(f.key)} style={{
                  padding: '10px 18px', borderRadius: '10px', border: '1px solid',
                  borderColor: statusFilter === f.key ? f.color : 'rgba(255,255,255,0.1)',
                  fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                  backgroundColor: statusFilter === f.key ? `${f.color}30` : 'rgba(255,255,255,0.05)',
                  color: statusFilter === f.key ? f.color : 'rgba(255,255,255,0.7)'
                }}>{f.label}</button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.05)' }}>
            {loading ? (
              <div style={{ padding: '60px', textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>Chargement...</div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>Aucun email trouve</div>
            ) : isMobile ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px' }}>
                {filtered.map(email => {
                  const statusCfg = STATUS_CONFIG[email.status] || { label: email.status, color: '#94a3b8' };
                  const isExpanded = expandedId === email.id;
                  return (
                    <div key={email.id}
                      onClick={() => email.error ? setExpandedId(isExpanded ? null : email.id) : undefined}
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', cursor: email.error ? 'pointer' : 'default', transition: 'all 0.2s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ overflow: 'hidden', maxWidth: '60%' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                            {email.contact?.name || email.to}
                          </span>
                          {email.contact?.name && (
                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{email.to}</span>
                          )}
                        </div>
                        <span style={{
                          padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
                          color: statusCfg.color,
                          backgroundColor: `${statusCfg.color}20`,
                          flexShrink: 0,
                        }}>
                          {statusCfg.label}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {email.subject || '-'}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{email.type || '-'}</span>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                          {new Date(email.sentAt || email.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {isExpanded && email.error && (
                        <div style={{ marginTop: '8px', padding: '8px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', fontSize: '11px', color: '#f87171', lineHeight: '1.5' }}>
                          {email.error}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    {['Destinataire', 'Sujet', 'Type', 'Statut', 'Date'].map(h => (
                      <th key={h} style={{ padding: '16px 24px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(email => {
                    const statusCfg = STATUS_CONFIG[email.status] || { label: email.status, color: '#94a3b8' };
                    const isExpanded = expandedId === email.id;
                    return (
                      <tr key={email.id}
                        onClick={() => setExpandedId(isExpanded ? null : email.id)}
                        style={{ borderTop: '1px solid rgba(255,255,255,0.1)', cursor: email.status === 'failed' && email.error ? 'pointer' : 'default', transition: 'all 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <td style={{ padding: '20px 24px' }}>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>
                            {email.contact?.name || email.to}
                          </div>
                          {email.contact?.name && (
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{email.to}</div>
                          )}
                        </td>
                        <td style={{ padding: '20px 24px' }}>
                          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>{email.subject || '-'}</div>
                          {isExpanded && email.error && (
                            <div style={{
                              marginTop: '8px', padding: '10px 14px', borderRadius: '8px',
                              backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                              fontSize: '12px', color: '#fca5a5', lineHeight: '1.5'
                            }}>
                              {email.error}
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '20px 24px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                          {email.type || '-'}
                        </td>
                        <td style={{ padding: '20px 24px' }}>
                          <span style={{
                            padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                            color: statusCfg.color,
                            backgroundColor: `${statusCfg.color}20`,
                          }}>
                            {statusCfg.label}
                          </span>
                        </td>
                        <td style={{ padding: '20px 24px', fontSize: '13px', color: 'rgba(255,255,255,0.6)', textAlign: 'right' }}>
                          {new Date(email.sentAt || email.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
