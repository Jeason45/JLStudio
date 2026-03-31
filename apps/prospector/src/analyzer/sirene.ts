import axios from 'axios'

export interface SireneData {
  siret: string | null
  siren: string | null
  dateCreation: string | null       // "YYYY-MM-DD"
  statusActif: boolean
  effectif: string | null
  codeNAF: string | null
  libelleNAF: string | null
  formeJuridique: string | null
  adresse: string | null
}

// API INSEE SIRENE — 100% gratuite, illimitée
// https://api.insee.fr/catalogue/site/themes/wso2/subthemes/insee/pages/item-info.jag?name=Sirene&version=V3&provider=insee
// Token via: https://api.insee.fr/catalogue/ (créer un compte + app)
//
// Alternative sans token: api.recherche-entreprises.fabrique.social.gouv.fr (pas de clé requise)

const SEARCH_URL = 'https://recherche-entreprises.api.gouv.fr/search'

export async function enrichWithSirene(companyName: string, city: string): Promise<SireneData | null> {
  try {
    const response = await axios.get(SEARCH_URL, {
      params: {
        q: companyName,
        commune: city,
        etat_administratif: 'A',  // Active only
        per_page: 1,
      },
      timeout: 10000,
    })

    const results = response.data?.results
    if (!results || results.length === 0) return null

    const company = results[0]
    const siege = company.siege

    return {
      siret: siege?.siret || null,
      siren: company.siren || null,
      dateCreation: company.date_creation || null,
      statusActif: company.etat_administratif === 'A',
      effectif: company.tranche_effectif_salarie || null,
      codeNAF: company.activite_principale || null,
      libelleNAF: company.libelle_activite_principale || null,
      formeJuridique: company.nature_juridique
        ? `${company.nature_juridique}`
        : null,
      adresse: siege
        ? [siege.numero_voie, siege.type_voie, siege.libelle_voie, siege.code_postal, siege.libelle_commune]
            .filter(Boolean).join(' ')
        : null,
    }
  } catch {
    return null
  }
}
