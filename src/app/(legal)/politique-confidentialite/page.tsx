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
            Le responsable du traitement des donnees personnelles est <strong className="text-white/80">JL Studio</strong> (Jeason Lemoine),
            developpeur web freelance.<br />
            Email : <a href="mailto:contact@jlstudio.dev" className="text-[#638BFF] hover:underline">contact@jlstudio.dev</a>
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">2. Donnees collectees</h2>
          <p>
            Nous collectons uniquement les donnees transmises volontairement via le formulaire de contact :
          </p>
          <ul className="mt-3 space-y-1.5 ml-4 list-disc list-inside">
            <li>Nom et prenom</li>
            <li>Adresse email</li>
            <li>Numero de telephone (facultatif)</li>
            <li>Message / description du projet</li>
            <li>Type de projet souhaite</li>
          </ul>
          <p className="mt-3">
            Aucune donnee n&apos;est collectee automatiquement a des fins de tracking ou de profilage.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">3. Finalite du traitement</h2>
          <p>Les donnees collectees sont utilisees exclusivement pour :</p>
          <ul className="mt-3 space-y-1.5 ml-4 list-disc list-inside">
            <li>Repondre a vos demandes de devis et d&apos;information</li>
            <li>Vous recontacter dans le cadre de votre demande</li>
            <li>Vous envoyer un email de confirmation</li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">4. Duree de conservation</h2>
          <p>
            Vos donnees personnelles sont conservees pour une duree maximale de <strong className="text-white/70">3 ans</strong> a
            compter de votre derniere interaction avec nous.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">5. Destinataires des donnees</h2>
          <p>
            Vos donnees personnelles ne sont transmises a <strong className="text-white/70">aucun tiers</strong>.
            Elles sont uniquement accessibles au responsable du traitement et stockees sur notre serveur
            heberge par Contabo GmbH (Allemagne — Union Europeenne).
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">6. Vos droits</h2>
          <p>
            Conformement au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="mt-3 space-y-1.5 ml-4 list-disc list-inside">
            <li><strong className="text-white/70">Droit d&apos;acces :</strong> obtenir une copie de vos donnees</li>
            <li><strong className="text-white/70">Droit de rectification :</strong> corriger des donnees inexactes</li>
            <li><strong className="text-white/70">Droit a l&apos;effacement :</strong> demander la suppression de vos donnees</li>
            <li><strong className="text-white/70">Droit a la portabilite :</strong> recevoir vos donnees dans un format lisible</li>
            <li><strong className="text-white/70">Droit d&apos;opposition :</strong> vous opposer au traitement</li>
          </ul>
          <p className="mt-4">
            Pour exercer ces droits : <a href="mailto:contact@jlstudio.dev" className="text-[#638BFF] hover:underline">contact@jlstudio.dev</a>
          </p>
          <p className="mt-3">
            Vous pouvez egalement introduire une reclamation aupres de la{' '}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#638BFF] hover:underline">CNIL</a>.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">7. Cookies</h2>
          <p>
            Ce site n&apos;utilise aucun cookie de tracking, publicitaire ou analytique.
            Seuls des cookies techniques essentiels au fonctionnement peuvent etre utilises.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">8. Securite</h2>
          <p>
            Le site utilise le protocole HTTPS. Nous mettons en oeuvre les mesures techniques
            appropriees pour proteger vos donnees contre tout acces non autorise.
          </p>
          <p className="mt-4 text-white/30 text-xs">
            Derniere mise a jour : fevrier 2026
          </p>
        </section>
      </div>
    </div>
  );
}
