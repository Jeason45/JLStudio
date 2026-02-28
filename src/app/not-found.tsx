import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 45%, rgba(99,139,255,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <Link href="/">
          <Image
            src="/images/logo-jlstudio.png"
            alt="JL Studio"
            width={120}
            height={32}
            className="h-7 sm:h-8 w-auto mb-12"
          />
        </Link>

        <p className="text-[#638BFF]/60 text-xs tracking-[0.4em] uppercase mb-4">
          Erreur 404
        </p>

        <h1 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
          Page introuvable
        </h1>

        <p className="text-white/50 text-sm sm:text-base max-w-md mb-10 leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#638BFF] px-8 py-3.5 rounded-full hover:shadow-[0_0_30px_rgba(99,139,255,0.3)] transition-all duration-300"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
