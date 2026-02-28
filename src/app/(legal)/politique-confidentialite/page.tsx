import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | JL Studio',
  description: 'Politique de confidentialité et protection des données personnelles - JL Studio.',
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <h1 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
        Politique de confidentialité
      </h1>
      <div className="w-12 h-[2px] bg-gradient-to-r from-[#638BFF] to-[#638BFF]/30 mb-10 rounded-full" />

      <div className="space-y-10 text-white/60 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données personnelles est :<br />
            <strong className="text-white/80">JL Studio</strong> — Jeason Lemoine<br />
            Entrepreneur individuel (micro-entreprise)<br />
            35 quai Deschamps, 33100 Bordeaux<br />
            E-mail : <a href="mailto:contact@jlstudio.dev" className="text-[#638BFF] hover:underline">contact@jlstudio.dev</a>
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">2. Données collectées</h2>
          <p>
            Nous collectons uniquement les données transmises volontairement par vos soins,
            via les formulaires présents sur le site :
          </p>

          <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-white/70 mt-5 mb-2">
            Formulaire de contact
          </h3>
          <ul className="space-y-1.5 ml-4 list-disc list-inside">
            <li>Nom et prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone (facultatif)</li>
            <li>Type de projet souhaité</li>
            <li>Message / description du projet</li>
          </ul>

          <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-white/70 mt-5 mb-2">
            Formulaire de qualification (devis en ligne)
          </h3>
          <ul className="space-y-1.5 ml-4 list-disc list-inside">
            <li>Nom et prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone (facultatif)</li>
            <li>Nom de l&apos;entreprise (facultatif)</li>
            <li>Type de projet et nombre de pages</li>
            <li>Fonctionnalités souhaitées</li>
            <li>Budget envisagé et délai</li>
            <li>Description libre du projet</li>
          </ul>

          <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-white/70 mt-5 mb-2">
            Signature électronique
          </h3>
          <ul className="space-y-1.5 ml-4 list-disc list-inside">
            <li>Image de la signature</li>
            <li>Adresse IP et navigateur (à des fins de preuve légale)</li>
            <li>Date et heure de la signature</li>
          </ul>

          <p className="mt-4">
            Aucune donnée n&apos;est collectée automatiquement à des fins de tracking ou de profilage.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">3. Finalité du traitement</h2>
          <p>Les données collectées sont utilisées exclusivement pour :</p>
          <ul className="mt-3 space-y-1.5 ml-4 list-disc list-inside">
            <li>Répondre à vos demandes de devis et d&apos;information</li>
            <li>Vous recontacter dans le cadre de votre demande</li>
            <li>Établir une estimation tarifaire sur la base des informations fournies</li>
            <li>Émettre des devis, factures et contrats</li>
            <li>Assurer le suivi de projet et la gestion de la relation client</li>
            <li>Vous envoyer des e-mails de confirmation et de rappel</li>
            <li>Constituer une preuve de signature électronique</li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">4. Base légale du traitement</h2>
          <p>Le traitement de vos données repose sur :</p>
          <ul className="mt-3 space-y-1.5 ml-4 list-disc list-inside">
            <li><strong className="text-white/70">L&apos;exécution d&apos;un contrat</strong> ou de mesures précontractuelles (demande de devis, suivi de projet)</li>
            <li><strong className="text-white/70">L&apos;obligation légale</strong> (conservation des factures, preuve de signature)</li>
            <li><strong className="text-white/70">L&apos;intérêt légitime</strong> (gestion de la relation client, relances commerciales)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">5. Durée de conservation</h2>
          <ul className="space-y-1.5 ml-4 list-disc list-inside">
            <li>Données de contact et de projet : <strong className="text-white/70">3 ans</strong> à compter de la dernière interaction</li>
            <li>Documents comptables (factures) : <strong className="text-white/70">10 ans</strong> (obligation légale)</li>
            <li>Preuves de signature électronique : <strong className="text-white/70">10 ans</strong> (obligation légale)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">6. Destinataires des données</h2>
          <p>
            Vos données personnelles ne sont transmises à <strong className="text-white/70">aucun tiers</strong>.
            Elles sont uniquement accessibles au responsable du traitement et stockées sur notre serveur
            hébergé par Contabo GmbH (Allemagne — Union Européenne).
          </p>
          <p className="mt-3">
            Aucun transfert de données n&apos;est effectué en dehors de l&apos;Union Européenne.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">7. Vos droits</h2>
          <p>
            Conformément au RGPD (articles 15 à 22), vous disposez des droits suivants :
          </p>
          <ul className="mt-3 space-y-1.5 ml-4 list-disc list-inside">
            <li><strong className="text-white/70">Droit d&apos;accès :</strong> obtenir une copie de vos données</li>
            <li><strong className="text-white/70">Droit de rectification :</strong> corriger des données inexactes</li>
            <li><strong className="text-white/70">Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
            <li><strong className="text-white/70">Droit à la limitation :</strong> restreindre le traitement de vos données</li>
            <li><strong className="text-white/70">Droit à la portabilité :</strong> recevoir vos données dans un format lisible</li>
            <li><strong className="text-white/70">Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
          </ul>
          <p className="mt-4">
            Pour exercer ces droits, contactez-nous à :{' '}
            <a href="mailto:contact@jlstudio.dev" className="text-[#638BFF] hover:underline">contact@jlstudio.dev</a>
          </p>
          <p className="mt-3">
            Nous nous engageons à répondre dans un délai de <strong className="text-white/70">30 jours</strong>.
            Vous pouvez également introduire une réclamation auprès de la{' '}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#638BFF] hover:underline">CNIL</a>.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">8. Cookies</h2>
          <p>
            Ce site n&apos;utilise aucun cookie de tracking, publicitaire ou analytique.
            Seuls des cookies techniques strictement nécessaires au fonctionnement du site
            peuvent être utilisés. Ils ne nécessitent pas votre consentement préalable
            (article 82 de la loi Informatique et Libertés).
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">9. Sécurité</h2>
          <p>
            Le site utilise le protocole HTTPS pour chiffrer les échanges de données.
            Nous mettons en oeuvre les mesures techniques et organisationnelles appropriées
            pour protéger vos données contre tout accès non autorisé, perte ou altération.
          </p>
          <p className="mt-4 text-white/50 text-xs">
            Dernière mise à jour : février 2026
          </p>
        </section>
      </div>
    </div>
  );
}
