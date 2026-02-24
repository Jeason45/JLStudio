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
  type?: string;
}

interface LigneDevis {
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
}

export default function CreateDevisPage() {
  const { sidebarWidth, isMobile } = useSidebar();
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />
      <div style={{ marginLeft: isMobile ? '0' : `${sidebarWidth}px`, transition: 'margin-left 0.3s ease', padding: isMobile ? '80px 16px 24px 16px' : '40px' }}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-[60vh]">
              <div className="w-8 h-8 border-2 border-[#638BFF]/30 border-t-[#638BFF] rounded-full animate-spin" />
            </div>
          }
        >
          <CreateDevisContent />
        </Suspense>
      </div>
    </div>
  );
}

function CreateDevisContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [savedDocumentId, setSavedDocumentId] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(!!editId);

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

  // Company settings (from parametres)
  const [company, setCompany] = useState<CompanySettings>({
    name: 'JL Studio',
    address: '',
    phone: '',
    email: '',
    siret: '',
  });

  // Client info (auto-filled from contact or manual)
  const [clientInfo, setClientInfo] = useState({
    nom_client: '',
    adresse_client: '',
    code_postal_client: '',
    ville_client: '',
    telephone_client: '',
    email_client: '',
  });

  // Checkbox: save updated info back to contact
  const [updateContact, setUpdateContact] = useState(false);

  // Destinataire (optional)
  const [destinataire, setDestinataire] = useState({
    nom_destinataire: '',
    adresse_destinataire: '',
    telephone_destinataire: '',
    email_destinataire: '',
  });

  // Devis info
  const [devisInfo, setDevisInfo] = useState({
    numero_devis: '',
    date_devis: new Date().toLocaleDateString('fr-FR'),
    objet_devis: '',
    tva_pourcentage: '20',
    validite_jours: '30',
    acompte_pourcentage: '0',
    conditions_reglement: '',
    mode_reglement: '',
  });

  // Lignes
  const [lignes, setLignes] = useState<LigneDevis[]>([
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
        });
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Fetch next devis number (only for new documents)
  const fetchNextNumber = useCallback(async () => {
    if (editId) return; // Don't fetch for edits
    try {
      const res = await fetch('/api/documents/next-number?type=devis');
      if (res.ok) {
        const data = await res.json();
        setDevisInfo((prev) => ({ ...prev, numero_devis: data.number }));
      }
    } catch {
      /* ignore */
    }
  }, [editId]);

  useEffect(() => {
    fetchContacts();
    fetchCompany();
    fetchNextNumber();
  }, [fetchContacts, fetchCompany, fetchNextNumber]);

  // Load existing document for editing
  useEffect(() => {
    if (!editId) return;
    (async () => {
      try {
        const res = await fetch(`/api/documents?id=${editId}`);
        if (!res.ok) {
          setEditLoading(false);
          return;
        }
        const docs = await res.json();
        const doc = Array.isArray(docs)
          ? docs.find((d: { id: string }) => d.id === editId)
          : null;
        if (!doc || !doc.formData) {
          setEditLoading(false);
          return;
        }

        const data =
          typeof doc.formData === 'string'
            ? JSON.parse(doc.formData)
            : doc.formData;

        // Restore devis info
        setDevisInfo((prev) => ({
          ...prev,
          numero_devis: doc.documentNumber || prev.numero_devis,
          date_devis: data.date_devis || prev.date_devis,
          objet_devis: data.objet_devis || '',
          tva_pourcentage: data.tva_pourcentage || '20',
          validite_jours: data.validite_jours || '30',
          acompte_pourcentage: data.acompte_pourcentage || data.depositPercent?.toString() || '0',
          conditions_reglement: data.conditions_reglement || '',
          mode_reglement: data.mode_reglement || '',
        }));

        // Restore client info
        setClientInfo({
          nom_client: data.nom_client || '',
          adresse_client: data.adresse_client || '',
          code_postal_client: data.code_postal_client || '',
          ville_client: data.ville_client || '',
          telephone_client: data.telephone_client || '',
          email_client: data.email_client || '',
        });

        // Restore destinataire
        if (data.nom_destinataire) {
          setDestinataire({
            nom_destinataire: data.nom_destinataire || '',
            adresse_destinataire: data.adresse_destinataire || '',
            telephone_destinataire: data.telephone_destinataire || '',
            email_destinataire: data.email_destinataire || '',
          });
        }

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
        console.error('Error loading document:', err);
      } finally {
        setEditLoading(false);
      }
    })();
  }, [editId]);

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

    // Facturation = entite (societe ou personne) + adresse physique + coordonnees
    setClientInfo({
      nom_client: contact.companyName || contact.name || '',
      adresse_client: contact.address || '',
      code_postal_client: contact.postalCode || '',
      ville_client: contact.city || '',
      telephone_client: contact.phone || '',
      email_client: contact.email || '',
    });

    // Attention = personne contact + coordonnees
    setDestinataire({
      nom_destinataire: contact.name || '',
      adresse_destinataire: '',
      telephone_destinataire: contact.phone || '',
      email_destinataire: contact.email || '',
    });

    setUpdateContact(false);
  };

  // Select contact for destinataire -> auto-fill
  const handleSelectDestinataire = (contact: Contact) => {
    setDestSearchQuery(contact.name);
    setShowDestDropdown(false);
    setDestinataire({
      nom_destinataire: contact.name || '',
      adresse_destinataire: '',
      telephone_destinataire: contact.phone || '',
      email_destinataire: contact.email || '',
    });
  };

  // Filtered contacts for search
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredDestContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(destSearchQuery.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(destSearchQuery.toLowerCase()))
  );

  // Lignes helpers
  const addLigne = () => {
    setLignes([
      ...lignes,
      { description: '', prix_unitaire: '', quantite: '1', unite: '' },
    ]);
  };
  const removeLigne = (index: number) => {
    if (lignes.length > 1) setLignes(lignes.filter((_, i) => i !== index));
  };
  const updateLigne = (
    index: number,
    field: keyof LigneDevis,
    value: string
  ) => {
    const updated = [...lignes];
    updated[index] = { ...updated[index], [field]: value };
    setLignes(updated);
  };

  // Calculs
  const sousTotal = lignes.reduce((sum, l) => {
    return (
      sum + (parseFloat(l.prix_unitaire) || 0) * (parseFloat(l.quantite) || 0)
    );
  }, 0);
  const tvaPct = parseFloat(devisInfo.tva_pourcentage) || 0;
  const tvaMontant = sousTotal * (tvaPct / 100);
  const totalTTC = sousTotal + tvaMontant;
  const depositPercent = parseFloat(devisInfo.acompte_pourcentage) || 0;
  const depositAmount = totalTTC * (depositPercent / 100);
  const balanceAmount = totalTTC - depositAmount;
  const fmt = (n: number) => n.toFixed(2);
  const fmtDisplay = (n: number) =>
    n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Generate PDF
  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setSavedDocumentId(null);

    try {
      // Optionally update contact info
      if (updateContact && selectedContactId) {
        await fetch(`/api/contacts/${selectedContactId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: clientInfo.nom_client,
            email: clientInfo.email_client,
            phone: clientInfo.telephone_client,
            address: clientInfo.adresse_client,
            postalCode: clientInfo.code_postal_client,
            city: clientInfo.ville_client,
          }),
        });
      }

      const formData = {
        nom_agence: company.name,
        adresse_agence: company.address,
        telephone_agence: company.phone,
        email_agence: company.email,
        siret_agence: company.siret,
        ...clientInfo,
        ...destinataire,
        ...devisInfo,
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
        depositPercent,
        depositAmount: parseFloat(fmt(depositAmount)),
        balanceAmount: parseFloat(fmt(balanceAmount)),
      };

      // If editing, delete old document first
      if (editId) {
        await fetch('/api/documents', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editId }),
        });
      }

      const fileName = `Devis_${devisInfo.numero_devis}.pdf`;

      const res = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateSlug: 'devis-moderne',
          data: formData,
          fileName,
          documentNumber: devisInfo.numero_devis,
          contactId: selectedContactId || undefined,
          amount: totalTTC.toFixed(2),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erreur de generation');
      }

      // Get document ID from response header
      const docId = res.headers.get('X-Document-Id');
      if (docId) {
        setSavedDocumentId(docId);
      }

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
    <div className="max-w-5xl mx-auto">
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
              {editId ? 'Modifier le devis' : 'Creer un devis'}
            </h1>
            <p className="text-sm text-white/40 mt-1">
              {editId
                ? 'Modifiez les informations puis regenerez le PDF'
                : 'Selectionnez un client et remplissez les prestations'}
            </p>
          </div>
        </div>
      </div>

      {editLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-[#638BFF]/30 border-t-[#638BFF] rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {!company.address && (
        <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 text-sm">
          Les informations de l&apos;entreprise ne sont pas configurees.{' '}
          <a href="/admin/parametres" className="underline font-medium">
            Allez dans Parametres
          </a>{' '}
          pour les remplir.
        </div>
      )}

      <div className="space-y-6">
        {/* Infos Devis */}
        <section className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
            Informations du devis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className={labelClass}>N° Devis</label>
              <input
                className={inputClass}
                value={devisInfo.numero_devis}
                onChange={(e) =>
                  setDevisInfo({ ...devisInfo, numero_devis: e.target.value })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input
                className={inputClass}
                value={devisInfo.date_devis}
                onChange={(e) =>
                  setDevisInfo({ ...devisInfo, date_devis: e.target.value })
                }
              />
            </div>
            <div>
              <label className={labelClass}>TVA (%)</label>
              <input
                className={inputClass}
                type="number"
                value={devisInfo.tva_pourcentage}
                onChange={(e) =>
                  setDevisInfo({
                    ...devisInfo,
                    tva_pourcentage: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Validite (jours)</label>
              <input
                className={inputClass}
                type="number"
                value={devisInfo.validite_jours}
                onChange={(e) =>
                  setDevisInfo({
                    ...devisInfo,
                    validite_jours: e.target.value,
                  })
                }
              />
            </div>
            <div className="md:col-span-2 lg:col-span-4">
              <label className={labelClass}>Objet du devis</label>
              <input
                className={inputClass}
                placeholder="Developpement site web..."
                value={devisInfo.objet_devis}
                onChange={(e) =>
                  setDevisInfo({ ...devisInfo, objet_devis: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        {/* Client selector + info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Adresse de facturation
            </h2>

            {/* Contact search */}
            <div className="mb-4 relative" ref={dropdownRef}>
              <label className={labelClass}>Rechercher un contact</label>
              <input
                className={inputClass}
                placeholder="Tapez un nom ou email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                  if (!e.target.value) {
                    setSelectedContactId('');
                  }
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
                        {c.phone && (
                          <span className="text-xs text-white/35">
                            {c.phone}
                          </span>
                        )}
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

              {/* Checkbox: update contact */}
              {selectedContactId && (
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={updateContact}
                    onChange={(e) => setUpdateContact(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/[0.04] text-[#638BFF] focus:ring-[#638BFF]/25"
                  />
                  <span className="text-xs text-white/40">
                    Mettre a jour les infos du contact avec ces donnees
                  </span>
                </label>
              )}
            </div>
          </section>

          <section className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              A l&apos;attention de
            </h2>

            {/* Contact search for destinataire */}
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
                        {c.phone && (
                          <span className="text-xs text-white/35">
                            {c.phone}
                          </span>
                        )}
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
        <section className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-5">
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
                      placeholder="Developpement site web..."
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
        <section className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
            Conditions{' '}
            <span className="text-white/35 font-normal">(optionnel)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Acompte (%)</label>
              <select
                className={inputClass}
                value={devisInfo.acompte_pourcentage}
                onChange={(e) =>
                  setDevisInfo({
                    ...devisInfo,
                    acompte_pourcentage: e.target.value,
                  })
                }
              >
                <option value="0">Pas d&apos;acompte</option>
                <option value="30">30%</option>
                <option value="50">50%</option>
                <option value="100">Paiement integral</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Conditions de reglement</label>
              <input
                className={inputClass}
                placeholder="30 jours net"
                value={devisInfo.conditions_reglement}
                onChange={(e) =>
                  setDevisInfo({
                    ...devisInfo,
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
                value={devisInfo.mode_reglement}
                onChange={(e) =>
                  setDevisInfo({
                    ...devisInfo,
                    mode_reglement: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </section>

        {/* Recap + Bouton */}
        <div className="flex items-center justify-between bg-[#0d1321] border border-white/[0.06] rounded-xl p-5">
          <div className="space-y-1">
            <div className="text-sm text-white/40">
              Sous-total HT :{' '}
              <span className="text-white/70 font-medium">
                {fmt(sousTotal)} EUR
              </span>
            </div>
            <div className="text-sm text-white/40">
              TVA ({devisInfo.tva_pourcentage}%) :{' '}
              <span className="text-white/70 font-medium">
                {fmt(tvaMontant)} EUR
              </span>
            </div>
            <div className="text-lg font-bold text-white">
              Total TTC : {fmt(totalTTC)} EUR
            </div>
            {depositPercent > 0 && (
              <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-1">
                <div className="text-sm text-[#638BFF]/80">
                  Acompte ({depositPercent}%) :{' '}
                  <span className="text-[#638BFF] font-semibold">
                    {fmtDisplay(depositAmount)} EUR
                  </span>
                </div>
                {depositPercent < 100 && (
                  <div className="text-sm text-white/40">
                    Solde a la livraison :{' '}
                    <span className="text-white/70 font-medium">
                      {fmtDisplay(balanceAmount)} EUR
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleGenerate}
            disabled={
              loading ||
              !clientInfo.nom_client ||
              lignes.every((l) => !l.description)
            }
            className="flex items-center gap-2 px-6 py-3 bg-[#638BFF] text-white font-semibold rounded-xl hover:bg-[#638BFF]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
                {editId ? 'Regenerer le PDF' : 'Generer le PDF'}
              </>
            )}
          </button>
        </div>

        {/* Success panel after generation */}
        {savedDocumentId && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">
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
                  Devis genere et sauvegarde
                </h3>
                <p className="text-xs text-white/45">
                  Le PDF a ete telecharge et enregistre dans vos documents
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={`/api/storage/documents/Devis_${devisInfo.numero_devis}.pdf`}
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
