'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, FileDown, Link2 } from 'lucide-react';
import { ContactSearchBox } from '../_components/ContactSearchBox';
import { LignesEditor } from '../_components/LignesEditor';
import {
  emptyClient, emptyDestinataire, emptyLigne,
  type Contact, type CompanySettings, type LigneDocument, type ClientInfo, type Destinataire,
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

export default function CreateFacturePage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: 'var(--agency-ink-3)' }}>Chargement…</div>}>
      <CreateFactureContent />
    </Suspense>
  );
}

function CreateFactureContent() {
  const searchParams = useSearchParams();
  const fromDevisId = searchParams.get('fromDevis');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState('');
  const [company, setCompany] = useState<CompanySettings | null>(null);

  const [devisList, setDevisList] = useState<DevisDoc[]>([]);
  const [linkedDevisId, setLinkedDevisId] = useState<string | null>(null);
  const [linkedDevisNumber, setLinkedDevisNumber] = useState<string>('');

  const [clientInfo, setClientInfo] = useState<ClientInfo>(emptyClient());
  const [destinataire, setDestinataire] = useState<Destinataire>(emptyDestinataire());
  const [lignes, setLignes] = useState<LigneDocument[]>([emptyLigne()]);

  const [factureInfo, setFactureInfo] = useState({
    numero_facture: '',
    date_facture: new Date().toLocaleDateString('fr-FR'),
    date_echeance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
    objet_facture: '',
    acompte_verse: '',
    conditions_reglement: '30 jours net',
    mode_reglement: 'Virement bancaire',
    penalite_retard: '3 fois le taux d\'intérêt légal',
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
    try {
      const res = await fetch('/api/admin/documents/next-number?type=FACTURE');
      if (res.ok) {
        const data = await res.json();
        setFactureInfo((p) => ({ ...p, numero_facture: data.number }));
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    fetchAll();
    fetchNextNumber();
  }, [fetchAll, fetchNextNumber]);

  // Auto-prefill from devis if fromDevis param present
  useEffect(() => {
    if (!fromDevisId || devisList.length === 0) return;
    const devis = devisList.find((d) => d.id === fromDevisId);
    if (devis) prefillFromDevis(devis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDevisId, devisList]);

  const prefillFromDevis = (devis: DevisDoc) => {
    setLinkedDevisId(devis.id);
    setLinkedDevisNumber(devis.documentNumber || devis.id);
    if (devis.contact) {
      setSelectedContactId(devis.contact.id);
    }
    const data = (devis.content || {}) as Record<string, string | unknown>;
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
      const importedLignes = (data.lignes as Array<Record<string, unknown>>).map((l) => ({
        description: String(l.description || ''),
        prix_unitaire: String(l.prix_unitaire || ''),
        quantite: String(l.quantite || '1'),
        unite: String(l.unite || ''),
      }));
      setLignes(importedLignes);
    }
    setFactureInfo((p) => ({
      ...p,
      objet_facture: String(data.objet_devis || data.objet_facture || devis.title || ''),
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
  const acompteVerse = parseFloat(factureInfo.acompte_verse) || 0;
  const resteAPayer = totalTTC - acompteVerse;

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
        iban: company?.iban || '',
        bic: company?.bic || '',
        logoUrl: company?.logoUrl || '',
        ...clientInfo,
        ...destinataire,
        ...factureInfo,
        numero_devis_ref: linkedDevisNumber || '',
        lignes: lignes.map((l) => ({
          description: l.description,
          prix_unitaire: fmt(parseFloat(l.prix_unitaire) || 0),
          quantite: l.quantite,
          unite: l.unite,
          total_ht: fmt((parseFloat(l.prix_unitaire) || 0) * (parseFloat(l.quantite) || 0)),
        })),
        sous_total_ht: fmt(sousTotal),
        reste_a_payer: fmt(resteAPayer),
      };

      const res = await fetch('/api/admin/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'FACTURE',
          templateSlug: 'facture-moderne',
          title: factureInfo.objet_facture || `Facture ${factureInfo.numero_facture}`,
          data: formData,
          contactId: selectedContactId || undefined,
          linkedDocumentId: linkedDevisId || undefined,
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
      <header style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <a href="/admin/documents" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, color: 'var(--agency-ink-3)', textDecoration: 'none' }}>
          <ArrowLeft size={16} />
        </a>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, letterSpacing: '-0.02em' }}>
            Créer une facture
          </h1>
          <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginTop: 4, margin: 0 }}>
            Pars d&apos;un devis existant ou repars de zéro.
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
          Facture créée. Redirection…
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Lien devis source */}
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

        {/* Infos facture */}
        <section style={sectionStyle()}>
          <h2 style={sectionTitleStyle()}>Informations de la facture</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            <div>
              <label style={labelStyle()}>N° Facture</label>
              <input style={inputStyle()} value={factureInfo.numero_facture} onChange={(e) => setFactureInfo({ ...factureInfo, numero_facture: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle()}>Date</label>
              <input style={inputStyle()} value={factureInfo.date_facture} onChange={(e) => setFactureInfo({ ...factureInfo, date_facture: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle()}>Échéance</label>
              <input style={inputStyle()} value={factureInfo.date_echeance} onChange={(e) => setFactureInfo({ ...factureInfo, date_echeance: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle()}>Acompte versé (€)</label>
              <input style={inputStyle()} type="number" step="0.01" value={factureInfo.acompte_verse} onChange={(e) => setFactureInfo({ ...factureInfo, acompte_verse: e.target.value })} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle()}>Objet</label>
              <input style={inputStyle()} value={factureInfo.objet_facture} onChange={(e) => setFactureInfo({ ...factureInfo, objet_facture: e.target.value })} />
            </div>
          </div>
        </section>

        {/* Client + Destinataire */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <section style={sectionStyle()}>
            <h2 style={sectionTitleStyle()}>Adresse de facturation</h2>
            <ContactSearchBox contacts={contacts} onSelect={handleSelectContact} initialQuery={clientInfo.nom_client} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <label style={labelStyle()}>Nom / Société</label>
                <input style={inputStyle()} value={clientInfo.nom_client} onChange={(e) => setClientInfo({ ...clientInfo, nom_client: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle()}>Adresse</label>
                <input style={inputStyle()} value={clientInfo.adresse_client} onChange={(e) => setClientInfo({ ...clientInfo, adresse_client: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={labelStyle()}>Code postal</label>
                  <input style={inputStyle()} value={clientInfo.code_postal_client} onChange={(e) => setClientInfo({ ...clientInfo, code_postal_client: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle()}>Ville</label>
                  <input style={inputStyle()} value={clientInfo.ville_client} onChange={(e) => setClientInfo({ ...clientInfo, ville_client: e.target.value })} />
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
                <input style={inputStyle()} value={destinataire.nom_destinataire} onChange={(e) => setDestinataire({ ...destinataire, nom_destinataire: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle()}>Téléphone</label>
                <input style={inputStyle()} value={destinataire.telephone_destinataire} onChange={(e) => setDestinataire({ ...destinataire, telephone_destinataire: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle()}>Email</label>
                <input style={inputStyle()} value={destinataire.email_destinataire} onChange={(e) => setDestinataire({ ...destinataire, email_destinataire: e.target.value })} />
              </div>
            </div>
          </section>
        </div>

        {/* Lignes */}
        <LignesEditor lignes={lignes} setLignes={setLignes} />

        {/* Conditions */}
        <section style={sectionStyle()}>
          <h2 style={sectionTitleStyle()}>Règlement</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div>
              <label style={labelStyle()}>Conditions de règlement</label>
              <input style={inputStyle()} value={factureInfo.conditions_reglement} onChange={(e) => setFactureInfo({ ...factureInfo, conditions_reglement: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle()}>Mode de règlement</label>
              <input style={inputStyle()} value={factureInfo.mode_reglement} onChange={(e) => setFactureInfo({ ...factureInfo, mode_reglement: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle()}>Pénalité de retard</label>
              <input style={inputStyle()} value={factureInfo.penalite_retard} onChange={(e) => setFactureInfo({ ...factureInfo, penalite_retard: e.target.value })} />
            </div>
          </div>
        </section>

        {/* Totaux + Action */}
        <section style={{ ...sectionStyle(), display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--agency-ink-3)' }}>Sous-total HT : <strong style={{ color: 'var(--agency-ink-2)' }}>{fmt(sousTotal)} €</strong></div>
            <div style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginTop: 2 }}>TVA 20% : {fmt(taxAmount)} €</div>
            {acompteVerse > 0 && (
              <div style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginTop: 2 }}>
                Acompte versé : −{fmt(acompteVerse)} €
              </div>
            )}
            <div style={{ fontSize: 18, color: 'var(--agency-ink-1)', fontWeight: 700, marginTop: 6 }}>
              {acompteVerse > 0 ? `Reste à payer : ${fmt(resteAPayer)} €` : `Total TTC : ${fmt(totalTTC)} €`}
            </div>
          </div>
          <button
            type="button"
            disabled={loading || !canGenerate}
            onClick={handleGenerate}
            style={primaryBtnStyle(loading || !canGenerate)}
          >
            <FileDown size={14} />
            {loading ? 'Génération…' : 'Générer le PDF'}
          </button>
        </section>
      </div>
    </div>
  );
}
