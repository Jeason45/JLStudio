export default function FooterMinimal() {
  return (
    <footer className="relative bg-black border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="flex flex-col items-center gap-5 sm:gap-6">

          {/* Logo + tagline */}
          <div className="text-center">
            <img
              src="/images/logo-jlstudio.png"
              alt="JL Studio"
              className="h-7 sm:h-9 w-auto mx-auto"
            />
            <p className="text-xs sm:text-sm text-white/35 mt-1.5 sm:mt-2">
              Sites web, e-commerce &amp; applications sur mesure
            </p>
          </div>

          {/* Contact row */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1 text-xs sm:text-sm text-white/40">
            <a href="mailto:contact@jlstudio.dev" className="hover:text-white/70 transition-colors">
              contact@jlstudio.dev
            </a>
            <span className="w-px h-3 bg-white/10" />
            <a href="tel:+33767581061" className="hover:text-white/70 transition-colors">
              07 67 58 10 61
            </a>
            <span className="hidden sm:block w-px h-3 bg-white/10" />
            <span className="hidden sm:block text-white/30">
              35 quai Deschamps, 33100 Bordeaux
            </span>
          </div>

          {/* Separator */}
          <div className="w-16 sm:w-24 h-px bg-white/[0.06]" />

          {/* Legal links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1.5 text-[0.65rem] sm:text-xs text-white/30">
            <a href="/mentions-legales" className="hover:text-white/50 transition-colors">Mentions legales</a>
            <span className="w-px h-2.5 bg-white/10" />
            <a href="/politique-confidentialite" className="hover:text-white/50 transition-colors">Confidentialite</a>
            <span className="w-px h-2.5 bg-white/10" />
            <a href="/conditions-generales-de-vente" className="hover:text-white/50 transition-colors">CGV</a>
          </div>

          {/* Copyright + SIRET */}
          <p className="text-[0.6rem] sm:text-xs text-white/25">
            &copy; {new Date().getFullYear()} JL Studio — SIRET 894 838 317 00044
          </p>
        </div>
      </div>
    </footer>
  );
}
