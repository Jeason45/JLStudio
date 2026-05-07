'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, FileDown } from 'lucide-react';
import { ContactSearchBox } from '../_components/ContactSearchBox';
import { LignesEditor } from '../_components/LignesEditor';
import {
  emptyClient, emptyDestinataire, emptyLigne,
  type Contact, type CompanySettings, type LigneDocument, type ClientInfo, type Destinataire,
} from '../_components/types';
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle, primaryBtnStyle } from '../_components/styles';

export default function CreateDevisPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: 'var(--agency-ink-3)' }}>Chargement…</div>}>
      <CreateDevisContent />
    </Suspense>
  );
}

function CreateDevisContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(!!editId);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState('');
  const [company, setCompany] = useState<CompanySettings | null>(null);

  const [clientInfo, setClientInfo] = useState<ClientInfo>(emptyClient());
  const [destinataire, setDestinataire] = useState<Destinataire>(emptyDestinataire());
  const [lignes, setLignes] = useState<LigneDocument[]>([emptyLigne()]);

  const [devisInfo, setDevisInfo] = useState({
    numero_devis: '',
    date_devis: new Date().toLocaleDateString('fr-FR'),
    objet_devis: '',
    validite_jours: '30',
    acompte_pourcentage: '',
    conditions_reglement: '30 jours net',
    mode_reglement: 'Virement bancaire',
  });

  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/contacts');
      if (res.ok) setContacts(await res.json());
    } catch { /* ignore */ }
  }, []);

  const fetchCompany = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) setCompany(await res.json());
    } catch { /* ignore */ }
  }, []);

  const fetchNextNumber = useCallback(async () => {
    if (editId) return;
    try {
      const res = await fetch('/api/admin/documents/next-number?type=DEVIS');
      if (res.ok) {
        const data = await res.json();
        setDevisInfo((p) => ({ ...p, numero_devis: data.number }));
      }
    } catch { /* ignore */ }
  }, [editId]);

  const loadExisting = useCallback(async () => {
    if (!editId) return;
    try {
      const res = await fetch(`/api/admin/documents/${editId}`);
      if (!res.ok) {
        setError('Devis introuvable');
        setEditLoading(false);
        return;
      }
      const doc = await res.json();
      const data = (doc.content || {}) as Record<string, string | unknown>;
      setDevisInfo({
        numero_devis: doc.documentNumber || '',
        date_devis: String(data.date_devis || new Date(doc.createdAt).toLocaleDateString('fr-FR')),
        objet_devis: String(data.objet_devis || doc.title || ''),
        validite_jours: String(data.validite_jours || '30'),
        acompte_pourcentage: String(data.acompte_pourcentage || ''),
        conditions_reglement: String(data.conditions_reglement || '30 jours net'),
        mode_reglement: String(data.mode_reglement || 'Virement bancaire'),
      });
      setClientInfo({
        nom_client: String(data.nom_client || ''),
        adresse_client: String(data.adresse_client || ''),
        code_postal_client: String(data.code_postal_client || ''),
        ville_client: String(data.ville_client || ''),
        telephone_client: String(data.telephone_client || ''),
        email_client: String(data.email_client || ''),
      });
      setDestinataire({
        nom_destinataire: String(data.nom_destinataire || ''),
        adresse_destinataire: String(data.adresse_destinataire || ''),
        telephone_destinataire: String(data.telephone_destinataire || ''),
        email_destinataire: String(data.email_destinataire || ''),
      });
      if (Array.isArray(data.lignes) && data.lignes.length > 0) {
        setLignes((data.lignes as Array<Record<string, unknown>>).map((l) => ({
          description: String(l.description || ''),
          prix_unitaire: String(l.prix_unitaire || ''),
          quantite: String(l.quantite || '1'),
          unite: String(l.unite || ''),
        })));
      }
      if (doc.contact?.id) setSelectedContactId(doc.contact.id);
    } catch {
      setError('Erreur de chargement du devis');
    } finally {
      setEditLoading(false);
    }
  }, [editId]);

  useEffect(() => {
    fetchContacts();
    fetchCompany();
    fetchNextNumber();
    loadExisting();
  }, [fetchContacts, fetchCompany, fetchNextNumber, loadExisting]);

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
    setDestinataire({
      nom_destinataire: c.name || '',
      adresse_destinataire: '',
      telephone_destinataire: c.phone || '',
      email_destinataire: c.email || '',
    });
  };

  const fmt = (n: number) => n.toFixed(2);
  const sousTotal = lignes.reduce(
    (s, l) => s + (parseFloat(l.prix_unitaire) || 0) * (parseFloat(l.quantite) || 0),
    0,
  );
  const taxRate = 20;
  const taxAmount = (sousTotal * taxRate) / 100;
  const totalTTC = sousTotal + taxAmount;

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
        ...destinataire,
        ...devisInfo,
        lignes: lignes.map((l) => ({
          description: l.description,
          prix_unitaire: fmt(parseFloat(l.prix_unitaire) || 0),
          quantite: l.quantite,
          unite: l.unite,
          total_ht: fmt((parseFloat(l.prix_unitaire) || 0) * (parseFloat(l.quantite) || 0)),
        })),
        sous_total_ht: fmt(sousTotal),
      };

      const res = await fetch('/api/admin/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: editId || undefined,
          type: 'DEVIS',
          templateSlug: 'devis-moderne',
          title: devisInfo.objet_devis || `Devis ${devisInfo.numero_devis}`,
          data: formData,
          contactId: selectedContactId || undefined,
          amount: sousTotal,
          taxRate,
          taxAmount,
          totalAmount: totalTTC,
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

  const canGenerate = clientInfo.nom_client && lignes.some((l) => l.description.trim());

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <header style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <a
          href="/admin/documents"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: 8,
            color: 'var(--agency-ink-3)',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} />
        </a>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, letterSpacing: '-0.02em' }}>
            {editId ? 'Modifier le devis' : 'Créer un devis'}
          </h1>
          <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginTop: 4, margin: 0 }}>
            {editId ? 'Édite les informations puis régénère le PDF.' : 'Sélectionne un client, remplis les prestations, génère le PDF.'}
          </p>
        </div>
      </header>

      {error && (
        <div style={{
          marginBottom: 16, padding: 12,
          background: 'var(--agency-danger-soft, rgba(248,113,113,0.12))',
          border: '1px solid var(--agency-danger, #f87171)',
          borderRadius: 10,
          color: 'var(--agency-danger, #f87171)',
          fontSize: 13,
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          marginBottom: 16, padding: 12,
          background: 'rgba(34,197,94,0.12)',
          border: '1px solid #22c55e',
          borderRadius: 10,
          color: '#22c55e',
          fontSize: 13,
        }}>
          {editId ? 'Devis mis à jour. Redirection…' : 'Devis créé. Redirection…'}
        </div>
      )}

      {editLoading && (
        <div style={{ padding: 60, textAlign: 'center', color: 'var(--agency-ink-3)', fontSize: 13 }}>
          Chargement du devis…
        </div>
      )}

      {company && !company.address && (
        <div style={{
          marginBottom: 16, padding: 12,
          background: 'rgba(245,158,11,0.12)',
          border: '1px solid #f59e0b',
          borderRadius: 10,
          color: '#f59e0b',
          fontSize: 13,
        }}>
          Les infos de l&apos;agence ne sont pas configurées.{' '}
          <a href="/admin/parametres" style={{ textDecoration: 'underline', fontWeight: 600 }}>
            Va dans Paramètres
          </a>
          {' '}pour les remplir avant de générer le PDF.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Infos devis */}
        <section style={sectionStyle()}>
          <h2 style={sectionTitleStyle()}>Informations du devis</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            <div>
              <label style={labelStyle()}>N° Devis</label>
              <input
                style={inputStyle()}
                value={devisInfo.numero_devis}
                onChange={(e) => setDevisInfo({ ...devisInfo, numero_devis: e.target.value })}
              />
            </div>
            <div>
              <label style={labelStyle()}>Date</label>
              <input
                style={inputStyle()}
                value={devisInfo.date_devis}
                onChange={(e) => setDevisInfo({ ...devisInfo, date_devis: e.target.value })}
              />
            </div>
            <div>
              <label style={labelStyle()}>Validité (jours)</label>
              <input
                style={inputStyle()}
                type="number"
                value={devisInfo.validite_jours}
                onChange={(e) => setDevisInfo({ ...devisInfo, validite_jours: e.target.value })}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle()}>Objet du devis</label>
              <input
                style={inputStyle()}
                placeholder="Ex. Refonte du site corporate, identité visuelle…"
                value={devisInfo.objet_devis}
                onChange={(e) => setDevisInfo({ ...devisInfo, objet_devis: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Client + Destinataire */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <section style={sectionStyle()}>
            <h2 style={sectionTitleStyle()}>Adresse de facturation</h2>
            <ContactSearchBox contacts={contacts} onSelect={handleSelectContact} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <label style={labelStyle()}>Nom / Société</label>
                <input
                  style={inputStyle()}
                  value={clientInfo.nom_client}
                  onChange={(e) => setClientInfo({ ...clientInfo, nom_client: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle()}>Adresse</label>
                <input
                  style={inputStyle()}
                  value={clientInfo.adresse_client}
                  onChange={(e) => setClientInfo({ ...clientInfo, adresse_client: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={labelStyle()}>Code postal</label>
                  <input
                    style={inputStyle()}
                    value={clientInfo.code_postal_client}
                    onChange={(e) => setClientInfo({ ...clientInfo, code_postal_client: e.target.value })}
                  />
                </div>
                <div>
                  <label style={labelStyle()}>Ville</label>
                  <input
                    style={inputStyle()}
                    value={clientInfo.ville_client}
                    onChange={(e) => setClientInfo({ ...clientInfo, ville_client: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </section>

          <section style={sectionStyle()}>
            <h2 style={sectionTitleStyle()}>À l&apos;attention de</h2>
            <ContactSearchBox
              contacts={contacts}
              onSelect={(c) => setDestinataire({
                nom_destinataire: c.name || '',
                adresse_destinataire: '',
                telephone_destinataire: c.phone || '',
                email_destinataire: c.email || '',
              })}
              label="Rechercher un contact (destinataire)"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <label style={labelStyle()}>Nom</label>
                <input
                  style={inputStyle()}
                  value={destinataire.nom_destinataire}
                  onChange={(e) => setDestinataire({ ...destinataire, nom_destinataire: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle()}>Téléphone</label>
                <input
                  style={inputStyle()}
                  value={destinataire.telephone_destinataire}
                  onChange={(e) => setDestinataire({ ...destinataire, telephone_destinataire: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle()}>Email</label>
                <input
                  style={inputStyle()}
                  value={destinataire.email_destinataire}
                  onChange={(e) => setDestinataire({ ...destinataire, email_destinataire: e.target.value })}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Lignes */}
        <LignesEditor lignes={lignes} setLignes={setLignes} />

        {/* Conditions */}
        <section style={sectionStyle()}>
          <h2 style={sectionTitleStyle()}>Conditions <span style={{ fontWeight: 400, color: 'var(--agency-ink-4, var(--agency-ink-3))' }}>(optionnel)</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div>
              <label style={labelStyle()}>Acompte (%)</label>
              <input
                style={inputStyle()}
                type="number"
                placeholder="30"
                value={devisInfo.acompte_pourcentage}
                onChange={(e) => setDevisInfo({ ...devisInfo, acompte_pourcentage: e.target.value })}
              />
            </div>
            <div>
              <label style={labelStyle()}>Conditions de règlement</label>
              <input
                style={inputStyle()}
                value={devisInfo.conditions_reglement}
                onChange={(e) => setDevisInfo({ ...devisInfo, conditions_reglement: e.target.value })}
              />
            </div>
            <div>
              <label style={labelStyle()}>Mode de règlement</label>
              <input
                style={inputStyle()}
                value={devisInfo.mode_reglement}
                onChange={(e) => setDevisInfo({ ...devisInfo, mode_reglement: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Totaux + Action */}
        <section style={{ ...sectionStyle(), display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--agency-ink-3)' }}>Sous-total HT</div>
            <div style={{ fontSize: 14, color: 'var(--agency-ink-2)', fontWeight: 500 }}>{fmt(sousTotal)} €</div>
            <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', marginTop: 6 }}>TVA 20% : {fmt(taxAmount)} €</div>
            <div style={{ fontSize: 18, color: 'var(--agency-ink-1)', fontWeight: 700, marginTop: 4 }}>
              Total TTC : {fmt(totalTTC)} €
            </div>
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
