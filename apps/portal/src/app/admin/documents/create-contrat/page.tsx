'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, FileDown, Link2 } from 'lucide-react';
import { ContactSearchBox } from '../_components/ContactSearchBox';
import {
  emptyClient,
  type Contact, type CompanySettings, type ClientInfo,
} from '../_components/types';
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle, primaryBtnStyle, secondaryBtnStyle } from '../_components/styles';

interface DevisDoc {
  id: string;
  documentNumber: string | null;
  title: string;
  totalAmount: number | null;
  amount: number | null;
  taxRate: number;
  status: string;
  content: Record<string, unknown> | null;
  contact?: { id: string; name: string; companyName: string | null; email: string | null; phone: string | null } | null;
}

export default function CreateContratPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: 'var(--agency-ink-3)' }}>Chargement…</div>}>
      <CreateContratContent />
    </Suspense>
  );
}

function CreateContratContent() {
  const searchParams = useSearchParams();
  const fromDevisId = searchParams.get('fromDevis');
  const editId = searchParams.get('id');

  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(!!editId);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState('');
  const [company, setCompany] = useState<CompanySettings | null>(null);

  const [devisList, setDevisList] = useState<DevisDoc[]>([]);
  const [linkedDevisId, setLinkedDevisId] = useState<string | null>(null);
  const [linkedDevisNumber, setLinkedDevisNumber] = useState<string>('');

  const [clientInfo, setClientInfo] = useState<ClientInfo>(emptyClient());
  const today = new Date();
  const inThirtyDays = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const [contratInfo, setContratInfo] = useState({
    numero_contrat: '',
    date_contrat: today.toLocaleDateString('fr-FR'),
    date_debut: today.toLocaleDateString('fr-FR'),
    date_fin: inThirtyDays.toLocaleDateString('fr-FR'),
    objet_contrat: '',
    description_prestation: '',
    montant_total: '',
    acompte_pourcentage: '30',
    conditions_paiement: 'Acompte à la signature, solde à la livraison',
  });

  const fetchAll = useCallback(async () => {
    try {
      const [c, s, d] = await Promise.all([
        fetch('/api/admin/contacts').then((r) => (r.ok ? r.json() : [])),
        fetch('/api/admin/settings').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/admin/documents?type=DEVIS').then((r) => (r.ok ? r.json() : [])),
      ]);
      setContacts(c);
      setCompany(s);
      setDevisList(Array.isArray(d) ? d : []);
    } catch { /* ignore */ }
  }, []);

  const fetchNextNumber = useCallback(async () => {
    if (editId) return;
    try {
      const res = await fetch('/api/admin/documents/next-number?type=CONTRAT');
      if (res.ok) {
        const data = await res.json();
        setContratInfo((p) => ({ ...p, numero_contrat: data.number }));
      }
    } catch { /* ignore */ }
  }, [editId]);

  const loadExisting = useCallback(async () => {
    if (!editId) return;
    try {
      const res = await fetch(`/api/admin/documents/${editId}`);
      if (!res.ok) {
        setError('Contrat introuvable');
        setEditLoading(false);
        return;
      }
      const doc = await res.json();
      const data = (doc.content || {}) as Record<string, string | unknown>;
      setContratInfo({
        numero_contrat: doc.documentNumber || '',
        date_contrat: String(data.date_contrat || new Date(doc.createdAt).toLocaleDateString('fr-FR')),
        date_debut: String(data.date_debut || ''),
        date_fin: String(data.date_fin || ''),
        objet_contrat: String(data.objet_contrat || doc.title || ''),
        description_prestation: String(data.description_prestation || ''),
        montant_total: String(data.montant_total || (doc.totalAmount ? doc.totalAmount.toFixed(2) : '')),
        acompte_pourcentage: String(data.acompte_pourcentage || '30'),
        conditions_paiement: String(data.conditions_paiement || ''),
      });
      setClientInfo({
        nom_client: String(data.nom_client || ''),
        adresse_client: String(data.adresse_client || ''),
        code_postal_client: String(data.code_postal_client || ''),
        ville_client: String(data.ville_client || ''),
        telephone_client: String(data.telephone_client || ''),
        email_client: String(data.email_client || ''),
      });
      if (doc.contact?.id) setSelectedContactId(doc.contact.id);
      if (doc.linkedDocumentId) {
        setLinkedDevisId(doc.linkedDocumentId);
        setLinkedDevisNumber(String(data.numero_devis_ref || ''));
      }
    } catch {
      setError('Erreur de chargement du contrat');
    } finally {
      setEditLoading(false);
    }
  }, [editId]);

  useEffect(() => {
    fetchAll();
    fetchNextNumber();
    loadExisting();
  }, [fetchAll, fetchNextNumber, loadExisting]);

  useEffect(() => {
    if (!fromDevisId || devisList.length === 0) return;
    const devis = devisList.find((d) => d.id === fromDevisId);
    if (devis) prefillFromDevis(devis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDevisId, devisList]);

  const prefillFromDevis = (devis: DevisDoc) => {
    setLinkedDevisId(devis.id);
    setLinkedDevisNumber(devis.documentNumber || devis.id);
    if (devis.contact) setSelectedContactId(devis.contact.id);
    const data = (devis.content || {}) as Record<string, string | unknown>;
    setClientInfo({
      nom_client: String(data.nom_client || ''),
      adresse_client: String(data.adresse_client || ''),
      code_postal_client: String(data.code_postal_client || ''),
      ville_client: String(data.ville_client || ''),
      telephone_client: String(data.telephone_client || ''),
      email_client: String(data.email_client || ''),
    });
    setContratInfo((p) => ({
      ...p,
      objet_contrat: String(data.objet_devis || devis.title || ''),
      montant_total: devis.totalAmount ? String(devis.totalAmount.toFixed(2)) : '',
    }));
  };

  const handleSelectContact = (c: Contact) => {
    setSelectedContactId(c.id);
    setClientInfo({
      nom_client: c.companyName || c.name || '',
      adresse_client: c.address || '',
      code_postal_client: c.postalCode || '',
      ville_client: c.city || '',
      telephone_client: c.phone || '',
      email_client: c.email || '',
    });
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const formData = {
        company_name: company?.companyName || 'JL Studio',
        adresse_agence: [company?.address, company?.zipCode, company?.city].filter(Boolean).join(', '),
        telephone_agence: company?.phone || '',
        email_agence: company?.email || '',
        siret_agence: company?.siret || '',
        logoUrl: company?.logoUrl || '',
        ...clientInfo,
        ...contratInfo,
        numero_devis_ref: linkedDevisNumber || '',
      };

      const totalNum = parseFloat(contratInfo.montant_total) || 0;
      const taxRate = 20;
      // Le montant_total saisi est interprété comme TTC (cohérent avec l'affichage du contrat)
      const sousTotal = totalNum / (1 + taxRate / 100);
      const taxAmount = totalNum - sousTotal;

      const res = await fetch('/api/admin/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: editId || undefined,
          type: 'CONTRAT',
          templateSlug: 'contrat-prestation',
          title: contratInfo.objet_contrat || `Contrat ${contratInfo.numero_contrat}`,
          data: formData,
          contactId: selectedContactId || undefined,
          linkedDocumentId: linkedDevisId || undefined,
          amount: parseFloat(sousTotal.toFixed(2)),
          taxRate,
          taxAmount: parseFloat(taxAmount.toFixed(2)),
          totalAmount: totalNum,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Erreur de génération');
      }

      setSuccess(true);
      setTimeout(() => { window.location.href = '/admin/documents'; }, 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const canGenerate = clientInfo.nom_client && contratInfo.objet_contrat && contratInfo.montant_total;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <header style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <a href="/admin/documents" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, color: 'var(--agency-ink-3)', textDecoration: 'none' }}>
          <ArrowLeft size={16} />
        </a>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, letterSpacing: '-0.02em' }}>
            {editId ? 'Modifier le contrat' : 'Créer un contrat'}
          </h1>
          <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginTop: 4, margin: 0 }}>
            {editId ? 'Édite les informations puis régénère le PDF.' : 'Contrat de prestation web — clauses standards préformatées.'}
          </p>
        </div>
      </header>

      {error && (
        <div style={{ marginBottom: 16, padding: 12, background: 'rgba(248,113,113,0.12)', border: '1px solid #f87171', borderRadius: 10, color: '#f87171', fontSize: 13 }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ marginBottom: 16, padding: 12, background: 'rgba(34,197,94,0.12)', border: '1px solid #22c55e', borderRadius: 10, color: '#22c55e', fontSize: 13 }}>
          {editId ? 'Contrat mis à jour. Redirection…' : 'Contrat créé. Redirection…'}
        </div>
      )}

      {editLoading && (
        <div style={{ padding: 60, textAlign: 'center', color: 'var(--agency-ink-3)', fontSize: 13 }}>
          Chargement du contrat…
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Devis source (optionnel) */}
        <section style={sectionStyle()}>
          <h2 style={sectionTitleStyle()}>Devis source <span style={{ fontWeight: 400, color: 'var(--agency-ink-3)' }}>(optionnel)</span></h2>
          {linkedDevisId ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, background: 'var(--agency-accent-soft)', border: '1px solid var(--agency-accent)', borderRadius: 8 }}>
              <Link2 size={14} style={{ color: 'var(--agency-accent)' }} />
              <div style={{ flex: 1, fontSize: 13, color: 'var(--agency-ink-1)' }}>
                Liée au devis <strong>{linkedDevisNumber}</strong>
              </div>
              <button
                type="button"
                onClick={() => { setLinkedDevisId(null); setLinkedDevisNumber(''); }}
                style={{ ...secondaryBtnStyle(), background: 'transparent', color: 'var(--agency-ink-3)' }}
              >
                Retirer
              </button>
            </div>
          ) : (
            <select
              value=""
              onChange={(e) => {
                if (!e.target.value) return;
                const devis = devisList.find((d) => d.id === e.target.value);
                if (devis) prefillFromDevis(devis);
              }}
              style={inputStyle()}
            >
              <option value="">— Sélectionner un devis pour pré-remplir —</option>
              {devisList.filter((d) => d.status !== 'CANCELLED').map((d) => (
                <option key={d.id} value={d.id}>
                  {d.documentNumber || d.id.slice(0, 8)} — {d.contact?.name || d.title} ({d.totalAmount?.toLocaleString('fr-FR') || '—'} €)
                </option>
              ))}
            </select>
          )}
        </section>

        {/* Infos contrat */}
        <section style={sectionStyle()}>
          <h2 style={sectionTitleStyle()}>Informations du contrat</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div>
              <label style={labelStyle()}>N° Contrat</label>
              <input style={inputStyle()} value={contratInfo.numero_contrat} onChange={(e) => setContratInfo({ ...contratInfo, numero_contrat: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle()}>Date du contrat</label>
              <input style={inputStyle()} value={contratInfo.date_contrat} onChange={(e) => setContratInfo({ ...contratInfo, date_contrat: e.target.value })} />
            </div>
            <div />
            <div>
              <label style={labelStyle()}>Date de début</label>
              <input style={inputStyle()} value={contratInfo.date_debut} onChange={(e) => setContratInfo({ ...contratInfo, date_debut: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle()}>Date de fin prévue</label>
              <input style={inputStyle()} value={contratInfo.date_fin} onChange={(e) => setContratInfo({ ...contratInfo, date_fin: e.target.value })} />
            </div>
          </div>
        </section>

        {/* Client */}
        <section style={sectionStyle()}>
          <h2 style={sectionTitleStyle()}>Client</h2>
          <ContactSearchBox contacts={contacts} onSelect={handleSelectContact} initialQuery={clientInfo.nom_client} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            <div>
              <label style={labelStyle()}>Nom / Société</label>
              <input style={inputStyle()} value={clientInfo.nom_client} onChange={(e) => setClientInfo({ ...clientInfo, nom_client: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle()}>Email</label>
              <input style={inputStyle()} value={clientInfo.email_client} onChange={(e) => setClientInfo({ ...clientInfo, email_client: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle()}>Téléphone</label>
              <input style={inputStyle()} value={clientInfo.telephone_client} onChange={(e) => setClientInfo({ ...clientInfo, telephone_client: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle()}>Adresse</label>
              <input style={inputStyle()} value={clientInfo.adresse_client} onChange={(e) => setClientInfo({ ...clientInfo, adresse_client: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle()}>Code postal</label>
              <input style={inputStyle()} value={clientInfo.code_postal_client} onChange={(e) => setClientInfo({ ...clientInfo, code_postal_client: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle()}>Ville</label>
              <input style={inputStyle()} value={clientInfo.ville_client} onChange={(e) => setClientInfo({ ...clientInfo, ville_client: e.target.value })} />
            </div>
          </div>
        </section>

        {/* Objet */}
        <section style={sectionStyle()}>
          <h2 style={sectionTitleStyle()}>Objet du contrat</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={labelStyle()}>Intitulé</label>
              <input
                style={inputStyle()}
                placeholder="Ex. Refonte du site corporate www.client.com"
                value={contratInfo.objet_contrat}
                onChange={(e) => setContratInfo({ ...contratInfo, objet_contrat: e.target.value })}
              />
            </div>
            <div>
              <label style={labelStyle()}>Description détaillée des prestations <span style={{ fontWeight: 400, color: 'var(--agency-ink-3)' }}>(optionnel)</span></label>
              <textarea
                style={{ ...inputStyle(), minHeight: 120, resize: 'vertical', fontFamily: 'inherit' }}
                placeholder="Ex. Conception UX/UI, design 8 maquettes, développement Next.js, intégration CMS, déploiement Vercel, formation 2h…"
                value={contratInfo.description_prestation}
                onChange={(e) => setContratInfo({ ...contratInfo, description_prestation: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Conditions financières */}
        <section style={sectionStyle()}>
          <h2 style={sectionTitleStyle()}>Conditions financières</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div>
              <label style={labelStyle()}>Montant total TTC (€)</label>
              <input
                style={inputStyle()}
                type="number"
                step="0.01"
                placeholder="6000.00"
                value={contratInfo.montant_total}
                onChange={(e) => setContratInfo({ ...contratInfo, montant_total: e.target.value })}
              />
            </div>
            <div>
              <label style={labelStyle()}>Acompte (%)</label>
              <input
                style={inputStyle()}
                type="number"
                value={contratInfo.acompte_pourcentage}
                onChange={(e) => setContratInfo({ ...contratInfo, acompte_pourcentage: e.target.value })}
              />
            </div>
            <div>
              <label style={labelStyle()}>Conditions de paiement</label>
              <input
                style={inputStyle()}
                value={contratInfo.conditions_paiement}
                onChange={(e) => setContratInfo({ ...contratInfo, conditions_paiement: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Action */}
        <section style={{ ...sectionStyle(), display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--agency-ink-3)' }}>
            Le contrat sera généré avec les <strong style={{ color: 'var(--agency-ink-2)' }}>7 articles standards</strong> (objet, durée, conditions financières, livrables &amp; PI, confidentialité, résiliation, droit applicable).
          </div>
          <button
            type="button"
            disabled={loading || !canGenerate || editLoading}
            onClick={handleGenerate}
            style={primaryBtnStyle(loading || !canGenerate || editLoading)}
          >
            <FileDown size={14} />
            {loading ? 'Génération…' : editId ? 'Régénérer le PDF' : 'Générer le PDF'}
          </button>
        </section>
      </div>
    </div>
  );
}
