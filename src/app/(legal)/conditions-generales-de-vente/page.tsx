import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions generales de vente | JL Studio',
  description: 'Conditions generales de vente des prestations de developpement web - JL Studio.',
};

export default function ConditionsGeneralesDeVente() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <h1 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
        Conditions generales de vente
      </h1>
      <div className="w-12 h-[2px] bg-gradient-to-r from-[#638BFF] to-[#638BFF]/30 mb-10 rounded-full" />

      <div className="space-y-10 text-white/60 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">1. Objet</h2>
          <p>
            Les presentes Conditions Generales de Vente (ci-apres &quot;CGV&quot;) regissent l&apos;ensemble des
            prestations de services realisees par JL Studio aupres de ses clients. Toute commande
            implique l&apos;acceptation sans reserve des presentes CGV.
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
            Email : <a href="mailto:contact@jlstudio.dev" className="text-[#638BFF] hover:underline">contact@jlstudio.dev</a><br />
            Telephone : <a href="tel:+33767581061" className="text-[#638BFF] hover:underline">07 67 58 10 61</a>
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">3. Prestations</h2>
          <p>
            JL Studio propose des prestations de conception et de developpement web, notamment :
          </p>
          <ul className="mt-3 space-y-1.5 ml-4 list-disc list-inside">
            <li>Creation de sites internet vitrine</li>
            <li>Developpement de sites e-commerce</li>
            <li>Developpement d&apos;applications web sur mesure</li>
            <li>Creation de landing pages</li>
            <li>Refonte de sites existants</li>
            <li>Maintenance et support technique</li>
          </ul>
          <p className="mt-3">
            Le detail des prestations, leur perimetre et les livrables attendus sont definis
            dans le devis valide par le client.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">4. Devis et commande</h2>
          <p>
            Toute prestation fait l&apos;objet d&apos;un devis detaille et personnalise, transmis au client
            par voie electronique. Le devis est valable <strong className="text-white/70">30 jours</strong> a
            compter de sa date d&apos;emission, sauf mention contraire.
          </p>
          <p className="mt-3">
            La commande est consideree comme ferme et definitive a la reception par JL Studio
            du devis signe (y compris par voie de signature electronique) et du versement de
            l&apos;acompte prevu.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">5. Tarifs et paiement</h2>
          <p>
            Les prix sont indiques en euros et nets de taxes (TVA non applicable,
            article 293 B du CGI). Les tarifs figurant dans le devis sont fermes et
            non revisables pour la duree de la prestation convenue.
          </p>

          <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-white/70 mt-5 mb-2">
            Echeancier de paiement
          </h3>
          <p>Sauf accord particulier, le paiement s&apos;effectue selon l&apos;echeancier suivant :</p>
          <ul className="mt-3 space-y-1.5 ml-4 list-disc list-inside">
            <li><strong className="text-white/70">30 %</strong> a la commande (acompte a la signature du devis)</li>
            <li><strong className="text-white/70">40 %</strong> a la validation de la maquette / version intermediaire</li>
            <li><strong className="text-white/70">30 %</strong> a la livraison finale et mise en ligne</li>
          </ul>

          <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-white/70 mt-5 mb-2">
            Moyens de paiement
          </h3>
          <p>
            Les paiements sont acceptes par virement bancaire. Les coordonnees bancaires
            sont communiquees sur la facture.
          </p>

          <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-white/70 mt-5 mb-2">
            Delai de paiement
          </h3>
          <p>
            Les factures sont payables a <strong className="text-white/70">30 jours</strong> a compter
            de leur date d&apos;emission, sauf mention contraire sur le devis.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">6. Penalites de retard</h2>
          <p>
            En cas de retard de paiement, des penalites de retard seront exigibles de plein droit,
            sans qu&apos;un rappel soit necessaire, au taux annuel de{' '}
            <strong className="text-white/70">3 fois le taux d&apos;interet legal</strong> en vigueur.
          </p>
          <p className="mt-3">
            Une indemnite forfaitaire de <strong className="text-white/70">40 euros</strong> pour frais
            de recouvrement sera egalement due (article D.441-5 du Code de commerce).
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">7. Delais de realisation</h2>
          <p>
            Les delais de realisation sont mentionnes dans le devis a titre indicatif.
            JL Studio s&apos;engage a mettre en oeuvre tous les moyens necessaires pour respecter
            les delais convenus. Toutefois, un retard raisonnable ne saurait donner lieu a
            des penalites ou a l&apos;annulation de la commande.
          </p>
          <p className="mt-3">
            Les delais peuvent etre prolonges en cas de retard du client dans la fourniture
            des elements necessaires (contenus, textes, images, validations, retours).
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">8. Obligations du client</h2>
          <p>Le client s&apos;engage a :</p>
          <ul className="mt-3 space-y-1.5 ml-4 list-disc list-inside">
            <li>Fournir les contenus, textes et visuels necessaires dans les delais convenus</li>
            <li>Valider les etapes intermediaires (maquettes, prototypes) dans un delai raisonnable</li>
            <li>Designuer un interlocuteur unique pour le suivi du projet</li>
            <li>Respecter les echeances de paiement</li>
          </ul>
          <p className="mt-3">
            Tout retard dans la fourniture des elements par le client pourra entrainer un
            report equivalent du calendrier de livraison.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">9. Propriete intellectuelle</h2>
          <p>
            Le transfert de propriete des livrables au client est effectif uniquement apres
            paiement integral de la prestation. Jusqu&apos;au paiement complet, JL Studio conserve
            l&apos;integralite des droits de propriete intellectuelle sur les creations.
          </p>
          <p className="mt-3">
            JL Studio se reserve le droit de mentionner la realisation dans son portfolio
            et ses references, sauf opposition ecrite du client.
          </p>
          <p className="mt-3">
            Les outils, frameworks et bibliotheques open-source utilises dans le developpement
            restent soumis a leurs licences respectives.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">10. Revision et modifications</h2>
          <p>
            Le devis inclut un nombre defini de rounds de revision, precise dans celui-ci.
            Toute modification supplementaire ou hors perimetre fera l&apos;objet d&apos;un avenant
            chiffre soumis a validation prealable du client.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">11. Resiliation</h2>
          <p>
            En cas de resiliation de la commande par le client apres signature du devis,
            les sommes deja versees resteront acquises a JL Studio a titre d&apos;indemnite,
            correspondant au travail deja realise.
          </p>
          <p className="mt-3">
            En cas de manquement grave de l&apos;une des parties a ses obligations, l&apos;autre partie
            pourra resilier le contrat de plein droit apres mise en demeure restee sans effet
            pendant <strong className="text-white/70">15 jours</strong>.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">12. Droit de retractation (clients particuliers)</h2>
          <p>
            Conformement aux articles L.221-18 et suivants du Code de la consommation,
            le client consommateur (non professionnel) dispose d&apos;un droit de retractation
            de <strong className="text-white/70">14 jours</strong> a compter de la signature du devis.
          </p>
          <p className="mt-3">
            Si le client demande expressement le commencement de la prestation avant
            l&apos;expiration de ce delai, il conserve son droit de retractation mais devra
            verser un montant proportionnel au service deja fourni.
          </p>
          <p className="mt-3">
            Pour exercer ce droit, le client doit adresser une declaration claire de
            retractation a{' '}
            <a href="mailto:contact@jlstudio.dev" className="text-[#638BFF] hover:underline">contact@jlstudio.dev</a>.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">13. Responsabilite</h2>
          <p>
            JL Studio s&apos;engage a apporter tout le soin et la diligence necessaires a la
            realisation des prestations. Il s&apos;agit d&apos;une obligation de moyens.
          </p>
          <p className="mt-3">
            La responsabilite de JL Studio ne saurait exceder le montant total de la prestation
            concernee. JL Studio ne pourra etre tenu responsable des dommages indirects
            (perte de chiffre d&apos;affaires, perte de donnees, atteinte a l&apos;image, etc.).
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">14. Force majeure</h2>
          <p>
            Aucune des parties ne sera tenue responsable de l&apos;inexecution de ses obligations
            en cas de force majeure telle que definie par l&apos;article 1218 du Code civil
            (catastrophe naturelle, pandemie, panne generalisee, etc.).
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">15. Mediation</h2>
          <p>
            Conformement aux articles L.612-1 et suivants du Code de la consommation,
            en cas de litige non resolu a l&apos;amiable, le client consommateur peut recourir
            gratuitement au service de mediation suivant :
          </p>
          <p className="mt-3">
            <strong className="text-white/80">CNPM — Mediation de la consommation</strong><br />
            27 avenue de la Liberation, 42400 Saint-Chamond<br />
            Site web : <a href="https://cnpm-mediation-consommation.eu" target="_blank" rel="noopener noreferrer" className="text-[#638BFF] hover:underline">cnpm-mediation-consommation.eu</a>
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">16. Droit applicable et juridiction</h2>
          <p>
            Les presentes CGV sont soumises au droit francais. En cas de litige et a
            defaut de resolution amiable, les tribunaux competents de Bordeaux seront
            seuls competents.
          </p>
          <p className="mt-4 text-white/30 text-xs">
            Derniere mise a jour : fevrier 2026
          </p>
        </section>
      </div>
    </div>
  );
}
