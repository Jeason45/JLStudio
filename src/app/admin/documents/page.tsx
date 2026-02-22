'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';

interface Document {
  id: string;
  type: string;
  templateSlug: string;
  fileName: string;
  documentNumber: string;
  formData: string | null;
  amount: number | null;
  status: string;
  sentAt: string | null;
  signedAt: string | null;
  signedBy: string | null;
  signedPdfPath: string | null;
  linkedDocumentId: string | null;
  contact: { id: string; name: string; email: string } | null;
  createdAt: string;
}

type Tab = 'devis' | 'factures' | 'contrats';

const devisStatuses: { key: string; label: string }[] = [
  { key: '', label: 'Tous' },
  { key: 'draft', label: 'Brouillon' },
  { key: 'sent', label: 'Envoye' },
  { key: 'pending_signature', label: 'En attente' },
  { key: 'signed', label: 'Signe' },
  { key: 'cancelled', label: 'Annule' },
];

const factureStatuses: { key: string; label: string }[] = [
  { key: '', label: 'Toutes' },
  { key: 'draft', label: 'Brouillon' },
  { key: 'sent', label: 'Envoyee' },
  { key: 'paid', label: 'Payee' },
  { key: 'cancelled', label: 'Annulee' },
];

const contratStatuses: { key: string; label: string }[] = [
  { key: '', label: 'Tous' },
  { key: 'draft', label: 'Brouillon' },
  { key: 'sent', label: 'Envoye' },
  { key: 'pending_signature', label: 'En attente' },
  { key: 'signed', label: 'Signe' },
  { key: 'cancelled', label: 'Annule' },
];

const statusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  draft: { label: 'Brouillon', bg: 'bg-white/[0.04]', text: 'text-white/50', dot: 'bg-white/30' },
  sent: { label: 'Envoye', bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-400' },
  pending_signature: { label: 'En attente', bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400' },
  signed: { label: 'Signe', bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-400' },
  paid: { label: 'Paye', bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  cancelled: { label: 'Annule', bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-400' },
};

export default function DocumentsPage() {
  const { sidebarWidth, isMobile } = useSidebar();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('devis');
  const [filter, setFilter] = useState('');
  const [sendModal, setSendModal] = useState<Document | null>(null);
  const [sendForm, setSendForm] = useState({ to: '', recipientName: '', message: '', requiresSignature: false });
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);
  const [duplicating, setDuplicating] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    try {
      const res = await fetch('/api/documents');
      if (res.ok) setDocuments(await res.json());
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDocuments(); }, [fetchDocuments]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setFilter('');
  };

  const allDevis = useMemo(() => documents.filter((d) => d.type === 'devis' || (!['facture', 'contrat'].includes(d.type))), [documents]);
  const allFactures = useMemo(() => documents.filter((d) => d.type === 'facture'), [documents]);
  const allContrats = useMemo(() => documents.filter((d) => d.type === 'contrat'), [documents]);

  const currentDocs = useMemo(() => {
    const source = activeTab === 'devis' ? allDevis : activeTab === 'factures' ? allFactures : allContrats;
    if (!filter) return source;
    return source.filter((d) => d.status === filter);
  }, [activeTab, allDevis, allFactures, allContrats, filter]);

  const kpis = useMemo(() => {
    const devisEnCours = allDevis.filter((d) => ['sent', 'pending_signature'].includes(d.status)).length;
    const devisSignes = allDevis.filter((d) => d.status === 'signed').length;
    const devisMontantEnCours = allDevis
      .filter((d) => ['sent', 'pending_signature'].includes(d.status))
      .reduce((sum, d) => sum + (d.amount || 0), 0);

    const facturesImpayees = allFactures.filter((d) => ['draft', 'sent'].includes(d.status)).length;
    const facturesPayees = allFactures.filter((d) => d.status === 'paid').length;
    const montantImpaye = allFactures
      .filter((d) => ['draft', 'sent'].includes(d.status))
      .reduce((sum, d) => sum + (d.amount || 0), 0);
    const caEncaisse = allFactures
      .filter((d) => d.status === 'paid')
      .reduce((sum, d) => sum + (d.amount || 0), 0);

    const contratsEnCours = allContrats.filter((d) => ['sent', 'pending_signature'].includes(d.status)).length;
    const contratsSignes = allContrats.filter((d) => d.status === 'signed').length;
    const contratsMontantEnCours = allContrats
      .filter((d) => ['sent', 'pending_signature'].includes(d.status))
      .reduce((sum, d) => sum + (d.amount || 0), 0);

    return { devisEnCours, devisSignes, devisMontantEnCours, facturesImpayees, facturesPayees, montantImpaye, caEncaisse, contratsEnCours, contratsSignes, contratsMontantEnCours };
  }, [allDevis, allFactures, allContrats]);

  const handleDelete = async (doc: Document) => {
    if (!confirm(`Supprimer "${doc.documentNumber}" ?`)) return;
    try {
      const res = await fetch('/api/documents', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: doc.id }),
      });
      if (res.ok) fetchDocuments();
    } catch { /* ignore */ }
  };

  const handleMarkPaid = async (doc: Document) => {
    try {
      const res = await fetch('/api/documents/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: doc.id, status: 'paid' }),
      });
      if (res.ok) fetchDocuments();
    } catch { /* ignore */ }
  };

  const handleDuplicate = async (doc: Document) => {
    setDuplicating(doc.id);
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: doc.type,
          templateSlug: doc.templateSlug,
          formData: doc.formData,
          contactId: doc.contact?.id || null,
          amount: doc.amount,
          status: 'draft',
        }),
      });
      if (res.ok) fetchDocuments();
    } catch { /* ignore */ } finally {
      setDuplicating(null);
    }
  };

  const exportCSV = (docs: Document[]) => {
    const header = 'Numero;Date;Client;Montant;Statut\n';
    const rows = docs.map(d => `${d.documentNumber};${new Date(d.createdAt).toLocaleDateString('fr-FR')};${d.contact?.name || ''};${d.amount || 0};${d.status}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `factures-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const openSendModal = (doc: Document) => {
    setSendModal(doc);
    setSendForm({
      to: doc.contact?.email || '',
      recipientName: doc.contact?.name || '',
      message: '',
      requiresSignature: false,
    });
    setSendResult(null);
  };

  const handleSend = async () => {
    if (!sendModal || !sendForm.to) return;
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch('/api/send-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: sendModal.id,
          to: sendForm.to,
          recipientName: sendForm.recipientName,
          message: sendForm.message || undefined,
          requiresSignature: sendForm.requiresSignature,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setSendResult({ success: true, message: sendForm.requiresSignature ? 'Lien de signature envoye !' : 'Document envoye !' });
        fetchDocuments();
      } else {
        setSendResult({ success: false, message: json.error || 'Erreur envoi' });
      }
    } catch {
      setSendResult({ success: false, message: 'Erreur de connexion' });
    } finally {
      setSending(false);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const fmt = (n: number) => n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const inputClass = 'w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#638BFF]/50 focus:ring-1 focus:ring-[#638BFF]/25 transition-colors';

  const currentStatuses = activeTab === 'devis' ? devisStatuses : activeTab === 'factures' ? factureStatuses : contratStatuses;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />
      <div style={{ marginLeft: isMobile ? '0' : `${sidebarWidth}px`, transition: 'margin-left 0.3s ease', padding: isMobile ? '80px 16px 24px 16px' : '40px' }}>
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#638BFF', boxShadow: '0 0 12px rgba(99,139,255,0.4)' }} />
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(99,139,255,0.3) 0%, transparent 100%)' }} />
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' as const }}>Devis, Factures & Contrats</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {activeTab === 'devis' ? (
          <>
            <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-4">
              <div className="text-xs text-white/45 font-medium uppercase tracking-wider">En cours</div>
              <div className="text-2xl font-bold text-white mt-1">{kpis.devisEnCours}</div>
              <div className="text-xs text-white/35 mt-0.5">devis en attente</div>
            </div>
            <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-4">
              <div className="text-xs text-white/45 font-medium uppercase tracking-wider">Signes</div>
              <div className="text-2xl font-bold text-green-400 mt-1">{kpis.devisSignes}</div>
              <div className="text-xs text-white/35 mt-0.5">devis acceptes</div>
            </div>
            <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-4">
              <div className="text-xs text-white/45 font-medium uppercase tracking-wider">Montant en cours</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">{fmt(kpis.devisMontantEnCours)} EUR</div>
              <div className="text-xs text-white/35 mt-0.5">en attente de signature</div>
            </div>
            <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-4">
              <div className="text-xs text-white/45 font-medium uppercase tracking-wider">Total</div>
              <div className="text-2xl font-bold text-white mt-1">{allDevis.length}</div>
              <div className="text-xs text-white/35 mt-0.5">devis crees</div>
            </div>
          </>
        ) : activeTab === 'factures' ? (
          <>
            <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-4">
              <div className="text-xs text-white/45 font-medium uppercase tracking-wider">Impayees</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">{kpis.facturesImpayees}</div>
              <div className="text-xs text-white/35 mt-0.5">factures en attente</div>
            </div>
            <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-4">
              <div className="text-xs text-white/45 font-medium uppercase tracking-wider">Payees</div>
              <div className="text-2xl font-bold text-green-400 mt-1">{kpis.facturesPayees}</div>
              <div className="text-xs text-white/35 mt-0.5">factures reglees</div>
            </div>
            <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-4">
              <div className="text-xs text-white/45 font-medium uppercase tracking-wider">Montant impaye</div>
              <div className="text-2xl font-bold text-red-400 mt-1">{fmt(kpis.montantImpaye)} EUR</div>
              <div className="text-xs text-white/35 mt-0.5">reste a encaisser</div>
            </div>
            <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-4">
              <div className="text-xs text-white/45 font-medium uppercase tracking-wider">CA encaisse</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">{fmt(kpis.caEncaisse)} EUR</div>
              <div className="text-xs text-white/35 mt-0.5">total paye</div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-4">
              <div className="text-xs text-white/45 font-medium uppercase tracking-wider">En cours</div>
              <div className="text-2xl font-bold text-white mt-1">{kpis.contratsEnCours}</div>
              <div className="text-xs text-white/35 mt-0.5">contrats en attente</div>
            </div>
            <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-4">
              <div className="text-xs text-white/45 font-medium uppercase tracking-wider">Signes</div>
              <div className="text-2xl font-bold text-green-400 mt-1">{kpis.contratsSignes}</div>
              <div className="text-xs text-white/35 mt-0.5">contrats valides</div>
            </div>
            <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-4">
              <div className="text-xs text-white/45 font-medium uppercase tracking-wider">Montant en cours</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">{fmt(kpis.contratsMontantEnCours)} EUR</div>
              <div className="text-xs text-white/35 mt-0.5">en attente de signature</div>
            </div>
            <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-4">
              <div className="text-xs text-white/45 font-medium uppercase tracking-wider">Total</div>
              <div className="text-2xl font-bold text-white mt-1">{allContrats.length}</div>
              <div className="text-xs text-white/35 mt-0.5">contrats crees</div>
            </div>
          </>
        )}
      </div>

      {/* Tabs + Action button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center bg-[#0d1321] border border-white/[0.06] rounded-xl p-1">
          <button
            onClick={() => handleTabChange('devis')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'devis'
                ? 'bg-white/[0.08] text-white shadow-sm'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            Devis
            <span className={`px-1.5 py-0.5 rounded-md text-xs font-semibold ${
              activeTab === 'devis' ? 'bg-white/[0.08] text-white/70' : 'bg-white/[0.03] text-white/40'
            }`}>
              {allDevis.length}
            </span>
          </button>
          <button
            onClick={() => handleTabChange('factures')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'factures'
                ? 'bg-white/[0.08] text-white shadow-sm'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            Factures
            <span className={`px-1.5 py-0.5 rounded-md text-xs font-semibold ${
              activeTab === 'factures' ? 'bg-white/[0.08] text-white/70' : 'bg-white/[0.03] text-white/40'
            }`}>
              {allFactures.length}
            </span>
          </button>
          <button
            onClick={() => handleTabChange('contrats')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'contrats'
                ? 'bg-white/[0.08] text-white shadow-sm'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            Contrats
            <span className={`px-1.5 py-0.5 rounded-md text-xs font-semibold ${
              activeTab === 'contrats' ? 'bg-white/[0.08] text-white/70' : 'bg-white/[0.03] text-white/40'
            }`}>
              {allContrats.length}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'factures' && (
            <button
              onClick={() => exportCSV(currentDocs)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] text-white/60 text-sm font-medium rounded-xl hover:bg-white/[0.08] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Exporter CSV
            </button>
          )}
          <Link
            href={activeTab === 'devis' ? '/admin/documents/create' : activeTab === 'factures' ? '/admin/documents/create-facture' : '/admin/documents/create-contrat'}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#638BFF] text-white text-sm font-semibold rounded-xl hover:bg-[#638BFF]/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {activeTab === 'devis' ? 'Nouveau devis' : activeTab === 'factures' ? 'Nouvelle facture' : 'Nouveau contrat'}
          </Link>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {currentStatuses.map((s) => {
          const count = (activeTab === 'devis' ? allDevis : activeTab === 'factures' ? allFactures : allContrats).filter(
            (d) => s.key === '' || d.status === s.key
          ).length;
          return (
            <button
              key={s.key}
              onClick={() => setFilter(s.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === s.key
                  ? 'bg-[#638BFF]/15 text-[#638BFF] border border-[#638BFF]/20'
                  : 'bg-white/[0.03] text-white/35 hover:text-white/55 border border-transparent'
              }`}
            >
              {s.key && (
                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[s.key]?.dot || 'bg-white/20'}`} />
              )}
              {s.label}
              <span className="text-[10px] opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#638BFF]/30 border-t-[#638BFF] rounded-full animate-spin" />
        </div>
      ) : currentDocs.length === 0 ? (
        <div className="text-center py-16 bg-[#0d1321] border border-white/[0.06] rounded-xl">
          <p className="text-white/45 text-sm">
            {filter ? 'Aucun document avec ce statut' : `Aucun ${activeTab === 'devis' ? 'devis' : activeTab === 'factures' ? 'e facture' : 'contrat'}`}
          </p>
          <Link
            href={activeTab === 'devis' ? '/admin/documents/create' : activeTab === 'factures' ? '/admin/documents/create-facture' : '/admin/documents/create-contrat'}
            className="text-[#638BFF] text-sm mt-2 inline-block hover:underline"
          >
            Creer {activeTab === 'devis' ? 'un devis' : activeTab === 'factures' ? 'une facture' : 'un contrat'}
          </Link>
        </div>
      ) : (
        <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-4 py-3 text-[10px] font-semibold text-white/40 uppercase tracking-wider">N</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Client</th>
                  <th className="text-right px-4 py-3 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Montant</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Statut</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Date</th>
                  <th className="text-right px-4 py-3 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDocs.map((doc) => {
                  const sc = statusConfig[doc.status] || statusConfig.draft;
                  return (
                    <tr key={doc.id} className="border-b border-white/[0.03] hover:bg-white/[0.015] transition-colors group">
                      <td className="px-4 py-3.5">
                        <span className="text-sm font-semibold text-white">{doc.documentNumber}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        {doc.contact ? (
                          <div>
                            <div className="text-sm text-white/70 font-medium">{doc.contact.name}</div>
                            <div className="text-xs text-white/40">{doc.contact.email}</div>
                          </div>
                        ) : (
                          <span className="text-xs text-white/30">&mdash;</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        {doc.amount ? (
                          <span className="text-sm font-semibold text-white tabular-nums">{fmt(doc.amount)} EUR</span>
                        ) : (
                          <span className="text-xs text-white/30">&mdash;</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${sc.bg} ${sc.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {sc.label}
                        </span>
                        {doc.signedBy && (
                          <div className="text-[10px] text-white/30 mt-0.5 ml-1">par {doc.signedBy}</div>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-white/45 tabular-nums">
                        {formatDate(doc.createdAt)}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
                          {/* Download */}
                          <a
                            href={`/api/storage/documents/${encodeURIComponent(doc.fileName)}`}
                            download={doc.fileName}
                            className="p-1.5 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
                            title="Telecharger"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                          </a>
                          {/* Download signed */}
                          {doc.signedPdfPath && (
                            <a
                              href={`/api/storage/documents/signed/${encodeURIComponent(doc.fileName.replace('.pdf', '_SIGNED.pdf'))}`}
                              download
                              className="p-1.5 text-green-400/60 hover:text-green-400 transition-colors rounded-lg hover:bg-green-500/[0.06]"
                              title="Telecharger signe"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </a>
                          )}
                          {/* Edit (draft devis/contrat) */}
                          {doc.status === 'draft' && doc.type !== 'facture' && (
                            <Link
                              href={doc.type === 'contrat' ? `/admin/documents/create-contrat?id=${doc.id}` : `/admin/documents/create?id=${doc.id}`}
                              className="p-1.5 text-white/50 hover:text-amber-400 transition-colors rounded-lg hover:bg-amber-500/[0.06]"
                              title="Modifier"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                            </Link>
                          )}
                          {/* Facturer (signed devis) */}
                          {doc.type === 'devis' && doc.status === 'signed' && (
                            <Link
                              href={`/admin/documents/create-facture?fromDevis=${doc.id}`}
                              className="p-1.5 text-white/50 hover:text-purple-400 transition-colors rounded-lg hover:bg-purple-500/[0.06]"
                              title="Creer une facture"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                              </svg>
                            </Link>
                          )}
                          {/* Dupliquer (devis only) */}
                          {doc.type === 'devis' && (
                            <button
                              onClick={() => handleDuplicate(doc)}
                              disabled={duplicating === doc.id}
                              className="p-1.5 text-white/50 hover:text-cyan-400 transition-colors rounded-lg hover:bg-cyan-500/[0.06] disabled:opacity-30 disabled:cursor-not-allowed"
                              title="Dupliquer"
                            >
                              {duplicating === doc.id ? (
                                <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                              ) : (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                                </svg>
                              )}
                            </button>
                          )}
                          {/* Mark as paid (sent facture) */}
                          {doc.type === 'facture' && doc.status === 'sent' && (
                            <button
                              onClick={() => handleMarkPaid(doc)}
                              className="p-1.5 text-white/50 hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-500/[0.06]"
                              title="Marquer payee"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          )}
                          {/* Send */}
                          <button
                            onClick={() => openSendModal(doc)}
                            className="p-1.5 text-white/50 hover:text-[#638BFF] transition-colors rounded-lg hover:bg-[#638BFF]/[0.06]"
                            title="Envoyer"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(doc)}
                            className="p-1.5 text-white/50 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/[0.06]"
                            title="Supprimer"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Send Modal */}
      {sendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSendModal(null)} />
          <div className="relative bg-[#0d1321] border border-white/[0.08] rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Envoyer le document</h3>
            <p className="text-xs text-white/45 mb-5">{sendModal.documentNumber}</p>

            {sendResult && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${sendResult.success ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {sendResult.message}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/40 mb-1">Email destinataire</label>
                <input className={inputClass} type="email" value={sendForm.to}
                       onChange={(e) => setSendForm({ ...sendForm, to: e.target.value })} placeholder="client@email.com" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/40 mb-1">Nom destinataire</label>
                <input className={inputClass} value={sendForm.recipientName}
                       onChange={(e) => setSendForm({ ...sendForm, recipientName: e.target.value })} placeholder="Jean Dupont" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/40 mb-1">Message (optionnel)</label>
                <textarea className={inputClass} rows={3} value={sendForm.message}
                          onChange={(e) => setSendForm({ ...sendForm, message: e.target.value })} placeholder="Un message personnalise..." />
              </div>
              {(sendModal.type === 'devis' || sendModal.type === 'contrat') && (
                <label className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] cursor-pointer">
                  <input type="checkbox" checked={sendForm.requiresSignature}
                         onChange={(e) => setSendForm({ ...sendForm, requiresSignature: e.target.checked })}
                         className="w-4 h-4 rounded border-white/20 bg-white/[0.04] text-[#638BFF] focus:ring-[#638BFF]/25" />
                  <div>
                    <span className="text-sm text-white font-medium">Demander une signature</span>
                    <p className="text-xs text-white/45">Le destinataire recevra un lien pour signer electroniquement</p>
                  </div>
                </label>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setSendModal(null)}
                      className="flex-1 py-2.5 bg-white/[0.04] text-white/60 text-sm font-medium rounded-lg hover:bg-white/[0.08] transition-colors">
                Annuler
              </button>
              <button onClick={handleSend} disabled={sending || !sendForm.to}
                      className="flex-1 py-2.5 bg-[#638BFF] text-white text-sm font-semibold rounded-lg hover:bg-[#638BFF]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                {sending ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
      </div>
    </div>
  );
}
