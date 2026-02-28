import Image from 'next/image';

export default function FooterMinimal() {
  return (
    <footer className="relative bg-black border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="flex flex-col items-center gap-5 sm:gap-6">

          {/* Logo + tagline */}
          <div className="text-center">
            <Image
              src="/images/logo-jlstudio.png"
              alt="JL Studio"
              width={120}
              height={32}
              className="h-7 sm:h-8 w-auto mx-auto"
            />
            <p className="text-xs sm:text-sm text-white/50 mt-1.5 sm:mt-2">
              Sites web, e-commerce &amp; applications sur mesure
            </p>
          </div>

          {/* Contact row */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1 text-xs sm:text-sm text-white/50">
            <a href="mailto:contact@jlstudio.dev" className="hover:text-white/70 transition-colors">
              contact@jlstudio.dev
            </a>
            <span className="w-px h-3 bg-white/10" />
            <a href="tel:+33767581061" className="hover:text-white/70 transition-colors">
              07 67 58 10 61
            </a>
            <span className="hidden sm:block w-px h-3 bg-white/10" />
            <span className="block text-center sm:text-left text-white/50">
              35 quai Deschamps, 33100 Bordeaux
            </span>
          </div>

          {/* Separator */}
          <div className="w-16 sm:w-24 h-px bg-white/[0.06]" />

          {/* Legal links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1.5 text-[0.65rem] sm:text-xs text-white/50">
            <a href="/mentions-legales" className="hover:text-white/60 transition-colors">Mentions légales</a>
            <span className="w-px h-2.5 bg-white/10" />
            <a href="/politique-confidentialite" className="hover:text-white/60 transition-colors">Confidentialité</a>
            <span className="w-px h-2.5 bg-white/10" />
            <a href="/conditions-generales-de-vente" className="hover:text-white/60 transition-colors">CGV</a>
          </div>

          {/* Copyright + SIRET */}
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} JL Studio — SIRET 894 838 317 00044
          </p>
        </div>
      </div>
    </footer>
  );
}
