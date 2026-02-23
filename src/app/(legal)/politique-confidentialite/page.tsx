import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialite | JL Studio',
  description: 'Politique de confidentialite et protection des donnees personnelles - JL Studio.',
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <h1 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
        Politique de confidentialite
      </h1>
      <div className="w-12 h-[2px] bg-gradient-to-r from-[#638BFF] to-[#638BFF]/30 mb-10 rounded-full" />

      <div className="space-y-10 text-white/60 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des donnees personnelles est :<br />
            <strong className="text-white/80">JL Studio</strong> — Jeason Lemoine<br />
            Entrepreneur individuel (micro-entreprise)<br />
            35 quai Deschamps, 33100 Bordeaux<br />
            Email : <a href="mailto:contact@jlstudio.dev" className="text-[#638BFF] hover:underline">contact@jlstudio.dev</a>
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">2. Donnees collectees</h2>
          <p>
            Nous collectons uniquement les donnees transmises volontairement par vos soins,
            via les formulaires presents sur le site :
          </p>

          <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-white/70 mt-5 mb-2">
            Formulaire de contact
          </h3>
          <ul className="space-y-1.5 ml-4 list-disc list-inside">
            <li>Nom et prenom</li>
            <li>Adresse email</li>
            <li>Numero de telephone (facultatif)</li>
            <li>Type de projet souhaite</li>
            <li>Message / description du projet</li>
          </ul>

          <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-white/70 mt-5 mb-2">
            Formulaire de qualification (devis en ligne)
          </h3>
          <ul className="space-y-1.5 ml-4 list-disc list-inside">
            <li>Nom et prenom</li>
            <li>Adresse email</li>
            <li>Numero de telephone (facultatif)</li>
            <li>Nom de l&apos;entreprise (facultatif)</li>
            <li>Type de projet et nombre de pages</li>
            <li>Fonctionnalites souhaitees</li>
            <li>Budget envisage et delai</li>
            <li>Description libre du projet</li>
          </ul>

          <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-white/70 mt-5 mb-2">
            Signature electronique
          </h3>
          <ul className="space-y-1.5 ml-4 list-disc list-inside">
            <li>Image de la signature</li>
            <li>Adresse IP et navigateur (a des fins de preuve legale)</li>
            <li>Date et heure de la signature</li>
          </ul>

          <p className="mt-4">
            Aucune donnee n&apos;est collectee automatiquement a des fins de tracking ou de profilage.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">3. Finalite du traitement</h2>
          <p>Les donnees collectees sont utilisees exclusivement pour :</p>
          <ul className="mt-3 space-y-1.5 ml-4 list-disc list-inside">
            <li>Repondre a vos demandes de devis et d&apos;information</li>
            <li>Vous recontacter dans le cadre de votre demande</li>
            <li>Etablir une estimation tarifaire sur la base des informations fournies</li>
            <li>Emettre des devis, factures et contrats</li>
            <li>Assurer le suivi de projet et la gestion de la relation client</li>
            <li>Vous envoyer des emails de confirmation et de rappel</li>
            <li>Constituer une preuve de signature electronique</li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">4. Base legale du traitement</h2>
          <p>Le traitement de vos donnees repose sur :</p>
          <ul className="mt-3 space-y-1.5 ml-4 list-disc list-inside">
            <li><strong className="text-white/70">L&apos;execution d&apos;un contrat</strong> ou de mesures precontractuelles (demande de devis, suivi de projet)</li>
            <li><strong className="text-white/70">L&apos;obligation legale</strong> (conservation des factures, preuve de signature)</li>
            <li><strong className="text-white/70">L&apos;interet legitime</strong> (gestion de la relation client, relances commerciales)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">5. Duree de conservation</h2>
          <ul className="space-y-1.5 ml-4 list-disc list-inside">
            <li>Donnees de contact et de projet : <strong className="text-white/70">3 ans</strong> a compter de la derniere interaction</li>
            <li>Documents comptables (factures) : <strong className="text-white/70">10 ans</strong> (obligation legale)</li>
            <li>Preuves de signature electronique : <strong className="text-white/70">10 ans</strong> (obligation legale)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">6. Destinataires des donnees</h2>
          <p>
            Vos donnees personnelles ne sont transmises a <strong className="text-white/70">aucun tiers</strong>.
            Elles sont uniquement accessibles au responsable du traitement et stockees sur notre serveur
            heberge par Contabo GmbH (Allemagne — Union Europeenne).
          </p>
          <p className="mt-3">
            Aucun transfert de donnees n&apos;est effectue en dehors de l&apos;Union Europeenne.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">7. Vos droits</h2>
          <p>
            Conformement au RGPD (articles 15 a 22), vous disposez des droits suivants :
          </p>
          <ul className="mt-3 space-y-1.5 ml-4 list-disc list-inside">
            <li><strong className="text-white/70">Droit d&apos;acces :</strong> obtenir une copie de vos donnees</li>
            <li><strong className="text-white/70">Droit de rectification :</strong> corriger des donnees inexactes</li>
            <li><strong className="text-white/70">Droit a l&apos;effacement :</strong> demander la suppression de vos donnees</li>
            <li><strong className="text-white/70">Droit a la limitation :</strong> restreindre le traitement de vos donnees</li>
            <li><strong className="text-white/70">Droit a la portabilite :</strong> recevoir vos donnees dans un format lisible</li>
            <li><strong className="text-white/70">Droit d&apos;opposition :</strong> vous opposer au traitement de vos donnees</li>
          </ul>
          <p className="mt-4">
            Pour exercer ces droits, contactez-nous a :{' '}
            <a href="mailto:contact@jlstudio.dev" className="text-[#638BFF] hover:underline">contact@jlstudio.dev</a>
          </p>
          <p className="mt-3">
            Nous nous engageons a repondre dans un delai de <strong className="text-white/70">30 jours</strong>.
            Vous pouvez egalement introduire une reclamation aupres de la{' '}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#638BFF] hover:underline">CNIL</a>.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">8. Cookies</h2>
          <p>
            Ce site n&apos;utilise aucun cookie de tracking, publicitaire ou analytique.
            Seuls des cookies techniques strictement necessaires au fonctionnement du site
            peuvent etre utilises. Ils ne necessitent pas votre consentement prealable
            (article 82 de la loi Informatique et Libertes).
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">9. Securite</h2>
          <p>
            Le site utilise le protocole HTTPS pour chiffrer les echanges de donnees.
            Nous mettons en oeuvre les mesures techniques et organisationnelles appropriees
            pour proteger vos donnees contre tout acces non autorise, perte ou alteration.
          </p>
          <p className="mt-4 text-white/30 text-xs">
            Derniere mise a jour : fevrier 2026
          </p>
        </section>
      </div>
    </div>
  );
}
