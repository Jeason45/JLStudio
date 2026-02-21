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
            Jeason Lemoine — Developpeur web freelance<br />
            Email : contact@jlstudio.dev
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">2. Hebergement</h2>
          <p>
            Ce site est heberge par Contabo GmbH.<br />
            Aschauer Strasse 32a, 81549 Munich, Allemagne.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">3. Propriete intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icones) est la propriete
            exclusive de JL Studio, sauf mention contraire. Toute reproduction, distribution, modification
            ou utilisation sans autorisation prealable est interdite.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">4. Responsabilite</h2>
          <p>
            JL Studio s&apos;efforce de fournir des informations aussi precises que possible.
            Toutefois, il ne pourra etre tenu responsable des omissions, inexactitudes ou
            carences dans la mise a jour de ces informations.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-4">5. Contact</h2>
          <p>
            Pour toute question relative aux mentions legales, vous pouvez nous contacter
            a l&apos;adresse : <a href="mailto:contact@jlstudio.dev" className="text-[#638BFF] hover:underline">contact@jlstudio.dev</a>
          </p>
        </section>
      </div>
    </div>
  );
}
