'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';

interface Contact {
  id: string;
  name: string;
  companyName?: string | null;
  email: string;
  phone?: string;
  address?: string;
  postalCode?: string;
  city?: string;
}

interface LigneFacture {
  description: string;
  prix_unitaire: string;
  quantite: string;
  unite: string;
}

interface CompanySettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  siret: string;
  iban: string;
  bic: string;
  tvaNumber: string;
  defaultPaymentTerms: string;
  penaltyRate: number;
}

export default function CreateFacturePage() {
  const { sidebarWidth, isMobile } = useSidebar();
  return (
    <div style={{ minHeight: '100vh', background: '#0a0e1a' }}>
      <AdminSidebar />
      <div style={{ marginLeft: isMobile ? '0' : `${sidebarWidth}px`, transition: 'margin-left 0.3s ease', padding: isMobile ? '80px 16px 24px 16px' : '40px' }}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-[60vh]">
              <div className="w-8 h-8 border-2 border-[#638BFF]/30 border-t-[#638BFF] rounded-full animate-spin" />
            </div>
          }
        >
          <CreateFactureContent />
        </Suspense>
      </div>
    </div>
  );
}

function CreateFactureContent() {
  const searchParams = useSearchParams();
  const fromDevisId = searchParams.get('fromDevis');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [savedDocumentId, setSavedDocumentId] = useState<string | null>(null);
  const [prefillLoading, setPrefillLoading] = useState(!!fromDevisId);

  // Contacts list
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Destinataire contact search
  const [destSearchQuery, setDestSearchQuery] = useState('');
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const destDropdownRef = useRef<HTMLDivElement>(null);

  // Company settings
  const [company, setCompany] = useState<CompanySettings>({
    name: 'JL Studio',
    address: '',
    phone: '',
    email: '',
    siret: '',
    iban: '',
    bic: '',
    tvaNumber: '',
    defaultPaymentTerms: '30 jours net',
    penaltyRate: 3.0,
  });

  // Client info
  const [clientInfo, setClientInfo] = useState({
    nom_client: '',
    adresse_client: '',
    code_postal_client: '',
    ville_client: '',
  });

  // Destinataire
  const [destinataire, setDestinataire] = useState({
    nom_destinataire: '',
    telephone_destinataire: '',
    email_destinataire: '',
  });

  // Facture info
  const [factureInfo, setFactureInfo] = useState({
    numero_facture: '',
    date_facture: new Date().toLocaleDateString('fr-FR'),
    objet_facture: '',
    tva_pourcentage: '20',
    conditions_reglement: '',
    mode_reglement: '',
    date_echeance: '',
    numero_devis_ref: '',
    acompte_verse: '',
  });

  // Source devis ID (for linking)
  const [sourceDevisId, setSourceDevisId] = useState<string | null>(null);

  // Lignes
  const [lignes, setLignes] = useState<LigneFacture[]>([
    { description: '', prix_unitaire: '', quantite: '1', unite: '' },
  ]);

  // Fetch contacts & company settings
  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch('/api/contacts');
      if (res.ok) setContacts(await res.json());
    } catch {
      /* ignore */
    }
  }, []);

  const fetchCompany = useCallback(async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setCompany({
          name: data.name || 'JL Studio',
          address: data.address || '',
          phone: data.phone || '',
          email: data.email || '',
          siret: data.siret || '',
          iban: data.iban || '',
          bic: data.bic || '',
          tvaNumber: data.tvaNumber || '',
          defaultPaymentTerms: data.defaultPaymentTerms || '30 jours net',
          penaltyRate: data.penaltyRate ?? 3.0,
        });
        // Set default payment terms if not pre-filled
        setFactureInfo((prev) => ({
          ...prev,
          conditions_reglement:
            prev.conditions_reglement ||
            data.defaultPaymentTerms ||
            '30 jours net',
        }));
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Fetch next facture number
  const fetchNextNumber = useCallback(async () => {
    try {
      const res = await fetch('/api/documents/next-number?type=facture');
      if (res.ok) {
        const data = await res.json();
        setFactureInfo((prev) => ({ ...prev, numero_facture: data.number }));
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Pre-fill from signed devis
  const prefillFromDevis = useCallback(async () => {
    if (!fromDevisId) return;
    try {
      const res = await fetch(`/api/documents?id=${fromDevisId}`);
      if (!res.ok) return;
      const docs = await res.json();
      const doc = Array.isArray(docs)
        ? docs.find((d: { id: string }) => d.id === fromDevisId)
        : null;
      if (!doc || !doc.formData) return;

      const data =
        typeof doc.formData === 'string'
          ? JSON.parse(doc.formData)
          : doc.formData;

      setSourceDevisId(doc.id);

      // Restore client info
      setClientInfo({
        nom_client: data.nom_client || '',
        adresse_client: data.adresse_client || '',
        code_postal_client: data.code_postal_client || '',
        ville_client: data.ville_client || '',
      });

      // Restore destinataire
      setDestinataire({
        nom_destinataire: data.nom_destinataire || '',
        telephone_destinataire: data.telephone_destinataire || '',
        email_destinataire: data.email_destinataire || '',
      });

      // Restore facture info from devis
      setFactureInfo((prev) => ({
        ...prev,
        objet_facture: data.objet_devis || '',
        tva_pourcentage: data.tva_pourcentage || '20',
        conditions_reglement:
          data.conditions_reglement || prev.conditions_reglement,
        mode_reglement: data.mode_reglement || '',
        numero_devis_ref: doc.documentNumber || '',
      }));

      // Calculate echeance (30 days from now)
      const echeance = new Date();
      echeance.setDate(echeance.getDate() + 30);
      setFactureInfo((prev) => ({
        ...prev,
        date_echeance: echeance.toLocaleDateString('fr-FR'),
      }));

      // Restore lignes
      if (data.lignes && Array.isArray(data.lignes) && data.lignes.length > 0) {
        setLignes(
          data.lignes.map(
            (l: {
              description?: string;
              prix_unitaire?: string;
              quantite?: string;
              unite?: string;
            }) => ({
              description: l.description || '',
              prix_unitaire: l.prix_unitaire || '',
              quantite: l.quantite || '1',
              unite: l.unite || '',
            })
          )
        );
      }

      // Restore contact selection
      if (doc.contact) {
        setSelectedContactId(doc.contact.id);
        setSearchQuery(doc.contact.name);
      }
    } catch (err) {
      console.error('Error loading devis:', err);
    } finally {
      setPrefillLoading(false);
    }
  }, [fromDevisId]);

  useEffect(() => {
    fetchContacts();
    fetchCompany();
    fetchNextNumber();
    prefillFromDevis();
  }, [fetchContacts, fetchCompany, fetchNextNumber, prefillFromDevis]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
      if (
        destDropdownRef.current &&
        !destDropdownRef.current.contains(e.target as Node)
      ) {
        setShowDestDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Select contact -> auto-fill
  const handleSelectContact = (contact: Contact) => {
    setSelectedContactId(contact.id);
    setSearchQuery(contact.name);
    setShowDropdown(false);
    setClientInfo({
      nom_client: contact.companyName || contact.name || '',
      adresse_client: contact.address || '',
      code_postal_client: contact.postalCode || '',
      ville_client: contact.city || '',
    });
    setDestinataire({
      nom_destinataire: contact.name || '',
      telephone_destinataire: contact.phone || '',
      email_destinataire: contact.email || '',
    });
  };

  const handleSelectDestinataire = (contact: Contact) => {
    setDestSearchQuery(contact.name);
    setShowDestDropdown(false);
    setDestinataire({
      nom_destinataire: contact.name || '',
      telephone_destinataire: contact.phone || '',
      email_destinataire: contact.email || '',
    });
  };

  // Filtered contacts
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredDestContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(destSearchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(destSearchQuery.toLowerCase())
  );

  // Lignes helpers
  const addLigne = () =>
    setLignes([
      ...lignes,
      { description: '', prix_unitaire: '', quantite: '1', unite: '' },
    ]);
  const removeLigne = (index: number) => {
    if (lignes.length > 1) setLignes(lignes.filter((_, i) => i !== index));
  };
  const updateLigne = (
    index: number,
    field: keyof LigneFacture,
    value: string
  ) => {
    const updated = [...lignes];
    updated[index] = { ...updated[index], [field]: value };
    setLignes(updated);
  };

  // Calculs
  const sousTotal = lignes.reduce(
    (sum, l) =>
      sum + (parseFloat(l.prix_unitaire) || 0) * (parseFloat(l.quantite) || 0),
    0
  );
  const tvaPct = parseFloat(factureInfo.tva_pourcentage) || 0;
  const tvaMontant = sousTotal * (tvaPct / 100);
  const totalTTC = sousTotal + tvaMontant;
  const acompteVerse = parseFloat(factureInfo.acompte_verse) || 0;
  const resteAPayer = totalTTC - acompteVerse;
  const fmt = (n: number) => n.toFixed(2);

  // Generate PDF
  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setSavedDocumentId(null);

    try {
      const formData = {
        nom_agence: company.name,
        adresse_agence: company.address,
        telephone_agence: company.phone,
        email_agence: company.email,
        siret_agence: company.siret,
        tva_number: company.tvaNumber,
        iban: company.iban,
        bic: company.bic,
        ...clientInfo,
        ...destinataire,
        ...factureInfo,
        penalite_retard: String(company.penaltyRate),
        lignes: lignes.map((l) => ({
          description: l.description,
          prix_unitaire: fmt(parseFloat(l.prix_unitaire) || 0),
          quantite: l.quantite,
          unite: l.unite,
          total_ht: fmt(
            (parseFloat(l.prix_unitaire) || 0) *
              (parseFloat(l.quantite) || 0)
          ),
        })),
        sous_total_ht: fmt(sousTotal),
        tva_montant: fmt(tvaMontant),
        total_ttc: fmt(totalTTC),
        acompte_verse: acompteVerse > 0 ? fmt(acompteVerse) : '',
        reste_a_payer: acompteVerse > 0 ? fmt(resteAPayer) : '',
      };

      const fileName = `Facture_${factureInfo.numero_facture}.pdf`;

      const res = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateSlug: 'facture-moderne',
          data: formData,
          fileName,
          documentNumber: factureInfo.numero_facture,
          contactId: selectedContactId || undefined,
          amount: totalTTC.toFixed(2),
          type: 'facture',
          linkedDocumentId: sourceDevisId || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erreur de generation');
      }

      const docId = res.headers.get('X-Document-Id');
      if (docId) setSavedDocumentId(docId);

      // Download the PDF
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#638BFF]/50 focus:ring-1 focus:ring-[#638BFF]/25 transition-colors';
  const labelClass = 'block text-xs font-medium text-white/40 mb-1';

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <a
            href="/admin/documents"
            className="text-white/45 hover:text-white/60 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </a>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Creer une facture
            </h1>
            <p className="text-sm text-white/40 mt-1">
              {fromDevisId
                ? 'Facture generee depuis un devis signe'
                : 'Remplissez les informations de facturation'}
            </p>
          </div>
        </div>
      </div>

      {prefillLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-[#638BFF]/30 border-t-[#638BFF] rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {!company.iban && (
        <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 text-sm">
          Les coordonnees bancaires ne sont pas configurees.{' '}
          <a href="/admin/parametres" className="underline font-medium">
            Allez dans Parametres
          </a>{' '}
          pour les remplir.
        </div>
      )}

      <div className="space-y-6">
        {/* Infos Facture */}
        <section className="bg-[#0d1321] border border-white/[0.06] rounded-lg p-5">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
            Informations de la facture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className={labelClass}>N° Facture</label>
              <input
                className={inputClass}
                value={factureInfo.numero_facture}
                readOnly
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
              />
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input
                className={inputClass}
                value={factureInfo.date_facture}
                onChange={(e) =>
                  setFactureInfo({
                    ...factureInfo,
                    date_facture: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>TVA (%)</label>
              <input
                className={inputClass}
                type="number"
                value={factureInfo.tva_pourcentage}
                onChange={(e) =>
                  setFactureInfo({
                    ...factureInfo,
                    tva_pourcentage: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Date d&apos;echeance</label>
              <input
                className={inputClass}
                value={factureInfo.date_echeance}
                onChange={(e) =>
                  setFactureInfo({
                    ...factureInfo,
                    date_echeance: e.target.value,
                  })
                }
                placeholder="01/03/2026"
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Objet</label>
              <input
                className={inputClass}
                placeholder="Prestation de service..."
                value={factureInfo.objet_facture}
                onChange={(e) =>
                  setFactureInfo({
                    ...factureInfo,
                    objet_facture: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Ref. devis</label>
              <input
                className={inputClass}
                value={factureInfo.numero_devis_ref}
                onChange={(e) =>
                  setFactureInfo({
                    ...factureInfo,
                    numero_devis_ref: e.target.value,
                  })
                }
                placeholder="DEV-2026-001"
              />
            </div>
            <div>
              <label className={labelClass}>Acompte verse (EUR)</label>
              <input
                className={inputClass}
                type="number"
                step="0.01"
                placeholder="0.00"
                value={factureInfo.acompte_verse}
                onChange={(e) =>
                  setFactureInfo({
                    ...factureInfo,
                    acompte_verse: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </section>

        {/* Client selector + destinataire */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-[#0d1321] border border-white/[0.06] rounded-lg p-5">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Adresse de facturation
            </h2>
            <div className="mb-4 relative" ref={dropdownRef}>
              <label className={labelClass}>Rechercher un contact</label>
              <input
                className={inputClass}
                placeholder="Tapez un nom ou email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                  if (!e.target.value) setSelectedContactId('');
                }}
                onFocus={() => setShowDropdown(true)}
              />
              {showDropdown && searchQuery && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#141b2d] border border-white/[0.08] rounded-lg max-h-48 overflow-y-auto shadow-xl">
                  {filteredContacts.length === 0 ? (
                    <div className="px-3 py-2 text-xs text-white/45">
                      Aucun contact trouve
                    </div>
                  ) : (
                    filteredContacts.slice(0, 8).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleSelectContact(c)}
                        className="w-full text-left px-3 py-2 hover:bg-white/[0.04] transition-colors flex items-center justify-between"
                      >
                        <div>
                          <span className="text-sm text-white font-medium">
                            {c.name}
                          </span>
                          {c.companyName && (
                            <span className="text-xs text-white/35 ml-1.5">
                              ({c.companyName})
                            </span>
                          )}
                          <span className="text-xs text-white/45 ml-2">
                            {c.email}
                          </span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Nom / Societe</label>
                <input
                  className={inputClass}
                  placeholder="Nom ou societe"
                  value={clientInfo.nom_client}
                  onChange={(e) =>
                    setClientInfo({
                      ...clientInfo,
                      nom_client: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Adresse</label>
                <input
                  className={inputClass}
                  placeholder="12 rue de la Paix"
                  value={clientInfo.adresse_client}
                  onChange={(e) =>
                    setClientInfo({
                      ...clientInfo,
                      adresse_client: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Code postal</label>
                  <input
                    className={inputClass}
                    placeholder="75000"
                    value={clientInfo.code_postal_client}
                    onChange={(e) =>
                      setClientInfo({
                        ...clientInfo,
                        code_postal_client: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className={labelClass}>Ville</label>
                  <input
                    className={inputClass}
                    placeholder="Paris"
                    value={clientInfo.ville_client}
                    onChange={(e) =>
                      setClientInfo({
                        ...clientInfo,
                        ville_client: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#0d1321] border border-white/[0.06] rounded-lg p-5">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              A l&apos;attention de
            </h2>
            <div className="mb-4 relative" ref={destDropdownRef}>
              <label className={labelClass}>Rechercher un contact</label>
              <input
                className={inputClass}
                placeholder="Tapez un nom ou email..."
                value={destSearchQuery}
                onChange={(e) => {
                  setDestSearchQuery(e.target.value);
                  setShowDestDropdown(true);
                }}
                onFocus={() => setShowDestDropdown(true)}
              />
              {showDestDropdown && destSearchQuery && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#141b2d] border border-white/[0.08] rounded-lg max-h-48 overflow-y-auto shadow-xl">
                  {filteredDestContacts.length === 0 ? (
                    <div className="px-3 py-2 text-xs text-white/45">
                      Aucun contact trouve
                    </div>
                  ) : (
                    filteredDestContacts.slice(0, 8).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleSelectDestinataire(c)}
                        className="w-full text-left px-3 py-2 hover:bg-white/[0.04] transition-colors flex items-center justify-between"
                      >
                        <div>
                          <span className="text-sm text-white font-medium">
                            {c.name}
                          </span>
                          <span className="text-xs text-white/45 ml-2">
                            {c.email}
                          </span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Nom</label>
                <input
                  className={inputClass}
                  placeholder="Nom du contact"
                  value={destinataire.nom_destinataire}
                  onChange={(e) =>
                    setDestinataire({
                      ...destinataire,
                      nom_destinataire: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Telephone</label>
                <input
                  className={inputClass}
                  placeholder="06..."
                  value={destinataire.telephone_destinataire}
                  onChange={(e) =>
                    setDestinataire({
                      ...destinataire,
                      telephone_destinataire: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  className={inputClass}
                  placeholder="dest@email.com"
                  value={destinataire.email_destinataire}
                  onChange={(e) =>
                    setDestinataire({
                      ...destinataire,
                      email_destinataire: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </section>
        </div>

        {/* Lignes de prestations */}
        <section className="bg-[#0d1321] border border-white/[0.06] rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
              Prestations
            </h2>
            <button
              onClick={addLigne}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#638BFF]/10 text-[#638BFF] text-xs font-medium rounded-lg hover:bg-[#638BFF]/20 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Ajouter une ligne
            </button>
          </div>
          <div className="space-y-3">
            {lignes.map((ligne, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-5">
                    <label className={labelClass}>Description</label>
                    <input
                      className={inputClass}
                      placeholder="Prestation..."
                      value={ligne.description}
                      onChange={(e) =>
                        updateLigne(i, 'description', e.target.value)
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Prix unitaire (EUR)</label>
                    <input
                      className={inputClass}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={ligne.prix_unitaire}
                      onChange={(e) =>
                        updateLigne(i, 'prix_unitaire', e.target.value)
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Quantite</label>
                    <input
                      className={inputClass}
                      type="number"
                      value={ligne.quantite}
                      onChange={(e) =>
                        updateLigne(i, 'quantite', e.target.value)
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Unite</label>
                    <input
                      className={inputClass}
                      placeholder="jour, piece..."
                      value={ligne.unite}
                      onChange={(e) =>
                        updateLigne(i, 'unite', e.target.value)
                      }
                    />
                  </div>
                  <div className="md:col-span-1 flex items-end">
                    <span className="text-sm font-semibold text-white/60 pb-2">
                      {fmt(
                        (parseFloat(ligne.prix_unitaire) || 0) *
                          (parseFloat(ligne.quantite) || 0)
                      )}{' '}
                      EUR
                    </span>
                  </div>
                </div>
                {lignes.length > 1 && (
                  <button
                    onClick={() => removeLigne(i)}
                    className="mt-6 p-1.5 text-white/35 hover:text-red-400 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Conditions */}
        <section className="bg-[#0d1321] border border-white/[0.06] rounded-lg p-5">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
            Conditions de paiement
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Conditions de reglement</label>
              <input
                className={inputClass}
                placeholder="30 jours net"
                value={factureInfo.conditions_reglement}
                onChange={(e) =>
                  setFactureInfo({
                    ...factureInfo,
                    conditions_reglement: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Mode de reglement</label>
              <input
                className={inputClass}
                placeholder="Virement bancaire"
                value={factureInfo.mode_reglement}
                onChange={(e) =>
                  setFactureInfo({
                    ...factureInfo,
                    mode_reglement: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </section>

        {/* Recap + Bouton */}
        <div className="flex items-center justify-between bg-[#0d1321] border border-white/[0.06] rounded-lg p-5">
          <div className="space-y-1">
            <div className="text-sm text-white/40">
              Sous-total HT :{' '}
              <span className="text-white/70 font-medium">
                {fmt(sousTotal)} EUR
              </span>
            </div>
            <div className="text-sm text-white/40">
              TVA ({factureInfo.tva_pourcentage}%) :{' '}
              <span className="text-white/70 font-medium">
                {fmt(tvaMontant)} EUR
              </span>
            </div>
            <div className="text-lg font-bold text-white">
              Total TTC : {fmt(totalTTC)} EUR
            </div>
            {acompteVerse > 0 && (
              <>
                <div className="text-sm text-white/40">
                  Acompte verse :{' '}
                  <span className="text-green-400 font-medium">
                    -{fmt(acompteVerse)} EUR
                  </span>
                </div>
                <div className="text-base font-bold text-[#638BFF]">
                  Reste a payer : {fmt(resteAPayer)} EUR
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleGenerate}
            disabled={
              loading ||
              !clientInfo.nom_client ||
              lignes.every((l) => !l.description)
            }
            className="flex items-center gap-2 px-6 py-3 bg-[#638BFF] text-white font-semibold rounded-lg hover:bg-[#638BFF]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Generation...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Generer la facture
              </>
            )}
          </button>
        </div>

        {/* Success panel */}
        {savedDocumentId && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-green-400">
                  Facture generee et sauvegardee
                </h3>
                <p className="text-xs text-white/45">
                  Le PDF a ete telecharge et enregistre dans vos documents
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={`/api/storage/documents/Facture_${factureInfo.numero_facture}.pdf`}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] text-white/60 text-xs font-medium rounded-lg hover:bg-white/[0.08] transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Retelecharger
              </a>
              <a
                href="/admin/documents"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#638BFF]/10 text-[#638BFF] text-xs font-medium rounded-lg hover:bg-[#638BFF]/20 transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                Voir les documents
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
