export default function FooterMinimal() {
  return (
    <footer className="relative bg-black border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-10 sm:py-16">
        <div className="flex flex-col items-center gap-5 sm:gap-8">
          {/* Logo */}
          <p className="font-[family-name:var(--font-outfit)] text-xl font-black text-white/80 tracking-tight">
            JL <span className="text-white/50">Studio</span>
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="/mentions-legales"
              className="text-xs text-white/50 hover:text-white/70 transition-colors duration-300"
            >
              Mentions legales
            </a>
            <div className="w-px h-3 bg-white/[0.08]" />
            <a
              href="/politique-confidentialite"
              className="text-xs text-white/50 hover:text-white/70 transition-colors duration-300"
            >
              Politique de confidentialite
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} JL Studio. Tous droits reserves.
          </p>
        </div>
      </div>
    </footer>
  );
}
