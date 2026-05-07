'use client';

import { Plus, X } from 'lucide-react';
import type { LigneDocument } from './types';
import { emptyLigne } from './types';
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle, secondaryBtnStyle, iconBtnStyle } from './styles';

export function LignesEditor({
  lignes,
  setLignes,
  title = 'Prestations',
}: {
  lignes: LigneDocument[];
  setLignes: (l: LigneDocument[]) => void;
  title?: string;
}) {
  const addLigne = () => setLignes([...lignes, emptyLigne()]);
  const removeLigne = (i: number) => {
    if (lignes.length > 1) setLignes(lignes.filter((_, idx) => idx !== i));
  };
  const updateLigne = (i: number, field: keyof LigneDocument, value: string) => {
    const updated = [...lignes];
    updated[i] = { ...updated[i], [field]: value };
    setLignes(updated);
  };

  const fmt = (n: number) => n.toFixed(2);

  return (
    <section style={sectionStyle()}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ ...sectionTitleStyle(), margin: 0 }}>{title}</h2>
        <button type="button" onClick={addLigne} style={secondaryBtnStyle()}>
          <Plus size={13} /> Ajouter une ligne
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {lignes.map((ligne, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              background: 'var(--agency-surface-2)',
              borderRadius: 10,
              padding: 12,
              border: '1px solid var(--agency-border-soft)',
            }}
          >
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '5fr 2fr 2fr 2fr 1fr', gap: 10 }}>
              <div>
                <label style={labelStyle()}>Description</label>
                <input
                  style={inputStyle()}
                  placeholder="Ex. Site vitrine 5 pages…"
                  value={ligne.description}
                  onChange={(e) => updateLigne(i, 'description', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle()}>Prix unitaire (€)</label>
                <input
                  style={inputStyle()}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={ligne.prix_unitaire}
                  onChange={(e) => updateLigne(i, 'prix_unitaire', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle()}>Quantité</label>
                <input
                  style={inputStyle()}
                  type="number"
                  value={ligne.quantite}
                  onChange={(e) => updateLigne(i, 'quantite', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle()}>Unité</label>
                <input
                  style={inputStyle()}
                  placeholder="forfait, jour…"
                  value={ligne.unite}
                  onChange={(e) => updateLigne(i, 'unite', e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--agency-ink-1)' }}>
                  {fmt((parseFloat(ligne.prix_unitaire) || 0) * (parseFloat(ligne.quantite) || 0))} €
                </span>
              </div>
            </div>
            {lignes.length > 1 && (
              <button
                type="button"
                onClick={() => removeLigne(i)}
                title="Supprimer la ligne"
                style={{ ...iconBtnStyle('var(--agency-danger, #f87171)'), marginTop: 22 }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
