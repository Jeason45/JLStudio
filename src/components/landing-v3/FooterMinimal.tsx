export default function FooterMinimal() {
  return (
    <footer className="relative bg-black border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-[family-name:var(--font-outfit)] text-xl font-black text-white/80 tracking-tight mb-3">
              JL <span className="text-white/50">Studio</span>
            </p>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Sites web, e-commerce et applications sur mesure pour propulser votre activite.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-[family-name:var(--font-outfit)] text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#services" className="text-sm text-white/40 hover:text-white/70 transition-colors duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#projets" className="text-sm text-white/40 hover:text-white/70 transition-colors duration-300">
                  Realisations
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-white/40 hover:text-white/70 transition-colors duration-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="/qualifier" className="text-sm text-white/40 hover:text-white/70 transition-colors duration-300">
                  Devis en ligne
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-[family-name:var(--font-outfit)] text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">
              Informations legales
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="/mentions-legales" className="text-sm text-white/40 hover:text-white/70 transition-colors duration-300">
                  Mentions legales
                </a>
              </li>
              <li>
                <a href="/politique-confidentialite" className="text-sm text-white/40 hover:text-white/70 transition-colors duration-300">
                  Politique de confidentialite
                </a>
              </li>
              <li>
                <a href="/conditions-generales-de-vente" className="text-sm text-white/40 hover:text-white/70 transition-colors duration-300">
                  Conditions generales de vente
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-[family-name:var(--font-outfit)] text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:contact@jlstudio.dev" className="text-sm text-white/40 hover:text-white/70 transition-colors duration-300">
                  contact@jlstudio.dev
                </a>
              </li>
              <li>
                <a href="tel:+33767581061" className="text-sm text-white/40 hover:text-white/70 transition-colors duration-300">
                  07 67 58 10 61
                </a>
              </li>
              <li className="text-sm text-white/40">
                35 quai Deschamps<br />
                33100 Bordeaux
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} JL Studio. Tous droits reserves.
          </p>
          <p className="text-xs text-white/30">
            SIRET 894 838 317 00044
          </p>
        </div>
      </div>
    </footer>
  );
}
