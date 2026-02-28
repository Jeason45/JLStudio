import Link from 'next/link';
import Image from 'next/image';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-jlstudio.png"
                alt="JL Studio"
                width={120}
                height={32}
                className="h-7 sm:h-8 w-auto"
              />
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Retour au site
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 md:pt-28 pb-20">
        {children}
      </main>

      <footer className="border-t border-white/[0.04]">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} JL Studio. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
