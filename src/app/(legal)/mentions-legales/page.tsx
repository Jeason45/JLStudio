import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions legales | JL Studio',
  description: 'Mentions legales du site JL Studio.',
};

export default function MentionsLegales() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <h1 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
        Mentions legales
      </h1>
      <div className="w-12 h-[2px] bg-gradient-to-r from-[#638BFF] to-[#638BFF]/30 mb-10 rounded-full" />

      <div className="space-y-10 text-white/60 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">1. Editeur du site</h2>
          <p>
            <strong className="text-white">JL Studio</strong><br />
            Jeason Lemoine — Entrepreneur individuel (micro-entreprise)<br />
            35 quai Deschamps, 33100 Bordeaux<br />
            SIRET : 894 838 317 00044<br />
            TVA non applicable — article 293 B du CGI<br />
            Telephone : <a href="tel:+33767581061" className="text-[#638BFF] hover:underline">07 67 58 10 61</a><br />
            Email : <a href="mailto:contact@jlstudio.dev" className="text-[#638BFF] hover:underline">contact@jlstudio.dev</a>
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">2. Directeur de la publication</h2>
          <p>
            Jeason Lemoine, en qualite de gerant de JL Studio.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">3. Hebergement</h2>
          <p>
            Ce site est heberge par :<br />
            <strong className="text-white/80">Contabo GmbH</strong><br />
            Aschauer Strasse 32a, 81549 Munich, Allemagne<br />
            Site web : <a href="https://contabo.com" target="_blank" rel="noopener noreferrer" className="text-[#638BFF] hover:underline">contabo.com</a>
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">4. Propriete intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icones, code source)
            est la propriete exclusive de JL Studio, sauf mention contraire. Toute reproduction,
            distribution, modification ou utilisation sans autorisation prealable ecrite est interdite,
            conformement aux articles L.111-1 et suivants du Code de la propriete intellectuelle.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">5. Responsabilite</h2>
          <p>
            JL Studio s&apos;efforce de fournir des informations aussi precises que possible sur ce site.
            Toutefois, il ne pourra etre tenu responsable des omissions, inexactitudes ou carences
            dans la mise a jour de ces informations, qu&apos;elles soient de son fait ou du fait de
            tiers partenaires qui lui fournissent ces informations.
          </p>
          <p className="mt-3">
            JL Studio decline toute responsabilite en cas de difficulte d&apos;acces au site ou
            d&apos;interruptions de service, quelles qu&apos;en soient les causes.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">6. Liens hypertextes</h2>
          <p>
            Le site peut contenir des liens vers d&apos;autres sites. JL Studio ne dispose d&apos;aucun
            moyen de controle sur le contenu de ces sites tiers et n&apos;assume aucune responsabilite
            quant a leur contenu.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">7. Protection des donnees personnelles</h2>
          <p>
            Conformement au Reglement General sur la Protection des Donnees (RGPD) et a la
            loi Informatique et Libertes du 6 janvier 1978 modifiee, vous disposez de droits sur
            vos donnees personnelles. Pour plus d&apos;informations, consultez notre{' '}
            <a href="/politique-confidentialite" className="text-[#638BFF] hover:underline">
              politique de confidentialite
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">8. Droit applicable</h2>
          <p>
            Les presentes mentions legales sont soumises au droit francais.
            En cas de litige, les tribunaux de Bordeaux seront seuls competents.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">9. Contact</h2>
          <p>
            Pour toute question relative aux mentions legales, vous pouvez nous contacter :<br />
            Email : <a href="mailto:contact@jlstudio.dev" className="text-[#638BFF] hover:underline">contact@jlstudio.dev</a><br />
            Telephone : <a href="tel:+33767581061" className="text-[#638BFF] hover:underline">07 67 58 10 61</a><br />
            Adresse : 35 quai Deschamps, 33100 Bordeaux
          </p>
          <p className="mt-4 text-white/30 text-xs">
            Derniere mise a jour : fevrier 2026
          </p>
        </section>
      </div>
    </div>
  );
}
