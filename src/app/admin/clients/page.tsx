'use client';

import { useState, useEffect, useMemo } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import LeadDetailModal from '@/components/admin/LeadDetailModal';
import { Search, UserPlus, Building2, User, Mail, Phone, FolderKanban, Filter, DollarSign, ShoppingCart } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  companyName: string | null;
  type: string;
  status: string;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: { projects: number };
  projects?: { id: string; name: string; status: string; progress: number; estimatedBudget: number | null }[];
}

interface DocumentData {
  id: string;
  type: string;
  status: string;
  amount: number | null;
  contactId: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  planification: '#94a3b8',
  en_cours: '#10b981',
  tests: '#f59e0b',
  livre: '#8b5cf6',
  en_pause: '#64748b',
  annule: '#ef4444',
};

export default function ClientsPage() {
  const { sidebarWidth, isMobile } = useSidebar();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'entreprise' | 'particulier'>('all');
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  const fetchContacts = () => {
    fetch('/api/contacts')
      .then(res => res.ok ? res.json() : [])
      .then(data => { setContacts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  const fetchDocuments = () => {
    fetch('/api/documents')
      .then(res => res.ok ? res.json() : [])
      .then(data => { setDocuments(Array.isArray(data) ? data : []); })
      .catch(() => {});
  };

  useEffect(() => { fetchContacts(); fetchDocuments(); }, []);

  // Calculate CA per client from paid invoices
  const caParClient = useMemo(() => {
    const map: Record<string, number> = {};
    documents
      .filter(d => d.type === 'facture' && (d.status === 'paid' || d.status === 'signed'))
      .forEach(d => {
        if (d.contactId && d.amount) {
          map[d.contactId] = (map[d.contactId] || 0) + d.amount;
        }
      });
    return map;
  }, [documents]);

  const clients = useMemo(() => {
    let list = contacts.filter(c => c.status === 'client');
    if (typeFilter !== 'all') list = list.filter(c => c.type === typeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || (c.email && c.email.toLowerCase().includes(q)) || (c.companyName && c.companyName.toLowerCase().includes(q)));
    }
    return list;
  }, [contacts, typeFilter, searchQuery]);

  const allClients = contacts.filter(c => c.status === 'client');

  const formatCurrency = (amount: number | null) => {
    if (amount === null || amount === undefined) return '-';
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  // Total CA across all clients
  const caTotal = useMemo(() => {
    return Object.values(caParClient).reduce((sum, v) => sum + v, 0);
  }, [caParClient]);

  // Panier moyen = CA total / nombre de clients ayant au moins une facture payee
  const panierMoyen = useMemo(() => {
    const clientsAvecCA = Object.keys(caParClient).length;
    return clientsAvecCA > 0 ? caTotal / clientsAvecCA : 0;
  }, [caParClient, caTotal]);

  const stats = [
    { label: 'Total Clients', value: allClients.length, icon: <User size={24} />, color: '#638BFF' },
    { label: 'Entreprises', value: allClients.filter(c => c.type === 'entreprise').length, icon: <Building2 size={24} />, color: '#10b981' },
    { label: 'Particuliers', value: allClients.filter(c => c.type === 'particulier').length, icon: <User size={24} />, color: '#f59e0b' },
    { label: 'CA Total', value: formatCurrency(caTotal), icon: <DollarSign size={24} />, color: '#6366f1' },
    { label: 'Panier Moyen', value: formatCurrency(panierMoyen), icon: <ShoppingCart size={24} />, color: '#ec4899' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: isMobile ? '0' : `${sidebarWidth}px`, transition: 'margin-left 0.3s ease' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(to right, #0a0e1a, #101d30)', padding: isMobile ? '80px 16px 32px 16px' : '40px 40px 32px 40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)', boxShadow: '0 0 12px rgba(99,139,255,0.4)' }} />
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99,139,255,0.3) 0%, transparent 100%)' }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Clients</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', padding: isMobile ? '16px' : '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '16px' }}>
                <div style={{ width: isMobile ? '44px' : '56px', height: isMobile ? '44px' : '56px', borderRadius: '12px', background: `${s.color}15`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: typeof s.value === 'string' ? (isMobile ? '16px' : '20px') : (isMobile ? '22px' : '28px'), fontWeight: 700, color: typeof s.value === 'string' ? s.color : 'white' }}>{s.value}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div style={{ padding: isMobile ? '16px' : '24px 40px', background: 'linear-gradient(to right, #0a0e1a, #101d30)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)' }} />
            <input type="text" placeholder="Rechercher un client..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 44px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '14px', outline: 'none', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Filter size={18} style={{ color: 'rgba(255,255,255,0.5)' }} />
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as 'all' | 'entreprise' | 'particulier')}
              style={{ padding: '12px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', outline: 'none', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white' }}>
              <option value="all">Tous les types</option>
              <option value="entreprise">Entreprises</option>
              <option value="particulier">Particuliers</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: isMobile ? '24px 16px' : '40px', background: 'linear-gradient(to right, #0a0e1a, #101d30)', minHeight: 'calc(100vh - 400px)' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.7)' }}>Chargement...</div>
          ) : clients.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '8px' }}>Aucun client trouve</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Les leads convertis apparaitront ici</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              {clients.map(contact => (
                <div key={contact.id} onClick={() => setSelectedContactId(contact.id)}
                  style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px', cursor: 'pointer', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.1)' }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = '#638BFF'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>
                        {contact.companyName || contact.name}
                      </h3>
                      {contact.companyName && <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>Contact: {contact.name}</p>}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{
                        padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, color: 'white',
                        background: contact.type === 'entreprise' ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)'
                      }}>
                        {contact.type === 'entreprise' ? 'Entreprise' : 'Particulier'}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    {contact.email && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}><Mail size={16} />{contact.email}</div>}
                    {contact.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}><Phone size={16} />{contact.phone}</div>}
                  </div>

                  {/* Projects */}
                  {contact.projects && contact.projects.length > 0 && (
                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '8px', textTransform: 'uppercase' }}>
                        Projets ({contact._count?.projects || contact.projects.length})
                      </h4>
                      {contact.projects.map(p => (
                        <div key={p.id} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px 12px', marginBottom: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>{p.name}</span>
                            <span style={{ padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 600, color: STATUS_COLORS[p.status] || '#94a3b8', background: `${STATUS_COLORS[p.status] || '#94a3b8'}15` }}>{p.status}</span>
                          </div>
                          <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: `${p.progress}%`, height: '100%', background: p.progress >= 70 ? '#10b981' : p.progress >= 30 ? '#f59e0b' : '#ef4444', transition: 'width 0.3s' }} />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>{p.progress}%</span>
                            {p.estimatedBudget && <span style={{ fontSize: '11px', fontWeight: 700, color: '#638BFF' }}>{formatCurrency(p.estimatedBudget)}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CA client */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <DollarSign size={16} style={{ color: '#6366f1' }} />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CA Client</span>
                    </div>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: caParClient[contact.id] ? '#6366f1' : 'rgba(255,255,255,0.4)' }}>
                      {caParClient[contact.id] ? formatCurrency(caParClient[contact.id]) : '0,00 €'}
                    </span>
                  </div>

                  <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '12px', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                    Client depuis le {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedContactId && (
        <LeadDetailModal contactId={selectedContactId} onClose={() => setSelectedContactId(null)} onUpdate={fetchContacts} />
      )}
    </div>
  );
}
