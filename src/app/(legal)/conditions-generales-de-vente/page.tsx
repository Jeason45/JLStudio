import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions générales de vente | JL Studio',
  description: 'Conditions générales de vente des prestations de développement web - JL Studio.',
};

export default function ConditionsGeneralesDeVente() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <h1 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
        Conditions générales de vente
      </h1>
      <div className="w-12 h-[2px] bg-gradient-to-r from-[#638BFF] to-[#638BFF]/30 mb-10 rounded-full" />

      <div className="space-y-10 text-white/60 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">1. Objet</h2>
          <p>
            Les présentes Conditions Générales de Vente (ci-après &quot;CGV&quot;) régissent l&apos;ensemble des
            prestations de services réalisées par JL Studio auprès de ses clients. Toute commande
            implique l&apos;acceptation sans réserve des présentes CGV.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">2. Prestataire</h2>
          <p>
            <strong className="text-white">JL Studio</strong><br />
            Jeason Lemoine — Entrepreneur individuel (micro-entreprise)<br />
            35 quai Deschamps, 33100 Bordeaux<br />
            SIRET : 894 838 317 00044<br />
            TVA non applicable — article 293 B du CGI<br />
            E-mail : <a href="mailto:contact@jlstudio.dev" className="text-[#638BFF] hover:underline">contact@jlstudio.dev</a><br />
            Téléphone : <a href="tel:+33767581061" className="text-[#638BFF] hover:underline">07 67 58 10 61</a>
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">3. Prestations</h2>
          <p>
            JL Studio propose des prestations de conception et de développement web, notamment :
          </p>
          <ul className="mt-3 space-y-1.5 ml-4 list-disc list-inside">
            <li>Création de sites internet vitrine</li>
            <li>Développement de sites e-commerce</li>
            <li>Développement d&apos;applications web sur mesure</li>
            <li>Création de landing pages</li>
            <li>Refonte de sites existants</li>
            <li>Maintenance et support technique</li>
          </ul>
          <p className="mt-3">
            Le détail des prestations, leur périmètre et les livrables attendus sont définis
            dans le devis validé par le client.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">4. Devis et commande</h2>
          <p>
            Toute prestation fait l&apos;objet d&apos;un devis détaillé et personnalisé, transmis au client
            par voie électronique. Le devis est valable <strong className="text-white/70">30 jours</strong> à
            compter de sa date d&apos;émission, sauf mention contraire.
          </p>
          <p className="mt-3">
            La commande est considérée comme ferme et définitive à la réception par JL Studio
            du devis signé (y compris par voie de signature électronique) et du versement de
            l&apos;acompte prévu.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">5. Tarifs et paiement</h2>
          <p>
            Les prix sont indiqués en euros et nets de taxes (TVA non applicable,
            article 293 B du CGI). Les tarifs figurant dans le devis sont fermes et
            non révisables pour la durée de la prestation convenue.
          </p>

          <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-white/70 mt-5 mb-2">
            Échéancier de paiement
          </h3>
          <p>Sauf accord particulier, le paiement s&apos;effectue selon l&apos;échéancier suivant :</p>
          <ul className="mt-3 space-y-1.5 ml-4 list-disc list-inside">
            <li><strong className="text-white/70">30 %</strong> à la commande (acompte à la signature du devis)</li>
            <li><strong className="text-white/70">40 %</strong> à la validation de la maquette / version intermédiaire</li>
            <li><strong className="text-white/70">30 %</strong> à la livraison finale et mise en ligne</li>
          </ul>

          <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-white/70 mt-5 mb-2">
            Moyens de paiement
          </h3>
          <p>
            Les paiements sont acceptés par virement bancaire. Les coordonnées bancaires
            sont communiquées sur la facture.
          </p>

          <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-white/70 mt-5 mb-2">
            Délai de paiement
          </h3>
          <p>
            Les factures sont payables à <strong className="text-white/70">30 jours</strong> à compter
            de leur date d&apos;émission, sauf mention contraire sur le devis.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">6. Pénalités de retard</h2>
          <p>
            En cas de retard de paiement, des pénalités de retard seront exigibles de plein droit,
            sans qu&apos;un rappel soit nécessaire, au taux annuel de{' '}
            <strong className="text-white/70">3 fois le taux d&apos;intérêt légal</strong> en vigueur.
          </p>
          <p className="mt-3">
            Une indemnité forfaitaire de <strong className="text-white/70">40 euros</strong> pour frais
            de recouvrement sera également due (article D.441-5 du Code de commerce).
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">7. Délais de réalisation</h2>
          <p>
            Les délais de réalisation sont mentionnés dans le devis à titre indicatif.
            JL Studio s&apos;engage à mettre en oeuvre tous les moyens nécessaires pour respecter
            les délais convenus. Toutefois, un retard raisonnable ne saurait donner lieu à
            des pénalités ou à l&apos;annulation de la commande.
          </p>
          <p className="mt-3">
            Les délais peuvent être prolongés en cas de retard du client dans la fourniture
            des éléments nécessaires (contenus, textes, images, validations, retours).
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">8. Obligations du client</h2>
          <p>Le client s&apos;engage à :</p>
          <ul className="mt-3 space-y-1.5 ml-4 list-disc list-inside">
            <li>Fournir les contenus, textes et visuels nécessaires dans les délais convenus</li>
            <li>Valider les étapes intermédiaires (maquettes, prototypes) dans un délai raisonnable</li>
            <li>Désigner un interlocuteur unique pour le suivi du projet</li>
            <li>Respecter les échéances de paiement</li>
          </ul>
          <p className="mt-3">
            Tout retard dans la fourniture des éléments par le client pourra entraîner un
            report équivalent du calendrier de livraison.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">9. Propriété intellectuelle</h2>
          <p>
            Le transfert de propriété des livrables au client est effectif uniquement après
            paiement intégral de la prestation. Jusqu&apos;au paiement complet, JL Studio conserve
            l&apos;intégralité des droits de propriété intellectuelle sur les créations.
          </p>
          <p className="mt-3">
            JL Studio se réserve le droit de mentionner la réalisation dans son portfolio
            et ses références, sauf opposition écrite du client.
          </p>
          <p className="mt-3">
            Les outils, frameworks et bibliothèques open-source utilisés dans le développement
            restent soumis à leurs licences respectives.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">10. Révision et modifications</h2>
          <p>
            Le devis inclut un nombre défini de rounds de révision, précisé dans celui-ci.
            Toute modification supplémentaire ou hors périmètre fera l&apos;objet d&apos;un avenant
            chiffré soumis à validation préalable du client.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">11. Résiliation</h2>
          <p>
            En cas de résiliation de la commande par le client après signature du devis,
            les sommes déjà versées resteront acquises à JL Studio à titre d&apos;indemnité,
            correspondant au travail déjà réalisé.
          </p>
          <p className="mt-3">
            En cas de manquement grave de l&apos;une des parties à ses obligations, l&apos;autre partie
            pourra résilier le contrat de plein droit après mise en demeure restée sans effet
            pendant <strong className="text-white/70">15 jours</strong>.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">12. Droit de rétractation (clients particuliers)</h2>
          <p>
            Conformément aux articles L.221-18 et suivants du Code de la consommation,
            le client consommateur (non professionnel) dispose d&apos;un droit de rétractation
            de <strong className="text-white/70">14 jours</strong> à compter de la signature du devis.
          </p>
          <p className="mt-3">
            Si le client demande expressément le commencement de la prestation avant
            l&apos;expiration de ce délai, il conserve son droit de rétractation mais devra
            verser un montant proportionnel au service déjà fourni.
          </p>
          <p className="mt-3">
            Pour exercer ce droit, le client doit adresser une déclaration claire de
            rétractation à{' '}
            <a href="mailto:contact@jlstudio.dev" className="text-[#638BFF] hover:underline">contact@jlstudio.dev</a>.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">13. Responsabilité</h2>
          <p>
            JL Studio s&apos;engage à apporter tout le soin et la diligence nécessaires à la
            réalisation des prestations. Il s&apos;agit d&apos;une obligation de moyens.
          </p>
          <p className="mt-3">
            La responsabilité de JL Studio ne saurait excéder le montant total de la prestation
            concernée. JL Studio ne pourra être tenu responsable des dommages indirects
            (perte de chiffre d&apos;affaires, perte de données, atteinte à l&apos;image, etc.).
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">14. Force majeure</h2>
          <p>
            Aucune des parties ne sera tenue responsable de l&apos;inexécution de ses obligations
            en cas de force majeure telle que définie par l&apos;article 1218 du Code civil
            (catastrophe naturelle, pandémie, panne généralisée, etc.).
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">15. Médiation</h2>
          <p>
            Conformément aux articles L.612-1 et suivants du Code de la consommation,
            en cas de litige non résolu à l&apos;amiable, le client consommateur peut recourir
            gratuitement au service de médiation suivant :
          </p>
          <p className="mt-3">
            <strong className="text-white/80">CNPM — Médiation de la consommation</strong><br />
            27 avenue de la Libération, 42400 Saint-Chamond<br />
            Site web : <a href="https://cnpm-mediation-consommation.eu" target="_blank" rel="noopener noreferrer" className="text-[#638BFF] hover:underline">cnpm-mediation-consommation.eu</a>
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">16. Droit applicable et juridiction</h2>
          <p>
            Les présentes CGV sont soumises au droit français. En cas de litige et à
            défaut de résolution amiable, les tribunaux compétents de Bordeaux seront
            seuls compétents.
          </p>
          <p className="mt-4 text-white/50 text-xs">
            Dernière mise à jour : février 2026
          </p>
        </section>
      </div>
    </div>
  );
}
