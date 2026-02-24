export default function FooterMinimal() {
  return (
    <footer className="relative bg-black border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-8 sm:py-16">

        {/* ── Mobile: compact stacked layout ── */}
        <div className="sm:hidden space-y-6">
          {/* Logo + tagline */}
          <div className="text-center">
            <img
              src="/images/logo-jlstudio.png"
              alt="JL Studio"
              className="h-7 w-auto mx-auto"
            />
            <p className="text-xs text-white/35 mt-1">
              Sites web, e-commerce &amp; applications sur mesure
            </p>
          </div>

          {/* Contact row */}
          <div className="flex items-center justify-center gap-4 text-xs text-white/40">
            <a href="mailto:contact@jlstudio.dev" className="hover:text-white/70 transition-colors">
              contact@jlstudio.dev
            </a>
            <span className="w-px h-3 bg-white/10" />
            <a href="tel:+33767581061" className="hover:text-white/70 transition-colors">
              07 67 58 10 61
            </a>
          </div>

          {/* Legal links — inline wrap */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[0.65rem] text-white/30">
            <a href="/mentions-legales" className="hover:text-white/50 transition-colors">Mentions legales</a>
            <span className="w-px h-2.5 bg-white/10" />
            <a href="/politique-confidentialite" className="hover:text-white/50 transition-colors">Confidentialite</a>
            <span className="w-px h-2.5 bg-white/10" />
            <a href="/conditions-generales-de-vente" className="hover:text-white/50 transition-colors">CGV</a>
          </div>

          {/* Copyright + SIRET */}
          <div className="text-center space-y-0.5">
            <p className="text-[0.6rem] text-white/25">
              &copy; {new Date().getFullYear()} JL Studio — SIRET 894 838 317 00044
            </p>
          </div>
        </div>

        {/* ── Desktop/Tablet: 4-column grid ── */}
        <div className="hidden sm:block">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <img
                src="/images/logo-jlstudio.png"
                alt="JL Studio"
                className="h-8 w-auto mb-3"
              />
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
          <div className="border-t border-white/[0.06] pt-6 flex items-center justify-between">
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} JL Studio. Tous droits reserves.
            </p>
            <p className="text-xs text-white/30">
              SIRET 894 838 317 00044
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
